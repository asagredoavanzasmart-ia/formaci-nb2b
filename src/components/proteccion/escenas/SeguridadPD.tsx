import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Candado, ESCUDO, Insignia, MIN_TXT, PanelPregunta, Rotulo, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «La seguridad», escena propia. A la izquierda, un escudo con sus cuatro atributos (confidencialidad,
 * integridad, disponibilidad, resiliencia); a la derecha, las cuatro medidas como fichas con su dibujo:
 * cifrado (candado), continuo (pulso), restaurar (flecha que vuelve) y verificar (lista que se marca).
 * Bajo el escudo se alternan un dial que se calibra, la carpeta de evidencia y los estándares por tamaño.
 */

export const W = 1200, H = 860;
const ID = 'pdg2';

const nombres = ['cuatroPilares', 'calibra', 'cifrado', 'permanente', 'restaurar', 'verificar', 'acreditar', 'estandares', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const MEDIDAS: { n: Nombre; txt: string; y: number }[] = [
  { n: 'cifrado', txt: 'cifrado', y: 240 }, { n: 'permanente', txt: 'continuo', y: 380 }, { n: 'restaurar', txt: 'restaurar', y: 520 }, { n: 'verificar', txt: 'verificar', y: 660 },
];

const DibujoMedida: React.FC<{ n: Nombre; t: number; c: Tono; id: string }> = ({ n, t, c, id }) => {
  if (n === 'cifrado') return <Candado x={0} y={6} s={0.5} id={id} />;
  if (n === 'permanente') return <path d={`M -44 0 H -20 L -10 ${-24 * (0.6 + 0.4 * Math.sin(t * 6))} L 4 24 L 14 0 H 44`} fill="none" stroke={ROSA} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />;
  if (n === 'restaurar') return <g transform={`rotate(${-t * 120})`}><path d="M 26 -18 A 32 32 0 1 0 30 12" fill="none" stroke={NARANJA} strokeWidth={7} strokeLinecap="round" /><path d="M 18 -34 L 34 -18 L 14 -10 Z" fill={NARANJA} /></g>;
  const u = (t * 0.5) % 1;
  return <g>{[0, 1, 2].map((k) => <g key={k}><rect x={-34} y={-30 + k * 22} width={14} height={14} rx={3} fill={u * 3 > k ? VERDE : c.apagado} /><rect x={-14} y={-27 + k * 22} width={48} height={8} rx={4} fill={c.apagado} /></g>)}</g>;
};

export const SeguridadPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('estandares') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'De buena práctica a deber legal'], [M('cuatroPilares'), 'Cuatro atributos'], [M('calibra'), 'Según la técnica, el costo y el riesgo'],
    [M('cifrado'), 'Seudonimizar y cifrar'], [M('permanente'), 'Garantía permanente'], [M('restaurar'), 'Restaurar rápido'], [M('verificar'), 'Verificar con regularidad'],
    [M('acreditar'), 'Y poder acreditarlo'], [M('estandares'), 'Estándares según el tamaño'],
  ];
  const letras = ['C', 'I', 'D', 'R'];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Confidencialidad, integridad, disponibilidad y resiliencia, con cifrado, garantía permanente, restauración y verificación">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* El escudo y sus cuatro atributos */}
          <g opacity={ac(t, 0.2, 0.8)} transform="translate(330 400)">
            <path d={ESCUDO} transform="scale(4.8)" fill={c.panel} stroke={`url(#${ID}-marca)`} strokeWidth={2.4} style={sombra(c.sombra)} />
            <line x1={0} y1={-185} x2={0} y2={230} stroke={c.apagado} strokeWidth={4} />
            <line x1={-160} y1={20} x2={160} y2={20} stroke={c.apagado} strokeWidth={4} />
            {letras.map((l, k) => {
              const u = Math.min(1, pop(t, M('cuatroPilares') + 0.4 + k * 0.9, 0.5));
              const x = k % 2 ? 80 : -80, y = k < 2 ? -70 : 110;
              return <Txt key={l} x={x} y={y} dominantBaseline="central" textAnchor="middle" fontSize={70} fill={k % 2 ? ROSA : NARANJA} opacity={u}>{l}</Txt>;
            })}
          </g>

          {/* Bajo el escudo: el dial que calibra, la evidencia y los estándares por tamaño */}
          {(() => {
            const op = ventana(t, M('calibra'), M('acreditar'));
            return op > 0.01 ? (
              <g opacity={op} transform="translate(330 730)">
                <circle r={56} fill={c.panel2} stroke={c.apagado} strokeWidth={5} />
                {Array.from({ length: 9 }, (_, k) => { const a = (-135 + k * 33.75) * Math.PI / 180; return <line key={k} x1={Math.cos(a) * 44} y1={Math.sin(a) * 44} x2={Math.cos(a) * 54} y2={Math.sin(a) * 54} stroke={c.tenue} strokeWidth={4} />; })}
                <line x1={0} y1={0} x2={0} y2={-40} stroke={NARANJA} strokeWidth={8} strokeLinecap="round" transform={`rotate(${-90 + 140 * ((Math.sin(t * 0.8) + 1) / 2)})`} />
              </g>
            ) : null;
          })()}
          {(() => {
            const op = ventana(t, M('acreditar'), M('estandares'));
            return op > 0.01 ? <g opacity={op}><Insignia x={330} y={730} texto="evidencia" c={c} id={ID} tono="verde" /></g> : null;
          })()}
          {(() => {
            const op = ac(t, M('estandares'), M('estandares') + 0.4);
            return op > 0.01 ? <g opacity={op}>{[40, 80, 120].map((h, k) => <rect key={k} x={250 + k * 60} y={790 - h * ac(t, M('estandares') + k * 0.3, M('estandares') + 0.8 + k * 0.3)} width={44} height={h * ac(t, M('estandares') + k * 0.3, M('estandares') + 0.8 + k * 0.3)} rx={8} fill={k === 2 ? `url(#${ID}-marca)` : c.apagado} />)}</g> : null;
          })()}

          {/* Las cuatro medidas */}
          {MEDIDAS.map((m) => {
            const e = Math.min(1, pop(t, M(m.n), 0.5));
            if (e < 0.01) return null;
            return (
              <g key={m.n} opacity={e} transform={`translate(870 ${m.y}) scale(${0.9 + 0.1 * e})`}>
                <rect x={-190} y={-55} width={380} height={110} rx={22} fill={c.panel} style={sombra(c.sombra, 5, 12)} />
                <g transform="translate(-125 0)"><DibujoMedida n={m.n} t={t} c={c} id={ID} /></g>
                <Txt f="a" x={-60} y={0} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{m.txt}</Txt>
              </g>
            );
          })}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
