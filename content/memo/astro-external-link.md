---
title: Astroでマークダウン内の外部リンクにtarget="_blank"を付与する
tag: astro
pubDate: 2024/01/30
---

## これは

Astro でマークダウンの記事内の外部リンクに`target="_blank"`を自動で付与する方法のメモ。
クライアントサイドの JS で HTML の attribute を書き換える方法がネットでよく出てくるが、リクエストの度に処理させるのではなくビルド時に処理する方法になる。

## 方法

今回は[rehype-external-links](https://github.com/rehypejs/rehype-external-links)というライブラリを使用する。

```
npm i rehype-external-links
```

`astro.config.mjs`の`markdown`オプションに以下追記する。（[公式](https://docs.astro.build/ja/reference/configuration-reference/#markdownrehypeplugins)）

```js
markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
}
```

たったこれだけでビルド時に外部ドメインの a タグに`rel="nofollow"`と`target="_blank"`が付与される様になる。
