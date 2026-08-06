-- ============================================================================
-- 024_search.sql
-- Full-text search setup: TSVECTOR columns, GIN & Trigram indexes, search functions
-- ============================================================================

-- Portuguese Text Search Configuration with unaccent
CREATE TEXT SEARCH CONFIGURATION portuguese_unaccent (COPY = portuguese);
ALTER TEXT SEARCH CONFIGURATION portuguese_unaccent
    ALTER MAPPING FOR hword, hword_part, word WITH unaccent, portuguese_stem;

-- Generated TSVECTOR column on products
ALTER TABLE public.products
    ADD COLUMN search_vector TSVECTOR
    GENERATED ALWAYS AS (
        setweight(to_tsvector('portuguese_unaccent', COALESCE(name, '')), 'A') ||
        setweight(to_tsvector('portuguese_unaccent', COALESCE(summary, '')), 'B') ||
        setweight(to_tsvector('portuguese_unaccent', COALESCE(description, '')), 'C')
    ) STORED;

-- Generated TSVECTOR column on posts
ALTER TABLE public.posts
    ADD COLUMN search_vector TSVECTOR
    GENERATED ALWAYS AS (
        setweight(to_tsvector('portuguese_unaccent', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('portuguese_unaccent', COALESCE(excerpt, '')), 'B') ||
        setweight(to_tsvector('portuguese_unaccent', COALESCE(content_markdown, '')), 'C')
    ) STORED;

-- Full-Text Search GIN Indexes
CREATE INDEX idx_products_search_vector ON public.products USING GIN(search_vector);
CREATE INDEX idx_posts_search_vector ON public.posts USING GIN(search_vector);

-- Trigram GIN Indexes for fuzzy matching and auto-complete
CREATE INDEX idx_products_name_trgm ON public.products USING GIN(public.unaccent(name) gin_trgm_ops);
CREATE INDEX idx_categories_name_trgm ON public.categories USING GIN(public.unaccent(name) gin_trgm_ops);
CREATE INDEX idx_brands_name_trgm ON public.brands USING GIN(public.unaccent(name) gin_trgm_ops);
CREATE INDEX idx_posts_title_trgm ON public.posts USING GIN(public.unaccent(title) gin_trgm_ops);

-- RPC Function for product search with full-text + trigram fallback & rank scoring
CREATE OR REPLACE FUNCTION search_products(
    search_query TEXT,
    cat_id UUID DEFAULT NULL,
    brand_id_param UUID DEFAULT NULL,
    limit_val INT DEFAULT 20,
    offset_val INT DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    slug TEXT,
    summary TEXT,
    category_id UUID,
    brand_id UUID,
    price_mode price_mode,
    public_price NUMERIC(10, 2),
    unit TEXT,
    is_featured BOOLEAN,
    rank REAL
) AS $$
DECLARE
    formatted_query TSQUERY;
BEGIN
    formatted_query := websearch_to_tsquery('portuguese_unaccent', search_query);

    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.slug,
        p.summary,
        p.category_id,
        p.brand_id,
        p.price_mode,
        p.public_price,
        p.unit,
        p.is_featured,
        ts_rank(p.search_vector, formatted_query) AS rank
    FROM public.products p
    WHERE p.is_active = true
      AND p.is_archived = false
      AND (cat_id IS NULL OR p.category_id = cat_id)
      AND (brand_id_param IS NULL OR p.brand_id = brand_id_param)
      AND (
          p.search_vector @@ formatted_query
          OR public.unaccent(p.name) ILIKE '%' || public.unaccent(search_query) || '%'
      )
    ORDER BY rank DESC, p.is_featured DESC, p.created_at DESC
    LIMIT limit_val OFFSET offset_val;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
