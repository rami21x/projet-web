import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://projet-web-8lni.vercel.app'
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
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1 : 0.8,
  }))

  return staticRoutes
}
