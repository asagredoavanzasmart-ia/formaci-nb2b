import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Hoja, Insignia, Oficinas, PanelPregunta, Rotulo } from './comunPD';

/**
 * «El modelo de prevención», escena propia. Un anillo de siete segmentos (los siete elementos del
 * programa) que se encienden alrededor del delegado de protección de datos; sus tareas orbitan a su
 * alrededor. Fuera del anillo, el contrato donde se incorporan las reglas, la pyme cuyo dueño puede ser
 * el delegado y el sello de certificación por tres años.
 */

export const W = 1200, H = 860;
const ID = 'pdh';

const nombres = ['modelo', 'siete', 'delegado', 'procesos', 'reporte', 'contratos', 'dueno', 'tareas', 'certifica', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const CX = 600, CY = 440, R = 200;

export const PrevencionPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('certifica') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  // Momentos de los siete elementos: los nombrados con marca y los intermedios repartidos entre ellas.
  const tiempos = [M('delegado'), (M('delegado') * 2 + M('procesos')) / 3, (M('delegado') + M('procesos') * 2) / 3, M('procesos'), (M('procesos') + M('reporte')) / 2, M('reporte'), (M('reporte') + M('contratos')) / 2];
  const rotulos: [number, string][] = [
    [0.2, 'Una herramienta para ordenar'], [M('modelo'), 'El modelo de prevención'], [M('siete'), 'Siete elementos'],
    [tiempos[0], 'Un delegado'], [tiempos[1], 'Sus medios y facultades'], [tiempos[2], 'Qué datos y de quiénes'], [tiempos[3], 'Los procesos de riesgo'],
    [tiempos[4], 'Protocolos y reglas'], [tiempos[5], 'Reportes internos y a la Agencia'], [tiempos[6], 'Sanciones internas'],
    [M('contratos'), 'En los contratos'], [M('dueno'), 'En una pyme, el dueño'], [M('tareas'), 'Sus tareas'], [M('certifica'), 'Certificado por tres años'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Un programa de cumplimiento de siete elementos con un delegado, certificado por tres años">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* El anillo de siete elementos */}
          <g opacity={e('modelo', -0.3)}>
            {Array.from({ length: 7 }, (_, k) => {
              const a0 = -90 + k * (360 / 7) + 3, a1 = a0 + 360 / 7 - 6;
              const rad = (d: number) => (d * Math.PI) / 180;
              const on = ac(t, tiempos[k], tiempos[k] + 0.6);
              const contorno = ac(t, M('siete') + k * 0.15, M('siete') + 0.5 + k * 0.15);
              const p = (a: number, r: number) => `${CX + r * Math.cos(rad(a))} ${CY + r * Math.sin(rad(a))}`;
              return (
                <g key={k}>
                  <path d={`M ${p(a0, R)} A ${R} ${R} 0 0 1 ${p(a1, R)}`} fill="none" stroke={c.apagado} strokeWidth={44} opacity={contorno} />
                  <path d={`M ${p(a0, R)} A ${R} ${R} 0 0 1 ${p(a1, R)}`} fill="none" stroke={k % 2 ? ROSA : NARANJA} strokeWidth={44} opacity={on} />
                  <Txt x={CX + (R) * Math.cos(rad((a0 + a1) / 2))} y={CY + (R) * Math.sin(rad((a0 + a1) / 2))} dominantBaseline="central" textAnchor="middle" fontSize={26} fill="#fff" opacity={on}>{k + 1}</Txt>
                </g>
              );
            })}
          </g>

          {/* El delegado al centro, con sus tareas que orbitan */}
          <g opacity={e('delegado')}>
            <Persona id={ID} x={CX} y={CY + 90} s={0.95} />
            <circle cx={CX + 26} cy={CY + 10} r={12} fill="#fbbf24" />
          </g>
          {t > M('tareas') && Array.from({ length: 6 }, (_, k) => {
            const a = (k / 6) * Math.PI * 2 + (t - M('tareas')) * 0.8;
            return <circle key={k} cx={CX + Math.cos(a) * 130} cy={CY - 20 + Math.sin(a) * 100} r={10} fill={k % 2 ? NARANJA : ROSA} opacity={ac(t, M('tareas'), M('tareas') + 0.6)} />;
          })}

          {/* Fuera del anillo */}
          <g opacity={e('contratos')}><Hoja x={170} y={700} w={130} h={160} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={ac(t, M('contratos'), M('contratos') + 1.4)} /></g>
          {(() => {
            const op = e('dueno');
            return op > 0.01 ? <g opacity={op}><Oficinas x={1040} y={700} s={0.45} c={c} t={t} /><Insignia x={980} y={800} texto="pyme: dueño" c={c} id={ID} tono="tenue" /></g> : null;
          })()}
          {(() => {
            const s = Math.min(1, pop(t, M('certifica'), 0.6));
            if (s < 0.01) return null;
            return (
              <g opacity={s} transform={`translate(1040 300) scale(${s}) rotate(-8)`} style={sombra(c.sombra, 4, 10)}>
                <circle r={92} fill={`url(#${ID}-marca)`} />
                <circle r={78} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="6 6" />
                <Txt f="a" x={0} y={0} dominantBaseline="central" textAnchor="middle" fontSize={30} fill="#fff" peso={700}>3 años</Txt>
              </g>
            );
          })()}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
