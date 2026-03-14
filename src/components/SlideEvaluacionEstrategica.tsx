import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckSquare, Square, BarChart2, Lightbulb, Target, Users, ShieldAlert,
  TrendingUp, ChevronDown, ChevronUp, RefreshCw, CheckCircle2
} from 'lucide-react';

// ─── Preguntas de la Evaluación Estratégica ──────────────────────────────────
type EvalQuestion = {
  id: string;
  text: string;
  category: string;
  icon: React.ElementType;
  weight: number;
  tooltip: string;
};

const preguntas: EvalQuestion[] = [
  {
    id: 'q1',
    text: '¿He identificado al Comprador Económico real (quien libera el dinero)?',
    category: 'Roles',
    icon: Users,
    weight: 20,
    tooltip: 'El Comprador Económico es la única persona con autoridad para aprobar el presupuesto. Sin identificarlo, el cierre es imposible.',
  },
  {
    id: 'q2',
    text: '¿He escuchado las necesidades personales (Wins) del Comprador Usuario?',
    category: 'Win-Results',
    icon: Target,
    weight: 15,
    tooltip: 'El Comprador Usuario juzga el impacto operativo. Sus "Wins" personales son el motor de su apoyo a la iniciativa.',
  },
  {
    id: 'q3',
    text: '¿Conozco las especificaciones del Comprador Técnico para no ser filtrado?',
    category: 'Roles',
    icon: ShieldAlert,
    weight: 15,
    tooltip: 'El Comprador Técnico puede bloquear la venta si no cumplimos sus criterios de evaluación técnica o de compliance.',
  },
  {
    id: 'q4',
    text: '¿Tengo un Coach confiable que desee mi éxito?',
    category: 'Alianzas',
    icon: Users,
    weight: 20,
    tooltip: 'Un Coach interno que nos guía y comparte información privilegiada es la pieza más valiosa de la estrategia.',
  },
  {
    id: 'q5',
    text: '¿Están mis compradores en modo de Crecimiento o Problema?',
    category: 'Nivel de Receptividad',
    icon: TrendingUp,
    weight: 10,
    tooltip: 'El modo de respuesta del comprador determina cuánto esfuerzo requiere la venta. Crecimiento = win-win. Problema = urgencia.',
  },
  {
    id: 'q6',
    text: '¿He detectado y mitigado todas las Banderas Rojas?',
    category: 'Riesgo',
    icon: ShieldAlert,
    weight: 10,
    tooltip: 'Las Banderas Rojas son señales de alarma que indican que el deal puede estar en riesgo. Ignorarlas lleva a sorpresas negativas.',
  },
  {
    id: 'q7',
    text: '¿Tengo una Razón de Negocio Válida para cada contacto?',
    category: 'Win-Results',
    icon: Lightbulb,
    weight: 10,
    tooltip: 'Cada interacción con un stakeholder debe tener una razón de negocio válida que justifique el tiempo de esa persona.',
  },
];

const categoryColors: Record<string, string> = {
  'Roles': '#ff851d',
  'Win-Results': '#ef375c',
  'Alianzas': '#8b5cf6',
  'Nivel de Receptividad': '#06b6d4',
  'Riesgo': '#f59e0b',
};

// ─── Componente del Gráfico Radar SVG (SVG puro, sin motion en atributos) ────
function RadarChart({
  scores,
  isDark,
}: {
  scores: { label: string; value: number; color: string }[];
  isDark: boolean;
}) {
  const cx = 120;
  const cy = 120;
  const r = 85;
  const n = scores.length;
  const levels = 4;

  // Guard: necesitamos al menos 3 puntos para un polígono válido
  if (n < 3) return null;

  const calcAngle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const point = (i: number, radius: number) => ({
    x: cx + radius * Math.cos(calcAngle(i)),
    y: cy + radius * Math.sin(calcAngle(i)),
  });

  const axisPoints = scores.map((_, i) => point(i, r));
  const valuePoints = scores.map((s, i) => point(i, (s.value / 100) * r));
  const polygonPoints = valuePoints.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

  return (
    <svg viewBox="0 0 240 240" className="w-full h-full max-w-[240px] max-h-[240px]">
      <defs>
        <linearGradient id="radarFill2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff851d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef375c" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="radarStroke2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff851d" />
          <stop offset="100%" stopColor="#ef375c" />
        </linearGradient>
      </defs>

      {/* Grid rings */}
      {Array.from({ length: levels }).map((_, lvl) => {
        const rr = (r / levels) * (lvl + 1);
        const pts = scores
          .map((_, i) => point(i, rr))
          .map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
          .join(' ');
        return (
          <polygon
            key={lvl}
            points={pts}
            fill="none"
            stroke={isDark ? '#3a3a3a' : '#e5e7eb'}
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {axisPoints.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x.toFixed(2)}
          y2={p.y.toFixed(2)}
          stroke={isDark ? '#3a3a3a' : '#e5e7eb'}
          strokeWidth="1"
        />
      ))}

      {/* Value polygon */}
      <polygon
        points={polygonPoints}
        fill="url(#radarFill2)"
        stroke="url(#radarStroke2)"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ transition: 'all 0.5s ease' }}
      />

      {/* Value dots — SVG nativo sin motion para evitar error de atributos */}
      {valuePoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x.toFixed(2)}
          cy={p.y.toFixed(2)}
          r={4}
          fill={scores[i].color}
          stroke={isDark ? '#1e1e1e' : 'white'}
          strokeWidth="2"
          style={{ transition: 'all 0.4s ease' }}
        />
      ))}

      {/* Labels */}
      {axisPoints.map((p, i) => {
        const labelX = cx + (r + 20) * Math.cos(calcAngle(i));
        const labelY = cy + (r + 20) * Math.sin(calcAngle(i));
        const label = scores[i].label;
        return (
          <text
            key={i}
            x={labelX.toFixed(2)}
            y={labelY.toFixed(2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="600"
            fill={isDark ? '#9ca3af' : '#6b7280'}
          >
            {label.length > 9 ? label.slice(0, 8) + '…' : label}
          </text>
        );
      })}
    </svg>
  );
}


// ─── Componente principal ─────────────────────────────────────────────────────
export default function SlideEvaluacionEstrategica({ isDark }: { isDark: boolean }) {
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({});
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [animateBars, setAnimateBars] = useState(false);

  const puntajeTotal = preguntas.reduce((acc, q) => {
    return acc + (respuestas[q.id] ? q.weight : 0);
  }, 0);

  const puntajePorCategoria = preguntas.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = { peso: 0, obtenido: 0 };
    acc[q.category].peso += q.weight;
    if (respuestas[q.id]) acc[q.category].obtenido += q.weight;
    return acc;
  }, {} as Record<string, { peso: number; obtenido: number }>);

  // Garantizamos que siempre haya datos de categoría válidos, incluso antes de marcar respuestas
  const categoriasBase = Array.from(new Set(preguntas.map(q => q.category)));
  const categorias = categoriasBase.map(name => {
    const data = puntajePorCategoria[name] ?? { peso: 1, obtenido: 0 };
    return {
      label: name,
      value: data.peso > 0 ? Math.round((data.obtenido / data.peso) * 100) : 0,
      color: categoryColors[name] ?? '#6b7280',
    };
  });

  const nivel =
    puntajeTotal >= 80
      ? { label: 'Excelente', color: '#10b981', emoji: '🏆' }
      : puntajeTotal >= 55
      ? { label: 'En proceso', color: '#ff851d', emoji: '⚠️' }
      : { label: 'Riesgo alto', color: '#ef375c', emoji: '🚨' };

  const recomendaciones = preguntas
    .filter(q => !respuestas[q.id])
    .slice(0, 3);

  useEffect(() => {
    setAnimateBars(false);
    const t = setTimeout(() => setAnimateBars(true), 50);
    return () => clearTimeout(t);
  }, [respuestas]);

  const resetear = () => setRespuestas({});

  const toggleRespuesta = (id: string) => {
    setRespuestas(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${
        isDark ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]' : 'bg-white shadow-gray-300/60 border border-gray-100'
      }`}
    >
      {/* Fondo decorativo */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ff851d]/8 to-[#ef375c]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-bl from-[#8b5cf6]/8 to-[#06b6d4]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="shrink-0 mb-3 z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">
              Verificación
            </span>
            Estratégica
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Marca cada criterio cumplido. El puntaje y gráfico se actualizan en tiempo real.
          </p>
        </div>
        <button
          onClick={resetear}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
            isDark
              ? 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a] hover:text-white border border-[#3a3a3a]'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 border border-gray-200'
          }`}
        >
          <RefreshCw size={11} /> Reiniciar
        </button>
      </div>

      {/* Cuerpo principal */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden z-10 min-h-0">

        {/* ── Columna izquierda: Checklist ── */}
        <div className="w-full lg:w-[55%] flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1">
          {preguntas.map((q, idx) => {
            const checked = !!respuestas[q.id];
            const isExpanded = expandedTip === q.id;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-xl border overflow-hidden transition-all duration-200 ${
                  checked
                    ? isDark
                      ? 'bg-emerald-900/20 border-emerald-700/50'
                      : 'bg-emerald-50 border-emerald-200'
                    : isDark
                    ? 'bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a]'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 p-2.5">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleRespuesta(q.id)}
                    className="shrink-0 focus:outline-none"
                    aria-label={`Marcar: ${q.text}`}
                  >
                    <motion.div
                      animate={{ scale: checked ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      {checked ? (
                        <CheckSquare
                          size={22}
                          className="text-emerald-500"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Square
                          size={22}
                          className={isDark ? 'text-gray-600' : 'text-gray-300'}
                          strokeWidth={1.5}
                        />
                      )}
                    </motion.div>
                  </button>

                  {/* Ícono de categoría */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: (categoryColors[q.category] ?? '#6b7280') + '22' }}
                  >
                    <q.icon size={14} style={{ color: categoryColors[q.category] ?? '#6b7280' }} />
                  </div>

                  {/* Texto */}
                  <p
                    className={`flex-1 text-sm font-medium leading-snug cursor-pointer ${
                      checked
                        ? isDark
                          ? 'text-emerald-400 line-through'
                          : 'text-emerald-700 line-through'
                        : isDark
                        ? 'text-gray-200'
                        : 'text-gray-800'
                    }`}
                    onClick={() => toggleRespuesta(q.id)}
                  >
                    {q.text}
                  </p>

                  {/* Badge de peso + botón de tip */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="text-sm font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: (categoryColors[q.category] ?? '#6b7280') + '22',
                        color: categoryColors[q.category] ?? '#6b7280',
                      }}
                    >
                      {q.weight}pts
                    </span>
                    <button
                      onClick={() => setExpandedTip(isExpanded ? null : q.id)}
                      className={`p-0.5 rounded transition-colors ${
                        isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  </div>
                </div>

                {/* Tooltip expandible */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`px-4 pb-3 flex items-start gap-2 text-sm leading-relaxed border-t ${
                          isDark ? 'border-[#3a3a3a] text-gray-400' : 'border-gray-100 text-gray-600'
                        }`}
                      >
                        <Lightbulb size={12} className="shrink-0 mt-0.5 text-[#ff851d]" />
                        <span>{q.tooltip}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Columna derecha: layout compacto en 2 secciones ── */}
        <div className="w-full lg:w-[45%] flex flex-col gap-2 min-h-0">

          {/* Fila superior: puntaje + radar lado a lado */}
          <div className="flex gap-2 shrink-0">
            {/* Puntaje */}
            <div className={`flex-1 p-3 rounded-2xl border shadow-sm ${
              isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <BarChart2 size={11} /> Puntaje
                </h3>
                <span className="text-sm font-bold" style={{ color: nivel.color }}>
                  {nivel.emoji} {nivel.label}
                </span>
              </div>
              {/* Número grande */}
              <div className="flex items-end gap-1 mb-2">
                <motion.span
                  key={puntajeTotal}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-black tabular-nums leading-none"
                  style={{ color: nivel.color }}
                >
                  {puntajeTotal}
                </motion.span>
                <span className={`text-sm font-bold mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>/100</span>
              </div>
              {/* Barra global */}
              <div className={`w-full h-2 rounded-full overflow-hidden mb-2 ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #ff851d, #ef375c)' }}
                  initial={{ width: 0 }}
                  animate={{ width: animateBars ? `${puntajeTotal}%` : '0%' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>
              {/* Barras por categoría */}
              <div className="flex flex-col gap-1.5">
                {categorias.map((cat, i) => (
                  <div key={cat.label} className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold w-16 truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{cat.label}</span>
                    <div className={`flex-1 h-1 rounded-full overflow-hidden ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-100'}`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: animateBars ? `${cat.value}%` : '0%' }}
                        transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-sm font-bold tabular-nums w-5 text-right" style={{ color: cat.color }}>
                      {cat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico Radar */}
            <div className={`p-2 rounded-2xl border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'
            }`} style={{ width: '160px', height: '160px' }}>
              <RadarChart scores={categorias} isDark={isDark} />
            </div>
          </div>
          {/* Recomendaciones */}
          <div className={`flex-1 p-3 rounded-2xl border overflow-hidden ${
            isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-1 ${isDark ? 'text-[#ff851d]' : 'text-[#ff851d]'}`}>
              <Lightbulb size={11} /> Acciones Prioritarias
            </h3>

            {recomendaciones.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2 py-3"
              >
                <CheckCircle2 size={32} className="text-emerald-500" />
                <p className={`text-sm font-bold text-center ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  ¡Estrategia completa! Estás listo para cerrar.
                </p>
              </motion.div>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {recomendaciones.slice(0, 2).map((q, idx) => (
                  <motion.li
                    key={q.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                      isDark ? 'bg-[#3a3a3a] text-gray-300' : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: (categoryColors[q.category] ?? '#6b7280') + '33' }}
                    >
                      <q.icon size={11} style={{ color: categoryColors[q.category] ?? '#6b7280' }} />
                    </div>
                    <span className="leading-snug">{q.tooltip}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
