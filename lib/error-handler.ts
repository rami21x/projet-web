import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(
    public errors: string[],
    message: string = 'Données invalides'
  ) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Ressource') {
    super(`${resource} non trouvé(e)`, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Non autorisé') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Accès refusé') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter: number = 60) {
    super('Trop de requêtes', 429, 'RATE_LIMIT')
    this.name = 'RateLimitError'
  }
}

// Error response interface
interface ErrorResponse {
  error: string
  code?: string
  details?: string[]
  timestamp: string
}

// In-memory error log (for basic tracking)
interface ErrorLogEntry {
  timestamp: Date
  error: string
  stack?: string
  path?: string
  method?: string
  ip?: string
}

const errorLog: ErrorLogEntry[] = []
const MAX_ERROR_LOG = 1000

export function logError(entry: Omit<ErrorLogEntry, 'timestamp'>): void {
  errorLog.unshift({ ...entry, timestamp: new Date() })

  // Keep only last MAX_ERROR_LOG entries
  if (errorLog.length > MAX_ERROR_LOG) {
    errorLog.pop()
  }

  // Also console.error for server logs
  console.error(`[ERROR] ${entry.error}`, entry.stack || '')
}

export function getRecentErrors(limit: number = 50): ErrorLogEntry[] {
  return errorLog.slice(0, limit)
}

// Main error handler
export function handleApiError(
  error: unknown,
  context?: { path?: string; method?: string; ip?: string }
): NextResponse<ErrorResponse> {
  // Log the error
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  const errorStack = error instanceof Error ? error.stack : undefined

  logError({
    error: errorMessage,
    stack: errorStack,
    ...context
  })

  // Handle known error types
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.errors,
        timestamp: new Date().toISOString()
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString()
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof ZodError) {
    const messages = error.issues.map((e: { path: (string | number)[]; message: string }) => {
      const path = e.path.join('.')
      return path ? `${path}: ${e.message}` : e.message
    })

    return NextResponse.json(
      {
        error: 'Données invalides',
        code: 'VALIDATION_ERROR',
        details: messages,
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    )
  }

  // Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message: string }

    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'Cette entrée existe déjà',
          code: 'DUPLICATE_ENTRY',
          timestamp: new Date().toISOString()
        },
        { status: 409 }
      )
    }

    if (prismaError.code === 'P2025') {
      return NextResponse.json(
        {
          error: 'Ressource non trouvée',
          code: 'NOT_FOUND',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      )
    }
  }

  // Unknown error - return generic message
  return NextResponse.json(
    {
      error: 'Une erreur interne est survenue',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}

// Wrapper for API handlers with automatic error handling
export function withErrorHandler<T>(
  handler: (request: Request) => Promise<NextResponse<T>>
) {
  return async (request: Request): Promise<NextResponse<T | ErrorResponse>> => {
    try {
      return await handler(request)
    } catch (error) {
      return handleApiError(error, {
        path: new URL(request.url).pathname,
        method: request.method
      })
    }
  }
}
