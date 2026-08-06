# Modelo do Banco de Dados (Supabase)

O sistema utiliza o Supabase (PostgreSQL) para gerenciar o catálogo de produtos, orçamentos, autenticação e controle de acesso de administradores.

## 1. Esquema Relacional Principal

O banco de dados contém as seguintes tabelas principais:

### Tabela `profiles`
Contém informações estendidas sobre os usuários autenticados.
- `id` (uuid, PK, FK para `auth.users`)
- `full_name` (text)
- `phone` (text)
- `role` (text) · Valores: `'admin'`, `'staff'`, `'customer'`
- `created_at` (timestamptz)

### Tabela `categories`
Categorias do catálogo.
- `id` (uuid, PK)
- `name` (text, unique)
- `slug` (text, unique)
- `icon` (text)
- `description` (text)
- `display_order` (integer)

### Tabela `products`
Produtos disponíveis no catálogo.
- `id` (uuid, PK)
- `category_id` (uuid, FK para `categories`)
- `name` (text)
- `slug` (text, unique)
- `public_code` (text, unique) · Código de referência do produto.
- `brand` (text)
- `short_description` (text)
- `description` (text)
- `price_mode` (text) · Valores: `'EXACT'`, `'FROM'`, `'HIDDEN'`, `'ON_REQUEST'`
- `public_price` (numeric)
- `unit` (text) · Ex: `'un'`, `'cx'`, `'kg'`
- `is_published` (boolean)
- `featured` (boolean)
- `created_at` (timestamptz)

### Tabela `quotes`
Orçamentos solicitados por clientes.
- `id` (uuid, PK)
- `user_id` (uuid, FK para `profiles`, nullable)
- `protocol` (text, unique)
- `customer_name` (text)
- `customer_phone` (text)
- `customer_email` (text)
- `store_preference` (text)
- `customer_notes` (text)
- `status` (text) · Valores: `'PENDING'`, `'ANALYZING'`, `'RESPONDED'`, `'CLOSED'`, `'LOST'`
- `public_total_estimate` (numeric, nullable)
- `created_at` (timestamptz)

### Tabela `quote_items`
Itins associados a cada orçamento.
- `id` (uuid, PK)
- `quote_id` (uuid, FK para `quotes`)
- `product_id` (uuid, FK para `products`)
- `product_name_snapshot` (text)
- `public_code_snapshot` (text)
- `quantity` (integer)
- `public_unit_price_snapshot` (numeric, nullable)
- `line_total_snapshot` (numeric, nullable)
- `price_mode_snapshot` (text)

## 2. Migrações e Sementes (Seed)

Os arquivos SQL correspondentes para criação do banco de dados e dados padrão estão armazenados em:
- `/supabase/migrations/`: Scripts DDL ordenados por versão.
- `/supabase/seed.sql`: Carga de dados iniciais para categorias, marcas e produtos de demonstração.
