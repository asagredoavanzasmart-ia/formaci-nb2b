/**
 * Guión del presentador — clase "RevOps" (prefijo ro-).
 * Fuentes: documentación de certificación de Revenue Operations.
 * Reglas: lee y complementa la diapositiva, 2.ª persona del singular, neutro de
 * género, una sola pregunta abierta final en <em>.
 */

export const notasRevOps: Record<string, string> = {
  'ro-1-bienvenida': `
<p>Te damos la bienvenida a la certificación de Operaciones de Ingresos. En los próximos módulos aprenderás cómo alinear ventas, marketing y operaciones en torno a un objetivo común: el crecimiento de ingresos predecible y escalable.</p>
<p>RevOps no es solo una función; es una mentalidad. La idea es que <strong>cada decisión que toma el equipo de ingresos debe estar ligada a un dato, un proceso o una métrica</strong>. Sin eso, estás optimizando a ciegas.</p>
<p>A lo largo de esta certificación verás desde conceptos fundamentales hasta implementación táctica: cómo estructurar un equipo, cómo alinear incentivos, cómo medir lo que importa, y cómo iterar cuando algo no funciona.</p>
<p><em>¿Qué área de tu negocio de ingresos hoy funciona sin un proceso claro o una métrica que la mida?</em></p>`,

  'ro-2-introduccion': `
<p><strong>Revenue Operations</strong> es la disciplina que alinea tres funciones tradicionalmente separadas: ventas, marketing y operaciones de ingresos. El objetivo es crear un motor de crecimiento donde cada pieza encaja con la siguiente.</p>
<p>Antes, un director de ventas optimizaba para comisiones. Un director de marketing optimizaba para leads. Un operador de ingresos arreglaba lo que rompía uno u otro. Resultado: conflictos, métricascontradictorias, pronósticos poco fiables.</p>
<p>RevOps cambia eso con tres pilares: <strong>procesos consistentes, datos confiables e incentivos alineados</strong>. Un RevOps Officer (RRO) se responsabiliza de que estos tres pilares sostengan el edificio de ingresos.</p>
<p>La realidad es que RevOps es trabajo de arqueología: necesitas mapear cómo fluye un prospecto desde el primer contacto hasta que firma, luego hasta que paga y finalmente hasta que renueva. En cada etapa hay un dueño, un proceso, una métrica y un problema.</p>
<p><em>¿Cuál es el mayor desajuste que ves hoy entre lo que ventas promete y lo que operaciones logra cumplir?</em></p>`,

  'ro-3-embudo': `
<p>El embudo de ventas tradicional tiene etapas: prospectación, calificación, demostración, negociación, cierre. RevOps lo reimagina no como etapas lineales, sino como un sistema de flujos.</p>
<p>Hay un flujo de prospectación (inbound y outbound), un flujo de calificación (dónde el prospecto vive en el CRM y por qué), un flujo de demostración (cuándo ocurre, quién la da, qué se muestra), un flujo de negociación (ciclos de descuento, aprobación de precios) y un flujo de cierre (documentación, firma, lanzamiento).</p>
<p>Cada flujo tiene sus métricaspropias: tasa de conversión, velocidad de avance, tasa de ganancia, precio medio. Cuando una métrica cae, RevOps pregunta: ¿es un problema del flujo (el proceso es lento) o del fluido (la calidad del prospecto es baja)?</p>
<p>La visualización de esto es el <strong>cuadro de mando de flujos</strong>: un tablero que muestra cuántos prospectos están en cada etapa, cuánto tiempo pasan ahí, y cuántos avanzan al mes. Sin esto, estás vendiendo a ciegas.</p>
<p><em>¿Cuál es la etapa de tu embudo donde más prospectos se quedan atrapados, y cuál es la razón verdadera?</em></p>`,

  'ro-4-sla': `
<p>Un SLA (acuerdo de nivel de servicio) entre ventas y marketing es una promesa que se cumplen mutuamente. Marketing dice: <strong>"Nos comprometemos a pasar 100 leads calificados por mes, dentro de 48 horas de que levanten la mano, con estos criterios mínimos"</strong>. Ventas dice: <strong>"Nos comprometemos a contactar cada lead en menos de 2 horas, a calificar dentro de una semana, y a revertir los rechazados en 30 días si piden otra oportunidad"</strong>.</p>
<p>El SLA no es un castigo; es una promesa que reduce sorpresas. Cuando ventas sabe que recibe 100 leads buenos por mes, puede planificar cuántos vendedores necesita. Cuando marketing sabe que ventas contacta en menos de 2 horas, puede optimizar su gasto en publicidad.</p>
<p>Los SLA tienen dos dimensiones: <strong>cantidad</strong> (cuántos leads, cuántos avances) y <strong>calidad</strong> (criterios de quién es un lead, quién es una oportunidad calificada). La calidad es donde más conflicto hay, porque los criterios son subjetivos.</p>
<p>Por eso RevOps define criterios objetivos: ingresos anuales del prospecto, industria, tamaño de equipo, problema que enfrentan. Si no encaja en estos criterios, no es un lead para ventas; es un contacto para nurturing.</p>
<p><em>¿Cuál es hoy el mayor desajuste entre lo que marketing cree que es un lead y lo que ventas está dispuesta a trabajar?</em></p>`,

  'ro-5-proceso': `
<p>Mapear un proceso de ventas es, literalmente, dibujar cada paso desde que un prospecto entra hasta que firma. No es teórico; es real. Cada paso responde a: <strong>¿quién?</strong>, <strong>¿cuándo?</strong>, <strong>¿para qué?</strong>, <strong>¿con qué herramientas?</strong>.</p>
<p>Un mapeo típico en ventas B2B se ve así: prospectación (BDR busca en LinkedIn), primer contacto (BDR llama, envía email), calificación (BDR documenta en el CRM), entrada a ventas (Account Executive retoma la conversación), descubrimiento (AE hace preguntas, llama a stakeholders), demostración (AE prepara caso de uso, hace demo), propuesta (AE envía contrato), negociación (abogado revisa, cliente pide cambios), cierre (firma).</p>
<p>En cada paso hay reglas: cuántos intentos de contacto antes de pasar a siguiente etapa, qué información mínima se necesita en el CRM antes de que AE retome, cuánto tiempo máximo antes de enviar propuesta, quién tiene autoridad para descontar, cuál es el flujo de aprobación.</p>
<p>Sin este mapa, cada vendedor hace lo que cree. Eso significa que algunos prospectosavanzan rápido (suerte) y otros se pierden (negligencia). RevOps hace que el mapa sea oficial y auditable.</p>
<p><em>Si miraras tu proceso de ventas real (no el que está en el CRM, sino el que hacen tus vendedores), ¿cuántos procesos paralelos encontrarías?</em></p>`,

  'ro-6-sistemas': `
<p>Revenue Operations vive en sistemas: CRM, marketing automation, data warehouse, inteligencia de negocios. Un CRM sin datos confiables es como un auto sin gasolina. Un dashboard sin la pregunta correcta es ruido.</p>
<p>La arquitectura típica de sistemas RevOps es: <strong>CRM (fuente de verdad de oportunidades) → data warehouse (copia limpia de datos) → BI (preguntas respondidas con gráficos)</strong>.</p>
<p>Cada sistema tiene un propósito: el CRM registra lo que pasó. El data warehouse lo limpia y lo organiza. El BI lo cuenta en un lenguaje que entienden los líderes. Si faltas en uno, todo falla.</p>
<p>Lo más importante es <strong>definir la fuente de verdad</strong>. ¿Dónde vive la verdad sobre cuándo un prospecto se vuelve oportunidad? ¿En el CRM, en una hoja de cálculo, en la cabeza del vendedor? Si la verdad está en tres lugares, no tienes verdad.</p>
<p>RevOps también gestiona integraciones. Cuando marketing automation conecta con CRM, hay un riesgo: un lead se duplica, un campo se sobrescribe, datos se pierden en tránsito. Un buen RevOps diseña integraciones con guardias (validaciones, deduplicación) que evitan eso.</p>
<p><em>¿Cuál es hoy tu fuente oficial de verdad para cada métrica de ingresos, y está todos de acuerdo en dónde está?</em></p>`,

  'ro-7-estructura': `
<p>Un equipo de RevOps típico tiene cuatro roles: <strong>estratega</strong> (el RRO, que ve el panorama general y define qué medir), <strong>analista de procesos</strong> (que mapea flujos y encuentra cuellos de botella), <strong>analista de datos</strong> (que construye reportes y dashboards) y <strong>operador de sistemas</strong> (que gestiona integraciones y limpieza de datos).</p>
<p>En equipos pequeños, una sola persona hace varios roles. En equipos grandes, cada rol es un especialista. Pero los cuatro deben existir, aunque sea compartidos entre empleados.</p>
<p>Lo crucial es <strong>a quién reportan</strong>. Si RevOps reporta a ventas, optimizará para que ventas gane más. Si reporta a marketing, optimizará para leads. Si reporta a finanzas, optimizará para precisión presupuestaria. RevOps debería reportar a un <strong>Chief Revenue Officer (CRO)</strong> o directamente al CEO, alguien cuyo incentivo es el total de ingresos, no una función en particular.</p>
<p>La comunicación es otro pilar. RevOps debe publicar cambios: cuando cambia un criterio de lead, cuando se añade un paso al proceso, cuando se retira un reporte. Si nadie sabe que cambió, nadie se alinea.</p>
<p><em>¿A quién reportan hoy tus operaciones de ventas y marketing, y esa persona gana si el sistema funciona mejor en conjunto?</em></p>`,

  'ro-8-contratacion': `
<p>Contratar para RevOps es distinto que contratar un vendedor. No buscas carisma; buscas rigor, curiosidad y paciencia.</p>
<p>Un buen RevOps Officer tiene <strong>experiencia anterior en ventas o marketing</strong> (entiende los dolores) pero es naturalmente desordenado; tiene una obsesión por los datos pero entiende que los números cuentan historias, no verdades; tiene facilidad para comunicar a gente que habla idiomas distintos (ingeniería, finanzas, ventas).</p>
<p>Las pruebas de selección típicas son: un análisis de datos (dame un dataset desordenado y resuélvelo), un mapeo de proceso (documenta cómo funciona un flujo en la empresa), y conversaciones sobre conflictos pasados (cuéntame un momento cuando tuviste que elegir entre lo correcto y lo rápido, ¿qué elegiste?).</p>
<p>Las habilidades técnicas (SQL, Tableau, Salesforce) se pueden enseñar. Lo que no se enseña es la paciencia para escuchar a un vendedor furioso explicar por qué el CRM está roto, sin perder la compostura, y luego investigar la verdadera causa (que no era el CRM, era el proceso).</p>
<p>El primer RevOps Officer es la más importante contratación. Esta persona establecerá estándares que durarán años. Elige bien.</p>
<p><em>¿Cuál es la cualidad que más necesitarías en una persona de RevOps si tuvieras que contratar hoy?</em></p>`,

  'ro-9-evaluacion': `
<p>Evaluar una estrategia de RevOps es preguntarse cuatro cosas: <strong>¿se hizo más predecible el pronóstico?</strong>, <strong>¿se redujo el tiempo de ciclo?</strong>, <strong>¿mejoró la tasa de ganancia?</strong>, <strong>¿bajó el costo de adquisición?</strong>.</p>
<p>Antes de RevOps, un pronóstico es una adivinanza con datos. Después, es una curva con desviación estándar. Antes, un ciclo de ventas dura 90 días en promedio; después, dura 70. Antes, ganas el 30% de las oportunidades; después, 40%. Antes, cada cliente cuesta 10 mil en marketing y ventas; después, 7 mil.</p>
<p>Pero estos cambios no ocurren al mes. RevOps es un proyecto de 6 a 12 meses. En los primeros tres meses aumenta la fricción porque estás documentando procesos que nadie documentó antes. En los meses 4 a 6 la fricción baja porque la gente sabe qué esperar. En los meses 7 a 12 ves mejoras porque ahora puedes optimizar sobre fundamentos sólidos.</p>
<p>La iteración es continua. Cada trimestre pregúntate: ¿qué métrica se movió menos de lo esperado?, ¿por qué?, ¿qué cambio hacemos el próximo trimestre?. RevOps no es un proyecto que se termina; es una función que nunca termina.</p>
<p><em>Si tuvieras que mejorar una sola métrica de ingresos en los próximos seis meses, ¿cuál sería y por qué?</em></p>`,
};
