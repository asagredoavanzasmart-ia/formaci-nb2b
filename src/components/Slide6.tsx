import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, AlertTriangle, Scale, ShieldOff } from 'lucide-react';

const modes = [
  {
    id: 'crecimiento',
    title: 'Crecimiento',
    color: 'from-blue-500 to-cyan-500',
    icon: TrendingUp,
    percepcion: 'Ve que la realidad actual está por debajo de los resultados deseados, pero cree que la brecha se puede cerrar haciendo más o mejor.',
    actitud: 'Está listo para escuchar propuestas que mejoren su situación. Usa palabras como "más", "mejor", "rápido".',
    cierre: 'alta',
    cierreColor: 'text-blue-500'
  },
  {
    id: 'problemas',
    title: 'Problemas',
    color: 'from-red-500 to-orange-500',
    icon: AlertTriangle,
    percepcion: 'La realidad ha caído por debajo de los niveles esperados debido a una crisis o problema. Necesita ayuda inmediata para volver a la normalidad.',
    actitud: '"Sácame de este lío". Busca supervivencia, no mejoras de lujo.',
    cierre: 'alta',
    cierreColor: 'text-red-500'
  },
  {
    id: 'equilibrio',
    title: 'Equilibrio',
    color: 'from-emerald-500 to-teal-500',
    icon: Scale,
    percepcion: 'No tiene discrepancia. Su realidad actual coincide con sus resultados deseados.',
    actitud: 'Contento con el status quo. No quiere cambios en su estabilidad.',
    cierre: 'baja',
    cierreColor: 'text-emerald-500'
  },
  {
    id: 'exceso',
    title: 'Exceso de confianza',
    color: 'from-purple-500 to-pink-500',
    icon: ShieldOff,
    percepcion: 'Su realidad es mejor que lo esperado. No tiene un problema.',
    actitud: 'Arrogancia o ignorancia. Cree que no necesita nada. Provocado por metas demasiado bajas o no entiende su situación real.',
    cierre: 'nula',
    cierreColor: 'text-purple-500'
  }
];

const BoatScene = ({ mode, isDark }: { mode: string, isDark: boolean }) => {
  const isCrecimiento = mode === 'crecimiento';
  const isProblemas = mode === 'problemas';
  const isEquilibrio = mode === 'equilibrio';
  const isExceso = mode === 'exceso';

  return (
    <div className={`relative w-full h-full min-h-[250px] flex items-center justify-center overflow-hidden rounded-2xl ${isDark ? 'bg-blue-900/20' : 'bg-blue-100/50'}`}>
      {/* Sky/Background gradient based on mode */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: isProblemas 
            ? 'linear-gradient(to bottom, #ef4444, transparent)' 
            : isExceso 
            ? 'linear-gradient(to bottom, #a855f7, transparent)'
            : isCrecimiento
            ? 'linear-gradient(to bottom, #3b82f6, transparent)'
            : 'linear-gradient(to bottom, #10b981, transparent)'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Port / Scaffolding for Crecimiento */}
      <AnimatePresence>
        {isCrecimiento && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="absolute right-0 bottom-[35%] w-1/2 h-[180px] z-0 flex items-end justify-end pr-4 md:pr-8"
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Foundations (Underwater block) */}
              <rect x="20" y="145" width="150" height="35" fill={isDark ? "#334155" : "#94a3b8"} opacity="0.8" />
              
              {/* Pillars going into water */}
              <rect x="40" y="140" width="15" height="40" fill={isDark ? "#334155" : "#64748b"} />
              <rect x="120" y="140" width="15" height="40" fill={isDark ? "#334155" : "#64748b"} />
              
              {/* Dock platform */}
              <rect x="20" y="130" width="150" height="15" fill={isDark ? "#475569" : "#94a3b8"} />
              
              {/* Scaffolding / Building */}
              <rect x="80" y="50" width="70" height="80" fill={isDark ? "#1e293b" : "#cbd5e1"} />
              <path d="M80 70 L150 70 M80 90 L150 90 M80 110 L150 110" stroke={isDark ? "#f59e0b" : "#d97706"} strokeWidth="2" />
              <path d="M100 50 L100 130 M130 50 L130 130" stroke={isDark ? "#f59e0b" : "#d97706"} strokeWidth="2" />
              
              {/* Crane Arm */}
              <motion.path 
                d="M110 50 L110 10 L20 30" 
                stroke={isDark ? "#eab308" : "#ca8a04"} 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                animate={{ d: ["M110 50 L110 10 L20 30", "M110 50 L110 10 L20 15", "M110 50 L110 10 L20 30"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path 
                d="M110 25 L150 15" 
                stroke={isDark ? "#eab308" : "#ca8a04"} 
                strokeWidth="4" 
                strokeLinecap="round"
                animate={{ d: ["M110 25 L150 15", "M110 25 L150 5", "M110 25 L150 15"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Crane cable holding cabin */}
              <motion.line 
                x1="20" y1="30" x2="20" y2="80" 
                stroke={isDark ? "#94a3b8" : "#64748b"} 
                strokeWidth="1.5" 
                strokeDasharray="3 3" 
                animate={{ y1: [30, 15, 30], y2: [80, 65, 80] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Cabin piece being lowered */}
              <motion.path 
                d="M0 80 L10 50 L40 50 L40 80 Z" 
                fill={isDark ? "#94a3b8" : "#cbd5e1"} 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.rect 
                x="15" y="60" width="10" height="10" rx="1" 
                fill={isDark ? "#38bdf8" : "#0ea5e9"} 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wind lines for Exceso (Outside boat so they stay horizontal) */}
      <AnimatePresence>
        {isExceso && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none overflow-hidden flex items-center justify-center"
          >
            <motion.div 
              animate={{ x: [400, -400], opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="absolute top-[35%] w-[150px] h-[2px] bg-white/80 rounded-full"
            />
            <motion.div 
              animate={{ x: [400, -400], opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.7, ease: "linear", delay: 0.2 }}
              className="absolute top-[45%] w-[200px] h-[3px] bg-white/80 rounded-full"
            />
            <motion.div 
              animate={{ x: [400, -400], opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.4, ease: "linear", delay: 0.4 }}
              className="absolute top-[55%] w-[100px] h-[2px] bg-white/80 rounded-full"
            />
            <motion.div 
              animate={{ x: [400, -400], opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear", delay: 0.1 }}
              className="absolute top-[65%] w-[120px] h-[2px] bg-white/80 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boat Container (Handles smooth transitions between modes) */}
      <motion.div
        className="relative z-10"
        animate={{ 
          y: isProblemas ? 28 : isExceso ? 4 : 18,
          rotate: isProblemas ? 15 : isExceso ? -15 : 0,
          x: isExceso ? 20 : isCrecimiento ? -30 : 0
        }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      >
        {/* Wave Animation (Handles the cyclical motion relative to the mode position) */}
        <motion.div
          animate={{ 
            y: [0, 4, 0],
            rotate: [-1, 1, -1]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: isExceso ? 2 : isCrecimiento ? 8 : isProblemas ? 4 : 6, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: isExceso ? 2.5 : isCrecimiento ? 9 : isProblemas ? 4.5 : 7, ease: "easeInOut" }
          }}
        >
          {/* Rooster Tail for Exceso */}
          <AnimatePresence>
            {isExceso && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.2, 0.9], rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 0.3 }}
                className="absolute top-[-2px] left-[-72px] w-28 h-24 z-0 origin-bottom-right"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 100 C80 80 60 40 40 20 C20 0 0 10 10 30 C20 50 40 80 100 100 Z" fill="white" opacity="0.9" />
                  <path d="M100 100 C70 90 50 60 30 40 C10 20 0 30 15 50 C30 70 50 90 100 100 Z" fill="#bae6fd" opacity="0.8" />
                  <path d="M100 100 C90 70 70 30 50 10 C30 -10 10 0 20 20 C30 40 60 70 100 100 Z" fill="white" opacity="1" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boat SVG */}
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg relative z-10">
            {/* Hull */}
            <path d="M10 80 L40 110 L120 110 L150 80 Z" fill={isDark ? "#e2e8f0" : "#334155"} />
            <path d="M10 80 L40 110 L120 110 L150 80 Z" fill="black" fillOpacity="0.1" />
            
            {/* Problemas: Hole in the hull */}
            {isProblemas && (
              <path d="M90 95 C95 90 105 90 110 95 C115 100 105 110 95 105 C85 100 85 100 90 95 Z" fill={isDark ? "#1e293b" : "#0f172a"} />
            )}

            {/* Cabin - Hide in Crecimiento to show it's under construction */}
            {!isCrecimiento && (
              <>
                <path d="M50 80 L60 40 L110 40 L110 80 Z" fill={isDark ? "#94a3b8" : "#cbd5e1"} />
                <rect x="70" y="50" width="15" height="15" rx="2" fill={isDark ? "#38bdf8" : "#0ea5e9"} />
                <rect x="90" y="50" width="15" height="15" rx="2" fill={isDark ? "#38bdf8" : "#0ea5e9"} />
                <rect x="85" y="20" width="12" height="20" fill={isDark ? "#64748b" : "#94a3b8"} />
              </>
            )}

            {/* Crecimiento: Under construction elements */}
            {isCrecimiento && (
              <>
                {/* Partial cabin base */}
                <path d="M50 80 L55 60 L110 60 L110 80 Z" fill={isDark ? "#94a3b8" : "#cbd5e1"} />
                {/* Scaffolding on boat */}
                <path d="M55 60 L55 40 M80 60 L80 40 M105 60 L105 40" stroke={isDark ? "#f59e0b" : "#d97706"} strokeWidth="2" />
                <path d="M50 50 L110 50 M50 40 L110 40" stroke={isDark ? "#f59e0b" : "#d97706"} strokeWidth="2" />
              </>
            )}

            {/* Stripe */}
            <path d="M15 85 L145 85" stroke={isProblemas ? "#ef4444" : isCrecimiento ? "#3b82f6" : isExceso ? "#a855f7" : "#10b981"} strokeWidth="4" />
          </svg>

          {/* Smoke for Problemas */}
          <AnimatePresence>
            {isProblemas && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -60, scale: 2, x: -30 }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                  className="absolute top-[10px] left-[80px] w-8 h-8 bg-[#3a3a3a] dark:bg-gray-300 rounded-full blur-md z-20"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: [0, 0.6, 0], y: -80, scale: 2.5, x: -40 }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }}
                  className="absolute top-[10px] left-[80px] w-10 h-10 bg-gray-700 dark:bg-gray-400 rounded-full blur-md z-20"
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Natural Water Animation */}
      <div className="absolute bottom-0 left-0 w-full h-[95%] overflow-hidden z-20 pointer-events-none">
        {/* PARÁMETRO REGULABLE: Amplitud de la ola superior (3% de 120px = 3.6) */}
        {(() => {
          const WAVE_AMPLITUDE_TOP = 3.6;
          const peak = 40 - WAVE_AMPLITUDE_TOP;
          const valley = 40 + WAVE_AMPLITUDE_TOP;
          const pathContent = `M0,40 C150,${valley} 350,${peak} 600,40 C850,${valley} 1050,${peak} 1200,40 L1200,120 L0,120 Z`;
          
          return (
            <motion.div
              className="absolute bottom-0 left-0 w-[200%] h-[60%] flex items-end"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: isExceso ? 2 : isCrecimiento ? 8 : isProblemas ? 4 : 6, ease: "linear" }}
            >
              <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className={`w-full h-full ${isDark ? 'fill-blue-500/40' : 'fill-blue-400/50'}`}>
                <path d={pathContent} />
                <path d={pathContent} transform="translate(1200, 0)" />
              </svg>
            </motion.div>
          );
        })()}
        
        
        <motion.div
          className="absolute bottom-[-10px] left-0 w-[200%] h-[50%] flex items-end"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ repeat: Infinity, duration: isExceso ? 3 : isCrecimiento ? 10 : isProblemas ? 5 : 7, ease: "linear" }}
        >
          <svg viewBox="0 0 2400 120" preserveAspectRatio="none" className={`w-full h-full ${isDark ? 'fill-blue-600/60' : 'fill-blue-500/70'}`}>
            <path d="M0,60 C200,40 400,80 600,60 C800,40 1000,80 1200,60 L1200,120 L0,120 Z" />
            <path d="M0,60 C200,40 400,80 600,60 C800,40 1000,80 1200,60 L1200,120 L0,120 Z" transform="translate(1200, 0)" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default function Slide6({ isDark }: { isDark: boolean }) {
  const [activeMode, setActiveMode] = useState(modes[0].id);
  const activeData = modes.find(m => m.id === activeMode)!;

  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      {/* Segmento naranja eliminado */}
      
      <div className="text-center mb-4 shrink-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
          Modos de Respuesta
        </h2>
        <p className={`text-sm max-w-4xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Las personas compran cuando perciben una discrepancia entre su realidad actual y los resultados que desean. Selecciona un modo para ver cómo interactuar con el comprador.
        </p>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 mb-6 shrink-0 z-20">
        {modes.map(mode => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex-1 min-w-[140px] relative overflow-hidden rounded-xl p-3 transition-all duration-300 border ${
                isActive 
                  ? `scale-105 shadow-lg border-transparent ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}` 
                  : `opacity-70 hover:opacity-100 hover:scale-105 border-transparent ${isDark ? 'bg-[#2a2a2a]/50' : 'bg-gray-50'}`
              }`}
            >
              {isActive && <div className={`absolute inset-0 bg-gradient-to-r ${mode.color} opacity-10`}></div>}
              {isActive && <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${mode.color}`}></div>}
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <mode.icon size={20} className={isActive ? mode.cierreColor : (isDark ? 'text-gray-400' : 'text-gray-500')} />
                <span className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{mode.title}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className={`flex-1 rounded-2xl border relative overflow-hidden flex flex-col md:flex-row gap-0 ${isDark ? 'bg-[#2a2a2a]/30 border-[#3a3a3a]' : 'bg-gray-50/50 border-gray-200'}`}>
        
        {/* Left Side: Content */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 h-full"
            >
              <div className={`p-4 rounded-xl border-l-4 ${isDark ? 'bg-[#3a3a3a]/80 border-l-gray-500' : 'bg-white shadow-sm border-l-gray-400'}`} style={{ borderLeftColor: activeMode === 'crecimiento' ? '#3b82f6' : activeMode === 'problemas' ? '#ef4444' : activeMode === 'equilibrio' ? '#10b981' : '#a855f7' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">Percepción</h4>
                <p className={`text-sm md:text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{activeData.percepcion}</p>
              </div>
              
              <div className={`p-4 rounded-xl border-l-4 ${isDark ? 'bg-[#3a3a3a]/80 border-l-gray-500' : 'bg-white shadow-sm border-l-gray-400'}`} style={{ borderLeftColor: activeMode === 'crecimiento' ? '#3b82f6' : activeMode === 'problemas' ? '#ef4444' : activeMode === 'equilibrio' ? '#10b981' : '#a855f7' }}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">Actitud</h4>
                <p className={`text-sm md:text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{activeData.actitud}</p>
              </div>
              
              <div className={`p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-[#3a3a3a]/80' : 'bg-white shadow-sm'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Probabilidad de Cierre</h4>
                <span className={`text-2xl font-black uppercase ${activeData.cierreColor}`}>{activeData.cierre}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Boat Animation */}
        <div className="flex-1 min-h-[200px] md:min-h-0 relative border-t md:border-t-0 md:border-l border-gray-200 dark:border-[#3a3a3a]">
          <BoatScene mode={activeMode} isDark={isDark} />
        </div>

      </div>
    </div>
  );
}
