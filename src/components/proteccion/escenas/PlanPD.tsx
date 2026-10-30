import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { PanelPregunta, Rotulo, lerp } from './comunPD';

/**
 * «El plan de cinco pasos», escena propia. Una escalera de cinco peldaños que sube hacia el calendario
 * del 1 de diciembre: inventario, base legal, contratos, canales y evidencia. En el segundo peldaño, un
 * filtro deja pasar las bases que cumplen y rechaza las que no.
 */

export const W = 1200, H = 860;
const ID = 'pdp3';

const nombres = ['plazo', 'p1', 'p2', 'filtro', 'p3', 'p4', 'p5', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const PASOS: { n: Nombre; txt: string }[] = [
  { n: 'p1', txt: 'inventario' }, { n: 'p2', txt: 'base legal' }, { n: 'p3', txt: 'contratos' }, { n: 'p4', txt: 'canales' }, { n: 'p5', txt: 'evidencia' },
];
const px = (k: number) => 170 + k * 210, top = (k: number) => 700 - k * 85;

export const PlanPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('p5') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Un plan para las campañas activas'], [M('plazo'), 'Antes del 1 de diciembre'], [M('p1'), '1. Inventario'], [M('p2'), '2. Base legal'],
    [M('filtro'), 'Lo que no pasa: se detiene o se suprime'], [M('p3'), '3. Contratos'], [M('p4'), '4. Canales'], [M('p5'), '5. Evidencia'],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cinco pasos antes del 1 de diciembre: inventario, base legal, contratos, canales y evidencia">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Calendario de la meta */}
          <g opacity={Math.min(1, pop(t, M('plazo'), 0.6))} transform="translate(1090 190)">
            <rect x={-70} y={-75} width={140} height={150} rx={18} fill={c.panel} style={sombra(c.sombra)} />
            <path d="M -70 -57 Q -70 -75 -52 -75 H 52 Q 70 -75 70 -57 V -30 H -70 Z" fill={`url(#${ID}-marca)`} />
            <Txt x={0} y={-52} dominantBaseline="central" textAnchor="middle" fontSize={24} fill="#fff">DIC</Txt>
            <Txt x={0} y={25} dominantBaseline="central" textAnchor="middle" fontSize={66} fill={c.texto}>1</Txt>
          </g>

          {/* Escalera */}
          {PASOS.map((p, k) => {
            const u = ac(t, M(p.n), M(p.n) + 0.8, 0, 1, Easing.out(Easing.back(1.4)));
            const fantasma = ac(t, M('plazo'), M('plazo') + 0.8) * 0.35;
            const y = lerp(790, top(k), Math.max(u, 0.0001));
            return (
              <g key={p.n}>
                <rect x={px(k) - 100} y={top(k)} width={200} height={790 - top(k)} rx={14} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="10 8" opacity={fantasma * (1 - u)} />
                {u > 0.01 && (
                  <g>
                    <rect x={px(k) - 100} y={y} width={200} height={790 - y} rx={14} fill={k % 2 ? ROSA : NARANJA} style={sombra(c.sombra, 5, 10)} />
                    <Txt x={px(k)} y={y + 45} dominantBaseline="central" textAnchor="middle" fontSize={44} fill="#fff" opacity={u}>{k + 1}</Txt>
                    <Txt f="a" x={px(k)} y={y - 24} textAnchor="middle" fontSize={30} fill={c.texto} opacity={u}>{p.txt}</Txt>
                  </g>
                )}
              </g>
            );
          })}

          {/* Filtro sobre el segundo paso: unas bases pasan, otras no */}
          {(() => {
            const op = Math.min(1, pop(t, M('filtro'), 0.5)) * (1 - ac(t, M('p3') + 2, M('p3') + 2.6));
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                <g transform={`translate(${px(1)} 470)`}>
                  <path d="M -70 -50 L -16 20 V 50 H 16 V 20 L 70 -50 Z" fill={c.apagado} />
                  <ellipse cx={0} cy={-50} rx={70} ry={16} fill={c.panel2} />
                </g>
                {[0, 1, 2].map((k) => {
                  const u = ((t - M('filtro')) * 0.5 + k / 3) % 1;
                  const pasa = k !== 1;
                  const x = px(1) + (pasa ? 0 : 60 * Math.max(0, u - 0.5) * 2);
                  const y = lerp(360, 470, Math.min(u * 2, 1)) + (pasa ? 0 : -40 * Math.max(0, u - 0.5));
                  return <rect key={k} x={x - 12} y={y - 12} width={24} height={24} rx={5} fill={pasa ? VERDE : ROSA} opacity={Math.sin(Math.PI * u)} />;
                })}
              </g>
            );
          })()}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
