import type { Pagina } from '../influencia/tipos';

/* El derecho de oposición y su propagación a toda la cadena */
export const oposicion: Pagina = {
  id: 'pd-oposicion',
  titulo: 'El derecho de', destaque: 'oposición',
  bajada: 'El titular puede oponerse al marketing directo, al interés legítimo y a los datos de fuentes públicas. Y su baja debe llegar a todos.',
  inicio: 'en las campañas la herramienta que más poder',
  frases: [
    'el derecho de oposición', 'mercadotecnia o marketing directo', 'incluida la elaboración de perfiles', 'cuando la base legal es el interés legítimo',
    'motivos legítimos imperiosos', 'los datos vienen de una fuente de acceso público', 'debe informarles los cambios',
    'una baja recibida en un canal', 'incluidas las agencias y plataformas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Tres casos', texto: 'Marketing directo (con perfiles), interés legítimo salvo motivos imperiosos, y datos de fuentes públicas sin otro fundamento.', frase: 'mercadotecnia o marketing directo' },
    { rotulo: 'Avisar a quien recibió', texto: 'Si el responsable comunicó los datos, debe informar a esos destinatarios los cambios por oposición, rectificación o supresión.', frase: 'debe informarles los cambios' },
    { rotulo: 'Una baja, todos los canales', texto: 'La baja recibida en un canal tiene que llegar a las agencias y plataformas de cada campaña.', frase: 'una baja recibida en un canal', destacada: true },
  ],
  pregunta: { frase: 'si alguien se diera de baja hoy', texto: 'Si alguien se diera de baja hoy del correo de un cliente, ¿cuánto tardaría en llegar a sus campañas de anuncios?' },
};

/* Perfiles y decisiones automatizadas */
export const perfiles: Pagina = {
  id: 'pd-perfiles',
  titulo: 'Perfiles y', destaque: 'decisiones automáticas',
  bajada: 'Nadie debe quedar sujeto a una decisión solo automatizada con efectos importantes, y siempre debe poder pedir revisión humana.',
  inicio: 'la segunda regla que cambia las campañas son los perfiles',
  frases: [
    'toda forma de tratamiento automatizado', 'evaluar analizar o predecir', 'la situación económica la salud', 'derecho a oponerse y a no ser objeto',
    'efectos jurídicos o lo afectan significativamente', 'hay tres excepciones', 'incluso en esas excepciones', 'a la intervención humana',
    'solicitar la revisión de la decisión', 'informar en su política la lógica', 'exige una evaluación de impacto',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Qué es un perfil', texto: 'Tratamiento automatizado que evalúa o predice situación económica, salud, preferencias, intereses, fiabilidad, comportamiento o ubicación.', frase: 'toda forma de tratamiento automatizado' },
    { rotulo: 'Tres excepciones', texto: 'Necesaria para un contrato, consentimiento previo y expreso, o que la ley lo señale con salvaguardas.', frase: 'hay tres excepciones' },
    { rotulo: 'Siempre, una persona', texto: 'Información, explicación, intervención humana, expresar su punto de vista y pedir revisión. La lógica se informa en la política.', frase: 'incluso en esas excepciones', destacada: true },
  ],
  pregunta: { frase: 'en los modelos que tus clientes aplican', texto: 'En los modelos que tus clientes aplican para puntuar o filtrar personas, ¿hay alguien capaz de explicar y revisar cada decisión?' },
};

/* Comprar, compartir o recibir una base: la cesión */
export const cesion: Pagina = {
  id: 'pd-cesion',
  titulo: 'Comprar o', destaque: 'ceder una base',
  bajada: 'Ceder exige una base legal y un contrato escrito. Sin el consentimiento necesario, la cesión es nula y los datos se suprimen.',
  inicio: 'comprar compartir o recibir una base de datos',
  frases: [
    'la ley lo llama cesión', 'con el consentimiento del titular y para cumplir', 'necesaria para un contrato', 'existe un interés legítimo del cedente',
    'o cuando la ley lo dispone', 'debe constar por escrito', 'pasa a ser responsable para todos los efectos', 'la cesión es nula',
    'debe suprimir todos los datos recibidos', 'una regla sobre el enriquecimiento de bases', 'quedan protegidos por el deber de secreto',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Cuatro bases para ceder', texto: 'Consentimiento del titular, contrato del que es parte, interés legítimo del cedente o del cesionario, o que la ley lo disponga.', frase: 'con el consentimiento del titular' },
    { rotulo: 'Por escrito', texto: 'Partes, datos, finalidades y condiciones. Quien recibe pasa a ser responsable y solo trata los datos para esos fines.', frase: 'debe constar por escrito' },
    { rotulo: 'Si falta el consentimiento', texto: 'La cesión es nula y el cesionario suprime todo. Lo que se arma combinando datos públicos queda bajo secreto.', frase: 'la cesión es nula', destacada: true },
  ],
  pregunta: { frase: 'si un cliente quisiera comprar una base', texto: 'Si un cliente quisiera comprar una base para su próxima campaña, ¿qué documentos le pedirías al vendedor antes de cargarla?' },
};

/* Scraping: extraer datos de la web también es tratamiento */
export const scraping: Pagina = {
  id: 'pd-scraping',
  titulo: 'El', destaque: 'scraping',
  bajada: 'Un dato visible no es un dato libre: extraer, ordenar y cruzar datos públicos necesita una base legal y cumplir los principios.',
  inicio: 'muchas bases comerciales se arman hoy',
  frases: [
    'lo que se conoce como scraping', 'recolectar ordenar guardar y cruzar datos es tratamiento', 'no confundir un dato visible con un dato libre',
    'cualquier persona puede consultar en forma lícita', 'no aparece entre las fuentes de licitud', 'por proporcionalidad solo se extraen',
    'por calidad los datos deben ser exactos', 'el resultado queda bajo el deber de secreto', 'si la extracción captura datos sensibles',
    'tratar de forma masiva los registros electrónicos', 'exige una evaluación de impacto antes de empezar',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Visible no es libre', texto: 'Las fuentes de acceso público también quedan sometidas a la ley, y ser público no es por sí solo una fuente de licitud.', frase: 'no confundir un dato visible' },
    { rotulo: 'Los principios', texto: 'Solo lo necesario, datos exactos y actuales, y lo combinado queda bajo secreto. Los sensibles, solo si el titular los hizo manifiestamente públicos.', frase: 'por proporcionalidad solo se extraen' },
    { rotulo: 'Masivo', texto: 'Extraer en masa registros de infracciones de organismos públicos es gravísimo. El scraping a gran escala exige evaluación de impacto.', frase: 'tratar de forma masiva', destacada: true },
  ],
  pregunta: { frase: 'si la agencia te preguntara con qué fundamento', texto: 'Si la Agencia te preguntara con qué fundamento extrajiste cada contacto de una base, ¿qué responderías?' },
};

/* Prospección en frío */
export const prospeccion: Pagina = {
  id: 'pd-prospeccion',
  titulo: 'La prospección', destaque: 'en frío',
  bajada: 'Se apoya en el interés legítimo, con tres condiciones y cuatro reglas prácticas. Vale igual entre empresas.',
  inicio: 'la prospección en frío escribir o llamar',
  frases: [
    'la fuente de licitud disponible es el interés legítimo', 'la primera el tratamiento no puede afectar', 'la segunda el interés legítimo debe declararse',
    'la tercera el titular puede oponerse', 'cada contacto debe guardarse con su origen', 'una oposición recibida en una llamada',
    'si el prospecto responde y pide una cotización', 'esos datos deben suprimirse o anonimizarse', 'un prospecto que nunca respondió',
    'estas reglas valen igual en la prospección entre empresas',
  ],
  els: [],
  tarjetas: [
    { rotulo: 'Tres condiciones', texto: 'No afectar los derechos del titular, declarar el interés legítimo en la política y respetar su oposición en cualquier momento.', frase: 'la primera el tratamiento' },
    { rotulo: 'Cuatro reglas', texto: 'Guardar el origen de cada contacto, propagar las oposiciones, suprimir cotizaciones sin negocio y no retener para siempre a quien no respondió.', frase: 'cada contacto debe guardarse' },
    { rotulo: 'También entre empresas', texto: 'El contacto de una persona dentro de otra empresa es un dato personal.', frase: 'estas reglas valen igual', destacada: true },
  ],
  pregunta: { frase: 'en tu próxima secuencia de correos en frío', texto: 'En tu próxima secuencia de correos en frío, ¿podrías decirle a cada destinatario de dónde sacaste su dato y cómo darse de baja?' },
};
