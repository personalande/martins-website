import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/config/site'
import styles from '../page.module.css'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import type { Product } from '@/types'

interface Props {
  params: Promise<{ categoria: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const categoryConfig = SITE_CONFIG.categories.find(c => c.slug === categoria)
  if (!categoryConfig) return { title: 'Categoria não encontrada' }

  return {
    title: `${categoryConfig.name} | Catálogo`,
    description: `Encontre os melhores produtos da categoria ${categoryConfig.name} na Ferragens Martins.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { categoria } = await params
  const categoryConfig = SITE_CONFIG.categories.find(c => c.slug === categoria)
  if (!categoryConfig) notFound()

  // In a real app we'd fetch this from the DB directly instead of using the search route
  // but for simplicity we'll just show a nice page linking to the catalog with filter applied
  
  return (
    <main>
      <div className={styles.heroBar}>
        <div className="container">
          <h1 className={styles.heroTitle}>{categoryConfig.name}</h1>
          <p style={{color:'rgba(255,255,255,0.7)', fontSize:'1.1rem'}}>Explorando nossa categoria de {categoryConfig.name.toLowerCase()}</p>
        </div>
      </div>
      
      <div className="container" style={{padding: 'var(--space-3xl) 0', textAlign: 'center'}}>
         <h2 style={{fontSize: '1.5rem', marginBottom: 'var(--space-md)', color: 'var(--martins-blue-950)'}}>
            Navegue pelos produtos desta categoria
         </h2>
         <p style={{color: 'var(--martins-steel)', marginBottom: 'var(--space-xl)'}}>
            Temos dezenas de itens para você escolher e solicitar orçamento.
         </p>
         <Link 
            href={`/catalogo?category=${categoria}`}
            style={{
               display: 'inline-block',
               padding: '0.8rem 1.6rem',
               background: 'var(--martins-blue-700)',
               color: 'white',
               borderRadius: 'var(--radius-md)',
               textDecoration: 'none',
               fontWeight: 'bold',
               textTransform: 'uppercase'
            }}
         >
            Ver todos os produtos
         </Link>
      </div>
    </main>
  )
}
