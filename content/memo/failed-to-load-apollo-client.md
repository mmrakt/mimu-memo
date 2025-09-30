---
title: Apollo Client が読み込めなくてハマった
tag: other
pubDate: 2021-12-29
---

Next.js 製のアプリで Apollo Client を使用する際に、下記エラーが解消できずしばらくはまってしまった。

```
Invariant Violation: Could not find "client" in the context or passed in as an option. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via options.
```

簡略化するとコードは以下の状態。

```js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'

function MyApp(props: AppProps) {
  const client = () => {
    return new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:8080/v1/graphql',
        credentials: 'same-origin',
      }),
      cache: new InMemoryCache(),
    })
  }

  return (
    <>
      <ApolloProvider client={client}>
        ...
        <Component {...pageProps} />
        ...
      </ApolloProvider>
    </>
  )
}
```

`AuthProvider`を古い方のライブラリ（`'@apollo/react-hooks'`）から import していたので`@apollo/client`から import するように変更。
すると以下のエラーに変わった。

```
TypeError: client.watchQuery is not a function
```

`@apollo/client`と`graphql`のバージョンを上げてみた。

```json
- "@apollo/client": "^3.3.6",
+ "@apollo/client": "^3.5.6",

- "graphql": "^15.4.0",
+ "graphql": "^15.8.0",
```

しかしエラーは変わらず。

## 原因

`ApolloClient`の初期化処理に問題があった。
コールバックで呼び出していたところを下記のように修正。

```js
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
})
```

これで無事エラーが解消できた。
