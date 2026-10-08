import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, Target, ArrowRight } from 'lucide-react';

const sections = [
  {
    id: 'identificacion',
    title: 'Identificación',
    icon: Search,
    items: [
      'Basarse en el riesgo: monto e impacto > escalar en el organigrama',
      'Investigar con los contactos quien libera fondos o de que presupuesto salen los fondos.',
      'Usar al coach para identificar a la persona y el proceso de decisión'
    ]
  },
  {
    id: 'bloqueo',
    title: 'Bloqueo',
    icon: ShieldAlert,
    items: [
      'Compradores técnicos y de usuario bloquean el acceso',
      'Investigar con los contactos quien libera fondos o de que presupuesto salen los fondos.',
      'Usar al coach para identificar a la persona y el proceso de decisión',
      'Ayudar al bloqueador que obtendrá prestigio o reconocimiento si llega con una solución valiosa',
      '<span class="font-bold">Venta en paralelo:</span> si no puedes entrar pide a un ejecutivo de la empresa a contactar al ejecutivo del cliente',
      '<span class="font-bold">Rodear el bloqueo</span> (alto riesgo: solo si no tienes nada que perder porque puede emerger la venganza del comprador)'
    ]
  },
  {
    id: 'abordaje',
    title: 'Abordaje',
    icon: Target,
    items: [
      '¿Qué quiere escuchar el comprador? debes tener una razón de negocio',
      'No quiere ver demostraciones, quiere conocimiento y visión',
      'Aportar datos que le permitan predecir el futuro de la organización',
      'Qué hará la solución por la rentabilidad y estabilidad o crecimiento de la empresa',
      'Credibilidad: usar casos de éxito previo',
      '¿Impacta algún objetivo personal, imagen o posición dentro de la organización?'
    ]
  }
];

export default function Slide5({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState<string>('identificacion');

  const activeSection = sections.find(s => s.id === activeTab) || sections[0];

  return (
    <div className={`p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col md:flex-row gap-8 ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      {/* Segmento naranja eliminado */}
      
      {/* Left Column: Title and Tabs */}
      <div className="md:w-1/3 flex flex-col h-full z-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] leading-tight">
          Superar los problemas principales
        </h2>

        <div className="flex flex-col gap-4 flex-1">
          {sections.map((section) => {
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 text-left group ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-[#ef375c]/30 scale-105' 
                    : isDark 
                      ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <section.icon size={24} className={isActive ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-500'} />
                  <span className="font-bold text-xl">{section.title}</span>
                </div>
                <ArrowRight 
                  size={20} 
                  className={`transition-transform duration-300 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0 group-hover:opacity-50 group-hover:translate-x-0'}`} 
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="md:w-2/3 h-full relative z-10">
        <div className={`w-full h-full rounded-3xl p-8 sm:p-10 border ${isDark ? 'bg-[#2a2a2a]/50 border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-[#3a3a3a]' : 'bg-white shadow-sm'}`}>
                  <activeSection.icon size={32} className="text-[#ef375c]" />
                </div>
                <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {activeSection.title}
                </h3>
              </div>

              <ul className="space-y-4 flex-1">
                {activeSection.items.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={`flex items-start gap-4 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] mt-2.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
