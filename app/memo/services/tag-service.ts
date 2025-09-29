import { PAGINATION, TAG_ICONS } from '@/config/constants';
import { MEMO_TAG_LIST } from '@/memo/constants';
import { handleCriticalError, ValidationError } from '@/memo/lib/error-handler';
import type { PostListItem } from '@/memo/lib/types';
import { getAllCombinedPosts } from '@/memo/services/combined-posts-service';

export type TagInfo = {
  name: string;
  count: number;
  icon?: string;
};

export type PaginatedTagPosts = {
  posts: PostListItem[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

export function isValidTag(tag: string): boolean {
  return MEMO_TAG_LIST.includes(tag as (typeof MEMO_TAG_LIST)[number]);
}

/**
 * Validate a tag with improved error handling
 */
export function validateTag(tag: string, filePath?: string): string {
  if (!tag?.trim()) {
    const error = new ValidationError(
      `No tag specified. Valid tags: ${MEMO_TAG_LIST.join(', ')}`,
      filePath
    );
    handleCriticalError(error, 'Tag validation');
  }

  if (!isValidTag(tag)) {
    const error = new ValidationError(
      `Invalid tag '${tag}'. Valid tags: ${MEMO_TAG_LIST.join(', ')}`,
      filePath
    );
    handleCriticalError(error, 'Tag validation');
  }

  return tag;
}

/**
 * Safe tag validation that returns a default instead of throwing
 */
export function validateTagSafe(tag: string, fallback = 'other'): string {
  if (!tag?.trim()) {
    return fallback;
  }

  if (!isValidTag(tag)) {
    return fallback;
  }

  return tag;
}

export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getAllCombinedPosts();

  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    if (post.tag) {
      const count = tagCounts.get(post.tag) || 0;
      tagCounts.set(post.tag, count + 1);
    }
  }

  const tags: TagInfo[] = Array.from(tagCounts.entries()).map(([name, count]) => ({
    name,
    count,
    icon: TAG_ICONS[name.toLowerCase() as keyof typeof TAG_ICONS],
  }));

  return tags.sort((a, b) => b.count - a.count);
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllCombinedPosts();
  return posts.filter((post) => post.tag === tag);
}

export async function getPostsByTagPaginated(tag: string, page = 1): Promise<PaginatedTagPosts> {
  const allPosts = await getPostsByTag(tag);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / PAGINATION.POSTS_PER_PAGE);

  const startIndex = (page - 1) * PAGINATION.POSTS_PER_PAGE;
  const endIndex = startIndex + PAGINATION.POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    currentPage: page,
    totalPages,
    totalPosts,
  };
}
