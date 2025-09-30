---
title: gatsby3⇨4 へのアップグレード時のハマりメモ
tag: gatsby
pubDate: 2021-12-04
---

## tl;dr

`gatsby-transformer-sharp`のバージョンアップでビルドが壊れたが、単純に関連ライブラリのバージョンアップ漏れだった

## gatsby のアップグレード

本ブログで使用している`gatsby`は現在`v3.14.2`。
これを v4 の最新バージョンに上げてみる。

基本的には公式のアップグレードガイドに従えばスムーズにいくと思われる。
[Migrating from v3 to v4](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/)

## 関連ライブラリのアップデート

ここが結果的に時間がかかった。。

とりあえず`gatsby-*`のライブラリを一括で最新バージョンに引き上げてから`gatsby develop`してみる。

すると下記エラーが発生。

```
 ERROR #98123  WEBPACK

Generating development JavaScript bundle failed

Invalid Options:
- Unknown options: options

File: .cache/blank.css

 ERROR #98123  WEBPACK

Generating development JavaScript bundle failed

Invalid Options:
- Unknown options: options

File: src/styles/global.css

 ERROR #98123  WEBPACK

Generating development JavaScript bundle failed

Invalid Options:
- Unknown options: options

failed Building development bundle - 27.140s
ERROR in ./.cache/blank.css
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
Invalid Options:
- Unknown options: options
 @ ./.cache/app.js 22:0-21

ERROR in ./src/styles/global.css
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
Invalid Options:
- Unknown options: options
 @ ./gatsby-browser.js 4:0-33
 @ ./.cache/api-runner-browser-plugins.js 15:10-41
 @ ./.cache/api-runner-browser.js 4:14-53
 @ ./.cache/app.js 9:0-65 26:87-30:1 34:20-29 47:0-14 113:17-26 140:6-15 26:0-30:2

ERROR in Invalid Options:
- Unknown options: options
```

エラーログがいまいちピンとこない。。

とりあえず原因切り分けの為一つずつ上げて行ってみることにする。

まずは`gatsby-plugin-eslnit`を最新版に上げる。

するといきなり上記と同じエラーに。。

しかし公式ページを見ると`Now working with Gatsby V3`と記載があった。なるほど v4 はまだ未対応なのか。
[gatsby-plugin-eslint](https://www.gatsbyjs.com/plugins/gatsby-plugin-eslint/?=gatsby-plugin-eslint)

とりあえずこの要領で一つずつライブラリの対応状況を見ながらアップデートをかけていく。

`gatsby-*`のライブラリを一通りバージョンアップしてから再度`gatsby develop`

```
  Error: Something went wrong installing the "sharp" module
  dlopen(/Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby-transformer-sharp/node_modules/sharp/build/Release/sharp-darwin-x64.node, 1
  ): Library not loaded: @rpath/libvips-cpp.42.dylib
    Referenced from: /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby-transformer-sharp/node_modules/sharp/build/Release/sharp-darwin
  -x64.node
    Reason: Incompatible library version: sharp-darwin-x64.node requires version 56.0.0 or later, but libvips-cpp.42.dylib provides version 55.
  0.0
  Possible solutions:
  - Update Homebrew: "brew update && brew upgrade vips"
  - Consult the installation documentation: https://sharp.pixelplumbing.com/install
```

こんなエラーが出た。

エラーログに従い`brew update && brew upgrade vips`実行（20 分ほどかかる）。

しかし同じエラーのまま解消せず。

バージョンの不整合の問題かと思い、とりあえず`gatsby-transformer-sharp@^3.0.0`で再インストールしてみるがこれでも解消せず。

どうしたものかと少し悩んでいると、公式が出してるトラブルシュートにまさにエラーについての言及がありました。。
[Incompatible library version: sharp.node requires version X or later, but Z provides version Y](https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/?=gatsby-transformer#troubleshooting)

記載の関連ライブラリを一通り最新化してみる。
すると別のエラーに変わった。

```
  Error: Something went wrong installing the "sharp" module
  Cannot find module '../build/Release/sharp-darwin-x64.node'
  Require stack:
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/sharp/lib/sharp.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/sharp/lib/constructor.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/sharp/lib/index.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby-plugin-sharp/safe-sharp.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby-plugin-sharp/index.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby-plugin-sharp/gatsby-node.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/bootstrap/resolve-module-exports.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/bootstrap/load-plugins/validate.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/bootstrap/load-plugins/load.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/bootstrap/load-plugins/index.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/bootstrap/load-config-and-plugins.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/services/initialize.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/services/index.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/state-machines/develop/services.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/state-machines/develop/index.js
  - /Users/mimuraakito/workspace/mimu-memo/node_modules/gatsby/dist/commands/develop-process.js
  - /Users/mimuraakito/workspace/mimu-memo/.cache/tmp-83698-8Nwdv8plKRNf
  Possible solutions:
  - Install with the --verbose flag and look for errors: "npm install --ignore-scripts=false --verbose sharp"
  - Install for the current runtime: "npm install --platform=darwin --arch=x64 sharp"
  - Consult the installation documentation: https://sharp.pixelplumbing.com/install
```

こちらは`node_modules/`を削除してから`yarn install`すると解消。

これで一旦ビルドは通るようになったので後はデグレ確認を進めていく。。

ちなみに v3 での`gatsby develop`が 15s 程度だったのが v4 にしてから 30s 程かかるようになっていた。

最適化すればもっと早くなるはずなので今後の課題。。
