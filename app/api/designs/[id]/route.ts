import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/designs/[id] - Get a single design
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const design = await prisma.design.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, artistName: true, instagram: true }
        },
        comments: {
          include: {
            author: {
              select: { id: true, name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: { likes: true, comments: true, votes: true }
        }
      }
    })

    if (!design) {
      return NextResponse.json(
        { error: 'Design not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(design)
  } catch (error) {
    console.error('Error fetching design:', error)
    return NextResponse.json(
      { error: 'Failed to fetch design' },
      { status: 500 }
    )
  }
}

// DELETE /api/designs/[id] - Delete a design
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.design.delete({ where: { id } })

    // Update site stats
    await prisma.siteStats.update({
      where: { id: 'main' },
      data: { totalDesigns: { decrement: 1 } }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting design:', error)
    return NextResponse.json(
      { error: 'Failed to delete design' },
      { status: 500 }
    )
  }
}
