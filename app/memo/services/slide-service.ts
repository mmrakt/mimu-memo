import slidesData from '@content/slides.json' with { type: 'json' };
import type { PostListItem } from '@/memo/lib/types';

type SlideEntry = {
  title: string;
  pubDate: string;
  tag: string;
  link: string;
};

export function getSlides(): PostListItem[] {
  const slides = slidesData as SlideEntry[];

  return slides.map((slide, index) => ({
    id: `slide-${index}`,
    title: slide.title,
    tag: slide.tag,
    pubDate: slide.pubDate,
    link: slide.link,
    media: 'owned' as const,
  }));
}
