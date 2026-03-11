import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, CheckCircle, AlertTriangle, XCircle, Briefcase, Users, MapPin, Info, ChevronLeft, ChevronRight, Target } from 'lucide-react';

// Tooltip Component
const Tooltip = ({ text, isDark }: { text: string, isDark: boolean }) => (
  <div className="relative group inline-block ml-2">
    <Info size={16} className="text-gray-400 hover:text-[#ff851d] cursor-pointer transition-colors" />
    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl text-xs shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${isDark ? 'bg-[#3a3a3a] text-gray-200 border border-[#4a4a4a]' : 'bg-white text-gray-700 border border-gray-200'}`}>
      {text}
      <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${isDark ? 'border-t-[#3a3a3a]' : 'border-t-white'}`}></div>
    </div>
  </div>
);

export default function SlideICPTool({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState<'build' | 'evaluate'>('build');
  
  // Build State
  const [demographics, setDemographics] = useState({
    industry: 'Tecnología / Software',
    workers: '51-200',
    geography: 'Nacional'
  });
  
  const [psychographics, setPsychographics] = useState([
    { id: 'p1', name: 'Innovadores (Apertura al cambio)', desc: 'Empresas dispuestas a probar nuevas soluciones y adaptarse a los cambios del mercado.' },
    { id: 'p2', name: 'Ética alta y reputación', desc: 'Organizaciones que valoran la transparencia, la honestidad y mantienen una excelente reputación.' },
    { id: 'p3', name: 'Proceso de decisión ágil', desc: 'Cuentan con procesos claros y eficientes para aprobar presupuestos e implementar proyectos.' },
    { id: 'p4', name: 'Presupuesto adecuado', desc: 'Tienen la capacidad financiera real para invertir en soluciones de alto valor.' },
    { id: 'p5', name: 'Valoran calidad sobre precio', desc: 'Priorizan el retorno de inversión y el valor a largo plazo por encima del costo inicial.' }
  ]);

  // Evaluate State
  const [scores, setScores] = useState<Record<string, number>>({
    'industry': 0, 'workers': 0, 'geography': 0,
    'p1': 0, 'p2': 0, 'p3': 0, 'p4': 0, 'p5': 0
  });
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Combine criteria for carousel
  const evaluationCriteria = [
    { id: 'industry', type: 'Demografía', title: 'Industria / Rubro', ideal: demographics.industry, desc: 'Sector económico al que pertenece la empresa.', icon: Briefcase },
    { id: 'workers', type: 'Demografía', title: 'Nro. de Trabajadores', ideal: demographics.workers, desc: 'Tamaño de la organización en número de empleados.', icon: Users },
    { id: 'geography', type: 'Demografía', title: 'Área Geográfica', ideal: demographics.geography, desc: 'Ubicación física o alcance de sus operaciones.', icon: MapPin },
    ...psychographics.map((p, i) => ({ id: p.id, type: 'Psicografía', title: `Característica ${i + 1}`, ideal: p.name, desc: p.desc, icon: Settings }))
  ];

  const handleScoreChange = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const totalScore: number = (Object.values(scores) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  const getResult = () => {
    if (totalScore >= 20) return { text: 'Ideal (Avanzar)', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle };
    if (totalScore >= 0) return { text: 'Precaución', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: AlertTriangle };
    return { text: 'Descartar', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle };
  };

  const result = getResult();
  const currentCriteria = evaluationCriteria[carouselIndex];

  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="shrink-0 mb-4 z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-1 flex items-center gap-3">
          Herramienta: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Constructor y Evaluador ICP</span>
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Define tu perfil ideal y luego evalúa a un prospecto usando el carrusel interactivo.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-5 z-10 shrink-0 border-b border-gray-200 dark:border-gray-800 pb-3">
        <button
          onClick={() => setActiveTab('build')}
          className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${activeTab === 'build' ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md' : isDark ? 'bg-[#2a2a2a] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'}`}
        >
          1. Construir ICP
        </button>
        <button
          onClick={() => setActiveTab('evaluate')}
          className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${activeTab === 'evaluate' ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md' : isDark ? 'bg-[#2a2a2a] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'}`}
        >
          2. Evaluar Prospecto
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 min-h-0">
        <AnimatePresence mode="wait">
          
          {/* BUILD TAB */}
          {activeTab === 'build' && (
            <motion.div
              key="build"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row gap-6 h-full min-h-0"
            >
              {/* Demographics */}
              <div className={`w-full md:w-1/2 flex flex-col rounded-2xl border p-5 min-h-0 ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center mb-4 shrink-0">
                  <Briefcase size={18} className="text-[#ff851d] mr-2" />
                  <h3 className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Demografía</h3>
                  <Tooltip isDark={isDark} text="Datos objetivos y mensurables de tu cliente ideal. Define el tamaño, sector y ubicación de las empresas con las que mejor trabajas." />
                </div>
                
                <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Industria o Rubro</label>
                    <input 
                      type="text" 
                      value={demographics.industry}
                      onChange={(e) => setDemographics({...demographics, industry: e.target.value})}
                      className={`p-2.5 rounded-xl border text-sm outline-none transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] text-gray-200 focus:border-[#ff851d]' : 'bg-white border-gray-200 text-gray-800 focus:border-[#ff851d]'}`}
                      placeholder="Ej: Tecnología, Salud, Finanzas..."
                    />
                    <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Sector económico al que pertenece la empresa.</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Nro. de Trabajadores</label>
                    <select 
                      value={demographics.workers}
                      onChange={(e) => setDemographics({...demographics, workers: e.target.value})}
                      className={`p-2.5 rounded-xl border text-sm outline-none transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] text-gray-200 focus:border-[#ff851d]' : 'bg-white border-gray-200 text-gray-800 focus:border-[#ff851d]'}`}
                    >
                      <option value="1-50">1 - 50 empleados</option>
                      <option value="51-200">51 - 200 empleados</option>
                      <option value="201-500">201 - 500 empleados</option>
                      <option value="501-1000">501 - 1000 empleados</option>
                      <option value="1000+">Más de 1000 empleados</option>
                    </select>
                    <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Tamaño de la organización en número de empleados.</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Área Geográfica</label>
                    <input 
                      type="text" 
                      value={demographics.geography}
                      onChange={(e) => setDemographics({...demographics, geography: e.target.value})}
                      className={`p-2.5 rounded-xl border text-sm outline-none transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] text-gray-200 focus:border-[#ff851d]' : 'bg-white border-gray-200 text-gray-800 focus:border-[#ff851d]'}`}
                      placeholder="Ej: Nacional, LATAM, Europa..."
                    />
                    <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Ubicación física o alcance de sus operaciones.</p>
                  </div>
                </div>
              </div>

              {/* Psychographics */}
              <div className={`w-full md:w-1/2 flex flex-col rounded-2xl border p-5 min-h-0 ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center mb-4 shrink-0">
                  <Settings size={18} className="text-[#ef375c] mr-2" />
                  <h3 className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Psicografía (Top 5)</h3>
                  <Tooltip isDark={isDark} text="Valores, actitudes y cultura corporativa. Destila las características de tus mejores clientes (ej. innovadores, éticos) y anótalas aquí." />
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                  {psychographics.map((char, index) => (
                    <div key={char.id} className={`flex flex-col gap-2 p-3 rounded-xl border transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] focus-within:border-[#ef375c]' : 'bg-white border-gray-200 focus-within:border-[#ef375c]'}`}>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#ef375c] text-sm">{index + 1}.</span>
                        <input 
                          type="text" 
                          value={char.name}
                          onChange={(e) => {
                            const newChars = [...psychographics];
                            newChars[index].name = e.target.value;
                            setPsychographics(newChars);
                          }}
                          className={`flex-1 bg-transparent border-none outline-none text-sm font-bold ${isDark ? 'text-gray-200 placeholder-gray-600' : 'text-gray-800 placeholder-gray-400'}`}
                          placeholder="Nombre de la característica..."
                        />
                      </div>
                      <textarea 
                        value={char.desc}
                        onChange={(e) => {
                          const newChars = [...psychographics];
                          newChars[index].desc = e.target.value;
                          setPsychographics(newChars);
                        }}
                        className={`w-full bg-transparent border-none outline-none text-xs resize-none h-10 ${isDark ? 'text-gray-400 placeholder-gray-600' : 'text-gray-500 placeholder-gray-400'}`}
                        placeholder="Descripción de esta característica..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* EVALUATE TAB (SPLIT LAYOUT) */}
          {activeTab === 'evaluate' && (
            <motion.div
              key="evaluate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row gap-6 h-full min-h-0"
            >
              {/* Left: Carousel Card */}
              <div className={`w-full md:w-2/3 flex flex-col rounded-3xl border p-6 md:p-8 relative min-h-0 ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200 shadow-sm'}`}>
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Criterio {carouselIndex + 1} de {evaluationCriteria.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDark ? 'bg-[#1e1e1e] text-[#ff851d]' : 'bg-orange-50 text-[#ff851d]'}`}>
                      {currentCriteria.type}
                    </span>
                    <Tooltip isDark={isDark} text="Evalúa a tu prospecto actual contra el perfil ideal que construiste. Usa el deslizador para asignar un puntaje." />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0 overflow-y-auto custom-scrollbar px-2 md:px-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center w-full"
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg mb-4 shrink-0">
                        <currentCriteria.icon size={32} />
                      </div>
                      
                      <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {currentCriteria.title}
                      </h3>
                      
                      <div className={`p-3 rounded-xl mb-4 w-full max-w-md border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'} block mb-1`}>Valor Ideal Esperado</span>
                        <span className={`text-sm font-bold text-[#ff851d]`}>{currentCriteria.ideal || '(Sin definir)'}</span>
                      </div>

                      <p className={`text-sm max-w-md leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {currentCriteria.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slider & Controls */}
                <div className="shrink-0 mt-6 w-full max-w-md mx-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Evaluación del Prospecto</span>
                    <span className={`text-xl font-black ${scores[currentCriteria.id] > 0 ? 'text-emerald-500' : scores[currentCriteria.id] < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                      {scores[currentCriteria.id] > 0 ? '+' : ''}{scores[currentCriteria.id]}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="-5" 
                    max="5" 
                    step="1"
                    value={scores[currentCriteria.id]}
                    onChange={(e) => handleScoreChange(currentCriteria.id, parseInt(e.target.value))}
                    className="w-full accent-[#ff851d] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-medium px-1 mt-2 mb-6">
                    <span>Pésimo (-5)</span>
                    <span>Neutral (0)</span>
                    <span>Perfecto (+5)</span>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
                      disabled={carouselIndex === 0}
                      className={`p-2 rounded-full transition-colors ${carouselIndex === 0 ? 'opacity-30 cursor-not-allowed' : isDark ? 'hover:bg-[#3a3a3a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                      {evaluationCriteria.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-2 rounded-full transition-all ${idx === carouselIndex ? 'bg-[#ff851d] w-4' : isDark ? 'bg-gray-600 w-2' : 'bg-gray-300 w-2'}`}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={() => setCarouselIndex(prev => Math.min(evaluationCriteria.length - 1, prev + 1))}
                      disabled={carouselIndex === evaluationCriteria.length - 1}
                      className={`p-2 rounded-full transition-colors ${carouselIndex === evaluationCriteria.length - 1 ? 'opacity-30 cursor-not-allowed' : isDark ? 'hover:bg-[#3a3a3a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Scorecard */}
              <div className={`w-full md:w-1/3 flex flex-col rounded-3xl border p-6 min-h-0 ${isDark ? 'bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] border-[#3a3a3a]' : 'bg-gradient-to-b from-gray-50 to-white border-gray-200 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Scorecard</h3>
                  <Tooltip isDark={isDark} text="Puntaje ≥ 20: Ideal. Puntaje ≥ 0: Precaución. Puntaje < 0: Descartar." />
                </div>
                
                <div className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center mb-6 shrink-0 ${result.bg} ${result.border}`}>
                  <result.icon size={32} className={`mb-2 ${result.color}`} />
                  <span className={`text-4xl font-black mb-1 ${result.color}`}>
                    {totalScore > 0 ? '+' : ''}{totalScore}
                  </span>
                  <span className={`text-sm font-bold ${result.color}`}>{result.text}</span>
                </div>

                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Desglose de Puntos</h4>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                  {evaluationCriteria.map(c => (
                    <div key={c.id} className={`flex justify-between items-center p-2.5 rounded-xl ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'} border ${isDark ? 'border-[#3a3a3a]' : 'border-gray-100'}`}>
                      <span className={`text-xs font-medium truncate pr-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{c.title}</span>
                      <span className={`text-xs font-black w-6 text-right ${scores[c.id] > 0 ? 'text-emerald-500' : scores[c.id] < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                        {scores[c.id] > 0 ? '+' : ''}{scores[c.id]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
