import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Float, Lift, Traveler, PulseDisc, hop, Persona } from '../scene3d';
import { Cifra, Nota, Fuente, Piso, Paso, Sello } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* V.1 Metas específicas                                               */
/* ------------------------------------------------------------------ */

const NIVELES_META = [
  { k: 'Meta vaga', d: '«Haz tu mejor esfuerzo». No hay un estándar que cumplir, y la persona decide por su cuenta cuánto es suficiente.' },
  { k: 'Meta específica y difícil', d: 'Una cifra concreta, desafiante, de facturación o unidades. En los metaanálisis revisados por Locke y Latham rinde más que el «haz tu mejor esfuerzo», con tamaños de efecto de 0,42 a 0,80.' },
  { k: 'Con retroalimentación', d: 'La teoría de metas incluye la retroalimentación entre sus cinco principios: claridad, desafío, compromiso, retroalimentación y complejidad de la tarea.' },
];

export function Metas({ isDark }: SlideProps) {
  const [i, setI] = useState(1);
  const t = sceneTone(isDark);
  const pasos = [0, 1, 2, 3, 4, 5];
  const x = (k: number) => 70 + k * 92;
  return (
    <Shell isDark={isDark} title="Metas específicas" highlight="y difíciles" subtitle="Treinta y cinco años de investigación muestran que una meta concreta y exigente rinde más que la exhortación genérica.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap justify-center gap-1.5">
              {NIVELES_META.map((n, k) => <Pill key={n.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{n.k}</Pill>)}
            </div>
            <svg viewBox="0 0 600 240" className="w-full h-full max-h-[260px] overflow-visible" role="img" aria-label="Camino de seis tramos hacia la meta">
              <SceneDefs id="ccme" isDark={isDark} />
              <Piso cx={300} cy={196} s={280} fill={t.floor} />
              {pasos.map((k) => {
                const meta = i > 0 && k === 5;
                const avance = i === 2 && k < 4;
                return (
                  <motion.g key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.05 }}>
                    <Float amp={meta ? 4 : 1} dur={2.4} delay={k * 0.15}>
                      <g filter="url(#ccme-sh)"><IsoBox cx={x(k)} cy={150} s={24} h={meta ? 40 : 16} f={meta ? BRAND : avance ? PEACH : NEUTRAL(isDark)} /></g>
                    </Float>
                  </motion.g>
                );
              })}
              {i > 0 && <PulseDisc cx={x(5)} cy={196} rx={40} ry={12} dur={2.2} peak={0.3} />}
              <motion.g animate={{ x: i === 0 ? 120 : i === 1 ? 230 : 300 }} transition={{ type: 'spring', stiffness: 60, damping: 14 }}>
                <Float amp={3} dur={2.2}><Persona id="ccme" cx={x(0) - 10} cy={140} s={0.8} body={BRAND} accessory="tie" hair="#2b1a12" /></Float>
              </motion.g>
              {i === 0 && <Traveler id="ccme" path={[[210, 60], [330, 92], [250, 52], [390, 90]]} dur={3} repeatDelay={0.3} r={5} />}
              {i > 0 && <text x={x(5)} y={96} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={ORANGE}>Meta</text>}
              <text x={300} y={232} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{i === 0 ? 'Sin estándar: no se sabe cuánto es suficiente' : i === 1 ? 'Un destino claro y exigente' : 'Destino claro y avance conocido'}</text>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} data-g="detalle" className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{NIVELES_META[i].k}</p>
                <p className={`text-sm leading-snug mt-0.5 ${textMuted(isDark)}`}>{NIVELES_META[i].d}</p>
              </motion.div>
            </AnimatePresence>
            <Nota isDark={isDark} label="Más difícil, más rendimiento">
              Los metaanálisis encontraron una relación positiva y lineal entre la dificultad de la meta y el rendimiento, con tamaños de efecto de 0,52 a 0,82. El rendimiento se aplana o cae solo cuando se alcanzan los límites de la capacidad, o cuando el compromiso con una meta muy difícil se pierde.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Locke y Latham · 35 años de investigación" />
            </div>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Locke y Latham (2002), American Psychologist 57(9), 705–717.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* V.2 Rol claro y autoeficacia                                        */
/* ------------------------------------------------------------------ */

export function Rol({ isDark }: SlideProps) {
  const [claro, setClaro] = useState(true);
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Rol claro y autoeficacia:" highlight="dos predictores del desempeño" subtitle="Se rinde menos cuando no se sabe con claridad qué se espera, y más cuando se confía en la propia capacidad de lograr lo que se propone.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={claro} onClick={() => setClaro(true)}>Rol claro</Pill>
              <Pill isDark={isDark} on={!claro} onClick={() => setClaro(false)}>Rol ambiguo</Pill>
            </div>
            <svg viewBox="0 0 440 250" className="w-full h-full max-h-[260px] overflow-visible" role="img" aria-label={claro ? 'Una sola dirección hacia el objetivo' : 'Varias direcciones contradictorias'}>
              <SceneDefs id="ccro" isDark={isDark} />
              <Piso cx={220} cy={206} s={200} fill={t.floor} />
              <Float amp={4} dur={2.4}><Persona id="ccro" cx={80} cy={200} s={1.3} body={BRAND} accessory="compass" hair="#2b1a12" /></Float>
              {claro ? (
                <>
                  <Float amp={4} dur={2}><g filter="url(#ccro-sh)"><IsoBox cx={340} cy={110} s={32} h={50} f={BRAND} /></g></Float>
                  <Traveler id="ccro" path={hop([110, 120], [320, 100], 36)} dur={1.8} repeatDelay={0.4} r={5} />
                  <text x={340} y={90} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={ORANGE}>Objetivo</text>
                </>
              ) : (
                <>
                  {[[320, 70], [360, 150], [270, 40]].map((p, k) => (
                    <Float key={k} amp={3} dur={2 + k * 0.4}><g filter="url(#ccro-sh)"><IsoBox cx={p[0]} cy={p[1]} s={20} h={26} f={k === 0 ? PEACH : NEUTRAL(isDark)} /></g></Float>
                  ))}
                  <Traveler id="ccro" path={[[110, 120], [300, 60], [150, 130], [350, 150]]} dur={3.2} repeatDelay={0.2} r={5} />
                  <text x={320} y={206} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Demandas que se contradicen</text>
                </>
              )}
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={0.25} dec={2} prefijo="−" titulo="Ambigüedad de rol" lineas={['con el desempeño en ventas', 'coeficiente β · Verbeke y cols. 2011']} destacada />
              <Cifra isDark={isDark} n={0.38} dec={2} prefijo="+" titulo="Autoeficacia" lineas={['con el desempeño laboral', 'correlación media · 114 estudios']} />
            </div>
            <Nota isDark={isDark} label="Ambigüedad de rol" destacada>
              Verbeke, Dietz y Verwaal sintetizaron estudios de 1982 a 2008 y encontraron que la ambigüedad de rol, es decir no saber con claridad qué se espera, se asocia con menor desempeño en ventas. Es uno de los cinco grupos de factores con relación significativa.
            </Nota>
            <Nota isDark={isDark} label="Autoeficacia">
              Es la convicción de poder movilizar los recursos necesarios para lograr lo que se propone. Stajkovic y Luthans (1998) reunieron 114 estudios, con más de 21.000 personas, y hallaron una correlación media de 0,38 con el desempeño laboral.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Verbeke y cols. 2011 · Stajkovic y Luthans 1998" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* V.3 Entrenar con modelado conductual                                */
/* ------------------------------------------------------------------ */

const BMT = [
  { k: 'Describir la conducta', d: 'Se definen las conductas objetivo. Funciona mejor cuando los puntos clave se presentan como las reglas que explican por qué la conducta funciona.' },
  { k: 'Modelar', d: 'Una persona demuestra la conducta, de modo que quien aprende ve cómo se hace.' },
  { k: 'Practicar', d: 'La persona que aprende ensaya la conducta con práctica guiada.' },
  { k: 'Recibir retroalimentación', d: 'Después del ensayo recibe corrección sobre lo que hizo.' },
  { k: 'Transferir al puesto', d: 'Se promueve que lo aprendido se aplique en el trabajo real.' },
];

export function ModeladoConductual({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Entrenar con modelado conductual:" highlight="ver, practicar, corregir" subtitle="Para cambiar lo que el vendedor hace, no basta explicárselo: hay que mostrárselo, hacerlo ensayar y corregirlo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 520 260" className="w-full h-full max-h-[280px] overflow-visible" role="img" aria-label="Escalera de cinco pasos de entrenamiento">
              <SceneDefs id="ccbm" isDark={isDark} />
              <Piso cx={260} cy={224} s={250} fill={t.floor} />
              {BMT.map((b, k) => {
                const x = 70 + k * 92;
                const h = 22 + k * 18;
                const base = 214;
                return (
                  <Lift key={b.k} on={i === k} dimmed={i !== k} onClick={() => setI(k)} lift={12}>
                    <Float amp={i === k ? 3 : 1} dur={2.6} delay={k * 0.2}>
                      <g filter="url(#ccbm-sh)"><IsoBox cx={x} cy={base - h - 6} s={30} h={h} f={i === k ? BRAND : PEACH} /></g>
                    </Float>
                    <text x={x} y={base + 18} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={i === k ? ORANGE : t.muted}>{k + 1}</text>
                  </Lift>
                );
              })}
              <Traveler id="ccbm" path={BMT.map((_, k) => [70 + k * 92, 160 - k * 18] as [number, number])} dur={3} repeatDelay={0.8} r={5} />
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2 justify-center">
            {BMT.map((b, k) => (
              <button key={b.k} onClick={() => setI(k)} className="text-left"><Paso isDark={isDark} n={k + 1} titulo={b.k} on={i === k}>{i === k ? b.d : undefined}</Paso></button>
            ))}
            <Nota isDark={isDark} label="Qué encontró el metaanálisis">
              Taylor, Russ-Eft y Chan (2005) hallaron que este entrenamiento tiene efectos positivos en actitudes, conocimientos, habilidades y conducta en el puesto: grandes en conocimientos y habilidades, y moderados en actitudes y conducta en el puesto.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Taylor, Russ-Eft y Chan · 2005" />
            </div>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Taylor, Russ-Eft y Chan (2005), Journal of Applied Psychology 90(4), 692–709.</Fuente>
      </div>
    </Shell>
  );
}
