export class PostServiceError extends Error {
  readonly code: string;
  readonly filePath?: string;

  constructor(message: string, code: string, filePath?: string) {
    super(message);
    this.name = 'PostServiceError';
    this.code = code;
    this.filePath = filePath;
  }
}

export class ValidationError extends PostServiceError {
  constructor(message: string, filePath?: string) {
    super(message, 'VALIDATION_ERROR', filePath);
    this.name = 'ValidationError';
  }
}

export class FileSystemError extends PostServiceError {
  constructor(message: string, filePath?: string) {
    super(message, 'FILE_SYSTEM_ERROR', filePath);
    this.name = 'FileSystemError';
  }
}

export class ExternalServiceError extends PostServiceError {
  constructor(message: string, _service: string) {
    super(message, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}

/**
 * Centralized error logging with context
 */
export function logError(error: Error, context?: string): void {
  const timestamp = new Date().toISOString();
  const contextStr = context ? `[${context}] ` : '';
  const message = `${timestamp} ${contextStr}${error.name}: ${error.message}`;

  process.stderr.write(`${message}\n`);

  if (error.stack) {
    process.stderr.write(`${error.stack}\n`);
  }
}

/**
 * Safe error handling for async operations
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback: T,
  context?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), context);
    return fallback;
  }
}

/**
 * Handle critical errors that should stop execution
 */
export function handleCriticalError(error: Error, context?: string): never {
  logError(error, context);
  process.exit(1);
}
