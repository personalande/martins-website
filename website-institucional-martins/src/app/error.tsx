'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service in production
    console.error('[GlobalError]', error)
  }, [error])

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
          width: '64px',
          height: '64px',
          backgroundColor: 'var(--martins-red-600)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          color: 'var(--martins-blue-950)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-heading)',
        }}>
          ALGO DEU ERRADO
        </h1>
        <p style={{
          color: 'var(--martins-steel)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          Ocorreu um erro inesperado. Nossa equipe foi notificada.
          Tente novamente ou entre em contato conosco.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <pre style={{
            textAlign: 'left',
            fontSize: '0.75rem',
            backgroundColor: 'var(--martins-paper)',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            color: 'var(--martins-red-700)',
            marginBottom: '2rem',
            maxHeight: '200px',
          }}>
            {error.message}
          </pre>
        )}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
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
              cursor: 'pointer',
              border: 'none',
              fontFamily: 'inherit',
            }}
          >
            Tentar novamente
          </button>
          <Link
            href="/"
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
            Ir para o início
          </Link>
        </div>
      </div>
    </main>
  )
}
