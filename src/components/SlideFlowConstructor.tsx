import React, { useCallback, useState } from 'react';
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
  EdgeProps,
  ConnectionMode,
  ConnectionLineComponentProps,
  NodeResizer,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Copy, Minimize2, Maximize2, X, ChevronRight, Download, Zap, Play, Save, Menu, Maximize, FileText } from 'lucide-react';
import { toJpeg } from 'html-to-image';

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
  { name: 'Blue', bg: '#eff6ff', border: '#dbeafe', stroke: '#3b82f6' },
  { name: 'Green', bg: '#f0fdf4', border: '#dcfce7', stroke: '#22c55e' },
  { name: 'Gray', bg: '#f9fafb', border: '#f3f4f6', stroke: '#94a3b8' },
];

const getIconUrl = (file: string) => {
  return new URL(`../icons/${file}`, import.meta.url).href;
};

// --- COMPONENTE DE NODO PERSONALIZADO ---
// Se eliminaron marcos blancos y sombras. El puerto de salida es el signo (+).
const CustomNode = ({ data, id }: any) => {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

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

  // Detectar si este nodo tiene un presupuesto como hijo para elevar los controles
  const nodes = useReactFlow().getNodes();
  const hasBudgetChild = nodes.some(n => n.parentId === id);

  return (
    <div className="relative group flex flex-col items-center">
      {/* Controles rápidos: Suben si hay un presupuesto pegado */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 z-[110] pointer-events-auto`}
        style={{ top: hasBudgetChild ? '-60px' : '-40px' }}
      >
        <button onClick={onDuplicate} title="Duplicar" className="p-1 w-[22px] h-[22px] bg-slate-800 text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center border border-white/10">
          <Copy size={10} />
        </button>
        <button onClick={onDelete} title="Eliminar" className="p-1 w-[22px] h-[22px] bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center border border-white/10">
          <X size={10} />
        </button>
      </div>

      <div className="relative flex items-center justify-center bg-transparent" style={{ width: '60px', height: '60px' }}>
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
          src={getIconUrl(data.icon ?? 'CRM.png')} 
          alt={data.label}
          className="w-12 h-12 object-contain transition-all group-hover:scale-110 pointer-events-none drop-shadow-sm" 
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
            className={`w-full text-[12px] font-black tracking-tight text-center bg-transparent border-b-2 border-orange-500 outline-none ${data.isDark ? 'text-white' : 'text-gray-900'}`}
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className={`text-[12px] font-black tracking-tight leading-tight block cursor-text select-none ${data.isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTE DE GRUPO ---
const CustomGroupNode = ({ id, data, selected }: any) => {
  const { setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Grupo');
  const currentColor = PASTEL_COLORS.find(c => c.stroke === data.stroke) || PASTEL_COLORS[0];

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

  const nodesList = useReactFlow().getNodes();
  const hasBudgetChild = nodesList.some(n => n.parentId === id);

  return (
    <div 
      className="group relative w-full h-full rounded-[2rem] transition-all duration-300"
      style={{ 
        backgroundColor: data.bg || currentColor.bg, 
        borderColor: data.stroke || currentColor.stroke,
        borderStyle: 'solid',
        borderWidth: '1px'
      }}
    >
      <NodeResizer 
        color={data.stroke || currentColor.stroke} 
        isVisible={selected} 
        minWidth={100} 
        minHeight={100} 
        lineClassName="!border"
        handleClassName="!w-2.5 !h-2.5 !bg-white !border !rounded-full shadow-sm"
      />

      {/* Controles: Suben si hay un presupuesto pegado */}
      <div 
        className="absolute left-0 flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-[110]"
        style={{ top: hasBudgetChild ? '-50px' : '-40px' }}
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

      {/* Etiqueta: Abajo, sin fondo */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center">
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            autoFocus
            className="bg-transparent border-b border-orange-500 text-[11px] font-black px-2 py-0.5 outline-none text-center min-w-[80px]"
            style={{ color: data.stroke || currentColor.stroke }}
          />
        ) : (
          <span 
            onDoubleClick={() => setIsEditing(true)}
            className="text-[10px] font-black tracking-widest uppercase cursor-text select-none"
            style={{ color: data.stroke || currentColor.stroke }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTE DE PRESUPUESTO (ETIQUETA MAGNÉTICA) ---
const BudgetNode = ({ data, id }: any) => {
  const { setNodes, getNode } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(data.label || '0');
  
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
    <div className={`relative group flex items-center gap-1 px-3 py-0.5 rounded-full transition-all duration-300 ${data.isDark ? 'bg-[#10b981]' : 'bg-[#10b981]'} text-white`}>
      
      {!hasParent && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-90 z-[100] pointer-events-auto">
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

// --- COLORES DINÁMICOS POR DESTINO ---
const getEdgeColor = (label: string = '') => {
  const l = label.toLowerCase();
  if (l.includes('llamada')) return '#3b82f6'; // Azul
  if (l.includes('crm')) return '#a855f7';     // Morado
  if (l.includes('email')) return '#ef4444';   // Rojo
  if (l.includes('whatsapp')) return '#22c55e'; // Verde
  return '#ff851d';                             // Naranja (Default)
};

// --- CABLE DINÁMICOS (CONNECTION LINE) ---
const CustomConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  return (
    <g>
      <path
        fill="none"
        stroke="#ff851d"
        strokeWidth={2.5}
        d={`M${fromX},${fromY} C${fromX + 40},${fromY} ${toX - 40},${toY} ${toX},${toY}`}
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
}: EdgeProps) => {
  const { setEdges, getNode } = useReactFlow();
  const targetNode = getNode(target);
  const edgeColor = getEdgeColor(targetNode?.data?.label as string);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <g className="group cursor-pointer">
      <path
        id={id}
        style={{ ...style, stroke: edgeColor, strokeWidth: 2.5, fill: 'none' }}
        className="react-flow__edge-path transition-all group-hover:stroke-width-4"
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      {/* Invisible wider path for easier hovering/clicking */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={30}
      />

      <circle r="4" fill="white" className="drop-shadow-md pointer-events-none shadow-sm">
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>

      <foreignObject
        width={40}
        height={40}
        x={labelX - 20}
        y={labelY - 20}
        className="opacity-0 group-hover:opacity-100 transition-all duration-200"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="w-full h-full flex items-center justify-center">
          <button 
            onClick={onEdgeClick}
            className="p-2 transition-all duration-200 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-125 active:scale-95"
            title="Eliminar enlace"
          >
            <X size={16} />
          </button>
        </div>
      </foreignObject>
    </g>
  );
};

const nodeTypes = { 
  custom: CustomNode,
  groupNode: CustomGroupNode,
  budgetNode: BudgetNode 
};
const edgeTypes = { custom: CustomEdge };

function FlowContent({ isDark }: { isDark: boolean }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { screenToFlowPosition, fitView, getNodes } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds)),
    [setEdges]
  );

  const onExport = useCallback((format: 'jpg' | 'pdf') => {
    const rfElement = document.querySelector('.react-flow') as HTMLElement;
    if (rfElement) {
      rfElement.classList.add('is-exporting');
      
      setTimeout(() => {
        const options = {
          backgroundColor: isDark ? '#0d0d0d' : '#f8f9fa',
          quality: 0.95,
        };

        if (format === 'jpg') {
          toJpeg(rfElement, options).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'flow-diagram.jpg';
            link.href = dataUrl;
            link.click();
            rfElement.classList.remove('is-exporting');
          }).catch(() => rfElement.classList.remove('is-exporting'));
        } else {
          // Usamos toPdf si está disponible en la librería, de lo contrario imprimimos
          window.print(); 
          rfElement.classList.remove('is-exporting');
        }
      }, 100);
    }
  }, [isDark]);

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
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const dataStr = event.dataTransfer.getData('application/reactflow');
      if (!dataStr) return;
      
      const icon = JSON.parse(dataStr);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

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
          id: `node-${Date.now()}`,
          type: 'custom',
          position,
          data: { label: icon.name, icon: icon.file, isDark },
        }));
      }
    },
    [screenToFlowPosition, setNodes, isDark]
  );

  return (
    <div className="w-full h-full flex overflow-hidden">
      {/* Sidebar de Iconos */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            className={`h-full z-[100] flex flex-col border-r ${isDark ? 'bg-[#0d0d0d] border-white/5' : 'bg-white border-gray-100'}`}
            style={{ width: 160 }}
          >
            <div className="p-5 flex justify-between items-center shrink-0">
              <h3 className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Herramientas</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1.5 hover:bg-black/5 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              {/* Opción de Grupo */}
              <div
                draggable
                onDragStart={(e) => e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'group' }))}
                onClick={() => onAddNode({ type: 'group' })}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-grab active:cursor-grabbing ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                   <Maximize2 size={18} className="text-slate-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nuevo Grupo</span>
              </div>

              {/* Opción de Presupuesto */}
              <div
                draggable
                onDragStart={(e) => e.dataTransfer.setData('application/reactflow', JSON.stringify({ type: 'budget' }))}
                onClick={() => onAddNode({ type: 'budget' })}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-grab active:cursor-grabbing ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                   <Zap size={18} className="text-green-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Presupuesto</span>
              </div>

              <div className="h-px bg-gray-100 my-2" />

              {AVAILABLE_ICONS.map((icon, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', JSON.stringify(icon))}
                  onClick={() => onAddNode(icon)}
                  className={`flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing p-3 rounded-2xl transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                >
                  <img src={getIconUrl(icon.file)} alt="" className="w-12 h-12 object-contain" />
                  <span className="text-[10px] font-bold opacity-60 text-center">{icon.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative h-full">
        {/* Dashboard de Presupuesto Mensual */}
      <div className="absolute top-8 left-8 z-[200] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-1 min-w-[200px]">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inversión Estimada</span>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-slate-800 tabular-nums">
            ${(nodes.filter(n => n.type === 'budgetNode')
                 .reduce((acc, n) => acc + (parseInt(n.data.label) || 0), 0) * 30.4)
                 .toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
          <span className="text-[11px] font-bold text-slate-500 mt-[-2px]">
            AL MES <span className="opacity-60">+ IVA</span>
          </span>
        </div>
        <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-[60%]" />
        </div>
      </div>

      {/* Botón de Exportación - Movidos abajo para no tapar el panel */}
      <div className="absolute bottom-8 right-8 z-[200] flex gap-2">
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
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionLineComponent={CustomConnectionLine}
          connectionMode={ConnectionMode.Loose}
          colorMode={isDark ? 'dark' : 'light'}
          defaultEdgeOptions={{
            type: 'custom',
            style: { strokeWidth: 2.5, stroke: '#ff851d' },
          }}
          snapToGrid={true}
          snapGrid={[10, 10]}
          fitView
          selectionKeyCode="Control"
          elevateNodesOnSelect={false}
          className="bg-transparent"
          minZoom={0.2}
          maxZoom={2}
        >
          <Background color={isDark ? '#ff851d' : '#94a3b8'} variant="grid" style={{ opacity: 0.05 }} gap={25} />
          <Controls className="!bg-white !shadow-2xl !border-none !rounded-xl overflow-hidden" />
          
          <Panel position="top-right" className="z-[110]">
             <div className="flex gap-2">
               {!isSidebarOpen && (
                 <button onClick={() => setIsSidebarOpen(true)} className="p-3 rounded-2xl bg-orange-500 text-white shadow-xl hover:scale-105 transition-all"><Menu size={24}/></button>
               )}
               <div className={`flex items-center gap-2 p-2 rounded-2xl shadow-xl backdrop-blur-md border ${isDark ? 'bg-black/50 text-orange-500 border-white/10' : 'bg-white/90 text-orange-600 border-gray-100'}`}>
                 <Zap size={14} className="ml-2" />
                 <span className="text-[11px] font-black mr-3 tracking-widest leading-none">FLOW BUILDER</span>
                 <div className="flex gap-1 pr-1">
                    <button onClick={() => fitView()} className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"><Maximize size={16}/></button>
                    <button className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"><Save size={16}/></button>
                 </div>
               </div>
             </div>
          </Panel>
        </ReactFlow>
      </div>

      <style>{`
        .react-flow__handle-source {
          background: #ff851d !important;
          opacity: 1 !important;
        }
        .is-exporting .opacity-0 {
          opacity: 1 !important;
        }
        .is-exporting .group-hover\:opacity-100 {
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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(155, 155, 155, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default function SlideFlowConstructor({ isDark }: { isDark: boolean }) {
  return (
    <div 
      key="slide-flow-constructor"
      className={`relative w-full h-[600px] md:h-full rounded-[3rem] border overflow-hidden ${isDark ? 'border-[#333] bg-[#0d0d0d]' : 'border-gray-200 bg-[#ebebeb]'}`}
      style={{
        boxShadow: isDark 
          ? 'inset 0 10px 40px rgba(0,0,0,0.8), inset 0 -10px 40px rgba(0,0,0,0.8)'
          : 'inset 0 10px 40px rgba(0,0,0,0.08), inset 0 -10px 40px rgba(0,0,0,0.08)'
      }}
    >
      <ReactFlowProvider>
        <FlowContent isDark={isDark} />
      </ReactFlowProvider>
    </div>
  );
}
