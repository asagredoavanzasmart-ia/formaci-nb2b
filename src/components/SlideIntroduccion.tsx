import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Target, Lightbulb } from 'lucide-react';

const IntroCard = ({ title, description, icon: Icon, isDark, delay }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative w-full h-64 sm:h-72 cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 rounded-3xl border shadow-lg transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#333] group-hover:border-[#ff851d]/50' : 'bg-white border-gray-200 group-hover:border-[#ff851d]/50'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`p-4 rounded-2xl mb-4 ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
            <Icon size={40} className="text-[#ff851d]" />
          </div>
          <h3 className={`text-xl sm:text-2xl font-bold text-center uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]`}>
            {title}
          </h3>
          <span className={`mt-6 text-sm uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Descubrir
          </span>
        </div>

        {/* Back */}
        <div 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 rounded-3xl border shadow-xl ${isDark ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] border-[#ff851d]' : 'bg-gradient-to-br from-orange-50 to-white border-[#ff851d]'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className={`text-lg font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm sm:text-base text-center leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SlideIntroduccion({ isDark }: { isDark: boolean }) {
  const cards = [
    {
      title: 'Definición',
      description: 'Una "Venta Compleja" es aquella donde varias personas deben dar su aprobación antes de que la compra se concrete.',
      icon: BookOpen
    },
    {
      title: 'El Desafío',
      description: 'La estructura corporativa cambia constantemente. Una buena relación con una sola persona ya no es suficiente para asegurar el éxito.',
      icon: Target
    },
    {
      title: 'La Solución',
      description: 'Dejar de buscar "títulos" en el organigrama y comenzar a identificar estratégicamente los Roles de Compra clave.',
      icon: Lightbulb
    }
  ];

  return (
    <div className={`p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full justify-center ${isDark ? 'bg-[#121212] shadow-black/60 border border-[#2a2a2a]' : 'bg-[#f8f9fa] shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-12 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Introducción a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Venta Compleja</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Pasa el cursor sobre las tarjetas para descubrir los conceptos fundamentales.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 z-10 w-full max-w-5xl mx-auto">
        {cards.map((card, index) => (
          <IntroCard 
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            isDark={isDark}
            delay={0.3 + index * 0.15}
          />
        ))}
      </div>
    </div>
  );
}
