import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Avaliações',
}

export default async function AdminAvaliacoesPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xl)' }}>
         Avaliações de Clientes
      </h1>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Moderação de Avaliações</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Aprove ou rejeite comentários e avaliações de produtos (Funcionalidade futura).</p>
      </div>
    </div>
  )
}
