import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/guestbook/[id]/like - Like/unlike a guestbook entry
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: guestbookId } = await params
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
        userId_guestbookId: {
          userId: user.id,
          guestbookId
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      })

      const likeCount = await prisma.like.count({
        where: { guestbookId }
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
          guestbookId
        }
      })

      const likeCount = await prisma.like.count({
        where: { guestbookId }
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
