import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Float, Lift, Traveler, PulseDisc, hop, Persona } from '../scene3d';
import { Cifra, Nota, Fuente, Opcion, Piso, Paso, Verificado, Sello } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* V.1 Metas específicas con tablero                                   */
/* ------------------------------------------------------------------ */

const NIVELES_META = [
  { k: 'Meta vaga', d: '«Haz tu mejor esfuerzo». Cualquier nivel moderado de esfuerzo parece suficiente, porque no hay un estándar que cumplir.' },
  { k: 'Meta específica', d: 'Una cifra concreta de facturación o unidades, desafiante pero alcanzable. Elimina la ambigüedad sobre qué significa tener éxito.' },
  { k: 'Meta + tablero', d: 'La misma meta con un tablero visible de avance diario. El vendedor ve la discrepancia y ajusta su estrategia, sobre todo en tareas complejas.' },
];

export function Metas({ isDark }: SlideProps) {
  const [i, setI] = useState(2);
  const t = sceneTone(isDark);
  const pasos = [0, 1, 2, 3, 4, 5];
  const x = (k: number) => 70 + k * 92;
  return (
    <Shell isDark={isDark} title="Metas específicas" highlight="con un tablero visible" subtitle="Una cifra concreta rinde más que la exhortación genérica. Y rinde aún más cuando el avance se ve todos los días.">
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
              <text x={300} y={232} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{i === 0 ? 'Sin estándar: no se sabe cuánto es suficiente' : i === 1 ? 'Un destino claro' : 'Destino claro y avance visible'}</text>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{NIVELES_META[i].k}</p>
                <p className={`text-sm leading-snug mt-0.5 ${textMuted(isDark)}`}>{NIVELES_META[i].d}</p>
              </motion.div>
            </AnimatePresence>
            <Nota isDark={isDark} label="Aspiración, no castigo">
              Formular la meta como un máximo a lograr, y no como un mínimo bajo amenaza, activa un enfoque de promoción: más exploración y creatividad comercial, menos conformidad defensiva.
            </Nota>
            <Nota isDark={isDark} label="Participar en la cuota, con condición">
              Opinar sobre la propia meta solo ayuda si aumenta la comprensión del plan y el compromiso. Sin dirección técnica, lo normal es negociar metas más bajas.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Locke y Latham · 35 años · Neubert 1998" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              Los tamaños de efecto no se leen en el PDF y no los pude confirmar, así que no los muestro. La dirección es de lo más replicado en psicología organizacional; la cifra exacta, no.
            </Verificado>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Locke y Latham (1990; 2002, American Psychologist 57(9)); Neubert (1998), Human Performance 11(4); Janssen et al. (2024), citados en el informe.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* V.2 Ambigüedad de rol y autoeficacia                                */
/* ------------------------------------------------------------------ */

export function Rol({ isDark }: SlideProps) {
  const [claro, setClaro] = useState(true);
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Antes de pagar más," highlight="aclara el rol" subtitle="Ningún esquema financiero compensa que el vendedor no sepa qué actividades llevan al cumplimiento. Y la confianza en sí mismo pesa más que los años de antigüedad.">
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
              <div className={`p-3.5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Autoeficacia</p>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>La convicción de poder superar objeciones y cerrar predice más el rendimiento que la antigüedad o la edad.</p>
              </div>
            </div>
            <Nota isDark={isDark} label="Qué hace la ambigüedad" destacada>
              El vendedor gasta recursos cognitivos en reconciliar demandas contradictorias y buscar aclaraciones, y eso <strong>neutraliza el estímulo del bono</strong>. Un liderazgo con recompensa contingente clara reduce esa incertidumbre.
            </Nota>
            <Nota isDark={isDark} label="Quién rinde en cuentas difíciles">
              Alguien con diez años de oficio pero baja autoeficacia ante un canal nuevo evita las cuentas complejas. Quien confía en su método elige metas más ambiciosas y resiste mejor el rechazo.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Churchill y cols. 1985 · Verbeke y cols. 2011 · Stajkovic y Luthans 1998" />
            </div>
            <Verificado isDark={isDark} tipo="corregido">
              El −0,25 es un coeficiente de un modelo multivariado, no una correlación simple (algunas fuentes lo llaman r). Las demás correlaciones del informe no se leen en el PDF y no las verifiqué.
            </Verificado>
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
  { k: 'Describir la conducta', d: 'Los puntos de aprendizaje se presentan como reglas que explican por qué funciona lo que se hace, no como un guion que repetir.' },
  { k: 'Modelar', d: 'Demostraciones en vivo con modelos mixtos: se ve el cierre impecable y también el error que arruina una negociación.' },
  { k: 'Practicar', d: 'Juego de roles estructurado, con escenarios generados por los propios participantes: las objeciones y clientes reales de su cartera.' },
  { k: 'Recibir retroalimentación', d: 'Corrección inmediata y específica sobre lo que acaba de hacer.' },
  { k: 'Transferir al puesto', d: 'Cada persona fija metas de aplicación: qué hará distinto esta semana con un cliente concreto.' },
];

export function ModeladoConductual({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Entrenar con modelado conductual:" highlight="ver, practicar, corregir" subtitle="La instrucción pasiva con manuales y conferencias transmite conocimiento. Para cambiar lo que el vendedor hace, hay que hacerle ensayar.">
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
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="metaanalisis" detalle="Taylor, Russ-Eft y Chan · 2005" />
            </div>
            <Verificado isDark={isDark} tipo="corregido">
              Verificado: efectos grandes en conocimiento y habilidades, modestos en actitudes y conducta en el puesto. El informe dice «117 estudios» y «2 a 3 veces más retención», y no pude confirmar ninguna de las dos cifras.
            </Verificado>
            <p className={`text-[11px] leading-snug ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Con entrenadores basados en IA, los vendedores pueden rechazar el feedback de un algoritmo si lo sienten como amenaza: el acompañamiento del gerente sigue siendo clave (Habel, Alavi y Heinitz).</p>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Taylor, Russ-Eft y Chan (2005), Journal of Applied Psychology 90(4), 692–709.</Fuente>
      </div>
    </Shell>
  );
}
