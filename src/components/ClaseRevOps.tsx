import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass } from './slideKit';
import {
  SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, Persona,
  BRAND, PEACH, SLATE, NEUTRAL, sceneTone, ORANGE, PINK, hop,
} from './scene3d';

type SlideProps = { slideId: string; isDark: boolean };

/* ─── Helpers compartidos ─── */
function Stat({ isDark, value, label, sub }: { isDark: boolean; value: string; label: string; sub?: string }) {
  return (
    <div className={`rounded-2xl p-4 flex flex-col gap-1 ${panelClass(isDark)}`}>
      <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] leading-none">{value}</span>
      <span className={`text-[13px] font-bold leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</span>
      {sub && <span className={`text-[10px] leading-tight ${textMuted(isDark)}`}>{sub}</span>}
    </div>
  );
}

function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide"
      style={{ background: `${color}22`, color }}>
      {children}
    </span>
  );
}

function Bullet({ color, text, sub }: { color: string; text: string; sub?: string }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
      <div>
        <p className="text-[13px] font-bold" style={{ color }}>{text}</p>
        {sub && <p className="text-[11px] text-gray-500 leading-snug">{sub}</p>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   L1 — Bienvenida a la Certificación
══════════════════════════════════════════════════════════════ */
function L1Bienvenida({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [tab, setTab] = useState<'que' | 'como' | 'meta'>('que');
  return (
    <Shell isDark={isDark} title="Bienvenida a la" highlight="Certificación RevOps"
      subtitle="Revenue Operations: la disciplina que alinea personas, procesos, sistemas y datos para mejorar la generación de ingresos del negocio.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Escena */}
        <div className="w-[300px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 300 260" width="300" height="260">
            <SceneDefs id="ro1" isDark={isDark} />
            <IsoFloor cx={150} cy={235} s={120} fill={tone.floor} />
            <Float delay={0} amp={5}><Persona id="ro1" cx={95}  cy={215} s={0.82} body={BRAND}       accessory="megaphone" hair="#2d2d2d" /></Float>
            <Float delay={0.8} amp={4}><Persona id="ro1" cx={150} cy={208} s={0.88} body={PEACH}      accessory="gear"      hair="#7c3f20" /></Float>
            <Float delay={1.6} amp={5}><Persona id="ro1" cx={207} cy={215} s={0.82} body={SLATE(isDark)} accessory="compass"  hair="#1a1a1a" /></Float>
            <text x="95"  y="244" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={ORANGE}>Marketing</text>
            <text x="150" y="238" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={PINK}>Operaciones</text>
            <text x="207" y="244" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={tone.muted}>Ventas</text>
            <Traveler id="ro1" path={hop([95,168],[150,162])} dur={2.2} delay={0.2}  r={4} color={ORANGE} />
            <Traveler id="ro1" path={hop([150,162],[207,168])} dur={2.2} delay={1.3} r={4} color={PINK} />
            <PulseDisc cx={150} cy={162} rx={55} ry={20} color={ORANGE} dur={2.8} delay={0.6} peak={0.18} />
          </svg>
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-3 justify-center min-h-0">
          <div className="flex gap-2 flex-wrap">
            {([['que','¿Qué es RevOps?'],['como','¿Cómo convencer?'],['meta','Certificación']] as const).map(([k,l]) => (
              <Pill key={k} isDark={isDark} on={tab===k} onClick={()=>setTab(k)}>{l}</Pill>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {tab === 'que' && (
              <motion.div key="que" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={ORANGE}>Definición central</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    El objetivo primario de un profesional RevOps es <strong>alinear personas, procesos, sistemas y datos</strong> para mejorar la generación de ingresos del negocio. No es solo automatizar, no es recortar costos: es coherencia total entre cada función que toca al cliente.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Stat isDark={isDark} value="4 pilares" label="Personas · Procesos · Sistemas · Datos" sub="Los cuatro elementos que RevOps alinea en una sola dirección" />
                  <Stat isDark={isDark} value="3 equipos" label="Ventas · Marketing · Customer Success" sub="Operando con métricas compartidas e incentivos alineados" />
                </div>
              </motion.div>
            )}
            {tab === 'como' && (
              <motion.div key="como" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={PINK}>Estrategia de adopción</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    Para persuadir a otros departamentos de adoptar nuevas estrategias RevOps, el enfoque recomendado es <strong>usar técnicas poderosas de influencia y guiar la adopción dentro de la empresa</strong>, basándose en experiencias RevOps del mundo real. Mandar sin explicar genera resistencia; documentar sin demostrar no convence.
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${panelClass(isDark)} flex flex-col gap-1.5`}>
                  <Bullet color={ORANGE} text="Técnicas de influencia interna" sub="Mostrar cómo los cambios reducen fricción en el día a día de cada equipo" />
                  <Bullet color={PINK} text="Experiencias del mundo real" sub="Casos de adopción con resultados medibles, no solo marcos teóricos" />
                  <Bullet color="#8b5cf6" text="Iteración con los equipos afectados" sub="Involucrar ventas y marketing antes de implementar, no después" />
                </div>
              </motion.div>
            )}
            {tab === 'meta' && (
              <motion.div key="meta" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color="#10b981">Certificación</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    Al completar todas las lecciones del curso, el aprendiz debe <strong>tomar y aprobar un examen</strong> para obtener el certificado que demuestra su comprensión de los principios de RevOps. El curso incluye un <em>workbook</em> descargable para aplicar los conceptos sin importar el tamaño o industria de la empresa.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Stat isDark={isDark} value="Examen" label="Requisito de certificación" sub="Completar lecciones + aprobar el assessment final" />
                  <Stat isDark={isDark} value="Workbook" label="Herramienta de aplicación" sub="Válido para cualquier tamaño de empresa o industria" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Footer isDark={isDark}>
            RevOps no gestiona solo las metas de ventas: alinea a toda la organización generadora de ingresos.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L2 — Introducción a RevOps
══════════════════════════════════════════════════════════════ */
function L2Introduccion({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [tab, setTab] = useState<'vel' | 'emp' | 'datos'>('vel');
  return (
    <Shell isDark={isDark} title="Introducción a" highlight="Revenue Operations"
      subtitle="Velocidad ≠ Rapidez. La diferencia entre moverse rápido y avanzar hacia el objetivo es el núcleo conceptual de RevOps.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Escena velocidad vs rapidez */}
        <div className="w-[290px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 290 270" width="290" height="270">
            <SceneDefs id="ro2" isDark={isDark} />
            {/* Speed — múltiples flechas en distintas direcciones */}
            <Float amp={3} dur={2.6} delay={0}>
              <Cylinder cx={82} cy={125} rx={34} ry={12} h={28} top={tone.floor} side={tone.floorSide} />
              <text x="82" y="167" textAnchor="middle" fontSize="10" fontWeight="800" fill={tone.text}>Rapidez</text>
              <text x="82" y="179" textAnchor="middle" fontSize="8" fill={tone.muted}>(speed)</text>
            </Float>
            {/* Flechas caóticas */}
            {[[82,115,55,85],[82,115,110,85],[82,115,48,140],[82,115,118,140]].map(([x1,y1,x2,y2],i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth="1.5" strokeDasharray="3 3" opacity={0.5} />
            ))}
            <text x="82" y="200" textAnchor="middle" fontSize="8" fill={tone.muted} fontStyle="italic">Actividad sin rumbo</text>

            {/* Velocity — flecha en una dirección */}
            <Float amp={3} dur={3} delay={0.8}>
              <Cylinder cx={210} cy={125} rx={34} ry={12} h={28} top={PINK} side="#a01435" />
              <text x="210" y="167" textAnchor="middle" fontSize="10" fontWeight="800" fill={tone.text}>Velocidad</text>
              <text x="210" y="179" textAnchor="middle" fontSize="8" fill={tone.muted}>(velocity)</text>
            </Float>
            <line x1="210" y1="115" x2="210" y2="75" stroke={PINK} strokeWidth="2.5" />
            <polygon points="204,78 210,64 216,78" fill={PINK} />
            <text x="210" y="200" textAnchor="middle" fontSize="8" fill={PINK} fontStyle="italic">Progreso hacia el objetivo</text>

            <text x="146" y="120" textAnchor="middle" fontSize="20" fontWeight="900" fill={ORANGE} opacity={0.6}>≠</text>
            <Traveler id="ro2" path={[[82,112],[146,100],[210,112]]} dur={2.4} delay={0.4} r={4} color={ORANGE} />
            <PulseDisc cx={210} cy={112} rx={44} ry={16} color={PINK} dur={2.8} delay={1} peak={0.22} />
            <text x="146" y="238" textAnchor="middle" fontSize="8" fill={tone.muted}>El riesgo: los equipos <tspan fontWeight="700">parecen</tspan> productivos</text>
            <text x="146" y="250" textAnchor="middle" fontSize="8" fill={tone.muted}>pero hacen menos progreso real hacia el objetivo</text>
          </svg>
        </div>
        {/* Contenido con tabs */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            <Pill isDark={isDark} on={tab==='vel'} onClick={()=>setTab('vel')}>Velocidad vs Rapidez</Pill>
            <Pill isDark={isDark} on={tab==='emp'} onClick={()=>setTab('emp')}>Empatía y curiosidad</Pill>
            <Pill isDark={isDark} on={tab==='datos'} onClick={()=>setTab('datos')}>Datos consistentes</Pill>
          </div>
          <AnimatePresence mode="wait">
            {tab === 'vel' && (
              <motion.div key="vel" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={ORANGE}>Concepto central del curso</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    <strong>Rapidez (speed)</strong> mide qué tan rápido ocurren las actividades. <strong>Velocidad (velocity)</strong> mide el progreso real hacia un objetivo con eficiencia. El riesgo de optimizar solo rapidez: los equipos <em>parecen productivos</em> pero hacen menos progreso real hacia las metas de la empresa.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Stat isDark={isDark} value="Speed" label="Volumen de actividad" sub="Llamadas hechas, emails enviados, deals tocados — sin dirección fija" />
                  <Stat isDark={isDark} value="Velocity" label="Progreso al objetivo" sub="Avance medible hacia el número de ingresos del trimestre" />
                </div>
              </motion.div>
            )}
            {tab === 'emp' && (
              <motion.div key="emp" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={PINK}>Mindset para cambios de proceso</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    Al implementar cambios en RevOps, el mindset correcto es <strong>liderar con empatía y curiosidad para entender las realidades cotidianas de los equipos de primera línea</strong>. La empatía permite comprender las necesidades y puntos de dolor de los clientes internos y externos, asegurando que los cambios agreguen valor en lugar de generar resistencia.
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${panelClass(isDark)} flex flex-col gap-1.5`}>
                  <Bullet color={ORANGE} text="Empatía" sub="Comprender el dolor de ventas y marketing antes de proponer cambios de proceso" />
                  <Bullet color={PINK} text="Curiosidad" sub="Investigar el porqué de cada fricción en lugar de asumir la causa" />
                  <Bullet color="#8b5cf6" text="Valor real, no cumplimiento" sub="Los cambios deben agregar valor — no generar resistencia ni burocracia vacía" />
                </div>
              </motion.div>
            )}
            {tab === 'datos' && (
              <motion.div key="datos" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color="#10b981">Consistencia de métricas y procesos</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    Mejorar la consistencia de métricas y procesos entre actividades pre y post-venta permite: <strong>mejor entrenamiento interfuncional, experiencias de cliente más fluidas, y agilidad para lanzar nuevos productos o hacer upselling</strong>. Para problemas de calidad de datos entre múltiples equipos: implementar talleres interfuncionales para alinear estándares y procesos de datos.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Stat isDark={isDark} value="1 fuente" label="Single source of truth" sub="Una sola versión del dato del cliente, compartida por todos los equipos" />
                  <Stat isDark={isDark} value="Workshop" label="Alineación de estándares" sub="Talleres interfuncionales para definir qué dato, dónde y quién lo entra" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Footer isDark={isDark}>
            Consistencia de métricas = mejor entrenamiento + experiencias fluidas + agilidad para upselling.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L3 — RevOps al Flywheel (no al embudo)
══════════════════════════════════════════════════════════════ */
function L3Flywheel({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [fase, setFase] = useState<'atraer'|'involucrar'|'deleitar'>('atraer');
  const fases = {
    atraer: {
      color: ORANGE,
      titulo: 'Atraer',
      desc: 'Contenido útil y publicidad segmentada traen prospectos adecuados. RevOps alinea el ICP entre marketing y ventas para que solo entren al flywheel los perfiles correctos.',
      metrica: 'MQL calificados · CAC por canal · Tasa de conversión visita→lead',
    },
    involucrar: {
      color: PINK,
      titulo: 'Involucrar',
      desc: 'El equipo de ventas comprende el dolor del prospecto y adapta la conversación. "Selling is about buying": el vendedor escucha la situación específica del comprador y personaliza el enfoque.',
      metrica: 'Velocidad del pipeline · Tasa SQL→oportunidad · Ciclo de venta promedio',
    },
    deleitar: {
      color: '#8b5cf6',
      titulo: 'Deleitar',
      desc: 'CS entrega el valor prometido. El deleite se mide con NPS y con el análisis de razones de negocio repetido y reclamos. Los clientes deleitados son el motor del flywheel: generan advocacy y referidos que alimentan la fase de atracción.',
      metrica: 'NPS · Tasa de renovación · Razones de reclamos · Negocio repetido',
    },
  };
  const f = fases[fase];
  return (
    <Shell isDark={isDark} title="RevOps al" highlight="Flywheel"
      subtitle="El flywheel reemplaza el embudo: los clientes deleitados son el motor de crecimiento — no un resultado final.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Flywheel SVG */}
        <div className="w-[280px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 280 290" width="280" height="290">
            <SceneDefs id="ro3" isDark={isDark} />
            {/* Círculos del flywheel */}
            <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '140px 148px' }}>
              {[
                { r: 92, color: `${ORANGE}44`, label: '' },
                { r: 68, color: `${PINK}44`, label: '' },
                { r: 44, color: '#8b5cf644', label: '' },
              ].map((c, i) => (
                <circle key={i} cx={140} cy={148} r={c.r} fill="none" stroke={c.color} strokeWidth={i===0?24:i===1?20:16} strokeDasharray={i===0?"30 12":i===1?"22 10":"14 8"} />
              ))}
            </motion.g>
            {/* Labels estáticos */}
            {[
              { label: 'ATRAER', angle: -105, color: ORANGE, r: 92 },
              { label: 'INVOLUCRAR', angle: 15, color: PINK, r: 68 },
              { label: 'DELEITAR', angle: 135, color: '#8b5cf6', r: 44 },
            ].map(({ label, angle, color, r }) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <text key={label} x={140 + Math.cos(rad) * r} y={148 + Math.sin(rad) * r + 4}
                  textAnchor="middle" fontSize="7.5" fontWeight="900" fill={color} letterSpacing="0.04em">{label}</text>
              );
            })}
            <Orb id="ro3" cx={140} cy={148} r={26} />
            <text x="140" y="144" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#fff">RevOps</text>
            <text x="140" y="156" textAnchor="middle" fontSize="7"  fill="#fff" opacity={0.8}>flywheel</text>
            {/* Punto de fricción */}
            <PulseDisc cx={80} cy={200} rx={18} ry={7} color={ORANGE} dur={2.4} delay={0.5} peak={0.3} />
            <text x="80" y="220" textAnchor="middle" fontSize="7" fill={ORANGE} fontWeight="700">⚠ Fricción</text>
            <text x="80" y="230" textAnchor="middle" fontSize="6.5" fill={tone.muted}>portal confuso</text>
            <text x="80" y="240" textAnchor="middle" fontSize="6.5" fill={tone.muted}>→ quejas → boca negativa</text>
          </svg>
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2">
            {(['atraer','involucrar','deleitar'] as const).map(k => (
              <button key={k} onClick={() => setFase(k)}
                className="px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide transition-all"
                style={{ background: fase===k ? fases[k].color : 'transparent', color: fase===k ? '#fff' : fases[k].color, border: `2px solid ${fases[k].color}` }}>
                {fases[k].titulo}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={fase} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
              <Chip color={f.color}>{f.titulo}</Chip>
              <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>{f.desc}</p>
              <div className={`mt-3 px-3 py-2 rounded-xl ${isDark?'bg-white/5':'bg-black/5'}`}>
                <p className={`text-[10px] font-black uppercase tracking-wide mb-0.5 ${isDark?'text-gray-400':'text-gray-500'}`}>Métricas clave</p>
                <p className={`text-[11px] ${textMuted(isDark)}`}>{f.metrica}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={`rounded-2xl p-4 ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-2`}>Riesgo de silos — incluso con equipos excelentes</p>
            <p className={`text-[12px] leading-relaxed ${textMuted(isDark)}`}>
              Marketing, ventas y CS pueden optimizar sus propios procesos, pero <strong>nadie garantiza una experiencia de cliente fluida en todos los puntos de contacto</strong>. El flywheel se frena cuando la fricción (un portal confuso, un handoff roto, una promesa no cumplida) genera quejas y elimina el boca a boca positivo.
            </p>
          </div>
          <Footer isDark={isDark}>
            El crecimiento óptimo del flywheel: advocacy continuo de clientes y referidos que crean ciclos de crecimiento auto-reforzantes.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L4 — Responsabilidad con SLA
══════════════════════════════════════════════════════════════ */
function L4SLA({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [tab, setTab] = useState<'que'|'mkt'|'sales'|'judicial'>('que');
  return (
    <Shell isDark={isDark} title="Responsabilidad con" highlight="SLA"
      subtitle="Los SLA convierten los compromisos informales entre ventas y marketing en acuerdos medibles y exigibles.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Escena */}
        <div className="w-[280px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 280 280" width="280" height="280">
            <SceneDefs id="ro4" isDark={isDark} />
            <IsoFloor cx={140} cy={255} s={105} fill={tone.floor} />
            {/* Torre marketing */}
            <Float delay={0} amp={4}>
              <IsoBox cx={88}  cy={185} s={38} h={55} f={{ top: ORANGE, left: '#c45c00', right: '#a04800' }} />
              <Persona id="ro4" cx={88} cy={178} s={0.72} body={BRAND} accessory="megaphone" hair="#2d2d2d" />
              <text x="88" y="256" textAnchor="middle" fontSize="8" fontWeight="700" fill={ORANGE}>Marketing</text>
            </Float>
            {/* Torre ventas */}
            <Float delay={1.2} amp={4}>
              <IsoBox cx={192} cy={185} s={38} h={55} f={{ top: PINK, left: '#a01435', right: '#7a0f28' }} />
              <Persona id="ro4" cx={192} cy={178} s={0.72} body={PEACH} accessory="tie" hair="#3b2a20" />
              <text x="192" y="256" textAnchor="middle" fontSize="8" fontWeight="700" fill={PINK}>Ventas</text>
            </Float>
            {/* Puente SLA */}
            <rect x={110} y={175} width={60} height={14} rx={5} fill={isDark?'#3a3a3a':'#f3f4f6'} />
            <text x="140" y="185.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={isDark?'#fff':'#1f2937'}>SLA</text>
            <Traveler id="ro4" path={hop([88,172],[192,172])} dur={2.4} delay={0.5} r={4} color={ORANGE} />
            <Traveler id="ro4" path={hop([192,172],[88,172])} dur={2.4} delay={1.6} r={4} color={PINK} />
            {/* Judicial branch */}
            <IsoBox cx={140} cy={225} s={22} h={14} f={NEUTRAL(isDark)} />
            <text x="140" y="242" textAnchor="middle" fontSize="7.5" fontWeight="800" fill={tone.muted}>Judicial branch</text>
          </svg>
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            <Pill isDark={isDark} on={tab==='que'}     onClick={()=>setTab('que')}>¿Qué es un SLA?</Pill>
            <Pill isDark={isDark} on={tab==='mkt'}     onClick={()=>setTab('mkt')}>SLA de Marketing</Pill>
            <Pill isDark={isDark} on={tab==='sales'}   onClick={()=>setTab('sales')}>SLA de Ventas</Pill>
            <Pill isDark={isDark} on={tab==='judicial'} onClick={()=>setTab('judicial')}>Judicial Branch</Pill>
          </div>
          <AnimatePresence mode="wait">
            {tab === 'que' && (
              <motion.div key="q" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={ORANGE}>Service Level Agreement</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    Un SLA de ventas y marketing es el acuerdo formal que define <strong>qué debe entregar marketing a ventas y qué debe hacer ventas con esos leads</strong>. Sin SLA, los equipos operan con expectativas distintas y se culpan mutuamente por los leads perdidos.
                  </p>
                </div>
                <Stat isDark={isDark} value="Deals perdidos" label="Acción correcta: analizar feedback de clientes ganados Y perdidos" sub="No reducir comunicación ni cambiar proceso sin datos de ambos lados" />
              </motion.div>
            )}
            {tab === 'mkt' && (
              <motion.div key="m" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={ORANGE}>SLA de Marketing</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    El SLA exige a marketing <strong>entregar un determinado número de leads calificados a ventas cada mes</strong>. No se trata de generar contenido, atraer visitantes o sombrear citas de ventas — se trata de un volumen y calidad de leads acordado y medible.
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${panelClass(isDark)} flex flex-col gap-1.5`}>
                  <Bullet color={ORANGE} text="Número de MQLs mensuales" sub="Acordado entre ambos equipos, no impuesto unilateralmente" />
                  <Bullet color={PINK} text="Criterios de calificación compartidos" sub="Marketing y ventas definen juntos qué es un lead calificado" />
                </div>
              </motion.div>
            )}
            {tab === 'sales' && (
              <motion.div key="s" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color={PINK}>SLA de Ventas</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    El SLA exige a ventas <strong>contactar cada lead de marketing dentro de un plazo determinado</strong>. No es solo cerrar un porcentaje de leads ni alcanzar cuota: es el tiempo de respuesta — el gap entre que marketing entrega y ventas actúa es donde se pierden más oportunidades.
                  </p>
                </div>
                <Stat isDark={isDark} value="+23%" label="Conversión al reducir respuesta de 24 h a <4 h" sub="InsideSales.com — impacto del tiempo de contacto en tasa de conversión MQL→SQL" />
              </motion.div>
            )}
            {tab === 'judicial' && (
              <motion.div key="j" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="flex flex-col gap-3">
                <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                  <Chip color="#8b5cf6">Judicial Branch</Chip>
                  <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                    El "judicial branch" en RevOps es <strong>un equipo interfuncional de personas de marketing y ventas que define qué es un lead calificado</strong>. No es un pequeño grupo de líderes que rechaza leads, ni solo una matriz de criterios: es el proceso colaborativo de definición y revisión del acuerdo de calificación.
                  </p>
                </div>
                <div className={`rounded-xl p-3 ${panelClass(isDark)} flex flex-col gap-1.5`}>
                  <Bullet color="#8b5cf6" text="Define el lead calificado" sub="ICP + señales de intención + criterios de comportamiento acordados" />
                  <Bullet color={ORANGE} text="Revisa los SLA" sub="Audita periódicamente si los acuerdos siguen siendo relevantes con el mercado actual" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Footer isDark={isDark}>
            SLA de marketing = entregar leads. SLA de ventas = contactarlos a tiempo. Ambos, medibles.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L5 — Mapear un Proceso de Ventas
══════════════════════════════════════════════════════════════ */
function L5Proceso({ isDark }: { isDark: boolean }) {
  const [step, setStep] = useState(0);
  const tone = sceneTone(isDark);
  const etapas = [
    { label: 'Prospección', icon: '🎯', exit: 'ICP confirmado + dolor identificado', buyer: 'Conciencia del problema', color: '#f97316' },
    { label: 'Calificación', icon: '🔍', exit: 'Presupuesto + autoridad + necesidad + tiempo (BANT) o MEDDPICC ≥ 4', buyer: 'Búsqueda activa de solución', color: ORANGE },
    { label: 'Exploración', icon: '💬', exit: 'Necesidades explícitas documentadas + champion identificado', buyer: 'Evalúa opciones', color: PINK },
    { label: 'Propuesta', icon: '📋', exit: 'Propuesta validada por champion + Economic Buyer involucrado', buyer: 'Compara y decide', color: '#be185d' },
    { label: 'Cierre', icon: '✅', exit: 'PO recibido, firma obtenida o verbal firme de compra', buyer: 'Decide comprar', color: '#9d174d' },
    { label: 'Post-venta', icon: '🚀', exit: 'Primer hito de valor entregado (TTV) + NPS inicial', buyer: 'Implementa y evalúa', color: '#6d28d9' },
  ];
  const e = etapas[step];
  return (
    <Shell isDark={isDark} title="Mapear un" highlight="Proceso de Ventas"
      subtitle="Un proceso definido habilita métricas, repetibilidad, escalabilidad y responsabilidad — no rigidez robótica.">
      <div className="flex-1 flex flex-col gap-4 justify-center">
        {/* Proceso horizontal */}
        <div className="flex gap-1.5 items-center overflow-x-auto pb-1">
          {etapas.map((et, i) => (
            <React.Fragment key={et.label}>
              <motion.button onClick={() => setStep(i)}
                animate={{ scale: step===i ? 1.05 : 1, y: step===i ? -4 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                className="shrink-0 rounded-xl p-3 min-w-[110px] text-left transition-colors"
                style={{ background: step===i ? et.color : (isDark?'#2a2a2a':'#f9fafb'), border: `2px solid ${step===i?et.color:'transparent'}` }}>
                <div className="text-lg mb-1">{et.icon}</div>
                <div className="text-[11px] font-black" style={{ color: step===i?'#fff':et.color }}>{et.label}</div>
              </motion.button>
              {i < etapas.length - 1 && (
                <svg width="18" height="14" viewBox="0 0 18 14" className="shrink-0 opacity-50">
                  <path d="M1 7 L14 7 M10 3 L15 7 L10 11" stroke={ORANGE} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Detalle de etapa */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
              <p className="text-[11px] font-black uppercase tracking-wide mb-1" style={{color: e.color}}>Exit criteria — {e.label}</p>
              <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>{e.exit}</p>
            </div>
            <div className={`rounded-2xl p-4 ${panelClass(isDark)}`}>
              <p className={`${microLabel(isDark)} mb-1`}>Perspectiva del comprador</p>
              <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>{e.buyer}</p>
              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                <p className={`text-[10px] italic ${textMuted(isDark)}`}>
                  "Selling is about buying" — el vendedor escucha la situación del comprador y personaliza el enfoque.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Conceptos adicionales del curso */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
            <Chip color={ORANGE}>Playbook moderno</Chip>
            <p className={`mt-1.5 text-[11px] leading-snug ${textMuted(isDark)}`}>Basado en web, interactivo y actualizado regularmente para mantenerse vigente (evergreen).</p>
          </div>
          <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
            <Chip color={PINK}>Thrashing</Chip>
            <p className={`mt-1.5 text-[11px] leading-snug ${textMuted(isDark)}`}>El estado de "thrashing" = cambiar rápidamente entre soluciones sin un proceso de mejora controlado.</p>
          </div>
          <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
            <Chip color="#8b5cf6">Matriz P/P/F/C</Chip>
            <p className={`mt-1.5 text-[11px] leading-snug ${textMuted(isDark)}`}>Pain / Persona / Feature / Content — alinea el contenido de ventas con las necesidades del comprador.</p>
          </div>
        </div>
        <Footer isDark={isDark}>
          Estructura suficiente para consistencia y crecimiento — con espacio para las fortalezas individuales del vendedor.
        </Footer>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L6 — Gestión de Sistemas
══════════════════════════════════════════════════════════════ */
function L6Sistemas({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [active, setActive] = useState(0);
  const sistemas = [
    { nombre: 'CRM', rol: 'Sistema de registro (source of truth)', desc: 'El CRM es la fuente única de verdad sobre contactos, oportunidades y actividad comercial. Todo el stack se sincroniza con él, no al revés. Sin CRM limpio, las métricas de pipeline son ruido.', prop: 'RevOps Systems Admin', color: ORANGE },
    { nombre: 'MAP', rol: 'Marketing Automation Platform', desc: 'Gestión de leads, nurturing por comportamiento y lead scoring. Entrega MQLs al CRM con contexto: qué contenido consumió, qué acciones tomó, cuál es su fit con el ICP.', prop: 'Marketing Ops', color: PINK },
    { nombre: 'BI / Analytics', rol: 'Business Intelligence', desc: 'Dashboards de ingresos, forecast del pipeline, análisis de cohortes y atribución. Convierte datos del CRM y MAP en decisiones de inversión. Responde: ¿dónde se cae el funnel?, ¿qué canal genera mejor LTV?', prop: 'Revenue Analytics', color: '#8b5cf6' },
    { nombre: 'CS Platform', rol: 'Customer Success', desc: 'Onboarding, health score, gestión de renovaciones y escalations. Cierra el ciclo del cliente con RevOps: el dato de adopción retroalimenta a ventas para el upsell y a marketing para los casos de éxito.', prop: 'CS Ops', color: '#10b981' },
    { nombre: 'Sales Engagement', rol: 'Secuencias y cadencias', desc: 'Automatiza el seguimiento de BDRs (Business Development Representatives) y AEs (Account Executives) con cadencias multicanal. Registra el engagement en el CRM para que el dato no quede en el inbox de cada vendedor.', prop: 'Sales Ops', color: '#f97316' },
  ];
  const s = sistemas[active];
  return (
    <Shell isDark={isDark} title="Gestión de" highlight="Sistemas para RevOps"
      subtitle="El stack tecnológico de RevOps conecta los datos de cada equipo en un flujo continuo hacia los ingresos.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Stack isométrico */}
        <div className="w-[270px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 270 290" width="270" height="290">
            <SceneDefs id="ro6" isDark={isDark} />
            <IsoFloor cx={135} cy={268} s={100} fill={tone.floor} />
            {sistemas.map((sm, i) => (
              <motion.g key={sm.nombre}
                animate={{ y: active===i ? -10 : 0, opacity: active===i ? 1 : 0.45 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
                <IsoBox cx={135} cy={228 - i * 40} s={50} h={28}
                  f={active===i ? { top: sm.color, left: `${sm.color}bb`, right: `${sm.color}77` } : NEUTRAL(isDark)} />
                <text x="135" y={228 - i * 40 + 8} textAnchor="middle" fontSize="9" fontWeight="800"
                  fill={active===i ? '#fff' : tone.muted}>{sm.nombre}</text>
              </motion.g>
            ))}
            {active >= 0 && (
              <PulseDisc cx={135} cy={228 - active * 40 - 18} rx={56} ry={20} color={s.color} dur={2} peak={0.2} />
            )}
          </svg>
        </div>
        {/* Detalle */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-1.5 flex-wrap">
            {sistemas.map((sm, i) => (
              <button key={sm.nombre} onClick={() => setActive(i)}
                className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide transition-all"
                style={{ background: active===i ? sm.color : 'transparent', color: active===i ? '#fff' : sm.color, border: `1.5px solid ${sm.color}` }}>
                {sm.nombre}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
              <Chip color={s.color}>{s.nombre} · {s.rol}</Chip>
              <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>{s.desc}</p>
              <div className={`mt-3 px-3 py-2 rounded-xl ${isDark?'bg-white/5':'bg-black/5'}`}>
                <p className={`text-[10px] font-black uppercase tracking-wide mb-0.5 ${isDark?'text-gray-400':'text-gray-500'}`}>Propietario típico</p>
                <p className={`text-[12px] font-bold`} style={{color: s.color}}>{s.prop}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Principio de gobernanza</p>
            <p className={`text-[12px] leading-relaxed ${textMuted(isDark)}`}>
              Sin propietario definido por sistema, los datos se degradan y la vista consolidada del cliente se fragmenta. Cada sistema necesita un responsable de calidad de datos, integraciones y mantenimiento en RevOps.
            </p>
          </div>
          <Footer isDark={isDark}>
            El CRM es el sistema de registro. Los demás se sincronizan con él — nunca al revés.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L7 — Estructurando el Equipo de RevOps
══════════════════════════════════════════════════════════════ */
function L7Estructura({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [modelo, setModelo] = useState<'centralizado'|'embebido'|'hibrido'>('centralizado');
  const modelos = {
    centralizado: {
      color: ORANGE,
      desc: 'Un equipo RevOps único sirve a todas las funciones (ventas, marketing, CS). Mayor coherencia de datos y procesos. Ideal para empresas >100 personas o con stack tecnológico complejo.',
      ventaja: 'Consistencia de datos · Visión de ingresos unificada · Menos duplicación de trabajo',
      riesgo: 'Puede crear cuello de botella si el equipo es pequeño o está muy demandado',
    },
    embebido: {
      color: PINK,
      desc: 'Especialistas de ops viven dentro de cada equipo (Marketing Ops en marketing, Sales Ops en ventas). Mayor velocidad de respuesta. Riesgo de silos de datos.',
      ventaja: 'Cercanía al equipo · Respuesta rápida · Conocimiento profundo del negocio',
      riesgo: 'Datos inconsistentes entre equipos · Dificulta la vista consolidada del cliente',
    },
    hibrido: {
      color: '#8b5cf6',
      desc: 'Modelo mixto: un líder RevOps central con especialistas parcialmente embebidos. Equilibra la coherencia de datos con la agilidad de respuesta a cada equipo.',
      ventaja: 'Equilibrio entre coherencia y velocidad · Escala con el crecimiento de la empresa',
      riesgo: 'Requiere comunicación activa entre el centro y los nodos para evitar divergencia',
    },
  };
  const m = modelos[modelo];
  const funciones = [
    { f: 'Analítica de ingresos', d: 'Dashboards, KPIs, forecast, cohortes de ingresos', c: ORANGE },
    { f: 'Sistemas y datos', d: 'CRM, integraciones, calidad de datos, stack governance', c: PINK },
    { f: 'Habilitación (Enablement)', d: 'Playbooks, onboarding de reps, entrenamiento, contenido de ventas', c: '#8b5cf6' },
    { f: 'Procesos', d: 'Mapeo, documentación y mejora continua de flujos comerciales', c: '#10b981' },
  ];
  return (
    <Shell isDark={isDark} title="Estructurando tu" highlight="Equipo de RevOps"
      subtitle="RevOps puede arrancar con una sola persona. Lo crítico es cubrir las cuatro funciones — aunque una persona lleve dos o tres.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Escena */}
        <div className="w-[260px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 260 270" width="260" height="270">
            <SceneDefs id="ro7" isDark={isDark} />
            <IsoFloor cx={130} cy={248} s={110} fill={tone.floor} />
            <Float delay={0}   amp={4}><Persona id="ro7" cx={80}  cy={220} s={0.78} body={BRAND}       accessory="gear"     hair="#2d2d2d"/></Float>
            <Float delay={0.9} amp={4}><Persona id="ro7" cx={130} cy={215} s={0.84} body={PEACH}       accessory="compass"  hair="#6b3f1d"/></Float>
            <Float delay={1.8} amp={4}><Persona id="ro7" cx={182} cy={220} s={0.78} body={SLATE(isDark)} accessory="star"   hair="#1a1a1a"/></Float>
            <text x="80"  y="248" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={ORANGE}>Sistemas</text>
            <text x="130" y="244" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={PINK}>Estrategia</text>
            <text x="182" y="248" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={tone.muted}>Analítica</text>
            <Traveler id="ro7" path={hop([80,178],[130,172])}  dur={2.4} delay={0.3} r={3.5} color={ORANGE} />
            <Traveler id="ro7" path={hop([130,172],[182,178])} dur={2.4} delay={1.5} r={3.5} color={PINK}   />
          </svg>
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="grid grid-cols-2 gap-2">
            {funciones.map(fn => (
              <div key={fn.f} className={`rounded-xl p-3 ${panelClass(isDark)}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{background: fn.c}} />
                  <span className="text-[10.5px] font-black" style={{color: fn.c}}>{fn.f}</span>
                </div>
                <p className={`text-[10px] leading-snug ${textMuted(isDark)}`}>{fn.d}</p>
              </div>
            ))}
          </div>
          <div>
            <p className={`${microLabel(isDark)} mb-2`}>Modelo de estructura del equipo</p>
            <div className="flex gap-2 mb-2">
              {(['centralizado','embebido','hibrido'] as const).map(k => (
                <button key={k} onClick={() => setModelo(k)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide transition-all"
                  style={{background: modelo===k ? modelos[k].color:'transparent', color: modelo===k?'#fff':modelos[k].color, border:`1.5px solid ${modelos[k].color}`}}>
                  {k}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={modelo} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}
                className={`rounded-xl p-3 ${featuredClass(isDark)}`}>
                <p className={`text-[12px] leading-relaxed ${textMuted(isDark)}`}>{m.desc}</p>
                <p className="text-[10px] mt-1.5 font-semibold" style={{color:m.color}}>✓ {m.ventaja}</p>
                <p className={`text-[10px] mt-0.5 ${textMuted(isDark)}`}>⚠ {m.riesgo}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <Footer isDark={isDark}>
            Un equipo RevOps maduro integra analítica, sistemas, habilitación y procesos bajo un solo liderazgo de ingresos.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L8 — Contratación de miembros del equipo
══════════════════════════════════════════════════════════════ */
function L8Contratacion({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [perfil, setPerfil] = useState(0);
  const perfiles = [
    {
      rol: 'RevOps Manager / Head of RevOps',
      cuerpo: BRAND, acc: 'tie' as const, color: ORANGE,
      habilidades: ['Visión sistémica de ventas + marketing + CS', 'Comunicación con C-suite y stakeholders', 'Gestión de proyectos multifuncionales', 'Experiencia en CRM y stack tecnológico'],
      perfil: 'Empático con todos los equipos, orientado a datos y con habilidad para influir sin autoridad directa. Habla el idioma de ventas y el de operaciones.',
    },
    {
      rol: 'RevOps / Revenue Analyst',
      cuerpo: PEACH, acc: 'star' as const, color: PINK,
      habilidades: ['SQL y herramientas BI (Looker, Tableau, Power BI)', 'Análisis de pipeline y forecast', 'Modelado de cohortes y atribución', 'Automatización de reportes'],
      perfil: 'Curioso con los datos, capaz de convertir números de pipeline en narrativas de negocio accionables para el liderazgo comercial.',
    },
    {
      rol: 'CRM / Systems Administrator',
      cuerpo: SLATE(isDark), acc: 'gear' as const, color: '#8b5cf6',
      habilidades: ['Administración de CRM (configuración, permisos, flujos)', 'Gestión de integraciones API', 'Gobierno y calidad de datos', 'Documentación de procesos técnicos'],
      perfil: 'Metódico, con alta tolerancia al detalle. Entiende que un campo de CRM sin definición estándar contamina todo el forecast de la empresa.',
    },
  ];
  const p = perfiles[perfil];
  return (
    <Shell isDark={isDark} title="Contratación de" highlight="Miembros del Equipo"
      subtitle="Empatía + curiosidad + orientación a datos: el ADN de cualquier rol en un equipo RevOps de alto desempeño.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Personas */}
        <div className="w-[280px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 280 280" width="280" height="280">
            <SceneDefs id="ro8" isDark={isDark} />
            <IsoFloor cx={140} cy={252} s={115} fill={tone.floor} />
            {perfiles.map((pr, i) => (
              <motion.g key={pr.rol} animate={{ y: perfil===i ? -8 : 0, opacity: perfil===i ? 1 : 0.4 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                onClick={() => setPerfil(i)} style={{ cursor: 'pointer' }}>
                <Float delay={i * 0.7} amp={4} dur={3 + i * 0.5}>
                  <Persona id="ro8" cx={75 + i * 65} cy={222} s={0.82} body={pr.cuerpo} accessory={pr.acc} hair="#2d2d2d" />
                </Float>
              </motion.g>
            ))}
            {perfiles.map((pr, i) => (
              <text key={`l${i}`} x={75 + i * 65} y={250} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={pr.color}>
                {i===0?'Manager':i===1?'Analyst':'Sysadmin'}
              </text>
            ))}
          </svg>
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2">
            {perfiles.map((pr, i) => (
              <button key={i} onClick={() => setPerfil(i)}
                className="px-2.5 py-1.5 rounded-full text-[10px] font-black tracking-wide transition-all"
                style={{ background: perfil===i ? pr.color:'transparent', color: perfil===i?'#fff':pr.color, border:`1.5px solid ${pr.color}` }}>
                {i===0?'Manager':i===1?'Analyst':'Sysadmin'}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={perfil} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className="flex flex-col gap-2">
              <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                <Chip color={p.color}>{p.rol}</Chip>
                <p className={`mt-2 text-[12px] leading-relaxed italic ${textMuted(isDark)}`}>{p.perfil}</p>
              </div>
              <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
                <p className={`${microLabel(isDark)} mb-2`}>Habilidades clave</p>
                <div className="flex flex-col gap-1">
                  {p.habilidades.map(h => <Bullet key={h} color={p.color} text={h} />)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Atributo universal RevOps</p>
            <p className={`text-[12px] leading-relaxed ${textMuted(isDark)}`}>
              Empatía para comprender el dolor de los equipos de primera línea · Curiosidad para no asumir la causa antes de investigar · Orientación a datos para tomar decisiones con evidencia, no con la voz más alta de la sala.
            </p>
          </div>
          <Footer isDark={isDark}>
            El mejor perfil RevOps no viene solo de ventas ni de TI: habla ambos idiomas con fluidez.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   L9 — Evaluando e Iterando la Estrategia
══════════════════════════════════════════════════════════════ */
function L9Evaluacion({ isDark }: { isDark: boolean }) {
  const [fase, setFase] = useState(0);
  const tone = sceneTone(isDark);
  const ciclo = [
    {
      label: 'Medir', color: ORANGE, icon: '📊',
      desc: 'Define la métrica norte (North Star) del equipo de ingresos. Recolecta datos limpios durante al menos un ciclo completo (trimestre). Sin datos confiables, cualquier análisis es anécdota.',
      criterio: 'North Star definida · Datos de al menos 1 ciclo completo · Fuente única de verdad activa',
    },
    {
      label: 'Analizar', color: '#f97316', icon: '🔍',
      desc: 'Identifica dónde se cae la conversión, qué SLA se incumple y qué canal genera el mejor LTV. Compara con benchmarks de industria. El análisis de deals perdidos Y ganados revela el patrón real.',
      criterio: 'Análisis de lost/won deals · Cuellos de botella identificados · SLA auditados',
    },
    {
      label: 'Hipótesis', color: PINK, icon: '💡',
      desc: 'Formula cambios específicos y medibles: "Si reducimos el tiempo de respuesta a leads de 24 h a <4 h, la conversión MQL→SQL subirá X%." Una hipótesis sin número no es hipótesis — es deseo.',
      criterio: 'Hipótesis con variable clara + métrica de éxito + plazo definido',
    },
    {
      label: 'Cambiar', color: '#8b5cf6', icon: '⚙️',
      desc: 'Implementa en un equipo piloto. Documenta el cambio de proceso en el playbook. Comunica el nuevo SLA. Evita el "thrashing": no cambies antes de que el experimento anterior tenga datos suficientes.',
      criterio: 'Piloto acotado · Playbook actualizado · Nuevo SLA comunicado · Fecha de revisión fijada',
    },
  ];
  const cf = ciclo[fase];
  return (
    <Shell isDark={isDark} title="Evaluando e Iterando" highlight="tu Estrategia RevOps"
      subtitle="RevOps no es un proyecto de un trimestre: es un ciclo continuo de medición, análisis, hipótesis y cambio controlado.">
      <div className="flex-1 flex gap-5 min-h-0">
        {/* Ciclo SVG */}
        <div className="w-[270px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 270 280" width="270" height="280">
            <SceneDefs id="ro9" isDark={isDark} />
            {ciclo.map((c, i) => {
              const angle = (i / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 135 + Math.cos(angle) * 88;
              const cy = 148 + Math.sin(angle) * 88;
              return (
                <motion.g key={c.label}
                  animate={{ scale: fase===i ? 1.15 : 1, opacity: fase===i ? 1 : 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                  style={{ transformOrigin: `${cx}px ${cy}px`, cursor: 'pointer' }}
                  onClick={() => setFase(i)}>
                  <circle cx={cx} cy={cy} r={30} fill={c.color} opacity={fase===i ? 0.95 : 0.55} />
                  <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fill="#fff">{c.icon}</text>
                  <text x={cx} y={cy + 11} textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#fff">{c.label}</text>
                </motion.g>
              );
            })}
            {/* Flechas circulares */}
            {ciclo.map((_, i) => {
              const a1 = (i / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              const a2 = ((i + 1) / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              const x1 = 135 + Math.cos(a1) * 88; const y1 = 148 + Math.sin(a1) * 88;
              const x2 = 135 + Math.cos(a2) * 88; const y2 = 148 + Math.sin(a2) * 88;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone.muted} strokeWidth="1.5" strokeDasharray="4 5" opacity={0.35} />;
            })}
            <Orb id="ro9" cx={135} cy={148} r={28} />
            <text x="135" y="144" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">RevOps</text>
            <text x="135" y="156" textAnchor="middle" fontSize="7" fill="#fff" opacity={0.8}>ciclo continuo</text>
            <Traveler id="ro9"
              path={ciclo.map((_, i) => {
                const angle = (i / ciclo.length) * Math.PI * 2 - Math.PI / 2;
                return [135 + Math.cos(angle) * 88, 148 + Math.sin(angle) * 88] as [number, number];
              })}
              dur={5} delay={0} r={5} color={ORANGE} />
          </svg>
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            {ciclo.map((c, i) => (
              <button key={c.label} onClick={() => setFase(i)}
                className="px-2.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all"
                style={{background: fase===i ? c.color:'transparent', color: fase===i?'#fff':c.color, border:`1.5px solid ${c.color}`}}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={fase} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className="flex flex-col gap-2">
              <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
                <Chip color={cf.color}>{cf.label}</Chip>
                <p className={`mt-2 text-[13px] leading-relaxed ${textMuted(isDark)}`}>{cf.desc}</p>
              </div>
              <div className={`rounded-xl p-3 ${panelClass(isDark)}`}>
                <p className={`${microLabel(isDark)} mb-1`}>Criterios de completitud</p>
                <p className={`text-[11px] leading-relaxed ${textMuted(isDark)}`}>{cf.criterio}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-2 gap-2">
            <Stat isDark={isDark} value="90 días" label="Ciclo de evaluación recomendado" sub="Suficiente para detectar tendencias, corto para corregir a tiempo" />
            <Stat isDark={isDark} value="Won + Lost" label="Fuentes de análisis" sub="Analizar deals ganados Y perdidos — los ganados revelan qué replicar" />
          </div>
          <Footer isDark={isDark}>
            "Thrashing" = cambiar rápido entre soluciones sin proceso controlado. El antídoto es el ciclo de medición.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════
   Router principal
══════════════════════════════════════════════════════════════ */
const SLIDE_MAP: Record<string, (p: { isDark: boolean }) => React.ReactElement> = {
  'ro-1-bienvenida':   L1Bienvenida,
  'ro-2-introduccion': L2Introduccion,
  'ro-3-embudo':       L3Flywheel,
  'ro-4-sla':          L4SLA,
  'ro-5-proceso':      L5Proceso,
  'ro-6-sistemas':     L6Sistemas,
  'ro-7-estructura':   L7Estructura,
  'ro-8-contratacion': L8Contratacion,
  'ro-9-evaluacion':   L9Evaluacion,
};

export default function ClaseRevOps({ slideId, isDark }: SlideProps) {
  const Component = SLIDE_MAP[slideId];
  if (!Component) {
    return (
      <Shell isDark={isDark} title="RevOps" highlight="Revenue Operations"
        subtitle="Selecciona una lección en el índice lateral para comenzar.">
        <div className="flex-1 flex items-center justify-center">
          <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contenido en construcción.</p>
        </div>
      </Shell>
    );
  }
  return <Component isDark={isDark} />;
}
