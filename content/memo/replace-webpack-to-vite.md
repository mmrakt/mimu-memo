---
title: 自社サービスのビルドツールをWebpackからViteに置き換えてみた
tag: vite
pubDate: 2022-05-28
---

## これは

社内の LT 会で発表した資料の供養。
スライドをマークダウンに書き直しただけ。

## 前提

- 自社サイトの技術スタック Laravel 製で、フロントエンドは vue
- ビルドは webpack 使ってる
- ビルドに 5 分くらいかかる。辛い

以下スライド本文。

## tl;dr

- フロントエンドのビルドが遅すぎて辛い
- ビルドツールを Webpack ⇨ Vite に置き換えた
- ビルドが最大 6 倍程度早くなった（後述）

## Vite（ヴィート）

- ノーバンドルのビルドツール
- webpack や他と違って最低限のバンドル（プレバンドル）のみ行うためビルドが爆速
  - dynamic import, import.meta というブラウザ標準機能を活用
- HMR（ファイル変更のブラウザへの自動反映）も爆速

## どんくらい使われてんの

state of js 2021 のビルドツールのランキング結果を参考に

https://2021.stateofjs.com/ja-JP/libraries/build-tools/build_tools_experience_ranking

## どうやって使うの

## Laravel Vite

[https://laravel-vite.dev/](https://laravel-vite.dev/)

- webpack でいう Laravel mix 的なやつ
- vite 本体を抽象化して扱いやすくしたもの
- 新規の Laravel プロジェクトならコマンド一発でセットアップ完了するよ
  ```
  npx @preset/cli apply laravel:vite
  ```

## とりあえず使ってみる

## セットアップ手順

- 諸々バージョンアップする
- 設定ファイル修正する

## 必須要件

vite

- vue: ^3.0

laravel-vite

- PHP: ^8.0
- Laravel: ^8.0

※その他依存ライプラリは割愛

## 蛇足（愚痴）

- vue2⇨3 の migration がまあまあ辛い（これで丸 3 日費やしたなんて言えない）
- vue-property-decorator が vue3 対応しておらずデコレータを認識できずにエラーに
- vue2 のままでも vite が使えるようになるライブラリ（vite-plugin-vue2）を入れて何とか頓挫せずに済んだ

## 設定ファイル修正

- webpack の既存設定を vite 向けにアレンジ
- スピード重視でかなり雑な設定なのは多めに見てください。。

```js
import { defineConfig } from 'vite'
import laravel from 'vite-plugin-laravel'
import eslint from 'vite-plugin-eslint'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import path from 'path'
import glob from 'glob'

export default defineConfig(({ command }) => ({
  base: '',
  build: {
    root: '/',
    base: '/',
    manifest: true,
    outDir: path.resolve(__dirname, 'public/assets'),
    rollupOptions: {
      input: glob.sync('resources/js/**/*.ts').map(function (file) {
        return file
      }),
      output: {
        chunkFileNames: '[name].chunk.js?id=[hash]',
      },
    },
  },
  plugins: [vue(), laravel(), eslint()],
  resolve: {
    alias: [
      {
        find: '@js',
        replacement: path.resolve(__dirname, 'resources/js'),
      },
      {
        find: '@img',
        replacement: path.resolve(__dirname, 'resources/img'),
      },
      {
        find: '@sass',
        replacement: path.resolve(__dirname, 'resources/sass'),
      },
      {
        find: '@node_modules',
        replacement: path.resolve(__dirname, 'resources/node_modules'),
      },
      {
        find: /^~(.*)$/,
        replacement: '$1',
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', 'vue'],
  },
  optimizeDeps: {
    include: ['vue'],
  },
}))
```

## webpack とパフォーマンス比較してみる

## ビルド

※設定を完全には引き継げてないので出来る限り条件を揃えた上で比較

|        | webpack | vite（手動計測） |
| ------ | ------- | ---------------- |
| 1 回目 | 202.88s | 31.52s           |
| 2 回目 | 179.62s | 29.76s           |

## 開発サーバ立ち上げ

- vite
  - 初回：3563ms
  - 2 回目：1545ms

## 出来なかったこと

- 画面表示まだ出来てない（とりあえずビルド通った状態）
- 設定の移行も不十分
  - sass の import 文のワイルドカード対応とか
- webpack4→5 のパフォーマンス比較も未検証
- 他ツールの HMR との反応速度の比較もしたい

## 所感

- 噂通りの爆速具合で DX はかなり改善されそう
- 中で esbuild とか rollup を使ってるので本格導入するならその辺のキャッチアップも必要

## 参考

- https://ja.vitejs.dev/
- https://laravel-vite.dev/
- https://2021.stateofjs.com/en-US/
- https://zenn.dev/uhyo/articles/what-is-native-esm-era
- https://2021.stateofjs.com/en-US/libraries/build-tools
