import { describe, it, expect } from 'vitest'
import { buildWhatsAppQuoteUrl } from '@/lib/whatsapp/message'

describe('WhatsApp Message Builder', () => {
  it('builds wa.me URL and text for quote request with items', () => {
    const res = buildWhatsAppQuoteUrl({
      protocol: 'FM-20260806-1234',
      customerName: 'Carlos Silva',
      storeName: 'Ferragens Martins — Vila São Vicente',
      storeWhatsapp: '5541992557256',
      items: [
        {
          id: 'item-1',
          product_id: 'prod-1',
          variant_id: null,
          product_name_snapshot: 'Parafuso Chipboard 4,0x40mm',
          variant_snapshot: 'Caixa c/ 100un',
          public_code_snapshot: 'FIX-001',
          unit_snapshot: 'cx',
          quantity: 2,
          public_unit_price_snapshot: 18.5,
          line_total_snapshot: 37.0,
          customer_note: 'Preferência cabeça chata',
          price_mode_snapshot: 'EXACT',
        },
      ],
      customerNotes: 'Entregar na Vila São Vicente se possível',
      publicTotalEstimate: 37.0,
    })

    expect(res.url).toContain('https://wa.me/5541992557256?text=')
    expect(res.messageText).toContain('FM-20260806-1234')
    expect(res.messageText).toContain('Carlos Silva')
    expect(res.messageText).toContain('Parafuso Chipboard 4,0x40mm')
    expect(res.messageText).toContain('2 cx')
    expect(res.messageText).toContain('Entregar na Vila São Vicente')
  })

  it('handles hidden prices with "A confirmar"', () => {
    const res = buildWhatsAppQuoteUrl({
      protocol: 'FM-20260806-9999',
      customerName: 'Maria Santos',
      storeWhatsapp: '5541989001321',
      items: [
        {
          id: 'item-2',
          product_id: 'prod-2',
          variant_id: null,
          product_name_snapshot: 'Furadeira de Impacto 650W',
          variant_snapshot: null,
          public_code_snapshot: 'FER-002',
          unit_snapshot: 'un',
          quantity: 1,
          public_unit_price_snapshot: null,
          line_total_snapshot: null,
          customer_note: null,
          price_mode_snapshot: 'HIDDEN',
        },
      ],
    })

    expect(res.messageText).toContain('Valores:* A confirmar pela equipe da loja.')
    expect(res.url).toContain('wa.me/5541989001321')
  })
})
