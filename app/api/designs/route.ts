import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/designs - Get all designs with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const status = searchParams.get('status') || 'approved'
    const sort = searchParams.get('sort') || 'recent' // recent, popular, votes

    const skip = (page - 1) * limit

    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'popular') {
      orderBy = { likes: { _count: 'desc' } }
    } else if (sort === 'votes') {
      orderBy = { votes: { _count: 'desc' } }
    }

    const [designs, total] = await Promise.all([
      prisma.design.findMany({
        where: { status },
        include: {
          author: {
            select: { id: true, name: true, artistName: true }
          },
          _count: {
            select: { likes: true, comments: true, votes: true }
          }
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.design.count({ where: { status } })
    ])

    return NextResponse.json({
      designs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching designs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch designs' },
      { status: 500 }
    )
  }
}

// POST /api/designs - Create a new design
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      artistName,
      title,
      philosophy,
      imageData,
      garmentType,
      garmentFit,
      garmentColor
    } = body

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: { email, name, artistName }
      })
    }

    // Create design
    const design = await prisma.design.create({
      data: {
        title,
        philosophy,
        imageData,
        garmentType,
        garmentFit,
        garmentColor,
        authorId: user.id,
        status: 'pending' // Requires moderation
      },
      include: {
        author: {
          select: { id: true, name: true, artistName: true }
        },
        _count: {
          select: { likes: true, comments: true, votes: true }
        }
      }
    })

    // Update site stats
    await prisma.siteStats.upsert({
      where: { id: 'main' },
      update: { totalDesigns: { increment: 1 } },
      create: { id: 'main', totalDesigns: 1 }
    })

    return NextResponse.json(design, { status: 201 })
  } catch (error) {
    console.error('Error creating design:', error)
    return NextResponse.json(
      { error: 'Failed to create design' },
      { status: 500 }
    )
  }
}
