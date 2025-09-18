import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PostListItem } from '@/memo/lib/types';
import * as postService from '@/memo/services/post-service';

const buildPosts = (): PostListItem[] => [
  { id: 'newest', title: 'Newest Post', tag: 'test', pubDate: '2024-03-01' },
  { id: 'current', title: 'Current Post', tag: 'test', pubDate: '2024-02-01' },
  { id: 'oldest', title: 'Oldest Post', tag: 'test', pubDate: '2024-01-01' },
];

describe('post-service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAdjacentPostsFromList', () => {
    it('returns previous and next articles for a middle post', () => {
      const result = postService.getAdjacentPostsFromList(buildPosts(), 'current');

      expect(result.previous?.id).toBe('oldest');
      expect(result.next?.id).toBe('newest');
    });

    it('omits previous when current post is the oldest entry', () => {
      const result = postService.getAdjacentPostsFromList(buildPosts(), 'oldest');

      expect(result.previous).toBeNull();
      expect(result.next?.id).toBe('current');
    });

    it('omits next when current post is the newest entry', () => {
      const result = postService.getAdjacentPostsFromList(buildPosts(), 'newest');

      expect(result.previous?.id).toBe('current');
      expect(result.next).toBeNull();
    });

    it('returns nulls when the post cannot be found', () => {
      const result = postService.getAdjacentPostsFromList(buildPosts(), 'missing');

      expect(result.previous).toBeNull();
      expect(result.next).toBeNull();
    });

    it('handles empty post lists gracefully', () => {
      const result = postService.getAdjacentPostsFromList([], 'any');

      expect(result.previous).toBeNull();
      expect(result.next).toBeNull();
    });
  });

  describe('getAdjacentPosts', () => {
    it('uses the provided fetcher and returns adjacent posts', async () => {
      const fetchPosts = vi.fn().mockResolvedValue(buildPosts());

      const result = await postService.getAdjacentPosts('current', fetchPosts);

      expect(fetchPosts).toHaveBeenCalledTimes(1);
      expect(result.previous?.id).toBe('oldest');
      expect(result.next?.id).toBe('newest');
    });
  });
});
