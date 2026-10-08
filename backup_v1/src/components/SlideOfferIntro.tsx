import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Puzzle, 
  Lightbulb, 
  Target, 
  Zap, 
  CheckCircle,
  Gem,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Layout,
  Scale,
  Flame,
  Rocket
} from 'lucide-react';

export default function SlideOfferIntro({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState(0);

  const concepts = [
    {
      title: 'La Ecuación de Valor',
      icon: Scale,
      desc: 'No vendes tiempo ni servicios. Vendes un Resultado Soñado multiplicado por la certeza de lograrlo, dividido por el esfuerzo.',
      quote: 'Si el divisor es cero, el valor de tu oferta es infinito.'
    },
    {
      title: 'Arquitectura Trim & Stack',
      icon: Layout,
      desc: 'Desglosamos cada obstáculo del cliente y lo convertimos en un entregable de alto valor y bajo costo operativo para ti.',
      quote: 'Elimina lo que te cuesta y no le suma al cliente.'
    },
    {
      title: 'Potenciadores Psicológicos',
      icon: Flame,
      desc: 'Inyectamos escasez, urgencia y garantías que eliminan el riesgo de compra, haciendo que decir "No" sea un error lógico.',
      quote: 'Haz ofertas tan buenas que la gente se sienta estúpida diciendo que no.'
    }
  ];

  const baseClass = isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';

  return (
    <div className={`p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${baseClass}`}>
      {/* Visual background elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#ff851d]/10 to-transparent blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#ef375c]/10 to-transparent blur-3xl rounded-full" />

      <div className="shrink-0 mb-10 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Dominando la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Oferta Irresistible</span>
        </h2>
        <div className="h-1.5 w-40 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full mb-4"></div>
        <p className={`text-lg font-medium opacity-60 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Basado en la metodología <strong>Grand Slam Offer</strong>: Cómo cobrar 10x más justificando un valor 100x mayor.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 min-h-0 items-center">
        {concepts.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`h-full group p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center text-center justify-between ${
              isDark 
                ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-[#ff851d]/30' 
                : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-2xl hover:border-[#ff851d]/30'
            }`}
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] flex items-center justify-center text-white mb-6 shadow-xl group-hover:rotate-6 transition-transform">
              <item.icon size={36} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-black mb-3 italic">{item.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.desc}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border italic text-[10px] leading-relaxed font-black uppercase tracking-wider ${isDark ? 'bg-black/20 border-white/5 text-gray-400' : 'bg-white border-black/5 text-gray-500 shadow-sm'}`}>
              "{item.quote}"
            </div>
          </motion.div>
        ))}
      </div>

      <div className="shrink-0 mt-10 flex flex-col items-center gap-4 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Blueprint de 5 Fases</p>
        <div className="flex items-center gap-6">
          {[
            { n: 1, label: 'Valor' },
            { n: 2, label: 'Estructura' },
            { n: 3, label: 'Potencia' },
            { n: 4, label: 'Naming' },
            { n: 5, label: 'Render' }
          ].map((s, idx) => (
            <React.Fragment key={s.n}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#ff851d] text-[#ff851d] font-black shadow-lg shadow-orange-500/10`}>
                  {s.n}
                </div>
                <span className="text-[9px] font-black mt-2 opacity-50 uppercase">{s.label}</span>
              </div>
              {idx < 4 && <div className="w-8 h-0.5 bg-gradient-to-r from-[#ff851d] to-[#ef375c] opacity-20" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
