import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Cylinder, Float, Traveler, PulseDisc, hop, Persona } from '../scene3d';
import { heading, Cifra, Nota, Fuente, BarrasIso, Piso, Verificado, Sello } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* Portada                                                             */
/* ------------------------------------------------------------------ */

export function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pilas = [{ x: 330, n: 2 }, { x: 400, n: 4 }, { x: 470, n: 6 }];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 600 230" className="w-full max-w-xl mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="ccp" isDark={isDark} />
        <Piso cx={300} cy={190} s={270} fill={t.floor} />
        <PulseDisc cx={160} cy={190} rx={50} ry={15} dur={2.2} peak={0.3} />
        <Float amp={5} dur={2.4}><Persona id="ccp" cx={160} cy={188} s={1.3} body={BRAND} accessory="tie" hair="#2b1a12" /></Float>
        {pilas.map((p, k) => (
          <motion.g key={p.x} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + k * 0.15, type: 'spring', stiffness: 90, damping: 13 }}>
            {Array.from({ length: p.n }).map((_, i) => (
              <Cylinder key={i} cx={p.x} cy={178 - i * 11} rx={26} ry={8} h={9} top={k === 2 ? '#ffb066' : '#ffd2a8'} side={k === 2 ? '#ef375c' : '#f0875a'} />
            ))}
          </motion.g>
        ))}
        <Traveler id="ccp" path={hop([205, 120], [470, 90], 40)} dur={2.4} repeatDelay={0.8} r={5} />
        <text x={300} y={226} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>El dinero mueve el comportamiento, pero no siempre el que esperas</text>
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">La evidencia sobre compensación comercial</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Pagar para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">vender mejor</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Treinta hallazgos de metaanálisis, estudios de campo y experimentos. Cada uno con su <strong>sello de evidencia</strong> y las cifras contrastadas con las fuentes originales.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* I.1 Más cantidad, no más calidad                                    */
/* ------------------------------------------------------------------ */

export function CantidadCalidad({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Más cantidad," highlight="no necesariamente más calidad" subtitle="El pago variable empuja lo que se mide fácil. Si quieres precisión técnica o buen servicio posventa, el contrato tiene que medirlos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="w-full max-h-[300px] flex-1 min-h-0">
              <BarrasIso id="ccq" isDark={isDark} max={40} W={440} hMax={150} items={[
                { name: 'Cantidad de ventas', value: 34, label: '0,34', hl: true },
                { name: 'Calidad del trabajo', value: 3, label: 'sin relación', tone: 'neutral' },
              ]} caption="Correlación corregida entre incentivo y desempeño" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="39 estudios · 47 relaciones" />
              <span className={microLabel(isDark)}>Jenkins, Mitra, Gupta y Shaw · 1998</span>
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Por qué ocurre" destacada>
              El pago contingente <strong>desplaza la atención</strong> hacia lo fácil de cuantificar y auditar. Si la comisión premia la colocación bruta, el vendedor invierte menos en asesoría, verificación técnica y posventa.
            </Nota>
            <Nota isDark={isDark} label="Qué hacer">
              Indexar una parte del bono a <strong>métricas auditables de calidad</strong>: retención de clientes, satisfacción o defectos de originación. Sin eso, el dinero por sí solo no producirá excelencia de servicio.
            </Nota>
            <Nota isDark={isDark} label="Lo que añade el metaanálisis más reciente">
              Kim, Gerhart y Fang (2022) confirman que el efecto de los incentivos es positivo, pero <strong>menos positivo cuando se mide calidad</strong>.
            </Nota>
            <Verificado isDark={isDark} tipo="corregido">
              El informe traduce estas correlaciones a «+12 %» y «+3 %». El artículo no usa esa escala: lo publicado es una correlación de 0,34 con la cantidad y ninguna relación significativa con la calidad.
            </Verificado>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Jenkins et al. (1998), Journal of Applied Psychology 83(5), 777–787; Kim, Gerhart y Fang (2022), Journal of Applied Psychology 107(1), 153–167.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* I.2 Cuánto mejora el desempeño                                      */
/* ------------------------------------------------------------------ */

const TAREAS = [
  { k: 'Efecto global', v: 22, label: '22 %', verificada: true, texto: 'Promedio de 45 estudios controlados de alta calidad, publicados entre 1965 y 2000, en todo tipo de trabajo y tarea.' },
  { k: 'Tarea rutinaria', v: 27, label: '27 %*', verificada: false, texto: 'Llamadas de prospección en frío, seguimiento con guion, despacho transaccional: más esfuerzo se traduce casi linealmente en más producción.' },
  { k: 'Venta consultiva', v: 15, label: '15 %*', verificada: false, texto: 'Diagnosticar arquitecturas, mover a varios decisores, diseñar soluciones a medida: el dinero solo no basta, hace falta repertorio de habilidades.' },
];

export function Magnitud({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const sel = TAREAS[i];
  return (
    <Shell isDark={isDark} title="Cuánto mejora el desempeño:" highlight="depende de la tarea" subtitle="Los programas estructurados de incentivos elevan el rendimiento, pero no por igual en una llamada en frío que en una venta consultiva.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap justify-center gap-1.5">
              {TAREAS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}
            </div>
            <div className="w-full max-h-[270px] flex-1 min-h-0">
              <BarrasIso id="ccm" isDark={isDark} max={30} W={440} hMax={140} unit="" items={TAREAS.map((x, k) => ({ name: x.k, value: x.v, label: x.label, hl: k === i, tone: x.verificada ? 'peach' : 'neutral' }))} caption="Mejora media del rendimiento · * cifra del informe" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{sel.k}</p>
                <p className={`text-sm leading-snug mt-0.5 ${textMuted(isDark)}`}>{sel.texto}</p>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={45} titulo="Estudios seleccionados" lineas={['de unos 600 revisados']} />
              <Cifra isDark={isDark} n={22} sufijo=" %" titulo="Mejora media global" lineas={['Condly, Clark y Stolovitch, 2003']} destacada />
            </div>
            <Nota isDark={isDark} label="Por qué la venta consultiva rinde menos">
              En una tarea compleja, mucha presión monetaria puede producir <strong>visión de túnel</strong> y ansiedad de cierre si no va con conocimiento técnico y habilidades estratégicas.
            </Nota>
            <Verificado isDark={isDark} tipo="corregido">
              La fuente confirma el 22 % global y que lo manual mejora «algo más» que lo cognitivo. Los 27 % y 15 % son cifras del informe que no pude comprobar. Además, 83 % de los estudios publicados no medía el desempeño previo, y los autores trabajan para la industria de incentivos.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* I.3 ¿Mata la motivación interna?                                    */
/* ------------------------------------------------------------------ */

export function Intrinseca({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="¿El dinero mata" highlight="la motivación interna?" subtitle="Durante años se creyó que las recompensas tangibles apagan el interés por la tarea. El metaanálisis más reciente matiza esa idea en el trabajo adulto.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] flex flex-col gap-2.5 justify-center">
            <Cifra isDark={isDark} n={0.13} dec={2} prefijo="−" titulo="Weibel y cols. · 2010" lineas={['Efecto en tareas interesantes: negativo']} />
            <Cifra isDark={isDark} n={0.58} dec={2} prefijo="+" titulo="Kim, Gerhart y Fang · 2022" lineas={['Efecto en tareas interesantes: positivo']} destacada />
            <Cifra isDark={isDark} n={0.52} dec={2} prefijo="+" titulo="Kim, Gerhart y Fang · 2022" lineas={['Efecto en tareas poco interesantes']} />
            <p className={`text-[11px] leading-snug ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Diferencia estandarizada (delta) entre trabajar con y sin incentivo financiero.</p>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="reanálisis y ampliación" />
            </div>
            <Nota isDark={isDark} label="Por qué el dinero puede sumar" destacada>
              En adultos profesionales, un bono ligado a metas específicas funciona como <strong>señal tangible de maestría</strong> y de valor aportado, no como vigilancia. Cuando el reparto se percibe justo, satisface competencia y autonomía.
            </Nota>
            <Nota isDark={isDark} label="La salvedad que sí se mantiene">
              Para la <strong>calidad</strong> el efecto es menos positivo, sobre todo en tareas interesantes: el incentivo no sustituye al criterio profesional.
            </Nota>
            <Nota isDark={isDark} label="Por qué se pensó lo contrario">
              Los experimentos clásicos usaban niños o estudiantes con pagos pequeños y puntuales, que se leen como control externo. Un bono de varios dígitos en un trabajo adulto significa otra cosa.
            </Nota>
            <Verificado isDark={isDark} tipo="corregido">
              El informe dice que el efecto es positivo también para la calidad. El resumen del artículo indica que lo es menos; conviene no prometer calidad con solo pagar más.
            </Verificado>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Kim, Gerhart y Fang (2022), Journal of Applied Psychology 107(1), 153–167; Weibel et al. (2010); Cerasoli et al. (2014), citados en el informe.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* I.4 Efectivo o premios en especie                                   */
/* ------------------------------------------------------------------ */

const PREMIOS = [
  {
    k: 'Efectivo',
    tipo: 'Gana como regla general',
    pros: ['Es fungible: cada persona lo usa como prefiere.', 'No pierde valor por gustos distintos.', 'Casi no tiene fricción administrativa.'],
    contra: 'Se mezcla mentalmente con el sueldo y se va en gastos corrientes, así que casi no se «ve».',
  },
  {
    k: 'Viaje o catálogo',
    tipo: 'Pierde en valor, gana en visibilidad',
    pros: ['Es muy visible socialmente.', 'Se guarda en una «cuenta mental» separada, más memorable.', 'En un experimento, algunas personas respondieron mejor a premios tangibles o mixtos.'],
    contra: 'La empresa elige por todos: un destino o producto que no calza con quien lo recibe equivale a dinero perdido.',
  },
];

export function Efectivo({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const t = sceneTone(isDark);
  const p = PREMIOS[i];
  return (
    <Shell isDark={isDark} title="Efectivo o premios en especie:" highlight="qué conviene" subtitle="A igual valor nominal, el dinero suele superar a los bienes y viajes. Pero la contabilidad mental explica por qué un premio visible puede recordarse más.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[42%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              {PREMIOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}
            </div>
            <svg viewBox="0 0 400 240" className="w-full h-full max-h-[260px] overflow-visible" role="img" aria-label="Pila de monedas frente a una caja de regalo">
              <SceneDefs id="cce" isDark={isDark} />
              <Piso cx={200} cy={190} s={170} fill={t.floor} />
              <motion.g animate={{ y: i === 0 ? -12 : 0, opacity: i === 0 ? 1 : 0.45 }} transition={{ type: 'spring', stiffness: 150, damping: 16 }}>
                <Float amp={3} dur={2.6}>
                  <g filter="url(#cce-sh)">
                    {Array.from({ length: 6 }).map((_, k) => <Cylinder key={k} cx={110} cy={170 - k * 12} rx={34} ry={10} h={10} top={k === 5 ? '#ffb066' : '#ffd2a8'} side="#f0875a" />)}
                  </g>
                </Float>
              </motion.g>
              <motion.g animate={{ y: i === 1 ? -12 : 0, opacity: i === 1 ? 1 : 0.45 }} transition={{ type: 'spring', stiffness: 150, damping: 16 }}>
                <Float amp={3} dur={3}>
                  <g filter="url(#cce-sh)"><IsoBox cx={290} cy={110} s={44} h={64} f={BRAND} /></g>
                  <g><IsoBox cx={290} cy={102} s={48} h={10} f={PEACH} /></g>
                </Float>
              </motion.g>
              <text x={110} y={214} textAnchor="middle" fontSize={12} fontWeight={900} fill={i === 0 ? ORANGE : t.muted}>Efectivo</text>
              <text x={290} y={214} textAnchor="middle" fontSize={12} fontWeight={900} fill={i === 1 ? ORANGE : t.muted}>Premio en especie</text>
            </svg>
          </div>
          <div className="lg:w-[58%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>{p.k} · {p.tipo}</p>
                  <ul className={`mt-1 text-sm leading-snug space-y-1 ${textMuted(isDark)}`}>
                    {p.pros.map((x) => <li key={x} className="flex gap-2"><span className="text-[#ff851d] font-black">•</span>{x}</li>)}
                  </ul>
                </div>
                <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>El costo oculto</p>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{p.contra}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Garbers y Konradt · 146 estudios" />
              <Sello isDark={isDark} tipo="laboratorio" detalle="diferencias de género: un experimento" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              El informe afirma que el efectivo supera al premio en especie «en magnitud y persistencia», pero no entrega una cifra comprobable. Úsalo como regla de diseño, no como dato.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}
