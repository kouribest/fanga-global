(() => {
let language = 'en';
let selectedService = null;
let selectedAiAgent = 'oee';
const languageSelect = document.getElementById('language-select');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function updateMenuLabel() {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-label', language === 'fr' ? (open ? 'Fermer le menu' : 'Ouvrir le menu') : (open ? 'Close menu' : 'Open menu'));
}
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); updateMenuLabel(); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); updateMenuLabel(); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
const services = {
  en: {
    iot: {
      title: 'IoT & Fleet Management',
      description: 'Connecting equipment to operational decisions: we help implement sensors, telemetry and fleet management systems (FMS) tailored to your mining operations.',
      points: [
        'Assess connectivity, equipment and operational needs across your sites, including remote locations.',
        'Structure truck and equipment monitoring: location, status, cycles, downtime and fuel consumption, depending on the available data.',
        'Support FMS configuration to inform equipment allocation and fleet optimisation.',
        'Improve data collection reliability and bring together the information needed for production and maintenance.',
        'Train users and support deployment and the ongoing development of the solution.'
      ]
    },
    data: {
      title: 'Data & Business Intelligence',
      description: 'From scattered data to shared performance indicators: we work with you to build a consistent, actionable view of your operations.',
      points: [
        'Integrate and improve the reliability of production, maintenance, fleet and business data.',
        'Define shared indicators, calculation methods and responsibilities for keeping data up to date.',
        'Design clear dashboards for field teams, site managers and leadership.',
        'Analyse trends and deviations to guide investigations and decisions.',
        'Establish data governance practices and train teams to use data effectively.'
      ]
    },
    ai: {
      title: 'AI & Analytics',
      description: 'An orchestrator powered by a large language model (LLM) can coordinate specialised agents to turn operational data into analysis and recommendations for your teams to review.',
      points: [
        'Build a foundation of FMS and IoT data, enriched with standard operating procedures (SOPs) and site business rules.',
        'Coordinate agents focused on overall equipment effectiveness (OEE), cycles and performance, and capacity and forecasting.',
        'Define each agent’s scope, data access and configurable level of autonomy.',
        'Maintain traceability of sources, analyses and recommendations, with appropriate human oversight.',
        'Assess the relevance and limitations of analyses using your data before any operational use.'
      ]
    },
    operations: {
      title: 'Operational Excellence',
      description: 'Technology creates value when it becomes part of everyday work. We support your teams from assessing operations to implementing improvements.',
      points: [
        'Assess processes, constraints and management practices on site.',
        'Use value stream mapping (VSM) and build a value driver tree (VDT) to identify and prioritise improvements.',
        'Apply Lean methods and the DMAIC approach: define, measure, analyse, improve and control.',
        'Structure procedures, indicators and management routines around the needs of the site.',
        'Train teams and support change management to make new practices last.'
      ]
    }
  },
  fr: {
  iot: {
    title: 'IoT & gestion de flotte',
    description: 'Relier les équipements aux décisions du terrain : nous accompagnons la mise en place de capteurs, de télémétrie et de systèmes de gestion de flotte (FMS) adaptés à vos opérations minières.',
    points: [
      'Évaluer la connectivité, les équipements et les besoins de vos sites, y compris en environnement isolé.',
      'Structurer le suivi des camions et engins : positions, états, cycles, arrêts et consommation selon les données disponibles.',
      'Accompagner le paramétrage du FMS pour éclairer l’affectation des engins et l’optimisation de la flotte.',
      'Fiabiliser la collecte et centraliser les données utiles à la production et à la maintenance.',
      'Former les utilisateurs et accompagner le déploiement ainsi que l’évolution de la solution.'
    ]
  },
  data: {
    title: 'Data & Business Intelligence',
    description: 'Des données dispersées aux indicateurs partagés : nous construisons avec vous une vision cohérente et exploitable de vos opérations.',
    points: [
      'Rapprocher et fiabiliser les données de production, de maintenance, de flotte et de gestion.',
      'Définir des indicateurs communs, leurs règles de calcul et les responsabilités de mise à jour.',
      'Concevoir des tableaux de bord lisibles pour les équipes terrain, les responsables de site et la direction.',
      'Analyser les tendances et les écarts pour orienter les investigations et les décisions.',
      'Mettre en place les pratiques de gouvernance et former les équipes à l’usage des données.'
    ]
  },
  ai: {
    title: 'IA & Analytics',
    description: 'Un orchestrateur fondé sur un grand modèle de langage (LLM) peut coordonner des agents spécialisés pour transformer les données opérationnelles en analyses et en recommandations à valider par vos équipes.',
    points: [
      'Construire un socle de données FMS et IoT, enrichi par les procédures opératoires standard (SOP) et les règles métier du site.',
      'Coordonner des agents dédiés au rendement des équipements (OEE/TRS), aux cycles et à la performance, ainsi qu’à la capacité et aux prévisions.',
      'Définir pour chaque agent un périmètre, les données accessibles et un niveau d’autonomie configurable.',
      'Assurer la traçabilité des sources, des analyses et des recommandations, avec une supervision humaine adaptée.',
      'Évaluer la pertinence et les limites des analyses sur vos données avant tout usage opérationnel.'
    ]
  },
  operations: {
    title: 'Excellence opérationnelle',
    description: 'La technologie crée de la valeur lorsqu’elle s’intègre aux pratiques quotidiennes. Nous accompagnons vos équipes du diagnostic des opérations à la mise en œuvre des améliorations.',
    points: [
      'Réaliser un diagnostic terrain des processus, des contraintes et des pratiques de pilotage.',
      'Cartographier les flux de valeur (VSM) et construire un arbre des leviers de valeur (VDT) pour repérer et prioriser les améliorations.',
      'Mobiliser les méthodes Lean et la démarche DMAIC : définir, mesurer, analyser, améliorer et contrôler.',
      'Structurer les procédures, les indicateurs et les rituels de management adaptés au site.',
      'Former les équipes et accompagner le changement pour ancrer les nouvelles pratiques dans la durée.'
    ]
  }
  }
};
const dialog = document.getElementById('service-dialog');
function renderService(key) {
  const service = services[language][key];
  if (!service) return;
  document.getElementById('dialog-title').textContent = service.title;
  document.getElementById('dialog-description').textContent = service.description;
  document.getElementById('dialog-list').replaceChildren(...service.points.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
}
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.service;
  if (!services[language][key]) return;
  selectedService = key;
  renderService(key);
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
document.getElementById('dialog-contact').addEventListener('click', () => dialog.close());
const aiAgents = {
  en: {
    oee: {
      index: '01',
      title: 'OEE Agent',
      description: 'Analyses equipment effectiveness and helps distinguish losses linked to downtime, performance and quality, using the definitions and data agreed for the site.',
      indicators: ['Equipment availability and causes of downtime', 'Performance and production rate', 'Production quality and usable yield'],
      output: 'Can suggest improvement opportunities and checks to carry out, for operations and maintenance managers to validate.'
    },
    cycles: {
      index: '02',
      title: 'Cycles & Performance Agent',
      description: 'Examines the stages of operational cycles to clarify waiting times, time variations and differences between equipment or teams, taking the production context into account.',
      indicators: ['Cycle times and waiting times', 'Variations across operating periods', 'Differences by equipment and team'],
      output: 'Can suggest bottleneck investigations and operational adjustments, for site teams to validate.'
    },
    capacity: {
      index: '03',
      title: 'Capacity & Forecasting Agent',
      description: 'Compares available capacity, planned workload and operational constraints to explore production scenarios and examine deviations from forecasts.',
      indicators: ['Available capacity and planned workload', 'Production scenarios and their underlying assumptions', 'Forecast versus actual performance'],
      output: 'Can propose planning scenarios and highlight issues to consider, for production managers to validate before making decisions.'
    }
  },
  fr: {
  oee: {
    index: '01',
    title: 'Agent OEE / TRS',
    description: 'Analyse le rendement des équipements et aide à distinguer les pertes liées aux arrêts, à la performance et à la qualité, selon les définitions et les données retenues pour le site.',
    indicators: ['Disponibilité des équipements et causes d’arrêt', 'Performance et rythme de production', 'Qualité de la production et rendement utile'],
    output: 'Peut proposer des pistes d’amélioration et les vérifications à mener, à valider par les responsables d’exploitation et de maintenance.'
  },
  cycles: {
    index: '02',
    title: 'Agent cycles & performance',
    description: 'Examine les étapes des cycles opérationnels pour éclairer les attentes, les variations de temps et les écarts entre équipements ou équipes, en tenant compte du contexte de production.',
    indicators: ['Temps de cycle et temps d’attente', 'Variations entre périodes d’activité', 'Écarts par équipement et par équipe'],
    output: 'Peut suggérer des investigations sur les goulots d’étranglement et des ajustements d’organisation, à valider par les équipes du site.'
  },
  capacity: {
    index: '03',
    title: 'Agent capacité & prévision',
    description: 'Met en regard la capacité disponible, la charge prévue et les contraintes opérationnelles pour explorer des scénarios de production et examiner les écarts aux prévisions.',
    indicators: ['Capacité disponible et charge planifiée', 'Scénarios de production et hypothèses associées', 'Écarts entre prévision et réalisé'],
    output: 'Peut proposer des scénarios de planification et des points de vigilance, à valider par les responsables de production avant toute décision.'
  }
  }
};
const aiAgentButtons = document.querySelectorAll('[data-ai-agent]');
const aiAgentDetail = document.getElementById('ai-agent-detail');
function selectAiAgent(key) {
  const agent = aiAgents[language][key];
  if (!agent || !aiAgentDetail) return;
  selectedAiAgent = key;
  aiAgentButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.aiAgent === key));
    button.setAttribute('aria-controls', 'ai-agent-detail');
  });
  document.getElementById('ai-agent-title').textContent = agent.title;
  document.getElementById('ai-agent-description').textContent = agent.description;
  document.getElementById('ai-agent-output').textContent = agent.output;
  document.getElementById('ai-agent-index').textContent = agent.index;
  document.getElementById('ai-agent-indicators').replaceChildren(...agent.indicators.map(text => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  }));
}
aiAgentButtons.forEach(button => button.addEventListener('click', () => selectAiAgent(button.dataset.aiAgent)));
function setLanguage(value, persist = false) {
  language = value === 'fr' ? 'fr' : 'en';
  document.documentElement.lang = language;
  if (languageSelect) languageSelect.value = language;
  const translations = window.FANGA_TRANSLATIONS?.[language] || {};
  const fallback = window.FANGA_TRANSLATIONS?.en || {};
  const translate = key => translations[key] ?? fallback[key];
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const text = translate(element.getAttribute('data-i18n'));
    if (typeof text === 'string') element.textContent = text;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const html = translate(element.getAttribute('data-i18n-html'));
    // HTML translations are authored locally in translations.js, never supplied by visitors.
    if (typeof html === 'string') element.innerHTML = html;
  });
  ['aria-label', 'alt', 'content', 'href'].forEach(attribute => {
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach(element => {
      const text = translate(element.getAttribute(`data-i18n-${attribute}`));
      if (typeof text === 'string') element.setAttribute(attribute, text);
    });
  });
  updateMenuLabel();
  if (selectedService && dialog.open) renderService(selectedService);
  selectAiAgent(selectedAiAgent);
  if (persist) {
    try { localStorage.setItem('fanga-language', language); } catch { /* Language changes remain available when storage is blocked. */ }
  }
}
let initialLanguage = 'en';
try {
  const storedLanguage = localStorage.getItem('fanga-language');
  if (storedLanguage === 'en' || storedLanguage === 'fr') initialLanguage = storedLanguage;
} catch { /* Use English when storage is unavailable. */ }
setLanguage(initialLanguage);
languageSelect?.addEventListener('change', event => setLanguage(event.target.value, true));
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('a').forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-20% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
})();
