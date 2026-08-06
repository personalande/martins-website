import { QuoteItem } from '@/types'
import { formatCurrency } from '../utils/format'

export type Quote = {
  protocol: string;
  items: QuoteItem[];
}

export function buildQuoteMessage(quote: Quote): string {
  let message = `Olá! Gostaria de solicitar um orçamento:\n\n*Protocolo:* ${quote.protocol}\n*Itens:*\n`
  
  quote.items.forEach(item => {
    message += `- ${item.name} (qtd: ${item.quantity})\n`
    if (item.variantName) {
      message += `  Variação: ${item.variantName}\n`
    }
  })
  
  return message
}

export function buildContactMessage(name: string, message: string): string {
  return `Olá, me chamo ${name}.\n\n${message}`
}

export function buildProductInquiry(productName: string, code?: string): string {
  let msg = `Olá! Gostaria de mais informações sobre o produto: *${productName}*`
  if (code) {
    msg += ` (Código: ${code})`
  }
  return msg
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanedPhone = phone.replace(/\D/g, '')
  // add country code if not present (assuming Brazil 55)
  const finalPhone = cleanedPhone.startsWith('55') ? cleanedPhone : `55${cleanedPhone}`
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`
}
