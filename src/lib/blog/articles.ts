export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  publishedAt: string;
  readingTime: number;
  excerpt: string;
  coverEmoji: string;
  body: Section[];
  cta: CTA;
}

interface Section {
  type: 'heading' | 'paragraph' | 'list' | 'tip' | 'callout';
  level?: 2 | 3;
  content?: string;
  items?: string[];
}

interface CTA {
  heading: string;
  text: string;
  btnLabel: string;
  btnHref: string;
}

export const articles: Article[] = [
  {
    slug: 'como-escolher-parafusos-certos',
    title: 'Como Escolher os Parafusos Certos para Cada Fixação',
    subtitle: 'Guia completo sobre tipos, materiais e aplicações de parafusos para obras e reformas',
    category: 'Fixação',
    categoryColor: '#062A56',
    publishedAt: '2025-07-10',
    readingTime: 6,
    excerpt: 'Usar o parafuso errado pode comprometer a segurança e a durabilidade de qualquer fixação. Aprenda a escolher o parafuso ideal para cada situação.',
    coverEmoji: '🔩',
    body: [
      {
        type: 'paragraph',
        content: 'Um dos erros mais comuns em obras e reformas é usar o parafuso errado para a aplicação errada. Seja por desconhecimento ou por pressa, a escolha inadequada pode comprometer a segurança da estrutura, causar corrosão e gerar retrabalho. Neste guia, você vai aprender a identificar e escolher o parafuso ideal para cada situação.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Tipos de parafusos e suas aplicações',
      },
      {
        type: 'paragraph',
        content: 'Existem centenas de modelos de parafusos no mercado, mas os mais utilizados em obras residenciais e comerciais podem ser divididos em grandes grupos:',
      },
      {
        type: 'list',
        items: [
          'Parafuso para madeira (rosca soberba): ideal para fixação em madeira maciça, MDF e OSB. A rosca larga garante grande força de tração.',
          'Parafuso para drywall: especialmente projetado para fixar placas de gesso em perfis metálicos, com ponteira fina que não precisa de pré-furação.',
          'Parafuso para metal (rosca métrica): utilizado em estruturas metálicas, equipamentos e ferragens. Sempre exige porca ou rosca na peça receptora.',
          'Parafuso autoperfurante (TEK): tem ponta em formato de broca, perfu­ra e fixa chapas metálicas em uma única operação.',
          'Parafuso para concreto (chumbador): fixado com bucha química ou mecânica, é usado em paredes de alvenaria e concreto.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Como ler as especificações de um parafuso',
      },
      {
        type: 'paragraph',
        content: 'Todo parafuso é descrito por três dimensões principais: diâmetro, comprimento e passo da rosca. Por exemplo, "M6 x 30mm" indica diâmetro de 6 mm e comprimento de 30 mm. Em parafusos para madeira, a notação comum é "4,2 x 50mm".',
      },
      {
        type: 'tip',
        content: 'Regra de ouro: o parafuso deve penetrar pelo menos 2/3 de seu comprimento na peça receptora para garantir resistência adequada.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Materiais e acabamentos: evite a corrosão',
      },
      {
        type: 'paragraph',
        content: 'O material do parafuso é tão importante quanto o tipo. Para ambientes internos e secos, o aço carbono com acabamento fosfatizado é suficiente. Para ambientes úmidos ou externos, prefira parafusos zincados, galvanizados ou em aço inoxidável. Em regiões litorâneas como Paranaguá, onde a umidade e salinidade são elevadas, o inox 316 ou o galvanizado a fogo são as escolhas mais seguras para instalações externas.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Cabeças de parafuso: qual escolher?',
      },
      {
        type: 'list',
        items: [
          'Cabeça chata (escareada): fica nivelada com a superfície, ideal para acabamentos e quando não se quer a cabeça saliente.',
          'Cabeça panela: cabeça redonda e larga, distribui melhor a pressão. Muito usada em chapas e fixações gerais.',
          'Cabeça sextavada (hex): facilita o aperto com chave de boca ou soquete, usada em estruturas metálicas pesadas.',
          'Cabeça truss (cogumelo): tem cabeça baixa e larga, boa para fixação de chapas finas onde se quer baixo perfil.',
        ],
      },
      {
        type: 'callout',
        content: 'Na Ferragens Martins você encontra mais de 200 tipos de parafusos em estoque, do básico ao especializado. Nossa equipe técnica está disponível para ajudar na escolha certa para o seu projeto.',
      },
    ],
    cta: {
      heading: 'Precisa de parafusos para a sua obra?',
      text: 'Acesse nosso catálogo ou venha até uma das nossas lojas em Paranaguá. Nossa equipe vai te ajudar a escolher a fixação ideal para cada situação.',
      btnLabel: 'Ver Catálogo de Fixação',
      btnHref: '/catalogo/fixacao',
    },
  },

  {
    slug: 'instalacao-hidraulica-residencial-guia-iniciantes',
    title: 'Instalação Hidráulica Residencial: Guia para Iniciantes',
    subtitle: 'Do planejamento ao acabamento: entenda os materiais e etapas de uma instalação hidráulica segura',
    category: 'Hidráulica',
    categoryColor: '#0077CC',
    publishedAt: '2025-07-18',
    readingTime: 8,
    excerpt: 'Entender o básico sobre instalação hidráulica pode te poupar muito dinheiro e evitar problemas sérios como infiltrações e vazamentos.',
    coverEmoji: '🔧',
    body: [
      {
        type: 'paragraph',
        content: 'Problemas hidráulicos estão entre os mais caros e danosos que podem acontecer em uma residência. Uma simples trinca num cano ou uma conexão mal feita pode gerar infiltrações que comprometem estruturas inteiras. Entender o básico do sistema hidráulico não só ajuda a evitar problemas, como também permite que você faça pequenos reparos por conta própria.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Tipos de tubulações: PVC, CPVC, PPR e Cobre',
      },
      {
        type: 'list',
        items: [
          'PVC marrom (esgoto): utilizado exclusivamente para tubulações de esgoto e águas pluviais. Nunca use para água potável.',
          'PVC soldável (água fria): o mais comum em instalações de água fria residenciais. Barato, leve e de fácil instalação.',
          'CPVC (água quente): suporta temperaturas de até 93°C. Ideal para chuveiro e cozinha, mas exige cola específica.',
          'PPR (Polipropileno Copolímero Random): soldagem por termofusão, sem cola química. Excelente durabilidade e resistência a pressão.',
          'Cobre: o mais durável e resistente, mas de instalação mais cara. Muito usado em instalações de gás e em projetos de alto padrão.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Planejando a instalação: o que considerar',
      },
      {
        type: 'paragraph',
        content: 'Antes de comprar qualquer material, é fundamental ter um projeto. Ele deve indicar o diâmetro correto das tubulações (geralmente 25mm para ramais e 20mm para pontos), os pontos de saída de água (torneiras, chuveiros, vasos sanitários), e a localização do registro geral.',
      },
      {
        type: 'tip',
        content: 'Calcule sempre 15% a mais de material do que o planejado. Cortes errados, peças com defeito e mudanças de traçado são comuns durante a execução.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Conexões essenciais e suas funções',
      },
      {
        type: 'list',
        items: [
          'Joelho 90° e 45°: muda a direção da tubulação.',
          'Tê: cria ramificações no sistema.',
          'Redução: muda o diâmetro da tubulação.',
          'Luva: emenda dois trechos de tubo.',
          'Cap (tampão): fecha a extremidade de um ramal.',
          'Registro de gaveta: isola partes do sistema para manutenção.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Cuidados na execução',
      },
      {
        type: 'paragraph',
        content: 'Na soldagem de PVC, certifique-se de que as peças estão limpas e secas antes de aplicar o primer e a cola. O encaixe deve ser firme e girado 1/4 de volta após a inserção para distribuir a cola uniformemente. Em PPR, a termofusão deve seguir os tempos de aquecimento recomendados pelo fabricante — variando conforme o diâmetro.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Teste hidrostático: nunca pule essa etapa',
      },
      {
        type: 'paragraph',
        content: 'Antes de fechar as paredes, sempre realize o teste hidrostático: pressurise o sistema com água por pelo menos 2 horas e inspecione cada conexão. Isso evita trabalhos de demolição e reposição de revestimento no futuro.',
      },
      {
        type: 'callout',
        content: 'Na Ferragens Martins você encontra toda a linha hidráulica: tubos, conexões, registros, válvulas de esfera, caixas d\'água e muito mais, das melhores marcas do mercado.',
      },
    ],
    cta: {
      heading: 'Vai fazer sua instalação hidráulica?',
      text: 'Venha até a Ferragens Martins e fale com nossos especialistas. Temos tudo que você precisa, do tubo ao acabamento, com o melhor atendimento de Paranaguá.',
      btnLabel: 'Ver Produtos de Hidráulica',
      btnHref: '/catalogo/hidraulica',
    },
  },

  {
    slug: 'tudo-sobre-epi-obra',
    title: 'EPI na Obra: Muito Além da Obrigação Legal',
    subtitle: 'Entenda quais equipamentos são essenciais para cada tipo de trabalho e como usá-los corretamente',
    category: 'Segurança',
    categoryColor: '#E65C00',
    publishedAt: '2025-07-24',
    readingTime: 7,
    excerpt: 'Usar EPI não é só exigência da lei — é a diferença entre voltar para casa inteiro ou não. Saiba quais equipamentos são indispensáveis para cada tarefa.',
    coverEmoji: '🪖',
    body: [
      {
        type: 'paragraph',
        content: 'Segundo dados do Ministério da Previdência Social, o Brasil registra mais de 600 mil acidentes de trabalho por ano, sendo o setor de construção civil um dos mais afetados. A grande maioria desses acidentes poderia ter sido evitada com o uso correto dos Equipamentos de Proteção Individual. Mas EPI não é só capacete e bota — cada atividade exige proteções específicas.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'EPIs essenciais para trabalhos em geral na construção',
      },
      {
        type: 'list',
        items: [
          'Capacete de segurança (CA obrigatório): protege contra impactos e objetos que caem de altura. Classe A para riscos elétricos e classe B para demais usos.',
          'Óculos de proteção: indispensável em trabalhos com disco de corte, solda, aplicação de químicos e usinagem.',
          'Luva de proteção: existem modelos para diferentes riscos — corte, calor, vibração, produtos químicos. Escolha o par certo para cada tarefa.',
          'Protetor auricular: para trabalhos com máquinas ruidosas acima de 85 dB, como esmerilhadeira, compressor e martelete.',
          'Bota de segurança com biqueira: proteção para os pés contra impacto, perfuração e, em modelos com solado especial, choques elétricos.',
          'Cinto de segurança tipo paraquedista: obrigatório para trabalhos acima de 2 metros de altura em locais sem proteção coletiva.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'EPIs para trabalhos específicos',
      },
      {
        type: 'paragraph',
        content: 'Além dos itens básicos, algumas atividades requerem proteções adicionais:',
      },
      {
        type: 'list',
        items: [
          'Solda: máscara de solda com filtro adequado ao processo (MIG, TIG, eletrodo), avental e luva de raspa de couro.',
          'Trabalho com produtos químicos: óculos de vedação total, luva de neoprene ou nitrílica, avental de PVC e respirador com filtro químico.',
          'Corte com disco: óculos, luva de malha anti-corte, avental de raspa e protetor facial (face shield).',
          'Pintura em spray: máscara com filtro para solventes, macacão de proteção e óculos.',
          'Trabalho em espaço confinado: detector de gases, linha de vida, respirador e comunicação constante com equipe de apoio.',
        ],
      },
      {
        type: 'tip',
        content: 'O CA (Certificado de Aprovação) é o número de registro do EPI no Ministério do Trabalho. Sempre verifique se o EPI que você está comprando possui CA válido — isso garante que o equipamento passou por testes de eficiência.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Conservação e vida útil dos EPIs',
      },
      {
        type: 'paragraph',
        content: 'Um EPI danificado pode ser mais perigoso do que não usar nenhum, pois dá uma falsa sensação de segurança. Inspecione antes de cada uso, limpe corretamente após o uso e substitua imediatamente quando apresentar sinais de desgaste, trincas ou deformações. O capacete, por exemplo, deve ser substituído após qualquer impacto forte, mesmo que não haja danos visíveis, pois sua estrutura interna pode ter sido comprometida.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'EPI para o trabalhador autônomo',
      },
      {
        type: 'paragraph',
        content: 'Muitos profissionais autônomos neglicenciam os EPIs por achar que o custo não compensa. Mas o custo de um acidente — em termos de tratamento médico, dias parados e até incapacidade permanente — é incomparavelmente maior. O investimento em EPI é o custo mais baixo de uma obra.',
      },
      {
        type: 'callout',
        content: 'A Ferragens Martins tem linha completa de EPIs com CA válido: capacetes, botas, luvas, óculos, respiradores e cintos de segurança. Venha até nossas lojas e garanta a segurança de toda a sua equipe.',
      },
    ],
    cta: {
      heading: 'Proteja sua equipe com os EPIs certos',
      text: 'Encontre toda a linha de equipamentos de proteção individual na Ferragens Martins. Preço justo, estoque completo e assistência técnica para escolher o EPI adequado.',
      btnLabel: 'Ver EPIs em Estoque',
      btnHref: '/catalogo/seguranca-epi',
    },
  },

  {
    slug: 'pintura-paredes-internas-passo-a-passo',
    title: 'Pintura de Paredes Internas: Passo a Passo Profissional',
    subtitle: 'Do preparo da superfície à última demão: técnicas que fazem a diferença no resultado final',
    category: 'Pintura',
    categoryColor: '#5B2D8E',
    publishedAt: '2025-07-30',
    readingTime: 7,
    excerpt: 'Uma pintura bem feita começa muito antes de abrir a tinta. O preparo da superfície é o que separa um resultado duradouro de um trabalho que descasca em meses.',
    coverEmoji: '🎨',
    body: [
      {
        type: 'paragraph',
        content: 'Pintar paredes parece simples, mas para obter um resultado profissional e duradouro é preciso seguir etapas específicas. O principal erro de quem pinta em casa é pular o preparo da superfície — e é exatamente essa etapa que determina se a pintura vai durar 2 anos ou 10 anos.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Fase 1: Preparo da superfície',
      },
      {
        type: 'list',
        items: [
          'Limpeza: remova toda a sujeira, gordura e poeira com uma espátula e pano úmido. Em paredes com mofo, aplique solução de água sanitária diluída (1:4) e aguarde 10 minutos antes de limpar.',
          'Correção de trincas e furos: utilize massa corrida ou selador acrílico para pequenas imperfeições. Para trincas maiores, use argamassa ou fita de fibra de vidro com massa.',
          'Lixamento: após secar, lixe a superfície com lixa 120 para criar porosidade e garantir a aderência da tinta.',
          'Selador: aplique um selador acrílico ou de base PVA antes da tinta final. Ele sela a porosidade da parede e garante que a tinta não seja absorvida de forma irregular.',
        ],
      },
      {
        type: 'tip',
        content: 'Em paredes novas de reboco, aguarde pelo menos 30 dias antes de pintar. O reboco precisa curar completamente para evitar eflorescências e bolhas na pintura.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Fase 2: Escolha dos materiais',
      },
      {
        type: 'paragraph',
        content: 'A escolha correta dos materiais faz toda a diferença no resultado:',
      },
      {
        type: 'list',
        items: [
          'Tinta látex PVA: boa para ambientes secos (quartos, salas), custo-benefício excelente.',
          'Tinta acrílica: mais resistente à umidade e lavável. Indicada para cozinhas, banheiros e áreas de alto tráfego.',
          'Tinta à base de cal: ideal para fachadas e ambientes que precisam de respiração natural.',
          'Rolo de lã (15mm): para paredes com textura. Rolo de veludo (6mm): para acabamento liso e preciso.',
          'Pincel de cerdas sintéticas: para cortes e acabamentos nas bordas.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Fase 3: Técnica de aplicação',
      },
      {
        type: 'paragraph',
        content: 'Aplique sempre em "W" com o rolo: faça movimentos em formato de W e depois passe o rolo verticalmente para distribuir e nivelar a tinta. Nunca sobrecarregue o rolo — passe em excesso de tinta deixa marcas e escorrimento. Comece pelo teto, depois as paredes, de cima para baixo.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Quantas demãos são necessárias?',
      },
      {
        type: 'paragraph',
        content: 'O mínimo é sempre duas demãos. A primeira demão pode apresentar pequenas irregularidades — é na segunda que o acabamento se define. Para cores escuras ou em paredes que foram pintadas com cor muito diferente, pode ser necessária uma terceira demão. Respeite sempre o tempo de secagem entre demãos indicado na lata (geralmente 4 horas).',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Dicas extras para resultado profissional',
      },
      {
        type: 'list',
        items: [
          'Pinte sempre com luz do dia ou com boa iluminação artificial para identificar falhas.',
          'Proteja rodapés, tomadas e janelas com fita crepe de boa qualidade.',
          'Dilua a tinta conforme recomendação do fabricante — geralmente 10% a 15% de água na primeira demão e menos na segunda.',
          'Nunca pinte com sol batendo direto na parede — a tinta seca rápido demais e ficam marcas.',
        ],
      },
      {
        type: 'callout',
        content: 'Na Ferragens Martins você encontra tintas das principais marcas (Suvinil, Coral, Eucatex), rolos, pincéis, fitas crepe, massa corrida e todo o material de preparo. Nossa equipe te ajuda a calcular a quantidade certa para o seu ambiente.',
      },
    ],
    cta: {
      heading: 'Pronto para renovar suas paredes?',
      text: 'Venha até a Ferragens Martins e leve tudo que precisa para uma pintura perfeita. Calculamos a quantidade certa e te orientamos em cada etapa.',
      btnLabel: 'Ver Produtos de Pintura',
      btnHref: '/catalogo/pintura',
    },
  },

  {
    slug: 'instalacao-eletrica-residencial-o-que-saber',
    title: 'Instalação Elétrica Residencial: O que Todo Proprietário Deve Saber',
    subtitle: 'Normas técnicas, materiais e cuidados essenciais para uma instalação segura e eficiente',
    category: 'Elétrica',
    categoryColor: '#F5A623',
    publishedAt: '2025-08-01',
    readingTime: 9,
    excerpt: 'A instalação elétrica é invisível quando funciona bem e devastadora quando falha. Entenda os princípios básicos para tomar decisões seguras na sua obra.',
    coverEmoji: '⚡',
    body: [
      {
        type: 'paragraph',
        content: 'Problemas elétricos são a principal causa de incêndios residenciais no Brasil. Segundo o CBMSP, cerca de 40% dos incêndios em edificações têm origem elétrica. A maioria dessas ocorrências poderia ter sido evitada com uma instalação adequada e materiais de qualidade. Neste artigo, você vai entender os conceitos básicos e os materiais essenciais para uma instalação segura.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'A norma que você precisa conhecer: ABNT NBR 5410',
      },
      {
        type: 'paragraph',
        content: 'A NBR 5410 é a norma brasileira que regulamenta instalações elétricas de baixa tensão em edificações residenciais e comerciais. Ela define desde o dimensionamento dos cabos até os circuitos mínimos obrigatórios. Toda instalação deve seguir essa norma para garantir segurança e estar de acordo com os seguros de imóvel.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Circuitos mínimos obrigatórios',
      },
      {
        type: 'list',
        items: [
          'Circuito de iluminação (10A): exclusivo para luminárias.',
          'Circuito de tomadas de uso geral (TUG - 10A): para aparelhos de até 1.000W.',
          'Circuito de tomadas de uso específico (TUE): um circuito exclusivo para cada equipamento de alta potência (chuveiro, geladeira, máquina de lavar, ar-condicionado).',
          'Cada circuito deve ter seu próprio disjuntor no quadro de distribuição.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Escolhendo os cabos corretos',
      },
      {
        type: 'paragraph',
        content: 'A seção do cabo (medida em mm²) deve ser dimensionada de acordo com a corrente que vai circular. Os mais usados são:',
      },
      {
        type: 'list',
        items: [
          'Cabo 1,5mm²: circuitos de iluminação.',
          'Cabo 2,5mm²: tomadas de uso geral (padrão na maioria dos circuitos).',
          'Cabo 4mm²: circuitos de maior demanda, como ar-condicionado split de até 12.000 BTU.',
          'Cabo 6mm² ou maior: chuveiros elétricos, fornos e aparelhos de alta potência.',
        ],
      },
      {
        type: 'tip',
        content: 'Nunca emende fios em paredes fechadas. Todas as emendas e conexões devem estar em caixas de passagem acessíveis ou dentro das tomadas e interruptores.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Aterramento: item não negociável',
      },
      {
        type: 'paragraph',
        content: 'O aterramento é a proteção mais eficiente contra choques elétricos. Ele desvia a corrente de fuga para o solo, evitando que passe pelo corpo humano. Toda instalação moderna deve ter sistema de aterramento completo (SPDA), especialmente em regiões com alta incidência de raios como o litoral paranaense.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'DR e DPS: proteções essenciais',
      },
      {
        type: 'list',
        items: [
          'Disjuntor DR (Diferencial Residual): detecta fugas de corrente e desliga o circuito em milissegundos. Obrigatório em banheiros, áreas molhadas e jardins pela NBR 5410.',
          'DPS (Dispositivo de Proteção contra Surto): protege os equipamentos contra picos de tensão causados por descargas atmosféricas. Indispensável no litoral.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Quando chamar um eletricista',
      },
      {
        type: 'paragraph',
        content: 'Substituir uma tomada ou interruptor é uma tarefa que um leigo pode fazer com segurança, desde que desligue o disjuntor antes. Mas qualquer trabalho envolvendo o quadro de distribuição, instalação de novos circuitos ou modificação do ramal de entrada DEVE ser feito por eletricista habilitado com ART (Anotação de Responsabilidade Técnica).',
      },
      {
        type: 'callout',
        content: 'Na Ferragens Martins você encontra cabos, eletrodutos, caixas, tomadas, interruptores, disjuntores e DPS das melhores marcas. Temos tudo para sua instalação elétrica residencial ou comercial.',
      },
    ],
    cta: {
      heading: 'Precisa de material elétrico?',
      text: 'A Ferragens Martins tem estoque completo de material elétrico. De cabos e eletrodutos a quadros e disjuntores — tudo com garantia e nota fiscal.',
      btnLabel: 'Ver Material Elétrico',
      btnHref: '/catalogo/eletrica',
    },
  },

  {
    slug: 'reforma-banheiro-sem-stress',
    title: 'Reforma de Banheiro Sem Stress: Planejamento e Materiais',
    subtitle: 'Um guia completo para reformar seu banheiro com eficiência, dentro do orçamento e sem surpresas',
    category: 'Reformas',
    categoryColor: '#2E7D32',
    publishedAt: '2025-08-05',
    readingTime: 8,
    excerpt: 'Reformar um banheiro é um dos projetos mais impactantes que você pode fazer numa casa — e um dos mais complexos. Com o planejamento certo, dá para fazer sem estresse.',
    coverEmoji: '🚿',
    body: [
      {
        type: 'paragraph',
        content: 'Uma reforma de banheiro envolve ao mesmo tempo obra civil, instalações hidráulicas, instalações elétricas, revestimentos e acabamentos. É por isso que um planejamento detalhado é essencial para evitar esquecimentos, retrabalho e estouro de orçamento. Vamos te guiar pelas etapas principais.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Passo 1: Defina o escopo antes de tudo',
      },
      {
        type: 'list',
        items: [
          'Reforma parcial: troca de louças, metais e revestimentos, mantendo a posição dos pontos hidráulicos.',
          'Reforma completa: inclui mudança de layout, reposicionamento de pontos e troca de toda a instalação.',
          'Reforma com ampliação: derruba paredes, aumenta a área do banheiro.',
        ],
      },
      {
        type: 'paragraph',
        content: 'O escopo define diretamente o custo, o tempo de execução e os profissionais necessários. Uma reforma parcial pode ser feita em 1 semana; uma reforma completa pode levar de 3 a 6 semanas.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Materiais essenciais e onde economizar (sem sacrificar qualidade)',
      },
      {
        type: 'list',
        items: [
          'Revestimentos (cerâmica/porcelanato): invista em qualidade no piso — ele suporta mais impacto. Na parede, você pode equilibrar com opções intermediárias.',
          'Impermeabilização: NUNCA economize aqui. Use pelo menos 2 demãos de impermeabilizante nas paredes até 1,80m e no piso completo.',
          'Louças: vasos com saída vertical têm instalação mais limpa em reformas. Pias de sobrepor são mais fáceis de instalar que as de embutir.',
          'Metais (torneiras, chuveiros, papeleiras): prefira marcas com garantia — metais baratos oxidam rapidamente no ambiente úmido de banheiro.',
          'Box de vidro: o temperado de 8mm é o padrão mínimo de segurança. Exija o selo ABNT na hora da compra.',
        ],
      },
      {
        type: 'tip',
        content: 'Compre 10% a mais de cerâmica e porcelanato do que a metragem calculada. O excedente serve para reposição no futuro, quando pode ser difícil encontrar o mesmo lote de coloração.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'A ordem correta da execução',
      },
      {
        type: 'list',
        items: [
          '1. Demolição e remoção dos entulhos',
          '2. Ajuste da instalação hidráulica (encanadores)',
          '3. Ajuste da instalação elétrica (eletricistas)',
          '4. Chapisco e reboco das paredes',
          '5. Impermeabilização (aguardar cura: 72h mínimo)',
          '6. Assentamento de revestimentos de piso e parede',
          '7. Instalação de box, louças e metais',
          '8. Pintura (teto e áreas não revestidas)',
          '9. Acabamentos finais',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Erros que custam caro para corrigir',
      },
      {
        type: 'list',
        items: [
          'Pular a impermeabilização ou aplicar poucas demãos.',
          'Não deixar cair o piso antes de assentar a cerâmica.',
          'Comprar cerâmica sem folga nas juntas (resulta em trincas por dilatação).',
          'Fechar as paredes antes de testar toda a instalação hidráulica e elétrica.',
          'Instalar vaso sanitário antes de assentar o piso.',
        ],
      },
      {
        type: 'callout',
        content: 'Na Ferragens Martins você encontra tudo para a reforma do seu banheiro: impermeabilizante, cerâmica, argamassa, rejunte, louças, metais, caixas de gordura e muito mais. Visite nossas lojas em Paranaguá.',
      },
    ],
    cta: {
      heading: 'Vai reformar seu banheiro?',
      text: 'Solicite um orçamento completo pelo WhatsApp ou visite a Ferragens Martins. Nossa equipe te ajuda a calcular todos os materiais e garantir que nada falte na hora H.',
      btnLabel: 'Solicitar Orçamento',
      btnHref: '/contato',
    },
  },

  {
    slug: 'madeira-tratada-para-obra-qual-escolher',
    title: 'Madeira Tratada para Obra: Como Escolher a Certa',
    subtitle: 'Eucalipto, Pinus, Cambará e mais — entenda as diferenças e qual madeira usar em cada aplicação',
    category: 'Madeiras',
    categoryColor: '#795548',
    publishedAt: '2025-08-08',
    readingTime: 6,
    excerpt: 'A escolha errada da madeira pode custar caro: peças que apodrecem, empenam ou não suportam o peso. Saiba como escolher a madeira tratada certa para cada uso.',
    coverEmoji: '🪵',
    body: [
      {
        type: 'paragraph',
        content: 'A madeira é um dos materiais mais versáteis da construção, mas também um dos que mais geram dúvidas. Com tantas espécies e tratamentos disponíveis, escolher a madeira certa para cada aplicação é fundamental para garantir durabilidade, segurança e evitar prejuízos.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Por que usar madeira tratada?',
      },
      {
        type: 'paragraph',
        content: 'A madeira in natura é suscetível ao ataque de fungos, cupins e brocas, e ao apodrecimento por umidade. O tratamento (mais comumente com CCA — Cromo, Cobre e Arsênio — ou com produtos à base de boro) cria uma barreira contra esses agentes, multiplicando a vida útil da madeira de 5 para 25 ou mais anos.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Principais espécies e suas aplicações',
      },
      {
        type: 'list',
        items: [
          'Eucalipto tratado: ótima relação custo-benefício, alta resistência mecânica. Muito usado em telhados, decks, cercas e estruturas gerais.',
          'Pinus tratado: mais leve, fácil de trabalhar e cortar. Excelente para forros, ripas, caixilhos e móveis de obra.',
          'Cambará (Erisma uncinatum): madeira nativa de alta durabilidade natural, indicada para estruturas em contato com o solo ou água, como dormentes e pontes.',
          'Angelim-pedra: uma das madeiras mais duras do Brasil, ideal para pisos de alto tráfego, decks e aplicações que exigem máxima resistência.',
          'Pinus laminado colado (MLC): peças de grande comprimento e seção uniforme para estruturas protendidas.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Classes de tratamento',
      },
      {
        type: 'paragraph',
        content: 'O tratamento é classificado por classe de uso, de acordo com a exposição à umidade:',
      },
      {
        type: 'list',
        items: [
          'Classe 1 (interior seco): madeira para uso em ambientes internos sem contato com umidade.',
          'Classe 2 (interior úmido): ambientes internos com variação de umidade, como banheiros e cozinhas.',
          'Classe 3 (exterior coberto): madeira exposta ao tempo mas protegida da chuva direta.',
          'Classe 4 (exterior exposto): contato direto com chuva, solo ou água. Exige a maior concentração de preservativo.',
          'Classe 5 (contato com água salgada): para estruturas em ambientes marinhos — indispensável no litoral paranaense.',
        ],
      },
      {
        type: 'tip',
        content: 'Em Paranaguá e no litoral paranaense, a alta umidade e salinidade do ar aceleram o apodrecimento. Para telhados, decks e estruturas externas, sempre opte por madeira tratada Classe 3 ou 4.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Verificando a qualidade da madeira tratada',
      },
      {
        type: 'list',
        items: [
          'Solicite o laudo do tratamento com o retentor e penetração do produto (em g/m³ de produto ativo).',
          'Observe a coloração: o CCA dá uma tonalidade esverdeada característica. Madeira sem esse tom pode não ter sido tratada adequadamente.',
          'Verifique a umidade: a madeira deve ter no máximo 18% de umidade para uso em estruturas. Peças muito úmidas empenam ao secar.',
          'Exija nota fiscal e documentação de origem (IBAMA para espécies nativas).',
        ],
      },
      {
        type: 'callout',
        content: 'A Ferragens Martins oferece madeiras tratadas de qualidade comprovada, com laudo de tratamento disponível. Nossa equipe te orienta sobre a espécie e classe de tratamento ideal para cada projeto.',
      },
    ],
    cta: {
      heading: 'Precisa de madeira para sua obra?',
      text: 'Consulte nosso estoque de madeiras tratadas. Atendemos tanto o profissional de obra quanto o cliente final com preço competitivo e madeira de procedência garantida.',
      btnLabel: 'Ver Linha de Madeiras',
      btnHref: '/catalogo/madeiras',
    },
  },

  {
    slug: 'como-fazer-orcamento-de-obra',
    title: 'Como Fazer um Orçamento de Obra Sem Errar',
    subtitle: 'Metodologia passo a passo para calcular materiais, mão de obra e imprevistos sem susto no final',
    category: 'Dicas',
    categoryColor: '#00796B',
    publishedAt: '2025-08-10',
    readingTime: 7,
    excerpt: 'A maioria das obras estoura o orçamento por falta de planejamento. Aprenda a fazer um orçamento realista que inclua materiais, mão de obra e uma reserva para imprevistos.',
    coverEmoji: '📋',
    body: [
      {
        type: 'paragraph',
        content: 'Segundo pesquisa da Associação Brasileira dos Construtores de Imóveis, mais de 70% das obras residenciais excedem o orçamento inicial. A causa mais comum não é a variação de preços, mas sim o orçamento mal feito desde o início. Com uma metodologia correta, é possível prever com razoável precisão o custo total de qualquer obra.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Passo 1: Levantamento quantitativo de materiais',
      },
      {
        type: 'paragraph',
        content: 'Antes de pesquisar preços, você precisa saber exatamente o que vai comprar. O levantamento quantitativo é o cálculo detalhado de cada material necessário. Isso exige:',
      },
      {
        type: 'list',
        items: [
          'Planta baixa e cortes da obra com medidas precisas.',
          'Especificação de todos os materiais (tipo, dimensão, marca desejada).',
          'Cálculo das quantidades com base nas medidas (área de piso, comprimento de tubulação, etc.).',
          'Adição de uma margem de desperdício: 10% a 15% para cerâmica, 5% a 10% para outros materiais.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Passo 2: Pesquisa de preços',
      },
      {
        type: 'paragraph',
        content: 'Com a lista de materiais em mãos, pesquise preços em pelo menos 3 fornecedores diferentes. Atenção: compare sempre o mesmo produto — marca, espessura, tipo e dimensão — para garantir que a comparação seja justa. Preço mais barato nem sempre é o melhor custo-benefício.',
      },
      {
        type: 'tip',
        content: 'Na Ferragens Martins, você pode nos enviar sua lista completa de materiais pelo WhatsApp e receber um orçamento detalhado sem sair de casa.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Passo 3: Orçamento de mão de obra',
      },
      {
        type: 'paragraph',
        content: 'A mão de obra geralmente representa de 40% a 60% do custo total de uma obra. Solicite pelo menos 3 orçamentos detalhados de profissionais. O orçamento deve especificar exatamente o que está incluso — evite propostas genéricas tipo "pintura de sala" sem detalhar a metragem e o número de demãos.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Passo 4: Reserve para imprevistos',
      },
      {
        type: 'list',
        items: [
          'Reserve sempre 15% a 20% do orçamento total para imprevistos.',
          'Obras em imóveis existentes tendem a ter mais surpresas: instalações ocultas em mal estado, estruturas deterioradas, etc.',
          'Variação de preço de materiais ao longo da obra (especialmente em obras longas).',
          'Retrabalho por erros de execução ou mudanças de projeto.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Passo 5: Organize em planilha',
      },
      {
        type: 'paragraph',
        content: 'Uma planilha simples com colunas para item, quantidade, unidade, preço unitário e total já é suficiente. Organize por categoria (materiais de alvenaria, hidráulica, elétrica, revestimentos, etc.). Isso facilita a comparação de orçamentos e o controle durante a execução.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Erros comuns no orçamento',
      },
      {
        type: 'list',
        items: [
          'Não incluir ferramentas e equipamentos de locação (betoneira, andaimes, etc.).',
          'Esquecer do custo de descarte de entulho.',
          'Não considerar BDI (Benefícios e Despesas Indiretas) em orçamentos de empreiteiras.',
          'Aceitar o orçamento mais barato sem verificar a qualidade e procedência dos materiais.',
          'Não formalizar o contrato de mão de obra por escrito.',
        ],
      },
      {
        type: 'callout',
        content: 'Traga sua planta ou lista de materiais para a Ferragens Martins. Nossa equipe faz o levantamento de quantidades e te entrega um orçamento completo sem compromisso.',
      },
    ],
    cta: {
      heading: 'Precisa de ajuda com o orçamento da sua obra?',
      text: 'Nossa equipe está pronta para te ajudar a levantar os materiais e montar um orçamento realista. Sem custo e sem compromisso.',
      btnLabel: 'Solicitar Orçamento Gratuito',
      btnHref: '/contato',
    },
  },

  {
    slug: 'ferramentas-essenciais-home-office',
    title: '15 Ferramentas Essenciais para Quem Faz Manutenção em Casa',
    subtitle: 'Monte o kit perfeito para resolver os pequenos problemas do dia a dia sem precisar chamar profissional',
    category: 'Ferramentas',
    categoryColor: '#37474F',
    publishedAt: '2025-08-12',
    readingTime: 5,
    excerpt: 'Com o kit certo de ferramentas, você resolve a maioria dos problemas domésticos sozinho. Saiba quais ferramentas realmente valem o investimento.',
    coverEmoji: '🔨',
    body: [
      {
        type: 'paragraph',
        content: 'Uma caixa de ferramentas bem montada resolve mais de 80% dos problemas de manutenção de uma casa — torneiras pingando, gavetas emperradas, quadros para pendurar, tomadas a trocar. O investimento é relativamente baixo e o retorno, em conveniência e economia de chamadas técnicas, é enorme.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'O kit básico indispensável',
      },
      {
        type: 'list',
        items: [
          '1. Martelo de carpinteiro 17oz: versátil para pregar, extrair pregos e pequenas demolições.',
          '2. Jogo de chaves de fenda (+-): pelo menos três tamanhos de cada tipo: PH0, PH1, PH2 e fenda pequena, média e grande.',
          '3. Alicate universal e alicate de bico: para dobrar, torcer, cortar fios e apertar fixações.',
          '4. Trena de 5 metros: para medições em geral. Invista num modelo com trava e carcaça reforçada.',
          '5. Nível de bolha de 40cm: para garantir que prateleiras, quadros e móveis fiquem nivelados.',
          '6. Jogo de chaves Allen: para manutenção de móveis, bicicletas e equipamentos com parafusos sextavados internos.',
          '7. Furadeira/parafusadeira sem fio: a mais versátil das ferramentas elétricas domésticas. Perfura, parafusa e afroxa.',
          '8. Serra manual: para pequenos cortes em madeira e PVC.',
        ],
      },
      {
        type: 'heading',
        level: 2,
        content: 'Itens que fazem diferença',
      },
      {
        type: 'list',
        items: [
          '9. Estilete de lâmina larga: para cortes precisos em papel, papelão, laminados e outros materiais.',
          '10. Fita isolante e fita veda-rosca: itens de consumo que nunca podem faltar.',
          '11. Selante de silicone: para rejuntar box, vedação de janelas e pequenas infiltrações.',
          '12. Líquido penetrante (WD-40 ou similar): resolve parafusos enferrujados, lubrifica dobradiças e protege metais.',
          '13. Lanterna de LED: indispensável para trabalhar em locais escuros como forros, armários e ralos.',
          '14. Kit de brocas variadas: brocas para concreto, madeira e metal nos tamanhos mais comuns (3mm a 12mm).',
          '15. Prumo de parede: para verificar a verticalidade de paredes, portas e instalações.',
        ],
      },
      {
        type: 'tip',
        content: 'Não economize em ferramentas manuais básicas como martelo, alicates e chaves de fenda. Um produto de má qualidade escorrega, estraga parafusos e pode causar acidentes. Prefira marcas consolidadas como Tramontina, Stanley ou Gedore.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Como guardar as ferramentas corretamente',
      },
      {
        type: 'paragraph',
        content: 'Uma boa caixa de ferramentas é tão importante quanto as próprias ferramentas. Prefira modelos com divisórias internas, compartimentos para parafusos e presilhas para ferramentas longas. Guarde sempre em local seco — umidade é a principal inimiga do metal. Após cada uso, limpe a ferramentas e aplique uma fina camada de óleo nas partes metálicas.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Quando o kit doméstico não é suficiente',
      },
      {
        type: 'paragraph',
        content: 'O kit doméstico é ótimo para manutenção preventiva e pequenos reparos. Mas instalações elétricas novas, problemas estruturais, reformas completas de banheiro e qualquer trabalho em gás devem ser feitos por profissionais habilitados. Saber quando chamar um especialista é tão importante quanto saber usar as ferramentas.',
      },
      {
        type: 'callout',
        content: 'Na Ferragens Martins você encontra ferramentas manuais e elétricas das melhores marcas do mercado. Nossa equipe te ajuda a montar o kit ideal para as suas necessidades e orçamento.',
      },
    ],
    cta: {
      heading: 'Monte seu kit de ferramentas na Ferragens Martins',
      text: 'Temos as melhores marcas de ferramentas manuais e elétricas com preço competitivo. Venha até nossas lojas ou faça seu orçamento pelo WhatsApp.',
      btnLabel: 'Ver Ferramentas',
      btnHref: '/catalogo/ferramentas',
    },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
