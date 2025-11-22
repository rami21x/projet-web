import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/contest - Get contest submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const accepted = searchParams.get('accepted') === 'true'

    const submissions = await prisma.contestSubmission.findMany({
      where: accepted ? { accepted: true } : undefined,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching contest submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

// POST /api/contest - Submit to contest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artistName, email, instagram, artworkData, description } = body

    if (!artistName || !email) {
      return NextResponse.json(
        { error: 'Artist name and email are required' },
        { status: 400 }
      )
    }

    const submission = await prisma.contestSubmission.create({
      data: {
        artistName,
        email,
        instagram,
        artworkData,
        description
      }
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    )
  }
}
