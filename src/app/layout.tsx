import type { Metadata, Viewport } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import '@/styles/globals.css'
import { UtilityBar } from '@/components/layout'
import { SiteHeader } from '@/components/layout'
import { SiteFooter } from '@/components/layout'
import { MobileActionBar } from '@/components/layout'
import { QuoteProvider } from '@/context/QuoteContext'
import { SITE_CONFIG } from '@/config/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Ferragens e Materiais em Paranaguá-PR`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['ferragens', 'ferramentas', 'hidráulica', 'elétrica', 'Paranaguá', 'PR', 'orçamento'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#062A56',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>
        <QuoteProvider>
          <UtilityBar />
          <SiteHeader />
          <div id="main-content">
            {children}
          </div>
          <SiteFooter />
          <MobileActionBar />
        </QuoteProvider>
      </body>
    </html>
  )
}
