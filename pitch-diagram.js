/**
 * CANCHAS DE FÚTBOL 7 - INTERACTIVE PITCH BLUEPRINT
 * Tactical vector field visualization with zone inspection and regulation dimensions
 */

document.addEventListener('DOMContentLoaded', () => {
  initPitchBlueprint();
});

function initPitchBlueprint() {
  const container = document.getElementById('tactical-pitch-container');
  if (!container) return;

  const presetButtons = document.querySelectorAll('.pitch-preset-btn');
  const metricLength = document.getElementById('pitch-metric-length');
  const metricWidth = document.getElementById('pitch-metric-width');
  const metricPlayArea = document.getElementById('pitch-metric-playarea');
  const metricTotalArea = document.getElementById('pitch-metric-totalarea');
  const infoTitle = document.getElementById('pitch-zone-info-title');
  const infoText = document.getElementById('pitch-zone-info-text');

  const presets = {
    standard: { length: 55, width: 35, label: 'Estándar Recomendado (55 × 35 m)' },
    minimum: { length: 50, width: 30, label: 'Mínimo Reglamentario NIDE (50 × 30 m)' },
    maximum: { length: 65, width: 45, label: 'Máximo Reglamentario NIDE (65 × 45 m)' }
  };

  function updateMetrics(length, width) {
    const playArea = length * width;
    const totalArea = (length + 3) * (width + 3); // 1.5m margin on all 4 sides
    if (metricLength) metricLength.textContent = `${length} m`;
    if (metricWidth) metricWidth.textContent = `${width} m`;
    if (metricPlayArea) metricPlayArea.textContent = `${playArea.toLocaleString()} m²`;
    if (metricTotalArea) metricTotalArea.textContent = `${totalArea.toLocaleString()} m²`;
  }

  // Handle Preset Buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.getAttribute('data-preset');
      const data = presets[presetKey] || presets.standard;
      updateMetrics(data.length, data.width);
    });
  });

  // Zone details mapping
  const zoneInfoData = {
    'goal-area': {
      title: 'Área de Penalti (Área de Meta)',
      text: 'Superficie de 13 m de ancho hacia el campo y 25 m de frente (según normativa habitual). En esta zona el portero puede jugar el balón con las manos y cualquier infracción grave es castigada con penalti.'
    },
    'penalty-spot': {
      title: 'Punto de Penalti',
      text: 'Situado a 7 metros de distancia desde el centro de la línea de meta. Desde este punto exacto se ejecutan los tiros de castigo directo.'
    },
    'center-circle': {
      title: 'Círculo Central y Línea Media',
      text: 'La línea de medio campo divide el terreno de juego en dos mitades simétricas. El círculo central tiene un radio de 6 metros para asegurar la distancia reglamentaria en el saque de inicio.'
    },
    'goal': {
      title: 'Porterías Oficiales de Fútbol 7',
      text: 'Dimensiones reglamentarias de 6,00 metros de ancho interior por 2,00 metros de alto interior. Fabricadas en perfiles de aluminio lacado en blanco con redes de alta tenacidad y anclajes empotrados homologados.'
    },
    'corner-arc': {
      title: 'Arcos de Esquina (Córner)',
      text: 'Radio de 1,00 metro en cada uno de los cuatro vértices del campo, desde donde se efectúan los saques de esquina reglamentarios.'
    },
    'safety-margin': {
      title: 'Franja de Seguridad Exterior (1,5 m mín.)',
      text: 'Obligatoria según la norma técnica NIDE FUT-7 del Consejo Superior de Deportes. Franja perimetral de al menos 1,5 metros libre de cualquier obstáculo rígido (postes, vallas o muros) para evitar lesiones.'
    },
    'touch-line': {
      title: 'Líneas de Banda y de Meta',
      text: 'Líneas de 10 a 12 cm de anchura continua, integradas en césped artificial blanco o trazadas con pintura deportiva inocua de alto contraste.'
    }
  };

  const zones = container.querySelectorAll('.pitch-interactive-zone');
  zones.forEach(zone => {
    zone.addEventListener('mouseenter', () => {
      const zoneKey = zone.getAttribute('data-zone');
      const info = zoneInfoData[zoneKey];
      if (info && infoTitle && infoText) {
        infoTitle.textContent = info.title;
        infoText.textContent = info.text;
      }
    });

    zone.addEventListener('click', () => {
      const zoneKey = zone.getAttribute('data-zone');
      const info = zoneInfoData[zoneKey];
      if (info && infoTitle && infoText) {
        infoTitle.textContent = info.title;
        infoText.textContent = info.text;
      }
    });
  });

  // Initial calculation
  updateMetrics(55, 35);
}
