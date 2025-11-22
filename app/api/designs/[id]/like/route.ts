import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/designs/[id]/like - Like/unlike a design
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: designId } = await params
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: { email }
      })
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_designId: {
          userId: user.id,
          designId
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      })

      const likeCount = await prisma.like.count({
        where: { designId }
      })

      return NextResponse.json({
        liked: false,
        likeCount
      })
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: user.id,
          designId
        }
      })

      const likeCount = await prisma.like.count({
        where: { designId }
      })

      return NextResponse.json({
        liked: true,
        likeCount
      })
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    )
  }
}

// GET /api/designs/[id]/like - Check if user has liked
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: designId } = await params
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    const likeCount = await prisma.like.count({
      where: { designId }
    })

    if (!email) {
      return NextResponse.json({ liked: false, likeCount })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ liked: false, likeCount })
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_designId: {
          userId: user.id,
          designId
        }
      }
    })

    return NextResponse.json({
      liked: !!existingLike,
      likeCount
    })
  } catch (error) {
    console.error('Error checking like:', error)
    return NextResponse.json(
      { error: 'Failed to check like' },
      { status: 500 }
    )
  }
}
