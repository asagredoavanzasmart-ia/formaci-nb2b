import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp } from './comunPD';

/**
 * «Las infracciones», escena propia. Una escalera de tres bloques que crece en altura y en color: leve,
 * grave y gravísima. Al nombrar un ejemplo, cae sobre su bloque: sin canal de contacto (leve), impedir
 * los derechos (grave), fraude y no hacer la evaluación de impacto (gravísimas).
 */

export const W = 1200, H = 860;
const ID = 'pdj';

const nombres = ['leves', 'canal', 'graves', 'impedir', 'gravisimas', 'fraude', 'impacto', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const BLOQUES: { n: Nombre; txt: string; x: number; top: number; color: string }[] = [
  { n: 'leves', txt: 'leve', x: 250, top: 610, color: '#f59e0b' },
  { n: 'graves', txt: 'grave', x: 600, top: 480, color: NARANJA },
  { n: 'gravisimas', txt: 'gravísima', x: 950, top: 350, color: ROSA },
];
const EJEMPLOS: { n: Nombre; txt: string; x: number; y: number }[] = [
  { n: 'canal', txt: 'sin canal', x: 250, y: 530 }, { n: 'impedir', txt: 'impedir', x: 600, y: 400 },
  { n: 'fraude', txt: 'fraude', x: 950, y: 270 }, { n: 'impacto', txt: 'sin evaluación', x: 950, y: 175 },
];

export const InfraccionesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('impacto') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Tres niveles'], [M('leves'), 'Leves'], [M('canal'), 'como no tener un canal operativo'], [M('graves'), 'Graves'],
    [M('impedir'), 'como impedir los derechos'], [M('gravisimas'), 'Gravísimas'], [M('fraude'), 'como el fraude'], [M('impacto'), 'o no hacer la evaluación de impacto'],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Infracciones leves, graves y gravísimas, con un ejemplo de cada una">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          {BLOQUES.map((b) => {
            const u = ac(t, M(b.n), M(b.n) + 0.9, 0, 1, Easing.out(Easing.back(1.3)));
            if (u < 0.01) return null;
            const top = lerp(790, b.top, u);
            return (
              <g key={b.n}>
                <rect x={b.x - 150} y={top} width={300} height={790 - top} rx={18} fill={b.color} style={sombra(c.sombra, 6, 12)} />
                <rect x={b.x + 90} y={top} width={60} height={790 - top} fill="#000" opacity={0.08} />
                <Txt f="a" x={b.x} y={top + 50} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>{b.txt}</Txt>
              </g>
            );
          })}
          {EJEMPLOS.map((ej) => {
            const u = ac(t, M(ej.n), M(ej.n) + 0.7, 0, 1, Easing.out(Easing.bounce));
            if (u < 0.01) return null;
            return <g key={ej.n} opacity={Math.min(1, u * 2)} transform={`translate(0 ${(1 - u) * -120})`}><Insignia x={ej.x} y={ej.y} texto={ej.txt} c={c} id={ID} tono="tenue" /></g>;
          })}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
