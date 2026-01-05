import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, contestSubmissionSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'

// GET /api/contest - Get contest submissions
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'contest-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { searchParams } = new URL(request.url)
    const accepted = searchParams.get('accepted') === 'true'

    const submissions = await prisma.contestSubmission.findMany({
      where: accepted ? { accepted: true } : undefined,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        artistName: true,
        instagram: true,
        description: true,
        accepted: true,
        createdAt: true,
        // Don't expose email or full artwork data in list
        artworkUrl: true
      }
    })

    const response = NextResponse.json(submissions)
    response.headers.set('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=300')

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/contest', method: 'GET' })
  }
}

// POST /api/contest - Submit to contest
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - very strict for contest
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.contest, identifier: 'contest-submit' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const body = await request.json()

    // Validate request body
    const validation = validate(contestSubmissionSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const { artistName, email, instagram, artworkData, description } = validation.data

    // Check for duplicate submission from same email
    const existing = await prisma.contestSubmission.findFirst({
      where: { email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Vous avez déjà soumis une participation avec cette adresse email' },
        { status: 409 }
      )
    }

    const submission = await prisma.contestSubmission.create({
      data: {
        artistName,
        email,
        instagram,
        artworkData,
        description
      },
      select: {
        id: true,
        artistName: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Votre participation a été enregistrée !',
      submission
    }, { status: 201 })
  } catch (error) {
    return handleApiError(error, { path: '/api/contest', method: 'POST' })
  }
}
