import React from 'react';
import { Shell, panelClass, textMuted, microLabel, Footer } from './slideKit';
import { notasRevOps } from '../data/notasRevOps';

type SlideProps = { slideId: string; isDark: boolean };

/**
 * Clase: "RevOps" — Revenue Operations.
 *
 * Estructura de módulos y lecciones. Cada lección renderiza su contenido desde notasRevOps.
 * Sin animaciones 3D complejas ni quizzes por ahora.
 */

function ClaseRevOps({ slideId, isDark }: SlideProps) {
  const nota = notasRevOps[slideId] || '';

  // Mapeo de slideId a metadatos de lección
  const leccionMetadata: Record<string, { titulo: string; modulo: string }> = {
    'ro-1-bienvenida': { titulo: 'Bienvenida a la Certificación', modulo: 'Fundamentos' },
    'ro-2-introduccion': { titulo: 'Introducción a RevOps', modulo: 'Fundamentos' },
    'ro-3-embudo': { titulo: 'Aplicando RevOps al Embudo de Ventas', modulo: 'Estrategia y Operaciones' },
    'ro-4-sla': { titulo: 'Responsabilidad con SLA', modulo: 'Estrategia y Operaciones' },
    'ro-5-proceso': { titulo: 'Mapear un Proceso de Ventas', modulo: 'Estrategia y Operaciones' },
    'ro-6-sistemas': { titulo: 'Gestión de Sistemas para RevOps', modulo: 'Estrategia y Operaciones' },
    'ro-7-estructura': { titulo: 'Estructurando tu Equipo de RevOps', modulo: 'Construcción de Equipo' },
    'ro-8-contratacion': { titulo: 'Contratación de Miembros del Equipo', modulo: 'Construcción de Equipo' },
    'ro-9-evaluacion': { titulo: 'Evaluando e Iterando tu Estrategia', modulo: 'Evaluación y Mejora' },
  };

  const meta = leccionMetadata[slideId];
  const titulo = meta?.titulo || 'RevOps';
  const modulo = meta?.modulo || '';

  const renderContenido = () => {
    if (!nota) {
      return (
        <div className={`p-6 rounded-2xl ${panelClass(isDark)}`}>
          <p className={textMuted(isDark)}>Contenido en construcción.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div dangerouslySetInnerHTML={{ __html: nota }} className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`} style={{
          color: isDark ? '#e5e7eb' : '#1f2937',
        }} />
      </div>
    );
  };

  return (
    <Shell
      isDark={isDark}
      title={titulo}
      highlight={modulo ? `${modulo} de RevOps` : 'Revenue Operations'}
      subtitle="Alinea ventas, marketing y operaciones en torno al crecimiento de ingresos."
    >
      <div className="h-full flex flex-col min-h-0 space-y-6">
        <div className="flex-1 min-h-0 overflow-y-auto pr-4">
          {renderContenido()}
        </div>
        <Footer isDark={isDark} />
      </div>
    </Shell>
  );
}

export default ClaseRevOps;
