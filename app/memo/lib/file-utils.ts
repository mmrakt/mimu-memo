import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { FILE_EXTENSIONS, PATHS } from '@/config/constants';
import { formatPubDate } from '@/memo/lib/date-utils';
import type { MemoContent } from '@/memo/lib/types';
import { validateTag } from '@/memo/services/tag-service';

export async function parseMdFile(filePath: string): Promise<MemoContent | null> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      metadata: {
        title: data.title || '',
        tag: validateTag(data.tag || '', filePath),
        pubDate: formatPubDate(data.pubDate),
        id: path.basename(filePath, FILE_EXTENSIONS.MARKDOWN),
      },
      content: content,
      isMarkdown: true,
    };
  } catch (error) {
    console.error(`Error parsing MD file ${filePath}:`, error);
    return null;
  }
}

export async function getPostsDirectory(): Promise<string> {
  return path.join(process.cwd(), PATHS.POSTS_DIRECTORY);
}

export function isPostFile(filename: string): boolean {
  return FILE_EXTENSIONS.SUPPORTED_POSTS.some((ext) => filename.endsWith(ext));
}

export function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.(md|mdx)$/, '');
}

export function buildPostFilePath(slug: string, extension: string): string {
  return path.join(process.cwd(), PATHS.POSTS_DIRECTORY, `${slug}${extension}`);
}
