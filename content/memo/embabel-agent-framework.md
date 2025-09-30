---
title: Em­babel Agent：JVM 上で AI エージェントを書くための次世代FW
tag: "java"
pubDate: 2025-09-27
---

[embabel-agent](https://github.com/embabel/embabel-agent)のREADMEを読んだ雑記。

## Agent フレームワークの必要性

* LLM を叩くだけなら HTTP クライアント＋プロンプトで十分
* でも複雑なワークフローになると困ることが多い
  * プロンプトと処理ロジックが混ざってカオス
  * 再利用性も拡張性も低い
  * テストやガードレールを組むのが難しい
  * コスト管理や失敗時のリカバリもやりづらい
* embabel は「Agent」という抽象レイヤーで整理しようとしてる
* JVM と Spring に寄せた設計になってるのが特徴

## Embabel の中核概念

* Agent = ロボット
* Action = ロボットに出す命令
* Goal = 達成したい目標
* Condition = 実行条件やチェック
* Plan = Goal を達成するための Action の並び
* Domain Model = ビジネスロジックを表す型
* 特徴
  * 実行時にプランを組み替え可能（Replanning）
  * FSM や単純な逐次実行と違って柔軟
    * FSM（有限状態機械）はあらかじめ定義した状態遷移しか辿れず動的な探索が苦手
  * LLM 呼び出しと通常コードを混ぜやすい
  * 型安全性がありリファクタもしやすい

## 使い方イメージ（Java / Kotlin コード例）

* サンプルは「星座占い × ニュース記事 × 面白文章生成」
* Java 版例：

```java
@Agent(description = "Find news based on a person's star sign")
public class StarNewsFinder {
    @Action
    public StarPerson extractStarPerson(UserInput userInput, OperationContext ctx) {
        return ctx.ai().withLlm(OpenAiModels.GPT_4).createObject(… , StarPerson.class);
    }
    @Action
    public Horoscope retrieveHoroscope(StarPerson sp) { … }
    @Action(toolGroups = {CoreToolGroups.WEB})
    public RelevantNewsStories findNewsStories(...) { … }
    @AchievesGoal(...)
    @Action
    public Writeup writeup(...) { … }
}
```

* Kotlin DSL でも書ける
* `@AchievesGoal` をつけた Action が最終的に達成する Goal
* テストしやすい設計になってて、モックでプロンプトや出力を確認可能

## 実行モード・アーキテクチャ設計

* 実行モードは 3 種類

  * Focused モード → 特定の Agent を直接呼び出す
  * Closed モード → ユーザー意図を解析して定義済み Agent 群から選択
  * Open モード → Goal 群から選んでエージェントを動的に構成
* Open モードが一番自由だけど予測不能な動きも出やすい
* 実行の中核は `AgentPlatform`
* デフォルトのプランナーは GOAP（Goal Oriented Action Planning）
  * GOAP は現在の状態と目標との差分を評価して必要なアクション列をリアルタイムに組み立てる
* Spring と統合しやすく、DI・トランザクション・AOP とも相性よし

## 特徴・差別化ポイント

* 動的プランニングで状況に応じてベストな手順を再構築
* 型安全性があり LLM 出力を型にマッピングできる
* Spring/JVM 環境と統合しやすい
* Action/Goal 単位でテストしやすい
* 新しい Action/Goal を追加しやすい拡張性
* LLM 呼び出しと通常コードを混ぜて設計できる

## セットアップ & スタート方法

* Quick Start 手順

  1. テンプレートからプロジェクト作成
  2. `OPENAI_API_KEY` を設定（必須）
  3. `ANTHROPIC_API_KEY` を設定（オプション）
  4. Docker Desktop で MCP（Web ツール用）を有効化
  5. Spring Boot で起動
  6. Spring Shell からエージェントを呼び出し可能
* Maven/Gradle の依存も README に書いてある

## 現状・ロードマップ・注意点

* まだ初期段階のプロジェクト
* 将来的には JVM 以外（TypeScript / Python）も対応予定
* 予算制約付きエージェントも構想中（例：「20 セント以内でリサーチ」）
* フェデレーション（エージェント間の協調）も予定あり
* Open モードは非決定性が高く予測不能 → 設計側の責任が大きい
* LLM が暴走しないように条件や制約を工夫してガードレールを置く必要あり

## まとめ

* Embabel は JVM アプリに AI エージェント的な振る舞いを組み込むためのフレームワーク
* LLM を「道具の一つ」として扱い、ドメインロジックと分離して設計できるのが魅力
* Java/Kotlin/Spring 環境で AI × ワークフローをやるなら有力な選択肢

## ref

* https://github.com/embabel/embabel-agent
