import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { VERDE, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Insignia, MIN_TXT, PanelPregunta, Rotulo } from './comunPD';

/**
 * «La lista de comprobación», escena propia. Tres portapapeles (agencia, contratos y cada campaña)
 * cuyas casillas se marcan una a una mientras el relator recorre cada nivel; al final, la política de
 * privacidad publicada.
 */

export const W = 1200, H = 860;
const ID = 'pdc2';

const nombres = ['tres', 'agencia', 'contratos', 'campana', 'politica', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

export const ChecklistPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('politica') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Para comprobar'], [M('tres'), 'Tres niveles'], [M('agencia'), 'En la agencia'], [M('contratos'), 'En los contratos'],
    [M('campana'), 'En cada campaña'], [M('politica'), 'Y la política publicada'],
  ];
  // Cada portapapeles marca sus casillas repartidas en el tramo de su nivel.
  const niveles: { n: Nombre; txt: string; x: number; fin: number; filas: number }[] = [
    { n: 'agencia', txt: 'agencia', x: 220, fin: M('contratos'), filas: 6 },
    { n: 'contratos', txt: 'contratos', x: 600, fin: M('campana'), filas: 5 },
    { n: 'campana', txt: 'campaña', x: 980, fin: M('politica'), filas: 7 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Lista de comprobación en tres niveles: agencia, contratos y cada campaña">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          {niveles.map((nv, i) => {
            const marco = ac(t, M('tres') + i * 0.3, M('tres') + 0.8 + i * 0.3);
            const activo = ac(t, M(nv.n), M(nv.n) + 0.5);
            if (marco < 0.01) return null;
            const paso = (nv.fin - M(nv.n)) / (nv.filas + 0.5);
            return (
              <g key={nv.n} opacity={Math.max(0.4 * marco, activo)} transform={`translate(${nv.x} 470)`}>
                <rect x={-160} y={-230} width={320} height={460} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                <rect x={-50} y={-250} width={100} height={40} rx={12} fill={c.tenue} />
                <Txt f="a" x={0} y={-170} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} peso={700}>{nv.txt}</Txt>
                {Array.from({ length: nv.filas }, (_, k) => {
                  const m = ac(t, M(nv.n) + 0.5 + k * paso, M(nv.n) + 0.9 + k * paso);
                  const y = -110 + k * (300 / nv.filas);
                  return (
                    <g key={k}>
                      <rect x={-120} y={y - 16} width={32} height={32} rx={8} fill={m > 0.5 ? VERDE : c.panel} stroke={m > 0.5 ? VERDE : c.tenue} strokeWidth={3} />
                      <path d={`M ${-113} ${y} L ${-106} ${y + 7} L ${-94} ${y - 8}`} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={m} />
                      <rect x={-72} y={y - 6} width={k % 2 ? 150 : 190} height={12} rx={6} fill={c.apagado} />
                    </g>
                  );
                })}
              </g>
            );
          })}
          <g opacity={Math.min(1, pop(t, M('politica'), 0.5))}><Insignia x={600} y={780} texto="política publicada" c={c} id={ID} tono="verde" /></g>
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
