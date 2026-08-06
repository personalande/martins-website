'use client'

import React, { useState } from 'react'
import styles from './DataTable.module.css'

export interface Column<T> {
  key: string
  header: string
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string
  isLoading?: boolean
  emptyMessage?: string
  selectable?: boolean
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  pageSize?: number
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'Nenhum registro encontrado.',
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  pageSize = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize) || 1
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const isAllSelected =
    data.length > 0 && selectedKeys.length === data.length
  const isSomeSelected = selectedKeys.length > 0 && selectedKeys.length < data.length

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allKeys = data.map(keyExtractor)
      onSelectionChange?.(allKeys)
    } else {
      onSelectionChange?.([])
    }
  }

  const handleSelectRow = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelectionChange?.(selectedKeys.filter((k) => k !== key))
    } else {
      onSelectionChange?.([...selectedKeys, key])
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {selectable && (
                <th className={styles.checkboxCol}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected
                    }}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <div className={styles.loadingContainer}>
                    <div className={styles.spinner} />
                    <div>Carregando dados...</div>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <div className={styles.emptyContainer}>{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const key = keyExtractor(row)
                const isSelected = selectedKeys.includes(key)

                return (
                  <tr key={key}>
                    {selectable && (
                      <td className={styles.checkboxCol}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={isSelected}
                          onChange={() => handleSelectRow(key)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row, index) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Mostrando {(currentPage - 1) * pageSize + 1} a{' '}
            {Math.min(currentPage * pageSize, data.length)} de {data.length} registros
          </div>
          <div className={styles.paginationControls}>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageBtn} ${currentPage === page ? styles.activePageBtn : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
