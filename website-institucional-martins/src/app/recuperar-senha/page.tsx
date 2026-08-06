import Link from 'next/link';
import { Metadata } from 'next';
import RecoveryForm from './recovery-form';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Recuperar Senha | Ferragens Martins',
  description: 'Recupere o acesso à sua conta.',
};

export default function RecuperarSenhaPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Recuperar Senha</h1>
          <p className={styles.subtitle}>Digite seu e-mail para receber um link de recuperação.</p>
        </div>
        
        <RecoveryForm />
        
        <div className={styles.footer}>
          <p>
            Lembrou a senha? <Link href="/entrar">Entrar</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
