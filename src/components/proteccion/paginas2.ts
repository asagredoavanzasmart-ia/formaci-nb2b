import type { Pagina } from '../influencia/tipos';

/* Datos sensibles: la categoría más protegida, con la situación socioeconómica como punto delicado */
export const sensibles: Pagina = {
  id: 'pd-sensibles',
  titulo: 'Los datos', destaque: 'sensibles',
  bajada: 'La categoría más protegida: solo se tratan con consentimiento expreso del titular.',
  inicio: 'dentro de los datos personales hay una categoría',
  frases: [
    'una categoría más protegida', 'los datos sensibles', 'características físicas o morales', 'el origen étnico o racial',
    'la situación socioeconómica', 'las convicciones ideológicas', 'los datos de salud', 'la vida sexual',
    'el punto más delicado', 'segmentan por nivel de ingresos', 'en el mismo grupo que la salud',
    'consentimiento expreso del titular', 'una declaración escrita', 'verbal o por un medio tecnológico',
    'salvo excepciones acotadas', 'es una infracción gravísima',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Categoría más protegida', texto: 'Origen, afiliación, situación socioeconómica, convicciones, creencias, salud, perfil biológico, biometría, vida y orientación sexual e identidad de género.', frase: 'los datos sensibles' },
    { rotulo: 'Lo más delicado', texto: 'Segmentar por nivel de ingresos o capacidad de compra cae en la situación socioeconómica.', frase: 'el punto más delicado' },
    { rotulo: 'Consentimiento expreso', texto: 'Escrito, verbal o por un medio tecnológico equivalente. Tratarlos a sabiendas contra la ley es infracción gravísima.', frase: 'consentimiento expreso del titular', destacada: true },
  ],
  pregunta: { frase: 'en las campañas que hoy gestionas', texto: '¿Cuántos criterios de segmentación de tus campañas caen, sin que nadie lo haya notado, en datos sensibles?' },
};

/* Quién es quién: titular, responsable, encargado y Agencia; y el alcance fuera de Chile */
export const roles: Pagina = {
  id: 'pd-roles',
  titulo: 'Quién es', destaque: 'quién',
  bajada: 'Titular, responsable, encargado y Agencia. La ley también alcanza a empresas que no están en Chile.',
  inicio: 'para implementar la ley hay que tener claro',
  frases: [
    'el titular es la persona natural', 'el responsable es la persona natural o jurídica', 'decide acerca de los fines y medios',
    'el encargado que la ley también llama', 'por cuenta del responsable', 'y la agencia de protección de datos personales es la autoridad',
    'dicta instrucciones fiscaliza', 'la ley alcanza también a quienes no están en chile', 'están establecidos en el país',
    'cuando el encargado trabaja para un responsable establecido', 'una empresa extranjera ofrece bienes o servicios',
    'o monitorea su comportamiento', 'las empresas no constituidas en chile deben informar', 'queda fuera lo que las personas naturales hacen',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro papeles', texto: 'Titular; responsable, que decide fines y medios; encargado, que trata por cuenta del responsable; y la Agencia, que fiscaliza.', frase: 'el titular es la persona natural' },
    { rotulo: 'Fuera de Chile', texto: 'Alcanza a empresas extranjeras que ofrecen bienes o servicios a personas en Chile, cobren o no, o monitorean su comportamiento.', frase: 'la ley alcanza también' },
    { rotulo: 'Correo ante la Agencia', texto: 'Las empresas no constituidas en Chile deben informar un correo operativo de alguien que actúe en su nombre.', frase: 'las empresas no constituidas', destacada: true },
  ],
  pregunta: { frase: 'si un cliente extranjero te encarga', texto: 'Si un cliente extranjero te encarga una campaña para el público chileno, ¿sabe que la ley también lo alcanza?' },
};

/* El papel de la agencia: encargada con la base del cliente, responsable si cambia el fin */
export const papel: Pagina = {
  id: 'pd-papel',
  titulo: 'El papel de', destaque: 'la agencia',
  bajada: 'Encargada cuando sigue el encargo del cliente; responsable cuando decide los fines o cambia el uso.',
  inicio: 'la pregunta más importante para una agencia',
  frases: [
    'en qué papel está en cada campaña', 'trabaja con la base de datos de su cliente', 'siguiendo sus instrucciones', 'actúa como encargada',
    'y el cliente es el responsable', 'solo puede tratar los datos conforme al encargo', 'tiene prohibido usarlos para un objeto distinto',
    'para construir audiencias propias', 'o para la campaña de otro cliente', 'la ley la considera responsable',
    'responde personalmente por las infracciones', 'y solidariamente con el cliente', 'cuando la agencia recoge datos para sí misma',
    'así que es responsable de esos datos', 'debería tener anotado de quién es',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Encargada', texto: 'Con la base del cliente, siguiendo sus instrucciones y sus fines, la agencia es encargada y el cliente es el responsable.', frase: 'actúa como encargada' },
    { rotulo: 'Si cambia el fin', texto: 'Usar los datos para audiencias propias u otro cliente la vuelve responsable: responde personalmente y solidariamente.', frase: 'la ley la considera responsable' },
    { rotulo: 'Datos propios', texto: 'En su propia captación de clientes, la agencia es responsable. Cada base debe tener anotado de quién es y en qué papel se trata.', frase: 'cuando la agencia recoge datos', destacada: true },
  ],
  pregunta: { frase: 'si hoy revisaras tus servidores', texto: 'Si hoy revisaras tus servidores, ¿podrías separar los datos de tus clientes de los que son tuyos?' },
};

/* Ocho principios agrupados en tres preguntas */
export const principios: Pagina = {
  id: 'pd-principios',
  titulo: 'Ocho principios,', destaque: 'tres preguntas',
  bajada: 'Para qué y cuánto, cómo se cuidan y quién responde: así se ordenan los principios de la ley.',
  inicio: 'la ley ordena todo el tratamiento con ocho principios',
  frases: [
    'agruparlos en tres preguntas', 'la primera pregunta es para qué y cuánto', 'el principio de licitud y lealtad', 'el principio de finalidad',
    'el principio de proporcionalidad', 'la segunda pregunta es cómo se cuidan', 'el principio de calidad', 'el de seguridad',
    'y el de confidencialidad', 'la tercera pregunta es quién responde', 'el principio de responsabilidad', 'y el de transparencia',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Para qué y cuánto', texto: 'Licitud y lealtad, finalidad específica y proporcionalidad: solo los datos necesarios y por el tiempo necesario.', frase: 'la primera pregunta' },
    { rotulo: 'Cómo se cuidan', texto: 'Calidad (datos exactos y actuales), seguridad y confidencialidad, incluso después de terminada la relación.', frase: 'la segunda pregunta' },
    { rotulo: 'Quién responde', texto: 'Responsabilidad por cumplir todos los principios, y transparencia precisa, clara, inequívoca y gratuita.', frase: 'la tercera pregunta', destacada: true },
  ],
  pregunta: { frase: 'de estas tres preguntas', texto: 'De estas tres preguntas, ¿cuál respondería tu agencia con más dificultad?' },
};
