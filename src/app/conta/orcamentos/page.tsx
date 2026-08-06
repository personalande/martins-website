import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meus Orçamentos',
}

export default async function OrcamentosPage() {
  const supabase = await createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/entrar')

  // Fetch orçamentos from this user
  const { data: orcamentos } = await supabase
    .from('quotes')
    .select('id, protocol, status, created_at, store_preference')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xs)' }}>
          Meus Orçamentos
        </h1>
        <p style={{ color: 'var(--martins-steel)' }}>Acompanhe o histórico de orçamentos solicitados</p>
      </div>

      {!orcamentos || orcamentos.length === 0 ? (
        <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-3xl) var(--space-xl)', textAlign: 'center' }}>
           <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--martins-steel)', margin: '0 auto var(--space-md)' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
           <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-sm)' }}>Nenhum orçamento encontrado</h2>
           <p style={{ color: 'var(--martins-steel)', marginBottom: 'var(--space-lg)' }}>Você ainda não solicitou nenhum orçamento.</p>
           <Link href="/catalogo" style={{ display: 'inline-block', padding: '0.7rem 1.5rem', background: 'var(--martins-blue-700)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 'bold', textDecoration: 'none' }}>
              Navegar no Catálogo
           </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
           {orcamentos.map((quote) => (
             <div key={quote.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', padding: 'var(--space-lg)', background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)' }}>
                <div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--martins-blue-950)' }}>{quote.protocol}</strong>
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-sm)', background: quote.status === 'PENDING' ? 'var(--martins-yellow-500)' : quote.status === 'RESPONDED' ? 'var(--martins-success)' : 'var(--martins-border)', color: 'var(--martins-blue-950)', fontWeight: 'bold' }}>
                         {quote.status === 'PENDING' ? 'Em análise' : quote.status === 'RESPONDED' ? 'Respondido' : quote.status === 'CANCELED' ? 'Cancelado' : quote.status}
                      </span>
                   </div>
                   <div style={{ fontSize: '0.85rem', color: 'var(--martins-steel)' }}>
                      Solicitado em {new Date(quote.created_at).toLocaleDateString('pt-BR')} • Loja: {quote.store_preference || 'Sem preferência'}
                   </div>
                </div>
                <div>
                   {/* We don't have a quote details page on the client side in this MVP, so just a placeholder button */}
                   <button disabled style={{ padding: '0.5rem 1rem', border: '1.5px solid var(--martins-border)', background: 'var(--martins-off-white)', borderRadius: 'var(--radius-md)', color: 'var(--martins-steel)', fontSize: '0.85rem', cursor: 'not-allowed' }}>Ver Detalhes</button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  )
}
