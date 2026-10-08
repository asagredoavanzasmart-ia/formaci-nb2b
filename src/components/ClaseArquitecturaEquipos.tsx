import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock, Target, AlertTriangle, MessageSquare, ChevronRight, Compass,
  Megaphone, PhoneCall, Handshake, Repeat, Wrench, Gauge, CheckCircle2,
  BarChart3, Zap, ArrowRight,
} from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, SiglasBar, Quiz } from './slideKit';
import type { QuizQ } from './slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFrustum,
  IsoPyramid, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from './scene3d';
import type { Faces, Accessory } from './scene3d';

/**
 * Clase: "Diseño y Arquitectura de Equipos de Ventas"
 * (aplanamiento, habilitación y agilidad).
 *
 * Esquemas en el estilo 3D de la clase B2B: sólidos isométricos sin contornos,
 * sombras, brillo y animación (ver scene3d.tsx). Los encabezados de sección
 * (level 1, "eq-header-*") los dibuja App.tsx.
 */

type SlideProps = { isDark: boolean };

/* Franja de cierre / insight al pie de una diapositiva (sin contorno). */
function Footer({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`shrink-0 mt-4 p-3.5 rounded-2xl text-center text-sm md:text-base font-medium ${isDark ? 'bg-white/5 text-gray-300' : 'bg-gradient-to-r from-orange-50 to-rose-50 text-gray-700'}`}>
      {children}
    </div>
  );
}

/* Tarjeta de métrica. */
function Stat({ isDark, icon: Icon, value, label, hint }: { isDark: boolean; icon: React.ElementType; value: string; label: string; hint?: string }) {
  return (
    <div className={`p-4 rounded-3xl flex flex-col gap-1.5 ${panelClass(isDark)}`}>
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0">
          <Icon size={20} />
        </span>
        <span className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</span>
      </div>
      <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</p>
      {hint && <p className={`text-xs leading-relaxed ${textMuted(isDark)}`}>{hint}</p>}
    </div>
  );
}

/* Botón-pastilla de selección. */
function Pill({ isDark, on, onClick, children }: { isDark: boolean; on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${on ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30 scale-105' : isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const ground = 168;
  const modules = [
    { x: 110, h: 60, f: NEUTRAL(isDark), label: 'Módulo de Adquisición' },
    { x: 280, h: 95, f: BRAND, label: 'Motor de Habilitación' },
    { x: 450, h: 72, f: PEACH, label: 'Flujo de Valor' },
    { x: 620, h: 112, f: BRAND, label: 'Interfaz de Crecimiento' },
  ];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212] border border-[#2a2a2a]' : 'bg-[#f8f9fa] border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />

      <svg viewBox="0 0 730 250" className="w-full max-w-2xl mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="por" isDark={isDark} />
        {modules.slice(0, -1).map((m, i) => (
          <Traveler key={i} id="por" path={hop([m.x + 50, ground - 25], [modules[i + 1].x - 50, ground - 25], 30)} dur={2.2} delay={i * 0.6} r={5} color={i % 2 ? PINK : ORANGE} />
        ))}
        {modules.map((m, i) => (
          <motion.g key={m.x} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * i, type: 'spring', stiffness: 90, damping: 14 }}>
            <Float amp={6} dur={3.6} delay={i * 0.4}>
              <g filter="url(#por-sh)"><IsoBox cx={m.x} cy={ground - m.h} s={52} h={m.h} f={m.f} /></g>
            </Float>
            <text x={m.x} y={ground + 64} textAnchor="middle" fontSize={13} fontWeight={700} fill={t.text}>{m.label}</text>
          </motion.g>
        ))}
      </svg>

      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold text-[#ff851d] z-10">
        Arquitectura de ventas modernas
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-3xl md:text-6xl font-black mb-5 leading-tight tracking-tighter z-10 max-w-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Diseño y Arquitectura de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Equipos de Ventas</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Cómo estructurar, habilitar y escalar equipos comerciales <strong>sin cuellos de botella jerárquicos</strong>: aplanamiento, habilitación y agilidad.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-7 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Diagnóstico: la crisis de la ejecución                           */
/* ------------------------------------------------------------------ */

function Diagnostico({ isDark }: SlideProps) {
  const stats = [
    { icon: Clock, value: '6,2', label: 'meses de Ramp Time de un AE', hint: 'Lo que tarda un AE (Account Executive, ejecutivo de cuentas) nuevo en llegar al 100% de su cuota de forma sostenida: máximo histórico.' },
    { icon: Target, value: '48%', label: 'de los AE (ejecutivos de cuentas) logra su cuota', hint: 'Más de la mitad del equipo no cubre su propio costo cargado: sube el costo de adquirir clientes.' },
    { icon: AlertTriangle, value: '53 pp', label: 'de brecha de ejecución', hint: 'El 89% de las empresas documenta sus procesos, pero solo el 36% los aplica frente al cliente.' },
    { icon: MessageSquare, value: '46%', label: 'del talento Gen Z sin feedback', hint: 'Casi la mitad de los nuevos reporta falta de coaching continuo: más frustración y rotación temprana.' },
  ];
  return (
    <Shell isDark={isDark} title="La crisis de la" highlight="ejecución comercial" subtitle="Cuatro indicadores B2B (2024-2026) que muestran que el modelo tradicional dejó de funcionar.">
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 120, damping: 16 }} whileHover={{ y: -4 }}>
              <Stat isDark={isDark} icon={s.icon} value={s.value} label={s.label} hint={s.hint} />
            </motion.div>
          ))}
        </div>
        <Footer isDark={isDark}>
          No es un problema de esfuerzo individual ni de motivación: es una <strong>falla sistémica de diseño organizacional</strong>, de tramo de control y de soporte en tiempo real.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Los dos motores: embudo 3D vs torre emisora                      */
/* ------------------------------------------------------------------ */

function FunnelScene({ isDark }: { isDark: boolean }) {
  return (
    <svg viewBox="0 0 240 200" className="w-full h-full overflow-visible" aria-hidden="true">
      <SceneDefs id="fun" isDark={isDark} />
      {[-48, -10, 30, 55].map((dx, i) => (
        <motion.circle key={i} r={6} fill={i % 2 ? PINK : ORANGE} filter="url(#fun-gl)"
          initial={{ cx: 120 + dx, cy: -10, opacity: 0 }}
          animate={{ cx: [120 + dx, 120 + dx * 0.4, 120], cy: [-10, 40, 78], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, delay: i * 0.55, repeat: Infinity, ease: 'easeIn' }} />
      ))}
      <g filter="url(#fun-sh)">
        <polygon points="120,30 210,75 120,120 30,75" fill="#c41e3d" opacity={0.9} />
        <IsoFrustum cx={120} y1={75} s1={90} y2={132} s2={22} f={BRAND} showTop={false} />
        <IsoBox cx={120} cy={132} s={22} h={26} f={BRAND} />
      </g>
      <motion.g initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 22], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}>
        <Orb id="fun" cx={120} cy={176} r={8} />
      </motion.g>
    </svg>
  );
}

function BeaconScene({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  const targets: [number, number][] = [[160, 120], [196, 142], [150, 166], [206, 112]];
  return (
    <svg viewBox="0 0 240 200" className="w-full h-full overflow-visible" aria-hidden="true">
      <SceneDefs id="bea" isDark={isDark} />
      <IsoFloor cx={125} cy={140} s={112} fill={t.floor} />
      <PulseDisc cx={72} cy={142} rx={130} ry={65} dur={2.6} />
      <PulseDisc cx={72} cy={142} rx={130} ry={65} dur={2.6} delay={1.3} color={PINK} />
      {targets.map(([x, y], i) => (
        <g key={i} filter="url(#bea-sh)">
          <IsoBox cx={x} cy={y - 10} s={11} h={10} f={NEUTRAL(isDark)} />
          <motion.circle cx={x} cy={y - 18} r={4} fill={PINK} filter="url(#bea-gl)" animate={{ opacity: [0.15, 1, 0.15] }} transition={{ duration: 2.6, delay: 0.4 + i * 0.3, repeat: Infinity }} />
        </g>
      ))}
      <g filter="url(#bea-sh)"><IsoBox cx={72} cy={96} s={18} h={40} f={BRAND} /></g>
      <Float amp={4} dur={2.4}><Orb id="bea" cx={72} cy={82} r={11} /></Float>
      {targets.map(([x, y], i) => (
        <Traveler key={`t${i}`} id="bea" path={hop([72, 82], [x, y - 18], 30)} dur={1.6} delay={i * 0.45} repeatDelay={0.6} r={3.5} color={ORANGE} />
      ))}
    </svg>
  );
}

function InboundOutbound({ isDark }: SlideProps) {
  const motors = [
    {
      key: 'in', title: 'Motor Inbound', tag: 'Atracción', Scene: FunnelScene,
      rows: [
        ['Cómo atrae', 'El cliente llega solo, atraído por la marca (awareness), la reputación y los casos de éxito.'],
        ['Tácticas', 'SEO, contenido de valor, redes sociales, pauta digital (Ads) y recursos descargables a cambio de datos.'],
        ['Perfil ideal', 'Mercados educados y productos que resuelven una necesidad que el cliente ya busca.'],
        ['El reto', 'El prospecto llega muy informado y exige respuestas técnicas desde el primer contacto.'],
      ],
    },
    {
      key: 'out', title: 'Motor Outbound', tag: 'Prospección', Scene: BeaconScene,
      rows: [
        ['Cómo prospecta', 'El equipo sale al mercado abierto, sin esperar a que el cliente lo busque.'],
        ['Tácticas', 'Mapeo de cuentas clave (Targeted Accounts), investigación profunda y contacto directo: llamadas y secuencias.'],
        ['Perfil ideal', 'Tickets altos y ventas B2B complejas, donde el control del ICP vale el esfuerzo.'],
        ['El reto', 'Despertar el interés en frío y construir la necesidad desde cero.'],
      ],
    },
  ];
  return (
    <Shell isDark={isDark} title="Los dos motores de" highlight="adquisición" subtitle="Cómo llega el cliente decide qué roles, herramientas y ritmo necesita tu equipo.">
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {motors.map((m, idx) => (
            <motion.div key={m.key} initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 16 }} className={`p-5 rounded-3xl flex flex-col min-h-0 ${panelClass(isDark)}`}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-36 h-28 shrink-0"><m.Scene isDark={isDark} /></div>
                <div>
                  <p className={microLabel(isDark)}>{m.tag}</p>
                  <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{m.title}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {m.rows.map(([label, text]) => (
                  <div key={label} className={`px-3 py-2 rounded-xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                    <p className={`${microLabel(isDark)} mb-0.5`}>{label}</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <Footer isDark={isDark}>
          No hay un motor "mejor": la mayoría de las empresas combina ambos. Lo que sí es cierto es que <strong>la estrategia de atracción define la arquitectura del equipo</strong>.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Taxonomía de roles (Top / Bottom of Funnel)                      */
/* ------------------------------------------------------------------ */

type Rol = {
  id: string; code: string; full: string; group: 'top' | 'bottom' | 'lead';
  x: number; hair: string; acc: Accessory;
  mission: string; recibe: string; entrega: string; how: string; skills: string; metric: string;
};

const GROUP_INFO = {
  top: { label: 'Top of Funnel', sub: 'Creadores de oportunidades' },
  bottom: { label: 'Bottom of Funnel', sub: 'Orquestadores de ingresos' },
  lead: { label: 'Liderazgo', sub: 'Orquesta y habilita' },
} as const;

const ROLES: Rol[] = [
  { id: 'bdr', code: 'BDR', full: 'Business Development Rep', group: 'top', x: 93, hair: '#3b2a20', acc: 'compass',
    mission: 'Mapea la región y califica a los potenciales leads antes de cualquier contacto comercial.',
    recibe: 'El mercado, el territorio y los criterios del Manager (PBI, industria, tamaño).', entrega: 'Cuentas target mapeadas y priorizadas.',
    how: 'Prioriza cuentas leyendo el mercado y filtrando por PBI, industria y tamaño. Es la primera interacción entre el lead y MEDDPICC.',
    skills: 'Organización extrema y filtro analítico.', metric: 'Cuentas mapeadas y priorizadas' },
  { id: 'leadgen', code: 'Lead Gen', full: 'Lead Generation Rep', group: 'top', x: 165, hair: '#1f1f1f', acc: 'megaphone',
    mission: 'Genera listas de contactabilidad y tráfico inbound mediante redes sociales y campañas.',
    recibe: 'Cuentas target y objetivos alineados con Ventas.', entrega: 'Listas contactables y tráfico inbound.',
    how: 'Alinea objetivos, cuentas target y contenido con Ventas; ejecuta email marketing, landing pages y WhatsApp.',
    skills: 'Copywriting, pauta digital y análisis de campañas.', metric: 'Públicos alcanzados y éxito de campañas' },
  { id: 'sdr', code: 'SDR', full: 'Sales Development Rep', group: 'top', x: 237, hair: '#7a3e1d', acc: 'headset',
    mission: 'Sale proactivamente a conseguir First Meetings y califica a los prospectos tempranos.',
    recibe: 'Cuentas priorizadas, listas contactables e interesados inbound.', entrega: 'First Meeting y cuenta "aterrizada" con siguientes pasos claros.',
    how: 'Atiende esa primera llamada inbound u outbound, inicia el proceso formal y entrega al AE una cuenta aterrizada.',
    skills: 'Construir al Champion temprano y resiliencia ante el rechazo.', metric: 'Oportunidades calificadas (SQL)' },
  { id: 'ae', code: 'AE', full: 'Account Executive', group: 'bottom', x: 383, hair: '#2b1a12', acc: 'tie',
    mission: 'Lleva el proceso completo hasta el ansiado cierre de la venta (Close Won).',
    recibe: 'Una oportunidad calificada, con Champion temprano.', entrega: 'Close Won con paper process cerrado.',
    how: 'Es dueño y ejecutor riguroso de la metodología: da las DEMOs, guía la conversación comercial y gestiona propuesta, paper process y firma.',
    skills: 'Conocimiento total de la cuenta y del producto; orquestar internamente para avanzar el deal.', metric: 'Win rate y cumplimiento de cuota' },
  { id: 'presales', code: 'Pre-Sales', full: 'Ingeniero de Soluciones', group: 'bottom', x: 455, hair: '#4a4a4a', acc: 'gear',
    mission: 'Es el puente técnico entre el AE/AM y el prospecto en las ventas complejas.',
    recibe: 'Requisitos del prospecto, traducidos por el AE.', entrega: 'POC, DEMO y viabilidad técnica validada.',
    how: 'Desarrolla pruebas de concepto (POC), implementaciones y reuniones técnicas; traduce requisitos en capacidades demostrables y análisis de viabilidad.',
    skills: 'Capacidad técnica total combinada con fluidez y empatía al comunicar.', metric: 'Viabilidad técnica validada' },
  { id: 'am', code: 'AM', full: 'Account Manager', group: 'bottom', x: 527, hair: '#5a2d14', acc: 'heart',
    mission: 'Cuida la relación con la cuenta a lo largo del tiempo, después del cierre.',
    recibe: 'Un cliente recién cerrado y todo su contexto.', entrega: 'Retención, cross-selling y up-selling.',
    how: 'Mantiene el contacto entre Operaciones y el Cliente, orquesta tareas y abre nuevas negociaciones: cross-selling y up-selling.',
    skills: 'Empatía, escucha activa profunda y resolución de conflictos.', metric: 'Retención y expansión (NDR)' },
  { id: 'lead', code: 'Manager', full: 'Sales Lead / Director', group: 'lead', x: 310, hair: '#8a8a8a', acc: 'star',
    mission: 'Monitorea las métricas globales del pipeline, orquesta y habilita: no apaga incendios.',
    recibe: 'Las métricas del pipeline de todos los roles.', entrega: 'Habilitación, recursos y alineación entre Ventas, Marketing y Operaciones.',
    how: 'Desarrolla al equipo, arbitra recursos entre áreas y mantiene alineados Ventas, Marketing y Operaciones.',
    skills: 'Liderazgo de personas, análisis predictivo y visión GTM.', metric: 'Salud del pipeline global' },
];

const bodyOf = (g: Rol['group'], isDark: boolean): Faces => (g === 'top' ? PEACH : g === 'bottom' ? BRAND : SLATE(isDark));

function Roles({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [activeId, setActiveId] = useState('sdr');
  const active = ROLES.find((r) => r.id === activeId) || ROLES[0];
  const grp = GROUP_INFO[active.group];
  const lit = (g: 'top' | 'bottom') => active.group === 'lead' || active.group === g;
  const footY = 252;
  const flows: [number, number, number, number][] = [[93, 237, 30, 0], [237, 383, 44, 0.9], [383, 527, 34, 1.8]];

  return (
    <Shell isDark={isDark} title="El equipo de ventas" highlight="completo: quién es quién" subtitle="Un rol no es un título ni una contratación: es una función del ciclo de venta. Toca cada figura para ver su ficha.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
        <div className="lg:w-[56%] min-h-0 flex items-center">
          <svg viewBox="0 0 620 410" className="w-full h-full overflow-visible" aria-label="El equipo comercial completo: tres creadores de oportunidades, tres orquestadores de ingresos y un líder">
            <SceneDefs id="rol" isDark={isDark} />

            {/* Haces de luz del Manager hacia cada grupo */}
            {[165, 455].map((gx, i) => (
              <motion.polygon key={gx} points={`310,120 ${gx - 130},${210} ${gx + 130},${210}`} fill="url(#rol-brandv)" animate={{ opacity: lit(i === 0 ? 'top' : 'bottom') ? 0.2 : 0.04 }} transition={{ duration: 0.4 }} />
            ))}

            {/* Plataformas de grupo */}
            {[165, 455].map((gx, i) => (
              <motion.g key={gx} animate={{ opacity: lit(i === 0 ? 'top' : 'bottom') ? 1 : 0.55 }} transition={{ duration: 0.4 }} filter="url(#rol-sh)">
                <IsoBox cx={gx} cy={238} s={140} h={14} f={NEUTRAL(isDark)} />
              </motion.g>
            ))}

            {/* Plataforma del Manager */}
            <g filter="url(#rol-sh)"><Cylinder cx={310} cy={96} rx={64} ry={19} h={13} top={NEUTRAL(isDark).top} side={NEUTRAL(isDark).left} /></g>

            {/* Partículas: el trabajo viaja de un rol al siguiente */}
            {flows.map(([a, b, lift, d], i) => (
              <Traveler key={i} id="rol" path={hop([a, footY - 78], [b, footY - 78], lift)} dur={1.7} delay={d} repeatDelay={1.4} r={5} color={i % 2 ? PINK : ORANGE} />
            ))}

            {/* Personas */}
            {ROLES.map((r, i) => {
              const on = r.id === activeId;
              const isLead = r.group === 'lead';
              const fy = isLead ? 92 : footY;
              const body = bodyOf(r.group, isDark);
              return (
                <motion.g key={r.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i, type: 'spring', stiffness: 100, damping: 13 }}>
                  <Lift on={on} dimmed={!on && !lit(r.group === 'lead' ? 'top' : r.group) && !isLead} onClick={() => setActiveId(r.id)} lift={16}>
                    {on && <PulseDisc cx={r.x} cy={fy + 2} rx={42} ry={13} dur={1.9} peak={0.45} />}
                    <Float amp={on ? 4 : 2} dur={2.8} delay={i * 0.25}>
                      <Persona id="rol" cx={r.x} cy={fy} s={on ? 1.12 : 1} body={on ? bodyOf(r.group, isDark) : body} accessory={r.acc} hair={r.hair} accent={r.group === 'top' ? '#ffffff' : '#ffffff'} />
                    </Float>
                  </Lift>
                  {!isLead && (
                    <g>
                      <text x={r.x} y={338} textAnchor="middle" fontSize={on ? 15 : 13} fontWeight={800} fill={on ? ORANGE : t.text}>{r.code}</text>
                    </g>
                  )}
                  {isLead && (
                    <g>
                      <text x={r.x + 84} y={82} fontSize={on ? 16 : 14} fontWeight={800} fill={on ? ORANGE : t.text}>{r.code}</text>
                      <text x={r.x + 84} y={99} fontSize={11} fill={t.muted}>orquesta y habilita</text>
                    </g>
                  )}
                </motion.g>
              );
            })}

            <text x={165} y={392} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={1.5} fill={lit('top') ? ORANGE : t.muted}>TOP OF FUNNEL · CREADORES</text>
            <text x={455} y={392} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={1.5} fill={lit('bottom') ? ORANGE : t.muted}>BOTTOM OF FUNNEL · ORQUESTADORES</text>
          </svg>
        </div>

        <div className="lg:w-[44%] min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className={`h-full p-5 rounded-3xl flex flex-col justify-center gap-3 ${panelClass(isDark)}`}>
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 90 118" className="w-[74px] h-[96px] shrink-0 overflow-visible" aria-hidden="true">
                  <SceneDefs id="rolp" isDark={isDark} />
                  <Float amp={3} dur={2.4}><Persona id="rolp" cx={45} cy={104} s={1.2} body={bodyOf(active.group, isDark)} accessory={active.acc} hair={active.hair} /></Float>
                </svg>
                <div className="min-w-0">
                  <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-black tracking-wide bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30">{grp.label} · {grp.sub}</span>
                  <h3 className={`text-2xl md:text-3xl font-black leading-tight mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{active.code}</h3>
                  <p className={`text-sm font-semibold ${textMuted(isDark)}`}>{active.full}</p>
                </div>
              </div>

              <div>
                <p className={microLabel(isDark)}>Misión · para qué existe</p>
                <p className={`text-base leading-snug font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{active.mission}</p>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                  <p className={microLabel(isDark)}>Recibe</p>
                  <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{active.recibe}</p>
                </div>
                <ArrowRight size={20} className="self-center text-[#ff851d]" />
                <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2018]' : 'bg-orange-50'}`}>
                  <p className={microLabel(isDark)}>Entrega</p>
                  <p className={`text-xs leading-snug ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{active.entrega}</p>
                </div>
              </div>

              <div>
                <p className={microLabel(isDark)}>Cómo trabaja · táctica y responsabilidad</p>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{active.how}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={microLabel(isDark)}>Competencias clave</p>
                  <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{active.skills}</p>
                </div>
                <div>
                  <p className={microLabel(isDark)}>Se mide por</p>
                  <p className="text-xs leading-snug font-bold text-[#ff851d]">{active.metric}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
        <SiglasBar isDark={isDark} keys={['BDR', 'LGR', 'SDR', 'AE', 'PS', 'AM']} />
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4b. Los traspasos: lo que se entregan los roles                     */
/* ------------------------------------------------------------------ */

function Traspasos({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const people: { code: string; x: number; body: Faces; acc: Accessory; hair: string }[] = [
    { code: 'BDR', x: 95, body: PEACH, acc: 'compass', hair: '#3b2a20' },
    { code: 'Lead Gen', x: 165, body: PEACH, acc: 'megaphone', hair: '#1f1f1f' },
    { code: 'SDR', x: 330, body: PEACH, acc: 'headset', hair: '#7a3e1d' },
    { code: 'AE', x: 525, body: BRAND, acc: 'tie', hair: '#2b1a12' },
    { code: 'Pre-Sales', x: 595, body: BRAND, acc: 'gear', hair: '#4a4a4a' },
    { code: 'AM', x: 800, body: BRAND, acc: 'heart', hair: '#5a2d14' },
  ];
  const stations = [
    { cx: 130, rx: 88, name: 'CONCIENTIZACIÓN' },
    { cx: 330, rx: 52, name: 'ACTIVACIÓN' },
    { cx: 560, rx: 88, name: 'ADQUISICIÓN' },
    { cx: 800, rx: 52, name: 'RETENCIÓN' },
  ];
  const gates = [
    { id: 'g1', name: 'BDR + Lead Gen → SDR', who: ['BDR', 'Lead Gen', 'SDR'], path: hop([188, 165], [308, 165], 36), item: 'Cuenta priorizada y contactable',
      incluye: ['Cuenta filtrada por PBI, industria y tamaño', 'Contactos y el canal por el que llegaron (outbound o inbound)', 'Contenido o campaña con la que ya tuvieron contacto'],
      riesgo: 'El SDR llama a ciegas, sin contexto, y el prospecto lo siente.' },
    { id: 'g2', name: 'SDR → AE', who: ['SDR', 'AE'], path: hop([352, 165], [502, 165], 36), item: 'Cuenta "aterrizada"',
      incluye: ['First Meeting agendada', 'Champion detectado desde temprano', 'Siguientes pasos claros y calificación inicial'],
      riesgo: 'El AE repite preguntas ya hechas y la oportunidad se enfría.' },
    { id: 'g3', name: 'AE ⇄ Pre-Sales', who: ['AE', 'Pre-Sales'], path: [[546, 150], [560, 104], [574, 150]] as [number, number][], item: 'Requisitos y capacidades demostrables',
      incluye: ['El AE traduce lo que el prospecto necesita', 'Pre-Sales responde con POC o DEMO y análisis de viabilidad', 'Vuelve al AE para la propuesta'],
      riesgo: 'Demos genéricas o pruebas de concepto que no responden a la necesidad real.' },
    { id: 'g4', name: 'AE → AM', who: ['AE', 'Pre-Sales', 'AM'], path: hop([618, 165], [778, 165], 36), item: 'Cliente cerrado, con su contexto',
      incluye: ['Paper process y contrato cerrados', 'Lo prometido durante la venta, por escrito', 'Quién es el Champion y qué espera el cliente'],
      riesgo: 'El cliente firma y nadie sabe qué se le prometió.' },
    { id: 'g5', name: 'AM → AE (expansión)', who: ['AM', 'AE'], path: hop([800, 120], [548, 120], 85), item: 'Señales de cross-selling y up-selling',
      incluye: ['Necesidades nuevas detectadas en la cuenta', 'Momento y personas indicadas para abrir la conversación', 'Historial de la relación hasta hoy'],
      riesgo: 'La expansión se pierde porque la señal nunca llega al AE.' },
  ];
  const [active, setActive] = useState(1);
  const g = gates[active];
  return (
    <Shell isDark={isDark} title="Los traspasos:" highlight="lo que se entregan los roles" subtitle="En la línea de ensamblaje, lo frágil no son los roles sino los saltos entre ellos. Elige un traspaso y mira qué debe viajar.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible" aria-label="Traspasos entre BDR, Lead Gen, SDR, AE, Pre-Sales y AM">
            <SceneDefs id="trp" isDark={isDark} />
            {stations.map((s, i) => (
              <g key={s.name}>
                <g filter="url(#trp-sh)"><Cylinder cx={s.cx} cy={214} rx={s.rx} ry={22} h={12} top={NEUTRAL(isDark).top} side={NEUTRAL(isDark).left} /></g>
                <text x={s.cx} y={34} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={1.4} fill={t.muted}>{s.name}</text>
              </g>
            ))}
            {gates.map((gt, i) => (
              <Traveler key={gt.id} id="trp" path={gt.path} dur={i === 2 ? 1.1 : 1.6} delay={i * 0.35} repeatDelay={i === active ? 0.2 : 1.6} r={i === active ? 8 : 3.5} color={i === active ? ORANGE : '#94a3b8'} />
            ))}
            {people.map((p, i) => {
              const on = g.who.includes(p.code);
              return (
                <motion.g key={p.code} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i, type: 'spring', stiffness: 100, damping: 13 }}>
                  <Lift on={on} dimmed={!on} lift={12}>
                    {on && <PulseDisc cx={p.x} cy={214} rx={38} ry={12} dur={1.8} peak={0.45} />}
                    <Float amp={on ? 4 : 2} dur={2.7} delay={i * 0.2}>
                      <Persona id="trp" cx={p.x} cy={212} s={1} body={p.body} accessory={p.acc} hair={p.hair} />
                    </Float>
                  </Lift>
                  <text x={p.x} y={276} textAnchor="middle" fontSize={on ? 14 : 12} fontWeight={800} fill={on ? ORANGE : t.text}>{p.code}</text>
                </motion.g>
              );
            })}
          </svg>
        </div>
        <div className="shrink-0 flex flex-wrap justify-center gap-2 mt-1">
          {gates.map((gt, i) => <Pill key={gt.id} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{gt.name}</Pill>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="shrink-0 mt-3 grid grid-cols-1 md:grid-cols-[0.9fr_1.5fr_1fr] gap-3">
            <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a2018]' : 'bg-orange-50'}`}>
              <p className={microLabel(isDark)}>Qué viaja</p>
              <p className={`text-sm font-black leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>{g.item}</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Un buen traspaso incluye</p>
              <ul className={`text-xs space-y-0.5 ${textMuted(isDark)}`}>
                {g.incluye.map((x) => <li key={x} className="flex gap-1.5"><CheckCircle2 size={13} className="text-[#ff851d] shrink-0 mt-0.5" />{x}</li>)}
              </ul>
            </div>
            <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50'}`}>
              <p className={microLabel(isDark)}>Riesgo típico</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{g.riesgo}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <SiglasBar isDark={isDark} keys={['BDR', 'LGR', 'SDR', 'AE', 'PS', 'AM']} />
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. La línea de ensamblaje: plataformas escalonadas                  */
/* ------------------------------------------------------------------ */

const PIP_ACC: Record<string, Accessory> = { LG: 'megaphone', BDR: 'compass', SDR: 'headset', AE: 'tie', PS: 'gear', AM: 'heart' };
const PIP_HAIR: Record<string, string> = { LG: '#1f1f1f', BDR: '#3b2a20', SDR: '#7a3e1d', AE: '#2b1a12', PS: '#4a4a4a', AM: '#5a2d14' };

function Pipeline({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const stages = [
    { name: 'Concientización', roles: 'Lead Gen + BDR', tokens: ['LG', 'BDR'], detail: 'El BDR mapea el territorio y segmenta; Lead Gen genera atención masiva y pauta sobre esas cuentas. El mercado empieza a conocerte.' },
    { name: 'Activación', roles: 'SDR', tokens: ['SDR'], detail: 'El SDR convierte el interés en una conversación real: califica temprano, consigue la First Meeting y detecta al Champion.' },
    { name: 'Adquisición', roles: 'AE + Pre-Sales', tokens: ['AE', 'PS'], detail: 'El AE orquesta la venta, las demostraciones y el cierre; Pre-Sales aporta el apoyo técnico, las integraciones y las POC.' },
    { name: 'Retención', roles: 'AM', tokens: ['AM'], detail: 'El AM sostiene la relación a largo plazo y la hace crecer con cross-selling y up-selling.' },
  ];
  const plat: [number, number][] = [[150, 262], [390, 238], [630, 214], [870, 190]];
  const [active, setActive] = useState(0);
  const st = stages[active];
  return (
    <Shell isDark={isDark} title="El espectro de roles:" highlight="la línea de ensamblaje" subtitle="La cuenta avanza de plataforma en plataforma; el Manager orquesta el flujo completo, no cada tramo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <svg viewBox="0 0 1000 380" className="w-full h-full overflow-visible" aria-label="Plataformas de roles comerciales por etapa">
            <SceneDefs id="pip" isDark={isDark} />
            {plat.map(([x, y], i) => (
              <motion.polygon key={`b${i}`} points={`500,112 ${x - 40},${y - 30} ${x + 40},${y - 30}`} fill="url(#pip-brandv)" animate={{ opacity: i === active ? 0.22 : 0.05 }} transition={{ duration: 0.4 }} />
            ))}
            <Float amp={5} dur={3.2}>
              <g filter="url(#pip-sh)"><IsoBox cx={500} cy={60} s={38} h={30} f={PEACH} /></g>
              <text x={552} y={66} fontSize={15} fontWeight={800} fill={t.text}>Manager</text>
              <text x={552} y={84} fontSize={12} fill={t.muted}>orquesta y habilita · no apaga incendios</text>
            </Float>
            {plat.slice(0, -1).map(([x, y], i) => (
              <Traveler key={`p${i}`} id="pip" path={hop([x + 70, y - 20], [plat[i + 1][0] - 70, plat[i + 1][1] - 20], 45)} dur={1.8} delay={i * 0.6} repeatDelay={0.6} r={6} color={i % 2 ? PINK : ORANGE} />
            ))}
            {plat.map(([x, y], i) => {
              const on = i === active;
              const tk = stages[i].tokens;
              const xs = tk.length === 2 ? [x - 42, x + 42] : [x];
              return (
                <Lift key={i} on={on} dimmed={false} onClick={() => setActive(i)}>
                  <g filter="url(#pip-sh)"><IsoBox cx={x} cy={y} s={100} h={26} f={on ? BRAND : NEUTRAL(isDark)} /></g>
                  {xs.map((tx, k) => (
                    <Float key={k} amp={on ? 6 : 3} dur={2.6} delay={k * 0.3 + i * 0.2}>
                      <Persona id="pip" cx={tx} cy={y + 6} s={0.82} body={on ? BRAND : NEUTRAL(isDark)} accessory={PIP_ACC[tk[k]]} hair={PIP_HAIR[tk[k]]} />
                      <text x={tx} y={y + 24} textAnchor="middle" fontSize={11} fontWeight={800} fill={on ? ORANGE : t.muted}>{tk[k]}</text>
                    </Float>
                  ))}
                  <text x={x} y={y + 104} textAnchor="middle" fontSize={15} fontWeight={800} fill={on ? ORANGE : t.muted}>{stages[i].name}</text>
                </Lift>
              );
            })}
          </svg>
        </div>
        <div className="shrink-0 grid grid-cols-4 gap-2 mt-1">
          {stages.map((s, i) => <Pill key={s.name} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{s.name}</Pill>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`shrink-0 mt-3 p-4 rounded-2xl flex items-start gap-4 ${panelClass(isDark)}`}>
            <span className="shrink-0 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30">{st.roles}</span>
            <p className={`text-sm md:text-base leading-snug ${textMuted(isDark)}`}>{st.detail}</p>
          </motion.div>
        </AnimatePresence>
        <SiglasBar isDark={isDark} keys={['BDR', 'LGR', 'SDR', 'AE', 'PS', 'AM']} />
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. La pirámide rota (sólido 3D con el nivel táctico partido)        */
/* ------------------------------------------------------------------ */

function Piramide({ isDark }: SlideProps) {
  const levels = [
    { name: 'Nivel estratégico', who: 'Directores', text: 'Diseñados para pensar a largo plazo. Su visión y directrices se distorsionan antes de llegar a la base operativa.', color: '#475569' },
    { name: 'Nivel táctico — el cuello de botella', who: 'Mandos medios', text: 'Atrapados "apagando incendios", traduciendo cuotas jerárquicas y frenando la agilidad. Además consumen altos márgenes financieros (overhead).', color: ORANGE },
    { name: 'Nivel operativo', who: 'SDR y AE', text: 'Los ejecutores directos: quienes abren conversaciones (SDR) y quienes cierran negocios (AE). Históricamente aislados del contexto macro, bajo el paradigma de "hacen y no preguntan".', color: '#94a3b8' },
  ];
  const [active, setActive] = useState(1);
  const cx = 260;
  const s1 = 71, y1 = 135, s2 = 146, y2 = 235;
  const gap = active === 1 ? 12 : 6;
  return (
    <Shell isDark={isDark} title="El cuello de botella estructural:" highlight="la pirámide rota" subtitle="En el modelo vertical, la capa del medio filtra, frena y distorsiona lo que va de arriba abajo y de abajo arriba.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 520 470" className="w-full h-full max-h-[400px] overflow-visible" aria-label="Pirámide organizacional con el nivel táctico partido">
              <SceneDefs id="pyr" isDark={isDark} />
              <g filter="url(#pyr-sh)">
                <Lift on={active === 2} dimmed={active !== 2} onClick={() => setActive(2)} lift={6}>
                  <IsoFrustum cx={cx} y1={245} s1={154} y2={330} s2={217} f={NEUTRAL(isDark)} />
                </Lift>
                <Lift on={active === 1} dimmed={active !== 1} onClick={() => setActive(1)} lift={8}>
                  <motion.g animate={{ x: -gap, rotate: -2 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} style={{ transformOrigin: `${cx}px 190px` }}>
                    <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
                      <polygon points={`${cx - s1},${y1} ${cx},${y1 - s1 / 2} ${cx},${y1 + s1 / 2}`} fill={BRAND.top} />
                      <polygon points={`${cx - s1},${y1} ${cx},${y1 + s1 / 2} ${cx},${y2 + s2 / 2} ${cx - s2},${y2}`} fill={BRAND.left} />
                    </motion.g>
                  </motion.g>
                  <motion.g animate={{ x: gap, rotate: 2 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} style={{ transformOrigin: `${cx}px 190px` }}>
                    <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 2.1, repeat: Infinity, delay: 0.3 }}>
                      <polygon points={`${cx},${y1 - s1 / 2} ${cx + s1},${y1} ${cx},${y1 + s1 / 2}`} fill={BRAND.top} />
                      <polygon points={`${cx},${y1 + s1 / 2} ${cx + s1},${y1} ${cx + s2},${y2} ${cx},${y2 + s2 / 2}`} fill={BRAND.right} />
                    </motion.g>
                  </motion.g>
                </Lift>
                <Lift on={active === 0} dimmed={active !== 0} onClick={() => setActive(0)} lift={12}>
                  <IsoPyramid cx={cx} apex={40} y={125} s={64} f={SLATE(isDark)} />
                </Lift>
              </g>
            </svg>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            {levels.map((l, i) => (
              <motion.button key={l.name} whileHover={{ x: 4 }} onClick={() => setActive(i)} className={`text-left p-4 rounded-2xl border-l-4 transition-all ${i === active ? (isDark ? 'bg-[#2a2a2a] shadow-lg shadow-black/40' : 'bg-white shadow-lg shadow-gray-200/80') : 'bg-transparent opacity-60'}`} style={{ borderLeftColor: l.color }}>
                <p className={microLabel(isDark)}>{l.who}</p>
                <h3 className={`text-lg font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{l.name}</h3>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{l.text}</p>
              </motion.button>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>
          <strong>Insight:</strong> la estructura vertical frena los ciclos de retroalimentación y aleja la estrategia de donde ocurre el trabajo real: <strong>frente al cliente</strong>.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Delayering: torre jerárquica vs red orgánica                     */
/* ------------------------------------------------------------------ */

function MechanicalScene({ isDark }: { isDark: boolean }) {
  const n = NEUTRAL(isDark);
  const rows: { y: number; xs: number[]; s: number; h: number }[] = [
    { y: 32, xs: [200], s: 20, h: 16 },
    { y: 88, xs: [110, 200, 290], s: 16, h: 12 },
    { y: 144, xs: [55, 113, 171, 229, 287, 345], s: 13, h: 10 },
    { y: 198, xs: Array.from({ length: 10 }, (_, i) => 30 + i * 37.8), s: 10, h: 8 },
  ];
  const drops: [[number, number], [number, number], number][] = [
    [[200, 40], [110, 84], 0], [[200, 40], [290, 84], 0.3],
    [[110, 96], [55, 140], 1.3], [[290, 96], [345, 140], 1.6],
    [[55, 150], [30, 195], 2.6], [[345, 150], [370, 195], 2.9],
  ];
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full overflow-visible" aria-hidden="true">
      <SceneDefs id="mec" isDark={isDark} />
      <g filter="url(#mec-sh)">
        {rows.map((r, ri) => r.xs.map((x) => <IsoBox key={`${ri}-${x}`} cx={x} cy={r.y} s={r.s} h={r.h} f={ri === 0 ? BRAND : n} />))}
      </g>
      {drops.map(([a, b, d], i) => <Traveler key={i} id="mec" path={[a, b]} dur={1.4} delay={d} repeatDelay={3} r={3.5} />)}
    </svg>
  );
}

function OrganicScene({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  const pts: [number, number][] = [[80, 132], [120, 118], [96, 168], [140, 158], [64, 196], [118, 204], [182, 140], [214, 162], [244, 132], [196, 196], [240, 206], [158, 182], [292, 122], [326, 146], [352, 126], [302, 180], [338, 198], [270, 160]];
  const pairs: [number, number][] = [[0, 1], [1, 6], [6, 7], [7, 8], [8, 12], [12, 13], [13, 16], [15, 17], [9, 10], [3, 11], [2, 5], [4, 2], [11, 9], [17, 7]];
  const f = [BRAND, PEACH, NEUTRAL(isDark)];
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full overflow-visible" aria-hidden="true">
      <SceneDefs id="org" isDark={isDark} />
      <IsoFloor cx={205} cy={164} s={185} fill={t.floor} />
      {pts.map(([x, y], i) => (
        <Float key={i} amp={3} dur={2.4 + (i % 4) * 0.4} delay={i * 0.15}>
          <g filter="url(#org-sh)"><IsoBox cx={x} cy={y - 8} s={9} h={8} f={f[i % 3]} /></g>
        </Float>
      ))}
      {pairs.map(([a, b], i) => <Traveler key={i} id="org" path={[[pts[a][0], pts[a][1] - 12], [pts[b][0], pts[b][1] - 12]]} dur={0.9} delay={i * 0.22} repeatDelay={0.8} r={3} color={i % 2 ? PINK : ORANGE} />)}
      {[1, 8, 13, 9].map((k, i) => <Traveler key={`c${k}`} id="org" path={hop([205, 52], [pts[k][0], pts[k][1] - 12], 10)} dur={1.1} delay={0.4 + i * 0.5} repeatDelay={1.2} r={3.5} />)}
      <Float amp={5} dur={3}><Orb id="org" cx={205} cy={50} r={15} /></Float>
    </svg>
  );
}

function Delayering({ isDark }: SlideProps) {
  const models = [
    { title: 'El modelo mecánico', when: 'Ayer', Scene: MechanicalScene, points: ['Información lenta, de arriba hacia abajo, nivel por nivel.', 'Múltiples niveles de aprobación táctica.', 'Se basa en el control y la autoridad del título.'] },
    { title: 'El modelo orgánico', when: 'Hoy', Scene: OrganicScene, points: ['Retroalimentación inmediata frente al cliente.', 'La autoridad se desplaza a los márgenes, donde está el cliente.', 'Se basa en el empoderamiento y en sistemas autónomos.'] },
  ];
  return (
    <Shell isDark={isDark} title="La transición estructural:" highlight="aplanamiento (delayering)" subtitle="Quitar capas intermedias acelera la organización… solo si algo asume la coordinación que hacían.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {models.map((m, idx) => (
            <motion.div key={m.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`p-4 rounded-3xl flex flex-col min-h-0 ${idx === 1 ? (isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2418] shadow-lg shadow-black/40' : 'bg-gradient-to-br from-white to-orange-50 shadow-lg shadow-orange-200/50') : panelClass(isDark)}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{m.title}</h3>
                <span className={microLabel(isDark)}>{m.when}</span>
              </div>
              <div className="flex-1 min-h-0"><m.Scene isDark={isDark} /></div>
              <ul className={`mt-2 space-y-1 text-sm ${textMuted(isDark)}`}>
                {m.points.map((p) => <li key={p} className="flex gap-2"><ChevronRight size={16} className="text-[#ff851d] shrink-0 mt-0.5" />{p}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
        <Footer isDark={isDark}>
          <strong>Peligro estructural:</strong> eliminar la capa media sin instalar antes autogestión, metodologías ágiles y tecnología provoca <strong>parálisis operativa</strong>, burnout directivo y el "síndrome del superviviente".
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Graicunas: la matemática del caos                                */
/* ------------------------------------------------------------------ */

function RelScene({ kind, isDark }: { kind: 'simple' | 'grupal' | 'cruzada'; isDark: boolean }) {
  const t = sceneTone(isDark);
  const id = `rel-${kind}`;
  const subs: [number, number][] = [[40, 102], [85, 120], [135, 120], [180, 102]];
  const top = (p: [number, number]): [number, number] => [p[0], p[1] - 12];
  const pairs: [number, number][] = [];
  subs.forEach((_, i) => subs.forEach((__, j) => { if (j > i) pairs.push([i, j]); }));
  return (
    <svg viewBox="0 0 220 150" className="w-full h-full overflow-visible" aria-hidden="true">
      <SceneDefs id={id} isDark={isDark} />
      <IsoFloor cx={110} cy={110} s={102} fill={t.floor} />
      {kind === 'grupal' && [[62, 112], [158, 112]].map(([x, y], i) => (
        <motion.g key={i} animate={{ opacity: [0.25, 0.6, 0.25] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
          <IsoFloor cx={x} cy={y} s={42} fill={ORANGE} opacity={0.5} />
        </motion.g>
      ))}
      <g filter={`url(#${id}-sh)`}>
        {subs.map(([x, y], i) => <IsoBox key={i} cx={x} cy={y - 10} s={14} h={10} f={NEUTRAL(isDark)} />)}
      </g>
      {subs.map((p, i) => <Traveler key={`m${i}`} id={id} path={[[110, 34], top(p)]} dur={1.4} delay={i * 0.35} repeatDelay={0.5} r={3} />)}
      {kind === 'grupal' && ([[62, 100], [158, 100]] as [number, number][]).map((p, i) => <Traveler key={`g${i}`} id={id} path={[[110, 34], p]} dur={1.2} delay={0.2 + i * 0.6} repeatDelay={0.6} r={4} color={PINK} />)}
      {kind === 'cruzada' && pairs.flatMap(([a, b], i) => [
        <Traveler key={`x${i}`} id={id} path={hop(top(subs[a]), top(subs[b]), 22)} dur={0.8} delay={i * 0.17} repeatDelay={0.3} r={2.8} color={PINK} />,
        <Traveler key={`y${i}`} id={id} path={hop(top(subs[b]), top(subs[a]), 10)} dur={0.9} delay={0.4 + i * 0.13} repeatDelay={0.3} r={2.4} color={ORANGE} />,
      ])}
      <motion.g animate={kind === 'cruzada' ? { x: [-1.5, 1.5, -1.5] } : { y: [0, -3, 0] }} transition={{ duration: kind === 'cruzada' ? 0.25 : 2.6, repeat: Infinity }}>
        <Orb id={id} cx={110} cy={26} r={11} />
      </motion.g>
    </svg>
  );
}

function Graicunas({ isDark }: SlideProps) {
  const [n, setN] = useState(5);
  const R = n * (Math.pow(2, n - 1) + n - 1);
  const kinds = [
    { kind: 'simple' as const, title: 'Relaciones simples', text: 'Uno a uno entre gerente y subordinado. Manejable de forma natural.' },
    { kind: 'grupal' as const, title: 'Relaciones grupales', text: 'Coordinar combinaciones del mismo equipo dispara la complejidad.' },
    { kind: 'cruzada' as const, title: 'Relaciones cruzadas', text: 'Caos estructural: supervisar las interacciones de todos contra todos.' },
  ];
  return (
    <Shell isDark={isDark} title="La matemática del caos:" highlight="Graicunas y el tramo de control" subtitle="Agregar una persona no suma una tarea: multiplica las relaciones que el líder debe coordinar.">
      <div className="h-full flex flex-col gap-4 min-h-0">
        <div className="shrink-0 grid grid-cols-3 gap-3">
          {kinds.map((k) => (
            <div key={k.kind} className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
              <div className="h-24"><RelScene kind={k.kind} isDark={isDark} /></div>
              <p className={`text-sm font-black mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{k.title}</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{k.text}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`p-5 rounded-3xl flex flex-col justify-center ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Fórmula de Graicunas</p>
            <p className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>R = n · (2<sup>n−1</sup> + n − 1)</p>
            <p className={`text-xs mb-3 ${textMuted(isDark)}`}><strong>n</strong>: reportes directos · <strong>R</strong>: relaciones totales (simples + grupales + cruzadas).</p>
            <label className={`${microLabel(isDark)} mb-1 block`}>Reportes directos: <span className="text-[#ff851d] text-sm">{n}</span></label>
            <input type="range" min={2} max={12} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-[#ff851d] mb-3" />
            <div className="flex gap-2">
              {[3, 5, 10].map((p) => <Pill key={p} isDark={isDark} on={n === p} onClick={() => setN(p)}>n = {p}</Pill>)}
            </div>
          </div>
          <div className={`p-5 rounded-3xl flex flex-col items-center justify-center text-center ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2418] shadow-lg shadow-black/40' : 'bg-gradient-to-br from-orange-50 to-rose-50 shadow-lg shadow-orange-200/50'}`}>
            <p className={microLabel(isDark)}>Relaciones a coordinar</p>
            <AnimatePresence mode="wait">
              <motion.p key={R} initial={{ opacity: 0, scale: 0.7, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.2 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                {R.toLocaleString('es')}
              </motion.p>
            </AnimatePresence>
            <p className={`mt-2 text-sm leading-snug ${textMuted(isDark)}`}>
              3 reportes = 18 · 5 = 100 · 10 = <strong>5.210</strong>. Sin automatización, el límite humano de supervisión directa se rompe entre <strong>6 y 8 personas</strong>.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Sales Pods: plataforma circular con la meta al centro            */
/* ------------------------------------------------------------------ */

function PodScene({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  const c = { x: 200, y: 212 };
  const at = (deg: number): [number, number] => [c.x + 118 * Math.cos((deg * Math.PI) / 180), c.y + 46 * Math.sin((deg * Math.PI) / 180)];
  const roles = [
    { deg: 205, k: 'SDR', l: '2 · Generación' },
    { deg: 335, k: 'AE', l: '3-4 · Cierre' },
    { deg: 155, k: 'PS', l: '1 · Pre-Sales' },
    { deg: 25, k: 'AM', l: '1 · Retención' },
  ];
  const token = (r: (typeof roles)[number], i: number) => {
    const [x, y] = at(r.deg);
    return (
      <Float key={r.k} amp={4} dur={2.8} delay={i * 0.35}>
        <ellipse cx={x} cy={y + 2} rx={22} ry={7} fill="#000" opacity={0.18} />
        <Orb id="pod" cx={x} cy={y - 28} r={28} neutral={i % 2 === 1} />
        <text x={x} y={y - 23} textAnchor="middle" fontSize={14} fontWeight={800} fill={i % 2 === 1 ? t.text : '#fff'}>{r.k}</text>
        <text x={x} y={y + 18} textAnchor="middle" fontSize={11} fontWeight={700} fill={t.muted}>{r.l}</text>
      </Float>
    );
  };
  return (
    <svg viewBox="0 0 400 330" className="w-full h-full overflow-visible" aria-label="Sales Pod: cuatro roles alrededor de una meta de ingresos unificada">
      <SceneDefs id="pod" isDark={isDark} />
      <g filter="url(#pod-sh)"><Cylinder cx={c.x} cy={c.y} rx={172} ry={72} h={22} top={t.floor} side={t.floorSide} /></g>
      {roles.map((r, i) => { const [x, y] = at(r.deg); return <Traveler key={`p${r.k}`} id="pod" path={hop([x, y - 28], [200, 158], 25)} dur={1.6} delay={i * 0.4} repeatDelay={0.4} r={5} color={ORANGE} />; })}
      {roles.slice(0, 2).map(token)}
      <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} filter="url(#pod-sh)">
        <Cylinder cx={200} cy={168} rx={46} ry={19} h={50} top="#ffb27a" side="url(#pod-brand)" />
      </motion.g>
      <text x={200} y={124} textAnchor="middle" fontSize={14} fontWeight={900} fill={ORANGE}>Meta de ingresos</text>
      <text x={200} y={141} textAnchor="middle" fontSize={14} fontWeight={900} fill={ORANGE}>unificada</text>
      {roles.slice(2).map((r, i) => token(r, i + 2))}
    </svg>
  );
}

function Pods({ isDark }: SlideProps) {
  const blocks = [
    { title: 'El fin de la línea de ensamblaje', text: 'Las cuentas dejan de saltar de un silo a otro. El Pod retiene el contexto del cliente de principio a fin y elimina la fricción y las culpas cruzadas.' },
    { title: 'Autonomía y objetivo compartido', text: 'Todos los roles, técnicos y comerciales, se miden con el mismo KPI consolidado. Ya no hace falta un gerente que actúe como árbitro.' },
  ];
  return (
    <Shell isDark={isDark} title="La nueva arquitectura:" highlight="escuadrones (Sales Pods)" subtitle="Una célula multifuncional que funciona como una micro-empresa autónoma con una sola meta de ingresos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[44%] min-h-0 flex items-center justify-center"><PodScene isDark={isDark} /></div>
        <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
          {blocks.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className={`p-4 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a]' : 'bg-orange-50'}`}>
              <h3 className={`text-lg font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{b.title}</h3>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{b.text}</p>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Caso de referencia</p>
            <h3 className={`text-lg font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Pods de Globant</h3>
            <p className={`text-sm leading-snug mb-3 ${textMuted(isDark)}`}>Células que orquestan agentes de IA bajo supervisión humana y <strong>cobran por valor entregado, no por horas</strong>.</p>
            <div className="grid grid-cols-3 gap-2">
              {[['45%', 'de sus 20 cuentas top'], ['+10 pp', 'de margen bruto'], ['+140', 'LLMs en bóvedas privadas']].map(([v, l]) => (
                <div key={v} className={`p-2 rounded-xl text-center ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                  <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{v}</p>
                  <p className={`text-[11px] leading-tight ${textMuted(isDark)}`}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>
        <SiglasBar isDark={isDark} keys={['SDR', 'AE', 'PS', 'AM']} />
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 10. La crisis del Ramp Time (valle de la muerte, áreas rellenas)    */
/* ------------------------------------------------------------------ */

const RAMP_PATH = 'M50 140 C 90 262, 210 272, 262 140 C 314 8, 430 52, 500 42';

function RampScene({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  const x = (m: number) => 50 + m * 37.5;
  return (
    <svg viewBox="0 0 520 300" className="w-full h-full overflow-visible" aria-label="Curva de retorno económico de un vendedor nuevo en el tiempo">
      <SceneDefs id="rmp" isDark={isDark} />
      <defs>
        <linearGradient id="rmp-neg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={PINK} stopOpacity={0.25} /><stop offset="100%" stopColor={PINK} stopOpacity={0.95} /></linearGradient>
        <linearGradient id="rmp-pos" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.95} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.25} /></linearGradient>
        <clipPath id="rmp-clip"><motion.rect x={40} y={0} height={300} initial={{ width: 0 }} animate={{ width: 480 }} transition={{ duration: 1.8, ease: 'easeInOut' }} /></clipPath>
      </defs>
      <rect x={50} y={138} width={455} height={4} rx={2} fill={t.floorSide} />
      <g clipPath="url(#rmp-clip)" filter="url(#rmp-sh)">
        <path d="M50 140 C 90 262, 210 272, 262 140 Z" fill="url(#rmp-neg)" />
        <path d="M262 140 C 314 8, 430 52, 500 42 L500 140 Z" fill="url(#rmp-pos)" />
      </g>
      <circle r={8} fill="url(#rmp-orb)" filter="url(#rmp-gl)">
        <animateMotion dur="5s" repeatCount="indefinite" path={RAMP_PATH} />
      </circle>
      {[0, 3, 6, 9, 12].map((m) => <text key={m} x={x(m)} y={160} textAnchor="middle" fontSize={11} fontWeight={700} fill={t.muted}>{m}</text>)}
      <text x={500} y={178} textAnchor="end" fontSize={11} fill={t.muted}>Tiempo (meses)</text>
      <text x={22} y={150} fontSize={11} fill={t.muted} transform="rotate(-90 22 150)" textAnchor="middle">Retorno económico</text>
      <text x={155} y={290} textAnchor="middle" fontSize={13} fontWeight={900} fill={PINK}>Valle de la muerte</text>
      <text x={155} y={222} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">salario + cuentas quemadas</text>
      <text x={400} y={28} textAnchor="middle" fontSize={13} fontWeight={900} fill="#10b981">Productividad plena</text>
      <text x={410} y={110} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">cuota alcanzada</text>
    </svg>
  );
}

function Ramp({ isDark }: SlideProps) {
  const stats = [
    ['6,2 meses', 'Tiempo promedio para que un AE alcance el 100% de su cuota de forma consistente.'],
    ['3,0 meses', 'Rampa promedio para estabilizar los roles de generación inicial (SDR).'],
    ['53% de brecha', 'Distancia entre el proceso que la empresa cree tener y lo que el vendedor ejecuta bajo presión frente al cliente.'],
  ];
  return (
    <Shell isDark={isDark} title="La crisis del Ramp Time y la" highlight="brecha de ejecución" subtitle="Mientras un vendedor nuevo aprende, la empresa invierte en él sin recibir retorno: ese tramo es el «valle de la muerte».">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className={`lg:w-[60%] min-h-0 p-4 rounded-3xl ${panelClass(isDark)}`}><RampScene isDark={isDark} /></div>
          <div className="lg:w-[40%] flex flex-col gap-3 justify-center">
            {stats.map(([v, l], i) => (
              <motion.div key={v} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.12 }} className={`p-4 rounded-2xl ${i === 2 ? (isDark ? 'bg-[#ef375c]/15' : 'bg-rose-50') : panelClass(isDark)}`}>
                <p className={`text-2xl font-black ${i === 2 ? 'text-[#ef375c]' : isDark ? 'text-white' : 'text-gray-900'}`}>{v}</p>
                <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{l}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>
          Durante el Ramp Time el talento es un centro de costos. En una organización plana, comprimir esta curva <strong>no es una optimización: es supervivencia financiera</strong>.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Habilitación ≠ capacitación                                     */
/* ------------------------------------------------------------------ */

function Enablement({ isDark }: SlideProps) {
  const ramp = [
    { role: 'SDR / BDR', time: '2 – 3 meses', first: '1ª reunión: 3-6 semanas', w: 25 },
    { role: 'AE Mid-Market', time: '4 – 6 meses', first: '1er negocio: 6-10 semanas', w: 50 },
    { role: 'AE Enterprise', time: '7 – 12 meses', first: '1er negocio: 3-4 meses', w: 100 },
  ];
  return (
    <Shell isDark={isDark} title="Habilitación no es" highlight="capacitación" subtitle="Un evento aislado no mueve la aguja; un sistema continuo dentro del trabajo diario, sí.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className={`p-6 rounded-3xl flex flex-col justify-center ${panelClass(isDark)}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Capacitación tradicional</p>
            <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Un evento</h3>
            <ul className={`space-y-2 text-sm md:text-base ${textMuted(isDark)}`}>
              <li className="flex gap-2"><ChevronRight size={18} className="text-gray-400 shrink-0 mt-0.5" />Aislada, teórica e intermitente: se concentra en el onboarding.</li>
              <li className="flex gap-2"><ChevronRight size={18} className="text-gray-400 shrink-0 mt-0.5" />Consumir manuales en PDF y presentaciones que se olvidan pronto.</li>
              <li className="flex gap-2"><ChevronRight size={18} className="text-gray-400 shrink-0 mt-0.5" />Depende de un gerente con poco tiempo para acompañar.</li>
            </ul>
          </div>
          <div className={`p-6 rounded-3xl flex flex-col justify-center ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2418] shadow-lg shadow-black/40' : 'bg-gradient-to-br from-orange-50 to-rose-50 shadow-lg shadow-orange-200/50'}`}>
            <p className={`${microLabel(isDark)} mb-1`}>Sales Enablement</p>
            <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Un sistema continuo</h3>
            <ul className={`space-y-2 text-sm md:text-base ${textMuted(isDark)}`}>
              <li className="flex gap-2"><ChevronRight size={18} className="text-[#ff851d] shrink-0 mt-0.5" />Integra contenido, tecnología, procesos y coaching en el flujo diario.</li>
              <li className="flex gap-2"><ChevronRight size={18} className="text-[#ff851d] shrink-0 mt-0.5" />Práctica iterativa que elimina la fricción operativa (<em>seller drag</em>).</li>
              <li className="flex gap-2"><ChevronRight size={18} className="text-[#ff851d] shrink-0 mt-0.5" />Su métrica reina es el Ramp Time: cuánto tardas en ser productivo.</li>
            </ul>
          </div>
        </div>
        <div className={`shrink-0 mt-4 p-4 rounded-2xl ${panelClass(isDark)}`}>
          <p className={`${microLabel(isDark)} mb-2`}>Ramp Time de referencia hasta la cuota completa</p>
          <div className="flex flex-col gap-2">
            {ramp.map((r, i) => (
              <div key={r.role} className="flex items-center gap-3">
                <span className={`w-28 shrink-0 text-xs font-bold ${textMuted(isDark)}`}>{r.role}</span>
                <div className={`flex-1 h-3 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-[0_0_12px_rgba(255,133,29,0.5)]" initial={{ width: 0 }} animate={{ width: `${r.w}%` }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: 'easeOut' }} />
                </div>
                <span className="w-24 shrink-0 text-sm font-black text-[#ff851d]">{r.time}</span>
                <span className={`hidden md:block w-40 shrink-0 text-[11px] ${textMuted(isDark)}`}>{r.first}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Práctica simulada con IA (curvas en áreas rellenas)             */
/* ------------------------------------------------------------------ */

const S_ACTIVE = 'M45 255 C 150 255, 165 55, 400 45';
const S_TRAD = 'M45 255 Q 210 170 400 132';

function SCurveScene({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  const grey = isDark ? '#9ca3af' : '#6b7280';
  return (
    <svg viewBox="0 0 420 290" className="w-full h-full overflow-visible" aria-label="Curva de aprendizaje: habilitación activa con IA frente a onboarding tradicional">
      <SceneDefs id="scv" isDark={isDark} />
      <defs>
        <linearGradient id="scv-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={ORANGE} stopOpacity={0.95} /><stop offset="100%" stopColor={PINK} stopOpacity={0.2} /></linearGradient>
        <linearGradient id="scv-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={grey} stopOpacity={0.85} /><stop offset="100%" stopColor={grey} stopOpacity={0.15} /></linearGradient>
        <clipPath id="scv-clip"><motion.rect x={40} y={0} height={290} initial={{ width: 0 }} animate={{ width: 380 }} transition={{ duration: 1.8, ease: 'easeInOut' }} /></clipPath>
      </defs>
      <rect x={45} y={253} width={360} height={4} rx={2} fill={t.floorSide} />
      <g clipPath="url(#scv-clip)" filter="url(#scv-sh)">
        <path d={`${S_ACTIVE} L400 255 Z`} fill="url(#scv-a)" />
        <path d={`${S_TRAD} L400 255 Z`} fill="url(#scv-t)" />
      </g>
      <circle r={8} fill="url(#scv-orb)" filter="url(#scv-gl)"><animateMotion dur="3s" repeatCount="indefinite" path={S_ACTIVE} /></circle>
      <circle r={7} fill="url(#scv-orbn)" filter="url(#scv-gl)"><animateMotion dur="6s" repeatCount="indefinite" path={S_TRAD} /></circle>
      <text x={250} y={34} fontSize={13} fontWeight={900} fill={ORANGE}>Habilitación activa + IA</text>
      <text x={262} y={196} fontSize={12} fontWeight={800} fill={isDark ? '#e5e7eb' : '#374151'}>Onboarding tradicional</text>
      <text x={228} y={280} textAnchor="middle" fontSize={11} fill={t.muted}>Volumen de práctica / tiempo</text>
      <text x={22} y={150} fontSize={11} fill={t.muted} transform="rotate(-90 22 150)" textAnchor="middle">Memoria muscular</text>
    </svg>
  );
}

function IARoleplay({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Compresión radical mediante" highlight="práctica simulada" subtitle="De la teoría a la memoria muscular: practicar contra compradores virtuales antes de tocar una cuenta real.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className={`lg:w-[46%] min-h-0 p-4 rounded-3xl ${panelClass(isDark)}`}><SCurveScene isDark={isDark} /></div>
        <div className="lg:w-[54%] flex flex-col gap-3 min-h-0 justify-center">
          <div className={`p-4 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a]' : 'bg-orange-50'}`}>
            <h3 className={`text-lg font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>El fin del shadowing gerencial</h3>
            <p className={`text-sm leading-snug ${textMuted(isDark)}`}>
              Un gerente sobrecargado audita <strong>5-10 llamadas al mes</strong>. Con simuladores de IA <em>voice-first</em>, el vendedor enfrenta <strong>50-100 escenarios</strong> con sesgos y objeciones dinámicas en sus primeras 2 semanas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat isDark={isDark} icon={BarChart3} value="49%" label="logro de cuota con habilitación continua" hint="frente a 15% con el método tradicional." />
            <Stat isDark={isDark} icon={Zap} value="57%" label="logro de cuota con IA en el flujo" hint="frente a 39% en equipos sin IA." />
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 13. El gerente silencioso: torre de 4 capas sincronizada            */
/* ------------------------------------------------------------------ */

function SilentManager({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const pillars = [
    { n: '01', title: 'Perfil de Cliente Ideal (ICP)', text: 'Claridad matemática sobre tamaño, facturación, verticales y roles a prospectar.', why: 'Evita que el equipo actúe a ciegas y pierda horas en leads inviables.' },
    { n: '02', title: 'Criterios de Discovery', text: 'Cadenas de preguntas estructuradas (SPIN, MEDDPICC) para extraer la verdad del cliente.', why: 'Identifica dolores reales, decisores y presupuesto desde la primera llamada.' },
    { n: '03', title: 'Reglas de Workflow', text: 'Etapas del embudo documentadas en el CRM, sin ambigüedad.', why: 'Define qué acciones exactas se completan para avanzar cada oportunidad.' },
    { n: '04', title: 'Battlecards y SOPs', text: 'Respuestas listas a objeciones y procedimientos entre áreas (ej. SLA legal de 24 h).', why: 'Resuelve sin escalar a un jefe: plantillas y reglas pre-aprobadas.' },
  ];
  const [active, setActive] = useState(0);
  return (
    <Shell isDark={isDark} title="El gerente silencioso:" highlight="playbooks y SOPs" subtitle="Si quitamos la supervisión humana directa, el conocimiento documentado asume el mando táctico.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[30%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 280 330" className="w-full h-full max-h-[360px] overflow-visible" aria-label="Torre de cuatro capas del playbook">
              <SceneDefs id="sil" isDark={isDark} />
              {pillars.map((p, i) => {
                const cy = 238 - i * 40;
                const on = i === active;
                return (
                  <motion.g key={p.n} animate={{ x: on ? -18 : 0, y: on ? 9 : 0 }} transition={{ type: 'spring', stiffness: 140, damping: 15 }} onClick={() => setActive(i)} style={{ cursor: 'pointer' }} filter="url(#sil-sh)">
                    <IsoBox cx={140} cy={cy} s={92} h={30} f={on ? BRAND : NEUTRAL(isDark)} />
                    <text x={94} y={cy + 47} textAnchor="middle" fontSize={15} fontWeight={900} fill={on ? '#fff' : t.text}>{p.n}</text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
            {pillars.map((p, i) => (
              <motion.button key={p.n} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} whileHover={{ y: -3 }} className={`text-left p-4 rounded-3xl transition-colors ${i === active ? (isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2418] shadow-lg shadow-black/40' : 'bg-gradient-to-br from-white to-orange-50 shadow-lg shadow-orange-200/60') : panelClass(isDark)}`}>
                <span className={`text-2xl font-black ${i === active ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]' : isDark ? 'text-gray-500' : 'text-gray-300'}`}>{p.n}</span>
                <h3 className={`text-base font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                <p className={`text-sm leading-snug mb-1.5 ${textMuted(isDark)}`}>{p.text}</p>
                <p className={`text-xs leading-snug ${isDark ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-black uppercase tracking-wider text-[10px] text-[#ff851d]">Para qué · </span>{p.why}</p>
              </motion.button>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>
          <strong className="text-[#ff851d]">MEDDPICC</strong> · Metrics · Economic Buyer · Decision Criteria · Decision Process · Paper Process · Implicate the Pain · Champion · Competition
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Orquestación tecnológica: el CRM como núcleo                    */
/* ------------------------------------------------------------------ */

function HubScene({ isDark }: { isDark: boolean }) {
  const t = sceneTone(isDark);
  const side = (x: number, title: string, tools: string, desc: string, delay: number) => (
    <g>
      <text x={x} y={82} textAnchor="middle" fontSize={16} fontWeight={900} fill={t.text}>{title}</text>
      <text x={x} y={102} textAnchor="middle" fontSize={14} fontWeight={800} fill={ORANGE}>{tools}</text>
      <Float amp={5} dur={3.2} delay={delay}>
        <g filter="url(#hub-sh)"><IsoBox cx={x} cy={160} s={66} h={50} f={PEACH} /></g>
      </Float>
      <text x={x} y={276} textAnchor="middle" fontSize={12} fill={t.muted}>{desc}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 900 300" className="w-full h-full overflow-visible" aria-label="El CRM como núcleo conectado a automatización e inteligencia de conversaciones">
      <SceneDefs id="hub" isDark={isDark} />
      {side(170, 'Extracción y enrutamiento', 'Zapier · LeadIQ', 'Enriquecen perfiles y llenan cadencias sin clics', 0)}
      {side(730, 'Inteligencia de conversaciones', 'Fireflies · Gong', 'Graban, transcriben y auditan cada llamada', 0.5)}
      {[0, 1, 2].map((i) => <Traveler key={`l${i}`} id="hub" path={hop([240, 180], [360, 170], 30)} dur={1.5} delay={i * 0.5} r={6} color={ORANGE} />)}
      {[0, 1, 2].map((i) => <Traveler key={`r${i}`} id="hub" path={hop([660, 180], [540, 170], 30)} dur={1.5} delay={0.25 + i * 0.5} r={6} color={PINK} />)}
      <PulseDisc cx={450} cy={232} rx={170} ry={60} dur={3} peak={0.18} />
      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3.4, repeat: Infinity }}>
        <g filter="url(#hub-sh)"><IsoBox cx={450} cy={130} s={96} h={72} f={BRAND} /></g>
        <text x={450} y={138} textAnchor="middle" fontSize={26} fontWeight={900} fill="#fff">CRM</text>
      </motion.g>
      <text x={450} y={48} textAnchor="middle" fontSize={15} fontWeight={900} fill={t.text}>Única fuente de verdad</text>
    </svg>
  );
}

function Stack({ isDark }: SlideProps) {
  const crms = [['Salesforce', 'Enterprise'], ['HubSpot', 'Mid-Market'], ['Pipedrive', 'Pymes'], ['Monday', 'Equipos planos']];
  return (
    <Shell isDark={isDark} title="Orquestación tecnológica:" highlight="el tejido conectivo" subtitle="El CRM obliga a cumplir el proceso y da visibilidad total sin microgestión; lo demás alimenta al núcleo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0"><HubScene isDark={isDark} /></div>
        <div className="shrink-0 mt-2">
          <p className={`${microLabel(isDark)} mb-2 text-center`}>Qué CRM según el tamaño de la empresa</p>
          <div className="grid grid-cols-4 gap-2">
            {crms.map(([n, fit], i) => (
              <motion.div key={n} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }} whileHover={{ y: -3 }} className={`p-2.5 rounded-2xl text-center ${panelClass(isDark)}`}>
                <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{n}</p>
                <p className="text-xs font-semibold text-[#ff851d]">{fit}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>
          La tecnología orquesta las relaciones cruzadas: <strong>el software absorbe la carga táctica</strong> y le devuelve a la dirección su ancho de banda estratégico.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Rituales de autogestión: tres estaciones en una plataforma      */
/* ------------------------------------------------------------------ */

function Agile({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const rituals = [
    { key: 'sprint', label: 'Sprint', pos: [160, 126] as [number, number], title: 'Sprints de ventas', text: 'Ciclos innegociables de 1 a 3 semanas. El propio equipo audita el backlog, elige las cuentas de mayor valor y define su ruta de abordaje sin esperar una directriz de arriba.' },
    { key: 'daily', label: 'Daily', pos: [248, 190] as [number, number], title: 'Daily stand-up', text: 'Máximo 15 minutos, de pie. Sirve para exponer fricciones cruzadas y eliminar bloqueos entre pares: ¿qué hice?, ¿qué haré?, ¿qué me bloquea?' },
    { key: 'retro', label: 'Retro', pos: [72, 190] as [number, number], title: 'Retrospectiva: el motor de alineación', text: 'Al cierre del Sprint, el equipo analiza métricas y tableros y responde: ¿qué empezamos a hacer?, ¿qué detenemos?, ¿qué continuamos? La autocrítica suplanta la corrección del gerente.' },
  ];
  const fases = ['Introducción', 'Revisión de datos', 'Lluvia de ideas', 'Priorización', 'Plan de acción', 'Cierre'];
  const [active, setActive] = useState('sprint');
  const r = rituals.find((x) => x.key === active) || rituals[0];
  const loop: [number, number][] = [...rituals.map((x) => [x.pos[0], x.pos[1] - 34] as [number, number]), [rituals[0].pos[0], rituals[0].pos[1] - 34]];
  return (
    <Shell isDark={isDark} title="Rituales de autogestión:" highlight="agilidad en ventas" subtitle="Ciclos cortos y una revisión honesta al final de cada uno reemplazan a la microgestión. Toca cada estación.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[42%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 320 290" className="w-full h-full max-h-[360px] overflow-visible" aria-label="Ciclo ágil: Sprint, Daily y Retrospectiva">
              <SceneDefs id="agi" isDark={isDark} />
              <g filter="url(#agi-sh)"><Cylinder cx={160} cy={172} rx={142} ry={62} h={16} top={t.floor} side={t.floorSide} /></g>
              <text x={160} y={186} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>Mejora continua</text>
              {rituals.map((x) => {
                const on = x.key === active;
                return (
                  <Lift key={x.key} on={on} dimmed={false} onClick={() => setActive(x.key)}>
                    <g filter="url(#agi-sh)"><IsoBox cx={x.pos[0]} cy={x.pos[1] - 12} s={40} h={18} f={on ? BRAND : NEUTRAL(isDark)} /></g>
                    <text x={x.pos[0]} y={x.pos[1] - 52} textAnchor="middle" fontSize={14} fontWeight={900} fill={on ? ORANGE : t.text}>{x.label}</text>
                  </Lift>
                );
              })}
              <motion.circle r={9} fill="url(#agi-orb)" filter="url(#agi-gl)"
                initial={{ cx: loop[0][0], cy: loop[0][1] }}
                animate={{ cx: loop.map((p) => p[0]), cy: loop.map((p) => p[1]) }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
            </svg>
          </div>
          <div className="lg:w-[58%] flex flex-col justify-center gap-3">
            <div className="flex gap-2">
              {rituals.map((x) => <Pill key={x.key} isDark={isDark} on={x.key === active} onClick={() => setActive(x.key)}>{x.label}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={r.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`p-5 rounded-3xl ${panelClass(isDark)}`}>
                <h3 className={`text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.title}</h3>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`}>{r.text}</p>
                {r.key === 'retro' && (
                  <div className="mt-3">
                    <p className={`${microLabel(isDark)} mb-1.5`}>Protocolo de 6 fases</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fases.map((f, i) => (
                        <span key={f} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300' : 'bg-gray-100 text-gray-600'}`}><span className="text-[#ff851d] font-black">{i + 1}</span> {f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>
          La agilidad democratiza la mejora continua: el equipo ajusta el rumbo con <strong>evidencia del mercado</strong>, no con jerarquía.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 16. Mapa de ruta estructural: escalera de bloques                   */
/* ------------------------------------------------------------------ */

function Roadmap({ isDark }: SlideProps) {
  const phases = [
    { name: 'Fase 1 · MVP', short: 'MVP', tag: 'Startup temprana', f: NEUTRAL(isDark), color: '#64748b', h: 45, points: ['1 o 2 personas asumen todos los roles de generación y cierre a la vez.', 'Objetivo: validar el modelo de negocio con evidencia.', 'Redactar los primeros playbooks base: documentar lo que funciona.'] },
    { name: 'Fase 2 · Tracción', short: 'Tracción', tag: 'Escalamiento inicial', f: PEACH, color: ORANGE, h: 95, points: ['Hito: más de 60 a 80 cuentas cerradas por año.', 'Separación estricta de SDR (apertura) y AE (cierre).', 'CRM centralizado y rutinas Inbound/Outbound bien delimitadas.'] },
    { name: 'Fase 3 · Enterprise', short: 'Enterprise', tag: 'Agilidad podular', f: BRAND, color: PINK, h: 145, points: ['Transición completa a Sales Pods: células cerradas y autónomas.', 'Aplanamiento intencional: se eliminan mandos medios tácticos.', 'IA conversacional integrada para la habilitación continua.'] },
  ];
  const [active, setActive] = useState(1);
  const ph = phases[active];
  return (
    <Shell isDark={isDark} title="Mapa de ruta estructural:" highlight="evolución por tamaño" subtitle="La arquitectura del equipo se construye por etapas: cada fase gana el derecho a la siguiente.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex items-center">
            <svg viewBox="0 0 520 340" className="w-full h-full overflow-visible" aria-label="Escalera de tres fases de crecimiento del equipo comercial">
              <SceneDefs id="rdm" isDark={isDark} />
              {phases.map((p, i) => {
                const gx = 110 + i * 150;
                const gy = 285 - i * 30;
                const cy = gy - p.h;
                const on = i === active;
                return (
                  <motion.g key={p.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, type: 'spring', stiffness: 90, damping: 14 }}>
                    <Lift on={on} dimmed={!on} onClick={() => setActive(i)} lift={8}>
                      <g filter="url(#rdm-sh)"><IsoBox cx={gx} cy={cy} s={70} h={p.h} f={p.f} /></g>
                      <text x={gx - 35} y={cy + 22 + p.h / 2} textAnchor="middle" fontSize={13} fontWeight={900} fill="#fff">{p.short}</text>
                    </Lift>
                    {on && (
                      <motion.g animate={{ y: [0, -16, 0] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}>
                        <Orb id="rdm" cx={gx} cy={cy - 30} r={13} />
                      </motion.g>
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col justify-center gap-3">
            <div className="flex gap-2">
              {phases.map((p, i) => <Pill key={p.name} isDark={isDark} on={i === active} onClick={() => setActive(i)}>{p.short}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className={`p-5 rounded-3xl border-l-4 ${isDark ? 'bg-[#2a2a2a] shadow-lg shadow-black/40' : 'bg-white shadow-lg shadow-gray-200/80'}`} style={{ borderLeftColor: ph.color }}>
                <p className={microLabel(isDark)}>{ph.tag}</p>
                <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{ph.name}</h3>
                <ul className={`space-y-2 text-sm md:text-base ${textMuted(isDark)}`}>
                  {ph.points.map((p) => <li key={p} className="flex gap-2"><CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: ph.color }} />{p}</li>)}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
        <Footer isDark={isDark}>
          <strong>Pensamiento final:</strong> la arquitectura óptima no apila más personas en organigramas verticales; diseña ecosistemas donde el talento ejecuta con autonomía y <strong>sin fricción jerárquica</strong>.
        </Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 17. Cierre                                                          */
/* ------------------------------------------------------------------ */

function Cierre({ isDark }: SlideProps) {
  const chips = ['Roles especializados', 'Estructura orgánica', 'Sales Pods', 'Playbooks y SOPs', 'Habilitación con IA', 'Rituales ágiles'];
  const heights = [40, 60, 82, 106, 132, 160];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#121212] border border-[#2a2a2a]' : 'bg-[#f8f9fa] border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 560 200" className="w-full max-w-md mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="cie" isDark={isDark} />
        {heights.map((h, i) => (
          <motion.g key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, type: 'spring', stiffness: 90, damping: 13 }}>
            <Float amp={4} dur={3} delay={i * 0.25}>
              <g filter="url(#cie-sh)"><IsoBox cx={80 + i * 80} cy={185 - h} s={30} h={h} f={i < 2 ? NEUTRAL(isDark) : i < 4 ? PEACH : BRAND} /></g>
            </Float>
          </motion.g>
        ))}
        <motion.g animate={{ y: [0, -14, 0] }} transition={{ duration: 1.2, repeat: Infinity }}><Orb id="cie" cx={480} cy={-2} r={13} /></motion.g>
      </svg>
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold text-[#ff851d] z-10">Síntesis</p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter z-10 max-w-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
        De la pirámide jerárquica a un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">motor autogestionado</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-3xl mb-6 z-10">
        {chips.map((c) => (
          <span key={c} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300 shadow-lg shadow-black/40' : 'bg-white text-gray-700 shadow-md shadow-gray-200'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`max-w-3xl text-base md:text-xl font-medium leading-relaxed z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        Diseñar un equipo no es dibujar un organigrama: es construir un sistema <strong>predecible, escalable y de alto rendimiento</strong>, sostenido por método, datos y tecnología en lugar de capas de supervisión.
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 20. Test nivel principiante                                         */
/* ------------------------------------------------------------------ */

const PREGUNTAS_BASICO: QuizQ[] = [
  {
    q: '¿Qué significan las siglas SDR?',
    options: ['Sales Development Representative (representante de desarrollo de ventas)', 'Senior Data Reviewer (revisor de datos)', 'Service Delivery Resource (recurso de entrega)', 'Sales Director Regional (director regional)'],
    answer: 0,
    why: 'SDR es el Sales Development Representative: sale a conseguir las primeras reuniones y califica a los prospectos tempranos.',
  },
  {
    q: 'Un prospecto llega solo a tu web, descarga un documento y deja sus datos. ¿Qué motor de adquisición lo trajo?',
    options: ['Inbound: el cliente llega atraído por la marca y el contenido', 'Outbound: el equipo salió a buscarlo', 'Ninguno: es una referencia', 'Pre-Sales, porque hubo contenido técnico'],
    answer: 0,
    why: 'En el motor Inbound el cliente llega atraído por marca, contenido y reputación. En Outbound es el equipo el que sale al mercado abierto.',
  },
  {
    q: '¿Cuál es el rol responsable de llevar el proceso comercial completo hasta el cierre (Close Won)?',
    options: ['AE · Account Executive (ejecutivo de cuentas)', 'BDR · Business Development Representative', 'AM · Account Manager (gerente de cuentas)', 'LGR · Lead Generation Representative'],
    answer: 0,
    why: 'El AE (Account Executive, ejecutivo de cuentas) es dueño del proceso: da las demos, gestiona la propuesta y cierra.',
  },
  {
    q: 'Ya se firmó el contrato. ¿Quién cuida la relación en el tiempo y abre cross-selling y up-selling?',
    options: ['AM · Account Manager (gerente de cuentas)', 'SDR · Sales Development Representative', 'BDR · Business Development Representative', 'Pre-Sales · ingeniero de preventa'],
    answer: 0,
    why: 'El AM (Account Manager) sostiene la relación después del cierre y hace crecer la cuenta. Se mide por retención y expansión.',
  },
  {
    q: '¿Qué debe entregarle el SDR al AE en un buen traspaso?',
    options: ['Una cuenta "aterrizada": reunión agendada, Champion detectado y siguientes pasos claros', 'Una lista de correos electrónicos para que el AE prospecte', 'El contrato listo para firmar', 'Un informe técnico de viabilidad'],
    answer: 0,
    why: 'El SDR entrega una cuenta aterrizada. Si el AE tiene que repetir las preguntas ya hechas, la oportunidad se enfría.',
  },
  {
    q: '¿Cuál es la función principal del BDR (Business Development Representative)?',
    options: ['Mapear el territorio y priorizar las cuentas target antes del contacto comercial', 'Dar las demostraciones técnicas del producto', 'Negociar el precio final con el comprador', 'Gestionar la postventa y los reclamos'],
    answer: 0,
    why: 'El BDR lee el mercado y filtra por tamaño, industria y potencial: define a qué cuentas vale la pena dedicarles esfuerzo.',
  },
  {
    q: 'En una venta compleja, ¿quién hace de puente técnico con pruebas de concepto (POC) y demos especializadas?',
    options: ['Pre-Sales · ingeniero de preventa o de soluciones', 'AM · Account Manager', 'LGR · Lead Generation Representative', 'El Manager de ventas'],
    answer: 0,
    why: 'Pre-Sales traduce los requisitos del prospecto en capacidades demostrables y valida que la solución sea viable.',
  },
  {
    q: '¿Con qué métrica se evalúa principalmente a un AM (Account Manager)?',
    options: ['Retención y expansión de la cuenta (NDR)', 'Cantidad de llamadas en frío por día', 'Número de cuentas mapeadas', 'Reuniones agendadas por semana'],
    answer: 0,
    why: 'Cada rol se mide distinto. Al AM lo mide la salud de la cuenta en el tiempo, no la actividad de prospección.',
  },
  {
    q: 'En esta arquitectura, ¿cuál es el trabajo del Manager de ventas?',
    options: ['Monitorear el pipeline global, orquestar recursos y habilitar al equipo', 'Cerrar personalmente los negocios más difíciles', 'Revisar y aprobar cada correo que envía el equipo', 'Hacer la prospección de las cuentas grandes'],
    answer: 0,
    why: 'El Manager orquesta y habilita: no apaga incendios ni ejecuta el trabajo táctico de su equipo.',
  },
  {
    q: '¿Qué es un Sales Pod (escuadrón)?',
    options: ['Una célula multifuncional y autónoma, con todos los roles midiéndose por un KPI compartido', 'Un turno rotativo de llamadas en frío', 'El equipo de soporte técnico posventa', 'Una reunión semanal de pronóstico con la gerencia'],
    answer: 0,
    why: 'El Pod retiene el contexto del cliente de principio a fin y elimina las culpas cruzadas entre silos.',
  },
];

function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1:" highlight="roles y fundamentos" subtitle="Diez preguntas de nivel principiante sobre quién es quién en el equipo comercial y qué hace cada uno.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={PREGUNTAS_BASICO} />
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 21. Test nivel avanzado                                             */
/* ------------------------------------------------------------------ */

const PREGUNTAS_AVANZADO: QuizQ[] = [
  {
    q: 'Según la fórmula de Graicunas, un líder con 5 reportes directos debe coordinar aproximadamente…',
    options: ['100 relaciones potenciales', '5 relaciones, una por persona', '25 relaciones', '15 relaciones'],
    answer: 0,
    why: 'R = n · (2ⁿ⁻¹ + n − 1). Con n = 5 son 100 relaciones: sumar una persona no suma una tarea, multiplica la coordinación.',
  },
  {
    q: 'Una empresa elimina a sus mandos medios pero no instala playbooks, SOPs ni habilitación. ¿Qué es lo más probable?',
    options: ['El tramo de control del líder se dispara y la coordinación que hacían esos mandos simplemente se pierde', 'El equipo gana autonomía de inmediato y mejora el pronóstico', 'Baja el costo y nada más cambia', 'Los AE pasan a reportar al área de marketing'],
    answer: 0,
    why: 'Aplanar acelera la organización solo si algo asume la coordinación que hacían esas capas: documentación, sistemas y rituales.',
  },
  {
    q: '¿Cuál es la diferencia de fondo entre capacitación tradicional y Sales Enablement (habilitación)?',
    options: ['La capacitación es un evento aislado; la habilitación es un sistema continuo integrado al trabajo diario', 'La habilitación la dicta un proveedor externo y la capacitación es interna', 'Son sinónimos: cambia solo el nombre en inglés', 'La capacitación aplica a los AE y la habilitación solo a los SDR'],
    answer: 0,
    why: 'La habilitación integra contenido, tecnología, procesos y coaching en el flujo diario, y su métrica reina es el Ramp Time.',
  },
  {
    q: 'Según los rangos vistos en clase, ¿cuánto tarda en estar productivo un AE de segmento Enterprise?',
    options: ['Entre 7 y 12 meses', 'Entre 2 y 3 meses, igual que un SDR', 'Menos de 6 semanas', 'Entre 1 y 2 años'],
    answer: 0,
    why: 'El ramp de un AE Enterprise va de 7 a 12 meses, con su primer negocio entre el tercer y cuarto mes. Un SDR o BDR ramp en 2 a 3 meses.',
  },
  {
    q: '"La autoridad se desplaza a los márgenes, donde está el cliente." ¿Qué modelo organizacional describe esa frase?',
    options: ['El modelo orgánico', 'El modelo mecánico', 'La estructura matricial clásica', 'El modelo de comando y control'],
    answer: 0,
    why: 'El modelo orgánico se basa en el empoderamiento y la retroalimentación inmediata frente al cliente; el mecánico, en el control y la autoridad del título.',
  },
  {
    q: 'En la Fase 2 de madurez (Tracción, 60 a 80 cuentas cerradas al año), el movimiento estructural clave es…',
    options: ['Separar estrictamente al SDR (apertura) del AE (cierre), con CRM centralizado', 'Pasar de inmediato a Sales Pods autónomos', 'Eliminar los mandos medios tácticos', 'Que una o dos personas asuman todos los roles'],
    answer: 0,
    why: 'La especialización SDR/AE llega en Tracción. Los Pods y el aplanamiento intencional son propios de la Fase 3 (Enterprise).',
  },
  {
    q: '¿Cuál es el propósito de la retrospectiva al cierre de cada sprint de ventas?',
    options: ['Que el propio equipo revise métricas y decida qué empieza, qué detiene y qué continúa', 'Que el gerente evalúe el desempeño individual de cada vendedor', 'Repasar el pronóstico de ingresos del trimestre con la dirección', 'Capacitar al equipo en el producto nuevo'],
    answer: 0,
    why: 'En la retrospectiva la autocrítica del equipo suplanta la corrección del gerente: es el motor de alineación de la autogestión.',
  },
  {
    q: '¿Cuál es el riesgo típico de un mal traspaso del AE al AM (Account Manager)?',
    options: ['El cliente firma y nadie sabe qué se le prometió durante la venta', 'El prospecto recibe dos propuestas distintas', 'Se duplica el registro de la oportunidad en el CRM', 'El Pre-Sales queda sin trabajo técnico asignado'],
    answer: 0,
    why: 'En ese traspaso debe viajar el contexto completo: paper process, lo prometido por escrito, el Champion y las expectativas del cliente.',
  },
  {
    q: 'El "gerente silencioso" se refiere a…',
    options: ['El conocimiento documentado (ICP, playbooks, battlecards y SOPs) que asume el mando táctico', 'Un supervisor que escucha las llamadas sin intervenir', 'El panel de control del CRM que alerta sobre los negocios estancados', 'El líder que delega todo en su equipo sin dar retroalimentación'],
    answer: 0,
    why: 'Si quitamos la supervisión humana directa, la documentación resuelve sin escalar a un jefe: criterios de discovery, reglas de workflow y respuestas a objeciones.',
  },
  {
    q: '¿Por qué importa el flujo de información que va del AM de vuelta al AE?',
    options: ['Porque las señales de cross-selling y up-selling se pierden si nunca llegan a quien puede abrir la negociación', 'Porque el AE debe aprobar cada reclamo de postventa', 'Porque el AM no tiene permisos para editar el CRM', 'Porque el AE necesita validar técnicamente la cuenta'],
    answer: 0,
    why: 'La expansión es un traspaso más, y va en sentido inverso: el AM está cerca del cliente y detecta necesidades nuevas que el AE puede convertir en negocio.',
  },
];

function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2:" highlight="arquitectura y decisiones" subtitle="Diez preguntas de nivel avanzado: tramo de control, aplanamiento, habilitación, agilidad y madurez estructural.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={PREGUNTAS_AVANZADO} />
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseArquitecturaEquipos({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'eq-slide-0': return <Portada isDark={isDark} />;
    case 'eq-diagnostico': return <Diagnostico isDark={isDark} />;
    case 'eq-inbound-outbound': return <InboundOutbound isDark={isDark} />;
    case 'eq-roles': return <Roles isDark={isDark} />;
    case 'eq-traspasos': return <Traspasos isDark={isDark} />;
    case 'eq-pipeline': return <Pipeline isDark={isDark} />;
    case 'eq-piramide': return <Piramide isDark={isDark} />;
    case 'eq-delayering': return <Delayering isDark={isDark} />;
    case 'eq-graicunas': return <Graicunas isDark={isDark} />;
    case 'eq-pods': return <Pods isDark={isDark} />;
    case 'eq-ramp': return <Ramp isDark={isDark} />;
    case 'eq-enablement': return <Enablement isDark={isDark} />;
    case 'eq-ia-roleplay': return <IARoleplay isDark={isDark} />;
    case 'eq-silent-manager': return <SilentManager isDark={isDark} />;
    case 'eq-stack': return <Stack isDark={isDark} />;
    case 'eq-agile': return <Agile isDark={isDark} />;
    case 'eq-madurez': return <Roadmap isDark={isDark} />;
    case 'eq-cierre': return <Cierre isDark={isDark} />;
    case 'eq-test-basico': return <TestBasico isDark={isDark} />;
    case 'eq-test-avanzado': return <TestAvanzado isDark={isDark} />;
    default: return null;
  }
}
