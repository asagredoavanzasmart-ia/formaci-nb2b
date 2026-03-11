import React from 'react';
import { motion } from 'motion/react';

export default function Slide10({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"></div>
      
      <div className="mb-6 shrink-0">
        <h2 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
          Estrategia: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Aterrizaje y Expansión</span>
        </h2>
        <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Entrar con agilidad, generar confianza y expandir la influencia.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-0">
        {/* Left side: Text content */}
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-5 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-orange-50 text-gray-700'}`}
          >
            <h3 className="font-bold text-lg mb-2 text-[#ff851d]">1. Aterrizaje (Land)</h3>
            <p className="text-sm leading-relaxed">Llegar con un producto de menor valor y ciclo de venta corto. Objetivo: hacer caja rápida y ganar la confianza inicial.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-5 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-rose-50 text-gray-700'}`}
          >
            <h3 className="font-bold text-lg mb-2 text-[#ef375c]">2. Expansión (Expand)</h3>
            <p className="text-sm leading-relaxed">Encontrar y desarrollar al "Coach" o "Champion" interno. Mantener actualizado el mapeo de influenciadores para crecer dentro de la cuenta.</p>
          </motion.div>
        </div>

        {/* Right side: Isometric SVG Animation */}
        <div className="w-full md:w-2/3 relative flex items-center justify-center rounded-3xl overflow-hidden">
          <svg viewBox="0 0 800 600" className="w-full h-full max-h-[450px] drop-shadow-2xl">
            <defs>
              <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff851d" />
                <stop offset="100%" stopColor="#ef375c" />
              </linearGradient>
              <linearGradient id="tailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff851d" stopOpacity="0" />
                <stop offset="100%" stopColor="#ef375c" stopOpacity="1" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Isometric Group */}
            <g transform="translate(400, 350) scale(1, 0.5) rotate(-45)">
              {/* Base Grid / Floor */}
              <rect 
                x="-150" y="-150" width="300" height="300" 
                fill={isDark ? '#2a2a2a' : '#f3f4f6'} 
                stroke={isDark ? '#404040' : '#e5e7eb'} 
                strokeWidth="2"
                rx="10"
              />
              
              {/* Grid lines */}
              <g stroke={isDark ? '#3a3a3a' : '#ffffff'} strokeWidth="2">
                <line x1="-100" y1="-150" x2="-100" y2="150" />
                <line x1="-50" y1="-150" x2="-50" y2="150" />
                <line x1="0" y1="-150" x2="0" y2="150" />
                <line x1="50" y1="-150" x2="50" y2="150" />
                <line x1="100" y1="-150" x2="100" y2="150" />
                
                <line x1="-150" y1="-100" x2="150" y2="-100" />
                <line x1="-150" y1="-50" x2="150" y2="-50" />
                <line x1="-150" y1="0" x2="150" y2="0" />
                <line x1="-150" y1="50" x2="150" y2="50" />
                <line x1="-150" y1="100" x2="150" y2="100" />
              </g>

              {/* Expansion Rings (Animated) */}
              <motion.circle
                cx="0" cy="0" r="0"
                fill="none"
                stroke="url(#brandGrad)"
                strokeWidth="4"
                animate={{ r: [0, 150, 150], opacity: [1, 0, 0] }}
                transition={{ duration: 3, times: [0, 0.66, 1], repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
              <motion.circle
                cx="0" cy="0" r="0"
                fill="none"
                stroke="url(#brandGrad)"
                strokeWidth="2"
                animate={{ r: [0, 150, 150], opacity: [1, 0, 0] }}
                transition={{ duration: 3, times: [0, 0.66, 1], repeat: Infinity, ease: "easeOut", delay: 1.2 }}
              />

              {/* Connected Nodes (The 'Expand') */}
              <g>
                {/* Node 1 */}
                <line x1="0" y1="0" x2="80" y2="40" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="4" fill="#ff851d" filter="url(#glow)"
                  animate={{ cx: [0, 80, 80], cy: [0, 40, 40], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.3, 1], repeat: Infinity, delay: 1.2 }}
                />
                <circle cx="80" cy="40" r="10" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad)" strokeWidth="3" />
                
                {/* Node 2 */}
                <line x1="0" y1="0" x2="-60" y2="70" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="4" fill="#ef375c" filter="url(#glow)"
                  animate={{ cx: [0, -60, -60], cy: [0, 70, 70], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.4, 1], repeat: Infinity, delay: 1.3 }}
                />
                <circle cx="-60" cy="70" r="12" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad)" strokeWidth="3" />

                {/* Node 3 */}
                <line x1="0" y1="0" x2="-40" y2="-80" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="4" fill="#ff851d" filter="url(#glow)"
                  animate={{ cx: [0, -40, -40], cy: [0, -80, -80], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.35, 1], repeat: Infinity, delay: 1.1 }}
                />
                <circle cx="-40" cy="-80" r="8" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad)" strokeWidth="3" />
                
                {/* Node 4 (Connected to Node 2) */}
                <line x1="-60" y1="70" x2="-100" y2="20" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="3" fill="#ef375c" filter="url(#glow)"
                  animate={{ cx: [-60, -100, -100], cy: [70, 20, 20], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.3, 1], repeat: Infinity, delay: 2.0 }}
                />
                <circle cx="-100" cy="20" r="6" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad)" strokeWidth="2" />
              </g>

              {/* Central Node (The 'Land') */}
              <motion.circle
                cx="0" cy="0" r="15"
                fill="url(#brandGrad)"
                filter="url(#glow)"
                animate={{ scale: [1, 1.3, 1, 1] }}
                transition={{ duration: 3, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 1 }}
              />
            </g>

            {/* Falling Pulse (The 'Drop') */}
            <motion.g
              animate={{ 
                y: [-50, 350, 350], 
                opacity: [0, 1, 0] 
              }}
              transition={{ 
                duration: 3, 
                times: [0, 0.33, 1], 
                repeat: Infinity,
                ease: "easeIn"
              }}
            >
              <path d="M 398 -60 L 402 -60 L 400 0 Z" fill="url(#tailGrad)" />
              <circle cx="400" cy="0" r="6" fill="#ef375c" filter="url(#glow)" />
            </motion.g>
          </svg>
        </div>
      </div>
    </div>
  );
}
