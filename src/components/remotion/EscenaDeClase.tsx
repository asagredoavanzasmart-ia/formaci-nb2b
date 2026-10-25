import React from 'react';
import { EscenaSincronizada } from './EscenaSincronizada';
import { EscenaIP } from '../influencia/motor';
import type { Guiada } from '../influencia/tipos';
import type { GuiadoClase } from '../../lib/guiado';

/**
 * Crea el envoltorio que, mientras suena la clase guiada, reemplaza el gráfico de una diapositiva
 * por su escena de Remotion (datos de `escenas`); fuera de ella se muestra el gráfico original.
 */
export function crearEscena(escenas: Record<string, NonNullable<Guiada['escena']>>, guiado: GuiadoClase, marcas: Record<string, number[]>, finAudio: number) {
  return function Escena({ id, isDark, children }: { id: string; isDark: boolean; children: React.ReactNode }) {
    const e = escenas[id];
    const i = guiado.slides.findIndex((s) => s.id === id);
    if (!e || i < 0) return <>{children}</>;
    const inicio = guiado.slides[i].t;
    const fin = guiado.slides[i + 1]?.t ?? finAudio;
    const props = { isDark, els: e.els, marcas: marcas[id] ?? [], pregunta: e.pregunta?.texto, ancho: e.ancho, alto: e.alto, camara: e.camara };
    return <EscenaSincronizada componente={EscenaIP} props={props} inicio={inicio} fin={fin} ancho={e.ancho} alto={e.alto} respaldo={children} />;
  };
}
