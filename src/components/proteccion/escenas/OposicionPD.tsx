import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «El derecho de oposición», escena propia. Acto A: el titular levanta su «NO» y frente a él aparecen
 * los tres casos en que puede oponerse (marketing directo con perfiles, interés legítimo y fuente
 * pública); una balanza muestra que solo motivos imperiosos pesan más. Acto B: una red con el
 * responsable al centro; la baja que llega por el correo viaja al responsable y desde ahí a la agencia,
 * los anuncios y la plataforma, que quedan marcados.
 */

export const W = 1200, H = 860;
const ID = 'pdo';

const nombres = ['derecho', 'marketing', 'perfiles', 'interes', 'imperiosos', 'publica', 'informarles', 'baja', 'plataformas', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

/* Ficha de un caso: dibujo a la izquierda y nombre corto. */
const Caso: React.FC<{ y: number; txt: string; c: Tono; dibujo: React.ReactNode; marca: number }> = ({ y, txt, c, dibujo, marca }) => (
  <g transform={`translate(870 ${y})`}>
    <rect x={-260} y={-62} width={520} height={124} rx={24} fill={c.panel} style={sombra(c.sombra, 5, 12)} />
    <g transform="translate(-195 0)">{dibujo}</g>
    <Txt f="a" x={-135} y={0} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
    <rect x={-260} y={-62} width={10} height={124} rx={5} fill={ROSA} opacity={marca} />
  </g>
);

/* Señal de alto con «NO». */
const Alto: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => {
  const pts = Array.from({ length: 8 }, (_, k) => { const a = ((k + 0.5) / 8) * Math.PI * 2; return `${(Math.cos(a) * 70).toFixed(1)} ${(Math.sin(a) * 70).toFixed(1)}`; }).join(' L ');
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M ${pts} Z`} fill={ROSA} />
      <path d={`M ${pts} Z`} fill="none" stroke="#fff" strokeWidth={5} transform="scale(0.88)" />
      <Txt x={0} y={0} dominantBaseline="central" textAnchor="middle" fontSize={40} fill="#fff">NO</Txt>
    </g>
  );
};

/* Nodo de la red: dibujo, nombre debajo y, si se dio de baja, una cruz roja. */
const Nodo: React.FC<{ x: number; y: number; txt: string; c: Tono; baja: number; children: React.ReactNode }> = ({ x, y, txt, c, baja, children }) => (
  <g>
    <g transform={`translate(${x} ${y})`}>{children}</g>
    <Txt f="a" x={x} y={y + 92} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
    {baja > 0.01 && (
      <g transform={`translate(${x + 78} ${y - 52}) scale(${Math.min(1, baja)})`}>
        <circle r={24} fill={ROSA} />
        <path d="M -9 -9 L 9 9 M 9 -9 L -9 9" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
      </g>
    )}
  </g>
);

export const OposicionPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('plataformas') + 1.8 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'La herramienta más poderosa'], [M('derecho'), 'El derecho de oposición'], [M('marketing'), 'Al marketing directo'],
    [M('perfiles'), 'incluidos los perfiles'], [M('interes'), 'Al interés legítimo'], [M('imperiosos'), 'salvo motivos imperiosos'],
    [M('publica'), 'A los datos de fuentes públicas'], [M('informarles'), 'Avisar a quienes recibieron los datos'], [M('baja'), 'Una baja en un canal…'],
    [M('plataformas'), '…llega a todos'],
  ];

  const actoA = ventana(t, -1, M('informarles'));
  const actoB = ac(t, M('informarles'), M('informarles') + 0.4);
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));

  // Red del acto B.
  const R: [number, number] = [600, 470];
  const NODOS = { correo: [200, 250], agencia: [200, 620], anuncios: [1000, 250], plataforma: [1000, 620] } as const;
  const llegaBaja = ac(t, M('baja') + 0.4, M('baja') + 1.6);
  const propaga = ac(t, M('plataformas'), M('plataformas') + 1.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El titular puede oponerse al marketing directo, al interés legítimo y a los datos públicos; la baja debe llegar a agencias y plataformas">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO A · el «NO» del titular y los tres casos */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              <g opacity={e('derecho')}>
                <Persona id={ID} x={220} y={780} s={0.8} />
                <Alto x={220} y={560} s={e('derecho') * (1 + 0.04 * Math.sin(t * 3))} />
              </g>
              {/* Rayos del «NO» hacia cada caso */}
              {([['marketing', 250], ['interes', 430], ['publica', 610]] as [Nombre, number][]).map(([n, y]) => {
                const d = ac(t, M(n) + 0.3, M(n) + 1);
                return d > 0.01 ? <line key={n} x1={300} y1={560} x2={lerp(300, 600, d)} y2={lerp(560, y, d)} stroke={ROSA} strokeWidth={5} strokeDasharray="8 8" opacity={0.7} /> : null;
              })}
              {e('marketing') > 0.01 && (
                <g opacity={e('marketing')}>
                  <Caso y={250} txt="marketing" c={c} marca={ac(t, M('marketing') + 0.8, M('marketing') + 1.2)} dibujo={
                    <g>
                      <path d="M -36 -14 L 10 -34 V 34 L -36 14 Z" fill={`url(#${ID}-marca)`} />
                      <rect x={-46} y={-14} width={14} height={28} rx={4} fill={NARANJA} />
                      {[0, 1].map((k) => <path key={k} d={`M ${22 + k * 14} -20 Q ${32 + k * 14} 0 ${22 + k * 14} 20`} fill="none" stroke={c.tenue} strokeWidth={4} strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(t * 5 + k)} />)}
                    </g>
                  } />
                  {/* Perfiles: un medidor que puntúa, dentro de la misma ficha */}
                  <g opacity={ac(t, M('perfiles'), M('perfiles') + 0.5)} transform="translate(1075 250)">
                    <path d="M -34 10 A 34 34 0 0 1 34 10" fill="none" stroke={c.apagado} strokeWidth={10} strokeLinecap="round" />
                    <path d="M -34 10 A 34 34 0 0 1 34 10" fill="none" stroke={NARANJA} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${0.3 + 0.5 * ((Math.sin(t * 2) + 1) / 2)} 1`} />
                  </g>
                </g>
              )}
              {e('interes') > 0.01 && (
                <g opacity={e('interes')}>
                  <Caso y={430} txt="interés legítimo" c={c} marca={ac(t, M('interes') + 0.8, M('interes') + 1.2)} dibujo={
                    <g><circle r={30} fill="none" stroke={NARANJA} strokeWidth={6} /><path d="M -10 -4 L 0 -14 L 10 -4 M 0 -14 V 16" stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
                  } />
                </g>
              )}
              {e('publica') > 0.01 && (
                <g opacity={e('publica')}>
                  <Caso y={610} txt="fuente pública" c={c} marca={ac(t, M('publica') + 0.8, M('publica') + 1.2)} dibujo={
                    <g><rect x={-32} y={-36} width={64} height={72} rx={6} fill={c.panel2} stroke={c.tenue} strokeWidth={3} />{[-18, -4, 10, 24].map((yy) => <rect key={yy} x={-22} y={yy} width={44} height={6} rx={3} fill={c.apagado} />)}</g>
                  } />
                </g>
              )}
              {/* Balanza: el titular pesa más, salvo motivos imperiosos */}
              {(() => {
                const op = ventana(t, M('imperiosos'), M('publica'));
                if (op < 0.01) return null;
                const peso = ac(t, M('imperiosos') + 0.6, M('imperiosos') + 2.4, 0, 1, Easing.inOut(Easing.cubic));
                const ang = lerp(-12, 10, peso);
                const rad = (ang * Math.PI) / 180, L = 110;
                return (
                  <g opacity={op} transform="translate(420 300)">
                    <path d="M -16 110 L 0 0 L 16 110 Z" fill={c.apagado} />
                    <line x1={-L * Math.cos(rad)} y1={L * Math.sin(rad)} x2={L * Math.cos(rad)} y2={-L * Math.sin(rad)} stroke={c.tenue} strokeWidth={9} strokeLinecap="round" />
                    <g transform={`translate(${-L * Math.cos(rad)} ${L * Math.sin(rad) - 26})`}><circle r={22} fill={`url(#${ID}-cara)`} /></g>
                    <g transform={`translate(${L * Math.cos(rad)} ${-L * Math.sin(rad) - 26 * peso})`} opacity={peso}><rect x={-26} y={-26} width={52} height={40} rx={8} fill="#b45309" /></g>
                    <circle r={10} fill={NARANJA} />
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO B · la baja viaja por toda la cadena */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {/* Enlaces: el responsable comunicó los datos a cada uno */}
              {(Object.entries(NODOS) as [string, readonly [number, number]][]).map(([k, [x, y]], i) => {
                const d = ac(t, M('informarles') + i * 0.2, M('informarles') + 0.8 + i * 0.2);
                const xb = lerp(R[0], x, 0.78), yb = lerp(R[1] - 60, y, 0.78);
                return <line key={k} x1={R[0]} y1={R[1] - 60} x2={lerp(R[0], xb, d)} y2={lerp(R[1] - 60, yb, d)} stroke={c.apagado} strokeWidth={5} strokeLinecap="round" />;
              })}
              <Oficinas x={R[0]} y={R[1]} s={0.7} c={c} t={t} />
              <Txt f="a" x={R[0]} y={R[1] + 56} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>responsable</Txt>
              <Nodo x={NODOS.correo[0]} y={NODOS.correo[1]} txt="correo" c={c} baja={pop(t, M('baja'), 0.5)}>
                <rect x={-54} y={-36} width={108} height={72} rx={10} fill={c.panel} stroke={NARANJA} strokeWidth={5} />
                <path d="M -54 -30 L 0 10 L 54 -30" fill="none" stroke={NARANJA} strokeWidth={5} strokeLinejoin="round" />
              </Nodo>
              <Nodo x={NODOS.agencia[0]} y={NODOS.agencia[1]} txt="agencia" c={c} baja={pop(t, M('plataformas') + 0.6, 0.5)}>
                <g transform="translate(0 50)"><Oficinas x={0} y={0} s={0.42} c={c} t={t} luz={0.8} /></g>
              </Nodo>
              <Nodo x={NODOS.anuncios[0]} y={NODOS.anuncios[1]} txt="anuncios" c={c} baja={pop(t, M('plataformas') + 0.9, 0.5)}>
                <rect x={-70} y={-44} width={140} height={88} rx={14} fill={c.panel} style={sombra(c.sombra, 4, 8)} />
                <rect x={-58} y={-34} width={116} height={46} rx={8} fill={`url(#${ID}-marca)`} opacity={0.85} />
                <rect x={-58} y={20} width={60} height={9} rx={4.5} fill={c.apagado} />
              </Nodo>
              <Nodo x={NODOS.plataforma[0]} y={NODOS.plataforma[1]} txt="plataforma" c={c} baja={pop(t, M('plataformas') + 1.2, 0.5)}>
                <BaseDatos x={0} y={-40} c={c} t={t} s={0.55} />
              </Nodo>
              {/* La baja viaja del correo al responsable y luego a los demás */}
              {llegaBaja > 0 && llegaBaja < 1 && <circle cx={lerp(NODOS.correo[0] + 60, R[0] - 40, llegaBaja)} cy={lerp(NODOS.correo[1] + 20, R[1] - 70, llegaBaja)} r={14} fill={ROSA} />}
              {propaga > 0 && propaga < 1 && ([NODOS.agencia, NODOS.anuncios, NODOS.plataforma] as readonly (readonly [number, number])[]).map(([x, y], k) => (
                <circle key={k} cx={lerp(R[0], lerp(R[0], x, 0.78), propaga)} cy={lerp(R[1] - 60, lerp(R[1] - 60, y, 0.78), propaga)} r={14} fill={ROSA} />
              ))}
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
