import React from 'react';
import { motion } from 'motion/react';

/**
 * Kit de escenas 3D (estilo de la clase B2B original).
 *
 * Reglas: sólidos isométricos con caras RELLENAS (sin trazos ni contornos), tres
 * tonos por sólido (arriba claro · izquierda medio · derecha oscuro), sombra
 * suave con feDropShadow, brillo en lo activo y animación: entrada con resorte,
 * flotación suave, pulsos y partículas que viajan en lugar de líneas conectoras.
 *
 * Todos los componentes son elementos SVG: úsalos dentro de un <svg> que incluya
 * <SceneDefs id="..."/> y pasa ese mismo id para filtros y degradados.
 */

export const ORANGE = '#ff851d';
export const PINK = '#ef375c';

export type Faces = { top: string; left: string; right: string };

/* Paletas de caras. `brand` replica el sólido de "Estrategia vs Táctica". */
export const BRAND: Faces = { top: '#ff851d', left: '#ef375c', right: '#c41e3d' };
export const PEACH: Faces = { top: '#ffd2a8', left: '#ffae73', right: '#f0875a' };
export const SLATE = (isDark: boolean): Faces =>
  isDark ? { top: '#64748b', left: '#475569', right: '#334155' } : { top: '#94a3b8', left: '#64748b', right: '#475569' };
export const NEUTRAL = (isDark: boolean): Faces =>
  isDark ? { top: '#4b5563', left: '#374151', right: '#1f2937' } : { top: '#e5e7eb', left: '#9ca3af', right: '#6b7280' };

/* Colores de apoyo para textos y suelos dentro de las escenas. */
export const sceneTone = (isDark: boolean) => ({
  text: isDark ? '#e5e7eb' : '#1f2937',
  muted: isDark ? '#9ca3af' : '#6b7280',
  floor: isDark ? '#2a2a2a' : '#eef1f5',
  floorSide: isDark ? '#1f1f1f' : '#d9dee6',
});

/* Filtros y degradados de una escena. */
export function SceneDefs({ id, isDark }: { id: string; isDark: boolean }) {
  return (
    <defs>
      <filter id={`${id}-sh`} x="-40%" y="-40%" width="180%" height="190%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" floodOpacity={isDark ? 0.55 : 0.22} />
      </filter>
      <filter id={`${id}-gl`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <radialGradient id={`${id}-orb`} cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#ffd0a0" />
        <stop offset="45%" stopColor={ORANGE} />
        <stop offset="100%" stopColor={PINK} />
      </radialGradient>
      <radialGradient id={`${id}-orbn`} cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor={isDark ? '#6b7280' : '#ffffff'} />
        <stop offset="55%" stopColor={isDark ? '#4b5563' : '#e5e7eb'} />
        <stop offset="100%" stopColor={isDark ? '#262626' : '#9ca3af'} />
      </radialGradient>
      <radialGradient id={`${id}-head`} cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffe9d6" />
        <stop offset="60%" stopColor="#f7c4a0" />
        <stop offset="100%" stopColor="#e29b72" />
      </radialGradient>
      <linearGradient id={`${id}-brand`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={ORANGE} />
        <stop offset="100%" stopColor={PINK} />
      </linearGradient>
      <linearGradient id={`${id}-brandv`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={ORANGE} />
        <stop offset="100%" stopColor={PINK} />
      </linearGradient>
    </defs>
  );
}

/* Caja isométrica: (cx, cy) es el centro de la cara superior; s = medio ancho; h = alto. */
export function IsoBox({ cx, cy, s, h, f }: { cx: number; cy: number; s: number; h: number; f: Faces }) {
  return (
    <g>
      <polygon points={`${cx - s},${cy} ${cx},${cy + s / 2} ${cx},${cy + s / 2 + h} ${cx - s},${cy + h}`} fill={f.left} />
      <polygon points={`${cx},${cy + s / 2} ${cx + s},${cy} ${cx + s},${cy + h} ${cx},${cy + s / 2 + h}`} fill={f.right} />
      <polygon points={`${cx},${cy - s / 2} ${cx + s},${cy} ${cx},${cy + s / 2} ${cx - s},${cy}`} fill={f.top} />
    </g>
  );
}

/* Tronco de pirámide: cara superior de medio ancho s1 en y1, base de medio ancho s2 en y2. */
export function IsoFrustum({ cx, y1, s1, y2, s2, f, showTop = true }: { cx: number; y1: number; s1: number; y2: number; s2: number; f: Faces; showTop?: boolean }) {
  return (
    <g>
      <polygon points={`${cx - s1},${y1} ${cx},${y1 + s1 / 2} ${cx},${y2 + s2 / 2} ${cx - s2},${y2}`} fill={f.left} />
      <polygon points={`${cx},${y1 + s1 / 2} ${cx + s1},${y1} ${cx + s2},${y2} ${cx},${y2 + s2 / 2}`} fill={f.right} />
      {showTop && <polygon points={`${cx},${y1 - s1 / 2} ${cx + s1},${y1} ${cx},${y1 + s1 / 2} ${cx - s1},${y1}`} fill={f.top} />}
    </g>
  );
}

/* Pirámide de base cuadrada: vértice en (cx, apex), base de medio ancho s en y. */
export function IsoPyramid({ cx, apex, y, s, f }: { cx: number; apex: number; y: number; s: number; f: Faces }) {
  return (
    <g>
      <polygon points={`${cx},${apex} ${cx - s},${y} ${cx},${y + s / 2}`} fill={f.left} />
      <polygon points={`${cx},${apex} ${cx},${y + s / 2} ${cx + s},${y}`} fill={f.right} />
    </g>
  );
}

/* Rombo de suelo (sin espesor). */
export function IsoFloor({ cx, cy, s, fill, opacity = 1 }: { cx: number; cy: number; s: number; fill: string; opacity?: number }) {
  return <polygon points={`${cx},${cy - s / 2} ${cx + s},${cy} ${cx},${cy + s / 2} ${cx - s},${cy}`} fill={fill} opacity={opacity} />;
}

/* Cilindro / plataforma circular: elipse superior en (cx, cy), espesor h. */
export function Cylinder({ cx, cy, rx, ry, h, top, side }: { cx: number; cy: number; rx: number; ry: number; h: number; top: string; side: string }) {
  return (
    <g>
      <path d={`M ${cx - rx} ${cy} L ${cx - rx} ${cy + h} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h} L ${cx + rx} ${cy} Z`} fill={side} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={top} />
    </g>
  );
}

/* Esfera con brillo (marca o neutra). */
export function Orb({ id, cx, cy, r, neutral = false }: { id: string; cx: number; cy: number; r: number; neutral?: boolean }) {
  return <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-${neutral ? 'orbn' : 'orb'})`} filter={`url(#${id}-sh)`} />;
}

/* Flotación suave e infinita. */
export function Float({ children, amp = 5, dur = 3.6, delay = 0 }: { children: React.ReactNode; amp?: number; dur?: number; delay?: number }) {
  return (
    <motion.g animate={{ y: [0, -amp, 0] }} transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}>
      {children}
    </motion.g>
  );
}

/* Elemento seleccionable: se eleva cuando está activo y se atenúa si otro lo está. */
export function Lift({ on, dimmed, children, onClick, lift = 10 }: { on: boolean; dimmed: boolean; children: React.ReactNode; onClick?: () => void; lift?: number }) {
  return (
    <motion.g
      animate={{ y: on ? -lift : 0, opacity: dimmed ? 0.4 : 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 16 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {children}
    </motion.g>
  );
}

/* Partícula brillante que viaja por una serie de puntos (sustituye a las líneas). */
export function Traveler({ id, path, dur = 2, delay = 0, repeatDelay = 0, r = 4, color = ORANGE }: { id: string; path: [number, number][]; dur?: number; delay?: number; repeatDelay?: number; r?: number; color?: string }) {
  return (
    <motion.circle
      r={r}
      fill={color}
      filter={`url(#${id}-gl)`}
      initial={{ cx: path[0][0], cy: path[0][1], opacity: 0 }}
      animate={{ cx: path.map((p) => p[0]), cy: path.map((p) => p[1]), opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay, ease: 'easeInOut' }}
    />
  );
}

/* Pulso: disco relleno que se expande y desvanece (sin anillos de trazo). */
export function PulseDisc({ cx, cy, rx, ry, color = ORANGE, dur = 2.4, delay = 0, peak = 0.35 }: { cx: number; cy: number; rx: number; ry: number; color?: string; dur?: number; delay?: number; peak?: number }) {
  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      fill={color}
      initial={{ rx: 0, ry: 0, opacity: peak }}
      animate={{ rx: [0, rx], ry: [0, ry], opacity: [peak, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

/* Punto intermedio "en arco" para que una partícula salte entre dos lugares. */
export const hop = (a: [number, number], b: [number, number], lift = 40): [number, number][] => [a, [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - lift], b];

/* ------------------------------------------------------------------ */
/* Persona 3D: figura humana de sólidos rellenos (sin contornos).       */
/* (cx, cy) es el centro de los pies; s escala toda la figura.         */
/* ------------------------------------------------------------------ */

export type Accessory = 'compass' | 'megaphone' | 'headset' | 'tie' | 'heart' | 'gear' | 'star';

const starPoints = (x: number, y: number, n: number, ro: number, ri: number) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI / n) * i - Math.PI / 2;
    const r = i % 2 === 0 ? ro : ri;
    return `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');

export function Persona({ id, cx, cy, s = 1, body, accessory, hair = '#3b2a20', accent = '#ffffff' }: { id: string; cx: number; cy: number; s?: number; body: Faces; accessory?: Accessory; hair?: string; accent?: string }) {
  const w = 19 * s;
  const bh = 50 * s;
  const r = 14 * s;
  const hy = cy - bh - 11 * s;
  const ch = cy - bh * 0.5;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2 * s} rx={25 * s} ry={7 * s} fill="#000" opacity={0.2} />
      <path d={`M ${cx} ${cy} L ${cx - w} ${cy} L ${cx - w} ${cy - bh + w * 0.9} A ${w} ${w * 0.9} 0 0 1 ${cx} ${cy - bh} Z`} fill={body.left} />
      <path d={`M ${cx} ${cy} L ${cx + w} ${cy} L ${cx + w} ${cy - bh + w * 0.9} A ${w} ${w * 0.9} 0 0 0 ${cx} ${cy - bh} Z`} fill={body.right} />
      <ellipse cx={cx} cy={cy - bh + 2 * s} rx={w * 0.8} ry={w * 0.32} fill={body.top} />
      <ellipse cx={cx} cy={cy - bh + 1 * s} rx={5 * s} ry={3 * s} fill="#e29b72" />
      <circle cx={cx} cy={hy} r={r} fill={`url(#${id}-head)`} />
      <path d={`M ${cx - r - 0.6 * s} ${hy + 1 * s} A ${r + 0.6 * s} ${r + 0.6 * s} 0 0 1 ${cx + r + 0.6 * s} ${hy + 1 * s} Q ${cx} ${hy - r * 0.45} ${cx - r - 0.6 * s} ${hy + 1 * s} Z`} fill={hair} />
      <circle cx={cx - 4.5 * s} cy={hy + 3 * s} r={1.5 * s} fill="#5b3a29" opacity={0.75} />
      <circle cx={cx + 4.5 * s} cy={hy + 3 * s} r={1.5 * s} fill="#5b3a29" opacity={0.75} />

      {accessory === 'headset' && (
        <g>
          <path d={`M ${cx - r - 2.5 * s} ${hy + 2 * s} A ${r + 2.5 * s} ${r + 2.5 * s} 0 0 1 ${cx + r + 2.5 * s} ${hy + 2 * s} L ${cx + r + 0.5 * s} ${hy + 2 * s} A ${r + 0.5 * s} ${r + 0.5 * s} 0 0 0 ${cx - r - 0.5 * s} ${hy + 2 * s} Z`} fill="#374151" />
          <ellipse cx={cx - r - 1.5 * s} cy={hy + 5 * s} rx={3.6 * s} ry={6 * s} fill={ORANGE} />
          <ellipse cx={cx + r + 1.5 * s} cy={hy + 5 * s} rx={3.6 * s} ry={6 * s} fill={ORANGE} />
          <circle cx={cx + r - 3 * s} cy={hy + 14 * s} r={2.6 * s} fill="#374151" />
        </g>
      )}
      {accessory === 'compass' && (
        <g>
          <circle cx={cx} cy={ch} r={9 * s} fill={accent} opacity={0.95} />
          <polygon points={`${cx},${ch - 7 * s} ${cx + 3.2 * s},${ch} ${cx},${ch + 7 * s} ${cx - 3.2 * s},${ch}`} fill={PINK} />
        </g>
      )}
      {accessory === 'megaphone' && (
        <g>
          <polygon points={`${cx - 9 * s},${ch - 4 * s} ${cx + 10 * s},${ch - 12 * s} ${cx + 10 * s},${ch + 12 * s} ${cx - 9 * s},${ch + 4 * s}`} fill={accent} opacity={0.95} />
          <rect x={cx - 14 * s} y={ch - 4.5 * s} width={6 * s} height={9 * s} rx={2 * s} fill={accent} opacity={0.8} />
        </g>
      )}
      {accessory === 'tie' && (
        <g>
          <polygon points={`${cx - 4 * s},${cy - bh + 4 * s} ${cx + 4 * s},${cy - bh + 4 * s} ${cx + 2.5 * s},${cy - bh + 11 * s} ${cx - 2.5 * s},${cy - bh + 11 * s}`} fill={accent} opacity={0.95} />
          <polygon points={`${cx - 2.8 * s},${cy - bh + 11 * s} ${cx + 2.8 * s},${cy - bh + 11 * s} ${cx + 5 * s},${cy - bh + 31 * s} ${cx},${cy - bh + 37 * s} ${cx - 5 * s},${cy - bh + 31 * s}`} fill={accent} opacity={0.95} />
        </g>
      )}
      {accessory === 'heart' && (
        <path d={`M ${cx} ${ch + 9 * s} C ${cx - 16 * s} ${ch - 2 * s}, ${cx - 6 * s} ${ch - 14 * s}, ${cx} ${ch - 5 * s} C ${cx + 6 * s} ${ch - 14 * s}, ${cx + 16 * s} ${ch - 2 * s}, ${cx} ${ch + 9 * s} Z`} fill={accent} opacity={0.95} />
      )}
      {accessory === 'gear' && (
        <g>
          <polygon points={starPoints(cx, ch, 8, 10 * s, 7 * s)} fill={accent} opacity={0.95} />
          <circle cx={cx} cy={ch} r={3.4 * s} fill={body.left} />
        </g>
      )}
      {accessory === 'star' && (
        <g>
          <polygon points={starPoints(cx, ch, 5, 11 * s, 4.6 * s)} fill="#fde68a" />
          <polygon points={starPoints(cx, hy - r - 11 * s, 5, 6 * s, 2.6 * s)} fill="#fde68a" />
        </g>
      )}
    </g>
  );
}
