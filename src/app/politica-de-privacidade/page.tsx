import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
}

export default function PoliticaPrivacidadePage() {
  return (
    <main>
      <div style={{ background: 'var(--martins-blue-950)', padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', textTransform: 'uppercase', color: 'var(--martins-white)' }}>
          Política de Privacidade
        </h1>
      </div>
      
      <div className="container" style={{ padding: 'var(--space-3xl) 0', maxWidth: '800px' }}>
         <div style={{ padding: 'var(--space-xl)', background: 'var(--martins-paper)', border: '2px dashed var(--martins-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-sm)' }}>CONTENT_REQUIRED</span>
            <p style={{ color: 'var(--martins-steel)' }}>
               O texto legal completo desta política deve ser fornecido pela equipe jurídica da Ferragens Martins e inserido no painel administrativo.
            </p>
         </div>

         <div style={{ color: 'var(--martins-graphite)', lineHeight: '1.7' }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>A Ferragens Martins valoriza a privacidade dos seus clientes e usuários. Esta política descreve, em linhas gerais, como tratamos as informações pessoais que podemos coletar ao utilizar nosso site para orçamento e contato.</p>
            
            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>1. Informações Coletadas</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Ao solicitar um orçamento ou enviar uma mensagem de contato, podemos solicitar seu nome, telefone e endereço de e-mail. Estes dados são utilizados exclusivamente para responder à sua solicitação e não são compartilhados com terceiros, exceto quando necessário para processamento (como o redirecionamento para o WhatsApp).</p>

            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>2. Armazenamento</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Armazenamos os dados de orçamentos e mensagens pelo tempo necessário para atender a solicitação do cliente ou para obrigações legais. As informações são mantidas de forma segura em nosso sistema.</p>
            
            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>3. Alterações</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Podemos atualizar esta política ocasionalmente para refletir mudanças em nossas práticas ou por razões legais. A versão mais recente sempre estará disponível nesta página.</p>
         </div>
      </div>
    </main>
  )
}
