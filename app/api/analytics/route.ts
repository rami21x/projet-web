import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/analytics/pageview - Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referrer, sessionId } = body

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
    console.error('Error tracking pageview:', error)
    return NextResponse.json(
      { error: 'Failed to track pageview' },
      { status: 500 }
    )
  }
}

// GET /api/analytics - Get analytics data (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')

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

    return NextResponse.json({
      pageViews,
      topPages,
      events
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
