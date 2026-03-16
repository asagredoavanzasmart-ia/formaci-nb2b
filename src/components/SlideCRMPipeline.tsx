import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import {
  ChevronRight, ChevronLeft, CheckCircle2,
  Building, Clock, Zap, X,
  Users, GripVertical, MessageSquare, Phone, User, Mail, Bell
} from 'lucide-react';

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
    id: 's0', num: 0, name: 'Universo / Generación', methodology: 'Definir ICP',
    desc: 'Identificación de cuentas objetivo que encajan con el Perfil de Cliente Ideal.',
    exitCriteria: ['Lista de cuentas objetivo definida', 'Contactos clave identificados'],
    automations: ['Enriquecimiento de datos', 'Scraping de LinkedIn'],
    followUp: { interval: 'N/A', topics: ['Ajuste de ICP'] }
  },
  {
    id: 's1', num: 1, name: 'Prospección', methodology: 'Primer Contacto',
    desc: 'Investigación profunda y primer contacto hiper-personalizado.',
    exitCriteria: ['Contacto establecido', 'Interés inicial confirmado'],
    automations: ['Secuencia de emails (Outreach)', 'Alertas de apertura de email'],
    followUp: { interval: 'Cada 3-5 días', topics: ['Trigger events', 'Casos de éxito de su industria'] }
  },
  {
    id: 's2', num: 2, name: 'Calificación', methodology: 'Validación Inicial',
    desc: 'Verificación rápida de que la cuenta tiene el problema que resolvemos y los recursos para pagarlo.',
    exitCriteria: ['Criterios iniciales validados', 'Reunión agendada'],
    automations: ['Calificación automática de leads', 'Agendamiento automático (Calendly)'],
    followUp: { interval: 'Cada semana', topics: ['Recordatorio de reunión', 'Material pre-lectura'] }
  },
  {
    id: 's3', num: 3, name: 'Descubrimiento', methodology: 'Identificar Banderas Rojas y Win-Results',
    desc: 'Exploración exhaustiva de la necesidad técnica y de negocio.',
    exitCriteria: ['Dolor real identificado', 'Presupuesto preliminar validado'],
    automations: ['Envío de cuestionario pre-llamada', 'Creación automática de Deal en CRM'],
    followUp: { interval: 'Cada 1 semana', topics: ['Resumen de la llamada', 'Contenido educativo sobre su dolor'] }
  },
  {
    id: 's4', num: 4, name: 'Mapeo de Cuenta', methodology: 'Identificar Roles (CE, CT, CU, Coach)',
    desc: 'Identificación y mapeo de todos los influenciadores y tomadores de decisión.',
    exitCriteria: ['Mapa de poder validado', 'Coach identificado'],
    automations: ['Alertas de actividad en LinkedIn', 'Seguimiento de visitas al sitio'],
    followUp: { interval: 'Cada 5-7 días', topics: ['Compartir insights del sector', 'Actualizaciones de producto'] }
  },
  {
    id: 's5', num: 5, name: 'Propuesta', methodology: 'Construir Caso de Negocio',
    desc: 'Presentación de la solución adaptada al dolor específico del cliente.',
    exitCriteria: ['Propuesta entregada', 'Próximos pasos confirmados'],
    automations: ['Notificaciones de apertura de propuesta', 'Seguimiento automático'],
    followUp: { interval: 'Cada 2-3 días', topics: ['ROI proyectado', 'Casos de éxito similares'] }
  },
  {
    id: 's6', num: 6, name: 'Negociación', methodology: 'Defender el Valor',
    desc: 'Proceso de acuerdo en términos comerciales sin sacrificar el margen.',
    exitCriteria: ['Términos acordados', 'Contrato en revisión legal'],
    automations: ['Alertas de revisión de contrato', 'Recordatorio de plazos'],
    followUp: { interval: 'Cada 1-2 días', topics: ['Estado de la revisión', 'Proceso de firma'] }
  },
  {
    id: 's7', num: 7, name: 'Cierre / Aplazado', methodology: 'Cerrar o Aplazar',
    desc: 'Cierre formal del trato o aplazamiento estratégico con fecha de retoma.',
    exitCriteria: ['Contrato firmado', 'Fecha de retoma agendada si aplaza'],
    automations: ['Generación de contrato automática', 'Alerta de onboarding'],
    followUp: { interval: 'Si aplaza: 30-60 días', topics: ['Novedades del sector', 'Nuevas funcionalidades'] }
  },
];

type CrmPerson = {
  id: string;
  name: string;
  role: string;
  roleFunctional: string;
  phone: string;
  email: string;
  influenceScore: number;
  influenceLevel: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  wins: string;
  results: string;
  history: { date: string; type: 'Meeting' | 'Email' | 'Chat'; text: string; sender?: string }[];
  task?: { title: string; date: string; time: string };
};

type CrmDeal = {
  id: string;
  company: string;
  program: string;
  amount: string;
  contacts: CrmPerson[];
};

const theDeal: CrmDeal = {
  id: 'deal-1',
  company: 'Grupo Andino S.A.',
  program: 'Transformación Digital B2B',
  amount: '$25,000,000',
  contacts: [
    {
      id: 'p2',
      name: 'Carlos Jiménez',
      role: 'Director Regional de Operaciones',
      roleFunctional: 'Comprador Usuario',
      phone: '+56 9 8765 4321',
      email: 'c.jimenez@grupoandino.com',
      influenceScore: 85,
      influenceLevel: 'Alta',
      wins: 'Eliminar el caos operativo y ganar visibilidad total del inventario',
      results: 'Mejora del 25% en la eficiencia logística y reducción de mermas',
      history: [
        { date: 'Hoy', type: 'Chat', text: '¿Revisamos el presupuesto final mañana?', sender: 'Carlos Jiménez' },
        { date: '10 Mar', type: 'Meeting', text: 'Workshop de diagnóstico regional.' },
        { date: '03 Mar', type: 'Email', text: 'Resumen de requerimientos enviado.' },
      ],
      task: { title: 'Llamar para validar SLA', date: 'Mañana', time: '10:30 AM' }
    },
    {
      id: 'p1',
      name: 'Valentina Ríos',
      role: 'Gerente de Finanzas (CFO)',
      roleFunctional: 'Comprador Económico',
      phone: '+56 2 2345 6789',
      email: 'v.rios@grupoandino.com',
      influenceScore: 95,
      influenceLevel: 'Crítica',
      wins: 'Asegurar el ROI del proyecto y optimizar el Capex anual',
      results: 'Ahorro proyectado de $2M en los primeros 18 meses',
      history: [
        { date: '12 Mar', type: 'Meeting', text: 'Presentación ejecutiva de ROI.' },
      ],
      task: { title: 'Enviar cuadro comparativo de ROI', date: 'Viernes 17', time: '09:00 AM' }
    },
    {
      id: 'p3',
      name: 'Ana Morales',
      role: 'CIO / Directora IT',
      roleFunctional: 'Comprador Técnico',
      phone: '+56 9 1234 5678',
      email: 'a.morales@grupoandino.com',
      influenceScore: 78,
      influenceLevel: 'Alta',
      wins: 'Modernizar el stack tecnológico sin interrumpir la operación',
      results: 'Integración certificada con el ERP corporativo',
      history: [
        { date: '08 Mar', type: 'Email', text: 'Validación de protocolos de seguridad.' },
      ],
    },
  ],
};

const AVATAR_COLORS = [
  'from-[#ff851d] to-[#ef375c]',
  'from-[#ef375c] to-[#c0392b]',
  'from-[#b95f00] to-[#ff851d]',
];

function NanoInfluence({ score, isDark }: { score: number, isDark: boolean }) {
  const segments = [1, 2, 3, 4, 5];
  const activeSegments = Math.round(score / 20);

  return (
    <div className="flex gap-0.5 items-center mt-1.5">
      {segments.map((s) => (
        <div 
          key={s} 
          className={`h-1 w-4 rounded-full transition-colors duration-500 ${
            s <= activeSegments 
              ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c]' 
              : isDark ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function DealCard({
  deal,
  isDark,
  onOpenModal,
  columnRefs,
  onMoveCard,
  onSelectStage,
}: {
  deal: CrmDeal;
  isDark: boolean;
  onOpenModal: () => void;
  columnRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onMoveCard: (stageId: string) => void;
  onSelectStage: (index: number) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const getTargetIdx = (clientX: number): number | null => {
    let found: number | null = null;
    columnRefs.current.forEach((col, idx) => {
      if (!col) return;
      const rect = col.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right) found = idx;
    });
    return found;
  };

  const mainContact = deal.contacts[0];

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      style={{ x, y, zIndex: isDragging ? 999 : 10, cursor: isDragging ? 'grabbing' : 'pointer' }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_e, info) => {
        const targetIdx = getTargetIdx(info.point.x);
        if (targetIdx !== null) {
          onMoveCard(stages[targetIdx].id);
          onSelectStage(targetIdx);
        }
        x.set(0);
        y.set(0);
        setIsDragging(false);
      }}
      onClick={(e) => {
        if (!isDragging) onOpenModal();
      }}
      whileHover={isDragging ? {} : { scale: 1.02, rotate: 0.5 }}
      whileDrag={{ scale: 1.05, rotate: -2, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className={`p-4 rounded-2xl border-2 transition-colors relative flex flex-col gap-3 ${
        isDark 
          ? 'bg-[#252525] border-[#3a3a3a] hover:border-[#ff851d]/50' 
          : 'bg-white border-gray-100 shadow-sm hover:border-[#ff851d]/50 shadow-gray-200'
      } ${isDragging ? 'border-[#ff851d] shadow-2xl opacity-90' : ''}`}
    >
      <div className="flex justify-between items-start gap-2">
        <span className={`text-[12px] font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white`}>
          Plan piloto
        </span>
        <div className={`text-[12px] font-black tabular-nums ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {deal.amount}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className={`text-base font-black truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {deal.company}
        </h3>
        <div className="flex items-center gap-2 flex-nowrap opacity-70">
          <User size={14} className="shrink-0" />
          <span className="text-sm font-bold truncate">{mainContact.name}</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 opacity-20 hover:opacity-100 transition-opacity">
        <GripVertical size={16} />
      </div>
    </motion.div>
  );
}

function DealModal({
  deal,
  isDark,
  onClose,
}: {
  deal: CrmDeal;
  isDark: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [modalPos, setModalPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, input')) return;
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, px: modalPos.x, py: modalPos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setModalPos({
      x: dragStart.current.px + (e.clientX - dragStart.current.mx),
      y: dragStart.current.py + (e.clientY - dragStart.current.my),
    });
  };
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const person = deal.contacts[activeTab];

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className={`w-full max-w-5xl h-[620px] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden border ${
          isDark ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-white border-gray-100'
        }`}
        style={{ transform: `translate(${modalPos.x}px, ${modalPos.y}px)` }}
      >
        {/* Modal Header */}
        <div
          className={`p-4 px-6 flex justify-between items-center cursor-move shrink-0 ${
            isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50/50'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center shadow-lg shadow-orange-500/20 text-white">
              <Building size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{deal.company}</h2>
              <p className={`text-sm font-bold text-[#ff851d] mt-1`}>{deal.amount} • {deal.program}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2.5 rounded-full transition-all ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-500'}`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar: Contactos */}
          <div className={`w-[280px] border-r flex flex-col p-4 gap-2 bg-opacity-30 hide-scrollbar ${isDark ? 'border-[#2a2a2a] bg-black' : 'border-gray-100 bg-gray-50'}`}>
            <h3 className={`text-[11px] font-black mb-1 opacity-40 px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contactos
            </h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-2">
              {deal.contacts.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(i)}
                  className={`p-3 rounded-2xl transition-all duration-300 text-left relative ${
                    activeTab === i
                      ? (isDark ? 'bg-white/10' : 'bg-white shadow-sm')
                      : 'bg-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[i]} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm mt-1`}>
                      {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-base font-black truncate leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.name}</p>
                      
                      {/* Rol con fuente 12px */}
                      <p className={`text-[12px] font-bold text-[#ff851d] mt-0.5`}>{p.roleFunctional}</p>
                      <p className={`text-[11px] font-medium opacity-50 truncate`}>{p.role}</p>
                      
                      {/* Info de contacto y Nano Influencia */}
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold opacity-50">
                          <Mail size={10} className="text-[#ff851d]" />
                          <span className="truncate">{p.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold opacity-50">
                          <Phone size={10} className="text-[#ff851d]" />
                          <span className="truncate">{p.phone}</span>
                        </div>
                        
                        {/* Nano Influencia mini abajo del teléfono */}
                        <div className="pt-1">
                           <div className="flex justify-between items-center text-[9px] font-black opacity-30">
                              <span>Influencia</span>
                              <span>{p.influenceScore}%</span>
                           </div>
                           <NanoInfluence score={p.influenceScore} isDark={isDark} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full gap-5"
              >
                {/* Tarea o Recordatorio fijado arriba */}
                {person.task && (
                   <div className={`p-4 rounded-2xl flex items-center justify-between border-l-4 border-l-[#ff851d] shadow-sm ${
                     isDark ? 'bg-orange-500/10 border-[#3a3a3a]' : 'bg-orange-50 border-gray-100'
                   }`}>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded-xl bg-white/20">
                            <Bell size={16} className="text-[#ff851d]" />
                         </div>
                         <div>
                            <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{person.task.title}</p>
                            <p className="text-[11px] font-bold opacity-60">Pendiente: {person.task.date} a las {person.task.time}</p>
                         </div>
                      </div>
                      <button className="text-[11px] font-black underline decoration-[#ff851d] text-[#ff851d]">Marcar completada</button>
                   </div>
                )}

                {/* Wins / Results ARRIBA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50/80'}`}>
                    <h3 className="text-[11px] font-black text-[#ff851d] mb-1.5">
                       Win (Personal)
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {person.wins}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50/80'}`}>
                    <h3 className="text-[11px] font-black text-[#ef375c] mb-1.5">
                       Result (Empresa)
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {person.results}
                    </p>
                  </div>
                </div>

                {/* Historial y Chat ABAJO */}
                <div className="flex-1 flex flex-col min-h-0">
                  <h3 className={`text-[11px] font-black mb-3 opacity-40 px-1`}>
                    Historial y canal de chat
                  </h3>
                  
                  <div className={`flex-1 rounded-2xl overflow-hidden flex flex-col min-h-0 ${isDark ? 'bg-white/5' : 'bg-gray-50/50'}`}>
                    <div className="flex-1 p-5 space-y-3 overflow-y-auto hide-scrollbar">
                      {person.history.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 pb-2 last:pb-0">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            h.type === 'Meeting' ? 'bg-orange-500' :
                            h.type === 'Email' ? 'bg-zinc-500' :
                            'bg-green-500'
                          }`} />
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold opacity-40 flex gap-2">
                              <span>{h.date}</span>
                              <span className="opacity-50">•</span>
                              <span>{h.type}</span>
                            </p>
                            <p className="text-sm font-medium opacity-80 mt-0.5 leading-snug truncate">
                              {h.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className={`p-5 pt-0 shrink-0 ${isDark ? 'bg-black/10' : 'bg-white/30'}`}>
                       <div className="relative mt-2">
                          <input 
                            type="text" 
                            placeholder={`Enviar mensaje a ${person.name.split(' ')[0]}...`}
                            readOnly
                            className={`w-full h-12 px-5 rounded-2xl border text-sm font-medium transition-all ${
                              isDark ? 'bg-[#222] border-[#333] text-gray-400' : 'bg-white border-gray-200 text-gray-500'
                            }`}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-orange-500/10 text-[#ff851d] flex items-center justify-center">
                            <Zap size={16} />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SlideCRMPipeline({ isDark }: { isDark: boolean }) {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cardStageId, setCardStageId] = useState<string>('s0');
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedStage = stages[selectedStageIndex];

  const handleNext = () => {
    if (selectedStageIndex < stages.length - 1) setSelectedStageIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (selectedStageIndex > 0) setSelectedStageIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const selectedElement = container.children[selectedStageIndex] as HTMLElement;
      if (selectedElement) {
        const scrollLeft =
          selectedElement.offsetLeft - container.offsetLeft - container.clientWidth / 2 + selectedElement.clientWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedStageIndex]);

  return (
    <div
      className={`p-3 sm:p-4 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${
        isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'
      }`}
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="shrink-0 mb-4 z-10 flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-black mb-1 flex items-center gap-3">
            Pipeline de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
              Venta Compleja
            </span>
          </h2>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestión estratégica de oportunidades. Arrastra la tarjeta o haz clic para ver contactos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={selectedStageIndex === 0}
            className={`px-4 py-2 rounded-full font-black text-sm flex items-center gap-2 shadow-sm transition-all ${
              selectedStageIndex === 0
                ? 'opacity-40 cursor-not-allowed ' + (isDark ? 'bg-[#2a2a2a] text-gray-500' : 'bg-gray-100 text-gray-400')
                : isDark
                ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#4a4a4a]'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            }`}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <span className={`text-sm font-black tabular-nums ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {selectedStageIndex + 1} / {stages.length}
          </span>
          <button
            onClick={handleNext}
            disabled={selectedStageIndex === stages.length - 1}
            className={`px-4 py-2 rounded-full font-black text-sm flex items-center gap-2 shadow-sm transition-all ${
              selectedStageIndex === stages.length - 1
                ? 'opacity-40 cursor-not-allowed ' + (isDark ? 'bg-[#2a2a2a] text-gray-500' : 'bg-gray-100 text-gray-400')
                : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white hover:shadow-md hover:shadow-red-500/20'
            }`}
          >
            Siguiente <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 flex gap-4 overflow-x-auto custom-scrollbar pb-3 z-10 scroll-smooth min-h-0"
      >
        {stages.map((stage, index) => {
          const hasCard = cardStageId === stage.id;
          return (
            <div
              key={stage.id}
              ref={(el) => { columnRefs.current[index] = el; }}
              className={`min-w-[260px] w-[260px] flex flex-col rounded-3xl border transition-all cursor-pointer ${
                selectedStageIndex === index
                  ? isDark ? 'bg-[#2a2a2a] border-[#ff851d]' : 'bg-gray-50 border-[#ff851d] shadow-md'
                  : isDark ? 'bg-[#1e1e1e] border-[#3a3a3a] hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedStageIndex(index)}
            >
              <div className={`p-3 border-b flex items-center gap-3 ${isDark ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all duration-300 ${
                  selectedStageIndex === index
                    ? isDark ? 'bg-white shadow-[0_0_15px_rgba(255,133,29,0.5)] scale-110' : 'bg-white shadow-lg border border-orange-100 scale-110'
                    : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-600'
                }`}>
                  {selectedStageIndex === index ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#ff851d] to-[#ef375c]">
                      {stage.num}
                    </span>
                  ) : (
                    stage.num
                  )}
                </div>
                <div className="overflow-hidden">
                  <h3 className={`font-black text-sm truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{stage.name}</h3>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full inline-block truncate max-w-full ${
                    isDark ? 'bg-[#3a3a3a] text-[#ff851d]' : 'bg-orange-50 text-[#ff851d]'
                  }`}>
                    {stage.methodology}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-3 flex flex-col gap-3" style={{ minHeight: '80px' }}>
                {hasCard ? (
                  <DealCard
                    deal={theDeal}
                    isDark={isDark}
                    onOpenModal={() => setShowModal(true)}
                    columnRefs={columnRefs}
                    onMoveCard={(stageId) => setCardStageId(stageId)}
                    onSelectStage={(i) => setSelectedStageIndex(i)}
                  />
                ) : (
                  <div className={`flex-1 rounded-2xl border border-dashed flex items-center justify-center min-h-[80px] ${
                    isDark ? 'border-[#3a3a3a] text-gray-700' : 'border-gray-200 text-gray-300'
                  }`}>
                    <span className="text-sm font-bold">Sin actividad</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`shrink-0 mt-2 p-3 rounded-2xl border shadow-lg flex flex-col md:flex-row gap-3 ${
            isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'
          }`}
        >
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <h3 className={`text-base font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Etapa {selectedStage.num}: {selectedStage.name}
            </h3>
            <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedStage.desc}</p>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className="text-sm font-black text-[#ef375c] mb-2 flex items-center gap-2">
                <CheckCircle2 size={14} /> Criterios
              </h4>
              <ul className="space-y-1">
                {selectedStage.exitCriteria.map((crit, i) => (
                  <li key={i} className={`text-sm font-bold flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ff851d]">•</span> {crit}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className="text-sm font-black text-[#ff851d] mb-2 flex items-center gap-2">
                <Zap size={14} /> Automatización
              </h4>
              <ul className="space-y-1">
                {selectedStage.automations.map((auto, i) => (
                  <li key={i} className={`text-sm font-bold flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ef375c]">•</span> {auto}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className={`text-sm font-black mb-2 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock size={14} /> Seguimiento
              </h4>
              <div className="mb-1.5 text-center">
                <span className={`text-xs font-black px-2 py-0.5 rounded-md ${isDark ? 'bg-[#3a3a3a] text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {selectedStage.followUp.interval}
                </span>
              </div>
              <ul className="space-y-1">
                {selectedStage.followUp.topics.map((topic, i) => (
                  <li key={i} className={`text-sm font-bold flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ff851d]">•</span> {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <DealModal
            deal={theDeal}
            isDark={isDark}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
