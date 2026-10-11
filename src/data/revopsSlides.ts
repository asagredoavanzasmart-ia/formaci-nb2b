/**
 * Estructura de diapositivas para la clase RevOps.
 * Soporta módulos anidados con lecciones dentro.
 */

export interface SlideMeta {
  id: string;
  title: string;
  level: number;
}

export interface ModuloRevOps {
  id: string;
  titulo: string;
  lecciones: { id: string; titulo: string }[];
}

export const revopsModulos: readonly ModuloRevOps[] = [
  {
    id: 'modulo-1-fundamentos',
    titulo: 'Módulo 1: Fundamentos de RevOps',
    lecciones: [
      { id: 'ro-1-bienvenida', titulo: 'Lección 1: Bienvenida a la Certificación' },
      { id: 'ro-2-introduccion', titulo: 'Lección 2: Introducción a RevOps' },
    ],
  },
  {
    id: 'modulo-2-estrategia',
    titulo: 'Módulo 2: Estrategia y Operaciones',
    lecciones: [
      { id: 'ro-3-embudo', titulo: 'Lección 3: Aplicando RevOps al Embudo de Ventas' },
      { id: 'ro-4-sla', titulo: 'Lección 4: Responsabilidad con SLA' },
      { id: 'ro-5-proceso', titulo: 'Lección 5: Mapear un Proceso de Ventas' },
      { id: 'ro-6-sistemas', titulo: 'Lección 6: Gestión de Sistemas para RevOps' },
    ],
  },
  {
    id: 'modulo-3-equipo',
    titulo: 'Módulo 3: Construcción y Gestión de Equipo',
    lecciones: [
      { id: 'ro-7-estructura', titulo: 'Lección 7: Estructurando tu Equipo de RevOps' },
      { id: 'ro-8-contratacion', titulo: 'Lección 8: Contratación de Miembros del Equipo' },
    ],
  },
  {
    id: 'modulo-4-evaluacion',
    titulo: 'Módulo 4: Evaluación y Mejora Continua',
    lecciones: [
      { id: 'ro-9-evaluacion', titulo: 'Lección 9-10: Evaluando e Iterando tu Estrategia' },
    ],
  },
];

// Aplanamiento de todas las diapositivas para compatibilidad con el sistema existente
export const revopsSlides: SlideMeta[] = [
  { id: 'ro-inicio', title: 'RevOps', level: 1 },
  ...revopsModulos.flatMap((mod) => [
    { id: mod.id, title: mod.titulo, level: 1 },
    ...mod.lecciones.map((lec) => ({ id: lec.id, title: lec.titulo, level: 2 })),
  ]),
];
