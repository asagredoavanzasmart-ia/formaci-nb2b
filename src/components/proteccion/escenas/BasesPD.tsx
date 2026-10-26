import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Hoja, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Otras bases legales», escena propia. Una pared con seis puertas: el consentimiento ya está abierto y
 * las otras cinco (contrato, ley, interés, financieros, defensa) se abren al nombrarse. Una cotización
 * cruza la puerta del contrato; junto al interés legítimo aparece el aviso «i»; al acreditar, cada puerta
 * abierta recibe su visto. Después, la cotización se tritura y el diario oficial queda sometido a la ley.
 */

export const W = 1200, H = 860;
const ID = 'pdb';

const nombres = ['otras', 'contrato', 'precontractual', 'legal', 'interes', 'informe', 'financieros', 'defensa', 'acreditar', 'suprimir', 'publicas', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const PUERTAS: { n: Nombre | null; txt: string; x: number; y: number }[] = [
  { n: null, txt: 'consentimiento', x: 210, y: 430 }, { n: 'contrato', txt: 'contrato', x: 600, y: 430 }, { n: 'legal', txt: 'ley', x: 990, y: 430 },
  { n: 'interes', txt: 'interés', x: 210, y: 760 }, { n: 'financieros', txt: 'financieros', x: 600, y: 760 }, { n: 'defensa', txt: 'defensa', x: 990, y: 760 },
];

/* Puerta en su marco; `abre` de 0 a 1 gira la hoja y deja ver la luz de adentro. (x, y) es el umbral. */
const Puerta: React.FC<{ x: number; y: number; abre: number; c: Tono; id: string }> = ({ x, y, abre, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-84} y={-200} width={168} height={204} rx={12} fill={c.apagado} />
    <rect x={-70} y={-188} width={140} height={188} rx={6} fill={`url(#${id}-halo)`} opacity={0.4 + 0.6 * abre} />
    <rect x={-70} y={-188} width={140} height={188} rx={6} fill={NARANJA} opacity={0.18 * abre} />
    {/* Hoja de la puerta, que gira sobre su bisagra izquierda */}
    <g transform={`translate(-70 0) scale(${1 - 0.82 * abre} 1)`}>
      <rect x={0} y={-188} width={140} height={188} rx={6} fill={c.panel2} stroke={c.tenue} strokeWidth={3} />
      <rect x={18} y={-170} width={104} height={64} rx={6} fill="none" stroke={c.apagado} strokeWidth={3} />
      <rect x={18} y={-90} width={104} height={64} rx={6} fill="none" stroke={c.apagado} strokeWidth={3} />
      <circle cx={118} cy={-94} r={7} fill={c.tenue} />
    </g>
  </g>
);

/* Diario oficial: una hoja impresa con columnas. */
const Diario: React.FC<{ x: number; y: number; c: Tono; id: string }> = ({ x, y, c, id }) => (
  <g transform={`translate(${x} ${y}) rotate(-4)`}>
    <rect x={-150} y={-180} width={300} height={360} rx={12} fill={c.panel} style={sombra(c.sombra)} />
    <rect x={-124} y={-156} width={248} height={36} rx={6} fill={`url(#${id}-marca)`} />
    {[0, 1].map((col) => Array.from({ length: 7 }, (_, k) => <rect key={`${col}-${k}`} x={-124 + col * 130} y={-96 + k * 36} width={118} height={12} rx={6} fill={c.apagado} />))}
  </g>
);

export const BasesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('publicas') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'No es la única puerta'], [M('otras'), 'Otras fuentes de licitud'], [M('contrato'), 'Un contrato con el titular'],
    [M('precontractual'), 'o una cotización que pidió'], [M('legal'), 'Una obligación legal'], [M('interes'), 'Un interés legítimo'],
    [M('informe'), 'que siempre se informa'], [M('financieros'), 'Obligaciones financieras'], [M('defensa'), 'La defensa de un derecho'],
    [M('acreditar'), 'Siempre se acredita'], [M('suprimir'), 'Cotizaciones: suprimir o anonimizar'], [M('publicas'), 'Lo público también queda sujeto'],
  ];

  const actoA = ventana(t, -1, M('suprimir'));
  const actoB = ac(t, M('suprimir'), M('suprimir') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Además del consentimiento: contrato, obligación legal, interés legítimo, obligaciones financieras y defensa de un derecho; el responsable acredita la licitud">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO A · la pared de puertas */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              {PUERTAS.map((p, k) => {
                const aparece = p.n ? Math.min(1, pop(t, M(p.n) - 0.2, 0.5)) : ac(t, 0.2, 0.8);
                const abre = p.n ? ac(t, M(p.n) + 0.2, M(p.n) + 1.1, 0, 1, Easing.out(Easing.cubic)) : 1;
                const visto = ac(t, M('acreditar') + k * 0.25, M('acreditar') + 0.4 + k * 0.25);
                // Las puertas cerradas se insinúan desde «otras fuentes de licitud».
                const op = p.n ? Math.max(aparece, 0.35 * ac(t, M('otras'), M('otras') + 0.6)) : aparece;
                return (
                  <g key={p.txt} opacity={op}>
                    <Puerta x={p.x} y={p.y} abre={abre} c={c} id={ID} />
                    <Txt f="a" x={p.x} y={p.y - 222} textAnchor="middle" fontSize={MIN_TXT} fill={abre > 0.5 ? c.texto : c.tenue} opacity={p.n ? aparece : 1}>{p.txt}</Txt>
                    {visto > 0.01 && abre > 0.5 && (
                      <g transform={`translate(${p.x + 118} ${p.y - 160}) scale(${visto})`}>
                        <circle r={24} fill={VERDE} />
                        <path d="M -10 0 L -3 8 L 11 -9" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Una cotización cruza la puerta del contrato */}
              {(() => {
                const op = ventana(t, M('precontractual'), M('legal') + 1);
                if (op < 0.01) return null;
                const u = ac(t, M('precontractual') + 0.2, M('precontractual') + 2.4, 0, 1, Easing.inOut(Easing.cubic));
                return <g opacity={op}><Hoja x={600} y={lerp(470, 340, u)} w={70} h={90} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={1} rot={lerp(-8, 0, u)} /></g>;
              })()}

              {/* Interés legítimo: el titular siempre puede pedir que se le informe */}
              {(() => {
                const e = Math.min(1, pop(t, M('informe'), 0.5));
                if (e < 0.01) return null;
                return (
                  <g opacity={e} transform="translate(340 640)">
                    <circle r={34} fill={c.panel} stroke={NARANJA} strokeWidth={6} style={sombra(c.sombra, 3, 6)} />
                    <circle cx={0} cy={-14} r={5} fill={NARANJA} />
                    <rect x={-4} y={-4} width={8} height={24} rx={4} fill={NARANJA} />
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO B · la cotización se tritura; el diario oficial también queda sujeto */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {(() => {
                const u = ac(t, M('suprimir') + 0.4, M('suprimir') + 2.4, 0, 1, Easing.inOut(Easing.cubic));
                return (
                  <g>
                    {/* La hoja baja hacia la trituradora */}
                    <g opacity={1 - ac(u, 0.85, 1)}>
                      <defs><clipPath id={`${ID}-corte`}><rect x={180} y={0} width={300} height={440} /></clipPath></defs>
                      <g clipPath={`url(#${ID}-corte)`}><Hoja x={330} y={lerp(260, 480, u)} w={180} h={220} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={1} /></g>
                    </g>
                    {/* Tiras que salen por abajo */}
                    {Array.from({ length: 7 }, (_, k) => {
                      const largo = 160 * ac(u, 0.25, 0.95);
                      return <rect key={k} x={258 + k * 22} y={520} width={12} height={largo} rx={4} fill={k % 2 ? c.apagado : c.panel2} opacity={1 - ac(t, M('publicas') - 0.5, M('publicas'))} />;
                    })}
                    <rect x={180} y={440} width={300} height={90} rx={18} fill={c.tenue} />
                    <rect x={210} y={470} width={240} height={14} rx={7} fill={c.texto} />
                  </g>
                );
              })()}
              {(() => {
                const e = Math.min(1, pop(t, M('publicas'), 0.6));
                if (e < 0.01) return null;
                return (
                  <g opacity={e}>
                    <Diario x={870} y={420} c={c} id={ID} />
                    <g opacity={Math.min(1, pop(t, M('publicas') + 0.8, 0.5))}><Insignia x={870} y={700} texto="sujeto a la ley" c={c} id={ID} /></g>
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
