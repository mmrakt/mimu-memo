import { sortPostsByDate } from '@/memo/lib/date-utils';
import type { PostListItem } from '@/memo/lib/types';
import { getAllExternalPosts } from '@/memo/services/external-posts-service';
import { getAllPosts as getAllInternalPosts } from '@/memo/services/post-service';
import { getSlides } from '@/memo/services/slide-service';

/**
 * Get all posts (internal and external) sorted by date
 */
export async function getAllCombinedPosts(): Promise<PostListItem[]> {
  try {
    // Fetch internal, external posts, and slides in parallel
    const [internalPosts, externalPosts, slides] = await Promise.all([
      getAllInternalPosts(),
      getAllExternalPosts(),
      getSlides(),
    ]);

    // Combine all posts
    const allPosts = [...internalPosts, ...externalPosts, ...slides];

    // Sort by publication date (newest first)
    return sortPostsByDate(allPosts);
  } catch (_error) {
    // If external posts or slides fail, at least return internal posts
    return getAllInternalPosts();
  }
}
