// Utilities:
export function formatCurrency(value: number): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'Sob consulta'
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatPhone(phone: string): string {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

export function formatDate(date: string | Date): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

export const formatDateBR = formatDate;

export function formatDateTime(date: string | Date): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  const dateStr = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
  const timeStr = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
  return `${dateStr} às ${timeStr}`
}

export function slugify(str: string): string {
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  const cut = str.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '...'
}

export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`
}

// ─── Aliases and extended helpers used by tests & components ────────────────

/** Alias for formatPhone — formats a raw digit string to (XX) XXXXX-XXXX */
export const formatPhoneNumber = formatPhone

/**
 * Normalises any phone string to international WhatsApp format: 55XXXXXXXXXXX
 * Strips all non-digits and prepends country code 55 if missing.
 */
export function normalizePhoneToWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length >= 12) return digits
  return `55${digits}`
}

export type PriceMode = 'EXACT' | 'FROM' | 'HIDDEN' | 'ON_REQUEST'

export interface PriceDisplayResult {
  isPublic: boolean
  isExact: boolean
  text: string
  rawValue: number | null
}

/** Returns a structured object for rendering a price according to its display mode. */
export function formatPriceDisplay(
  price: number | null | undefined,
  mode: PriceMode,
): PriceDisplayResult {
  switch (mode) {
    case 'EXACT':
      if (price == null || isNaN(price as number)) {
        return { isPublic: false, isExact: false, text: 'Preço sob consulta', rawValue: null }
      }
      return { isPublic: true, isExact: true, text: formatCurrency(price as number), rawValue: price as number }
    case 'FROM':
      if (price == null || isNaN(price as number)) {
        return { isPublic: false, isExact: false, text: 'Preço sob consulta', rawValue: null }
      }
      return { isPublic: true, isExact: false, text: `A partir de ${formatCurrency(price as number)}`, rawValue: price as number }
    case 'ON_REQUEST':
      return { isPublic: false, isExact: false, text: 'Consulte condições', rawValue: null }
    case 'HIDDEN':
    default:
      return { isPublic: false, isExact: false, text: 'Preço sob consulta', rawValue: null }
  }
}

/**
 * Generates a quote protocol in the format FM-YYYYMMDD-XXXX.
 * @deprecated Use generateProtocol() from @/lib/utils/protocol instead.
 */
export function generateQuoteProtocol(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `FM-${date}-${rand}`
}

