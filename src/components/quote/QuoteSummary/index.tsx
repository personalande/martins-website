import React from 'react';
import styles from './QuoteSummary.module.css';

interface QuoteSummaryProps {
  itemCount: number;
  estimatedTotal: number | null;
  onCheckout: () => void;
  onClear: () => void;
  hasItemsWithoutPrice: boolean;
}

export function QuoteSummary({ 
  itemCount, 
  estimatedTotal, 
  onCheckout, 
  onClear,
  hasItemsWithoutPrice 
}: QuoteSummaryProps) {
  if (itemCount === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>Total de itens</span>
        <span className={styles.value}>{itemCount}</span>
      </div>

      <div className={`${styles.row} ${styles.totalRow}`}>
        <span className={styles.totalLabel}>Total Estimado</span>
        <span className={styles.totalValue}>
          {estimatedTotal !== null 
            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(estimatedTotal)
            : 'Consulte'}
        </span>
      </div>
      
      {hasItemsWithoutPrice && (
        <p className={styles.disclaimer}>
          * Valores sujeitos a confirmação. Alguns itens necessitam de cotação.
        </p>
      )}

      <button onClick={onCheckout} className={styles.checkoutBtn}>
        Enviar Orçamento
      </button>

      <button onClick={onClear} className={styles.clearBtn}>
        Limpar Orçamento
      </button>
    </div>
  );
}
