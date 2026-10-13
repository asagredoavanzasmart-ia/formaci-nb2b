import React from 'react';
import { Shell } from './slideKit';
import {
  Portada, Definicion, Evolucion,
  Paradoja, Madurez, Etapas, Crm,
  Onboarding, Metodologia, Errores,
} from './salesenablement/Fundamentos';
import {
  Persona, Producto, Contenido,
  Herramientas, Microcontenido, Objeciones,
  Icp, Especializacion, Negociacion,
} from './salesenablement/Ejecucion';
import {
  Referidos, Renovacion, Talento,
  Gerente, Posicion, Cliente,
  TestBasico, TestAvanzado,
} from './salesenablement/Organizacion';
import { SlideProps } from './revops/kit';

const SLIDES: Record<string, React.ComponentType<SlideProps>> = {
  'se-1-portada':        Portada,
  'se-2-definicion':     Definicion,
  'se-3-evolucion':      Evolucion,
  'se-4-paradoja':       Paradoja,
  'se-5-madurez':        Madurez,
  'se-6-etapas':         Etapas,
  'se-7-crm':            Crm,
  'se-8-onboarding':     Onboarding,
  'se-9-metodologia':    Metodologia,
  'se-10-errores':       Errores,
  'se-11-persona':       Persona,
  'se-12-producto':      Producto,
  'se-13-contenido':     Contenido,
  'se-14-herramientas':  Herramientas,
  'se-15-microcontenido':Microcontenido,
  'se-16-objeciones':    Objeciones,
  'se-17-icp':           Icp,
  'se-18-especializacion':Especializacion,
  'se-19-negociacion':   Negociacion,
  'se-20-referidos':     Referidos,
  'se-21-renovacion':    Renovacion,
  'se-22-talento':       Talento,
  'se-23-gerente':       Gerente,
  'se-24-posicion':      Posicion,
  'se-25-cliente':       Cliente,
  'se-test-basico':      TestBasico,
  'se-test-avanzado':    TestAvanzado,
};

export default function ClaseSalesEnablement({
  slideId,
  isDark,
}: {
  slideId: string;
  isDark: boolean;
}) {
  const Component = SLIDES[slideId];
  if (!Component)
    return (
      <Shell isDark={isDark} title="Sales Enablement" highlight="ecosistema de ventas" subtitle="">
        <div />
      </Shell>
    );
  return <Component isDark={isDark} />;
}
