// Page descriptions
export const PAGE_DESCRIPTIONS = {
  CAREER: 'キャリア情報',
  MEMO: '日々の学びや知見のメモ',
  PORTFOLIO: 'ポートフォリオ',
} as const;

// Pagination settings
export const PAGINATION = {
  ANIMATION_DELAY_MS: 100,
  POSTS_PER_PAGE: 12,
} as const;

// File paths
export const PATHS = {
  CAREER_DATA_PATH: 'content/career/data.jsonc',
  FAVICON: '/images/favicon.png',
  IMAGES_DIRECTORY: '/images',
  PORTFOLIO_DIRECTORY: 'content/portfolio',
  POSTS_DIRECTORY: 'content/memo',
  TAG_ICONS_DIRECTORY: '/tagIcon',
} as const;

// Tag icon mapping
export const TAG_ICONS = {
  astro: 'astro.svg',
  css: 'css.svg',
  gatsby: 'gatsby.svg',
  html: 'html.svg',
  java: 'java.svg',
  javascript: 'javascript.svg',
  nextjs: 'nextjs.svg',
  npm: 'npm.svg',
  other: 'other.svg',
  react: 'react.svg',
  sass: 'sass.svg',
  tailwindcss: 'tailwindcss.svg',
  typescript: 'typescript.svg',
  vite: 'vite.svg',
} as const;

// File extensions
export const FILE_EXTENSIONS = {
  MARKDOWN: '.md',
  MDX: '.mdx',
  SUPPORTED_POSTS: ['.md', '.mdx'],
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY_DATE_SEPARATOR: '-',
  ISO_DATE_SEPARATOR: 'T',
  PATH_DATE_SEPARATOR: '/',
} as const;
