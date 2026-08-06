import Link from 'next/link';
import { Metadata } from 'next';
import RegisterForm from './register-form';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Cadastro | Ferragens Martins',
  description: 'Crie sua conta para solicitar orçamentos e salvar produtos favoritos.',
};

export default function CadastroPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cadastre-se</h1>
          <p className={styles.subtitle}>Crie sua conta para orçamentos e favoritos.</p>
        </div>
        
        <RegisterForm />
        
        <div className={styles.footer}>
          <p>
            Já tem uma conta? <Link href="/entrar">Entrar</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
