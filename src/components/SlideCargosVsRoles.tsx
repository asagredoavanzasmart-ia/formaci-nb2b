import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Scale, Server, Calculator, Crown, Briefcase, Users, Shield, DollarSign, Compass, AlertOctagon, HeartHandshake, Wrench, XCircle, CheckCircle2 } from 'lucide-react';

export default function SlideCargosVsRoles({ isDark }: { isDark: boolean }) {
  const [viewMode, setViewMode] = useState<'cargos' | 'roles'>('cargos');
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [detractorPos, setDetractorPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [dodgeMultiplier, setDodgeMultiplier] = useState(1);
  const hoveredRoleRef = useRef<string | null>(null);

  useEffect(() => {
    hoveredRoleRef.current = hoveredRole;
  }, [hoveredRole]);

  const rolesData = [
    { id: 'vendedor', label: 'Vendedor', icon: User, x: 15, y: 50, desc: 'Impulsa la venta, gestiona la estrategia e interactúa con todos los roles.', influencia: 0, win: '', resultado: '' },
    { id: 'coach', label: 'Coach', icon: Compass, x: 50, y: 20, desc: 'Tu guía interna. Desea tu éxito y te ayuda a navegar la cuenta.', influencia: 4, win: 'Reconocimiento / Éxito', resultado: 'Implementación exitosa' },
    { id: 'usuario', label: 'C. Usuario', icon: Users, x: 50, y: 50, desc: 'Juzga el impacto operativo. El que "vive" con la solución.', influencia: 2, win: 'Menos esfuerzo diario', resultado: 'Eficiencia operativa' },
    { id: 'tecnico', label: 'C. Técnico', icon: Shield, x: 50, y: 80, desc: 'El filtro. Evalúa especificaciones y tiene poder de veto.', influencia: 4, win: 'Cumplimiento / Seguridad', resultado: 'Mitigación de riesgos' },
    { id: 'economico', label: 'C. Económico', icon: DollarSign, x: 85, y: 50, desc: 'El guardián del presupuesto. Da la aprobación final.', influencia: 5, win: 'Promoción / Bono', resultado: 'ROI / Ahorro' },
  ];

  // Detractor floating animation logic
  useEffect(() => {
    if (viewMode !== 'roles') return;
    
    let animationFrameId: number;
    let time = 0;
    let lastTimestamp = 0;
    let currentSpeed = 1;
    
    // Base path parameters (figure 8 / infinity shape around the center)
    const centerX = 50;
    const centerY = 50;
    const radiusX = 46; // Increased width of the path (+15%)
    const radiusY = 52; // Increased height of the path (+15%)
    const baseSpeed = 0.0008; // Slower, smoother speed
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Smoothly adjust speed based on hover state
      const targetSpeed = hoveredRoleRef.current === 'detractor' ? 0 : 1;
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      
      time += deltaTime * baseSpeed * currentSpeed;
      
      const nextX = centerX + radiusX * Math.sin(time);
      const nextY = centerY + radiusY * Math.sin(time) * Math.cos(time);
      
      setDetractorPos(prev => {
        // Smoothly interpolate towards the next position
        return {
          x: prev.x + (nextX - prev.x) * 0.03,
          y: prev.y + (nextY - prev.y) * 0.03
        };
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewMode]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (viewMode !== 'roles' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    
    const dx = mx - detractorPos.x;
    const dy = my - detractorPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Dodge the mouse smoothly, but slow down if chased
    if (dist < 30 && hoveredRoleRef.current !== 'detractor') {
      setDodgeMultiplier(prev => Math.max(0, prev - 0.02));
      const angle = Math.atan2(dy, dx);
      const push = (30 - dist) * dodgeMultiplier;
      setDetractorPos(prev => ({
        x: prev.x - Math.cos(angle) * push * 0.3,
        y: prev.y - Math.sin(angle) * push * 0.3
      }));
    } else {
      setDodgeMultiplier(prev => Math.min(1, prev + 0.05));
    }
  };

  const getLineOpacity = (source: string, target: string) => {
    if (!hoveredRole) return 0.5;
    if (hoveredRole === source || hoveredRole === target || hoveredRole === 'vendedor') return 1;
    return 0.1;
  };

  const getLineColor = (source: string, target: string) => {
    if (!hoveredRole) return isDark ? '#4a4a4a' : '#cbd5e1';
    if (hoveredRole === source || hoveredRole === target || hoveredRole === 'vendedor') return 'url(#orangeGrad)';
    return isDark ? '#333333' : '#e2e8f0';
  };

  return (
    <div className={`p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mb-6 z-30 relative shrink-0">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-4">
          Cargos vs Roles en la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Venta Compleja</span>
        </h2>
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Comparación entre la visión tradicional (Cargos) y la visión estratégica (Roles).
        </p>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-8 relative z-10 min-h-0">
        {/* Diagram Area */}
        <div 
          className="w-full lg:w-3/4 relative flex items-center justify-center bg-transparent rounded-3xl"
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'cargos' ? (
              <motion.div
                key="cargos"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Organigrama View */}
                <div className="relative w-full max-w-5xl h-[450px]">
                
                {/* Lines SVG */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                  <g fill="none" stroke={isDark ? '#4a4a4a' : '#cbd5e1'} strokeWidth="0.3" vectorEffect="non-scaling-stroke">
                    {/* Gerencia to Level 2 */}
                    <path d="M 50 15 L 50 30" />
                    <path d="M 20 30 L 80 30" />
                    <path d="M 20 30 L 20 45" />
                    <path d="M 40 30 L 40 45" />
                    <path d="M 60 30 L 60 45" />
                    <path d="M 80 30 L 80 45" />
                    
                    {/* Legal to Jefe de Area */}
                    <path d="M 40 45 L 40 75" />
                    
                    {/* RRHH to Operadores */}
                    <path d="M 60 45 L 60 75" />
                  </g>
                  
                  {/* Vendedor Connections (Dashed Gray) */}
                  <g fill="none" stroke={isDark ? '#4a4a4a' : '#cbd5e1'} strokeWidth="0.3" strokeDasharray="1.5 1" vectorEffect="non-scaling-stroke">
                    {/* Vendedor to Jefe de Area */}
                    <path d="M 20 85 L 40 75" />
                  </g>
                </svg>

                {/* Level 1: Gerencia */}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '50%', top: '15%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-32 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <Crown size={20} className={`mb-1 ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Gerencia</span>
                  </div>
                </div>

                {/* Level 2: Finanzas, Legal, RRHH, TI */}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '20%', top: '45%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-28 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <Calculator size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Finanzas</span>
                  </div>
                </div>
                
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '40%', top: '45%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-28 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <Scale size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</span>
                  </div>
                </div>
                
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '60%', top: '45%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-28 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <HeartHandshake size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>RRHH</span>
                  </div>
                </div>
                
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '80%', top: '45%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-28 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <Server size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>TI</span>
                  </div>
                </div>

                {/* Level 3: Jefe de Área, Operadores */}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '40%', top: '75%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-28 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <Briefcase size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Jefe de Área</span>
                  </div>
                </div>
                
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '60%', top: '75%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg w-28 h-20 ${isDark ? 'bg-[#2a2a2a] border border-[#4a4a4a]' : 'bg-white border border-gray-200'}`}>
                    <Wrench size={20} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Operadores</span>
                  </div>
                </div>

                {/* Vendedor (Bottom Left, connected to Jefe de Area) */}
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: '20%', top: '85%' }}>
                  <div className={`flex flex-col items-center justify-center rounded-full shadow-lg w-24 h-24 ${isDark ? 'bg-[#2a2a2a] border-2 border-[#ff851d]' : 'bg-white border-2 border-[#ff851d]'}`}>
                    <User size={24} className={`mb-1 ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`} />
                    <span className={`font-bold text-xs text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Vendedor</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="roles"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Roles View */}
              <div className="relative w-full max-w-5xl h-[450px]">
                
                {/* Lines SVG */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff851d" />
                      <stop offset="100%" stopColor="#ef375c" />
                    </linearGradient>
                  </defs>
                  <g fill="none" strokeWidth="0.4" className="transition-all duration-300" vectorEffect="non-scaling-stroke">
                    {/* Vendedor to Coach */}
                    <path d="M 15 50 Q 30 20 50 20" stroke={getLineColor('vendedor', 'coach')} opacity={getLineOpacity('vendedor', 'coach')} className="transition-all duration-300" />
                    {/* Vendedor to Usuario */}
                    <path d="M 15 50 L 50 50" stroke={getLineColor('vendedor', 'usuario')} opacity={getLineOpacity('vendedor', 'usuario')} className="transition-all duration-300" />
                    {/* Vendedor to Técnico */}
                    <path d="M 15 50 Q 30 80 50 80" stroke={getLineColor('vendedor', 'tecnico')} opacity={getLineOpacity('vendedor', 'tecnico')} className="transition-all duration-300" />
                    {/* Vendedor to Económico (Outer curve) */}
                    <path d="M 15 50 C 30 -20, 70 -20, 85 50" stroke={getLineColor('vendedor', 'economico')} opacity={getLineOpacity('vendedor', 'economico')} className="transition-all duration-300" strokeDasharray="1.5 1" />
                    
                    {/* Inter-role connections */}
                    <path d="M 50 20 L 50 50" stroke={getLineColor('coach', 'usuario')} opacity={getLineOpacity('coach', 'usuario')} className="transition-all duration-300" />
                    <path d="M 50 50 L 50 80" stroke={getLineColor('usuario', 'tecnico')} opacity={getLineOpacity('usuario', 'tecnico')} className="transition-all duration-300" />
                    <path d="M 50 20 Q 70 20 85 50" stroke={getLineColor('coach', 'economico')} opacity={getLineOpacity('coach', 'economico')} className="transition-all duration-300" />
                    <path d="M 50 50 L 85 50" stroke={getLineColor('usuario', 'economico')} opacity={getLineOpacity('usuario', 'economico')} className="transition-all duration-300" />
                    <path d="M 50 80 Q 70 80 85 50" stroke={getLineColor('tecnico', 'economico')} opacity={getLineOpacity('tecnico', 'economico')} className="transition-all duration-300" />
                  </g>
                </svg>

                {/* Roles Nodes */}
                {rolesData.map((role) => {
                  const isHovered = hoveredRole === role.id;
                  const isRelated = hoveredRole === 'vendedor' || (hoveredRole && role.id === 'vendedor');
                  const isHighlighted = isHovered || isRelated;
                  const isCoach = role.id === 'coach';

                  return (
                    <div 
                      key={role.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20" 
                      style={{ left: `${role.x}%`, top: `${role.y}%` }}
                      onMouseEnter={() => setHoveredRole(role.id)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      <div className={`relative flex flex-col items-center justify-center rounded-2xl shadow-xl transition-all duration-300 cursor-pointer
                        ${role.id === 'vendedor' ? 'w-28 h-28 rounded-full' : 'w-36 h-28'}
                        ${isHighlighted 
                          ? 'scale-110 border-2 border-[#ff851d] shadow-[#ef375c]/30' 
                          : isDark 
                            ? isCoach ? 'bg-gradient-to-br from-[#ff851d]/20 to-[#ef375c]/20 border border-[#ff851d]/50 scale-100' : 'bg-[#2a2a2a] border border-[#4a4a4a] scale-100' 
                            : isCoach ? 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 scale-100' : 'bg-white border border-gray-200 scale-100'}
                        ${isDark && !isHighlighted && !isCoach ? 'bg-[#2a2a2a]' : isHighlighted ? (isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#3a2a2a]' : 'bg-gradient-to-br from-white to-orange-50') : ''}
                      `}>
                        <role.icon size={28} className={`mb-2 transition-colors duration-300 ${isHighlighted || isCoach ? 'text-[#ef375c]' : isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                        <span className={`font-bold text-sm text-center transition-colors duration-300 ${isHighlighted || isCoach ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>
                          {role.label}
                        </span>
                      </div>

                      {/* Tooltip - Positioned to the side */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, x: role.id === 'vendedor' ? 10 : -10, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: role.id === 'vendedor' ? 5 : -5, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-1/2 -translate-y-1/2 ${role.id === 'vendedor' ? 'left-full ml-4' : 'right-full mr-4'} w-56 p-4 rounded-xl shadow-2xl z-[100] text-left pointer-events-none ${isDark ? 'bg-[#3a3a3a] border border-[#4a4a4a] text-gray-200' : 'bg-white border border-gray-200 text-gray-700'}`}
                          >
                            <div className={`absolute top-1/2 -translate-y-1/2 ${role.id === 'vendedor' ? '-left-2 border-b border-l' : '-right-2 border-t border-r'} w-4 h-4 rotate-45 ${isDark ? 'bg-[#3a3a3a] border-[#4a4a4a]' : 'bg-white border-gray-200'}`}></div>
                            
                            <p className="text-xs relative z-10 font-medium leading-relaxed mb-3">{role.desc}</p>
                            
                            {role.id !== 'vendedor' && (
                              <div className={`flex flex-col gap-2.5 mt-2 pt-3 border-t relative z-10 ${isDark ? 'border-[#4a4a4a]' : 'border-gray-200'}`}>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase text-[#ff851d]">Influencia</span>
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                      <div key={star} className={`w-3 h-1.5 rounded-full ${star <= role.influencia ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c]' : isDark ? 'bg-[#4a4a4a]' : 'bg-gray-200'}`} />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1.5 text-[10px]">
                                  <div className="flex justify-between items-center">
                                    <span className={`font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Win:</span>
                                    <span className={`font-medium text-right ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{role.win}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className={`font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Resultado:</span>
                                    <span className={`font-medium text-right ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{role.resultado}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Floating Detractor (Smooth Circle + Dodging) */}
                <motion.div 
                  className="absolute z-50 pointer-events-auto flex flex-col items-center cursor-pointer"
                  style={{ 
                    left: `${detractorPos.x}%`, 
                    top: `${detractorPos.y}%`,
                    transform: 'translate(-50%, -50%)' 
                  }}
                  onMouseEnter={() => setHoveredRole('detractor')}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                  >
                    <div className={`flex flex-col items-center justify-center rounded-full shadow-lg shadow-red-500/40 w-16 h-16 bg-gradient-to-br from-[#ef375c] to-[#d92648] text-white border-2 border-white/20 backdrop-blur-sm relative z-10 transition-transform duration-300 ${hoveredRole === 'detractor' ? 'scale-110' : ''}`}>
                      <AlertOctagon size={18} className="mb-0.5" />
                      <span className="font-bold text-[8px] text-center uppercase tracking-wider">Detractor</span>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {hoveredRole === 'detractor' && (
                      <motion.div
                        initial={{ opacity: 0, y: detractorPos.y > 60 ? -10 : 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: detractorPos.y > 60 ? -5 : 5, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${detractorPos.y > 60 ? 'bottom-full mb-4' : 'top-full mt-4'} ${detractorPos.x > 70 ? 'right-0' : detractorPos.x < 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'} w-56 p-4 rounded-xl shadow-2xl z-[100] text-left pointer-events-none ${isDark ? 'bg-[#3a3a3a] border border-[#4a4a4a] text-gray-200' : 'bg-white border border-gray-200 text-gray-700'}`}
                      >
                        <div className={`absolute ${detractorPos.y > 60 ? '-bottom-2 border-b border-r' : '-top-2 border-t border-l'} ${detractorPos.x > 70 ? 'right-8' : detractorPos.x < 30 ? 'left-8' : 'left-1/2 -translate-x-1/2'} w-4 h-4 rotate-45 ${isDark ? 'bg-[#3a3a3a] border-[#4a4a4a]' : 'bg-white border-gray-200'}`}></div>
                        
                        <p className="text-xs relative z-10 font-medium leading-relaxed mb-3">
                          Busca bloquear la iniciativa. Puede sentirse amenazado por el cambio o es coach de otra iniciativa.
                        </p>
                        
                        <div className={`flex flex-col gap-2.5 mt-2 pt-3 border-t relative z-10 ${isDark ? 'border-[#4a4a4a]' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-[#ef375c]">Influencia</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <div key={star} className={`w-3 h-1.5 rounded-full ${star <= 4 ? 'bg-gradient-to-r from-[#ef375c] to-[#d92648]' : isDark ? 'bg-[#4a4a4a]' : 'bg-gray-200'}`} />
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5 text-[10px]">
                            <div className="flex justify-between items-center">
                              <span className={`font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Win:</span>
                              <span className={`font-medium text-right ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Reducir riesgo de amenaza</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={`font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Resultado:</span>
                              <span className={`font-medium text-right ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Mantener Status Quo</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* Right Panel (Switch & Info) */}
        <div className="w-full lg:w-1/4 flex flex-col justify-center items-center lg:items-end gap-6 z-40">
          <div className={`flex flex-col p-2 rounded-3xl shadow-lg w-full max-w-xs ${isDark ? 'bg-[#2a2a2a] border border-[#3a3a3a]' : 'bg-gray-100 border border-gray-200'}`}>
            <button 
              onClick={() => setViewMode('cargos')}
              className={`px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300 flex items-center justify-between gap-2 w-full ${
                viewMode === 'cargos' 
                  ? isDark ? 'bg-[#3a3a3a] text-white shadow-md' : 'bg-white text-gray-900 shadow-sm' 
                  : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase size={20} className={viewMode === 'cargos' ? 'text-[#ff851d]' : ''} />
                Por Cargos
              </div>
              {viewMode === 'cargos' && <XCircle size={20} className="text-red-500" />}
            </button>
            <button 
              onClick={() => setViewMode('roles')}
              className={`px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300 flex items-center justify-between gap-2 w-full mt-2 ${
                viewMode === 'roles' 
                  ? isDark ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-md' : 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-sm' 
                  : isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={20} className={viewMode === 'roles' ? 'text-white' : ''} />
                Por Roles
              </div>
              {viewMode === 'roles' && <CheckCircle2 size={20} className={isDark ? "text-white" : "text-white"} />}
            </button>
          </div>
          
          {/* Helper Text */}
          <div className={`p-6 rounded-3xl w-full max-w-xs border shadow-lg ${isDark ? 'bg-[#2a2a2a]/80 border-[#3a3a3a]' : 'bg-orange-50/80 border-orange-100'}`}>
             <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
               <Compass size={20} className="text-[#ff851d]" />
               Guía de Interacción
             </h4>
             <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
               {viewMode === 'cargos' 
                 ? 'El organigrama muestra la jerarquía formal. Sin embargo, en la venta compleja, los títulos no siempre reflejan el poder de decisión real.'
                 : 'Pasa el cursor sobre cada rol para ver sus conexiones e influencia. ¡Intenta atrapar al detractor flotante!'}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
