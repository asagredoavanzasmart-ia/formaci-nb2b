import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, Gradientes, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «Facilidad y tensión: el medidor que llevas encendido», animada con Remotion. Tiempos relativos a la diapositiva. */
const T = {
  medidor: 2.75, oscila: 7.53, fluye: 10.38, clara: 11.8, sencilla: 12.78, oido: 13.97, humor: 16.08,
  conocido: 17.7, impresion: 19.85, creativa: 22.09, guardia: 23.88, logica: 25.71,
  friccion: 27.38, borrosa: 29.37, rebuscado: 31.29, raro: 32.41, alerta: 33.45, analitico: 35.68, intuicion: 36.23, tontos: 38.26, costa: 39.97,
  estrella: 42.85, resistio: 44.95, princeton: 46.38, gris: 48.03, del90: 56.15, sistema2: 59.01, cuarenta: 61.13, sieteMil: 64.15, ningun: 65.81,
};
export const W = 1200, H = 900;
const ID = 'fa';

const Chip: React.FC<{ c: ReturnType<typeof tono>; x: number; y: number; p: number; txt: string; w?: number; fill?: string; color?: string }> = ({ c, x, y, p, txt, w = 250, fill, color }) => (
  <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}>
    <rect x={-w / 2} y={-26} width={w} height={52} rx={26} fill={fill ?? c.panel} style={sombra(c.sombra * 0.6, 4, 10)} />
    <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={22} fill={color ?? c.texto}>{txt}</Txt>
  </g>
);

/* Acto 1 · El medidor: causas que lo empujan y cómo te deja pensando */
const Medidor: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.estrella);
  if (op <= 0) return null;
  // Posición de la aguja: -1 = facilidad, 0 = centro, 1 = tensión.
  const aguja = -0.8 * ac(t, T.clara, T.humor + 0.6, 0, 1, Easing.inOut(Easing.quad)) + 1.6 * ac(t, T.borrosa, T.raro + 0.6, 0, 1, Easing.inOut(Easing.quad));
  const temblor = t > T.alerta ? Math.sin(t * 22) * 0.02 : 0;
  const ang = (aguja + temblor) * 62;
  const tension = Math.max(0, aguja);
  const blur = 2.4 * tension;
  const facil = aguja < 0;
  const cx = 600, cy = 640, R = 210;
  const fric = t >= T.friccion;
  const causasF: [string, number][] = [['letra clara', T.clara], ['frase sencilla', T.sencilla], ['idea ya oída', T.oido], ['buen humor', T.humor]];
  const causasT: [string, number][] = [['letra borrosa', T.borrosa], ['lenguaje rebuscado', T.rebuscado], ['algo huele raro', T.raro]];
  const efectosF: [string, number][] = [['confías en la 1ª impresión', T.impresion], ['más creativo', T.creativa], ['bajas la guardia', T.guardia], ['más errores de lógica', T.logica]];
  const efectosT: [string, number][] = [['analítico', T.analitico], ['suspendes la intuición', T.intuicion], ['menos errores tontos', T.tontos], ['menos creatividad', T.costa]];
  return (
    <g opacity={op}>
      {/* Lo que tienes delante */}
      <rect x={250} y={30} width={700} height={170} rx={34} fill={c.panel} style={sombra(c.sombra)} />
      <defs><filter id={`${ID}-blur`}><feGaussianBlur stdDeviation={blur} /></filter></defs>
      <g filter={`url(#${ID}-blur)`} transform={`translate(${tension > 0.5 ? Math.sin(t * 30) * 2 : 0} 0)`}>
        <Txt x={600} y={110} textAnchor="middle" fontSize={facil || !fric ? 46 : 34} peso={facil || !fric ? 700 : 400} fill={facil || !fric ? c.texto : c.tenue} fontStyle={fric ? 'italic' : 'normal'}>{fric ? 'se lee con dificultad, despacio' : 'Se lee sin esfuerzo'}</Txt>
      </g>
      <Txt f="a" x={600} y={165} textAnchor="middle" fontSize={24} fill={fric ? c.tenue : NARANJA}>{fric ? 'extraño · sospechoso · alerta' : 'familiar · creíble · cómodo'}</Txt>
      {/* Dial */}
      <g opacity={ac(t, T.medidor - 0.2, T.medidor + 0.5)}>
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx} ${cy - R}`} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={30} strokeLinecap="round" opacity={facil ? 1 : 0.3} />
        <path d={`M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke="#64748b" strokeWidth={30} strokeLinecap="round" opacity={tension > 0.2 ? 1 : 0.3} />
        {t > T.alerta && <circle cx={cx + R} cy={cy} r={30 + 30 * ((t - T.alerta) % 1)} fill="none" stroke={ROJO} strokeWidth={5} opacity={1 - ((t - T.alerta) % 1)} />}
        <g transform={`rotate(${ang} ${cx} ${cy})`}>
          <polygon points={`${cx - 9},${cy} ${cx + 9},${cy} ${cx},${cy - R + 40}`} fill={c.texto} />
        </g>
        <circle cx={cx} cy={cy} r={18} fill={facil ? NARANJA : tension > 0.2 ? '#64748b' : c.tenue} />
        <Txt x={cx - R} y={cy + 60} textAnchor="middle" fontSize={30} fill={facil ? NARANJA : c.tenue}>Facilidad</Txt>
        <Txt x={cx + R} y={cy + 60} textAnchor="middle" fontSize={30} fill={tension > 0.2 ? NARANJA : c.tenue}>Tensión</Txt>
      </g>
      {/* Causas a cada lado */}
      {causasF.map(([w, a], i) => <Chip key={w} c={c} x={160} y={300 + i * 70} p={pop(t, a) * (fric ? 0.45 : 1)} txt={w} w={230} />)}
      {causasT.map(([w, a], i) => <Chip key={w} c={c} x={1040} y={300 + i * 70} p={pop(t, a)} txt={w} w={260} />)}
      {/* Cómo te deja pensando */}
      <g opacity={1 - ac(t, T.friccion, T.friccion + 0.5)}>
        {efectosF.map(([w, a], i) => <Chip key={w} c={c} x={150 + i * 300} y={830} p={pop(t, a)} txt={w} w={285} fill={i === 3 ? (isDark ? '#3a1f22' : '#fde2e4') : undefined} color={i === 3 ? ROJO : undefined} />)}
      </g>
      <g opacity={ac(t, T.analitico - 0.3, T.analitico)}>
        {efectosT.map(([w, a], i) => <Chip key={w} c={c} x={150 + i * 300} y={830} p={pop(t, a)} txt={w} w={285} />)}
      </g>
    </g>
  );
};

/* Acto 2 · El experimento estrella que no resistió */
const Princeton: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.estrella, 999);
  if (op <= 0) return null;
  const hoja = (x: number, borrosa: boolean, a: number) => {
    const p = pop(t, a);
    return (
      <g opacity={Math.min(1, p)} transform={`translate(${x} 300) scale(${0.7 + 0.3 * p})`}>
        <rect x={-110} y={-130} width={220} height={260} rx={18} fill={c.panel} style={sombra(c.sombra)} />
        <g style={borrosa ? { filter: 'blur(2.5px)' } : undefined}>
          {[0, 1, 2, 3, 4, 5].map((l) => <rect key={l} x={-80} y={-95 + l * 34} width={l % 3 === 2 ? 100 : 160} height={12} rx={6} fill={borrosa ? '#b7b7b7' : c.texto} opacity={borrosa ? 0.6 : 0.75} />)}
        </g>
        <Txt f="a" x={0} y={170} textAnchor="middle" fontSize={24} fill={c.tenue}>{borrosa ? 'gris y borrosa' : 'letra clara'}</Txt>
      </g>
    );
  };
  const b = ac(t, T.del90, T.del90 + 1.4);
  const iguala = ac(t, T.ningun, T.ningun + 1.4);
  const err2 = 90 - 55 * b + 55 * iguala;
  const sello = pop(t, T.resistio);
  const n7000 = ac(t, T.sieteMil, T.sieteMil + 1.4);
  return (
    <g opacity={op}>
      <Txt x={600} y={70} textAnchor="middle" fontSize={44} fill={c.texto}>El experimento <tspan fill={`url(#${ID}-marcaH)`}>estrella…</tspan></Txt>
      <g opacity={sello} transform={`translate(960 140) rotate(-8) scale(${0.7 + 0.3 * sello})`}>
        <rect x={-150} y={-30} width={300} height={60} rx={14} fill="none" stroke={ROJO} strokeWidth={5} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill={ROJO}>…que no resistió</Txt>
      </g>
      <Txt f="a" x={330} y={140} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={ac(t, T.princeton, T.princeton + 0.5)}>Princeton · test de reflexión</Txt>
      {hoja(220, false, T.princeton + 0.4)}
      {hoja(470, true, T.gris)}
      {/* Errores: 90 % → 35 % … y luego sin diferencia */}
      <g opacity={ac(t, T.del90 - 0.3, T.del90 + 0.2)}>
        <Txt f="a" x={720} y={200} textAnchor="end" fontSize={24} fill={c.tenue}>errores</Txt>
        <rect x={760} y={560 - 90 * 3.6} width={110} height={90 * 3.6} rx={16} fill={c.apagado} />
        <rect x={930} y={560 - err2 * 3.6} width={110} height={err2 * 3.6} rx={16} fill={iguala > 0.5 ? c.apagado : `url(#${ID}-marca)`} />
        <Txt x={815} y={560 - 90 * 3.6 - 14} textAnchor="middle" fontSize={34} fill={c.texto}>90%</Txt>
        <Txt x={985} y={560 - err2 * 3.6 - 14} textAnchor="middle" fontSize={34} fill={iguala > 0.5 ? c.texto : NARANJA}>{Math.round(err2)}%</Txt>
        <Txt f="a" x={815} y={600} textAnchor="middle" fontSize={22} fill={c.tenue}>clara</Txt>
        <Txt f="a" x={985} y={600} textAnchor="middle" fontSize={22} fill={c.tenue}>borrosa</Txt>
      </g>
      <Chip c={c} x={900} y={665} p={pop(t, T.sistema2) * (1 - iguala)} txt="¿la dificultad despierta al Sistema 2?" w={440} />
      {/* Tamaño de muestra: 40 frente a más de 7.000 */}
      <g opacity={ac(t, T.cuarenta - 0.2, T.cuarenta + 0.3)} transform="translate(80 760)">
        {Array.from({ length: 40 }, (_, k) => <circle key={k} cx={(k % 20) * 13} cy={Math.floor(k / 20) * 13} r={5} fill={NARANJA} />)}
        <Txt f="a" x={0} y={60} fontSize={24} fill={c.texto}>40 personas</Txt>
      </g>
      <g opacity={n7000} transform="translate(440 735)">
        {Array.from({ length: 280 }, (_, k) => <circle key={k} cx={(k % 56) * 12} cy={Math.floor(k / 56) * 12} r={4} fill={ROSA} opacity={k / 280 < n7000 ? 0.85 : 0} />)}
        <Txt f="a" x={0} y={88} fontSize={24} fill={c.texto}>réplica con más de 7.000</Txt>
      </g>
      <Chip c={c} x={985} y={665} p={pop(t, T.ningun + 0.6)} txt="ningún efecto" w={220} fill={isDark ? '#3a1f22' : '#fde2e4'} color={ROJO} />
    </g>
  );
};

export const FacilidadEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Medidor isDark={isDark} t={t} />
        <Princeton isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
