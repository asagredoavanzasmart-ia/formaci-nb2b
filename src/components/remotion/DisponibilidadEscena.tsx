import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, Gradientes, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «Disponibilidad: lo que recuerdas fácil parece frecuente», animada con Remotion. Tiempos relativos a la diapositiva. */
const T = {
  disponibilidad: 1.19, facilidad: 2.91, frecuente: 4.24, noCuenta: 7.58, velocidad: 9.2,
  avion: 12.7, corazon: 14.0, mata: 16.14, portadas: 18.23, infarto: 20.06, cobertura: 22.31,
  atentado: 26.17, transito: 27.09, dramatica: 28.68, instante: 29.61, probabilidad: 31.94,
  palabras: 34.15, ka: 38.35, tercera: 40.37, inicial: 43.49, doble: 45.09,
  empresa: 48.42, presupuestos: 50.08, espectacular: 52.67, silenciosa: 54.73,
};
export const W = 1200, H = 900;
const ID = 'di';
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
/* Comparación «lo que crees» frente a «lo que ocurre»: dos pares de barras sin cifras. */
const Comparar: React.FC<{ c: ReturnType<typeof tono>; y: number; a: string; b: string; creesA: number; creesB: number; realA: number; realB: number; pCrees: number; pReal: number }> = ({ c, y, a, b, creesA, creesB, realA, realB, pCrees, pReal }) => {
  const barra = (x: number, v: number, p: number, fill: string) => <rect x={x} y={y + 230 - 200 * v * p} width={70} height={200 * v * p} rx={12} fill={fill} />;
  return (
    <g>
      <g opacity={ac(pCrees, 0, 0.3)}>
        <Txt f="a" x={390} y={y + 280} textAnchor="middle" fontSize={24} fill={c.tenue}>lo que crees</Txt>
        {barra(310, creesA, pCrees, `url(#${ID}-marca)`)}{barra(400, creesB, pCrees, GRIS)}
      </g>
      <g opacity={ac(pReal, 0, 0.3)}>
        <Txt f="a" x={810} y={y + 280} textAnchor="middle" fontSize={24} fill={c.tenue}>lo que ocurre</Txt>
        {barra(730, realA, pReal, `url(#${ID}-marca)`)}{barra(820, realB, pReal, GRIS)}
      </g>
      <g transform={`translate(600 ${y + 330})`}>
        <rect x={-260} y={-14} width={20} height={20} rx={6} fill={NARANJA} /><Txt f="a" x={-230} y={4} fontSize={22} fill={c.texto}>{a}</Txt>
        <rect x={40} y={-14} width={20} height={20} rx={6} fill={GRIS} /><Txt f="a" x={70} y={4} fontSize={22} fill={c.texto}>{b}</Txt>
      </g>
    </g>
  );
};

/* 1 · Lo vívido llena la memoria de golpe; lo frecuente, gota a gota */
const Vasos: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.avion);
  if (op <= 0) return null;
  const ciclo = Math.max(0, t - T.facilidad) % 3;
  const rayo = ciclo > 0.4 && ciclo < 0.75 ? 1 : 0.15;
  const llenoA = Math.min(1, Math.max(0, (ciclo - 0.5) / 0.25)) * (ciclo < 2.6 ? 1 : 1 - (ciclo - 2.6) / 0.4);
  const llenoB = Math.min(1, Math.max(0, t - T.frecuente) / 14) * 0.35;
  const gota = ((t - T.frecuente) / 1.4) % 1;
  const vaso = (x: number, lleno: number, fill: string) => (
    <g>
      <path d={`M ${x - 110} 360 L ${x + 110} 360 L ${x + 90} 640 Q ${x + 88} 660 ${x + 68} 660 L ${x - 68} 660 Q ${x - 88} 660 ${x - 90} 640 Z`} fill={c.panel2} />
      <clipPath id={`${ID}-v${x}`}><path d={`M ${x - 110} 360 L ${x + 110} 360 L ${x + 90} 640 Q ${x + 88} 660 ${x + 68} 660 L ${x - 68} 660 Q ${x - 88} 660 ${x - 90} 640 Z`} /></clipPath>
      <rect clipPath={`url(#${ID}-v${x})`} x={x - 120} y={660 - 300 * lleno} width={240} height={300 * lleno} fill={fill} />
    </g>
  );
  return (
    <g opacity={op}>
      <Titulo c={c} a="Lo que recuerdas fácil" b="parece frecuente" />
      <g opacity={ac(t, T.facilidad - 0.2, T.facilidad + 0.4)}>
        <ellipse cx={320} cy={170} rx={90} ry={50} fill="#64748b" />
        <polygon points="335,210 300,290 325,290 305,350 360,265 332,265 352,210" fill={`url(#${ID}-marca)`} opacity={rayo} style={rayo > 0.5 ? { filter: 'drop-shadow(0 0 16px rgba(255,133,29,0.9))' } : undefined} />
        {vaso(320, llenoA, `url(#${ID}-marca)`)}
        <Txt x={320} y={720} textAnchor="middle" fontSize={34} fill={NARANJA}>Lo vívido</Txt>
        <Txt f="a" x={320} y={760} textAnchor="middle" fontSize={22} fill={c.tenue}>llega en un instante</Txt>
      </g>
      <g opacity={ac(t, T.frecuente - 0.2, T.frecuente + 0.4)}>
        <rect x={840} y={150} width={120} height={30} rx={15} fill="#64748b" /><rect x={885} y={170} width={30} height={50} rx={8} fill="#475569" />
        <circle cx={900} cy={230 + 400 * gota} r={11} fill={GRIS} opacity={gota < 0.95 ? 1 : 0} />
        {vaso(900, llenoB, GRIS)}
        <Txt x={900} y={720} textAnchor="middle" fontSize={34} fill={c.texto}>Lo frecuente</Txt>
        <Txt f="a" x={900} y={760} textAnchor="middle" fontSize={22} fill={c.tenue}>tarda o no aparece</Txt>
      </g>
      {/* La mente no cuenta: mide la velocidad */}
      <g opacity={ac(t, T.noCuenta, T.noCuenta + 0.4)} transform="translate(610 420)">
        <Txt x={0} y={0} textAnchor="middle" fontSize={40} fill={c.tenue}>1, 2, 3…</Txt>
        <path d="M -90 -30 L 90 10" stroke={ROJO} strokeWidth={7} strokeLinecap="round" />
      </g>
      <Chip c={c} x={610} y={850} p={pop(t, T.velocidad)} txt="la mente usa la velocidad como si fuera la cantidad" w={640} marca />
    </g>
  );
};

/* 2 · Avión contra corazón: la cobertura decide qué recuerdas */
const Avion: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.avion, T.atentado);
  if (op <= 0) return null;
  const portadas = ac(t, T.portadas, T.portadas + 1.4);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Accidente de avión" b="vs. corazón" />
      {/* Avión con titulares que se apilan */}
      <g opacity={pop(t, T.avion)} transform="translate(320 250)">
        <path d="M -80 0 L 60 0 Q 90 0 90 14 Q 90 28 60 28 L -80 28 Q -96 28 -96 14 Q -96 0 -80 0 Z" fill={NARANJA} />
        <path d="M -10 2 L -50 -50 L -28 -50 L 30 2 Z M -10 26 L -50 78 L -28 78 L 30 26 Z M -82 2 L -100 -26 L -86 -26 L -62 2 Z" fill={ROSA} />
        {[0, 1, 2, 3, 4].map((k) => {
          const p = Math.max(0, Math.min(1, portadas * 5 - k));
          return (
            <g key={k} opacity={p} transform={`translate(${-80 + k * 30} ${110 + k * 18 - (1 - p) * 40}) rotate(${-6 + k * 3})`}>
              <rect x={-60} y={-38} width={120} height={76} rx={6} fill={c.panel} style={sombra(c.sombra * 0.7, 4, 8)} />
              <rect x={-48} y={-26} width={96} height={12} rx={3} fill={ROJO} />
              {[0, 1, 2].map((l) => <rect key={l} x={-48} y={-6 + l * 12} width={l === 2 ? 50 : 96} height={6} rx={3} fill={c.apagado} />)}
            </g>
          );
        })}
      </g>
      {/* Corazón: ninguna portada */}
      <g opacity={pop(t, T.corazon)} transform="translate(880 270)">
        <path d="M 0 40 C -66 -6, -42 -64, 0 -30 C 42 -64, 66 -6, 0 40 Z" fill={GRIS} />
        <g opacity={ac(t, T.infarto, T.infarto + 0.4)}>
          <rect x={-60} y={80} width={120} height={76} rx={6} fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="8 6" />
          <Txt f="a" x={0} y={126} textAnchor="middle" fontSize={22} fill={c.tenue}>sin portada</Txt>
        </g>
      </g>
      <g transform="translate(0 0)">
        <Comparar c={c} y={410} a="avión" b="corazón" creesA={0.8} creesB={0.35} realA={0.08} realB={0.95} pCrees={ac(t, T.cobertura, T.cobertura + 1)} pReal={ac(t, T.mata, T.mata + 1)} />
      </g>
      <Chip c={c} x={600} y={850} p={pop(t, T.cobertura)} txt="la cobertura decide qué recuerdas" w={460} marca />
    </g>
  );
};

/* 3 · Atentado contra tránsito: la imagen dramática se recupera al instante */
const Atentado: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.atentado, T.palabras);
  if (op <= 0) return null;
  const flash = t > T.dramatica ? Math.max(0, 1 - ((t - T.dramatica) % 2.2) / 0.5) : 0;
  const recupera = ac(t, T.instante, T.instante + 0.4);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Atentado" b="vs. tránsito" />
      <g opacity={pop(t, T.atentado)} transform="translate(320 270)">
        <circle r={90} fill={`url(#${ID}-marca)`} style={{ filter: `drop-shadow(0 0 ${10 + 30 * flash}px rgba(243,69,81,${0.4 + 0.5 * flash}))` }} />
        {Array.from({ length: 8 }, (_, k) => {
          const a = (k / 8) * Math.PI * 2;
          return <line key={k} x1={100 * Math.cos(a)} y1={100 * Math.sin(a)} x2={(120 + 30 * flash) * Math.cos(a)} y2={(120 + 30 * flash) * Math.sin(a)} stroke={ROJO} strokeWidth={8} strokeLinecap="round" />;
        })}
        <Txt x={0} y={16} textAnchor="middle" fontSize={44} fill="#fff">!</Txt>
      </g>
      <g opacity={pop(t, T.transito)} transform="translate(880 270)">
        <rect x={-110} y={-30} width={220} height={60} rx={20} fill={GRIS} />
        <circle cx={-60} cy={34} r={22} fill="#475569" /><circle cx={60} cy={34} r={22} fill="#475569" />
        <rect x={-60} y={-70} width={120} height={46} rx={14} fill="#a3b1c4" />
      </g>
      {/* Recuperación desde la memoria */}
      <g opacity={recupera}>
        <path d={`M 420 270 L ${420 + 200 * recupera} 270`} stroke={NARANJA} strokeWidth={8} strokeLinecap="round" />
        <Txt f="a" x={520} y={250} textAnchor="middle" fontSize={22} fill={NARANJA}>al instante</Txt>
        <path d="M 780 270 L 700 270" stroke={GRIS} strokeWidth={6} strokeDasharray="6 12" strokeLinecap="round" />
        <Txt f="a" x={740} y={250} textAnchor="middle" fontSize={22} fill={c.tenue}>despacio</Txt>
      </g>
      <Comparar c={c} y={410} a="atentado" b="tránsito" creesA={0.75} creesB={0.4} realA={0.06} realB={0.9} pCrees={ac(t, T.probabilidad, T.probabilidad + 1)} pReal={ac(t, T.probabilidad + 0.8, T.probabilidad + 1.8)} />
      <Chip c={c} x={600} y={850} p={pop(t, T.probabilidad)} txt="la facilidad se confunde con probabilidad" w={540} marca />
    </g>
  );
};

/* 4 · Palabras con K: buscar por la inicial es más fácil */
const PalabrasK: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.palabras, T.empresa);
  if (op <= 0) return null;
  const inic = ['kite', 'king', 'key', 'kind', 'keep', 'kick'];
  const terc = ['ask', 'like', 'make', 'take'];
  const doble = ac(t, T.doble, T.doble + 1.2);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Palabras con la letra" b="K" />
      <g opacity={ac(t, T.ka, T.ka + 0.4)}>
        <Txt x={320} y={170} textAnchor="middle" fontSize={44} fill={NARANJA}>K _ _ _</Txt>
        <Txt f="a" x={320} y={210} textAnchor="middle" fontSize={22} fill={c.tenue}>empieza con K</Txt>
        {inic.map((w, k) => <Chip key={w} c={c} x={240 + (k % 2) * 160} y={280 + Math.floor(k / 2) * 70} p={pop(t, T.ka + 0.3 + k * 0.18, 0.35)} txt={w} w={140} />)}
      </g>
      <g opacity={ac(t, T.tercera, T.tercera + 0.4)}>
        <Txt x={880} y={170} textAnchor="middle" fontSize={44} fill={c.texto}>_ _ K _</Txt>
        <Txt f="a" x={880} y={210} textAnchor="middle" fontSize={22} fill={c.tenue}>K en tercera posición</Txt>
        {terc.map((w, k) => <Chip key={w} c={c} x={800 + (k % 2) * 160} y={280 + Math.floor(k / 2) * 70} p={pop(t, T.tercera + 1.2 + k * 0.9, 0.35)} txt={w} w={140} />)}
      </g>
      <Chip c={c} x={600} y={540} p={pop(t, T.inicial)} txt="es más fácil buscar por la inicial" w={460} />
      {/* En realidad, la K en tercera posición es casi el doble */}
      <g opacity={ac(t, T.doble - 0.2, T.doble + 0.3)}>
        <rect x={220} y={640} width={760 * 0.5 * doble} height={44} rx={22} fill={GRIS} />
        <rect x={220} y={720} width={760 * doble} height={44} rx={22} fill={`url(#${ID}-marcaH)`} />
        <Txt f="a" x={210} y={672} textAnchor="end" fontSize={22} fill={c.texto}>K _ _ _</Txt>
        <Txt f="a" x={210} y={752} textAnchor="end" fontSize={22} fill={c.texto}>_ _ K _</Txt>
        <Txt x={600} y={830} textAnchor="middle" fontSize={34} fill={NARANJA} opacity={doble}>casi el doble</Txt>
      </g>
    </g>
  );
};

/* 5 · En una empresa: presupuestos de riesgo torcidos */
const Empresa: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.empresa, 999);
  if (op <= 0) return null;
  const esc = ac(t, T.espectacular, T.espectacular + 1), sil = ac(t, T.silenciosa, T.silenciosa + 1);
  const meteoro = ((t - T.espectacular) % 2.4) / 2.4;
  const crece = t > T.silenciosa ? Math.min(1, (t - T.silenciosa) / 4) : 0;
  return (
    <g opacity={op}>
      <Titulo c={c} a="En una empresa:" b="riesgos mal presupuestados" />
      <Txt f="a" x={600} y={140} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={ac(t, T.presupuestos, T.presupuestos + 0.5)}>presupuesto de protección</Txt>
      {/* Desastre espectacular: escudo enorme */}
      <g opacity={esc} transform="translate(330 450)">
        {t > T.espectacular && <circle cx={-120 + 160 * meteoro} cy={-250 + 200 * meteoro} r={22} fill={ROJO} opacity={1 - meteoro} />}
        <path d="M 0 -150 L 130 -100 L 130 10 Q 130 120 0 170 Q -130 120 -130 10 L -130 -100 Z" fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill="#fff">mucha</Txt>
        <Txt f="a" x={0} y={240} textAnchor="middle" fontSize={24} fill={c.texto}>desastre espectacular</Txt>
      </g>
      {/* Amenaza silenciosa: escudo mínimo mientras el desgaste crece */}
      <g opacity={sil} transform="translate(870 450)">
        <rect x={-140} y={60} width={280} height={60} rx={10} fill={c.panel2} />
        {Array.from({ length: 10 }, (_, k) => <circle key={k} cx={-120 + k * 27} cy={90} r={6 + 6 * crece * ((k % 3) / 2)} fill={GRIS} opacity={0.4 + 0.5 * crece} />)}
        <path d="M 0 -40 L 34 -27 L 34 2 Q 34 32 0 45 Q -34 32 -34 2 L -34 -27 Z" fill={GRIS} />
        <Txt f="a" x={0} y={-60} textAnchor="middle" fontSize={22} fill={c.tenue}>poca</Txt>
        <Txt f="a" x={0} y={240} textAnchor="middle" fontSize={24} fill={c.texto}>amenaza silenciosa</Txt>
        <Txt f="a" x={0} y={275} textAnchor="middle" fontSize={22} fill={ROJO} opacity={crece}>la que de verdad desgasta</Txt>
      </g>
    </g>
  );
};

export const DisponibilidadEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Vasos isDark={isDark} t={t} />
        <Avion isDark={isDark} t={t} />
        <Atentado isDark={isDark} t={t} />
        <PalabrasK isDark={isDark} t={t} />
        <Empresa isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
