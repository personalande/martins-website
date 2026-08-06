-- ============================================================================
-- 010_variant_private.sql
-- Private variant data table (Cost, Barcode, SKU - Admin Only)
-- ============================================================================

CREATE TABLE public.variant_private_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID NOT NULL UNIQUE REFERENCES public.product_variants(id) ON DELETE CASCADE,
    cost_price NUMERIC(10, 2),
    barcode TEXT,
    sku TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_variant_private_data_updated_at
    BEFORE UPDATE ON public.variant_private_data
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
