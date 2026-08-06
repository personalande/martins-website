import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Blog',
}

export default async function AdminBlogPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
         <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)' }}>
            Blog
         </h1>
         <button style={{ padding: '0.6rem 1.2rem', background: 'var(--martins-blue-700)', color: 'white', borderRadius: 'var(--radius-md)', border: 'none', fontWeight: 'bold' }}>
            + Novo Post
         </button>
      </div>
      
      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Gerenciamento de Conteúdo</h2>
         <p style={{ color: 'var(--martins-steel)' }}>Crie e edite artigos para o blog da Ferragens Martins.</p>
         <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-md)' }}>CONTENT_REQUIRED</span>
      </div>
    </div>
  )
}
