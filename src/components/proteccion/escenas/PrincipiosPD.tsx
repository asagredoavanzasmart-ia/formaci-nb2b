import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Contacto, ESCUDO, Hoja, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Ocho principios, tres preguntas», escena propia. Abajo, tres columnas (para qué, cómo, quién) que
 * se llenan con un bloque por principio. Arriba, un foco que muestra cada principio con su metáfora:
 * un documento sellado (licitud), una flecha en la diana (finalidad), bloques sobrantes que se cortan
 * (proporcionalidad), una ficha que se actualiza (calidad), un escudo ante la base (seguridad), un
 * sobre lacrado (confidencialidad), una persona que responde (responsabilidad) y una ventana que deja
 * ver (transparencia). Texto ≥ 44 en el lienzo y ninguna pieza encima de otra.
 */

export const W = 1200, H = 860;
const ID = 'pdq';

const nombres = ['tres', 'q1', 'licitud', 'finalidad', 'proporcionalidad', 'q2', 'calidad', 'seguridad', 'confidencialidad', 'q3', 'responsabilidad', 'transparencia', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const COLS = [{ x: 210, q: 'q1', titulo: 'Para qué' }, { x: 600, q: 'q2', titulo: 'Cómo' }, { x: 990, q: 'q3', titulo: 'Quién' }] as const;
const BLOQUES: { n: Nombre; col: number; fila: number; txt: string }[] = [
  { n: 'licitud', col: 0, fila: 0, txt: 'Licitud' }, { n: 'finalidad', col: 0, fila: 1, txt: 'Finalidad' }, { n: 'proporcionalidad', col: 0, fila: 2, txt: 'Proporcionalidad' },
  { n: 'calidad', col: 1, fila: 0, txt: 'Calidad' }, { n: 'seguridad', col: 1, fila: 1, txt: 'Seguridad' }, { n: 'confidencialidad', col: 1, fila: 2, txt: 'Confidencialidad' },
  { n: 'responsabilidad', col: 2, fila: 0, txt: 'Responsabilidad' }, { n: 'transparencia', col: 2, fila: 1, txt: 'Transparencia' },
];
const FX = 600, FY = 290; // centro del foco

/* Texto que no pasa de `max` de ancho: si la estimación lo excede, se ajusta con textLength. */
const TxtAncho: React.FC<{ x: number; y: number; txt: string; max: number; fill: string }> = ({ x, y, txt, max, fill }) => {
  const est = txt.length * MIN_TXT * 0.55;
  return <Txt f="a" x={x} y={y} textAnchor="middle" fontSize={MIN_TXT} fill={fill} {...(est > max ? { textLength: max, lengthAdjust: 'spacingAndGlyphs' } : {})}>{txt}</Txt>;
};

/* Metáfora de cada principio, centrada en el foco; `u` avanza de 0 a 1 en sus primeros segundos. */
const Metafora: React.FC<{ n: Nombre; u: number; t: number; c: Tono }> = ({ n, u, t, c }) => {
  if (n === 'licitud') {
    const sello = pop(u * 2.2, 1, 0.5);
    return (
      <g>
        <Hoja x={FX} y={FY} w={210} h={260} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={Math.min(1, u * 1.6)} />
        <g transform={`translate(${FX + 105} ${FY + 95}) scale(${Math.min(1.2, sello)}) rotate(-12)`} opacity={Math.min(1, sello)}>
          <circle r={48} fill={c.panel} stroke={VERDE} strokeWidth={8} />
          <path d="M -20 0 L -6 15 L 22 -16" fill="none" stroke={VERDE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    );
  }
  if (n === 'finalidad') {
    const f = ac(u, 0.15, 0.55, 0, 1, Easing.in(Easing.quad));
    const vibra = u > 0.55 ? Math.sin(t * 40) * 3 * (1 - ac(u, 0.55, 0.8)) : 0;
    return (
      <g transform={`translate(${FX + 60} ${FY})`}>
        {[110, 78, 46, 18].map((r, k) => <circle key={r} r={r} fill={k % 2 ? c.panel : `url(#${ID}-marca)`} />)}
        <g transform={`translate(${lerp(-330, 0, f)} ${lerp(-40, 0, f) + vibra}) rotate(${lerp(-6, 0, f)})`}>
          <rect x={-200} y={-6} width={200} height={12} rx={6} fill={c.texto} />
          <path d="M 0 -18 L 24 0 L 0 18 Z" fill={c.texto} />
          <path d="M -200 -6 L -228 -26 L -200 -26 Z M -200 6 L -228 26 L -200 26 Z" fill={NARANJA} />
        </g>
      </g>
    );
  }
  if (n === 'proporcionalidad') {
    const corta = ac(u, 0.3, 0.5);
    const cae = ac(u, 0.5, 0.9, 0, 1, Easing.in(Easing.quad));
    return (
      <g>
        {Array.from({ length: 7 }, (_, k) => {
          const x = FX - 300 + k * 92, sobra = k >= 4;
          const y = FY + (sobra ? cae * 160 : 0);
          return <rect key={k} x={x - 38} y={y - 38} width={76} height={76} rx={14} fill={sobra ? c.apagado : `url(#${ID}-marca)`} opacity={sobra ? 1 - cae : 1} transform={sobra ? `rotate(${cae * 25 * (k - 3)} ${x} ${y})` : undefined} />;
        })}
        <line x1={FX + 41} y1={FY - 90} x2={FX + 41} y2={lerp(FY - 90, FY + 90, corta)} stroke={ROSA} strokeWidth={6} strokeDasharray="10 8" />
      </g>
    );
  }
  if (n === 'calidad') {
    const gira = u * 540;
    const ok = ac(u, 0.55, 0.8);
    return (
      <g>
        <Contacto x={FX} y={FY} s={3.2} relleno={`url(#${ID}-marca)`} />
        <g transform={`translate(${FX} ${FY}) rotate(${gira})`}>
          <path d="M 0 -150 A 150 150 0 0 1 150 0" fill="none" stroke={c.tenue} strokeWidth={10} strokeLinecap="round" />
          <path d="M 150 0 L 168 -26 L 132 -26 Z" fill={c.tenue} />
          <path d="M 0 150 A 150 150 0 0 1 -150 0" fill="none" stroke={c.tenue} strokeWidth={10} strokeLinecap="round" />
          <path d="M -150 0 L -168 26 L -132 26 Z" fill={c.tenue} />
        </g>
        <g transform={`translate(${FX + 190} ${FY - 110}) scale(${ok})`}>
          <circle r={34} fill={VERDE} />
          <path d="M -14 0 L -4 11 L 15 -11" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    );
  }
  if (n === 'seguridad') {
    const e = pop(u * 2, 0.3, 0.6);
    return (
      <g>
        <BaseDatos x={FX + 110} y={FY - 70} c={c} t={t} s={1.1} />
        <g transform={`translate(${FX - 130} ${FY + 10}) scale(${2.6 * Math.min(1, e)})`} opacity={Math.min(1, e)}>
          <path d={ESCUDO} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 3, 6)} />
          <rect x={-12} y={-2} width={24} height={20} rx={4} fill="#fff" />
          <path d="M -7 -2 V -9 A 7 7 0 0 1 7 -9 V -2" fill="none" stroke="#fff" strokeWidth={4} />
        </g>
      </g>
    );
  }
  if (n === 'confidencialidad') {
    const lacre = pop(u * 2, 0.5, 0.5);
    return (
      <g transform={`translate(${FX} ${FY})`}>
        <rect x={-180} y={-115} width={360} height={230} rx={20} fill={c.panel} stroke={c.apagado} strokeWidth={5} style={sombra(c.sombra)} />
        <path d="M -180 -105 L 0 30 L 180 -105" fill="none" stroke={c.apagado} strokeWidth={6} strokeLinejoin="round" />
        <g transform={`translate(0 30) scale(${Math.min(1.15, lacre)})`} opacity={Math.min(1, lacre)}>
          <circle r={46} fill={ROSA} />
          <circle r={9} cy={-6} fill="#fff" />
          <rect x={-4} y={-4} width={8} height={22} rx={3} fill="#fff" />
        </g>
      </g>
    );
  }
  if (n === 'responsabilidad') {
    const e = ac(u, 0.2, 0.6);
    return (
      <g>
        <Persona id={ID} x={FX - 40} y={FY + 150} s={1.4} />
        <g transform={`translate(${FX + 150} ${FY - 40}) scale(${e})`}>
          <path d="M -50 -60 H 50 V 30 L 0 66 L -50 30 Z" fill={`url(#${ID}-marca)`} />
          <path d="M -20 0 L -6 14 L 22 -18" fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    );
  }
  if (n === 'transparencia') {
    const luz = ac(u, 0.1, 0.6);
    return (
      <g transform={`translate(${FX} ${FY})`}>
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${-230 + k * 30} -150 L ${-60 + k * 60} 150`} stroke="#fde68a" strokeWidth={22} opacity={0.35 * luz * (0.7 + 0.3 * Math.sin(t * 2 + k))} />)}
        <rect x={-170} y={-140} width={340} height={280} rx={18} fill="#bfdbfe" opacity={0.35} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={-120} y={-80 + k * 44} width={k === 3 ? 140 : 240} height={14} rx={7} fill={c.tenue} opacity={0.4 + 0.6 * luz} />)}
        <rect x={-170} y={-140} width={340} height={280} rx={18} fill="none" stroke={c.tenue} strokeWidth={10} />
        <line x1={0} y1={-140} x2={0} y2={140} stroke={c.tenue} strokeWidth={8} />
        <line x1={-170} y1={0} x2={170} y2={0} stroke={c.tenue} strokeWidth={8} />
      </g>
    );
  }
  return null;
};

export const PrincipiosPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('transparencia') + 2.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Ocho principios'], [M('tres'), 'En tres preguntas'], [M('q1'), '¿Para qué y cuánto?'], [M('licitud'), 'Lícita y leal, y acreditarlo'],
    [M('finalidad'), 'Fines específicos y explícitos'], [M('proporcionalidad'), 'Solo lo necesario, el tiempo necesario'], [M('q2'), '¿Cómo se cuidan?'],
    [M('calidad'), 'Exactos, completos y actuales'], [M('seguridad'), 'Contra pérdida y filtración'], [M('confidencialidad'), 'Secreto, aun después'],
    [M('q3'), '¿Quién responde?'], [M('responsabilidad'), 'Quien trata, responde'], [M('transparencia'), 'Clara, precisa y gratuita'],
  ];

  // El foco muestra un principio a la vez: entra con su marca y sale antes de que entre el siguiente.
  const focos = BLOQUES.map((b) => b.n);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Ocho principios en tres preguntas: para qué y cuánto, cómo se cuidan y quién responde">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Foco: la metáfora del principio en curso */}
          {focos.map((n, k) => {
            const fin = k < focos.length - 1 ? M(focos[k + 1]) : tPregunta;
            const op = ventana(t, M(n), fin);
            if (op < 0.01) return null;
            return <g key={n} opacity={op}><Metafora n={n} u={ac(t, M(n), M(n) + 2.4, 0, 1, Easing.linear)} t={t} c={c} /></g>;
          })}

          {/* Tres columnas con su pregunta y sus bloques */}
          {COLS.map((col, ci) => {
            const marco = ac(t, M('tres') + ci * 0.3, M('tres') + 0.6 + ci * 0.3);
            const cab = Math.min(1, pop(t, M(col.q), 0.55));
            return (
              <g key={col.titulo}>
                <rect x={col.x - 180} y={480} width={360} height={360} rx={28} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="12 10" opacity={marco} />
                {cab > 0.01 && <g opacity={cab}><Insignia x={col.x} y={530} texto={col.titulo} c={c} id={ID} ancho={300} /></g>}
              </g>
            );
          })}
          {BLOQUES.map((b) => {
            const e = Math.min(1, pop(t, M(b.n) + 0.3, 0.55));
            if (e < 0.01) return null;
            const x = COLS[b.col].x, y = 618 + b.fila * 76;
            const activo = t < (BLOQUES[BLOQUES.indexOf(b) + 1] ? M(BLOQUES[BLOQUES.indexOf(b) + 1].n) : tPregunta);
            return (
              <g key={b.n} opacity={e} transform={`translate(0 ${(1 - e) * -30})`}>
                <rect x={x - 165} y={y - 32} width={330} height={64} rx={18} fill={activo ? NARANJA : c.panel2} opacity={activo ? 0.22 : 1} />
                <rect x={x - 165} y={y - 32} width={330} height={64} rx={18} fill="none" stroke={activo ? NARANJA : 'none'} strokeWidth={3} />
                <TxtAncho x={x} y={y + 15} txt={b.txt} max={300} fill={c.texto} />
              </g>
            );
          })}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
