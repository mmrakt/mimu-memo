---
title: pnpm + Next.js + Tailwind CSS v4でnativeバインディングエラー
tag: "tailwindcss"
pubDate: 2025-07-14
---

## tl;dr

Next.js 15.3.4 + Tailwind CSS 4.1.11 + pnpm 環境で`pnpm dev`実行時に Tailwind CSS の native バインディングエラーが発生。`@tailwindcss/oxide-darwin-arm64`パッケージを追加インストールすることで解決した。

## 発生したエラー

```
Error: Failed to load native binding
Error: Cannot find module './tailwindcss-oxide.darwin-arm64.node'
```

M1/M2 Mac で Tailwind CSS v4 系を使用する際、ARM64 アーキテクチャ用の native バインディングが見つからないというエラー。

## 試したこと

1. **クリーンインストール** - `node_modules`と`.next`を削除して`pnpm install`実行 → 解決せず
2. **pnpm approve-builds** - ビルドスクリプトの承認を試みたが、pnpm のセキュリティ機能により自動実行されず
3. **.npmrc の設定** - `ignore-scripts=false`を追加したが、pnpm には効果なし

## 解決方法

ARM64 用の Tailwind パッケージを明示的にインストール：

```bash
pnpm add -D @tailwindcss/oxide-darwin-arm64
```

## 原因

Tailwind CSS v4 ではパフォーマンス向上のため Rust 製の Oxide エンジンを使用。pnpm のデフォルト設定では、セキュリティ上の理由から postinstall スクリプトが自動実行されないため、プラットフォーム固有のバイナリがインストールされない。

## メモ

- Tailwind CSS v4 は 2024 年 12 月にリリースされたばかりで、まだエコシステムが成熟していない
- pnpm の`approve-builds`コマンドは対話的な選択が必要で、CI/CD 環境では使いづらい
- 今後のバージョンアップで改善される可能性あり
