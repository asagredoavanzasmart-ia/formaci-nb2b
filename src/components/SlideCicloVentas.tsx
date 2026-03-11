import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, History, Filter, Calculator, Target, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SlideCicloVentas({ isDark }: { isDark: boolean }) {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps = [
    {
      id: 's1',
      num: '1',
      title: 'Revisa tu historial',
      icon: History,
      desc: 'Analiza las ventas que has realizado en el último año o en los últimos dos años. Necesitas una muestra representativa de tu trabajo.',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 's2',
      num: '2',
      title: 'Mide el tiempo',
      icon: Clock,
      desc: 'Considera cuánto tiempo tomó cada venta desde el primer contacto (prospección) hasta conseguir la firma final (cierre).',
      color: 'from-gray-400 to-gray-500'
    },
    {
      id: 's3',
      num: '3',
      title: 'Elimina las anomalías',
      icon: Filter,
      desc: 'Descarta renovaciones automáticas sin esfuerzo, pedidos atípicos ultrarrápidos y ventas excesivamente largas por condiciones extraordinarias.',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 's4',
      num: '4',
      title: 'Calcula el promedio',
      icon: Calculator,
      desc: 'Toma el tiempo de todas las ventas restantes (tu volumen regular) y saca el promedio. Ese número resultante es tu ciclo normal de ventas.',
      color: 'from-[#ff851d] to-[#ef375c]'
    }
  ];

  const activeStepData = steps.find(s => s.id === activeStep);

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="shrink-0 mb-6 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            El <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Ciclo Normal</span> de Ventas
          </h2>
          <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            El tiempo promedio que toma llevar un pedido desde el primer contacto hasta el cierre.
          </p>
        </div>
        <div className={`p-3 rounded-xl flex items-center gap-3 border shadow-sm ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
          <Clock size={24} className="text-[#ff851d]" />
          <span className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Primer Contacto <ArrowRight size={14} className="inline mx-1" /> Firma Final
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 z-10 min-h-0">
        
        {/* Left: Interactive Steps List */}
        <div className="w-full md:w-5/12 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2">
          <p className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Pasos para calcularlo
          </p>
          {steps.map((step) => (
            <div
              key={step.id}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                activeStep === step.id 
                  ? (isDark ? 'bg-[#2a2a2a] border-[#ff851d] shadow-md' : 'bg-orange-50 border-[#ff851d] shadow-md')
                  : (isDark ? 'bg-[#222] border-[#333] hover:border-gray-500' : 'bg-white border-gray-100 hover:border-gray-300')
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md shrink-0 bg-gradient-to-br ${step.color}`}>
                {step.num}
              </div>
              <h3 className={`text-sm md:text-base font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {step.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Right: Dynamic Info Panel */}
        <div className="w-full md:w-7/12 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            
            {/* Default State (Not hovering any step) */}
            {!activeStep && (
              <motion.div
                key="default"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 h-full"
              >
                {/* Example Card */}
                <div className={`flex-1 p-4 md:p-5 rounded-3xl border flex flex-col justify-center relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
                  <h4 className={`text-base md:text-lg font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    <Calculator size={18} className="text-gray-500" /> Ejemplo Práctico
                  </h4>
                  <div className="space-y-3">
                    <div className={`p-3 md:p-4 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#333]' : 'bg-gray-50 border-gray-100'}`}>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Si la mayoría de tus ventas (sin anomalías) tardan entre <strong>3 y 9 meses</strong> en cerrarse...
                      </p>
                      <p className="text-sm md:text-base font-bold text-[#ef375c] mt-1.5">
                        Tu ciclo normal es de ~6 meses.
                      </p>
                    </div>
                    <div className={`p-3 md:p-4 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#333]' : 'bg-gray-50 border-gray-100'}`}>
                      <p className={`text-xs md:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Si tu proceso generalmente toma entre <strong>10 y 20 semanas</strong>...
                      </p>
                      <p className="text-sm md:text-base font-bold text-[#ff851d] mt-1.5">
                        Tu ciclo normal es de ~15 semanas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Importance Card */}
                <div className={`p-4 md:p-5 rounded-3xl border flex gap-3 items-start shadow-md ${isDark ? 'bg-gradient-to-r from-red-900/20 to-orange-900/20 border-[#ef375c]/30' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-100'}`}>
                  <div className="p-2.5 rounded-full bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shrink-0 shadow-lg">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] mb-1.5">
                      ¿Por qué es vital conocer este dato?
                    </h4>
                    <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Te ayuda a hacer el <strong>rastreo (tracking) correcto en tu embudo</strong>. Sabrás exactamente cuándo mover un objetivo a la siguiente etapa y evitarás confiarte asumiendo que un trato está cerrado meses antes de tiempo, dejándole la puerta abierta a la competencia.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Hover State (Showing Step Details) */}
            {activeStep && activeStepData && (
              <motion.div
                key={activeStepData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex-1 p-8 md:p-10 rounded-3xl border flex flex-col justify-center items-center text-center shadow-xl ${isDark ? 'bg-[#2a2a2a] border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 bg-gradient-to-br ${activeStepData.color}`}>
                  <activeStepData.icon size={40} />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  Paso {activeStepData.num}: {activeStepData.title}
                </h3>
                <p className={`text-base md:text-lg leading-relaxed max-w-md ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {activeStepData.desc}
                </p>
                
                {activeStepData.id === 's3' && (
                  <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 text-left max-w-md ${isDark ? 'bg-red-900/20 border border-red-900/50' : 'bg-red-50 border border-red-100'}`}>
                    <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Las anomalías distorsionan tu promedio. Un cierre de 2 días no es tu ciclo normal, es una excepción.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
