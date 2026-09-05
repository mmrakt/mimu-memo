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
  next: PostListItem | null;
  previous: PostListItem | null;
}

export async function getAllPosts(): Promise<PostListItem[]> {
  try {
    const postsDirectory = await getPostsDirectory();
    const filenames = await fs.readdir(postsDirectory);

    const postFilenames = filenames.filter(
      (filename) =>
        isPostFile(filename) &&
        (filename.endsWith(FILE_EXTENSIONS.MARKDOWN) || filename.endsWith(FILE_EXTENSIONS.MDX))
    );

    // 読み込みは並列化しつつ、結果はファイル名順のまま保つ。
    // 同じ日付の記事の並びがビルドごとに変わらないようにするため。
    const results = await Promise.all(
      postFilenames.map((filename) =>
        processPostFile(filename, getSlugFromFilename(filename), postsDirectory)
      )
    );
    const posts = results.filter((post): post is PostListItem => post !== null);

    return sortPostsByDate(posts);
  } catch {
    return [];
  }
}

/**
 * Process a post file (markdown or MDX) and return it, or null when it cannot be read
 */
function processPostFile(
  filename: string,
  slug: string,
  postsDirectory: string
): Promise<PostListItem | null> {
  const filePath = `${postsDirectory}/${filename}`;

  return safeAsync(
    async () => {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        excerpt: data.excerpt || data.description || '',
        id: slug,
        media: 'owned' as const,
        pubDate: formatPubDate(data.pubDate),
        tag: validateTag(data.tag || '', filePath),
        title: data.title || '',
      };
    },
    null,
    `Processing post file: ${filename}`
  );
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
      content,
      isMarkdown: true,
      metadata: {
        id: slug,
        pubDate: formatPubDate(data.pubDate),
        tag: validateTag(data.tag || '', mdxFilePath),
        title: data.title || '',
      },
    };
  } catch {
    return null;
  }
}

export async function getAllMemoSlugs(): Promise<string[]> {
  try {
    const postsDirectory = await getPostsDirectory();
    const filenames = await fs.readdir(postsDirectory);

    return filenames.filter(isPostFile).map(getSlugFromFilename);
  } catch {
    return [];
  }
}

export function getAdjacentPostsFromList(posts: PostListItem[], slug: string): AdjacentPostsResult {
  if (!posts.length) {
    return { next: null, previous: null };
  }

  const currentIndex = posts.findIndex((post) => post.id === slug);

  if (currentIndex === -1) {
    return { next: null, previous: null };
  }

  const previous = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return { next, previous };
}

export async function getAdjacentPosts(
  slug: string,
  fetchPosts: () => Promise<PostListItem[]> = getAllPosts
): Promise<AdjacentPostsResult> {
  const posts = await fetchPosts();
  return getAdjacentPostsFromList(posts, slug);
}
