import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { handleApiError, NotFoundError } from '@/lib/errors'
import { renderToBuffer } from '@react-pdf/renderer'
import { QuotePDFDocument } from '@/lib/pdf/generator'
import type { Quote } from '@/types'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const supabase = await createServerClient()

    const { data: quoteRaw, error } = await supabase
      .from('quotes')
      .select(`
        id, protocol, status, customer_name, customer_phone, customer_email,
        store_preference, notes, public_total_estimate, created_at,
        quote_items (
          id, quantity, customer_note,
          product_name_snapshot, variant_snapshot, public_code_snapshot,
          unit_snapshot, price_mode_snapshot, public_unit_price_snapshot
        )
      `)
      .eq('id', id)
      .single()

    if (error || !quoteRaw) {
      throw new NotFoundError('Orçamento')
    }

    // Map to Quote type
    const quote: Quote = {
      id: quoteRaw.id,
      protocol: quoteRaw.protocol,
      customer_name: quoteRaw.customer_name,
      customer_phone: quoteRaw.customer_phone,
      customer_email: quoteRaw.customer_email,
      store_preference: quoteRaw.store_preference,
      notes: quoteRaw.notes,
      status: quoteRaw.status,
      public_total_estimate: quoteRaw.public_total_estimate,
      created_at: quoteRaw.created_at,
      items: quoteRaw.quote_items.map((qi: {
        id: string
        product_name_snapshot: string
        variant_snapshot: string | null
        public_code_snapshot: string | null
        unit_snapshot: string
        price_mode_snapshot: string
        public_unit_price_snapshot: number | null
        quantity: number
        customer_note: string | null
      }) => ({
        id: qi.id,
        productId: '',
        productName: qi.product_name_snapshot,
        variantLabel: qi.variant_snapshot || undefined,
        publicCode: qi.public_code_snapshot || undefined,
        unit: qi.unit_snapshot,
        quantity: qi.quantity,
        publicUnitPrice: qi.public_unit_price_snapshot || undefined,
        priceMode: qi.price_mode_snapshot as Quote['items'][0]['priceMode'],
        note: qi.customer_note || undefined,
        product_name_snapshot: qi.product_name_snapshot,
        variant_snapshot: qi.variant_snapshot,
        public_code_snapshot: qi.public_code_snapshot,
        unit_snapshot: qi.unit_snapshot,
        price_mode_snapshot: qi.price_mode_snapshot as Quote['items'][0]['priceMode'],
        public_unit_price_snapshot: qi.public_unit_price_snapshot,
        customer_note: qi.customer_note,
      })),
    }

    const pdfBuffer = await renderToBuffer(QuotePDFDocument({ quote }))

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="orcamento-${quote.protocol}.pdf"`,
        'Cache-Control': 'private, no-cache',
      },
    })
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
