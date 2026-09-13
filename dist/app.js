const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Ouvrir le menu'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
const services = {
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
};
const dialog = document.getElementById('service-dialog');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = services[button.dataset.service];
  document.getElementById('dialog-title').textContent = service.title;
  document.getElementById('dialog-description').textContent = service.description;
  document.getElementById('dialog-list').replaceChildren(...service.points.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
document.getElementById('dialog-contact').addEventListener('click', () => dialog.close());
const aiAgents = {
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
};
const aiAgentButtons = document.querySelectorAll('[data-ai-agent]');
const aiAgentDetail = document.getElementById('ai-agent-detail');
function selectAiAgent(key) {
  const agent = aiAgents[key];
  if (!agent || !aiAgentDetail) return;
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
selectAiAgent('oee');
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('a').forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-20% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
