import { describe, it, expect } from 'vitest'
import { generateProtocol, formatProtocol } from '@/lib/utils/protocol'

describe('Protocol Utils', () => {
  describe('generateProtocol', () => {
    it('generates a protocol string starting with FM-', () => {
      const protocol = generateProtocol()
      expect(protocol.startsWith('FM-')).toBe(true)
    })

    it('contains the current date in YYYYMMDD format', () => {
      const protocol = generateProtocol()
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const expectedDateStr = `${year}${month}${day}`
      
      expect(protocol.includes(expectedDateStr)).toBe(true)
    })

    it('ends with 5 random alphanumeric uppercase characters', () => {
      const protocol = generateProtocol()
      const parts = protocol.split('-')
      expect(parts.length).toBe(3)
      const randomPart = parts[2]
      expect(randomPart).toHaveLength(5)
      expect(randomPart).toMatch(/^[A-Z0-9]{5}$/)
    })
  })

  describe('formatProtocol', () => {
    it('returns the protocol formatted for display (same as original)', () => {
      const protocol = generateProtocol()
      expect(formatProtocol(protocol)).toBe(protocol)
    })
  })
})
