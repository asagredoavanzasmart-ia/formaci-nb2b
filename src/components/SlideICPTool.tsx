import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  User, 
  Zap, 
  Plus, 
  X, 
  CheckCircle, 
  Target, 
  Info, 
  Calculator, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft, 
  RefreshCcw,
  Layers,
  Users,
  MessageSquare,
  AlertCircle,
  Gem,
  Globe,
  Wallet,
  Settings,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';

import { CompleteICP, CompanyData, PersonaData, IceData, SegmentData, BuyerPersona } from '../types';

interface SlideICPToolProps {
  isDark: boolean;
  onIcpCreated?: (icp: CompleteICP) => void;
  savedIcps?: CompleteICP[];
}

// ─── Componentes Auxiliares ──────────────────────────────────────────────────
const FieldLabel = ({ children, isDark }: { children: React.ReactNode; isDark: boolean }) => (
  <label className={`text-[10px] font-black uppercase tracking-widest mb-1.5 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{children}</label>
);

const SectionHeader = ({ icon: Icon, title, isDark, color }: { icon: any, title: string, isDark: boolean, color: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`p-2.5 rounded-xl bg-${color}-500/10 text-${color}-500`}>
      <Icon size={20} />
    </div>
    <h3 className="text-xl font-black tracking-tight">{title}</h3>
  </div>
);

const Potentiometer = ({ value, label, color, onChange, isDark }: { 
  value: number; 
  label: string; 
  color: string; 
  onChange: (val: number) => void;
  isDark: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleUpdate = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    const angleRad = Math.atan2(clientY - centerY, clientX - centerX);
    let angleDeg = (angleRad * 180) / Math.PI + 90;
    if (angleDeg < 0) angleDeg += 360;
    
    const newValue = Math.min(10, Math.max(1, Math.round((angleDeg / 360) * 9) + 1));
    if (newValue !== value) onChange(newValue);
  };

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    handleUpdate(e);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => isDragging && handleUpdate(e);
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove as any);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove as any);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const radius = 35; 
  const stroke = 5;
  const normRadius = radius - stroke;
  const circumference = normRadius * 2 * Math.PI;
  const dashOffset = circumference - (value / 10) * circumference;
  const rotation = (value / 10) * 360;

  return (
    <div className="flex flex-row items-center justify-between w-full max-w-[220px] mx-auto select-none group gap-4">
      <span className={`text-sm font-bold leading-tight ${isDragging ? 'text-[#ff851d]' : isDark ? 'text-gray-400' : 'text-gray-500'} flex-1 text-left`}>
        {label}
      </span>

      <div 
        ref={containerRef}
        className="relative cursor-pointer touch-none shrink-0"
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        style={{ width: radius * 2.1, height: radius * 2.1 }}
      >
        <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          <circle
            cx={radius} cy={radius} r={normRadius}
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}
            strokeWidth={stroke}
          />
          <motion.circle
            cx={radius} cy={radius} r={normRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className={`relative w-11 h-11 rounded-full flex items-center justify-center ${
              isDark 
                ? 'bg-gradient-to-br from-[#333] to-[#1a1a1a] shadow-[0_4px_10px_rgba(0,0,0,0.4)]' 
                : 'bg-gradient-to-br from-white to-gray-200 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-gray-100'
            }`}
          >
            <div className="absolute top-1 w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {value}
            </span>
          </div>
        </div>
      </div>
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
    <div className={`p-8 rounded-[3rem] border h-full flex flex-col ${isDark ? 'bg-black/20 border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-2xl'}`}>
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <div className="p-3 rounded-2xl bg-[#ff851d]/10 text-[#ff851d] shadow-lg shadow-[#ff851d]/10">
          <Calculator size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight">Comparativa Estratégica</h3>
          <p className="text-xs opacity-50 font-bold uppercase tracking-wider">Priorización basada en Modelo ICE</p>
        </div>
      </div>
      
      <div className="flex-1 space-y-6 overflow-y-auto pr-3 custom-scrollbar min-h-0">
        {sorted.map((item, idx) => {
          const isWinner = idx === 0 && icps.length > 1;
          const percentage = (item.score / maxScore) * 100;
          return (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner ${isWinner ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white' : 'bg-gray-500/10 opacity-30'}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <span className={`text-sm font-black block tracking-tight ${isWinner ? 'text-[#ff851d]' : 'opacity-60'}`}>
                      {item.name}
                    </span>
                    {isWinner && (
                      <span className="text-[10px] font-black uppercase text-[#ef375c] tracking-widest mt-0.5 block flex items-center gap-1">
                        <Award size={10} /> Win Ready
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
                    {item.score}
                  </span>
                  <span className="text-[10px] block opacity-40 font-black tracking-widest leading-none mt-1">TOTAL PUNTOS</span>
                </div>
              </div>
              <div className={`h-3 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.2 + idx * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${isWinner ? 'from-[#ff851d] to-[#ef375c]' : 'from-gray-500/30 to-gray-500/10'}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {sorted.length > 0 && (
        <div className={`mt-8 p-6 rounded-[2rem] border shrink-0 ${isDark ? 'bg-[#ff851d]/5 border-[#ff851d]/10' : 'bg-orange-50/70 border-orange-100/50 shadow-inner'}`}>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-[#ff851d] text-white">
              <Info size={16} />
            </div>
            <p className="text-sm leading-relaxed font-bold">
              El análisis indica que <span className="text-[#ff851d]">{sorted[0].name}</span> es el segmento con mayor probabilidad de éxito inmediato. 
              <span className="block mt-1 font-medium opacity-60">Impacto concentrado y baja fricción operativa detectada.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function SlideICPTool({ isDark, onIcpCreated, savedIcps = [] }: SlideICPToolProps) {
  const [icps, setIcps] = useState<CompleteICP[]>(savedIcps);
  const [step, setStep] = useState(0); // 0: Company, 1: Persona/Pain, 2: Segments, 3: Buyer Personas, 4: Confirmation, 5: ICE, 6: Ranking

  // Estados Temporales
  const [tempCompany, setTempCompany] = useState<CompanyData>({
    name: '', industry: '', size: 'Pyme established', revenue: '', geography: '', context: '', mainProblem: '', kpis: '', prerequisites: '', buyerProfile: '', pains: [], results: []
  });
  const [tempPersona, setTempPersona] = useState<PersonaData>({
    decisor: '', influencer: '', budgetOwner: '', mainPain: '', antiIcp: ''
  });
  const [tempSegments, setTempSegments] = useState<SegmentData[]>([]);
  const [tempBuyerPersonas, setTempBuyerPersonas] = useState<BuyerPersona[]>([]);

  // Helpers para listas dinámicas
  const addSegment = () => setTempSegments([...tempSegments, { id: `s-${Date.now()}`, name: '', description: '', dominantPain: '', message: '' }]);
  const updateSegment = (id: string, field: keyof SegmentData, val: string) => 
    setTempSegments(tempSegments.map(s => s.id === id ? { ...s, [field]: val } : s));
  const removeSegment = (id: string) => setTempSegments(tempSegments.filter(s => s.id !== id));

  const addBuyerPersona = () => setTempBuyerPersonas([...tempBuyerPersonas, { id: `bp-${Date.now()}`, role: '', objectives: '', fears: '', language: '', resonance: '' }]);
  const updateBuyerPersona = (id: string, field: keyof BuyerPersona, val: string) => 
    setTempBuyerPersonas(tempBuyerPersonas.map(bp => bp.id === id ? { ...bp, [field]: val } : bp));
  const removeBuyerPersona = (id: string) => setTempBuyerPersonas(tempBuyerPersonas.filter(bp => bp.id !== id));

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const saveIcp = () => {
    const newIcp: CompleteICP = {
      id: `icp-${Date.now()}`,
      company: { ...tempCompany },
      persona: { ...tempPersona },
      segments: [...tempSegments],
      buyerPersonas: [...tempBuyerPersonas],
      ice: { impact: 5, confidence: 5, ease: 5, evidence: false }
    };
    const updated = [...icps, newIcp];
    setIcps(updated);
    if (onIcpCreated) onIcpCreated(newIcp);
    resetTemps();
    setStep(4);
  };

  const resetTemps = () => {
    setTempCompany({ name: '', industry: '', size: 'Pyme established', revenue: '', geography: '', context: '', mainProblem: '', kpis: '', prerequisites: '', buyerProfile: '', pains: [], results: [] });
    setTempPersona({ decisor: '', influencer: '', budgetOwner: '', mainPain: '', antiIcp: '' });
    setTempSegments([]);
    setTempBuyerPersonas([]);
  };

  const updateIce = (id: string, field: keyof IceData, value: number | boolean) => {
    setIcps(prev => prev.map(icp => icp.id === id ? { ...icp, ice: { ...icp.ice, [field]: value } } : icp));
  };

  const panelClass = isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50 border-gray-100 shadow-sm';
  const inputClass = `w-full p-3.5 rounded-2xl border text-sm outline-none transition-all font-medium ${isDark ? 'bg-black/40 border-white/10 text-gray-200 focus:border-[#ff851d]' : 'bg-white border-gray-200 text-gray-800 focus:border-[#ff851d] shadow-sm'}`;

  const renderStepper = () => (
    <div className="flex justify-center gap-2 mb-8 shrink-0">
      {[0, 1, 2, 3, 4, 5, 6].map((s) => (
        <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step === s ? 'w-10 bg-gradient-to-r from-[#ff851d] to-[#ef375c]' : 'w-4 bg-gray-500/10'}`} />
      ))}
    </div>
  );

  return (
    <div className={`p-8 md:p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white border border-black/5'}`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-[#ff851d]/10 via-[#ef375c]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-[#ef375c]/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="shrink-0 mb-6 z-10 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black mb-1 flex items-center gap-4 tracking-tight">
            <div className="p-2 bg-gradient-to-br from-[#ff851d] to-[#ef375c] rounded-xl text-white shadow-lg">
              <Target size={28} />
            </div>
            Constructor Estratégico <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">ICP 2.0</span>
          </h2>
          <p className="text-sm font-bold opacity-40 uppercase tracking-widest italic ml-14">Definición Profunda de Segmentos y Personas B2B</p>
        </div>
      </div>

      {renderStepper()}

      <div className="flex-1 z-10 min-h-0 relative overflow-y-auto custom-scrollbar pr-2 pb-4">
        <AnimatePresence mode="wait">
          {/* STEP 0: FIRMOGRAFÍA PROFUNDA */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className={`p-10 rounded-[3rem] border ${panelClass}`}>
                <SectionHeader icon={Building2} title="Módulo 1: Perfil de Cuenta (ICP)" isDark={isDark} color="orange" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="md:col-span-2 lg:col-span-3">
                    <FieldLabel isDark={isDark}>Nombre del Segmento</FieldLabel>
                    <input type="text" value={tempCompany.name} onChange={e => setTempCompany({...tempCompany, name: e.target.value})} placeholder="Ej: Servicios Industriales Metalmecánicos..." className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Industria específica</FieldLabel>
                    <input type="text" value={tempCompany.industry} onChange={e => setTempCompany({...tempCompany, industry: e.target.value})} placeholder="Ej: Climatización, Estructuras..." className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Tamaño / Etapa</FieldLabel>
                    <input type="text" value={tempCompany.size} onChange={e => setTempCompany({...tempCompany, size: e.target.value})} placeholder="Ej: 5-30 años, 5-25 emp." className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Facturación Mensual</FieldLabel>
                    <input type="text" value={tempCompany.revenue} onChange={e => setTempCompany({...tempCompany, revenue: e.target.value})} placeholder="5M - 80M CLP" className={inputClass} />
                  </div>
                  <div>
                    <FieldLabel isDark={isDark}>Geografía</FieldLabel>
                    <input type="text" value={tempCompany.geography} onChange={e => setTempCompany({...tempCompany, geography: e.target.value})} placeholder="Ej: Chile (Stgo, Quinta Región)" className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel isDark={isDark}>Contexto Operativo</FieldLabel>
                    <input type="text" value={tempCompany.context} onChange={e => setTempCompany({...tempCompany, context: e.target.value})} placeholder="Ej: Usa Excel como CRM, dueño es cerador..." className={inputClass} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pr-4">
                <button onClick={handleNext} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                  Paso 2: Análisis de Dolor <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: DOLORES Y RESULTADOS */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
               <div className={`p-10 rounded-[3.5rem] border ${panelClass}`}>
                  <SectionHeader icon={AlertCircle} title="Problemas y Resultados Deseados" isDark={isDark} color="red" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div>
                           <FieldLabel isDark={isDark}>Problema Central</FieldLabel>
                           <textarea rows={3} value={tempCompany.mainProblem} onChange={e => setTempCompany({...tempCompany, mainProblem: e.target.value})} placeholder="El obstáculo principal que frena su crecimiento..." className={`${inputClass} resize-none`} />
                        </div>
                        <div>
                           <FieldLabel isDark={isDark}>Dolores Principales (Uno por línea)</FieldLabel>
                           <textarea rows={4} value={tempCompany.pains.join('\n')} onChange={e => setTempCompany({...tempCompany, pains: e.target.value.split('\n')})} placeholder="Concentración de riesgo, flujo inestable..." className={`${inputClass} resize-none font-mono text-xs`} />
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div>
                           <FieldLabel isDark={isDark}>KPIs de Éxito</FieldLabel>
                           <textarea rows={3} value={tempCompany.kpis} onChange={e => setTempCompany({...tempCompany, kpis: e.target.value})} placeholder="Métricas de logro (Ej: 20 cotizaciones/mes)..." className={`${inputClass} resize-none`} />
                        </div>
                        <div>
                           <FieldLabel isDark={isDark}>Resultados Deseados (Uno por línea)</FieldLabel>
                           <textarea rows={4} value={tempCompany.results.join('\n')} onChange={e => setTempCompany({...tempCompany, results: e.target.value.split('\n')})} placeholder="Diversificación, oxígeno financiero..." className={`${inputClass} resize-none font-mono text-xs`} />
                        </div>
                     </div>
                     <div className="md:col-span-2 grid grid-cols-2 gap-8 pt-4">
                        <div>
                           <FieldLabel isDark={isDark}>Prerrequisitos mínimos</FieldLabel>
                           <input type="text" value={tempCompany.prerequisites} onChange={e => setTempCompany({...tempCompany, prerequisites: e.target.value})} placeholder="Certificaciones, material visual, capacidad..." className={inputClass} />
                        </div>
                        <div>
                           <FieldLabel isDark={isDark}>Perfil del Comprador</FieldLabel>
                           <input type="text" value={tempCompany.buyerProfile} onChange={e => setTempCompany({...tempCompany, buyerProfile: e.target.value})} placeholder="Dueño Pyme técnica, experto silencioso..." className={inputClass} />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex justify-between items-center px-4">
                  <button onClick={handleBack} className="font-black opacity-30 hover:opacity-100 uppercase text-xs tracking-widest flex items-center gap-2">
                     <ChevronLeft size={18} /> Atrás
                  </button>
                  <button onClick={handleNext} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                     Paso 3: Sub-Segmentos <Layers size={20} />
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP 2: SEGMENTOS DENTRO DEL ICP */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
               <div className={`p-10 rounded-[3.5rem] border ${panelClass}`}>
                  <div className="flex justify-between items-center mb-8">
                    <SectionHeader icon={Layers} title="Módulo 2: Segmentos del ICP" isDark={isDark} color="blue" />
                    <button onClick={addSegment} className="bg-[#ff851d]/10 text-[#ff851d] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#ff851d] hover:text-white transition-all">
                       <Plus size={16} /> Añadir Segmento
                    </button>
                  </div>

                  <div className="space-y-6">
                    {tempSegments.length === 0 && (
                      <div className="py-20 text-center opacity-20 border-2 border-dashed rounded-[2rem] border-gray-500">
                         <Layers size={48} className="mx-auto mb-4" />
                         <p className="font-bold">No hay sub-segmentos definidos</p>
                      </div>
                    )}
                    {tempSegments.map((s) => (
                      <motion.div key={s.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`p-8 rounded-3xl border ${isDark ? 'bg-black/40 border-white/5' : 'bg-white border-gray-200 shadow-sm'} relative group`}>
                         <button onClick={() => removeSegment(s.id)} className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={18} />
                         </button>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <FieldLabel isDark={isDark}>Alias del Segmento</FieldLabel>
                               <input type="text" value={s.name} onChange={e => updateSegment(s.id, 'name', e.target.value)} placeholder="Ej: El Rehén de la Licitación" className={inputClass} />
                            </div>
                            <div>
                               <FieldLabel isDark={isDark}>Dolor Dominante</FieldLabel>
                               <input type="text" value={s.dominantPain} onChange={e => updateSegment(s.id, 'dominantPain', e.target.value)} placeholder="Ej: El mercado público paga mal..." className={inputClass} />
                            </div>
                            <div className="md:col-span-2">
                               <FieldLabel isDark={isDark}>Descripción y Mensaje</FieldLabel>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <textarea rows={2} value={s.description} onChange={e => updateSegment(s.id, 'description', e.target.value)} placeholder="Características específicas..." className={`${inputClass} resize-none`} />
                                  <textarea rows={2} value={s.message} onChange={e => updateSegment(s.id, 'message', e.target.value)} placeholder="Ángulo de marketing o promesa..." className={`${inputClass} resize-none border-[#ff851d]/30`} />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
               </div>
               <div className="flex justify-between items-center px-4">
                  <button onClick={handleBack} className="font-black opacity-30 hover:opacity-100 uppercase text-xs tracking-widest flex items-center gap-2">
                     <ChevronLeft size={18} /> Atrás
                  </button>
                  <button onClick={handleNext} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                     Paso 4: Buyer Personas <Users size={20} />
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP 3: BUYER PERSONAS */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
               <div className={`p-10 rounded-[3.5rem] border ${panelClass}`}>
                  <div className="flex justify-between items-center mb-8">
                    <SectionHeader icon={Users} title="Módulo 3: Buyer Personas" isDark={isDark} color="pink" />
                    <button onClick={addBuyerPersona} className="bg-[#ef375c]/10 text-[#ef375c] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#ef375c] hover:text-white transition-all">
                       <Plus size={16} /> Añadir Rol
                    </button>
                  </div>

                  <div className="space-y-8">
                    {tempBuyerPersonas.length === 0 && (
                      <div className="py-20 text-center opacity-20 border-2 border-dashed rounded-[2rem] border-gray-500">
                         <Users size={48} className="mx-auto mb-4" />
                         <p className="font-bold">No hay roles definidos</p>
                      </div>
                    )}
                    {tempBuyerPersonas.map((bp) => (
                      <motion.div key={bp.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`p-8 rounded-[2.5rem] border-l-8 border-l-[#ef375c] ${isDark ? 'bg-black/40 border-[#ef375c]/20' : 'bg-white border-gray-100 shadow-md'} relative`}>
                         <button onClick={() => removeBuyerPersona(bp.id)} className="absolute top-6 right-6 text-red-500/30 hover:text-red-500 transition-colors">
                            <X size={18} />
                         </button>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-1">
                               <FieldLabel isDark={isDark}>Cargo / Función</FieldLabel>
                               <input type="text" value={bp.role} onChange={e => updateBuyerPersona(bp.id, 'role', e.target.value)} placeholder="Ej: Gerente General..." className={`${inputClass} font-black text-lg`} />
                               <div className="mt-6">
                                  <FieldLabel isDark={isDark}>Lenguaje / Jerga</FieldLabel>
                                  <textarea rows={2} value={bp.language} onChange={e => updateBuyerPersona(bp.id, 'language', e.target.value)} placeholder="Ej: Circo pobre, Patear el arco..." className={`${inputClass} text-xs italic bg-transparent p-0 border-none truncate`} />
                               </div>
                            </div>
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-gray-500/5">
                               <div>
                                  <FieldLabel isDark={isDark}>Objetivos</FieldLabel>
                                  <textarea rows={2} value={bp.objectives} onChange={e => updateBuyerPersona(bp.id, 'objectives', e.target.value)} placeholder="Metas personales y prof..." className={`${inputClass} text-xs`} />
                               </div>
                               <div>
                                  <FieldLabel isDark={isDark}>Miedos / Barreras</FieldLabel>
                                  <textarea rows={2} value={bp.fears} onChange={e => updateBuyerPersona(bp.id, 'fears', e.target.value)} placeholder="Objeciones y riesgos..." className={`${inputClass} text-xs`} />
                               </div>
                               <div className="md:col-span-2">
                                  <FieldLabel isDark={isDark}>Resonancia (Casos que lo convencen)</FieldLabel>
                                  <input type="text" value={bp.resonance} onChange={e => updateBuyerPersona(bp.id, 'resonance', e.target.value)} placeholder="Ej: Casos de éxito en metalmecánica..." className={inputClass} />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
               </div>
               <div className="flex justify-between items-center px-4">
                  <button onClick={handleBack} className="font-black opacity-30 hover:opacity-100 uppercase text-xs tracking-widest flex items-center gap-2">
                     <ChevronLeft size={18} /> Atrás
                  </button>
                  <button onClick={handleNext} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-10 py-4 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
                     Finalizar Definición <CheckCircle size={20} />
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRMACIÓN Y PREVIO */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-8">
               <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-4 animate-bounce-slow shadow-lg shadow-emerald-500/10">
                  <ShieldCheck size={56} />
               </div>
               <h3 className="text-4xl font-black italic tracking-tighter">¡Arquitectura de ICP Completa!</h3>
               <p className="opacity-60 max-w-lg mx-auto font-bold uppercase tracking-widest text-xs">Hemos procesado la firmografía profunda, sub-segmentos y buyer personas.</p>
               
               <div className="flex gap-8 mt-10">
                  <button onClick={() => setStep(0)} className="flex flex-col items-center gap-4 p-10 rounded-[3rem] border-2 border-dashed border-gray-500/20 hover:border-[#ff851d] transition-all group w-64">
                     <RefreshCcw size={40} className="text-[#ff851d]/50 group-hover:text-[#ff851d] group-hover:rotate-180 transition-all duration-700" />
                     <span className="font-black uppercase tracking-widest text-[10px]">Reiniciar Construcción</span>
                  </button>
                  <button onClick={saveIcp} className="flex flex-col items-center gap-4 p-10 rounded-[3rem] bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-2xl shadow-[#ff851d]/30 hover:scale-[1.03] active:scale-95 transition-all w-64 border-none relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={60} />
                     </div>
                     <Zap size={40} className="animate-pulse" />
                     <span className="font-black uppercase tracking-widest text-[10px]">Ejecutar Evaluación ICE</span>
                  </button>
               </div>
            </motion.div>
          )}

          {/* STEP 5: EVALUACIÓN ICE (POTENCIOMETROS) */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col min-h-0 overflow-y-auto custom-scrollbar pr-1 pb-4">
              <div className="flex-1 flex flex-wrap justify-center gap-8 shrink-0 mb-8 py-4">
                {icps.length === 0 ? (
                  <div className="py-20 text-center opacity-30 italic">No hay perfiles activos para evaluar</div>
                ) : (
                  icps.map((icp) => (
                    <motion.div key={icp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col p-8 rounded-[3.5rem] border overflow-hidden relative ${panelClass} w-full max-w-[320px] shadow-xl group`}>
                      <button onClick={() => setIcps(icps.filter(i => i.id !== icp.id))} className="absolute top-6 right-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={20} />
                      </button>
                      <div className="mb-8 text-center border-b border-gray-500/10 pb-4">
                        <h4 className="font-black text-lg tracking-tight truncate">{icp.company.name}</h4>
                        <div className="flex items-center justify-center gap-2 mt-2">
                           <span className="px-3 py-1 bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white rounded-full text-[8px] font-black uppercase tracking-widest">
                             {icp.segments?.length || 0} Segmentos
                           </span>
                           <span className="px-3 py-1 bg-gray-500/10 rounded-full text-[8px] font-black uppercase tracking-widest">
                             {icp.buyerPersonas?.length || 0} Roles
                           </span>
                        </div>
                      </div>
                      <div className="space-y-8 py-2">
                        <Potentiometer value={icp.ice.impact} label="Impacto Comercial" color="#ff851d" onChange={(v) => updateIce(icp.id, 'impact', v)} isDark={isDark} />
                        <Potentiometer value={icp.ice.confidence} label="Confianza de Cierre" color="#ef375c" onChange={(v) => updateIce(icp.id, 'confidence', v)} isDark={isDark} />
                        <Potentiometer value={icp.ice.ease} label="Facilidad Técnica" color="#f43f5e" onChange={(v) => updateIce(icp.id, 'ease', v)} isDark={isDark} />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              <div className={`mt-auto shrink-0 flex flex-col lg:flex-row justify-between items-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-100/50 border-gray-200'} p-8 rounded-[3rem] border gap-10`}>
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#ff851d] uppercase tracking-[0.2em] block">Impacto</span>
                    <p className="text-[11px] opacity-50 font-medium leading-tight">Valor total y replicabilidad del acuerdo en el mercado.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#ef375c] uppercase tracking-[0.2em] block">Confianza</span>
                    <p className="text-[11px] opacity-50 font-medium leading-tight">Garantía de éxito basada en casos y experiencia previa.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#f43f5e] uppercase tracking-[0.2em] block">Facilidad</span>
                    <p className="text-[11px] opacity-50 font-medium leading-tight">Simplicidad de implementación y ciclo de venta corto.</p>
                  </div>
                </div>
                <button onClick={() => setStep(6)} className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-2xl font-black shadow-2xl hover:scale-[1.03] transition-all whitespace-nowrap text-md flex items-center gap-3">
                  CALCULAR RANKING ESTRATÉGICO <TrendingUp size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: RANKING FINAL */}
          {step === 6 && (
            <motion.div key="s6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="h-full max-w-4xl mx-auto w-full flex flex-col min-h-0 pb-6">
              <div className="flex-1 min-h-0">
                <RankingChart icps={icps} isDark={isDark} />
              </div>
              <div className="mt-8 flex justify-between shrink-0 px-4">
                <button onClick={() => setStep(5)} className="px-6 py-3 rounded-2xl font-black opacity-30 hover:opacity-100 flex items-center gap-3 transition-opacity text-xs uppercase tracking-widest">
                  <ChevronLeft size={18} /> Ajustar Potenciómetros
                </button>
                <button onClick={() => { setIcps([]); setStep(0); resetTemps(); }} className={`px-8 py-3 rounded-2xl font-black flex items-center gap-3 transition-all text-xs uppercase tracking-widest shadow-xl ${isDark ? 'bg-white/5 hover:bg-[#ff851d] hover:text-white' : 'bg-gray-100 hover:bg-black hover:text-white'}`}>
                  Nuevos ICPs <RefreshCcw size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
