/**
 * Tipos de la clase «Influencia y persuasión» (datos puros, sin React: el generador
 * de la clase guiada los lee con esbuild para buscar cada frase en los subtítulos).
 */

/* Momento en que aparece, se atenúa o se retira un elemento: índice de la frase de la página. */
type Base = { a?: number; d?: number; hasta?: number; tenue?: number };

export type El = Base & (
  | { k: 'icono'; i: string; x: number; y: number; s?: number; etiqueta?: string; sub?: string; gris?: boolean; ancho?: number }
  | { k: 'chip'; t: string; x: number; y: number; w?: number; marca?: boolean; ancla?: 'middle' | 'start' }
  | { k: 'texto'; t: string; x: number; y: number; tam?: number; tono?: 'texto' | 'tenue' | 'marca'; ancho?: number; peso?: number; ancla?: 'middle' | 'start' | 'end' }
  | { k: 'barra'; x: number; y: number; w?: number; h?: number; valor: number; max?: number; etiqueta: string; sufijo?: string; texto?: string; gris?: boolean; ancho?: number }
  | { k: 'flecha'; x1: number; y1: number; x2: number; y2: number; curva?: number }
  | { k: 'persona'; x: number; y: number; s?: number; gris?: boolean; pelo?: string }
  | { k: 'tarjeta'; x: number; y: number; w: number; h: number; titulo: string; t?: string; marca?: boolean; i?: string; ancho?: number }
  | { k: 'numero'; x: number; y: number; valor: number; prefijo?: string; sufijo?: string; tam?: number; etiqueta?: string; ancho?: number }
  | { k: 'anillo'; x: number; y: number; r: number }
);

/* Lo que se lee a la derecha de la escena; aparece cuando el audio dice `frase`. */
export type Tarjeta = { rotulo: string; texto: string; frase: string; destacada?: boolean };

export type Pagina = {
  id: string;
  titulo: string;
  destaque: string;
  bajada: string;
  /** Primeras palabras del párrafo en el audio: ahí empieza la diapositiva. */
  inicio: string;
  /** Frases del audio que disparan cada marca de la escena, en orden. */
  frases: string[];
  els: El[];
  tarjetas: Tarjeta[];
  /** Pregunta de reflexión: cierra la escena cuando el audio dice `frase`. */
  pregunta: { frase: string; texto: string };
};

/* Encabezado de lección (lo dibuja App.tsx): solo se ubica en el audio. */
export type Encabezado = { id: string; inicio: string };
