-- ============================================================================
-- 008_product_images.sql
-- Product images gallery table
-- ============================================================================

CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    url TEXT,
    alt_text TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_product_images_updated_at
    BEFORE UPDATE ON public.product_images
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
