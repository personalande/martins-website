import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { quoteFormSchema } from '@/lib/validation/schemas'
import { generateProtocol } from '@/lib/utils/protocol'
import { AppError, handleApiError } from '@/lib/errors'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = quoteFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, phone, email, store_preference, notes } = parsed.data
    const { items } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'O orçamento não pode estar vazio.' },
        { status: 400 }
      )
    }

    const supabase = await createServerClient()
    const protocol = generateProtocol()

    // Get authenticated user (optional — quotes can be anonymous)
    const { data: { user } } = await supabase.auth.getUser()

    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        protocol,
        customer_name: name,
        customer_phone: phone,
        customer_email: email || null,
        store_preference: store_preference || null,
        notes: notes || null,
        user_id: user?.id || null,
        status: 'pending',
      })
      .select('id, protocol')
      .single()

    if (quoteError || !quote) {
      console.error('[POST /api/quotes] quoteError:', quoteError)
      throw new AppError('Erro ao criar orçamento', 500)
    }

    // Insert quote items
    const itemRows = items.map((item: {
      productId: string
      variantId?: string
      quantity: number
      note?: string
      productName: string
      variantLabel?: string
      publicCode?: string
      unit: string
      priceMode: string
      publicUnitPrice?: number
    }) => ({
      quote_id: quote.id,
      product_id: item.productId,
      variant_id: item.variantId || null,
      quantity: item.quantity,
      customer_note: item.note || null,
      product_name_snapshot: item.productName,
      variant_snapshot: item.variantLabel || null,
      public_code_snapshot: item.publicCode || null,
      unit_snapshot: item.unit,
      price_mode_snapshot: item.priceMode,
      public_unit_price_snapshot: item.publicUnitPrice || null,
    }))

    const { error: itemsError } = await supabase
      .from('quote_items')
      .insert(itemRows)

    if (itemsError) {
      console.error('[POST /api/quotes] itemsError:', itemsError)
      // Rollback quote
      await supabase.from('quotes').delete().eq('id', quote.id)
      throw new AppError('Erro ao salvar itens do orçamento', 500)
    }

    return NextResponse.json({ protocol: quote.protocol, id: quote.id }, { status: 201 })
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = 10
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('quotes')
      .select('id, protocol, status, created_at, customer_name, public_total_estimate', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw new AppError('Erro ao buscar orçamentos', 500)

    return NextResponse.json({
      data,
      pagination: { page, pageSize, total: count || 0, totalPages: Math.ceil((count || 0) / pageSize) },
    })
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
