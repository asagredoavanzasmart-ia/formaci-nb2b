import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass, SiglasBar } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs,
  IsoBox, Float, Traveler, PulseDisc, hop, Persona as ScenePersona,
} from '../scene3d';
import { SlideProps, heading, Piso, Bola, Nota, Cita, Paso, Opcion } from '../revops/kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 4 · Personas de comprador, producto y precios
══════════════════════════════════════════════════════════════════ */

const PERSONAS_B = [
  {
    k: 'Qué hacen',
    titulo: '¿Cuál es su rol?',
    desc: 'Responsabilidades del día a día, no el título del cargo. Un VP de Ventas hace pipeline reviews, contrata, despide, negocia contratos y asiste a conferencias. Eso es lo que hace.',
  },
  {
    k: 'Cuál es su dolor',
    titulo: '¿Qué los frustra?',
    desc: 'El dolor que tu producto alivia. No el dolor genérico del sector. El dolor específico, el que les quita el sueño. Sin articular este dolor, el vendedor no puede conectar.',
  },
  {
    k: 'Cómo ganar',
    titulo: '¿Cómo se toma la decisión?',
    desc: 'Los criterios reales de decisión: precio, facilidad de uso, compatibilidad, apoyo del proveedor. No lo que la persona dice públicamente, sino lo que realmente pesa.',
  },
];

export function Persona({ isDark }: SlideProps) {
  const [sel, setSel] = useState(0);
  const P = PERSONAS_B[sel];
  return (
    <Shell isDark={isDark} title="La persona de comprador" highlight="no es un avatar ficticio" subtitle="Una persona de comprador describe qué hace el comprador, cuál es su dolor y cómo se gana su confianza. Sin esos tres elementos, no es una persona: es una plantilla vacía.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[44%] flex flex-col gap-3 justify-center">
          {PERSONAS_B.map((p, k) => <Opcion key={p.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{p.k}</Opcion>)}
          <div className="grid mt-1">
            {PERSONAS_B.map((p, k) => (
              <motion.div key={p.k} className="col-start-1 row-start-1" initial={false}
                animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={`text-lg font-black ${heading(isDark)}`}>{p.titulo}</p>
                  <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="El Job to Be Done · Clayton Christensen" destacada>Las personas no compran productos: contratan soluciones para un trabajo que necesitan hacer. Un CPA no compra un software: <strong>contrata la eliminación del tiempo que pierde en tareas manuales</strong> para llegar más pronto al análisis estratégico. Articula el trabajo que se contrata.</Nota>
          <div className={`p-3.5 rounded-3xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>Ejercicio de calificación F−</p>
            <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>
              Toma una cuenta que perdiste recientemente y un prospecto activo del pipeline. Sin consultar el CRM, escribe en un papel:
            </p>
            <div className="flex flex-col gap-1.5 mt-2">
              {['¿Cuál es el dolor específico de esta persona?', '¿Qué problema resuelve nuestro producto para ella?', '¿Cómo toma decisiones de compra?'].map((q) => (
                <div key={q} className="flex gap-2 items-start">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ff851d] mt-1.5" />
                  <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{q}</span>
                </div>
              ))}
            </div>
            <p className={`text-xs mt-2 font-semibold ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>Si no puedes responder sin el CRM, el equipo necesita trabajo en personas de comprador.</p>
          </div>
          <Nota isDark={isDark} label="Matriz Persona → Dolor → Característica">El puente entre las tres preguntas de la persona y los mensajes de ventas. Para cada persona: su dolor primario y la característica del producto que lo resuelve. Un vendedor que no conoce esta matriz no puede personalizar su mensajería.</Nota>
        </div>
      </div>
    </Shell>
  );
}

export function Producto({ isDark }: SlideProps) {
  const [sel, setSel] = useState(2);
  const TIPOS = [
    { k: 'Vitamina', emoji: '💊', color: '#3b82f6', desc: 'Mejora algo que ya funciona. El comprador la quiere pero no la necesita urgentemente. Sin ella, no pasa nada grave inmediatamente.', ejemplo: 'Un panel de reportes más bonito. Mejor experiencia de usuario. Más integraciones.', venta: 'Solo si el dolor es fuerte y el precio es bajo. De lo contrario, el «más tarde» gana.' },
    { k: 'Dulce',    emoji: '🍬', color: '#a855f7', desc: 'El comprador la quiere aunque no la necesita. Genera placer inmediato, pero no resuelve ningún problema de negocio real.', ejemplo: 'Gamificación de CRM. Dashboards animados. Features «cool» sin ROI claro.', venta: 'Difícil de justificar en empresas con procesos de compra formales. El evangelismo cansa.' },
    { k: 'Analgésico', emoji: '🩹', color: '#ef375c', desc: 'Elimina un dolor real. El comprador no puede esperar porque el costo de no actuar es alto. La urgencia ya existe: solo hay que articularla.', ejemplo: 'Herramienta que elimina trabajo manual de horas diarias. Solución a un problema de compliance.', venta: 'La más poderosa. El vendedor no vende: el dolor cierra el negocio.' },
  ];
  return (
    <Shell isDark={isDark} title="Vitaminas, dulces" highlight="y analgésicos" subtitle="El tipo de producto que vendes determina todo el enfoque comercial: quién compra, cómo argumentas el valor y cuánto urge resolver el dolor.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-3 flex-wrap">
          {TIPOS.map((t, k) => (
            <button key={t.k} onClick={() => setSel(k)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-black transition-all border-2 ${k === sel ? 'border-[#ff851d] text-white' : `border-transparent ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}`}
              style={k === sel ? { background: t.color } : {}}>
              <span>{t.emoji}</span>{t.k}
            </button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[55%] flex flex-col justify-center">
            <div className="grid">
              {TIPOS.map((t, k) => (
                <motion.div key={t.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`} style={{ borderLeft: `4px solid ${t.color}` }}>
                    <p className={`text-2xl font-black mb-1 ${heading(isDark)}`}>{t.emoji} {t.k}</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{t.desc}</p>
                    <p className={`text-xs mt-2 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Ejemplo: {t.ejemplo}</p>
                    <div className={`mt-2 p-2 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-xs font-black ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>Dinámica de venta: {t.venta}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[45%] flex flex-col gap-3 justify-center">
            <Nota isDark={isDark} label="El descuento prematuro" destacada>Ofrecer un descuento antes de que el prospecto lo pida es una señal de que el vendedor no cree en el valor del producto. El prospecto aprende que el precio publicado no es real y espera a pedir descuento en cada compra futura, incluidas las renovaciones.</Nota>
            <Nota isDark={isDark} label="Certificación de demos">Antes de demostrar el producto a un prospecto, el vendedor debe certificarse: una demo ante el equipo, aprobada por alguien con criterio. El objetivo no es memorizar pasos: es probar que el vendedor puede articular el valor de cada característica en términos del dolor del comprador.</Nota>
            <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">El precio nunca es el problema. El dolor es el problema. Si el precio detiene la venta, no articulaste el dolor con suficiente claridad.</Cita>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Contenido({ isDark }: SlideProps) {
  const MATRIX_ROWS = [
    { persona: 'VP de Ventas', dolor: 'Pipeline impredecible', feature: 'Reportes en tiempo real', contenido: 'One-pager de ROI, caso de estudio con métricas de conversión' },
    { persona: 'SDR (Sales Dev. Rep.)', dolor: 'Baja tasa de respuesta', feature: 'Secuencias personalizadas', contenido: 'Guías de prospección por industria, plantillas de e-mail' },
    { persona: 'Director de TI', dolor: 'Integraciones complejas', feature: 'API y conectores nativos', contenido: 'Documentación técnica, hoja de especificaciones de seguridad' },
  ];
  return (
    <Shell isDark={isDark} title="La matriz de contenido" highlight="Persona → Dolor → Feature → Contenido" subtitle="El contenido que no responde al dolor de una persona específica no es contenido de ventas: es contenido de marketing genérico que los vendedores nunca usan.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="overflow-x-auto rounded-2xl">
          <table className={`w-full text-xs ${panelClass(isDark)} rounded-2xl overflow-hidden`}>
            <thead>
              <tr className={isDark ? 'bg-white/10' : 'bg-gray-100'}>
                {['Persona', 'Dolor', 'Característica', 'Contenido a crear'].map((h) => (
                  <th key={h} className={`px-3 py-2 text-left font-black text-[11px] uppercase tracking-wide ${heading(isDark)}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((r, i) => (
                <motion.tr key={r.persona} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className={`border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                  <td className="px-3 py-3"><span className={`font-black text-[#ff851d]`}>{r.persona}</span></td>
                  <td className={`px-3 py-3 ${textMuted(isDark)}`}>{r.dolor}</td>
                  <td className={`px-3 py-3 font-semibold ${heading(isDark)}`}>{r.feature}</td>
                  <td className={`px-3 py-3 ${textMuted(isDark)}`}>{r.contenido}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="lg:w-1/2">
            <Nota isDark={isDark} label="Micro-contenido, no PDFs" destacada>Los PDFs no se leen en la vida real de un vendedor entre llamadas. El micro-contenido —fragmentos de una o dos páginas, respuestas a objeciones específicas, tarjetas de referencia rápida— sí se usa. Crea contenido del tamaño del momento en que se necesita.</Nota>
          </div>
          <div className="lg:w-1/2">
            <Nota isDark={isDark} label="Las battlecards competitivas">Una battlecard describe cómo ganar cuando hay un competidor activo. Incluye: en qué gana el competidor, en qué pierde, qué preguntas hacer para exponer sus debilidades y cómo posicionar tu fortaleza sin atacar directamente. Se actualiza cada vez que pierdas una venta competitiva.</Nota>
          </div>
        </div>
        <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 5 · Herramientas, micro-contenido y objeciones
══════════════════════════════════════════════════════════════════ */

export function Herramientas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const RAZONES = [
    { titulo: 'Falta de compromiso', desc: 'La herramienta se compra, nadie la adopta. Sin un campeón interno que exija su uso, muere en el primer mes.' },
    { titulo: 'Falta de competencia', desc: 'El equipo no sabe usarla bien. Sin formación real (no solo el onboarding del proveedor), la herramienta complica más que facilita.' },
    { titulo: 'Falta de incentivo', desc: 'Si usar la herramienta no ayuda al vendedor a ganar más, no la usará. El incentivo debe ser claro y directo para quien la usa en el día a día.' },
  ];
  return (
    <Shell isDark={isDark} title="Por qué fallan" highlight="las herramientas de ventas" subtitle="La evaluación de herramientas es cara en tiempo y dinero. La mayoría fracasa por razones que no tienen nada que ver con la tecnología en sí.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[50%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 320 220" className="w-full max-h-[220px] overflow-visible" role="img" aria-label="Cangrejo representando la dificultad de las herramientas de ventas">
            <SceneDefs id="set" isDark={isDark} />
            <Piso cx={160} cy={180} s={200} fill={t.floor} />
            <Float amp={5} dur={3}>
              <circle cx={160} cy={90} r={48} fill={BRAND} filter="url(#set-sh)" />
            </Float>
            <text x={160} y={85} textAnchor="middle" fontSize={11} fontWeight={900} fill="#fff">HERRAMIENTA</text>
            <text x={160} y={99} textAnchor="middle" fontSize={10} fill="#fff">de ventas</text>
            {[[-1, 'Compromiso', PEACH], [0, 'Competencia', PEACH], [1, 'Incentivo', BRAND]].map(([offset, label, color], i) => {
              const x = 160 + (Number(offset)) * 95;
              return (
                <g key={String(label)}>
                  <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}>
                    <IsoBox cx={x} cy={160} s={22} h={10} f={color as import('../scene3d').Faces} />
                    <text x={x} y={194} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>{String(label)}</text>
                    <Traveler id="set" path={hop([x, 148], [160, 138], 20)} dur={1.6} delay={i * 0.5} repeatDelay={0.4} r={3} color={ORANGE} />
                  </motion.g>
                </g>
              );
            })}
          </svg>
          <p className={`text-xs text-center mt-2 max-w-xs ${textMuted(isDark)}`}>Tres razones por las que el 70 % de las implementaciones de herramientas de ventas no logran adopción duradera.</p>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          {RAZONES.map((r, i) => (
            <motion.div key={r.titulo} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <Nota isDark={isDark} label={r.titulo} destacada={i === 0}>{r.desc}</Nota>
            </motion.div>
          ))}
          <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
            <p className={microLabel(isDark)}>La analogía del cangrejo</p>
            <p className={`text-xs leading-snug mt-1 ${textMuted(isDark)}`}>Comer cangrejo es complicado: hay que romper el caparazón, extraer la carne, descartarlo y repetir. Muchas herramientas de ventas son así. Si la implementación requiere más trabajo que el valor que entrega, cancela y sigue adelante.</p>
          </div>
          <Nota isDark={isDark} label="Monitorea y actúa">Si el 40 % del equipo no usa la herramienta después de 60 días, investiga antes de cancelar: ¿es falta de competencia, de incentivo, o la herramienta simplemente no encaja con el flujo de trabajo real?</Nota>
        </div>
      </div>
    </Shell>
  );
}

export function Microcontenido({ isDark }: SlideProps) {
  const FORMATO = [
    { tipo: 'Respuesta a objeción', desc: '«No tenemos presupuesto ahora.» → Una tarjeta de media página con la pregunta de apertura, el reencuadre y el puente al próximo paso.', },
    { tipo: 'Battlecard competitiva', desc: 'Competidor activo en el negocio → Dos columnas: dónde ganamos y dónde perdemos, con la pregunta táctica para cada caso.', },
    { tipo: 'Script de llamada fría', desc: 'Primera llamada en 30 segundos: personalización, gancho de dolor, pregunta de apertura. No un guión: una guía de conversación.', },
    { tipo: 'Resumen de caso de estudio', desc: 'Una página: empresa, dolor, solución, resultado medible en número. No una presentación de diez diapositivas.', },
  ];
  return (
    <Shell isDark={isDark} title="Micro-contenido:" highlight="del tamaño del momento" subtitle="El contenido que nadie usa no es activo de ventas, es deuda. El tamaño correcto del contenido es el mínimo necesario para que el vendedor avance una conversación.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[55%] flex flex-col gap-2.5 justify-center">
          {FORMATO.map((f, i) => (
            <motion.div key={f.tipo} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className={`flex gap-3 items-start p-3 rounded-2xl ${i % 2 === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <span className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white">{i + 1}</span>
                <div>
                  <p className={`text-sm font-black ${heading(isDark)}`}>{f.tipo}</p>
                  <p className={`text-xs leading-snug mt-0.5 ${textMuted(isDark)}`}>{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="lg:w-[45%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="Objeciones con preguntas, no respuestas" destacada>La respuesta a una objeción nunca es un argumento: es una pregunta. «No tenemos presupuesto ahora» → «¿Qué tendría que pasar para que esto fuera una prioridad este año?» La pregunta descomprime la objeción y abre la conversación de valor real.</Nota>
          <Nota isDark={isDark} label="Taller de objeciones">Cada trimestre, el equipo se reúne y lista las cinco objeciones más frecuentes. Para cada una diseña una respuesta basada en preguntas. Las mejores respuestas se convierten en micro-contenido que todos usan.</Nota>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Un archivo de objeciones con respuestas directas enseña al vendedor a pelear. Un archivo con preguntas le enseña a ganar.</Cita>
        </div>
      </div>
    </Shell>
  );
}

export function Objeciones({ isDark }: SlideProps) {
  const TIPOS_OBJ = [
    { k: 'Presupuesto', ej: '«No tenemos presupuesto ahora»', preg: '«¿Qué tendría que pasar para que esto sea prioritario este año?»' },
    { k: 'Timing',     ej: '«Ahora no es el momento»',        preg: '«¿Cuándo sería el momento correcto y qué cambiaría entonces?»' },
    { k: 'Autoridad',  ej: '«Necesito consultarlo con mi jefe»', preg: '«Si dependiera solo de ti, ¿estarías dispuesto a avanzar?»' },
    { k: 'Necesidad',  ej: '«Ya tenemos una solución»',       preg: '«¿Qué debería mejorar esa solución para que fuera perfecta?»' },
    { k: 'Competencia',ej: '«Estamos evaluando otras opciones»', preg: '«¿Cuáles son los criterios más importantes para tu decisión final?»' },
  ];
  const [sel, setSel] = useState(0);
  const O = TIPOS_OBJ[sel];
  return (
    <Shell isDark={isDark} title="Objeciones:" highlight="convertirlas en preguntas" subtitle="Las objeciones no son rechazos. Son solicitudes de más información o señales de que el vendedor no articuló el valor del dolor con suficiente claridad.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {TIPOS_OBJ.map((o, k) => <Pill key={o.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{o.k}</Pill>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[52%] flex flex-col justify-center">
            <div className="grid">
              {TIPOS_OBJ.map((o, k) => (
                <motion.div key={o.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className="flex flex-col gap-3">
                    <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                      <p className={microLabel(isDark)}>El prospecto dice</p>
                      <p className={`text-lg font-black mt-0.5 italic ${heading(isDark)}`}>{o.ej}</p>
                    </div>
                    <div className={`p-4 rounded-3xl border-l-4 border-[#ff851d] ${panelClass(isDark)}`}>
                      <p className={microLabel(isDark)}>El vendedor pregunta</p>
                      <p className={`text-base font-black mt-0.5 text-[#ff851d]`}>{o.preg}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <Nota isDark={isDark} label="Por qué funcionan las preguntas" destacada>Un argumento defensivo confirma que la objeción tiene peso. Una pregunta abre la posibilidad de que el prospecto descubra, por sí mismo, que la objeción es superable. La gente rara vez cambia de opinión cuando alguien le argumenta en contra.</Nota>
            <Nota isDark={isDark} label="Las tres capas de una objeción">1. La objeción que dicen. 2. La objeción real que no dicen (precio = no confían en el ROI). 3. El miedo que subyace (comprar y que no funcione). La pregunta correcta baja un nivel en cada respuesta, hasta llegar al miedo real.</Nota>
            <Nota isDark={isDark} label="Actualizar el archivo">Cada trimestre, el equipo documenta las objeciones nuevas que surgieron y actualiza las preguntas que funcionaron. El archivo de objeciones es un activo vivo, no un documento estático.</Nota>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 6 · ICP, especialización y negociación
══════════════════════════════════════════════════════════════════ */

const ICP_BUCKETS = [
  { k: 'Ganadoras', desc: 'Cuentas que ya cerraste y son clientes felices. Son el punto de partida: tienen características en común que definen tu ICP real.', color: '#22c55e' },
  { k: 'Perdidas',  desc: 'Cuentas que pudiste cerrar pero no lo hiciste. Revelan dónde el posicionamiento o el proceso fallan.', color: '#eab308' },
  { k: 'Nunca ganarás', desc: 'Cuentas fuera de alcance por precio, industria o tamaño. Ignorarlas es tan importante como identificar las ganadoras.', color: '#ef375c' },
  { k: 'No deberías ganar', desc: 'Cuentas que podrías cerrar pero te crearían más problemas que valor: alta fricción en onboarding, churn elevado, soporte desproporcionado.', color: '#f97316' },
  { k: 'Aún no ganadoras', desc: 'Cuentas que están en el mercado pero aún no te han comprado. Oportunidad activa si encajan con el ICP.', color: '#6366f1' },
];

export function Icp({ isDark }: SlideProps) {
  const [sel, setSel] = useState(0);
  return (
    <Shell isDark={isDark} title="ICP: Perfil de cliente ideal" highlight="los cinco segmentos de mercado" subtitle="El ICP (Ideal Customer Profile, perfil de cliente ideal) no se diseña en una sala de juntas: se extrae de los datos de clientes reales. Sin datos, es una opinión.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {ICP_BUCKETS.map((b, k) => (
            <button key={b.k} onClick={() => setSel(k)}
              className={`px-3 py-1.5 rounded-full text-xs font-black transition-all border-2 ${k === sel ? 'text-white border-transparent' : `border-transparent ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}`}
              style={k === sel ? { background: b.color } : {}}>
              {b.k}
            </button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[50%] flex flex-col justify-center">
            <div className="grid">
              {ICP_BUCKETS.map((b, k) => (
                <motion.div key={b.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`} style={{ borderLeft: `4px solid ${b.color}` }}>
                    <p className={`text-xl font-black ${heading(isDark)}`}>{b.k}</p>
                    <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <Nota isDark={isDark} label="ICP (Ideal Customer Profile)" destacada>ICP son las siglas de Ideal Customer Profile: el perfil del tipo de cliente con mayor probabilidad de comprar, de renovar y de recomendar. Incluye variables como industria, tamaño, tecnología usada, dolor principal y velocidad de decisión.</Nota>
            <Nota isDark={isDark} label="Metas negativas">Definir a quién NO perseguir es tan estratégico como definir a quién sí. Las cuentas del cuadrante «No deberías ganar» consumen recursos que podrían ir al ICP real. Documentarlas explícitamente evita que el equipo de ventas las persiga.</Nota>
            <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Perseguir negocios fuera del ICP es como intentar enseñar a nadar a un gato: teóricamente posible, pero no es una buena idea para ninguno de los dos.</Cita>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Especializacion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Investigación vs. alcance:" highlight="la especialización importa" subtitle="Combinar en una misma persona la responsabilidad de investigar prospectos y ejecutar el alcance es el error de diseño más costoso en un equipo de ventas en crecimiento.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[46%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 320 230" className="w-full max-h-[230px] overflow-visible" role="img" aria-label="Hombre gordo en carrera de relevos representando el costo de combinar roles">
            <SceneDefs id="see" isDark={isDark} />
            <Piso cx={160} cy={196} s={220} fill={t.floor} />
            <motion.g initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Float amp={3} dur={2.2}>
                <ScenePersona id="see-a" cx={105} cy={188} s={1} body={PEACH} accessory="megaphone" />
              </Float>
              <text x={105} y={218} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>Investiga</text>
            </motion.g>
            <motion.g initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Float amp={3} dur={2.5} delay={0.3}>
                <ScenePersona id="see-b" cx={215} cy={188} s={1} body={BRAND} accessory="tie" />
              </Float>
              <text x={215} y={218} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>Hace alcance</text>
            </motion.g>
            <Traveler id="see" path={hop([140, 168], [180, 168], 20)} dur={1.4} repeatDelay={0.8} r={4} color={ORANGE} />
            <text x={160} y={80} textAnchor="middle" fontSize={12} fontWeight={900} fill={t.text}>Modelo especializado</text>
            <text x={160} y={95} textAnchor="middle" fontSize={10} fill={t.muted}>El investigador alimenta al prospectador</text>
          </svg>
          <p className={`text-xs text-center mt-1 max-w-xs ${textMuted(isDark)}`}>El SDR (Sales Development Representative) hace el alcance; el investigador prepara los datos del prospecto.</p>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="El hombre gordo en la carrera de relevos" destacada>Imagina que en la carrera de relevos hay un corredor que también carga todo el equipo del equipo. Así funciona el SDR que investiga Y hace alcance al mismo tiempo: el esfuerzo de investigación consume el tiempo y la energía que debería ir al contacto real con el prospecto.</Nota>
          <Nota isDark={isDark} label="Social selling como sistema">LinkedIn no es para vender; es para no ser un extraño cuando llamas. El checklist de social selling: perfil completo, contenido relevante publicado, comentarios con valor en la industria del prospecto. El SDR llega a la llamada con contexto, no como un desconocido.</Nota>
          <div className="flex flex-col gap-2">
            {['Perfil completo y orientado al cliente, no al currículum', 'Publica o comenta contenido relevante para tu ICP', 'Conéctate antes de prospectar: sé conocido primero'].map((c, i) => (
              <div key={c} className={`flex gap-2 items-start p-2 rounded-xl ${panelClass(isDark)}`}>
                <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black bg-[#ff851d] text-white mt-0.5">{i + 1}</span>
                <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{c}</span>
              </div>
            ))}
          </div>
          <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
        </div>
      </div>
    </Shell>
  );
}

const BATNA_VARS = [
  { k: 'Aspiración',              desc: 'El mejor resultado posible. Tu punto de partida en la negociación. Pide más de lo que esperas obtener.' },
  { k: 'Punto de reserva',        desc: 'El mínimo aceptable. Por debajo de este punto, es mejor retirarse.' },
  { k: 'BATNA',                   desc: 'Best Alternative to a Negotiated Agreement (mejor alternativa al acuerdo). Si esta negociación falla, ¿qué haces? Tu BATNA define tu poder real.' },
  { k: 'Oferta inicial',          desc: 'La primera oferta que haces o recibes. Raramente es el precio final, pero ancla toda la conversación.' },
  { k: 'Zona de posible acuerdo', desc: 'El rango entre tu punto de reserva y el del otro lado. Si se superponen, hay acuerdo posible.' },
];

export function Negociacion({ isDark }: SlideProps) {
  const [sel, setSel] = useState(2);
  return (
    <Shell isDark={isDark} title="El marco BATNA" highlight="y las variables de negociación" subtitle="La negociación no es sobre precio. Es sobre el conjunto de variables que determinan el valor del acuerdo para ambas partes. El precio es solo una de más de diez.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {BATNA_VARS.map((b, k) => <Pill key={b.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{b.k}</Pill>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[50%] flex flex-col justify-center">
            <div className="grid">
              {BATNA_VARS.map((b, k) => (
                <motion.div key={b.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <p className={`text-xl font-black ${heading(isDark)}`}>{b.k}</p>
                    <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
            <p className={microLabel(isDark)}>Las diez variables de una negociación</p>
            {['Precio', 'Términos de pago', 'Duración del contrato', 'Alcance de la implementación', 'Nivel de soporte', 'Formación incluida', 'Integraciones', 'SLA (acuerdo de nivel de servicio)', 'Cláusulas de salida', 'Nombre de referencia (ser caso de estudio)'].map((v, i) => (
              <div key={v} className={`flex gap-2.5 items-center p-1.5 rounded-xl ${i === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
                <span className={`shrink-0 w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-black ${i === 0 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{i + 1}</span>
                <span className={`text-xs font-medium ${i === 0 ? `font-black ${heading(isDark)}` : textMuted(isDark)}`}>{v}</span>
                {i === 0 && <span className={`ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full text-[#ff851d] ${isDark ? 'bg-white/5' : 'bg-orange-50'}`}>≠ el único</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
