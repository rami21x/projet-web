import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, pageViewSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'
import { z } from 'zod'

// POST /api/analytics - Track page view
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - allow many page views but protect against abuse
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'analytics-pageview' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const body = await request.json()

    // Validate
    const validation = validate(pageViewSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const { path, referrer, sessionId } = validation.data

    // Get user agent and try to get country from headers
    const userAgent = request.headers.get('user-agent') || undefined
    const country = request.headers.get('x-vercel-ip-country') || undefined

    await prisma.pageView.create({
      data: {
        path,
        referrer,
        userAgent,
        country,
        sessionId
      }
    })

    // Update visitor count if new session
    if (sessionId) {
      const existingSession = await prisma.pageView.findFirst({
        where: {
          sessionId,
          createdAt: {
            lt: new Date()
          }
        }
      })

      if (!existingSession) {
        await prisma.siteStats.upsert({
          where: { id: 'main' },
          update: { totalVisitors: { increment: 1 } },
          create: { id: 'main', totalVisitors: 1 }
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error, { path: '/api/analytics', method: 'POST' })
  }
}

// GET /api/analytics - Get analytics data (for admin)
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'analytics-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { searchParams } = new URL(request.url)
    const daysParam = searchParams.get('days') || '7'

    // Validate days param
    const daysSchema = z.coerce.number().int().min(1).max(365)
    const daysResult = daysSchema.safeParse(daysParam)
    const days = daysResult.success ? daysResult.data : 7

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const [pageViews, topPages, events] = await Promise.all([
      // Page views per day
      prisma.pageView.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: true
      }),
      // Top pages
      prisma.pageView.groupBy({
        by: ['path'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: true,
        orderBy: {
          _count: {
            path: 'desc'
          }
        },
        take: 10
      }),
      // Events
      prisma.event.groupBy({
        by: ['name'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: true,
        orderBy: {
          _count: {
            name: 'desc'
          }
        },
        take: 10
      })
    ])

    const response = NextResponse.json({
      pageViews,
      topPages,
      events
    })

    response.headers.set('Cache-Control', 'private, s-maxage=60')

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/analytics', method: 'GET' })
  }
}
