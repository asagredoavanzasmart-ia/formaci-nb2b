import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/* Tiempos en segundos desde el inicio de la diapositiva en el audio de la clase (925,96 s). */
const T = {
  ford: 13.17, vida: 20.3, especie: 27.13, politico: 33.81,
  aptitudes: 37.83, escopeta: 40.5, equivalencia: 48.5,
  problema: 59.54, final: 65.54,
};
export const W = 1200, H = 900;
const ID = 'su';

const PARES = [
  { a: T.ford, dificil: '¿Debo invertir en acciones de Ford?', facil: '¿Me gustan los autos de Ford?', icono: 'auto' as const },
  { a: T.vida, dificil: '¿Qué tan satisfecho estoy con mi vida?', facil: '¿De qué humor estoy ahora?', icono: 'humor' as const },
  { a: T.especie, dificil: '¿Cuánto merece esta especie en peligro?', facil: '¿Cuánto me conmueve esta imagen?', icono: 'animal' as const },
  { a: T.politico, dificil: '¿Llegará lejos este político?', facil: '¿Tiene cara de competente?', icono: 'cara' as const },
];

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={70} textAnchor="middle" fontSize={42} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);

const Icono: React.FC<{ tipo: 'auto' | 'humor' | 'animal' | 'cara'; c: ReturnType<typeof tono> }> = ({ tipo, c }) => {
  if (tipo === 'auto') return (
    <g>
      <path d="M -70 10 L -58 -22 Q -46 -40 -10 -40 L 10 -40 Q 46 -40 58 -22 L 70 10 Q 70 26 56 26 L -56 26 Q -70 26 -70 10 Z" fill={`url(#${ID}-marca)`} />
      <path d="M -36 -12 L -22 -32 L 22 -32 L 36 -12 Z" fill="#bde3f2" />
      <circle cx={-38} cy={28} r={16} fill="#2b2b2b" /><circle cx={38} cy={28} r={16} fill="#2b2b2b" />
    </g>
  );
  if (tipo === 'humor') return (
    <g>
      <circle r={52} fill={`url(#${ID}-marca)`} />
      <circle cx={-18} cy={-10} r={6} fill="#fff" /><circle cx={18} cy={-10} r={6} fill="#fff" />
      <path d="M -22 18 Q 0 38 22 18" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
  );
  if (tipo === 'animal') return (
    <g>
      <ellipse rx={48} ry={36} fill={`url(#${ID}-marca)`} />
      <circle cx={-34} cy={-24} r={16} fill={`url(#${ID}-marca)`} /><circle cx={34} cy={-24} r={16} fill={`url(#${ID}-marca)`} />
      <circle cx={-14} cy={-6} r={4} fill="#fff" /><circle cx={14} cy={-6} r={4} fill="#fff" />
      <path d="M -10 14 Q 0 22 10 14" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      <circle r={44} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} />
      <circle cy={-6} r={16} fill={c.tenue} />
      <path d="M -24 36 Q -24 10 0 10 Q 24 10 24 36" fill={c.tenue} />
    </g>
  );
};

/* Acto 1 · Las cuatro sustituciones: la pregunta fácil tapa a la difícil */
const Sustituciones: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.aptitudes);
  if (op <= 0) return null;
  let actual = 0;
  for (let k = PARES.length - 1; k >= 0; k--) if (t >= PARES[k].a) { actual = k; break; }
  const par = PARES[actual];
  const entra = pop(t, par.a);
  const tapa = ac(t, par.a + 1.8, par.a + 2.6);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Respondes otra" b="pregunta sin darte cuenta" />
      <g opacity={entra} transform={`translate(260 260) scale(${0.7 + 0.3 * entra})`}>
        <Icono tipo={par.icono} c={c} />
      </g>
      <g opacity={entra} transform={`translate(0 ${(1 - entra) * 20})`}>
        <rect x={420} y={180} width={640} height={150} rx={28} fill={c.panel} style={sombra(c.sombra)} />
        <Txt f="a" x={740} y={225} textAnchor="middle" fontSize={22} fill={c.tenue}>pregunta difícil</Txt>
        <Txt x={740} y={275} textAnchor="middle" fontSize={30} fill={c.texto}>{par.dificil}</Txt>
      </g>
      <g opacity={tapa} transform={`translate(0 ${(1 - tapa) * 220}) scale(${0.8 + 0.2 * tapa})`}>
        <rect x={420} y={370} width={640} height={150} rx={28} fill={`url(#${ID}-marca)`} style={{ filter: 'drop-shadow(0 10px 24px rgba(239,55,92,0.4))' }} />
        <Txt f="a" x={740} y={415} textAnchor="middle" fontSize={22} fill="#fff" opacity={0.85}>respondes</Txt>
        <Txt x={740} y={465} textAnchor="middle" fontSize={30} fill="#fff">{par.facil}</Txt>
      </g>
      {/* Indicador de los cuatro casos */}
      <g transform="translate(600 820)">
        {PARES.map((p, k) => (
          <circle key={k} cx={-90 + k * 60} cy={0} r={12} fill={k === actual ? `url(#${ID}-marcaH)` : c.panel2} />
        ))}
      </g>
    </g>
  );
};

/* Acto 2 · Dos aptitudes: escopeta mental y equivalencia de intensidades */
const Aptitudes: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.aptitudes, T.problema);
  if (op <= 0) return null;
  const escopeta = pop(t, T.escopeta);
  const disparos = ac(t, T.escopeta + 0.3, T.escopeta + 1.8);
  const equiv = pop(t, T.equivalencia);
  const convierte = ac(t, T.equivalencia + 0.3, T.equivalencia + 1.8);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Dos aptitudes" b="que lo hacen posible" />
      {/* Escopeta mental: dispara cálculos de más, sin que se los pidas */}
      <g opacity={escopeta}>
        <Txt f="a" x={320} y={180} textAnchor="middle" fontSize={28} fill={c.texto}>escopeta mental</Txt>
        <g transform="translate(200 400) rotate(-18)">
          <rect x={-120} y={-18} width={200} height={36} rx={14} fill="#8a5a2b" />
          <rect x={-150} y={-10} width={50} height={20} rx={10} fill="#5a3a1a" />
        </g>
        {Array.from({ length: 5 }, (_, k) => {
          const u = Math.max(0, Math.min(1, disparos * 2.6 - k * 0.5));
          return <circle key={k} cx={320 + u * 240} cy={360 - u * 80 - k * 4} r={8} fill={k % 2 ? ROSA : NARANJA} opacity={u > 0 && u < 1 ? 1 : 0} />;
        })}
        <Txt f="a" x={320} y={560} textAnchor="middle" fontSize={22} fill={c.tenue}>calcula de más, sin que se lo pidas</Txt>
      </g>
      {/* Equivalencia de intensidades: convierte entre escalas distintas */}
      <g opacity={equiv}>
        <Txt f="a" x={880} y={180} textAnchor="middle" fontSize={28} fill={c.texto}>equivalencia de intensidades</Txt>
        <g transform="translate(760 350)">
          <rect x={-16} y={-70 * convierte} width={32} height={70 * convierte} rx={10} fill={`url(#${ID}-marca)`} />
          <Txt f="a" x={0} y={30} textAnchor="middle" fontSize={20} fill={c.tenue}>«leía a los 4 años»</Txt>
        </g>
        <path d={`M 830 ${320 - 40 * convierte} Q 930 ${260 - 40 * convierte} 1000 ${320 - 90 * convierte}`} fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="10 8" opacity={convierte} />
        <g transform="translate(1000 350)">
          <rect x={-16} y={-120 * convierte} width={32} height={120 * convierte} rx={10} fill={c.panel2} />
          <Txt f="a" x={0} y={30} textAnchor="middle" fontSize={20} fill={c.tenue}>una estatura</Txt>
          <Txt f="a" x={0} y={56} textAnchor="middle" fontSize={20} fill={c.tenue}>o un sueldo</Txt>
        </g>
      </g>
    </g>
  );
};

/* Acto 3 · Cierre: la respuesta fácil se disfraza de respuesta a la difícil */
const Cierre: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.problema, 999);
  if (op <= 0) return null;
  const mascara = pop(t, T.problema);
  const pregunta = pop(t, T.final);
  return (
    <g opacity={op}>
      <g opacity={mascara} transform={`translate(600 320) scale(${0.7 + 0.3 * mascara})`}>
        <circle r={100} fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
        <Persona id={ID} x={0} y={60} s={0.9} />
        <Txt f="a" x={0} y={160} textAnchor="middle" fontSize={26} fill={c.texto}>la respuesta fácil se presenta</Txt>
        <Txt f="a" x={0} y={190} textAnchor="middle" fontSize={26} fill={c.texto}>disfrazada de respuesta a la difícil</Txt>
      </g>
      <g opacity={pregunta} transform="translate(600 650)">
        <rect x={-460} y={-70} width={920} height={140} rx={34} fill={c.panel} style={sombra(c.sombra)} />
        <Txt f="a" x={0} y={-10} textAnchor="middle" fontSize={28} fill={c.texto}>¿Qué pregunta importante podrías estar respondiendo,</Txt>
        <Txt f="a" x={0} y={34} textAnchor="middle" fontSize={28} fill={c.texto}>sin notarlo, con una mucho más fácil?</Txt>
      </g>
    </g>
  );
};

export const SustitucionEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Sustituciones isDark={isDark} t={t} />
        <Aptitudes isDark={isDark} t={t} />
        <Cierre isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
