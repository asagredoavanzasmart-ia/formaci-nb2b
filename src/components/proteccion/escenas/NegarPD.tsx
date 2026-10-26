import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, tono } from '../../remotion/comun';
import { Hoja, Insignia, MIN_TXT, PanelPregunta, Reloj, Rotulo, lerp } from './comunPD';

/**
 * «Cuándo se puede negar», escena propia. Una balanza: en el plato «suprimir» caen los seis casos en
 * que procede; en el plato «conservar», las excepciones (obligación legal o contrato, salud pública,
 * reclamaciones). La balanza se inclina según el peso. Una pausa en el eje representa el bloqueo, y al
 * final la negativa fundada con su plazo y la insignia de infracción grave.
 */

export const W = 1200, H = 860;
const ID = 'pdn';

const nombres = ['procede', 'noProcede', 'legal', 'salud', 'reclamacion', 'bloqueo', 'fundada', 'grave', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const PX = 600, PY = 260, L = 290;

export const NegarPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('grave') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'No toda solicitud es un sí'], [M('procede'), 'Seis casos en que se suprime'], [M('noProcede'), 'Y casos en que no'],
    [M('legal'), 'Por ley o por contrato'], [M('salud'), 'Por salud pública'], [M('reclamacion'), 'Para una reclamación'],
    [M('bloqueo'), 'O se pide el bloqueo'], [M('fundada'), 'Toda negativa, fundada'], [M('grave'), 'No responder un bloqueo: grave'],
  ];
  // Pesos de cada plato: seis casos a la izquierda; excepciones a la derecha.
  const izq = Array.from({ length: 6 }, (_, k) => ac(t, M('procede') + 1 + k * 3.4, M('procede') + 1.6 + k * 3.4));
  const der = [M('noProcede') + 0.5, M('legal'), M('salud'), M('reclamacion')].map((a) => ac(t, a, a + 0.6));
  const peso = izq.reduce((a, b) => a + b, 0) - der.reduce((a, b) => a + b, 0) * 1.6;
  const ang = Math.max(-14, Math.min(14, peso * 3)) * ac(t, M('procede'), M('procede') + 1, 0, 1, Easing.out(Easing.back(1.4)));
  const rad = (ang * Math.PI) / 180;
  const ext = (lado: -1 | 1) => [PX + lado * L * Math.cos(rad), PY + lado * L * Math.sin(rad) * -1 * -1] as [number, number];
  const [lx, ly] = ext(-1), [rx, ry] = ext(1);

  const plato = (x: number, y: number, n: number, pesos: number[], color: string) => (
    <g>
      <line x1={x} y1={y} x2={x - 70} y2={y + 90} stroke={c.tenue} strokeWidth={4} />
      <line x1={x} y1={y} x2={x + 70} y2={y + 90} stroke={c.tenue} strokeWidth={4} />
      <path d={`M ${x - 100} ${y + 90} H ${x + 100} Q ${x + 90} ${y + 120} ${x} ${y + 120} Q ${x - 90} ${y + 120} ${x - 100} ${y + 90} Z`} fill={c.apagado} />
      {pesos.slice(0, n).map((u, k) => {
        const col = k % 3, fil = Math.floor(k / 3);
        return u > 0.01 ? <rect key={k} x={x - 66 + col * 46} y={y + 46 - fil * 44 - (1 - u) * 40} width={40} height={40} rx={8} fill={color} opacity={u} /> : null;
      })}
    </g>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La supresión procede en seis casos y no procede en otros; toda negativa debe ser fundada">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          <g opacity={ac(t, M('procede') - 0.4, M('procede') + 0.3)}>
            <path d={`M ${PX - 40} 560 L ${PX} ${PY} L ${PX + 40} 560 Z`} fill={c.apagado} />
            <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={c.tenue} strokeWidth={12} strokeLinecap="round" />
            {plato(lx, ly, 6, izq, NARANJA)}
            {plato(rx, ry, 4, der, '#64748b')}
            {/* Eje: con el bloqueo, una pausa */}
            {t < M('bloqueo')
              ? <circle cx={PX} cy={PY} r={16} fill={NARANJA} />
              : <g transform={`translate(${PX} ${PY})`}><circle r={34} fill={ROSA} /><rect x={-14} y={-16} width={10} height={32} rx={3} fill="#fff" /><rect x={4} y={-16} width={10} height={32} rx={3} fill="#fff" /></g>}
            <Txt f="a" x={PX - L} y={600} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>suprimir</Txt>
            <Txt f="a" x={PX + L} y={600} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={ac(t, M('noProcede'), M('noProcede') + 0.6)}>conservar</Txt>
          </g>

          {/* La negativa fundada, con su plazo */}
          {(() => {
            const op = Math.min(1, pop(t, M('fundada'), 0.5));
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                <Hoja x={360} y={730} w={150} h={170} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={ac(t, M('fundada'), M('fundada') + 1.4)} />
                <Insignia x={640} y={700} texto="fundada" c={c} id={ID} tono="verde" />
                <Reloj x={900} y={700} r={46} t={t} c={c} />
              </g>
            );
          })()}
          <g opacity={Math.min(1, pop(t, M('grave'), 0.5))}><Insignia x={640} y={800} texto="grave" c={c} id={ID} tono="alerta" /></g>
          {lerp && null}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
