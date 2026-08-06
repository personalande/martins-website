import type { NextConfig } from 'next'

const config: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Prevent indexing of private routes
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/conta/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },

  // Image configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Experimental features
  experimental: {
    typedRoutes: false, // Disable for now to reduce complexity
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/produtos',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/contatos',
        destination: '/contato',
        permanent: true,
      },
    ]
  },

  // Bundle analyzer (install @next/bundle-analyzer separately if needed)
  // webpack: (config) => { ... }

  // PoweredByHeader disabled for security
  poweredByHeader: false,

  // Compress
  compress: true,

  // Generate ETags
  generateEtags: true,

  // React strict mode
  reactStrictMode: true,
}

export default config
