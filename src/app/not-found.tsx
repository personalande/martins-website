import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada | Ferragens Martins',
  description: 'A página que você está procurando não foi encontrada.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: 'var(--martins-off-white)',
    }}>
      <div style={{ maxWidth: '480px' }}>
        <div style={{
          fontSize: '6rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          color: 'var(--martins-blue-950)',
          lineHeight: 1,
          marginBottom: '0.5rem',
        }}>
          404
        </div>
        <h1 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          color: 'var(--martins-blue-950)',
          marginBottom: '1rem',
        }}>
          PÁGINA NÃO ENCONTRADA
        </h1>
        <p style={{
          color: 'var(--martins-steel)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          A página que você está procurando pode ter sido removida, renomeada
          ou está temporariamente indisponível.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--martins-blue-700)',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'background-color 180ms ease',
            }}
          >
            Ir para o início
          </Link>
          <Link
            href="/catalogo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'var(--martins-blue-700)',
              border: '2px solid var(--martins-blue-700)',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </main>
  )
}
