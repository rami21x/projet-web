import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/designs/[id]/vote - Vote for a design
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: designId } = await params
    const body = await request.json()
    const { email, type = 'people' } = body

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

    // Check if already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_designId_type: {
          userId: user.id,
          designId,
          type
        }
      }
    })

    if (existingVote) {
      // Unvote
      await prisma.vote.delete({
        where: { id: existingVote.id }
      })

      // Update site stats
      await prisma.siteStats.upsert({
        where: { id: 'main' },
        update: { totalVotes: { decrement: 1 } },
        create: { id: 'main', totalVotes: 0 }
      })

      const voteCount = await prisma.vote.count({
        where: { designId, type }
      })

      return NextResponse.json({
        voted: false,
        voteCount
      })
    } else {
      // Vote
      await prisma.vote.create({
        data: {
          userId: user.id,
          designId,
          type
        }
      })

      // Update site stats
      await prisma.siteStats.upsert({
        where: { id: 'main' },
        update: { totalVotes: { increment: 1 } },
        create: { id: 'main', totalVotes: 1 }
      })

      const voteCount = await prisma.vote.count({
        where: { designId, type }
      })

      return NextResponse.json({
        voted: true,
        voteCount
      })
    }
  } catch (error) {
    console.error('Error toggling vote:', error)
    return NextResponse.json(
      { error: 'Failed to toggle vote' },
      { status: 500 }
    )
  }
}

// GET /api/designs/[id]/vote - Get vote status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: designId } = await params
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const type = searchParams.get('type') || 'people'

    const voteCount = await prisma.vote.count({
      where: { designId, type }
    })

    if (!email) {
      return NextResponse.json({ voted: false, voteCount })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ voted: false, voteCount })
    }

    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_designId_type: {
          userId: user.id,
          designId,
          type
        }
      }
    })

    return NextResponse.json({
      voted: !!existingVote,
      voteCount
    })
  } catch (error) {
    console.error('Error checking vote:', error)
    return NextResponse.json(
      { error: 'Failed to check vote' },
      { status: 500 }
    )
  }
}
