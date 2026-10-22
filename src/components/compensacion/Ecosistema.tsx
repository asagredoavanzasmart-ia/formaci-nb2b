import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, sceneTone, SceneDefs, IsoBox, Float, Lift, Traveler, hop, Persona, Orb } from '../scene3d';
import { Nota, Fuente, BarrasIso, Piso, Sello } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* III.1 Quién entra y quién se va                                     */
/* ------------------------------------------------------------------ */

export function Sorting({ isDark }: SlideProps) {
  const [k, setK] = useState<'incentivo' | 'orden'>('orden');
  const t = sceneTone(isDark);
  const B = 214;
  const h = 62;
  const s = 52;
  const yBajo = B - h;
  const yAlto = yBajo - h;
  return (
    <Shell isDark={isDark} title="Quién entra y quién se va:" highlight="el efecto de ordenamiento" subtitle="Un pago variable no solo cambia el esfuerzo de quienes ya están: cambia a quién atrae y a quién retiene.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={k === 'incentivo'} onClick={() => setK('incentivo')}>Efecto incentivo</Pill>
              <Pill isDark={isDark} on={k === 'orden'} onClick={() => setK('orden')}>Efecto ordenamiento</Pill>
            </div>
            <svg viewBox="0 0 440 270" className="w-full h-full max-h-[290px] overflow-visible" role="img" aria-label="Aumento de productividad de 44 por ciento dividido en dos mitades">
              <SceneDefs id="ccso" isDark={isDark} />
              <Piso cx={150} cy={B + 18} s={150} fill={t.floor} />
              <motion.g animate={{ opacity: k === 'incentivo' ? 1 : 0.45 }}>
                <Float amp={k === 'incentivo' ? 3 : 1} dur={2.6}><g filter="url(#ccso-sh)"><IsoBox cx={150} cy={yBajo} s={s} h={h} f={PEACH} /></g></Float>
              </motion.g>
              <motion.g animate={{ opacity: k === 'orden' ? 1 : 0.45 }}>
                <Float amp={k === 'orden' ? 3 : 1} dur={2.9} delay={0.3}><g filter="url(#ccso-sh)"><IsoBox cx={150} cy={yAlto} s={s} h={h} f={BRAND} /></g></Float>
              </motion.g>
              <text x={232} y={yBajo + h * 0.55} fontSize={12.5} fontWeight={900} fill={k === 'incentivo' ? ORANGE : t.text}>≈ la mitad</text>
              <text x={232} y={yBajo + h * 0.55 + 14} fontSize={11} fill={t.muted}>más esfuerzo de</text>
              <text x={232} y={yBajo + h * 0.55 + 27} fontSize={11} fill={t.muted}>quienes ya estaban</text>
              <text x={232} y={yAlto + h * 0.55} fontSize={12.5} fontWeight={900} fill={k === 'orden' ? ORANGE : t.text}>≈ la otra mitad</text>
              <text x={232} y={yAlto + h * 0.55 + 14} fontSize={11} fill={t.muted}>mejores trabajadores</text>
              <text x={232} y={yAlto + h * 0.55 + 27} fontSize={11} fill={t.muted}>entran y se quedan</text>
              <text x={150} y={yAlto - s / 2 - 14} textAnchor="middle" fontSize={20} fontWeight={900} fill={ORANGE}>+44 %</text>
              <text x={150} y={B + 40} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Productividad por trabajador</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="El caso Safelite" destacada>
              Al pasar de un sueldo por hora a un pago por pieza, los instaladores de parabrisas elevaron un <strong>44 %</strong> su producción por trabajador, y la empresa ganó más. Cerca de la mitad vino de más esfuerzo de los existentes; la otra mitad, de atraer y retener a trabajadores más productivos.
            </Nota>
            <Nota isDark={isDark} label="Lo que confirmó el laboratorio">
              Cadsby, Song y Tapon (2007) compararon en un experimento de esfuerzo real el pago por desempeño con el sueldo fijo: la productividad fue significativamente mayor, tanto por ordenamiento como por incentivo. Los más productivos eligieron más el pago por desempeño, y quienes tenían más aversión al riesgo lo eligieron menos.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="Lazear · 2000 · una empresa" />
              <Sello isDark={isDark} tipo="laboratorio" detalle="Cadsby, Song y Tapon · 2007" />
            </div>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Lazear (2000), American Economic Review 90(5), 1346–1361; Cadsby, Song y Tapon (2007), Academy of Management Journal 50(2), 387–405.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* III.2 Torneos de suma cero                                          */
/* ------------------------------------------------------------------ */

export function Torneos({ isDark }: SlideProps) {
  const [torneo, setTorneo] = useState(true);
  const t = sceneTone(isDark);
  const xs = [70, 180, 290, 400, 510];
  return (
    <Shell isDark={isDark} title="Torneos de suma cero:" highlight="cuando ayudar sale caro" subtitle="Si solo gana el primero del ranking, ayudar a un colega es regalarle ventaja. El contrato puede premiar la cooperación o castigarla.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={torneo} onClick={() => setTorneo(true)}>Ranking: gana solo el primero</Pill>
              <Pill isDark={isDark} on={!torneo} onClick={() => setTorneo(false)}>Estándar absoluto o bono de equipo</Pill>
            </div>
            <svg viewBox="0 0 580 250" className="w-full h-full max-h-[270px] overflow-visible" role="img" aria-label={torneo ? 'Cinco vendedores aislados compitiendo por un premio' : 'Cinco vendedores compartiendo conocimiento'}>
              <SceneDefs id="cctn" isDark={isDark} />
              <Piso cx={290} cy={206} s={280} fill={t.floor} />
              {xs.map((x, k) => (
                <Lift key={x} on={torneo ? k === 0 : false} dimmed={torneo && k !== 0} lift={14}>
                  <Float amp={2} dur={2.6} delay={k * 0.25}>
                    <Persona id="cctn" cx={x} cy={196} s={0.95} body={k === 0 && torneo ? BRAND : PEACH} accessory={k === 0 ? 'star' : undefined} hair="#2b1a12" />
                  </Float>
                </Lift>
              ))}
              {torneo ? (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Float amp={4} dur={2}><Orb id="cctn" cx={70} cy={70} r={16} /></Float>
                  <text x={70} y={40} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={ORANGE}>Premio único</text>
                  <text x={330} y={110} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Cada uno guarda lo que sabe</text>
                </motion.g>
              ) : (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {xs.slice(0, -1).map((x, k) => (
                    <Traveler key={x} id="cctn" path={hop([x + 18, 120], [xs[k + 1] - 18, 120], 26)} dur={2} delay={k * 0.45} repeatDelay={0.6} r={4} />
                  ))}
                  <text x={290} y={60} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={ORANGE}>Conocimiento que circula</text>
                </motion.g>
              )}
              <text x={290} y={240} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{torneo ? 'Cooperar reduce tus propias chances' : 'Todos pueden llegar al estándar'}</text>
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="La lógica del torneo" destacada>
              Lazear mostró que, cuando la paga depende del desempeño relativo frente a los compañeros y no de un estándar absoluto, <strong>bajar el resultado del colega vale lo mismo que subir el propio</strong>.
            </Nota>
            <Nota isDark={isDark} label="Qué incentiva">
              Con ese esquema, negar ayuda, ocultar información o interferir con el trabajo de los pares se vuelve racional para quien compite por el único premio.
            </Nota>
            <Nota isDark={isDark} label="Qué cambia con un estándar absoluto">
              Si el premio depende de alcanzar un estándar y no de superar al compañero, ayudar a otros no perjudica a quien ayuda.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="teoria" detalle="Lazear · modelo de torneos" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* III.3 Incentivo de equipo o individual                              */
/* ------------------------------------------------------------------ */

const LECTURAS = [
  { k: 'Reparto por aporte', d: 'Las recompensas de equipo repartidas de forma equitativa, según la contribución de cada miembro, rinden más que las repartidas en partes iguales.' },
  { k: 'Tamaño y composición', d: 'El efecto de los incentivos de equipo depende del tamaño del equipo y de su composición, por ejemplo la proporción de mujeres y hombres.' },
  { k: 'Otra revisión coincide', d: 'Condly y colaboradores (2003) también encontraron que los incentivos dirigidos a equipos superan a los individuales. Dos metaanálisis independientes apuntan en la misma dirección.' },
];

export function EquipoIndividual({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="Incentivo de equipo" highlight="o individual" subtitle="Premiar al equipo mostró un efecto mayor que premiar a cada persona por separado, y cómo se reparte el premio importa.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="w-full max-h-[260px] flex-1 min-h-0">
              <BarrasIso id="cce2" isDark={isDark} max={0.55} W={400} hMax={140} decimals={2} items={[
                { name: 'Incentivo individual', value: 0.32, label: '0,32', tone: 'peach' },
                { name: 'Incentivo de equipo', value: 0.45, label: '0,45', hl: true },
              ]} caption="Tamaño de efecto promedio (g de Hedges)" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="146 estudios · 31.861 personas" />
            </div>
            <p data-aux="pie" className={`text-[11px] text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>116 estudios de incentivos individuales y 30 de equipo.</p>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
            <p data-g="lecturas" className={microLabel(isDark)}>Tres lecturas del metaanálisis</p>
            <div className="flex flex-wrap gap-1.5">
              {LECTURAS.map((c, k) => <Pill key={c.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{c.k}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{LECTURAS[i].k}</p>
                <p className={`text-sm leading-snug mt-0.5 ${textMuted(isDark)}`}>{LECTURAS[i].d}</p>
              </motion.div>
            </AnimatePresence>
            <Nota isDark={isDark} label="Qué es la g de Hedges">
              Una medida estandarizada del tamaño de un efecto: la diferencia entre trabajar con y sin incentivo, expresada en desviaciones estándar.
            </Nota>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Garbers y Konradt (2014), Journal of Occupational and Organizational Psychology 87(1), 102–137; Condly, Clark y Stolovitch (2003).</Fuente>
      </div>
    </Shell>
  );
}
