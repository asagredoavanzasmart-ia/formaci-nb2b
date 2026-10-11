import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor, Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from '../scene3d';
import type { Faces } from '../scene3d';
import { SlideProps, heading, Piso, Bola, Cifra, Cita, Nota, Fuente, Opcion, Paso } from './kit';

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 8 · Estructurar el equipo
══════════════════════════════════════════════════════════════════ */

const MODOS = [
  { k: 'Silos', d: 'Operaciones de marketing, de ventas y de servicio reportan cada una a su área. Todos optimizan su parte y nadie mira el recorrido completo del cliente.' },
  { k: 'Estructura formal', d: 'Las tres operaciones reportan a una persona con experiencia en operaciones. Una sola mirada sobre procesos, sistemas y datos.' },
  { k: 'Cadencia informal', d: 'Cada operación sigue en su área, pero sus líderes se reúnen con una cadencia regular para tomar decisiones juntos.' },
];

export function Silos({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [m, setM] = useState(0);
  const areas: { x: number; nombre: string; f: Faces }[] = [
    { x: 90, nombre: 'Marketing', f: PEACH },
    { x: 230, nombre: 'Ventas', f: BRAND },
    { x: 370, nombre: 'Servicio', f: SLATE(isDark) },
  ];
  return (
    <Shell isDark={isDark} title="Del organigrama actual" highlight="al ideal" subtitle="Para que el cambio ocurra hay que pensar en los silos y en cómo te organizas. Se puede formalmente, con una línea de reporte, o informalmente, con una cadencia de reuniones entre líderes de operaciones.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-2">{MODOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === m} onClick={() => setM(k)}>{x.k}</Pill>)}</div>
          <svg viewBox="0 0 460 250" className="w-full max-h-[270px] overflow-visible" role="img" aria-label={`Organización en modo ${MODOS[m].k}`}>
            <SceneDefs id="rsi" isDark={isDark} />
            <Piso cx={230} cy={168} s={222} fill={t.floor} />
            {areas.map((a, k) => (
              <g key={a.nombre}>
                <g filter="url(#rsi-sh)"><IsoBox cx={a.x} cy={150} s={30} h={20} f={a.f} /></g>
                <text x={a.x} y={222} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Ops de {a.nombre.toLowerCase()}</text>
                <Float amp={2.5} dur={2.4 + k * 0.3}><Persona id="rsi" cx={a.x} cy={150} s={0.62} body={a.f} /></Float>
              </g>
            ))}
            <AnimatePresence>
              {m === 1 && (
                <motion.g key="lider" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <PulseDisc cx={230} cy={62} rx={40} ry={13} dur={2.2} peak={0.3} />
                  <Float amp={3}><Persona id="rsi" cx={230} cy={60} s={0.75} body={BRAND} accessory="compass" /></Float>
                  <text x={290} y={40} fontSize={12} fontWeight={900} fill={ORANGE}>Líder de RevOps</text>
                  {areas.map((a, k) => <Traveler key={k} id="rsi" path={hop([230, 50], [a.x, 108], 10)} dur={1.4} delay={k * 0.4} repeatDelay={0.8} r={4} />)}
                </motion.g>
              )}
              {m === 2 && (
                <motion.g key="mesa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PulseDisc cx={230} cy={60} rx={50} ry={16} dur={1.8} peak={0.3} />
                  <Cylinder cx={230} cy={54} rx={40} ry={13} h={10} top={ORANGE} side="#c45c00" />
                  <text x={290} y={40} fontSize={12} fontWeight={900} fill={ORANGE}>Reunión periódica</text>
                  <Traveler id="rsi" path={[[90, 108], [230, 50], [370, 108], [230, 50], [90, 108]]} dur={4} r={4.5} />
                </motion.g>
              )}
              {m === 0 && (
                <motion.g key="silos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {areas.map((a, k) => <PulseDisc key={k} cx={a.x} cy={168} rx={40} ry={13} color={PINK} dur={1.6} delay={k * 0.3} peak={0.3} />)}
                  <text x={230} y={44} textAnchor="middle" fontSize={12} fontWeight={900} fill={PINK}>Sin nadie que mire el ciclo completo</text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait"><motion.div key={m} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Nota isDark={isDark} label={MODOS[m].k} destacada>{MODOS[m].d}</Nota></motion.div></AnimatePresence>
          <p className={microLabel(isDark)}>La actividad del workbook, en tres preguntas</p>
          <Paso isDark={isDark} n={1} titulo="Dibuja tu organigrama actual">Marca los silos y los puntos donde se rompe la alineación.</Paso>
          <Paso isDark={isDark} n={2} titulo="Dibuja el organigrama ideal">Uno al que el equipo pueda crecer, formal o informal.</Paso>
          <Paso isDark={isDark} n={3} titulo="Traza el camino">¿Qué cambios hacen falta, en qué orden, y de quién necesitas apoyo para hacerlos?</Paso>
        </div>
      </div>
    </Shell>
  );
}

const ETAPAS_EQ = [
  { k: 'Una persona', roles: ['Tú'], d: 'Una sola persona hace sistemas, análisis y procesos. Funciona hasta el punto de quiebre: «estoy tan estirado que no hago nada bien, ni siquiera regular» (Matt Volm).' },
  { k: '+ Sistemas', roles: ['Tú', 'Sistemas'], d: 'Primero, alguien que administre todos los sistemas. El personal administrativo es una contratación crítica temprana (Ross Nibur).' },
  { k: '+ Análisis', roles: ['Tú', 'Sistemas', 'Análisis'], d: 'Luego, una persona de análisis que cubra todas las áreas del negocio.' },
  { k: 'Escala', roles: ['Tú', 'Sistemas', 'Análisis', 'Sistemas', 'Análisis'], d: 'Al crecer el alcance, otra persona de sistemas y otra de análisis. Planifica según los problemas de los próximos 6 a 12 meses (Greg Keshian).' },
];

export function Capas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const e = ETAPAS_EQ[i];
  const n = e.roles.length;
  return (
    <Shell isDark={isDark} title="Cómo crece" highlight="un equipo de operaciones" subtitle="Bajo el paraguas de operaciones hay tres tipos de personas: quienes ejecutan la misión (por ejemplo, el equipo de éxito del cliente), las de sistemas y las de análisis. Se suman en equilibrio.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[50%] flex flex-col items-center justify-center gap-2">
          <div className="flex gap-1.5 flex-wrap justify-center">{ETAPAS_EQ.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
          <svg viewBox="0 0 460 230" className="w-full max-h-[250px] overflow-visible" role="img" aria-label={`Equipo de ${n} personas`}>
            <SceneDefs id="rca" isDark={isDark} />
            <Piso cx={230} cy={160} s={222} fill={t.floor} />
            {e.roles.map((r, k) => {
              const x = n === 1 ? 230 : 70 + (k * 320) / (n - 1);
              const f = r === 'Tú' ? BRAND : r === 'Sistemas' ? PEACH : SLATE(isDark);
              return (
                <motion.g key={k + r} initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.12, type: 'spring', stiffness: 90, damping: 13 }}>
                  <Float amp={3} dur={2.3 + k * 0.2} delay={k * 0.2}><Persona id="rca" cx={x} cy={160} s={0.85} body={f} accessory={r === 'Tú' ? 'compass' : r === 'Sistemas' ? 'gear' : 'star'} /></Float>
                  <text x={x} y={194} textAnchor="middle" fontSize={12} fontWeight={900} fill={r === 'Tú' ? ORANGE : t.muted}>{r}</text>
                </motion.g>
              );
            })}
            {n > 1 && <Traveler key={n} id="rca" path={Array.from({ length: n }, (_, k) => [n === 1 ? 230 : 70 + (k * 320) / (n - 1), 90] as [number, number])} dur={2.4} repeatDelay={0.4} r={4.5} />}
          </svg>
          <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full"><Nota isDark={isDark} label={e.k}>{e.d}</Nota></motion.div></AnimatePresence>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Ross Nibur">Es el concepto del proceso de escritorio: la persona de operaciones de ventas debe saber hacer todo lo que un vendedor hace en su escritorio. No vender, sino cada botón, cada clic, cada proceso y cada tecnología.</Cita>
          <Nota isDark={isDark} label="Suma administradores despacio">Los administradores construyen, y cuantos más tengas, más personalizarás el sistema. Tener uno solo limita los cambios que se pueden hacer (Bryan Semple).</Nota>
          <Nota isDark={isDark} label="Y suma líderes" destacada>Mientras los especialistas construyen sistemas y procesos, los líderes construyen relaciones con marketing, ventas y servicio, y entienden su trabajo diario. Así los especialistas no pierden el rumbo.</Nota>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 9 · Contratar al equipo
══════════════════════════════════════════════════════════════════ */

const RESPONS = [
  { r: 'Administración del CRM', s: 'Conocer el CRM, algo de código, nociones de APIs' },
  { r: 'Reportes de ingresos', s: 'Análisis de datos, herramientas de inteligencia de negocios' },
  { r: 'Gobierno de datos', s: 'Documentación, criterio, diccionario de datos' },
  { r: 'Gestión del stack', s: 'Integraciones, evaluación de proveedores, presupuesto' },
];

const CAUSAS = [
  { k: 'Demasiadas tareas para pocas personas', d: 'No hay tiempo para cumplir bien. Contratar es una buena solución.', contratar: 'Sí' },
  { k: 'Faltan habilidades o experiencia', d: 'Contratar puede servir, pero también capacitar, apoyarse en otros equipos internos o consultar a expertos externos.', contratar: 'Quizá' },
  { k: 'La empresa no invierte lo suficiente en RevOps', d: 'Faltan recursos de fondo. Contratar probablemente no lo resuelve.', contratar: 'No' },
];

export function Necesidad({ isDark }: SlideProps) {
  const [eval_, setEval] = useState<string[]>(['Insatisfactorio', 'Satisfactorio', 'Nulo', 'Satisfactorio']);
  const [c, setC] = useState(0);
  const estilos: Record<string, string> = {
    Satisfactorio: 'bg-emerald-500/15 text-emerald-600',
    Insatisfactorio: 'bg-rose-500/15 text-rose-500',
    Nulo: isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-500',
  };
  const ciclo = ['Satisfactorio', 'Insatisfactorio', 'Nulo'];
  const pendientes = eval_.filter((x) => x !== 'Satisfactorio').length;
  return (
    <Shell isDark={isDark} title="¿Hay que" highlight="contratar?" subtitle="Antes de buscar a alguien, evalúa cómo está funcionando tu equipo, aunque sea un equipo de una persona. «Nulo» marca una responsabilidad que hoy nadie tiene y que quieres asumir.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[54%] flex flex-col gap-2 justify-center">
          <div className={`rounded-3xl p-3 ${panelClass(isDark)}`}>
            <div className="grid grid-cols-[1.1fr_1.6fr_auto] gap-x-3 gap-y-1.5 items-center">
              <span className={microLabel(isDark)}>Responsabilidad</span><span className={microLabel(isDark)}>Habilidades</span><span className={microLabel(isDark)}>Desempeño</span>
              {RESPONS.map((x, k) => (
                <React.Fragment key={x.r}>
                  <span className={`text-[13px] font-bold ${heading(isDark)}`}>{x.r}</span>
                  <span className={`text-xs ${textMuted(isDark)}`}>{x.s}</span>
                  <button onClick={() => setEval((p) => p.map((v, j) => (j === k ? ciclo[(ciclo.indexOf(v) + 1) % 3] : v)))} className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${estilos[eval_[k]]}`}>{eval_[k]}</button>
                </React.Fragment>
              ))}
            </div>
            <p className={`text-[11px] mt-2 ${textMuted(isDark)}`}>Filas de ejemplo; la primera viene del workbook. Responsabilidades por revisar: <strong className="text-[#ef375c]">{pendientes}</strong>.</p>
          </div>
          <Cita isDark={isDark} autor="Matt Volm">Llegas al punto de quiebre: «estoy demasiado estirado, no puedo con todo, no hago nada bien. Necesito a alguien que me apoye».</Cita>
        </div>
        <div className="lg:w-[46%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>¿Qué frena cada responsabilidad insatisfactoria o nula?</p>
          {CAUSAS.map((x, k) => (
            <button key={x.k} onClick={() => setC(k)} className="text-left">
              <div className={`p-3 rounded-2xl ${k === c ? featuredClass(isDark) : panelClass(isDark)}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-black ${k === c ? 'text-[#ff851d]' : heading(isDark)}`}>{x.k}</p>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${x.contratar === 'Sí' ? 'bg-emerald-500/15 text-emerald-600' : x.contratar === 'No' ? 'bg-rose-500/15 text-rose-500' : 'bg-amber-500/15 text-amber-600'}`}>¿Contratar? {x.contratar}</span>
                </div>
                {k === c && <p className={`text-xs mt-1 leading-snug ${textMuted(isDark)}`}>{x.d}</p>}
              </div>
            </button>
          ))}
          <Nota isDark={isDark} label="Luego, arma los roles">Agrupa las responsabilidades que comparten habilidades en un mismo rol. Ejemplo: «administrador de sistemas» reúne la administración del CRM y del stack.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const CUADRANTES = [
  { k: 'Especialista acreditado', fila: 0, col: 0, d: 'Responsabilidades específicas y experiencia directa. Busca credenciales estándar de la industria que prueben que sabe hacer la tarea. Aporta valor rápido: ideal si necesitas a alguien de inmediato.', cita: 'El personal administrativo es una contratación crítica temprana.', autor: 'Ross Nibur' },
  { k: 'Líder de operaciones con experiencia', fila: 0, col: 1, d: 'Responsabilidades amplias y experiencia directa. Busca a quien ya ocupó ese rol en una empresa en tu misma etapa de crecimiento. Puede requerir cazar talento; si no, baja el rol al cuadrante inferior.', cita: 'Veía demasiados problemas como especiales y únicos, y no lo eran. Toda empresa necesita un motor de distribución y de puntaje de leads.', autor: 'Ross Nibur' },
  { k: 'Generalista en transición', fila: 1, col: 1, d: 'Responsabilidades amplias y experiencia transferible. Tiene las habilidades aunque no el cargo. La mayoría de los profesionales de operaciones empezó fuera de operaciones.', cita: 'Ingeniería de ventas es quizá uno de los mejores perfiles para pasar a RevOps: entienden los sistemas, el proceso de venta y la vida en terreno.', autor: 'Chloe Barritault' },
  { k: 'No recomendado', fila: 1, col: 0, d: 'Responsabilidades acotadas sin credencial ni experiencia que muestre que la persona tendrá éxito. Si el foco es estrecho, pide alguna prueba de que sabrá hacerlo.', cita: 'No asumas que lo que hiciste en tu empresa anterior va a funcionar en la nueva.', autor: 'Yuri Dekiba' },
];

export function Cuadrante({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(1);
  const q = CUADRANTES[i];
  const centro = (fila: number, col: number): [number, number] => [col === 0 ? 140 : 310, fila === 0 ? 96 : 190];
  const [px, py] = centro(q.fila, q.col);
  return (
    <Shell isDark={isDark} title="Qué tipo de candidato" highlight="buscar" subtitle="Ubica cada rol en dos ejes: cuántas responsabilidades tendrá (específicas o amplias) y qué tanto importa la experiencia directa frente a la experiencia transferible.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[48%] flex flex-col items-center justify-center">
          <svg viewBox="0 0 460 262" className="w-full max-h-[290px] overflow-visible" role="img" aria-label="Cuadrante de tipos de candidato">
            <SceneDefs id="rcu" isDark={isDark} />
            {CUADRANTES.map((c, k) => {
              const [x, y] = centro(c.fila, c.col);
              const on = k === i;
              return (
                <g key={c.k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  <rect x={x - 80} y={y - 42} width={160} height={84} rx={14} fill={on ? (isDark ? '#3a2418' : '#fff1e6') : t.floor} opacity={c.k === 'No recomendado' && !on ? 0.5 : 1} />
                  <text x={x} y={y - 26} textAnchor="middle" fontSize={11} fontWeight={900} fill={on ? ORANGE : t.muted}>{c.k === 'Líder de operaciones con experiencia' ? 'Líder de operaciones' : c.k}</text>
                </g>
              );
            })}
            <motion.g initial={false} animate={{ x: px - 140, y: py - 96 }} transition={{ type: 'spring', stiffness: 70, damping: 13 }}>
              <PulseDisc cx={140} cy={130} rx={30} ry={9} dur={2} peak={0.3} />
              <Float amp={3}><Persona id="rcu" cx={140} cy={128} s={0.62} body={q.k === 'No recomendado' ? NEUTRAL(isDark) : BRAND} accessory={q.col === 1 ? 'compass' : 'gear'} /></Float>
            </motion.g>
            <text x={225} y={34} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Específicas ←  responsabilidades  → Amplias</text>
            <text x={40} y={96} fontSize={11} fontWeight={800} fill={t.muted} transform="rotate(-90 40 96)" textAnchor="middle">Experiencia directa</text>
            <text x={40} y={190} fontSize={11} fontWeight={800} fill={t.muted} transform="rotate(-90 40 190)" textAnchor="middle">Transferible</text>
          </svg>
        </div>
        <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
          <div className="grid grid-cols-2 gap-1.5">{CUADRANTES.map((c, k) => <Opcion key={c.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{c.k}</Opcion>)}</div>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
              <Nota isDark={isDark} label={q.k} destacada>{q.d}</Nota>
              <Cita isDark={isDark} autor={q.autor}>{q.cita}</Cita>
            </motion.div>
          </AnimatePresence>
          <Nota isDark={isDark} label="La compensación">Juntar dos responsabilidades con poco en común (análisis financiero y administración del CRM) en un solo rol exige amplitud: el punto se mueve a la derecha y hacia abajo. Date permiso para bajar: es más fácil encontrar habilidades que un contexto exacto.</Nota>
        </div>
      </div>
    </Shell>
  );
}

const FASES_E = [
  { k: 'Verificar la base técnica', d: 'No exige experiencia en operaciones, sino habilidades que se transfieran. Busca señales de que le encanta resolver problemas complejos con datos y sistemas, a menudo en proyectos fuera de su descripción de cargo.' },
  { k: 'Evaluación de habilidades', d: 'Un ejercicio para llevar a casa o un entorno de prueba: un problema simple y cómo lo resolvería. Importa más el razonamiento que la respuesta correcta (Chloe Barritault).' },
  { k: 'Entrevista cara a cara', d: 'Preguntas estandarizadas para comparar con justicia. Deja de lado afinidades personales: lo que cuenta es cómo rendirá en el rol.' },
];

const RESPUESTAS = [
  { k: 'Buena', t: 'En mi último cargo administré X sistemas, bajé el costo del stack en Y% y construí una integración a medida entre los sistemas A y B.' },
  { k: 'Regular', t: 'En mi cargo actual me volví la persona a la que todos consultan sobre el stack. No era mi función, pero resolví el problema X haciendo Z.' },
  { k: 'Mala', t: 'Me gustan los computadores, y mi mamá me llama cuando tiene problemas con su correo.' },
];

export function Entrevista({ isDark }: SlideProps) {
  const [f, setF] = useState(0);
  const [r, setR] = useState(0);
  return (
    <Shell isDark={isDark} title="Evaluar a los candidatos" highlight="como trabajarán" subtitle="«El proceso de contratación debe emular lo que la persona hará en terreno una vez contratada» (Hilmon Sorey). Estandarizarlo da a cada candidato la misma oportunidad.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col gap-2 justify-center">
          <p className={microLabel(isDark)}>Tres fases</p>
          {FASES_E.map((x, k) => <button key={x.k} onClick={() => setF(k)} className="text-left"><Paso isDark={isDark} n={k + 1} titulo={x.k} on={k === f}>{k === f ? x.d : null}</Paso></button>)}
          <div className="grid grid-cols-3 gap-2">
            {[['Personalidad', 'qué lo motiva'], ['Conductual', 'cómo trabaja en equipo'], ['Habilidades', 'dónde está hoy y si es entrenable']].map(([a, b]) => (
              <div key={a} className={`p-2.5 rounded-2xl ${panelClass(isDark)}`}><p className="text-[12px] font-black text-[#ff851d]">{a}</p><p className={`text-[11px] leading-snug ${textMuted(isDark)}`}>{b}</p></div>
            ))}
          </div>
          <p className={`text-[11px] ${textMuted(isDark)}`}>Los tres tipos de evaluación que describe Hilmon Sorey.</p>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <Nota isDark={isDark} label="Pauta de ejemplo del workbook · atributo: experiencia gestionando sistemas">«Cuéntame de una vez en que tuviste que administrar varios sistemas y hacer que funcionaran juntos.»</Nota>
          <div className="flex gap-2">{RESPUESTAS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === r} onClick={() => setR(k)}>Respuesta {x.k.toLowerCase()}</Pill>)}</div>
          <AnimatePresence mode="wait"><motion.div key={r} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Cita isDark={isDark} autor={`Respuesta ${RESPUESTAS[r].k.toLowerCase()}`}>{RESPUESTAS[r].t}</Cita></motion.div></AnimatePresence>
          <Nota isDark={isDark} label="Prueba de habilidad · ejemplo del workbook" destacada>Habilidad: comprensión básica de APIs. Tarea real: evaluar integraciones entre sistemas. Evaluación: hacer una llamada de prueba.</Nota>
          <Cita isDark={isDark} autor="Sandy Robinson">Creo firmemente en contratar a gente más inteligente y mejor que yo. «Así lo imagino, ¿qué opinas?». «Genial, hazlo a tu manera, probémoslo y midámoslo.»</Cita>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════
   LECCIÓN 10 · Evaluar e iterar
══════════════════════════════════════════════════════════════════ */

const ELEMENTOS = [
  { k: 'Recolectar datos', d: 'Implementar los sistemas que recolectan los datos para ver las oportunidades de crecimiento.' },
  { k: 'Comunicar', d: 'Llevar esas oportunidades a los líderes de la empresa y comprometer un plan para abordarlas.' },
  { k: 'Alinear', d: 'Alinear a los equipos en métricas y metas compartidas que sostengan el plan.' },
];

export function Ciclo({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [i, setI] = useState(0);
  const cx = 220, cy = 118;
  const pos: [number, number][] = [[cx, cy - 66], [cx + 112, cy + 40], [cx - 112, cy + 40]];
  return (
    <Shell isDark={isDark} title="Los tres elementos que" highlight="se repiten siempre" subtitle="Toda estrategia de RevOps se apoya en tres elementos. Es un proceso continuo: mientras los equipos ejecutan el plan, sigues recolectando y analizando datos para encontrar la siguiente oportunidad.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[46%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 440 250" className="w-full max-h-[280px] overflow-visible" role="img" aria-label="Ciclo de tres elementos">
            <SceneDefs id="rci" isDark={isDark} />
            <ellipse cx={cx} cy={cy + 34} rx={180} ry={70} fill={t.floor} />
            <Float amp={3}><Bola id="rci" cx={cx} cy={cy + 6} r={20} /></Float>
            <Traveler id="rci" path={[...pos, pos[0]]} dur={3.6} r={5} />
            {pos.map(([x, y], k) => {
              const on = k === i;
              return (
                <g key={k} onClick={() => setI(k)} style={{ cursor: 'pointer', outline: 'none' }}>
                  {on && <PulseDisc cx={x} cy={y + 18} rx={48} ry={15} dur={2} peak={0.32} />}
                  <Lift on={on} dimmed={false} lift={8}>
                    <g filter="url(#rci-sh)"><IsoBox cx={x} cy={y - 10} s={26} h={20} f={on ? BRAND : PEACH} /></g>
                  </Lift>
                  <text x={x} y={y + 50} textAnchor="middle" fontSize={12.5} fontWeight={900} fill={on ? ORANGE : t.muted}>{k + 1}. {ELEMENTOS[k].k}</text>
                </g>
              );
            })}
          </svg>
          <div className="flex gap-2">{ELEMENTOS.map((x, k) => <Pill key={x.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.k}</Pill>)}</div>
        </div>
        <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
          <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Nota isDark={isDark} label={`Elemento ${i + 1}`} destacada>{ELEMENTOS[i].d}</Nota></motion.div></AnimatePresence>
          <Cita isDark={isDark} autor="Lyndon Brathwaite">Si no llegaste a la meta, trabaja hacia atrás para entender por qué. ¿Hace falta un grupo focal de clientes? ¿Una conversación con el personal? A veces olvidamos hablar con el equipo, y el equipo siempre sabe qué está fallando.</Cita>
          <div className="grid grid-cols-2 gap-2.5">
            <Nota isDark={isDark} label="Mira la cadena completa">Sigue las conversiones hasta el ingreso: si algo no funciona, en algún punto aparecerá una brecha.</Nota>
            <Nota isDark={isDark} label="Cuando todo marcha">Llega la curva del cambio: el motor corre solo y te enfocas en oportunidades nuevas, como otro mercado o segmento.</Nota>
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function Metas({ isDark }: SlideProps) {
  const [plan, setPlan] = useState<string[][]>(Array.from({ length: 3 }, () => Array(4).fill('')));
  const trimestres = ['Este trimestre', 'El siguiente', 'El subsiguiente', 'El último'];
  const filas = ['Metas', 'Métricas', 'Cómo se ve el éxito'];
  const ejemplos = [
    ['Definir MQL y SQL con marketing y ventas', 'Implementar el SLA', 'Etapas posventa en el CRM', 'Revisar el recorrido del cliente'],
    ['Definición firmada por ambas áreas', 'Leads contactados a tiempo', 'Días hasta el cliente activo', 'NPS y renovaciones'],
    ['Un solo reporte, sin discusiones', '90% contactado en 24 horas', 'Ningún negocio sin activar', 'Plan del próximo año aprobado'],
  ];
  const input = `w-full bg-transparent text-[11.5px] outline-none border-b ${isDark ? 'border-white/10 text-gray-200 placeholder:text-gray-500' : 'border-gray-200 text-gray-800 placeholder:text-gray-400'}`;
  return (
    <Shell isDark={isDark} title="De la visión a" highlight="las metas trimestrales" subtitle="RevOps es una inversión de uno a tres años. Para que el trabajo diario apunte a esa visión, divídela en metas trimestrales que se construyen una sobre otra.">
      <div className="h-full flex flex-col gap-3 min-h-0 justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Nota isDark={isDark} label="Por dónde empezar">Por los problemas que se pueden cuantificar: clics de un formulario, tasas de abandono, días que un negocio pasa en revisión legal, tiempos de respuesta, uso de la aplicación (Jen Spencer).</Nota>
          <Nota isDark={isDark} label="Lo que nunca se suelta" destacada>Optimizar el proceso de ventas. Ahí nace el flujo de ingresos que mantiene viva a la empresa; con un pipeline predecible, recién puedes innovar en la experiencia del cliente.</Nota>
          <Nota isDark={isDark} label="Paciencia con los resultados">No se ven de inmediato: con el tiempo baja el costo por lead, suben las conversiones y el valor de vida del cliente. El pago real llega a los 18 meses (Doug Davidoff).</Nota>
        </div>
        <div className={`rounded-3xl p-3 ${panelClass(isDark)}`}>
          <p className={microLabel(isDark)}>Plan de 12 meses del workbook · los textos grises son ejemplos ilustrativos</p>
          <div className="grid grid-cols-[130px_repeat(4,1fr)] gap-x-3 gap-y-2 mt-1.5 items-center">
            <span />
            {trimestres.map((tr) => <span key={tr} className="text-[11px] font-black text-[#ff851d]">{tr}</span>)}
            {filas.map((f, r) => (
              <React.Fragment key={f}>
                <span className={`text-[12px] font-black ${heading(isDark)}`}>{f}</span>
                {trimestres.map((_, c) => (
                  <input key={c} className={input} placeholder={ejemplos[r][c]} value={plan[r][c]} onChange={(e) => setPlan((p) => p.map((row, j) => (j === r ? row.map((v, k) => (k === c ? e.target.value : v)) : row)))} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Cita isDark={isDark} autor="Jen Spencer">Nos alineamos en metas anuales y a tres años, y las bajamos a «rocas» trimestrales. Algo que figura como meta a tres años no se puede empezar en el año tres.</Cita>
          <Nota isDark={isDark} label="Revisa el recorrido del cliente">Mapea el recorrido del cliente al menos cada doce meses: si creces mucho, lo que necesita cada segmento cambia, y tu producto también lo cambia (Sarah Doughty).</Nota>
        </div>
      </div>
    </Shell>
  );
}

export function Diario({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [tareas, setTareas] = useState(['', '', '']);
  const [dejar, setDejar] = useState('');
  const input = `w-full bg-transparent text-sm outline-none border-b py-1 ${isDark ? 'border-white/10 text-gray-200 placeholder:text-gray-500' : 'border-gray-200 text-gray-800 placeholder:text-gray-400'}`;
  return (
    <Shell isDark={isDark} title="Prioridades diarias y" highlight="una lista de qué dejar de hacer" subtitle="La magia de RevOps es traducir una visión de largo plazo en tareas diarias. Si una tarea diaria no apoya esa visión, busca cómo sacarla de tu plato.">
      <div className="h-full flex flex-col lg:flex-row gap-5 min-h-0">
        <div className="lg:w-[40%] flex flex-col items-center justify-center gap-2">
          <svg viewBox="0 0 400 220" className="w-full max-h-[240px] overflow-visible" role="img" aria-label="Tres prioridades del día y una tarea descartada">
            <SceneDefs id="rdi" isDark={isDark} />
            <Piso cx={200} cy={150} s={190} fill={t.floor} />
            {[0, 1, 2].map((k) => (
              <motion.g key={k} initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.2, type: 'spring', stiffness: 90, damping: 12 }}>
                <Float amp={3} dur={2.2 + k * 0.3} delay={k * 0.2}><g filter="url(#rdi-sh)"><IsoBox cx={90 + k * 80} cy={96 - k * 6} s={24} h={30 + k * 6} f={BRAND} /></g></Float>
                <text x={90 + k * 80} y={176} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>{k + 1}</text>
              </motion.g>
            ))}
            <motion.g animate={{ opacity: [1, 0.35, 1], x: [0, 6, 0] }} transition={{ duration: 2.6, repeat: Infinity }}>
              <g filter="url(#rdi-sh)"><IsoBox cx={334} cy={120} s={20} h={16} f={NEUTRAL(isDark)} /></g>
            </motion.g>
            <text x={334} y={176} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={PINK}>Dejar de hacer</text>
            <text x={170} y={206} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Tres cosas al día, comunicadas a la gerencia y al equipo</text>
          </svg>
        </div>
        <div className="lg:w-[60%] flex flex-col gap-2.5 justify-center">
          <Cita isDark={isDark} autor="Chloe Barritault">Cada mañana definimos tres cosas que lograremos ese día y se las comunicamos al CEO y a los equipos con que trabajamos. Si aparece algo más urgente, hacemos el ejercicio de qué se sacrifica a cambio.</Cita>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Mis tres prioridades de hoy</p>
              {tareas.map((v, k) => <input key={k} className={input} placeholder={`${k + 1}. ${['Revisar los leads sin contactar', 'Corregir la definición de SQL', 'Preparar el A3 del traspaso'][k]}`} value={v} onChange={(e) => setTareas((p) => p.map((x, j) => (j === k ? e.target.value : x)))} />)}
            </div>
            <div className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Mi lista de qué dejar de hacer</p>
              <input className={input} placeholder="Ej.: el reporte semanal que nadie abre" value={dejar} onChange={(e) => setDejar(e.target.value)} />
              <p className={`text-xs mt-2 leading-snug ${textMuted(isDark)}`}>«Es mucho más corta que una lista de pendientes y tiene mucho más poder» (Doug Davidoff).</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Nota isDark={isDark} label="Empieza aunque no sea perfecto">«Haz algo y sácalo. Como un producto mínimo viable: mira cómo funciona y hazlo mejor» (Jasmine Powers).</Nota>
            <Cita isDark={isDark} autor="Asia Corbett">No somos solo gente de sistemas ni somos bloqueadores. Estamos para ayudarte a salir al mercado y traer más ingresos. Para eso estamos.</Cita>
          </div>
        </div>
      </div>
    </Shell>
  );
}
