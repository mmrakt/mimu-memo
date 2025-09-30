---
title: 自作 Chrome 拡張の公開手順（2023 年 1 月）
tag: other
pubDate: 2023-01-29
---

## これは

初めて chrome 拡張を自作したので、公開手順とその他諸々の対応を雑多にまとめる

## tl;dr

- ストア公開の審査基準が厳しくなっている（らしい）
- その割に不承認の理由がちょっとわかりづらい（レスは結構早い）
- 心当たりのない理由で不承認を食らった時は minify のルールを確認

## 参考

今回こちらの記事を参考させていただいた。
[Chrome 拡張機能開発の始め方 2022 manifest v3](https://zenn.dev/naok_1207/articles/d3fe5c0f8ece5c)

## 手順

基本的には上記記事の手順に従い、アカウントの認証まで済ませる。
次に zip ファイルをアップロードした際にに下記エラーが発生。

> ファイルのアップロード中に問題が発生しました。もう一度お試しください。
> セキュリティを高めるため、このアカウントでは 2 段階認証プロセスを有効にする必要があります。設定するには、https://www.google.com/landing/2step にアクセスしてください。

過去に google アカウントの 2 段階認証をオフにしたような。。とりあえず再度有効化する。

手順は公式手順を参考に。
[2 段階認証プロセスを有効にする](https://support.google.com/accounts/answer/185839?hl=ja&co=GENIE.Platform%3DAndroid)

有効化後、再アップで成功。

### 画像の登録

以下の画像が設定できる。

- ショップアイコン(必須)
  - 128x128
- スクリーンショット（最低 1 枚必須）
  - ストアの詳細画面に表示される画像で、最大 5 枚まで
  - 1280x800 または 640x400
- プロモーションタイル小（必須）
  - ストアの検索結果画面に表示される宣伝用画像
  - 440×280
- マーキープロモーションタイル
  - より大きな宣伝用画像。別に無くても良い
  - 1400×560

少しでも規定のサイズと異なると弾かれるらしい。

筆者は figma でアイコンを用意していたので、全て figma でフレーム調整して export したものを使った。

### プライバシーへの取り組み

必須項目をそれぞれ次のように入力した。
ちなみに今回公開するのはポモドーロタイマーの拡張。

![プライバシーの記載項目](//images.ctfassets.net/y8ww7dmweb1m/2MfIr5dkizzbBG7wAiIQ4u/f958acf958481a9455ba9253a2c405f4/____________________________2023-01-28_22.01.54.png)

日本語でも伝わるのかもしれないが一応英語で。英語の拙さはノーコメントで。

またデータ使用の項目のチェックは今回は特に該当するものは無かったので特にチェックは入れなかった。

### アカウント情報について

最後に下記のメッセージが表示されたが、「アカウント」タブが見当たらない。

> アイテムを公開する前に、連絡先メールアドレスを指定する必要があります。[アカウント] タブで連絡先メールアドレスを入力してください。
> アイテムを公開する前に、連絡先メールアドレスを指定する必要があります。[アカウント] タブで確認プロセスを開始してください。

少し探したが、左上のハンバーガーメニューの中にあった。

![アカウントタブの場所](//images.ctfassets.net/y8ww7dmweb1m/2njX4XqGNhhjcATVqaO0uQ/3b571bfb296e2fed653e11c772c89d3e/____________________________2023-01-28_23.30.02.png)

案内に従ってメールアドレス認証も済ませる。

これで晴れて送信が可能になり申請が完了。

## 不承認（1 回目）

翌日くらいに審査結果がメールで届いた。

> **違反事項:**
>
> - 提供されている説明が、アイテムの機能を理解するのに十分でない。

やっぱり流石に説明不足すぎたか。。

ちゃんと機能を網羅的に書くようにしてみた。

```
A simple pomodoro timer to improve productivity

シンプルで直感的なUIが特徴のポモドーロタイマーです。

特徴
・シンプルなUI
・短い休憩と長い休憩の切り替え
・ショートカットキーでタイマーを停止/再開
・ポモドーロ実施の記録
・過去の履歴のインポート/エクスポート
・デスクトップとタブの完了通知

A simple pomodoro timer to improve productivity

Features
・Simple UI
・Short and long breaks
・Shortcut key setting
・Recording pomodoro archives
・Import/export archives
・Desktop/tab notifications of completion
```

これで再度申請してみる。

## 不承認（2 回目）

> 違反: 説明に表記されている機能を提供していない
> Invalid value for 'commands[1].default': MacCtrl+Shift+T
> 修正方法: ウェブストアに送信したコードをローカルでテストし、ファイルが正しいパスで含まれていて、想定どおりに動作することを確認してください。詳しくは、Manifest V3 バージョンに関するドキュメントと移行チェックリストをご覧ください。
> **違反事項:** 次の権限をリクエストしているが使用していない。
>
> - storage
> - tabs
> - notifications
> - **修正方法:** 上記の権限を削除します。

あれ、ship 前にちゃんと動作確認はしたはずなのに。。
しかもショートカットキーの問題だけならまだしも、Storage API とかは絶対使ってるはず。。

理由が謎だったのでサポートページのフォームから問い合わせてみる。

そして後日返答が来た。

> [Use of permissions](https://developer.chrome.com/webstore/program_policies#permissions) :
>
> - Violation : Extension is requesting storage,tabs,notifications permission but not using it anywhere in the code.
> - How to rectify : Please remove the storage,tabs,notifications permission from the manifest file.

> [Spam - Broken Functionality](https://developer.chrome.com/webstore/program_policies#spam) :
>
> - Violation: Unable to install the extension. While Installing, it throws the following error : “ Package is invalid.Details:’Invalid value for 'commands[1].default': MacCtrl+Shift+T.’. ”
> - How to rectify: Please package your extension properly and re-submit on the developer dashboard.

前回のメッセージが英文になっただけで結局何も分からない。。

もちろん全部の API を使っているし、当然だが逆に permission から外すと動かなくなる。

モヤモヤしてるとこの記事に辿り着いた。
[chrome 拡張の審査がとおらない](https://qiita.com/ctrlzr/items/80bd6e9c4e1e73ca8c41#min%E5%8C%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

何となく感じていたけどやっぱり minify が原因か。
本番ビルドの中身見てももはや解読不能な状態だし。

> Ordinary minification, on the other hand, typically speeds up code execution as it reduces code size, and is much more straightforward to review. Thus, minification will still be allowed, including the following techniques:
>
> - Removal of whitespace, newlines, code comments, and block delimiters
> - Shortening of variable and function names
> - Collapsing the number of JavaScript files

> If you have an extension in the store with obfuscated code, please review our updated [content policies](https://developer.chrome.com/webstore/program_policies#content_policies) as well as our [recommended minification techniques](https://developers.google.com/speed/docs/insights/MinifyResources) for Google Developers, and submit a new compliant version before January 1st, 2019.

多分この辺に引っかかってるのか。

minify の設定いじれば解消できそうだが、めんどくさいので一旦 minify 無しでビルドしてみる。
（ちなみに自作拡張は CRXJS と Vite で構築している）

minify 有無のビルドサイズは

- minify 無し：1.9MB
- minify 有り：1.3MB

うーん許容範囲内か。

## 三度目のトライ

- 本番ビルドの minify をオフ
- ショートカットキーを「MacCtrl」を使わず「Command」に変更

翌日、特に結果の返信はなかったがダッシュボードを見ると公開済みに。。よかった。。

公開申請で苦戦している方がもし見ていらっしゃれば、諦めないでと一言だけ。。
