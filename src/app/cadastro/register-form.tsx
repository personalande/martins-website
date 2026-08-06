'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import styles from './page.module.css';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos' })
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
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
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            phone: data.phone,
          }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <h3>Cadastro realizado com sucesso!</h3>
        <p>Verifique sua caixa de e-mail para confirmar seu cadastro antes de fazer login.</p>
        <Link href="/entrar" className={styles.button}>
          Ir para o Login
        </Link>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.field}>
        <label htmlFor="name">Nome completo</label>
        <input id="name" type="text" {...register('name')} disabled={isLoading} />
        {errors.name && <span className={styles.fieldError}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" {...register('email')} disabled={isLoading} />
        {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">Telefone (opcional)</label>
        <input id="phone" type="text" {...register('phone')} disabled={isLoading} />
        {errors.phone && <span className={styles.fieldError}>{errors.phone.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" {...register('password')} disabled={isLoading} />
        {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} disabled={isLoading} />
        {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword.message}</span>}
      </div>

      <div className={styles.checkboxField}>
        <input id="terms" type="checkbox" {...register('terms')} disabled={isLoading} />
        <label htmlFor="terms">
          Li e aceito os <Link href="/termos">Termos de Uso</Link>
        </label>
        {errors.terms && <span className={styles.fieldError}>{errors.terms.message}</span>}
      </div>

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
