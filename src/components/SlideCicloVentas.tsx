import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, History, Filter, Calculator, Target, Zap, ChevronRight, Info } from 'lucide-react';

export default function SlideCicloVentas({ isDark }: { isDark: boolean }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 's1',
      num: '01',
      title: 'Auditoría de Historial',
      icon: History,
      short: 'Analiza tu pasado',
      desc: 'Revisa las ventas cerradas en los últimos 12-24 meses. Necesitamos datos reales, no suposiciones, para construir una base estadística sólida.',
      color: 'from-[#ff851d] to-[#ffb347]',
      tag: 'FASE 1: RECOPILACIÓN'
    },
    {
      id: 's2',
      num: '02',
      title: 'Cronometría del Trato',
      icon: Clock,
      short: 'Mide el tiempo real',
      desc: 'Calcula el intervalo exacto desde la prospección inicial (primer hola) hasta el cierre formal (firma del contrato). El tiempo es tu métrica reina.',
      color: 'from-[#ef375c] to-[#ff5c8d]',
      tag: 'FASE 2: MEDICIÓN'
    },
    {
      id: 's3',
      num: '03',
      title: 'Filtro de Ruido',
      icon: Filter,
      short: 'Limpia los datos',
      desc: 'Elimina anomalías: renovaciones automáticas "sin esfuerzo" o ventas flash fortuitas. Si una venta tardó 2 días pero lo normal son 6 meses, bórrala del promedio.',
      color: 'from-[#ff851d] to-[#ef375c]',
      tag: 'FASE 3: DEPURACIÓN'
    },
    {
      id: 's4',
      num: '04',
      title: 'Cálculo del Promedio',
      icon: Calculator,
      short: 'Obtén tu Número',
      desc: 'Suma el tiempo de tu volumen regular de ventas y divide. El resultado es tu CICLO NORMAL. Esta es la verdad matemática de tu proceso comercial.',
      color: 'from-[#ef375c] to-[#ff851d]',
      tag: 'FASE 4: RESULTADO'
    },
    {
      id: 's5',
      num: '05',
      title: 'Análisis y Valor',
      icon: Target,
      short: 'Ejemplos y Utilidad',
      desc: 'Entender tu ciclo te permite predecir ingresos y gestionar expectativas. No es solo un número, es tu brújula comercial.',
      color: 'from-[#ff851d] to-[#ef375c]',
      tag: 'FASE 5: APLICACIÓN'
    }
  ];

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-10 relative overflow-hidden rounded-[2.5rem] shadow-2xl ${
      isDark ? 'bg-[#0f0f0f] text-white border border-white/5' : 'bg-gray-50 text-gray-900 border border-black/5'
    }`}>
      {/* Background Decals */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#ff851d]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#ef375c]/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            {/* Segmento naranja eliminado */}
            <span className="text-sm font-black text-[#ff851d]">Métrica estratégica</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Ciclo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Normal</span>
          </h2>
          <p className={`text-sm md:text-lg max-w-xl font-medium opacity-60 leading-relaxed`}>
            El latido de tu proceso comercial: el tiempo real que toma transformar un extraño en un cliente recurrente.
          </p>
        </div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-3xl border backdrop-blur-md flex items-center gap-4 shadow-xl ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-gray-200'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm font-black opacity-40">Fórmula clave</p>
            <p className="text-sm font-bold">Tiempo Total / # Ventas Reales</p>
          </div>
        </motion.div>
      </div>

      {/* Interactive Main Display */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left Col: Big Icon & Label */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center text-white shadow-2xl relative`}>
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white dark:bg-[#1a1a1a] flex items-center justify-center text-sm font-black border-4 border-current">
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                     {steps[activeStep].num}
                   </span>
                </div>
                {React.createElement(steps[activeStep].icon, { size: 64, strokeWidth: 1.5 })}
              </div>
              <div>
                <span className={`text-sm font-black mb-1 block px-3 py-1 rounded-full border border-current opacity-40 inline-flex`}>
                  {steps[activeStep].tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-black mt-2 leading-tight">
                  {steps[activeStep].title}
                </h3>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              {activeStep === 4 ? (
                <div className="space-y-4">
                  {/* Ejemplo Práctico */}
                  <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-xl shadow-gray-100'}`}>
                    <h4 className="text-sm font-black mb-4 flex items-center gap-2 opacity-50">
                      <Calculator size={14} className="text-[#ff851d]" /> Ejemplo práctico
                    </h4>
                    <div className="space-y-3">
                      <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                        <p className="text-sm opacity-60 mb-1">Si la mayoría de tus ventas tardan entre 3 y 9 meses...</p>
                        <p className="text-sm font-black text-[#ef375c]">Tu ciclo normal es de ~6 meses.</p>
                      </div>
                      <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                        <p className="text-sm opacity-60 mb-1">Si tu proceso toma entre 10 y 20 semanas...</p>
                        <p className="text-sm font-black text-[#ff851d]">Tu ciclo normal es de ~15 semanas.</p>
                      </div>
                    </div>
                  </div>

                  {/* Importancia */}
                  <div className={`p-6 rounded-[2rem] border bg-gradient-to-br ${
                    isDark 
                      ? 'from-[#ff851d]/10 to-[#ef375c]/10 border-orange-500/20' 
                      : 'from-orange-50 to-red-50 border-orange-100'
                  }`}>
                    <h4 className="text-sm font-black mb-2 flex items-center gap-2 text-[#ef375c]">
                      <Target size={14} /> ¿Por qué es vital conocer este dato?
                    </h4>
                    <p className="text-sm leading-relaxed font-medium">
                      Te ayuda a hacer el <strong>rastreo (tracking) correcto en tu embudo</strong>. Sabrás exactamente cuándo mover un objetivo a la siguiente etapa y evitarás confiarte asumiendo que un trato está cerrado meses antes de tiempo, dejándole la puerta abierta a la competencia.
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`p-8 rounded-[2.5rem] border backdrop-blur-sm relative overflow-hidden ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-xl shadow-gray-100'
                }`}>
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Info size={120} />
                  </div>
                  <p className="text-lg md:text-xl font-medium leading-relaxed opacity-80 mb-6 italic">
                    "{steps[activeStep].desc}"
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                     {activeStep === 2 ? (
                       <div className="flex items-center gap-2 text-red-500 font-bold text-sm bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
                         <Target size={14} /> Cuidado con las anomalías
                       </div>
                     ) : (
                       <div className="flex items-center gap-2 text-[#ff851d] font-bold text-sm bg-[#ff851d]/10 px-4 py-2 rounded-full border border-[#ff851d]/20">
                         <ChevronRight size={14} /> Paso crítico para el ROI
                       </div>
                     )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stepper Navigation */}
      <div className="shrink-0 relative z-10 mt-12 mb-4">
        <div className={`h-[4px] w-full rounded-full relative mb-8 ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
           <motion.div 
             className="absolute h-full left-0 top-0 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-[0_0_15px_rgba(255,133,29,0.5)]"
             initial={false}
             animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
             transition={{ type: "spring", damping: 25, stiffness: 120 }}
           />
           <div className="absolute top-0 left-0 w-full flex justify-between -translate-y-[45%]">
             {steps.map((s, i) => (
               <button
                 key={s.id}
                 onClick={() => setActiveStep(i)}
                 className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group relative ${
                   i <= activeStep 
                    ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] scale-110 shadow-lg shadow-orange-500/20' 
                    : (isDark ? 'bg-[#222] border border-white/10' : 'bg-white border border-black/10')
                 }`}
               >
                 <span className={`text-sm font-black ${i <= activeStep ? 'text-white' : 'opacity-40'}`}>{s.num}</span>
                 
                 {/* Tooltip on hover */}
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    <div className={`px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap shadow-2xl border ${
                      isDark ? 'bg-[#1a1a1a] border-white/10 text-white' : 'bg-white border-black/5 text-gray-900'
                    }`}>
                      {s.short}
                    </div>
                 </div>
               </button>
             ))}
           </div>
        </div>
        
        <div className="flex justify-between items-center px-4">
           <p className="text-sm font-black opacity-30">Progreso de auditoría</p>
           <div className="flex gap-4">
              <button 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className={`text-sm font-bold transition-all ${activeStep === 0 ? 'opacity-20 pointer-events-none' : 'hover:text-[#ff851d]'}`}
              >
                ← Anterior
              </button>
              <button 
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className={`text-sm font-bold transition-all ${activeStep === steps.length - 1 ? 'opacity-20 pointer-events-none' : 'hover:text-[#ef375c]'}`}
              >
                Siguiente →
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
