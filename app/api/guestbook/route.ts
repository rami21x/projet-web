import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, createGuestbookSchema, guestbookQuerySchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'

// GET /api/guestbook - Get all guestbook entries
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'guestbook-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { searchParams } = new URL(request.url)

    // Validate query params
    const queryResult = validate(guestbookQuerySchema, {
      page: searchParams.get('page'),
      limit: searchParams.get('limit')
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { error: 'Paramètres invalides', details: queryResult.errors },
        { status: 400 }
      )
    }

    const { page, limit } = queryResult.data
    const skip = (page - 1) * limit

    const [entries, total] = await Promise.all([
      prisma.guestbookEntry.findMany({
        include: {
          author: {
            select: { id: true, name: true }
          },
          _count: {
            select: { likes: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.guestbookEntry.count()
    ])

    const response = NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

    // Add cache headers
    response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/guestbook', method: 'GET' })
  }
}

// POST /api/guestbook - Create a new guestbook entry
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - stricter for guestbook
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.guestbook, identifier: 'guestbook-post' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const body = await request.json()

    // Validate request body
    const validation = validate(createGuestbookSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const { email, name, message, mood } = validation.data

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: { email, name }
      })
    }

    // Create guestbook entry
    const entry = await prisma.guestbookEntry.create({
      data: {
        message,
        mood,
        authorId: user.id
      },
      include: {
        author: {
          select: { id: true, name: true }
        },
        _count: {
          select: { likes: true }
        }
      }
    })

    // Update site stats
    await prisma.siteStats.upsert({
      where: { id: 'main' },
      update: { totalMessages: { increment: 1 } },
      create: { id: 'main', totalMessages: 1 }
    })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    return handleApiError(error, { path: '/api/guestbook', method: 'POST' })
  }
}
