import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/guestbook - Get all guestbook entries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

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

    return NextResponse.json({
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching guestbook:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guestbook entries' },
      { status: 500 }
    )
  }
}

// POST /api/guestbook - Create a new guestbook entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, message, mood } = body

    if (!email || !name || !message || !mood) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

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
    console.error('Error creating guestbook entry:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}
