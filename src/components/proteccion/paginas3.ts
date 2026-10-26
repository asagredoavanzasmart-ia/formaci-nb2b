import type { Pagina } from '../influencia/tipos';

/* El consentimiento: cinco condiciones, revocable y demostrable */
export const consentimiento: Pagina = {
  id: 'pd-consentimiento',
  titulo: 'El', destaque: 'consentimiento',
  bajada: 'Libre, informado, específico, previo e inequívoco. Revocable en cualquier momento y, sobre todo, demostrable.',
  inicio: 'la regla general para tratar datos es el consentimiento',
  frases: [
    'cuando ella lo otorga', 'debe ser libre', 'debe ser informado', 'debe ser específico', 'debe ser previo', 'y debe ser inequívoco',
    'puede revocarlo en cualquier momento', 'no tiene efectos retroactivos', 'deben ser expeditos fidedignos gratuitos',
    'si lo otorga un mandatario', 'corresponde al responsable demostrar', 'un consentimiento que no se puede demostrar',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cinco condiciones', texto: 'Libre, informado, específico en su finalidad, previo al tratamiento e inequívoco: una declaración o un acto afirmativo claro.', frase: 'debe ser libre' },
    { rotulo: 'Revocable', texto: 'Se retira en cualquier momento, sin dar razones y por un medio igual al que se usó para darlo. No tiene efecto retroactivo.', frase: 'puede revocarlo en cualquier momento' },
    { rotulo: 'Lo demuestra el responsable', texto: 'Si no se puede demostrar, para la ley el consentimiento no existe.', frase: 'corresponde al responsable demostrar', destacada: true },
  ],
  pregunta: { frase: 'cuántas de tus campañas activas guardan', texto: '¿Cuántas de tus campañas activas guardan hoy el registro de cuándo, cómo y para qué se obtuvo cada consentimiento?' },
};

/* El consentimiento llevado a un formulario */
export const formularios: Pagina = {
  id: 'pd-formularios',
  titulo: 'El consentimiento', destaque: 'en el formulario',
  bajada: 'Una autorización por finalidad, una acción clara de la persona, sin condicionar la compra y con la baja tan fácil como el alta.',
  inicio: 'llevado a un formulario o a un sitio de captura',
  frases: [
    'cada finalidad distinta necesita su propia autorización', 'recibir una cotización', 'que recibir publicidad',
    'ni que compartir los datos con un tercero', 'una acción afirmativa clara', 'se presume que el consentimiento no fue libremente otorgado',
    'condicionar una compra a aceptar publicidad', 'la ley hace una excepción', 'si la persona se suscribió con un clic',
    'darse de baja con la misma facilidad', 'si el consentimiento original no consideraba la cesión',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Una casilla por finalidad', texto: 'Cotización, publicidad y compartir con terceros son autorizaciones distintas, y cada una nace de una acción clara de la persona.', frase: 'cada finalidad distinta' },
    { rotulo: 'Sin condicionar', texto: 'Se presume que no es libre si se pide dentro de un contrato que no lo necesita, salvo que el consentimiento sea la única contraprestación.', frase: 'se presume que el consentimiento' },
    { rotulo: 'Baja con un clic', texto: 'Si se suscribió con un clic, se da de baja igual de fácil, gratis y en cualquier momento.', frase: 'si la persona se suscribió', destacada: true },
  ],
  pregunta: { frase: 'si revisaras hoy los formularios de tus clientes', texto: 'Si revisaras hoy los formularios de tus clientes, ¿cuántos piden un solo consentimiento para varias finalidades?' },
};

/* Otras fuentes de licitud: las otras puertas */
export const bases: Pagina = {
  id: 'pd-bases',
  titulo: 'Otras', destaque: 'bases legales',
  bajada: 'Contrato, obligación legal, interés legítimo, obligaciones financieras y defensa de un derecho. En todas, el responsable acredita.',
  inicio: 'el consentimiento no es la única puerta',
  frases: [
    'otras fuentes de licitud', 'la primera es el contrato', 'medidas precontractuales', 'la segunda es la obligación legal',
    'la tercera es el interés legítimo', 'que se le informe sobre el tratamiento', 'la cuarta son los datos de obligaciones',
    'y la quinta es la formulación', 'el responsable debe acreditar la licitud', 'deben suprimirse o anonimizarse',
    'su tratamiento también queda sometido',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cinco puertas más', texto: 'Contrato o medidas precontractuales, obligación legal, interés legítimo, obligaciones económicas y defensa de un derecho.', frase: 'la primera es el contrato' },
    { rotulo: 'Interés legítimo', texto: 'Solo si no afecta los derechos del titular, que siempre puede exigir que se le informe cuál es ese interés.', frase: 'la tercera es el interés legítimo' },
    { rotulo: 'Detalles prácticos', texto: 'Los datos de cotizaciones se suprimen o anonimizan, y los de fuentes públicas también quedan sometidos a la ley.', frase: 'deben suprimirse o anonimizarse', destacada: true },
  ],
  pregunta: { frase: 'para cada base que hoy alimenta', texto: 'Para cada base que hoy alimenta las campañas de tus clientes, ¿sabes cuál de estas puertas permite tratarla?' },
};

/* Reutilizar una base para una campaña nueva: las cuatro salidas del principio de finalidad */
export const reutilizar: Pagina = {
  id: 'pd-reutilizar',
  titulo: 'Reutilizar', destaque: 'una base',
  bajada: 'Una base no se usa para fines distintos a los informados, salvo cuatro salidas. Fuera de ellas, la infracción es grave.',
  inicio: 'uno de los hábitos más comunes en marketing',
  frases: [
    'reutilizar una base para una campaña nueva', 'no se pueden tratar los datos con fines distintos', 'hay cuatro salidas',
    'que el nuevo fin sea compatible', 'que exista una relación contractual o precontractual', 'que el titular otorgue nuevamente',
    'y la cuarta es que lo disponga', 'es una infracción grave', 'destinarlos maliciosamente',
    'cada base debería viajar con su finalidad declarada', 'alguien debe comprobar si el nuevo uso cabe',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro salidas', texto: 'Un fin compatible, una relación contractual que lo justifique, un nuevo consentimiento o que lo disponga la ley.', frase: 'hay cuatro salidas' },
    { rotulo: 'Fuera de ellas', texto: 'Usar los datos para otra finalidad es infracción grave; destinarlos maliciosamente a otra, gravísima.', frase: 'es una infracción grave' },
    { rotulo: 'La finalidad viaja con la base', texto: 'Antes de lanzar una campaña con una base antigua, alguien comprueba si el nuevo uso cabe en lo que se informó.', frase: 'cada base debería viajar', destacada: true },
  ],
  pregunta: { frase: 'si un cliente te pidiera mañana ocupar', texto: 'Si un cliente te pidiera mañana ocupar su base de compradores para un producto nuevo, ¿qué revisarías antes de decir que sí?' },
};
