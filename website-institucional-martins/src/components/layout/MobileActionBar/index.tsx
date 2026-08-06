'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuote } from '@/context/QuoteContext';
import styles from './MobileActionBar.module.css';

interface MobileActionBarProps {
  onMenuClick?: () => void;
}

export default function MobileActionBar({ onMenuClick }: MobileActionBarProps) {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useQuote();

  return (
    <div className={styles.mobileActionBar}>
      <Link href="/" className={`${styles.mobileTab} ${pathname === '/' ? styles.active : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>Início</span>
      </Link>
      
      <Link href="/catalogo" className={`${styles.mobileTab} ${pathname === '/catalogo' ? styles.active : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <span>Catálogo</span>
      </Link>
      
      <button onClick={openDrawer} className={styles.mobileTab} type="button">
        <div className={styles.iconWrapper}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          {itemCount > 0 && <span className={styles.mobileTabBadge}>{itemCount}</span>}
        </div>
        <span>Orçamento</span>
      </button>
      
      <a href="https://wa.me/5541992557256" target="_blank" rel="noopener noreferrer" className={styles.mobileTab}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <span>WhatsApp</span>
      </a>
      
      <button className={styles.mobileTab} onClick={onMenuClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        <span>Menu</span>
      </button>
    </div>
  );
}
