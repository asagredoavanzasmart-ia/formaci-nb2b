import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Insignia, Institucion, MIN_TXT, PanelPregunta, Reloj, Rotulo, Sobre, lerp, ventana } from './comunPD';

/**
 * «Cuando algo falla», escena propia. Una base que gotea con su alarma: el aviso viaja a la Agencia
 * contra el reloj y una bitácora registra cada incidente. Si hay datos sensibles, salen sobres a cada
 * titular o, si no se puede, un aviso en un medio masivo. Arriba, la cadena encargado → responsable →
 * Agencia; ocultarlo a propósito es gravísimo.
 */

export const W = 1200, H = 860;
const ID = 'pdi';

const nombres = ['informar', 'rapido', 'registrar', 'sensibles', 'titulares', 'medio', 'cadena', 'gravisima', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

export const IncidentesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('gravisima') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cuando algo falla'], [M('informar'), 'Informar a la Agencia'], [M('rapido'), 'Sin dilaciones'], [M('registrar'), 'Registrar cada incidente'],
    [M('sensibles'), 'Si hay datos sensibles…'], [M('titulares'), '…avisar a cada titular'], [M('medio'), 'o en un medio masivo'],
    [M('cadena'), 'Encargado, responsable, Agencia'], [M('gravisima'), 'Ocultarlo: gravísima'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const alarma = 0.5 + 0.5 * Math.sin(t * 8);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Una vulneración se reporta a la Agencia sin demora, se registra y, en casos sensibles, se avisa a cada titular">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* La base que gotea, con su alarma */}
          <g opacity={ac(t, 0.2, 0.8)}>
            <circle cx={220} cy={400} r={120} fill={ROSA} opacity={0.12 * alarma} />
            <BaseDatos x={220} y={320} c={c} t={t} marca={`url(#${ID}-marca)`} />
            {[0, 1, 2].map((k) => { const u = ((t * 0.7) + k / 3) % 1; return <path key={k} transform={`translate(${190 + k * 30} ${470 + 60 * u})`} d="M 0 -10 C 5 -3 8 2 8 6 C 8 12 -8 12 -8 6 C -8 2 -5 -3 0 -10 Z" fill={ROSA} opacity={1 - u} />; })}
          </g>

          {/* El aviso viaja a la Agencia */}
          {(() => {
            const op = e('informar');
            if (op < 0.01) return null;
            const u = ((t - M('informar')) * 0.5) % 1;
            return (
              <g opacity={op}>
                <path d="M 320 370 Q 600 330 860 390" fill="none" stroke={ROSA} strokeWidth={5} strokeDasharray="10 8" />
                <circle cx={lerp(320, 860, u)} cy={lerp(370, 390, u) - Math.sin(Math.PI * u) * 30} r={13} fill={ROSA} />
                <Institucion x={980} y={440} s={0.7} c={c} id={ID} escudo />
                <Txt f="a" x={980} y={500} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>Agencia</Txt>
              </g>
            );
          })()}
          {(() => {
            const op = ventana(t, M('rapido'), M('cadena'));
            return op > 0.01 ? <g opacity={op}><Reloj x={600} y={255} r={46} t={t} c={c} vel={5} /></g> : null;
          })()}

          {/* Bitácora del incidente */}
          {(() => {
            const op = e('registrar');
            if (op < 0.01) return null;
            return (
              <g opacity={op} transform="translate(600 560)">
                <rect x={-120} y={-85} width={240} height={170} rx={14} fill={c.panel} style={sombra(c.sombra)} />
                <rect x={-120} y={-85} width={26} height={170} rx={8} fill={`url(#${ID}-marca)`} />
                {[0, 1, 2, 3].map((k) => <rect key={k} x={-80} y={-55 + k * 34} width={170 * ac(t, M('registrar') + 0.4 + k * 0.5, M('registrar') + 0.9 + k * 0.5)} height={10} rx={5} fill={c.apagado} />)}
              </g>
            );
          })()}

          {/* Datos sensibles: aviso a cada titular o en un medio masivo */}
          <g opacity={e('sensibles')}><Insignia x={220} y={610} texto="sensibles" c={c} id={ID} tono="alerta" /></g>
          {(() => {
            const op = e('titulares');
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                {[760, 880, 1000].map((x, k) => <Persona key={x} id={ID} x={x} y={800} s={0.5} cuerpo={['#64748b', '#94a3b8', '#475569'][k]} />)}
                {t < M('medio') && [0, 1, 2].map((k) => {
                  const u = ac(t, M('titulares') + 0.4 + k * 0.4, M('titulares') + 1.6 + k * 0.4, 0, 1, Easing.inOut(Easing.cubic));
                  const x = lerp(400, 760 + k * 120, u), y = lerp(690, 660, u) + Math.sin(Math.PI * u) * 80;
                  return u > 0 && u < 1 ? <Sobre key={k} x={x} y={y} s={0.6} c={c} color={ROSA} /> : null;
                })}
              </g>
            );
          })()}
          {(() => {
            const op = ventana(t, M('medio'), M('cadena'));
            if (op < 0.01) return null;
            return (
              <g opacity={op} transform="translate(480 760)">
                <rect x={-90} y={-60} width={180} height={110} rx={14} fill={c.texto} />
                <rect x={-78} y={-48} width={156} height={86} rx={8} fill={`url(#${ID}-marca)`} opacity={0.6 + 0.4 * alarma} />
                <line x1={-30} y1={-60} x2={-60} y2={-96} stroke={c.texto} strokeWidth={5} />
                <line x1={30} y1={-60} x2={60} y2={-96} stroke={c.texto} strokeWidth={5} />
              </g>
            );
          })()}

          {/* La cadena del aviso */}
          {(() => {
            const op = e('cadena');
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                <Insignia x={220} y={185} texto="encargado" c={c} id={ID} tono="tenue" />
                <path d="M 370 185 L 420 185" stroke={ROSA} strokeWidth={6} strokeLinecap="round" /><path d="M 416 173 L 432 185 L 416 197 Z" fill={ROSA} />
                <Insignia x={600} y={185} texto="responsable" c={c} id={ID} tono="tenue" />
                <path d="M 780 185 L 830 185" stroke={ROSA} strokeWidth={6} strokeLinecap="round" /><path d="M 826 173 L 842 185 L 826 197 Z" fill={ROSA} />
                <Insignia x={980} y={185} texto="Agencia" c={c} id={ID} />
              </g>
            );
          })()}
          <g opacity={e('gravisima')}><Insignia x={980} y={610} texto="gravísima" c={c} id={ID} tono="alerta" /></g>
          {NARANJA && null}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
