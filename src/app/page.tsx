import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { SITE_CONFIG } from '@/config/site'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Ferragens Martins | Ferragens, Ferramentas e Materiais em Paranaguá-PR',
  description:
    'Ferragens, ferramentas, hidráulica, elétrica, fixação, pintura e materiais para construção em Paranaguá-PR. Duas lojas. Atendimento especializado. Orçamento pelo WhatsApp.',
  keywords: ['ferragens', 'ferramentas', 'hidráulica', 'elétrica', 'Paranaguá', 'PR', 'construção', 'materiais'],
  openGraph: {
    title: 'Ferragens Martins — Da base ao acabamento, a obra não pode parar.',
    description: 'Ferragens e materiais em Paranaguá-PR. Duas lojas. Atendimento especializado.',
    type: 'website',
    locale: 'pt_BR',
  },
}

import { 
  Wrench, 
  Hammer, 
  MapPin, 
  Droplet, 
  Zap, 
  Paintbrush, 
  Disc, 
  Shield, 
  Key, 
  Home, 
  Package, 
  HardHat, 
  Trees, 
  Sun 
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  wrench: <Wrench size={40} strokeWidth={1.5} />,
  hammer: <Hammer size={40} strokeWidth={1.5} />,
  pin: <MapPin size={40} strokeWidth={1.5} />,
  droplet: <Droplet size={40} strokeWidth={1.5} />,
  zap: <Zap size={40} strokeWidth={1.5} />,
  'paint-brush': <Paintbrush size={40} strokeWidth={1.5} />,
  disc: <Disc size={40} strokeWidth={1.5} />,
  shield: <Shield size={40} strokeWidth={1.5} />,
  key: <Key size={40} strokeWidth={1.5} />,
  home: <Home size={40} strokeWidth={1.5} />,
  box: <Package size={40} strokeWidth={1.5} />,
  'user-check': <HardHat size={40} strokeWidth={1.5} />,
  layers: <Trees size={40} strokeWidth={1.5} />,
  sun: <Sun size={40} strokeWidth={1.5} />,
};

async function getFeaturedProducts() {
  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('products')
      .select('id, name, slug, short_description, price_mode, public_price, category:categories(name,slug), images:product_images(storage_path, alt_text, is_primary)')
      .eq('is_published', true)
      .eq('featured', true)
      .limit(8)
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const [store1, store2] = SITE_CONFIG.stores

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Apresentação">
        <div className={styles.heroDecor} aria-hidden="true" />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroEyebrow}>Paranaguá · PR · Desde sempre</span>
          <h1 className={styles.heroHeading}>
            Da base ao acabamento,<br />
            <span className={styles.heroHighlight}>a obra não pode parar.</span>
          </h1>
          <p className={styles.heroSub}>
            Ferragens, ferramentas, hidráulica, elétrica, fixação, pintura e materiais para construção.
            Atendimento especializado em duas lojas em Paranaguá.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/catalogo" className={styles.ctaPrimary}>
              Ver Catálogo
            </Link>
            <Link href="/contato" className={styles.ctaSecondary}>
              Solicitar Orçamento
            </Link>
          </div>
          <div className={styles.heroHours}>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Seg–Sex 08h–18h &nbsp;|&nbsp; Sáb 08h–12h
            </span>
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ───────────────────────────────────────────── */}
      <section className={styles.categories} aria-label="Nossas categorias">
        <div className="container">
          <h2 className={styles.sectionTitle}>Nossas Categorias</h2>
          <p className={styles.sectionSub}>Tudo que você precisa para sua obra ou manutenção</p>
          <ul className={styles.categoryGrid} role="list">
            {SITE_CONFIG.categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/catalogo/${cat.slug}`} className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>
                    {CATEGORY_ICONS[cat.icon] ?? CATEGORY_ICONS['box']}
                  </span>
                  <span className={styles.categoryName}>{cat.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className={styles.howItWorks} aria-label="Como solicitar orçamento">
        <div className="container">
          <h2 className={styles.sectionTitle}>3 Passos para o seu Orçamento</h2>
          <ol className={styles.steps} role="list">
            <li className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">01</span>
              <div>
                <h3 className={styles.stepTitle}>Navegue pelo Catálogo</h3>
                <p className={styles.stepDesc}>Explore nossas categorias e encontre os produtos que precisa para sua obra ou manutenção.</p>
              </div>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">02</span>
              <div>
                <h3 className={styles.stepTitle}>Monte seu Orçamento</h3>
                <p className={styles.stepDesc}>Adicione os itens ao orçamento, informe quantidades e deixe observações se necessário.</p>
              </div>
            </li>
            <li className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">03</span>
              <div>
                <h3 className={styles.stepTitle}>Receba pelo WhatsApp</h3>
                <p className={styles.stepDesc}>Envie o orçamento diretamente pelo WhatsApp e nossa equipe retorna com valores e disponibilidade.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className={styles.featured} aria-label="Produtos em destaque">
          <div className="container">
            <h2 className={styles.sectionTitle}>Destaques</h2>
            <ul className={styles.productsGrid} role="list">
              {featuredProducts.map((product) => (
                <li key={product.id}>
                  <Link href={`/produto/${product.slug}`} className={styles.productCard}>
                    <div className={styles.productImagePlaceholder} aria-hidden="true" />
                    {product.category && (
                      <span className={styles.productCategoryBadge}>{(product.category as { name: string }).name}</span>
                    )}
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      {product.short_description && (
                        <p className={styles.productDesc}>{product.short_description}</p>
                      )}
                      <span className={styles.productLink}>Ver produto →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.featuredCta}>
              <Link href="/catalogo" className={styles.ctaPrimary}>Ver catálogo completo</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── NOSSAS LOJAS ─────────────────────────────────────────── */}
      <section className={styles.stores} aria-label="Nossas lojas">
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>Nossas Lojas</h2>
          <p className={`${styles.sectionSub} ${styles.sectionSubLight}`}>Duas unidades para melhor atender Paranaguá e região</p>
          <div className={styles.storesGrid}>
            {[store1, store2].map((store) => (
              <div key={store.id} className={styles.storeCard}>
                <div className={styles.storeNumber}>{store.shortName.split(' — ')[0]}</div>
                <h3 className={styles.storeName}>{store.shortName.split(' — ')[1]}</h3>
                <address className={styles.storeAddress}>
                  {store.addressLine}<br />
                  {store.neighborhood} · {store.city}-{store.state}<br />
                  CEP {store.postalCode}
                </address>
                <div className={styles.storeHours}>
                  <div>{store.hours.weekday}</div>
                  <div>{store.hours.saturday}</div>
                  <div className={styles.storeClosed}>{store.hours.sunday}</div>
                </div>
                <div className={styles.storeActions}>
                  <a
                    href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de falar com a equipe da ' + store.shortName + '.')}`}
                    className={styles.whatsappBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp da ${store.shortName}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href={store.googleMapsUrl}
                    className={styles.mapsBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${store.shortName} no Google Maps`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 13-8 13S4 15.25 4 10a8 8 0 0 1 8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                    Como chegar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────────────────────────── */}
      <section className={styles.whatsappBanner} aria-label="Contato pelo WhatsApp">
        <div className="container">
          <div className={styles.whatsappBannerInner}>
            <div>
              <h2 className={styles.whatsappBannerTitle}>Precisa de ajuda para escolher?</h2>
              <p className={styles.whatsappBannerSub}>Nossa equipe está pronta para orientar você na escolha certa para sua obra.</p>
            </div>
            <a
              href={`https://wa.me/${SITE_CONFIG.defaultWhatsapp}?text=${encodeURIComponent('Olá! Preciso de ajuda para escolher produtos.')}`}
              className={styles.whatsappBannerBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
