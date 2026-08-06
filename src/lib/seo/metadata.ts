import { Metadata } from 'next'
import { SITE_CONFIG } from '@/config/site'

interface MetadataOptions {
  title?: string
  description?: string
  canonical?: string
  noIndex?: boolean
  ogImage?: string
  type?: 'website' | 'article'
}

/**
 * Generate standardized Metadata object for Next.js 15 pages
 */
export function buildMetadata(options: MetadataOptions = {}): Metadata {
  const {
    title,
    description = SITE_CONFIG.description,
    canonical,
    noIndex = false,
    ogImage = '/brand/og-default.png',
    type = 'website',
  } = options

  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`
  const fullCanonical = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: fullCanonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
    openGraph: {
      title: fullTitle,
      description,
      url: fullCanonical,
      siteName: SITE_CONFIG.name,
      locale: 'pt_BR',
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
