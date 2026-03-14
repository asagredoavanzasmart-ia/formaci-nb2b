import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Handshake, TrendingDown, Swords, XCircle, Info } from 'lucide-react';

const quadrants = [
  {
    id: 'win-win',
    title: 'YO GANO / TÚ GANAS',
    subtitle: 'Estable / Lealtad',
    description: 'Ambas partes obtienen valor. Se construye una relación a largo plazo basada en la confianza. Es crucial conocer el "Win" personal de cada influenciador, que no siempre es dinero (puede ser reconocimiento, menor riesgo, eficiencia). Es el único modelo sostenible.',
    gradient: 'from-[#ff851d] to-[#ef375c]',
    defaultBgDark: 'bg-[#2a2a2a] border-[#444]',
    defaultBgLight: 'bg-gray-50 border-gray-300',
    gridPos: 'col-start-1 row-start-1',
    delay: 0.2,
    icon: Handshake,
    isPrimary: true
  },
  {
    id: 'lose-win',
    title: 'YO PIERDO / TÚ GANAS',
    subtitle: 'Insostenible',
    description: 'Cedes demasiado para cerrar el trato. A corto plazo parece una victoria para el cliente, pero a largo plazo daña tu rentabilidad y capacidad de servicio.',
    gradient: 'from-gray-600 to-gray-700',
    defaultBgDark: 'bg-[#2a2a2a] border-[#444]',
    defaultBgLight: 'bg-gray-50 border-gray-300',
    gridPos: 'col-start-2 row-start-1',
    delay: 0.6,
    icon: TrendingDown,
    isPrimary: false
  },
  {
    id: 'win-lose',
    title: 'YO GANO / TÚ PIERDES',
    subtitle: 'Venganza futura',
    description: 'Maximizas tu beneficio a expensas del cliente. Genera resentimiento, daña la reputación y asegura que el cliente buscará alternativas en el futuro.',
    gradient: 'from-gray-600 to-gray-700',
    defaultBgDark: 'bg-[#2a2a2a] border-[#444]',
    defaultBgLight: 'bg-gray-50 border-gray-300',
    gridPos: 'col-start-1 row-start-2',
    delay: 0.4,
    icon: Swords,
    isPrimary: false
  },
  {
    id: 'lose-lose',
    title: 'YO PIERDO / TÚ PIERDES',
    subtitle: 'Sin trato',
    description: 'Ninguna de las partes obtiene lo que necesita. Suele ocurrir cuando las negociaciones se vuelven adversariales o se pierde el enfoque en el valor mutuo.',
    gradient: 'from-gray-600 to-gray-700',
    defaultBgDark: 'bg-[#2a2a2a] border-[#444]',
    defaultBgLight: 'bg-gray-50 border-gray-300',
    gridPos: 'col-start-2 row-start-2',
    delay: 0.8,
    icon: XCircle,
    isPrimary: false
  }
];

export default function Slide13({ isDark }: { isDark: boolean }) {
  const [activeId, setActiveId] = useState<string>('win-win');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayId = hoveredId || activeId;
  const activeQuadrant = quadrants.find(q => q.id === displayId) || quadrants[0];

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col h-full">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-6 shrink-0"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            La Filosofía <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Ganar-Ganar</span>
          </h2>
          <p className={`text-sm md:text-base max-w-4xl mx-auto font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            El objetivo no es vencer al comprador, sino crear una empresa conjunta donde cada uno de los 4 roles sienta que ha ganado personalmente.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
          
          {/* Diamond Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] shrink-0"
          >
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 transform rotate-45 gap-2 md:gap-3">
              {quadrants.map((q) => {
                const isActive = displayId === q.id;
                const isSelected = activeId === q.id;
                const Icon = q.icon;
                
                return (
                  <motion.button
                    key={q.id}
                    onClick={() => setActiveId(q.id)}
                    onMouseEnter={() => setHoveredId(q.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    initial={{ opacity: 0, x: q.gridPos.includes('col-start-1') ? -20 : 20, y: q.gridPos.includes('row-start-1') ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: q.delay }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      ${q.gridPos} flex flex-col items-center justify-center text-center p-2 md:p-4 border-2 transition-all duration-300 cursor-pointer shadow-lg
                      ${q.isPrimary 
                        ? `bg-gradient-to-br ${q.gradient} border-transparent shadow-red-500/30` 
                        : isActive 
                          ? `bg-gradient-to-br ${isDark ? 'from-gray-700 to-gray-600' : 'from-gray-200 to-gray-300'} border-transparent shadow-black/20` 
                          : `${isDark ? q.defaultBgDark : q.defaultBgLight} hover:border-gray-400`
                      }
                      ${isSelected && !q.isPrimary ? (isDark ? 'border-gray-400' : 'border-gray-500') : 'border-transparent'}
                    `}
                  >
                    <div className="transform -rotate-45 flex flex-col items-center justify-center w-full h-full">
                      <Icon 
                        size={24} 
                        className={`mb-1 transition-colors duration-300 ${
                          q.isPrimary ? 'text-white' : isActive ? (isDark ? 'text-white' : 'text-gray-800') : (isDark ? 'text-gray-400' : 'text-gray-500')
                        }`} 
                      />
                      <span className={`font-bold text-sm mb-1 leading-tight transition-colors duration-300 ${
                        q.isPrimary ? 'text-white' : isActive ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-300' : 'text-gray-700')
                      }`} dangerouslySetInnerHTML={{ __html: q.title.replace(' / ', ' /<br/>') }}></span>
                      <span className={`text-sm transition-colors duration-300 ${
                        q.isPrimary ? 'text-white/90' : isActive ? (isDark ? 'text-gray-300' : 'text-gray-600') : (isDark ? 'text-gray-500' : 'text-gray-400')
                      }`}>({q.subtitle})</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Info Panel */}
          <div className="w-full md:w-[420px] shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuadrant.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className={`p-5 md:p-6 rounded-2xl border ${
                  activeQuadrant.isPrimary 
                    ? `bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 border-[#ef375c]/30 ${isDark ? 'shadow-[0_0_30px_rgba(239,55,92,0.15)]' : 'shadow-[0_0_30px_rgba(239,55,92,0.1)]'}` 
                    : isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${
                    activeQuadrant.isPrimary 
                      ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30' 
                      : isDark ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700 shadow-sm border border-gray-200'
                  }`}>
                    <activeQuadrant.icon size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg md:text-xl leading-tight ${
                      activeQuadrant.isPrimary 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]' 
                        : isDark ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      {activeQuadrant.title.replace(' / ', ' / ')}
                    </h3>
                    <span className={`text-sm font-medium ${
                      activeQuadrant.isPrimary ? 'text-[#ef375c]' : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {activeQuadrant.subtitle}
                    </span>
                  </div>
                </div>
                
                <div className={`h-px w-full mb-4 ${
                  activeQuadrant.isPrimary ? 'bg-gradient-to-r from-[#ff851d]/30 to-[#ef375c]/30' : isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
                
                <p className={`text-sm md:text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {activeQuadrant.description}
                </p>

                {activeQuadrant.isPrimary && (
                  <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5">
                    <Info size={18} className="text-[#ef375c] shrink-0 mt-0.5" />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Este es el único cuadrante que garantiza el éxito a largo plazo y fomenta referencias positivas.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
