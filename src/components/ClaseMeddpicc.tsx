import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, AlertTriangle, XCircle, BookOpen, FlaskConical } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass } from './slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFrustum,
  IsoPyramid, IsoFloor, Orb, Float, Lift, Traveler, PulseDisc, hop,
} from './scene3d';

/**
 * Clase: "MEDDPICC: calificar con rigor".
 * Fuentes: Andy Whyte (MEDDICC), Darius Lahoutifard (Always Be Qualifying),
 * John McMahon (The Qualified Sales Leader) y, como complemento, Dixon y Adamson
 * (The Challenger Sale). Estilo 3D de scene3d.tsx; los encabezados (level 1,
 * "md-header-*") los dibuja App.tsx.
 */

type SlideProps = { isDark: boolean };

const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

/* Las ocho letras: fuente única para el mapa, la portada y las etapas. */
const LETTERS = [
  { k: 'M', name: 'Metrics', es: 'Métricas', q: '¿Cuánto vale, en números, resolver el problema?', alert: 'El beneficio se describe con adjetivos, no con cifras.' },
  { k: 'E', name: 'Economic Buyer', es: 'Comprador económico', q: '¿Quién puede decir "no" cuando todos dicen "sí" (y al revés)?', alert: 'Nadie te deja reunirte con quien controla el presupuesto.' },
  { k: 'D', name: 'Decision Criteria', es: 'Criterios de decisión', q: '¿Con qué lista van a comparar a los proveedores?', alert: 'Los criterios cambian a favor de la competencia.' },
  { k: 'D', name: 'Decision Process', es: 'Proceso de decisión', q: '¿Qué pasos, personas y fechas llevan a la elección?', alert: 'No sabes qué ocurre después de la demo.' },
  { k: 'P', name: 'Paper Process', es: 'Proceso documental', q: '¿Qué tiene que pasar para que exista una orden de compra?', alert: 'Quedan 4 semanas y el trámite legal tarda 6.' },
  { k: 'I', name: 'Identify / Implicate the Pain', es: 'Dolor', q: '¿Qué problema de negocio, por encima del ruido, obliga a actuar?', alert: 'El "dolor" es un deseo, no una necesidad.' },
  { k: 'C', name: 'Champion', es: 'Promotor interno', q: '¿Quién vende por ti dentro, con influencia y una ganancia personal?', alert: 'Tienes un amigo que informa, pero no actúa.' },
  { k: 'C', name: 'Competition', es: 'Competencia', q: '¿Contra quién o qué compites, incluido no hacer nada?', alert: 'Crees que no tienes competencia.' },
];

/* Cubo con una letra sobre su cara superior. */
function LetterCube({ cx, cy, s, h, letter, f, light = true }: { cx: number; cy: number; s: number; h: number; letter: string; f: typeof BRAND; light?: boolean }) {
  return (
    <g>
      <IsoBox cx={cx} cy={cy} s={s} h={h} f={f} />
      <text x={cx} y={cy + s * 0.18} textAnchor="middle" fontSize={s * 0.62} fontWeight={900} fill={light ? '#fff' : '#1f2937'}>{letter}</text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 720 200" className="w-full max-w-2xl mb-4 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="mdp" isDark={isDark} />
        {LETTERS.map((l, i) => {
          const x = 80 + i * 80;
          const cy = 110 - Math.sin((i / 7) * Math.PI) * 40;
          return (
            <motion.g key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, type: 'spring', stiffness: 90, damping: 13 }}>
              <Float amp={5} dur={3} delay={i * 0.2}>
                <g filter="url(#mdp-sh)"><LetterCube cx={x} cy={cy} s={30} h={34} letter={l.k} f={i % 2 ? PEACH : BRAND} /></g>
              </Float>
            </motion.g>
          );
        })}
        {LETTERS.slice(0, -1).map((_, i) => (
          <Traveler key={i} id="mdp" path={hop([80 + i * 80, 100 - Math.sin((i / 7) * Math.PI) * 40], [160 + i * 80, 100 - Math.sin(((i + 1) / 7) * Math.PI) * 40], 22)} dur={1} delay={i * 0.35} repeatDelay={2} r={4} />
        ))}
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold text-[#ff851d] z-10">Calificación de oportunidades</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        MEDDPICC: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">calificar con rigor</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Ocho preguntas para saber, en cada etapa, si una oportunidad merece tu tiempo… y qué te falta para ganarla.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-7 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. De ABC a ABQ: el caso Megan vs Aaron                             */
/* ------------------------------------------------------------------ */

function AbcAbq({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const reps = [
    { name: 'Aaron', tag: 'Always Be Closing', x: 120, committed: 1000, closed: 200 },
    { name: 'Megan', tag: 'Always Be Qualifying', x: 360, committed: 300, closed: 400 },
  ];
  const k = 0.13;
  const ground = 222;
  return (
    <Shell isDark={isDark} title="De «cerrar siempre» a" highlight="«calificar siempre»" subtitle="Dos vendedores con el mismo perfil y el mismo número de oportunidades. Uno calificaba; el otro, no (Lahoutifard).">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className={`lg:w-[48%] min-h-0 p-4 rounded-3xl ${panelClass(isDark)}`}>
            <svg viewBox="0 0 520 280" className="w-full h-full overflow-visible" aria-label="Comparación de lo comprometido y lo cerrado por Aaron y Megan">
              <SceneDefs id="abq" isDark={isDark} />
              {reps.map((r, ri) => (
                <g key={r.name}>
                  {[{ v: r.committed, f: ri === 0 ? NEUTRAL(isDark) : PEACH, label: 'Comprometido', dx: 0 }, { v: r.closed, f: BRAND, label: 'Cerrado', dx: 80 }].map((b, bi) => {
                    const h = b.v * k;
                    return (
                      <motion.g key={bi} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + ri * 0.3 + bi * 0.15, type: 'spring', stiffness: 80, damping: 13 }}>
                        <g filter="url(#abq-sh)"><IsoBox cx={r.x + b.dx} cy={ground - h} s={30} h={h} f={b.f} /></g>
                        <text x={r.x + b.dx} y={ground - h - 22} textAnchor="middle" fontSize={15} fontWeight={900} fill={bi === 1 ? ORANGE : t.text}>${b.v}k</text>
                        <text x={r.x + b.dx} y={ground + 34} textAnchor="middle" fontSize={11} fontWeight={700} fill={t.muted}>{b.label}</text>
                      </motion.g>
                    );
                  })}
                  <text x={r.x + 40} y={ground + 56} textAnchor="middle" fontSize={16} fontWeight={900} fill={t.text}>{r.name}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl border-l-4 border-gray-400 ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={microLabel(isDark)}>Aaron · mucha actividad, sin calificar</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Más llamadas, más demos, más horas. A mitad de trimestre comprometió <strong>$1M</strong>; cerró <strong>$200k</strong>. Sus tratos se cayeron por despidos, presupuestos reasignados y pruebas que se alargaban.</p>
            </div>
            <div className={`p-4 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a]' : 'bg-orange-50'}`}>
              <p className={microLabel(isDark)}>Megan · solo comprometía lo calificado</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Tenía las mismas diez oportunidades, pero solo tres pasaban sus criterios. Comprometió <strong>$300k</strong> y cerró <strong>$400k</strong>. No perdió tiempo en tratos que sabía que no cerrarían.</p>
            </div>
            <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Calificar es…</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>evaluar lo antes posible si el prospecto <strong>te comprará</strong>, si <strong>usará con éxito</strong> tu solución, <strong>en qué plazo</strong> y <strong>por qué monto</strong>.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Los vendedores exitosos pasan su tiempo con los prospectos que <strong>terminarán comprando</strong>. Esfuerzo + tiempo no es igual a éxito.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Origen: de MEDDIC a MEDDPICC(R)                                  */
/* ------------------------------------------------------------------ */

function Origen({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const steps = [
    { name: 'MEDDIC', n: 6, h: 50, f: NEUTRAL(isDark), text: 'PTC, 1996. Con alta rotación de vendedores, Dick Dunkel y Jack Napoli revisan cientos de oportunidades: cuando ganaban, dominaban seis áreas; cuando perdían, fallaba alguna de ellas.' },
    { name: 'MEDDICC', n: 7, h: 80, f: PEACH, text: 'Se agrega la segunda C: Competition. Para Lahoutifard ya estaba implícita en Metrics y Decision Criteria, pero nombrarla obliga a pensar en ella.' },
    { name: 'MEDDPICC', n: 8, h: 110, f: BRAND, text: 'Se agrega la P de Paper Process: el Champion suele conocer el proceso técnico y de negocio, pero no siempre el legal y de compras, donde los tratos se atrasan.' },
    { name: 'MEDDPICCR', n: 9, h: 140, f: BRAND, text: 'Whyte suma la R de Risks en su equipo. La lección: el acrónimo evoluciona; lo que importa es la disciplina de calificar, no la cantidad de letras.' },
  ];
  const [active, setActive] = useState(2);
  return (
    <Shell isDark={isDark} title="Un origen práctico:" highlight="nació en el terreno, no en un laboratorio" subtitle="PTC pasó de unos $300M a más de $1.000M en ingresos en cuatro años, y necesitaba que los nuevos vendedores rindieran rápido.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 320" className="w-full h-full overflow-visible" aria-label="Evolución del acrónimo de MEDDIC a MEDDPICCR">
              <SceneDefs id="ori" isDark={isDark} />
              {steps.map((s, i) => {
                const gx = 85 + i * 130;
                const gy = 270 - i * 22;
                const cy = gy - s.h;
                const on = i === active;
                return (
                  <motion.g key={s.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 90, damping: 14 }}>
                    <Lift on={on} dimmed={!on} onClick={() => setActive(i)} lift={8}>
                      <g filter="url(#ori-sh)"><IsoBox cx={gx} cy={cy} s={52} h={s.h} f={s.f} /></g>
                      <text x={gx} y={cy - 36} textAnchor="middle" fontSize={13} fontWeight={900} fill={on ? ORANGE : t.text}>{s.name}</text>
                      <text x={gx - 26} y={cy + 18 + s.h / 2} textAnchor="middle" fontSize={20} fontWeight={900} fill="#fff">{s.n}</text>
                    </Lift>
                  </motion.g>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col justify-center gap-3">
            <div className="flex gap-2 flex-wrap">{steps.map((s, i) => <Pill key={s.name} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{s.name}</Pill>)}</div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{steps[active].n} elementos</p>
                <h3 className={`text-2xl font-black mb-2 ${heading(isDark)}`}>{steps[active].name}</h3>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{steps[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>Dato para el pensamiento crítico</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Dunkel lo resume así: <em>"sin consultores, sin proyectos científicos"</em>. MEDDIC es experiencia de vendedores codificada, no un modelo validado por estudios.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Qué es y qué no es: el mapa y el GPS                             */
/* ------------------------------------------------------------------ */

function QueEs({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const stages = ['Descubrimiento', 'Alcance', 'Validación', 'Propuesta', 'Cierre'];
  const tiles: [number, number][] = stages.map((_, i) => [70 + i * 105, 200 - i * 20]);
  const route: [number, number][] = [...tiles.map(([x, y]) => [x, y - 34] as [number, number])];
  const traits = ['Checklist corto', 'Basado en acciones', 'Revela brechas', 'Autoevaluable', 'Lenguaje común del equipo'];
  return (
    <Shell isDark={isDark} title="Qué es y qué no es:" highlight="el mapa y el GPS" subtitle="MEDDPICC no es un proceso de venta ni una metodología de venta: es una metodología de calificación que se monta sobre la que ya uses.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 290" className="w-full h-full overflow-visible" aria-label="El proceso de venta como mapa y MEDDPICC como GPS que lo recorre">
              <SceneDefs id="qes" isDark={isDark} />
              {tiles.map(([x, y], i) => (
                <g key={i}>
                  <g filter="url(#qes-sh)"><IsoBox cx={x} cy={y} s={46} h={16} f={i === 2 ? PEACH : NEUTRAL(isDark)} /></g>
                  <text x={x} y={y + 64} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{stages[i]}</text>
                </g>
              ))}
              <motion.g initial={{ x: route[0][0], y: route[0][1] }} animate={{ x: route.map((p) => p[0]), y: route.map((p) => p[1]) }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <PulseDisc cx={0} cy={34} rx={40} ry={16} dur={1.6} />
                <Orb id="qes" cx={0} cy={0} r={14} />
                <text x={0} y={-24} textAnchor="middle" fontSize={11} fontWeight={900} fill={ORANGE}>MEDDPICC</text>
              </motion.g>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col justify-center gap-3">
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El proceso de venta = el mapa</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Dice qué pasos seguir, en orden, para llegar a la orden de compra.</p>
            </div>
            <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>MEDDPICC = el GPS (McMahon)</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Te dice <strong>dónde estás</strong>, qué sabes y qué no, y cuál es el siguiente paso para volver a la ruta. Sirve en cualquier etapa.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Batman y Robin (Whyte)</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Tu metodología de venta (SPIN, Challenger, Sandler…) lidera cómo hablas con el cliente; MEDDPICC es el compañero que mantiene todo bajo control. Se complementan.</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {traits.map((x) => <span key={x} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-100 text-gray-600'}`}><CheckCircle2 size={12} className="inline mr-1 text-[#ff851d]" />{x}</span>)}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. El mapa de las ocho letras                                       */
/* ------------------------------------------------------------------ */

function Mapa({ isDark }: SlideProps) {
  const [active, setActive] = useState(0);
  const l = LETTERS[active];
  const pos = (i: number): [number, number] => {
    const row = Math.floor(i / 4);
    const col = i % 4;
    return [95 + col * 95 + row * 48, 95 + row * 70 - col * 0];
  };
  return (
    <Shell isDark={isDark} title="Las ocho letras de" highlight="MEDDPICC" subtitle="Cada letra es una pregunta que debes poder responder con evidencia. Toca cada bloque.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 520 260" className="w-full h-full max-h-[380px] overflow-visible" aria-label="Ocho bloques, uno por letra de MEDDPICC">
            <SceneDefs id="map" isDark={isDark} />
            {LETTERS.map((x, i) => {
              const [cx, cy] = pos(i);
              const on = i === active;
              return (
                <Lift key={i} on={on} dimmed={false} onClick={() => setActive(i)} lift={14}>
                  <g filter="url(#map-sh)"><LetterCube cx={cx} cy={cy} s={40} h={36} letter={x.k} f={on ? BRAND : NEUTRAL(isDark)} light={on || isDark} /></g>
                </Lift>
              );
            })}
          </svg>
        </div>
        <div className="lg:w-[50%] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className={`p-6 rounded-3xl ${panelClass(isDark)}`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white text-3xl font-black flex items-center justify-center shadow-lg shadow-red-500/30">{l.k}</span>
                <div>
                  <h3 className={`text-2xl font-black leading-tight ${heading(isDark)}`}>{l.name}</h3>
                  <p className="text-sm font-bold text-[#ff851d]">{l.es}</p>
                </div>
              </div>
              <p className={`${microLabel(isDark)} mb-1`}>La pregunta que responde</p>
              <p className={`text-lg leading-snug font-medium mb-4 ${heading(isDark)}`}>{l.q}</p>
              <div className={`flex items-start gap-2 p-3 rounded-2xl ${isDark ? 'bg-[#ef375c]/10' : 'bg-rose-50'}`}>
                <AlertTriangle size={18} className="text-[#ef375c] shrink-0 mt-0.5" />
                <p className={`text-sm ${textMuted(isDark)}`}><strong>Señal de alerta:</strong> {l.alert}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Metrics y el período de recuperación                             */
/* ------------------------------------------------------------------ */

function Metrics({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const metric = [
    ['M', 'Medible', 'El resultado se puede medir.'],
    ['E', 'Lenguaje cotidiano', 'Se entiende sin ser financiero.'],
    ['T', 'Cuenta una historia', 'Explica cómo ayuda al negocio.'],
    ['R', 'Antes y después', 'Compara la situación previa con la nueva.'],
    ['I', 'Impacta la economía', 'Sube ingresos o baja costos.'],
    ['C', 'Avalada por el Champion', 'Alguien de dentro la respalda.'],
  ];
  return (
    <Shell isDark={isDark} title="Metrics: del adjetivo" highlight="al número" subtitle="Una métrica convierte una ganancia subjetiva en una medible. Y con ella, el precio deja de ser el centro de la conversación.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[42%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>Una buena métrica es M·E·T·R·I·C (Lahoutifard)</p>
          {metric.map(([k, n, d], i) => (
            <motion.div key={k} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className={`flex items-center gap-3 p-2.5 rounded-2xl ${panelClass(isDark)}`}>
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white font-black flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">{k}</span>
              <span className="min-w-0"><span className={`block text-sm font-bold ${heading(isDark)}`}>{n}</span><span className={`block text-xs ${textMuted(isDark)}`}>{d}</span></span>
            </motion.div>
          ))}
        </div>
        <div className="lg:w-[58%] flex flex-col gap-3 min-h-0">
          <div className={`flex-1 min-h-0 p-4 rounded-3xl ${panelClass(isDark)}`}>
            <svg viewBox="0 0 520 250" className="w-full h-full overflow-visible" aria-label="Costo de la solución frente al ahorro anual">
              <SceneDefs id="met" isDark={isDark} />
              <motion.g initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 13 }}>
                <g filter="url(#met-sh)"><IsoBox cx={140} cy={190 - 60} s={52} h={60} f={NEUTRAL(isDark)} /></g>
                <text x={140} y={100} textAnchor="middle" fontSize={16} fontWeight={900} fill={t.text}>$200k</text>
                <text x={140} y={246} textAnchor="middle" fontSize={12} fontWeight={700} fill={t.muted}>Costo de la solución</text>
              </motion.g>
              <motion.g initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, type: 'spring', stiffness: 80, damping: 13 }}>
                <g filter="url(#met-sh)"><IsoBox cx={380} cy={190 - 120} s={52} h={120} f={BRAND} /></g>
                <text x={380} y={40} textAnchor="middle" fontSize={16} fontWeight={900} fill={ORANGE}>$400k / año</text>
                <text x={380} y={246} textAnchor="middle" fontSize={12} fontWeight={700} fill={t.muted}>Ahorro anual (10 ingenieros, ciclo ÷ 2)</text>
              </motion.g>
              {[0, 1, 2].map((i) => <Traveler key={i} id="met" path={hop([330, 110], [190, 130], 50)} dur={1.6} delay={i * 0.55} r={6} />)}
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[['6 meses', 'para recuperar la inversión'], ['200%', 'de ROI anual'], ['≈ $1.100', 'perdidos por cada día de demora']].map(([v, l]) => (
              <div key={v} className={`p-3 rounded-2xl text-center ${featuredClass(isDark)}`}>
                <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{v}</p>
                <p className={`text-[11px] leading-tight ${textMuted(isDark)}`}>{l}</p>
              </div>
            ))}
          </div>
          <p className={`text-xs text-center ${textMuted(isDark)}`}>Hablar de <strong>meses de recuperación</strong> en vez de porcentajes de ROI lo entiende cualquiera: así se mueve la conversación del costo al valor.</p>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Economic Buyer: cada nivel escucha en su frecuencia              */
/* ------------------------------------------------------------------ */

function EconomicBuyer({ isDark }: SlideProps) {
  const levels = [
    { name: 'Comprador económico', ask: '¿POR QUÉ?', text: 'Por qué cambiar, por qué contigo y por qué ahora. Le hablas de ingresos, costos, riesgo y cuota de mercado.' },
    { name: 'Mandos medios', ask: '¿QUÉ?', text: 'Qué problema resuelve y con qué alcance. Le hablas de reducir costos y riesgos y de mejorar el desempeño del área.' },
    { name: 'Contribuyentes individuales', ask: '¿CÓMO?', text: 'Cómo funciona y cómo cambia su día a día. Le hablas de ahorrar tiempo y trabajar más rápido.' },
  ];
  const [active, setActive] = useState(0);
  const cx = 230;
  return (
    <Shell isDark={isDark} title="Economic Buyer:" highlight="quien tiene la última palabra" subtitle="No es quien tiene el título de «comprador»: es quien puede reasignar presupuesto y vetar la decisión de todos los demás.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 460 400" className="w-full h-full max-h-[360px] overflow-visible" aria-label="Pirámide de la organización: por qué, qué y cómo">
              <SceneDefs id="eb" isDark={isDark} />
              <g filter="url(#eb-sh)">
                <Lift on={active === 2} dimmed={active !== 2} onClick={() => setActive(2)} lift={6}><IsoFrustum cx={cx} y1={240} s1={140} y2={300} s2={186} f={NEUTRAL(isDark)} /></Lift>
                <Lift on={active === 1} dimmed={active !== 1} onClick={() => setActive(1)} lift={8}><IsoFrustum cx={cx} y1={150} s1={80} y2={225} s2={132} f={PEACH} /></Lift>
                <Lift on={active === 0} dimmed={active !== 0} onClick={() => setActive(0)} lift={12}><IsoPyramid cx={cx} apex={40} y={135} s={72} f={BRAND} /></Lift>
              </g>
            </svg>
          </div>
          <div className="lg:w-[60%] flex flex-col gap-3 justify-center">
            {levels.map((l, i) => (
              <motion.button key={l.name} whileHover={{ x: 4 }} onClick={() => setActive(i)} className={`text-left p-4 rounded-2xl transition-all ${i === active ? featuredClass(isDark) : 'opacity-60'}`}>
                <div className="flex items-baseline gap-3"><span className="text-lg font-black text-[#ff851d]">{l.ask}</span><h3 className={`text-base font-black ${heading(isDark)}`}>{l.name}</h3></div>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>{l.text}</p>
              </motion.button>
            ))}
            <div className={`p-3 rounded-2xl text-sm ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
              <strong>Ojo:</strong> Compras rara vez es el comprador económico; su trabajo es mejorar precio y condiciones. Si dos ejecutivos se disputan la decisión, pregúntate <em>quién ganaría la pelea interna</em>: suele ser quien sufre el dolor.
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Reúnete con el comprador económico <strong>antes</strong> de invertir en pruebas de concepto o demos largas, y sal de esa reunión con un «boleto de vuelta»: el acuerdo de volver a reunirse.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Decision Criteria: el triángulo de valor                         */
/* ------------------------------------------------------------------ */

function DecisionCriteria({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const zones = [
    { k: 'valor', name: 'Valor', x: 138, y: 142, action: 'Lo pide el cliente, lo tienes tú y no la competencia. Amplíalo, ponle métricas y que esté en cada demo y prueba.' },
    { k: 'peligro', name: 'Peligro', x: 262, y: 142, action: 'Lo pide el cliente y solo lo tiene la competencia. Investígalo y achícalo: ¿por qué es tan crucial si otros clientes viven sin él?' },
    { k: 'paridad', name: 'Paridad', x: 200, y: 180, action: 'Ambos lo cumplen. No gastes energía: solo confirma que no te califiquen peor ahí.' },
    { k: 'unicos', name: 'Únicos', x: 102, y: 236, action: 'Solo lo tienes tú, pero el cliente no lo pide (aún). Ayúdale a incluirlo en sus criterios mostrando resultados de otros clientes.' },
    { k: 'tendencias', name: 'Tendencias', x: 200, y: 246, action: 'Ambos lo ofrecen y el cliente no lo pide. No le dediques tiempo.' },
    { k: 'inutil', name: 'Inútil', x: 298, y: 236, action: 'Solo lo ofrece la competencia y nadie lo pide. Vigila que no lo conviertan en un criterio.' },
    { k: 'medida', name: 'A medida', x: 200, y: 64, action: 'Nadie lo cumple. Algunas empresas lo resuelven con desarrollo propio o con socios.' },
  ];
  const [active, setActive] = useState(0);
  const z = zones[active];
  return (
    <Shell isDark={isDark} title="Decision Criteria:" highlight="inclinar la cancha" subtitle="Los criterios son la «lista de compras» del cliente. Quien ayuda a escribirla, controla el trato (Lahoutifard, McMahon).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[400px] overflow-visible" aria-label="Diagrama del triángulo de valor: necesidades del cliente, nuestra solución y la competencia">
            <SceneDefs id="dc" isDark={isDark} />
            <g filter="url(#dc-sh)">
              <motion.circle cx={200} cy={115} r={98} fill={isDark ? '#6b7280' : '#94a3b8'} opacity={0.35} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 12 }} style={{ transformOrigin: '200px 115px' }} />
              <motion.circle cx={150} cy={200} r={98} fill={ORANGE} opacity={0.35} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 12 }} style={{ transformOrigin: '150px 200px' }} />
              <motion.circle cx={250} cy={200} r={98} fill={PINK} opacity={0.28} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 12 }} style={{ transformOrigin: '250px 200px' }} />
            </g>
            <text x={200} y={16} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Lo que pide el cliente</text>
            <text x={60} y={300} textAnchor="middle" fontSize={12} fontWeight={800} fill={ORANGE}>Tu solución</text>
            <text x={340} y={300} textAnchor="middle" fontSize={12} fontWeight={800} fill={PINK}>Competencia</text>
            {zones.map((zz, i) => {
              const on = i === active;
              const w = zz.name.length * 7.5 + 16;
              return (
                <motion.g key={zz.k} onClick={() => setActive(i)} style={{ cursor: 'pointer' }} animate={{ scale: on ? 1.12 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}>
                  <rect x={zz.x - w / 2} y={zz.y - 11} width={w} height={22} rx={11} fill={on ? 'url(#dc-brand)' : isDark ? '#1e1e1e' : '#ffffff'} opacity={on ? 1 : 0.92} />
                  <text x={zz.x} y={zz.y + 4} textAnchor="middle" fontSize={11} fontWeight={800} fill={on ? '#fff' : t.text}>{zz.name}</text>
                </motion.g>
              );
            })}
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <div className="flex flex-wrap gap-2">{zones.map((zz, i) => <Pill key={zz.k} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{zz.name}</Pill>)}</div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`p-5 rounded-3xl ${active < 2 ? featuredClass(isDark) : panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Zona</p>
              <h3 className={`text-2xl font-black mb-2 ${heading(isDark)}`}>{z.name}</h3>
              <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{z.action}</p>
            </motion.div>
          </AnimatePresence>
          <div className={`p-3 rounded-2xl text-sm ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
            <strong>Señal de control:</strong> si los criterios cambian a tu favor, ganas control; si cambian a favor de otro, la competencia tiene un Champion más fuerte que el tuyo.
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Decision Process y Paper Process                                 */
/* ------------------------------------------------------------------ */

function DecisionProcess({ isDark }: SlideProps) {
  const [after, setAfter] = useState(false);
  const seller = ['Demo', 'POC', 'Casos', 'Propuesta', 'Referencias', 'Ajustes'];
  const client = after ? ['Reunión con EB', 'Dolor detallado', 'Criterios por escrito'] : [];
  const paper = ['Compras', 'Legal', 'Finanzas', 'Firma', 'Orden de compra'];
  return (
    <Shell isDark={isDark} title="Decision y Paper Process:" highlight="el camino hasta la firma" subtitle="El proceso de decisión tiene dos partes: la validación (técnica y funcional) y la aprobación (financiera, legal y comercial).">
      <div className="h-full flex flex-col min-h-0 gap-4">
        <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
          <div className="flex items-center justify-between mb-3">
            <p className={microLabel(isDark)}>Plan de decisión con tareas en ambos lados</p>
            <div className="flex gap-2"><Pill isDark={isDark} on={!after} onClick={() => setAfter(false)}>Sin equilibrar</Pill><Pill isDark={isDark} on={after} onClick={() => setAfter(true)}>Equilibrado</Pill></div>
          </div>
          {[{ label: 'Cliente', items: client }, { label: 'Vendedor', items: seller.slice(0, after ? 4 : 6) }].map((lane, li) => (
            <div key={lane.label} className="flex items-center gap-3 mb-2">
              <span className={`w-20 shrink-0 text-xs font-black ${textMuted(isDark)}`}>{lane.label}</span>
              <motion.div className={`h-12 rounded-2xl flex items-center gap-1.5 px-2 overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`} animate={{ width: after ? '45%' : '100%' }} transition={{ type: 'spring', stiffness: 70, damping: 16 }}>
                <AnimatePresence>
                  {lane.items.map((it) => (
                    <motion.span key={it} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className={`text-[11px] font-bold whitespace-nowrap px-2.5 py-1.5 rounded-xl shadow-md ${li === 0 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-red-500/20' : isDark ? 'bg-[#333] text-gray-200' : 'bg-white text-gray-700'}`}>{it}</motion.span>
                  ))}
                </AnimatePresence>
              </motion.div>
              <span className="text-lg font-black text-[#ff851d] w-24 shrink-0">{after ? '90 días' : '270 días'}</span>
            </div>
          ))}
          <p className={`text-xs ${textMuted(isDark)}`}>Si solo trabaja el vendedor, el cliente no se compromete. Reparte tareas y acorta el ciclo (ejemplo de Lahoutifard: de 270 a 90 días).</p>
        </div>
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-2`}>Paper Process: pregunta «¿y después qué pasa?»</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {paper.map((p, i) => (
                <React.Fragment key={p}>
                  <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.25 }} className={`text-xs font-bold px-3 py-2 rounded-xl ${i === paper.length - 1 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30' : isDark ? 'bg-[#1e1e1e] text-gray-200' : 'bg-gray-100 text-gray-700'}`}>{p}</motion.span>
                  {i < paper.length - 1 && <ChevronRight size={14} className="text-[#ff851d]" />}
                </React.Fragment>
              ))}
            </div>
            <p className={`text-sm mt-3 ${textMuted(isDark)}`}>Repite la pregunta hasta tener cada paso, persona y plazo. Comparte tus contratos antes con Legal: si quedan 4 semanas y el trámite tarda 6, tu pronóstico ya falló.</p>
          </div>
          <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Compelling event: el «¿por qué ahora?» del comprador</p>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Una fecha límite que presiona al <strong>comprador económico</strong>: el fin del soporte del sistema actual, una nueva regulación o una promesa al directorio. <strong>Tu cierre de trimestre no es un compelling event</strong>: lo es para ti, no para el cliente. Si no existe, usa el costo de no actuar (las métricas).</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Identify / Implicate the Pain                                   */
/* ------------------------------------------------------------------ */

function Pain({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const noise = Array.from({ length: 16 }, (_, i) => ({ x: 60 + (i % 8) * 52 + (i >= 8 ? 26 : 0), y: 190 + (i >= 8 ? 26 : 0), h: 10 + ((i * 37) % 22) }));
  return (
    <Shell isDark={isDark} title="El dolor que importa está" highlight="por encima del ruido" subtitle="Sin un dolor, problema o iniciativa importante, ningún trato es prioridad. Y el dolor tiene dueño (McMahon).">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 520 280" className="w-full h-full overflow-visible" aria-label="Muchos problemas pequeños y uno grande que sobresale">
              <SceneDefs id="pai" isDark={isDark} />
              <IsoFloor cx={260} cy={205} s={230} fill={t.floor} />
              {noise.map((n, i) => (
                <motion.g key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 1.2 + (i % 5) * 0.3, repeat: Infinity, delay: i * 0.1 }}>
                  <g filter="url(#pai-sh)"><IsoBox cx={n.x} cy={n.y - n.h} s={14} h={n.h} f={NEUTRAL(isDark)} /></g>
                </motion.g>
              ))}
              <motion.g initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 70, damping: 12 }}>
                <g filter="url(#pai-sh)"><IsoBox cx={300} cy={60} s={24} h={150} f={BRAND} /></g>
                <PulseDisc cx={300} cy={60} rx={60} ry={24} dur={2.2} />
              </motion.g>
              <text x={300} y={22} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>Dolor de negocio + de capacidad</text>
              <text x={110} y={270} textAnchor="middle" fontSize={11} fontWeight={700} fill={t.muted}>El ruido: problemas pequeños</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Dos tipos de dolor (Lahoutifard)</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>De <strong>negocio</strong> (operar cuesta más de lo que rinde) y de <strong>capacidad</strong> (algo que no pueden ofrecer a sus clientes). El mejor dolor combina los dos.</p>
            </div>
            <div className={`p-4 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a]' : 'bg-orange-50'}`}>
              <p className={microLabel(isDark)}>¿Quién es dueño del dolor? (McMahon)</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Vendiendo software de diseño, el director de CAD no tenía dolor: cambiar de sistema solo le traía trabajo. El dueño era el VP de Ingeniería, medido por sacar productos más rápido y más barato.</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[['Consecuencia', '¿Qué pasa si no lo resuelven?'], ['Resultado', '¿Qué esperan lograr y cuánto?'], ['Urgencia', '¿Para cuándo y por qué?']].map(([a, b]) => (
                <div key={a} className={`p-3 rounded-2xl ${panelClass(isDark)}`}><p className="text-sm font-black text-[#ff851d]">{a}</p><p className={`text-xs ${textMuted(isDark)}`}>{b}</p></div>
              ))}
            </div>
          </div>
        </div>
        <Footer isDark={isDark}><strong>Cuida el lenguaje:</strong> no preguntes «¿cuál es su problema?», sino «¿qué le gusta de su sistema actual?». Tras contar lo bueno, casi siempre llega solo el «pero…».</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Champion vs Coach: el mapa de poder                             */
/* ------------------------------------------------------------------ */

function Champion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const quads = [
    { k: 'IA', name: 'Influencia + autoridad', role: 'Posible Champion de negocio', champ: true, x: 330, y: 110 },
    { k: 'INA', name: 'Influencia sin autoridad', role: 'Posible Champion técnico (experto)', champ: true, x: 200, y: 175 },
    { k: 'ANI', name: 'Autoridad sin influencia', role: 'Coach como máximo', champ: false, x: 460, y: 175 },
    { k: 'NINA', name: 'Ni influencia ni autoridad', role: 'Coach como máximo', champ: false, x: 330, y: 240 },
  ];
  const [active, setActive] = useState(0);
  const q = quads[active];
  const rows = [
    ['Influencia y acceso al comprador económico', true, false],
    ['Una ganancia personal si ganas tú', true, false],
    ['Vende por ti cuando no estás', true, false],
    ['Te da información útil', true, true],
  ];
  return (
    <Shell isDark={isDark} title="Champion vs Coach:" highlight="no confundas amistad con poder" subtitle="El error número uno: confundir a un coach con un Champion. El coach informa; el Champion actúa (McMahon).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center">
          <svg viewBox="0 120 660 220" className="w-full overflow-visible" aria-label="Mapa de poder: cuatro cuadrantes de influencia y autoridad">
            <SceneDefs id="chp" isDark={isDark} />
            {quads.map((qq, i) => {
              const on = i === active;
              return (
                <Lift key={qq.k} on={on} dimmed={false} onClick={() => setActive(i)} lift={10}>
                  <g filter="url(#chp-sh)"><IsoBox cx={qq.x} cy={qq.y + 40} s={64} h={14} f={on ? (qq.champ ? BRAND : SLATE(isDark)) : NEUTRAL(isDark)} /></g>
                  <Float amp={on ? 6 : 2} dur={2.4} delay={i * 0.3}><Orb id="chp" cx={qq.x} cy={qq.y + 14} r={16} neutral={!qq.champ} /></Float>
                  <text x={qq.x} y={qq.y + 92} textAnchor="middle" fontSize={15} fontWeight={900} fill={on ? ORANGE : t.text}>{qq.k}</text>
                </Lift>
              );
            })}
          </svg>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`mt-2 w-full p-3 rounded-2xl text-center ${q.champ ? featuredClass(isDark) : panelClass(isDark)}`}>
              <p className={`text-sm font-black ${heading(isDark)}`}>{q.name}</p>
              <p className="text-sm font-bold text-[#ff851d]">{q.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2 items-center">
              <span className={microLabel(isDark)}>Rasgo</span><span className={microLabel(isDark)}>Champion</span><span className={microLabel(isDark)}>Coach</span>
              {rows.map(([r, a, b]) => (
                <React.Fragment key={r as string}>
                  <span className={`text-sm ${textMuted(isDark)}`}>{r}</span>
                  {a ? <CheckCircle2 size={18} className="text-emerald-500 justify-self-center" /> : <XCircle size={18} className="text-gray-400 justify-self-center" />}
                  {b ? <CheckCircle2 size={18} className="text-emerald-500 justify-self-center" /> : <XCircle size={18} className="text-gray-400 justify-self-center" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={`p-4 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a]' : 'bg-orange-50'}`}>
            <p className={microLabel(isDark)}>Pruébalo (cuando ya te ganaste su confianza)</p>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Pídele que te consiga la reunión con el comprador económico, el organigrama o el contacto de Legal. O pregúntale directo: «si al final del trimestre necesito tu ayuda para empujar la firma, ¿me ayudarás?».</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Competition: ¿quién controla el trato?                          */
/* ------------------------------------------------------------------ */

function Competition({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const parties = [{ name: 'Cliente', x: 110 }, { name: 'Tú', x: 270 }, { name: 'Competencia', x: 430 }];
  const moments = [
    { label: 'Inicio', who: 0, text: 'Al principio controla el cliente: tú necesitas información de él para entender su dolor.' },
    { label: 'Tu Champion escribe contigo', who: 1, text: 'Cuando tu Champion necesita de ti el caso de negocio, las referencias y los criterios, la información fluye hacia el cliente y tomas el control.' },
    { label: 'Los criterios cambian', who: 2, text: 'Si los criterios incorporan los diferenciadores del otro y a ti te los «comunican», la competencia tiene un Champion más fuerte y controla el trato.' },
  ];
  const [m, setM] = useState(0);
  const who = moments[m].who;
  return (
    <Shell isDark={isDark} title="Competition:" highlight="¿quién controla el trato?" subtitle="La competencia no es solo otro proveedor: también el statu quo, no decidir o un proyecto interno que compite por el mismo dinero.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <svg viewBox="0 0 540 260" className="w-full h-full overflow-visible" aria-label="Tres plataformas: cliente, tú y competencia; la esfera indica quién controla">
              <SceneDefs id="cmp" isDark={isDark} />
              {parties.map((p, i) => (
                <g key={p.name}>
                  <g filter="url(#cmp-sh)"><IsoBox cx={p.x} cy={170} s={62} h={22} f={i === who ? (i === 2 ? SLATE(isDark) : BRAND) : NEUTRAL(isDark)} /></g>
                  <text x={p.x} y={250} textAnchor="middle" fontSize={14} fontWeight={900} fill={i === who ? ORANGE : t.muted}>{p.name}</text>
                </g>
              ))}
              <motion.g animate={{ x: parties[who].x }} transition={{ type: 'spring', stiffness: 70, damping: 12 }}>
                <motion.g animate={{ y: [0, -12, 0] }} transition={{ duration: 1.1, repeat: Infinity }}>
                  <Orb id="cmp" cx={0} cy={128} r={18} neutral={who === 2} />
                </motion.g>
                <text x={0} y={92} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.text}>CONTROL</text>
              </motion.g>
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col justify-center gap-3">
            <div className="flex flex-wrap gap-2">{moments.map((x, i) => <Pill key={x.label} isDark={isDark} on={i === m} onClick={() => setM(i)}>{x.label}</Pill>)}</div>
            <AnimatePresence mode="wait">
              <motion.div key={m} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${who === 1 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{moments[m].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Preguntas que debes poder responder</p>
              <ul className={`text-sm space-y-1 mt-1 ${textMuted(isDark)}`}>
                {['¿Quién es su Champion y es más fuerte que el tuyo?', '¿Entró antes que tú? ¿Ya habló con el comprador económico?', '¿Cambiaron los criterios desde que entró?'].map((x) => <li key={x} className="flex gap-2"><ChevronRight size={16} className="text-[#ff851d] shrink-0 mt-0.5" />{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 13. Los tres porqués                                                */
/* ------------------------------------------------------------------ */

function TresPorques({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const whys = [
    { q: '¿Por qué algo?', letters: 'I · el dolor', text: '¿Por qué el cliente compraría algo, lo que sea? Si no hay un dolor por encima del ruido, no hay trato.' },
    { q: '¿Por qué nosotros?', letters: 'M · DC · C', text: '¿Por qué nos elegiría a nosotros? Métricas, criterios con tus diferenciadores y una posición frente a la competencia.' },
    { q: '¿Por qué ahora?', letters: 'E · DP · compelling event', text: '¿Por qué no lo deja para el año que viene? La urgencia que siente el comprador económico.' },
  ];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="Tres preguntas que" highlight="resumen todo" subtitle="Simples, pero no fáciles. Si tú o tu Champion no pueden responderlas, todavía estás en descubrimiento (Lahoutifard, McMahon).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] min-h-0 flex items-center">
          <svg viewBox="0 0 520 300" className="w-full h-full overflow-visible" aria-label="Tres bloques ascendentes: por qué algo, por qué nosotros, por qué ahora">
            <SceneDefs id="why" isDark={isDark} />
            {whys.map((w, i) => {
              const gx = 110 + i * 150;
              const h = 60 + i * 50;
              const cy = 250 - i * 20 - h;
              const on = i === active;
              return (
                <Lift key={w.q} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                  <g filter="url(#why-sh)"><IsoBox cx={gx} cy={cy} s={60} h={h} f={on ? BRAND : PEACH} /></g>
                  <text x={gx} y={cy - 42} textAnchor="middle" fontSize={14} fontWeight={900} fill={on ? ORANGE : t.text}>{w.q}</text>
                </Lift>
              );
            })}
          </svg>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
          {whys.map((w, i) => (
            <motion.button key={w.q} whileHover={{ x: 4 }} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`text-left p-4 rounded-2xl transition-all ${i === active ? featuredClass(isDark) : panelClass(isDark)}`}>
              <div className="flex items-baseline justify-between gap-2"><h3 className={`text-lg font-black ${heading(isDark)}`}>{w.q}</h3><span className="text-xs font-black text-[#ff851d]">{w.letters}</span></div>
              <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>{w.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Qué inspeccionar en cada etapa                                  */
/* ------------------------------------------------------------------ */

function Etapas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const stages = [
    { name: 'Temprana', letters: ['M', 'I', 'C', 'E'], checks: ['¿Hay suficiente dolor que, cuantificado, justifique evaluar tu solución?', '¿Sabes quién es (o podría ser) tu Champion y quién es el comprador económico?'] },
    { name: 'Media', letters: ['M', 'I', 'D', 'D', 'C', 'E', 'C'], checks: ['¿Tienes métricas sólidas y consenso con el cliente?', '¿Conoces criterios y proceso de decisión completos?', '¿Probaste a tu Champion y te reuniste con el comprador económico?', '¿Sabes quién es tu competencia y cómo contrarrestarla?'] },
    { name: 'Final', letters: ['M', 'E', 'D', 'D', 'P'], checks: ['¿Las métricas tienen el visto bueno del comprador económico?', '¿Sabes cómo puntúas en los criterios?', '¿Sabes en qué punto exacto del proceso de decisión y del paper process estás?'] },
  ];
  const [active, setActive] = useState(0);
  const st = stages[active];
  return (
    <Shell isDark={isDark} title="Calificar no es un paso:" highlight="es en cada etapa" subtitle="BANT se revisa una vez; MEDDPICC te acompaña de principio a fin y te dice si vas adelante o atrás (Whyte).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] min-h-0 flex items-center">
          <svg viewBox="0 0 560 280" className="w-full h-full overflow-visible" aria-label="Tres plataformas: etapa temprana, media y final, con las letras a revisar">
            <SceneDefs id="eta" isDark={isDark} />
            {stages.map((s, i) => {
              const x = 100 + i * 180;
              const y = 200 - i * 30;
              const on = i === active;
              return (
                <Lift key={s.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                  <g filter="url(#eta-sh)"><IsoBox cx={x} cy={y} s={78} h={20} f={on ? BRAND : NEUTRAL(isDark)} /></g>
                  {s.letters.slice(0, 4).map((l, k) => (
                    <Float key={k} amp={on ? 4 : 1} dur={2.2} delay={k * 0.2}>
                      <g filter="url(#eta-sh)"><LetterCube cx={x - 36 + k * 24} cy={y - 18} s={11} h={12} letter={l} f={PEACH} /></g>
                    </Float>
                  ))}
                  <text x={x} y={y + 84} textAnchor="middle" fontSize={15} fontWeight={900} fill={on ? ORANGE : t.text}>{s.name}</text>
                </Lift>
              );
            })}
          </svg>
        </div>
        <div className="lg:w-[50%] flex flex-col justify-center gap-3">
          <div className="flex gap-2">{stages.map((s, i) => <Pill key={s.name} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{s.name}</Pill>)}</div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Letras clave · {Array.from(new Set(st.letters)).join(' · ')}</p>
              <ul className={`mt-2 space-y-2 text-sm md:text-base ${textMuted(isDark)}`}>
                {st.checks.map((c) => <li key={c} className="flex gap-2"><CheckCircle2 size={18} className="text-[#ff851d] shrink-0 mt-0.5" />{c}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>
          <p className={`text-xs ${textMuted(isDark)}`}>Si no puedes responder, no significa salirte: significa que esa es tu prioridad. Si no logras respuestas, entonces sí, califica fuera.</p>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Decir «no» y calificar fuera                                    */
/* ------------------------------------------------------------------ */

function DecirNo({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [out, setOut] = useState(false);
  const stack = [0, 1, 2, 3, 4];
  return (
    <Shell isDark={isDark} title="Decir «no» también" highlight="es vender" subtitle="Ante la duda, califica fuera. Nadie dice nunca «me arrepiento de haber salido de esa oportunidad» (Whyte).">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 360 280" className="w-full h-full max-h-[300px] overflow-visible" aria-label="Pila de esfuerzo invertido y una esfera que se libera">
              <SceneDefs id="dno" isDark={isDark} />
              {stack.map((i) => (
                <motion.g key={i} animate={{ opacity: out ? 0.35 : 1 }} filter="url(#dno-sh)">
                  <IsoBox cx={140} cy={210 - i * 30} s={60} h={26} f={NEUTRAL(isDark)} />
                </motion.g>
              ))}
              <text x={140} y={276} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Esfuerzo ya invertido</text>
              <motion.g animate={out ? { x: 120, y: 120 } : { x: 0, y: 0 }} transition={{ type: 'spring', stiffness: 50, damping: 10 }}>
                <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  <Orb id="dno" cx={140} cy={62} r={16} />
                </motion.g>
              </motion.g>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={!out} onClick={() => setOut(false)}>Seguir por inercia</Pill><Pill isDark={isDark} on={out} onClick={() => setOut(true)}>Calificar fuera</Pill></div>
          </div>
          <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
            {[
              ['La falacia del costo hundido', 'Seguir en un trato solo porque ya invertiste mucho. Es el mismo sesgo que estudió Kahneman: lo ya gastado no debe decidir lo que viene.'],
              ['Calificar fuera es ganar-ganar', 'Si el cliente acepta tu salida, liberas tiempo. Si te pide que te quedes, ganas la conversación profunda que te faltaba.'],
              ['Decir «no» en criterios y proceso', 'Cuestiona un criterio de la zona de peligro o una actividad inútil del proceso. Si la quitan, inclinas la cancha y acortas el ciclo.'],
              ['La retirada profesional', 'Un vendedor de McMahon envió una carta respetuosa retirándose de un comité. En dos horas lo llamaron para pedirle que siguiera: tenía Champions ocultos.'],
            ].map(([a, b], i) => (
              <motion.div key={a} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`p-4 rounded-3xl ${i === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-base font-black mb-1 ${heading(isDark)}`}>{a}</h3>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>Un «no» bien argumentado da credibilidad a todos tus «sí»: te aleja del vendedor desesperado y te acerca al asesor de confianza.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 16. MEDDPICC vs BANT                                                */
/* ------------------------------------------------------------------ */

function VsBant({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const tower = (letters: string[], x: number, f: typeof BRAND, id: number) =>
    letters.map((l, i) => (
      <motion.g key={`${id}-${i}`} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 120, damping: 12 }}>
        <g filter="url(#bnt-sh)"><LetterCube cx={x} cy={230 - i * 24} s={30} h={22} letter={l} f={f} /></g>
      </motion.g>
    ));
  return (
    <Shell isDark={isDark} title="MEDDPICC vs BANT:" highlight="la bicicleta y el cohete" subtitle="Los dos te llevan de un lugar a otro, pero el nivel de detalle es muy distinto (Whyte). Y no son enemigos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex items-center">
            <svg viewBox="0 0 360 290" className="w-full h-full overflow-visible" aria-label="Torre de cuatro bloques BANT frente a torre de ocho bloques MEDDPICC">
              <SceneDefs id="bnt" isDark={isDark} />
              {tower(['B', 'A', 'N', 'T'], 100, NEUTRAL(isDark), 0)}
              {tower(['M', 'E', 'D', 'D', 'P', 'I', 'C', 'C'], 250, BRAND, 1)}
              <text x={100} y={282} textAnchor="middle" fontSize={13} fontWeight={900} fill={t.muted}>BANT</text>
              <text x={250} y={282} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>MEDDPICC</text>
            </svg>
          </div>
          <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Cuándo sí sirve BANT</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>En una llamada entrante de venta simple y corta, y como primer filtro de los SDR (Sales Development Representatives, quienes abren las primeras conversaciones). McMahon lo usa para <strong>confirmar</strong> en la reunión con el comprador económico.</p>
            </div>
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Una vez vs. siempre</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>BANT se marca una vez y se olvida. MEDDPICC te dice, en cada etapa, si deberías estar en el trato y si vas adelante o atrás.</p>
            </div>
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>¿Presupuesto? (Lahoutifard)</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Con métricas claras, el comprador económico reasigna fondos para ahorrar o ganar más. Si el presupuesto ya existe, la decisión suele estar avanzada… y quizá a favor de otro.</p>
            </div>
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que BANT no ve</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Puedes marcar las cuatro letras y perder igual: la competencia escribió los criterios o tiene un Champion y tú no.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Ojo con el tono de las fuentes: Lahoutifard llega a decir que BANT debería estar «prohibido». Whyte y McMahon son más matizados: <strong>cada uno sirve en su capa</strong>.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 17. Pronóstico con evidencia                                        */
/* ------------------------------------------------------------------ */

function Forecast({ isDark }: SlideProps) {
  const bars = [
    { label: 'Cuota del trimestre', v: 300, c: 'bg-gray-400' },
    { label: 'Cerrado + comprometido', v: 200, c: 'bg-[#ffae73]' },
    { label: 'Brecha', v: 100, c: 'bg-[#ef375c]' },
    { label: 'Plan de reconciliación (4×)', v: 400, c: 'bg-gradient-to-r from-[#ff851d] to-[#ef375c]' },
  ];
  return (
    <Shell isDark={isDark} title="Pronosticar con" highlight="evidencia, no con optimismo" subtitle="Un pronóstico preciso un trimestre es un punto; tres seguidos son una tendencia (McMahon).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className={`lg:w-[52%] p-5 rounded-3xl flex flex-col justify-center gap-3 ${panelClass(isDark)}`}>
          <p className={microLabel(isDark)}>Reconciliación de un vendedor (en miles de dólares)</p>
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between text-sm mb-1"><span className={`font-bold ${textMuted(isDark)}`}>{b.label}</span><span className={`font-black ${heading(isDark)}`}>${b.v}k</span></div>
              <div className={`h-4 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
                <motion.div className={`h-full rounded-full ${b.c} ${i === 3 ? 'shadow-[0_0_15px_rgba(255,133,29,0.5)]' : ''}`} initial={{ width: 0 }} animate={{ width: `${(b.v / 400) * 100}%` }} transition={{ delay: 0.3 + i * 0.25, duration: 0.8, ease: 'easeOut' }} />
              </div>
            </div>
          ))}
          <p className={`text-xs ${textMuted(isDark)}`}>Con una probabilidad de cierre del 25%, cubrir $100k de brecha exige un plan de $400k. Por eso es más fácil construir pipeline antes que buscarlo dentro del trimestre.</p>
        </div>
        <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
          {[
            ['Saca del pronóstico lo que no tiene evidencia', 'Si el vendedor no puede explicar el estado exacto del trato, se retira. La carga de la prueba es suya, y hacerlo temprano deja tiempo para reemplazarlo.'],
            ['«Llévame a tu Champion»', 'En el primer mes del trimestre, el gerente visita al Champion de cada trato comprometido para confirmar que existe y que hay control.'],
            ['Un pipeline enorme esconde problemas', 'Puede tapar fallas de venta y de calificación; el pipeline es oxígeno, pero no reemplaza el criterio.'],
          ].map(([a, b], i) => (
            <motion.div key={a} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className={`p-4 rounded-2xl ${i === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
              <h3 className={`text-base font-black mb-1 ${heading(isDark)}`}>{a}</h3>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 18. Pensamiento crítico: ¿qué respaldo tienen estas fuentes?        */
/* ------------------------------------------------------------------ */

function Critico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Pensamiento crítico:" highlight="¿qué respaldo tienen estas fuentes?" subtitle="Aplica a MEDDPICC el mismo filtro de «La Ciencia de Vender»: útil no es lo mismo que demostrado.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-3xl flex flex-col ${panelClass(isDark)}`}>
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white flex items-center justify-center shadow-lg shadow-red-500/30 mb-3"><BookOpen size={20} /></span>
            <p className={microLabel(isDark)}>Lo que sí tienen</p>
            <h3 className={`text-lg font-black mb-2 ${heading(isDark)}`}>Experiencia de practicantes</h3>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Décadas de uso en ventas complejas de tecnología, casos propios (Whyte: ticket promedio duplicado y ciclo 30% más corto en su equipo de Branch) y una lógica coherente con lo que la academia validó sobre orientación al cliente y venta basada en el valor.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`p-5 rounded-3xl flex flex-col ${isDark ? 'bg-[#ef375c]/10' : 'bg-rose-50'}`}>
            <span className="w-11 h-11 rounded-2xl bg-[#ef375c] text-white flex items-center justify-center shadow-lg mb-3"><FlaskConical size={20} /></span>
            <p className={microLabel(isDark)}>Lo que no tienen</p>
            <h3 className={`text-lg font-black mb-2 ${heading(isDark)}`}>Estudios revisados por pares</h3>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Los casos los cuentan sus propios protagonistas, sin grupos de comparación. Y los autores venden formación sobre el método (MEDDIC Academy, MEDDICC.com). No lo invalida, pero obliga a leer con cuidado.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`p-5 rounded-3xl flex flex-col ${featuredClass(isDark)}`}>
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700 text-white flex items-center justify-center shadow-lg mb-3"><AlertTriangle size={20} /></span>
            <p className={microLabel(isDark)}>El complemento recomendado</p>
            <h3 className={`text-lg font-black mb-2 ${heading(isDark)}`}>The Challenger Sale</h3>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Se suele recomendar para «implicar el dolor»: enseñar algo nuevo, adaptar el mensaje y tomar el control. Su estudio (CEB, más de 6.000 vendedores) dice que ~40% de los mejores eran «Challengers» y solo 7% «constructores de relaciones». Es investigación de una consultora y la academia la cuestionó: úsalo con criterio.</p>
          </motion.div>
        </div>
        <Footer isDark={isDark}>Antes de adoptar cualquier metodología, pregúntate: <strong>¿hay evidencia? ¿quién la revisó? ¿encaja en mi contexto? ¿quién gana si me la creo?</strong></Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 19. Cierre                                                          */
/* ------------------------------------------------------------------ */

function Cierre({ isDark }: SlideProps) {
  const chips = ['Califica en cada etapa', 'Métricas, no adjetivos', 'Conoce al comprador económico', 'Escribe los criterios con tu Champion', 'Mapea hasta la firma', 'Ante la duda, califica fuera'];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 720 150" className="w-full max-w-xl mb-3 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="mdc" isDark={isDark} />
        {LETTERS.map((l, i) => (
          <motion.g key={i} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i, type: 'spring', stiffness: 110, damping: 12 }}>
            <Float amp={4} dur={2.6} delay={i * 0.15}>
              <g filter="url(#mdc-sh)"><LetterCube cx={80 + i * 80} cy={70} s={28} h={30} letter={l.k} f={BRAND} /></g>
            </Float>
          </motion.g>
        ))}
      </svg>
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold text-[#ff851d] z-10">Síntesis</p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter z-10 max-w-4xl ${heading(isDark)}`}>
        Siempre calificando: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">tu tiempo es tu recurso más valioso</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-3xl mb-6 z-10">
        {chips.map((c) => (
          <span key={c} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300 shadow-lg shadow-black/40' : 'bg-white text-gray-700 shadow-md shadow-gray-200'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`max-w-3xl text-base md:text-xl font-medium leading-relaxed z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        MEDDPICC no te enseña a hablar con el cliente: te enseña a <strong>saber dónde estás</strong>, qué te falta y cuándo vale la pena seguir.
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseMeddpicc({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'md-slide-0': return <Portada isDark={isDark} />;
    case 'md-abc-abq': return <AbcAbq isDark={isDark} />;
    case 'md-origen': return <Origen isDark={isDark} />;
    case 'md-que-es': return <QueEs isDark={isDark} />;
    case 'md-mapa': return <Mapa isDark={isDark} />;
    case 'md-metrics': return <Metrics isDark={isDark} />;
    case 'md-eb': return <EconomicBuyer isDark={isDark} />;
    case 'md-dc': return <DecisionCriteria isDark={isDark} />;
    case 'md-dp': return <DecisionProcess isDark={isDark} />;
    case 'md-pain': return <Pain isDark={isDark} />;
    case 'md-champion': return <Champion isDark={isDark} />;
    case 'md-competition': return <Competition isDark={isDark} />;
    case 'md-porques': return <TresPorques isDark={isDark} />;
    case 'md-etapas': return <Etapas isDark={isDark} />;
    case 'md-decir-no': return <DecirNo isDark={isDark} />;
    case 'md-bant': return <VsBant isDark={isDark} />;
    case 'md-forecast': return <Forecast isDark={isDark} />;
    case 'md-critico': return <Critico isDark={isDark} />;
    case 'md-cierre': return <Cierre isDark={isDark} />;
    default: return null;
  }
}
