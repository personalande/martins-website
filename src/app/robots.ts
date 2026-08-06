import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/conta/',
          '/api/',
          '/entrar',
          '/cadastro',
          '/recuperar-senha',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
