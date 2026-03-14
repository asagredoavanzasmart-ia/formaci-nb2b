import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, User, Settings, Shield, Building2, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SlideWinResultsPerfiles({ isDark }: { isDark: boolean }) {
  const [activeProfile, setActiveProfile] = useState<string>('economico');

  const profiles = [
    {
      id: 'economico',
      title: 'Comprador Económico',
      icon: DollarSign,
      color: 'from-[#ff851d] to-[#ef375c]',
      focus: 'Impacto final en la organización (bottom line) y estabilidad a largo plazo.',
      resultados: [
        'Bajo costo de propiedad (Low cost of ownership)',
        'Buen ajuste al presupuesto al que tiene acceso',
        'Retorno de Inversión (ROI) y Rentabilidad',
        'Responsabilidad financiera y estabilizar flujo de caja',
        'Mantener equilibrio entre capex y opex'
      ],
      ganancias: [
        'Ser visto como un líder visionario',
        'Aumentar su poder o ganar una batalla interna',
        'Obtener reconocimiento en su industria',
        'Asegurar su propio crecimiento o bono ejecutivo',
        'Movilidad interna (plan de carrera)'
      ]
    },
    {
      id: 'usuario',
      title: 'Comprador Usuario',
      icon: User,
      color: 'from-orange-400 to-red-400',
      focus: 'El trabajo diario y cómo el producto afectará el desempeño de su departamento.',
      resultados: [
        'Confiabilidad en la operación',
        'Mejora de las habilidades de su equipo',
        'Mayor eficiencia y cumplimiento de metas',
        'Mayor productividad',
        'Hacer el trabajo mejor, más rápido o más fácil',
        'Versatilidad y facilidad de aprendizaje'
      ],
      ganancias: [
        'Sentir mayor seguridad y tener menos estrés',
        'Lograr salir temprano para pasar tiempo con su familia',
        'No tener que resolver problemas de última hora',
        'Ser percibido como un solucionador de problemas',
        'Desarrollarse en un área de interés'
      ]
    },
    {
      id: 'tecnico',
      title: 'Comprador Técnico',
      icon: Settings,
      color: 'from-gray-500 to-gray-700',
      focus: 'Las especificaciones. Actúa como filtro o portero de la organización.',
      resultados: [
        'Que se cumplan estrictamente las especificaciones',
        'Entregas puntuales',
        'Asegurar la mejor solución técnica disponible',
        'Conseguir descuentos o el mejor precio',
        'Garantizar la confiabilidad del producto'
      ],
      ganancias: [
        'Mejorar su reputación por hacer una evaluación impecable',
        'Evitar riesgos laborales (sentirse a salvo)',
        'Aumentar su autoestima demostrando su experiencia',
        'Obtener autonomía'
      ]
    },
    {
      id: 'coach',
      title: 'El Entrenador (Coach)',
      icon: Shield,
      color: 'from-gray-600 to-gray-700',
      focus: 'No tiene Resultados corporativos propios en tu venta. Su "Resultado" es que tú tengas éxito.',
      resultados: [
        'El Coach es un caso especial.',
        'No busca un resultado corporativo directo de la solución.',
        'Su único "Resultado" es que tú logres cerrar el trato exitosamente.'
      ],
      ganancias: [
        'Obtener reconocimiento y visibilidad en la empresa',
        'Recibir elogios ("strokes") por traer una buena solución',
        'Hacer una contribución importante',
        'Ser visto internamente como un solucionador de problemas'
      ]
    }
  ];

  const activeData = profiles.find(p => p.id === activeProfile);

  return (
    <div className={`w-full h-full flex flex-col p-6 md:p-8 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="shrink-0 mb-6 z-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">
          Resultados y Ganancias <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">por Perfil</span>
        </h2>
        <p className={`text-sm md:text-base max-w-4xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Las empresas obtienen Resultados (tangibles, corporativos), pero solo las personas obtienen Ganancias (subjetivas, personales).
        </p>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 z-10 min-h-0">
        
        {/* Left: Vertical Tabs */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(profile.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                activeProfile === profile.id 
                  ? (isDark ? 'bg-[#2a2a2a] border-[#ff851d] shadow-md' : 'bg-orange-50 border-[#ff851d] shadow-md')
                  : (isDark ? 'bg-[#222] border-[#333] hover:border-gray-500' : 'bg-white border-gray-100 hover:border-gray-300')
              }`}
            >
              <div className={`p-2.5 rounded-xl text-white shadow-md shrink-0 bg-gradient-to-br ${profile.color}`}>
                <profile.icon size={20} />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {profile.title}
                </h3>
                <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Ver detalles <ArrowRight size={10} className="inline" />
                </p>
              </div>
            </button>
          ))}
          
          <div className={`mt-2 p-3 rounded-2xl border ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
            <p className={`text-sm italic leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <strong>Nota vital:</strong> Aunque los Resultados son comunes por perfil, las Ganancias son únicas para cada individuo.
            </p>
          </div>
        </div>

        {/* Right: Dynamic Content Panel */}
        <div className="w-full md:w-2/3 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full gap-4"
              >
                {/* Focus Banner */}
                <div className={`p-4 rounded-2xl border flex items-center gap-3 shadow-sm ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}>
                  <div className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${activeData.color}`}></div>
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Enfoque Principal</h4>
                    <p className={`text-sm md:text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{activeData.focus}</p>
                  </div>
                </div>

                {/* Split View: Resultados vs Ganancias */}
                <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
                  
                  {/* Resultados Corporativos */}
                  <div className={`flex-1 p-5 rounded-3xl border flex flex-col overflow-y-auto custom-scrollbar ${isDark ? 'bg-[#222] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                        <Building2 size={20} />
                      </div>
                      <h4 className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Resultados Corporativos</h4>
                    </div>
                    <ul className="space-y-3">
                      {activeData.resultados.map((res, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                          <span className={`text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ganancias Personales */}
                  <div className={`flex-1 p-5 rounded-3xl border flex flex-col overflow-y-auto custom-scrollbar ${isDark ? 'bg-[#2a2a2a] border-[#ff851d]/30' : 'bg-orange-50/50 border-orange-200'}`}>
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-md">
                        <Heart size={20} />
                      </div>
                      <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Ganancias Personales</h4>
                    </div>
                    <ul className="space-y-3">
                      {activeData.ganancias.map((gan, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#ff851d]" />
                          <span className={`text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{gan}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
