import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
}

export default function CookiesPage() {
  return (
    <main>
      <div style={{ background: 'var(--martins-blue-950)', padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', textTransform: 'uppercase', color: 'var(--martins-white)' }}>
          Política de Cookies
        </h1>
      </div>
      
      <div className="container" style={{ padding: 'var(--space-3xl) 0', maxWidth: '800px' }}>
         <div style={{ color: 'var(--martins-graphite)', lineHeight: '1.7' }}>
            <p style={{ marginBottom: 'var(--space-md)' }}>A Ferragens Martins utiliza cookies apenas para o funcionamento essencial do site. Abaixo explicamos como eles são usados.</p>
            
            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>O que são cookies?</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Cookies são pequenos arquivos de texto armazenados no seu navegador que nos ajudam a manter a funcionalidade do site enquanto você navega por ele.</p>

            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>Como usamos cookies?</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Utilizamos cookies de armazenamento local (Local Storage) **exclusivamente** para manter a sua lista de itens do Orçamento (Carrinho de Orçamentos) salva no seu próprio dispositivo. Isso permite que você navegue pelo nosso catálogo, adicione produtos e retorne depois sem perder a sua seleção.</p>
            
            <h2 style={{ fontSize: '1.2rem', color: 'var(--martins-blue-950)', marginTop: 'var(--space-xl)', marginBottom: 'var(--space-sm)' }}>Rastreamento</h2>
            <p style={{ marginBottom: 'var(--space-md)' }}>Não utilizamos cookies de terceiros para marketing, rastreamento comportamental ou anúncios (como Facebook Pixel ou Google Ads). As ferramentas analíticas básicas (se ativas) operam de forma anônima.</p>
         </div>
      </div>
    </main>
  )
}
