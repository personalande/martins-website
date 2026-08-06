'use client';

import React, { useEffect, useRef, useState } from 'react';
import { QuoteItem as QuoteItemType } from '@/types';
import { QuoteItem } from '../QuoteItem';
import { QuoteSummary } from '../QuoteSummary';
import { QuoteForm } from '../QuoteForm';
import styles from './QuoteDrawer.module.css';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // In a real app, these would come from context/store
  // Passing as optional props here for flexibility
  initialItems?: QuoteItemType[]; 
}

export function QuoteDrawer({ isOpen, onClose, initialItems = [] }: QuoteDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<QuoteItemType[]>(initialItems);
  const [isCheckout, setIsCheckout] = useState(false);

  // Focus trap and ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = '';
      setIsCheckout(false); // Reset on close
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleClear = () => {
    setItems([]);
  };

  const estimatedTotal = items.reduce((acc, item) => {
    if (item.publicUnitPrice && item.priceMode === 'EXACT') {
      return acc + (item.publicUnitPrice * item.quantity);
    }
    return acc;
  }, 0);

  const hasItemsWithoutPrice = items.some(item => 
    !item.publicUnitPrice || item.priceMode === 'ON_REQUEST' || item.priceMode === 'FROM'
  );

  return (
    <>
      <div 
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Meu Orçamento"
      >
        <div className={styles.header}>
          <div className={styles.titleArea}>
            {isCheckout && (
              <button onClick={() => setIsCheckout(false)} className={styles.backBtn} aria-label="Voltar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
            )}
            <h2 className={styles.title}>Meu Orçamento</h2>
            {!isCheckout && <span className={styles.badge}>{items.length}</span>}
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Fechar orçamento">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="64" height="64" className={styles.emptyIcon}>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              <p>Seu orçamento está vazio.</p>
              <button onClick={onClose} className={styles.continueBtn}>Continuar navegando</button>
            </div>
          ) : isCheckout ? (
            <QuoteForm 
              items={items} 
              onSuccess={() => {
                setItems([]);
                setIsCheckout(false);
              }} 
            />
          ) : (
            <div className={styles.itemList}>
              {items.map(item => (
                <QuoteItem 
                  key={item.id} 
                  item={item} 
                  onRemove={handleRemove}
                  onUpdateQty={handleUpdateQty}
                />
              ))}
            </div>
          )}
        </div>

        {!isCheckout && items.length > 0 && (
          <QuoteSummary 
            itemCount={items.length}
            estimatedTotal={estimatedTotal > 0 ? estimatedTotal : null}
            hasItemsWithoutPrice={hasItemsWithoutPrice}
            onCheckout={() => setIsCheckout(true)}
            onClear={handleClear}
          />
        )}
      </div>
    </>
  );
}
