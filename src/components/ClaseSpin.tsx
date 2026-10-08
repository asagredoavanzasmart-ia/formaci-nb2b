import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, XCircle, Eye, FlaskConical, BookOpen } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass } from './slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor,
  Orb, Float, Lift, Traveler, PulseDisc, hop,
} from './scene3d';

/**
 * Clase: "SPIN Selling: preguntar para vender".
 * Fuente: Neil Rackham, SPIN Selling (Huthwaite, 1988). Estilo 3D de scene3d.tsx;
 * los encabezados (level 1, "sp-header-*") los dibuja App.tsx.
 */

type SlideProps = { isDark: boolean };

const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

/* Cubo con una letra en su cara superior. */
function LetterCube({ cx, cy, s, h, letter, f, light = true }: { cx: number; cy: number; s: number; h: number; letter: string; f: typeof BRAND; light?: boolean }) {
  return (
    <g>
      <IsoBox cx={cx} cy={cy} s={s} h={h} f={f} />
      <text x={cx} y={cy + s * 0.18} textAnchor="middle" fontSize={s * 0.62} fontWeight={900} fill={light ? '#fff' : '#1f2937'}>{letter}</text>
    </g>
  );
}

/* Barra horizontal animada con resplandor de marca. */
function Bar({ isDark, label, value, max, suffix = '', brand = true, delay = 0 }: { isDark: boolean; label: string; value: number; max: number; suffix?: string; brand?: boolean; delay?: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span className={`font-bold ${textMuted(isDark)}`}>{label}</span><span className={`font-black ${heading(isDark)}`}>{value}{suffix}</span></div>
      <div className={`h-4 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
        <motion.div className={`h-full rounded-full ${brand ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-[0_0_15px_rgba(255,133,29,0.5)]' : 'bg-gray-400'}`} initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }} transition={{ delay, duration: 0.9, ease: 'easeOut' }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const steps = [
    { k: 'S', label: 'Situación', h: 40, f: NEUTRAL(isDark) },
    { k: 'P', label: 'Problema', h: 70, f: PEACH },
    { k: 'I', label: 'Implicación', h: 105, f: BRAND },
    { k: 'N', label: 'Necesidad-beneficio', h: 140, f: BRAND },
  ];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 640 230" className="w-full max-w-xl mb-3 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="spp" isDark={isDark} />
        {steps.map((s, i) => {
          const x = 110 + i * 140;
          const cy = 190 - s.h - i * 6;
          return (
            <motion.g key={s.k} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 * i, type: 'spring', stiffness: 90, damping: 13 }}>
              <Float amp={5} dur={3.2} delay={i * 0.3}>
                <g filter="url(#spp-sh)"><LetterCube cx={x} cy={cy} s={42} h={s.h} letter={s.k} f={s.f} light={i > 0 || isDark} /></g>
              </Float>
              <text x={x} y={228} textAnchor="middle" fontSize={12} fontWeight={800} fill={i >= 2 ? ORANGE : t.muted}>{s.label}</text>
            </motion.g>
          );
        })}
        {steps.slice(0, -1).map((s, i) => (
          <Traveler key={i} id="spp" path={hop([110 + i * 140, 190 - s.h - i * 6 - 28], [250 + i * 140, 190 - steps[i + 1].h - (i + 1) * 6 - 28], 26)} dur={1.4} delay={i * 0.5} repeatDelay={1.2} r={5} />
        ))}
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold text-[#ff851d] z-10">Neil Rackham · 35.000 llamadas observadas</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        SPIN Selling: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">preguntar para vender</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Lo que separa a quienes ganan las ventas grandes no es cómo cierran, sino <strong>qué preguntan</strong> y en qué orden.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-7 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. La investigación                                                 */
/* ------------------------------------------------------------------ */

function Investigacion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const stats = [['35.000', 'llamadas de venta analizadas'], ['12', 'años de investigación'], ['116', 'factores estudiados'], ['23', 'países']];
  const method = ['Elige una conducta', 'Obsérvala en llamadas reales', 'Separa llamadas exitosas y fallidas', 'Compara su frecuencia'];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="Una investigación," highlight="no una opinión" subtitle="El equipo de Rackham (Huthwaite) salió a observar ventas reales en lugar de preguntar a los vendedores cómo vendían.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 grid grid-cols-4 gap-3 mb-4">
          {stats.map(([v, l], i) => (
            <motion.div key={v} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`p-3 rounded-2xl text-center ${i === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{v}</p>
              <p className={`text-xs ${textMuted(isDark)}`}>{l}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[55%] min-h-0 flex items-center">
            <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible" aria-label="Los cuatro pasos del análisis de conducta">
              <SceneDefs id="inv" isDark={isDark} />
              {method.map((m, i) => {
                const x = 80 + i * 145;
                const y = 170 - i * 24;
                const on = i === active;
                return (
                  <Lift key={m} on={on} dimmed={false} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#inv-sh)"><LetterCube cx={x} cy={y} s={46} h={22} letter={String(i + 1)} f={on ? BRAND : NEUTRAL(isDark)} light={on || isDark} /></g>
                  </Lift>
                );
              })}
              {method.slice(0, -1).map((_, i) => <Traveler key={i} id="inv" path={hop([80 + i * 145, 150 - i * 24], [225 + i * 145, 150 - (i + 1) * 24], 30)} dur={1.2} delay={i * 0.4} repeatDelay={1.6} r={5} />)}
              <text x={300} y={232} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Análisis de conducta (behaviour analysis)</text>
            </svg>
          </div>
          <div className="lg:w-[45%] flex flex-col gap-3 justify-center">
            <div className="flex flex-wrap gap-2">{method.map((m, i) => <Pill key={m} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{i + 1}</Pill>)}</div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Paso {active + 1}</p>
                <h3 className={`text-xl font-black mb-2 ${heading(isDark)}`}>{method[active]}</h3>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{[
                  'Se define con precisión una conducta que podría influir en el éxito: por ejemplo, cuántas preguntas de cierto tipo hace el vendedor.',
                  'Investigadores acompañan al vendedor y cuentan cuántas veces aparece esa conducta en cada llamada. Nada de encuestas: observación directa.',
                  'Se clasifica cada llamada por su resultado. Esto exigió redefinir qué es una llamada "exitosa" en una venta grande.',
                  'Si la conducta aparece mucho más en las exitosas, está asociada al éxito; si aparece igual en ambas, no importa; si aparece más en las fallidas, perjudica.',
                ][active]}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. No confíes en lo que dicen los expertos                         */
/* ------------------------------------------------------------------ */

function NoConfies({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [observed, setObserved] = useState(false);
  return (
    <Shell isDark={isDark} title="No confíes en lo que dicen" highlight="los mejores: obsérvalos" subtitle="El primer error de la investigación fue entrevistar a los vendedores estrella. Los buenos rara vez saben qué los hace buenos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 460 250" className="w-full h-full max-h-[300px] overflow-visible" aria-label="23 agentes de aduana; 18 dijeron que la clave estaba en los ojos">
              <SceneDefs id="nco" isDark={isDark} />
              <IsoFloor cx={230} cy={150} s={210} fill={t.floor} />
              {Array.from({ length: 23 }, (_, i) => {
                const col = i % 6;
                const row = Math.floor(i / 6);
                const x = 120 + col * 44 + row * 22;
                const y = 110 + row * 28;
                const said = i < 18;
                const f = observed ? (said ? NEUTRAL(isDark) : BRAND) : said ? PEACH : NEUTRAL(isDark);
                return (
                  <motion.g key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 2 + (i % 4) * 0.3, repeat: Infinity, delay: i * 0.05 }}>
                    <g filter="url(#nco-sh)"><IsoBox cx={x} cy={y - 14} s={12} h={14} f={f} /></g>
                  </motion.g>
                );
              })}
              <text x={230} y={238} textAnchor="middle" fontSize={12} fontWeight={800} fill={observed ? ORANGE : t.muted}>{observed ? 'Lo que mostraron las cámaras' : '18 de 23 dijeron: «está en los ojos»'}</text>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={!observed} onClick={() => setObserved(false)}>Lo que dijeron</Pill><Pill isDark={isDark} on={observed} onClick={() => setObserved(true)}>Lo que se observó</Pill></div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={observed ? 'o' : 'd'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${observed ? featuredClass(isDark) : panelClass(isDark)}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`p-2.5 rounded-xl ${observed ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'bg-[#333] text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{observed ? <FlaskConical size={20} /> : <Eye size={20} />}</span>
                  <h3 className={`text-xl font-black ${heading(isDark)}`}>{observed ? 'Observación con cámaras ocultas' : 'Entrevistas a 23 agentes de aduana'}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{observed
                  ? 'Los agentes exitosos no detectaban culpa, sino señales de control: postura más erguida y cuello tenso. Hasta la anciana más inocente parece culpable bajo la mirada de un aduanero; el culpable de verdad se delata porque se controla.'
                  : 'Huthwaite estudió por qué algunos aduaneros atrapaban a muchos más contrabandistas. Dieciocho de los 23 mejores explicaron lo mismo: «mira a la gente a los ojos y verás la culpa». Incluso se diseñó una capacitación basada en eso.'}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>La lección de Rackham</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Hay mucha distancia entre lo que los vendedores eficaces dicen que hacen y lo que realmente hacen. Desconfía del «así lo hago yo» de un libro o de una conferencia: si quieres aprender, <strong>acompaña y observa</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Venta pequeña vs venta grande                                    */
/* ------------------------------------------------------------------ */

function GrandePequena({ isDark }: SlideProps) {
  const diffs = [
    ['Ciclo largo', 'En la venta grande, las discusiones importantes ocurren cuando tú no estás, entre una reunión y otra.'],
    ['Compromiso mayor', 'El cliente es más consciente del valor: construir valor percibido es la habilidad clave.'],
    ['Relación continua', 'Producto y vendedor se vuelven inseparables: el cliente compra también una relación.'],
    ['Riesgo público', 'Un error grande lo ve toda la empresa; por eso la decisión necesita una justificación racional.'],
  ];
  return (
    <Shell isDark={isDark} title="Lo que funciona en lo pequeño" highlight="falla en lo grande" subtitle="El vendedor que era número 3 de 200 vendiendo productos baratos terminó último vendiendo máquinas caras. Esa pregunta inició la investigación.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
          {diffs.map(([a, b], i) => (
            <motion.div key={a} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }} className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">0{i + 1}</span>
              <h3 className={`text-base font-black mb-1 ${heading(isDark)}`}>{a}</h3>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{b}</p>
            </motion.div>
          ))}
        </div>
        <div className={`lg:w-[50%] p-5 rounded-3xl flex flex-col justify-center gap-4 ${featuredClass(isDark)}`}>
          <p className={microLabel(isDark)}>¿Cuánto recuerda el cliente de una gran presentación?</p>
          <Bar isDark={isDark} label="Puntos clave recordados al terminar (de 8)" value={5.7} max={8} delay={0.3} />
          <Bar isDark={isDark} label="Una semana después (menos de la mitad)" value={2.5} max={8} brand={false} delay={0.6} />
          <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Un guion escrito por publicistas encantó a los clientes en el momento, pero una semana después habían olvidado más de la mitad y ya no pensaban comprar. <strong>Si no hay decisión en el momento, el entusiasmo se evapora.</strong> Por eso presionar sirve en la venta de una sola visita y perjudica en la de varias.</p>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Avances vs continuaciones                                        */
/* ------------------------------------------------------------------ */

function Avances({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const outcomes = [
    { name: 'Pedido', ok: true, text: 'El cliente se compromete firmemente a comprar. "Estamos 99,9% seguros" no es un pedido.' },
    { name: 'Avance', ok: true, text: 'Una acción concreta que mueve la venta: una demo, una prueba, una reunión con alguien de más arriba.' },
    { name: 'Continuación', ok: false, text: '"Muy buena presentación, sigamos en contacto." Palabras amables, ninguna acción. Rackham la cuenta como fracaso.' },
    { name: 'No venta', ok: false, text: 'El cliente rechaza activamente tu objetivo principal: no acepta otra reunión o te niega acceso.' },
  ];
  const [active, setActive] = useState(1);
  return (
    <Shell isDark={isDark} title="El éxito se mide por" highlight="acciones, no por palabras" subtitle="En la venta grande pocas reuniones terminan en pedido o rechazo. Por eso Rackham redefinió qué es una llamada exitosa.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 260" className="w-full h-full overflow-visible" aria-label="Cuatro resultados posibles de una llamada de venta">
              <SceneDefs id="ava" isDark={isDark} />
              {outcomes.map((o, i) => {
                const x = 80 + i * 130;
                const y = 180;
                const on = i === active;
                return (
                  <Lift key={o.name} on={on} dimmed={false} onClick={() => setActive(i)} lift={12}>
                    <g filter="url(#ava-sh)"><IsoBox cx={x} cy={y - (o.ok ? 50 : 18)} s={46} h={o.ok ? 50 : 18} f={on ? (o.ok ? BRAND : SLATE(isDark)) : o.ok ? PEACH : NEUTRAL(isDark)} /></g>
                    {o.ok && on && <PulseDisc cx={x} cy={y - 50} rx={60} ry={24} dur={2} />}
                    <text x={x} y={y + 64} textAnchor="middle" fontSize={13} fontWeight={900} fill={on ? ORANGE : t.text}>{o.name}</text>
                    <text x={x} y={y + 82} textAnchor="middle" fontSize={11} fontWeight={800} fill={o.ok ? '#10b981' : PINK}>{o.ok ? 'éxito' : 'fracaso'}</text>
                  </Lift>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${outcomes[active].ok ? featuredClass(isDark) : panelClass(isDark)}`}>
                <div className="flex items-center gap-2 mb-1">{outcomes[active].ok ? <CheckCircle2 size={20} className="text-emerald-500" /> : <XCircle size={20} className="text-[#ef375c]" />}<h3 className={`text-xl font-black ${heading(isDark)}`}>{outcomes[active].name}</h3></div>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{outcomes[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>John · novato</p><p className={`text-sm ${textMuted(isDark)}`}>Objetivo: "causar buena impresión y recoger datos". Salió feliz porque al cliente le gustó la presentación.</p></div>
              <div className={`p-3 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>Fred · de los mejores</p><p className={`text-sm ${textMuted(isDark)}`}>Objetivo: "que su ingeniero jefe visite nuestra fábrica". No lo logró, pero consiguió una reunión con el equipo del nuevo proyecto.</p></div>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Antes de cada reunión pregúntate: <strong>¿qué acción concreta quiero que el cliente acepte?</strong> Si la respuesta es "recoger información", estás planeando una continuación.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Las preguntas persuaden (y el tipo importa)                      */
/* ------------------------------------------------------------------ */

function Preguntas({ isDark }: SlideProps) {
  const reasons = [
    ['Hacen hablar al cliente', 'En las llamadas exitosas el comprador habla más que el vendedor.'],
    ['Controlan la atención', 'Aprendimos de niños a prestar más atención cuando nos preguntan que cuando nos cuentan.'],
    ['Persuaden; las razones no', 'Las razones solo convencen a quien ya está de tu lado. Las preguntas dejan que la persona se convenza sola.'],
    ['Descubren necesidades', 'Sin preguntas, vendes a ciegas: "dispara y reza".'],
  ];
  return (
    <Shell isDark={isDark} title="Preguntar persuade más que" highlight="cualquier argumento" subtitle="Pero en las ventas grandes no importa cuántas preguntas haces, sino de qué tipo.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
          {reasons.map(([a, b], i) => (
            <motion.div key={a} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <h3 className={`text-base font-black mb-1 ${heading(isDark)}`}>{a}</h3>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{b}</p>
            </motion.div>
          ))}
        </div>
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          <div className={`p-5 rounded-3xl flex flex-col gap-4 ${featuredClass(isDark)}`}>
            <p className={microLabel(isDark)}>Más preguntas en las llamadas exitosas que en las fallidas</p>
            <Bar isDark={isDark} label="Venta simple (Hertz, arriendo de autos)" value={63} max={70} suffix="%" delay={0.3} />
            <Bar isDark={isDark} label="Venta compleja (1.161 llamadas, equipos técnicos)" value={6} max={70} suffix="%" brand={false} delay={0.6} />
          </div>
          <div className={`p-4 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
            <p className={microLabel(isDark)}>Un mito derribado</p>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Desde 1925 se enseña que las preguntas <strong>abiertas</strong> son mejores que las <strong>cerradas</strong>. Al medirlo, no encontraron ninguna relación con el éxito: algunos de los mejores vendedores solo hacían preguntas cerradas.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Necesidades implícitas y explícitas                              */
/* ------------------------------------------------------------------ */

function Necesidades({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const stages = [
    { name: 'Pequeña imperfección', ex: '"El corrector ortográfico es algo incómodo."', type: 'Implícita' },
    { name: 'Problema claro', ex: '"Nuestro sistema no da abasto con el volumen."', type: 'Implícita' },
    { name: 'Deseo o intención', ex: '"Necesitamos un sistema más rápido."', type: 'Explícita' },
  ];
  const [active, setActive] = useState(2);
  return (
    <Shell isDark={isDark} title="Cómo crece una necesidad:" highlight="de implícita a explícita" subtitle="Una necesidad nace de una pequeña insatisfacción y solo al final se convierte en un deseo de actuar. En la venta grande, eso toma meses.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <svg viewBox="0 0 540 280" className="w-full h-full overflow-visible" aria-label="Tres escalones: imperfección, problema y deseo">
              <SceneDefs id="nec" isDark={isDark} />
              {stages.map((s, i) => {
                const gx = 110 + i * 160;
                const h = 40 + i * 50;
                const cy = 240 - i * 20 - h;
                const on = i === active;
                return (
                  <motion.g key={s.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 90, damping: 14 }}>
                    <Lift on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                      <g filter="url(#nec-sh)"><IsoBox cx={gx} cy={cy} s={62} h={h} f={i === 2 ? BRAND : i === 1 ? PEACH : NEUTRAL(isDark)} /></g>
                      <text x={gx} y={cy - 42} textAnchor="middle" fontSize={13} fontWeight={900} fill={on ? ORANGE : t.text}>{s.name}</text>
                    </Lift>
                  </motion.g>
                );
              })}
              <Traveler id="nec" path={[[110, 170], [270, 110], [430, 40]]} dur={2.4} repeatDelay={0.8} r={6} />
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${active === 2 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Necesidad {stages[active].type.toLowerCase()}</p>
                <h3 className={`text-xl font-black mb-2 ${heading(isDark)}`}>{stages[active].name}</h3>
                <p className={`text-base italic ${textMuted(isDark)}`}>{stages[active].ex}</p>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Implícitas</p><p className={`text-sm ${textMuted(isDark)}`}>Problemas e insatisfacciones. <strong>Predicen el éxito en ventas pequeñas</strong>, no en grandes.</p></div>
              <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>Explícitas</p><p className={`text-sm ${textMuted(isDark)}`}>Deseos concretos de actuar. En ventas grandes aparecen <strong>el doble</strong> en las llamadas exitosas.</p></div>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>El propósito de las preguntas en la venta grande es <strong>descubrir necesidades implícitas y convertirlas en explícitas</strong>. Un problema no es una señal de compra; una intención de actuar, sí.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. La ecuación de valor (balanza 3D)                                */
/* ------------------------------------------------------------------ */

function Ecuacion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [developed, setDeveloped] = useState(false);
  const problems = developed ? 5 : 1;
  const tilt = developed ? -9 : 9;
  return (
    <Shell isDark={isDark} title="La ecuación de valor:" highlight="el problema debe pesar más que el costo" subtitle="Si el cliente ve el problema más pequeño que el costo de resolverlo, no compra. En lo pequeño basta un problema leve; en lo grande, no.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 520 280" className="w-full h-full max-h-[320px] overflow-visible" aria-label="Balanza entre la gravedad del problema y el costo de la solución">
              <SceneDefs id="ecu" isDark={isDark} />
              <g filter="url(#ecu-sh)"><IsoBox cx={260} cy={150} s={22} h={100} f={NEUTRAL(isDark)} /></g>
              <motion.g animate={{ rotate: tilt }} transition={{ type: 'spring', stiffness: 50, damping: 9 }} style={{ transformOrigin: '260px 140px' }}>
                <rect x={80} y={134} width={360} height={12} rx={6} fill={isDark ? '#64748b' : '#94a3b8'} />
                <g filter="url(#ecu-sh)"><IsoBox cx={110} cy={118} s={56} h={10} f={PEACH} /></g>
                {Array.from({ length: problems }, (_, i) => (
                  <motion.g key={i} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 120, damping: 12 }}>
                    <g filter="url(#ecu-sh)"><IsoBox cx={96 + (i % 2) * 28} cy={100 - Math.floor(i / 2) * 20} s={14} h={16} f={BRAND} /></g>
                  </motion.g>
                ))}
                <g filter="url(#ecu-sh)"><IsoBox cx={410} cy={118} s={56} h={10} f={NEUTRAL(isDark)} /></g>
                <g filter="url(#ecu-sh)"><IsoBox cx={410} cy={78} s={30} h={40} f={SLATE(isDark)} /></g>
              </motion.g>
              <text x={110} y={262} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>Gravedad del problema</text>
              <text x={410} y={262} textAnchor="middle" fontSize={13} fontWeight={900} fill={t.muted}>Costo de la solución ($120.000)</text>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={!developed} onClick={() => setDeveloped(false)}>Solo un problema</Pill><Pill isDark={isDark} on={developed} onClick={() => setDeveloped(true)}>Problema desarrollado</Pill></div>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={developed ? 'd' : 's'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${developed ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{developed ? 'Después de preguntar por las implicaciones' : 'Problema y solución de inmediato'}</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{developed
                  ? 'Las máquinas difíciles de usar resultan generar rotación de operarios, más de $25.000 en capacitación, horas extra al 250%, trabajos tercerizados con peor calidad y entregas tarde. Ahora $120.000 parece razonable.'
                  : '"¿Son difíciles de usar sus máquinas?" — "Un poco, pero ya aprendimos." — "Nuestro sistema lo resuelve: cuesta $120.000." — "¡¿$120.000 solo para que sea más fácil?!"'}</p>
              </motion.div>
            </AnimatePresence>
            <p className={`text-sm ${textMuted(isDark)}`}>Recuerda que en la venta grande el costo no es solo dinero: también es el riesgo de equivocarse ante toda la empresa.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Las cuatro preguntas SPIN                                        */
/* ------------------------------------------------------------------ */

function Spin({ isDark }: SlideProps) {
  const q = [
    { k: 'S', name: 'Situación', what: 'Recogen hechos sobre la situación actual del cliente.', ex: '"¿Qué equipos usan hoy? ¿Cuántas personas los operan?"', research: 'No se asocian al éxito: en las llamadas exitosas se hacen menos. Los novatos hacen más.', tip: 'Haz tu tarea antes de la reunión y pregunta solo lo necesario: aburren al cliente.' },
    { k: 'P', name: 'Problema', what: 'Buscan problemas, dificultades o insatisfacciones: las necesidades implícitas.', ex: '"¿Les cuesta procesar los picos de trabajo con el sistema actual?"', research: 'Muy ligadas al éxito en ventas pequeñas; poco en las grandes. Son la materia prima. En Fuji Xerox (Japón), entrenarlas subió las ventas 74%.', tip: 'Antes de la reunión, anota tres problemas que podrías resolver.' },
    { k: 'I', name: 'Implicación', what: 'Exploran las consecuencias del problema y lo hacen más grande y urgente.', ex: '"¿Qué efecto tiene esa dificultad en su producción y en sus costos?"', research: 'Las más ligadas al éxito en ventas grandes, sobre todo con quienes deciden. Aun así, solo 1 de cada 20 preguntas es de implicación.', tip: 'Son las más difíciles de formular: prepáralas por escrito antes de la reunión.' },
    { k: 'N', name: 'Necesidad-beneficio', what: 'Preguntan por el valor de resolver el problema; el cliente enuncia los beneficios.', ex: '"¿En qué le ayudaría poder controlar las llamadas de larga distancia?"', research: 'Los clientes califican esas llamadas como positivas, constructivas y útiles. Pero en casi la mitad de las llamadas no se hizo ninguna.', tip: 'No las hagas al inicio ni sobre necesidades que no puedes cubrir.' },
  ];
  const [active, setActive] = useState(2);
  const a = q[active];
  return (
    <Shell isDark={isDark} title="Las cuatro preguntas de" highlight="SPIN" subtitle="Una descripción de cómo preguntan los mejores en un buen día, no una fórmula rígida: si el cliente llega con una necesidad explícita, puedes saltar a la N. Toca cada bloque.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] min-h-0 flex items-center">
          <svg viewBox="0 0 520 280" className="w-full h-full overflow-visible" aria-label="Cuatro bloques ascendentes: S, P, I y N">
            <SceneDefs id="spn" isDark={isDark} />
            {q.map((x, i) => {
              const gx = 80 + i * 120;
              const h = 36 + i * 32;
              const cy = 240 - i * 16 - h;
              const on = i === active;
              return (
                <Lift key={x.k} on={on} dimmed={false} onClick={() => setActive(i)} lift={14}>
                  <g filter="url(#spn-sh)"><LetterCube cx={gx} cy={cy} s={46} h={h} letter={x.k} f={on ? BRAND : i >= 2 ? PEACH : NEUTRAL(isDark)} light={on || i >= 2 || isDark} /></g>
                  <text x={gx} y={cy - 36} textAnchor="middle" fontSize={12} fontWeight={900} fill={on ? ORANGE : t(isDark)}>{x.name}</text>
                </Lift>
              );
            })}
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className={`p-6 rounded-3xl ${panelClass(isDark)}`}>
              <div className="flex items-center gap-4 mb-3">
                <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white text-3xl font-black flex items-center justify-center shadow-lg shadow-red-500/30">{a.k}</span>
                <h3 className={`text-2xl font-black ${heading(isDark)}`}>Preguntas de {a.name.toLowerCase()}</h3>
              </div>
              <p className={`text-base leading-snug mb-3 ${heading(isDark)}`}>{a.what}</p>
              <p className={`text-sm italic mb-3 ${textMuted(isDark)}`}>{a.ex}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><p className={microLabel(isDark)}>Qué mostró la investigación</p><p className={`text-sm ${textMuted(isDark)}`}>{a.research}</p></div>
                <div><p className={microLabel(isDark)}>Consejo práctico</p><p className={`text-sm ${textMuted(isDark)}`}>{a.tip}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}
const t = (isDark: boolean) => sceneTone(isDark).text;

/* ------------------------------------------------------------------ */
/* 10. Las preguntas de implicación en acción                          */
/* ------------------------------------------------------------------ */

function Implicacion({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const steps = [
    { q: '¿Son difíciles de usar sus máquinas?', a: 'Un poco, pero ya entrenamos a tres personas.', cost: 'Problema pequeño' },
    { q: 'Si solo tres saben usarlas, ¿qué pasa cuando uno se va?', a: 'Sufrimos hasta entrenar al reemplazo… la gente no dura.', cost: 'Rotación de operarios' },
    { q: '¿Cuánto les cuesta entrenar a cada operario?', a: 'Unos $5.000 cada uno; este año ya van cinco.', cost: '$25.000 en capacitación' },
    { q: '¿Y cómo cubren los cuellos de botella?', a: 'Con horas extra al 250% o mandando trabajo afuera.', cost: 'Horas extra y tercerización' },
    { q: '¿Tercerizar afecta la calidad y los plazos?', a: '¡Es lo que más me molesta! Hoy perdí tres horas persiguiendo una entrega.', cost: 'Calidad y entregas' },
  ];
  const [n, setN] = useState(0);
  return (
    <Shell isDark={isDark} title="Implicación: cómo un problema" highlight="pequeño se vuelve grande" subtitle="Un ejemplo del libro: la máquina «difícil de usar» que nadie consideraba urgente. Avanza pregunta por pregunta.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[42%] min-h-0 flex flex-col items-center justify-center">
          <svg viewBox="0 0 320 340" className="w-full h-full max-h-[380px] overflow-visible" aria-label="Una pila que crece con cada consecuencia descubierta">
            <SceneDefs id="imp" isDark={isDark} />
            <IsoFloor cx={160} cy={272} s={110} fill={tone.floor} />
            {steps.slice(0, n + 1).map((s, i) => (
              <motion.g key={i} initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
                <g filter="url(#imp-sh)"><IsoBox cx={160} cy={232 - i * 40} s={70} h={34} f={i === 0 ? NEUTRAL(isDark) : i < 3 ? PEACH : BRAND} /></g>
                <text x={112} y={232 - i * 40 + 42} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">{i + 1}</text>
              </motion.g>
            ))}
            <text x={160} y={334} textAnchor="middle" fontSize={12} fontWeight={800} fill={tone.muted}>Lo que el cliente ve ahora</text>
          </svg>
        </div>
        <div className="lg:w-[58%] flex flex-col gap-3 justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={n} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-2">
              <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>Vendedor · pregunta {n === 0 ? 'de problema' : 'de implicación'}</p><p className={`text-lg font-bold ${heading(isDark)}`}>{steps[n].q}</p></div>
              <div className={`p-4 rounded-2xl ml-8 ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Cliente</p><p className={`text-base ${textMuted(isDark)}`}>{steps[n].a}</p></div>
              <p className="text-sm font-black text-[#ff851d] ml-8">+ {steps[n].cost}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-2">
            <button onClick={() => setN(Math.max(0, n - 1))} className={`p-2 rounded-full ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-100 text-gray-600'} ${n === 0 ? 'opacity-40 pointer-events-none' : ''}`} aria-label="Pregunta anterior"><ChevronLeft size={18} /></button>
            <div className="flex gap-1.5">{steps.map((_, i) => <span key={i} className={`h-2 rounded-full transition-all ${i <= n ? 'w-6 bg-gradient-to-r from-[#ff851d] to-[#ef375c]' : `w-2 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}`} />)}</div>
            <button onClick={() => setN(Math.min(steps.length - 1, n + 1))} className={`p-2 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30 ${n === steps.length - 1 ? 'opacity-40 pointer-events-none' : ''}`} aria-label="Siguiente pregunta"><ChevronRight size={18} /></button>
          </div>
          {n === steps.length - 1 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-orange-50 text-gray-700'}`}>Resumen del cliente: <em>«Visto así, esas máquinas nos están generando un problema muy serio»</em>. Recién ahí tiene sentido hablar de la solución.</motion.p>
          )}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Necesidad-beneficio                                             */
/* ------------------------------------------------------------------ */

function NeedPayoff({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const [mode, setMode] = useState<'impl' | 'need'>('impl');
  return (
    <Shell isDark={isDark} title="Necesidad-beneficio:" highlight="que el cliente diga por qué le sirve" subtitle="Las preguntas de implicación agrandan el problema; las de necesidad-beneficio cambian el foco hacia la solución.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 360 260" className="w-full h-full max-h-[300px] overflow-visible" aria-label="El ánimo de la conversación según el tipo de pregunta">
              <SceneDefs id="npo" isDark={isDark} />
              <IsoFloor cx={180} cy={200} s={140} fill={tone.floor} />
              <motion.g animate={{ y: mode === 'need' ? -50 : 20 }} transition={{ type: 'spring', stiffness: 60, damping: 10 }}>
                <PulseDisc cx={180} cy={150} rx={mode === 'need' ? 90 : 40} ry={mode === 'need' ? 36 : 16} dur={2} color={mode === 'need' ? ORANGE : '#64748b'} />
                <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                  <Orb id="npo" cx={180} cy={110} r={30} neutral={mode === 'impl'} />
                </motion.g>
              </motion.g>
              <text x={180} y={248} textAnchor="middle" fontSize={12} fontWeight={800} fill={mode === 'need' ? ORANGE : tone.muted}>{mode === 'need' ? 'Foco en la solución: ánimo positivo' : 'Foco en el problema: el cliente se tensa'}</text>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={mode === 'impl'} onClick={() => setMode('impl')}>Solo implicación</Pill><Pill isDark={isDark} on={mode === 'need'} onClick={() => setMode('need')}>+ Necesidad-beneficio</Pill></div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl border-l-4 border-gray-400 ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={microLabel(isDark)}>El riesgo de la implicación</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Hacen que el problema se sienta peor y pueden deprimir al cliente. Rackham bromea: Sócrates era un maestro de las implicaciones… y terminó bebiendo cicuta.</p>
            </div>
            <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que logran las de necesidad-beneficio</p>
              <ul className={`text-sm space-y-1.5 mt-1 ${textMuted(isDark)}`}>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#ff851d] shrink-0 mt-0.5" />Llevan la atención a la solución y crean un clima positivo.</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#ff851d] shrink-0 mt-0.5" />El <strong>cliente</strong> enuncia los beneficios: «nos ayudaría a mejorar la atención».</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#ff851d] shrink-0 mt-0.5" />Ese cliente luego le vende la idea a sus colegas con sus propias palabras.</li>
              </ul>
            </div>
            <p className={`text-sm italic ${textMuted(isDark)}`}>«¿Por qué es importante para usted resolverlo?» · «¿De qué otra forma le ayudaría?»</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Características, ventajas y beneficios                          */
/* ------------------------------------------------------------------ */

function Fab({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const items = [
    { k: 'C', name: 'Característica', def: 'Describe hechos o datos del producto.', ex: '"Tiene estabilización de voltaje balanceada."', impact: 'Neutras en general (18.000 llamadas analizadas); usadas temprano en una venta grande, restan. Los usuarios técnicos las aprecian más que quienes deciden.', h: 30 },
    { k: 'V', name: 'Ventaja', def: 'Muestra cómo el producto se puede usar o puede ayudar (lo que suele enseñarse como "beneficio").', ex: '"Con nuestra edición, sus errores bajarían más de 20%."', impact: 'Ayudan algo en la primera visita, pero pierden fuerza a lo largo del ciclo hasta valer lo mismo que una característica.', h: 60 },
    { k: 'B', name: 'Beneficio', def: 'Muestra cómo el producto satisface una necesidad explícita que el cliente expresó.', ex: '"Usted dijo que necesita respaldo: este sistema se lo da."', impact: 'Alto impacto en todo el ciclo. En 5.000 llamadas de alta tecnología fueron mucho más frecuentes en las exitosas; las ventajas, no.', h: 130 },
  ];
  const effects = [
    ['Características', 'preocupación por el precio'],
    ['Ventajas', 'objeciones'],
    ['Beneficios', 'apoyo y aprobación'],
  ];
  const [active, setActive] = useState(2);
  const a = items[active];
  return (
    <Shell isDark={isDark} title="Demostrar capacidad:" highlight="el beneficio responde a lo que pidió el cliente" subtitle="Desde los años veinte se enseña que un beneficio es mostrar cómo algo ayuda. Rackham encontró que, en ventas grandes, eso no basta.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex items-center">
            <svg viewBox="0 0 460 270" className="w-full h-full overflow-visible" aria-label="Impacto de características, ventajas y beneficios en ventas grandes">
              <SceneDefs id="fab" isDark={isDark} />
              {items.map((x, i) => {
                const gx = 100 + i * 130;
                const cy = 220 - x.h;
                const on = i === active;
                return (
                  <Lift key={x.k} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#fab-sh)"><LetterCube cx={gx} cy={cy} s={44} h={x.h} letter={x.k} f={i === 2 ? BRAND : i === 1 ? PEACH : NEUTRAL(isDark)} light={i > 0 || isDark} /></g>
                    <text x={gx} y={262} textAnchor="middle" fontSize={12} fontWeight={900} fill={on ? ORANGE : tone.text}>{x.name}</text>
                  </Lift>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${active === 2 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-xl font-black mb-1 ${heading(isDark)}`}>{a.name}</h3>
                <p className={`text-base leading-snug mb-2 ${heading(isDark)}`}>{a.def}</p>
                <p className={`text-sm italic mb-2 ${textMuted(isDark)}`}>{a.ex}</p>
                <p className={microLabel(isDark)}>Impacto en ventas grandes</p>
                <p className={`text-sm ${textMuted(isDark)}`}>{a.impact}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que provoca cada una en el cliente (estudio de Linda Marsh)</p>
              <div className="flex flex-col gap-1.5 mt-1">
                {effects.map(([a, b], i) => (
                  <div key={a} className="flex items-center gap-2 text-sm">
                    <span className={`w-28 font-black ${i === 2 ? 'text-[#ff851d]' : heading(isDark)}`}>{a}</span>
                    <ChevronRight size={14} className={i === 2 ? 'text-[#ff851d]' : 'text-gray-400'} />
                    <span className={textMuted(isDark)}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 13. Prevenir objeciones                                             */
/* ------------------------------------------------------------------ */

function Objeciones({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const [prevent, setPrevent] = useState(false);
  const count = prevent ? 4 : 9;
  return (
    <Shell isDark={isDark} title="Mejor prevenir que" highlight="manejar objeciones" subtitle="En la venta grande, la habilidad de manejar objeciones aporta poco. Los mejores las evitan antes de que aparezcan.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 360 260" className="w-full h-full max-h-[300px] overflow-visible" aria-label="Pila de objeciones que se reduce al prevenirlas">
              <SceneDefs id="obj" isDark={isDark} />
              <IsoFloor cx={180} cy={210} s={140} fill={tone.floor} />
              <AnimatePresence>
                {Array.from({ length: count }, (_, i) => {
                  const col = i % 3;
                  const row = Math.floor(i / 3);
                  return (
                    <motion.g key={i} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.4 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 12 }}>
                      <g filter="url(#obj-sh)"><IsoBox cx={140 + col * 40} cy={186 - row * 30} s={20} h={26} f={prevent ? PEACH : SLATE(isDark)} /></g>
                    </motion.g>
                  );
                })}
              </AnimatePresence>
              <text x={180} y={252} textAnchor="middle" fontSize={12} fontWeight={800} fill={prevent ? ORANGE : tone.muted}>{prevent ? 'Objeciones por hora: −55%' : 'Objeciones por hora de venta'}</text>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={!prevent} onClick={() => setPrevent(false)}>Antes</Pill><Pill isDark={isDark} on={prevent} onClick={() => setPrevent(true)}>Tras entrenar en prevención</Pill></div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            {[
              ['Mito · «más objeciones, más interés»', 'En 694 llamadas, mientras más objeciones hacía el cliente, menos probable era el éxito. Una objeción es una barrera, no una oportunidad disfrazada.'],
              ['Dato · las provoca el vendedor', 'En equipos de 8 personas que vendían lo mismo, una recibía hasta diez veces más objeciones por hora que otra. Los diez con más objeciones daban más ventajas que el promedio.'],
              ['Caso · vendedores reclutados de la competencia', 'Venían de vender equipos japoneses baratos con un estilo cargado de características. Con un producto más caro recibieron 30% más objeciones de precio: las características aumentan la sensibilidad al precio.'],
              ['Señales · cuándo son evitables', 'Objeciones temprano en la reunión (casi nadie objeta una pregunta) u objeciones de valor: «es caro», «no vale la pena cambiar».'],
            ].map(([a, b], i) => (
              <motion.div key={a} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className={`p-3 rounded-2xl ${i === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-sm font-black mb-0.5 ${heading(isDark)}`}>{a}</h3>
                <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>Trata la causa, no el síntoma: <strong>desarrolla necesidades explícitas antes de ofrecer la solución</strong>. Las objeciones reales (algo que no puedes cubrir) seguirán existiendo; ahí sí, trátalas con honestidad.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Las técnicas de cierre                                          */
/* ------------------------------------------------------------------ */

function Cierre({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Las técnicas de cierre:" highlight="útiles en lo pequeño, dañinas en lo grande" subtitle="El cierre asumido, el alternativo, el «última oportunidad»… Rackham las midió en una cadena de tiendas de fotografía.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className={`lg:w-[55%] p-5 rounded-3xl flex flex-col justify-center gap-4 ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Ventas logradas antes y después de entrenar a los vendedores en técnicas de cierre</p>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
              <p className={`text-sm font-black mb-2 ${heading(isDark)}`}>Productos baratos</p>
              <Bar isDark={isDark} label="Antes" value={72} max={100} suffix="%" brand={false} delay={0.2} />
              <div className="h-2" />
              <Bar isDark={isDark} label="Después" value={76} max={100} suffix="%" delay={0.4} />
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
              <p className={`text-sm font-black mb-2 ${heading(isDark)}`}>Productos caros</p>
              <Bar isDark={isDark} label="Antes" value={42} max={100} suffix="%" brand={false} delay={0.6} />
              <div className="h-2" />
              <div>
                <div className="flex justify-between text-sm mb-1"><span className={`font-bold ${textMuted(isDark)}`}>Después</span><span className="font-black text-[#ef375c]">33%</span></div>
                <div className={`h-4 rounded-full overflow-hidden ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'}`}><motion.div className="h-full rounded-full bg-[#ef375c]" initial={{ width: 0 }} animate={{ width: '33%' }} transition={{ delay: 0.8, duration: 0.9 }} /></div>
              </div>
            </div>
          </div>
          <div className="lg:w-[45%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que encontró</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Con productos baratos, cerrar más subió levemente las ventas (sin significancia estadística). Con productos caros, <strong>las bajó de 42% a 33%</strong>. Los compradores profesionales reaccionan con antagonismo ante cualquier técnica que vaya más allá de pedir el pedido.</p>
            </div>
            <div className={`p-4 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>Ojo con las promesas</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Una gran empresa de capacitación aseguraba que su curso de cierre subía las ventas 30%. Su «investigación» era la carta de un cliente que vendía suscripciones de revistas puerta a puerta.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Obtener compromiso (y la apertura)                              */
/* ------------------------------------------------------------------ */

function Compromiso({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const steps = [
    { name: 'Invierte en la investigación', text: 'Los exitosos dedican más tiempo a preguntar. Un cliente que siente la necesidad muchas veces cierra la venta por ti.' },
    { name: 'Verifica las preocupaciones clave', text: '«Antes de seguir, ¿hay algo que quiera que le explique mejor?». La duda aparece como consulta, no como protesta ante un cierre.' },
    { name: 'Resume los beneficios', text: 'En una reunión larga, el cliente no retiene todo. Recapitula cómo respondes a sus necesidades explícitas.' },
    { name: 'Propón un compromiso', text: 'Aquí los mejores no preguntan: proponen. «Lo lógico sería que usted y su contador vean el sistema funcionando.»' },
  ];
  const [active, setActive] = useState(3);
  return (
    <Shell isDark={isDark} title="Obtener compromiso:" highlight="cuatro acciones simples" subtitle="Si los trucos de cierre no sirven en lo grande y no cerrar tampoco, ¿qué hacían los mejores? Algo mucho más sencillo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 540 292" className="w-full h-full overflow-visible" aria-label="Cuatro escalones para obtener compromiso">
              <SceneDefs id="com" isDark={isDark} />
              {steps.map((s, i) => {
                const gx = 80 + i * 125;
                const h = 30 + i * 36;
                const cy = 236 - i * 14 - h;
                const on = i === active;
                return (
                  <Lift key={s.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#com-sh)"><LetterCube cx={gx} cy={cy} s={48} h={h} letter={String(i + 1)} f={on ? BRAND : i === 0 ? NEUTRAL(isDark) : PEACH} light={on || i > 0 || isDark} /></g>
                  </Lift>
                );
              })}
              <motion.g animate={{ x: 80 + active * 125, y: 236 - active * 14 - (30 + active * 36) - 40 }} transition={{ type: 'spring', stiffness: 70, damping: 12 }}>
                <motion.g animate={{ y: [0, -12, 0] }} transition={{ duration: 1.1, repeat: Infinity }}><Orb id="com" cx={0} cy={0} r={12} /></motion.g>
              </motion.g>
              <text x={270} y={286} textAnchor="middle" fontSize={12} fontWeight={800} fill={tone.muted}>Investigar · verificar · resumir · proponer</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2 justify-center">
            {steps.map((s, i) => (
              <motion.button key={s.name} whileHover={{ x: 4 }} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`text-left p-3 rounded-2xl ${i === active ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-sm font-black ${heading(isDark)}`}><span className="text-[#ff851d]">{i + 1}.</span> {s.name}</h3>
                <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{s.text}</p>
              </motion.button>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}><strong>¿Qué compromiso proponer?</strong> Uno que haga avanzar la venta y que sea el más alto que el cliente pueda dar de forma realista. Para un compromiso grande, como acceder a quien decide, necesitas haber construido mucho valor.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 16. De la teoría a la práctica                                      */
/* ------------------------------------------------------------------ */

function Practica({ isDark }: SlideProps) {
  const rules = [
    ['Practica una conducta a la vez', 'Si intentas mejorar todo junto, no mejoras nada. Por ejemplo, solo preguntas de implicación.'],
    ['Pruébala al menos tres veces', 'Lo nuevo incomoda: de 200 golfistas, 157 jugaron peor después de su clase. No juzgues antes del tercer intento.'],
    ['Cantidad antes que calidad', 'Como al aprender un idioma: primero úsalo mucho, después púlelo.'],
    ['Practica en situaciones seguras', 'Empieza con clientes pequeños o conocidos, no con la cuenta más importante del año.'],
  ];
  return (
    <Shell isDark={isDark} title="De la teoría a la práctica:" highlight="el caso Newcastle" subtitle="Xerox probó el método en una de sus sucursales de peor desempeño, con 35 vendedores.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className={`lg:w-[45%] p-5 rounded-3xl flex flex-col justify-center gap-4 ${featuredClass(isDark)}`}>
          <p className={microLabel(isDark)}>Llamadas necesarias para conseguir un pedido</p>
          <Bar isDark={isDark} label="Antes del entrenamiento" value={48} max={50} brand={false} delay={0.2} />
          <Bar isDark={isDark} label="Después del entrenamiento" value={24} max={50} delay={0.5} />
          <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Newcastle pasó a ser la mejor sucursal del país. Pero fíjate en la honestidad del caso: un estudio independiente encargado por Xerox concluyó que, de las <strong>16 posiciones</strong> que subió, <strong>5 se explicaban por otros factores</strong> de marketing.</p>
        </div>
        <div className="lg:w-[55%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>Las cuatro reglas de oro para aprender una habilidad</p>
          {rules.map(([a, b], i) => (
            <motion.div key={a} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className={`p-3.5 rounded-2xl flex gap-3 ${panelClass(isDark)}`}>
              <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white font-black flex items-center justify-center shadow-md shadow-red-500/30">{i + 1}</span>
              <span><span className={`block text-sm font-black ${heading(isDark)}`}>{a}</span><span className={`block text-sm ${textMuted(isDark)}`}>{b}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 17. Pensamiento crítico                                             */
/* ------------------------------------------------------------------ */

function Critico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Pensamiento crítico:" highlight="¿por qué SPIN resiste mejor el escrutinio?" subtitle="SPIN es de las pocas metodologías comerciales que la academia asimiló. Veamos qué la hace sólida y dónde están sus límites.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
            <div className="flex items-center gap-3 mb-3"><span className="p-2.5 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30"><FlaskConical size={20} /></span><h3 className={`text-lg font-black ${heading(isDark)}`}>Lo que la hace sólida</h3></div>
            <ul className={`text-sm space-y-2 ${textMuted(isDark)}`}>
              {['Observación directa de miles de llamadas, con observadores entrenados hasta un acuerdo de r = 0,9.', 'Mide el éxito por el resultado de cada llamada, no por la fama del vendedor, para evitar el efecto halo.', 'Distingue correlación de causa: por eso entrena y compara con grupos de control.', 'Admite sus errores y publica correcciones que reducen su propio éxito (Newcastle, Hawthorne).', 'Coherente con lo que la academia validó sobre orientación al cliente (SOCO).'].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 size={16} className="text-[#ff851d] shrink-0 mt-0.5" />{x}</li>)}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
            <div className="flex items-center gap-3 mb-3"><span className="p-2.5 rounded-xl bg-[#ef375c] text-white shadow-lg"><AlertTriangle size={20} /></span><h3 className={`text-lg font-black ${heading(isDark)}`}>Sus límites</h3></div>
            <ul className={`text-sm space-y-2 ${textMuted(isDark)}`}>
              {['Huthwaite es la empresa de Rackham y vende capacitación en SPIN: hay un interés comercial.', 'Los datos se publicaron en libros, no en revistas con revisión por pares; el propio Rackham dice que la academia casi no usa la observación por su costo.', 'Se investigó desde fines de los 60 hasta los 80, sobre todo en ventas grandes de tecnología y equipos.', 'Según el autor, el modelo predice mejor las primeras etapas del ciclo que las finales.', 'Un riesgo práctico: convertir las cuatro preguntas en un guion rígido.'].map((x) => <li key={x} className="flex gap-2"><ChevronRight size={16} className="text-[#ef375c] shrink-0 mt-0.5" />{x}</li>)}
            </ul>
          </motion.div>
        </div>
        <Footer isDark={isDark}>El propio Rackham te da la herramienta: <strong>desconfía de lo que dicen los expertos, incluido él, y observa qué funciona</strong> en tus propias reuniones.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 18. Síntesis                                                        */
/* ------------------------------------------------------------------ */

function Sintesis({ isDark }: SlideProps) {
  const chips = ['Busca avances, no continuaciones', 'Abre ganándote el derecho a preguntar', 'Pocas preguntas de situación', 'Descubre problemas', 'Planifica sus implicaciones', 'Que el cliente diga el beneficio', 'Beneficios, no ventajas', 'Previene objeciones', 'Propón un compromiso realista', 'Practica una conducta a la vez', 'Mide antes de creer'];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 520 150" className="w-full max-w-md mb-3 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="sps" isDark={isDark} />
        {['S', 'P', 'I', 'N'].map((k, i) => (
          <motion.g key={k} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, type: 'spring', stiffness: 110, damping: 12 }}>
            <Float amp={4} dur={2.6} delay={i * 0.2}>
              <g filter="url(#sps-sh)"><LetterCube cx={110 + i * 100} cy={80} s={36} h={34} letter={k} f={i >= 2 ? BRAND : PEACH} /></g>
            </Float>
          </motion.g>
        ))}
      </svg>
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold text-[#ff851d] z-10">Síntesis</p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter z-10 max-w-4xl ${heading(isDark)}`}>
        En la venta grande, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">quien pregunta mejor, vende mejor</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-3xl mb-6 z-10">
        {chips.map((c) => (
          <span key={c} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300 shadow-lg shadow-black/40' : 'bg-white text-gray-700 shadow-md shadow-gray-200'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`max-w-3xl text-base md:text-xl font-medium leading-relaxed z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        No se trata de convencer con razones, sino de ayudar al cliente a descubrir, con sus propias palabras, <strong>por qué necesita actuar</strong>.
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* N1. Planificar las preguntas de implicación                         */
/* ------------------------------------------------------------------ */

function Planificar({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const branches = [
    { name: 'Falta de operarios', qs: ['¿Cuánto les cuestan las horas extra para cubrirlos?', '¿Qué tan difícil es reclutar a alguien que sepa usarlas?'] },
    { name: 'Rotación', qs: ['¿Cuánto cuesta entrenar a cada reemplazo?', '¿Cuánto tarda alguien en ser productivo?'] },
    { name: 'Cuellos de botella', qs: ['¿Qué efecto tiene en sus plazos de producción?', '¿Cuántas veces han tenido que rechazar trabajo?'] },
    { name: 'Trabajo afuera', qs: ['¿Cómo afecta eso la calidad?', '¿Qué pasa con los plazos de entrega?'] },
  ];
  const pos: [number, number][] = [[110, 105], [400, 105], [110, 245], [400, 245]];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="Planifica las implicaciones:" highlight="no salen solas en la reunión" subtitle="Incluso las personas más hábiles que estudió Huthwaite rara vez hacían preguntas de implicación sin haberlas preparado antes.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex flex-col items-center justify-center">
            <svg viewBox="0 0 510 340" className="w-full h-full max-h-[380px] overflow-visible" aria-label="Un problema central con cuatro dificultades relacionadas">
              <SceneDefs id="pla" isDark={isDark} />
              <IsoFloor cx={255} cy={195} s={230} fill={tone.floor} />
              {branches.map((_, i) => <Traveler key={i} id="pla" path={hop([255, 145], pos[i], 30)} dur={1.3} delay={i * 0.35} repeatDelay={1.4} r={i === active ? 6 : 4} color={i === active ? ORANGE : '#94a3b8'} />)}
              <Float amp={4} dur={3}>
                <g filter="url(#pla-sh)"><IsoBox cx={255} cy={150} s={60} h={46} f={BRAND} /></g>
                <text x={255} y={92} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Problema: máquinas difíciles de usar</text>
              </Float>
              {branches.map((b, i) => {
                const on = i === active;
                return (
                  <Lift key={b.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#pla-sh)"><IsoBox cx={pos[i][0]} cy={pos[i][1] + 18} s={34} h={on ? 30 : 18} f={on ? PEACH : NEUTRAL(isDark)} /></g>
                    <text x={pos[i][0]} y={pos[i][1] + 86} textAnchor="middle" fontSize={11} fontWeight={800} fill={on ? ORANGE : tone.text}>{b.name}</text>
                  </Lift>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El método en tres pasos</p>
              <ol className={`text-sm space-y-1 mt-1 ${textMuted(isDark)}`}>
                <li><strong className="text-[#ff851d]">1.</strong> Escribe un problema probable del cliente.</li>
                <li><strong className="text-[#ff851d]">2.</strong> Pregúntate a qué otras dificultades conduce.</li>
                <li><strong className="text-[#ff851d]">3.</strong> Anota las preguntas que sugiere cada dificultad.</li>
              </ol>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Preguntas que sugiere · {branches[active].name.toLowerCase()}</p>
                {branches[active].qs.map((q) => <p key={q} className={`text-sm italic mt-1 ${heading(isDark)}`}>«{q}»</p>)}
              </motion.div>
            </AnimatePresence>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>Truco de Rackham:</strong> imagina a un cliente que dice «¿Y qué? Sí, tengo ese problema, pero no es grave». Anota los argumentos con que lo convencerías y convierte cada uno en pregunta. Son el idioma de quienes deciden: «esa persona habló mi idioma».</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N2. La venta interna                                                */
/* ------------------------------------------------------------------ */

function VentaInterna({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const [mode, setMode] = useState<'prod' | 'need'>('need');
  const others: [number, number, string][] = [[380, 70, 'Finanzas'], [440, 150, 'Operaciones'], [380, 225, 'Gerencia']];
  return (
    <Shell isDark={isDark} title="La venta grande ocurre" highlight="cuando tú no estás" subtitle="En una venta compleja hay decenas de conversaciones internas sin ti. Las preguntas de necesidad-beneficio ensayan al cliente para que venda por ti.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 520 310" className="w-full h-full max-h-[330px] overflow-visible" aria-label="El cliente lleva el mensaje a otras áreas">
              <SceneDefs id="vin" isDark={isDark} />
              <IsoFloor cx={300} cy={160} s={200} fill={tone.floor} />
              <g opacity={0.55}><Orb id="vin" cx={70} cy={150} r={20} neutral /></g>
              <text x={70} y={200} textAnchor="middle" fontSize={11} fontWeight={800} fill={tone.muted}>Tú (fuera)</text>
              <g filter="url(#vin-sh)"><IsoBox cx={230} cy={160} s={50} h={44} f={BRAND} /></g>
              <text x={230} y={252} textAnchor="middle" fontSize={11} fontWeight={900} fill={tone.text}>Tu contacto</text>
              {others.map(([x, y, n], i) => (
                <g key={n}>
                  <g filter="url(#vin-sh)"><IsoBox cx={x} cy={y} s={30} h={24} f={mode === 'need' ? PEACH : NEUTRAL(isDark)} /></g>
                  <text x={x} y={y + 56} textAnchor="middle" fontSize={10} fontWeight={800} fill={tone.text}>{n}</text>
                  <Traveler id="vin" path={hop([230, 120], [x, y - 20], 24)} dur={mode === 'need' ? 1.1 : 2.6} delay={i * 0.4} repeatDelay={mode === 'need' ? 0.3 : 2.4} r={mode === 'need' ? 6 : 3} color={mode === 'need' ? ORANGE : '#94a3b8'} />
                </g>
              ))}
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={mode === 'prod'} onClick={() => setMode('prod')}>Le das datos del producto</Pill><Pill isDark={isDark} on={mode === 'need'} onClick={() => setMode('need')}>Le preguntas por el beneficio</Pill></div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${mode === 'need' ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{mode === 'need' ? 'Con preguntas de necesidad-beneficio' : 'Dándole argumentos para repetir'}</p>
                {mode === 'need' ? (
                  <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>«¿Qué beneficio tendría bajar el inventario?» — «El costo.» — «¿Es lo más importante para su director de finanzas?» — «Ahora que lo pienso… si bajamos un 5%, podríamos cerrar la bodega del centro: <strong>unos $250.000 al año</strong>. Le pediré 15 minutos antes de la reunión.»</p>
                ) : (
                  <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>«Dígale que tenemos etiquetado de auditoría automático.» — «¿Etiquetado de qué?» — «Y que en otra empresa bajamos el inventario 12%.» — «Eh… mañana quizá no sea buen día para él…». El cliente no entiende el producto lo suficiente para explicarlo.</p>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[['Habla de lo que conoce', 'Su negocio y sus necesidades, no tu producto.'], ['Ensaya contigo', 'Te explica los beneficios a ti antes de explicárselos a otros.'], ['Se entusiasma', 'Siente que la solución también es idea suya.']].map(([a, b]) => (
                <div key={a} className={`p-3 rounded-2xl ${panelClass(isDark)}`}><p className={`text-sm font-black ${heading(isDark)}`}>{a}</p><p className={`text-xs ${textMuted(isDark)}`}>{b}</p></div>
              ))}
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>«En las ventas grandes eres el director de la obra, no el actor: tu trabajo está en los ensayos.» — gerente de ventas citado por Rackham. Además, cuando tu solución resuelve solo parte de un problema complejo, que el cliente diga qué partes resuelve <strong>evita objeciones</strong>.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N3. La regla de Quincy (ejercicio)                                  */
/* ------------------------------------------------------------------ */

function Quincy({ isDark }: SlideProps) {
  const items = [
    { q: '¿La lentitud de su sistema genera cuellos de botella en otras áreas?', a: 'I' },
    { q: '¿Y la etapa de preparación es algo que le gustaría acelerar?', a: 'N' },
    { q: 'Como la preparación usa tanta mano de obra, ¿ese tiempo aumenta mucho sus costos?', a: 'I' },
    { q: '¿Qué impacto tiene eso en su competitividad, con márgenes tan bajos?', a: 'I' },
    { q: 'Entonces, ¿le gustaría reducir el costo de preparación?', a: 'N' },
    { q: '¿De qué otra forma le ayudaría?', a: 'N' },
  ];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const score = items.filter((it, i) => answers[i] === it.a).length;
  const done = Object.keys(answers).length;
  return (
    <Shell isDark={isDark} title="¿Implicación o necesidad-beneficio?" highlight="la regla de Quincy" subtitle="Hasta el equipo de Huthwaite discutía cómo clasificarlas. Un niño de ocho años lo resolvió: «las de implicación son tristes; las de necesidad-beneficio, felices».">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[62%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>Ejercicio del libro · clasifica cada pregunta del vendedor</p>
          {items.map((it, i) => {
            const ans = answers[i];
            const ok = ans === it.a;
            return (
              <div key={i} className={`p-2.5 rounded-2xl flex items-center gap-3 ${ans ? (ok ? featuredClass(isDark) : panelClass(isDark)) : panelClass(isDark)}`}>
                <span className={`text-sm flex-1 ${heading(isDark)}`}><span className="font-black text-[#ff851d]">{i + 1}.</span> {it.q}</span>
                {(['I', 'N'] as const).map((k) => (
                  <button key={k} onClick={() => setAnswers({ ...answers, [i]: k })} className={`shrink-0 w-9 h-9 rounded-xl text-sm font-black transition ${ans === k ? (ok ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30' : 'bg-gray-400 text-white') : isDark ? 'bg-[#333] text-gray-300' : 'bg-gray-100 text-gray-600'}`} aria-label={k === 'I' ? 'Implicación' : 'Necesidad-beneficio'}>{k}</button>
                ))}
                {ans && (ok ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-[#ef375c] shrink-0" />)}
              </div>
            );
          })}
          <p className={`text-xs ${textMuted(isDark)}`}>{done === items.length ? `Acertaste ${score} de ${items.length}. Solución del libro: implicación 1, 3 y 4; necesidad-beneficio 2, 5 y 6.` : 'I = implicación (centrada en el problema) · N = necesidad-beneficio (centrada en la solución)'}</p>
        </div>
        <div className="lg:w-[38%] flex flex-col gap-3 justify-center">
          <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
            <p className={microLabel(isDark)}>Error 1 · hacerlas demasiado pronto</p>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>«Si pudiera mostrarle algo interesante, ¿le interesaría?». Antes de conocer los problemas, pone al cliente a la defensiva.</p>
          </div>
          <div className={`p-4 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
            <p className={microLabel(isDark)}>Error 2 · preguntar por lo que no puedes dar</p>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>El cliente pide copias por ambas caras y tu equipo no las hace. Preguntar «¿por qué las necesita?» solo hace crecer una necesidad que no puedes cubrir. Irónicamente, cuando sí pueden cubrirla, la mayoría salta directo a la solución.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N4. La apertura                                                     */
/* ------------------------------------------------------------------ */

function Apertura({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const goals = [
    { name: 'Quién eres', text: '«Soy Neil Rackham, de Huthwaite.» Breve y directo.' },
    { name: 'Por qué estás ahí', text: 'Sin entrar en detalles del producto: eso te arrastra a hablar de precio antes de tiempo.' },
    { name: 'Tu derecho a preguntar', text: '«¿Le parece si le hago algunas preguntas sobre su capacitación actual?» Tú preguntas; el cliente informa.' },
  ];
  const [active, setActive] = useState(2);
  return (
    <Shell isDark={isDark} title="La apertura:" highlight="gánate el derecho a preguntar" subtitle="En la venta grande, la primera impresión pesa menos de lo que se cree. El objetivo de abrir es uno solo: que el cliente acepte tus preguntas.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col justify-center gap-2">
            <svg viewBox="0 0 440 240" className="w-full max-h-[250px] overflow-visible" aria-label="Tres objetivos de la apertura">
              <SceneDefs id="ape" isDark={isDark} />
              {goals.map((g, i) => {
                const gx = 80 + i * 140;
                const on = i === active;
                return (
                  <Lift key={g.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={12}>
                    <g filter="url(#ape-sh)"><LetterCube cx={gx} cy={120} s={48} h={36 + i * 12} letter={String(i + 1)} f={on ? BRAND : PEACH} /></g>
                    <text x={gx} y={226} textAnchor="middle" fontSize={11} fontWeight={900} fill={on ? ORANGE : tone.text}>{g.name}</text>
                  </Lift>
                );
              })}
            </svg>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Objetivo {active + 1} · {goals[active].name}</p>
                <p className={`text-sm ${textMuted(isDark)}`}>{goals[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-2 justify-center">
            {[
              ['Hablar de intereses personales', 'En pequeños comercios rurales ayudaba; en tiendas urbanas con ventas cinco veces mayores no tenía relación con el éxito. Un comprador de BP tenía la foto de un velero: «Odio navegar; me recuerda cuánto tiempo se pierde en el agua. ¿Qué quería?».'],
              ['La frase inicial de beneficio', 'Popularizada por un programa basado en ventas farmacéuticas de 6 minutos. En unas 300 llamadas de 40 minutos, no tuvo relación con el éxito. Y repetida en la segunda visita suena mecánica.'],
              ['Lo que sí hacían los mejores', 'Abrían cada reunión de forma distinta. Los menos eficaces usaban siempre la misma apertura.'],
            ].map(([a, b], i) => (
              <motion.div key={a} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className={`p-3 rounded-2xl ${i === 2 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-sm font-black mb-0.5 ${heading(isDark)}`}>{a}</h3>
                <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>Si dedicas <strong>más del 20% de la reunión</strong> a preliminares, es una señal de alarma. Ningún ejecutivo se queja de que un vendedor vaya al grano demasiado rápido.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N5. Ejercicio: características, ventajas o beneficios               */
/* ------------------------------------------------------------------ */

function FabQuiz({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const items = [
    { s: 'El sistema tiene estabilización de voltaje balanceada.', a: 'C', why: 'Un dato del sistema, sin decir cómo ayuda.' },
    { s: 'Lo protege de picos de corriente para que no pierda datos valiosos.', a: 'V', why: 'Muestra cómo ayuda, pero el cliente no expresó esa necesidad (y luego dice que no la tiene).' },
    { s: 'La memoria de respaldo le asegura que nunca perderá datos clave por un error.', a: 'V', why: 'Ayuda, pero nadie pidió respaldo.' },
    { s: 'El sistema básico cuesta $78.000.', a: 'C', why: 'El precio es un dato del producto.' },
    { s: '(El cliente: «necesito leer datos directo en memoria») Podrá leerlos sin conversión.', a: 'B', why: 'Responde a una necesidad explícita del cliente.' },
    { s: '(El cliente: «necesito menos de 1 error en 100.000») Tenemos menos de 1 en 1.500.000.', a: 'B', why: 'Cumple una exigencia que el cliente expresó.' },
    { s: 'Con esa tasa de error puede verificar datos de otras fuentes y ahorrarse ese proceso.', a: 'V', why: 'Otra forma de ayudar, sin necesidad expresada; el cliente la rechaza.' },
    { s: 'El sistema tiene ocho niveles de codificación.', a: 'C', why: 'Dato técnico.' },
    { s: 'Cinco niveles los define el usuario; tres son aleatorios o por tiempo.', a: 'C', why: 'Más datos del producto.' },
    { s: 'Con códigos por tiempo, sus operarios no memorizan claves y es casi imposible entrar desde fuera.', a: 'V', why: 'Muestra cómo ayuda, pero el cliente no lo pidió.' },
  ];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [tally, setTally] = useState<Record<string, number>>({ C: 0, V: 0, B: 0 });
  const [score, setScore] = useState(0);
  const it = items[i];
  const pick = (k: string) => {
    if (picked) return;
    setPicked(k);
    if (k === it.a) setScore(score + 1);
    setTally({ ...tally, [it.a]: tally[it.a] + 1 });
  };
  const next = () => { if (i < items.length - 1) { setI(i + 1); setPicked(null); } };
  const reset = () => { setI(0); setPicked(null); setTally({ C: 0, V: 0, B: 0 }); setScore(0); };
  const names: Record<string, string> = { C: 'Característica', V: 'Ventaja', B: 'Beneficio' };
  return (
    <Shell isDark={isDark} title="Ejercicio: ¿característica," highlight="ventaja o beneficio?" subtitle="Diez frases de una llamada real de venta de un sistema informático, tomadas del libro. La distinción importa: cambiar ventajas por beneficios subió ventas más de 30% en sus estudios.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[38%] min-h-0 flex flex-col items-center justify-center">
          <svg viewBox="0 0 360 230" className="w-full h-full max-h-[280px] overflow-visible" aria-label="Frases clasificadas por tipo">
            <SceneDefs id="fq" isDark={isDark} />
            <IsoFloor cx={180} cy={180} s={150} fill={tone.floor} />
            {(['C', 'V', 'B'] as const).map((k, c) => (
              <g key={k}>
                {Array.from({ length: tally[k] }, (_, n) => (
                  <motion.g key={n} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
                    <g filter="url(#fq-sh)"><IsoBox cx={90 + c * 90} cy={170 - n * 18} s={30} h={16} f={k === 'B' ? BRAND : k === 'V' ? PEACH : NEUTRAL(isDark)} /></g>
                  </motion.g>
                ))}
                <text x={90 + c * 90} y={222} textAnchor="middle" fontSize={11} fontWeight={900} fill={k === 'B' ? ORANGE : tone.text}>{names[k]}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="lg:w-[62%] flex flex-col gap-3 justify-center">
          <p className={microLabel(isDark)}>Frase {i + 1} de {items.length} · aciertos {score}</p>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
              <p className={`text-lg font-bold leading-snug ${heading(isDark)}`}>«{it.s}»</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2">
            {(['C', 'V', 'B'] as const).map((k) => (
              <button key={k} onClick={() => pick(k)} className={`flex-1 py-2.5 rounded-2xl text-sm font-black transition ${picked ? (k === it.a ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30' : picked === k ? 'bg-gray-400 text-white' : isDark ? 'bg-[#2a2a2a] text-gray-500' : 'bg-gray-100 text-gray-400') : isDark ? 'bg-[#2a2a2a] text-gray-200 hover:bg-[#333]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{names[k]}</button>
            ))}
          </div>
          {picked && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-3 rounded-2xl flex items-start gap-2 ${picked === it.a ? featuredClass(isDark) : isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
              {picked === it.a ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> : <XCircle size={18} className="text-[#ef375c] shrink-0 mt-0.5" />}
              <p className={`text-sm ${textMuted(isDark)}`}><strong>{names[it.a]}.</strong> {it.why}</p>
            </motion.div>
          )}
          <div className="flex gap-2">
            {picked && i < items.length - 1 && <button onClick={next} className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30 flex items-center gap-1">Siguiente <ChevronRight size={16} /></button>}
            {(i > 0 || picked) && <button onClick={reset} className={`px-4 py-2 rounded-full text-sm font-bold ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Reiniciar</button>}
          </div>
          {picked && i === items.length - 1 && <p className={`text-sm ${textMuted(isDark)}`}>Resultado: solo 2 de 10 frases eran beneficios. El vendedor habló mucho, pero casi nunca respondió a lo que el cliente pedía.</p>}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N6. Lanzamientos de productos                                       */
/* ------------------------------------------------------------------ */

function Lanzamientos({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const [mode, setMode] = useState<'clasico' | 'problemas'>('clasico');
  const chips = 7;
  return (
    <Shell isDark={isDark} title="Productos nuevos:" highlight="el entusiasmo es el enemigo" subtitle="¿Por qué tantos lanzamientos quedan bajo el 50% de la meta a los seis meses? Rackham encontró una causa constante.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 380 250" className="w-full h-full max-h-[290px] overflow-visible" aria-label="Producto nuevo rodeado de características o de problemas">
              <SceneDefs id="lan" isDark={isDark} />
              <IsoFloor cx={190} cy={175} s={150} fill={tone.floor} />
              <Float amp={5} dur={2.8}>
                <g filter="url(#lan-sh)"><IsoBox cx={190} cy={150} s={60} h={56} f={mode === 'clasico' ? BRAND : NEUTRAL(isDark)} /></g>
              </Float>
              {Array.from({ length: chips }, (_, i) => {
                const ang = (i / chips) * Math.PI * 2;
                const x = 190 + Math.cos(ang) * 130;
                const y = 120 + Math.sin(ang) * 55;
                return (
                  <motion.g key={`${mode}-${i}`} initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }} transition={{ delay: i * 0.06, y: { duration: 2, repeat: Infinity, delay: i * 0.2 } }} style={{ transformOrigin: `${x}px ${y}px` }}>
                    {mode === 'clasico' ? <Orb id="lan" cx={x} cy={y} r={11} neutral /> : <g filter="url(#lan-sh)"><IsoBox cx={x} cy={y + 8} s={16} h={14} f={i % 2 ? PEACH : BRAND} /></g>}
                  </motion.g>
                );
              })}
              <text x={190} y={240} textAnchor="middle" fontSize={12} fontWeight={800} fill={mode === 'problemas' ? ORANGE : tone.muted}>{mode === 'clasico' ? 'Foco en el producto: características y ventajas' : 'Foco en el cliente: problemas que resuelve'}</text>
            </svg>
            <div className="flex gap-2"><Pill isDark={isDark} on={mode === 'clasico'} onClick={() => setMode('clasico')}>Lanzamiento clásico</Pill><Pill isDark={isDark} on={mode === 'problemas'} onClick={() => setMode('problemas')}>Lanzamiento por problemas</Pill></div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que pasa en un lanzamiento clásico</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Marketing presenta todas las características con entusiasmo y el equipo comercial las repite igual frente al cliente. Con productos nuevos, los vendedores dan <strong>más del triple</strong> de características y ventajas que con productos conocidos, y preguntan menos.</p>
            </div>
            <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Experimento · equipo médico de diagnóstico</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>A un grupo pequeño ni siquiera le mostraron la máquina: solo los problemas que resolvía y las preguntas para descubrirlos en cada cuenta. En el primer año vendió <strong>54% más</strong> que el resto de la fuerza de ventas.</p>
            </div>
            <p className={`text-sm ${textMuted(isDark)}`}>Por eso las ventas de un producto nuevo suelen mejorar justo cuando el equipo deja de entusiasmarse: su atención vuelve al cliente.</p>
          </div>
        </div>
        <Footer isDark={isDark}>Ante cualquier producto nuevo, tu primera pregunta debe ser: <strong>¿qué problemas resuelve?</strong> Desde ahí planificas tus preguntas SPIN.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N7. La evidencia contra el cierre                                   */
/* ------------------------------------------------------------------ */

function CierreEvidencia({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const studies = [
    ['190 llamadas observadas', 'De las 30 con más cierres, 11 terminaron en venta; de las 30 con menos cierres, 21.'],
    ['Escala de actitud hacia el cierre', 'En una química, los 21 de 38 vendedores con actitud favorable al cierre estaban bajo su meta.'],
    ['Entrenamiento en cierre (47 vendedores)', 'Después del curso cerraban más… y lograban menos ventas.'],
    ['54 compradores profesionales', 'Si detectan una técnica de cierre: 34 menos dispuestos a comprar, 18 indiferentes, 2 más dispuestos.'],
    ['Satisfacción posventa (145 clientes)', 'Quienes compraron a vendedores entrenados en cierre quedaron menos satisfechos y con menos intención de volver.'],
  ];
  const bars = [
    { label: 'Sin cierre', v: 22 },
    { label: 'Un cierre', v: 61 },
    { label: 'Más de dos', v: 18 },
  ];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="Cinco estudios contra el cierre" highlight="y una advertencia" subtitle="Rackham empezó convencido de que el cierre era la habilidad clave. Estos son los datos que lo hicieron cambiar de idea.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] flex flex-col gap-1.5 justify-center">
            {studies.map(([a, b], i) => (
              <motion.button key={a} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`text-left p-3 rounded-2xl ${i === active ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-sm font-black ${heading(isDark)}`}>{a}</h3>
                {i === active && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{b}</motion.p>}
              </motion.button>
            ))}
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2 justify-center">
            <p className={microLabel(isDark)}>La advertencia · American Airlines, éxito según cantidad de cierres</p>
            <svg viewBox="0 0 420 200" className="w-full max-h-[200px] overflow-visible" aria-label="Sin cierre 22%, un cierre 61%, más de dos menos de 20%">
              <SceneDefs id="cev" isDark={isDark} />
              {bars.map((b, i) => {
                const x = 90 + i * 120;
                const h = b.v * 1.9;
                return (
                  <motion.g key={b.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 90, damping: 13 }}>
                    <g filter="url(#cev-sh)"><IsoBox cx={x} cy={160 - h} s={44} h={h} f={i === 1 ? BRAND : NEUTRAL(isDark)} /></g>
                    <text x={x} y={160 - h - 28} textAnchor="middle" fontSize={15} fontWeight={900} fill={i === 1 ? ORANGE : tone.text}>{i === 2 ? '<20%' : `${b.v}%`}</text>
                    <text x={x} y={196} textAnchor="middle" fontSize={11} fontWeight={800} fill={tone.muted}>{b.label}</text>
                  </motion.g>
                );
              })}
            </svg>
            <p className={`text-xs ${textMuted(isDark)}`}>No cerrar en absoluto también falla. En servicios profesionales y banca el problema suele ser el contrario: los clientes se irritan si no queda claro el siguiente paso.</p>
            <div className={`p-3 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>¿Por qué se sigue enseñando?</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>De las 116 conductas estudiadas, el cierre es la única que el pedido premia de inmediato. Y como funciona «a veces», ese refuerzo intermitente es el más adictivo. Al vendedor le parece que el cierre causó la venta, aunque la causa fueron las necesidades que desarrolló antes.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N8. Cómo aprender SPIN                                              */
/* ------------------------------------------------------------------ */

function Aprender({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const phases = [
    { k: '?', name: 'Pregunta más', text: 'Si tu estilo es contar, primero haz más preguntas de cualquier tipo durante unas semanas, hasta que preguntar se sienta tan natural como contar.' },
    { k: 'P', name: 'Problema', text: 'Apunta a unas seis preguntas de problema por reunión. Cantidad antes que calidad.' },
    { k: 'I', name: 'Implicación', text: 'Las más difíciles: requieren un par de meses de práctica y planificación por escrito.' },
    { k: 'N', name: 'Necesidad-beneficio', text: 'En vez de dar beneficios, pide que te los den: «¿Cómo le ayudaría?», «¿Qué ventajas le ve?».' },
  ];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="Cómo aprender SPIN:" highlight="en orden, y revisando cada reunión" subtitle="Leer sobre ventas no te enseña a vender, igual que leer sobre natación no te enseña a nadar. Rackham propone una secuencia.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col justify-center gap-2">
            <svg viewBox="0 0 500 230" className="w-full max-h-[250px] overflow-visible" aria-label="Cuatro fases para aprender SPIN">
              <SceneDefs id="apr" isDark={isDark} />
              {phases.map((p, i) => {
                const gx = 70 + i * 120;
                const h = 26 + i * 24;
                const cy = 170 - i * 10 - h;
                const on = i === active;
                return (
                  <Lift key={p.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#apr-sh)"><LetterCube cx={gx} cy={cy} s={42} h={h} letter={p.k} f={on ? BRAND : i === 0 ? NEUTRAL(isDark) : PEACH} light={on || i > 0 || isDark} /></g>
                  </Lift>
                );
              })}
              {phases.slice(0, -1).map((_, i) => <Traveler key={i} id="apr" path={hop([70 + i * 120, 170 - i * 10 - (26 + i * 24) - 26], [190 + i * 120, 170 - (i + 1) * 10 - (26 + (i + 1) * 24) - 26], 22)} dur={1.1} delay={i * 0.4} repeatDelay={1.4} r={4} />)}
              <text x={250} y={222} textAnchor="middle" fontSize={12} fontWeight={800} fill={tone.muted}>No pases a la siguiente hasta dominar la anterior</text>
            </svg>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Fase {active + 1} · {phases[active].name}</p>
                <p className={`text-sm ${textMuted(isDark)}`}>{phases[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Planifica, hazlo y revisa</p>
              <p className={`text-sm leading-snug mb-1 ${textMuted(isDark)}`}>Lo que más distingue a los mejores es que revisan cada reunión en detalle, nunca con un «salió bien»:</p>
              <ul className={`text-sm space-y-0.5 ${textMuted(isDark)}`}>
                {['¿Logré mi objetivo?', '¿Qué haría distinto si repitiera la reunión?', '¿Qué pregunta influyó más en el cliente?', '¿Qué necesidad cambió durante la conversación, y por qué?'].map((q) => <li key={q} className="flex gap-2"><ChevronRight size={14} className="text-[#ff851d] shrink-0 mt-1" />{q}</li>)}
              </ul>
            </div>
            <div className={`p-4 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>Un programa de $650.000 que fracasó</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Una multinacional convirtió SPIN en un modelo de 74 pasos centrado en la calidad de cada pregunta. Hubo abandono en el piloto y, en terreno, los vendedores seguían haciendo 1,6 preguntas de problema por reunión. Un programa centrado en la cantidad, por menos de un décimo del costo, llegó a una docena por reunión en los ejercicios finales.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Analiza tus productos por los <strong>problemas que resuelven</strong>, no por sus características: así es mucho más fácil planificar las preguntas.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N9. ¿Cómo saber si un método funciona?                              */
/* ------------------------------------------------------------------ */

function Evaluar({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const tests = [
    { name: '¿El modelo predice el éxito aquí?', text: 'Antes de entrenar, observa a este grupo: ¿las conductas SPIN son más frecuentes en sus llamadas exitosas? Lo que funciona en otra empresa puede no funcionar en la tuya.' },
    { name: '¿La gente cambió su conducta?', text: 'En una división de General Electric las ventas subieron 18% tras el curso, pero al observar descubrieron que nadie usaba más las conductas SPIN. El mérito no era del entrenamiento.' },
    { name: '¿Mejoró frente a un grupo de control?', text: 'Solo si pasa las dos pruebas anteriores tiene sentido medir la productividad, y siempre contra un grupo comparable que no recibió el entrenamiento.' },
  ];
  const traps = [
    ['+58% en pedidos', 'Pero hubo productos nuevos, territorios más grandes y la empresa entera creció 35%.'],
    ['+20% en Europa (Honeywell)', 'El mismo año llegó un producto revolucionario, el TDC 2000.'],
    ['+57% frente al grupo de control', 'La sucursal tenía cuatro meses de vida y el ciclo de venta duraba tres.'],
  ];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="¿Funciona de verdad?" highlight="cómo no venderte aceite de serpiente" subtitle="Rackham revisó muchos casos de «el curso duplicó las ventas»: más del 90% se explicaba mejor por otros factores del mercado o de la gestión.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] flex flex-col gap-2 justify-center">
            <p className={microLabel(isDark)}>Tres resultados engañosos sobre el propio SPIN</p>
            {traps.map(([a, b], i) => (
              <motion.div key={a} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
                <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] leading-tight">{a}</p>
                <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{b}</p>
              </motion.div>
            ))}
            <p className={`text-xs ${textMuted(isDark)}`}>Inspirado en Popper: en vez de intentar probar que funciona, intenta refutarlo y observa si resiste.</p>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2 justify-center">
            <svg viewBox="0 0 440 210" className="w-full max-h-[220px] overflow-visible" aria-label="Tres pruebas sucesivas">
              <SceneDefs id="eva" isDark={isDark} />
              {tests.map((t, i) => {
                const gx = 80 + i * 140;
                const h = 30 + i * 28;
                const on = i === active;
                return (
                  <Lift key={t.name} on={on} dimmed={!on} onClick={() => setActive(i)} lift={10}>
                    <g filter="url(#eva-sh)"><LetterCube cx={gx} cy={150 - i * 12 - h} s={46} h={h} letter={String(i + 1)} f={on ? BRAND : PEACH} /></g>
                  </Lift>
                );
              })}
              {tests.slice(0, -1).map((_, i) => <Traveler key={i} id="eva" path={hop([80 + i * 140, 150 - i * 12 - (30 + i * 28) - 26], [220 + i * 140, 150 - (i + 1) * 12 - (30 + (i + 1) * 28) - 26], 22)} dur={1.2} delay={i * 0.5} repeatDelay={1.2} r={4} />)}
              <text x={220} y={204} textAnchor="middle" fontSize={11} fontWeight={800} fill={tone.muted}>Las tres pruebas de Huthwaite</text>
            </svg>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-2xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Prueba {active + 1}</p>
                <h3 className={`text-base font-black mb-1 ${heading(isDark)}`}>{tests[active].name}</h3>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{tests[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>El «test de la sonrisa» (a la gente le gustó el curso) no mide nada. Kodak adoptó SPIN en todo el mundo por las reacciones del piloto y nunca midió la productividad.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* N10. Motorola Canadá y el efecto Hawthorne                          */
/* ------------------------------------------------------------------ */

function Motorola({ isDark }: SlideProps) {
  const tone = sceneTone(isDark);
  const [view, setView] = useState<'moto' | 'haw'>('moto');
  const metrics = [
    { label: 'Pedidos totales', spin: 17, ctrl: -13 },
    { label: 'Valor en dólares', spin: 5.3, ctrl: -22.1 },
  ];
  // Esquema ilustrativo de la figura A.16 (antes · durante · después del entrenamiento).
  const curves = [
    { name: 'Aprendieron más SPIN', pts: [0, 22, 38], f: BRAND.top },
    { name: 'Aprendieron menos SPIN', pts: [0, 30, 2], f: '#fdba74' },
    { name: 'Grupo de control', pts: [0, -8, -16], f: isDark ? '#64748b' : '#94a3b8' },
  ];
  const X = [60, 220, 380];
  const Y = (v: number) => 120 - v * 2;
  return (
    <Shell isDark={isDark} title="La prueba más rigurosa:" highlight="Motorola Canadá" subtitle="Una evaluadora independiente (Marti Bishop) aplicó las tres pruebas en 1981: 42 vendedores entrenados frente a 42 sin entrenar, durante nueve meses.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex gap-2 mb-3 shrink-0"><Pill isDark={isDark} on={view === 'moto'} onClick={() => setView('moto')}>Resultados</Pill><Pill isDark={isDark} on={view === 'haw'} onClick={() => setView('haw')}>¿Y el efecto Hawthorne?</Pill></div>
        <AnimatePresence mode="wait">
          {view === 'moto' ? (
            <motion.div key="m" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
              <div className="lg:w-[52%] min-h-0 flex items-center">
                <svg viewBox="0 0 460 300" className="w-full h-full overflow-visible" aria-label="Pedidos +17% frente a −13%; dólares +5,3% frente a −22,1%">
                  <SceneDefs id="mot" isDark={isDark} />
                  {metrics.map((m, g) => (
                    <g key={m.label}>
                      {[['SPIN', m.spin], ['Control', m.ctrl]].map(([n, v], j) => {
                        const val = v as number;
                        const x = 90 + g * 220 + j * 80;
                        const h = Math.abs(val) * 3.2;
                        const base = 140;
                        return (
                          <motion.g key={n as string} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: g * 0.2 + j * 0.1, type: 'spring', stiffness: 90, damping: 13 }}>
                            <g filter="url(#mot-sh)"><IsoBox cx={x} cy={val >= 0 ? base - h : base} s={40} h={Math.max(h, 4)} f={j === 0 ? BRAND : SLATE(isDark)} /></g>
                            <text x={x} y={val >= 0 ? base - h - 26 : base + h + 38} textAnchor="middle" fontSize={14} fontWeight={900} fill={j === 0 ? ORANGE : tone.text}>{val > 0 ? '+' : ''}{String(val).replace('.', ',')}%</text>
                            <text x={x} y={val >= 0 ? base + 34 : base - 26} textAnchor="middle" fontSize={10} fontWeight={800} fill={tone.muted}>{n}</text>
                          </motion.g>
                        );
                      })}
                      <text x={130 + g * 220} y={292} textAnchor="middle" fontSize={12} fontWeight={900} fill={tone.text}>{m.label}</text>
                    </g>
                  ))}
                </svg>
              </div>
              <div className="lg:w-[48%] flex flex-col gap-2 justify-center">
                {[
                  ['Prueba 1 · el modelo funcionaba allí', 'Las preguntas de problema, implicación y necesidad-beneficio, y los beneficios, eran significativamente más frecuentes en las llamadas exitosas.'],
                  ['Prueba 2 · la conducta cambió', 'Las preguntas SPIN de alto impacto pasaron de 5,8 a 8,8 por llamada y superaron a las de situación. Los beneficios, de 1,2 a 2,2.'],
                  ['Prueba 3 · la productividad subió', 'En un mercado difícil, el grupo SPIN terminó 27,4% sobre el control en dólares vendidos, y sus pedidos de clientes nuevos subieron 63%.'],
                ].map(([a, b], i) => (
                  <div key={a} className={`p-3 rounded-2xl ${i === 2 ? featuredClass(isDark) : panelClass(isDark)}`}><p className={`text-sm font-black ${heading(isDark)}`}>{a}</p><p className={`text-xs leading-snug ${textMuted(isDark)}`}>{b}</p></div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="h" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
              <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center">
                <svg viewBox="0 0 440 230" className="w-full h-full max-h-[280px] overflow-visible" aria-label="Esquema: quienes aprendieron más SPIN siguen mejorando; quienes aprendieron menos vuelven al nivel inicial">
                  <SceneDefs id="haw" isDark={isDark} />
                  {curves.map((c, i) => {
                    const top = c.pts.map((v, k) => `${X[k]},${Y(v)}`).join(' ');
                    return (
                      <motion.polygon key={c.name} points={`${top} ${X[2]},${Y(c.pts[2]) + 10} ${X[0]},${Y(c.pts[0]) + 10}`} fill={c.f} opacity={0.9} filter="url(#haw-sh)" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 0.9, scaleX: 1 }} transition={{ delay: i * 0.25, duration: 0.8 }} style={{ transformOrigin: '60px 120px' }} />
                    );
                  })}
                  {['Antes', 'Durante', 'Después'].map((l, k) => <text key={l} x={X[k]} y={222} textAnchor="middle" fontSize={11} fontWeight={800} fill={tone.muted}>{l}</text>)}
                  {curves.map((c, i) => <text key={c.name} x={X[2] + 8} y={Y(c.pts[2]) + 8} fontSize={10} fontWeight={900} fill={i === 0 ? ORANGE : tone.text}>{c.name}</text>)}
                </svg>
                <p className={`text-[11px] ${textMuted(isDark)}`}>Esquema ilustrativo de la figura A.16 del libro (no son los valores exactos).</p>
              </div>
              <div className="lg:w-[48%] flex flex-col gap-2 justify-center">
                <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Las dos críticas al estudio</p><p className={`text-xs leading-snug ${textMuted(isDark)}`}>El grupo de control partía algo más bajo (16,3 frente a 17,9 pedidos) y podía haber efecto Hawthorne: la mejora por la sola atención que recibe un grupo estudiado.</p></div>
                <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Segundo estudio · control emparejado</p><p className={`text-xs leading-snug ${textMuted(isDark)}`}>Con 55 vendedores y un control que partía igual: el grupo SPIN subió 16% en pedidos y el control cayó 21%.</p></div>
                <div className={`p-3 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>Hawthorne aislado</p><p className={`text-xs leading-snug ${textMuted(isDark)}`}>Todos recibieron la misma atención. Quienes aprendieron menos SPIN mejoraron durante el curso y luego volvieron a su nivel: eso fue Hawthorne. Quienes aprendieron más siguieron mejorando después.</p></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseSpin({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'sp-slide-0': return <Portada isDark={isDark} />;
    case 'sp-investigacion': return <Investigacion isDark={isDark} />;
    case 'sp-no-confies': return <NoConfies isDark={isDark} />;
    case 'sp-grande-pequena': return <GrandePequena isDark={isDark} />;
    case 'sp-avances': return <Avances isDark={isDark} />;
    case 'sp-preguntas': return <Preguntas isDark={isDark} />;
    case 'sp-necesidades': return <Necesidades isDark={isDark} />;
    case 'sp-ecuacion': return <Ecuacion isDark={isDark} />;
    case 'sp-spin': return <Spin isDark={isDark} />;
    case 'sp-implicacion': return <Implicacion isDark={isDark} />;
    case 'sp-need-payoff': return <NeedPayoff isDark={isDark} />;
    case 'sp-fab': return <Fab isDark={isDark} />;
    case 'sp-objeciones': return <Objeciones isDark={isDark} />;
    case 'sp-cierre-tecnicas': return <Cierre isDark={isDark} />;
    case 'sp-compromiso': return <Compromiso isDark={isDark} />;
    case 'sp-practica': return <Practica isDark={isDark} />;
    case 'sp-critico': return <Critico isDark={isDark} />;
    case 'sp-planificar': return <Planificar isDark={isDark} />;
    case 'sp-venta-interna': return <VentaInterna isDark={isDark} />;
    case 'sp-quincy': return <Quincy isDark={isDark} />;
    case 'sp-apertura': return <Apertura isDark={isDark} />;
    case 'sp-fab-quiz': return <FabQuiz isDark={isDark} />;
    case 'sp-lanzamientos': return <Lanzamientos isDark={isDark} />;
    case 'sp-cierre-evidencia': return <CierreEvidencia isDark={isDark} />;
    case 'sp-aprender': return <Aprender isDark={isDark} />;
    case 'sp-evaluar': return <Evaluar isDark={isDark} />;
    case 'sp-motorola': return <Motorola isDark={isDark} />;
    case 'sp-cierre': return <Sintesis isDark={isDark} />;
    default: return null;
  }
}
