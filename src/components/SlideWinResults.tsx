import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Heart, Link, Shield, MessageCircle, BookOpen } from 'lucide-react';

export default function SlideWinResults({ isDark }: { isDark: boolean }) {
  const [activeId, setActiveId] = useState('objetivas');
  const [viewMode, setViewMode] = useState<'concepto' | 'preguntas'>('concepto');

  const questions = [
    {
      id: 'objetivas',
      title: 'Preguntas Objetivas',
      subtitle: 'Para descubrir los Resultados',
      icon: Target,
      color: 'from-[#ff851d] to-[#ef375c]',
      desc: 'Se enfocan en los hechos y en las necesidades operativas de la empresa. Su objetivo es identificar cómo tu producto afectará un proceso comercial. Buscan cuantificar el problema y establecer métricas de éxito claras.',
      questions: [
        '¿Qué proceso de negocio específico necesitan mejorar o arreglar con esta solución?',
        '¿Cuáles son los criterios medibles y los KPI que se van a usar para evaluar el éxito de este proyecto?',
        'Desde el punto de vista de su departamento, ¿qué impacto funcional necesitan ver para considerar que la inversión valió la pena?'
      ]
    },
    {
      id: 'actitud',
      title: 'Preguntas de Actitud',
      subtitle: 'Para descubrir las Ganancias',
      icon: Heart,
      color: 'from-orange-400 to-red-400',
      desc: 'Dado que las Ganancias son intangibles y subjetivas, rara vez se descubren preguntando por datos. Revelan cómo se siente la persona, sus miedos, aspiraciones y motivaciones personales detrás de la compra.',
      questions: [
        '¿Qué opinan de este sistema a nivel personal?',
        '¿Se sienten cómodos con la forma en que esta solución va a funcionar para su área?',
        '¿Me podría comentar cómo se siente con respecto a la propuesta y el cambio que implica?'
      ]
    },
    {
      id: 'internas',
      title: 'Preguntas Internas',
      subtitle: 'Para conectar Resultados y Ganancias',
      icon: Link,
      color: 'from-gray-600 to-gray-700',
      desc: 'Una vez que has hablado con el cliente, debes hacerte estas preguntas a ti mismo para construir el "Ganancia-Resultado" (Win-Result) definitivo. Es el puente entre el valor corporativo y el valor personal.',
      questions: [
        'Si mi producto o servicio entrega este Resultado, ¿Qué gana personalmente este Influenciador de Compra?',
        'Dados los Resultados empresariales que podemos ofrecer, ¿cómo puede este comprador satisfacer su propio interés personal?'
      ]
    },
    {
      id: 'coach',
      title: 'Preguntas para tu Coach',
      subtitle: 'Para descubrir motivos ocultos',
      icon: Shield,
      color: 'from-gray-500 to-gray-700',
      desc: 'A veces, los compradores ocultan sus verdaderos motivos personales por política o desconfianza. En esos casos, debes acudir a tu Coach interno para que te guíe y te revele el mapa político real.',
      questions: [
        '¿Qué resultados específicos debería enfatizar con [Influenciador] para mostrarle qué hay en esta venta que le pueda traer algún beneficio?',
        'Basado en lo que conoces de su forma de trabajo, ¿cómo crees que [Influenciador] podría sentir un triunfo personal en este proyecto?'
      ]
    }
  ];

  const activeData = questions.find(q => q.id === activeId) || questions[0];

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="shrink-0 mb-4 z-10 text-center">
        <h2 className="text-xl md:text-3xl font-bold mb-1">
          Descubriendo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Resultados y Ganancias</span>
        </h2>
        <p className={`text-[11px] md:text-xs max-w-4xl mx-auto leading-tight ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Alterna entre el concepto teórico y los ejemplos prácticos.
        </p>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 z-10 min-h-0">
        
        {/* Left Column: Categories */}
        <div className="w-full md:w-1/3 flex flex-col gap-3 shrink-0">
          {questions.map((q) => {
            const isActive = activeId === q.id;
            const Icon = q.icon;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setActiveId(q.id);
                  setViewMode('concepto'); // Reset to concept view when changing category
                }}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left ${
                  isActive 
                    ? isDark 
                      ? 'bg-[#2a2a2a] border-[#4a4a4a] shadow-lg' 
                      : 'bg-white border-gray-300 shadow-lg'
                    : isDark 
                      ? 'bg-[#1e1e1e] border-[#2a2a2a] hover:bg-[#252525]' 
                      : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${q.color} text-white shadow-md` 
                    : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className={`font-bold text-[11px] md:text-xs ${isActive ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                    {q.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Content & Toggle */}
        <div className={`flex-1 flex flex-col rounded-3xl border p-6 md:p-8 relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200 shadow-sm'}`}>
          
          {/* Category Header inside Right Panel */}
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className={`p-3 rounded-xl text-white shadow-lg bg-gradient-to-br ${activeData.color}`}>
              <activeData.icon size={24} />
            </div>
            <div>
              <h3 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeData.title}
              </h3>
            </div>
          </div>

          {/* Custom Toggle Switch */}
          <div className={`flex p-1 rounded-lg w-full max-w-xs mb-4 shrink-0 ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
            <button 
              onClick={() => setViewMode('concepto')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                viewMode === 'concepto' 
                  ? isDark ? 'bg-[#3a3a3a] text-white shadow-md' : 'bg-white text-gray-900 shadow-sm' 
                  : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen size={18} /> Concepto
            </button>
            <button 
              onClick={() => setViewMode('preguntas')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                viewMode === 'preguntas' 
                  ? isDark ? 'bg-[#3a3a3a] text-white shadow-md' : 'bg-white text-gray-900 shadow-sm' 
                  : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageCircle size={18} /> Ejemplos
            </button>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {viewMode === 'concepto' ? (
                <motion.div
                  key="concepto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className={`p-6 md:p-8 rounded-2xl border-l-4 ${isDark ? 'bg-[#1e1e1e] border-[#ff851d]' : 'bg-orange-50/50 border-[#ff851d]'}`}>
                    <p className={`text-lg md:text-xl leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activeData.desc}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preguntas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-center gap-3 overflow-y-auto custom-scrollbar pr-2 py-4"
                >
                  {activeData.questions.map((question, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`mt-0.5 shrink-0 ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`}>
                        <MessageCircle size={18} />
                      </div>
                      <p className={`text-sm md:text-base leading-snug italic font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        "{question}"
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
