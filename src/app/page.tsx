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

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  hammer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15 22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 13-8 13S4 15.25 4 10a8 8 0 0 1 8-8z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  'paint-brush': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z" />
      <path d="M9 8c-2 3-4 3.5-7 4l8 8c1-.5 3.5-2 4-7" />
      <path d="M14.5 17.5 4.5 15" />
    </svg>
  ),
  disc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  'user-check': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
}

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
