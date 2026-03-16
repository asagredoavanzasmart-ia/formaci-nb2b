import React, { useState, useRef } from 'react';
import { User, HelpCircle, Scale, Server, Calculator, Crown, Briefcase } from 'lucide-react';

interface NodeData {
  id: string;
  label: string;
  icon: React.ElementType;
  x: number;
  y: number;
}

export default function ComplexVenta({ isDark }: { isDark: boolean }) {
  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 'jefe_area', label: 'Jefe de Área', icon: Briefcase, x: 28, y: 50 },
    { id: 'legal', label: 'Legal', icon: Scale, x: 45, y: 20 },
    { id: 'ti', label: 'TI', icon: Server, x: 45, y: 80 },
    { id: 'finanzas', label: 'Finanzas', icon: Calculator, x: 70, y: 20 },
    { id: 'gerencia', label: 'Gerencia', icon: Crown, x: 70, y: 80 },
  ]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setDraggingNode(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingNode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    x = Math.max(20, Math.min(80, x));
    y = Math.max(15, Math.min(85, y));
    setNodes(nodes.map(n => n.id === draggingNode ? { ...n, x, y } : n));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingNode) {
      setDraggingNode(null);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className={`p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#111111] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4 z-30 relative shrink-0">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-4">
          Venta <span className="text-[#ef375c]">Compleja</span>
        </h2>
      </div>
      
      <div className="w-full flex-1 relative" 
           ref={containerRef}
           onPointerMove={handlePointerMove}
           onPointerUp={handlePointerUp}
           onPointerLeave={handlePointerUp}>
        
        {/* Vendedor */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" style={{ left: '10%', top: '50%' }}>
          <div className={`flex flex-col items-center justify-center rounded-full shadow-2xl w-28 h-28 sm:w-32 sm:h-32 text-base ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-black/80 border border-[#3a3a3a]' : 'bg-gradient-to-br from-white to-gray-100 shadow-gray-300/80 border border-gray-200'}`}>
            <User size={28} className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className="font-ubuntu font-bold text-center px-4 drop-shadow-sm">Vendedor</span>
          </div>
        </div>
        
        {/* Interactive Cables */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible absolute inset-0">
            <defs>
              <linearGradient id="gradLine2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff851d" />
                <stop offset="100%" stopColor="#ef375c" />
              </linearGradient>
              <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity={isDark ? "0.5" : "0.3"} floodColor="#ef375c" />
              </filter>
            </defs>
            
            <g fill="none" stroke="url(#gradLine2)" filter="url(#shadow2)" strokeWidth="0.4">
              {nodes.map(node => (
                <React.Fragment key={node.id}>
                  <path d={`M 10,50 C ${10 + (node.x - 10)/2},50 ${10 + (node.x - 10)/2},${node.y} ${node.x},${node.y}`} />
                  <path d={`M ${node.x},${node.y} C ${node.x + (90 - node.x)/2},${node.y} ${node.x + (90 - node.x)/2},50 90,50`} />
                </React.Fragment>
              ))}
              {[
                { source: 'jefe_area', target: 'ti' },
                { source: 'jefe_area', target: 'gerencia' },
                { source: 'legal', target: 'gerencia' },
                { source: 'finanzas', target: 'gerencia' }
              ].map((edge, i) => {
                const getCoords = (id: string) => {
                  const node = nodes.find(n => n.id === id);
                  return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
                };
                const source = getCoords(edge.source);
                const target = getCoords(edge.target);
                const cp1x = source.x + (target.x - source.x) / 2;
                const cp1y = source.y;
                const cp2x = source.x + (target.x - source.x) / 2;
                const cp2y = target.y;
                return (
                  <path 
                    key={`internal-${i}`} 
                    d={`M ${source.x},${source.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${target.x},${target.y}`} 
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Dynamic Nodes */}
        {nodes.map(node => (
          <div 
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 touch-none"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onPointerDown={(e) => handlePointerDown(node.id, e)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`relative flex flex-col items-center justify-center rounded-full shadow-xl transition-shadow duration-300 cursor-grab active:cursor-grabbing w-24 h-24 sm:w-28 sm:h-28 text-sm ${isDark ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] shadow-black/60 border border-[#4a4a4a] hover:border-[#ff851d]' : 'bg-gradient-to-br from-gray-50 to-gray-200 shadow-gray-300/60 border border-gray-300 hover:border-[#ff851d]'}`}>
              <node.icon size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              <span className="font-ubuntu font-bold text-center px-2 drop-shadow-sm leading-tight">
                {node.label}
              </span>
            </div>
          </div>
        ))}

        {/* Decisión de Compra */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" style={{ left: '90%', top: '50%' }}>
          <div className="flex flex-col items-center justify-center rounded-full shadow-2xl w-28 h-28 sm:w-32 sm:h-32 text-base bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white border-2 border-white/20 shadow-[#ef375c]/40">
            <HelpCircle size={28} className="mb-2 text-white" />
            <span className="font-ubuntu font-bold text-center px-2 drop-shadow-sm text-white leading-tight">Decisión de Compra</span>
          </div>
        </div>
      </div>
    </div>
  );
}
