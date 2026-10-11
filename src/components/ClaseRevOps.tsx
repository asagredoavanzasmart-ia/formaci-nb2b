import React from 'react';
import { Shell } from './slideKit';
import type { SlideProps } from './revops/kit';
import { Portada, Definicion, Ruta, Escala, Diagnostico, Empezar, Velocidad, Casos, Flywheel, Fuerza, Friccion, FriccionUtil, MapaFlywheel } from './revops/Fundamentos';
import { PorQueSLA, CalculadoraSLA, ValorLead, Contacto, RamaJudicial, Velocidades, Paradoja, Comprador, Filtros, CriteriosSalida, Playbook, Estados } from './revops/Alineacion';
import { ProcesoPrimero, Gobierno, Indicadores, Stack, Lenguaje, CostoMalaCalidad, InformeA3, PreWiring, Monroe, Objeciones, Retroceso } from './revops/Sistemas';
import { Silos, Capas, Necesidad, Cuadrante, Entrevista, Ciclo, Metas, Diario } from './revops/Equipo';

/**
 * Clase "RevOps" (prefijo ro-): diez lecciones agrupadas como módulos colapsables
 * en el índice. Fuentes: workbook y transcripciones del curso de Revenue Operations
 * de HubSpot Academy, con las cifras recalculadas y verificadas.
 */

const SLIDES: Record<string, (p: SlideProps) => React.ReactElement> = {
  'ro-1-portada': Portada,
  'ro-1-definicion': Definicion,
  'ro-1-ruta': Ruta,
  'ro-2-escala': Escala,
  'ro-2-diagnostico': Diagnostico,
  'ro-2-empezar': Empezar,
  'ro-2-velocidad': Velocidad,
  'ro-2-casos': Casos,
  'ro-3-flywheel': Flywheel,
  'ro-3-fuerza': Fuerza,
  'ro-3-friccion': Friccion,
  'ro-3-friccion-util': FriccionUtil,
  'ro-3-mapa': MapaFlywheel,
  'ro-4-porque': PorQueSLA,
  'ro-4-calculadora': CalculadoraSLA,
  'ro-4-valor': ValorLead,
  'ro-4-contacto': Contacto,
  'ro-4-judicial': RamaJudicial,
  'ro-4-velocidades': Velocidades,
  'ro-5-paradoja': Paradoja,
  'ro-5-comprador': Comprador,
  'ro-5-filtros': Filtros,
  'ro-5-salida': CriteriosSalida,
  'ro-5-playbook': Playbook,
  'ro-5-estados': Estados,
  'ro-6-proceso': ProcesoPrimero,
  'ro-6-gobierno': Gobierno,
  'ro-6-indicadores': Indicadores,
  'ro-6-stack': Stack,
  'ro-7-lenguaje': Lenguaje,
  'ro-7-copq': CostoMalaCalidad,
  'ro-7-a3': InformeA3,
  'ro-7-prewiring': PreWiring,
  'ro-7-monroe': Monroe,
  'ro-7-objeciones': Objeciones,
  'ro-7-retroceso': Retroceso,
  'ro-8-silos': Silos,
  'ro-8-capas': Capas,
  'ro-9-necesidad': Necesidad,
  'ro-9-cuadrante': Cuadrante,
  'ro-9-entrevista': Entrevista,
  'ro-10-ciclo': Ciclo,
  'ro-10-metas': Metas,
  'ro-10-diario': Diario,
};

export default function ClaseRevOps({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  const Component = SLIDES[slideId];
  if (!Component) {
    return (
      <Shell isDark={isDark} title="RevOps" highlight="Revenue Operations" subtitle="Diapositiva no encontrada.">
        <div />
      </Shell>
    );
  }
  return <Component isDark={isDark} />;
}
