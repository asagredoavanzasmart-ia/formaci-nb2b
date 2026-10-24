import React from 'react';
import { Easing, interpolate } from 'remotion';

export const NARANJA = '#ff851d', ROSA = '#ef375c', ROJO = '#f34551', VERDE = '#10b981';

export type PropsEscena = { isDark: boolean };

/* Colores de apoyo según el tema de la clase. */
export const tono = (isDark: boolean) => ({
  panel: isDark ? '#242424' : '#ffffff',
  panel2: isDark ? '#2e2e2e' : '#f1f2f4',
  texto: isDark ? '#e8e8e8' : '#374151',
  tenue: isDark ? '#aaaaaa' : '#6b7280',
  apagado: isDark ? '#5a5a5a' : '#c7cbd1',
  blanco: isDark ? '#f1ece6' : '#ffffff',
  sombra: isDark ? 0.55 : 0.18,
});

/* Interpolación acotada por segundos. */
export const ac = (t: number, a: number, b: number, de = 0, a2 = 1, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [de, a2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

/* Entrada con rebote (0 → 1) que arranca en t0. */
export const pop = (t: number, t0: number, dur = 0.55) => ac(t, t0, t0 + dur, 0, 1, Easing.out(Easing.back(1.7)));

/* Visibilidad de un acto: aparece en a y se va en b. */
export const acto = (t: number, a: number, b: number) => ac(t, a - 0.15, a + 0.45) * (1 - ac(t, b - 0.4, b));

export const sombra = (s: number, y = 10, b = 20) => ({ filter: `drop-shadow(0 ${y}px ${b}px rgba(0,0,0,${s}))` });

export const Gradientes: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-marca`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={NARANJA} /><stop offset="1" stopColor={ROSA} /></linearGradient>
    <linearGradient id={`${id}-marcaH`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={NARANJA} /><stop offset="1" stopColor={ROSA} /></linearGradient>
    <linearGradient id={`${id}-pizarra`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#94a3b8" /><stop offset="1" stopColor="#475569" /></linearGradient>
    <radialGradient id={`${id}-cara`} cx="0.35" cy="0.3" r="0.8"><stop offset="0" stopColor="#ffe9d6" /><stop offset="0.6" stopColor="#f7c4a0" /><stop offset="1" stopColor="#e29b72" /></radialGradient>
    <radialGradient id={`${id}-halo`}><stop offset="0" stopColor={NARANJA} stopOpacity="0.4" /><stop offset="1" stopColor={ROSA} stopOpacity="0" /></radialGradient>
  </defs>
);

/* Persona de sólidos rellenos apoyada en (x, y). `ojos` 0 = cerrados, 1 = abiertos. */
export const Persona: React.FC<{ id: string; x: number; y: number; s?: number; cuerpo?: string; pelo?: string; ojos?: number; corbata?: boolean }> = ({ id, x, y, s = 1, cuerpo, pelo = '#2b1a12', ojos = 1, corbata = false }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={2} rx={52} ry={13} fill="#000" opacity={0.25} />
    <path d="M -40 0 L -40 -72 Q -40 -108 0 -108 Q 40 -108 40 -72 L 40 0 Z" fill={cuerpo ?? `url(#${id}-marca)`} />
    <path d="M 0 -108 Q 40 -108 40 -72 L 40 0 L 0 0 Z" fill="#000" opacity={0.14} />
    <circle cx={0} cy={-134} r={31} fill={`url(#${id}-cara)`} />
    <path d="M -32 -138 Q -31 -173 0 -171 Q 31 -173 32 -138 Q 18 -154 0 -152 Q -18 -154 -32 -138 Z" fill={pelo} />
    {ojos > 0.15
      ? <><ellipse cx={-11} cy={-131} rx={3.6} ry={3.6 * ojos} fill="#3b2a20" /><ellipse cx={11} cy={-131} rx={3.6} ry={3.6 * ojos} fill="#3b2a20" /></>
      : <path d="M -16 -131 q 5 3 10 0 M 6 -131 q 5 3 10 0" stroke="#3b2a20" strokeWidth={2.5} fill="none" strokeLinecap="round" />}
    {corbata && <path d="M -7 -104 L 7 -104 L 10 -62 L 0 -50 L -10 -62 Z" fill="#fff" opacity={0.92} />}
  </g>
);

/* Texto SVG en Ubuntu/Arimo con los defaults de la guía. */
export const Txt: React.FC<React.SVGProps<SVGTextElement> & { f?: 'u' | 'a'; peso?: number }> = ({ f = 'u', peso = 700, children, ...p }) => (
  <text fontFamily={f === 'u' ? 'Ubuntu' : 'Arimo'} fontWeight={peso} {...p}>{children}</text>
);
