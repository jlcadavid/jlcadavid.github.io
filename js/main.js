/* Main JS: AOS init, i18n (ES/EN/PT), sections rendering, GitHub projects, contact form */
(function(){
  const GITHUB_USER = 'jlcadavid';
  const FORMSPREE_URL = '';// set later if desired, else mailto fallback
  // Map CV files per language
  const CV_LINKS = {
    es: 'assets/cv/Hoja de Vida (Estilo Casa Blanca) - José Luis Martínez Cadavid.pdf',
    en: 'assets/cv/Hoja de Vida (Estilo Casa Blanca) - EN - José Luis Martínez Cadavid.pdf',
    pt: 'assets/cv/Hoja de Vida (Estilo Casa Blanca) - EN - José Luis Martínez Cadavid.pdf' // fallback to EN
  };

  // ---- i18n dictionaries ----
  const I18N = {
    es: {
      nav: { about: 'Sobre mí', skills: 'Skills', experience: 'Experiencia', projects: 'Proyectos', contact: 'Contacto' },
      hero: {
        title: 'Desarrollador Back-end · Ciberseguridad',
        subtitle: 'IAM, gobierno de accesos y SoD. Integraciones Azure AD/Okta, SSO/SAML, MFA. Automatización con Python. Experiencia en entornos corporativos críticos, cumplimiento y AppSec.',
        cta_contact: 'Contactar', cta_cv: 'Ver CV (PDF)'
      },
      about: {
        title: 'Sobre mí',
        body: 'Soy un profesional analítico, orientado a la mejora continua y a la experiencia del usuario. Cuento con experiencia en gestión integral de identidades y control de accesos (IAM), certificación de accesos, flujos de aprobación, gobernanza y análisis de riesgos con controles SoD. He trabajado en integraciones y soporte sobre Azure AD, Okta, SSO/SAML, MFA y servicios cloud. Automatizo procesos con Python para reducir tiempos operativos y elevar la precisión en la toma de decisiones de seguridad. También participo en revisiones y aprobación de código con foco en IAM y AppSec, garantizando buenas prácticas y control de cambios en ambientes de alta criticidad.'
      },
      skills: { title: 'Tecnologías y competencias', cats: {
        backend: 'Back-end', iam: 'IAM / Seguridad', cloud: 'Cloud / SSO', data: 'Datos', mobile: 'Móvil', tooling: 'Tooling'
      } },
      experience: { title: 'Experiencia', items: [
        {
          title: 'Cybersecurity SSr Engineer · MercadoLibre', period: 'Año(s)',
          bullets: [
            'Certificación de accesos, flujos de aprobación y gobernanza (SoD).',
            'Integraciones e interoperabilidad: Azure AD, Okta, SSO/SAML, MFA y servicios cloud.',
            'Automatización de tareas de acceso y monitoreo con Python.',
            'Revisión/aprobación de cambios a producción con foco en IAM y AppSec.',
            'Colaboración con equipos globales técnicos y de negocio (ES/EN).'
          ]
        }
      ]},
      projects: { title: 'Proyectos', more: 'Ver todos en GitHub' },
      certs: { title: 'Certificaciones' },
      education: { title: 'Educación' },
      articles: { title: 'Artículos' },
      contact: { title: 'Contacto', send: 'Enviar mensaje', ok: 'Gracias, abre tu cliente de correo para enviar.', fail: 'No fue posible enviar. Intenta con el enlace de correo.' }
    },
    en: {
      nav: { about: 'About', skills: 'Skills', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
      hero: {
        title: 'Back-end Developer · Cybersecurity',
        subtitle: 'IAM, access governance and SoD. Azure AD/Okta integrations, SSO/SAML, MFA. Python automation. Corporate-critical environments, compliance and AppSec.',
        cta_contact: 'Contact', cta_cv: 'View CV (PDF)'
      },
      about: {
        title: 'About me',
        body: 'Analytical and improvement-driven, with strong UX focus. Experience in Identity and Access Management (IAM), access certification, approval workflows, governance and risk analysis with SoD controls. Hands-on with Azure AD, Okta, SSO/SAML, MFA and cloud services. I automate processes with Python to cut operational time and improve security decision accuracy. I also perform code reviews and approvals with an IAM/AppSec mindset for high-criticality environments.'
      },
      skills: { title: 'Technologies & competencies', cats: {
        backend: 'Back-end', iam: 'IAM / Security', cloud: 'Cloud / SSO', data: 'Data', mobile: 'Mobile', tooling: 'Tooling'
      } },
      experience: { title: 'Experience', items: [
        {
          title: 'Cybersecurity SSr Engineer · MercadoLibre', period: 'Year(s)',
          bullets: [
            'Access certification, approval workflows and governance (SoD).',
            'Integrations and interoperability: Azure AD, Okta, SSO/SAML, MFA and cloud services.',
            'Python-based automation for access and monitoring tasks.',
            'Code review/approval to production with IAM/AppSec focus.',
            'Collaboration with global teams (EN/ES).'
          ]
        }
      ]},
      projects: { title: 'Projects', more: 'See all on GitHub' },
      certs: { title: 'Certifications' },
      education: { title: 'Education' },
      articles: { title: 'Articles' },
      contact: { title: 'Contact', send: 'Send message', ok: 'Thanks! Your email client will open to send.', fail: 'Unable to send. Try the email link.' }
    },
    pt: {
      nav: { about: 'Sobre', skills: 'Habilidades', experience: 'Experiência', projects: 'Projetos', contact: 'Contato' },
      hero: {
        title: 'Desenvolvedor Back-end · Cibersegurança',
        subtitle: 'IAM, governança de acessos e SoD. Integrações Azure AD/Okta, SSO/SAML, MFA. Automação em Python. Ambientes corporativos críticos, compliance e AppSec.',
        cta_contact: 'Contato', cta_cv: 'Ver CV (PDF)'
      },
      about: {
        title: 'Sobre mim',
        body: 'Profissional analítico e orientado à melhoria contínua, com foco em UX. Experiência em IAM, certificação de acessos, workflows de aprovação, governança e análise de riscos com controles SoD. Atuação com Azure AD, Okta, SSO/SAML, MFA e serviços em nuvem. Automatizo processos com Python para reduzir tempos operacionais e melhorar a precisão em decisões de segurança. Participo de revisões e aprovações de código com foco em IAM e AppSec em ambientes de alta criticidade.'
      },
      skills: { title: 'Tecnologias e competências', cats: {
        backend: 'Back-end', iam: 'IAM / Segurança', cloud: 'Cloud / SSO', data: 'Dados', mobile: 'Mobile', tooling: 'Ferramentas'
      } },
      experience: { title: 'Experiência', items: [
        {
          title: 'Cybersecurity SSr Engineer · MercadoLibre', period: 'Ano(s)',
          bullets: [
            'Certificação de acessos, workflows de aprovação e governança (SoD).',
            'Integrações: Azure AD, Okta, SSO/SAML, MFA e serviços em nuvem.',
            'Automação em Python para tarefas de acesso e monitoramento.',
            'Revisão/aprovação de código para produção com foco em IAM/AppSec.',
            'Colaboração com equipes globais (PT/ES/EN).'
          ]
        }
      ]},
      projects: { title: 'Projetos', more: 'Ver todos no GitHub' },
      certs: { title: 'Certificações' },
      education: { title: 'Educação' },
      articles: { title: 'Artigos' },
      contact: { title: 'Contato', send: 'Enviar mensagem', ok: 'Obrigado! Seu cliente de e-mail abrirá para enviar.', fail: 'Não foi possível enviar. Tente o link de e-mail.' }
    }
  };

  // ---- content data ----
  const data = {
    skills: [
      { key: 'backend', items: ['Python', 'Java', 'Node.js', 'REST APIs', 'SQL/NoSQL'] },
      { key: 'iam', items: ['IAM', 'Access Governance', 'SoD', 'Risk analysis'] },
      { key: 'cloud', items: ['Azure AD', 'Okta', 'SSO/SAML', 'MFA', 'Cloud'] },
      { key: 'data', items: ['Pandas', 'NumPy', 'ETL', 'Dashboards'] },
      { key: 'mobile', items: ['Android', 'Flutter'] },
      { key: 'tooling', items: ['Git', 'CI/CD', 'Linux', 'Docker'] }
    ],
    experience: I18N.es.experience.items, // structure shared; content from i18n
    certifications: [],
    education: [],
    articles: [],
    manualProjects: [
      { name: 'tbot', desc: 'Herramienta/Proyecto indicado por el autor (enlace pendiente).', url: '#', language: 'TBD' },
      { name: "engage - what's your plan?", desc: 'Proyecto indicado por el autor (enlace pendiente).', url: '#', language: 'TBD' },
      { name: 'visautomator', desc: 'Proyecto indicado por el autor (enlace pendiente).', url: '#', language: 'TBD' }
    ]
  };

  // ---- helpers ----
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function setYear(){ const y = new Date().getFullYear(); const el = $('#year'); if (el) el.textContent = y; }

  function applyI18n(lang){
    const t = I18N[lang] || I18N.es;
    // set document language attr
    document.documentElement.setAttribute('lang', lang);
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = key.split('.').reduce((acc,k)=>acc&&acc[k], t);
      if (typeof val === 'string') el.textContent = val;
    });
    // Experience rendering uses localized items
    renderExperience(t.experience.items);
    // Section headings already updated via data-i18n
    setCvLink(lang);
  }

  function setupLang(){
    const saved = localStorage.getItem('lang') || 'es';
    applyI18n(saved);
    $$('.lang-btn').forEach(btn=>{
      if (btn.dataset.lang===saved) btn.classList.add('bg-neutral-800');
      btn.addEventListener('click',()=>{
        const lang = btn.dataset.lang;
        localStorage.setItem('lang', lang);
        $$('.lang-btn').forEach(b=>b.classList.remove('bg-neutral-800'));
        btn.classList.add('bg-neutral-800');
        applyI18n(lang);
      });
    });
  }

  function setCvLink(lang){
    const link = document.getElementById('cvLink');
    if (!link) return;
    const href = CV_LINKS[lang] || CV_LINKS.es;
    link.setAttribute('href', href);
  }

  // ---- sections renderers ----
  function renderSkills(){
    const grid = $('#skillsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const lang = localStorage.getItem('lang') || 'es';
    const cats = I18N[lang].skills.cats;
    data.skills.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'card p-4';
      card.innerHTML = `<div class="title mb-2">${cats[cat.key]||cat.key}</div>
        <div class="flex flex-wrap gap-2 text-sm text-neutral-400">${cat.items.map(i=>`<span class='px-2 py-1 rounded border border-neutral-700'>${i}</span>`).join('')}</div>`;
      grid.appendChild(card);
    });
  }

  function renderExperience(items){
    const list = $('#experienceList');
    if (!list) return;
    list.innerHTML = '';
    items.forEach(exp=>{
      const el = document.createElement('div');
      el.className = 'card p-4';
      el.innerHTML = `<div class='flex items-center justify-between'>
          <div class='title'>${exp.title}</div>
          <div class='text-xs text-neutral-500 ml-2'>${exp.period||''}</div>
        </div>
        <ul class='mt-2 list-disc list-inside text-neutral-400 text-sm space-y-1'>
          ${exp.bullets.map(b=>`<li>${b}</li>`).join('')}
        </ul>`;
      list.appendChild(el);
    });
  }

  async function fetchGithubRepos(){
    try{
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
      if (!res.ok) throw new Error('GitHub API error');
      const repos = await res.json();
      // filter and sort
      const filtered = repos.filter(r=>!r.fork).sort((a,b)=> (b.stargazers_count-a.stargazers_count) || (new Date(b.updated_at)-new Date(a.updated_at)) );
      return filtered;
    }catch(e){
      console.warn('Repos fetch failed', e);
      return [];
    }
  }

  function projectCard(p){
    const desc = (p.description||'').slice(0,140);
    const lang = p.language || p.language === null ? (p.language||'') : (p.language||'');
    const url = p.html_url || p.url || '#';
    return `<a class='card p-4 block hover:bg-neutral-900 transition' href='${url}' target='_blank' rel='noopener'>
      <div class='flex items-center justify-between gap-2'>
        <div class='title truncate'>${p.name}</div>
        <span class='text-xs text-neutral-500'>${lang||''}</span>
      </div>
      ${desc?`<p class='desc mt-1 line-clamp-3'>${desc}</p>`:''}
    </a>`;
  }

  async function renderProjects(){
    const grid = $('#projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    // manual projects first
    data.manualProjects.forEach(mp=>{
      const wrapper = document.createElement('div');
      wrapper.innerHTML = projectCard({ name: mp.name, description: mp.desc, language: mp.language, html_url: mp.url });
      grid.appendChild(wrapper.firstElementChild);
    });
    // github repos
    const repos = await fetchGithubRepos();
    repos.forEach(r=>{
      const wrapper = document.createElement('div');
      wrapper.innerHTML = projectCard(r);
      grid.appendChild(wrapper.firstElementChild);
    });
  }

  function renderCerts(){
    const list = $('#certsList'); if (!list) return; list.innerHTML = '';
    // Placeholder; add items later
  }
  function renderEducation(){
    const list = $('#educationList'); if (!list) return; list.innerHTML = '';
  }
  function renderArticles(){
    const list = $('#articlesList'); if (!list) return; list.innerHTML = '';
  }

  // ---- contact form ----
  function setupContact(){
    const form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const lang = localStorage.getItem('lang') || 'es';
      const t = I18N[lang];
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const msg = $('#formMsg');
      if (FORMSPREE_URL){
        try{
          const res = await fetch(FORMSPREE_URL,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, message }) });
          if (!res.ok) throw new Error('send failed');
          msg.textContent = t.contact.ok;
        }catch{ msg.textContent = t.contact.fail; }
      } else {
        // mailto fallback
        const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
        const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
        window.location.href = `mailto:jlmc97@gmail.com?subject=${subject}&body=${body}`;
        msg.textContent = t.contact.ok;
      }
    });
  }

  // ---- nav scrollspy ----
  function setupScrollSpy(){
    const navLinks = $$('#mainNav a');
    const sections = navLinks.map(a=>$(a.getAttribute('href'))).filter(Boolean);
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const id = '#' + entry.target.id;
        const link = navLinks.find(l=>l.getAttribute('href')===id);
        if (entry.isIntersecting){
          navLinks.forEach(l=>l.classList.remove('text-white'));
          if (link) link.classList.add('text-white');
        }
      })
    },{ rootMargin: '-60% 0px -35% 0px', threshold: 0.0 });
    sections.forEach(sec=>sec && obs.observe(sec));
  }

  // ---- init ----
  document.addEventListener('DOMContentLoaded', async ()=>{
    setYear();
    AOS.init({ duration: 700, easing: 'ease-out', once: true });
    setupLang();
    renderSkills();
    renderCerts();
    renderEducation();
    renderArticles();
    setupScrollSpy();
    setupContact();
    await renderProjects();
  });
})();
