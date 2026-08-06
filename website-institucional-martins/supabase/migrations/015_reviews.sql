-- ============================================================================
-- 015_reviews.sql
-- Product reviews table with verification and publication moderation status
-- ============================================================================

CREATE TYPE review_auth_status AS ENUM ('UNVERIFIED', 'VERIFIED_PURCHASER', 'MANUALLY_APPROVED');
CREATE TYPE review_pub_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'HIDDEN');

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    authorization_status review_auth_status NOT NULL DEFAULT 'UNVERIFIED',
    publication_status review_pub_status NOT NULL DEFAULT 'PENDING',
    source TEXT NOT NULL DEFAULT 'WEBSITE',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
