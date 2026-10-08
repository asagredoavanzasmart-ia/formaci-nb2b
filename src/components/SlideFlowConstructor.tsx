import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Connection,
  Node,
  Background,
  Controls,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  BaseEdge,
  getBezierPath,
  getSmoothStepPath,
  EdgeProps,
  ConnectionMode,
  ConnectionLineComponentProps,
  NodeResizer,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Copy, Minimize2, Maximize2, X, ChevronRight, Download, Zap, Play, Save, Menu, Maximize, FileText, Trash2, LogOut, Check, Calculator, Sliders, Settings2, Spline, Waypoints, CornerDownRight } from 'lucide-react';
import { INITIAL_NODES, INITIAL_EDGES } from './initialFlowData';
import { toJpeg } from 'html-to-image';
import logoHorizontalDark from '../Logos/logo horizontal dark.png';
import logoHorizontalLight from '../Logos/logo horizontal ligth.png';

// --- CONTEXTO DE EXPORTACIÓN ---
const ExportContext = React.createContext({ isExporting: false });

/* --- Configuración del trazado de las conexiones --- */
export type EdgeShape = 'curva' | 'scurva' | 'srecta';
const EDGE_DEFAULTS = { shape: 'curva' as EdgeShape, width: 5 };
const EdgeStyleContext = React.createContext(EDGE_DEFAULTS);

/* Valores de partida de cada ajuste por conexión. */
export const CURVATURA_DEF = 0.3;
export const DESVIO_DEF = 20;

/* Vector unitario que sale del nodo por un lado. */
const normalDeLado = (pos: Position) => {
  switch (pos) {
    case Position.Left: return { x: -1, y: 0 };
    case Position.Right: return { x: 1, y: 0 };
    case Position.Top: return { x: 0, y: -1 };
    default: return { x: 0, y: 1 };
  }
};

/**
 * Puntos de control de la curva en S: se separan PERPENDICULARES al lado por
 * el que la línea sale y entra, no hacia el otro nodo. Por eso el trazo nace
 * recto del bloque y llega recto al otro, en vez de entrar de costado.
 * El tirón es proporcional a la distancia, así se ve igual de proporcionado
 * en conexiones cortas y largas.
 */
const controlesEse = (a: any, curvatura: number) => {
  const dist = Math.hypot(a.targetX - a.sourceX, a.targetY - a.sourceY) || 1;
  const tiron = Math.max(8, dist * curvatura);
  const n1 = normalDeLado(a.sourcePosition);
  const n2 = normalDeLado(a.targetPosition);
  return {
    c1: { x: a.sourceX + n1.x * tiron, y: a.sourceY + n1.y * tiron },
    c2: { x: a.targetX + n2.x * tiron, y: a.targetY + n2.y * tiron },
  };
};

/* Devuelve el trazado según la forma elegida y los ajustes de la conexión. */
const buildEdgePath = (
  shape: EdgeShape,
  args: any,
  ajustes?: { curvatura?: number; desvio?: number },
): [string, number, number] => {
  if (shape === 'curva') {
    const { c1, c2 } = controlesEse(args, ajustes?.curvatura ?? CURVATURA_DEF);
    const d = `M${args.sourceX},${args.sourceY} C${c1.x},${c1.y} ${c2.x},${c2.y} ${args.targetX},${args.targetY}`;
    // Punto medio de la cúbica (t = 0.5): ahí va la etiqueta y el botón.
    const lx = (args.sourceX + 3 * c1.x + 3 * c2.x + args.targetX) / 8;
    const ly = (args.sourceY + 3 * c1.y + 3 * c2.y + args.targetY) / 8;
    return [d, lx, ly];
  }
  const [d, lx, ly] = getSmoothStepPath({
    ...args,
    borderRadius: shape === 'scurva' ? 24 : 0,
    offset: ajustes?.desvio ?? DESVIO_DEF,
  });
  return [d, lx, ly];
};


// --- CONFIGURACIÓN DE ICONOS ---
const AVAILABLE_ICONS = [
  { name: 'Agente IA', file: 'Agente IA.png' },
  { name: 'Anuncio Búsqueda', file: 'Anuncio de Búsqueda.png' },
  { name: 'Anuncios Meta', file: 'Anuncios en Meta.png' },
  { name: 'Mailer Lite', file: 'Automatización Mailer Lite.png' },
  { name: 'Google Search', file: 'Búsqueda en Google.png' },
  { name: 'CRM', file: 'CRM.png' },
  { name: 'Kommo CRM', file: 'Kommo CRM.png' },
  { name: 'Google ADS', file: 'Campaña Google ADS.png' },
  { name: 'Instagram', file: 'Campaña instagram.png' },
  { name: 'Conjunto Anuncios', file: 'Conjunto de anuncios.png' },
  { name: 'Email Meta', file: 'EmailMeta.png' },
  { name: 'Facebook', file: 'Facebook.png' },
  { name: 'Landing Page', file: 'Landing Page.png' },
  { name: 'Lead Gen', file: 'LeadGen.png' },
  { name: 'LinkedIn', file: 'LinkedIn.png' },
  { name: 'Llamada', file: 'Llamada.png' },
  { name: 'Messenger', file: 'Messenger.png' },
  { name: 'Meta ADS', file: 'Meta ADS.png' },
  { name: 'Notificación', file: 'Notificación.png' },
  { name: 'Secuencia Email', file: 'Secuencia Email.png' },
  { name: 'Sitio Web', file: 'Sitio WebPage.png' },
  { name: 'TikTok', file: 'TikTok.png' },
  { name: 'VSL Page', file: 'VSLWebPage.png' },
  { name: 'WhatsApp', file: 'WhatsApp.png' },
  { name: 'YouTube', file: 'YouTube.png' },
  { name: 'Google Maps', file: 'google MAps.png' }
];

const PASTEL_COLORS = [
  { name: 'Orange', bg: '#fff7ed', border: '#ffedd5', stroke: '#ff851d' },
  { name: 'Purple', bg: '#f5f3ff', border: '#ede9fe', stroke: '#a855f7' },
  { name: 'Gray', bg: '#f8fafc', border: '#e2e8f0', stroke: '#64748b' },
  { name: 'Green', bg: '#f0fdf4', border: '#dcfce7', stroke: '#22c55e' },
  { name: 'Silver', bg: '#f9fafb', border: '#f3f4f6', stroke: '#94a3b8' },
];

const getIconUrl = (file: string) => {
  return new URL(`../icons/${file}`, import.meta.url).href;
};

// --- COMPONENTE DE NODO PERSONALIZADO ---
const CustomNode = ({ data, id, isDark: propIsDark }: any) => {
  const { isExporting } = React.useContext(ExportContext);
  const { setNodes, setEdges } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || '');
  const [isDropTarget, setIsDropTarget] = useState(false);
  
  const isDark = propIsDark;

  const onDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => nds.filter((n) => n.id !== id && n.parentId !== id));
  }, [id, setNodes]);

  const onDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => {
      const node = nds.find((n) => n.id === id);
      if (!node) return nds;
      const newId = `node-${Date.now()}`;
      const children = nds.filter(n => n.parentId === id);
      
      const newNodes = [
        ...nds,
        {
          ...node,
          id: newId,
          position: { x: node.position.x + 30, y: node.position.y + 30 },
          data: { ...node.data, label: node.data.label }
        }
      ];

      // Duplicar hijos también
      children.forEach(child => {
        newNodes.push({
          ...child,
          id: `child-${Date.now()}-${Math.random()}`,
          parentId: newId,
        } as any);
      });

      return newNodes;
    });
  }, [id, setNodes]);

  const handleBlur = () => {
    setIsEditing(false);
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, label } };
      }
      return node;
    }));
  };


  return (
    <div 
      className={`relative group flex flex-col items-center transition-opacity duration-200 ${isDropTarget ? 'opacity-30' : 'opacity-100'}`}
      onDragEnter={() => setIsDropTarget(true)}
      onDragLeave={() => setIsDropTarget(false)}
      onDrop={() => setIsDropTarget(false)}
    >
      {!isExporting && (
        <div 
          className={`absolute left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 z-[110] pointer-events-auto -top-6 export-hide invisible group-hover:visible`}
        >
          <button onClick={onDuplicate} title="Duplicar" className="p-1 w-[22px] h-[22px] bg-zinc-900 text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center border border-white/10">
            <Copy size={10} />
          </button>
          <button onClick={onDelete} title="Eliminar" className="p-1 w-[22px] h-[22px] bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center border border-white/10">
            <X size={10} />
          </button>
        </div>
      )}

      <div className="relative flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
        {/* Halo de luz blanco 100% opaco para máximo contraste */}
        <div className={`absolute inset-0 rounded-full blur-xl scale-100 ${isDark ? 'bg-white/20' : 'bg-white'} -z-10`} />
        
        {/* Puerto de Entrada (Target) con Magnética alta */}
        <Handle
          type="target"
          position={Position.Left}
          id="target"
          style={{ 
            left: '0px', 
            top: '50%',
            background: 'transparent', 
            width: '30px', 
            height: '50px', 
            border: 'none',
            zIndex: 100,
            transform: 'translate(-50%, -50%)',
          }}
          className="pointer-events-auto cursor-pointer"
        />
        
        <img 
          src={getIconUrl(data?.icon ?? 'CRM.png')} 
          alt={data?.label}
          className="w-13 h-13 object-contain transition-all group-hover:scale-110 pointer-events-none drop-shadow-2xl filter" 
          style={{ filter: isDark ? 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' : 'drop-shadow(0 4px 15px rgba(0,0,0,0.3)) drop-shadow(0 0 2px white)' }}
        />

        {/* Botón visual del signo (+) Siempre Visible y Forzado con Efecto Over */}
        <div 
          className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full shadow-md flex items-center justify-center z-[110] transition-all transform scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100"
          style={{ 
            background: 'linear-gradient(135deg, #ff851d 0%, #ef375c 100%)',
            pointerEvents: 'none'
          }}
        >
          <Plus size={12} color="white" strokeWidth={4} className="m-auto block" />
        </div>

        {/* Puerto de Salida (Source) - Actúa como zona interactiva (Invisible) */}
        <Handle
          type="source"
          position={Position.Right}
          id="source"
          style={{ 
            right: '-3px', 
            top: '50%',
            background: 'transparent', 
            width: '24px', 
            height: '24px', 
            border: 'none',
            zIndex: 120,
            cursor: 'crosshair',
            transform: 'translateY(-50%)',
            opacity: 0,
            pointerEvents: 'auto'
          }}
          className="react-flow__handle-source !opacity-0"
        />
      </div>

      <div className="text-center" style={{ width: '120px', marginTop: '-3px' }}>
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            autoFocus
            className={`w-full text-[13px] font-black tracking-tight text-center bg-transparent border-b-2 border-orange-500 outline-none ${isDark ? 'text-white' : 'text-[#333333]'}`}
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className={`text-[13px] font-black tracking-tight leading-tight block cursor-text select-none ${isDark ? 'text-white' : 'text-[#333333]'} drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTE DE GRUPO ---
const CustomGroupNode = ({ id, data, selected, isDark }: any) => {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || 'Grupo');
  const currentColor = PASTEL_COLORS.find(c => c.stroke === data?.stroke) || PASTEL_COLORS[0];

  const onColorSelect = (color: typeof PASTEL_COLORS[0]) => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, bg: color.bg, border: color.border, stroke: color.stroke } };
      }
      return node;
    }));
  };

  const onDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => nds.filter((n) => n.id !== id && n.parentId !== id));
  }, [id, setNodes]);

  const onDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => {
      const node = nds.find((n) => n.id === id);
      if (!node) return nds;
      const newId = `group-${Date.now()}`;
      const children = nds.filter(n => n.parentId === id);
      
      const newNodes = [
        ...nds,
        {
          ...node,
          id: newId,
          position: { x: node.position.x + 40, y: node.position.y + 40 },
          zIndex: -1,
        }
      ];

      children.forEach(child => {
        newNodes.push({
          ...child,
          id: `child-${Date.now()}-${Math.random()}`,
          parentId: newId,
        } as any);
      });

      return newNodes;
    });
  }, [id, setNodes]);

  const handleBlur = () => {
    setIsEditing(false);
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, label } };
      }
      return node;
    }));
  };


  return (
    <div 
      className="group relative w-full h-full rounded-[2rem] transition-all duration-300 shadow-sm hover:shadow-md"
      style={{ 
        backgroundColor: `${data?.stroke || currentColor.stroke}70`, // Más opacidad
        borderColor: data?.stroke || currentColor.stroke,
        borderStyle: 'solid',
        borderWidth: '5px' // Borde Ultra grueso
      }}
    >
      {/* Conectores Universales (Entrada/Salida en las 4 caras) */}
      <Handle type="target" position={Position.Left} id="left-target" style={{ background: data?.stroke || currentColor.stroke, borderRadius: '4px', width: '12px', height: '12px', left: '-6px', border: '2px solid white' }} />
      <Handle type="source" position={Position.Left} id="left-source" style={{ background: 'transparent', width: '20px', height: '20px', left: '-10px', top: '50%', transform: 'translateY(-50%)', border: 'none', zIndex: 120 }} />
      
      <Handle type="target" position={Position.Right} id="right-target" style={{ background: data?.stroke || currentColor.stroke, borderRadius: '4px', width: '12px', height: '12px', right: '-6px', border: '2px solid white' }} />
      <Handle type="source" position={Position.Right} id="right-source" style={{ background: 'transparent', width: '20px', height: '20px', right: '-10px', top: '50%', transform: 'translateY(-50%)', border: 'none', zIndex: 120 }} />
      
      <Handle type="target" position={Position.Top} id="top-target" style={{ background: data?.stroke || currentColor.stroke, borderRadius: '4px', width: '12px', height: '12px', top: '-6px', border: '2px solid white' }} />
      <Handle type="source" position={Position.Top} id="top-source" style={{ background: 'transparent', width: '20px', height: '20px', top: '-10px', left: '50%', transform: 'translateX(-50%)', border: 'none', zIndex: 120 }} />
      
      <Handle type="target" position={Position.Bottom} id="bottom-target" style={{ background: data?.stroke || currentColor.stroke, borderRadius: '4px', width: '12px', height: '12px', bottom: '-6px', border: '2px solid white' }} />
      <Handle type="source" position={Position.Bottom} id="bottom-source" style={{ background: 'transparent', width: '20px', height: '20px', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', border: 'none', zIndex: 120 }} />
      
      <NodeResizer 
        color={data?.stroke || currentColor.stroke} 
        isVisible={selected} 
        minHeight={100} 
        lineClassName="!border"
        handleClassName="!w-2.5 !h-2.5 !bg-white !border !rounded-full shadow-sm"
      />

      {/* Controles */}
      <div 
        className="absolute left-0 flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-[110] -top-10 export-hide"
      >
        <div className="flex gap-1 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100">
          {PASTEL_COLORS.map((color, i) => (
            <button
              key={i}
              onClick={() => onColorSelect(color)}
              className="w-3.5 h-3.5 rounded-full border border-black/5 hover:scale-125 transition-transform"
              style={{ backgroundColor: color.stroke }}
            />
          ))}
        </div>

        <button 
          onClick={onDuplicate}
          className="w-[22px] h-[22px] flex items-center justify-center bg-slate-800 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Copy size={10} />
        </button>

        <button 
          onClick={onDelete}
          className="w-[22px] h-[22px] flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <X size={10} />
        </button>
      </div>

      {/* Etiqueta: Exterior alineada a la derecha */}
      <div className="absolute -bottom-6 right-0 w-full text-right px-2">
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            autoFocus
            className="bg-white/50 backdrop-blur-sm border-b border-orange-500 text-[11px] font-black px-2 py-0.5 outline-none text-right min-w-[80px] rounded"
            style={{ color: data.stroke || currentColor.stroke }}
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className="text-[10px] font-black tracking-widest uppercase cursor-text select-none opacity-80"
            style={{ color: data.stroke || currentColor.stroke }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Botones visuales (+) en las caras */}
      {[Position.Right, Position.Left, Position.Top, Position.Bottom].map((pos) => (
        <div 
          key={pos}
          className={`absolute w-5 h-5 rounded-full shadow-lg flex items-center justify-center z-[110] transition-all transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 pointer-events-none`}
          style={{ 
            background: 'linear-gradient(135deg, #ff851d 0%, #ef375c 100%)',
            border: '2px solid white',
            right: pos === Position.Right ? '-12px' : (pos === Position.Left ? 'auto' : 'calc(50% - 10px)'),
            left: pos === Position.Left ? '-12px' : 'auto',
            top: pos === Position.Top ? '-12px' : (pos === Position.Bottom ? 'auto' : 'calc(50% - 10px)'),
            bottom: pos === Position.Bottom ? '-12px' : 'auto',
          }}
        >
          <Plus size={12} color="white" strokeWidth={4} />
        </div>
      ))}
    </div>
  );
};

// --- COMPONENTE DE PRESUPUESTO (ETIQUETA MAGNÉTICA) ---
const BudgetNode = ({ data, id, isDark }: any) => {
  const { setNodes, getNode } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(data?.label || '0');
  
  const selfNode = getNode(id);
  const hasParent = !!selfNode?.parentId;

  const onDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => nds.filter((n) => n.id !== id));
  }, [id, setNodes]);

  const onDuplicate = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => {
      const node = nds.find((n) => n.id === id);
      if (!node) return nds;
      const newId = `budget-${Date.now()}`;
      return [
        ...nds,
        {
          ...node,
          id: newId,
          position: { x: node.position.x + 20, y: node.position.y + 20 },
          data: { ...node.data }
        },
      ];
    });
  }, [id, setNodes]);

  const handleBlur = () => {
    setIsEditing(false);
    // Asegurarse de guardar como número entero
    const cleanAmount = parseInt(amount.replace(/[^0-9]/g, '')) || 0;
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, label: cleanAmount.toString() } };
      }
      return node;
    }));
  };

  return (
    <div className={`relative group flex items-center gap-1 px-3 py-0.5 rounded-full transition-all duration-300 ${data?.isDark ? 'bg-[#10b981]' : 'bg-[#10b981]'} text-white`}>
      
      {!hasParent && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-90 z-[100] pointer-events-auto export-hide">
          <button onClick={onDuplicate} className="w-[22px] h-[22px] bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 border border-white/10"><Copy size={10}/></button>
          <button onClick={onDelete} className="w-[22px] h-[22px] bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 border border-white/10"><X size={10}/></button>
        </div>
      )}

      <span className="text-[10px] font-black opacity-80 leading-none">$</span>
      
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            autoFocus
            className="bg-transparent text-[11px] font-black outline-none w-14 border-b border-white py-0 text-center text-white"
          />
          <span className="text-[9px] font-medium opacity-80 ml-0.5">/día</span>
        </div>
      ) : (
        <span 
          onDoubleClick={() => setIsEditing(true)}
          className="text-[11px] font-bold cursor-text leading-none whitespace-nowrap"
        >
          {parseInt(amount).toLocaleString('es-CL')}<span className="text-[9px] font-medium ml-1 opacity-70">/día</span>
        </span>
      )}
    </div>
  );
};

// --- COMPONENTE DE UNIÓN (JOINT) ---
const JointNode = ({ id }: any) => {
  const { setNodes } = useReactFlow();
  const onDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => nds.filter((n) => n.id !== id));
  }, [id, setNodes]);

  return (
    <div className="group relative w-3 h-3 rounded-full bg-slate-500 border-2 border-white shadow-lg flex items-center justify-center hover:scale-125 transition-all cursor-crosshair">
      {/* Puertos invisibles que cubren todo el nodo para recibir desde cualquier lado */}
      <Handle type="target" position={Position.Left} style={{ background: 'transparent', border: 'none', width: '100%', height: '100%', left: 0, top: 0, transform: 'none', borderRadius: '100%' }} />
      <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none', width: '100%', height: '100%', left: 0, top: 0, transform: 'none', borderRadius: '100%' }} />
      <Handle type="target" position={Position.Bottom} style={{ background: 'transparent', border: 'none', width: '100%', height: '100%', left: 0, top: 0, transform: 'none', borderRadius: '100%' }} />
      <Handle type="source" position={Position.Right} style={{ background: 'transparent', border: 'none', width: '100%', height: '100%', left: 0, top: 0, transform: 'none', borderRadius: '100%' }} />
      
      {/* Botón visual del signo (+) */}
      <div 
        className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md flex items-center justify-center z-[110] transition-all transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, #ff851d 0%, #ef375c 100%)',
          border: '1px solid white'
        }}
      >
        <Plus size={10} color="white" strokeWidth={4} />
      </div>

      <button 
        onClick={onDelete}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-0.5 export-hide"
      >
        <X size={8} />
      </button>
    </div>
  );
};

// --- COLORES DINÁMICOS POR DESTINO ---
const getEdgeColor = (label: string = '') => {
  const l = label.toLowerCase();
  if (l.includes('llamada')) return '#3b82f6'; // Azul
  if (l.includes('crm')) return '#a855f7';     // Morado
  if (l.includes('email')) return '#ef4444';   // Rojo
  if (l.includes('whatsapp')) return '#22c55e'; // Verde
  if (l.includes('mailer')) return '#00ad6a';   // Verde MailerLite
  if (l.includes('messenger')) return '#00b2ff'; // Celeste Messenger
  return '#ff851d';                             // Naranja (Default)
};

// --- CABLE DINÁMICOS (CONNECTION LINE) ---
const CustomConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  const { shape: previewShape, width: previewWidth } = React.useContext(EdgeStyleContext);
  const previewPath =
    previewShape === 'curva'
      ? buildEdgePath('curva', {
          sourceX: fromX,
          sourceY: fromY,
          sourcePosition: Position.Right,
          targetX: toX,
          targetY: toY,
          targetPosition: Position.Left,
        })[0]
      : buildEdgePath(previewShape, {
          sourceX: fromX,
          sourceY: fromY,
          sourcePosition: Position.Right,
          targetX: toX,
          targetY: toY,
          targetPosition: Position.Left,
        })[0];
  return (
    <g>
      <path
        fill="none"
        stroke="#ff851d"
        strokeWidth={Math.max(2, previewWidth * 0.6)}
        d={previewPath}
        className="pointer-events-none"
      />
      <circle 
        cx={toX} 
        cy={toY} 
        fill="#ff851d" 
        r={3} 
        className="pointer-events-none shadow-lg"
      />
    </g>
  );
};

// --- COMPONENTE DE EDGE PERSONALIZADO ---
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  target,
  data,
  selected,
}: EdgeProps) => {
  const { isExporting } = React.useContext(ExportContext);
  const { setEdges, getNode, screenToFlowPosition } = useReactFlow();
  const targetNode = getNode(target);
  const edgeColor = getEdgeColor(targetNode?.data?.label as string);

  const { shape, width } = React.useContext(EdgeStyleContext);
  const [hover, setHover] = React.useState(false);
  const [arrastrando, setArrastrando] = React.useState(false);

  // Ajuste propio de ESTA conexión. Se guarda como valor RELATIVO (un escalar),
  // no como coordenadas: así el retoque sobrevive a mover los nodos, porque la
  // ruta se recalcula y el ajuste se vuelve a aplicar encima.
  const curvatura = typeof (data as any)?.curvatura === 'number' ? (data as any).curvatura : CURVATURA_DEF;
  const desvio = typeof (data as any)?.desvio === 'number' ? (data as any).desvio : DESVIO_DEF;

  const args = { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition };
  const [edgePath, labelX, labelY] = buildEdgePath(shape, args, { curvatura, desvio });

  const guardarAjuste = React.useCallback((patch: Record<string, number>) => {
    setEdges((edges) => edges.map((e) => (e.id === id ? { ...e, data: { ...e.data, ...patch } } : e)));
  }, [id, setEdges]);

  /** Arrastrar un tirador: se proyecta el movimiento sobre la normal del lado
   *  y de ahí sale el escalar. Es la misma matemática que dibuja la curva, así
   *  que el tirador no se puede desincronizar del trazo. */
  const onTiradorDown = (ev: React.PointerEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    setArrastrando(true);
    const base = { x: (sourceX + targetX) / 2, y: (sourceY + targetY) / 2 };
    const n = normalDeLado(sourcePosition);
    const escala = shape === 'curva' ? 46 : 0.42;

    const mover = (e: PointerEvent) => {
      const pf = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      // Se proyecta el arrastre sobre la normal del lado de salida: esa es la
      // misma dirección que separa los puntos de control, así que el trazo
      // responde exactamente a donde está el dedo.
      const proy = (pf.x - base.x) * n.x + (pf.y - base.y) * n.y;
      const v = (proy - 30) / escala;
      if (shape === 'curva') {
        guardarAjuste({ curvatura: Math.max(0, Math.min(2, v)) });
      } else {
        guardarAjuste({ desvio: Math.max(0, Math.min(260, v)) });
      }
    };
    const soltar = () => {
      setArrastrando(false);
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerup', soltar);
    };
    window.addEventListener('pointermove', mover);
    window.addEventListener('pointerup', soltar);
  };

  /** Doble clic sobre un tirador: vuelve al valor por defecto. */
  const onTiradorReset = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    guardarAjuste(shape === 'curva' ? { curvatura: CURVATURA_DEF } : { desvio: DESVIO_DEF });
  };

  // El tirador vive junto al botón de borrar, en el centro de la conexión, y se
  // separa de él en la dirección por la que sale la línea. Esa separación crece
  // con el ajuste, así que el control sigue al dedo mientras se arrastra.
  const anclaTirador = { x: (sourceX + targetX) / 2, y: (sourceY + targetY) / 2 };
  const normalSalida = normalDeLado(sourcePosition);
  const SEP_TIRADOR = 30;
  const ESCALA_TIRADOR = shape === 'curva' ? 46 : 0.42;
  const valorAjuste = shape === 'curva' ? curvatura : desvio;
  const tiradorPos = {
    x: anclaTirador.x + normalSalida.x * (SEP_TIRADOR + valorAjuste * ESCALA_TIRADOR),
    y: anclaTirador.y + normalSalida.y * (SEP_TIRADOR + valorAjuste * ESCALA_TIRADOR),
  };

  const mostrarTiradores = !isExporting && (hover || selected || arrastrando);

  const onEdgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <g className="group cursor-pointer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <path
        id={id}
        style={{ ...style, stroke: edgeColor, strokeWidth: width, fill: 'none' }}
        className="react-flow__edge-path transition-all group-hover:stroke-width-7"
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      <path d={edgePath} fill="none" stroke="transparent" strokeWidth={30} />

      {/* Partícula de flujo (SIEMPRE VISIBLE POR ENCIMA) */}
      <g style={{ isolate: 'auto' }}>
        <circle key={shape + '-' + width} r={Math.max(3.5, width * 0.9)} fill="white" className="drop-shadow-[0_0_8px_rgba(255,255,255,1)] pointer-events-none" style={{ zIndex: 9999 }}>
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      </g>

      {/* Control de curvatura: junto al botón de borrar, en el centro del trazo */}
      {mostrarTiradores && (
        <g className="export-hide">
          <line
            x1={anclaTirador.x}
            y1={anclaTirador.y}
            x2={tiradorPos.x}
            y2={tiradorPos.y}
            stroke={edgeColor}
            strokeWidth={2}
            strokeDasharray="3 3"
            opacity={0.55}
            style={{ pointerEvents: 'none' }}
          />
          <circle
            cx={tiradorPos.x}
            cy={tiradorPos.y}
            r={16}
            fill="transparent"
            style={{ cursor: arrastrando ? 'grabbing' : 'grab' }}
            onPointerDown={onTiradorDown}
            onDoubleClick={onTiradorReset}
          >
            <title>Arrastra para ajustar la curva · doble clic para restablecer</title>
          </circle>
          <circle
            cx={tiradorPos.x}
            cy={tiradorPos.y}
            r={arrastrando ? 11 : 9}
            fill="white"
            stroke={edgeColor}
            strokeWidth={3}
            className="drop-shadow-lg transition-all"
            style={{ pointerEvents: 'none' }}
          />
          <circle
            cx={tiradorPos.x}
            cy={tiradorPos.y}
            r={3}
            fill={edgeColor}
            style={{ pointerEvents: 'none' }}
          />
        </g>
      )}

      {/* Botón de eliminación de borde (SÓLO SI NO ES EXPORTACIÓN) */}
      {!isExporting && (
        <g
          transform={`translate(${labelX}, ${labelY})`}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 export-hide cursor-pointer"
          onClick={onEdgeClick}
        >
          <circle
            r="12"
            fill="#ef4444"
            className="drop-shadow-lg"
          />
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            ×
          </text>
        </g>
      )}
    </g>
  );
};
// --- DEFINICIÓN DE TIPOS (ESTABLES) ---
const NODE_TYPES = { 
  custom: CustomNode,
  groupNode: CustomGroupNode,
  budgetNode: BudgetNode,
  jointNode: JointNode
};

const EDGE_TYPES = { 
  custom: CustomEdge 
};

// --- ERROR BOUNDARY INTERNO ---
class FlowErrorBoundary extends React.Component<{ children: React.ReactNode, isDark: boolean }, { hasError: boolean, error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.toString() };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("CRITICAL FLOW ERROR:", error, errorInfo);
  }

  resetFlow = () => {
    localStorage.removeItem('flow-constructor-nodes-v4');
    localStorage.removeItem('flow-constructor-edges-v4');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={`flex flex-col items-center justify-center w-full h-full p-10 text-center ${this.props.isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
          <div className="p-8 rounded-3xl border-2 border-red-500/20 bg-red-500/5 max-w-md">
            <h2 className="text-2xl font-black mb-4 flex items-center justify-center gap-2">
              <span className="text-red-500">⚠️</span> Error en el Diagrama
            </h2>
            <p className="text-sm opacity-70 mb-6">Se ha detectado un problema en los datos del flujo. Esto puede ocurrir por datos guardados corruptos.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={this.resetFlow}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Limpiar Datos y Reiniciar
              </button>
            </div>
            <div className="mt-6 p-3 bg-black/5 rounded-lg text-[10px] text-left font-mono opacity-50 overflow-auto max-h-24">
              {this.state.error}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function FlowContent({ isDark }: { isDark: boolean }) {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isEdgePanelOpen, setIsEdgePanelOpen] = useState(false);
  const [edgeStyle, setEdgeStyle] = useState(() => {
    try {
      const saved = localStorage.getItem('flow-constructor-edge-style-v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const shape: EdgeShape = ['curva', 'scurva', 'srecta'].includes(parsed?.shape) ? parsed.shape : EDGE_DEFAULTS.shape;
        const width = Number.isFinite(parsed?.width) ? Math.min(12, Math.max(1, parsed.width)) : EDGE_DEFAULTS.width;
        return { shape, width };
      }
    } catch { /* si falla, se usan los valores por defecto */ }
    return EDGE_DEFAULTS;
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('flow-constructor-edge-style-v1', JSON.stringify(edgeStyle));
    } catch { /* modo privado o almacenamiento lleno: no es critico */ }
  }, [edgeStyle]);
  const isLoaded = useRef(false);
  const { screenToFlowPosition, fitView, getNodes, getEdges } = useReactFlow();
  const canvasRef = useRef<HTMLDivElement>(null);

  // --- CARGA INICIAL (PROTEGIDA CON REF) ---
  React.useEffect(() => {
    if (isLoaded.current) return;
    isLoaded.current = true;

    const savedNodes = localStorage.getItem('flow-constructor-nodes-v4');
    const savedEdges = localStorage.getItem('flow-constructor-edges-v4');
    const savedViewport = localStorage.getItem('flow-constructor-viewport-v4');
    
    try {
      if (savedNodes && savedEdges) {
        const parsedNodes = JSON.parse(savedNodes);
        const parsedEdges = JSON.parse(savedEdges);
        if (Array.isArray(parsedNodes)) {
          setNodes(parsedNodes);
          setEdges(parsedEdges || []);
          
          if (savedViewport) {
            const viewport = JSON.parse(savedViewport);
            const flowContainer = document.querySelector('.react-flow') as HTMLElement;
            if (flowContainer) {
              // Restauramos el zoom y posición guardados
              setTimeout(() => {
                const { setViewport } = (window as any).reactFlowInstance || {};
                if (setViewport) setViewport(viewport);
              }, 100);
            }
          }
          return;
        }
      }
    } catch (e) {
      console.error("Error loading saved flow:", e);
    }
    
    // Carga inicial por defecto
    setNodes(INITIAL_NODES as any);
    setEdges(INITIAL_EDGES as any);
    setTimeout(() => fitView({ padding: 100 }), 100);
  }, [setNodes, setEdges, fitView]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds)),
    [setEdges]
  );

  // --- GUARDADO AUTOMÁTICO ---
  const { getViewport } = useReactFlow();
  React.useEffect(() => {
    if (isLoaded.current && nodes.length > 0) {
      localStorage.setItem('flow-constructor-nodes-v4', JSON.stringify(nodes));
      localStorage.setItem('flow-constructor-edges-v4', JSON.stringify(edges));
      localStorage.setItem('flow-constructor-viewport-v4', JSON.stringify(getViewport()));
    }
  }, [nodes, edges, getViewport]);

  const onSave = useCallback(() => {
    localStorage.setItem('flow-constructor-nodes-v4', JSON.stringify(getNodes()));
    localStorage.setItem('flow-constructor-edges-v4', JSON.stringify(getEdges()));
  }, [getNodes, getEdges]);

  const onExport = useCallback((format: 'jpg' | 'pdf') => {
    // Activar modo exportación para limpiar UI
    setIsExporting(true);
    setIsSidebarOpen(false);
    
    // Deseleccionar todo para evitar marcos de selección
    setNodes((nds) => nds.map(n => ({ ...n, selected: false })));
    setEdges((eds) => eds.map(e => ({ ...e, selected: false })));
    
    // Usamos el canvasRef que abarca ReactFlow + Logo + Presupuesto
    const element = canvasRef.current;
    if (!element) return;

    element.classList.add('is-exporting');
    
    // Ajustar vista del diagrama
    fitView({ padding: 0.1 });

    // Tiempo para que React Flow se estabilice tras el fitView
    setTimeout(() => {
      const options = {
        backgroundColor: isDark ? '#0d0d0d' : '#ffffff',
        quality: 1,
        style: {
          borderRadius: '0',
        },
        // Filtramos elementos que tengan la clase export-hide
        filter: (node: HTMLElement) => {
          const exclusionClasses = ['export-hide', 'react-flow__controls', 'react-flow__attribution', 'react-flow__panel'];
          const hasExclusion = exclusionClasses.some(className => {
            const cls = (node.className && typeof node.className === 'string') ? node.className : '';
            return exclusionClasses.some(ex => cls.includes(ex));
          });
          return !hasExclusion;
        }
      };

      toJpeg(element, options)
        .then((dataUrl) => {
          if (format === 'jpg') {
            const link = document.createElement('a');
            link.download = `plan-estrategico-${isDark ? 'dark' : 'light'}-${Date.now()}.jpg`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            // PDF: Nueva ventana con la imagen ocupando todo el espacio para impresión limpia
            const printWin = window.open('', '_blank');
            if (printWin) {
              printWin.document.write(`
                <html>
                  <head>
                    <title>Plan Comercial B2B - AvanzaSmart</title>
                    <style>
                      @page { size: landscape; margin: 0; }
                      body { margin: 0; display: flex; justify-content: center; align-items: center; background: ${isDark ? '#0d0d0d' : '#fff'}; height: 100vh; }
                      img { max-width: 100%; max-height: 100%; object-fit: contain; }
                    </style>
                  </head>
                  <body>
                    <img src="${dataUrl}" onload="window.print();setTimeout(() => window.close(), 500);" />
                  </body>
                </html>
              `);
              printWin.document.close();
            }
          }
        })
        .catch((err) => {
          console.error('Error en exportación:', err);
          alert('No se pudo generar el archivo. Por favor intente nuevamente.');
        })
        .finally(() => {
          element.classList.remove('is-exporting');
          setIsExporting(false); // Desactivar modo exportación
        });
    }, 1500); // Un poco más de tiempo para estar seguros
  }, [fitView, setNodes, setEdges, isDark]);

  const onAddNode = useCallback((icon: any) => {
    // Calculamos el centro de la pantalla en coordenadas de Flow
    const flowContainer = document.querySelector('.react-flow') as HTMLElement;
    const rect = flowContainer.getBoundingClientRect();
    const position = screenToFlowPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    const nodeId = `node-${Date.now()}`;
    if (icon.type === 'group') {
      const color = PASTEL_COLORS[0];
      setNodes((nds) => nds.concat({
        id: `group-${Date.now()}`,
        type: 'groupNode',
        position,
        style: { width: 300, height: 200 },
        data: { label: 'Nuevo Grupo', ...color },
        zIndex: -1,
      }));
    } else if (icon.type === 'budget') {
      setNodes((nds) => nds.concat({
        id: `budget-${Date.now()}`,
        type: 'budgetNode',
        position,
        data: { label: '0' },
      }));
    } else {
      setNodes((nds) => nds.concat({
        id: nodeId,
        type: 'custom',
        position,
        data: { label: icon.name, icon: icon.file, isDark },
      }));
    }
  }, [screenToFlowPosition, setNodes, isDark]);

  const onNodeDragStop = useCallback((_: any, node: Node) => {
    if (node.type === 'budgetNode') {
      const currentNodes = getNodes();
      const potentialParents = currentNodes.filter(n => n.id !== node.id && (n.type === 'custom' || n.type === 'groupNode'));
      let nearestParent = null;
      let minDist = 70;

      let nodeAbsX = node.position.x;
      let nodeAbsY = node.position.y;
      
      if (node.parentId) {
        const currentParent = currentNodes.find(n => n.id === node.parentId);
        if (currentParent) {
          nodeAbsX += currentParent.position.x;
          nodeAbsY += currentParent.position.y;
        }
      }

      for (const parent of potentialParents) {
        const parentAbsX = parent.position.x;
        const parentAbsY = parent.position.y;
        
        const dx = nodeAbsX - parentAbsX;
        const dy = nodeAbsY - parentAbsY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDist) {
          minDist = dist;
          nearestParent = parent;
        }
      }

      if (nearestParent && node.parentId !== nearestParent.id) {
        setNodes((nds) => nds.map((n) => {
          if (n.id === node.id) {
            const parentWidth = nearestParent.measured?.width || (nearestParent.type === 'custom' ? 60 : 180);
            const offsetX = (parentWidth / 2) - 40; 

            return {
              ...n,
              parentId: nearestParent.id,
              position: { x: offsetX, y: -26 }, 
              zIndex: 1000,
            };
          }
          return n;
        }));
      } else if (node.parentId) {
        // Lógica de desapego si se arrastra lejos
        const parent = currentNodes.find(p => p.id === node.parentId);
        if (parent) {
          const dx = node.position.x - ((parent.measured?.width || (parent.type === 'custom' ? 60 : 180)) / 2 - 40);
          const dy = node.position.y - (-26);
          const distFromSnap = Math.sqrt(dx*dx + dy*dy);

          if (distFromSnap > 100) { 
            setNodes((nds) => nds.map((n) => {
              if (n.id === node.id) {
                return {
                  ...n,
                  parentId: undefined,
                  position: { 
                    x: parent.position.x + node.position.x, 
                    y: parent.position.y + node.position.y 
                  },
                  zIndex: 100
                };
              }
              return n;
            }));
          }
        }
      }
    }
  }, [setNodes, getNodes]);

  const onNodeDrag = useCallback((_: any, node: Node) => {
    // Ya no realizamos actualizaciones de estado aquí para evitar errores de renderizado
    // El acople magnético se procesa al soltar el nodo (onNodeDragStop)
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    // Añadimos feedback visual al contenedor al pasar por encima
    if (canvasRef.current) {
      canvasRef.current.style.backgroundColor = isDark ? '#1a1a1a' : '#f8f8f8';
      canvasRef.current.style.transition = 'background-color 0.2s ease';
    }
  }, [isDark]);

  const onDragLeave = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.style.backgroundColor = isDark ? '#0d0d0d' : '#ffffff';
    }
  }, [isDark]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      // Restauramos el fondo del lienzo
      if (canvasRef.current) {
        canvasRef.current.style.backgroundColor = isDark ? '#0d0d0d' : '#ffffff';
      }

      const dataStr = event.dataTransfer.getData('application/reactflow');
      if (!dataStr) return;
      
      const icon = JSON.parse(dataStr);
      
      // Cálculo de posición ultra-preciso
      const reactFlowBounds = canvasRef.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // LÓGICA DE REEMPLAZO: Detectar si se soltó sobre un nodo existente
      const targetNode = getNodes().find((node) => {
        const nodeWidth = 60; // Ancho estimado del nodo custom
        const nodeHeight = 60;
        return (
          position.x >= node.position.x &&
          position.x <= node.position.x + nodeWidth &&
          position.y >= node.position.y &&
          position.y <= node.position.y + nodeHeight &&
          node.type === 'custom'
        );
      });

      if (targetNode && icon.file) {
        // Reemplazar el icono y el label del nodo existente
        setNodes((nds) => nds.map((n) => {
          if (n.id === targetNode.id) {
            return {
              ...n,
              data: { ...n.data, icon: icon.file, label: icon.name }
            };
          }
          return n;
        }));
        return;
      }

      if (icon.type === 'group') {
        const color = PASTEL_COLORS[0];
        setNodes((nds) => nds.concat({
          id: `group-${Date.now()}`,
          type: 'groupNode',
          position,
          style: { width: 300, height: 200 },
          data: { label: 'Nuevo Grupo', ...color },
          zIndex: -1,
        }));
      } else if (icon.type === 'budget') {
        setNodes((nds) => nds.concat({
          id: `budget-${Date.now()}`,
          type: 'budgetNode',
          position,
          data: { label: '0' },
        }));
      } else if (icon.type === 'joint') {
        setNodes((nds) => nds.concat({
          id: `joint-${Date.now()}`,
          type: 'jointNode',
          position,
          data: {},
        }));
      } else {
        setNodes((nds) => nds.concat({
          id: `node-${Date.now()}`,
          type: 'custom',
          position,
          data: { label: icon.name, icon: icon.file, isDark },
        }));
      }
    },
    [screenToFlowPosition, setNodes, getNodes, isDark]
  );

  return (
    <ExportContext.Provider value={{ isExporting }}>
      <EdgeStyleContext.Provider value={edgeStyle}>
      <div className="w-full h-full flex overflow-hidden">
      <div ref={canvasRef} className="flex-1 relative h-full order-1 bg-white">
        {/* Logo de Agencia - Solo visible en Exportación */}
        <div className="absolute top-8 right-8 z-[200] export-only">
          <img src={isDark ? logoHorizontalDark : logoHorizontalLight} alt="AvanzaSmart" className="h-12 md:h-16 object-contain drop-shadow-sm" />
        </div>

        {/* Dashboard de Presupuesto Mensual */}
      <div className={`absolute top-8 left-8 z-[200] ${isExporting ? (isDark ? 'bg-black border-white/20' : 'bg-white border-gray-200') : (isDark ? 'bg-black/80 backdrop-blur-md border-white/10' : 'bg-white/95 backdrop-blur-md border-gray-100')} p-4 rounded-2xl shadow-xl border flex flex-col gap-1 min-w-[200px]`}>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-800'}`}>Inversión Estimada</span>
        <div className="flex flex-col">
          <span className={`text-2xl font-black tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ${(nodes.filter(n => n.type === 'budgetNode')
                 .reduce((acc, n) => {
                   const val = parseInt(n?.data?.label || '0');
                   return acc + (isNaN(val) ? 0 : val);
                 }, 0) * 30.4)
                 .toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
          <span className={`text-[11px] font-bold mt-[-2px] ${isDark ? 'text-white/60' : 'text-slate-700'}`} style={{ opacity: 1, visibility: 'visible', display: 'flex', gap: '4px' }}>
            AL MES <span style={{ color: isDark ? '#888' : '#666', fontWeight: 900 }}>+ IVA</span>
          </span>
        </div>
        <div className={`mt-2 h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
          <div className="h-full bg-green-500 w-[60%]" />
        </div>
      </div>

      {/* Botón de Exportación - Movidos abajo para no tapar el panel */}
      <div className="absolute bottom-8 right-8 z-[200] flex gap-2 export-hide">
        <button 
          onClick={() => onExport('jpg')}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-xl shadow-xl hover:bg-slate-900 transition-all hover:scale-105 font-bold text-sm"
        >
          <Download size={16} />
          JPG
        </button>
        <button 
          onClick={() => onExport('pdf')}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl shadow-xl hover:bg-red-700 transition-all hover:scale-105 font-bold text-sm"
        >
          <FileText size={16} />
          PDF
        </button>
      </div>

          <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        onInit={(instance) => {
          (window as any).reactFlowInstance = instance;
        }}
        connectionLineComponent={CustomConnectionLine}
        connectionMode={ConnectionMode.Loose}
        colorMode={isDark ? 'dark' : 'light'}
        defaultEdgeOptions={{
          type: 'custom',
          style: { strokeWidth: 2.5, stroke: '#ff851d' },
        }}
        snapToGrid={true}
        snapGrid={[10, 10]}
        selectionKeyCode="Control"
        elevateNodesOnSelect={false}
        className="bg-transparent"
        minZoom={0.2}
        maxZoom={2}
      >
        <Background color={isDark ? '#ff851d' : '#94a3b8'} variant="grid" style={{ opacity: 0.05 }} gap={25} />
        <Controls position="bottom-left" className="!bg-white !shadow-2xl !border-none !rounded-xl overflow-hidden mb-8 ml-8 export-hide" />
          
          <Panel position="top-right" className="z-[110] flex flex-col items-end gap-3 export-hide">
             <div className="flex gap-2">
               <button
                 onClick={() => setIsEdgePanelOpen((v) => !v)}
                 title="Configurar las conexiones"
                 className={`p-3 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-tighter ${isEdgePanelOpen ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
               >
                 <Settings2 size={20} />
                 <span>Conexiones</span>
               </button>
               {!isSidebarOpen && (
                 <button onClick={() => setIsSidebarOpen(true)} className="p-3 rounded-2xl bg-orange-500 text-white shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-tighter">
                   <Menu size={20}/>
                   <span>Herramientas</span>
                 </button>
               )}
             </div>

             <AnimatePresence>
               {isEdgePanelOpen && (
                 <motion.div
                   initial={{ opacity: 0, y: -8, scale: 0.96 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -8, scale: 0.96 }}
                   transition={{ duration: 0.18 }}
                   className="w-72 p-4 rounded-2xl bg-white shadow-2xl border border-slate-200 flex flex-col gap-4"
                 >
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">Forma del camino</p>
                     <div className="grid grid-cols-3 gap-2">
                       {([
                         { id: 'curva' as EdgeShape, label: 'Curva', Icon: Spline },
                         { id: 'scurva' as EdgeShape, label: 'S curva', Icon: Waypoints },
                         { id: 'srecta' as EdgeShape, label: 'S recta', Icon: CornerDownRight },
                       ]).map(({ id, label, Icon }) => {
                         const on = edgeStyle.shape === id;
                         return (
                           <button
                             key={id}
                             onClick={() => setEdgeStyle((prev) => ({ ...prev, shape: id }))}
                             className={`py-2.5 px-1 rounded-xl flex flex-col items-center gap-1 transition-all ${on ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                           >
                             <Icon size={18} />
                             <span className="text-[10px] font-bold">{label}</span>
                           </button>
                         );
                       })}
                     </div>
                     <p className="text-[11px] leading-snug text-slate-400 mt-2">
                       {edgeStyle.shape === 'curva' && 'Trazo libre entre los nodos.'}
                       {edgeStyle.shape === 'scurva' && 'Tramos rectos con las esquinas redondeadas.'}
                       {edgeStyle.shape === 'srecta' && 'Tramos rectos con las esquinas en angulo.'}
                     </p>
                   </div>

                   <div>
                     <div className="flex items-center justify-between mb-1.5">
                       <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Grosor de la linea</p>
                       <span className="text-xs font-black text-orange-500">{edgeStyle.width} px</span>
                     </div>
                     <input
                       type="range"
                       min={1}
                       max={12}
                       step={0.5}
                       value={edgeStyle.width}
                       onChange={(e) => setEdgeStyle((prev) => ({ ...prev, width: Number(e.target.value) }))}
                       className="w-full accent-orange-500"
                       aria-label="Grosor de las conexiones"
                     />
                     <svg viewBox="0 0 240 24" className="w-full h-5 mt-1" aria-hidden="true">
                       <path d="M4 12 C 70 12, 90 12, 120 12 S 180 12, 236 12" fill="none" stroke="#ff851d" strokeWidth={edgeStyle.width} strokeLinecap="round" />
                     </svg>
                   </div>

                   <button
                     onClick={() => setEdgeStyle(EDGE_DEFAULTS)}
                     className="text-[11px] font-bold text-slate-400 hover:text-slate-700 transition-colors self-start"
                   >
                     Restablecer
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </Panel>
        </ReactFlow>
      </div>

      {/* Sidebar de Iconos - Movido a la derecha */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 250, opacity: 0 }}
            className={`h-full z-[100] order-2 flex flex-col border-l shadow-2xl ${isDark ? 'bg-[#000000] border-white/5' : 'bg-white border-gray-100'}`}
            style={{ width: 110 }}
          >
            <div className="p-4 flex flex-col items-center gap-4 shrink-0 border-b border-gray-50">
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-white/50' : 'hover:bg-red-50 text-red-500'}`}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-4 custom-scrollbar">
              {/* Opción de Grupo */}
              <div
                key="group-tool"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'group' }));
                  e.dataTransfer.effectAllowed = 'move';
                  
                  // Crear una imagen de arrastre de tamaño exacto
                  const img = new Image();
                  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='36' height='36' x='2' y='2' rx='8' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-dasharray='4'/%3E%3C/svg%3E";
                  e.dataTransfer.setDragImage(img, 20, 20);

                  // Ocultar el elemento original de la "vitrina"
                  const target = e.currentTarget as HTMLElement;
                  setTimeout(() => { target.style.opacity = '0'; }, 0);
                }}
                onDragEnd={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = '1';
                }}
                onClick={() => onAddNode({ type: 'group' })}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-grab active:cursor-grabbing ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 rounded-xl border border-dashed border-slate-300 flex items-center justify-center">
                   <Maximize2 size={16} className="text-slate-400" />
                </div>
                <span className="text-[8px] font-black uppercase text-center text-slate-500">Grupo</span>
              </div>

              {/* Opción de Presupuesto */}
              <div
                draggable
                onDragStart={(e) => e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'budget' }))}
                onClick={() => onAddNode({ type: 'budget' })}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-grab active:cursor-grabbing ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                   <Zap size={16} className="text-green-600" />
                </div>
                <span className="text-[8px] font-black uppercase text-center text-green-700">Presup</span>
              </div>

              {/* Opción de Unión (Nodo) */}
              <div
                draggable
                onDragStart={(e) => e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'joint' }))}
                onClick={() => onAddNode({ type: 'joint' })}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-grab active:cursor-grabbing ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-slate-300 border-dotted">
                   <div className="w-2 h-2 rounded-full bg-slate-400" />
                </div>
                <span className="text-[8px] font-black uppercase text-center text-slate-500">Unión</span>
              </div>

              <div className="h-px bg-gray-100 my-1 mx-2" />

              {AVAILABLE_ICONS.map((icon, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/reactflow', JSON.stringify(icon));
                    e.dataTransfer.effectAllowed = 'move';
                    
                    // Configuramos la imagen de arrastre para que sea EXACTAMENTE el icono pequeño
                    // Usamos el mismo elemento que se está dragueando para mantener el estilo
                    const target = e.currentTarget as HTMLElement;
                    e.dataTransfer.setDragImage(target, 20, 20);

                    // Lo "quitamos" de la vitrina visualmente después de capturar la imagen de arrastre
                    setTimeout(() => { target.style.opacity = '0'; }, 0);
                  }}
                  onDragEnd={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                  }}
                  onClick={() => onAddNode(icon)}
                  className={`flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                >
                  <img src={getIconUrl(icon.file)} alt="" className="w-10 h-10 object-contain" />
                  <span className={`text-[9px] font-black text-center leading-none ${isDark ? 'text-white/60' : 'text-gray-900 !text-gray-900'}`}>{icon.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .react-flow__handle-source {
          background: #ff851d !important;
          opacity: 1 !important;
        }
        .react-flow__connection-path {
          stroke: #ff851d;
          stroke-width: 3;
          stroke-dasharray: 5, 5;
          animation: dashdraw 0.5s linear infinite;
        }
        @keyframes dashdraw {
          from { stroke-dashoffset: 10; }
          to { stroke-dashoffset: 0; }
        }
        .export-only {
          display: none !important;
        }
        .is-exporting .export-only {
          display: block !important;
        }
        .is-exporting .export-hide,
        .is-exporting .react-flow__handle,
        .is-exporting .react-flow__node-resizer,
        .is-exporting .react-flow__selection,
        .is-exporting .react-flow__nodesselection-rect,
        .is-exporting .react-flow__edge-path-selector,
        .is-exporting .react-flow__edge-path-selector + g,
        .is-exporting button,
        .is-exporting .group button,
        .is-exporting .react-flow__controls,
        .is-exporting .react-flow__attribution,
        .is-exporting .react-flow__minimap,
        .is-exporting .react-flow__panel,
        .is-exporting g[onClick],
        .is-exporting g.cursor-pointer g {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        /* Específico para los botones × en los cables */
        .is-exporting g.export-hide {
          display: none !important;
        }
        .is-exporting .react-flow__background {
          opacity: 0 !important;
        }
        @media print {
          .export-hide, 
          .react-flow__handle,
          .react-flow__handle-source,
          .react-flow__handle-target,
          .react-flow__controls,
          .react-flow__attribution,
          .react-flow__minimap,
          .react-flow__panel {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(155, 155, 155, 0.2); border-radius: 10px; }
      `}</style>
    </div>
      </EdgeStyleContext.Provider>
    </ExportContext.Provider>
  );
}

export default function SlideFlowConstructor({ isDark }: { isDark: boolean }) {
  return (
    <div 
      key="slide-flow-constructor"
      className={`relative w-full h-[600px] md:h-full rounded-[3rem] overflow-hidden ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#ffffff]'}`}
      style={{
        boxShadow: isDark 
          ? 'inset 0 10px 40px rgba(0,0,0,0.8), inset 0 -10px 40px rgba(0,0,0,0.8)'
          : 'inset 0 10px 40px rgba(0,0,0,0.15), inset 0 -10px 40px rgba(0,0,0,0.15)'
      }}
    >
      <ReactFlowProvider>
        <FlowErrorBoundary isDark={isDark}>
          <FlowContent isDark={isDark} />
        </FlowErrorBoundary>
      </ReactFlowProvider>
    </div>
  );
}
