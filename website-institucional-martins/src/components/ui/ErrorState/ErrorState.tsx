import React from 'react';
import styles from './ErrorState.module.css';
import { Button } from '../Button/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionText?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Ocorreu um erro',
  message = 'Não foi possível carregar as informações no momento. Por favor, tente novamente.',
  onRetry,
  actionText = 'Tentar Novamente',
  className,
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`} role="alert">
      <div className={styles.iconWrapper}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <div className={styles.actions}>
          <Button variant="primary" onClick={onRetry}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
