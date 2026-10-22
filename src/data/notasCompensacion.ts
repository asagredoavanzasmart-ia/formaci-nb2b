/**
 * Guión del presentador — clase "Pagar para vender mejor" (prefijo cc-).
 * Reglas: lee y complementa lo que hay en pantalla sin describir su estructura; 2.ª persona
 * del singular, lenguaje neutro; rótulos en negrita; una sola pregunta abierta final en <em>.
 * Duración objetivo: entre 1 y 2,5 minutos por diapositiva.
 */

export const notasCompensacion: Record<string, string> = {
  'cc-slide-0': `
<p><strong>Pagar para vender mejor: la evidencia sobre compensación comercial.</strong> Casi todas las empresas con equipo de ventas pagan comisiones y bonos, y casi todas lo hacen por intuición: si pago más, venderán más. Esta clase pone esa intuición a prueba frente a lo que dicen los metaanálisis, los estudios de campo y los experimentos.</p>
<p>Cada hallazgo llega con su <strong>sello de evidencia</strong>, porque no pesa lo mismo un metaanálisis de decenas de estudios que un experimento con estudiantes, un caso en una sola empresa o un modelo teórico. Entender de dónde viene cada resultado ayuda a decidir cuánto confiar en él y en qué contexto aplicarlo. En cada tema aparecen la fuente, el tamaño de la muestra cuando se conoce y el contexto en que se hizo el estudio.</p>
<p>El recorrido tiene seis bloques: si el dinero funciona, cómo se diseña el contrato, el equipo como ecosistema, la conducta y el refuerzo, las metas con el rol y el entrenamiento, y un cierre de pensamiento crítico con un diagnóstico de tu propio plan.</p>
<p><em>Antes de empezar: ¿qué creencia sobre las comisiones das hoy por obvia en tu empresa?</em></p>`,

  'cc-cantidad': `
<p><strong>Más cantidad, no necesariamente más calidad.</strong> El pago variable empuja lo que se mide fácil. Si quieres precisión técnica o buen servicio posventa, el contrato tiene que medirlos.</p>
<p>La evidencia viene de Jenkins, Mitra, Gupta y Shaw, un metaanálisis de 1998 que reunió 39 estudios y 47 relaciones. La correlación corregida entre incentivo y <strong>cantidad de ventas</strong> fue de 0,34. Con la <strong>calidad del trabajo</strong> no hubo relación significativa. Una aclaración sobre la escala: la altura de la barra no es un porcentaje de mejora, es una correlación, y «corregida» significa ajustada por error de muestreo y por la fiabilidad de las mediciones.</p>
<p><strong>Por qué ocurre.</strong> La teoría de agencia con tareas múltiples explica que el pago contingente desplaza la atención hacia lo fácil de cuantificar y de auditar, y deja sin premio lo que no se mide. Si la comisión premia la colocación bruta, el vendedor tiene menos razones para invertir tiempo en asesoría o en servicio posventa.</p>
<p><strong>Qué hacer.</strong> Incluir en el bono métricas de calidad, como la retención de clientes o la satisfacción. Sin ellas, el dinero por sí solo no producirá excelencia de servicio.</p>
<p><strong>Lo que añade el metaanálisis más reciente.</strong> Kim, Gerhart y Fang, en 2022, reexpresan ese 0,34 como una diferencia estandarizada de +0,79 y confirman que el efecto de los incentivos es positivo, pero menos positivo cuando lo que se mide es calidad.</p>
<p><em>¿Qué parte de la calidad de tu servicio hoy no aparece en ninguna métrica del bono de tu equipo?</em></p>`,

  'cc-magnitud': `
<p><strong>Cuánto mejora el desempeño: del 16 al 22 %.</strong> Dos metaanálisis independientes coinciden en el orden de magnitud: los programas estructurados de incentivos mejoran el rendimiento de forma apreciable.</p>
<p>El primero es el de Condly, Clark y Stolovitch, de 2003. De unas 600 investigaciones filtraron 45 estudios controlados, y el promedio de mejora fue del <strong>22 %</strong>. El segundo es el de Stajkovic y Luthans, también de 2003, con 72 estudios de modificación de conducta organizacional: un efecto medio de 0,47 desviaciones estándar, equivalente a una mejora del <strong>16 %</strong>. Son metodologías distintas, así que no se promedian: lo que muestran es un rango.</p>
<p><strong>Por qué solo 45 de 600.</strong> Condly y colaboradores exigieron que cada estudio hubiera medido el desempeño antes del programa de incentivos. Cerca del 83 % de los estudios publicados no lo hacía, y sin ese punto de partida no se puede saber cuánto mejoró realmente la gente.</p>
<p><strong>Según el tipo de tarea.</strong> En el mismo metaanálisis, las tareas manuales mejoraron algo más que las cognitivas; los programas largos lograron más que los cortos; y los incentivos dirigidos a equipos superaron a los individuales.</p>
<p>La lectura práctica es que resulta razonable esperar una mejora en ese rango al pasar de un pago plano a uno estructurado, y que la magnitud depende del tipo de trabajo y de cómo se diseñe el programa.</p>
<p><em>En tu equipo, ¿qué parte del trabajo es rutinaria y qué parte es consultiva, y el plan de pago refleja esa diferencia?</em></p>`,

  'cc-intrinseca': `
<p><strong>¿El dinero mata la motivación interna?</strong> Durante años se creyó que las recompensas tangibles apagan el interés por la tarea. El metaanálisis más reciente indica lo contrario en tareas interesantes.</p>
<p>Son tres cifras, todas diferencias estandarizadas entre trabajar con y sin incentivo financiero. En 2010, Weibel y colaboradores reportaron un efecto de −0,13 en tareas interesantes: negativo, y de ahí viene la creencia. Jenkins y colaboradores, en 1998, ya habían encontrado un efecto positivo, también en tareas interesantes. En 2022, Kim, Gerhart y Fang reanalizaron la evidencia: <strong>+0,58 en tareas interesantes</strong> y <strong>+0,52 en tareas poco interesantes</strong>. Es decir, positivo en ambos casos.</p>
<p><strong>Por qué se pensó lo contrario.</strong> Buena parte de los experimentos clásicos sobre este efecto usaron niños o estudiantes con pagos pequeños y puntuales. Un bono significativo en un trabajo adulto es otra situación.</p>
<p><strong>La salvedad que se mantiene.</strong> Para la calidad, el efecto es menos positivo, sobre todo en tareas interesantes: el incentivo no sustituye al criterio profesional.</p>
<p>La consecuencia para el diseño es que pagar bien por resultados no es, en sí mismo, una amenaza a la motivación; el riesgo está en pagar solo por lo que se mide con facilidad y descuidar la calidad.</p>
<p><em>¿Qué parte de lo que hace tu mejor vendedor lo haría igual sin bono, y qué parte no?</em></p>`,

  'cc-segmentos': `
<p><strong>Un equipo de ventas no es uno: son tres.</strong> Rezagados, núcleo y estrellas reaccionan distinto al mismo contrato. Diseñar para el promedio deja a los tres a medias.</p>
<p>La idea viene de Steenburgh y Ahearne, en la Harvard Business Review de 2012, y del estudio de Chung, Steenburgh y Sudhir, publicado en Marketing Science en 2014, que usó datos de una gran empresa de suministros de oficina durante tres años. Encontraron que los bonos elevan la productividad en todos los segmentos, pero actúan de manera distinta en cada uno.</p>
<p>Los <strong>rezagados</strong> —<em>laggards</em>— tienden a rendirse cuando están lejos de la cuota. Les sirven los bonos intermedios, como los trimestrales, que funcionan como puntos de control y les mantienen un siguiente escalón al alcance.</p>
<p>El <strong>núcleo</strong> —<em>core performers</em>— es el grupo más numeroso de la mayoría de los equipos de ventas, y los gerentes suelen ignorarlo. En un experimento de Ahearne, el núcleo prosperó con metas de varios niveles, con un primer tramo fijado en un nivel que alcanzan con facilidad.</p>
<p>Las <strong>estrellas</strong> —<em>stars</em>— son el segmento de mayor rendimiento. Una vez superada la cuota, no frenan su esfuerzo, y las comisiones por sobrecumplimiento los ayudan a sostener su producción.</p>
<p>Es evidencia de campo en una sola empresa: el tamaño de cada segmento y su reacción pueden variar de una organización a otra, pero la idea de fondo, que un mismo plan produce conductas distintas, es lo que importa para el diseño.</p>
<p><em>¿Para qué segmento diseñó tu empresa su plan de comisiones, y cuál se quedó sin palanca?</em></p>`,

  'cc-topes': `
<p><strong>Topes y aceleradores: qué pasa después de la cuota.</strong> El contrato decide si vender de más sigue valiendo la pena. El ejemplo parte de una cuota de 100.000 dólares y una comisión base del 5 %.</p>
<p>Las barras muestran la comisión cobrada, en miles de dólares, cuando el vendedor logra el 80, el 100, el 120 y el 140 % de la cuota. Es un ejemplo de cálculo: el resultado depende de tres números, la comisión base, el porcentaje sobre la cuota y el nivel del tope.</p>
<p>Con <strong>tope</strong>, la comisión se detiene al 120 %: a partir de ahí cobra 6 mil dólares aunque venda mucho más. Con <strong>acelerador, sin tope</strong>, cada venta por sobre la cuota paga un 8 % en vez de un 5 %: al 140 % cobra 8,2 mil. Hasta la cuota, los dos esquemas pagan igual: 4 mil al 80 % y 5 mil al 100 %.</p>
<p><strong>Qué hace un tope.</strong> Al llegar al máximo, la siguiente venta ya no suma comisión: para el vendedor, el valor de vender de más cae a cero.</p>
<p><strong>Qué hace un acelerador.</strong> Sube el porcentaje sobre el excedente de la cuota, de modo que cada venta extra sigue pagando más que las anteriores.</p>
<p><strong>Lo que mostró el estudio de campo.</strong> Chung, Steenburgh y Sudhir encontraron que las comisiones por sobrecumplimiento ayudan a los mejores vendedores a sostener su producción después de alcanzar la cuota, y que los vendedores no frenan su esfuerzo al alcanzarla. Es evidencia de una gran empresa de suministros de oficina, durante tres años.</p>
<p><em>Si hoy tu plan tiene un tope, ¿qué hace tu mejor vendedor cuando se acerca a él?</em></p>`,

  'cc-ritmo': `
<p><strong>Acortar la distancia al premio: bonos de ritmo y metas escalonadas.</strong> Quien está lejos de la cuota tiende a rendirse. Los hitos intermedios mantienen un siguiente escalón al alcance.</p>
<p>Hay dos esquemas posibles a lo largo de los cuatro trimestres. Con <strong>solo cuota anual</strong>, hay un único premio, al cierre del año, y queda lejos durante meses. Con <strong>hitos trimestrales</strong>, hay un punto de control y un premio al cierre de cada trimestre.</p>
<p><strong>Rezagados.</strong> El estudio de campo de Chung, Steenburgh y Sudhir encontró que los vendedores tienden a rendirse cuando están lejos de la cuota. Con un premio anual, ese riesgo dura meses.</p>
<p><strong>Bonos trimestrales.</strong> Funcionaron como puntos de control, sobre todo para los vendedores de menor desempeño, que así mantienen el ritmo hacia la cuota anual.</p>
<p><strong>Núcleo.</strong> En un experimento de Ahearne, citado por Steenburgh y Ahearne, el núcleo prosperó con metas de varios niveles: el primer tramo se fija en un nivel que alcanzan con facilidad, y los siguientes elevan el desafío.</p>
<p>Lo común a los tres casos es una misma idea: el esfuerzo se sostiene cuando el premio siguiente está a la vista y es alcanzable, y se erosiona cuando la cuota parece lejana.</p>
<p><em>¿Cuánto tiempo pasa en tu equipo entre una venta bien hecha y el siguiente hito que premia el avance?</em></p>`,

  'cc-umbral': `
<p><strong>Todo o nada frente a pago lineal.</strong> Un bono que solo se paga al 100 % de la meta deja sin premio a quien queda cerca y tienta a exagerar los resultados.</p>
<p>El ejemplo de cálculo muestra qué porcentaje del bono se paga según el cumplimiento. Con <strong>todo o nada al 100 %</strong>, quien cumple 60, 80 o 95 % cobra cero, y recién al 100 % cobra todo. Con <strong>lineal desde 70 %</strong>, el pago crece de a poco: 33 % del bono al 80 %, 83 % al 95 %, y el total al 100 %.</p>
<p><strong>El experimento.</strong> Cadsby, Song y Tapon, en 2010, reunieron estudiantes en un laboratorio de la Universidad de Guelph y les pidieron formar palabras con unas letras en un minuto, con un bono al llegar a nueve palabras. Cuanto más cerca de la meta quedaba la persona, más probable era que exagerara su puntaje.</p>
<p><strong>La comparación.</strong> Con pago por palabra, es decir lineal, los participantes engañaron significativamente menos. Quien cobra por cada unidad no tiene un umbral que lo tiente. Los autores sugieren que quien queda a un paso de la meta puede sentir que el bono se le debe, y que una pequeña exageración le pesa menos.</p>
<p><strong>El otro riesgo.</strong> En el estudio de campo de Chung y colaboradores, los vendedores tienden a rendirse cuando están lejos de la cuota: un umbral inalcanzable les quita el incentivo para intentarlo.</p>
<p>El experimento es de laboratorio, con estudiantes y sin supervisión; los autores recomiendan, en la práctica, contar con auditoría interna cuando se usan bonos por meta.</p>
<p><em>¿Qué hace hoy el vendedor que va en el 92 % de su cuota a dos semanas del cierre?</em></p>`,

  'cc-cuotas': `
<p><strong>Cuotas justas: el territorio importa.</strong> Una cuota idéntica para carteras desiguales exige esfuerzos muy distintos. Conviene comparar qué parte de su potencial debe vender cada territorio.</p>
<p>El ejemplo compara dos territorios: el A tiene un potencial de 200 y el B, de 100, y la cuota base es 80 para cada uno. Con <strong>cuota idéntica</strong>, el vendedor del A necesita vender el 40 % de su potencial; el del B, el 80 %. Con <strong>cuota normalizada</strong>, el total del equipo se mantiene en 160, pero se reparte según el potencial: unos 107 para el A y 53 para el B, y ambos necesitan vender cerca del 53 % de lo que su territorio permite.</p>
<p><strong>Teoría de la equidad.</strong> Adams, en 1965, planteó que cada persona compara lo que recibe, en relación con lo que aporta, con lo que reciben y aportan sus pares. Si el mismo bono exige la mitad del esfuerzo en un territorio que en otro, la comparación resulta injusta.</p>
<p><strong>Cómo calibrar.</strong> Ponderar el potencial de cada territorio, por ejemplo por cantidad de clientes y madurez de la cartera, antes de fijar las cuotas individuales.</p>
<p>La aritmética del ejemplo es sencilla, pero ilustra el principio: la cuota total puede ser la misma y aun así repartirse de forma más o menos justa.</p>
<p><em>Si intercambiaras hoy los territorios de dos de tus vendedores, ¿quién cumpliría su cuota con más facilidad?</em></p>`,

  'cc-perdida': `
<p><strong>Encuadre de pérdida: el bono que ya sientes tuyo.</strong> Perder duele más que ganar. Entregar el bono al inicio, con devolución si no se cumple, aprovecha esa asimetría.</p>
<p>La aversión a la pérdida describe que una pérdida pesa aproximadamente el doble que una ganancia equivalente. El efecto de dotación añade que valoramos más lo que ya sentimos propio. Hay dos formas de plantear el mismo bono: <strong>al final, como ganancia</strong>, se promete para después; <strong>adelantado, como pérdida</strong>, se entrega al inicio del ciclo y hay que devolverlo si no se cumplen las metas.</p>
<p><strong>El experimento.</strong> Fryer, Levitt, List y Sadoff, en 2012, pagaron a unos 150 docentes de Chicago Heights un bono de 4.000 dólares al inicio del ciclo, con la obligación de devolverlo si los resultados de sus alumnos no mejoraban. Con el encuadre de pérdida, los puntajes de matemáticas subieron cerca de 0,20 desviaciones estándar, y hasta 0,40 en otra muestra. Con un bono estándar, el efecto fue menor y sin significación estadística.</p>
<p>La evidencia viene de docentes, no de vendedores, y se publicó como documento de trabajo del NBER, el número 18237. Muestra que, ante el mismo dinero, la forma de ofrecerlo cambia el esfuerzo.</p>
<p><em>¿Qué parte del bono de tu equipo se siente hoy como algo que ya se tiene, y cuál como algo que quizás llegue?</em></p>`,

  'cc-sorting': `
<p><strong>Quién entra y quién se va: el efecto de ordenamiento.</strong> Un pago variable no solo cambia el esfuerzo de quienes ya están: cambia a quién atrae y a quién retiene.</p>
<p><strong>El caso Safelite.</strong> Lazear, en la American Economic Review del año 2000, estudió a instaladores de parabrisas que pasaron de un sueldo por hora a un pago por pieza. La producción por trabajador subió un 44 %, y la empresa ganó más. Cerca de la mitad vino del <strong>efecto incentivo</strong>: más esfuerzo de quienes ya estaban. La otra mitad vino del <strong>efecto ordenamiento</strong>: entraron y se quedaron trabajadores más productivos.</p>
<p><strong>Lo que confirmó el laboratorio.</strong> Cadsby, Song y Tapon, en 2007, compararon en un experimento de esfuerzo real el pago por desempeño con el sueldo fijo. La productividad fue significativamente mayor con pago por desempeño, tanto por ordenamiento como por incentivo. Los trabajadores más productivos eligieron más el pago por desempeño, y quienes tenían más aversión al riesgo lo eligieron menos y respondieron menos a él.</p>
<p>La implicación para el diseño es que el plan de pago funciona también como un filtro: define qué tipo de vendedor se siente cómodo en la empresa. El caso Safelite es de trabajo rutinario medido por pieza, en una sola empresa, así que conviene leerlo como una ilustración del mecanismo y no como una cifra que se repita en cualquier venta.</p>
<p><em>Con el plan de pago que tienes hoy, ¿qué tipo de vendedor se siente cómodo en tu empresa y cuál se siente fuera de lugar?</em></p>`,

  'cc-torneos': `
<p><strong>Torneos de suma cero: cuando ayudar sale caro.</strong> Si solo gana el primero del ranking, ayudar a un colega es regalarle ventaja. El contrato puede premiar la cooperación o castigarla.</p>
<p>Hay dos esquemas. En el <strong>ranking: gana solo el primero</strong>, un único premio concentra la competencia y cada uno guarda lo que sabe. En el <strong>estándar absoluto o bono de equipo</strong>, todos pueden llegar al estándar y el conocimiento circula.</p>
<p><strong>La lógica del torneo.</strong> Lazear formalizó este problema: cuando la paga depende del desempeño relativo frente a los compañeros y no de un estándar absoluto, bajar el resultado del colega vale lo mismo que subir el propio.</p>
<p><strong>Qué incentiva.</strong> Con ese esquema, negar ayuda, ocultar información o interferir con el trabajo de los pares se vuelve racional para quien compite por el único premio.</p>
<p><strong>Qué cambia con un estándar absoluto.</strong> Si el premio depende de alcanzar un estándar y no de superar al compañero, ayudar a otros no perjudica a quien ayuda.</p>
<p>Es un resultado teórico, un modelo de torneos que explica por qué ocurre el problema; sirve para razonar sobre el diseño del plan, no para predecir cuánto sabotaje habrá en un equipo concreto.</p>
<p><em>En tu empresa, ¿qué información valiosa se queda con quien la descubrió porque compartirla lo perjudica?</em></p>`,

  'cc-equipo': `
<p><strong>Incentivo de equipo o individual.</strong> Premiar al equipo mostró un efecto mayor que premiar a cada persona por separado, y cómo se reparte el premio importa.</p>
<p>El metaanálisis de Garbers y Konradt, de 2014, reunió 146 estudios y 31.861 personas. Para incentivos <strong>individuales</strong>, con 116 estudios, el tamaño de efecto fue de 0,32; para incentivos de <strong>equipo</strong>, con 30 estudios, de 0,45. Es la g de Hedges, una medida estandarizada de la diferencia entre trabajar con y sin incentivo, expresada en desviaciones estándar. Son conjuntos distintos de estudios, de modo que la comparación es indicativa.</p>
<p>Hay tres lecturas. Primero, el <strong>reparto por aporte</strong>: las recompensas de equipo repartidas de forma equitativa, según la contribución de cada miembro, rinden más que las repartidas en partes iguales. Segundo, el <strong>tamaño y la composición</strong> del equipo: el efecto depende de cuántas personas son y de su composición, por ejemplo la proporción de mujeres y hombres. Tercero, <strong>otra revisión coincide</strong>: Condly y colaboradores, en 2003, también encontraron que los incentivos dirigidos a equipos superan a los individuales.</p>
<p>Dos metaanálisis independientes apuntan en la misma dirección, lo que da más confianza que cualquiera de los dos por separado.</p>
<p><em>¿Entre qué dos áreas de tu empresa un bono individual las pone hoy a competir en vez de cooperar?</em></p>`,

  'cc-contingencia': `
<p><strong>Para que el pago enseñe: condicionado e inmediato.</strong> Un premio moldea la conducta cuando depende claramente de lo que la persona hizo y llega pronto después de hacerlo.</p>
<p>Las barras ilustran el principio, sin cifras: la fuerza del vínculo entre conducta y premio es mayor cuando el pago llega <strong>el mismo día</strong> y se debilita pasando por <strong>quincenal</strong>, <strong>mensual</strong> y <strong>trimestral</strong>, hasta llegar a un pago <strong>anual</strong>.</p>
<p><strong>1 · Contingencia.</strong> La recompensa debe depender de una conducta u objetivo claro. Un premio que se entrega igual haga lo que se haga no cambia lo que la persona hace.</p>
<p><strong>2 · Inmediatez.</strong> Según la psicología del refuerzo, desde Skinner en 1953, cuanto más se demora el premio después de la conducta, más se debilita el vínculo entre ambos. Un bono que llega meses después de la venta se asocia mal con ella.</p>
<p><strong>3 · Saciación.</strong> El valor de un reforzador depende del estado de la persona: cuando sus necesidades ya están cubiertas, un premio estándar pierde fuerza.</p>
<p>Son principios de la psicología del refuerzo; sirven para razonar sobre el diseño de un plan de pago.</p>
<p><em>¿Cuántos días pasan hoy entre un cierre y el momento en que el vendedor ve reflejada esa venta en su pago?</em></p>`,

  'cc-triada': `
<p><strong>Dinero, retroalimentación y reconocimiento.</strong> Tres reforzadores del entorno laboral. En un experimento de campo, el dinero administrado con seguimiento conductual superó a los otros dos.</p>
<p>Las barras vienen de un experimento de Stajkovic y Luthans, de 2001, en la Academy of Management Journal. El <strong>pago por desempeño habitual</strong> mejoró el desempeño un 11 %. El <strong>dinero con seguimiento conductual</strong>, administrado con la técnica de modificación de conducta organizacional, lo mejoró un 37 %. El <strong>reconocimiento social</strong>, un 24 %, y la <strong>retroalimentación</strong>, un 20 %.</p>
<p>El segundo respaldo es el metaanálisis de los mismos autores, de 2003, con 72 estudios: una mejora media global de alrededor del 16 %, con un d de 0,47. Cada reforzador tiene un efecto significativo, y la combinación de los tres produce el efecto más fuerte.</p>
<p><strong>Una réplica en Corea.</strong> En una réplica del diseño en Corea, en una tesis de 2003, el reconocimiento social rindió más que el dinero. El orden entre los tres reforzadores puede cambiar con la cultura y el lugar de trabajo; lo que se repite es que cada uno aporta.</p>
<p>La lectura práctica es que un plan de comisiones no tiene por qué actuar solo: se puede combinar con información clara sobre el avance y con reconocimiento por la conducta deseada.</p>
<p><em>¿Cuál de los tres reforzadores está hoy más ausente en tu equipo?</em></p>`,

  'cc-metas': `
<p><strong>Metas específicas y difíciles.</strong> Treinta y cinco años de investigación muestran que una meta concreta y exigente rinde más que la exhortación genérica.</p>
<p>Hay tres niveles. La <strong>meta vaga</strong> es el «haz tu mejor esfuerzo»: no hay un estándar que cumplir, y la persona decide por su cuenta cuánto es suficiente. La <strong>meta específica y difícil</strong> es una cifra concreta, desafiante, de facturación o unidades. Locke y Latham, en un resumen de esos 35 años publicado en 2002, informan que en los metaanálisis esa meta rinde más que el «haz tu mejor esfuerzo», con tamaños de efecto de 0,42 a 0,80.</p>
<p><strong>Más difícil, más rendimiento.</strong> Los metaanálisis encontraron una relación positiva y lineal entre la dificultad de la meta y el rendimiento, con tamaños de efecto de 0,52 a 0,82. El rendimiento se aplana o cae solo cuando se alcanzan los límites de la capacidad, o cuando el compromiso con una meta muy difícil se pierde.</p>
<p><strong>Con retroalimentación.</strong> La teoría de metas incluye la retroalimentación entre sus cinco principios: claridad, desafío, compromiso, retroalimentación y complejidad de la tarea. Una meta exigente sirve cuando la persona se compromete con ella y recibe información sobre cómo va.</p>
<p>Un detalle sobre las cifras: son tamaños de efecto estandarizados, de modo que valores cercanos a 0,5 indican un efecto de tamaño medio y cercanos a 0,8, uno grande.</p>
<p><em>¿Cuál es hoy la meta de tu equipo que más se parece a un «haz tu mejor esfuerzo»?</em></p>`,

  'cc-rol': `
<p><strong>Rol claro y autoeficacia: dos predictores del desempeño.</strong> Se rinde menos cuando no se sabe con claridad qué se espera, y más cuando se confía en la propia capacidad de lograr lo que se propone.</p>
<p>Con un <strong>rol claro</strong>, hay una sola dirección hacia el objetivo. Con un <strong>rol ambiguo</strong>, llegan demandas que se contradicen.</p>
<p><strong>Ambigüedad de rol.</strong> Verbeke, Dietz y Verwaal, en 2011, sintetizaron estudios publicados entre 1982 y 2008 y encontraron que la ambigüedad de rol, es decir no saber con claridad qué se espera, se asocia con menor desempeño en ventas: un coeficiente de −0,25. Es uno de los cinco grupos de factores con relación significativa con el desempeño.</p>
<p><strong>Autoeficacia.</strong> Es la convicción de poder movilizar los recursos necesarios para lograr lo que uno se propone. Stajkovic y Luthans, en 1998, reunieron 114 estudios, con más de 21.000 personas, y hallaron una correlación media de 0,38 con el desempeño laboral.</p>
<p>Las dos cifras apuntan en direcciones opuestas porque miden cosas opuestas: la ambigüedad resta, la confianza en la propia capacidad suma. Para quien diseña un plan de pago, la conclusión es que antes de subir el incentivo conviene asegurarse de que las personas saben qué se espera de ellas.</p>
<p><em>Si le preguntaras hoy a tres vendedores qué se espera exactamente de ellos, ¿darían la misma respuesta?</em></p>`,

  'cc-bmt': `
<p><strong>Entrenar con modelado conductual: ver, practicar, corregir.</strong> Para cambiar lo que el vendedor hace, no basta explicárselo: hay que mostrárselo, hacerlo ensayar y corregirlo.</p>
<p>El entrenamiento por modelado conductual tiene cinco pasos. <strong>Describir la conducta:</strong> se definen las conductas objetivo, y funciona mejor cuando los puntos clave se presentan como las reglas que explican por qué la conducta funciona. <strong>Modelar:</strong> una persona demuestra la conducta, de modo que quien aprende ve cómo se hace. <strong>Practicar:</strong> la persona que aprende ensaya con práctica guiada. <strong>Recibir retroalimentación:</strong> después del ensayo recibe corrección sobre lo que hizo. <strong>Transferir al puesto:</strong> se promueve que lo aprendido se aplique en el trabajo real.</p>
<p>El metaanálisis es de Taylor, Russ-Eft y Chan, de 2005, en el Journal of Applied Psychology. Encontraron que este entrenamiento tiene efectos positivos en actitudes, conocimientos, habilidades y conducta en el puesto: grandes en conocimientos y habilidades, y moderados en actitudes y en la conducta en el puesto.</p>
<p>Esa diferencia es útil para planificar: se puede esperar que la gente aprenda y domine la técnica, y conviene reforzar el paso de transferencia para que el cambio llegue a la conducta diaria.</p>
<p><em>¿Qué porcentaje del entrenamiento de tu equipo es escuchar y qué porcentaje es ensayar?</em></p>`,

  'cc-solidez': `
<p><strong>Qué tan sólido es cada hallazgo.</strong> Dieciocho hallazgos de la clase, ordenados por el tipo de evidencia que los respalda. Cada tipo responde preguntas distintas.</p>
<p>Los <strong>metaanálisis</strong>, nueve, combinan muchos estudios. Entre ellos están los de Jenkins sobre cantidad y calidad, Condly con el 22 %, Stajkovic y Luthans con el 16 %, Kim, Gerhart y Fang sobre las tareas interesantes, Garbers y Konradt sobre equipos, Verbeke sobre la ambigüedad de rol, la autoeficacia, las metas de Locke y Latham y el modelado conductual de Taylor. Son la base más amplia, aunque cada uno tiene sus propios límites.</p>
<p>Los estudios de <strong>campo</strong>, cuatro, ocurren en organizaciones reales, pero suelen ser una sola empresa o un solo experimento: Chung y colaboradores sobre comisiones por sobrecumplimiento, Lazear en Safelite con el 44 %, el experimento de 2001 de Stajkovic y Luthans, y el bono adelantado de Fryer con docentes.</p>
<p>Los de <strong>laboratorio</strong>, dos, controlan las condiciones, pero con participantes y tareas que no son un equipo de ventas: los dos experimentos de Cadsby, Song y Tapon, sobre el engaño cerca del umbral y sobre el ordenamiento.</p>
<p>Y los de <strong>teoría</strong>, tres, explican por qué algo debería ocurrir: el modelo de torneos de Lazear, la equidad de Adams y el refuerzo de Skinner. Sirven para razonar; no son un resultado medido en ventas.</p>
<p>Ninguno es mejor en abstracto. Lo importante es saber qué pregunta responde cada uno y cuánto se parece su contexto al tuyo.</p>
<p><em>¿Con qué tipo de evidencia sueles tomar tus decisiones sobre compensación?</em></p>`,

  'cc-leer': `
<p><strong>Cómo leer un estudio sobre incentivos.</strong> Seis preguntas que ayudan a decidir cuánto pesa un resultado antes de convertirlo en una regla de pago.</p>
<p><strong>¿Cuántos estudios hay detrás?</strong> Un metaanálisis combina decenas de estudios, como los 146 de Garbers y Konradt. Un experimento aislado, como el de Fryer y colaboradores, muestra un solo caso.</p>
<p><strong>¿A quiénes se estudió?</strong> Instaladores de parabrisas, docentes, estudiantes y vendedores no son lo mismo. Cuanto más se parezca la muestra a tu equipo, más aplicable es el resultado.</p>
<p><strong>¿Laboratorio o campo?</strong> El laboratorio controla las condiciones, como en el experimento de Cadsby, Song y Tapon. El campo ocurre en organizaciones reales, como el estudio de Chung y colaboradores. Cada uno responde una pregunta distinta.</p>
<p><strong>¿Se midió cantidad o calidad?</strong> Jenkins y colaboradores encontraron efecto en la cantidad y ninguna relación significativa con la calidad. Una afirmación de «mejor desempeño» debería decir en qué.</p>
<p><strong>¿Cómo se expresa el efecto?</strong> Una correlación de 0,34 no es una mejora del 34 %. Existen correlaciones, diferencias estandarizadas, como d, delta o g, y porcentajes, y no se leen igual.</p>
<p><strong>¿Con qué se comparó?</strong> Cadsby, Song y Tapon compararon en 2007 el pago por desempeño con el sueldo fijo; en 2010, el pago con umbral con el pago lineal y con un torneo. El resultado depende de la comparación.</p>
<p><em>¿Cuál de estas seis preguntas te haces menos cuando alguien te presenta una cifra de mejora?</em></p>`,

  'cc-diagnostico': `
<p><strong>Diagnostica tu plan.</strong> Seis señales que un plan de compensación puede tener, cada una con la corrección que respalda la evidencia de la clase.</p>
<p>Un plan que <strong>tiene un tope de comisión</strong> necesita quitar el tope y usar aceleradores sobre el excedente, que ayudan a sostener a los mejores. Uno que <strong>paga todo o nada al 100 %</strong> necesita pago lineal, para que quien queda cerca no tenga un umbral que lo tiente. Si <strong>usa la misma cuota en todos los territorios</strong>, corresponde repartir la cuota total según el potencial de cada uno.</p>
<p>Si la <strong>cuota y el pago son solo anuales</strong>, conviene sumar hitos intermedios, como bonos trimestrales, que funcionan como puntos de control. Si <strong>premia con un ranking donde gana solo el primero</strong>, se reemplaza por un estándar absoluto o un bono de equipo repartido según el aporte. Y si <strong>paga solo por volumen</strong>, corresponde incluir métricas de calidad en el bono, porque el pago por volumen no se relaciona con la calidad.</p>
<p>El diagnóstico cuenta cuántas de las seis señales tiene tu plan. Con una o dos, son ajustes puntuales; con tres o cuatro, conviene rediseñar por etapas; con cinco o seis, el plan probablemente trabaja contra sus propios objetivos.</p>
<p>Es una guía para ordenar la conversación: la evidencia varía según el tipo de venta, el ciclo y el mercado. Lo más útil es cambiar una señal a la vez y medir el efecto.</p>
<p><em>De las seis señales, ¿cuál corregirías primero y cómo sabrías en tres meses si funcionó?</em></p>`,

  'cc-test-basico': `
<p><strong>Test 1, principiante.</strong> Diez preguntas para comprobar las ideas centrales de la clase.</p>
<p>Recorren lo esencial: qué pasa con la calidad cuando se paga por incentivos según Jenkins, cuál es la mejora media que halló el metaanálisis de Condly, qué dice el trabajo de Kim, Gerhart y Fang sobre las tareas interesantes, qué segmento sostiene su producción con comisiones por sobrecumplimiento, quién tendía a exagerar su resultado en el experimento de Cadsby, Song y Tapon, cuánto subió la producción en Safelite, qué incentivo mostró un efecto mayor según Garbers y Konradt, qué caracteriza al bono con encuadre de pérdida, qué combinación de reforzadores produce el mayor efecto y qué rinde más según Locke y Latham: una meta específica y difícil o el «haz tu mejor esfuerzo».</p>
<p>Cada respuesta viene con una explicación breve, y el resultado final trae una recomendación según el puntaje. Las preguntas que cuesten son una buena guía de qué parte de la clase conviene repasar.</p>
<p>Lo importante no es acertar a la primera, sino identificar qué parte de la evidencia aún no está clara y volver a ella.</p>
<p><em>Antes de empezar: ¿qué idea de la clase te gustaría estar en condiciones de explicarle a otra persona?</em></p>`,

  'cc-test-avanzado': `
<p><strong>Test 2, avanzado.</strong> Diez preguntas sobre cómo leer la evidencia con criterio.</p>
<p>Aquí ya no se trata de recordar qué dice un estudio, sino de saber cómo interpretarlo. Preguntan, por ejemplo, cómo debe leerse la correlación de 0,34 de Jenkins; por qué Condly y colaboradores retuvieron solo 45 de unos 600 estudios; en qué difieren Weibel y Kim sobre las tareas interesantes; qué limita extrapolar el 44 % de Safelite a una venta consultiva; qué hacen los vendedores que alcanzan la cuota según el estudio de Chung; de dónde viene la evidencia sobre el encuadre de pérdida; qué precisión corresponde al comparar 0,45 con 0,32 en equipos e individuos; qué cambió en la réplica en Corea; cómo leer el −0,25 de la ambigüedad de rol; y qué limitación tiene el experimento de Cadsby, Song y Tapon sobre el engaño cerca del umbral.</p>
<p>Cada respuesta incluye su explicación, y varias vuelven sobre las preguntas de lectura crítica que aparecieron durante la clase.</p>
<p>Un buen resultado aquí no es saber todas las cifras, sino reconocer qué tipo de estudio hay detrás de cada una y qué pregunta hacer antes de convertirla en una decisión.</p>
<p><em>¿Qué pregunta le harías primero a cualquier persona que te presente una cifra de mejora?</em></p>`,
};
