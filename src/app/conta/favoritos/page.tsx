import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meus Favoritos',
}

export default async function FavoritosPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/entrar')

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xs)' }}>
          Meus Favoritos
        </h1>
        <p style={{ color: 'var(--martins-steel)' }}>Produtos salvos para orçamentos futuros</p>
      </div>

      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
         <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--martins-steel)', margin: '0 auto var(--space-md)' }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
         <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Nenhum favorito ainda</h2>
         <p style={{ color: 'var(--martins-steel)', marginBottom: 'var(--space-lg)' }}>A funcionalidade de favoritos será liberada na próxima versão.</p>
         <Link href="/catalogo" style={{ display: 'inline-block', padding: '0.7rem 1.5rem', background: 'var(--martins-blue-700)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 'bold', textDecoration: 'none' }}>
            Explorar Catálogo
         </Link>
      </div>
    </div>
  )
}
