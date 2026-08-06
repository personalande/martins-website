import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/config/site'

export const metadata: Metadata = {
  title: 'Nossas Lojas',
  description: `Conheça as lojas da Ferragens Martins em Paranaguá-PR. ${SITE_CONFIG.stores.length} unidades para melhor atendê-lo.`,
}

export default function LojasPage() {
  return (
    <main>
      <div style={{ background: 'var(--martins-blue-950)', padding: 'var(--space-3xl) 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', textTransform: 'uppercase', color: 'var(--martins-yellow-400)', marginBottom: 'var(--space-sm)' }}>
            Nossas Lojas
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            Venha nos visitar em uma de nossas {SITE_CONFIG.stores.length} unidades em Paranaguá-PR
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-xl)' }}>
          {SITE_CONFIG.stores.map((store) => (
            <div
              key={store.id}
              style={{
                background: 'var(--martins-white)',
                border: '1.5px solid var(--martins-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Store Image Placeholder */}
              <div style={{
                background: 'var(--martins-paper)',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
                borderBottom: '1.5px solid var(--martins-border)',
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--martins-steel)" strokeWidth="1" opacity="0.4" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span style={{ padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)' }}>CONTENT_REQUIRED</span>
              </div>

              {/* Store Info */}
              <div style={{ padding: 'var(--space-xl)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-md)' }}>
                  {store.shortName}
                </h2>

                <address style={{ fontStyle: 'normal', color: 'var(--martins-graphite)', lineHeight: '1.6', marginBottom: 'var(--space-md)' }}>
                  {store.addressLine}<br />
                  {store.neighborhood} · {store.city}-{store.state}<br />
                  CEP {store.postalCode}
                </address>

                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <p style={{ color: 'var(--martins-graphite)', lineHeight: '1.6' }}>
                    <strong>Tel:</strong> {store.phone}
                  </p>
                  <p style={{ color: 'var(--martins-steel)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {store.hours.weekday}<br />
                    {store.hours.saturday}<br />
                    {store.hours.sunday}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  <Link
                    href={`/lojas/${store.slug}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.7rem 1.2rem',
                      background: 'var(--martins-blue-700)',
                      color: 'white',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    Ver Detalhes
                  </Link>
                  <a
                    href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Olá!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.7rem 1.2rem',
                      background: '#25D366',
                      color: 'white',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={store.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.7rem 1.2rem',
                      background: 'transparent',
                      color: 'var(--martins-blue-700)',
                      border: '1.5px solid var(--martins-blue-700)',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    Mapa
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
