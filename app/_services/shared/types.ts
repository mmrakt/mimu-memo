// Shared types across all services

export type ServiceResult<T> = {
  data: T;
  error?: never;
};

export type ServiceError = {
  data?: never;
  error: {
    message: string;
    code?: string | number | undefined;
  };
};

export type AsyncServiceResult<T> = Promise<ServiceResult<T> | ServiceError>;

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type BaseContent = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
};

export type Tag = {
  name: string;
  count: number;
};
