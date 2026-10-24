import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, Gradientes, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «Causas por todas partes: la mente no tolera el azar», animada con Remotion. Tiempos relativos a la diapositiva. */
const T = {
  azar: 2.92, causas: 4.52, normal: 7.55, rompe: 9.5, fabrica: 10.66, estadistica: 14.87,
  animales: 17.72, moises: 19.55, nadie: 20.89, noe: 27.48,
  choca: 29.48, empuja: 30.99, inferencia: 32.15, color: 34.94,
  formas: 38.85, agresor: 42.86, victima: 43.59, heroe: 44.5, intenciones: 45.45,
  sadam: 49.43, subida: 51.97, horas: 54.46, caida: 55.22, mismo: 56.15,
  revelador: 57.79, rarisimo: 59.31, segunda: 61.68, norma: 64.18, expectativa: 67.11, historia: 69.61,
};
export const W = 1200, H = 900;
const ID = 'ca';

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={70} textAnchor="middle" fontSize={44} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);
const Chip: React.FC<{ c: ReturnType<typeof tono>; x: number; y: number; p: number; txt: string; w?: number; marca?: boolean }> = ({ c, x, y, p, txt, w = 240, marca }) => (
  <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}>
    <rect x={-w / 2} y={-28} width={w} height={56} rx={28} fill={marca ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra * 0.6, 4, 10)} />
    <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={marca ? '#fff' : c.texto}>{txt}</Txt>
  </g>
);

/* 1 · El modelo de lo normal y la causa fabricada al instante */
const Normal: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.animales);
  if (op <= 0) return null;
  const rompe = ac(t, T.rompe, T.rompe + 0.6, 0, 1, Easing.out(Easing.back(2)));
  const flecha = ac(t, T.fabrica, T.fabrica + 0.5);
  const dado = pop(t, T.estadistica);
  return (
    <g opacity={op}>
      <Titulo c={c} a="La mente" b="no tolera el azar" />
      <g opacity={ac(t, T.normal - 0.3, T.normal + 0.4)}>
        <line x1={120} x2={1080} y1={420} y2={420} stroke={c.apagado} strokeWidth={4} strokeDasharray="12 10" />
        <Txt f="a" x={120} y={395} fontSize={24} fill={c.tenue}>lo normal</Txt>
        {Array.from({ length: 9 }, (_, k) => {
          const x = 180 + k * 105, salta = k === 5;
          const y = 420 - (salta ? 200 * rompe : 0) + Math.sin(t * 2 + k) * 4;
          return <circle key={k} cx={x} cy={y} r={salta ? 30 : 24} fill={salta && rompe > 0.1 ? ROJO : c.tenue} style={salta && rompe > 0.1 ? { filter: 'drop-shadow(0 0 12px rgba(243,69,81,0.6))' } : undefined} />;
        })}
        <g opacity={rompe}><Txt x={705} y={190} textAnchor="middle" fontSize={50} fill={ROJO}>?</Txt></g>
      </g>
      {/* Al instante aparece una causa */}
      <g opacity={flecha}>
        <path d={`M 300 220 L ${300 + 340 * flecha} 220`} stroke={NARANJA} strokeWidth={8} strokeLinecap="round" />
        <path d={`M ${620 + 20 * flecha - 20} 205 L ${640 + 20 * flecha - 20} 220 L ${620 + 20 * flecha - 20} 235`} fill="none" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <Chip c={c} x={210} y={220} p={flecha} txt="«porque…»" w={180} marca />
      </g>
      <g opacity={dado} transform={`translate(600 680) scale(${0.7 + 0.3 * dado})`}>
        <rect x={-60} y={-60} width={120} height={120} rx={22} fill={c.panel} style={sombra(c.sombra)} />
        {[[-28, -28], [28, 28], [0, 0], [28, -28], [-28, 28]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={10} fill={c.texto} />)}
        <path d="M -80 -80 L 80 80" stroke={ROJO} strokeWidth={10} strokeLinecap="round" />
        <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={26} fill={c.tenue}>estorba al pensar en estadística</Txt>
      </g>
    </g>
  );
};

/* 2 · Ilusión de Moisés */
const Moises: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.animales, T.choca);
  if (op <= 0) return null;
  const arca = pop(t, T.animales, 0.7);
  const nombre = pop(t, T.moises), tacha = ac(t, T.noe, T.noe + 0.4), noe = pop(t, T.noe + 0.3);
  const vaiven = Math.sin(t * 1.6) * 3;
  return (
    <g opacity={op}>
      <Titulo c={c} a="La ilusión de" b="Moisés" />
      <g opacity={Math.min(1, arca)} transform={`translate(600 ${560 + (1 - arca) * 60}) rotate(${vaiven})`}>
        <path d="M -330 -40 L 330 -40 L 260 90 Q 250 110 230 110 L -230 110 Q -250 110 -260 90 Z" fill="#c98a4b" style={sombra(c.sombra)} />
        <rect x={-330} y={-56} width={660} height={22} rx={10} fill="#8a5a2b" />
        <rect x={-150} y={-190} width={300} height={140} rx={16} fill="#e0b07a" />
        <path d="M -175 -190 L 0 -260 L 175 -190 Z" fill="#8a5a2b" />
        {[-260, -190, 190, 260].map((x, k) => (
          <g key={x} transform={`translate(${x} ${-80 + Math.sin(t * 3 + k) * 4})`}>
            <ellipse rx={30} ry={22} fill={k < 2 ? '#94a3b8' : '#a78b6d'} />
            <circle cx={k < 2 ? -24 : 24} cy={-14} r={14} fill={k < 2 ? '#94a3b8' : '#a78b6d'} />
          </g>
        ))}
        <path d="M -400 140 Q -300 120 -200 140 T 0 140 T 200 140 T 400 140" fill="none" stroke="#5bc0de" strokeWidth={8} opacity={0.6} />
      </g>
      <g opacity={nombre}>
        <Txt f="a" x={600} y={160} textAnchor="middle" fontSize={30} fill={c.tenue}>«¿Cuántos animales de cada especie metió…</Txt>
        <Txt x={480} y={240} textAnchor="middle" fontSize={60} fill={c.texto}>Moisés</Txt>
        <rect x={380} y={222} width={200 * tacha} height={8} rx={4} fill={ROJO} />
        <Txt f="a" x={760} y={240} textAnchor="middle" fontSize={30} fill={c.tenue}>en el arca?»</Txt>
      </g>
      <Chip c={c} x={600} y={320} p={pop(t, T.nadie) * (1 - tacha)} txt="casi nadie se detiene" w={320} />
      <g opacity={noe} transform={`translate(480 320) scale(${0.6 + 0.4 * noe})`}>
        <Txt x={0} y={16} textAnchor="middle" fontSize={60} fill={NARANJA}>Noé</Txt>
      </g>
    </g>
  );
};

/* 3 · Michotte: el empujón se ve, no se deduce */
const Michotte: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.choca, T.formas);
  if (op <= 0) return null;
  const u = Math.max(0, t - T.choca) % 2.6;
  const xa = 220 + Math.min(1, u / 1) * 300;
  const xb = 680 + Math.max(0, Math.min(1, (u - 1) / 0.9)) * 300;
  const impacto = u > 0.95 && u < 1.3;
  const ojo = pop(t, T.inferencia), color = pop(t, T.color);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Michotte:" b="ves un empujón" />
      <line x1={120} x2={1080} y1={520} y2={520} stroke={c.apagado} strokeWidth={4} />
      <rect x={xa - 80} y={360} width={160} height={160} rx={24} fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
      <rect x={xb - 80} y={360} width={160} height={160} rx={24} fill={isDark ? '#4b5563' : '#cbd5e1'} style={sombra(c.sombra)} />
      {impacto && [0, 1, 2].map((k) => <line key={k} x1={600} y1={380 + k * 50} x2={630} y2={370 + k * 55} stroke={NARANJA} strokeWidth={6} strokeLinecap="round" />)}
      <Chip c={c} x={600} y={250} p={pop(t, T.empuja)} txt="lo empuja" w={220} marca />
      <g opacity={ojo} transform="translate(360 700)">
        <path d="M -70 0 Q 0 -50 70 0 Q 0 50 -70 0 Z" fill={c.blanco} style={sombra(c.sombra)} />
        <circle r={22} fill="#8a4f22" /><circle r={10} fill="#111" />
        <Txt f="a" x={0} y={90} textAnchor="middle" fontSize={24} fill={c.texto}>se percibe, no se infiere</Txt>
      </g>
      <g opacity={color} transform="translate(840 700)">
        {[NARANJA, ROSA, '#5bc0de'].map((col, k) => <rect key={k} x={-90 + k * 62} y={-36} width={54} height={72} rx={12} fill={col} />)}
        <Txt f="a" x={0} y={90} textAnchor="middle" fontSize={24} fill={c.texto}>tan directo como un color</Txt>
      </g>
    </g>
  );
};

/* 4 · Heider y Simmel: formas con intenciones */
const Heider: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.formas, T.sadam);
  if (op <= 0) return null;
  const ruta = (d: number) => {
    const u = ((t - T.formas) / 6 - d + 10) % 1;
    const a = u * Math.PI * 2;
    return [600 + 330 * Math.cos(a), 480 + 170 * Math.sin(a)];
  };
  // La víctima huye, el agresor la persigue y el héroe llega detrás.
  const [vx, vy] = ruta(0), [ax, ay] = ruta(0.13), [hx, hy] = ruta(0.27);
  const etiqueta = (x: number, y: number, a: number, txt: string, col: string) => {
    const p = pop(t, a);
    return <g opacity={p} transform={`translate(${x} ${y + (y > 480 ? 80 : -75)})`}><rect x={-75} y={-24} width={150} height={48} rx={24} fill={col} /><Txt f="a" x={0} y={8} textAnchor="middle" fontSize={22} fill="#fff">{txt}</Txt></g>;
  };
  return (
    <g opacity={op}>
      <Titulo c={c} a="Heider y Simmel:" b="les ves intenciones" />
      <rect x={520} y={400} width={160} height={150} rx={14} fill={isDark ? '#333' : '#e5e7eb'} />
      <rect x={570} y={480} width={60} height={70} rx={6} fill={c.panel} />
      <circle cx={vx} cy={vy} r={30} fill="#f0b07a" style={sombra(c.sombra)} />
      <polygon points={`${ax},${ay - 50} ${ax - 44},${ay + 30} ${ax + 44},${ay + 30}`} fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
      <polygon points={`${hx},${hy - 30} ${hx - 26},${hy + 18} ${hx + 26},${hy + 18}`} fill="#64748b" style={sombra(c.sombra)} />
      {etiqueta(ax, ay, T.agresor, 'agresor', ROSA)}
      {etiqueta(vx, vy, T.victima, 'víctima', '#d08a45')}
      {etiqueta(hx, hy, T.heroe, 'héroe', '#64748b')}
      <Chip c={c} x={600} y={820} p={pop(t, T.intenciones)} txt="sin poder evitarlo" w={300} />
    </g>
  );
};

/* 5 · Sadam: un mismo hecho explica la subida y la caída */
const Sadam: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.sadam, T.revelador);
  if (op <= 0) return null;
  const sube = ac(t, T.subida - 0.5, T.subida + 0.8), baja = ac(t, T.caida - 0.5, T.caida + 0.8);
  const pts = [[120, 640], [300, 600], [480, 470], [600, 380]];
  const pts2 = [[600, 380], [760, 470], [920, 600], [1080, 660]];
  const linea = (p: number[][], k: number) => p.slice(0, Math.max(1, Math.ceil(k * (p.length - 1)) + 1)).map((q, i) => `${i ? 'L' : 'M'} ${q[0]} ${q[1]}`).join(' ');
  const titular = (x: number, y: number, a: number, txt: string, col: string) => {
    const p = pop(t, a);
    return (
      <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.7 + 0.3 * p})`}>
        <rect x={-210} y={-44} width={420} height={88} rx={14} fill={c.panel} style={sombra(c.sombra)} />
        <rect x={-210} y={-44} width={12} height={88} rx={6} fill={col} />
        <Txt f="a" x={10} y={-6} textAnchor="middle" fontSize={20} fill={c.tenue}>ÚLTIMA HORA</Txt>
        <Txt x={10} y={26} textAnchor="middle" fontSize={26} fill={c.texto}>{txt}</Txt>
      </g>
    );
  };
  return (
    <g opacity={op}>
      <Titulo c={c} a="Un mismo hecho," b="dos explicaciones" />
      <line x1={100} x2={1100} y1={700} y2={700} stroke={c.apagado} strokeWidth={3} />
      <Txt f="a" x={100} y={740} fontSize={22} fill={c.tenue}>bonos · el día de la captura</Txt>
      <path d={linea(pts, sube)} fill="none" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      {t > T.caida - 0.5 && <path d={linea(pts2, baja)} fill="none" stroke={ROSA} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
      {titular(330, 330, T.subida, 'Suben… por Sadam', NARANJA)}
      {titular(870, 330, T.caida, 'Bajan… por Sadam', ROSA)}
      <Chip c={c} x={600} y={200} p={pop(t, T.mismo)} txt="la misma causa para efectos opuestos" w={480} marca />
    </g>
  );
};

/* 6 · La segunda vez ya no sorprende */
const Segunda: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.revelador, 999);
  if (op <= 0) return null;
  const b1 = ac(t, T.rarisimo, T.rarisimo + 0.8), b2 = ac(t, T.segunda, T.segunda + 0.8);
  const cadena: [string, number][] = [['coincidencia', T.norma], ['expectativa', T.expectativa], ['historia causal', T.historia]];
  return (
    <g opacity={op}>
      <Titulo c={c} a="La segunda vez" b="ya no sorprende" />
      <Txt f="a" x={320} y={180} textAnchor="middle" fontSize={24} fill={c.tenue}>sorpresa</Txt>
      {[[220, b1, '1ª vez', 1], [420, b2, '2ª vez', 0.28]].map(([x, p, n, v]) => (
        <g key={String(n)}>
          <rect x={(x as number) - 60} y={560 - 320 * (v as number) * (p as number)} width={120} height={320 * (v as number) * (p as number)} rx={18} fill={n === '1ª vez' ? `url(#${ID}-marca)` : c.apagado} />
          <Txt f="a" x={x as number} y={600} textAnchor="middle" fontSize={24} fill={c.texto} opacity={p as number}>{n}</Txt>
        </g>
      ))}
      <g opacity={b1} transform="translate(220 200)">
        <path d="M 0 -30 L 9 -9 L 30 -9 L 13 4 L 19 26 L 0 13 L -19 26 L -13 4 L -30 -9 L -9 -9 Z" fill={NARANJA} />
      </g>
      <Chip c={c} x={320} y={700} p={pop(t, T.norma)} txt="la 1ª reescribió tu norma" w={360} />
      {cadena.map(([w, a], k) => (
        <g key={w}>
          <Chip c={c} x={870} y={260 + k * 170} p={pop(t, a)} txt={w} w={280} marca={k === 2} />
          {k < 2 && <path d={`M 870 ${295 + k * 170} L 870 ${395 + k * 170}`} stroke={NARANJA} strokeWidth={6} strokeLinecap="round" opacity={ac(t, cadena[k + 1][1] - 0.4, cadena[k + 1][1])} />}
        </g>
      ))}
    </g>
  );
};

export const CausalidadEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Normal isDark={isDark} t={t} />
        <Moises isDark={isDark} t={t} />
        <Michotte isDark={isDark} t={t} />
        <Heider isDark={isDark} t={t} />
        <Sadam isDark={isDark} t={t} />
        <Segunda isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
