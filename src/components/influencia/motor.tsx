import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../remotion/comun';
import type { El, Tono, Camara } from './tipos';

/**
 * Motor de escenas de la clase «Influencia y persuasión».
 * Cada página describe sus elementos (íconos, barras, cifras, frases, flechas) y en qué
 * marca del audio aparecen. `marcas` son segundos desde el inicio de la diapositiva:
 * una por cada frase de la página y, al final, la de la pregunta de reflexión.
 */

export const W = 1200, H = 860;
const ID = 'ip';

type Props = { isDark: boolean; els: El[]; marcas: number[]; pregunta?: string; estatico?: boolean; ancho?: number; alto?: number; camara?: Camara[] };

/* Relleno plano de cada tono y caras (arriba, izquierda, derecha) de los cubos isométricos. */
const relleno = (t: Tono | undefined, isDark: boolean) => ({
  marca: `url(#${ID}-marca)`, naranja: NARANJA, rosa: ROSA, durazno: isDark ? '#8a5436' : '#ffc49a',
  gris: isDark ? '#4a4a4a' : '#c7cbd1', pizarra: '#64748b',
}[t ?? 'marca']);
const caras = (t: Tono | undefined, isDark: boolean) => ({
  marca: ['#ffa25c', '#ff851d', '#e8434f'], naranja: ['#ffb27a', '#ff851d', '#e86f12'], rosa: ['#f7798f', '#ef375c', '#c92a4a'],
  durazno: isDark ? ['#a8694a', '#8a5436', '#6e4129'] : ['#ffe3cc', '#ffc49a', '#f5a77a'],
  gris: isDark ? ['#4b4b4b', '#3a3a3a', '#2e2e2e'] : ['#f3f4f6', '#d6d9de', '#b9bfc8'],
  pizarra: ['#94a3b8', '#64748b', '#475569'],
}[t ?? 'marca']);

/* Corta un texto en líneas de hasta `max` caracteres sin partir palabras. */
export const envolver = (texto: string, max: number) => {
  const out: string[] = [];
  let linea = '';
  for (const p of texto.split(' ')) {
    if (linea && (linea + ' ' + p).length > max) { out.push(linea); linea = p; } else linea = linea ? linea + ' ' + p : p;
  }
  if (linea) out.push(linea);
  return out;
};

/* Íconos rellenos, dibujados en una caja de ±36 alrededor de (0, 0). */
export const Icono: React.FC<{ i: string; c: string; c2?: string }> = ({ i, c, c2 = c }) => {
  if (i.startsWith('#')) return <Txt x={0} y={i.length > 3 ? 14 : 20} textAnchor="middle" fontSize={i.length > 3 ? 40 : 58} fill={c} peso={900}>{i.slice(1)}</Txt>;
  switch (i) {
    case 'corona': return <g fill={c}><path d="M -34 14 L -34 -20 L -17 -3 L 0 -28 L 17 -3 L 34 -20 L 34 14 Z" /><rect x={-34} y={20} width={68} height={10} rx={4} /></g>;
    case 'llama': return <g><path d="M 0 -36 C 16 -18 30 -4 26 14 C 22 34 -22 34 -26 14 C -30 -2 -12 -10 -6 -26 C -2 -12 6 -12 0 -36 Z" fill={c} /><path d="M 0 0 C 8 8 12 14 10 22 C 6 30 -6 30 -10 22 C -12 14 -4 10 0 0 Z" fill={c2} opacity={0.55} /></g>;
    case 'libro': return <g fill={c}><path d="M -36 -24 Q -18 -32 -2 -22 L -2 30 Q -18 20 -36 28 Z" /><path d="M 36 -24 Q 18 -32 2 -22 L 2 30 Q 18 20 36 28 Z" opacity={0.8} /></g>;
    case 'mano': return <g fill={c}><rect x={-20} y={-30} width={9} height={36} rx={4.5} /><rect x={-9} y={-36} width={9} height={42} rx={4.5} /><rect x={2} y={-34} width={9} height={40} rx={4.5} /><rect x={13} y={-26} width={9} height={32} rx={4.5} /><path d="M -22 0 L 22 0 L 22 14 Q 22 34 0 34 Q -22 34 -22 14 Z" /><rect x={-34} y={-6} width={9} height={26} rx={4.5} transform="rotate(-30 -30 6)" /></g>;
    case 'volante': return <g><circle r={30} fill="none" stroke={c} strokeWidth={9} /><circle r={9} fill={c} /><rect x={-30} y={-4} width={60} height={8} rx={4} fill={c} /><rect x={-4} y={0} width={8} height={30} rx={4} fill={c} /></g>;
    case 'balanza': return <g fill={c}><rect x={-3} y={-30} width={6} height={56} rx={3} /><rect x={-20} y={24} width={40} height={8} rx={4} /><rect x={-34} y={-24} width={68} height={6} rx={3} /><path d="M -40 2 L -28 -20 L -16 2 Z" /><path d="M 16 2 L 28 -20 L 40 2 Z" /></g>;
    case 'mapa': return <g><path d="M -36 -24 L -12 -32 L 12 -24 L 36 -32 L 36 24 L 12 32 L -12 24 L -36 32 Z" fill={c} /><path d="M -12 -32 L -12 24 M 12 -24 L 12 32" stroke={c2} strokeWidth={3} opacity={0.5} /></g>;
    case 'telefono': return <g><rect x={-18} y={-34} width={36} height={68} rx={8} fill={c} /><rect x={-12} y={-24} width={24} height={42} rx={3} fill={c2} opacity={0.45} /></g>;
    case 'regalo': return <g fill={c}><rect x={-30} y={-8} width={60} height={38} rx={5} /><rect x={-34} y={-20} width={68} height={14} rx={4} /><path d="M 0 -20 C -10 -38 -28 -30 -16 -20 Z M 0 -20 C 10 -38 28 -30 16 -20 Z" /><rect x={-4} y={-20} width={8} height={50} fill={c2} opacity={0.5} /></g>;
    case 'corazon': return <path d="M 0 30 C -40 4 -36 -30 -16 -30 C -6 -30 0 -22 0 -16 C 0 -22 6 -30 16 -30 C 36 -30 40 4 0 30 Z" fill={c} />;
    case 'personas': return <g fill={c}><circle cx={-20} cy={-12} r={10} /><circle cx={20} cy={-12} r={10} /><path d="M -36 24 Q -36 2 -20 2 Q -4 2 -4 24 Z M 4 24 Q 4 2 20 2 Q 36 2 36 24 Z" opacity={0.75} /><circle cx={0} cy={-20} r={12} /><path d="M -18 30 Q -18 0 0 0 Q 18 0 18 30 Z" /></g>;
    case 'persona': return <g fill={c}><circle cx={0} cy={-16} r={14} /><path d="M -26 32 Q -26 4 0 4 Q 26 4 26 32 Z" /></g>;
    case 'red': return <g><path d="M 0 0 L -26 -20 M 0 0 L 28 -16 M 0 0 L -22 24 M 0 0 L 26 22" stroke={c} strokeWidth={4} /><circle r={11} fill={c} /><circle cx={-26} cy={-20} r={8} fill={c} /><circle cx={28} cy={-16} r={8} fill={c} /><circle cx={-22} cy={24} r={8} fill={c} /><circle cx={26} cy={22} r={8} fill={c} /></g>;
    case 'escudo': return <g><path d="M 0 -34 L 28 -24 L 28 0 Q 28 22 0 34 Q -28 22 -28 0 L -28 -24 Z" fill={c} /><path d="M -12 0 L -3 9 L 13 -9" stroke={c2} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} /></g>;
    case 'engranaje': return <g fill={c}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-6} y={-36} width={12} height={16} rx={3} transform={`rotate(${k * 45})`} />)}<circle r={24} /><circle r={9} fill={c2} opacity={0.45} /></g>;
    case 'lista': return <g fill={c}>{[-20, 0, 20].map((y) => <g key={y}><circle cx={-24} cy={y} r={5} /><rect x={-12} y={y - 4} width={38} height={8} rx={4} /></g>)}</g>;
    case 'firma': return <g><rect x={-30} y={-28} width={52} height={60} rx={6} fill={c} opacity={0.35} /><path d="M -22 14 C -14 -2 -6 22 2 8 C 8 -2 14 16 22 6" stroke={c} strokeWidth={5} fill="none" strokeLinecap="round" /><path d="M 18 -30 L 30 -18 L 8 4 L -2 6 L 0 -4 Z" fill={c} /></g>;
    case 'diploma': return <g><rect x={-34} y={-24} width={68} height={44} rx={5} fill={c} /><rect x={-24} y={-14} width={34} height={5} rx={2.5} fill={c2} opacity={0.5} /><rect x={-24} y={-3} width={26} height={5} rx={2.5} fill={c2} opacity={0.5} /><circle cx={20} cy={12} r={11} fill={c2} opacity={0.6} /><path d="M 14 20 L 12 34 L 20 30 L 28 34 L 26 20 Z" fill={c2} opacity={0.6} /></g>;
    case 'reloj': return <g><path d="M -22 -32 L 22 -32 L 22 -26 L 4 0 L 22 26 L 22 32 L -22 32 L -22 26 L -4 0 L -22 -26 Z" fill={c} /><path d="M -12 24 L 12 24 L 0 8 Z M -10 -22 L 10 -22 L 0 -10 Z" fill={c2} opacity={0.55} /></g>;
    case 'candado': return <g><path d="M -18 -6 L -18 -18 Q -18 -34 0 -34 Q 18 -34 18 -18 L 18 -6" stroke={c} strokeWidth={8} fill="none" /><rect x={-28} y={-8} width={56} height={42} rx={8} fill={c} /><circle cy={10} r={6} fill={c2} opacity={0.5} /></g>;
    case 'megafono': return <g fill={c}><path d="M -30 -10 L -6 -10 L 26 -30 L 26 30 L -6 10 L -30 10 Z" /><rect x={-20} y={10} width={12} height={22} rx={5} /></g>;
    case 'ojo': return <g><path d="M -38 0 Q 0 -36 38 0 Q 0 36 -38 0 Z" fill={c} /><circle r={13} fill={c2} opacity={0.55} /><circle r={6} fill={c} /></g>;
    case 'oido': return <g><path d="M -14 -30 C 16 -40 34 -14 22 8 C 14 22 6 18 4 32 C 2 40 -14 38 -14 28" stroke={c} strokeWidth={9} fill="none" strokeLinecap="round" /><path d="M -2 -10 C 8 -14 14 -4 8 4" stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
    case 'bombilla': return <g fill={c}><path d="M 0 -36 C 22 -36 30 -16 22 -2 C 16 8 12 12 12 20 L -12 20 C -12 12 -16 8 -22 -2 C -30 -16 -22 -36 0 -36 Z" /><rect x={-11} y={24} width={22} height={6} rx={3} /><rect x={-8} y={32} width={16} height={5} rx={2.5} /></g>;
    case 'cheque': return <g><rect x={-38} y={-22} width={76} height={44} rx={6} fill={c} /><rect x={-28} y={-12} width={30} height={5} rx={2.5} fill={c2} opacity={0.5} /><rect x={-28} y={6} width={44} height={5} rx={2.5} fill={c2} opacity={0.5} /><path d="M 12 -14 L 30 4 M 30 -14 L 12 4" stroke={c2} strokeWidth={5} strokeLinecap="round" opacity={0.75} /></g>;
    case 'montana': return <g><path d="M -38 30 L -8 -18 L 6 4 L 16 -10 L 38 30 Z" fill={c} /><rect x={-9} y={-38} width={3} height={22} fill={c} /><path d="M -6 -38 L 10 -32 L -6 -26 Z" fill={c} /></g>;
    case 'mascara': return <g><path d="M -30 -28 Q 0 -36 30 -28 Q 32 10 0 32 Q -32 10 -30 -28 Z" fill={c} /><ellipse cx={-12} cy={-8} rx={7} ry={5} fill={c2} opacity={0.55} /><ellipse cx={12} cy={-8} rx={7} ry={5} fill={c2} opacity={0.55} /><path d="M -12 12 Q 0 22 12 12" stroke={c2} strokeWidth={4} fill="none" opacity={0.55} /></g>;
    case 'vinetas': return <g fill={c}><rect x={-36} y={-30} width={32} height={26} rx={5} /><rect x={4} y={-30} width={32} height={26} rx={5} opacity={0.75} /><rect x={-36} y={4} width={32} height={26} rx={5} opacity={0.75} /><rect x={4} y={4} width={32} height={26} rx={5} /></g>;
    case 'curva': return <g><path d="M -36 26 L -36 -30 M -36 26 L 36 26" stroke={c} strokeWidth={4} /><path d="M -30 14 Q -18 14 -12 2 Q -4 -16 6 -10 Q 14 -6 18 -22 L 30 -28" stroke={c} strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
    case 'dinero': return <g><ellipse cx={0} cy={20} rx={30} ry={9} fill={c} /><ellipse cx={0} cy={8} rx={30} ry={9} fill={c} opacity={0.85} /><ellipse cx={0} cy={-4} rx={30} ry={9} fill={c} /><ellipse cx={0} cy={-16} rx={30} ry={9} fill={c} opacity={0.85} /></g>;
    case 'posit': return <g><path d="M -32 -32 L 32 -32 L 32 14 L 14 32 L -32 32 Z" fill="#ffd84d" /><path d="M 32 14 L 14 14 L 14 32 Z" fill="#e8b923" /><path d="M -20 -14 L 18 -14 M -20 0 L 10 0" stroke="#8a6d10" strokeWidth={4} strokeLinecap="round" /></g>;
    case 'encuesta': return <g><rect x={-26} y={-34} width={52} height={68} rx={6} fill={c} />{[-18, -4, 10].map((y) => <g key={y}><rect x={-18} y={y} width={8} height={8} rx={2} fill={c2} opacity={0.55} /><rect x={-4} y={y + 2} width={24} height={4} rx={2} fill={c2} opacity={0.55} /></g>)}</g>;
    case 'cerebro': return <g><path d="M -2 -32 C -22 -36 -36 -22 -32 -8 C -40 4 -32 22 -16 22 C -12 32 -2 32 -2 26 Z" fill={c} /><path d="M 2 -32 C 22 -36 36 -22 32 -8 C 40 4 32 22 16 22 C 12 32 2 32 2 26 Z" fill={c} opacity={0.8} /></g>;
    case 'cartas': return <g><rect x={-30} y={-30} width={36} height={52} rx={5} fill={c} opacity={0.7} transform="rotate(-14 -12 -4)" /><rect x={-8} y={-28} width={36} height={52} rx={5} fill={c} transform="rotate(10 10 -2)" /><path d="M 12 -6 L 18 4 L 12 14 L 6 4 Z" fill={c2} opacity={0.55} transform="rotate(10 10 -2)" /></g>;
    case 'coche': return <g fill={c}><path d="M -38 12 L -32 -6 Q -28 -14 -18 -16 L -10 -28 L 16 -28 L 26 -14 Q 36 -12 38 0 L 38 12 Z" /><circle cx={-20} cy={16} r={9} fill={c2} opacity={0.6} /><circle cx={22} cy={16} r={9} fill={c2} opacity={0.6} /></g>;
    case 'cajon': return <g><rect x={-36} y={-24} width={72} height={52} rx={6} fill={c} /><rect x={-30} y={-18} width={60} height={22} rx={4} fill={c2} opacity={0.4} /><rect x={-10} y={12} width={20} height={6} rx={3} fill={c2} opacity={0.6} /></g>;
    case 'cara': return <g><circle r={32} fill={c} /><circle cx={-11} cy={-6} r={4.5} fill={c2} opacity={0.65} /><circle cx={11} cy={-6} r={4.5} fill={c2} opacity={0.65} /><path d="M -14 10 Q 0 22 14 10" stroke={c2} strokeWidth={4.5} fill="none" strokeLinecap="round" opacity={0.65} /></g>;
    case 'puno': return <g fill={c}><rect x={-22} y={-24} width={44} height={34} rx={10} /><rect x={-22} y={-24} width={11} height={34} rx={5.5} opacity={0.7} /><rect x={-11} y={-24} width={11} height={34} rx={5.5} opacity={0.85} /><rect x={-16} y={8} width={32} height={26} rx={6} /><rect x={-30} y={-8} width={12} height={22} rx={6} /></g>;
    case 'video': return <g fill={c}><rect x={-36} y={-20} width={48} height={40} rx={7} /><path d="M 16 -6 L 36 -18 L 36 18 L 16 6 Z" /></g>;
    case 'calendario': return <g><rect x={-32} y={-26} width={64} height={58} rx={7} fill={c} /><rect x={-32} y={-26} width={64} height={14} rx={7} fill={c2} opacity={0.5} />{[-16, 0, 16].map((x) => [4, 18].map((y) => <rect key={`${x}${y}`} x={x - 5} y={y - 5} width={10} height={9} rx={2} fill={c2} opacity={0.5} />))}</g>;
    case 'diana': return <g><circle r={34} fill={c} /><circle r={23} fill={c2} opacity={0.5} /><circle r={12} fill={c} /></g>;
    case 'rayo': return <path d="M 6 -36 L -22 6 L -2 6 L -8 36 L 22 -6 L 2 -6 Z" fill={c} />;
    case 'subir': return <g fill={c}><path d="M 0 -36 L 28 -6 L 10 -6 L 10 32 L -10 32 L -10 -6 L -28 -6 Z" /></g>;
    case 'check': return <path d="M -26 0 L -8 18 L 28 -20" stroke={c} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
    case 'cruz': return <path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke={c} strokeWidth={11} strokeLinecap="round" />;
    case 'relojc': return <g><circle r={32} fill={c} /><path d="M 0 -20 L 0 0 L 14 10" stroke={c2} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} /></g>;
    case 'estrella': return <path d="M 0 -36 L 10 -12 L 36 -10 L 16 8 L 22 34 L 0 20 L -22 34 L -16 8 L -36 -10 L -10 -12 Z" fill={c} />;
    case 'tv': return <g fill={c}><rect x={-38} y={-28} width={76} height={46} rx={6} /><rect x={-31} y={-22} width={62} height={34} rx={3} fill={c2} opacity={0.4} /><rect x={-14} y={22} width={28} height={6} rx={3} /></g>;
    case 'datos': return <g fill={c}><rect x={-30} y={4} width={14} height={28} rx={3} /><rect x={-7} y={-14} width={14} height={46} rx={3} /><rect x={16} y={-32} width={14} height={64} rx={3} /></g>;
    case 'chispa': return <path d="M 0 -36 Q 4 -4 36 0 Q 4 4 0 36 Q -4 4 -36 0 Q -4 -4 0 -36 Z" fill={c} />;
    case 'carta': return <g><rect x={-36} y={-24} width={72} height={48} rx={6} fill={c} /><path d="M -36 -20 L 0 6 L 36 -20" stroke={c2} strokeWidth={5} fill="none" opacity={0.55} /></g>;
    case 'edificio': return <g fill={c}><rect x={-30} y={-30} width={36} height={62} rx={3} /><rect x={10} y={-8} width={22} height={40} rx={3} opacity={0.75} />{[-22, -8].map((x) => [-20, -6, 8].map((y) => <rect key={`${x}${y}`} x={x} y={y} width={8} height={8} rx={1.5} fill={c2} opacity={0.5} />))}</g>;
    case 'hospital': return <g><rect x={-32} y={-30} width={64} height={62} rx={7} fill={c} /><path d="M 0 -18 L 0 14 M -16 -2 L 16 -2" stroke={c2} strokeWidth={9} strokeLinecap="round" opacity={0.6} /></g>;
    case 'casa': return <g fill={c}><path d="M -34 -2 L 0 -32 L 34 -2 Z" /><rect x={-26} y={-4} width={52} height={36} rx={3} /><rect x={-8} y={10} width={16} height={22} rx={2} fill={c2} opacity={0.5} /></g>;
    case 'pasillo': return <g><path d="M -34 32 L -14 -30 L 14 -30 L 34 32 Z" fill={c} opacity={0.4} /><rect x={-8} y={-26} width={16} height={22} rx={3} fill={c} /><path d="M -24 4 L -20 4 M 20 4 L 24 4" stroke={c} strokeWidth={4} /></g>;
    case 'bici': return <g><circle cx={-20} cy={12} r={14} fill="none" stroke={c} strokeWidth={5} /><circle cx={20} cy={12} r={14} fill="none" stroke={c} strokeWidth={5} /><path d="M -20 12 L -6 -12 L 12 -12 L 20 12 M -6 -12 L 2 12 L 12 -12 M -10 -20 L 0 -20" stroke={c} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>;
    case 'cohete': return <g><path d="M 0 -38 C 14 -26 16 -6 12 14 L -12 14 C -16 -6 -14 -26 0 -38 Z" fill={c} /><circle cy={-12} r={6} fill={c2} opacity={0.6} /><path d="M -12 2 L -24 20 L -12 18 Z M 12 2 L 24 20 L 12 18 Z" fill={c} /><path d="M -7 18 L 0 36 L 7 18 Z" fill={c2} opacity={0.7} /></g>;
    default: return <circle r={20} fill={c} />;
  }
};

/* Visibilidad de un elemento: entra con su marca, se atenúa o sale con las marcas indicadas. */
const estado = (el: El, t: number, tm: (a?: number) => number, estatico: boolean) => {
  if (estatico) return { v: el.hasta != null ? 0 : 1, op: 1 };
  const t0 = tm(el.a) + (el.d ?? 0);
  const entra = el.a == null && !el.d ? 1 : pop(t, t0);
  const sale = el.hasta != null ? 1 - ac(t, tm(el.hasta) - 0.45, tm(el.hasta)) : 1;
  const apaga = el.tenue != null ? 1 - 0.68 * ac(t, tm(el.tenue), tm(el.tenue) + 0.5) : 1;
  return { v: Math.max(0, entra) * sale, op: apaga };
};

export const EscenaIP: React.FC<Props> = ({ isDark, els, marcas, pregunta, estatico = false, ancho = W, alto = H, camara = [] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const c = tono(isDark);
  const tm = (a?: number) => (a == null ? 0 : marcas[a] ?? 1e6);
  // Marca vigente: el elemento que entra con ella respira un poco para guiar la mirada.
  let actual = -1;
  marcas.forEach((m, k) => { if (t >= m) actual = k; });
  const tPregunta = pregunta && marcas.length ? marcas[marcas.length - 1] : 1e6;
  const fondo = estatico ? 1 : 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);
  const vigente = (el: El) => !estatico && el.a != null && el.a === actual && actual < marcas.length - 1;
  const respira = 1 + 0.035 * Math.sin(t * 3.2);

  // Cámara: con cada frase indicada se acerca a una zona; en la pregunta vuelve a la vista completa.
  let cam = { x: ancho / 2, y: alto / 2, z: 1 };
  if (!estatico) {
    const claves = [...camara, ...(pregunta ? [{ a: marcas.length - 1, x: ancho / 2, y: alto / 2, z: 1 }] : [])];
    for (const kf of claves) {
      const T = tm(kf.a) + (kf.d ?? 0);
      if (t < T) break;
      const u = ac(t, T, T + 1.1);
      cam = { x: cam.x + (kf.x - cam.x) * u, y: cam.y + (kf.y - cam.y) * u, z: cam.z + (kf.z - cam.z) * u };
    }
  }

  // Un elemento «en foco» crece un poco y brilla mientras suena la frase que lo nombra; `flota` lo mece sin parar.
  const dibujar = (el: El, k: number) => {
    let n = pieza(el, k);
    if (!n) return n;
    if (el.flota && !estatico) n = <g key={k} transform={`translate(0 ${Math.sin(t * 2.2 + k) * el.flota})`}>{n}</g>;
    if (!el.foco || estatico || !el.foco.includes(actual)) return n;
    const f = ac(t, tm(actual), tm(actual) + 0.45);
    const [cx, cy] = 'cx' in el ? [el.cx, el.cy] : 'x' in el ? [el.x, el.y] : [ancho / 2, alto / 2];
    return (
      <g key={k} transform={`translate(${cx} ${cy}) scale(${1 + 0.07 * f}) translate(${-cx} ${-cy})`} style={{ filter: `drop-shadow(0 0 ${18 * f}px rgba(255,133,29,${0.55 * f}))` }}>{n}</g>
    );
  };

  const pieza = (el: El, k: number) => {
    const { v, op } = estado(el, t, tm, estatico);
    if (v <= 0.001) return null;
    const vg = vigente(el);
    switch (el.k) {
      case 'icono': {
        const s = el.s ?? 1, r = 58 * s;
        const marca = !el.gris;
        const esc = (0.6 + 0.4 * v) * (vg ? respira : 1);
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            <g transform={`translate(${el.x} ${el.y}) scale(${esc})`}>
              {vg && <circle r={r + 16} fill={`url(#${ID}-halo)`} />}
              <circle r={r} fill={marca ? `url(#${ID}-marca)` : c.panel2} style={sombra(c.sombra, 8, 18)} />
              <g transform={`scale(${s * 0.95})`}><Icono i={el.i} c={marca ? '#ffffff' : c.tenue} c2={marca ? ROSA : c.panel} /></g>
            </g>
            {el.etiqueta && envolver(el.etiqueta, el.ancho ?? 16).map((l, j) => (
              <Txt key={j} x={el.x} y={el.y + r + 38 + j * 32} textAnchor="middle" fontSize={27} fill={c.texto}>{l}</Txt>
            ))}
            {el.sub && envolver(el.sub, el.ancho ?? 20).map((l, j, arr) => (
              <Txt key={`s${j}`} f="a" x={el.x} y={el.y + r + 38 + (el.etiqueta ? envolver(el.etiqueta, el.ancho ?? 16).length * 32 : 0) + j * 28 + (arr.length ? 0 : 0)} textAnchor="middle" fontSize={22} fill={c.tenue} peso={400}>{l}</Txt>
            ))}
          </g>
        );
      }
      case 'chip': {
        const w = el.w ?? el.t.length * 14.5 + 56, h = 58;
        const x0 = el.ancla === 'start' ? el.x : el.x - w / 2;
        return (
          <g key={k} opacity={Math.min(1, v) * op} transform={`translate(0 ${(1 - Math.min(1, v)) * 14})`}>
            <rect x={x0} y={el.y - h / 2} width={w} height={h} rx={29} fill={el.marca ? `url(#${ID}-marcaH)` : c.panel} style={sombra(c.sombra, 6, 14)} />
            <Txt x={x0 + w / 2} y={el.y + 9} textAnchor="middle" fontSize={25} fill={el.marca ? '#ffffff' : c.texto}>{el.t}</Txt>
          </g>
        );
      }
      case 'texto': {
        const tam = el.tam ?? 30;
        const color = el.tono === 'marca' ? `url(#${ID}-marcaH)` : el.tono === 'tenue' ? c.tenue : c.texto;
        // Con `escribe`, el texto aparece letra por letra.
        const visibles = el.escribe && !estatico ? Math.floor(el.t.length * ac(t, tm(el.a) + (el.d ?? 0), tm(el.a) + (el.d ?? 0) + el.t.length * 0.04, 0, 1, Easing.linear)) : el.t.length;
        const lineas = envolver(el.t.slice(0, visibles), el.ancho ?? 40);
        return (
          <g key={k} opacity={Math.min(1, v) * op} transform={`translate(0 ${(1 - Math.min(1, v)) * 12})`}>
            {lineas.map((l, j) => (
              <Txt key={j} f={el.tono === 'tenue' ? 'a' : 'u'} x={el.x} y={el.y + j * tam * 1.3} textAnchor={el.ancla ?? 'middle'} fontSize={tam} fill={color} peso={el.peso ?? (el.tono === 'tenue' ? 400 : 700)}>{l}</Txt>
            ))}
          </g>
        );
      }
      case 'barra': {
        const w = el.w ?? 150, hmax = el.h ?? 380, max = el.max ?? 100;
        const crece = estatico ? 1 : ac(t, tm(el.a) + (el.d ?? 0), tm(el.a) + (el.d ?? 0) + 1.2, 0, 1, Easing.out(Easing.cubic));
        const h = (hmax * el.valor * crece) / max;
        const valor = Math.round(el.valor * crece);
        const lineas = envolver(el.etiqueta, el.ancho ?? 14);
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            <rect x={el.x - w / 2} y={el.y - hmax} width={w} height={hmax} rx={20} fill={c.panel2} opacity={0.6} />
            <rect x={el.x - w / 2} y={el.y - h} width={w} height={h} rx={20} fill={el.gris ? c.apagado : `url(#${ID}-marca)`} style={vg ? { filter: 'brightness(1.08)' } : undefined} />
            <Txt x={el.x} y={el.y - h - 22} textAnchor="middle" fontSize={50} fill={el.gris ? c.tenue : c.texto} peso={900}>{el.texto ?? `${valor}${el.sufijo ?? '%'}`}</Txt>
            {lineas.map((l, j) => <Txt key={j} f="a" x={el.x} y={el.y + 40 + j * 29} textAnchor="middle" fontSize={23} fill={c.tenue} peso={400}>{l}</Txt>)}
          </g>
        );
      }
      case 'flecha': {
        const dibuja = estatico ? 1 : ac(t, tm(el.a) + (el.d ?? 0), tm(el.a) + (el.d ?? 0) + 0.8);
        const mx = (el.x1 + el.x2) / 2, my = (el.y1 + el.y2) / 2 - (el.curva ?? 0);
        const largo = Math.hypot(el.x2 - el.x1, el.y2 - el.y1) * (1 + Math.abs(el.curva ?? 0) / 400);
        const ang = Math.atan2(el.y2 - my, el.x2 - mx) * 180 / Math.PI;
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            <path d={`M ${el.x1} ${el.y1} Q ${mx} ${my} ${el.x2} ${el.y2}`} fill="none" stroke={NARANJA} strokeWidth={6} strokeLinecap="round" strokeDasharray={largo} strokeDashoffset={largo * (1 - dibuja)} />
            {dibuja > 0.95 && <path d="M -18 -11 L 0 0 L -18 11" transform={`translate(${el.x2} ${el.y2}) rotate(${ang})`} stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        );
      }
      case 'persona':
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            <g transform={`translate(0 ${(1 - Math.min(1, v)) * 30})`}>
              <Persona id={ID} x={el.x} y={el.y} s={el.s ?? 1} cuerpo={el.gris ? (isDark ? '#4b5563' : '#94a3b8') : undefined} pelo={el.pelo} />
            </g>
          </g>
        );
      case 'tarjeta': {
        const lineas = el.t ? envolver(el.t, el.ancho ?? Math.floor((el.w - (el.i ? 120 : 48)) / 12.2)) : [];
        const tx = el.x + (el.i ? 112 : 30);
        return (
          <g key={k} opacity={Math.min(1, v) * op} transform={`translate(0 ${(1 - Math.min(1, v)) * 16})`}>
            <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={28} fill={el.marca ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra, 10, 22)} />
            {el.i && <g transform={`translate(${el.x + 58} ${el.y + el.h / 2}) scale(0.85)`}><Icono i={el.i} c={el.marca ? '#ffffff' : NARANJA} c2={el.marca ? ROSA : c.panel} /></g>}
            <Txt x={tx} y={el.y + (lineas.length ? 48 : el.h / 2 + 10)} fontSize={28} fill={el.marca ? '#ffffff' : c.texto}>{el.titulo}</Txt>
            {lineas.map((l, j) => <Txt key={j} f="a" x={tx} y={el.y + 86 + j * 30} fontSize={22} fill={el.marca ? '#ffffff' : c.tenue} peso={400} opacity={el.marca ? 0.92 : 1}>{l}</Txt>)}
          </g>
        );
      }
      case 'numero': {
        const cuenta = estatico ? 1 : ac(t, tm(el.a) + (el.d ?? 0), tm(el.a) + (el.d ?? 0) + 1.3, 0, 1, Easing.out(Easing.cubic));
        const n = el.valor * cuenta;
        const txt = Number.isInteger(el.valor) ? String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : n.toFixed(1).replace('.', ',');
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            <Txt x={el.x} y={el.y} textAnchor="middle" fontSize={el.tam ?? 110} fill={`url(#${ID}-marcaH)`} peso={900}>{el.prefijo ?? ''}{txt}{el.sufijo ?? ''}</Txt>
            {el.etiqueta && envolver(el.etiqueta, el.ancho ?? 22).map((l, j) => <Txt key={j} f="a" x={el.x} y={el.y + 46 + j * 30} textAnchor="middle" fontSize={24} fill={c.tenue} peso={400}>{l}</Txt>)}
          </g>
        );
      }
      case 'anillo':
        return <circle key={k} cx={el.x} cy={el.y} r={el.r} fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="10 12" opacity={Math.min(1, v) * op} />;
      case 'cubo': {
        const t0 = tm(el.a) + (el.d ?? 0);
        const h = el.crece && !estatico ? el.h * ac(t, t0, t0 + 1.1, 0, 1, Easing.out(Easing.cubic)) : el.h;
        const caida = el.cae && !estatico ? (1 - Math.min(1, v)) * -260 : 0;
        const [arr, izq, der] = caras(el.tono, isDark);
        const { x, y, s } = el;
        const top = y - h;
        const lineas = el.etiqueta ? envolver(el.etiqueta, el.ancho ?? 16) : [];
        const flota = vg ? Math.sin(t * 3) * 3 : 0;
        return (
          <g key={k} opacity={Math.min(1, el.cae ? v * 2 : v) * op}>
            {!el.sinSombra && <ellipse cx={x + 6} cy={y + s / 2 - 2} rx={s * 1.15} ry={s * 0.4} fill="#000" opacity={isDark ? 0.35 : 0.12} />}
            <g transform={`translate(0 ${caida + flota})`}>
              <path d={`M ${x - s} ${top} L ${x} ${top + s / 2} L ${x} ${y + s / 2} L ${x - s} ${y} Z`} fill={izq} />
              <path d={`M ${x} ${top + s / 2} L ${x + s} ${top} L ${x + s} ${y} L ${x} ${y + s / 2} Z`} fill={der} />
              <path d={`M ${x} ${top - s / 2} L ${x + s} ${top} L ${x} ${top + s / 2} L ${x - s} ${top} Z`} fill={arr} />
              {el.letra && !el.letraLado && <Txt x={x} y={top + s * 0.24} textAnchor="middle" fontSize={s * 0.7} fill={el.tono === 'gris' || el.tono === 'durazno' ? (isDark ? '#f1ece6' : '#374151') : '#ffffff'} peso={900}>{el.letra}</Txt>}
              {/* En una torre la cara de arriba queda tapada: la letra va inclinada sobre la cara derecha. */}
              {el.letra && el.letraLado && (
                <g transform={`translate(${x + s / 2} ${(top + y) / 2 + s / 4}) skewY(-26.57)`}>
                  <Txt x={0} y={Math.min(s, h) * 0.24} textAnchor="middle" fontSize={Math.min(s, h) * 0.66} fill="#ffffff" peso={900}>{el.letra}</Txt>
                </g>
              )}
              {el.valor && <Txt x={x} y={top - s / 2 - 20} textAnchor="middle" fontSize={34} fill={c.texto} peso={900}>{el.valor}</Txt>}
            </g>
            {lineas.map((l, j) => <Txt key={j} f="a" x={x} y={y + s / 2 + 40 + j * 28} textAnchor="middle" fontSize={23} fill={c.tenue} peso={400}>{l}</Txt>)}
          </g>
        );
      }
      case 'viajero': {
        const T = el.pts.map((_, i) => tm(el.en[i]) + (el.dd?.[i] ?? 0));
        let i = -1;
        T.forEach((ti, j) => { if (estatico || t >= ti) i = j; });
        if (i < 0) return null;
        const desde = el.pts[Math.max(0, i - 1)], hacia = el.pts[i];
        const u = estatico || i === 0 ? 1 : ac(t, T[i], T[i] + 0.9);
        const px = desde[0] + (hacia[0] - desde[0]) * u;
        const py = desde[1] + (hacia[1] - desde[1]) * u - Math.sin(u * Math.PI) * 60 + Math.sin(t * 2.6) * 5;
        const r = el.r ?? 24;
        const onda = (t * 0.8) % 1;
        return (
          <g key={k} opacity={Math.min(1, estatico ? 1 : ac(t, T[0], T[0] + 0.4))}>
            <ellipse cx={px} cy={py + r + 18} rx={r * (1.2 + onda * 1.4)} ry={r * (0.4 + onda * 0.45)} fill="none" stroke={NARANJA} strokeWidth={3} opacity={(1 - onda) * 0.6} />
            <circle cx={px} cy={py} r={r} fill={`url(#${ID}-orbe)`} style={sombra(c.sombra, 6, 12)} />
            {el.etiqueta && <Txt x={px} y={py - r - 14} textAnchor="middle" fontSize={22} fill={NARANJA} peso={900} letterSpacing={2}>{el.etiqueta}</Txt>}
          </g>
        );
      }
      case 'forma': {
        const e = estatico ? 1 : Math.min(1, v);
        return (
          <g key={k} opacity={e * op} transform={`translate(${el.cx} ${el.cy}) scale(${0.85 + 0.15 * e}) translate(${-el.cx} ${-el.cy})`}>
            <path d={el.trazo} fill={relleno(el.tono, isDark)} opacity={el.opacidad ?? 1} style={sombra(c.sombra, 8, 16)} />
            {el.etiqueta && <Txt x={el.lx ?? el.cx} y={el.ly ?? el.cy} textAnchor="middle" fontSize={el.tam ?? 28} fill={el.tono === 'gris' || el.tono === 'durazno' ? c.texto : '#ffffff'} peso={900}>{el.etiqueta}</Txt>}
          </g>
        );
      }
      case 'circulo': {
        const e = estatico ? 1 : Math.min(1.15, v);
        return <circle key={k} cx={el.x} cy={el.y} r={el.r * e} fill={relleno(el.tono, isDark)} opacity={(el.opacidad ?? 0.35) * Math.min(1, v) * op} />;
      }
      case 'burbuja': {
        const t0 = tm(el.a) + (el.d ?? 0) + 0.25;
        const tam = el.tam ?? 26;
        const porLinea = Math.floor((el.w - 44) / (tam * 0.5));
        const todas = envolver(el.t, porLinea);
        const visibles = estatico ? el.t.length : Math.floor(el.t.length * ac(t, t0, t0 + el.t.length * 0.035, 0, 1, Easing.linear));
        const lineas = envolver(el.t.slice(0, visibles), porLinea);
        const h = 36 + todas.length * tam * 1.3;
        const ven = el.quien !== 'cliente';
        const cx = el.cola === 'der' ? el.x + el.w - 46 : el.x + 46;
        const e = Math.min(1, v);
        return (
          <g key={k} opacity={e * op} transform={`translate(${cx} ${el.y + h}) scale(${0.7 + 0.3 * e}) translate(${-cx} ${-(el.y + h)})`}>
            <path d={`M ${el.x + 26} ${el.y} H ${el.x + el.w - 26} Q ${el.x + el.w} ${el.y} ${el.x + el.w} ${el.y + 26} V ${el.y + h - 26} Q ${el.x + el.w} ${el.y + h} ${el.x + el.w - 26} ${el.y + h} H ${cx + 16} L ${cx + (el.cola === 'der' ? 22 : -22)} ${el.y + h + 26} L ${cx - 16} ${el.y + h} H ${el.x + 26} Q ${el.x} ${el.y + h} ${el.x} ${el.y + h - 26} V ${el.y + 26} Q ${el.x} ${el.y} ${el.x + 26} ${el.y} Z`}
              fill={ven ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra, 8, 18)} />
            {lineas.map((l, j) => <Txt key={j} f="a" x={el.x + 22} y={el.y + 18 + tam + j * tam * 1.3} fontSize={tam} fill={ven ? '#ffffff' : c.texto} peso={600}>{l}</Txt>)}
          </g>
        );
      }
      case 'balanza': {
        const L = el.largo ?? 520;
        const angulo = (s: { izq: number; der: number }) => Math.max(-15, Math.min(15, (s.der - s.izq) * 5));
        let ang = 0, izq = 0, der = 0;
        el.estados.forEach((s, j) => {
          const T = tm(s.en);
          if (!estatico && t < T) return;
          const previo = j ? angulo(el.estados[j - 1]) : 0;
          const u = estatico ? 1 : ac(t, T, T + 1.3, 0, 1, Easing.out(Easing.back(2.2)));
          ang = previo + (angulo(s) - previo) * u;
          izq = s.izq; der = s.der;
        });
        const rad = (ang * Math.PI) / 180;
        const ex = (L / 2) * Math.cos(rad), ey = (L / 2) * Math.sin(rad);
        const platos: [number, number][] = [[el.x - ex, el.y - ey], [el.x + ex, el.y + ey]];
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            <rect x={el.x - 12} y={el.y} width={24} height={300} rx={10} fill={c.apagado} />
            <rect x={el.x - 110} y={el.y + 290} width={220} height={24} rx={12} fill={c.apagado} />
            <line x1={el.x - ex} y1={el.y - ey} x2={el.x + ex} y2={el.y + ey} stroke={c.tenue} strokeWidth={14} strokeLinecap="round" />
            <circle cx={el.x} cy={el.y} r={16} fill={NARANJA} />
            {platos.map(([px, py], j) => (
              <g key={j}>
                <path d={`M ${px} ${py} L ${px - 90} ${py + 120} M ${px} ${py} L ${px + 90} ${py + 120}`} stroke={c.apagado} strokeWidth={3} />
                <path d={`M ${px - 110} ${py + 120} Q ${px} ${py + 175} ${px + 110} ${py + 120} Z`} fill={j === 0 ? `url(#${ID}-marca)` : c.panel2} style={sombra(c.sombra, 6, 12)} />
                {j === 0 && Array.from({ length: izq }, (_, q) => {
                  const fila = Math.floor(q / 3), col = q % 3;
                  return <rect key={q} x={px - 75 + col * 52 + (fila % 2) * 24} y={py + 76 - fila * 42} width={44} height={40} rx={8} fill={q % 2 ? NARANJA : ROSA} style={sombra(c.sombra, 3, 6)} />;
                })}
                {j === 1 && der > 0 && <g><rect x={px - 70} y={py + 26} width={140} height={92} rx={14} fill={isDark ? '#475569' : '#64748b'} style={sombra(c.sombra, 4, 8)} />{el.derValor && <Txt x={px} y={py + 82} textAnchor="middle" fontSize={26} fill="#ffffff" peso={900}>{el.derValor}</Txt>}</g>}
                <Txt x={px} y={py + 205} textAnchor="middle" fontSize={26} fill={j === 0 ? NARANJA : c.tenue} peso={900}>{j === 0 ? el.izq : el.der}</Txt>
              </g>
            ))}
          </g>
        );
      }
      case 'sello': {
        const T = tm(el.a) + (el.d ?? 0);
        const golpe = estatico ? 1 : ac(t, T, T + 0.32, 0, 1, Easing.in(Easing.cubic));
        const tiembla = estatico ? 0 : Math.sin((t - T) * 60) * 4 * (1 - ac(t, T + 0.32, T + 0.7));
        const esc = 2.4 - 1.4 * golpe;
        const tam = el.tam ?? 44;
        const w = el.t.length * tam * 0.68 + 60;
        const col = el.tono === 'marca' ? NARANJA : el.tono === 'gris' ? c.tenue : ROSA;
        return (
          <g key={k} opacity={golpe * op} transform={`translate(${el.x + tiembla} ${el.y}) rotate(${el.rot ?? -10}) scale(${esc})`}>
            <rect x={-w / 2} y={-tam * 0.95} width={w} height={tam * 1.6} rx={14} fill="none" stroke={col} strokeWidth={6} />
            <Txt x={0} y={tam * 0.32} textAnchor="middle" fontSize={tam} fill={col} peso={900} letterSpacing={4}>{el.t.toUpperCase()}</Txt>
          </g>
        );
      }
      case 'tachar': {
        const T = tm(el.a) + (el.d ?? 0);
        const u = estatico ? 1 : ac(t, T, T + 0.45);
        return <line key={k} x1={el.x1} y1={el.y} x2={el.x1 + (el.x2 - el.x1) * u} y2={el.y - 6 * u} stroke={ROSA} strokeWidth={7} strokeLinecap="round" opacity={op} />;
      }
      case 'curva': {
        const T = tm(el.a) + (el.d ?? 0);
        const u = estatico ? 1 : ac(t, T, T + (el.dur ?? 1.6), 0, 1, Easing.inOut(Easing.cubic));
        const largo = el.pts.slice(1).reduce((s, p, j) => s + Math.hypot(p[0] - el.pts[j][0], p[1] - el.pts[j][1]), 0);
        const d = 'M ' + el.pts.map((p) => p.join(' ')).join(' L ');
        // Punto que acompaña la punta de la línea mientras se dibuja.
        let resto = largo * u, punta = el.pts[0];
        for (let j = 1; j < el.pts.length; j++) {
          const seg = Math.hypot(el.pts[j][0] - el.pts[j - 1][0], el.pts[j][1] - el.pts[j - 1][1]);
          if (resto <= seg) { const f = seg ? resto / seg : 0; punta = [el.pts[j - 1][0] + (el.pts[j][0] - el.pts[j - 1][0]) * f, el.pts[j - 1][1] + (el.pts[j][1] - el.pts[j - 1][1]) * f]; break; }
          resto -= seg; punta = el.pts[j];
        }
        const col = relleno(el.tono, isDark);
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            {el.area && <path d={`${d} L ${el.pts[el.pts.length - 1][0]} ${el.base ?? alto} L ${el.pts[0][0]} ${el.base ?? alto} Z`} fill={col} opacity={0.15 * u} />}
            <path d={d} fill="none" stroke={col} strokeWidth={el.grosor ?? 8} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={largo} strokeDashoffset={largo * (1 - u)} />
            {el.punto !== false && <circle cx={punta[0]} cy={punta[1]} r={(el.grosor ?? 8) * 1.4} fill={col} />}
          </g>
        );
      }
      case 'flujo': {
        const n = el.n ?? 5;
        const mx = (el.x1 + el.x2) / 2, my = (el.y1 + el.y2) / 2 - (el.curva ?? 40);
        return (
          <g key={k} opacity={Math.min(1, v) * op}>
            {Array.from({ length: n }, (_, j) => {
              const u = ((t * 0.6 + j / n) % 1);
              const x = (1 - u) * (1 - u) * el.x1 + 2 * (1 - u) * u * mx + u * u * el.x2;
              const y = (1 - u) * (1 - u) * el.y1 + 2 * (1 - u) * u * my + u * u * el.y2;
              return <circle key={j} cx={x} cy={y} r={9 * Math.sin(u * Math.PI) + 2} fill={j % 2 ? ROSA : NARANJA} opacity={Math.sin(u * Math.PI)} />;
            })}
          </g>
        );
      }
      case 'estallido': {
        const T = tm(el.a) + (el.d ?? 0);
        const u = estatico ? 0 : ac(t, T, T + 0.9, 0, 1, Easing.out(Easing.cubic));
        if (u <= 0 || u >= 1) return null;
        const r = el.r ?? 120;
        return (
          <g key={k} opacity={1 - u}>
            {Array.from({ length: 12 }, (_, j) => {
              const a = (j / 12) * Math.PI * 2;
              return <line key={j} x1={el.x + Math.cos(a) * r * 0.3 * u} y1={el.y + Math.sin(a) * r * 0.3 * u} x2={el.x + Math.cos(a) * r * u} y2={el.y + Math.sin(a) * r * u} stroke={j % 2 ? ROSA : NARANJA} strokeWidth={6} strokeLinecap="round" />;
            })}
          </g>
        );
      }
      default:
        return null;
    }
  };

  const anchoP = Math.min(1040, ancho - 80);
  const lineasP = pregunta ? envolver(pregunta, Math.floor((anchoP - 110) / 18.5)) : [];
  const vP = estatico || !pregunta ? 0 : pop(t, tPregunta, 0.6);
  const altoP = 90 + lineasP.length * 46;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      {/* Con cámara, lo que queda fuera del encuadre se recorta para no invadir la diapositiva. */}
      <svg viewBox={`0 0 ${ancho} ${alto}`} width="100%" height="100%" style={{ overflow: camara.length ? 'hidden' : 'visible' }}>
        <Gradientes id={ID} />
        <defs>
          <radialGradient id={`${ID}-orbe`} cx="0.35" cy="0.3" r="0.75"><stop offset="0" stopColor="#ffe0c2" /><stop offset="0.45" stopColor={NARANJA} /><stop offset="1" stopColor={ROSA} /></radialGradient>
        </defs>
        <g opacity={fondo} transform={`translate(${ancho / 2} ${alto / 2}) scale(${cam.z}) translate(${-cam.x} ${-cam.y})`}>{els.map(dibujar)}</g>
        {vP > 0.001 && (
          <g opacity={Math.min(1, vP)} transform={`translate(${ancho / 2} ${alto / 2}) scale(${0.85 + 0.15 * Math.min(1, vP)})`}>
            <rect x={-anchoP / 2} y={-altoP / 2} width={anchoP} height={altoP} rx={40} fill={c.panel} style={sombra(c.sombra, 14, 30)} />
            <rect x={-anchoP / 2} y={-altoP / 2} width={14} height={altoP} rx={7} fill={`url(#${ID}-marca)`} />
            <Txt f="a" x={-anchoP / 2 + 50} y={-altoP / 2 + 52} fontSize={20} fill={NARANJA} peso={700} letterSpacing={3}>PARA PENSAR</Txt>
            {lineasP.map((l, j) => <Txt key={j} x={-anchoP / 2 + 50} y={-altoP / 2 + 102 + j * 46} fontSize={34} fill={c.texto}>{l}</Txt>)}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
