import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, DollarSign, Briefcase, Star, Target, 
  MapPin, HelpCircle, Crown, 
  CheckCircle2, MessageCircle, Compass, AlertTriangle, User
} from 'lucide-react';

export default function SlideIdentificarComprador({ isDark }: { isDark: boolean }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 0, title: '1. Factor de Flotación', icon: TrendingUp },
    { id: 1, title: '2. Preguntas de Ubicación', icon: MapPin },
    { id: 2, title: '3. Confirmación', icon: CheckCircle2 }
  ];

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="shrink-0 mb-4 z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
          Identificando al <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Comprador Económico</span>
        </h2>
        <div className={`p-3 md:p-4 rounded-xl border-l-4 border-[#ff851d] flex items-start gap-3 ${isDark ? 'bg-[#2a2a2a]' : 'bg-orange-50'}`}>
          <AlertTriangle size={20} className="text-[#ff851d] shrink-0 mt-0.5" />
          <p className={`text-sm md:text-base leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Tiene la autoridad final para liberar fondos y vetar. <strong>No es estático:</strong> la persona que asume este rol cambia dependiendo del objetivo de venta específico.
          </p>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex gap-2 md:gap-4 mb-4 z-10 shrink-0 border-b border-gray-200 dark:border-gray-800 pb-3 overflow-x-auto custom-scrollbar">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 whitespace-nowrap text-sm ${
              activeStep === step.id 
                ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-[#ef375c]/30' 
                : isDark ? 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]' : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <step.icon size={16} />
            {step.title}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative z-10 overflow-hidden flex flex-col min-h-0">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Factor de Flotación */}
          {activeStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-center"
            >
              <p className={`text-sm md:text-base mb-4 text-center max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                El nivel jerárquico del Comprador Económico subirá o bajará en el organigrama dependiendo del <strong>nivel de riesgo percibido</strong>. Variables que lo hacen "flotar":
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 items-center flex-1 min-h-0">
                {/* Visual Animation for Flotation Factor */}
                <div className="w-24 md:w-32 h-48 md:h-64 border-2 border-gray-300 dark:border-gray-600 rounded-full relative flex justify-center shrink-0 overflow-hidden bg-gray-50 dark:bg-[#222]">
                  {/* Levels */}
                  <div className="absolute w-full h-full flex flex-col justify-between py-4 opacity-50">
                    <div className="w-full border-t-2 border-dashed border-gray-400"></div>
                    <div className="w-full border-t-2 border-dashed border-gray-400"></div>
                    <div className="w-full border-t-2 border-dashed border-gray-400"></div>
                  </div>
                  
                  {/* Floating Element */}
                  <motion.div 
                    animate={{ y: [0, 120, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#ff851d] to-[#ef375c] rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/30 z-10 relative"
                  >
                    <User size={28} />
                    <div className="absolute -bottom-1 -right-1 bg-white text-[#ef375c] rounded-full p-0.5 shadow-sm">
                      <DollarSign size={14} strokeWidth={3} />
                    </div>
                  </motion.div>
                </div>

                {/* Grid of Variables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0 w-full">
                {[
                  { icon: DollarSign, title: 'Presupuesto', desc: 'A mayor cantidad de dinero (en relación con el tamaño de la empresa), más alto estará el tomador de decisión.' },
                  { icon: Briefcase, title: 'Condiciones del negocio', desc: 'En tiempos económicos difíciles, decisiones que tomarían mandos medios pasan a los directivos.' },
                  { icon: Star, title: 'Experiencia previa', desc: 'Si es la primera vez que hacen negocios contigo, o tu solución es nueva, el riesgo aumenta y la decisión sube.' },
                  { icon: Target, title: 'Impacto organizacional', desc: 'Si tu propuesta afectará profundamente su crecimiento o estabilidad a largo plazo, el rol subirá de nivel.' }
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex gap-3 items-start shadow-sm transition-all hover:shadow-md ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100'}`}>
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#ff851d]/20 to-[#ef375c]/20 shrink-0">
                      <item.icon size={20} className="text-[#ef375c]" />
                    </div>
                    <div>
                      <h4 className={`text-sm md:text-base font-bold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{item.title}</h4>
                      <p className={`text-xs md:text-sm leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Preguntas de Ubicación */}
          {activeStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-center items-center gap-4 md:gap-6"
            >
              <p className={`text-sm md:text-base text-center max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Antes de buscar nombres, busca el nivel jerárquico adecuado haciéndote estas dos preguntas clave:
              </p>

              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 md:p-6 rounded-2xl border relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#ff851d]"></div>
                  <HelpCircle size={24} className="text-[#ff851d] mb-3" />
                  <p className={`text-sm md:text-base font-medium italic mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    "¿En qué nivel jerárquico dentro de mi propia empresa tendría que tomarse una decisión de este tipo y monto?"
                  </p>
                  <p className={`text-xs md:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    (Ajustando siempre por la diferencia de tamaño entre tu empresa y la del cliente).
                  </p>
                </div>

                <div className={`p-5 md:p-6 rounded-2xl border relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#ef375c]"></div>
                  <HelpCircle size={24} className="text-[#ef375c] mb-3" />
                  <p className={`text-sm md:text-base font-medium italic ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    "Considerando el nivel de riesgo percibido, ¿debería buscar más arriba o más abajo en la jerarquía?"
                  </p>
                </div>
              </div>

              <div className={`w-full max-w-4xl p-4 md:p-5 rounded-2xl flex items-center gap-4 shadow-lg ${isDark ? 'bg-gradient-to-r from-yellow-900/40 to-yellow-700/20 border border-yellow-700/50' : 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200'}`}>
                <div className="p-3 rounded-full bg-yellow-500 text-white shrink-0 shadow-md">
                  <Crown size={24} />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-yellow-700 dark:text-yellow-500 mb-1">Regla de Oro</h4>
                  <p className={`text-xs md:text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Por precaución, intenta cubrir tus bases <strong>un nivel por encima</strong> de donde crees inicialmente que se encuentra el Comprador Económico.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Confirmación */}
          {activeStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-center gap-3 md:gap-4"
            >
              <p className={`text-sm text-center max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Una vez que sospeches quién es, <strong>nunca asumas</strong> que tienes a la persona correcta sin verificarlo. Existen dos maneras efectivas de confirmarlo:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1 min-h-0">
                {/* Indirect Questions */}
                <div className={`p-4 md:p-5 rounded-3xl border flex flex-col h-full ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <h3 className={`text-sm md:text-base font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      Preguntas Indirectas
                    </h3>
                  </div>
                  <p className={`text-[11px] md:text-xs mb-3 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Muchos Compradores Técnicos mienten afirmando tener la decisión final. Para descubrir la verdad sin confrontaciones, haz preguntas sobre el proceso al "sospechoso":
                  </p>
                  <div className={`p-3 rounded-xl space-y-2 ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'}`}>
                    <p className={`text-[11px] md:text-xs italic font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      "¿De qué presupuesto saldrán los fondos?"
                    </p>
                    <p className={`text-[11px] md:text-xs italic font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      "¿Cómo funciona el proceso de decisión final?"
                    </p>
                    <p className={`text-[11px] md:text-xs italic font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      "¿Hay alguien a nivel directivo cuya aprobación necesitemos?"
                    </p>
                  </div>
                </div>

                {/* The Coach */}
                <div className={`p-4 md:p-5 rounded-3xl border flex flex-col h-full relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#ef375c]/30' : 'bg-white border-[#ef375c]/30 shadow-md'}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#ef375c]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30 shrink-0">
                      <Compass size={20} />
                    </div>
                    <h3 className={`text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]`}>
                      Acudir a tu Coach
                    </h3>
                  </div>
                  <p className={`text-[11px] md:text-xs mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'} relative z-10`}>
                    <strong>Esta es la mejor ruta.</strong>
                  </p>
                  <p className={`text-[11px] md:text-xs leading-relaxed flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'} relative z-10`}>
                    Un buen Coach que tenga credibilidad y que quiera que ganes la venta podrá darte información clara y precisa sobre quién tiene realmente el poder de liberar el dinero.
                  </p>
                  <div className={`mt-3 p-2 rounded-xl flex items-center gap-2 ${isDark ? 'bg-[#3a3a3a] text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
                    <CheckCircle2 size={16} className="shrink-0 text-[#ef375c]" />
                    <p className="text-[11px] md:text-xs font-medium">
                      Evita que pierdas tiempo con falsos tomadores de decisiones.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
