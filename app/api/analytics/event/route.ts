import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST /api/analytics/event - Track an event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, label, value, sessionId } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      )
    }

    await prisma.event.create({
      data: {
        name,
        category,
        label,
        value,
        sessionId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}
