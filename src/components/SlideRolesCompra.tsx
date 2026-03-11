import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Users, Shield, Compass, TrendingUp, AlertTriangle, Search, Briefcase, Scale, Calculator, Landmark, UserCheck, MessageSquare, Target, Settings, Wrench, HeartHandshake, Info } from 'lucide-react';

type RoleData = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    detailTitle: string;
    detailText: string;
  }[];
};

const roles: RoleData[] = [
  {
    id: 'economico',
    title: 'Comprador Económico',
    subtitle: 'El Guardián del Presupuesto',
    icon: DollarSign,
    description: 'Figura central que libera fondos y asegura el ROI. Solo existe uno por objetivo de venta. Tiene poder de veto unilateral, pero recuerde: él no usará su producto día a día.',
    items: [
      {
        id: 'q1',
        label: '¿Retorno de inversión?',
        icon: TrendingUp,
        detailTitle: 'Lo que debes demostrar',
        detailText: 'Impacto positivo en los resultados financieros (Bottom-line). El rendimiento debe justificar el costo.'
      },
      {
        id: 'q2',
        label: '¿Estabilidad organizacional?',
        icon: Shield,
        detailTitle: 'Lo que debes demostrar',
        detailText: 'Que la solución es un uso discrecional de recursos justificado y no representa un riesgo inmanejable.'
      },
      {
        id: 'q3',
        label: '¿Podemos encontrar el dinero?',
        icon: Search,
        detailTitle: 'Lo que debes demostrar',
        detailText: 'Que el rendimiento justifica el costo y el riesgo sobre otras opciones prioritarias.'
      },
      {
        id: 'f1',
        label: 'Monto y Condiciones',
        icon: Briefcase,
        detailTitle: 'Factores de Jerarquía',
        detailText: 'A mayor inversión, más arriba reside el rol. En tiempos de recesión, la aprobación sube a niveles de CEO.'
      },
      {
        id: 'f2',
        label: 'Experiencia e Impacto',
        icon: Target,
        detailTitle: 'Factores de Riesgo',
        detailText: 'Si no hay confianza histórica o el producto es nuevo, el rol sube. Proyectos que alteran la cultura requieren la firma del nivel más alto.'
      }
    ]
  },
  {
    id: 'usuario',
    title: 'Comprador de Usuario',
    subtitle: 'El que "Vive" con la Solución',
    icon: Users,
    description: 'Vincula su éxito personal al producto. Su evaluación es subjetiva. Busca un Resultado (impacto en el negocio) y un Win (ganancia personal). Ignorarlo genera el sabotaje más letal.',
    items: [
      {
        id: 'u1',
        label: 'Operatividad',
        icon: Settings,
        detailTitle: 'Operatividad',
        detailText: '¿Es fácil de usar o me hará trabajar más? El usuario necesita saber que la solución simplificará su día a día.'
      },
      {
        id: 'u2',
        label: 'Confiabilidad',
        icon: Shield,
        detailTitle: 'Confiabilidad',
        detailText: '¿Fallará constantemente dejándome en evidencia? Buscan garantías de que el sistema será estable.'
      },
      {
        id: 'u3',
        label: 'Mantenimiento',
        icon: Wrench,
        detailTitle: 'Mantenimiento',
        detailText: '¿Qué tan complejo será el soporte post-venta? Quieren saber que no se quedarán solos si algo sale mal.'
      },
      {
        id: 'u4',
        label: 'Moral del equipo',
        icon: HeartHandshake,
        detailTitle: 'Moral del equipo',
        detailText: '¿Mis subordinados aceptarán el cambio o habrá rotación? El impacto humano es una preocupación clave.'
      }
    ]
  },
  {
    id: 'tecnico',
    title: 'Comprador Técnico',
    subtitle: 'El Guardián de la Puerta (El Filtro)',
    icon: Shield,
    description: 'Juez de las especificaciones. Su único objetivo es descartar. Tienen poder de veto absoluto basado en criterios objetivos, pero carecen del poder para decir "Sí" al cierre final.',
    items: [
      {
        id: 't1',
        label: 'Abogados',
        icon: Scale,
        detailTitle: 'Filtro Legal',
        detailText: 'Evalúan cláusulas de responsabilidad, riesgos legales y contratos. Pueden vetar si perciben vulnerabilidad.'
      },
      {
        id: 't2',
        label: 'Contadores',
        icon: Calculator,
        detailTitle: 'Filtro Financiero',
        detailText: 'Analizan términos de crédito, viabilidad y la salud financiera del proveedor.'
      },
      {
        id: 't3',
        label: 'Agencias Gob.',
        icon: Landmark,
        detailTitle: 'Filtro Regulatorio',
        detailText: 'Verifican el cumplimiento de regulaciones estrictas (FAA, ISO, normas sanitarias, etc).'
      },
      {
        id: 't4',
        label: 'Recursos Humanos',
        icon: UserCheck,
        detailTitle: 'Filtro de Personal',
        detailText: 'Evalúan si la solución cumple con las políticas internas de personal y cultura organizacional.'
      },
      {
        id: 't5',
        label: 'Diferencia de Poder',
        icon: AlertTriangle,
        detailTitle: 'Veto vs Aprobación',
        detailText: 'El Técnico tiene Poder de Veto (Solo dice "No"). El Económico tiene Aprobación Unilateral (Dice "Sí").'
      }
    ]
  },
  {
    id: 'coach',
    title: 'El Coach',
    subtitle: 'Tu Brújula dentro del Proceso',
    icon: Compass,
    description: 'Se desarrolla, no se encuentra por accidente. Su foco es tu éxito con esta propuesta específica. ADVERTENCIA: No delegue su trabajo en el Coach; usted corre las jugadas, él explica el campo.',
    items: [
      {
        id: 'c1',
        label: 'Credibilidad con usted',
        icon: UserCheck,
        detailTitle: 'Confianza Mutua',
        detailText: 'Usted confía plenamente en la información que el Coach le proporciona sobre la cuenta y el proceso.'
      },
      {
        id: 'c2',
        label: 'Credibilidad interna',
        icon: Shield,
        detailTitle: 'Respeto Organizacional',
        detailText: 'La organización (y especialmente el Comprador) lo escucha y respeta su opinión.'
      },
      {
        id: 'c3',
        label: 'Deseo de su éxito',
        icon: Target,
        detailTitle: 'Win Personal',
        detailText: 'Le interesa que usted gane porque su solución le hace quedar bien o cumple su propia agenda.'
      },
      {
        id: 'c4',
        label: 'Pedir Referencia',
        icon: AlertTriangle,
        detailTitle: 'Enfoque Incorrecto',
        detailText: '"¿Puedes presentarme al dueño y decirle que somos los mejores?" - Esto delega la venta y quema credibilidad.'
      },
      {
        id: 'c5',
        label: 'Pedir Coaching',
        icon: MessageSquare,
        detailTitle: 'Enfoque Correcto',
        detailText: '"¿Cómo podemos asegurar que esta solución sea vista como prioridad?" - Busca dirección, no que hagan tu trabajo.'
      }
    ]
  }
];

const FlipCard = ({ item, isDark }: { item: any, isDark: boolean, key?: string | number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-24 sm:h-28 cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front of Card */}
        <div 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-3 rounded-2xl border shadow-sm transition-colors ${isDark ? 'bg-[#1e1e1e] border-[#333] group-hover:border-[#ff851d]/50' : 'bg-gray-50 border-gray-200 group-hover:border-[#ff851d]/50'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <item.icon size={24} className="text-[#ff851d] mb-2" />
          <span className={`text-xs sm:text-sm font-bold text-center leading-tight ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {item.label}
          </span>
          <span className={`text-[10px] mt-2 uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`}>
            Ver detalle
          </span>
        </div>

        {/* Back of Card */}
        <div 
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 rounded-2xl border shadow-md ${isDark ? 'bg-[#2a2a2a] border-[#ff851d]' : 'bg-orange-50 border-[#ff851d]'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className={`text-[11px] sm:text-xs text-center leading-snug font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
            {item.detailText}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function SlideRolesCompra({ isDark }: { isDark: boolean }) {
  const [activeTab, setActiveTab] = useState(roles[0].id);

  const activeRole = roles.find(r => r.id === activeTab) || roles[0];

  return (
    <div className={`p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="shrink-0 mb-6 z-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
          Los 4 Roles de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Venta Compleja</span>
        </h2>
        <p className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Identifica a cada actor clave. <span className="font-bold text-[#ff851d]">Pasa el cursor sobre las tarjetas</span> para ver los detalles sin necesidad de desplazarte.
        </p>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 z-10 min-h-0">
        
        {/* Left: Vertical Tabs */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 shrink-0 justify-center">
          {roles.map((role) => {
            const isActive = activeTab === role.id;
            const Icon = role.icon;

            return (
              <button
                key={role.id}
                onClick={() => setActiveTab(role.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isActive 
                    ? (isDark ? 'bg-[#2a2a2a] border-[#ff851d] shadow-md' : 'bg-white border-[#ff851d] shadow-md')
                    : (isDark ? 'bg-[#222] border-[#333] hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300')
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 transition-colors duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-md shadow-red-500/30' 
                    : isDark ? 'bg-[#3a3a3a] text-gray-400' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {role.title}
                  </h3>
                  <p className={`text-[11px] mt-0.5 leading-tight ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {role.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Dynamic Content Panel */}
        <div className="w-full md:w-2/3 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex-1 p-5 md:p-6 rounded-3xl border flex flex-col shadow-lg overflow-hidden ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'}`}
            >
              <div className="flex items-center gap-3 mb-3 shrink-0">
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30">
                  <activeRole.icon size={24} />
                </div>
                <div>
                  <h3 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {activeRole.title}
                  </h3>
                  <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activeRole.subtitle}
                  </p>
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed mb-4 shrink-0 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {activeRole.description}
              </p>
              
              {/* Flip Cards Grid - Completely eliminates vertical scroll */}
              <div className="flex-1 flex flex-col justify-center min-h-0">
                <div className={`grid gap-2 sm:gap-3 ${activeRole.items.length > 4 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
                  {activeRole.items.map((item, idx) => (
                    <FlipCard key={item.id || idx} item={item} isDark={isDark} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
