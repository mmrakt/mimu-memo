---
title: Next.jsのv12⇨v14へのアップグレード作業
tag: "nextjs"
pubDate: 2024/02/27
---

## 概要

業務アプリの Next.js を v12 から現在最新版の v14.1 にアップグレードした際の作業メモ。

## メモ

### 関連ライブラリのアップグレード

まずは関連ライブラリ一式をアップグレードする。

```
yarn add next@latest react@latest react-dom@latest eslint-config-next@latest @types/react @types/react-dom
```

この時点で`yarn build`した際に以下エラーとなったため、

```
Error: "next start" does not work with "output: export" configuration. Use "npx serve@latest out" instead.
```

案内に従い、Vercel のスタンドアロンのライブラリの`serve`を入れてコマンドを書き換えた。

```json:package.json
-   "build": "next build && next export",
-   "start": "next start",
+   "build": "next build",
+   "start": "serve out",
```

次に`next/link`の`Link`コンポーネントの仕様が変わり、中に`a`タグが不要に（入れられなく）なったため、手動で削除を実施。\
（小規模アプリにつき 3 つくらいしか無いので瞬殺だったが、大規模アプリだとここが辛そう）

### Storybook のアップグレード

次に storybook を v6⇨v7 にアップグレードする。

基本的には`npx storybook@latest upgrade`のコマンドを実行するたけでほとんど完結する想定。\
（[公式ガイド](https://storybook.js.org/recipes/next)）

実行時の設定内容は以下の通り。

```sh
// FWのプラグイン（@storybook/nextjs）の要否
Do you want to run the 'new-frameworks' migration on your project? … yes
// eslintプラグイン（eslint-plugin-storybook）の要否
Do you want to run the 'eslintPlugin' migration on your project? … yes
// storybook本体の要否
Do you want to run the 'storybook-binary' migration on your project? … yes
// storybook CLIコマンドの変更
Do you want to run the 'sb-scripts' migration on your project? … yes
// コンポーネントのドキュメントの自動生成（既存設定に合わせてoff）
 Do you want to run the 'autodocsTrue' migration on your project? … no
```

これにより関連プラグイン一式のアップグレードが完了。

### Storybook 上で画像が表示されない問題

`.storybook/preview.tsx`内に以下の記述があり、その影響で Storybook のプレビュー環境で`Cannot redefine property: default`のエラーが発生。

```tsx:.storybook/preview.tsx
// next/imageコンポーネントを通常のimgに置き換える
// see: https://github.com/vercel/next.js/issues/18393#issuecomment-765426413
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
})
```

[issue](https://github.com/storybookjs/storybook/issues/23684#issuecomment-1794357809) によると`@storybook/nextjs`の最新版ではデフォルトで`next/image`をサポートしており、上記ハックが不要になった模様。

上記設定を削除しエラーは回避できたが、プレビュー上では画像が表示できていない（404 の）状態。

[こちらの記事](https://stackoverflow.com/questions/77599258/images-loaded-using-next-image-isnt-shown-in-storybook)を参考に`.storybook/main.js`に`staticDirs: ['../public'],`のオプションを追加。

また同時に storybook CLI のコマンドの`-s`オプションが非推奨になっていたためオプションを削除した。
（[公式](https://storybook.js.org/docs/api/cli-options)）

これで無事 storybook 上で画像の表示に成功。

## 雑感

Next.js というよりほとんど Storybook のアップグレード対応に時間を費やすことになった。
