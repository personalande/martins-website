import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_CONFIG } from '@/config/site'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const store = SITE_CONFIG.stores.find(s => s.slug === slug)
  if (!store) return { title: 'Loja não encontrada' }

  return {
    title: store.shortName,
    description: `Visite a ${store.shortName} da Ferragens Martins em Paranaguá. Endereço: ${store.addressLine}.`,
  }
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params
  const store = SITE_CONFIG.stores.find(s => s.slug === slug)
  if (!store) notFound()

  return (
    <main>
      <div style={{ background: 'var(--martins-blue-950)', padding: 'var(--space-3xl) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', textTransform: 'uppercase', color: 'var(--martins-yellow-400)', marginBottom: 'var(--space-sm)' }}>
            {store.shortName}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            A sua loja de ferragens e materiais na {store.neighborhood}
          </p>
        </div>
      </div>
      
      <div className="container" style={{ padding: 'var(--space-3xl) 0' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
            {/* Informações da Loja */}
            <div style={{ background: 'var(--martins-off-white)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--martins-border)' }}>
               <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-lg)' }}>
                  Detalhes
               </h2>
               
               <div style={{ marginBottom: 'var(--space-md)' }}>
                  <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--martins-steel)', marginBottom: '4px' }}>Endereço</h3>
                  <address style={{ fontStyle: 'normal', color: 'var(--martins-graphite)', lineHeight: '1.6' }}>
                     {store.addressLine}<br />
                     {store.neighborhood} · {store.city}-{store.state}<br />
                     CEP {store.postalCode}
                  </address>
               </div>
               
               <div style={{ marginBottom: 'var(--space-md)' }}>
                  <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--martins-steel)', marginBottom: '4px' }}>Horário de Funcionamento</h3>
                  <p style={{ color: 'var(--martins-graphite)', lineHeight: '1.6' }}>
                     {store.hours.weekday}<br />
                     {store.hours.saturday}<br />
                     <span style={{ color: 'var(--martins-steel)' }}>{store.hours.sunday}</span>
                  </p>
               </div>

               <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--martins-steel)', marginBottom: '4px' }}>Contatos</h3>
                  <p style={{ color: 'var(--martins-graphite)', lineHeight: '1.6' }}>
                     Telefone: {store.phone}<br />
                     WhatsApp: {store.phone}
                  </p>
               </div>

               <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  <a href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Olá!')}`} target="_blank" rel="noopener noreferrer" style={{ padding: '0.7rem 1.2rem', background: '#25D366', color: 'white', fontWeight: 'bold', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                     Falar no WhatsApp
                  </a>
                  <a href={store.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '0.7rem 1.2rem', background: 'transparent', color: 'var(--martins-blue-700)', border: '1.5px solid var(--martins-blue-700)', fontWeight: 'bold', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
                     Abrir no Mapa
                  </a>
               </div>
            </div>

            {/* Imagem Placeholder */}
            <div style={{ background: 'var(--martins-paper)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--martins-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', flexDirection: 'column', gap: 'var(--space-md)' }}>
               <span style={{ padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)' }}>CONTENT_REQUIRED</span>
               <p style={{ color: 'var(--martins-steel)' }}>Foto da fachada da {store.shortName}</p>
            </div>
         </div>
      </div>
    </main>
  )
}
