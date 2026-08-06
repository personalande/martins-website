# Arquitetura do Sistema

Este documento descreve as decisões arquiteturais adotadas no desenvolvimento do site Ferragens Martins.

## 1. Fluxo de Renderização (Next.js 15 App Router)

Adotamos uma abordagem híbrida visando SEO excelente e máxima performance:

- **Server Components (RSC)**: Por padrão, a maioria das páginas (Home, Sobre, Produto, Lojas, Blog) são renderizadas no servidor. Isso melhora a velocidade de carregamento inicial (First Contentful Paint) e permite a geração dinâmica de metadados SEO.
- **Client Components (RCC)**: Utilizados apenas onde a interatividade do usuário é necessária:
  - Formulação de contato (`/contato`).
  - Menu mobile e carrinho de orçamentos (`SiteHeader`, `Navigation`, `QuoteDrawer`).
  - Filtros interativos do catálogo (`/catalogo`).

## 2. Gerenciamento de Estado (Carrinho de Orçamentos)

O carrinho de orçamentos é gerenciado localmente pelo `QuoteContext.tsx` usando a API Context do React.
- **Persistência**: Os itens selecionados são salvos automaticamente no `localStorage` do navegador do usuário sob a chave `fm_quote`.
- **Preços dinâmicos**: Apenas produtos com `price_mode = 'EXACT'` têm seus valores calculados no total do orçamento. Outros produtos exibem avisos de "Preço sob consulta" ou "Valor a confirmar".

## 3. Integração com WhatsApp

Em vez de processar pagamentos ou e-commerce complexo, o fechamento do orçamento é baseado em mensagens de WhatsApp:
1. O usuário monta o carrinho de orçamentos no site.
2. Ao finalizar, preenche um formulário básico (nome, telefone, preferências).
3. O sistema cria um registro no banco de dados Supabase e gera um protocolo identificador (`FM-YYYYMMDD-XXXXX`).
4. Um link pré-preenchido do WhatsApp é gerado com a mensagem contendo o protocolo, nome do cliente e a lista detalhada de produtos.
5. O usuário clica e é redirecionado diretamente para o chat de atendimento da loja preferida (Loja 1 ou Loja 2) com o atendente já ciente do pedido.

## 4. Backend Serverless (API Routes)

Toda a lógica de servidor roda em API Routes do Next.js hospedadas no ambiente serverless (Vercel):
- `/api/quotes`: Criação e listagem de orçamentos.
- `/api/catalog/search`: Filtros e buscas de produtos com suporte a paginação.
- `/api/contact`: Recebimento de formulários de contato institucionais.
