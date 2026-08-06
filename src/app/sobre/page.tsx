import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/config/site'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a Ferragens Martins. Sua parceria para obras, reformas e manutenção em Paranaguá e região, com atendimento especializado em duas lojas.',
}

const WHAT_WE_OFFER = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Atendimento Especializado',
    desc: 'Equipe treinada para orientar você na escolha do produto certo para cada aplicação.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Ampla Variedade',
    desc: 'Ferragens, ferramentas, hidráulica, elétrica, fixação, pintura e muito mais.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Duas Lojas',
    desc: 'Duas unidades estrategicamente localizadas em Paranaguá para melhor atender você.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: 'Orçamento pelo WhatsApp',
    desc: 'Monte seu orçamento online e receba atendimento rápido diretamente pelo WhatsApp.',
  },
]

export default function SobrePage() {
  const [store1, store2] = SITE_CONFIG.stores

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero} aria-label="Sobre a Ferragens Martins">
        <div className="container">
          <h1 className={styles.heroTitle}>Quem Somos</h1>
          <p className={styles.heroSub}>
            Sua parceria para obras, reformas e manutenção em Paranaguá e região
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className={`container ${styles.missionInner}`}>
          <div className={styles.missionText}>
            <h2 className={styles.sectionTitle}>Nossa Missão</h2>
            <p className={styles.missionPara}>
              A Ferragens Martins é sua parceira para obras, reformas e manutenção em
              Paranaguá e região. Com atendimento especializado e uma ampla variedade de
              produtos, buscamos ser a solução completa para construtores, reformadores
              e profissionais da área.
            </p>
            <p className={styles.missionPara}>
              Nossa equipe está preparada para orientar você na escolha do produto
              certo, garantindo qualidade, durabilidade e custo-benefício para cada
              projeto.
            </p>
          </div>
          <div className={styles.missionHighlight}>
            <div className={styles.highlightBox}>
              <span className={styles.highlightLabel}>CONTENT_REQUIRED</span>
              <p className={styles.highlightText}>
                Ano de fundação, história da empresa e demais informações institucionais
                serão adicionadas pelo administrador no painel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className={styles.offer}>
        <div className="container">
          <h2 className={styles.sectionTitle}>O que Oferecemos</h2>
          <ul className={styles.offerGrid} role="list">
            {WHAT_WE_OFFER.map((item) => (
              <li key={item.title} className={styles.offerCard}>
                <div className={styles.offerIcon}>{item.icon}</div>
                <h3 className={styles.offerTitle}>{item.title}</h3>
                <p className={styles.offerDesc}>{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stores */}
      <section className={styles.stores}>
        <div className="container">
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>Nossas Lojas</h2>
          <div className={styles.storesGrid}>
            {[store1, store2].map((store) => (
              <div key={store.id} className={styles.storeCard}>
                <h3 className={styles.storeName}>{store.shortName}</h3>
                <address className={styles.storeAddress}>
                  {store.addressLine}<br />
                  {store.neighborhood} · {store.city}-{store.state}<br />
                  CEP {store.postalCode}
                </address>
                <p className={styles.storePhone}>
                  <a href={`tel:${store.phone.replace(/\D/g, '')}`} className={styles.storePhoneLink}>
                    {store.phone}
                  </a>
                </p>
                <div className={styles.storeHours}>
                  <div>{store.hours.weekday}</div>
                  <div>{store.hours.saturday}</div>
                  <div className={styles.storeClosed}>{store.hours.sunday}</div>
                </div>
                <a
                  href={store.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapsLink}
                >
                  Ver no Google Maps →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
