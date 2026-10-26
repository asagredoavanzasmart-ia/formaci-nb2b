import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Reutilizar una base», escena propia. Entre la base antigua y la campaña nueva hay un muro: la
 * finalidad informada. Tiene cuatro salidas que se encienden al nombrarse (compatible, contrato, nuevo
 * permiso, ley) y por cada una pasa un pulso de datos. Si se cruza fuera de ellas, el muro se rompe en
 * rojo: grave, y gravísima si es malicioso. Al final la base lleva su etiqueta con la finalidad y una
 * lupa compara la etiqueta con la campaña antes de usarla.
 */

export const W = 1200, H = 860;
const ID = 'pdu';

const nombres = ['reutilizar', 'distintos', 'cuatro', 'compatible', 'relacion', 'nuevamente', 'ley', 'grave', 'maliciosa', 'viajar', 'comprobar', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const DB: [number, number] = [190, 400], CAMP: [number, number] = [1030, 455], MURO = 600;
/* Salidas del muro: la etiqueta va arriba en las que quedan sobre la campaña y abajo en las de abajo. */
const SALIDAS: { n: Nombre; txt: string; y: number; arriba: boolean }[] = [
  { n: 'compatible', txt: 'compatible', y: 220, arriba: true }, { n: 'relacion', txt: 'contrato', y: 370, arriba: true },
  { n: 'nuevamente', txt: 'nuevo permiso', y: 560, arriba: false }, { n: 'ley', txt: 'ley', y: 710, arriba: false },
];
const HUECO = 34; // media altura de cada salida

/* Pieza de campaña nueva (aviso). */
const Campana: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-86} y={-56} width={172} height={112} rx={18} fill={c.panel} style={sombra(c.sombra, 6, 12)} />
    <rect x={-72} y={-44} width={144} height={56} rx={10} fill={`url(#${ID}-marca)`} opacity={0.85} />
    <path d="M -54 2 L -30 -22 L -12 -6 L 4 -18 L 30 2 Z" fill="#fff" opacity={0.5} />
    <rect x={-72} y={24} width={80} height={10} rx={5} fill={c.apagado} />
    <circle cx={56} cy={29} r={9} fill={ROSA} />
  </g>
);

/* Etiqueta de equipaje con la finalidad, colgada de la base. */
const Etiqueta: React.FC<{ x: number; y: number; c: Tono; id: string; giro: number }> = ({ x, y, c, id, giro }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    <path d="M 0 0 L 0 46" stroke={c.tenue} strokeWidth={4} />
    <path d="M -130 46 H 110 L 140 86 L 110 126 H -130 Z" fill={c.panel} stroke={`url(#${id}-marca)`} strokeWidth={5} />
    <circle cx={112} cy={86} r={8} fill={c.tenue} />
    <Txt f="a" x={-112} y={86} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>finalidad</Txt>
  </g>
);

export const ReutilizarPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('comprobar') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Una base antigua, una campaña nueva'], [M('distintos'), 'Fines distintos: no'], [M('cuatro'), 'Cuatro salidas'],
    [M('compatible'), 'Un fin compatible'], [M('relacion'), 'Una relación contractual'], [M('nuevamente'), 'Un nuevo consentimiento'],
    [M('ley'), 'Que lo disponga la ley'], [M('grave'), 'Fuera de ellas: grave'], [M('maliciosa'), 'Malicioso: gravísima'],
    [M('viajar'), 'La finalidad viaja con la base'], [M('comprobar'), '¿El nuevo uso cabe?'],
  ];

  const escena = ventana(t, -1, M('viajar'));
  const final = ac(t, M('viajar'), M('viajar') + 0.4);
  const muroOp = ac(t, M('distintos'), M('distintos') + 0.6);
  const salidasOp = 1 - ac(t, M('grave') - 0.3, M('grave'));
  const rompe = ac(t, M('grave') + 0.3, M('grave') + 1);

  // Pulso de datos por la salida activa (una a la vez, hasta que entra la siguiente).
  const fines = SALIDAS.map((s, k) => (k < SALIDAS.length - 1 ? M(SALIDAS[k + 1].n) : M('grave')));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una base no se usa para fines distintos salvo cuatro salidas: fin compatible, relación contractual, nuevo consentimiento o ley; fuera de ellas es grave">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {escena > 0.01 && (
            <g opacity={escena}>
              <g opacity={Math.min(1, pop(t, M('reutilizar') - 0.4, 0.6))}><BaseDatos x={DB[0]} y={DB[1] - 60} c={c} t={t} /></g>
              <g opacity={Math.min(1, pop(t, M('reutilizar') + 0.4, 0.6))}><Campana x={CAMP[0]} y={CAMP[1]} c={c} /></g>

              {/* Muro de la finalidad, con sus cuatro salidas */}
              {muroOp > 0.01 && (
                <g opacity={muroOp}>
                  {(() => {
                    const bordes = [150, ...SALIDAS.flatMap((s) => [s.y - HUECO, s.y + HUECO]), 780];
                    const tramos: [number, number][] = [];
                    for (let i = 0; i < bordes.length; i += 2) tramos.push([bordes[i], bordes[i + 1]]);
                    return tramos.map(([a, b], k) => {
                      // Mientras no se nombran las salidas, el muro está cerrado entero.
                      const cerrado = 1 - ac(t, M('cuatro'), M('cuatro') + 0.8);
                      const y0 = k === 0 ? a : a - HUECO * cerrado, y1 = k === tramos.length - 1 ? b : b + HUECO * cerrado;
                      const grieta = k === 2 ? rompe : 0;
                      return <rect key={k} x={MURO - 22} y={y0} width={44} height={Math.max(0, y1 - y0)} rx={8} fill={grieta > 0.5 ? ROSA : c.tenue} opacity={1 - 0.4 * grieta} />;
                    });
                  })()}
                </g>
              )}

              {/* Salidas: se encienden al nombrarse y pasa un pulso de datos */}
              {salidasOp > 0.01 && SALIDAS.map((s, k) => {
                const e = Math.min(1, pop(t, M(s.n), 0.5));
                if (e < 0.01) return null;
                const pasa = ventana(t, M(s.n), fines[k]);
                const u = ((t - M(s.n)) * 0.55) % 1;
                const p = u < 0.5
                  ? [lerp(DB[0] + 80, MURO, u * 2), lerp(DB[1], s.y, u * 2)]
                  : [lerp(MURO, CAMP[0] - 90, (u - 0.5) * 2), lerp(s.y, CAMP[1], (u - 0.5) * 2)];
                return (
                  <g key={s.n} opacity={salidasOp}>
                    <g opacity={pasa}>
                      <path d={`M ${DB[0] + 80} ${DB[1]} Q ${MURO - 200} ${s.y} ${MURO} ${s.y} Q ${MURO + 200} ${s.y} ${CAMP[0] - 90} ${CAMP[1]}`} fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="10 9" />
                      <circle cx={p[0]} cy={p[1]} r={11} fill={NARANJA} opacity={Math.sin(Math.PI * u)} />
                    </g>
                    <rect x={MURO - 8} y={s.y - HUECO + 6} width={16} height={HUECO * 2 - 12} rx={8} fill={VERDE} opacity={e} />
                    <Txt f="a" x={MURO + 36} y={s.arriba ? s.y - 44 : s.y + 64} fontSize={MIN_TXT} fill={c.texto} opacity={e}>{s.txt}</Txt>
                  </g>
                );
              })}

              {/* Fuera de las salidas: el muro se rompe */}
              {rompe > 0.01 && (() => {
                const u = ((t - M('grave') - 0.3) * 0.5) % 1;
                const etiqueta = t < M('maliciosa') ? 'grave' : 'gravísima';
                return (
                  <g>
                    <path d={`M ${DB[0] + 80} ${DB[1]} Q ${MURO - 150} 455 ${MURO} 455 L ${CAMP[0] - 90} ${CAMP[1]}`} fill="none" stroke={ROSA} strokeWidth={6} strokeDasharray="10 9" opacity={rompe} />
                    <circle cx={u < 0.5 ? lerp(DB[0] + 80, MURO, u * 2) : lerp(MURO, CAMP[0] - 90, (u - 0.5) * 2)} cy={u < 0.5 ? lerp(DB[1], 455, u * 2) : 455} r={11} fill={ROSA} opacity={Math.sin(Math.PI * u) * rompe} />
                    {[0, 1, 2].map((k) => <rect key={k} x={MURO - 20 + k * 14} y={480 + k * 26 + 60 * rompe} width={14} height={14} rx={3} fill={c.tenue} opacity={1 - rompe * 0.6} transform={`rotate(${30 * rompe * (k - 1)} ${MURO} 500)`} />)}
                    <g opacity={Math.min(1, pop(t, M('grave') + 0.8, 0.5))}><Insignia x={CAMP[0] - 10} y={600} texto={etiqueta} c={c} id={ID} tono="alerta" ancho={250} /></g>
                  </g>
                );
              })()}
            </g>
          )}

          {/* La finalidad viaja con la base y se compara con el nuevo uso */}
          {final > 0.01 && (
            <g opacity={final}>
              <BaseDatos x={300} y={300} c={c} t={t} />
              <Etiqueta x={350} y={430} c={c} id={ID} giro={Math.sin(t * 1.8) * 4} />
              <Campana x={900} y={420} c={c} />
              {(() => {
                const v = ac(t, M('comprobar'), M('comprobar') + 2.4, 0, 1, Easing.inOut(Easing.cubic));
                const op = ac(t, M('comprobar'), M('comprobar') + 0.4);
                if (op < 0.01) return null;
                const x = v < 0.5 ? lerp(300, 330, v * 2) : lerp(330, 880, (v - 0.5) * 2), y = v < 0.5 ? 640 : lerp(640, 600, (v - 0.5) * 2);
                return (
                  <g opacity={op}>
                    <g transform={`translate(${x} ${y})`}>
                      <circle r={42} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={11} />
                      <line x1={30} y1={30} x2={62} y2={62} stroke={c.texto} strokeWidth={13} strokeLinecap="round" />
                    </g>
                    <g opacity={Math.min(1, pop(t, M('comprobar') + 2.4, 0.5))}><Insignia x={900} y={720} texto="¿cabe?" c={c} id={ID} ancho={200} /></g>
                  </g>
                );
              })()}
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
