/**
 * Mapa slide ID → URL del audio.
 *
 * Los archivos MP3 están numerados por POSICIÓN en el array de RevOps
 * (incluyendo headers level-1). Posición 1 = ro-header-1, posición 6 = ro-2-escala, etc.
 * Total de slides RevOps: 54.
 */

// Todos los slides de RevOps en orden exacto del array (level-1 + level-2).
const RO_ALL_SLIDES: string[] = [
  'ro-header-1',       // 1
  'ro-1-portada',      // 2
  'ro-1-definicion',   // 3
  'ro-1-ruta',         // 4
  'ro-header-2',       // 5
  'ro-2-escala',       // 6
  'ro-2-diagnostico',  // 7
  'ro-2-empezar',      // 8
  'ro-2-velocidad',    // 9
  'ro-2-casos',        // 10
  'ro-header-3',       // 11
  'ro-3-flywheel',     // 12
  'ro-3-fuerza',       // 13
  'ro-3-friccion',     // 14
  'ro-3-friccion-util',// 15
  'ro-3-mapa',         // 16
  'ro-header-4',       // 17
  'ro-4-porque',       // 18
  'ro-4-calculadora',  // 19
  'ro-4-valor',        // 20
  'ro-4-contacto',     // 21
  'ro-4-judicial',     // 22
  'ro-4-velocidades',  // 23
  'ro-header-5',       // 24
  'ro-5-paradoja',     // 25
  'ro-5-comprador',    // 26
  'ro-5-filtros',      // 27
  'ro-5-salida',       // 28
  'ro-5-playbook',     // 29
  'ro-5-estados',      // 30
  'ro-header-6',       // 31
  'ro-6-proceso',      // 32
  'ro-6-gobierno',     // 33
  'ro-6-indicadores',  // 34
  'ro-6-stack',        // 35
  'ro-header-7',       // 36
  'ro-7-lenguaje',     // 37
  'ro-7-copq',         // 38
  'ro-7-a3',           // 39
  'ro-7-prewiring',    // 40
  'ro-7-monroe',       // 41
  'ro-7-objeciones',   // 42
  'ro-7-retroceso',    // 43
  'ro-header-8',       // 44
  'ro-8-silos',        // 45
  'ro-8-capas',        // 46
  'ro-header-9',       // 47
  'ro-9-necesidad',    // 48
  'ro-9-cuadrante',    // 49
  'ro-9-entrevista',   // 50
  'ro-header-10',      // 51
  'ro-10-ciclo',       // 52
  'ro-10-metas',       // 53
  'ro-10-diario',      // 54
];

/** Extrae el número de posición del path del archivo. */
function pageFromPath(filePath: string): number | null {
  // Usa el último segmento del path (filename), sin extensión.
  const raw = (filePath.split('/').pop() ?? filePath).replace(/\.(mp3|wav)$/i, '');

  // "Revops 01", "00 - Revops 01 Generated..."
  let m = raw.match(/revops\s+0*(\d+)/i);
  if (m) return parseInt(m[1], 10);

  // "02 - revops Generated...", "03 - revops Generated..."
  m = raw.match(/^0*(\d+)\s*-\s*revops/i);
  if (m) return parseInt(m[1], 10);

  // "pagina 07", "página 6", "Pagina 16"  (con o sin acento, cualquier capitalización)
  m = raw.match(/p[aá]gina\s+0*(\d+)/i);
  if (m) return parseInt(m[1], 10);

  return null;
}

// Carga todos los MP3 como URLs de asset (Vite los hashea en build).
const audioGlob = import.meta.glob<string>(
  '../audios/**/*.{mp3,wav}',
  { query: '?url', import: 'default', eager: true }
);

const map: Record<string, string> = {};

for (const [filePath, url] of Object.entries(audioGlob)) {
  const pos = pageFromPath(filePath);
  if (pos === null) continue;

  const slideId = RO_ALL_SLIDES[pos - 1]; // índice 0-based
  if (!slideId) continue;

  // Si hay dos versiones del mismo número (re-generación), la última gana.
  map[slideId] = url;
}

export const audioBySlide: Record<string, string> = map;
