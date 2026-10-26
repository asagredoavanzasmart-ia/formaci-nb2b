import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, tono } from '../../remotion/comun';
import { BaseDatos, Contacto, Hoja, Insignia, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «El papel de la agencia», escena propia. El cliente entrega su base a la agencia con instrucciones:
 * la placa de la agencia gira a «encargada» y la del cliente dice «responsable». Desde la base salen dos
 * vías: el encargo (permitida) y otro fin (con barrera). Si la barrera se abre hacia audiencias propias u
 * otro cliente, la placa gira a «responsable», aparece «personal» y una cadena la une al cliente.
 * Al final, un muro separa los datos de clientes de los propios, cada base con su etiqueta.
 * Texto ≥ 44 en el lienzo y ninguna pieza encima de otra.
 */

export const W = 1200, H = 860;
const ID = 'pdg';

const nombres = ['papel', 'base', 'instrucciones', 'encargada', 'clienteResp', 'conforme', 'prohibido', 'audiencias', 'otroCliente', 'considera', 'personal', 'solidaria', 'propios', 'responsablePropios', 'anotado', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const DBX = 720, DBY = 540; // base del cliente en manos de la agencia
const ENC: [number, number] = [420, 235], OTRO: [number, number] = [700, 235];

/* Diana del encargo. */
const Diana: React.FC<{ x: number; y: number; id: string; c: Tono }> = ({ x, y, id, c }) => (
  <g transform={`translate(${x} ${y})`}>{[50, 34, 18].map((r, k) => <circle key={r} r={r} fill={k % 2 ? c.panel : `url(#${id}-marca)`} />)}</g>
);

/* Cadena de eslabones entre dos puntos de una misma altura. */
const Cadena: React.FC<{ x1: number; x2: number; y: number; u: number; c: Tono }> = ({ x1, x2, y, u, c }) => {
  const n = Math.floor((x2 - x1) / 44);
  return <g>{Array.from({ length: Math.round(n * u) }, (_, k) => <ellipse key={k} cx={x1 + 22 + k * 44} cy={y} rx={26} ry={13} fill="none" stroke={k % 2 ? c.tenue : NARANJA} strokeWidth={7} />)}</g>;
};

/* Embudo de captación propia. */
const Embudo: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -110 -50 L -20 40 V 80 H 20 V 40 L 110 -50 Z" fill={c.apagado} />
    <path d="M 0 -50 H 110 L 20 40 V 80 H 0 Z" fill="#000" opacity={0.1} />
    <ellipse cx={0} cy={-50} rx={110} ry={26} fill={c.panel2} />
  </g>
);

export const PapelPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('anotado') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '¿En qué papel está la agencia?'], [M('base'), 'Con la base de su cliente…'], [M('instrucciones'), '…siguiendo sus instrucciones'],
    [M('encargada'), 'La agencia es encargada'], [M('conforme'), 'Solo conforme al encargo'], [M('prohibido'), 'Prohibido otro fin sin autorización'],
    [M('audiencias'), 'Audiencias propias u otro cliente…'], [M('considera'), '…y pasa a ser responsable'], [M('personal'), 'Responde personal y solidariamente'],
    [M('propios'), 'Sus datos propios'], [M('anotado'), 'Cada base, de quién es y en qué papel'],
  ];

  const actoAB = 1 - ac(t, M('propios') - 0.5, M('propios'));
  const actoC = ac(t, M('propios'), M('propios') + 0.5);
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));

  // Placa de la agencia: ¿qué papel? → encargada → responsable (gira al cambiar).
  const giro1 = ac(t, M('encargada') - 0.3, M('encargada') + 0.3), giro2 = ac(t, M('considera') - 0.3, M('considera') + 0.3);
  const placa = t < M('encargada') ? '¿qué papel?' : t < M('considera') ? 'encargada' : 'responsable';
  const giroPlaca = t < M('encargada') ? giro1 : t < M('considera') ? (giro1 < 1 ? giro1 : giro2) : giro2;

  // La base viaja del cliente a la agencia.
  const viaja = ac(t, M('base'), M('base') + 1.4, 0, 1, Easing.inOut(Easing.cubic));
  const abre = ac(t, M('audiencias'), M('audiencias') + 0.8);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La agencia es encargada con la base del cliente; si usa los datos para otro fin pasa a ser responsable y responde personal y solidariamente">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTOS A y B · el encargo y el cambio de fin */}
          {actoAB > 0.01 && (
            <g opacity={actoAB}>
              {/* Cliente y agencia */}
              <g opacity={ac(t, 0.2, 0.7)}>
                <Oficinas x={230} y={640} s={0.8} c={c} t={t} ventana="#94a3b8" />
                <Txt f="a" x={230} y={735} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>cliente</Txt>
                <Oficinas x={970} y={640} s={0.8} c={c} t={t} luz={0.8} />
                <Txt f="a" x={970} y={735} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>agencia</Txt>
              </g>
              {/* Placas de papel */}
              <g opacity={e('papel')}><Insignia x={970} y={360} texto={placa} c={c} id={ID} giro={giroPlaca} tono={t >= M('considera') ? 'alerta' : 'marca'} ancho={340} /></g>
              <g opacity={e('clienteResp')}><Insignia x={230} y={360} texto="responsable" c={c} id={ID} ancho={330} tono="tenue" /></g>

              {/* La base del cliente, ya en manos de la agencia */}
              {e('base') > 0.01 && <g opacity={e('base')}><BaseDatos x={lerp(380, DBX, viaja)} y={DBY} c={c} t={t} s={0.7} marca={`url(#${ID}-marca)`} /></g>}
              {/* Instrucciones del cliente */}
              {(() => {
                const op = ventana(t, M('instrucciones'), M('conforme'));
                if (op < 0.01) return null;
                const u = ac(t, M('instrucciones'), M('instrucciones') + 1.2, 0, 1, Easing.out(Easing.cubic));
                return <g opacity={op}><Hoja x={lerp(330, 560, u)} y={lerp(460, 420, u)} w={84} h={108} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={1} rot={lerp(-12, 4, u)} /></g>;
              })()}

              {/* Vía del encargo (permitida) */}
              {(() => {
                const d = ac(t, M('conforme'), M('conforme') + 1);
                if (d < 0.01) return null;
                return (
                  <g opacity={Math.min(1, d * 2)}>
                    <path d={`M ${DBX - 30} ${DBY - 20} L ${ENC[0] + 30} ${ENC[1] + 45}`} stroke={NARANJA} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={`${d} 1`} fill="none" />
                    <Diana x={ENC[0]} y={ENC[1]} id={ID} c={c} />
                    <Txt f="a" x={ENC[0]} y={165} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>encargo</Txt>
                    {[0, 1].map((k) => {
                      const u = ((t - M('conforme')) * 0.5 + k / 2) % 1;
                      return <circle key={k} cx={lerp(DBX - 30, ENC[0] + 30, u)} cy={lerp(DBY - 20, ENC[1] + 45, u)} r={9} fill={NARANJA} opacity={Math.sin(Math.PI * u) * d} />;
                    })}
                  </g>
                );
              })()}

              {/* Vía de otro fin, con barrera */}
              {(() => {
                const d = ac(t, M('prohibido'), M('prohibido') + 0.8);
                if (d < 0.01) return null;
                const ang = -80 * abre;
                const quien = t < M('audiencias') ? 0 : t < M('otroCliente') ? 1 : 2;
                return (
                  <g opacity={d}>
                    <path d={`M ${DBX - 10} ${DBY - 30} L ${OTRO[0]} ${OTRO[1] + 50}`} stroke={abre > 0.5 ? ROSA : c.apagado} strokeWidth={8} strokeLinecap="round" fill="none" />
                    <g transform={`translate(${OTRO[0] - 50} 410) rotate(${ang})`}>
                      <rect x={0} y={-9} width={110} height={18} rx={9} fill={ROSA} />
                      <rect x={28} y={-9} width={18} height={18} fill="#fff" opacity={0.8} />
                      <rect x={70} y={-9} width={18} height={18} fill="#fff" opacity={0.8} />
                    </g>
                    <circle cx={OTRO[0] - 50} cy={410} r={10} fill={c.tenue} />
                    <Txt f="a" x={OTRO[0]} y={165} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA}>otro fin</Txt>
                    {quien === 0 && <g transform={`translate(${OTRO[0]} ${OTRO[1]})`}><circle r={46} fill={c.panel2} /><Txt x={0} y={16} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>?</Txt></g>}
                    {quien === 1 && [-46, 0, 46].map((dx, k) => <Persona key={dx} id={ID} x={OTRO[0] + dx} y={OTRO[1] + 52} s={0.38} cuerpo={['#64748b', '#94a3b8', '#475569'][k]} />)}
                    {quien === 2 && <Oficinas x={OTRO[0]} y={OTRO[1] + 52} s={0.42} c={c} t={t} ventana="#94a3b8" />}
                    {abre > 0.5 && [0, 1].map((k) => {
                      const u = ((t - M('audiencias')) * 0.55 + k / 2) % 1;
                      return <circle key={k} cx={lerp(DBX - 10, OTRO[0], u)} cy={lerp(DBY - 30, OTRO[1] + 50, u)} r={9} fill={ROSA} opacity={Math.sin(Math.PI * u)} />;
                    })}
                  </g>
                );
              })()}

              {/* Responde personal y solidariamente */}
              <g opacity={e('personal')}><Insignia x={970} y={808} texto="personal" c={c} id={ID} tono="alerta" ancho={260} /></g>
              {ac(t, M('solidaria'), M('solidaria') + 0.2) > 0 && <Cadena x1={320} x2={830} y={805} u={ac(t, M('solidaria'), M('solidaria') + 1.2)} c={c} />}
            </g>
          )}

          {/* ACTO C · los datos propios y la etiqueta de cada base */}
          {actoC > 0.01 && (
            <g opacity={actoC}>
              <line x1={600} y1={150} x2={600} y2={820} stroke={c.apagado} strokeWidth={6} strokeDasharray="4 14" strokeLinecap="round" />
              {/* Propios: la captación de la agencia llena su base */}
              <Embudo x={900} y={260} c={c} />
              {[0, 1, 2].map((k) => {
                const u = ((t - M('propios')) * 0.45 + k / 3) % 1;
                return <Contacto key={k} x={900 + Math.sin(k * 2 + t) * 30} y={lerp(160, 330, u)} s={0.8} relleno={`url(#${ID}-marca)`} op={Math.sin(Math.PI * u)} />;
              })}
              <BaseDatos x={900} y={420} c={c} t={t} s={0.9} marca={`url(#${ID}-marca)`} />
              <g opacity={e('responsablePropios')}><Insignia x={900} y={700} texto="propia · responsable" c={c} id={ID} tono="alerta" ancho={540} /></g>
              {/* De clientes: encargada */}
              <g opacity={e('anotado')}>
                <BaseDatos x={300} y={420} c={c} t={t} s={0.9} />
                <Insignia x={300} y={700} texto="cliente · encargada" c={c} id={ID} ancho={520} />
              </g>
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
