# Guia do Administrador

Este guia serve como orientação para o gerenciamento diário do catálogo de produtos e dos orçamentos recebidos.

## 1. Acesso ao Painel Administrativo

1. Acesse a URL: `/entrar`.
2. Faça login com suas credenciais de administrador.
3. Se sua conta possuir privilégios de administrador ou staff, você será redirecionado para a área administrativa em `/admin`.

## 2. Gerenciando o Catálogo de Produtos

### Adicionar ou Editar um Produto
1. No menu lateral, acesse **Produtos**.
2. Clique no botão **+ Novo Produto** para criar, ou selecione **Editar** ao lado de um produto na lista.
3. Preencha os campos obrigatórios:
   - **Nome**: Nome exibido no catálogo.
   - **Código Público**: Código de referência da loja (ex: `FIX-105`).
   - **Modo do Preço**:
     - *Exato*: Mostra o preço final (ex: R$ 10,00). O preço entra na somatória estimada do orçamento.
     - *A partir de*: Útil para produtos com variantes de preço (ex: "A partir de R$ 5,00").
     - *Sob consulta*: Esconde o preço no site e força o cliente a perguntar.
     - *Escondido*: Não exibe nenhum preço ou botão de solicitação direta de preço, apenas a opção de orçamento geral.
4. Salve o produto. O sistema gerará o `slug` de URL automaticamente.

## 3. Processando Orçamentos

Quando um cliente finaliza um orçamento:
1. Um registro é gerado no banco de dados e pode ser visualizado em **Orçamentos** no Painel Admin.
2. O cliente envia uma mensagem preenchida para o WhatsApp da sua loja.
3. **Ação recomendada**:
   - Abra o painel administrativo.
   - Localize o orçamento pelo **Protocolo** informado na mensagem do cliente.
   - Valide os itens, calcule os descontos adicionais no painel e altere o status do orçamento para **Respondido**.
   - Você pode gerar um PDF oficial do orçamento para enviar ao cliente se necessário.
