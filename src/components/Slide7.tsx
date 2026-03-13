import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EyeOff, Skull, Compass } from 'lucide-react';

const cards = [
  {
    id: 'factor',
    title: 'Factor oculto: el cambio',
    icon: EyeOff,
    color: 'from-[#ff512f] to-[#dd2476]',
    content: [
      'Tu ves la propuesta como una solución o ayuda, ellos la pueden ver como una amenaza.',
      'No importa tanto el ajuste técnico si lo ven como una amenaza al status quo.'
    ]
  },
  {
    id: 'trampas',
    title: 'Las trampas fatales',
    icon: Skull,
    color: 'from-[#f12711] to-[#f5af19]',
    content: [
      '1. Creer que tu propia percepción de la realidad es la clave de la venta.',
      '2. Asumir que el comprador comparte tu percepción de la realidad.',
      '3. Reconocer que la percepción del comprador es diferente, pero concluir que está equivocado o que su opinión es irrelevante.'
    ]
  },
  {
    id: 'realidad',
    title: 'La realidad',
    icon: Compass,
    color: 'from-[#ff851d] to-[#ef375c]',
    content: [
      'No es ni su filosofía ni su personalidad. Es como percibe su situación comercial inmediata que piensa que sucederá si acepta el cambio.',
      'Determina los 4 modos de respuesta: Crecimiento, Problemas, Equilibrio o Exceso de Confianza.'
    ]
  }
];

export default function Slide7({ isDark }: { isDark: boolean }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className={`p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"></div>
      
      <div className="text-center mb-4 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
          Nivel de receptividad
        </h2>
        <p className={`text-xs sm:text-sm max-w-2xl mx-auto leading-tight ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Antes de intentar vender, diagnostica cómo se siente cada comprador respecto a su situación actual y al cambio.
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch justify-center min-h-0">
        {cards.map((card) => {
          const isHovered = hoveredCard === card.id;
          return (
            <motion.div
              key={card.id}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`flex-1 rounded-2xl sm:rounded-3xl overflow-hidden relative flex flex-col transition-all duration-500 ${isHovered ? 'scale-105 z-10 shadow-2xl' : 'scale-100 z-0 shadow-lg'} ${isDark ? 'bg-[#2a2a2a] border border-[#3a3a3a]' : 'bg-white border border-gray-100'}`}
            >
              <div className={`p-3 sm:p-4 text-center text-white bg-gradient-to-br ${card.color} relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <card.icon size={28} className="mx-auto mb-1 relative z-10 opacity-90" />
                <h3 className="text-base sm:text-lg font-bold relative z-10 leading-tight">{card.title}</h3>
              </div>
              
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-center gap-2 sm:gap-3 overflow-hidden">
                {card.content.map((text, idx) => (
                  <p key={idx} className={`text-center text-[11px] sm:text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
