import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

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
          message: 'Successfully resubscribed!'
        })
      }
      return NextResponse.json({
        success: false,
        message: 'Email already subscribed'
      })
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        name,
        source: source || 'website'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!'
    }, { status: 201 })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: 'unsubscribed' }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed'
    })
  } catch (error) {
    console.error('Error unsubscribing:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}
