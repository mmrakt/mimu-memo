import { describe, expect, it } from 'vitest';
import {
  DATE_FORMATS,
  FILE_EXTENSIONS,
  PAGE_DESCRIPTIONS,
  PAGINATION,
  PATHS,
  TAG_ICONS,
} from '@/config/constants';

const IMAGES_DIRECTORY_REGEX = /^\/\w+/;
const FAVICON_REGEX = /^\/.*\.(png|ico|svg)$/;
const SVG_EXTENSION_REGEX = /\.svg$/;

describe('Constants', () => {
  describe('PAGE_DESCRIPTIONS', () => {
    it('should have all required page descriptions', () => {
      expect(PAGE_DESCRIPTIONS.MEMO).toBeDefined();
      expect(PAGE_DESCRIPTIONS.PORTFOLIO).toBeDefined();
      expect(PAGE_DESCRIPTIONS.CAREER).toBeDefined();

      expect(typeof PAGE_DESCRIPTIONS.MEMO).toBe('string');
      expect(PAGE_DESCRIPTIONS.MEMO.length).toBeGreaterThan(0);
    });
  });

  describe('PAGINATION', () => {
    it('should have valid pagination settings', () => {
      expect(PAGINATION.POSTS_PER_PAGE).toBeGreaterThan(0);
      expect(PAGINATION.ANIMATION_DELAY_MS).toBeGreaterThan(0);

      expect(typeof PAGINATION.POSTS_PER_PAGE).toBe('number');
      expect(typeof PAGINATION.ANIMATION_DELAY_MS).toBe('number');
    });
  });

  describe('PATHS', () => {
    it('should have all required paths', () => {
      expect(PATHS.POSTS_DIRECTORY).toBeDefined();
      expect(PATHS.IMAGES_DIRECTORY).toBeDefined();
      expect(PATHS.FAVICON).toBeDefined();

      expect(typeof PATHS.POSTS_DIRECTORY).toBe('string');
      expect(PATHS.POSTS_DIRECTORY.length).toBeGreaterThan(0);
    });

    it('should have properly formatted paths', () => {
      expect(PATHS.IMAGES_DIRECTORY).toMatch(IMAGES_DIRECTORY_REGEX);
      expect(PATHS.FAVICON).toMatch(FAVICON_REGEX);
    });
  });

  describe('TAG_ICONS', () => {
    it('should have icons for common technologies', () => {
      const expectedTags = [
        'react',
        'typescript',
        'javascript',
        'nextjs',
        'astro',
        'gatsby',
        'vite',
        'css',
        'html',
      ];

      for (const tag of expectedTags) {
        expect(TAG_ICONS[tag as keyof typeof TAG_ICONS]).toBeDefined();
        expect(TAG_ICONS[tag as keyof typeof TAG_ICONS]).toMatch(SVG_EXTENSION_REGEX);
      }
    });

    it('should have string values for all tags', () => {
      for (const icon of Object.values(TAG_ICONS)) {
        expect(typeof icon).toBe('string');
        expect(icon.length).toBeGreaterThan(0);
      }
    });
  });

  describe('FILE_EXTENSIONS', () => {
    it('should have correct file extensions', () => {
      expect(FILE_EXTENSIONS.MARKDOWN).toBe('.md');
      expect(FILE_EXTENSIONS.MDX).toBe('.mdx');

      expect(FILE_EXTENSIONS.SUPPORTED_POSTS).toContain('.md');
      expect(FILE_EXTENSIONS.SUPPORTED_POSTS).toContain('.mdx');
      expect(FILE_EXTENSIONS.SUPPORTED_POSTS).toHaveLength(2);
    });
  });

  describe('DATE_FORMATS', () => {
    it('should have all required date format separators', () => {
      expect(DATE_FORMATS.ISO_DATE_SEPARATOR).toBe('T');
      expect(DATE_FORMATS.PATH_DATE_SEPARATOR).toBe('/');
      expect(DATE_FORMATS.DISPLAY_DATE_SEPARATOR).toBe('-');

      expect(typeof DATE_FORMATS.ISO_DATE_SEPARATOR).toBe('string');
      expect(DATE_FORMATS.ISO_DATE_SEPARATOR.length).toBe(1);
    });
  });
});
