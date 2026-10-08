/**
 * Catálogo del repositorio de clases.
 * Capa de DATOS pura: no sabe cómo se dibuja (la UI decide el ícono según `iconKey`).
 * Para sumar una nueva temática, solo se agrega un objeto a `catalogoClases`.
 */

export type ClaseIconKey = 'ventas' | 'marketing' | 'liderazgo' | 'general';

export interface ClaseCatalogo {
  /** Identificador único. Debe coincidir con la clase que App.tsx sabe abrir. */
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** Etiqueta de temática (ej: "Ventas", "Marketing"). No es obligatoriamente B2B. */
  category: string;
  iconKey: ClaseIconKey;
}

export const catalogoClases: readonly ClaseCatalogo[] = [
  {
    id: 'ventas-b2b',
    title: 'Ventas B2B de Alto Impacto',
    subtitle: 'Formación estratégica',
    description:
      'Roles de compra, ICP + oferta, banderas rojas, modos de respuesta y proceso comercial completo.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'metodologias-venta',
    title: 'La Ciencia de Vender',
    subtitle: 'Ventas avanzado',
    description:
      'Metodologías, autores y evidencia empírica: la venta como disciplina académica, rigurosa, replicable y revisada por pares (de Dubinsky a Kahneman).',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'arquitectura-equipos',
    title: 'Diseño y Arquitectura de Equipos de Ventas',
    subtitle: 'Aplanamiento, habilitación y agilidad',
    description:
      'Roles comerciales (BDR→AM), aplanamiento y tramo de control (Graicunas), Sales Pods y AI Pods, habilitación con IA, playbooks, stack y agilidad (Scrum).',
    category: 'Liderazgo',
    iconKey: 'liderazgo',
  },
  {
    id: 'meddpicc',
    title: 'MEDDPICC: calificar con rigor',
    subtitle: 'Calificación de oportunidades',
    description:
      'Las ocho letras de MEDDPICC en la práctica: métricas, comprador económico, criterios, procesos, dolor, Champion y competencia; calificar en cada etapa, decir «no» y pronosticar con evidencia.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'spin-selling',
    title: 'SPIN Selling: preguntar para vender',
    subtitle: 'Neil Rackham · venta consultiva',
    description:
      'La investigación de Huthwaite (35.000 llamadas): avances, necesidades implícitas y explícitas, las preguntas S-P-I-N y cómo planificarlas, apertura, beneficios vs ventajas, prevención de objeciones, la evidencia contra el cierre y cómo evaluar si un método funciona (Motorola, efecto Hawthorne).',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'kahneman',
    title: 'Pensar rápido, pensar despacio',
    subtitle: 'Daniel Kahneman · sesgos y decisiones',
    description:
      'Sistema 1 y Sistema 2, el controlador perezoso, priming, facilidad cognitiva, heurísticas de representatividad, disponibilidad y afecto, efecto halo y WYSIATI; más qué resistió y qué no a la crisis de replicación.',
    category: 'General',
    iconKey: 'general',
  },
  {
    id: 'challenger',
    title: 'El Vendedor Desafiante (Challenger)',
    subtitle: 'Dixon y Adamson · venta compleja B2B',
    description:
      'Los cinco perfiles de vendedor y por qué el Creador de Relaciones colapsa en la venta compleja; los tres pilares, la enseñanza comercial, la coreografía de seis pasos, SAFE-BOLD y cómo tomar el control del precio. Incluye la crítica académica al estudio.',
    category: 'Ventas',
    iconKey: 'ventas',
  },
  {
    id: 'trampas-deseo',
    title: 'Las Trampas del Deseo',
    subtitle: 'Dan Ariely · economía conductual',
    description:
      'Señuelos, anclas, precio cero, normas sociales y de mercado, estados fríos y calientes, autocontrol, propiedad y honestidad. Cada experimento con su estado actual de evidencia, incluida la retractación de 2026 del estudio de fechas límite del MIT.',
    category: 'Ventas',
    iconKey: 'marketing',
  },
];
