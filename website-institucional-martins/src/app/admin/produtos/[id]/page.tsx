import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Editar Produto - ${id}` }
}

export default async function AdminEditProdutoPage({ params }: Props) {
  const { id } = await params
  
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xl)' }}>
         Editar Produto {id}
      </h1>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Formulário de Edição</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Aqui ficará o formulário para editar dados, preços, imagens e categorias do produto.</p>
         <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-md)' }}>CONTENT_REQUIRED</span>
      </div>
    </div>
  )
}
