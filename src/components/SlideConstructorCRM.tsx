import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, CheckCircle2, Zap, User, 
  ChevronRight, ChevronLeft, X, Edit3, Download
} from 'lucide-react';
import html2canvas from 'html2canvas';

type CustomStage = {
  id: string;
  name: string;
  exitAction: string;
  automation: string;
  responsible: string;
  isLocked?: boolean;
};

const RESPONSIBLE_OPTIONS = [
  "Ejecutivo 1",
  "Ejecutivo 2",
  "Especialista Técnico",
  "Supervisor"
];

export default function SlideConstructorCRM({ isDark }: { isDark: boolean }) {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [stages, setStages] = useState<CustomStage[]>([
    { 
      id: 's1', 
      name: 'Ingreso de oportunidad', 
      exitAction: '', 
      automation: '', 
      responsible: RESPONSIBLE_OPTIONS[0] 
    }
  ]);
  
  const [wonLostStages, setWonLostStages] = useState<CustomStage[]>([
    { 
      id: 'won', 
      name: 'Ganado', 
      exitAction: '', 
      automation: 'Alerta Onboarding', 
      responsible: 'Supervisor'
    },
    { 
      id: 'lost', 
      name: 'Perdido', 
      exitAction: '', 
      automation: 'Encuesta de salida', 
      responsible: 'Ejecutivo 2'
    }
  ]);

  const [isFinalized, setIsFinalized] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newStageName, setNewStageName] = useState('');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const constructorRef = useRef<HTMLDivElement>(null);

  const addStage = () => {
    if (newStageName.trim() !== "") {
      const newStage: CustomStage = {
        id: Math.random().toString(36).substr(2, 9),
        name: newStageName.trim(),
        exitAction: '',
        automation: '',
        responsible: RESPONSIBLE_OPTIONS[0]
      };
      setStages([...stages, newStage]);
      setNewStageName('');
      setShowAddInput(false);
    }
  };

  const removeStage = (id: string) => {
    if (stages.length > 1) {
      setStages(stages.filter(s => s.id !== id));
    }
  };

  const updateStage = (id: string, field: keyof CustomStage, value: string) => {
    if (id === 'won' || id === 'lost') {
      setWonLostStages(wonLostStages.map(s => s.id === id ? { ...s, [field]: value } : s));
    } else {
      setStages(stages.map(s => s.id === id ? { ...s, [field]: value } : s));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPipeline = async () => {
    if (!constructorRef.current) return;
    
    try {
      setIsDownloading(true);
      document.body.style.cursor = 'wait';
      
      const canvas = await html2canvas(constructorRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-constructor-root="true"]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.height = 'auto';
            clonedElement.style.width = 'fit-content';
            clonedElement.style.overflow = 'visible';
            const scrollArea = clonedElement.querySelector('.hide-scrollbar') as HTMLElement;
            if (scrollArea) {
              scrollArea.style.overflow = 'visible';
              scrollArea.style.display = 'flex';
            }
          }
        }
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Pipeline-B2B-${new Date().getTime()}.png`;
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
      document.body.style.cursor = 'default';
    }
  };

  return (
    <div 
      ref={constructorRef} 
      data-constructor-root="true"
      className={`p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col w-full h-full border ${
        isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-100'
      }`}
    >
      {/* Background Decor que no use blur para evitar errores de canvas */}
      <div className={`absolute -top-32 -right-32 w-96 h-96 opacity-10 rounded-full pointer-events-none ${
        isDark ? 'bg-orange-500/20' : 'bg-orange-100'
      }`} />

      {/* Header */}
      <div className="shrink-0 mb-8 z-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-2 flex items-center gap-3 tracking-tighter">
            Constructor de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
              Proceso Comercial
            </span>
          </h2>
          <p className={`text-base font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Define tu flujo comercial estratégico.
          </p>
        </div>
        
        {/* Actions & Navigation */}
        <div className="flex items-center gap-3">
          {isFinalized && (
            <div className="flex items-center gap-2 mr-4">
              <button 
                onClick={() => setIsFinalized(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Edit3 size={14} /> Editar
              </button>
              <button 
                onClick={downloadPipeline}
                disabled={isDownloading}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white text-xs font-black shadow-lg hover:shadow-red-500/20 transition-all hover:scale-105 ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Download size={14} className={isDownloading ? 'animate-bounce' : ''} /> 
                {isDownloading ? 'Generando...' : 'Descargar'}
              </button>
            </div>
          )}
          <button 
            onClick={() => scroll('left')}
            className={`p-3 rounded-full border transition-all ${
              isDark ? 'bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#3a3a3a] text-white' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-3 rounded-full border transition-all ${
              isDark ? 'bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#3a3a3a] text-white' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 flex gap-3 overflow-x-auto hide-scrollbar pb-10 pt-4 px-4 z-10 scroll-smooth items-stretch"
      >
        {stages.map((stage, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={stage.id}
            onClick={() => setSelectedStageId(stage.id)}
            className={`min-w-[288px] w-[288px] flex flex-col rounded-[2.5rem] border transition-all cursor-pointer relative ${
              selectedStageId === stage.id 
                ? 'border-[#ff851d] ring-2 ring-[#ff851d]/20 shadow-[0_20px_50px_rgba(255,133,29,0.15)] scale-[1.02] z-20' 
                : isDark ? 'bg-[#252525] border-[#3a3a3a] z-10' : 'bg-gray-50 border-gray-100 shadow-sm z-10'
            }`}
          >
            {/* Column Header Wrapper for content clipping if needed */}
            <div className="flex flex-col h-full rounded-[2.5rem] overflow-hidden">

            {/* Column Header */}
            <div className={`p-4 border-b flex items-center gap-3 ${isDark ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                isDark ? 'bg-[#3a3a3a] text-[#ff851d]' : 'bg-white text-[#ff851d] shadow-sm'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <input 
                  type="text"
                  value={stage.name}
                  readOnly={isFinalized || index === 0}
                  onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                  className={`w-full bg-transparent border-none outline-none font-black text-sm p-0 m-0 ${isDark ? 'text-white' : 'text-gray-800'}`}
                />
              </div>
              {!isFinalized && index > 0 && (
                <button 
                  onClick={() => removeStage(stage.id)}
                  className="opacity-40 hover:opacity-100 p-1 rounded-lg hover:bg-red-500/10 text-red-500 transition-all shrink-0"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex-1 p-5 flex flex-col justify-center space-y-6">
               <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black opacity-40 flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-[#ff851d]" /> ACCIÓN DE SALIDA
                    </label>
                    <input
                      type="text"
                      value={stage.exitAction}
                      readOnly={isFinalized}
                      onChange={(e) => updateStage(stage.id, 'exitAction', e.target.value)}
                      className={`w-full h-10 px-4 rounded-xl text-[12px] font-medium border transition-all ${
                        isDark ? 'bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-[#ff851d]/50' : 'bg-white border-gray-100 shadow-sm text-gray-700 focus:border-[#ff851d]/50'
                      }`}
                      placeholder="Regla de avance..."
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black opacity-40 flex items-center gap-2">
                      <Zap size={12} className="text-[#ef375c]" /> AUTOMATIZACIÓN
                    </label>
                    <input
                      type="text"
                      value={stage.automation}
                      readOnly={isFinalized}
                      onChange={(e) => updateStage(stage.id, 'automation', e.target.value)}
                      className={`w-full h-10 px-4 rounded-xl text-[12px] font-medium border transition-all ${
                        isDark ? 'bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-[#ef375c]/50' : 'bg-white border-gray-100 shadow-sm text-gray-700 focus:border-[#ef375c]/50'
                      }`}
                      placeholder="Trigger automático..."
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black opacity-40 flex items-center gap-2">
                      <User size={12} className="text-orange-500" /> RESPONSABLE
                    </label>
                    <select
                      value={stage.responsible}
                      disabled={isFinalized}
                      onChange={(e) => updateStage(stage.id, 'responsible', e.target.value)}
                      className={`w-full h-10 px-4 rounded-xl text-[12px] font-medium border transition-all cursor-pointer appearance-none ${
                          isDark ? 'bg-[#1a1a1a] border-[#3a3a3a] focus:border-orange-500/50 text-white' : 'bg-white border-gray-200 focus:border-orange-500/50 shadow-sm text-gray-700'
                      }`}
                    >
                      {RESPONSIBLE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                 </div>
               </div>
             </div>
           </div>
          </motion.div>
        ))}

        {/* Add Stage Column Area */}
        {!isFinalized && (
          <div className="min-w-[200px] w-[200px] flex flex-col items-stretch justify-center relative">
            <div className={`flex flex-col items-center justify-center h-[340px] rounded-[2.5rem] border-2 border-dashed transition-all p-6 ${
              isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50/30'
            }`}>
              {!showAddInput ? (
                <button
                  onClick={() => setShowAddInput(true)}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                    <Plus size={28} />
                  </div>
                  <span className="text-[12px] font-black opacity-60">Crear etapa</span>
                </button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-3"
                >
                  <input 
                    autoFocus
                    type="text"
                    value={newStageName}
                    onChange={(e) => setNewStageName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addStage()}
                    placeholder="Nombre etapa"
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                        isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={addStage}
                      className="flex-1 py-2 rounded-xl bg-[#ff851d] text-white text-[10px] font-black"
                    >
                      Añadir
                    </button>
                    <button 
                      onClick={() => setShowAddInput(false)}
                      className="p-2 rounded-xl bg-gray-500/10 text-gray-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              <button
                onClick={() => setIsFinalized(true)}
                className="absolute bottom-4 left-0 right-0 py-2 text-[11px] font-black text-[#ff851d] hover:underline"
              >
                Finalizar proceso
              </button>
            </div>
          </div>
        )}

        {/* Won/Lost Fixed Stages */}
        {wonLostStages.map((stage) => (
          <div
            key={stage.id}
            onClick={() => setSelectedStageId(stage.id)}
            className={`min-w-[288px] w-[288px] flex flex-col rounded-[2.5rem] border transition-all cursor-pointer relative ${
              selectedStageId === stage.id 
                ? 'border-[#ff851d] ring-2 ring-[#ff851d]/20 shadow-[0_20px_50px_rgba(255,133,29,0.15)] scale-[1.02] z-20' 
                : isDark ? 'bg-[#1a1a1a] border-[#3a3a3a] z-10' : 'bg-white border-gray-100 shadow-sm z-10'
            }`}
          >
            <div className="flex flex-col h-full rounded-[2.5rem] overflow-hidden">
            <div className={`p-4 border-b flex items-center gap-3 ${
              stage.id === 'won' ? 'bg-green-500/10 border-green-500/20' : 'bg-gray-500/10 border-gray-500/20'
            }`}>
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${
                 stage.id === 'won' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
               }`}>
                  {stage.name[0]}
               </div>
               <div className="flex-1 min-w-0">
                <input 
                    type="text"
                    value={stage.name}
                    readOnly={isFinalized}
                    onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                    className={`w-full bg-transparent border-none outline-none font-black text-sm p-0 m-0 ${
                      stage.id === 'won' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                    }`}
                />
               </div>
            </div>
            <div className="flex-1 p-5 flex flex-col justify-center space-y-6">
               <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black opacity-40 flex items-center gap-2">
                      <Zap size={12} className="text-[#ef375c]" /> AUTOMATIZACIÓN
                    </label>
                    <input
                      type="text"
                      value={stage.automation}
                      readOnly={isFinalized}
                      onChange={(e) => updateStage(stage.id, 'automation', e.target.value)}
                      className={`w-full h-10 px-4 rounded-xl text-[12px] font-medium border transition-all ${
                        isDark ? 'bg-[#1a1a1a] border-[#3a3a3a] text-white focus:border-[#ef375c]/50' : 'bg-white border-gray-100 shadow-sm text-gray-700 focus:border-[#ef375c]/50'
                      }`}
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black opacity-40 flex items-center gap-2">
                      <User size={12} className="text-orange-500" /> RESPONSABLE
                    </label>
                    <select
                      value={stage.responsible}
                      disabled={isFinalized}
                      onChange={(e) => updateStage(stage.id, 'responsible', e.target.value)}
                      className={`w-full h-10 px-4 rounded-xl text-[12px] font-medium border transition-all cursor-pointer appearance-none ${
                          isDark ? 'bg-[#1a1a1a] border-[#3a3a3a] focus:border-orange-500/50 text-white' : 'bg-white border-gray-200 focus:border-orange-500/50 shadow-sm text-gray-700'
                      }`}
                    >
                      {RESPONSIBLE_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                 </div>
               </div>
             </div>
           </div>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
    </div>
  );
}
