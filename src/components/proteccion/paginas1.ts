import type { Pagina } from '../influencia/tipos';

/* Portada · desde el 1 de diciembre de 2026 cada dato es un préstamo que hay que justificar */
export const portada: Pagina = {
  id: 'pd-portada',
  titulo: 'Protección de datos:', destaque: 'Ley 21.719 para marketing',
  bajada: 'Guía de implementación para agencias de marketing digital y sus clientes, antes del 1 de diciembre de 2026.',
  inicio: '@cero',
  frases: [
    'cada dato que tu agencia maneja', 'deja de ser un insumo libre', 'pasa a ser un préstamo', 'tiene que poder justificar',
    'eso establece la ley', 'crea la agencia de protección', 'reescribe la antigua ley', 'toda persona natural o jurídica',
    'incluidos los órganos públicos', 'debe respetar los derechos y libertades', 'no trae un régimen especial',
    'incluido el de las campañas activas', 'debe cumplir las mismas reglas', 'qué revisar', 'qué documentar', 'y qué cambiar',
    'piensa en una campaña que hoy esté activa',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Desde el 1 de diciembre de 2026', texto: 'Cada dato de una campaña deja de ser un insumo libre y pasa a ser un préstamo que alguien debe poder justificar.', frase: 'pasa a ser un préstamo' },
    { rotulo: 'Ley 21.719', texto: 'Reescribe la Ley 19.628 y crea la Agencia de Protección de Datos Personales. Rige para personas naturales, jurídicas y órganos públicos.', frase: 'eso establece la ley' },
    { rotulo: 'Sin régimen especial', texto: 'Las bases que ya existen y las campañas activas deben cumplir las mismas reglas desde esa fecha.', frase: 'no trae un régimen especial', destacada: true },
  ],
  pregunta: { frase: 'si mañana alguien te pidiera demostrar', texto: 'Si mañana alguien te pidiera demostrar de dónde salió cada contacto de una campaña activa, ¿podrías hacerlo?' },
};

/* Qué es un dato personal: identificada o identificable, aunque no lleve nombre */
export const datoPersonal: Pagina = {
  id: 'pd-dato-personal',
  titulo: 'Qué es un', destaque: 'dato personal',
  bajada: 'Cualquier información de una persona natural identificada o identificable, aunque no lleve su nombre.',
  inicio: 'todo empieza por saber qué es un dato personal',
  frases: [
    'cualquier información vinculada o referida', 'persona natural identificada o identificable', 'directa o indirectamente',
    'identificadores el nombre', 'número de cédula de identidad', 'el análisis de rasgos', 'económica cultural o social',
    'todos los medios y factores objetivos', 'no necesita llevar nombre', 'cruzado con otros', 'permita llegar a una persona',
    'ventas entre empresas', 'el nombre el correo y el teléfono', 'se refieren a una persona natural',
    'lo que queda fuera de la ley', 'como su razón social',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Identificada o identificable', texto: 'Cualquier información de una persona natural cuya identidad se puede determinar, directa o indirectamente.', frase: 'persona natural identificada' },
    { rotulo: 'Sin nombre también', texto: 'Un dato no necesita llevar nombre: basta con que, cruzado con otros, permita llegar a una persona.', frase: 'no necesita llevar nombre' },
    { rotulo: 'Contactos entre empresas', texto: 'El nombre, el correo y el teléfono de quien trabaja en otra compañía son datos personales. La razón social, no.', frase: 'ventas entre empresas', destacada: true },
  ],
  pregunta: { frase: 'cuántos de los datos que tus campañas', texto: '¿Cuántos de los datos que tus campañas recogen hoy creías que no eran personales?' },
};
