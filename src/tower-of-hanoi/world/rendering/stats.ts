import Stats from 'three/examples/jsm/libs/stats.module.js';

function createStatsPanel(element: HTMLElement): Stats {
  const stats = new Stats();
  stats.showPanel(0);
  element.appendChild(stats.dom);
  return stats;
}

export { createStatsPanel };
