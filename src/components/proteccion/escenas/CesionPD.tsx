import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Insignia, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Comprar o ceder una base», escena propia. Una base pasa del cedente al cesionario: arriba, las
 * cuatro bases que permiten cederla; al centro, el contrato que se firma por escrito; al llegar, el
 * cesionario recibe la placa de responsable. Si la cesión es nula, el contrato se rompe y la base se
 * disuelve. Al final, trozos de datos públicos se juntan en una base nueva que queda bajo secreto.
 */

export const W = 1200, H = 860;
const ID = 'pdx';

const nombres = ['cesion', 'consentimiento', 'contrato', 'interes', 'ley', 'escrito', 'responsable', 'nula', 'suprimir', 'enriquecer', 'secreto', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const BASES: { n: Nombre; txt: string; x: number; y: number }[] = [
  { n: 'consentimiento', txt: 'consentimiento', x: 330, y: 190 }, { n: 'contrato', txt: 'contrato', x: 870, y: 190 },
  { n: 'interes', txt: 'interés', x: 330, y: 290 }, { n: 'ley', txt: 'ley', x: 870, y: 290 },
];

/* Contrato: una hoja con dos firmas; `rompe` la parte en dos mitades que se separan. */
const Contrato: React.FC<{ c: Tono; id: string; firma: number; rompe: number }> = ({ c, id, firma, rompe }) => {
  const mitad = (lado: -1 | 1) => (
    <g transform={`translate(${lado * 40 * rompe} ${20 * rompe}) rotate(${lado * 14 * rompe})`}>
      <clipPath id={`${id}-m${lado}`}><path d={lado < 0 ? 'M -100 -130 H 6 L -8 -40 L 10 30 L -6 130 H -100 Z' : 'M 6 -130 H 100 V 130 H -6 L 10 30 L -8 -40 Z'} /></clipPath>
      <g clipPath={`url(#${id}-m${lado})`}>
        <rect x={-90} y={-120} width={180} height={240} rx={14} fill={c.panel} />
        <rect x={-90} y={-120} width={180} height={46} rx={14} fill={`url(#${id}-marca)`} />
        {[-50, -24, 2].map((yy) => <rect key={yy} x={-66} y={yy} width={132} height={10} rx={5} fill={c.apagado} />)}
        <path d={`M -66 78 q 10 -18 20 0 t 20 0 t ${20 * firma} 0`} fill="none" stroke={NARANJA} strokeWidth={4} strokeLinecap="round" opacity={firma > 0 ? 1 : 0} />
        <path d={`M 14 78 q 10 -18 20 0 t 20 0 t ${20 * firma} 0`} fill="none" stroke={NARANJA} strokeWidth={4} strokeLinecap="round" opacity={firma > 0.5 ? 1 : 0} />
        <rect x={-66} y={88} width={56} height={4} rx={2} fill={c.tenue} />
        <rect x={14} y={88} width={56} height={4} rx={2} fill={c.tenue} />
      </g>
    </g>
  );
  return <g transform="translate(600 410)" style={sombra(c.sombra)}>{mitad(-1)}{mitad(1)}</g>;
};

/* Trozo de dato público (recorte de periódico). */
const Recorte: React.FC<{ x: number; y: number; rot: number; c: Tono }> = ({ x, y, rot, c }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -40 -30 L 38 -34 L 42 28 L -36 32 Z" fill={c.panel} stroke={c.apagado} strokeWidth={3} />
    {[-16, -2, 12].map((yy) => <rect key={yy} x={-26} y={yy} width={50} height={6} rx={3} fill={c.apagado} />)}
  </g>
);

/* Candado. */
const Candado: React.FC<{ x: number; y: number; s: number; id: string }> = ({ x, y, s, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -10 V -36 A 30 30 0 0 1 30 -36 V -10" fill="none" stroke={NARANJA} strokeWidth={12} />
    <rect x={-48} y={-14} width={96} height={80} rx={16} fill={`url(#${id}-marca)`} />
    <circle cx={0} cy={18} r={10} fill="#fff" />
    <rect x={-4} y={18} width={8} height={24} rx={3} fill="#fff" />
  </g>
);

export const CesionPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('secreto') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Comprar, compartir o recibir'], [M('cesion'), 'La ley lo llama cesión'], [M('consentimiento'), 'Se cede con una base legal'],
    [M('escrito'), 'Y por escrito'], [M('responsable'), 'Quien recibe pasa a ser responsable'], [M('nula'), 'Sin consentimiento: nula'],
    [M('suprimir'), 'y se suprime todo'], [M('enriquecer'), 'Enriquecer con datos públicos…'], [M('secreto'), '…queda bajo secreto'],
  ];

  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const actoAB = ventana(t, -1, M('enriquecer'));
  const actoC = ac(t, M('enriquecer'), M('enriquecer') + 0.4);
  const viaja = ac(t, M('escrito') + 1.6, M('escrito') + 3.6, 0, 1, Easing.inOut(Easing.cubic));
  const rompe = ac(t, M('nula'), M('nula') + 0.8, 0, 1, Easing.out(Easing.back(1.6)));
  const disuelve = ac(t, M('suprimir'), M('suprimir') + 1.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Ceder una base exige una base legal y un contrato escrito; sin el consentimiento necesario la cesión es nula y los datos se suprimen">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {actoAB > 0.01 && (
            <g opacity={actoAB}>
              {/* Cedente y cesionario */}
              <g opacity={e('cesion', -0.4)}>
                <Oficinas x={210} y={660} s={0.8} c={c} t={t} />
                <Txt f="a" x={210} y={750} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>cedente</Txt>
                <Oficinas x={990} y={660} s={0.8} c={c} t={t} ventana="#94a3b8" />
                <Txt f="a" x={990} y={750} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>cesionario</Txt>
              </g>
              {/* Las cuatro bases que permiten ceder */}
              {BASES.map((b) => {
                const op = Math.min(1, pop(t, M(b.n), 0.5)) * (1 - ac(t, M('nula') - 0.3, M('nula')));
                return op > 0.01 ? <g key={b.n} opacity={op}><Insignia x={b.x} y={b.y} texto={b.txt} c={c} id={ID} tono="tenue" /></g> : null;
              })}
              {/* Contrato escrito, que se rompe si la cesión es nula */}
              {(() => {
                const op = Math.min(1, pop(t, M('escrito'), 0.5)) * (1 - ac(t, M('suprimir') + 1, M('suprimir') + 1.6));
                if (op < 0.01) return null;
                return <g opacity={op}><Contrato c={c} id={ID} firma={ac(t, M('escrito') + 0.4, M('escrito') + 1.4)} rompe={rompe} /></g>;
              })()}
              {/* La base viaja y luego se disuelve */}
              {(() => {
                const op = e('cesion', 0.3) * (1 - disuelve);
                const x = lerp(370, 830, viaja);
                return (
                  <g>
                    {op > 0.01 && <g opacity={op}><BaseDatos x={x} y={560} c={c} t={t} s={0.55} marca={`url(#${ID}-marca)`} /></g>}
                    {disuelve > 0 && disuelve < 1 && Array.from({ length: 10 }, (_, k) => {
                      const a = (k / 10) * Math.PI * 2;
                      return <rect key={k} x={830 + Math.cos(a) * 90 * disuelve - 7} y={600 + Math.sin(a) * 60 * disuelve - 80 * disuelve - 7} width={14} height={14} rx={3} fill={NARANJA} opacity={1 - disuelve} />;
                    })}
                  </g>
                );
              })()}
              {/* Placa de responsable para quien recibe */}
              {(() => {
                const op = Math.min(1, pop(t, M('responsable'), 0.5)) * (1 - ac(t, M('nula') - 0.3, M('nula')));
                return op > 0.01 ? <g opacity={op}><Insignia x={990} y={390} texto="responsable" c={c} id={ID} /></g> : null;
              })()}
              <g opacity={Math.min(1, pop(t, M('nula') + 0.4, 0.5))}><Insignia x={600} y={650} texto="nula" c={c} id={ID} tono="alerta" ancho={160} /></g>
            </g>
          )}

          {/* Datos públicos combinados: el resultado queda bajo secreto */}
          {actoC > 0.01 && (
            <g opacity={actoC}>
              {[[150, 200, -12], [1050, 220, 10], [140, 640, 8], [1060, 650, -8], [600, 170, 4]].map(([x, y, r], k) => {
                const u = ac(t, M('enriquecer') + 0.3 + k * 0.25, M('enriquecer') + 1.8 + k * 0.25, 0, 1, Easing.inOut(Easing.cubic));
                return <g key={k} opacity={1 - ac(u, 0.85, 1)}><Recorte x={lerp(x, 560 + (k % 3) * 40, u)} y={lerp(y, 400 + (k % 2) * 30, u)} rot={r * (1 - u)} c={c} /></g>;
              })}
              <g opacity={ac(t, M('enriquecer') + 2.4, M('enriquecer') + 3)}><BaseDatos x={560} y={360} c={c} t={t} marca={`url(#${ID}-marca)`} /></g>
              {(() => {
                const s = Math.min(1, pop(t, M('secreto'), 0.6));
                return s > 0.01 ? <g opacity={s}><Candado x={800} y={440} s={s} id={ID} /><Insignia x={600} y={680} texto="secreto" c={c} id={ID} /></g> : null;
              })()}
            </g>
          )}
          {ROSA && null}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
