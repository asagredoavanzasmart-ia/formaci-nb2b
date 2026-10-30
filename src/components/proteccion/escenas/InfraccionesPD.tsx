import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp } from './comunPD';

/**
 * «Las infracciones», escena propia. Una escalera de tres bloques que crece en altura y en color: leve,
 * grave y gravísima. Cada conducta que el audio nombra cae como placa dentro del bloque de su nivel y se
 * apila con las anteriores, de modo que se ve cómo se va llenando cada escalón.
 */

export const W = 1200, H = 860;
const ID = 'pdj';

const nombres = [
  'leves', 'informar', 'canal', 'plazo', 'acatar',
  'graves', 'base', 'fin', 'impedir', 'menores', 'secreto',
  'gravisimas', 'fraude', 'malicia', 'falsedad', 'sensibles', 'ocultar', 'impacto',
  'pregunta',
] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const ANCHO = 330, PISO = 790, PASO = 88, PLACA = 310;
const BLOQUES: { n: Nombre; txt: string; x: number; top: number; color: string; placas: [Nombre, string][] }[] = [
  { n: 'leves', txt: 'leve', x: 250, top: 340, color: '#f59e0b', placas: [['informar', 'sin informar'], ['canal', 'sin canal'], ['plazo', 'tardanza'], ['acatar', 'no acatar']] },
  { n: 'graves', txt: 'grave', x: 600, top: 250, color: NARANJA, placas: [['base', 'sin base'], ['fin', 'otro fin'], ['impedir', 'impedir'], ['menores', 'menores'], ['secreto', 'secreto']] },
  { n: 'gravisimas', txt: 'gravísima', x: 950, top: 160, color: ROSA, placas: [['fraude', 'fraude'], ['malicia', 'malicia'], ['falsedad', 'falsedad'], ['sensibles', 'sensibles'], ['ocultar', 'ocultar'], ['impacto', 'sin evaluar']] },
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
    [0.2, 'Tres niveles'], [M('leves'), 'Leves'], [M('graves'), 'Graves'],
    [M('gravisimas'), 'Gravísimas'], [M('impacto'), 'o no hacer la evaluación de impacto'],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Infracciones leves, graves y gravísimas, con las conductas de cada nivel">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          {BLOQUES.map((b) => {
            const u = ac(t, M(b.n), M(b.n) + 0.9, 0, 1, Easing.out(Easing.back(1.3)));
            if (u < 0.01) return null;
            const top = lerp(PISO, b.top, u);
            return (
              <g key={b.n}>
                <rect x={b.x - ANCHO / 2} y={top} width={ANCHO} height={PISO - top} rx={18} fill={b.color} style={sombra(c.sombra, 6, 12)} />
                <rect x={b.x + ANCHO / 2 - 60} y={top} width={60} height={PISO - top} fill="#000" opacity={0.08} />
                <Txt f="a" x={b.x} y={top + 50} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>{b.txt}</Txt>
                {b.placas.map(([n, txt], k) => {
                  const v = ac(t, M(n), M(n) + 0.7, 0, 1, Easing.out(Easing.bounce));
                  if (v < 0.01) return null;
                  const y = b.top + 130 + k * PASO;
                  return <g key={n} opacity={Math.min(1, v * 2)} transform={`translate(0 ${(1 - v) * -120})`}><Insignia x={b.x} y={y} texto={txt} c={c} id={ID} tono="tenue" ancho={PLACA} /></g>;
                })}
              </g>
            );
          })}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
