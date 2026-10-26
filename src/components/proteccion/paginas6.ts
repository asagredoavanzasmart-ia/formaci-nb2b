import type { Pagina } from '../influencia/tipos';

/* Transparencia: la política publicada */
export const transparencia: Pagina = {
  id: 'pd-transparencia',
  titulo: 'La política', destaque: 'publicada',
  bajada: 'El sitio web del responsable debe mostrar, siempre disponible, la información mínima que exige la ley.',
  inicio: 'la transparencia también se implementa',
  frases: [
    'el sitio web del responsable', 'la política de tratamiento de datos con su fecha y versión', 'la identificación del responsable', 'los tipos de datos que se tratan',
    'la política y las medidas de seguridad', 'las transferencias internacionales', 'el plazo de conservación', 'la existencia de decisiones automatizadas',
    'es una infracción leve',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Qué debe decir', texto: 'Política con fecha y versión, responsable y canal, tipos de datos, destinatarios, finalidades, base legal e interés legítimo.', frase: 'la política de tratamiento de datos' },
    { rotulo: 'Y además', texto: 'Seguridad, derechos y reclamo ante la Agencia, transferencias y garantías, plazo, fuente, retiro del consentimiento y decisiones automatizadas.', frase: 'la política y las medidas de seguridad' },
    { rotulo: 'Si falta', texto: 'Incumplir el deber de información, o no tener un canal operativo, es infracción leve.', frase: 'es una infracción leve', destacada: true },
  ],
  pregunta: { frase: 'si comparas esta lista con la política', texto: 'Si comparas esta lista con la política de privacidad de cada cliente, ¿cuántos puntos faltan?' },
};

/* Evaluación de impacto */
export const impacto: Pagina = {
  id: 'pd-impacto',
  titulo: 'La evaluación', destaque: 'de impacto',
  bajada: 'Antes de empezar un tratamiento de alto riesgo. Siempre en cuatro casos. No hacerla es gravísimo.',
  inicio: 'algunos tratamientos exigen una evaluación de impacto',
  frases: [
    'produzca un alto riesgo', 'antes de iniciar las operaciones', 'la ley la exige siempre en cuatro casos', 'como la elaboración de perfiles',
    'el tratamiento masivo de datos', 'monitoreo sistemático de una zona', 'el tratamiento de datos sensibles en los casos',
    'describir las operaciones y su finalidad', 'consultar a la agencia', 'no hacer la evaluación cuando corresponde',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro casos', texto: 'Perfiles con efectos jurídicos significativos, tratamiento masivo, monitoreo de zonas públicas y sensibles sin consentimiento.', frase: 'la ley la exige siempre' },
    { rotulo: 'Qué incluye', texto: 'Describir las operaciones y su finalidad, evaluar necesidad y proporcionalidad, y los riesgos con sus medidas.', frase: 'describir las operaciones' },
    { rotulo: 'Alto riesgo', texto: 'Se puede consultar a la Agencia. No hacer la evaluación cuando corresponde es gravísimo.', frase: 'consultar a la agencia', destacada: true },
  ],
  pregunta: { frase: 'de las campañas a gran escala que hoy gestionas', texto: 'De las campañas a gran escala que hoy gestionas, ¿alguna se lanzó con una evaluación de impacto escrita?' },
};

/* Cómo actúa la Agencia */
export const agencia: Pagina = {
  id: 'pd-agencia',
  titulo: 'Cómo actúa', destaque: 'la Agencia',
  bajada: 'Fiscaliza pidiendo antecedentes y tiene dos procedimientos: tutela de derechos y sancionatorio, de seis meses como máximo.',
  inicio: 'para entender el riesgo hay que conocer',
  frases: [
    'puede requerir a quien trate datos', 'llamar a declarar', 'el de tutela de derechos', 'no puede durar más de seis meses', 'el segundo es el sancionatorio',
    'formula cargos', 'la resolución debe ser fundada', 'ante la corte de apelaciones', 'incumplir una resolución o un requerimiento',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Fiscalizar', texto: 'Puede pedir cualquier documento o antecedente y llamar a declarar a representantes, asesores y dependientes.', frase: 'puede requerir a quien trate datos' },
    { rotulo: 'Dos procedimientos', texto: 'Tutela: reclamo en 30 días hábiles y respuesta en 30 corridos. Sancionatorio: cargos y 15 días hábiles para descargos.', frase: 'el de tutela de derechos' },
    { rotulo: 'Después', texto: 'Reclamo ante la Corte de Apelaciones en 15 días hábiles. Incumplir lo que ordena la Agencia es grave.', frase: 'ante la corte de apelaciones', destacada: true },
  ],
  pregunta: { frase: 'si la agencia pidiera mañana los antecedentes', texto: 'Si la Agencia pidiera mañana los antecedentes de una campaña, ¿cuánto tardarías en reunirlos?' },
};

/* Las infracciones en tres niveles */
export const infracciones: Pagina = {
  id: 'pd-infracciones',
  titulo: 'Las', destaque: 'infracciones',
  bajada: 'Leves, graves y gravísimas: desde no tener un canal de contacto hasta el tratamiento fraudulento.',
  inicio: 'la ley clasifica las infracciones en tres niveles',
  frases: [
    'las leves incluyen', 'no tener un canal de contacto', 'las graves incluyen', 'impedir u obstaculizar el ejercicio', 'las gravísimas incluyen',
    'el tratamiento fraudulento', 'y no hacer la evaluación de impacto',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Leves', texto: 'Falta de información y transparencia, sin canal operativo, respuestas incompletas o fuera de plazo, no avisar a la Agencia.', frase: 'las leves incluyen' },
    { rotulo: 'Graves', texto: 'Sin base legal o para otro fin, ceder sin consentimiento, datos innecesarios, impedir derechos, fallas de seguridad o de secreto.', frase: 'las graves incluyen' },
    { rotulo: 'Gravísimas', texto: 'Fraude, uso malicioso, sensibles o de menores a sabiendas, ocultar una vulneración, información falsa o sin evaluación de impacto.', frase: 'las gravísimas incluyen', destacada: true },
  ],
  pregunta: { frase: 'de todas estas conductas', texto: 'De todas estas conductas, ¿cuál ves más cerca del día a día de tus campañas?' },
};

/* Las multas y cómo se calculan */
export const multas: Pagina = {
  id: 'pd-multas',
  titulo: 'Las', destaque: 'multas',
  bajada: 'Hasta 5.000, 10.000 o 20.000 UTM según el nivel; reincidir puede triplicarlas o llevarlas a un porcentaje de los ingresos.',
  inicio: 'las multas se fijan según ese nivel',
  frases: [
    'hasta 5.000 unidades tributarias', 'las graves con multa de hasta 10.000', 'las gravísimas con multa de hasta 20.000', 'hasta tres veces el monto',
    'al 2 o al 4', 'la multa sube un 50', 'las atenuantes son', 'las agravantes son', 'quedan cinco años en el registro', 'a las empresas de menor tamaño',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Por nivel', texto: 'Leves: amonestación o hasta 5.000 UTM. Graves: hasta 10.000. Gravísimas: hasta 20.000.', frase: 'hasta 5.000 unidades tributarias' },
    { rotulo: 'Si reincide', texto: 'Hasta el triple; en empresas que no son de menor tamaño, hasta el 2 % o 4 % de los ingresos. Sin corregir en 60 días, +50 %.', frase: 'hasta tres veces el monto' },
    { rotulo: 'Además', texto: 'Atenuantes y agravantes, registro público por cinco años, indemnización y, para empresas de menor tamaño, amonestación el primer año.', frase: 'las atenuantes son', destacada: true },
  ],
  pregunta: { frase: 'qué pesaría más para tu agencia', texto: '¿Qué pesaría más para tu agencia y sus clientes: la multa o aparecer en ese registro público?' },
};

/* El modelo de prevención y el delegado */
export const prevencion: Pagina = {
  id: 'pd-prevencion',
  titulo: 'El modelo', destaque: 'de prevención',
  bajada: 'Un programa de cumplimiento de siete elementos, con un delegado de protección de datos, que la Agencia certifica por tres años.',
  inicio: 'la ley ofrece una herramienta para ordenar',
  frases: [
    'el modelo de prevención de infracciones', 'un programa de cumplimiento con siete elementos', 'designar a un delegado', 'el cuarto identificar los procesos',
    'el sexto contar con mecanismos de reporte', 'deben incorporarse en los contratos de trabajo', 'el dueño puede asumir esa función', 'sus tareas son asesorar',
    'certifica estos modelos por tres años',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Siete elementos', texto: 'Delegado, sus medios, mapa de datos, procesos de riesgo, protocolos, reportes y sanciones internas.', frase: 'un programa de cumplimiento' },
    { rotulo: 'El delegado', texto: 'Lo designa la máxima autoridad, con autonomía y recursos; en una pyme puede serlo el dueño.', frase: 'designar a un delegado' },
    { rotulo: 'Certificado', texto: 'Las reglas van en los contratos o el reglamento interno. La Agencia certifica el modelo por tres años y cuenta como atenuante.', frase: 'deben incorporarse en los contratos', destacada: true },
  ],
  pregunta: { frase: 'en tu agencia quién sería hoy', texto: 'En tu agencia, ¿quién sería hoy la persona capaz de asumir el papel de delegado?' },
};

/* El plan de cinco pasos */
export const plan: Pagina = {
  id: 'pd-plan',
  titulo: 'El plan de', destaque: 'cinco pasos',
  bajada: 'Inventario, base legal, contratos, canales y evidencia, antes del 1 de diciembre de 2026.',
  inicio: 'con todo lo anterior las campañas activas',
  frases: [
    'antes del 1 de diciembre', 'el primer paso es el inventario', 'el segundo paso es la base legal', 'las bases que no pasen este filtro',
    'el tercer paso son los contratos', 'el cuarto paso son los canales', 'y el quinto paso es la evidencia',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Inventario y base legal', texto: 'Cada campaña, su base, su cliente, el papel de la agencia y los proveedores; y la base legal de cada una.', frase: 'el primer paso es el inventario' },
    { rotulo: 'Contratos y canales', texto: 'Encargos y autorizaciones por escrito, garantías al extranjero, consentimiento por finalidad, baja fácil y canal de solicitudes.', frase: 'el tercer paso son los contratos' },
    { rotulo: 'Evidencia', texto: 'Registro de cada consentimiento, respuesta, medida de seguridad y evaluación de impacto.', frase: 'y el quinto paso es la evidencia', destacada: true },
  ],
  pregunta: { frase: 'de estos cinco pasos', texto: 'De estos cinco pasos, ¿por cuál empezarías el lunes?' },
};

/* La lista de comprobación */
export const checklist: Pagina = {
  id: 'pd-checklist',
  titulo: 'La lista de', destaque: 'comprobación',
  bajada: 'Tres niveles para verificar la implementación: la agencia, los contratos y cada campaña.',
  inicio: 'para comprobar que la implementación está completa',
  frases: ['una lista de verificación con tres niveles', 'en la agencia', 'en los contratos', 'en cada campaña', 'y para cerrar la política de privacidad'],
  els: [],
  tarjetas: [
    { rotulo: 'En la agencia', texto: 'Inventario, delegado, obligaciones en contratos, equipo capacitado, cifrado y respaldos, y protocolo de incidentes.', frase: 'en la agencia' },
    { rotulo: 'En los contratos', texto: 'Encargo completo, subencargados autorizados, transferencias con garantías, cesiones por escrito y fin del servicio definido.', frase: 'en los contratos' },
    { rotulo: 'En cada campaña', texto: 'Base legal, finalidad, consentimiento registrado, reglas especiales, origen, bajas, revisión humana, plazo y evaluación de impacto.', frase: 'en cada campaña', destacada: true },
  ],
  pregunta: { frase: 'de esta lista cuántas casillas', texto: 'De esta lista, ¿cuántas casillas puedes marcar hoy sin dudar?' },
};

/* Síntesis */
export const sintesis: Pagina = {
  id: 'pd-sintesis',
  titulo: 'Síntesis:', destaque: 'las preguntas de un dato',
  bajada: 'De dónde salió, para qué, quién responde, cuánto dura, quién accede, cómo se protege y cómo se devuelve.',
  inicio: 'la ley 21.719 cambia la pregunta',
  frases: [
    'antes bastaba con preguntar', 'de dónde salió', 'para qué se pidió', 'quién es su responsable', 'cuánto tiempo puede quedarse', 'quién accede a él',
    'cómo se protege', 'cómo se devuelve o se borra', 'seguir trabajando con sus clientes', 'el plazo corre hasta el 1 de diciembre',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Antes', texto: 'Bastaba con preguntar si un dato servía para la campaña.', frase: 'antes bastaba con preguntar' },
    { rotulo: 'Ahora', texto: 'Origen, finalidad, responsable, plazo, acceso, protección y devolución o borrado.', frase: 'de dónde salió' },
    { rotulo: 'Para la agencia', texto: 'Esas respuestas le permiten trabajar con sus clientes sin cargar errores ajenos, con campañas que la ley respalda.', frase: 'seguir trabajando con sus clientes', destacada: true },
  ],
  pregunta: { frase: 'al final la pregunta que queda', texto: '¿Qué campaña vas a revisar primero?' },
};
