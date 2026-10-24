import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «Heurística afectiva: primero te gusta, después lo justificas», animada con Remotion. Tiempos relativos a la diapositiva. */
const T = {
  slovic: 3.56, gusta: 5.75, justificas: 7.19, simpatias: 8.99, crees: 10.93, argumento: 12.84, decidido: 14.82,
  directivo: 17.6, millones: 19.45, ford: 20.75, analisis: 22.14, salon: 23.87, encantado: 25.63, buenos: 28.46, barata: 30.96,
  reunion: 33.92, contesta: 36.29, aprueba: 38.27, increible: 40.18, nombre: 42.09, sustitucion: 43.71,
  otroModo: 46.65, interfiere: 48.36, esLa: 51.83,
};
export const W = 1200, H = 900;
const ID = 'af';

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={70} textAnchor="middle" fontSize={44} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);
const Corazon: React.FC<{ x: number; y: number; s?: number; fill?: string }> = ({ x, y, s = 1, fill = ROSA }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 30 C -50 -5, -32 -48, 0 -22 C 32 -48, 50 -5, 0 30 Z" fill={fill} />
);
const Bocadillo: React.FC<{ c: ReturnType<typeof tono>; x: number; y: number; p: number; txt: string; w?: number; cola?: 'izq' | 'der' }> = ({ c, x, y, p, txt, w = 360, cola = 'izq' }) => (
  <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}>
    <rect x={-w / 2} y={-40} width={w} height={80} rx={26} fill={c.panel} style={sombra(c.sombra)} />
    <path d={cola === 'izq' ? `M ${-w / 2 + 40} 38 L ${-w / 2 + 30} 70 L ${-w / 2 + 80} 38 Z` : `M ${w / 2 - 40} 38 L ${w / 2 - 30} 70 L ${w / 2 - 80} 38 Z`} fill={c.panel} />
    <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill={c.texto}>{txt}</Txt>
  </g>
);

/* 1 · La balanza: el afecto pesa primero; el argumento llega después */
const Balanza: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.directivo);
  if (op <= 0) return null;
  const corazon = pop(t, T.gusta, 0.6);
  const inclina = ac(t, T.gusta + 0.2, T.gusta + 1.2);
  const datos = ac(t, T.justificas, T.justificas + 1.2);
  const ang = -13 * inclina;
  const d = 230 * Math.sin((13 * Math.PI) / 180) * inclina;
  const flecha = ac(t, T.argumento, T.argumento + 1.2);
  const orden = pop(t, T.decidido);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Primero te gusta," b="después lo justificas" />
      <Txt f="a" x={600} y={125} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={ac(t, T.slovic, T.slovic + 0.5)}>Paul Slovic</Txt>
      <rect x={588} y={300} width={24} height={380} rx={12} fill="#64748b" />
      <rect x={480} y={670} width={240} height={36} rx={18} fill="#475569" style={sombra(c.sombra)} />
      <g transform={`rotate(${ang} 600 300)`}><rect x={360} y={290} width={480} height={20} rx={10} fill="#94a3b8" /></g>
      <circle cx={600} cy={300} r={18} fill={NARANJA} />
      {/* Platillo del afecto */}
      <g transform={`translate(0 ${d})`}>
        <polygon points="370,300 310,440 430,440" fill={c.tenue} opacity={0.15} />
        <ellipse cx={370} cy={445} rx={90} ry={20} fill="#64748b" />
        <g opacity={Math.min(1, corazon)} transform={`translate(0 ${(1 - corazon) * -160})`}><Corazon x={370} y={400} s={1.2} /></g>
        <g opacity={corazon} transform="translate(300 360)"><circle r={24} fill={NARANJA} /><Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill="#fff">1º</Txt></g>
        <Txt f="a" x={370} y={510} textAnchor="middle" fontSize={28} fill={NARANJA} opacity={corazon}>me gusta</Txt>
      </g>
      {/* Platillo de los datos: llegan después y se acomodan al gusto */}
      <g transform={`translate(0 ${-d})`}>
        <polygon points="830,300 770,440 890,440" fill={c.tenue} opacity={0.15} />
        <ellipse cx={830} cy={445} rx={90} ry={20} fill="#64748b" />
        {[0, 1, 2].map((k) => <rect key={k} x={790 + k * 30} y={440 - (30 + k * 22) * datos} width={22} height={(30 + k * 22) * datos} rx={5} fill={isDark ? '#5b6b82' : '#94a3b8'} />)}
        <g opacity={datos} transform="translate(900 360)"><circle r={24} fill={c.apagado} /><Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={c.texto}>2º</Txt></g>
        <Txt f="a" x={830} y={510} textAnchor="middle" fontSize={28} fill={c.tenue} opacity={datos}>los argumentos</Txt>
      </g>
      {/* Simpatías y antipatías */}
      <g opacity={ac(t, T.simpatias, T.simpatias + 0.5) * (1 - ac(t, T.argumento - 0.3, T.argumento))}>
        <Txt x={480} y={210} textAnchor="middle" fontSize={56}>👍</Txt>
        <Txt x={720} y={210} textAnchor="middle" fontSize={56}>👎</Txt>
        <Txt f="a" x={600} y={250} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={ac(t, T.crees, T.crees + 0.5)}>deciden lo que crees sobre el mundo</Txt>
      </g>
      <g opacity={flecha}>
        <path d={`M 440 360 Q 600 ${200 - 20 * flecha} ${440 + 330 * flecha} 360`} fill="none" stroke={NARANJA} strokeWidth={6} strokeDasharray="14 10" />
        <Txt f="a" x={600} y={230} textAnchor="middle" fontSize={24} fill={NARANJA}>el argumento llega al final</Txt>
      </g>
      <g opacity={orden} transform={`translate(600 790) scale(${0.7 + 0.3 * orden})`}>
        <rect x={-260} y={-34} width={520} height={68} rx={34} fill={`url(#${ID}-marca)`} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill="#fff">ordena lo que ya habías decidido</Txt>
      </g>
    </g>
  );
};

/* 2 · El ejecutivo que compró Ford porque le gustaron los autos */
const Ford: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.directivo, T.reunion);
  if (op <= 0) return null;
  const pers = pop(t, T.directivo);
  const fajos = ac(t, T.millones, T.millones + 1);
  const viaje = ac(t, T.ford, T.ford + 1);
  const auto = pop(t, T.salon, 0.6);
  const brillo = t > T.encantado ? 0.5 + 0.5 * Math.sin((t - T.encantado) * 6) : 0;
  const barata = ac(t, T.barata, T.barata + 0.5);
  return (
    <g opacity={op}>
      <Titulo c={c} a="El ejecutivo y" b="las acciones de Ford" />
      <g opacity={pers}><Persona id={ID} x={220} y={620} s={1.4} corbata /></g>
      {/* Decenas de millones viajan a las acciones */}
      {[0, 1, 2, 3].map((k) => (
        <g key={k} opacity={fajos * (1 - viaje * 0.9)} transform={`translate(${330 + k * 18 + viaje * 560} ${560 - k * 22 - viaje * 220})`}>
          <rect x={-46} y={-20} width={92} height={40} rx={6} fill="#6fbf73" /><circle r={9} fill="#4c9a50" />
        </g>
      ))}
      <g opacity={ac(t, T.ford - 0.2, T.ford + 0.4)} transform="translate(940 320)">
        <rect x={-140} y={-70} width={280} height={140} rx={24} fill={c.panel} style={sombra(c.sombra)} />
        <Txt x={0} y={-12} textAnchor="middle" fontSize={34} fill={c.texto}>Ford</Txt>
        <Txt f="a" x={0} y={34} textAnchor="middle" fontSize={22} fill={c.tenue}>acciones</Txt>
        {/* Lo que nunca revisó */}
        <g opacity={barata} transform="translate(160 -60)">
          <rect x={-80} y={-28} width={160} height={56} rx={28} fill={isDark ? '#3a1f22' : '#fde2e4'} />
          <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={22} fill={ROJO}>¿barata?</Txt>
        </g>
      </g>
      <g opacity={barata} transform="translate(940 470)">
        <circle cx={-6} cy={-6} r={28} fill="none" stroke={c.tenue} strokeWidth={8} />
        <rect x={14} y={14} width={12} height={40} rx={6} fill={c.tenue} transform="rotate(-45 20 34)" />
        <path d="M -44 -44 L 44 44" stroke={ROJO} strokeWidth={8} strokeLinecap="round" />
        <Txt f="a" x={0} y={90} textAnchor="middle" fontSize={22} fill={c.tenue}>nunca lo revisó</Txt>
      </g>
      {/* Su «análisis»: el salón del automóvil */}
      <Txt f="a" x={620} y={470} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={ac(t, T.analisis, T.analisis + 0.5)}>su gran análisis…</Txt>
      <g opacity={Math.min(1, auto)} transform={`translate(620 ${640 + (1 - auto) * 40})`}>
        <path d="M -150 20 L -130 -30 Q -110 -60 -60 -62 L 60 -62 Q 110 -60 130 -30 L 150 20 Q 150 40 130 40 L -130 40 Q -150 40 -150 20 Z" fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
        <path d="M -90 -30 L -70 -52 L 70 -52 L 90 -30 Z" fill="#bde3f2" />
        <circle cx={-85} cy={42} r={26} fill="#2b2b2b" /><circle cx={85} cy={42} r={26} fill="#2b2b2b" />
        {[[-170, -70], [170, -80], [0, -110]].map(([x, y], k) => (
          <path key={k} transform={`translate(${x} ${y}) scale(${0.6 + 0.6 * brillo})`} d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z" fill="#fbbf24" opacity={brillo} />
        ))}
      </g>
      <g opacity={ac(t, T.encantado, T.encantado + 0.5)}><Corazon x={220} y={380} s={0.6 + 0.08 * brillo} /></g>
      <Bocadillo c={c} x={380} y={300} p={pop(t, T.buenos)} txt="«sí que hacen buenos autos»" w={400} />
    </g>
  );
};

/* 3 · En la reunión: la respuesta no contesta la pregunta */
const Reunion: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.reunion, T.otroModo);
  if (op <= 0) return null;
  const pregunta = pop(t, T.contesta), respuesta = pop(t, T.increible);
  const choque = ac(t, T.increible + 0.8, T.increible + 1.4);
  const nombre = pop(t, T.sustitucion);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Cómo detectarlo" b="en una reunión" />
      <Persona id={ID} x={250} y={700} s={1.2} cuerpo={`url(#${ID}-pizarra)`} pelo="#4a4a4a" />
      <Persona id={ID} x={950} y={700} s={1.2} corbata />
      <Bocadillo c={c} x={360} y={300} p={pregunta} txt="¿La acción está barata?" w={420} />
      <g opacity={Math.min(1, respuesta)} transform={`translate(840 430) scale(${0.6 + 0.4 * respuesta})`}>
        <rect x={-230} y={-40} width={460} height={80} rx={26} fill={`url(#${ID}-marca)`} />
        <path d="M 150 38 L 160 70 L 110 38 Z" fill={ROSA} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill="#fff">«¡El producto se ve increíble!»</Txt>
        <Corazon x={-200} y={-46} s={0.45} fill="#fff" />
      </g>
      {/* No encajan: la respuesta contesta otra pregunta */}
      <g opacity={choque} transform="translate(600 370)">
        <circle r={36} fill={ROJO} />
        <Txt f="a" x={0} y={12} textAnchor="middle" fontSize={38} fill="#fff">≠</Txt>
      </g>
      <g opacity={nombre} transform={`translate(600 820) scale(${0.7 + 0.3 * nombre})`}>
        <rect x={-330} y={-38} width={660} height={76} rx={38} fill={c.panel} style={{ filter: 'drop-shadow(0 6px 18px rgba(255,133,29,0.35))' }} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill={c.texto}>sustitución de preguntas <tspan fill={NARANJA}>guiada por el afecto</tspan></Txt>
      </g>
      <Txt f="a" x={600} y={740} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={ac(t, T.nombre, T.nombre + 0.5)}>tienes derecho a ponerle nombre</Txt>
    </g>
  );
};

/* 4 · La emoción es la decisión */
const Cierre: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.otroModo, 999);
  if (op <= 0) return null;
  const a = pop(t, T.interfiere), b = ac(t, T.esLa, T.esLa + 0.8);
  const late = 1 + 0.06 * Math.sin(t * 6);
  return (
    <g opacity={op}>
      <g transform={`translate(600 380) scale(${(1.2 + 0.8 * b) * late})`}><Corazon x={0} y={0} s={2} fill={b > 0.5 ? `url(#${ID}-marca)` : ROSA} /></g>
      <g opacity={a * (1 - b)}>
        <Txt x={600} y={640} textAnchor="middle" fontSize={40} fill={c.texto}>La emoción <tspan textDecoration="line-through" fill={c.tenue}>interfiere con</tspan> la decisión</Txt>
      </g>
      <g opacity={b}>
        <Txt x={600} y={660} textAnchor="middle" fontSize={56} fill={c.texto}>La emoción <tspan fill={`url(#${ID}-marcaH)`}>es</tspan> la decisión</Txt>
        <Txt f="a" x={600} y={720} textAnchor="middle" fontSize={26} fill={c.tenue}>en la mayoría de los casos</Txt>
      </g>
    </g>
  );
};

export const AfectivaEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Balanza isDark={isDark} t={t} />
        <Ford isDark={isDark} t={t} />
        <Reunion isDark={isDark} t={t} />
        <Cierre isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
