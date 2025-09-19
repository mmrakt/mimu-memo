import type { PaginatedResult, PaginationParams } from './types';

export function createPaginatedResult<T>(
  items: T[],
  params: PaginationParams,
  total: number
): PaginatedResult<T> {
  const page = params.page || 1;
  const limit = params.limit || 10;
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
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));

  return { page, limit };
}
