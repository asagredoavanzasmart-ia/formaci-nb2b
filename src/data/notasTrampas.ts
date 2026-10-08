/**
 * Guión del presentador — clase "Las Trampas del Deseo" (prefijo td-).
 * Fuentes: guía de estudio, síntesis, ficha de aprendizaje y resumen de pruebas
 * del usuario. El estado de la evidencia de cada estudio se verificó aparte.
 * Reglas: lee y complementa la diapositiva, 2.ª persona del singular, neutro de
 * género, una sola pregunta abierta final en <em>.
 */

export const notasTrampas: Record<string, string> = {
  'td-slide-0': `
<p>La escena muestra una figura al frente y, detrás, una fila de esferas que la siguen. Es la imagen que Ariely usa para explicar casi todo el libro, y viene de los gansos de Konrad Lorenz: la cría se apega al <strong>primer objeto en movimiento</strong> que ve y lo sigue a todas partes.</p>
<p>El título dice la tesis: somos <strong>previsiblemente irracionales</strong>. No es que nos equivoquemos al azar. Nos equivocamos siempre de la misma manera, y eso es una buena noticia, porque lo que se puede predecir se puede diseñar.</p>
<p>Y una advertencia sobre esta clase. Cada experimento del libro viene con un <strong>sello</strong> que dice cuánta evidencia tiene hoy: sólida, en disputa, no replicada, retractada o sin réplica verificada. Hace poco más de un mes se retractó uno de los estudios centrales del libro, y una clase honesta tiene que decirlo.</p>
<p><em>¿Qué decisión de compra reciente crees que tomaste de forma completamente racional?</em></p>`,

  'td-origen': `
<p>El libro empieza con una historia personal. A los 18 años, una bengala de magnesio le provocó a Ariely quemaduras de tercer grado en el <strong>70% del cuerpo</strong>. Pasó tres años en el hospital, y ahí nació su pregunta.</p>
<p>Cada día, las enfermeras le retiraban los vendajes. Creían que lo mejor era arrancarlos de un tirón: dolor intenso, pero breve. En las dos barras, el <strong>tirón</strong> es alto y angosto (mucha intensidad, poco tiempo) y el <strong>retiro lento</strong> es bajo y ancho (poca intensidad, más tiempo). Años después, en Tel Aviv, Ariely midió el dolor de pacientes con distintos estímulos y encontró que el sufrimiento global era <strong>menor con menos intensidad y más duración</strong>. El esquema es ilustrativo, no una medición.</p>
<p>Lo importante es por qué se equivocaban. <span style="background-color:#fde68a">Años de experiencia no corrigieron el sesgo</span>: el tirón acortaba su propio sufrimiento al escuchar los gritos. Un error previsible, repetido, y que la práctica no arregla.</p>
<p>A la derecha se contrasta la economía tradicional con la conductual: cálculo perfecto frente a límites cognitivos, valor absoluto frente a relativo, un mercado que corrige frente a errores que se repiten, preferencias previas frente a anclas.</p>
<p><em>¿En qué parte de tu trabajo sigues haciendo algo «porque siempre se hizo así» sin haber comprobado si funciona?</em></p>`,

  'td-header-relatividad': `
<p>Primera sección: <strong>la verdad de la relatividad</strong>. Vas a ver que no tenemos un medidor interno de valor: estimamos cuánto vale algo comparándolo con lo que tenemos al lado.</p>
<p>Y de ahí sale una consecuencia incómoda: quien controla con qué comparas, controla lo que eliges.</p>
<p><em>¿Qué cosa que compraste esta semana habrías valorado distinto si la hubieras visto sola?</em></p>`,

  'td-relatividad': `
<p>Este es el experimento más famoso del capítulo, con suscripciones a <em>The Economist</em>. El selector parte en «Con señuelo».</p>
<p>Había tres opciones. <strong>Solo online</strong>, US$59: la eligió el 16%. <strong>Solo impresa</strong>, US$125: no la eligió nadie, el 0%. Y <strong>impresa más online</strong>, también US$125: el 84%. La del medio es el señuelo: una opción que nadie quiere pero que hace que la combinada, al mismo precio, parezca una ganga.</p>
<p>En «Sin señuelo», con solo dos opciones, la preferencia se invierte: <strong>68% eligió la más barata</strong> y apenas el 32% la combinada. Era un experimento con estudiantes de MIT Sloan, con 100 personas en cada versión.</p>
<p>El sello amarillo indica lo que más importa: <span style="background-color:#fde68a">El efecto existe, pero tiene condiciones</span>: Frederick, Lee y Baskin mostraron en 2014 que aparece sobre todo cuando las opciones se describen con números, y se debilita cuando el producto se experimenta. Úsalo como herramienta con condiciones, no como ley.</p>
<p><em>¿Dónde, en tu trabajo, ofreces opciones con números donde el señuelo podría estar pesando sin que lo notes?</em></p>`,

  'td-senuelos': `
<p>El mismo mecanismo aparece en cinco pestañas, cada una con su propia escena.</p>
<p>En <strong>Televisores</strong> vemos que, entre un Grundig de 210 euros, un Sony de 385 y un Samsung de 540, casi todos eligen el del medio, porque decidir «entre dos extremos» es más fácil. El comerciante pone en el centro el que quiere vender. En <strong>Menú de restaurante</strong>, el consultor Gregg Rapp descubrió que agregar un plato carísimo sube los ingresos aunque nadie lo pida, porque empuja a pedir el segundo más caro. En <strong>Panificadora</strong>, Williams-Sonoma no vendía su modelo de US$275 hasta que lanzó uno más grande y 50% más caro; entonces el original se disparó.</p>
<p>En <strong>Casas</strong>, con una contemporánea, una clásica en buen estado y una clásica con el tejado por cambiar, la gente descarta la contemporánea y elige la clásica buena. Y en <strong>Rostros</strong>, en 600 hojas con fotos, el 75% eligió al rostro normal cuya versión retocada, algo menos atractiva, estaba cerca. Hasta la atracción es relativa.</p>
<p>Una precisión de la tarjeta de abajo: en el menú y en las casas las alturas son conceptuales; en televisores, panificadora y rostros son cifras reales.</p>
<p><em>Si tuvieras que vender tu producto estrella, ¿qué opción colocarías al lado para que se vea mejor, y sería honesto hacerlo?</em></p>`,

  'td-salarios': `
<p>Esta diapositiva muestra cómo la comparación puede salir cara. En 1993 se obligó en Estados Unidos a hacer públicos los sueldos de los altos ejecutivos, con la idea de frenar los excesos.</p>
<p>En las barras, en 1976, un director general ganaba <strong>36 veces</strong> el sueldo de un trabajador medio. En 1993, antes de la publicación, <strong>131 veces</strong>. Y tras hacerla pública, según el libro, <strong>369 veces</strong>. <span style="background-color:#fde68a">La transparencia no frenó nada: la aceleró</span>, porque cada ejecutivo empezó a compararse con sus pares y las consultoras usaron esos datos para pedir más.</p>
<p>La tarjeta de Mencken lo dice con humor: uno está satisfecho con su sueldo según gane más o menos que el marido de la hermana de su esposa. Una comparación cercana, visible, a mano.</p>
<p>Y el caso del médico de Harvard: dejó la investigación del cáncer, con 160.000 dólares al año, para asesorar inversiones en Wall Street tras enterarse de los yates de sus colegas. Multiplicó por diez sus ingresos y se fue para no sentirse «pobre» en términos relativos.</p>
<p>Una aclaración: las proporciones vienen del libro y no pude verificarlas de forma independiente, por eso el sello gris.</p>
<p><em>¿Con quién te comparas hoy, y esa persona la elegiste tú o apareció sola en tu campo visual?</em></p>`,

  'td-header-anclas': `
<p>Segunda sección: <strong>la falacia de la oferta y la demanda</strong>. La economía clásica dice que los precios nacen del equilibrio entre lo que cuesta producir y lo que queremos los consumidores, como dos fuerzas independientes.</p>
<p>Vas a ver por qué Ariely dice que eso no es así: nuestra disposición a pagar se moldea con anclas que pone la oferta. Y también vas a ver qué estudios sostienen esa idea y cuáles no.</p>
<p><em>¿Cuánto pagas por tu café habitual, y recuerdas cuándo fijaste ese precio como «normal»?</em></p>`,

  'td-impronta': `
<p>Aquí está la idea de la impronta, de Konrad Lorenz. Las crías de ganso, al romper el cascarón, se apegan al primer objeto en movimiento que ven, que normalmente es su madre. Lorenz se aseguró de ser él ese objeto, y las crías lo siguieron a todas partes.</p>
<p>En el selector, «Solo viste el precio» deja las esferas dispersas: la exposición sola no fija nada. «Consideraste comprarlo» las alinea detrás de la figura. Según el libro, <strong>un precio impreso en una etiqueta no se convierte en ancla por el solo hecho de verlo</strong>; se fija cuando consideras comprar o haces una primera transacción a ese precio.</p>
<p>Y desde ahí, <span style="background-color:#bbf7d0">todas las estimaciones de valor para cosas parecidas se calculan en relación con ese primer punto</span>. Por eso la primera decisión de una cadena pesa tanto: fija la norma para muchísimas decisiones futuras.</p>
<p>Un matiz de rigor, en la tarjeta ámbar: la condición de «considerar la compra» es la tesis del libro. Otros estudios de anclaje encuentran efectos incluso cuando el ancla solo se ve, así que la frontera no es tan nítida como aquí se presenta.</p>
<p><em>¿Cuál fue la primera decisión de compra de tu vida adulta que todavía te marca el precio de lo que consideras normal?</em></p>`,

  'td-coherencia': `
<p>Este es el experimento de la coherencia arbitraria, con 55 estudiantes de MIT Sloan. Escogieron los dos últimos dígitos de su número de Seguro Social, anotaron si pagarían esa cifra en dólares por seis productos y luego pujaron en una subasta real.</p>
<p>Arriba hay un selector de productos y las barras crecen según el grupo de dígitos. En el teclado inalámbrico, el grupo de dígitos 00–19 pujó 16 dólares y el de 80–99 pujó casi <strong>56</strong>: <strong>3,5 veces más</strong>. En el trackball, 8,64 frente a 26,18. <span style="background-color:#fde68a">Un número elegido al azar fijó cuánto estaban dispuestos a pagar.</span></p>
<p>La parte «coherente» es que todos pujaron más por el teclado que por el trackball y más por el Hermitage que por el Côtes du Rhône. El ancla era arbitraria, pero el orden entre productos era lógico. Esto cuestiona que los precios reflejen un valor interno.</p>
<p>Una aclaración sobre el número: la fuente dice que pujaron «216% a 346% superiores», pero eso es el cociente, no el aumento. En la tabla del propio libro es de 2,2 a 3,5 veces, o sea, de 116% a 246% más.</p>
<p>Y el sello amarillo: Fudenberg, Levine y Maniadis repitieron la manipulación en 2012 y encontraron efectos <strong>mucho más débiles</strong> en bienes comunes y <strong>ninguno</strong> en loterías.</p>
<p><em>Si el efecto es real pero más débil de lo que se cuenta, ¿cuánto de tus compras crees que sigue estando influido por anclas?</em></p>`,

  'td-persisten': `
<p>Dos experimentos muestran cuánto dura un ancla. El primero, en la pestaña <strong>Tonos molestos</strong>.</p>
<p>Escucharon un chillido de 3.000 Hz. A un grupo se le preguntó si lo volvería a oír por 10 centavos; a otro, por 90. Después se les pidió su oferta real: los del ancla de 10 exigieron <strong>33 centavos</strong> y los del ancla de 90, <strong>73</strong>. En la segunda fase, con un ruido blanco y la misma pregunta neutra de 50 centavos para todos, el grupo bajo siguió exigiendo menos. Y en la tercera, con las anclas invertidas, <span style="background-color:#fde68a">ganó la primera impronta</span>.</p>
<p>La tarjeta de abajo trae el experimento mental de la amnesia: si un impuesto duplicara la gasolina y la leche <em>y todos olvidaran los precios anteriores</em>, la demanda casi no cambiaría. Reaccionamos a la memoria de lo que pagamos, no a una preferencia interna.</p>
<p>El segundo, la pestaña «Efecto Tom Sawyer»: Ariely leyó poemas de Whitman a una clase. A una mitad le preguntó si <strong>pagaría</strong> 10 dólares por escucharlos; a la otra, si <strong>aceptaría cobrar</strong> 10. En la subasta, los del grupo «pagar» ofrecieron 1, 2 y 3 dólares por lecturas breve, media y larga; los del grupo «cobrar» exigieron 1,30, 2,70 y 4,80. La misma experiencia, vivida como privilegio o como castigo.</p>
<p>Ambos llevan el sello gris: no encontré réplicas independientes.</p>
<p><em>¿Qué experiencia ambigua de tu vida, como una reunión o un trabajo, la juzgaste según cómo te la presentaron primero?</em></p>`,

  'td-mover-ancla': `
<p>Si el ancla manda, el negocio es cambiarla. Dos casos del libro. El primero, en la pestaña <strong>Perlas de Tahití</strong>.</p>
<p>En 1973, Salvador Assael tenía perlas negras de la ostra <em>Pinctada margaritifera</em>: del tamaño de una bala de mosquete, gris plomo, sin demanda alguna. En vez de malvenderlas, esperó a tener ejemplares mejores y convenció al joyero <strong>Harry Winston</strong> de exhibirlas en la Quinta Avenida con un precio exorbitante. Después publicó anuncios a página completa con collares de perlas negras junto a <strong>diamantes, rubíes y esmeraldas</strong>. Las ancló al lujo máximo y creó un mercado multimillonario donde no había ninguno. Las barras son un esquema conceptual, sin cifras.</p>
<p>En la pestaña <strong>Starbucks y el autogregarismo</strong>, antes el café en Estados Unidos estaba anclado en cerca de un dólar. Un «café algo mejor» a tres o cuatro habría sido rechazado al compararse con esa ancla. Howard Schultz entendió que debía <strong>desconectar al cliente de la ancla vieja</strong>: ambiente europeo, aroma a grano tostado, repostería, y nombres propios, <em>short, tall, grande, venti</em>.</p>
<p>Y ahí aparece el autogregarismo: tras una primera visita agradable, nos decimos «ya vine y me gustó», y hacemos <strong>cola detrás de nosotros mismos</strong>. La última tarjeta recuerda que ambos son casos de negocio narrados, no experimentos controlados: ilustran el mecanismo pero no lo prueban.</p>
<p><em>¿Qué hábito de consumo tuyo empezó con una prueba casual y hoy lo repites sin haberlo vuelto a decidir?</em></p>`,

  'td-auditoria': `
<p>Esta diapositiva es para ti, no para la teoría. Es un ejercicio de cinco preguntas aplicado a un gasto recurrente (un café, una suscripción, una marca). Cada pregunta marcada enciende un cubo en la escena.</p>
<p><strong>Origen del hábito</strong>: ¿cómo empezó, con una elección analizada o con una oferta o un impulso? <strong>Utilidad real</strong>: si calculas hoy, ¿lo que obtienes justifica el costo en dinero y en tiempo? <strong>Auditar la primera decisión</strong>: la más poderosa. Si lo vieras por primera vez, sin recordar lo que has pagado, ¿aceptarías este precio?</p>
<p><strong>Costo de oportunidad</strong>: ¿qué ahorro o proyecto de largo plazo sacrificas? Y <strong>romper la memoria de precios</strong>: ¿lo consumes por preferencia o por inercia? ¿Qué pasaría si lo pausas un mes?</p>
<p>Al completarse las cinco, la escena late. Y el pie recoge la frase socrática: <span style="background-color:#bbf7d0">el hábito costoso suele ser la acumulación de una primera decisión que nadie auditó</span>.</p>
<p><em>¿Cuál es el gasto que acabas de elegir, y qué respondiste a la tercera pregunta?</em></p>`,

  'td-header-gratis': `
<p>Tercera sección: <strong>el costo del costo cero</strong>. Vas a ver que «gratis» no es un descuento más grande: es otra cosa.</p>
<p>Y una vez más, vas a ver cuánto respaldo tiene cada afirmación, porque aquí el sello es distinto al de las anclas.</p>
<p><em>¿Cuántas cosas gratis aceptaste el último mes que no habrías elegido si hubieran costado un centavo?</em></p>`,

  'td-cero': `
<p>Este experimento es de Shampanier y Ariely. Un puesto vende dos chocolates: una trufa <strong>Lindt</strong>, de alta calidad, y un <strong>Kiss de Hershey</strong>, ordinario. El selector alterna dos pares de precios.</p>
<p>Con «15¢ y 1¢»: la Lindt a 15 centavos y el Kiss a 1. El <strong>73%</strong> eligió la Lindt y el 27% el Kiss. Es lo racional: por 14 centavos más, mucha más calidad. En «14¢ y gratis» se bajó un centavo a cada uno: la Lindt a 14 y el Kiss a cero. <span style="background-color:#fde68a">El Kiss pasó de 27% a 69%.</span></p>
<p>Según la lógica económica, restar lo mismo a ambos no debería cambiar nada: la diferencia relativa es idéntica. Lo que cambió es que el cero es un detonante emocional: <strong>no tiene riesgo visible de pérdida ni de mala decisión</strong>, y eso nos ata más que cualquier descuento.</p>
<p>Una aclaración en el pie: no encontré una réplica independiente, por eso el sello gris. No significa que sea falso; significa que conviene tratarlo como una hipótesis bien respaldada y no como una ley.</p>
<p><em>¿Qué cosa gratis has elegido en los últimos años que, mirando atrás, te costó más que una pagada?</em></p>`,

  'td-cero-casos': `
<p>El mismo patrón, en cuatro escenarios. A la izquierda, un experimento con niños en <strong>Halloween</strong>. Podían cambiar 1 Kiss por una barra grande, de 60 gramos, o recibir una barra pequeña, de 30, <strong>gratis</strong>. Entregar un Kiss duplicaba el chocolate, pero el <strong>70% prefirió la pequeña gratis</strong>.</p>
<p>Arriba a la derecha, <strong>Amazon en Francia</strong>: el envío gratis disparó las ventas en todo el mundo, menos allí, donde cobraban un franco, unos 15 céntimos. En cuanto lo pasaron a cero, las ventas se igualaron al resto. Abajo, <strong>AOL</strong>: con la tarifa plana de 19,95 dólares esperaban un alza de la demanda de apenas 5%. Los usuarios conectados pasaron de 140.000 a 236.000 de un día para otro: casi <strong>69% más</strong>.</p>
<p>Las otras dos tarjetas: lo gratis tiene costos escondidos, como una cola de 45 minutos por un helado; y en política pública, para masificar chequeos preventivos o vehículos eléctricos, <strong>bajar el costo no basta, hay que llevarlo a cero</strong>.</p>
<p>El pie es una pregunta útil: ¿lo elegiría si costara un centavo? Si la respuesta es no, el cero está decidiendo por ti.</p>
<p><em>¿Qué política o producto de tu organización se beneficiaría de llevar un costo a cero, y cuál se arruinaría?</em></p>`,

  'td-header-normas': `
<p>Cuarta sección: <strong>normas sociales y normas de mercado</strong>. Vivimos en dos mundos a la vez: uno cálido, de favores y comunidad, y otro frío, de precios y cálculo.</p>
<p>La tesis incómoda: cuando el dinero entra en el primero, lo destruye, y volver cuesta muchísimo. Lo vamos a ver con tres estudios, y con cuánto respaldo tiene cada uno.</p>
<p><em>¿Qué relación tuya funciona justamente porque nunca hay dinero de por medio?</em></p>`,

  'td-normas': `
<p>Este es el experimento de Heyman y Ariely. Los participantes arrastraban círculos hacia un cuadrado en la pantalla durante cinco minutos, una tarea aburrida. Lo único que cambiaba era cómo se planteaba la petición.</p>
<p>Con un pago de <strong>5 dólares</strong> arrastraron 159 círculos. Con <strong>50 centavos</strong>, solo 101: a medio gas. Y con <strong>un favor, sin pago</strong>, 168: más que con los cinco dólares. En la pestaña «Regalos» (un Snickers, una caja de Godiva, un favor) el esfuerzo se mantiene alto: 162, 169 y 168. Los regalos no ofenden porque no ponen precio.</p>
<p>La tarjeta del medio recoge el detalle que lo cambia todo: <span style="background-color:#fde68a">si al regalo se le menciona el precio, «un Snickers de 50 centavos», el esfuerzo cae al nivel del mercado</span>. Basta nombrar el valor para cambiar de mundo.</p>
<p>Y el ejemplo de la suegra: ofrecerle 400 dólares por la cena de Acción de Gracias convierte una relación afectiva en una transacción.</p>
<p>Sello gris: la idea es plausible, pero este experimento concreto no tiene réplica verificada.</p>
<p><em>¿En qué relación tuya acabas de notar que has puesto precio a algo que funcionaba como favor?</em></p>`,

  'td-rompe-vinculo': `
<p>Tres casos, uno por pestaña, donde el dinero empeoró justo la conducta que quería mejorar.</p>
<p>En <strong>Guardería en Israel</strong>, de Gneezy y Rustichini, se multó a los padres que llegaban tarde. Los retrasos <strong>aumentaron</strong>, porque la culpa social ante las maestras se convirtió en una tarifa: pagar daba derecho a retrasarse. Y al retirar la multa, la culpa no volvió. En <strong>Abogados de la AARP</strong>, se les pidió atender a jubilados por 30 dólares la hora y dijeron que no; se les pidió hacerlo gratis y aceptaron en su mayoría. Y en <strong>pensar en dinero</strong>, de Vohs, frases como «cobra un salario elevado» hicieron a las personas más autosuficientes, 5,5 minutos antes de pedir ayuda frente a 3, y menos dispuestas a ayudar.</p>
<p>La tarjeta de abajo concentra lo más importante. La guardería es <strong>un único estudio de campo</strong>, y una réplica por encuesta, de Metcalf y colegas, <span style="background-color:#fde68a">no reprodujo el efecto</span>, aunque con respuestas hipotéticas. Además, tus fuentes se contradicen sobre qué pasó tras retirar la multa, y aquí usamos la versión prudente. Los abogados son una anécdota sin estudio publicado. Y el primado del dinero se cuenta entre los efectos que peor resistieron.</p>
<p><em>¿Qué incentivo monetario de tu organización podría estar apagando una motivación que antes era social?</em></p>`,

  'td-header-caliente': `
<p>Quinta sección: <strong>estados fríos y calientes</strong>. El tema es la brecha entre quien decide con la cabeza fría y quien decide bajo una emoción intensa.</p>
<p>Los datos de esta sección vienen de un único experimento pequeño y delicado, así que te los presento con sobriedad y con todas sus cautelas.</p>
<p><em>¿En qué estado emocional tomaste la última decisión de la que más te arrepentiste?</em></p>`,

  'td-caliente': `
<p>Este estudio es de Ariely y Loewenstein, en la Universidad de Berkeley, con 25 estudiantes. Los participantes respondieron preguntas sobre conducta moral y riesgo en dos estados: uno <strong>frío</strong>, tranquilo, y otro de <strong>excitación sexual</strong>, inducida en condiciones de laboratorio. La escala va de 0 a 100.</p>
<p>Los botones alternan las seis preguntas. En «+27%», llevar a la pareja a un buen restaurante: de 55 a 70. «+70%»: decirle «te amo» para aumentar las probabilidades: de 30 a 51. «+125%»: seguir insistiendo tras un «no»: de 20 a 45. Y «+420%», la más alta: pasó de 5 a 26. La última va al revés: la probabilidad de usar siempre condón con una pareja nueva <strong>bajó</strong>, de 88 a 69.</p>
<p>Lo central es la <strong>brecha de empatía</strong>: la persona en frío subestima por completo cuánto cambiará en caliente, y la experiencia no lo corrige. No es que seamos malos: es que no podemos predecirnos desde el otro estado.</p>
<p>Y las cautelas, en la tarjeta ámbar: es una muestra de 25 estudiantes, sin réplica verificada. Además, los titulares del libro, +72% y +136%, son <span style="background-color:#fde68a">promedios de preguntas muy distintas</span>; lo veremos en la diapositiva de lo que no cuadra.</p>
<p><em>¿Qué decisión importante tuya habrías evitado si hubieras tenido que tomarla en el estado opuesto al que estabas?</em></p>`,

  'td-jekyll': `
<p>Si no puedes predecirte en caliente, la solución no es más fuerza de voluntad. Es decidir antes y quitarte la oportunidad de fallar. La figura central es la misma persona en dos estados: en «Frío» se mueve con calma y en «Caliente» cambian su ritmo, su color y su accesorio.</p>
<p>Tres aplicaciones. <strong>Educación sexual</strong>: las campañas de «simplemente di no» suponen que la razón ganará en caliente, y fallan; funciona mejor enseñar a evitar la tentación antes y garantizar acceso permanente a preservativos. <strong>Conducción juvenil</strong>: un copiloto adolescente duplica el riesgo de accidente, y dos o más lo cuadruplican; la propuesta son sistemas que limiten la velocidad o avisen a los padres ante maniobras erráticas.</p>
<p>Y la tercera es muy humana: la esposa de Ariely, Sumi, <span style="background-color:#bbf7d0">sumergió las manos en agua helada durante dos minutos</span> para anticipar en frío el dolor del parto y decidir, con calma, que necesitaría la epidural.</p>
<p>Y el pie lo amplía: sirve para ira, hambre o miedo, no solo para el deseo. El estado en que decides cambia a quien decide.</p>
<p><em>¿Qué decisión importante podrías tomar hoy, en frío, para protegerte de ti mismo en un momento caliente?</em></p>`,

  'td-header-autocontrol': `
<p>Sexta sección: <strong>desidia y autocontrol</strong>. Postergamos lo importante a favor de lo inmediato, y la herramienta que propone el libro es el compromiso previo.</p>
<p>Esta sección contiene el cambio más reciente y más importante de toda la clase: uno de los estudios que sostenía esta idea fue retractado hace pocas semanas.</p>
<p><em>¿Qué meta importante llevas meses postergando, y qué la hace fácil de postergar?</em></p>`,

  'td-ahorro': `
<p>Para dimensionar el problema de la desidia, el libro parte del ahorro. En las barras, según el libro, la tasa de ahorro personal de Estados Unidos cayó de dos dígitos en los ochenta a un 5% en 1994 y a <strong>−1% en 2006</strong>. Los europeos ahorraban un 20%, los japoneses un 25% y los chinos un 50%.</p>
<p>A la derecha, dos cifras: la familia promedio tenía <strong>6 tarjetas de crédito</strong> y una deuda de <strong>9.000 dólares</strong>, y hasta en el 10% de los casos usaba el crédito para comprar alimentos.</p>
<p>La herramienta es el <strong>compromiso previo</strong>: decidir en frío para que el yo impulsivo no tenga opciones. Descuentos automáticos del sueldo hacia fondos de inversión, citas médicas con penalización si no asistes, depósitos cobrados por adelantado.</p>
<p>Una advertencia, en el pie: son cifras de 2006 tomadas del libro, que no actualicé ni verifiqué. Sirven para ver el patrón, no para describir la situación actual.</p>
<p><em>¿Qué parte de tu ahorro hoy ocurre sin que tengas que decidirlo cada mes?</em></p>`,

  'td-fechas': `
<p>Esta es la diapositiva más delicada de la clase. Es el experimento de las fechas límite en el MIT, de Ariely y Wertenbroch, publicado en 2002. El libro lo cuenta como evidencia central de que el compromiso previo ayuda contra la desidia.</p>
<p>La pestaña «Lo que decía el libro» muestra el diseño: en tres clases, los estudiantes debían entregar tres trabajos en un semestre. Con <strong>fechas impuestas</strong> en las semanas 4, 8 y 12, las mejores notas. Con <strong>fechas que cada uno elegía</strong>, notas intermedias. Y con <strong>libertad total</strong>, todo al final, las peores. Las barras son un esquema cualitativo.</p>
<p>La pestaña «Lo que se descubrió» recoge lo siguiente: los analistas de Data Colada publicaron el 31 de agosto de 2026 que, en este Estudio 1, las notas finales de <strong>13 estudiantes</strong> del grupo que elegía sus fechas fueron <span style="background-color:#fbcfe8">alteradas tras el envío del artículo</span>, favoreciendo a quienes habían espaciado sus entregas. Con las notas recalculadas, ese grupo rindió peor: <strong>88,76 de nota media</strong> para las fechas impuestas, <strong>85,67</strong> para las elegidas. El Estudio 2, de corrección de textos con 60 personas, mostró efectos implausiblemente grandes y 18 de 20 participantes con un «gemelo» de datos idéntico.</p>
<p>La cronología: su coautor, Klaus Wertenbroch, pidió la retractación el 23 de julio. El artículo <strong>entero</strong> se retractó el <strong>2 de septiembre de 2026</strong>. Ariely dijo en un video que los datos «no son confiables» y que no sabe cómo ocurrió.</p>
<p>Y lo que sigue en pie: la comparación principal, fechas impuestas mejor que elegidas, parece sobrevivir. La idea de comprometerse de antemano es razonable y tiene otros respaldos. Pero <strong>este experimento ya no puede usarse como prueba</strong>.</p>
<p><em>Si una idea que defiendes se apoyara en un estudio que se retractó, ¿qué otras razones tendrías para seguir defendiéndola?</em></p>`,

  'td-header-valor': `
<p>Séptima sección: <strong>propiedad, opciones y expectativas</strong>. Cuatro ideas sobre cómo valoramos lo que tenemos, lo que podríamos tener y lo que esperamos sentir.</p>
<p>Los efectos van desde uno muy sólido hasta otros sin réplica, y cada uno lleva su semáforo.</p>
<p><em>¿Qué objeto que tienes venderías por mucho menos de lo que pedirías si te lo ofrecieran a ti?</em></p>`,

  'td-dotacion': `
<p>Este es el experimento de Carmon y Ariely con estudiantes de la Universidad de Duke. Acampaban durante días para entrar a un sorteo de entradas a los partidos finales de baloncesto. Después, quienes ganaron y quienes no, fijaron un precio por la misma entrada.</p>
<p>En las barras, quienes <strong>no la ganaron</strong> ofrecían en promedio <strong>170 dólares</strong>. Quienes <strong>sí la ganaron</strong> exigían <strong>2.400</strong>. Una brecha de <strong>14,1 veces</strong>. <span style="background-color:#bbf7d0">Nada en el objeto cambió, solo quién lo posee.</span></p>
<p>Son tres sesgos. Nos <strong>enamoramos</strong> de lo que tenemos. Nos enfocamos en lo que <strong>perderemos</strong>, y la aversión a la pérdida pesa más que la ganancia equivalente. Y creemos que el comprador <strong>ve lo mismo que nosotros</strong>, con nuestros recuerdos.</p>
<p>Y el sello verde es el único de la sección: el efecto de dotación se replica ampliamente, incluso en estudios recientes con miles de adultos. Lo excepcional aquí es la magnitud: ×14 es mucho más de lo habitual.</p>
<p><em>¿Qué le pasa a tu opinión sobre el precio de tu casa, tu auto o tu proyecto cuando es tuyo, frente a cuando es de otro?</em></p>`,

  'td-puertas': `
<p>La diapositiva reproduce, en una simulación propia, el mecanismo del experimento de Shin y Ariely sobre mantener las puertas abiertas. Arriba hay un pasillo con tres puertas, una por sala (roja, azul y verde): la de la sala actual aparece abierta y las otras, cerradas. Abajo está la sala donde estás, con una <strong>moneda</strong>: dentro de una sala, <strong>cada clic en la moneda paga</strong>, y cada sala paga distinto sin que se sepa cuánto.</p>
<p>Cambiar de sala, con un clic en otra puerta, <span style="background-color:#fde68a">no paga nada</span> y consume uno de los 100 clics disponibles. Bajo cada puerta, una fila de 12 puntos cuenta los clics que faltan para que se cierre: una puerta que no se visita durante 12 clics se encoge y desaparece para siempre, y los puntos se vuelven rosados cuando quedan tres o menos. El indicador superior lleva la cuenta de clics usados y del dinero ganado.</p>
<p>El panel de la derecha resume las reglas y, al agotarse los 100 clics, informa cuántos se gastaron en cambiar de sala, que son clics sin pago, y cuánto pagaba en promedio cada sala.</p>
<p>El argumento del experimento original es que las personas saltaban de sala en sala para que no se cerraran las puertas y ganaban <strong>cerca de un 15% menos</strong> que quienes se quedaban en una. Lo hacían aunque cambiar costara dinero y aunque las salas pudieran «reencarnar». Mantener todas las opciones abiertas cuesta dinero, tiempo y energía sin dar utilidad: <span style="background-color:#bbf7d0">cerrar puertas es parte de decidir.</span></p>
<p>Sobre la evidencia: la simulación usa pagos al azar y no reproduce el experimento original, que no tiene una réplica verificada; por eso el sello gris.</p>
<p><em>¿Qué puerta de tu vida estás gastando clics en mantener abierta, sin que te esté pagando nada?</em></p>`,

  'td-expectativas': `
<p>La premisa es que lo que se sabe antes de probar cambia lo que se siente al probar: el conocimiento previo reconfigura la percepción, y no es «engañarse». La escena tiene tres partes: el <strong>producto</strong> a la izquierda, una <strong>etiqueta</strong> arriba a la derecha con la información previa, y un <strong>medidor</strong> abajo con la reacción. Los botones «Sin información previa» y «Con información previa» alternan entre las dos condiciones.</p>
<p>En la pestaña <strong>Cerveza con vinagre balsámico</strong>, del bar del MIT, sin información la etiqueta muestra una interrogación, el vaso es dorado y el medidor sube: la mayoría prefirió esa cerveza cuando no sabía qué llevaba, o cuando se lo decían <strong>después</strong> de probarla. Con información, la etiqueta dice «lleva vinagre balsámico», el vaso se oscurece y el medidor cae: si se lo contaban <strong>antes</strong>, la rechazaban de plano.</p>
<p>En <strong>Coca-Cola y Pepsi en el escáner</strong>, a ciegas no había preferencia clara, pero al mostrar la marca antes del sorbo se activaba además la corteza prefrontal dorsolateral, ligada a la memoria de marca, con más actividad en el centro del placer. Aquí el medidor sube con la información, no baja.</p>
<p>La pestaña <strong>Priming de la vejez</strong> lleva el cartel «no replicó». La figura camina más despacio cuando recibe las palabras de vejez, que es lo que se afirmaba. <span style="background-color:#fde68a">No resistió la réplica</span>: con sensores y con un experimentador que desconocía la hipótesis, el efecto desapareció. Es el mismo ejemplo de la clase de Kahneman.</p>
<p>El medidor es un esquema cualitativo del sentido del efecto, no cifras del estudio.</p>
<p><em>¿Qué información previa cambió tu opinión de algo antes de que lo probaras?</em></p>`,

  'td-placebo': `
<p>Si el precio fija la expectativa y la expectativa cambia la experiencia, entonces el precio cambia el resultado. Hay dos pestañas.</p>
<p>El <strong>analgésico «Veladona»</strong>, de Waber, Shiv, Carmon y Ariely: se aplicaban descargas eléctricas a participantes tras tomar una cápsula que era <strong>vitamina C</strong> presentada como analgésico. A 2,50 dólares la cápsula, casi todos sintieron alivio. A <strong>0,10, el precio de oferta, solo la mitad</strong>. En la pestaña <strong>Bebida energética</strong>, quienes la compraron con descuento resolvieron <strong>6,5</strong> rompecabezas de palabras, frente a <strong>9</strong> de quienes pagaron el precio normal: un <strong>28% menos</strong>.</p>
<p>La lección práctica: <span style="background-color:#bbf7d0">un precio bajo puede restarle eficacia a lo que vendes</span>, no solo ingresos. Sirve para quien fija precios y para quien juzga calidad por precio.</p>
<p>Sello gris: no encontré una réplica independiente, así que trátalo como una hipótesis con respaldo experimental y no como una regla.</p>
<p><em>¿Cuánto del valor que le atribuyes a algo que compras viene del precio que pagaste?</em></p>`,

  'td-header-honestidad': `
<p>Octava sección: <strong>honestidad y grupo</strong>. Casi nadie comete un gran fraude, pero casi todos hacemos pequeñas trampas hasta el límite en que podemos seguir viéndonos como personas honestas.</p>
<p>Esta sección tiene un hallazgo muy conocido que, al someterse a una réplica grande, no se sostuvo. Vas a verlo con las cifras.</p>
<p><em>¿Cuál es la trampa más pequeña que te permites sin sentirte deshonesto?</em></p>`,

  'td-honestidad': `
<p>La primera pestaña es «Los Diez Mandamientos». Mazar, Amir y Ariely dieron una prueba de 20 matrices, pagada por acierto, con la opción de destruir la hoja y reportar solo el número. Hubo trampa. Pero cuando antes pedían <strong>recordar los Diez Mandamientos</strong>, o firmar un código de honor, <strong>la trampa desaparecía</strong>. Y subir la probabilidad de ser descubierto no la aumentaba: no hacemos un simple cálculo costo-beneficio.</p>
<p>El sello naranja y la barra resumen la replicación. Un informe de replicación preregistrado, de Verschuere y colegas en 2018, hizo <strong>25 réplicas con 5.786 participantes</strong>. En el análisis principal, 19 réplicas y 4.674 personas, el recordatorio moral dio <span style="background-color:#fde68a">0,11 matrices más</span>, con un intervalo de −0,09 a 0,31: en dirección contraria al original, que reportaba 1,45 matrices menos. <strong>No replicó.</strong></p>
<p>La pestaña «Fichas y refrigerador» recoge otros dos casos. Pagar con <strong>fichas de póquer</strong> canjeables segundos después en la misma sala <strong>más que duplicó</strong> la trampa, de +2,7 a +5,9, y 24 de 150 alumnos hicieron trampa máxima. Y el refrigerador del MIT: seis latas de Coca-Cola desaparecieron en 72 horas; seis billetes de un dólar quedaron intactos. Es llamativo, pero no un experimento controlado.</p>
<p>Y la nota del pie: las cifras de la prueba de matrices en nuestras fuentes, 32,6 y 36,1, son imposibles con 20 matrices. Lo veremos en la diapositiva de lo que no cuadra.</p>
<p><em>¿Qué recordatorio moral esperas que cambie tu conducta, y qué evidencia tienes de que lo hace?</em></p>`,

  'td-cerveza': `
<p>Este estudio es de Ariely y Levav, en la Carolina Brewery. Ofrecieron muestras gratis de cuatro cervezas a mesas de clientes. Cambió solo la forma de pedir: la escena es una mesa de clientes y el selector alterna las dos modalidades.</p>
<p>Con «En voz alta», pidiendo uno tras otro: <strong>aumentó la variedad</strong> en la mesa, porque cada uno evitaba repetir al anterior para parecer distinto. Pero quienes pidieron <strong>segundo, tercero y cuarto</strong> disfrutaron menos su cerveza y se arrepintieron más; en la escena esas personas aparecen apagadas. Con «En privado», con un menú escrito, cada cliente pidió <strong>lo que de verdad prefería</strong> y la satisfacción fue la mejor.</p>
<p>Es la <strong>necesidad de singularidad</strong>: en grupo sacrificamos el placer personal por proyectar una imagen. Lo aplicable, abajo a la derecha: en una reunión, pide las opiniones <strong>por escrito antes de hablar</strong>. Es el mismo remedio que vimos para el efecto halo.</p>
<p>Sello gris: no encontré una réplica independiente.</p>
<p><em>¿En qué reunión has elegido algo distinto a lo que querías solo por no repetir lo que dijo otra persona?</em></p>`,

  'td-header-critico': `
<p>Novena sección: <strong>pensamiento crítico</strong>, y la más importante de la clase. Hasta aquí te conté el libro tal como se cuenta. Ahora vamos a hacerle al libro lo que Ariely propone hacer con cualquier afirmación: pedirle evidencia.</p>
<p>Va a ser un ejercicio de método, no de descalificación. Cada experimento tiene su estado, y separar uno de otro es justamente el trabajo.</p>
<p><em>¿Qué harías si descubrieras que un estudio que citas a menudo no se sostiene?</em></p>`,

  'td-evidencia': `
<p>Esta es la diapositiva más importante de la clase. Dieciséis hallazgos del libro con su estado actual. A la izquierda, cinco torres de colores indican cuántos hallazgos hay en cada categoría, y un filtro (las torres o los botones superiores) deja ver solo los de un estado.</p>
<p>En <strong>verde, evidencia sólida</strong>: el efecto de dotación, que se replica ampliamente, y el anclaje con anclas explícitas, que replica bien en los proyectos Many Labs. En <strong>amarillo, en disputa</strong>: el señuelo, que existe pero se debilita fuera de lo numérico; la coherencia arbitraria con el número de Seguro Social, con efectos mucho más débiles al repetirse; la multa de la guardería; y el primado del dinero.</p>
<p>En <strong>naranja, no replicó</strong>: los Diez Mandamientos, con 25 réplicas, y el priming de la vejez. En <strong>rojo, retractado</strong>: las fechas límite del MIT. Y en <strong>gris, sin réplica verificada</strong>, la mayor parte de la lista: precio cero, placebo del precio, frío y caliente, puertas, tonos, círculos y cervezas. Gris no significa falso; significa que no encontré una prueba independiente.</p>
<p><span style="background-color:#bbf7d0">Es una forma de leer cualquier libro de divulgación</span>: hacer esta misma tabla para cada afirmación que quieras usar.</p>
<p><em>De los dieciséis, ¿cuál te dolería más que no se sostuviera, y por qué?</em></p>`,

  'td-autor': `
<p>Una clase honesta sobre este libro tiene que hablar de esto. Son hechos documentados; no hay ninguna conclusión sobre intenciones, que nadie ha probado. La línea de tiempo se organiza en cuatro tarjetas.</p>
<p>En <strong>2012</strong>, un artículo de PNAS sobre honestidad, de Shu, Mazar, Gino, Ariely y Bazerman, que no está en el libro pero comparte línea de investigación. En <strong>agosto de 2021</strong>, Data Colada mostró que un estudio de campo con aseguradoras tenía lecturas de odómetro duplicadas y alteradas, y PNAS retractó el artículo. Los autores negaron haber fabricado los datos; el archivo lo había creado y modificado por última vez Ariely, el único con acceso previo. En <strong>2024</strong>, Ariely afirma que Duke no halló pruebas de que falseara datos, aunque debió haber hecho más; Duke no lo confirmó públicamente. Y entre <strong>julio y septiembre de 2026</strong>, la retractación del estudio de fechas límite, que viste hace un momento.</p>
<p>Ahora lo que <strong>no</strong> se concluye: que toda la economía conductual sea falsa. Sus ideas centrales vienen de muchos autores, Kahneman, Tversky, Thaler, y de resultados replicados. Tampoco que cada experimento del libro esté afectado, y por eso cada uno lleva su propio sello.</p>
<p><span style="background-color:#fde68a">El método es separar la idea de la persona</span>: evaluar cada hallazgo por sus réplicas independientes, no por la fama o la credibilidad de quien lo cuenta, ni a favor ni en contra.</p>
<p><em>¿Cómo cambia tu confianza en una idea cuando descubres un problema con quien la popularizó?</em></p>`,

  'td-cuadran': `
<p>Esta diapositiva apareció sola al integrar los números de las cuatro fuentes. Al rehacer las cuentas aparecen imprecisiones, una por tarjeta.</p>
<p>La primera: <strong>«216% a 346% superiores»</strong>. Con las tablas del propio libro, 55,64 dividido por 16,09 es 3,46 veces, o sea, 246% más. El 346% es el cociente, no el aumento. La segunda: las <strong>matrices</strong>, 32,6 y 36,1 aciertos, es imposible con 20 matrices; casi seguro son 3,26 y 3,61 con el decimal corrido, así que las cifras de nuestras fuentes no son confiables.</p>
<p>La tercera es la más reveladora: los titulares de <strong>Berkeley</strong>. El +72% es el promedio de 19 preguntas; el +136% es el promedio de solo cinco, y lo arrastra un solo +420%. <span style="background-color:#fde68a">La mediana es 70%</span>, y sin ese dato el promedio baja a 65%. Un promedio de datos dispares exagera lo típico.</p>
<p>Cuarta, la <strong>guardería</strong>: una fuente dice que tras retirar la multa los retrasos aumentaron aún más; otra, que no volvió la culpa; usamos la prudente. Quinta, <strong>AOL</strong>: no hay error, solo el contraste entre lo previsto, 5%, y lo que ocurrió, casi 69%. Y sexta, las <strong>fechas límite</strong>, que el libro presenta como un hecho y hoy está retractado.</p>
<p>El pie lo resume: un error de decimal no invalida una idea. Pero la forma de detectarlo es la misma que usarías con una oferta imperdible: <strong>hacer la cuenta</strong>.</p>
<p><em>¿Qué cifra de lo que has leído esta semana te gustaría comprobar con una calculadora?</em></p>`,

  'td-cierre': `
<p>Cerramos. El título resume todo: <strong>previsiblemente irracionales, y por eso corregibles</strong>. Si el error es previsible, el entorno se puede diseñar para evitarlo.</p>
<p>Los chips son tu lista de bolsillo: no tienes un medidor interno de valor; el primer precio se vuelve tu ancla; cero no es un descuento, es una emoción; un favor puede valer más que un pago; no te conoces en caliente, así que decide en frío; comprométete antes de la tentación; lo tuyo vale más porque es tuyo; hacemos trampas pequeñas. Y el último es la cosecha de esta clase: <strong>pide réplicas y haz la cuenta</strong>.</p>
<p><span style="background-color:#bbf7d0">La misma idea vale para las ideas</span>: si el error del consumidor es previsible, también lo es la tentación de creer en un resultado famoso. La defensa es la misma: mirar si alguien lo repitió.</p>
<p><em>Después de esta clase, ¿qué decisión vas a tomar en frío antes de que llegue el momento caliente?</em></p>`,

  'td-header-test': `
<p>Cerramos con una <strong>evaluación en dos niveles</strong>. No es para calificar a nadie: es para que cada quien vea qué le quedó claro y qué conviene repasar.</p>
<p>El primero cubre los efectos centrales del libro. El segundo entra en la evidencia: qué resistió una réplica, qué se retractó, cómo leer las cifras y cómo evaluar un hallazgo famoso. Diez preguntas cada uno, con explicación después de responder.</p>
<p><em>¿Qué parte de esta clase sientes que todavía no podrías explicarle a otra persona?</em></p>`,

  'td-test-basico': `
<p>Este es el <strong>primer test: nivel principiante</strong>. Son diez preguntas con alternativas, cada una con su explicación.</p>
<p>Cubre los efectos centrales: el señuelo de <em>The Economist</em>, el ancla del Seguro Social, el precio cero con los chocolates, la guardería, los círculos del favor, la brecha frío-caliente, el compromiso previo, el efecto de dotación en Duke, las puertas y el analgésico «Veladona».</p>
<p><span style="background-color:#bbf7d0">Al final aparece el puntaje con una recomendación según el resultado.</span> Las explicaciones traen las salvedades de evidencia: no son solo la respuesta correcta, son el estado de cada hallazgo.</p>
<p><em>¿Cuál de estas preguntas te hizo dudar entre dos alternativas que al principio parecían obvias?</em></p>`,

  'td-test-avanzado': `
<p>Este es el <strong>segundo test: nivel avanzado</strong>. Ya no pregunta qué dice el libro, sino <strong>cómo se sostiene</strong>.</p>
<p>Vuelven los puntos exigentes: lo que encontraron Fudenberg, Levine y Maniadis; la replicación de los Diez Mandamientos con 5.786 personas; qué se descubrió en el Estudio 1 del artículo retractado; cómo se lee el «216% a 346%»; qué son realmente los titulares de Berkeley; la crítica de Frederick, Lee y Baskin al señuelo; la réplica por encuesta de la guardería; por qué importa una muestra de 25 personas; el experimento mental de la amnesia; y cómo evaluar un hallazgo famoso cuando hay acusaciones contra su autor.</p>
<p>La última pregunta es la que más importa: <span style="background-color:#fde68a">ni descartar el libro entero ni defenderlo entero.</span> Separar la idea de la persona y mirar la evidencia de cada experimento.</p>
<p><em>¿Qué otro libro de divulgación que da por bueno tu entorno te gustaría someter a este mismo semáforo?</em></p>`,
};
