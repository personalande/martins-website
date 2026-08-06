'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { QuoteItem } from '@/types'

interface QuoteContextType {
  items: QuoteItem[]
  addItem: (item: Omit<QuoteItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateNote: (id: string, note: string) => void
  clearQuote: () => void
  totalItems: number
  itemCount: number
  totalEstimate: number
  hasHiddenPrices: boolean
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const STORAGE_KEY = 'fm_quote'

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore localStorage errors
    }
  }, [items, isLoaded])

  const addItem = useCallback((newItemData: Omit<QuoteItem, 'id'>) => {
    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (i) => i.productId === newItemData.productId && i.variantId === newItemData.variantId,
      )

      if (existingIdx >= 0) {
        const updated = [...prevItems]
        const existing = updated[existingIdx]!
        updated[existingIdx] = {
          ...existing,
          quantity: existing.quantity + newItemData.quantity,
          note: newItemData.note || existing.note,
        }
        return updated
      } else {
        const newItem: QuoteItem = {
          ...newItemData,
          id: `${newItemData.productId}-${newItemData.variantId || 'default'}-${Date.now()}`,
        }
        return [...prevItems, newItem]
      }
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prevItems) => prevItems.filter((i) => i.id !== id))
      return
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, quantity } : i)),
    )
  }, [])

  const updateNote = useCallback((id: string, note: string) => {
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === id ? { ...i, note } : i)),
    )
  }, [])

  const clearQuote = useCallback(() => {
    setItems([])
  }, [])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const itemCount = items.length

  const totalEstimate = items.reduce((sum, i) => {
    if (i.priceMode === 'EXACT' && i.publicUnitPrice) {
      return sum + i.publicUnitPrice * i.quantity
    }
    return sum
  }, 0)

  const hasHiddenPrices = items.some(
    (i) => i.priceMode !== 'EXACT' || !i.publicUnitPrice,
  )

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNote,
        clearQuote,
        totalItems,
        itemCount,
        totalEstimate,
        hasHiddenPrices,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}
