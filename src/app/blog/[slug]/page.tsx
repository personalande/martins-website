import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Real implementation would fetch blog post from DB
  return { title: 'Artigo' }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  
  // Real implementation would fetch blog post from DB
  // For now we just show a placeholder since there's no DB table for blog posts yet
  
  return (
    <main>
      <div className="container" style={{ padding: 'var(--space-3xl) 0' }}>
         <div style={{
            textAlign: 'center',
            padding: 'var(--space-3xl) var(--space-md)',
            background: 'var(--martins-paper)',
            border: '2px dashed var(--martins-border)',
            borderRadius: 'var(--radius-xl)'
         }}>
            <span style={{
               display: 'inline-block',
               background: 'var(--martins-yellow-400)',
               color: 'var(--martins-blue-950)',
               fontSize: '0.75rem',
               fontWeight: 'bold',
               padding: '4px 10px',
               borderRadius: 'var(--radius-sm)',
               letterSpacing: '0.05em'
            }}>CONTENT_REQUIRED</span>
            <h1 style={{marginTop: 'var(--space-md)', color: 'var(--martins-blue-950)', fontFamily: 'var(--font-heading)', fontSize: '2rem'}}>
               Artigo não encontrado
            </h1>
            <p style={{color: 'var(--martins-steel)', maxWidth: '500px', margin: 'var(--space-md) auto'}}>
               O sistema de blog será implementado futuramente.
            </p>
            <Link 
               href="/blog" 
               style={{
                  display: 'inline-block',
                  marginTop: 'var(--space-lg)',
                  padding: '0.7rem 1.5rem',
                  background: 'var(--martins-blue-700)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 'bold',
                  textDecoration: 'none'
               }}
            >
               Voltar para o Blog
            </Link>
         </div>
      </div>
    </main>
  )
}
