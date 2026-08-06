import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/schemas'
import { handleApiError } from '@/lib/errors'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = parsed.data
    const supabase = await createServerClient()

    const { error } = await supabase
      .from('contact_requests')
      .insert({
        name,
        email,
        phone: phone || null,
        subject: subject || 'Contato via site',
        message,
        source: 'website_contact_form',
        ip_address: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      })

    if (error) {
      console.error('[POST /api/contact]', error)
      return NextResponse.json({ error: 'Erro ao enviar mensagem' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' })
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
