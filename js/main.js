(function () {
  'use strict';

  const CV_LINKS = {
    es: 'assets/cv/CV-ES.pdf',
    en: 'assets/cv/CV-EN.pdf',
    pt: 'assets/cv/CV-EN.pdf'
  };

  const THEME_STORAGE_KEY = 'uiThemePreference';
  const THEMES = {
    dark: 'theme-dark',
    light: 'theme-light'
  };

  let typewriterTimeline = null;
  let heroCarouselCall = null;
  let heroPreRollCall = null;
  let heroCarouselIndex = 0;
  let heroSlides = [];
  let typewriterGeneration = 0;
  let approachCycleTimeline = null;
  let approachCycleResizeObserver = null;
  let scrollMotionContext = null;
  let heroScrollTimeline = null;
  let heroTopGuardBound = false;
  let motionReady = false;
  let activeTypewriterPhrases = [];
  let activeLanguage = 'en';
  const motionBoundElements = new WeakSet();
  const HERO_PRE_ROLL_SECONDS = 1.2;
  const HERO_CROSSFADE_SECONDS = 1.25;
  const HERO_PHRASE_GROUPS = [
    [0, 1, 5, 7, 23],
    [2, 3, 4, 6, 22],
    [8, 10, 12, 17, 21],
    [9, 13, 15, 19, 24],
    [11, 14, 16, 18, 20]
  ];
  const HERO_MEDIA_GROUPS = [
    [0, 2, 9, 10, 16],
    [1, 3, 7, 11, 14, 22, 23],
    [4, 6, 8, 12, 13, 24],
    [5, 15, 17, 18, 19, 20, 21]
  ];

  const I18N = {
    en: {
      nav: { about: 'About', services: 'Services', work: 'Work', experience: 'Experience', approach: 'Approach', skills: 'Skills', contact: 'Contact' },
      theme: { toggle: 'Switch between light and dark mode' },
      hero: {
        eyebrow: 'José Luis Martínez Cadavid · Colombia',
        title: 'AI Full-Stack Engineer with security built in.',
        a11y_title: 'Let’s turn your vision into secure, useful software together.',
        phrases: [
          'Let’s build your idea or dream.',
          'Let’s turn your vision into software.',
          'Let’s design systems you can trust.',
          'Let’s automate what slows your business.',
          'Let’s build AI around your operation.',
          'Let’s create a platform that feels yours.',
          'Let’s connect your products, data, and devices.',
          'Let’s ship with evidence, together.',
          'Let’s turn attention into measurable demand.',
          'Let’s connect campaigns to business signals.',
          'Let’s build your acquisition engine.',
          'Let’s make every landing page earn its place.',
          'Let’s automate the path from lead to customer.',
          'Let’s design growth you can inspect.',
          'Let’s connect product, data, and distribution.',
          'Let’s make your marketing stack observable.',
          'Let’s test creative ideas with evidence.',
          'Let’s turn your customer journey into a system.',
          'Let’s build trust before the first click.',
          'Let’s grow what your operation can sustain.',
          'Let’s make your brand part of the conversation.',
          'Let’s turn content into a repeatable system.',
          'Let’s put intelligence where decisions happen.',
          'Let’s make your systems work as one.',
          'Let’s connect every signal to the next action.'
        ],
        subtitle: 'Bring the context, goals, and decisions that make your business unique. Together, we can shape them into secure AI products, cloud platforms, web systems, and quantitative tools—with visible progress from architecture to a production solution.',
        cta_work: 'Explore selected work',
        cta_cv: 'View résumé',
        cta_contact: 'Start a conversation',
        cta_services: 'See services →',
        metric_security_value: '6 years',
        metric_security_label: 'Professional experience across Mercado Libre, Alignerr & Promigas',
        metric_scope_value: 'End to end',
        metric_scope_label: 'AI · Backend · Frontend · Cloud',
        metric_focus_value: 'Security-first',
        metric_focus_label: 'Authority, validation, review, evidence',
        founder_title: 'Founder & AI Full-Stack Engineer',
        founder_tagline: 'Secure AI products, engineered end to end.',
        scroll: 'Scroll to discover more',
        media_labels: ['Client collaboration', 'Data visualization', 'Business strategy', 'Neural networks', 'Security engineering', 'Interactive analytics', 'Quantitative research', 'Connected data', 'Smart agriculture', 'Client discovery', 'Project collaboration', 'Digital data flow', 'Financial analysis', 'Data pipelines', 'AI networks', 'Social media strategy', 'Marketing planning', 'Growth analytics', 'Product content', 'Creative production', 'Social media management', 'Content creation', 'Applied AI signals', 'Intelligent data flow', 'System integration']
      },
      about: {
        eyebrow: 'About me',
        title: 'Security judgment, product ownership, collaborative delivery.',
        body: 'Before founding WV SOFTWARE, I spent five years in cybersecurity at Mercado Libre maintaining and auditing critical systems, building company-wide IAM workflows, developing SSO integrations, and reviewing code for production approval. Today I apply that judgment to AI-enabled products: bounded tool use, account-scoped context, deterministic fallbacks, observability, and infrastructure that can be operated—not just demonstrated.',
        collaboration_label: 'Built with you',
        collaboration_body: 'You stay inside the working loop: shaping priorities, reviewing evidence, and validating each release. The goal is not software delivered at you, but a system whose decisions and tradeoffs feel genuinely yours.',
        status: 'Current independent products are in development or staging. This portfolio distinguishes implemented work from roadmap work and does not claim production adoption or financial returns.'
      },
      services: {
        eyebrow: 'WV SOFTWARE · Services',
        title: 'Engineering and growth systems with accountable delivery.',
        intro: 'Focused engagements for companies that need architecture, implementation, security judgment, measurable acquisition, and a clear path from problem to production and market learning.',
        quote: 'Quote this service',
        quote_message: 'I would like to discuss a quote for:',
        cta_text: 'Not sure which service fits? Start with the problem. I will help define the safest, most useful scope.',
        cta: 'Discuss a project',
        company_eyebrow: 'WV SOFTWARE · Company',
        company_title: 'Learn more about us and our services.',
        company_body: 'Visit the WV SOFTWARE company page to explore our mission, vision, capabilities, engagement models, and the way we work alongside each client.',
        items: [
          { number: '01', title: 'System & Application Audits', body: 'Architecture, code, identity, data-flow, dependency, and operational reviews translated into a prioritized remediation plan.', deliverable: 'Audit · Findings · Action plan' },
          { number: '02', title: 'Full-Stack Platforms', body: 'Secure web products and internal platforms across backend, frontend, data, cloud infrastructure, testing, and staging delivery.', deliverable: 'Architecture · Build · Delivery' },
          { number: '03', title: 'Professional Websites', body: 'Fast, accessible, responsive websites and product pages built around clear positioning, conversion, analytics, and maintainable code.', deliverable: 'UX · Development · Launch' },
          { number: '04', title: 'Agentic Systems & MCP', body: 'Specialized agent workflows, tool orchestration, MCP servers, permissions, review gates, resource controls, and observability.', deliverable: 'Agents · Tools · Governance' },
          { number: '05', title: 'AI Chatbots & RAG', body: 'Account-scoped assistants and retrieval systems with validated context, citations, limits, fallbacks, and safe escalation paths.', deliverable: 'RAG · Chat · Evaluation' },
          { number: '06', title: 'Identity & SSO Integrations', body: 'IAM workflows, SSO/SAML, MFA, RBAC, access governance, approval controls, and identity-aware application architecture.', deliverable: 'IAM · SSO · Access controls' },
          { number: '07', title: 'IoT Integrations', body: 'Device-to-cloud telemetry, LoRa/LoRaWAN integrations, event processing, alerts, dashboards, and secure operational interfaces.', deliverable: 'Devices · Cloud · Operations' },
          { number: '08', title: 'Quant & Financial Systems', body: 'Market-data pipelines, research tooling, backtesting, portfolio/risk controls, dashboards, and bounded AI research interfaces.', deliverable: 'Data · Research · Risk' },
          { number: '09', title: 'Marketing & Growth Audits', body: 'Review acquisition channels, offer, funnel, landing pages, creative, analytics, attribution, privacy, and campaign economics—translated into a prioritized growth plan.', deliverable: 'Audit · Measurement map · Growth plan' },
          { number: '10', title: 'Paid Media Management', body: 'Meta Ads and Google Ads campaign architecture, audiences, budgets, creative experiments, optimization, and decision-ready reporting without guaranteed-result claims.', deliverable: 'Meta Ads · Google Ads · Optimization' },
          { number: '11', title: 'MarTech & Growth Development', body: 'Conversion landing pages, GA4, Google Tag Manager, Meta Pixel and Conversions API, CRM, email and WhatsApp lifecycle automation, and growth dashboards.', deliverable: 'Tracking · Automation · Conversion' },
          { number: '12', title: 'Social Media Management', body: 'Channel strategy, content calendars, publishing workflows, community management, creative coordination, social listening, reporting, and campaign-to-CRM handoff across the platforms that fit the business.', deliverable: 'Strategy · Content · Community' }
        ]
      },
      projects: {
        eyebrow: 'Selected work',
        title: 'Systems with a real problem, architecture, and safety boundary.',
        intro: 'Recent repositories are private because they contain client, security, trading, or infrastructure detail. These case studies expose the engineering evidence without exposing sensitive material.',
        items: [
          {
            name: 'Savia',
            category: 'Secure AI + IoT Agritech',
            status: 'Development / Staging',
            desc: 'A low-connectivity farm-monitoring platform connecting LoRa telemetry to cloud processing, actionable alerts, dashboards, LLM insights, and persistent SavIA chat.',
            highlights: ['Tenant-scoped access before every model call', 'Prompt/data trust boundaries, throttling, token and timeout ceilings', 'Django, Flutter, GCP, Terraform, Postgres, OpenRouter and embedded firmware'],
            stack: ['Python', 'Django', 'Flutter', 'GCP', 'Terraform', 'LoRa', 'OpenRouter']
          },
          {
            name: 'TBOT Platform',
            category: 'AI-Enabled Quantitative Research',
            status: 'Development / Staging',
            desc: 'A quantitative platform for market data, backtesting, strategy research, optimization, portfolio construction, risk controls, and trading operations.',
            highlights: ['Owner-scoped AI assistant and backtest explanations', 'MCP diagnostics plus bounded, simulation-only research tools', 'AI research is structurally separated from live-money authority'],
            stack: ['Python', 'FastAPI', 'TypeScript', 'Next.js', 'Postgres', 'Redis', 'MCP']
          },
          {
            name: 'Enterprise Operations Platform',
            category: 'WV SOFTWARE · Confidential Client',
            status: 'Staging',
            desc: 'WV SOFTWARE’s first independent client engagement: replacing spreadsheet-driven insurance operations with reviewed workflows, dashboards, identity controls, and audit trails.',
            highlights: ['Staging data for 1,000+ agents and approximately 9,700 contracts', 'Hybrid identity, MFA, scoped RBAC and review-before-commit imports', 'Django/React platform with GCP infrastructure and delivery automation'],
            stack: ['Django', 'React', 'TypeScript', 'Postgres', 'Redis', 'GCP', 'Terraform']
          },
          {
            name: 'PriceScout',
            category: 'AI-Assisted Price Intelligence',
            status: 'Development',
            desc: 'A Chrome extension and Python service that detect products and compare retailer results across the United States and Colombia.',
            highlights: ['LLM-assisted Spanish/English query translation', 'Cache, retry/backoff, length validation and reasoning-leak rejection', 'Deterministic pass-through when the model or provider cannot be trusted'],
            stack: ['Python', 'TypeScript', 'React', 'Chrome MV3', 'OpenRouter']
          },
          {
            name: 'Trendmart',
            category: 'Commerce Platform Engineering',
            status: 'Development / Local Prelaunch',
            desc: 'A production-oriented ecommerce foundation covering catalog, inventory, pricing, cart, orders, admin workflows, analytics, security gates, observability, and deployment design.',
            highlights: ['Typed OpenAPI client and strict backend/frontend quality gates', 'Operational runbooks, rollback design, alerts and privacy-aware observability', 'AI capabilities remain clearly labeled as roadmap until implemented'],
            stack: ['Django', 'Next.js', 'TypeScript', 'Postgres', 'Redis', 'Docker', 'GCP']
          }
        ]
      },
      experience: {
        eyebrow: 'Career',
        title: 'From enterprise security operations to secure AI products.',
        items: [
          {
            title: 'Founder & AI Full-Stack Engineer',
            org: 'WV SOFTWARE · Independent Practice · Colombia',
            period: '2025–Present',
            bullets: [
              'Lead discovery, architecture, implementation, review, staging delivery, and documentation for secure AI and full-stack products.',
              'Designed a spec-driven, agent-assisted delivery harness with specialized planning, implementation, review, and deployment roles under human approval gates.',
              'Build MCP, tool-calling, and RAG architectures with account scope, validation, cost limits, observability, and deterministic degradation.',
              'Delivered the first client platform to staging and develop personal products across agritech, quant finance, ecommerce, and price intelligence.'
            ]
          },
          {
            title: 'Software Engineer (AI Training)',
            org: 'Alignerr · Remote Contract',
            period: '2025–Present',
            bullets: [
              'Write, debug, and assess software-engineering solutions used to train and evaluate advanced AI systems.',
              'Review AI-generated code for correctness, efficiency, readability, security issues, edge cases, and engineering best practices.',
              'Provide structured technical feedback and compare alternative solutions against explicit quality criteria.'
            ]
          },
          {
            title: 'Cybersecurity SSr Engineer',
            org: 'Mercado Libre · Colombia',
            period: '2021–2025',
            bullets: [
              'Maintained, improved, and audited security-critical systems supporting enterprise identity and access management.',
              'Built and maintained a central ticketing and workflow platform that sanitized, validated, approved, and executed company-wide IAM processes.',
              'Developed numerous SSO integrations between external organizations and Mercado Libre using Python, web technologies, identity protocols, and SQL-backed systems.',
              'Worked across access governance, certification workflows, SoD, Entra ID/Azure AD, Okta, SSO/SAML, MFA, and cloud services.',
              'Served as a team code reviewer and member of a code-approval council, assessing changes and production readiness with IAM and AppSec judgment.'
            ]
          },
          {
            title: 'Information Security Intern',
            org: 'Promigas S.A. E.S.P. · Colombia',
            period: '2020–2021',
            bullets: ['Supported the Information Security function during a professional internship in a regulated enterprise environment.']
          }
        ]
      },
      approach: {
        eyebrow: 'Engineering method',
        title: 'AI-assisted delivery without outsourcing accountability.',
        intro: 'Specialized agents accelerate the work; specifications, authority, independent review, verification evidence, and human release decisions keep the work controlled.',
        cycle_label: 'Evidence and your feedback return to the next specification.',
        items: [
          { number: '01', title: 'Plan, specify & bound', body: 'Turn business goals, constraints, threats, authority boundaries, and acceptance criteria into a prioritized plan and implementable specifications before code.' },
          { number: '02', title: 'Build & implement', body: 'Implement the planned architecture in reviewable increments across product, code, data, integrations, and infrastructure.' },
          { number: '03', title: 'Review independently', body: 'Separate implementation from adversarial review and protect tests and invariants from silent weakening.' },
          { number: '04', title: 'Ship evidence', body: 'Use automated gates, visual checks, runbooks, monitoring, and staging acceptance to make status verifiable.' },
          { number: '05', title: 'Integrate continuously', body: 'Feed verified releases, monitoring, evidence, and your feedback into the next specification so the system keeps evolving safely with you.' }
        ]
      },
      skills: {
        eyebrow: 'Technical depth',
        title: 'Capabilities organized around systems, not badge walls.',
        cats: { ai: 'Applied AI', backend: 'Backend & Data', frontend: 'Product Interfaces', cloud: 'Cloud & Delivery', security: 'Security Engineering', quant: 'Quant Systems' }
      },
      education: { title: 'Education', items: ['B.Sc. in Systems and Computer Engineering — Universidad del Norte (2015–2021)'] },
      credentials: { title: 'Languages & Credentials', items: ['Spanish — Native · English — C1, Cambridge FCE · German — A2', 'Orgullo Caribe Scholarship — Universidad del Norte (2015)'] },
      footer: {
        tagline: 'Secure AI, full-stack, and systems engineering from Colombia.',
        availability: 'Colombia · Remote collaboration',
        explore: 'Explore', services: 'Services', approach: 'Approach', work: 'Selected work', about: 'About', contact: 'Contact',
        connect: 'Connect', email: 'Email', whatsapp: 'WhatsApp',
        legal: 'Legal & transparency', privacy: 'Privacy notice', terms: 'Terms of use', accessibility: 'Accessibility', media: 'Media credits',
        disclosure: 'Project status and claims are presented with explicit development, staging, and confidentiality boundaries.',
        back_top: 'Back to top'
      },
      game: {
        player: 'YOU', opponent: 'AI', instructions: 'MOVE · mouse / touch / ↑↓ / W S', exit: 'Back to portfolio',
        overline: 'Match complete', result_body: 'Play as many matches as you want or return whenever you are ready.', restart: 'Play again',
        win: 'You win.', lose: 'AI wins this one.', hint: 'Psst… hit it 3 times'
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Let’s build something that stands the test of time!',
        intro: 'Open to Senior AI Full-Stack, Applied AI, Backend/AI, and selected Quant Developer or Financial Systems roles—as well as carefully scoped WV SOFTWARE engagements.',
        next_step: 'What happens next: we clarify fit, define the smallest useful first step, and document the scope before any work begins.',
        send: 'Send message',
        ok: 'Your email client is opening.',
        email_cta: 'Request a quote by email',
        whatsapp_cta: 'Discuss it on WhatsApp',
        label_name: 'Name',
        label_email: 'Email',
        label_message: 'Project or problem to solve',
        email_subject: 'Project quote — WV SOFTWARE',
        whatsapp_message: 'Hello José Luis, I would like to discuss a project quote with WV SOFTWARE.',
        placeholders: { name: 'Name', email: 'Email', message: 'What are you building?' }
      }
    },
    es: {
      nav: { about: 'Acerca de mí', services: 'Servicios', work: 'Trabajo', experience: 'Experiencia', approach: 'Método', skills: 'Skills', contact: 'Contacto' },
      theme: { toggle: 'Cambiar entre modo claro y oscuro' },
      hero: {
        eyebrow: 'José Luis Martínez Cadavid · Colombia',
        title: 'Ingeniero Full-Stack de IA con seguridad incorporada.',
        a11y_title: 'Convirtamos tu visión en software seguro y útil, juntos.',
        phrases: [
          'Construyamos tu idea o sueño.',
          'Convirtamos tu visión en software.',
          'Diseñemos sistemas en los que puedas confiar.',
          'Automaticemos lo que frena tu negocio.',
          'Construyamos IA alrededor de tu operación.',
          'Creemos una plataforma que sientas tuya.',
          'Conectemos tus productos, datos y dispositivos.',
          'Entreguemos con evidencia, juntos.',
          'Convirtamos atención en demanda medible.',
          'Conectemos campañas con señales de negocio.',
          'Construyamos tu motor de adquisición.',
          'Hagamos que cada landing page se gane su lugar.',
          'Automaticemos el camino de lead a cliente.',
          'Diseñemos crecimiento que puedas inspeccionar.',
          'Conectemos producto, datos y distribución.',
          'Hagamos observable tu stack de marketing.',
          'Probemos ideas creativas con evidencia.',
          'Convirtamos el journey de tu cliente en sistema.',
          'Construyamos confianza antes del primer clic.',
          'Crezcamos al ritmo que tu operación soporte.',
          'Hagamos que tu marca sea parte de la conversación.',
          'Convirtamos el contenido en un sistema repetible.',
          'Llevemos inteligencia hasta donde se toman decisiones.',
          'Hagamos que tus sistemas trabajen como uno solo.',
          'Conectemos cada señal con la siguiente acción.'
        ],
        subtitle: 'Tú aportas el contexto, los objetivos y las decisiones que hacen único a tu negocio. Juntos los convertimos en productos seguros de IA, plataformas cloud, sistemas web y herramientas cuantitativas, con progreso visible desde la arquitectura hasta la solución en producción.',
        cta_work: 'Ver trabajo seleccionado',
        cta_cv: 'Ver hoja de vida',
        cta_contact: 'Conversemos',
        cta_services: 'Ver servicios →',
        metric_security_value: '6 años',
        metric_security_label: 'Experiencia profesional entre Mercado Libre, Alignerr y Promigas',
        metric_scope_value: 'End to end',
        metric_scope_label: 'IA · Backend · Frontend · Cloud',
        metric_focus_value: 'Security-first',
        metric_focus_label: 'Autoridad, validación, revisión y evidencia',
        founder_title: 'Fundador e Ingeniero Full-Stack de IA',
        founder_tagline: 'Productos seguros de IA, diseñados de extremo a extremo.',
        scroll: 'Desplaza para conocer más',
        media_labels: ['Colaboración con clientes', 'Visualización de datos', 'Estrategia de negocio', 'Redes neuronales', 'Ingeniería de seguridad', 'Analítica interactiva', 'Investigación cuantitativa', 'Datos conectados', 'Agricultura inteligente', 'Descubrimiento con clientes', 'Colaboración de proyectos', 'Flujo de datos digital', 'Análisis financiero', 'Pipelines de datos', 'Redes de IA', 'Estrategia de redes sociales', 'Planeación de marketing', 'Analítica de crecimiento', 'Contenido de producto', 'Producción creativa', 'Gestión de redes sociales', 'Creación de contenido', 'Señales de IA aplicada', 'Flujo inteligente de datos', 'Integración de sistemas']
      },
      about: {
        eyebrow: 'Acerca de mí',
        title: 'Criterio de seguridad, ownership de producto y entrega colaborativa.',
        body: 'Antes de fundar WV SOFTWARE trabajé cinco años en ciberseguridad en Mercado Libre, manteniendo y auditando sistemas críticos, construyendo workflows IAM para toda la compañía, desarrollando integraciones SSO y revisando código para aprobación productiva. Hoy aplico ese criterio a productos habilitados por IA: herramientas acotadas, contexto por cuenta, fallbacks determinísticos, observabilidad e infraestructura operable, no solo demostrable.',
        collaboration_label: 'Construido contigo',
        collaboration_body: 'Permaneces dentro del flujo de trabajo: defines prioridades, revisas evidencia y validas cada entrega. La meta no es entregarte software desde afuera, sino construir un sistema cuyas decisiones y tradeoffs sientas realmente tuyos.',
        status: 'Los productos independientes actuales están en desarrollo o staging. Este portafolio diferencia lo implementado del roadmap y no afirma adopción productiva ni retornos financieros.'
      },
      services: {
        eyebrow: 'WV SOFTWARE · Servicios',
        title: 'Ingeniería y crecimiento digital con entrega responsable.',
        intro: 'Proyectos para empresas que necesitan arquitectura, implementación, seguridad, adquisición medible y un camino claro desde el problema hasta producción y aprendizaje de mercado.',
        quote: 'Cotizar este servicio',
        quote_message: 'Me gustaría solicitar una cotización para:',
        cta_text: '¿No sabes cuál servicio necesitas? Empecemos por el problema y definamos el alcance más seguro y útil.',
        cta: 'Cotizar un proyecto',
        company_eyebrow: 'WV SOFTWARE · Empresa',
        company_title: 'Conoce más de nosotros y nuestros servicios.',
        company_body: 'Visita la página de WV SOFTWARE para conocer nuestra misión, visión, capacidades, modelos de trabajo y forma de acompañar cada proyecto.',
        items: [
          { number: '01', title: 'Auditoría de Sistemas y Aplicaciones', body: 'Revisión de arquitectura, código, identidad, flujos de datos, dependencias y operación, convertida en un plan priorizado de mejoras.', deliverable: 'Auditoría · Hallazgos · Plan de acción' },
          { number: '02', title: 'Plataformas Full-Stack', body: 'Productos web y plataformas internas seguras: backend, frontend, datos, infraestructura cloud, pruebas y entrega a staging.', deliverable: 'Arquitectura · Desarrollo · Entrega' },
          { number: '03', title: 'Páginas Web Profesionales', body: 'Websites y landing pages rápidas, accesibles y responsive, diseñadas para comunicar, convertir, medir y mantenerse con facilidad.', deliverable: 'UX · Desarrollo · Lanzamiento' },
          { number: '04', title: 'Sistemas Agénticos y MCP', body: 'Workflows de agentes especializados, orquestación de herramientas, servidores MCP, permisos, revisión, límites de recursos y observabilidad.', deliverable: 'Agentes · Herramientas · Gobierno' },
          { number: '05', title: 'Chatbots de IA y RAG', body: 'Asistentes con contexto por cuenta y sistemas de recuperación con validación, citas, límites, fallbacks y escalamiento seguro.', deliverable: 'RAG · Chat · Evaluación' },
          { number: '06', title: 'Identidad e Integraciones SSO', body: 'Workflows IAM, SSO/SAML, MFA, RBAC, gobierno de accesos, controles de aprobación y arquitectura consciente de identidad.', deliverable: 'IAM · SSO · Control de acceso' },
          { number: '07', title: 'Integraciones IoT', body: 'Telemetría device-to-cloud, LoRa/LoRaWAN, procesamiento de eventos, alertas, dashboards e interfaces operativas seguras.', deliverable: 'Dispositivos · Cloud · Operación' },
          { number: '08', title: 'Sistemas Cuantitativos y Financieros', body: 'Pipelines de mercado, investigación, backtesting, controles de portafolio/riesgo, dashboards e interfaces de IA acotadas.', deliverable: 'Datos · Investigación · Riesgo' },
          { number: '09', title: 'Auditoría de Marketing y Growth', body: 'Revisión de canales, oferta, funnel, landing pages, creatividades, analítica, atribución, privacidad y economía de campañas, convertida en un plan priorizado.', deliverable: 'Auditoría · Mapa de medición · Plan de growth' },
          { number: '10', title: 'Gestión de Medios Pagos', body: 'Arquitectura y gestión de campañas en Meta Ads y Google Ads: audiencias, presupuestos, experimentos creativos, optimización y reportes para decidir, sin promesas de resultados garantizados.', deliverable: 'Meta Ads · Google Ads · Optimización' },
          { number: '11', title: 'MarTech y Automatización de Growth', body: 'Landing pages de conversión, GA4, Google Tag Manager, Meta Pixel y Conversions API, CRM, automatizaciones de email y WhatsApp, y dashboards de crecimiento.', deliverable: 'Tracking · Automatización · Conversión' },
          { number: '12', title: 'Gestión de Redes Sociales', body: 'Estrategia por canal, calendarios de contenido, flujos de publicación, gestión de comunidad, coordinación creativa, escucha social, reportes y conexión de campañas con CRM en las plataformas adecuadas para el negocio.', deliverable: 'Estrategia · Contenido · Comunidad' }
        ]
      },
      projects: {
        eyebrow: 'Trabajo seleccionado',
        title: 'Sistemas con problema real, arquitectura y límites de seguridad.',
        intro: 'Los repositorios recientes son privados porque contienen información de clientes, seguridad, trading o infraestructura. Estos casos muestran la evidencia de ingeniería sin exponer material sensible.',
        items: [
          {
            name: 'Savia',
            category: 'Agritech Segura de IA + IoT',
            status: 'Desarrollo / Staging',
            desc: 'Plataforma para fincas con conectividad limitada que conecta telemetría LoRa con procesamiento cloud, alertas accionables, dashboards, insights LLM y chat SavIA persistente.',
            highlights: ['Acceso por tenant antes de cada llamada al modelo', 'Separación de confianza prompt/datos, throttling y topes de tokens/tiempo', 'Django, Flutter, GCP, Terraform, Postgres, OpenRouter y firmware'],
            stack: ['Python', 'Django', 'Flutter', 'GCP', 'Terraform', 'LoRa', 'OpenRouter']
          },
          {
            name: 'TBOT Platform',
            category: 'Investigación Cuantitativa con IA',
            status: 'Desarrollo / Staging',
            desc: 'Plataforma para datos de mercado, backtesting, investigación de estrategias, optimización, construcción de portafolios, riesgo y operaciones de trading.',
            highlights: ['Asistente de IA por propietario y explicación de backtests', 'Diagnósticos MCP y herramientas de investigación limitadas a simulaciones', 'La investigación con IA está separada estructuralmente de la autoridad sobre dinero real'],
            stack: ['Python', 'FastAPI', 'TypeScript', 'Next.js', 'Postgres', 'Redis', 'MCP']
          },
          {
            name: 'Plataforma de Operaciones Empresariales',
            category: 'WV SOFTWARE · Cliente Confidencial',
            status: 'Staging',
            desc: 'Primer cliente independiente de WV SOFTWARE: reemplazo de operaciones de seguros basadas en hojas de cálculo por workflows revisables, dashboards, controles de identidad y audit trails.',
            highlights: ['Datos de staging para más de 1.000 agentes y aproximadamente 9.700 contratos', 'Identidad híbrida, MFA, RBAC por alcance e importaciones preview-before-commit', 'Plataforma Django/React con infraestructura GCP y automatización de entrega'],
            stack: ['Django', 'React', 'TypeScript', 'Postgres', 'Redis', 'GCP', 'Terraform']
          },
          {
            name: 'PriceScout',
            category: 'Inteligencia de Precios Asistida por IA',
            status: 'Desarrollo',
            desc: 'Extensión de Chrome y servicio Python que detectan productos y comparan comercios de Estados Unidos y Colombia.',
            highlights: ['Traducción ES/EN asistida por LLM', 'Caché, retry/backoff, validación de longitud y rechazo de razonamiento filtrado', 'Fallback determinístico cuando el modelo o proveedor no es confiable'],
            stack: ['Python', 'TypeScript', 'React', 'Chrome MV3', 'OpenRouter']
          },
          {
            name: 'Trendmart',
            category: 'Ingeniería de Plataforma Ecommerce',
            status: 'Desarrollo / Prelaunch Local',
            desc: 'Base ecommerce orientada a producción con catálogo, inventario, precios, carrito, pedidos, administración, analítica, controles de seguridad, observabilidad y diseño de despliegue.',
            highlights: ['Cliente OpenAPI tipado y gates estrictos de backend/frontend', 'Runbooks operativos, rollback, alertas y observabilidad con privacidad', 'Las capacidades de IA se mantienen como roadmap hasta estar implementadas'],
            stack: ['Django', 'Next.js', 'TypeScript', 'Postgres', 'Redis', 'Docker', 'GCP']
          }
        ]
      },
      experience: {
        eyebrow: 'Trayectoria',
        title: 'De operaciones de seguridad empresarial a productos seguros de IA.',
        items: [
          {
            title: 'Fundador e Ingeniero Full-Stack de IA',
            org: 'WV SOFTWARE · Práctica Independiente · Colombia',
            period: '2025–Presente',
            bullets: [
              'Lidero discovery, arquitectura, implementación, revisión, entrega a staging y documentación de productos seguros de IA y full-stack.',
              'Diseñé un arnés spec-driven asistido por agentes con roles de planificación, implementación, revisión y despliegue bajo aprobación humana.',
              'Construyo arquitecturas MCP, tool calling y RAG con alcance por cuenta, validación, límites de costo, observabilidad y degradación determinística.',
              'Entregué a staging la primera plataforma para un cliente y desarrollo productos propios en agritech, finanzas cuantitativas, ecommerce e inteligencia de precios.'
            ]
          },
          {
            title: 'Software Engineer (AI Training)',
            org: 'Alignerr · Contrato Remoto',
            period: '2025–Presente',
            bullets: [
              'Escribo, depuro y evalúo soluciones de ingeniería de software utilizadas para entrenar y evaluar sistemas avanzados de IA.',
              'Reviso código generado por IA en cuanto a corrección, eficiencia, legibilidad, seguridad, casos límite y buenas prácticas de ingeniería.',
              'Proporciono feedback técnico estructurado y comparo soluciones alternativas contra criterios explícitos de calidad.'
            ]
          },
          {
            title: 'Cybersecurity SSr Engineer',
            org: 'Mercado Libre · Colombia',
            period: '2021–2025',
            bullets: [
              'Mantuve, mejoré y audité sistemas críticos para la gestión empresarial de identidades y accesos.',
              'Construí y mantuve una plataforma central de tickets y workflows que sanitizaba, validaba, aprobaba y ejecutaba procesos IAM de toda la compañía.',
              'Desarrollé numerosas integraciones SSO entre organizaciones externas y Mercado Libre mediante Python, tecnologías web, protocolos de identidad y SQL.',
              'Trabajé con gobierno de accesos, certificaciones, SoD, Entra ID/Azure AD, Okta, SSO/SAML, MFA y servicios cloud.',
              'Fui revisor de código y miembro de un consejo de aprobación, evaluando cambios con criterio de IAM y AppSec.'
            ]
          },
          {
            title: 'Practicante de Seguridad de la Información',
            org: 'Promigas S.A. E.S.P. · Colombia',
            period: '2020–2021',
            bullets: ['Apoyé la función de Seguridad de la Información durante las prácticas profesionales en un entorno empresarial regulado.']
          }
        ]
      },
      approach: {
        eyebrow: 'Método de ingeniería',
        title: 'Entrega asistida por IA sin tercerizar la responsabilidad.',
        intro: 'Los agentes especializados aceleran el trabajo; las especificaciones, autoridad, revisión independiente, evidencia y decisiones humanas de release mantienen el control.',
        cycle_label: 'La evidencia y tu feedback regresan a la siguiente especificación.',
        items: [
          { number: '01', title: 'Planificar, especificar y delimitar', body: 'Convertir objetivos, restricciones, amenazas, límites de autoridad y criterios de aceptación en un plan priorizado y specs implementables antes del código.' },
          { number: '02', title: 'Desarrollar e implementar', body: 'Construir la arquitectura planificada en incrementos revisables a través de producto, código, datos, integraciones e infraestructura.' },
          { number: '03', title: 'Revisar de forma independiente', body: 'Separar implementación y revisión adversarial, protegiendo tests e invariantes contra debilitamientos silenciosos.' },
          { number: '04', title: 'Entregar evidencia', body: 'Usar gates automatizados, validación visual, runbooks, monitoreo y aceptación en staging para verificar el estado.' },
          { number: '05', title: 'Integrar continuamente', body: 'Incorporar releases verificados, monitoreo, evidencia y tu feedback a la siguiente especificación para que el sistema evolucione contigo de forma segura.' }
        ]
      },
      skills: {
        eyebrow: 'Profundidad técnica',
        title: 'Capacidades organizadas alrededor de sistemas, no de badges.',
        cats: { ai: 'IA Aplicada', backend: 'Backend y Datos', frontend: 'Interfaces de Producto', cloud: 'Cloud y Entrega', security: 'Ingeniería de Seguridad', quant: 'Sistemas Cuantitativos' }
      },
      education: { title: 'Educación', items: ['Ingeniería de Sistemas y Computación — Universidad del Norte (2015–2021)'] },
      credentials: { title: 'Idiomas y Credenciales', items: ['Español — Nativo · Inglés — C1, Cambridge FCE · Alemán — A2', 'Beca Orgullo Caribe — Universidad del Norte (2015)'] },
      footer: {
        tagline: 'Ingeniería segura de IA, full-stack y sistemas desde Colombia.',
        availability: 'Colombia · Colaboración remota',
        explore: 'Explorar', services: 'Servicios', approach: 'Método', work: 'Trabajo seleccionado', about: 'Acerca de mí', contact: 'Contacto',
        connect: 'Conectar', email: 'Correo', whatsapp: 'WhatsApp',
        legal: 'Legal y transparencia', privacy: 'Aviso de privacidad', terms: 'Términos de uso', accessibility: 'Accesibilidad', media: 'Créditos multimedia',
        disclosure: 'El estado y las afirmaciones de cada proyecto respetan límites explícitos de desarrollo, staging y confidencialidad.',
        back_top: 'Volver arriba'
      },
      game: {
        player: 'TÚ', opponent: 'IA', instructions: 'MUEVE · mouse / touch / ↑↓ / W S', exit: 'Volver al portafolio',
        overline: 'Partida terminada', result_body: 'Juega todas las partidas que quieras o vuelve cuando estés listo.', restart: 'Jugar de nuevo',
        win: 'Ganaste.', lose: 'La IA gana esta vez.', hint: 'Psst… dale 3 veces'
      },
      contact: {
        eyebrow: 'Contacto',
        title: '¡Construyamos algo que supere la barrera del tiempo!',
        intro: 'Abierto a roles Senior AI Full-Stack, Applied AI, Backend/AI y oportunidades seleccionadas como Quant Developer o Financial Systems, además de proyectos bien definidos con WV SOFTWARE.',
        next_step: '¿Qué sigue? Aclaramos el encaje, definimos el primer paso útil más pequeño y documentamos el alcance antes de iniciar cualquier trabajo.',
        send: 'Enviar mensaje',
        ok: 'Abriendo tu cliente de correo.',
        email_cta: 'Solicitar cotización por email',
        whatsapp_cta: 'Conversar por WhatsApp',
        label_name: 'Nombre',
        label_email: 'Correo electrónico',
        label_message: 'Proyecto o problema por resolver',
        email_subject: 'Cotización de proyecto — WV SOFTWARE',
        whatsapp_message: 'Hola José Luis, me gustaría conversar sobre una cotización para un proyecto con WV SOFTWARE.',
        placeholders: { name: 'Nombre', email: 'Email', message: '¿Qué estás construyendo?' }
      }
    },
    pt: {
      nav: { about: 'Sobre mim', services: 'Serviços', work: 'Projetos', experience: 'Experiência', approach: 'Método', skills: 'Habilidades', contact: 'Contato' },
      theme: { toggle: 'Alternar entre modo claro e escuro' },
      hero: {
        eyebrow: 'José Luis Martínez Cadavid · Colômbia',
        title: 'Engenheiro Full-Stack de IA com segurança incorporada.',
        a11y_title: 'Vamos transformar sua visão em software seguro e útil, juntos.',
        phrases: [
          'Vamos construir sua ideia ou sonho.',
          'Vamos transformar sua visão em software.',
          'Vamos projetar sistemas confiáveis.',
          'Vamos automatizar o que limita seu negócio.',
          'Vamos criar IA ao redor da sua operação.',
          'Vamos criar uma plataforma que seja sua.',
          'Vamos conectar produtos, dados e dispositivos.',
          'Vamos entregar com evidência, juntos.',
          'Vamos transformar atenção em demanda mensurável.',
          'Vamos conectar campanhas a sinais de negócio.',
          'Vamos construir seu motor de aquisição.',
          'Vamos fazer cada landing page justificar seu lugar.',
          'Vamos automatizar o caminho de lead a cliente.',
          'Vamos projetar crescimento inspecionável.',
          'Vamos conectar produto, dados e distribuição.',
          'Vamos tornar seu stack de marketing observável.',
          'Vamos testar ideias criativas com evidência.',
          'Vamos transformar a jornada do cliente em sistema.',
          'Vamos construir confiança antes do primeiro clique.',
          'Vamos crescer no ritmo que sua operação sustenta.',
          'Vamos fazer sua marca participar da conversa.',
          'Vamos transformar conteúdo em um sistema repetível.',
          'Vamos levar inteligência até onde as decisões acontecem.',
          'Vamos fazer seus sistemas trabalharem como um só.',
          'Vamos conectar cada sinal à próxima ação.'
        ],
        subtitle: 'Você traz o contexto, as metas e as decisões que tornam seu negócio único. Juntos, transformamos isso em produtos seguros de IA, plataformas cloud, sistemas web e ferramentas quantitativas, com progresso visível da arquitetura à solução em produção.',
        cta_work: 'Ver projetos', cta_cv: 'Ver currículo', cta_contact: 'Conversar', cta_services: 'Ver serviços →',
        metric_security_value: '6 anos', metric_security_label: 'Experiência profissional entre Mercado Libre, Alignerr e Promigas',
        metric_scope_value: 'End to end', metric_scope_label: 'IA · Backend · Frontend · Cloud',
        metric_focus_value: 'Security-first', metric_focus_label: 'Autoridade, validação, revisão e evidência',
        founder_title: 'Fundador e Engenheiro Full-Stack de IA', founder_tagline: 'Produtos seguros de IA, de ponta a ponta.',
        scroll: 'Role para conhecer mais',
        media_labels: ['Colaboração com clientes', 'Visualização de dados', 'Estratégia de negócios', 'Redes neurais', 'Engenharia de segurança', 'Análise interativa', 'Pesquisa quantitativa', 'Dados conectados', 'Agricultura inteligente', 'Descoberta com clientes', 'Colaboração de projetos', 'Fluxo digital de dados', 'Análise financeira', 'Pipelines de dados', 'Redes de IA', 'Estratégia de mídias sociais', 'Planejamento de marketing', 'Análise de crescimento', 'Conteúdo de produto', 'Produção criativa', 'Gestão de redes sociais', 'Criação de conteúdo', 'Sinais de IA aplicada', 'Fluxo inteligente de dados', 'Integração de sistemas']
      },
      about: {
        eyebrow: 'Sobre mim', title: 'Critério de segurança, ownership de produto e entrega colaborativa.',
        body: 'Antes de fundar a WV SOFTWARE, trabalhei cinco anos em cibersegurança no Mercado Libre, mantendo e auditando sistemas críticos, construindo workflows IAM, integrações SSO e revisando código para produção. Hoje aplico esse julgamento a produtos com IA, contexto por conta, ferramentas limitadas, fallbacks determinísticos e infraestrutura operável.',
        collaboration_label: 'Construído com você',
        collaboration_body: 'Você participa do fluxo de trabalho: define prioridades, revisa evidências e valida cada entrega. O objetivo é construir um sistema cujas decisões e tradeoffs sejam realmente seus.',
        status: 'Os produtos independentes atuais estão em desenvolvimento ou staging; não reivindico adoção em produção nem retornos financeiros.'
      },
      services: {
        eyebrow: 'WV SOFTWARE · Serviços',
        title: 'Engenharia e crescimento digital com entrega responsável.',
        intro: 'Projetos para empresas que precisam de arquitetura, implementação, segurança, aquisição mensurável e um caminho claro até produção e aprendizado de mercado.',
        quote: 'Solicitar orçamento',
        quote_message: 'Gostaria de solicitar um orçamento para:',
        cta_text: 'Não sabe qual serviço se encaixa? Comecemos pelo problema e definamos o escopo mais seguro e útil.',
        cta: 'Conversar sobre um projeto',
        company_eyebrow: 'WV SOFTWARE · Empresa',
        company_title: 'Conheça mais sobre nós e nossos serviços.',
        company_body: 'Visite a página da WV SOFTWARE para conhecer nossa missão, visão, capacidades, modelos de trabalho e como acompanhamos cada projeto.',
        items: [
          { number: '01', title: 'Auditoria de Sistemas e Aplicações', body: 'Revisão de arquitetura, código, identidade, dados, dependências e operação com um plano priorizado de melhorias.', deliverable: 'Auditoria · Achados · Plano' },
          { number: '02', title: 'Plataformas Full-Stack', body: 'Produtos web e plataformas internas seguras, do backend e frontend até dados, cloud, testes e staging.', deliverable: 'Arquitetura · Build · Entrega' },
          { number: '03', title: 'Sites Profissionais', body: 'Sites e landing pages rápidos, acessíveis e responsivos, construídos para comunicar, converter e serem mantidos.', deliverable: 'UX · Desenvolvimento · Lançamento' },
          { number: '04', title: 'Sistemas Agênticos e MCP', body: 'Workflows de agentes, ferramentas, servidores MCP, permissões, revisão, limites de recursos e observabilidade.', deliverable: 'Agentes · Ferramentas · Governança' },
          { number: '05', title: 'Chatbots de IA e RAG', body: 'Assistentes com contexto controlado, recuperação, citações, validação, limites, fallbacks e escalonamento seguro.', deliverable: 'RAG · Chat · Avaliação' },
          { number: '06', title: 'Identidade e Integrações SSO', body: 'IAM, SSO/SAML, MFA, RBAC, governança de acessos, aprovações e arquitetura orientada à identidade.', deliverable: 'IAM · SSO · Acesso' },
          { number: '07', title: 'Integrações IoT', body: 'Telemetria device-to-cloud, LoRa/LoRaWAN, eventos, alertas, dashboards e interfaces operacionais seguras.', deliverable: 'Dispositivos · Cloud · Operação' },
          { number: '08', title: 'Sistemas Quantitativos e Financeiros', body: 'Dados de mercado, pesquisa, backtesting, controles de portfólio/risco, dashboards e IA com autoridade limitada.', deliverable: 'Dados · Pesquisa · Risco' },
          { number: '09', title: 'Auditoria de Marketing e Growth', body: 'Revisão de canais, oferta, funil, landing pages, criativos, analytics, atribuição, privacidade e economia de campanhas, convertida em um plano priorizado.', deliverable: 'Auditoria · Mapa de medição · Plano de growth' },
          { number: '10', title: 'Gestão de Mídia Paga', body: 'Arquitetura e gestão de campanhas em Meta Ads e Google Ads: públicos, orçamentos, testes criativos, otimização e relatórios para decisão, sem promessas de resultado garantido.', deliverable: 'Meta Ads · Google Ads · Otimização' },
          { number: '11', title: 'MarTech e Automação de Growth', body: 'Landing pages de conversão, GA4, Google Tag Manager, Meta Pixel e Conversions API, CRM, automações de e-mail e WhatsApp e dashboards de crescimento.', deliverable: 'Tracking · Automação · Conversão' },
          { number: '12', title: 'Gestão de Redes Sociais', body: 'Estratégia por canal, calendários de conteúdo, fluxos de publicação, gestão de comunidade, coordenação criativa, escuta social, relatórios e integração de campanhas com CRM nas plataformas adequadas ao negócio.', deliverable: 'Estratégia · Conteúdo · Comunidade' }
        ]
      },
      projects: { eyebrow: 'Projetos selecionados', title: 'Sistemas com problema real, arquitetura e limites de segurança.', intro: 'Os repositórios recentes são privados; estes casos mostram a engenharia sem expor material sensível.', items: [] },
      experience: { eyebrow: 'Carreira', title: 'Da segurança empresarial a produtos seguros de IA.', items: [] },
      approach: {
        eyebrow: 'Método', title: 'Entrega assistida por IA sem terceirizar a responsabilidade.', intro: 'Agentes especializados aceleram o trabalho; especificações, autoridade, revisão independente e decisões humanas mantêm o controle.',
        cycle_label: 'A evidência e seu feedback retornam à próxima especificação.',
        items: [
          { number: '01', title: 'Planejar, especificar e delimitar', body: 'Transformar objetivos, restrições, ameaças, limites de autoridade e critérios de aceitação em um plano priorizado e specs implementáveis.' },
          { number: '02', title: 'Desenvolver e implementar', body: 'Construir a arquitetura planejada em incrementos revisáveis de produto, código, dados, integrações e infraestrutura.' },
          { number: '03', title: 'Revisar', body: 'Separar implementação de revisão adversarial e proteger testes e invariantes.' },
          { number: '04', title: 'Entregar evidência', body: 'Usar gates, checks visuais, runbooks, monitoramento e staging.' },
          { number: '05', title: 'Integrar continuamente', body: 'Levar releases verificados, monitoramento, evidências e seu feedback à próxima especificação para que o sistema evolua com você.' }
        ]
      },
      skills: { eyebrow: 'Profundidade técnica', title: 'Capacidades organizadas ao redor de sistemas.', cats: { ai: 'IA Aplicada', backend: 'Backend e Dados', frontend: 'Interfaces', cloud: 'Cloud e Entrega', security: 'Segurança', quant: 'Sistemas Quantitativos' } },
      education: { title: 'Educação', items: ['Engenharia de Sistemas e Computação — Universidad del Norte (2015–2021)'] },
      credentials: { title: 'Idiomas e Credenciais', items: ['Espanhol — Nativo · Inglês — C1, Cambridge FCE · Alemão — A2', 'Bolsa Orgullo Caribe — Universidad del Norte (2015)'] },
      footer: {
        tagline: 'Engenharia segura de IA, full-stack e sistemas a partir da Colômbia.',
        availability: 'Colômbia · Colaboração remota',
        explore: 'Explorar', services: 'Serviços', approach: 'Método', work: 'Projetos selecionados', about: 'Sobre mim', contact: 'Contato',
        connect: 'Conectar', email: 'E-mail', whatsapp: 'WhatsApp',
        legal: 'Legal e transparência', privacy: 'Aviso de privacidade', terms: 'Termos de uso', accessibility: 'Acessibilidade', media: 'Créditos de mídia',
        disclosure: 'O estado e as afirmações de cada projeto respeitam limites explícitos de desenvolvimento, staging e confidencialidade.',
        back_top: 'Voltar ao topo'
      },
      game: {
        player: 'VOCÊ', opponent: 'IA', instructions: 'MOVA · mouse / touch / ↑↓ / W S', exit: 'Voltar ao portfólio',
        overline: 'Partida concluída', result_body: 'Jogue quantas partidas quiser ou volte quando estiver pronto.', restart: 'Jogar novamente',
        win: 'Você venceu.', lose: 'A IA venceu desta vez.', hint: 'Psst… toque 3 vezes'
      },
      contact: {
        eyebrow: 'Contato', title: 'Vamos construir algo que supere a barreira do tempo!', intro: 'Aberto a oportunidades em AI Full-Stack, Applied AI, Backend/AI e sistemas quantitativos, além de projetos com a WV SOFTWARE.', next_step: 'O próximo passo: esclarecemos o encaixe, definimos o menor primeiro passo útil e documentamos o escopo antes de iniciar qualquer trabalho.',
        send: 'Enviar mensagem', ok: 'Abrindo seu cliente de e-mail.', email_cta: 'Solicitar orçamento por e-mail', whatsapp_cta: 'Conversar pelo WhatsApp',
        label_name: 'Nome', label_email: 'E-mail', label_message: 'Projeto ou problema a resolver', email_subject: 'Orçamento de projeto — WV SOFTWARE', whatsapp_message: 'Olá José Luis, gostaria de conversar sobre um orçamento de projeto com a WV SOFTWARE.',
        placeholders: { name: 'Nome', email: 'Email', message: 'O que você está construindo?' }
      }
    }
  };

  // The Portuguese profile keeps the interface translated while reusing the complete English
  // evidence until a native review is available.
  I18N.pt.projects.items = I18N.en.projects.items;
  I18N.pt.experience.items = I18N.en.experience.items;

  const SKILLS = [
    { key: 'ai', items: ['Agentic workflows', 'Tool calling', 'MCP', 'RAG', 'LLM integration', 'Prompt security', 'Evaluations', 'Deterministic fallbacks'] },
    { key: 'backend', items: ['Python', 'Django', 'FastAPI', 'REST / OpenAPI', 'PostgreSQL', 'Redis', 'Celery', 'SQL'] },
    { key: 'frontend', items: ['TypeScript', 'React', 'Next.js', 'Flutter', 'Tailwind CSS', 'Accessible UI', 'Data visualization'] },
    { key: 'cloud', items: ['GCP', 'Cloud Run', 'Terraform', 'Docker', 'GitHub Actions', 'CI/CD', 'Sentry', 'Observability'] },
    { key: 'security', items: ['IAM', 'SSO / SAML', 'Entra ID', 'Okta', 'MFA', 'RBAC', 'SoD', 'AppSec', 'OWASP LLM'] },
    { key: 'quant', items: ['Market data', 'Backtesting', 'Strategy research', 'Optimization', 'Portfolio construction', 'Risk controls'] }
  ];

  const SERVICE_IMAGES = [
    'assets/media/hero/security-engineering.jpg',
    'assets/media/hero/system-design.jpg',
    'assets/media/hero/interactive-analytics.jpg',
    'assets/media/hero/network-nodes.jpg',
    'assets/media/hero/neural-network.jpg',
    'assets/media/hero/iam-security.jpg',
    'assets/media/hero/iot-agriculture.jpg',
    'assets/media/hero/quant-candles.jpg',
    'assets/media/hero/marketing-audit.jpg',
    'assets/media/hero/paid-media.jpg',
    'assets/media/hero/growth-automation.jpg',
    'assets/media/hero/social-media-management.jpg'
  ];

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function setTextContent(dictionary) {
    $$('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const value = key.split('.').reduce((current, segment) => current && current[segment], dictionary);
      if (typeof value === 'string') element.textContent = value;
    });
  }

  function bindExpandableCards(container, cardSelector, buttonSelector) {
    const buttons = $$(buttonSelector, container);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest(cardSelector);
        const hoverCapable = window.matchMedia('(hover: hover)').matches;
        const hoverOpen = hoverCapable && card.matches(':hover') && !card.classList.contains('is-hover-suppressed');
        const willExpand = !card.classList.contains('is-expanded') && !hoverOpen;
        $$(`${cardSelector}.is-expanded`, container).forEach((expandedCard) => {
          expandedCard.classList.remove('is-expanded');
          const expandedButton = $(buttonSelector, expandedCard);
          if (expandedButton) expandedButton.setAttribute('aria-expanded', 'false');
        });
        card.classList.toggle('is-expanded', willExpand);
        card.classList.toggle('is-hover-suppressed', !willExpand);
        button.setAttribute('aria-expanded', String(willExpand));
      });
    });

    $$(cardSelector, container).forEach((card) => {
      card.addEventListener('pointerleave', () => card.classList.remove('is-hover-suppressed'));
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        card.classList.remove('is-expanded');
        const button = $(buttonSelector, card);
        if (button) {
          button.setAttribute('aria-expanded', 'false');
          button.focus();
        }
      });
    });
  }

  function renderProjects(items) {
    const grid = $('#projectsGrid');
    if (!grid) return;
    grid.innerHTML = items.map((project, index) => `
      <article class="case-card">
        <button class="case-summary" type="button" aria-expanded="false" aria-controls="case-panel-${index + 1}">
          <span class="case-index code">${String(index + 1).padStart(2, '0')}</span>
          <span class="case-summary-main">
            <span class="case-meta">
              <span>${escapeHtml(project.category)}</span>
              <span class="case-status">${escapeHtml(project.status)}</span>
            </span>
            <span class="case-title">${escapeHtml(project.name)}</span>
          </span>
          <span class="case-mark" aria-hidden="true">+</span>
        </button>
        <div id="case-panel-${index + 1}" class="case-reveal">
          <div class="case-reveal-inner">
            <p class="desc">${escapeHtml(project.desc)}</p>
            <div class="case-evidence">
              <ul class="case-highlights">
                ${project.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
              <p class="case-stack code">${project.stack.map((item) => escapeHtml(item)).join(' · ')}</p>
            </div>
          </div>
        </div>
      </article>
    `).join('');
    bindExpandableCards(grid, '.case-card', '.case-summary');
  }

  function renderServices(services) {
    const grid = $('#servicesGrid');
    if (!grid) return;
    grid.innerHTML = services.items.map((service, index) => `
      <article class="service-card">
        <figure class="service-card-media" aria-hidden="true"><img src="${SERVICE_IMAGES[index]}" alt="" loading="lazy" decoding="async"></figure>
        <div class="service-card-overlay" aria-hidden="true"></div>
        <button class="service-summary" type="button" aria-expanded="false" aria-controls="service-panel-${index + 1}">
          <span class="service-title">${escapeHtml(service.title)}</span>
          <span class="service-mark" aria-hidden="true">+</span>
        </button>
        <div id="service-panel-${index + 1}" class="service-reveal">
          <div class="service-reveal-inner">
            <p>${escapeHtml(service.body)}</p>
            <span class="service-deliverable code">${escapeHtml(service.deliverable)}</span>
            <a href="#contact" class="service-quote-link" data-service-title="${escapeHtml(service.title)}">
              ${escapeHtml(services.quote)} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
    bindExpandableCards(grid, '.service-card', '.service-summary');

    $$('.service-quote-link', grid).forEach((link) => {
      link.addEventListener('click', () => {
        const message = $('#contactMessage');
        if (!message) return;
        message.value = `${services.quote_message} ${link.dataset.serviceTitle}\n\n`;
        requestAnimationFrame(() => message.focus({ preventScroll: true }));
      });
    });
  }

  function renderExperience(items) {
    const list = $('#experienceList');
    if (!list) return;
    list.innerHTML = items.map((role, index) => `
      <article class="experience-card">
        <button class="experience-summary" type="button" aria-expanded="false" aria-controls="experience-panel-${index + 1}">
          <span class="experience-index code">${String(index + 1).padStart(2, '0')}</span>
          <span class="experience-heading">
            <span class="experience-title">${escapeHtml(role.title)}</span>
            <span class="experience-org">${escapeHtml(role.org)}</span>
            <span class="experience-period">${escapeHtml(role.period)}</span>
          </span>
          <span class="experience-mark" aria-hidden="true">+</span>
        </button>
        <div id="experience-panel-${index + 1}" class="experience-reveal">
          <div class="experience-reveal-inner">
            <ul class="experience-list">
              ${role.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </article>
    `).join('');
    bindExpandableCards(list, '.experience-card', '.experience-summary');
  }

  function activateApproachStage(index, reachedIndex = null) {
    const cycle = $('#approachCycle');
    if (!cycle) return;
    const stages = $$('.approach-stage', cycle);
    const details = $$('.approach-detail', cycle);
    const normalized = Math.max(0, Math.min(index, stages.length - 1));
    stages.forEach((stage, stageIndex) => {
      const active = stageIndex === normalized;
      stage.classList.toggle('is-active', active);
      stage.setAttribute('aria-pressed', String(active));
      if (Number.isInteger(reachedIndex)) stage.classList.toggle('is-reached', stageIndex <= reachedIndex);
    });
    details.forEach((detail, detailIndex) => detail.classList.toggle('is-active', detailIndex === normalized));
  }

  function renderApproach(approach) {
    const cycle = $('#approachCycle');
    if (!cycle) return;
    const items = approach.items || [];
    const stagePositions = [
      { x: 500, y: 100 },
      { x: 880.42, y: 376.39 },
      { x: 735.11, y: 823.61 },
      { x: 264.89, y: 823.61 },
      { x: 119.58, y: 376.39 }
    ];
    const cyclePath = 'M 500 100 A 400 400 0 0 1 500 900 A 400 400 0 0 1 500 100';
    cycle.innerHTML = `
      <div class="approach-cycle-canvas">
        <svg class="approach-cycle-map" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path class="approach-cycle-path-base" d="${cyclePath}"></path>
          <path class="approach-cycle-path-progress"></path>
        </svg>
        <span class="approach-cycle-orb" aria-hidden="true"></span>
        ${items.map((item, index) => {
          const position = stagePositions[index] || stagePositions[stagePositions.length - 1];
          return `
            <button class="approach-stage${index === 0 ? ' is-active is-reached' : ''}" type="button" data-stage-index="${index}" data-stage-x="${position.x}" data-stage-y="${position.y}" style="--stage-x: ${position.x / 10}%; --stage-y: ${position.y / 10}%;" aria-pressed="${index === 0 ? 'true' : 'false'}">
              <span class="approach-stage-node code">${escapeHtml(item.number)}</span>
              <span class="approach-stage-title">${escapeHtml(item.title)}</span>
            </button>
          `;
        }).join('')}
        <div class="approach-cycle-center">
          <p class="approach-cycle-caption code">${escapeHtml(approach.cycle_label || '')}</p>
          <div class="approach-cycle-details">
            ${items.map((item, index) => `
              <article class="approach-detail${index === 0 ? ' is-active' : ''}">
                <span class="approach-number code">${escapeHtml(item.number)}</span>
                <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></div>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    $$('.approach-stage', cycle).forEach((stage) => {
      const selectStage = () => activateApproachStage(Number.parseInt(stage.dataset.stageIndex, 10));
      stage.addEventListener('click', selectStage);
      stage.addEventListener('focus', selectStage);
      stage.addEventListener('pointerenter', selectStage);
    });
    cycle.addEventListener('pointerenter', () => {
      if (approachCycleTimeline) approachCycleTimeline.pause();
    });
    cycle.addEventListener('pointerleave', () => {
      if (approachCycleTimeline) approachCycleTimeline.play();
    });
    cycle.addEventListener('focusin', () => {
      if (approachCycleTimeline) approachCycleTimeline.pause();
    });
    cycle.addEventListener('focusout', (event) => {
      if (!cycle.contains(event.relatedTarget) && approachCycleTimeline) approachCycleTimeline.play();
    });
    activateApproachStage(0, 0);
    if (motionReady) setupApproachCycle();
  }

  function renderSkills(labels) {
    const grid = $('#skillsGrid');
    if (!grid) return;
    grid.innerHTML = SKILLS.map((category) => `
      <article class="card skill-card">
        <h3 class="title">${escapeHtml(labels[category.key] || category.key)}</h3>
        <div class="skill-list">
          ${category.items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }

  function renderSimpleList(selector, items) {
    const list = $(selector);
    if (!list) return;
    list.innerHTML = items.map((item) => `<div class="card meta-card"><p>${escapeHtml(item)}</p></div>`).join('');
  }

  function setContactPlaceholders(dictionary) {
    const form = $('#contactForm');
    if (!form) return;
    form.elements.name.placeholder = dictionary.contact.placeholders.name;
    form.elements.email.placeholder = dictionary.contact.placeholders.email;
    form.elements.message.placeholder = dictionary.contact.placeholders.message;
  }

  function setCvLink(language) {
    const link = $('#cvLink');
    if (link) link.href = encodeURI(CV_LINKS[language] || CV_LINKS.en);
  }

  function setContactLinks(dictionary) {
    const emailLink = $('#emailQuoteLink');
    const whatsappLink = $('#whatsappQuoteLink');
    if (emailLink) emailLink.href = `mailto:jlmc97@gmail.com?subject=${encodeURIComponent(dictionary.contact.email_subject)}`;
    if (whatsappLink) whatsappLink.href = `https://wa.me/573042435599?text=${encodeURIComponent(dictionary.contact.whatsapp_message)}`;
  }

  function setFooterLinks(language) {
    $$('.footer-legal-link').forEach((link) => {
      const section = link.dataset.legalSection || 'privacy';
      link.href = `legal.html?lang=${encodeURIComponent(language)}#${encodeURIComponent(section)}`;
    });
    const companyLink = $('#companyBridge');
    if (companyLink) companyLink.href = `wvsoftware/?lang=${encodeURIComponent(language)}`;
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function shuffled(values) {
    const result = values.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function buildInterleavedSequence(values, groups) {
    const covered = new Set(groups.flat());
    const buckets = groups.map((indices, group) => ({
      group,
      values: shuffled(indices.map((index) => values[index]).filter(Boolean))
    }));
    const extras = values.filter((_, index) => !covered.has(index));
    if (extras.length) buckets.push({ group: buckets.length, values: shuffled(extras) });

    const result = [];
    let previousGroup = null;
    while (buckets.some((bucket) => bucket.values.length)) {
      const active = shuffled(buckets.filter((bucket) => bucket.values.length));
      if (active.length > 1 && active[0].group === previousGroup) {
        const replacement = active.findIndex((bucket) => bucket.group !== previousGroup);
        [active[0], active[replacement]] = [active[replacement], active[0]];
      }
      active.forEach((bucket) => {
        result.push(bucket.values.pop());
        previousGroup = bucket.group;
      });
    }
    return result;
  }

  function prepareHeroMediaDeck() {
    const sourceSlides = $$('.hero-slide').sort((left, right) => {
      const leftIndex = Number.parseInt(left.dataset.labelIndex, 10);
      const rightIndex = Number.parseInt(right.dataset.labelIndex, 10);
      return (Number.isInteger(leftIndex) ? leftIndex : 0) - (Number.isInteger(rightIndex) ? rightIndex : 0);
    });
    sourceSlides.forEach((slide, index) => {
      if (!slide.dataset.labelIndex) slide.dataset.labelIndex = String(index);
    });
    heroSlides = buildInterleavedSequence(sourceSlides, HERO_MEDIA_GROUPS);
    heroSlides.forEach((slide, index) => { slide.dataset.carouselPosition = String(index); });
    return heroSlides;
  }

  function getHeroSlides() {
    return heroSlides.length ? heroSlides : $$('.hero-slide');
  }

  function reserveTypewriterSpace(phrases) {
    const title = $('.hero-title');
    if (!title || !phrases.length) return;
    activeTypewriterPhrases = phrases.slice();
    const width = title.getBoundingClientRect().width;
    if (width < 1) return;

    const clone = title.cloneNode(true);
    const cloneTarget = clone.querySelector('#typedTitle');
    if (!cloneTarget) return;
    clone.removeAttribute('id');
    cloneTarget.removeAttribute('id');
    clone.classList.add('typewriter-measure');
    clone.style.width = `${width}px`;
    title.parentElement.appendChild(clone);

    let maximumHeight = 0;
    phrases.forEach((phrase) => {
      cloneTarget.textContent = phrase;
      maximumHeight = Math.max(maximumHeight, clone.scrollHeight);
    });
    const lineHeight = Number.parseFloat(window.getComputedStyle(title).lineHeight) || 64;
    title.style.setProperty('--hero-title-space', `${Math.ceil(maximumHeight + (lineHeight * 0.42))}px`);
    clone.remove();
  }

  function startTypewriter(phrases) {
    const target = $('#typedTitle');
    if (!target || !phrases.length) return;
    typewriterGeneration += 1;
    const generation = typewriterGeneration;
    if (typewriterTimeline) {
      typewriterTimeline.kill();
      typewriterTimeline = null;
    }

    reserveTypewriterSpace(phrases);
    const firstDeck = buildInterleavedSequence(phrases, HERO_PHRASE_GROUPS);
    target.textContent = firstDeck[0] || phrases[0];
    if (prefersReducedMotion() || !window.gsap) return;

    const playDeck = (deck) => {
      if (generation !== typewriterGeneration) return;
      target.textContent = '';
      typewriterTimeline = window.gsap.timeline({
        onComplete: () => playDeck(buildInterleavedSequence(phrases, HERO_PHRASE_GROUPS))
      });
      deck.forEach((phrase) => {
        const typing = { count: 0 };
        const erasing = { count: phrase.length };
        typewriterTimeline
          .to(typing, {
            count: phrase.length,
            duration: Math.max(0.95, phrase.length * 0.046),
            ease: 'none',
            snap: { count: 1 },
            onUpdate: () => { target.textContent = phrase.slice(0, typing.count); }
          })
          .to({}, { duration: 1.75 })
          .to(erasing, {
            count: 0,
            duration: Math.max(0.55, phrase.length * 0.023),
            ease: 'none',
            snap: { count: 1 },
            onUpdate: () => { target.textContent = phrase.slice(0, erasing.count); }
          })
          .to({}, { duration: 0.24 });
      });
    };
    playDeck(firstDeck);
  }

  function updateHeroMediaMeta(index, dictionary) {
    const slides = getHeroSlides();
    const count = $('#heroSlideCount');
    const label = $('#heroSlideLabel');
    const labels = dictionary.hero.media_labels || [];
    const activeSlide = slides[index];
    const labelIndex = activeSlide ? Number.parseInt(activeSlide.dataset.labelIndex, 10) : index;
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (label) label.textContent = labels[Number.isInteger(labelIndex) ? labelIndex : index] || '';
  }

  function getCurrentDictionary() {
    return I18N[activeLanguage] || I18N.en;
  }

  function ensureHeroVideoLoaded(slide, { preload = 'metadata', priority = 'auto' } = {}) {
    const video = slide && $('video', slide);
    if (!video) return video;
    video.preload = preload;
    if (priority !== 'auto') video.setAttribute('fetchpriority', priority);
    if (video.src || !video.dataset.src) return video;
    video.src = video.dataset.src;
    video.load();
    return video;
  }

  function chooseHeroStart(total) {
    if (total < 2) return 0;
    let index = Math.floor(Math.random() * total);
    try {
      const previous = Number.parseInt(sessionStorage.getItem('heroLastStart'), 10);
      if (Number.isInteger(previous) && index === previous) {
        index = (index + 1 + Math.floor(Math.random() * (total - 1))) % total;
      }
      sessionStorage.setItem('heroLastStart', String(index));
    } catch (_) {
      // A private browsing policy may block session storage; randomness still works.
    }
    return index;
  }

  function playHeroVideo(slide, { exclusive = true, restart = false } = {}) {
    const video = ensureHeroVideoLoaded(slide, { preload: 'auto', priority: 'high' });
    if (!video || prefersReducedMotion()) return;
    if (exclusive) {
      $$('.hero-slide video').forEach((candidate) => {
        if (candidate !== video) candidate.pause();
      });
    }
    if (restart) {
      const reset = () => {
        try { video.currentTime = 0; } catch (_) { /* Metadata may not be ready yet. */ }
      };
      if (video.readyState >= 1) reset();
      else video.addEventListener('loadedmetadata', reset, { once: true });
    }
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') playAttempt.catch(() => {});
  }

  function animateHeroMedia(slide, duration) {
    const media = $('img, video', slide);
    if (!media || !window.gsap || prefersReducedMotion() || window.matchMedia('(max-width: 540px)').matches) return;
    window.gsap.killTweensOf(media);
    window.gsap.fromTo(media, { scale: 1.02 }, { scale: 1.09, duration: duration + 1.4, ease: 'none' });
  }

  function scheduleHeroCarousel() {
    const slides = getHeroSlides();
    if (!slides.length || !window.gsap || prefersReducedMotion()) return;
    if (heroCarouselCall) heroCarouselCall.kill();
    if (heroPreRollCall) heroPreRollCall.kill();
    const interval = Number.parseFloat(slides[heroCarouselIndex].dataset.duration) || 6.2;
    const nextIndex = (heroCarouselIndex + 1) % slides.length;
    const next = slides[nextIndex];

    heroPreRollCall = window.gsap.delayedCall(Math.max(0, interval - HERO_PRE_ROLL_SECONDS), () => {
      playHeroVideo(next, { exclusive: false, restart: true });
      animateHeroMedia(next, interval + HERO_CROSSFADE_SECONDS);
      ensureHeroVideoLoaded(slides[(nextIndex + 1) % slides.length], { preload: 'metadata', priority: 'low' });
    });

    heroCarouselCall = window.gsap.delayedCall(interval, () => {
      const previous = slides[heroCarouselIndex];
      heroCarouselIndex = nextIndex;
      previous.classList.remove('is-active');
      next.classList.add('is-active');
      const nextVideo = $('video', next);
      if (nextVideo && nextVideo.paused) playHeroVideo(next, { exclusive: false });
      updateHeroMediaMeta(nextIndex, getCurrentDictionary());
      scheduleHeroCarousel();
      const pausePrevious = () => {
        const previousVideo = $('video', previous);
        if (previousVideo) previousVideo.pause();
      };
      window.gsap.delayedCall(HERO_CROSSFADE_SECONDS + 0.05, pausePrevious);
      window.gsap.timeline({
        onComplete: pausePrevious
      })
        .to(previous, { autoAlpha: 0, duration: HERO_CROSSFADE_SECONDS, ease: 'power2.inOut' }, 0)
        .to(next, { autoAlpha: 1, duration: HERO_CROSSFADE_SECONDS, ease: 'power2.inOut' }, 0);
    });
  }

  function setupHeroCarousel() {
    const slides = prepareHeroMediaDeck();
    if (!slides.length) return;
    heroCarouselIndex = chooseHeroStart(slides.length);
    const activeSlide = slides[heroCarouselIndex];
    slides.forEach((slide) => slide.classList.remove('is-active'));
    activeSlide.classList.add('is-active');
    updateHeroMediaMeta(heroCarouselIndex, getCurrentDictionary());
    ensureHeroVideoLoaded(activeSlide, { preload: 'auto', priority: 'high' });
    ensureHeroVideoLoaded(slides[(heroCarouselIndex + 1) % slides.length], { preload: 'auto', priority: 'low' });
    if (!window.gsap || prefersReducedMotion()) {
      slides.forEach((slide, index) => {
        slide.style.opacity = index === heroCarouselIndex ? '1' : '0';
        slide.style.visibility = index === heroCarouselIndex ? 'visible' : 'hidden';
      });
      const video = $('video', activeSlide);
      if (video) video.pause();
      return;
    }
    window.gsap.set(slides, { autoAlpha: 0 });
    window.gsap.set(activeSlide, { autoAlpha: 1 });
    playHeroVideo(activeSlide, { restart: true });
    animateHeroMedia(activeSlide, Number.parseFloat(activeSlide.dataset.duration) || 6.2);
    scheduleHeroCarousel();

    if (!motionBoundElements.has(document)) {
      motionBoundElements.add(document);
      document.addEventListener('visibilitychange', () => {
        const activeSlide = getHeroSlides()[heroCarouselIndex];
        if (document.hidden) {
          if (heroCarouselCall) heroCarouselCall.pause();
          if (heroPreRollCall) heroPreRollCall.pause();
          $$('.hero-slide video').forEach((video) => video.pause());
        } else {
          if (heroCarouselCall) heroCarouselCall.resume();
          if (heroPreRollCall) heroPreRollCall.resume();
          if (activeSlide) playHeroVideo(activeSlide);
        }
      });
    }
  }

  function setupHeaderScroll() {
    const header = $('.site-header');
    if (!header) return;
    let updateFrame = null;
    const update = () => {
      updateFrame = null;
      const scrollTop = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
      const progress = Math.min(1, scrollTop / 360);
      header.style.setProperty('--header-alpha', String(0.04 + (progress * 0.9)));
      header.style.setProperty('--header-blur', `${3 + (progress * 15)}px`);
      header.style.setProperty('--header-border-alpha', String(0.04 + (progress * 0.96)));
    };
    const requestUpdate = () => {
      if (updateFrame) return;
      updateFrame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('pageshow', update);
  }

  function setupCursorGlow() {
    const glow = $('#cursorGlow');
    if (!glow || prefersReducedMotion()) return;
    const moveX = window.gsap ? window.gsap.quickTo(glow, 'x', { duration: 0.18, ease: 'power2.out' }) : null;
    const moveY = window.gsap ? window.gsap.quickTo(glow, 'y', { duration: 0.18, ease: 'power2.out' }) : null;
    let touchHideTimer = null;
    const moveGlow = (clientX, clientY, isTouch = false) => {
      glow.classList.add('is-visible');
      glow.classList.toggle('is-touching', isTouch);
      if (moveX && moveY) {
        moveX(clientX);
        moveY(clientY);
      } else {
        glow.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', (event) => moveGlow(event.clientX, event.clientY), { passive: true });
      document.documentElement.addEventListener('mouseleave', () => glow.classList.remove('is-visible'));
    }
    const trackTouch = (event) => {
      const touch = event.touches[0] || event.changedTouches[0];
      if (!touch) return;
      if (touchHideTimer) window.clearTimeout(touchHideTimer);
      moveGlow(touch.clientX, touch.clientY, true);
    };
    const releaseTouch = (event) => {
      trackTouch(event);
      touchHideTimer = window.setTimeout(() => {
        glow.classList.remove('is-visible', 'is-touching');
      }, 420);
    };
    window.addEventListener('touchstart', trackTouch, { passive: true });
    window.addEventListener('touchmove', trackTouch, { passive: true });
    window.addEventListener('touchend', releaseTouch, { passive: true });
    window.addEventListener('touchcancel', releaseTouch, { passive: true });
  }

  function setupApproachCycle() {
    const cycle = $('#approachCycle');
    const stages = cycle ? $$('.approach-stage', cycle) : [];
    const canvas = cycle && $('.approach-cycle-canvas', cycle);
    const path = cycle && $('.approach-cycle-path-base', cycle);
    const progressPath = cycle && $('.approach-cycle-path-progress', cycle);
    const orb = cycle && $('.approach-cycle-orb', cycle);
    const center = cycle && $('.approach-cycle-center', cycle);
    if (approachCycleTimeline) {
      approachCycleTimeline.kill();
      approachCycleTimeline = null;
    }
    if (approachCycleResizeObserver) {
      approachCycleResizeObserver.disconnect();
      approachCycleResizeObserver = null;
    }
    if (window.ScrollTrigger) {
      const previousTrigger = window.ScrollTrigger.getById('approach-cycle');
      if (previousTrigger) previousTrigger.kill();
    }
    if (!cycle || !canvas || !path || !progressPath || !orb || !stages.length || !window.gsap || prefersReducedMotion()) return;

    const totalLength = path.getTotalLength();
    const stageProgress = stages.map((stage) => {
      const stageX = Number.parseFloat(stage.dataset.stageX);
      const stageY = Number.parseFloat(stage.dataset.stageY);
      let closestProgress = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      for (let sample = 0; sample <= 400; sample += 1) {
        const sampleProgress = sample / 400;
        const point = path.getPointAtLength(sampleProgress * totalLength);
        const distance = ((point.x - stageX) ** 2) + ((point.y - stageY) ** 2);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestProgress = sampleProgress;
        }
      }
      return closestProgress;
    });
    const cycleState = { progress: 0 };
    const fixedSampleLength = totalLength / 180;
    const renderPathSegment = (startProgress, endProgress) => {
      const startLength = Math.max(0, Math.min(totalLength, startProgress * totalLength));
      const endLength = Math.max(startLength, Math.min(totalLength, endProgress * totalLength));
      if (endLength - startLength < 0.01) {
        progressPath.setAttribute('d', '');
        return;
      }
      const segment = [];
      const startPoint = path.getPointAtLength(startLength);
      segment.push(`M ${startPoint.x.toFixed(2)} ${startPoint.y.toFixed(2)}`);
      let sampleLength = Math.ceil((startLength + 0.001) / fixedSampleLength) * fixedSampleLength;
      for (; sampleLength < endLength; sampleLength += fixedSampleLength) {
        const segmentPoint = path.getPointAtLength(sampleLength);
        segment.push(`L ${segmentPoint.x.toFixed(2)} ${segmentPoint.y.toFixed(2)}`);
      }
      const endPoint = path.getPointAtLength(endLength);
      segment.push(`L ${endPoint.x.toFixed(2)} ${endPoint.y.toFixed(2)}`);
      progressPath.setAttribute('d', segment.join(' '));
    };
    const renderCycleProgress = () => {
      const progress = Math.max(0, Math.min(1, cycleState.progress));
      const point = path.getPointAtLength(progress * totalLength);
      const x = (point.x / 1000) * canvas.clientWidth;
      const y = (point.y / 1000) * canvas.clientHeight;
      orb.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      renderPathSegment(0, progress);
      let reachedStage = 0;
      stageProgress.forEach((threshold, index) => {
        if (progress + 0.003 >= threshold) reachedStage = index;
      });
      activateApproachStage(reachedStage, reachedStage);
    };
    const resetCycle = () => {
      cycleState.progress = 0;
      cycle.classList.remove('is-fading');
      cycle.dataset.phase = 'forward';
      renderCycleProgress();
    };
    const fadeTargets = [path, progressPath, orb, center, ...stages].filter(Boolean);

    resetCycle();
    window.gsap.set(fadeTargets, { opacity: 1 });
    approachCycleTimeline = window.gsap.timeline({ repeat: -1, paused: true })
      .to(cycleState, { progress: 1, duration: 13.5, ease: 'none', onUpdate: renderCycleProgress })
      .to({}, { duration: 0.4 })
      .call(() => {
        cycle.classList.add('is-fading');
        cycle.dataset.phase = 'fading';
      })
      .to([path, progressPath], { opacity: 0, duration: 0.52, ease: 'power2.in' })
      .to(stages, { opacity: 0, duration: 0.32, stagger: 0.045, ease: 'power2.in' }, '<')
      .to([orb, center], { opacity: 0, duration: 0.38, ease: 'power2.in' }, '<')
      .call(resetCycle)
      .set(fadeTargets, { opacity: 1 })
      .to({}, { duration: 0.3 });
    if (window.ResizeObserver) {
      approachCycleResizeObserver = new window.ResizeObserver(renderCycleProgress);
      approachCycleResizeObserver.observe(canvas);
    }

    if (window.ScrollTrigger) {
      window.ScrollTrigger.create({
        id: 'approach-cycle',
        trigger: cycle,
        start: 'top 82%',
        end: 'bottom top',
        onEnter: () => approachCycleTimeline && approachCycleTimeline.play(),
        onEnterBack: () => approachCycleTimeline && approachCycleTimeline.play(),
        onLeave: () => approachCycleTimeline && approachCycleTimeline.pause(),
        onLeaveBack: () => approachCycleTimeline && approachCycleTimeline.pause()
      });
    } else {
      approachCycleTimeline.play();
    }
  }

  function setupInteractiveMotion() {
    if (!window.gsap || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    $$('.btn-primary, .btn-secondary').forEach((button) => {
      if (motionBoundElements.has(button)) return;
      motionBoundElements.add(button);
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - (bounds.width / 2)) * 0.1;
        const y = (event.clientY - bounds.top - (bounds.height / 2)) * 0.14;
        window.gsap.to(button, { x, y, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
      });
      button.addEventListener('pointerleave', () => {
        window.gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' });
      });
    });

    $$('.service-card, .case-card').forEach((card) => {
      if (motionBoundElements.has(card)) return;
      motionBoundElements.add(card);
      const mark = $('.service-mark, .case-mark', card);
      card.addEventListener('pointerenter', () => {
        window.gsap.to(card, { y: -7, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
        if (mark) window.gsap.to(mark, { rotation: 45, duration: 0.28, ease: 'power2.out' });
      });
      card.addEventListener('pointerleave', () => {
        window.gsap.to(card, { y: 0, duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
        if (mark) window.gsap.to(mark, { rotation: 0, duration: 0.38, ease: 'power2.out' });
      });
    });
  }

  function setupScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion()) return;
    if (scrollMotionContext) scrollMotionContext.revert();

    scrollMotionContext = window.gsap.context(() => {
      $$('.section').forEach((section) => {
        const heading = $(':scope > .eyebrow, :scope > .section-title, :scope > .section-heading, :scope > .about-copy', section);
        if (!heading) return;
        window.gsap.from(heading, {
          autoAlpha: 0,
          y: 38,
          duration: 0.88,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 84%', once: true }
        });
      });

      window.gsap.from('.about-portrait', {
        autoAlpha: 0,
        x: -48,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#about', start: 'top 78%', once: true }
      });

      window.gsap.from('.service-card', {
        autoAlpha: 0,
        y: 88,
        scale: 0.94,
        rotationX: -7,
        duration: 0.82,
        ease: 'power3.out',
        stagger: { each: 0.09, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: '#servicesGrid', start: 'top 84%', once: true }
      });

      window.gsap.from('.approach-proof > div', {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.approach-proof', start: 'top 86%', once: true }
      });

      window.gsap.from('.approach-cycle', {
        autoAlpha: 0,
        y: 46,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.approach-cycle', start: 'top 88%', once: true }
      });

      $$('.case-card, .experience-card').forEach((card) => {
        window.gsap.from(card, {
          autoAlpha: 0,
          y: 48,
          duration: 0.82,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        });
      });

      ['.skill-card'].forEach((selector) => {
        const cards = $$(selector);
        if (!cards.length) return;
        window.gsap.from(cards, {
          autoAlpha: 0,
          y: 42,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: cards[0].parentElement, start: 'top 86%', once: true }
        });
      });

      window.gsap.from('.contact-form', {
        autoAlpha: 0,
        x: 42,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#contact', start: 'top 78%', once: true }
      });
    }, document.body);
    window.ScrollTrigger.refresh();
  }

  function setupHeroMotion() {
    if (!window.gsap || prefersReducedMotion()) return;
    window.gsap.from('.hero-copy > .eyebrow, .hero-title, .hero-subtitle, .hero-actions', {
      autoAlpha: 0,
      y: 26,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.09,
      delay: 0.12
    });
    window.gsap.set('.scroll-cue', { autoAlpha: 0, y: 8 });
    window.gsap.to('.scroll-cue', { autoAlpha: 1, y: 0, duration: 0.72, delay: 3.2, ease: 'power2.out' });
    window.gsap.to('.scroll-cue-line', { y: 8, scaleY: 0.48, duration: 0.95, ease: 'sine.inOut', repeat: -1, yoyo: true });

    if (!window.ScrollTrigger) return;
    if (heroScrollTimeline) {
      heroScrollTimeline.kill();
      heroScrollTimeline = null;
    }

    const restoreHeroAtTop = () => {
      if (window.scrollY > 2 || document.body.classList.contains('pong-active')) return;
      if (heroScrollTimeline) heroScrollTimeline.progress(0);
      window.gsap.set('.hero-inner', { clearProps: 'opacity,visibility,transform,translate,rotate,scale' });
      window.gsap.set('.hero-media', { autoAlpha: 1 });
      window.gsap.set('.hero-grid-overlay', { opacity: 0.18, visibility: 'visible' });
      window.gsap.set('.hero-copy', { autoAlpha: 1, y: 0 });
      window.gsap.set('.hero-media-meta, .scroll-cue', { autoAlpha: 1 });
    };

    heroScrollTimeline = window.gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top+=72',
        scrub: 0.55,
        onUpdate: (self) => {
          if (self.direction < 0 && self.scroll() <= 2) restoreHeroAtTop();
        }
      }
    })
      .to('.hero-media', { autoAlpha: 0, ease: 'none' }, 0)
      .to('.hero-grid-overlay', { autoAlpha: 0, ease: 'none' }, 0)
      .to('.hero-copy', { autoAlpha: 0.12, y: -72, ease: 'none' }, 0)
      .to('.hero-media-meta, .scroll-cue', { autoAlpha: 0, ease: 'none' }, 0);

    if (!heroTopGuardBound) {
      heroTopGuardBound = true;
      let hasMovedAway = false;
      let resetFrame = null;
      window.addEventListener('scroll', () => {
        if (window.scrollY > 96) hasMovedAway = true;
        if (!hasMovedAway || window.scrollY > 2) return;
        if (resetFrame) window.cancelAnimationFrame(resetFrame);
        resetFrame = window.requestAnimationFrame(() => {
          restoreHeroAtTop();
          hasMovedAway = false;
        });
      }, { passive: true });
    }
  }

  function setupMotion() {
    if (!window.gsap) {
      setupHeaderScroll();
      setupHeroCarousel();
      setupCursorGlow();
      return;
    }
    if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
    motionReady = true;
    setupHeaderScroll();
    setupHeroCarousel();
    setupHeroMotion();
    setupScrollAnimations();
    setupApproachCycle();
    setupInteractiveMotion();
    setupCursorGlow();

    let resizeFrame = null;
    window.addEventListener('resize', () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        reserveTypewriterSpace(activeTypewriterPhrases);
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      });
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        reserveTypewriterSpace(activeTypewriterPhrases);
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      });
    }
  }

  function applyI18n(language) {
    const dictionary = I18N[language] || I18N.en;
    activeLanguage = I18N[language] ? language : 'en';
    document.documentElement.lang = activeLanguage;
    setTextContent(dictionary);
    renderServices(dictionary.services);
    renderProjects(dictionary.projects.items);
    renderExperience(dictionary.experience.items);
    renderApproach(dictionary.approach);
    renderSkills(dictionary.skills.cats);
    setContactPlaceholders(dictionary);
    setCvLink(language);
    setContactLinks(dictionary);
    setFooterLinks(activeLanguage);
    startTypewriter(dictionary.hero.phrases);
    updateHeroMediaMeta(heroCarouselIndex, dictionary);
    if (motionReady) {
      window.requestAnimationFrame(() => {
        setupScrollAnimations();
        setupApproachCycle();
        setupInteractiveMotion();
      });
    }
  }

  function setupLanguage() {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    const savedPreference = localStorage.getItem('lang') || 'en';
    const saved = I18N[queryLanguage] ? queryLanguage : savedPreference;
    const select = $('#languageSelect');
    applyI18n(saved);
    if (!select) return;
    select.value = I18N[saved] ? saved : 'en';
    select.addEventListener('change', () => {
      const language = select.value;
      localStorage.setItem('lang', language);
      applyI18n(language);
    });
  }

  function setupContact() {
    const form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const dictionary = getCurrentDictionary();
      const name = form.elements.name.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const subject = encodeURIComponent(`${dictionary.contact.email_subject} — ${name}`);
      const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
      window.location.href = `mailto:jlmc97@gmail.com?subject=${subject}&body=${body}`;
      $('#formMsg').textContent = dictionary.contact.ok;
    });
  }

  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('#mainNav a');
    const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-55% 0px -35% 0px' });
    sections.forEach((section) => observer.observe(section));
  }

  function applyTheme(themeName, { persist = true } = {}) {
    const normalized = String(themeName || '').toLowerCase();
    const className = THEMES[normalized];
    if (!className) return false;
    Object.values(THEMES).forEach((item) => document.body.classList.remove(item));
    document.body.classList.add(className);
    document.documentElement.style.colorScheme = normalized;
    const button = $('#themeToggle');
    if (button) button.setAttribute('aria-pressed', normalized === 'light' ? 'true' : 'false');
    if (persist) localStorage.setItem(THEME_STORAGE_KEY, normalized);
    return true;
  }

  function setupThemeToggle() {
    const button = $('#themeToggle');
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const queryTheme = new URLSearchParams(window.location.search).get('theme');
    const initialTheme = THEMES[queryTheme]
      ? queryTheme
      : (THEMES[savedTheme] ? savedTheme : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
    applyTheme(initialTheme, { persist: false });
    if (!button) return;
    button.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains(THEMES.dark) ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    $('#year').textContent = new Date().getFullYear();
    setupLanguage();
    setupContact();
    setupScrollSpy();
    setupMotion();
    if (window.JLMCPageLoader) {
      window.JLMCPageLoader.waitForReady({ mediaSelector: '.hero-slide.is-active video' });
    }
  });
})();
