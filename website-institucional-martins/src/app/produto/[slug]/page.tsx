import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { SITE_CONFIG } from '@/config/site'
import { Breadcrumbs } from '@/components/layout'
import type { Product, Category } from '@/types'
import styles from './page.module.css'
import AddToQuoteButton from './add-to-quote-button'

interface Props {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('products')
      .select(`
        id, name, slug, public_code, short_description, unit, price_mode, public_price, featured, is_published,
        brand:brands(name, slug),
        category:categories(name, slug),
        images:product_images(storage_path, alt_text, is_primary),
        variants:product_variants(id, name, public_code, price_mode, in_stock),
        specifications
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    return data as Product | null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Produto não encontrado' }

  const category = product.category as Category | null
  return {
    title: product.name,
    description: product.short_description || `${product.name} — Ferragens Martins, Paranaguá-PR.`,
    openGraph: {
      title: `${product.name} | ${SITE_CONFIG.name}`,
      description: product.short_description || '',
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const category = product.category as Category | null
  const brand = product.brand as { name: string; slug: string } | null

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    ...(category ? [{ label: category.name, href: `/catalogo/${(category as { slug: string }).slug}` }] : []),
    { label: product.name },
  ]

  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de informações sobre o produto: ${product.name}${product.public_code ? ` (Cód. ${product.public_code})` : ''}.`
  )

  // JSON-LD Product schema (without invented prices)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.name,
    sku: product.public_code || undefined,
    brand: brand ? { '@type': 'Brand', name: brand.name } : undefined,
    offers: product.price_mode === 'EXACT' && product.public_price ? {
      '@type': 'Offer',
      price: product.public_price.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStoreOnly',
      seller: { '@type': 'Organization', name: SITE_CONFIG.name },
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/InStoreOnly',
      seller: { '@type': 'Organization', name: SITE_CONFIG.name },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className={styles.page}>
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className={styles.product}>
            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImage} aria-label={`Imagem de ${product.name}`}>
                <div className={styles.imagePlaceholder}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className={styles.info}>
              {(category || brand) && (
                <div className={styles.badges}>
                  {category && <span className={styles.categoryBadge}>{(category as {name:string}).name}</span>}
                  {brand && <span className={styles.brandBadge}>{brand.name}</span>}
                </div>
              )}

              {product.public_code && (
                <p className={styles.code}>Cód. {product.public_code} | Unidade: {product.unit}</p>
              )}
              <h1 className={styles.productName}>{product.name}</h1>

              {/* Price */}
              <div className={styles.priceBlock}>
                {product.price_mode === 'EXACT' && product.public_price ? (
                  <div>
                    <span className={styles.price}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.public_price)}
                    </span>
                    <span className={styles.priceNote}>/{product.unit}</span>
                  </div>
                ) : product.price_mode === 'FROM' && product.public_price ? (
                  <div>
                    <span className={styles.priceFrom}>A partir de </span>
                    <span className={styles.price}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.public_price)}
                    </span>
                  </div>
                ) : (
                  <div className={styles.priceRequest}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Preço sob consulta
                  </div>
                )}
              </div>

              {product.short_description && (
                <p className={styles.shortDesc}>{product.short_description}</p>
              )}

              {/* Actions */}
              <div className={styles.actions}>
                <AddToQuoteButton product={product} />
                <a
                  href={`https://wa.me/${SITE_CONFIG.defaultWhatsapp}?text=${whatsappMsg}`}
                  className={styles.whatsappBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar via WhatsApp
                </a>
              </div>

              {/* Specs */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <details className={styles.specs}>
                  <summary className={styles.specsSummary}>Especificações técnicas</summary>
                  <dl className={styles.specsList}>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className={styles.specItem}>
                        <dt className={styles.specKey}>{key}</dt>
                        <dd className={styles.specVal}>{String(val)}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
