'use client';

import React, { useState } from 'react';
import { useForm } from 'react-form';
// Note: requested use react-hook-form + zod, installing react-hook-form locally in the file or just importing.
import { useForm as useHookForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuoteItem } from '@/types';
import styles from './QuoteForm.module.css';

const quoteSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório e deve ter no mínimo 3 caracteres'),
  phone: z.string().min(14, 'Telefone inválido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  storePref: z.enum(['LOJA_1', 'LOJA_2', 'NONE']),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  items: QuoteItem[];
  onSuccess: () => void;
}

export function QuoteForm({ items, onSuccess }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [protocol, setProtocol] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useHookForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      storePref: 'NONE'
    }
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    // Mask (XX) XXXXX-XXXX
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    
    setValue('phone', value, { shouldValidate: true });
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      // const res = await fetch('/api/quotes', { method: 'POST', body: JSON.stringify({ ...data, items }) });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fakeProtocol = `FM${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
      setProtocol(fakeProtocol);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar orçamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (protocol) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className={styles.successTitle}>Orçamento Solicitado!</h3>
        <p className={styles.successText}>
          Seu pedido foi recebido com sucesso. Nosso time entrará em contato em breve.
        </p>
        <div className={styles.protocolBox}>
          <span className={styles.protocolLabel}>Protocolo</span>
          <strong className={styles.protocolNumber}>{protocol}</strong>
        </div>
        
        <a 
          href={`https://wa.me/5541992557256?text=Olá, enviei um orçamento pelo site (Protocolo: ${protocol})`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
        >
          Acompanhar via WhatsApp
        </a>
        <button onClick={onSuccess} className={styles.closeBtn}>
          Concluir
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p className={styles.description}>
        Preencha seus dados abaixo para enviarmos a cotação final.
      </p>

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Nome Completo *</label>
        <input 
          id="name" 
          type="text" 
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          {...register('name')} 
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>WhatsApp / Telefone *</label>
        <input 
          id="phone" 
          type="tel" 
          placeholder="(41) 90000-0000"
          className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          {...register('phone')} 
          onChange={handlePhoneChange}
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>E-mail (opcional)</label>
        <input 
          id="email" 
          type="email" 
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          {...register('email')} 
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="storePref" className={styles.label}>Loja de Preferência</label>
        <select 
          id="storePref" 
          className={styles.select}
          {...register('storePref')}
        >
          <option value="NONE">Sem preferência (Mais próxima)</option>
          <option value="LOJA_1">Loja 1 - Vila São Vicente</option>
          <option value="LOJA_2">Loja 2 - Vila Itiberê</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="notes" className={styles.label}>Observações (opcional)</label>
        <textarea 
          id="notes" 
          rows={3}
          className={styles.textarea}
          {...register('notes')} 
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          {isSubmitting ? 'Enviando...' : 'Confirmar Solicitação'}
        </button>
      </div>
    </form>
  );
}
