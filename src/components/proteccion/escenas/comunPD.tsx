import React from 'react';
import { NARANJA, Txt, ac, pop, sombra, tono } from '../../remotion/comun';

/* Piezas compartidas por las escenas de la clase «Protección de datos» (dibujos SVG propios). */

export type Tono = ReturnType<typeof tono>;

export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export const escribe = (s: string, u: number) => s.slice(0, Math.max(0, Math.floor(s.length * Math.min(1, u))));

/* Tamaño mínimo de texto en el lienzo de 1200 × 860: en vertical se ve a ~0,30, así que 44 da 13 px. */
export const MIN_TXT = 44;

/* Visibilidad de un elemento que ocupa un lugar entre a y b: entra después de a y sale antes de b,
   así el siguiente que use ese lugar nunca se superpone. */
export const ventana = (t: number, a: number, b: number, f = 0.3) => ac(t, a, a + f) * (1 - ac(t, b - f, b));

/* Rótulo de la idea en curso, arriba de la escena: cambia con cada marca. Un rótulo que duraría menos
   de 1 s se omite (el anterior sigue hasta el siguiente). */
export const Rotulo: React.FC<{ t: number; lista: [number, string][]; id: string }> = ({ t, lista, id }) => {
  const orden = [...lista].sort((a, b) => a[0] - b[0]);
  const util = orden.filter(([m], j) => j === orden.length - 1 || orden[j + 1][0] - m >= 1);
  let k = -1;
  util.forEach(([m], j) => { if (t >= m - 0.1) k = j; });
  if (k < 0) return null;
  const [m, txt] = util[k];
  const e = Math.min(1, pop(t, m - 0.1, 0.5));
  return <Txt x={600} y={72} textAnchor="middle" fontSize={MIN_TXT} fill={`url(#${id}-marcaH)`} opacity={e} transform={`translate(0 ${(1 - e) * 14})`}>{txt}</Txt>;
};

/* Pregunta de reflexión que cierra la escena. */
export const PanelPregunta: React.FC<{ texto?: string; v: number; c: Tono; id: string }> = ({ texto, v, c, id }) => {
  if (!texto || v <= 0.001) return null;
  const ancho = 1080;
  const lineas: string[] = []; let l = '';
  for (const p of texto.split(' ')) { if ((l + ' ' + p).trim().length > 36) { lineas.push(l.trim()); l = p; } else l += ' ' + p; }
  if (l.trim()) lineas.push(l.trim());
  const alto = 120 + lineas.length * 58;
  const e = Math.min(1, v);
  return (
    <g opacity={e} transform={`translate(600 430) scale(${0.85 + 0.15 * e})`}>
      <rect x={-ancho / 2} y={-alto / 2} width={ancho} height={alto} rx={40} fill={c.panel} style={sombra(c.sombra, 14, 30)} />
      <rect x={-ancho / 2} y={-alto / 2} width={14} height={alto} rx={7} fill={`url(#${id}-marca)`} />
      <Txt f="a" x={-ancho / 2 + 50} y={-alto / 2 + 64} fontSize={MIN_TXT} fill={NARANJA} peso={700} letterSpacing={2}>PARA PENSAR</Txt>
      {lineas.map((ln, j) => <Txt key={j} x={-ancho / 2 + 50} y={-alto / 2 + 128 + j * 58} fontSize={MIN_TXT} fill={c.texto}>{ln}</Txt>)}
    </g>
  );
};

/* Ficha de contacto: un dato de una persona (silueta y dos líneas). */
export const Contacto: React.FC<{ x: number; y: number; s?: number; relleno: string; rot?: number; op?: number }> = ({ x, y, s = 1, relleno, rot = 0, op = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    <rect x={-30} y={-19} width={60} height={38} rx={9} fill={relleno} />
    <circle cx={-15} cy={-5} r={6} fill="#fff" opacity={0.92} />
    <path d="M -25 12 Q -15 1 -5 12 Z" fill="#fff" opacity={0.92} />
    <rect x={1} y={-8} width={20} height={5} rx={2.5} fill="#fff" opacity={0.85} />
    <rect x={1} y={3} width={14} height={5} rx={2.5} fill="#fff" opacity={0.6} />
  </g>
);

/* Hoja de documento con encabezado de color y líneas que se escriben (`llena` de 0 a 1). */
export const Hoja: React.FC<{ x: number; y: number; w: number; h: number; c: Tono; cabeza: string; titulo: string; llena: number; rot?: number; tituloTam?: number; gris?: boolean }> = ({ x, y, w, h, c, cabeza, titulo, llena, rot = 0, tituloTam = 30, gris = false }) => {
  const n = Math.max(3, Math.floor((h - 110) / 34));
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={gris ? c.panel2 : c.panel} style={sombra(c.sombra)} />
      <path d={`M ${-w / 2} ${-h / 2 + 18} Q ${-w / 2} ${-h / 2} ${-w / 2 + 18} ${-h / 2} H ${w / 2 - 18} Q ${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 18} V ${-h / 2 + 70} H ${-w / 2} Z`} fill={cabeza} />
      <Txt x={0} y={-h / 2 + 46} textAnchor="middle" fontSize={tituloTam} fill="#fff" letterSpacing={1}>{titulo}</Txt>
      {Array.from({ length: n }, (_, k) => {
        const u = ac(llena, k / n, (k + 1) / n);
        const largo = (w - 70) * (k === n - 1 ? 0.55 : 0.85 + 0.15 * Math.sin(k * 2.1));
        return <rect key={k} x={-w / 2 + 35} y={-h / 2 + 100 + k * 34} width={largo * u} height={10} rx={5} fill={c.apagado} />;
      })}
    </g>
  );
};

/* Edificio institucional (columnas, frontón, gradas). Con `escudo`, lleva el emblema de la Agencia. */
export const Institucion: React.FC<{ x: number; y: number; s?: number; c: Tono; id: string; escudo?: boolean; bandera?: number }> = ({ x, y, s = 1, c, id, escudo = false, bandera }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={4} rx={120} ry={14} fill="#000" opacity={0.14} />
    <rect x={-112} y={-22} width={224} height={22} rx={4} fill={c.apagado} />
    <rect x={-100} y={-34} width={200} height={14} rx={3} fill={c.panel2} />
    {[-72, -24, 24, 72].map((cx) => <rect key={cx} x={cx - 12} y={-124} width={24} height={90} rx={4} fill={c.panel2} />)}
    {[-72, -24, 24, 72].map((cx) => <rect key={`s${cx}`} x={cx + 2} y={-124} width={10} height={90} fill="#000" opacity={0.08} />)}
    <rect x={-104} y={-138} width={208} height={16} rx={3} fill={c.apagado} />
    <path d="M -114 -138 L 0 -196 L 114 -138 Z" fill={escudo ? `url(#${id}-marca)` : c.tenue} />
    {escudo && <path transform="translate(0 -160) scale(0.42)" d="M 0 -40 L 34 -28 V 4 C 34 28 16 42 0 50 C -16 42 -34 28 -34 4 V -28 Z" fill="#fff" />}
    {bandera != null && (
      <g transform="translate(0 -196)">
        <rect x={-2} y={-62} width={4} height={62} fill={c.tenue} />
        <path d={`M 2 -62 Q 18 ${-66 + 4 * Math.sin(bandera * 3)} 34 -60 Q 46 ${-56 - 3 * Math.sin(bandera * 3)} 58 -58 V -36 Q 44 ${-34 + 3 * Math.sin(bandera * 3 + 1)} 32 -38 Q 18 -42 2 -38 Z`} fill={`url(#${id}-marca)`} />
      </g>
    )}
  </g>
);

/* Edificio de oficinas en volumen (frente y costado), con ventanas encendidas. */
export const Oficinas: React.FC<{ x: number; y: number; s?: number; c: Tono; luz?: number; t?: number; ventana?: string }> = ({ x, y, s = 1, c, luz = 0.5, t = 0, ventana }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={14} cy={4} rx={110} ry={14} fill="#000" opacity={0.14} />
    <path d="M 70 0 L 70 -210 L 110 -232 L 110 -22 Z" fill={c.apagado} />
    <path d="M -70 -210 L -30 -232 L 110 -232 L 70 -210 Z" fill={c.panel} />
    <rect x={-70} y={-210} width={140} height={210} fill={c.panel2} />
    {Array.from({ length: 12 }, (_, k) => {
      const col = k % 3, fil = Math.floor(k / 3);
      const on = (Math.sin(k * 7.3 + t * 0.6) + 1) / 2 > 1 - luz;
      return <rect key={k} x={-52 + col * 38} y={-190 + fil * 44} width={28} height={30} rx={4} fill={on ? ventana ?? NARANJA : c.apagado} opacity={on ? 0.55 : 0.8} />;
    })}
    <rect x={-16} y={-36} width={32} height={36} rx={4} fill={c.tenue} />
  </g>
);

/* Base de datos: dos cilindros apilados en tres tonos, con luces que laten. (x, y) es la tapa superior. */
export const BaseDatos: React.FC<{ x: number; y: number; c: Tono; t: number; s?: number; marca?: string }> = ({ x, y, c, t, s = 1, marca }) => {
  const cil = (cy: number, k: number) => (
    <g key={k} transform={`translate(0 ${cy})`}>
      <path d="M -72 0 V 52 A 72 23 0 0 0 72 52 V 0 Z" fill={marca ?? c.apagado} />
      <path d="M 0 23 V 75 A 72 23 0 0 0 72 52 V 0 A 72 23 0 0 1 0 23 Z" fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={72} ry={23} fill={c.panel2} />
      {[0, 1, 2].map((j) => <circle key={j} cx={-30 + j * 30} cy={0} r={6} fill={NARANJA} opacity={0.35 + 0.35 * ((Math.sin(t * 3 + j + k) + 1) / 2)} />)}
    </g>
  );
  return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse cx={0} cy={140} rx={86} ry={16} fill="#000" opacity={0.12} />{cil(62, 1)}{cil(0, 0)}</g>;
};

/* Insignia con texto (píldora). `giro` de 0 a 1 la voltea como una placa (útil al cambiar de texto). */
export const Insignia: React.FC<{ x: number; y: number; texto: string; c: Tono; id: string; giro?: number; tono?: 'marca' | 'tenue' | 'alerta' | 'verde'; ancho?: number }> = ({ x, y, texto, c, id, giro = 0, tono = 'marca', ancho }) => {
  const w = ancho ?? Math.max(180, texto.length * 25 + 60);
  const fondo = tono === 'marca' ? `url(#${id}-marca)` : tono === 'alerta' ? '#c2263e' : tono === 'verde' ? '#0f9f6e' : c.panel2;
  return (
    <g transform={`translate(${x} ${y}) scale(1 ${Math.max(0.02, Math.abs(Math.cos(giro * Math.PI)))})`}>
      <rect x={-w / 2} y={-38} width={w} height={76} rx={38} fill={fondo} style={sombra(c.sombra, 4, 10)} />
      <Txt f="a" x={0} y={15} textAnchor="middle" fontSize={MIN_TXT} fill={tono === 'tenue' ? c.texto : '#fff'} peso={700}>{texto}</Txt>
    </g>
  );
};

/* Escudo de derechos. */
export const ESCUDO = 'M 0 -40 L 34 -28 V 4 C 34 28 16 42 0 50 C -16 42 -34 28 -34 4 V -28 Z';

/* Candado cerrado. */
export const Candado: React.FC<{ x: number; y: number; s: number; id: string }> = ({ x, y, s, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 -10 V -36 A 30 30 0 0 1 30 -36 V -10" fill="none" stroke={NARANJA} strokeWidth={12} />
    <rect x={-48} y={-14} width={96} height={80} rx={16} fill={`url(#${id}-marca)`} />
    <circle cx={0} cy={18} r={10} fill="#fff" />
    <rect x={-4} y={18} width={8} height={24} rx={3} fill="#fff" />
  </g>
);

/* Visto bueno (check). */
export const Visto: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={0} r={28} fill="#0f9f6e" />
    <path d="M -14 2 L -4 14 L 16 -10" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/* Cruz de rechazo / error. */
export const Cruz: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={0} r={28} fill="#c2263e" />
    <path d="M -12 -12 L 12 12 M 12 -12 L -12 12" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
  </g>
);

/* Reloj (plazo). */
export const Reloj: React.FC<{ x: number; y: number; s?: number; c: Tono; progreso?: number }> = ({ x, y, s = 1, c, progreso = 0.5 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={0} r={48} fill={c.panel2} />
    <circle cx={0} cy={0} r={44} fill="none" stroke={c.apagado} strokeWidth={8} />
    <path d={`M 0 0 L 0 -32`} stroke={NARANJA} strokeWidth={5} strokeLinecap="round" />
    <path d={`M 0 0 L ${Math.sin(progreso * Math.PI * 2) * 22} ${-Math.cos(progreso * Math.PI * 2) * 22}`} stroke={c.texto} strokeWidth={3} strokeLinecap="round" />
    <circle cx={0} cy={0} r={5} fill={NARANJA} />
  </g>
);

/* Sobre de correo. */
export const Sobre: React.FC<{ x: number; y: number; s?: number; c: Tono; id: string }> = ({ x, y, s = 1, c, id }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-52} y={-36} width={104} height={72} rx={10} fill={`url(#${id}-marca)`} />
    <path d="M -52 -36 L 0 8 L 52 -36" fill="none" stroke="#fff" strokeWidth={3} opacity={0.7} />
  </g>
);
