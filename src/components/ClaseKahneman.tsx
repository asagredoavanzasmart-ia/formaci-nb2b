import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, XCircle, AlertTriangle, Eye, Zap, Brain } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass, Quiz } from './slideKit';
import type { QuizQ } from './slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor,
  Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from './scene3d';
import type { Faces } from './scene3d';

/**
 * Clase: "Pensar rápido, pensar despacio" (Daniel Kahneman).
 *
 * Fuentes del usuario: briefing, guía de estudio y compendio pedagógico.
 * Añadido con verificación propia: el estado de la evidencia tras la crisis de
 * replicación (kn-replicacion), coherente con el hilo crítico del curso.
 * Estilo 3D de scene3d.tsx; los encabezados (level 1) los dibuja App.tsx.
 */

type SlideProps = { isDark: boolean };

const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

/* Sello que marca el estado de la evidencia de un estudio citado. */
function Sello({ isDark, tipo }: { isDark: boolean; tipo: 'solido' | 'disputa' }) {
  const ok = tipo === 'solido';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${
      ok ? (isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700')
         : (isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700')}`}>
      {ok ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
      {ok ? 'Evidencia sólida' : 'Evidencia en disputa'}
    </span>
  );
}

/* Barra horizontal animada. */
function Bar({ isDark, label, value, max, suffix = '', brand = true, delay = 0 }: { isDark: boolean; label: string; value: number; max: number; suffix?: string; brand?: boolean; delay?: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span className={`font-bold ${textMuted(isDark)}`}>{label}</span><span className={`font-black ${heading(isDark)}`}>{value}{suffix}</span></div>
      <div className={`h-3.5 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
        <motion.div className={`h-full rounded-full ${brand ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-[0_0_15px_rgba(255,133,29,0.5)]' : 'bg-gray-400'}`} initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }} transition={{ delay, duration: 0.9, ease: 'easeOut' }} />
      </div>
    </div>
  );
}

/* Los dos agentes de la mente, como figuras 3D. */
const S1_BODY = BRAND;
const S2_BODY = (isDark: boolean): Faces => SLATE(isDark);

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 560 210" className="w-full max-w-lg mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="knp" isDark={isDark} />
        <IsoFloor cx={280} cy={150} s={250} fill={t.floor} />
        <motion.g initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 13 }}>
          <Float amp={6} dur={2.2}><Persona id="knp" cx={190} cy={150} s={1.25} body={S1_BODY} accessory="heart" hair="#2b1a12" /></Float>
          <text x={190} y={196} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>Sistema 1 · rápido</text>
        </motion.g>
        <motion.g initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 13 }}>
          <Float amp={2.5} dur={4.4}><Persona id="knp" cx={370} cy={150} s={1.25} body={S2_BODY(isDark)} accessory="gear" hair="#4a4a4a" /></Float>
          <text x={370} y={196} textAnchor="middle" fontSize={13} fontWeight={900} fill={t.muted}>Sistema 2 · lento</text>
        </motion.g>
        <Traveler id="knp" path={hop([205, 110], [355, 110], 34)} dur={1.3} repeatDelay={0.9} r={5} />
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Daniel Kahneman · Nobel de Economía 2002</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Pensar rápido, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">pensar despacio</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Tu mente comete errores <strong>predecibles</strong>. No por falta de inteligencia, sino por cómo está construida.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Origen de la investigación                                       */
/* ------------------------------------------------------------------ */

function Origen({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const hitos = [
    { year: '1969', title: 'Empieza la colaboración', text: 'Kahneman invita a Amos Tversky a su seminario en la Universidad Hebrea de Jerusalén. Trabajarían juntos durante décadas.' },
    { year: '1974', title: 'Artículo en Science', text: '"Judgment Under Uncertainty: Heuristics and Biases" documenta unos 20 sesgos derivados de atajos intuitivos.' },
    { year: '1979', title: 'Teoría de las perspectivas', text: 'El modelo de decisión bajo riesgo que fundó la economía conductual.' },
    { year: '2002', title: 'Premio Nobel de Economía', text: 'Tversky lo habría compartido, pero había fallecido en 1996 y el Nobel no se concede póstumamente.' },
  ];
  const [active, setActive] = useState(1);
  return (
    <Shell isDark={isDark} title="Una colaboración que cambió" highlight="la idea de racionalidad" subtitle="En los años setenta las ciencias sociales asumían que el humano es racional y que sus desvíos los causan las emociones. Kahneman y Tversky mostraron otra cosa.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 250" className="w-full h-full overflow-visible" aria-label="Cuatro hitos: 1969, 1974, 1979 y 2002">
              <SceneDefs id="ori" isDark={isDark} />
              {hitos.map((h, i) => {
                const x = 85 + i * 130;
                const alt = 34 + i * 30;
                const cy = 180 - alt;
                const on = i === active;
                return (
                  <Lift key={h.year} on={on} dimmed={false} onClick={() => setActive(i)} lift={12}>
                    {on && <PulseDisc cx={x} cy={cy + alt + 22} rx={54} ry={16} dur={2.3} peak={0.3} />}
                    <Float amp={on ? 6 : 2} dur={on ? 2.4 : 4} delay={i * 0.3}>
                      <g filter="url(#ori-sh)"><IsoBox cx={x} cy={cy} s={44} h={alt} f={on ? BRAND : i === 3 ? PEACH : NEUTRAL(isDark)} /></g>
                      <text x={x} y={cy + 6} textAnchor="middle" fontSize={15} fontWeight={900} fill={on || i === 3 ? '#fff' : isDark ? '#fff' : '#374151'}>{h.year}</text>
                    </Float>
                  </Lift>
                );
              })}
              {hitos.slice(0, -1).map((_, i) => (
                <Traveler key={i} id="ori" path={hop([85 + i * 130, 180 - (34 + i * 30) - 26], [215 + i * 130, 180 - (34 + (i + 1) * 30) - 26], 24)} dur={1.3} delay={i * 0.4} repeatDelay={1.3} r={5} />
              ))}
              <text x={280} y={238} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>De un seminario en Jerusalén al Nobel</text>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{hitos[active].year}</p>
                <h3 className={`text-xl font-black mb-1 ${heading(isDark)}`}>{hitos[active].title}</h3>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{hitos[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El giro conceptual</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>No es que las emociones nos desvíen de la razón. Es que <strong>la propia maquinaria cognitiva comete errores sistemáticos</strong>: predecibles, repetibles y propios de su diseño.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>El objetivo declarado del libro es modesto y práctico: <strong>enriquecer tu vocabulario</strong> para nombrar errores de juicio, en otros y en ti.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Los dos sistemas                                                 */
/* ------------------------------------------------------------------ */

function DosSistemas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const filas = [
    { dim: 'Velocidad', s1: 'Instantáneo y automático.', s2: 'Lento y deliberado, paso a paso.' },
    { dim: 'Esfuerzo', s1: 'Mínimo o nulo: no consume atención consciente.', s2: 'Alto: requiere un presupuesto de atención.' },
    { dim: 'Mecanismo', s1: 'Redes asociativas, causalidad e intuición.', s2: 'Razonamiento lógico, reglas y cálculo.' },
    { dim: 'Función', s1: 'Mantener el modelo del mundo y responder rápido.', s2: 'Supervisar, autocontrolarse y decidir lo complejo.' },
    { dim: 'Energía', s1: 'Constante; no se fatiga.', s2: 'Variable: consume glucosa y se cansa.' },
    { dim: 'Ante la duda', s1: 'La suprime y salta a una conclusión.', s2: 'Sostiene la incertidumbre.' },
    { dim: 'Datos', s1: 'Promedios y prototipos; ignora sumas y tasas base.', s2: 'Cantidades, sumas y estadística.' },
    { dim: 'Debilidad', s1: 'Sesgos, priming y efectos marco.', s2: 'Pereza, distracción y fatiga.' },
  ];
  const [active, setActive] = useState(0);
  const f = filas[active];
  return (
    <Shell isDark={isDark} title="Dos personajes" highlight="en una misma mente" subtitle="Kahneman los presenta como dos agentes de ficción. No son zonas del cerebro: son una forma útil de nombrar dos modos de operar. Recorre cada dimensión.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex items-center">
            <svg viewBox="0 0 400 260" className="w-full h-full overflow-visible" aria-label="Sistema 1 y Sistema 2 como dos figuras">
              <SceneDefs id="dos" isDark={isDark} />
              <IsoFloor cx={200} cy={200} s={190} fill={t.floor} />
              <g>
                <PulseDisc cx={120} cy={200} rx={48} ry={15} dur={1.3} peak={0.3} />
                <Float amp={7} dur={1.9}><Persona id="dos" cx={120} cy={198} s={1.3} body={S1_BODY} accessory="heart" hair="#2b1a12" /></Float>
                <text x={120} y={238} textAnchor="middle" fontSize={14} fontWeight={900} fill={ORANGE}>Sistema 1</text>
                <text x={120} y={254} textAnchor="middle" fontSize={11} fill={t.muted}>rápido</text>
              </g>
              <g>
                <Float amp={2} dur={5}><Persona id="dos" cx={280} cy={198} s={1.3} body={S2_BODY(isDark)} accessory="gear" hair="#4a4a4a" /></Float>
                <text x={280} y={238} textAnchor="middle" fontSize={14} fontWeight={900} fill={t.text}>Sistema 2</text>
                <text x={280} y={254} textAnchor="middle" fontSize={11} fill={t.muted}>lento</text>
              </g>
            </svg>
          </div>
          <div className="lg:w-[60%] flex flex-col gap-2.5 justify-center">
            <div className="flex flex-wrap gap-1.5">
              {filas.map((x, i) => <Pill key={x.dim} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{x.dim}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Sistema 1 · {f.dim}</p>
                  <p className={`text-sm md:text-base leading-snug ${heading(isDark)}`}>{f.s1}</p>
                </div>
                <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Sistema 2 · {f.dim}</p>
                  <p className={`text-sm md:text-base leading-snug ${heading(isDark)}`}>{f.s2}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>La ilusión central:</strong> tú te identificas con el Sistema 2, el que habla, razona y cree decidir. Pero el protagonista de casi todos tus juicios cotidianos es el Sistema 1.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Cómo interactúan (y por qué el 1 no se apaga)                    */
/* ------------------------------------------------------------------ */

function Interaccion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pasos = [
    { n: 'Sugerencia', text: 'El Sistema 1 produce sin parar impresiones, intuiciones e intenciones, y se las ofrece al Sistema 2.' },
    { n: 'Anomalía', text: 'Algo no encaja con el modelo de normalidad, o una instrucción consciente choca con el automatismo (como en el test de Stroop).' },
    { n: 'Movilización', text: 'Se activa la tensión cognitiva: el Sistema 2 sale de su reposo y redirige el presupuesto de atención.' },
    { n: 'Control', text: 'El Sistema 2 reprime el impulso y aplica una regla… o sucumbe por sobrecarga o pereza.' },
  ];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="El Sistema 1 no tiene" highlight="interruptor" subtitle="Ambos están siempre encendidos. Lo que cambia es cuánta atención entrega el Sistema 2, y su presupuesto es estrictamente limitado.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 520 290" className="w-full h-full overflow-visible" aria-label="Cuatro pasos de la interacción entre sistemas">
              <SceneDefs id="int" isDark={isDark} />
              {pasos.map((p, i) => {
                const x = 80 + i * 120;
                const on = i === active;
                return (
                  <Lift key={p.n} on={on} dimmed={!on} onClick={() => setActive(i)} lift={11}>
                    {on && <PulseDisc cx={x} cy={178 + i * 14} rx={52} ry={16} dur={2.2} peak={0.3} />}
                    <Float amp={on ? 6 : 2} dur={on ? 2.3 : 4} delay={i * 0.25}>
                      <g filter="url(#int-sh)"><IsoBox cx={x} cy={150} s={44} h={30 + i * 14} f={on ? BRAND : i < 2 ? PEACH : NEUTRAL(isDark)} /></g>
                      <text x={x} y={156} textAnchor="middle" fontSize={16} fontWeight={900} fill="#fff">{i + 1}</text>
                    </Float>
                    <text x={x} y={276} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={on ? ORANGE : t.muted}>{p.n}</text>
                  </Lift>
                );
              })}
              {pasos.slice(0, -1).map((_, i) => <Traveler key={i} id="int" path={hop([80 + i * 120, 130], [200 + i * 120, 130], 26)} dur={1.2} delay={i * 0.4} repeatDelay={1.4} r={4.5} />)}
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Paso {active + 1} · {pasos[active].n}</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{pasos[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                <div className="flex items-center gap-2 mb-1"><Eye size={16} className="text-[#ff851d]" /><p className={`text-sm font-black ${heading(isDark)}`}>El gorila invisible</p></div>
                <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Contando pases de baloncesto, <strong>la mitad</strong> de los espectadores no ve a una persona disfrazada de gorila que cruza la cancha durante 9 segundos. La atención concentrada ciega. <span className="inline-block mt-1"><Sello isDark={isDark} tipo="solido" /></span></p>
              </div>
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                <div className="flex items-center gap-2 mb-1"><Zap size={16} className="text-[#ff851d]" /><p className={`text-sm font-black ${heading(isDark)}`}>Müller-Lyer</p></div>
                <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Puedes medir las dos líneas con una regla y comprobar que son iguales. Seguirás viéndolas distintas. <strong>Saber no apaga la ilusión</strong>: solo te enseña a desconfiar de ella.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>De ahí la propuesta práctica del libro: no puedes corregir al Sistema 1 desde dentro, pero <strong>sí puedes reconocer las situaciones</strong> en las que suele equivocarse y, ahí, pedir ayuda al Sistema 2.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. El contador de energía mental                                    */
/* ------------------------------------------------------------------ */

function Esfuerzo({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [fase, setFase] = useState(1);
  const r = [16, 24, 16][fase];
  const etiquetas = ['Reposo', 'Esfuerzo máximo', 'Tarea resuelta'];
  return (
    <Shell isDark={isDark} title="La pupila delata" highlight="el esfuerzo mental" subtitle="Kahneman y Jackson Beatty midieron el pensamiento desde fuera: el tamaño de la pupila funciona como el contador de la luz de la mente.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[42%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 300 220" className="w-full h-full max-h-[250px] overflow-visible" aria-label="La pupila se dilata con el esfuerzo y vuelve a su tamaño al resolver">
              <SceneDefs id="esf" isDark={isDark} />
              <ellipse cx={150} cy={110} rx={92} ry={56} fill={isDark ? '#f5f5f5' : '#ffffff'} filter="url(#esf-sh)" />
              <motion.circle cx={150} cy={110} animate={{ r: r + 20 }} transition={{ type: 'spring', stiffness: 60, damping: 12 }} fill={isDark ? '#6b4a2f' : '#8b5e3c'} />
              <motion.circle cx={150} cy={110} animate={{ r }} transition={{ type: 'spring', stiffness: 60, damping: 12 }} fill="#1a1a1a" />
              <circle cx={140} cy={98} r={6} fill="#fff" opacity={0.8} />
              <Float amp={fase === 1 ? 4 : 1.5} dur={fase === 1 ? 1.6 : 3.6}>
                <motion.circle cx={262} cy={60} r={9} fill={fase === 1 ? ORANGE : "#94a3b8"} animate={{ scale: [1, 1.45, 1] }} transition={{ duration: fase === 1 ? 0.72 : 1, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "262px 60px" }} />
              </Float>
              <text x={262} y={36} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={t.muted}>pulso</text>
              {fase === 1 && <PulseDisc cx={150} cy={110} rx={70} ry={44} dur={1.6} peak={0.25} />}
              <text x={150} y={206} textAnchor="middle" fontSize={13} fontWeight={900} fill={fase === 1 ? ORANGE : t.muted}>{etiquetas[fase]}</text>
            </svg>
            <div className="flex gap-2">{etiquetas.map((e, i) => <Pill key={e} isDark={isDark} on={i === fase} onClick={() => setFase(i)}>{e}</Pill>)}</div>
          </div>
          <div className="lg:w-[58%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl flex flex-col gap-3 ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que ocurre en el cuerpo durante la tarea "Suma-3"</p>
              <Bar isDark={isDark} label="Dilatación de la pupila" value={50} max={60} suffix="%" delay={0.2} />
              <Bar isDark={isDark} label="Aumento de pulsaciones por minuto" value={7} max={60} delay={0.45} />
              <p className={`text-xs ${textMuted(isDark)}`}>También sube la presión arterial y se tensan los músculos. Todo vuelve a su línea base <strong>en cuanto resuelves o abandonas</strong>.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Ley del mínimo esfuerzo</p>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Si hay varias formas de llegar al mismo objetivo, gravitarás hacia la menos exigente. El esfuerzo es un costo y la mente lo administra.</p>
              </div>
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>La destreza abarata</p>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>A medida que dominas una tarea, baja la actividad cerebral asociada y la pupila se dilata menos. <strong>El talento se mide también en energía ahorrada.</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. El controlador perezoso                                          */
/* ------------------------------------------------------------------ */

function Perezoso({ isDark }: SlideProps) {
  const casos = [
    {
      id: 'bate', nombre: 'El bate y la pelota',
      enunciado: 'Un bate y una pelota cuestan $1,10 en total. El bate cuesta $1,00 más que la pelota. ¿Cuánto cuesta la pelota?',
      intuitiva: '10 centavos', correcta: '5 centavos',
      porque: 'Si la pelota costara 10 centavos, el bate costaría $1,10 y el total sería $1,20. Con 5 centavos: 0,05 + 1,05 = 1,10.',
      dato: 'Más de la mitad de los estudiantes de Harvard, el MIT y Princeton responde 10 centavos.',
    },
    {
      id: 'rosas', nombre: 'El silogismo de las flores',
      enunciado: 'Todas las rosas son flores. Algunas flores se marchitan pronto. Luego, algunas rosas se marchitan pronto.',
      intuitiva: 'Es válido', correcta: 'Es inválido',
      porque: 'Las flores que se marchitan podrían ser todas no-rosas. La conclusión suena verdadera, y eso basta para que el Sistema 2 la apruebe sin revisar la estructura.',
      dato: 'Cuando una conclusión parece cierta, tendemos a dar por buena la lógica que la sostiene.',
    },
    {
      id: 'michigan', nombre: 'Michigan y Detroit',
      enunciado: '¿Cuántos homicidios al año estimas en el estado de Michigan? ¿Y en la ciudad de Detroit?',
      intuitiva: 'Michigan < Detroit', correcta: 'Michigan ≥ Detroit',
      porque: 'Detroit está dentro de Michigan. El Sistema 2 perezoso no recupera ese dato geográfico y acepta la estimación que el Sistema 1 improvisó con "Michigan = campo tranquilo".',
      dato: 'La gente estima rutinariamente menos homicidios para todo el estado que para una sola de sus ciudades.',
    },
  ];
  const [i, setI] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const c = casos[i];
  const elegir = (k: number) => { setI(k); setRevelado(false); };
  return (
    <Shell isDark={isDark} title="El controlador perezoso:" highlight="por qué el Sistema 2 firma sin leer" subtitle="El Sistema 2 debería supervisar al Sistema 1. En la práctica aprueba sus sugerencias con el mínimo esfuerzo posible. Prueba estos tres clásicos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-2 mb-3">
          {casos.map((x, k) => <Pill key={x.id} isDark={isDark} on={k === i} onClick={() => elegir(k)}>{x.nombre}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] flex flex-col justify-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Léelo y responde antes de seguir</p>
                <p className={`text-lg md:text-xl font-bold leading-snug ${heading(isDark)}`}>{c.enunciado}</p>
              </motion.div>
            </AnimatePresence>
            {!revelado && <button onClick={() => setRevelado(true)} className="self-start px-5 py-2 rounded-full text-sm font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30">Revelar la respuesta</button>}
          </div>
          <div className="lg:w-[48%] flex flex-col justify-center gap-3">
            <AnimatePresence mode="wait">
              {revelado ? (
                <motion.div key={`r${c.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50'}`}>
                      <p className={microLabel(isDark)}>Sistema 1 dice</p>
                      <p className={`text-base font-black ${heading(isDark)}`}>{c.intuitiva}</p>
                    </div>
                    <div className={`p-3 rounded-2xl ${featuredClass(isDark)}`}>
                      <p className={microLabel(isDark)}>Sistema 2 comprueba</p>
                      <p className="text-base font-black text-[#ff851d]">{c.correcta}</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                    <p className={microLabel(isDark)}>Por qué fallamos</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{c.porque}</p>
                  </div>
                  <p className={`text-sm italic ${textMuted(isDark)}`}>{c.dato}</p>
                </motion.div>
              ) : (
                <motion.div key="espera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Fíjate en lo que acaba de pasar en tu cabeza: apareció una respuesta <strong>sin que la buscaras</strong>. Esa es la sugerencia del Sistema 1. La pregunta es si vas a verificarla.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>Keith Stanovich separa dos cosas que solemos confundir: la <strong>mente algorítmica</strong> (lo que mide el test de inteligencia) y la <strong>mente reflexiva</strong>, la disposición a verificar tus propias intuiciones. Esta clase entrena la segunda.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Agotamiento del ego                                              */
/* ------------------------------------------------------------------ */

function Agotamiento({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [hora, setHora] = useState(0);
  const serie = [0.65, 0.5, 0.3, 0.05];
  const horas = ['Tras la pausa', '+40 min', '+1 h 20', 'Antes de comer'];
  return (
    <Shell isDark={isDark} title="Agotamiento del ego:" highlight="decidir cansa, y el cansancio decide" subtitle="Roy Baumeister propuso que el autocontrol, el esfuerzo mental y la regulación emocional beben de un mismo depósito de energía.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 480 248" className="w-full h-full max-h-[270px] overflow-visible" aria-label="Las resoluciones favorables caen del 65% a casi 0% entre pausas">
              <SceneDefs id="ago" isDark={isDark} />
              {serie.map((v, i) => {
                const x = 80 + i * 110;
                const h = v * 170;
                const on = i === hora;
                return (
                  <motion.g key={i} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 90, damping: 13 }}>
                    <Lift on={on} dimmed={false} onClick={() => setHora(i)} lift={8}>
                      {on && <PulseDisc cx={x} cy={189} rx={46} ry={14} dur={2.2} peak={0.32} />}
                      <Float amp={on ? 5 : 0} dur={2.6} delay={i * 0.2}>
                        <g filter="url(#ago-sh)"><IsoBox cx={x} cy={185 - h} s={40} h={Math.max(h, 6)} f={on ? BRAND : i === 0 ? PEACH : NEUTRAL(isDark)} /></g>
                        <text x={x} y={185 - h - 26} textAnchor="middle" fontSize={15} fontWeight={900} fill={on ? ORANGE : t.text}>{Math.round(v * 100)}%</text>
                      </Float>
                    </Lift>
                  </motion.g>
                );
              })}
              <Traveler id="ago" path={[[80, 206], [190, 206], [300, 206], [410, 206]]} dur={5} repeatDelay={0.6} r={5} />
              <text x={240} y={240} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Libertades condicionales concedidas, según el momento de la sesión</text>
            </svg>
            <div className="flex flex-wrap justify-center gap-1.5">{horas.map((h, i) => <Pill key={h} isDark={isDark} on={i === hora} onClick={() => setHora(i)}>{h}</Pill>)}</div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={`text-base font-black ${heading(isDark)}`}>El estudio de los jueces en Israel</p>
                <Sello isDark={isDark} tipo="disputa" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>En más de mil decisiones, la proporción de resoluciones favorables caía a lo largo de cada sesión y se recuperaba tras la pausa para comer. La lectura de Kahneman: el juez cansado toma la decisión por defecto, que es <strong>denegar</strong>.</p>
            </div>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={microLabel(isDark)}>Lo que el libro no alcanzó a incorporar</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Investigadores posteriores mostraron que <strong>el orden de los casos no es aleatorio</strong>: el tribunal agrupa por prisión y los presos con abogado se ven antes. Y en la replicación multi-laboratorio del agotamiento del ego (23 equipos, 2.141 personas) el efecto fue prácticamente <strong>cero</strong>. Volveremos a esto al final.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>Lo que sí puedes usar hoy:</strong> no tomes decisiones importantes al final de una jornada de reuniones. Aunque el mecanismo esté en discusión, el consejo cuesta poco y no depende de él.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. La máquina asociativa                                            */
/* ------------------------------------------------------------------ */

function Asociativa({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const ramas = [
    { name: 'Memoria', text: 'Se activan conceptos afines: náusea, fruta, enfermedad, suciedad.' },
    { name: 'Emoción', text: 'Aparece el disgusto antes de cualquier razonamiento.' },
    { name: 'Cuerpo', text: 'Mueca facial de rechazo y cambio en la respuesta de la piel.' },
    { name: 'Historia', text: 'Inventas una secuencia causal: alguien comió plátanos y se enfermó.' },
  ];
  const pos: [number, number][] = [[110, 85], [400, 85], [110, 225], [400, 225]];
  const [active, setActive] = useState(3);
  return (
    <Shell isDark={isDark} title="La máquina asociativa:" highlight="dos palabras y una cascada" subtitle="Lee estas dos palabras juntas: «Plátanos Vómito». En menos de un segundo tu mente hizo mucho más de lo que crees.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <svg viewBox="0 0 510 345" className="w-full h-full max-h-[370px] overflow-visible" aria-label="Un estímulo que activa memoria, emoción, cuerpo e historia">
              <SceneDefs id="aso" isDark={isDark} />
              <IsoFloor cx={255} cy={178} s={230} fill={t.floor} />
              {ramas.map((_, i) => <Traveler key={i} id="aso" path={hop([255, 130], pos[i], 28)} dur={1.2} delay={i * 0.3} repeatDelay={1.2} r={i === active ? 6 : 4} color={i === active ? ORANGE : '#94a3b8'} />)}
              <Float amp={4} dur={3}>
                <g filter="url(#aso-sh)"><IsoBox cx={255} cy={135} s={58} h={40} f={BRAND} /></g>
                <text x={255} y={74} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>«Plátanos Vómito»</text>
              </Float>
              {ramas.map((b, i) => {
                const on = i === active;
                return (
                  <Lift key={b.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#aso-sh)"><IsoBox cx={pos[i][0]} cy={pos[i][1] + 16} s={34} h={on ? 28 : 18} f={on ? PEACH : NEUTRAL(isDark)} /></g>
                    <text x={pos[i][0]} y={pos[i][1] + 88} textAnchor="middle" fontSize={12} fontWeight={800} fill={on ? ORANGE : t.text}>{b.name}</text>
                  </Lift>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Rama activada · {ramas[active].name.toLowerCase()}</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{ramas[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Las tres leyes de la asociación · David Hume, siglo XVIII</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>Semejanza</strong>, <strong>contigüidad</strong> en el tiempo o el espacio, y <strong>causalidad</strong>. Kahneman añade lo que Hume no podía ver: todo esto ocurre <strong>fuera de la conciencia</strong>, en paralelo y mucho más rápido de lo que podrías narrarlo.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Priming                                                          */
/* ------------------------------------------------------------------ */

function Priming({ isDark }: SlideProps) {
  const exps = [
    { id: 'florida', name: 'Efecto Florida', autor: 'John Bargh',
      estimulo: 'Estudiantes arman frases con palabras asociadas a la vejez: Florida, olvido, canas, arrugas. Nunca aparece la palabra "viejo".',
      resultado: 'Caminaron por el pasillo del laboratorio más despacio que el grupo de control.',
      idea: 'Una idea activada sin conciencia dispara una conducta motora congruente: el efecto ideomotor.' },
    { id: 'lapiz', name: 'El lápiz entre los dientes', autor: 'Strack y colegas',
      estimulo: 'Evaluar tiras cómicas sosteniendo un lápiz con los dientes (fuerza una sonrisa) o con los labios (fuerza un ceño).',
      resultado: 'Quienes "sonreían" calificaron los dibujos como más divertidos.',
      idea: 'El vínculo es bidireccional: la idea mueve el cuerpo y el cuerpo activa la emoción.' },
    { id: 'dinero', name: 'Primado del dinero', autor: 'Kathleen Vohs',
      estimulo: 'Salvapantallas con billetes flotando o frases que mencionan dinero.',
      resultado: 'Más independencia y perseverancia, pero menos conducta prosocial: recogían menos lápices caídos y se sentaban a 118 cm en lugar de 80 cm.',
      idea: 'El símbolo del dinero empuja al individualismo y a la distancia social.' },
    { id: 'ojos', name: 'La caja de la honestidad', autor: 'Bateson y colegas',
      estimulo: 'En una cocina universitaria con pago voluntario por el café, el cartel de precios alterna semanas con flores y semanas con unos ojos que miran.',
      resultado: 'En las semanas de ojos la gente aportó casi el triple.',
      idea: 'Un símbolo de ser observado basta para activar conducta prosocial.' },
    { id: 'macbeth', name: 'Efecto Lady Macbeth', autor: 'Zhong y Liljenquist',
      estimulo: 'Hacer que los participantes mientan por teléfono o por correo electrónico.',
      resultado: 'Quienes mintieron hablando prefirieron enjuague bucal; quienes escribieron, jabón de manos.',
      idea: 'La mancha moral pide limpieza física, y además apunta a la parte del cuerpo implicada.' },
  ];
  const [i, setI] = useState(0);
  const e = exps[i];
  return (
    <Shell isDark={isDark} title="Priming:" highlight="cinco experimentos famosos (y frágiles)" subtitle="Son los estudios más citados del libro y también los que peor han envejecido. Míralos, y al final de la clase veremos qué quedó de ellos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
          {exps.map((x, k) => <Pill key={x.id} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.name}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 440 230" className="w-full h-full overflow-visible" aria-label="Estímulo, activación inconsciente y cambio de conducta">
              <SceneDefs id="pri" isDark={isDark} />
              {['Estímulo', 'Activación', 'Conducta'].map((n, k) => {
                const x = 80 + k * 140;
                return (
                  <g key={n}>
                    <Float amp={4} dur={2.8} delay={k * 0.3}>
                      <g filter="url(#pri-sh)"><IsoBox cx={x} cy={130 - k * 16} s={44} h={28 + k * 12} f={k === 2 ? BRAND : k === 1 ? PEACH : NEUTRAL(isDark)} /></g>
                    </Float>
                    <text x={x} y={206} textAnchor="middle" fontSize={12} fontWeight={800} fill={k === 2 ? ORANGE : t2(isDark)}>{n}</text>
                  </g>
                );
              })}
              {[0, 1].map((k) => <Traveler key={k} id="pri" path={hop([80 + k * 140, 110 - k * 16], [220 + k * 140, 110 - (k + 1) * 16], 26)} dur={1.2} delay={k * 0.5} repeatDelay={1.1} r={5} />)}
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={e.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-xl font-black ${heading(isDark)}`}>{e.name} <span className={`text-sm font-semibold ${textMuted(isDark)}`}>· {e.autor}</span></h3>
                  <Sello isDark={isDark} tipo="disputa" />
                </div>
                <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Estímulo</p><p className={`text-sm leading-snug ${textMuted(isDark)}`}>{e.estimulo}</p></div>
                <div className={`p-3 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>Resultado reportado</p><p className={`text-sm leading-snug ${textMuted(isDark)}`}>{e.resultado}</p></div>
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}><p className={microLabel(isDark)}>La idea que ilustra</p><p className={`text-sm leading-snug ${textMuted(isDark)}`}>{e.idea}</p></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}
const t2 = (isDark: boolean) => sceneTone(isDark).text;

/* ------------------------------------------------------------------ */
/* 10. Facilidad vs tensión cognitiva                                  */
/* ------------------------------------------------------------------ */

function Facilidad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [modo, setModo] = useState<'facil' | 'tenso'>('facil');
  const facil = modo === 'facil';
  const causas = facil
    ? ['Tipografía clara y de alto contraste', 'Frases repetidas o en lenguaje sencillo', 'Priming previo del mismo concepto', 'Buen humor']
    : ['Tipografía borrosa o pequeña', 'Lenguaje rebuscado o confuso', 'Estímulos nuevos, sin precedente', 'Mal humor o sospecha'];
  const efectos = facil
    ? ['Sensación de familiaridad y de verdad', 'Confianza en la primera impresión', 'Pensamiento creativo e intuitivo', 'Menos control: más errores lógicos']
    : ['Alerta y vigilancia analítica', 'Suspensión de la intuición', 'Menos creatividad y peor humor', 'Menos errores intuitivos'];
  return (
    <Shell isDark={isDark} title="Facilidad y tensión:" highlight="el medidor que llevas encendido" subtitle="Tu mente mantiene un indicador permanente de cuánto cuesta procesar lo que tiene delante. Ese indicador cambia cómo piensas, no solo cómo te sientes.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[38%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 300 248" className="w-full h-full max-h-[260px] overflow-visible" aria-label="Medidor entre facilidad y tensión cognitiva">
              <SceneDefs id="fac" isDark={isDark} />
              <g filter="url(#fac-sh)"><Cylinder cx={150} cy={150} rx={110} ry={34} h={14} top={t.floor} side={t.floorSide} /></g>
              <motion.g animate={{ x: facil ? -58 : 58 }} transition={{ type: 'spring', stiffness: 70, damping: 12 }}>
                <PulseDisc cx={150} cy={150} rx={44} ry={14} dur={2} color={facil ? ORANGE : '#64748b'} />
                <Float amp={5} dur={2.4}><Orb id="fac" cx={150} cy={118} r={24} neutral={!facil} /></Float>
              </motion.g>
              <text x={92} y={226} textAnchor="middle" fontSize={12} fontWeight={900} fill={facil ? ORANGE : t.muted}>Facilidad</text>
              <text x={208} y={226} textAnchor="middle" fontSize={12} fontWeight={900} fill={!facil ? ORANGE : t.muted}>Tensión</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={facil} onClick={() => setModo('facil')}>Facilidad</Pill>
              <Pill isDark={isDark} on={!facil} onClick={() => setModo('tenso')}>Tensión</Pill>
            </div>
          </div>
          <div className="lg:w-[62%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={modo} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
                <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Qué lo provoca</p>
                  <ul className={`text-sm space-y-1 mt-1 ${textMuted(isDark)}`}>{causas.map((c) => <li key={c} className="flex gap-2"><ChevronRight size={14} className="text-[#ff851d] shrink-0 mt-0.5" />{c}</li>)}</ul>
                </div>
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Cómo te deja pensando</p>
                  <ul className={`text-sm space-y-1 mt-1 ${textMuted(isDark)}`}>{efectos.map((c) => <li key={c} className="flex gap-2"><ChevronRight size={14} className="text-[#ff851d] shrink-0 mt-0.5" />{c}</li>)}</ul>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={`text-sm font-black ${heading(isDark)}`}>El experimento estrella… que no resistió</p>
                <Sello isDark={isDark} tipo="disputa" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>En Princeton, imprimir el test de reflexión en letra gris y borrosa parecía bajar los errores del <strong>90% al 35%</strong>: la dificultad despertaba al Sistema 2. Eran 40 personas. Una réplica posterior con más de <strong>7.000</strong> no encontró ningún efecto.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Ilusiones de verdad y mera exposición                           */
/* ------------------------------------------------------------------ */

function Verdad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const reglas = [
    ['Maximiza la legibilidad', 'Alto contraste. Un texto en azul intenso se cree más que el mismo texto en amarillo pálido.'],
    ['Habla sencillo', 'Vestir una idea simple con palabras rebuscadas destruye la credibilidad: al autor se le juzga menos inteligente, no más.'],
    ['Si puedes, rima', '«Las penalidades borran las hostilidades» se juzga más profundo y más cierto que la misma idea sin rima.'],
    ['Cita fuentes pronunciables', 'Una empresa llamada Artan inspira más confianza que una llamada Taahhut. Solo por la fluidez fonética.'],
  ];
  const [n, setN] = useState(1);
  return (
    <Shell isDark={isDark} title="Lo fácil de procesar" highlight="se siente verdadero" subtitle="El Sistema 1 confunde la fluidez con la verdad y con la familiaridad. Esa confusión es el motor de la propaganda y de buena parte de la publicidad.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[42%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 320 240" className="w-full h-full max-h-[260px] overflow-visible" aria-label="La repetición vuelve agradable un estímulo arbitrario">
              <SceneDefs id="ver" isDark={isDark} />
              <IsoFloor cx={160} cy={180} s={150} fill={t.floor} />
              {n >= 3 && <PulseDisc cx={160} cy={178} rx={62} ry={20} dur={2.4} peak={0.28} />}
              {Array.from({ length: n + 1 }, (_, i) => (
                <motion.g key={i} initial={{ opacity: 0, y: -30, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
                  <Float amp={i === n ? 5 : 2} dur={2.6} delay={i * 0.25}>
                    <g filter="url(#ver-sh)"><IsoBox cx={160} cy={156 - i * 26} s={46} h={22} f={i >= 3 ? BRAND : i >= 1 ? PEACH : NEUTRAL(isDark)} /></g>
                  </Float>
                </motion.g>
              ))}
              <text x={160} y={222} textAnchor="middle" fontSize={12} fontWeight={800} fill={n >= 3 ? ORANGE : t.muted}>
                {n === 0 ? 'Primera vez: desconocido' : n < 3 ? 'Se repite: menos extraño' : 'Familiar: me agrada y lo creo'}
              </text>
            </svg>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${textMuted(isDark)}`}>Exposiciones</span>
              <input type="range" min={0} max={4} value={n} onChange={(ev) => setN(Number(ev.target.value))} className="w-40 accent-[#ff851d]" aria-label="Número de exposiciones" />
              <span className="text-sm font-black text-[#ff851d]">{n + 1}</span>
            </div>
          </div>
          <div className="lg:w-[58%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={`text-base font-black ${heading(isDark)}`}>Mera exposición · Robert Zajonc</p>
                <Sello isDark={isDark} tipo="solido" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Repetir un estímulo arbitrario —palabras inventadas como <em>kadirga</em>, ideogramas, figuras— aumenta el agrado hacia él, incluso si la exposición fue subliminal. Zajonc lo llevó al extremo: expuso <strong>embriones de pollo</strong> a un sonido dentro del huevo, y al nacer mostraron menos miedo a ese sonido que a otros nuevos.</p>
              <p className={`text-xs mt-1 ${textMuted(isDark)}`}>La explicación es evolutiva: lo repetido que no hizo daño es seguro. Lo nuevo merece recelo.</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Famosos de la noche a la mañana · Larry Jacoby</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Leer una lista de nombres inventados (como <em>David Stenbill</em>) hace que días después los reconozcas como personas famosas. Tu mente nota la fluidez, no recuerda de dónde viene, y la atribuye a la fama.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {reglas.map(([a, b], i) => (
                <button key={a} onMouseEnter={() => setN(Math.min(4, i + 1))} className={`text-left p-2.5 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
                  <p className={`text-xs font-black ${heading(isDark)}`}>{a}</p>
                  <p className={`text-[11px] leading-snug ${textMuted(isDark)}`}>{b}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Normas, sorpresas y causalidad                                  */
/* ------------------------------------------------------------------ */

function Causalidad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [empuja, setEmpuja] = useState(true);
  const casos = [
    { name: 'Ilusión de Moisés', text: '«¿Cuántos animales de cada especie metió Moisés en el arca?» Casi nadie se detiene: Moisés encaja en el contexto bíblico y la anomalía pasa. Fue Noé.' },
    { name: 'Causalidad física · Michotte', text: 'Un cuadrado toca a otro y ves que lo empuja. No es una inferencia: lo percibes tan directamente como percibes el color.' },
    { name: 'Causalidad intencional · Heider y Simmel', text: 'Triángulos y círculos moviéndose en una pantalla se convierten de inmediato en un agresor, una víctima y un héroe. Les atribuyes intenciones sin poder evitarlo.' },
    { name: 'Titulares contradictorios', text: 'El mismo día que capturaron a Sadam Husein, una agencia explicó la subida de los bonos por esa captura… y horas después explicó la caída con el mismo hecho.' },
  ];
  const [i, setI] = useState(1);
  return (
    <Shell isDark={isDark} title="Causas por todas partes:" highlight="la mente no tolera el azar" subtitle="El Sistema 1 mantiene un modelo de lo que es normal y, cuando algo lo rompe, fabrica una causa de inmediato. Esa habilidad es la que estorba al pensar en estadística.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 340 200" className="w-full h-full max-h-[220px] overflow-visible" aria-label="Un bloque que parece empujar a otro">
              <SceneDefs id="cau" isDark={isDark} />
              <IsoFloor cx={170} cy={130} s={160} fill={t.floor} />
              {empuja && <PulseDisc cx={140} cy={128} rx={30} ry={11} dur={2.2} peak={0.34} />}
              <motion.g animate={{ x: empuja ? [0, 52, 0] : 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
                <Float amp={2.5} dur={3}><g filter="url(#cau-sh)"><IsoBox cx={90} cy={112} s={30} h={26} f={BRAND} /></g></Float>
              </motion.g>
              <motion.g animate={{ x: empuja ? [0, 52, 0] : 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.18 }}>
                <Float amp={2.5} dur={3} delay={0.3}><g filter="url(#cau-sh)"><IsoBox cx={190} cy={112} s={30} h={26} f={NEUTRAL(isDark)} /></g></Float>
              </motion.g>
              <text x={170} y={186} textAnchor="middle" fontSize={12} fontWeight={800} fill={ORANGE}>Ves un empujón, no dos movimientos</text>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={empuja} onClick={() => setEmpuja(true)}>Animar</Pill><Pill isDark={isDark} on={!empuja} onClick={() => setEmpuja(false)}>Detener</Pill></div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-2 justify-center">
            {casos.map((c, k) => (
              <motion.button key={c.name} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left p-3 rounded-2xl ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={`text-sm font-black ${heading(isDark)}`}>{c.name}</p>
                <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{c.text}</p>
              </motion.button>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>Un suceso rarísimo deja de sorprenderte <strong>la segunda vez</strong>: la primera ya reescribió tu norma. Así, una coincidencia se convierte en expectativa, y la expectativa en una historia causal.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 13. Sustitución de preguntas                                        */
/* ------------------------------------------------------------------ */

function Sustitucion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pares = [
    { dificil: '¿Debo invertir en acciones de Ford?', facil: '¿Me gustan los autos que fabrica Ford?' },
    { dificil: '¿Qué tan satisfecho estoy con mi vida?', facil: '¿De qué humor estoy en este momento?' },
    { dificil: '¿Cuánto merece esta especie en peligro?', facil: '¿Cuánto me conmueve la imagen del animal?' },
    { dificil: '¿Llegará lejos este político?', facil: '¿Tiene cara de competente?' },
  ];
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="Sustitución:" highlight="respondes otra pregunta sin darte cuenta" subtitle="Es el mecanismo que está detrás de casi todas las heurísticas. Ante una pregunta difícil, el Sistema 1 contesta una parecida pero fácil, y no te avisa del cambio.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 420 300" className="w-full h-full overflow-visible" aria-label="Una pregunta difícil es reemplazada por una fácil">
              <SceneDefs id="sus" isDark={isDark} />
              <Float amp={3} dur={4.6}><g filter="url(#sus-sh)"><IsoBox cx={120} cy={90} s={62} h={54} f={SLATE(isDark)} /></g></Float>
              <text x={120} y={32} textAnchor="middle" fontSize={12} fontWeight={900} fill={t.muted}>Pregunta objetivo</text>
              <text x={120} y={200} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>difícil, lenta</text>
              <PulseDisc cx={300} cy={182} rx={66} ry={20} dur={2.2} peak={0.3} />
              <Float amp={7} dur={2.1}><g filter="url(#sus-sh)"><IsoBox cx={300} cy={150} s={62} h={30} f={BRAND} /></g></Float>
              <text x={300} y={92} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Pregunta heurística</text>
              <text x={300} y={238} textAnchor="middle" fontSize={11} fontWeight={800} fill={ORANGE}>fácil, inmediata</text>
              <Traveler id="sus" path={hop([120, 56], [300, 116], 44)} dur={1.5} repeatDelay={0.5} r={6} />
              <Traveler id="sus" path={hop([120, 56], [300, 116], 24)} dur={1.5} delay={0.7} repeatDelay={0.5} r={4} color={PINK} />
              <text x={210} y={284} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>La respuesta de la derecha se presenta como si fuera la de la izquierda</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2 justify-center">
            <p className={microLabel(isDark)}>Toca una pregunta y mira por cuál la cambia tu mente</p>
            {pares.map((p, k) => (
              <motion.button key={p.dificil} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left p-3 rounded-2xl flex items-center gap-3 ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <span className={`text-sm font-bold flex-1 ${heading(isDark)}`}>{p.dificil}</span>
                <ChevronRight size={16} className="text-[#ff851d] shrink-0" />
                <span className={`text-sm flex-1 ${textMuted(isDark)}`}>{p.facil}</span>
              </motion.button>
            ))}
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={microLabel(isDark)}>Dos aptitudes que lo hacen posible</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Escopeta mental:</strong> el Sistema 1 calcula de más, sin que se lo pidas. <strong>Equivalencia de intensidades:</strong> traduce sin esfuerzo entre escalas que no tienen nada que ver, como convertir «leía a los cuatro años» en una estatura o en un sueldo.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Representatividad y tasa base                                   */
/* ------------------------------------------------------------------ */

function Representatividad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [verTasa, setVerTasa] = useState(false);
  return (
    <Shell isDark={isDark} title="Representatividad:" highlight="juzgar por el parecido" subtitle="«Steve es tímido y retraído, servicial pero poco interesado en la gente. Metódico, ordenado, obsesionado con el detalle.» ¿Es más probable que sea bibliotecario o agricultor?">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 520 250" className="w-full h-full max-h-[270px] overflow-visible" aria-label="Por cada bibliotecario hay más de veinte agricultores">
              <SceneDefs id="rep" isDark={isDark} />
              <IsoFloor cx={260} cy={150} s={250} fill={t.floor} />
              <g>
                <PulseDisc cx={70} cy={152} rx={38} ry={12} dur={2.4} peak={0.3} />
                <Float amp={5} dur={2.4}><Persona id="rep" cx={70} cy={150} s={1.05} body={BRAND} accessory="compass" hair="#3b2a20" /></Float>
                <text x={70} y={196} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>1 bibliotecario</text>
              </g>
              <AnimatePresence>
                {verTasa && Array.from({ length: 21 }, (_, i) => {
                  const col = i % 7;
                  const row = Math.floor(i / 7);
                  const x = 180 + col * 46 + row * 10;
                  const y = 112 + row * 34;
                  return (
                    <motion.g key={i} initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.025, type: 'spring', stiffness: 130, damping: 12 }}>
                      <Float amp={3} dur={2.8} delay={(i % 7) * 0.2}>
                        <g filter="url(#rep-sh)"><IsoBox cx={x} cy={y} s={13} h={16} f={NEUTRAL(isDark)} /></g>
                      </Float>
                    </motion.g>
                  );
                })}
              </AnimatePresence>
              <text x={330} y={238} textAnchor="middle" fontSize={12} fontWeight={800} fill={verTasa ? ORANGE : t.muted}>{verTasa ? 'Más de 20 agricultores por cada bibliotecario' : 'Falta un dato en la pregunta…'}</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!verTasa} onClick={() => setVerTasa(false)}>Solo el perfil</Pill>
              <Pill isDark={isDark} on={verTasa} onClick={() => setVerTasa(true)}>Mostrar la tasa base</Pill>
            </div>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La sustitución, paso a paso</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Pregunta real: <em>¿cuál es la probabilidad de que Steve sea bibliotecario?</em> Pregunta que respondes: <em>¿cuánto se parece Steve al estereotipo de bibliotecario?</em></p>
            </div>
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que se ignora</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>La <strong>tasa base</strong>: cuántos hay de cada categoría en la población. Si los agricultores superan a los bibliotecarios en más de veinte a uno, lo probable es que un hombre metódico y ordenado esté en un tractor, no en un mostrador.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>Dónde te cuesta caro:</strong> al contratar. Un candidato que "tiene todo el perfil" puede ser menos probable que uno corriente, si el perfil es raro y el historial objetivo dice otra cosa.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Disponibilidad                                                  */
/* ------------------------------------------------------------------ */

function Disponibilidad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pares = [
    { a: 'Accidente de avión', b: 'Enfermedad cardiovascular', gana: 'b', nota: 'El accidente ocupa portadas durante días; el infarto, ninguna. La cobertura decide qué recuerdas, no la frecuencia real.' },
    { a: 'Atentado terrorista', b: 'Accidente de tránsito', gana: 'b', nota: 'La imagen dramática es fácil de recuperar, y esa facilidad se confunde con probabilidad.' },
    { a: 'Palabras que empiezan con K', b: 'Palabras con K en tercera posición', gana: 'b', nota: 'Es mucho más fácil buscar palabras por su inicial, así que creemos que son más. En inglés, la K aparece cerca del doble de veces en tercera posición.' },
  ];
  const [i, setI] = useState(2);
  const p = pares[i];
  return (
    <Shell isDark={isDark} title="Disponibilidad:" highlight="lo que recuerdas fácil parece frecuente" subtitle="Para estimar cuán común es algo, tu mente no cuenta: mide la velocidad con que le llegan ejemplos a la memoria.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex items-center">
            <svg viewBox="0 0 440 272" className="w-full h-full overflow-visible" aria-label="Lo vívido se recupera rápido; lo frecuente, no siempre">
              <SceneDefs id="dis" isDark={isDark} />
              <PulseDisc cx={130} cy={176} rx={62} ry={19} dur={1.5} peak={0.34} />
              <Float amp={9} dur={1.4}><g filter="url(#dis-sh)"><IsoBox cx={130} cy={140} s={54} h={34} f={BRAND} /></g></Float>
              <text x={130} y={88} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Lo vívido</text>
              <text x={130} y={222} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>llega en un instante</text>
              <Float amp={2} dur={5.2}><g filter="url(#dis-sh)"><IsoBox cx={320} cy={140} s={54} h={34} f={NEUTRAL(isDark)} /></g></Float>
              <text x={320} y={88} textAnchor="middle" fontSize={12} fontWeight={900} fill={t.text}>Lo frecuente</text>
              <text x={320} y={222} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>tarda o no aparece</text>
              <Traveler id="dis" path={hop([130, 110], [130, 110], 46)} dur={0.9} repeatDelay={0.2} r={6} />
              <Traveler id="dis" path={hop([320, 110], [320, 110], 20)} dur={3.4} repeatDelay={1.6} r={4} color="#94a3b8" />
              <text x={225} y={262} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Y la mente usa la velocidad como si fuera la cantidad</text>
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
            <p className={microLabel(isDark)}>¿Cuál ocurre más? Toca para comparar</p>
            {pares.map((x, k) => (
              <motion.button key={x.a} whileHover={{ x: 4 }} onClick={() => setI(k)} className={`text-left p-3 rounded-2xl flex items-center gap-2 ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <span className={`text-sm flex-1 ${k === i && x.gana === 'a' ? 'font-black text-[#ff851d]' : textMuted(isDark)}`}>{x.a}</span>
                <span className={`text-xs font-black ${textMuted(isDark)}`}>vs</span>
                <span className={`text-sm flex-1 text-right ${k === i && x.gana === 'b' ? 'font-black text-[#ff851d]' : textMuted(isDark)}`}>{x.b}</span>
              </motion.button>
            ))}
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{p.nota}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>En una empresa, esto se traduce en presupuestos de riesgo torcidos: mucha protección contra el desastre espectacular y poca contra la amenaza silenciosa que de verdad desgasta.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 16. Heurística afectiva                                             */
/* ------------------------------------------------------------------ */

function Afectiva({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [orden, setOrden] = useState<'afecto' | 'analisis'>('afecto');
  const afecto = orden === 'afecto';
  return (
    <Shell isDark={isDark} title="Heurística afectiva:" highlight="primero te gusta, después lo justificas" subtitle="Paul Slovic la describió así: tus gustos y aversiones determinan lo que crees sobre el mundo, y el argumento llega después, a ordenar lo ya decidido.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 360 250" className="w-full h-full max-h-[265px] overflow-visible" aria-label="El afecto llega antes que el análisis">
              <SceneDefs id="afe" isDark={isDark} />
              <IsoFloor cx={180} cy={150} s={170} fill={t.floor} />
              <motion.g animate={{ y: afecto ? -34 : 0 }} transition={{ type: 'spring', stiffness: 70, damping: 11 }}>
                {afecto && <PulseDisc cx={110} cy={158} rx={48} ry={15} dur={2.2} peak={0.3} />}
                <Float amp={afecto ? 6 : 2} dur={afecto ? 2.2 : 4}><g filter="url(#afe-sh)"><IsoBox cx={110} cy={130} s={40} h={28} f={afecto ? BRAND : NEUTRAL(isDark)} /></g></Float>
                <text x={110} y={196} textAnchor="middle" fontSize={12} fontWeight={900} fill={afecto ? ORANGE : t.muted}>Me gusta</text>
              </motion.g>
              <motion.g animate={{ y: afecto ? 0 : -34 }} transition={{ type: 'spring', stiffness: 70, damping: 11 }}>
                {!afecto && <PulseDisc cx={250} cy={158} rx={48} ry={15} dur={2.2} peak={0.3} />}
                <Float amp={afecto ? 2 : 6} dur={afecto ? 4 : 2.2}><g filter="url(#afe-sh)"><IsoBox cx={250} cy={130} s={40} h={28} f={afecto ? NEUTRAL(isDark) : BRAND} /></g></Float>
                <text x={250} y={196} textAnchor="middle" fontSize={12} fontWeight={900} fill={afecto ? t.muted : ORANGE}>Los datos</text>
              </motion.g>
              <Traveler id="afe" path={hop([110, 96], [250, 96], 34)} dur={1.4} repeatDelay={0.8} r={5} color={afecto ? ORANGE : '#94a3b8'} />
              <text x={180} y={242} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{afecto ? 'Lo habitual: el afecto decide' : 'Lo deseable: el dato manda'}</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={afecto} onClick={() => setOrden('afecto')}>Cómo ocurre</Pill>
              <Pill isDark={isDark} on={!afecto} onClick={() => setOrden('analisis')}>Cómo debería</Pill>
            </div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>El ejecutivo y las acciones de Ford</p>
              <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>Un directivo financiero invirtió decenas de millones en acciones de Ford. ¿Su análisis? Había ido a un salón del automóvil, los coches le encantaron y pensó: <em>«vaya, sí que hacen buenos autos»</em>. Nunca se preguntó si la acción estaba barata.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Cómo detectarlo en una reunión</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Escucha si la respuesta contesta la pregunta. Si alguien aprueba una inversión porque «el producto se ve increíble», puedes decirlo con nombre y apellido: <strong>eso es una sustitución de preguntas guiada por el afecto</strong>.</p>
            </div>
            <p className={`text-sm italic ${textMuted(isDark)}`}>«La emoción no interfiere con la decisión. En la mayoría de los casos, la emoción <strong>es</strong> la decisión.»</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}


/* ------------------------------------------------------------------ */
/* 17. Efecto halo                                                     */
/* ------------------------------------------------------------------ */

function Halo({ isDark }: SlideProps) {
  const adjetivos = ['inteligente', 'diligente', 'impulsivo', 'crítico', 'testarudo', 'envidioso'];
  const [quien, setQuien] = useState<'alan' | 'ben'>('alan');
  const alan = quien === 'alan';
  const lista = alan ? adjetivos : [...adjetivos].reverse();
  return (
    <Shell isDark={isDark} title="Efecto halo:" highlight="el orden cambia a la persona" subtitle="Solomon Asch describió a dos personas con exactamente los mismos seis adjetivos, solo que en orden inverso. Los participantes evaluaron a una mucho mejor que a la otra.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] flex flex-col justify-center gap-3">
            <div className="flex gap-2">
              <Pill isDark={isDark} on={alan} onClick={() => setQuien('alan')}>Alan</Pill>
              <Pill isDark={isDark} on={!alan} onClick={() => setQuien('ben')}>Ben</Pill>
            </div>
            <div className="flex flex-wrap gap-2">
              {lista.map((a, i) => (
                <motion.span
                  key={`${quien}-${a}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold ${i < 2 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30' : isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white shadow-md shadow-gray-200/70 text-gray-700'}`}
                >
                  {a}
                </motion.span>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={quien} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Cómo se lee «testarudo» en cada caso</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{alan
                  ? 'En alguien que ya te pareció inteligente y diligente, ser testarudo suena a firmeza de carácter: defiende sus ideas porque tiene buenas razones.'
                  : 'En alguien que ya te pareció envidioso y testarudo, ser inteligente suena a amenaza: lo vuelve más peligroso, no más valioso.'}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Qué está pasando</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Los primeros rasgos fijan un tono emocional, y los siguientes se interpretan para encajar en él. El Sistema 1 prefiere una historia coherente antes que una evaluación precisa. Por eso el halo <strong>exagera la coherencia</strong> de lo que juzgas.</p>
            </div>
            <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>El antídoto · descorrelacionar los errores</p>
              <ul className={`text-sm space-y-1.5 mt-1 ${textMuted(isDark)}`}>
                <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#ff851d] shrink-0 mt-0.5" />Al corregir exámenes: califica <strong>la pregunta 1 de todos</strong>, anota la nota al dorso, y recién después pasa a la pregunta 2.</li>
                <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#ff851d] shrink-0 mt-0.5" />En un comité: cada persona escribe su posición <strong>antes</strong> de que empiece la discusión abierta.</li>
                <li className="flex gap-2"><CheckCircle2 size={15} className="text-[#ff851d] shrink-0 mt-0.5" />En una entrevista: puntúa dimensiones por separado, sin mirar las anteriores.</li>
              </ul>
            </div>
            <p className={`text-sm ${textMuted(isDark)}`}>La regla general: <strong>para que varias opiniones sumen información, tienen que ser independientes</strong>. Si la primera contagia a las demás, no tienes cinco juicios: tienes uno repetido cinco veces.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 18. WYSIATI                                                         */
/* ------------------------------------------------------------------ */

function Wysiati({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [verOculto, setVerOculto] = useState(false);
  // Tres piezas bajo el foco y nueve en la sombra, repartidas por el suelo.
  const vistas: [number, number][] = [[150, 182], [196, 164], [242, 146]];
  const ocultas: [number, number][] = [
    [96, 150], [120, 198], [172, 214], [256, 196], [292, 168],
    [268, 120], [214, 112], [142, 124], [310, 210],
  ];
  const confianza = verOculto ? 35 : 92;
  return (
    <Shell isDark={isDark} title="WYSIATI:" highlight="lo que ves es todo lo que hay" subtitle="El Sistema 1 construye la mejor historia posible con la información que tiene a mano, y trata lo que no sabe como si no existiera.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 520 300" className="w-full h-full max-h-[320px] overflow-visible" aria-label="Un foco ilumina tres piezas; el resto queda en la sombra mientras la historia se arma igual">
              <SceneDefs id="wys" isDark={isDark} />
              <IsoFloor cx={200} cy={170} s={230} fill={t.floor} />

              {/* Foco: lámpara y haz que respira y barre suavemente */}
              <motion.g
                animate={{ rotate: verOculto ? [0, 0, 0] : [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '200px 24px' }}
              >
                <motion.polygon
                  points={verOculto ? '200,30 70,214 330,214' : '200,30 140,206 262,206'}
                  fill="url(#wys-brandv)"
                  animate={{ opacity: [0.1, 0.26, 0.1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <g filter="url(#wys-sh)"><IsoBox cx={200} cy={14} s={22} h={12} f={BRAND} /></g>
              </motion.g>

              {/* Lo que no ves: emerge del suelo al revelarlo */}
              {ocultas.map(([x, y], i) => (
                <motion.g
                  key={`o${i}`}
                  initial={false}
                  animate={verOculto ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.1, y: 16, scale: 0.75 }}
                  transition={{ delay: verOculto ? i * 0.05 : 0, type: 'spring', stiffness: 140, damping: 14 }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  <g filter="url(#wys-sh)"><IsoBox cx={x} cy={y} s={15} h={17} f={NEUTRAL(isDark)} /></g>
                </motion.g>
              ))}

              {/* Lo que ves: flota bajo el foco y late */}
              {vistas.map(([x, y], i) => (
                <g key={`v${i}`}>
                  <PulseDisc cx={x} cy={y + 20} rx={30} ry={10} dur={2.4} delay={i * 0.5} peak={0.3} />
                  <Float amp={6} dur={2.6} delay={i * 0.35}>
                    <g filter="url(#wys-sh)"><IsoBox cx={x} cy={y} s={20} h={23} f={BRAND} /></g>
                  </Float>
                  <Traveler id="wys" path={hop([x, y - 16], [416, 112], 54)} dur={1.6} delay={i * 0.45} repeatDelay={0.9} r={5} color={i % 2 ? PINK : ORANGE} />
                </g>
              ))}

              {/* La historia que armas con eso */}
              <PulseDisc cx={416} cy={112} rx={44} ry={44} dur={2.6} peak={0.22} />
              <Float amp={5} dur={3}><Orb id="wys" cx={416} cy={112} r={28} /></Float>
              <text x={416} y={70} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Tu historia</text>

              {/* Medidor de confianza, dentro de la escena */}
              <rect x={364} y={172} width={104} height={11} rx={5.5} fill={isDark ? '#2f2f2f' : '#e5e7eb'} />
              <motion.rect x={364} y={172} height={11} rx={5.5} fill={verOculto ? '#94a3b8' : ORANGE} animate={{ width: (confianza / 100) * 104 }} transition={{ type: 'spring', stiffness: 60, damping: 14 }} />
              <motion.text x={416} y={204} textAnchor="middle" fontSize={15} fontWeight={900} fill={verOculto ? t.muted : ORANGE} animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 2.4, repeat: Infinity }}>{confianza}%</motion.text>
              <text x={416} y={222} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={t.muted}>confianza subjetiva</text>

              <text x={200} y={262} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={verOculto ? ORANGE : t.muted}>
                {verOculto ? 'Nueve datos que nunca echaste de menos' : 'Tres datos bastan para una historia completa'}
              </text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!verOculto} onClick={() => setVerOculto(false)}>Lo que ves</Pill>
              <Pill isDark={isDark} on={verOculto} onClick={() => setVerOculto(true)}>Lo que falta</Pill>
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={`text-base font-black ${heading(isDark)}`}>El juicio de una sola parte</p>
                <Sello isDark={isDark} tipo="solido" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>En un experimento sobre un caso judicial ficticio, un grupo escuchó solo los argumentos de una parte y otro escuchó a ambas. Quienes oyeron una sola versión <strong>estaban más seguros</strong> de su veredicto, aunque sabían perfectamente que la información era parcial. Menos datos, historia más limpia, más confianza.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                ['Exceso de confianza', 'Tu seguridad no mide la cantidad de evidencia: mide lo bien que encaja la historia que armaste.'],
                ['Efectos marco', '«90% de supervivencia» tranquiliza; «10% de mortalidad» asusta. Es el mismo dato.'],
                ['Olvido de la tasa base', 'El caso concreto que tienes delante tapa la estadística que no está en la mesa.'],
              ].map(([a, b]) => (
                <div key={a} className={`p-3 rounded-2xl ${featuredClass(isDark)}`}>
                  <p className={`text-sm font-black mb-0.5 ${heading(isDark)}`}>{a}</p>
                  <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{b}</p>
                </div>
              ))}
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>La pregunta que lo desarma:</strong> «¿qué tendría que ser verdad para que esta conclusión fuera falsa, y lo habríamos visto en estos datos?».</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 19. Evaluaciones básicas                                            */
/* ------------------------------------------------------------------ */

function Basicas({ isDark }: SlideProps) {
  const [caso, setCaso] = useState<'rostros' | 'aves'>('rostros');
  const aves = [
    { n: '2.000 aves', v: 80 },
    { n: '20.000 aves', v: 78 },
    { n: '200.000 aves', v: 88 },
  ];
  return (
    <Shell isDark={isDark} title="Evaluaciones básicas:" highlight="lo que tu mente calcula sin permiso" subtitle="El Sistema 1 estima continuamente cosas que nadie le pidió. Dos consecuencias incómodas: a quién votas y cuánto donas.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex gap-2 mb-3">
          <Pill isDark={isDark} on={caso === 'rostros'} onClick={() => setCaso('rostros')}>Rostros y elecciones</Pill>
          <Pill isDark={isDark} on={caso === 'aves'} onClick={() => setCaso('aves')}>Cuántas aves salvar</Pill>
        </div>
        <AnimatePresence mode="wait">
          {caso === 'rostros' ? (
            <motion.div key="r" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
              <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center">
                <svg viewBox="0 0 320 210" className="w-full h-full max-h-[230px] overflow-visible" aria-label="Siete de cada diez elecciones predichas por la cara">
                  <SceneDefs id="bas" isDark={isDark} />
                  {Array.from({ length: 10 }, (_, i) => {
                    const col = i % 5;
                    const row = Math.floor(i / 5);
                    const acierto = i < 7;
                    return (
                      <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 130, damping: 12 }}>
                        <Float amp={acierto ? 5 : 0} dur={2.4} delay={i * 0.18}>
                          <g filter="url(#bas-sh)"><IsoBox cx={60 + col * 52} cy={70 + row * 62} s={20} h={24} f={acierto ? BRAND : NEUTRAL(isDark)} /></g>
                        </Float>
                        {acierto && <PulseDisc cx={60 + col * 52} cy={94 + row * 62} rx={26} ry={9} dur={2.6} delay={i * 0.22} peak={0.22} />}
                      </motion.g>
                    );
                  })}
                  <text x={160} y={198} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>≈ 7 de cada 10 contiendas acertadas</text>
                </svg>
              </div>
              <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-base font-black ${heading(isDark)}`}>Alex Todorov · cara de competente</p>
                    <Sello isDark={isDark} tipo="solido" />
                  </div>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Pedir a alguien que mire dos rostros durante una fracción de segundo y señale cuál parece más competente —mentón firme, sonrisa de confianza— predijo cerca del <strong>70%</strong> de las contiendas legislativas y de gobernación estudiadas.</p>
                </div>
                <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Dónde pega más fuerte</p>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>El efecto es unas <strong>tres veces mayor</strong> entre votantes con poca información política y mucho consumo de televisión. Donde falta criterio, la cara decide.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="a" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
              <div className={`lg:w-[48%] p-5 rounded-3xl flex flex-col justify-center gap-3 ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Cuánto estaría dispuesto a pagar para salvar…</p>
                {aves.map((a, i) => <Bar key={a.n} isDark={isDark} label={a.n} value={a.v} max={100} suffix=" USD" delay={0.15 * i} brand={i === 2} />)}
                <p className={`text-xs ${textMuted(isDark)}`}>Cien veces más aves, prácticamente el mismo dinero.</p>
              </div>
              <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Promedios sí, sumas no</p>
                  <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>El Sistema 1 maneja muy bien <strong>prototipos y promedios</strong>, y es casi ciego a las <strong>variables de suma</strong>. Quien responde no está valorando una cantidad de aves: está pagando por la imagen de un ave cubierta de petróleo, y esa imagen es la misma en los tres casos.</p>
                </div>
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>Por eso funciona</strong> la campaña con una sola historia y un solo rostro, y fracasa la que informa la cifra total de víctimas. No es frialdad: es cómo está hecha la maquinaria.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 20. Crisis de replicación                                           */
/* ------------------------------------------------------------------ */

function Replicacion({ isDark }: SlideProps) {
  const cols = [
    {
      k: 'solido', title: 'Resiste bien', color: '#10b981',
      items: ['Anclaje (incluso más fuerte de lo que se creía)', 'Efectos marco entre ganancia y pérdida', 'Bate y pelota y el test de reflexión', 'El gorila invisible y la ceguera por atención', 'Ilusiones visuales: Müller-Lyer, Stroop', 'Mera exposición', 'Efecto halo', 'Caras competentes y voto'],
    },
    {
      k: 'disputa', title: 'En disputa', color: ORANGE,
      items: ['Agotamiento del ego: 23 laboratorios y 2.141 personas encontraron un efecto cercano a cero', 'Jueces y libertad condicional: el orden de los casos no era aleatorio', 'Caja de la honestidad: los metaanálisis posteriores no son concluyentes', 'Facilidad cognitiva y letra borrosa: sin efecto con 7.000 personas'],
    },
    {
      k: 'fallo', title: 'No replicó', color: PINK,
      items: ['Efecto Florida: al medir con sensores y con el experimentador a ciegas, el efecto desaparece', 'Primado del dinero: cuatro experimentos grandes, ninguna evidencia', 'En los proyectos Many Labs, los dos únicos efectos que no replicaron eran de primado social'],
    },
  ];
  const [i, setI] = useState(1);
  const c = cols[i];
  return (
    <Shell isDark={isDark} title="Qué sobrevivió" highlight="a la crisis de replicación" subtitle="Esto no está en el libro, publicado en 2011. Es la parte más importante de la clase: cómo se comportó esta ciencia cuando se la puso a prueba.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[58%] grid grid-cols-3 gap-2.5">
            {cols.map((col, k) => (
              <button key={col.k} onClick={() => setI(k)} className={`text-left p-3 rounded-3xl transition-all flex flex-col ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <span className="w-9 h-1.5 rounded-full mb-2" style={{ backgroundColor: col.color }} />
                <span className={`text-base font-black mb-1.5 ${heading(isDark)}`}>{col.title}</span>
                <span className="flex flex-col gap-1.5">
                  {col.items.map((x) => (
                    <span key={x} className={`text-[11px] leading-snug flex gap-1.5 ${textMuted(isDark)}`}>
                      <span className="shrink-0 mt-0.5" style={{ color: col.color }}>•</span>{x}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
          <div className="lg:w-[42%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que hizo el propio Kahneman</p>
              <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>En 2012 escribió una carta abierta a los investigadores de primado advirtiendo que se les venía encima «un choque de trenes». En 2017 fue más lejos y escribió que había <strong>confiado demasiado en estudios con muestras pequeñas</strong>, y señaló la ironía: su primer artículo con Tversky trataba justamente sobre la fe indebida en muestras diminutas.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Cómo leer esto sin tirar el libro</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>El esqueleto —los dos sistemas, la sustitución de preguntas, las heurísticas, WYSIATI— sigue en pie y es la base de la economía conductual. Lo que se cayó es sobre todo el <strong>primado social</strong>, el capítulo más llamativo y el peor sostenido.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>La lección de método es del propio libro: <strong>un resultado sorprendente con pocos sujetos no es un hallazgo, es una hipótesis</strong>. Antes de citar un experimento, pregunta cuántas personas participaron y si alguien lo repitió.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 21. Vocabulario para diagnosticar                                   */
/* ------------------------------------------------------------------ */

function Vocabulario({ isDark }: SlideProps) {
  const frases = [
    { t: 'Facilidad cognitiva', d: '«Cuidado: estamos aceptando este plan solo porque el informe está bien diseñado y se lee fácil.»' },
    { t: 'Efecto halo', d: '«No confundamos las cosas: que presente bien no significa que su propuesta técnica sea sólida.»' },
    { t: 'WYSIATI', d: '«Este informe es coherente, pero no hemos pedido los datos de la competencia. Estamos decidiendo con lo que vemos.»' },
    { t: 'Sustitución de preguntas', d: '«Te pregunté si la acción está barata y me respondiste que te gustan sus autos.»' },
    { t: 'Tasa base', d: '«El perfil calza, de acuerdo. ¿Y cuántos candidatos así terminan funcionando?»' },
    { t: 'Descorrelacionar errores', d: '«Antes de discutir, que cada uno escriba su posición en dos líneas.»' },
  ];
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="El objetivo del libro:" highlight="poder nombrar el error" subtitle="Kahneman no promete que dejes de equivocarte. Promete algo más modesto y más útil: que tengas las palabras para reconocer el error mientras ocurre, sobre todo en los demás.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] flex flex-col gap-1.5 justify-center">
            {frases.map((f, k) => (
              <motion.button key={f.t} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left px-4 py-2.5 rounded-2xl text-sm font-bold ${k === i ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30' : isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white shadow-md shadow-gray-200/70 text-gray-700'}`}>
                {f.t}
              </motion.button>
            ))}
          </div>
          <div className="lg:w-[60%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-6 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Cómo suena en una reunión</p>
                <p className={`text-lg md:text-2xl font-bold leading-snug ${heading(isDark)}`}>{frases[i].d}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Por qué funciona mejor con los demás</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Detectar tus propios sesgos en caliente es casi imposible: el error se siente igual que un acierto. En cambio, el error ajeno sí se ve. Por eso Kahneman apuesta por el <strong>vocabulario compartido</strong>: una organización que puede nombrar estos fenómenos los corrige entre todos.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Su frase sobre esto es medio en broma y medio en serio: <strong>esperar un chisme inteligente sobre tus decisiones es mejor motivación para revisarlas</strong> que cualquier propósito de Año Nuevo.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 22. Síntesis                                                        */
/* ------------------------------------------------------------------ */

function Sintesis({ isDark }: SlideProps) {
  const chips = ['Dos sistemas, un solo tú', 'El Sistema 2 es perezoso', 'La fluidez se siente verdad', 'Sustituyes preguntas sin notarlo', 'Juzgas por parecido, no por tasa base', 'Lo vívido parece frecuente', 'La primera impresión contagia', 'Lo que no ves, no cuenta', 'Pide muestras grandes y réplicas'];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 420 140" className="w-full max-w-sm mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="sin" isDark={isDark} />
        <Float amp={6} dur={2.2}><Persona id="sin" cx={150} cy={118} s={1} body={BRAND} accessory="heart" hair="#2b1a12" /></Float>
        <Float amp={2.5} dur={4.2}><Persona id="sin" cx={270} cy={118} s={1} body={SLATE(isDark)} accessory="gear" hair="#4a4a4a" /></Float>
        <Traveler id="sin" path={hop([165, 86], [255, 86], 26)} dur={1.2} repeatDelay={0.8} r={5} />
      </svg>
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Síntesis</p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-3xl md:text-5xl font-black mb-5 leading-tight tracking-tighter z-10 max-w-4xl ${heading(isDark)}`}>
        No puedes apagar el Sistema 1. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Sí puedes reconocer el terreno</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-4xl mb-5 z-10">
        {chips.map((c) => (
          <span key={c} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300 shadow-lg shadow-black/40' : 'bg-white text-gray-700 shadow-md shadow-gray-200'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`max-w-3xl text-base md:text-xl font-medium leading-relaxed z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        La meta no es desconfiar de todo, sino <strong>saber en qué situaciones tu intuición suele fallar</strong> y, justo ahí, bajar la velocidad.
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 23. Test principiante                                               */
/* ------------------------------------------------------------------ */

const KN_BASICO: QuizQ[] = [
  {
    q: 'Estás multiplicando 17 × 24 de cabeza. ¿Qué sistema está trabajando?',
    options: ['El Sistema 2: lento, deliberado y esforzado', 'El Sistema 1: rápido y automático', 'Ninguno: es memoria pura', 'Ambos por igual, siempre'],
    answer: 0,
    why: 'El cálculo complejo es el territorio del Sistema 2. El Sistema 1 resuelve 2 + 2, pero no 17 × 24.',
  },
  {
    q: 'Un bate y una pelota cuestan $1,10. El bate cuesta $1,00 más que la pelota. ¿Cuánto cuesta la pelota?',
    options: ['5 centavos', '10 centavos', '11 centavos', '1 centavo'],
    answer: 0,
    why: 'Con 5 centavos: 0,05 + 1,05 = 1,10. La respuesta de 10 centavos es la sugerencia del Sistema 1, que el Sistema 2 suele aprobar sin verificar.',
  },
  {
    q: '¿Qué mide la dilatación de la pupila en los experimentos de Kahneman y Beatty?',
    options: ['El esfuerzo mental que exige la tarea', 'El nivel de inteligencia de la persona', 'La cantidad de luz de la sala', 'El grado de interés por el tema'],
    answer: 0,
    why: 'La pupila funciona como el contador de la luz del esfuerzo: se dilata hasta un 50% en el pico y vuelve a su tamaño en cuanto resuelves o abandonas.',
  },
  {
    q: 'En el experimento del gorila invisible, ¿qué proporción de espectadores no ve al gorila?',
    options: ['Cerca de la mitad', 'Menos del 5%', 'Prácticamente todos', 'Solo quienes tienen problemas de visión'],
    answer: 0,
    why: 'Alrededor del 50% no lo ve, porque contar los pases consume todo su presupuesto de atención. Y además son ciegos a su propia ceguera.',
  },
  {
    q: '¿Qué describe el principio WYSIATI?',
    options: ['Que la mente construye su historia solo con la información disponible e ignora lo que falta', 'Que solo creemos lo que vemos con nuestros propios ojos', 'Que la memoria visual es más fuerte que la verbal', 'Que conviene presentar los datos de forma visual'],
    answer: 0,
    why: '"What You See Is All There Is": la confianza depende de la coherencia del relato, no de la cantidad ni la calidad de la evidencia.',
  },
  {
    q: 'Un informe impreso con tipografía clara y frases que riman nos parece más creíble. ¿Qué fenómeno es?',
    options: ['Facilidad cognitiva: confundimos fluidez con verdad', 'Agotamiento del ego', 'Heurística de representatividad', 'Efecto de anclaje'],
    answer: 0,
    why: 'Cuando algo se procesa sin fricción, la mente interpreta esa comodidad como señal de familiaridad y de verdad.',
  },
  {
    q: 'Steve es tímido, metódico y ordenado. Creer que es bibliotecario y no agricultor es un caso de…',
    options: ['Heurística de representatividad, con olvido de la tasa base', 'Heurística de disponibilidad', 'Efecto halo', 'Efecto marco'],
    answer: 0,
    why: 'Juzgas por el parecido con el estereotipo e ignoras que hay más de veinte agricultores por cada bibliotecario.',
  },
  {
    q: 'Tememos más al accidente de avión que a la enfermedad cardiovascular. ¿Qué atajo lo explica?',
    options: ['La heurística de disponibilidad', 'La heurística afectiva', 'El efecto de mera exposición', 'La ley del mínimo esfuerzo'],
    answer: 0,
    why: 'Estimamos la frecuencia por la facilidad con que vienen ejemplos a la memoria, y la cobertura mediática decide qué ejemplos tenemos a mano.',
  },
  {
    q: 'Asch describió a Alan y a Ben con los mismos seis adjetivos en orden inverso, y Alan cayó mucho mejor. ¿Qué efecto es?',
    options: ['El efecto halo', 'El efecto Florida', 'El efecto Lady Macbeth', 'El efecto de mera exposición'],
    answer: 0,
    why: 'Los primeros rasgos fijan el tono y los siguientes se reinterpretan para encajar: el halo exagera la coherencia emocional de lo que juzgamos.',
  },
  {
    q: 'Decir "90% de supervivencia" en vez de "10% de mortalidad" cambia la decisión del paciente. Eso es…',
    options: ['Un efecto marco (framing)', 'Un efecto de anclaje', 'Agotamiento del ego', 'Priming ideomotor'],
    answer: 0,
    why: 'Son formulaciones lógicamente equivalentes, pero no emocionalmente equivalentes. Es una consecuencia directa de WYSIATI.',
  },
];

function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1:" highlight="los dos sistemas y los atajos" subtitle="Diez preguntas de nivel principiante sobre la arquitectura de la mente, las heurísticas y los sesgos más conocidos.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={KN_BASICO} />
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 24. Test avanzado                                                   */
/* ------------------------------------------------------------------ */

const KN_AVANZADO: QuizQ[] = [
  {
    q: 'Keith Stanovich distingue mente algorítmica y mente reflexiva. ¿Qué mide cada una?',
    options: ['La algorítmica, la capacidad de cálculo (tipo CI); la reflexiva, la disposición a verificar las propias intuiciones', 'La algorítmica, la memoria; la reflexiva, la creatividad', 'Son dos nombres para el Sistema 1 y el Sistema 2', 'La algorítmica, la lógica formal; la reflexiva, la empatía'],
    answer: 0,
    why: 'Por eso hay personas muy inteligentes que fallan el test de reflexión cognitiva: tienen el motor, pero no el hábito de usarlo para revisar la primera respuesta.',
  },
  {
    q: 'La replicación multi-laboratorio del agotamiento del ego (23 equipos, 2.141 participantes) encontró…',
    options: ['Un efecto cercano a cero, con intervalo de confianza que incluye el cero', 'Un efecto incluso mayor que el original', 'El mismo efecto, pero solo en hombres', 'Que el efecto depende de la glucosa, como se pensaba'],
    answer: 0,
    why: 'd ≈ 0,04. Es el ejemplo más citado de un hallazgo clásico de psicología que no sobrevivió a una prueba preregistrada a gran escala.',
  },
  {
    q: '¿Cuál es la crítica metodológica central al estudio de los jueces y la libertad condicional?',
    options: ['El orden de los casos no era aleatorio: el tribunal agrupa por prisión y los presos con abogado se ven antes', 'Los jueces sabían que estaban siendo observados', 'La muestra era demasiado pequeña para analizarse', 'Se midió el hambre con autoinforme'],
    answer: 0,
    why: 'Si el orden no es aleatorio, la caída a lo largo de la sesión puede deberse a qué casos se ven al final, no al cansancio del juez. Además, la magnitud del efecto resulta implausible.',
  },
  {
    q: 'Doyen y colegas repitieron el efecto Florida con sensores y experimentadores a ciegas. ¿Qué pasó?',
    options: ['El efecto desapareció, y solo aparecía cuando el experimentador esperaba verlo', 'El efecto se duplicó', 'El efecto apareció igual, confirmando a Bargh', 'No se pudo medir la velocidad al caminar'],
    answer: 0,
    why: 'Es la señal clásica de un efecto de expectativa del experimentador: lo que se transmitía no eran las palabras sobre la vejez, sino las pistas de quien tomaba el tiempo.',
  },
  {
    q: 'El experimento de la letra borrosa que reducía los errores del 90% al 35% se hizo con 40 personas. ¿Qué mostró la réplica grande?',
    options: ['Con más de 7.000 participantes no apareció ningún efecto de la tipografía difícil', 'Confirmó el efecto, pero solo en participantes de alto CI', 'El efecto era aún mayor', 'No se ha intentado replicar'],
    answer: 0,
    why: 'Además, el efecto original dependía casi por completo de una sola de las tres preguntas del test. Es un buen ejemplo de resultado llamativo con muestra diminuta.',
  },
  {
    q: '¿Cuál es el procedimiento correcto para descorrelacionar errores al corregir exámenes?',
    options: ['Calificar la pregunta 1 de todos los alumnos, anotar al dorso, y solo después pasar a la pregunta 2', 'Calificar cada examen completo de corrido, para tener el contexto del alumno', 'Promediar la nota con la del examen anterior', 'Corregir en parejas para discutir cada caso'],
    answer: 0,
    why: 'Evaluar un examen completo deja que la primera respuesta tiña las siguientes. La independencia es lo que hace que varias evaluaciones aporten información nueva.',
  },
  {
    q: 'En el estudio del derrame del Exxon Valdez, la disposición a pagar por salvar 2.000, 20.000 y 200.000 aves fue de 80, 78 y 88 dólares. ¿Qué demuestra?',
    options: ['Que el Sistema 1 maneja prototipos y promedios, pero es casi ciego a las variables de suma', 'Que a la gente no le importan las aves', 'Que el dinero disponible era limitado', 'Que la pregunta estaba mal formulada'],
    answer: 0,
    why: 'Se paga por la imagen prototípica del ave cubierta de petróleo, y esa imagen no cambia con la cantidad.',
  },
  {
    q: 'En el experimento del caso judicial donde un grupo oyó solo a una parte, ¿qué ocurrió con la confianza?',
    options: ['Quienes oyeron una sola versión estaban más seguros de su veredicto, aun sabiendo que era parcial', 'Ambos grupos mostraron la misma confianza', 'Quienes oyeron ambas partes estaban más seguros', 'Los participantes se negaron a dar un veredicto'],
    answer: 0,
    why: 'Con menos información es más fácil armar una historia coherente, y la confianza sigue a la coherencia del relato, no a la evidencia.',
  },
  {
    q: '¿Qué reconoció Daniel Kahneman en 2017 sobre el capítulo de priming de su libro?',
    options: ['Que había confiado demasiado en estudios con muestras pequeñas, con la ironía de haber escrito él mismo sobre la "ley de los números pequeños"', 'Que los experimentos eran correctos pero estaban mal explicados', 'Que nunca creyó realmente en esos resultados', 'Que el problema era la traducción al inglés'],
    answer: 0,
    why: 'Antes, en 2012, ya había escrito una carta abierta advirtiendo a esa comunidad de un "choque de trenes". Reconocer el error en público es, en sí mismo, una lección de método.',
  },
  {
    q: 'Después de todo esto, ¿cuál es la conclusión razonable sobre el libro?',
    options: ['El esqueleto (dos sistemas, sustitución, heurísticas, WYSIATI) sigue en pie; lo que se cayó es sobre todo el primado social', 'Hay que descartar el libro completo por poco riguroso', 'Nada cambió: todas las críticas fueron refutadas', 'Solo son válidos los experimentos hechos después de 2015'],
    answer: 0,
    why: 'Anclaje, efectos marco, el test de reflexión y la ceguera por atención replican bien. Distinguir qué parte resiste y qué parte no es exactamente el tipo de juicio que el libro intenta enseñar.',
  },
];

function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2:" highlight="método y evidencia" subtitle="Diez preguntas de nivel avanzado: los mecanismos finos, los estudios en disputa y cómo quedó esta ciencia tras la crisis de replicación.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={KN_AVANZADO} />
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseKahneman({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'kn-slide-0': return <Portada isDark={isDark} />;
    case 'kn-origen': return <Origen isDark={isDark} />;
    case 'kn-dos-sistemas': return <DosSistemas isDark={isDark} />;
    case 'kn-interaccion': return <Interaccion isDark={isDark} />;
    case 'kn-esfuerzo': return <Esfuerzo isDark={isDark} />;
    case 'kn-perezoso': return <Perezoso isDark={isDark} />;
    case 'kn-agotamiento': return <Agotamiento isDark={isDark} />;
    case 'kn-asociativa': return <Asociativa isDark={isDark} />;
    case 'kn-priming': return <Priming isDark={isDark} />;
    case 'kn-facilidad': return <Facilidad isDark={isDark} />;
    case 'kn-verdad': return <Verdad isDark={isDark} />;
    case 'kn-causalidad': return <Causalidad isDark={isDark} />;
    case 'kn-sustitucion': return <Sustitucion isDark={isDark} />;
    case 'kn-representatividad': return <Representatividad isDark={isDark} />;
    case 'kn-disponibilidad': return <Disponibilidad isDark={isDark} />;
    case 'kn-afectiva': return <Afectiva isDark={isDark} />;
    case 'kn-halo': return <Halo isDark={isDark} />;
    case 'kn-wysiati': return <Wysiati isDark={isDark} />;
    case 'kn-basicas': return <Basicas isDark={isDark} />;
    case 'kn-replicacion': return <Replicacion isDark={isDark} />;
    case 'kn-vocabulario': return <Vocabulario isDark={isDark} />;
    case 'kn-cierre': return <Sintesis isDark={isDark} />;
    case 'kn-test-basico': return <TestBasico isDark={isDark} />;
    case 'kn-test-avanzado': return <TestAvanzado isDark={isDark} />;
    default: return null;
  }
}
