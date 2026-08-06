import React, { useId } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id: customId, required, className, disabled, checked, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;

    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        <label htmlFor={id} className={styles.labelWrapper}>
          <span className={styles.checkboxContainer}>
            <input
              ref={ref}
              type="checkbox"
              id={id}
              checked={checked}
              disabled={disabled}
              required={required}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              className={styles.input}
              {...props}
            />
            <span className={styles.box}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </span>
          {label && (
            <span className={styles.labelText}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </span>
          )}
        </label>
        {error && (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
