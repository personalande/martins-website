-- ============================================================================
-- 013_quote_items.sql
-- Items attached to quote requests with immutable snapshots
-- ============================================================================

CREATE TABLE public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    product_name_snapshot TEXT NOT NULL,
    variant_title_snapshot TEXT,
    sku_snapshot TEXT,
    unit_snapshot TEXT NOT NULL DEFAULT 'un',
    quantity NUMERIC(10, 2) NOT NULL DEFAULT 1.00,
    unit_price_quoted NUMERIC(10, 2),
    total_price_quoted NUMERIC(10, 2),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
