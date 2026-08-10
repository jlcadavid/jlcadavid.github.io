(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'uiThemePreference';
  const COPY = {
    en: {
      nav: { back: 'Back to portfolio', theme: 'Switch between light and dark mode' },
      intro: {
        eyebrow: 'WV SOFTWARE · Clear boundaries',
        title: 'Legal, accessibility, and transparency.',
        updated_label: 'Last updated:',
        updated: 'August 9, 2026',
        lead: 'A plain-language account of how this portfolio works, what happens when you contact me, and which limits apply to its content. This information supports transparency and does not replace advice from qualified legal counsel.'
      },
      privacy: {
        title: 'Privacy notice',
        intro: 'José Luis Martínez Cadavid, operating professionally as WV SOFTWARE, is the contact point for information voluntarily shared through this portfolio.',
        item_local: 'Language and theme preferences may be stored locally in your browser. They are not transmitted to a WV SOFTWARE database.',
        item_contact: 'The contact form opens your email client; email and WhatsApp links transfer you to those providers. Information is received only when you choose to send it and is used to answer, scope, or quote your request.',
        item_external: 'Google Fonts, jsDelivr, WhatsApp, LinkedIn, and GitHub may receive standard request metadata and apply their own privacy terms when their resources or links are used.',
        item_analytics: 'WV SOFTWARE currently configures no first-party analytics, advertising trackers, user accounts, or payment collection on this portfolio.',
        rights: 'You may request access, correction, deletion, or clarification about information you sent by writing to jlmc97@gmail.com. Reasonable records may be retained when needed for security, contractual, or legal purposes.',
        reference: 'General Colombian data-protection guidance:'
      },
      terms: {
        title: 'Terms of use',
        intro: 'This site is a professional portfolio and informational channel. Browsing it does not create a client, employment, advisory, fiduciary, or confidential relationship.',
        item_contract: 'A project starts only after both parties accept a written scope, responsibilities, commercial terms, and applicable agreements.',
        item_accuracy: 'Reasonable care is taken with technical claims, but portfolio content may evolve and should be independently verified before a material decision.',
        item_financial: 'Quantitative and financial-system case studies are engineering demonstrations, not investment advice, performance promises, or invitations to trade.',
        item_ip: 'Original text, design, code, and project material remain protected by their respective rights. No license is granted except where a repository or asset explicitly states one.',
        item_external: 'External sites and services are controlled by their own operators; WV SOFTWARE does not control their availability, security, or terms.'
      },
      accessibility: {
        title: 'Accessibility',
        intro: 'The portfolio is designed toward WCAG 2.2 AA principles, but this statement is not a certification of full conformance. Accessibility is treated as an ongoing engineering responsibility.',
        item_keyboard: 'Semantic structure, visible focus states, keyboard-operable controls, and descriptive labels are used throughout the interface.',
        item_motion: 'Reduced-motion preferences disable or minimize non-essential animation.',
        item_visual: 'Responsive layouts, light and dark themes, scalable text, and contrast-aware states support different devices and viewing conditions.',
        item_feedback: 'If any content or interaction is difficult to access, email jlmc97@gmail.com with the page, device, and issue so it can be investigated.',
        reference: 'Accessibility reference used by this site:'
      },
      media: {
        title: 'Media credits',
        intro: 'Visual material is used to communicate service categories and professional context without implying that stock participants are clients or employees of WV SOFTWARE.',
        item_stock: 'Selected videos and images are sourced from Pexels under its applicable license; source URLs are recorded in the project ledger.',
        item_portrait: 'The professional portrait is AI-assisted and based on user-authorized reference material. It is presented as a professional visual, not documentary evidence of a specific event.',
        item_trademarks: 'Company, product, and technology names belong to their respective owners and are referenced only to describe experience or tooling.',
        reference: 'Detailed source record:',
        ledger: 'Open media ledger ↗'
      },
      transparency: {
        title: 'Professional transparency',
        intro: 'The portfolio separates implemented evidence from plans, confidential information, and outcomes that have not been independently established.',
        item_status: 'Current independent products are labeled as development, local prelaunch, or staging; they are not represented as production deployments.',
        item_client: 'The first WV SOFTWARE client engagement is anonymized, and sensitive repositories, infrastructure, and client information remain private.',
        item_results: 'No claim of production adoption, financial return, security certification, or guaranteed business result is made unless explicitly supported.',
        item_ai: 'AI assists planning, implementation, review, visual production, and workflow orchestration; José Luis remains responsible for human approval and published claims.'
      },
      contact: { text: 'Questions about privacy, accessibility, attribution, or a claim on this portfolio?', cta: 'Contact me' }
    },
    es: {
      nav: { back: 'Volver al portafolio', theme: 'Cambiar entre modo claro y oscuro' },
      intro: {
        eyebrow: 'WV SOFTWARE · Límites claros',
        title: 'Legal, accesibilidad y transparencia.',
        updated_label: 'Última actualización:',
        updated: '9 de agosto de 2026',
        lead: 'Una explicación directa de cómo funciona este portafolio, qué sucede cuando me contactas y qué límites aplican a su contenido. Esta información promueve la transparencia y no sustituye la asesoría de un profesional jurídico calificado.'
      },
      privacy: {
        title: 'Aviso de privacidad',
        intro: 'José Luis Martínez Cadavid, quien opera profesionalmente como WV SOFTWARE, es el punto de contacto para la información compartida voluntariamente mediante este portafolio.',
        item_local: 'Las preferencias de idioma y tema pueden guardarse localmente en tu navegador. No se transmiten a una base de datos de WV SOFTWARE.',
        item_contact: 'El formulario abre tu cliente de correo; los enlaces de email y WhatsApp te transfieren a esos proveedores. La información solo se recibe cuando decides enviarla y se usa para responder, definir o cotizar tu solicitud.',
        item_external: 'Google Fonts, jsDelivr, WhatsApp, LinkedIn y GitHub pueden recibir metadatos estándar de la solicitud y aplicar sus propias condiciones de privacidad al utilizar sus recursos o enlaces.',
        item_analytics: 'WV SOFTWARE actualmente no configura analítica propia, trackers publicitarios, cuentas de usuario ni cobros dentro de este portafolio.',
        rights: 'Puedes solicitar acceso, corrección, eliminación o aclaración sobre la información enviada escribiendo a jlmc97@gmail.com. Algunos registros razonables pueden conservarse cuando sean necesarios por motivos de seguridad, contractuales o legales.',
        reference: 'Orientación general colombiana sobre protección de datos:'
      },
      terms: {
        title: 'Términos de uso',
        intro: 'Este sitio es un portafolio profesional y un canal informativo. Visitarlo no crea una relación de cliente, empleo, asesoría, fiducia o confidencialidad.',
        item_contract: 'Un proyecto comienza únicamente cuando ambas partes aceptan por escrito su alcance, responsabilidades, condiciones comerciales y acuerdos aplicables.',
        item_accuracy: 'Se procura mantener afirmaciones técnicas precisas, pero el contenido puede evolucionar y debe verificarse independientemente antes de una decisión material.',
        item_financial: 'Los casos cuantitativos y financieros son demostraciones de ingeniería, no asesoría de inversión, promesas de rendimiento ni invitaciones a operar.',
        item_ip: 'El texto, diseño, código y material original conservan sus respectivos derechos. No se concede una licencia salvo cuando un repositorio o activo lo indique expresamente.',
        item_external: 'Los sitios y servicios externos son controlados por sus operadores; WV SOFTWARE no controla su disponibilidad, seguridad o condiciones.'
      },
      accessibility: {
        title: 'Accesibilidad',
        intro: 'El portafolio se diseña siguiendo principios WCAG 2.2 AA, pero esta declaración no certifica conformidad total. La accesibilidad se trata como una responsabilidad de ingeniería continua.',
        item_keyboard: 'La interfaz utiliza estructura semántica, foco visible, controles operables por teclado y etiquetas descriptivas.',
        item_motion: 'La preferencia de movimiento reducido desactiva o minimiza animaciones no esenciales.',
        item_visual: 'Layouts responsive, temas claro y oscuro, texto escalable y estados con contraste apoyan distintos dispositivos y condiciones de visualización.',
        item_feedback: 'Si algún contenido o interacción resulta difícil de usar, escribe a jlmc97@gmail.com indicando página, dispositivo y problema para investigarlo.',
        reference: 'Referencia de accesibilidad utilizada por este sitio:'
      },
      media: {
        title: 'Créditos multimedia',
        intro: 'El material visual comunica categorías de servicios y contexto profesional sin implicar que las personas de stock sean clientes o empleados de WV SOFTWARE.',
        item_stock: 'Algunos videos e imágenes provienen de Pexels bajo su licencia aplicable; las URLs de origen se registran en el inventario del proyecto.',
        item_portrait: 'El retrato profesional fue asistido por IA a partir de material de referencia autorizado por el usuario. Es una representación profesional, no evidencia documental de un evento específico.',
        item_trademarks: 'Los nombres de compañías, productos y tecnologías pertenecen a sus respectivos titulares y se mencionan únicamente para describir experiencia o herramientas.',
        reference: 'Registro detallado de fuentes:',
        ledger: 'Abrir inventario multimedia ↗'
      },
      transparency: {
        title: 'Transparencia profesional',
        intro: 'El portafolio separa la evidencia implementada de los planes, la información confidencial y los resultados que no han sido establecidos independientemente.',
        item_status: 'Los productos independientes actuales están marcados como desarrollo, prelaunch local o staging; no se presentan como despliegues productivos.',
        item_client: 'El primer proyecto de cliente de WV SOFTWARE está anonimizado y sus repositorios, infraestructura e información sensible permanecen privados.',
        item_results: 'No se afirma adopción productiva, retorno financiero, certificación de seguridad ni resultados comerciales garantizados sin soporte explícito.',
        item_ai: 'La IA asiste en planificación, implementación, revisión, producción visual y orquestación; José Luis conserva la aprobación humana y responsabilidad sobre las afirmaciones publicadas.'
      },
      contact: { text: '¿Tienes preguntas sobre privacidad, accesibilidad, atribución o alguna afirmación del portafolio?', cta: 'Contactarme' }
    },
    pt: {
      nav: { back: 'Voltar ao portfólio', theme: 'Alternar entre modo claro e escuro' },
      intro: {
        eyebrow: 'WV SOFTWARE · Limites claros',
        title: 'Legal, acessibilidade e transparência.',
        updated_label: 'Última atualização:',
        updated: '9 de agosto de 2026',
        lead: 'Uma explicação direta de como este portfólio funciona, o que acontece quando você entra em contato e quais limites se aplicam ao conteúdo. Esta informação promove transparência e não substitui assessoria jurídica qualificada.'
      },
      privacy: {
        title: 'Aviso de privacidade',
        intro: 'José Luis Martínez Cadavid, atuando profissionalmente como WV SOFTWARE, é o ponto de contato para informações compartilhadas voluntariamente através deste portfólio.',
        item_local: 'Preferências de idioma e tema podem ser armazenadas localmente no navegador e não são enviadas a um banco de dados da WV SOFTWARE.',
        item_contact: 'O formulário abre seu cliente de e-mail; os links de e-mail e WhatsApp transferem você para esses provedores. As informações só são recebidas quando você decide enviá-las e são usadas para responder ou orçar sua solicitação.',
        item_external: 'Google Fonts, jsDelivr, WhatsApp, LinkedIn e GitHub podem receber metadados padrão da solicitação e aplicar seus próprios termos de privacidade.',
        item_analytics: 'A WV SOFTWARE atualmente não configura analytics próprios, rastreadores publicitários, contas de usuário ou pagamentos neste portfólio.',
        rights: 'Você pode solicitar acesso, correção, exclusão ou esclarecimentos pelo e-mail jlmc97@gmail.com. Registros razoáveis podem ser mantidos por necessidades de segurança, contratuais ou legais.',
        reference: 'Orientação geral colombiana sobre proteção de dados:'
      },
      terms: {
        title: 'Termos de uso',
        intro: 'Este site é um portfólio profissional e canal informativo. A navegação não cria relação de cliente, emprego, assessoria, fidúcia ou confidencialidade.',
        item_contract: 'Um projeto começa somente após a aceitação escrita do escopo, responsabilidades, condições comerciais e acordos aplicáveis.',
        item_accuracy: 'Há cuidado razoável com as afirmações técnicas, mas o conteúdo pode evoluir e deve ser verificado antes de decisões materiais.',
        item_financial: 'Casos quantitativos e financeiros são demonstrações de engenharia, não assessoria de investimento, promessa de desempenho ou convite para operar.',
        item_ip: 'Texto, design, código e materiais originais mantêm seus respectivos direitos. Nenhuma licença é concedida salvo indicação expressa.',
        item_external: 'Sites e serviços externos são controlados por seus operadores; a WV SOFTWARE não controla disponibilidade, segurança ou termos.'
      },
      accessibility: {
        title: 'Acessibilidade',
        intro: 'O portfólio é projetado segundo princípios WCAG 2.2 AA, mas esta declaração não certifica conformidade total. A acessibilidade é uma responsabilidade contínua de engenharia.',
        item_keyboard: 'A interface usa estrutura semântica, foco visível, controles por teclado e rótulos descritivos.',
        item_motion: 'A preferência de movimento reduzido desativa ou minimiza animações não essenciais.',
        item_visual: 'Layouts responsivos, temas claro e escuro, texto escalável e estados com contraste apoiam diferentes dispositivos.',
        item_feedback: 'Se algum conteúdo ou interação for difícil de acessar, escreva para jlmc97@gmail.com informando página, dispositivo e problema.',
        reference: 'Referência de acessibilidade utilizada:'
      },
      media: {
        title: 'Créditos de mídia',
        intro: 'O material visual comunica categorias de serviços sem implicar que participantes de stock sejam clientes ou funcionários da WV SOFTWARE.',
        item_stock: 'Alguns vídeos e imagens vêm do Pexels sob a licença aplicável; as URLs de origem estão registradas no inventário do projeto.',
        item_portrait: 'O retrato profissional foi assistido por IA com material de referência autorizado pelo usuário. É uma representação profissional, não evidência documental de um evento.',
        item_trademarks: 'Nomes de empresas, produtos e tecnologias pertencem aos respectivos titulares e são citados apenas para descrever experiência ou ferramentas.',
        reference: 'Registro detalhado de fontes:',
        ledger: 'Abrir inventário de mídia ↗'
      },
      transparency: {
        title: 'Transparência profissional',
        intro: 'O portfólio separa evidência implementada de planos, informações confidenciais e resultados não estabelecidos independentemente.',
        item_status: 'Produtos independentes atuais são marcados como desenvolvimento, prelaunch local ou staging; não são apresentados como produção.',
        item_client: 'O primeiro projeto de cliente da WV SOFTWARE é anonimizado e seus repositórios, infraestrutura e informações sensíveis permanecem privados.',
        item_results: 'Não há alegação de adoção em produção, retorno financeiro, certificação de segurança ou resultado comercial garantido sem suporte explícito.',
        item_ai: 'A IA auxilia planejamento, implementação, revisão, produção visual e orquestração; José Luis mantém aprovação humana e responsabilidade pelas afirmações publicadas.'
      },
      contact: { text: 'Dúvidas sobre privacidade, acessibilidade, atribuição ou alguma afirmação do portfólio?', cta: 'Entrar em contato' }
    }
  };

  function getPath(source, path) {
    return path.split('.').reduce((value, part) => (value == null ? undefined : value[part]), source);
  }

  function applyLanguage(language) {
    const normalized = COPY[language] ? language : 'en';
    const dictionary = COPY[normalized];
    document.documentElement.lang = normalized;
    document.querySelectorAll('[data-legal-i18n]').forEach((element) => {
      const value = getPath(dictionary, element.dataset.legalI18n);
      if (typeof value === 'string') element.textContent = value;
    });
    const select = document.querySelector('#legalLanguage');
    if (select) select.value = normalized;
    const portfolioUrl = `index.html?lang=${encodeURIComponent(normalized)}#home`;
    ['#legalHomeLink', '#legalBackLink', '#legalFooterBackLink'].forEach((selector) => {
      const link = document.querySelector(selector);
      if (link) link.href = portfolioUrl;
    });
    const url = new URL(window.location.href);
    url.searchParams.set('lang', normalized);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    localStorage.setItem('lang', normalized);
  }

  function applyTheme(theme, persist) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${normalized}`);
    document.documentElement.style.colorScheme = normalized;
    const button = document.querySelector('#legalThemeToggle');
    if (button) button.setAttribute('aria-pressed', String(normalized === 'light'));
    if (persist) localStorage.setItem(THEME_STORAGE_KEY, normalized);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    const initialLanguage = COPY[queryLanguage] ? queryLanguage : (COPY[localStorage.getItem('lang')] ? localStorage.getItem('lang') : 'en');
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark'
      ? savedTheme
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyLanguage(initialLanguage);
    applyTheme(initialTheme, false);
    document.querySelector('#legalYear').textContent = new Date().getFullYear();
    document.querySelector('#legalLanguage').addEventListener('change', (event) => applyLanguage(event.target.value));
    document.querySelector('#legalThemeToggle').addEventListener('click', () => {
      applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark', true);
    });
  });
})();
