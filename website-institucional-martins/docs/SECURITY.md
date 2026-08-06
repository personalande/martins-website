# Segurança e Controle de Acesso

O site Ferragens Martins utiliza políticas robustas no nível do banco de dados (Row Level Security - RLS) do Supabase para garantir a proteção de dados confidenciais e a privacidade dos usuários.

## 1. Níveis de Acesso (Roles)

Definimos três tipos principais de usuários:

1. **Clientes Anonimos / Visitantes**:
   - Permissão apenas de leitura (`SELECT`) em tabelas públicas como `categories` e `products` (desde que publicadas: `is_published = true`).
   - Não podem visualizar tabelas de orçamentos de outros usuários ou tabelas administrativas.
2. **Clientes Autenticados**:
   - Podem ler seus próprios perfis em `profiles` e consultar apenas os seus próprios orçamentos em `quotes`.
3. **Administradores / Staff (`role = 'admin'` ou `'staff'`)**:
   - Acesso irrestrito de leitura e escrita (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) em todas as tabelas, incluindo catálogos de produtos e orçamentos gerais.

## 2. Row Level Security (RLS) no PostgreSQL

As políticas são definidas na tabela diretamente no banco de dados para evitar violações caso o cliente tente fazer requisições diretas via SDK do Supabase.

### Exemplo de Política para Orçamentos (`quotes`)
- **Leitura**: Permite apenas se a coluna `user_id` corresponder ao ID do usuário autenticado no momento, ou se o usuário autenticado for um administrador.
  ```sql
  CREATE POLICY "Users can read own quotes" ON quotes 
  FOR SELECT USING (
    auth.uid() = user_id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'staff')
  );
  ```

## 3. Segurança nas APIs e Uploads
- Todas as rotas de API protegidas em `/api/admin/*` validam o perfil do usuário chamando o Supabase Server Client para ler a `role` e barrar o acesso caso o usuário não seja autorizado (Status 403 Forbidden).
- Os uploads de mídia em `/api/admin/upload` são restritos a imagens JPG, PNG e WEBP, validando o tipo MIME do arquivo no servidor para evitar execução arbitrária de código.
