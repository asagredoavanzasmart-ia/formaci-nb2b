import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass, Quiz } from '../slideKit';
import type { QuizQ } from '../slideKit';
import { heading, Nota, Fuente, Opcion } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* VI.1 El semáforo de la evidencia                                    */
/* ------------------------------------------------------------------ */

type Color = 'verde' | 'amarillo' | 'rojo';

const COLORES: Record<Color, { etiqueta: string; punto: string; claro: string; oscuro: string }> = {
  verde: { etiqueta: 'Confirmado', punto: 'text-emerald-500', claro: 'bg-emerald-50', oscuro: 'bg-emerald-500/10' },
  amarillo: { etiqueta: 'Con matices', punto: 'text-amber-500', claro: 'bg-amber-50', oscuro: 'bg-amber-500/10' },
  rojo: { etiqueta: 'No se sostiene', punto: 'text-rose-500', claro: 'bg-rose-50', oscuro: 'bg-rose-500/10' },
};

const AFIRMACIONES: { c: Color; t: string; n: string }[] = [
  { c: 'verde', t: 'Los incentivos suben la cantidad vendida y no muestran relación significativa con la calidad', n: 'Jenkins y cols. 1998: correlación de 0,34 con la cantidad.' },
  { c: 'verde', t: 'Los programas de incentivos mejoran el desempeño en promedio un 22 %', n: 'Condly y cols. 2003: 45 estudios de alta calidad. Autores vinculados a la industria de incentivos.' },
  { c: 'verde', t: 'El dinero no destruye el interés por una tarea interesante', n: 'Kim, Gerhart y Fang 2022: efecto positivo. Menos positivo para la calidad.' },
  { c: 'verde', t: 'El pago por pieza elevó la productividad un 44 % en Safelite', n: 'Lazear 2000. Trabajo rutinario en una sola empresa.' },
  { c: 'verde', t: 'Los incentivos de equipo superan a los individuales (0,45 frente a 0,32)', n: 'Garbers y Konradt 2014: 146 estudios, con conjuntos distintos.' },
  { c: 'verde', t: 'La ambigüedad de rol reduce el desempeño en ventas', n: 'Verbeke y cols. 2011: coeficiente de −0,25 en un modelo multivariado.' },
  { c: 'amarillo', t: 'La mitad del 44 % de Safelite fue efecto de ordenamiento', n: 'Aparece en resúmenes del trabajo; no la contrasté con sus tablas.' },
  { c: 'amarillo', t: 'Lo manual rinde más que lo cognitivo (27 % frente a 15 %)', n: 'La dirección sí consta en la fuente; los porcentajes, no.' },
  { c: 'amarillo', t: 'El encuadre de pérdida mejora el esfuerzo', n: 'Docentes, unos 150, documento de trabajo. No es un resultado en ventas.' },
  { c: 'amarillo', t: 'El pago todo o nada aumenta el engaño', n: 'Laboratorio con estudiantes, sin supervisión.' },
  { c: 'amarillo', t: 'La mezcla ideal es 60/40 o 70/30', n: 'Guía de consultoría, no un experimento.' },
  { c: 'amarillo', t: 'Los topes provocan diferimiento de cierres', n: 'Predicción teórica; el resumen del estudio de campo no lo observó al llegar a la cuota.' },
  { c: 'rojo', t: 'La tríada dinero, feedback y reconocimiento sube la productividad un 45 %', n: 'No aparece en los resúmenes primarios; el efecto global del metaanálisis es del 16 %.' },
  { c: 'rojo', t: 'La cantidad sube un 12 % y la calidad un 3 %', n: 'Esa escala es del informe, no del artículo de Jenkins.' },
  { c: 'rojo', t: 'Los umbrales binarios generan más engaño que los salarios fijos', n: 'El experimento comparó con pago lineal y con torneo.' },
  { c: 'rojo', t: 'El entrenamiento conductual retiene 2 a 3 veces más, con 117 estudios', n: 'No pude confirmar ninguna de las dos cifras.' },
  { c: 'rojo', t: 'El reconocimiento social cuesta cero', n: 'Exige tiempo de la jefatura y que el reparto se perciba justo.' },
];

export function Semaforo({ isDark }: SlideProps) {
  const [f, setF] = useState<Color>('verde');
  const lista = AFIRMACIONES.filter((a) => a.c === f);
  const Icono = f === 'verde' ? CheckCircle2 : f === 'amarillo' ? AlertTriangle : XCircle;
  return (
    <Shell isDark={isDark} title="El semáforo" highlight="de la evidencia" subtitle="Diecisiete afirmaciones del informe, contrastadas con las fuentes originales. Elige un color para ver cuáles caen en cada uno.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex flex-wrap gap-1.5 justify-center mb-3">
          {(Object.keys(COLORES) as Color[]).map((c) => (
            <Pill key={c} isDark={isDark} on={f === c} onClick={() => setF(c)}>{COLORES[c].etiqueta} · {AFIRMACIONES.filter((a) => a.c === c).length}</Pill>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={f} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex-1 min-h-0 grid ${lista.length > 5 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-2 content-center`}>
            {lista.map((a) => (
              <div key={a.t} className={`p-3 rounded-2xl flex gap-2.5 items-start ${isDark ? COLORES[f].oscuro : COLORES[f].claro}`}>
                <Icono size={16} className={`shrink-0 mt-0.5 ${COLORES[f].punto}`} />
                <div>
                  <p className={`text-[13px] font-black leading-snug ${heading(isDark)}`}>{a.t}</p>
                  <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{a.n}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <Fuente isDark={isDark}>Contraste hecho en octubre de 2026 con los resúmenes y páginas oficiales de cada estudio. Donde dice «no pude confirmar» solo tuve acceso a resúmenes, no a los artículos completos.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* VI.2 Lo que no cuadra del informe                                   */
/* ------------------------------------------------------------------ */

const PROBLEMAS = [
  { k: 'Restos de generación automática', d: 'El PDF conserva marcas como «[cite: 6, 16]» y deja en blanco muchas fórmulas y tamaños de efecto.', h: 'Contrasta cada cifra con la fuente antes de citarla.' },
  { k: 'Niveles de evidencia mezclados', d: 'Metaanálisis, un estudio en una empresa, experimentos con estudiantes y guías de consultoría aparecen con el mismo tono de certeza.', h: 'Pon el sello de evidencia junto a cada hallazgo.' },
  { k: 'Del parabrisas a la venta consultiva', d: 'Varios resultados vienen de trabajo rutinario o de docentes, y se aplican a venta B2B compleja.', h: 'Trátalos como hipótesis para tu contexto.' },
  { k: 'Correlación no es causa', d: 'Muchos metaanálisis resumen correlaciones. Que se asocien incentivos y desempeño no demuestra por sí solo que uno cause el otro.', h: 'Prefiere diseños con grupo de comparación.' },
  { k: 'Atribuciones cruzadas', d: 'Una misma cifra se atribuye a trabajos distintos según la fuente; el +45 % no aparece donde el informe lo ubica.', h: 'Rastrea la cifra hasta el artículo original.' },
  { k: 'Intereses de la industria', d: 'Parte de la evidencia sobre incentivos la producen o difunden quienes los venden o diseñan planes de compensación.', h: 'Pregunta quién financió y quién se beneficia.' },
];

export function Cuadran({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const p = PROBLEMAS[i];
  return (
    <Shell isDark={isDark} title="Lo que no cuadra" highlight="del informe" subtitle="Una síntesis útil puede equivocarse en los detalles. Estos son los seis puntos donde conviene desconfiar antes de convertir una cifra en política de pago.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] flex flex-col gap-1.5 justify-center">
            {PROBLEMAS.map((x, k) => <Opcion key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{k + 1}. {x.k}</Opcion>)}
          </div>
          <div className="lg:w-[60%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                <div className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>El problema</p>
                  <p className={`text-base font-black leading-snug mt-0.5 ${heading(isDark)}`}>{p.k}</p>
                  <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{p.d}</p>
                </div>
                <Nota isDark={isDark} label="Qué hacer">{p.h}</Nota>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* VI.3 Diagnostica tu plan                                            */
/* ------------------------------------------------------------------ */

const SENALES = [
  { k: 'Tiene un tope de comisión', fix: 'Quitar el tope y usar aceleradores sobre el excedente.' },
  { k: 'Paga todo o nada al 100 %', fix: 'Pago lineal desde un piso alcanzable, con metas escalonadas.' },
  { k: 'La misma cuota para todos los territorios', fix: 'Normalizar por potencial, densidad y madurez de cartera.' },
  { k: 'Cuota y pago solo anuales', fix: 'Hitos trimestrales y liquidación mensual o quincenal.' },
  { k: 'Más de tres métricas en la fórmula', fix: 'Reducir a dos o tres métricas transparentes y auditables.' },
  { k: 'Un ranking donde solo gana el primero', fix: 'Estándar absoluto o bono de equipo pequeño repartido por aporte.' },
  { k: 'Hay bonos discrecionales', fix: 'Atar todo pago variable a conductas o resultados observables.' },
  { k: 'Se paga solo por volumen', fix: 'Indexar parte del bono a calidad, retención o márgenes.' },
];

export function Diagnostico({ isDark }: SlideProps) {
  const [sel, setSel] = useState<boolean[]>(SENALES.map(() => false));
  const n = sel.filter(Boolean).length;
  const alertas = SENALES.filter((_, k) => sel[k]);
  return (
    <Shell isDark={isDark} title="Diagnostica" highlight="tu plan" subtitle="Marca las señales que tu plan de compensación tiene hoy. Cada una apunta a la corrección que respalda la evidencia de esta clase.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] flex flex-col gap-1.5 justify-center">
            {SENALES.map((s, k) => (
              <button key={s.k} onClick={() => setSel(sel.map((v, j) => (j === k ? !v : v)))} className={`text-left px-3.5 py-2 rounded-2xl text-[13px] font-bold flex items-center gap-2.5 transition-all ${sel[k] ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/25' : isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <span className={`shrink-0 w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${sel[k] ? 'bg-white/30' : isDark ? 'bg-white/10' : 'bg-white'}`}>{sel[k] ? '✓' : ''}</span>
                {s.k}
              </button>
            ))}
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Señales de alerta marcadas</p>
              <p className="text-4xl font-black leading-none mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{n}<span className={`text-xl ${textMuted(isDark)}`}> / {SENALES.length}</span></p>
              <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>
                {n === 0 ? 'Marca las que apliquen a tu plan.' : n <= 2 ? 'Pocas señales: ajustes puntuales.' : n <= 5 ? 'Varias señales: conviene rediseñar por etapas.' : 'Muchas señales: el plan probablemente trabaja contra sus propios objetivos.'}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {alertas.length === 0 && <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Aquí aparecerá la corrección sugerida para cada señal.</p>}
              {alertas.map((a) => (
                <div key={a.k} className={`px-3 py-2 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>{a.k}</p>
                  <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{a.fix}</p>
                </div>
              ))}
            </div>
            <p className={`text-[11px] leading-snug ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Es una guía de conversación, no un veredicto: la evidencia varía según el tipo de venta, el ciclo y el mercado.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* VII. Tests                                                          */
/* ------------------------------------------------------------------ */

const BASICO: QuizQ[] = [
  { q: 'Según Jenkins y cols. (1998), ¿qué ocurre con la calidad del trabajo cuando solo se paga por volumen?', options: ['Sube junto con la cantidad', 'No muestra una relación significativa', 'Cae de forma sistemática', 'Depende solo de la antigüedad'], answer: 1, why: 'El incentivo se asoció con la cantidad (0,34) y no con la calidad. Para proteger la calidad hay que medirla y pagarla.' },
  { q: '¿Qué mejora media global halló el metaanálisis de Condly y cols. (2003)?', options: ['5 %', '22 %', '45 %', '60 %'], answer: 1, why: 'Del orden del 22 %, sobre 45 estudios seleccionados de unos 600 revisados.' },
  { q: 'Según Kim, Gerhart y Fang (2022), en tareas interesantes los incentivos financieros…', options: ['destruyen la motivación interna', 'no tienen ningún efecto', 'tienen un efecto positivo', 'solo funcionan para la calidad'], answer: 2, why: 'El efecto fue positivo incluso en tareas interesantes, aunque menos positivo para la calidad.' },
  { q: '¿Qué es el «sandbagging» en un plan con tope de comisión?', options: ['Cobrar comisión por ventas ajenas', 'Diferir cierres al período siguiente cuando ya no hay pago marginal', 'Inflar los reportes de ventas', 'Vender sin cotización'], answer: 1, why: 'Es la predicción teórica: al tocar el tope, vender más no paga, y el vendedor posterga cierres.' },
  { q: '¿Qué segmento sostiene mejor su esfuerzo con comisiones por sobrecumplimiento?', options: ['Los rezagados', 'El núcleo', 'Las estrellas', 'Los recién ingresados'], answer: 2, why: 'En el estudio de campo, las comisiones por sobrecumplimiento ayudaron a los mejores a mantener su producción tras la cuota.' },
  { q: '¿Por qué es riesgoso un bono de todo o nada al 100 % de la meta?', options: ['Es demasiado caro', 'Provoca deserción y tienta a inflar reportes cerca del umbral', 'Se paga demasiado rápido', 'No motiva a las estrellas'], answer: 1, why: 'Quien se proyecta bajo el umbral se rinde, y quien queda cerca siente injusticia y puede exagerar sus resultados.' },
  { q: '¿Qué mezcla fijo-variable se sugiere como punto de partida en venta transaccional de ciclo corto?', options: ['100 % fijo', '90/10', '60 a 70 % fijo y 30 a 40 % variable', '20/80'], answer: 2, why: 'Es una guía de consultoría para ciclos cortos; en ciclos largos o consultivos se inclina hacia más fijo.' },
  { q: '¿Qué necesita un incentivo de equipo para funcionar?', options: ['Repartirse en partes iguales', 'Repartirse según el aporte y en equipos pequeños', 'Aplicarse solo a gerentes', 'Pagarse una vez al año'], answer: 1, why: 'El reparto igualitario premia el parasitismo y el efecto se debilita en equipos grandes.' },
  { q: '¿Qué reduce mejor la venta engañosa?', options: ['Un castigo tardío con devolución', 'Condicionar la comisión a una verificación auditada previa', 'Subir la cuota', 'Eliminar el bono'], answer: 1, why: 'Reforzar una conducta incompatible con el engaño es más eficaz que castigar después, que entrena a ocultar.' },
  { q: 'Según el metaanálisis de 2003, ¿qué combinación produce el mayor efecto?', options: ['Solo dinero', 'Solo reconocimiento', 'Dinero, retroalimentación y reconocimiento juntos', 'Solo retroalimentación'], answer: 2, why: 'Cada reforzador funciona, pero la combinación es la más fuerte. La cifra del 45 % no pudo confirmarse.' },
];

const AVANZADO: QuizQ[] = [
  { q: 'El informe atribuye un +45 % a la tríada dinero, feedback y reconocimiento. ¿Qué dicen los resúmenes primarios revisados?', options: ['Confirman el 45 %', 'El efecto global del metaanálisis es del 16 % y el 45 % no aparece', 'Que el efecto es negativo', 'Que solo importa el dinero'], answer: 1, why: 'El metaanálisis de 2003 reporta d = 0,47, alrededor del 16 %. El 45 % circula en fuentes divulgativas.' },
  { q: '¿Por qué no conviene extrapolar el 44 % de Safelite a una venta consultiva B2B?', options: ['Los instaladores ganaban menos', 'Era trabajo rutinario de una sola empresa y parte de la ganancia vino de atraer mejores trabajadores', 'No hubo cambio de sistema de pago', 'Se pagaba por hora'], answer: 1, why: 'El contexto (tarea simple, medible, una empresa) difiere de una venta compleja con ciclos largos.' },
  { q: 'En el experimento de Cadsby, Song y Tapon (2010), el pago con umbral se comparó con…', options: ['Un salario fijo', 'Pago lineal por pieza y torneo', 'Bonos de equipo', 'Acciones de la empresa'], answer: 1, why: 'El informe dice «salarios fijos»; el experimento usó pago lineal y torneo, con estudiantes y sin supervisión.' },
  { q: 'El −0,25 de la ambigüedad de rol (Verbeke y cols., 2011) debe leerse como…', options: ['Una correlación simple', 'Un coeficiente de un modelo multivariado', 'Un porcentaje de pérdida de ventas', 'Un efecto de laboratorio'], answer: 1, why: 'Es un β de modelos causales multivariados; algunas fuentes lo presentan como r, lo que puede confundir.' },
  { q: 'Según el resumen del estudio de Chung, Steenburgh y Sudhir (2014), los vendedores que alcanzan la cuota…', options: ['Frenan siempre su esfuerzo', 'No frenan su esfuerzo', 'Abandonan la empresa', 'Piden que se suba el tope'], answer: 1, why: 'Por eso el diferimiento de cierres bajo tope es una predicción teórica que ese estudio no observó.' },
  { q: 'La evidencia sobre encuadre de pérdida proviene de…', options: ['Vendedores B2B', 'Unos 150 docentes en Chicago Heights', 'Cajeros de supermercado', 'Estudiantes de MBA'], answer: 1, why: 'Fryer, Levitt, List y Sadoff trabajaron con docentes. Pasarlo a ventas es una hipótesis razonable.' },
  { q: 'Garbers y Konradt hallan 0,45 para equipos y 0,32 para individuos. ¿Qué cautela corresponde?', options: ['Son conjuntos distintos de estudios', 'Solo vale en laboratorio', 'Está expresado en dólares', 'Es un estudio de 1960'], answer: 0, why: 'Hubo 116 estudios individuales y 30 de equipo; la comparación es indicativa, no un experimento directo.' },
  { q: '¿Qué tipo de evidencia respalda la mezcla 60/40 a 70/30?', options: ['Un metaanálisis', 'Un experimento aleatorizado', 'Guías de consultoría y práctica', 'Estudios con animales'], answer: 2, why: 'Proviene de Zoltners, Sinha y Lorimer (2012), una guía profesional, no de un estudio causal.' },
  { q: 'Sobre las tareas interesantes, Weibel (2010) y Kim y cols. (2022) difieren porque…', options: ['El primero halló efecto negativo y el segundo positivo', 'Ambos hallaron efecto negativo', 'Ambos hallaron efecto positivo', 'Ninguno midió tareas interesantes'], answer: 0, why: 'Kim y cols. reanalizaron la evidencia y concluyeron que el efecto es positivo; de ahí la discusión sobre el desplazamiento.' },
  { q: '¿Qué medida es coherente con la evidencia sobre la demora del refuerzo?', options: ['Pagar la comisión en una única bolsa anual', 'Liquidar cada mes o quincena', 'Pagar solo por antigüedad', 'Sorteos discrecionales'], answer: 1, why: 'Cuanto más cerca de la conducta llega el pago, más fuerte es la asociación. La evidencia directa en ventas es indirecta.' },
];

export function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="principiante" subtitle="Diez preguntas para comprobar las ideas centrales de la clase.">
      <Quiz isDark={isDark} nivel="Principiante" questions={BASICO} />
    </Shell>
  );
}

export function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="avanzado" subtitle="Diez preguntas sobre cómo leer críticamente la evidencia.">
      <Quiz isDark={isDark} nivel="Avanzado" questions={AVANZADO} />
    </Shell>
  );
}
