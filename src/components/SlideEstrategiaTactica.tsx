import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Zap, Info } from 'lucide-react';

export default function SlideEstrategiaTactica({ isDark }: { isDark: boolean }) {
  const [activeSection, setActiveSection] = useState<'tactica' | 'estrategia' | null>(null);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-4 z-10 shrink-0">
        Estrategia <span className="text-[#ef375c]">vs</span> Táctica
      </h2>
      <p className={`text-sm md:text-base mb-6 z-10 shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Interactúa con el gráfico para descubrir las diferencias clave. Un buen plan táctico es tan bueno como la estrategia que lo precedió.
      </p>

      {/* Content Area - Split Layout */}
      <div className="flex-1 relative z-10 flex flex-col md:flex-row gap-8 items-center justify-center min-h-0">
        
        {/* Left: Interactive 3D SVG Pyramid */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative shrink-0 max-w-sm">
          
          {/* HTML Labels to avoid SVG text overlap */}
          <div className={`absolute top-[15%] left-[10%] font-bold text-sm md:text-base transition-opacity duration-300 ${activeSection === 'tactica' ? 'opacity-100 text-[#ef375c]' : 'opacity-40 text-gray-500'}`}>
            Táctica
          </div>
          <div className={`absolute bottom-[20%] right-[5%] font-bold text-sm md:text-base transition-opacity duration-300 ${activeSection === 'estrategia' ? 'opacity-100 text-gray-800 dark:text-gray-200' : 'opacity-40 text-gray-500'}`}>
            Estrategia
          </div>

          <svg viewBox="0 0 300 350" className="w-full h-full drop-shadow-2xl overflow-visible">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="15" stdDeviation="15" floodOpacity={isDark ? "0.5" : "0.2"} />
              </filter>
            </defs>
            
            {/* Estrategia (Base 3D Frustum) */}
            <motion.g
              initial={{ opacity: 0.9 }}
              whileHover={{ scale: 1.02, filter: "url(#glow)" }}
              animate={{
                scale: activeSection === 'estrategia' ? 1.05 : 1,
                opacity: activeSection === 'estrategia' ? 1 : (activeSection === 'tactica' ? 0.3 : 0.9),
                filter: activeSection === 'estrategia' ? "url(#shadow) url(#glow)" : "url(#shadow)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onMouseEnter={() => setActiveSection('estrategia')}
              onMouseLeave={() => setActiveSection(null)}
              className="cursor-pointer"
              style={{ transformOrigin: '150px 220px' }}
            >
              {/* Top Face (Inner depth) */}
              <path d="M 150,130 L 70,165 L 150,200 L 230,165 Z" fill="#ff851d" stroke="#ff983f" strokeWidth="1" />
              {/* Left Face */}
              <path d="M 70,165 L 150,200 L 150,290 L 70,240 Z" fill="#ef375c" stroke="#f45b7a" strokeWidth="1" />
              {/* Right Face */}
              <path d="M 150,200 L 230,165 L 230,240 L 150,290 Z" fill="#c41e3d" stroke="#d92547" strokeWidth="1" />
            </motion.g>

            {/* Táctica (Top 3D Pyramid) */}
            <motion.g
              initial={{ opacity: 0.9, y: 0 }}
              whileHover={{ scale: 1.05, y: -15, filter: "url(#glow)" }}
              animate={{
                scale: activeSection === 'tactica' ? 1.08 : 1,
                y: activeSection === 'tactica' ? -15 : 0,
                opacity: activeSection === 'tactica' ? 1 : (activeSection === 'estrategia' ? 0.3 : 0.9),
                filter: activeSection === 'tactica' ? "url(#shadow) url(#glow)" : "url(#shadow)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onMouseEnter={() => setActiveSection('tactica')}
              onMouseLeave={() => setActiveSection(null)}
              className="cursor-pointer"
              style={{ transformOrigin: '150px 100px' }}
            >
              {/* Left Face */}
              <path d="M 150,30 L 90,115 L 150,140 Z" fill={isDark ? "#4b5563" : "#9ca3af"} stroke={isDark ? "#6b7280" : "#d1d5db"} strokeWidth="1" />
              {/* Right Face */}
              <path d="M 150,30 L 210,115 L 150,140 Z" fill={isDark ? "#374151" : "#6b7280"} stroke={isDark ? "#4b5563" : "#9ca3af"} strokeWidth="1" />
            </motion.g>
          </svg>
        </div>

        {/* Right: Dynamic Info Panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {!activeSection && (
              <motion.div
                key="default"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 md:p-8 rounded-3xl border flex flex-col items-center text-center shadow-inner ${isDark ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}
              >
                <Info size={48} className={`mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Pasa el cursor sobre el gráfico</h3>
                <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Descubre por qué no puedes improvisar en ventas complejas. Necesitas hacer tu "tarea" (estrategia) antes de intentar usar tu encanto o tus habilidades de cierre (táctica) frente al cliente.
                </p>
              </motion.div>
            )}

            {activeSection === 'tactica' && (
              <motion.div
                key="tactica"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 md:p-8 rounded-3xl border shadow-xl ${isDark ? 'bg-[#2a2a2a] border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl shadow-md ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'}`}>
                    <Zap size={28} />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Táctica</h3>
                </div>
                <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Son las habilidades que usas cuando estás <strong>frente al cliente</strong>. Es la parte visible de la venta.
                </p>
                <div className="space-y-4">
                  {[
                    'El qué - Acciones concretas',
                    'Visible - Cara a cara con el cliente',
                    'Inmediato: Resultado en la reunión',
                    'Presentaciones y demostraciones',
                    'Manejo de objeciones y cierres'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isDark ? 'bg-gray-500' : 'bg-gray-600'}`}></div>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'estrategia' && (
              <motion.div
                key="estrategia"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 md:p-8 rounded-3xl border shadow-xl ${isDark ? 'bg-[#2a2a2a] border-[#ef375c]/50' : 'bg-white border-[#ef375c]/30'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Estrategia</h3>
                </div>
                <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Es todo lo que haces <strong>antes de llegar a esa reunión</strong>. Es el plan para posicionarte con las personas correctas en el momento correcto.
                </p>
                <div className="space-y-4">
                  {[
                    'El cómo - El plan Global',
                    'Trabajo en la oficina (Preparación)',
                    'A largo plazo',
                    'Planificación antes del contacto',
                    'Análisis de Influencias de Compra'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] shrink-0"></div>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
