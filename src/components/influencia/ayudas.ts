import type { El } from './tipos';

/* Atajos para describir las escenas: posición en un lienzo de 1200 × 860 y marca de entrada `a`. */
type O = Partial<Record<string, unknown>>;

export const ic = (i: string, x: number, y: number, a?: number, etiqueta?: string, o: O = {}): El => ({ k: 'icono', i, x, y, a, etiqueta, ...o }) as El;
export const chip = (t: string, x: number, y: number, a?: number, o: O = {}): El => ({ k: 'chip', t, x, y, a, ...o }) as El;
export const tx = (t: string, x: number, y: number, a?: number, o: O = {}): El => ({ k: 'texto', t, x, y, a, ...o }) as El;
export const barra = (x: number, y: number, valor: number, etiqueta: string, a?: number, o: O = {}): El => ({ k: 'barra', x, y, valor, etiqueta, a, ...o }) as El;
export const fl = (x1: number, y1: number, x2: number, y2: number, a?: number, o: O = {}): El => ({ k: 'flecha', x1, y1, x2, y2, a, ...o }) as El;
export const tj = (x: number, y: number, w: number, h: number, titulo: string, t: string | undefined, a?: number, o: O = {}): El => ({ k: 'tarjeta', x, y, w, h, titulo, t, a, ...o }) as El;
export const num = (x: number, y: number, valor: number, a?: number, o: O = {}): El => ({ k: 'numero', x, y, valor, a, ...o }) as El;
export const pers = (x: number, y: number, a?: number, o: O = {}): El => ({ k: 'persona', x, y, a, ...o }) as El;

export const cubo = (x: number, y: number, s: number, h: number, a?: number, o: O = {}): El => ({ k: 'cubo', x, y, s, h, a, ...o }) as El;
export const viaj = (pts: [number, number][], en: number[], o: O = {}): El => ({ k: 'viajero', pts, en, a: en[0], ...o }) as El;
export const forma = (trazo: string, cx: number, cy: number, a?: number, o: O = {}): El => ({ k: 'forma', trazo, cx, cy, a, ...o }) as El;
export const circ = (x: number, y: number, r: number, a?: number, o: O = {}): El => ({ k: 'circulo', x, y, r, a, ...o }) as El;

/* Posiciones x de n elementos repartidos en el ancho útil del lienzo. */
export const fila = (n: number, desde = 150, hasta = 1050) => Array.from({ length: n }, (_, k) => (n === 1 ? (desde + hasta) / 2 : desde + (k * (hasta - desde)) / (n - 1)));
