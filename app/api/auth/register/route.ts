import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword, createSession } from '@/lib/auth'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'
import { z } from 'zod'

const passwordSchema = z.string()
  .min(12, 'Mot de passe trop court (min 12 caractères)')
  .max(100)
  .refine(
    (val) => /[A-Z]/.test(val),
    'Le mot de passe doit contenir au moins une majuscule'
  )
  .refine(
    (val) => /[a-z]/.test(val),
    'Le mot de passe doit contenir au moins une minuscule'
  )
  .refine(
    (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val),
    'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)'
  )

const registerSchema = z.object({
  email: z.string().email('Email invalide').transform(v => v.toLowerCase().trim()),
  password: passwordSchema,
  name: z.string().min(2, 'Nom trop court').max(100).transform(v => v.trim()),
  role: z.enum(['artist', 'client'], { error: 'Rôle invalide' }),
  artistName: z.string().max(100).optional(),
  instagram: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, { ...rateLimitConfigs.sensitive, identifier: 'auth-register' })
    if (!rateLimit.success) return rateLimitedResponse(rateLimit)

    const body = await request.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      const errors = parsed.error.issues.map(i => i.message)
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const { email, password, name, role, artistName, instagram, bio } = parsed.data

    // Check if user already exists with a password (registered user)
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing && existing.password) {
      return NextResponse.json({ error: 'Un compte existe déjà avec cet email' }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    let user
    if (existing) {
      // Upgrade anonymous/implicit user to registered
      user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword, name, role, artistName, instagram, bio }
      })
    } else {
      user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role, artistName, instagram, bio }
      })
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
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })

    return response
  } catch (error) {
    return handleApiError(error, { path: '/api/auth/register', method: 'POST' })
  }
}
