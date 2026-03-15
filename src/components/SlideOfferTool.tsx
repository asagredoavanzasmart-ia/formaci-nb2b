import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Sparkles, 
  Target, 
  Zap, 
  Shield, 
  Trophy, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  X, 
  Layers, 
  DollarSign, 
  Flame, 
  Users, 
  Crown, 
  Timer, 
  Rocket, 
  Copy, 
  Check,
  TrendingUp,
  ZapOff
} from 'lucide-react';
import { CompleteICP } from '../types';

interface SlideOfferToolProps {
  isDark: boolean;
  icps: CompleteICP[];
}

interface ObstacleSolution {
  id: string;
  obstacle: string;
  solution: string;
  deliveryMethod: 'DIY' | 'DWY' | 'DFY';
  scale: '1:1' | 'Group' | '1:Many';
  cost: number;
  value: number;
}

interface Bonus {
  id: string;
  name: string;
  price: string;
  objection: string;
}

export default function SlideOfferTool({ isDark, icps = [] }: SlideOfferToolProps) {
  const [phase, setPhase] = useState(1);
  const [selectedIcpId, setSelectedIcpId] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // FASE 1: VALUE EQUATION
  const [valueEquation, setValueEquation] = useState({
    dreamOutcome: '',
    perceivedProbability: 80,
    timeDelay: 30,
    effortSacrifice: 50
  });

  // FASE 2: TRIM & STACK
  const [obstacles, setObstacles] = useState<ObstacleSolution[]>([
    { 
      id: '1', 
      obstacle: 'No tengo tiempo para implementar', 
      solution: 'Configuración total "Llave en Mano" en 48 horas', 
      deliveryMethod: 'DFY', 
      scale: '1:1',
      cost: 4,
      value: 9
    }
  ]);

  // FASE 3: ENHANCERS
  const [bonuses, setBonuses] = useState<Bonus[]>([
    { id: 'b1', name: 'Plantilla de Scripts de Cierre', price: '497', objection: 'No sé qué decir en las llamadas' }
  ]);
  const [guaranteeType, setGuaranteeType] = useState<'Unconditional' | 'Conditional' | 'Anti' | 'Implicit'>('Conditional');
  const [scarcity, setScarcity] = useState('5');
  const [urgency, setUrgency] = useState('');

  // FASE 4: MAGIC FORMULA
  const [magic, setMagic] = useState({
    magnet: '',
    avatar: '',
    goal: '',
    interval: '',
    container: ''
  });

  // Safe ICP selection
  useEffect(() => {
    if (icps && icps.length > 0) {
      if (!selectedIcpId || !icps.find(i => i.id === selectedIcpId)) {
        setSelectedIcpId(icps[0].id);
      }
    }
  }, [icps]);

  const selectedIcp = useMemo(() => {
    if (!icps || icps.length === 0) return null;
    return icps.find(i => i.id === selectedIcpId) || icps[0];
  }, [icps, selectedIcpId]);

  // Safe auto-fill
  useEffect(() => {
    if (selectedIcp) {
      setValueEquation(prev => ({
        ...prev,
        dreamOutcome: prev.dreamOutcome || `Maximizar rentabilidad en ${selectedIcp.company?.industry || 'el sector'}.`
      }));
      setMagic(prev => ({
        ...prev,
        avatar: prev.avatar || selectedIcp.persona?.decisor || selectedIcp.company?.industry || 'Clientes B2B',
        goal: prev.goal || "Pipeline Predecible",
        interval: prev.interval || "90 días",
        container: prev.container || "Sistema"
      }));
    }
  }, [selectedIcp]);

  const perceivedValue = useMemo(() => {
    try {
      const top = (valueEquation.dreamOutcome ? 10 : 1) * ((valueEquation.perceivedProbability || 1) / 10);
      const bottom = ((valueEquation.timeDelay || 1) / 10) * ((valueEquation.effortSacrifice || 1) / 10 || 0.1);
      const val = (top / bottom) * 100;
      return isFinite(val) ? Math.round(val) : 9999;
    } catch (e) {
      return 0;
    }
  }, [valueEquation]);

  const totalBonusesValue = useMemo(() => {
    if (!bonuses) return 0;
    return bonuses.reduce((acc, b) => {
      if (!b.price) return acc;
      const num = parseInt(b.price.toString().replace(/[^0-9]/g, '')) || 0;
      return acc + num;
    }, 0);
  }, [bonuses]);

  const addObstacle = () => {
    setObstacles(prev => [...prev, { 
      id: Date.now().toString(), obstacle: '', solution: '', deliveryMethod: 'DWY', scale: 'Group', cost: 5, value: 5 
    }]);
  };

  const updateObstacle = (id: string, field: keyof ObstacleSolution, val: any) => {
    setObstacles(prev => prev.map(o => o.id === id ? { ...o, [field]: val } : o));
  };

  const addBonus = () => {
    setBonuses(prev => [...prev, { id: Date.now().toString(), name: '', price: '', objection: '' }]);
  };

  const updateBonus = (id: string, field: keyof Bonus, val: string) => {
    setBonuses(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));
  };

  const copyToClipboard = (text: string, index: number) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const phases = [
    { n: 1, title: 'Ecuación', icon: Trophy },
    { n: 2, title: 'Inventario', icon: Layers },
    { n: 3, title: 'Potenciadores', icon: Flame },
    { n: 4, title: 'Naming', icon: Sparkles },
    { n: 5, title: 'Oferta Final', icon: Rocket }
  ];

  const glassPanel = isDark ? 'bg-white/5 border-white/10 shadow-black/40' : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50';
  const inputBase = `w-full rounded-xl border transition-all focus:ring-2 focus:ring-[#ff851d] outline-none ${isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`;
  const labelBase = `text-[10px] font-black uppercase tracking-widest mb-1.5 block opacity-50`;

  // Fallback pattern to prevent white screen
  if (!obstacles || !bonuses || !magic || !valueEquation) return <div className="p-10 text-center uppercase font-black opacity-20">Cargando Herramienta...</div>;

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-8">
      <div className={`w-full h-full flex flex-col rounded-3xl sm:rounded-[3.5rem] border-2 relative overflow-hidden p-4 sm:p-6 md:p-10 transition-all duration-500 ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a] text-white shadow-2xl' : 'bg-white border-gray-100 text-gray-900 shadow-2xl'}`}>
        
        {/* Background Decorative */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff851d] to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#ef375c] to-transparent blur-[120px]" />
        </div>

        {/* Header Section */}
        <div className="shrink-0 mb-4 sm:mb-6 z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Creador de Oferta Irresistible</h2>
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-bold opacity-40 uppercase tracking-widest">Hormozi Blueprint</span>
                {icps && icps.length > 0 && (
                  <select 
                    value={selectedIcpId || ''} 
                    onChange={(e) => setSelectedIcpId(e.target.value)}
                    className={`text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}
                  >
                    {icps.map(i => <option key={i.id} value={i.id}>{i.company?.name || 'Empresa'}</option>)}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="flex bg-gray-500/5 p-1 rounded-2xl border border-gray-500/10 overflow-x-auto max-w-full">
            {phases.map(p => (
              <button 
                key={p.n} 
                onClick={() => setPhase(p.n)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shrink-0 ${phase === p.n ? 'bg-[#ff851d] text-white shadow-lg' : 'opacity-30 hover:opacity-100'}`}
              >
                <p.icon size={14} />
                <span className="text-[9px] sm:text-[10px] font-black uppercase hidden lg:block">{p.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 min-h-0 z-10 relative">
          <AnimatePresence mode="wait">
            
            {phase === 1 && (
              <motion.div key="f1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="h-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className={`p-4 sm:p-6 md:p-8 rounded-[2rem] border ${glassPanel} flex flex-col gap-4 sm:gap-6 md:gap-8`}>
                   <div className="flex items-center gap-3"><div className="p-2 sm:p-3 rounded-2xl bg-[#ff851d]/10 text-[#ff851d]"><TrendingUp size={24} /></div><h3 className="text-lg sm:text-xl font-black italic">Maximizadores</h3></div>
                   <div>
                     <label className={labelBase}>Resultado Soñado</label>
                     <textarea className={`${inputBase} p-3 sm:p-4 text-xs sm:text-sm h-20 sm:h-24 resize-none`} value={valueEquation.dreamOutcome} onChange={e => setValueEquation({...valueEquation, dreamOutcome: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center"><label className={labelBase}>Probabilidad (%)</label><span className="text-xs sm:text-sm font-black text-[#ff851d]">{valueEquation.perceivedProbability}%</span></div>
                     <input type="range" className="w-full accent-[#ff851d]" value={valueEquation.perceivedProbability} onChange={e => setValueEquation({...valueEquation, perceivedProbability: parseInt(e.target.value) || 0})} />
                   </div>
                </div>
                <div className={`p-4 sm:p-6 md:p-8 rounded-[2rem] border ${glassPanel} flex flex-col gap-4 sm:gap-6 md:gap-8`}>
                   <div className="flex items-center gap-3"><div className="p-2 sm:p-3 rounded-2xl bg-[#ef375c]/10 text-[#ef375c]"><ZapOff size={24} /></div><h3 className="text-lg sm:text-xl font-black italic">Minimizadores</h3></div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center"><label className={labelBase}>Retraso (Días)</label><span className="text-xs sm:text-sm font-black text-[#ef375c]">{valueEquation.timeDelay}d</span></div>
                     <input type="range" min="1" max="180" className="w-full accent-[#ef375c]" value={valueEquation.timeDelay} onChange={e => setValueEquation({...valueEquation, timeDelay: parseInt(e.target.value) || 1})} />
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center"><label className={labelBase}>Esfuerzo (%)</label><span className="text-xs sm:text-sm font-black text-[#ef375c]">{valueEquation.effortSacrifice}%</span></div>
                     <input type="range" className="w-full accent-[#ef375c]" value={valueEquation.effortSacrifice} onChange={e => setValueEquation({...valueEquation, effortSacrifice: parseInt(e.target.value) || 0})} />
                   </div>
                   <div className="mt-auto pt-4 flex flex-col items-center">
                     <div className="text-[9px] font-black uppercase opacity-40 mb-1">Valor Percibido</div>
                     <div className="text-3xl sm:text-5xl font-black text-[#ff851d] tabular-nums">{perceivedValue}</div>
                     <button onClick={() => setPhase(2)} className="mt-4 sm:mt-6 w-full bg-black dark:bg-white text-white dark:text-black py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2">Continuar <ChevronRight size={16} /></button>
                   </div>
                </div>
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div key="f2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col gap-4 sm:gap-6">
                <div className="flex justify-between items-center"><h3 className="text-xl sm:text-2xl font-black italic flex items-center gap-2"><Layers size={20} className="text-[#ff851d]" /> Inventario</h3><button onClick={addObstacle} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-4 sm:px-6 py-2 rounded-xl font-black text-[9px] sm:text-xs uppercase"><Plus size={14} className="inline mr-1" /> Agregar</button></div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {obstacles.map(obs => (
                    <div key={obs.id} className={`p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border ${glassPanel} grid grid-cols-12 gap-4 sm:gap-6 relative group`}>
                      <div className="col-span-12 lg:col-span-6 space-y-3">
                        <div><label className={labelBase}>Obstáculo</label><input className={`${inputBase} p-2 text-xs`} value={obs.obstacle} onChange={e => updateObstacle(obs.id, 'obstacle', e.target.value)} /></div>
                        <div><label className={labelBase}>Solución</label><input className={`${inputBase} p-2 text-xs font-bold text-[#ff851d]`} value={obs.solution} onChange={e => updateObstacle(obs.id, 'solution', e.target.value)} /></div>
                      </div>
                      <div className="col-span-12 lg:col-span-6 flex gap-4">
                        <div className="flex-1 space-y-3">
                           <div><label className={labelBase}>Modalidad</label><select className={`${inputBase} p-1.5 text-[10px] font-bold`} value={obs.deliveryMethod} onChange={e => updateObstacle(obs.id, 'deliveryMethod', e.target.value as any)}><option value="DIY">DIY</option><option value="DWY">DWY</option><option value="DFY">DFY</option></select></div>
                           <div><label className={labelBase}>Proporción</label><select className={`${inputBase} p-1.5 text-[10px] font-bold`} value={obs.scale} onChange={e => updateObstacle(obs.id, 'scale', e.target.value as any)}><option value="1:1">1:1</option><option value="Group">Grupo</option><option value="1:Many">Masa</option></select></div>
                        </div>
                        <div className="flex-1 space-y-3">
                           <div><div className="flex justify-between"><label className={labelBase}>Costo</label><span className="text-[9px] font-black">{obs.cost}</span></div><input type="range" min="1" max="10" className="w-full accent-red-500 h-1" value={obs.cost} onChange={e => updateObstacle(obs.id, 'cost', parseInt(e.target.value) || 1)} /></div>
                           <div><div className="flex justify-between"><label className={labelBase}>Valor</label><span className="text-[9px] font-black">{obs.value}</span></div><input type="range" min="1" max="10" className="w-full accent-emerald-500 h-1" value={obs.value} onChange={e => updateObstacle(obs.id, 'value', parseInt(e.target.value) || 1)} /></div>
                        </div>
                      </div>
                      <button onClick={() => setObstacles(obstacles.filter(o => o.id !== obs.id))} className="absolute top-2 right-2 p-1.5 text-red-500 opacity-0 group-hover:opacity-100"><X size={16} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-2"><button onClick={() => setPhase(3)} className="bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-xl font-black text-xs uppercase">Continuar <ChevronRight size={14} className="inline ml-1" /></button></div>
              </motion.div>
            )}

            {phase === 3 && (
              <motion.div key="f3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                <div className={`col-span-12 md:col-span-8 p-4 sm:p-6 rounded-[2rem] border ${glassPanel} flex flex-col`}>
                  <div className="flex justify-between items-center mb-4"><h3 className="text-lg sm:text-xl font-black italic flex items-center gap-2"><Crown size={20} className="text-yellow-500" /> Bonos</h3><button onClick={addBonus} className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-black text-[9px] sm:text-xs uppercase"><Plus size={14} className="inline" /> Bono</button></div>
                  <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
                    {bonuses.map(b => (
                      <div key={b.id} className="grid grid-cols-12 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 relative group">
                        <div className="col-span-12 lg:col-span-5"><label className={labelBase}>Nombre</label><input className={`${inputBase} p-1.5 text-xs font-bold`} value={b.name} onChange={e => updateBonus(b.id, 'name', e.target.value)} /></div>
                        <div className="col-span-6 lg:col-span-3"><label className={labelBase}>Valor ($)</label><input className={`${inputBase} p-1.5 text-xs font-black text-emerald-500`} value={b.price} onChange={e => updateBonus(b.id, 'price', e.target.value)} /></div>
                        <div className="col-span-6 lg:col-span-4"><label className={labelBase}>Objeción</label><input className={`${inputBase} p-1.5 text-[9px]`} value={b.objection} onChange={e => updateBonus(b.id, 'objection', e.target.value)} /></div>
                        <button onClick={() => setBonuses(bonuses.filter(it => it.id !== b.id))} className="absolute right-1 top-1 text-red-500 opacity-0 group-hover:opacity-100"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                  <div className={`p-4 sm:p-6 rounded-[2rem] border ${glassPanel} flex-1`}>
                    <h4 className={labelBase}>Garantía</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['Unconditional', 'Conditional', 'Anti', 'Implicit'].map(t => (
                        <button key={t} onClick={() => setGuaranteeType(t as any)} className={`p-1.5 text-[8px] sm:text-[9px] font-black uppercase rounded-lg border transition-all ${guaranteeType === t ? 'bg-[#ff851d] text-white border-[#ff851d]' : 'opacity-40'}`}>
                          {t === 'Unconditional' ? 'Incondicional' : t === 'Conditional' ? 'Condicional' : t === 'Anti' ? 'Anti' : 'Implícita'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setPhase(4)} className="w-full bg-[#ef375c] text-white py-4 rounded-xl font-black text-xs uppercase shadow-xl mt-auto">Naming MAGIC <ChevronRight size={14} className="inline ml-1" /></button>
                </div>
              </motion.div>
            )}

            {phase === 4 && (
              <motion.div key="f4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center gap-6">
                <h3 className="text-2xl sm:text-3xl font-black italic uppercase">M.A.G.I.C Formula</h3>
                <div className={`w-full max-w-4xl p-6 sm:p-10 rounded-[2.5rem] border ${glassPanel} space-y-8`}>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[{l:'M', k:'magnet'}, {l:'A', k:'avatar'}, {l:'G', k:'goal'}, {l:'I', k:'interval'}, {l:'C', k:'container'}].map(item => (
                        <div key={item.l} className="space-y-1">
                          <label className="text-[9px] font-black opacity-30 flex items-center gap-1"><span className="w-4 h-4 bg-[#ff851d] text-white rounded-[4px] flex items-center justify-center leading-none text-[8px]">{item.l}</span> {item.k.toUpperCase()}</label>
                          <input className={`${inputBase} p-2 text-xs font-bold text-center`} placeholder="..." value={(magic as any)[item.k]} onChange={e => setMagic({...magic, [item.k]: e.target.value})} />
                        </div>
                      ))}
                   </div>
                   <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#ff851d]/30 text-center">
                      <p className="text-xl sm:text-3xl font-black leading-tight tracking-tight">
                        <span className="text-[#ff851d]">{magic.magnet || '[Imán]'}</span> para <span className="text-[#ef375c]">{magic.goal || '[Resultado]'}</span> dirigido a <span>{magic.avatar || '[Nicho]'}</span> en <span>{magic.interval || '[Tiempo]'}</span> - <span className="text-[#ff851d]">{magic.container || '[Formato]'}</span>
                      </p>
                   </div>
                   <button onClick={() => setPhase(5)} className="w-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white py-4 sm:py-5 rounded-2xl font-black text-lg uppercase shadow-2xl flex items-center justify-center gap-3">FORJAR OFERTA FINAL <Rocket size={20} /></button>
                </div>
              </motion.div>
            )}

            {phase === 5 && (
              <motion.div key="f5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="h-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                <div className={`col-span-12 md:col-span-4 p-6 sm:p-8 rounded-[2rem] border ${glassPanel} flex flex-col items-center justify-between`}>
                   <div className="w-full space-y-4">
                     <h3 className="text-base sm:text-lg font-black uppercase text-[#ff851d]">Análisis de Valor</h3>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black opacity-50 uppercase"><span>Bonos</span><span>{bonuses?.length || 0}</span></div>
                        <div className="text-2xl sm:text-4x font-black text-emerald-500 tracking-tighter">${totalBonusesValue}</div>
                     </div>
                   </div>
                   <div className="w-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-xl mt-4">
                      <div className="text-[10px] font-black uppercase opacity-70 mb-1">Precio Sugerido</div>
                      <div className="text-3xl sm:text-5xl font-black tracking-tighter">${Math.round(totalBonusesValue / 5)}</div>
                   </div>
                </div>
                <div className="col-span-12 md:col-span-8 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar pb-6">
                   {[
                     { t: 'Volumen', c: `${magic.goal || 'Resultado'} para ${magic.avatar || 'Nicho'} en ${magic.interval || 'Tiempo'} o trabajamos gratis.` },
                     { t: 'Percentil', c: `Incrementa tu ${magic.goal || 'Venta'} un 40% en ${magic.interval || '90 días'} con nuestro ${magic.container || 'Sistema'}.` },
                     { t: 'Riesgo Cero', c: `Accede al ${magic.container || 'Método'} de ${magic.goal || 'Escalamiento'}. Paga solo por resultados.` }
                   ].map((off, i) => (
                     <div key={i} className={`p-4 sm:p-6 rounded-[2rem] border ${glassPanel} group hover:border-[#ff851d] transition-all relative`}>
                        <div className="flex justify-between items-center mb-2 sm:mb-3">
                          <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[8px] font-black uppercase tracking-widest">{off.t}</span>
                          <button onClick={() => copyToClipboard(off.c, i)} className={`p-1.5 rounded-lg transition-all ${copiedIndex === i ? 'bg-emerald-500 text-white shadow-lg' : 'opacity-30 group-hover:opacity-100 hover:text-[#ff851d]'}`}>{copiedIndex === i ? <Check size={16} /> : <Copy size={16} />}</button>
                        </div>
                        <p className="text-lg sm:text-2xl font-black leading-tight">"{off.c}"</p>
                     </div>
                   ))}
                   <button onClick={() => setPhase(1)} className="mt-4 py-2 text-[10px] font-black uppercase opacity-20 hover:opacity-100 transition-all flex items-center justify-center gap-2"><Timer size={14} /> Reiniciar construcción</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Navigation Dots */}
        <div className="shrink-0 mt-4 flex justify-center gap-2 z-20">
          {phases.map(p => (
            <div key={p.n} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${phase === p.n ? 'w-6 bg-[#ff851d]' : 'bg-gray-300 dark:bg-white/10'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
