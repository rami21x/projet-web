import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { checkRateLimit, rateLimitConfigs, rateLimitedResponse } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/error-handler'
import { sendPasswordResetEmail } from '@/lib/email'
import { randomBytes } from 'crypto'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide').transform(v => v.toLowerCase().trim()),
})

export async function POST(request: NextRequest) {
  try {
    // Strict rate limiting for password reset
    const rateLimit = checkRateLimit(request, {
      ...rateLimitConfigs.sensitive,
      identifier: 'auth-forgot-password',
      maxRequests: 3, // Only 3 attempts per window
    })
    if (!rateLimit.success) return rateLimitedResponse(rateLimit)

    const body = await request.json()
    const parsed = forgotPasswordSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const { email } = parsed.data

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } })

    // Always return success to prevent email enumeration
    // But only send email if user exists
    if (user && user.password) {
      // Generate secure token
      const token = randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

      // Delete any existing tokens for this email
      await prisma.passwordResetToken.deleteMany({ where: { email } })

      // Create new token
      await prisma.passwordResetToken.create({
        data: { token, email, expiresAt }
      })

      // Send email
      const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://projet-web-8lni.vercel.app'}/reset-password?token=${token}`

      await sendPasswordResetEmail({
        to: email,
        userName: user.name || 'Utilisateur',
        resetUrl,
      })
    }

    // Always return success
    return NextResponse.json({
      success: true,
      message: 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.'
    })
  } catch (error) {
    return handleApiError(error, { path: '/api/auth/forgot-password', method: 'POST' })
  }
}
