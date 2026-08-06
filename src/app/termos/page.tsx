import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
}

export default function TermosPage() {
  return (
    <main>
      <div style={{ background: 'var(--martins-blue-950)', padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', textTransform: 'uppercase', color: 'var(--martins-white)' }}>
          Termos de Uso
        </h1>
      </div>
      
      <div className="container" style={{ padding: 'var(--space-3xl) 0', maxWidth: '800px' }}>
         <div style={{ padding: 'var(--space-xl)', background: 'var(--martins-paper)', border: '2px dashed var(--martins-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span style={{ display: 'inline-block', padding: '4px 8px', background: 'var(--martins-yellow-400)', color: 'var(--martins-blue-950)', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-sm)' }}>CONTENT_REQUIRED</span>
            <p style={{ color: 'var(--martins-steel)' }}>
               O texto legal completo destes termos deve ser fornecido pela equipe jurídica da Ferragens Martins e inserido no painel administrativo.
            </p>
         </div>

         <div style={{ color: 'var(--martins-graphite)', lineHeight: '1.7' }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>Bem-vindo ao site da Ferragens Martins. Ao acessar nosso site e solicitar orçamentos, você concorda com nossos termos e condições. Recomendamos que você os leia atentamente.</p>
            
            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>1. Serviços</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>O site atua como um catálogo online para a Ferragens Martins, facilitando o envio de solicitações de orçamento via WhatsApp. Não realizamos vendas diretas, transações financeiras ou reservas de estoque através do site.</p>

            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>2. Preços e Orçamentos</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Os preços exibidos no site, quando disponíveis, servem apenas como referência ("a partir de" ou estimativas). O valor final e as condições de pagamento serão sempre confirmados durante o atendimento, pois podem sofrer variações diárias.</p>
            
            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>3. Responsabilidade</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Nos esforçamos para manter as informações do catálogo precisas e atualizadas. No entanto, não garantimos a disponibilidade imediata de todos os produtos listados, devendo a mesma ser confirmada com nossa equipe.</p>
         </div>
      </div>
    </main>
  )
}
