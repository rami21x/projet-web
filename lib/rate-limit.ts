import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter
// For production, use Redis or a dedicated service

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
}, 60000) // Clean every minute

export interface RateLimitConfig {
  maxRequests: number      // Max requests allowed
  windowMs: number         // Time window in milliseconds
  identifier?: string      // Custom identifier (default: IP)
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
}

export function getClientIP(request: NextRequest): string {
  // Try various headers for client IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback
  return 'unknown'
}

export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs, identifier } = config

  // Create unique key based on IP and optional identifier
  const ip = getClientIP(request)
  const key = identifier ? `${ip}:${identifier}` : ip

  const now = Date.now()
  const entry = rateLimitStore.get(key)

  // No existing entry or window expired
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    }
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000)
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

// Pre-configured rate limiters for different endpoints
export const rateLimitConfigs = {
  // General API calls - 100 per minute
  general: {
    maxRequests: 100,
    windowMs: 60 * 1000
  },

  // Write operations (POST/PUT/DELETE) - 30 per minute
  write: {
    maxRequests: 30,
    windowMs: 60 * 1000
  },

  // Auth/sensitive - 10 per minute
  sensitive: {
    maxRequests: 10,
    windowMs: 60 * 1000
  },

  // Newsletter subscribe - 5 per hour (prevent spam)
  newsletter: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000
  },

  // Design submission - 10 per hour
  designSubmit: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000
  },

  // Guestbook - 20 per hour
  guestbook: {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000
  },

  // Contest - 5 per day
  contest: {
    maxRequests: 5,
    windowMs: 24 * 60 * 60 * 1000
  }
}

// Helper to create rate limited response
export function rateLimitedResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      error: 'Trop de requêtes. Veuillez réessayer plus tard.',
      retryAfter: result.retryAfter
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfter || 60),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(result.resetTime)
      }
    }
  )
}

// Middleware helper for easy rate limiting
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const result = checkRateLimit(request, config)

    if (!result.success) {
      return rateLimitedResponse(result)
    }

    const response = await handler(request)

    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Remaining', String(result.remaining))
    response.headers.set('X-RateLimit-Reset', String(result.resetTime))

    return response
  }
}
