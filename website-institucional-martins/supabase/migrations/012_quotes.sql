-- ============================================================================
-- 012_quotes.sql
-- Quotes requests table
-- ============================================================================

CREATE TYPE quote_status AS ENUM (
    'PENDING',
    'IN_ANALYSIS',
    'ANSWERED',
    'APPROVED',
    'REJECTED',
    'EXPIRED',
    'CANCELLED'
);

CREATE TABLE public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_cpf_cnpj TEXT,
    preferred_store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL,
    status quote_status NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    total_estimated NUMERIC(10, 2),
    is_archived BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_quotes_updated_at
    BEFORE UPDATE ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- Function to generate protocol number FM-YYYYMMDD-XXXX
CREATE OR REPLACE FUNCTION generate_quote_protocol()
RETURNS TRIGGER AS $$
DECLARE
    today_str TEXT;
    seq_val INT;
    new_protocol TEXT;
BEGIN
    today_str := TO_CHAR(NOW(), 'YYYYMMDD');
    
    -- Count quotes created today to construct sequential number
    SELECT COUNT(*) + 1 INTO seq_val
    FROM public.quotes
    WHERE TO_CHAR(created_at, 'YYYYMMDD') = today_str;

    new_protocol := 'FM-' || today_str || '-' || LPAD(seq_val::TEXT, 4, '0');
    
    -- Ensure uniqueness in case of race condition
    WHILE EXISTS (SELECT 1 FROM public.quotes WHERE protocol = new_protocol) LOOP
        seq_val := seq_val + 1;
        new_protocol := 'FM-' || today_str || '-' || LPAD(seq_val::TEXT, 4, '0');
    END LOOP;

    NEW.protocol := new_protocol;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_quotes_generate_protocol
    BEFORE INSERT ON public.quotes
    FOR EACH ROW
    WHEN (NEW.protocol IS NULL OR NEW.protocol = '')
    EXECUTE FUNCTION generate_quote_protocol();
