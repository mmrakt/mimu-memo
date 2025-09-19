import type { PaginatedResult, PaginationParams } from './types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const MIN_PAGE = 1;
const MIN_LIMIT = 1;

export function createPaginatedResult<T>(
  items: T[],
  params: PaginationParams,
  total: number
): PaginatedResult<T> {
  const page = params.page || DEFAULT_PAGE;
  const limit = params.limit || DEFAULT_LIMIT;
  const totalPages = Math.ceil(total / limit);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

export function calculateSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function validatePaginationParams(params: PaginationParams): Required<PaginationParams> {
  const page = Math.max(MIN_PAGE, params.page || DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, params.limit || DEFAULT_LIMIT));

  return { page, limit };
}
