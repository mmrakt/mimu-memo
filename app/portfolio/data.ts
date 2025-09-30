import type { FilterOption } from '@/portfolio/types';

export const PORTFOLIO_PAGE_DESCRIPTION = '一般公開している成果物の紹介';

// This file is deprecated. Portfolio data is now loaded from markdown files in content/portfolio/
// Use getAllPortfolioItems() from ./services/portfolio-service.ts instead

export const filterOptions: FilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'solo-development', label: 'Solo Development' },
];

export const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    work: 'Work',
    'solo-development': 'Solo Development',
  };
  return names[category] || category;
};
