---
title: Tailwind CSS を v3+に上げると prettier-plugin-tailwind でエラーになる
tag: tailwindcss
pubDate: 2022-02-12
---

tailwind を v2.0 系 ⇨v3.0.19 に上げて開発サーバーを立ち上げた際、下記エラーに遭遇した。

```
Error: Cannot find module '.../node_modules/tailwindcss/lib/util/processPlugins'
Require stack:
- .../node_modules/tailwind-classes-sorter/lib/index.js
- .../node_modules/prettier-plugin-tailwind/lib/index.js
- .../node_modules/prettier-plugin-tailwind/prettier-plugin-tailwind.js
```

`prettier-plugin-tailwind`がアップグレードに対応していないのだろうか？

エラーメッセージを調べていると下記 issue を発見。
[Error when used with Tailwind 3.0.0](https://github.com/tqwewe/prettier-plugin-tailwind/issues/44)

どうやら現在`prettier-plugin-tailwind`のメンテナンスが止まっており、やはり v3 に追従出来ていなかった模様。
[No longer maintained - Looking for maintainers](https://github.com/tqwewe/prettier-plugin-tailwind/issues/46)

さらに現在は tailwind 公式の下記プラグインの利用が推奨されていた。
[Automatic Class Sorting with Prettier](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)

プラグインを差し替えたところ無事ビルドエラーは解消できた。

名前が似ているので正直少し紛らわしい。。

## 追記

`prettier-plugin-tailwindcss`をインストールしたことでビルドエラーは解消したが、デフォルトの prettier による自動整形が動かなくなってしまった。
原因調査に時間を要しそうなので一旦プラグインを削除して様子を見ることにした。
