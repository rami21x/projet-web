import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, likeDesignSchema, emailSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'

// POST /api/designs/[id]/like - Like/unlike a design
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.write, identifier: 'design-like' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { id: designId } = await params
    const body = await request.json()

    // Validate
    const validation = validate(likeDesignSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Email invalide', details: validation.errors },
        { status: 400 }
      )
    }

    const { email } = validation.data

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
    return handleApiError(error, { path: '/api/designs/[id]/like', method: 'POST' })
  }
}

// GET /api/designs/[id]/like - Check if user has liked
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'design-like-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { id: designId } = await params
    const { searchParams } = new URL(request.url)
    const emailParam = searchParams.get('email')

    const likeCount = await prisma.like.count({
      where: { designId }
    })

    if (!emailParam) {
      return NextResponse.json({ liked: false, likeCount })
    }

    // Validate email
    const emailResult = emailSchema.safeParse(emailParam)
    if (!emailResult.success) {
      return NextResponse.json({ liked: false, likeCount })
    }

    const user = await prisma.user.findUnique({ where: { email: emailResult.data } })
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
    return handleApiError(error, { path: '/api/designs/[id]/like', method: 'GET' })
  }
}
