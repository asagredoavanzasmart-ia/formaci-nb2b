import type { Pagina } from '../influencia/tipos';

/* La cadena de encargados: contratos, subcontratación y deberes */
export const encargados: Pagina = {
  id: 'pd-encargados',
  titulo: 'La cadena de', destaque: 'encargados',
  bajada: 'Cliente, agencia y proveedores se ordenan con contratos. Nadie subcontrata sin autorización escrita y todos guardan secreto.',
  inicio: 'una campaña digital rara vez la ejecuta',
  frases: [
    'el cliente contrata a la agencia', 'trabaja con plataformas y proveedores', 'el objeto del encargo', 'no puede delegar parte o todo el encargo',
    'sigue siendo solidariamente responsable', 'los mismos deberes de secreto y de seguridad', 'debe reportarla al responsable',
    'deben suprimirse o devolverse', 'revisar dos tipos de contratos',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'El contrato de encargo', texto: 'Objeto, duración, finalidad, tipo de datos, categorías de titulares y derechos y obligaciones de las partes.', frase: 'el objeto del encargo' },
    { rotulo: 'Subcontratar', texto: 'Solo con autorización específica y por escrito. Quien delega sigue siendo solidariamente responsable.', frase: 'no puede delegar parte' },
    { rotulo: 'Deberes del encargado', texto: 'Secreto y seguridad como el responsable, reportarle las vulneraciones y suprimir o devolver los datos al terminar.', frase: 'los mismos deberes de secreto', destacada: true },
  ],
  pregunta: { frase: 'si un cliente te pidiera mañana la lista', texto: 'Si un cliente te pidiera mañana la lista de todos los subencargados que tratan su base, ¿la tendrías autorizada por escrito?' },
};

/* Transferencia internacional */
export const transferencia: Pagina = {
  id: 'pd-transferencia',
  titulo: 'Datos que', destaque: 'salen del país',
  bajada: 'Una transferencia internacional es lícita con país adecuado, garantías contractuales o certificación. Sin ellas, solo casos puntuales.',
  inicio: 'cuando los datos salen del país',
  frases: [
    'hay una transferencia internacional', 'es lícita en tres casos', 'niveles adecuados de protección', 'cláusulas contractuales normas corporativas vinculantes',
    'un modelo de cumplimiento o un mecanismo de certificación', 'solo caben transferencias específicas y no habituales', 'acreditar ante la agencia',
    'suspender temporalmente el envío', 'es una infracción gravísima',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Tres vías', texto: 'Un país con nivel adecuado de protección, cláusulas o normas corporativas con garantías, o un modelo de cumplimiento certificado.', frase: 'es lícita en tres casos' },
    { rotulo: 'Sin garantías', texto: 'Solo transferencias específicas y no habituales, como con consentimiento expreso o cuando lo exige un contrato con el titular.', frase: 'solo caben transferencias específicas' },
    { rotulo: 'Lo acredita quien envía', texto: 'La Agencia puede suspender el envío, y transferir a sabiendas contra la ley es gravísimo.', frase: 'acreditar ante la agencia', destacada: true },
  ],
  pregunta: { frase: 'de las herramientas con que hoy trabajan', texto: 'De las herramientas de tus campañas, ¿sabes cuáles guardan los datos fuera de Chile y con qué garantías?' },
};

/* Datos con reglas especiales */
export const especiales: Pagina = {
  id: 'pd-especiales',
  titulo: 'Datos con', destaque: 'reglas especiales',
  bajada: 'Biometría, menores de edad, geolocalización y salud tienen exigencias propias que afectan directamente a las campañas.',
  inicio: 'hay otros datos con reglas especiales',
  frases: [
    'los datos biométricos', 'el sistema biométrico empleado', 'niños niñas y adolescentes', 'menores de catorce años', 'bajo los dieciséis años',
    'los datos de geolocalización', 'si se cederán a un tercero', 'no se pueden tratar ni ceder',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Biometría', texto: 'Consentimiento expreso e informar el sistema, la finalidad, el período de uso y cómo ejercer los derechos.', frase: 'los datos biométricos' },
    { rotulo: 'Menores', texto: 'Bajo los 14 años, consentimiento de los padres. De 14 a 18, reglas de adultos, salvo sensibles bajo los 16.', frase: 'niños niñas y adolescentes' },
    { rotulo: 'Geolocalización y salud', texto: 'Informar tipo, finalidad, duración y cesión de la ubicación. Salud recolectada en trabajo, estudio, deporte o seguros: no se trata ni se cede.', frase: 'los datos de geolocalización', destacada: true },
  ],
  pregunta: { frase: 'de estos grupos cuál aparece hoy', texto: 'De estos grupos, ¿cuál aparece hoy en los formularios, las aplicaciones o las audiencias de tus clientes?' },
};

/* Los seis derechos del titular */
export const derechos: Pagina = {
  id: 'pd-derechos',
  titulo: 'Los seis', destaque: 'derechos',
  bajada: 'Acceso, rectificación, supresión, oposición, portabilidad y bloqueo. Personales, irrenunciables y, en su mayoría, gratuitos.',
  inicio: 'toda persona tiene seis derechos',
  frases: [
    'el derecho de acceso', 'el derecho de rectificación', 'el derecho de supresión', 'el derecho de oposición permite', 'el derecho de portabilidad',
    'y el derecho de bloqueo', 'personales intransferibles e irrenunciables', 'pueden ejercerlos sus herederos', 'son siempre gratuitas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Acceso', texto: 'Saber qué datos se tratan, su origen, finalidad, destinatarios, plazo, interés legítimo y la lógica de las decisiones automatizadas.', frase: 'el derecho de acceso' },
    { rotulo: 'Corregir, borrar, oponerse, llevar y pausar', texto: 'Rectificación comunicada a los destinatarios, supresión, oposición, portabilidad en formato de uso común y bloqueo temporal.', frase: 'el derecho de rectificación' },
    { rotulo: 'Irrenunciables', texto: 'Ningún contrato los limita. Rectificar, suprimir y oponerse es siempre gratis; el acceso, al menos una vez por trimestre.', frase: 'personales intransferibles', destacada: true },
  ],
  pregunta: { frase: 'si un cliente final escribiera hoy', texto: 'Si un cliente final escribiera hoy pidiendo todos sus datos, ¿quién entre tu cliente y tu agencia sabría responderle?' },
};

/* Procedimiento y plazos */
export const procedimiento: Pagina = {
  id: 'pd-procedimiento',
  titulo: 'Procedimiento', destaque: 'y plazos',
  bajada: 'Acuse de recibo, respuesta en 30 días corridos prorrogables una vez, respaldo de todo y bloqueo resuelto en 2 días hábiles.',
  inicio: 'para atender esos derechos la ley fija',
  frases: [
    'la solicitud llega por escrito', 'debe identificar al titular', 'debe acusar recibo', 'dentro de 30 días corridos', 'prorrogables una sola vez',
    'guardar los respaldos', 'si rechaza la solicitud', 'tiene 30 días hábiles para reclamar', 'el caso más urgente es el bloqueo temporal', 'dentro de 2 días hábiles',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'La solicitud', texto: 'Por escrito, al correo o formulario dispuesto: identifica al titular, una dirección y los datos o el tratamiento.', frase: 'la solicitud llega por escrito' },
    { rotulo: '30 + 30 días', texto: 'Acuse de recibo y respuesta en 30 días corridos, prorrogables una vez. Si se rechaza, fundado y con 30 días hábiles para reclamar.', frase: 'dentro de 30 días corridos' },
    { rotulo: 'Bloqueo: 2 días hábiles', texto: 'Mientras no se resuelva, esos datos no se tratan. Si se rechaza, se comunica a la Agencia.', frase: 'el caso más urgente', destacada: true },
  ],
  pregunta: { frase: 'tu agencia tiene definido qué hacer', texto: '¿Tu agencia tiene definido qué hacer con una solicitud de un titular que llega a su correo y no al de su cliente?' },
};

/* Cuándo se puede negar una solicitud */
export const negar: Pagina = {
  id: 'pd-negar',
  titulo: 'Cuándo se', destaque: 'puede negar',
  bajada: 'La supresión procede en seis casos y no procede en otros. Toda negativa se funda y avisa el plazo para reclamar.',
  inicio: 'no toda solicitud obliga a decir que sí',
  frases: [
    'la supresión procede en seis casos', 'pero no procede cuando', 'para cumplir una obligación legal o ejecutar un contrato', 'por razones de salud pública',
    'o para una reclamación administrativa o judicial', 'el titular también puede pedir el bloqueo', 'toda negativa debe ser fundada', 'es una infracción grave',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Procede', texto: 'Datos innecesarios, consentimiento revocado, obtención ilícita, datos caducos, orden legal o judicial, u oposición sin otro fundamento.', frase: 'la supresión procede en seis casos' },
    { rotulo: 'No procede', texto: 'Libertad de opinar e informar, obligación legal o contrato, función pública, salud pública, fines de interés público o reclamaciones.', frase: 'pero no procede cuando' },
    { rotulo: 'Negar bien', texto: 'Fundado, con la causa y los antecedentes, y avisando el plazo para reclamar. No responder un bloqueo es grave.', frase: 'toda negativa debe ser fundada', destacada: true },
  ],
  pregunta: { frase: 'si un cliente con contrato vigente pidiera', texto: 'Si un cliente con contrato vigente pidiera borrar todos sus datos, ¿sabrías qué se suprime y qué se conserva?' },
};

/* Conservación, anonimización y protección desde el diseño */
export const conservacion: Pagina = {
  id: 'pd-conservacion',
  titulo: 'Los datos', destaque: 'vencen',
  bajada: 'Se guardan solo el tiempo necesario. Después, se suprimen o se anonimizan. Y por defecto, solo lo estrictamente necesario.',
  inicio: 'guardar datos también tiene reglas',
  frases: [
    'los datos tienen fecha de vencimiento', 'solo se pueden conservar durante el tiempo necesario', 'la anonimización es un procedimiento irreversible',
    'la seudonimización en cambio', 'los datos de medidas precontractuales', 'la información de obligaciones prescritas', 'el encargado debe suprimir o devolver',
    'la protección desde el diseño y por defecto', 'por defecto solo debe tratar',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Fecha de vencimiento', texto: 'Solo el tiempo necesario para los fines; un plazo mayor requiere ley o consentimiento.', frase: 'los datos tienen fecha de vencimiento' },
    { rotulo: 'Anonimizar o seudonimizar', texto: 'Anonimizar rompe el vínculo para siempre y el dato deja de ser personal. Seudonimizar solo lo separa: sigue siendo personal.', frase: 'la anonimización es un procedimiento' },
    { rotulo: 'Diseño y defecto', texto: 'Medidas desde antes de tratar y, por defecto, solo los datos estrictamente necesarios.', frase: 'la protección desde el diseño', destacada: true },
  ],
  pregunta: { frase: 'cuando una campaña termina', texto: 'Cuando una campaña termina, ¿qué pasa hoy con los datos que recogió?' },
};

/* La seguridad como deber */
export const seguridad: Pagina = {
  id: 'pd-seguridad',
  titulo: 'La', destaque: 'seguridad',
  bajada: 'Confidencialidad, integridad, disponibilidad y resiliencia, con cuatro medidas que obligan al responsable y al encargado.',
  inicio: 'la seguridad pasa de buena práctica',
  frases: [
    'la confidencialidad la integridad la disponibilidad y la resiliencia', 'se calibran según el estado de la técnica', 'la seudonimización y el cifrado',
    'la capacidad de garantizar de forma permanente', 'la capacidad de restaurar rápido', 'un proceso regular para verificar',
    'corresponde al responsable acreditar', 'estándares mínimos diferenciados',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro atributos', texto: 'Confidencialidad, integridad, disponibilidad y resiliencia, según la técnica, los costos, los fines y los riesgos.', frase: 'la confidencialidad la integridad' },
    { rotulo: 'Cuatro medidas', texto: 'Seudonimización y cifrado, garantía permanente de los sistemas, restauración rápida y verificación regular.', frase: 'la seudonimización y el cifrado' },
    { rotulo: 'Acreditarlo', texto: 'Ante un incidente, el responsable demuestra que sus medidas existían y funcionaban.', frase: 'corresponde al responsable acreditar', destacada: true },
  ],
  pregunta: { frase: 'si un incidente ocurriera mañana', texto: 'Si un incidente ocurriera mañana, ¿qué documentos podrías mostrar para acreditar las medidas que tenías?' },
};

/* Incidentes y deber de reportar */
export const incidentes: Pagina = {
  id: 'pd-incidentes',
  titulo: 'Cuando algo', destaque: 'falla',
  bajada: 'Reportar a la Agencia sin demora, registrar cada incidente y, en casos sensibles, avisar a cada titular.',
  inicio: 'cuando algo falla la ley exige reportarlo',
  frases: [
    'el responsable debe informar a la agencia', 'sin dilaciones indebidas', 'debe registrar cada comunicación', 'si la vulneración involucra datos sensibles',
    'también debe avisar a cada titular', 'publicar un aviso en un medio', 'el encargado debe reportar la vulneración al responsable',
    'omitir deliberadamente la comunicación es gravísima',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'A la Agencia, sin demora', texto: 'Destrucción, filtración, pérdida, alteración o acceso no autorizado con riesgo razonable para los titulares.', frase: 'el responsable debe informar' },
    { rotulo: 'A cada titular', texto: 'Si hay datos sensibles, de menores de 14 o financieros: en lenguaje claro, o con un aviso en un medio masivo nacional.', frase: 'si la vulneración involucra' },
    { rotulo: 'La cadena', texto: 'El encargado avisa al responsable y el responsable a la Agencia. Omitirlo a propósito es gravísimo.', frase: 'el encargado debe reportar', destacada: true },
  ],
  pregunta: { frase: 'si una plataforma de tu agencia sufriera', texto: 'Si una plataforma de tu agencia sufriera una filtración, ¿está escrito quién avisa al cliente, en cuánto tiempo y con qué?' },
};
