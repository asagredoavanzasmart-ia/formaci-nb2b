import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Users, Brain, Filter, ShieldAlert, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideICPContent({ isDark }: { isDark: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 'que-es',
      icon: Target,
      title: '¿Qué es?',
      content: (
        <ul className={`space-y-4 text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <li className="flex items-start gap-3">
            <span className="text-[#ff851d] mt-1 text-lg">•</span>
            <span>No es un cliente perfecto de la vida real (eso no existe).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#ff851d] mt-1 text-lg">•</span>
            <span>Es un <strong>estándar o modelo compuesto</strong> que tú mismo creas para medir a tus clientes actuales y potenciales.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#ff851d] mt-1 text-lg">•</span>
            <span>Ayuda a identificar a los mejores prospectos, <strong>descartar a los malos</strong> (hasta el 35% de las oportunidades) y anticipar dificultades.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#ff851d] mt-1 text-lg">•</span>
            <span>Asegura que enfoques tus recursos limitados en cuentas con altas probabilidades de relación a largo plazo.</span>
          </li>
        </ul>
      )
    },
    {
      id: 'como-se-define',
      icon: Brain,
      title: '¿Cómo se define?',
      content: (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-base font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              <Users size={20} className="text-[#ff851d]" /> Demografía
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Datos objetivos y mensurables (tamaño de empresa, usuarios finales, ubicación, antigüedad de equipos).
            </p>
          </div>
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-base font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              <Brain size={20} className="text-[#ef375c]" /> Psicografía
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Valores, actitudes y cultura corporativa (estándares éticos, apertura a la innovación, trato a empleados). <strong className="text-[#ff851d]">Crucial para el éxito.</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'como-se-usa',
      icon: Filter,
      title: '¿Cómo se usa? (Screening y Alerta Temprana)',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          <div className={`p-5 rounded-2xl border flex flex-col justify-center ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a]' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-base font-bold mb-3 text-[#ff851d]`}>1. Clasificar y Puntuar</h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Mides un prospecto frente a tus 5 características ideales, otorgando una puntuación de -5 a +5 en cada rubro.
            </p>
          </div>
          <div className={`p-5 rounded-2xl border flex flex-col justify-center ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a]' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-base font-bold mb-3 text-[#ef375c]`}>2. Toma de Decisiones</h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Mayor puntuación = mayor probabilidad de éxito. Si el ajuste es terrible, <strong>descarta la cuenta</strong> para no perder tiempo.
            </p>
          </div>
          <div className={`p-5 rounded-2xl border flex flex-col justify-center ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a]' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-base font-bold mb-3 flex items-center gap-2 text-[#ff851d]`}>
              <ShieldAlert size={18} /> 3. Anticipar Problemas
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Si mantienes una cuenta con puntaje bajo, usa las áreas negativas para predecir obstáculos y ajustar tu estrategia.
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className={`p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="shrink-0 mb-8 z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-4">
          El Perfil del Cliente Ideal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">(ICP)</span>
        </h2>
        <p className={`text-sm md:text-base max-w-3xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          El quinto Elemento Clave de la estrategia de ventas. Diseñado para filtrar oportunidades y evitar perder tiempo en negocios que no resultarán en un "Ganar-Ganar".
        </p>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 relative z-10 flex flex-col min-h-0">
        <div className={`flex-1 rounded-3xl border p-6 md:p-10 flex flex-col relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6 shrink-0">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg">
                  {React.createElement(slides[currentIndex].icon, { size: 28 })}
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {slides[currentIndex].title}
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col justify-center">
                {slides[currentIndex].content}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-6 shrink-0">
          <button 
            onClick={prevSlide}
            className={`p-3 rounded-full transition-colors flex items-center justify-center ${isDark ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#3a3a3a]' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] w-8' : isDark ? 'bg-gray-600 w-2.5 hover:bg-gray-500' : 'bg-gray-300 w-2.5 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className={`p-3 rounded-full transition-colors flex items-center justify-center ${isDark ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#3a3a3a]' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
