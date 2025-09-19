import { describe, expect, it } from 'vitest';

// Mock the component logic without rendering
describe('UrlPagination Logic', () => {
  const getPageUrl = (page: number) => (page === 1 ? '/memo' : `/memo/page/${page}`);

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  it('should generate correct page URLs', () => {
    expect(getPageUrl(1)).toBe('/memo');
    expect(getPageUrl(2)).toBe('/memo/page/2');
    expect(getPageUrl(5)).toBe('/memo/page/5');
    expect(getPageUrl(10)).toBe('/memo/page/10');
  });

  it('should calculate visible pages correctly for small total pages', () => {
    const result = getVisiblePages(2, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should include dots for large page ranges', () => {
    const result = getVisiblePages(10, 20);
    expect(result).toContain('...');
    expect(result).toContain(1);
    expect(result).toContain(20);
  });

  it('should handle edge cases correctly', () => {
    // First page
    const firstPage = getVisiblePages(1, 10);
    expect(firstPage[0]).toBe(1);

    // Last page
    const lastPage = getVisiblePages(10, 10);
    expect(lastPage.at(-1)).toBe(10);
  });

  it('should show correct range around current page', () => {
    const result = getVisiblePages(5, 10);
    expect(result).toContain(3); // currentPage - 2
    expect(result).toContain(4); // currentPage - 1
    expect(result).toContain(5); // currentPage
    expect(result).toContain(6); // currentPage + 1
    expect(result).toContain(7); // currentPage + 2
  });
});
