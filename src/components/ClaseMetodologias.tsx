import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap, FlaskConical, Sparkles, HelpCircle, Quote, LineChart,
  ShieldCheck, RefreshCw, Ruler, Landmark, Building2, Scale, History,
  Brain, Compass, Clock, BookOpen, Users, DollarSign, Layers, Swords,
  Search, Lightbulb, Crown, CheckCircle2, AlertTriangle, Award, Zap,
  Anchor, Frame, Gauge, ChevronRight, Target,
} from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel } from './slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Orb, Float, Traveler, hop } from './scene3d';

/**
 * Clase: "La Ciencia de Vender" (Ventas Avanzado).
 * Objetivo didáctico: mostrar a un vendedor que la venta es una disciplina
 * estudiada académicamente, con autores, metodologías y evidencia empírica
 * replicable y revisada por pares.
 *
 * Capa de presentación pura. El router inferior decide qué diapositiva mostrar
 * según el `slideId`. Las diapositivas de nivel 1 (encabezados "mv-header-*")
 * las dibuja App.tsx de forma genérica, no este componente.
 */

type SlideProps = { isDark: boolean };

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${
        isDark ? 'bg-[#121212] border border-transparent' : 'bg-[#f8f9fa] border border-transparent'
      }`}
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Escena 3D: de la intuición (bloques bajos y grises) a la evidencia (altos y de marca) */}
      <svg viewBox="0 0 600 230" className="w-full max-w-xl mb-4 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="mvp" isDark={isDark} />
        {[30, 55, 82, 112, 146].map((h, i) => {
          const x = 120 + i * 90;
          return (
            <motion.g key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 * i, type: 'spring', stiffness: 90, damping: 13 }}>
              <Float amp={4} dur={3.2} delay={i * 0.3}>
                <g filter="url(#mvp-sh)"><IsoBox cx={x} cy={185 - h} s={32} h={h} f={i < 2 ? NEUTRAL(isDark) : i < 3 ? PEACH : BRAND} /></g>
              </Float>
            </motion.g>
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <Traveler key={i} id="mvp" path={hop([120 + i * 90, 185 - [30, 55, 82, 112][i] - 16], [210 + i * 90, 185 - [55, 82, 112, 146][i] - 16], 26)} dur={1.6} delay={i * 0.45} repeatDelay={1} r={5} />
        ))}
        <motion.g animate={{ y: [0, -14, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
          <Orb id="mvp" cx={480} cy={8} r={13} />
        </motion.g>
        <text x={120} y={226} textAnchor="middle" fontSize={13} fontWeight={800} fill={sceneTone(isDark).muted}>Intuición</text>
        <text x={480} y={226} textAnchor="middle" fontSize={13} fontWeight={800} fill={ORANGE}>Evidencia</text>
      </svg>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs md:text-sm uppercase tracking-[0.3em] mb-5 font-bold text-[#ff851d] z-10"
      >
        Ventas Avanzado
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        La Ciencia de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Vender</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-base md:text-2xl max-w-3xl mx-auto mb-10 z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        Metodologías, autores y evidencia empírica detrás del arte de vender
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6 }}
        className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 z-10"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`mt-8 text-sm md:text-base font-medium z-10 ${isDark ? 'text-white/50' : 'text-gray-500'}`}
      >
        De oficio intuitivo a disciplina científica
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. ¿Arte o Ciencia?                                                 */
/* ------------------------------------------------------------------ */

function ArteCiencia({ isDark }: SlideProps) {
  const [view, setView] = useState<'mito' | 'evidencia'>('mito');

  const data = {
    mito: [
      { icon: Sparkles, title: 'El vendedor nace, no se hace', text: 'Se asume un talento innato e inescrutable, imposible de enseñar.' },
      { icon: Quote, title: 'Vender es puro carisma', text: 'El resultado dependería solo de la persuasión y la intuición personal.' },
      { icon: HelpCircle, title: 'No se puede medir', text: 'Sería un arte subjetivo, no algo cuantificable ni replicable.' },
    ],
    evidencia: [
      { icon: LineChart, title: 'El comportamiento se codifica', text: 'Patterson (NCR, 1880s) duplicó ventas con guiones, manuales y formación estructurada.' },
      { icon: FlaskConical, title: 'Se mide y se replica', text: 'Dubinsky (1980) identificó los pasos de la venta con análisis factorial sobre 181 vendedores.' },
      { icon: GraduationCap, title: 'Se estudia en la universidad', text: 'Hace más de 40 años que los MBA y las revistas científicas investigan la venta.' },
    ],
  };

  const cards = data[view];

  return (
    <Shell isDark={isDark} title="¿Arte o" highlight="Ciencia?" subtitle="Dos formas de entender la venta. Solo una resiste la evidencia.">
      <div className="h-full flex flex-col">
        <div className="flex justify-center mb-6 shrink-0">
          <div className={`p-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-black/40 border border-transparent' : 'bg-gray-100 border border-transparent'}`}>
            <button
              onClick={() => setView('mito')}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-black transition-all duration-300 ${
                view === 'mito' ? 'bg-white text-black shadow-md scale-105' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              El Mito
            </button>
            <button
              onClick={() => setView('evidencia')}
              className={`px-6 py-2 rounded-full text-xs md:text-sm font-black transition-all duration-300 ${
                view === 'evidencia' ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg scale-105' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              La Evidencia
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
            >
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-3xl border flex flex-col gap-4 ${
                      view === 'evidencia'
                        ? isDark
                          ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] border-transparent'
                          : 'bg-gradient-to-br from-orange-50 to-white border-transparent'
                        : panelClass(isDark)
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        view === 'evidencia' ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg' : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className={`text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.title}</h3>
                    <p className={`text-sm md:text-base leading-relaxed ${textMuted(isDark)}`}>{c.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={`shrink-0 mt-6 p-4 rounded-2xl text-center text-sm md:text-base font-medium border ${isDark ? 'bg-black/30 border-transparent text-gray-300' : 'bg-orange-50/60 border-transparent text-gray-700'}`}>
          En un siglo, la venta pasó de un <strong>oficio basado en la intuición</strong> a una <strong>ciencia estratégica</strong> fundada en psicología cognitiva, economía conductual y análisis de datos.
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. ¿Qué hace científica a una disciplina?                           */
/* ------------------------------------------------------------------ */

function QueEsCiencia({ isDark }: SlideProps) {
  const criterios = [
    { icon: FlaskConical, title: 'Evidencia empírica', text: 'Conclusiones basadas en datos medibles, no en anécdotas ni opiniones.', tag: 'Ejemplo', proof: 'SPIN analizó 35.000 llamadas reales de venta.' },
    { icon: ShieldCheck, title: 'Revisión por pares', text: 'Otros expertos auditan y aprueban el estudio antes de publicarlo.', tag: 'Revistas', proof: 'JPSSM · Journal of Marketing · JAMS.' },
    { icon: RefreshCw, title: 'Replicabilidad', text: 'Distintos investigadores reproducen los resultados en nuevos contextos.', tag: 'Ejemplo', proof: 'Meta-análisis SOCO: 25 años y miles de vendedores.' },
    { icon: Ruler, title: 'Constructos validados', text: 'Se mide con escalas de validez nomológica y fiabilidad psicométrica.', tag: 'Escalas', proof: 'SOCO (24 ítems) y ADAPTS (16 ítems).' },
  ];

  const [active, setActive] = useState(0);
  // Columnas sobre la base (posición en la escena) en el mismo orden que las tarjetas.
  const cols: [number, number][] = [[92, 250], [160, 216], [228, 250], [160, 284]];
  const drawOrder = [1, 0, 2, 3];

  return (
    <Shell
      isDark={isDark}
      title="¿Qué hace científica a una"
      highlight="disciplina?"
      subtitle="Cuatro exigencias sostienen el conocimiento verificable; si falta una, todo se cae. Pasa por cada tarjeta."
    >
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[34%] min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 320 340" className="w-full h-full max-h-[400px] overflow-visible" aria-label="Cuatro columnas que sostienen la ciencia">
            <SceneDefs id="qec" isDark={isDark} />
            <g filter="url(#qec-sh)"><IsoBox cx={160} cy={250} s={132} h={18} f={NEUTRAL(isDark)} /></g>
            {drawOrder.map((i) => (
              <motion.g key={i} animate={{ opacity: i === active ? 1 : 0.55 }} onClick={() => setActive(i)} style={{ cursor: 'pointer' }} filter="url(#qec-sh)">
                <IsoBox cx={cols[i][0]} cy={cols[i][1] - 112} s={18} h={112} f={i === active ? BRAND : PEACH} />
              </motion.g>
            ))}
            <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} filter="url(#qec-sh)">
              <IsoBox cx={160} cy={120} s={132} h={18} f={BRAND} />
              <text x={160} y={126} textAnchor="middle" fontSize={17} fontWeight={900} fill="#fff">Ciencia</text>
            </motion.g>
          </svg>
        </div>
      <div className="lg:w-[66%] grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
        {criterios.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`p-5 rounded-3xl flex items-start gap-4 cursor-pointer ${i === active ? (isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2418] shadow-lg shadow-black/40' : 'bg-gradient-to-br from-white to-orange-50 shadow-lg shadow-orange-200/60') : panelClass(isDark)}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30 flex items-center justify-center shrink-0">
                <Icon size={24} />
              </div>
              <div className="min-w-0">
                <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.title}</h3>
                <p className={`text-sm leading-relaxed mb-3 ${textMuted(isDark)}`}>{c.text}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold px-3 py-1 rounded-full ${isDark ? 'bg-[#ff851d]/10 text-[#ff851d]' : 'bg-orange-100 text-[#ef375c]'}`}>
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span className="font-black uppercase tracking-wider text-[10px] opacity-70">{c.tag}</span>
                  <span className="opacity-40">·</span>
                  {c.proof}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Academia vs Consultoras                                          */
/* ------------------------------------------------------------------ */

function AcademiaVsConsultoras({ isDark }: SlideProps) {
  const col = (
    items: string[],
    extraClass: string,
  ) => (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className={`flex items-start gap-3 text-sm md:text-base ${textMuted(isDark)}`}>
          <ChevronRight size={18} className={`shrink-0 mt-0.5 ${extraClass}`} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <Shell isDark={isDark} title="Dos mundos que se" highlight="necesitan" subtitle="La academia y las consultoras estudian lo mismo, con reglas distintas.">
      <div className="h-full flex flex-col lg:flex-row gap-5 items-stretch">
        {/* Academia */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex-1 p-6 rounded-3xl border flex flex-col ${isDark ? 'bg-[#1a1a1a] border-transparent' : 'bg-white border-transparent'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a] text-[#ff851d]' : 'bg-orange-50 text-[#ef375c]'}`}>
              <Landmark size={26} />
            </span>
            <div>
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Academia</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Universidades y revistas de alto impacto</p>
            </div>
          </div>
          {col(
            [
              'Busca conocimiento verificable y generalizable.',
              'Valida cada afirmación con datos y estadística.',
              'Ritmo lento: años de estudio y revisión.',
              'Autores: Saxe, Weitz, Terho, Vargo…',
            ],
            'text-[#ff851d]',
          )}
        </motion.div>

        {/* Puente */}
        <div className="lg:w-56 shrink-0 flex items-center justify-center">
          <div className={`p-5 rounded-3xl border text-center ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] border-transparent' : 'bg-gradient-to-br from-orange-50 to-white border-transparent'}`}>
            <Scale className="mx-auto mb-3 text-[#ff851d]" size={30} />
            <p className={`text-xs md:text-sm font-medium ${textMuted(isDark)}`}>
              La academia <strong>filtra</strong> lo comercial: asimila lo que funciona (<strong>SPIN</strong>) y cuestiona lo que no resiste la evidencia (<strong>Challenger</strong>).
            </p>
          </div>
        </div>

        {/* Consultoras */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex-1 p-6 rounded-3xl border flex flex-col ${isDark ? 'bg-[#1a1a1a] border-transparent' : 'bg-white border-transparent'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a] text-[#ff851d]' : 'bg-orange-50 text-[#ef375c]'}`}>
              <Building2 size={26} />
            </span>
            <div>
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Consultoras</h3>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Marcos comerciales accionables</p>
            </div>
          </div>
          {col(
            [
              'Buscan resultados comerciales inmediatos.',
              'Ofrecen recetas prácticas y fáciles de aplicar.',
              'Ritmo rápido: libros y programas de formación.',
              'Marcas: Sandler, Miller Heiman, Challenger…',
            ],
            'text-[#ef375c]',
          )}
        </motion.div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Línea de tiempo académica                                        */
/* ------------------------------------------------------------------ */

function Timeline({ isDark }: SlideProps) {
  const eras = [
    {
      id: 0,
      period: '1880s – 1970s',
      name: 'Paradigma funcional',
      icon: History,
      idea: 'Vender es ejecutar transacciones. El éxito se mide en volumen y persuasión unidireccional.',
      authors: ['Patterson (NCR)', 'Dubinsky (1980)'],
      hito: 'Dubinsky formaliza "Los 7 pasos de la venta" con análisis factorial.',
    },
    {
      id: 1,
      period: '1980s – 1990s',
      name: 'Revolución cognitiva',
      icon: Brain,
      idea: 'El foco pasa al cliente y a la mente del vendedor. Las tácticas de alta presión se descartan por dañinas.',
      authors: ['Saxe & Weitz (1982)', 'Spiro & Weitz (1990)'],
      hito: 'Nacen las escalas SOCO (orientación al cliente) y ADAPTS (venta adaptativa).',
    },
    {
      id: 2,
      period: '2000s – 2010s',
      name: 'Valor y digitalización',
      icon: LineChart,
      idea: 'Internet elimina la asimetría de información. El vendedor debe demostrar valor en términos monetarios.',
      authors: ['Moncrief & Marshall (2005)', 'Terho et al. (2012-2015)'],
      hito: 'Value-Based Selling: traducir beneficios a ROI y TCO comprobables.',
    },
    {
      id: 3,
      period: '2020s – hoy',
      name: 'Ecosistemas e IA',
      icon: Compass,
      idea: 'El valor se co-crea entre redes de actores. El vendedor orquesta ecosistemas, asistido por IA.',
      authors: ['Hartmann, Wieland & Vargo (2018)'],
      hito: 'Lógica Dominante de Servicios (S-DL) y cualificación con MEDDPICC.',
    },
  ];

  const [active, setActive] = useState(0);
  const era = eras[active];
  const Icon = era.icon;

  return (
    <Shell isDark={isDark} title="Línea de tiempo de la venta" highlight="académica" subtitle="Cuatro eras de investigación universitaria. Haz clic en cada hito.">
      <div className="h-full flex flex-col">
        {/* Eje de eras */}
        <div className="shrink-0 relative mb-6">
          <div className={`absolute top-[22px] left-[12.5%] right-[12.5%] h-1.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
            <motion.div
              className="absolute h-full left-0 top-0 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-[0_0_15px_rgba(255,133,29,0.5)]"
              initial={false}
              animate={{ width: `${(active / (eras.length - 1)) * 100}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            />
          </div>
          <div className="relative grid grid-cols-4 gap-2">
            {eras.map((e) => {
              const EIcon = e.icon;
              const isActive = e.id === active;
              return (
                <button key={e.id} onClick={() => setActive(e.id)} className="flex flex-col items-center gap-2 group">
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white border-transparent shadow-lg shadow-red-500/30 scale-110'
                        : isDark
                        ? 'bg-[#1e1e1e] border-transparent text-gray-400 group-hover:border-[#ff851d]'
                        : 'bg-white border-transparent text-gray-400 group-hover:border-[#ff851d]'
                    }`}
                  >
                    <EIcon size={22} />
                  </span>
                  <span className={`text-[10px] md:text-xs font-bold text-center leading-tight ${isActive ? 'text-[#ff851d]' : isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {e.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detalle */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={era.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`h-full p-6 md:p-8 rounded-3xl border flex flex-col justify-center ${panelClass(isDark)}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="p-3 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg">
                  <Icon size={28} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#ff851d]">{era.period}</p>
                  <h3 className={`text-2xl md:text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{era.name}</h3>
                </div>
              </div>
              <p className={`${microLabel(isDark)} mb-1`}>En esencia</p>
              <p className={`text-base md:text-lg leading-relaxed mb-5 ${textMuted(isDark)}`}>{era.idea}</p>
              <p className={`${microLabel(isDark)} mb-1.5`}>Figuras clave</p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {era.authors.map((a, i) => (
                  <span key={i} className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border ${isDark ? 'bg-[#1e1e1e] border-transparent text-gray-300' : 'bg-white border-transparent text-gray-700'}`}>
                    {a}
                  </span>
                ))}
              </div>
              <div className={`flex items-start gap-3 text-sm md:text-base font-medium p-3 rounded-2xl ${isDark ? 'bg-black/30 text-gray-300' : 'bg-white text-gray-700'}`}>
                <Sparkles size={18} className="text-[#ff851d] shrink-0 mt-0.5" />
                <span><strong>Hito:</strong> {era.hito}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Autores y evidencia                                              */
/* ------------------------------------------------------------------ */

function AutoresEvidencia({ isDark }: SlideProps) {
  const items = [
    {
      icon: Users,
      name: 'SOCO',
      sub: 'Orientación al Cliente vs. a la Venta',
      authors: 'Saxe & Weitz (1982)',
      journal: 'Journal of Marketing Research',
      proof: 'Escala de 24 ítems; meta-análisis sobre 25 años de datos (Jaramillo et al., 2007).',
    },
    {
      icon: Compass,
      name: 'Venta Adaptativa',
      sub: 'Escala ADAPTS',
      authors: 'Spiro & Weitz (1990)',
      journal: 'Journal of Marketing Research',
      proof: 'Escala de 16 ítems con validez nomológica: adaptar el estilo supera al guion fijo.',
    },
    {
      icon: DollarSign,
      name: 'Value-Based Selling',
      sub: 'Venta basada en el valor',
      authors: 'Terho, Haas, Eggert & Ulaga (2012-2015)',
      journal: 'Journal of the Academy of Marketing Science',
      proof: 'Traducir beneficios a términos monetarios (ROI/TCO) eleva conversión y márgenes.',
    },
    {
      icon: Layers,
      name: 'S-D Logic en ventas',
      sub: 'Lógica Dominante de Servicios',
      authors: 'Hartmann, Wieland & Vargo (2018)',
      journal: 'Journal of Marketing',
      proof: 'El valor se co-crea; el vendedor orquesta ecosistemas de actores.',
    },
  ];

  return (
    <Shell isDark={isDark} title="Autores y evidencia que" highlight="validan la venta" subtitle="Constructos canónicos, cada uno medido, publicado y revisado por pares.">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 content-center">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-3xl border flex flex-col gap-2 ${panelClass(isDark)}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white flex items-center justify-center shadow-lg shrink-0">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <h3 className={`text-lg font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{it.name}</h3>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{it.sub}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">{it.authors}</span>
                <span className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>publicado en</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${isDark ? 'border-transparent text-gray-400' : 'border-transparent text-gray-500'}`}>{it.journal}</span>
              </div>
              <div className="mt-1.5">
                <p className={`${microLabel(isDark)} mb-0.5`}>Qué demuestra</p>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{it.proof}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Las 5 metodologías comerciales                                   */
/* ------------------------------------------------------------------ */

function Metodologias({ isDark }: SlideProps) {
  const methods = [
    {
      id: 'challenger',
      icon: Swords,
      name: 'The Challenger Sale',
      year: '2011',
      authors: 'Matthew Dixon & Brent Adamson',
      proof: 'Estudio CEB (hoy Gartner) sobre 6.000+ representantes',
      argument: 'Los mejores vendedores no solo construyen relación: "desafían" al cliente. Le enseñan algo nuevo de su negocio, adaptan el mensaje al decisor y toman el control de la conversación.',
    },
    {
      id: 'spin',
      icon: Search,
      name: 'SPIN Selling',
      year: '1988',
      authors: 'Neil Rackham',
      proof: 'Investigación de 12 años sobre 35.000 llamadas',
      argument: 'En ventas complejas, las técnicas de cierre tradicionales fallan. Propone una secuencia de preguntas: Situación, Problema, Implicación y Necesidad de beneficio (Need-payoff).',
    },
    {
      id: 'consultive',
      icon: Lightbulb,
      name: 'Consultative Selling',
      year: '1970',
      authors: 'Mack Hanan',
      proof: 'Obra pionera del cambio de paradigma',
      argument: 'El vendedor deja de centrarse en las características del producto y actúa como consultor de negocios: diagnostica problemas y propone soluciones según el ROI del cliente.',
    },
    {
      id: 'miller',
      icon: Crown,
      name: 'Miller Heiman',
      year: '1985',
      authors: 'Robert B. Miller & Stephen E. Heiman',
      proof: 'Strategic Selling · Conceptual Selling (1987)',
      argument: 'Sistema riguroso para B2B complejo. Introduce los roles de influencia: Comprador Económico, Técnico, Usuario y el "Coach", para mapear y gestionar la decisión.',
    },
    {
      id: 'sandler',
      icon: ShieldCheck,
      name: 'Sandler Selling',
      year: '1967',
      authors: 'David H. Sandler / David Mattson',
      proof: 'The Sandler Rules (2007): 49 principios',
      argument: 'Invierte la dinámica tradicional con base en la psicología transaccional. El vendedor actúa con desapego emocional y descalifica pronto a los prospectos que no encajan.',
    },
  ];

  const [activeId, setActiveId] = useState(methods[0].id);
  const active = methods.find((m) => m.id === activeId) || methods[0];
  const ActiveIcon = active.icon;

  return (
    <Shell isDark={isDark} title="Cinco metodologías con" highlight="autor y evidencia" subtitle="Cada marco nació de un libro, un autor y un estudio. Explóralos.">
      <div className="h-full flex flex-col md:flex-row gap-5 min-h-0">
        {/* Tabs */}
        <div className="w-full md:w-[38%] flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1">
          {methods.map((m) => {
            const Icon = m.icon;
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? isDark
                      ? 'bg-[#2a2a2a] border-[#ff851d] shadow-md'
                      : 'bg-orange-50 border-[#ff851d] shadow-md'
                    : isDark
                    ? 'bg-[#222] border-transparent hover:border-gray-500'
                    : 'bg-white border-transparent hover:border-gray-300'
                }`}
              >
                <span
                  className={`p-2 rounded-xl shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-md' : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className={`block text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{m.name}</span>
                  <span className={`block text-xs ${isDark ? 'text-white/50' : 'text-gray-400'}`}>{m.year} · {m.authors}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="w-full md:w-[62%] min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`h-full p-6 md:p-8 rounded-3xl border flex flex-col justify-center ${panelClass(isDark)}`}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="p-4 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg">
                  <ActiveIcon size={32} />
                </span>
                <div className="min-w-0">
                  <h3 className={`text-2xl md:text-3xl font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{active.name}</h3>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{active.authors} · {active.year}</p>
                </div>
              </div>
              <div className={`inline-flex items-center gap-1.5 self-start text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full mb-5 ${isDark ? 'bg-[#ff851d]/10 text-[#ff851d]' : 'bg-orange-100 text-[#ef375c]'}`}>
                <FlaskConical size={15} className="shrink-0" />
                <span className="font-black uppercase tracking-wider text-[10px] opacity-70">Respaldo</span>
                <span className="opacity-40">·</span>
                {active.proof}
              </div>
              <p className={`${microLabel(isDark)} mb-1`}>Qué propone</p>
              <p className={`text-base md:text-lg leading-relaxed ${textMuted(isDark)}`}>{active.argument}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. SPIN vs Challenger: el escrutinio académico                      */
/* ------------------------------------------------------------------ */

function SpinVsChallenger({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="El escrutinio académico en" highlight="acción" subtitle="La ciencia no acepta todo: valida con evidencia y descarta lo que no la resiste.">
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* SPIN validado */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-3xl flex flex-col ${isDark ? 'bg-emerald-500/5 border-transparent' : 'bg-emerald-50 border-transparent'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg">
                <CheckCircle2 size={26} />
              </span>
              <div>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>SPIN Selling</h3>
                <p className="text-sm font-bold text-emerald-600">Validado y asimilado</p>
              </div>
            </div>
            <ul className={`space-y-3 text-sm md:text-base ${textMuted(isDark)}`}>
              <li className="flex gap-3"><ChevronRight size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span><strong>Respaldo:</strong> 12 años de estudio, 35.000 llamadas (Rackham, 1988).</span></li>
              <li className="flex gap-3"><ChevronRight size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span>Coherente con la Orientación al Cliente (SOCO) de Saxe & Weitz.</span></li>
              <li className="flex gap-3"><ChevronRight size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span>Preguntas socráticas, sin coerción: enseña a descubrir necesidades.</span></li>
              <li className="flex gap-3"><ChevronRight size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span>Se integró al currículo de muchas escuelas de negocios.</span></li>
            </ul>
          </motion.div>

          {/* Challenger cuestionado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-3xl flex flex-col ${isDark ? 'bg-amber-500/5 border-transparent' : 'bg-amber-50 border-transparent'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="p-3 rounded-2xl bg-amber-500 text-white shadow-lg">
                <AlertTriangle size={26} />
              </span>
              <div>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>The Challenger Sale</h3>
                <p className="text-sm font-bold text-amber-600">Cuestionado por la evidencia</p>
              </div>
            </div>
            <ul className={`space-y-3 text-sm md:text-base ${textMuted(isDark)}`}>
              <li className="flex gap-3"><ChevronRight size={18} className="text-amber-500 shrink-0 mt-0.5" /><span><strong>Origen:</strong> CEB/Gartner, 6.000+ reps (Dixon & Adamson, 2011).</span></li>
              <li className="flex gap-3"><ChevronRight size={18} className="text-amber-500 shrink-0 mt-0.5" /><span>Rapp, Bolander, Ahearne y Hughes (JPSSM) señalan fallas empíricas.</span></li>
              <li className="flex gap-3"><ChevronRight size={18} className="text-amber-500 shrink-0 mt-0.5" /><span>Ignora que la asimetría de información ya desapareció.</span></li>
              <li className="flex gap-3"><ChevronRight size={18} className="text-amber-500 shrink-0 mt-0.5" /><span>Imponer un único estilo contradice la Venta Adaptativa.</span></li>
            </ul>
          </motion.div>
        </div>

        <div className={`shrink-0 mt-5 p-4 rounded-2xl text-center text-sm md:text-base font-medium border ${isDark ? 'bg-black/30 border-transparent text-gray-300' : 'bg-gray-50 border-transparent text-gray-700'}`}>
          Esa capacidad de <strong>aceptar lo que funciona y rechazar lo que no</strong> es, precisamente, lo que convierte a la venta en una disciplina confiable.
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Kahneman y la psicología de la decisión                          */
/* ------------------------------------------------------------------ */

function Kahneman({ isDark }: SlideProps) {
  const cards = [
    { icon: Zap, title: 'Sistema 1 y Sistema 2', text: 'La mayoría de las decisiones de compra se inician en el Sistema 1 (rápido, intuitivo, emocional); el Sistema 2 (lento, racional) las justifica después.' },
    { icon: Scale, title: 'Aversión a la pérdida', text: 'Perder pesa alrededor del doble que ganar lo mismo. Encuadra tu oferta en aquello que el cliente evita perder.' },
    { icon: Anchor, title: 'Anclaje', text: 'El primer número que aparece condiciona toda la negociación posterior, aunque sea arbitrario.' },
    { icon: Frame, title: 'Encuadre (framing)', text: 'La misma información cambia de significado según cómo se presente. La forma importa tanto como el dato.' },
  ];

  return (
    <Shell isDark={isDark} title="La psicología de la" highlight="decisión" subtitle="Por qué la venta también es economía conductual.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`lg:w-[36%] p-6 rounded-3xl border flex flex-col justify-center text-center ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] border-transparent' : 'bg-gradient-to-br from-orange-50 to-white border-transparent'}`}
        >
          <span className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white flex items-center justify-center shadow-2xl shadow-red-500/30 mb-4">
            <Brain size={40} />
          </span>
          <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Daniel Kahneman</h3>
          <div className="inline-flex items-center gap-2 self-center text-xs md:text-sm font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white mt-3 mb-4">
            <Award size={15} /> Premio Nobel de Economía 2002
          </div>
          <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>
            Psicólogo que, junto a Amos Tversky, fundó la <strong>economía conductual</strong> y la <strong>Teoría Prospectiva</strong> (1979). Su libro <em>Pensar rápido, pensar despacio</em> (2011) demostró que decidir no es un acto puramente racional.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="lg:w-[64%] grid grid-cols-1 sm:grid-cols-2 gap-4 content-center">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`p-5 rounded-3xl border flex flex-col gap-3 ${panelClass(isDark)}`}
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white flex items-center justify-center shadow-lg shrink-0">
                  <Icon size={22} />
                </div>
                <h4 className={`text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.title}</h4>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{c.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 10. BANT vs MEDDPICC                                                */
/* ------------------------------------------------------------------ */

function BantMeddpicc({ isDark }: SlideProps) {
  const bant = [
    { k: 'B', t: 'Budget', d: 'Presupuesto: ¿hay dinero asignado?' },
    { k: 'A', t: 'Authority', d: 'Autoridad: ¿habla quien decide?' },
    { k: 'N', t: 'Need', d: 'Necesidad: ¿el problema es real?' },
    { k: 'T', t: 'Timeline', d: 'Plazo: ¿para cuándo lo necesita?' },
  ];
  const meddpicc = [
    { k: 'M', t: 'Metrics', d: 'Métricas de impacto' },
    { k: 'E', t: 'Economic Buyer', d: 'Comprador económico' },
    { k: 'D', t: 'Decision Criteria', d: 'Criterios de decisión' },
    { k: 'D', t: 'Decision Process', d: 'Proceso de decisión' },
    { k: 'P', t: 'Paper Process', d: 'Proceso documental' },
    { k: 'I', t: 'Implicate the Pain', d: 'Implicar el dolor' },
    { k: 'C', t: 'Champion', d: 'Promotor interno' },
    { k: 'C', t: 'Competition', d: 'Competencia' },
  ];

  return (
    <Shell isDark={isDark} title="Cualificar con" highlight="rigor: BANT vs MEDDPICC" subtitle="De la heurística rápida a la auditoría quirúrgica del negocio.">
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* BANT */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`p-5 md:p-6 rounded-3xl border flex flex-col ${panelClass(isDark)}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>BANT</h3>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Popularizado por IBM</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">Filtro rápido</span>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {bant.map((x, i) => (
                <div key={i} className={`p-3 rounded-2xl border flex items-center gap-3 ${isDark ? 'bg-[#1e1e1e] border-transparent' : 'bg-white border-transparent'}`}>
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white font-black flex items-center justify-center shrink-0">{x.k}</span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{x.t}</span>
                    <span className={`block text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{x.d}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className={`text-xs md:text-sm mt-4 ${textMuted(isDark)}`}>Califica en minutos. Ideal para prospección temprana de alto volumen.</p>
          </motion.div>

          {/* MEDDPICC */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={`p-5 md:p-6 rounded-3xl flex flex-col ${isDark ? 'bg-[#2a2a2a] border-transparent' : 'bg-orange-50/50 border-transparent'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>MEDDPICC</h3>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Auditoría continua del trato</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500 text-white">+25-30% cierre</span>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {meddpicc.map((x, i) => (
                <div key={i} className={`p-2.5 rounded-xl border flex items-center gap-2 ${isDark ? 'bg-[#1e1e1e] border-transparent' : 'bg-white border-transparent'}`}>
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white text-sm font-black flex items-center justify-center shrink-0">{x.k}</span>
                  <span className="min-w-0">
                    <span className={`block text-xs font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{x.t}</span>
                    <span className={`block text-[10px] truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{x.d}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className={`shrink-0 mt-5 p-4 rounded-2xl text-center text-sm md:text-base font-medium border ${isDark ? 'bg-black/30 border-transparent text-gray-300' : 'bg-gray-50 border-transparent text-gray-700'}`}>
          No compiten: <strong>BANT</strong> filtra temprano; <strong>MEDDPICC</strong> gobierna las cuentas estratégicas. Cada uno en su capa del proceso.
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. Cierre / síntesis                                               */
/* ------------------------------------------------------------------ */

function Cierre({ isDark }: SlideProps) {
  const chips = ['Evidencia empírica', 'Autores canónicos', 'Métodos validados', 'Psicología de la decisión', 'Cualificación rigurosa'];

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${
        isDark ? 'bg-[#121212] border border-transparent' : 'bg-[#f8f9fa] border border-transparent'
      }`}
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 rounded-3xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-2xl shadow-red-500/30 mb-6 z-10"
      >
        <Award size={40} />
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`text-3xl md:text-6xl font-black mb-6 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        Vender es una <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">disciplina científica</span>
      </motion.h2>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-3xl mb-8 z-10">
        {chips.map((c, i) => (
          <span key={i} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full border ${isDark ? 'bg-[#1e1e1e] border-transparent text-gray-300' : 'bg-white border-transparent text-gray-700'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`max-w-3xl p-6 rounded-3xl border flex items-start gap-4 text-left z-10 ${isDark ? 'bg-[#1e1e1e] border-transparent' : 'bg-white border-transparent'}`}
      >
        <Quote size={32} className="text-[#ff851d] shrink-0" />
        <p className={`text-base md:text-xl font-medium leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          No vendes por instinto: aplicas un método <strong>respaldado por evidencia</strong>, revisado por pares y replicable.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-8 text-xs md:text-sm z-10 ${isDark ? 'text-white/40' : 'text-gray-500'}`}
      >
        Respaldado por JPSSM · Journal of Marketing · Journal of the Academy of Marketing Science · Industrial Marketing Management
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseMetodologias({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'mv-slide-0':
      return <Portada isDark={isDark} />;
    case 'mv-arte-ciencia':
      return <ArteCiencia isDark={isDark} />;
    case 'mv-que-es-ciencia':
      return <QueEsCiencia isDark={isDark} />;
    case 'mv-academia-consultoras':
      return <AcademiaVsConsultoras isDark={isDark} />;
    case 'mv-timeline':
      return <Timeline isDark={isDark} />;
    case 'mv-autores':
      return <AutoresEvidencia isDark={isDark} />;
    case 'mv-metodologias':
      return <Metodologias isDark={isDark} />;
    case 'mv-spin-challenger':
      return <SpinVsChallenger isDark={isDark} />;
    case 'mv-kahneman':
      return <Kahneman isDark={isDark} />;
    case 'mv-bant-meddpicc':
      return <BantMeddpicc isDark={isDark} />;
    case 'mv-cierre':
      return <Cierre isDark={isDark} />;
    default:
      return null;
  }
}
