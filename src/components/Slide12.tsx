import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, RotateCcw, ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

const surveyQuestions = [
  {
    id: 'q1',
    text: "¿He identificado al Comprador Económico (quien libera el presupuesto)?",
    category: "Influencias"
  },
  {
    id: 'q2',
    text: "¿Conozco las necesidades personales (Wins) del Comprador Usuario?",
    category: "Ganancias"
  },
  {
    id: 'q3',
    text: "¿Cumplo las especificaciones del Comprador Técnico para no ser filtrado?",
    category: "Influencias"
  },
  {
    id: 'q4',
    text: "¿Tengo un Coach interno confiable que desee mi éxito?",
    category: "Influencias"
  },
  {
    id: 'q5',
    text: "¿Están mis compradores en modo de Crecimiento o Problema?",
    category: "Modos"
  },
  {
    id: 'q6',
    text: "¿He detectado y mitigado todas las Banderas Rojas?",
    category: "Riesgos"
  },
  {
    id: 'q7',
    text: "¿Tengo una Razón de Negocio Válida para cada contacto?",
    category: "Estrategia"
  }
];

export default function Slide12({ isDark }: { isDark: boolean }) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: boolean) => {
    const currentQ = surveyQuestions[currentQuestionIdx];
    if (!currentQ) return;

    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));

    if (currentQuestionIdx < surveyQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => Math.min(prev + 1, surveyQuestions.length - 1));
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const resetSurvey = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setShowResults(false);
  };

  const score = Object.values(answers).filter(Boolean).length;
  const total = surveyQuestions.length;
  const percentage = Math.round((score / total) * 100);

  let resultData = {
    title: "Estrategia Vulnerable",
    color: "text-[#ef375c]",
    bg: "bg-[#ef375c]",
    gradient: "from-[#ef375c] to-red-600",
    icon: ShieldAlert,
    desc: "Tu oportunidad está en alto riesgo. Faltan elementos críticos en tu estrategia. Debes retroceder y cubrir tus bases antes de avanzar."
  };

  if (percentage >= 80) {
    resultData = {
      title: "Estrategia Sólida",
      color: "text-emerald-500",
      bg: "bg-emerald-500",
      gradient: "from-emerald-400 to-emerald-600",
      icon: ShieldCheck,
      desc: "Excelente posición. Tienes cubiertos los flancos principales. Mantén el contacto con tu Coach y monitorea nuevas Banderas Rojas."
    };
  } else if (percentage >= 50) {
    resultData = {
      title: "Estrategia con Riesgos",
      color: "text-[#ff851d]",
      bg: "bg-[#ff851d]",
      gradient: "from-[#ff851d] to-orange-600",
      icon: AlertTriangle,
      desc: "Tienes una base, pero hay vacíos importantes. Identifica las preguntas que respondiste con 'No' y crea un plan de acción inmediato."
    };
  }

  // Calculate stroke dash array for the 3 segments (red, orange, green)
  const circumference = 2 * Math.PI * 45; // r=45
  const segmentLength = circumference / 3;
  const gap = 4; // gap between segments
  const dashArray = `${segmentLength - gap} ${circumference - segmentLength + gap}`;

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      
      {/* Background Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 w-full max-w-3xl flex flex-col h-full max-h-full">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 shrink-0"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Evaluación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Estrategia</span>
          </h2>
          <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Responde honestamente para conocer la salud de tu oportunidad de venta.
          </p>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center relative min-h-0">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="survey"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full max-w-2xl mx-auto"
              >
                {/* Progress Bar */}
                <div className="w-full mb-8">
                  <div className="flex justify-between text-xs font-bold mb-2 text-gray-500">
                    <span>Pregunta {currentQuestionIdx + 1} de {total}</span>
                    <span>{Math.round((currentQuestionIdx / total) * 100)}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-200'}`}>
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#ff851d] to-[#ef375c]"
                      initial={{ width: `${(currentQuestionIdx / total) * 100}%` }}
                      animate={{ width: `${((currentQuestionIdx + 1) / total) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <div className={`w-full p-8 md:p-10 rounded-3xl border text-center shadow-lg mb-8 ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                    {surveyQuestions[currentQuestionIdx]?.category}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-bold leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {surveyQuestions[currentQuestionIdx]?.text}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 w-full md:w-2/3">
                  <button
                    onClick={() => handleAnswer(false)}
                    className={`flex-1 py-4 rounded-2xl border-2 font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      isDark 
                        ? 'border-[#4a4a4a] text-gray-300 hover:bg-[#3a3a3a] hover:border-[#5a5a5a]' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                    }`}
                  >
                    <X size={24} /> No
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff851d] to-[#ef375c] hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02]"
                  >
                    <Check size={24} /> Sí
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex flex-col items-center w-full h-full justify-center"
              >
                <div className={`w-full max-w-2xl p-8 md:p-10 rounded-3xl border text-center shadow-xl relative overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
                  
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${resultData.gradient}`}></div>

                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Score Circle */}
                    <div className="relative shrink-0 w-32 h-32 md:w-40 md:h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* Background Track */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className={`fill-none stroke-[8px] ${isDark ? 'stroke-[#3a3a3a]' : 'stroke-gray-100'}`}
                        />
                        
                        {/* Red Segment (0-33%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className="fill-none stroke-[8px] stroke-[#ef375c] opacity-30"
                          strokeDasharray={dashArray}
                          strokeDashoffset={0}
                        />
                        {/* Orange Segment (33-66%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className="fill-none stroke-[8px] stroke-[#ff851d] opacity-30"
                          strokeDasharray={dashArray}
                          strokeDashoffset={-segmentLength}
                        />
                        {/* Green Segment (66-100%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className="fill-none stroke-[8px] stroke-emerald-500 opacity-30"
                          strokeDasharray={dashArray}
                          strokeDashoffset={-segmentLength * 2}
                        />

                        {/* Active Progress */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          className={`fill-none stroke-[8px] ${resultData.color} stroke-current`}
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {score}<span className="text-xl md:text-2xl text-gray-500">/{total}</span>
                        </span>
                      </div>
                    </div>

                    {/* Result Details */}
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl text-white bg-gradient-to-br ${resultData.gradient}`}>
                          <resultData.icon size={24} />
                        </div>
                        <h3 className={`text-2xl font-bold ${resultData.color}`}>
                          {resultData.title}
                        </h3>
                      </div>
                      <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {resultData.desc}
                      </p>
                      
                      <button
                        onClick={resetSurvey}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                          isDark 
                            ? 'bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a] hover:text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                      >
                        <RotateCcw size={16} /> Reevaluar Estrategia
                      </button>
                    </div>
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
