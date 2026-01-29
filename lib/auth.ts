import { NextRequest } from 'next/server'
import prisma from './prisma'

// Simple hash using Web Crypto API (no bcrypt dependency needed)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + (process.env.PASSWORD_SALT || 'arteral-salt-2024'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computedHash = await hashPassword(password)
  return computedHash === hash
}

// Generate session token
export function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('')
}

// Get current user from session token cookie
export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get('arteral-session')?.value
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } }).catch(() => {})
    }
    return null
  }

  return session.user
}

// Create session for user
export async function createSession(userId: string): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  await prisma.session.create({
    data: { token, userId, expiresAt }
  })

  return token
}

// Delete session
export async function deleteSession(token: string) {
  await prisma.session.delete({ where: { token } }).catch(() => {})
}
