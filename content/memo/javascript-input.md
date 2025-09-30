---
title: JavaScript復習メモ
tag: javascript
pubDate: 2023-04-15
---

[JAVASCRIPT.INFO](https://ja.javascript.info/) という JavaScript のチュートリアルサイトを読んで改めて学んだことを自分用につらつらまとめます。

※誤った情報や理解を含む場合があるのでその点ご了承ください。

## メモ

### オブジェクトの分割代入

オプジェクトの分割代入ではネストしているプロパティや配列要素もダイレクトに取ることができる。

```js
let options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ['Cake', 'Donut'],
  extra: true,
}

// destructuring assignment split in multiple lines for clarity
let {
  size: {
    // put size here
    width,
    height,
  },
  items: [item1, item2], // assign items here
  title = 'Menu', // not present in the object (default value is used)
} = options

alert(title) // Menu
alert(width) // 100
alert(height) // 200
alert(item1) // Cake
alert(item2) // Donut
```

### オブジェクト形式での関数の引数指定

引数をオブジェクト形式でまとめつつ、デフォルト値を`{}`で指定できる。

```js
function showMenu({ title = 'Menu', width = 100, height = 200 } = {}) {
  alert(`${title} ${width} ${height}`)
}

showMenu() // Menu 100 200
```

### Map, Set オブジェクトについて

- Map はどんな型のキーでも取ることができる
- Set はユニークな値のみセットすることができる

### GC（ガベージコレクション）

- 到達不能になった変数などの値をメモリから解放する
- 低水準言語の C などと異なり、高水準言語の JavaScript では明示せずとも自動で実行される
- JS エンジンによって GC のテクニックや調整方法は異なる

### 配列要素の操作

- pop: 後尾から取り出す
- push：後尾に追加する
- shift：先頭から取り出す
- unshift：先頭に追加する

#### パフォーマンス

メソッド push/pop は処理が速く、shift/unshift は遅い（インデックスの振り直しが発生するため）。

### 配列のループ処理

- `for (let i=0; i<arr.length; i++)`：最も速く動作し、古いブラウザ互換がある
- `for (let item of arr)`： インデックスにはアクセスできない（要素のみ可）が、簡潔に記述できる
- `for (let i in arr)`：汎用オブジェクトに最適化されているため、配列オブジェクトでは極力使用するべきではない

### JSON.parse 時の復帰関数

`JSON.parse ｀時に文字列型ではなく、特定の型に変換させたい場合は第二引数にコールバック関数を渡して処理する。

```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}'

let meetup = JSON.parse(str, function (key, value) {
  if (key == 'date') return new Date(value)
  return value
})

alert(meetup.date.getDate()) // 動作します!
```

### `func.call()`の使用例

明示的に this の参照先を指定して関数を実行する際に利用する。
例：

```js
let worker = {
  someMethod() {
    return 1
  },

  slow(x) {
    alert('Called with ' + x)
    return x * this.someMethod() // (*)
  },
}

function cachingDecorator(func) {
  let cache = new Map()
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x)
    }
    let result = func.call(this, x) // "this" は正しいものが渡されます
    cache.set(x, result)
    return result
  }
}

worker.slow = cachingDecorator(worker.slow) // キャッシングします

alert(worker.slow(2)) // 動作します
alert(worker.slow(2)) // 動作します（キャッシュが使われます）
```

### bind()によるコンテキストの固定

```js
function hello() {
  console.log('こんにちは、' + this.name)
}
const yamada = hello.bind({ name: 'yamada' })

yamada('sasaki') //こんにちは、yamada
JavaScript
```

また`bind()`と`call()`, `apply()`の違いは関数実行のタイミング。

```js
function hello() {
  console.log('こんにちは、' + this.name)
}
const yamada = { name: 'yamada' }

//bindの場合
const bindYamada = hello.bind(yamada)
bindYamada() //こんにちは、yamada

//call()の場合
hello.call(yamada) //こんにちは、yamada

//apply()の場合
hello.apply(yamada) //こんにちは、yamada
```

### オブジェクトのプロパティフラグ

- writable：false の場合は読み取り専用になる
- enumerable：true の場合、ループで列挙が可能
- configurable：true の場合、プロパティを削除したり属性の変更ができる

### プロトタイプ継承

下記のように、`rabbit`は自動的にプロトタイプから`animal`を継承することができる。

```js
let animal = {
  eats: true,
  walk() {
    alert('Animal walk')
  },
}

let rabbit = {
  jumps: true,
  __proto__: animal,
}

// walk は prototype から得られました
rabbit.walk() // Animal walk
```

また`this`には常にドットの前のオブジェクトが入る。

```js
let animal = {
  eat() {
    this.full = true
  },
}

let rabbit = {
  __proto__: animal,
}

rabbit.eat() // thisは rabbit
```

### `for ... in` ループは継承したプロパティも含めて処理する

例：

```js
let animal = {
  eats: true,
}

let rabbit = {
  jumps: true,
  __proto__: animal,
}

// Object.keys は実親のキーだけを返します
alert(Object.keys(rabbit)) // jumps

// for..in は実親と継承したキー両方をループします
for (let prop in rabbit) alert(prop) // jumps, eats
```

継承プロパティを除外したい場合は組み込みメソッドの`obj.hasOwnProperty(key)`を使用する。

### 組み込みのプロトタイプの継承の関係

オブジェクト ⇨ 組み込みのプロトタイプ ⇨Object プロトタイプ →`null`の関係で継承している。

```js
let arr = [1, 2, 3]

// Array.prototype から継承している?
alert(arr.__proto__ === Array.prototype) // true

// 次に Object.prototype からは継承している?
alert(arr.__proto__.__proto__ === Object.prototype) // true

// そしてトップの null
alert(arr.__proto__.__proto__.__proto__) // null
```

また下記の例のようにネイティブプロトタイプを変更することができる。

```js
// Stringプロトタイプに show()　メソッドを生やす
String.prototype.show = function () {
  alert(this)
}

'BOOM!'.show() // BOOM!
```

しかしプロトタイプはグローバルのため変更するとコンフリクトが起きやすいため、ポリフィルの考慮（特定の JavaScript エンジンではまだサポートされていないメソッド）等の特定のケースにのみ使用する。

### 純粋な辞書オブジェクト

`Object.create(null)`でプロトタイプを持たない純粋なオブジェクトを生成することができる。

```js
let obj = Object.create(null)

alert(obj) // Error (no toString)
```

ちなみに`Object.create()`の引数は空の場合はエラーとなる。

### JavaScript におけるクラスについて

JavaScript ではクラスは関数の一種である。

```js
class User {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    alert(this.name)
  }
}

// class は function
alert(typeof User) // function

// ...あるいは, より正確には User は constructor メソッド
alert(User === User.prototype.constructor) // true

// メソッドは User.prototype にあります e.g:
alert(User.prototype.sayHi) // sayHi メソッドのコード

// prototype には正確には2つのメソッドがあります
alert(Object.getOwnPropertyNames(User.prototype)) // constructor, sayHi
```

- クラス宣言の結果となる`User`と言う名前の関数を作成
- 関数コードは`constructor`メソッド
- `User.prototype`に`sayHi`などのクラスメソッドを格納

### クラスの utils

JavaScript では多重継承が許可されていないため、部分的にクラスに機能を追加した新しいクラスを返すことで近いことが実現できる。

下記は TypeScript での実装例

```ts
// Needed for all utilss
type Constructor<T = {}> = new (...args: any[]) => T

////////////////////
// Example utilss
////////////////////

// A utils that adds a property
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now()
  }
}

// a utils that adds a property and methods
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false

    activate() {
      this.isActivated = true
    }

    deactivate() {
      this.isActivated = false
    }
  }
}

////////////////////
// Usage to compose classes
////////////////////

// Simple class
class User {
  name = ''
}

// User that is Timestamped
const TimestampedUser = Timestamped(User)

// User that is Timestamped and Activatable
const TimestampedActivatableUser = Timestamped(Activatable(User))

////////////////////
// Using the composed classes
////////////////////

const timestampedUserExample = new TimestampedUser()
console.log(timestampedUserExample.timestamp)

const timestampedActivatableUserExample = new TimestampedActivatableUser()
console.log(timestampedActivatableUserExample.timestamp)
console.log(timestampedActivatableUserExample.isActivated)
```

### Error の再スロー

`try...catch`内では既知のエラーだけを捉えて処理し、未知のエラーについてはスキップ（再スロー）することで、より上位の`try...catch`で捉えることができる。

```ts
let json = '{ "age": 30 }' // 不完全なデータ
try {
  let user = JSON.parse(json)

  if (!user.name) {
    throw new SyntaxError('Incomplete data: no name')
  }

  blabla() // 予期しないエラー

  alert(user.name)
} catch (e) {
  if (e.name == 'SyntaxError') {
    alert('JSON Error: ' + e.message)
  } else {
    throw e // 再スロー (*)
  }
}
```

### Promise

`.catch(f)` の呼び出しは、`.then(null, f)`と同義となる。

### 未処理の reject の扱い

Promise が reject を投げた際に`.catch`の記述が無い場合、JavaScript エンジンは reject を追跡しグローバルエラーを生成する。
またブラウザでは、イベント `unhandledrejection`を使ってキャッチができる。

```ts
window.addEventListener('unhandledrejection', function (event) {
  // イベントオブジェクトは2つの特別なプロパティを持っています:
  alert(event.promise) // [object Promise] - エラーを生成した promise
  alert(event.reason) // Error: Whoops! - 未処理のエラーオブジェクト
})

new Promise(function () {
  throw new Error('Whoops!')
}) // エラーを処理する catch がない
```

### Promise の API

- `.all`：全ての Promise の解決を待って、結果を配列で返す。一つでも reject になるとその時点でエラーとなり他の結果を無視する
- `.allSettled`：`.all`同様、全ての Promise の解決を待つ。一つ以上が reject になっても全ての結果を返す
- `.race`：最新の Promise の解決を待ち、結果を返す
- `.any`：`.race`同様、最新の Promise の結果を待つ。それが reject になると他の Promise の解決を待つ。

### Promisification

Promisification はコールバックを受け付ける関数から Promise を返す関数への変換を行うことを指す。
Node.js であれば組み込みの`util.promisify`を使うことで比較的容易に`Promisification`することができる。

### `generator.next()`の引数

`.next(3)`のように、引数を指定すると generator の`yield`式への結果として代入できる。

```ts
function* gen() {
  // 質問を外側のコードに渡して答えを待ちます
  let result = yield '2 + 2?' // (*)

  alert(result)
}

let generator = gen()

let question = generator.next().value // <-- yield は値を返します

generator.next(4) // --> 結果をジェネレータに渡します
```

### デフォルトエクスポートの再エクスポート

デフォルトエクスポートを再エクスポートする場合、`{defult}`で明示しなければならない。

```ts
export * from './module.js' // to re-export named exports
export { default } from './module.js' // to re-export default
```

### `parentElement`と`parentNode`の挙動の違い

`document.documentElement`の場合、`<html>`の親は`document`であり、要素ノードではないため`.parentNode`では`null`になる。

```ts
alert(document.documentElement.parentNode) // document
alert(document.documentElement.parentElement) // null
```

### `document`の階層位置

下記で確認ができる。

```js
alert(HTMLDocument.prototype.constructor.name) // HTMLDocument
alert(HTMLDocument.prototype.__proto__.constructor.name) // Document
alert(HTMLDocument.prototype.__proto__.__proto__.constructor.name) // Node
alert(HTMLDocument.prototype.__proto__.__proto__.__proto__.constructor.name) // EventTarget
alert(
  HTMLDocument.prototype.__proto__.__proto__.__proto__.__proto__.constructor
    .name
) // Object

// TypeError: Cannot read properties of null (reading 'constructor')
alert(
  HTMLDocument.prototype.__proto__.__proto__.__proto__.__proto__.__proto__
    .constructor.name
)
```

### `data-*`属性について

カスタム属性が標準の属性と命名が重複しないよう、`data-*`属性が利用できる。
これは`dataset`プロパティからアクセスする。

例：
`elem` が `data-about` という名前の属性を持つ場合、`elem.dataset.about` でアクセスができる。

### スクリプトの非同期読み込みのオプション

非同期読み込みのためのオプション`async`と`defer`は、スクリプトの実行の順番とタイミングがそれぞれ異なる。

`defer`：

DOM の準備ができたタイミングでスクリプトを実行させる。

- script は非同期でダウンロードされる。HTML パースは継続。
- script のダウンロードが完了。HTML パースは継続。
- HTML パースが完了。
- script を実行する。
  - `DOMContentLoaded`イベントの直前

`async`：

DOM の準備を待たずに、スクリプトの準備ができたタイミングで実行させる。
（`DOMContentLoaded`イベントと`async`スクリプトは互いを待たない）

- script は非同期でダウンロードされる。HTML パースは継続。
- script のダウンロードが完了。
- HTML パースを中断する。
- script を実行する。
- HTML パースを再開する。

### ドキュメントの現在の読み込みの状態の確認

`document.readyState`で確認することができる。

- `loading`：ドキュメントが読み込み中
- `interactive`：ドキュメントのパースが完了。`DOMContentLoaded`イベントの直前に発生
- `complete`：ドキュメントとリソースの読み込みが完了。`window.onload`イベントの直前に発生

### fetch の中断

進行中の fetch の処理を中断する場合は`AbortController`を利用する。

```js
// 1秒で中止
let controller = new AbortController()
setTimeout(() => controller.abort(), 1000)

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal,
  })
} catch (err) {
  if (err.name == 'AbortError') {
    // abort() を処理
    alert('Aborted!')
  } else {
    throw err
  }
}
```
