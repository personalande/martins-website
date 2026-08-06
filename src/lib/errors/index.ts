export class AppError extends Error {
  public statusCode: number
  public code?: string

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message)
    this.name = 'AppError'
    this.statusCode = statusCode
    this.code = code
    // Restore prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Recurso') {
    super(`${resource} não encontrado`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Não autorizado') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Acesso negado') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
    this.name = 'ConflictError'
    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('Muitas requisições. Tente novamente em instantes.', 429, 'RATE_LIMIT')
    this.name = 'RateLimitError'
    Object.setPrototypeOf(this, RateLimitError.prototype)
  }
}

/**
 * Safely handles any caught error and returns a user-friendly message and HTTP status code.
 * Use this in API route handlers to normalize all errors into a consistent response shape.
 */
export function handleApiError(error: unknown): { message: string; statusCode: number; code?: string } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    }
  }

  if (error instanceof Error) {
    // Don't expose raw error messages in production
    if (process.env.NODE_ENV === 'development') {
      return { message: error.message, statusCode: 500 }
    }
    return { message: 'Erro interno do servidor', statusCode: 500 }
  }

  return { message: 'Erro desconhecido', statusCode: 500 }
}

/**
 * Asserts that a value is not null or undefined.
 * Throws NotFoundError if the value is nullish.
 */
export function assertFound<T>(value: T | null | undefined, resource?: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new NotFoundError(resource)
  }
}
