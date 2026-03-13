import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, User, Zap, Plus, Trash2, CheckCircle, AlertTriangle, XCircle, Target, Info, Calculator, TrendingUp, ShieldCheck, MousePointer2 } from 'lucide-react';

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface ICESegment { id: string; name: string; impacto: number; confianza: number; facilidad: number; evidence: boolean; }

// ─── Sub-componente: Etiqueta de campo ───────────────────────────────────────
const FieldLabel = ({ children, isDark }: { children: React.ReactNode; isDark: boolean }) => (
  <label className={`text-[10px] font-black uppercase tracking-wider mb-1 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{children}</label>
);

// ─── Sub-componente: Input de texto ──────────────────────────────────────────
const TextInput = ({ value, onChange, placeholder, isDark }: { value: string; onChange: (v: string) => void; placeholder: string; isDark: boolean }) => (
  <input
    type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className={`w-full p-2 rounded-xl border text-sm outline-none transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] text-gray-200 placeholder-gray-600 focus:border-[#ff851d]' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-300 focus:border-[#ff851d]'}`}
  />
);

// ─── Sub-componente: Área de texto ───────────────────────────────────────────
const TextArea = ({ value, onChange, placeholder, isDark }: { value: string; onChange: (v: string) => void; placeholder: string; isDark: boolean }) => (
  <textarea
    value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
    className={`w-full p-2 rounded-xl border text-sm outline-none transition-colors resize-none ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] text-gray-200 placeholder-gray-600 focus:border-[#ef375c]' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-300 focus:border-[#ef375c]'}`}
  />
);

// ─── Componente principal ─────────────────────────────────────────────────────
export default function SlideICPTool({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState<'empresa' | 'persona' | 'ice'>('empresa');

  // Estado: Empresa (ICP)
  const [industria, setIndustria] = useState('');
  const [tamano, setTamano] = useState('51-200');
  const [geografia, setGeografia] = useState('');
  const [stack, setStack] = useState('');
  const [disparadores, setDisparadores] = useState<string[]>([]);

  // Estado: Buyer Persona
  const [rol1, setRol1] = useState('');
  const [rol2, setRol2] = useState('');
  const [quienSufre, setQuienSufre] = useState('');
  const [quienFirma, setQuienFirma] = useState('');
  const [dolorPrincipal, setDolorPrincipal] = useState('');
  const [antiIcp, setAntiIcp] = useState('');

  // Estado: ICE Framework
  const [segments, setSegments] = useState<ICESegment[]>([
    { id: 'seg1', name: 'SaaS B2B', impacto: 9, confianza: 8, facilidad: 8, evidence: true },
    { id: 'seg2', name: 'Agencias Marketing',  impacto: 6, confianza: 7, facilidad: 9, evidence: true },
    { id: 'seg3', name: 'Logística Tradicional',  impacto: 8, confianza: 3, facilidad: 5, evidence: false },
  ]);

  const DISPARADORES = [
    'Están contratando', 'Levantaron inversión', 'Expandieron sedes',
    'Cambiaron C-Level', 'Lanzaron nuevo producto', 'Pasaron 50 empleados',
  ];

  const toggleDisparador = (d: string) =>
    setDisparadores(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const addSegment = () => {
    if (segments.length >= 6) return;
    setSegments(prev => [...prev, { id: `seg${Date.now()}`, name: '', impacto: 5, confianza: 4, facilidad: 5, evidence: false }]);
  };

  const removeSegment = (id: string) => setSegments(prev => prev.filter(s => s.id !== id));

  const updateSegment = (id: string, field: keyof ICESegment, value: string | number | boolean) =>
    setSegments(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const iceScore = (s: ICESegment) => s.impacto * s.confianza * s.facilidad;

  const sorted = [...segments].sort((a, b) => iceScore(b) - iceScore(a));
  const maxScore = Math.max(...segments.map(iceScore), 1);

  // Estilos compartidos
  const panel = isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200';

  const tabs = [
    { id: 'empresa', label: 'Empresa (ICP)', icon: Building2, color: 'from-[#ff851d] to-[#f59e0b]' },
    { id: 'persona', label: 'Buyer Persona', icon: User,      color: 'from-[#ef375c] to-[#f43f5e]' },
    { id: 'ice',     label: 'ICE Evaluation', icon: Zap,       color: 'from-[#ff851d] to-[#ef375c]' },
  ] as const;

  const getVerdict = (score: number) => {
    const pct = score / maxScore;
    if (pct >= 0.75) return { label: 'Prioridad Máxima', icon: CheckCircle,  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (pct >= 0.4)  return { label: 'Analizar/Pivotar', icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
    return               { label: 'Baja Prioridad',   icon: XCircle,       color: 'text-red-400',     bg: 'bg-red-500/10', border: 'border-red-500/20' };
  };

  const iceGuide = [
    { 
      letter: 'I', name: 'Impacto', color: 'text-[#ff851d]', icon: TrendingUp,
      desc: '¿Cuánto valor genera tu solución?', 
      q: '¿Cuánto dinero pierde el cliente si no resuelve el problema? ¿Es estratégico?',
      signals: 'Afecta ingresos, crecimiento o eficiencia clave.'
    },
    { 
      letter: 'C', name: 'Confianza', color: 'text-[#ef375c]', icon: ShieldCheck,
      desc: '¿Qué evidencias tienes del dolor?', 
      q: '¿Has hablado ya con clientes? ¿Viste el problema repetirse? ¿Hay datos?',
      signals: 'Puntúa ≤ 4 si nunca has hablado directa con el mercado.'
    },
    { 
      letter: 'E', name: 'Facilidad', color: 'text-blue-400', icon: MousePointer2,
      desc: '¿Qué tan fácil es contactarlos?', 
      q: '¿Existen bases de datos? ¿Responden cold email? ¿Cargos claros?',
      signals: 'Contactos visibles, mercado activo digitalmente.'
    },
  ];

  return (
    <div className={`p-4 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="shrink-0 mb-3 z-10 flex justify-between items-start">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-0.5 flex items-center gap-2">
            <Target size={22} className="text-[#ff851d]" />
            Herramienta: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Estrategia e ICP</span>
          </h2>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mapea tu mercado ideal y prioriza usando datos, no intuición.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3 z-10 shrink-0">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs transition-all ${activeTab === tab.id ? `bg-gradient-to-r ${tab.color} text-white shadow-md` : isDark ? 'bg-[#2a2a2a] text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-900'}`}>
            <tab.icon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.id === 'empresa' ? 'Empresa' : tab.id === 'persona' ? 'Persona' : 'ICE'}</span>
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-1 z-10 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">

          {/* ── TAB 1: EMPRESA (ICP) ── */}
          {activeTab === 'empresa' && (
            <motion.div key="empresa" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row gap-3 h-full min-h-0 overflow-y-auto custom-scrollbar">
              
              <div className={`w-full md:w-1/2 rounded-2xl border p-4 flex flex-col gap-3 min-h-0 ${panel}`}>
                <div className="flex items-center gap-2 mb-1 shrink-0">
                  <Building2 size={15} className="text-[#ff851d]" />
                  <h3 className={`font-black text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Firmografía</h3>
                </div>
                <div><FieldLabel isDark={isDark}>Industria / Rubro</FieldLabel><TextInput value={industria} onChange={setIndustria} placeholder="Ej: SaaS B2B, Fintech..." isDark={isDark} /></div>
                <div><FieldLabel isDark={isDark}>Empleados</FieldLabel>
                  <select value={tamano} onChange={e => setTamano(e.target.value)}
                    className={`w-full p-2 rounded-xl border text-sm outline-none ${isDark ? 'bg-[#1e1e1e] border-[#4a4a4a] text-gray-200' : 'bg-white border-gray-200'}`}>
                    <option value="1-50">1 – 50 empleados</option><option value="51-200">51 – 200 empleados</option><option value="201+">201+ empleados</option>
                  </select>
                </div>
                <div><FieldLabel isDark={isDark}>Geografía</FieldLabel><TextInput value={geografia} onChange={setGeografia} placeholder="Ej: México, LATAM..." isDark={isDark} /></div>
                <div><FieldLabel isDark={isDark}>Stack Tecnológico</FieldLabel><TextInput value={stack} onChange={setStack} placeholder="Ej: HubSpot, Salesforce..." isDark={isDark} /></div>
              </div>

              <div className={`w-full md:w-1/2 rounded-2xl border p-4 flex flex-col gap-3 min-h-0 ${panel}`}>
                <div className="flex items-center gap-2 mb-1 shrink-0">
                  <Zap size={15} className="text-[#ef375c]" />
                  <h3 className={`font-black text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Señales de Compra</h3>
                </div>
                <div className="grid grid-cols-1 gap-2 overflow-y-auto custom-scrollbar pr-1">
                  {DISPARADORES.map(d => (
                    <button key={d} onClick={() => toggleDisparador(d)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${disparadores.includes(d) ? 'border-[#ff851d]/50 bg-[#ff851d]/5' : isDark ? 'border-[#3a3a3a] bg-[#1e1e1e]' : 'border-gray-100 bg-white'}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${disparadores.includes(d) ? 'bg-[#ff851d] border-transparent' : 'border-gray-500'}`}>
                        {disparadores.includes(d) && <CheckCircle size={10} className="text-white" />}
                      </div>
                      <span className="text-xs font-bold">{d}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: BUYER PERSONA ── */}
          {activeTab === 'persona' && (
            <motion.div key="persona" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row gap-3 h-full min-h-0 overflow-y-auto custom-scrollbar">
              <div className={`w-full md:w-1/2 rounded-2xl border p-4 flex flex-col gap-3 ${panel}`}>
                <div className="flex items-center gap-2 mb-1 shrink-0"><User size={15} className="text-[#ef375c]" /><h3 className="font-black text-sm">Roles de Compra</h3></div>
                <div><FieldLabel isDark={isDark}>Cargo Decisor</FieldLabel><TextInput value={rol1} onChange={setRol1} placeholder="Ej: CFO, Founder..." isDark={isDark} /></div>
                <div><FieldLabel isDark={isDark}>Cargo Influenciador</FieldLabel><TextInput value={rol2} onChange={setRol2} placeholder="Ej: VP Sales..." isDark={isDark} /></div>
                <div><FieldLabel isDark={isDark}>¿Quién tiene el presupuesto?</FieldLabel><TextInput value={quienFirma} onChange={setQuienFirma} placeholder="Área o Cargo" isDark={isDark} /></div>
              </div>
              <div className={`w-full md:w-1/2 rounded-2xl border p-4 flex flex-col gap-3 ${panel}`}>
                <div className="flex items-center gap-2 mb-1 shrink-0"><Target size={15} className="text-[#ff851d]" /><h3 className="font-black text-sm">Dolor Estratégico</h3></div>
                <div><FieldLabel isDark={isDark}>Dolor principal</FieldLabel><TextArea value={dolorPrincipal} onChange={setDolorPrincipal} placeholder="¿Qué les duele de verdad?" isDark={isDark} /></div>
                <div><FieldLabel isDark={isDark}>Anti-ICP (¿A quién no?)</FieldLabel><TextArea value={antiIcp} onChange={setAntiIcp} placeholder="Sectores o tipos a evitar" isDark={isDark} /></div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 3: ICE EVALUATION (REDESIGNED) ── */}
          {activeTab === 'ice' && (
            <motion.div key="ice" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}
              className="flex flex-col gap-3 h-full min-h-0">

              {/* Leyenda y Guía Interactiva */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 shrink-0">
                {iceGuide.map((g) => (
                  <div key={g.letter} className={`p-3 rounded-2xl border relative overflow-hidden flex flex-col ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
                    <div className="absolute top-[-10px] right-[-5px] opacity-10 font-black text-4xl select-none" style={{ color: 'currentColor' }}>{g.letter}</div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <g.icon size={14} className={g.color} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{g.letter} · {g.name}</span>
                    </div>
                    <p className={`text-[9px] font-bold leading-tight mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{g.desc}</p>
                    <p className={`text-[8px] italic leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{g.q}</p>
                  </div>
                ))}
              </div>

              {/* Listado de Segmentos */}
              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1">
                {segments.map((seg, i) => {
                  const score = iceScore(seg);
                  const verdict = getVerdict(score);
                  const showWarning = seg.confianza > 4 && !seg.evidence;
                  
                  return (
                    <motion.div key={seg.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`rounded-2xl border-2 p-4 relative transition-all ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'} ${verdict.border.replace('border-', 'hover:border-')}`}>
                      
                      {/* Cabecera del Segmento */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isDark ? 'bg-[#1e1e1e] text-gray-400 shadow-inner' : 'bg-gray-100 text-gray-500'}`}>{i + 1}</span>
                          <input type="text" value={seg.name} onChange={e => updateSegment(seg.id, 'name', e.target.value)} placeholder="Nombre del mercado/segmento..."
                            className={`flex-1 bg-transparent border-b-2 outline-none text-base font-black transition-all ${isDark ? 'border-[#3a3a3a] text-white focus:border-[#ff851d]' : 'border-gray-100 text-gray-900 focus:border-[#ff851d]'}`} />
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1.5 rounded-xl flex items-center gap-2 border ${verdict.bg} ${verdict.border}`}>
                            <verdict.icon size={14} className={verdict.color} />
                            <div className="text-right">
                              <p className={`text-[8px] font-black uppercase tracking-tight leading-none ${verdict.color}`}>ICE Score</p>
                              <p className={`text-lg font-black leading-none ${verdict.color}`}>{score}</p>
                            </div>
                          </div>
                          <button onClick={() => removeSegment(seg.id)} className={`p-2 rounded-xl transition-colors hover:bg-red-500/10 text-gray-500 hover:text-red-400`}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Sliders y Controles */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-11 grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* IMPACTO */}
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center"><FieldLabel isDark={isDark}>Impacto</FieldLabel><span className="text-xs font-black text-[#ff851d]">{seg.impacto}</span></div>
                            <input type="range" min="1" max="10" step="1" value={seg.impacto} onChange={e => updateSegment(seg.id, 'impacto', parseInt(e.target.value))}
                              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-[#1e1e1e] accent-[#ff851d]" />
                          </div>

                          {/* CONFIANZA */}
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <FieldLabel isDark={isDark}>Confianza</FieldLabel>
                              <div className="flex items-center gap-2">
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                  <input type="checkbox" checked={seg.evidence} onChange={e => updateSegment(seg.id, 'evidence', e.target.checked)} className="rounded accent-[#ef375c]" />
                                  <span className={`text-[8px] font-black uppercase ${seg.evidence ? 'text-emerald-500' : 'text-gray-500'}`}>¿Hay evidencias?</span>
                                </label>
                                <span className={`text-xs font-black text-[#ef375c]`}>{seg.confianza}</span>
                              </div>
                            </div>
                            <input type="range" min="1" max="10" step="1" value={seg.confianza} onChange={e => updateSegment(seg.id, 'confianza', parseInt(e.target.value))}
                              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-[#1e1e1e] accent-[#ef375c]" />
                          </div>

                          {/* FACILIDAD */}
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center"><FieldLabel isDark={isDark}>Facilidad</FieldLabel><span className="text-xs font-black text-blue-400">{seg.facilidad}</span></div>
                            <input type="range" min="1" max="10" step="1" value={seg.facilidad} onChange={e => updateSegment(seg.id, 'facilidad', parseInt(e.target.value))}
                              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-[#1e1e1e] accent-blue-400" />
                          </div>
                        </div>

                        {/* Visualización de la Fórmula */}
                        <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center gap-1 border-l border-gray-100 dark:border-[#3a3a3a] pl-4">
                           <span className="text-[10px] text-gray-500 font-bold">{seg.impacto}</span>
                           <span className="text-[8px] text-gray-400">×</span>
                           <span className="text-[10px] text-gray-500 font-bold">{seg.confianza}</span>
                           <span className="text-[8px] text-gray-400">×</span>
                           <span className="text-[10px] text-gray-500 font-bold">{seg.facilidad}</span>
                           <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600 my-1" />
                           <span className="text-xs font-black text-[#ff851d]">{score}</span>
                        </div>
                      </div>

                      {/* Advertencias */}
                      <AnimatePresence>
                        {showWarning && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="mt-3 overflow-hidden">
                            <div className={`p-2 rounded-xl flex items-center gap-2 border ${isDark ? 'bg-yellow-900/20 border-yellow-700/30' : 'bg-yellow-50 border-yellow-200'}`}>
                              <AlertTriangle size={12} className="text-yellow-500 shrink-0" />
                              <p className="text-[9px] font-bold text-yellow-600 dark:text-yellow-400">
                                <span className="uppercase">⚠️ Regla de Confianza:</span> Sin evidencias directas (entrevistas/ventas), la confianza no debería superar los 4 puntos.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {segments.length < 6 && (
                  <button onClick={addSegment}
                    className={`flex items-center justify-center gap-2 p-5 rounded-3xl border-2 border-dashed font-black text-xs transition-all ${isDark ? 'border-[#3a3a3a] text-gray-500 hover:border-[#ff851d]/50 hover:text-[#ff851d]' : 'border-gray-200 text-gray-400 hover:border-[#ff851d] hover:text-[#ff851d] border-dashed shadow-sm'}`}>
                    <Plus size={18} /> Evaluar nuevo mercado o hipótesis
                  </button>
                )}
              </div>

              {/* Ranking Final y Tips */}
              {segments.length > 0 && (
                <div className="shrink-0 flex flex-col md:flex-row gap-3">
                  <div className={`flex-1 rounded-2xl p-4 border flex flex-col items-center justify-center gap-2 ${isDark ? 'bg-gradient-to-r from-emerald-950/20 to-transparent border-emerald-950/40' : 'bg-gradient-to-r from-emerald-50 to-white border-emerald-100 shadow-sm'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Calculator size={14} className="text-emerald-500" />
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Prioridad Estratégica</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {sorted.map((s, idx) => (
                        <div key={s.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all ${idx === 0 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg scale-105 border-transparent' : isDark ? 'bg-[#1e1e1e] border-[#3a3a3a] text-gray-500' : 'bg-white border-gray-200 text-gray-400'}`}>
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] bg-black/20`}>{idx + 1}</span>
                          <span className="truncate max-w-[120px]">{s.name || 'Segmento…'}</span>
                          <span className={idx === 0 ? 'text-white/80' : 'text-[#ff851d]'}>{iceScore(s)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`w-full md:w-64 rounded-2xl p-3 border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#ff851d] mb-2 flex items-center gap-1"><Info size={10}/> Pro-Tip de Puntuación</p>
                    <p className={`text-[9px] leading-relaxed italic ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      "Empresas industriales pequeñas → difícil encontrar contactos directos → <strong>Facilidad Baja (2-4)</strong>."
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
