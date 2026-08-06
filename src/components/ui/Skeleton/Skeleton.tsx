import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'image' | 'circle' | 'custom';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}) => {
  const customStyles: React.CSSProperties = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  const classNames = [
    styles.skeleton,
    variant !== 'custom' ? styles[variant] : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classNames} style={customStyles} aria-hidden="true" {...props} />;
};
