import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Zap, User, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SlideICPContent({ isDark }: { isDark: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedLayer, setExpandedLayer] = useState<number | null>(0);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const layers = [
    {
      num: '1', icon: Building2, title: 'La empresa correcta', subtitle: 'Firmografía',
      bullets: ['Industria / Rubro con dolor fuerte', 'Tamaño: empleados, facturación, sedes', 'Geografía donde puedes vender', 'Stack tecnológico que usan (Hubspot, Shopify…)'],
    },
    {
      num: '2', icon: Zap, title: 'El momento correcto', subtitle: 'Disparadores de compra',
      bullets: ['Están contratando equipo de ventas', 'Levantaron inversión Seed / Serie A', 'Expandieron operaciones o sedes', 'Cambiaron directores o C-Level', 'Lanzaron nuevo producto o mercado'],
    },
    {
      num: '3', icon: User, title: 'La persona correcta', subtitle: 'Buyer Persona',
      bullets: ['¿Quién sufre el problema día a día?', '¿Quién tiene el presupuesto?', '¿Quién toma la decisión final?'],
    },
  ];

  const questions = [
    { num: '1', q: '¿Quién obtuvo el mayor valor?', hint: 'No quién compró — quién ganó más.', sub: ['¿Qué tipo de empresa era?', '¿Qué tamaño tenía?', '¿Qué problema resolviste?'], tag: 'Impacto real', col: 'text-[#ff851d]' },
    { num: '2', q: '¿Quién te compró más rápido?', hint: 'Un ICP fuerte compra sin dudar.', sub: ['¿Quién dijo sí casi de inmediato?', '¿Quién no pidió demos infinitas?', '¿Quién no negoció precio?'], tag: 'Velocidad', col: 'text-blue-400' },
    { num: '3', q: '¿Quién fue el más rentable?', hint: 'ICP ideal = más margen.', sub: ['¿Quién paga más sin regatear?', '¿Quién se queda más tiempo?', '¿Quién te refiere clientes?'], tag: 'Rentabilidad', col: 'text-emerald-400' },
    { num: '4', q: '¿Qué problema duele de verdad?', hint: 'No nice-to-have. Dolor estratégico.', sub: ['¿Pierde dinero concreto?', '¿Pierde clientes por esto?', '¿Pierde oportunidades reales?'], tag: 'Dolor', col: 'text-red-400' },
    { num: '5', q: '¿Cuándo aparece ese problema?', hint: 'El momento correcto lo cambia todo.', sub: ['¿Cuando crecen a 50+ personas?', '¿Cuando contratan equipo de ventas?', '¿Cuando levantan inversión?'], tag: 'Disparador', col: 'text-purple-400' },
    { num: '6', q: '¿Quién sufre internamente?', hint: 'Empresa correcta + cargo correcto.', sub: ['¿Quién se queja primero?', '¿Quién tiene presupuesto asignado?', '¿Quién firma el contrato?'], tag: 'Buyer Persona', col: 'text-[#ef375c]' },
    { num: '7', q: '¿Quién NO debería comprarte?', hint: 'El anti-ICP vale igual que el ICP.', sub: ['¿Con quién fue un desastre trabajar?', '¿Quién nunca entendió tu valor?', '¿Quién no obtuvo resultados?'], tag: 'Anti-ICP', col: 'text-gray-400' },
  ];

  const quadrants = [
    { id: 'reactive',   emoji: '🚨', label: 'Reactivos',    desc: 'Urgente pero limitado',     verdict: 'Ciclo rápido, poco margen',           ex: ['Herramienta que falló', 'Proveedor que falla', 'Sistema caído'],          col: 'text-yellow-400', isIdeal: false },
    { id: 'strategic',  emoji: '🎯', label: 'Estratégicos', desc: '¡AQUÍ ESTÁ TU ICP!',         verdict: 'Máximas respuestas en cold email',     ex: ['Pipeline insuficiente', 'CAC muy alto', 'Churn elevado'],               col: 'text-emerald-400', isIdeal: true  },
    { id: 'cosmetic',   emoji: '💅', label: 'Cosméticos',   desc: 'Nadie actúa en esto',        verdict: 'Casi nunca responde a cold email',     ex: ['Diseño presentaciones', 'Plantillas internas', 'Dashboards bonitos'], col: 'text-gray-400',    isIdeal: false },
    { id: 'efficiency', emoji: '⚙️', label: 'Eficiencia',   desc: 'Valor sí, urgencia no',      verdict: 'Ciclos de venta lentos',               ex: ['Automatizar reportes', 'Optimizar workflows', 'Procesos internos'],     col: 'text-blue-400',   isIdeal: false },
  ];

  const slides = ['Las 3 Capas del ICP', 'Las 7 Preguntas Clave', 'Matriz de Dolores'];
  const next = () => setCurrentIndex(p => (p + 1) % slides.length);
  const prev = () => setCurrentIndex(p => (p - 1 + slides.length) % slides.length);

  const base = isDark
    ? 'bg-[#1e1e1e] shadow-black/60 border border-[#2a2a2a]'
    : 'bg-white shadow-gray-300/60 border border-gray-100';

  const card = isDark
    ? 'bg-[#1e1e1e] border-[#3a3a3a] hover:border-[#ff851d]/30'
    : 'bg-white border-gray-200 hover:border-[#ff851d]/30';

  const inner = isDark ? 'bg-[#2a2a2a] border-[#3a3a3a]' : 'bg-gray-50 border-gray-200';

  return (
    <div className={`p-5 sm:p-7 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col w-full h-full ${base}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="shrink-0 mb-3 z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-0.5">
          El Perfil del Cliente Ideal{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">(ICP)</span>
        </h2>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{slides[currentIndex]}</p>
      </div>

      <div className="flex-1 z-10 flex flex-col min-h-0">
        <div className={`flex-1 rounded-3xl border p-4 md:p-6 flex flex-col min-h-0 ${inner}`}>
          <AnimatePresence mode="wait">

            {/* SLIDE 1 — Las 3 Capas */}
            {currentIndex === 0 && (
              <motion.div key="capas" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                {layers.map((layer, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className={`rounded-2xl border overflow-hidden cursor-pointer transition-all ${card}`}
                    onClick={() => setExpandedLayer(expandedLayer === i ? null : i)}>
                    <div className="flex items-center gap-3 p-3">
                      <div className="p-2 rounded-xl shrink-0 text-white" style={{ background: 'linear-gradient(135deg,#ff851d,#ef375c)' }}>
                        <layer.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-black text-[#ff851d]">CAPA {layer.num}</span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isDark ? 'bg-[#2a2a2a] text-gray-500' : 'bg-gray-100 text-gray-400'}`}>{layer.subtitle}</span>
                        </div>
                        <p className={`text-sm font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{layer.title}</p>
                      </div>
                      <motion.span animate={{ rotate: expandedLayer === i ? 90 : 0 }} className={`text-xl font-bold ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>›</motion.span>
                    </div>
                    <AnimatePresence>
                      {expandedLayer === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className={`px-4 pb-3 pt-2 border-t ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
                            <div className="flex flex-wrap gap-1.5">
                              {layer.bullets.map((b, j) => (
                                <span key={j} className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${isDark ? 'bg-[#2a2a2a] border-[#3a3a3a] text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>{b}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                <div className={`rounded-xl p-3 border flex items-start gap-2.5 ${isDark ? 'bg-red-900/10 border-red-900/30' : 'bg-red-50 border-red-100'}`}>
                  <AlertTriangle size={13} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-black text-red-400 mb-0.5">ERROR #1</p>
                    <p className={`text-[10px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      "Nuestro cliente es <strong>cualquier empresa que necesite X</strong>". Más específico = más respuestas = más ventas.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 2 — Las 7 Preguntas */}
            {currentIndex === 1 && (
              <motion.div key="preguntas" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-1.5 min-h-0 overflow-y-auto custom-scrollbar pr-1">
                {questions.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className={`rounded-xl border overflow-hidden cursor-pointer transition-all ${card}`}
                    onClick={() => setExpandedQ(expandedQ === i ? null : i)}>
                    <div className="flex items-center gap-2.5 p-2.5">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white text-[10px] font-black flex items-center justify-center shrink-0">{item.num}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold leading-tight ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.q}</p>
                        <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.hint}</p>
                      </div>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100'} ${item.col}`}>{item.tag}</span>
                    </div>
                    <AnimatePresence>
                      {expandedQ === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }} className="overflow-hidden">
                          <div className={`px-4 pb-2.5 pt-1.5 border-t ${isDark ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
                            <ul className="space-y-1">
                              {item.sub.map((s, j) => (
                                <li key={j} className={`flex items-center gap-2 text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <span className="w-1 h-1 rounded-full bg-[#ff851d] shrink-0" />{s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* SLIDE 3 — Matriz de Dolores */}
            {currentIndex === 2 && (
              <motion.div key="matriz" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col min-h-0">
                <div className="flex justify-center mb-1.5 shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>← Bajo Impacto · · · Alto Impacto →</span>
                </div>
                <div className="flex gap-2 flex-1 min-h-0">
                  <div className="flex flex-col justify-between py-2 w-4 shrink-0">
                    <span className={`text-[8px] font-bold ${isDark ? 'text-gray-600' : 'text-gray-300'}`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>↑ Urgencia Alta</span>
                    <span className={`text-[8px] font-bold ${isDark ? 'text-gray-600' : 'text-gray-300'}`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Urgencia Baja ↓</span>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2 min-h-0" style={{ gridTemplateRows: '1fr 1fr' }}>
                    {quadrants.map((q, i) => (
                      <motion.div key={q.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                        className={`rounded-2xl border p-3 flex flex-col cursor-default transition-all relative overflow-hidden
                          ${q.isIdeal
                            ? isDark ? 'bg-emerald-950/40 border-emerald-500/30 ring-1 ring-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
                            : isDark ? 'bg-[#1e1e1e] border-[#3a3a3a]' : 'bg-white border-gray-200'
                          }`}
                        onMouseEnter={() => setHoveredQuadrant(q.id)}
                        onMouseLeave={() => setHoveredQuadrant(null)}>
                        {q.isIdeal && (
                          <span className="absolute top-2 right-2 text-[8px] font-black text-[#ff851d] bg-[#ff851d]/10 px-1.5 py-0.5 rounded-full">★ IDEAL</span>
                        )}
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-base leading-none">{q.emoji}</span>
                          <span className={`text-xs font-black ${q.col}`}>{q.label}</span>
                        </div>
                        <p className={`text-[9px] font-bold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{q.desc}</p>
                        <AnimatePresence mode="wait">
                          {hoveredQuadrant === q.id ? (
                            <motion.ul key="ex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-0.5 mt-auto">
                              {q.ex.map((e, j) => (
                                <li key={j} className={`text-[9px] flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                  <span className={`w-1 h-1 rounded-full shrink-0 ${q.isIdeal ? 'bg-emerald-400' : 'bg-gray-400'}`} />{e}
                                </li>
                              ))}
                            </motion.ul>
                          ) : (
                            <motion.p key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className={`text-[9px] italic mt-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{q.verdict}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className={`mt-2 rounded-xl p-2.5 border flex items-center gap-2 shrink-0 ${isDark ? 'bg-emerald-900/10 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'}`}>
                  <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                  <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Tu ICP ideal tiene dolores <strong className="text-emerald-400">estratégicos</strong>: pierden dinero, clientes o crecimiento. Ahí está la urgencia real.
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4 shrink-0">
          <button onClick={prev} className={`p-3 rounded-full transition-colors border ${isDark ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border-[#3a3a3a]' : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-200 shadow-sm'}`}>
            <ChevronLeft size={22} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] w-8' : isDark ? 'bg-gray-600 w-2.5 hover:bg-gray-500' : 'bg-gray-300 w-2.5 hover:bg-gray-400'}`} />
            ))}
          </div>
          <button onClick={next} className={`p-3 rounded-full transition-colors border ${isDark ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border-[#3a3a3a]' : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-200 shadow-sm'}`}>
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
