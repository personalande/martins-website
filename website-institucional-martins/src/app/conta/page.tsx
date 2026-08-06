import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export default async function ContaIndexPage() {
  const supabase = await createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/entrar')
  }

  // Redireciona a raiz /conta para a listagem de orçamentos ou perfil
  redirect('/conta/orcamentos')
}
