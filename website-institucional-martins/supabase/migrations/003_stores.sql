-- ============================================================================
-- 003_stores.sql
-- Stores table for store locations and contact details
-- ============================================================================

CREATE TABLE public.stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    number TEXT,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Paranaguá',
    state TEXT NOT NULL DEFAULT 'PR',
    postal_code TEXT NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    email TEXT,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    opening_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_main BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_stores_updated_at
    BEFORE UPDATE ON public.stores
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
