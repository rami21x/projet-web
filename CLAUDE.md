# CLAUDE.md — AI Assistant Guide for Arteral

## Project Overview

**Arteral** is a full-stack web application for a philosophical fashion brand ("Philosophical Fashion, Embodied Art"). Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS 4**, and **SQLite** via **Prisma ORM**. The site is bilingual (French/English).

## Quick Commands

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run lint          # ESLint check
npm run db:push       # Push Prisma schema to DB
npm run db:seed       # Seed database with sample data
npm run db:studio     # Open Prisma Studio GUI
npm run db:migrate    # Run interactive migrations
npm run db:reset      # Reset database (destructive)
```

## Architecture

```
app/                  # Next.js App Router (pages + API routes)
├── api/              # REST API endpoints (designs, guestbook, newsletter, stats, analytics, contest)
├── page.tsx          # Home page
├── layout.tsx        # Root layout (fonts, providers, navigation, footer)
├── globals.css       # Tailwind import + CSS custom properties
├── [route]/page.tsx  # Each page in its own directory
components/           # Reusable React components (PascalCase .tsx files)
contexts/             # React Context providers (LanguageContext)
data/                 # Content/copy files (content.js = EN, content-fr.js = FR)
hooks/                # Custom React hooks
lib/                  # Utilities (prisma.ts, metadata.ts)
prisma/               # Schema, migrations, seed.ts
public/               # Static assets
middleware.ts         # Security headers, rate limiting (100 req/min), CORS
```

## Key Conventions

### Code Style
- **TypeScript strict mode** — do not weaken type checks
- **Components**: PascalCase filenames, functional components with hooks
- **Routes**: kebab-case directories with `page.tsx` (e.g., `app/livre-or/page.tsx`)
- **Client components**: must have `"use client"` directive at top
- **API routes**: named exports (`GET`, `POST`, `DELETE`), return `NextResponse.json()`
- **Styling**: Tailwind CSS utility classes, CSS variables for theme colors, mobile-first responsive
- **No test suite exists** — be cautious with refactors

### Database (Prisma + SQLite)
- Schema at `prisma/schema.prisma` with 12 models (User, Design, Like, Comment, Vote, GuestbookEntry, NewsletterSubscriber, ContestSubmission, PageView, Event, SiteStats)
- Access via singleton at `@/lib/prisma`
- After schema changes: run `npm run db:push` or create a migration
- SQLite limitation: use `createMany` carefully (supported since Prisma 5)

### Content & i18n
- All display text lives in `data/content.js` (EN) and `data/content-fr.js` (FR)
- Language state managed via `LanguageContext` in `contexts/`
- When adding user-facing text, add it to **both** content files

### API Patterns
- All API routes are in `app/api/[resource]/route.ts`
- Consistent try/catch error handling
- Input validation before DB operations
- Paginated responses where applicable (designs, guestbook)

### SEO
- Centralized metadata config in `lib/metadata.ts` with `generatePageMetadata()`
- JSON-LD structured data via `components/JsonLd.tsx`
- Dynamic sitemap at `app/sitemap.ts`, robots at `app/robots.ts`

### Theme & Design System
- Colors defined as CSS custom properties in `globals.css`:
  - `--primary: #8B0000` (deep red), `--dark: #2B2B2B`, `--light: #E8E8E8`, `--accent: #A0522D`
- Dark mode via `next-themes` with `.dark` class variants
- Fonts: Playfair Display (headings), Inter (body), JetBrains Mono (quotes)
- Animations: Framer Motion (`framer-motion`)

## Dependencies Worth Noting

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.0.3 | Framework |
| react | 19.2.0 | UI library |
| @prisma/client | 5.22.0 | Database ORM |
| framer-motion | 12.23.24 | Animations |
| lucide-react | 0.554.0 | Icons |
| next-themes | 0.4.6 | Dark mode |

## Common Tasks

**Add a new page**: Create `app/[route]/page.tsx`, add metadata via `generatePageMetadata()`, add navigation link in `components/Navigation.tsx`, add content to both `data/content.js` and `data/content-fr.js`.

**Add a new API route**: Create `app/api/[resource]/route.ts` with named handler exports. Use `prisma` from `@/lib/prisma`. Validate inputs, wrap in try/catch, return `NextResponse.json()`.

**Add a new DB model**: Update `prisma/schema.prisma`, run `npm run db:push`, update seed if needed.

**Modify styles**: Use Tailwind utilities. For theme colors, reference CSS variables. Support both light and dark modes.
