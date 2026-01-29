import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://arteral.com'
  const lastModified = new Date()

  // Static pages
  const staticPages = [
    '',
    '/collection',
    '/studio',
    '/artistes',
    '/livre-or',
    '/philosophie',
  ]

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return staticRoutes
}
