-- ============================================================================
-- 019_contact_requests.sql
-- Contact form submissions table
-- ============================================================================

CREATE TYPE contact_status AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM');

CREATE TABLE public.contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL,
    status contact_status NOT NULL DEFAULT 'NEW',
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_contact_requests_updated_at
    BEFORE UPDATE ON public.contact_requests
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
