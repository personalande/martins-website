-- ============================================================================
-- 016_posts.sql
-- Blog posts table with markdown content and SEO metadata
-- ============================================================================

CREATE TYPE post_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content_markdown TEXT NOT NULL,
    cover_image_url TEXT,
    status post_status NOT NULL DEFAULT 'DRAFT',
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    view_count INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
