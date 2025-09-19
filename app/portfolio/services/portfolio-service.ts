import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { FILE_EXTENSIONS } from '@/config/constants';
import type { CategoryKey, PortfolioFrontmatter, PortfolioItem } from '@/portfolio/types';

const PORTFOLIO_CONTENT_DIR = 'app/_contents/portfolio';
const DEFAULT_CATEGORY: CategoryKey = 'solo-development';
const FALLBACK_IMAGE_URL = 'https://placehold.jp/400x250.png';

export function getPortfolioDirectory(): string {
  return path.join(process.cwd(), PORTFOLIO_CONTENT_DIR);
}

function isPortfolioFile(filename: string): boolean {
  return filename.endsWith(FILE_EXTENSIONS.MARKDOWN) || filename.endsWith(FILE_EXTENSIONS.MDX);
}

function resolveImagePath(imagePath?: string): string {
  if (!imagePath) {
    return FALLBACK_IMAGE_URL;
  }

  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }

  return `/portfolio/${imagePath}`;
}

function createPortfolioItem(
  data: PortfolioFrontmatter,
  content: string,
  id: number
): PortfolioItem {
  const category: CategoryKey = (data.category as CategoryKey) || DEFAULT_CATEGORY;

  return {
    id,
    title: data.title || '',
    category,
    description: data.description || '',
    image: resolveImagePath(data.image),
    tech: data.tags || [],
    demo: data.url || '',
    github: data.github || '',
    fullDescription: content.trim() || data.description || '',
    startedAt: data.startedAt || undefined,
    isActive: data.isActive ?? true,
  };
}

async function parsePortfolioFile(filePath: string, id: number): Promise<PortfolioItem | null> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent) as {
      data: PortfolioFrontmatter;
      content: string;
    };

    return createPortfolioItem(data, content, id);
  } catch (_error) {
    return null;
  }
}

function sortByStartedAtDesc(a: PortfolioItem, b: PortfolioItem): number {
  if (!(a.startedAt || b.startedAt)) {
    return 0;
  }
  if (!a.startedAt) {
    return 1;
  }
  if (!b.startedAt) {
    return -1;
  }

  const parseDate = (value: string) => {
    const [year, month] = value.split('.');
    return new Date(Number.parseInt(year, 10), Number.parseInt(month, 10) - 1);
  };

  return parseDate(b.startedAt).getTime() - parseDate(a.startedAt).getTime();
}

async function resolvePortfolioFilePath(
  portfolioDirectory: string,
  slug: string
): Promise<string | null> {
  const candidates = [
    path.join(portfolioDirectory, `${slug}.md`),
    path.join(portfolioDirectory, `${slug}.mdx`),
  ];

  for (const candidate of candidates) {
    const exists = await fs
      .access(candidate)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      return candidate;
    }
  }

  return null;
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const portfolioDirectory = getPortfolioDirectory();
    const filenames = await fs.readdir(portfolioDirectory);
    const portfolioItems: PortfolioItem[] = [];

    for (const filename of filenames) {
      if (!isPortfolioFile(filename)) {
        continue;
      }

      const filePath = path.join(portfolioDirectory, filename);
      const portfolioItem = await parsePortfolioFile(filePath, portfolioItems.length + 1);

      if (portfolioItem) {
        portfolioItems.push(portfolioItem);
      }
    }

    return portfolioItems.sort(sortByStartedAtDesc);
  } catch (_error) {
    return [];
  }
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  try {
    const portfolioDirectory = getPortfolioDirectory();
    const filePath = await resolvePortfolioFilePath(portfolioDirectory, slug);

    if (!filePath) {
      return null;
    }

    return parsePortfolioFile(filePath, 1);
  } catch (_error) {
    return null;
  }
}
