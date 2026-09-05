// Shared types across all services

export interface ServiceResult<T> {
  data: T;
  error?: never;
}

export interface ServiceError {
  data?: never;
  error: {
    message: string;
    code?: string | number | undefined;
  };
}

export type AsyncServiceResult<T> = Promise<ServiceResult<T> | ServiceError>;

export interface PaginationParams {
  limit?: number;
  page?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface BaseContent {
  createdAt: string;
  id: string;
  title: string;
  updatedAt?: string;
}

export interface Tag {
  count: number;
  name: string;
}
