import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import {
  ChevronRight, ChevronLeft, Target, Mail, CheckCircle2,
  Building, Clock, Zap, X, Star, FileText,
  AlertTriangle, Users, GripVertical
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
  roleFunctional: 'Comprador Económico' | 'Comprador Usuario' | 'Comprador Técnico' | 'Coach';
  email: string;
  influenceScore: number;
  wins: string;
  results: string;
  history: { date: string; type: 'Meeting' | 'Email'; text: string }[];
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
  program: 'Piloto de Resolución de Conflictos en Equipos de Trabajo',
  amount: '$45,000',
  contacts: [
    {
      id: 'p1',
      name: 'Valentina Ríos',
      role: 'Gerente de Operaciones',
      roleFunctional: 'Comprador Económico',
      email: 'v.rios@grupoandino.com',
      influenceScore: 88,
      wins: 'Reducir la rotación de personal y los costos asociados al ausentismo',
      results: 'Ahorro de $80,000 anuales en reclutamiento y reemplazo de talento',
      history: [
        { date: '10 Mar', type: 'Meeting', text: 'Presentación ejecutiva del programa piloto.' },
        { date: '03 Mar', type: 'Email', text: 'Propuesta formal con ROI proyectado enviada.' },
      ],
    },
    {
      id: 'p2',
      name: 'Carlos Jiménez',
      role: 'Jefe de Área',
      roleFunctional: 'Comprador Usuario',
      email: 'c.jimenez@grupoandino.com',
      influenceScore: 55,
      wins: 'Mejorar el clima laboral de su equipo y reducir conflictos internos',
      results: 'Reducción del 40% en conflictos reportados mensualmente dentro del área',
      history: [
        { date: '08 Mar', type: 'Meeting', text: 'Workshop de diagnóstico con el equipo de 12 personas.' },
        { date: '28 Feb', type: 'Email', text: 'Envío de encuesta de clima organizacional.' },
      ],
    },
    {
      id: 'p3',
      name: 'Ana Morales',
      role: 'Jefa de Recursos Humanos',
      roleFunctional: 'Comprador Técnico',
      email: 'a.morales@grupoandino.com',
      influenceScore: 72,
      wins: 'Posicionar a RRHH como líder de iniciativas de bienestar organizacional',
      results: 'Programa implementado con 80% de adopción en los primeros 3 meses',
      history: [
        { date: '12 Mar', type: 'Meeting', text: 'Revisión metodológica y validación de contenidos.' },
        { date: '05 Mar', type: 'Email', text: 'Checklist de criterios de evaluación del proveedor.' },
      ],
    },
  ],
};

// ─── Indicador de influencia ──────────────────────────────────────────────────
function InfluenceCounter({ score, isDark }: { score: number; isDark: boolean }) {
  const bars = 5;
  const filled = Math.round((score / 100) * bars);
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] font-bold uppercase text-[#ff851d]">Influencia</span>
      <div className="flex gap-1">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-1.5 rounded-full transition-all duration-300 ${
              i < filled
                ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c]'
                : isDark ? 'bg-[#4a4a4a]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <span className={`text-[9px] font-bold tabular-nums ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {score}
      </span>
    </div>
  );
}

// ─── Tarjeta del Deal — drag libre framer-motion, sin tooltip ─────────────────
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
      className={`p-3 rounded-xl border shadow-md select-none overflow-hidden relative transition-shadow ${
        isDark ? 'bg-[#3a3a3a] border-[#4a4a4a] hover:border-[#ef375c]' : 'bg-white border-gray-200 hover:border-[#ef375c]'
      } ${isDragging ? (isDark ? 'shadow-2xl border-[#ff851d]' : 'shadow-xl border-[#ff851d]') : ''}`}
    >
      {/* Borde superior acento */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#ff851d] to-[#ef375c]" />

      {/* Empresa y programa */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <GripVertical size={11} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff851d]">
              {deal.company}
            </span>
          </div>
          <p className={`text-[11px] font-semibold leading-snug line-clamp-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {deal.program}
          </p>
        </div>
        <span className="text-xs font-black shrink-0 text-[#ff851d]">{deal.amount}</span>
      </div>

      {/* Separador */}
      <div className={`my-2.5 h-px ${isDark ? 'bg-[#4a4a4a]' : 'bg-gray-100'}`} />

      {/* 3 contactos */}
      <div className="flex flex-col gap-2">
        {deal.contacts.map((person, i) => {
          const initials = person.name.split(' ').map(n => n[0]).join('').slice(0, 2);
          const filled = Math.round((person.influenceScore / 100) * 5);
          return (
            <div key={person.id} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i]} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-bold truncate leading-none ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{person.name}</p>
                <p className={`text-[9px] truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.role}</p>
              </div>
              <div className="flex gap-0.5 shrink-0">
                {Array.from({ length: 5 }).map((_, b) => (
                  <div
                    key={b}
                    className={`w-2 h-1.5 rounded-full ${
                      b < filled
                        ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c]'
                        : isDark ? 'bg-[#4a4a4a]' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <p className={`mt-2.5 text-[9px] text-center ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
        Clic para detalle · Arrastra para avanzar etapa
      </p>
    </motion.div>
  );
}

// ─── Modal del Deal con tabs por contacto ────────────────────────────────────
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
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`w-full max-w-3xl flex flex-col rounded-3xl shadow-2xl overflow-hidden border select-none ${
          isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-white border-gray-200'
        }`}
        style={{ transform: `translate(${modalPos.x}px, ${modalPos.y}px)`, cursor: dragging ? 'grabbing' : 'default' }}
      >
        {/* Header arrastrable */}
        <div
          className={`p-4 border-b flex justify-between items-start cursor-grab ${
            isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center shadow-lg">
              <Building size={18} className="text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{deal.company}</h2>
              <p className={`text-xs font-medium mt-0.5 max-w-md truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{deal.program}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[#ff851d]">{deal.amount}</span>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-[#3a3a3a] text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b relative z-20 ${isDark ? 'border-[#3a3a3a]' : 'border-gray-200'}`}>
          {deal.contacts.map((p, i) => (
            <button
              key={p.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(i);
              }}
              className={`flex-1 py-2.5 px-3 flex flex-col items-center gap-0.5 text-[10px] font-bold transition-all border-b-2 relative ${
                activeTab === i
                  ? 'border-[#ff851d] text-[#ff851d]'
                  : `border-transparent ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i]} flex items-center justify-center text-white font-bold text-[9px] shadow-sm`}>
                {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="truncate max-w-[80px]">{p.name.split(' ')[0]}</span>
              <span className={`text-[8px] px-1.5 rounded-full ${isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                {p.roleFunctional.replace('Comprador ', 'C.')}
              </span>
            </button>
          ))}
        </div>

        {/* Cuerpo animado */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`tab-content-${activeTab}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
            className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Col izquierda */}
            <div className="flex flex-col gap-3">
              {/* Info persona */}
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                <p className={`text-xs font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{person.role}</p>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{person.email}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 inline-block ${isDark ? 'bg-[#ff851d]/20 text-[#ff851d]' : 'bg-orange-50 text-[#ff851d]'}`}>
                  {person.roleFunctional}
                </span>
              </div>

              {/* Influencia */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#ff851d] flex items-center gap-2">
                  <Star size={12} /> Puntaje de Influencia
                </h3>
                <div className="flex items-end gap-3 mb-3">
                  <span className="text-4xl font-black tabular-nums text-[#ff851d]">{person.influenceScore}</span>
                  <span className={`text-lg font-bold mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/100</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#4a4a4a]' : 'bg-gray-100'}`}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${person.influenceScore}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </div>
                <div className="mt-2">
                  <InfluenceCounter score={person.influenceScore} isDark={isDark} />
                </div>
              </div>

              {/* Win-Results */}
              <div className={`p-3 rounded-2xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-[#ff851d] flex items-center gap-2">
                  <Target size={12} /> Win-Results
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className={`text-[9px] font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Win (Beneficio Personal)</span>
                    <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{person.wins}</p>
                  </div>
                  <div>
                    <span className={`text-[9px] font-bold uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Result (Impacto Empresa)</span>
                    <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{person.results}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Col derecha — historial */}
            <div className={`p-4 rounded-2xl border flex flex-col ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-100 shadow-sm'}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <FileText size={12} /> Historial de Actividad
              </h3>
              <div className="relative">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-4 relative z-10">
                  {person.history.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        item.type === 'Meeting'
                          ? 'bg-[#ff851d]/10 text-[#ff851d]'
                          : 'bg-[#ef375c]/10 text-[#ef375c]'
                      }`}>
                        {item.type === 'Meeting' ? <Users size={12} /> : <Mail size={12} />}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.type}</span>
                          <span className={`text-[9px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.date}</span>
                        </div>
                        <p className={`text-[10px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
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
