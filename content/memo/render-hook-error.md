---
title: renderHookでcurrentがundefinedになる原因
tag: react
pubDate: 2023-02-23
---

## tl;dr

renderHook の引数のコールバックをブロック`{}`で囲っちゃだめ。

## 経緯

自作 React アプリのカスタムフックのテストをする際、renderHook で返り値の中身を見ると undefined になっていて暫くハマった。

実装の詳細は割愛するが、超絶単純化するとこんなノリのテストを書いてた。

```js
const { result } = renderHook(() => {
  useCounter(100)
})

console.log(result.current) // undefined
```

state の更新タイミングの問題なら`waitFor`が必要って話はよくあるが、`undefined` なっちゃうのはなんで。。？

暫くハマったが、公式の書き方と比較した時にブロック`{}` の有無の差に気づいた。まさか。

```js
const { result } = renderHook(() => useCounter(100))

console.log(result.current) // 100!
```

なんと。
こんなミスに遭遇する人はそうそういないと思うが念のため。。
