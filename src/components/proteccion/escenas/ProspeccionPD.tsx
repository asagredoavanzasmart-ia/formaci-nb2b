import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Contacto, Hoja, Insignia, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «La prospección en frío», escena propia. Acto A: un correo con copo de nieve viaja de quien escribe
 * al prospecto; arriba, el interés legítimo, y al centro sus tres condiciones, que se marcan. Acto B:
 * cuatro reglas prácticas, una a la vez: la ficha con su etiqueta de origen, el «no» de una llamada que
 * llega a todos los canales, la cotización que se tritura si no hay negocio, el contacto que se borra
 * con el tiempo, y la empresa cuyo contacto también es dato personal.
 */

export const W = 1200, H = 860;
const ID = 'pdp2';

const nombres = ['interes', 'c1', 'c2', 'c3', 'origen', 'llamada', 'cotizacion', 'suprimir', 'nunca', 'b2b', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const CONDICIONES: { n: Nombre; txt: string; y: number }[] = [
  { n: 'c1', txt: 'sin afectar', y: 370 }, { n: 'c2', txt: 'en la política', y: 445 }, { n: 'c3', txt: 'puede oponerse', y: 520 },
];

/* Correo frío: sobre con un copo de nieve. */
const CorreoFrio: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-30} width={92} height={60} rx={8} fill={c.panel} stroke={NARANJA} strokeWidth={4} />
    <path d="M -46 -26 L 0 8 L 46 -26" fill="none" stroke={NARANJA} strokeWidth={4} strokeLinejoin="round" />
    <g transform="translate(34 -30)">
      <circle r={20} fill="#bfdbfe" />
      {[0, 60, 120].map((a) => <line key={a} x1={-12} y1={0} x2={12} y2={0} stroke="#2563eb" strokeWidth={4} strokeLinecap="round" transform={`rotate(${a})`} />)}
    </g>
  </g>
);

/* Etiqueta colgante con texto. */
const Etiqueta: React.FC<{ x: number; y: number; txt: string; c: Tono; id: string; giro: number }> = ({ x, y, txt, c, id, giro }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    <path d="M 0 0 L 0 40" stroke={c.tenue} strokeWidth={4} />
    <path d="M -110 40 H 90 L 120 80 L 90 120 H -110 Z" fill={c.panel} stroke={`url(#${id}-marca)`} strokeWidth={5} />
    <circle cx={92} cy={80} r={8} fill={c.tenue} />
    <Txt f="a" x={-92} y={80} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
  </g>
);

/* Canal con cruz roja cuando le llega la oposición. */
const Canal: React.FC<{ x: number; y: number; c: Tono; id: string; tipo: 'correo' | 'anuncio' | 'telefono'; x2: number }> = ({ x, y, c, id, tipo, x2 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-60} y={-46} width={120} height={92} rx={18} fill={c.panel} style={sombra(c.sombra, 4, 8)} />
    {tipo === 'correo' && <g><rect x={-30} y={-20} width={60} height={40} rx={6} fill="none" stroke={NARANJA} strokeWidth={4} /><path d="M -30 -16 L 0 6 L 30 -16" fill="none" stroke={NARANJA} strokeWidth={4} /></g>}
    {tipo === 'anuncio' && <g><rect x={-34} y={-24} width={68} height={36} rx={6} fill={`url(#${id}-marca)`} /><rect x={-34} y={18} width={36} height={7} rx={3} fill={c.apagado} /></g>}
    {tipo === 'telefono' && <g><rect x={-18} y={-32} width={36} height={64} rx={8} fill={c.tenue} /><rect x={-12} y={-24} width={24} height={42} rx={4} fill={c.panel2} /></g>}
    {x2 > 0.01 && <g transform={`translate(50 -40) scale(${Math.min(1, x2)})`}><circle r={18} fill={ROSA} /><path d="M -7 -7 L 7 7 M 7 -7 L -7 7" stroke="#fff" strokeWidth={4} strokeLinecap="round" /></g>}
  </g>
);

export const ProspeccionPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('b2b') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Escribir a quien no pidió nada'], [M('interes'), 'Se apoya en el interés legítimo'], [M('c1'), 'Sin afectar sus derechos'],
    [M('c2'), 'Declarado en la política'], [M('c3'), 'Y puede oponerse siempre'], [M('origen'), 'Cada contacto con su origen'],
    [M('llamada'), 'Un «no» llega a todos los canales'], [M('cotizacion'), 'Si pide cotización…'], [M('suprimir'), '…y no hay negocio, se suprime'],
    [M('nunca'), 'Quien nunca respondió no se queda'], [M('b2b'), 'También entre empresas'],
  ];

  const actoA = ventana(t, -1, M('origen'));
  const actoB = ac(t, M('origen'), M('origen') + 0.4);
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, n === 'interes' ? M(n) + d : M(n) + d, 0.55));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La prospección en frío se apoya en el interés legítimo con tres condiciones; cada contacto guarda su origen y las oposiciones llegan a todos los canales">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO A · el correo frío y las tres condiciones del interés legítimo */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              <g opacity={ac(t, 0.2, 0.8)}>
                <Persona id={ID} x={140} y={790} s={0.7} />
                <Persona id={ID} x={1060} y={790} s={0.7} cuerpo="#64748b" />
              </g>
              {[0, 1].map((k) => {
                const u = ((t - 0.5) * 0.25 + k / 2) % 1;
                if (t < 0.5) return null;
                return <g key={k} opacity={Math.sin(Math.PI * u)}><CorreoFrio x={lerp(230, 970, u)} y={700 - Math.sin(Math.PI * u) * 70} c={c} /></g>;
              })}
              <g opacity={e('interes')}><Insignia x={600} y={190} texto="interés legítimo" c={c} id={ID} /></g>
              <g opacity={e('c1', -0.4)}>
                <rect x={310} y={300} width={580} height={290} rx={28} fill={c.panel} style={sombra(c.sombra)} />
                {CONDICIONES.map((cnd) => {
                  const m = ac(t, M(cnd.n) + 0.2, M(cnd.n) + 0.7);
                  const op = Math.min(1, pop(t, M(cnd.n), 0.45));
                  return (
                    <g key={cnd.n} opacity={op}>
                      <rect x={352} y={cnd.y - 22} width={44} height={44} rx={10} fill={m > 0.5 ? VERDE : c.panel} stroke={m > 0.5 ? VERDE : c.tenue} strokeWidth={4} />
                      <path d={`M 362 ${cnd.y} L 370 ${cnd.y + 9} L 386 ${cnd.y - 10}`} fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={m} />
                      <Txt f="a" x={420} y={cnd.y} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{cnd.txt}</Txt>
                    </g>
                  );
                })}
              </g>
            </g>
          )}

          {/* ACTO B · las reglas prácticas, una a la vez */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {/* Origen de cada contacto */}
              {(() => {
                const op = ventana(t, M('origen'), M('llamada'));
                return op > 0.01 ? <g opacity={op}><Contacto x={470} y={420} s={2.6} relleno={`url(#${ID}-marca)`} /><Etiqueta x={600} y={430} txt="origen" c={c} id={ID} giro={Math.sin(t * 1.8) * 4} /></g> : null;
              })()}
              {/* Un «no» en una llamada llega a todos los canales */}
              {(() => {
                const op = ventana(t, M('llamada'), M('cotizacion'));
                if (op < 0.01) return null;
                const x2 = (k: number) => pop(t, M('llamada') + 1 + k * 0.4, 0.4);
                return (
                  <g opacity={op}>
                    <g transform="translate(330 470)">
                      <rect x={-50} y={-90} width={100} height={180} rx={18} fill={c.tenue} />
                      <rect x={-38} y={-74} width={76} height={130} rx={8} fill={c.panel2} />
                    </g>
                    <g transform="translate(470 330)" opacity={Math.min(1, pop(t, M('llamada') + 0.3, 0.4))}>
                      <path d="M -70 -40 H 60 Q 80 -40 80 -20 V 20 Q 80 40 60 40 H -30 L -56 64 L -50 40 H -70 Q -90 40 -90 20 V -20 Q -90 -40 -70 -40 Z" fill={ROSA} />
                      <Txt x={-5} y={0} dominantBaseline="central" textAnchor="middle" fontSize={40} fill="#fff">NO</Txt>
                    </g>
                    {[0, 1, 2].map((k) => {
                      const u = ac(t, M('llamada') + 0.6 + k * 0.4, M('llamada') + 1.2 + k * 0.4);
                      return u > 0 && u < 1 ? <circle key={k} cx={lerp(400, 820, u)} cy={lerp(470, 280 + k * 150, u)} r={11} fill={ROSA} /> : null;
                    })}
                    <Canal x={900} y={280} c={c} id={ID} tipo="correo" x2={x2(0)} />
                    <Canal x={900} y={430} c={c} id={ID} tipo="anuncio" x2={x2(1)} />
                    <Canal x={900} y={580} c={c} id={ID} tipo="telefono" x2={x2(2)} />
                  </g>
                );
              })()}
              {/* Cotización: sin negocio, se tritura */}
              {(() => {
                const op = ventana(t, M('cotizacion'), M('nunca'));
                if (op < 0.01) return null;
                const u = ac(t, M('suprimir'), M('suprimir') + 2, 0, 1, Easing.inOut(Easing.cubic));
                return (
                  <g opacity={op}>
                    <defs><clipPath id={`${ID}-corte`}><rect x={420} y={0} width={360} height={520} /></clipPath></defs>
                    <g clipPath={`url(#${ID}-corte)`} opacity={1 - ac(u, 0.85, 1)}><Hoja x={600} y={lerp(340, 580, u)} w={190} h={230} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={ac(t, M('cotizacion'), M('cotizacion') + 1.6)} /></g>
                    {Array.from({ length: 7 }, (_, k) => <rect key={k} x={528 + k * 22} y={600} width={12} height={150 * ac(u, 0.25, 0.95)} rx={4} fill={k % 2 ? c.apagado : c.panel2} />)}
                    <rect x={440} y={520} width={320} height={90} rx={18} fill={c.tenue} opacity={ac(t, M('suprimir') - 0.4, M('suprimir'))} />
                  </g>
                );
              })()}
              {/* Quien nunca respondió no se queda para siempre */}
              {(() => {
                const op = ventana(t, M('nunca'), M('b2b'));
                if (op < 0.01) return null;
                const borra = ac(t, M('nunca') + 1, M('nunca') + 4);
                return (
                  <g opacity={op}>
                    <Contacto x={470} y={430} s={2.6} relleno={c.tenue} op={1 - 0.85 * borra} />
                    <g transform="translate(800 430)">
                      <circle r={90} fill={c.panel} stroke={c.tenue} strokeWidth={8} />
                      <line x1={0} y1={0} x2={0} y2={-60} stroke={c.texto} strokeWidth={8} strokeLinecap="round" transform={`rotate(${(t - M('nunca')) * 240})`} />
                      <line x1={0} y1={0} x2={40} y2={0} stroke={NARANJA} strokeWidth={8} strokeLinecap="round" transform={`rotate(${(t - M('nunca')) * 20})`} />
                      <circle r={10} fill={c.texto} />
                    </g>
                  </g>
                );
              })()}
              {/* También entre empresas */}
              {(() => {
                const op = ac(t, M('b2b'), M('b2b') + 0.4);
                if (op < 0.01) return null;
                return (
                  <g opacity={op}>
                    <Oficinas x={460} y={620} s={1} c={c} t={t} />
                    <Persona id={ID} x={720} y={620} s={0.9} cuerpo="#64748b" />
                    <g opacity={Math.min(1, pop(t, M('b2b') + 0.6, 0.5))}><Insignia x={600} y={720} texto="dato personal" c={c} id={ID} /></g>
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
