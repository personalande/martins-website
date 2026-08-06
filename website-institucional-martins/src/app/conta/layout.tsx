import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import styles from './layout.module.css';

export default async function ContaLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/entrar');
  }

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            <Link href="/conta" className={styles.navLink}>Resumo</Link>
            <Link href="/conta/perfil" className={styles.navLink}>Meu Perfil</Link>
            <Link href="/conta/orcamentos" className={styles.navLink}>Meus Orçamentos</Link>
            <Link href="/conta/favoritos" className={styles.navLink}>Favoritos</Link>
            <form action="/auth/signout" method="post" className={styles.logoutForm}>
              <button type="submit" className={styles.logoutButton}>Sair</button>
            </form>
          </nav>
        </aside>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
