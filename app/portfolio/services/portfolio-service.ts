import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { FILE_EXTENSIONS, PATHS } from '@/config/constants';
import type { CategoryKey, PortfolioFrontmatter, PortfolioItem } from '@/portfolio/types';

const DEFAULT_CATEGORY: CategoryKey = 'solo-development';
const FALLBACK_IMAGE_URL = 'https://placehold.jp/400x250.png';

export function getPortfolioDirectory(): string {
  return path.join(process.cwd(), PATHS.PORTFOLIO_DIRECTORY);
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
  content: string
): Omit<PortfolioItem, 'id'> {
  const category: CategoryKey = (data.category as CategoryKey) || DEFAULT_CATEGORY;

  return {
    category,
    demo: data.url || '',
    description: data.description || '',
    fullDescription: content.trim() || data.description || '',
    github: data.github || '',
    image: resolveImagePath(data.image),
    isActive: data.isActive ?? true,
    startedAt: data.startedAt || undefined,
    tech: data.tags || [],
    title: data.title || '',
  };
}

async function parsePortfolioFile(filePath: string): Promise<Omit<PortfolioItem, 'id'> | null> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent) as {
      data: PortfolioFrontmatter;
      content: string;
    };

    if (!(data.title && data.description)) {
      return null;
    }

    return createPortfolioItem(data, content);
  } catch {
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

  const existences = await Promise.all(
    candidates.map((candidate) =>
      fs
        .access(candidate)
        .then(() => true)
        .catch(() => false)
    )
  );

  // candidatesの順序が優先順位なので、先に見つかったものを返す。
  const foundIndex = existences.indexOf(true);

  return foundIndex === -1 ? null : candidates[foundIndex];
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const portfolioDirectory = getPortfolioDirectory();
    const filenames = await fs.readdir(portfolioDirectory);
    const parsed = await Promise.all(
      filenames
        .filter(isPortfolioFile)
        .map((filename) => parsePortfolioFile(path.join(portfolioDirectory, filename)))
    );

    // idはファイル名順の連番。URLの?item=Nが並列化で変わらないよう、解析後に採番する。
    const portfolioItems = parsed
      .filter((item): item is Omit<PortfolioItem, 'id'> => item !== null)
      .map((item, index) => ({ ...item, id: index + 1 }));

    return portfolioItems.sort(sortByStartedAtDesc);
  } catch {
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

    const item = await parsePortfolioFile(filePath);

    return item ? { ...item, id: 1 } : null;
  } catch {
    return null;
  }
}
