'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Drawer.module.css';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  responsiveBottomOnMobile?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  ariaLabel,
  responsiveBottomOnMobile = true,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const drawerClasses = [
    styles.drawer,
    styles.drawerRight,
    responsiveBottomOnMobile ? styles.drawerResponsive : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside
        ref={drawerRef}
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : ariaLabel || 'Drawer'}
      >
        <div className={styles.header}>
          {typeof title === 'string' ? <h2 className={styles.title}>{title}</h2> : title}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar painel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </aside>
    </>
  );
};
