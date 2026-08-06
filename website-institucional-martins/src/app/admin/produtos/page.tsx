import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin - Produtos',
}

export default async function AdminProdutosPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
         <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)' }}>
            Produtos
         </h1>
         <button style={{ padding: '0.6rem 1.2rem', background: 'var(--martins-blue-700)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 'bold' }}>
            + Novo Produto
         </button>
      </div>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Gerenciamento de Produtos</h2>
         <p style={{ color: 'var(--martins-steel)', marginBottom: 'var(--space-lg)' }}>Listagem e edição de produtos será implementada nesta página.</p>
         <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)' }}>CONTENT_REQUIRED</span>
      </div>
    </div>
  )
}
