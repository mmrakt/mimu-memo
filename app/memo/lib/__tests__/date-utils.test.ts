import { describe, expect, it } from 'vitest';
import { formatPubDate, sortPostsByDate } from '@/memo/lib/date-utils';

describe('Date Utils', () => {
  describe('formatPubDate', () => {
    it('should format Date objects to ISO date string', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatPubDate(date);
      expect(result).toBe('2024-01-15');
    });

    it('should convert slash-separated dates to dash-separated', () => {
      const result = formatPubDate('2024/01/15');
      expect(result).toBe('2024-01-15');
    });

    it('should handle already formatted dates', () => {
      const result = formatPubDate('2024-01-15');
      expect(result).toBe('2024-01-15');
    });

    it('should handle empty or null values', () => {
      expect(formatPubDate('')).toBe('');
      expect(formatPubDate(null)).toBe('');
      expect(formatPubDate(undefined)).toBe('');
    });

    it('should handle mixed date formats', () => {
      expect(formatPubDate('2024/12/31')).toBe('2024-12-31');
      expect(formatPubDate('2024/1/1')).toBe('2024-1-1');
    });
  });

  describe('sortPostsByDate', () => {
    it('should sort posts by date in descending order (newest first)', () => {
      const posts = [
        { id: '1', pubDate: '2024-01-15', tag: 'test', title: 'Post 1' },
        { id: '2', pubDate: '2024-03-15', tag: 'test', title: 'Post 2' },
        { id: '3', pubDate: '2024-02-15', tag: 'test', title: 'Post 3' },
      ];

      const sorted = sortPostsByDate(posts);

      expect(sorted[0].pubDate).toBe('2024-03-15');
      expect(sorted[1].pubDate).toBe('2024-02-15');
      expect(sorted[2].pubDate).toBe('2024-01-15');
    });

    it('should handle empty array', () => {
      const result = sortPostsByDate([]);
      expect(result).toEqual([]);
    });

    it('should handle single item', () => {
      const posts = [{ id: '1', pubDate: '2024-01-15', tag: 'test', title: 'Post 1' }];
      const result = sortPostsByDate(posts);
      expect(result).toEqual(posts);
    });

    it('should handle same dates', () => {
      const posts = [
        { id: '1', pubDate: '2024-01-15', tag: 'test', title: 'Post 1' },
        { id: '2', pubDate: '2024-01-15', tag: 'test', title: 'Post 2' },
      ];

      const sorted = sortPostsByDate(posts);
      expect(sorted).toHaveLength(2);
      expect(sorted[0].pubDate).toBe('2024-01-15');
      expect(sorted[1].pubDate).toBe('2024-01-15');
    });
  });
});
