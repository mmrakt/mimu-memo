import { promises as fs } from 'node:fs';
import matter from 'gray-matter';
import { FILE_EXTENSIONS } from '@/config/constants';
import { formatPubDate, sortPostsByDate } from '@/memo/lib/date-utils';
import { safeAsync } from '@/memo/lib/error-handler';
import {
  buildPostFilePath,
  getPostsDirectory,
  getSlugFromFilename,
  isPostFile,
  parseMdFile,
} from '@/memo/lib/file-utils';
import type { MemoBySlugResult, PostListItem } from '@/memo/lib/types';
import { validateTag } from '@/memo/services/tag-service';

export interface AdjacentPostsResult {
  previous: PostListItem | null;
  next: PostListItem | null;
}

export async function getAllPosts(): Promise<PostListItem[]> {
  try {
    const postsDirectory = await getPostsDirectory();
    const filenames = await fs.readdir(postsDirectory);

    const posts: PostListItem[] = [];

    for (const filename of filenames) {
      if (!isPostFile(filename)) continue;

      const slug = getSlugFromFilename(filename);

      if (filename.endsWith(FILE_EXTENSIONS.MARKDOWN) || filename.endsWith(FILE_EXTENSIONS.MDX)) {
        await processPostFile(filename, slug, postsDirectory, posts);
      }
    }

    return sortPostsByDate(posts);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Process a post file (markdown or MDX) and add it to the posts array
 */
async function processPostFile(
  filename: string,
  slug: string,
  postsDirectory: string,
  posts: PostListItem[],
): Promise<void> {
  const filePath = `${postsDirectory}/${filename}`;

  const post = await safeAsync(
    async () => {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        id: slug,
        title: data.title || '',
        tag: validateTag(data.tag || '', filePath),
        pubDate: formatPubDate(data.pubDate),
        excerpt: data.excerpt || data.description || '',
        media: 'owned' as const,
      };
    },
    null,
    `Processing post file: ${filename}`,
  );

  if (post) {
    posts.push(post);
  }
}

export async function getMemoBySlug(slug: string): Promise<MemoBySlugResult | null> {
  try {
    // Try .md file first
    const mdFilePath = buildPostFilePath(slug, FILE_EXTENSIONS.MARKDOWN);
    try {
      await fs.access(mdFilePath);
      const mdContent = await parseMdFile(mdFilePath);
      if (mdContent) {
        return mdContent;
      }
    } catch {
      // MD file doesn't exist, try MDX
    }

    // Try .mdx file
    const mdxFilePath = buildPostFilePath(slug, FILE_EXTENSIONS.MDX);
    await fs.access(mdxFilePath);

    // Read MDX file as text and parse frontmatter, then use ReactMarkdown for rendering
    const fileContent = await fs.readFile(mdxFilePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      metadata: {
        title: data.title || '',
        tag: validateTag(data.tag || '', mdxFilePath),
        pubDate: formatPubDate(data.pubDate),
        id: slug,
      },
      content: content,
      isMarkdown: true,
    };
  } catch (error) {
    console.error(`Error loading memo ${slug}:`, error);
    return null;
  }
}

export async function getAllMemoSlugs(): Promise<string[]> {
  try {
    const postsDirectory = await getPostsDirectory();
    const filenames = await fs.readdir(postsDirectory);

    return filenames.filter(isPostFile).map(getSlugFromFilename);
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getAdjacentPostsFromList(posts: PostListItem[], slug: string): AdjacentPostsResult {
  if (!posts.length) {
    return { previous: null, next: null };
  }

  const currentIndex = posts.findIndex((post) => post.id === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return { previous, next };
}

export async function getAdjacentPosts(
  slug: string,
  fetchPosts: () => Promise<PostListItem[]> = getAllPosts,
): Promise<AdjacentPostsResult> {
  const posts = await fetchPosts();
  return getAdjacentPostsFromList(posts, slug);
}
