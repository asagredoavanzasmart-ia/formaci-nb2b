import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, tono } from '../../remotion/comun';
import { Contacto, Insignia, Institucion, MIN_TXT, Oficinas, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Quién es quién», escena propia. Acto 1: el titular entrega sus datos al responsable, que decide
 * fines y medios (una diana); el encargado los trata por cuenta del responsable, atado por un contrato;
 * la Agencia vigila con pulsos. Acto 2: una frontera entre Chile y el extranjero, con un caso por vez
 * (establecida en Chile, encargado afuera, oferta y monitoreo desde afuera, correo ante la Agencia y
 * uso personal fuera de la ley). Texto ≥ 44 en el lienzo y ninguna pieza encima de otra.
 */

export const W = 1200, H = 860;
const ID = 'pdr';

const nombres = ['titular', 'responsable', 'decide', 'encargado', 'cuenta', 'agencia', 'funciones', 'chile', 'establecidos', 'porEncargo', 'ofrece', 'monitorea', 'correo', 'fuera', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const engranaje = (r: number, n: number) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 4; i++) {
    const a = (i / (n * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.76;
    pts.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
};

const Engranaje: React.FC<{ x: number; y: number; r: number; t: number; id: string; c: Tono }> = ({ x, y, r, t, id, c }) => (
  <g transform={`translate(${x} ${y}) rotate(${t * 60})`}>
    <path d={engranaje(r, 9)} fill={`url(#${id}-marca)`} />
    <circle r={r * 0.36} fill={c.panel} />
  </g>
);

/* Casa: uso personal. */
const Casa: React.FC<{ x: number; y: number; c: Tono; id: string }> = ({ x, y, c, id }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={4} rx={110} ry={14} fill="#000" opacity={0.14} />
    <rect x={-90} y={-130} width={180} height={130} rx={6} fill={c.panel2} />
    <path d="M -110 -122 L 0 -200 L 110 -122 Z" fill={`url(#${id}-marca)`} />
    <rect x={-24} y={-76} width={48} height={76} rx={6} fill={c.tenue} />
    <rect x={40} y={-100} width={36} height={36} rx={5} fill={NARANJA} opacity={0.5} />
    <rect x={-76} y={-100} width={36} height={36} rx={5} fill={NARANJA} opacity={0.5} />
  </g>
);

/* Sobre del correo electrónico. */
const Sobre: React.FC<{ x: number; y: number; s?: number; c: Tono }> = ({ x, y, s = 1, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-46} y={-30} width={92} height={60} rx={8} fill={c.panel} stroke={NARANJA} strokeWidth={4} />
    <path d="M -46 -26 L 0 8 L 46 -26" fill="none" stroke={NARANJA} strokeWidth={4} strokeLinejoin="round" />
  </g>
);

/* Paquete de una oferta de bienes o servicios. */
const Paquete: React.FC<{ x: number; y: number; op: number }> = ({ x, y, op }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <rect x={-22} y={-22} width={44} height={44} rx={6} fill="#d99a1e" />
    <rect x={-4} y={-22} width={8} height={44} fill="#fbbf24" />
  </g>
);

export const RolesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('fuera') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Quién es quién'], [M('titular'), 'El titular: a quien se refieren'], [M('responsable'), 'El responsable decide'],
    [M('encargado'), 'El encargado trata los datos'], [M('cuenta'), 'por cuenta del responsable'], [M('agencia'), 'La Agencia es la autoridad'],
    [M('funciones'), 'Dicta, fiscaliza, resuelve y sanciona'], [M('chile'), 'También fuera de Chile'], [M('establecidos'), 'Establecidos en el país'],
    [M('porEncargo'), 'Encargado para un responsable chileno'], [M('ofrece'), 'Ofrece a personas en Chile'], [M('monitorea'), 'o monitorea su comportamiento'],
    [M('correo'), 'Un correo operativo ante la Agencia'], [M('fuera'), 'Fuera: las actividades personales'],
  ];

  const acto1 = 1 - ac(t, M('chile') - 0.5, M('chile'));
  const acto2 = ac(t, M('chile'), M('chile') + 0.5);
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));

  // Casos del acto 2: cada uno ocupa el escenario hasta que entra el siguiente.
  const s1 = ventana(t, M('establecidos'), M('porEncargo'));
  const s2 = ventana(t, M('porEncargo'), M('ofrece'));
  const s34 = ventana(t, M('ofrece'), M('correo'));
  const s5 = ventana(t, M('correo'), M('fuera'));
  const s6 = ventana(t, M('fuera'), tPregunta + 30);
  const lado = (texto: string, x: number, op: number) => <Txt f="a" x={x} y={735} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={op}>{texto}</Txt>;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Titular, responsable, encargado y Agencia; la ley alcanza a quienes están fuera de Chile si ofrecen o monitorean a personas en Chile">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO 1 · los cuatro papeles */}
          {acto1 > 0.01 && (
            <g opacity={acto1}>
              {/* Titular */}
              {e('titular') > 0.01 && (
                <g opacity={e('titular')}>
                  <Persona id={ID} x={170} y={640} s={0.95} />
                  <Txt f="a" x={170} y={735} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>titular</Txt>
                </g>
              )}
              {/* Sus datos viajan al responsable */}
              {t > M('responsable') && [0, 1, 2].map((k) => {
                const u = ((t - M('responsable')) * 0.5 + k / 3) % 1;
                return <Contacto key={k} x={lerp(240, 400, u)} y={560} s={0.8} relleno={`url(#${ID}-marca)`} op={Math.sin(Math.PI * u) * ac(t, M('responsable'), M('responsable') + 0.5)} />;
              })}
              {/* Responsable: decide fines y medios */}
              {e('responsable') > 0.01 && (
                <g opacity={e('responsable')}>
                  <Oficinas x={500} y={640} s={0.72} c={c} t={t} />
                  <Txt f="a" x={500} y={735} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>responsable</Txt>
                </g>
              )}
              {e('decide') > 0.01 && (() => {
                const flecha = ac(t, M('decide') + 0.4, M('decide') + 1.1, 0, 1, Easing.in(Easing.quad));
                return (
                  <g opacity={e('decide')}>
                    <g transform="translate(500 385)">
                      {[52, 36, 20].map((r, k) => <circle key={r} r={r} fill={k % 2 ? c.panel : `url(#${ID}-marca)`} />)}
                      <g transform={`translate(${lerp(-160, 0, flecha)} ${lerp(-60, 0, flecha)}) rotate(20)`}>
                        <rect x={-70} y={-4} width={70} height={8} rx={4} fill={c.texto} />
                        <path d="M 0 -12 L 14 0 L 0 12 Z" fill={c.texto} />
                      </g>
                    </g>
                    <Txt f="a" x={500} y={300} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>fines y medios</Txt>
                  </g>
                );
              })()}
              {/* Encargado: trata por cuenta del responsable */}
              {e('encargado') > 0.01 && (
                <g opacity={e('encargado')}>
                  <Persona id={ID} x={850} y={640} s={0.95} cuerpo="#64748b" />
                  <Engranaje x={735} y={520} r={40} t={t} id={ID} c={c} />
                  <Txt f="a" x={850} y={735} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>encargado</Txt>
                </g>
              )}
              {ac(t, M('cuenta'), M('cuenta') + 0.6) > 0.01 && (() => {
                const d = ac(t, M('cuenta'), M('cuenta') + 0.8);
                const u = ((t - M('cuenta')) * 0.45) % 1;
                return (
                  <g>
                    <path d="M 590 600 Q 680 640 790 600" fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="10 8" opacity={d} />
                    <rect x={lerp(600, 760, u) - 14} y={590 + Math.sin(Math.PI * u) * 22} width={28} height={34} rx={4} fill={c.panel} stroke={NARANJA} strokeWidth={3} opacity={Math.sin(Math.PI * u) * d} />
                  </g>
                );
              })()}
              {/* Agencia: la autoridad, que emite pulsos de vigilancia */}
              {e('agencia') > 0.01 && (
                <g opacity={e('agencia')}>
                  {t > M('funciones') && [0, 1, 2].map((k) => {
                    const u = ((t - M('funciones')) / 1.6 + k / 3) % 1;
                    return <circle key={k} cx={1010} cy={215} r={40 + 70 * u} fill="none" stroke={NARANJA} strokeWidth={4} opacity={(1 - u) * 0.7} />;
                  })}
                  <Institucion x={1010} y={300} s={0.75} c={c} id={ID} escudo />
                  <Txt f="a" x={1010} y={365} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>Agencia</Txt>
                </g>
              )}
            </g>
          )}

          {/* ACTO 2 · también fuera de Chile */}
          {acto2 > 0.01 && (
            <g opacity={acto2}>
              {/* Frontera, con un paso libre por donde van los flujos */}
              <line x1={600} y1={130} x2={600} y2={440} stroke={c.apagado} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" />
              <line x1={600} y1={690} x2={600} y2={820} stroke={c.apagado} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" />
              <Txt x={300} y={190} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA}>Chile</Txt>
              <Txt x={900} y={190} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>extranjero</Txt>

              {/* Caso 1: establecida en Chile */}
              {s1 > 0.01 && (
                <g opacity={s1}>
                  <Oficinas x={300} y={640} s={0.7} c={c} t={t} />
                  <g transform="translate(300 390)">
                    <circle r={36} fill={VERDE} />
                    <path d="M -15 0 L -4 12 L 16 -12" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  {lado('en Chile', 300, 1)}
                </g>
              )}

              {/* Caso 2: encargado afuera que trabaja para un responsable chileno */}
              {s2 > 0.01 && (
                <g opacity={s2}>
                  <Oficinas x={300} y={640} s={0.7} c={c} t={t} />
                  <Persona id={ID} x={900} y={640} s={0.9} cuerpo="#64748b" />
                  <Engranaje x={1010} y={520} r={38} t={t} id={ID} c={c} />
                  <path d="M 380 580 Q 600 520 840 580" fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="10 8" />
                  {[0, 1].map((k) => {
                    const u = ((t - M('porEncargo')) * 0.5 + k / 2) % 1;
                    const x = lerp(400, 820, u), y = 568 - Math.sin(Math.PI * u) * 44;
                    return <Contacto key={k} x={x} y={y} s={0.8} relleno={`url(#${ID}-marca)`} op={Math.sin(Math.PI * u)} />;
                  })}
                  {lado('responsable', 300, 1)}
                  {lado('encargado', 900, 1)}
                </g>
              )}

              {/* Casos 3 y 4: una empresa extranjera ofrece o monitorea a personas en Chile */}
              {s34 > 0.01 && (
                <g opacity={s34}>
                  {[200, 300, 400].map((x, k) => <Persona key={x} id={ID} x={x} y={640} s={0.6} cuerpo={['#64748b', '#94a3b8', '#475569'][k]} />)}
                  <Oficinas x={900} y={640} s={0.7} c={c} t={t} ventana="#94a3b8" />
                  {t < M('monitorea') && [0, 1, 2].map((k) => {
                    const u = ((t - M('ofrece')) * 0.55 + k / 3) % 1;
                    return <Paquete key={k} x={lerp(830, 300 + (k - 1) * 100, u)} y={lerp(560, 500, u) - Math.sin(Math.PI * u) * 50} op={Math.sin(Math.PI * u)} />;
                  })}
                  {t >= M('monitorea') && [0, 1, 2].map((k) => {
                    const u = ((t - M('monitorea')) / 1.4 + k / 3) % 1;
                    const x = lerp(820, 470, u);
                    return <path key={k} d={`M ${x} 500 Q ${x - 40} 570 ${x} 640`} fill="none" stroke={ROSA} strokeWidth={6} strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />;
                  })}
                  {lado('personas', 300, 1)}
                  {lado(t < M('monitorea') ? 'ofrece' : 'monitorea', 900, 1)}
                </g>
              )}

              {/* Caso 5: correo operativo ante la Agencia */}
              {s5 > 0.01 && (() => {
                const u = ac(t, M('correo') + 0.4, M('correo') + 1.8, 0, 1, Easing.inOut(Easing.cubic));
                return (
                  <g opacity={s5}>
                    <Institucion x={300} y={640} s={0.7} c={c} id={ID} escudo />
                    <Oficinas x={900} y={640} s={0.7} c={c} t={t} ventana="#94a3b8" />
                    <Sobre x={lerp(840, 380, u)} y={lerp(560, 560, u) - Math.sin(Math.PI * u) * 60} c={c} />
                    {lado('Agencia', 300, 1)}
                    {lado('correo', 900, 1)}
                  </g>
                );
              })()}

              {/* Caso 6: lo personal queda fuera */}
              {s6 > 0.01 && (
                <g opacity={s6}>
                  <Casa x={300} y={640} c={c} id={ID} />
                  <Insignia x={300} y={370} texto="fuera" c={c} id={ID} tono="alerta" />
                  {lado('uso personal', 300, 1)}
                </g>
              )}
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
