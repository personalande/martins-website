'use client';

import React, { useState } from 'react';
import { Category, FilterState } from '@/types';
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  categories: Category[];
  currentFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function ProductFilters({ categories, currentFilters, onFilterChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (slug: string) => {
    onFilterChange({
      ...currentFilters,
      categorySlug: currentFilters.categorySlug === slug ? undefined : slug,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    onFilterChange({
      ...currentFilters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...currentFilters,
      searchQuery: e.target.value || undefined,
    });
  };

  const resetFilters = () => {
    onFilterChange({});
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Filtros</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <polyline points={isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
        </svg>
      </button>

      <div className={`${styles.filtersPanel} ${isOpen ? styles.open : ''}`}>
        
        <div className={styles.filterGroup}>
          <label className={styles.label}>Buscar</label>
          <input 
            type="text" 
            placeholder="Nome, código, etc..." 
            className={styles.input}
            value={currentFilters.searchQuery || ''}
            onChange={handleSearchChange}
          />
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.label}>Categorias</h4>
          <div className={styles.radioList}>
            {categories.map(cat => (
              <label key={cat.id} className={styles.radioItem}>
                <input 
                  type="radio" 
                  name="category"
                  checked={currentFilters.categorySlug === cat.slug}
                  onChange={() => handleCategoryChange(cat.slug)}
                />
                <span className={styles.radioLabel}>{cat.name}</span>
                {cat.product_count !== undefined && (
                  <span className={styles.count}>({cat.product_count})</span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h4 className={styles.label}>Preço</h4>
          <div className={styles.priceInputs}>
            <input 
              type="number" 
              placeholder="Min" 
              className={styles.input}
              value={currentFilters.minPrice || ''}
              onChange={(e) => handlePriceChange(e, 'min')}
              min="0"
            />
            <span className={styles.priceSeparator}>-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className={styles.input}
              value={currentFilters.maxPrice || ''}
              onChange={(e) => handlePriceChange(e, 'max')}
              min="0"
            />
          </div>
        </div>

        <button onClick={resetFilters} className={styles.resetButton}>
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}
