# Guia de Implantação (Deployment)

O site da Ferragens Martins está estruturado para ser hospedado de forma rápida e eficiente na plataforma **Vercel** ou similar com suporte para aplicações Next.js.

## 1. Conectando o Repositório à Vercel

1. Acesse o painel da [Vercel](https://vercel.com).
2. Clique em **Add New...** -> **Project**.
3. Importe o repositório git do projeto.
4. No passo de configuração, certifique-se de que o framework está detectado como **Next.js**.

## 2. Configurando Variáveis de Ambiente

No painel de configurações do projeto na Vercel, adicione as seguintes variáveis de ambiente essenciais (conforme `.env.example`):

| Nome da Variável | Descrição |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de API do projeto no painel do Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública anônima do Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service_role secreta (usada apenas no servidor para operações com bypass RLS). |
| `NEXT_PUBLIC_SITE_URL` | URL final do site (ex: `https://www.ferragensmartins.com.br`). |

## 3. Configurando a Revalidação sob Demanda (ISR)

Para garantir que novos produtos adicionados no painel admin apareçam instantaneamente no catálogo sem requisições constantes ao banco de dados em cada visita do cliente, configuramos revalidação de caminhos:
- Ao criar/editar um produto no admin, o painel envia uma requisição `POST` para a API `/api/revalidate`.
- Adicione a variável `REVALIDATE_SECRET_TOKEN` tanto nas configurações da Vercel quanto do Supabase para segurança do endpoint.
