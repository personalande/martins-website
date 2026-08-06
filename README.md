# Ferragens Martins Website

Website institucional e catálogo online de produtos com carrinho de orçamentos integrado ao WhatsApp para a **Ferragens Martins** em Paranaguá/PR.

## Tecnologia Utilizada

- **Framework**: Next.js 15 (App Router, React 19)
- **Banco de Dados & Autenticação**: Supabase
- **Estilização**: Vanilla CSS Modules (Tokens definidos globalmente em `src/app/globals.css`)
- **Validação de Formulários**: Zod + React Hook Form
- **Geração de PDF**: `@react-pdf/renderer`
- **Testes**: Vitest (Unitários) e Playwright (E2E)

## Estrutura de Pastas

- `/src/app`: Páginas públicas, área do cliente (`/conta`), painel administrativo (`/admin`) e API Routes (`/api`).
- `/src/components`: Componentes compartilhados divididos por categorias (`ui`, `layout`, `catalog`, `quote`, `admin`).
- `/src/context`: Gerenciador de estado do carrinho de orçamentos (`QuoteContext.tsx`).
- `/src/lib`: Utilitários auxiliares, esquemas de validação, integração Supabase, WhatsApp e PDFs.
- `/supabase`: Estruturas do banco de dados (migrations, schemas, seed).
- `/tests`: Suíte de testes unitários e de integração E2E.

## Configuração do Ambiente

1. Copie o arquivo `.env.example` para `.env.local` e configure suas chaves do Supabase:
   ```bash
   cp .env.example .env.local
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento em `localhost:3000`.
- `pnpm build`: Gera a build de produção do Next.js.
- `pnpm lint`: Executa a verificação estática do ESLint.
- `pnpm test`: Executa os testes unitários via Vitest.
- `pnpm test:e2e`: Executa os testes de ponta a ponta via Playwright.

## Documentação Completa

Para detalhes de arquitetura, banco de dados e guias, consulte a pasta `/docs`:
- [Arquitetura](docs/ARCHITECTURE.md)
- [Banco de Dados](docs/DATABASE.md)
- [Segurança e Permissões](docs/SECURITY.md)
- [Guia do Administrador](docs/ADMIN_GUIDE.md)
- [Implantação / Deployment](docs/DEPLOYMENT.md)
- [Checklist de Lançamento](docs/LAUNCH_CHECKLIST.md)
