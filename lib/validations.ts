import { z } from 'zod'

// ============================================
// SHARED SCHEMAS
// ============================================

export const emailSchema = z
  .string()
  .email('Email invalide')
  .min(5, 'Email trop court')
  .max(255, 'Email trop long')
  .transform(val => val.toLowerCase().trim())

export const nameSchema = z
  .string()
  .min(2, 'Nom trop court (min 2 caractères)')
  .max(100, 'Nom trop long (max 100 caractères)')
  .transform(val => val.trim())

// ============================================
// DESIGN SCHEMAS
// ============================================

export const createDesignSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  artistName: z.string().max(100).optional(),
  title: z
    .string()
    .min(3, 'Titre trop court (min 3 caractères)')
    .max(200, 'Titre trop long (max 200 caractères)'),
  philosophy: z
    .string()
    .min(10, 'Description trop courte (min 10 caractères)')
    .max(2000, 'Description trop longue (max 2000 caractères)'),
  imageData: z
    .string()
    .min(100, 'Image requise')
    .refine(
      val => val.startsWith('data:image/'),
      'Format d\'image invalide (base64 requis)'
    ),
  garmentType: z.enum(['tshirt', 'pull'], {
    error: 'Type de vêtement invalide'
  }),
  garmentFit: z.enum(['slim', 'regular', 'oversize'], {
    error: 'Coupe invalide'
  }),
  garmentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide (format hex requis)')
})

export const designQuerySchema = z.object({
  page: z.preprocess((val) => (val === null ? undefined : val), z.coerce.number().int().positive().default(1)),
  limit: z.preprocess((val) => (val === null ? undefined : val), z.coerce.number().int().min(1).max(50).default(12)),
  status: z.preprocess((val) => (val === null ? undefined : val), z.enum(['pending', 'approved', 'rejected', 'featured']).optional()),
  sort: z.preprocess((val) => (val === null ? undefined : val), z.enum(['recent', 'popular', 'votes']).default('recent')),
})

export const likeDesignSchema = z.object({
  email: emailSchema
})

export const voteDesignSchema = z.object({
  email: emailSchema,
  type: z.enum(['people', 'heart'], {
    error: 'Type de vote invalide'
  })
})

// ============================================
// GUESTBOOK SCHEMAS
// ============================================

export const createGuestbookSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  message: z
    .string()
    .min(5, 'Message trop court (min 5 caractères)')
    .max(1000, 'Message trop long (max 1000 caractères)')
    .transform(val => val.trim()),
  mood: z.enum(['love', 'inspired', 'thoughtful'], {
    error: 'Mood invalide'
  })
})

export const guestbookQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20)
})

export const likeGuestbookSchema = z.object({
  email: emailSchema
})

// ============================================
// NEWSLETTER SCHEMAS
// ============================================

export const newsletterSubscribeSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  source: z.enum(['homepage', 'footer', 'popup', 'website']).default('website')
})

export const newsletterUnsubscribeSchema = z.object({
  email: emailSchema
})

// ============================================
// CONTEST SCHEMAS
// ============================================

export const contestSubmissionSchema = z.object({
  artistName: nameSchema,
  email: emailSchema,
  instagram: z
    .string()
    .max(50)
    .optional()
    .transform(val => val?.replace('@', '').trim()),
  artworkData: z
    .string()
    .min(100, 'Image requise')
    .refine(
      val => val.startsWith('data:image/'),
      'Format d\'image invalide'
    ),
  description: z
    .string()
    .min(20, 'Description trop courte (min 20 caractères)')
    .max(1000, 'Description trop longue (max 1000 caractères)')
})

// ============================================
// ANALYTICS SCHEMAS
// ============================================

export const pageViewSchema = z.object({
  path: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(),
  sessionId: z.string().min(1).max(100)
})

export const eventSchema = z.object({
  name: z.string().min(1).max(100),
  category: z.string().max(100).optional(),
  label: z.string().max(200).optional(),
  value: z.number().optional(),
  sessionId: z.string().min(1).max(100)
})

// ============================================
// ADMIN SCHEMAS
// ============================================

export const moderateDesignSchema = z.object({
  designId: z.string().min(1),
  action: z.enum(['approve', 'reject', 'feature']),
  adminKey: z.string().min(1)
})

// ============================================
// UTILITY FUNCTIONS
// ============================================

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] }

export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors = result.error.issues.map(err => {
    const path = err.path.join('.')
    return path ? `${path}: ${err.message}` : err.message
  })

  return { success: false, errors }
}

export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}
