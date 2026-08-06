import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')

  if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { type, path, tag } = body

    if (type === 'path' && path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, type: 'path', path })
    }

    if (type === 'tag' && tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, type: 'tag', tag })
    }

    // Default: revalidate entire catalog and home
    revalidatePath('/')
    revalidatePath('/catalogo')
    revalidateTag('products')
    revalidateTag('categories')

    return NextResponse.json({
      revalidated: true,
      revalidated_at: new Date().toISOString(),
      paths: ['/', '/catalogo'],
      tags: ['products', 'categories'],
    })
  } catch {
    return NextResponse.json({ error: 'Erro ao revalidar cache' }, { status: 500 })
  }
}
