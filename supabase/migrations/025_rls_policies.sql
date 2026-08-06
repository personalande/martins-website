-- ============================================================================
-- 025_rls_policies.sql
-- Complete Row Level Security (RLS) policies for all tables
-- ============================================================================

-- Enable RLS on ALL tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_private_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variant_private_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_category_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_product_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper security functions
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role AS $$
DECLARE
    u_role public.user_role;
BEGIN
    SELECT role INTO u_role
    FROM public.profiles
    WHERE id = auth.uid();
    
    RETURN COALESCE(u_role, 'visitor'::public.user_role);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_catalog_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.get_user_role() IN ('catalog_admin'::public.user_role, 'super_admin'::public.user_role);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.get_user_role() = 'super_admin'::public.user_role;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ============================================================================
-- 1. PROFILES POLICIES
-- ============================================================================
CREATE POLICY "Profiles self view"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_catalog_admin());

CREATE POLICY "Profiles self update"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id OR public.is_super_admin())
    WITH CHECK (
        (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()))
        OR public.is_super_admin()
    );

CREATE POLICY "Super admin full profiles management"
    ON public.profiles FOR ALL
    USING (public.is_super_admin());

-- ============================================================================
-- 2. STORES POLICIES
-- ============================================================================
CREATE POLICY "Public read active stores"
    ON public.stores FOR SELECT
    USING (is_active = true OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage stores"
    ON public.stores FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 3. CATEGORIES POLICIES
-- ============================================================================
CREATE POLICY "Public read active categories"
    ON public.categories FOR SELECT
    USING (is_active = true OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage categories"
    ON public.categories FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 4. BRANDS POLICIES
-- ============================================================================
CREATE POLICY "Public read active brands"
    ON public.brands FOR SELECT
    USING (is_active = true OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage brands"
    ON public.brands FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 5. PRODUCTS POLICIES
-- ============================================================================
CREATE POLICY "Public read active products"
    ON public.products FOR SELECT
    USING ((is_active = true AND is_archived = false) OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage products"
    ON public.products FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 6. PRODUCT PRIVATE DATA POLICIES (Admin Only)
-- ============================================================================
CREATE POLICY "Catalog admins view product private data"
    ON public.product_private_data FOR SELECT
    USING (public.is_catalog_admin());

CREATE POLICY "Catalog admins manage product private data"
    ON public.product_private_data FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 7. PRODUCT IMAGES POLICIES
-- ============================================================================
CREATE POLICY "Public read product images"
    ON public.product_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.products p
            WHERE p.id = product_id
              AND ((p.is_active = true AND p.is_archived = false) OR public.is_catalog_admin())
        )
    );

CREATE POLICY "Catalog admins manage product images"
    ON public.product_images FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 8. PRODUCT VARIANTS POLICIES
-- ============================================================================
CREATE POLICY "Public read active variants"
    ON public.product_variants FOR SELECT
    USING (is_active = true OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage variants"
    ON public.product_variants FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 9. VARIANT PRIVATE DATA POLICIES (Admin Only)
-- ============================================================================
CREATE POLICY "Catalog admins view variant private data"
    ON public.variant_private_data FOR SELECT
    USING (public.is_catalog_admin());

CREATE POLICY "Catalog admins manage variant private data"
    ON public.variant_private_data FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 10. STORE INVENTORY POLICIES (Admin Only)
-- ============================================================================
CREATE POLICY "Catalog admins view store inventory"
    ON public.store_inventory FOR SELECT
    USING (public.is_catalog_admin());

CREATE POLICY "Catalog admins manage store inventory"
    ON public.store_inventory FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 11. QUOTES POLICIES
-- ============================================================================
CREATE POLICY "Public guest insert quotes"
    ON public.quotes FOR INSERT
    WITH CHECK (auth.uid() IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users read own quotes"
    ON public.quotes FOR SELECT
    USING (auth.uid() = user_id OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage quotes"
    ON public.quotes FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 12. QUOTE ITEMS POLICIES
-- ============================================================================
CREATE POLICY "Public guest insert quote items"
    ON public.quote_items FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.quotes q
            WHERE q.id = quote_id
        )
    );

CREATE POLICY "Users read own quote items"
    ON public.quote_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.quotes q
            WHERE q.id = quote_id
              AND (q.user_id = auth.uid() OR public.is_catalog_admin())
        )
    );

CREATE POLICY "Catalog admins manage quote items"
    ON public.quote_items FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 13. QUOTE ADMIN NOTES POLICIES (Admin Only)
-- ============================================================================
CREATE POLICY "Catalog admins view quote admin notes"
    ON public.quote_admin_notes FOR SELECT
    USING (public.is_catalog_admin());

CREATE POLICY "Catalog admins manage quote admin notes"
    ON public.quote_admin_notes FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 14. REVIEWS POLICIES
-- ============================================================================
CREATE POLICY "Public read approved reviews"
    ON public.reviews FOR SELECT
    USING (publication_status = 'APPROVED' OR auth.uid() = user_id OR public.is_catalog_admin());

CREATE POLICY "Anyone insert review"
    ON public.reviews FOR INSERT
    WITH CHECK (
        publication_status = 'PENDING'
        AND (user_id IS NULL OR user_id = auth.uid())
    );

CREATE POLICY "Catalog admins manage reviews"
    ON public.reviews FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 15. POSTS POLICIES
-- ============================================================================
CREATE POLICY "Public read published posts"
    ON public.posts FOR SELECT
    USING (status = 'PUBLISHED' OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage posts"
    ON public.posts FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 16. POST CATEGORIES & LINKS POLICIES
-- ============================================================================
CREATE POLICY "Public read post categories"
    ON public.post_categories FOR SELECT USING (true);

CREATE POLICY "Catalog admins manage post categories"
    ON public.post_categories FOR ALL USING (public.is_catalog_admin());

CREATE POLICY "Public read post category links"
    ON public.post_category_links FOR SELECT USING (true);

CREATE POLICY "Catalog admins manage post category links"
    ON public.post_category_links FOR ALL USING (public.is_catalog_admin());

CREATE POLICY "Public read post product links"
    ON public.post_product_links FOR SELECT USING (true);

CREATE POLICY "Catalog admins manage post product links"
    ON public.post_product_links FOR ALL USING (public.is_catalog_admin());

-- ============================================================================
-- 17. FAVORITES POLICIES
-- ============================================================================
CREATE POLICY "Users read own favorites"
    ON public.favorites FOR SELECT
    USING (auth.uid() = user_id OR public.is_catalog_admin());

CREATE POLICY "Users insert own favorite"
    ON public.favorites FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own favorite"
    ON public.favorites FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- 18. CONTACT REQUESTS POLICIES
-- ============================================================================
CREATE POLICY "Anyone insert contact request"
    ON public.contact_requests FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Catalog admins view contact requests"
    ON public.contact_requests FOR SELECT
    USING (public.is_catalog_admin());

CREATE POLICY "Catalog admins manage contact requests"
    ON public.contact_requests FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 19. SITE SETTINGS POLICIES
-- ============================================================================
CREATE POLICY "Public read public settings"
    ON public.site_settings FOR SELECT
    USING (is_public = true OR public.is_catalog_admin());

CREATE POLICY "Catalog admins manage site settings"
    ON public.site_settings FOR ALL
    USING (public.is_catalog_admin());

-- ============================================================================
-- 20. MEDIA ASSETS POLICIES
-- ============================================================================
CREATE POLICY "Public read media assets"
    ON public.media_assets FOR SELECT USING (true);

CREATE POLICY "Catalog admins manage media assets"
    ON public.media_assets FOR ALL USING (public.is_catalog_admin());

-- ============================================================================
-- 21. AUDIT LOGS POLICIES (Super Admin Only)
-- ============================================================================
CREATE POLICY "Super admins view audit logs"
    ON public.audit_logs FOR SELECT
    USING (public.is_super_admin());

CREATE POLICY "Super admins insert audit logs"
    ON public.audit_logs FOR INSERT
    WITH CHECK (public.is_super_admin());
