import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Categorias',
}

export default async function AdminCategoriasPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
         <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)' }}>
            Categorias
         </h1>
         <button style={{ padding: '0.6rem 1.2rem', background: 'var(--martins-blue-700)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 'bold' }}>
            + Nova Categoria
         </button>
      </div>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Gerenciamento de Categorias</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Área para gerenciar categorias do catálogo e banners.</p>
      </div>
    </div>
  )
}
