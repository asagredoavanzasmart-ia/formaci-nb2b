import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass, SiglasBar } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs,
  IsoBox, Float, Traveler, PulseDisc, hop, Persona,
} from '../scene3d';
import { SlideProps, heading, Piso, Bola, Nota, Cita, Paso, Opcion } from '../revops/kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 1 · Qué es Sales Enablement
══════════════════════════════════════════════════════════════════ */

export function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const EQUIPO = [
    { x: 90,  body: PEACH,         acc: 'megaphone' as const, nombre: 'Marketing' },
    { x: 250, body: BRAND,         acc: 'tie'       as const, nombre: 'Ventas' },
    { x: 410, body: SLATE(isDark), acc: 'heart'     as const, nombre: 'Éxito del cliente' },
    { x: 570, body: NEUTRAL(isDark),acc: 'gear'     as const, nombre: 'Producto' },
  ];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 660 240" className="w-full max-w-2xl mb-2 z-10 overflow-visible" role="img" aria-label="Marketing, ventas, éxito del cliente y producto conectados al prospecto">
        <SceneDefs id="sep" isDark={isDark} />
        <Piso cx={330} cy={193} s={310} fill={t.floor} />
        <PulseDisc cx={330} cy={58} rx={42} ry={14} dur={2.4} peak={0.28} />
        <Float amp={6} dur={2.8}><Bola id="sep" cx={330} cy={52} r={17} /></Float>
        <text x={354} y={49} fontSize={11} fontWeight={900} fill={ORANGE}>El Prospecto</text>
        {EQUIPO.map((e, i) => (
          <motion.g key={e.nombre} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 90, damping: 13 }}>
            <Float amp={3.5} dur={2.3 + i * 0.2} delay={i * 0.4}>
              <Persona id="sep" cx={e.x} cy={186} s={0.95} body={e.body} accessory={e.acc} />
            </Float>
            <text x={e.x} y={223} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{e.nombre}</text>
            <Traveler id="sep" path={hop([e.x, 120], [330, 66], 28)} dur={1.8} delay={i * 0.45} repeatDelay={0.6} r={3.5} color={i % 2 === 0 ? ORANGE : PINK} />
          </motion.g>
        ))}
        <text x={330} y={238} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Cuatro equipos, un solo enfoque en el prospecto</text>
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-2 font-bold text-[#ff851d] z-10">
        Bray &amp; Sorey · el ecosistema de ventas
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-3 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Sales <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Enablement</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-sm md:text-lg max-w-2xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        La extensión de una <strong>mentalidad centrada en el prospecto</strong> a todos los departamentos de la organización.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-4 z-10" />
    </div>
  );
}

export function Definicion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [sel, setSel] = useState(2);
  const NIVELES = [
    { k: 'No es un cargo', d: 'No es la persona que hace el onboarding ni el «soporte de ventas». Esa confusión lleva al «Director de Broken Things»: sin presupuesto, sin autoridad, sin impacto real.', },
    { k: 'Es una función transversal', d: 'Igual que Finanzas y Recursos Humanos afectan a toda la empresa, Sales Enablement cruza departamentos y jerarquías. Todos son responsables de una parte.', },
    { k: 'Es un ecosistema', d: 'La extensión de una mentalidad centrada en el prospecto a todos los departamentos. Forrester (2010): el puente entre la estrategia de salida al mercado y la ejecución táctica.', },
  ];
  const cys = [176, 150, 124];
  const ss  = [48,  36,  26];
  const hs  = [24,  18,  14];
  return (
    <Shell isDark={isDark} title="Sales Enablement" highlight="es un ecosistema" subtitle="Todos los departamentos participan en cómo la empresa genera ingresos, no solo el equipo de ventas.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[42%] flex flex-col items-center justify-center gap-3">
          <svg viewBox="0 0 340 245" className="w-full max-h-[250px] overflow-visible" role="img" aria-label="Pirámide: cargo, función, ecosistema">
            <SceneDefs id="sed" isDark={isDark} />
            <Piso cx={160} cy={210} s={130} fill={t.floor} />
            {NIVELES.map((n, k) => {
              const on = k === sel;
              return (
                <motion.g key={n.k} onClick={() => setSel(k)} style={{ cursor: 'pointer' }}
                  initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.18, type: 'spring', stiffness: 80, damping: 13 }}>
                  <g filter="url(#sed-sh)"><IsoBox cx={160} cy={cys[k]} s={ss[k]} h={hs[k]} f={on ? BRAND : k === 2 ? PEACH : NEUTRAL(isDark)} /></g>
                  {on && <PulseDisc cx={160} cy={cys[k] + hs[k]} rx={ss[k] * 0.85} ry={ss[k] * 0.28} dur={2} peak={0.28} />}
                  <text x={224} y={cys[k] + hs[k] / 2 + 4} fontSize={11.5} fontWeight={900} fill={on ? ORANGE : t.muted}>{k + 1}. {n.k}</text>
                </motion.g>
              );
            })}
          </svg>
          <div className="flex gap-2 flex-wrap justify-center">
            {NIVELES.map((n, k) => <Pill key={n.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{n.k}</Pill>)}
          </div>
        </div>
        <div className="lg:w-[58%] flex flex-col gap-3 justify-center">
          <div className="grid">
            {NIVELES.map((n, k) => (
              <motion.div key={n.k} className="col-start-1 row-start-1" initial={false}
                animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.3 }}
                style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={n.k} destacada>{n.d}</Nota>
              </motion.div>
            ))}
          </div>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Sales Enablement no es un cargo. No es un título. No es quien hace el onboarding. Es un ECOSISTEMA que cruza todas las fronteras funcionales y jerárquicas.</Cita>
          <Nota isDark={isDark} label="Forrester Research · 2010">El puente entre la estrategia de salida al mercado y la ejecución táctica. Las ineficiencias no controladas «terminarán por causar estragos en los balances».</Nota>
        </div>
      </div>
    </Shell>
  );
}

export function Evolucion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const HITOS = [
    { año: '1980s', titulo: 'Sistemas de venta', desc: 'IBM, Miller Heiman, Sandler: el comprador se vuelve más sofisticado. El vendedor debe pasar de peddler a consultor.' },
    { año: '1990s', titulo: 'Internet cambia la ecuación', desc: 'El comprador accede a información sin intermediarios. E-mail, demos por video y CRM aparecen como herramientas clave.' },
    { año: '2008', titulo: 'Primeros artículos', desc: 'Surge el concepto de «sales support» y «sales enablement» en publicaciones B2B como necesidad urgente.' },
    { año: '2010', titulo: 'Forrester lo nombra', desc: '«Sales Enablement es el puente entre la estrategia de salida al mercado y la ejecución táctica.»' },
  ];
  return (
    <Shell isDark={isDark} title="De las metodologías" highlight="al ecosistema" subtitle="Sales Enablement no es una tendencia reciente; es la respuesta a cuarenta años de compradores que saben más que antes.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
          {HITOS.map((h, i) => (
            <motion.div key={h.año} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 16 }}>
              <div className={`flex gap-3 items-start p-2.5 rounded-2xl ${panelClass(isDark)}`}>
                <span className="shrink-0 px-2 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">{h.año}</span>
                <div>
                  <p className={`text-sm font-black leading-tight ${heading(isDark)}`}>{h.titulo}</p>
                  <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{h.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="El riesgo del silo" destacada>Cuando un ejecutivo desbordado dice «ponle el nombre que quieras, pero que alguien ayude a ventas», el resultado suele ser el <strong>«Director de Broken Things»</strong>: sin presupuesto, sin autoridad, sin impacto, sin mandato claro. La posición existe pero el ecosistema no.</Nota>
          <Nota isDark={isDark} label="HR para vendedores">Un vicepresidente de Fortune 500 bromeó en un panel: «Sales Enablement suena a Recursos Humanos para vendedores». Quienes reían entendían el potencial real del ecosistema. Quienes fruncieron el ceño ya lo habían reducido a onboarding y soporte de personal.</Nota>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Sales Enablement no es una posición. No es un título. Es un ECOSISTEMA que cruza todas las fronteras funcionales y jerárquicas.</Cita>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 2 · El proceso de ventas
══════════════════════════════════════════════════════════════════ */

export function Paradoja({ isDark }: SlideProps) {
  const ELEMENTOS = [
    'Etapas claras que todos conocen y siguen',
    'Un CRM para rastrear negocios y analizar conversiones',
    'Stack tecnológico que mejora la eficiencia del equipo',
    'Integraciones entre herramientas para no interrumpir el flujo',
    'Ediciones de producto y precios documentados',
    'Mensajería general para cada situación e industria',
    'Scripts de demo por persona y caso de uso',
  ];
  return (
    <Shell isDark={isDark} title="La paradoja" highlight="del proceso de ventas" subtitle="Demasiado proceso mata al equipo. Sin proceso, el equipo muere. El arte está en encontrar la cantidad correcta.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[44%] flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-3 w-full">
            <div className={`p-4 rounded-3xl text-center ${featuredClass(isDark)}`}>
              <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Demasiado proceso</p>
              <p className={`text-xl font-black mt-1 ${heading(isDark)}`}>El equipo se esconde detrás de él</p>
              <p className={`text-sm mt-1 ${textMuted(isDark)}`}>Dos meses evaluando y rediseñando el proceso, solo para volver a empezar. Los de bajo rendimiento lo usan como excusa.</p>
            </div>
            <div className={`p-3 rounded-3xl text-center ${panelClass(isDark)}`}>
              <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full mb-2" />
              <p className={`text-sm font-black text-[#ff851d]`}>La cantidad correcta</p>
            </div>
            <div className={`p-4 rounded-3xl text-center ${panelClass(isDark)}`}>
              <p className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sin proceso</p>
              <p className={`text-xl font-black mt-1 ${heading(isDark)}`}>Sin escala predecible</p>
              <p className={`text-sm mt-1 ${textMuted(isDark)}`}>Una organización sin proceso no puede crecer de manera predecible. Cada venta depende del instinto individual.</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>Los 7 elementos que todo equipo necesita</p>
          <div className="flex flex-col gap-1.5">
            {ELEMENTOS.map((el, i) => (
              <motion.div key={el} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className={`flex gap-2.5 items-start p-2 rounded-xl ${panelClass(isDark)}`}>
                <span className="shrink-0 w-5 h-5 rounded-lg text-[10px] font-black flex items-center justify-center bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">{i + 1}</span>
                <span className={`text-xs leading-snug font-medium ${textMuted(isDark)}`}>{el}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

const ESTADOS_PROCESO = [
  {
    k: 'Funcionando',
    sub: '>80 % al cuota de forma consistente',
    desc: 'Los nuevos contratados alcanzan su rendimiento objetivo rápidamente y nadie habla de «mejorar el proceso».',
    señales: ['Más del 80 % de los representantes alcanza cuota', 'Las nuevas contrataciones se incorporan rápido', 'Nadie debate continuamente sobre cambiar el proceso'],
    riesgos: ['Expansión del equipo sin ajuste de territorio', 'Mover el mercado objetivo hacia clientes más grandes', 'Aumento de competencia que cambia las reglas'],
  },
  {
    k: 'Experimentando',
    sub: 'Mejora controlada y predecible',
    desc: 'Si el proceso no está funcionando, la única salida es correr experimentos rápidos con criterios claros.',
    señales: ['Métrica a impactar: definida', 'Experimento (qué harás diferente): controlable', 'Resultado previsto con plazo', 'Cadencia de revisión', 'Criterios de aceptación explícitos'],
    riesgos: ['Cambios reactivos sin hipótesis', 'Fatiga del equipo', 'Falta de claridad', 'Pérdida de accountability'],
  },
  {
    k: 'Se agita',
    sub: 'Cultura de problema o empresa joven',
    desc: 'Cuando el proceso es un tema constante de conversación, evalúa al mensajero antes de cambiar el proceso.',
    señales: ['¿Propone alternativas a cada queja?', '¿Las recomendaciones son simples y comprensibles?', '¿Considera el panorama general sin crear nuevos problemas?', '¿Implementa lo que pide o solo critica?'],
    riesgos: ['El liderazgo fuerte y la transparencia son necesarios para salir', 'Un proceso que se agita es deshabilitación de ventas'],
  },
];

export function Madurez({ isDark }: SlideProps) {
  const [sel, setSel] = useState(0);
  const E = ESTADOS_PROCESO[sel];
  return (
    <Shell isDark={isDark} title="El proceso siempre está" highlight="en uno de tres estados" subtitle="Conocer el estado actual del proceso determina qué acción tomar. Cada estado requiere una respuesta diferente.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {ESTADOS_PROCESO.map((e, k) => <Pill key={e.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{e.k}</Pill>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[45%] flex flex-col gap-3 justify-center">
            <div className="grid">
              {ESTADOS_PROCESO.map((e, k) => (
                <motion.div key={e.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className={`p-3.5 rounded-3xl ${featuredClass(isDark)}`}>
                    <p className={microLabel(isDark)}>{e.k}</p>
                    <p className={`text-base font-black mt-0.5 ${heading(isDark)}`}>{e.sub}</p>
                    <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{e.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[55%] flex flex-col gap-2.5 justify-center">
            <div className="grid">
              {ESTADOS_PROCESO.map((e, k) => (
                <motion.div key={e.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className="flex flex-col gap-1.5">
                    <p className={microLabel(isDark)}>{k === 1 ? 'Componentes del experimento' : k === 2 ? 'Cuatro preguntas para evaluar al mensajero' : 'Señales del estado y riesgos a vigilar'}</p>
                    {e.señales.map((s) => (
                      <div key={s} className={`flex gap-2 items-start p-2 rounded-xl ${panelClass(isDark)}`}>
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ff851d] mt-1.5" />
                        <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{s}</span>
                      </div>
                    ))}
                    {e.riesgos.map((r) => (
                      <div key={r} className={`flex gap-2 items-start p-2 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ef375c]/70 mt-1.5" />
                        <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{r}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

const TIPOS_VENTA = [
  {
    k: 'Transaccional',
    n: 3,
    etapas: ['Calificación', 'Evaluación', 'Propuesta'],
    desc: 'Alto volumen, precio bajo, el comprador entiende el producto. A menudo se cierra en la primera o segunda llamada. Poco riesgo para ambas partes.',
  },
  {
    k: 'Avanzada',
    n: 5,
    etapas: ['Calificación', 'Configuración de la evaluación', 'Evaluación', 'Propuesta', 'Cierre'],
    desc: 'Mayor inversión, múltiples tomadores de decisión, involucra SDR + AE (Account Executive). Varios encuentros a lo largo de semanas o meses.',
  },
  {
    k: 'Compleja',
    n: 7,
    etapas: ['Calificación', 'Evaluación preliminar', 'Presentación ejecutiva', 'Prueba de concepto', 'Propuesta', 'Revisión de comité', 'Cierre'],
    desc: 'Alta inversión, muchos actores en ambos lados, puede tardar años. Requiere aprobación ejecutiva o de comité. Ejemplos: ERP o contratos de defensa.',
  },
];

export function Etapas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [sel, setSel] = useState(0);
  const T = TIPOS_VENTA[sel];
  return (
    <Shell isDark={isDark} title="Tipos de venta" highlight="y criterios de salida" subtitle="La cantidad de etapas correcta depende de la complejidad del negocio. Ni más ni menos. Y cada etapa necesita criterios de salida claros.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {TIPOS_VENTA.map((tv, k) => <Pill key={tv.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{tv.k} · {tv.n} etapas</Pill>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[55%] flex flex-col justify-center">
            <div className="grid">
              {TIPOS_VENTA.map((tv, k) => (
                <motion.div key={tv.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className="flex flex-col gap-1.5">
                    <p className={`text-sm leading-snug mb-1 ${textMuted(isDark)}`}>{tv.desc}</p>
                    {tv.etapas.map((e, j) => (
                      <div key={e} className={`flex gap-3 items-center p-2.5 rounded-2xl ${j === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
                        <span className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${j === 0 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{j + 1}</span>
                        <span className={`text-sm font-bold ${heading(isDark)}`}>{e}</span>
                        {j === 0 && <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full text-[#ff851d] ${isDark ? 'bg-white/5' : 'bg-orange-50'}`}>BANT</span>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[45%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Criterios de salida (Stage Exit Criteria)">Un negocio no avanza de etapa hasta que se cumplen requisitos específicos. BANT es el más extendido para la etapa 1: <strong>Budget</strong> (presupuesto), <strong>Authority</strong> (autoridad), <strong>Need</strong> (necesidad) y <strong>Timing</strong> (plazo). Sin criterios, el pipeline es optimismo.</Nota>
            <Nota isDark={isDark} label="Minas del CRM" destacada>La complejidad es el enemigo de un equipo de ventas eficaz. Los mejores vendedores la odian y la abandonan. Los de bajo rendimiento se esconden detrás de ella. <strong>Simplicidad. Datos estructurados. Consistencia.</strong></Nota>
            <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Crm({ isDark }: SlideProps) {
  const ACCIONABLE = ['Competidores activos en el negocio', 'Dolor concreto del prospecto', 'Tomadores de decisión identificados'];
  const NO_ACCIONABLE = ['Dirección postal', 'Número de fax', 'Cualquier dato no utilizado en los últimos 6 meses'];
  return (
    <Shell isDark={isDark} title="Inteligencia accionable," highlight="no complejidad" subtitle="Si le preguntas lo mismo a tres personas en la empresa y obtienes tres respuestas distintas, el CRM no está funcionando como fuente de verdad.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="GIGO · Garbage In, Garbage Out" destacada>El texto libre destruye la calidad de los datos. Busca «CIO» en tu CRM y encontrarás «Chief Information Officer», «Cheef Information Officer» y «Chief Info Officer». Son el mismo dato; los reportes los cuentan por separado. <strong>Datos estructurados, no texto libre.</strong></Nota>
          <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Los tres principios del CRM</p>
            {['Simplicidad', 'Datos estructurados', 'Consistencia'].map((p, i) => (
              <div key={p} className="flex gap-2 items-center mt-1.5">
                <span className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shrink-0">{i + 1}</span>
                <span className={`text-sm font-black ${heading(isDark)}`}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          <div className={`p-3 rounded-2xl ${featuredClass(isDark)}`}>
            <p className={microLabel(isDark)}>Inteligencia accionable · SÍ entra al CRM</p>
            {ACCIONABLE.map((a) => (
              <div key={a} className="flex gap-2 items-start mt-1.5">
                <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black bg-emerald-500 text-white mt-0.5">✓</span>
                <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{a}</span>
              </div>
            ))}
          </div>
          <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>No es inteligencia accionable · NO entra</p>
            {NO_ACCIONABLE.map((a) => (
              <div key={a} className="flex gap-2 items-start mt-1.5">
                <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black bg-rose-400 text-white mt-0.5">✗</span>
                <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{a}</span>
              </div>
            ))}
          </div>
          <Nota isDark={isDark} label="Inteligencia vs. dato">Inteligencia es algo que nos hace más listos sobre el prospecto. Accionable es algo que podemos usar para avanzar el negocio. Si no cumple los dos criterios, no pertenece al CRM.</Nota>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 3 · Incorporar y entrenar
══════════════════════════════════════════════════════════════════ */

const CUADRANTES_OB = [
  { row: 'Con experiencia', col: 'Transaccional',    titulo: 'Al teléfono el día 2', desc: 'Solo necesita los 3 mejores casos de uso, nombres de clientes y el siguiente paso. No role-plays, no PowerPoints.' },
  { row: 'Con experiencia', col: 'Avanzada/Compleja',titulo: 'Inmersión en clientes', desc: 'Acompañar llamadas de éxito del cliente y reuniones de ventas. No encerrarlo con el equipo de producto a ver presentaciones.' },
  { row: 'Junior',          col: 'Transaccional',    titulo: 'Boot camp inmediato', desc: 'Skill de ventas desde el día 1, monitoreo cercano, primero solo agenda reuniones para otro vendedor.' },
  { row: 'Junior',          col: 'Avanzada/Compleja',titulo: 'Contratar con experiencia', desc: 'Casi nunca funciona. Si se hace, exige un plan de formación en ventas como disciplina con coach externo.' },
];

export function Onboarding({ isDark }: SlideProps) {
  const [sel, setSel] = useState(0);
  const Q = CUADRANTES_OB[sel];
  const ROWS = ['Con experiencia', 'Junior'];
  const COLS = ['Transaccional', 'Avanzada/Compleja'];
  return (
    <Shell isDark={isDark} title="El onboarding depende de" highlight="la experiencia y la complejidad" subtitle="No todos los nuevos contratados aprenden igual. El plan debe diferenciarse desde el día 1, no dos semanas después.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-3">
          <div className={`w-full rounded-2xl overflow-hidden ${panelClass(isDark)}`}>
            <div className="grid grid-cols-[auto_1fr_1fr] gap-px bg-gray-200 dark:bg-white/10">
              <div className={`p-2 ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`} />
              {COLS.map((c) => (
                <div key={c} className={`p-2 text-center ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
                  <span className={`text-[11px] font-black ${heading(isDark)}`}>{c}</span>
                </div>
              ))}
              {ROWS.map((r, ri) =>
                [<div key={r} className={`p-2 flex items-center ${isDark ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
                  <span className={`text-[11px] font-black ${heading(isDark)}`}>{r}</span>
                </div>,
                ...COLS.map((c, ci) => {
                  const idx = ri * 2 + ci;
                  const on = idx === sel;
                  return (
                    <button key={c} onClick={() => setSel(idx)}
                      className={`p-2.5 text-xs font-semibold text-left transition-all leading-snug ${on ? 'bg-gradient-to-br from-[#ff851d]/20 to-[#ef375c]/20' : isDark ? 'bg-[#2a2a2a] hover:bg-[#333]' : 'bg-white hover:bg-gray-50'} ${on ? (isDark ? 'text-orange-300' : 'text-orange-700') : textMuted(isDark)}`}>
                      {CUADRANTES_OB[idx].titulo}
                    </button>
                  );
                })]
              )}
            </div>
          </div>
          <Nota isDark={isDark} label="La demo de pizarrón">Dibuja cada pantalla mientras hablas. Sin soporte visual, el vendedor se centra en el prospecto, no en botones. Los mejores demos no son presentaciones: son conversaciones alrededor del dolor.</Nota>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <div className="grid">
            {CUADRANTES_OB.map((q, k) => (
              <motion.div key={q.titulo} className="col-start-1 row-start-1" initial={false}
                animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                <div className={`p-3.5 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>{q.row} · {q.col}</p>
                  <p className={`text-lg font-black mt-0.5 ${heading(isDark)}`}>{q.titulo}</p>
                  <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{q.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['30 días', '60 días', '90 días'].map((d) => (
              <div key={d} className={`p-2.5 rounded-2xl text-center ${panelClass(isDark)}`}>
                <p className="text-[11px] font-black text-[#ff851d]">{d}</p>
                <p className={`text-xs mt-0.5 ${textMuted(isDark)}`}>{d === '30 días' ? 'Primeras señales de éxito o fracaso' : d === '60 días' ? 'Avance claro o intervención necesaria' : 'Desempeño completo o decisión definitiva'}</p>
              </div>
            ))}
          </div>
          <Nota isDark={isDark} label="Planifica el fracaso, no solo el éxito">Al definir explícitamente qué se ve el éxito Y el fracaso a los 30-60-90 días, los gerentes también son co-responsables de cada hito. La formación no termina con las primeras dos semanas.</Nota>
          <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
        </div>
      </div>
    </Shell>
  );
}

const METODOS = [
  { k: 'Sandler',                  desc: 'Sistema completo que incluye calificación, manejo de objeciones y cierre. Foco en el dolor del prospecto y en evitar el "happy ears" del vendedor.' },
  { k: 'MEDDIC',                   desc: 'Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion. Especialmente útil en ventas enterprise con múltiples interlocutores.' },
  { k: 'Miller Heiman Strategic',  desc: 'Mapeo de compradores, influenciadores y tomadores de decisión. Potente para ventas complejas con muchos actores en el lado del comprador.' },
  { k: 'Solution Selling',         desc: 'Centrado en diagnosticar y articular el problema antes de presentar la solución. Útil cuando el prospecto aún no sabe que tiene el problema.' },
];

export function Metodologia({ isDark }: SlideProps) {
  const [sel, setSel] = useState(0);
  return (
    <Shell isDark={isDark} title="Metodología de ventas" highlight="no es lo mismo que proceso" subtitle="El proceso define las etapas. La metodología prepara al vendedor para navegar los eventos que ocurren dentro de cada etapa.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[46%] flex flex-col gap-2 justify-center">
          {METODOS.map((m, k) => (
            <Opcion key={m.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{m.k}</Opcion>
          ))}
          <div className="grid mt-1">
            {METODOS.map((m, k) => (
              <motion.div key={m.k} className="col-start-1 row-start-1" initial={false}
                animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={m.k} destacada>{m.desc}</Nota>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="Proceso vs. metodología">El <strong>proceso</strong> son las etapas (calificación, demo, propuesta, cierre). La <strong>metodología</strong> es cómo navegar los eventos dentro de cada etapa: cómo descubrir el dolor, manejar objeciones o crear urgencia. Implementar una sin la otra deja al equipo a mitad del camino.</Nota>
          <Nota isDark={isDark} label="Quién debe implementar">Siempre un experto: el VP de Ventas que la ha ejecutado durante años, o un consultor especializado. Lo peor que se puede hacer es delegar la implementación a alguien que «participó en unos entrenamientos». Recitará tácticas sin la profundidad teórica que hace que funcionen.</Nota>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Challenger Sale y SPIN Selling son enfoques populares, pero ninguno es un sistema de venta completo como los cuatro anteriores.</Cita>
        </div>
      </div>
    </Shell>
  );
}

const ERRORES = [
  'No aparece a las citas agendadas (no-show)',
  'Responde lento a prospectos en una venta competitiva',
  'Olvida responder a un prospecto',
  'Hace suposiciones falsas, especialmente con el enfoque Challenger',
  'Inscribe prospectos en múltiples workflows de automatización a la vez',
  'Envía e-mails con errores de gramática',
  'Hace preguntas que se responden leyendo LinkedIn',
  'Se niega a descalificar: «pipelines embarazados que nunca dan a luz»',
  'Acepta «envíame más información» como avance',
  'Intenta calificar por e-mail en lugar de llamar',
  'Reasigna al representante entre el SDR y el AE sin avisar al prospecto',
  'Usa mensajería genérica en una venta competitiva',
  'Tiene «happy ears»: reporta reuniones positivas sin evidencia real',
  'No pide referidos: «todos son una fuente de referidos»',
  'Da demos a prospectos sin calificar',
  'Asume que «ineficiencia» es dolor: las empresas toleran ineficiencias durante años sin gastar nada',
];

export function Errores({ isDark }: SlideProps) {
  const [pag, setPag] = useState(0);
  const POR_PAG = 8;
  const items = ERRORES.slice(pag * POR_PAG, pag * POR_PAG + POR_PAG);
  return (
    <Shell isDark={isDark} title="16 señales de que hay" highlight="una oportunidad de entrenamiento" subtitle="Inspecciona lo que esperas. Estos comportamientos no son errores de personalidad: son vacíos de formación que Sales Enablement puede cerrar.">
      <div className="h-full flex flex-col gap-3 min-h-0 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 content-start">
          {items.map((e, i) => {
            const n = pag * POR_PAG + i + 1;
            return (
              <motion.div key={e} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className={`flex gap-2.5 items-start p-2.5 rounded-xl ${panelClass(isDark)}`}>
                <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${n <= 8 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{n}</span>
                <span className={`text-xs leading-snug font-medium ${textMuted(isDark)}`}>{e}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="flex gap-2 items-center justify-between shrink-0">
          <button onClick={() => setPag(0)} disabled={pag === 0}
            className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${pag === 0 ? 'opacity-30 cursor-not-allowed' : ''} bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white`}>
            ← Errores 1–8
          </button>
          <span className={`text-xs font-bold ${textMuted(isDark)}`}>{pag === 0 ? 'Errores 1–8' : 'Errores 9–16'}</span>
          <button onClick={() => setPag(1)} disabled={pag === 1}
            className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${pag === 1 ? 'opacity-30 cursor-not-allowed' : ''} bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white`}>
            Errores 9–16 →
          </button>
        </div>
        <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
      </div>
    </Shell>
  );
}
