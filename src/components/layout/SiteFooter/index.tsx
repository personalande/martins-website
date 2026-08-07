import Link from 'next/link';

import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div>
            <div className={styles.logoArea}>
              <span className={styles.logoText}>FERRAGENS<span className={styles.logoBadge}>MARTINS</span></span>
              <span className={styles.logoTagline}>DA BASE AO ACABAMENTO</span>
            </div>
            <p className={styles.brandDesc}>
              A sua loja de ferragens e materiais de construção em Paranaguá. Qualidade, variedade e o melhor atendimento para sua obra ou reforma.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/Ferragensmartins/" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">FB</a>
              <a href="https://www.instagram.com/ferragens.martins/" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a>
            </div>
          </div>

          {/* Store 1 */}
          <div>
            <h3 className={styles.footerColTitle}>Loja 1 - Vila São Vicente</h3>
            <div className={styles.storeCard}>
              <p className={styles.storeDetail}>Av. Gen. Ivan Jejuhy Afonso da Costa, 653, nº 374</p>
              <p className={styles.storeDetail}>Vila São Vicente, Paranaguá-PR</p>
              <p className={styles.storeDetail}>CEP: 83209-570</p>
              <p className={styles.storeDetail}><strong>(41) 9 9255-7256</strong></p>
              <p className={styles.storeDetail}>Seg-Sex 08-18h, Sáb 08-12h</p>
              <a href="https://maps.google.com/?q=Av.+Gen.+Ivan+Jejuhy+Afonso+da+Costa,+653" target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                Ver no Mapa
              </a>
            </div>
          </div>

          {/* Store 2 */}
          <div>
            <h3 className={styles.footerColTitle}>Loja 2 - Vila Itiberê</h3>
            <div className={styles.storeCard}>
              <p className={styles.storeDetail}>Av. Gov. Bento Munhoz da Rocha Neto, 77</p>
              <p className={styles.storeDetail}>Vila Itiberê, Paranaguá-PR</p>
              <p className={styles.storeDetail}>CEP: 83209-000</p>
              <p className={styles.storeDetail}><strong>(41) 9 8900-1321</strong></p>
              <p className={styles.storeDetail}>Seg-Sex 08-18h, Sáb 08-12h</p>
              <a href="https://maps.google.com/?q=Av.+Gov.+Bento+Munhoz+da+Rocha+Neto,+77" target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                Ver no Mapa
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className={styles.footerColTitle}>Links Úteis</h3>
            <ul className={styles.footerLinksList}>
              <li><Link href="/catalogo" className={styles.footerLink}>Catálogo</Link></li>
              <li><Link href="/sobre" className={styles.footerLink}>Sobre a Empresa</Link></li>
              <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
              <li><Link href="/contato" className={styles.footerLink}>Contato</Link></li>
              <li><Link href="/politica-de-privacidade" className={styles.footerLink}>Política de Privacidade</Link></li>
              <li><Link href="/termos" className={styles.footerLink}>Termos de Uso</Link></li>
              <li><Link href="/cookies" className={styles.footerLink}>Política de Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottomBanner}>
          <div>&copy; 2025 Ferragens Martins. Todos os direitos reservados.</div>
          <div className={styles.legalLinks}>
            CNPJ: 49.015.088/0001-04
          </div>
        </div>
      </div>
    </footer>
  );
}
