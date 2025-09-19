import { describe, expect, it } from 'vitest';
import { getTagIconPath } from '@/memo/components/utils';

describe('Component Utils', () => {
  describe('getTagIconPath', () => {
    it('should return correct icon path for supported tags', () => {
      expect(getTagIconPath('react')).toBe('/tagIcon/react.svg');
      expect(getTagIconPath('typescript')).toBe('/tagIcon/typescript.svg');
      expect(getTagIconPath('nextjs')).toBe('/tagIcon/nextjs.svg');
      expect(getTagIconPath('astro')).toBe('/tagIcon/astro.svg');
    });

    it('should handle case insensitive tags', () => {
      expect(getTagIconPath('REACT')).toBe('/tagIcon/react.svg');
      expect(getTagIconPath('React')).toBe('/tagIcon/react.svg');
      expect(getTagIconPath('rEaCt')).toBe('/tagIcon/react.svg');
    });

    it('should return other.svg for unsupported tags', () => {
      expect(getTagIconPath('unknown')).toBe('/tagIcon/other.svg');
      expect(getTagIconPath('random-tag')).toBe('/tagIcon/other.svg');
      expect(getTagIconPath('')).toBe('/tagIcon/other.svg');
    });

    it('should handle all supported technology tags', () => {
      const supportedTags = [
        'vite',
        'react',
        'nextjs',
        'javascript',
        'typescript',
        'css',
        'html',
        'sass',
        'tailwindcss',
        'astro',
        'gatsby',
        'other',
      ];

      for (const tag of supportedTags) {
        const result = getTagIconPath(tag);
        expect(result).toBe(`/tagIcon/${tag}.svg`);
        if (tag !== 'other') {
          expect(result).not.toBe('/tagIcon/other.svg');
        }
      }
    });

    it('should handle special characters and numbers', () => {
      expect(getTagIconPath('react-18')).toBe('/tagIcon/other.svg');
      expect(getTagIconPath('vue.js')).toBe('/tagIcon/other.svg');
      expect(getTagIconPath('node_js')).toBe('/tagIcon/other.svg');
    });
  });
});
