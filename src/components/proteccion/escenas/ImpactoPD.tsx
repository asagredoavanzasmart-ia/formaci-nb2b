import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, PanelPregunta, Rotulo, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «La evaluación de impacto», escena propia. Un medidor de riesgo que sube al rojo y la consigna de
 * hacerla antes de empezar; a la derecha, los cuatro casos en que siempre se exige (perfiles, masivo,
 * monitoreo, sensibles), cada uno con su dibujo. Luego, la evaluación con sus tres partes, la consulta
 * a la Agencia y, si no se hace, la insignia de gravísima.
 */

export const W = 1200, H = 860;
const ID = 'pdk';

const nombres = ['riesgo', 'antes', 'cuatro', 'perfiles', 'masivo', 'monitoreo', 'sensibles', 'contenido', 'consultar', 'gravisima', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const CASOS: { n: Nombre; txt: string; x: number; y: number }[] = [
  { n: 'perfiles', txt: 'perfiles', x: 760, y: 300 }, { n: 'masivo', txt: 'masivo', x: 1010, y: 300 },
  { n: 'monitoreo', txt: 'monitoreo', x: 760, y: 540 }, { n: 'sensibles', txt: 'sensibles', x: 1010, y: 540 },
];

const DibujoCaso: React.FC<{ n: Nombre; t: number; c: Tono; id: string }> = ({ n, t, c, id }) => {
  if (n === 'perfiles') return <g><path d="M -40 14 A 40 40 0 0 1 40 14" fill="none" stroke={c.apagado} strokeWidth={10} /><path d="M -40 14 A 40 40 0 0 1 40 14" fill="none" stroke={NARANJA} strokeWidth={10} pathLength={1} strokeDasharray={`${0.4 + 0.3 * Math.sin(t * 2)} 1`} /></g>;
  if (n === 'masivo') return <g>{Array.from({ length: 12 }, (_, k) => <circle key={k} cx={-40 + (k % 4) * 27} cy={-24 + Math.floor(k / 4) * 24} r={9} fill={k % 3 ? c.tenue : NARANJA} />)}</g>;
  if (n === 'monitoreo') return <g transform={`rotate(${10 * Math.sin(t * 1.2)})`}><rect x={-40} y={-20} width={60} height={36} rx={8} fill={c.texto} /><circle cx={30} cy={-2} r={13} fill={c.tenue} /><circle cx={30} cy={-2} r={6} fill={ROSA} /><rect x={-14} y={16} width={8} height={24} fill={c.texto} /></g>;
  return <path transform={`scale(${0.9 + 0.05 * Math.sin(t * 6)})`} d="M 0 26 C -50 -6 -50 -48 -22 -48 C -10 -48 0 -38 0 -28 C 0 -38 10 -48 22 -48 C 50 -48 50 -6 0 26 Z" fill={ROSA} />;
};

export const ImpactoPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('gravisima') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Antes de un tratamiento de riesgo'], [M('riesgo'), 'Si hay alto riesgo…'], [M('antes'), '…se evalúa antes de empezar'],
    [M('cuatro'), 'Siempre en cuatro casos'], [M('perfiles'), 'Perfiles con efectos'], [M('masivo'), 'Tratamiento masivo'], [M('monitoreo'), 'Monitoreo de zonas públicas'],
    [M('sensibles'), 'Sensibles sin consentimiento'], [M('contenido'), 'Qué incluye la evaluación'], [M('consultar'), 'Se puede consultar a la Agencia'], [M('gravisima'), 'No hacerla: gravísima'],
  ];
  const izqA = ventana(t, M('riesgo') - 0.3, M('contenido'));
  const aguja = ac(t, M('riesgo'), M('riesgo') + 1.6) * 0.85;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La evaluación de impacto se hace antes de un tratamiento de alto riesgo y siempre en cuatro casos">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Medidor de riesgo y «antes de empezar» */}
          {izqA > 0.01 && (
            <g opacity={izqA}>
              <g transform="translate(300 380)">
                <path d="M -130 0 A 130 130 0 0 1 130 0" fill="none" stroke={c.apagado} strokeWidth={30} />
                <path d="M -130 0 A 130 130 0 0 1 -40 -124" fill="none" stroke={VERDE} strokeWidth={30} />
                <path d="M 40 -124 A 130 130 0 0 1 130 0" fill="none" stroke={ROSA} strokeWidth={30} />
                <line x1={0} y1={0} x2={Math.cos(Math.PI * (1 - aguja)) * 110} y2={-Math.sin(Math.PI * (1 - aguja)) * 110} stroke={c.texto} strokeWidth={9} strokeLinecap="round" />
                <circle r={16} fill={c.texto} />
              </g>
              <g opacity={Math.min(1, pop(t, M('antes'), 0.5))}><Insignia x={300} y={530} texto="antes de empezar" c={c} id={ID} /></g>
            </g>
          )}

          {/* Cuatro casos */}
          {CASOS.map((cs) => {
            const marco = ac(t, M('cuatro'), M('cuatro') + 0.6);
            const e = ac(t, M(cs.n), M(cs.n) + 0.5);
            if (marco < 0.01) return null;
            return (
              <g key={cs.n} opacity={Math.max(0.35 * marco, e)} transform={`translate(${cs.x} ${cs.y})`}>
                <rect x={-115} y={-100} width={230} height={200} rx={22} fill={c.panel} style={sombra(c.sombra, 5, 12)} />
                <g transform="translate(0 -24)" opacity={e}><DibujoCaso n={cs.n} t={t} c={c} id={ID} /></g>
                <Txt f="a" x={0} y={62} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={e}>{cs.txt}</Txt>
              </g>
            );
          })}

          {/* La evaluación y sus tres partes */}
          {(() => {
            const op = ac(t, M('contenido'), M('contenido') + 0.4);
            if (op < 0.01) return null;
            return (
              <g opacity={op} transform="translate(300 450)">
                <rect x={-180} y={-200} width={360} height={400} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                <rect x={-60} y={-222} width={120} height={44} rx={12} fill={c.tenue} />
                {['operaciones', 'necesidad', 'riesgos'].map((txt, k) => {
                  const u = ac(t, M('contenido') + 0.4 + k * 1.2, M('contenido') + 0.9 + k * 1.2);
                  return (
                    <g key={txt} opacity={u}>
                      <rect x={-150} y={-130 + k * 110} width={30} height={30} rx={8} fill={VERDE} />
                      <Txt f="a" x={-104} y={-115 + k * 110} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                    </g>
                  );
                })}
              </g>
            );
          })()}
          {(() => {
            const op = ventana(t, M('consultar'), M('gravisima'));
            return op > 0.01 ? <g opacity={op}><Persona id={ID} x={760} y={800} s={0.55} /><Insignia x={940} y={740} texto="consulta" c={c} id={ID} tono="tenue" /></g> : null;
          })()}
          <g opacity={Math.min(1, pop(t, M('gravisima'), 0.5))}><Insignia x={885} y={740} texto="gravísima" c={c} id={ID} tono="alerta" /></g>
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
