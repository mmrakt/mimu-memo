#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'node:fs';
import type { ArticleSource, ThemeCandidate } from './types';

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
      max_tokens: 800,
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
  const articles: ArticleSource[] = JSON.parse(readFileSync('sources/today.json', 'utf-8'));

  const prompt = `
以下の記事リストから、注目すべきテーマ候補を5つ挙げてください。
各候補について:
- テーマ名
- 要約を3〜4点の箇条書き
- 関連する記事ソース（最大3件）

必ず次のJSON形式で返してください:
[
  {
    "theme": "テーマ名",
    "summary": ["要約1", "要約2", "要約3"],
    "sources": [{"title": "記事タイトル", "url": "記事URL"}]
  },
  ...
]

記事リスト:
${articles.map((a) => `- ${a.title} (${a.url})`).join('\n')}
`;

  const raw = await callClaude(prompt);

  let parsed: ThemeCandidate[];
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error('❌ ClaudeからのJSONパース失敗:', raw);
    throw e;
  }

  writeFileSync('themes.json', JSON.stringify(parsed, null, 2));
  console.log(`✅ Theme candidates generated: ${parsed.length}件`);
}

await main();
