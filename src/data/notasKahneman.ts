/**
 * Guión del presentador — clase "Pensar rápido, pensar despacio" (prefijo kn-).
 * Fuentes: briefing, guía de estudio y compendio aportados por el usuario; el
 * estado de la evidencia (kn-replicacion) se verificó aparte.
 * Reglas: lee y complementa la diapositiva, 2.ª persona del singular, neutro de
 * género, una sola pregunta abierta final en <em>.
 */

export const notasKahneman: Record<string, string> = {
  'kn-slide-0': `
<p>Las dos figuras que ves son los protagonistas de esta clase: el <strong>Sistema 1</strong>, que se mueve rápido y nervioso, y el <strong>Sistema 2</strong>, que apenas flota. No son zonas del cerebro: son dos modos de operar que Kahneman convirtió en personajes para poder hablar de ellos.</p>
<p>Arriba está la credencial: <strong>Daniel Kahneman, Premio Nobel de Economía en 2002</strong>, un psicólogo que nunca tomó un curso de economía. Y abajo, la tesis incómoda del libro: tu mente comete errores <strong>predecibles</strong>. No por falta de inteligencia ni por un mal día, sino por cómo está construida.</p>
<p>Esta clase conversa con las otras del curso. En La Ciencia de Vender viste a Kahneman de pasada; aquí vamos a fondo. Y la última sección es la que más me importa: qué pasó con esta investigación cuando otros laboratorios intentaron repetirla.</p>
<p><em>¿Recuerdas alguna decisión que tomaste muy seguro y que después resultó claramente equivocada?</em></p>`,

  'kn-origen': `
<p>El título dice lo que está en juego: esta colaboración <strong>cambió la idea de racionalidad</strong>. Recorre los cuatro bloques, que suben como una escalera.</p>
<p><strong>1969</strong>: Kahneman invita a Amos Tversky a su seminario en la Universidad Hebrea de Jerusalén. <strong>1974</strong>: publican en <em>Science</em> "Judgment Under Uncertainty", donde documentan unos veinte sesgos. <strong>1979</strong>: la teoría de las perspectivas, que funda la economía conductual. <strong>2002</strong>: el Nobel. Y ahí un detalle que conviene decir en voz alta: <span style="background-color:#fde68a">Tversky lo habría compartido, pero murió en 1996 y el Nobel no se concede póstumamente.</span></p>
<p>Fíjate en la tarjeta del giro conceptual, porque es la clave. Antes se pensaba que el humano es racional y que las emociones lo desvían. Ellos mostraron otra cosa: <strong>la propia maquinaria cognitiva se equivoca</strong>, de forma sistemática y predecible, aun con la cabeza fría.</p>
<p>Y el pie recuerda la ambición declarada del libro, que es sorprendentemente modesta: enriquecer tu vocabulario para nombrar errores de juicio.</p>
<p><em>¿Qué cambiaría en tu trabajo si asumieras que tus errores de juicio no son accidentes, sino patrones repetibles?</em></p>`,

  'kn-header-arquitectura': `
<p>Primera sección: <strong>la arquitectura de la mente</strong>. Vas a conocer a los dos sistemas, ver por qué uno no se puede apagar, medir el esfuerzo mental desde fuera y descubrir por qué el supervisor de tu cabeza firma sin leer.</p>
<p>Un aviso: aquí no hay nada de "usar el 10% del cerebro" ni de hemisferios. Es psicología experimental, con números.</p>
<p><em>Antes de empezar, ¿qué tan seguro dirías que tienes el control de lo que piensas?</em></p>`,

  'kn-dos-sistemas': `
<p>Aquí están los <strong>dos personajes</strong>. A la izquierda el Sistema 1, que pulsa y se mueve rápido; a la derecha el Sistema 2, que casi no se mueve. Toca cada dimensión arriba y mira cómo cambia la comparación.</p>
<p>Lo esencial: el <strong>Sistema 1</strong> es instantáneo, no consume atención consciente, trabaja por asociación, suprime la duda y maneja promedios. El <strong>Sistema 2</strong> es lento, consume glucosa y se fatiga, aplica reglas y sostiene la incertidumbre.</p>
<p>Pero quédate con la tarjeta de abajo, porque es la idea más desconcertante del libro: <span style="background-color:#bbf7d0">tú te identificas con el Sistema 2, el que habla y razona y cree decidir; pero el protagonista de casi todos tus juicios cotidianos es el Sistema 1.</span> El Sistema 2 se cree el director de la película y muchas veces es solo el relator que explica después lo que ya ocurrió.</p>
<p>Y una precisión honesta: estos sistemas no existen como órganos. Son una ficción útil, y Kahneman lo dice sin problema.</p>
<p><em>Si alguien grabara tus decisiones de una semana, ¿cuántas dirías que pasaron realmente por tu Sistema 2?</em></p>`,

  'kn-interaccion': `
<p>El título lo resume: <strong>el Sistema 1 no tiene interruptor</strong>. Los dos están siempre encendidos; lo que cambia es cuánta atención entrega el Sistema 2, y su presupuesto es limitado.</p>
<p>Recorre los cuatro bloques. <strong>Sugerencia</strong>: el Sistema 1 produce impresiones sin parar. <strong>Anomalía</strong>: algo no encaja, como en el test de Stroop, donde la palabra "rojo" escrita en verde te hace tropezar. <strong>Movilización</strong>: se activa la tensión cognitiva y el Sistema 2 despierta. <strong>Control</strong>: reprime el impulso… o sucumbe.</p>
<p>A la derecha, dos clásicos. El <strong>gorila invisible</strong>: contando pases de baloncesto, la mitad de los espectadores no ve a una persona disfrazada de gorila que cruza la cancha durante nueve segundos. Y lo más interesante es lo segundo: <span style="background-color:#bfdbfe">no solo están ciegos, están ciegos a su propia ceguera</span>; les cuesta creer que se lo perdieron. La <strong>ilusión de Müller-Lyer</strong>: mides las líneas con una regla, compruebas que son iguales, y las sigues viendo distintas.</p>
<p>De ahí el pie, que es la estrategia completa del libro: no puedes corregir al Sistema 1 desde dentro, pero sí reconocer los terrenos donde suele fallar.</p>
<p><em>¿En qué situación de tu trabajo te convendría asumir que estás viendo menos de lo que crees?</em></p>`,

  'kn-esfuerzo': `
<p>Esta diapositiva muestra algo elegante: <strong>cómo medir el pensamiento desde fuera</strong>. Kahneman y Jackson Beatty descubrieron que la pupila funciona como el contador de la luz de la mente. Toca las tres fases y mira cómo se dilata y vuelve.</p>
<p>Los números son de la tarea "Suma-3", donde debes ir transformando secuencias de dígitos a un ritmo fijo: las pupilas se dilatan hasta un <strong>50%</strong>, el pulso sube unas <strong>7 pulsaciones por minuto</strong>, sube la presión y se tensan los músculos. Y todo vuelve a la línea base <strong>en el instante</strong> en que resuelves o abandonas. Por eso podían saber, mirando el ojo, el momento exacto en que alguien se rendía.</p>
<p>Abajo, dos consecuencias. La <strong>ley del mínimo esfuerzo</strong>: entre varias formas de llegar al mismo lugar, vas a tomar la más barata en energía. Y algo más bonito: <span style="background-color:#bbf7d0">la destreza abarata el pensamiento.</span> A medida que dominas algo, la pupila se dilata menos. El talento también se mide en energía que no gastas.</p>
<p><em>¿Qué tarea de tu trabajo te cansa hoy mucho más de lo que te cansaba hace un año, o al revés?</em></p>`,

  'kn-perezoso': `
<p>Aquí viene la parte incómoda: el <strong>controlador perezoso</strong>. El Sistema 2 debería supervisar al Sistema 1, pero en la práctica aprueba sus sugerencias con el mínimo esfuerzo. Son tres problemas y conviene que los resuelvas tú antes de revelar la respuesta.</p>
<p>El <strong>bate y la pelota</strong>: si la pelota costara 10 centavos, el bate costaría 1,10 y el total sería 1,20. La respuesta es 5 centavos. Lo notable es quiénes fallan: <span style="background-color:#fde68a">más de la mitad de los estudiantes de Harvard, el MIT y Princeton responde 10 centavos.</span> No es un problema de capacidad.</p>
<p>El <strong>silogismo de las rosas</strong> es inválido, pero suena verdadero, y eso basta para que el Sistema 2 lo apruebe sin revisar la estructura. Y <strong>Michigan y Detroit</strong>: la gente estima menos homicidios para todo el estado que para una sola de sus ciudades, porque el Sistema 2 no se molesta en recordar que Detroit está dentro de Michigan.</p>
<p>El pie trae la distinción de Keith Stanovich que vale la clase entera: una cosa es la <strong>mente algorítmica</strong>, lo que mide un test de inteligencia, y otra la <strong>mente reflexiva</strong>, la disposición a revisar tu primera respuesta. Son independientes, y la segunda se entrena.</p>
<p><em>Cuando apareció la respuesta intuitiva en tu cabeza, ¿qué te habría hecho falta para detenerte a verificarla?</em></p>`,

  'kn-agotamiento': `
<p>Este es el estudio más citado del libro y también uno de los más discutidos, así que lo vamos a mirar con cuidado. La idea de Roy Baumeister es que el autocontrol, el esfuerzo mental y la regulación emocional beben de un <strong>mismo depósito</strong>.</p>
<p>Las barras son el estudio de los jueces de libertad condicional en Israel: más de mil decisiones, y la proporción de resoluciones favorables caía a lo largo de cada sesión y se recuperaba después de comer. La lectura de Kahneman: el juez cansado toma la decisión por defecto, que es <strong>denegar</strong>.</p>
<p>Ahora mira la tarjeta ámbar, porque es lo que el libro no alcanzó a incorporar. <span style="background-color:#fde68a">El orden de los casos no era aleatorio: el tribunal agrupa por prisión y los presos con abogado se ven antes.</span> Y la replicación multi-laboratorio del agotamiento del ego, con 23 equipos y 2.141 personas, encontró un efecto prácticamente nulo. Volveremos a esto al final de la clase.</p>
<p>Fíjate igual en la última tarjeta: el consejo práctico sobrevive aunque el mecanismo esté en duda. No decidas lo importante al final de una jornada de reuniones. Cuesta poco y no depende de que la teoría sea correcta.</p>
<p><em>¿A qué hora del día sueles tomar tus decisiones más importantes, y por qué a esa hora?</em></p>`,

  'kn-header-asociativa': `
<p>Segunda sección: <strong>la máquina asociativa</strong>. Vas a ver cómo trabaja el Sistema 1 por dentro: cómo una palabra arrastra una cascada de ideas, emociones y hasta gestos; por qué lo fácil de leer se siente verdadero; y por qué tu mente inventa causas donde solo hay azar.</p>
<p>Aquí están también los experimentos más famosos del libro, y los más frágiles. Los vamos a ver primero como los cuenta Kahneman, y después les pasaremos la cuenta.</p>
<p><em>¿Qué cosas de tu entorno crees que están influyendo en tus decisiones sin que lo notes?</em></p>`,

  'kn-asociativa': `
<p>Haz el ejercicio antes de explicar nada: lee las dos palabras del bloque central, <strong>«Plátanos Vómito»</strong>. En menos de un segundo pasaron cuatro cosas, y son las cuatro ramas que ves alrededor. Tócalas.</p>
<p>Se activaron conceptos de <strong>memoria</strong> relacionados con náusea y fruta; apareció una <strong>emoción</strong> de disgusto antes de cualquier razonamiento; tu <strong>cuerpo</strong> reaccionó con una mueca y un cambio en la piel que se puede medir; y, sobre todo, construiste una <strong>historia</strong>: alguien comió plátanos y se enfermó. <span style="background-color:#bbf7d0">Nadie te dijo que hubiera una relación entre esas dos palabras.</span> La pusiste tú, automáticamente.</p>
<p>Abajo están las tres leyes de la asociación que David Hume formuló en el siglo XVIII: semejanza, contigüidad y causalidad. Kahneman añade lo que Hume no podía ver: todo esto ocurre fuera de la conciencia, en paralelo, y mucho más rápido de lo que podrías contarlo.</p>
<p><em>¿Qué palabra o imagen de tu sector dispara automáticamente una historia en la cabeza de tus clientes?</em></p>`,

  'kn-priming': `
<p>Estos son los <strong>cinco experimentos de priming</strong> más citados del libro. Y el subtítulo te avisa desde ya: son también los que peor han envejecido. Los vamos a ver como se cuentan, y cada uno lleva su sello de "evidencia en disputa".</p>
<p>El <strong>efecto Florida</strong>: estudiantes arman frases con palabras asociadas a la vejez, sin que aparezca la palabra "viejo", y después caminan más lento. El <strong>lápiz entre los dientes</strong>: sostenerlo fuerza una sonrisa y las viñetas parecen más divertidas, mostrando que el vínculo es bidireccional. El <strong>primado del dinero</strong>: más independencia, menos ayuda, y sillas colocadas a 118 centímetros en lugar de 80. La <strong>caja de la honestidad</strong>: unos ojos impresos sobre la lista de precios y la gente paga casi el triple. Y el <strong>efecto Lady Macbeth</strong>: mentir hablando da ganas de enjuague bucal; mentir escribiendo, de jabón.</p>
<p>Son relatos preciosos y por eso se repiten tanto. <span style="background-color:#fde68a">Guárdalos con el sello puesto</span>: en la sección de pensamiento crítico veremos qué quedó de cada uno.</p>
<p><em>¿Por qué crees que este tipo de experimento se vuelve tan popular tan rápido?</em></p>`,

  'kn-facilidad': `
<p>Esta es una de las ideas más útiles del libro: tu mente lleva encendido un <strong>medidor</strong> de cuánto le cuesta procesar lo que tiene delante. Mueve el selector entre facilidad y tensión y mira cómo cambian las dos columnas.</p>
<p>En <strong>facilidad</strong>: tipografía clara, frases repetidas, lenguaje sencillo, buen humor. ¿La consecuencia? Sensación de verdad y familiaridad, pensamiento creativo… y <span style="background-color:#fbcfe8">menos control, más errores lógicos</span>. En <strong>tensión</strong>: letra borrosa, lenguaje confuso, mal humor. Y entonces: alerta, vigilancia analítica, menos creatividad y menos errores intuitivos.</p>
<p>Lo contraintuitivo es esto: <strong>sentirte cómodo leyendo algo te vuelve más crédulo</strong>. La comodidad no es señal de que el argumento sea bueno; es señal de que es fácil de procesar.</p>
<p>Abajo tienes el experimento estrella de esta idea y su desenlace. Imprimir el test de reflexión en letra gris y borrosa parecía bajar los errores del 90% al 35%. Eran 40 personas. Una réplica con más de 7.000 no encontró nada. Lo dejo aquí a propósito: es un ejemplo perfecto de resultado precioso con muestra diminuta.</p>
<p><em>¿Cuándo fue la última vez que te convenció algo sobre todo por lo bien presentado que estaba?</em></p>`,

  'kn-verdad': `
<p>El título es la conclusión: <strong>lo fácil de procesar se siente verdadero</strong>. Mueve el control de exposiciones y mira cómo el mismo bloque pasa de desconocido a familiar, y de familiar a agradable.</p>
<p>Ese es el <strong>efecto de mera exposición</strong> de Robert Zajonc, y es de los hallazgos sólidos de la clase. Repetir un estímulo arbitrario aumenta el agrado hacia él, incluso si la exposición fue subliminal. Zajonc lo llevó al extremo con <span style="background-color:#bbf7d0">embriones de pollo</span>: expuso huevos a un sonido y, al nacer, los pollitos mostraron menos miedo a ese sonido que a otros nuevos. La explicación es evolutiva: lo repetido que no te hizo daño es seguro.</p>
<p>Al lado, el experimento de Larry Jacoby, "famosos de la noche a la mañana": leer nombres inventados como <em>David Stenbill</em> hace que días después los reconozcas como personas célebres. Tu mente nota la fluidez, no recuerda de dónde viene, y la atribuye a la fama.</p>
<p>Y abajo, cuatro reglas que se desprenden de todo esto: legibilidad alta, lenguaje sencillo, rima si puedes, y fuentes con nombres pronunciables. Dicho sin eufemismos: <strong>son las reglas de la propaganda</strong>. Las ves aquí para reconocerlas cuando las usen contigo.</p>
<p><em>¿Qué idea das por cierta hoy simplemente porque la has escuchado muchas veces?</em></p>`,

  'kn-causalidad': `
<p>El título dice la tesis: <strong>la mente no tolera el azar</strong>. Mira la animación: un bloque toca al otro y ves un empujón. No deduces el empujón, lo <strong>percibes</strong>, tan directamente como percibes un color. Eso es lo que demostró Albert Michotte.</p>
<p>A la derecha, cuatro casos. La <strong>ilusión de Moisés</strong>: "¿cuántos animales metió Moisés en el arca?" pasa sin que nadie se detenga, porque Moisés encaja en el contexto bíblico; fue Noé. <strong>Heider y Simmel</strong>: triángulos moviéndose en una pantalla se convierten de inmediato en un agresor y una víctima. Y los <strong>titulares contradictorios</strong>: el mismo día que capturaron a Sadam Husein, una agencia explicó la subida de los bonos por esa captura y horas después explicó la caída con el mismo hecho.</p>
<p>Fíjate en el pie, porque es un mecanismo precioso: un suceso rarísimo deja de sorprenderte <strong>la segunda vez</strong>, porque la primera ya reescribió tu norma. Así una coincidencia se convierte en expectativa.</p>
<p><span style="background-color:#bfdbfe">Esta facilidad para ver causas es justamente lo que te impide pensar en términos estadísticos</span>, donde muchas cosas simplemente fluctúan.</p>
<p><em>¿Qué resultado de tu trabajo explicas con una causa clara, cuando podría ser simple variación?</em></p>`,

  'kn-header-heuristicas': `
<p>Tercera sección: <strong>los atajos mentales</strong>. Hasta aquí viste cómo funciona la máquina; ahora verás los tres o cuatro atajos concretos con los que resuelve preguntas difíciles sin avisarte.</p>
<p>Empezamos por el mecanismo que está debajo de todos ellos, y que es, en mi opinión, la idea más aprovechable del libro.</p>
<p><em>¿Qué preguntas difíciles respondes rápido en tu trabajo, casi sin pensarlo?</em></p>`,

  'kn-sustitucion': `
<p>Esta es la idea madre de todas las heurísticas: la <strong>sustitución</strong>. El esquema lo muestra: a la izquierda, un bloque grande y gris, la pregunta objetivo, difícil y lenta. A la derecha, uno bajo y naranja, la pregunta heurística, fácil e inmediata. La partícula salta de una a otra, y <span style="background-color:#fde68a">la respuesta de la derecha se presenta en tu conciencia como si fuera la de la izquierda</span>.</p>
<p>Recorre los ejemplos. "¿Debo invertir en Ford?" se convierte en "¿me gustan sus autos?". "¿Qué tan satisfecho estoy con mi vida?" se convierte en "¿de qué humor estoy ahora?". "¿Llegará lejos este político?" se convierte en "¿tiene cara de competente?".</p>
<p>Lo decisivo es que <strong>no notas el cambio</strong>. No sientes que estás respondiendo otra cosa: sientes que respondiste la pregunta original, y con bastante seguridad.</p>
<p>Abajo, las dos aptitudes que lo hacen posible: la <strong>escopeta mental</strong>, que calcula de más sin que se lo pidas, y la <strong>equivalencia de intensidades</strong>, que traduce entre escalas que no tienen nada que ver, como convertir "leía a los cuatro años" en una estatura o en un sueldo.</p>
<p><em>¿Qué pregunta fácil crees que respondes cuando alguien te pide evaluar a una persona?</em></p>`,

  'kn-representatividad': `
<p>Lee el perfil de Steve que está en el subtítulo: tímido, metódico, ordenado, obsesionado con el detalle. ¿Bibliotecario o agricultor? Casi todo el mundo dice bibliotecario.</p>
<p>Ahora toca "Mostrar la tasa base" y mira lo que aparece: <span style="background-color:#fde68a">más de veinte agricultores por cada bibliotecario.</span> Siendo tantos más, es más probable encontrar personas metódicas y ordenadas arriba de un tractor que detrás de un mostrador.</p>
<p>A la derecha ves la sustitución explícita. Pregunta real: ¿cuál es la probabilidad? Pregunta que respondiste: ¿cuánto se parece al estereotipo? El parecido es fácil de evaluar; la probabilidad exige datos que no estaban en la pregunta.</p>
<p>Y fíjate en la última tarjeta, porque es donde esto te cuesta dinero: al contratar. Un candidato que "tiene todo el perfil" puede ser menos probable que uno corriente, si el perfil es raro y el historial objetivo dice otra cosa.</p>
<p><em>¿Qué decisión reciente tomaste porque alguien o algo "tenía todo el perfil"?</em></p>`,

  'kn-disponibilidad': `
<p>La <strong>heurística de disponibilidad</strong> es sencilla de enunciar: para estimar cuán común es algo, tu mente no cuenta, mide la <strong>velocidad</strong> con que le llegan ejemplos. En la escena, la partícula de "lo vívido" salta rápido y la de "lo frecuente" tarda. Y la mente usa esa velocidad como si fuera cantidad.</p>
<p>Compara los pares. Tememos más al <strong>accidente de avión</strong> que a la enfermedad cardiovascular, y más al atentado que al accidente de tránsito. En ambos casos la amenaza real es la segunda, pero la primera ocupa portadas.</p>
<p>El tercer par es el experimento original: ¿hay más palabras que <strong>empiezan</strong> con K o que la llevan en <strong>tercera</strong> posición? Es muchísimo más fácil buscar por la inicial, así que todos dicen la primera. En inglés, la K aparece cerca del doble de veces en tercera posición.</p>
<p>El pie lo lleva a tu trabajo: <span style="background-color:#bfdbfe">presupuestos de riesgo torcidos</span>, mucha protección contra el desastre espectacular y poca contra la amenaza silenciosa que de verdad desgasta.</p>
<p><em>¿Qué riesgo de tu organización recibe más atención de la que merece solo porque sería muy visible?</em></p>`,

  'kn-afectiva': `
<p>Paul Slovic la formuló así: tus gustos y aversiones determinan lo que crees sobre el mundo, y el argumento llega después. Mueve el selector entre "cómo ocurre" y "cómo debería": en el primero el bloque "me gusta" se eleva por encima de los datos.</p>
<p>El caso del libro es brutal por lo concreto. Un directivo financiero invirtió <strong>decenas de millones</strong> en acciones de Ford. ¿Su análisis? Había ido a un salón del automóvil, los coches le encantaron y pensó: "vaya, sí que hacen buenos autos". <span style="background-color:#fbcfe8">Nunca se preguntó si la acción estaba barata</span>, que era la única pregunta pertinente.</p>
<p>A la derecha tienes cómo detectarlo en una reunión: escucha si la respuesta contesta la pregunta. Si alguien aprueba una inversión porque "el producto se ve increíble", puedes nombrarlo.</p>
<p>Y la frase final es importante para no caricaturizar esto: la emoción no interfiere con la decisión. En la mayoría de los casos, <strong>la emoción es la decisión</strong>, y el razonamiento llega a ordenar lo que ya estaba resuelto.</p>
<p><em>¿Qué proyecto defiendes hoy con argumentos que quizá encontraste después de haberlo decidido?</em></p>`,

  'kn-header-sesgos': `
<p>Cuarta sección: <strong>los sesgos del juicio</strong>. Ya conoces la máquina y sus atajos. Ahora vienen tres errores concretos que aparecen todos los días en una empresa: cómo una primera impresión contamina todo lo demás, cómo decides con la información que casualmente tienes delante, y qué calcula tu mente sin que se lo pidas.</p>
<p>Esta es la sección con la que más puedes intervenir mañana mismo en tu organización.</p>
<p><em>¿Cómo evalúan a las personas en tu equipo: cada quien por su lado o conversando primero?</em></p>`,

  'kn-halo': `
<p>Este experimento de Solomon Asch es de los más limpios que existen. Son <strong>los mismos seis adjetivos</strong>, solo que en orden inverso. Toca Alan y después Ben, y mira cómo cambian de lugar.</p>
<p>Alan es "inteligente, diligente, impulsivo, crítico, testarudo, envidioso". Ben es exactamente lo mismo al revés. Y Alan cae mucho mejor. Lee la explicación: en alguien que ya te pareció inteligente, ser <strong>testarudo</strong> suena a firmeza de carácter; en alguien que ya te pareció envidioso, ser <strong>inteligente</strong> lo vuelve más peligroso.</p>
<p>Lo que está pasando es que los primeros rasgos fijan un tono y los siguientes se interpretan para encajar. <span style="background-color:#fde68a">El Sistema 1 prefiere una historia coherente antes que una evaluación precisa.</span></p>
<p>A la derecha está el antídoto, y es lo más accionable de la clase: <strong>descorrelacionar los errores</strong>. Corregir la pregunta 1 de todos los exámenes antes de pasar a la 2. Pedir que cada persona escriba su posición antes de abrir la discusión. Puntuar dimensiones por separado en una entrevista.</p>
<p>La regla general vale la pena memorizarla: si la primera opinión contagia a las demás, no tienes cinco juicios independientes, tienes <strong>uno repetido cinco veces</strong>.</p>
<p><em>¿Qué reunión de tu semana mejoraría si cada quien escribiera su postura antes de hablar?</em></p>`,

  'kn-wysiati': `
<p><strong>WYSIATI</strong>: "what you see is all there is", lo que ves es todo lo que hay. Toca "Lo que ves": tres piezas iluminadas y una historia completa. Ahora toca "Lo que falta": aparecen nueve piezas más que nunca echaste de menos.</p>
<p>El experimento de la izquierda lo demuestra de forma incómoda. En un caso judicial ficticio, un grupo escuchó solo a una parte y otro escuchó a ambas. <span style="background-color:#bbf7d0">Quienes oyeron una sola versión estaban MÁS seguros de su veredicto</span>, aunque sabían perfectamente que la información era parcial. Menos datos, historia más limpia, más confianza.</p>
<p>De ahí salen los tres sesgos de las tarjetas. <strong>Exceso de confianza</strong>: tu seguridad mide lo bien que encaja tu relato, no cuánta evidencia tienes. <strong>Efectos marco</strong>: "90% de supervivencia" tranquiliza y "10% de mortalidad" asusta, siendo el mismo dato. <strong>Olvido de la tasa base</strong>: el caso concreto tapa la estadística ausente.</p>
<p>Y abajo tienes la pregunta que desarma todo esto: ¿qué tendría que ser verdad para que esta conclusión fuera falsa, y lo habríamos visto en estos datos?</p>
<p><em>¿Qué información te falta ahora mismo para la decisión más importante que tienes pendiente?</em></p>`,

  'kn-basicas': `
<p>El Sistema 1 estima continuamente cosas que nadie le pidió. Esta diapositiva trae dos consecuencias incómodas; ve alternando entre las dos pestañas.</p>
<p>La primera es el trabajo de <strong>Alex Todorov</strong>. Mirar dos rostros durante una fracción de segundo y señalar cuál parece más competente —mentón firme, sonrisa de confianza— predijo cerca del <strong>70%</strong> de las contiendas legislativas y de gobernación estudiadas. Y mira dónde pega más fuerte: el efecto es unas tres veces mayor entre votantes con poca información política y mucha televisión. <span style="background-color:#fbcfe8">Donde falta criterio, la cara decide.</span></p>
<p>La segunda son las aves del derrame del <strong>Exxon Valdez</strong>. Se preguntó cuánto pagaría la gente por salvar 2.000, 20.000 o 200.000 aves. Las respuestas fueron 80, 78 y 88 dólares. Cien veces más aves, el mismo dinero.</p>
<p>La explicación: el Sistema 1 maneja muy bien prototipos y promedios, y es casi ciego a las <strong>variables de suma</strong>. No estás valorando una cantidad: estás pagando por la imagen de un ave cubierta de petróleo, y esa imagen es idéntica en los tres casos. Por eso funciona la campaña con un solo rostro y fracasa la que informa la cifra total.</p>
<p><em>¿Cómo presentas tus propuestas: con una cifra global o con un caso concreto?</em></p>`,

  'kn-header-critico': `
<p>Quinta sección y, para mí, la más importante: <strong>pensamiento crítico</strong>. Hasta aquí te conté el libro. Ahora vamos a hacerle al libro lo que el libro propone hacer con todo: preguntarle por su evidencia.</p>
<p>El libro se publicó en 2011. Entre 2011 y hoy, la psicología vivió una crisis que cambió qué podemos afirmar y con cuánta seguridad.</p>
<p><em>¿Qué harías si descubrieras que uno de los experimentos que más te gustó de esta clase no se sostiene?</em></p>`,

  'kn-replicacion': `
<p>Esta diapositiva no está en el libro, y es la razón por la que esta clase existe en un curso que insiste en distinguir una buena historia de una buena prueba. Tres columnas: lo que <strong>resiste</strong>, lo que está <strong>en disputa</strong> y lo que <strong>no replicó</strong>.</p>
<p>A la izquierda, en verde, lo que aguanta bien: el <strong>anclaje</strong> (incluso más fuerte de lo que se creía), los <strong>efectos marco</strong>, el <strong>bate y la pelota</strong>, el <strong>gorila invisible</strong>, Müller-Lyer y Stroop, la <strong>mera exposición</strong>, el <strong>efecto halo</strong> y las caras competentes. Es un cuerpo sólido y es la base de la economía conductual.</p>
<p>En el centro, lo discutido: el <strong>agotamiento del ego</strong>, donde 23 laboratorios y 2.141 personas encontraron un efecto cercano a cero; los <strong>jueces</strong>, donde el orden de los casos no era aleatorio; y la <strong>letra borrosa</strong>, sin efecto con 7.000 participantes.</p>
<p>A la derecha, lo que directamente no replicó: el <strong>efecto Florida</strong>, que al medir con sensores y con el experimentador a ciegas desaparece —y solo aparece cuando quien toma el tiempo espera verlo—, y el <strong>primado del dinero</strong>. En los proyectos Many Labs, los dos únicos efectos que no replicaron eran de primado social.</p>
<p>Y ahora lo que más me interesa que te lleves: <span style="background-color:#bbf7d0">lo que hizo el propio Kahneman.</span> En 2012 escribió una carta abierta advirtiendo de un "choque de trenes", y en 2017 escribió que había confiado demasiado en estudios con muestras pequeñas, señalando la ironía de que su primer artículo con Tversky trataba justamente de la fe indebida en muestras diminutas. Reconocer eso en público, a los 83 años y con un Nobel encima, es una lección de método más valiosa que cualquier capítulo.</p>
<p><em>Antes de citar un estudio en una presentación, ¿qué dos preguntas te vas a hacer desde ahora?</em></p>`,

  'kn-vocabulario': `
<p>Terminamos con lo que el libro promete de verdad. No promete que dejes de equivocarte: promete que tengas <strong>las palabras para nombrar el error</strong>. Toca cada término y lee cómo suena dicho en una reunión real.</p>
<p>"Estamos aceptando este plan solo porque el informe se lee fácil" es <strong>facilidad cognitiva</strong>. "Que presente bien no significa que su propuesta técnica sea sólida" es <strong>efecto halo</strong>. "Es coherente, pero no pedimos los datos de la competencia" es <strong>WYSIATI</strong>. "Te pregunté si la acción está barata y me respondiste que te gustan sus autos" es <strong>sustitución de preguntas</strong>.</p>
<p>Y fíjate en la tarjeta de por qué funciona mejor con los demás: <span style="background-color:#fde68a">detectar tus propios sesgos en caliente es casi imposible, porque el error se siente exactamente igual que un acierto.</span> El error ajeno, en cambio, sí se ve. Por eso la apuesta es por el vocabulario compartido: una organización que puede nombrar estos fenómenos los corrige entre todos.</p>
<p>El pie recoge la frase medio en broma de Kahneman: esperar un chisme inteligente sobre tus decisiones motiva más a revisarlas que cualquier propósito de Año Nuevo.</p>
<p><em>¿Cuál de estos términos vas a usar esta semana, y en qué reunión?</em></p>`,

  'kn-cierre': `
<p>Los dos personajes vuelven juntos y el título resume la clase: <strong>no puedes apagar el Sistema 1, pero sí puedes reconocer el terreno</strong>.</p>
<p>Los chips son tu lista de bolsillo: dos sistemas y un solo tú; el Sistema 2 es perezoso; la fluidez se siente como verdad; sustituyes preguntas sin notarlo; juzgas por parecido y no por tasa base; lo vívido parece frecuente; la primera impresión contagia; lo que no ves no cuenta; y, el último, que es cosecha de esta clase: <strong>pide muestras grandes y réplicas</strong>.</p>
<p><span style="background-color:#bbf7d0">La meta no es desconfiar de todo, sino saber en qué situaciones tu intuición suele fallar y, justo ahí, bajar la velocidad.</span> Desconfiar de todo es tan inútil como confiar en todo, y además es agotador.</p>
<p><em>Después de esta clase, ¿en qué tipo de decisión vas a obligarte a ir más lento?</em></p>`,

  'kn-header-test': `
<p>Cerramos con una <strong>evaluación en dos niveles</strong>. No es para calificar a nadie: es para que cada quien vea qué le quedó claro y qué conviene repasar.</p>
<p>El primero cubre la arquitectura de la mente y los atajos. El segundo entra en los mecanismos finos y, sobre todo, en el estado de la evidencia. Diez preguntas cada uno, con explicación después de responder.</p>
<p><em>¿Qué parte de esta clase sientes que todavía no podrías explicarle a otra persona?</em></p>`,

  'kn-test-basico': `
<p>Este es el <strong>primer test: nivel principiante</strong>. Si estás presentando, lee cada pregunta en voz alta, deja que respondan y recién entonces toca la alternativa.</p>
<p>Recorre lo esencial: qué sistema hace cada cosa, el bate y la pelota, la pupila como medidor de esfuerzo, el gorila invisible, WYSIATI, la facilidad cognitiva, Steve y la tasa base, la disponibilidad, el efecto halo y los efectos marco.</p>
<p><span style="background-color:#bbf7d0">Al final verás el puntaje y una recomendación según el resultado.</span> Y fíjate en algo mientras responden: la respuesta correcta casi siempre exige detenerse un segundo. Es el tema de la clase puesto en práctica.</p>
<p><em>¿Alguna de estas preguntas te hizo dudar entre dos alternativas que al principio parecían obvias?</em></p>`,

  'kn-test-avanzado': `
<p>Este es el <strong>segundo test: nivel avanzado</strong>. Ya no pregunta qué es cada cosa, sino <strong>cómo se sostiene</strong>.</p>
<p>Vuelven los puntos exigentes: la distinción entre mente algorítmica y reflexiva; los números de la replicación del agotamiento del ego; la crítica metodológica al estudio de los jueces; qué pasó cuando midieron el efecto Florida con el experimentador a ciegas; la letra borrosa frente a 7.000 participantes; cómo se descorrelacionan errores; las aves del Exxon Valdez; el juicio de una sola parte; lo que reconoció Kahneman en 2017; y la conclusión razonable sobre el libro.</p>
<p>Esa última pregunta es la que más me importa: <span style="background-color:#fde68a">ni descartar el libro entero ni defenderlo entero.</span> Distinguir qué parte resiste y qué parte no es exactamente el tipo de juicio que el libro intenta enseñarte.</p>
<p><em>¿Qué otra idea popular que das por cierta hoy te gustaría someter a esta misma prueba?</em></p>`,
};
