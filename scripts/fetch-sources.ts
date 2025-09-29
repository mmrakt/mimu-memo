#!/usr/bin/env bun
import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';
import type { ArticleSource } from './types';

const FEEDS = [
  'https://hnrss.org/frontpage',
  'https://dev.to/feed',
  'https://aws.amazon.com/blogs/opensource/feed/',
] as const;

async function fetchFeed(url: string, parser: Parser): Promise<ArticleSource[]> {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.slice(0, 10).map((item) => ({
      title: item.title ?? 'untitled',
      url: item.link ?? '',
      summary: item.contentSnippet ?? '',
    }));
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}:`, err);
    return [];
  }
}

async function main() {
  const parser = new Parser();
  const results = await Promise.all(FEEDS.map((url) => fetchFeed(url, parser)));

  // まとめて1配列に
  const articles = results.flat();

  // URLで重複排除
  const uniqueArticles = Array.from(new Map(articles.map((a) => [a.url, a])).values());

  // 必要ならランダムに上限を絞る（例: 30件）
  const limitedArticles = uniqueArticles.slice(0, 30);

  const outputPath = 'sources/today.json';
  writeFileSync(outputPath, JSON.stringify(limitedArticles, null, 2), 'utf-8');

  console.log(`✅ Collected ${limitedArticles.length} unique articles -> ${outputPath}`);
}

await main();
