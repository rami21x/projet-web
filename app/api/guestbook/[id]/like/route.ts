import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, likeGuestbookSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'

// POST /api/guestbook/[id]/like - Like/unlike a guestbook entry
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.write, identifier: 'guestbook-like' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { id: guestbookId } = await params
    const body = await request.json()

    // Validate
    const validation = validate(likeGuestbookSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Email invalide', details: validation.errors },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Verify guestbook entry exists
    const entry = await prisma.guestbookEntry.findUnique({ where: { id: guestbookId } })
    if (!entry) {
      return NextResponse.json({ error: 'Entrée non trouvée' }, { status: 404 })
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
    return handleApiError(error, { path: '/api/guestbook/[id]/like', method: 'POST' })
  }
}
