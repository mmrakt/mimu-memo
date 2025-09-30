---
title: CSS Container Queryの調査メモ
tag: css
pubDate: 2024-01-10
---

## 概要

`@media`（メディアクエリ）の代替となる仕組み。  
従来`@media`を使う場合はビューポート（ウィンドウ）サイズを基準にするしかなかったが、`@container`によって任意の要素を基準にすることが可能になる。

## 関連プロパティ

- `container-type`プロパティ: コンテナコンテキストの種類
  - `inline-size` : インライン柚を基準にする
  - `size`: インライン軸とブロック軸を基準にする
  - `normal`: デフォルト値。後述するサイズクエリは使えないがスタイルクエリは有効
- `container-name`プロパティ: コンテナコンテキストの名前
- `container`プロパティ: 上記二つのショートハンド
  - `container: <container-name> / <container-type>` と記述する

## サイズクエリ

親要素のサイズに対するクエリ方法。

e.g.

````css
.post {
  container-type: inline-size; // クエリコンテナ化
}

@container (min-width: 480px) {
  // クエリコンテナの幅が480px以上
  .post h2 {
    font-size: 3em;
  }
}
``` e.g. `container-name`プロパティでコンテナをスコープ化 ```css .post {
  container-type: inline-size;
}
.post.-large {
  container-name: post-large; // クエリコンテナ名を設定
}

@container (min-width: 480px) {
  .post h2 {
    font-size: 3em;
  }
}

// post-largeクエリコンテナの幅が480px以上
@container post-large (min-width: 480px) {
  .post h2 {
    color: #faa;
  }
}
````

### コンテナクエリに関する長さの単位

- `cqw` : クエリコンテナの幅の 1%
- `cqh` : クエリコンテナの高さの 1%
- `cqi` : クエリコンテナのインラインサイズの 1%
- `cqb` : クエリコンテナのブロックサイズの 1%
- `cqmin` : いずれかの小さい値 `cqi` または `cqb`
- `cqmax` : いずれかの大きい値 `cqi` または `cqb`

e.g. `%`と`cpw`の比較

```css
.percent {
  width: 60%; // 親のボックスモデルの幅が基準になる
}

.container {
  width: 60cpw; // クエリコンテナーの幅が基準になる
}
```

### サポート状況

[@container - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@container)  
全ブラウザで利用可能

## スタイルクエリ

[【CSS】コンテナスタイルクエリ(container style queries)について](https://yuito-blog.com/container-style-queries/)

- 親要素のスタイル値に対するクエリ方法
- `@container style(条件式)`と記述する
- カスタムプロパティしか指定できない（通常のプロパティは使えない）
- サイズクエリと組み合わせることも可能
- サイズクエリと違いクエリコンテナーの宣言がなくても利用可能（宣言することで名前空間を制限できる）

以下の例では、`.child`の要素にスタイルクエリが適用される

```html
<style>
  .parent {
    --textSize: large;
  }

  @container style(--textSize:large) {
    .child {
      font-size: 120px;
    }
  }
</style>

<div class="ancestor">
  <div class="parent">
    <div class="child">child</div>
  </div>
</div>
```

また直接ではない親要素に対しても有効。

```css
.ancestor {
  --textSize: large;
}

@container style(--textSize:large) {
  .child {
    font-size: 120px;
  }
}
```

### 使用例

e.g.  
`--debug`フラグを使ってデバッグモードの切り替え

```css
:root {
  --debug: ;
}
/* :root　もしくは特定の位置で `--debug: 1` すると  
  それ以降のHTMLでデバッグ用の線が出ます */
@container style(--debug: 1) {
  *,
  *:before,
  *:after {
    outline: 2px solid #faaa;
    opacity: 1 !important;
    visibility: visible !important;
  }
}
```

### サポート状況

[CSS Container Style Queries | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/css-container-queries-style)  
Chrome と Edge でのみ利用可能。

## References

- [CSS の新機能 @container コンテナクエリとスタイルクエリ - YouTube](https://www.youtube.com/watch?v=tgAZkJK_Sq8)
- [コンテナクエリ @container が全ブラウザ対応。新時代のレスポンシブ対応を完全理解する](https://zenn.dev/tonkotsuboy_com/articles/css-container-query)
- [Container Queries の沼へようこそ - kojika17](https://kojika17.com/2023/03/css-container-queries-swamp.html)
