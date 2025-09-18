import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { FILE_EXTENSIONS } from '@/config/constants';
import type { CategoryKey, PortfolioFrontmatter, PortfolioItem } from '@/portfolio/types';

const PORTFOLIO_CONTENT_DIR = 'app/_contents/portfolio';

export async function getPortfolioDirectory(): Promise<string> {
  return path.join(process.cwd(), PORTFOLIO_CONTENT_DIR);
}

function isPortfolioFile(filename: string): boolean {
  return filename.endsWith(FILE_EXTENSIONS.MARKDOWN) || filename.endsWith(FILE_EXTENSIONS.MDX);
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const portfolioDirectory = await getPortfolioDirectory();
    const filenames = await fs.readdir(portfolioDirectory);

    const portfolioItems: PortfolioItem[] = [];

    for (const filename of filenames) {
      if (!isPortfolioFile(filename)) continue;

      const filePath = path.join(portfolioDirectory, filename);

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent) as {
          data: PortfolioFrontmatter;
          content: string;
        };

        // Use category from frontmatter, fallback to 'solo-development'
        const category: CategoryKey = (data.category as CategoryKey) || 'solo-development';

        // Handle image path - prepend /portfolio/ if it's a relative path
        let imagePath = data.image || 'https://placehold.jp/400x250.png';
        if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
          imagePath = `/portfolio/${imagePath}`;
        }

        const portfolioItem: PortfolioItem = {
          id: portfolioItems.length + 1,
          title: data.title || '',
          category,
          description: data.description || '',
          image: imagePath,
          tech: data.tags || [],
          demo: data.url || '',
          github: data.github || '',
          fullDescription: content.trim() || data.description || '',
          startedAt: data.startedAt || undefined,
          isActive: data.isActive ?? true,
        };

        portfolioItems.push(portfolioItem);
      } catch (error) {
        console.error(`Error processing portfolio file ${filename}:`, error);
      }
    }

    // Sort by startedAt in descending order (newest first)
    return portfolioItems.sort((a, b) => {
      if (!a.startedAt && !b.startedAt) return 0;
      if (!a.startedAt) return 1;
      if (!b.startedAt) return -1;

      // Parse startedAt format (YYYY.MM)
      const parseDate = (dateStr: string) => {
        const [year, month] = dateStr.split('.');
        return new Date(parseInt(year, 10), parseInt(month, 10) - 1);
      };

      const dateA = parseDate(a.startedAt);
      const dateB = parseDate(b.startedAt);

      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error reading portfolio directory:', error);
    return [];
  }
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  try {
    const portfolioDirectory = await getPortfolioDirectory();

    // Try .md file first
    let filePath = path.join(portfolioDirectory, `${slug}.md`);
    let fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    // If .md doesn't exist, try .mdx
    if (!fileExists) {
      filePath = path.join(portfolioDirectory, `${slug}.mdx`);
      fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false);
    }

    if (!fileExists) {
      return null;
    }

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent) as {
      data: PortfolioFrontmatter;
      content: string;
    };

    // Use category from frontmatter, fallback to 'solo-development'
    const category: CategoryKey = (data.category as CategoryKey) || 'solo-development';

    // Handle image path - prepend /portfolio/ if it's a relative path
    let imagePath = data.image || 'https://placehold.jp/400x250.png';
    if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
      imagePath = `/portfolio/${imagePath}`;
    }

    return {
      id: 1, // This could be generated based on the slug or order
      title: data.title || '',
      category,
      description: data.description || '',
      image: imagePath,
      tech: data.tags || [],
      demo: data.url || '',
      github: data.github || '',
      fullDescription: content.trim() || data.description || '',
      startedAt: data.startedAt || undefined,
      isActive: data.isActive ?? true,
    };
  } catch (error) {
    console.error(`Error loading portfolio item ${slug}:`, error);
    return null;
  }
}
