import React from 'react';
import { Shell } from './slideKit';
import type { SlideProps } from './compensacion/kit';
import { Portada, CantidadCalidad, Magnitud, Intrinseca } from './compensacion/Dinero';
import { Segmentos, Topes, Ritmo, Umbral, Cuotas, Perdida } from './compensacion/Contrato';
import { Sorting, Torneos, EquipoIndividual } from './compensacion/Ecosistema';
import { Contingencia, Triada } from './compensacion/Conducta';
import { Metas, Rol, ModeladoConductual } from './compensacion/Metas';
import { Solidez, Leer, Diagnostico, TestBasico, TestAvanzado } from './compensacion/Critico';

/**
 * Clase "Pagar para vender mejor" (prefijo cc-): evidencia sobre compensación comercial.
 * Cada hallazgo lleva su sello de evidencia (metaanálisis, campo, laboratorio o teoría).
 */

const SLIDES: Record<string, (p: SlideProps) => React.ReactElement> = {
  'cc-slide-0': Portada,
  'cc-cantidad': CantidadCalidad,
  'cc-magnitud': Magnitud,
  'cc-intrinseca': Intrinseca,
  'cc-segmentos': Segmentos,
  'cc-topes': Topes,
  'cc-ritmo': Ritmo,
  'cc-umbral': Umbral,
  'cc-cuotas': Cuotas,
  'cc-perdida': Perdida,
  'cc-sorting': Sorting,
  'cc-torneos': Torneos,
  'cc-equipo': EquipoIndividual,
  'cc-contingencia': Contingencia,
  'cc-triada': Triada,
  'cc-metas': Metas,
  'cc-rol': Rol,
  'cc-bmt': ModeladoConductual,
  'cc-solidez': Solidez,
  'cc-leer': Leer,
  'cc-diagnostico': Diagnostico,
  'cc-test-basico': TestBasico,
  'cc-test-avanzado': TestAvanzado,
};

export default function ClaseCompensacion({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  const Component = SLIDES[slideId];
  if (!Component) {
    return (
      <Shell isDark={isDark} title="Pagar para" highlight="vender mejor" subtitle="Diapositiva no encontrada.">
        <div />
      </Shell>
    );
  }
  return <Component isDark={isDark} />;
}
