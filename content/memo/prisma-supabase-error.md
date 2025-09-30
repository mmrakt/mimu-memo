---
title: Prisma × Supabaseの本番環境で起きた`prepared statement "sx" already exists` のエラーの対処
tag: other
pubDate: 2022-10-05
---

## tl;dr

接続するデータベース URL の末尾に`?pgbouncer=true`をくっつけてやると解決。

## 技術スタック

- FW: Next.js
- ホスティング: Vercel
- 認証: NextAuth
- ORM: Prisma
- DB: supabase(PostgreSQL)

## 調査メモ

NextAuth の Oauth 認証（Google）でログインした際に 500 エラーが発生。

supabase 側の Realtime Logs を確認したところ下記のメッセージを確認。

```
prepared statement "sx" already exists
```

メッセージでそのままググると prisma リポジトリでの下記 issue 発見。
[prepared statement \"s0\" already exists #11643](https://github.com/prisma/prisma/issues/11643)

メンテナーの方の[コメント](https://github.com/prisma/prisma/issues/11643#issuecomment-1057189238)で issue は close されていた。
`pbbouncer` を有効にする必要があるらしいがどこで設定してるんだ？

そんな疑問は prisma の公式 doc の記事で秒で解決した。
[Configure Prisma Client with PgBouncer](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/configure-pg-bouncer)

なるほど、データベース URL のクエリパラメータにくっ付ければいいのね。

Vercel の環境変数で指定しているデータベース URL を書き換えてやって、再度ログインを試してみると今度は成功してあっさり解決。

supabase のコネクションプーリングの設定の存在は知っていたが、Settings で Connection Pooling を enabled に設定していると勝手に使えるものだと勘違いしていた。

単純に postgres も prisma も理解が浅かった。。
