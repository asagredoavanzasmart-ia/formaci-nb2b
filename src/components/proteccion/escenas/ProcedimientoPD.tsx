import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Cruz, Institucion, MIN_TXT, PanelPregunta, Reloj, Rotulo, Sobre, Visto, lerp } from './comunPD';

/**
 * «Procedimiento y plazos», escena propia. Arriba, la solicitud (un sobre) con la identificación del
 * titular; al medio, una línea de tiempo: acuse de recibo en el día 0, la barra que se llena hasta los
 * 30 días corridos y la prórroga hasta otros 30; a la derecha, la carpeta de respaldos. Si se rechaza,
 * una rama baja hasta la Agencia con sus 30 días hábiles. Abajo a la izquierda, el carril rápido del
 * bloqueo: un cronómetro de 2 días hábiles.
 */

export const W = 1200, H = 860;
const ID = 'pdm';

const nombres = ['llega', 'identificar', 'acuse', 'treinta', 'prorroga', 'respaldos', 'rechaza', 'reclamar', 'bloqueo', 'dos', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const X0 = 170, X30 = 640, X60 = 1040, YB = 330;

export const ProcedimientoPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('dos') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Un procedimiento con plazos'], [M('llega'), 'La solicitud llega por escrito'], [M('identificar'), 'Identifica al titular'],
    [M('acuse'), 'Acusar recibo'], [M('treinta'), '30 días corridos…'], [M('prorroga'), '…prorrogables una vez'], [M('respaldos'), 'Guardar los respaldos'],
    [M('rechaza'), 'Si se rechaza, fundado'], [M('reclamar'), '30 días hábiles para reclamar'], [M('bloqueo'), 'Lo más urgente: el bloqueo'],
    [M('dos'), '2 días hábiles'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const llena = ac(t, M('treinta'), M('treinta') + 1.6);
  const prorr = ac(t, M('prorroga'), M('prorroga') + 1.4);
  const rama = ac(t, M('rechaza'), M('rechaza') + 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Acuse de recibo, respuesta en 30 días corridos prorrogables una vez, 30 días hábiles para reclamar y bloqueo en 2 días hábiles">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* La solicitud llega */}
          {(() => {
            const u = ac(t, M('llega') - 0.3, M('llega') + 0.9);
            return u > 0.01 ? <g opacity={u}><Sobre x={lerp(40, X0, u)} y={205} s={1.1} c={c} /></g> : null;
          })()}
          <g opacity={e('identificar')} transform="translate(310 205)">
            <rect x={-60} y={-40} width={120} height={80} rx={10} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
            <circle cx={-28} cy={-6} r={14} fill={`url(#${ID}-cara)`} />
            <path d="M -46 28 Q -28 6 -10 28 Z" fill={`url(#${ID}-marca)`} />
            <rect x={2} y={-14} width={44} height={8} rx={4} fill={c.apagado} />
            <rect x={2} y={4} width={30} height={8} rx={4} fill={c.apagado} />
          </g>

          {/* Línea de tiempo */}
          <g opacity={ac(t, M('llega'), M('llega') + 0.6)}>
            <rect x={X0} y={YB - 10} width={X60 - X0} height={20} rx={10} fill={c.apagado} opacity={0.5} />
            <rect x={X0} y={YB - 10} width={(X30 - X0) * llena} height={20} rx={10} fill={`url(#${ID}-marcaH)`} />
            <rect x={X30} y={YB - 6} width={(X60 - X30) * prorr} height={12} rx={6} fill={NARANJA} opacity={0.55} />
            <line x1={X30} y1={YB - 26} x2={X30} y2={YB + 26} stroke={c.texto} strokeWidth={4} opacity={llena} />
            <Txt f="a" x={(X0 + X30) / 2} y={YB - 34} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={llena}>30 días</Txt>
            <Txt f="a" x={(X30 + X60) / 2} y={YB - 34} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA} opacity={prorr}>+30</Txt>
          </g>
          <g opacity={e('acuse')}><Visto x={X0} y={YB} s={1.1} /><Txt f="a" x={X0} y={YB + 64} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>acuse</Txt></g>

          {/* Respaldos */}
          <g opacity={e('respaldos')} transform={`translate(${X60} 210)`}>
            <path d="M -60 -36 H -16 L -4 -24 H 60 V 40 H -60 Z" fill="#f59e0b" />
            <rect x={-60} y={-18} width={120} height={58} rx={6} fill="#fbbf24" />
            <rect x={-40} y={0} width={80} height={8} rx={4} fill="#fff" opacity={0.7} />
          </g>

          {/* Si se rechaza: fundado, y 30 días hábiles para reclamar ante la Agencia */}
          {rama > 0.01 && (
            <g opacity={rama}>
              <line x1={X30} y1={YB + 20} x2={X30} y2={lerp(YB + 20, 500, rama)} stroke={ROSA} strokeWidth={6} strokeLinecap="round" />
              <Cruz x={X30} y={520} />
            </g>
          )}
          {(() => {
            const op = e('reclamar');
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                <path d={`M ${X30 + 30} 530 Q 760 540 830 590`} fill="none" stroke={ROSA} strokeWidth={5} strokeDasharray="8 8" />
                <Institucion x={920} y={610} s={0.5} c={c} id={ID} escudo />
                <Txt f="a" x={920} y={665} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>30 hábiles</Txt>
              </g>
            );
          })()}

          {/* El carril rápido del bloqueo */}
          {(() => {
            const op = e('bloqueo');
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                <Reloj x={260} y={590} r={64} t={t} c={c} vel={4} />
                <Txt f="a" x={260} y={705} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA} peso={700}>{t < M('dos') ? 'bloqueo' : '2 días hábiles'}</Txt>
              </g>
            );
          })()}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
