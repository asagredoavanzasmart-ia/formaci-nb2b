import React from 'react';
import { motion } from 'motion/react';

interface SkillBar {
  label: string;
  landing: number;  // 0-100
  expansion: number;
}

const metrics: SkillBar[] = [
  { label: 'Presupuesto requerido', landing: 25, expansion: 90 },
  { label: 'Complejidad del proceso', landing: 30, expansion: 85 },
  { label: 'Tiempo de espera (ciclo)', landing: 20, expansion: 75 },
  { label: 'Velocidad de facturación', landing: 90, expansion: 35 },
];

function MetricBar({ metric, isDark, delay }: { metric: SkillBar, isDark: boolean, delay: number, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="mb-3"
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {metric.label}
        </span>
      </div>
      {/* Landing bar */}
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-sm font-bold w-20 shrink-0 text-right ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`}>
          Aterrizaje
        </span>
        <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-100'}`}>
          <motion.div
            className="h-full rounded-full bg-[#ff851d]"
            initial={{ width: 0 }}
            animate={{ width: `${metric.landing}%` }}
            transition={{ delay: delay + 0.2, duration: 0.7, ease: 'easeOut' }}
          />
        </div>
        <span className={`text-sm font-bold w-8 shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {metric.landing}%
        </span>
      </div>
      {/* Expansion bar */}
      <div className="flex items-center gap-2">
        <span className={`text-sm font-bold w-20 shrink-0 text-right ${isDark ? 'text-[#ef375c]' : 'text-[#ef375c]'}`}>
          Expansión
        </span>
        <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#3a3a3a]' : 'bg-gray-100'}`}>
          <motion.div
            className="h-full rounded-full bg-[#ef375c]"
            initial={{ width: 0 }}
            animate={{ width: `${metric.expansion}%` }}
            transition={{ delay: delay + 0.35, duration: 0.7, ease: 'easeOut' }}
          />
        </div>
        <span className={`text-sm font-bold w-8 shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {metric.expansion}%
        </span>
      </div>
    </motion.div>
  );
}

export default function Slide10({ isDark }: { isDark: boolean }) {
  return (
    <div className={`p-5 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"></div>
      
      <div className="mb-4 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 mt-1">
          Estrategia: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Aterrizaje y Expansión</span>
        </h2>
        <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Entrar con agilidad, generar confianza y expandir la influencia.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-5 min-h-0">
        {/* Left side: Text + Skill Bars */}
        <div className="w-full md:w-[45%] flex flex-col gap-4 min-h-0 overflow-y-auto custom-scrollbar pr-1">
          
          {/* Phase cards */}
          <div className="flex gap-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex-1 p-3 rounded-2xl border-l-4 border-[#ff851d] ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-orange-50 text-gray-700'}`}
            >
              <h3 className="font-bold text-sm mb-1 text-[#ff851d]">1. Aterrizaje</h3>
              <p className="text-sm leading-relaxed">Producto de menor valor, ciclo corto. Objetivo: hacer caja rápida y ganar confianza inicial.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className={`flex-1 p-3 rounded-2xl border-l-4 border-[#ef375c] ${isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-rose-50 text-gray-700'}`}
            >
              <h3 className="font-bold text-sm mb-1 text-[#ef375c]">2. Expansión</h3>
              <p className="text-sm leading-relaxed">Desarrollar al Coach interno. Mayor presupuesto, mayor complejidad y tiempos más largos.</p>
            </motion.div>
          </div>

          {/* Skill Bars */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center gap-4 mb-3">
              <h4 className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Comparativa de métricas</h4>
              <div className="flex items-center gap-3 ml-auto shrink-0">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1.5 rounded-full bg-[#ff851d]"></div>
                  <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Aterrizaje</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1.5 rounded-full bg-[#ef375c]"></div>
                  <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expansión</span>
                </div>
              </div>
            </div>

            {metrics.map((m, i) => (
              <MetricBar key={m.label} metric={m} isDark={isDark} delay={0.3 + i * 0.12} />
            ))}
          </div>
        </div>

        {/* Right side: Isometric SVG Animation */}
        <div className="w-full md:w-[55%] relative flex items-center justify-center rounded-3xl overflow-hidden min-h-0">
          <svg viewBox="0 0 800 600" className="w-full h-full max-h-[400px] drop-shadow-2xl">
            <defs>
              <linearGradient id="brandGrad10" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff851d" />
                <stop offset="100%" stopColor="#ef375c" />
              </linearGradient>
              <linearGradient id="tailGrad10" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff851d" stopOpacity="0" />
                <stop offset="100%" stopColor="#ef375c" stopOpacity="1" />
              </linearGradient>
              <filter id="glow10" x="-20%" y="-20%" width="140%" height="140%">
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
                stroke="url(#brandGrad10)"
                strokeWidth="4"
                animate={{ r: [0, 150, 150], opacity: [1, 0, 0] }}
                transition={{ duration: 3, times: [0, 0.66, 1], repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
              <motion.circle
                cx="0" cy="0" r="0"
                fill="none"
                stroke="url(#brandGrad10)"
                strokeWidth="2"
                animate={{ r: [0, 150, 150], opacity: [1, 0, 0] }}
                transition={{ duration: 3, times: [0, 0.66, 1], repeat: Infinity, ease: "easeOut", delay: 1.2 }}
              />

              {/* Connected Nodes (The 'Expand') */}
              <g>
                {/* Node 1 */}
                <line x1="0" y1="0" x2="80" y2="40" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="4" fill="#ff851d" filter="url(#glow10)"
                  animate={{ cx: [0, 80, 80], cy: [0, 40, 40], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.3, 1], repeat: Infinity, delay: 1.2 }}
                />
                <circle cx="80" cy="40" r="10" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad10)" strokeWidth="3" />
                
                {/* Node 2 */}
                <line x1="0" y1="0" x2="-60" y2="70" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="4" fill="#ef375c" filter="url(#glow10)"
                  animate={{ cx: [0, -60, -60], cy: [0, 70, 70], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.4, 1], repeat: Infinity, delay: 1.3 }}
                />
                <circle cx="-60" cy="70" r="12" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad10)" strokeWidth="3" />

                {/* Node 3 */}
                <line x1="0" y1="0" x2="-40" y2="-80" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="4" fill="#ff851d" filter="url(#glow10)"
                  animate={{ cx: [0, -40, -40], cy: [0, -80, -80], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.35, 1], repeat: Infinity, delay: 1.1 }}
                />
                <circle cx="-40" cy="-80" r="8" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad10)" strokeWidth="3" />
                
                {/* Node 4 (Connected to Node 2) */}
                <line x1="-60" y1="70" x2="-100" y2="20" stroke={isDark ? '#4a4a4a' : '#d1d5db'} strokeWidth="2" />
                <motion.circle r="3" fill="#ef375c" filter="url(#glow10)"
                  animate={{ cx: [-60, -100, -100], cy: [70, 20, 20], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, times: [0, 0.3, 1], repeat: Infinity, delay: 2.0 }}
                />
                <circle cx="-100" cy="20" r="6" fill={isDark ? '#1e1e1e' : '#fff'} stroke="url(#brandGrad10)" strokeWidth="2" />
              </g>

              {/* Central Node (The 'Land') */}
              <motion.circle
                cx="0" cy="0" r="15"
                fill="url(#brandGrad10)"
                filter="url(#glow10)"
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
              <path d="M 398 -60 L 402 -60 L 400 0 Z" fill="url(#tailGrad10)" />
              <circle cx="400" cy="0" r="6" fill="#ef375c" filter="url(#glow10)" />
            </motion.g>
          </svg>
        </div>
      </div>
    </div>
  );
}
