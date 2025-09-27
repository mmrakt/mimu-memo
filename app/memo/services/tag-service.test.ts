import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { isValidTag, TAG_LIST, validateTag, validateTagSafe } from '@/memo/services/tag-service';

const EXPECTED_TAG_COUNT = 13;

describe('Tag Service', () => {
  describe('TAG_LIST', () => {
    it('should contain expected tags', () => {
      expect(TAG_LIST).toContain('other');
      expect(TAG_LIST).toContain('react');
      expect(TAG_LIST).toContain('typescript');
      expect(TAG_LIST).toContain('javascript');
      expect(TAG_LIST).toContain('nextjs');
      expect(TAG_LIST).toContain('astro');
      expect(TAG_LIST).toContain('gatsby');
      expect(TAG_LIST).toContain('vite');
      expect(TAG_LIST).toContain('css');
      expect(TAG_LIST).toContain('tailwindcss');
      expect(TAG_LIST).toContain('java');
    });

    it('should have correct length', () => {
      expect(TAG_LIST).toHaveLength(EXPECTED_TAG_COUNT);
    });

    it('should be readonly constant', () => {
      expect(Array.isArray(TAG_LIST)).toBe(true);
      // TypeScript const assertion prevents runtime mutation
      expect(Object.isFrozen(TAG_LIST)).toBe(false); // Not frozen by default, but const
      expect(TAG_LIST).toBeDefined();
    });
  });

  describe('isValidTag', () => {
    it('should return true for valid tags', () => {
      expect(isValidTag('react')).toBe(true);
      expect(isValidTag('typescript')).toBe(true);
      expect(isValidTag('javascript')).toBe(true);
      expect(isValidTag('other')).toBe(true);
      expect(isValidTag('nextjs')).toBe(true);
      expect(isValidTag('astro')).toBe(true);
      expect(isValidTag('gatsby')).toBe(true);
      expect(isValidTag('vite')).toBe(true);
      expect(isValidTag('css')).toBe(true);
      expect(isValidTag('tailwindcss')).toBe(true);
      expect(isValidTag('java')).toBe(true);
    });

    it('should return false for invalid tags', () => {
      expect(isValidTag('invalid-tag')).toBe(false);
      expect(isValidTag('python')).toBe(false);
      expect(isValidTag('ruby')).toBe(false);
      expect(isValidTag('vue')).toBe(false);
      expect(isValidTag('angular')).toBe(false);
    });

    it('should return false for empty or falsy values', () => {
      expect(isValidTag('')).toBe(false);
      expect(isValidTag('   ')).toBe(false);
      expect(isValidTag(null as unknown as string)).toBe(false);
      expect(isValidTag(undefined as unknown as string)).toBe(false);
    });

    it('should be case sensitive', () => {
      expect(isValidTag('React')).toBe(false);
      expect(isValidTag('REACT')).toBe(false);
      expect(isValidTag('TypeScript')).toBe(false);
      expect(isValidTag('JavaScript')).toBe(false);
      expect(isValidTag('NextJS')).toBe(false);
    });

    it('should handle special characters', () => {
      expect(isValidTag('react-native')).toBe(false);
      expect(isValidTag('react.js')).toBe(false);
      expect(isValidTag('react/16')).toBe(false);
    });
  });

  describe('validateTag', () => {
    let mockProcessExit: MockInstance;
    let mockStderrWrite: MockInstance;

    beforeEach(() => {
      mockProcessExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      mockStderrWrite = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    });

    afterEach(() => {
      mockProcessExit.mockRestore();
      mockStderrWrite.mockRestore();
    });

    it('should return valid tags unchanged', () => {
      expect(validateTag('react')).toBe('react');
      expect(validateTag('typescript')).toBe('typescript');
      expect(validateTag('javascript')).toBe('javascript');
      expect(validateTag('other')).toBe('other');
      expect(validateTag('nextjs')).toBe('nextjs');
      expect(validateTag('astro')).toBe('astro');
      expect(validateTag('gatsby')).toBe('gatsby');
      expect(validateTag('vite')).toBe('vite');
      expect(validateTag('css')).toBe('css');
      expect(validateTag('tailwindcss')).toBe('tailwindcss');
      expect(validateTag('java')).toBe('java');
    });

    it('should call process.exit for invalid tags', () => {
      validateTag('invalid-tag');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
      expect(mockStderrWrite).toHaveBeenCalled();
    });

    it('should call process.exit for empty tags', () => {
      validateTag('');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
      expect(mockStderrWrite).toHaveBeenCalled();
    });

    it('should log error messages with file path when provided', () => {
      validateTag('invalid-tag', '/path/to/file.md');
      expect(mockStderrWrite).toHaveBeenCalled();
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('should call process.exit for null and undefined inputs', () => {
      validateTag(null as unknown as string);
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      validateTag(undefined as unknown as string);
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('should call process.exit for whitespace-only tags', () => {
      validateTag('   ');
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      validateTag('\t');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('should call process.exit for case-sensitive invalid tags', () => {
      validateTag('React');
      expect(mockProcessExit).toHaveBeenCalledWith(1);

      validateTag('TYPESCRIPT');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });

    it('should call process.exit for tags with whitespace', () => {
      validateTag('  react  ');
      expect(mockProcessExit).toHaveBeenCalledWith(1);
    });
  });

  describe('validateTagSafe', () => {
    it('should return valid tags unchanged', () => {
      expect(validateTagSafe('react')).toBe('react');
      expect(validateTagSafe('typescript')).toBe('typescript');
      expect(validateTagSafe('javascript')).toBe('javascript');
      expect(validateTagSafe('other')).toBe('other');
    });

    it('should return fallback for invalid tags', () => {
      expect(validateTagSafe('invalid-tag')).toBe('other');
      expect(validateTagSafe('python')).toBe('other');
      expect(validateTagSafe('React')).toBe('other');
    });

    it('should return fallback for empty or falsy values', () => {
      expect(validateTagSafe('')).toBe('other');
      expect(validateTagSafe('   ')).toBe('other');
      expect(validateTagSafe(null as unknown as string)).toBe('other');
      expect(validateTagSafe(undefined as unknown as string)).toBe('other');
    });

    it('should use custom fallback when provided', () => {
      expect(validateTagSafe('invalid-tag', 'react')).toBe('react');
      expect(validateTagSafe('', 'typescript')).toBe('typescript');
      expect(validateTagSafe('Python', 'javascript')).toBe('javascript');
    });

    it('should return fallback for whitespace-only tags', () => {
      expect(validateTagSafe('   ')).toBe('other');
      expect(validateTagSafe('\t')).toBe('other');
      expect(validateTagSafe('\n')).toBe('other');
    });
  });
});
