---
title: Vercelデプロイで.pnpm-storeがバンドルに含まれて250MB制限エラーになる
tag: "npm"
pubDate: 2025-07-14
---

※以下はClaude Codeと一緒に調査した際のやり取りをそのまま文章化させたものです

## tl;dr

Next.js + pnpm で Vercel デプロイ時に`.pnpm-store`（約 700MB）がサーバーレス関数に含まれて 250MB 制限に引っかかった。原因は Next.js のファイルトレーシング機能。

**解決策:**

```javascript
// next.config.js
module.exports = {
  outputFileTracingExcludes: {
    "*": [".pnpm-store/**/*"],
  },
};
```

## 調査ログ

Vercel ビルドで以下エラー

```
Warning: Max serverless function size of 250 MB uncompressed reached
Large Dependencies                                   Uncompressed size
.pnpm-store/v10/files                                       708.41 MB
```

### 仮説 1: pnpm バージョン問題

最初は pnpm バージョンが原因だと思った。

**動いてたプロジェクト:**

- pnpm v10.13.1
- `.pnpm-store`含まれない

**動かないプロジェクト:**

- pnpm v9.15.9（プロジェクト作成日で自動選択）
- `.pnpm-store/v9/files`が 700MB

packageManager で固定してみる。

```json
{
  "packageManager": "pnpm@10.13.1"
}
```

バージョンは v10 になったが問題変わらず。

```
.pnpm-store/v10/files    708.41 MB
```

### 仮説 2: .vercelignore で除外

```
.pnpm-store/
**/.pnpm-store/
```

ビルドログ：

```
Found .vercelignore
Removed 25 ignored files defined in .vercelignore
```

しかし効果なし。**タイミングが問題だった:**

1. `.vercelignore`適用（既存ファイル削除）
2. `pnpm install`実行
3. **新しく`.pnpm-store`生成**
4. Next.js ビルドトレーシングが含んでしまう

## 原因

Next.js の`outputFileTracing`が`.pnpm-store`を依存関係として誤認識してた模様。

- `.vercelignore` = デプロイ時除外用
- ビルド中生成ファイル = 対象外
- ファイルトレーシング = `.pnpm-store`を勝手に含む

## 解決

以下で解決。

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingExcludes: {
    "*": [".pnpm-store/**/*", "**/pnpm-store/**/*", "**/.pnpm-store/**/*"],
  },
};

module.exports = nextConfig;
```

ついでにビルド時間も爆速になった（5min -> 1min）

### 代案

**ストア場所変更:**

```bash
# .npmrc
store-dir=/tmp/pnpm-store
```

**ビルド時削除:**

```json
{
  "scripts": {
    "build": "rm -rf .pnpm-store && next build"
  }
}
```

**webpack 除外:**

```javascript
webpack: (config, { isServer }) => {
  if (isServer) {
    config.externals.push({ ".pnpm-store": "commonjs .pnpm-store" });
  }
  return config;
};
```

## メモ

### 勘違いしてたこと

- **pnpm バージョン問題じゃなかった** - v9 と v10 の違いは主に lockfile フォーマット改善
- **`.vercelignore`だけじゃダメ** - ビルド時生成ファイルは無理
- **Next.js のファイトレーシングが諸悪の根源**

### pnpm v10 の主な変更点

調べてみたら以下の違いがあった：

**pnpm v10 の主要変更:**

- ストアバージョンが v10 にアップ、インデックスファイル構造変更でサイドエフェクトをより効率的に追跡
- セキュリティ強化：依存関係のライフサイクルスクリプトがデフォルトで無効
- node_modules/.pnpm 内で#文字がエスケープされるように

**lockfileVersion:**

- v9 と v10 両方とも lockfileVersion '9.0'を使用
- Vercel は新規プロジェクトで lockfileVersion '9.0'を検出すると自動的に pnpm v10 を使用

### 推奨設定

```javascript
// next.config.js
const nextConfig = {
  outputFileTracingExcludes: {
    "*": [".pnpm-store/**/*"],
  },
};
```

```json
// package.json
{
  "packageManager": "pnpm@10.13.1"
}
```

**注意：** Next.js 15 以降、`outputFileTracingExcludes`は実験的機能から安定機能に昇格した。`experimental`配下に置く必要はない。

以上。pnpm 使うならこの設定入れとけば安心。
