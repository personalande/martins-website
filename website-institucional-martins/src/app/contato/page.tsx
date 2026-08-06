'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SITE_CONFIG } from '@/config/site'
import { contactFormSchema, type ContactFormValues } from '@/lib/validation/schemas'
import styles from './page.module.css'

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) })

  async function onSubmit(data: ContactFormValues) {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        setServerError(json.error || 'Erro ao enviar. Tente novamente.')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('Erro de conexão. Tente novamente em instantes.')
    }
  }

  return (
    <main>
      {/* Hero */}
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Fale Conosco</h1>
          <p className={styles.heroSub}>Estamos prontos para atender você</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Form */}
          <section className={styles.formSection} aria-label="Formulário de contato">
            {submitted ? (
              <div className={styles.success}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{color:'var(--martins-success)'}}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h2 className={styles.successTitle}>Mensagem enviada!</h2>
                <p className={styles.successDesc}>Recebemos seu contato e retornaremos em breve.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className={styles.formTitle}>Envie uma mensagem</h2>

                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>Nome *</label>
                  <input id="contact-name" type="text" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} {...register('name')} autoComplete="name" />
                  {errors.name && <span className={styles.errorMsg} role="alert">{errors.name.message}</span>}
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>E-mail *</label>
                    <input id="contact-email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`} {...register('email')} autoComplete="email" />
                    {errors.email && <span className={styles.errorMsg} role="alert">{errors.email.message}</span>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-phone" className={styles.label}>Telefone</label>
                    <input id="contact-phone" type="tel" className={styles.input} {...register('phone')} autoComplete="tel" placeholder="(41) 9 9999-9999" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>Assunto *</label>
                  <select id="contact-subject" className={`${styles.input} ${errors.subject ? styles.inputError : ''}`} {...register('subject')}>
                    <option value="">Selecione...</option>
                    <option value="orcamento">Orçamento</option>
                    <option value="duvida">Dúvida sobre produto</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="reclamacao">Reclamação</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.subject && <span className={styles.errorMsg} role="alert">{errors.subject.message}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>Mensagem *</label>
                  <textarea id="contact-message" rows={5} className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`} {...register('message')} />
                  {errors.message && <span className={styles.errorMsg} role="alert">{errors.message.message}</span>}
                </div>

                {serverError && (
                  <div className={styles.serverError} role="alert">{serverError}</div>
                )}

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                </button>
              </form>
            )}
          </section>

          {/* Store Info */}
          <aside className={styles.info} aria-label="Informações das lojas">
            <h2 className={styles.infoTitle}>Nossas Lojas</h2>
            {SITE_CONFIG.stores.map((store) => (
              <div key={store.id} className={styles.storeCard}>
                <h3 className={styles.storeName}>{store.shortName}</h3>
                <address className={styles.storeAddr}>
                  {store.addressLine}<br />
                  {store.neighborhood} · {store.city}-{store.state}<br />
                  CEP {store.postalCode}
                </address>
                <p className={styles.storeDetail}>
                  <a href={`tel:${store.phone.replace(/\D/g, '')}`}>{store.phone}</a>
                </p>
                <div className={styles.storeHours}>
                  <div>{store.hours.weekday}</div>
                  <div>{store.hours.saturday}</div>
                  <div className={styles.storeSunday}>{store.hours.sunday}</div>
                </div>
                <a href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('Olá!')}`} className={styles.waBtn} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </main>
  )
}
