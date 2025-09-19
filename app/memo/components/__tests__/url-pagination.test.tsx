import { describe, expect, it } from 'vitest';
import { createPageUrl, getVisiblePages } from '@/memo/components/url-pagination';

const BASE_PATH = '/memo';
const FIRST_PAGE = 1;
const SECOND_PAGE = 2;
const FIFTH_PAGE = 5;
const TENTH_PAGE = 10;
const SMALL_TOTAL_PAGES = 5;
const LARGE_TOTAL_PAGES = 20;
const RANGE_CURRENT_PAGE = 5;
const RANGE_TOTAL_PAGES = 10;
const OFFSET_ONE = 1;
const OFFSET_TWO = 2;

describe('UrlPagination utilities', () => {
  it('creates correct URLs for pages', () => {
    const cases = [
      { page: FIRST_PAGE, expected: '/memo' },
      { page: SECOND_PAGE, expected: '/memo/page/2' },
      { page: FIFTH_PAGE, expected: '/memo/page/5' },
      { page: TENTH_PAGE, expected: '/memo/page/10' },
    ];

    for (const { page, expected } of cases) {
      expect(createPageUrl(BASE_PATH, page)).toBe(expected);
    }
  });

  it('returns a full range when total pages are small', () => {
    const expected = Array.from({ length: SMALL_TOTAL_PAGES }, (_, index) => FIRST_PAGE + index);
    expect(getVisiblePages(SECOND_PAGE, SMALL_TOTAL_PAGES)).toEqual(expected);
  });

  it('includes ellipses for large page ranges', () => {
    const visiblePages = getVisiblePages(TENTH_PAGE, LARGE_TOTAL_PAGES);
    expect(visiblePages).toContain('...');
    expect(visiblePages).toContain(FIRST_PAGE);
    expect(visiblePages).toContain(LARGE_TOTAL_PAGES);
  });

  it('handles edge cases at the boundaries', () => {
    const firstPageRange = getVisiblePages(FIRST_PAGE, RANGE_TOTAL_PAGES);
    expect(firstPageRange[0]).toBe(FIRST_PAGE);

    const lastPageRange = getVisiblePages(RANGE_TOTAL_PAGES, RANGE_TOTAL_PAGES);
    expect(lastPageRange.at(-1)).toBe(RANGE_TOTAL_PAGES);
  });

  it('shows neighbors around the current page', () => {
    const visiblePages = getVisiblePages(RANGE_CURRENT_PAGE, RANGE_TOTAL_PAGES);

    expect(visiblePages).toContain(RANGE_CURRENT_PAGE - OFFSET_TWO);
    expect(visiblePages).toContain(RANGE_CURRENT_PAGE - OFFSET_ONE);
    expect(visiblePages).toContain(RANGE_CURRENT_PAGE);
    expect(visiblePages).toContain(RANGE_CURRENT_PAGE + OFFSET_ONE);
    expect(visiblePages).toContain(RANGE_CURRENT_PAGE + OFFSET_TWO);
  });
});
