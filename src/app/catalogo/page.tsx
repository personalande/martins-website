'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { SITE_CONFIG } from '@/config/site'
import type { Product, Category, FilterState } from '@/types'
import styles from './page.module.css'

interface CatalogResponse {
  data: Product[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

function CatalogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState({ page: 1, pageSize: 24, total: 0, totalPages: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const currentFilters: FilterState = {
    searchQuery: searchParams.get('q') || '',
    categorySlug: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
  }
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (currentFilters.searchQuery) params.set('q', currentFilters.searchQuery)
      if (currentFilters.categorySlug) params.set('category', currentFilters.categorySlug)
      if (currentFilters.minPrice) params.set('minPrice', String(currentFilters.minPrice))
      if (currentFilters.maxPrice) params.set('maxPrice', String(currentFilters.maxPrice))
      params.set('page', String(currentPage))

      const res = await fetch(`/api/catalog/search?${params}`)
      if (!res.ok) throw new Error('Falha ao buscar produtos')
      const json: CatalogResponse = await res.json()
      setProducts(json.data)
      setPagination(json.pagination)
    } catch {
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [currentFilters.searchQuery, currentFilters.categorySlug, currentFilters.minPrice, currentFilters.maxPrice, currentPage])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`/catalogo?${params}`)
  }

  function clearFilters() {
    router.push('/catalogo')
  }

  const hasActiveFilters = !!(currentFilters.searchQuery || currentFilters.categorySlug || currentFilters.minPrice || currentFilters.maxPrice)

  return (
    <>
      {/* Hero Bar */}
      <div className={styles.heroBar}>
        <div className="container">
          <h1 className={styles.heroTitle}>Catálogo</h1>
          <form
            className={styles.searchForm}
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              updateFilter('q', fd.get('q') as string)
            }}
          >
            <input
              type="search"
              name="q"
              defaultValue={currentFilters.searchQuery}
              placeholder="Buscar produto, código ou categoria..."
              className={styles.searchInput}
              aria-label="Buscar produtos"
            />
            <button type="submit" className={styles.searchBtn} aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar Filters — desktop */}
          <aside className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`} aria-label="Filtros">
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>Filtrar</span>
              <button className={styles.sidebarClose} onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Category filter */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterLabel}>Categoria</h3>
              <ul className={styles.filterList} role="list">
                <li>
                  <button
                    className={`${styles.filterItem} ${!currentFilters.categorySlug ? styles.filterItemActive : ''}`}
                    onClick={() => updateFilter('category', '')}
                  >
                    Todas as categorias
                  </button>
                </li>
                {SITE_CONFIG.categories.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      className={`${styles.filterItem} ${currentFilters.categorySlug === cat.slug ? styles.filterItemActive : ''}`}
                      onClick={() => updateFilter('category', cat.slug)}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {hasActiveFilters && (
              <button className={styles.clearFilters} onClick={clearFilters}>
                Limpar filtros
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <main className={styles.main}>
            {/* Mobile filter toggle */}
            <div className={styles.mobileControls}>
              <button className={styles.filterToggle} onClick={() => setFiltersOpen(true)} aria-expanded={filtersOpen} aria-controls="sidebar-filters">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
                Filtros {hasActiveFilters && <span className={styles.filterBadge}>!</span>}
              </button>
              <span className={styles.resultCount}>
                {isLoading ? '...' : `${pagination.total} produto${pagination.total !== 1 ? 's' : ''}`}
              </span>
            </div>

            {isLoading ? (
              <ul className={styles.productsGrid} role="list" aria-label="Carregando produtos">
                {Array.from({ length: 12 }).map((_, i) => (
                  <li key={i} className={styles.skeleton} aria-hidden="true" />
                ))}
              </ul>
            ) : products.length === 0 ? (
              <div className={styles.empty}>
                <h2 className={styles.emptyTitle}>Nenhum produto encontrado</h2>
                <p className={styles.emptyDesc}>Tente outros termos ou remova os filtros aplicados.</p>
                {hasActiveFilters && (
                  <button className={styles.ctaSecondary} onClick={clearFilters}>Limpar filtros</button>
                )}
              </div>
            ) : (
              <ul className={styles.productsGrid} role="list">
                {products.map((product) => (
                  <li key={product.id}>
                    <Link href={`/produto/${product.slug}`} className={styles.productCard}>
                      <div className={styles.productImage} aria-hidden="true" />
                      {product.featured && <span className={styles.featuredBadge}>Destaque</span>}
                      {product.category && (
                        <span className={styles.categoryBadge}>{(product.category as Category).name}</span>
                      )}
                      <div className={styles.productBody}>
                        {product.public_code && (
                          <span className={styles.productCode}>Cód. {product.public_code}</span>
                        )}
                        <h2 className={styles.productName}>{product.name}</h2>
                        {product.short_description && (
                          <p className={styles.productDesc}>{product.short_description}</p>
                        )}
                        <div className={styles.productFooter}>
                          {product.price_mode === 'EXACT' && product.public_price ? (
                            <span className={styles.productPrice}>
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.public_price)}
                            </span>
                          ) : product.price_mode === 'FROM' && product.public_price ? (
                            <span className={styles.productPrice}>
                              A partir de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.public_price)}
                            </span>
                          ) : (
                            <span className={styles.priceOnRequest}>Consulte-nos</span>
                          )}
                          <span className={styles.productCta}>Ver produto →</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Pagination */}
            {!isLoading && pagination.totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Navegação de páginas">
                {currentPage > 1 && (
                  <button className={styles.pageBtn} onClick={() => updateFilter('page', String(currentPage - 1))}>
                    ← Anterior
                  </button>
                )}
                <span className={styles.pageInfo}>
                  Página {currentPage} de {pagination.totalPages}
                </span>
                {currentPage < pagination.totalPages && (
                  <button className={styles.pageBtn} onClick={() => updateFilter('page', String(currentPage + 1))}>
                    Próxima →
                  </button>
                )}
              </nav>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--martins-steel)' }}>Carregando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
