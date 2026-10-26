import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Candado, Insignia, MIN_TXT, Oficinas, PanelPregunta, Rotulo, Visto, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «La cadena de encargados», escena propia. Abajo, la cadena cliente → agencia → plataforma, unida por
 * contratos. Arriba, el contrato de encargo con sus seis puntos. Un subencargado solo entra con
 * autorización por escrito; una cadena muestra la responsabilidad solidaria; el candado, el secreto y la
 * seguridad; una alerta sube al responsable y, al terminar, los datos vuelven. Al final, los dos
 * contratos que la agencia debe revisar.
 */

export const W = 1200, H = 860;
const ID = 'pde';

const nombres = ['cadena', 'proveedores', 'objeto', 'delegar', 'solidario', 'deberes', 'reportar', 'devolver', 'dos', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const NX = [180, 600, 1020], NY = 640; // cliente, agencia, plataforma

/* Contrato pequeño entre dos eslabones. */
const MiniContrato: React.FC<{ x: number; y: number; c: Tono; id: string; s?: number }> = ({ x, y, c, id, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-32} y={-40} width={64} height={80} rx={8} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
    <rect x={-32} y={-40} width={64} height={16} rx={8} fill={`url(#${id}-marca)`} />
    {[-14, -2, 10].map((yy) => <rect key={yy} x={-22} y={yy} width={44} height={6} rx={3} fill={c.apagado} />)}
    <path d="M -20 28 q 6 -10 12 0 t 12 0" fill="none" stroke={NARANJA} strokeWidth={3} />
  </g>
);

export const EncargadosPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('dos') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Una campaña, varias empresas'], [M('cadena'), 'El cliente contrata a la agencia…'], [M('proveedores'), '…y la agencia a sus proveedores'],
    [M('objeto'), 'El contrato de encargo'], [M('delegar'), 'Subcontratar: solo por escrito'], [M('solidario'), 'Y se sigue respondiendo'],
    [M('deberes'), 'Secreto y seguridad'], [M('reportar'), 'Las vulneraciones se reportan'], [M('devolver'), 'Al terminar: suprimir o devolver'],
    [M('dos'), 'Dos contratos que revisar'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const contratoOp = ventana(t, M('objeto'), M('dos'));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Cliente, agencia y proveedores se ordenan con contratos de encargo; subcontratar requiere autorización escrita">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* La cadena */}
          <g opacity={e('cadena', -0.4)}>
            <Oficinas x={NX[0]} y={NY} s={0.7} c={c} t={t} ventana="#94a3b8" />
            <Txt f="a" x={NX[0]} y={NY + 76} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>cliente</Txt>
            <Oficinas x={NX[1]} y={NY} s={0.7} c={c} t={t} luz={0.8} />
            <Txt f="a" x={NX[1]} y={NY + 76} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>agencia</Txt>
            <line x1={NX[0] + 90} y1={NY - 70} x2={NX[1] - 70} y2={NY - 70} stroke={c.apagado} strokeWidth={5} />
          </g>
          <g opacity={e('proveedores')}>
            <BaseDatos x={NX[2]} y={NY - 120} c={c} t={t} s={0.75} />
            <Txt f="a" x={NX[2]} y={NY + 76} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>plataforma</Txt>
            <line x1={NX[1] + 90} y1={NY - 70} x2={NX[2] - 70} y2={NY - 70} stroke={c.apagado} strokeWidth={5} />
          </g>
          {/* Contratos de cada eslabón (se destacan al final) */}
          {(() => {
            const dos = ac(t, M('dos'), M('dos') + 0.6);
            return (
              <g>
                <g opacity={e('cadena', 0.4)}><MiniContrato x={390} y={NY - 70} c={c} id={ID} s={1 + 0.35 * dos} /></g>
                <g opacity={e('proveedores', 0.4)}><MiniContrato x={810} y={NY - 70} c={c} id={ID} s={1 + 0.35 * dos} /></g>
                {dos > 0.01 && <g opacity={dos}><Visto x={430} y={NY - 130} /><Visto x={850} y={NY - 130} /></g>}
              </g>
            );
          })()}

          {/* El contrato de encargo y sus seis puntos */}
          {contratoOp > 0.01 && (
            <g opacity={contratoOp} transform="translate(560 300)">
              <rect x={-200} y={-120} width={400} height={240} rx={22} fill={c.panel} style={sombra(c.sombra)} />
              <path d="M -200 -98 Q -200 -120 -178 -120 H 178 Q 200 -120 200 -98 V -66 H -200 Z" fill={`url(#${ID}-marca)`} />
              <Txt f="a" x={0} y={-93} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>encargo</Txt>
              {Array.from({ length: 6 }, (_, k) => {
                const u = ac(t, M('objeto') + 0.3 + k * 0.7, M('objeto') + 0.8 + k * 0.7);
                const col = k % 2, fil = Math.floor(k / 2);
                return (
                  <g key={k} opacity={u}>
                    <circle cx={-160 + col * 190} cy={-20 + fil * 50} r={11} fill={NARANJA} />
                    <rect x={-138 + col * 190} y={-26 + fil * 50} width={120 * u} height={12} rx={6} fill={c.apagado} />
                  </g>
                );
              })}
            </g>
          )}

          {/* Subencargado: solo con autorización por escrito */}
          {(() => {
            const op = e('delegar');
            if (op < 0.01) return null;
            const d = ac(t, M('delegar') + 0.4, M('delegar') + 1.2);
            return (
              <g opacity={op}>
                <BaseDatos x={1040} y={210} c={c} t={t} s={0.5} />
                <path d={`M ${NX[2]} ${NY - 130} L ${NX[2] + 10} ${lerp(NY - 130, 300, d)}`} stroke={NARANJA} strokeWidth={5} strokeDasharray="8 8" />
                <g opacity={Math.min(1, pop(t, M('delegar') + 1, 0.5))}><Insignia x={1040} y={410} texto="escrito" c={c} id={ID} tono="verde" /></g>
              </g>
            );
          })()}

          {/* Responsabilidad solidaria: una cadena une a todos */}
          {(() => {
            const u = ac(t, M('solidario'), M('solidario') + 1.4);
            if (u < 0.01) return null;
            const n = 20;
            return <g>{Array.from({ length: Math.round(n * u) }, (_, k) => <ellipse key={k} cx={190 + k * 42} cy={800} rx={24} ry={12} fill="none" stroke={k % 2 ? c.tenue : NARANJA} strokeWidth={6} />)}</g>;
          })()}

          {/* Secreto y seguridad del encargado */}
          <g opacity={e('deberes')}><Candado x={1130} y={NY - 70} s={0.6} id={ID} /></g>

          {/* La vulneración sube al responsable; al terminar, los datos vuelven */}
          {(() => {
            const u = ((t - M('reportar')) * 0.5) % 1;
            const op = ventana(t, M('reportar'), M('devolver'));
            return op > 0.01 ? <g opacity={op}><circle cx={lerp(NX[2] - 80, NX[1] + 80, u)} cy={NY - 70} r={14} fill={ROSA} /><g transform={`translate(${NX[1] + 78} ${NY - 200})`}><circle r={24} fill={ROSA} /><Txt x={0} y={0} dominantBaseline="central" textAnchor="middle" fontSize={30} fill="#fff">!</Txt></g></g> : null;
          })()}
          {(() => {
            const op = ventana(t, M('devolver'), M('dos'));
            if (op < 0.01) return null;
            return <g opacity={op}>{[0, 1, 2].map((k) => { const u = ((t - M('devolver')) * 0.5 + k / 3) % 1; return <rect key={k} x={lerp(NX[2] - 80, NX[1] + 80, u) - 12} y={NY - 82} width={24} height={24} rx={5} fill={NARANJA} opacity={Math.sin(Math.PI * u)} />; })}</g>;
          })()}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
