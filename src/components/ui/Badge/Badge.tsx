import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'yellow' | 'red' | 'green' | 'gray';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  children,
  className,
  ...props
}) => {
  const classNames = [styles.badge, styles[variant], className || ''].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
};
