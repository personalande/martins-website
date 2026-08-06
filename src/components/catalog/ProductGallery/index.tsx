'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  images?: ProductImage[];
  productName: string;
}

export function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, images.findIndex(img => img.is_primary))
  );

  if (!images || images.length === 0) {
    return (
      <div className={styles.placeholder}>
        <span>Imagem indisponível</span>
      </div>
    );
  }

  const mainImage = images[activeIndex] || images[0];

  return (
    <div className={styles.container}>
      <div className={styles.mainImageWrapper}>
        <Image 
          src={mainImage.storage_path} 
          alt={mainImage.alt_text || productName}
          fill
          priority
          className={styles.mainImage}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails} role="tablist">
          {images.map((img, index) => (
            <button
              key={img.storage_path}
              role="tab"
              aria-selected={index === activeIndex}
              className={`${styles.thumbnailButton} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
            >
              <div className={styles.thumbnailWrapper}>
                <Image 
                  src={img.storage_path}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className={styles.thumbnailImage}
                  sizes="100px"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
