-- ============================================================================
-- 023_indexes.sql
-- Performance B-Tree indexes for Foreign Keys, Slugs, Statuses, and Dates
-- ============================================================================

-- Profiles Indexes
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);

-- Stores Indexes
CREATE INDEX idx_stores_slug ON public.stores(slug);
CREATE INDEX idx_stores_is_active ON public.stores(is_active);
CREATE INDEX idx_stores_is_main ON public.stores(is_main);

-- Categories Indexes
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_categories_is_active ON public.categories(is_active);
CREATE INDEX idx_categories_sort_order ON public.categories(sort_order);

-- Brands Indexes
CREATE INDEX idx_brands_slug ON public.brands(slug);
CREATE INDEX idx_brands_is_active ON public.brands(is_active);
CREATE INDEX idx_brands_is_featured ON public.brands(is_featured);

-- Products Indexes
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_brand_id ON public.products(brand_id);
CREATE INDEX idx_products_price_mode ON public.products(price_mode);
CREATE INDEX idx_products_public_price ON public.products(public_price);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_products_is_archived ON public.products(is_archived);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX idx_products_catalog_filter ON public.products(category_id, is_active, is_archived);

-- Product Private Data Indexes
CREATE INDEX idx_product_private_data_product_id ON public.product_private_data(product_id);
CREATE INDEX idx_product_private_data_sku ON public.product_private_data(sku);

-- Product Images Indexes
CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_is_primary ON public.product_images(product_id, is_primary);
CREATE INDEX idx_product_images_sort_order ON public.product_images(product_id, sort_order);

-- Product Variants Indexes
CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_product_variants_slug ON public.product_variants(slug);
CREATE INDEX idx_product_variants_is_active ON public.product_variants(is_active);

-- Variant Private Data Indexes
CREATE INDEX idx_variant_private_data_variant_id ON public.variant_private_data(variant_id);
CREATE INDEX idx_variant_private_data_barcode ON public.variant_private_data(barcode);
CREATE INDEX idx_variant_private_data_sku ON public.variant_private_data(sku);

-- Store Inventory Indexes
CREATE INDEX idx_store_inventory_store_id ON public.store_inventory(store_id);
CREATE INDEX idx_store_inventory_product_id ON public.store_inventory(product_id);
CREATE INDEX idx_store_inventory_variant_id ON public.store_inventory(variant_id);

-- Quotes Indexes
CREATE INDEX idx_quotes_protocol ON public.quotes(protocol);
CREATE INDEX idx_quotes_user_id ON public.quotes(user_id);
CREATE INDEX idx_quotes_preferred_store ON public.quotes(preferred_store_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_is_archived ON public.quotes(is_archived);
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at DESC);

-- Quote Items Indexes
CREATE INDEX idx_quote_items_quote_id ON public.quote_items(quote_id);
CREATE INDEX idx_quote_items_product_id ON public.quote_items(product_id);
CREATE INDEX idx_quote_items_variant_id ON public.quote_items(variant_id);

-- Quote Admin Notes Indexes
CREATE INDEX idx_quote_admin_notes_quote_id ON public.quote_admin_notes(quote_id);
CREATE INDEX idx_quote_admin_notes_author_id ON public.quote_admin_notes(author_id);

-- Reviews Indexes
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_pub_status ON public.reviews(publication_status);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);
CREATE INDEX idx_reviews_is_featured ON public.reviews(is_featured);

-- Posts Indexes
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);
CREATE INDEX idx_posts_is_featured ON public.posts(is_featured);

-- Post Relations Indexes
CREATE INDEX idx_post_categories_slug ON public.post_categories(slug);
CREATE INDEX idx_post_category_links_cat ON public.post_category_links(category_id);
CREATE INDEX idx_post_product_links_prod ON public.post_product_links(product_id);

-- Favorites Indexes
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_product_id ON public.favorites(product_id);

-- Contact Requests Indexes
CREATE INDEX idx_contact_requests_store_id ON public.contact_requests(store_id);
CREATE INDEX idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON public.contact_requests(created_at DESC);

-- Site Settings Indexes
CREATE INDEX idx_site_settings_is_public ON public.site_settings(is_public);

-- Media Assets Indexes
CREATE INDEX idx_media_assets_storage_path ON public.media_assets(storage_path);
CREATE INDEX idx_media_assets_uploaded_by ON public.media_assets(uploaded_by);

-- Audit Logs Indexes
CREATE INDEX idx_audit_logs_actor_id ON public.audit_logs(actor_id);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
