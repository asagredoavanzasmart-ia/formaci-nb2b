import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, PanelPregunta, Rotulo, Visto } from './comunPD';

/**
 * «La política publicada», escena propia. Una ventana de navegador con la política de privacidad del
 * responsable, que se completa fila por fila a medida que se nombra cada contenido obligatorio. Una
 * persona la lee con su lupa; al final, si falta información, la insignia de infracción leve.
 */

export const W = 1200, H = 860;
const ID = 'pdq2';

const nombres = ['web', 'politica', 'identificacion', 'tipos', 'seguridad', 'transferencias', 'plazo', 'automatizadas', 'leve', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const FILAS: { n: Nombre; txt: string }[] = [
  { n: 'politica', txt: 'fecha y versión' }, { n: 'identificacion', txt: 'responsable' }, { n: 'tipos', txt: 'datos y fines' },
  { n: 'seguridad', txt: 'seguridad' }, { n: 'transferencias', txt: 'transferencias' }, { n: 'plazo', txt: 'plazo' }, { n: 'automatizadas', txt: 'decisiones' },
];

export const TransparenciaPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('leve') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'La transparencia se publica'], [M('web'), 'En el sitio web, siempre'], [M('politica'), 'La política, con fecha y versión'],
    [M('identificacion'), 'Quién es el responsable y su canal'], [M('tipos'), 'Datos, destinatarios, fines y base legal'], [M('seguridad'), 'Seguridad y derechos'],
    [M('transferencias'), 'Transferencias y garantías'], [M('plazo'), 'Plazo, fuente y retiro'], [M('automatizadas'), 'Decisiones automatizadas'], [M('leve'), 'Si falta: infracción leve'],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La política de privacidad publicada con fecha y versión, responsable, datos, seguridad, transferencias, plazo y decisiones automatizadas">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          <g opacity={Math.min(1, pop(t, M('web') - 0.3, 0.6))}>
            <rect x={110} y={130} width={980} height={680} rx={28} fill={c.panel} style={sombra(c.sombra)} />
            <path d="M 110 158 Q 110 130 138 130 H 1062 Q 1090 130 1090 158 V 200 H 110 Z" fill={c.apagado} />
            {[0, 1, 2].map((k) => <circle key={k} cx={150 + k * 26} cy={165} r={8} fill={c.panel} />)}
            <rect x={260} y={145} width={420} height={40} rx={20} fill={c.panel} />
            <Txt f="a" x={470} y={165} dominantBaseline="central" textAnchor="middle" fontSize={22} fill={c.tenue}>privacidad</Txt>
          </g>
          {FILAS.map((f, k) => {
            const e = Math.min(1, pop(t, M(f.n), 0.5));
            if (e < 0.01) return null;
            const y = 262 + k * 76;
            return (
              <g key={f.n} opacity={e} transform={`translate(${(1 - e) * -20} 0)`}>
                <Visto x={180} y={y} s={0.85} />
                <Txt f="a" x={220} y={y} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{f.txt}</Txt>
                <rect x={560} y={y - 6} width={90 * ac(t, M(f.n) + 0.3, M(f.n) + 1)} height={12} rx={6} fill={c.apagado} />
              </g>
            );
          })}
          {/* Una persona la lee con su lupa */}
          <g opacity={ac(t, M('politica'), M('politica') + 0.6)}>
            <Persona id={ID} x={900} y={760} s={0.9} />
            <g transform={`translate(${960 + 12 * Math.sin(t * 1.5)} 560) rotate(-20)`}>
              <circle r={34} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={10} />
              <line x1={24} y1={24} x2={52} y2={52} stroke={c.texto} strokeWidth={11} strokeLinecap="round" />
            </g>
          </g>
          <g opacity={Math.min(1, pop(t, M('leve'), 0.5))}>
            <Insignia x={890} y={300} texto="leve" c={c} id={ID} tono="alerta" />
          </g>
          {NARANJA && ROSA && null}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
