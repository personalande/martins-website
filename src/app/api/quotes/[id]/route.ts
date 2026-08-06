import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { handleApiError, AppError } from '@/lib/errors'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: quote, error } = await supabase
      .from('quotes')
      .select(`
        id, protocol, status, customer_name, customer_phone, customer_email,
        store_preference, notes, public_total_estimate, created_at, updated_at, user_id,
        quote_items (
          id, quantity, customer_note,
          product_name_snapshot, variant_snapshot, public_code_snapshot,
          unit_snapshot, price_mode_snapshot, public_unit_price_snapshot,
          product_id, variant_id
        )
      `)
      .eq('id', id)
      .single()

    if (error || !quote) {
      return NextResponse.json({ error: 'Orçamento não encontrado' }, { status: 404 })
    }

    // Only allow owner or admin to view
    if (quote.user_id !== user?.id) {
      // Check if admin
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        if (profile?.role !== 'admin' && profile?.role !== 'staff') {
          return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
        }
      } else {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
      }
    }

    return NextResponse.json(quote)
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin' && profile?.role !== 'staff') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    const body = await req.json()
    const allowedFields = ['status', 'public_total_estimate', 'admin_notes']
    const updates: Record<string, unknown> = {}

    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nenhum campo válido para atualizar' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('quotes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new AppError('Erro ao atualizar orçamento', 500)

    return NextResponse.json(data)
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
