import type { ServiceError } from './types';

export class ServiceException extends Error {
  readonly code?: string | number;

  constructor(message: string, code?: string | number) {
    super(message);
    this.name = 'ServiceException';
    if (code !== undefined) {
      this.code = code;
    }
  }
}

export function createErrorResult(message: string, code?: string | number): ServiceError {
  const error: ServiceError['error'] = { message };
  if (code !== undefined) {
    error.code = code;
  }
  return { error };
}

export function handleServiceError(error: unknown): ServiceError {
  if (error instanceof ServiceException) {
    return createErrorResult(error.message, error.code);
  }

  if (error instanceof Error) {
    return createErrorResult(error.message);
  }

  return createErrorResult('An unknown error occurred');
}

export async function safeAsyncCall<T>(fn: () => Promise<T>): Promise<{ data: T } | ServiceError> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    return handleServiceError(error);
  }
}
