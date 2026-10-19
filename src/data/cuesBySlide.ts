import type { Cue } from '../lib/guided';

/**
 * Marcas de la animación guiada por diapositiva (id → pasos con su instante en el audio).
 * Las fracciones (`f`) son una estimación a partir del largo del guión; para ajustarlas
 * a la voz real abre la app con `?calibrar` y marca cada paso mientras escuchas: el panel
 * entrega la lista en segundos exactos (`t`) para pegarla aquí.
 */
export const cuesBySlide: Record<string, Cue[]> = {
  'ro-1-portada': [
    { step: 'inicio', f: 0.0 },
    { step: 'marketing', f: 0.06 },
    { step: 'ventas', f: 0.086 },
    { step: 'servicio', f: 0.106 },
    { step: 'datos', f: 0.142 },
    { step: 'definicion', f: 0.301 },
    { step: 'porque', f: 0.598 },
    { step: 'pregunta', f: 0.884 },
  ],
};
