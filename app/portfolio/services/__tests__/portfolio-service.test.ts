import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fs promises with proper default export
const mockReaddir = vi.fn();
const mockReadFile = vi.fn();

vi.mock('node:fs', () => ({
  default: {
    promises: {
      readdir: mockReaddir,
      readFile: mockReadFile,
    },
  },
  promises: {
    readdir: mockReaddir,
    readFile: mockReadFile,
  },
}));

// Import after mocking
const { getAllPortfolioItems } = await import('../portfolio-service');

describe('portfolio-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAllPortfolioItems', () => {
    it('should return empty array when no files exist', async () => {
      mockReaddir.mockResolvedValue([]);

      const result = await getAllPortfolioItems();

      expect(result).toEqual([]);
    });

    it('should filter and process only markdown files', async () => {
      mockReaddir.mockResolvedValue(['test.md', 'test.txt', 'test.mdx', 'test.js']);
      mockReadFile.mockResolvedValue(`---
title: "Test Project"
description: "Test description"
category: "solo-development"
tags: ["React", "TypeScript"]
url: "https://example.com"
github: "https://github.com/test/test"
startedAt: "2023.01"
isActive: true
image: "test.png"
---

# Test Content
This is test content.
`);

      const result = await getAllPortfolioItems();

      expect(mockReadFile).toHaveBeenCalledTimes(2); // Only .md and .mdx files
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        title: 'Test Project',
        category: 'solo-development',
        description: 'Test description',
      });
    });

    it('should correctly process work category items', async () => {
      mockReaddir.mockResolvedValue(['work-project.md']);
      mockReadFile.mockResolvedValue(`---
title: "Work Project"
description: "Work project description"
category: "work"
tags: ["Next.js", "TypeScript"]
url: "https://work-example.com"
github: "https://github.com/work/project"
startedAt: "2024.05"
isActive: false
image: "work-project.png"
---

# Work Project
This is a work project.
`);

      const result = await getAllPortfolioItems();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        title: 'Work Project',
        category: 'work',
        description: 'Work project description',
        tech: ['Next.js', 'TypeScript'],
        demo: 'https://work-example.com',
        github: 'https://github.com/work/project',
        startedAt: '2024.05',
        isActive: false,
      });
    });

    it('should correctly process solo-development category items', async () => {
      mockReaddir.mockResolvedValue(['solo-project.md']);
      mockReadFile.mockResolvedValue(`---
title: "Solo Project"
description: "Solo project description"
category: "solo-development"
tags: ["Rust", "CLI"]
url: "https://solo-example.com"
github: "https://github.com/solo/project"
startedAt: "2023.12"
isActive: true
image: "solo-project.gif"
---

# Solo Project
This is a solo development project.
`);

      const result = await getAllPortfolioItems();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        title: 'Solo Project',
        category: 'solo-development',
        description: 'Solo project description',
        tech: ['Rust', 'CLI'],
        demo: 'https://solo-example.com',
        github: 'https://github.com/solo/project',
        startedAt: '2023.12',
        isActive: true,
      });
    });

    it('should fallback to solo-development when category is missing', async () => {
      mockReaddir.mockResolvedValue(['no-category.md']);
      mockReadFile.mockResolvedValue(`---
title: "No Category Project"
description: "Project without category"
tags: ["JavaScript"]
url: "https://no-category-example.com"
github: "https://github.com/no/category"
startedAt: "2023.06"
isActive: true
image: "no-category.png"
---

# No Category Project
This project has no category defined.
`);

      const result = await getAllPortfolioItems();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        title: 'No Category Project',
        category: 'solo-development', // Should fallback to default
        description: 'Project without category',
      });
    });

    it('should handle image path correctly', async () => {
      mockReaddir.mockResolvedValue(['image-test.md']);
      mockReadFile.mockResolvedValue(`---
title: "Image Test"
description: "Testing image paths"
category: "solo-development"
image: "test-image.png"
---

# Image Test
Testing image path handling.
`);

      const result = await getAllPortfolioItems();

      expect(result[0].image).toBe('/portfolio/test-image.png');
    });

    it('should handle absolute image paths', async () => {
      mockReaddir.mockResolvedValue(['absolute-image-test.md']);
      mockReadFile.mockResolvedValue(`---
title: "Absolute Image Test"
description: "Testing absolute image paths"
category: "solo-development"
image: "/portfolio/absolute-test.png"
---

# Absolute Image Test
Testing absolute image path handling.
`);

      const result = await getAllPortfolioItems();

      expect(result[0].image).toBe('/portfolio/absolute-test.png');
    });

    it('should handle HTTP image URLs', async () => {
      mockReaddir.mockResolvedValue(['http-image-test.md']);
      mockReadFile.mockResolvedValue(`---
title: "HTTP Image Test"
description: "Testing HTTP image URLs"
category: "solo-development"
image: "https://example.com/image.png"
---

# HTTP Image Test
Testing HTTP image URL handling.
`);

      const result = await getAllPortfolioItems();

      expect(result[0].image).toBe('https://example.com/image.png');
    });

    it('should sort items by startedAt in descending order', async () => {
      mockReaddir.mockResolvedValue(['old.md', 'new.md', 'middle.md']);
      mockReadFile
        .mockResolvedValueOnce(`---
title: "Old Project"
category: "solo-development"
startedAt: "2022.01"
---`)
        .mockResolvedValueOnce(`---
title: "New Project"
category: "work"
startedAt: "2024.12"
---`)
        .mockResolvedValueOnce(`---
title: "Middle Project"
category: "solo-development"
startedAt: "2023.06"
---`);

      const result = await getAllPortfolioItems();

      expect(result).toHaveLength(3);
      expect(result[0].title).toBe('New Project');
      expect(result[1].title).toBe('Middle Project');
      expect(result[2].title).toBe('Old Project');
    });

    it('should handle file processing errors gracefully', async () => {
      mockReaddir.mockResolvedValue(['valid.md', 'invalid.md']);
      mockReadFile
        .mockResolvedValueOnce(
          `---
title: "Valid Project"
category: "solo-development"
---`
        )
        .mockRejectedValueOnce(new Error('File read error'));

      const result = await getAllPortfolioItems();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Valid Project');
    });

    it('should handle directory read errors gracefully', async () => {
      mockReaddir.mockRejectedValue(new Error('Directory read error'));

      const result = await getAllPortfolioItems();

      expect(result).toEqual([]);
    });
  });
});
