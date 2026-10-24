import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROJO, VERDE, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/* Tiempos en segundos desde el inicio de la diapositiva en el audio de la clase (1219.72 s). */
const T = {
  sigla: 0.15, todoLoQueHay: 2.29, noExistiera: 8.71,
  juicio: 11.29, veredicto: 20.04,
  consecuencias: 39.09, exceso: 40.69, encuadre: 47.69, tasaBase: 56.29,
  desarma: 65.76,
};
export const W = 1200, H = 900;
const ID = 'wy';
const GRIS = '#94a3b8';

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={70} textAnchor="middle" fontSize={44} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);
const Chip: React.FC<{ c: ReturnType<typeof tono>; x: number; y: number; p: number; txt: string; w?: number; marca?: boolean }> = ({ c, x, y, p, txt, w = 300, marca }) => (
  <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}>
    <rect x={-w / 2} y={-28} width={w} height={56} rx={28} fill={marca ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra * 0.6, 4, 10)} />
    <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={marca ? '#fff' : c.texto}>{txt}</Txt>
  </g>
);

/* Acto 1 · El foco: solo tres piezas iluminadas; el resto, ignorado */
const Foco: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.juicio);
  if (op <= 0) return null;
  const sigla = pop(t, T.sigla);
  const vistas: [number, number][] = [[460, 480], [600, 440], [740, 480]];
  const ocultas: [number, number][] = [[260, 420], [280, 560], [360, 650], [560, 650], [700, 650], [840, 650], [920, 560], [940, 420], [600, 620]];
  const barre = ac(t, T.todoLoQueHay, T.todoLoQueHay + 2, -8, 8);
  const desvanece = ac(t, T.noExistiera, T.noExistiera + 1.4);
  return (
    <g opacity={op}>
      <Titulo c={c} a="WYSIATI:" b="lo que ves es todo lo que hay" />
      <g opacity={sigla} transform={`rotate(${barre} 600 250)`} style={{ transformOrigin: '600px 250px' }}>
        <polygon points="600,250 440,620 760,620" fill={`url(#${ID}-marca)`} opacity={0.14} />
        <circle cx={600} cy={238} r={24} fill={`url(#${ID}-marca)`} />
        <rect x={580} y={210} width={40} height={20} rx={8} fill={isDark ? '#3a3a3a' : '#cbd5e1'} />
      </g>
      {/* Lo que no ves: se desvanece como si no existiera */}
      {ocultas.map(([x, y], i) => (
        <g key={i} opacity={(1 - desvanece) * 0.5 + 0.08} transform={`translate(0 ${desvanece * 20})`}>
          <rect x={x - 24} y={y - 24} width={48} height={48} rx={12} fill={GRIS} />
        </g>
      ))}
      {/* Lo que ves: iluminado, estable */}
      {vistas.map(([x, y], i) => (
        <g key={i} opacity={pop(t, T.sigla + 0.3 + i * 0.2, 0.5)}>
          <rect x={x - 32} y={y - 32} width={64} height={64} rx={16} fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
        </g>
      ))}
      <Chip c={c} x={600} y={780} p={pop(t, T.noExistiera)} txt="trata lo que no sabe como si no existiera" w={620} marca />
    </g>
  );
};

/* Acto 2 · El juicio de una sola parte: con menos datos, más seguridad */
const Juicio: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.juicio, T.consecuencias);
  if (op <= 0) return null;
  const a = pop(t, T.juicio);
  const medidorA = ac(t, T.veredicto - 0.3, T.veredicto + 1.2, 0, 0.92);
  const medidorB = ac(t, T.veredicto - 0.3, T.veredicto + 1.2, 0, 0.5);
  const dial = (x: number, v: number, label: string, destacado: boolean) => (
    <g transform={`translate(${x} 560)`}>
      <path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke={c.panel2} strokeWidth={22} strokeLinecap="round" />
      <path d="M -90 0 A 90 90 0 0 1 90 0" fill="none" stroke={destacado ? `url(#${ID}-marcaH)` : GRIS} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - v} />
      <Txt x={0} y={-20} textAnchor="middle" fontSize={40} fill={destacado ? NARANJA : c.tenue}>{Math.round(v * 100)}%</Txt>
      <Txt f="a" x={0} y={50} textAnchor="middle" fontSize={24} fill={c.texto}>{label}</Txt>
    </g>
  );
  return (
    <g opacity={op}>
      <Titulo c={c} a="El juicio de" b="una sola parte" />
      <g opacity={a}>
        <g transform="translate(350 290)">
          <Persona id={ID} x={0} y={0} s={1.1} />
          <rect x={-120} y={-230} width={240} height={110} rx={20} fill={c.panel} style={sombra(c.sombra * 0.7)} />
          <Txt f="a" x={0} y={-190} textAnchor="middle" fontSize={24} fill={c.tenue}>oye solo</Txt>
          <Txt f="a" x={0} y={-160} textAnchor="middle" fontSize={26} fill={c.texto}>una parte</Txt>
        </g>
        <g transform="translate(850 290)">
          <Persona id={ID} x={0} y={0} s={1.1} cuerpo={`url(#${ID}-pizarra)`} pelo="#4a4a4a" />
          <rect x={-150} y={-230} width={300} height={110} rx={20} fill={c.panel} style={sombra(c.sombra * 0.7)} />
          <Txt f="a" x={0} y={-190} textAnchor="middle" fontSize={24} fill={c.tenue}>oye las</Txt>
          <Txt f="a" x={0} y={-160} textAnchor="middle" fontSize={26} fill={c.texto}>dos partes</Txt>
        </g>
      </g>
      {dial(350, medidorA, 'más seguro de su veredicto', true)}
      {dial(850, medidorB, 'sabe que es parcial', false)}
    </g>
  );
};

/* Acto 3 · Tres consecuencias */
const Consecuencias: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.consecuencias, T.desarma);
  if (op <= 0) return null;
  const confianza = ac(t, T.exceso + 0.4, T.exceso + 1.4);
  const encuadreA = ac(t, T.encuadre + 0.3, T.encuadre + 1, 0, 1);
  const tasaB = ac(t, T.tasaBase + 0.3, T.tasaBase + 1.3);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Tres" b="consecuencias" />
      {/* 1. Exceso de confianza: la historia (no la evidencia) llena el medidor */}
      <g opacity={pop(t, T.exceso)} transform="translate(230 380)">
        <Txt f="a" x={0} y={-150} textAnchor="middle" fontSize={26} fill={c.texto}>exceso de confianza</Txt>
        <rect x={-80} y={-40} width={160} height={200} rx={20} fill={c.panel2} />
        <rect x={-80} y={160 - 200 * confianza} width={160} height={200 * confianza} rx={20} fill={`url(#${ID}-marca)`} />
        <Txt f="a" x={0} y={200} textAnchor="middle" fontSize={22} fill={c.tenue}>mide la historia,</Txt>
        <Txt f="a" x={0} y={228} textAnchor="middle" fontSize={22} fill={c.tenue}>no la evidencia</Txt>
      </g>
      {/* 2. Efectos marco: mismo dato, dos caras */}
      <g opacity={pop(t, T.encuadre)} transform="translate(600 380)">
        <Txt f="a" x={0} y={-150} textAnchor="middle" fontSize={26} fill={c.texto}>efectos marco</Txt>
        <g opacity={1 - encuadreA}>
          <circle r={70} fill={VERDE} />
          <Txt x={0} y={14} textAnchor="middle" fontSize={32} fill="#fff">90%</Txt>
          <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={20} fill={c.tenue}>supervivencia</Txt>
        </g>
        <g opacity={encuadreA}>
          <circle r={70} fill={ROJO} />
          <Txt x={0} y={14} textAnchor="middle" fontSize={32} fill="#fff">10%</Txt>
          <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={20} fill={c.tenue}>mortalidad</Txt>
        </g>
        <Txt f="a" x={0} y={160} textAnchor="middle" fontSize={20} fill={c.tenue}>el mismo dato</Txt>
      </g>
      {/* 3. Olvido de la tasa base: el caso tapa la estadística */}
      <g opacity={pop(t, T.tasaBase)} transform="translate(970 380)">
        <Txt f="a" x={0} y={-150} textAnchor="middle" fontSize={26} fill={c.texto}>olvido de la tasa base</Txt>
        <rect x={-80} y={-40} width={160} height={110} rx={16} fill={c.panel2} />
        <Txt f="a" x={0} y={20} textAnchor="middle" fontSize={20} fill={c.tenue} opacity={1 - tasaB}>estadística</Txt>
        <rect x={-100} y={70 - tasaB * 10} width={200} height={130} rx={20} fill={`url(#${ID}-marca)`} opacity={tasaB} style={sombra(c.sombra)} />
        <Txt x={0} y={135} textAnchor="middle" fontSize={28} fill="#fff" opacity={tasaB}>el caso</Txt>
        <Txt f="a" x={0} y={230} textAnchor="middle" fontSize={20} fill={c.tenue}>tapa lo que no está</Txt>
      </g>
    </g>
  );
};

/* Acto 4 · La pregunta que desarma: qué tendría que ser verdad */
const Desarma: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.desarma, 999);
  if (op <= 0) return null;
  const grieta = ac(t, T.desarma + 0.6, T.desarma + 1.6);
  return (
    <g opacity={op}>
      <g transform={`translate(600 400) scale(${0.8 + 0.2 * (1 - grieta)})`}>
        <rect x={-320} y={-130} width={640} height={260} rx={40} fill={c.panel} style={sombra(c.sombra)} />
        <path d="M -200 -130 L -150 130 M 100 -130 L 50 130" stroke={isDark ? '#1a1a1a' : '#f8f9fa'} strokeWidth={10} opacity={grieta} />
        <Txt f="a" x={0} y={-50} textAnchor="middle" fontSize={26} fill={c.tenue}>la pregunta que lo desarma</Txt>
        <Txt x={0} y={5} textAnchor="middle" fontSize={34} fill={c.texto}>«¿qué tendría que ser</Txt>
        <Txt x={0} y={50} textAnchor="middle" fontSize={34} fill={c.texto}>verdad para que esto</Txt>
        <Txt x={0} y={95} textAnchor="middle" fontSize={34} fill={`url(#${ID}-marcaH)`}>fuera falso?»</Txt>
      </g>
    </g>
  );
};

export const WysiatiEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Foco isDark={isDark} t={t} />
        <Juicio isDark={isDark} t={t} />
        <Consecuencias isDark={isDark} t={t} />
        <Desarma isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
