import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, VERDE, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «Efecto halo: el orden cambia a la persona», animada con Remotion. Tiempos relativos a la diapositiva. */
const T = {
  orden: 2.55, asch: 5.6, seis: 8.36, adj: [9.82, 10.85, 11.6, 12.35, 13.18, 14.0], inverso: 15.44, mejor: 18.78,
  testarudo: 20.48, intDil: 24.11, firmeza: 26.84, envTest: 29.94, amenaza: 32.28,
  primeros: 34.57, tono: 36.02, encajar: 38.64, coherente: 41.7, precisa: 43.51, exagera: 45.79,
  antidoto: 48.28, descorrelacionar: 49.27, examenes: 51.55, primera: 53.5, aparte: 55.48, segunda: 58.96,
  comite: 60.88, escriba: 62.85, discusion: 64.66, entrevista: 66.45, dimension: 68.0,
  regla: 70.58, suman: 74.31, independientes: 75.41, contagia: 77.28, cinco: 79.55, repetido: 82.03,
};
export const W = 1200, H = 700;
const ID = 'ha';
const ADJ = ['inteligente', 'diligente', 'impulsivo', 'crítico', 'testarudo', 'envidioso'];
const CALIDO = '#ffb547', FRIO = '#7c8ea6';

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={62} textAnchor="middle" fontSize={44} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);

const Halo: React.FC<{ x: number; y: number; p: number; color: string; t: number }> = ({ x, y, p, color, t }) => (
  <g opacity={p}>
    <ellipse cx={x} cy={y} rx={70 + 6 * Math.sin(t * 2.4)} ry={20} fill="none" stroke={color} strokeWidth={9} style={{ filter: `drop-shadow(0 0 12px ${color})` }} />
  </g>
);

/* 1-3 · Asch: mismos adjetivos, orden inverso; luego «testarudo» cambia de sentido */
const Asch: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.primeros);
  if (op <= 0) return null;
  const gente = pop(t, T.orden);
  const halo = ac(t, T.inverso + 0.8, T.inverso + 2);
  const eval_ = ac(t, T.mejor, T.mejor + 1.2);
  const foco = ac(t, T.testarudo, T.testarudo + 0.6);
  const lista = (x: number, orden: string[], calido: boolean) => orden.map((w, i) => {
    const k = ADJ.indexOf(w);
    const a = calido ? T.adj[k] : T.inverso + i * 0.12;
    const p = pop(t, a, 0.45);
    // El tono de los dos primeros contagia, uno a uno, a los siguientes.
    const tiñe = i < 2 ? 1 : ac(t, T.inverso + 1 + (i - 2) * 0.35, T.inverso + 1.5 + (i - 2) * 0.35);
    // Se resalta solo el rasgo del lado que se narra: «testarudo» en Alan, luego «inteligente» en Ben.
    const esTest = calido ? w === 'testarudo' && t < T.envTest : w === 'inteligente' && t >= T.envTest;
    const fondo = i < 2 ? (calido ? `url(#${ID}-marca)` : '#5b6b82') : tiñe > 0.5 ? (calido ? (isDark ? '#4a3418' : '#ffe8c7') : (isDark ? '#26303d' : '#dde3ec')) : c.panel;
    const letra = i < 2 ? '#fff' : tiñe > 0.5 ? (calido ? (isDark ? '#ffd29a' : '#9a4b0c') : (isDark ? '#b7c4d6' : '#3c4a5e')) : c.texto;
    const atenua = foco > 0 && !esTest ? 1 - 0.65 * foco : 1;
    const sentido = esTest ? (calido ? ac(t, T.firmeza - 0.3, T.firmeza + 0.3) : 0) : 0;
    const sentidoB = !calido && w === 'inteligente' ? ac(t, T.amenaza - 0.3, T.amenaza + 0.3) : 0;
    return (
      <g key={w} opacity={Math.min(1, p) * atenua} transform={`translate(${x} ${180 + i * 62}) scale(${0.6 + 0.4 * p})`}>
        <rect x={-110} y={-24} width={220} height={48} rx={24} fill={fondo} style={esTest && foco > 0 ? { filter: `drop-shadow(0 0 14px rgba(255,133,29,${0.6 * foco}))` } : sombra(c.sombra * 0.6, 4, 10)} />
        <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={letra} opacity={1 - Math.max(sentido, sentidoB)}>{w}</Txt>
        {sentido > 0 && <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={NARANJA} opacity={sentido}>= firmeza</Txt>}
        {sentidoB > 0 && <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={ROJO} opacity={sentidoB}>= amenaza</Txt>}
      </g>
    );
  });
  const fichaA = ac(t, T.intDil - 0.2, T.intDil + 0.3) * (1 - ac(t, T.envTest - 0.3, T.envTest));
  return (
    <g opacity={op}>
      <Titulo c={c} a="El orden" b="cambia a la persona" />
      {/* Alan y Ben */}
      <g opacity={gente} transform={`translate(0 ${(1 - gente) * 30})`}>
        <Persona id={ID} x={170} y={520} s={1.25} />
        <Halo x={170} y={300} p={halo} color={CALIDO} t={t} />
        <Txt x={170} y={590} textAnchor="middle" fontSize={34} fill={c.texto}>Alan</Txt>
        <Persona id={ID} x={1030} y={520} s={1.25} cuerpo={`url(#${ID}-pizarra)`} pelo="#4a4a4a" />
        <Halo x={1030} y={300} p={halo} color={FRIO} t={t} />
        <Txt x={1030} y={590} textAnchor="middle" fontSize={34} fill={c.texto}>Ben</Txt>
      </g>
      {lista(430, ADJ, true)}
      {lista(770, [...ADJ].reverse(), false)}
      <g opacity={pop(t, T.seis)}><Txt f="a" x={600} y={130} textAnchor="middle" fontSize={24} fill={c.tenue}>mismos seis adjetivos</Txt></g>
      <g opacity={ac(t, T.inverso, T.inverso + 0.4)}><Txt x={600} y={346} textAnchor="middle" fontSize={40} fill={c.tenue}>⇅</Txt></g>
      {/* Evaluación: Alan mucho mejor que Ben */}
      <g opacity={ac(t, T.mejor - 0.2, T.mejor + 0.3)}>
        {[[170, 0.88, `url(#${ID}-marcaH)`], [1030, 0.32, '#5b6b82']].map(([x, v, f]) => (
          <g key={String(x)}>
            <rect x={(x as number) - 110} y={625} width={220} height={20} rx={10} fill={c.panel2} />
            <rect x={(x as number) - 110} y={625} width={220 * (v as number) * eval_} height={20} rx={10} fill={f as string} />
          </g>
        ))}
        <Txt f="a" x={600} y={642} textAnchor="middle" fontSize={22} fill={c.tenue}>cómo lo evaluaron</Txt>
      </g>
      {/* Lo que pesa al leer «testarudo» */}
      <g opacity={fichaA}>
        <Txt f="a" x={430} y={600} textAnchor="middle" fontSize={22} fill={NARANJA}>ya te pareció inteligente y diligente</Txt>
      </g>
      <g opacity={ac(t, T.envTest - 0.2, T.envTest + 0.3)}>
        <Txt f="a" x={770} y={600} textAnchor="middle" fontSize={22} fill={FRIO}>ya te pareció envidioso y testarudo</Txt>
      </g>
    </g>
  );
};

/* 4 · Los primeros rasgos fijan el tono y el resto se ajusta a la historia */
const Tono: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.primeros, T.antidoto);
  if (op <= 0) return null;
  const onda = ac(t, T.tono, T.tono + 2.2);
  const encaja = ac(t, T.encajar, T.encajar + 1.4);
  const precision = ac(t, T.precisa, T.precisa + 0.8);
  const exagera = ac(t, T.exagera, T.exagera + 0.8);
  return (
    <g opacity={op}>
      <Titulo c={c} a="El primer rasgo" b="fija el tono" />
      {ADJ.map((w, i) => {
        const x = 150 + i * 180;
        const llegada = Math.max(0, Math.min(1, onda * 6 - i));
        const yDesorden = [0, -50, 40, -30, 55, -20][i];
        const y = 330 + yDesorden * (1 - encaja);
        return (
          <g key={w} transform={`translate(${x} ${y})`}>
            <circle r={58} fill={i === 0 ? `url(#${ID}-marca)` : llegada > 0.5 ? (isDark ? '#4a3418' : '#ffe8c7') : c.panel} style={sombra(c.sombra * 0.7, 6, 14)} />
            {i > 0 && llegada > 0 && llegada < 1 && <circle r={58 + 26 * llegada} fill="none" stroke={CALIDO} strokeWidth={4} opacity={1 - llegada} />}
            <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={20} fill={i === 0 ? '#fff' : llegada > 0.5 ? (isDark ? '#ffd29a' : '#9a4b0c') : c.texto}>{w}</Txt>
          </g>
        );
      })}
      {/* Historia coherente: los rasgos se alinean en una línea limpia */}
      <path d="M 150 330 L 1050 330" stroke={`url(#${ID}-marcaH)`} strokeWidth={6} strokeDasharray="1" pathLength={1} strokeDashoffset={1 - encaja} opacity={0.5} />
      <g opacity={ac(t, T.coherente, T.coherente + 0.5)} transform="translate(340 520)">
        <rect x={-200} y={-46} width={400} height={92} rx={28} fill={`url(#${ID}-marca)`} style={{ filter: 'drop-shadow(0 6px 16px rgba(239,55,92,0.4))' }} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={28} fill="#fff">historia coherente ✓</Txt>
      </g>
      <g opacity={precision} transform="translate(860 520)">
        <rect x={-200} y={-46} width={400} height={92} rx={28} fill={c.panel2} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={28} fill={c.tenue}>evaluación precisa</Txt>
        <path d="M -170 0 L 170 0" stroke={ROJO} strokeWidth={6} strokeLinecap="round" opacity={exagera} />
      </g>
    </g>
  );
};

/* 5 · El antídoto: descorrelacionar los errores */
const Antidoto: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.antidoto, T.regla);
  if (op <= 0) return null;
  const ex = acto(t, T.examenes, T.comite), co = acto(t, T.comite, T.entrevista), en = acto(t, T.entrevista, T.regla + 0.4);
  // Exámenes: se corrige la pregunta 1 de todos, después la 2.
  const col = t < T.segunda ? 0 : 1;
  const barrido = col === 0 ? ac(t, T.primera, T.primera + 2.2) : ac(t, T.segunda, T.segunda + 1.6);
  return (
    <g opacity={op}>
      <Titulo c={c} a="El antídoto:" b="descorrelacionar los errores" />
      <g opacity={ex}>
        <Txt f="a" x={600} y={130} textAnchor="middle" fontSize={26} fill={c.tenue}>Al corregir exámenes</Txt>
        {[0, 1, 2, 3, 4].map((a) => (
          <g key={a} transform={`translate(${200 + a * 200} 200)`}>
            <rect x={-80} y={0} width={160} height={300} rx={18} fill={c.panel} style={sombra(c.sombra * 0.7, 6, 14)} />
            <Txt f="a" x={0} y={-14} textAnchor="middle" fontSize={20} fill={c.tenue}>alumno {a + 1}</Txt>
            {[0, 1, 2].map((q) => {
              const hecho = q < col || (q === col && barrido * 5 > a);
              const activa = q === col && t > T.primera;
              return (
                <g key={q} transform={`translate(0 ${60 + q * 85})`}>
                  <rect x={-60} y={-28} width={120} height={56} rx={12} fill={activa ? (isDark ? '#3a2a18' : '#fff1e0') : c.panel2} />
                  <Txt f="a" x={-34} y={7} fontSize={18} fill={c.tenue}>P{q + 1}</Txt>
                  {hecho && <circle cx={30} cy={0} r={14} fill={VERDE} />}
                  {hecho && <path d="M 23 0 L 28 5 L 37 -5" stroke="#fff" strokeWidth={3} fill="none" strokeLinecap="round" />}
                </g>
              );
            })}
          </g>
        ))}
        <g opacity={ac(t, T.aparte, T.aparte + 0.5)} transform="translate(600 580)">
          <rect x={-230} y={-30} width={460} height={60} rx={30} fill={c.panel2} />
          <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={c.texto}>nota anotada aparte, sin mirarla</Txt>
        </g>
      </g>
      <g opacity={co}>
        <Txt f="a" x={600} y={130} textAnchor="middle" fontSize={26} fill={c.tenue}>En un comité</Txt>
        {[0, 1, 2, 3, 4].map((k) => {
          const x = 200 + k * 200;
          const nota = pop(t, T.escriba + k * 0.18, 0.45);
          const habla = ac(t, T.discusion, T.discusion + 0.6);
          return (
            <g key={k}>
              <Persona id={ID} x={x} y={480} s={0.95} cuerpo={k % 2 ? `url(#${ID}-pizarra)` : undefined} pelo={['#2b1a12', '#4a4a4a', '#6b4a2f', '#3b2a20', '#2b1a12'][k]} />
              <g opacity={nota} transform={`translate(${x} 220) scale(${0.6 + 0.4 * nota}) rotate(${-4 + k * 2})`}>
                <rect x={-60} y={-46} width={120} height={92} rx={8} fill="#fde68a" style={sombra(0.2, 4, 8)} />
                {[0, 1, 2].map((l) => <rect key={l} x={-42} y={-24 + l * 20} width={l === 2 ? 50 : 84} height={8} rx={4} fill="#a16207" opacity={0.55} />)}
              </g>
              <g opacity={habla}><path d={`M ${x - 20} 330 q 20 -20 40 0`} stroke={c.tenue} strokeWidth={4} fill="none" /></g>
            </g>
          );
        })}
        <g opacity={ac(t, T.discusion, T.discusion + 0.5)}><Txt f="a" x={600} y={600} textAnchor="middle" fontSize={24} fill={NARANJA}>primero se escribe, después se discute</Txt></g>
      </g>
      <g opacity={en}>
        <Txt f="a" x={600} y={130} textAnchor="middle" fontSize={26} fill={c.tenue}>En una entrevista</Txt>
        {['comunicación', 'experiencia', 'criterio', 'trabajo en equipo'].map((d, k) => {
          const v = [0.7, 0.45, 0.85, 0.6][k];
          const p = ac(t, T.dimension + k * 0.35, T.dimension + k * 0.35 + 0.7);
          return (
            <g key={d} transform={`translate(220 ${220 + k * 95})`}>
              <Txt f="a" x={0} y={8} fontSize={24} fill={c.texto}>{d}</Txt>
              <rect x={260} y={-14} width={500} height={28} rx={14} fill={c.panel2} />
              <rect x={260} y={-14} width={500 * v * p} height={28} rx={14} fill={`url(#${ID}-marcaH)`} />
              <rect x={240} y={-24} width={540} height={48} rx={24} fill="none" stroke={c.apagado} strokeWidth={2} strokeDasharray="6 6" opacity={p} />
            </g>
          );
        })}
        <g opacity={ac(t, T.dimension + 1.5, T.dimension + 2)}><Txt f="a" x={600} y={620} textAnchor="middle" fontSize={24} fill={NARANJA}>cada dimensión por separado</Txt></g>
      </g>
    </g>
  );
};

/* 6 · Opiniones independientes suman; contagiadas, se repiten */
const Regla: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.regla, 999);
  if (op <= 0) return null;
  const indep = acto(t, T.suman - 0.2, T.contagia + 0.3);
  const cont = ac(t, T.contagia, T.contagia + 0.4);
  const copia = ac(t, T.contagia + 0.4, T.contagia + 2.2);
  const cinco = pop(t, T.cinco), rep = pop(t, T.repetido);
  const colores = [NARANJA, '#5bc0de', VERDE, '#a78bfa', ROSA];
  return (
    <g opacity={op}>
      <Titulo c={c} a="Para sumar información," b="opiniones independientes" />
      <g opacity={indep}>
        {colores.map((col, k) => {
          const p = pop(t, T.suman + k * 0.15, 0.4);
          const x = 160 + k * 150, viaje = ac(t, T.independientes, T.independientes + 1);
          return (
            <g key={k} opacity={Math.min(1, p)}>
              <circle cx={x} cy={240} r={40} fill={col} style={sombra(c.sombra * 0.6, 4, 10)} />
              <line x1={x} y1={285} x2={x + (900 - x) * viaje} y2={285 + 160 * viaje} stroke={col} strokeWidth={5} opacity={0.6} />
            </g>
          );
        })}
        <g transform="translate(950 470)" opacity={ac(t, T.independientes + 0.6, T.independientes + 1.2)}>
          <circle r={86} fill={`url(#${ID}-marca)`} style={{ filter: 'drop-shadow(0 8px 20px rgba(239,55,92,0.4))' }} />
          <Txt x={0} y={14} textAnchor="middle" fontSize={44} fill="#fff">5×</Txt>
          <Txt f="a" x={0} y={122} textAnchor="middle" fontSize={22} fill={c.texto}>información</Txt>
        </g>
      </g>
      <g opacity={cont}>
        {colores.map((col, k) => {
          const x = 220 + k * 190;
          const contagiado = k === 0 ? 1 : Math.max(0, Math.min(1, copia * 5 - (k - 1)));
          return (
            <g key={k}>
              {k > 0 && <path d={`M ${x - 150} 300 q 75 -70 150 0`} fill="none" stroke={NARANJA} strokeWidth={4} strokeDasharray="10 8" opacity={contagiado} />}
              <circle cx={x} cy={330} r={46} fill={contagiado > 0.5 ? NARANJA : col} style={sombra(c.sombra * 0.6, 4, 10)} />
            </g>
          );
        })}
        <g opacity={cinco} transform="translate(600 500)">
          <Txt x={0} y={0} textAnchor="middle" fontSize={34} fill={c.tenue}>no tienes cinco juicios…</Txt>
        </g>
        <g opacity={rep} transform={`translate(600 580) scale(${0.7 + 0.3 * rep})`}>
          <rect x={-290} y={-40} width={580} height={80} rx={40} fill={`url(#${ID}-marca)`} />
          <Txt f="a" x={0} y={12} textAnchor="middle" fontSize={32} fill="#fff">tienes uno repetido cinco veces</Txt>
        </g>
      </g>
    </g>
  );
};

export const HaloEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Asch isDark={isDark} t={t} />
        <Tono isDark={isDark} t={t} />
        <Antidoto isDark={isDark} t={t} />
        <Regla isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
