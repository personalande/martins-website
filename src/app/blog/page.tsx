import type { Metadata } from 'next'
import Link from 'next/link'
import { articles } from '@/lib/blog/articles'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog | Ferragens Martins',
  description: 'Dicas de obra, manutenção, hidráulica, elétrica, pintura e novidades da Ferragens Martins de Paranaguá-PR.',
  keywords: ['ferragens', 'obra', 'dicas', 'manutenção', 'reforma', 'paranaguá'],
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(iso))
}

export default function BlogPage() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <main>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className="container">
          <p className={styles.heroLabel}>Blog Ferragens Martins</p>
          <h1 className={styles.title}>Dicas, Guias e Novidades<br />para a Sua Obra</h1>
          <p className={styles.subtitle}>Conteúdo técnico e prático para quem quer fazer mais com menos e com segurança</p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1rem 5rem' }}>

        {/* ── DESTAQUE ── */}
        <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
          <div className={styles.featuredEmoji} aria-hidden="true">{featured.coverEmoji}</div>
          <div className={styles.featuredBody}>
            <span className={styles.categoryTag} style={{ background: featured.categoryColor }}>{featured.category}</span>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <div className={styles.articleMeta}>
              <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
              <span>·</span>
              <span>{featured.readingTime} min de leitura</span>
            </div>
            <span className={styles.readBtn}>Ler artigo completo →</span>
          </div>
        </Link>

        {/* ── GRADE ── */}
        <h2 className={styles.sectionTitle}>Mais Artigos</h2>
        <ul className={styles.grid} role="list">
          {rest.map((article) => (
            <li key={article.slug}>
              <Link href={`/blog/${article.slug}`} className={styles.card}>
                <div className={styles.cardEmoji} aria-hidden="true">{article.coverEmoji}</div>
                <div className={styles.cardBody}>
                  <span className={styles.categoryTag} style={{ background: article.categoryColor }}>{article.category}</span>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  <div className={styles.articleMeta}>
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                    <span>·</span>
                    <span>{article.readingTime} min</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA WHATSAPP ── */}
        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ficou com dúvida? Fale com nossos especialistas</h2>
            <p className={styles.ctaText}>Nossa equipe técnica em Paranaguá está pronta para te orientar sobre materiais, quantidades e soluções para sua obra.</p>
            <div className={styles.ctaActions}>
              <a
                href="https://wa.me/5541984167718?text=Ol%C3%A1%2C+vim+pelo+blog+e+tenho+uma+d%C3%BAvida!"
                className={styles.ctaWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chamar no WhatsApp
              </a>
              <Link href="/contato" className={styles.ctaContact}>Fale pelo formulário</Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
