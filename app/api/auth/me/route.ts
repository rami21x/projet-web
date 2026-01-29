import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { handleApiError } from '@/lib/error-handler'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        artistName: user.artistName,
        instagram: user.instagram,
        bio: user.bio,
        avatar: user.avatar,
      }
    })
  } catch (error) {
    return handleApiError(error, { path: '/api/auth/me', method: 'GET' })
  }
}
