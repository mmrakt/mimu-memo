---
title: Chrome DevTools MCP 入門
tag: "other"
pubDate: 2025-09-30
---

## 概要

- 従来、LLM や AI 補助エージェントは、コードを書いたり解析をしたりできても、その出力を「実際にブラウザで動かして観察」することができなかった
- そのため、性能改善やバグ診断などは推測や静的解析に頼ることが多く、「動いたかどうか」はユーザーの手で確認されることが主だった
- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) は、AI エージェントが実際の Chrome ブラウザを操作・観察できるようにする MCP（Model Context Protocol）サーバー
- これにより、AI は「書くだけ」から「書いて、動かして、診断して、最適化を提案する」ループを回せるようになる可能性がある

## MCP 復習

- MCP は、LLM／AI と外部ツール（ブラウザ、DB、ファイルシステムなど）をつなぐ共通プロトコル
- 各ツールは MCP サーバとして機能し、エージェントは MCP クライアントとしてサーバの提供するツール（命令群）を呼び出せる
- Chrome DevTools MCP は、MCP を通じて Chrome DevTools の機能を AI に提供する役割を果たす
- この設計によって、各 AI 補助ツール（Gemini CLI、Claude Code、Cursor、Copilot など）は独自にブラウザ制御機構を持たなくても、MCP 経由で標準化された操作が可能になる

## Chrome DevTools MCP の主な機能と構成

### 提供されるツール（操作インターフェース）

| 分野                  | ツール名                                                                           | 概要                                                        |
| --------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| ナビゲーション        | `navigate_page`, `new_page`, `wait_for`, `close_page`, `select_page`               | ページ遷移、待機、ページ切り替えなど                        |
| 入力操作              | `click`, `fill`, `fill_form`, `hover`, `drag`, `handle_dialog`, `upload_file`      | ユーザー操作（クリック、入力、ドラッグなど）をシミュレート  |
| 性能計測 / 分析       | `performance_start_trace`, `performance_stop_trace`, `performance_analyze_insight` | ページ読み込みのトレース取得と分析                          |
| ネットワーク          | `list_network_requests`, `get_network_request`                                     | HTTP リクエスト／レスポンスの取得と解析                     |
| デバッグ / 評価       | `evaluate_script`, `list_console_messages`                                         | ページ内スクリプト実行、コンソールログ収集                  |
| キャプチャ / 状態取得 | `take_screenshot`, `take_snapshot`                                                 | ページ・要素のスクリーンショットや DOM スナップショット取得 |
| エミュレーション      | `emulate_cpu`, `emulate_network`, `resize_page`                                    | CPU 性能制限・ネットワーク速度制限・画面サイズ変更          |

- これらツールは、AI が「命令 → 実行 → 結果取得 → 次の判断」に活用できる形で公開されている
- 実際の操作には、**Puppeteer** をラップして、Chrome DevTools Protocol（CDP）を通じて制御を行う設計になっている
- つまり、AI は低レイヤーの CDP を直接使う代わりに、高次抽象の MCP ツールを呼び出すことでブラウザを操作できる

### 起動オプション・構成

- MCP クライアントの設定で、以下のように `npx chrome-devtools-mcp@latest` を起動コマンドに指定する例

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}
```

- 起動オプション例

  - `--headless`：ヘッドレスモードで Chrome を起動
  - `--executablePath`：Chrome 実行ファイルのパスを指定
  - `--isolated`：一時的なユーザーデータディレクトリを用意し、セッション終了後にクリーンアップ
  - `--channel`：使用する Chrome チャネル（stable / canary / beta / dev）
  - `--browserUrl`：すでに起動済みの Chrome のリモートデバッグ URL に接続

- デフォルトではユーザープロファイルは共有ディレクトリを使うが、`isolated` モードでセッションごとに分離可能

- 制限・既知問題として、OS のサンドボックス環境（macOS の Seatbelt、Linux コンテナなど）下では Chrome 起動が失敗するケースがある

## 典型ユースケースとデモ的ワークフロー

### AI へのプロンプト → 実行 → 分析ループ例

1. AI に下記のようなプロンプトを送る

   > 「`https://example.com`の LCP（Largest Contentful Paint）を測って、改善案を出して」

2. AI は `performance_start_trace` → `navigate_page("https://example.com")` → `performance_stop_trace` を呼び出す
3. 得られたトレースデータを `performance_analyze_insight` に渡して、LCP の高原因などを解析
4. AI が DOM・CSS・画像遅延読み込みなどの改善案を提案
5. 必要に応じて `evaluate_script`/`list_network_requests`/`get_network_request` 等を併用して原因を掘る
6. 改善案を適用 → 再度トレース取得 → 可視化してレポート生成

### デバッグ・バグ再現支援

- API 通信エラーや CORS 問題を起こすフロント/バックエンド連携の不具合を、AI に `get_network_request` や `list_console_messages` を使って洗い出し
- ユーザー操作の再現（クリック、フォーム送信、ダイアログ操作など）を `click`/`fill`/`handle_dialog` 等で実行可能
- 表示レイアウト崩れは DOM や CSS を `take_snapshot`＋スナップショット比較で変化を可視化可能

### SEO／スクレイピング支援・構造化取得

- ページへの遷移 → 検索クエリ実行 → ページ構造取得 → 競合サイトの構造比較・スクレイピング → レポート生成
- AI は DOM／ARIA 情報等を取得してページ構造を理解し、SEO メタ情報や page ranking 要素を自動抽出できる

## 特徴・差別化ポイント

- AI がブラウザを「見る・触る」能力を持てるようになることで、静的な提案から動的な検証へ踏み込める
- 共通プロトコル MCP による抽象化で、複数の AI クライアントに標準対応できる
- Puppeteer + CDP を下支えに使っており、多くの実運用 Web アプリケーションに対して堅牢性を確保
- 起動オプションで環境分離（isolated）やヘッドレス動作が可能

## 課題と今後の展望

- 現時点では **パブリックプレビュー** であり、全ての DevTools 機能が揃っていない可能性が高い
- サンドボックス環境下での Chrome 起動失敗や、クライアント－サーバの権限制御周りで問題が出る可能性
- AI に扱わせるには「安全性・権限制御」が重要。MCP クライアントが無制限にブラウザを操作できるとリスクがある
- 将来的には DevTools のより深い機能（Lighthouse、プロファイリング、メモリスナップショット深掘りなど）が MCP 経由で扱えるようになる可能性
- 他の MCP 対応ブラウザ自動化ツール（例えば Playwright MCP）との比較や連携も注目されている領域

## refs

- [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools (MCP) for your AI agent](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [Give your AI eyes: Introducing Chrome DevTools MCP](https://addyosmani.com/blog/devtools-mcp)
- [Chrome DevTools MCP: A New Era of Frontend Automation](https://jimmysong.io/en/blog/web-automation-advancement/)
