import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { handleApiError } from '@/lib/errors'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const url = new URL(req.url)

    const q = url.searchParams.get('q') || ''
    const category = url.searchParams.get('category') || ''
    const brand = url.searchParams.get('brand') || ''
    const minPrice = parseFloat(url.searchParams.get('minPrice') || '0') || undefined
    const maxPrice = parseFloat(url.searchParams.get('maxPrice') || '0') || undefined
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = Math.min(parseInt(url.searchParams.get('pageSize') || '24', 10), 48)
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('products')
      .select(`
        id, name, slug, public_code, short_description, unit, price_mode, public_price, featured,
        category:categories(name, slug),
        brand:brands(name, slug),
        images:product_images(storage_path, alt_text, is_primary)
      `, { count: 'exact' })
      .eq('is_published', true)

    if (q) {
      query = query.or(`name.ilike.%${q}%,short_description.ilike.%${q}%,public_code.ilike.%${q}%`)
    }

    if (category) {
      query = query.eq('categories.slug', category)
    }

    if (brand) {
      query = query.eq('brands.slug', brand)
    }

    if (minPrice !== undefined) {
      query = query.gte('public_price', minPrice)
    }

    if (maxPrice !== undefined) {
      query = query.lte('public_price', maxPrice)
    }

    const { data, error, count } = await query
      .order('featured', { ascending: false })
      .order('name', { ascending: true })
      .range(from, to)

    if (error) throw error

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
      query: { q, category, brand, minPrice, maxPrice },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    const { message, statusCode } = handleApiError(err)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
