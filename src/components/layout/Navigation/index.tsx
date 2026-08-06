import Link from 'next/link';
import styles from './Navigation.module.css';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <nav className={styles.sidebar} aria-label="Menu móvel">
        <div className={styles.header}>
          <div className={styles.logoArea}>
            <span className={styles.logoText}>FERRAGENS<span className={styles.logoBadge}>MARTINS</span></span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink} onClick={onClose}>Início</Link>
          <Link href="/catalogo" className={styles.navLink} onClick={onClose}>Catálogo</Link>
          <Link href="/sobre" className={styles.navLink} onClick={onClose}>Sobre</Link>
          <Link href="/blog" className={styles.navLink} onClick={onClose}>Blog</Link>
          <Link href="/contato" className={styles.navLink} onClick={onClose}>Contato</Link>
          <Link href="/lojas" className={styles.navLink} onClick={onClose}>Lojas</Link>
        </div>

        <div className={styles.storeInfo}>
          <h3 className={styles.storeHeader}>Nossas Lojas</h3>
          
          <div className={styles.storeCard}>
            <p className={styles.storeName}>Loja 1</p>
            <p className={styles.storeDetail}>Av. Gen. Ivan Jejuhy Afonso da Costa, 653, nº 374, Vila São Vicente, Paranaguá-PR, 83209-570</p>
            <p className={styles.storeDetail}>(41) 9 9255-7256</p>
            <p className={styles.storeDetail}>Seg-Sex 08-18h, Sáb 08-12h</p>
          </div>

          <div className={styles.storeCard}>
            <p className={styles.storeName}>Loja 2</p>
            <p className={styles.storeDetail}>Av. Gov. Bento Munhoz da Rocha Neto, 77, Vila Itiberê, Paranaguá-PR, 83209-000</p>
            <p className={styles.storeDetail}>(41) 9 8900-1321</p>
            <p className={styles.storeDetail}>Seg-Sex 08-18h, Sáb 08-12h</p>
          </div>
        </div>

        <div className={styles.actions}>
          <a href="https://wa.me/5541992557256" className={styles.waBtn} target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Fale no WhatsApp
          </a>
        </div>
      </nav>
    </div>
  );
}
