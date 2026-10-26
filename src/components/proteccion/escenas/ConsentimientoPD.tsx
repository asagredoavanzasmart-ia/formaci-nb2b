import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Hoja, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «El consentimiento», escena propia. Acto A: una cerradura de cinco pines; cada condición que se
 * nombra (libre, informado, específico, previo, inequívoco) alinea su pin en la línea de corte, y con
 * los cinco alineados la cerradura gira: el tratamiento es lícito. Acto B: un interruptor que se apaga
 * (revocar), una línea de tiempo que conserva lo anterior (sin efecto retroactivo), dos botones iguales
 * para dar y retirar, y un mandatario con su facultad expresa. Acto C: el registro que lo demuestra
 * frente a un consentimiento sin registro, que para la ley no existe.
 */

export const W = 1200, H = 860;
const ID = 'pdc';

const nombres = ['otorga', 'libre', 'informado', 'especifico', 'previo', 'inequivoco', 'revocar', 'retro', 'medios', 'mandatario', 'demostrar', 'noExiste', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const CONDICIONES: { n: Nombre; txt: string }[] = [
  { n: 'libre', txt: 'libre' }, { n: 'informado', txt: 'informado' }, { n: 'especifico', txt: 'específico' },
  { n: 'previo', txt: 'previo' }, { n: 'inequivoco', txt: 'inequívoco' },
];
const DESFASE = [34, -26, 40, -32, 24]; // cuánto se sale cada pin de la línea de corte antes de alinearse
const LX = 760, LY = 420; // centro de la cerradura (línea de corte en LY)

/* Cerradura de pines: cada pin se alinea con su valor de 0 a 1; `gira` hace rotar el cilindro. */
const Cerradura: React.FC<{ c: Tono; pines: number[]; foco: number; gira: number }> = ({ c, pines, foco, gira }) => (
  <g>
    {/* Cuerpo */}
    <rect x={LX - 250} y={LY - 150} width={500} height={270} rx={34} fill={c.apagado} style={sombra(c.sombra)} />
    <rect x={LX - 230} y={LY - 130} width={460} height={130} rx={18} fill={c.panel2} />
    {/* Cilindro (abajo de la línea de corte), que gira al abrirse */}
    <g transform={`translate(${LX} ${LY + 50}) scale(1 ${1 - 0.25 * Math.sin(Math.PI * gira)}) translate(${-LX} ${-(LY + 50)})`}>
      <rect x={LX - 230} y={LY} width={460} height={100} rx={20} fill={gira > 0.5 ? VERDE : `url(#${ID}-marca)`} opacity={0.9} />
    </g>
    {pines.map((u, k) => {
      const x = LX - 180 + k * 90;
      const d = DESFASE[k] * (1 - u);
      const activo = foco === k;
      return (
        <g key={k}>
          <rect x={x - 22} y={LY - 120} width={44} height={210} rx={10} fill={c.panel} opacity={0.6} />
          {/* pin superior (resorte) y pin inferior: el límite entre ambos debe quedar en la línea de corte */}
          <rect x={x - 16} y={LY - 112} width={32} height={112 + d} rx={8} fill={c.tenue} />
          <rect x={x - 16} y={LY + d} width={32} height={78 - d} rx={8} fill={u > 0.99 ? VERDE : activo ? NARANJA : '#fbbf24'} />
        </g>
      );
    })}
    {/* Línea de corte */}
    <line x1={LX - 240} y1={LY} x2={LX + 240} y2={LY} stroke={c.texto} strokeWidth={3} strokeDasharray="10 8" />
    {/* Bocallave */}
    <g transform={`translate(${LX - 250} ${LY + 50})`}>
      <circle r={20} fill={c.texto} />
      <rect x={-6} y={0} width={12} height={34} rx={4} fill={c.texto} />
    </g>
  </g>
);

/* Interruptor encendido/apagado. */
const Interruptor: React.FC<{ x: number; y: number; on: number; c: Tono }> = ({ x, y, on, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-50} width={220} height={100} rx={50} fill={on > 0.5 ? `url(#${ID}-marca)` : c.apagado} />
    <circle cx={lerp(-60, 60, on)} cy={0} r={40} fill={c.panel} style={sombra(c.sombra, 3, 6)} />
  </g>
);

/* Botón con texto: dar y retirar el consentimiento tienen el mismo tamaño y el mismo costo. */
const Boton: React.FC<{ x: number; y: number; txt: string; c: Tono; id: string; pulsa: number }> = ({ x, y, txt, c, id, pulsa }) => (
  <g transform={`translate(${x} ${y + 6 * pulsa})`}>
    <rect x={-110} y={-44} width={220} height={88} rx={22} fill={`url(#${id}-marca)`} style={sombra(c.sombra, 6 - 5 * pulsa, 10)} />
    <Txt f="a" x={0} y={0} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>{txt}</Txt>
  </g>
);

export const ConsentimientoPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('noExiste') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'La regla general'], [M('otorga'), 'Lícito si la persona lo otorga'], [M('libre'), 'Cinco condiciones'],
    [M('inequivoco'), 'Las cinco, a la vez'], [M('revocar'), 'Revocable en cualquier momento'], [M('retro'), 'Sin efecto retroactivo'],
    [M('medios'), 'Igual de fácil, gratis, siempre'], [M('mandatario'), 'Mandatario: facultad expresa'], [M('demostrar'), 'El responsable lo demuestra'],
    [M('noExiste'), 'Sin registro, no existe'],
  ];

  const actoA = ventana(t, M('otorga') - 0.4, M('revocar'));
  const actoB = ventana(t, M('revocar'), M('demostrar'));
  const actoC = ac(t, M('demostrar'), M('demostrar') + 0.4);

  const pines = CONDICIONES.map((cnd) => ac(t, M(cnd.n) + 0.1, M(cnd.n) + 0.7, 0, 1, Easing.out(Easing.back(1.6))));
  let foco = -1;
  CONDICIONES.forEach((cnd, k) => { if (t >= M(cnd.n)) foco = k; });
  const gira = ac(t, M('inequivoco') + 1, M('inequivoco') + 2);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="El consentimiento debe ser libre, informado, específico, previo e inequívoco; es revocable y lo demuestra el responsable">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO A · cinco condiciones alinean la cerradura */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              {/* La persona otorga su consentimiento */}
              <g opacity={Math.min(1, pop(t, M('otorga'), 0.6))}>
                <Persona id={ID} x={170} y={790} s={0.75} />
              </g>
              {(() => {
                const u = ac(t, M('otorga') + 0.4, M('otorga') + 2.2, 0, 1, Easing.inOut(Easing.cubic));
                if (u <= 0 || u >= 1) return null;
                return <g transform={`translate(${lerp(230, LX - 290, u)} ${lerp(660, LY + 50, u) - Math.sin(Math.PI * u) * 70})`}><rect x={-34} y={-22} width={68} height={44} rx={10} fill={`url(#${ID}-marca)`} /><path d="M -14 0 L -4 10 L 14 -10" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" /></g>;
              })()}
              <g opacity={ac(t, M('otorga'), M('otorga') + 0.6)}><Cerradura c={c} pines={pines} foco={foco} gira={gira} /></g>
              {/* Lista de condiciones */}
              {CONDICIONES.map((cnd, k) => {
                const e = Math.min(1, pop(t, M(cnd.n), 0.45));
                if (e < 0.01) return null;
                const y = 230 + k * 80;
                return (
                  <g key={cnd.n} opacity={e} transform={`translate(${(1 - e) * -24} 0)`}>
                    <circle cx={62} cy={y} r={16} fill={pines[k] > 0.99 ? VERDE : NARANJA} />
                    {pines[k] > 0.99 && <path d={`M 54 ${y} L 60 ${y + 7} L 71 ${y - 7}`} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
                    <Txt f="a" x={92} y={y} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{cnd.txt}</Txt>
                  </g>
                );
              })}
              <g opacity={Math.min(1, pop(t, M('inequivoco') + 1.6, 0.5))}><Insignia x={LX} y={640} texto="lícito" c={c} id={ID} tono="verde" ancho={220} /></g>
            </g>
          )}

          {/* ACTO B · revocar, sin efecto retroactivo, medios iguales y mandatario */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {/* Interruptor que se apaga; luego el mandatario ocupa su lugar */}
              <g opacity={ventana(t, M('revocar'), M('mandatario'))}><Interruptor x={300} y={340} on={1 - ac(t, M('revocar') + 0.6, M('revocar') + 1.2)} c={c} /></g>
              {(() => {
                const e = ventana(t, M('mandatario'), M('demostrar') + 5);
                if (e < 0.01) return null;
                return (
                  <g opacity={e}>
                    <Persona id={ID} x={230} y={440} s={0.75} cuerpo="#64748b" />
                    <g transform="translate(360 360) rotate(6)"><Hoja x={0} y={0} w={110} h={140} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={ac(t, M('mandatario') + 0.3, M('mandatario') + 1.5)} /></g>
                    <Txt f="a" x={300} y={520} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>facultad expresa</Txt>
                  </g>
                );
              })()}

              {/* Línea de tiempo: lo anterior a la revocación sigue valiendo */}
              {(() => {
                const e = ac(t, M('retro'), M('retro') + 0.6);
                if (e < 0.01) return null;
                const d = ac(t, M('retro'), M('retro') + 1.4);
                return (
                  <g opacity={e}>
                    <rect x={120} y={604} width={480 * d} height={20} rx={10} fill={`url(#${ID}-marcaH)`} />
                    <rect x={600} y={608} width={480 * d} height={12} rx={6} fill={c.apagado} />
                    <g transform="translate(600 614)">
                      <circle r={26} fill={c.panel} stroke={ROSA} strokeWidth={6} />
                      <path d="M -9 -9 L 9 9 M 9 -9 L -9 9" stroke={ROSA} strokeWidth={6} strokeLinecap="round" />
                    </g>
                    <Txt f="a" x={330} y={690} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>antes: vale</Txt>
                    <Txt f="a" x={870} y={690} textAnchor="middle" fontSize={MIN_TXT} fill={c.tenue}>después</Txt>
                  </g>
                );
              })()}

              {/* Dar y retirar: dos botones iguales */}
              {(() => {
                const e = Math.min(1, pop(t, M('medios'), 0.5));
                if (e < 0.01) return null;
                const p1 = Math.max(0, Math.sin((t - M('medios')) * 3)), p2 = Math.max(0, Math.sin((t - M('medios')) * 3 + Math.PI));
                return (
                  <g opacity={e}>
                    <Boton x={720} y={340} txt="dar" c={c} id={ID} pulsa={p1} />
                    <Boton x={970} y={340} txt="retirar" c={c} id={ID} pulsa={p2} />
                    <Txt f="a" x={845} y={470} textAnchor="middle" fontSize={MIN_TXT} fill={VERDE} peso={700}>gratis, siempre</Txt>
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO C · el registro lo demuestra; sin registro, no existe */}
          {actoC > 0.01 && (
            <g opacity={actoC}>
              <g transform="translate(400 430)" opacity={Math.min(1, pop(t, M('demostrar'), 0.6))}>
                <rect x={-250} y={-200} width={500} height={400} rx={28} fill={c.panel} style={sombra(c.sombra)} />
                <path d="M -250 -172 Q -250 -200 -222 -200 H 222 Q 250 -200 250 -172 V -120 H -250 Z" fill={`url(#${ID}-marca)`} />
                <Txt f="a" x={0} y={-160} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill="#fff" peso={700}>registro</Txt>
                {['cuándo', 'cómo', 'para qué'].map((txt, k) => {
                  const u = ac(t, M('demostrar') + 0.5 + k * 0.6, M('demostrar') + 1 + k * 0.6);
                  const y = -60 + k * 95;
                  return (
                    <g key={txt} opacity={u}>
                      <circle cx={-200} cy={y} r={16} fill={VERDE} />
                      <path d={`M -208 ${y} L -202 ${y + 7} L -191 ${y - 7}`} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                      <Txt f="a" x={-170} y={y} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                      <rect x={30} y={y - 7} width={180 * u} height={14} rx={7} fill={c.apagado} />
                    </g>
                  );
                })}
              </g>
              {/* Un consentimiento sin registro se desvanece */}
              {(() => {
                const e = Math.min(1, pop(t, M('noExiste') - 0.2, 0.5));
                if (e < 0.01) return null;
                const borra = ac(t, M('noExiste') + 0.6, M('noExiste') + 2.2);
                return (
                  <g opacity={e}>
                    <g opacity={1 - 0.75 * borra}>
                      <rect x={800} y={300} width={260} height={260} rx={24} fill="none" stroke={c.tenue} strokeWidth={5} strokeDasharray="14 10" />
                      <path d="M 890 430 L 920 462 L 980 398" fill="none" stroke={c.tenue} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <line x1={790} y1={570} x2={lerp(790, 1070, borra)} y2={290} stroke={ROSA} strokeWidth={8} strokeLinecap="round" />
                    <Txt f="a" x={930} y={650} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA} peso={700}>no existe</Txt>
                  </g>
                );
              })()}
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
