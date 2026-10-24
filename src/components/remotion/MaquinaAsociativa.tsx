import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono, type PropsEscena } from './comun';

/** «La máquina asociativa: dos palabras y una cascada», animada con Remotion. Tiempos relativos a la diapositiva. */
export const T = {
  escucha: 0.15, platanos: 2.25, vomito: 3.0, segundo: 4.21, mucho: 5.81,
  memoria: 7.75, nausea: 10.21, fruta: 11.1, enfermedad: 11.78, suciedad: 12.73,
  emocion: 13.39, razonamiento: 15.55, cuerpo: 17.41, piel: 20.15,
  historia: 22.99, comio: 25.65, enfermo: 27.69,
  asociacion: 29.35, hume: 31.68, leyes: 34.29, semejanza: 35.38, contiguidad: 36.41, causalidad: 38.67,
  kahneman: 40.38, conciencia: 44.35, paralelo: 45.66, rapido: 46.75, resultado: 49.45,
};
/* Marcas en que se activa cada rama, para que el texto de la diapositiva siga al audio. */
export const MARCAS_RAMAS = [T.memoria, T.emocion, T.cuerpo, T.historia];
export const W = 1200, H = 900;
const ID = 'ma';
const CENTRO = [600, 450];
const RAMAS = [
  { x: 230, y: 235, a: T.memoria, nombre: 'Memoria' },
  { x: 970, y: 235, a: T.emocion, nombre: 'Emoción' },
  { x: 230, y: 665, a: T.cuerpo, nombre: 'Cuerpo' },
  { x: 970, y: 665, a: T.historia, nombre: 'Historia' },
];

const Contenido: React.FC<PropsEscena & { i: number; t: number }> = ({ isDark, i, t }) => {
  const c = tono(isDark);
  if (i === 0) {
    const palabras: [string, number][] = [['náusea', T.nausea], ['fruta', T.fruta], ['enfermedad', T.enfermedad], ['suciedad', T.suciedad]];
    return (
      <g>
        {palabras.map(([p, a], k) => {
          const s = pop(t, a, 0.4);
          const x = k % 2 ? 75 : -75, y = k < 2 ? 0 : 52;
          return (
            <g key={p} opacity={s} transform={`translate(${x} ${y}) scale(${0.5 + 0.5 * s})`}>
              <rect x={-68} y={-21} width={136} height={42} rx={21} fill={c.panel2} />
              <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={21} fill={c.texto}>{p}</Txt>
            </g>
          );
        })}
      </g>
    );
  }
  if (i === 1) {
    const asco = ac(t, T.emocion, T.emocion + 0.8);
    const tiembla = Math.sin(t * 9) * 2 * asco;
    const razon = ac(t, T.razonamiento, T.razonamiento + 0.6);
    return (
      <g>
        <g transform={`translate(${-60 + tiembla} 24)`}>
          <circle r={50} fill={`url(#${ID}-cara)`} />
          <circle r={50} fill={VERDE} opacity={0.18 * asco} />
          <path d={`M -28 ${-18 - 6 * asco} L -8 ${-14 + 4 * asco} M 28 ${-18 - 6 * asco} L 8 ${-14 + 4 * asco}`} stroke="#3b2a20" strokeWidth={5} strokeLinecap="round" />
          <circle cx={-16} cy={-2} r={4} fill="#3b2a20" /><circle cx={16} cy={-2} r={4} fill="#3b2a20" />
          <path d={`M -22 24 q 7 ${-10 * asco} 14 0 q 7 ${10 * asco} 14 0 q 7 ${-10 * asco} 14 0`} stroke="#3b2a20" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
        <g transform="translate(70 -4)">
          <rect x={-46} y={-22} width={92} height={44} rx={22} fill={`url(#${ID}-marca)`} />
          <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={22} fill="#fff">1º asco</Txt>
        </g>
        <g transform={`translate(${70 + (1 - razon) * 80} 50)`} opacity={razon}>
          <rect x={-46} y={-22} width={92} height={44} rx={22} fill={c.panel2} />
          <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={22} fill={c.tenue}>2º razón</Txt>
        </g>
      </g>
    );
  }
  if (i === 2) {
    const mueca = ac(t, T.cuerpo + 0.4, T.cuerpo + 1.2);
    let d = '';
    for (let x = -10; x <= 140; x += 3) {
      const tau = t - 3 + ((x + 10) / 150) * 3;
      const pico = Math.exp(-(((tau - T.piel - 0.6) / 0.5) ** 2));
      d += `${d ? ' L' : 'M'} ${x} ${30 - 4 * Math.sin(tau * 5) - 60 * pico}`;
    }
    return (
      <g>
        <g transform="translate(-85 24)">
          <circle r={46} fill={`url(#${ID}-cara)`} />
          <path d={`M -20 -10 l 12 ${4 * mueca} M 20 -10 l -12 ${4 * mueca}`} stroke="#3b2a20" strokeWidth={5} strokeLinecap="round" />
          <path d={`M -18 22 Q 0 ${22 - 12 * mueca} 18 ${22 + 8 * mueca}`} stroke="#3b2a20" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
        <path d={d} fill="none" stroke={t > T.piel - 0.2 ? `url(#${ID}-marcaH)` : c.tenue} strokeWidth={5} strokeLinejoin="round" />
        <Txt f="a" x={65} y={80} textAnchor="middle" fontSize={18} fill={c.tenue} opacity={ac(t, T.piel - 0.3, T.piel + 0.3)}>respuesta de la piel</Txt>
      </g>
    );
  }
  const viñetas = [T.historia + 0.3, T.comio, T.enfermo];
  return (
    <g>
      {viñetas.map((a, k) => {
        const s = pop(t, a, 0.45);
        return (
          <g key={k} opacity={s} transform={`translate(${-100 + k * 100} 24) scale(${0.6 + 0.4 * s})`}>
            <rect x={-44} y={-48} width={88} height={96} rx={14} fill={c.panel2} />
            {k === 0 && <path d="M -26 10 Q 0 30 26 -16 Q 4 14 -26 10 Z" fill="#f2c94c" />}
            {k === 1 && <><circle cx={0} cy={-8} r={18} fill={`url(#${ID}-cara)`} /><path d="M -10 2 Q 0 8 10 2" stroke="#3b2a20" strokeWidth={3} fill="none" /><path d="M 8 18 Q 26 28 36 4 Q 22 22 8 18 Z" fill="#f2c94c" /></>}
            {k === 2 && <><circle cx={0} cy={-6} r={18} fill={`url(#${ID}-cara)`} /><circle cx={0} cy={-6} r={18} fill={VERDE} opacity={0.35} /><path d="M -10 6 q 5 -5 10 0 q 5 5 10 0" stroke="#3b2a20" strokeWidth={3} fill="none" /><path d="M -14 -16 l 8 4 M 14 -16 l -8 4" stroke="#3b2a20" strokeWidth={3} /></>}
            {k < 2 && <Txt f="a" x={52} y={8} textAnchor="middle" fontSize={22} fill={c.tenue}>→</Txt>}
          </g>
        );
      })}
    </g>
  );
};

export const MaquinaAsociativa: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const c = tono(isDark);
  // Las dos palabras caen y luego se funden en el nodo central.
  const p1 = pop(t, T.platanos, 0.5), p2 = pop(t, T.vomito, 0.5);
  const funde = ac(t, T.mucho, T.mucho + 0.9);
  const reloj = ac(t, T.segundo, T.segundo + 0.9);
  const relojOp = ac(t, T.segundo - 0.2, T.segundo + 0.2) * (1 - ac(t, T.mucho + 0.2, T.mucho + 0.7));
  // La red se achica cuando llegan las leyes de Hume y baja bajo el umbral de la conciencia.
  const humeOp = ac(t, T.asociacion, T.asociacion + 0.8) * (1 - ac(t, T.kahneman - 0.3, T.kahneman + 0.3));
  const bajo = ac(t, T.kahneman, T.kahneman + 1.2);
  const escala = 1 - 0.3 * humeOp - 0.36 * bajo;
  const dy = -95 * humeOp + 150 * bajo;
  const paralelo = t > T.paralelo ? 0.5 + 0.5 * Math.abs(Math.sin((t - T.paralelo) * 7)) : 0;
  const rapido = ac(t, T.rapido, T.rapido + 0.4) * (1 - ac(t, T.resultado + 0.5, T.resultado + 1));
  const resultado = pop(t, T.resultado, 0.6);
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <g transform={`translate(${600 * (1 - escala)} ${450 * (1 - escala) + dy}) scale(${escala})`}>
          {/* Conexiones y cascada de impulsos */}
          {RAMAS.map((r, i) => {
            const dib = ac(t, r.a - 0.3, r.a + 0.5);
            if (dib <= 0) return null;
            const x = CENTRO[0] + (r.x - CENTRO[0]) * dib, y = CENTRO[1] + (r.y - CENTRO[1]) * dib;
            return (
              <g key={i}>
                <line x1={CENTRO[0]} y1={CENTRO[1]} x2={x} y2={y} stroke={`url(#${ID}-marcaH)`} strokeWidth={6} opacity={0.5} />
                {dib >= 1 && [0, 1, 2, 3].map((k) => {
                  const u = ((t * (1.4 + paralelo * 2) + k / 4 + i * 0.13) % 1);
                  return <circle key={k} cx={CENTRO[0] + (r.x - CENTRO[0]) * u} cy={CENTRO[1] + (r.y - CENTRO[1]) * u} r={7} fill={k % 2 ? ROSA : NARANJA} opacity={Math.sin(Math.PI * u)} />;
                })}
              </g>
            );
          })}
          {/* Ramas */}
          {RAMAS.map((r, i) => {
            const s = pop(t, r.a, 0.6);
            if (s <= 0) return null;
            const brilla = paralelo > 0 ? paralelo : 0;
            return (
              <g key={r.nombre} opacity={Math.min(1, s)} transform={`translate(${r.x} ${r.y}) scale(${0.6 + 0.4 * s})`}>
                <rect x={-175} y={-110} width={350} height={220} rx={32} fill={c.panel} style={brilla ? { filter: `drop-shadow(0 6px ${12 + 24 * brilla}px rgba(255,133,29,${0.25 + 0.35 * brilla}))` } : sombra(c.sombra)} />
                <rect x={-175} y={-110} width={350} height={10} rx={5} fill={`url(#${ID}-marcaH)`} />
                <Txt x={-150} y={-62} fontSize={28} fill={c.texto}>{r.nombre}</Txt>
                <Contenido isDark={isDark} i={i} t={t} />
              </g>
            );
          })}
          {/* Las dos palabras → nodo */}
          <g transform={`translate(${-220 * (1 - funde)} 0)`} opacity={p1}>
            <g transform={`translate(600 450) scale(${(0.6 + 0.4 * p1) * (1 - 0.35 * funde)}) rotate(${-4 * (1 - funde)})`}>
              <rect x={-170} y={-62} width={340} height={124} rx={30} fill={`url(#${ID}-marca)`} style={{ filter: 'drop-shadow(0 10px 22px rgba(239,55,92,0.4))' }} />
              <Txt x={0} y={18} textAnchor="middle" fontSize={56} fill="#fff">Plátanos</Txt>
            </g>
          </g>
          <g transform={`translate(${220 * (1 - funde)} ${70 * funde})`} opacity={p2}>
            <g transform={`translate(600 450) scale(${(0.6 + 0.4 * p2) * (1 - 0.35 * funde)}) rotate(${4 * (1 - funde)})`}>
              <rect x={-170} y={-62} width={340} height={124} rx={30} fill={c.panel} style={sombra(c.sombra)} />
              <Txt x={0} y={18} textAnchor="middle" fontSize={56} fill={c.texto}>Vómito</Txt>
            </g>
          </g>
          {funde > 0 && <circle cx={600} cy={480} r={40 + 160 * funde} fill={`url(#${ID}-halo)`} opacity={1 - funde * 0.6} />}
        </g>
        {/* Menos de un segundo */}
        <g opacity={relojOp} transform="translate(600 700)">
          <circle r={70} fill={c.panel} style={sombra(c.sombra)} />
          <circle r={56} fill="none" stroke={c.apagado} strokeWidth={10} />
          <circle r={56} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={10} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - reloj} transform="rotate(-90)" strokeLinecap="round" />
          <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={c.texto}>&lt;1 s</Txt>
        </g>
        {/* Las tres leyes de Hume */}
        <g opacity={humeOp}>
          <g opacity={pop(t, T.hume)} transform="translate(600 640)">
            <rect x={-200} y={-30} width={400} height={60} rx={30} fill={c.panel2} />
            <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill={c.texto}>David Hume · siglo XVIII</Txt>
          </g>
          {[
            { a: T.semejanza, n: 'semejanza', icono: <><rect x={-46} y={-24} width={40} height={40} rx={10} fill={NARANJA} /><rect x={6} y={-24} width={40} height={40} rx={10} fill={ROSA} /></> },
            { a: T.contiguidad, n: 'contigüidad', icono: <><circle cx={-22} cy={-4} r={20} fill={NARANJA} /><circle cx={22} cy={-4} r={20} fill={ROSA} /><circle cx={0} cy={-4} r={4} fill={c.panel} /></> },
            { a: T.causalidad, n: 'causalidad', icono: <><circle cx={-30} cy={-4} r={18} fill={NARANJA} /><path d="M -6 -4 L 18 -4 M 10 -14 L 22 -4 L 10 6" stroke={c.texto} strokeWidth={5} fill="none" strokeLinecap="round" /><circle cx={40} cy={-4} r={14} fill={ROSA} /></> },
          ].map((l, k) => {
            const s = pop(t, l.a, 0.5);
            return (
              <g key={l.n} opacity={s} transform={`translate(${270 + k * 330} 780) scale(${0.6 + 0.4 * s})`}>
                <rect x={-140} y={-62} width={280} height={124} rx={28} fill={c.panel} style={sombra(c.sombra)} />
                <g transform="translate(0 -12)">{l.icono}</g>
                <Txt f="a" x={0} y={44} textAnchor="middle" fontSize={26} fill={c.texto}>{l.n}</Txt>
              </g>
            );
          })}
        </g>
        {/* Fuera de la conciencia, en paralelo, más rápido de lo que podrías narrarlo */}
        <g opacity={ac(t, T.conciencia - 0.2, T.conciencia + 0.4)}>
          <line x1={60} x2={1140} y1={330} y2={330} stroke={c.tenue} strokeWidth={4} strokeDasharray="18 14" />
          <Txt f="a" x={1140} y={312} textAnchor="end" fontSize={24} fill={c.tenue}>umbral de la conciencia</Txt>
          <Txt f="a" x={1140} y={366} textAnchor="end" fontSize={22} fill={c.tenue}>debajo: automático</Txt>
        </g>
        <g opacity={rapido}>
          {Array.from({ length: 7 }, (_, k) => {
            const u = (t * 2.2 + k / 7) % 1;
            return <rect key={k} x={40 + u * 1100} y={420 + k * 50} width={140} height={6} rx={3} fill={k % 2 ? ROSA : NARANJA} opacity={Math.sin(Math.PI * u) * 0.7} />;
          })}
        </g>
        <g opacity={resultado} transform={`translate(600 170) scale(${0.6 + 0.4 * resultado})`}>
          <Persona id={ID} x={-180} y={80} s={0.75} />
          <rect x={-110} y={-60} width={430} height={120} rx={36} fill={c.panel} style={{ filter: 'drop-shadow(0 8px 22px rgba(255,133,29,0.35))' }} />
          <Txt f="a" x={105} y={-8} textAnchor="middle" fontSize={22} fill={c.tenue}>tú solo recibes</Txt>
          <Txt x={105} y={32} textAnchor="middle" fontSize={30} fill={`url(#${ID}-marcaH)`}>el resultado, ya cocinado</Txt>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
