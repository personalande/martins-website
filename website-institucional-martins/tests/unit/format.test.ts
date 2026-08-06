import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatPriceDisplay,
  generateQuoteProtocol,
  formatPhoneNumber,
  normalizePhoneToWhatsApp,
  slugify,
} from '@/lib/utils/format'

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('formats numbers to BRL currency', () => {
      expect(formatCurrency(150.5)).toContain('150,50')
      expect(formatCurrency(0)).toContain('0,00')
    })

    it('returns "Sob consulta" for null/undefined/NaN', () => {
      expect(formatCurrency(null)).toBe('Sob consulta')
      expect(formatCurrency(undefined)).toBe('Sob consulta')
      expect(formatCurrency(NaN)).toBe('Sob consulta')
    })
  })

  describe('formatPriceDisplay', () => {
    it('handles EXACT mode with valid price', () => {
      const res = formatPriceDisplay(99.9, 'EXACT')
      expect(res.isPublic).toBe(true)
      expect(res.isExact).toBe(true)
      expect(res.text).toContain('99,90')
    })

    it('handles EXACT mode with null price as hidden', () => {
      const res = formatPriceDisplay(null, 'EXACT')
      expect(res.isPublic).toBe(false)
      expect(res.text).toBe('Preço sob consulta')
    })

    it('handles FROM mode', () => {
      const res = formatPriceDisplay(45, 'FROM')
      expect(res.isPublic).toBe(true)
      expect(res.isExact).toBe(false)
      expect(res.text).toContain('A partir de')
    })

    it('handles ON_REQUEST mode', () => {
      const res = formatPriceDisplay(100, 'ON_REQUEST')
      expect(res.isPublic).toBe(false)
      expect(res.text).toBe('Consulte condições')
    })

    it('handles HIDDEN mode strictly', () => {
      const res = formatPriceDisplay(500, 'HIDDEN')
      expect(res.isPublic).toBe(false)
      expect(res.text).toBe('Preço sob consulta')
    })
  })

  describe('generateQuoteProtocol', () => {
    it('generates protocol in FM-YYYYMMDD-XXXX format', () => {
      const protocol = generateQuoteProtocol()
      expect(protocol).toMatch(/^FM-\d{8}-\d{4}$/)
    })
  })

  describe('phone helpers', () => {
    it('formats 11 digit Brazilian phone', () => {
      expect(formatPhoneNumber('41992557256')).toBe('(41) 99255-7256')
    })

    it('normalizes phone for WhatsApp wa.me link', () => {
      expect(normalizePhoneToWhatsApp('(41) 9 9255-7256')).toBe('5541992557256')
      expect(normalizePhoneToWhatsApp('41989001321')).toBe('5541989001321')
    })
  })

  describe('slugify', () => {
    it('converts accented Portuguese titles to clean URL slugs', () => {
      expect(slugify('Ferragens & Fixação para Construção')).toBe('ferragens-fixacao-para-construcao')
      expect(slugify('Disco de Corte 4.1/2" Inox')).toBe('disco-de-corte-412-inox')
    })
  })
})
