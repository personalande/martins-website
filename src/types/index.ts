export type PriceMode = 'EXACT' | 'FROM' | 'HIDDEN' | 'ON_REQUEST';

export interface Store {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  whatsapp: string | null;
  address_line: string | null;
  number: string | null;
  neighborhood: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  opening_hours: Record<string, unknown> | null;
  google_maps_url: string | null;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon_name?: string | null;
  image_url?: string | null;
  product_count?: number;
}

export interface ProductImage {
  storage_path: string;
  alt_text: string;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  public_code?: string;
  price_override?: number | null;
  price_mode?: PriceMode;
  in_stock?: boolean;
  attributes?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  public_code: string | null;
  short_description: string | null;
  unit: string;
  price_mode: PriceMode;
  public_price: number | null;
  featured: boolean;
  is_published: boolean;
  brand?: { name: string; slug: string } | null;
  category?: { name: string; slug: string } | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantLabel?: string;
  publicCode?: string;
  unit: string;
  quantity: number;
  publicUnitPrice?: number;
  priceMode: PriceMode;
  note?: string;
  image?: string;

  // DB Snapshots for PDF and detail views
  product_name_snapshot?: string;
  variant_snapshot?: string | null;
  public_code_snapshot?: string | null;
  unit_snapshot?: string;
  price_mode_snapshot?: PriceMode;
  public_unit_price_snapshot?: number | null;
  customer_note?: string | null;
}

export interface Quote {
  id: string;
  protocol: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  store_preference?: string | null;
  notes?: string | null;
  status?: string;
  public_total_estimate?: number | null;
  created_at: string;
  items?: QuoteItem[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  cover_image?: string;
  published_at: string;
  author_name?: string;
  category?: string;
  read_time_minutes?: number;
}

export interface Review {
  id: string;
  author_name: string;
  author_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
  location?: string;
  verified_purchase?: boolean;
}

export interface FilterState {
  categorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  attributes?: Record<string, string[]>;
}
