import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { validate, moderateDesignSchema } from '@/lib/validations'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'

// Simple admin key check (in production, use proper auth)
const ADMIN_KEY = process.env.ADMIN_KEY || 'arteral-admin-2024'

// POST /api/admin/moderate - Moderate a design
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.sensitive, identifier: 'admin-moderate' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const body = await request.json()

    // Validate request
    const validation = validate(moderateDesignSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.errors },
        { status: 400 }
      )
    }

    const { designId, action, adminKey } = validation.data

    // Check admin key
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Clé admin invalide' },
        { status: 401 }
      )
    }

    // Map action to status
    const statusMap: Record<string, string> = {
      approve: 'approved',
      reject: 'rejected',
      feature: 'featured'
    }

    const newStatus = statusMap[action]

    // Update design
    const design = await prisma.design.update({
      where: { id: designId },
      data: { status: newStatus },
      include: {
        author: {
          select: { id: true, name: true, artistName: true, email: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: `Design ${action === 'approve' ? 'approuvé' : action === 'reject' ? 'rejeté' : 'mis en avant'}`,
      design
    })
  } catch (error) {
    return handleApiError(error, { path: '/api/admin/moderate', method: 'POST' })
  }
}

// GET /api/admin/moderate - Get pending designs
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.general, identifier: 'admin-get' })
    if (!rateLimit.success) {
      return rateLimitedResponse(rateLimit)
    }

    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get('key')

    // Check admin key
    if (adminKey !== ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Clé admin invalide' },
        { status: 401 }
      )
    }

    const status = searchParams.get('status') || 'pending'

    const designs = await prisma.design.findMany({
      where: { status },
      include: {
        author: {
          select: { id: true, name: true, artistName: true, email: true }
        },
        _count: {
          select: { likes: true, votes: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Also get counts for each status
    const [pendingCount, approvedCount, rejectedCount, featuredCount] = await Promise.all([
      prisma.design.count({ where: { status: 'pending' } }),
      prisma.design.count({ where: { status: 'approved' } }),
      prisma.design.count({ where: { status: 'rejected' } }),
      prisma.design.count({ where: { status: 'featured' } })
    ])

    return NextResponse.json({
      designs,
      counts: {
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        featured: featuredCount
      }
    })
  } catch (error) {
    return handleApiError(error, { path: '/api/admin/moderate', method: 'GET' })
  }
}
