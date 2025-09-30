---
title: Jest から Vitest への乗り換えメモ
tag: vite
pubDate: 2022-10-15
---

## 動機

typescript 製のアプリを jest でテストしていた際に下記エラーに遭遇。

```
Jest encountered an unexpected token
..省略

SyntaxError: Unexpected token 'export'
```

外部ライブラリによって esm 絡みのエラーが起きた。
ググると`ts-jest`の設定変更で esm サポートが可能との情報が見つかったが、色々試してみるも何故か解消できず。
（単純に理解不足だろうが）

そこでデフォルト esm 対応の Vitest への乗り換えを検討した。
トイプロダクト&コンポーネントも 10 数個しかないのでサクッと乗り換えられるだろうと思い、勢いで試してみた。

## 作業メモ

公式にも[migration guide](https://vitest.dev/guide/migration.html) は載っているが、今回は下記の記事を参考にした。
[Migrating from Jest to Vitest](https://cathalmacdonnacha.com/migrating-from-jest-to-vitest)

まずは関連ライブラリ一式を入れる。

```
yarn add -D vitest jsdom c8
```

ちなみに`c8`はカバレッジレポート出力用のライブラリらしい。初知り。

次にルートに`vitest.config.js`を作成

```js
/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setupTests.ts'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
})
```

基本的には元々の jest のオプションをそのまま踏襲。

ファイル名は`vite.config.js`でも問題ないが、`vitest.config.js`の方が適用の優先順位が高いとのこと。

また`package.json`のスクリプトを修正。

```diff
-  "test": "jest --watch",
-  "test:coverage": "jest --collect-coverage",
+ "test": "vitest watch --config ./vitest.config.ts",
+ "test:no-watch": "vitest run --config ./vitest.config.ts",
+ "test:coverage": "vitest run --coverage --config ./vitest.config.ts",
```

各テストファイルのモック関数を差し替え。

```diff
- jest.mock()
+ vi.mock()
```

自分の環境の場合、ほぼこれだけで置き換えることができた。
もちろん前述の esm 絡みの問題も難なく解消できた。

## 所感

パフォーマンス改善目的ではなかったためベンチマークは取ってないが、体感では速くなっている気がする。
ただやはりまだ jest と比較して認知度が低いので、何かしらエッジケースにハマった時の情報の少なさがネックになるかもしれない。
