import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const [store1, store2] = SITE_CONFIG.stores;

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div>
            <div className={styles.logoArea}>
              <span className={styles.logoLine1}>
                {"FERRAGENS".split("").map((char, idx) => (
                  <span key={idx}>{char}</span>
                ))}
              </span>
              <span className={styles.logoLine2}>
                {"MARTINS".split("").map((char, idx) => (
                  <span key={idx}>{char}</span>
                ))}
              </span>
              <span className={styles.logoTagline}>DA BASE AO ACABAMENTO</span>
            </div>
            <p className={styles.brandDesc}>
              A sua loja de ferragens e materiais de construção em Paranaguá. Qualidade, variedade e o melhor atendimento para sua obra ou reforma.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/Ferragensmartins/" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/ferragens.martins/" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Store 1 */}
          <div>
            <h3 className={styles.footerColTitle}>{store1.shortName}</h3>
            <div className={styles.storeCard}>
              <p className={styles.storeDetail}>{store1.addressLine}</p>
              <p className={styles.storeDetail}>{store1.neighborhood}, {store1.city}-{store1.state}</p>
              <p className={styles.storeDetail}>CEP: {store1.postalCode}</p>
              <p className={styles.storeDetail}><strong>{store1.phone}</strong></p>
              <p className={styles.storeDetail}>Seg-Sex 08-18h, Sáb 08-12h</p>
              <a href={store1.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
                Ver no Mapa
              </a>
            </div>
          </div>

          {/* Store 2 */}
          <div>
            <h3 className={styles.footerColTitle}>{store2.shortName}</h3>
            <div className={styles.storeCard}>
              <p className={styles.storeDetail}>{store2.addressLine}</p>
              <p className={styles.storeDetail}>{store2.neighborhood}, {store2.city}-{store2.state}</p>
              <p className={styles.storeDetail}>CEP: {store2.postalCode}</p>
              <p className={styles.storeDetail}><strong>{store2.phone}</strong></p>
              <p className={styles.storeDetail}>Seg-Sex 08-18h, Sáb 08-12h</p>
              <a href={store2.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
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
          <div>&copy; 2026 Ferragens Martins. Todos os direitos reservados.</div>
          <div className={styles.legalLinks}>
            CNPJ: 49.015.088/0001-04
          </div>
        </div>
      </div>
    </footer>
  );
}
