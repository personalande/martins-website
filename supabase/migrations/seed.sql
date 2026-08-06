-- ============================================================================
-- seed.sql
-- Development seed data for Ferragens Martins
-- IMPORTANT: All fictitious data includes "DEMONSTRAÇÃO" - NO real prices, NO real stock.
-- ============================================================================

-- 1. STORES (Real data for Loja 1 and Loja 2)
INSERT INTO public.stores (
    id, name, slug, address, number, complement, neighborhood, city, state, postal_code, phone, whatsapp, email, latitude, longitude, opening_hours, is_active, is_main
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'Ferragens Martins — Vila São Vicente',
    'vila-sao-vicente',
    'Av. Gen. Ivan Jejuhy Afonso da Costa',
    '653',
    '374',
    'Vila São Vicente',
    'Paranaguá',
    'PR',
    '83209-570',
    '(41) 9 9255-7256',
    '5541992557256',
    'contato.sv@ferragensmartins.com.br',
    -25.52841000,
    -48.52891000,
    '{"segunda_sexta": "08:00 - 18:00", "sabado": "08:00 - 12:00", "domingo": "Fechado"}'::jsonb,
    true,
    true
),
(
    '00000000-0000-0000-0000-000000000002',
    'Ferragens Martins — Vila Itiberê',
    'vila-itibere',
    'Av. Gov. Bento Munhoz da Rocha Neto',
    '77',
    NULL,
    'Vila Itiberê',
    'Paranaguá',
    'PR',
    '83209-000',
    '(41) 9 8900-1321',
    '5541989001321',
    'contato.itibere@ferragensmartins.com.br',
    -25.53120000,
    -48.51980000,
    '{"segunda_sexta": "08:00 - 18:00", "sabado": "08:00 - 12:00", "domingo": "Fechado"}'::jsonb,
    true,
    false
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, address = EXCLUDED.address, phone = EXCLUDED.phone, whatsapp = EXCLUDED.whatsapp;

-- 2. CATEGORIES (14 categories)
INSERT INTO public.categories (id, name, slug, description, sort_order, is_active) VALUES
('10000000-0000-0000-0000-000000000001', 'Ferragens', 'ferragens', 'Fechaduras, dobradiças, trilhos e suportes', 1, true),
('10000000-0000-0000-0000-000000000002', 'Ferramentas', 'ferramentas', 'Ferramentas manuais e elétricas para profissionais', 2, true),
('10000000-0000-0000-0000-000000000003', 'Fixação', 'fixacao', 'Parafusos, buchas, pregos e arruelas', 3, true),
('10000000-0000-0000-0000-000000000004', 'Hidráulica', 'hidraulica', 'Tubos, conexões, torneiras e registros', 4, true),
('10000000-0000-0000-0000-000000000005', 'Elétrica', 'eletrica', 'Fios, cabos, disjuntores, tomadas e lâmpadas', 5, true),
('10000000-0000-0000-0000-000000000006', 'Pintura', 'pintura', 'Tintas, pincéis, rolos, seladores e lixas', 6, true),
('10000000-0000-0000-0000-000000000007', 'Abrasivos', 'abrasivos', 'Discos de corte, desbaste e lixas de alto rendimento', 7, true),
('10000000-0000-0000-0000-000000000008', 'Vedação', 'vedacao', 'Silicones, selantes, fitas veda rosca e espuma expansiva', 8, true),
('10000000-0000-0000-0000-000000000009', 'Portas e Fechaduras', 'portas-e-fechaduras', 'Fechaduras residenciais, travas e cadeados', 9, true),
('10000000-0000-0000-0000-000000000010', 'Telhados e Calhas', 'telhados-e-calhas', 'Mantas, calhas e acessórios de fixação para telhados', 10, true),
('10000000-0000-0000-0000-000000000011', 'Material de Construção', 'material-de-construcao', 'Argamassas, cimentos e aditivos', 11, true),
('10000000-0000-0000-0000-000000000012', 'EPI', 'epi', 'Equipamentos de proteção individual e segurança', 12, true),
('10000000-0000-0000-0000-000000000013', 'Madeira', 'madeira', 'Acessórios e produtos para tratamento de madeira', 13, true),
('10000000-0000-0000-0000-000000000014', 'Jardim', 'jardim', 'Mangueiras, conectores e ferramentas para jardinagem', 14, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. BRANDS (5 sample brands marked DEMONSTRAÇÃO)
INSERT INTO public.brands (id, name, slug, description, is_featured, is_active) VALUES
('20000000-0000-0000-0000-000000000001', 'Bosch DEMONSTRAÇÃO', 'bosch-demonstracao', 'Linha de ferramentas elétricas - DEMONSTRAÇÃO', true, true),
('20000000-0000-0000-0000-000000000002', 'Makita DEMONSTRAÇÃO', 'makita-demonstracao', 'Ferramentas de alta performance - DEMONSTRAÇÃO', true, true),
('20000000-0000-0000-0000-000000000003', 'Tramontina DEMONSTRAÇÃO', 'tramontina-demonstracao', 'Ferramentas manuais e organizadores - DEMONSTRAÇÃO', true, true),
('20000000-0000-0000-0000-000000000004', 'Tigre DEMONSTRAÇÃO', 'tigre-demonstracao', 'Soluções em tubos e conexões - DEMONSTRAÇÃO', true, true),
('20000000-0000-0000-0000-000000000005', 'Suvinil DEMONSTRAÇÃO', 'suvinil-demonstracao', 'Tintas e complementos de pintura - DEMONSTRAÇÃO', true, true)
ON CONFLICT (slug) DO NOTHING;

-- 4. SAMPLE PRODUCTS (10 products with NO price, price_mode=HIDDEN, marked DEMONSTRAÇÃO)
INSERT INTO public.products (
    id, category_id, brand_id, name, slug, summary, description, price_mode, public_price, unit, is_featured, is_active
) VALUES
(
    '30000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    'Furadeira de Impacto 1/2" DEMONSTRAÇÃO',
    'furadeira-de-impacto-1-2-demonstracao',
    'Produto modelo para demonstração de catálogo',
    'Furadeira de impacto de alta precisão para trabalhos pesados. Item de demonstração.',
    'HIDDEN',
    NULL,
    'un',
    true,
    true
),
(
    '30000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000003',
    'Jogo de Chaves Combinadas DEMONSTRAÇÃO',
    'jogo-de-chaves-combinadas-demonstracao',
    'Jogo com 12 peças em aço cromo vanádio DEMONSTRAÇÃO',
    'Jogo de chaves para manutenção industrial e residencial. Item de demonstração.',
    'HIDDEN',
    NULL,
    'cx',
    true,
    true
),
(
    '30000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000003',
    NULL,
    'Parafuso Sextavado Inox DEMONSTRAÇÃO',
    'parafuso-sextavado-inox-demonstracao',
    'Parafuso em aço inox resistente à corrosão DEMONSTRAÇÃO',
    'Parafuso sextavado para ambientes litorâneos e industriais. Item de demonstração.',
    'HIDDEN',
    NULL,
    'cento',
    false,
    true
),
(
    '30000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000004',
    'Tubo PVC Esgoto 100mm DEMONSTRAÇÃO',
    'tubo-pvc-esgoto-100mm-demonstracao',
    'Tubo de PVC para instalações prediais de esgoto DEMONSTRAÇÃO',
    'Tubo predial de alta resistência para esgoto e águas pluviais. Item de demonstração.',
    'HIDDEN',
    NULL,
    'barra',
    true,
    true
),
(
    '30000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000005',
    NULL,
    'Fio Flexível 2,5mm² DEMONSTRAÇÃO',
    'fio-flexivel-2-5mm-demonstracao',
    'Rolo de cabo elétrico flexível 750V DEMONSTRAÇÃO',
    'Cabo elétrico cobre flexível isolamento PVC. Item de demonstração.',
    'HIDDEN',
    NULL,
    'rolo',
    true,
    true
),
(
    '30000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0000-000000000005',
    'Tinta Acrílica Premium DEMONSTRAÇÃO',
    'tinta-acrilica-premium-demonstracao',
    'Tinta acrílica de alta cobertura para exteriores DEMONSTRAÇÃO',
    'Tinta acrílica fosca lavável com acabamento aveludado. Item de demonstração.',
    'HIDDEN',
    NULL,
    'galao',
    false,
    true
),
(
    '30000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000007',
    '20000000-0000-0000-0000-000000000002',
    'Disco de Corte 4.1/2" DEMONSTRAÇÃO',
    'disco-de-corte-4-1-2-demonstracao',
    'Disco para corte de inóx e metal rápido DEMONSTRAÇÃO',
    'Disco abrasivo reforçado com telas de fibra de vidro. Item de demonstração.',
    'HIDDEN',
    NULL,
    'pt',
    false,
    true
),
(
    '30000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000004',
    '20000000-0000-0000-0000-000000000004',
    'Sifão Sanfonado Universal DEMONSTRAÇÃO',
    'sifao-sanfonado-universal-demonstracao',
    'Sifão extensível universal em polipropileno DEMONSTRAÇÃO',
    'Sifão universal sanfonado resistente a água quente e fria. Item de demonstração.',
    'HIDDEN',
    NULL,
    'un',
    false,
    true
),
(
    '30000000-0000-0000-0000-000000000009',
    '10000000-0000-0000-0000-000000000009',
    NULL,
    'Fechadura para Porta Externa DEMONSTRAÇÃO',
    'fechadura-para-porta-externa-demonstracao',
    'Fechadura de espelho inox com cilindro DEMONSTRAÇÃO',
    'Fechadura de alta segurança para portas de entrada. Item de demonstração.',
    'HIDDEN',
    NULL,
    'un',
    true,
    true
),
(
    '30000000-0000-0000-0000-000000000010',
    '10000000-0000-0000-0000-000000000012',
    NULL,
    'Botina de Segurança com Bico de Aço DEMONSTRAÇÃO',
    'botina-de-seguranca-com-bico-de-aco-demonstracao',
    'Calçado ocupacional de couro com biqueira de aço DEMONSTRAÇÃO',
    'Botina em couro legítimo solado PU bidensidade. Item de demonstração.',
    'HIDDEN',
    NULL,
    'par',
    false,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- 5. DEFAULT SITE SETTINGS
INSERT INTO public.site_settings (key, value, description, is_public) VALUES
('company_info', '{"name": "Ferragens Martins", "tagline": "Tradição e Variedade em Ferragens e Materiais em Paranaguá", "cnpj": "00.000.000/0001-00"}'::jsonb, 'Informações institucionais da empresa', true),
('contact_channels', '{"whatsapp_primary": "5541992557256", "whatsapp_secondary": "5541989001321", "email_contact": "contato@ferragensmartins.com.br"}'::jsonb, 'Canais oficiais de atendimento', true),
('header_announcement', '{"text": "Atendendo Paranaguá com 2 lojas físicas! Faça sua cotação online sem compromisso.", "is_active": true}'::jsonb, 'Barra de avisos do cabeçalho', true)
ON CONFLICT (key) DO UPDATE
SET value = EXCLUDED.value, is_public = EXCLUDED.is_public;
