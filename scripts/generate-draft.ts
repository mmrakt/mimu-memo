#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'node:fs';
import type { ThemeCandidate } from './types';

const CLAUDE_API = 'https://api.anthropic.com/v1/messages';

async function callClaude(prompt: string): Promise<string> {
  if (!process.env.CLAUDE_CODE_OAUTH_TOKEN) {
    throw new Error('CLAUDE_CODE_OAUTH_TOKEN is not set');
  }

  const res = await fetch(CLAUDE_API, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.CLAUDE_CODE_OAUTH_TOKEN,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const data = await res.json();
  return data.content[0].text as string;
}

async function main() {
  const selected: ThemeCandidate = JSON.parse(readFileSync('selected-theme.json', 'utf-8'));

  const prompt = `
あなたは日本語の技術ブログ記事を書く専門ライターです。  
対象読者はソフトウェアエンジニアで、OSS プロジェクトや新しい技術に関心があります。  

タスク: 以下のソースで示されたURLのドキュメント群をベースに、わかりやすく噛み砕いた紹介記事を書いてください。

## テーマ
${selected.theme}

## ソース
${selected.sources.map((s) => `- ${s.title} (${s.url})`).join('\n')}

## 記事執筆ルール

### フォーマット
- markdownファイルを作成し、frontmatterに以下を設定する
  - title: 記事のタイトル
  - tag: 記事の内容に沿ったタグ
  - pubDate: 記事作成日（yyy/mm/dd）
- tagは\`app/memo/constants.ts\`の\`MEMO_TAG_LIST\`の値の中から最も相応しいものを１つ指定する、またはいずれにも該当しない場合は\`other\`を指定する

### 記事構成
- 本文は見出しレベル2（##）から始め、記事タイトルは本文とは別とする
- 各セクションは公式情報をベースにしつつ、7割は要約・整理、3割は解説や肉付けで構成する
- セクション間で区切り線（---）は使わない
- 文章は全て箇条書きリストで記述すること
  - ただしより情報を効率的に伝える方法があればそちらを活用する（テーブル表記、折りたたみ表記など）
  - 箇条書きリストは'*'ではなく'-'を用いる
  - 箇条書きリストの末尾には'。'はつけない  
- コード例（存在すれば）を含める
- 特徴や差別化ポイントを箇条書きでまとめる
- 「まとめ」で記事を締める
  
## 記事内容
- 敬語口調は使わない
- 技術メモとして読みやすくまとめる
- 過剰な比喩や、憶測による内容は含めない
`;

  const draft = await callClaude(prompt);
  const fileName = `drafts/${new Date().toISOString().slice(0, 10)}.md`;

  writeFileSync(fileName, draft, 'utf-8');
  console.log(`✅ Draft generated -> ${fileName}`);
}

await main();
