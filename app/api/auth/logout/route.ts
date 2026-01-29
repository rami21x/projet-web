import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '@/lib/auth'
import { handleApiError } from '@/lib/error-handler'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('arteral-session')?.value
    if (token) {
      await deleteSession(token)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('arteral-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/auth/logout', method: 'POST' })
  }
}
