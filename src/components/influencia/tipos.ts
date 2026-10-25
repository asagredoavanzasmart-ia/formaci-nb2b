/**
 * Tipos de la clase «Influencia y persuasión» (datos puros, sin React: el generador
 * de la clase guiada los lee con esbuild para buscar cada frase en los subtítulos).
 */

/* Momento en que aparece, se atenúa o se retira un elemento: índice de la frase de la página.
   `foco`: frases durante las que el elemento se destaca (hasta la frase siguiente). */
type Base = { a?: number; d?: number; hasta?: number; tenue?: number; foco?: number[]; flota?: number };

export type Tono = 'marca' | 'durazno' | 'gris' | 'pizarra' | 'naranja' | 'rosa';

export type El = Base & (
  | { k: 'icono'; i: string; x: number; y: number; s?: number; etiqueta?: string; sub?: string; gris?: boolean; ancho?: number }
  | { k: 'chip'; t: string; x: number; y: number; w?: number; marca?: boolean; ancla?: 'middle' | 'start' }
  | { k: 'texto'; t: string; x: number; y: number; tam?: number; tono?: 'texto' | 'tenue' | 'marca'; ancho?: number; peso?: number; ancla?: 'middle' | 'start' | 'end'; escribe?: boolean }
  /* Burbuja de diálogo con el texto escribiéndose; (x, y) es su esquina superior izquierda. */
  | { k: 'burbuja'; t: string; x: number; y: number; w: number; quien?: 'vendedor' | 'cliente'; cola?: 'izq' | 'der'; tam?: number }
  /* Balanza con pivote en (x, y): en cada frase `en` cambia el peso de cada lado y el brazo se inclina con rebote. */
  | { k: 'balanza'; x: number; y: number; largo?: number; estados: { en: number; izq: number; der: number }[]; izq: string; der: string; derValor?: string }
  | { k: 'sello'; t: string; x: number; y: number; tono?: Tono; rot?: number; tam?: number }
  | { k: 'tachar'; x1: number; x2: number; y: number }
  /* Línea que se dibuja sola de punto a punto; con `area` rellena hasta `base`. */
  | { k: 'curva'; pts: [number, number][]; tono?: Tono; grosor?: number; dur?: number; area?: boolean; base?: number; punto?: boolean }
  | { k: 'flujo'; x1: number; y1: number; x2: number; y2: number; n?: number; curva?: number; tono?: Tono }
  | { k: 'estallido'; x: number; y: number; r?: number }
  | { k: 'barra'; x: number; y: number; w?: number; h?: number; valor: number; max?: number; etiqueta: string; sufijo?: string; texto?: string; gris?: boolean; ancho?: number }
  | { k: 'flecha'; x1: number; y1: number; x2: number; y2: number; curva?: number }
  | { k: 'persona'; x: number; y: number; s?: number; gris?: boolean; pelo?: string }
  | { k: 'tarjeta'; x: number; y: number; w: number; h: number; titulo: string; t?: string; marca?: boolean; i?: string; ancho?: number }
  | { k: 'numero'; x: number; y: number; valor: number; prefijo?: string; sufijo?: string; tam?: number; etiqueta?: string; ancho?: number }
  | { k: 'anillo'; x: number; y: number; r: number }
  /* Cubo isométrico apoyado en (x, y): `s` es el semiancho. `cae` lo deja caer; `crece` sube su altura como una barra. */
  | { k: 'cubo'; x: number; y: number; s: number; h: number; tono?: Tono; letra?: string; valor?: string; etiqueta?: string; ancho?: number; cae?: boolean; crece?: boolean; letraLado?: boolean; sinSombra?: boolean }
  /* Esfera que viaja: llega a pts[i] cuando suena la frase en[i] (más dd[i] segundos). */
  | { k: 'viajero'; pts: [number, number][]; en: number[]; dd?: number[]; etiqueta?: string; r?: number }
  /* Forma libre (trazo SVG) con texto opcional en (lx, ly); (cx, cy) es el centro de su entrada. */
  | { k: 'forma'; trazo: string; cx: number; cy: number; tono?: Tono; opacidad?: number; etiqueta?: string; lx?: number; ly?: number; tam?: number }
  | { k: 'circulo'; x: number; y: number; r: number; tono?: Tono; opacidad?: number }
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

/* Movimiento de cámara: con la frase `a` la escena se centra en (x, y) con zoom `z` (1 = vista completa). */
export type Camara = { a: number; x: number; y: number; z: number; d?: number };

/* Marca de la clase guiada sobre una diapositiva ya hecha: qué aparece, qué se resalta y qué se pulsa. */
export type Marca = { frase: string; mostrar?: string[]; foco?: string | null; clicEn?: string };

/* Diapositiva de una clase existente animada por audio: su escena Remotion (si la tiene) y sus marcas. */
export type Guiada = {
  id: string;
  inicio: string;
  marcas?: Marca[];
  escena?: { frases: string[]; els: El[]; pregunta?: { frase: string; texto: string }; ancho: number; alto: number; camara?: Camara[] };
};
