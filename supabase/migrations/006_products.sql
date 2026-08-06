-- ============================================================================
-- 006_products.sql
-- Public products table (Strictly NO cost price, NO stock quantities)
-- ============================================================================

CREATE TYPE price_mode AS ENUM ('EXACT', 'FROM', 'HIDDEN', 'ON_REQUEST');

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    description TEXT,
    specifications JSONB NOT NULL DEFAULT '{}'::jsonb,
    price_mode price_mode NOT NULL DEFAULT 'ON_REQUEST',
    public_price NUMERIC(10, 2),
    unit TEXT NOT NULL DEFAULT 'un',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_archived BOOLEAN NOT NULL DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
