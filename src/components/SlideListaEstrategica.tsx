import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface SlideProps {
  isDark: boolean;
}

const questions = [
  "¿He identificado al Comprador Económico real (quien libera el dinero)?",
  "¿He escuchado las necesidades personales (Wins) del Comprador Usuario?",
  "¿Conozco las especificaciones del Comprador Técnico para no ser filtrado?",
  "¿Tengo un Coach confiable que desee mi éxito?",
  "¿Están mis compradores en modo de Crecimiento o Problema?",
  "¿He detectado y mitigado todas las Banderas Rojas?",
  "¿Tengo una Razón de Negocio Válida para cada contacto?"
];

export default function SlideListaEstrategica({ isDark }: SlideProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(questions.length).fill(false));

  const toggleItem = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const completedCount = checkedItems.filter(Boolean).length;
  const percentage = (completedCount / questions.length) * 100;

  // Colores Premium para el gráfico (Semáforo)
  let statusColor = "#ef375c"; // Rojo (Marca/Peligro)
  let statusBg = "rgba(239, 55, 92, 0.1)";
  let statusLabel = "Riesgo Alto";
  let StatusIcon = XCircle;

  if (percentage >= 100) {
    statusColor = "#10b981"; // Verde (Esmeralda)
    statusBg = "rgba(16, 185, 129, 0.1)";
    statusLabel = "Estrategia Sólida";
    StatusIcon = CheckCircle2;
  } else if (percentage >= 60) {
    statusColor = "#f59e0b"; // Amarillo (Ámbar)
    statusBg = "rgba(245, 158, 11, 0.1)";
    statusLabel = "En Progreso";
    StatusIcon = AlertCircle;
  }

  return (
    <div className={`w-full h-full flex flex-col md:flex-row items-center p-6 gap-6 overflow-hidden relative ${isDark ? 'bg-[#111111] text-white' : 'bg-white text-gray-800'}`}>
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ef375c]/5 to-transparent pointer-events-none" />
      
      {/* Columna Izquierda: Checklist */}
      <div className="flex-1 w-full max-w-2xl z-10">
        <div className="mb-4">
          <h2 className="text-3xl font-black mb-1 tracking-tight">
            Lista de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Verificación</span>
          </h2>
          <p className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Asegura cada pilar estratégico antes de avanzar en el ciclo de venta.
          </p>
        </div>
        
        <div className="space-y-2 pr-4 custom-scrollbar">
          {questions.map((q, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                checkedItems[i] 
                ? (isDark ? 'bg-white/10 border-[#ef375c]/50 shadow-[0_0_20px_rgba(239,55,92,0.1)]' : 'bg-[#ef375c]/5 border-[#ef375c]/20 shadow-sm')
                : (isDark ? 'bg-transparent border-white/5 hover:border-white/20' : 'bg-transparent border-gray-100 hover:border-gray-200')
              }`}
              onClick={() => toggleItem(i)}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all duration-500 ${
                checkedItems[i]
                ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] border-transparent scale-110 shadow-lg shadow-orange-500/20'
                : 'bg-transparent border-gray-300 dark:border-gray-600'
              }`}>
                {checkedItems[i] && <Check size={16} className="text-white" strokeWidth={4} />}
              </div>
              <span className={`text-base leading-tight ${checkedItems[i] ? 'font-black' : 'font-bold opacity-70'}`}>
                {q}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Columna Derecha: Gráfico Circular */}
      <div className="md:w-2/5 flex flex-col items-center justify-center z-10 relative">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Anillos de fondo decorativos */}
          <div className={`absolute w-full h-full rounded-full border-[10px] ${isDark ? 'border-white/5' : 'border-gray-50'}`} />
          
          {/* SVG del Gráfico circular */}
          <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
            <circle
              cx="112"
              cy="112"
              r="100"
              stroke="currentColor"
              strokeWidth="16"
              fill="transparent"
              className={isDark ? 'text-white/5' : 'text-gray-100'}
            />
            <motion.circle
              cx="112"
              cy="112"
              r="100"
              stroke={statusColor}
              strokeWidth="16"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 100}
              initial={{ strokeDashoffset: 2 * Math.PI * 100 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 100 * (1 - percentage / 100) }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              strokeLinecap="round"
            />
          </svg>

          {/* Contenido Central */}
          <div className="absolute flex flex-col items-center text-center">
            <motion.div
              key={statusLabel}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <StatusIcon size={24} style={{ color: statusColor }} className="mb-1" />
              <span className="text-4xl font-black tracking-tighter tabular-nums leading-none">
                {Math.round(percentage)}<span className="text-lg opacity-50">%</span>
              </span>
              <span className="text-sm font-black mt-2 px-3 py-1.5 rounded-full shadow-lg transition-colors border" 
                    style={{ 
                      backgroundColor: statusBg, 
                      color: statusColor,
                      borderColor: statusColor + '44'
                    }}>
                {statusLabel}
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* Leyenda sutil */}
        <div className={`mt-6 p-3 rounded-xl border flex items-start gap-3 max-w-xs transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 shrink-0">
            <Check size={12} />
          </div>
          <p className="text-sm leading-tight font-bold opacity-60 italic">
            "La estrategia no consiste en lo que vas a hacer, sino en lo que estás haciendo hoy para ganar mañana."
          </p>
        </div>
      </div>
    </div>
  );
}
