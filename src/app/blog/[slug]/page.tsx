import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles, getArticleBySlug } from '@/lib/blog/articles'
import styles from './page.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Artigo não encontrado' }
  return {
    title: `${article.title} | Blog Ferragens Martins`,
    description: article.excerpt,
    keywords: ['ferragens martins', article.category.toLowerCase(), 'paranaguá', 'dicas obra'],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(iso))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <main>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadLink}>Início</Link>
            <span aria-hidden>›</span>
            <Link href="/blog" className={styles.breadLink}>Blog</Link>
            <span aria-hidden>›</span>
            <span>{article.category}</span>
          </div>
          <div className={styles.coverEmoji} aria-hidden="true">{article.coverEmoji}</div>
          <span className={styles.categoryTag} style={{ background: article.categoryColor }}>{article.category}</span>
          <h1 className={styles.heroTitle}>{article.title}</h1>
          <p className={styles.heroSub}>{article.subtitle}</p>
          <div className={styles.meta}>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime} min de leitura</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className={styles.bodyWrap}>
        <div className="container">
          <div className={styles.layout}>
            {/* Article */}
            <article className={styles.article}>
              {article.body.map((section, i) => {
                if (section.type === 'heading') {
                  const Tag = section.level === 2 ? 'h2' : 'h3'
                  return <Tag key={i} className={section.level === 2 ? styles.h2 : styles.h3}>{section.content}</Tag>
                }
                if (section.type === 'paragraph') {
                  return <p key={i} className={styles.para}>{section.content}</p>
                }
                if (section.type === 'list') {
                  return (
                    <ul key={i} className={styles.list}>
                      {section.items?.map((item, j) => <li key={j} className={styles.listItem}>{item}</li>)}
                    </ul>
                  )
                }
                if (section.type === 'tip') {
                  return (
                    <div key={i} className={styles.tip}>
                      <span className={styles.tipIcon} aria-hidden>💡</span>
                      <p>{section.content}</p>
                    </div>
                  )
                }
                if (section.type === 'callout') {
                  return (
                    <div key={i} className={styles.callout}>
                      <p>{section.content}</p>
                    </div>
                  )
                }
                return null
              })}

              {/* ── CTA INLINE ── */}
              <div className={styles.ctaBlock}>
                <h2 className={styles.ctaTitle}>{article.cta.heading}</h2>
                <p className={styles.ctaText}>{article.cta.text}</p>
                <div className={styles.ctaActions}>
                  <Link href={article.cta.btnHref} className={styles.ctaBtn}>{article.cta.btnLabel}</Link>
                  <a
                    href="https://wa.me/5541984167718?text=Ol%C3%A1%2C+vi+o+blog+e+gostaria+de+um+or%C3%A7amento!"
                    className={styles.waBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Orçamento pelo WhatsApp
                  </a>
                </div>
              </div>

              {/* Back */}
              <div className={styles.backWrap}>
                <Link href="/blog" className={styles.backLink}>← Voltar para o Blog</Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Outros Artigos</h3>
                <ul className={styles.sideList}>
                  {articles.filter(a => a.slug !== slug).slice(0, 5).map((a) => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className={styles.sideLink}>
                        <span className={styles.sideEmoji} aria-hidden>{a.coverEmoji}</span>
                        <span>{a.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.sideCtaCard}>
                <p className={styles.sideCtaText}>Dúvida sobre materiais? Fale diretamente com nosso time em Paranaguá.</p>
                <a
                  href="https://wa.me/5541984167718"
                  className={styles.sideCtaBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chamar no WhatsApp
                </a>
                <Link href="/catalogo" className={styles.sideCatalogLink}>Ver Catálogo</Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
