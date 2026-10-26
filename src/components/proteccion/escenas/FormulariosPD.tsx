import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «El consentimiento en el formulario», escena propia. A la izquierda, un formulario que gana una
 * casilla por finalidad (cotización, publicidad, terceros); un cursor marca una casilla vacía: la acción
 * afirmativa clara. A la derecha, la compra encadenada a la publicidad se tacha (no es libre) y aparece la
 * excepción. Luego, el alta y la baja con un solo clic, y una casilla nueva antes de ceder a un tercero.
 */

export const W = 1200, H = 860;
const ID = 'pdf';

const nombres = ['finalidades', 'cotizacion', 'publicidad', 'tercero', 'afirmativa', 'presume', 'condicionar', 'excepcion', 'clic', 'baja', 'cesion', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const FILAS: { n: Nombre; txt: string; y: number }[] = [
  { n: 'cotizacion', txt: 'cotización', y: 400 }, { n: 'publicidad', txt: 'publicidad', y: 490 },
  { n: 'tercero', txt: 'terceros', y: 580 }, { n: 'cesion', txt: 'ceder', y: 670 },
];

/* Casilla de verificación que se marca con `marca` de 0 a 1. */
const Casilla: React.FC<{ x: number; y: number; marca: number; c: Tono; s?: number }> = ({ x, y, marca, c, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-22} width={44} height={44} rx={10} fill={marca > 0.5 ? VERDE : c.panel} stroke={marca > 0.5 ? VERDE : c.tenue} strokeWidth={4} />
    <path d="M -11 0 L -3 9 L 12 -10" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - marca} />
  </g>
);

/* Puntero del mouse. */
const Cursor: React.FC<{ x: number; y: number; clic: number; c: Tono }> = ({ x, y, clic, c }) => (
  <g transform={`translate(${x} ${y}) scale(${1 - 0.15 * clic})`}>
    <path d="M 0 0 L 0 46 L 12 34 L 22 56 L 32 51 L 22 30 L 38 30 Z" fill={c.texto} stroke={c.panel} strokeWidth={3} strokeLinejoin="round" />
  </g>
);

/* Cadena de eslabones horizontal. */
const Cadena: React.FC<{ x1: number; x2: number; y: number; u: number; color: string }> = ({ x1, x2, y, u, color }) => {
  const n = Math.max(1, Math.floor((x2 - x1) / 34));
  return <g>{Array.from({ length: Math.round(n * u) }, (_, k) => <ellipse key={k} cx={x1 + 17 + k * 34} cy={y} rx={20} ry={11} fill="none" stroke={color} strokeWidth={6} />)}</g>;
};

export const FormulariosPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('cesion') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Del principio al formulario'], [M('finalidades'), 'Una autorización por finalidad'], [M('afirmativa'), 'Una acción afirmativa clara'],
    [M('presume'), 'Se presume que no fue libre'], [M('condicionar'), 'si se condiciona la compra'], [M('excepcion'), 'Excepción: los datos como único pago'],
    [M('clic'), 'Alta con un clic…'], [M('baja'), '…baja con un clic'], [M('cesion'), 'Ceder necesita su propio permiso'],
  ];

  // El cursor va a la casilla de publicidad (vacía) y la marca.
  const vaCursor = ac(t, M('afirmativa'), M('afirmativa') + 1.2, 0, 1, Easing.inOut(Easing.cubic));
  const clicCursor = ac(t, M('afirmativa') + 1.2, M('afirmativa') + 1.4) * (1 - ac(t, M('afirmativa') + 1.4, M('afirmativa') + 1.7));
  const marcada = ac(t, M('afirmativa') + 1.3, M('afirmativa') + 1.8);
  const cursorOp = ventana(t, M('afirmativa'), M('afirmativa') + 3.2);

  const derB = ventana(t, M('presume'), M('clic'));
  const derC = ac(t, M('clic'), M('clic') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una casilla por finalidad, marcada por la persona; no se condiciona la compra; la baja es tan fácil como el alta">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Formulario */}
          <g opacity={ac(t, 0.2, 0.8)}>
            <rect x={60} y={130} width={500} height={640} rx={30} fill={c.panel} style={sombra(c.sombra)} />
            <path d="M 60 160 Q 60 130 90 130 H 530 Q 560 130 560 160 V 196 H 60 Z" fill={`url(#${ID}-marca)`} />
            <circle cx={100} cy={163} r={9} fill="#fff" opacity={0.8} />
            <circle cx={130} cy={163} r={9} fill="#fff" opacity={0.6} />
            {[240, 310].map((y) => <rect key={y} x={100} y={y - 24} width={420} height={48} rx={12} fill={c.panel2} />)}
            {[240, 310].map((y, k) => <rect key={`l${y}`} x={120} y={y - 6} width={k ? 200 : 140} height={12} rx={6} fill={c.apagado} />)}
            {FILAS.map((f) => {
              const e = Math.min(1, pop(t, M(f.n), 0.5));
              if (e < 0.01) return null;
              const m = f.n === 'publicidad' ? marcada : 0;
              return (
                <g key={f.n} opacity={e} transform={`translate(${(1 - e) * -20} 0)`}>
                  <Casilla x={130} y={f.y} marca={m} c={c} />
                  <Txt f="a" x={172} y={f.y} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{f.txt}</Txt>
                </g>
              );
            })}
          </g>
          {cursorOp > 0.01 && <g opacity={cursorOp}><Cursor x={lerp(470, 140, vaCursor)} y={lerp(720, 495, vaCursor)} clic={clicCursor} c={c} /></g>}

          {/* Derecha, acto B: la compra encadenada a la publicidad no es libre; la excepción */}
          {derB > 0.01 && (
            <g opacity={derB}>
              {(() => {
                const e = Math.min(1, pop(t, M('presume'), 0.5));
                const cadena = ac(t, M('presume') + 0.4, M('presume') + 1.4);
                const tacha = ac(t, M('condicionar'), M('condicionar') + 0.6);
                return (
                  <g opacity={e}>
                    <rect x={650} y={256} width={190} height={88} rx={22} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 5, 10)} />
                    <Txt f="a" x={745} y={300} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>comprar</Txt>
                    <Cadena x1={848} x2={1050} y={300} u={cadena} color={tacha > 0.5 ? ROSA : c.tenue} />
                    <Casilla x={1100} y={300} marca={1} c={c} s={1.3} />
                    {tacha > 0.01 && <line x1={860} y1={250} x2={lerp(860, 1040, tacha)} y2={350} stroke={ROSA} strokeWidth={8} strokeLinecap="round" />}
                    <g opacity={Math.min(1, pop(t, M('condicionar') + 0.5, 0.5))}><Insignia x={905} y={430} texto="no es libre" c={c} id={ID} tono="alerta" /></g>
                  </g>
                );
              })()}
              {(() => {
                const e = Math.min(1, pop(t, M('excepcion'), 0.5));
                if (e < 0.01) return null;
                return (
                  <g opacity={e}>
                    {/* Regalo: un beneficio cuyo único precio son los datos */}
                    <g transform="translate(760 640)">
                      <rect x={-70} y={-50} width={140} height={110} rx={12} fill={`url(#${ID}-marca)`} />
                      <rect x={-84} y={-80} width={168} height={40} rx={10} fill={NARANJA} />
                      <rect x={-12} y={-80} width={24} height={140} fill="#fff" opacity={0.85} />
                      <path d="M 0 -80 C -30 -120 -60 -96 -36 -82 M 0 -80 C 30 -120 60 -96 36 -82" fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" />
                    </g>
                    <Insignia x={1010} y={640} texto="excepción" c={c} id={ID} tono="verde" />
                  </g>
                );
              })()}
            </g>
          )}

          {/* Derecha, acto C: alta y baja con un clic; luego, ceder pide su propia casilla */}
          {derC > 0.01 && (
            <g opacity={derC}>
              {(() => {
                const on = ac(t, M('clic') + 0.6, M('clic') + 1) * (1 - ac(t, M('baja') + 0.6, M('baja') + 1));
                const pulso = (a: number) => ac(t, a, a + 0.2) * (1 - ac(t, a + 0.2, a + 0.5));
                return (
                  <g opacity={ventana(t, M('clic'), M('cesion') + 0.2)}>
                    <g transform="translate(880 330)">
                      <rect x={-130} y={-58} width={260} height={116} rx={58} fill={on > 0.5 ? `url(#${ID}-marca)` : c.apagado} />
                      <circle cx={lerp(-70, 70, on)} cy={0} r={46} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
                    </g>
                    <Cursor x={lerp(780, 960, on)} y={350 + 10 * (pulso(M('clic') + 0.4) + pulso(M('baja') + 0.4))} clic={pulso(M('clic') + 0.4) + pulso(M('baja') + 0.4)} c={c} />
                    <Txt f="a" x={880} y={480} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={ac(t, M('clic'), M('clic') + 0.5)}>alta: 1 clic</Txt>
                    <Txt f="a" x={880} y={545} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={ac(t, M('baja'), M('baja') + 0.5)}>baja: 1 clic</Txt>
                  </g>
                );
              })()}
              {(() => {
                const e = ac(t, M('cesion') + 0.2, M('cesion') + 0.7);
                if (e < 0.01) return null;
                const d = ac(t, M('cesion') + 0.4, M('cesion') + 1.4);
                return (
                  <g opacity={e}>
                    <path d={`M 590 670 L ${lerp(590, 860, d)} 670`} stroke={NARANJA} strokeWidth={6} strokeDasharray="12 10" strokeLinecap="round" />
                    <path d="M 860 652 L 884 670 L 860 688 Z" fill={NARANJA} opacity={d} />
                    <Oficinas x={990} y={770} s={0.6} c={c} t={t} ventana="#94a3b8" />
                    <Txt f="a" x={990} y={360} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue} opacity={0}>tercero</Txt>
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
