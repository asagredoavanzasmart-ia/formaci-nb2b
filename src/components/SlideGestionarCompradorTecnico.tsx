import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Swords } from 'lucide-react';

// Paleta exclusiva: #ff851d (naranja), #ef375c (coral/rojo), grises neutros
const scenarios = [
  {
    id: 'ingeniero',
    num: '01',
    title: 'El Ingeniero Especialista',
    subtitle: 'El Técnico Terminador',
    icon: ShieldCheck,
    accentColor: '#ff851d',
    tagLabel: 'Influencia Alta',
    context: 'Experto cuya opinión es indiscutible. El Comprador Económico delega totalmente la decisión en él.',
    strategy: 'Su aprobación es el gatekeeper real. Nunca lo ignores por ser «solo técnico».',
    steps: [
      'Presenta especificaciones técnicas y ventajas medibles.',
      'Supera sus pruebas para consolidar su autoridad.',
      'Su Win: ser visto como el experto que eligió la mejor solución.',
    ],
  },
  {
    id: 'asesor',
    num: '02',
    title: 'El Asesor o Consultor',
    subtitle: 'Buscando reconocimiento',
    icon: ShieldAlert,
    accentColor: '#ef375c',
    tagLabel: 'Reducción de Riesgo',
    context: 'Filtro que busca que la solución funcione sin contratiempos para proteger su reputación.',
    strategy: 'Hazlo lucir como un solucionador estratégico ante su propia gerencia.',
    steps: [
      'Demuestra que eres la opción de menor riesgo.',
      'Ayúdale a asegurar su victoria personal interna.',
      'Transfórmalo en un Coach para llegar al Comprador Económico.',
    ],
  },
  {
    id: 'receloso',
    num: '03',
    title: 'El Técnico con Recelo',
    subtitle: 'Miedo a la pérdida de control',
    icon: Swords,
    accentColor: '#ff851d',
    tagLabel: 'Apalancamiento',
    context: 'Percibe tu solución como una amenaza directa a su control o a su rol en la organización.',
    strategy: 'No lo saltes; saboteará la implementación. Baja su guardia operativa primero.',
    steps: [
      'Descubre por qué teme y muéstrale cómo él gana con el cambio.',
      'Enfatiza la confiabilidad y el control administrativo que mantiene.',
      'Usa un Comprador Usuario entusiasta como puente para puentear el bloqueo.',
    ],
  },
];

export default function SlideGestionarCompradorTecnico({ isDark }: { isDark: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div
      className={`w-full h-full flex flex-col rounded-3xl shadow-2xl overflow-hidden relative ${
        isDark ? 'bg-[#1a1a1a] border border-[#2a2a2a]' : 'bg-[#fafafa] border border-gray-100'
      }`}
    >
      {/* Línea de acento superior */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#ff851d] to-[#ef375c] z-10" />

      {/* ── HEADER ── */}
      <div className="shrink-0 px-8 pt-8 pb-4 z-10">
        <h2 className={`text-2xl font-black tracking-tight leading-none mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
          Gestionar{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
            Comprador Técnico
          </span>
        </h2>
        <p className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          El «portero» evalúa lo medible y tiene capacidad de bloqueo técnico.
        </p>
      </div>

      {/* ── GRID DE PERFILES (sin scroll) ── */}
      <div className="flex-1 flex flex-col md:flex-row gap-0 min-h-0 px-8 pb-6">

        {/* Columna izquierda: Selector de perfil */}
        <div className="w-full md:w-[30%] flex flex-row md:flex-col gap-2 mb-4 md:mb-0 md:pr-5 shrink-0">
          {scenarios.map((s, idx) => {
            const Icon = s.icon;
            const isActive = active === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActive(idx)}
                className={`flex items-center gap-3 py-3 px-4 rounded-2xl border-2 text-left transition-all duration-200 flex-1 md:flex-none ${
                  isActive
                    ? isDark
                      ? 'bg-[#2a2a2a] border-[#ff851d] shadow-lg'
                      : 'bg-white border-[#ff851d] shadow-md'
                    : isDark
                      ? 'bg-[#1e1e1e] border-[#2a2a2a] hover:border-[#3a3a3a]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, #ff851d, #ef375c)`
                      : isDark
                        ? '#2e2e2e'
                        : '#f0f0f0',
                  }}
                >
                  <Icon
                    size={16}
                    className={isActive ? 'text-white' : isDark ? 'text-gray-500' : 'text-gray-400'}
                  />
                </div>
                <div className="overflow-hidden">
                  <p
                    className={`text-[10px] font-black uppercase tracking-wider leading-none mb-0.5 ${
                      isActive ? 'text-[#ff851d]' : isDark ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    Perfil {s.num}
                  </p>
                  <p
                    className={`text-xs font-bold truncate leading-tight ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    {s.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Divider vertical */}
        <div className={`hidden md:block w-px shrink-0 ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'}`} />

        {/* Columna central + derecha: Contenido del perfil activo */}
        <div className="flex-1 min-h-0 flex flex-col md:pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col h-full gap-4"
            >
              {/* Cabecera del perfil */}
              <div className="flex items-start justify-between shrink-0">
                <div>
                  <h3
                    className={`text-xl font-black leading-tight ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {scenarios[active].title}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: scenarios[active].accentColor }}
                  >
                    {scenarios[active].subtitle}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full border tracking-wider ${
                    isDark
                      ? 'border-[#3a3a3a] text-gray-400 bg-black/20'
                      : 'border-gray-200 text-gray-400 bg-white shadow-sm'
                  }`}
                >
                  {scenarios[active].tagLabel}
                </span>
              </div>

              {/* Cards de contenido — 2 filas + columna de pasos */}
              <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">

                {/* Columna izquierda del contenido: Contexto + Estrategia */}
                <div className="flex flex-col gap-3">
                  {/* Contexto */}
                  <div
                    className={`flex-1 p-4 rounded-2xl border-l-[3px] ${
                      isDark ? 'bg-[#222] border-[#ff851d]' : 'bg-white border-[#ff851d] shadow-sm'
                    }`}
                  >
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                      style={{ color: '#ff851d' }}
                    >
                      Contexto
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {scenarios[active].context}
                    </p>
                  </div>

                  {/* Estrategia */}
                  <div
                    className={`flex-1 p-4 rounded-2xl border-l-[3px] ${
                      isDark ? 'bg-[#222] border-[#ef375c]' : 'bg-white border-[#ef375c] shadow-sm'
                    }`}
                  >
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.15em] mb-2"
                      style={{ color: '#ef375c' }}
                    >
                      Estrategia clave
                    </p>
                    <p
                      className={`text-sm font-semibold leading-relaxed ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {scenarios[active].strategy}
                    </p>
                  </div>
                </div>

                {/* Columna derecha: Tácticas numeradas */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col ${
                    isDark ? 'bg-[#222] border-[#2a2a2a]' : 'bg-white border-gray-100 shadow-sm'
                  }`}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.15em] mb-3 shrink-0"
                    style={{ color: '#ff851d' }}
                  >
                    Táctica paso a paso
                  </p>
                  <div className="flex flex-col gap-3">
                    {scenarios[active].steps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span
                          className="w-6 h-6 rounded-lg text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5"
                          style={{
                            background: `linear-gradient(135deg, #ff851d, #ef375c)`,
                          }}
                        >
                          {i + 1}
                        </span>
                        <p
                          className={`text-sm leading-snug ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nota al pie — sin color rojo/verde/azul fuera de paleta */}
              <div
                className={`shrink-0 px-4 py-3 rounded-xl border flex items-start gap-3 ${
                  isDark
                    ? 'bg-[#ff851d]/5 border-[#ff851d]/20'
                    : 'bg-[#ff851d]/5 border-[#ff851d]/20'
                }`}
              >
                <ShieldAlert size={16} className="text-[#ff851d] shrink-0 mt-0.5" />
                <p
                  className={`text-xs leading-snug ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <strong className="text-[#ff851d] font-black uppercase tracking-tight mr-1">
                    Nota:
                  </strong>
                  El C. Técnico puede camuflarse como C. Económico. Valida siempre el presupuesto con un{' '}
                  <span className="font-black text-[#ef375c]">Coach</span> antes de avanzar de etapa.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
