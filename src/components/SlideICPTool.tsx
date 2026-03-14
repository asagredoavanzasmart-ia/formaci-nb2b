import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, User, Zap, Plus, Trash2, CheckCircle, AlertTriangle, XCircle, Target, Info, Calculator, TrendingUp, ShieldCheck, MousePointer2, ChevronRight, ChevronLeft, RefreshCcw } from 'lucide-react';

// ─── Tipos e Interfaces ──────────────────────────────────────────────────────
interface CompanyData {
  name: string;
  industry: string;
  size: string;
  geography: string;
  stack: string;
  triggers: string[];
}

interface PersonaData {
  decisor: string;
  influencer: string;
  budgetOwner: string;
  mainPain: string;
  antiIcp: string;
}

interface IceData {
  impact: number;
  confidence: number;
  ease: number;
  evidence: boolean;
}

interface CompleteICP {
  id: string;
  company: CompanyData;
  persona: PersonaData;
  ice: IceData;
}

// ─── Componentes Atómicos ────────────────────────────────────────────────────
const FieldLabel = ({ children, isDark }: { children: React.ReactNode; isDark: boolean }) => (
  <label className={`text-[10px] font-black uppercase tracking-wider mb-1 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{children}</label>
);

const Potentiometer = ({ value, label, color, onChange, isDark }: { 
  value: number; 
  label: string; 
  color: string; 
  onChange: (val: number) => void;
  isDark: boolean;
}) => {
  const radius = 35;
  const stroke = 5;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 10) * circumference;

  return (
    <div className="flex flex-col items-center group relative">
      <div 
        className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95" 
        onClick={() => onChange((value % 10) + 1)}
      >
        {/* Marcadores de graduación (ticks) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(10)].map((_, i) => {
            const angle = (i * 36) - 90;
            const active = i < value;
            return (
              <div 
                key={i} 
                className="absolute w-full h-full flex items-center justify-end"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div 
                  className={`w-1.5 h-[1.5px] rounded-full transition-all duration-300 ${active ? 'opacity-100 scale-125' : 'opacity-20 scale-100'}`}
                  style={{ backgroundColor: active ? color : (isDark ? 'white' : 'black'), marginRight: '2px' }}
                />
              </div>
            );
          })}
        </div>

        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 relative z-10">
          <circle
            stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
        </svg>

        {/* Centro de la perilla */}
        <div className={`absolute inset-[10px] rounded-full flex items-center justify-center font-black text-sm z-20 ${isDark ? 'bg-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]' : 'bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] shadow-xl border border-gray-100'}`}>
          <div className="absolute top-1 w-1 h-3 rounded-full opacity-20" style={{ backgroundColor: color, transform: `rotate(${(value-1)*36}deg)`, transformOrigin: 'bottom center' }} />
          {value}
        </div>
      </div>
      <span className={`text-[8.5px] font-black uppercase tracking-tighter mt-2 opacity-50 ${isDark ? 'text-white' : 'text-black'}`}>{label}</span>
    </div>
  );
};

const RankingChart = ({ icps, isDark }: { icps: CompleteICP[]; isDark: boolean }) => {
  const scores = icps.map(icp => ({ 
    name: icp.company.name || 'Segmento sin nombre', 
    score: icp.ice.impact * icp.ice.confidence * icp.ice.ease 
  }));
  const maxScore = Math.max(...scores.map(s => s.score), 1);
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className={`mt-2 p-6 rounded-[2rem] border ${isDark ? 'bg-black/40 border-white/5' : 'bg-gray-50/50 border-black/5'}`}>
      <div className="flex items-center gap-2 mb-6">
        <Calculator size={18} className="text-[#ff851d]" />
        <h3 className="font-black text-xs uppercase tracking-widest opacity-80">Comparativa Estratégica</h3>
      </div>
      
      <div className="space-y-4">
        {sorted.map((item, idx) => {
          const isWinner = idx === 0 && icps.length > 1;
          const percentage = (item.score / maxScore) * 100;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black ${isWinner ? 'text-[#ff851d]' : 'opacity-40'}`}>
                    #{idx + 1}
                  </span>
                  <span className={`text-xs font-bold truncate max-w-[200px] ${isWinner ? 'opacity-100' : 'opacity-50'}`}>
                    {item.name}
                  </span>
                  {isWinner && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ff851d]/10 text-[#ff851d] text-[8px] font-black uppercase border border-[#ff851d]/20 animate-pulse">
                      ¡Elección Recomendada!
                    </span>
                  )}
                </div>
                <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                  {item.score} pts
                </span>
              </div>
              <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 + idx * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${isWinner ? 'from-[#ff851d] to-[#ef375c] shadow-[0_0_20px_rgba(239,55,92,0.3)]' : isDark ? 'from-gray-700 to-gray-600' : 'from-gray-300 to-gray-400'}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function SlideICPTool({ isDark }: { isDark: boolean }) {
  const [icps, setIcps] = useState<CompleteICP[]>([]);
  const [step, setStep] = useState(0); // 0: Empresa, 1: Persona, 2: Decisión, 3: Evaluación

  // Estados Temporales para el Formulario Actual
  const [tempCompany, setTempCompany] = useState<CompanyData>({
    name: '', industry: '', size: '51-200', geography: '', stack: '', triggers: []
  });
  const [tempPersona, setTempPersona] = useState<PersonaData>({
    decisor: '', influencer: '', budgetOwner: '', mainPain: '', antiIcp: ''
  });

  const DISPARADORES = [
    'Están contratando', 'Levantaron inversión', 'Cambiaron C-Level', 
    'Lanzaron nuevo producto', 'Pasaron 50 empleados'
  ];

  const handleNext = () => {
    if (step === 0 && !tempCompany.name) return;
    setStep(step + 1);
  };

  const saveAndAsk = () => {
    const newIcp: CompleteICP = {
      id: `icp-${Date.now()}`,
      company: { ...tempCompany },
      persona: { ...tempPersona },
      ice: { impact: 5, confidence: 5, ease: 5, evidence: false }
    };
    setIcps([...icps, newIcp]);
    resetTemps();
    setStep(2); // Ir a la pantalla de decisión
  };

  const resetTemps = () => {
    setTempCompany({ name: '', industry: '', size: '51-200', geography: '', stack: '', triggers: [] });
    setTempPersona({ decisor: '', influencer: '', budgetOwner: '', mainPain: '', antiIcp: '' });
  };

  const updateIce = (id: string, field: keyof IceData, value: number | boolean) => {
    setIcps(prev => prev.map(icp => icp.id === id ? { ...icp, ice: { ...icp.ice, [field]: value } } : icp));
  };

  const deleteIcp = (id: string) => {
    setIcps(icps.filter(i => i.id !== id));
  };

  const panelClass = isDark ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-100 shadow-sm';
  const inputClass = `w-full p-2.5 rounded-xl border text-xs outline-none transition-all ${isDark ? 'bg-[#1a1a1a] border-[#333] text-gray-200 focus:border-[#ff851d]' : 'bg-white border-gray-200 text-gray-800 focus:border-[#ff851d]'}`;

  const renderStepper = () => (
    <div className="flex justify-center gap-1.5 mb-6 shrink-0">
      {[0, 1, 2, 3].map((s) => (
        <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-10 bg-gradient-to-r from-[#ff851d] to-[#ef375c]' : 'w-4 bg-gray-200 dark:bg-gray-800'}`} />
      ))}
    </div>
  );

  return (
    <div className={`p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-black/5'}`}>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#ff851d]/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ef375c]/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="shrink-0 mb-6 z-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black mb-1 flex items-center gap-3 tracking-tighter">
            <Target size={28} className="text-[#ff851d]" />
            Herramienta: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Estrategia e ICP</span>
          </h2>
          <p className={`text-sm font-medium opacity-50`}>Define tu mercado, tus personas y mide el potencial estratégico.</p>
        </div>
      </div>

      {renderStepper()}

      <div className="flex-1 z-10 min-h-0 relative">
        <AnimatePresence mode="wait">
          {/* STEP 0: EMPRESA */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-6">
              <div className={`w-full p-8 rounded-[2.5rem] border ${panelClass} space-y-5`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Paso 1: Firmografía de la Empresa</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FieldLabel isDark={isDark}>Nombre del Segmento / Empresa</FieldLabel>
                    <input type="text" value={tempCompany.name} onChange={e => setTempCompany({...tempCompany, name: e.target.value})} placeholder="Ej: Fintechs en Serie A..." className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Industria</FieldLabel>
                    <input type="text" value={tempCompany.industry} onChange={e => setTempCompany({...tempCompany, industry: e.target.value})} placeholder="Ej: SaaS B2B" className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Tamaño</FieldLabel>
                    <select value={tempCompany.size} onChange={e => setTempCompany({...tempCompany, size: e.target.value})} className={inputClass}>
                      <option value="1-50">1-50 empleados</option><option value="51-200">51-200 empleados</option><option value="201+">201+ empleados</option>
                    </select>
                  </div>
                </div>

                <div>
                  <FieldLabel isDark={isDark}>Señales / Disparadores de Compra</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {DISPARADORES.map(d => (
                      <button key={d} onClick={() => setTempCompany({
                        ...tempCompany, 
                        triggers: tempCompany.triggers.includes(d) ? tempCompany.triggers.filter(x => x !== d) : [...tempCompany.triggers, d]
                      })} className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all border ${tempCompany.triggers.includes(d) ? 'bg-[#ff851d] border-transparent text-white' : isDark ? 'bg-[#1a1a1a] border-[#333] text-gray-500' : 'bg-white border-gray-200 text-gray-400'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button onClick={handleNext} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 flex items-center gap-2 hover:scale-105 transition-transform">
                    Continuar <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: PERSONA */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-6">
              <div className={`w-full p-8 rounded-[2.5rem] border ${panelClass} space-y-5`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ef375c] to-[#f43f5e] text-white shadow-lg">
                    <User size={24} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Paso 2: Buyer Persona</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel isDark={isDark}>Decisor Principal</FieldLabel>
                    <input type="text" value={tempPersona.decisor} onChange={e => setTempPersona({...tempPersona, decisor: e.target.value})} placeholder="Ej: CFO, Founder" className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Influenciador Clave</FieldLabel>
                    <input type="text" value={tempPersona.influencer} onChange={e => setTempPersona({...tempPersona, influencer: e.target.value})} placeholder="Ej: Gerente TI" className={inputClass} />
                  </div>
                  <div className="col-span-2">
                    <FieldLabel isDark={isDark}>Dolor Estratégico Principal</FieldLabel>
                    <textarea rows={2} value={tempPersona.mainPain} onChange={e => setTempPersona({...tempPersona, mainPain: e.target.value})} placeholder="¿Qué problema real les quita el sueño?" className={`${inputClass} resize-none`} />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={() => setStep(0)} className="px-6 py-3 rounded-2xl font-bold text-sm opacity-50 flex items-center gap-2">
                    <ChevronLeft size={18} /> Atrás
                  </button>
                  <button onClick={saveAndAsk} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-red-500/20 flex items-center gap-2 hover:scale-105 transition-transform">
                    Guardar y Continuar <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DECISIÓN */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-8 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter">ICP Guardado Correctamente</h3>
                <p className="opacity-60 max-w-md mx-auto">Has definido con éxito un perfil de cliente. ¿Qué deseas hacer ahora?</p>
              </div>

              <div className="flex gap-4">
                {icps.length < 3 && (
                  <button onClick={() => setStep(0)} className={`flex flex-col items-center gap-3 p-6 rounded-[2rem] border transition-all hover:scale-105 w-48 ${panelClass} hover:border-[#ff851d]`}>
                    <Plus size={32} className="text-[#ff851d]" />
                    <span className="font-black text-xs uppercase tracking-widest">Agregar Otro ICP</span>
                    <span className="text-[10px] opacity-40">({icps.length}/3 agregados)</span>
                  </button>
                )}
                <button onClick={() => setStep(3)} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] border transition-all hover:scale-105 w-48 bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white border-transparent shadow-xl shadow-red-500/20">
                  <Zap size={32} />
                  <span className="font-black text-xs uppercase tracking-widest">Ir a Evaluación</span>
                  <span className="text-[10px] opacity-80">Finalizar Definición</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: EVALUACIÓN ICE (POTENCIÓMETROS + GRÁFICO) */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                {icps.length === 0 ? (
                   <div className="col-span-3 flex flex-col items-center justify-center opacity-20 py-12">
                      <XCircle size={64} className="mb-4" />
                      <p className="font-black">No hay ICPs definidos.</p>
                      <button onClick={() => setStep(0)} className="underline mt-2">Empezar de nuevo</button>
                   </div>
                ) : icps.map((icp, idx) => {
                  const score = icp.ice.impact * icp.ice.confidence * icp.ice.ease;
                  return (
                    <motion.div 
                      key={icp.id} 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`flex flex-col p-5 rounded-[2.2rem] border relative overflow-hidden ${panelClass}`}
                    >
                      <button onClick={() => deleteIcp(icp.id)} className="absolute top-4 right-4 text-red-500/30 hover:text-red-500 transition-colors z-30">
                        <Trash2 size={14} />
                      </button>

                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-xl font-black text-[#ff851d] opacity-20">0{idx+1}</span>
                        <div className="min-w-0">
                          <h4 className="font-black text-[11px] truncate uppercase tracking-tight">{icp.company.name}</h4>
                          <p className="text-[9px] opacity-40 font-bold truncate">{icp.company.industry} • {icp.company.size}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between flex-1 py-1 px-2">
                        <Potentiometer value={icp.ice.impact} label="Impacto" color="#ff851d" onChange={(v) => updateIce(icp.id, 'impact', v)} isDark={isDark} />
                        <Potentiometer value={icp.ice.confidence} label="Confianza" color="#ef375c" onChange={(v) => updateIce(icp.id, 'confidence', v)} isDark={isDark} />
                        <Potentiometer value={icp.ice.ease} label="Facilidad" color="#60a5fa" onChange={(v) => updateIce(icp.id, 'ease', v)} isDark={isDark} />
                      </div>

                      <div className={`mt-4 p-3 rounded-[1.5rem] border-t-2 border-dashed flex items-center justify-between ${isDark ? 'bg-black/20 border-white/5' : 'bg-white border-black/5'}`}>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">ICE SCORE</span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                          {score}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* GRÁFICO DE COMPARACIÓN */}
              {icps.length > 0 && <RankingChart icps={icps} isDark={isDark} />}

              <div className="shrink-0 flex justify-between items-center py-4 px-6 border-t border-gray-500/10 mt-2">
                <div className="flex items-center gap-3">
                  <RefreshCcw size={16} className="text-[#ff851d]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Presiona el centro del potenciómetro para rotar valor</p>
                </div>
                <button onClick={() => { setIcps([]); setStep(0); }} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs transition-all ${isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  Reiniciar Todo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
