'use client'

import React, { useState } from 'react'
import styles from './ConfirmDialog.module.css'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
  requireTextConfirmation?: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  requireTextConfirmation,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const [typedConfirmation, setTypedConfirmation] = useState('')

  if (!isOpen) return null

  const isConfirmed = requireTextConfirmation
    ? typedConfirmation.trim() === requireTextConfirmation.trim()
    : true

  const handleConfirm = async () => {
    if (isConfirmed && !isLoading) {
      await onConfirm()
      setTypedConfirmation('')
    }
  }

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.body}>
          <p>{message}</p>
          {requireTextConfirmation && (
            <div className={styles.confirmInputGroup}>
              <label className={styles.confirmLabel}>
                Digite <strong>{requireTextConfirmation}</strong> para confirmar:
              </label>
              <input
                type="text"
                className={styles.confirmInput}
                value={typedConfirmation}
                onChange={(e) => setTypedConfirmation(e.target.value)}
                placeholder={requireTextConfirmation}
                autoFocus
              />
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => {
              setTypedConfirmation('')
              onCancel()
            }}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`${styles.btnConfirm} ${variant === 'primary' ? styles.primary : ''}`}
            onClick={handleConfirm}
            disabled={!isConfirmed || isLoading}
          >
            {isLoading ? 'Aguarde...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
