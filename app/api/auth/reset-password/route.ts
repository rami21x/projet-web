import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
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
    'Le mot de passe doit contenir au moins un caractère spécial'
  )

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requis'),
  password: passwordSchema,
})

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request, {
      ...rateLimitConfigs.sensitive,
      identifier: 'auth-reset-password',
      maxRequests: 5,
    })
    if (!rateLimit.success) return rateLimitedResponse(rateLimit)

    const body = await request.json()
    const parsed = resetPasswordSchema.safeParse(body)
    if (!parsed.success) {
      const errors = parsed.error.issues.map(i => i.message)
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }

    const { token, password } = parsed.data

    // Find valid token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    })

    if (!resetToken) {
      return NextResponse.json({ error: 'Lien invalide ou expiré' }, { status: 400 })
    }

    if (resetToken.used) {
      return NextResponse.json({ error: 'Ce lien a déjà été utilisé' }, { status: 400 })
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Ce lien a expiré' }, { status: 400 })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Hash new password and update user
    const hashedPassword = await hashPassword(password)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true }
      }),
      // Invalidate all existing sessions for security
      prisma.session.deleteMany({
        where: { userId: user.id }
      })
    ])

    return NextResponse.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    })
  } catch (error) {
    return handleApiError(error, { path: '/api/auth/reset-password', method: 'POST' })
  }
}
