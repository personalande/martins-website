-- ============================================================================
-- 007_product_private.sql
-- Private product data table (Cost, SKU, Supplier info, Internal notes - Admin Only)
-- ============================================================================

CREATE TABLE public.product_private_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT,
    cost_price NUMERIC(10, 2),
    supplier_name TEXT,
    supplier_code TEXT,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_product_private_data_updated_at
    BEFORE UPDATE ON public.product_private_data
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
