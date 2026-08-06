import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Visualizar Orçamento - ${id}` }
}

export default async function AdminViewOrcamentoPage({ params }: Props) {
  const { id } = await params
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
         <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)' }}>
            Orçamento {id}
         </h1>
         <button style={{ padding: '0.6rem 1.2rem', background: 'var(--martins-success)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 'bold' }}>
            Marcar como Respondido
         </button>
      </div>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Detalhes do Orçamento</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Aqui ficarão os itens solicitados, dados do cliente e ações gerenciais (gerar PDF, etc).</p>
         <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-md)' }}>CONTENT_REQUIRED</span>
      </div>
    </div>
  )
}
