import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, FlaskConical, Building2, Lightbulb } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass, Quiz } from '../slideKit';
import type { QuizQ } from '../slideKit';
import { heading, Nota, Opcion } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* VI.1 Qué tan sólido es cada hallazgo                                */
/* ------------------------------------------------------------------ */

type Tipo = 'meta' | 'campo' | 'lab' | 'teoria';

const TIPOS: Record<Tipo, { etiqueta: string; nota: string; claro: string; oscuro: string; punto: string; Icono: typeof CheckCircle2 }> = {
  meta: { etiqueta: 'Metaanálisis', nota: 'Combinan muchos estudios: son la base más amplia, aunque cada uno tiene sus propios límites.', claro: 'bg-emerald-50', oscuro: 'bg-emerald-500/10', punto: 'text-emerald-500', Icono: CheckCircle2 },
  campo: { etiqueta: 'Campo', nota: 'Ocurren en organizaciones reales, pero suelen ser una sola empresa o un solo experimento.', claro: 'bg-sky-50', oscuro: 'bg-sky-500/10', punto: 'text-sky-500', Icono: Building2 },
  lab: { etiqueta: 'Laboratorio', nota: 'Controlan las condiciones, pero con participantes y tareas que no son un equipo de ventas.', claro: 'bg-amber-50', oscuro: 'bg-amber-500/10', punto: 'text-amber-500', Icono: FlaskConical },
  teoria: { etiqueta: 'Teoría', nota: 'Explican por qué algo debería ocurrir; son útiles para razonar, no son un resultado medido en ventas.', claro: 'bg-orange-50', oscuro: 'bg-orange-500/10', punto: 'text-orange-500', Icono: Lightbulb },
};

const HALLAZGOS: { tipo: Tipo; t: string; n: string }[] = [
  { tipo: 'meta', t: 'Los incentivos suben la cantidad vendida y no se relacionan con la calidad', n: 'Jenkins y cols. 1998 · 39 estudios · correlación de 0,34 con la cantidad.' },
  { tipo: 'meta', t: 'Los programas de incentivos mejoran el desempeño en promedio un 22 %', n: 'Condly y cols. 2003 · 45 estudios con medición previa al programa.' },
  { tipo: 'meta', t: 'La modificación de conducta organizacional mejora el desempeño en torno al 16 %', n: 'Stajkovic y Luthans 2003 · 72 estudios · d = 0,47.' },
  { tipo: 'meta', t: 'El dinero no reduce el desempeño en tareas interesantes', n: 'Kim, Gerhart y Fang 2022 · efecto positivo; menos positivo para la calidad.' },
  { tipo: 'meta', t: 'Los incentivos de equipo superan a los individuales', n: 'Garbers y Konradt 2014 · 146 estudios · 0,45 frente a 0,32.' },
  { tipo: 'meta', t: 'La ambigüedad de rol se asocia con menor desempeño en ventas', n: 'Verbeke y cols. 2011 · coeficiente de −0,25.' },
  { tipo: 'meta', t: 'La autoeficacia se asocia con mayor desempeño laboral', n: 'Stajkovic y Luthans 1998 · 114 estudios · correlación de 0,38.' },
  { tipo: 'meta', t: 'Las metas específicas y difíciles superan al «haz tu mejor esfuerzo»', n: 'Locke y Latham · 35 años de investigación · efectos de 0,42 a 0,80.' },
  { tipo: 'meta', t: 'El modelado conductual mejora conocimientos y habilidades', n: 'Taylor, Russ-Eft y Chan 2005 · efectos grandes en conocimientos y habilidades; moderados en conducta en el puesto.' },
  { tipo: 'campo', t: 'Las comisiones por sobrecumplimiento sostienen a los mejores vendedores', n: 'Chung y cols. 2014 · una gran empresa durante tres años.' },
  { tipo: 'campo', t: 'El pago por pieza elevó un 44 % la producción por trabajador', n: 'Lazear 2000 · instaladores de parabrisas de una empresa · trabajo rutinario.' },
  { tipo: 'campo', t: 'El dinero con seguimiento conductual superó al reconocimiento y a la retroalimentación', n: 'Stajkovic y Luthans 2001 · un experimento; en una réplica en Corea el orden cambió.' },
  { tipo: 'campo', t: 'El bono adelantado con devolución mejoró los resultados', n: 'Fryer y cols. 2012 · unos 150 docentes, no vendedores.' },
  { tipo: 'lab', t: 'Cuanto más cerca del umbral, más se exagera el resultado', n: 'Cadsby, Song y Tapon 2010 · estudiantes, sin supervisión.' },
  { tipo: 'lab', t: 'El pago por desempeño eleva la productividad por incentivo y por ordenamiento', n: 'Cadsby, Song y Tapon 2007 · tarea de esfuerzo real.' },
  { tipo: 'teoria', t: 'En un torneo de suma cero, sabotear al colega puede ser racional', n: 'Lazear · modelo de torneos.' },
  { tipo: 'teoria', t: 'Comparamos lo que recibimos, frente a lo que aportamos, con lo de nuestros pares', n: 'Adams 1965 · teoría de la equidad.' },
  { tipo: 'teoria', t: 'El premio demorado pierde fuerza como refuerzo', n: 'Skinner 1953 · psicología del refuerzo.' },
];

export function Solidez({ isDark }: SlideProps) {
  const [f, setF] = useState<Tipo>('meta');
  const lista = HALLAZGOS.filter((a) => a.tipo === f);
  const T = TIPOS[f];
  return (
    <Shell isDark={isDark} title="Qué tan sólido es" highlight="cada hallazgo" subtitle="Dieciocho hallazgos de la clase, ordenados por el tipo de evidencia que los respalda. Cada tipo responde preguntas distintas.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex flex-wrap gap-1.5 justify-center mb-2">
          {(Object.keys(TIPOS) as Tipo[]).map((c) => (
            <Pill key={c} isDark={isDark} on={f === c} onClick={() => setF(c)}>{TIPOS[c].etiqueta} · {HALLAZGOS.filter((a) => a.tipo === c).length}</Pill>
          ))}
        </div>
        <p data-g="nota" className={`text-center text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{T.nota}</p>
        <AnimatePresence mode="wait">
          <motion.div key={f} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex-1 min-h-0 grid ${lista.length > 3 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-2 content-center`}>
            {lista.map((a) => (
              <div key={a.t} className={`p-3 rounded-2xl flex gap-2.5 items-start ${isDark ? T.oscuro : T.claro}`}>
                <T.Icono size={16} className={`shrink-0 mt-0.5 ${T.punto}`} />
                <div>
                  <p className={`text-[13px] font-black leading-snug ${heading(isDark)}`}>{a.t}</p>
                  <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{a.n}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* VI.2 Cómo leer un estudio                                           */
/* ------------------------------------------------------------------ */

const PREGUNTAS = [
  { k: '¿Cuántos estudios hay detrás?', d: 'Un metaanálisis combina decenas de estudios, como los 146 de Garbers y Konradt. Un experimento aislado, como el de Fryer y colaboradores, muestra un solo caso.', h: 'Distingue entre «muchos estudios coinciden» y «un estudio encontró».' },
  { k: '¿A quiénes se estudió?', d: 'Instaladores de parabrisas, docentes, estudiantes y vendedores no son lo mismo. Cuanto más se parezca la muestra a tu equipo, más aplicable es el resultado.', h: 'Pregunta qué tarea hacían las personas estudiadas.' },
  { k: '¿Laboratorio o campo?', d: 'El laboratorio controla las condiciones, como en el experimento de Cadsby, Song y Tapon. El campo ocurre en organizaciones reales, como el estudio de Chung y colaboradores.', h: 'Cada uno responde una pregunta distinta; conviene leer ambos.' },
  { k: '¿Se midió cantidad o calidad?', d: 'Jenkins y colaboradores encontraron efecto en la cantidad y ninguna relación significativa con la calidad. Una afirmación de «mejor desempeño» debería decir en qué.', h: 'Pregunta cómo se midió el desempeño.' },
  { k: '¿Cómo se expresa el efecto?', d: 'Una correlación de 0,34 no es una mejora del 34 %. Existen correlaciones, diferencias estandarizadas (d, delta, g) y porcentajes, y no se leen igual.', h: 'Identifica la unidad antes de comparar dos cifras.' },
  { k: '¿Con qué se comparó?', d: 'Cadsby, Song y Tapon compararon en 2007 el pago por desempeño con el sueldo fijo; en 2010, el pago con umbral con el pago lineal y con un torneo. El resultado depende de la comparación.', h: 'Pregunta cuál era la alternativa.' },
];

export function Leer({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const p = PREGUNTAS[i];
  return (
    <Shell isDark={isDark} title="Cómo leer" highlight="un estudio sobre incentivos" subtitle="Seis preguntas que ayudan a decidir cuánto pesa un resultado antes de convertirlo en una regla de pago.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] flex flex-col gap-1.5 justify-center">
            {PREGUNTAS.map((x, k) => <Opcion key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{k + 1}. {x.k}</Opcion>)}
          </div>
          <div className="lg:w-[60%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                <div className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>La pregunta</p>
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
  { k: 'Tiene un tope de comisión', fix: 'Quitar el tope y usar aceleradores sobre el excedente, que ayudan a sostener a los mejores.' },
  { k: 'Paga todo o nada al 100 %', fix: 'Pagar de forma lineal, para que quien queda cerca no tenga un umbral que lo tiente.' },
  { k: 'Usa la misma cuota en todos los territorios', fix: 'Repartir la cuota total según el potencial de cada territorio.' },
  { k: 'Tiene cuota y pago solo anuales', fix: 'Sumar hitos intermedios, como bonos trimestrales, que funcionan de puntos de control.' },
  { k: 'Premia con un ranking donde gana solo el primero', fix: 'Usar un estándar absoluto o un bono de equipo repartido según el aporte.' },
  { k: 'Paga solo por volumen', fix: 'Incluir métricas de calidad en el bono: el pago por volumen no se relaciona con la calidad.' },
];

export function Diagnostico({ isDark }: SlideProps) {
  const [sel, setSel] = useState<boolean[]>(SENALES.map(() => false));
  const n = sel.filter(Boolean).length;
  const alertas = SENALES.filter((_, k) => sel[k]);
  return (
    <Shell isDark={isDark} title="Diagnostica" highlight="tu plan" subtitle="Marca las señales que tu plan de compensación tiene hoy. Cada una apunta a la corrección que respalda la evidencia de la clase.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] flex flex-col gap-1.5 justify-center">
            {SENALES.map((s, k) => (
              <button key={s.k} onClick={() => setSel(sel.map((v, j) => (j === k ? !v : v)))} className={`text-left px-3.5 py-2.5 rounded-2xl text-[13px] font-bold flex items-center gap-2.5 transition-all ${sel[k] ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/25' : isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <span className={`shrink-0 w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${sel[k] ? 'bg-white/30' : isDark ? 'bg-white/10' : 'bg-white'}`}>{sel[k] ? '✓' : ''}</span>
                {s.k}
              </button>
            ))}
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Señales marcadas</p>
              <p className="text-4xl font-black leading-none mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{n}<span className={`text-xl ${textMuted(isDark)}`}> / {SENALES.length}</span></p>
              <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>
                {n === 0 ? 'Marca las que apliquen a tu plan.' : n <= 2 ? 'Pocas señales: ajustes puntuales.' : n <= 4 ? 'Varias señales: conviene rediseñar por etapas.' : 'Muchas señales: el plan probablemente trabaja contra sus propios objetivos.'}
              </p>
            </div>
            <div data-g="correcciones" className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {alertas.length === 0 && <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Aquí aparecerá la corrección sugerida para cada señal.</p>}
              {alertas.map((a) => (
                <div key={a.k} className={`px-3 py-2 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>{a.k}</p>
                  <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{a.fix}</p>
                </div>
              ))}
            </div>
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
  { q: 'Según Jenkins y cols. (1998), ¿qué ocurre con la calidad del trabajo cuando se paga por incentivos?', options: ['Sube junto con la cantidad', 'No muestra una relación significativa', 'Cae de forma sistemática', 'Depende solo de la antigüedad'], answer: 1, why: 'El incentivo se asoció con la cantidad (0,34) y no con la calidad. Para proteger la calidad hay que medirla y pagarla.' },
  { q: '¿Qué mejora media global halló el metaanálisis de Condly y cols. (2003)?', options: ['5 %', '22 %', '45 %', '60 %'], answer: 1, why: 'Del orden del 22 %, sobre 45 estudios seleccionados de unos 600 revisados.' },
  { q: 'Según Kim, Gerhart y Fang (2022), en tareas interesantes los incentivos financieros…', options: ['destruyen la motivación interna', 'no tienen ningún efecto', 'tienen un efecto positivo', 'solo funcionan para la calidad'], answer: 2, why: 'El efecto fue positivo, también en tareas interesantes, aunque menos positivo para la calidad.' },
  { q: '¿Qué segmento sostiene mejor su producción gracias a las comisiones por sobrecumplimiento?', options: ['Los rezagados', 'El núcleo', 'Las estrellas', 'Los recién ingresados'], answer: 2, why: 'En el estudio de Chung y cols., estas comisiones ayudan a los mejores a mantener su producción después de alcanzar la cuota.' },
  { q: 'En el experimento de Cadsby, Song y Tapon (2010), ¿quién tendía más a exagerar su resultado?', options: ['Quien estaba lejos de la meta', 'Quien estaba cerca de la meta', 'Quien cobraba por palabra', 'Quien trabajaba en equipo'], answer: 1, why: 'Con un bono al llegar a nueve palabras, cuanto más cerca de la meta, más probable era exagerar el puntaje.' },
  { q: '¿Cuánto subió la producción por trabajador en el caso Safelite (Lazear, 2000)?', options: ['4 %', '14 %', '44 %', '144 %'], answer: 2, why: 'Un 44 % al pasar de sueldo por hora a pago por pieza; cerca de la mitad fue efecto de ordenamiento.' },
  { q: 'Según Garbers y Konradt (2014), ¿qué incentivo mostró un efecto promedio mayor?', options: ['El individual, con 0,45', 'El de equipo, con 0,45', 'Ambos fueron iguales', 'Ninguno tuvo efecto'], answer: 1, why: 'Equipo: 0,45; individual: 0,32. Además, las recompensas repartidas según el aporte rinden más que las iguales.' },
  { q: '¿Qué caracteriza al bono con encuadre de pérdida de Fryer y cols. (2012)?', options: ['Se paga al final, si se cumple', 'Se entrega al inicio y se devuelve si no se cumple', 'Se reparte por partes iguales', 'Se paga solo a los mejores'], answer: 1, why: 'Los docentes recibieron el bono al inicio, con obligación de devolverlo si los resultados no mejoraban.' },
  { q: 'Según el metaanálisis de Stajkovic y Luthans (2003), ¿qué combinación produce el mayor efecto?', options: ['Solo dinero', 'Solo reconocimiento', 'Dinero, retroalimentación y reconocimiento juntos', 'Solo retroalimentación'], answer: 2, why: 'Cada reforzador funciona, pero la combinación es la más fuerte.' },
  { q: 'Según Locke y Latham, una meta específica y difícil, comparada con «haz tu mejor esfuerzo»…', options: ['rinde menos', 'rinde igual', 'rinde más', 'solo sirve en tareas simples'], answer: 2, why: 'Los metaanálisis encontraron tamaños de efecto de 0,42 a 0,80 a favor de la meta específica y difícil.' },
];

const AVANZADO: QuizQ[] = [
  { q: 'La correlación de 0,34 entre incentivos y cantidad (Jenkins y cols.) debe leerse como…', options: ['Una mejora del 34 %', 'Una correlación, no un porcentaje de mejora', 'Un 34 % de vendedores que mejoran', 'Una pérdida del 34 % en calidad'], answer: 1, why: 'Es una correlación corregida; Kim y cols. la reexpresan como una diferencia estandarizada de +0,79.' },
  { q: '¿Por qué Condly y cols. retuvieron solo 45 de unos 600 estudios?', options: ['Porque exigieron medir el desempeño antes del programa', 'Porque eliminaron los estudios de equipos', 'Porque solo aceptaron estudios de ventas', 'Porque descartaron los incentivos en dinero'], answer: 0, why: 'Cerca del 83 % de los estudios publicados no medía el desempeño previo y no permitía estimar la mejora.' },
  { q: 'Sobre las tareas interesantes, Weibel (2010) y Kim y cols. (2022) difieren porque…', options: ['El primero halló efecto negativo y el segundo positivo', 'Ambos hallaron efecto negativo', 'Ambos hallaron efecto positivo', 'Ninguno midió tareas interesantes'], answer: 0, why: 'Weibel reportó −0,13; Kim, Gerhart y Fang reanalizaron la evidencia y hallaron +0,58.' },
  { q: '¿Qué limita extrapolar el 44 % de Safelite a una venta consultiva?', options: ['Era trabajo rutinario medido por pieza, en una sola empresa', 'No hubo cambio de sistema de pago', 'Los instaladores ganaban menos', 'Se pagaba por hora'], answer: 0, why: 'El contexto, una tarea simple y medible en una empresa, difiere de una venta compleja con ciclos largos.' },
  { q: 'Según el estudio de campo de Chung y cols., los vendedores que alcanzan la cuota…', options: ['Frenan siempre su esfuerzo', 'No frenan su esfuerzo', 'Abandonan la empresa', 'Piden que se suba el tope'], answer: 1, why: 'En cambio, tienden a rendirse cuando están lejos de la cuota.' },
  { q: 'La evidencia sobre el encuadre de pérdida proviene de…', options: ['Vendedores B2B', 'Unos 150 docentes', 'Cajeros de supermercado', 'Estudiantes de MBA'], answer: 1, why: 'Fryer, Levitt, List y Sadoff trabajaron con docentes; es un resultado de otro contexto que el comercial.' },
  { q: 'Garbers y Konradt hallan 0,45 para equipos y 0,32 para individuos. ¿Qué precisión corresponde?', options: ['Provienen de conjuntos distintos de estudios', 'Solo vale en laboratorio', 'Está expresado en dólares', 'Es un estudio de 1960'], answer: 0, why: 'Hubo 116 estudios individuales y 30 de equipo.' },
  { q: 'En la réplica en Corea del experimento de Stajkovic y Luthans, ¿qué cambió?', options: ['El dinero perdió todo efecto', 'El reconocimiento social rindió más que el dinero', 'La retroalimentación fue la mejor', 'No hubo diferencias'], answer: 1, why: 'El orden entre reforzadores puede variar con la cultura y el lugar de trabajo.' },
  { q: 'El −0,25 de la ambigüedad de rol (Verbeke y cols., 2011) indica que…', options: ['No saber con claridad qué se espera se asocia con menor desempeño', 'Los roles claros reducen las ventas', 'La ambigüedad mejora el desempeño', 'El rol no importa'], answer: 0, why: 'Es uno de los cinco grupos de factores con relación significativa con el desempeño en ventas.' },
  { q: '¿Qué limitación tiene el experimento de Cadsby, Song y Tapon (2010) sobre el engaño cerca del umbral?', options: ['Se hizo con estudiantes, en laboratorio y sin supervisión', 'Se hizo con 30.000 vendedores', 'Se hizo sin ningún bono', 'No comparó con otro esquema'], answer: 0, why: 'Comparó el pago con umbral con el pago lineal y con un torneo, pero en un contexto de laboratorio.' },
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
    <Shell isDark={isDark} title="Test 2 ·" highlight="avanzado" subtitle="Diez preguntas sobre cómo leer la evidencia con criterio.">
      <Quiz isDark={isDark} nivel="Avanzado" questions={AVANZADO} />
    </Shell>
  );
}
