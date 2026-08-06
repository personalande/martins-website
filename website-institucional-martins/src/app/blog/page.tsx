import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Dicas de obra, manutenção, hidráulica, elétrica e novidades da Ferragens Martins.',
}

export default function BlogPage() {
  return (
    <main>
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Blog Ferragens Martins</h1>
          <p className={styles.subtitle}>Dicas, guias e novidades para a sua obra ou manutenção</p>
        </div>
      </div>
      
      <div className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className={styles.emptyState}>
          <span className={styles.emptyLabel}>CONTENT_REQUIRED</span>
          <h2 style={{marginTop: 'var(--space-md)', color: 'var(--martins-blue-950)'}}>Blog em construção</h2>
          <p style={{color: 'var(--martins-steel)', maxWidth: '500px', margin: 'var(--space-md) auto'}}>
            Os artigos serão gerenciados pelo painel de administração. 
            No momento não há artigos publicados.
          </p>
          <Link href="/" className={styles.btn}>Voltar para o Início</Link>
        </div>
      </div>
    </main>
  )
}
