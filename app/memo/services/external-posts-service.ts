import { safeAsync } from '@/memo/lib/error-handler';
import type { PostListItem } from '@/memo/lib/types';
import type { Frontmatter, MediaType } from '@/memo/services/external-content/types';
import {
  makeNotePosts,
  makeQiitaPosts,
  makeZennPosts,
  sortPostsByPubDate,
} from '@/memo/services/external-content/utils';

export interface ExternalPostListItem extends PostListItem {
  media: MediaType;
  link: string;
}

/**
 * Convert Frontmatter to ExternalPostListItem
 */
function convertFrontmatterToPostListItem(frontmatter: Frontmatter): ExternalPostListItem {
  return {
    id: frontmatter.link, // Use link as ID for external posts
    title: frontmatter.title,
    tag: '', // External posts don't have tags in our system
    pubDate:
      typeof frontmatter.pubDate === 'string'
        ? frontmatter.pubDate
        : frontmatter.pubDate.toISOString().split('T')[0],
    excerpt: '', // External posts don't have excerpts in the current implementation
    media: frontmatter.media,
    link: frontmatter.link,
  };
}

/**
 * Fetch all external posts from Qiita, Zenn, and Note
 */
/**
 * Fetch external posts from a specific service with error handling
 */
function fetchExternalPostsFromService(
  serviceName: string,
  fetcher: () => Promise<Frontmatter[]>
): Promise<Frontmatter[]> {
  return safeAsync(fetcher, [], `Fetching ${serviceName} posts`);
}

/**
 * Fetch all external posts from Qiita, Zenn, and Note with optimized error handling
 */
export async function getAllExternalPosts(): Promise<ExternalPostListItem[]> {
  // Fetch posts from all external sources in parallel with individual error handling
  const [qiitaPosts, zennPosts, notePosts] = await Promise.all([
    fetchExternalPostsFromService('Qiita', makeQiitaPosts),
    fetchExternalPostsFromService('Zenn', makeZennPosts),
    fetchExternalPostsFromService('Note', makeNotePosts),
  ]);

  // Combine all posts
  const allExternalPosts = [...qiitaPosts, ...zennPosts, ...notePosts];

  // Early return if no posts found
  if (allExternalPosts.length === 0) {
    return [];
  }

  // Sort by publication date
  const sortedPosts = sortPostsByPubDate(allExternalPosts);

  // Convert to PostListItem format
  return sortedPosts.map(convertFrontmatterToPostListItem);
}

/**
 * Get display name for media type
 * @deprecated Use getMediaDisplayName from ../lib/media-utils instead
 */
export function getMediaDisplayName(media: MediaType): string {
  const mediaMap: Record<MediaType, string> = {
    owned: 'mimu-memo',
    qiita: 'Qiita',
    zenn: 'Zenn',
    note: 'note',
  };
  return mediaMap[media] || media;
}
