import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Flag, Activity, Trophy, Clock, ChevronRight, Target } from 'lucide-react';

const pillars = [
  { 
    id: 'influencias', 
    title: 'I. Roles de Influencia', 
    subtitle: 'Buying Influences',
    icon: Users, 
    description: 'Consiste en identificar y cubrir a todas las personas que pueden aprobar o vetar la venta. En cada venta compleja existen cuatro roles que deben ser convencidos:',
    bullets: ['Comprador Económico (libera fondos)', 'Compradores Usuarios (juzgan impacto)', 'Compradores Técnicos (filtran opciones)', 'Coach (te guía internamente)']
  },
  {
    id: 'icp_def',
    title: 'II. ICP + OFERTA',
    subtitle: 'Ideal Customer Profile & Offer',
    icon: Target,
    description: 'Identificar con precisión a qué empresas debemos dedicar nuestro esfuerzo estratégico y diseñar una propuesta de valor irresistible.',
    bullets: ['Definir criterios de segmentación', 'Identificar triggers de compra', 'Alinear solución con el negocio', 'Construir oferta de alto impacto']
  },
  { 
    id: 'banderas', 
    title: 'III. Red Flags y Problemas', 
    subtitle: 'Banderas Rojas y Fortalezas',
    icon: Flag, 
    description: 'Es un sistema de alerta temprana. Consiste en identificar cualquier área de incertidumbre, peligro o falta de información en tu venta (Bandera Roja).',
    bullets: ['Identificar áreas de peligro', 'Reconocer falta de información', 'Utilizar puntos fuertes estratégicamente', 'Eliminar o reducir riesgos']
  },
  { 
    id: 'modos', 
    title: 'IV. Modos de Respuesta', 
    subtitle: 'Response Modes',
    icon: Activity, 
    description: 'Evaluar la receptividad de cada comprador. Las personas solo compran cuando perciben una discrepancia entre su realidad actual y lo que desean.',
    bullets: ['Modo Crecimiento', 'Modo Problemas', 'Modo Equilibrio', 'Exceso de Confianza']
  },
  {
    id: 'proceso',
    title: 'V. El Proceso Comercial',
    subtitle: 'Sales Process',
    icon: Clock,
    description: 'La gestión eficiente de tus recursos y tiempo a lo largo de todo el ciclo de vida de la oportunidad.',
    bullets: ['Gestionar el tiempo', 'Priorizar objetivos', 'Clasificar oportunidades', 'Mantenerte vigente durante el ciclo']
  }
];

export default function SlidePilaresEstrategia({ isDark }: { isDark: boolean }) {
  const [activeId, setActiveId] = useState(pillars[0].id);

  const activePillar = pillars.find(p => p.id === activeId) || pillars[0];

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-gray-500/10 to-gray-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="shrink-0 mb-6 z-10">
        <h2 className={`text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Los 5 Pilares de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Estrategia</span>
        </h2>
        <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Explora los fundamentos para dominar la venta compleja. Selecciona un pilar para ver los detalles.
        </p>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 z-10 min-h-0">

        {/* Left: Vertical Tabs */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
          {pillars.map((pillar) => {
            const isActive = activeId === pillar.id;
            const Icon = pillar.icon;

            return (
              <button
                key={pillar.id}
                onClick={() => setActiveId(pillar.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? (isDark ? 'bg-[#2a2a2a] border-[#ff851d] shadow-md' : 'bg-orange-50 border-[#ff851d] shadow-md')
                    : (isDark ? 'bg-[#222] border-[#333] hover:border-gray-500' : 'bg-white border-gray-100 hover:border-gray-300')
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 transition-colors duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30'
                    : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-100 text-gray-500'
                }`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-sm mt-0.5 ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
                    {pillar.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Dynamic Content Panel */}
        <div className="w-full md:w-2/3 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {activePillar && (
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col justify-center h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg`}>
                    <activePillar.icon size={32} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activePillar.title}
                    </h3>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activePillar.subtitle}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {activePillar.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.bullets.map((bullet, idx) => (
                      <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-100'}`}>
                        <ChevronRight size={18} className="text-[#ff851d] shrink-0 mt-0.5" />
                        <span className={`text-sm md:text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
