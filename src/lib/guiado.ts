/**
 * Clase guiada por audio: un audio completo, el instante en que empieza cada diapositiva
 * y, por diapositiva, marcas que muestran, resaltan o pulsan elementos de la pantalla.
 * Los elementos se identifican con el atributo `data-g` en el JSX de la diapositiva.
 */

export type GuiadoCue = {
  /** Segundos desde el inicio del audio. */
  t: number;
  /** Elementos (`data-g`) que aparecen en este instante y ya no se ocultan. */
  mostrar?: string[];
  /** Elemento que se resalta y al que apunta la flecha; `null` apaga el resaltado. */
  foco?: string | null;
  /** Simula un clic sobre el elemento enfocado (pestañas, botones). */
  clic?: boolean;
  /** Pestaña o botón que se pulsa en este instante (si es distinto del elemento enfocado). */
  clicEn?: string;
};

export type GuiadoClase = {
  audio: string;
  /** Tramos (segundos) que se saltan al reproducir. */
  saltar?: { a: number; b: number }[];
  /** Tramos (segundos) en que el volumen baja a cero sin detener el audio. */
  silenciar?: { a: number; b: number }[];
  slides: { id: string; t: number }[];
  cues: Record<string, GuiadoCue[]>;
};
