import React from 'react'
import styles from './StatusBadge.module.css'

export type StatusVariant = 'published' | 'hidden' | 'archived' | 'draft' | 'pending' | 'approved' | 'rejected' | 'authorized' | 'NEW' | 'IN_REVIEW' | 'PREPARED' | 'WAITING_CUSTOMER' | 'COMPLETED' | 'LOST' | 'CANCELLED' | string

interface StatusBadgeProps {
  status: StatusVariant
  label?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getBadgeStyle = (statusStr: string): { className: string; text: string } => {
    const normalized = statusStr.toLowerCase()

    switch (normalized) {
      case 'published':
      case 'active':
      case 'approved':
      case 'authorized':
      case 'completed':
        return { className: styles.success, text: label || 'Publicado' }

      case 'draft':
      case 'pending':
      case 'in_review':
      case 'em análise':
        return { className: styles.warning, text: label || 'Rascunho' }

      case 'waiting_customer':
        return { className: styles.purple, text: label || 'Aguardando Cliente' }

      case 'prepared':
      case 'new':
      case 'novo':
        return { className: styles.info, text: label || 'Novo' }

      case 'hidden':
        return { className: styles.neutral, text: label || 'Oculto' }

      case 'archived':
      case 'rejected':
      case 'lost':
      case 'cancelled':
      case 'inativo':
        return { className: styles.danger, text: label || statusStr }

      default:
        return { className: styles.neutral, text: label || statusStr }
    }
  }

  const { className, text } = getBadgeStyle(status)

  return (
    <span className={`${styles.badge} ${className}`}>
      <span className={styles.dot} />
      {text}
    </span>
  )
}
