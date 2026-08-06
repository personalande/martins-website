import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { handleApiError, UnauthorizedError } from '@/lib/errors'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new UnauthorizedError()

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
    }

    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'text/plain']
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      return NextResponse.json({ error: 'Formato inválido. Envie um arquivo CSV.' }, { status: 400 })
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 5MB.' }, { status: 400 })
    }

    const text = await file.text()
    const lines = text.split('\n').filter((l) => l.trim())

    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV vazio ou sem dados.' }, { status: 400 })
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
    const requiredHeaders = ['name', 'category_slug']

    const missing = requiredHeaders.filter((h) => !headers.includes(h))
    if (missing.length > 0) {
      return NextResponse.json({
        error: `Colunas obrigatórias ausentes: ${missing.join(', ')}`,
        expected: requiredHeaders,
        received: headers,
      }, { status: 400 })
    }

    const rows = lines.slice(1).map((line) => {
      const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
      return Object.fromEntries(headers.map((h, i) => [h, values[i] || '']))
    })

    // TODO: Process and insert products in batches
    // This is a stub — full implementation requires product insert logic
    return NextResponse.json({
      success: true,
      message: `Importação iniciada: ${rows.length} registros.`,
      rowCount: rows.length,
      preview: rows.slice(0, 3),
    })
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
