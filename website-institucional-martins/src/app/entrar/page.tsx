import Link from 'next/link';
import { Metadata } from 'next';
import LoginForm from './login-form';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Entrar | Ferragens Martins',
  description: 'Acesse sua conta para ver seus orçamentos e favoritos.',
};

export default function EntrarPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Entrar</h1>
          <p className={styles.subtitle}>Acesse sua conta para ver seus orçamentos e favoritos.</p>
        </div>
        
        <LoginForm />
        
        <div className={styles.footer}>
          <p>
            Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link>
          </p>
          <p>
            <Link href="/recuperar-senha">Esqueceu a senha?</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
