import Stats from 'stats.js';

function createStatsPanel(element: HTMLElement): Stats {
  const stats = new Stats();
  stats.showPanel(0);
  element.appendChild(stats.dom);
  return stats;
}

export { createStatsPanel };
