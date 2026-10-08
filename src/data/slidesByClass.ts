/**
 * Guiones de diapositivas por clase (capa de datos pura).
 *
 * Se extrae de App.tsx para que tanto la presentación principal como la ventana
 * de "Modo presentador" compartan exactamente el mismo orden y títulos.
 *
 * Los encabezados (level 1) se dibujan de forma genérica; las diapositivas de
 * nivel 2 las resuelve el componente de cada clase.
 */

export interface SlideMeta {
  id: string;
  title: string;
  level: number;
}

// Clase "Ventas B2B de Alto Impacto".
export const initialSlides: SlideMeta[] = [
  { id: 'slide-0', title: 'Inicio', level: 2 },
  { id: 'slide-simple-vs-compleja', title: 'Evolución de la Venta', level: 2 },
  { id: 'slide-intro', title: 'Introducción', level: 2 },
  { id: 'slide-estrategia', title: 'Estrategia vs Táctica', level: 2 },
  { id: 'slide-comp-vendedores', title: 'Comparación Vendedores', level: 2 },
  { id: 'slide-pilares', title: 'Pilares de la Estrategia', level: 2 },

  { id: 'header-roles', title: 'I. Roles de Influencia', level: 1 },
  { id: 'slide-roles', title: 'Roles de Compra', level: 2 },
  { id: 'slide-ident-comprador', title: 'Identificar Comprador', level: 2 },
  { id: 'slide-gest-tecnico', title: 'Gestionar Comprador técnico', level: 2 },
  { id: 'slide-win-perfiles', title: 'Win-Results por Perfil', level: 2 },
  { id: 'slide-win-preguntas', title: 'Win-Results (Preguntas)', level: 2 },

  { id: 'header-icp', title: 'II. ICP + Oferta', level: 1 },
  { id: 'slide-aterrizaje', title: 'Aterrizaje y Expansión', level: 2 },
  { id: 'slide-icp', title: 'Perfil del Cliente Ideal (ICP)', level: 2 },
  { id: 'slide-icp-tool', title: 'Herramienta ICP', level: 2 },
  { id: 'slide-offer-intro', title: 'Creación de la Oferta', level: 2 },
  { id: 'slide-offer-tool', title: 'Herramienta de Oferta', level: 2 },

  { id: 'header-redflags', title: 'III. Red Flags y Problemas', level: 1 },
  { id: 'slide-banderas', title: 'Banderas Rojas', level: 2 },
  { id: 'slide-superar', title: 'Superar Problemas', level: 2 },

  { id: 'header-modos', title: 'IV. Modos de Respuesta', level: 1 },
  { id: 'slide-receptibilidad', title: 'Nivel de Receptividad', level: 2 },
  { id: 'slide-modos', title: 'Modos de Respuesta', level: 2 },

  { id: 'header-proceso', title: 'V. Proceso comercial', level: 1 },
  { id: 'slide-ciclo', title: 'Ciclo Normal de Ventas', level: 2 },
  { id: 'slide-flow-constructor', title: 'Creador de flujos', level: 2 },
  { id: 'slide-crm', title: 'Pipeline CRM', level: 2 },
  { id: 'slide-constructor-crm', title: 'Constructor de Procesos', level: 2 },
  { id: 'slide-lista-estrategica', title: 'Lista de Verificación Estratégica', level: 2 },
];

// Clase "La Ciencia de Vender" (ventas avanzado).
export const metodologiasSlides: SlideMeta[] = [
  { id: 'mv-slide-0', title: 'Inicio', level: 2 },
  { id: 'mv-arte-ciencia', title: '¿Arte o Ciencia?', level: 2 },
  { id: 'mv-que-es-ciencia', title: 'Qué hace científica una disciplina', level: 2 },
  { id: 'mv-academia-consultoras', title: 'Academia vs Consultoras', level: 2 },

  { id: 'mv-header-evolucion', title: 'I. Evolución Académica', level: 1 },
  { id: 'mv-timeline', title: 'Línea de Tiempo Académica', level: 2 },
  { id: 'mv-autores', title: 'Autores y Evidencia', level: 2 },

  { id: 'mv-header-metodologias', title: 'II. Metodologías Comerciales', level: 1 },
  { id: 'mv-metodologias', title: 'Las 5 Metodologías', level: 2 },
  { id: 'mv-spin-challenger', title: 'El Escrutinio Académico', level: 2 },

  { id: 'mv-header-psicologia', title: 'III. Psicología de la Decisión', level: 1 },
  { id: 'mv-kahneman', title: 'Kahneman y la Decisión', level: 2 },

  { id: 'mv-header-cualificacion', title: 'IV. Cualificación con Rigor', level: 1 },
  { id: 'mv-bant-meddpicc', title: 'BANT vs MEDDPICC', level: 2 },

  { id: 'mv-cierre', title: 'Síntesis', level: 2 },
];

// Clase "Diseño y Arquitectura de Equipos de Ventas" (prefijo de id: eq-).
export const equiposSlides: SlideMeta[] = [
  { id: 'eq-slide-0', title: 'Inicio', level: 2 },
  { id: 'eq-diagnostico', title: 'La Crisis de la Ejecución', level: 2 },
  { id: 'eq-inbound-outbound', title: 'Los Dos Motores de Adquisición', level: 2 },

  { id: 'eq-header-roles', title: 'I. La Cadena de Roles', level: 1 },
  { id: 'eq-roles', title: 'El Equipo Completo', level: 2 },
  { id: 'eq-traspasos', title: 'Los Traspasos entre Roles', level: 2 },
  { id: 'eq-pipeline', title: 'La Línea de Ensamblaje', level: 2 },

  { id: 'eq-header-aplanar', title: 'II. Aplanar sin Romper', level: 1 },
  { id: 'eq-piramide', title: 'La Pirámide Rota', level: 2 },
  { id: 'eq-delayering', title: 'Mecánico vs Orgánico', level: 2 },
  { id: 'eq-graicunas', title: 'La Matemática del Caos', level: 2 },
  { id: 'eq-pods', title: 'Sales Pods y AI Pods', level: 2 },

  { id: 'eq-header-habilitacion', title: 'III. Habilitación y Tecnología', level: 1 },
  { id: 'eq-ramp', title: 'La Crisis del Ramp Time', level: 2 },
  { id: 'eq-enablement', title: 'Habilitación ≠ Capacitación', level: 2 },
  { id: 'eq-ia-roleplay', title: 'Práctica Simulada con IA', level: 2 },
  { id: 'eq-silent-manager', title: 'El Gerente Silencioso', level: 2 },
  { id: 'eq-stack', title: 'Orquestación Tecnológica', level: 2 },

  { id: 'eq-header-agilidad', title: 'IV. Agilidad y Escala', level: 1 },
  { id: 'eq-agile', title: 'Rituales de Autogestión', level: 2 },
  { id: 'eq-madurez', title: 'Mapa de Ruta Estructural', level: 2 },

  { id: 'eq-cierre', title: 'Síntesis', level: 2 },

  { id: 'eq-header-test', title: 'V. Evalúa lo Aprendido', level: 1 },
  { id: 'eq-test-basico', title: 'Test 1 · Principiante', level: 2 },
  { id: 'eq-test-avanzado', title: 'Test 2 · Avanzado', level: 2 },
];

// Clase "MEDDPICC: calificar con rigor" (prefijo de id: md-).
export const meddpiccSlides: SlideMeta[] = [
  { id: 'md-slide-0', title: 'Inicio', level: 2 },
  { id: 'md-abc-abq', title: 'De Cerrar a Calificar', level: 2 },
  { id: 'md-origen', title: 'Un Origen Práctico', level: 2 },
  { id: 'md-que-es', title: 'El Mapa y el GPS', level: 2 },

  { id: 'md-header-letras', title: 'I. Las Ocho Letras', level: 1 },
  { id: 'md-mapa', title: 'Mapa de MEDDPICC', level: 2 },
  { id: 'md-metrics', title: 'Metrics', level: 2 },
  { id: 'md-eb', title: 'Economic Buyer', level: 2 },
  { id: 'md-dc', title: 'Decision Criteria', level: 2 },
  { id: 'md-dp', title: 'Decision y Paper Process', level: 2 },
  { id: 'md-pain', title: 'El Dolor', level: 2 },
  { id: 'md-champion', title: 'Champion vs Coach', level: 2 },
  { id: 'md-competition', title: 'Competition y Control', level: 2 },

  { id: 'md-header-practica', title: 'II. En la Práctica', level: 1 },
  { id: 'md-porques', title: 'Los Tres Porqués', level: 2 },
  { id: 'md-etapas', title: 'Calificar en Cada Etapa', level: 2 },
  { id: 'md-decir-no', title: 'Decir No', level: 2 },
  { id: 'md-bant', title: 'MEDDPICC vs BANT', level: 2 },
  { id: 'md-forecast', title: 'Pronóstico con Evidencia', level: 2 },

  { id: 'md-header-critico', title: 'III. Pensamiento Crítico', level: 1 },
  { id: 'md-critico', title: '¿Qué Respaldo Tienen?', level: 2 },

  { id: 'md-cierre', title: 'Síntesis', level: 2 },
];

export const spinSlides: SlideMeta[] = [
  { id: 'sp-slide-0', title: 'Inicio', level: 2 },
  { id: 'sp-investigacion', title: 'Una Investigación', level: 2 },
  { id: 'sp-no-confies', title: 'Observa, No Preguntes', level: 2 },
  { id: 'sp-grande-pequena', title: 'Venta Pequeña vs Grande', level: 2 },
  { id: 'sp-avances', title: 'Avances vs Continuaciones', level: 2 },

  { id: 'sp-header-preguntas', title: 'I. Las Preguntas SPIN', level: 1 },
  { id: 'sp-preguntas', title: 'Preguntar Persuade', level: 2 },
  { id: 'sp-necesidades', title: 'Implícitas y Explícitas', level: 2 },
  { id: 'sp-ecuacion', title: 'La Ecuación de Valor', level: 2 },
  { id: 'sp-spin', title: 'Las Cuatro Preguntas', level: 2 },
  { id: 'sp-implicacion', title: 'Implicación en Acción', level: 2 },
  { id: 'sp-planificar', title: 'Planificar Implicaciones', level: 2 },
  { id: 'sp-need-payoff', title: 'Necesidad-Beneficio', level: 2 },
  { id: 'sp-venta-interna', title: 'La Venta Interna', level: 2 },
  { id: 'sp-quincy', title: 'La Regla de Quincy', level: 2 },

  { id: 'sp-header-demostrar', title: 'II. Abrir, Demostrar y Comprometer', level: 1 },
  { id: 'sp-apertura', title: 'La Apertura', level: 2 },
  { id: 'sp-fab', title: 'Características, Ventajas, Beneficios', level: 2 },
  { id: 'sp-fab-quiz', title: 'Ejercicio C-V-B', level: 2 },
  { id: 'sp-lanzamientos', title: 'Productos Nuevos', level: 2 },
  { id: 'sp-objeciones', title: 'Prevenir Objeciones', level: 2 },
  { id: 'sp-cierre-tecnicas', title: 'El Mito del Cierre', level: 2 },
  { id: 'sp-cierre-evidencia', title: 'Estudios sobre el Cierre', level: 2 },
  { id: 'sp-compromiso', title: 'Obtener Compromiso', level: 2 },

  { id: 'sp-header-practica', title: 'III. Práctica y Evidencia', level: 1 },
  { id: 'sp-practica', title: 'El Caso Newcastle', level: 2 },
  { id: 'sp-aprender', title: 'Cómo Aprender SPIN', level: 2 },
  { id: 'sp-evaluar', title: '¿Funciona de Verdad?', level: 2 },
  { id: 'sp-motorola', title: 'Motorola Canadá', level: 2 },
  { id: 'sp-critico', title: 'Pensamiento Crítico', level: 2 },

  { id: 'sp-cierre', title: 'Síntesis', level: 2 },
];

export const kahnemanSlides: SlideMeta[] = [
  { id: 'kn-slide-0', title: 'Inicio', level: 2 },
  { id: 'kn-origen', title: 'Kahneman y Tversky', level: 2 },

  { id: 'kn-header-arquitectura', title: 'I. La Arquitectura de la Mente', level: 1 },
  { id: 'kn-dos-sistemas', title: 'Sistema 1 y Sistema 2', level: 2 },
  { id: 'kn-interaccion', title: 'Sin Interruptor', level: 2 },
  { id: 'kn-esfuerzo', title: 'La Pupila Delata', level: 2 },
  { id: 'kn-perezoso', title: 'El Controlador Perezoso', level: 2 },
  { id: 'kn-agotamiento', title: 'Agotamiento del Ego', level: 2 },

  { id: 'kn-header-asociativa', title: 'II. La Máquina Asociativa', level: 1 },
  { id: 'kn-asociativa', title: 'Cascada de Asociaciones', level: 2 },
  { id: 'kn-priming', title: 'Priming', level: 2 },
  { id: 'kn-facilidad', title: 'Facilidad y Tensión', level: 2 },
  { id: 'kn-verdad', title: 'Ilusiones de Verdad', level: 2 },
  { id: 'kn-causalidad', title: 'Normas y Causalidad', level: 2 },

  { id: 'kn-header-heuristicas', title: 'III. Atajos Mentales', level: 1 },
  { id: 'kn-sustitucion', title: 'Sustitución de Preguntas', level: 2 },
  { id: 'kn-representatividad', title: 'Representatividad', level: 2 },
  { id: 'kn-disponibilidad', title: 'Disponibilidad', level: 2 },
  { id: 'kn-afectiva', title: 'Heurística Afectiva', level: 2 },

  { id: 'kn-header-sesgos', title: 'IV. Sesgos del Juicio', level: 1 },
  { id: 'kn-halo', title: 'Efecto Halo', level: 2 },
  { id: 'kn-wysiati', title: 'WYSIATI', level: 2 },
  { id: 'kn-basicas', title: 'Evaluaciones Básicas', level: 2 },

  { id: 'kn-header-critico', title: 'V. Pensamiento Crítico', level: 1 },
  { id: 'kn-replicacion', title: 'La Crisis de Replicación', level: 2 },
  { id: 'kn-vocabulario', title: 'Nombrar el Error', level: 2 },
  { id: 'kn-cierre', title: 'Síntesis', level: 2 },

  { id: 'kn-header-test', title: 'VI. Evalúa lo Aprendido', level: 1 },
  { id: 'kn-test-basico', title: 'Test 1 · Principiante', level: 2 },
  { id: 'kn-test-avanzado', title: 'Test 2 · Avanzado', level: 2 },
];

export const challengerSlides: SlideMeta[] = [
  { id: 'ch-slide-0', title: 'Inicio', level: 2 },
  { id: 'ch-hitos', title: 'Cien Años de Ventas', level: 2 },

  { id: 'ch-header-cambio', title: 'I. Por Qué Cambió el Juego', level: 1 },
  { id: 'ch-fatiga', title: 'Fatiga de Soluciones', level: 2 },
  { id: 'ch-poder', title: 'La Paradoja del Poder', level: 2 },
  { id: 'ch-brecha', title: 'La Brecha de Talento', level: 2 },
  { id: 'ch-evidencia', title: 'Las Cifras del Estudio', level: 2 },

  { id: 'ch-header-perfiles', title: 'II. Los Cinco Perfiles', level: 1 },
  { id: 'ch-perfiles', title: 'Quién es Quién', level: 2 },
  { id: 'ch-estrellas', title: 'Promedio vs Estrella', level: 2 },
  { id: 'ch-tension', title: 'Tensión Constructiva', level: 2 },
  { id: 'ch-citas', title: 'Voces del Campo', level: 2 },

  { id: 'ch-header-modelo', title: 'III. El Modelo en Acción', level: 1 },
  { id: 'ch-pilares', title: 'Los Tres Pilares', level: 2 },
  { id: 'ch-lealtad', title: 'La Ciencia de la Lealtad', level: 2 },
  { id: 'ch-reglas', title: 'Enseñanza Comercial', level: 2 },
  { id: 'ch-diferenciacion', title: 'El Embudo de la Diferenciación', level: 2 },
  { id: 'ch-buzzwords', title: 'Todos Dicen lo Mismo', level: 2 },
  { id: 'ch-coreografia', title: 'La Coreografía de 6 Pasos', level: 2 },
  { id: 'ch-grainger', title: 'Caso Grainger', level: 2 },
  { id: 'ch-adp', title: 'Caso ADP', level: 2 },
  { id: 'ch-safebold', title: 'SAFE o BOLD', level: 2 },
  { id: 'ch-control', title: 'Tomar el Control', level: 2 },

  { id: 'ch-header-organizacion', title: 'IV. Capacidad Organizacional', level: 1 },
  { id: 'ch-organizacion', title: 'El Insight No se Improvisa', level: 2 },
  { id: 'ch-adopcion', title: 'Capacitar No Alcanza', level: 2 },
  { id: 'ch-gerentes', title: 'El Gerente de Ventas', level: 2 },

  { id: 'ch-header-critico', title: 'V. Pensamiento Crítico', level: 1 },
  { id: 'ch-critico', title: '¿Qué Tan Sólido Es?', level: 2 },
  { id: 'ch-cuadran', title: 'Lo Que No Cuadra', level: 2 },
  { id: 'ch-cierre', title: 'Síntesis', level: 2 },

  { id: 'ch-header-test', title: 'VI. Evalúa lo Aprendido', level: 1 },
  { id: 'ch-test-basico', title: 'Test 1 · Principiante', level: 2 },
  { id: 'ch-test-avanzado', title: 'Test 2 · Avanzado', level: 2 },
];

export const trampasSlides: SlideMeta[] = [
  { id: 'td-slide-0', title: 'Inicio', level: 2 },
  { id: 'td-origen', title: 'Un Accidente y una Pregunta', level: 2 },

  { id: 'td-header-relatividad', title: 'I. La Verdad de la Relatividad', level: 1 },
  { id: 'td-relatividad', title: 'El Señuelo de The Economist', level: 2 },
  { id: 'td-senuelos', title: 'Señuelos en la Vida Real', level: 2 },
  { id: 'td-salarios', title: 'Comparar Sale Caro', level: 2 },

  { id: 'td-header-anclas', title: 'II. La Falacia de la Oferta y la Demanda', level: 1 },
  { id: 'td-impronta', title: 'Impronta y Anclaje', level: 2 },
  { id: 'td-coherencia', title: 'Coherencia Arbitraria', level: 2 },
  { id: 'td-persisten', title: 'Anclas que Persisten', level: 2 },
  { id: 'td-mover-ancla', title: 'Mover el Ancla', level: 2 },
  { id: 'td-auditoria', title: 'Audita tu Propia Cola', level: 2 },

  { id: 'td-header-gratis', title: 'III. El Costo del Costo Cero', level: 1 },
  { id: 'td-cero', title: 'Gratis No Es un Descuento', level: 2 },
  { id: 'td-cero-casos', title: 'Gratis en la Vida Real', level: 2 },

  { id: 'td-header-normas', title: 'IV. Normas Sociales y de Mercado', level: 1 },
  { id: 'td-normas', title: 'Dos Mundos Incompatibles', level: 2 },
  { id: 'td-rompe-vinculo', title: 'Cuando el Dinero Rompe el Vínculo', level: 2 },

  { id: 'td-header-caliente', title: 'V. Estados Fríos y Calientes', level: 1 },
  { id: 'td-caliente', title: 'Jekyll y Hyde', level: 2 },
  { id: 'td-jekyll', title: 'Decidir en Frío', level: 2 },

  { id: 'td-header-autocontrol', title: 'VI. Desidia y Autocontrol', level: 1 },
  { id: 'td-ahorro', title: 'La Crisis del Ahorro', level: 2 },
  { id: 'td-fechas', title: 'Fechas Límite: Estudio Retractado', level: 2 },

  { id: 'td-header-valor', title: 'VII. Propiedad, Opciones y Expectativas', level: 1 },
  { id: 'td-dotacion', title: 'El Precio de la Propiedad', level: 2 },
  { id: 'td-puertas', title: 'Las Puertas Abiertas', level: 2 },
  { id: 'td-expectativas', title: 'El Efecto de las Expectativas', level: 2 },
  { id: 'td-placebo', title: 'El Poder del Precio', level: 2 },

  { id: 'td-header-honestidad', title: 'VIII. Honestidad y Grupo', level: 1 },
  { id: 'td-honestidad', title: 'Pequeñas Trampas', level: 2 },
  { id: 'td-cerveza', title: 'Cervezas y Singularidad', level: 2 },

  { id: 'td-header-critico', title: 'IX. Pensamiento Crítico', level: 1 },
  { id: 'td-evidencia', title: 'El Semáforo de la Evidencia', level: 2 },
  { id: 'td-autor', title: 'El Autor Bajo Escrutinio', level: 2 },
  { id: 'td-cuadran', title: 'Lo Que No Cuadra', level: 2 },
  { id: 'td-cierre', title: 'Síntesis', level: 2 },

  { id: 'td-header-test', title: 'X. Evalúa lo Aprendido', level: 1 },
  { id: 'td-test-basico', title: 'Test 1 · Principiante', level: 2 },
  { id: 'td-test-avanzado', title: 'Test 2 · Avanzado', level: 2 },
];

// Guion por clase: cada id del catálogo apunta a su orden de diapositivas.
export const slidesByClass: Record<string, SlideMeta[]> = {
  'ventas-b2b': initialSlides,
  'metodologias-venta': metodologiasSlides,
  'arquitectura-equipos': equiposSlides,
  meddpicc: meddpiccSlides,
  'spin-selling': spinSlides,
  kahneman: kahnemanSlides,
  challenger: challengerSlides,
  'trampas-deseo': trampasSlides,
};

// Cantidad de diapositivas (nivel 2) de cada clase del repositorio.
export const slideCountByClassId: Record<string, number> = {
  'ventas-b2b': initialSlides.filter((slide) => slide.level === 2).length,
  'metodologias-venta': metodologiasSlides.filter((slide) => slide.level === 2).length,
  'arquitectura-equipos': equiposSlides.filter((slide) => slide.level === 2).length,
  meddpicc: meddpiccSlides.filter((slide) => slide.level === 2).length,
  'spin-selling': spinSlides.filter((slide) => slide.level === 2).length,
  kahneman: kahnemanSlides.filter((slide) => slide.level === 2).length,
  challenger: challengerSlides.filter((slide) => slide.level === 2).length,
  'trampas-deseo': trampasSlides.filter((slide) => slide.level === 2).length,
};
