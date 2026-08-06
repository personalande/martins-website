-- ============================================================================
-- 011_inventory.sql
-- Store inventory table (Strictly PRIVATE, internal admin management)
-- ============================================================================

CREATE TABLE public.store_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity_internal INT NOT NULL DEFAULT 0,
    reserved_internal INT NOT NULL DEFAULT 0,
    location_in_store TEXT,
    last_restock_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_inventory_target CHECK (
        (product_id IS NOT NULL AND variant_id IS NULL) OR
        (product_id IS NULL AND variant_id IS NOT NULL) OR
        (product_id IS NOT NULL AND variant_id IS NOT NULL)
    ),
    CONSTRAINT store_inventory_unique_item UNIQUE NULLS NOT DISTINCT (store_id, product_id, variant_id)
);

CREATE TRIGGER trg_store_inventory_updated_at
    BEFORE UPDATE ON public.store_inventory
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
