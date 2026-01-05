import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, voteDesignSchema, emailSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'
import { z } from 'zod'

// POST /api/designs/[id]/vote - Vote for a design
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.write, identifier: 'design-vote' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { id: designId } = await params
    const body = await request.json()

    // Validate
    const validation = validate(voteDesignSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const { email, type } = validation.data

    // Verify design exists
    const design = await prisma.design.findUnique({ where: { id: designId } })
    if (!design) {
      return NextResponse.json({ error: 'Design non trouvé' }, { status: 404 })
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
    return handleApiError(error, { path: '/api/designs/[id]/vote', method: 'POST' })
  }
}

// GET /api/designs/[id]/vote - Get vote status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'design-vote-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { id: designId } = await params
    const { searchParams } = new URL(request.url)
    const emailParam = searchParams.get('email')
    const typeParam = searchParams.get('type') || 'people'

    // Validate type
    const typeSchema = z.enum(['people', 'heart'])
    const typeResult = typeSchema.safeParse(typeParam)
    const type = typeResult.success ? typeResult.data : 'people'

    const voteCount = await prisma.vote.count({
      where: { designId, type }
    })

    if (!emailParam) {
      return NextResponse.json({ voted: false, voteCount })
    }

    // Validate email
    const emailResult = emailSchema.safeParse(emailParam)
    if (!emailResult.success) {
      return NextResponse.json({ voted: false, voteCount })
    }

    const user = await prisma.user.findUnique({ where: { email: emailResult.data } })
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
    return handleApiError(error, { path: '/api/designs/[id]/vote', method: 'GET' })
  }
}
