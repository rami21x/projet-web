import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, createDesignSchema, designQuerySchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'
import { sendDesignSubmissionEmail } from '@/lib/email'

// GET /api/designs - Get all designs with pagination
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'designs-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { searchParams } = new URL(request.url)

    // Validate query params
    const queryResult = validate(designQuerySchema, {
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
      sort: searchParams.get('sort')
    })

    if (!queryResult.success) {
      return NextResponse.json(
        { error: 'Paramètres invalides', details: queryResult.errors },
        { status: 400 }
      )
    }

    const { page, limit, status, sort } = queryResult.data
    const skip = (page - 1) * limit

    let orderBy: Record<string, unknown> = { createdAt: 'desc' }
    if (sort === 'popular') {
      orderBy = { likes: { _count: 'desc' } }
    } else if (sort === 'votes') {
      orderBy = { votes: { _count: 'desc' } }
    }

    const where = status ? { status } : {}

    const [designs, total] = await Promise.all([
      prisma.design.findMany({
        where,
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
      prisma.design.count({ where })
    ])

    const response = NextResponse.json({
      designs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

    // Add cache headers
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120')

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/designs', method: 'GET' })
  }
}

// POST /api/designs - Create a new design
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - stricter for submissions
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.designSubmit, identifier: 'designs-post' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const body = await request.json()

    // Validate request body
    const validation = validate(createDesignSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const {
      email,
      name,
      artistName,
      title,
      philosophy,
      imageData,
      garmentType,
      garmentFit,
      garmentColor,
      storyboard
    } = validation.data

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({
        data: { email, name, artistName }
      })
    }

    // Check if user already has a design submitted (limit: 1 per artist)
    const existingDesign = await prisma.design.findFirst({
      where: { authorId: user.id }
    })
    if (existingDesign) {
      return NextResponse.json(
        { error: 'Vous avez déjà soumis une œuvre. Chaque artiste ne peut soumettre qu\'une seule création.' },
        { status: 409 }
      )
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
        storyboard: storyboard || [],
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

    // Send confirmation email (non-blocking)
    sendDesignSubmissionEmail({
      to: email,
      artistName: artistName || name,
      designTitle: title,
    }).catch((err) => console.error('Failed to send confirmation email:', err))

    return NextResponse.json(design, { status: 201 })
  } catch (error) {
    return handleApiError(error, { path: '/api/designs', method: 'POST' })
  }
}
