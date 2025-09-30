---
title: Next.js での API リクエスト時のエラー API resolved without sending a response ではまった
tag: nextjs
pubDate: 2022-01-29
---

## tl;dr

ただの HTTP メソッドの指定間違いだった。
当たり前だが API 実装時は例外処理も漏れなくカバーしておく。

## 事象

API 実装中に下記エラーが出てうまく動かなくなった。

`API resolved without sending a response for ... this may result in stalled requests.`

どうやらレスポンスの終了処理を正しく行っていないと起きるものらしいが、`res.json()`はちゃんと書いてるので別原因のよう。

当初 API はこんな感じで HTTP メソッドごとに分岐させていた。

```js
switch (req.method) {
  case 'GET':
    //...
    break
  case 'PATCH':
    //...
    break
  case 'DELETE':
    //...
    break
}
```

default 文を忘れているのに気づき追加。

```js
switch (req.method) {
  case 'GET':
    //...
    break
  case 'PATCH':
    //...
    break
  case 'DELETE':
    //...
    break
  default:
    res.status(405).end()
}
```

そして再度 API を叩いてから Devtools の Console を確認すると`POST ... 405 (Method Not Allowed)`が出ていた。
エンドポイントは PATCH で待っていたので 405 になっていただけだった。

特に今回は例外処理の漏れでエラーメッセージを握りつぶしてしまっていたのでなかなか気づけなかった。。

また今回の事象と直接関係はないが、下記を`next.config.js`に追記すればこの手の警告は消せるらしい。

```js
export const config = {
  api: {
    externalResolver: true,
  },
}
```
