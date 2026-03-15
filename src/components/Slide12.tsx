import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, ChevronRight, AlertTriangle, Trophy } from 'lucide-react';

const strategyPoints = [
  { id: 1, text: '¿Hemos identificado a todos los Roles de Compra necesarios?', points: 20 },
  { id: 2, text: '¿Conocemos el "Win" personal de cada influencer?', points: 20 },
  { id: 3, text: '¿Hemos verificado la salud financiera del cliente (CT)?', points: 15 },
  { id: 4, text: '¿El Coach interno ha validado nuestra propuesta?', points: 15 },
  { id: 5, text: '¿Existen Banderas Rojas sin un plan de mitigación?', points: 15, isNegative: true },
  { id: 6, text: '¿Nuestra solución ataca un dolor real (Mode Trouble)?', points: 15 },
];

export default function Slide12({ isDark }: { isDark: boolean }) {
  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);
  
  const togglePoint = (id: number) => {
    setSelectedPoints(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const totalScore = strategyPoints.reduce((acc, point) => {
    if (selectedPoints.includes(point.id)) {
      return point.isNegative ? acc - point.points : acc + point.points;
    }
    return acc;
  }, 0);

  const getStatus = (score: number) => {
    if (score >= 70) return { text: 'Estrategia Sólida', color: 'text-emerald-500', icon: CheckCircle2 };
    if (score >= 40) return { text: 'Riesgo Moderado', color: 'text-orange-500', icon: AlertTriangle };
    return { text: 'Vulnerabilidad Alta', color: 'text-[#ef375c]', icon: AlertTriangle };
  };

  const status = getStatus(totalScore);

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-100 shadow-gray-300/60'}`}>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"></div>
      
      <div className="shrink-0 mb-4 z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">
            Evaluación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Estrategia</span>
          </h2>
          <p className={`text-sm md:text-sm max-w-4xl leading-tight ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            ¿Qué tan sólida es tu posición en la cuenta? Evalúa cada pilar para priorizar tus acciones.
          </p>
        </div>

        {/* Score Display */}
        <div className={`p-3 md:p-4 rounded-2xl flex items-center gap-4 transition-all duration-500 ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'} shadow-sm border ${isDark ? 'border-[#333]' : 'border-gray-200'}`}>
          <div className="text-center">
            <span className={`text-2xl md:text-3xl font-black tabular-nums transition-colors duration-500 ${status.color}`}>
              {Math.max(0, totalScore)}
            </span>
            <span className={`text-sm block font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Puntaje</span>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-[#3a3a3a]"></div>
          <div>
            <div className={`flex items-center gap-1.5 font-bold text-sm ${status.color}`}>
              <status.icon size={14} /> {status.text}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 z-10 min-h-0">
        {/* Checklist */}
        <div className="w-full md:w-3/5 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
          {strategyPoints.map((point) => (
            <button
              key={point.id}
              onClick={() => togglePoint(point.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                selectedPoints.includes(point.id)
                  ? (isDark ? 'bg-[#2a2a2a] border-[#ff851d] shadow-md' : 'bg-orange-50 border-[#ff851d] shadow-sm')
                  : (isDark ? 'bg-[#222] border-[#333] hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200')
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  selectedPoints.includes(point.id)
                    ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] border-transparent text-white'
                    : isDark ? 'border-[#444] group-hover:border-gray-500' : 'border-gray-200 group-hover:border-gray-400'
                }`}>
                  {selectedPoints.includes(point.id) && <CheckCircle2 size={12} strokeWidth={3} />}
                </div>
                <span className={`text-sm md:text-sm font-medium transition-colors ${
                  selectedPoints.includes(point.id)
                    ? (isDark ? 'text-gray-100' : 'text-gray-900')
                    : (isDark ? 'text-gray-500' : 'text-gray-600')
                }`}>
                  {point.text}
                </span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                point.isNegative 
                  ? 'bg-red-500/10 text-[#ef375c]' 
                  : (isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400')
              }`}>
                {point.isNegative ? '-' : '+'}{point.points}
              </span>
            </button>
          ))}
        </div>

        {/* Insights / Advice */}
        <div className="md:w-2/5 flex flex-col gap-4">
          <div className={`flex-1 p-5 rounded-3xl border flex flex-col items-center justify-center text-center relative overflow-hidden ${isDark ? 'bg-[#2a2a2a]/50 border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={totalScore}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg bg-gradient-to-br ${totalScore >= 70 ? 'from-emerald-500 to-teal-600' : totalScore >= 40 ? 'from-orange-400 to-[#ff851d]' : 'from-[#ff851d] to-[#ef375c]'}`}>
                  <Trophy size={28} className="text-white" />
                </div>
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {totalScore >= 70 ? '¡Buen trabajo!' : totalScore >= 40 ? 'Sigue refinando' : 'Atención Crítica'}
                </h4>
                <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {totalScore >= 70 
                    ? 'Has cubierto las bases críticas. Enfócate en la ejecución y el cierre.' 
                    : totalScore >= 40 
                    ? 'Identifica qué información falta y contacta a tu Coach para mitigar riesgos.' 
                    : 'La venta está en peligro. Necesitas mapear roles antes de seguir avanzando.'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">
            <h4 className="text-sm font-bold flex items-center gap-2 mb-1">
              <ChevronRight size={14} /> Pro-Tip Estratégico
            </h4>
            <p className="text-sm leading-snug font-medium text-white/90">
              Usa esta evaluación antes de cada reunión interna de forecast para ser brutalmente honesto sobre tus tratos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
