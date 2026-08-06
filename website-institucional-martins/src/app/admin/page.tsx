import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default async function AdminDashboardPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xl)' }}>
         Dashboard
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)' }}>
         <DashboardCard title="Orçamentos Pendentes" value="12" />
         <DashboardCard title="Total de Produtos" value="845" />
         <DashboardCard title="Visitas Hoje" value="156" />
      </div>

      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-md)' }}>Últimos Orçamentos</h2>
         <div style={{ padding: 'var(--space-2xl) 0', textAlign: 'center', color: 'var(--martins-steel)' }}>
            Nenhum orçamento recente.
         </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value }: { title: string, value: string }) {
  return (
    <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
       <div style={{ fontSize: '0.85rem', color: 'var(--martins-steel)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 'var(--space-xs)' }}>{title}</div>
       <div style={{ fontSize: '2rem', fontWeight: 'black', color: 'var(--martins-blue-950)' }}>{value}</div>
    </div>
  )
}
