import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Usuários',
}

export default async function AdminUsuariosPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xl)' }}>
         Controle de Usuários
      </h1>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Gerenciamento de Acesso</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Gerencie clientes e administradores do sistema.</p>
      </div>
    </div>
  )
}
