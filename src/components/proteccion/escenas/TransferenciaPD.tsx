import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, tono } from '../../remotion/comun';
import { BaseDatos, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Datos que salen del país», escena propia. La base en Chile y la nube en el extranjero, separadas
 * por el mar. Tres puentes se encienden al nombrarse (país adecuado, cláusulas, certificación) y por
 * ellos viajan los datos; sin garantías solo queda un sendero estrecho para una transferencia puntual.
 * Quien envía acredita; la Agencia puede bajar una barrera y suspender el envío; a sabiendas, gravísimo.
 */

export const W = 1200, H = 860;
const ID = 'pdt';

const nombres = ['transfer', 'tres', 'adecuado', 'clausulas', 'certificacion', 'especificas', 'acreditar', 'suspender', 'gravisima', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const PUENTES: { n: Nombre; txt: string; y: number }[] = [
  { n: 'adecuado', txt: 'país adecuado', y: 270 }, { n: 'clausulas', txt: 'cláusulas', y: 430 }, { n: 'certificacion', txt: 'certificación', y: 590 },
];
const X0 = 340, X1 = 900;

/* Nube con un servidor dentro. */
const Nube: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -110 40 Q -150 40 -150 0 Q -150 -44 -100 -44 Q -90 -100 -30 -96 Q 10 -130 60 -96 Q 120 -100 120 -44 Q 160 -40 156 4 Q 152 40 110 40 Z" fill={c.panel2} stroke={c.apagado} strokeWidth={5} />
    {[0, 1].map((k) => <rect key={k} x={-46} y={-40 + k * 34} width={92} height={26} rx={6} fill={c.tenue} />)}
    {[0, 1].map((k) => <circle key={k} cx={30} cy={-27 + k * 34} r={5} fill={NARANJA} />)}
  </g>
);

export const TransferenciaPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('gravisima') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cuando los datos salen del país'], [M('transfer'), 'Una transferencia internacional'], [M('tres'), 'Lícita en tres casos'],
    [M('adecuado'), 'Un país con protección adecuada'], [M('clausulas'), 'Cláusulas o normas con garantías'], [M('certificacion'), 'Un modelo certificado'],
    [M('especificas'), 'Sin garantías: solo puntuales'], [M('acreditar'), 'Quien envía lo acredita'], [M('suspender'), 'La Agencia puede suspender'],
    [M('gravisima'), 'A sabiendas: gravísima'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const barrera = ac(t, M('suspender'), M('suspender') + 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una transferencia internacional es lícita con país adecuado, cláusulas con garantías o certificación; sin ellas, solo casos puntuales">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* El mar entre Chile y el extranjero */}
          <g opacity={ac(t, 0.2, 0.8)}>
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M ${470 + k * 90} 130 ${Array.from({ length: 9 }, (_, j) => `Q ${490 + k * 90 + 20 * Math.sin(t + k + j)} ${170 + j * 76} ${470 + k * 90} ${208 + j * 76}`).join(' ')}`} fill="none" stroke="#60a5fa" strokeWidth={10} opacity={0.35} strokeLinecap="round" />
            ))}
            <BaseDatos x={180} y={340} c={c} t={t} s={0.9} marca={`url(#${ID}-marca)`} />
            <Txt f="a" x={180} y={540} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>Chile</Txt>
            <Nube x={1030} y={440} c={c} />
            <Txt f="a" x={1030} y={540} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>extranjero</Txt>
          </g>

          {/* Antes de los puentes: los datos cruzan sin más */}
          {t > M('transfer') && t < M('adecuado') && [0, 1].map((k) => {
            const u = ((t - M('transfer')) * 0.4 + k / 2) % 1;
            return <rect key={k} x={lerp(260, 940, u) - 14} y={420 - Math.sin(Math.PI * u) * 60 - 14} width={28} height={28} rx={6} fill={NARANJA} opacity={Math.sin(Math.PI * u) * (1 - ac(t, M('tres'), M('tres') + 0.5))} />;
          })}

          {/* Tres puentes */}
          {PUENTES.map((p, k) => {
            const contorno = ac(t, M('tres') + k * 0.3, M('tres') + 0.6 + k * 0.3);
            const enc = ac(t, M(p.n), M(p.n) + 0.8);
            if (contorno < 0.01) return null;
            return (
              <g key={p.n}>
                <path d={`M ${X0} ${p.y} Q 620 ${p.y - 50} ${X1} ${p.y}`} fill="none" stroke={enc > 0.5 ? NARANJA : c.apagado} strokeWidth={enc > 0.5 ? 12 : 6} strokeDasharray={enc > 0.5 ? undefined : '12 10'} strokeLinecap="round" opacity={contorno} />
                <Txt f="a" x={620} y={p.y - 46} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={enc}>{p.txt}</Txt>
                {enc > 0.5 && [0, 1].map((j) => {
                  const u = ((t - M(p.n)) * 0.45 + j / 2) % 1;
                  const x = lerp(X0, X1, u);
                  const parar = barrera > 0.5 && x > 600;
                  return <rect key={j} x={(parar ? 580 : x) - 13} y={p.y - 4 * Math.sin(Math.PI * u) * 12 - 13 - 6} width={26} height={26} rx={6} fill={NARANJA} opacity={Math.sin(Math.PI * u)} />;
                })}
                {barrera > 0.01 && <rect x={606} y={p.y - 70} width={18} height={90} rx={9} fill={ROSA} opacity={barrera} />}
              </g>
            );
          })}

          {/* Sin garantías: un sendero estrecho, una sola transferencia puntual */}
          {(() => {
            const op = e('especificas');
            if (op < 0.01) return null;
            const u = ac(t, M('especificas') + 0.6, M('especificas') + 3);
            return (
              <g opacity={op}>
                <path d={`M ${X0} 740 L ${X1} 740`} stroke={c.tenue} strokeWidth={4} strokeDasharray="4 10" strokeLinecap="round" />
                <Txt f="a" x={620} y={712} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>puntual</Txt>
                {u > 0 && u < 1 && <rect x={lerp(X0, X1, u) - 11} y={729} width={22} height={22} rx={5} fill={NARANJA} />}
              </g>
            );
          })()}

          <g opacity={e('acreditar')}><Insignia x={180} y={650} texto="acredita" c={c} id={ID} tono="verde" /></g>
          <g opacity={e('gravisima')}><Insignia x={1030} y={650} texto="gravísima" c={c} id={ID} tono="alerta" /></g>
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
