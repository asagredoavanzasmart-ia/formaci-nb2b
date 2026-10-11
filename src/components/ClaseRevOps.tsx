import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass } from './slideKit';
import {
  SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, Persona,
  BRAND, PEACH, SLATE, NEUTRAL, sceneTone, ORANGE, PINK, hop,
} from './scene3d';

type SlideProps = { slideId: string; isDark: boolean };

/* ─── Helpers ─── */
function StatCard({ isDark, value, label, sub }: { isDark: boolean; value: string; label: string; sub?: string }) {
  return (
    <div className={`rounded-2xl p-4 flex flex-col gap-1 ${panelClass(isDark)}`}>
      <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{value}</span>
      <span className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</span>
      {sub && <span className={`text-[11px] ${textMuted(isDark)}`}>{sub}</span>}
    </div>
  );
}

function Tag({ isDark, color, children }: { isDark: boolean; color?: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide"
      style={{ backgroundColor: color ? `${color}22` : undefined, color: color || (isDark ? '#9ca3af' : '#6b7280') }}>
      {children}
    </span>
  );
}

/* ─── Lección 1: Bienvenida ─── */
function L1Bienvenida({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Bienvenida a la" highlight="Certificación RevOps"
      subtitle="Revenue Operations: la disciplina que alinea ventas, marketing y operaciones en torno al crecimiento.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Escena */}
        <div className="w-[340px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 340 280" width="340" height="280">
            <SceneDefs id="ro1" isDark={isDark} />
            <IsoFloor cx={170} cy={230} s={130} fill={tone.floor} />
            <Float delay={0}><Persona id="ro1" cx={110} cy={210} s={0.85} body={BRAND} accessory="megaphone" hair="#2d2d2d" /></Float>
            <Float delay={0.9}><Persona id="ro1" cx={170} cy={205} s={0.9} body={PEACH} accessory="gear" hair="#7c3f20" /></Float>
            <Float delay={1.7}><Persona id="ro1" cx={232} cy={210} s={0.85} body={SLATE(isDark)} accessory="star" hair="#1a1a1a" /></Float>
            <text x="108" y="240" textAnchor="middle" fontSize="9" fontWeight="700" fill={tone.muted}>Ventas</text>
            <text x="170" y="236" textAnchor="middle" fontSize="9" fontWeight="700" fill={tone.muted}>Operaciones</text>
            <text x="233" y="240" textAnchor="middle" fontSize="9" fontWeight="700" fill={tone.muted}>Marketing</text>
            <Traveler id="ro1" path={hop([110,165],[170,160])} dur={2} delay={0.2} />
            <Traveler id="ro1" path={hop([170,160],[233,165])} dur={2} delay={1.1} />
          </svg>
        </div>
        {/* Stats + descripción */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className="grid grid-cols-2 gap-3">
            <StatCard isDark={isDark} value="75%" label="Empresas B2B con crecimiento acelerado" sub="Forrester, 2023 — al adoptar RevOps" />
            <StatCard isDark={isDark} value="3 equipos" label="Ventas · Marketing · Operaciones" sub="Alineados en torno a un único objetivo de ingresos" />
          </div>
          <div className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
            <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>
              RevOps no es un rol nuevo dentro de ventas ni una herramienta. Es un <strong>sistema operativo de ingresos</strong>: procesos consistentes, datos confiables e incentivos alineados entre las tres funciones que tocan al cliente.
            </p>
          </div>
          <Footer isDark={isDark}>
            ¿Cuántos silos entre ventas y marketing existen hoy en tu organización?
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 2: Introducción a RevOps ─── */
function L2Introduccion({ isDark }: { isDark: boolean }) {
  const [tab, setTab] = useState<'velocidad' | 'vista' | 'datos'>('velocidad');
  const tone = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Introducción a" highlight="RevOps"
      subtitle="Velocidad ≠ Progreso. La diferencia entre rapidez y rumbo define si RevOps genera valor real.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Escena velocidad vs velocidad */}
        <div className="w-[300px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 300 260" width="300" height="260">
            <SceneDefs id="ro2" isDark={isDark} />
            {/* Speed = sin dirección */}
            <Float amp={4} dur={2.8}>
              <Cylinder cx={90} cy={130} rx={36} ry={13} h={30} top={ORANGE} side="#c45c00" />
              <text x="90" y="176" textAnchor="middle" fontSize="10" fontWeight="800" fill={tone.text}>Rapidez</text>
              <text x="90" y="188" textAnchor="middle" fontSize="8" fill={tone.muted}>¿qué tan rápido?</text>
            </Float>
            <PulseDisc cx={90} cy={118} rx={50} ry={18} color={ORANGE} dur={2.4} delay={0} peak={0.2} />
            {/* Velocity = dirección */}
            <Float amp={4} dur={3.2} delay={0.6}>
              <Cylinder cx={210} cy={130} rx={36} ry={13} h={30} top={PINK} side="#a01435" />
              <text x="210" y="176" textAnchor="middle" fontSize="10" fontWeight="800" fill={tone.text}>Velocidad</text>
              <text x="210" y="188" textAnchor="middle" fontSize="8" fill={tone.muted}>hacia el objetivo</text>
            </Float>
            <PulseDisc cx={210} cy={118} rx={50} ry={18} color={PINK} dur={2.4} delay={0.8} peak={0.2} />
            <text x="150" y="122" textAnchor="middle" fontSize="16" fontWeight="900" fill={ORANGE} opacity={0.7}>≠</text>
            <Traveler id="ro2" path={[[90,118],[150,110],[210,118]]} dur={2.2} delay={0.4} r={5} color={ORANGE} />
          </svg>
        </div>
        {/* Tabs */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            <Pill isDark={isDark} on={tab === 'velocidad'} onClick={() => setTab('velocidad')}>Velocidad vs Rapidez</Pill>
            <Pill isDark={isDark} on={tab === 'vista'} onClick={() => setTab('vista')}>Vista consolidada</Pill>
            <Pill isDark={isDark} on={tab === 'datos'} onClick={() => setTab('datos')}>Datos primero</Pill>
          </div>
          {tab === 'velocidad' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-5 ${featuredClass(isDark)}`}>
              <p className={`text-[12px] font-black uppercase tracking-wide mb-2`} style={{ color: ORANGE }}>Velocidad ≠ Rapidez</p>
              <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                Rapidez (speed) mide <strong>qué tan rápido</strong> se mueven los deals. Velocidad (velocity) mide <strong>el progreso real hacia el objetivo de ingresos</strong>. RevOps optimiza velocidad, no actividad por actividad.
              </p>
            </motion.div>
          )}
          {tab === 'vista' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-5 ${featuredClass(isDark)}`}>
              <p className={`text-[12px] font-black uppercase tracking-wide mb-2`} style={{ color: PINK }}>Vista consolidada del cliente</p>
              <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                Una sola vista del cliente — que integra marketing, ventas y CS — permite <strong>mejor servicio en cada etapa</strong> del ciclo. Los equipos dejan de operar con datos de clientes distintos y en conflicto.
              </p>
            </motion.div>
          )}
          {tab === 'datos' && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl p-5 ${featuredClass(isDark)}`}>
              <p className={`text-[12px] font-black uppercase tracking-wide mb-2`} style={{ color: ORANGE }}>Primera prioridad: recopilar datos</p>
              <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>
                Al implementar RevOps, el primer paso es <strong>instalar los sistemas de recopilación de datos</strong>. Sin datos confiables y compartidos no existe alineación real, solo coordinación informal.
              </p>
            </motion.div>
          )}
          <Footer isDark={isDark}>
            La empatía y la curiosidad por los procesos de los demás equipos son la base de una adopción exitosa de RevOps.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 3: RevOps al Embudo de Ventas ─── */
function L3Embudo({ isDark }: { isDark: boolean }) {
  const [step, setStep] = useState(0);
  const tone = sceneTone(isDark);
  const etapas = [
    { label: 'Conciencia', color: '#ff851d', desc: 'Marketing genera demanda calificada. Métrica clave: CAC y MQL.' },
    { label: 'Consideración', color: '#f97316', desc: 'El equipo de ventas entiende el dolor. SPIN y MEDDPICC en acción.' },
    { label: 'Decisión', color: '#ef375c', desc: 'Champion interno impulsa. Propuesta alineada al Economic Buyer.' },
    { label: 'Adopción', color: '#be185d', desc: 'CS entrega el valor prometido. Tiempo de primer valor (TTV) medido.' },
    { label: 'Deleite', color: '#9d174d', desc: 'NPS mide la lealtad. Análisis de negocio repetido y reclamos resueltos.' },
  ];
  return (
    <Shell isDark={isDark} title="RevOps al" highlight="Embudo de Ventas"
      subtitle="Cada etapa del funnel tiene un equipo responsable, una métrica clave y un criterio de avance definido.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Funnel SVG */}
        <div className="w-[260px] shrink-0 flex items-center">
          <svg viewBox="0 0 260 300" width="260" height="300">
            <SceneDefs id="ro3" isDark={isDark} />
            {etapas.map((e, i) => {
              const topW = 220 - i * 32;
              const botW = 220 - (i + 1) * 32;
              const y = 20 + i * 52;
              const h = 46;
              const cx = 130;
              return (
                <motion.g key={e.label} animate={{ opacity: step === i ? 1 : 0.45 }}
                  transition={{ duration: 0.3 }} onClick={() => setStep(i)} style={{ cursor: 'pointer' }}>
                  <polygon points={`${cx - topW / 2},${y} ${cx + topW / 2},${y} ${cx + botW / 2},${y + h} ${cx - botW / 2},${y + h}`}
                    fill={e.color} opacity={step === i ? 0.9 : 0.5} />
                  <text x={cx} y={y + h / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">{e.label}</text>
                </motion.g>
              );
            })}
          </svg>
        </div>
        {/* Detalle de etapa */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            {etapas.map((e, i) => (
              <button key={e.label} onClick={() => setStep(i)}
                className="px-3 py-1 rounded-full text-[11px] font-bold transition-all"
                style={{ backgroundColor: step === i ? e.color : 'transparent', color: step === i ? '#fff' : e.color, border: `1.5px solid ${e.color}` }}>
                {e.label}
              </button>
            ))}
          </div>
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-5 ${featuredClass(isDark)}`}>
            <p className="text-[12px] font-black uppercase tracking-wide mb-2" style={{ color: etapas[step].color }}>
              {etapas[step].label}
            </p>
            <p className={`text-[14px] leading-relaxed ${textMuted(isDark)}`}>{etapas[step].desc}</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            <StatCard isDark={isDark} value="NPS" label="Métrica de Deleite" sub="Análisis de negocio repetido y resolución de reclamos" />
            <StatCard isDark={isDark} value="TTV" label="Time to Value" sub="Primer hito de valor que el cliente experimenta en Adopción" />
          </div>
          <Footer isDark={isDark}>
            Una estrategia de deleite se mide con NPS y con el análisis de negocio repetido.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 4: Responsabilidad con SLA ─── */
function L4SLA({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const slas = [
    { eq: 'Marketing', accion: 'Entrega MQL calificado', tiempo: '< 24 h', color: ORANGE },
    { eq: 'Ventas', accion: 'Primer contacto al MQL', tiempo: '< 4 h', color: PINK },
    { eq: 'CS', accion: 'Primer contacto post-cierre', tiempo: '< 48 h', color: '#8b5cf6' },
    { eq: 'Ops', accion: 'Resolución de datos erróneos', tiempo: '< 72 h', color: '#10b981' },
  ];
  return (
    <Shell isDark={isDark} title="Responsabilidad con" highlight="SLA"
      subtitle="Los SLA convierten compromisos informales en acuerdos medibles entre ventas, marketing y CS.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Timeline SLA */}
        <div className="w-[280px] shrink-0 flex items-center">
          <svg viewBox="0 0 280 280" width="280" height="280">
            <SceneDefs id="ro4" isDark={isDark} />
            <line x1="60" y1="40" x2="60" y2="250" stroke={tone.muted} strokeWidth="2" strokeDasharray="4 4" opacity={0.4} />
            {slas.map((s, i) => {
              const y = 50 + i * 55;
              return (
                <motion.g key={s.eq} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, type: 'spring', stiffness: 120, damping: 14 }}>
                  <circle cx={60} cy={y} r={8} fill={s.color} />
                  <text x={78} y={y - 5} fontSize="11" fontWeight="800" fill={s.color}>{s.eq}</text>
                  <text x={78} y={y + 8} fontSize="9" fill={tone.muted}>{s.accion}</text>
                  <rect x={195} y={y - 11} width={62} height={20} rx={6} fill={s.color} opacity={0.15} />
                  <text x={226} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="800" fill={s.color}>{s.tiempo}</text>
                </motion.g>
              );
            })}
            <Traveler id="ro4" path={[[60,50],[60,100],[60,155],[60,215]]} dur={3} delay={0.5} r={4} color={ORANGE} />
          </svg>
        </div>
        {/* Análisis deals perdidos */}
        <div className="flex-1 flex flex-col gap-4 justify-center">
          <div className={`rounded-2xl p-5 ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-2`}>Análisis de deals perdidos</p>
            <p className={`text-[13px] leading-relaxed ${textMuted(isDark)}`}>
              Cuando una oportunidad se pierde, el SLA exige analizar <strong>tanto el feedback de deals ganados como perdidos</strong>. El patrón compartido revela si el problema es de calificación, de propuesta o de seguimiento post-contacto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <StatCard isDark={isDark} value="SLA" label="Service Level Agreement" sub="Compromiso formal entre equipos sobre tiempos y criterios de entrega" />
            <StatCard isDark={isDark} value="+23%" label="Conversión media" sub="Al reducir el tiempo de respuesta a leads de 24 h a 4 h (InsideSales.com)" />
          </div>
          <Footer isDark={isDark}>
            Un SLA roto es datos: indica dónde el proceso necesita recursos o rediseño, no culpables.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 5: Mapear un Proceso de Ventas ─── */
function L5Proceso({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const etapas = [
    { label: 'Prospección', icon: '🎯', criterio: 'ICP confirmado + dolor identificado' },
    { label: 'Calificación', icon: '🔍', criterio: 'MEDDPICC ≥ 4 letras activas' },
    { label: 'Propuesta', icon: '📋', criterio: 'Champion validó ROI' },
    { label: 'Negociación', icon: '🤝', criterio: 'Legal y procurement involucrados' },
    { label: 'Cierre', icon: '✅', criterio: 'PO recibido o firma obtenida' },
  ];
  return (
    <Shell isDark={isDark} title="Mapear un" highlight="Proceso de Ventas"
      subtitle="Mapear es documentar: etapas, cadencia, criterios de avance y handoffs entre equipos.">
      <div className="flex-1 flex flex-col gap-5 justify-center">
        {/* Proceso horizontal */}
        <div className="flex gap-2 items-center overflow-x-auto pb-2">
          {etapas.map((e, i) => (
            <React.Fragment key={e.label}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`shrink-0 rounded-xl p-3 min-w-[130px] ${panelClass(isDark)}`}>
                <div className="text-xl mb-1">{e.icon}</div>
                <div className={`text-[12px] font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{e.label}</div>
                <div className={`text-[10px] leading-tight mt-1 ${textMuted(isDark)}`}>{e.criterio}</div>
              </motion.div>
              {i < etapas.length - 1 && (
                <svg width="24" height="20" viewBox="0 0 24 20" className="shrink-0">
                  <path d="M2 10 L18 10 M14 5 L20 10 L14 15" stroke={ORANGE} strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Definiciones clave */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { t: 'Cadencia', d: 'Frecuencia y canal de contacto definidos por etapa y persona de contacto.' },
            { t: 'Criterio de avance', d: 'Condición observable que justifica mover una oportunidad a la siguiente etapa.' },
            { t: 'Handoff', d: 'Transferencia formal entre equipos: BDR→AE, AE→CS — con contexto documentado.' },
          ].map(c => (
            <div key={c.t} className={`rounded-2xl p-4 ${featuredClass(isDark)}`}>
              <p className={`text-[11px] font-black uppercase tracking-wide mb-1`} style={{ color: ORANGE }}>{c.t}</p>
              <p className={`text-[12px] leading-relaxed ${textMuted(isDark)}`}>{c.d}</p>
            </div>
          ))}
        </div>
        <Footer isDark={isDark}>
          Un proceso de ventas sin criterios de avance es un wishlist, no un proceso.
        </Footer>
      </div>
    </Shell>
  );
}

/* ─── Lección 6: Gestión de Sistemas ─── */
function L6Sistemas({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const [active, setActive] = useState<number>(0);
  const sistemas = [
    { nombre: 'CRM', rol: 'Sistema de registro', desc: 'Fuente única de verdad sobre oportunidades, contactos y actividad comercial. Todo lo demás se sincroniza con él.', color: ORANGE },
    { nombre: 'MAP', rol: 'Automatización de marketing', desc: 'Marketing Automation Platform: gestión de leads, nurturing y scoring. Alimenta el CRM con MQLs calificados.', color: PINK },
    { nombre: 'BI', rol: 'Business Intelligence', desc: 'Dashboards de ingresos, predicción de pipeline y análisis de cohortes. Convierte datos en decisiones.', color: '#8b5cf6' },
    { nombre: 'CS Platform', rol: 'Éxito del cliente', desc: 'Onboarding, health score y gestión de renovaciones. Cierra el ciclo del cliente con RevOps.', color: '#10b981' },
  ];
  return (
    <Shell isDark={isDark} title="Gestión de" highlight="Sistemas para RevOps"
      subtitle="El stack tecnológico de RevOps conecta los datos de cada equipo en un flujo continuo hacia los ingresos.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Stack visual */}
        <div className="w-[280px] shrink-0 flex items-center">
          <svg viewBox="0 0 280 280" width="280" height="280">
            <SceneDefs id="ro6" isDark={isDark} />
            <IsoFloor cx={140} cy={255} s={110} fill={tone.floor} />
            {sistemas.map((s, i) => (
              <motion.g key={s.nombre} animate={{ y: active === i ? -8 : 0, opacity: active === i ? 1 : 0.55 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                onClick={() => setActive(i)} style={{ cursor: 'pointer' }}>
                <IsoBox cx={140} cy={215 - i * 45} s={55} h={32}
                  f={active === i ? { top: s.color, left: `${s.color}99`, right: `${s.color}66` } : NEUTRAL(isDark)} />
                <text x="140" y={215 - i * 45 + 6} textAnchor="middle" fontSize="10" fontWeight="800"
                  fill={active === i ? '#fff' : tone.muted}>{s.nombre}</text>
              </motion.g>
            ))}
            <PulseDisc cx={140} cy={215 - active * 45 - 20} rx={60} ry={22} color={sistemas[active].color} dur={2} peak={0.2} />
          </svg>
        </div>
        {/* Detalle */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            {sistemas.map((s, i) => (
              <button key={s.nombre} onClick={() => setActive(i)}
                className="px-3 py-1 rounded-full text-[11px] font-bold transition-all"
                style={{ backgroundColor: active === i ? s.color : 'transparent', color: active === i ? '#fff' : s.color, border: `1.5px solid ${s.color}` }}>
                {s.nombre}
              </button>
            ))}
          </div>
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-5 ${featuredClass(isDark)}`}>
            <p className="text-[12px] font-black uppercase tracking-wide mb-1" style={{ color: sistemas[active].color }}>
              {sistemas[active].nombre} · {sistemas[active].rol}
            </p>
            <p className={`text-[14px] leading-relaxed ${textMuted(isDark)}`}>{sistemas[active].desc}</p>
          </motion.div>
          <div className={`rounded-2xl p-4 ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Principio de sistemas RevOps</p>
            <p className={`text-[13px] ${textMuted(isDark)}`}>
              Cada sistema tiene un propietario en RevOps. Sin gobernanza de sistemas, los datos se degradan y la vista consolidada del cliente se fragmenta.
            </p>
          </div>
          <Footer isDark={isDark}>
            El CRM es el sistema de registro. Los demás se sincronizan con él, no al revés.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 7: Estructurando el Equipo ─── */
function L7Estructura({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const funciones = [
    { rol: 'Analítica de ingresos', sigla: 'Analytics', desc: 'Dashboards, KPIs y pronósticos de pipeline para la dirección comercial.', color: ORANGE },
    { rol: 'Sistemas y datos', sigla: 'Systems', desc: 'CRM, integraciones, calidad de datos y gobernanza del stack tecnológico.', color: PINK },
    { rol: 'Habilitación', sigla: 'Enablement', desc: 'Playbooks, onboarding de reps, entrenamiento y contenido de ventas.', color: '#8b5cf6' },
    { rol: 'Procesos', sigla: 'Process', desc: 'Mapeo, documentación y mejora continua de los flujos comerciales.', color: '#10b981' },
  ];
  return (
    <Shell isDark={isDark} title="Estructurando tu" highlight="Equipo de RevOps"
      subtitle="RevOps puede empezar con una sola persona. Lo que importa es cubrir las cuatro funciones, aunque se combinen.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Personas */}
        <div className="w-[260px] shrink-0 flex items-center">
          <svg viewBox="0 0 260 260" width="260" height="260">
            <SceneDefs id="ro7" isDark={isDark} />
            <IsoFloor cx={130} cy={230} s={100} fill={tone.floor} />
            <Float delay={0}><Persona id="ro7" cx={90} cy={210} s={0.78} body={BRAND} accessory="gear" hair="#2d2d2d" /></Float>
            <Float delay={1.1}><Persona id="ro7" cx={170} cy={207} s={0.82} body={PEACH} accessory="compass" hair="#6b3f1d" /></Float>
            <text x="90" y="238" textAnchor="middle" fontSize="8" fontWeight="700" fill={tone.muted}>Sistemas</text>
            <text x="170" y="235" textAnchor="middle" fontSize="8" fontWeight="700" fill={tone.muted}>Estrategia</text>
            <Traveler id="ro7" path={hop([90,170],[170,165])} dur={2.4} delay={0.5} r={4} color={PINK} />
          </svg>
        </div>
        {/* Funciones */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="grid grid-cols-2 gap-2">
            {funciones.map((f, i) => (
              <motion.div key={f.sigla} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} className={`rounded-2xl p-3 ${panelClass(isDark)}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                  <span className="text-[11px] font-black uppercase tracking-wide" style={{ color: f.color }}>{f.sigla}</span>
                </div>
                <p className={`text-[10px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-0.5`}>{f.rol}</p>
                <p className={`text-[10px] leading-relaxed ${textMuted(isDark)}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <Footer isDark={isDark}>
            Una empresa con un equipo de RevOps maduro integra analítica, sistemas, habilitación y procesos bajo un solo liderazgo.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 8: Contratación ─── */
function L8Contratacion({ isDark }: { isDark: boolean }) {
  const tone = sceneTone(isDark);
  const perfiles = [
    {
      rol: 'RevOps Manager', desc: 'Visión de sistema completo: domina procesos, datos y gestión de equipos. Interlocutor del C-suite.',
      cuerpo: BRAND, acc: 'tie' as const, color: ORANGE,
    },
    {
      rol: 'RevOps Analyst', desc: 'Fluido en SQL, Looker o Tableau. Convierte datos de pipeline en insights accionables.',
      cuerpo: PEACH, acc: 'star' as const, color: PINK,
    },
    {
      rol: 'Systems Admin', desc: 'Administra el CRM y el stack. Propietario de integraciones y calidad de datos.',
      cuerpo: SLATE(isDark), acc: 'gear' as const, color: '#8b5cf6',
    },
  ];
  const atributos = [
    { a: 'Empatía', d: 'Comprende el dolor de ventas, marketing y CS sin juzgar prioridades ajenas.', color: ORANGE },
    { a: 'Curiosidad', d: 'Investiga el porqué de cada fricción en el proceso antes de proponer cambios.', color: PINK },
    { a: 'Orientación a datos', d: 'Toma decisiones con evidencia, no con intuición ni con la voz más alta de la sala.', color: '#8b5cf6' },
  ];
  return (
    <Shell isDark={isDark} title="Contratación de" highlight="Miembros del Equipo"
      subtitle="Empatía + curiosidad + orientación a datos: el perfil que hace funcionar RevOps en la práctica.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Personas */}
        <div className="w-[280px] shrink-0 flex items-center">
          <svg viewBox="0 0 280 280" width="280" height="280">
            <SceneDefs id="ro8" isDark={isDark} />
            <IsoFloor cx={140} cy={240} s={120} fill={tone.floor} />
            {perfiles.map((p, i) => (
              <Float key={p.rol} delay={i * 0.7} amp={4} dur={3 + i * 0.4}>
                <Persona id="ro8" cx={75 + i * 65} cy={215} s={0.8} body={p.cuerpo} accessory={p.acc} hair="#2d2d2d" />
              </Float>
            ))}
            {perfiles.map((p, i) => (
              <text key={`lbl-${i}`} x={75 + i * 65} y={242} textAnchor="middle" fontSize="8" fontWeight="700" fill={p.color}>{p.rol.split(' ')[1] || p.rol}</text>
            ))}
          </svg>
        </div>
        {/* Atributos y roles */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex flex-col gap-2">
            {atributos.map((a) => (
              <div key={a.a} className={`flex gap-3 items-start p-3 rounded-xl ${panelClass(isDark)}`}>
                <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: a.color }} />
                <div>
                  <span className="text-[12px] font-black" style={{ color: a.color }}>{a.a}</span>
                  <p className={`text-[11px] leading-relaxed ${textMuted(isDark)}`}>{a.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Footer isDark={isDark}>
            El mejor perfil RevOps no viene de ventas ni de TI: viene de quien puede hablar los dos idiomas.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Lección 9: Evaluando e Iterando ─── */
function L9Evaluacion({ isDark }: { isDark: boolean }) {
  const [phase, setPhase] = useState(0);
  const tone = sceneTone(isDark);
  const ciclo = [
    { label: 'Medir', desc: 'Define las métricas del norte (North Star) y recoge datos limpios durante al menos un ciclo completo.', color: ORANGE },
    { label: 'Analizar', desc: 'Identifica cuellos de botella, caídas de conversión y SLA rotos. Compara con benchmarks del sector.', color: '#f97316' },
    { label: 'Hipótesis', desc: 'Formula cambios específicos y medibles: "Si reducimos el tiempo de respuesta a <2 h, la conversión MQL→SQL subirá X%."', color: PINK },
    { label: 'Cambiar', desc: 'Implementa en un equipo piloto. Documenta el cambio de proceso en el playbook y comunica el SLA nuevo.', color: '#be185d' },
  ];
  return (
    <Shell isDark={isDark} title="Evaluando e Iterando" highlight="tu Estrategia"
      subtitle="RevOps no se optimiza una vez: es un ciclo continuo de medición, análisis, hipótesis y cambio.">
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Ciclo SVG */}
        <div className="w-[280px] shrink-0 flex items-center">
          <svg viewBox="0 0 280 280" width="280" height="280">
            <SceneDefs id="ro9" isDark={isDark} />
            {ciclo.map((c, i) => {
              const angle = (i / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 140 + Math.cos(angle) * 85;
              const cy = 140 + Math.sin(angle) * 85;
              return (
                <motion.g key={c.label} animate={{ scale: phase === i ? 1.12 : 1, opacity: phase === i ? 1 : 0.55 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                  style={{ transformOrigin: `${cx}px ${cy}px`, cursor: 'pointer' }}
                  onClick={() => setPhase(i)}>
                  <circle cx={cx} cy={cy} r={28} fill={c.color} opacity={phase === i ? 0.9 : 0.5} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">{c.label}</text>
                </motion.g>
              );
            })}
            {/* Flechas circulares entre nodos */}
            {ciclo.map((_, i) => {
              const a1 = (i / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              const a2 = ((i + 1) / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              const x1 = 140 + Math.cos(a1) * 85;
              const y1 = 140 + Math.sin(a1) * 85;
              const x2 = 140 + Math.cos(a2) * 85;
              const y2 = 140 + Math.sin(a2) * 85;
              return (
                <line key={`arrow-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={tone.muted} strokeWidth="1.5" strokeDasharray="4 4" opacity={0.4} />
              );
            })}
            <Orb id="ro9" cx={140} cy={140} r={22} />
            <text x="140" y="137" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff">RevOps</text>
            <text x="140" y="148" textAnchor="middle" fontSize="7" fill="#fff" opacity={0.8}>ciclo</text>
            <Traveler id="ro9" path={ciclo.map((_, i) => {
              const angle = (i / ciclo.length) * Math.PI * 2 - Math.PI / 2;
              return [140 + Math.cos(angle) * 85, 140 + Math.sin(angle) * 85] as [number, number];
            })} dur={4} delay={0} r={5} color={ORANGE} />
          </svg>
        </div>
        {/* Detalle de fase */}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          <div className="flex gap-2 flex-wrap">
            {ciclo.map((c, i) => (
              <button key={c.label} onClick={() => setPhase(i)}
                className="px-3 py-1 rounded-full text-[11px] font-bold transition-all"
                style={{ backgroundColor: phase === i ? c.color : 'transparent', color: phase === i ? '#fff' : c.color, border: `1.5px solid ${c.color}` }}>
                {c.label}
              </button>
            ))}
          </div>
          <motion.div key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl p-5 ${featuredClass(isDark)}`}>
            <p className="text-[12px] font-black uppercase tracking-wide mb-2" style={{ color: ciclo[phase].color }}>
              {ciclo[phase].label}
            </p>
            <p className={`text-[14px] leading-relaxed ${textMuted(isDark)}`}>{ciclo[phase].desc}</p>
          </motion.div>
          <StatCard isDark={isDark} value="90 días" label="Ciclo de evaluación recomendado" sub="Suficiente para ver tendencias; lo bastante corto para corregir a tiempo (Gong, 2022)" />
          <Footer isDark={isDark}>
            Al evaluar deals perdidos, analizar también los ganados revela qué funciona — y qué replicar.
          </Footer>
        </div>
      </div>
    </Shell>
  );
}

/* ─── Router ─── */
const SLIDE_MAP: Record<string, (p: { isDark: boolean }) => React.ReactElement> = {
  'ro-1-bienvenida': L1Bienvenida,
  'ro-2-introduccion': L2Introduccion,
  'ro-3-embudo': L3Embudo,
  'ro-4-sla': L4SLA,
  'ro-5-proceso': L5Proceso,
  'ro-6-sistemas': L6Sistemas,
  'ro-7-estructura': L7Estructura,
  'ro-8-contratacion': L8Contratacion,
  'ro-9-evaluacion': L9Evaluacion,
};

export default function ClaseRevOps({ slideId, isDark }: SlideProps) {
  const Component = SLIDE_MAP[slideId];
  if (!Component) {
    return (
      <Shell isDark={isDark} title="RevOps" highlight="Revenue Operations"
        subtitle="Selecciona una lección en el índice lateral.">
        <div className="flex-1 flex items-center justify-center">
          <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contenido en construcción.</p>
        </div>
      </Shell>
    );
  }
  return <Component isDark={isDark} />;
}
