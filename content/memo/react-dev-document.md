---
title: React公式docを読んだメモ
tag: react
pubDate: 2023/08/07
---

## これは

[React 公式 doc](https://ja.react.dev/)の翻訳がかなり進んでいたので、これを機に改めて読み直して学んだことを自分用につらつらとまとめます。

ほぼ自分用の雑多なメモなので読みづらい点ご了承ください。

## 学習メモ

### イベントハンドラについて

慣習的に、イベントハンドラは `handle` を prefix としてイベント名を続けて命名することが一般的。

またデザインシステムを使用している場合、ボタンなどのコンポーネントはスタイリングを含んでいるが振る舞いは指定されないことが一般的。
（代わりに、PlayButton や UploadButton のような親コンポーネントからイベントハンドラを渡すようにする）

### state について

#### local の strict mode の挙動

local では strict mode で開発している場合、各コンポーネントの関数を敢えて 2 回呼び出すことで、純粋（同じ入力で同じ出力を返す）でない関数による誤りに気づきやすいような仕組みになっている。

#### バッチング

React はイベントハンドラ内の全てのコードが実行されるまで state の更新処理を待機し、再レンダー時にまとめて更新する（バッチ処理、バッチング）。

また React v18 以前ではイベントハンドラ内での更新処理のみバッチングされていたが、v18 以降では `createRoot` を使うと、すべての更新はどこで発生したかに関わらず、自動でバッチ処理されるようになった。

（参考：[自動バッチング](https://ja.react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching)）

#### 更新用関数について

`setNumber(n => n + 1);`のように、`n => n + 1`と前回の state の値を用いて次の state の値を計算する場合の引数に渡す関数を「更新用関数」と呼ぶ。

また、対応する state 変数の頭文字を使って更新用関数の引数の名前を付けることが一般的。

ex.

```js
setEnabled((e) => !e)
setLastName((ln) => ln.reverse())
setFriendCount((fc) => fc * 2)
```

#### オブジェクトの更新

ネストされたオブジェクトの state の更新時は、スプレッド構文を複数回使うことでオブジェクトのコピーができる。

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  },
})
```

```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' }
const nextPerson = { ...person, artwork: nextArtwork }
setPerson(nextPerson)

// or
setPerson({
  ...person, // Copy other fields
  artwork: {
    // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi', // but in New Delhi!
  },
})
```

または [Immer](https://github.com/immerjs/use-immer) を使えばより簡潔に更新ロジックを記述することもできる。

```jsx
updatePerson((draft) => {
  draft.artwork.city = 'Lagos'
})
```

#### コンポーネントの開発フロー

下記のフローでの説明がされていた。

- コンポーネントの視覚状態をすべて特定する。
- 状態を変更するための人間およびコンピュータのトリガを決定する。
- useState で state をモデル化する。
- バグや矛盾を避けるため、不必要な state を削除する。
- state を設定するためのイベントハンドラを接続する

#### props の state へのコピー

props を state にコピーすると props の変更が state に同期されなくなるため、基本的に避けるべき。
敢えて props の更新を無視したいような場合なら行ってもよい。

また上記のケースでは慣習として props の名前を initial または default で始めるとよい。

```js
// Not Good
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor)
  //...
}

// Good
function Message({ initialColor }) {
  const [color, setColor] = useState(initialColor)
  //...
}
```

### state の保持とリセット

> 再レンダー間で state を維持したい場合、ツリーの構造はレンダー間で「合致」する必要があります。構造が異なる場合、React がツリーからコンポーネントを削除するときに state も破棄されてしまいます。

コンポーネント内にコンポーネント関数をネストして定義をした場合、親コンポーネントの再レンダリング時に子コンポーネントの state がリセットされてしまうため避ける。
（常にコンポーネント関数はトップレベルで宣言し、定義をネストしない）

### 避難ハッチ

#### ref について

React の管理外（doc では隠しポケットと表現）にあり、state と異なり値を更新してもレンダリングがトリガーされない、かつ再レンダー後も値を保持できる。

タイムアウト ID（setInterval()の返り値）、DOM 要素（フォーカス、スクロール位置の管理、または React が公開していないブラウザ API など）、その他コンポーネントのレンダー出力に影響を与えない値を格納するような場合に使用する。

また [ref コールバックを利用して ref のリストを管理する](https://ja.react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback) こともできる。

#### エフェクト（`useEffect`）について

React コンポーネント内の２種類のロジックについて

- UI コード：コンポーネントのトップレベルにあり、画面に表示したい JSX を返す、純粋な計算を行うためのロジック
- イベントハンドラ：コンポーネント内にネストされた関数であり、計算だけでなくプログラムを変更するための副作用を含むロジック

⇨ エフェクトは、特定のイベントによってではなく、レンダー自体によって引き起こされる副作用を指定するためのロジック。

ブラウザ API、サードパーティのウィジェット、ネットワークリクエスト等を通じて外部システムと同期する場合にのみ使用する。

#### 1 つのエフェクトは独立した 1 つの同期の処理を表す

１つのエフェクト内に関係のない処理（ネットワーク接続処理とログイベントの送信処理など）を含めないようにする。

互いに異なる依存値を持つ処理が、同一のエフェクトに含まれると意図しないタイミングで処理が実行されてしまう可能性があるため。
