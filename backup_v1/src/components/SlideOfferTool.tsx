import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Sparkles, 
  Target, 
  Zap, 
  Trophy, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  X, 
  Layers, 
  Flame, 
  Crown, 
  Rocket, 
  Copy, 
  Check,
  TrendingUp,
  RefreshCcw,
  ArrowRight,
  Users,
  Building2,
  Info
} from 'lucide-react';
import { CompleteICP } from '../types';

interface SlideOfferToolProps {
  isDark: boolean;
  icps: CompleteICP[];
}

// Tipos de barrera para el inventario
const BARRIER_TYPES = ['Obstáculo', 'Creencia', 'Miedo', 'Frustración', 'Dificultad'] as const;
type BarrierType = typeof BARRIER_TYPES[number];

const BARRIER_COLORS: Record<BarrierType, string> = {
  'Obstáculo':   '#ff851d',
  'Creencia':    '#8b5cf6',
  'Miedo':       '#ef375c',
  'Frustración': '#f59e0b',
  'Dificultad':  '#06b6d4',
};

interface InventoryItem {
  id: string;
  type: BarrierType;
  barrier: string;
  solution: string;
}

// ICP local — campos esenciales para construir la oferta dentro de la herramienta
interface LocalICP {
  id: string;
  nombre: string;        // Nombre de la empresa / segmento objetivo
  industria: string;     // Sector o vertical
  tamano: string;        // Tamaño (ej: 10-50 empleados)
  dolorPrincipal: string; // El mayor problema que tienen hoy
}

interface Bonus {
  id: string;
  name: string;
  objection: string;
}

const GUARANTEE_INFO = {
  Unconditional: {
    title: 'Garantía Incondicional',
    desc: 'Elimina el riesgo total. El cliente puede pedir el reembolso por cualquier motivo.',
    template: 'Si por cualquier motivo no estás 100% satisfecho en los primeros 30 días, te devolvemos cada centavo sin preguntas.'
  },
  Conditional: {
    title: 'Garantía Condicional',
    desc: 'Protege al vendedor. El reembolso solo aplica si el cliente cumple ciertos hitos o tareas.',
    template: 'Si implementas todo el sistema, asistes a las sesiones y no logras [Resultado], trabajamos contigo gratis hasta que lo consigas.'
  },
  Anti: {
    title: 'Garantía "Anti-Garantía"',
    desc: 'Crea exclusividad. Indica que el servicio es de alto valor y no hay reembolsos.',
    template: 'Todas las ventas son finales. Este programa es para personas comprometidas que no buscan una salida de emergencia.'
  },
  Implicit: {
    title: 'Garantía Implícita',
    desc: 'Basada en rendimiento. El cliente solo paga si se alcanza el resultado prometido.',
    template: 'No nos pagas nada hoy. Solo cobramos una comisión sobre el beneficio neto que generemos para tu negocio.'
  }
};

// ─── SVG Análisis de Brecha ───────────────────────────────────────────────────
const GapAnalysisDiagram = ({ isDark }: { isDark: boolean }) => {
  const [hoveredHito, setHoveredHito] = React.useState<number | null>(null);

  // ── Dimensiones del lienzo SVG ──────────────────────────────────────────────
  const W = 620;
  const H = 440;

  // ── Vértices del triángulo con márgenes generosos ───────────────────────────
  const BASE_L = { x: 80,  y: H - 70 };
  const PEAK   = { x: 310, y: 55 };
  const BASE_R = { x: 540, y: H - 70 };

  // ── Puntos sobre el lado izquierdo del triángulo ────────────────────────────
  const leftEdge  = (pct: number) => ({
    x: BASE_L.x + (PEAK.x - BASE_L.x) * pct,
    y: BASE_L.y + (PEAK.y  - BASE_L.y) * pct,
  });

  // ── Puntos sobre el lado derecho del triángulo ──────────────────────────────
  const rightEdge = (pct: number) => ({
    x: BASE_R.x + (PEAK.x - BASE_R.x) * pct,
    y: BASE_R.y + (PEAK.y  - BASE_R.y) * pct,
  });

  const HITOS = [
    { label: 'Creencias',     pct: 0.18, side: 0.20, desc: 'Ideas preconcebidas que limitan la adopción de nuevas soluciones o procesos en el ámbito B2B.' },
    { label: 'Frustraciones', pct: 0.34, side: 0.72, desc: 'Dolor acumulado por ineficiencias actuales o intentos fallidos de resolver el problema principal.' },
    { label: 'Problemas',     pct: 0.50, side: 0.22, desc: 'Obstáculos operativos concretos que detienen el crecimiento y generan cuellos de botella hoy.' },
    { label: 'Miedos',        pct: 0.66, side: 0.70, desc: 'Riesgos percibidos (financieros o de prestigio) al intentar un cambio en el status quo de la empresa.' },
    { label: 'Dificultades',  pct: 0.82, side: 0.28, desc: 'Barreras técnicas o humanas que surgen al implementar o escalar el nuevo sistema propuesto.' },
  ];

  // ── Para cada hito: posición dentro del triángulo ───────────────────────────
  // side=0 → borde izq, side=1 → borde der. Usamos la interpolación horizontal.
  const hitoPoint = (h: typeof HITOS[0]) => {
    const lx = leftEdge(h.pct).x;
    const rx = rightEdge(h.pct).x;
    const ly = leftEdge(h.pct).y;
    return { x: lx + (rx - lx) * h.side, y: ly };
  };

  // ── Camino zigzag: nace en BASE_L, visita cada hito, termina en PEAK ────────
  const pathPoints = [BASE_L, ...HITOS.map(h => hitoPoint(h)), PEAK];
  const zigzagPath = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  const textColor = isDark ? '#e5e7eb' : '#111827';
  const dimColor  = isDark ? '#6b7280' : '#9ca3af';

  const DEFAULT_DESC = 'Desde la situación actual —donde el cliente siente el dolor— hasta la situación deseada —donde cumple sus metas— existen hitos que podemos abordar y ayudar a transitar. Pasa el cursor por cada punto para explorarlos.';

  const activeHito   = hoveredHito !== null ? HITOS[hoveredHito] : null;
  const panelTitle   = activeHito ? activeHito.label : 'El Viaje del Cliente B2B';
  const panelDesc    = activeHito ? activeHito.desc  : DEFAULT_DESC;
  const panelNum     = hoveredHito !== null ? hoveredHito + 1 : null;

  // Posición del tooltip en coordenadas SVG
  const tooltipTarget = hoveredHito !== null ? hitoPoint(HITOS[hoveredHito]) : null;

  return (
    <div className="w-full h-full flex flex-col select-none overflow-hidden">

      {/* Título del diagrama */}
      <div className="text-center mb-1 shrink-0">
        <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: textColor }}>
          El Camino hacia la Transformación del Cliente
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: dimColor }}>
          Pasa el cursor sobre cada hito para explorar las barreras
        </p>
      </div>

      {/* ── SVG ocupa todo el espacio disponible ──────────────────────────── */}
      <div className="flex-1 min-w-0 flex items-center justify-center overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="mtnFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#ff851d" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ef375c" stopOpacity="0.06" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff851d" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Eje Y */}
          <line x1={BASE_L.x} y1={40} x2={BASE_L.x} y2={BASE_L.y} stroke={isDark ? '#374151' : '#d1d5db'} strokeWidth="1.5" />
          <polygon points={`${BASE_L.x - 5},45 ${BASE_L.x + 5},45 ${BASE_L.x},30`} fill={isDark ? '#374151' : '#d1d5db'} />
          <text
            x={BASE_L.x - 14} y={(BASE_L.y + 40) / 2} textAnchor="middle"
            transform={`rotate(-90, ${BASE_L.x - 14}, ${(BASE_L.y + 40) / 2})`}
            fontSize="9" fontWeight="700" letterSpacing="1.5" fill={dimColor}
          >VALOR AÑADIDO</text>

          {/* Eje X */}
          <line x1={BASE_L.x} y1={BASE_L.y} x2={BASE_R.x + 30} y2={BASE_L.y} stroke={isDark ? '#374151' : '#d1d5db'} strokeWidth="1.5" />

          {/* Triángulo */}
          <polygon
            points={`${BASE_L.x},${BASE_L.y} ${PEAK.x},${PEAK.y} ${BASE_R.x},${BASE_R.y}`}
            fill="url(#mtnFill)"
            stroke={isDark ? 'rgba(255,133,29,0.5)' : 'rgba(239,55,92,0.4)'}
            strokeWidth="2"
          />

          {/* Camino dentro del triángulo */}
          <path d={zigzagPath} fill="none" stroke="#ff851d" strokeWidth="2" strokeDasharray="6 4" filter="url(#glow)" opacity="0.9" />

          {/* Hitos */}
          {HITOS.map((h, i) => {
            const { x: cx, y: cy } = hitoPoint(h);
            const labelRight = h.side < 0.5;
            const labelX = labelRight ? cx + 20 : cx - 20;
            const anchor  = labelRight ? 'start' : 'end';
            const isActive = hoveredHito === i;
            return (
              <g key={h.label} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredHito(i)} onMouseLeave={() => setHoveredHito(null)}>
                {isActive && <circle cx={cx} cy={cy} r="22" fill="#ff851d" opacity="0.15" />}
                <circle cx={cx} cy={cy} r="13" fill={isActive ? '#ff851d' : (isDark ? '#1f2937' : '#fff')} stroke="#ff851d" strokeWidth="2.5" style={{ transition: 'fill 0.25s' }} />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="900" fill={isActive ? '#fff' : '#ff851d'} style={{ pointerEvents: 'none', transition: 'fill 0.25s' }}>{i + 1}</text>
                <line x1={labelRight ? cx + 13 : cx - 13} y1={cy} x2={labelX} y2={cy} stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} strokeWidth="1" strokeDasharray="3 2" />
                <text x={labelX} y={cy + 4} textAnchor={anchor} fontSize="11" fontWeight="900" letterSpacing="-0.3" fill={isActive ? '#ff851d' : textColor} style={{ pointerEvents: 'none', transition: 'fill 0.25s' }}>
                  {h.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Situación Actual */}
          <circle cx={BASE_L.x} cy={BASE_L.y} r="8" fill="#ef375c" />
          <text x={BASE_L.x} y={BASE_L.y + 22} textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="0.5" fill="#ef375c">SITUACIÓN ACTUAL</text>

          {/* Situación Deseada */}
          <circle cx={PEAK.x} cy={PEAK.y} r="9" fill="#ff851d" filter="url(#glow)" />
          <text x={PEAK.x} y={PEAK.y - 16} textAnchor="middle" fontSize="9" fontWeight="900" letterSpacing="0.5" fill={textColor}>SITUACIÓN DESEADA</text>

          {/* Tooltip flotante sobre el hito activo — via foreignObject */}
          {hoveredHito !== null && tooltipTarget && (() => {
            const h = HITOS[hoveredHito];
            const tipW = 200;
            const tipH = 80;
            // Posiciona el tooltip encima/debajo según el espacio disponible
            const flipY = tooltipTarget.y < tipH + 40;
            const tipX = Math.min(Math.max(tooltipTarget.x - tipW / 2, 10), W - tipW - 10);
            const tipY = flipY ? tooltipTarget.y + 24 : tooltipTarget.y - tipH - 20;
            return (
              <foreignObject x={tipX} y={tipY} width={tipW} height={tipH + 20} style={{ pointerEvents: 'none', overflow: 'visible' }}>
                <div
                  style={{
                    background: isDark ? 'rgba(15,15,15,0.95)' : 'rgba(255,255,255,0.97)',
                    border: '1.5px solid #ff851d',
                    borderRadius: '14px',
                    padding: '10px 12px',
                    boxShadow: '0 8px 32px rgba(255,133,29,0.25)',
                    color: isDark ? '#e5e7eb' : '#111827',
                  }}
                >
                  <p style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#ff851d', marginBottom: '4px' }}>
                    Hito {hoveredHito + 1} · {h.label}
                  </p>
                  <p style={{ fontSize: '10px', fontWeight: 600, lineHeight: '1.4', opacity: 0.85 }}>
                    {h.desc}
                  </p>
                </div>
              </foreignObject>
            );
          })()}
        </svg>
      </div>
    </div>
  );
};

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function SlideOfferTool({ isDark, icps = [] }: SlideOfferToolProps) {
  // 4 fases: 1=Brecha, 2=Inventario, 3=Potenciadores, 4=Oferta Final
  const [phase, setPhase] = useState(0); // Inicia en fase 0: ICP
  const [selectedIcpId, setSelectedIcpId] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // ICP local — hasta 3 perfiles manejados dentro de la herramienta
  const [localIcps, setLocalIcps] = useState<LocalICP[]>([]);
  const [activeLocalIcpId, setActiveLocalIcpId] = useState<string | null>(null);
  const [showIcpDef, setShowIcpDef] = useState(false);

  const addLocalIcp = () => {
    if (localIcps.length >= 3) return; // Máximo 3 ICPs
    const newId = Date.now().toString();
    const newIcp: LocalICP = { id: newId, nombre: '', industria: '', tamano: '', dolorPrincipal: '' };
    setLocalIcps(prev => [...prev, newIcp]);
    setActiveLocalIcpId(newId);
  };

  const updateLocalIcp = (id: string, field: keyof LocalICP, val: string) =>
    setLocalIcps(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i));

  const removeLocalIcp = (id: string) => {
    setLocalIcps(prev => {
      const next = prev.filter(i => i.id !== id);
      if (activeLocalIcpId === id) setActiveLocalIcpId(next[0]?.id ?? null);
      return next;
    });
  };

  const activeLocalIcp = localIcps.find(i => i.id === activeLocalIcpId) ?? null;

  // FASE 2: INVENTARIO
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', type: 'Obstáculo', barrier: 'No tengo tiempo para implementar', solution: 'Configuración total "Llave en Mano" en 48 horas' }
  ]);

  // FASE 3: POTENCIADORES
  const [bonuses, setBonuses] = useState<Bonus[]>([
    { id: 'b1', name: 'Plantilla de Scripts de Cierre', objection: 'No sé qué decir en las llamadas' }
  ]);
  const [guaranteeType, setGuaranteeType] = useState<keyof typeof GUARANTEE_INFO>('Conditional');
  const [guaranteeText, setGuaranteeText] = useState(GUARANTEE_INFO.Conditional.template);

  // FASE 4: oferta (parámetros eliminados de la UI pero mantenidos como placeholders internos para no romper la lógica de strings si se usa)
  const [offerGoal, setOfferGoal] = useState('Resultado Deseado');
  const [offerAvatar, setOfferAvatar] = useState('Nicho Ideal');
  const [offerInterval, setOfferInterval] = useState('90 días');
  const [offerContainer, setOfferContainer] = useState('Sistema');

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

  useEffect(() => {
    if (selectedIcp) {
      setOfferAvatar(prev => prev || selectedIcp.company?.industry || 'Clientes B2B');
      setOfferGoal(prev => prev || 'Pipeline Predecible');
      setOfferContainer(prev => prev || 'Sistema');
    }
  }, [selectedIcp]);

  const addInventory = () => setInventory(prev => [...prev, {
    id: Date.now().toString(), type: 'Obstáculo', barrier: '', solution: ''
  }]);

  const updateInventory = (id: string, field: keyof InventoryItem, val: any) =>
    setInventory(prev => prev.map(o => o.id === id ? { ...o, [field]: val } : o));

  const addBonus = () => setBonuses(prev => [...prev, { id: Date.now().toString(), name: '', objection: '' }]);
  const updateBonus = (id: string, field: keyof Bonus, val: string) =>
    setBonuses(prev => prev.map(b => b.id === id ? { ...b, [field]: val } : b));

  const handleGuaranteeSelect = (type: keyof typeof GUARANTEE_INFO) => {
    setGuaranteeType(type);
    setGuaranteeText(GUARANTEE_INFO[type].template);
  };

  const copyToClipboard = (text: string, index: number) => {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch { /* silenced in copy only */ }
  };

  const phases = [
    { n: 0, title: 'ICP',          icon: Users },
    { n: 1, title: 'Brecha',       icon: TrendingUp },
    { n: 2, title: 'Inventario',   icon: Layers },
    { n: 3, title: 'Potenciadores',icon: Flame },
    { n: 4, title: 'Oferta Final', icon: Rocket },
  ];

  const glassPanel = isDark
    ? 'bg-white/5 border-white/10 shadow-black/40'
    : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50';
  const inputBase = `w-full rounded-xl border transition-all focus:ring-2 focus:ring-[#ff851d] outline-none ${isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`;
  const labelBase = `text-[10px] font-black uppercase tracking-widest mb-1.5 block opacity-50`;

  // Generate the 3 offer options from current state
  const offerOptions = [
    {
      tag: 'Volumen',
      tagColor: '#ff851d',
      text: `${offerGoal || 'Resultado Deseado'} para ${offerAvatar || 'tu negocio'} en ${offerInterval} — o trabajamos gratis.`,
      icon: Trophy,
    },
    {
      tag: 'Velocidad',
      tagColor: '#ef375c',
      text: `Incrementa tu ${offerGoal || 'facturación'} con nuestro ${offerContainer || 'Sistema'} en ${offerInterval}, sin riesgo para ${offerAvatar || 'tu empresa'}.`,
      icon: Zap,
    },
    {
      tag: 'Riesgo Cero',
      tagColor: '#8b5cf6',
      text: `Accede al ${offerContainer || 'Método'} de ${offerGoal || 'Escalamiento'} diseñado para ${offerAvatar || 'líderes B2B'}. Paga solo cuando veas resultados.`,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className={`w-full h-full flex flex-col rounded-3xl sm:rounded-[3.5rem] border-2 relative overflow-hidden p-4 sm:p-6 md:p-8 transition-all duration-500 ${isDark ? 'bg-[#1a1a1a] border-[#2a2a2a] text-white shadow-2xl' : 'bg-white border-gray-100 text-gray-900 shadow-2xl'}`}>

        {/* Background decorativo */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff851d] to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#ef375c] to-transparent blur-[120px]" />
        </div>

        {/* Header */}
        <div className="shrink-0 mb-4 z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg">
              <Briefcase size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">Creador de Oferta</h2>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Hormozi Blueprint</span>
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

          {/* Phase tabs */}
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

        {/* Main workspace */}
        <div className="flex-1 min-h-0 z-10 relative">
          <AnimatePresence mode="wait">

            {/* ── FASE 0: ICP ──────────────────────────────────── */}
            {phase === 0 && (
              <motion.div key="f0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-4">

                {/* Título + Definición */}
                <div className="shrink-0 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-black italic flex items-center gap-2">
                      <Users size={20} className="text-[#ff851d]" /> Perfil del Cliente Ideal
                    </h3>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-0.5">Define a quién le vas a vender antes de diseñar la oferta</p>
                  </div>
                  <button
                    onClick={() => setShowIcpDef(prev => !prev)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                      showIcpDef
                        ? 'bg-[#ff851d] text-white border-[#ff851d]'
                        : (isDark ? 'border-white/10 opacity-40 hover:opacity-100' : 'border-gray-200 opacity-40 hover:opacity-100')
                    }`}
                  >
                    <Info size={12} /> ¿Qué es un ICP?
                  </button>
                </div>

                {/* Banner de definición — colapsable */}
                {showIcpDef && (
                  <div className={`shrink-0 p-4 rounded-2xl border-l-4 border-[#ff851d] ${
                    isDark ? 'bg-[#ff851d]/10' : 'bg-[#ff851d]/5'
                  }`}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#ff851d] mb-1">Ideal Customer Profile (ICP)</p>
                    <p className="text-xs font-medium leading-relaxed opacity-80">
                      El <strong>ICP</strong> es la descripción precisa de la empresa que <strong>más se beneficia de tu solucón</strong>, tiene capacidad de pago y se convierte en un cliente exitoso a largo plazo.
                      A diferencia del "público objetivo" genérico, el ICP define atributos específicos: industria, tamaño, geografría, y sobre todo el <strong>dolor principal</strong> que tu oferta resuelve.
                      Tener un ICP claro aumenta la tasa de cierre, reduce el tiempo de venta y permite personalizar el mensaje con mucha mayor precisión.
                    </p>
                  </div>
                )}

                {/* Tarjetas de ICP */}
                <div className="flex-1 overflow-y-auto min-h-0 pr-1 custom-scrollbar">
                  <div className="space-y-3">
                    {localIcps.length === 0 && (
                      <div className={`p-8 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 opacity-50 ${
                        isDark ? 'border-white/10' : 'border-gray-200'
                      }`}>
                        <Building2 size={32} className="text-[#ff851d]" />
                        <p className="text-xs font-black uppercase tracking-widest">Aún no has definido ningún ICP</p>
                        <p className="text-[10px] opacity-60">Agrega hasta 3 perfiles de cliente ideal para personalizar tu oferta</p>
                      </div>
                    )}

                    {localIcps.map((icp, idx) => (
                      <div
                        key={icp.id}
                        onClick={() => setActiveLocalIcpId(icp.id)}
                        className={`p-5 rounded-[1.5rem] border-2 cursor-pointer transition-all duration-200 relative group ${
                          activeLocalIcpId === icp.id
                            ? 'border-[#ff851d] ' + (isDark ? 'bg-[#ff851d]/10' : 'bg-[#ff851d]/5')
                            : (isDark ? 'bg-white/3 border-white/8 hover:border-white/20' : 'bg-white border-gray-100 hover:border-gray-300')
                        }`}
                      >
                        {/* Cabecera de tarjeta */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                              activeLocalIcpId === icp.id ? 'bg-[#ff851d] text-white' : (isDark ? 'bg-white/10 text-white/50' : 'bg-gray-100 text-gray-400')
                            }`}>{idx + 1}</div>
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">ICP {idx + 1} de {localIcps.length}</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeLocalIcp(icp.id); }}
                            className="p-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          ><X size={14} /></button>
                        </div>

                        {/* Campos del ICP */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className={labelBase}>Empresa / Segmento</label>
                            <input
                              className={`${inputBase} p-2 text-xs font-bold`}
                              placeholder="Ej: Agencias de marketing digital"
                              value={icp.nombre}
                              onChange={e => updateLocalIcp(icp.id, 'nombre', e.target.value)}
                              onClick={e => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <label className={labelBase}>Industria / Vertical</label>
                            <input
                              className={`${inputBase} p-2 text-xs`}
                              placeholder="Ej: SaaS B2B, Manufactura..."
                              value={icp.industria}
                              onChange={e => updateLocalIcp(icp.id, 'industria', e.target.value)}
                              onClick={e => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <label className={labelBase}>Tamaño de Empresa</label>
                            <input
                              className={`${inputBase} p-2 text-xs`}
                              placeholder="Ej: 10-50 empleados, +$1M ARR"
                              value={icp.tamano}
                              onChange={e => updateLocalIcp(icp.id, 'tamano', e.target.value)}
                              onClick={e => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <label className={labelBase}>Dolor Principal</label>
                            <input
                              className={`${inputBase} p-2 text-xs font-bold`}
                              style={{ color: '#ff851d' }}
                              placeholder="El mayor problema que tienen hoy..."
                              value={icp.dolorPrincipal}
                              onChange={e => updateLocalIcp(icp.id, 'dolorPrincipal', e.target.value)}
                              onClick={e => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="shrink-0 flex justify-between items-center pt-2">
                  <button
                    onClick={addLocalIcp}
                    disabled={localIcps.length >= 3}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase border transition-all ${
                      localIcps.length >= 3
                        ? 'opacity-30 cursor-not-allowed ' + (isDark ? 'border-white/10' : 'border-gray-200')
                        : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white border-transparent shadow-lg hover:scale-105'
                    }`}
                  >
                    <Plus size={14} />
                    {localIcps.length >= 3 ? 'Máximo 3 ICPs' : `Agregar ICP (${localIcps.length}/3)`}
                  </button>
                  <button onClick={() => setPhase(1)} className="bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-xl font-black text-xs uppercase flex items-center gap-2">
                    Continuar → Brecha <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}


            {/* ── FASE 1: ANÁLISIS DE BRECHA (Mountain SVG) ──────────────── */}
            {phase === 1 && (
              <motion.div key="f1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="h-full flex flex-col gap-4">
                <div className={`flex-1 p-4 sm:p-6 rounded-[2rem] border ${glassPanel} overflow-hidden`}>
                  <GapAnalysisDiagram isDark={isDark} />
                </div>

                <div className="flex justify-end shrink-0">
                  <button onClick={() => setPhase(2)} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl hover:scale-105 transition-all">
                    Paso 2: Inventario de Barreras <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}


            {/* ── FASE 2: INVENTARIO ─────────────────────────────────────── */}
            {phase === 2 && (
              <motion.div key="f2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full flex flex-col gap-4">
                <div className="flex justify-between items-center shrink-0">
                  <h3 className="text-xl sm:text-2xl font-black italic flex items-center gap-2">
                    <Layers size={20} className="text-[#ff851d]" /> Inventario de Barreras
                  </h3>
                  <button onClick={addInventory} className="bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white px-4 sm:px-6 py-2 rounded-xl font-black text-[9px] sm:text-xs uppercase flex items-center gap-1">
                    <Plus size={14} /> Agregar
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 min-h-0">
                  {inventory.map(item => {
                    const color = BARRIER_COLORS[item.type];
                    return (
                      <div key={item.id} className={`p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border ${glassPanel} grid grid-cols-12 gap-4 relative group`}
                        style={{ borderLeft: `4px solid ${color}` }}>
                        <div className="col-span-12 lg:col-span-5 space-y-3">
                          <div>
                            <label className={labelBase}>Tipo de Barrera</label>
                            <select
                              className={`${inputBase} p-2 text-xs font-black`}
                              value={item.type}
                              onChange={e => updateInventory(item.id, 'type', e.target.value as BarrierType)}
                              style={{ color }}
                            >
                              {BARRIER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={labelBase}>{item.type}</label>
                            <input className={`${inputBase} p-2 text-xs`} value={item.barrier}
                              placeholder={`Describe la ${item.type.toLowerCase()}...`}
                              onChange={e => updateInventory(item.id, 'barrier', e.target.value)} />
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-7 space-y-3">
                          <div>
                            <label className={labelBase}>Solución / Entregable</label>
                            <input className={`${inputBase} p-2 text-xs font-bold`} value={item.solution}
                              placeholder="¿Cómo eliminas esta barrera?"
                              style={{ color: '#ff851d' }}
                              onChange={e => updateInventory(item.id, 'solution', e.target.value)} />
                          </div>
                        </div>
                        <button onClick={() => setInventory(inventory.filter(o => o.id !== item.id))}
                          className="absolute top-2 right-2 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-2 shrink-0">
                  <button onClick={() => setPhase(1)} className="font-black opacity-30 hover:opacity-100 uppercase text-xs tracking-widest flex items-center gap-2">
                    <ChevronLeft size={16} /> Atrás
                  </button>
                  <button onClick={() => setPhase(3)} className="bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-xl font-black text-xs uppercase flex items-center gap-2">
                    Continuar <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── FASE 3: POTENCIADORES ──────────────────────────────────── */}
            {phase === 3 && (
              <motion.div key="f3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                <div className={`col-span-12 md:col-span-8 p-4 sm:p-6 rounded-[2rem] border ${glassPanel} flex flex-col`}>
                  <div className="flex justify-between items-center mb-4 shrink-0">
                    <h3 className="text-lg sm:text-xl font-black italic flex items-center gap-2">
                      <Crown size={20} className="text-yellow-500" /> Bonos
                    </h3>
                    <button onClick={addBonus} className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-black text-[9px] sm:text-xs uppercase">
                      <Plus size={14} className="inline" /> Bono
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3 min-h-0">
                    {bonuses.map(b => (
                      <div key={b.id} className="grid grid-cols-12 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 relative group">
                        <div className="col-span-12 lg:col-span-5">
                          <label className={labelBase}>Nombre</label>
                          <input className={`${inputBase} p-1.5 text-xs font-bold`} value={b.name} onChange={e => updateBonus(b.id, 'name', e.target.value)} />
                        </div>
                        <div className="col-span-12 lg:col-span-8">
                          <label className={labelBase}>Objeción que resuelve</label>
                          <input className={`${inputBase} p-1.5 text-[10px]`} value={b.objection} onChange={e => updateBonus(b.id, 'objection', e.target.value)} />
                        </div>
                        <button onClick={() => setBonuses(bonuses.filter(it => it.id !== b.id))} className="absolute right-1 top-1 text-red-500 opacity-0 group-hover:opacity-100">
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                  <div className={`p-4 sm:p-6 rounded-[2rem] border ${glassPanel} flex flex-col gap-4`}>
                    <div>
                      <h4 className={labelBase}>Tipo de Garantía</h4>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {(Object.keys(GUARANTEE_INFO) as Array<keyof typeof GUARANTEE_INFO>).map(t => (
                          <button key={t} onClick={() => handleGuaranteeSelect(t)}
                            className={`p-1.5 text-[8px] sm:text-[9px] font-black uppercase rounded-lg border transition-all ${guaranteeType === t ? 'bg-[#ff851d] text-white border-[#ff851d]' : 'opacity-40'}`}>
                            {t === 'Unconditional' ? 'Incondicional' : t === 'Conditional' ? 'Condicional' : t === 'Anti' ? 'Anti' : 'Implícita'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-dashed border-gray-400/30">
                      <p className="text-[9px] font-black uppercase text-[#ff851d] mb-1">{GUARANTEE_INFO[guaranteeType].title}</p>
                      <p className="text-[10px] opacity-70 italic leading-tight">{GUARANTEE_INFO[guaranteeType].desc}</p>
                    </div>

                    <div>
                      <label className={labelBase}>Ingrediente: Texto de la Garantía</label>
                      <textarea 
                        className={`${inputBase} p-3 text-xs leading-relaxed h-32 resize-none`}
                        value={guaranteeText}
                        onChange={(e) => setGuaranteeText(e.target.value)}
                        placeholder="Escribe el texto de tu garantía aquí..."
                      />
                    </div>
                  </div>

                  <button onClick={() => setPhase(4)} className="w-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white py-4 rounded-xl font-black text-xs uppercase shadow-xl flex items-center justify-center gap-2">
                    <Rocket size={16} /> Forjar Oferta Final
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── FASE 4: OFERTA FINAL (solo las 3 opciones, diseño bello) ─ */}
            {phase === 4 && (
              <motion.div key="f4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-4">
                {/* Encabezado */}
                <div className="text-center shrink-0">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                    Las <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">3 Mejores</span> Formas de Enunciar tu Oferta
                  </h3>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">
                    Elige la que mejor resuena con tu cliente ideal · Haz clic en copiar
                  </p>
                </div>

                {/* Cards de ofertas — ocupan todo el ancho */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0">
                  {offerOptions.map((off, i) => {
                    const Icon = off.icon;
                    const isCopied = copiedIndex === i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative flex flex-col rounded-[2.5rem] border-2 p-6 sm:p-8 overflow-hidden group cursor-default transition-all duration-300 ${
                          isDark
                            ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-[#ff851d]/50'
                            : 'bg-gradient-to-br from-white to-gray-50 border-gray-100 hover:border-[#ff851d]/40 shadow-xl'
                        }`}
                      >
                        {/* Fondo decorativo por opción */}
                        <div
                          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 pointer-events-none"
                          style={{ background: off.tagColor }}
                        />

                        {/* Tag + número */}
                        <div className="flex items-center justify-between mb-6 shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: `${off.tagColor}18` }}>
                              <Icon size={20} style={{ color: off.tagColor }} />
                            </div>
                            <div>
                              <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block">Opción {i + 1}</span>
                              <span className="text-sm font-black" style={{ color: off.tagColor }}>{off.tag}</span>
                            </div>
                          </div>

                          {/* Botón copiar */}
                          <button
                            onClick={() => copyToClipboard(off.text, i)}
                            className={`p-2 rounded-xl transition-all duration-300 ${
                              isCopied
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                : `opacity-0 group-hover:opacity-100 hover:scale-110`
                            }`}
                            style={!isCopied ? { color: off.tagColor, background: `${off.tagColor}15` } : {}}
                          >
                            {isCopied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>

                        {/* Texto de la oferta */}
                        <div className="flex-1 flex items-center">
                          <p className={`text-base sm:text-lg font-black leading-snug tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            "{off.text}"
                          </p>
                        </div>

                        {/* Barra inferior de color */}
                        <div className="mt-6 h-1 w-full rounded-full shrink-0" style={{ background: `linear-gradient(90deg, ${off.tagColor}, transparent)` }} />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Botón reiniciar */}
                <div className="flex justify-center shrink-0 pb-1">
                  <button onClick={() => setPhase(1)} className="flex items-center gap-2 py-2 text-[10px] font-black uppercase opacity-20 hover:opacity-80 transition-all">
                    <RefreshCcw size={14} /> Reiniciar construcción
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Dots de navegación */}
        <div className="shrink-0 mt-3 flex justify-center gap-2 z-20">
          {phases.map(p => (
            <div key={p.n} className={`h-1.5 rounded-full transition-all duration-500 ${phase === p.n ? 'w-6 bg-[#ff851d]' : 'w-1.5 bg-gray-300 dark:bg-white/10'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
