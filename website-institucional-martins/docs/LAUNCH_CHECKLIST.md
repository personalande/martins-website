# Checklist de Lançamento

Utilize esta lista de tarefas como validação final antes de publicar o site em produção com o domínio oficial.

## 1. Configurações Finais de Dados
- [ ] Obter o CNPJ da Ferragens Martins e inseri-lo no rodapé (Footer) e nos arquivos legais de políticas.
- [ ] Obter o e-mail do DPO para a Política de Privacidade.
- [ ] Confirmar os números oficiais do WhatsApp para atendimento das duas lojas no arquivo `src/config/site.ts`.
- [ ] Substituir o logo em texto por imagens reais em formato SVG.

## 2. Homologação de Funcionalidades (Testes Manuais)
- [ ] Simular um fluxo completo de orçamento:
  - Adicionar 3 produtos com preços visíveis e 1 sob consulta.
  - Preencher o formulário final.
  - Validar a abertura do WhatsApp com a mensagem correta contendo o protocolo e lista dos itens.
  - Verificar se o registro do orçamento foi inserido com sucesso na tabela `quotes` no Supabase.
- [ ] Testar os formulários de cadastro e login de novos usuários.
- [ ] Acessar uma página não existente para verificar se a página 404 personalizada é exibida corretamente.

## 3. SEO e Acessibilidade
- [ ] Executar auditoria Lighthouse / DevTools (Acessibilidade, Performance, Melhores Práticas e SEO) nas páginas de produto e catálogo.
- [ ] Validar a leitura e indexação correta dos arquivos `/robots.txt` e `/sitemap.xml`.
