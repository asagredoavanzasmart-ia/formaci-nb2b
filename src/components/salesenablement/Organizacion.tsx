import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass, SiglasBar, Quiz, QuizQ } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs,
  IsoBox, Float, Traveler, PulseDisc, hop, Persona, type Faces,
} from '../scene3d';
import { SlideProps, heading, Piso, Bola, Nota, Cita, Paso, Opcion } from '../revops/kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 7 · Éxito del cliente, referidos y renovaciones
══════════════════════════════════════════════════════════════════ */

export function Referidos({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Referidos vs. recomendaciones:" highlight="el cliente como fuente de ingresos" subtitle="Un referido es activo. Una recomendación es pasiva. La diferencia entre los dos puede determinar si tu empresa crece por boca a boca o no crece.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-3">
          <svg viewBox="0 0 320 220" className="w-full max-h-[220px] overflow-visible" role="img" aria-label="Persona A busca empleo por contactos; Persona B ya tiene el trabajo">
            <SceneDefs id="ser" isDark={isDark} />
            <Piso cx={160} cy={186} s={200} fill={t.floor} />
            <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Float amp={4} dur={2.4}>
                <Persona id="ser-a" cx={100} cy={178} s={0.95} body={PEACH} accessory="megaphone" />
              </Float>
              <text x={100} y={212} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>Persona A</text>
              <text x={100} y={224} textAnchor="middle" fontSize={9} fill={t.muted}>(busca trabajo)</text>
            </motion.g>
            <motion.g initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Float amp={4} dur={2.6} delay={0.2}>
                <Persona id="ser-b" cx={220} cy={178} s={0.95} body={BRAND} accessory="tie" />
              </Float>
              <text x={220} y={212} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>Persona B</text>
              <text x={220} y={224} textAnchor="middle" fontSize={9} fill={t.muted}>(cliente feliz)</text>
            </motion.g>
            <IsoBox cx={160} cy={100} s={26} h={12} f={BRAND} />
            <text x={160} y={88} textAnchor="middle" fontSize={10} fontWeight={900} fill={ORANGE}>Empresa</text>
            <Traveler id="ser" path={hop([100, 158], [160, 112], 24)} dur={1.6} delay={0.3} repeatDelay={0.5} r={3.5} color={PINK} />
            <Traveler id="ser2" path={hop([220, 158], [160, 112], 24)} dur={1.6} delay={0.7} repeatDelay={0.5} r={3.5} color={ORANGE} />
          </svg>
          <p className={`text-xs text-center max-w-xs ${textMuted(isDark)}`}>La Persona B tiene lo que la Persona A busca. El cliente feliz conecta activamente, no solo menciona el producto.</p>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <div className="flex flex-col gap-2.5">
            <div className={`p-3.5 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Recomendación (pasiva)</p>
              <p className={`text-base font-black mt-0.5 ${heading(isDark)}`}>«Si alguna vez necesitas algo, habla con ellos»</p>
              <p className={`text-xs leading-snug mt-1 ${textMuted(isDark)}`}>El cliente menciona tu empresa si le preguntan directamente o si el tema surge. No hay acción proactiva de su parte.</p>
            </div>
            <div className={`p-3.5 rounded-3xl border-l-4 border-[#ff851d] ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Referido (activo)</p>
              <p className={`text-base font-black mt-0.5 text-[#ff851d]`}>«Déjame conectarte con ellos ahora»</p>
              <p className={`text-xs leading-snug mt-1 ${textMuted(isDark)}`}>El cliente hace la introducción, pone su credibilidad en el nombre y facilita la primera conversación. Esto solo pasa si el cliente está genuinamente satisfecho y se le pide explícitamente.</p>
            </div>
          </div>
          <Nota isDark={isDark} label="Todos son una fuente de referidos">No solo los clientes actuales. Prospectos que dijeron no, exempleados, proveedores, personas en tu red que conocen tu trabajo. El sistema de referidos empieza por pedir explícitamente, no esperar que lleguen solos.</Nota>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">Tu mejor vendedor es un cliente que grita desde los tejados lo que tu producto hizo por ellos. Ese cliente no aparece por accidente.</Cita>
        </div>
      </div>
    </Shell>
  );
}

export function Renovacion({ isDark }: SlideProps) {
  const FASES = [
    { k: 'Upsell',      desc: 'Más del mismo producto: más licencias, más usuarios, más capacidad. El camino más corto porque el dolor ya está resuelto y la confianza ya existe.' },
    { k: 'Cross-sell',  desc: 'Producto complementario: un módulo adicional, una integración, una línea de servicios. Requiere articular un nuevo dolor que el cliente aún no resolvió.' },
    { k: 'Renovación',  desc: 'Espejo de la venta original. Si el cliente está satisfecho, la renovación es una formalidad. Si no, descubres el churn tres meses antes de que ocurra.' },
  ];
  const [sel, setSel] = useState(0);
  return (
    <Shell isDark={isDark} title="Upsell, cross-sell" highlight="y renovaciones" subtitle="El crecimiento de ingresos dentro de la base de clientes actual es generalmente más eficiente que adquirir nuevos clientes. Pero solo ocurre con un proceso deliberado.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {FASES.map((f, k) => <Pill key={f.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{f.k}</Pill>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[50%] flex flex-col justify-center">
            <div className="grid">
              {FASES.map((f, k) => (
                <motion.div key={f.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <p className={`text-xl font-black ${heading(isDark)}`}>{f.k}</p>
                    <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <Nota isDark={isDark} label="Las renovaciones se trabajan hoy" destacada>Una renovación que se trabaja en los últimos 30 días antes del vencimiento ya llegó tarde. El trabajo de renovación empieza desde el día 1 de la relación: QBRs (revisiones trimestrales de negocio), salud del uso, expansión de valor.</Nota>
            <Nota isDark={isDark} label="El proceso de ventas se repite">Una renovación sigue el mismo proceso que una nueva venta. Hay nuevos tomadores de decisión, nuevos criterios de evaluación, quizás competidores activos. Tratar la renovación como un «contrato automático» es el error más costoso de retención.</Nota>
            <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>KPIs de éxito del cliente a medir</p>
              {['Net Revenue Retention (NRR) ≥ 100 %', 'Net Promoter Score (NPS) por segmento', 'Tasa de expansión vs. churn por cohorte'].map((kpi) => (
                <div key={kpi} className="flex gap-2 items-center mt-1.5">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ff851d] mt-0" />
                  <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{kpi}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Talento({ isDark }: SlideProps) {
  const SEÑALES = [
    'Busca activamente otro empleo durante horas de trabajo',
    'Comportamiento inexplicablemente diferente al habitual',
    'Se desconecta de las reuniones de equipo',
    'Deja de pedir feedback o de participar en conversaciones sobre su carrera',
    'Sus números bajan de forma sostenida sin causa externa evidente',
    'Empieza a distanciarse de colegas con quienes tenía buena relación',
    'Hace preguntas inusuales sobre políticas de vacaciones o beneficios',
  ];
  return (
    <Shell isDark={isDark} title="Por qué los mejores" highlight="representantes renuncian" subtitle="Un SDR exitoso no es necesariamente un AE exitoso. Y un AE exitoso no es necesariamente un gerente efectivo. Promover sin evaluar los tres factores termina mal.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="El error de la promoción automática" destacada>El mejor SDR (Sales Development Representative) que conviertes en AE (Account Executive) sin evaluar sus habilidades de cierre es el peor AE del equipo seis meses después. El éxito en un rol no predice el éxito en el siguiente.</Nota>
          <Nota isDark={isDark} label="SMART para cada rol">Antes de contratar o promover: define metas SMART (Specific, Measurable, Achievable, Relevant, Time-bound) específicas para ese cargo. La persona que entrevistas debe saber exactamente qué significa el éxito en los primeros 30-60-90 días.</Nota>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">El gerente de ventas que no hace coaching sistemático está dejando dinero sobre la mesa cada semana, incluso si los números son buenos hoy.</Cita>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>7 señales de que un representante está a punto de renunciar</p>
          {SEÑALES.map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className={`flex gap-2.5 items-start p-2 rounded-xl ${panelClass(isDark)}`}>
              <span className={`shrink-0 w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-black text-white`}
                style={{ background: `hsl(${10 + i * 18}, 80%, 55%)` }}>{i + 1}</span>
              <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{s}</span>
            </motion.div>
          ))}
          <SiglasBar isDark={isDark} keys={['SDR', 'AE']} />
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 8 · Gerente, posición y el cliente como herramienta
══════════════════════════════════════════════════════════════════ */

const COMPETENCIAS_GM = [
  { k: 'Accountability',            desc: 'Inspecciona lo que esperas. Las métricas, los comportamientos y los resultados se miden; sin inspección, la expectativa se convierte en una recomendación.' },
  { k: 'Coaching',                  desc: 'Identifica el siguiente comportamiento que hay que mejorar para cada representante y diseña cómo trabajarlo en el campo, no solo en sala.' },
  { k: 'Mentoring',                 desc: 'Desarrolla la carrera a largo plazo del representante, más allá de las métricas del trimestre. El mentor trabaja con la persona, no solo con el vendedor.' },
  { k: 'Contratación y formación',  desc: 'La calidad del siguiente representante que entra al equipo es más importante que cualquier decisión táctica del trimestre. Contratar mal cuesta caro y tarda meses en verse.' },
  { k: 'Liderazgo y motivación',    desc: 'Mantiene la cultura, la energía y la dirección del equipo. No solo celebra victorias: gestiona las rachas de pérdidas sin destruir la moral.' },
];

export function Gerente({ isDark }: SlideProps) {
  const [sel, setSel] = useState(0);
  return (
    <Shell isDark={isDark} title="El gerente de ventas:" highlight="5 competencias críticas" subtitle="El gerente de ventas que sigue siendo el mejor cerrador del equipo es el que menos impacto tiene. Su trabajo es multiplicar el rendimiento de otros, no el suyo propio.">
      <div className="h-full flex flex-col gap-4 min-h-0 justify-center">
        <div className="flex gap-2 flex-wrap">
          {COMPETENCIAS_GM.map((c, k) => <Pill key={c.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{c.k}</Pill>)}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          <div className="lg:w-[50%] flex flex-col justify-center">
            <div className="grid">
              {COMPETENCIAS_GM.map((c, k) => (
                <motion.div key={c.k} className="col-start-1 row-start-1" initial={false}
                  animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                  style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <p className={`text-xl font-black ${heading(isDark)}`}>{c.k}</p>
                    <p className={`text-sm leading-snug mt-1.5 ${textMuted(isDark)}`}>{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <Nota isDark={isDark} label="La trampa del super-cerrador" destacada>Cuando el gerente sigue cerrando los negocios difíciles en lugar de enseñar al representante a cerrarlos, el equipo nunca madura. El gerente se vuelve indispensable para los negocios grandes, y eso es exactamente lo que no debería pasar.</Nota>
            <Nota isDark={isDark} label="Bored → Learning → Lost">El marco para diagnosticar el rendimiento de un representante: ¿está aburrido (necesita más desafío), aprendiendo (en el lugar correcto) o perdido (necesita intervención inmediata)? La intervención correcta depende del diagnóstico correcto.</Nota>
            <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Las tres etapas del representante</p>
              {[{ e: 'Aburrido', a: 'Nuevo desafío, expansión de rol o búsqueda de nuevo talento' }, { e: 'Aprendiendo', a: 'Coaching focalizado, más exposición al campo' }, { e: 'Perdido', a: 'Plan de mejora con plazos claros o salida honesta' }].map((r) => (
                <div key={r.e} className="flex gap-2 items-start mt-1.5">
                  <span className="shrink-0 font-black text-[#ff851d] text-xs min-w-[60px]">{r.e}</span>
                  <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{r.a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Posicion({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Nadie puede hacerlo todo:" highlight="el ecosistema como Finance y HR" subtitle="Sales Enablement no es un problema de un departamento. Es una responsabilidad distribuida que, si se concentra en una sola persona, fracasa.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
          <Nota isDark={isDark} label="La analogía de Finance y HR" destacada>Nadie dice que Finance es solo responsabilidad del CFO. Todos en la empresa tienen responsabilidad financiera: presupuestar, no gastar de más, reportar con precisión. Lo mismo aplica a RRHH: todos los gerentes contratan, retienen y despiden. Sales Enablement funciona igual: todos tienen una parte de la responsabilidad.</Nota>
          <Nota isDark={isDark} label="El 0 % de probabilidad">Hay un cero por ciento de probabilidad de que una sola persona pueda diseñar el proceso, implementar la metodología, crear el contenido, administrar las herramientas, hacer el onboarding, ejecutar el coaching y medir resultados, todo al mismo tiempo y bien.</Nota>
          <Cita isDark={isDark} autor="Cory Bray y Hilmon Sorey">La persona que tiene todas las respuestas sobre Sales Enablement no existe. El ecosistema que las distribuye, sí.</Cita>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
          <p className={microLabel(isDark)}>Quién hace qué en el ecosistema de Sales Enablement</p>
          {[
            { rol: 'CEO / Fundadores',        resp: 'Vision, recursos, cultura de ventas. Participan en las conversaciones con clientes.' },
            { rol: 'VP de Ventas',            resp: 'Proceso, metodología, métricas. Responsable final del pipeline y del forecast.' },
            { rol: 'Marketing',               resp: 'ICP, mensajería, contenido por persona y dolor. Battlecards, casos de éxito.' },
            { rol: 'Producto',                resp: 'Formación en características nuevas, demos técnicas, posicionamiento competitivo.' },
            { rol: 'Éxito del cliente',       resp: 'Referidos, upsell, renovaciones. Los primeros en saber cuándo un cliente está en riesgo.' },
            { rol: 'Gerentes de ventas',      resp: 'Coaching, accountability, contratación. Inspeccionar lo que esperan.' },
          ].map((r, i) => (
            <motion.div key={r.rol} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className={`flex gap-2.5 items-start p-2 rounded-xl ${i % 2 === 0 ? featuredClass(isDark) : panelClass(isDark)}`}>
              <span className="shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-black bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white min-w-[80px] text-center">{r.rol}</span>
              <span className={`text-xs leading-snug ${textMuted(isDark)}`}>{r.resp}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function Cliente({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const PATAS = [
    { k: 'Visión',                     desc: 'La dirección hacia donde va la empresa. Define qué tipo de clientes construyen el caso de uso ideal y cuáles no.' },
    { k: 'Feedback cualitativo',        desc: 'Qué dicen los clientes en voz: qué aman, qué odian, qué les falta. Se captura en conversaciones directas cada trimestre.' },
    { k: 'Feedback cuantitativo',       desc: 'NPS, uso de funcionalidades, tickets de soporte, tiempo hasta el primer valor. Los números detrás de los sentimientos.' },
  ];
  const [sel, setSel] = useState(0);
  return (
    <Shell isDark={isDark} title="El cliente como herramienta #1" highlight="de Sales Enablement" subtitle="Todos en la empresa deben tener conversaciones directas con clientes al menos una vez por trimestre. No solo el equipo de ventas. Todos.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0 justify-center">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-3">
          <svg viewBox="0 0 320 230" className="w-full max-h-[220px] overflow-visible" role="img" aria-label="Taburete de tres patas: visión, feedback cualitativo y cuantitativo">
            <SceneDefs id="sec" isDark={isDark} />
            <Piso cx={160} cy={190} s={220} fill={t.floor} />
            <IsoBox cx={160} cy={130} s={58} h={28} f={BRAND} />
            <text x={160} y={123} textAnchor="middle" fontSize={12} fontWeight={900} fill="#fff">El</text>
            <text x={160} y={138} textAnchor="middle" fontSize={12} fontWeight={900} fill="#fff">Cliente</text>
            {[[-1, 'Visión', PEACH], [0, 'Cualitativo', BRAND], [1, 'Cuantitativo', PEACH]].map(([offset, label, color], i) => {
              const x = 160 + (Number(offset)) * 88;
              return (
                <motion.g key={String(label)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}>
                  <IsoBox cx={x} cy={175} s={22} h={10} f={color as Faces} />
                  <text x={x} y={207} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={t.muted}>{String(label)}</text>
                </motion.g>
              );
            })}
            <text x={160} y={44} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.muted}>Taburete de tres patas</text>
          </svg>
          <div className="flex gap-2 flex-wrap justify-center">
            {PATAS.map((p, k) => <Pill key={p.k} isDark={isDark} on={k === sel} onClick={() => setSel(k)}>{p.k}</Pill>)}
          </div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
          <div className="grid">
            {PATAS.map((p, k) => (
              <motion.div key={p.k} className="col-start-1 row-start-1" initial={false}
                animate={{ opacity: k === sel ? 1 : 0, y: k === sel ? 0 : 6 }} transition={{ duration: 0.28 }}
                style={{ pointerEvents: k === sel ? 'auto' : 'none' }}>
                <Nota isDark={isDark} label={p.k} destacada>{p.desc}</Nota>
              </motion.div>
            ))}
          </div>
          <Nota isDark={isDark} label="Reuniones con clientes todos los trimestres">No solo el CEO o el VP de Ventas. Los ingenieros, los diseñadores, los gerentes de producto. Cada conversación directa con un cliente revela algo que ningún reporte interno puede capturar: el idioma real del dolor, los casos de uso que nadie documentó, las fricciones que el equipo de soporte ya resolvió pero que siguen ocurriendo.</Nota>
          <Nota isDark={isDark} label="Ejecutar, iterar, desarrollar personas">El libro cierra con tres palabras: ejecuta el ecosistema que construiste, itera con los datos que el mercado te devuelve, y desarrolla a las personas que hacen que todo funcione. Sin los tres, el sistema se detiene.</Nota>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TEST BÁSICO
══════════════════════════════════════════════════════════════════ */

const Q_BASICO: QuizQ[] = [
  {
    q: '¿Cómo define el libro "Sales Enablement"?',
    options: [
      'Un cargo dedicado al onboarding de nuevos representantes',
      'La extensión de una mentalidad centrada en el prospecto a todos los departamentos',
      'El proceso de automatización del CRM y las herramientas de ventas',
      'El entrenamiento mensual del equipo de ventas',
    ],
    answer: 1,
    why: 'Sales Enablement es un ecosistema, no un cargo. Forrester lo definió en 2010 como el puente entre la estrategia de salida al mercado y la ejecución táctica.',
  },
  {
    q: '¿Cuáles son los tres estados del proceso de ventas según Bray y Sorey?',
    options: [
      'Creciendo, estable y en declive',
      'Funcionando, experimentando y se agita (thrashing)',
      'Activo, inactivo y en pausa',
      'Optimizado, en construcción y roto',
    ],
    answer:1,
    why: 'Los tres estados son: Funcionando (>80% al cuota consistentemente), Experimentando (mejora controlada) y Se Agita (cultura de problema que destruye la capacidad de vender).',
  },
  {
    q: '¿Qué son BANT?',
    options: [
      'Bandas de precios para negociación (Basic, Average, Notable, Top)',
      'Budget, Authority, Need y Timing: criterios de calificación de oportunidades',
      'Business Automation, Nurturing y Targeting: metodología de marketing',
      'Buyer Awareness, Need y Transaction: etapas del buyer journey',
    ],
    answer:1,
    why: 'BANT son los criterios de salida para la primera etapa del proceso de ventas: Budget (presupuesto), Authority (autoridad), Need (necesidad) y Timing (plazo).',
  },
  {
    q: '¿Qué significa GIGO en el contexto del CRM?',
    options: [
      'General Intelligence for Growth Operations: IA aplicada al CRM',
      'Garbage In, Garbage Out: si entras datos malos, obtienes reportes malos',
      'Go-to-market Intelligence and Growth Optimization',
      'Global Integration Gateway Operations: protocolo de integración',
    ],
    answer:1,
    why: 'GIGO es Garbage In, Garbage Out. El texto libre y los datos mal estructurados en el CRM generan reportes incorrectos que llevan a decisiones equivocadas.',
  },
  {
    q: '¿Cuál es la principal diferencia entre metodología y proceso de ventas?',
    options: [
      'El proceso define qué etapas hay; la metodología define cómo navegar los eventos dentro de cada etapa',
      'Son sinónimos: ambos describen cómo vender paso a paso',
      'La metodología es para vendedores junior; el proceso es para vendedores senior',
      'El proceso se aplica antes de la demo; la metodología después del cierre',
    ],
    answer:0,
    why: 'El proceso son las etapas (calificación, demo, propuesta, cierre). La metodología es cómo el vendedor navega los eventos dentro de cada etapa: cómo descubrir el dolor, manejar objeciones, crear urgencia.',
  },
  {
    q: '¿Qué son los tres elementos de una persona de comprador según el libro?',
    options: [
      'Nombre, cargo y empresa',
      'Qué hacen, cuál es su dolor y cómo ganar su confianza',
      'Edad, industria y tamaño de empresa',
      'Objetivos, presupuesto y ciclo de decisión',
    ],
    answer:1,
    why: 'Una persona de comprador debe responder: qué hace el comprador en su rol (no solo el título), cuál es su dolor específico, y cómo se gana su confianza (criterios reales de decisión).',
  },
  {
    q: '¿Por qué fallan la mayoría de las implementaciones de herramientas de ventas?',
    options: [
      'Por problemas técnicos de integración con el CRM existente',
      'Por falta de compromiso, competencia o incentivo para usarlas',
      'Por el alto costo de las licencias empresariales',
      'Por la resistencia del equipo de TI a aprobar nuevas plataformas',
    ],
    answer:1,
    why: 'Las tres razones del fracaso son: falta de compromiso (nadie la adopta), falta de competencia (el equipo no sabe usarla bien) y falta de incentivo (usarla no ayuda al vendedor a ganar más).',
  },
  {
    q: '¿Qué es el ICP?',
    options: [
      'Internal Communication Protocol: el proceso de comunicación entre equipos',
      'Ideal Customer Profile: el perfil del tipo de cliente con mayor probabilidad de comprar, renovar y recomendar',
      'Incremental Customer Pricing: la estrategia de precios para clientes existentes',
      'Integrated Content Platform: el sistema de gestión de contenido de ventas',
    ],
    answer:1,
    why: 'ICP son las siglas de Ideal Customer Profile (perfil de cliente ideal). Define el tipo de cuenta con mayor probabilidad de comprar, tener éxito con el producto, renovar y recomendar. Se construye a partir de datos de clientes reales, no de suposiciones.',
  },
  {
    q: '¿Cuál es la diferencia entre un referido y una recomendación?',
    options: [
      'Son sinónimos; ambos describen a un cliente que menciona el producto',
      'El referido es activo (el cliente conecta proactivamente); la recomendación es pasiva (menciona si le preguntan)',
      'El referido viene de un cliente; la recomendación viene de un prospecto',
      'La recomendación tiene un incentivo económico; el referido no',
    ],
    answer:1,
    why: 'Un referido es activo: el cliente hace la introducción y pone su credibilidad. Una recomendación es pasiva: el cliente menciona el producto si le preguntan. Solo el referido activo genera oportunidades consistentes.',
  },
  {
    q: '¿Cuáles son las 5 competencias críticas del gerente de ventas?',
    options: [
      'Prospección, Cierre, Negociación, Gestión del tiempo y Reportes',
      'Accountability, Coaching, Mentoring, Contratación/Formación y Liderazgo/Motivación',
      'Análisis de datos, Comunicación, Estrategia, Ejecución y Networking',
      'Onboarding, Forecasting, Pipeline, Territory Management y Compensation',
    ],
    answer:1,
    why: 'Las cinco competencias del gerente de ventas son: Accountability (inspeccionar lo que espera), Coaching (desarrollar habilidades en campo), Mentoring (desarrollo de carrera), Contratación y Formación, y Liderazgo/Motivación.',
  },
];

export function TestBasico({ isDark }: SlideProps) {
  return (
    <Quiz
      isDark={isDark}
      nivel="Sales Enablement · 10 preguntas · fundamentos del ecosistema"
      questions={Q_BASICO}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   TEST AVANZADO
══════════════════════════════════════════════════════════════════ */

const Q_AVANZADO: QuizQ[] = [
  {
    q: '¿Cuál es el riesgo principal cuando un gerente de ventas sigue siendo el mejor cerrador del equipo?',
    options: [
      'Que el equipo sienta celos profesionales y disminuya su motivación',
      'Que el gerente no desarrolle a su equipo y el team nunca madure, haciéndolo indispensable para los negocios grandes',
      'Que el gerente agote su pipeline personal y no tenga tiempo para reportes',
      'Que el equipo de marketing pierda confianza en el proceso de ventas',
    ],
    answer:1,
    why: 'La trampa del super-cerrador: cuando el gerente cierra los negocios difíciles en lugar de enseñar al representante a cerrarlos, el equipo nunca aprende y el gerente se convierte en cuello de botella.',
  },
  {
    q: '¿Qué significa BATNA en el contexto de la negociación?',
    options: [
      'Best Approach to Negotiating an Agreement: el método de negociación de Bray y Sorey',
      'Best Alternative to a Negotiated Agreement: la mejor alternativa si la negociación fracasa',
      'Buyer and Target Negotiation Analysis: análisis de poder del comprador',
      'Budget, Authority, Timeline, Need and Action: un BANT ampliado para cierres',
    ],
    answer:1,
    why: 'BATNA son las siglas de Best Alternative to a Negotiated Agreement (mejor alternativa al acuerdo). Define el poder real del negociador: si tu alternativa es fuerte, no necesitas aceptar condiciones desfavorables.',
  },
  {
    q: '¿Por qué el onboarding de un vendedor con experiencia en una venta compleja debería incluir inmersión con el equipo de éxito del cliente?',
    options: [
      'Para que aprenda los sistemas de soporte técnico antes de hablar con prospectos',
      'Porque en la venta compleja el ciclo es largo y escuchar conversaciones de éxito del cliente revela el lenguaje real del dolor y el valor del producto post-venta',
      'Porque el equipo de éxito del cliente tiene las mejores historias de producto',
      'Para cumplir con los requisitos de documentación del proceso de onboarding',
    ],
    answer:1,
    why: 'En ventas complejas el ciclo es largo y los tomadores de decisión son muchos. Las conversaciones de éxito del cliente revelan el idioma del valor que ya entregó el producto, lo que el nuevo AE necesita para hablar con credibilidad sobre resultados.',
  },
  {
    q: '¿Qué distingue al micro-contenido del contenido de ventas tradicional como presentaciones o PDFs?',
    options: [
      'El micro-contenido está alojado en plataformas digitales; los PDFs solo existen en papel',
      'El micro-contenido tiene el tamaño del momento en que se necesita: es accionable en el espacio de una llamada o una objeción',
      'El micro-contenido es más barato de producir por no requerir diseño profesional',
      'El micro-contenido es para el SDR; los PDFs son para el AE en etapas avanzadas',
    ],
    answer:1,
    why: 'El micro-contenido es del tamaño correcto para el momento real en que se usa: entre una llamada y la siguiente, al manejar una objeción en vivo. Las presentaciones y PDFs largos nadie los lee en ese contexto.',
  },
  {
    q: '¿Qué es el "Job to Be Done" según Clayton Christensen y cómo aplica a las personas de comprador?',
    options: [
      'La descripción de cargo del comprador para identificar su rol en el proceso de decisión',
      'El concepto de que las personas no compran productos: contratan soluciones para un trabajo que necesitan hacer',
      'La metodología para calcular el valor económico de resolver el dolor del prospecto',
      'El framework de priorización de features basado en el feedback de clientes',
    ],
    answer:1,
    why: 'El Job to Be Done (trabajo a realizar) de Christensen: las personas contratan productos para que hagan un trabajo por ellos. Un CPA no compra software: contrata la eliminación del tiempo manual para llegar antes al análisis estratégico.',
  },
  {
    q: '¿Por qué combinar investigación de prospectos y alcance en el mismo representante reduce la eficiencia del equipo?',
    options: [
      'Porque los vendedores no tienen la formación técnica para investigar bien a los prospectos',
      'Porque el esfuerzo de investigación consume el tiempo y la energía que debería ir al contacto real, como el hombre gordo que corre y carga el equipaje a la vez',
      'Porque los sistemas de inteligencia de ventas requieren licencias especializadas',
      'Porque el equipo de marketing debe ser el propietario exclusivo de la investigación de mercado',
    ],
    answer:1,
    why: 'La analogía del hombre gordo en la carrera de relevos: si el mismo representante investiga y hace alcance, el trabajo de investigación consume el tiempo y la energía que debería ir a las conversaciones con prospectos.',
  },
  {
    q: '¿Cuál es el error más costoso al gestionar las renovaciones de clientes?',
    options: [
      'No tener un descuento preparado para retener clientes que amenazan con cancelar',
      'Tratarlas como contratos automáticos y empezar a trabajarlas solo 30 días antes del vencimiento',
      'Involucrar al equipo de ventas en conversaciones que debería manejar solo éxito del cliente',
      'Ofrecer upsell demasiado pronto antes de que el cliente haya obtenido el primer valor',
    ],
    answer:1,
    why: 'El trabajo de renovación empieza desde el día 1 de la relación, no en los últimos 30 días. Una renovación que se trabaja tarde ya llega con el cliente insatisfecho o evaluando alternativas.',
  },
  {
    q: '¿Por qué las respuestas basadas en preguntas son más efectivas que los argumentos para manejar objeciones?',
    options: [
      'Porque las preguntas consumen más tiempo de la reunión y reducen la presión del cierre',
      'Porque un argumento defensivo confirma que la objeción tiene peso; una pregunta abre la posibilidad de que el prospecto descubra por sí mismo que es superable',
      'Porque las preguntas son más fáciles de preparar que los argumentos lógicos',
      'Porque el prospecto interpreta los argumentos como manipulación y las preguntas como empatía',
    ],
    answer:1,
    why: 'Argumentar en contra de una objeción confirma su legitimidad. Una pregunta bien diseñada lleva al prospecto a reflexionar sobre el verdadero costo de no actuar, sin que el vendedor tenga que defender nada.',
  },
  {
    q: '¿Qué dos tipos de feedback componen el taburete de tres patas del cliente junto con la visión?',
    options: [
      'Feedback del equipo de ventas y feedback del equipo de soporte técnico',
      'Feedback cualitativo (qué dicen los clientes en conversaciones) y feedback cuantitativo (NPS, uso, métricas)',
      'Feedback de referidos activos y feedback de cuentas en riesgo de churn',
      'Feedback de encuestas formales y feedback de redes sociales',
    ],
    answer:1,
    why: 'El taburete de tres patas: Visión (dirección de la empresa), Feedback cualitativo (conversaciones directas con clientes cada trimestre) y Feedback cuantitativo (NPS, uso de funcionalidades, tiempo al primer valor).',
  },
  {
    q: '¿Cuál es el marco completo de Bray y Sorey para los seis componentes del ecosistema de Sales Enablement cuando está en estado "Experimentando"?',
    options: [
      'Proceso, Metodología, Contenido, Herramientas, ICP y Onboarding',
      'Personas, Proceso, Tecnología, Datos, Métricas y Cultura',
      'Misión, Visión, Valores, KPIs, Presupuesto y Equipo',
      'Prospección, Calificación, Demo, Propuesta, Cierre y Renovación',
    ],
    answer:0,
    why: 'Los seis componentes del ecosistema de Sales Enablement en el marco del libro son: Proceso, Metodología, Contenido, Herramientas, ICP (Ideal Customer Profile) y Onboarding. Cuando el proceso está en estado "Experimentando", se corren experimentos controlados en cada componente.',
  },
];

export function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Quiz
      isDark={isDark}
      nivel="Sales Enablement · 10 preguntas · aplicación y análisis"
      questions={Q_AVANZADO}
    />
  );
}
