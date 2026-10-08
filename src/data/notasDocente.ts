import { notasMeddpicc } from './notasMeddpicc';
import { notasSpin } from './notasSpin';
import { notasKahneman } from './notasKahneman';
import { notasChallenger } from './notasChallenger';
import { notasTrampas } from './notasTrampas';
import { notasEquipos } from './notasEquipos';

/**
 * Guión del presentador para la clase "La Ciencia de Vender" (ventas avanzado).
 *
 * Cada entrada es el guión que el presentador lee/apoya mientras expone una
 * diapositiva (clave = id de diapositiva). ~2-3 minutos por diapositiva de contenido.
 *
 * REGLAS DE ESTILO (aplican a toda clase nueva que se cree):
 *  1. El guión LEE y COMPLEMENTA el contenido visible de la diapositiva: retoma sus
 *     títulos y frases, y a partir de ahí profundiza. No es un texto aparte, es la
 *     narración de lo que se ve en pantalla.
 *  2. Siempre en 2.ª persona del singular, como si hablaras a UNA sola persona
 *     ("tú"), y en lenguaje neutro de género (evita adjetivos tipo "listo/preparado").
 *  3. Termina con UNA sola pregunta abierta (sin etiquetas como "Pregunta para la
 *     clase"); va en <em> para distinguirla.
 *  4. Hilo conductor del curso: pensamiento crítico. Como vendedor también te pueden
 *     persuadir metodologías que "suenan" sólidas pero sin respaldo empírico; el
 *     criterio es la defensa.
 *
 * El contenido es HTML editable: el presentador puede modificarlo, resaltar y guardar
 * desde el modal o desde el Modo presentador. Estos textos son el punto de partida.
 */

export const notasPorDiapositiva: Record<string, string> = {
  /* ------------------------------------------------------------------ */
  'mv-slide-0': `
<p>Lo que ves en pantalla es el título de todo lo que vamos a recorrer: <strong>"La Ciencia de Vender"</strong>. Y debajo, la promesa: metodologías, autores y evidencia empírica <em>detrás</em> del arte de vender.</p>
<p>Fíjate en la última línea: "de oficio intuitivo a disciplina científica". Ese es justo el viaje que vas a hacer hoy. Vender empezó siendo un oficio de intuición y carisma, y terminó convertido en algo que se estudia, se mide y se investiga.</p>
<p>Piénsalo un momento: has visto cientos de consejos de ventas —videos, publicaciones, cursos que prometen "la técnica infalible para cerrar cualquier trato"—. El problema es que casi nunca te dicen <strong>en qué se basan</strong>.</p>
<p>Mi meta no es darte una lista de trucos, sino algo más valioso: <span style="background-color:#fde68a">criterio para distinguir lo que tiene respaldo real de lo que solo tiene buen marketing.</span> Porque tú, que aprendes a persuadir, eres también un objetivo fácil de la persuasión ajena.</p>
<p><em>¿En qué te has basado hasta hoy para decidir si una técnica de ventas "funciona"?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-arte-ciencia': `
<p>En esta diapositiva tienes un interruptor entre <strong>"El Mito"</strong> y <strong>"La Evidencia"</strong>. Empecemos por el mito, porque seguro lo has escuchado.</p>
<p>Dice que <strong>"el vendedor nace, no se hace"</strong>, que vender es <strong>puro carisma</strong> y que <strong>no se puede medir</strong>. Suena convincente, pero mira de dónde sale: recordamos al vendedor estrella y asumimos que su carisma causa sus resultados. Eso es una anécdota, no un dato.</p>
<p>Ahora mueve el interruptor a "La Evidencia". Lo que aparece lo cambia todo: ya en 1880 <strong>Patterson</strong>, en NCR, demostró que el comportamiento de venta <strong>se puede codificar</strong> —con guiones y formación— y sus vendedores duplicaban resultados. Un siglo después, <strong>Dubinsky</strong> lo <strong>midió</strong> con estadística. Y hace más de 40 años que esto se <strong>estudia en la universidad</strong>.</p>
<p>Quédate con la frase del pie: <span style="background-color:#bbf7d0">si algo se puede enseñar, medir y replicar, no es magia: es método.</span> Y si es método, tú también puedes aprenderlo.</p>
<p><em>¿Qué parte de lo que haces bien al vender crees que es "don"… y qué parte podrías enseñarle a otra persona paso a paso?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-que-es-ciencia': `
<p>Para mí, esta es la diapositiva más importante del día. Mira el dibujo de la izquierda: cuatro columnas sostienen el bloque que dice "Ciencia". Cada columna es una de las <strong>cuatro exigencias</strong> que separan el conocimiento verificable de la simple opinión comercial; si falta una, todo se cae. Son tu filtro personal.</p>
<p>La primera, <strong>evidencia empírica</strong>: conclusiones basadas en datos, no en anécdotas. Mira el ejemplo que acompaña: SPIN no nació de una corazonada, sino de analizar <strong>35.000 llamadas reales</strong>.</p>
<p>La segunda, <strong>revisión por pares</strong>: antes de publicarse, otros expertos revisan y critican el estudio. Por eso aparecen esas revistas —JPSSM, Journal of Marketing, JAMS—. Si una afirmación solo vive en la web de quien la vende, no pasó ese filtro.</p>
<p>La tercera, <strong>replicabilidad</strong>: un estudio aislado puede ser casualidad; cuando el resultado se repite —como el meta-análisis de SOCO sobre <strong>25 años</strong>— la confianza se dispara.</p>
<p>Y la cuarta, <strong>constructos validados</strong>: se mide con escalas probadas, como SOCO (24 ítems) o ADAPTS (16). <span style="background-color:#fde68a">Guárdate estas preguntas: ¿hay evidencia?, ¿quién la revisó?, ¿se ha replicado?</span></p>
<p><em>Si mañana alguien te presenta su método de ventas, ¿cuál de estas cuatro preguntas le harías primero?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-academia-consultoras': `
<p>Mira el título: <strong>"Dos mundos que se necesitan"</strong>. A la izquierda, la academia; a la derecha, las consultoras; y en medio, la clave.</p>
<p>Las <strong>consultoras</strong> —Sandler, Miller Heiman, Challenger— se mueven rápido y te dan recetas prácticas, fáciles de aplicar. Eso es útil. Pero fíjate en un detalle que no debes olvidar: <span style="background-color:#fbcfe8">ganan dinero si tú crees en su método.</span> No las descarta, pero te obliga a mirar su evidencia con más cuidado.</p>
<p>La <strong>academia</strong> —Saxe, Weitz, Terho, Vargo— es más lenta y menos vistosa, pero no gana nada con que el método funcione o no. Su único interés es la verdad verificable.</p>
<p>El recuadro del centro resume lo que te recomiendo hacer: usa los marcos prácticos, pero pásalos por el filtro de la evidencia. Es justo lo que hizo la academia: <strong>asimiló SPIN</strong> porque resistió, y <strong>cuestionó Challenger</strong> porque no del todo.</p>
<p><em>Cuando leas la próxima metodología de ventas, ¿te atreves a preguntarte quién gana dinero si tú te la crees?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-header-evolucion': `
<p>Lo que viene ahora es una línea de tiempo. Quiero que veas una cosa: la investigación en ventas tiene más de cien años y no se ha quedado quieta.</p>
<p>Mientras avanzamos, quédate con esta idea: las metodologías no son verdades eternas; son <strong>respuestas</strong> a un momento y a un tipo de comprador.</p>
<p><em>¿Te fijas cómo cada época respondió al contexto que le tocó?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-timeline': `
<p>Aquí tienes cuatro eras y puedes abrirlas una a una. Fíjate en el patrón mientras las recorres: <strong>cada vez que cambia el entorno, cambia el método</strong>.</p>
<p>En la <strong>primera era</strong>, con la producción en masa, todo era empujar y cerrar a presión. En la <strong>segunda</strong>, con compradores más informados, aparece un hallazgo incómodo y <em>medido</em>: la alta presión no funciona a largo plazo, destruye valor; por eso nace la orientación al cliente.</p>
<p>En la <strong>tercera</strong>, Internet borra la ventaja de información del vendedor y toca demostrar <strong>valor en dinero</strong>. Y en la <strong>cuarta</strong>, la de hoy, hablamos de ecosistemas, comités de compra e inteligencia artificial.</p>
<p><span style="background-color:#bfdbfe">La conclusión que quiero que te lleves: una técnica brillante en 1970 puede ser contraproducente hoy. El contexto manda.</span></p>
<p><em>¿En qué era dirías que encaja la forma en que te han enseñado a vender hasta ahora?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-autores': `
<p>Estas tarjetas son, literalmente, las pruebas. Cuando te digo que la venta tiene respaldo científico, me refiero a cosas concretas como estas.</p>
<p><strong>SOCO</strong>, de Saxe y Weitz (1982): una escala de 24 ítems para medir si te orientas al cliente o solo a cerrar, sostenida por un meta-análisis de 25 años. <strong>ADAPTS</strong>, de Spiro y Weitz (1990): demuestra que adaptar tu estilo a cada cliente supera al guion rígido. <strong>Value-Based Selling</strong>, de Terho y su equipo: traducir el beneficio a dinero sube la conversión. Y la <strong>Lógica de Servicios</strong> (2018): el valor se co-crea con el cliente.</p>
<p>Fíjate en lo que acompaña a cada tarjeta: autor, año y la revista donde se publicó. <span style="background-color:#fde68a">24 ítems, 25 años, miles de vendedores, revisión antes de publicar.</span> Compara ese peso con el de un "confía en mí, esto funciona".</p>
<p><em>¿Notas la diferencia de solidez entre una escala validada durante décadas y un consejo viral de treinta segundos?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-header-metodologias': `
<p>Ahora llegan las metodologías famosas: las que de verdad vas a escuchar nombrar en tu trabajo.</p>
<p>Te propongo un trato para escucharlas: le vamos a dar a cada una la oportunidad de explicarse… y, a la vez, le vamos a revisar su respaldo. Escuchar sin tragar entero.</p>
<p><em>¿Cuántas de las que vienen crees que podrás reconocer?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-metodologias': `
<p>En esta diapositiva puedes ir abriendo cinco metodologías, y cada una trae lo mismo: <strong>autor, año y una idea central</strong>. Solo eso ya las separa de un consejo anónimo de redes.</p>
<p><strong>SPIN</strong> (Rackham, 1988) te dice que preguntes en vez de presionar, y lo respalda con 35.000 llamadas. <strong>Challenger</strong> (2011) propone "desafiar" al cliente, con un estudio de más de 6.000 vendedores… aunque enseguida verás un matiz. <strong>Consultative</strong> (Hanan, 1970) te pide actuar como consultor de negocio. <strong>Miller Heiman</strong> (1985) aportó los roles de compra. Y <strong>Sandler</strong> (1967) trae la psicología del desapego y descalificar pronto.</p>
<p>Fíjate en un detalle fino que casi nadie menciona: <span style="background-color:#fbcfe8">tener un libro y un estudio no es lo mismo que estar validado por pares.</span> Un estudio hecho por la propia consultora no equivale a una replicación académica independiente.</p>
<p><em>De estas cinco, ¿cuál habías oído nombrar, y sabías que tenía un autor y un año detrás?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-spin-challenger': `
<p>Esto es el pensamiento crítico en acción, y la diapositiva lo muestra con dos columnas: una validada y otra cuestionada.</p>
<p>A la izquierda, <strong>SPIN</strong> pasó el examen: encaja con lo que ya sabíamos (la orientación al cliente), no se basa en coacción sino en preguntas que ayudan al cliente a descubrir su necesidad. Por eso la academia lo adoptó.</p>
<p>A la derecha, <strong>Challenger</strong>. Y aquí está lo interesante: vendió millones de libros, es un éxito comercial enorme. Pero investigadores, en una revista revisada por pares, le encontraron debilidades: parte de crear "tensión" y tomar el control, algo que choca con la venta adaptativa e ignora que el comprador de hoy ya llega informado.</p>
<p>Subraya la frase del pie, porque es la lección del día: <span style="background-color:#fde68a">popularidad no es lo mismo que validez.</span> Un bestseller con un estudio llamativo puede seguir estando equivocado para tu caso. De esta trampa justamente te quiero proteger.</p>
<p><em>Si un método te convence por lo bien que suena, ¿cómo comprobarías si de verdad funciona antes de aplicarlo con un cliente?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-header-psicologia': `
<p>Para entender por qué un método funciona o fracasa, hay que mirar el órgano que decide la compra: el cerebro.</p>
<p>Y aquí entra un personaje que conecta las ventas con el premio más prestigioso de la economía.</p>
<p><em>¿Imaginas que quien más te puede enseñar sobre vender no fuera un vendedor?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-kahneman': `
<p>La persona de esta diapositiva es <strong>Daniel Kahneman</strong>, y lo que ves junto a su nombre no es un error: era <strong>psicólogo</strong> y ganó el <strong>Premio Nobel de Economía en 2002</strong>. Detente en lo insólito: un psicólogo le demostró a los economistas que las personas <strong>no decidimos de forma puramente racional</strong>.</p>
<p>Su idea más útil para ti está en la primera tarjeta: convivimos con dos sistemas. El <strong>Sistema 1</strong> es rápido, intuitivo y emocional; el <strong>Sistema 2</strong>, lento y racional. La mayoría de las compras empiezan en el Sistema 1, y luego el 2 las justifica.</p>
<p>De ahí salen las otras tarjetas: <span style="background-color:#bbf7d0">la aversión a la pérdida —perder duele casi el doble que ganar—</span>, el anclaje (el primer número manda) y el encuadre (la misma información cambia según cómo la presentes).</p>
<p>Una nota importante: estas herramientas son potentes. Úsalas para comunicar valor con honestidad, no para manipular. Y reconócelas cuando las usen contigo: ese "antes 100, ahora 60" es un ancla trabajando sobre tu propio cerebro.</p>
<p><em>Si perder pesa el doble que ganar, ¿cómo cambiarías la forma en que le presentas tu oferta a un cliente?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-header-cualificacion': `
<p>Última parada. Ya sabes que vender es una disciplina. Pero tu recurso más escaso es el tiempo: ¿a qué oportunidades se lo dedicas?</p>
<p>La respuesta profesional no es "a la que me dé buena espina", sino cualificar con rigor.</p>
<p><em>¿Cuánto tiempo crees que pierdes hoy en oportunidades que nunca iban a cerrarse?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-bant-meddpicc': `
<p>Tienes dos formas de decidir si una oportunidad merece tu esfuerzo, y la diapositiva las enfrenta.</p>
<p>A la izquierda, <strong>BANT</strong> (de IBM): Presupuesto, Autoridad, Necesidad y Cronograma. Es un filtro rápido, perfecto para descartar en minutos cuando tienes muchos contactos.</p>
<p>A la derecha, <strong>MEDDPICC</strong>: ocho variables, una auditoría casi quirúrgica del negocio. Más trabajo, pero mucho más fino para ventas complejas. ¿Por qué supera a BANT ahí? Porque tratar la "Autoridad" como un sí o un no falla cuando <strong>compra un comité</strong>: nadie decide solo. MEDDPICC te obliga a mapear esa red real de decisión.</p>
<p><span style="background-color:#bfdbfe">No compiten: BANT filtra temprano y rápido; MEDDPICC gobierna tus cuentas estratégicas.</span> Un apunte crítico: ese "+25-30% de cierre" míralo con la misma lupa; pero la lógica de fondo —identificar a todos los que deciden— coincide con lo que la academia ya validó.</p>
<p><em>Piensa en tu última venta importante: ¿sabías de verdad quién tenía el poder de decir que no?</em></p>`,

  /* ------------------------------------------------------------------ */
  'mv-cierre': `
<p>Cerramos donde empezamos, pero con otra mirada. El título lo resume: <strong>vender es una disciplina científica</strong>. Y abajo tienes el recorrido completo: evidencia empírica, autores, métodos validados, psicología de la decisión y cualificación con rigor.</p>
<p>Si te llevas una sola cosa de hoy, que sea esta: ahora tienes <strong>criterio</strong>. La próxima vez que aparezca la metodología de moda, no la tragues entera ni la rechaces de golpe.</p>
<p>Haz lo que dice la frase destacada: <span style="background-color:#fde68a">pregúntate si hay evidencia, si fue revisada por pares, si se ha replicado, si encaja en tu contexto y quién gana si tú te la crees.</span></p>
<p>Ese filtro te protege a ti y, sobre todo, protege a tus clientes de recomendaciones sin fundamento. Recuerda: sabes persuadir, y por eso el criterio es tu mejor defensa. Vender bien es, antes que nada, pensar bien.</p>
<p><em>¿Qué creencia sobre las ventas que traías al entrar hoy te vas a atrever a cuestionar a partir de ahora?</em></p>`,

  // Guiones de otras clases, cada uno en su propio archivo.
  ...notasEquipos,
  ...notasMeddpicc,
  ...notasSpin,
  ...notasKahneman,
  ...notasChallenger,
  ...notasTrampas,
};
