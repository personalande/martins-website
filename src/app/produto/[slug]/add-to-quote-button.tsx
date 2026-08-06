'use client'

import { useState } from 'react'
import { useQuote } from '@/context/QuoteContext'
import type { Product } from '@/types'
import styles from './add-to-quote-button.module.css'

interface Props {
  product: Product
}

export default function AddToQuoteButton({ product }: Props) {
  const { addItem, openDrawer } = useQuote()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem({
      productId: product.id,
      productName: product.name,
      publicCode: product.public_code || undefined,
      unit: product.unit,
      quantity: qty,
      priceMode: product.price_mode,
      publicUnitPrice: product.public_price || undefined,
      product_name_snapshot: product.name,
      unit_snapshot: product.unit,
      price_mode_snapshot: product.price_mode,
      public_unit_price_snapshot: product.public_price || undefined,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
    openDrawer()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.qtyControl}>
        <button
          className={styles.qtyBtn}
          onClick={() => setQty(Math.max(1, qty - 1))}
          aria-label="Diminuir quantidade"
          disabled={qty <= 1}
        >−</button>
        <span className={styles.qtyValue} aria-live="polite">{qty}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => setQty(qty + 1)}
          aria-label="Aumentar quantidade"
        >+</button>
      </div>
      <button
        className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
        onClick={handleAdd}
        aria-live="polite"
      >
        {added ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Adicionado!
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Adicionar ao Orçamento
          </>
        )}
      </button>
    </div>
  )
}
