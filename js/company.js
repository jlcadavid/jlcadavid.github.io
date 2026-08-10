(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'uiThemePreference';
  const EMAIL = 'jlmc97@gmail.com';
  const WHATSAPP = '573042435599';

  const COPY = {
    en: {
      meta: { title: 'WV SOFTWARE · Secure software and growth systems', description: 'WV SOFTWARE designs secure AI products, full-stack platforms, cybersecurity, data, IoT, quantitative systems, and measurable digital growth infrastructure.' },
      nav: { about: 'Company', services: 'Services', proof: 'Evidence', plans: 'Engagements', contact: 'Start a project' },
      theme: { toggle: 'Switch between light and dark mode' },
      hero: { eyebrow: 'WV SOFTWARE · SECURE SYSTEMS & GROWTH STUDIO', title: 'Software and growth systems that turn complexity into advantage.', lead: 'We work alongside your team to design, build, launch, measure, and evolve secure AI products, business platforms, connected systems, and acquisition journeys that remain useful beyond the first release.', cta: 'Scope a project', secondary: 'Explore capabilities' },
      signal: { security: 'Security-first', security_body: 'Authority, identity, validation, and evidence from the architecture onward.', end: 'End to end', end_body: 'Discovery, product, engineering, cloud, review, and staging delivery.', accountability: 'Human accountability', accountability_body: 'AI accelerates the work; people own decisions, review, and release.' },
      about: { eyebrow: 'Purpose', title: 'Engineering that grows with the people operating it.', intro: 'WV SOFTWARE is an independent Colombian software practice founded by José Luis Martínez Cadavid. We combine enterprise security judgment, full-stack ownership, and AI-assisted delivery without giving up human accountability.', mission_title: 'Mission', mission: 'Turn complex business needs into secure, understandable, and operable software—keeping clients inside the decisions that shape the system.', vision_title: 'Vision', vision: 'Become a trusted engineering partner for organizations that want AI and software to create durable capability, not short-lived novelty.', p1: 'Built with you', p1_body: 'Priorities, tradeoffs, and acceptance stay visible so the result feels genuinely yours.', p2: 'Evidence over adjectives', p2_body: 'Status, risks, tests, and limits are communicated clearly instead of hidden behind polished claims.', p3: 'Evolution by design', p3_body: 'Architecture, documentation, and delivery workflows prepare the system for its next responsible iteration.' },
      services: { eyebrow: 'Capabilities', title: 'One engineering partner across the system.', intro: 'Engagements can begin with a focused audit or extend through architecture, implementation, integration, review, and continuous improvement.', platforms: 'Full-stack platforms', platforms_body: 'Secure web products and internal platforms spanning backend, frontend, data, cloud, testing, and staging delivery.', ai: 'AI systems, agents & RAG', ai_body: 'Assistants, specialized agent workflows, MCP tools, retrieval, evaluations, guardrails, and observable fallbacks.', security: 'Security, identity & audits', security_body: 'Architecture and code reviews, IAM, SSO/SAML, MFA, RBAC, approval controls, and prioritized remediation.', data: 'Data workflows & integrations', data_body: 'Reliable pipelines, APIs, event processing, operational dashboards, and system-to-system integrations.', iot: 'IoT & connected operations', iot_body: 'Device-to-cloud telemetry, LoRa/LoRaWAN, alerts, automation, and secure operational interfaces.', quant: 'Quant & financial systems', quant_body: 'Market-data pipelines, research and backtesting tools, dashboards, portfolio controls, and bounded AI interfaces.' },
      process: { eyebrow: 'Operating model', title: 'A visible loop from context to continuous improvement.', intro: 'Each phase produces an artifact you can inspect. Feedback and evidence become inputs to the next iteration instead of disappearing after delivery.', discover: 'Discover', discover_body: 'Understand goals, users, constraints, current systems, risks, and the decision the software must improve.', define: 'Define', define_body: 'Turn context into scope, architecture, security boundaries, acceptance criteria, and a delivery plan.', build: 'Build & verify', build_body: 'Implement in reviewable increments with automated gates, independent review, and staging evidence.', evolve: 'Integrate & evolve', evolve_body: 'Measure use, monitor risk, integrate feedback, and define the next responsible release together.' },
      proof: { eyebrow: 'Selected evidence', title: 'Specific claims, explicit boundaries.', intro: 'Client confidentiality matters. We disclose the engineering shape and current status of work without exposing sensitive information or implying outcomes that have not been established.', status: 'CONFIDENTIAL CLIENT · STAGING', case_title: 'Enterprise operations platform', case_context: 'WV SOFTWARE’s first independent client engagement replaces spreadsheet-driven insurance operations with reviewed workflows, identity controls, dashboards, and audit trails.', metric_agents: 'agent records represented in staging data', metric_contracts: 'contract records represented in staging data', metric_boundary: 'current environment; no production-adoption claim', item1: 'Django and React platform with Postgres, Redis, GCP infrastructure, and delivery automation.', item2: 'Hybrid identity, MFA, scoped RBAC, and preview-before-commit imports.', item3: 'Reviewable operations and auditability designed around the client’s workflow.', founder: 'Founder experience includes five years in Mercado Libre cybersecurity—maintaining and auditing critical systems, developing company-wide IAM workflows and SSO integrations, and reviewing code for production approval—plus current AI-training engineering work.', founder_cta: 'Review founder experience ↗' },
      trust: { eyebrow: 'Trust & reviews', title: 'Proof comes before praise.', intro: 'A trustworthy engagement should be reviewable while it is happening. Our public proof grows only when evidence and client authorization permit it.', reviewable: 'Reviewable work', reviewable_body: 'Specifications, decisions, code, tests, staging evidence, and unresolved risks stay inspectable.', visible: 'Visible communication', visible_body: 'Progress and tradeoffs are communicated without hiding uncertainty or blurring implemented work with roadmap.', bounded: 'Bounded claims', bounded_body: 'Confidentiality, project status, AI involvement, and outcome limits remain explicit.', policy: 'Client testimonials will appear here only with each client’s express authorization. No placeholder endorsement is presented as a real review.' },
      plans: { eyebrow: 'Engagement models', title: 'Start at the level your problem needs.', intro: 'These are collaboration structures, not fixed packages. Scope, timeline, team involvement, and commercial terms are defined after discovery.', audit: 'Discovery & audit', audit_body: 'For teams that need clarity before committing to a build or remediation program.', audit_1: 'Technical and business-context discovery', audit_2: 'Architecture, security, or code assessment', audit_3: 'Prioritized findings and delivery roadmap', build: 'Build & integrate', build_body: 'For organizations ready to turn a defined problem into a secure, testable system.', build_1: 'Architecture and iterative implementation', build_2: 'Integrations, quality gates, and staging', build_3: 'Documentation, handoff, and acceptance', evolve: 'Evolve & operate', evolve_body: 'For systems that need continuous improvement, integration, review, and technical stewardship.', evolve_1: 'Roadmap and release planning', evolve_2: 'Monitoring, maintenance, and remediation', evolve_3: 'Continuous integration of evidence and feedback', cta: 'Discuss this model →', note: 'Every engagement is quoted individually. A written scope and commercial agreement are required before work begins.' },
      contact: { eyebrow: 'Start with the problem', title: 'Let’s build something that outlives the first idea.', intro: 'Share the context, desired outcome, constraints, and what is at stake. We will identify the right first step together.', email: 'Request a quote by email', whatsapp: 'Discuss it on WhatsApp', subject: 'Project inquiry — WV SOFTWARE', message: 'Hello José Luis, I would like to discuss a project with WV SOFTWARE.', plan_prefix: 'I am interested in the engagement model:' },
      game: { player: 'YOU', opponent: 'AI', instructions: 'MOVE · mouse / touch / ↑↓ / W S', exit: 'Back to WV SOFTWARE', overline: 'Match complete', result_body: 'Play as many matches as you want or return whenever you are ready.', restart: 'Play again', win: 'You win.', lose: 'AI wins this one.', hint: 'Psst… hit it 3 times' },
      footer: { tagline: 'Secure AI, software, and systems engineering from Colombia.', privacy: 'Privacy', terms: 'Terms', accessibility: 'Accessibility' }
    },
    es: {
      meta: { title: 'WV SOFTWARE · Software seguro y sistemas de crecimiento', description: 'WV SOFTWARE diseña productos de IA, plataformas full-stack, ciberseguridad, datos, IoT, sistemas cuantitativos e infraestructura de crecimiento digital medible.' },
      nav: { about: 'Empresa', services: 'Servicios', proof: 'Evidencia', plans: 'Modalidades', contact: 'Iniciar proyecto' },
      theme: { toggle: 'Cambiar entre modo claro y oscuro' },
      hero: { eyebrow: 'WV SOFTWARE · ESTUDIO DE SISTEMAS SEGUROS Y GROWTH', title: 'Software y sistemas de crecimiento que convierten complejidad en ventaja.', lead: 'Trabajamos junto a tu equipo para diseñar, construir, lanzar, medir y evolucionar productos de IA, plataformas empresariales, sistemas conectados y journeys de adquisición que sigan siendo útiles después de la primera entrega.', cta: 'Definir un proyecto', secondary: 'Explorar capacidades' },
      signal: { security: 'Security-first', security_body: 'Autoridad, identidad, validación y evidencia desde la arquitectura.', end: 'De extremo a extremo', end_body: 'Discovery, producto, ingeniería, cloud, revisión y entrega a staging.', accountability: 'Responsabilidad humana', accountability_body: 'La IA acelera el trabajo; las personas deciden, revisan y aprueban.' },
      about: { eyebrow: 'Propósito', title: 'Ingeniería que crece con quienes la operan.', intro: 'WV SOFTWARE es una práctica de software independiente colombiana fundada por José Luis Martínez Cadavid. Combinamos criterio de seguridad empresarial, ownership full-stack y entrega asistida por IA sin renunciar a la responsabilidad humana.', mission_title: 'Misión', mission: 'Convertir necesidades empresariales complejas en software seguro, comprensible y operable, manteniendo al cliente dentro de las decisiones que dan forma al sistema.', vision_title: 'Visión', vision: 'Ser un aliado de ingeniería confiable para organizaciones que buscan que la IA y el software creen capacidad duradera, no una novedad pasajera.', p1: 'Construido contigo', p1_body: 'Las prioridades, decisiones y criterios de aceptación son visibles para que el resultado se sienta realmente tuyo.', p2: 'Evidencia antes que adjetivos', p2_body: 'Estado, riesgos, pruebas y límites se comunican con claridad, sin esconderse detrás de afirmaciones pulidas.', p3: 'Evolución por diseño', p3_body: 'La arquitectura, documentación y entrega preparan al sistema para su siguiente iteración responsable.' },
      services: { eyebrow: 'Capacidades', title: 'Un aliado de ingeniería a través de todo el sistema.', intro: 'Los proyectos pueden iniciar con una auditoría enfocada o extenderse por arquitectura, implementación, integración, revisión y mejora continua.', platforms: 'Plataformas full-stack', platforms_body: 'Productos web y plataformas internas seguras que cubren backend, frontend, datos, cloud, pruebas y staging.', ai: 'Sistemas de IA, agentes y RAG', ai_body: 'Asistentes, agentes especializados, herramientas MCP, recuperación, evaluaciones, guardrails y fallbacks observables.', security: 'Seguridad, identidad y auditorías', security_body: 'Revisión de arquitectura y código, IAM, SSO/SAML, MFA, RBAC, controles de aprobación y remediación priorizada.', data: 'Flujos de datos e integraciones', data_body: 'Pipelines confiables, APIs, eventos, dashboards operativos e integraciones entre sistemas.', iot: 'IoT y operaciones conectadas', iot_body: 'Telemetría device-to-cloud, LoRa/LoRaWAN, alertas, automatización e interfaces operativas seguras.', quant: 'Sistemas cuantitativos y financieros', quant_body: 'Datos de mercado, investigación, backtesting, dashboards, controles de portafolio e interfaces de IA acotadas.' },
      process: { eyebrow: 'Modelo operativo', title: 'Un ciclo visible desde el contexto hasta la mejora continua.', intro: 'Cada fase produce un artefacto que puedes inspeccionar. El feedback y la evidencia alimentan la siguiente iteración en vez de desaparecer después de la entrega.', discover: 'Descubrir', discover_body: 'Entender objetivos, usuarios, restricciones, sistemas actuales, riesgos y la decisión que el software debe mejorar.', define: 'Definir', define_body: 'Convertir el contexto en alcance, arquitectura, límites de seguridad, criterios de aceptación y plan de entrega.', build: 'Construir y verificar', build_body: 'Implementar en incrementos revisables con gates automáticos, revisión independiente y evidencia en staging.', evolve: 'Integrar y evolucionar', evolve_body: 'Medir uso, monitorear riesgos, integrar feedback y definir juntos la siguiente entrega responsable.' },
      proof: { eyebrow: 'Evidencia seleccionada', title: 'Afirmaciones específicas, límites explícitos.', intro: 'La confidencialidad del cliente importa. Compartimos la forma de ingeniería y el estado actual sin exponer información sensible ni insinuar resultados que no han sido establecidos.', status: 'CLIENTE CONFIDENCIAL · STAGING', case_title: 'Plataforma de operaciones empresariales', case_context: 'El primer proyecto independiente de WV SOFTWARE reemplaza operaciones de seguros basadas en hojas de cálculo con workflows revisables, controles de identidad, dashboards y audit trails.', metric_agents: 'registros de agentes representados en datos de staging', metric_contracts: 'registros de contratos representados en datos de staging', metric_boundary: 'entorno actual; sin afirmar adopción productiva', item1: 'Plataforma Django y React con Postgres, Redis, infraestructura GCP y automatización de entrega.', item2: 'Identidad híbrida, MFA, RBAC por alcance e importaciones preview-before-commit.', item3: 'Operaciones revisables y auditabilidad diseñadas alrededor del flujo real del cliente.', founder: 'La experiencia del fundador incluye cinco años en ciberseguridad en Mercado Libre —manteniendo y auditando sistemas críticos, desarrollando workflows IAM e integraciones SSO, y revisando código para aprobación productiva— además de su trabajo actual en ingeniería para entrenamiento de IA.', founder_cta: 'Ver experiencia del fundador ↗' },
      trust: { eyebrow: 'Confianza y reviews', title: 'La evidencia viene antes que el elogio.', intro: 'Un proyecto confiable debe poder revisarse mientras ocurre. Nuestra prueba pública crece únicamente cuando la evidencia y la autorización del cliente lo permiten.', reviewable: 'Trabajo revisable', reviewable_body: 'Especificaciones, decisiones, código, pruebas, evidencia de staging y riesgos pendientes permanecen inspeccionables.', visible: 'Comunicación visible', visible_body: 'El progreso y los tradeoffs se comunican sin ocultar incertidumbre ni confundir implementación con roadmap.', bounded: 'Afirmaciones acotadas', bounded_body: 'La confidencialidad, estado del proyecto, participación de IA y límites de resultados son explícitos.', policy: 'Los testimonios de clientes se publicarán aquí únicamente con autorización expresa de cada cliente. Ningún endorsement de muestra se presenta como una review real.' },
      plans: { eyebrow: 'Modalidades de trabajo', title: 'Comienza en el nivel que tu problema necesita.', intro: 'Son estructuras de colaboración, no paquetes rígidos. Alcance, tiempos, participación del equipo y condiciones comerciales se definen después del discovery.', audit: 'Discovery y auditoría', audit_body: 'Para equipos que necesitan claridad antes de comprometerse con desarrollo o remediación.', audit_1: 'Discovery técnico y de contexto de negocio', audit_2: 'Evaluación de arquitectura, seguridad o código', audit_3: 'Hallazgos priorizados y roadmap de entrega', build: 'Construcción e integración', build_body: 'Para organizaciones listas para convertir un problema definido en un sistema seguro y verificable.', build_1: 'Arquitectura e implementación iterativa', build_2: 'Integraciones, quality gates y staging', build_3: 'Documentación, transferencia y aceptación', evolve: 'Evolución y operación', evolve_body: 'Para sistemas que necesitan mejora continua, integración, revisión y acompañamiento técnico.', evolve_1: 'Roadmap y planificación de releases', evolve_2: 'Monitoreo, mantenimiento y remediación', evolve_3: 'Integración continua de evidencia y feedback', cta: 'Conversemos sobre esta modalidad →', note: 'Cada proyecto se cotiza individualmente. Se requiere un alcance escrito y acuerdo comercial antes de iniciar el trabajo.' },
      contact: { eyebrow: 'Comencemos por el problema', title: 'Construyamos algo que supere la primera idea.', intro: 'Comparte el contexto, el resultado esperado, las restricciones y lo que está en juego. Identificaremos juntos el primer paso correcto.', email: 'Solicitar cotización por email', whatsapp: 'Conversar por WhatsApp', subject: 'Consulta de proyecto — WV SOFTWARE', message: 'Hola José Luis, me gustaría conversar sobre un proyecto con WV SOFTWARE.', plan_prefix: 'Me interesa la modalidad de trabajo:' },
      game: { player: 'TÚ', opponent: 'IA', instructions: 'MUEVE · mouse / touch / ↑↓ / W S', exit: 'Volver a WV SOFTWARE', overline: 'Partida terminada', result_body: 'Juega tantas partidas como quieras o vuelve cuando estés listo.', restart: 'Jugar otra vez', win: 'Ganaste.', lose: 'La IA gana esta vez.', hint: 'Psst… dale 3 veces' },
      footer: { tagline: 'Ingeniería de IA, software y sistemas seguros desde Colombia.', privacy: 'Privacidad', terms: 'Términos', accessibility: 'Accesibilidad' }
    },
    pt: {
      meta: { title: 'WV SOFTWARE · Software seguro e sistemas de crescimento', description: 'A WV SOFTWARE projeta produtos de IA, plataformas full-stack, cibersegurança, dados, IoT, sistemas quantitativos e infraestrutura de crescimento digital mensurável.' },
      nav: { about: 'Empresa', services: 'Serviços', proof: 'Evidência', plans: 'Modelos', contact: 'Iniciar projeto' },
      theme: { toggle: 'Alternar entre modo claro e escuro' },
      hero: { eyebrow: 'WV SOFTWARE · ESTÚDIO DE SISTEMAS SEGUROS E GROWTH', title: 'Software e sistemas de crescimento que transformam complexidade em vantagem.', lead: 'Trabalhamos com sua equipe para projetar, construir, lançar, medir e evoluir produtos de IA, plataformas empresariais, sistemas conectados e jornadas de aquisição que continuem úteis além da primeira entrega.', cta: 'Definir um projeto', secondary: 'Explorar capacidades' },
      signal: { security: 'Security-first', security_body: 'Autoridade, identidade, validação e evidência desde a arquitetura.', end: 'De ponta a ponta', end_body: 'Discovery, produto, engenharia, cloud, revisão e entrega em staging.', accountability: 'Responsabilidade humana', accountability_body: 'A IA acelera o trabalho; pessoas decidem, revisam e aprovam.' },
      about: { eyebrow: 'Propósito', title: 'Engenharia que cresce com quem a opera.', intro: 'A WV SOFTWARE é uma prática de software independente colombiana fundada por José Luis Martínez Cadavid. Combinamos experiência em segurança empresarial, ownership full-stack e entrega assistida por IA com responsabilidade humana.', mission_title: 'Missão', mission: 'Transformar necessidades empresariais complexas em software seguro, compreensível e operável, mantendo o cliente nas decisões que moldam o sistema.', vision_title: 'Visão', vision: 'Ser um parceiro confiável de engenharia para organizações que desejam que IA e software criem capacidade duradoura, não novidade passageira.', p1: 'Construído com você', p1_body: 'Prioridades, decisões e critérios de aceitação ficam visíveis para que o resultado seja realmente seu.', p2: 'Evidência antes de adjetivos', p2_body: 'Status, riscos, testes e limites são comunicados claramente.', p3: 'Evolução por design', p3_body: 'Arquitetura, documentação e entrega preparam o sistema para a próxima iteração responsável.' },
      services: { eyebrow: 'Capacidades', title: 'Um parceiro de engenharia em todo o sistema.', intro: 'Os projetos podem começar com uma auditoria focada ou avançar por arquitetura, implementação, integração, revisão e melhoria contínua.', platforms: 'Plataformas full-stack', platforms_body: 'Produtos web e plataformas internas seguras cobrindo backend, frontend, dados, cloud, testes e staging.', ai: 'Sistemas de IA, agentes e RAG', ai_body: 'Assistentes, agentes especializados, ferramentas MCP, recuperação, avaliações, guardrails e fallbacks observáveis.', security: 'Segurança, identidade e auditorias', security_body: 'Revisão de arquitetura e código, IAM, SSO/SAML, MFA, RBAC, aprovações e remediação priorizada.', data: 'Fluxos de dados e integrações', data_body: 'Pipelines, APIs, eventos, dashboards operacionais e integrações entre sistemas.', iot: 'IoT e operações conectadas', iot_body: 'Telemetria device-to-cloud, LoRa/LoRaWAN, alertas, automação e interfaces seguras.', quant: 'Sistemas quantitativos e financeiros', quant_body: 'Dados de mercado, pesquisa, backtesting, dashboards, controles e interfaces de IA limitadas.' },
      process: { eyebrow: 'Modelo operacional', title: 'Um ciclo visível do contexto à melhoria contínua.', intro: 'Cada fase produz um artefato inspecionável. Feedback e evidência alimentam a próxima iteração.', discover: 'Descobrir', discover_body: 'Entender objetivos, usuários, restrições, sistemas atuais, riscos e decisões.', define: 'Definir', define_body: 'Transformar contexto em escopo, arquitetura, limites de segurança e critérios de aceitação.', build: 'Construir e verificar', build_body: 'Implementar incrementos revisáveis com gates automáticos, revisão independente e staging.', evolve: 'Integrar e evoluir', evolve_body: 'Medir uso, monitorar risco, integrar feedback e definir a próxima entrega responsável.' },
      proof: { eyebrow: 'Evidência selecionada', title: 'Afirmações específicas, limites explícitos.', intro: 'A confidencialidade do cliente importa. Compartilhamos a forma de engenharia e o status sem expor informações sensíveis.', status: 'CLIENTE CONFIDENCIAL · STAGING', case_title: 'Plataforma de operações empresariais', case_context: 'O primeiro projeto independente da WV SOFTWARE substitui operações de seguros em planilhas por workflows revisáveis, identidade, dashboards e audit trails.', metric_agents: 'registros de agentes representados em staging', metric_contracts: 'registros de contratos representados em staging', metric_boundary: 'ambiente atual; sem alegação de produção', item1: 'Plataforma Django e React com Postgres, Redis, GCP e automação de entrega.', item2: 'Identidade híbrida, MFA, RBAC e importações preview-before-commit.', item3: 'Operações revisáveis e auditabilidade adaptadas ao fluxo do cliente.', founder: 'A experiência do fundador inclui cinco anos em cibersegurança no Mercado Libre —sistemas críticos, workflows IAM, integrações SSO e revisão de código— além do trabalho atual em engenharia para treinamento de IA.', founder_cta: 'Ver experiência do fundador ↗' },
      trust: { eyebrow: 'Confiança e avaliações', title: 'Evidência vem antes do elogio.', intro: 'Um projeto confiável deve ser revisável enquanto acontece. A prova pública cresce somente com evidência e autorização.', reviewable: 'Trabalho revisável', reviewable_body: 'Especificações, decisões, código, testes, staging e riscos ficam inspecionáveis.', visible: 'Comunicação visível', visible_body: 'Progresso e tradeoffs são comunicados sem esconder incerteza ou confundir implementação com roadmap.', bounded: 'Afirmações limitadas', bounded_body: 'Confidencialidade, status, participação da IA e limites de resultados permanecem explícitos.', policy: 'Depoimentos de clientes serão publicados aqui somente com autorização expressa. Nenhum endorsement de exemplo é apresentado como avaliação real.' },
      plans: { eyebrow: 'Modelos de trabalho', title: 'Comece no nível que seu problema precisa.', intro: 'São estruturas de colaboração, não pacotes rígidos. Escopo, prazo e condições são definidos após o discovery.', audit: 'Discovery e auditoria', audit_body: 'Para equipes que precisam de clareza antes de desenvolver ou remediar.', audit_1: 'Discovery técnico e de negócio', audit_2: 'Avaliação de arquitetura, segurança ou código', audit_3: 'Achados priorizados e roadmap', build: 'Construção e integração', build_body: 'Para organizações prontas para transformar um problema em sistema seguro e verificável.', build_1: 'Arquitetura e implementação iterativa', build_2: 'Integrações, quality gates e staging', build_3: 'Documentação, transferência e aceitação', evolve: 'Evolução e operação', evolve_body: 'Para sistemas que precisam de melhoria contínua e acompanhamento técnico.', evolve_1: 'Roadmap e planejamento de releases', evolve_2: 'Monitoramento, manutenção e remediação', evolve_3: 'Integração contínua de evidência e feedback', cta: 'Conversar sobre este modelo →', note: 'Cada projeto é orçado individualmente. Um escopo escrito e acordo comercial são necessários antes do início.' },
      contact: { eyebrow: 'Comecemos pelo problema', title: 'Vamos construir algo que supere a primeira ideia.', intro: 'Compartilhe contexto, resultado desejado, restrições e o que está em jogo. Identificaremos juntos o primeiro passo.', email: 'Solicitar orçamento por e-mail', whatsapp: 'Conversar no WhatsApp', subject: 'Consulta de projeto — WV SOFTWARE', message: 'Olá José Luis, gostaria de conversar sobre um projeto com a WV SOFTWARE.', plan_prefix: 'Tenho interesse no modelo de trabalho:' },
      game: { player: 'VOCÊ', opponent: 'IA', instructions: 'MOVA · mouse / touch / ↑↓ / W S', exit: 'Voltar à WV SOFTWARE', overline: 'Partida concluída', result_body: 'Jogue quantas partidas quiser ou volte quando estiver pronto.', restart: 'Jogar novamente', win: 'Você venceu.', lose: 'A IA venceu desta vez.', hint: 'Psst… toque 3 vezes' },
      footer: { tagline: 'Engenharia segura de IA, software e sistemas desde a Colômbia.', privacy: 'Privacidade', terms: 'Termos', accessibility: 'Acessibilidade' }
    }
  };

  COPY.en.nav.approach = 'Approach';
  COPY.es.nav.approach = 'Método';
  COPY.pt.nav.approach = 'Método';

  Object.assign(COPY.en.services, {
    eyebrow: 'WV SOFTWARE · Services',
    title: 'Engineering and growth systems with accountable delivery.',
    intro: 'Focused engagements for companies that need architecture, implementation, security judgment, measurable acquisition, and a clear path from problem to production and market learning.',
    quote: 'Quote this service',
    quote_message: 'I would like to discuss a quote for:',
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
  });
  Object.assign(COPY.es.services, {
    eyebrow: 'WV SOFTWARE · Servicios',
    title: 'Ingeniería y crecimiento digital con entrega responsable.',
    intro: 'Proyectos para empresas que necesitan arquitectura, implementación, seguridad, adquisición medible y un camino claro desde el problema hasta producción y aprendizaje de mercado.',
    quote: 'Cotizar este servicio',
    quote_message: 'Me gustaría solicitar una cotización para:',
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
  });
  Object.assign(COPY.pt.services, {
    eyebrow: 'WV SOFTWARE · Serviços',
    title: 'Engenharia e crescimento digital com entrega responsável.',
    intro: 'Projetos para empresas que precisam de arquitetura, implementação, segurança, aquisição mensurável e um caminho claro até produção e aprendizado de mercado.',
    quote: 'Solicitar orçamento',
    quote_message: 'Gostaria de solicitar um orçamento para:',
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
  });

  Object.assign(COPY.en.process, {
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
  });
  Object.assign(COPY.es.process, {
    eyebrow: 'Método de ingeniería',
    title: 'Entrega asistida por IA sin tercerizar la responsabilidad.',
    intro: 'Los agentes especializados aceleran el trabajo; las especificaciones, autoridad, revisión independiente, evidencia y decisiones humanas de release mantienen el control.',
    cycle_label: 'La evidencia y tu feedback regresan a la siguiente especificación.',
    items: [
      { number: '01', title: 'Planificar, especificar y delimitar', body: 'Convertir objetivos, restricciones, amenazas, límites de autoridad y criterios de aceptación en un plan priorizado y specs implementables antes del código.' },
      { number: '02', title: 'Desarrollar e implementar', body: 'Construir la arquitectura planificada en incrementos revisables a través de producto, código, datos, integraciones e infraestructura.' },
      { number: '03', title: 'Revisar de forma independiente', body: 'Separar la implementación de la revisión adversarial y proteger pruebas e invariantes contra debilitamientos silenciosos.' },
      { number: '04', title: 'Entregar evidencia', body: 'Usar gates automáticos, revisiones visuales, runbooks, monitoreo y aceptación en staging para hacer el estado verificable.' },
      { number: '05', title: 'Integrar continuamente', body: 'Llevar releases verificados, monitoreo, evidencia y tu feedback a la siguiente especificación para que el sistema evolucione de forma segura contigo.' }
    ]
  });
  Object.assign(COPY.pt.process, {
    eyebrow: 'Método',
    title: 'Entrega assistida por IA sem terceirizar a responsabilidade.',
    intro: 'Agentes especializados aceleram o trabalho; especificações, autoridade, revisão independente e decisões humanas mantêm o controle.',
    cycle_label: 'A evidência e seu feedback retornam à próxima especificação.',
    items: [
      { number: '01', title: 'Planejar, especificar e delimitar', body: 'Transformar objetivos, restrições, ameaças, limites de autoridade e critérios de aceitação em um plano priorizado e specs implementáveis.' },
      { number: '02', title: 'Desenvolver e implementar', body: 'Construir a arquitetura planejada em incrementos revisáveis de produto, código, dados, integrações e infraestrutura.' },
      { number: '03', title: 'Revisar', body: 'Separar implementação de revisão adversarial e proteger testes e invariantes.' },
      { number: '04', title: 'Entregar evidência', body: 'Usar gates, checks visuais, runbooks, monitoramento e staging.' },
      { number: '05', title: 'Integrar continuamente', body: 'Levar releases verificados, monitoramento, evidências e seu feedback à próxima especificação para que o sistema evolua com você.' }
    ]
  });

  const SERVICE_IMAGES = [
    '../assets/media/hero/security-engineering.jpg',
    '../assets/media/hero/system-design.jpg',
    '../assets/media/hero/interactive-analytics.jpg',
    '../assets/media/hero/network-nodes.jpg',
    '../assets/media/hero/neural-network.jpg',
    '../assets/media/hero/iam-security.jpg',
    '../assets/media/hero/iot-agriculture.jpg',
    '../assets/media/hero/quant-candles.jpg',
    '../assets/media/hero/marketing-audit.jpg',
    '../assets/media/hero/paid-media.jpg',
    '../assets/media/hero/growth-automation.jpg',
    '../assets/media/hero/social-media-management.jpg'
  ];

  let activeLanguage = 'es';
  let selectedPlan = '';
  let selectedService = '';
  let approachCycleTimeline = null;
  let approachCycleResizeObserver = null;

  function getPath(source, path) {
    return path.split('.').reduce((value, part) => (value == null ? undefined : value[part]), source);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function bindExpandableCards(container, cardSelector, buttonSelector) {
    const buttons = Array.from(container.querySelectorAll(buttonSelector));
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest(cardSelector);
        const hoverCapable = window.matchMedia('(hover: hover)').matches;
        const hoverOpen = hoverCapable && card.matches(':hover') && !card.classList.contains('is-hover-suppressed');
        const willExpand = !card.classList.contains('is-expanded') && !hoverOpen;
        container.querySelectorAll(`${cardSelector}.is-expanded`).forEach((expandedCard) => {
          expandedCard.classList.remove('is-expanded');
          const expandedButton = expandedCard.querySelector(buttonSelector);
          if (expandedButton) expandedButton.setAttribute('aria-expanded', 'false');
        });
        card.classList.toggle('is-expanded', willExpand);
        card.classList.toggle('is-hover-suppressed', !willExpand);
        button.setAttribute('aria-expanded', String(willExpand));
      });
    });
    container.querySelectorAll(cardSelector).forEach((card) => {
      card.addEventListener('pointerleave', () => card.classList.remove('is-hover-suppressed'));
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        card.classList.remove('is-expanded');
        const button = card.querySelector(buttonSelector);
        if (button) {
          button.setAttribute('aria-expanded', 'false');
          button.focus();
        }
      });
    });
  }

  function renderServices(services) {
    const grid = document.querySelector('#companyServicesGrid');
    if (!grid) return;
    grid.innerHTML = services.items.map((service, index) => `
      <article class="service-card">
        <figure class="service-card-media" aria-hidden="true"><img src="${SERVICE_IMAGES[index]}" alt="" loading="lazy" decoding="async"></figure>
        <div class="service-card-overlay" aria-hidden="true"></div>
        <button class="service-summary" type="button" aria-expanded="false" aria-controls="company-service-panel-${index + 1}">
          <span class="service-title">${escapeHtml(service.title)}</span>
          <span class="service-mark" aria-hidden="true">+</span>
        </button>
        <div id="company-service-panel-${index + 1}" class="service-reveal">
          <div class="service-reveal-inner">
            <p>${escapeHtml(service.body)}</p>
            <span class="service-deliverable code">${escapeHtml(service.deliverable)}</span>
            <a href="#company-contact" class="service-quote-link" data-service-title="${escapeHtml(service.title)}">
              ${escapeHtml(services.quote)} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
    bindExpandableCards(grid, '.service-card', '.service-summary');
    grid.querySelectorAll('.service-quote-link').forEach((link) => {
      link.addEventListener('click', () => {
        selectedService = link.dataset.serviceTitle;
        setContactLinks(COPY[activeLanguage]);
      });
    });
  }

  function activateApproachStage(index, reachedIndex = null) {
    const cycle = document.querySelector('#companyApproachCycle');
    if (!cycle) return;
    const stages = Array.from(cycle.querySelectorAll('.approach-stage'));
    const details = Array.from(cycle.querySelectorAll('.approach-detail'));
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
    const cycle = document.querySelector('#companyApproachCycle');
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
    cycle.querySelectorAll('.approach-stage').forEach((stage) => {
      const selectStage = () => activateApproachStage(Number.parseInt(stage.dataset.stageIndex, 10));
      stage.addEventListener('click', selectStage);
      stage.addEventListener('focus', selectStage);
      stage.addEventListener('pointerenter', selectStage);
    });
    cycle.onpointerenter = () => approachCycleTimeline && approachCycleTimeline.pause();
    cycle.onpointerleave = () => approachCycleTimeline && approachCycleTimeline.play();
    cycle.onfocusin = () => approachCycleTimeline && approachCycleTimeline.pause();
    cycle.onfocusout = (event) => {
      if (!cycle.contains(event.relatedTarget) && approachCycleTimeline) approachCycleTimeline.play();
    };
    activateApproachStage(0, 0);
    setupApproachCycle();
  }

  function setupApproachCycle() {
    const cycle = document.querySelector('#companyApproachCycle');
    const stages = cycle ? Array.from(cycle.querySelectorAll('.approach-stage')) : [];
    const canvas = cycle && cycle.querySelector('.approach-cycle-canvas');
    const path = cycle && cycle.querySelector('.approach-cycle-path-base');
    const progressPath = cycle && cycle.querySelector('.approach-cycle-path-progress');
    const orb = cycle && cycle.querySelector('.approach-cycle-orb');
    const center = cycle && cycle.querySelector('.approach-cycle-center');
    if (approachCycleTimeline) {
      approachCycleTimeline.kill();
      approachCycleTimeline = null;
    }
    if (approachCycleResizeObserver) {
      approachCycleResizeObserver.disconnect();
      approachCycleResizeObserver = null;
    }
    if (window.ScrollTrigger) {
      const previousTrigger = window.ScrollTrigger.getById('company-approach-cycle');
      if (previousTrigger) previousTrigger.kill();
    }
    if (!cycle || !canvas || !path || !progressPath || !orb || !stages.length) return;
    if (!window.gsap || prefersReducedMotion()) {
      const point = path.getPointAtLength(0);
      orb.style.transform = `translate3d(${(point.x / 1000) * canvas.clientWidth}px, ${(point.y / 1000) * canvas.clientHeight}px, 0) translate(-50%, -50%)`;
      return;
    }

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
        id: 'company-approach-cycle',
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

  function setContactLinks(dictionary) {
    const planText = selectedPlan ? `\n\n${dictionary.contact.plan_prefix} ${selectedPlan}` : '';
    const serviceText = selectedService ? `\n\n${dictionary.services.quote_message} ${selectedService}` : '';
    const email = document.querySelector('#companyEmailLink');
    const whatsapp = document.querySelector('#companyWhatsAppLink');
    if (email) email.href = `mailto:${EMAIL}?subject=${encodeURIComponent(dictionary.contact.subject)}&body=${encodeURIComponent(dictionary.contact.message + planText + serviceText)}`;
    if (whatsapp) whatsapp.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(dictionary.contact.message + planText + serviceText)}`;
  }

  function updateLanguageLinks(language) {
    document.querySelectorAll('[data-company-legal]').forEach((link) => {
      link.href = `../legal.html?lang=${encodeURIComponent(language)}#${encodeURIComponent(link.dataset.companyLegal)}`;
    });
  }

  function applyLanguage(language, persist = true) {
    const normalized = COPY[language] ? language : 'es';
    const dictionary = COPY[normalized];
    activeLanguage = normalized;
    document.documentElement.lang = normalized;
    document.title = dictionary.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = dictionary.meta.description;
    document.querySelectorAll('[data-company-i18n]').forEach((element) => {
      const value = getPath(dictionary, element.dataset.companyI18n);
      if (typeof value === 'string') element.textContent = value;
    });
    renderServices(dictionary.services);
    renderApproach(dictionary.process);
    const select = document.querySelector('#companyLanguage');
    if (select) select.value = normalized;
    updateLanguageLinks(normalized);
    setContactLinks(dictionary);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', normalized);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    if (persist) localStorage.setItem('lang', normalized);
  }

  function applyTheme(theme, persist = true) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${normalized}`);
    document.documentElement.style.colorScheme = normalized;
    const toggle = document.querySelector('#companyThemeToggle');
    if (toggle) toggle.setAttribute('aria-pressed', String(normalized === 'light'));
    if (persist) localStorage.setItem(THEME_STORAGE_KEY, normalized);
  }

  function setupReveal() {
    const elements = Array.from(document.querySelectorAll('.company-reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    document.body.classList.add('company-motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element, index) => {
      element.style.setProperty('--company-reveal-delay', `${Math.min(index % 4, 3) * 55}ms`);
      observer.observe(element);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const queryLanguage = new URLSearchParams(window.location.search).get('lang');
    const storedLanguage = localStorage.getItem('lang');
    const initialLanguage = COPY[queryLanguage] ? queryLanguage : (COPY[storedLanguage] ? storedLanguage : 'es');
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
    applyLanguage(initialLanguage, false);
    applyTheme(initialTheme, false);
    document.querySelector('#companyYear').textContent = new Date().getFullYear();

    document.querySelector('#companyLanguage').addEventListener('change', (event) => applyLanguage(event.target.value));
    document.querySelector('#companyThemeToggle').addEventListener('click', () => applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light'));
    document.querySelectorAll('[data-company-plan]').forEach((link) => {
      link.addEventListener('click', () => {
        const planKey = link.dataset.companyPlan;
        const dictionary = COPY[activeLanguage];
        selectedPlan = dictionary.plans[planKey] || '';
        setContactLinks(dictionary);
      });
    });

    const header = document.querySelector('.company-header');
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    const video = document.querySelector('.company-hero-video');
    if (video) {
      video.setAttribute('fetchpriority', 'high');
      video.play().catch(() => {});
    }
    setupReveal();
    if (window.JLMCPageLoader) {
      window.JLMCPageLoader.waitForReady({ mediaSelector: '.company-hero-video' });
    }
  });
}());
