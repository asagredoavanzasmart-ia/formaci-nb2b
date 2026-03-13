import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flag } from 'lucide-react';

const redFlags = [
  {
    id: 1,
    title: 'Falta de información',
    desc: 'Preguntas sin respuesta sobre la venta, presupuesto o jugadores clave.',
    actionTitle: 'Buscar Coaching / Preguntar',
    actionDesc: 'Recurrir a un Coach interno/externo. Formular preguntas directas o indirectas para aclarar el panorama.'
  },
  {
    id: 2,
    title: 'Incertidumbre de información',
    desc: 'Tienes datos, pero no estás 100% seguro de su veracidad o significado.',
    actionTitle: 'Verificar y Triangular',
    actionDesc: 'No actúes por suposiciones. Usa tu red de Coaches para contrastar; haz una prueba de realidad.'
  },
  {
    id: 3,
    title: 'Influencia NO contactada',
    desc: 'Alguien con poder en la decisión a quien nadie le ha presentado la propuesta.',
    actionTitle: 'Venta de rango similar o delegar',
    actionDesc: 'Asegúrate de que la base sea cubierta. Usa a un ejecutivo de tu empresa o a un Coach interno para el contacto.'
  },
  {
    id: 4,
    title: 'Cara nueva o Reorganización',
    desc: 'Cambios de personal, fusiones, despidos o nuevos roles en el cliente.',
    actionTitle: 'Reevaluar el mapa',
    actionDesc: 'Nunca des por sentado a un nuevo jugador. Identifica quién juega cada rol e intenta convertirlos en patrocinadores.'
  },
  {
    id: 5,
    title: 'Bloqueo al C. Económico',
    desc: 'Un Comprador Técnico o Usuario impide tu acceso a quien firma los cheques.',
    actionTitle: 'Apalancamiento',
    actionDesc: 'Demuéstrale que llevarte ante el Comprador Económico le dará crédito. Rodearlo es de alto riesgo.'
  },
  {
    id: 6,
    title: 'Comprador en "Equilibrio"',
    desc: 'Satisfecho con su status quo; ve tu propuesta como una molestia.',
    actionTitle: 'Crear discrepancia / Presión',
    actionDesc: 'Demuestra problemas futuros si no actúa, o usa la presión y visión a largo plazo del Comprador Económico.'
  },
  {
    id: 7,
    title: 'Exceso de Confianza',
    desc: 'Cree que sus procesos son inmejorables y rechaza ayuda con arrogancia.',
    actionTitle: 'Espera atenta',
    actionDesc: 'Mantén un perfil bajo y comunicación abierta. Espera a que su sistema falle para entrar y arreglarlo.'
  },
  {
    id: 8,
    title: 'Desconocer el "Win"',
    desc: 'Sabes cómo ayudas a la empresa, pero no el interés personal del individuo.',
    actionTitle: 'Inferir, Preguntar, Entrenar',
    actionDesc: 'Deduce observando, haz preguntas de "actitud", o pídele a tu Coach que revele motivaciones ocultas.'
  },
  {
    id: 9,
    title: 'Coach con info dudosa',
    desc: 'Tu Entrenador no cumple criterios o su información se siente "rara".',
    actionTitle: 'Probar al Coach / Alternativas',
    actionDesc: 'Confía en tu instinto. Cruza la información y, si no es confiable, busca un nuevo Coach.'
  }
];

export default function Slide8({ isDark }: { isDark: boolean }) {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden w-full h-full flex flex-col ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 to-rose-600"></div>
      
      <div className="text-center mb-2 sm:mb-4 shrink-0">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
          <Flag className="text-red-500" size={28} fill="currentColor" /> Banderas Rojas
        </h2>
        <p className={`text-[11px] sm:text-xs max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Haz clic en cada bandera para descubrir la acción recomendada.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 min-h-0">
        {redFlags.map((flag) => {
          const isFlipped = flipped === flag.id;
          return (
            <div 
              key={flag.id}
              className="relative w-full h-full [perspective:1000px] cursor-pointer group"
              onClick={() => setFlipped(isFlipped ? null : flag.id)}
            >
              <motion.div
                className="w-full h-full relative [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              >
                {/* Front */}
                <div className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center text-center border transition-colors ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a] group-hover:border-red-500/50' : 'bg-red-50 border-red-100 group-hover:border-red-300'}`}>
                  <Flag className="text-red-500 mb-1 shrink-0" size={20} />
                  <h3 className={`font-bold text-[11px] sm:text-xs mb-0.5 leading-tight ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{flag.title}</h3>
                  <p className={`text-[10px] leading-tight ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{flag.desc}</p>
                </div>

                {/* Back */}
                <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center text-center border ${isDark ? 'bg-gradient-to-br from-red-900/40 to-rose-900/40 border-red-500/30' : 'bg-gradient-to-br from-red-500 to-rose-500 border-red-600 text-white'}`}>
                  <h3 className={`font-bold text-[11px] sm:text-xs mb-0.5 leading-tight ${isDark ? 'text-red-400' : 'text-white'}`}>{flag.actionTitle}</h3>
                  <p className={`text-[10px] leading-tight ${isDark ? 'text-gray-300' : 'text-red-50'}`}>{flag.actionDesc}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
