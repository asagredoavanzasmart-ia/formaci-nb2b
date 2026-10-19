import React from 'react';

/**
 * Animación guiada por el audio ("modo video").
 *
 * Cada diapositiva con audio puede declarar una lista de marcas: en qué momento del
 * audio empieza cada paso. El reproductor las lee y publica el paso vigente; la
 * diapositiva reacciona a ese paso (resalta, atenúa o muestra elementos).
 */

/** t = segundos exactos (calibrados); f = fracción de la duración (estimación inicial). */
export type Cue = { step: string; t?: number; f?: number };

export type GuidedControl = { cues: Cue[]; onStep: (step: string | null) => void };

/** Lo provee App: marcas de la diapositiva activa y callback del paso vigente. */
export const GuidedControlContext = React.createContext<GuidedControl | null>(null);

/** Paso vigente (null = sin reproducción guiada). Lo leen las diapositivas. */
export const GuidedStepContext = React.createContext<string | null>(null);

export const useGuidedStep = () => React.useContext(GuidedStepContext);

/** Paso vigente para un instante dado. */
export function stepAt(cues: Cue[], currentTime: number, duration: number): string | null {
  let actual: string | null = null;
  for (const c of cues) {
    const when = c.t ?? (c.f ?? 0) * duration;
    if (currentTime >= when) actual = c.step;
  }
  return actual;
}
