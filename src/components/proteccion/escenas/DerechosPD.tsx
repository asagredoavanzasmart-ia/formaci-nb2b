import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Candado, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Los seis derechos», escena propia. La persona al centro y seis fichas alrededor, cada una con su
 * dibujo animado: acceso (lupa sobre la hoja), rectificación (lápiz que corrige), supresión (papelera),
 * oposición (alto), portabilidad (la hoja pasa de una caja a otra) y bloqueo (pausa). Luego un candado
 * (irrenunciables), una persona más pequeña (los herederos) y la insignia «gratis».
 */

export const W = 1200, H = 860;
const ID = 'pdr2';

const nombres = ['acceso', 'rectificacion', 'supresion', 'oposicion', 'portabilidad', 'bloqueo', 'irrenunciables', 'herederos', 'gratis', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const FICHAS: { n: Nombre; txt: string; x: number; y: number }[] = [
  { n: 'acceso', txt: 'acceso', x: 230, y: 260 }, { n: 'rectificacion', txt: 'rectificación', x: 230, y: 430 }, { n: 'supresion', txt: 'supresión', x: 230, y: 600 },
  { n: 'oposicion', txt: 'oposición', x: 970, y: 260 }, { n: 'portabilidad', txt: 'portabilidad', x: 970, y: 430 }, { n: 'bloqueo', txt: 'bloqueo', x: 970, y: 600 },
];

/* Dibujo de cada derecho, centrado en (0, 0) y de unos 100 de ancho. */
const Dibujo: React.FC<{ n: Nombre; t: number; c: Tono; id: string }> = ({ n, t, c, id }) => {
  if (n === 'acceso') return (
    <g><rect x={-30} y={-34} width={60} height={68} rx={6} fill={c.panel2} />{[-18, -4, 10].map((y) => <rect key={y} x={-20} y={y} width={40} height={6} rx={3} fill={c.apagado} />)}
      <g transform={`translate(${16 + 10 * Math.sin(t * 2)} 8)`}><circle r={18} fill="none" stroke={NARANJA} strokeWidth={6} /><line x1={13} y1={13} x2={26} y2={26} stroke={c.texto} strokeWidth={6} strokeLinecap="round" /></g></g>
  );
  if (n === 'rectificacion') return (
    <g><rect x={-46} y={-6} width={70} height={10} rx={5} fill={c.apagado} /><rect x={-46} y={-6} width={70 * ((t * 0.5) % 1)} height={10} rx={5} fill={NARANJA} />
      <g transform={`translate(${-46 + 70 * ((t * 0.5) % 1)} -2) rotate(-35)`}><rect x={-5} y={-46} width={10} height={40} rx={3} fill={NARANJA} /><path d="M -5 -6 L 5 -6 L 0 4 Z" fill={c.texto} /></g></g>
  );
  if (n === 'supresion') return (
    <g><rect x={-26} y={-20} width={52} height={54} rx={6} fill={c.tenue} /><rect x={-34} y={-30} width={68} height={10} rx={4} fill={c.texto} />
      <rect x={-12 + 24 * 0} y={-60 + 40 * ((t * 0.6) % 1)} width={24} height={20} rx={4} fill={NARANJA} opacity={1 - ((t * 0.6) % 1)} /></g>
  );
  if (n === 'oposicion') {
    const pts = Array.from({ length: 8 }, (_, k) => { const a = ((k + 0.5) / 8) * Math.PI * 2; return `${(Math.cos(a) * 36).toFixed(1)} ${(Math.sin(a) * 36).toFixed(1)}`; }).join(' L ');
    return <g><path d={`M ${pts} Z`} fill={ROSA} /><rect x={-20} y={-5} width={40} height={10} rx={4} fill="#fff" /></g>;
  }
  if (n === 'portabilidad') {
    const u = (t * 0.45) % 1;
    return <g><rect x={-56} y={-20} width={36} height={40} rx={6} fill="none" stroke={c.tenue} strokeWidth={4} /><rect x={20} y={-20} width={36} height={40} rx={6} fill="none" stroke={NARANJA} strokeWidth={4} />
      <rect x={lerp(-48, 28, u)} y={-12 - Math.sin(Math.PI * u) * 24} width={20} height={24} rx={4} fill={`url(#${id}-marca)`} /></g>;
  }
  return <g><rect x={-22} y={-30} width={16} height={60} rx={5} fill={c.texto} /><rect x={6} y={-30} width={16} height={60} rx={5} fill={c.texto} /></g>;
};

export const DerechosPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('gratis') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Seis derechos'], [M('acceso'), 'Acceso: saber qué y de dónde'], [M('rectificacion'), 'Rectificación: corregir'], [M('supresion'), 'Supresión: eliminar'],
    [M('oposicion'), 'Oposición: impedir un uso'], [M('portabilidad'), 'Portabilidad: llevárselos'], [M('bloqueo'), 'Bloqueo: pausar'],
    [M('irrenunciables'), 'Personales e irrenunciables'], [M('herederos'), 'También para los herederos'], [M('gratis'), 'Gratuitos'],
  ];
  // La ficha del derecho que se está nombrando queda destacada hasta que se nombra el siguiente.
  let activa = -1;
  FICHAS.forEach((f, k) => { if (t >= M(f.n)) activa = k; });
  if (t >= M('irrenunciables')) activa = -1;

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Acceso, rectificación, supresión, oposición, portabilidad y bloqueo: derechos personales, irrenunciables y gratuitos">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />
          <g opacity={ac(t, 0.2, 0.8)}><Persona id={ID} x={600} y={720} s={1.05} /></g>
          {FICHAS.map((f, k) => {
            const e = Math.min(1, pop(t, M(f.n), 0.5));
            if (e < 0.01) return null;
            const on = activa === k;
            return (
              <g key={f.n} opacity={e} transform={`translate(${f.x} ${f.y}) scale(${0.9 + 0.1 * e})`}>
                <rect x={-170} y={-75} width={340} height={150} rx={24} fill={c.panel} stroke={on ? NARANJA : 'none'} strokeWidth={4} style={sombra(c.sombra, 5, 12)} />
                <g transform="translate(0 -22)"><Dibujo n={f.n} t={t} c={c} id={ID} /></g>
                <Txt f="a" x={0} y={46} dominantBaseline="central" textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{f.txt}</Txt>
              </g>
            );
          })}
          <g opacity={Math.min(1, pop(t, M('irrenunciables'), 0.5))}><Candado x={600} y={445} s={0.7} id={ID} /></g>
          <g opacity={Math.min(1, pop(t, M('herederos'), 0.5))}><Persona id={ID} x={705} y={720} s={0.6} cuerpo="#94a3b8" /></g>
          <g opacity={Math.min(1, pop(t, M('gratis'), 0.5))}><Insignia x={600} y={800} texto="gratis" c={c} id={ID} tono="verde" /></g>
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
