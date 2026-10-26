import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Los datos sensibles», escena propia. Dentro del marco de los datos personales hay una bóveda: la
 * categoría más protegida. Cada grupo de categorías que se nombra enciende sus luces en la puerta y
 * se anota en la lista. La situación socioeconómica se muestra como pilas de monedas que una campaña
 * segmenta; una moneda vuelve a la bóveda junto a la salud y las creencias. La llave del consentimiento
 * expreso abre la puerta por tres canales y, si se viola, cae el sello de infracción gravísima.
 * Todo el texto mide 44 o más en el lienzo (13 px en vertical) y ninguna pieza se monta sobre otra.
 */

export const W = 1200, H = 860;
const ID = 'pds';

const nombres = ['protegida', 'sensibles', 'caracteristicas', 'g1', 'g2', 'g3', 'g4', 'g5', 'delicado', 'segmentan', 'grupo', 'expreso', 'escrita', 'verbal', 'excepciones', 'gravisima', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

/* Grupos de categorías sensibles, cuántas luces encienden en la bóveda y su rótulo en la lista. */
const GRUPOS: { n: Nombre; luces: number; txt: string }[] = [
  { n: 'g1', luces: 2, txt: 'Origen y afiliación' },
  { n: 'g2', luces: 1, txt: 'Socioeconómica' },
  { n: 'g3', luces: 2, txt: 'Convicciones y fe' },
  { n: 'g4', luces: 3, txt: 'Salud y biometría' },
  { n: 'g5', luces: 3, txt: 'Sexualidad e identidad' },
];
const BX = 880, BY = 450, BR = 220; // bóveda

/* Puerta de bóveda: anillo, pernos, volante que gira y luces (una por categoría). */
const Boveda: React.FC<{ c: Tono; t: number; luces: number[]; giro: number; alarma: number; abre: number }> = ({ c, t, luces, giro, alarma, abre }) => {
  const rojo = alarma * (0.5 + 0.5 * Math.sin(t * 12));
  return (
    <g transform={`translate(${BX} ${BY})`}>
      <ellipse cx={0} cy={BR + 18} rx={BR * 0.8} ry={22} fill="#000" opacity={0.14} />
      <circle r={BR} fill={c.apagado} />
      <circle r={BR - 12} fill={c.panel2} />
      <circle r={BR} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={14} />
      <circle r={BR} fill="none" stroke={ROSA} strokeWidth={14} opacity={rojo} />
      <circle r={BR} fill="none" stroke={VERDE} strokeWidth={14} opacity={abre} />
      {Array.from({ length: 12 }, (_, k) => {
        const a = (k / 12) * Math.PI * 2;
        return <rect key={k} x={-10} y={-8} width={20} height={16} rx={4} fill={c.tenue} transform={`translate(${Math.cos(a) * (BR - 34)} ${Math.sin(a) * (BR - 34)}) rotate(${(a * 180) / Math.PI})`} />;
      })}
      <circle r={BR - 60} fill={c.panel} />
      {/* Luces de las categorías sobre el arco superior */}
      {luces.map((on, k) => {
        const a = ((200 + (k * 140) / (luces.length - 1)) * Math.PI) / 180;
        const x = Math.cos(a) * 118, y = Math.sin(a) * 118;
        return (
          <g key={k}>
            <circle cx={x} cy={y} r={13} fill={c.apagado} />
            <circle cx={x} cy={y} r={13} fill={k % 2 ? ROSA : NARANJA} opacity={on} />
            <circle cx={x} cy={y} r={22} fill={NARANJA} opacity={0.25 * on * (0.6 + 0.4 * Math.sin(t * 4 + k))} />
          </g>
        );
      })}
      {/* Volante */}
      <g transform={`rotate(${giro})`}>
        {[0, 60, 120].map((a) => <rect key={a} x={-62} y={-8} width={124} height={16} rx={8} fill={c.tenue} transform={`rotate(${a})`} />)}
        <circle r={26} fill={`url(#${ID}-marca)`} />
      </g>
      <Txt x={0} y={150} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>sensibles</Txt>
    </g>
  );
};

/* Pila de monedas (ingreso) con una persona encima. */
const Pila: React.FC<{ x: number; n: number; c: Tono; u: number; pelo: string; cuerpo: string }> = ({ x, n, c, u, pelo, cuerpo }) => {
  const visibles = Math.round(n * u);
  const tope = 700 - visibles * 18;
  return (
    <g>
      {Array.from({ length: visibles }, (_, k) => (
        <g key={k} transform={`translate(${x} ${700 - k * 18})`}>
          <path d="M -50 0 V -14 A 50 15 0 0 1 50 -14 V 0 A 50 15 0 0 1 -50 0 Z" fill="#d99a1e" />
          <ellipse cx={0} cy={-14} rx={50} ry={15} fill="#fbbf24" />
          <ellipse cx={0} cy={-14} rx={30} ry={8} fill="none" stroke="#d99a1e" strokeWidth={3} />
        </g>
      ))}
      {u > 0.99 && <Persona id={ID} x={x} y={tope - 18} s={0.45} cuerpo={cuerpo} pelo={pelo} />}
      {u <= 0.99 && <ellipse cx={x} cy={706} rx={56} ry={12} fill="#000" opacity={0.1} />}
      {c && null}
    </g>
  );
};

/* Llave del consentimiento: (x, y) es la punta que entra en la cerradura. */
const Llave: React.FC<{ x: number; y: number; rot: number }> = ({ x, y, rot }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle cx={-150} cy={0} r={38} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={18} />
    <rect x={-112} y={-9} width={112} height={18} rx={6} fill={NARANJA} />
    <rect x={-46} y={8} width={14} height={22} rx={3} fill={NARANJA} />
    <rect x={-22} y={8} width={14} height={30} rx={3} fill={NARANJA} />
  </g>
);

/* Canal del consentimiento: dibujo y nombre en una ficha. */
const Canal: React.FC<{ y: number; c: Tono; tipo: 'escrita' | 'verbal' | 'tecnologica'; t: number; op: number }> = ({ y, c, tipo, t, op }) => (
  <g opacity={op} transform={`translate(310 ${y})`}>
    <rect x={-250} y={-55} width={500} height={110} rx={24} fill={c.panel} style={sombra(c.sombra, 5, 12)} />
    <g transform="translate(-180 0)">
      {tipo === 'escrita' && (
        <g>
          <rect x={-32} y={-40} width={64} height={80} rx={8} fill={c.panel2} />
          {[-22, -8, 6].map((yy) => <rect key={yy} x={-20} y={yy} width={40} height={7} rx={3.5} fill={c.apagado} />)}
          <path d={`M -20 26 q 8 -12 14 0 t 14 0 t ${12 * (0.6 + 0.4 * Math.sin(t * 3))} 0`} fill="none" stroke={NARANJA} strokeWidth={4} strokeLinecap="round" />
        </g>
      )}
      {tipo === 'verbal' && (
        <g>
          <path d="M -38 -30 H 30 Q 42 -30 42 -18 V 10 Q 42 22 30 22 H -6 L -24 38 L -20 22 H -38 Q -50 22 -50 10 V -18 Q -50 -30 -38 -30 Z" fill={`url(#${ID}-marca)`} />
          {[0, 1, 2].map((k) => <rect key={k} x={-28 + k * 22} y={-10 - 8 * Math.abs(Math.sin(t * 5 + k))} width={10} height={16 + 16 * Math.abs(Math.sin(t * 5 + k))} rx={5} fill="#fff" />)}
        </g>
      )}
      {tipo === 'tecnologica' && (
        <g>
          <rect x={-26} y={-44} width={52} height={88} rx={10} fill={c.tenue} />
          <rect x={-20} y={-34} width={40} height={62} rx={5} fill={c.panel2} />
          <rect x={-12} y={-14} width={22} height={22} rx={5} fill="none" stroke={VERDE} strokeWidth={4} />
          <path d="M -8 -3 L -2 4 L 8 -8" fill="none" stroke={VERDE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </g>
    <Txt f="a" x={-110} y={16} fontSize={MIN_TXT} fill={c.texto}>{tipo === 'tecnologica' ? 'tecnológica' : tipo}</Txt>
  </g>
);

export const SensiblesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('gravisima') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Una categoría más protegida'], [M('sensibles'), 'Los datos sensibles'], [M('caracteristicas'), 'Revelan su vida privada'],
    [M('delicado'), 'Lo más delicado para una agencia'], [M('segmentan'), 'Segmentar por ingresos'], [M('grupo'), 'Mismo grupo que salud y creencias'],
    [M('expreso'), 'Solo con consentimiento expreso'], [M('escrita'), 'Escrito, verbal o tecnológico'], [M('excepciones'), 'Salvo excepciones acotadas'],
    [M('gravisima'), 'Infracción gravísima'],
  ];

  // Luces de la bóveda: cada grupo enciende las suyas al nombrarse; con «mismo grupo», laten juntas.
  const luces: number[] = [];
  GRUPOS.forEach((g, gi) => { for (let k = 0; k < g.luces; k++) luces.push(ac(t, M(g.n) + k * 0.25, M(g.n) + 0.5 + k * 0.25) * (gi === 1 || t < M('grupo') ? 1 : 1)); });
  const juntas = ac(t, M('grupo') + 1.2, M('grupo') + 1.8) * (1 - ac(t, M('expreso') - 0.3, M('expreso')));
  const lucesFinal = luces.map((v, k) => (k >= 2 && k <= 7 ? Math.min(1, v * (1 - 0.5 * juntas) + juntas * (0.5 + 0.5 * Math.sin(t * 6))) : v));

  const entra = Math.min(1, pop(t, M('protegida') - 0.4, 0.7));
  const giro = ac(t, M('sensibles'), M('sensibles') + 1.4, 0, 1, Easing.inOut(Easing.cubic)) * 180 + ac(t, M('expreso') + 1.6, M('expreso') + 2.6) * 90;
  const halo = ac(t, M('caracteristicas'), M('caracteristicas') + 1);
  const abre = ac(t, M('expreso') + 1.8, M('expreso') + 2.4) * (1 - ac(t, M('gravisima'), M('gravisima') + 0.4));
  const alarma = ac(t, M('gravisima'), M('gravisima') + 0.4);

  // Actos de la izquierda: lista de categorías · segmentación por ingresos · consentimiento y sello.
  const listaOp = ventana(t, M('g1') - 0.2, M('segmentan'));
  const segOp = ventana(t, M('segmentan'), M('expreso'));
  const consOp = ventana(t, M('expreso'), M('gravisima'));
  const selloOp = ac(t, M('gravisima'), M('gravisima') + 0.3);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los datos sensibles son la categoría más protegida: incluyen la situación socioeconómica y solo se tratan con consentimiento expreso; violarlo es infracción gravísima">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Marco de los datos personales */}
          <g opacity={ac(t, 0.1, 0.6)}>
            <rect x={24} y={118} width={1152} height={712} rx={36} fill="none" stroke={c.apagado} strokeWidth={4} strokeDasharray="14 12" />
            <Txt f="a" x={60} y={180} fontSize={MIN_TXT} fill={c.tenue} opacity={1 - listaOp * 0 - segOp * 0}>datos personales</Txt>
          </g>

          {/* Bóveda de los sensibles */}
          <g opacity={entra} transform={`translate(${BX} ${BY}) scale(${0.8 + 0.2 * entra}) translate(${-BX} ${-BY})`}>
            <circle cx={BX} cy={BY} r={BR + 60} fill={`url(#${ID}-halo)`} opacity={0.3 + 0.4 * halo} />
            <Boveda c={c} t={t} luces={lucesFinal} giro={giro} alarma={alarma} abre={abre} />
          </g>

          {/* Lista de categorías, una línea por grupo */}
          {listaOp > 0.01 && (
            <g opacity={listaOp}>
              {GRUPOS.map((g, k) => {
                const e = Math.min(1, pop(t, M(g.n), 0.5));
                if (e < 0.01) return null;
                const dest = t > M('delicado') ? (k === 1 ? 1 : 0.3) : 1;
                const y = 300 + k * 84;
                return (
                  <g key={g.n} opacity={e * dest} transform={`translate(${(1 - e) * -30} 0)`}>
                    {k === 1 && t > M('delicado') && <rect x={34} y={y - 46} width={440} height={66} rx={33} fill={NARANJA} opacity={0.16 * ac(t, M('delicado'), M('delicado') + 0.5)} />}
                    <circle cx={58} cy={y - 14} r={11} fill={k % 2 ? ROSA : NARANJA} />
                    <Txt f="a" x={84} y={y} fontSize={MIN_TXT} fill={c.texto}>{g.txt}</Txt>
                  </g>
                );
              })}
            </g>
          )}

          {/* Segmentación por nivel de ingresos: pilas de monedas, la más alta se selecciona */}
          {segOp > 0.01 && (
            <g opacity={segOp}>
              {[[140, 2, '#64748b', '#2b1a12'], [300, 4, '#94a3b8', '#6b3e1f'], [460, 7, '#475569', '#111827']].map(([x, n, cu, pe], k) => (
                <Pila key={k} x={x as number} n={n as number} c={c} u={ac(t, M('segmentan') + k * 0.3, M('segmentan') + 0.9 + k * 0.3)} cuerpo={cu as string} pelo={pe as string} />
              ))}
              {(() => {
                const sel = ac(t, M('segmentan') + 1.6, M('segmentan') + 2.2);
                return <rect x={392} y={430} width={136} height={300} rx={22} fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="12 10" opacity={sel} />;
              })()}
              <Txt f="a" x={300} y={800} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>nivel de ingresos</Txt>
              {/* Una moneda vuelve a la bóveda, al grupo de la salud y las creencias */}
              {(() => {
                const u = ac(t, M('grupo'), M('grupo') + 1.2, 0, 1, Easing.inOut(Easing.cubic));
                if (u <= 0 || u >= 1) return null;
                const x = lerp(460, BX - 60, u), y = lerp(560, BY - 100, u) - Math.sin(Math.PI * u) * 120;
                return (
                  <g transform={`translate(${x} ${y}) scale(${1 - 0.5 * u})`}>
                    <ellipse rx={40} ry={40} fill="#fbbf24" stroke="#d99a1e" strokeWidth={6} />
                    <Txt x={0} y={16} textAnchor="middle" fontSize={MIN_TXT} fill="#b45309">$</Txt>
                  </g>
                );
              })()}
            </g>
          )}

          {/* Consentimiento expreso: la llave entra en la cerradura y tres canales lo permiten */}
          {consOp > 0.01 && (
            <g opacity={consOp}>
              <g opacity={Math.min(1, pop(t, M('expreso'), 0.5))}><Insignia x={310} y={200} texto="expreso" c={c} id={ID} /></g>
              <Canal y={340} c={c} tipo="escrita" t={t} op={ac(t, M('escrita'), M('escrita') + 0.5)} />
              <Canal y={480} c={c} tipo="verbal" t={t} op={ac(t, M('verbal'), M('verbal') + 0.5)} />
              <Canal y={620} c={c} tipo="tecnologica" t={t} op={ac(t, M('verbal') + 0.9, M('verbal') + 1.4)} />
            </g>
          )}
          {/* La llave viaja desde la insignia hasta el volante de la bóveda */}
          {(() => {
            const v = ac(t, M('expreso') + 0.2, M('expreso') + 1.6, 0, 1, Easing.inOut(Easing.cubic));
            const op = ac(t, M('expreso'), M('expreso') + 0.4) * (1 - ac(t, M('gravisima') - 0.3, M('gravisima')));
            if (op < 0.01) return null;
            const x = lerp(700, BX - 30, v), y = lerp(150, BY, v);
            return <g opacity={op}><Llave x={x} y={y} rot={lerp(-30, 0, v) + ac(t, M('expreso') + 1.6, M('expreso') + 2.6) * 90} /></g>;
          })()}

          {/* Salvo excepciones acotadas */}
          <Txt f="a" x={BX} y={772} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue} opacity={ventana(t, M('excepciones'), tPregunta + 10)}>salvo excepciones</Txt>

          {/* Sello de infracción gravísima */}
          {selloOp > 0.01 && (() => {
            const e = Math.min(1, pop(t, M('gravisima') + 0.2, 0.5));
            return (
              <g opacity={selloOp * e} transform={`translate(310 470) rotate(-8) scale(${2 - e})`}>
                <rect x={-230} y={-64} width={460} height={128} rx={26} fill={c.panel} stroke={ROSA} strokeWidth={8} />
                <Txt x={0} y={22} textAnchor="middle" fontSize={64} fill={ROSA} letterSpacing={3}>GRAVÍSIMA</Txt>
              </g>
            );
          })()}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
