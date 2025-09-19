import { slides } from '@/_contents/slides';
import type { PostListItem } from '@/memo/lib/types';

export function getSlides(): PostListItem[] {
  return slides.map((slide, index) => ({
    id: `slide-${index}`,
    title: slide.title,
    tag: slide.tag,
    pubDate: slide.pubDate,
    link: slide.link,
    media: 'owned' as const,
  }));
}
