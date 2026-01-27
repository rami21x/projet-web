# CLAUDE.md — AI Assistant Guide for ARTERAL

## Project Overview

ARTERAL is a full-stack philosophical fashion brand website built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **SQLite via Prisma ORM**. It features a design gallery, guestbook, contest system, newsletter, and built-in analytics. Content is bilingual (French/English).

## Tech Stack

- **Framework:** Next.js 16.0.3 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 + CSS custom properties
- **Animation:** Framer Motion
- **Database:** SQLite + Prisma ORM
- **Icons:** Lucide React
- **Themes:** next-themes (light/dark)
- **Fonts:** Playfair Display, Inter, JetBrains Mono (Google Fonts)

## Commands

```bash
npm run dev          # Dev server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint (next core-web-vitals + typescript)

npm run db:migrate   # Run Prisma migrations (dev)
npm run db:push      # Push schema to DB
npm run db:seed      # Seed with sample data
npm run db:studio    # Prisma Studio GUI
npm run db:reset     # Reset database (destructive)
```

## Directory Structure

```
app/                    # Next.js App Router
├── api/                # API routes (REST endpoints)
│   ├── analytics/      # Page view + event tracking
│   ├── contest/        # Contest submissions
│   ├── designs/        # Design CRUD, likes, votes
│   ├── guestbook/      # Guestbook entries + likes
│   ├── newsletter/     # Subscribe/unsubscribe
│   └── stats/          # Aggregated site stats
├── [page-name]/        # Page routes (French slugs)
├── layout.tsx          # Root layout with providers
├── page.tsx            # Homepage
├── globals.css         # Global styles + CSS variables
├── robots.ts           # SEO robots.txt
└── sitemap.ts          # SEO sitemap

components/             # Reusable React components
hooks/                  # Custom hooks (useApi, useContent)
contexts/               # React contexts (LanguageContext)
lib/                    # Utilities (prisma client, metadata)
data/                   # Localization content (content.js, content-fr.js)
prisma/                 # Schema, migrations, seed script
public/                 # Static assets and images
```

## Key Architecture Decisions

- **Page routes use French slugs:** `/galerie`, `/livre-or`, `/manifeste`, `/marque`, `/processus`, `/artistes`, `/collection`, `/contact`, `/studio`
- **API routes** are REST-style under `app/api/`. All return JSON.
- **Rate limiting:** 100 requests/minute per IP, enforced in `middleware.ts`
- **Security headers** (CSP, HSTS, X-Frame-Options) set in `middleware.ts`
- **Prisma singleton** in `lib/prisma.ts` prevents connection exhaustion in dev
- **Path alias:** `@/*` maps to project root

## Database

- **Provider:** SQLite (`prisma/dev.db`)
- **ORM:** Prisma 5.22
- **11 models:** User, Design, Like, Comment, Vote, GuestbookEntry, NewsletterSubscriber, ContestSubmission, PageView, Event, SiteStats
- **Design statuses:** pending, approved, rejected, featured
- **Guestbook moods:** love, inspired, thoughtful
- After schema changes: run `npm run db:migrate` then `npm run db:seed`

## Conventions

- **No test framework** is configured. No test files exist.
- **No Prettier** configured. Formatting relies on ESLint only.
- **ESLint:** Flat config (`eslint.config.mjs`) extending next/core-web-vitals and next/typescript
- **Components** are in `components/` as single `.tsx` files (no barrel exports)
- **Hooks** are in `hooks/` — `useApi.ts` contains all API interaction hooks, `useContent.ts` handles i18n
- **Content/i18n:** `data/content.js` (EN) and `data/content-fr.js` (FR), consumed via `useContent` hook and `LanguageContext`
- **Brand colors:** Primary `#8B0000` (deep red), Dark `#2B2B2B`, Light `#E8E8E8`, Accent `#A0522D`

## Common Patterns

**API route pattern** (e.g., `app/api/designs/route.ts`):
- Export named `GET`/`POST`/`PUT`/`DELETE` async functions
- Use `NextRequest`/`NextResponse` from `next/server`
- Access Prisma via `import { prisma } from "@/lib/prisma"`

**Page pattern** (e.g., `app/galerie/page.tsx`):
- `"use client"` directive for interactive pages
- Use `useApi` hooks for data fetching
- Use `useContent` for localized strings
- Animate with Framer Motion `<motion.div>`

**Adding a new API endpoint:**
1. Create `app/api/<name>/route.ts`
2. Export HTTP method handlers
3. Use Prisma for DB access

**Adding a new page:**
1. Create `app/<slug>/page.tsx`
2. Add to navigation in `components/Navigation.tsx`
3. Add metadata in the page file or `lib/metadata.ts`
4. Add sitemap entry in `app/sitemap.ts`
