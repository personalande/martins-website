import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Lojas',
}

export default async function AdminLojasPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xl)' }}>
         Lojas Físicas
      </h1>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Gerenciamento de Lojas</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Atualize endereços, horários e fotos das lojas físicas.</p>
         <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-md)' }}>CONTENT_REQUIRED</span>
      </div>
    </div>
  )
}
