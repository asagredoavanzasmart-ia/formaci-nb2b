import React from 'react';
import { Shell } from './slideKit';
import type { SlideProps } from './compensacion/kit';
import { Portada, CantidadCalidad, Magnitud, Intrinseca, Efectivo } from './compensacion/Dinero';
import { Segmentos, Topes, Ritmo, Umbral, Simplicidad, PayMix, Cuotas, Perdida } from './compensacion/Contrato';
import { Sorting, Torneos, EquipoIndividual } from './compensacion/Ecosistema';
import { Contingencia, RDI, Spiffs, Triada } from './compensacion/Conducta';
import { Metas, Rol, ModeladoConductual } from './compensacion/Metas';
import { Semaforo, Cuadran, Diagnostico, TestBasico, TestAvanzado } from './compensacion/Critico';

/**
 * Clase "Pagar para vender mejor" (prefijo cc-): evidencia sobre compensación comercial.
 * Fuente: informe «Arquitectura Conductual y Econométrica de la Compensación Comercial».
 * Cada cifra se contrastó con las fuentes originales; donde no se pudo confirmar, la
 * diapositiva lo dice (sello «Cifra sin verificar» o recuadro «Cifra sin respaldo»).
 */

const SLIDES: Record<string, (p: SlideProps) => React.ReactElement> = {
  'cc-slide-0': Portada,
  'cc-cantidad': CantidadCalidad,
  'cc-magnitud': Magnitud,
  'cc-intrinseca': Intrinseca,
  'cc-efectivo': Efectivo,
  'cc-segmentos': Segmentos,
  'cc-topes': Topes,
  'cc-ritmo': Ritmo,
  'cc-umbral': Umbral,
  'cc-simplicidad': Simplicidad,
  'cc-paymix': PayMix,
  'cc-cuotas': Cuotas,
  'cc-perdida': Perdida,
  'cc-sorting': Sorting,
  'cc-torneos': Torneos,
  'cc-equipo': EquipoIndividual,
  'cc-contingencia': Contingencia,
  'cc-rdi': RDI,
  'cc-spiffs': Spiffs,
  'cc-triada': Triada,
  'cc-metas': Metas,
  'cc-rol': Rol,
  'cc-bmt': ModeladoConductual,
  'cc-semaforo': Semaforo,
  'cc-cuadran': Cuadran,
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
