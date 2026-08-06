import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Orçamentos',
}

export default async function AdminOrcamentosPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xl)' }}>
         Gerenciar Orçamentos
      </h1>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Caixa de Entrada de Orçamentos</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Visualize e responda às solicitações de orçamento dos clientes.</p>
      </div>
    </div>
  )
}
