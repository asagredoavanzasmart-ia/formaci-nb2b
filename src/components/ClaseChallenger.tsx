import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Flame } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass, Quiz } from './slideKit';
import type { QuizQ } from './slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor,
  Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from './scene3d';
import type { Faces, Accessory } from './scene3d';

/**
 * Clase: "The Challenger Sale" (Matthew Dixon y Brent Adamson, CEB).
 *
 * Fuentes del usuario: guía táctica, resumen comparativo y guía de estudio.
 * Añadido con verificación propia: la crítica académica al método del estudio
 * (ch-critico), coherente con el hilo de pensamiento crítico del curso.
 */

type SlideProps = { isDark: boolean };

const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

/* Barra horizontal animada. */
function Bar({ isDark, label, value, max, suffix = '%', brand = true, delay = 0 }: { isDark: boolean; label: string; value: number; max: number; suffix?: string; brand?: boolean; delay?: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span className={`font-bold ${textMuted(isDark)}`}>{label}</span><span className={`font-black ${heading(isDark)}`}>{value}{suffix}</span></div>
      <div className={`h-3.5 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
        <motion.div className={`h-full rounded-full ${brand ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-[0_0_15px_rgba(255,133,29,0.5)]' : 'bg-gray-400'}`} initial={{ width: 0 }} animate={{ width: `${(value / max) * 100}%` }} transition={{ delay, duration: 0.9, ease: 'easeOut' }} />
      </div>
    </div>
  );
}

/* Los cinco perfiles, con su figura y sus cifras. Se reutilizan en varias escenas. */
type Perfil = {
  id: string; nombre: string; en: string; muestra: number; core: number; star: number; alta: number;
  acc: Accessory; hair: string; enfoque: string; conducta: string; postura: string;
};

const PERFILES: Perfil[] = [
  { id: 'challenger', nombre: 'El Challenger', en: 'The Challenger', muestra: 27, core: 23, star: 39, alta: 54, acc: 'star', hair: '#2b1a12',
    enfoque: 'Perspicacia y debate constructivo',
    conducta: 'Enseña al cliente una forma distinta de competir, entiende su negocio a fondo y ejerce presión asertiva. Se siente cómodo hablando de dinero.',
    postura: 'Asertiva: saca al cliente de su zona de confort.' },
  { id: 'lobo', nombre: 'El Lobo Solitario', en: 'The Lone Wolf', muestra: 18, core: 15, star: 25, alta: 25, acc: 'compass', hair: '#4a4a4a',
    enfoque: 'Autoconfianza e instinto',
    conducta: 'Sigue sus propias reglas, ignora el proceso interno y el CRM, pero entrega los números. La organización lo tolera porque cumple la cuota.',
    postura: 'Independiente: gana a su manera o no juega.' },
  { id: 'trabajador', nombre: 'El Trabajador Incansable', en: 'The Hard Worker', muestra: 21, core: 22, star: 17, alta: 7, acc: 'gear', hair: '#3b2a20',
    enfoque: 'Esfuerzo y persistencia',
    conducta: 'Llega temprano y se va tarde. Hace más llamadas y más visitas que nadie, y sigue el proceso al pie de la letra.',
    postura: 'Disciplinada: cree que el volumen termina produciendo resultados.' },
  { id: 'reactivo', nombre: 'El Solucionador Reactivo', en: 'The Reactive Problem Solver', muestra: 14, core: 14, star: 12, alta: 10, acc: 'headset', hair: '#5a2d14',
    enfoque: 'Detalle y posventa',
    conducta: 'Se asegura de que todo lo prometido se cumpla y apaga los incendios de implementación. Un agente de servicio al cliente con traje de vendedor.',
    postura: 'Servicial: responde a lo que ya ocurrió.' },
  { id: 'relaciones', nombre: 'El Creador de Relaciones', en: 'The Relationship Builder', muestra: 21, core: 26, star: 7, alta: 4, acc: 'heart', hair: '#7a3e1d',
    enfoque: 'Servicio y diplomacia',
    conducta: 'Generoso con su tiempo, construye defensores internos y evita cualquier fricción. Prioriza la armonía de la relación.',
    postura: 'Acomodaticia: se instala en la zona de confort del cliente.' },
];

const cuerpoPerfil = (p: Perfil, isDark: boolean): Faces =>
  p.id === 'challenger' ? BRAND : p.id === 'relaciones' ? SLATE(isDark) : PEACH;

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 600 220" className="w-full max-w-xl mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="chp" isDark={isDark} />
        <IsoFloor cx={300} cy={160} s={270} fill={t.floor} />
        {PERFILES.map((p, i) => {
          const x = 110 + i * 95;
          const es = p.id === 'challenger';
          return (
            <motion.g key={p.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 90, damping: 13 }}>
              {es && <PulseDisc cx={x} cy={162} rx={44} ry={14} dur={2} peak={0.35} />}
              <Float amp={es ? 7 : 3} dur={es ? 2.1 : 3.6} delay={i * 0.25}>
                <Persona id="chp" cx={x} cy={160} s={es ? 1.15 : 0.92} body={cuerpoPerfil(p, isDark)} accessory={p.acc} hair={p.hair} />
              </Float>
            </motion.g>
          );
        })}
        <text x={300} y={206} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Cinco perfiles de vendedor. Solo uno domina la venta compleja.</text>
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Matthew Dixon y Brent Adamson · CEB</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        El vendedor <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">desafiante</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        La tesis que incomodó a la industria: en la venta compleja, <strong>caer bien no vende</strong>. Enseñar, sí.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Los hitos de la profesión                                        */
/* ------------------------------------------------------------------ */

function Hitos({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const hitos = [
    { año: '1900', title: 'Hunter y farmer', text: 'Las aseguradoras separan por primera vez a quien vende de quien cobra la prima. Nace la venta como oficio puro.' },
    { año: '1925', title: 'Las técnicas de venta', text: 'E. K. Strong publica "The Psychology of Selling": características, beneficios, objeciones y cierres. Vender deja de ser un don y pasa a ser un conjunto de destrezas enseñables.' },
    { año: '1970s', title: 'La venta consultiva', text: 'Neil Rackham analiza 35.000 llamadas en 23 países y funda SPIN: en la venta grande se diagnostica preguntando, no se presiona.' },
    { año: 'Hoy', title: 'La revolución de las compras', text: 'El cambio ya no viene del vendedor sino del comprador: el área de compras se profesionaliza y exige otra cosa. Ese es el hueco que el modelo Challenger dice llenar.' },
  ];
  const [active, setActive] = useState(3);
  return (
    <Shell isDark={isDark} title="El cuarto giro" highlight="en cien años de ventas" subtitle="Neil Rackham, el autor de SPIN, escribió el prólogo de este libro y lo presentó como el siguiente gran hito. Viniendo de quien viene, eso es un dato en sí mismo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 250" className="w-full h-full overflow-visible" aria-label="Cuatro hitos históricos de la profesión de ventas">
              <SceneDefs id="hit" isDark={isDark} />
              {hitos.map((h, i) => {
                const x = 85 + i * 130;
                const alt = 30 + i * 28;
                const cy = 176 - alt;
                const on = i === active;
                return (
                  <Lift key={h.año} on={on} dimmed={false} onClick={() => setActive(i)} lift={12}>
                    {on && <PulseDisc cx={x} cy={cy + alt + 24} rx={54} ry={16} dur={2.2} peak={0.3} />}
                    <Float amp={on ? 6 : 2} dur={on ? 2.4 : 4} delay={i * 0.3}>
                      <g filter="url(#hit-sh)"><IsoBox cx={x} cy={cy} s={44} h={alt} f={on ? BRAND : i === 3 ? PEACH : NEUTRAL(isDark)} /></g>
                      <text x={x} y={cy + 6} textAnchor="middle" fontSize={14} fontWeight={900} fill={on || i === 3 ? '#fff' : isDark ? '#fff' : '#374151'}>{h.año}</text>
                    </Float>
                  </Lift>
                );
              })}
              {hitos.slice(0, -1).map((_, i) => (
                <Traveler key={i} id="hit" path={hop([85 + i * 130, 176 - (30 + i * 28) - 26], [215 + i * 130, 176 - (30 + (i + 1) * 28) - 26], 24)} dur={1.3} delay={i * 0.4} repeatDelay={1.3} r={5} />
              ))}
              <text x={280} y={238} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Cada hito nació cuando el anterior dejó de alcanzar</text>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{hitos[active].año}</p>
                <h3 className={`text-xl font-black mb-1 ${heading(isDark)}`}>{hitos[active].title}</h3>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{hitos[active].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que cambió de lado</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Los tres primeros hitos los empujó <strong>quien vende</strong>. Este lo empuja <strong>quien compra</strong>: un área de compras con método, consultores externos y poder real sobre el margen.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Fatiga de soluciones                                             */
/* ------------------------------------------------------------------ */

function Fatiga({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const cargas = [
    { name: 'Consenso', text: 'Nadie decide solo. El ejecutivo exige respaldo de varias áreas con agendas distintas, así que ya no convences a una persona: gestionas un comité.' },
    { name: 'Aversión al riesgo', text: 'El cliente te traslada el riesgo: quiere que tu éxito se mida por SUS métricas de negocio, no por haber entregado el producto.' },
    { name: 'Personalización', text: 'Da por hecho que la solución se adapta a su operación, y no espera pagar más por esa adaptación.' },
    { name: 'Consultores externos', text: 'Aparecen asesores e intermediarios de compras contratados para auditar propuestas y apretar el margen.' },
  ];
  const [n, setN] = useState(4);
  return (
    <Shell isDark={isDark} title="Fatiga de soluciones:" highlight="el cliente ya no quiere educarte" subtitle="Para escapar de la guerra de precios, todos migraron a «vender soluciones». El costo lo terminó pagando el comprador, en tiempo y en reuniones.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[42%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 340 300" className="w-full h-full max-h-[320px] overflow-visible" aria-label="Cargas que se acumulan sobre el comprador">
              <SceneDefs id="fat" isDark={isDark} />
              <IsoFloor cx={170} cy={258} s={150} fill={t.floor} />
              <PulseDisc cx={170} cy={254} rx={46} ry={14} dur={2.8} peak={0.22} color="#94a3b8" />
              <Float amp={2} dur={4}>
                <Persona id="fat" cx={170} cy={252} s={1.15} body={SLATE(isDark)} accessory="headset" hair="#4a4a4a" />
              </Float>
              {Array.from({ length: n }, (_, i) => (
                <Traveler key={'t' + i} id="fat" path={hop([170, 134 - i * 22], [170, 196], 14)} dur={2.2} delay={i * 0.45} repeatDelay={1.2} r={4} color={i >= 2 ? ORANGE : '#f0a070'} />
              ))}
              {Array.from({ length: n }, (_, i) => (
                <motion.g key={i} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 120, damping: 12 }}>
                  <Float amp={3} dur={2.6} delay={i * 0.3}>
                    <g filter="url(#fat-sh)"><IsoBox cx={170} cy={110 - i * 22} s={44} h={18} f={i >= 2 ? BRAND : PEACH} /></g>
                  </Float>
                </motion.g>
              ))}
              <text x={170} y={292} textAnchor="middle" fontSize={12} fontWeight={800} fill={n >= 3 ? ORANGE : t.muted}>
                {n === 0 ? 'Antes: una decisión, una persona' : `${n} carga${n > 1 ? 's' : ''} sobre el comprador`}
              </text>
            </svg>
            <div className="flex flex-wrap justify-center gap-1.5">
              {cargas.map((c, i) => <Pill key={c.name} isDark={isDark} on={n === i + 1} onClick={() => setN(i + 1)}>{c.name}</Pill>)}
            </div>
          </div>
          <div className="lg:w-[58%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={n} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Carga {Math.max(1, n)} · {cargas[Math.max(0, n - 1)].name}</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{cargas[Math.max(0, n - 1)].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El síntoma que verás en la reunión</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Preguntar «¿qué le quita el sueño?» ya no abre la conversación: la cierra. El cliente lleva meses explicándole su negocio a proveedor tras proveedor <strong>antes de recibir nada a cambio</strong>. Eso es la fatiga de soluciones.</p>
            </div>
            <p className={`text-sm ${textMuted(isDark)}`}>Según CEB, <strong>el 75% de las organizaciones de ventas</strong> aspira a ser proveedora de soluciones. Casi todas hacen la misma pregunta de apertura.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. La brecha de talento                                             */
/* ------------------------------------------------------------------ */

/* Contador animado: interpola hacia el valor objetivo con una curva de salida suave. */
function useCountUp(target: number, dur = 900) {
  const [v, setV] = useState(0);
  const from = React.useRef(0);
  React.useEffect(() => {
    from.current = v;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from.current + (target - from.current) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return v;
}

function Brecha({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [foco, setFoco] = useState<'ambas' | 'simple' | 'compleja'>('ambas');

  // Geometría: la base de cada barra es B; la altura es proporcional al rendimiento.
  const B = 262;
  const K = 0.74;
  const S = 30;
  const hProm = 100 * K;

  const escenas = [
    { key: 'simple' as const, x: 160, estrella: 159, brecha: 59, titulo: 'VENTA SIMPLE', sub: 'transaccional' },
    { key: 'compleja' as const, x: 440, estrella: 289, brecha: 189, titulo: 'VENTA COMPLEJA', sub: 'de soluciones' },
  ];

  const nSimple = useCountUp(foco === 'compleja' ? 0 : 59);
  const nCompleja = useCountUp(foco === 'simple' ? 0 : 189);
  const numeros = { simple: nSimple, compleja: nCompleja };

  const ghost: Faces = { top: 'rgba(255,133,29,0.42)', left: 'rgba(239,55,92,0.30)', right: 'rgba(196,30,61,0.30)' };

  return (
    <Shell isDark={isDark} title="La brecha de talento" highlight="se multiplica por más de tres" subtitle="El mismo equipo y el mismo producto. Lo único que cambia es la complejidad de lo que se vende, y la distancia entre el promedio y la estrella se dispara.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[58%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 580 392" className="w-full h-full max-h-[400px] overflow-visible" aria-label="Venta simple: la estrella rinde 159% frente a 100%. Venta compleja: 289% frente a 100%.">
              <SceneDefs id="bre" isDark={isDark} />

              {escenas.map((e, idx) => {
                const hEst = e.estrella * K;
                const hGap = hEst - hProm;
                const activa = foco === 'ambas' || foco === e.key;
                const xProm = e.x - 40;
                const xEst = e.x + 40;
                const entrada = idx * 0.25;
                return (
                  <motion.g key={e.key} animate={{ opacity: activa ? 1 : 0.22 }} transition={{ duration: 0.5 }}>
                    {/* Plataforma */}
                    <g filter="url(#bre-sh)"><Cylinder cx={e.x} cy={B} rx={118} ry={30} h={12} top={t.floor} side={t.floorSide} /></g>
                    {activa && foco !== 'ambas' && <PulseDisc cx={xEst} cy={B + 2} rx={52} ry={16} dur={2.2} peak={0.3} />}

                    {/* Promedio */}
                    <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.15 + entrada, type: 'spring', stiffness: 70, damping: 15 }} style={{ transformOrigin: `${xProm}px ${B}px` }}>
                      <g filter="url(#bre-sh)"><IsoBox cx={xProm} cy={B - hProm} s={S} h={hProm} f={NEUTRAL(isDark)} /></g>
                    </motion.g>

                    {/* Brecha: lo que le falta al promedio para llegar a la estrella (relleno translúcido, sin contorno) */}
                    <motion.g key={`${e.key}-${activa}`} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.9 + entrada, type: 'spring', stiffness: 55, damping: 14 }} style={{ transformOrigin: `${xProm}px ${B - hProm}px` }}>
                      <IsoBox cx={xProm} cy={B - hProm - hGap} s={S} h={hGap} f={ghost} />
                    </motion.g>

                    {/* Estrella */}
                    <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.3 + entrada, type: 'spring', stiffness: 60, damping: 14 }} style={{ transformOrigin: `${xEst}px ${B}px` }}>
                      <Float amp={activa && foco !== 'ambas' ? 5 : 2} dur={2.6} delay={idx * 0.4}>
                        <g filter="url(#bre-sh)"><IsoBox cx={xEst} cy={B - hEst} s={S} h={hEst} f={BRAND} /></g>
                      </Float>
                    </motion.g>

                    {/* Etiqueta de la brecha, junto al promedio y a la altura del hueco */}
                    <motion.g initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 + entrada }}>
                      <rect x={xProm - S - 80} y={B - hProm - hGap / 2 - 15} width={66} height={30} rx={15} fill="url(#bre-brand)" />
                      <polygon points={`${xProm - S - 14},${B - hProm - hGap / 2 - 6} ${xProm - S - 6},${B - hProm - hGap / 2} ${xProm - S - 14},${B - hProm - hGap / 2 + 6}`} fill={PINK} />
                      <text x={xProm - S - 47} y={B - hProm - hGap / 2 + 5.5} textAnchor="middle" fontSize={15} fontWeight={900} fill="#fff">+{numeros[e.key]}%</text>
                    </motion.g>

                    {/* Valores bajo cada barra */}
                    <text x={xProm} y={B + 56} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Promedio</text>
                    <text x={xProm} y={B + 74} textAnchor="middle" fontSize={15} fontWeight={900} fill={isDark ? '#e5e7eb' : '#374151'}>100%</text>
                    <text x={xEst} y={B + 56} textAnchor="middle" fontSize={11} fontWeight={800} fill={ORANGE}>Estrella</text>
                    <text x={xEst} y={B + 74} textAnchor="middle" fontSize={15} fontWeight={900} fill={ORANGE}>{e.estrella}%</text>

                    {/* Título de la escena */}
                    <text x={e.x} y={B + 108} textAnchor="middle" fontSize={13} fontWeight={900} letterSpacing={1.6} fill={activa ? ORANGE : t.muted}>{e.titulo}</text>
                    <text x={e.x} y={B + 126} textAnchor="middle" fontSize={11} fill={t.muted}>{e.sub}</text>
                  </motion.g>
                );
              })}

              {/* Salto de una escena a la otra: la brecha escala */}
              {foco === 'ambas' && (
                <Traveler id="bre" path={hop([232, B - 100 * K - 40], [408, B - 289 * K + 30], 46)} dur={2.2} delay={1.2} repeatDelay={1.2} r={6} />
              )}
            </svg>

            <div className="flex flex-wrap justify-center gap-2">
              <Pill isDark={isDark} on={foco === 'simple'} onClick={() => setFoco('simple')}>Solo venta simple</Pill>
              <Pill isDark={isDark} on={foco === 'ambas'} onClick={() => setFoco('ambas')}>Comparar</Pill>
              <Pill isDark={isDark} on={foco === 'compleja'} onClick={() => setFoco('compleja')}>Solo venta compleja</Pill>
            </div>
          </div>

          <div className="lg:w-[42%] flex flex-col gap-3 justify-center">
            <div className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Cómo leer el gráfico</p>
              <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>La barra gris es el vendedor promedio (siempre 100%). La naranja es la estrella. El bloque translúcido es <strong>lo que le falta al promedio para llegar a la estrella</strong>: esa es la brecha.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Transaccional</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">+59%</p>
                <p className={`text-xs ${textMuted(isDark)}`}>Una vez y media el promedio.</p>
              </div>
              <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Soluciones</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">+189%</p>
                <p className={`text-xs ${textMuted(isDark)}`}>Casi tres veces el promedio.</p>
              </div>
            </div>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>La brecha se multiplica por 3,2</strong> (189 ÷ 59). Si tu resultado depende de un puñado de personas irrepetibles, no tienes un modelo comercial: tienes suerte.</p>
            </div>
            <p className={`text-xs ${textMuted(isDark)}`}>El estudio de CEB partió con 700 vendedores en 90 empresas y se amplió a más de 6.000, sobre 44 atributos. Más adelante revisaremos qué tan sólido es.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Los cinco perfiles                                               */
/* ------------------------------------------------------------------ */

function Perfiles({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [activeId, setActiveId] = useState('challenger');
  const a = PERFILES.find((p) => p.id === activeId) || PERFILES[0];
  return (
    <Shell isDark={isDark} title="Cinco perfiles," highlight="no cinco personalidades" subtitle="El análisis agrupó 44 atributos en cinco formas de vender. No son rasgos de nacimiento: son especializaciones, como elegir una carrera. Toca cada figura.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 290" className="w-full h-full overflow-visible" aria-label="Los cinco perfiles de vendedor y su peso en la muestra">
              <SceneDefs id="per" isDark={isDark} />
              <IsoFloor cx={280} cy={196} s={250} fill={t.floor} />
              {PERFILES.map((p, i) => {
                const x = 80 + i * 100;
                const on = p.id === activeId;
                return (
                  <motion.g key={p.id} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 100, damping: 13 }}>
                    <Lift on={on} dimmed={!on} onClick={() => setActiveId(p.id)} lift={14}>
                      {on && <PulseDisc cx={x} cy={198} rx={42} ry={13} dur={2} peak={0.35} />}
                      <Float amp={on ? 6 : 2.5} dur={on ? 2.2 : 3.8} delay={i * 0.25}>
                        <Persona id="per" cx={x} cy={196} s={1} body={cuerpoPerfil(p, isDark)} accessory={p.acc} hair={p.hair} />
                      </Float>
                    </Lift>
                    <text x={x} y={248} textAnchor="middle" fontSize={on ? 15 : 13} fontWeight={900} fill={on ? ORANGE : t.text}>{p.muestra}%</text>
                    <text x={x} y={266} textAnchor="middle" fontSize={10} fill={t.muted}>de la muestra</text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
            <div className="flex flex-wrap gap-1.5">
              {PERFILES.map((p) => <Pill key={p.id} isDark={isDark} on={p.id === activeId} onClick={() => setActiveId(p.id)}>{p.nombre.replace('El ', '')}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={a.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-5 rounded-3xl ${a.id === 'challenger' ? featuredClass(isDark) : panelClass(isDark)}`}>
                <h3 className={`text-xl font-black ${heading(isDark)}`}>{a.nombre}</h3>
                <p className={`text-xs font-semibold mb-2 ${textMuted(isDark)}`}>{a.en} · {a.enfoque}</p>
                <p className={`text-sm leading-relaxed mb-2 ${textMuted(isDark)}`}>{a.conducta}</p>
                <p className={microLabel(isDark)}>Postura ante el cliente</p>
                <p className={`text-sm ${heading(isDark)}`}>{a.postura}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>Todos tenemos algo de los cinco. La diferencia está en <strong>cuál domina tu ejecución</strong> cuando la reunión se pone difícil.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Promedio vs estrella                                             */
/* ------------------------------------------------------------------ */

function Estrellas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [vista, setVista] = useState<'core' | 'star' | 'alta'>('core');
  const valor = (p: Perfil) => (vista === 'core' ? p.core : vista === 'star' ? p.star : p.alta);
  const etiqueta = vista === 'core' ? 'Vendedores promedio' : vista === 'star' ? 'Vendedores estrella' : 'Estrellas en venta compleja';
  const orden = [...PERFILES].sort((x, y) => valor(y) - valor(x));
  return (
    <Shell isDark={isDark} title="El dato que incomodó" highlight="a la industria" subtitle="Mira cómo se reparten los perfiles según el desempeño. «Estrella» es el 20% superior de rendimiento. Cambia entre las tres vistas y fíjate en el Creador de Relaciones.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex gap-2 mb-3">
          <Pill isDark={isDark} on={vista === 'core'} onClick={() => setVista('core')}>Promedio</Pill>
          <Pill isDark={isDark} on={vista === 'star'} onClick={() => setVista('star')}>Estrella</Pill>
          <Pill isDark={isDark} on={vista === 'alta'} onClick={() => setVista('alta')}>Estrella en venta compleja</Pill>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <svg viewBox="0 0 540 280" className="w-full h-full overflow-visible" aria-label={`Reparto de perfiles entre ${etiqueta}`}>
              <SceneDefs id="est" isDark={isDark} />
              {PERFILES.map((p, i) => {
                const x = 75 + i * 100;
                const v = valor(p);
                const h = Math.max(8, v * 3.1);
                const es = p.id === 'challenger';
                const cae = p.id === 'relaciones';
                return (
                  <g key={p.id}>
                    {es && <PulseDisc cx={x} cy={204} rx={46} ry={14} dur={2.2} peak={0.28} />}
                    <motion.g initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 90, damping: 13 }}>
                      <Float amp={es ? 5 : 1.5} dur={es ? 2.3 : 4} delay={i * 0.2}>
                        <g filter="url(#est-sh)">
                          <IsoBoxAnimada cx={x} cyBase={200} s={40} h={h} f={es ? BRAND : cae ? SLATE(isDark) : PEACH} />
                        </g>
                      </Float>
                    </motion.g>
                    <motion.text key={`${vista}-${p.id}`} x={x} y={200 - h - 28} textAnchor="middle" fontSize={16} fontWeight={900} fill={es ? ORANGE : cae ? PINK : t.text} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>{v}%</motion.text>
                    <text x={x} y={240} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={t.muted}>{p.nombre.replace('El ', '').split(' ')[0]}</text>
                  </g>
                );
              })}
              <Traveler id="est" path={[[60, 216], [200, 216], [340, 216], [480, 216]]} dur={4} repeatDelay={0.8} r={4} color="#94a3b8" />
              <text x={270} y={270} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={ORANGE}>{etiqueta}</text>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>El hallazgo central</p>
              <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>Entre los promedio no manda nadie: los cinco perfiles pesan parecido. <strong>La mediocridad tiene cinco sabores.</strong> Pero entre las estrellas de venta compleja, más de la mitad son Challenger.</p>
            </div>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>El colapso del Creador de Relaciones</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Es el perfil <strong>más común entre los promedio (26%)</strong> y casi desaparece entre las estrellas de venta compleja <strong>(4%)</strong>. La idea de «primero construyo la relación y después vendo» es, según estos datos, la apuesta con menos probabilidad de funcionar.</p>
            </div>
            <p className={`text-sm ${textMuted(isDark)}`}>Ojo con la lectura fácil: esto <strong>no dice</strong> que la relación estorbe. Dice que la familiaridad sin perspectiva no mueve a nadie a asumir un riesgo.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* Caja isométrica cuya altura anima desde la base. */
function IsoBoxAnimada({ cx, cyBase, s, h, f }: { cx: number; cyBase: number; s: number; h: number; f: Faces }) {
  const cy = cyBase - h;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <IsoBox cx={cx} cy={cy} s={s} h={h} f={f} />
    </motion.g>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Frente a frente: tensión                                         */
/* ------------------------------------------------------------------ */

function Tension({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [quien, setQuien] = useState<'rb' | 'ch'>('ch');
  const ch = quien === 'ch';
  const filas = [
    ['Ante la tensión', 'La resuelve y la evita. Busca que la reunión sea agradable.', 'La sostiene. Usa la incomodidad diplomática para mover al cliente del statu quo.'],
    ['Qué persigue', 'La comodidad del cliente: ser aceptado en su zona de confort.', 'El valor del cliente: que gane más, aunque el camino incomode.'],
    ['Su estrategia', 'Estar disponible y servir. «Lo que necesites, aquí estoy».', 'Enseñar y desafiar. Aporta una perspectiva que reencuadra cómo compite el cliente.'],
    ['Hablando de dinero', 'Incómodo. Cede en descuento con tal de no romper la armonía.', 'Cómodo. Ata el precio al valor y aguanta la presión.'],
  ];
  return (
    <Shell isDark={isDark} title="Tensión constructiva:" highlight="la diferencia de fondo" subtitle="Los dos perfiles opuestos no se distinguen por simpatía ni por esfuerzo, sino por lo que hacen cuando la conversación se pone incómoda.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 360 250" className="w-full h-full max-h-[270px] overflow-visible" aria-label="El creador de relaciones acompaña al cliente; el challenger lo desplaza">
              <SceneDefs id="ten" isDark={isDark} />
              <IsoFloor cx={180} cy={190} s={170} fill={t.floor} />
              {/* Cliente */}
              <motion.g animate={{ x: ch ? 42 : 0 }} transition={{ type: 'spring', stiffness: 55, damping: 12 }}>
                <Float amp={2.5} dur={3.6}>
                  <Persona id="ten" cx={230} cy={188} s={1.05} body={NEUTRAL(isDark)} accessory="headset" hair="#4a4a4a" />
                </Float>
              </motion.g>
              {/* Vendedor */}
              <PulseDisc cx={110} cy={190} rx={40} ry={13} dur={ch ? 1.8 : 3} peak={ch ? 0.35 : 0.18} color={ch ? ORANGE : '#94a3b8'} />
              <Float amp={ch ? 6 : 3} dur={ch ? 2.2 : 3.4}>
                <Persona id="ten" cx={110} cy={188} s={1.05} body={ch ? BRAND : SLATE(isDark)} accessory={ch ? 'star' : 'heart'} hair="#2b1a12" />
              </Float>
              {ch && <Traveler id="ten" path={hop([132, 150], [214, 150], 30)} dur={1.2} repeatDelay={0.5} r={6} />}
              <text x={180} y={236} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={ch ? ORANGE : t.muted}>
                {ch ? 'Lo empuja fuera de su zona de confort' : 'Se acomoda junto al cliente'}
              </text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!ch} onClick={() => setQuien('rb')}>Creador de Relaciones</Pill>
              <Pill isDark={isDark} on={ch} onClick={() => setQuien('ch')}>Challenger</Pill>
            </div>
          </div>
          <div className="lg:w-[60%] flex flex-col gap-2 justify-center">
            {filas.map(([dim, rb, cha], i) => (
              <motion.div key={dim} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{dim}</p>
                <AnimatePresence mode="wait">
                  <motion.p key={quien} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-sm leading-snug ${ch ? heading(isDark) : textMuted(isDark)}`}>
                    {ch ? cha : rb}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>El Creador de Relaciones ofrece <strong>conveniencia</strong>; el Challenger ofrece <strong>valor</strong>. Nadie cambia un sistema que funciona a medias para sentirse cómodo: lo cambia porque alguien le mostró lo que está perdiendo.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Los tres pilares                                                 */
/* ------------------------------------------------------------------ */

function Pilares({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pilares = [
    { id: 'ensenar', n: 'Enseñar para diferenciar', text: 'Aportar una perspectiva sobre el negocio del cliente que reencuadre sus prioridades. No hablar de tu producto: hablar de cómo compite él.', attrs: ['Ofrece perspectivas únicas del mercado', 'Comunicación bidireccional sólida'] },
    { id: 'adaptar', n: 'Adaptar para resonar', text: 'El mismo mensaje no sirve para el gerente general y para operaciones. Hay que traducirlo a los impulsores de valor de cada interlocutor.', attrs: ['Conoce los impulsores de valor de cada persona', 'Identifica los motores económicos del negocio'] },
    { id: 'control', n: 'Tomar el control', text: 'Sostener la conversación de dinero sin ceder al primer empujón, y dirigir el proceso de decisión en vez de esperarlo.', attrs: ['Cómodo discutiendo dinero', 'Capaz de presionar al cliente a tiempo'] },
  ];
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="Tres pilares" highlight="que solo funcionan juntos" subtitle="Seis atributos estadísticamente significativos se agrupan en tres competencias. El modelo insiste: por separado no sirven de nada.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 460 280" className="w-full h-full overflow-visible" aria-label="Tres pilares dentro de la tensión constructiva">
              <SceneDefs id="pil" isDark={isDark} />
              <IsoFloor cx={230} cy={178} s={220} fill={t.floor} />
              <motion.ellipse cx={230} cy={178} rx={200} ry={70} fill="url(#pil-brandv)" animate={{ opacity: [0.07, 0.16, 0.07] }} transition={{ duration: 3.4, repeat: Infinity }} />
              {pilares.map((p, k) => {
                const x = 90 + k * 140;
                const on = k === i;
                return (
                  <Lift key={p.id} on={on} dimmed={!on} onClick={() => setI(k)} lift={13}>
                    {on && <PulseDisc cx={x} cy={180} rx={46} ry={14} dur={2.1} peak={0.32} />}
                    <Float amp={on ? 6 : 2.5} dur={on ? 2.2 : 3.8} delay={k * 0.3}>
                      <g filter="url(#pil-sh)"><IsoBox cx={x} cy={128} s={44} h={50} f={on ? BRAND : PEACH} /></g>
                      <text x={x} y={134} textAnchor="middle" fontSize={18} fontWeight={900} fill="#fff">{k + 1}</text>
                    </Float>
                  </Lift>
                );
              })}
              {[0, 1].map((k) => <Traveler key={k} id="pil" path={hop([90 + k * 140, 108], [230 + k * 140, 108], 26)} dur={1.2} delay={k * 0.5} repeatDelay={1} r={5} />)}
              <text x={230} y={252} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>TENSIÓN CONSTRUCTIVA</text>
              <text x={230} y={270} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>es el clima donde los tres operan</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Pilar {i + 1}</p>
                <h3 className={`text-xl font-black mb-2 ${heading(isDark)}`}>{pilares[i].n}</h3>
                <p className={`text-base leading-relaxed mb-2 ${textMuted(isDark)}`}>{pilares[i].text}</p>
                <p className={microLabel(isDark)}>Atributos que lo componen</p>
                <ul className={`text-sm space-y-0.5 ${textMuted(isDark)}`}>
                  {pilares[i].attrs.map((x) => <li key={x} className="flex gap-2"><CheckCircle2 size={14} className="text-[#ff851d] shrink-0 mt-0.5" />{x}</li>)}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Por qué la combinación es el punto</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Enseñar <strong>sin</strong> adaptar es irrelevante. Adaptar <strong>sin</strong> enseñar te deja sonando igual que el resto. Y tomar el control <strong>sin</strong> aportar nada intelectual es, simplemente, ser pesado.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. La ciencia de la lealtad                                         */
/* ------------------------------------------------------------------ */

function Lealtad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const partes = [
    { n: 'Experiencia de compra', v: 53, f: BRAND, nota: 'Cómo vendes: la conversación misma. Más de la mitad de la lealtad se juega aquí.' },
    { n: 'Marca y empresa', v: 19, f: PEACH, nota: 'Necesario para competir, pero tus rivales también lo tienen.' },
    { n: 'Producto y servicio', v: 19, f: PEACH, nota: 'El precio de entrada. El cliente percibe a los principales proveedores como equivalentes.' },
    { n: 'Precio y valor', v: 9, f: NEUTRAL(false), nota: 'Competir por precio no crea lealtad: crea clientes que se van con el próximo descuento.' },
  ];
  const [i, setI] = useState(0);
  const atributos = [
    'Me ofrece perspectivas únicas sobre el mercado',
    'Me ayuda a navegar entre alternativas',
    'Me da asesoría continua',
    'Me ayuda a evitar minas terrestres',
    'Me educa en problemas y resultados nuevos',
  ];
  return (
    <Shell isDark={isDark} title="La lealtad no depende de" highlight="lo que vendes, sino de cómo" subtitle="CEB preguntó a más de 5.000 ejecutivos compradores qué los hace volver, comprar más y recomendar. El reparto sorprende.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 440 270" className="w-full h-full overflow-visible" aria-label="La experiencia de compra pesa 53% en la lealtad">
              <SceneDefs id="lea" isDark={isDark} />
              {partes.map((p, k) => {
                const x = 70 + k * 100;
                const h = p.v * 3;
                const on = k === i;
                return (
                  <Lift key={p.n} on={on} dimmed={false} onClick={() => setI(k)} lift={9}>
                    {k === 0 && <PulseDisc cx={x} cy={196} rx={48} ry={15} dur={2.2} peak={0.3} />}
                    <Float amp={k === 0 ? 5 : 2} dur={k === 0 ? 2.3 : 4} delay={k * 0.2}>
                      <g filter="url(#lea-sh)"><IsoBox cx={x} cy={192 - h} s={40} h={h} f={k === 3 ? NEUTRAL(isDark) : p.f} /></g>
                      <text x={x} y={192 - h - 26} textAnchor="middle" fontSize={16} fontWeight={900} fill={k === 0 ? ORANGE : t.text}>{p.v}%</text>
                    </Float>
                    <text x={x} y={232} textAnchor="middle" fontSize={10} fontWeight={800} fill={on ? ORANGE : t.muted}>{p.n.split(' ')[0]}</text>
                  </Lift>
                );
              })}
              <text x={220} y={260} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Qué explica la lealtad de un cliente B2B</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${i === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{partes[i].n} · {partes[i].v}%</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{partes[i].nota}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Qué valora el cliente dentro de esa experiencia</p>
              <ul className={`text-sm space-y-1 mt-1 ${textMuted(isDark)}`}>
                {atributos.map((a) => <li key={a} className="flex gap-2"><ChevronRight size={14} className="text-[#ff851d] shrink-0 mt-0.5" />{a}</li>)}
              </ul>
              <p className={`text-xs mt-2 ${textMuted(isDark)}`}>Fíjate en el patrón: los cinco son formas de <strong>aprender algo</strong>. Ninguno es «me cae bien».</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Las cuatro reglas de la enseñanza comercial                     */
/* ------------------------------------------------------------------ */

function Reglas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const reglas = [
    { n: 'Conduce a tus fortalezas únicas', text: 'La enseñanza tiene que desembocar en algo que solo tú puedes hacer. Si no, estás regalando consultoría que cerrará tu competencia.', dato: 'El 35% de las empresas se cree preferida, pero los clientes perciben como únicos y valiosos solo el 14% de esos supuestos diferenciadores.' },
    { n: 'Desafía sus suposiciones', text: 'El mensaje debe reencuadrar cómo el cliente ve su propia operación.', dato: 'Si el cliente responde «¡totalmente de acuerdo!», fallaste: solo confirmaste lo que ya sabía. Lo que buscas es «nunca lo había visto así».' },
    { n: 'Cataliza la acción', text: 'Cuantifica el costo de no hacer nada, no el retorno de comprarte.', dato: 'La calculadora tradicional mide el ROI de tu producto. Esta mide lo que el cliente pierde cada mes por sostener el statu quo.' },
    { n: 'Escala entre clientes', text: 'Agrupa cuentas por necesidades operativas comunes, no por geografía o tamaño.', dato: 'Si cada vendedor inventa su propio análisis en cada reunión, no tienes un método: tienes artesanía que no se puede repetir.' },
  ];
  const [i, setI] = useState(1);
  return (
    <Shell isDark={isDark} title="Enseñanza comercial:" highlight="cuatro reglas para no regalar el trabajo" subtitle="Enseñar al cliente suena generoso y puede ser suicida. Estas cuatro reglas separan la enseñanza comercial de la consultoría gratis.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex items-center">
            <svg viewBox="0 0 440 260" className="w-full h-full overflow-visible" aria-label="Cuatro reglas que conducen hacia las fortalezas del proveedor">
              <SceneDefs id="reg" isDark={isDark} />
              <IsoFloor cx={220} cy={168} s={200} fill={t.floor} />
              {reglas.map((r, k) => {
                const x = 70 + k * 100;
                const on = k === i;
                return (
                  <Lift key={r.n} on={on} dimmed={!on} onClick={() => setI(k)} lift={12}>
                    {on && <PulseDisc cx={x} cy={170} rx={42} ry={13} dur={2.1} peak={0.3} />}
                    <Float amp={on ? 6 : 2.5} dur={on ? 2.2 : 3.8} delay={k * 0.25}>
                      <g filter="url(#reg-sh)"><IsoBox cx={x} cy={128} s={40} h={40} f={on ? BRAND : PEACH} /></g>
                      <text x={x} y={134} textAnchor="middle" fontSize={17} fontWeight={900} fill="#fff">{k + 1}</text>
                    </Float>
                  </Lift>
                );
              })}
              {[0, 1, 2].map((k) => <Traveler key={k} id="reg" path={hop([70 + k * 100, 110], [170 + k * 100, 110], 24)} dur={1.2} delay={k * 0.4} repeatDelay={1} r={5} />)}
              <text x={220} y={238} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Toda la enseñanza desemboca en lo que solo tú haces</text>
            </svg>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <div className="flex flex-wrap gap-1.5">
              {reglas.map((r, k) => <Pill key={r.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>Regla {k + 1}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <h3 className={`text-xl font-black mb-2 ${heading(isDark)}`}>{reglas[i].n}</h3>
                <p className={`text-base leading-relaxed mb-2 ${textMuted(isDark)}`}>{reglas[i].text}</p>
                <p className={microLabel(isDark)}>El detalle que importa</p>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{reglas[i].dato}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>La pregunta de Deb Oler:</strong> «¿por qué nuestros clientes deberían comprarnos a nosotros antes que a cualquier otro?». Si tu equipo no la responde en una frase, no tienes con qué enseñar.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. La coreografía de seis pasos                                    */
/* ------------------------------------------------------------------ */

function Coreografia({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pasos = [
    { n: 'El Calentador', en: 'The Warmer', tension: 0.35, obj: 'Construir credibilidad mostrando que ya entiendes su industria.', resp: '«Sí, esas son exactamente las presiones que tenemos.»',
      guion: '«Hemos trabajado con varios directores de operaciones del sector y notamos que, aunque casi todos intentan bajar costos renegociando fletes, las tres presiones que de verdad erosionan el margen son X, Y y Z. ¿Coincide con lo que les pasa a ustedes?»' },
    { n: 'El Reencuadre', en: 'The Reframe', tension: 0.72, obj: 'Mover el foco del problema obvio hacia un punto ciego mayor.', resp: '«Nunca lo había visto de esa manera.»',
      guion: '«La mayoría asume que la lentitud en la entrega es culpa de la flota externa. Nuestros datos muestran que el cuello de botella real está en la espera del empaquetado en rampa. Están atacando el síntoma en la carretera; el dinero se fuga en el centro de distribución.»' },
    { n: 'Ahogamiento Racional', en: 'Rational Drowning', tension: 0.9, obj: 'Cuantificar el costo de no hacer nada.', resp: '«No tenía idea de que estábamos perdiendo esa cantidad.»',
      guion: '«Cada minuto de retraso en rampa dispara penalizaciones por nivel de servicio. Multiplicando esas 2,3 horas no detectadas por sus 12 centros, son millones al año solo en tiempo muerto. Aquí están los datos.»' },
    { n: 'Impacto Emocional', en: 'Emotional Impact', tension: 1, obj: 'Que el cliente se reconozca en la historia y baje la defensa de «nosotros somos distintos».', resp: '«Es como si describieras lo que nos pasó el martes.»',
      guion: '«Déjame contarte lo que le pasó a un director de cadena de suministro. Creía operar al 95% de eficiencia hasta que una entrega crítica se congeló tres horas. Pasó la tarde al teléfono mientras el gerente general le exigía respuestas, y terminó autorizando un envío aéreo que se comió la ganancia del trimestre.»' },
    { n: 'Un Nuevo Camino', en: 'A New Way', tension: 0.6, obj: 'Que acepte la solución conceptual. Regla de oro: todavía no mencionas tu producto.', resp: '«Tiene todo el sentido. Eso es lo que necesitamos.»',
      guion: '«Antes de pensar en tecnología, para erradicar esto hacen falta tres capacidades: visibilidad del tiempo de rampa en tiempo real, estandarización del empaque y liberación sin intervención manual. Sin esas tres, cualquier inversión en transporte seguirá siendo inútil.»' },
    { n: 'Tu Solución', en: 'Your Solution', tension: 0.45, obj: 'Mostrar que eres el único capaz de ejecutar ese camino.', resp: '«Ustedes son los únicos que pueden ayudarnos con esto.»',
      guion: '«Aquí es donde nuestra infraestructura conecta con el marco que acabamos de acordar: nuestro monitoreo en rampa y el sistema de insumos unificados son los únicos diseñados para automatizar la liberación. Déjame mostrarte cómo lo ejecutamos.»' },
  ];
  const [i, setI] = useState(1);
  const p = pasos[i];
  return (
    <Shell isDark={isDark} title="La coreografía:" highlight="seis pasos con curva de tensión" subtitle="No es una lista de temas: es una estructura dramática. Lleva al cliente a un lugar incómodo y recién ahí le ofrece la salida. Toca cada paso.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 mb-2">
          <svg viewBox="0 0 700 130" className="w-full h-[110px] overflow-visible" aria-label="Curva de tensión a lo largo de los seis pasos">
            <SceneDefs id="cor" isDark={isDark} />
            <motion.path
              d={`M ${pasos.map((x, k) => `${60 + k * 116},${100 - x.tension * 72}`).join(' L ')}`}
              fill="none" stroke={ORANGE} strokeWidth={3} strokeLinecap="round" opacity={0.35}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            {pasos.map((x, k) => {
              const cx = 60 + k * 116;
              const cy = 100 - x.tension * 72;
              const on = k === i;
              return (
                <g key={x.n} onClick={() => setI(k)} style={{ cursor: 'pointer' }}>
                  {on && <PulseDisc cx={cx} cy={cy} rx={26} ry={26} dur={2} peak={0.3} />}
                  <circle cx={cx} cy={cy} r={18} fill="transparent" />
                  <motion.circle cx={cx} cy={cy} r={on ? 11 : 7} fill={on ? ORANGE : k === 3 ? PINK : '#cbd5e1'} animate={{ scale: on ? [1, 1.12, 1] : 1 }} transition={{ duration: 1.8, repeat: Infinity }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
                  <text x={cx} y={126} textAnchor="middle" fontSize={10.5} fontWeight={on ? 900 : 700} fill={on ? ORANGE : t.muted}>{k + 1}. {x.n}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[42%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>Paso {i + 1} · {p.en}</p>
                <h3 className={`text-xl font-black mb-1.5 ${heading(isDark)}`}>{p.n}</h3>
                <p className={`text-sm leading-snug mb-2 ${textMuted(isDark)}`}>{p.obj}</p>
                <p className={microLabel(isDark)}>Respuesta que buscas</p>
                <p className={`text-sm font-bold text-[#ff851d]`}>{p.resp}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:w-[58%] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={`g${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Cómo suena dicho en voz alta</p>
                <p className={`text-sm md:text-base italic leading-relaxed ${heading(isDark)}`}>{p.guion}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>La regla de oro: <strong>no lideres CON tus diferenciadores, lidera HACIA ellos</strong>. Tu producto aparece en el paso 6, nunca antes.</Footer>
      </div>
    </Shell>
  );
}


/* ------------------------------------------------------------------ */
/* 12. Caso Grainger                                                   */
/* ------------------------------------------------------------------ */

function Grainger({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const etapas = [
    { n: 'El problema', text: 'Grainger distribuye suministros de mantenimiento: herramientas, bombas, ampolletas. El comprador lo trataba como proveedor transaccional y la conversación terminaba siempre en regatear precio.' },
    { n: 'El reencuadre', text: 'Cambiaron la conversación de QUÉ compran a CÓMO compran. Introdujeron una distinción que el cliente no usaba: compras planificadas frente a compras no planificadas.' },
    { n: 'El número', text: 'El 40% del gasto en mantenimiento son compras de última hora: a precio de lista, a más de cien proveedores distintos, sin ningún poder de negociación.' },
    { n: 'La historia', text: 'El serpentín del aire acondicionado del gerente general se rompe en pleno verano. Veinte minutos en espera telefónica, sin stock, y dos operarios cruzando la ciudad en hora peak a comprar tres repuestos «por si acaso».' },
    { n: 'El nuevo camino', text: 'La única forma de eliminar la compra no planificada es consolidar el inventario con un proveedor de escala y cobertura inmediata. Recién ahí aparece su red nacional de distribución.' },
  ];
  const [i, setI] = useState(2);
  return (
    <Shell isDark={isDark} title="Caso Grainger:" highlight="planificar lo no planificado" subtitle="Cómo un distribuidor de ampolletas y bombas dejó de ser un commodity sin cambiar una sola línea de su catálogo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 400 250" className="w-full h-full max-h-[260px] overflow-visible" aria-label="El 40% del gasto de mantenimiento son compras no planificadas">
              <SceneDefs id="gra" isDark={isDark} />
              <IsoFloor cx={200} cy={168} s={190} fill={t.floor} />
              {Array.from({ length: 10 }, (_, k) => {
                const col = k % 5;
                const row = Math.floor(k / 5);
                const x = 110 + col * 42 + row * 18;
                const y = 120 + row * 34;
                const noPlan = k < 4;
                return (
                  <motion.g key={k} initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.05, type: 'spring', stiffness: 130, damping: 12 }}>
                    <Float amp={noPlan ? 5 : 1.5} dur={noPlan ? 2.1 : 4} delay={k * 0.15}>
                      <g filter="url(#gra-sh)"><IsoBox cx={x} cy={y} s={16} h={19} f={noPlan ? BRAND : NEUTRAL(isDark)} /></g>
                    </Float>
                  </motion.g>
                );
              })}
              <PulseDisc cx={148} cy={142} rx={60} ry={20} dur={2.4} peak={0.25} />
              <Traveler id="gra" path={hop([110, 104], [262, 104], 34)} dur={1.8} repeatDelay={0.8} r={5} />
              <text x={200} y={214} textAnchor="middle" fontSize={15} fontWeight={900} fill={ORANGE}>40% del gasto</text>
              <text x={200} y={234} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>son compras no planificadas, a precio de lista</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2 justify-center">
            {etapas.map((e, k) => (
              <motion.button key={e.n} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left p-3 rounded-2xl ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={`text-sm font-black ${heading(isDark)}`}><span className="text-[#ff851d]">{k + 1}.</span> {e.n}</p>
                {k === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs leading-snug mt-1 ${textMuted(isDark)}`}>{e.text}</motion.p>}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="shrink-0 grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
          {[['$7.000 M', 'de facturación'], ['~2 millones', 'de clientes en EE. UU. y Canadá'], ['1 a 5 veces/año', 'compra típica del producto no planificado'], ['$17 → $117', 'costo real de comprar un martillo']].map(([a, b]) => (
            <div key={a} className={`p-2.5 rounded-2xl text-center ${panelClass(isDark)}`}>
              <p className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{a}</p>
              <p className={`text-[10.5px] leading-tight ${textMuted(isDark)}`}>{b}</p>
            </div>
          ))}
        </div>
        <Footer isDark={isDark}>Fíjate en el orden: el producto de Grainger <strong>no cambió</strong>. Lo que cambió fue el problema del que se hablaba, y ese problema solo lo resolvía alguien con su escala.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 13. SAFE-BOLD                                                       */
/* ------------------------------------------------------------------ */

function SafeBold({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const ejes = [
    { k: 'Escala', safe: 'Pequeño', bold: 'Grande', text: 'Una idea con impacto financiero amplio, no un detalle menor de la operación.' },
    { k: 'Riesgo', safe: 'Alcanzable', bold: 'Superar al mercado', text: 'Una transformación que incomoda, no una mejora que cualquiera firmaría sin pensar.' },
    { k: 'Innovación', safe: 'Seguidor', bold: 'Vanguardia', text: 'Un enfoque de punta, no la buena práctica que ya está en todas las presentaciones.' },
    { k: 'Dificultad', safe: 'Fácil', bold: 'Difícil', text: 'Algo que el cliente no puede ejecutar solo. Si es fácil, no te necesita.' },
  ];
  const [vals, setVals] = useState([8, 8, 8, 8]);
  const promedio = vals.reduce((a, b) => a + b, 0) / 4;
  const bold = promedio >= 7;
  return (
    <Shell isDark={isDark} title="SAFE o BOLD:" highlight="audita tu mensaje antes de salir" subtitle="Un marco de Neil Rackham y KPMG para medir si tu propuesta de enseñanza es realmente disruptiva o quedó en folleto corporativo. Mueve los controles.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[55%] flex flex-col gap-3 justify-center">
            {ejes.map((e, k) => (
              <div key={e.k}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-xs font-black uppercase tracking-wider ${vals[k] >= 7 ? 'text-[#ff851d]' : textMuted(isDark)}`}>{e.k}</span>
                  <span className={`text-[11px] ${textMuted(isDark)}`}>{e.safe} → {e.bold}</span>
                </div>
                <input
                  type="range" min={1} max={10} value={vals[k]}
                  onChange={(ev) => setVals(vals.map((v, j) => (j === k ? Number(ev.target.value) : v)))}
                  className="w-full accent-[#ff851d]"
                  aria-label={`${e.k}: de ${e.safe} a ${e.bold}`}
                />
                <p className={`text-[11px] leading-snug ${textMuted(isDark)}`}>{e.text}</p>
              </div>
            ))}
          </div>
          <div className="lg:w-[45%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 320 230" className="w-full max-h-[240px] overflow-visible" aria-label="El mensaje se desplaza entre seguro y audaz">
              <SceneDefs id="saf" isDark={isDark} />
              <IsoFloor cx={160} cy={160} s={160} fill={t.floor} />
              <motion.g animate={{ x: (promedio - 5.5) * 20 }} transition={{ type: 'spring', stiffness: 60, damping: 13 }}>
                {bold && <PulseDisc cx={160} cy={162} rx={48} ry={15} dur={1.8} peak={0.35} />}
                <Float amp={bold ? 8 : 2} dur={bold ? 2 : 4}>
                  <g filter="url(#saf-sh)"><IsoBox cx={160} cy={104} s={44} h={56} f={bold ? BRAND : NEUTRAL(isDark)} /></g>
                </Float>
              </motion.g>
              <text x={55} y={200} textAnchor="middle" fontSize={13} fontWeight={900} fill={!bold ? ORANGE : t.muted}>SAFE</text>
              <text x={265} y={200} textAnchor="middle" fontSize={13} fontWeight={900} fill={bold ? ORANGE : t.muted}>BOLD</text>
              <text x={160} y={222} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Promedio: {promedio.toFixed(1)} de 10</text>
            </svg>
            <div className={`p-3.5 rounded-2xl w-full ${bold ? featuredClass(isDark) : panelClass(isDark)}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{bold
                ? 'Zona BOLD: el mensaje propone algo grande, incómodo y difícil de copiar. Es el territorio donde la enseñanza comercial funciona.'
                : 'Zona SAFE: suena razonable y no molesta a nadie. También es indistinguible de lo que dicen tus competidores.'}</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}><strong>La advertencia de gobernanza:</strong> dentro de tu propia empresa habrá quien quiera limar los bordes del mensaje y poner al inicio las láminas de historia corporativa y premios. Ese es el camino de vuelta a SAFE.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Tomar el control                                                */
/* ------------------------------------------------------------------ */

function Control({ isDark }: SlideProps) {
  const tacticas = [
    { n: 'Silencio táctico', mal: 'El cliente exige 15% de descuento. Respondes rápido, justificas el precio o prometes consultarlo con tu jefatura.', bien: 'Mantienes el contacto visual, haces una pausa de tres a cinco segundos sin incomodarte, y respondes en tono neutro. El silencio absorbe la presión y se la devuelve.' },
    { n: 'Desconectar precio de valor', mal: '«Déjame ver qué puedo hacer con el precio.»', bien: '«Entiendo que el presupuesto aprieta. Pero bajar 15% implica desarmar los componentes que sostienen el retorno que acabamos de validar. ¿Cuál de esas metas está dispuesto a sacrificar?»' },
    { n: 'Anclar en el costo de inacción', mal: 'Comparar tu precio con el de la competencia.', bien: '«Un 15% hoy le ahorra una cifra en la compra, y le cuesta varias veces esa cifra en pérdidas operativas el próximo trimestre.»' },
    { n: 'Intercambiar, no regalar', mal: 'Ceder margen para cerrar.', bien: 'Congelas el precio y pides que jerarquicen los atributos de la oferta. En un caso real, el cliente reveló que un empaque personalizado carísimo le importaba poco: cambiarlo por el estándar mejoró la rentabilidad más que la propia alza de precio.' },
  ];
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="Tomar el control:" highlight="qué hacer cuando aprietan el precio" subtitle="Es el pilar que más incomoda y el más concreto. No se trata de ser duro, sino de no confundir ceder con negociar.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-2 mb-3">
          {tacticas.map((x, k) => <Pill key={x.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.n}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="wait">
            <motion.div key={`m${i}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl flex flex-col justify-center ${isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50'}`}>
              <div className="flex items-center gap-2 mb-2"><XCircle size={18} className="text-[#ef375c]" /><p className={microLabel(isDark)}>Lo que hace el vendedor promedio</p></div>
              <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{tacticas[i].mal}</p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`b${i}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl flex flex-col justify-center ${featuredClass(isDark)}`}>
              <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-[#ff851d]" /><p className={microLabel(isDark)}>Lo que hace el Challenger</p></div>
              <p className={`text-base leading-relaxed ${heading(isDark)}`}>{tacticas[i].bien}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer isDark={isDark}>Tomar el control no es ponerse agresivo: es <strong>no aceptar que la única variable de la conversación sea el precio</strong>.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Capacidad organizacional                                        */
/* ------------------------------------------------------------------ */

function Organizacion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const principios = [
    ['Los Challengers se hacen', 'Enseñar, adaptar y tomar el control son conductas entrenables con herramientas, coaching e incentivos. No es un rasgo de nacimiento.'],
    ['Importa la combinación', 'Los tres pilares juntos o ninguno. Por separado cada uno falla de una forma distinta.'],
    ['Es capacidad organizacional', 'Si cada vendedor inventa su propio insight, la empresa termina prometiendo cosas que no puede escalar.'],
    ['Es un viaje, no un taller', 'No es actualizar un software: es cambiar el sistema operativo comercial. Toma años.'],
  ];
  const [i, setI] = useState(2);
  return (
    <Shell isDark={isDark} title="El insight no se improvisa" highlight="en la reunión" subtitle="El error más común al leer este libro es tratarlo como una técnica individual. Si marketing no fabrica el mensaje, el vendedor termina «enseñando en el desierto».">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 440 260" className="w-full h-full overflow-visible" aria-label="Marketing fabrica el insight y ventas lo entrega en el campo">
              <SceneDefs id="org" isDark={isDark} />
              <IsoFloor cx={220} cy={170} s={200} fill={t.floor} />
              <g>
                <PulseDisc cx={100} cy={172} rx={46} ry={14} dur={2.6} peak={0.26} />
                <Float amp={4} dur={3}>
                  <g filter="url(#org-sh)"><IsoBox cx={100} cy={116} s={48} h={54} f={PEACH} /></g>
                </Float>
                <text x={100} y={214} textAnchor="middle" fontSize={12} fontWeight={900} fill={t.text}>Marketing</text>
                <text x={100} y={231} textAnchor="middle" fontSize={10} fill={t.muted}>fabrica el insight</text>
              </g>
              <g>
                <PulseDisc cx={330} cy={172} rx={46} ry={14} dur={2.2} peak={0.32} />
                <Float amp={6} dur={2.3}>
                  <Persona id="org" cx={330} cy={170} s={1.05} body={BRAND} accessory="star" hair="#2b1a12" />
                </Float>
                <text x={330} y={214} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Ventas</text>
                <text x={330} y={231} textAnchor="middle" fontSize={10} fill={t.muted}>lo entrega y lo adapta</text>
              </g>
              <Traveler id="org" path={hop([130, 110], [300, 130], 40)} dur={1.5} repeatDelay={0.6} r={6} />
              <text x={220} y={252} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>La máquina de generación de insights</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2 justify-center">
            {principios.map(([n, text], k) => (
              <motion.button key={n} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left p-3.5 rounded-2xl ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={`text-sm font-black ${heading(isDark)}`}><span className="text-[#ff851d]">#{k + 1}</span> {n}</p>
                <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{text}</p>
              </motion.button>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>«Enseñar en el desierto» es dejar al cliente preocupado por un problema que <strong>tú no resuelves mejor que nadie</strong>. Le hiciste el favor a tu competencia.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 16. Pensamiento crítico                                             */
/* ------------------------------------------------------------------ */

function Critico({ isDark }: SlideProps) {
  const criticas = [
    ['El estudio ocupa poco del libro', 'Según Capon, la parte empírica es alrededor del 7% del texto. El 93% restante son recomendaciones construidas encima de ese 7%.'],
    ['Faltan los datos', 'De los 44 atributos, solo se nombran unos 25. No se publican escalas, medias, desviaciones, cargas factoriales ni pruebas de validación.'],
    ['La técnica no corresponde', 'Se usó análisis factorial, que sirve para reducir variables, donde correspondía análisis de conglomerados, que es lo que forma grupos. El libro nunca explica cómo llegó a cinco.'],
    ['«Complejidad» no está definida', 'Todo el titular depende de esa variable: el Challenger gana en venta compleja. Pero nunca se define ni se mide qué cuenta como compleja.'],
    ['El momento de los datos', 'Se recogieron durante la recesión de 2009. Los resultados se separan por complejidad, nunca por recesión y recuperación.'],
  ];
  const [i, setI] = useState(2);
  return (
    <Shell isDark={isDark} title="Pensamiento crítico:" highlight="¿qué tan sólido es el estudio?" subtitle="Esto no está en el libro ni en los resúmenes. El modelo es influyente y útil; la pregunta es si está probado como dice estarlo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[55%] flex flex-col gap-1.5 justify-center">
            <p className={microLabel(isDark)}>Las objeciones de Noel Capon (Columbia Business School)</p>
            {criticas.map(([n, text], k) => (
              <motion.button key={n} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left p-2.5 rounded-2xl ${k === i ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={`text-sm font-black ${heading(isDark)}`}>{n}</p>
                {k === i && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{text}</motion.p>}
              </motion.button>
            ))}
          </div>
          <div className="lg:w-[45%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <div className="flex items-center gap-2 mb-1"><AlertTriangle size={17} className="text-amber-500" /><p className={`text-sm font-black ${heading(isDark)}`}>Lo que hay que tener presente</p></div>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>El estudio es <strong>propiedad de CEB</strong>, que vende formación en el modelo, y los datos nunca se publicaron para verificación independiente. Es correlacional y se apoya en autorreporte de los vendedores. Una crítica revisada por pares de 2019 llegó a hablar de fallas «fatales».</p>
            </div>
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center gap-2 mb-1"><CheckCircle2 size={17} className="text-[#ff851d]" /><p className={`text-sm font-black ${heading(isDark)}`}>Lo que igual sirve</p></div>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>La dirección general coincide con lo que mostró SPIN y con la investigación académica sobre orientación al cliente: <strong>el cliente valora aprender algo</strong>. La coreografía de seis pasos es una buena estructura narrativa, aunque su respaldo sea la experiencia y no el experimento.</p>
            </div>
            <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Cómo usarlo entonces:</strong> trátalo como una <em>hipótesis de trabajo bien argumentada</em>, no como una ley. Pruébalo en tus propias reuniones y mide: es exactamente lo que el libro te pide hacer con tus clientes.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Una señal de madurez profesional: <strong>poder usar un modelo y conocer sus límites al mismo tiempo</strong>. Las dos cosas, no una.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 17. Síntesis                                                        */
/* ------------------------------------------------------------------ */

function Sintesis({ isDark }: SlideProps) {
  const chips = ['Caer bien no vende', 'El cliente quiere aprender, no ser interrogado', 'Enseña, adapta y toma el control', 'Sostén la tensión constructiva', 'Cuantifica el costo de no hacer nada', 'Lidera HACIA tus diferenciadores', 'El insight lo fabrica la organización', 'Usa el modelo y conoce sus límites'];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 400 150" className="w-full max-w-sm mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="chs" isDark={isDark} />
        <PulseDisc cx={150} cy={126} rx={44} ry={14} dur={2} peak={0.3} />
        <Float amp={7} dur={2.1}><Persona id="chs" cx={150} cy={124} s={1.05} body={BRAND} accessory="star" hair="#2b1a12" /></Float>
        <Float amp={2} dur={4}><Persona id="chs" cx={260} cy={124} s={1.05} body={NEUTRAL(isDark)} accessory="headset" hair="#4a4a4a" /></Float>
        <Traveler id="chs" path={hop([172, 86], [240, 86], 28)} dur={1.2} repeatDelay={0.6} r={5} />
      </svg>
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Síntesis</p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-3xl md:text-5xl font-black mb-5 leading-tight tracking-tighter z-10 max-w-4xl ${heading(isDark)}`}>
        El cliente no te premia por agradarle. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Te premia por enseñarle algo</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-4xl mb-5 z-10">
        {chips.map((c) => (
          <span key={c} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300 shadow-lg shadow-black/40' : 'bg-white text-gray-700 shadow-md shadow-gray-200'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`max-w-3xl text-base md:text-xl font-medium leading-relaxed z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        La tensión constructiva no es conflicto: es <strong>la incomodidad necesaria para que alguien cambie algo que ya no le sirve</strong>.
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 18-19. Tests                                                        */
/* ------------------------------------------------------------------ */

const CH_BASICO: QuizQ[] = [
  {
    q: '¿Cuáles son los cinco perfiles de vendedor que identificó el estudio?',
    options: ['Challenger, Lobo Solitario, Trabajador Incansable, Solucionador Reactivo y Creador de Relaciones', 'Cazador, Granjero, Consultor, Técnico y Cerrador', 'Junior, Semi-senior, Senior, Experto y Director', 'Inbound, Outbound, Preventa, Postventa y Expansión'],
    answer: 0,
    why: 'Salen de agrupar 44 atributos medidos en unos 6.000 vendedores. No son personalidades: son formas de ejecutar la venta.',
  },
  {
    q: 'Entre las estrellas de venta compleja, ¿qué proporción es Challenger?',
    options: ['Más de la mitad: 54%', 'Alrededor de un cuarto: 25%', 'Uno de cada diez: 10%', 'Apenas un 4%'],
    answer: 0,
    why: 'En venta compleja el Challenger domina con 54%. En el total de estrellas (simple y compleja) baja a 39%.',
  },
  {
    q: '¿Qué le pasa al Creador de Relaciones cuando la venta se vuelve compleja?',
    options: ['Colapsa: es el 26% de los promedio y solo el 4% de las estrellas', 'Se mantiene estable en torno al 20%', 'Mejora, porque la confianza importa más', 'Es el segundo perfil más exitoso'],
    answer: 0,
    why: 'Es el dato más incómodo del libro. La familiaridad sin perspectiva no mueve a nadie a asumir el riesgo de cambiar.',
  },
  {
    q: '¿Cuáles son los tres pilares del modelo Challenger?',
    options: ['Enseñar para diferenciar, adaptar para resonar y tomar el control', 'Prospectar, calificar y cerrar', 'Escuchar, empatizar y acompañar', 'Investigar, presentar y negociar'],
    answer: 0,
    why: 'Y la insistencia del modelo es que van juntos: enseñar sin adaptar es irrelevante, adaptar sin enseñar te vuelve genérico.',
  },
  {
    q: 'Según el estudio de lealtad, ¿qué pesa más para que un cliente B2B siga comprando?',
    options: ['La experiencia de compra: cómo le vendes (53%)', 'La marca y la empresa (19%)', 'El producto y el servicio (19%)', 'La relación precio-valor (9%)'],
    answer: 0,
    why: 'Más de la mitad de la lealtad se juega en la conversación comercial. Marca, producto y servicio suman 38%: son el precio de entrada.',
  },
  {
    q: '¿Qué es la "fatiga de soluciones"?',
    options: ['El desgaste del comprador por tener que educar a proveedor tras proveedor antes de recibir valor', 'El cansancio del vendedor tras ciclos de venta largos', 'La saturación del mercado con productos parecidos', 'La caída de la motivación del equipo al final del trimestre'],
    answer: 0,
    why: 'Por eso abrir con «¿qué le quita el sueño?» ya no funciona: le pides al cliente que invierta su tiempo antes de darle nada.',
  },
  {
    q: '¿Cuál es la respuesta que buscas tras un buen Reencuadre?',
    options: ['«Nunca lo había visto de esa manera»', '«Estoy totalmente de acuerdo»', '«Eso ya lo sabíamos»', '«Mándame una propuesta»'],
    answer: 0,
    why: 'Si el cliente está totalmente de acuerdo, no le enseñaste nada: solo confirmaste lo que ya pensaba.',
  },
  {
    q: 'En la coreografía de seis pasos, ¿cuándo mencionas tu producto?',
    options: ['En el paso 6, al final, después de que aceptó el nuevo camino', 'En el paso 1, para establecer credibilidad', 'En el paso 3, junto con los números', 'En cualquier momento, si surge la oportunidad'],
    answer: 0,
    why: 'La regla de oro: no lideres CON tus diferenciadores, lidera HACIA ellos. Primero compra el método, después el producto.',
  },
  {
    q: '¿Qué distingue la "tensión constructiva" del simple conflicto?',
    options: ['Es incomodidad diplomática y deliberada para mover al cliente del statu quo', 'Es discutir con el cliente hasta que ceda', 'Es presionar con plazos y ofertas por tiempo limitado', 'Es evitar el tema del precio hasta el final'],
    answer: 0,
    why: 'El Creador de Relaciones disuelve la tensión; el Challenger la sostiene con un propósito: que el cliente vea lo que está perdiendo.',
  },
  {
    q: 'El caso Grainger (suministros de mantenimiento) muestra que…',
    options: ['Se puede salir del commodity cambiando el problema del que se habla, sin cambiar el producto', 'Hay que bajar el precio para ganar volumen', 'Conviene ampliar el catálogo de productos', 'La clave es tener mejor servicio posventa'],
    answer: 0,
    why: 'Pasaron de hablar de QUÉ compran a CÓMO compran, y revelaron que el 40% del gasto son compras no planificadas a precio de lista.',
  },
];

const CH_AVANZADO: QuizQ[] = [
  {
    q: '¿Cómo cambia la brecha entre el vendedor promedio y la estrella al pasar de venta transaccional a venta compleja?',
    options: ['De 59% a cerca de 190%: se multiplica por más de tres', 'Se mantiene estable alrededor del 60%', 'Se reduce, porque el proceso está más estandarizado', 'Se duplica, de 59% a 118%'],
    answer: 0,
    why: 'El estrella pasa de rendir 159% a 289% respecto del promedio. Por eso el resultado depende de pocas personas, que es un problema de gestión.',
  },
  {
    q: 'De los beneficios que las empresas creen tener como únicos, ¿cuántos perciben así los clientes?',
    options: ['Solo el 14%, aunque el 35% de las empresas se declara preferida', 'Cerca del 60%', 'Prácticamente todos', 'No se midió'],
    answer: 0,
    why: 'Es el dato que da sentido a la pregunta de Deb Oler: «¿por qué deberían comprarnos a nosotros antes que a cualquier otro?».',
  },
  {
    q: '¿En qué se diferencia la calculadora de la enseñanza comercial de un ROI tradicional?',
    options: ['Mide el costo de la inacción sobre el problema reencuadrado, antes de mencionar tu producto', 'Incluye el costo total de propiedad a cinco años', 'Compara tu precio con el de los competidores', 'Calcula la comisión del vendedor'],
    answer: 0,
    why: 'El ROI tradicional mide el retorno de comprarte. Este mide lo que el cliente pierde cada mes por no hacer nada, que es lo que rompe la inercia.',
  },
  {
    q: 'En el marco SAFE-BOLD, ¿qué significa la dimensión "Dificultad" en el extremo BOLD?',
    options: ['La solución debe ser difícil de ejecutar por el cliente o por terceros, lo que justifica contratarte', 'El mensaje debe ser difícil de entender para parecer sofisticado', 'La negociación debe ser dura', 'El plazo de implementación debe ser largo'],
    answer: 0,
    why: 'Si el cliente puede resolverlo solo, enseñarle fue un regalo. Las cuatro dimensiones son escala, riesgo, innovación y dificultad.',
  },
  {
    q: 'El coaching eficaz lleva al vendedor promedio de 83% a 102% de cumplimiento de meta. ¿Cómo se lee ese cambio?',
    options: ['Son 19 puntos de cumplimiento: de no llegar a la meta a superarla', 'Una mejora del 19% sobre el desempeño previo', 'Una mejora del 6%, el límite inferior del rango', 'Un cambio sin relevancia, porque sigue cerca del 100%'],
    answer: 0,
    why: 'Son puntos de cumplimiento, no un porcentaje de mejora (en términos relativos serían cerca de 23%). Y sobre los vendedores de bajo rendimiento el coaching casi no tiene efecto.',
  },
  {
    q: 'Ante «están 15% sobre la competencia, iguale el precio o se acaba la reunión», ¿qué hace un Challenger?',
    options: ['Pausa tres a cinco segundos y devuelve la pregunta: qué meta financiera están dispuestos a sacrificar', 'Ofrece un descuento menor para mostrar voluntad', 'Promete consultarlo con su jefatura', 'Explica rápidamente por qué su producto es superior'],
    answer: 0,
    why: 'El silencio táctico absorbe la agresión y devuelve la presión. Después se desconecta el precio del valor y se intercambian concesiones en vez de regalar margen.',
  },
  {
    q: '¿Cuál es la crítica metodológica central de Noel Capon al estudio?',
    options: ['Se usó análisis factorial, que reduce variables, en lugar de análisis de conglomerados, que es lo que forma grupos; y nunca se explica cómo se llegó a cinco perfiles', 'La muestra de 6.000 vendedores es demasiado pequeña', 'Se midió solo en Estados Unidos', 'Los autores no tenían experiencia en ventas'],
    answer: 0,
    why: 'Capon añade que la parte empírica ocupa cerca del 7% del libro, que no se publican cargas factoriales ni validaciones, y que «complejidad» nunca se define pese a sostener todo el titular.',
  },
  {
    q: '¿Por qué importa que los datos se recogieran durante la recesión de 2009?',
    options: ['Porque el libro separa los resultados por complejidad pero nunca por recesión y recuperación, y la ventaja del perfil podría depender del ciclo económico', 'Porque en 2009 no existía el CRM', 'Porque la muestra fue más pequeña ese año', 'Porque los vendedores estaban desmotivados'],
    answer: 0,
    why: 'En una crisis el comprador es más averso al riesgo y puede responder distinto. Sin esa separación no se puede distinguir el efecto del perfil del efecto del contexto.',
  },
  {
    q: 'Entre 2007 y 2010 los concesionarios pasaron de 21.200 a 18.460. Una fuente lo llama «una contracción del 15%». ¿Qué dice la cuenta?',
    options: ['Cerca del 13%: (21.200 − 18.460) ÷ 21.200 = 12,9%', 'Exactamente 15%, como indica la fuente', 'Cerca del 20%', 'No se puede calcular sin más datos'],
    answer: 0,
    why: 'Es un buen ejemplo de por qué conviene rehacer las cuentas antes de repetir una cifra. El error es pequeño, pero es el mismo tipo que convirtió «3,2 veces» en «cuatro».',
  },
  {
    q: 'Con todo lo anterior, ¿cuál es la postura profesional razonable?',
    options: ['Usar el modelo como hipótesis de trabajo y medir sus resultados en tus propias reuniones', 'Descartarlo por completo por falta de rigor', 'Aplicarlo tal cual, porque es el más vendido', 'Esperar a que aparezca un estudio mejor antes de cambiar nada'],
    answer: 0,
    why: 'Es exactamente lo que el libro te pide hacer con tus clientes: no aceptar una afirmación por cómo suena, sino pedirle los números.',
  },
];

function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1:" highlight="perfiles y modelo" subtitle="Diez preguntas de nivel principiante sobre los cinco perfiles, los tres pilares y la coreografía de enseñanza comercial.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={CH_BASICO} />
    </Shell>
  );
}

function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2:" highlight="táctica y evidencia" subtitle="Diez preguntas de nivel avanzado: las cifras finas, la negociación bajo presión y qué tan sólido es el estudio que sostiene todo esto.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={CH_AVANZADO} />
    </Shell>
  );
}


/* ================================================================== */
/* Ampliación con cifras del libro                                     */
/* ================================================================== */

/* Tarjeta de cifra con número animado. */
function Cifra({ isDark, n, sufijo = '', titulo, lineas, destacada = false }: { isDark: boolean; n: number; sufijo?: string; titulo: string; lineas: string[]; destacada?: boolean }) {
  const v = useCountUp(n);
  return (
    <div className={`p-4 rounded-3xl flex flex-col gap-1 ${destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
      <p className={microLabel(isDark)}>{titulo}</p>
      <p className="text-3xl md:text-4xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{v.toLocaleString('es-CL')}{sufijo}</p>
      {lineas.map((l) => <p key={l} className={`text-xs leading-snug ${textMuted(isDark)}`}>{l}</p>)}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A. La paradoja del poder (BayGroup)                                 */
/* ------------------------------------------------------------------ */

function Poder({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const lados = [
    { x: 130, quien: 'Vendedor', cree: 'de los vendedores creen que', otro: 'COMPRAS tiene más poder', body: BRAND, acc: 'tie' as Accessory, hair: '#2b1a12' },
    { x: 430, quien: 'Comprador', cree: 'de los compradores creen que', otro: 'el VENDEDOR tiene más poder', body: SLATE(isDark), acc: 'headset' as Accessory, hair: '#4a4a4a' },
  ];
  return (
    <Shell isDark={isDark} title="La paradoja del poder:" highlight="los dos creen estar en desventaja" subtitle="Una encuesta de BayGroup International preguntó a ambos lados de la mesa quién tiene más poder en la negociación. La respuesta no coincide.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[58%] min-h-0 flex items-center">
            <svg viewBox="0 0 560 310" className="w-full h-full overflow-visible" aria-label="El 75% de los vendedores cree que compras tiene más poder; el 75% de los compradores cree que los vendedores lo tienen">
              <SceneDefs id="pod" isDark={isDark} />
              <IsoFloor cx={280} cy={262} s={270} fill={t.floor} />
              {lados.map((l, k) => (
                <motion.g key={l.quien} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.2, type: 'spring', stiffness: 90, damping: 13 }}>
                  <text x={l.x} y={52} textAnchor="middle" fontSize={30} fontWeight={900} fill={ORANGE}>75%</text>
                  <text x={l.x} y={72} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{l.cree}</text>
                  <text x={l.x} y={88} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.text}>{l.otro}</text>
                  {[0, 1, 2, 3].map((i) => (
                    <Float key={i} amp={i < 3 ? 4 : 1} dur={2.4} delay={i * 0.2 + k * 0.3}>
                      <g filter="url(#pod-sh)"><IsoBox cx={l.x - 66 + i * 44} cy={132} s={17} h={18} f={i < 3 ? BRAND : NEUTRAL(isDark)} /></g>
                    </Float>
                  ))}
                  <PulseDisc cx={l.x} cy={264} rx={44} ry={14} dur={2.4} delay={k * 0.6} peak={0.28} />
                  <Float amp={4} dur={3} delay={k * 0.4}>
                    <Persona id="pod" cx={l.x} cy={262} s={1.1} body={l.body} accessory={l.acc} hair={l.hair} />
                  </Float>
                  <text x={l.x} y={298} textAnchor="middle" fontSize={12.5} fontWeight={900} fill={t.text}>{l.quien}</text>
                </motion.g>
              ))}
              <Orb id="pod" cx={280} cy={140} r={26} />
              <text x={280} y={150} textAnchor="middle" fontSize={26} fontWeight={900} fill="#fff">?</text>
              <Traveler id="pod" path={hop([176, 214], [384, 214], 44)} dur={2} repeatDelay={0.6} r={6} />
              <Traveler id="pod" path={hop([384, 226], [176, 226], 20)} dur={2} delay={1} repeatDelay={0.6} r={5} color={PINK} />
            </svg>
          </div>
          <div className="lg:w-[42%] flex flex-col gap-3 justify-center">
            <div className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que dice la encuesta</p>
              <p className={`text-base leading-relaxed ${textMuted(isDark)}`}><strong>3 de cada 4 vendedores</strong> creen que el área de compras tiene más poder. <strong>3 de cada 4 compradores</strong> creen que el poder lo tiene el vendedor. Los dos grupos se sienten del lado débil.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Por qué importa en la negociación</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Un vendedor que <strong>se percibe sin poder</strong> cede descuento por reflejo. Es la conducta del Creador de Relaciones. El Challenger parte de la premisa contraria: tiene algo que el cliente no sabe, y eso equilibra la mesa.</p>
            </div>
            <p className={`text-xs ${textMuted(isDark)}`}>Es un dato de percepción, no de poder real. Pero en una negociación la percepción <em>es</em> el terreno de juego.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* B. Cuánta evidencia hay detrás                                      */
/* ------------------------------------------------------------------ */

function Evidencia({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const B = 236;
  return (
    <Shell isDark={isDark} title="Las cifras del estudio:" highlight="de dónde sale cada número" subtitle="El modelo se apoya en cuatro investigaciones distintas. Conviene saber cuál es cuál, porque en los resúmenes circulan mezcladas.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[36%] min-h-0 flex flex-col items-center justify-center">
            <svg viewBox="0 0 360 310" className="w-full h-full max-h-[330px] overflow-visible" aria-label="La muestra pasó de 700 a más de 6.000 vendedores">
              <SceneDefs id="evi" isDark={isDark} />
              <IsoFloor cx={180} cy={B + 4} s={170} fill={t.floor} />
              <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ type: 'spring', stiffness: 70, damping: 15 }} style={{ transformOrigin: `100px ${B}px` }}>
                <g filter="url(#evi-sh)"><IsoBox cx={100} cy={B - 18} s={34} h={18} f={NEUTRAL(isDark)} /></g>
              </motion.g>
              <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.25, type: 'spring', stiffness: 55, damping: 14 }} style={{ transformOrigin: `260px ${B}px` }}>
                <PulseDisc cx={260} cy={B + 2} rx={52} ry={16} dur={2.3} peak={0.3} />
                <Float amp={4} dur={2.6}><g filter="url(#evi-sh)"><IsoBox cx={260} cy={B - 150} s={34} h={150} f={BRAND} /></g></Float>
              </motion.g>
              <text x={100} y={B - 18 - 17 - 10} textAnchor="middle" fontSize={20} fontWeight={900} fill={isDark ? '#e5e7eb' : '#374151'}>700</text>
              <text x={260} y={B - 150 - 17 - 12} textAnchor="middle" fontSize={22} fontWeight={900} fill={ORANGE}>6.000+</text>
              <text x={100} y={B + 52} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Estudio inicial</text>
              <text x={260} y={B + 52} textAnchor="middle" fontSize={11} fontWeight={800} fill={ORANGE}>Ampliación</text>
              <rect x={150} y={126} width={60} height={26} rx={13} fill="url(#evi-brand)" />
              <text x={180} y={144} textAnchor="middle" fontSize={13} fontWeight={900} fill="#fff">×8,6</text>
              <text x={180} y={296} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Vendedores estudiados por CEB</text>
            </svg>
          </div>
          <div className="lg:w-[64%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
            <Cifra isDark={isDark} destacada n={90} titulo="Estudio principal · empresas" lineas={['Industrias, geografías y modelos comerciales distintos.', '44 atributos medidos → 5 perfiles.', 'Parte con 700 vendedores y se amplía a 6.000+.']} />
            <Cifra isDark={isDark} n={12000} titulo="Gerentes de ventas · vendedores evaluados" lineas={['Más de 2.500 gerentes de primera línea.', '65 empresas, con el Sales Leadership Diagnostic.']} />
            <Cifra isDark={isDark} n={5000} sufijo="+" titulo="Lealtad B2B · compradores" lineas={['Ejecutivos C-suite, compras y usuarios finales.', '50 variables de desempeño evaluadas.']} />
            <Cifra isDark={isDark} n={35000} titulo="Antecedente · llamadas de Rackham" lineas={['10.000 vendedores en 23 países.', 'Seguidas durante 12 años (SPIN Selling).']} />
          </div>
        </div>
        <Footer isDark={isDark}>Cuatro estudios, cuatro muestras. Al citar una cifra, <strong>di de cuál hablas</strong>: «700 vendedores» y «6.000 vendedores» no son contradicción, son dos etapas de la misma investigación.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* C. Voces del campo (citas)                                          */
/* ------------------------------------------------------------------ */

function Citas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const citas = [
    { id: 'r1', quien: 'Neil Rackham', rol: 'Autor de SPIN Selling', es: '«La relación con el cliente es el resultado de una venta exitosa, no su causa.»', en: '“A customer relationship is the result and not the cause of successful selling.”', nota: 'Contradice el «primero construyo la relación y después vendo». Es el fundamento del colapso del Creador de Relaciones.', acc: 'compass' as Accessory, body: PEACH, hair: '#8a8a8a' },
    { id: 'r2', quien: 'Neil Rackham', rol: 'Autor de SPIN Selling', es: '«Cómo vendes se ha vuelto más importante que lo que vendes.»', en: '“How you sell has become more important than what you sell.”', nota: 'Es la versión en una línea del 53% de lealtad que explica la experiencia de compra.', acc: 'compass' as Accessory, body: PEACH, hair: '#8a8a8a' },
    { id: 'oler', quien: 'Debra Oler', rol: 'Vicepresidenta y gerente general, W. W. Grainger', es: '«¿Por qué nuestros clientes deberían comprarnos a nosotros antes que a cualquier otro?»', en: '“Why should our customers buy from us over anyone else?”', nota: 'La pregunta que casi ningún equipo comercial sabe responder en una sola frase.', acc: 'star' as Accessory, body: BRAND, hair: '#5a2d14' },
    { id: 'grasa', quien: 'Ejecutivo de ventas', rol: 'Sector químico y suministros', es: '«Tú y yo podemos vender cubetas de grasa para ejes sin marca al mismo precio. Pero si yo vendo la mía mejor de lo que tú vendes la tuya, voy a ganar.»', en: '“…if I can sell my five-gallon bucket of unbranded axle grease better than you can sell yours—well, then I’m going to win.”', nota: 'Aun en un commodity puro, lo que diferencia es cómo se vende.', acc: 'tie' as Accessory, body: BRAND, hair: '#2b1a12' },
    { id: 'lobo', quien: 'Vicepresidente de ventas', rol: 'Sobre los Lobos Solitarios', es: '«Francamente, los despediría si pudiera, pero no puedo, porque todos están destrozando sus cuotas.»', en: '“Frankly, I’d fire them if I could, but I can’t, because they’re all crushing their numbers.”', nota: 'El dilema del Lobo Solitario: rompe todas las reglas y cumple el número.', acc: 'compass' as Accessory, body: SLATE(isDark), hair: '#4a4a4a' },
    { id: 'hosp', quien: 'Director global de ventas', rol: 'Industria de la hospitalidad', es: '«Durante diez años nuestra estrategia fue contratar Creadores de Relaciones. Pero desde que la economía se derrumbó, están completamente perdidos. No pueden vender nada.»', en: '“…ever since the economy crashed, my Relationship Builders are completely lost. They can’t sell a thing.”', nota: 'Un perfil que funcionaba en la bonanza y colapsa cuando el cliente tiene miedo.', acc: 'heart' as Accessory, body: PEACH, hair: '#7a3e1d' },
  ];
  const [i, setI] = useState(0);
  const c = citas[i];
  return (
    <Shell isDark={isDark} title="Voces del campo:" highlight="lo que dicen quienes lo viven" subtitle="Seis frases del libro. Las dos primeras son de Rackham; las demás vienen de ejecutivos que enfrentaron el problema en su propia operación.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
          {citas.map((x, k) => <Pill key={x.id} isDark={isDark} on={k === i} onClick={() => setI(k)}>{k + 1}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[30%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 260 300" className="w-full h-full max-h-[300px] overflow-visible" aria-label={`${c.quien}, ${c.rol}`}>
              <SceneDefs id="cit" isDark={isDark} />
              <IsoFloor cx={130} cy={236} s={120} fill={t.floor} />
              <PulseDisc cx={130} cy={238} rx={50} ry={16} dur={2.2} peak={0.3} />
              <AnimatePresence mode="wait">
                <motion.g key={c.id} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 14 }} style={{ transformOrigin: '130px 236px' }}>
                  <Float amp={4} dur={2.8}><Persona id="cit" cx={130} cy={236} s={1.45} body={c.body} accessory={c.acc} hair={c.hair} /></Float>
                </motion.g>
              </AnimatePresence>
              <text x={130} y={286} textAnchor="middle" fontSize={13} fontWeight={900} fill={ORANGE}>{c.quien}</text>
            </svg>
          </div>
          <div className="lg:w-[70%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={c.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="flex flex-col gap-3">
                <div className={`p-6 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>{c.rol}</p>
                  <p className={`text-xl md:text-2xl font-bold leading-snug mt-1 ${heading(isDark)}`}>{c.es}</p>
                  <p className={`text-xs italic mt-3 ${textMuted(isDark)}`}>{c.en}</p>
                </div>
                <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Cómo se conecta con la clase</p>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{c.nota}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* D. Diferenciación: del 75% al 14%                                   */
/* ------------------------------------------------------------------ */

function Diferenciacion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const B = 214;
  const torres = [
    { x: 80, v: 75, a: 'Aspiran a ser', b: 'proveedores de soluciones' },
    { x: 220, v: 35, a: 'Logran ser', b: 'preferidas por el cliente' },
    { x: 360, v: 14, a: 'Beneficios percibidos', b: 'como únicos y valiosos' },
  ];
  return (
    <Shell isDark={isDark} title="El embudo de la diferenciación:" highlight="75% → 35% → 14%" subtitle="Casi todos quieren ser distintos. Muy pocos lo consiguen. Y de lo que cada empresa cree único, el cliente reconoce una fracción mínima.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[56%] min-h-0 flex items-center">
            <svg viewBox="0 0 440 300" className="w-full h-full overflow-visible" aria-label="75% aspira a ser proveedor de soluciones, 35% es preferido, 14% de los beneficios se perciben como únicos">
              <SceneDefs id="dif" isDark={isDark} />
              <IsoFloor cx={220} cy={B + 6} s={210} fill={t.floor} />
              {torres.map((tw, k) => {
                const h = Math.max(20, tw.v * 1.6);
                return (
                  <g key={tw.v}>
                    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: k * 0.2, type: 'spring', stiffness: 65, damping: 14 }} style={{ transformOrigin: `${tw.x}px ${B}px` }}>
                      {k === 2 && <PulseDisc cx={tw.x} cy={B + 2} rx={50} ry={15} dur={2} peak={0.35} />}
                      <Float amp={k === 2 ? 5 : 2} dur={k === 2 ? 2.2 : 4} delay={k * 0.3}>
                        <g filter="url(#dif-sh)"><IsoBox cx={tw.x} cy={B - h} s={34} h={h} f={k === 2 ? BRAND : k === 1 ? PEACH : NEUTRAL(isDark)} /></g>
                      </Float>
                    </motion.g>
                    <text x={tw.x} y={B - h - 17 - 12} textAnchor="middle" fontSize={24} fontWeight={900} fill={k === 2 ? ORANGE : t.text}>{tw.v}%</text>
                    <text x={tw.x} y={B + 50} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{tw.a}</text>
                    <text x={tw.x} y={B + 66} textAnchor="middle" fontSize={11} fontWeight={800} fill={k === 2 ? ORANGE : t.text}>{tw.b}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[44%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Un caso de servicios financieros</p>
              <p className={`text-sm leading-snug mb-2 ${textMuted(isDark)}`}>Una firma invirtió millones durante tres años para subir la satisfacción de sus clientes. Sus dos mayores rivales hicieron lo mismo.</p>
              <div className="flex flex-col gap-2.5">
                <Bar isDark={isDark} label="Antes de invertir" value={65} max={100} brand={false} delay={0.1} />
                <Bar isDark={isDark} label="Después de invertir" value={95} max={100} delay={0.3} />
                <Bar isDark={isDark} label="Competidor más fuerte" value={96} max={100} brand={false} delay={0.5} />
              </div>
              <p className={`text-xs mt-2 ${textMuted(isDark)}`}>Resultado: <strong>ventaja comercial nula</strong>. Mejorar lo que todos mejoran es mantenerse en el mismo lugar.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>De ahí la <strong>regla 1</strong> de la enseñanza comercial: tu diferenciador solo existe si el cliente lo reconoce como único.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* E. Buzzwords                                                        */
/* ------------------------------------------------------------------ */

function Buzzwords({ isDark }: SlideProps) {
  const palabras = [
    ['Leader (líder)', 161000],
    ['Leading (líder, adj.)', 44900],
    ['Best (el mejor)', 43000],
    ['Top (de primera)', 32500],
    ['Unique (único)', 30400],
    ['Solution (solución)', 22600],
    ['Innovative (innovador)', 21800],
  ] as [string, number][];
  const total = palabras.reduce((a, [, v]) => a + v, 0);
  return (
    <Shell isDark={isDark} title="Todos dicen lo mismo:" highlight="el ruido de los comunicados" subtitle="Adam Sherk contó cuántas veces aparecen ciertas palabras en comunicados de prensa corporativos. Es el mapa de cómo suena la «diferenciación» cuando todos la declaran.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className={`lg:w-[60%] p-5 rounded-3xl flex flex-col justify-center gap-2.5 ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Menciones en comunicados de prensa</p>
            {palabras.map(([n, v], i) => (
              <div key={n}>
                <div className="flex justify-between text-sm mb-0.5"><span className={`font-bold ${i === 4 ? 'text-[#ff851d]' : textMuted(isDark)}`}>{n}</span><span className={`font-black ${heading(isDark)}`}>{v.toLocaleString('es-CL')}</span></div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
                  <motion.div className={`h-full rounded-full ${i === 4 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-[0_0_14px_rgba(255,133,29,0.5)]' : 'bg-gray-400'}`} initial={{ width: 0 }} animate={{ width: `${(v / 161000) * 100}%` }} transition={{ delay: i * 0.08, duration: 0.8, ease: 'easeOut' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-[40%] flex flex-col gap-3 justify-center">
            <div className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>La ironía</p>
              <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>La palabra «<strong>único</strong>» aparece más de <strong>30.000 veces</strong>. Si miles de empresas dicen que son únicas, la palabra deja de distinguir a ninguna.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Y «líder» lo dice casi todo el mundo</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>«Leader» aparece <strong>161.000 veces</strong>: más que las otras seis palabras juntas ({(total - 161000).toLocaleString('es-CL')}). Es la señal de un mercado donde todos prometen lo mismo con las mismas palabras.</p>
            </div>
            <p className={`text-xs ${textMuted(isDark)}`}>Conecta con el 14%: cuando todos dicen «único», el cliente solo reconoce como tal lo que <em>le enseñaron</em>, no lo que se autodeclaró.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* F. ADP: costos redundantes y mercado a la baja                      */
/* ------------------------------------------------------------------ */

function Adp({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const B = 214;
  return (
    <Shell isDark={isDark} title="Caso ADP:" highlight="enseñar en un mercado que se achica" subtitle="ADP Dealer Services vende software a concesionarios de autos. Entre 2007 y 2010 los concesionarios cayeron de 21.200 a 18.460, una contracción de cerca del 13%.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[58%] min-h-0 flex items-center">
            <svg viewBox="0 0 520 300" className="w-full h-full overflow-visible" aria-label="Doce proveedores de TI con 40% de costos redundantes; las ventas de autos nuevas cayeron 40% y los ingresos de ADP 4%">
              <SceneDefs id="adp" isDark={isDark} />
              <IsoFloor cx={260} cy={B + 8} s={250} fill={t.floor} />
              <text x={118} y={52} textAnchor="middle" fontSize={12} fontWeight={900} fill={t.text}>12 proveedores de TI</text>
              <text x={118} y={68} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>por concesionario</text>
              {Array.from({ length: 12 }, (_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                const red = i < 5;
                return (
                  <motion.g key={i} initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, type: 'spring', stiffness: 130, damping: 12 }}>
                    <Float amp={red ? 4 : 1.5} dur={2.4} delay={i * 0.15}>
                      <g filter="url(#adp-sh)"><IsoBox cx={64 + col * 36} cy={104 + row * 38} s={14} h={16} f={red ? BRAND : NEUTRAL(isDark)} /></g>
                    </Float>
                  </motion.g>
                );
              })}
              <text x={118} y={B + 40} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>≈ 40% de costos</text>
              <text x={118} y={B + 56} textAnchor="middle" fontSize={11} fontWeight={800} fill={ORANGE}>redundantes</text>

              {[{ x: 340, v: 40, c: SLATE(isDark), n: 'Venta de autos nuevos', col: t.text }, { x: 440, v: 4, c: BRAND, n: 'Ingresos de ADP', col: ORANGE }].map((b, k) => {
                const h = Math.max(10, b.v * 2.2);
                return (
                  <g key={b.n}>
                    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 + k * 0.2, type: 'spring', stiffness: 70, damping: 14 }} style={{ transformOrigin: `${b.x}px ${B}px` }}>
                      {k === 1 && <PulseDisc cx={b.x} cy={B + 2} rx={44} ry={14} dur={2.2} peak={0.32} />}
                      <Float amp={k === 1 ? 4 : 1.5} dur={2.8}><g filter="url(#adp-sh)"><IsoBox cx={b.x} cy={B - h} s={30} h={h} f={b.c} /></g></Float>
                    </motion.g>
                    <text x={b.x} y={B - h - 15 - 12} textAnchor="middle" fontSize={22} fontWeight={900} fill={b.col}>−{b.v}%</text>
                    <text x={b.x} y={B + 40} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{b.n.split(' ')[0]} {b.n.split(' ')[1]}</text>
                    <text x={b.x} y={B + 56} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{b.n.split(' ').slice(2).join(' ') || 'en el mismo año'}</text>
                  </g>
                );
              })}
              <Traveler id="adp" path={hop([196, 150], [298, 150], 34)} dur={1.8} repeatDelay={0.8} r={5} />
            </svg>
          </div>
          <div className="lg:w-[42%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>La enseñanza</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>ADP no habló de su software. Mostró a cada concesionario que operaba con <strong>12 proveedores de TI distintos</strong> y que hasta el <strong>40% de ese gasto era redundante</strong>. Lo hizo con «clínicas de rentabilidad».</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El resultado</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>En un año en que la venta de autos nuevos cayó <strong>40%</strong>, los ingresos de ADP cayeron solo <strong>4%</strong>.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Mismo método, otro sector:</strong> Solae (ingredientes de soya) construyó herramientas de mapeo de mensajes por rol y mostró que comprar soluciones integradas recorta hasta un 40% los costos redundantes de varios proveedores.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* G. Adopción: capacitación y coaching                                */
/* ------------------------------------------------------------------ */

function Adopcion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [dia, setDia] = useState<0 | 30>(30);
  return (
    <Shell isDark={isDark} title="Capacitar no alcanza:" highlight="lo que se olvida y lo que el coaching rescata" subtitle="Cambiar la conducta de un equipo es la parte más difícil del modelo. Estas cifras explican por qué un taller de un día no funciona.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 360 290" className="w-full h-full max-h-[300px] overflow-visible" aria-label="Del contenido de una capacitación, el 87% se olvida en 30 días">
              <SceneDefs id="ado" isDark={isDark} />
              <IsoFloor cx={180} cy={180} s={170} fill={t.floor} />
              <motion.text key={dia} x={180} y={52} textAnchor="middle" fontSize={34} fontWeight={900} fill={dia === 30 ? PINK : ORANGE} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>{dia === 0 ? '100%' : '13%'}</motion.text>
              <text x={180} y={74} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{dia === 0 ? 'del contenido, el día de la capacitación' : 'del contenido sigue vivo a los 30 días'}</text>
              {Array.from({ length: 10 }, (_, i) => {
                const col = i % 5;
                const row = Math.floor(i / 5);
                const vivo = dia === 0 || i === 0;
                return (
                  <motion.g key={i} animate={{ opacity: vivo ? 1 : 0.12, y: vivo ? 0 : 10 }} transition={{ delay: dia === 30 ? i * 0.05 : 0, duration: 0.5 }}>
                    <Float amp={vivo ? 4 : 0} dur={2.4} delay={i * 0.1}>
                      <g filter="url(#ado-sh)"><IsoBox cx={72 + col * 54} cy={118 + row * 46} s={19} h={22} f={vivo ? BRAND : NEUTRAL(isDark)} /></g>
                    </Float>
                  </motion.g>
                );
              })}
              <text x={180} y={250} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={dia === 30 ? PINK : t.muted}>{dia === 30 ? '87% olvidado en un mes' : 'Cada cubo es un 10% del contenido'}</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={dia === 0} onClick={() => setDia(0)}>Día 0</Pill>
              <Pill isDark={isDark} on={dia === 30} onClick={() => setDia(30)}>Día 30</Pill>
            </div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>El efecto del coaching sobre el vendedor promedio</p>
              <div className="flex flex-col gap-2.5 mt-1">
                <Bar isDark={isDark} label="Cumplimiento de meta sin coaching eficaz" value={83} max={110} brand={false} delay={0.1} />
                <Bar isDark={isDark} label="Con coaching eficaz" value={102} max={110} delay={0.3} />
              </div>
              <p className={`text-xs mt-2 ${textMuted(isDark)}`}>Son <strong>19 puntos</strong> de cumplimiento: de no llegar a la meta a superarla. Sobre los vendedores de bajo rendimiento el coaching casi no tiene efecto: no corrige una falta de aptitud básica.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={25} sufijo="%" titulo="No logra la transición" lineas={['Entre el 20% y el 30% de la fuerza de ventas no hace el cambio hacia el modelo Challenger.']} />
              <Cifra isDark={isDark} n={80} sufijo="%" titulo="Adopción que buscan los líderes" lineas={['Perseguir el 20% final resulta desproporcionadamente costoso.']} />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* H. El gerente de ventas                                             */
/* ------------------------------------------------------------------ */

function Gerentes({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const B = 232;
  const pesos = [
    { n: 'Innovación', v: 29.2, nota: 'El factor de mayor impacto.' },
    { n: 'Coaching', v: 28.0, nota: 'Casi igual de decisivo.' },
    { n: 'Venta', v: 26.6, nota: 'Habilidades de venta propias.' },
    { n: 'Recursos', v: 16.2, nota: 'El de menor impacto directo.' },
  ];
  const [i, setI] = useState(0);
  return (
    <Shell isDark={isDark} title="El gerente de ventas:" highlight="el eslabón que no estaba listo" subtitle="CEB evaluó a más de 2.500 gerentes de primera línea con evaluaciones de 12.000 vendedores en 65 empresas. El diagnóstico es duro.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible" aria-label="Peso relativo de cuatro habilidades comerciales del gerente de ventas">
              <SceneDefs id="ger" isDark={isDark} />
              <IsoFloor cx={200} cy={B + 6} s={200} fill={t.floor} />
              {pesos.map((p, k) => {
                const h = p.v * 5;
                const x = 62 + k * 92;
                const on = k === i;
                return (
                  <Lift key={p.n} on={on} dimmed={false} onClick={() => setI(k)} lift={9}>
                    {on && <PulseDisc cx={x} cy={B + 2} rx={44} ry={14} dur={2.1} peak={0.3} />}
                    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: k * 0.1, type: 'spring', stiffness: 70, damping: 14 }} style={{ transformOrigin: `${x}px ${B}px` }}>
                      <Float amp={on ? 5 : 1.5} dur={2.4} delay={k * 0.2}>
                        <g filter="url(#ger-sh)"><IsoBox cx={x} cy={B - h} s={30} h={h} f={on ? BRAND : k === 3 ? NEUTRAL(isDark) : PEACH} /></g>
                      </Float>
                    </motion.g>
                    <text x={x} y={B - h - 15 - 12} textAnchor="middle" fontSize={17} fontWeight={900} fill={on ? ORANGE : t.text}>{String(p.v).replace('.', ',')}%</text>
                    <text x={x} y={B + 40} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={on ? ORANGE : t.muted}>{p.n}</text>
                  </Lift>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} destacada n={63} sufijo="%" titulo="Sin las habilidades para el modelo" lineas={['de los gerentes, según los ejecutivos.']} />
              <Cifra isDark={isDark} n={9} sufijo="%" titulo="Sin las habilidades de su rol actual" lineas={['Por diferencia, solo alrededor del 28% estaría preparado.']} />
            </div>
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Qué hace excelente a un gerente</p>
              <div className={`flex h-7 rounded-full overflow-hidden mt-1 ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
                <motion.div className="h-full bg-gray-400 flex items-center justify-center text-[11px] font-black text-white" initial={{ width: 0 }} animate={{ width: '26.6%' }} transition={{ duration: 0.9 }}>26,6%</motion.div>
                <motion.div className="h-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] flex items-center justify-center text-[11px] font-black text-white" initial={{ width: 0 }} animate={{ width: '73.4%' }} transition={{ duration: 0.9, delay: 0.2 }}>73,4%</motion.div>
              </div>
              <div className="flex justify-between text-[11px] mt-1">
                <span className={textMuted(isDark)}>Fundamentos de gestión (integridad, escucha)</span>
                <span className="font-bold text-[#ff851d]">Habilidades comerciales</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-xs leading-snug mt-2 ${textMuted(isDark)}`}><strong>{pesos[i].n} · {String(pesos[i].v).replace('.', ',')}%.</strong> {pesos[i].nota}</motion.p>
              </AnimatePresence>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Ojo con el desglose:</strong> los cuatro valores suman 100, no 73,4. Son pesos relativos entre las habilidades comerciales, no partes de ese 73,4%. Más en la diapositiva «Lo que no cuadra».</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* I. Lo que no cuadra                                                 */
/* ------------------------------------------------------------------ */

function Cuadran({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const items = [
    { id: 'brecha', n: 'La brecha «se cuadruplica»', dice: 'De 59% a casi 200%: «cuatro veces mayor».', cuenta: '189 ÷ 59 = 3,2', veredicto: 'Se multiplica por más de tres, no por cuatro.' },
    { id: 'adp', n: 'Caída de concesionarios', dice: 'De 21.200 a 18.460: «una contracción del 15%».', cuenta: '(21.200 − 18.460) ÷ 21.200 = 12,9%', veredicto: 'Cerca del 13%, no del 15%.' },
    { id: 'ger', n: 'Gerentes no preparados', dice: '63% sin habilidades para el modelo y 9% sin las de su rol: «75%».', cuenta: '63 + 9 = 72%  →  100 − 72 = 28% preparados', veredicto: 'Suman 72%, no 75%.' },
    { id: 'des', n: 'Desglose del gerente', dice: 'Se presenta como el desglose del 73,4% comercial.', cuenta: '29,2 + 28,0 + 26,6 + 16,2 = 100,0', veredicto: 'Son pesos relativos que suman 100, no partes de 73,4.' },
    { id: 'coach', n: 'Efecto del coaching', dice: '«Entre el 6% y el 19%» de mejora.', cuenta: '83% → 102% = +19 puntos (≈ +23% relativo)', veredicto: 'Es una diferencia en puntos de cumplimiento, no un porcentaje de mejora.' },
    { id: 'muestra', n: 'El tamaño de la muestra', dice: '«700 vendedores» en un lugar y «6.000» en otro, ambos en 90 empresas.', cuenta: '6.000 ÷ 700 = 8,6 veces más', veredicto: 'Son dos etapas del estudio. Cita siempre cuál.' },
    { id: 'perfiles', n: 'Perfiles en venta compleja', dice: 'Una fuente da Trabajador 7% y Solucionador 10%; otra, al revés.', cuenta: 'Ambas versiones suman 100%', veredicto: 'Las fuentes se contradicen. Esta clase usa 7% y 10%, la versión más repetida.' },
    { id: 'olvido', n: 'El 87% que se olvida', dice: '«El 87% de la capacitación se olvida en 30 días».', cuenta: 'No hay cuenta que revisar: falta la fuente primaria', veredicto: 'Cifra citada por los autores; no logré rastrear el estudio de origen.' },
  ];
  const [i, setI] = useState(0);
  const it = items[i];
  return (
    <Shell isDark={isDark} title="Lo que no cuadra:" highlight="revisando las cifras antes de repetirlas" subtitle="Al integrar todos los números aparecieron discrepancias. Es un buen ejercicio: una cifra redonda se instala sin que nadie haga la cuenta.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[38%] flex flex-col gap-1.5 justify-center">
            {items.map((x, k) => (
              <motion.button key={x.id} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left px-3 py-2 rounded-2xl text-sm font-bold ${k === i ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30' : isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white shadow-md shadow-gray-200/70 text-gray-700'}`}>
                <span className="opacity-70 mr-1.5">{k + 1}.</span>{x.n}
              </motion.button>
            ))}
          </div>
          <div className="lg:w-[62%] min-h-0 flex flex-col lg:flex-row items-center gap-3">
            <div className="w-full lg:w-[34%] flex items-center justify-center">
              <svg viewBox="0 0 160 210" className="w-full max-h-[210px] overflow-visible" aria-hidden="true">
                <SceneDefs id="cua" isDark={isDark} />
                <IsoFloor cx={80} cy={168} s={70} fill={t.floor} />
                <PulseDisc cx={80} cy={170} rx={34} ry={11} dur={2.2} peak={0.3} />
                <Float amp={4} dur={2.6}><Persona id="cua" cx={80} cy={168} s={1.2} body={BRAND} accessory="compass" hair="#2b1a12" /></Float>
              </svg>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={it.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full lg:w-[66%] flex flex-col gap-2.5">
                <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Lo que dice la fuente</p>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{it.dice}</p>
                </div>
                <div className={`p-3.5 rounded-2xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>La cuenta</p>
                  <p className={`text-base font-black ${heading(isDark)}`}>{it.cuenta}</p>
                </div>
                <div className={`p-3.5 rounded-2xl flex items-start gap-2 ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
                  <AlertTriangle size={17} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className={microLabel(isDark)}>Veredicto</p>
                    <p className={`text-sm font-bold ${heading(isDark)}`}>{it.veredicto}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>Ninguna de estas diferencias invalida el modelo. Pero <strong>un error aritmético en el titular</strong> es una buena razón para pedir los datos antes de citarlos.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseChallenger({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'ch-slide-0': return <Portada isDark={isDark} />;
    case 'ch-poder': return <Poder isDark={isDark} />;
    case 'ch-evidencia': return <Evidencia isDark={isDark} />;
    case 'ch-citas': return <Citas isDark={isDark} />;
    case 'ch-diferenciacion': return <Diferenciacion isDark={isDark} />;
    case 'ch-buzzwords': return <Buzzwords isDark={isDark} />;
    case 'ch-adp': return <Adp isDark={isDark} />;
    case 'ch-adopcion': return <Adopcion isDark={isDark} />;
    case 'ch-gerentes': return <Gerentes isDark={isDark} />;
    case 'ch-cuadran': return <Cuadran isDark={isDark} />;
    case 'ch-hitos': return <Hitos isDark={isDark} />;
    case 'ch-fatiga': return <Fatiga isDark={isDark} />;
    case 'ch-brecha': return <Brecha isDark={isDark} />;
    case 'ch-perfiles': return <Perfiles isDark={isDark} />;
    case 'ch-estrellas': return <Estrellas isDark={isDark} />;
    case 'ch-tension': return <Tension isDark={isDark} />;
    case 'ch-pilares': return <Pilares isDark={isDark} />;
    case 'ch-lealtad': return <Lealtad isDark={isDark} />;
    case 'ch-reglas': return <Reglas isDark={isDark} />;
    case 'ch-coreografia': return <Coreografia isDark={isDark} />;
    case 'ch-grainger': return <Grainger isDark={isDark} />;
    case 'ch-safebold': return <SafeBold isDark={isDark} />;
    case 'ch-control': return <Control isDark={isDark} />;
    case 'ch-organizacion': return <Organizacion isDark={isDark} />;
    case 'ch-critico': return <Critico isDark={isDark} />;
    case 'ch-cierre': return <Sintesis isDark={isDark} />;
    case 'ch-test-basico': return <TestBasico isDark={isDark} />;
    case 'ch-test-avanzado': return <TestAvanzado isDark={isDark} />;
    default: return null;
  }
}
