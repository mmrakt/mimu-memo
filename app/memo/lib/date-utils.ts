import { DATE_FORMATS } from '@/config/constants';

export function formatPubDate(pubDate: unknown): string {
  if (pubDate instanceof Date) {
    return pubDate.toISOString().split(DATE_FORMATS.ISO_DATE_SEPARATOR)[0];
  }

  return String(pubDate || '').replace(
    new RegExp(DATE_FORMATS.PATH_DATE_SEPARATOR, 'g'),
    DATE_FORMATS.DISPLAY_DATE_SEPARATOR
  );
}

export function sortPostsByDate<T extends { pubDate: string }>(posts: T[]): T[] {
  return posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
