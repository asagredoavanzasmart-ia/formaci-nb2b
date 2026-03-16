import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, HelpCircle, Scale, Server, Calculator, Crown, Briefcase, RefreshCw, Users, ShieldCheck, Landmark, PieChart, PenTool } from 'lucide-react';

interface NodeData {
  id: string;
  label: string;
  icon: React.ElementType;
  x: number;
  y: number;
  isTarget?: boolean;
}

interface ComplexVariation {
  id: number;
  sellerLabel: string;
  buyerLabel: string;
  sellerIcon: React.ElementType;
  buyerIcon: React.ElementType;
  nodes: NodeData[];
  edges: { source: string; target: string }[];
  multipleTargets?: boolean;
}

export default function SlideVentaSimpleVsCompleja({ isDark }: { isDark: boolean }) {
  const [isComplex, setIsComplex] = useState(false);
  const [variationIndex, setVariationIndex] = useState(0);
  const [simpleVarIndex, setSimpleVarIndex] = useState(0);

  const simpleVariations = [
    { label: 'Comprador', icon: User },
    { label: 'Compradores', icon: Users }
  ];

  const complexVariations: ComplexVariation[] = [
    {
      id: 0,
      sellerLabel: 'Ejecutivo',
      buyerLabel: 'Decisión de Compra',
      sellerIcon: User,
      buyerIcon: HelpCircle,
      nodes: [
        { id: 'jefe_area', label: 'Jefe de Área', icon: Briefcase, x: 28, y: 50 },
        { id: 'legal', label: 'Legal', icon: Scale, x: 45, y: 20 },
        { id: 'ti', label: 'TI', icon: Server, x: 45, y: 80 },
        { id: 'finanzas', label: 'Finanzas', icon: Calculator, x: 70, y: 20 },
        { id: 'gerencia', label: 'Gerencia', icon: Crown, x: 70, y: 80 },
      ],
      edges: [
        { source: 'jefe_area', target: 'ti' },
        { source: 'jefe_area', target: 'gerencia' },
        { source: 'legal', target: 'gerencia' },
        { source: 'finanzas', target: 'gerencia' }
      ]
    },
    {
      id: 1,
      sellerLabel: 'Vendedor',
      buyerLabel: 'Comité de Compras',
      sellerIcon: User,
      buyerIcon: Users,
      nodes: [
        { id: 'mayordomo', label: 'Mayordomo', icon: ShieldCheck, x: 45, y: 30 },
        { id: 'administrador', label: 'Administrador', icon: Briefcase, x: 45, y: 70 },
      ],
      edges: []
    },
    {
      id: 2,
      sellerLabel: 'Equipo Ventas',
      buyerLabel: 'Junta de Socios',
      sellerIcon: Users,
      buyerIcon: Landmark,
      nodes: [
        { id: 'gerencia_v2', label: 'Gerencia', icon: Briefcase, x: 30, y: 25 },
        { id: 'contable', label: 'Contable', icon: Calculator, x: 30, y: 75 },
        { id: 'rrhh', label: 'RRHH', icon: Users, x: 60, y: 25 },
        { id: 'gerencia_gral', label: 'Gerencia Gral', icon: Crown, x: 60, y: 75 },
      ],
      edges: [
        { source: 'gerencia_v2', target: 'rrhh' },
        { source: 'contable', target: 'gerencia_gral' },
      ]
    },
    {
      id: 3,
      sellerLabel: 'Vendedor',
      buyerLabel: '', // Dynamic labels inside nodes
      sellerIcon: User,
      buyerIcon: Users,
      multipleTargets: true,
      nodes: [
        { id: 'asistente', label: 'Asistente', icon: PenTool, x: 30, y: 50 },
        { id: 'asesor_contable', label: 'Asesor Contable', icon: Calculator, x: 55, y: 25 },
        { id: 'asesores_legales', label: 'Asesores Legales', icon: Scale, x: 55, y: 75 },
        { id: 'operaciones', label: 'Operaciones', icon: Server, x: 85, y: 30, isTarget: true },
        { id: 'comercial', label: 'Comercial', icon: Briefcase, x: 85, y: 70, isTarget: true },
      ],
      edges: [
        { source: 'operaciones', target: 'comercial' }
      ]
    }
  ];

  const currentComplex = complexVariations[variationIndex];
  const currentSimple = simpleVariations[simpleVarIndex];

  const handleNextVariation = () => {
    if (isComplex) {
      setVariationIndex((prev) => (prev + 1) % complexVariations.length);
    } else {
      setSimpleVarIndex((prev) => (prev + 1) % simpleVariations.length);
    }
  };

  const getCoords = (id: string) => {
    const node = currentComplex.nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
  };

  return (
    <div className={`p-6 sm:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col items-center mb-8 z-30 relative shrink-0">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-4 mb-6">
          Comparativa: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Evolución de la Venta</span>
        </h2>

        <div className="flex items-center gap-4">
          <div className={`p-1 rounded-full flex items-center gap-1 ${isDark ? 'bg-black/40 border border-white/5' : 'bg-gray-100 border border-gray-200'}`}>
            <button 
              onClick={() => setIsComplex(false)}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all duration-300 ${!isComplex ? 'bg-white text-black shadow-md scale-105' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Venta Simple
            </button>
            <button 
              onClick={() => setIsComplex(true)}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all duration-300 ${isComplex ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg scale-105' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Venta Compleja
            </button>
          </div>

          <button
            onClick={handleNextVariation}
            className={`p-3 rounded-full flex items-center gap-2 text-xs font-bold transition-all duration-300 shadow-lg ${isDark ? 'bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            title="Cambiar Situación"
          >
            <RefreshCw size={16} />
            <span>Cambiar Situación</span>
          </button>
        </div>
      </div>
      
      <div className="w-full flex-1 relative">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible absolute inset-0">
            <defs>
              <linearGradient id="gradSlideTrans" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff851d" />
                <stop offset="100%" stopColor="#ef375c" />
              </linearGradient>
              <filter id="shadowSlideTrans" x="-10%" y="-50%" width="120%" height="200%" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity={isDark ? "0.6" : "0.4"} floodColor="#ef375c" />
              </filter>
            </defs>
            
            <g fill="none" stroke="url(#gradSlideTrans)" filter="url(#shadowSlideTrans)" strokeWidth="0.5">
              <AnimatePresence mode="wait">
                {!isComplex ? (
                  <motion.g key={`simple-view-${simpleVarIndex}`}>
                    <motion.rect
                      x="30" y="49.3" width="40" height="1.4" rx="0.7"
                      fill="url(#gradSlideTrans)"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.25 } }}
                      style={{ originX: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                    <motion.path 
                      key="simple-line" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                      d="M 30,50 L 70,50" strokeWidth="1.2" transition={{ duration: 0.8 }}
                    />
                  </motion.g>
                ) : (
                  <motion.g key={`complex-lines-${variationIndex}`}>
                    {currentComplex.nodes.filter(n => !n.isTarget).map((node, i) => {
                      const isAsistente = node.id === 'asistente';
                      const targets = currentComplex.nodes.filter(n => n.isTarget);
                      
                      return (
                        <React.Fragment key={`complex-edge-${node.id}`}>
                          {/* From Seller to node (except if not connected to seller) */}
                          <motion.path 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            d={`M 10,50 C ${10 + (node.x - 10)/2},50 ${10 + (node.x - 10)/2},${node.y} ${node.x},${node.y}`} 
                          />
                          
                          {/* From node to default target (if no multiple targets or if node should connect) */}
                          {!currentComplex.multipleTargets && (
                            <motion.path 
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ delay: (i + 1) * 0.1, duration: 0.8 }}
                              d={`M ${node.x},${node.y} C ${node.x + (90 - node.x)/2},${node.y} ${node.x + (90 - node.x)/2},50 90,50`} 
                            />
                          )}

                          {currentComplex.multipleTargets && !isAsistente && targets.map((t, ti) => (
                             <motion.path 
                              key={`to-target-${t.id}-${node.id}`}
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ delay: (i + ti) * 0.1, duration: 0.8 }}
                              d={`M ${node.x},${node.y} C ${node.x + (t.x - node.x)/2},${node.y} ${node.x + (t.x - node.x)/2},${t.y} ${t.x},${t.y}`} 
                            />
                          ))}
                        </React.Fragment>
                      )
                    })}
                    {currentComplex.edges.map((edge, i) => {
                      const source = getCoords(edge.source);
                      const target = getCoords(edge.target);
                      return (
                        <motion.path 
                          key={`var-${variationIndex}-internal-${i}`} 
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                          d={`M ${source.x},${source.y} C ${source.x + (target.x - source.x)/2},${source.y} ${source.x + (target.x - source.x)/2},${target.y} ${target.x},${target.y}`} 
                        />
                      );
                    })}
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          </svg>
        </div>

        {/* Node: Vendedor Dinámico */}
        <motion.div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" 
          animate={{ left: isComplex ? '10%' : '30%', top: '50%' }}
          transition={{ duration: 1.0, type: 'spring', stiffness: 50, damping: 15 }}
        >
          <div className={`flex flex-col items-center justify-center rounded-full shadow-2xl w-28 h-28 sm:w-32 sm:h-32 text-base ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shadow-black/80 border border-[#3a3a3a]' : 'bg-gradient-to-br from-white to-gray-100 shadow-gray-300/80 border border-gray-200'}`}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={isComplex ? `comp-${currentComplex.sellerLabel}-${variationIndex}` : 'simple-vendedor'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col items-center"
              >
                {React.createElement(isComplex ? currentComplex.sellerIcon : User, { size: 28, className: `mb-2 ${isDark ? 'text-white/80' : 'text-gray-600'}` })}
                <span className={`font-ubuntu font-bold text-center px-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {isComplex ? currentComplex.sellerLabel : 'Vendedor'}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Dynamic Nodes: Complex Roles per Variation */}
        <AnimatePresence>
          {isComplex && currentComplex.nodes.map((node, i) => (
            <motion.div 
              key={`${variationIndex}-${node.id}`}
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 10 }}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className={`flex flex-col items-center justify-center rounded-full shadow-xl ${node.isTarget ? 'w-28 h-28 sm:w-32 sm:h-32 text-white border-2 border-white/20 shadow-[#ef375c]/40 bg-gradient-to-br from-[#ff851d] to-[#ef375c]' : `w-24 h-24 sm:w-28 sm:h-28 text-sm ${isDark ? 'bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] shadow-black/60 border border-[#4a4a4a]' : 'bg-gradient-to-br from-gray-50 to-gray-200 shadow-gray-300/60 border border-gray-300'}`}`}>
                <node.icon size={node.isTarget ? 28 : 20} className={`mb-1 ${node.isTarget ? 'text-white' : (isDark ? 'text-white/80' : 'text-gray-600')}`} />
                <span className={`font-ubuntu font-bold text-center px-2 leading-tight ${node.isTarget ? 'text-white' : (isDark ? 'text-white' : 'text-gray-900')}`}>
                  {node.label}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Node: Comprador Dinámico (Single Target) */}
        {!currentComplex.multipleTargets && (
          <motion.div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" 
            animate={{ left: isComplex ? '90%' : '70%', top: '50%' }}
            transition={{ duration: 1.0, type: 'spring', stiffness: 50, damping: 15 }}
          >
            <motion.div 
              animate={{ background: 'linear-gradient(to bottom right, #ff851d, #ef375c)' }}
              className="flex flex-col items-center justify-center rounded-full shadow-2xl w-28 h-28 sm:w-32 sm:h-32 text-base text-white border-2 border-white/20 shadow-[#ef375c]/40"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={isComplex ? `comp-${currentComplex.buyerLabel}-${variationIndex}` : `simple-${currentSimple.label}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex flex-col items-center"
                >
                  {React.createElement(isComplex ? currentComplex.buyerIcon : currentSimple.icon, { size: 32, className: "mb-2 text-white" })}
                  <span className="font-ubuntu font-bold text-center px-2 text-white leading-tight">
                    {isComplex ? currentComplex.buyerLabel : currentSimple.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
