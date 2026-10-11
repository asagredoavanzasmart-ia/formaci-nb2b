/**
 * Guión del presentador — clase "RevOps" (prefijo ro-).
 * Fuentes: workbook y transcripciones del curso de Revenue Operations de HubSpot
 * Academy (2021-2022), con las cifras recalculadas. HubSpot solo se cita como fuente.
 * Reglas: describe lo que muestra cada diapositiva nombrando sus pestañas, botones y
 * escenas, sin invitar a interactuar; 2.ª persona del singular, lenguaje neutro;
 * una sola pregunta abierta final en <em>.
 */

export const notasRevOps: Record<string, string> = {
  /* ── Lección 1 · Bienvenida ─────────────────────────────────────── */

  'ro-1-portada': `
<p>La portada presenta a los tres equipos que tocan al cliente: marketing con un megáfono, ventas con corbata y servicio al cliente con un corazón. Desde cada figura viaja una partícula hacia una esfera central rotulada «Datos compartidos»: los tres equipos alimentan y consultan el mismo núcleo de información.</p>
<p>La definición que guía todo el curso es deliberadamente simple: <strong>RevOps son las personas, los procesos, los sistemas y los datos que controlan cómo una empresa genera ingresos</strong>. El objetivo no es tener más herramientas ni más reportes, sino lograr que el negocio crezca más rápido de lo que crece su costo.</p>
<p>El término se puso de moda hace poco porque cambiaron tres cosas a la vez: los clientes esperan experiencias mejores, más rápidas y más personalizadas; están conectados entre sí y cuentan lo que viven; y las empresas tienen más datos que nunca, pero repartidos entre muchos sistemas y equipos.</p>
<p><em>Si hoy alguien te preguntara quién es responsable del recorrido completo del cliente en tu empresa, ¿qué nombre darías?</em></p>`,

  'ro-1-definicion': `
<p>La escena muestra cuatro bloques en fila, cada uno con un componente de RevOps: Personas, Procesos, Sistemas y Datos. El bloque seleccionado se eleva y cambia el panel de la derecha, con una explicación y una cita de un profesional entrevistado en el curso.</p>
<p>En <strong>Personas</strong>, Daniel Remedios plantea que quien trabaja en una empresa con ingresos recurrentes y no tiene un cargo de RevOps debería asumirlo igual: trabajar aislado del ciclo completo hoy es un error grave. En <strong>Procesos</strong>, Ross Nibur, de Toast, baja la idea al escritorio: cotizar no es una abstracción, es armar una cotización y enviarla, y no tiene sentido hacerlo de dos maneras distintas para una venta nueva y para un upsell.</p>
<p>En <strong>Sistemas</strong> aparece el problema del crecimiento: cada persona compra su aplicación favorita y cada jefatura mantiene su planilla. En <strong>Datos</strong>, Matt Bolian resume la tesis central: todo lo que hacen marketing, ventas y servicio genera datos, de modo que toda empresa ya hace revenue operations, bien o mal.</p>
<p>El panel inferior marca la diferencia con las áreas tradicionales de operaciones: sales ops, marketing ops o CS ops diseñan procesos mirando un solo pedazo del negocio, mientras RevOps planifica de forma uniforme y holística.</p>
<p><em>De los cuatro componentes, ¿cuál está más desordenado hoy en tu organización?</em></p>`,

  'ro-1-ruta': `
<p>La escalera de diez escalones representa las diez lecciones del curso; el escalón activo se eleva y los ya recorridos cambian de color. A la derecha, la grilla con los nombres de las lecciones y dos tarjetas: «Qué aprendes» y «Qué construyes».</p>
<p>La idea del recorrido viene del workbook del curso: cada lección deja una pieza concreta de una estrategia propia. En la segunda lección se construye un diagnóstico de 40 puntos para decidir si conviene invertir en RevOps; en la tercera, el dibujo del flywheel con sus fuerzas y fricciones; en la cuarta, un SLA con números reales; en la quinta, un proceso de ventas depurado.</p>
<p>La segunda mitad se ocupa de los sistemas y del equipo: un diccionario de datos y una evaluación del stack, una propuesta para convencer a la gerencia con respuestas preparadas a las objeciones, el organigrama actual y el ideal, una estrategia de contratación y, al cierre, un plan de cuatro trimestres con prioridades diarias.</p>
<p><em>¿Cuál de estas piezas te haría más falta mañana mismo en tu trabajo?</em></p>`,

  /* ── Lección 2 · Introducción ───────────────────────────────────── */

  'ro-2-escala': `
<p>El gráfico compara dos áreas a lo largo del tiempo: la plantilla, en gris, y los ingresos, en degradado naranja. En «Crecimiento lineal» ambas suben casi en paralelo; en «Crecimiento a escala» la curva de ingresos se dobla hacia arriba y supera a la plantilla. Es un esquema ilustrativo, no datos de una empresa.</p>
<p>La definición del curso: hay escala cuando el negocio crece más rápido que la inversión. Se nota cuando los ingresos crecen más que la cantidad de personas, cuando mejora el margen neto o cuando mejora la relación LTV:CAC, el valor de vida del cliente dividido por lo que cuesta adquirirlo.</p>
<p>El argumento es que el trato uno a uno deja de alcanzar. Si cada cliente requiere atención personal, más ventas exigen más vendedores y más clientes exigen más soporte. Jen Spencer agrega un costo menos visible: al crecer, la historia de cada cliente pasa de un gerente a otro y se diluye.</p>
<p>Las dos tarjetas inferiores ordenan el momento de cada estrategia. En etapa temprana, Daniel Remedios recomienda hacer lo que no escala y aprender de cada cliente. En etapa de escala, Sarah Doughty aclara que no se deja de cuidar al cliente: se buscan formas uno a muchos que igual aporten valor.</p>
<p><em>En tu empresa, ¿qué crece hoy más rápido, los ingresos o la cantidad de personas necesarias para generarlos?</em></p>`,

  'ro-2-diagnostico': `
<p>Esta diapositiva reproduce el diagnóstico del workbook: diez afirmaciones, cada una con una escala de 0 a 4. La columna de la derecha suma el puntaje sobre 40, lo muestra como un bloque que crece y entrega la lectura del tramo correspondiente.</p>
<p>Las afirmaciones recorren lo que hace un equipo de operaciones maduro: dedicar más de la mitad del tiempo a proyectos estratégicos, alimentar a marketing, ventas y servicio con datos del cliente, avisar cuando los datos fueron auditados, rastrear ineficiencias en toda la organización, administrar una única fuente de verdad y conectar las aplicaciones sin importar y exportar a mano.</p>
<p>Los tramos son tres. De 0 a 16 puntos, RevOps no está en buen estado, lo que el workbook presenta como una gran oportunidad de aportar valor. De 17 a 31, la organización va en la dirección correcta y por delante de la mayoría. De 32 a 40, el nivel es de clase mundial, con una advertencia: RevOps no se configura y se olvida, y el diagnóstico se repite cada trimestre.</p>
<p>El dato de contexto, citado en el workbook a partir de Blissfully (2020), explica por qué este trabajo existe: una empresa mediana usa en promedio 137 aplicaciones SaaS y una grande, 288.</p>
<p><em>¿Cuál de las diez afirmaciones crees que tendría el puntaje más bajo en tu organización, y por qué?</em></p>`,

  'ro-2-empezar': `
<p>Cuatro plataformas ascendentes representan los primeros pasos al asumir la tarea de unificar las operaciones de ingresos; una partícula recorre el camino de la primera a la última. A la derecha, la lista de pasos y una cita distinta para cada uno.</p>
<p><strong>Instrumentar</strong>: si la empresa no tiene cómo capturar datos, esa es la prioridad. Greg Keshian cuenta que lo primero fue medirlo todo y poner procesos para que la gente trabajara de forma consistente, y Daniel Remedios insiste en una vista consolidada del cliente desde el inicio.</p>
<p><strong>Entender antes de cambiar</strong>: Sandy Robinson cita a Stephen Covey, «primero busca entender», y empieza por la base de cuentas: quién ingresa datos, qué está duplicado. Su frase resume la urgencia: sin datos limpios, ni marketing ni los BDR (representantes de desarrollo de negocio) están conformes.</p>
<p><strong>Dar consistencia</strong>: Sarah Doughty observa que las métricas de la venta nueva suelen estar claras, pero no las de después: cuántos clientes se incorporaron bien, cuántos tuvieron un primer uso exitoso, cuántos renovaron. <strong>Mirar desde el cliente</strong> cierra la secuencia con un taller interfuncional, y con una conclusión del curso: la mayoría de las ineficiencias no vienen de malas personas, sino de áreas que intentan ayudar al cliente cada una a su manera.</p>
<p><em>¿Qué dato sobre tus clientes no existe hoy en ningún sistema, y debería existir?</em></p>`,

  'ro-2-velocidad': `
<p>La escena tiene dos estados. En «Cada equipo a su ritmo», cinco esferas grises corren en direcciones distintas sin acercarse a la meta de ingresos. En «Mismo rumbo», las esferas se alinean y las partículas viajan juntas hacia la meta.</p>
<p>La distinción viene de Doug Davidoff: rapidez mide qué tan rápido vas; velocidad mide cuánto tardas en llegar a destino. Su analogía es la bicicleta: en una marcha corta das muchas vueltas y avanzas poco; en una marcha larga das menos vueltas, pero cada una tiene más tracción. El trabajo de RevOps es aumentar la velocidad, no la rapidez.</p>
<p>La consecuencia práctica es incómoda: si la empresa no crece, la solución no es exigir más esfuerzo, porque cada persona ya corre tras su cuota. La solución es que alguien con perspectiva logre que todos tiren en la misma dirección, aunque a veces eso signifique ir más lento.</p>
<p>Las dos tarjetas inferiores advierten sobre el estilo. Davidoff recuerda que a su área de operaciones de ventas la llamaban «el departamento de prevención de ventas». Ross Nibur y Sandy Robinson proponen lo contrario: curiosidad sincera por lo que cada persona hace en su escritorio, y tratar a los equipos internos como clientes.</p>
<p><em>¿Qué equipo de tu empresa corre más rápido hoy, y hacia dónde?</em></p>`,

  'ro-2-casos': `
<p>Las cuatro pestañas muestran casos reales del curso, cada uno con un gráfico de barras y su resultado. El hilo común: mejorar una tasa de conversión, con todo lo demás constante, se compone a lo largo del embudo sin gastar más.</p>
<p>En <strong>Toast</strong>, Ross Nibur cuenta que midieron de dónde venían los MQL (leads calificados por marketing), qué tan rápido y con cuánta profundidad se trabajaban. Sin cambiar los leads, las personas ni la cantidad de llamadas, solo reordenando cómo se priorizaban en el sistema, duplicaron la conversión inbound sin que cayera la tasa de cierre.</p>
<p>En <strong>Decaimiento</strong>, Matt Volm describe un análisis por cohortes: los MQL casi no convertían después del día 4 o 5, pero los SDR (representantes de desarrollo de ventas) los seguían trabajando hasta el día 10. Al soltarlos, la conversión a SQL pasó de 33% a 45%. La tarjeta de verificación aclara la aritmética: son 12 puntos, es decir, 36% más SQL; la fuente atribuye al cambio 33% más ingresos en el trimestre.</p>
<p><strong>Puntos de contacto</strong> plantea comparar en cuántos contactos se agenda la primera reunión, a veces 15 o 16, con la cantidad de pasos de las secuencias reales. <strong>Comisiones</strong> relata el hallazgo de Sandy Robinson: ventas duplicadas pagadas dos veces y clientes que nunca se activaban, con una regla de los datos: seis días sin contacto de éxito del cliente bastaban para que no implementaran.</p>
<p><em>¿Qué tasa de conversión de tu empresa nadie ha medido por cohortes todavía?</em></p>`,

  /* ── Lección 3 · El flywheel ────────────────────────────────────── */

  'ro-3-flywheel': `
<p>La escena muestra un anillo dividido en tres sectores, Atraer, Involucrar y Deleitar, con el cliente al centro y una partícula que gira sin detenerse. Al seleccionar un sector, el panel cambia a su definición y a las preguntas para mapearlo en la empresa.</p>
<p>La crítica de partida es de Emmanuelle Skala: el embudo tiene un final, con leads que entran arriba y clientes que salen abajo, pero en un negocio recurrente no hay final, porque hay renovaciones, recomendaciones y referidos. Si ventas y éxito del cliente están separados, nadie mira el ciclo completo.</p>
<p><strong>Atraer</strong> es traer a las personas correctas con contenido y conversaciones que te posicionan como asesor de confianza. <strong>Involucrar</strong> es presentar soluciones alineadas con los dolores y metas del prospecto, cuidando qué tan fácil es encontrar respuestas y cuánto tardas en contestar. <strong>Deleitar</strong> es ayudar al cliente a tener éxito con lo que compró; se mide con encuestas NPS (Net Promoter Score), las razones por las que vuelve a comprar y los reclamos.</p>
<p>El flywheel es un modelo que adaptó HubSpot para explicar el impulso que se gana cuando toda la organización se alinea en torno a la experiencia del cliente.</p>
<p><em>¿Cuál de las tres fases recibe hoy menos atención en tu empresa?</em></p>`,

  'ro-3-fuerza': `
<p>El carrusel ilustra la analogía de Devyn Bellamy. En «Empujar más fuerte», Kyle empuja al máximo, pero los rodamientos gastados, marcados como manchas sobre la plataforma, hacen que gire lento. En «Quitar la fricción», el mismo carrusel gira rápido con un empuje normal.</p>
<p>Las definiciones son simples: <strong>fuerza</strong> es cualquier programa o estrategia que acelera el flywheel; <strong>fricción</strong> es todo lo que lo frena. El ejemplo de Alex lo muestra en ambos sentidos: un cliente deleitado lo cuenta y cada ciclo trae más alcance; un cliente frustrado también lo cuenta, y cada vez cuesta más encontrar a alguien dispuesto a comprar.</p>
<p>El curso recomienda que la fuerza se incline hacia deleitar. Y busca un ejemplo no obvio: la compensación de ventas. En el caso documentado, si el cliente cancela antes de 8 meses el vendedor devuelve la comisión, y quienes retienen más clientes y los tienen más felices ganan más. Cuando el incentivo del vendedor coincide con el éxito del cliente, el deleite aumenta.</p>
<p><em>¿Qué incentivo de tu empresa empuja hoy a vender a clientes que no van a tener éxito?</em></p>`,

  'ro-3-friccion': `
<p>El recorrido de cuatro plataformas cambia según la pestaña. En «La vive el cliente», las etapas son Descubre, Compra, Recibe y Pide ayuda; en «La viven tus equipos», Marketing, Ventas, Servicio y Operaciones. Cada ejemplo de fricción de la lista marca en rosa la etapa donde golpea.</p>
<p>La fricción que vive el cliente incluye esperas largas en el teléfono o el chat, formularios web sin respuesta, información difícil de encontrar, obligar a hablar con alguien para algo que podría resolverse solo, retrasos en la entrega, fallas del producto, precios altos y cobros sorpresa.</p>
<p>La fricción interna es menos visible pero termina en el cliente: una fuente de verdad distinta por equipo, información del cliente difícil de encontrar, procesos duplicados o en conflicto, equipos sin procesos consistentes, alta rotación y capacitación insuficiente.</p>
<p>Yamini Rangan describe el trabajo como buscar los «bordes filosos» del recorrido: demasiados traspasos y lugares que no funcionan. El método del curso es hacer la lista, ordenarla por facilidad de arreglo o por impacto y atacar las primeras de inmediato.</p>
<p><em>Si tuvieras que elegir una sola fricción para eliminar este mes, ¿cuál tendría más impacto en tus clientes?</em></p>`,

  'ro-3-friccion-util': `
<p>La matriz cruza dos preguntas: si el momento es de alto o bajo valor para el cliente, y si tiene o no fricción. Cada caso de las pestañas ilumina el cuadrante que le corresponde.</p>
<p>La tesis es de Doug Davidoff: toda experiencia de alto valor tiene fricción, porque si no la tuviera ni la notaríamos. El problema es la fricción en lugares de poco valor. Por eso, con más madurez, la fricción pasa de enemigo a herramienta, y la cantidad debe calzar con el valor que agrega.</p>
<p>En <strong>Fechas de inicio</strong>, Jen Spencer cuenta que su agencia solo arranca clientes los días 1 y 15. Para quien quiere empezar el 5 es una fricción, pero ventas la usa para cerrar: para partir el 15, el contrato debe llegar antes de fin de mes. En <strong>Formulario de pasaporte</strong>, pedir al inicio que la persona confirme que tiene los 17 documentos aumentó los formularios completados, la satisfacción y el NPS.</p>
<p><strong>Fricción que se traslada</strong> completa la advertencia: al reducir la fricción en un lugar, casi siempre aparece en otro, así que eliminarla exige un análisis de costo y beneficio.</p>
<p><em>¿Qué paso de tu proceso de venta debería tener más fricción de la que tiene hoy?</em></p>`,

  'ro-3-mapa': `
<p>La tabla reproduce la actividad del workbook para mapear el flywheel: por cada fase, la herramienta o el proceso, el equipo responsable y la métrica. Los textos grises son los ejemplos del material y los campos admiten escritura para la conversación en clase; lo escrito no se guarda.</p>
<p>Los ejemplos ayudan a calibrar el nivel de detalle. Para Atraer: anuncios, a cargo de marketing, medidos con MQL y retorno de la inversión. Para Involucrar: prospección de ventas, a cargo de ventas, medida con negocios cerrados-ganados. Para Deleitar: chat en vivo, a cargo de ventas y servicio, medido con tiempo de respuesta y satisfacción del cliente.</p>
<p>Con el dibujo listo, el workbook propone cuatro preguntas: dónde sienten más fricción los clientes, dónde la sienten los equipos, dónde ejerce más fuerza la empresa y dónde debería ejercer más.</p>
<p>La última tarjeta convierte observaciones en acción con el ejemplo del material: ventas no contacta los leads de marketing; la acción es reunir a los líderes de ambas áreas; las personas clave son las jefaturas de ventas y de marketing.</p>
<p><em>¿Qué observación de tu flywheel tiene una acción obvia que nadie ha tomado todavía?</em></p>`,

  /* ── Lección 4 · SLA ───────────────────────────────────────────── */

  'ro-4-porque': `
<p>La escena muestra el acuerdo de ida y vuelta: desde marketing viaja una partícula hacia ventas, con el compromiso de entregar leads calificados, y desde ventas vuelve otra con el compromiso de contactarlos a tiempo. Al centro, el acuerdo.</p>
<p>Un SLA (acuerdo de nivel de servicio) es un acuerdo entre quien presta un servicio y su cliente que garantiza un resultado. Entre marketing y ventas tiene dos lados: marketing promete una cantidad de leads, y ventas promete contactar cada uno dentro de un plazo.</p>
<p>Las dos cifras ilustran la brecha que intenta cerrar: según el material, el 69% de las empresas de alto desempeño dice que comunicar las metas a toda la empresa es lo más efectivo para formar un equipo de alto rendimiento, pero en una empresa típica solo el 7% de las personas sabe qué hacer para contribuir. La nota al pie advierte que el curso no indica el estudio de origen de esas cifras.</p>
<p>La cita de Janet Comenos plantea el principio de diseño: las metas de marketing y ventas deben ser complementarias para que estén obligados a colaborar, no competir.</p>
<p><em>¿Qué meta de marketing y qué meta de ventas de tu empresa hoy compiten entre sí?</em></p>`,

  'ro-4-calculadora': `
<p>La calculadora traduce la meta de ingresos en el compromiso de marketing. Los cuatro campos superiores son la meta mensual, el ticket promedio, la tasa de oportunidad a cierre y la tasa de lead a oportunidad; las barras muestran leads, oportunidades y negocios, y la tarjeta «Tu SLA» redacta el acuerdo completo.</p>
<p>Con los valores iniciales, una meta de $100.000 y un ticket de $5.000 exigen 20 negocios; con 25% de cierre se necesitan 80 oportunidades, y con 20% de conversión de lead a oportunidad, 400 leads calificados al mes. Esa cifra es la primera mitad del SLA; la segunda es el plazo de contacto, que el workbook sugiere partir en 24 horas e ir reduciendo.</p>
<p>La tarjeta de corrección señala un error del workbook: indica multiplicar por las tasas de conversión, cuando lo correcto es dividir. Multiplicar 20 negocios por 25% daría 5 oportunidades, una cifra imposible.</p>
<p>La referencia de Mark Roberge, de Harvard Business School, muestra el mismo cálculo en la práctica: con 100 leads al mes, un vendedor conectaba con 50, hacía 30 llamadas de descubrimiento, 15 demostraciones y cerraba 5 clientes; con 10 vendedores, marketing debía entregar 1.000 leads al mes.</p>
<p><em>¿Conoces hoy las tres tasas de tu empresa con datos de un año completo, o solo una intuición?</em></p>`,

  'ro-4-valor': `
<p>Las barras comparan el valor de dos leads del mismo perfil y de la misma venta de $100.000: la descarga de un ebook, que cierra el 1% de las veces y vale $1.000, y la solicitud de una demo, que cierra el 3% y vale $3.000. Abajo, dos campos y una barra de progreso hacia una meta de $300.000 en valor de leads.</p>
<p>La historia de Mark Roberge explica por qué existe esta métrica: cuando marketing se atrasaba en su SLA de cantidad, cambiaba sus llamados a la acción por ebooks, más fáciles de conseguir, y ventas preguntaba dónde estaban las demos. Al medir valor en vez de volumen, a marketing le da igual la mezcla y queda con una cuota de ingresos, igual que ventas.</p>
<p>La tarjeta de corrección revisa la cuenta de la fuente: dice que $300.000 se logran con 1.000 demos o 3.000 ebooks, pero con sus propios valores eso suma $3.000.000; la cifra correcta es 100 demos o 300 ebooks.</p>
<p>Ventas tampoco queda fuera: el tablero que Roberge llamaba «no aparezcas aquí» mostraba el nombre de cada vendedor con leads sin llamar en 24 horas o con dos semanas sin cinco intentos de contacto.</p>
<p><em>¿Qué tipo de lead de tu empresa se cuenta igual que los demás aunque cierre mucho más?</em></p>`,

  'ro-4-contacto': `
<p>Las barras muestran la probabilidad relativa de calificar un lead según el tiempo de respuesta, a partir del estudio de Oldroyd, McElheran y Elkington publicado en Harvard Business Review en 2011, que auditó a 2.241 empresas de Estados Unidos: contactar en menos de una hora es unas 60 veces más efectivo que esperar 24 horas o más, y casi 7 veces más que hacerlo una hora después. El tiempo promedio de primera respuesta era de 42 horas.</p>
<p>El caso Huify lleva la idea al extremo: una empresa de siete personas con la regla de llamar todo lead en cinco minutos, aunque tuviera que hacerlo alguien de éxito del cliente. Su fundador, Josh Harcus, cuenta que multiplicaron sus ingresos por seis en un año. La tarjeta rosa marca una afirmación del curso sin respaldo: que llamar en 5 minutos en vez de 24 horas multiplique por 1.000 la probabilidad de cerrar; el estudio publicado no muestra esa cifra.</p>
<p>Las tarjetas inferiores agregan tres matices. PeopleDoc movió su equipo de ventas internas dentro de marketing y subió 60% sus reuniones calificadas. Mark Roberge insiste en el ritmo: el valor de leads debe llegar de forma pareja durante el mes, sin campañas concentradas que saturen o dejen ociosos a los vendedores. Y la cantidad de intentos depende del segmento, así que conviene partir de supuestos razonables y corregirlos con datos propios.</p>
<p><em>¿Cuánto tarda hoy tu equipo en responder a un lead nuevo, medido y no estimado?</em></p>`,

  'ro-4-judicial': `
<p>La escena muestra a un grupo pequeño de líderes tras una mesa; desde la derecha llega un lead en disputa y, tras la revisión, sale hacia el equipo que corresponde. Debajo, la regla: decide un COO o el CEO, y la rama no la encabezan marketing ni ventas.</p>
<p>Las cuatro opciones de la derecha recorren las preocupaciones típicas del SLA. Si pide más leads de los posibles, se revisa la meta o se mejora la velocidad de marketing, con las tres palancas de Jamie Shanks: volumen, velocidad de producción y conversión. Si llegan más leads de los que ventas atiende, se calcula la velocidad de ventas. Si los leads no sirven, Marcus Sheridan apunta al mensaje: los leads son tan buenos como el mensaje que los atrajo.</p>
<p>La preocupación seleccionada al inicio, «Ventas rechaza leads», introduce la rama judicial, idea de Dan McDade: un grupo pequeño de líderes que revisa cada lead rechazado o no contactado a tiempo y decide si el problema fue de calificación o de seguimiento. Un lead rechazado nunca se pierde: vuelve a nutrición o vuelve a ventas.</p>
<p>La tarjeta inferior detalla su funcionamiento: miembros imparciales, reuniones en persona al comienzo y, cuando la lista se achica, un turno rotativo que revisa un tablero. En empresas pequeñas basta con un solo líder imparcial.</p>
<p><em>Hoy, cuando ventas descarta un lead de marketing, ¿quién se entera y qué pasa con él?</em></p>`,

  'ro-4-velocidades': `
<p>Dos calculadoras responden si el SLA es posible. A la izquierda, la velocidad de marketing de una pieza de contenido; a la derecha, la velocidad de ventas con la fórmula del libro <em>Aligned to Achieve</em>, de Andrea Austin y Tracy Eiler.</p>
<p>La velocidad de marketing divide los leads que genera cada pieza por las horas que cuesta producirla. El ejemplo del workbook, que viene cargado, son 200 blogs al año con 0,25 leads por blog y 4 horas de trabajo cada uno: 0,0625 leads por hora, es decir, 16 horas por lead, y 800 horas al año. Si una pieza rinde poco por hora, esas horas pueden moverse a otra que rinda más.</p>
<p>La velocidad de ventas multiplica oportunidades, ticket promedio y tasa de cierre, y divide por los días del ciclo. Con 40 oportunidades, un ticket de $5.000, 25% de cierre y 60 días de ciclo, el equipo procesa unos $833 al día, alrededor de $25.000 en 30 días. Si la meta mensual es mayor, el SLA fracasa antes de empezar.</p>
<p>La nota final conecta ambos lados: una tasa de cierre baja puede indicar que marketing atrae al público equivocado, y el contenido de marketing puede acortar el ciclo de ventas respondiendo dudas antes de la reunión.</p>
<p><em>¿Qué pieza de contenido de tu empresa consume más horas en relación con los leads que genera?</em></p>`,

  /* ── Lección 5 · Proceso de ventas ─────────────────────────────── */

  'ro-5-paradoja': `
<p>La escena muestra a un vendedor entre dos hileras de barandas. En «Sin proceso», las barandas se alejan y el recorrido es errático; en «Barandas», hay un rumbo claro con espacio propio; en «Guion rígido», las barandas aprietan hasta dejar sin margen para adaptarse.</p>
<p>El subtítulo cita la paradoja de Cory Bray y Hilmon Sorey en <em>The Sales Enablement Playbook</em>: demasiado proceso mata a los equipos de ventas, pero los equipos de ventas mueren sin proceso. Un proceso de ventas es un conjunto de pasos claramente definidos y de formas de comunicación con el prospecto, desde que sabe que existes hasta que renueva, y permite métricas, repetición, escala y responsabilidad.</p>
<p>Doug Davidoff aporta el argumento contra la rigidez a partir de Jack Welch: Six Sigma busca eliminar la variación, y en ventas todo el valor está en la variación. Steve Bookbinder aporta el argumento contra el caos: quiere que cada venta sea «aburridamente parecida» a las que se cierran, porque «esta es distinta» casi siempre significa «esta no se cierra».</p>
<p><em>En tu equipo, ¿qué parte del proceso está demasiado apretada y cuál no tiene barandas?</em></p>`,

  'ro-5-comprador': `
<p>Tres plataformas representan el recorrido del comprador: Reconocimiento, Consideración y Decisión. Una figura avanza a la etapa seleccionada y el panel muestra la pregunta que debe hacerse el vendedor en ese momento, junto con el ejemplo de TINYpulse.</p>
<p>Mark Roberge, de Harvard Business School, lo resume en una frase: vender es ayudar a comprar. En Reconocimiento, el comprador prioriza problemas y oportunidades; en Consideración, evalúa categorías de solución, como contratar a alguien, un consultor o un producto; en Decisión, ya eligió la categoría y compara proveedores con un criterio propio.</p>
<p>TINYpulse, que mide el clima de una organización con una pregunta semanal, muestra cómo cambia la conversación en cada etapa. Una mala cultura, una rotación alta o la necesidad de contratar rápido encajan bien; quien cree que su problema es una oficina aburrida representa una oportunidad de reencuadre. En Decisión, si el criterio es el precio o el líder del mercado, TINYpulse no gana; si es integrar la cultura y orientar cómo actuar, sí.</p>
<p>La tarjeta final nombra el error contrario: armar un deck de diez láminas y repetirlo igual a todos, lo que en la industria se llama «venta cocodrilo», con boca grande y orejas chicas.</p>
<p><em>¿En qué etapa del recorrido suele estar tu comprador típico cuando hace el primer contacto?</em></p>`,

  'ro-5-filtros': `
<p>A la izquierda, los cuatro filtros del workbook y del curso; a la derecha, ocho pasos candidatos de una venta típica. A medida que se activan los filtros, los pasos que no los superan se tachan con el motivo, y el contador indica cuántos quedan.</p>
<p>El método parte de una lista larga con todo lo que hacen el vendedor y el prospecto, y la depura. <strong>Requerido</strong>: el paso ocurre en toda venta; por eso «hacer seguimiento si no responde» y una tercera reunión redundante quedan fuera. <strong>Factual</strong>: está ligado a una acción, no a una sensación; «el prospecto disfruta la consultoría» no lo es. <strong>Inspeccionable</strong>: se puede verificar en el CRM; lo que el prospecto conversa con su directorio no lo es.</p>
<p><strong>Centrado en el comprador</strong> agrega el último ajuste: «Le dimos la demo» no se borra, se reescribe como «Producto evaluado», que describe lo que logró el comprador. Así el vendedor piensa en lo que debe ayudarle a lograr, no en lo que debe hacerle.</p>
<p>Los ejemplos de la lista son ilustrativos; los filtros son los del material.</p>
<p><em>Si aplicaras estos cuatro filtros a las etapas de tu CRM, ¿cuántas sobrevivirían?</em></p>`,

  'ro-5-salida': `
<p>A la izquierda, el ejemplo que el curso usa para explicar los criterios de salida; a la derecha, un proceso de once etapas que se ve de dos formas: «Termina al cerrar», con ocho etapas, y «Con etapas posventa», con tres más después del cierre.</p>
<p>Cada etapa combina una acción del vendedor con un resultado del comprador. La acción «hacer la demostración» se convierte en la etapa «Producto evaluado», que solo se da por cumplida cuando el comprador asistió y resolvió sus dudas, agendó otra reunión antes de cortar y respondió el correo de resumen confirmando los próximos pasos. Con ese rigor, la jefatura puede pedir la evidencia y el pronóstico se vuelve confiable: si el 21% de lo que sale de evaluación cierra este mes, se mantiene mes a mes.</p>
<p>Las etapas posventa vienen del caso de Mike Venman: la 9 es el traspaso a implementación, la 10 la implementación y la 11 el cliente en marcha. Permiten medir cuánto tarda éxito del cliente en reaccionar y si el negocio realmente quedó activo.</p>
<p>Las tarjetas inferiores justifican el cuidado posventa. Mark Roberge pide que más del 80 u 85% de los clientes diga, a los 6 a 12 meses, que recibió el valor prometido. Bertrand Hazard lo resume así: una empresa con dos vendedores y mil clientes felices tiene, en realidad, 1.002 vendedores.</p>
<p><em>¿Qué etapa de tu proceso se marca como cumplida sin ninguna evidencia del comprador?</em></p>`,

  'ro-5-playbook': `
<p>Las tres pestañas organizan lo que lleva un playbook de ventas: la metodología, las áreas de contenido y la matriz que conecta el contenido con el comprador.</p>
<p><strong>Metodología adaptativa</strong> recoge la observación de Mike Kunkle tras dieciséis años analizando a los mejores vendedores: no usan una sola metodología, se adaptan al comprador. Si habla de necesidades, venta por necesidades; si describe problemas, venta por soluciones; si tiene objetivos claros, venta por objetivos; si hay una oportunidad que aún no capta, venta por insights.</p>
<p><strong>Las cuatro áreas</strong> son las de Walter Pollard: qué saber, qué hacer, qué decir y qué mostrar, con menos decks y más pizarra, video y contenido visual. Pollard pide que el playbook sea web, a pedido, interactivo, con video y perenne, es decir, actualizado de forma constante.</p>
<p>La <strong>Matriz dolor · persona · función · contenido</strong>, de Cory Bray y Hilmon Sorey, ordena el material por persona, sus dolores, las funciones que los resuelven y el contenido que lo explica; la fila mostrada es un ejemplo ilustrativo. Su caso es revelador: a una empresa le «faltaban casos de clientes», pero el problema real era que las historias de éxito del cliente nunca llegaban a ventas.</p>
<p><em>Si un vendedor nuevo entrara mañana, ¿dónde encontraría lo que debe decir a cada tipo de comprador?</em></p>`,

  'ro-5-estados': `
<p>La plataforma cambia de comportamiento según el estado del proceso de ventas. En «Funciona en armonía», dos partículas giran con ritmo estable; en «Experimenta», una partícula gira mientras aparecen pruebas puntuales; en «Se agita sin control», las partículas saltan de un lado a otro con alertas rosadas.</p>
<p>Los tres estados vienen de <em>The Sales Enablement Playbook</em>. En armonía, más del 80% de los vendedores cumple su cuota de forma consistente, las personas nuevas alcanzan rápido el rendimiento esperado y nadie se queja de las mejoras de proceso; aun así, el mercado cambia y conviene hacer más de lo que rinde. Si no está en armonía, la vía es experimentar de forma rápida y controlada.</p>
<p>El tercer estado no debería ocurrir nunca: saltar de una «solución» a otra cada vez que algo sale mal es, según los autores, corrosivo. Bob Britton lo asocia con el cuadrante de crisis de Covey, del que hay que mudarse al proactivo.</p>
<p>Las tarjetas inferiores dan el método. Mathias Thulin y Dailius Wilson preguntan a los clientes ganados y a los perdidos por qué siguieron o no, y Dave Casey propone preguntarse qué cambió cuando se pierde un negocio con el mismo proceso que antes ganaba. Doug Davidoff pide revisar el proceso al menos cada tres meses.</p>
<p><em>¿En cuál de los tres estados describirías hoy el proceso de ventas de tu empresa?</em></p>`,

  /* ── Lección 6 · Sistemas ──────────────────────────────────────── */

  'ro-6-proceso': `
<p>La pirámide muestra el orden de las tres áreas en las que invertir para tener buenos datos: en la base, definir procesos; encima, gobierno de datos; arriba, el stack tecnológico. Cada nivel seleccionado actualiza el panel de la derecha.</p>
<p>Sandy Robinson y Gregory Keshian coinciden en el principio: primero el proceso, después la herramienta. Asia Corbett lo baja a la práctica: qué hacemos paso a paso en enrutamiento y puntaje de leads, segmentación, puntaje de cuentas, ABM y datos de intención; si todos están de acuerdo, recién ahí se pregunta qué sistemas pueden apoyar ese proceso.</p>
<p>La razón está en la cita de Daniel Remedios: las herramientas son un multiplicador de fuerza. Aceleran el proceso que ya existe, y si no está definido, aceleran en la dirección equivocada.</p>
<p>Las tarjetas inferiores extienden el mapa: de dónde vienen los leads antes del pipeline y qué pasa con los clientes después del cierre, con atención a cada traspaso y a cada tasa de conversión. El caso de Asia Corbett muestra lo que pasa sin definiciones compartidas: finanzas y marketing tenían reportes distintos porque cada uno definía un SQL a su manera.</p>
<p><em>¿Qué definición clave, como MQL, SQL o cliente activo, significa cosas distintas para dos áreas de tu empresa?</em></p>`,

  'ro-6-gobierno': `
<p>La torre de bloques ilustra dos estados. En «Sin reglas», las piezas se desalinean y se tambalean; en «Con gobierno», la torre es simple y estable. Asia Corbett describe así un CRM de diez años lleno de personalizaciones: sacar una pieza era arriesgar que todo se cayera.</p>
<p>El gobierno de datos es un marco interno que gestiona la disponibilidad, la usabilidad, la integridad y la seguridad de los datos, y fija las normas de acceso. Su pieza central es el diccionario de datos, que la tabla muestra con un ejemplo ilustrativo: un mismo dato con nombres distintos en cada sistema, como código postal y ZIP o región y estado, con su dirección de sincronización y su sistema de registro.</p>
<p>Los controles mínimos son concretos: no todos pueden crear o borrar, ciertos campos son obligatorios y cada sincronización tiene dirección y responsable. La regla de la casa resume la filosofía: no se puede añadir simplicidad, hay que quitar complejidad.</p>
<p>La cita de Bryan Semple ofrece un mecanismo práctico: quien pide un campo nuevo debe reportarlo cada semana; a los cinco o seis meses suele abandonarse, y entonces se elimina.</p>
<p><em>¿Cuántos campos de tu CRM existen hoy sin que nadie sepa para qué se crearon?</em></p>`,

  'ro-6-indicadores': `
<p>La cadena de esferas va de los indicadores adelantados al rezagado: tickets de soporte, uso del producto, riesgo de renovación e ingresos. Una partícula recorre la cadena; cada esfera seleccionada explica qué señal aporta.</p>
<p>El argumento es de Dwamian Mcleish: los ingresos son un indicador rezagado, porque cuando se mueven el problema ya ocurrió. Para corregir a tiempo hay que identificar los indicadores adelantados que terminan convirtiéndose en ingresos y vigilarlos. Su ejemplo, que la escena representa, es que el aumento de tickets de soporte anticipa la pérdida de clientes.</p>
<p>La tarjeta destacada practica la lectura de Devyn Bellamy: 100.000 visitas en un día, cuando lo normal son 1.000. Las pistas sucesivas, una tasa de rebote de 99% y tráfico de un país donde no se vende, conocido por los bots, muestran que no es un triunfo. Leer los datos como una historia evita celebrar ruido.</p>
<p>Bellamy agrega un método para los reportes: preguntar a la gente qué quiere saber, no qué reporte quiere ver, y buscar los datos que respondan esa pregunta.</p>
<p><em>¿Qué indicador adelantado anticiparía mejor la pérdida de clientes en tu empresa?</em></p>`,

  'ro-6-stack': `
<p>La escena muestra el mapa de flujo de valor del cliente por los sistemas. En «Hoy: 7 sistemas», la partícula recorre siete traspasos y el dato se aleja de la verdad; en «Integrado: 3 sistemas», el recorrido es corto y el dato no se pierde.</p>
<p>La cita de Dwamian Mcleish explica por qué visualizarlo ayuda: mostrar que un cliente pasa por siete sistemas sin beneficio vuelve más fácil la conversación que anunciar que se eliminarán cuatro herramientas.</p>
<p>La tarjeta destacada separa RevOps de TI, según Devyn Bellamy: TI y los administradores hacen que las cosas funcionen, a veces con eficiencia, pero rara vez preguntan por qué; RevOps se ocupa de la eficiencia de ingresos, la transparencia de los datos y el uso responsable de herramientas y datos.</p>
<p>Los cuatro pasos resumen los criterios del curso antes de aprobar una herramienta: si lo que ya existe lo hace (Jen Bergren), quién la aprueba, con operaciones junto a finanzas y TI, si conviene más profundidad o menos complejidad, con el riesgo del sistema «espagueti» que describe Bryan Semple, y si vale la pena automatizar, con la regla de Matthew Volm de no gastar diez horas en automatizar algo que a mano toma treinta minutos.</p>
<p><em>¿Por cuántos sistemas pasa hoy un cliente de tu empresa desde que es lead hasta que renueva?</em></p>`,

  /* ── Lección 7 · Comunicar el valor ────────────────────────────── */

  'ro-7-lenguaje': `
<p>Las barras representan un estado de resultados simplificado con cifras ilustrativas: ingresos, costo de ventas, margen bruto, gastos operativos y resultado operacional. Cada iniciativa de RevOps de la lista resalta la línea que mueve.</p>
<p>El problema lo plantea Alicia Butler Pierre: operaciones no se ve, pero el cliente la vive, y en los estados financieros aparece como un gasto. El trabajo frente a la gerencia es traducir ese gasto en un activo que genera ingresos. Matt Bolian muestra el error típico: prometer «reducir la fricción y romper silos» y escuchar del CEO que eso es lo mismo que se hace hace veinte años.</p>
<p>Las tres tarjetas resumen los estados que conviene dominar. El balance general es una foto en un momento, con activos iguales a pasivos más patrimonio. El estado de resultados cubre un periodo y baja de los ingresos al resultado operacional. El flujo de caja muestra de dónde viene y adónde va el dinero.</p>
<p>La traducción concreta está en las tres iniciativas: bajar el costo de adquirir clientes sube el resultado operacional; vender a la base actual aumenta los ingresos de primera línea; vender más sin agrandar el equipo baja los gastos operativos en proporción a las ventas.</p>
<p><em>¿Cómo expresarías en pesos el último proyecto de mejora que propusiste en tu trabajo?</em></p>`,

  'ro-7-copq': `
<p>A la izquierda, las cuatro categorías del costo de la mala calidad, una herramienta de Lean Six Sigma; a la derecha, la calculadora del caso del material, con sus resultados y una tarjeta que verifica la aritmética.</p>
<p>Las categorías son fallas internas, costos inútiles antes de que el producto llegue al cliente; fallas externas, costos después de la compra que además erosionan la confianza; evaluación, lo que cuesta detectar fallas antes de que salgan; y prevención, lo que cuesta reducir las otras tres. La idea de fondo es Y = f(X): Y es la meta financiera y X son las causas que se pueden mover.</p>
<p>El caso es un vendedor que quiere dejar una cuota de $120.000 para pasar a operaciones con un sueldo de $100.000; la gerencia ve $220.000 en contra. Con los valores del material, 10 vendedores que dedican una hora diaria a tareas administrativas durante 260 días suman 2.600 horas; a $50 la hora, son $130.000 al año. Si esa persona asume el trabajo administrativo, la empresa ahorra $30.000 después de pagar su sueldo.</p>
<p>La tarjeta verde confirma la cuenta y agrega el cierre del argumento: 2.600 horas equivalen exactamente a un año de un vendedor, a 50 horas por 52 semanas, lo que cubre la cuota que deja. Todo eso antes de cualquier mejora de procesos.</p>
<p><em>¿Qué tarea repetitiva de tu equipo, multiplicada por un año, costaría más que contratar a alguien para resolverla?</em></p>`,

  'ro-7-a3': `
<p>La hoja A3 aparece dividida en dos lados. A la izquierda, por qué importa: antecedentes, condición actual, metas y análisis. A la derecha, la solución: contramedidas, plan y seguimiento. Arriba, las iniciales de quienes revisaron y aprobaron el documento.</p>
<p>El A3, popularizado por Toyota, es una hoja de 11 por 17 pulgadas que obliga a reducir una gran idea a lo esencial. El error común, según el curso, es usarlo para documentar una solución ya decidida en vez de usarlo para desarrollarla.</p>
<p>El análisis, seleccionado al inicio, es el corazón de la herramienta: los cinco porqués con cada equipo y el diagrama de espina de pescado con seis costillas, personas, métodos, materiales, equipos, entorno y gestión, numerando cada causa raíz. El ejemplo del material muestra por qué importa: el problema de los leads no contactados puede ser de calificación o, si ventas ni sabía que recibía leads, de sistemas y de traspaso.</p>
<p>En el plan se usa DARCI para asignar roles: quién decide, quién rinde cuentas, quién ejecuta, a quién se consulta y a quién se informa. La cita de Alicia Butler Pierre cierra la idea: si no puedes expresar tu idea en una página, todavía no la entiendes del todo.</p>
<p><em>¿Qué problema de tu empresa merecería un A3 antes de que alguien proponga una solución?</em></p>`,

  'ro-7-prewiring': `
<p>La escena muestra una reunión con cuatro ejecutivos. En «Presentar en frío», uno de ellos se convierte en foco de duda y contagia al resto; en «Con pre-wiring», antes de la reunión viajan partículas a cada ejecutivo y todos llegan alineados.</p>
<p>La base es el artículo de Ronald Heifetz y Marty Linsky en Harvard Business Review: un cambio que transforma una organización pide renunciar a hábitos, lealtades y formas de pensar, a cambio de solo la posibilidad de un futuro mejor. De ahí salen los tres primeros pasos: ser honesto sobre la propia contribución al desorden, nombrar la pérdida antes de ofrecer soluciones y buscar aliados, porque ir solo es una imprudencia.</p>
<p>El cuarto paso es el pre-wiring: reunirse con cada ejecutivo por separado, aliados y sobre todo opositores, para resolver objeciones en privado. Ethan Rasiel lo describe en <em>The McKinsey Way</em>: no debe haber sorpresas el día de la presentación.</p>
<p>La ventaja final es práctica: con todos los actores conversados, la reunión grupal sirve para planificar cómo implementar y no para discutir si hacerlo. Además, un ejecutivo convencido puede ayudar a conseguir un espacio en la agenda.</p>
<p><em>¿Con qué persona de tu empresa deberías conversar a solas antes de proponer tu próximo cambio?</em></p>`,

  'ro-7-monroe': `
<p>A la izquierda, los cinco pasos de la secuencia motivada de Monroe; a la derecha, un correo escrito con una frase por paso, donde el paso seleccionado se destaca y los siguientes aparecen atenuados.</p>
<p>La secuencia es un marco de persuasión diseñado para mover a la acción. <strong>Atención</strong>: una frase corta que anticipe lo que se quiere lograr. <strong>Necesidad</strong>: el problema, con los gráficos del A3, para que conecte. <strong>Satisfacción</strong>: la solución en una frase de claridad inevitable. <strong>Visualización</strong>: los beneficios, con datos solo si se pueden probar. <strong>Acción</strong>: un pedido concreto, la parte más importante.</p>
<p>El ejemplo es el del curso: un correo a una líder de implementación que parte con «¿Viste el último reporte del pipeline?», describe la pérdida de clientes en el traspaso, propone presentar al especialista de implementación antes del cierre, explica que el cliente llegaría preparado al arranque y termina pidiendo 30 minutos.</p>
<p>La tarjeta inferior reúne las recomendaciones de Alicia Butler Pierre para hablar en público: Toastmasters y dos libros, <em>Cómo ganar amigos e influir sobre las personas</em>, de Dale Carnegie, y <em>How to Get Your Point Across in 30 Seconds or Less</em>, de Milo Frank.</p>
<p><em>¿Cuál de los cinco pasos sueles saltarte cuando pides algo a tu jefatura?</em></p>`,

  'ro-7-objeciones': `
<p>La grilla reúne las trece objeciones que el workbook anticipa al proponer una estrategia de RevOps; cada una muestra su respuesta sugerida. A la derecha, las lecciones del libro <em>Buy-In</em>, de John Kotter y Lorne Whitehead.</p>
<p>El punto de partida es que no basta con la ausencia de oposición: hace falta apoyo entusiasta. Heifetz y Linsky observan que quienes deciden el éxito suelen ser los del medio, sin interés en la iniciativa pero sí en la comodidad de lo conocido.</p>
<p>Varias respuestas comparten un patrón. Ante «nos ha ido bien», se reconoce el éxito y se explica la diferencia entre crecer en línea recta y a escala. Ante «¿insinúas que lo hacemos mal?», se valora lo que funciona y se muestra cómo potenciarlo. Ante «aquí somos distintos», Marcus Sheridan recuerda que en sus charlas el 100% del público cree que su negocio es distinto, cuando todos se basan en lo mismo: la confianza. Ante «es demasiado trabajo», se busca un vendedor dispuesto a experimentar y se muestran sus resultados.</p>
<p>Kotter y Whitehead agregan reglas de forma: invitar a los escépticos, responder siempre con respeto, preferir respuestas cortas y de sentido común, y prepararse, porque con una preparación de nota B+ las acciones parecen inspiradas.</p>
<p><em>¿Cuál de las trece objeciones esperarías escuchar primero en tu empresa?</em></p>`,

  'ro-7-retroceso': `
<p>La escena usa una metáfora de bolos: el pino clave, en naranja, está al frente. En «Motivar a los influyentes clave», al caer ese pino caen todos los demás; en «Volver a ordenar», la formación se reinicia.</p>
<p>El problema que aborda el workbook es el retroceso: una vez implementada la estrategia, la gente tiende a volver al estado anterior, sobre todo la gerencia, que no participa del día a día. La solución es mantener comprometidos a los influyentes clave.</p>
<p>El caso viene del artículo «Tipping Point Leadership», de W. Chan Kim y Renée Mauborgne, sobre William Bratton en la policía de Nueva York. Bratton identificó a los 76 comandantes de distrito, cada uno a cargo de 200 a 400 policías, y los puso en el foco con reuniones de estrategia dos veces por semana; el comandante que exponía recibía solo dos días de aviso para explicar los mapas y datos de su distrito.</p>
<p>El efecto cultural se resume en la última tarjeta: los resultados se volvieron visibles, nadie podía culpar al distrito vecino porque el vecino estaba en la sala, quienes mejoraban recibían reconocimiento y los comandantes replicaron el formato con sus propios equipos.</p>
<p><em>¿Quiénes son los pinos clave de tu organización, las pocas personas cuyo compromiso arrastra al resto?</em></p>`,

  /* ── Lección 8 · Estructura ────────────────────────────────────── */

  'ro-8-silos': `
<p>La escena muestra las operaciones de marketing, de ventas y de servicio en tres modos. En «Silos», cada una trabaja sobre su bloque, sin conexión. En «Estructura formal», aparece un líder de RevOps al que las tres reportan. En «Cadencia informal», no cambia la línea de reporte, pero una reunión periódica conecta a los tres equipos.</p>
<p>La idea viene del workbook: para que el cambio ocurra hay que pensar en los silos y en cómo te organizas. Se puede hacer formalmente, con una línea de reporte hacia una persona con experiencia en operaciones, o informalmente, con una cadencia regular en la que los líderes de operaciones se reúnen y toman decisiones juntos.</p>
<p>La actividad propuesta tiene tres pasos: dibujar el organigrama actual marcando los silos y los puntos donde se rompe la alineación, dibujar el organigrama ideal al que el equipo pueda crecer y trazar el camino entre ambos, con el orden de los cambios y las personas cuyo apoyo se necesita.</p>
<p><em>¿Qué modo describe mejor a tu empresa hoy, y cuál sería realista en un año?</em></p>`,

  'ro-8-capas': `
<p>Las cuatro pestañas muestran cómo crece un equipo de operaciones: una persona sola; luego se suma alguien de sistemas; después, alguien de análisis; y a escala, otra persona de sistemas y otra de análisis. Cada figura lleva un accesorio que indica su función.</p>
<p>La secuencia viene de Greg Keshian, que distingue tres tipos de personas bajo el paraguas de operaciones: quienes ejecutan la misión, como el equipo de éxito del cliente, las de sistemas y las de análisis, que se suman en equilibrio según los problemas previstos para los próximos 6 a 12 meses. Ross Nibur agrega que el personal administrativo es una contratación crítica temprana, y Matt Volm describe el punto de quiebre de quien trabaja solo.</p>
<p>La cita principal introduce el concepto de proceso de escritorio: quien hace operaciones de ventas debe saber hacer todo lo que un vendedor hace en su escritorio, cada botón y cada clic, aunque no sepa vender.</p>
<p>Las tarjetas inferiores agregan dos cuidados. Bryan Semple advierte que cuantos más administradores hay, más se personaliza el sistema. Y los especialistas necesitan líderes que construyan relaciones con marketing, ventas y servicio para que no pierdan el rumbo.</p>
<p><em>Si pudieras sumar una sola persona a tu equipo de operaciones, ¿sería de sistemas o de análisis?</em></p>`,

  /* ── Lección 9 · Contratación ──────────────────────────────────── */

  'ro-9-necesidad': `
<p>La tabla de la izquierda reproduce la actividad del workbook: cada responsabilidad del equipo, las habilidades que requiere y su desempeño, que puede marcarse como satisfactorio, insatisfactorio o nulo. Nulo indica una responsabilidad que hoy nadie tiene y que el equipo quiere asumir. La primera fila viene del workbook; las demás son ejemplos.</p>
<p>A la derecha, la pregunta clave: qué frena cada responsabilidad insatisfactoria o nula. El workbook distingue tres causas con respuestas distintas. Si hay demasiadas tareas para pocas personas, contratar es una buena solución. Si faltan habilidades, contratar puede servir, pero también capacitar, apoyarse en otros equipos o consultar a expertos externos. Si la empresa no invierte lo suficiente en RevOps, contratar probablemente no lo resuelve.</p>
<p>La cita de Matt Volm describe el momento en que se llega a esta pregunta: el punto de quiebre en que una persona está tan estirada que no hace nada bien.</p>
<p>La tarjeta final indica el paso siguiente: agrupar en un mismo rol las responsabilidades que comparten habilidades, como el administrador de sistemas, que reúne la administración del CRM y la del stack.</p>
<p><em>¿Cuál de las tres causas explica mejor lo que hoy no funciona en tu equipo?</em></p>`,

  'ro-9-cuadrante': `
<p>El cuadrante cruza dos ejes: si las responsabilidades del rol son específicas o amplias, y si importa la experiencia directa o basta con la transferible. Una figura se mueve al cuadrante seleccionado y el panel muestra el tipo de candidato con una cita.</p>
<p>El <strong>especialista acreditado</strong> ocupa responsabilidades específicas con experiencia directa: se buscan credenciales estándar de la industria y aporta valor rápido. El <strong>líder de operaciones con experiencia</strong> combina responsabilidades amplias y experiencia directa: idealmente, alguien que ya ocupó ese rol en una empresa en la misma etapa de crecimiento. Ross Nibur explica su valor: muchos problemas que parecen únicos ya fueron resueltos en otras empresas.</p>
<p>El <strong>generalista en transición</strong> asume responsabilidades amplias con experiencia transferible; Chloe Barritault señala a los ingenieros de ventas como uno de los mejores perfiles para pasar a RevOps. El cuadrante inferior izquierdo no se recomienda: un foco estrecho sin credencial ni experiencia no ofrece señales de éxito. Yuri Dekiba agrega una advertencia para quien llega de afuera: no asumir que lo que funcionó en la empresa anterior funcionará en la nueva.</p>
<p>La tarjeta de compensación describe el dilema del workbook: juntar responsabilidades con poco en común exige amplitud y mueve el rol hacia la derecha y hacia abajo, donde es más fácil encontrar candidatos.</p>
<p><em>Para el próximo rol que necesita tu equipo, ¿pesa más la experiencia directa o la capacidad de aprender?</em></p>`,

  'ro-9-entrevista': `
<p>A la izquierda, las tres fases del proceso de entrevista y los tres tipos de evaluación que describe Hilmon Sorey; a la derecha, la pauta de ejemplo del workbook con sus respuestas buena, regular y mala.</p>
<p>Sorey parte de un principio: el proceso de contratación debe emular lo que la persona hará una vez contratada. Las tres fases son verificar la base técnica, buscando señales de que la persona disfruta resolver problemas con datos y sistemas, a menudo en proyectos fuera de su cargo; una evaluación de habilidades para llevar a casa, donde Chloe Barritault valora más el razonamiento que la respuesta; y una entrevista cara a cara con preguntas estandarizadas.</p>
<p>La pauta muestra cómo comparar con justicia. Ante la pregunta sobre administrar varios sistemas, una respuesta buena trae números: cuántos sistemas, cuánto bajó el costo, qué integración construyó. Una regular cuenta que se volvió la persona de referencia sin que fuera su función. Una mala habla de gustos personales, como ayudar a un familiar con su correo.</p>
<p>La prueba de habilidad del workbook sigue la misma lógica: para la comprensión básica de APIs, la tarea real es evaluar integraciones y la evaluación es hacer una llamada de prueba. Sandy Robinson cierra con una actitud: contratar a personas más capaces que uno.</p>
<p><em>¿Qué tarea real de tu equipo podría convertirse en una prueba de habilidad para candidatos?</em></p>`,

  /* ── Lección 10 · Evaluar e iterar ─────────────────────────────── */

  'ro-10-ciclo': `
<p>Tres bloques giran alrededor de una esfera central: recolectar datos, comunicar y alinear. Una partícula los recorre en ciclo, porque el curso presenta estos elementos como un proceso que se repite siempre.</p>
<p>El primer elemento es implementar los sistemas que recolectan los datos para identificar oportunidades de crecimiento. El segundo, llevar esas oportunidades a los líderes y comprometer un plan. El tercero, alinear a los equipos en métricas y metas compartidas que sostengan el plan. Mientras los equipos ejecutan, se sigue recolectando y analizando para encontrar la siguiente oportunidad.</p>
<p>Lyndon Brathwaite aporta el método para cuando no se llega a la meta: trabajar hacia atrás para entender por qué, con grupos focales de clientes o conversaciones con el personal, que casi siempre sabe qué está fallando. También recomienda seguir las conversiones hasta el ingreso: si algo no funciona, en algún punto aparece una brecha.</p>
<p>La última tarjeta describe el horizonte: con los sistemas funcionando, llega la curva del cambio, el motor corre solo y el foco pasa de resolver problemas a buscar oportunidades nuevas, como otro mercado u otro segmento.</p>
<p><em>De los tres elementos, ¿cuál está más débil hoy en tu empresa?</em></p>`,

  'ro-10-metas': `
<p>Tres tarjetas resumen cómo priorizar y una tabla reproduce el plan de doce meses del workbook: metas, métricas y cómo se ve el éxito en cada uno de los cuatro trimestres. Los textos grises son ejemplos ilustrativos y los campos admiten escritura sin guardarse.</p>
<p>Por dónde empezar: Jen Spencer recomienda los problemas cuantificables, como los clics de un formulario, las tasas de abandono, los días que un negocio pasa en revisión legal o el uso de la aplicación. Lo que nunca se suelta es la optimización del proceso de ventas, porque ahí nace el flujo de ingresos que mantiene viva a la empresa; con un pipeline predecible recién se puede innovar en la experiencia del cliente.</p>
<p>La tercera tarjeta pide paciencia: los resultados no son inmediatos. Jasmine Powers describe la señal que llega con el tiempo, menor costo por lead, más conversión y mayor valor de vida del cliente, y Doug Davidoff sitúa el pago real de RevOps a unos 18 meses, dentro de una inversión de uno a tres años.</p>
<p>Las tarjetas inferiores muestran cómo bajar esa visión: Jen Spencer la divide en metas anuales y a tres años, y luego en «rocas» trimestrales, porque una meta a tres años no se puede empezar en el año tres. Sarah Doughty agrega revisar el recorrido del cliente al menos cada doce meses.</p>
<p><em>¿Qué meta de este trimestre te acercaría más a la visión de largo plazo de tu empresa?</em></p>`,

  'ro-10-diario': `
<p>La escena muestra tres bloques, las tres prioridades del día, y uno gris que se desvanece: lo que se deja de hacer. A la derecha, dos tarjetas con campos para escribir las prioridades de hoy y una lista de qué dejar de hacer, con ejemplos en gris.</p>
<p>El método es de Chloe Barritault: cada mañana su equipo define tres cosas que logrará ese día y las comunica al CEO y a los equipos con los que trabaja. Si aparece algo más urgente, hace el ejercicio de qué se sacrifica a cambio. Así protege los proyectos de largo plazo de las interrupciones.</p>
<p>Doug Davidoff aporta el complemento: en vez de una lista de pendientes, una lista de qué dejar de hacer, más corta y con mucho más poder. Jasmine Powers suma la actitud de producto mínimo viable: hacer algo, ver cómo funciona y mejorarlo.</p>
<p>El cierre del curso queda en la cita de Asia Corbett: quienes trabajan en operaciones no son solo gente de sistemas ni bloqueadores; están para ayudar a la empresa a salir al mercado y traer más ingresos.</p>
<p><em>¿Qué actividad de tu semana pondrías primero en tu lista de qué dejar de hacer?</em></p>`,
};
