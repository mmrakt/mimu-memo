---
title: gatsby ブログ用に取得した独自ドメインを vercel に登録する際に `Invalid Configuration` からステータスが更新されずハマった
tagList:
  - gatsby
pubDate: 2021-10-16
---

## 経緯と原因

※vercel への独自ドメイン設定手順は色々な方が記事を書かれてるので本記事では特に言及はしません。

自分は今回以下の記事を参考にしドメイン設定を行った。
[Vercel のウェブサイトに独自ドメインを割り当てる](https://maku.blog/p/9vakw8i/)

すでにお名前.com にてドメインを取得済みだったので、あとは手順に従い DNS レコード設定を完了。
しかしその後しばらく待っても`Invalid Configuration`からステータスが変わらない、、
とりあえず 1 日待ってみる、が待てども変わらず。
vercel 側もお名前.com 側の設定も間違ってはなさそうだが、、

と、ふとお名前.com のドメイン詳細のステータスをみると「registry hold」になっていた
[https://help.onamae.com/answer/15333?\_bdld=3O7B-g.nLFTnqW.1632047453&\_ga=2.247173453.895176236.1631940023-1082619635.1631716211](https://help.onamae.com/answer/15333?_bdld=3O7B-g.nLFTnqW.1632047453&_ga=2.247173453.895176236.1631940023-1082619635.1631716211)

> 「ドメイン登録」「他社からの移管」「名義変更による登録者情報メールアドレス変更」時に
> 対象ドメインにて一度も認証手続きを行ったことのないメールアドレスが設定されており
> 期日までに認証がされなかった際の制限。

確かに「ご利用制限解除 お手続きのご案内」なるメールが届いてたが華麗にスルーしていた。

ということで結局メアド認証忘れが原因というオチでした。
（ちなみに認証完了後、5~10 分後には vercel 側でも認証成功していた）

しょうもないオチですが、確認メールのチェック忘れには気をつけよう自分