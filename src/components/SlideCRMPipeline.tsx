import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Target, Brain, Mail, CheckCircle2, User, Building, DollarSign, Clock, Zap, X, Star, FileText, ArrowRight, AlertTriangle, Users } from 'lucide-react';

type PipelineStage = {
  id: string;
  num: number;
  name: string;
  methodology: string;
  desc: string;
  exitCriteria: string[];
  automations: string[];
  followUp: { interval: string; topics: string[] };
};

const stages: PipelineStage[] = [
  {
    id: 's0',
    num: 0,
    name: 'Universo / Generación',
    methodology: 'Definir ICP',
    desc: 'Identificación de cuentas objetivo que encajan con el Perfil de Cliente Ideal.',
    exitCriteria: ['Lista de cuentas objetivo definida', 'Contactos clave identificados'],
    automations: ['Enriquecimiento de datos', 'Scraping de LinkedIn'],
    followUp: { interval: 'N/A', topics: ['Ajuste de ICP'] }
  },
  {
    id: 's1',
    num: 1,
    name: 'Prospección',
    methodology: 'Primer Contacto',
    desc: 'Investigación profunda y primer contacto hiper-personalizado.',
    exitCriteria: ['Contacto establecido', 'Interés inicial confirmado'],
    automations: ['Secuencia de emails (Outreach)', 'Alertas de apertura de email'],
    followUp: { interval: 'Cada 3-5 días', topics: ['Trigger events', 'Casos de éxito de su industria'] }
  },
  {
    id: 's2',
    num: 2,
    name: 'Calificación',
    methodology: 'Validación Inicial',
    desc: 'Verificación rápida de que la cuenta tiene el problema que resolvemos y los recursos para pagarlo.',
    exitCriteria: ['Criterios iniciales validados', 'Reunión agendada'],
    automations: ['Calificación automática de leads', 'Agendamiento automático (Calendly)'],
    followUp: { interval: 'Cada semana', topics: ['Recordatorio de reunión', 'Material pre-lectura'] }
  },
  {
    id: 's3',
    num: 3,
    name: 'Descubrimiento',
    methodology: 'Identificar Banderas Rojas y Win-Results',
    desc: 'Exploración exhaustiva de la necesidad técnica y de negocio.',
    exitCriteria: ['Dolor real identificado', 'Presupuesto preliminar validado'],
    automations: ['Envío de cuestionario pre-llamada', 'Creación automática de Deal en CRM'],
    followUp: { interval: 'Cada 1 semana', topics: ['Resumen de la llamada', 'Contenido educativo sobre su dolor'] }
  },
  {
    id: 's4',
    num: 4,
    name: 'Mapeo de Cuenta',
    methodology: 'Identificar Roles (CE, CT, CU, Coach)',
    desc: 'Identificación de todos los stakeholders y construcción de alianzas.',
    exitCriteria: ['Comprador Económico identificado', 'Coach interno establecido'],
    automations: ['Mapeo automático de organigrama', 'Alertas de cambio de empleo'],
    followUp: { interval: 'Cada 1-2 semanas', topics: ['Validación de asunciones con el Coach', 'Alineación de objetivos'] }
  },
  {
    id: 's5',
    num: 5,
    name: 'Propuesta',
    methodology: 'Alinear Solución con Wins',
    desc: 'Co-creación y presentación formal de la propuesta comercial.',
    exitCriteria: ['Propuesta presentada a todos los roles', 'Feedback recibido'],
    automations: ['Generación de propuesta (PandaDoc)', 'Notificación de apertura de documento'],
    followUp: { interval: 'Cada 3 días', topics: ['Resolución de dudas técnicas', 'Ajustes de alcance'] }
  },
  {
    id: 's6',
    num: 6,
    name: 'Negociación',
    methodology: 'Manejo de Detractores',
    desc: 'Ajustes finales de contrato, legales y mitigación de riesgos.',
    exitCriteria: ['Términos legales acordados', 'Aprobación final de compras'],
    automations: ['Recordatorios de firma (DocuSign)', 'Actualización de forecast'],
    followUp: { interval: 'Diario / Cada 2 días', topics: ['Estatus legal', 'Fechas de inicio'] }
  },
  {
    id: 's7',
    num: 7,
    name: 'Cierre',
    methodology: 'Ganado o Aplazado (No Perdido)',
    desc: 'Transición a Customer Success o reprogramación para el futuro.',
    exitCriteria: ['Contrato firmado (Ganado)', 'Fecha de re-contacto definida (Aplazado)'],
    automations: ['Handover a CS', 'Campaña de Nurturing a largo plazo (si es aplazado)'],
    followUp: { interval: 'Mensual / Trimestral', topics: ['Kickoff (Ganado)', 'Nuevos features, eventos de la industria (Aplazado)'] }
  },
  {
    id: 's8',
    num: 8,
    name: 'Seguimiento / Expansión',
    methodology: 'Aterrizaje y Expansión',
    desc: 'Asegurar el éxito del cliente y buscar oportunidades de up-selling o cross-selling.',
    exitCriteria: ['ROI demostrado', 'Renovación o expansión firmada'],
    automations: ['Encuestas NPS', 'Alertas de uso de producto'],
    followUp: { interval: 'Trimestral', topics: ['Revisión de negocio (QBR)', 'Nuevas necesidades'] }
  }
];

// Mock Deal Data
const mockDeal = {
  id: 'deal-1',
  company: 'TechCorp Global',
  contact: 'Elena Rodríguez',
  role: 'VP of Engineering (Comprador Económico)',
  service: 'Implementación Cloud Enterprise',
  amount: '$120,000 USD',
  influenceScore: 85,
  wins: 'Reducir time-to-market en un 30%',
  results: 'Ahorro de $500k anuales en infraestructura',
  history: [
    { date: '10 Mar', type: 'Email', text: 'Propuesta enviada y revisada por el equipo técnico.' },
    { date: '05 Mar', type: 'Meeting', text: 'Reunión de descubrimiento con el Coach (CTO).' },
    { date: '28 Feb', type: 'Email', text: 'Primer contacto vía LinkedIn. Interés en optimización cloud.' }
  ]
};

export default function SlideCRMPipeline({ isDark }: { isDark: boolean }) {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedStage = stages[selectedStageIndex];

  const handleNext = () => {
    if (selectedStageIndex < stages.length - 1) {
      setSelectedStageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedStageIndex > 0) {
      setSelectedStageIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedElement = container.children[selectedStageIndex] as HTMLElement;
      if (selectedElement) {
        const scrollLeft = selectedElement.offsetLeft - container.offsetLeft - (container.clientWidth / 2) + (selectedElement.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedStageIndex]);

  return (
    <div className={`p-4 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="shrink-0 mb-6 z-10 flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 flex items-center gap-3">
            Pipeline de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Venta Compleja</span>
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestión de oportunidades alineada a la metodología. Usa las flechas para navegar entre las etapas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrev}
            disabled={selectedStageIndex === 0}
            className={`p-2 rounded-full transition-all ${selectedStageIndex === 0 ? 'opacity-50 cursor-not-allowed' : isDark ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            disabled={selectedStageIndex === stages.length - 1}
            className={`p-2 rounded-full transition-all ${selectedStageIndex === stages.length - 1 ? 'opacity-50 cursor-not-allowed' : isDark ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 flex gap-4 overflow-x-auto custom-scrollbar pb-4 z-10 scroll-smooth"
      >
        {stages.map((stage, index) => (
          <div 
            key={stage.id} 
            className={`min-w-[280px] w-[280px] flex flex-col rounded-2xl border transition-all cursor-pointer ${selectedStageIndex === index ? (isDark ? 'bg-[#2a2a2a] border-[#ff851d]' : 'bg-gray-50 border-[#ff851d] shadow-md') : (isDark ? 'bg-[#1e1e1e] border-[#3a3a3a] hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300')}`}
            onClick={() => setSelectedStageIndex(index)}
          >
            {/* Column Header */}
            <div className={`p-3 border-b flex items-center gap-2 ${isDark ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${selectedStageIndex === index ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                {stage.num}
              </div>
              <div className="overflow-hidden">
                <h3 className={`font-bold text-sm truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{stage.name}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block truncate max-w-full ${isDark ? 'bg-[#3a3a3a] text-[#ff851d]' : 'bg-orange-50 text-[#ff851d]'}`}>
                  {stage.methodology}
                </span>
              </div>
            </div>

            {/* Column Body (Cards) */}
            <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
              {/* Show mock deal only in 'Mapeo de Cuenta' for demonstration */}
              {stage.id === 's4' && (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                  className={`p-3 rounded-xl border shadow-sm cursor-pointer relative overflow-hidden group ${isDark ? 'bg-[#3a3a3a] border-[#4a4a4a] hover:border-[#ef375c]' : 'bg-white border-gray-200 hover:border-[#ef375c]'}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#ff851d] to-[#ef375c]"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{mockDeal.company}</h4>
                    <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{mockDeal.amount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <User size={12} className="text-gray-400" />
                    <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{mockDeal.contact}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className={`text-[10px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Score: {mockDeal.influenceScore}</span>
                    </div>
                    <span className="text-[10px] text-[#ef375c] font-medium group-hover:underline flex items-center gap-1">
                      Ver CRM <ArrowRight size={10} />
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Empty state for other columns */}
              {stage.id !== 's4' && (
                <div className={`h-24 rounded-xl border border-dashed flex items-center justify-center ${isDark ? 'border-[#4a4a4a] text-gray-600' : 'border-gray-300 text-gray-400'}`}>
                  <span className="text-xs font-medium">Arrastra un deal aquí</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Panel: Stage Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`shrink-0 mt-4 p-5 rounded-2xl border shadow-lg flex flex-col md:flex-row gap-6 ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}
        >
          {/* Info */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Etapa {selectedStage.num}: {selectedStage.name}
            </h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedStage.desc}
            </p>
            {selectedStage.id === 's7' && (
              <div className={`mt-2 p-2 rounded-lg border text-xs font-medium flex items-start gap-2 ${isDark ? 'bg-yellow-900/20 border-yellow-700/50 text-yellow-500' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span><strong>Importante:</strong> Una venta no se pierde, se aplaza. Un proyecto "perdido" ahora es un proyecto futuro en el próximo periodo.</span>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Exit Criteria */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDark ? 'text-[#ef375c]' : 'text-[#ef375c]'}`}>
                <CheckCircle2 size={12} /> Criterios de Salida
              </h4>
              <ul className="space-y-1.5">
                {selectedStage.exitCriteria.map((crit, i) => (
                  <li key={i} className={`text-xs flex items-start gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ff851d] mt-0.5">•</span> {crit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Automations */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`}>
                <Zap size={12} /> Automatizaciones
              </h4>
              <ul className="space-y-1.5">
                {selectedStage.automations.map((auto, i) => (
                  <li key={i} className={`text-xs flex items-start gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ef375c] mt-0.5">•</span> {auto}
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Up */}
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                <Clock size={12} /> Seguimiento
              </h4>
              <div className="mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isDark ? 'bg-[#3a3a3a] text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {selectedStage.followUp.interval}
                </span>
              </div>
              <ul className="space-y-1.5">
                {selectedStage.followUp.topics.map((topic, i) => (
                  <li key={i} className={`text-xs flex items-start gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-blue-500 mt-0.5">•</span> {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CRM Deal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}
            >
              {/* Modal Header */}
              <div className={`p-5 border-b flex justify-between items-start ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center text-white shadow-lg">
                    <Building size={24} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{mockDeal.company}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-[#ff851d]' : 'bg-white text-[#ff851d] shadow-sm'}`}>
                        {mockDeal.service}
                      </span>
                      <span className={`text-sm font-bold flex items-center gap-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        <DollarSign size={14} /> {mockDeal.amount}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-[#3a3a3a] text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}>
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col md:flex-row gap-6">
                
                {/* Left Column: Contact & Strategy */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  {/* Contact Info */}
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <User size={14} /> Contacto Principal
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                        ER
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{mockDeal.contact}</p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{mockDeal.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* Strategy (Wins & Results) */}
                  <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`}>
                      <Target size={14} /> Estrategia (Win-Results)
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Win (Beneficio Personal)</span>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{mockDeal.wins}</p>
                      </div>
                      <div>
                        <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Result (Impacto Empresa)</span>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{mockDeal.results}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Score de Influencia</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500" style={{ width: `${mockDeal.influenceScore}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-yellow-500">{mockDeal.influenceScore}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Activity History */}
                <div className={`w-full md:w-1/2 p-4 rounded-2xl border flex flex-col ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FileText size={14} /> Historial de Actividad
                  </h3>
                  <div className="flex-1 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                    
                    <div className="space-y-4 relative z-10">
                      {mockDeal.history.map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${item.type === 'Meeting' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                            {item.type === 'Meeting' ? <Users size={12} /> : <Mail size={12} />}
                          </div>
                          <div>
                            <div className="flex items-baseline gap-2 mb-0.5">
                              <span className={`text-xs font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.type}</span>
                              <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.date}</span>
                            </div>
                            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
