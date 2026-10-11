/**
 * Guión del presentador — clase "RevOps" (prefijo ro-).
 * Fuentes: certificación de Revenue Operations (HubSpot Academy, 2024).
 * Reglas: describe lo que la diapositiva contiene nombrando pestañas y elementos
 * por su etiqueta exacta, sin invitar a interactuar. 2.ª persona singular,
 * neutro de género, una sola pregunta reflexiva final en <em>.
 */

export const notasRevOps: Record<string, string> = {

  /* ── L1 Bienvenida ─────────────────────────────────────── */
  'ro-1-bienvenida': `
<p>La diapositiva muestra tres figuras isométricas que representan a los tres equipos que RevOps alinea: Marketing con megáfono, Operaciones con engranaje y Ventas con brújula. Partículas viajan entre ellas indicando el flujo bidireccional de información.</p>
<p>La pestaña <strong>¿Qué es RevOps?</strong> define el objetivo primario de un profesional de Revenue Operations: <strong>alinear personas, procesos, sistemas y datos para mejorar la generación de ingresos del negocio</strong>. Las tarjetas inferiores sintetizan los cuatro pilares y los tres equipos involucrados.</p>
<p>La pestaña <strong>¿Cómo convencer?</strong> aborda la estrategia de adopción: el camino recomendado es usar <strong>técnicas de influencia interna basadas en experiencias RevOps del mundo real</strong>. Los tres puntos debajo detallan: técnicas de influencia interna, experiencias demostrables e iteración con los equipos afectados antes de implementar.</p>
<p>La pestaña <strong>Certificación</strong> explica que para obtener el certificado el aprendiz debe <strong>tomar y aprobar un examen</strong> al finalizar todas las lecciones. El curso incluye un workbook descargable aplicable a cualquier tamaño de empresa o industria.</p>
<p><em>¿En qué área de tu negocio de ingresos existe hoy una función que opera sin proceso claro ni métrica que la mida?</em></p>`,

  /* ── L2 Introducción a RevOps ──────────────────────────── */
  'ro-2-introduccion': `
<p>La escena central opone dos cilindros: a la izquierda, Rapidez (speed) rodeado de flechas caóticas en distintas direcciones — actividad sin rumbo; a la derecha, Velocidad (velocity) con una flecha única y clara hacia arriba — progreso hacia el objetivo. Entre ellos, el símbolo ≠ y una partícula que viaja de un cilindro al otro.</p>
<p>La pestaña <strong>Velocidad vs Rapidez</strong> expone el concepto central: el riesgo de optimizar solo rapidez es que los equipos parecen productivos pero hacen menos progreso real hacia las metas de la empresa. Las tarjetas inferiores definen Speed como volumen de actividad (llamadas, emails) y Velocity como avance medible hacia el número de ingresos del trimestre.</p>
<p>La pestaña <strong>Empatía y curiosidad</strong> describe el mindset correcto al implementar cambios de proceso: liderar con empatía y curiosidad para comprender las realidades cotidianas de los equipos de primera línea, garantizando que los cambios añadan valor en lugar de generar resistencia. Los tres puntos detallan empatía, curiosidad y la distinción entre valor real y mero cumplimiento.</p>
<p>La pestaña <strong>Datos consistentes</strong> señala que la consistencia de métricas y procesos entre actividades pre y post-venta habilita mejor entrenamiento interfuncional, experiencias de cliente fluidas y agilidad para lanzar nuevos productos o hacer upselling. La solución al problema de calidad de datos multi-equipo son talleres interfuncionales de estándares de datos.</p>
<p><em>¿Dónde en tu organización se optimiza rapidez en lugar de velocidad, y qué se sacrifica como consecuencia?</em></p>`,

  /* ── L3 RevOps al Flywheel ─────────────────────────────── */
  'ro-3-embudo': `
<p>La escena muestra tres anillos concéntricos en rotación continua que representan el modelo flywheel: el anillo exterior etiquetado Atraer, el intermedio Involucrar y el interior Deleitar. En el centro, el orb de marca con el texto "RevOps flywheel". Un punto de fricción pulsante en la parte inferior indica el riesgo de un portal confuso que genera quejas y boca negativa.</p>
<p>El botón <strong>Atraer</strong> describe la fase de demanda: contenido y publicidad segmentada traen prospectos con el ICP correcto. Las métricas clave son MQL calificados, CAC por canal y tasa de conversión visita→lead.</p>
<p>El botón <strong>Involucrar</strong> aborda la fase de ventas: "Selling is about buying" — el vendedor escucha la situación específica del comprador y personaliza el enfoque. Las métricas son velocidad del pipeline, tasa SQL→oportunidad y ciclo de venta promedio.</p>
<p>El botón <strong>Deleitar</strong> cierra el ciclo: CS entrega el valor prometido, y el deleite se mide con <strong>NPS más el análisis de razones de negocio repetido y de reclamos</strong>. Los clientes deleitados generan advocacy y referidos que realimentan la fase de atracción — eso es el flywheel.</p>
<p>El panel inferior describe el riesgo de silos: equipos que optimizan sus propios procesos sin que nadie garantice una experiencia fluida en todos los puntos de contacto. La fricción — un portal confuso, un handoff roto — frena el flywheel y genera boca negativa.</p>
<p><em>¿Qué fricción específica en tu empresa está hoy frenando el flywheel e impidiendo que los clientes generen referidos?</em></p>`,

  /* ── L4 SLA ────────────────────────────────────────────── */
  'ro-4-sla': `
<p>La escena muestra dos torres isométricas que representan a Marketing (naranja, con megáfono) y Ventas (rosa, con corbata), unidas por un puente central etiquetado SLA. Partículas viajan en ambas direcciones. Debajo de las torres, una caja isométrica representa el Judicial Branch.</p>
<p>La pestaña <strong>¿Qué es un SLA?</strong> explica que un Service Level Agreement de ventas y marketing es el acuerdo formal que define qué debe entregar cada equipo al otro. Sin SLA, los equipos operan con expectativas distintas y se culpan mutuamente por los leads perdidos. La tarjeta inferior menciona la acción correcta ante deals perdidos: analizar feedback de clientes ganados y perdidos simultáneamente.</p>
<p>La pestaña <strong>SLA de Marketing</strong> define la obligación de marketing: <strong>entregar un número determinado de leads calificados a ventas cada mes</strong>. Los puntos debajo especifican el volumen de MQLs acordado entre ambos equipos y los criterios de calificación compartidos.</p>
<p>La pestaña <strong>SLA de Ventas</strong> define la obligación de ventas: <strong>contactar cada lead de marketing dentro de un plazo determinado</strong>. La tarjeta de estadística cuantifica el impacto: reducir el tiempo de respuesta de 24 h a menos de 4 h eleva la conversión en un 23%, según InsideSales.com.</p>
<p>La pestaña <strong>Judicial Branch</strong> define el concepto del curso: <strong>un equipo interfuncional de personas de marketing y ventas que define qué es un lead calificado</strong>. No es un panel de líderes que rechaza leads; es el proceso colaborativo de definición y revisión del criterio de calificación.</p>
<p><em>¿Cuánto tiempo tarda hoy tu equipo de ventas en contactar un lead, y existe un SLA formal que lo exija?</em></p>`,

  /* ── L5 Proceso de Ventas ──────────────────────────────── */
  'ro-5-proceso': `
<p>La parte superior de la diapositiva despliega seis etapas en secuencia horizontal: Prospección, Calificación, Exploración, Propuesta, Cierre y Post-venta. Cada etapa es un botón seleccionable con un ícono y un color. La etapa activa se eleva ligeramente.</p>
<p>Al seleccionar cada etapa, el panel izquierdo muestra sus <strong>exit criteria</strong> — las condiciones específicas que deben cumplirse antes de avanzar a la siguiente etapa. El panel derecho muestra la perspectiva del comprador en esa fase y recuerda el principio del curso: "Selling is about buying", es decir, el vendedor escucha la situación del comprador y personaliza su enfoque.</p>
<p>Los tres chips en la parte inferior sintetizan conceptos clave del módulo. <strong>Playbook moderno</strong>: debe ser web-based, interactivo y actualizado regularmente para mantenerse vigente (evergreen). <strong>Thrashing</strong>: el estado patológico de cambiar rápidamente entre soluciones sin un proceso de mejora controlado — el antídoto es el ciclo de medición. <strong>Matriz P/P/F/C</strong>: Pain / Persona / Feature / Content, la herramienta para alinear el contenido de ventas con las necesidades del comprador.</p>
<p>Un proceso de ventas definido habilita cuatro capacidades: métricas, repetibilidad, escalabilidad y responsabilidad. El balance correcto aporta suficiente estructura para la consistencia mientras deja espacio para las fortalezas individuales del vendedor.</p>
<p><em>Si miraras tu proceso de ventas real — no el documentado, sino el que aplican tus vendedores — ¿cuántas variantes paralelas encontrarías?</em></p>`,

  /* ── L6 Sistemas ───────────────────────────────────────── */
  'ro-6-sistemas': `
<p>La escena isométrica muestra cinco capas de bloques apilados que representan el stack de RevOps. Al hacer clic en cada bloque, la capa seleccionada se eleva y una ola de pulso la rodea.</p>
<p>El bloque <strong>CRM</strong> es el sistema de registro y la fuente única de verdad sobre contactos, oportunidades y actividad comercial. Todo el stack se sincroniza con el CRM, nunca al revés. Su propietario típico es el RevOps Systems Admin.</p>
<p>El bloque <strong>MAP</strong> (Marketing Automation Platform) gestiona leads, nurturing por comportamiento y lead scoring. Alimenta el CRM con MQLs que incluyen contexto: qué contenido consumió el lead, qué acciones tomó y cuál es su fit con el ICP.</p>
<p>El bloque <strong>BI / Analytics</strong> convierte datos del CRM y el MAP en dashboards de ingresos, forecast de pipeline y análisis de cohortes. Responde preguntas de decisión: ¿dónde se cae el funnel?, ¿qué canal genera mejor LTV?</p>
<p>El bloque <strong>CS Platform</strong> gestiona onboarding, health score y renovaciones. Cierra el ciclo del cliente: el dato de adopción retroalimenta a ventas para el upsell y a marketing para los casos de éxito.</p>
<p>El bloque <strong>Sales Engagement</strong> automatiza cadencias multicanal de BDRs (Business Development Representatives) y AEs (Account Executives), y registra el engagement directamente en el CRM para que el dato no quede en el inbox del vendedor.</p>
<p>El panel inferior recuerda el principio de gobernanza: sin propietario definido por sistema, los datos se degradan y la vista consolidada del cliente se fragmenta.</p>
<p><em>¿Cuál es hoy el sistema de tu stack que opera sin propietario claro, y qué dato se está perdiendo o duplicando por esa razón?</em></p>`,

  /* ── L7 Estructura del Equipo ──────────────────────────── */
  'ro-7-estructura': `
<p>La escena muestra tres personas isométricas con roles distintos: Sistemas (engranaje), Estrategia (brújula) y Analítica (estrella), con partículas viajando entre ellas para simbolizar la colaboración interfuncional.</p>
<p>La grilla de cuatro tarjetas define las funciones que debe cubrir cualquier equipo RevOps, independientemente de su tamaño. <strong>Analítica de ingresos</strong>: dashboards, KPIs, forecast y cohortes. <strong>Sistemas y datos</strong>: CRM, integraciones, calidad de datos y stack governance. <strong>Habilitación (Enablement)</strong>: playbooks, onboarding de reps, entrenamiento y contenido de ventas. <strong>Procesos</strong>: mapeo, documentación y mejora continua de flujos comerciales.</p>
<p>El selector de modelos ofrece tres opciones. <strong>Centralizado</strong>: un equipo RevOps único sirve a todas las funciones — mayor coherencia de datos, ideal para empresas de más de 100 personas. <strong>Embebido</strong>: especialistas de ops dentro de cada equipo — mayor velocidad de respuesta, riesgo de silos de datos. <strong>Híbrido</strong>: líder RevOps central con especialistas parcialmente embebidos — equilibra coherencia y agilidad.</p>
<p>Cada modelo muestra su ventaja principal y su riesgo más relevante para que la elección sea consciente.</p>
<p><em>¿Qué modelo de estructura describe mejor cómo opera hoy la función de operaciones en tu organización, y qué problema genera ese modelo?</em></p>`,

  /* ── L8 Contratación ───────────────────────────────────── */
  'ro-8-contratacion': `
<p>Tres figuras isométricas con roles distintos ocupan la escena: Manager (corbata), Analyst (estrella) y Sysadmin (engranaje). Al seleccionar uno, la figura se ilumina y el contenido a la derecha cambia.</p>
<p>El perfil <strong>Manager</strong> describe al Head de RevOps: visión sistémica de ventas, marketing y CS; comunicación con el C-suite; gestión de proyectos multifuncionales; experiencia en CRM y stack. El perfil de texto subraya que es empático con todos los equipos, orientado a datos y hábil para influir sin autoridad directa — habla el idioma de ventas y el de operaciones.</p>
<p>El perfil <strong>Analyst</strong> detalla al analista de ingresos: fluido en SQL y herramientas BI (Looker, Tableau, Power BI), modelado de cohortes, atribución y automatización de reportes. Su capacidad diferenciadora es convertir números de pipeline en narrativas de negocio accionables para el liderazgo.</p>
<p>El perfil <strong>Sysadmin</strong> describe al administrador de CRM: configuración, permisos y flujos del CRM, gestión de integraciones API, gobierno de datos y documentación de procesos técnicos. Su cualidad definitoria es la meticulosidad: un campo de CRM sin definición estándar contamina todo el forecast.</p>
<p>El panel inferior resume el ADN universal de RevOps: empatía para comprender el dolor de los equipos de primera línea, curiosidad para investigar antes de asumir la causa, y orientación a datos para decidir con evidencia en lugar de con la voz más alta de la sala.</p>
<p><em>¿Cuál de los tres perfiles — Manager, Analyst o Sysadmin — sería el más difícil de contratar hoy en tu organización, y por qué?</em></p>`,

  /* ── L9 Evaluación e Iteración ─────────────────────────── */
  'ro-9-evaluacion': `
<p>La escena central muestra cuatro nodos en círculo, cada uno con un ícono y una etiqueta: 📊 Medir, 🔍 Analizar, 💡 Hipótesis y ⚙️ Cambiar. Una partícula naranja recorre el ciclo continuamente. El nodo activo se escala para indicar la fase en foco. En el centro, el orb de marca con el texto "ciclo continuo".</p>
<p>La fase <strong>Medir</strong> establece la métrica norte del equipo de ingresos y recolecta datos durante al menos un ciclo completo. Los criterios de completitud son: North Star definida, datos de al menos un trimestre y fuente única de verdad activa.</p>
<p>La fase <strong>Analizar</strong> identifica dónde cae la conversión, qué SLA se incumple y qué canal genera el mejor LTV. El dato clave del curso: el análisis de deals perdidos Y ganados revela el patrón real — uno solo no es suficiente.</p>
<p>La fase <strong>Hipótesis</strong> exige formular cambios específicos y medibles. El ejemplo del material: "Si reducimos el tiempo de respuesta a leads de 24 h a menos de 4 h, la conversión MQL→SQL subirá X%." Una hipótesis sin número no es hipótesis; es un deseo.</p>
<p>La fase <strong>Cambiar</strong> implementa en un equipo piloto y documenta el cambio en el playbook. El anti-patrón que el curso llama <strong>Thrashing</strong> — cambiar rápidamente entre soluciones sin esperar los datos del experimento anterior — es el mayor enemigo de la mejora continua.</p>
<p>Las tarjetas inferiores refuerzan los dos datos cuantitativos del módulo: ciclo de evaluación recomendado de 90 días, y la necesidad de analizar siempre tanto deals ganados como perdidos para identificar qué replicar.</p>
<p><em>¿Cuál es la última hipótesis de mejora que tu equipo probó, y cómo midió si funcionó?</em></p>`,

};
