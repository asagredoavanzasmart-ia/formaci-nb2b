import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';

/**
 * «Las multas», escena propia. Acto A: un gráfico de barras con los máximos por nivel (5.000, 10.000 y
 * 20.000 UTM) y, a su lado, el triple por reincidencia, el 2 % o 4 % de los ingresos y el recargo del
 * 50 % si no se corrige. Acto B: una balanza de atenuantes frente a agravantes. Acto C: el registro
 * público, donde la sanción queda cinco años, y la amonestación para las empresas de menor tamaño.
 */

export const W = 1200, H = 860;
const ID = 'pdy';

const nombres = ['leve', 'grave', 'gravisima', 'triple', 'ingresos', 'recargo', 'atenuantes', 'agravantes', 'registro', 'pyme', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const BARRAS: { n: Nombre; txt: string; valor: string; utm: number; x: number; color: string }[] = [
  { n: 'leve', txt: 'leve', valor: '5.000', utm: 5000, x: 190, color: '#f59e0b' },
  { n: 'grave', txt: 'grave', valor: '10.000', utm: 10000, x: 380, color: NARANJA },
  { n: 'gravisima', txt: 'gravísima', valor: '20.000', utm: 20000, x: 570, color: ROSA },
];
const BASE = 700, ALTO = 420;

export const MultasPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('pyme') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Según el nivel'], [M('leve'), 'Leves: hasta 5.000 UTM'], [M('grave'), 'Graves: hasta 10.000'], [M('gravisima'), 'Gravísimas: hasta 20.000'],
    [M('triple'), 'Reincidir: hasta el triple'], [M('ingresos'), 'o el 2 % o 4 % de los ingresos'], [M('recargo'), 'Sin corregir: +50 %'],
    [M('atenuantes'), 'Lo que atenúa…'], [M('agravantes'), '…y lo que agrava'], [M('registro'), 'Cinco años en un registro público'], [M('pyme'), 'Empresas de menor tamaño: amonestación'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const aA = ventana(t, -1, M('atenuantes')), aB = ventana(t, M('atenuantes'), M('registro')), aC = ac(t, M('registro'), M('registro') + 0.4);

  // Balanza del acto B.
  const at = Array.from({ length: 5 }, (_, k) => ac(t, M('atenuantes') + 0.6 + k * 1.6, M('atenuantes') + 1.1 + k * 1.6));
  const ag = Array.from({ length: 3 }, (_, k) => ac(t, M('agravantes') + 0.6 + k * 2, M('agravantes') + 1.1 + k * 2));
  const peso = at.reduce((a, b) => a + b, 0) - ag.reduce((a, b) => a + b, 0) * 1.7;
  const rad = (Math.max(-12, Math.min(12, peso * 2.5)) * Math.PI) / 180;
  const pl = (lado: -1 | 1) => [600 + lado * 260 * Math.cos(rad), 300 - lado * 260 * Math.sin(rad)];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Multas de hasta 5.000, 10.000 y 20.000 UTM; reincidir las triplica o las lleva al 2 o 4 % de los ingresos">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {aA > 0.01 && (
            <g opacity={aA}>
              <line x1={90} y1={BASE} x2={680} y2={BASE} stroke={c.tenue} strokeWidth={4} />
              <Txt f="a" x={90} y={190} fontSize={MIN_TXT} fill={c.tenue}>UTM</Txt>
              {BARRAS.map((b) => {
                const u = ac(t, M(b.n), M(b.n) + 1.2, 0, 1, Easing.out(Easing.cubic));
                if (u < 0.01) return null;
                const h = (ALTO * b.utm) / 20000 * u;
                return (
                  <g key={b.n}>
                    <rect x={b.x - 60} y={BASE - h} width={120} height={h} rx={12} fill={b.color} />
                    <Txt x={b.x} y={BASE - h - 22} textAnchor="middle" fontSize={30} fill={c.texto} opacity={u}>{b.valor}</Txt>
                    <Txt f="a" x={b.x} y={BASE + 48} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{b.txt}</Txt>
                  </g>
                );
              })}
              <g opacity={e('triple')}><Txt x={930} y={300} dominantBaseline="central" textAnchor="middle" fontSize={90} fill={ROSA}>×3</Txt></g>
              <g opacity={e('ingresos')}><Insignia x={930} y={450} texto="2 % · 4 %" c={c} id={ID} tono="alerta" /></g>
              <g opacity={e('recargo')}><Insignia x={930} y={580} texto="+50 %" c={c} id={ID} /></g>
            </g>
          )}

          {aB > 0.01 && (
            <g opacity={aB}>
              {(() => {
                const [lx, ly] = pl(-1), [rx, ry] = pl(1);
                const plato = (x: number, y: number, pesos: number[], color: string) => (
                  <g>
                    <line x1={x} y1={y} x2={x - 70} y2={y + 90} stroke={c.tenue} strokeWidth={4} />
                    <line x1={x} y1={y} x2={x + 70} y2={y + 90} stroke={c.tenue} strokeWidth={4} />
                    <path d={`M ${x - 100} ${y + 90} H ${x + 100} Q ${x + 90} ${y + 120} ${x} ${y + 120} Q ${x - 90} ${y + 120} ${x - 100} ${y + 90} Z`} fill={c.apagado} />
                    {pesos.map((u, k) => u > 0.01 ? <rect key={k} x={x - 66 + (k % 3) * 46} y={y + 46 - Math.floor(k / 3) * 44} width={40} height={40} rx={8} fill={color} opacity={u} /> : null)}
                  </g>
                );
                return (
                  <g>
                    <path d="M 560 600 L 600 300 L 640 600 Z" fill={c.apagado} />
                    <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={c.tenue} strokeWidth={12} strokeLinecap="round" />
                    {plato(lx, ly, at, VERDE)}
                    {plato(rx, ry, ag, ROSA)}
                    <circle cx={600} cy={300} r={16} fill={NARANJA} />
                    <Txt f="a" x={340} y={640} textAnchor="middle" fontSize={MIN_TXT} fill={VERDE}>atenúa</Txt>
                    <Txt f="a" x={860} y={640} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA} opacity={ac(t, M('agravantes'), M('agravantes') + 0.5)}>agrava</Txt>
                  </g>
                );
              })()}
            </g>
          )}

          {aC > 0.01 && (
            <g opacity={aC}>
              <g transform="translate(560 410)">
                <rect x={-280} y={-180} width={560} height={360} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                <path d="M -280 -156 Q -280 -180 -256 -180 H 256 Q 280 -180 280 -156 V -120 H -280 Z" fill={`url(#${ID}-marca)`} />
                <Txt f="a" x={0} y={-150} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>registro</Txt>
                {Array.from({ length: 5 }, (_, k) => (
                  <g key={k}>
                    <rect x={-240} y={-96 + k * 52} width={480} height={36} rx={10} fill={k === 2 ? ROSA : c.panel2} opacity={k === 2 ? 0.2 + 0.2 * Math.sin(t * 4) : 1} />
                    <rect x={-220} y={-84 + k * 52} width={lerp(180, 300, (k * 37) % 10 / 10)} height={12} rx={6} fill={c.apagado} />
                  </g>
                ))}
              </g>
              <g opacity={Math.min(1, pop(t, M('registro') + 0.8, 0.5))}><Insignia x={560} y={680} texto="5 años" c={c} id={ID} tono="alerta" /></g>
              {(() => {
                const op = e('pyme');
                return op > 0.01 ? <g opacity={op}><Oficinas x={1010} y={620} s={0.55} c={c} t={t} /><Insignia x={900} y={780} texto="amonestación" c={c} id={ID} tono="tenue" /></g> : null;
              })()}
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
