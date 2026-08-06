import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/acessibilidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Add store pages
  SITE_CONFIG.stores.forEach((store) => {
    routes.push({
      url: `${baseUrl}/lojas/${store.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  // Add dynamic products from Supabase
  try {
    const supabase = await createClient()
    const { data: products } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_published', true)
      .eq('is_archived', false)

    if (products) {
      products.forEach((prod) => {
        routes.push({
          url: `${baseUrl}/produto/${prod.slug}`,
          lastModified: new Date(prod.updated_at),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      })
    }

    // Add published posts
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .eq('status', 'published')

    if (posts) {
      posts.forEach((post) => {
        routes.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      })
    }

    // Add categories
    const { data: categories } = await supabase
      .from('categories')
      .select('slug, updated_at')
      .eq('is_active', true)

    if (categories) {
      categories.forEach((cat) => {
        routes.push({
          url: `${baseUrl}/catalogo/${cat.slug}`,
          lastModified: new Date(cat.updated_at),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      })
    }
  } catch {
    // Fallback gracefully if DB is offline during build
  }

  return routes
}
