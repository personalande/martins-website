import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Meu Perfil',
}

export default async function PerfilPage() {
  const supabase = await createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/entrar')

  // Buscar perfil estendido (nome, etc)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--martins-blue-950)', marginBottom: 'var(--space-xs)' }}>
          Meu Perfil
        </h1>
        <p style={{ color: 'var(--martins-steel)' }}>Gerencie suas informações pessoais</p>
      </div>

      <div style={{ background: 'var(--martins-white)', border: '1.5px solid var(--martins-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', maxWidth: '600px' }}>
         <div style={{ display: 'grid', gap: 'var(--space-md)' }}>
            <div>
               <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--martins-steel)', textTransform: 'uppercase', marginBottom: '4px' }}>E-mail (Login)</label>
               <input type="text" readOnly value={user.email || ''} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--martins-border)', borderRadius: 'var(--radius-md)', background: 'var(--martins-off-white)', color: 'var(--martins-graphite)', outline: 'none' }} />
            </div>

            <div>
               <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--martins-steel)', textTransform: 'uppercase', marginBottom: '4px' }}>Nome Completo</label>
               <input type="text" readOnly value={profile?.full_name || 'Não informado'} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--martins-border)', borderRadius: 'var(--radius-md)', background: 'var(--martins-off-white)', color: 'var(--martins-graphite)', outline: 'none' }} />
            </div>
            
            <div>
               <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--martins-steel)', textTransform: 'uppercase', marginBottom: '4px' }}>Telefone</label>
               <input type="text" readOnly value={profile?.phone || 'Não informado'} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--martins-border)', borderRadius: 'var(--radius-md)', background: 'var(--martins-off-white)', color: 'var(--martins-graphite)', outline: 'none' }} />
            </div>

            <div style={{ marginTop: 'var(--space-md)' }}>
               <button disabled style={{ padding: '0.7rem 1.5rem', background: 'var(--martins-blue-950)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 'bold', cursor: 'not-allowed', opacity: 0.5 }}>
                  Editar Perfil (Em breve)
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}
