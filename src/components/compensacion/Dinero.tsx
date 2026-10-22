import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, sceneTone, SceneDefs, Cylinder, Float, Traveler, PulseDisc, hop, Persona } from '../scene3d';
import { heading, Cifra, Nota, Fuente, BarrasIso, Piso, Sello } from './kit';
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
      <svg viewBox="0 0 600 230" className="w-full max-w-xl mb-2 z-10 overflow-visible" role="img" aria-label="Un vendedor junto a pilas de monedas">
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
        Los principales hallazgos de metaanálisis, estudios de campo y experimentos sobre comisiones y bonos, cada uno con su <strong>sello de evidencia</strong>.
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
            <div data-g="grafico" className="w-full max-h-[300px] flex-1 min-h-0">
              <BarrasIso id="ccq" isDark={isDark} max={40} W={440} hMax={150} items={[
                { name: 'Cantidad de ventas', value: 34, label: '0,34', hl: true },
                { name: 'Calidad del trabajo', value: 3, label: 'sin relación', tone: 'neutral' },
              ]} caption="Correlación corregida entre incentivo y desempeño" />
            </div>
            <div data-g="sello" className="flex flex-wrap items-center justify-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="39 estudios · 47 relaciones" />
              <span className={microLabel(isDark)}>Jenkins, Mitra, Gupta y Shaw · 1998</span>
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div data-g="por-que" className="rounded-3xl"><Nota isDark={isDark} label="Por qué ocurre" destacada>
              La teoría de agencia con tareas múltiples explica que el pago contingente <strong>desplaza la atención</strong> hacia lo fácil de cuantificar y de auditar, y deja sin premio lo que no se mide.
            </Nota></div>
            <div data-g="que-hacer" className="rounded-2xl"><Nota isDark={isDark} label="Qué hacer">
              Incluir en el bono <strong>métricas de calidad</strong>, como retención de clientes o satisfacción. Sin ellas, el dinero por sí solo no producirá excelencia de servicio.
            </Nota></div>
            <div data-g="reciente" className="rounded-2xl"><Nota isDark={isDark} label="Lo que añade el metaanálisis más reciente">
              Kim, Gerhart y Fang (2022) reexpresan ese 0,34 como una diferencia estandarizada de +0,79 y confirman que el efecto de los incentivos es positivo, pero <strong>menos positivo cuando se mide calidad</strong>.
            </Nota></div>
          </div>
        </div>
        <div data-g="fuente"><Fuente isDark={isDark}>Fuente: Jenkins et al. (1998), Journal of Applied Psychology 83(5), 777–787; Kim, Gerhart y Fang (2022), Journal of Applied Psychology 107(1), 153–167.</Fuente></div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* I.2 Cuánto mejora el desempeño                                      */
/* ------------------------------------------------------------------ */

const LECTURAS = [
  { k: 'Condly y cols. · 2003', texto: 'Metaanálisis de 45 estudios controlados, seleccionados entre unos 600 revisados. Promedio de mejora del desempeño: 22 %.' },
  { k: 'Stajkovic y Luthans · 2003', texto: 'Metaanálisis de 72 estudios de modificación de conducta organizacional. Efecto medio d = 0,47, equivalente a una mejora del 16 %.' },
  { k: 'Según el tipo de tarea', texto: 'En el metaanálisis de Condly y colaboradores, las tareas manuales mejoraron algo más que las cognitivas; los programas largos, más que los cortos; y los incentivos dirigidos a equipos, más que los individuales.' },
];

export function Magnitud({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const sel = LECTURAS[i];
  return (
    <Shell isDark={isDark} title="Cuánto mejora el desempeño:" highlight="del 16 al 22 %" subtitle="Dos metaanálisis independientes coinciden en el orden de magnitud: los programas estructurados de incentivos mejoran el rendimiento de forma apreciable.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div data-g="pills" className="flex flex-wrap justify-center gap-1.5">
              {LECTURAS.map((x, k) => <span key={x.k} data-g={['pill-condly', 'pill-stajkovic', 'pill-tarea'][k]} className="inline-flex rounded-full"><Pill isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill></span>)}
            </div>
            <div data-g="grafico" className="w-full max-h-[270px] flex-1 min-h-0">
              <BarrasIso id="ccm" isDark={isDark} max={30} W={400} hMax={140} items={[
                { name: 'Condly y cols.', value: 22, label: '22 %', hl: i === 0 },
                { name: 'Stajkovic y Luthans', value: 16, label: '16 %', hl: i === 1, tone: 'peach' },
              ]} caption="Mejora media del rendimiento con incentivos" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div data-g="detalle" className="rounded-3xl"><AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{sel.k}</p>
                <p className={`text-sm leading-snug mt-0.5 ${textMuted(isDark)}`}>{sel.texto}</p>
              </motion.div>
            </AnimatePresence></div>
            <div data-g="cifras" className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={45} titulo="Estudios seleccionados" lineas={['de unos 600 revisados']} />
              <Cifra isDark={isDark} n={72} titulo="Estudios del otro metaanálisis" lineas={['modificación de conducta']} destacada />
            </div>
            <div data-g="nota-45" className="rounded-2xl"><Nota isDark={isDark} label="Por qué solo 45 de 600">
              Condly y colaboradores exigieron que cada estudio midiera el desempeño antes del programa de incentivos. Cerca del 83 % de los estudios publicados no lo hacía, así que no podía estimar la mejora real.
            </Nota></div>
            <div data-g="sello" className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Performance Improvement Quarterly · Personnel Psychology" />
            </div>
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
    <Shell isDark={isDark} title="¿El dinero mata" highlight="la motivación interna?" subtitle="Durante años se creyó que las recompensas tangibles apagan el interés por la tarea. El metaanálisis más reciente indica lo contrario en tareas interesantes.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] flex flex-col gap-2.5 justify-center">
            <Cifra isDark={isDark} n={0.13} dec={2} prefijo="−" titulo="Weibel y cols. · 2010" lineas={['Efecto en tareas interesantes: negativo']} />
            <Cifra isDark={isDark} n={0.58} dec={2} prefijo="+" titulo="Kim, Gerhart y Fang · 2022" lineas={['Efecto en tareas interesantes: positivo']} destacada />
            <Cifra isDark={isDark} n={0.52} dec={2} prefijo="+" titulo="Kim, Gerhart y Fang · 2022" lineas={['Efecto en tareas poco interesantes']} />
            <p data-aux="pie" className={`text-[11px] leading-snug ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Diferencia estandarizada (delta) entre trabajar con y sin incentivo financiero.</p>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="reanálisis y ampliación" />
            </div>
            <Nota isDark={isDark} label="Dos metaanálisis, dos conclusiones" destacada>
              Jenkins y colaboradores (1998) ya habían hallado un efecto positivo, también en tareas interesantes. Weibel y colaboradores (2010) reportaron un efecto negativo. Kim, Gerhart y Fang reanalizaron ambas bases de evidencia y encontraron un efecto <strong>positivo en tareas interesantes y en las que no lo son</strong>.
            </Nota>
            <Nota isDark={isDark} label="La salvedad que se mantiene">
              Para la <strong>calidad</strong> el efecto es menos positivo, sobre todo en tareas interesantes: el incentivo no sustituye al criterio profesional.
            </Nota>
            <Nota isDark={isDark} label="Por qué se pensó lo contrario">
              Buena parte de los experimentos clásicos sobre este efecto usaron niños o estudiantes con pagos pequeños y puntuales. Un bono significativo en un trabajo adulto es otra situación.
            </Nota>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Kim, Gerhart y Fang (2022), Journal of Applied Psychology 107(1), 153–167; Weibel et al. (2010); Jenkins et al. (1998).</Fuente>
      </div>
    </Shell>
  );
}
