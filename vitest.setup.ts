import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

// Mock next/image to a plain img for tests
vi.mock('next/image', () => ({
  default: ({ src, alt, priority: _priority, ...rest }: { src: any; alt: string; priority?: boolean }) => {
    const resolvedSrc = typeof src === 'string' ? src : (src?.src ?? '');
    // Drop Next-specific props like `priority` that aren't valid on <img>
    // and avoid passing unknown attributes through to the DOM.
    const { sizes, ...imgProps } = rest as Record<string, any>;
    return React.createElement('img', { src: resolvedSrc, alt, ...imgProps });
  },
}));

// Polyfill for global
if (typeof global === 'undefined') {
  globalThis.global = globalThis;
}

// Mock window.matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

afterEach(() => {
  cleanup();
});
