// Page descriptions
export const PAGE_DESCRIPTIONS = {
  MEMO: '日々の学びや知見のメモ',
  PORTFOLIO: 'ポートフォリオ',
  CAREER: 'キャリア情報',
} as const;

// Pagination settings
export const PAGINATION = {
  POSTS_PER_PAGE: 12,
  ANIMATION_DELAY_MS: 100,
} as const;

// File paths
export const PATHS = {
  POSTS_DIRECTORY: 'app/_contents/memo',
  IMAGES_DIRECTORY: '/images',
  TAG_ICONS_DIRECTORY: '/tagIcon',
  FAVICON: '/images/favicon.png',
} as const;

// Tag icon mapping
export const TAG_ICONS = {
  vite: 'vite.svg',
  react: 'react.svg',
  nextjs: 'nextjs.svg',
  javascript: 'javascript.svg',
  typescript: 'typescript.svg',
  css: 'css.svg',
  html: 'html.svg',
  sass: 'sass.svg',
  tailwindcss: 'tailwindcss.svg',
  astro: 'astro.svg',
  gatsby: 'gatsby.svg',
  java: 'java.svg',
  npm: 'npm.svg',
  other: 'other.svg',
} as const;

// File extensions
export const FILE_EXTENSIONS = {
  MARKDOWN: '.md',
  MDX: '.mdx',
  SUPPORTED_POSTS: ['.md', '.mdx'],
} as const;

// Date formats
export const DATE_FORMATS = {
  ISO_DATE_SEPARATOR: 'T',
  PATH_DATE_SEPARATOR: '/',
  DISPLAY_DATE_SEPARATOR: '-',
} as const;
