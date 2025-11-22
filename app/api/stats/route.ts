import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/stats - Get site stats
export async function GET() {
  try {
    // Get or create stats
    let stats = await prisma.siteStats.findUnique({
      where: { id: 'main' }
    })

    if (!stats) {
      // Calculate stats from actual data
      const [totalDesigns, totalVotes, totalMessages, totalVisitors] = await Promise.all([
        prisma.design.count(),
        prisma.vote.count(),
        prisma.guestbookEntry.count(),
        prisma.pageView.groupBy({
          by: ['sessionId'],
          _count: true
        }).then(r => r.length)
      ])

      stats = await prisma.siteStats.create({
        data: {
          id: 'main',
          totalDesigns,
          totalVotes,
          totalMessages,
          totalVisitors
        }
      })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

// POST /api/stats/refresh - Refresh stats from actual data
export async function POST() {
  try {
    const [totalDesigns, totalVotes, totalMessages, uniqueSessions] = await Promise.all([
      prisma.design.count({ where: { status: 'approved' } }),
      prisma.vote.count(),
      prisma.guestbookEntry.count(),
      prisma.pageView.groupBy({
        by: ['sessionId'],
        _count: true
      })
    ])

    const stats = await prisma.siteStats.upsert({
      where: { id: 'main' },
      update: {
        totalDesigns,
        totalVotes,
        totalMessages,
        totalVisitors: uniqueSessions.length
      },
      create: {
        id: 'main',
        totalDesigns,
        totalVotes,
        totalMessages,
        totalVisitors: uniqueSessions.length
      }
    })

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error refreshing stats:', error)
    return NextResponse.json(
      { error: 'Failed to refresh stats' },
      { status: 500 }
    )
  }
}
