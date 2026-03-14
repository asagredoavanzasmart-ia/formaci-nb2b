import React from 'react';
import { motion } from 'motion/react';
import { Anchor, ArrowRight, AlertTriangle, TrendingUp, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Slide11({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      {/* Segmento naranja eliminado */}
      
      <div className="mb-6 shrink-0">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
          Modos de Respuesta: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">¿Están listos para comprar?</span>
        </h2>
        <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          La gente compra solo cuando percibe una discrepancia entre Realidad y Resultados.
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 min-h-0">
        
        {/* Top Graphic: The Discrepancy Model */}
        <div className={`flex-[2] rounded-2xl border-2 flex flex-col items-center justify-center relative overflow-hidden ${isDark ? 'border-[#3a3a3a] bg-[#252525]' : 'border-gray-200 bg-gray-50'}`}>
          <div className="absolute top-4 left-0 w-full text-center z-10">
            <h3 className="text-2xl font-bold tracking-widest uppercase opacity-80 bg-black/80 text-white inline-block px-8 py-1">PROBLEMAS</h3>
          </div>

          <div className="relative w-full max-w-3xl h-full flex items-center justify-center mt-4">
            
            {/* Sinking Ship Illustration (SVG) */}
            <motion.div 
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-64 opacity-90 z-0"
              animate={{ 
                y: [0, 8, 0], 
                rotate: [20, 24, 20] 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                {/* Water/Rocks */}
                <path d="M 20 144 Q 50 128 100 144 T 180 144 L 180 190 L 20 190 Z" fill={isDark ? '#4a4a4a' : '#c2b280'} />
                <path d="M 40 154 Q 80 138 120 154 T 160 154 L 160 190 L 40 190 Z" fill={isDark ? '#3a3a3a' : '#a89a6c'} />
                
                {/* Ship Body */}
                <g transform="rotate(25, 100, 150)">
                  <path d="M 40 120 L 160 120 L 140 160 L 60 160 Z" fill={isDark ? '#6b7280' : '#4b5563'} />
                  <path d="M 40 120 L 160 120 L 150 130 L 50 130 Z" fill={isDark ? '#9ca3af' : '#6b7280'} />
                  {/* Cabin */}
                  <rect x="70" y="80" width="40" height="40" fill={isDark ? '#d1d5db' : '#e5e7eb'} rx="4" />
                  <rect x="75" y="85" width="12" height="15" fill={isDark ? '#374151' : '#1f2937'} rx="2" />
                  <rect x="93" y="85" width="12" height="15" fill={isDark ? '#374151' : '#1f2937'} rx="2" />
                  {/* Smoke stack */}
                  <rect x="115" y="70" width="15" height="50" fill={isDark ? '#4b5563' : '#374151'} />
                  <path d="M 115 70 L 130 70 L 130 80 L 115 80 Z" fill="#ef375c" />
                </g>
                
                {/* Smoke */}
                <motion.circle cx="110" cy="50" r="8" fill={isDark ? '#9ca3af' : '#d1d5db'} opacity="0.6" animate={{ y: [0, -10], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="100" cy="35" r="12" fill={isDark ? '#9ca3af' : '#d1d5db'} opacity="0.4" animate={{ y: [0, -15], opacity: [0.4, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
                <motion.circle cx="85" cy="20" r="15" fill={isDark ? '#9ca3af' : '#d1d5db'} opacity="0.2" animate={{ y: [0, -20], opacity: [0.2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
              </svg>
            </motion.div>

            {/* Diagram Lines and Text */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 400">
                {/* CAUSE X -> RESULTS needed */}
                <motion.line x1="250" y1="100" x2="500" y2="100" stroke={isDark ? '#9ca3af' : '#4b5563'} strokeWidth="2" strokeDasharray="6,6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                <motion.polygon points="500,95 510,100 500,105" fill={isDark ? '#9ca3af' : '#4b5563'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
                
                <motion.text x="250" y="90" fill={isDark ? '#d1d5db' : '#1f2937'} fontSize="16" fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>CAUSA X</motion.text>
                <motion.text x="520" y="105" fill={isDark ? '#d1d5db' : '#1f2937'} fontSize="16" fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>RESULTADOS deseados</motion.text>

                {/* Vertical Discrepancy Line */}
                <motion.line x1="500" y1="120" x2="500" y2="220" stroke={isDark ? '#9ca3af' : '#4b5563'} strokeWidth="2" strokeDasharray="6,6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.8 }} />
                <motion.polygon points="495,220 500,230 505,220" fill={isDark ? '#9ca3af' : '#4b5563'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }} />
                
                <motion.text x="520" y="175" fill={isDark ? '#ef375c' : '#ef375c'} fontSize="16" fontWeight="bold" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }}>DISCREPANCIA</motion.text>

                {/* REALITY today */}
                <motion.text x="520" y="240" fill={isDark ? '#d1d5db' : '#1f2937'} fontSize="16" fontWeight="bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>REALIDAD actual</motion.text>
                
                {/* Diagonal line from Cause X to Reality */}
                <motion.line x1="300" y1="100" x2="480" y2="230" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3 }} />
                <motion.polygon points="475,225 485,235 485,220" fill={isDark ? '#6b7280' : '#9ca3af'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} />
              </svg>
            </div>

            {/* Bottom Question */}
            <motion.div 
              className="absolute bottom-2 left-0 w-full text-center z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5, duration: 0.5 }}
            >
              <p className="font-bold text-sm sm:text-base bg-background/80 inline-block px-4 py-1 rounded-full">¿Tu propuesta reduce o elimina la discrepancia?</p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Process Flow: The 4 Modes */}
        <div className="flex-1 flex flex-col justify-end pb-2">
          <div className="h-16 sm:h-20 flex gap-1 w-full">
            
            {/* 1. Crecimiento */}
            <motion.div 
              className="flex-1 relative group h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-[#ff851d] text-white flex flex-col items-center justify-center p-1 text-center" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}>
                <h4 className="font-bold text-sm sm:text-base leading-tight">Crecimiento</h4>
                <p className="text-sm opacity-90 hidden sm:block">(Growth)</p>
              </div>
              <div className="absolute top-full left-0 w-full pt-1 text-center">
                <p className="text-sm leading-tight">Quieren más/mejor.</p>
                <p className="text-sm font-bold">(Alta Probabilidad)</p>
              </div>
            </motion.div>

            {/* 2. Problemas */}
            <motion.div 
              className="flex-1 relative group h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-[#ef375c] text-white flex flex-col items-center justify-center p-1 text-center" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)' }}>
                <h4 className="font-bold text-sm sm:text-base leading-tight">Problemas</h4>
                <p className="text-sm opacity-90 hidden sm:block">(Trouble)</p>
              </div>
              <div className="absolute top-full left-0 w-full pt-1 text-center">
                <p className="text-sm leading-tight">Necesitan arreglar algo urgente.</p>
                <p className="text-sm font-bold">(Alta Probabilidad)</p>
              </div>
            </motion.div>

            {/* 3. Quilla Pareja */}
            <motion.div 
              className="flex-1 relative group h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-gray-400 text-white flex flex-col items-center justify-center p-1 text-center" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)' }}>
                <h4 className="font-bold text-sm sm:text-base leading-tight">Quilla Pareja</h4>
                <p className="text-sm opacity-90 hidden sm:block">(Even Keel)</p>
              </div>
              <div className="absolute top-full left-0 w-full pt-1 text-center">
                <p className="text-sm leading-tight">Satisfechos.</p>
                <p className="text-sm font-bold">(Baja Probabilidad)</p>
              </div>
            </motion.div>

            {/* 4. Exceso de Confianza */}
            <motion.div 
              className="flex-1 relative group h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gray-600 text-white flex flex-col items-center justify-center p-1 text-center" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10% 50%)' }}>
                <h4 className="font-bold text-sm sm:text-base leading-tight">Exceso de Confianza</h4>
                <p className="text-sm opacity-90 hidden sm:block">(Overconfident)</p>
              </div>
              <div className="absolute top-full left-0 w-full pt-1 text-center">
                <p className="text-sm leading-tight">Ignoran riesgos.</p>
                <p className="text-sm font-bold">(Probabilidad Nula)</p>
              </div>
            </motion.div>

          </div>
          
          {/* Bottom Arrow Lines */}
          <motion.div 
            className="relative mt-12 h-4 w-full px-2 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
             {/* Left Arrow (pointing right) */}
             <div className="flex-1 relative">
               <div className="absolute top-1/2 left-0 right-2 h-[2px] bg-gray-500"></div>
               <div className="absolute top-1/2 right-2 w-3 h-3 border-t-[2px] border-r-[2px] border-gray-500 transform rotate-45 -translate-y-1/2"></div>
             </div>
             
             {/* Right Arrow (pointing left) */}
             <div className="flex-1 relative">
               <div className="absolute top-1/2 left-2 right-0 h-[2px] bg-gray-500"></div>
               <div className="absolute top-1/2 left-2 w-3 h-3 border-b-[2px] border-l-[2px] border-gray-500 transform rotate-45 -translate-y-1/2"></div>
             </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
