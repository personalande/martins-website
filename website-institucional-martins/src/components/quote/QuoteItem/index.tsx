import React from 'react';
import Image from 'next/image';
import { QuoteItem as QuoteItemType } from '@/types';
import { PriceDisplay } from '../catalog/PriceDisplay';
import styles from './QuoteItem.module.css';

interface QuoteItemProps {
  item: QuoteItemType;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

export function QuoteItem({ item, onRemove, onUpdateQty }: QuoteItemProps) {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQty(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQty(item.id, item.quantity + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageCol}>
        {item.image ? (
          <div className={styles.imageWrapper}>
            <Image 
              src={item.image} 
              alt={item.productName}
              fill
              className={styles.image}
              sizes="80px"
            />
          </div>
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      
      <div className={styles.contentCol}>
        <div className={styles.header}>
          <h4 className={styles.name}>{item.productName}</h4>
          <button 
            onClick={() => onRemove(item.id)} 
            className={styles.removeBtn}
            aria-label="Remover item"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
        
        {item.variantLabel && (
          <span className={styles.variant}>{item.variantLabel}</span>
        )}
        
        {item.publicCode && (
          <span className={styles.code}>Cód: {item.publicCode}</span>
        )}

        <div className={styles.footer}>
          <div className={styles.qtyControl}>
            <button onClick={handleDecrease} className={styles.qtyBtn} aria-label="Diminuir quantidade">-</button>
            <span className={styles.qtyValue}>{item.quantity}</span>
            <button onClick={handleIncrease} className={styles.qtyBtn} aria-label="Aumentar quantidade">+</button>
          </div>
          
          <div className={styles.price}>
            <PriceDisplay 
              price={item.publicUnitPrice !== undefined ? item.publicUnitPrice * item.quantity : null} 
              mode={item.priceMode}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
