# CLAUDE.md — Arteral Project Guide

## Project Overview

Arteral is a philosophical fashion brand website built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, and **Prisma + PostgreSQL**. It features a design studio, artist gallery, guestbook, newsletter, contest system, and analytics — all with bilingual (FR/EN) support and a museum-inspired visual identity.

## Quick Reference

```bash
npm run dev           # Start dev server (Turbopack)
npm run build         # Production build
npm run lint          # ESLint
npm run db:migrate    # Prisma migration (dev)
npm run db:push       # Push schema to database
npm run db:seed       # Seed database
npm run db:studio     # Open Prisma Studio
npm run db:reset      # Reset database (destructive)
```

**No test framework is configured.** There are no unit/integration tests. Validate changes with `npm run build` and `npm run lint`.

## Tech Stack

| Layer        | Technology                                   |
|------------- |----------------------------------------------|
| Framework    | Next.js 16.1.6 (App Router, React 19)       |
| Language     | TypeScript 5 (strict mode)                   |
| Styling      | Tailwind CSS 4, Framer Motion                |
| Database     | PostgreSQL (Neon serverless) via Prisma 5     |
| Validation   | Zod 4                                        |
| Email        | Resend                                       |
| Icons        | lucide-react                                 |
| Themes       | next-themes (dark mode)                      |

## Directory Structure

```
app/                    # Next.js App Router — pages and API routes
  api/                  # REST API endpoints (auth, designs, guestbook, etc.)
  admin/                # Admin panel page
  artistes/             # Artist gallery page
  collection/           # Product collection page
  connexion/            # Login/signup page
  contact/              # Contact & newsletter page
  dashboard/            # User dashboard page
  livre-or/             # Guestbook page
  manifeste/            # Brand manifesto page
  marque/               # Brand philosophy page
  processus/            # Creative process page
  studio/               # Design submission page (artist-only)
  layout.tsx            # Root layout (providers, nav, footer)
  page.tsx              # Homepage
  globals.css           # Global styles + Tailwind theme
components/             # Reusable React components (19 files)
contexts/               # React Context providers (AuthContext, LanguageContext)
hooks/                  # Custom hooks (useApi, useContent)
lib/                    # Server utilities (auth, prisma, validations, rate-limit, email, error-handler)
prisma/                 # Database schema, migrations, seed
data/                   # Content data files (FR + EN translations)
public/                 # Static assets (images, videos, audio)
docs/                   # Additional documentation
```

## Architecture & Patterns

### Server vs Client Components

- **Server Components** (default): Pages and layouts that fetch data directly via Prisma. No `"use client"` directive.
- **Client Components**: Prefixed with `"use client"`. Used for interactivity (forms, animations, context consumers). Located mostly in `components/`.

### Provider Hierarchy (in `app/layout.tsx`)

```
ThemeProviders → LanguageProvider → AuthProvider → [page content]
```

Global wrappers: `CustomCursor`, `MuseumSpotlight`, `PhilosophicalEasterEggs`, `AmbientMusic`, `Navigation`, `Footer`, `CookieConsent`.

### API Route Pattern

All API routes follow this structure:

```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting via checkRateLimit()
    // 2. Parse & validate body with Zod schemas from lib/validations.ts
    // 3. Business logic with Prisma
    // 4. Return NextResponse.json() with appropriate status
  } catch (error) {
    return handleApiError(error, { path, method })
  }
}
```

- Rate limiting: In-memory store (`lib/rate-limit.ts`), IP-based
- Validation: Zod schemas in `lib/validations.ts`, used via `validate()` or `validateOrThrow()`
- Error handling: Centralized in `lib/error-handler.ts` with custom error classes
- Auth: Cookie-based sessions (`arteral-session`), validated via `lib/auth.ts`

### State Management

- **AuthContext** (`contexts/AuthContext.tsx`): User session, login/register/logout
- **LanguageContext** (`contexts/LanguageContext.tsx`): FR/EN toggle
- **next-themes**: Dark mode persistence
- **No external state library** — uses React Context + local state only

### Data Fetching

- Server-side: Direct Prisma queries in Server Components and API routes
- Client-side: Custom hooks in `hooks/useApi.ts` wrapping `fetch()` calls
- No SWR, React Query, or similar libraries

### Internationalization

- Content files: `data/content.js` (EN) and `data/content-fr.js` (FR)
- Language selection via `hooks/useContent.ts` which reads `LanguageContext`
- Validation error messages are in French

## Database

### Schema (`prisma/schema.prisma`)

Key models: `User`, `Session`, `Design`, `Like`, `Comment`, `Vote`, `GuestbookEntry`, `NewsletterSubscriber`, `ContestSubmission`, `PageView`, `Event`, `SiteStats`.

- All IDs use CUID format (`@default(cuid())`)
- Timestamps: `createdAt` / `updatedAt` convention
- User roles: `visitor`, `artist`, `client`
- Design statuses: `pending`, `approved`, `rejected`, `featured`
- Cascade deletes on all foreign key relations

### Database Commands

```bash
npm run db:migrate    # Create and apply migration
npm run db:push       # Push schema without migration (dev shortcut)
npm run db:seed       # Seed with initial data (npx tsx prisma/seed.ts)
npm run db:reset      # Drop all data and re-migrate (destructive!)
```

After schema changes, run `npx prisma generate` to update the client.

## Environment Variables

Required in `.env.local`:

```
DATABASE_URL="postgresql://..."     # PostgreSQL connection string (Neon)
RESEND_API_KEY="re_..."             # Email API key
```

Optional:

```
FROM_EMAIL="ARTERAL <noreply@arteral.com>"
PASSWORD_SALT="custom-salt"          # Fallback: 'arteral-salt-2024'
```

Never commit `.env` files. Use `.env.example` as reference.

## Styling Conventions

### Color Palette (CSS custom properties in `globals.css`)

```
--primary: #8B0000   (deep red — passion)
--dark: #2B2B2B      (charcoal — depth)
--light: #E8E8E8     (beige/white — clarity)
--accent: #A0522D    (brown/gold — transformation)
```

Dark mode inverts these via `.dark` class.

### Typography

- **Display**: Playfair Display (serif) — `font-display` / `--font-display`
- **Body**: Inter (sans-serif) — `font-body` / `--font-body`
- **Mono**: JetBrains Mono — `font-mono` / `--font-mono`

### Approach

- Tailwind utility classes for layout and styling
- Custom CSS effects in `globals.css` (glitch, scanlines, custom cursor)
- Framer Motion for animations (fade-in, parallax, scroll reveal)
- Mobile-first responsive design (sm/md/lg breakpoints)

## Code Conventions

### File Naming

- **Components**: PascalCase (`Navigation.tsx`, `FadeIn.tsx`)
- **Hooks**: camelCase with `use` prefix (`useApi.ts`, `useContent.ts`)
- **Lib utilities**: camelCase with hyphens (`rate-limit.ts`, `error-handler.ts`)
- **Pages**: lowercase directories (`/collection`, `/livre-or`)

### Import Order (in components)

```typescript
"use client"                          // Client directive first

import { useState } from "react"     // 1. React/Next.js
import Link from "next/link"
import { motion } from "framer-motion" // 2. Third-party
import { Menu } from "lucide-react"
import { useContent } from "@/hooks/useContent" // 3. Local (via @ alias)
```

### Path Alias

`@/*` maps to project root. Use `@/components/...`, `@/lib/...`, `@/hooks/...`, etc.

### API Response Format

```json
{
  "success": true,
  "data": {},
  "pagination": { "page": 1, "limit": 12, "total": 50, "totalPages": 5 }
}
```

Error responses:

```json
{
  "error": "Description",
  "code": "ERROR_CODE",
  "details": ["field: message"],
  "timestamp": "ISO string"
}
```

## Security

- **Input validation**: Zod on all API inputs (server-side)
- **Rate limiting**: Per-endpoint configs in `lib/rate-limit.ts`
- **Auth**: HTTP-only cookies, SHA-256 hashed passwords, 30-day sessions
- **Headers**: CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- **SQL injection prevention**: Prisma parameterized queries
- **CORS**: Configured for API routes in `next.config.ts`

## Build & Deploy

- **Target**: Vercel (Next.js optimized)
- `typescript.ignoreBuildErrors: true` in `next.config.ts` — TypeScript errors won't block builds
- No CI/CD pipeline configured; deployment is via git push to Vercel
- Large files (videos: mp4/webm/mov, design files: psd/ai/sketch) are gitignored

## Key Things to Know

1. **No test suite exists.** Use `npm run build` and `npm run lint` to verify changes.
2. **French is the primary language.** UI strings, validation messages, and page routes use French names (`/connexion`, `/livre-or`, `/artistes`).
3. **The Studio page is restricted** to authenticated users with the `artist` role.
4. **Images are stored as base64** in the database (via `imageData` field), not uploaded to a file store.
5. **Rate limiting is in-memory** — it resets on server restart and doesn't persist across instances.
6. **Email is optional** — the app degrades gracefully if `RESEND_API_KEY` is not set.
7. **Content data files** (`data/content.js`, `data/content-fr.js`) are plain JS exports, not JSON.
