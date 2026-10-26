import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Contacto, ESCUDO, Insignia, Oficinas, PanelPregunta, Rotulo } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Síntesis», escena propia. Un dato al centro: antes bastaba con preguntar si servía; ahora lo rodean
 * siete preguntas, cada una con su dibujo (origen, finalidad, responsable, plazo, acceso, protección y
 * devolución). Luego el cliente y la agencia que siguen trabajando juntos, y el calendario del 1 de
 * diciembre de 2026.
 */

export const W = 1200, H = 860;
const ID = 'pds2';

const nombres = ['antes', 'donde', 'para', 'quien', 'cuanto', 'accede', 'protege', 'devuelve', 'seguir', 'plazo', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const CX = 600, CY = 450, R = 250;
const PREGUNTAS: Nombre[] = ['donde', 'para', 'quien', 'cuanto', 'accede', 'protege', 'devuelve'];

const Icono: React.FC<{ n: Nombre; t: number; c: Tono; id: string }> = ({ n, t, c, id }) => {
  if (n === 'donde') return <g transform="translate(0 18)"><path d="M 0 0 C -9 -18 -28 -26 -28 -46 A 28 28 0 0 1 28 -46 C 28 -26 9 -18 0 0 Z" fill={`url(#${id}-marca)`} /><circle cx={0} cy={-46} r={10} fill="#fff" /></g>;
  if (n === 'para') return <g>{[30, 20, 10].map((r, k) => <circle key={r} r={r} fill={k % 2 ? c.panel : `url(#${id}-marca)`} />)}</g>;
  if (n === 'quien') return <g><circle cy={-14} r={14} fill={`url(#${id}-cara)`} /><path d="M -22 26 Q -22 4 0 4 Q 22 4 22 26 Z" fill={`url(#${id}-marca)`} /></g>;
  if (n === 'cuanto') return <g><circle r={28} fill={c.panel} stroke={c.tenue} strokeWidth={5} /><line x1={0} y1={0} x2={0} y2={-18} stroke={c.texto} strokeWidth={4} strokeLinecap="round" transform={`rotate(${t * 200})`} /><circle r={4} fill={c.texto} /></g>;
  if (n === 'accede') return <g transform="rotate(-30)"><circle cx={-16} cy={0} r={13} fill="none" stroke={NARANJA} strokeWidth={6} /><rect x={-4} y={-4} width={34} height={8} rx={3} fill={NARANJA} /><rect x={18} y={2} width={6} height={10} fill={NARANJA} /></g>;
  if (n === 'protege') return <path d={ESCUDO} transform="scale(0.7)" fill={`url(#${id}-marca)`} />;
  return <g transform={`rotate(${-t * 90})`}><path d="M 18 -14 A 24 24 0 1 0 22 10" fill="none" stroke={ROSA} strokeWidth={6} strokeLinecap="round" /><path d="M 12 -26 L 26 -14 L 8 -6 Z" fill={ROSA} /></g>;
};

export const SintesisPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('plazo') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Lo que cambia la ley'], [M('antes'), 'Antes: ¿el dato sirve?'], [M('donde'), 'Ahora: siete preguntas por dato'],
    [M('seguir'), 'Así se sigue trabajando con los clientes'], [M('plazo'), 'Hasta el 1 de diciembre de 2026'],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cada dato responde de dónde salió, para qué, quién responde, cuánto dura, quién accede, cómo se protege y cómo se devuelve">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          <g opacity={ac(t, 0.2, 0.8)}><Contacto x={CX} y={CY} s={3} relleno={`url(#${ID}-marca)`} /></g>
          {(() => {
            const op = Math.min(1, pop(t, M('antes'), 0.5)) * (1 - ac(t, M('donde') - 0.3, M('donde')));
            return op > 0.01 ? <g opacity={op}><Insignia x={CX} y={260} texto="¿sirve?" c={c} id={ID} tono="tenue" /></g> : null;
          })()}
          {/* Siete preguntas alrededor del dato */}
          {PREGUNTAS.map((n, k) => {
            const e = Math.min(1, pop(t, M(n), 0.5));
            if (e < 0.01) return null;
            const a = -Math.PI / 2 + (k / PREGUNTAS.length) * Math.PI * 2;
            const x = CX + Math.cos(a) * R, y = CY + Math.sin(a) * R;
            return (
              <g key={n} opacity={e}>
                <line x1={CX + Math.cos(a) * 110} y1={CY + Math.sin(a) * 75} x2={CX + Math.cos(a) * (R - 60)} y2={CY + Math.sin(a) * (R - 60)} stroke={c.apagado} strokeWidth={4} strokeDasharray="6 8" />
                <g transform={`translate(${x} ${y}) scale(${e})`}>
                  <circle r={54} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                  <Icono n={n} t={t} c={c} id={ID} />
                </g>
              </g>
            );
          })}
          {/* Cliente y agencia siguen trabajando juntos */}
          {(() => {
            const op = Math.min(1, pop(t, M('seguir'), 0.6));
            if (op < 0.01) return null;
            const u = (t - M('seguir')) * 0.5 % 1;
            return (
              <g opacity={op}>
                <Oficinas x={150} y={640} s={0.55} c={c} t={t} ventana="#94a3b8" />
                <Oficinas x={1050} y={640} s={0.55} c={c} t={t} luz={0.8} />
                <circle cx={150 + 0 * u} cy={480} r={0} fill="none" />
                <path d="M 150 700 Q 600 840 1050 700" fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="8 8" />
                <circle cx={150 + 900 * u} cy={700 + Math.sin(Math.PI * u) * 70} r={11} fill={NARANJA} />
              </g>
            );
          })()}
          {/* El calendario del plazo */}
          <g opacity={Math.min(1, pop(t, M('plazo'), 0.6))} transform="translate(1080 190)">
            <rect x={-70} y={-75} width={140} height={150} rx={18} fill={c.panel} style={sombra(c.sombra)} />
            <path d="M -70 -57 Q -70 -75 -52 -75 H 52 Q 70 -75 70 -57 V -30 H -70 Z" fill={`url(#${ID}-marca)`} />
            <Txt x={0} y={-52} dominantBaseline="central" textAnchor="middle" fontSize={24} fill="#fff">DIC</Txt>
            <Txt x={0} y={25} dominantBaseline="central" textAnchor="middle" fontSize={66} fill={c.texto}>1</Txt>
          </g>
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
