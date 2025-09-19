export const MY_NAME = 'mimu';

export const SITE_NAME = `${MY_NAME}-memo`;

export const ABOUT_ME = [
  '日々成長するフルスタック志望エンジニア。',
  '技術と共に進化し続けます。',
] as const;

export const ABOUT_SITE = [
  `エンジニア${MY_NAME}のパーソナルサイト。`,
  '日々の開発の知見のメモやキャリア遍歴を記録しています。',
] as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mimu-memo.com';

const X_URL_PREFIX = 'https://x.com';
export const QIITA_URL_PREFIX = 'https://qiita.com';
export const NOTE_URL_PREFIX = 'https://note.com';
export const ZENN_URL_PREFIX = 'https://zenn.dev';
export const GITHUB_URL_PREFIX = 'https://github.com';
export const SCRAPBOX_URL_PREFIX = 'https://scrapbox.io';
export const WANTEDLY_URL_PREFIX = 'https://wantedly.com';
export const MEDIA_TYPE_LIST = ['owned', 'qiita', 'zenn', 'note'] as const;
export const MEDIA_TYPE_LIST_FOR_DISPLAY = ['mimu-memo', 'Qiita', 'Zenn', 'note'] as const;

export const SNS_ID = 'mmrakt';
export const X_ID = 'mimu_alc';
export const ZENN_FEED_URL = `${ZENN_URL_PREFIX}/${SNS_ID}/feed?all=1`;
export const NOTE_FEED_URL = `${NOTE_URL_PREFIX}/${SNS_ID}/rss`;
export const QIITA_API_ENDPOINT = `${QIITA_URL_PREFIX}/api/v2/authenticated_user/items`;

export const X_PROFILE_URL = `${X_URL_PREFIX}/${X_ID}`;
export const GITHUB_PROFILE_URL = `${GITHUB_URL_PREFIX}/mmrakt`;
export const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/mmrakt';
// Test change
