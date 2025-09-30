---
title: Gatsby製の個人ブログ上でQiitaやZenn経由の記事をまとめて一覧表示できるようにする
tag: gatsby
pubDate: 2023-04-04
---

## これは

Qiita や Zenn 等のプラットフォームで投稿した post を本ブログの一覧表示に含めるようにした際の自分用の備忘録。

また個人ブログ ⇨Qiita という流れは OK だが、逆に Qiita→ 個人ブログという流れはアフィリエイト目的とかだと規約的に NG らしいので前者の方法を取る。

## やり方

各プラットフォームのフィードの取得方法は下記記事を参考にした。

[Qiita や note に投稿した記事一覧を Gatsby で表示する](https://www.zakioka.net/blog/gatsby-qiita-note-post-list)

RSS でフィードを取得するための専用の gatsby プラグインがあるらしい。
記事の取得処理の実装自体は上記記事の手順通りにすればほぼ OK だった。

### ハマりどころ

各プラットフォームの記事データをまとめて、ページネーション処理をする部分で少しはまった。

現状は下記ライブラリを使用しているが、仕様上、記事データを template 側の pageContext に渡すことができないっぽい。
https://github.com/GatsbyCentral/gatsby-awesome-pagination

ので、代わりに下記ライブラリを使用するようにした。こちらであればページネーション用の API に記事データを引数から渡せる。
https://github.com/pixelstew/gatsby-paginate

また API のインターフェースはほぼ同じなので以降はスムーズにできた。

今回の実装方法は下記リポジトリの実装を参考にさせてもらった。
https://github.com/mottox2/website

そして最終的に下記のような実装になった。（コミットが汚い。。。）
https://github.com/mmrakt/mimu-memo/commit/0a0ff1951459c0312bae304c6630def73e5ca964

ちなみに graphql で日付情報を格納したフィールドを unix タイムスタンプ形式で取得したい場合は

```
date(formatString: "X")
```

を指定するといい感じに変換してくれた。
