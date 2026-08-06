'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createBrowserClient } from '@supabase/ssr';
import styles from './page.module.css';

const recoverySchema = z.object({
  email: z.string().email('E-mail inválido'),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

export default function RecoveryForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit = async (data: RecoveryFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/conta/perfil`, // Redireciona para o perfil para mudar a senha
      });

      if (error) {
        setError('Ocorreu um erro ao enviar o e-mail de recuperação.');
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <p>Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha em instantes.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" {...register('email')} disabled={isLoading} />
        {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
      </button>
    </form>
  );
}
