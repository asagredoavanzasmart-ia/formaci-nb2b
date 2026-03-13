import React from 'react';
import { motion } from 'motion/react';
import { Target, Lightbulb, Zap, Users, EyeOff, Trophy, UserX, UserCheck } from 'lucide-react';

const comparisonData = [
  {
    icon: Target,
    feature: 'Enfoque',
    traditional: <><span className="font-bold text-gray-800 dark:text-gray-200 block mb-0.5">Relaciones personales.</span>Se centra solo en el CEO o "pez gordo".</>,
    strategic: <><span className="font-bold text-[#ef375c] dark:text-[#ff851d] block mb-0.5">Mapeo de influencias.</span>Analiza quién tiene realmente el poder de decisión.</>
  },
  {
    icon: Lightbulb,
    feature: 'Premisa',
    traditional: '"Mis contactos de alto nivel me aseguran la venta".',
    strategic: '"¿Quién aprueba realmente y quién puede guiarme?"'
  },
  {
    icon: Zap,
    feature: 'Táctica',
    traditional: <><span className="font-bold text-gray-800 dark:text-gray-200 block mb-0.5">Glamorosa.</span>Cena o reunión brillante con el CEO.</>,
    strategic: <><span className="font-bold text-[#ef375c] dark:text-[#ff851d] block mb-0.5">Dirigida.</span>Acciones menos glamorosas pero más efectivas.</>
  },
  {
    icon: Users,
    feature: 'Coach',
    traditional: <><span className="font-bold text-gray-800 dark:text-gray-200 block mb-0.5">No lo busca.</span>Confía en su percepción subjetiva del trato.</>,
    strategic: <><span className="font-bold text-[#ef375c] dark:text-[#ff851d] block mb-0.5">Fundamental.</span>Encuentra a alguien que le explica la política interna.</>
  },
  {
    icon: EyeOff,
    feature: 'Punto Ciego',
    traditional: 'Ignora al Gerente de División y a actores técnicos.',
    strategic: 'Sabe que el CEO delega la decisión técnica final.'
  },
  {
    icon: Trophy,
    feature: 'Resultado',
    traditional: 'Pierde una venta "segura" (sorpresa negativa).',
    strategic: <span className="font-bold text-[#ef375c] dark:text-[#ff851d]">Gana la cuenta (resultado planificado).</span>
  }
];

export default function Slide9({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-4 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"></div>
      
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          Ventas Complejas: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Tradicional vs Estratégico</span>
        </h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Diferencias clave en el abordaje de grandes cuentas.
        </p>
      </div>

      <div className="flex-1 flex flex-col min-h-0 w-full max-w-5xl mx-auto relative">
        
        {/* Headers */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 mb-2 shrink-0 relative z-10">
          <div className={`p-2 sm:p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm transition-transform hover:scale-105 ${isDark ? 'bg-[#2a2a2a] text-gray-300 border border-[#3a3a3a]' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 ${isDark ? 'bg-[#333]' : 'bg-white shadow-sm'}`}>
              <UserX className="opacity-60" size={16} />
            </div>
            <h3 className="text-[10px] sm:text-xs font-bold">El Vendedor Tradicional</h3>
          </div>
          
          <div className="w-16 sm:w-20 flex items-center justify-center">
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${isDark ? 'bg-[#333] text-gray-500' : 'bg-gray-100 text-gray-400'}`}>VS</span>
          </div>

          <div className={`p-2 sm:p-3 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden transition-transform hover:scale-105 ${isDark ? 'bg-gradient-to-br from-[#ff851d]/20 to-[#ef375c]/20 text-white border border-[#ff851d]/30' : 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white'}`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center mb-1 sm:mb-2 backdrop-blur-sm">
              <UserCheck size={16} />
            </div>
            <h3 className="text-[10px] sm:text-xs font-bold relative z-10">Vendedor con estrategia</h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col min-h-0 gap-1 sm:gap-1.5 relative">
          {/* Central Axis Line */}
          <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

          {comparisonData.map((row, index) => {
            const Icon = row.icon;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={index} 
                className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-stretch group relative z-10"
              >
                {/* Traditional Column */}
                <div className={`p-2 sm:p-2.5 rounded-xl flex items-center justify-end text-right transition-all duration-300 ${isDark ? 'bg-[#252525] group-hover:bg-[#2a2a2a] border border-transparent group-hover:border-[#333]' : 'bg-white group-hover:bg-gray-50 border border-transparent group-hover:border-gray-100 shadow-sm group-hover:shadow-md'}`}>
                  <p className={`text-xs sm:text-sm leading-snug ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{row.traditional}</p>
                </div>

                {/* Center Axis */}
                <div className="w-16 sm:w-20 flex flex-col items-center justify-center relative py-0.5">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 relative z-10 ${isDark ? 'bg-[#1e1e1e] border border-[#333] text-gray-400 group-hover:border-[#ff851d] group-hover:text-[#ff851d]' : 'bg-white border border-gray-100 text-gray-400 group-hover:border-[#ef375c] group-hover:text-[#ef375c]'}`}>
                    <Icon size={12} />
                  </div>
                  <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-wider mt-0.5 px-1.5 py-0.5 rounded-full transition-colors relative z-10 ${isDark ? 'bg-[#1e1e1e] text-gray-500 group-hover:text-gray-300' : 'bg-white text-gray-400 group-hover:text-gray-600'}`}>
                    {row.feature}
                  </span>
                </div>

                {/* Strategic Column */}
                <div className={`p-2 sm:p-2.5 rounded-xl flex items-center justify-start text-left transition-all duration-300 ${isDark ? 'bg-[#2a201a]/30 group-hover:bg-[#2a201a]/60 border border-[#ff851d]/10 group-hover:border-[#ff851d]/30' : 'bg-orange-50/50 group-hover:bg-orange-50 border border-orange-100/50 group-hover:border-orange-200 shadow-sm group-hover:shadow-md'}`}>
                  <p className={`text-xs sm:text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{row.strategic}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
