#!/usr/bin/env bun
import { readFileSync } from 'node:fs';
import type { ThemeCandidate } from './types';

const themes: ThemeCandidate[] = JSON.parse(readFileSync('themes.json', 'utf-8'));

themes.forEach((t, i) => {
  console.log(`## ${i + 1} ${t.theme}`);
  console.log('要約');
  for (const s of t.summary) {
    console.log(`・${s}`);
  }
  console.log('\n記事ソース');
  for (const s of t.sources) {
    console.log(`- ${s.title} (${s.url})`);
  }
  console.log('\n');
});
