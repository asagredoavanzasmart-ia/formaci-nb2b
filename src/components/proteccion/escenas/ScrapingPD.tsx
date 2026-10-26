import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Contacto, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «El scraping», escena propia. Acto A: un robot araña extrae fichas de páginas web y las lleva a una
 * base: eso ya es tratamiento. Acto B: un ojo («visible») frente a un candado abierto («libre»), con
 * un signo distinto; el diario oficial queda sujeto a la ley y lo público no es una base legal. Acto C:
 * un filtro deja pasar solo lo necesario, rechaza el dato viejo y el sensible, y la base queda bajo
 * secreto. Acto D: el registro de infracciones, gravísimo si se extrae en masa, y la evaluación de impacto.
 */

export const W = 1200, H = 860;
const ID = 'pdw';

const nombres = ['scraping', 'tratamiento', 'visible', 'publica', 'noFuente', 'proporcion', 'calidad', 'secreto', 'sensibles', 'registros', 'impacto', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

/* Ventana de navegador con su contenido. */
const Navegador: React.FC<{ x: number; y: number; c: Tono; id: string }> = ({ x, y, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-90} width={300} height={180} rx={16} fill={c.panel} style={sombra(c.sombra, 5, 12)} />
    <path d="M -150 -74 Q -150 -90 -134 -90 H 134 Q 150 -90 150 -74 V -56 H -150 Z" fill={c.apagado} />
    {[0, 1, 2].map((k) => <circle key={k} cx={-128 + k * 18} cy={-73} r={5} fill={c.panel} />)}
    <Contacto x={-90} y={-14} s={0.9} relleno={`url(#${id}-marca)`} />
    <Contacto x={-90} y={44} s={0.9} relleno={c.tenue} />
    {[-24, -6, 34, 52].map((yy) => <rect key={yy} x={-40} y={yy} width={150} height={10} rx={5} fill={c.apagado} />)}
  </g>
);

/* Robot araña del scraping. */
const Arana: React.FC<{ x: number; y: number; t: number; id: string }> = ({ x, y, t, id }) => (
  <g transform={`translate(${x} ${y + Math.sin(t * 2) * 6})`}>
    {[-1, 1].map((l) => [0, 1, 2].map((k) => {
      const a = (k - 1) * 0.5 + Math.sin(t * 6 + k) * 0.08;
      return <path key={`${l}${k}`} d={`M 0 0 Q ${l * 60} ${-30 + k * 30} ${l * (90 + 10 * Math.cos(a))} ${-10 + k * 40 + 20 * a}`} fill="none" stroke={NARANJA} strokeWidth={7} strokeLinecap="round" />;
    }))}
    <ellipse rx={46} ry={38} fill={`url(#${id}-marca)`} />
    <circle cx={-14} cy={-6} r={8} fill="#fff" />
    <circle cx={14} cy={-6} r={8} fill="#fff" />
  </g>
);

/* Ojo que mira: lo visible. */
const Ojo: React.FC<{ x: number; y: number; c: Tono; t: number }> = ({ x, y, c, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -90 0 Q 0 -70 90 0 Q 0 70 -90 0 Z" fill={c.panel} stroke={c.texto} strokeWidth={6} />
    <circle cx={10 * Math.sin(t)} r={30} fill={NARANJA} />
    <circle cx={10 * Math.sin(t)} r={13} fill={c.texto} />
  </g>
);

/* Embudo filtro. */
const Filtro: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -110 -80 L -24 30 V 80 H 24 V 30 L 110 -80 Z" fill={c.apagado} />
    <ellipse cx={0} cy={-80} rx={110} ry={26} fill={c.panel2} />
    {[-60, -20, 20, 60].map((xx) => <line key={xx} x1={xx} y1={-90} x2={xx} y2={-70} stroke={c.tenue} strokeWidth={4} />)}
  </g>
);

export const ScrapingPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('impacto') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Bases armadas desde la web'], [M('scraping'), 'Eso es scraping'], [M('tratamiento'), 'Extraer, ordenar y cruzar es tratamiento'],
    [M('visible'), 'Visible no es libre'], [M('publica'), 'Lo público también está sujeto'], [M('noFuente'), 'Ser público no es base legal'],
    [M('proporcion'), 'Solo lo necesario'], [M('calidad'), 'Exactos y actuales'], [M('secreto'), 'Lo combinado, bajo secreto'],
    [M('sensibles'), 'Sensibles: solo si los hizo públicos'], [M('registros'), 'Registros de infracciones: gravísimo'], [M('impacto'), 'Evaluación de impacto antes'],
  ];

  const actoA = ventana(t, -1, M('visible'));
  const actoB = ventana(t, M('visible'), M('proporcion'));
  const actoC = ventana(t, M('proporcion'), M('registros'));
  const actoD = ac(t, M('registros'), M('registros') + 0.4);
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El scraping es tratamiento: un dato visible no es un dato libre; solo lo necesario, exacto y bajo secreto, y evaluación de impacto si es masivo">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO A · el robot araña extrae fichas a una base */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              <g opacity={ac(t, 0.2, 0.8)}><Navegador x={220} y={300} c={c} id={ID} /><Navegador x={250} y={560} c={c} id={ID} /></g>
              <g opacity={e('scraping', -0.6)}><Arana x={600} y={300} t={t} id={ID} /></g>
              <g opacity={e('scraping', -0.2)}><BaseDatos x={980} y={380} c={c} t={t} /></g>
              {t > M('scraping') && [0, 1, 2, 3].map((k) => {
                const u = ((t - M('scraping')) * 0.4 + k / 4) % 1;
                const desde: [number, number] = k % 2 ? [160, 600] : [130, 286];
                const p = u < 0.5 ? [lerp(desde[0], 600, u * 2), lerp(desde[1], 320, u * 2)] : [lerp(600, 960, (u - 0.5) * 2), lerp(320, 420, (u - 0.5) * 2)];
                return <Contacto key={k} x={p[0]} y={p[1]} s={0.8} relleno={`url(#${ID}-marca)`} op={Math.sin(Math.PI * u)} />;
              })}
              <g opacity={e('tratamiento')}><Insignia x={980} y={640} texto="tratamiento" c={c} id={ID} /></g>
            </g>
          )}

          {/* ACTO B · visible no es libre; lo público también queda sujeto */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {(() => {
                const op = ventana(t, M('visible'), M('publica'));
                if (op < 0.01) return null;
                return (
                  <g opacity={op}>
                    <Ojo x={330} y={400} c={c} t={t} />
                    <Txt f="a" x={330} y={530} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>visible</Txt>
                    <Txt x={600} y={400} dominantBaseline="central" textAnchor="middle" fontSize={110} fill={ROSA}>≠</Txt>
                    <g transform="translate(870 410)">
                      <path d="M -30 -20 V -50 A 30 30 0 0 1 30 -50 V -40" fill="none" stroke={c.tenue} strokeWidth={12} />
                      <rect x={-50} y={-24} width={100} height={84} rx={16} fill={c.apagado} />
                    </g>
                    <Txt f="a" x={870} y={530} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>libre</Txt>
                  </g>
                );
              })()}
              {(() => {
                const op = ventana(t, M('publica'), M('proporcion'));
                if (op < 0.01) return null;
                return (
                  <g opacity={op}>
                    <g transform="translate(360 410) rotate(-4)">
                      <rect x={-130} y={-160} width={260} height={320} rx={12} fill={c.panel} style={sombra(c.sombra)} />
                      <rect x={-106} y={-136} width={212} height={34} rx={6} fill={`url(#${ID}-marca)`} />
                      {[0, 1].map((col) => Array.from({ length: 6 }, (_, k) => <rect key={`${col}${k}`} x={-106 + col * 112} y={-80 + k * 36} width={100} height={12} rx={6} fill={c.apagado} />))}
                    </g>
                    <g opacity={Math.min(1, pop(t, M('publica') + 0.8, 0.5)) * (1 - ac(t, M('noFuente') - 0.3, M('noFuente')))}><Insignia x={820} y={410} texto="sujeto a la ley" c={c} id={ID} /></g>
                    <g opacity={Math.min(1, pop(t, M('noFuente'), 0.5))}><Insignia x={820} y={410} texto="no es base legal" c={c} id={ID} tono="alerta" /></g>
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO C · el filtro: solo lo necesario, exacto y no sensible; lo combinado, bajo secreto */}
          {actoC > 0.01 && (
            <g opacity={actoC}>
              <Navegador x={200} y={420} c={c} id={ID} />
              <Filtro x={600} y={430} c={c} />
              <BaseDatos x={1010} y={350} c={c} t={t} s={0.9} marca={`url(#${ID}-marca)`} />
              {[0, 1, 2, 3, 4, 5].map((k) => {
                const u = ((t - M('proporcion')) * 0.35 + k / 6) % 1;
                const pasa = k % 3 === 0; // solo lo necesario cruza el filtro
                const viejo = k === 1 && t > M('calidad'), sensible = k === 2 && t > M('sensibles');
                const x = u < 0.5 ? lerp(320, 600, u * 2) : pasa ? lerp(600, 980, (u - 0.5) * 2) : 600 + (k % 2 ? 1 : -1) * 120 * (u - 0.5);
                const y = u < 0.5 ? lerp(420, 330, u * 2) : pasa ? lerp(330, 420, (u - 0.5) * 2) : 330 + 160 * (u - 0.5) * (u - 0.5) * 4;
                const op = Math.sin(Math.PI * u) * (pasa || u < 0.5 ? 1 : 1 - (u - 0.5) * 2);
                return (
                  <g key={k}>
                    <Contacto x={x} y={y} s={0.8} relleno={viejo ? c.apagado : sensible ? ROSA : `url(#${ID}-marca)`} op={op} />
                    {(viejo || sensible) && u > 0.45 && u < 0.85 && (
                      <g transform={`translate(${x + 34} ${y - 26})`} opacity={op}>
                        <circle r={16} fill={ROSA} />
                        <path d="M -6 -6 L 6 6 M 6 -6 L -6 6" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
                      </g>
                    )}
                  </g>
                );
              })}
              {(() => {
                const s = Math.min(1, pop(t, M('secreto'), 0.5));
                return s > 0.01 ? (
                  <g opacity={s} transform={`translate(1010 640) scale(${0.7 * s})`}>
                    <path d="M -30 -10 V -36 A 30 30 0 0 1 30 -36 V -10" fill="none" stroke={NARANJA} strokeWidth={12} />
                    <rect x={-48} y={-14} width={96} height={80} rx={16} fill={`url(#${ID}-marca)`} />
                    <circle cx={0} cy={18} r={10} fill="#fff" />
                  </g>
                ) : null;
              })()}
            </g>
          )}

          {/* ACTO D · registros de infracciones en masa: gravísimo; evaluación de impacto */}
          {actoD > 0.01 && (
            <g opacity={actoD}>
              <g transform="translate(380 400)">
                <rect x={-150} y={-120} width={300} height={240} rx={18} fill={c.apagado} style={sombra(c.sombra)} />
                <rect x={-136} y={-106} width={272} height={212} rx={10} fill={c.panel2} />
                <line x1={0} y1={-106} x2={0} y2={106} stroke={c.apagado} strokeWidth={6} />
                {[0, 1].map((col) => Array.from({ length: 5 }, (_, k) => <rect key={`${col}${k}`} x={-118 + col * 140} y={-80 + k * 36} width={98} height={10} rx={5} fill={c.tenue} />))}
                {/* Mazo */}
                <g transform={`translate(160 -110) rotate(${-30 + 30 * Math.max(0, Math.sin((t - M('registros')) * 4))})`}>
                  <rect x={-12} y={0} width={24} height={110} rx={8} fill="#92400e" />
                  <rect x={-50} y={-30} width={100} height={46} rx={12} fill="#b45309" />
                </g>
              </g>
              <g opacity={Math.min(1, pop(t, M('registros') + 0.6, 0.5))}><Insignia x={850} y={400} texto="gravísima" c={c} id={ID} tono="alerta" /></g>
              <g opacity={Math.min(1, pop(t, M('impacto'), 0.5))}><Insignia x={600} y={670} texto="evaluación de impacto" c={c} id={ID} tono="verde" /></g>
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
