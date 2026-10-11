import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from '../scene3d';
import type { Faces } from '../scene3d';
import { SlideProps, heading, Piso, Bola, Cifra, Cita, Nota, Fuente, Opcion, BarrasIso, Paso, Verificado } from './kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 1 · Bienvenida
══════════════════════════════════════════════════════════════════ */

export function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const equipos: { x: number; body: Faces; acc: 'megaphone' | 'tie' | 'heart'; nombre: string }[] = [
    { x: 130, body: PEACH, acc: 'megaphone', nombre: 'Marketing' },
    { x: 300, body: BRAND, acc: 'tie', nombre: 'Ventas' },
    { x: 470, body: SLATE(isDark), acc: 'heart', nombre: 'Servicio al cliente' },
  ];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 600 236" className="w-full max-w-2xl mb-1 z-10 overflow-visible" role="img" aria-label="Marketing, ventas y servicio comparten un mismo núcleo de datos">
        <SceneDefs id="rop" isDark={isDark} />
        <Piso cx={300} cy={176} s={290} fill={t.floor} />
        <PulseDisc cx={300} cy={58} rx={40} ry={14} dur={2.4} peak={0.3} />
        <Float amp={6} dur={2.6}><Bola id="rop" cx={300} cy={52} r={17} /></Float>
        <text x={326} y={50} fontSize={11.5} fontWeight={900} fill={ORANGE}>Datos compartidos</text>
        {equipos.map((e, i) => (
          <motion.g key={e.nombre} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 90, damping: 13 }}>
            <Float amp={4} dur={2.4 + i * 0.3} delay={i * 0.4}>
              <Persona id="rop" cx={e.x} cy={170} s={1.05} body={e.body} accessory={e.acc} hair={i === 1 ? '#2b1a12' : '#3b2a20'} />
            </Float>
            <text x={e.x} y={204} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>{e.nombre}</text>
            <Traveler id="rop" path={hop([e.x, 104], [300, 66], 26)} dur={2} delay={i * 0.6} repeatDelay={0.8} r={4} color={i === 1 ? PINK : ORANGE} />
          </motion.g>
        ))}
        <text x={300} y={232} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Tres equipos, un solo sistema de ingresos</text>
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Revenue Operations · operaciones de ingresos</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-5xl md:text-7xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Rev<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">Ops</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Las <strong>personas, procesos, sistemas y datos</strong> que controlan cómo tu empresa genera ingresos, alineados para que el negocio crezca más rápido de lo que crece su costo.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
    </div>
  );
}

const PILARES = [
  {
    nombre: 'Personas',
    resumen: 'Marketing, ventas y servicio tienen necesidades operativas. RevOps las consolida y pone a alguien imparcial a mirar la operación completa.',
    cita: 'Si no tienes un cargo de RevOps pero trabajas en una empresa con ingresos recurrentes, llámate RevOps: trabajar aislado del ciclo completo hoy es un pecado capital.',
    autor: 'Daniel Remedios',
  },
  {
    nombre: 'Procesos',
    resumen: 'Cómo se hace el trabajo en el escritorio: enrutar un lead, cotizar, traspasar un cliente. Un mismo trabajo debería hacerse de la misma forma en todos los equipos.',
    cita: 'Cotizar no es un proceso abstracto: te sientas, armas la cotización y se la envías a una persona. ¿Deberíamos tener procesos distintos para la venta nueva y el upsell? Probablemente no.',
    autor: 'Ross Nibur',
  },
  {
    nombre: 'Sistemas',
    resumen: 'Al crecer, cada persona compra su aplicación favorita y cada jefe mantiene su planilla. La desconexión trae desconfianza y la eficiencia se desploma.',
    cita: 'Una empresa moderna usa muchísima tecnología para sus procesos con clientes e internos, y esa tecnología produce una enorme cantidad de datos.',
    autor: 'Ross Nibur',
  },
  {
    nombre: 'Datos',
    resumen: 'Todo lo que hace un vendedor, un marketero o un agente de servicio genera datos. RevOps los recolecta bien, los sintetiza y los muestra para decidir.',
    cita: 'O lo haces bien o lo haces mal, pero estás haciendo revenue operations. Hoy no puedes existir sin hacerlo.',
    autor: 'Matt Bolian',
  },
];

export function Definicion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const p = PILARES[i];
  const B = 214;
  return (
    <Shell isDark={isDark} title="Qué es" highlight="Revenue Operations" subtitle="RevOps son las personas, los procesos, los sistemas y los datos que controlan cómo tu empresa genera ingresos. Toda empresa que vende ya tiene RevOps, aunque no lo haya definido.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 440 262" className="w-full max-h-[300px] overflow-visible" role="img" aria-label="Los cuatro componentes de RevOps">
            <SceneDefs id="rod" isDark={isDark} />
            <Piso cx={220} cy={B + 6} s={210} fill={t.floor} />
            {PILARES.map((pl, k) => {
              const x = 70 + k * 100;
              const h = 46 + k * 10;
              const on = k === i;
              return (
                <g key={pl.nombre} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  {on && <PulseDisc cx={x} cy={B + 4} rx={44} ry={13} dur={2.2} peak={0.32} />}
                  <Lift on={on} dimmed={!on} lift={12}>
                    <g filter="url(#rod-sh)"><IsoBox cx={x} cy={B - h - 17} s={34} h={h} f={on ? BRAND : PEACH} /></g>
                  </Lift>
                  <text x={x} y={B + 32} textAnchor="middle" fontSize={12.5} fontWeight={900} fill={on ? ORANGE : t.muted}>{pl.nombre}</text>
                </g>
              );
            })}
            <Traveler id="rod" path={hop([70, 140], [170, 130], 30)} dur={1.6} repeatDelay={1.2} r={4} />
            <Traveler id="rod" path={hop([170, 130], [270, 120], 30)} dur={1.6} delay={0.8} repeatDelay={1.2} r={4} color={PINK} />
            <Traveler id="rod" path={hop([270, 120], [370, 110], 30)} dur={1.6} delay={1.6} repeatDelay={1.2} r={4} />
          </svg>
          <div className="flex gap-1.5 mt-1">
            {PILARES.map((pl, k) => <Pill key={pl.nombre} isDark={isDark} on={k === i} onClick={() => setI(k)}>{pl.nombre}</Pill>)}
          </div>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
              <Nota isDark={isDark} label={`Componente · ${p.nombre}`} destacada>{p.resumen}</Nota>
              <Cita isDark={isDark} autor={p.autor}>{p.cita}</Cita>
            </motion.div>
          </AnimatePresence>
          <Nota isDark={isDark} label="En qué se diferencia de sales ops o marketing ops">
            Las operaciones por área diseñan procesos mirando <strong>un solo pedazo</strong> del negocio. RevOps planifica de forma <strong>uniforme y holística</strong> los tres frentes que tocan al cliente: marketing, ventas y servicio.
          </Nota>
        </div>
      </div>
    </Shell>
  );
}

const RUTA = [
  { n: 1, t: 'Bienvenida', aprendes: 'Qué es RevOps y de qué está hecho.', construyes: 'Un mapa de las personas, procesos, sistemas y datos que generan ingresos en tu empresa.' },
  { n: 2, t: 'Introducción a RevOps', aprendes: 'Por qué crecer a escala exige otra forma de operar, y por dónde empezar.', construyes: 'Un diagnóstico de 10 afirmaciones (40 puntos) para decidir si tu empresa necesita invertir en RevOps.' },
  { n: 3, t: 'El flywheel', aprendes: 'Atraer, involucrar y deleitar como un ciclo, con fuerzas que lo aceleran y fricciones que lo frenan.', construyes: 'El dibujo de tu flywheel con sus fuerzas, fricciones y acciones priorizadas.' },
  { n: 4, t: 'Responsabilidad con SLA', aprendes: 'El acuerdo de servicio entre marketing y ventas, y quién lo hace cumplir.', construyes: 'Tu SLA con la cantidad de leads por mes y el plazo máximo de contacto.' },
  { n: 5, t: 'Mapear el proceso de ventas', aprendes: 'Etapas centradas en el comprador, criterios de salida y playbook.', construyes: 'Un proceso de ventas depurado: acción del vendedor y acción del comprador por etapa.' },
  { n: 6, t: 'Gestión de sistemas', aprendes: 'Proceso primero, gobierno de datos y control del stack tecnológico.', construyes: 'Un diccionario de datos y una evaluación de tus herramientas.' },
  { n: 7, t: 'Comunicar el valor', aprendes: 'Hablar en el idioma de las finanzas, el costo de la mala calidad, el A3 y la persuasión.', construyes: 'Una propuesta para tus líderes con pre-wiring y respuestas a objeciones.' },
  { n: 8, t: 'Estructurar el equipo', aprendes: 'Silos, estructura formal e informal y cómo crece un equipo de operaciones.', construyes: 'Tu organigrama actual, el ideal y el camino entre ambos.' },
  { n: 9, t: 'Contratar al equipo', aprendes: 'Cuándo contratar, qué tipo de candidato buscar y cómo evaluarlo.', construyes: 'Roles, perfiles y una pauta de entrevista con respuestas buenas, regulares y malas.' },
  { n: 10, t: 'Evaluar e iterar', aprendes: 'El ciclo continuo de datos, comunicación y alineación.', construyes: 'Un plan de cuatro trimestres con métricas y prioridades diarias.' },
];

export function Ruta({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const r = RUTA[i];
  const B = 236;
  return (
    <Shell isDark={isDark} title="La ruta:" highlight="diez lecciones, un plan propio" subtitle="Cada lección deja una pieza de tu estrategia de RevOps. Al final tendrás un plan completo, aplicable a cualquier tamaño de empresa e industria.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 460 262" className="w-full max-h-[300px] overflow-visible" role="img" aria-label="Escalera de diez lecciones">
            <SceneDefs id="ror" isDark={isDark} />
            <Piso cx={230} cy={B + 4} s={222} fill={t.floor} />
            {RUTA.map((l, k) => {
              const x = 32 + k * 44;
              const h = 18 + k * 15;
              const cy = B - h - 8;
              const on = k === i;
              return (
                <g key={l.n} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  <Lift on={on} dimmed={k > i && !on} lift={10}>
                    <g filter="url(#ror-sh)"><IsoBox cx={x} cy={cy} s={16} h={h} f={on ? BRAND : k < i ? PEACH : NEUTRAL(isDark)} /></g>
                  </Lift>
                  <text x={x} y={cy - 8 - (on ? 22 : 12)} textAnchor="middle" fontSize={on ? 14 : 11} fontWeight={900} fill={on ? ORANGE : t.muted}>{l.n}</text>
                </g>
              );
            })}
          </svg>
          <p className={`text-xs ${textMuted(isDark)}`}>Cada escalón es una lección; el activo se eleva.</p>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <div className="grid grid-cols-2 gap-1.5">
            {RUTA.map((l, k) => <Opcion key={l.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>{l.n}. {l.t}</Opcion>)}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-2.5">
              <Nota isDark={isDark} label={`Lección ${r.n} · qué aprendes`}>{r.aprendes}</Nota>
              <Nota isDark={isDark} label="Qué construyes" destacada>{r.construyes}</Nota>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 2 · Introducción a RevOps
══════════════════════════════════════════════════════════════════ */

function curva(fn: (t: number) => number): string {
  const N = 24;
  const pts = Array.from({ length: N + 1 }, (_, k) => {
    const tt = k / N;
    return `${(50 + tt * 380).toFixed(1)},${fn(tt).toFixed(1)}`;
  });
  return `M 50,230 L ${pts.join(' L ')} L 430,230 Z`;
}

export function Escala({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [escala, setEscala] = useState(false);
  const plantilla = (x: number) => 230 - x * 130;
  const ingresos = (x: number) => (escala ? 230 - (0.25 * x + 0.95 * x * x * x) * 150 : 230 - x * 105);
  const finIng = ingresos(1);
  return (
    <Shell isDark={isDark} title="Crecer en línea recta o" highlight="crecer a escala" subtitle="Escala es cuando el negocio crece más rápido que la inversión: los ingresos aumentan más que la plantilla, mejora el margen neto o mejora la relación LTV:CAC.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!escala} onClick={() => setEscala(false)}>Crecimiento lineal</Pill>
            <Pill isDark={isDark} on={escala} onClick={() => setEscala(true)}>Crecimiento a escala</Pill>
          </div>
          <svg viewBox="0 0 500 262" className="w-full max-h-[290px] overflow-visible" role="img" aria-label="Ingresos frente a plantilla a lo largo del tiempo (esquema ilustrativo)">
            <defs>
              <linearGradient id="roe-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ORANGE} stopOpacity={0.75} />
                <stop offset="100%" stopColor={PINK} stopOpacity={0.25} />
              </linearGradient>
            </defs>
            <rect x={50} y={230} width={380} height={2} fill={t.muted} opacity={0.3} />
            <path d={curva(plantilla)} fill={isDark ? '#64748b' : '#94a3b8'} opacity={0.45} />
            <motion.path initial={false} animate={{ d: curva(ingresos) }} transition={{ duration: 0.9, ease: 'easeInOut' }} fill="url(#roe-g)" />
            <circle cx={430} cy={plantilla(1)} r={5} fill={isDark ? '#94a3b8' : '#64748b'} />
            <motion.circle initial={false} animate={{ cy: finIng }} transition={{ duration: 0.9 }} cx={430} r={6} fill={PINK} />
            <text x={440} y={plantilla(1) + 4} fontSize={12} fontWeight={800} fill={t.muted}>Plantilla</text>
            <motion.text initial={false} animate={{ y: finIng + 4 }} transition={{ duration: 0.9 }} x={440} fontSize={12} fontWeight={900} fill={PINK}>Ingresos</motion.text>
            <text x={240} y={252} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Tiempo →  (esquema ilustrativo)</text>
          </svg>
          <p className={`text-xs text-center max-w-md ${textMuted(isDark)}`}>{escala ? 'La curva se dobla hacia arriba: el crecimiento ya no depende de contratar, y financia contratación, desarrollo y expansión.' : 'Cada cliente nuevo exige una persona más: más ventas, más vendedores; más clientes, más soporte.'}</p>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label="Por qué el trato personalizado deja de alcanzar" destacada>
            Si cada prospecto y cada cliente recibe atención uno a uno, la única forma de crecer es sumar personas. Es caro y no se sostiene: el costo de contratar y formar a ese equipo consume los recursos para invertir en todo lo demás.
          </Nota>
          <Cita isDark={isDark} autor="Jen Spencer">Con un equipo chico puedes abrazar a cada cliente. Al crecer, toda esa historia sobre clientes y cuentas pasa de un gerente a otro y se diluye cada vez más.</Cita>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Etapa temprana">Haz lo que no escala: la mejor experiencia a cada cliente y aprende de él (Daniel Remedios).</Nota>
            <Nota isDark={isDark} label="Etapa de escala">No dejas de cuidar al cliente: buscas otra forma, también uno a muchos, de darle valor (Sarah Doughty).</Nota>
          </div>
          <p className={`text-[11px] ${textMuted(isDark)}`}><strong>LTV:CAC</strong> · valor de vida del cliente dividido por el costo de adquirirlo.</p>
        </div>
      </div>
    </Shell>
  );
}

const AFIRMACIONES = [
  'Mi equipo dedica más del 50% de su tiempo a proyectos estratégicos y de impacto.',
  'Usamos herramientas que alimentan con datos del cliente a marketing, ventas y servicio.',
  'Avisamos a los demás departamentos cuando los datos han sido auditados.',
  'Rastreamos las ineficiencias de proceso en toda la organización.',
  'Buscamos constantemente formas de mejorar las operaciones del negocio.',
  'Creamos reportes de los que marketing, ventas y servicio sacan conclusiones.',
  'Nuestros procedimientos y tecnología están diseñados para un servicio de calidad.',
  'Administramos una única fuente de verdad de datos del cliente para toda la empresa.',
  'Somos dueños de los reportes de todas las funciones de ingresos.',
  'Conectamos las aplicaciones de la empresa en un solo lugar, sin importar ni exportar a mano.',
];

export function Diagnostico({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [v, setV] = useState<number[]>(Array(10).fill(2));
  const total = v.reduce((a, b) => a + b, 0);
  const tramo = total <= 16
    ? { r: '0 a 16 puntos', txt: 'RevOps no está en buen estado, y eso es una gran oportunidad: hay muchísimo valor por agregar. Usa este curso para armar un plan.' }
    : total <= 31
      ? { r: '17 a 31 puntos', txt: 'Vas en la dirección correcta, por delante de la mayoría de las organizaciones, con espacio para mejorar. Identifica dónde puedes aportar más.' }
      : { r: '32 a 40 puntos', txt: 'Nivel de clase mundial. Pero RevOps no se configura y se olvida: repite este diagnóstico cada trimestre.' };
  const B = 226;
  const hMax = 168;
  const h = Math.max(4, (total / 40) * hMax);
  return (
    <Shell isDark={isDark} title="Diagnóstico:" highlight="¿cómo está tu RevOps hoy?" subtitle="Diez afirmaciones, de 0 a 4 puntos cada una: 4 si siempre es cierta, 3 casi siempre, 2 a veces, 1 de vez en cuando y 0 nunca.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[64%] flex flex-col gap-1 justify-center">
          {AFIRMACIONES.map((a, k) => (
            <div key={k} className={`flex items-center gap-2 px-2.5 py-1 rounded-xl ${k % 2 ? '' : isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
              <span className={`text-[12px] leading-tight flex-1 ${textMuted(isDark)}`}><strong className="text-[#ff851d] mr-1">{k + 1}.</strong>{a}</span>
              <span className="flex gap-1 shrink-0">
                {[0, 1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setV((prev) => prev.map((x, j) => (j === k ? n : x)))}
                    title={['Nunca', 'De vez en cuando', 'A veces', 'Casi siempre', 'Siempre'][n]}
                    className={`w-6 h-6 rounded-lg text-[11px] font-black transition-all ${v[k] === n ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow' : isDark ? 'bg-[#2a2a2a] text-gray-400' : 'bg-white text-gray-500 shadow-sm'}`}
                  >
                    {n}
                  </button>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className="lg:w-[36%] flex flex-col gap-2.5 justify-center items-center">
          <svg viewBox="0 0 240 262" className="w-full max-h-[230px] overflow-visible" role="img" aria-label={`Puntaje ${total} de 40`}>
            <SceneDefs id="rog" isDark={isDark} />
            <Piso cx={120} cy={B + 8} s={96} fill={t.floor} />
            <PulseDisc cx={120} cy={B + 6} rx={50} ry={15} dur={2.4} peak={0.28} />
            <g filter="url(#rog-sh)"><IsoBox cx={120} cy={B - hMax - 10} s={34} h={hMax} f={NEUTRAL(isDark)} /></g>
            <motion.g initial={false} animate={{ scaleY: h / hMax }} transition={{ type: 'spring', stiffness: 80, damping: 15 }} style={{ transformOrigin: `120px ${B + 7}px` }}>
              <IsoBox cx={120} cy={B - hMax - 10} s={34} h={hMax} f={BRAND} />
            </motion.g>
            <text x={170} y={B - hMax - 10} fontSize={11} fontWeight={800} fill={t.muted}>40</text>
            <text x={170} y={B + 4} fontSize={11} fontWeight={800} fill={t.muted}>0</text>
          </svg>
          <div className={`w-full p-3.5 rounded-3xl text-center ${featuredClass(isDark)}`}>
            <p className={microLabel(isDark)}>Tu puntaje · {tramo.r}</p>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c] leading-none my-1">{total}<span className={`text-lg ${textMuted(isDark)}`}> / 40</span></p>
            <p className={`text-xs leading-snug ${textMuted(isDark)}`}>{tramo.txt}</p>
          </div>
          <p className={`text-[11px] text-center leading-snug ${textMuted(isDark)}`}>Contexto: una empresa mediana usa en promedio <strong>137 aplicaciones SaaS</strong> y una grande <strong>288</strong> (Blissfully, 2020). Mantener esos datos sincronizados es un trabajo de tiempo completo.</p>
        </div>
      </div>
    </Shell>
  );
}

const INICIO = [
  {
    t: 'Instrumentar',
    corto: 'Captura los datos',
    txt: 'Si la empresa no tiene infraestructura para recolectar datos, esa es la prioridad número uno: implementar sistemas y procesos para capturar todo de forma consistente.',
    cita: 'Lo que es crítico desde el comienzo es una vista consolidada de tu cliente. No podemos permitirnos que alguien llegue sin que sepamos de dónde viene ni qué quiere.',
    autor: 'Daniel Remedios',
  },
  {
    t: 'Entender antes de cambiar',
    corto: 'Busca entender',
    txt: '"Primero busca entender" (Stephen Covey). Antes de tocar nada, comprende qué pasa en la organización, empezando por la base de cuentas: quién ingresa datos, qué está duplicado, qué está limpio.',
    cita: 'Siempre habrá una base de datos desordenada. Y si no tienes datos limpios, marketing no está feliz, los BDR no están felices: nadie está feliz.',
    autor: 'Sandy Robinson',
  },
  {
    t: 'Dar consistencia',
    corto: 'Simplifica',
    txt: 'Las métricas de la venta nueva suelen estar claras; las de después de la venta no. Usa las mismas definiciones antes y después de la venta, y el mismo proceso cuando el trabajo es el mismo (cotizar una venta nueva o un upsell).',
    cita: '¿Qué porcentaje de clientes se incorporó bien? ¿Cuántos tuvieron un primer uso exitoso a tiempo? ¿Cuántos renovaron y ampliaron? Esas métricas no están tan limpias después de la venta.',
    autor: 'Sarah Doughty',
  },
  {
    t: 'Mirar desde el cliente',
    corto: 'Ponte en su lugar',
    txt: 'Pregunta qué intenta lograr el cliente en cada etapa, quién participa de su lado y del tuyo, y qué siente. Hazlo en un taller con líderes de marketing, ventas, éxito del cliente y producto.',
    cita: 'La mayoría de las ineficiencias no vienen de malos actores ni de mala ejecución: vienen de departamentos que intentan lo mismo, ayudar al cliente, cada uno a su manera.',
    autor: 'Material del curso',
  },
];

export function Empezar({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const pos: [number, number][] = [[70, 186], [170, 158], [270, 130], [370, 102]];
  return (
    <Shell isDark={isDark} title="Por dónde empezar:" highlight="los datos que ya tienes" subtitle="Si te encargaron unificar las operaciones de ingresos, el primer paso no es cambiar procesos: es mirar los datos que existen y entender cómo se generan.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 440 262" className="w-full max-h-[300px] overflow-visible" role="img" aria-label="Cuatro pasos para empezar">
            <SceneDefs id="roi" isDark={isDark} />
            {pos.map(([x, y], k) => {
              const on = k === i;
              return (
                <g key={k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  {on && <PulseDisc cx={x} cy={y + 8} rx={52} ry={17} dur={2.2} peak={0.3} />}
                  <Lift on={on} dimmed={false} lift={8}>
                    <g filter="url(#roi-sh)"><Cylinder cx={x} cy={y} rx={38} ry={13} h={16} top={on ? ORANGE : k < i ? '#ffd2a8' : isDark ? '#4b5563' : '#e5e7eb'} side={on ? '#c45c00' : k < i ? '#f0875a' : isDark ? '#374151' : '#9ca3af'} /></g>
                  </Lift>
                  <text x={x} y={y + 50} textAnchor="middle" fontSize={12} fontWeight={900} fill={on ? ORANGE : t.muted}>{k + 1}. {INICIO[k].corto}</text>
                </g>
              );
            })}
            <Traveler id="roi" path={[[70, 180], hop([70, 180], [170, 152], 24)[1], [170, 152], hop([170, 152], [270, 124], 24)[1], [270, 124], hop([270, 124], [370, 96], 24)[1], [370, 96]]} dur={3.2} repeatDelay={0.6} r={5} />
          </svg>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2 justify-center">
          {INICIO.map((p, k) => (
            <button key={p.t} onClick={() => setI(k)} className="text-left">
              <Paso isDark={isDark} n={k + 1} titulo={p.t} on={k === i}>{k === i ? p.txt : null}</Paso>
            </button>
          ))}
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Cita isDark={isDark} autor={INICIO[i].autor}>{INICIO[i].cita}</Cita>
            </motion.div>
          </AnimatePresence>
          <p className={`text-[11px] ${textMuted(isDark)}`}><strong>BDR</strong> · Business Development Representative (representante de desarrollo de negocio).</p>
        </div>
      </div>
    </Shell>
  );
}

export function Velocidad({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [alineado, setAlineado] = useState(false);
  const meta: [number, number] = [376, 112];
  const alin: [number, number][] = [[64, 142], [112, 142], [160, 142], [208, 142], [256, 142]];
  const disp: [number, number][] = [[80, 92], [150, 196], [118, 140], [212, 84], [58, 204]];
  const dir: [number, number][] = [[-30, -24], [26, 22], [-34, 10], [30, -20], [-22, 26]];
  return (
    <Shell isDark={isDark} title="Velocidad," highlight="no rapidez" subtitle="Rapidez mide qué tan rápido vas. Velocidad mide cuánto tardas en llegar a destino. El trabajo de RevOps es aumentar la velocidad, no la rapidez (Doug Davidoff).">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={!alineado} onClick={() => setAlineado(false)}>Cada equipo a su ritmo</Pill>
            <Pill isDark={isDark} on={alineado} onClick={() => setAlineado(true)}>Mismo rumbo</Pill>
          </div>
          <svg viewBox="0 0 440 252" className="w-full max-h-[280px] overflow-visible" role="img" aria-label="Esfuerzos dispersos frente a esfuerzos alineados hacia la meta">
            <SceneDefs id="rov" isDark={isDark} />
            <Piso cx={220} cy={150} s={210} fill={t.floor} />
            <PulseDisc cx={meta[0]} cy={meta[1] + 70} rx={46} ry={14} dur={2.2} peak={0.3} />
            <Float amp={3}><g filter="url(#rov-sh)"><IsoBox cx={meta[0]} cy={meta[1]} s={28} h={56} f={BRAND} /></g></Float>
            <text x={meta[0]} y={meta[1] + 14 + 56 + 26} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Meta de ingresos</text>
            {alin.map((a, k) => {
              const d = disp[k];
              return (
                <motion.g key={k} initial={false} animate={{ x: alineado ? 0 : d[0] - a[0], y: alineado ? 0 : d[1] - a[1] }} transition={{ type: 'spring', stiffness: 70, damping: 14, delay: k * 0.05 }}>
                  <Float amp={3} dur={1.6 + k * 0.2} delay={k * 0.1}><Bola id="rov" cx={a[0]} cy={a[1]} r={12} neutral={!alineado} /></Float>
                </motion.g>
              );
            })}
            <g key={alineado ? 'a' : 'd'}>
              {alin.map((a, k) => {
                const d = disp[k];
                return alineado
                  ? <Traveler key={k} id="rov" path={[[a[0] + 14, a[1]], [meta[0] - 34, meta[1] + 30]]} dur={1.4} delay={0.5 + k * 0.25} repeatDelay={0.4} r={4} />
                  : <Traveler key={k} id="rov" path={[[d[0], d[1]], [d[0] + dir[k][0], d[1] + dir[k][1]]]} dur={0.6} delay={k * 0.15} repeatDelay={0.2} r={3.5} color={PINK} />;
              })}
            </g>
            <text x={220} y={244} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{alineado ? 'Menos vueltas, más tracción: todos avanzan a la meta' : 'Todos corren al máximo, cada uno en otra dirección'}</text>
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Doug Davidoff">En primera marcha de una bicicleta vas muy rápido, pero avanzas poco: más vueltas, menos progreso. En una marcha más larga das menos vueltas, pero cada una tiene más tracción. Esa es la diferencia entre rapidez y velocidad.</Cita>
          <Nota isDark={isDark} label="La consecuencia" destacada>
            Si tu empresa no crece, la respuesta no es exprimir más esfuerzo a la gente: todos ya corren tras su cuota. La respuesta es que alguien con perspectiva logre que todos los equipos tiren en la misma dirección, aunque a veces haya que ir más lento.
          </Nota>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="El error clásico de operaciones">Llegar con reglas propias. Doug Davidoff recuerda que a su área de sales ops le decían «el departamento de prevención de ventas».</Nota>
            <Nota isDark={isDark} label="La actitud correcta">Empatía y curiosidad sinceras por lo que cada persona hace en su escritorio. Los equipos internos también son tus clientes.</Nota>
          </div>
        </div>
      </div>
    </Shell>
  );
}

const CASOS = [
  {
    k: 'Toast',
    titulo: 'Duplicar la conversión inbound sin tocar los leads',
    txt: 'El equipo midió de dónde venían los MQL, qué tan rápido y con cuánta profundidad se trabajaban y cuándo convertían. Con eso definió cuántos contactos hacer y en cuántos días. No cambiaron los leads ni las personas ni la cantidad de llamadas: solo cómo se priorizaban los datos en el sistema.',
    resultado: 'Se duplicó la conversión inbound y la tasa de cierre de las oportunidades no cayó.',
    autor: 'Ross Nibur',
    barras: [{ name: 'Antes', value: 1, label: '1×', tone: 'neutral' as const }, { name: 'Después', value: 2, label: '2×', hl: true }],
    max: 2,
  },
  {
    k: 'Decaimiento',
    titulo: 'Dejar de trabajar leads que ya se enfriaron',
    txt: 'El análisis por cohortes mostró que los MQL casi no convertían después del día 4 o 5, pero los SDR los seguían trabajando hasta el día 9 o 10. La regla nueva: soltar todo MQL de más de cinco días y concentrarse en los que acaban de entrar.',
    resultado: 'La conversión MQL→SQL subió de 33% a 45% en un trimestre, sin gastar un peso más.',
    autor: 'Matt Volm',
    barras: [{ name: 'MQL→SQL antes', value: 33, label: '33%', tone: 'neutral' as const }, { name: 'MQL→SQL después', value: 45, label: '45%', hl: true }],
    max: 50,
  },
  {
    k: 'Puntos de contacto',
    titulo: 'Diseñar las secuencias con datos',
    txt: 'Mira tus cuentas objetivo por número de contacto: el primero, el segundo, el tercero… y busca dónde salta la tasa de reuniones agendadas. Puede tomar 15 o 16 contactos. Luego compara con tus secuencias de prospección: casi siempre tienen demasiados pasos o, más a menudo, muy pocos.',
    resultado: 'Mejorar 5 puntos la conversión MQL→SQL en un trimestre se compone en todo el embudo sin gastar más.',
    autor: 'Matt Volm',
    barras: [{ name: 'Secuencia actual', value: 8, label: '8 pasos', tone: 'neutral' as const }, { name: 'Lo que dicen los datos', value: 16, label: '15-16', hl: true }],
    max: 16,
  },
  {
    k: 'Comisiones',
    titulo: 'La venta que se pagó y nunca se activó',
    txt: 'Revisando reportes de comisiones tras una adquisición, apareció un mismo negocio varias veces: ventas duplicadas, pagadas más de una vez, y muchas ventas que nunca se activaban. Los datos mostraron que si pasaban seis días sin contacto con éxito del cliente, el cliente nunca implementaba.',
    resultado: 'Comisión pagada recién con el cliente activo, traspaso cálido a implementación y alertas para los negocios de 5 o 6 días.',
    autor: 'Sandy Robinson',
    barras: [{ name: 'Contacto en ≤ 5 días', value: 1, label: 'Implementa', hl: true }, { name: 'Contacto en 6+ días', value: 0.12, label: 'No implementa', tone: 'neutral' as const }],
    max: 1,
  },
];

export function Casos({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const c = CASOS[i];
  return (
    <Shell isDark={isDark} title="Crecer" highlight="sin gastar un peso más" subtitle="Mejorar una tasa de conversión, con todo lo demás constante, se compone a lo largo del embudo. Ese es el tipo de mejora que RevOps sabe encontrar.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex gap-1.5 flex-wrap justify-center mb-2">
          {CASOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
            <div className="lg:w-[42%] flex flex-col items-center justify-center">
              <div className="w-full max-w-[380px] h-[250px]"><BarrasIso id={`roc${i}`} isDark={isDark} items={c.barras} max={c.max} W={380} hMax={130} /></div>
            </div>
            <div className="lg:w-[58%] flex flex-col gap-2.5 justify-center">
              <Nota isDark={isDark} label={`Caso · ${c.autor}`}><strong className={heading(isDark)}>{c.titulo}.</strong> {c.txt}</Nota>
              <Nota isDark={isDark} label="Resultado" destacada>{c.resultado}</Nota>
              {i === 1 && <Verificado isDark={isDark} tipo="corregido">Pasar de 33% a 45% son 12 puntos, es decir, 36% más SQL. La fuente atribuye a este cambio 33% más ingresos en el trimestre.</Verificado>}
              {i === 3 && <p className={`text-[11px] ${textMuted(isDark)}`}>Las barras muestran el patrón descrito por la fuente; no se publicaron porcentajes exactos.</p>}
              {i === 2 && <p className={`text-[11px] ${textMuted(isDark)}`}>«8 pasos» es un ejemplo de secuencia corta; la fuente no da una cifra media.</p>}
            </div>
          </motion.div>
        </AnimatePresence>
        <Fuente isDark={isDark}>MQL · Marketing Qualified Lead, lead calificado por marketing. SQL · Sales Qualified Lead, lead calificado por ventas. SDR · Sales Development Representative, representante de desarrollo de ventas.</Fuente>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 3 · El flywheel
══════════════════════════════════════════════════════════════════ */

const FASES = [
  {
    k: 'Atraer', a0: 210, a1: 330, top: '#ffd2a8', side: '#f0875a',
    def: 'Traer a las personas correctas con contenido y conversaciones valiosas que te posicionan como asesor de confianza.',
    preguntas: 'Qué propiedades usas para atraer (sitio web, redes sociales, directorios, tácticas en tienda) y qué métricas dicen si funcionan.',
  },
  {
    k: 'Involucrar', a0: 330, a1: 450, top: ORANGE, side: '#c45c00',
    def: 'Presentar ideas y soluciones alineadas con los dolores y metas de la persona, para que sea más probable que te compre.',
    preguntas: 'Qué tan fácil es encontrar respuestas, si se puede comprar sin hablar con alguien y cuánto tardas en responder.',
  },
  {
    k: 'Deleitar', a0: 90, a1: 210, top: PINK, side: '#a01435',
    def: 'Dar ayuda y soporte para que el cliente tenga éxito con lo que compró, y quiera recomendarte.',
    preguntas: 'Qué tan felices están (encuestas NPS), por qué algunos vuelven a comprar y qué reclamos hay.',
  },
];

const rad = (g: number) => (g * Math.PI) / 180;

export function Flywheel({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const cx = 200, cy = 124, R = 120, r = 64, K = 0.5, H = 14;
  const pt = (rr: number, g: number, dy = 0) => `${(cx + rr * Math.cos(rad(g))).toFixed(1)},${(cy + K * rr * Math.sin(rad(g)) + dy).toFixed(1)}`;
  const arco = (rr: number, a0: number, a1: number, dy = 0) => Array.from({ length: 25 }, (_, k) => pt(rr, a0 + ((a1 - a0) * k) / 24, dy));
  const cuna = (a0: number, a1: number) => [...arco(R, a0, a1), ...arco(r, a0, a1).reverse()].join(' ');
  const lado = (a0: number, a1: number) => {
    const lo = Math.max(a0, 0), hi = Math.min(a1, 180);
    const segs: string[] = [];
    const add = (x0: number, x1: number) => { if (x1 > x0) segs.push([...arco(R, x0, x1), ...arco(R, x0, x1, H).reverse()].join(' ')); };
    add(lo, hi);
    if (a1 > 360) add(0, Math.min(a1 - 360, 180));
    return segs;
  };
  const orbita: [number, number][] = Array.from({ length: 13 }, (_, k) => [cx + 92 * Math.cos(rad(-90 + k * 30)), cy + K * 92 * Math.sin(rad(-90 + k * 30))]);
  const f = FASES[i];
  return (
    <Shell isDark={isDark} title="Del embudo" highlight="al flywheel" subtitle="El embudo tiene un final: los leads entran arriba y los clientes salen abajo. El flywheel es un ciclo: los clientes deleitados atraen a los siguientes.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 400 262" className="w-full max-h-[300px] overflow-visible" role="img" aria-label="Flywheel: atraer, involucrar y deleitar">
            <SceneDefs id="rof" isDark={isDark} />
            <ellipse cx={cx} cy={cy + 30} rx={150} ry={66} fill={t.floor} />
            {FASES.map((fa, k) => (
              <g key={fa.k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }} opacity={k === i ? 1 : 0.5}>
                {lado(fa.a0, fa.a1).map((s, j) => <polygon key={j} points={s} fill={fa.side} />)}
              </g>
            ))}
            {FASES.map((fa, k) => (
              <g key={fa.k + 't'} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }} opacity={k === i ? 1 : 0.5}>
                <polygon points={cuna(fa.a0, fa.a1)} fill={fa.top} />
              </g>
            ))}
            <Persona id="rof" cx={cx} cy={cy + 22} s={0.82} body={SLATE(isDark)} accessory="heart" />
            <Traveler id="rof" path={orbita} dur={4} r={5} color={isDark ? '#fff' : '#ffffff'} />
            <text x={cx} y={cy - K * R - 12} textAnchor="middle" fontSize={13} fontWeight={900} fill={i === 0 ? ORANGE : t.muted}>Atraer</text>
            <text x={cx + R * 0.87 + 16} y={cy + K * R * 0.5 + 18} fontSize={13} fontWeight={900} fill={i === 1 ? ORANGE : t.muted}>Involucrar</text>
            <text x={cx - R * 0.87 - 16} y={cy + K * R * 0.5 + 18} textAnchor="end" fontSize={13} fontWeight={900} fill={i === 2 ? PINK : t.muted}>Deleitar</text>
            <text x={cx} y={254} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>El cliente al centro; el ciclo nunca termina</text>
          </svg>
          <div className="flex gap-2">{FASES.map((fa, k) => <Pill key={fa.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{fa.k}</Pill>)}</div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
              <Nota isDark={isDark} label={`${f.k} · qué significa`} destacada>{f.def}</Nota>
              <Nota isDark={isDark} label="Preguntas para mapear tu empresa">{f.preguntas}</Nota>
            </motion.div>
          </AnimatePresence>
          <Cita isDark={isDark} autor="Emmanuelle Skala">Creo que ya no es un embudo; es un círculo. Los embudos, por definición, tienen un final. En SaaS no hay final: hay renovaciones, recomendaciones y referidos. Si separas ventas de éxito del cliente, ¿quién mira el ciclo completo?</Cita>
          <p className={`text-[11px] ${textMuted(isDark)}`}><strong>NPS</strong> · Net Promoter Score: mide qué tan probable es que un cliente te recomiende.</p>
        </div>
      </div>
    </Shell>
  );
}

export function Fuerza({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [friccion, setFriccion] = useState(true);
  const cx = 236, cy = 128, rx = 132, ry = 42;
  const orbita: [number, number][] = Array.from({ length: 13 }, (_, k) => [cx + 104 * Math.cos(rad(k * 30)), cy + 33 * Math.sin(rad(k * 30))]);
  return (
    <Shell isDark={isDark} title="Fuerza y" highlight="fricción" subtitle="Fuerza es cualquier programa o estrategia que acelera tu flywheel. Fricción es todo lo que lo frena. RevOps trabaja sobre las dos.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={friccion} onClick={() => setFriccion(true)}>Empujar más fuerte</Pill>
            <Pill isDark={isDark} on={!friccion} onClick={() => setFriccion(false)}>Quitar la fricción</Pill>
          </div>
          <svg viewBox="0 0 440 252" className="w-full max-h-[270px] overflow-visible" role="img" aria-label="Carrusel con y sin fricción">
            <SceneDefs id="rofu" isDark={isDark} />
            <ellipse cx={cx} cy={cy + 40} rx={170} ry={56} fill={t.floor} />
            <g filter="url(#rofu-sh)"><Cylinder cx={cx} cy={cy} rx={rx} ry={ry} h={20} top={friccion ? '#ffd2a8' : '#ffc08a'} side="#f0875a" /></g>
            <ellipse cx={cx} cy={cy} rx={18} ry={6} fill={isDark ? '#1f1f1f' : '#9ca3af'} />
            {friccion && [[-70, -14], [60, 18], [10, -26]].map(([dx, dy], k) => (
              <PulseDisc key={k} cx={cx + dx} cy={cy + dy} rx={26} ry={9} color={isDark ? '#111' : '#6b7280'} dur={1.6} delay={k * 0.5} peak={0.45} />
            ))}
            <g key={friccion ? 'f' : 'l'}>
              <Traveler id="rofu" path={orbita} dur={friccion ? 5.5 : 1.8} r={6} />
              <Traveler id="rofu" path={orbita.map(([x, y]) => [2 * cx - x, 2 * cy - y] as [number, number])} dur={friccion ? 5.5 : 1.8} r={6} color={PINK} />
            </g>
            <Float amp={friccion ? 4 : 1.5} dur={friccion ? 0.8 : 3}>
              <Persona id="rofu" cx={98} cy={184} s={0.85} body={friccion ? BRAND : PEACH} accessory="star" />
            </Float>
            <text x={98} y={226} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{friccion ? 'Kyle empuja al máximo' : 'Kyle empuja normal'}</text>
            <text x={290} y={226} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={friccion ? t.muted : ORANGE}>{friccion ? 'Rodamientos gastados: gira lento' : 'Sin roce: gira rápido con menos esfuerzo'}</text>
          </svg>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Devyn Bellamy">Piensa en un carrusel con niños empujando. No necesitas que Kyle, el niño grande, empuje más fuerte: necesitas que el carrusel gire mejor. Ver dónde está la fricción es enorme, y ahí entra RevOps.</Cita>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Fuerza bien aplicada">Alex queda feliz, lo cuenta a colegas y amigos, y cada ciclo trae más alcance: el crecimiento se acelera y rompe la línea recta.</Nota>
            <Nota isDark={isDark} label="Fricción sin atender">Alex tiene una mala experiencia y el boca a boca negativo viaja de persona en persona: cada vez cuesta más encontrar a alguien dispuesto a comprarte.</Nota>
          </div>
          <Nota isDark={isDark} label="Dónde poner la fuerza: en deleitar" destacada>
            Un ejemplo no obvio es la compensación de ventas. En el caso documentado en el curso, si el cliente cancela dentro de los <strong>8 meses</strong>, el vendedor devuelve la comisión, y quienes retienen más y tienen clientes más felices ganan más. Incentivos alineados con el éxito del cliente producen más deleite.
          </Nota>
        </div>
      </div>
    </Shell>
  );
}

const FRICCIONES = {
  externa: {
    etapas: ['Descubre', 'Compra', 'Recibe', 'Pide ayuda'],
    items: [
      { t: 'Esperas largas en teléfono o chat', e: 3 },
      { t: 'Formularios web sin respuesta', e: 0 },
      { t: 'Información difícil de hallar en el sitio', e: 0 },
      { t: 'Obligar a hablar con alguien para algo de autoservicio', e: 1 },
      { t: 'Retrasos en la entrega', e: 2 },
      { t: 'Fallas del producto o servicio', e: 2 },
      { t: 'Precios altos', e: 1 },
      { t: 'Cobros sorpresa', e: 1 },
    ],
  },
  interna: {
    etapas: ['Marketing', 'Ventas', 'Servicio', 'Operaciones'],
    items: [
      { t: 'Una fuente de verdad distinta por equipo', e: 3 },
      { t: 'Difícil encontrar la información del cliente', e: 2 },
      { t: 'Procesos duplicados o en conflicto entre equipos', e: 1 },
      { t: 'Equipos sin procesos consistentes', e: 0 },
      { t: 'Alta rotación de personas', e: 1 },
      { t: 'Incorporación y capacitación insuficientes', e: 2 },
    ],
  },
};

export function Friccion({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [tipo, setTipo] = useState<'externa' | 'interna'>('externa');
  const [i, setI] = useState(0);
  const data = FRICCIONES[tipo];
  const it = data.items[Math.min(i, data.items.length - 1)];
  const pos: [number, number][] = [[70, 176], [170, 148], [270, 120], [370, 92]];
  return (
    <Shell isDark={isDark} title="Dónde está" highlight="la fricción" subtitle="Busca los bordes filosos: lugares con demasiados traspasos o donde algo no funciona. Haz la lista, ordénala por facilidad de arreglo o por impacto, y ataca las primeras de inmediato.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[44%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">
            <Pill isDark={isDark} on={tipo === 'externa'} onClick={() => { setTipo('externa'); setI(0); }}>La vive el cliente</Pill>
            <Pill isDark={isDark} on={tipo === 'interna'} onClick={() => { setTipo('interna'); setI(0); }}>La viven tus equipos</Pill>
          </div>
          <svg viewBox="0 0 440 236" className="w-full max-h-[270px] overflow-visible" role="img" aria-label="Recorrido con un punto de fricción marcado">
            <SceneDefs id="rofr" isDark={isDark} />
            {pos.map(([x, y], k) => {
              const on = k === it.e;
              return (
                <g key={k}>
                  {on && <PulseDisc cx={x} cy={y + 12} rx={56} ry={18} color={PINK} dur={1.4} peak={0.45} />}
                  <g filter="url(#rofr-sh)"><IsoBox cx={x} cy={y} s={34} h={10} f={on ? BRAND : NEUTRAL(isDark)} /></g>
                  <text x={x} y={y + 17 + 10 + 20} textAnchor="middle" fontSize={12} fontWeight={900} fill={on ? PINK : t.muted}>{data.etapas[k]}</text>
                </g>
              );
            })}
            <Traveler id="rofr" path={[[70, 168], hop([70, 168], [170, 140], 22)[1], [170, 140], hop([170, 140], [270, 112], 22)[1], [270, 112], hop([270, 112], [370, 84], 22)[1], [370, 84]]} dur={3.4} repeatDelay={0.5} r={5} />
          </svg>
          <p className={`text-xs text-center max-w-sm ${textMuted(isDark)}`}>El punto rosa marca dónde golpea la fricción seleccionada.</p>
        </div>
        <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
          <p className={microLabel(isDark)}>{tipo === 'externa' ? 'Ejemplos de fricción que enfrenta el cliente' : 'Ejemplos de fricción interna'}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {data.items.map((x, k) => <Opcion key={x.t} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.t}</Opcion>)}
          </div>
          <Cita isDark={isDark} autor="Yamini Rangan">Quitar la fricción es examinar la experiencia del cliente a lo largo del recorrido e identificar los bordes filosos: demasiados traspasos, lugares que no funcionan.</Cita>
          <Nota isDark={isDark} label="Regla de prioridad" destacada>Cualquier mejora a la experiencia del cliente tiene efecto positivo en el negocio. Lo interno importa igual: todo lo que dificulta a tus equipos servir bien termina como fricción para el cliente.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const FRIC_CASOS = [
  {
    k: 'Fechas de inicio',
    cuadrante: 1,
    txt: 'Una agencia arranca clientes nuevos solo los días 1 y 15 de cada mes. Para quien quiere empezar el 5 es fricción, pero ventas la convierte en fuerza: «para partir el 15, el contrato debe llegar antes de fin de mes». Alinea expectativas y acelera la firma.',
    autor: 'Jen Spencer',
  },
  {
    k: 'Formulario de pasaporte',
    cuadrante: 1,
    txt: 'A mitad de un formulario aparecían 17 documentos requeridos. Al pedir que la persona confirmara al inicio que los tenía (más fricción), subieron los formularios completados, la satisfacción y el NPS.',
    autor: 'Doug Davidoff',
  },
  {
    k: 'Fricción que se traslada',
    cuadrante: 0,
    txt: 'Cuando reduces la fricción en un lugar, casi siempre se crea en otro. Quitarla exige un análisis de costo y beneficio, no un reflejo automático.',
    autor: 'Doug Davidoff',
  },
];

export function FriccionUtil({ isDark }: SlideProps) {
  const [i, setI] = useState(0);
  const c = FRIC_CASOS[i];
  const celdas = [
    { t: 'Fricción en lugar de poco valor', d: 'Elimínala: es la que daña la experiencia.', fila: 0, col: 1 },
    { t: 'Fricción intencional en un momento de alto valor', d: 'Úsala: hace que la persona se detenga y piense.', fila: 0, col: 0 },
    { t: 'Sin fricción en lo rutinario', d: 'Lo ideal: lo de poco valor debe ser fluido.', fila: 1, col: 1 },
    { t: 'Sin fricción en lo decisivo', d: 'Cuidado: la persona avanza sin darse cuenta de lo que implica.', fila: 1, col: 0 },
  ];
  return (
    <Shell isDark={isDark} title="Cuando la fricción" highlight="suma valor" subtitle="Al principio conviene asumir que toda fricción es mala. Con más madurez, aprendes a usarla a propósito: la cantidad de fricción debe calzar con el valor que agrega.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col justify-center gap-2">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-1.5 items-stretch">
            <span />
            <span className={`${microLabel(isDark)} text-center`}>Momento de alto valor</span>
            <span className={`${microLabel(isDark)} text-center`}>Momento de bajo valor</span>
            {[0, 1].map((fila) => (
              <React.Fragment key={fila}>
                <span className={`${microLabel(isDark)} [writing-mode:vertical-rl] rotate-180 text-center`}>{fila === 0 ? 'Con fricción' : 'Sin fricción'}</span>
                {[0, 1].map((col) => {
                  const cel = celdas.find((x) => x.fila === fila && x.col === col)!;
                  const activa = (fila === 0 && col === 0 && c.cuadrante === 1) || (fila === 0 && col === 1 && c.cuadrante === 0);
                  return (
                    <motion.div key={col} animate={{ scale: activa ? 1.03 : 1 }} className={`p-3 rounded-2xl min-h-[96px] ${activa ? featuredClass(isDark) : panelClass(isDark)}`}>
                      <p className={`text-[13px] font-black leading-tight ${activa ? 'text-[#ff851d]' : heading(isDark)}`}>{cel.t}</p>
                      <p className={`text-xs leading-snug mt-1 ${textMuted(isDark)}`}>{cel.d}</p>
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Doug Davidoff">Toda experiencia de alto valor tiene fricción; si no la tuviera, ni la notaría. El problema es la fricción en un lugar de poco valor. No usar la fricción es no usar una herramienta.</Cita>
          <div className="flex gap-1.5 flex-wrap">{FRIC_CASOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Nota isDark={isDark} label={`Caso · ${c.autor}`} destacada>{c.txt}</Nota>
            </motion.div>
          </AnimatePresence>
          <Nota isDark={isDark} label="Cómo empezar">Dibuja tu flywheel, lista todos sus puntos de fuerza y fricción, y elimina primero las fricciones más negativas. Después distingue cuáles dañan y cuáles mejoran la experiencia.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const MAPA = [
  { fase: 'Atraer', herramienta: 'Anuncios', equipo: 'Marketing', metrica: 'MQL, retorno de la inversión' },
  { fase: 'Involucrar', herramienta: 'Prospección de ventas', equipo: 'Ventas', metrica: 'Negocios cerrados-ganados' },
  { fase: 'Deleitar', herramienta: 'Chat en vivo', equipo: 'Ventas y servicio', metrica: 'Tiempo de respuesta, satisfacción del cliente' },
];

export function MapaFlywheel({ isDark }: SlideProps) {
  const [filas, setFilas] = useState(MAPA.map(() => ({ herramienta: '', equipo: '', metrica: '' })));
  const [obs, setObs] = useState({ o: '', a: '', s: '' });
  const input = `w-full bg-transparent text-xs outline-none border-b ${isDark ? 'border-white/10 text-gray-200 placeholder:text-gray-500' : 'border-gray-200 text-gray-800 placeholder:text-gray-400'}`;
  return (
    <Shell isDark={isDark} title="Mapea" highlight="tu flywheel" subtitle="Para cada fase, anota qué herramientas o procesos usas, qué equipo los maneja y con qué métrica los mides. Los textos grises son el ejemplo del material.">
      <div className="h-full flex flex-col gap-3 min-h-0 justify-center">
        <div className={`rounded-3xl p-3 ${panelClass(isDark)}`}>
          <div className="grid grid-cols-[110px_1fr_1fr_1.3fr] gap-x-3 gap-y-2 items-center">
            <span className={microLabel(isDark)}>Fase</span>
            <span className={microLabel(isDark)}>Herramienta o proceso</span>
            <span className={microLabel(isDark)}>Equipo</span>
            <span className={microLabel(isDark)}>Métrica</span>
            {MAPA.map((m, k) => (
              <React.Fragment key={m.fase}>
                <span className={`text-sm font-black ${k === 2 ? 'text-[#ef375c]' : 'text-[#ff851d]'}`}>{m.fase}</span>
                {(['herramienta', 'equipo', 'metrica'] as const).map((c) => (
                  <input key={c} className={input} placeholder={m[c]} value={filas[k][c]} onChange={(e) => setFilas((p) => p.map((f, j) => (j === k ? { ...f, [c]: e.target.value } : f)))} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-3">
          <Nota isDark={isDark} label="Después de dibujarlo, pregúntate">
            ¿Dónde sienten más fricción tus clientes? ¿Y tus equipos internos? ¿Dónde ejerce más fuerza la empresa? ¿Dónde debería ejercer más?
          </Nota>
          <div className={`rounded-2xl p-3 ${featuredClass(isDark)}`}>
            <p className={microLabel(isDark)}>De la observación a la acción</p>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              <input className={input} placeholder="Ventas no contacta los leads de marketing" value={obs.o} onChange={(e) => setObs({ ...obs, o: e.target.value })} />
              <input className={input} placeholder="Reunir a los líderes de ambas áreas" value={obs.a} onChange={(e) => setObs({ ...obs, a: e.target.value })} />
              <input className={input} placeholder="Jefatura de ventas y de marketing" value={obs.s} onChange={(e) => setObs({ ...obs, s: e.target.value })} />
            </div>
            <div className={`grid grid-cols-3 gap-2 mt-1 text-[10px] font-bold ${textMuted(isDark)}`}><span>Observación</span><span>Acción propuesta</span><span>Personas clave</span></div>
          </div>
        </div>
        <Footer isDark={isDark}>Lo que escribas aquí no se guarda: es un borrador para la conversación de la clase.</Footer>
      </div>
    </Shell>
  );
}
