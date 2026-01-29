import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyPassword, createSession } from '@/lib/auth'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email invalide').transform(v => v.toLowerCase().trim()),
  password: z.string().min(1, 'Mot de passe requis'),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.sensitive, identifier: 'auth-login' })
    if (!rateLimit.success) return rateLimitedResponse(rateLimit)

    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      const errors = parsed.error.issues.map(i => i.message)
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const { email, password } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    const token = await createSession(user.id)

    const response = NextResponse.json({
      success: true,
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

    response.cookies.set('arteral-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/auth/login', method: 'POST' })
  }
}
