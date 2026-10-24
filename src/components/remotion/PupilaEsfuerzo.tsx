import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * «La pupila delata el esfuerzo mental», animada con Remotion. El tiempo 0 es el inicio de la
 * diapositiva en el audio de la clase; cada marca cae en la palabra que la nombra.
 */
export const T = {
  pupila: 2.65, contador: 8.46, tarea: 10.48, suma3: 12.58, dilata: 14.28, cincuenta: 16.6,
  ritmo: 17.91, presion: 21.08, musculos: 22.51, base: 24.14, resuelves: 25.78,
  ley: 27.85, maneras: 30.31, gravitas: 32.68, costo: 35.05, administra: 36.66,
  bonita: 38.51, dominas: 40.28, actividad: 42.31, dilataMenos: 44.47, talento: 46.71, ahorrada: 48.5,
};

export const W = 1200, H = 900;
const NARANJA = '#ff851d', ROSA = '#ef375c', ROJO = '#f34551';

type Props = { isDark: boolean };

const tono = (isDark: boolean) => ({
  panel: isDark ? '#242424' : '#ffffff',
  panel2: isDark ? '#2e2e2e' : '#f1f2f4',
  texto: isDark ? '#e8e8e8' : '#374151',
  tenue: isDark ? '#aaaaaa' : '#6b7280',
  apagado: isDark ? '#5a5a5a' : '#c7cbd1',
  blanco: isDark ? '#f1ece6' : '#ffffff',
  sombra: isDark ? 0.55 : 0.18,
});

const ac = (t: number, a: number, b: number, de = 0, a2 = 1, ease = Easing.inOut(Easing.cubic)) =>
  interpolate(t, [a, b], [de, a2], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });

/* Esfuerzo mental (0 = reposo, 1 = máximo) y pulso (0 = base, 1 = +7 lpm) en cada instante. */
const esfuerzo = (t: number) => (t < T.base ? 0.12 + ac(t, T.tarea, T.suma3, 0, 0.4) + ac(t, T.dilata, T.cincuenta, 0, 0.48) : ac(t, T.base, T.base + 1.8, 1, 0.12));
const pulso = (t: number) => (t < T.base ? ac(t, T.ritmo, T.ritmo + 1.2) : ac(t, T.base, T.base + 1.8, 1, 0));

/* Fase acumulada de latidos: depende solo del tiempo, así el trazo es estable al saltar. */
const fases: number[] = [];
const faseEn = (t: number, fps: number) => {
  const n = Math.max(0, Math.floor(t * fps));
  for (let k = fases.length; k <= n; k++) fases[k] = (fases[k - 1] ?? 0) + (1 + 0.6 * pulso(k / fps)) / fps;
  const f = t * fps - n;
  return fases[n] + f * (1 + 0.6 * pulso(t)) / fps;
};
const latido = (x: number) => {
  // Plantilla P-QRS-T normalizada en [0, 1).
  const g = (c: number, w: number, h: number) => h * Math.exp(-((x - c) ** 2) / (2 * w * w));
  return g(0.18, 0.025, 0.12) - g(0.4, 0.012, 0.12) + g(0.45, 0.014, 1) - g(0.5, 0.014, 0.28) + g(0.72, 0.045, 0.24);
};

/* ---------------------------- Acto 1: el ojo ---------------------------- */

const Ojo: React.FC<Props & { t: number; fps: number; frame: number }> = ({ isDark, t, fps, frame }) => {
  const c = tono(isDark);
  const abre = spring({ frame: frame - Math.round(T.pupila * fps), fps, config: { damping: 15, stiffness: 90 } });
  // Parpadeo al volver a la línea base.
  const parpadeo = 1 - 0.92 * Math.max(0, 1 - Math.abs(t - (T.base + 0.15)) / 0.12);
  const apertura = Math.max(0.03, abre * parpadeo);
  const e = esfuerzo(t);
  const rPupila = 38 + 19 * ((e - 0.12) / 0.88);
  const mirada = 6 * Math.sin(t * 0.9) + 3 * Math.sin(t * 2.3);
  const cx = 600 + mirada, cy = 270;
  const medidor = ac(t, T.contador - 0.2, T.contador + 0.6);
  const ticks = 28;
  const encendidos = Math.round(e * ticks);
  const tarea = ac(t, T.suma3 - 0.2, T.suma3 + 0.3) * (1 - ac(t, T.base, T.base + 0.5));
  const resuelto = spring({ frame: frame - Math.round(T.resuelves * fps), fps, config: { damping: 11, stiffness: 160 } }) * (1 - ac(t, T.ley - 0.4, T.ley));
  const ojo = 'M 300 270 Q 600 40 900 270 Q 600 500 300 270 Z';
  return (
    <g>
      <defs>
        <clipPath id="pe-ojo"><path d={ojo} transform={`translate(0 ${270 * (1 - apertura)}) scale(1 ${apertura})`} /></clipPath>
        <radialGradient id="pe-iris" cx="0.5" cy="0.5" r="0.5"><stop offset="0.3" stopColor="#d08a45" /><stop offset="0.75" stopColor="#8a4f22" /><stop offset="1" stopColor="#4a2610" /></radialGradient>
      </defs>
      {/* Contador de la luz: un dial sobre el ojo que se enciende con el esfuerzo */}
      <g opacity={medidor}>
        {Array.from({ length: ticks }, (_, k) => {
          const a = Math.PI * (1.17 + (0.66 * k) / (ticks - 1));
          const on = k < encendidos;
          const r1 = 196, r2 = on ? 226 : 216;
          return <line key={k} x1={600 + r1 * Math.cos(a)} y1={270 + r1 * Math.sin(a)} x2={600 + r2 * Math.cos(a)} y2={270 + r2 * Math.sin(a)} stroke={on ? (k / ticks > 0.66 ? ROSA : NARANJA) : c.apagado} strokeWidth={on ? 9 : 6} strokeLinecap="round" />;
        })}
        <text x={600} y={26} textAnchor="middle" fontFamily="Arimo" fontWeight={700} fontSize={22} letterSpacing={3} fill={c.tenue}>CONTADOR DE ESFUERZO</text>
      </g>
      <path d={ojo} fill={c.blanco} transform={`translate(0 ${270 * (1 - apertura)}) scale(1 ${apertura})`} style={{ filter: `drop-shadow(0 18px 24px rgba(0,0,0,${c.sombra}))` }} />
      <g clipPath="url(#pe-ojo)">
        <circle cx={cx} cy={cy} r={122} fill="url(#pe-iris)" />
        {Array.from({ length: 56 }, (_, k) => {
          const a = (k / 56) * Math.PI * 2;
          return <line key={k} x1={cx + (rPupila + 6) * Math.cos(a)} y1={cy + (rPupila + 6) * Math.sin(a)} x2={cx + 114 * Math.cos(a)} y2={cy + 114 * Math.sin(a)} stroke={k % 2 ? '#f0b070' : '#5c3014'} strokeOpacity={0.28} strokeWidth={3} />;
        })}
        <circle cx={cx} cy={cy} r={122} fill="none" stroke="#3a1d0b" strokeWidth={8} opacity={0.7} />
        <circle cx={cx} cy={cy} r={rPupila} fill="#0d0d0d" />
        <circle cx={cx - 34} cy={cy - 38} r={16} fill="#fff" opacity={0.85} />
        <circle cx={cx + 30} cy={cy + 26} r={7} fill="#fff" opacity={0.5} />
      </g>
      {/* Suma de tres en tres */}
      <g opacity={tarea}>
        {[0, 1, 2, 3].map((k) => {
          const ciclo = ((t - T.suma3) / 0.62 + k) % 4;
          const p = ciclo / 4;
          return <text key={k} x={175 - 40 * p} y={330 - 190 * p} textAnchor="middle" fontFamily="Ubuntu" fontWeight={700} fontSize={46} fill={NARANJA} opacity={Math.sin(Math.PI * p)}>+3</text>;
        })}
      </g>
      <g opacity={resuelto} transform={`translate(1010 130) scale(${0.6 + 0.4 * resuelto})`}>
        <rect x={-110} y={-34} width={220} height={68} rx={34} fill="#10b981" />
        <text x={0} y={12} textAnchor="middle" fontFamily="Arimo" fontWeight={700} fontSize={32} fill="#fff">✓ resuelto</text>
      </g>
    </g>
  );
};

const Indicadores: React.FC<Props & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const e = esfuerzo(t), p = pulso(t);
  const pct = Math.round(((e - 0.12) / 0.88) * 50);
  const lpm = Math.round(p * 7);
  const cards = [
    { a: T.dilata, etiqueta: 'Pupila', valor: `+${Math.max(0, pct)} %`, activo: pct > 1 },
    { a: T.ritmo, etiqueta: 'Pulso', valor: `+${lpm} lpm`, activo: lpm > 0 },
    { a: T.presion, etiqueta: 'Cuerpo', valor: '', activo: t >= T.presion && t < T.base + 1.2 },
  ];
  return (
    <g>
      {cards.map((k, i) => {
        const x = 40 + i * 380, op = ac(t, k.a - 0.3, k.a + 0.3) * (1 - ac(t, T.ley - 0.4, T.ley));
        return (
          <g key={k.etiqueta} opacity={op} transform={`translate(${x} 520)`}>
            <rect width={360} height={150} rx={28} fill={c.panel} style={{ filter: `drop-shadow(0 8px 18px rgba(0,0,0,${c.sombra * 0.8}))` }} />
            {k.activo && <rect width={360} height={8} rx={4} fill="url(#pe-marca)" />}
            <text x={30} y={50} fontFamily="Arimo" fontWeight={700} fontSize={22} letterSpacing={2.5} fill={c.tenue}>{k.etiqueta.toUpperCase()}</text>
            {i < 2 ? (
              <text x={30} y={120} fontFamily="Ubuntu" fontWeight={700} fontSize={62} fill={k.activo ? 'url(#pe-marcaH)' : c.texto}>{k.valor}</text>
            ) : (
              <g fontFamily="Ubuntu" fontWeight={700} fontSize={32}>
                <text x={30} y={98} fill={t >= T.presion && t < T.base + 1.2 ? NARANJA : c.apagado} opacity={ac(t, T.presion - 0.2, T.presion + 0.3, 0.35, 1)}>presión ↑</text>
                <text x={30} y={136} fill={t >= T.musculos && t < T.base + 1.2 ? ROSA : c.apagado} opacity={ac(t, T.musculos - 0.2, T.musculos + 0.3, 0.35, 1)}>músculos tensos</text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

const Cardiograma: React.FC<Props & { t: number; fps: number }> = ({ isDark, t, fps }) => {
  const c = tono(isDark);
  const op = ac(t, T.ritmo - 3.5, T.ritmo - 2.5) * (1 - ac(t, T.ley - 0.4, T.ley));
  const ventana = 3.2, x0 = 40, x1 = 1160, base = 845;
  let d = '';
  for (let x = x0; x <= x1; x += 4) {
    const tau = t - ventana + ((x - x0) / (x1 - x0)) * ventana;
    if (tau < 0) continue;
    const fase = faseEn(tau, fps);
    const y = base - latido(fase % 1) * (44 + 36 * pulso(tau));
    d += `${d ? ' L' : 'M'} ${x} ${y.toFixed(1)}`;
  }
  const alto = pulso(t) > 0.05;
  return (
    <g opacity={op}>
      <rect x={20} y={690} width={1160} height={200} rx={28} fill={c.panel} style={{ filter: `drop-shadow(0 8px 18px rgba(0,0,0,${c.sombra * 0.8}))` }} />
      <line x1={x0} x2={x1} y1={base} y2={base} stroke={c.apagado} strokeWidth={2} opacity={0.5} />
      <path d={d} fill="none" stroke={alto ? 'url(#pe-marcaH)' : c.tenue} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <text x={50} y={726} fontFamily="Arimo" fontWeight={700} fontSize={20} letterSpacing={2.5} fill={c.tenue}>RITMO CARDÍACO</text>
    </g>
  );
};

/* -------------------- Acto 2: la ley del mínimo esfuerzo -------------------- */

const bez = (p0: number[], p1: number[], p2: number[], u: number) => [
  (1 - u) ** 2 * p0[0] + 2 * (1 - u) * u * p1[0] + u ** 2 * p2[0],
  (1 - u) ** 2 * p0[1] + 2 * (1 - u) * u * p1[1] + u ** 2 * p2[1],
];

const MinimoEsfuerzo: React.FC<Props & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = ac(t, T.ley - 0.2, T.ley + 0.6) * (1 - ac(t, T.bonita - 0.2, T.bonita + 0.4));
  if (op <= 0) return null;
  const A = [150, 640], B = [1050, 640];
  const caminos = [
    { ctrl: [600, -40], costo: 3, nombre: 'exigente' },
    { ctrl: [600, 300], costo: 2, nombre: 'intermedio' },
    { ctrl: [600, 800], costo: 1, nombre: 'el más fácil' },
  ];
  const elige = ac(t, T.gravitas, T.gravitas + 2.2, 0, 1, Easing.inOut(Easing.quad));
  const [bx, by] = bez(A, caminos[2].ctrl, B, elige);
  const costos = ac(t, T.costo - 0.2, T.costo + 0.5);
  const gasto = ac(t, T.administra, T.administra + 1.2);
  return (
    <g opacity={op}>
      <text x={600} y={70} textAnchor="middle" fontFamily="Ubuntu" fontWeight={700} fontSize={50} fill={c.texto}>Ley del <tspan fill="url(#pe-marcaH)">mínimo esfuerzo</tspan></text>
      {caminos.map((k, i) => {
        const dib = ac(t, T.maneras + i * 0.45, T.maneras + i * 0.45 + 1.1);
        const atenuado = t > T.gravitas + 0.3 && i < 2;
        const d = `M ${A[0]} ${A[1]} Q ${k.ctrl[0]} ${k.ctrl[1]} ${B[0]} ${B[1]}`;
        const [mx, my] = bez(A, k.ctrl, B, 0.5);
        return (
          <g key={k.nombre} opacity={atenuado ? 0.35 : 1}>
            <path d={d} fill="none" stroke={i === 2 ? 'url(#pe-marcaH)' : c.apagado} strokeWidth={i === 2 ? 16 : 12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - dib} />
            <g opacity={costos} transform={`translate(${mx} ${my - (i === 2 ? -44 : 40)})`}>
              <rect x={-92} y={-30} width={184} height={60} rx={30} fill={c.panel} style={{ filter: `drop-shadow(0 6px 12px rgba(0,0,0,${c.sombra}))` }} />
              {Array.from({ length: k.costo }, (_, j) => (
                <path key={j} transform={`translate(${-((k.costo - 1) * 26) / 2 + j * 26 - 9} -16)`} d="M 11 0 L 0 18 L 8 18 L 5 32 L 18 12 L 10 12 L 13 0 Z" fill={i === 2 ? NARANJA : c.tenue} />
              ))}
            </g>
          </g>
        );
      })}
      {/* Inicio y meta */}
      <circle cx={A[0]} cy={A[1]} r={26} fill={c.panel2} stroke={c.tenue} strokeWidth={4} />
      <circle cx={B[0]} cy={B[1]} r={30} fill="url(#pe-marca)" />
      <text x={B[0]} y={B[1] + 74} textAnchor="middle" fontFamily="Arimo" fontWeight={700} fontSize={26} fill={c.tenue}>objetivo</text>
      {t > T.gravitas - 0.2 && <circle cx={bx} cy={by} r={22} fill="#fff" stroke={NARANJA} strokeWidth={6} style={{ filter: 'drop-shadow(0 6px 10px rgba(239,55,92,0.45))' }} />}
      {/* La mente administra el presupuesto de atención */}
      <g opacity={ac(t, T.administra - 0.3, T.administra + 0.3)} transform="translate(300 838)">
        <text x={0} y={0} fontFamily="Arimo" fontWeight={700} fontSize={22} letterSpacing={2.5} fill={c.tenue}>PRESUPUESTO DE ATENCIÓN</text>
        <rect x={0} y={20} width={600} height={34} rx={17} fill={c.panel2} />
        <rect x={0} y={20} width={600 * (1 - 0.16 * gasto)} height={34} rx={17} fill="url(#pe-marcaH)" />
      </g>
    </g>
  );
};

/* ------------------------ Acto 3: la destreza abarata ------------------------ */

const Destreza: React.FC<Props & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = ac(t, T.bonita - 0.1, T.bonita + 0.6);
  if (op <= 0) return null;
  const base = 760;
  const alturas = [420, 330, 255, 200, 165];
  const pupilas = [21, 17, 14, 11.5, 10];
  const xs = alturas.map((_, i) => 250 + i * 175);
  const linea = ac(t, T.actividad, T.actividad + 1.4);
  const ahorro = ac(t, T.talento, T.talento + 1.2);
  const badge = ac(t, T.ahorrada - 0.2, T.ahorrada + 0.4);
  const resalta = t > T.dilataMenos && t < T.talento ? 1 + 0.12 * Math.sin((t - T.dilataMenos) * 7) : 1;
  const techo = base - alturas[0];
  return (
    <g opacity={op}>
      <text x={600} y={70} textAnchor="middle" fontFamily="Ubuntu" fontWeight={700} fontSize={50} fill={c.texto}>La destreza <tspan fill="url(#pe-marcaH)">abarata</tspan></text>
      <line x1={140} x2={1100} y1={base} y2={base} stroke={c.apagado} strokeWidth={3} />
      <text x={1100} y={base + 50} textAnchor="end" fontFamily="Arimo" fontWeight={700} fontSize={24} fill={c.tenue}>práctica →</text>
      <text x={140} y={150} fontFamily="Arimo" fontWeight={700} fontSize={22} letterSpacing={2.5} fill={c.tenue}>ESFUERZO</text>
      {/* Energía ahorrada: lo que ya no se gasta respecto del primer intento */}
      <g opacity={ahorro}>
        <path d={`M ${xs[1]} ${techo} L ${xs[4]} ${techo} ${[4, 3, 2, 1].map((i) => `L ${xs[i]} ${base - alturas[i]}`).join(' ')} Z`} fill="url(#pe-marca)" opacity={0.22} />
        <line x1={xs[0]} x2={xs[4] + 60} y1={techo} y2={techo} stroke={NARANJA} strokeWidth={4} strokeDasharray="14 12" />
      </g>
      {alturas.map((h, i) => {
        const p = ac(t, T.dominas + i * 0.4, T.dominas + i * 0.4 + 0.7, 0, 1, Easing.out(Easing.back(1.4)));
        const x = xs[i];
        return (
          <g key={i}>
            <rect x={x - 55} y={base - h * p} width={110} height={h * p} rx={18} fill={i === 0 ? ROJO : 'url(#pe-marca)'} opacity={i === 0 ? 0.85 : 1} />
            <g opacity={p} transform={`translate(${x} ${base - h * p - 52})`}>
              <path d="M -40 0 Q 0 -30 40 0 Q 0 30 -40 0 Z" fill={c.blanco} style={{ filter: `drop-shadow(0 4px 8px rgba(0,0,0,${c.sombra}))` }} />
              <circle r={17} fill="#8a4f22" />
              <circle r={pupilas[i] * (i > 0 ? resalta : 1) * 0.62} fill="#0d0d0d" />
            </g>
          </g>
        );
      })}
      <path d={`M ${xs.map((x, i) => `${x} ${base - alturas[i] - 100}`).join(' L ')}`} fill="none" stroke={c.texto} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" opacity={linea * 0.6} />
      <text x={xs[0] + 30} y={base - alturas[0] - 108} fontFamily="Arimo" fontWeight={700} fontSize={22} fill={c.tenue} opacity={linea}>actividad cerebral</text>
      <g opacity={badge} transform={`translate(${(xs[2] + xs[4]) / 2} ${techo - 58}) scale(${0.7 + 0.3 * badge})`}>
        <rect x={-170} y={-36} width={340} height={72} rx={36} fill="url(#pe-marca)" style={{ filter: 'drop-shadow(0 6px 16px rgba(239,55,92,0.4))' }} />
        <text x={0} y={12} textAnchor="middle" fontFamily="Arimo" fontWeight={700} fontSize={32} fill="#fff">energía ahorrada</text>
      </g>
    </g>
  );
};

export const PupilaEsfuerzo: React.FC<Props> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }} aria-label="La pupila se dilata con el esfuerzo, el pulso sube y todo vuelve a la base; la mente prefiere el camino más fácil y la práctica ahorra energía">
        <defs>
          <linearGradient id="pe-marca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={NARANJA} /><stop offset="1" stopColor={ROSA} /></linearGradient>
          <linearGradient id="pe-marcaH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={NARANJA} /><stop offset="1" stopColor={ROSA} /></linearGradient>
        </defs>
        <g opacity={1 - ac(t, T.ley - 0.4, T.ley)}>
          <Ojo isDark={isDark} t={t} fps={fps} frame={frame} />
          <Indicadores isDark={isDark} t={t} />
          <Cardiograma isDark={isDark} t={t} fps={fps} />
        </g>
        <MinimoEsfuerzo isDark={isDark} t={t} />
        <Destreza isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
