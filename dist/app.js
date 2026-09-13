const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Ouvrir le menu'); navigation.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();
const services = {
  iot: { title: 'IoT & digitalisation', description: 'Une chaîne de données fiable commence sur le terrain. Nous vous aidons à connecter vos équipements et à rendre l’information accessible aux équipes qui en ont besoin.', points: ['Évaluer la connectivité et les besoins de vos sites, y compris en environnement isolé.', 'Définir les capteurs, la télémétrie et le suivi de flotte adaptés à vos usages.', 'Centraliser les données de production, de maintenance et de consommation.', 'Accompagner le déploiement, la prise en main et l’évolution de la solution.'] },
  data: { title: 'Data & intelligence', description: 'Des données dispersées aux indicateurs partagés : nous construisons avec vous une vision exploitable de vos opérations.', points: ['Structurer et fiabiliser vos sources de données.', 'Concevoir des tableaux de bord lisibles pour les équipes terrain et la direction.', 'Identifier les dérives, comprendre leurs causes et prioriser les actions.', 'Évaluer les usages pertinents de l’IA et de l’analyse prédictive selon la qualité des données disponibles.'] },
  operations: { title: 'Excellence opérationnelle', description: 'La technologie crée de la valeur lorsqu’elle s’intègre aux pratiques quotidiennes. Nous plaçons les équipes et leurs processus au centre de la transformation.', points: ['Cartographier les processus et identifier les points de friction.', 'Prioriser les améliorations selon leur impact opérationnel et leur faisabilité.', 'Déployer des méthodes Lean et des rituels de pilotage adaptés au terrain.', 'Former les équipes et mesurer les progrès avec des indicateurs convenus ensemble.'] }
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
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { navigation.querySelectorAll('a').forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-20% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
