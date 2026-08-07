export const SITE_CONFIG = {
  name: 'Ferragens Martins',
  tagline: 'Da base ao acabamento, a obra não pode parar.',
  description:
    'Ferragens, ferramentas, hidráulica, elétrica, fixação, pintura e materiais para construção e manutenção em Paranaguá - PR. Atendimento especializado em duas lojas.',
  url: process.env['NEXT_PUBLIC_SITE_URL'] || 'https://ferragensmartins.com.br',
  city: 'Paranaguá',
  state: 'PR',
  country: 'BR',

  defaultWhatsapp: process.env['NEXT_PUBLIC_DEFAULT_WHATSAPP'] || '5541984167718',
  defaultPhone: process.env['NEXT_PUBLIC_DEFAULT_PHONE'] || '+55 41 9 8416-7718',

  stores: [
    {
      id: 'store-vila-sao-vicente',
      slug: 'vila-sao-vicente',
      name: 'Ferragens Martins — Vila São Vicente',
      shortName: 'Loja 1 — Vila São Vicente',
      addressLine: 'Av. Gen. Ivan Jejuhy Afonso da Costa, 653, nº 374',
      neighborhood: 'Vila São Vicente',
      city: 'Paranaguá',
      state: 'PR',
      postalCode: '83209-570',
      phone: '+55 41 9 8416-7718',
      whatsapp: '5541984167718',
      hours: {
        weekday: 'Segunda a Sexta: 08:00 às 18:00',
        saturday: 'Sábado: 08:00 às 12:00',
        sunday: 'Domingo e Feriados: Fechado',
      },
      googleMapsUrl:
        'https://www.google.com/maps/place/Av.+Gen.+Ivan+Jejuhy+Afonso+da+Costa,+653+-+Santos+Dumont,+Paranagu%C3%A1+-+PR,+83209-570/@-25.5472053,-48.5281072,3a,75y,52.31h,66.62t/data=!3m7!1e1!3m5!1s8-k_Vcgygnd_H44mHSB4eQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D23.377710675112567%26panoid%3D8-k_Vcgygnd_H44mHSB4eQ%26yaw%3D52.312070639167295!7i16384!8i8192!4m5!3m4!1s0x94db9a9c9fa0381d:0xb04521543036a608!8m2!3d-25.5453648!4d-48.5300296?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D',
      googleMapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.0!2d-48.5!3d-25.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzAwLjAiUyA0OMKwMzAnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000',
    },
    {
      id: 'store-vila-itibere',
      slug: 'vila-itibere',
      name: 'Ferragens Martins — Vila Itiberê',
      shortName: 'Loja 2 — Vila Itiberê',
      addressLine: 'Av. Gov. Bento Munhoz da Rocha Neto, 77',
      neighborhood: 'Vila Itiberê',
      city: 'Paranaguá',
      state: 'PR',
      postalCode: '83209-000',
      phone: '(41) 9 8900-1321',
      whatsapp: '5541989001321',
      hours: {
        weekday: 'Segunda a Sexta: 08:00 às 18:00',
        saturday: 'Sábado: 08:00 às 12:00',
        sunday: 'Domingo e Feriados: Fechado',
      },
      googleMapsUrl:
        'https://maps.google.com/?q=Av.+Gov.+Bento+Munhoz+da+Rocha+Neto,+77+-+Vila+Itiber%C3%AA,+Paranagu%C3%A1+-+PR,+83209-000',
      googleMapsEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.0!2d-48.51!3d-25.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzM2LjAiUyA0OMKwMzAnMzYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000',
    },
  ],

  categories: [
    { name: 'Ferragens', slug: 'ferragens', icon: 'wrench' },
    { name: 'Ferramentas', slug: 'ferramentas', icon: 'hammer' },
    { name: 'Fixação', slug: 'fixacao', icon: 'pin' },
    { name: 'Hidráulica', slug: 'hidraulica', icon: 'droplet' },
    { name: 'Elétrica', slug: 'eletrica', icon: 'zap' },
    { name: 'Pintura', slug: 'pintura', icon: 'paint-brush' },
    { name: 'Abrasivos', slug: 'abrasivos', icon: 'disc' },
    { name: 'Vedação e Impermeabilização', slug: 'vedacao-impermeabilizacao', icon: 'shield' },
    { name: 'Portas e Fechaduras', slug: 'portas-fechaduras', icon: 'key' },
    { name: 'Telhados e Calhas', slug: 'telhados-calhas', icon: 'home' },
    { name: 'Material de Construção', slug: 'material-construcao', icon: 'box' },
    { name: 'EPI', slug: 'epi', icon: 'user-check' },
    { name: 'Madeira', slug: 'madeira', icon: 'layers' },
    { name: 'Jardim e Manutenção', slug: 'jardim-manutencao', icon: 'sun' },
  ],
}
