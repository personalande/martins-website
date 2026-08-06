'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuote } from '@/context/QuoteContext';
import Navigation from '../Navigation';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useQuote();

  return (
    <>
      <header className={styles.siteHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.leftSection}>
            <button 
              className={styles.hamburgerBtn}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <Link href="/" className={styles.logoArea}>
              <span className={styles.logoText}>FERRAGENS<span className={styles.logoBadge}>MARTINS</span></span>
              <span className={styles.logoTagline}>DA BASE AO ACABAMENTO</span>
            </Link>
          </div>

          <nav className={styles.navMenu}>
            <Link href="/" className={styles.navLink}>Início</Link>
            <Link href="/catalogo" className={styles.navLink}>Catálogo</Link>
            <Link href="/sobre" className={styles.navLink}>Sobre</Link>
            <Link href="/blog" className={styles.navLink}>Blog</Link>
            <Link href="/contato" className={styles.navLink}>Contato</Link>
            <Link href="/lojas" className={styles.navLink}>Lojas</Link>
          </nav>

          <div className={styles.actionArea}>
            <button className={styles.searchButtonMobile} aria-label="Buscar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            
            <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Buscar produtos..." className={styles.searchInput} />
              <button type="submit" className={styles.searchButton} aria-label="Buscar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </form>

            <button onClick={openDrawer} className={styles.quoteBtn} aria-label="Meu Orçamento">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span className={styles.quoteBadge}>{itemCount}</span>
            </button>
            
            <Link href="/entrar" className={styles.accountBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </Link>
          </div>
        </div>
      </header>

      <Navigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
