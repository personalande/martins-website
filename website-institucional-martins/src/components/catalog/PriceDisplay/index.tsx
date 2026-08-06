import React from 'react';
import styles from './PriceDisplay.module.css';

type PriceMode = 'EXACT' | 'FROM' | 'HIDDEN' | 'ON_REQUEST';

interface PriceDisplayProps {
  price: number | null;
  mode: PriceMode;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, mode, size = 'md' }: PriceDisplayProps) {
  if (mode === 'HIDDEN') {
    return null;
  }

  if (mode === 'ON_REQUEST') {
    return (
      <div className={`${styles.badge} ${styles[size]}`}>
        Consulte-nos
      </div>
    );
  }

  if (price === null) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      {mode === 'FROM' && <span className={styles.label}>A partir de</span>}
      <span className={styles.price}>{formattedPrice}</span>
    </div>
  );
}
