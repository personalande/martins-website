import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { PriceDisplay } from '../PriceDisplay';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];

  return (
    <div className={styles.card}>
      {product.featured && <div className={styles.featuredBadge}>Destaque</div>}
      
      <Link href={`/produto/${product.slug}`} className={styles.imageWrapper}>
        {primaryImage ? (
          <Image 
            src={primaryImage.storage_path} 
            alt={primaryImage.alt_text || product.name}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          {product.category && (
            <span className={styles.category}>{product.category.name}</span>
          )}
          {product.brand && (
            <span className={styles.brand}>{product.brand.name}</span>
          )}
        </div>

        <Link href={`/produto/${product.slug}`} className={styles.titleLink}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>

        <div className={styles.priceContainer}>
          <PriceDisplay 
            price={product.public_price} 
            mode={product.price_mode} 
            size="md" 
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton}>
            Adicionar ao Orçamento
          </button>
          <a 
            href={`https://wa.me/5541992557256?text=Olá, gostaria de saber mais sobre o produto ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            Consultar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
