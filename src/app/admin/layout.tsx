import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/entrar')
  }

  // TODO: Verify if user has admin role in DB
  // For MVP, we assume any user accessing /admin who is logged in is allowed,
  // or we can check a specific role field. Assuming MVP allows it or we check it later.
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--martins-off-white)' }}>
      {/* Sidebar Admin Simples */}
      <aside style={{ width: '260px', background: 'var(--martins-blue-950)', color: 'white', padding: 'var(--space-xl) var(--space-md)' }}>
         <div style={{ marginBottom: 'var(--space-2xl)', padding: '0 var(--space-sm)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 'black', fontSize: '1.2rem', color: 'var(--martins-yellow-400)' }}>FERRAGENS MARTINS</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>Painel de Administração</div>
         </div>
         
         <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/orcamentos">Orçamentos</NavLink>
            <NavLink href="/admin/produtos">Produtos</NavLink>
            <NavLink href="/admin/categorias">Categorias</NavLink>
            <NavLink href="/admin/configuracoes">Configurações</NavLink>
         </nav>
      </aside>
      
      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: 'var(--space-2xl)' }}>
         {children}
      </main>
    </div>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} style={{ display: 'block', padding: '0.7rem var(--space-sm)', borderRadius: 'var(--radius-md)', color: 'white', textDecoration: 'none', transition: 'background 0.2s' }}>
      {children}
    </Link>
  )
}
