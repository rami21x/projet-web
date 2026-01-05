import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, newsletterSubscribeSchema, newsletterUnsubscribeSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - very strict for newsletter
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.newsletter, identifier: 'newsletter-subscribe' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const body = await request.json()

    // Validate request body
    const validation = validate(newsletterSubscribeSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const { email, name, source } = validation.data

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Resubscribe
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { status: 'active' }
        })
        return NextResponse.json({
          success: true,
          message: 'Réabonnement réussi !'
        })
      }
      return NextResponse.json({
        success: false,
        message: 'Cette adresse email est déjà inscrite'
      })
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        name,
        source
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie !'
    }, { status: 201 })
  } catch (error) {
    return handleApiError(error, { path: '/api/newsletter', method: 'POST' })
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.write, identifier: 'newsletter-unsubscribe' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { searchParams } = new URL(request.url)
    const emailParam = searchParams.get('email')

    // Validate email
    const validation = validate(newsletterUnsubscribeSchema, { email: emailParam })
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Email invalide', details: validation.errors },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Check if subscriber exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (!existing) {
      return NextResponse.json({
        success: false,
        message: 'Cette adresse email n\'est pas inscrite'
      }, { status: 404 })
    }

    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: 'unsubscribed' }
    })

    return NextResponse.json({
      success: true,
      message: 'Désinscription réussie'
    })
  } catch (error) {
    return handleApiError(error, { path: '/api/newsletter', method: 'DELETE' })
  }
}
