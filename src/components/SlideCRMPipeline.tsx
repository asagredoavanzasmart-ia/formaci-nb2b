import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import {
  ChevronRight, ChevronLeft, Target, Mail, CheckCircle2,
  Building, Clock, Zap, X, Star, FileText,
  AlertTriangle, Users, GripVertical, MessageSquare, Phone, User
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

// ─── Tipos CRM ───────────────────────────────────────────────────────────────
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
};

type CrmDeal = {
  id: string;
  company: string;
  program: string;
  amount: string;
  contacts: CrmPerson[];
};

// ─── Deal único (inicia en etapa 0) ──────────────────────────────────────────
const theDeal: CrmDeal = {
  id: 'deal-1',
  company: 'Grupo Andino S.A.',
  program: 'Proyecto de Transformación Digital B2B',
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
        { date: 'Hoy', type: 'Chat', text: '¿Podemos revisar el presupuesto final mañana?', sender: 'Carlos Jiménez' },
        { date: '10 Mar', type: 'Meeting', text: 'Workshop de diagnóstico con el equipo regional.' },
        { date: '03 Mar', type: 'Email', text: 'Resumen de requerimientos técnicos enviado.' },
      ],
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
        { date: '12 Mar', type: 'Meeting', text: 'Presentación ejecutiva de retorno de inversión.' },
      ],
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
        { date: '08 Mar', type: 'Email', text: 'Validación de protocolos de seguridad y API.' },
      ],
    },
  ],
};

// ... (Indicator components if needed) ...

// ─── Tarjeta del Deal ─────────────────
const AVATAR_COLORS = [
  'from-[#ff851d] to-[#ef375c]',
  'from-[#ef375c] to-[#c0392b]',
  'from-[#b95f00] to-[#ff851d]',
];

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

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.06}
      style={{ x, y, zIndex: isDragging ? 9999 : 10, position: 'relative', cursor: isDragging ? 'grabbing' : 'grab' }}
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
      onClick={() => {
        if (!isDragging) onOpenModal();
      }}
      whileHover={isDragging ? {} : { scale: 1.02, y: -2 }}
      className={`p-4 rounded-2xl border shadow-lg select-none overflow-hidden relative transition-all duration-300 flex items-center justify-center min-h-[100px] ${
        isDark ? 'bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#ef375c]' : 'bg-white border-gray-100 hover:border-[#ef375c]'
      } ${isDragging ? (isDark ? 'shadow-2xl border-[#ff851d]' : 'shadow-xl border-[#ff851d]') : ''}`}
    >
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#ff851d] to-[#ef375c]" />
      
      <div className="flex flex-col items-center">
        <h3 className={`text-lg font-black tracking-tight text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {deal.contacts[0].name}
        </h3>
        <p className={`text-[10px] uppercase font-bold tracking-widest mt-1 ${isDark ? 'text-[#ff851d]' : 'text-[#ef375c]'}`}>
          Oportunidad B2B
        </p>
      </div>

      <div className="absolute right-2 bottom-2">
        <div className={`p-1.5 rounded-lg ${isDark ? 'bg-black/20 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
          <GripVertical size={14} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal del Deal ────────────────────────────────────
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
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className={`w-full max-w-5xl h-[600px] flex flex-col rounded-[2.5rem] shadow-2xl overflow-hidden border ${
          isDark ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-white border-gray-100'
        }`}
        style={{ transform: `translate(${modalPos.x}px, ${modalPos.y}px)` }}
      >
        {/* Header */}
        <div
          className={`p-6 border-b flex justify-between items-center cursor-move shrink-0 ${
            isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50/50 border-gray-100'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Building size={24} className="text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{deal.company}</h2>
              <p className={`text-xs font-bold uppercase tracking-widest text-[#ff851d]`}>{deal.amount} • {deal.program}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2.5 rounded-full transition-all ${isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/5 text-gray-500'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar: Contacts */}
          <div className={`w-[280px] border-r flex flex-col p-4 gap-3 bg-opacity-30 ${isDark ? 'border-[#2a2a2a] bg-black' : 'border-gray-100 bg-gray-50'}`}>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-50 px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              CENTRO DE DECISIÓN
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2.5">
              {deal.contacts.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(i)}
                  className={`p-3.5 rounded-3xl border transition-all duration-300 text-left group relative ${
                    activeTab === i
                      ? (isDark ? 'bg-[#222] border-[#ff851d] shadow-xl scale-[1.02]' : 'bg-white border-[#ff851d] shadow-xl scale-[1.02]')
                      : (isDark ? 'bg-transparent border-transparent hover:bg-white/5' : 'bg-transparent border-transparent hover:bg-black/5')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[i]} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md`}>
                      {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.name}</p>
                      <p className={`text-[10px] font-medium opacity-50 truncate`}>{p.role}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Info Panel */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                      person.roleFunctional.includes('Económico') ? 'bg-green-500/10 text-green-500' :
                      person.roleFunctional.includes('Técnico') ? 'bg-blue-500/10 text-blue-500' :
                      'bg-orange-500/10 text-orange-500'
                    }`}>
                      {person.roleFunctional}
                    </span>
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{person.name}</h2>
                    <p className={`text-base font-medium opacity-60`}>{person.role}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <div className={`p-2 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                        <Mail size={14} className="text-[#ff851d]" />
                      </div>
                      <span className="opacity-70">{person.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <div className={`p-2 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                        <Phone size={14} className="text-[#ff851d]" />
                      </div>
                      <span className="opacity-70">{person.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50/50 border-gray-100'}`}>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-[#ff851d] mb-4 flex items-center gap-2">
                       WIN (PERSONAL)
                    </h3>
                    <p className={`text-base font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {person.wins}
                    </p>
                  </div>
                  <div className={`p-6 rounded-[2rem] border ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50/50 border-gray-100'}`}>
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-[#ef375c] mb-4 flex items-center gap-2">
                       RESULT (EMPRESA)
                    </h3>
                    <p className={`text-base font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {person.results}
                    </p>
                  </div>
                </div>

                {/* History & Chat */}
                <div className="space-y-4">
                  <h3 className={`text-[11px] font-black uppercase tracking-widest px-2 flex items-center gap-2 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
                    HISTORIAL Y CANAL DE CHAT
                  </h3>
                  
                  <div className={`rounded-[2.5rem] border overflow-hidden flex flex-col ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50/50 border-gray-100'}`}>
                    {/* Activity List */}
                    <div className="p-6 space-y-5 max-h-[220px] overflow-y-auto custom-scrollbar">
                      {person.history.map((h, i) => (
                        <div key={i} className="flex gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                            h.type === 'Meeting' ? 'bg-orange-500/10 text-orange-500' :
                            h.type === 'Email' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-green-500/10 text-green-500'
                          }`}>
                            {h.type === 'Meeting' ? <Users size={18} /> : 
                             h.type === 'Email' ? <Mail size={18} /> : 
                             <MessageSquare size={18} />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-black uppercase tracking-wider">{h.type}</span>
                              <span className="text-[10px] opacity-40 font-bold">{h.date}</span>
                            </div>
                            <p className="text-sm font-medium leading-normal opacity-70">{h.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Box */}
                    <div className={`p-6 pt-0 ${isDark ? 'bg-black/20' : 'bg-white/50'}`}>
                       <div className={`p-4 rounded-3xl mb-4 space-y-3 ${isDark ? 'bg-black/30' : 'bg-white'}`}>
                          <div className="flex justify-start">
                            <div className={`px-4 py-3 rounded-3xl rounded-tl-none text-sm max-w-[85%] ${isDark ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-800'}`}>
                              <p className="font-black text-[10px] text-[#ff851d] mb-1">{person.name}</p>
                              ¿Podemos ajustar los términos del SLA antes del viernes?
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className={`px-4 py-3 rounded-3xl rounded-tr-none text-sm max-w-[85%] bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg`}>
                              Lo estoy revisando con legal. Te confirmo mañana PM.
                            </div>
                          </div>
                       </div>
                       <div className="relative">
                          <input 
                            type="text" 
                            placeholder={`Enviar mensaje a ${person.name.split(' ')[0]}...`}
                            readOnly
                            className={`w-full h-12 px-6 rounded-2xl border text-sm font-medium transition-all ${
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

// ─── Componente principal ─────────────────────────────────────────────────────
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
      className={`p-4 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${
        isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'
      }`}
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="shrink-0 mb-4 z-10 flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1 flex items-center gap-3">
            Pipeline de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
              Venta Compleja
            </span>
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestión de oportunidades alineada a la metodología. La tarjeta es arrastrable. Clic para ver el detalle.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={selectedStageIndex === 0}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm transition-all ${
              selectedStageIndex === 0
                ? 'opacity-40 cursor-not-allowed ' + (isDark ? 'bg-[#2a2a2a] text-gray-500' : 'bg-gray-100 text-gray-400')
                : isDark
                ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#4a4a4a]'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
            }`}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <span className={`text-sm font-bold tabular-nums ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {selectedStageIndex + 1} / {stages.length}
          </span>
          <button
            onClick={handleNext}
            disabled={selectedStageIndex === stages.length - 1}
            className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm transition-all ${
              selectedStageIndex === stages.length - 1
                ? 'opacity-40 cursor-not-allowed ' + (isDark ? 'bg-[#2a2a2a] text-gray-500' : 'bg-gray-100 text-gray-400')
                : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white hover:shadow-md hover:shadow-red-500/20'
            }`}
          >
            Siguiente <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex gap-4 overflow-x-auto custom-scrollbar pb-4 z-10 scroll-smooth min-h-0"
      >
        {stages.map((stage, index) => {
          const hasCard = cardStageId === stage.id;
          return (
            <div
              key={stage.id}
              ref={(el) => { columnRefs.current[index] = el; }}
              className={`min-w-[230px] w-[230px] flex flex-col rounded-2xl border transition-all cursor-pointer ${
                selectedStageIndex === index
                  ? isDark ? 'bg-[#2a2a2a] border-[#ff851d]' : 'bg-gray-50 border-[#ff851d] shadow-md'
                  : isDark ? 'bg-[#1e1e1e] border-[#3a3a3a] hover:border-gray-500' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedStageIndex(index)}
            >
              {/* Column Header */}
              <div className={`p-3 border-b flex items-center gap-2 ${isDark ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  selectedStageIndex === index
                    ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white'
                    : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stage.num}
                </div>
                <div className="overflow-hidden">
                  <h3 className={`font-bold text-xs truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{stage.name}</h3>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full inline-block truncate max-w-full ${
                    isDark ? 'bg-[#3a3a3a] text-[#ff851d]' : 'bg-orange-50 text-[#ff851d]'
                  }`}>
                    {stage.methodology}
                  </span>
                </div>
              </div>

              {/* Column Body */}
              <div className="flex-1 p-2 flex flex-col gap-2" style={{ minHeight: '80px' }}>
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
                  <div className={`flex-1 rounded-xl border border-dashed flex items-center justify-center min-h-[72px] ${
                    isDark ? 'border-[#3a3a3a] text-gray-700' : 'border-gray-200 text-gray-300'
                  }`}>
                    <span className="text-[10px] font-medium">Sin deals</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Panel: Stage Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`shrink-0 mt-3 p-4 rounded-2xl border shadow-lg flex flex-col md:flex-row gap-4 ${
            isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'
          }`}
        >
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Etapa {selectedStage.num}: {selectedStage.name}
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedStage.desc}</p>
            {selectedStage.id === 's7' && (
              <div className={`mt-2 p-2 rounded-lg border text-xs font-medium flex items-start gap-2 ${
                isDark ? 'bg-yellow-900/20 border-yellow-700/50 text-yellow-500' : 'bg-yellow-50 border-yellow-200 text-yellow-700'
              }`}>
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span><strong>Importante:</strong> Una venta no se pierde, se aplaza.</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[#ef375c]">
                <CheckCircle2 size={12} /> Criterios de Salida
              </h4>
              <ul className="space-y-1">
                {selectedStage.exitCriteria.map((crit, i) => (
                  <li key={i} className={`text-[10px] flex items-start gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ff851d] mt-0.5">•</span> {crit}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 text-[#ff851d]">
                <Zap size={12} /> Automatizaciones
              </h4>
              <ul className="space-y-1">
                {selectedStage.automations.map((auto, i) => (
                  <li key={i} className={`text-[10px] flex items-start gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ef375c] mt-0.5">•</span> {auto}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock size={12} /> Seguimiento
              </h4>
              <div className="mb-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isDark ? 'bg-[#3a3a3a] text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                  {selectedStage.followUp.interval}
                </span>
              </div>
              <ul className="space-y-1">
                {selectedStage.followUp.topics.map((topic, i) => (
                  <li key={i} className={`text-[10px] flex items-start gap-1.5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#ff851d] mt-0.5">•</span> {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modal del Deal */}
      <AnimatePresence>
        {showModal && (
          <DealModal
            deal={theDeal}
            isDark={isDark}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
