import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fale Conosco',
  description: 'Entre em contato com a Ferragens Martins. Visite nossas lojas em Paranaguá ou envie uma mensagem.',
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children
}
