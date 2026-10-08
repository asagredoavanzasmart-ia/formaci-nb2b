import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, XCircle, AlertTriangle, Circle } from 'lucide-react';
import { Shell, panelClass, textMuted, microLabel, Footer, Pill, featuredClass, Quiz } from './slideKit';
import type { QuizQ } from './slideKit';
import {
  ORANGE, PINK, BRAND, PEACH, NEUTRAL, SLATE, sceneTone, SceneDefs, IsoBox, IsoFloor,
  Cylinder, Orb, Float, Lift, Traveler, PulseDisc, hop, Persona,
} from './scene3d';
import type { Faces, Accessory } from './scene3d';

/**
 * Clase: "Las trampas del deseo" (Dan Ariely).
 *
 * Fuentes del usuario: guía de estudio, síntesis, ficha de aprendizaje y resumen
 * de pruebas (el PDF del libro es un escaneo sin texto extraíble).
 * Añadido con verificación propia: el estado de la evidencia de cada estudio,
 * incluida la retractación en septiembre de 2026 del artículo sobre fechas límite
 * del MIT (td-fechas) y la sección de pensamiento crítico.
 */

type SlideProps = { isDark: boolean };

const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

/* ------------------------------------------------------------------ */
/* Estado de la evidencia                                              */
/* ------------------------------------------------------------------ */

type SelloTipo = 'solido' | 'disputa' | 'noreplico' | 'retractado' | 'noverif';

const SELLOS: Record<SelloTipo, { texto: string; claro: string; oscuro: string }> = {
  solido: { texto: 'Evidencia sólida', claro: 'bg-emerald-50 text-emerald-700', oscuro: 'bg-emerald-500/15 text-emerald-300' },
  disputa: { texto: 'Evidencia en disputa', claro: 'bg-amber-50 text-amber-700', oscuro: 'bg-amber-500/15 text-amber-300' },
  noreplico: { texto: 'No replicó', claro: 'bg-orange-50 text-orange-700', oscuro: 'bg-orange-500/15 text-orange-300' },
  retractado: { texto: 'Retractado', claro: 'bg-rose-50 text-rose-700', oscuro: 'bg-rose-500/15 text-rose-300' },
  noverif: { texto: 'Sin réplica verificada', claro: 'bg-gray-100 text-gray-600', oscuro: 'bg-white/10 text-gray-300' },
};

function Sello({ isDark, tipo }: { isDark: boolean; tipo: SelloTipo }) {
  const s = SELLOS[tipo];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide whitespace-nowrap ${isDark ? s.oscuro : s.claro}`}>
      {tipo === 'solido' ? <CheckCircle2 size={11} /> : tipo === 'retractado' || tipo === 'noreplico' ? <XCircle size={11} /> : <AlertTriangle size={11} />}
      {s.texto}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, dur = 900) {
  const [v, setV] = useState(0);
  const from = React.useRef(0);
  React.useEffect(() => {
    from.current = v;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(from.current + (target - from.current) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return v;
}

/* Tarjeta de cifra con número animado. */
function Cifra({ isDark, n, sufijo = '', prefijo = '', titulo, lineas, destacada = false }: { isDark: boolean; n: number; sufijo?: string; prefijo?: string; titulo: string; lineas: string[]; destacada?: boolean }) {
  const v = useCountUp(n);
  return (
    <div className={`p-4 rounded-3xl flex flex-col gap-1 ${destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
      <p className={microLabel(isDark)}>{titulo}</p>
      <p className="text-3xl md:text-4xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{prefijo}{v.toLocaleString('es-CL')}{sufijo}</p>
      {lineas.map((l) => <p key={l} className={`text-xs leading-snug ${textMuted(isDark)}`}>{l}</p>)}
    </div>
  );
}

/* Parte un texto en líneas de un máximo de caracteres (para etiquetas de escenas). */
function envolver(texto: string, max: number): string[] {
  const palabras = texto.split(' ');
  const lineas: string[] = [];
  let actual = '';
  for (const p of palabras) {
    if ((actual + ' ' + p).trim().length > max && actual) { lineas.push(actual); actual = p; }
    else actual = (actual + ' ' + p).trim();
  }
  if (actual) lineas.push(actual);
  return lineas;
}

/* ------------------------------------------------------------------ */
/* Barras 3D: la geometría de las etiquetas se calcula, no se adivina  */
/* ------------------------------------------------------------------ */

type BarraIso = { name: string; value: number; label?: string; tone?: 'brand' | 'peach' | 'neutral' | 'slate'; hl?: boolean };

function BarrasIso({ id, isDark, items, max, W = 520, hMax = 150, unit = '', decimals = 0, caption }: {
  id: string; isDark: boolean; items: BarraIso[]; max: number; W?: number; hMax?: number; unit?: string; decimals?: number; caption?: string;
}) {
  const t = sceneTone(isDark);
  const n = items.length;
  const slot = W / n;
  const S = Math.min(34, slot / 3.2);
  const B = hMax + S / 2 + 36;
  const maxChars = Math.max(8, Math.floor(slot / 6.4));
  const fmt0 = (v: number) => v.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + unit;
  const maxLen = Math.max(...items.map((i) => (i.label ?? fmt0(i.value)).length));
  const fsValor = Math.min(20, S * 0.62, (slot * 0.92) / (maxLen * 0.6));
  const lineasMax = Math.max(...items.map((i) => envolver(i.name, maxChars).length));
  const H = B + S / 2 + 20 + lineasMax * 13 + (caption ? 26 : 8);
  const cara = (b: BarraIso): Faces => (b.tone === 'brand' || b.hl ? BRAND : b.tone === 'slate' ? SLATE(isDark) : b.tone === 'neutral' ? NEUTRAL(isDark) : PEACH);
  const fmt = (v: number) => v.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + unit;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" role="img" aria-label={items.map((i) => `${i.name}: ${i.label ?? fmt(i.value)}`).join('; ')}>
      <SceneDefs id={id} isDark={isDark} />
      <IsoFloor cx={W / 2} cy={B + 4} s={W / 2 - 6} fill={t.floor} />
      {items.map((b, i) => {
        const x = slot * (i + 0.5);
        const h = Math.max(6, (b.value / max) * hMax);
        const cy = B - h;
        return (
          <g key={b.name + i}>
            <motion.g initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 70, damping: 15 }} style={{ transformOrigin: `${x}px ${B}px` }}>
              {b.hl && <PulseDisc cx={x} cy={B + 2} rx={Math.min(slot * 0.42, 56)} ry={13} dur={2.2} peak={0.32} />}
              <Float amp={b.hl ? 5 : 1.5} dur={b.hl ? 2.3 : 4} delay={i * 0.2}>
                <g filter={`url(#${id}-sh)`}><IsoBox cx={x} cy={cy} s={S} h={h} f={cara(b)} /></g>
              </Float>
            </motion.g>
            <text x={x} y={cy - S / 2 - 10} textAnchor="middle" fontSize={fsValor} fontWeight={900} fill={b.hl ? ORANGE : t.text}>{b.label ?? fmt(b.value)}</text>
            {envolver(b.name, maxChars).map((l, k) => (
              <text key={k} x={x} y={B + S / 2 + 18 + k * 13} textAnchor="middle" fontSize={11} fontWeight={800} fill={b.hl ? ORANGE : t.muted}>{l}</text>
            ))}
          </g>
        );
      })}
      {caption && <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{caption}</text>}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Portada                                                          */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 600 220" className="w-full max-w-xl mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="tdp" isDark={isDark} />
        <IsoFloor cx={300} cy={168} s={280} fill={t.floor} />
        <PulseDisc cx={150} cy={170} rx={48} ry={15} dur={2.2} peak={0.3} />
        <Float amp={5} dur={2.4}><Persona id="tdp" cx={150} cy={168} s={1.3} body={BRAND} accessory="star" hair="#2b1a12" /></Float>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 90, damping: 13 }}>
            <Float amp={4} dur={1.8} delay={i * 0.18}><Orb id="tdp" cx={236 + i * 64} cy={150 + (i % 2) * 8} r={18 - i * 1.4} neutral={i > 2} /></Float>
          </motion.g>
        ))}
        <Traveler id="tdp" path={hop([190, 120], [500, 130], 36)} dur={2.2} repeatDelay={0.8} r={5} />
        <text x={300} y={212} textAnchor="middle" fontSize={12} fontWeight={800} fill={t.muted}>El primer estímulo que ves se convierte en tu guía</text>
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Dan Ariely · economía conductual</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Las trampas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">del deseo</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Somos <strong>previsiblemente irracionales</strong>: nos equivocamos siempre de la misma manera. Eso significa que los errores se pueden anticipar.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Origen: el dolor y la idea de racionalidad                       */
/* ------------------------------------------------------------------ */

function Origen({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const filas = [
    ['Capacidad racional', 'Cálculo perfecto del valor de cada opción.', 'Límites cognitivos, atajos y emociones.'],
    ['Cómo valoramos', 'Valor absoluto e independiente.', 'Valor relativo: puntos de referencia y contexto.'],
    ['Cuando nos equivocamos', 'El mercado nos corrige de inmediato.', 'El error se repite, de forma sistemática.'],
    ['De dónde sale la demanda', 'Preferencias estables, previas a la oferta.', 'Disposición a pagar manipulable por anclas.'],
  ];
  const [i, setI] = useState(0);
  const B = 188;
  return (
    <Shell isDark={isDark} title="Un accidente y una pregunta:" highlight="¿por qué nos equivocamos igual?" subtitle="A los 18 años, una bengala de magnesio le provocó a Ariely quemaduras de tercer grado en el 70% del cuerpo. Tres años de hospital le dieron la primera pregunta de su carrera.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-1">
            <svg viewBox="0 0 440 296" className="w-full h-full max-h-[320px] overflow-visible" role="img" aria-label="Dolor intenso y breve frente a dolor suave y prolongado (esquema ilustrativo)">
              <SceneDefs id="tdo" isDark={isDark} />
              <IsoFloor cx={220} cy={B + 6} s={210} fill={t.floor} />
              <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ type: 'spring', stiffness: 70, damping: 14 }} style={{ transformOrigin: `100px ${B}px` }}>
                <Float amp={3} dur={2.2}><g filter="url(#tdo-sh)"><IsoBox cx={100} cy={B - 110} s={28} h={110} f={BRAND} /></g></Float>
              </motion.g>
              <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 70, damping: 14 }} style={{ transformOrigin: `300px ${B}px` }}>
                <Float amp={3} dur={3}><g filter="url(#tdo-sh)"><IsoBox cx={300} cy={B - 38} s={86} h={38} f={PEACH} /></g></Float>
              </motion.g>
              <text x={100} y={B - 110 - 14 - 10} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>Dolor agudo</text>
              <text x={300} y={B - 38 - 43 - 10} textAnchor="middle" fontSize={12} fontWeight={900} fill={t.text}>Dolor suave</text>
              <text x={100} y={B + 70} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={ORANGE}>El tirón</text>
              <text x={100} y={B + 85} textAnchor="middle" fontSize={11} fill={t.muted}>intenso y breve</text>
              <text x={300} y={B + 70} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.text}>El retiro lento</text>
              <text x={300} y={B + 85} textAnchor="middle" fontSize={11} fill={t.muted}>suave y largo</text>
              <text x={220} y={292} textAnchor="middle" fontSize={11} fill={t.muted}>Esquema ilustrativo: alto = intensidad, ancho = duración</text>
            </svg>
            <p className={`text-xs text-center max-w-md ${textMuted(isDark)}`}>Las enfermeras creían que el tirón era mejor. Ariely mostró en Tel Aviv que el sufrimiento global era <strong>menor con menos intensidad y más duración</strong>.</p>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Por qué se equivocaban las enfermeras</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>No era falta de experiencia: <strong>años de práctica no corrigieron el sesgo</strong>. El tirón acortaba su propio sufrimiento al escuchar los gritos. Un error previsible, que se repite, y que ni la experiencia arregla.</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filas.map((f, k) => <Pill key={f[0]} isDark={isDark} on={k === i} onClick={() => setI(k)}>{f[0]}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Economía tradicional</p><p className={`text-sm leading-snug ${textMuted(isDark)}`}>{filas[i][1]}</p></div>
                <div className={`p-3.5 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>Economía conductual</p><p className={`text-sm leading-snug ${heading(isDark)}`}>{filas[i][2]}</p></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Relatividad: el señuelo de The Economist                         */
/* ------------------------------------------------------------------ */

function Relatividad({ isDark }: SlideProps) {
  const [conSenuelo, setConSenuelo] = useState(true);
  const con: BarraIso[] = [
    { name: 'Solo online US$59', value: 16, tone: 'peach' },
    { name: 'Solo impresa US$125 (señuelo)', value: 0.5, label: '0%', tone: 'neutral' },
    { name: 'Impresa + online US$125', value: 84, hl: true },
  ];
  const sin: BarraIso[] = [
    { name: 'Solo online US$59', value: 68, hl: true },
    { name: 'Impresa + online US$125', value: 32, tone: 'peach' },
  ];
  return (
    <Shell isDark={isDark} title="La verdad de la relatividad:" highlight="un señuelo que nadie elige" subtitle="No tenemos un medidor interno de valor: comparamos. Y si alguien controla con qué comparamos, controla lo que elegimos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[56%] min-h-0 flex flex-col items-center justify-center gap-3">
            <div className="w-full flex-1 min-h-0">
              <BarrasIso id="tdr" isDark={isDark} items={conSenuelo ? con : sin} max={100} unit="%" caption={conSenuelo ? 'Con tres opciones: gana la combinada' : 'Sin el señuelo: gana la más barata'} />
            </div>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={conSenuelo} onClick={() => setConSenuelo(true)}>Con señuelo</Pill>
              <Pill isDark={isDark} on={!conSenuelo} onClick={() => setConSenuelo(false)}>Sin señuelo</Pill>
            </div>
          </div>
          <div className="lg:w-[44%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={microLabel(isDark)}>Estudiantes de MIT Sloan · 100 en cada versión</p>
                <Sello isDark={isDark} tipo="disputa" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>La opción «solo impresa» <strong>no la elegía nadie</strong>. Pero hacía que «impresa + online» por el mismo precio pareciera una ganga. Al retirarla, las preferencias <strong>se invirtieron</strong>: de 84% a 32% para la combinada.</p>
            </div>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={microLabel(isDark)}>Por qué lleva el sello amarillo</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>El efecto existe, pero Frederick, Lee y Baskin (2014) mostraron que aparece sobre todo cuando las opciones se describen <strong>con números</strong> y se debilita cuando el producto se experimenta o tiene atributos perceptuales. No es una ley universal: es una herramienta con condiciones.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Señuelos en la vida real                                         */
/* ------------------------------------------------------------------ */

function Senuelos({ isDark }: SlideProps) {
  const casos = [
    {
      id: 'tv', n: 'Televisores', items: [{ name: 'Grundig 19" €210', value: 210, tone: 'peach' }, { name: 'Sony 26" €385', value: 385, hl: true }, { name: 'Samsung 32" €540', value: 540, tone: 'peach' }] as BarraIso[], max: 540, unit: '',
      texto: 'Entre tres televisores casi todos eligen el del medio: es más fácil decidir «entre dos extremos». El comerciante coloca en el centro el que quiere vender.',
    },
    {
      id: 'menu', n: 'Menú de restaurante', items: [{ name: 'Plato carísimo (nadie lo pide)', value: 100, label: '€€€', tone: 'neutral' }, { name: 'Segundo más caro', value: 70, label: '€€', hl: true }, { name: 'El resto del menú', value: 40, label: '€', tone: 'peach' }] as BarraIso[], max: 100, unit: '',
      texto: 'El consultor de menús Gregg Rapp descubrió que añadir un plato muy caro sube los ingresos aunque nadie lo pida: empuja a pedir el <strong>segundo</strong> más caro.',
    },
    {
      id: 'pan', n: 'Panificadora', items: [{ name: 'Modelo original US$275', value: 275, hl: true }, { name: 'Modelo grande, 50% más caro', value: 412.5, label: '+50%', tone: 'neutral' }] as BarraIso[], max: 412.5, unit: '',
      texto: 'Williams-Sonoma no vendía su panificadora de US$275. Lanzó un modelo más grande y 50% más caro y <strong>se disparó la venta del original</strong>: ya tenía con qué compararse.',
    },
    {
      id: 'casa', n: 'Casas', items: [{ name: 'A · contemporánea', value: 70, label: 'A', tone: 'peach' }, { name: 'B · clásica en buen estado', value: 70, label: 'B', hl: true }, { name: '−B · clásica con tejado a cambiar', value: 45, label: '−B', tone: 'neutral' }] as BarraIso[], max: 70, unit: '',
      texto: 'Con A, B y una versión inferior de B, los compradores descartan A y eligen B: es fácil comparar B con −B, y B gana limpiamente.',
    },
    {
      id: 'cara', n: 'Rostros', items: [{ name: 'Eligió al rostro con señuelo cerca', value: 75, hl: true }, { name: 'Eligió al otro', value: 25, tone: 'neutral' }] as BarraIso[], max: 100, unit: '%',
      texto: 'En 600 hojas con fotos de rostros, el 75% eligió al rostro normal cuya versión retocada (algo menos atractiva) estaba presente. Hasta la atracción es relativa.',
    },
  ];
  const [i, setI] = useState(0);
  const c = casos[i];
  return (
    <Shell isDark={isDark} title="Señuelos:" highlight="el truco funciona en todas partes" subtitle="Mismo mecanismo, cinco escenarios. En todos, la opción que importa no es la que se elige sino la que se coloca al lado.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
          {casos.map((x, k) => <Pill key={x.id} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.n}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[54%] min-h-0 flex items-center">
            <BarrasIso key={c.id} id={`tds${c.id}`} isDark={isDark} items={c.items} max={c.max} unit={c.unit} W={480} hMax={140} />
          </div>
          <div className="lg:w-[46%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={c.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{c.n}</p>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`} dangerouslySetInnerHTML={{ __html: c.texto }} />
              </motion.div>
            </AnimatePresence>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Alturas conceptuales en menú y casas; cifras reales en televisores, panificadora y rostros. En todos los casos el patrón es el de la diapositiva anterior, con sus mismas condiciones de validez.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 5. La comparación que envenena: los salarios                        */
/* ------------------------------------------------------------------ */

function Salarios({ isDark }: SlideProps) {
  const items: BarraIso[] = [
    { name: '1976', value: 36, tone: 'neutral', label: '36×' },
    { name: '1993, antes de publicarlos', value: 131, tone: 'peach', label: '131×' },
    { name: 'Tras hacerlos públicos', value: 369, hl: true, label: '369×' },
  ];
  return (
    <Shell isDark={isDark} title="Comparar sale caro:" highlight="la transparencia que subió los sueldos" subtitle="En 1993 EE. UU. obligó a publicar los sueldos de los ejecutivos para frenar los excesos. Cuántas veces ganaba un director general el sueldo de un trabajador medio, según el libro.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <BarrasIso id="tdsal" isDark={isDark} items={items} max={369} caption="Veces el sueldo del trabajador medio" />
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={microLabel(isDark)}>El efecto no buscado</p>
                <Sello isDark={isDark} tipo="noverif" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>La publicidad no frenó nada: cada ejecutivo empezó a <strong>compararse con sus pares</strong>, y las consultoras salariales usaron esos datos para pedir más. Es la comparación local, la que más duele.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La cita de H. L. Mencken</p>
              <p className={`text-sm italic leading-snug ${textMuted(isDark)}`}>Un hombre está satisfecho con su salario según gane más o menos que el marido de la hermana de su esposa. Una comparación cercana, visible, a mano.</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>El caso del libro:</strong> un médico de Harvard dejó la investigación del cáncer (US$160.000 al año) para asesorar inversiones en Wall Street tras enterarse de los yates de sus colegas. Multiplicó por diez sus ingresos y se fue para no sentirse «pobre» en términos relativos.</p>
            </div>
            <p className={`text-[11px] ${textMuted(isDark)}`}>Las cifras de proporción provienen del libro; no pude verificarlas de forma independiente.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Impronta y anclaje                                               */
/* ------------------------------------------------------------------ */

function Impronta({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [considera, setConsidera] = useState(true);
  const crias = [0, 1, 2, 3, 4];
  return (
    <Shell isDark={isDark} title="Impronta:" highlight="el primer objeto que ves se vuelve tu guía" subtitle="Konrad Lorenz observó que las crías de ganso se apegan al primer objeto en movimiento que ven al nacer. Lorenz se aseguró de ser ese objeto: las crías lo siguieron a todas partes.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[56%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 560 250" className="w-full h-full max-h-[270px] overflow-visible" role="img" aria-label="Las crías siguen al primer objeto sólo cuando se fija la impronta">
              <SceneDefs id="tdi" isDark={isDark} />
              <IsoFloor cx={280} cy={196} s={270} fill={t.floor} />
              <PulseDisc cx={110} cy={198} rx={46} ry={14} dur={2.2} peak={considera ? 0.34 : 0.1} />
              <Float amp={4} dur={2.6}><Persona id="tdi" cx={110} cy={196} s={1.25} body={BRAND} accessory="star" hair="#2b1a12" /></Float>
              <text x={110} y={238} textAnchor="middle" fontSize={12} fontWeight={900} fill={ORANGE}>El ancla (el primer precio)</text>
              {crias.map((i) => (
                <motion.g key={i} animate={{ x: considera ? 0 : (i % 2 ? 26 : -8) * (i + 1) * 0.5, y: considera ? 0 : (i % 2 ? -34 : 14) }} transition={{ type: 'spring', stiffness: 50, damping: 12, delay: i * 0.06 }}>
                  <Float amp={3} dur={1.8} delay={i * 0.2}><Orb id="tdi" cx={224 + i * 62} cy={186} r={17} neutral={!considera} /></Float>
                </motion.g>
              ))}
              {considera && <Traveler id="tdi" path={hop([140, 150], [500, 160], 38)} dur={2.2} repeatDelay={0.6} r={5} />}
              <text x={370} y={238} textAnchor="middle" fontSize={12} fontWeight={800} fill={considera ? ORANGE : t.muted}>{considera ? 'Tus decisiones siguientes lo siguen' : 'Lo viste, pero no te comprometiste: no se fija'}</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!considera} onClick={() => setConsidera(false)}>Solo viste el precio</Pill>
              <Pill isDark={isDark} on={considera} onClick={() => setConsidera(true)}>Consideraste comprarlo</Pill>
            </div>
          </div>
          <div className="lg:w-[44%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>El disparador, según el libro</p>
              <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>Un precio impreso en una etiqueta <strong>no se convierte en ancla por el solo hecho de verlo</strong>. Se fija cuando <strong>consideras comprar</strong> o haces una primera transacción a ese precio. Desde ahí, todo lo similar se valora en relación con él.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Por qué importa la primera decisión</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Es la que fija la norma para <strong>muchísimas decisiones futuras</strong>. Conviene evaluarla con un rigor proporcional a su efecto de largo plazo, no al monto de esa primera compra.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Un matiz de rigor:</strong> la condición de «considerar la compra» es la tesis del libro. Otros estudios de anclaje encuentran efectos incluso con anclas explícitas que solo se ven; no es una frontera tan nítida como aquí se presenta.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Coherencia arbitraria                                            */
/* ------------------------------------------------------------------ */

function Coherencia({ isDark }: SlideProps) {
  const productos = [
    { n: 'Teclado inalámbrico', v: [16.09, 26.82, 29.27, 34.55, 55.64], r: 0.52 },
    { n: 'Trackball inalámbrico', v: [8.64, 11.82, 13.45, 21.18, 26.18], r: 0.42 },
    { n: 'Hermitage 1996', v: [11.73, 22.45, 18.09, 24.55, 37.55], r: 0.33 },
    { n: 'Côtes du Rhône 1998', v: [8.64, 14.45, 12.55, 15.45, 27.91], r: 0.33 },
    { n: 'Chocolates Neuhaus', v: [9.55, 10.64, 12.45, 13.27, 20.64], r: 0.42 },
    { n: 'Libro de diseño', v: [12.82, 16.18, 15.82, 19.27, 30.0], r: 0.32 },
  ];
  const [i, setI] = useState(0);
  const p = productos[i];
  const veces = p.v[4] / p.v[0];
  const rangos = ['00–19', '20–39', '40–59', '60–79', '80–99'];
  const items: BarraIso[] = p.v.map((v, k) => ({ name: `Dígitos ${rangos[k]}`, value: v, tone: k === 4 ? 'brand' : 'peach', hl: k === 4, label: `US$${v.toFixed(2).replace('.', ',')}` }));
  return (
    <Shell isDark={isDark} title="Coherencia arbitraria:" highlight="un número al azar fijó el precio" subtitle="55 estudiantes de MIT Sloan anotaron los dos últimos dígitos de su número de Seguro Social, dijeron si pagarían esa cifra por seis productos y luego pujaron por ellos.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
          {productos.map((x, k) => <Pill key={x.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.n}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[56%] min-h-0 flex items-center">
            <BarrasIso key={p.n} id="tdc" isDark={isDark} items={items} max={60} caption={`Puja máxima por el ${p.n.toLowerCase()}, según sus dígitos`} />
          </div>
          <div className="lg:w-[44%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={microLabel(isDark)}>Quienes tenían dígitos altos pujaron</p>
                <Sello isDark={isDark} tipo="disputa" />
              </div>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{veces.toFixed(1).replace('.', ',')} veces</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>más que quienes tenían dígitos bajos, por el mismo producto (correlación {String(p.r).replace('.', ',')}).</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La parte «coherente»</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Todos pujaron más por el teclado que por el trackball y más por el Hermitage que por el Côtes du Rhône. El ancla era <strong>arbitraria</strong>, pero el orden relativo <strong>coherente</strong>. Quiere decir que los precios de mercado no reflejan un valor interno: reflejan nuestras anclas.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Sello amarillo:</strong> Fudenberg, Levine y Maniadis (2012) repitieron la manipulación y hallaron efectos <strong>mucho más débiles</strong> en bienes comunes y <strong>ninguno</strong> en loterías.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Anclas que persisten: tonos y Tom Sawyer                         */
/* ------------------------------------------------------------------ */

function Persisten({ isDark }: SlideProps) {
  const [tab, setTab] = useState<'tonos' | 'tom'>('tonos');
  const tonos: BarraIso[] = [
    { name: 'Ancla de 10¢: exigió', value: 33, label: '33¢', tone: 'peach' },
    { name: 'Ancla de 90¢: exigió', value: 73, label: '73¢', hl: true },
  ];
  const tom: BarraIso[] = [
    { name: 'Pagar · breve', value: 1, label: '$1', tone: 'peach' }, { name: 'Pagar · media', value: 2, label: '$2', tone: 'peach' }, { name: 'Pagar · larga', value: 3, label: '$3', tone: 'peach' },
    { name: 'Cobrar · breve', value: 1.3, label: '$1,30', tone: 'brand' }, { name: 'Cobrar · media', value: 2.7, label: '$2,70', tone: 'brand' }, { name: 'Cobrar · larga', value: 4.8, label: '$4,80', hl: true },
  ];
  return (
    <Shell isDark={isDark} title="Anclas que persisten:" highlight="el eco de la primera decisión" subtitle="Dos experimentos para ver cuánto dura un ancla y hasta dónde llega. En ambos, las personas valoran una experiencia desagradable o ambigua según su primera respuesta.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex gap-2 mb-3">
          <Pill isDark={isDark} on={tab === 'tonos'} onClick={() => setTab('tonos')}>Tonos molestos</Pill>
          <Pill isDark={isDark} on={tab === 'tom'} onClick={() => setTab('tom')}>Efecto Tom Sawyer</Pill>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[54%] min-h-0 flex items-center">
            <BarrasIso key={tab} id="tdp2" isDark={isDark} items={tab === 'tonos' ? tonos : tom} max={tab === 'tonos' ? 80 : 5} W={tab === 'tonos' ? 420 : 560} caption={tab === 'tonos' ? 'Pago mínimo para volver a escuchar el chillido' : 'Lo que cada grupo pagaría o exigiría por escuchar poesía'} />
          </div>
          <div className="lg:w-[46%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              {tab === 'tonos' ? (
                <motion.div key="t" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Tres fases</p><Sello isDark={isDark} tipo="noverif" /></div>
                    <ol className={`text-sm leading-snug space-y-1.5 ${textMuted(isDark)}`}>
                      <li><strong>1.</strong> Un chillido de 3.000 Hz. A un grupo se le preguntó por 10¢ y a otro por 90¢. Al pedirles su oferta real, los primeros exigieron 33¢ y los segundos <strong>73¢</strong>.</li>
                      <li><strong>2.</strong> Un ruido blanco, con la misma pregunta neutra de 50¢ para todos. El grupo de 10¢ siguió exigiendo menos.</li>
                      <li><strong>3.</strong> Un tono oscilante, con las anclas invertidas. Ganó la <strong>primera impronta</strong>.</li>
                    </ol>
                  </div>
                  <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                    <p className={microLabel(isDark)}>El experimento mental de la amnesia</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Si un impuesto duplicara la gasolina y la leche <em>y todos olvidaran los precios anteriores</em>, la demanda casi no cambiaría. Reaccionamos a la <strong>memoria de lo que pagamos</strong>, no a una preferencia interna.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="m" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>La valla de Tom Sawyer</p><Sello isDark={isDark} tipo="noverif" /></div>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Ariely leyó poemas de Walt Whitman en clase. A una mitad le preguntó si <strong>pagaría</strong> US$10 por escucharlos; a la otra, si <strong>aceptaría cobrar</strong> US$10. Luego, subasta real por lecturas breve, media y larga.</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                    <p className={microLabel(isDark)}>Lo que revela</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>La misma experiencia, ambigua, se vivió como <strong>un privilegio</strong> o como <strong>un castigo</strong> según la pregunta inicial. El que cobraba exigía hasta 60% más por la lectura larga.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Mover el ancla: perlas y Starbucks                               */
/* ------------------------------------------------------------------ */

function MoverAncla({ isDark }: SlideProps) {
  const [tab, setTab] = useState<'perlas' | 'cafe'>('perlas');
  const perlas: BarraIso[] = [
    { name: 'Perla gris, sin mercado', value: 18, label: 'sin precio', tone: 'neutral' },
    { name: 'En la vitrina de Harry Winston', value: 62, label: 'precio alto', tone: 'peach' },
    { name: 'Junto a diamantes y rubíes', value: 100, label: 'joya de lujo', hl: true },
  ];
  const cafe: BarraIso[] = [
    { name: 'El café de la esquina', value: 1, label: '≈ US$1', tone: 'neutral' },
    { name: 'Un «café algo mejor» en el mismo local', value: 3.5, label: 'US$3–4 → rechazado', tone: 'slate' },
    { name: 'Starbucks, con otra experiencia', value: 3.5, label: 'US$3–4 → aceptado', hl: true },
  ];
  const pasos = ['Prueban por curiosidad', 'Se dicen: «ya vine y me gustó»', 'Repiten: cola detrás de sí mismos', 'Suben el pedido con naturalidad'];
  return (
    <Shell isDark={isDark} title="Mover el ancla:" highlight="perlas negras y café caro" subtitle="Si el ancla manda, el negocio es cambiar el punto de comparación. Dos casos del libro, uno de lujo y uno cotidiano.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex gap-2 mb-3">
          <Pill isDark={isDark} on={tab === 'perlas'} onClick={() => setTab('perlas')}>Las perlas de Tahití</Pill>
          <Pill isDark={isDark} on={tab === 'cafe'} onClick={() => setTab('cafe')}>Starbucks y el autogregarismo</Pill>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center">
            <BarrasIso key={tab} id="tdm" isDark={isDark} items={tab === 'perlas' ? perlas : cafe} max={tab === 'perlas' ? 100 : 4} W={500} caption={tab === 'perlas' ? 'Valor percibido (esquema conceptual, sin cifras)' : 'Precio que el cliente acepta pagar'} />
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              {tab === 'perlas' ? (
                <motion.div key="p" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <p className={microLabel(isDark)}>Salvador Assael, 1973</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Las perlas de la ostra <em>Pinctada margaritifera</em>, del tamaño de una bala de mosquete y gris plomo, <strong>no tenían demanda</strong>. En vez de malvenderlas, esperó a tener ejemplares mejores y convenció al joyero <strong>Harry Winston</strong> de exhibirlas en la Quinta Avenida con un precio exorbitante.</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                    <p className={microLabel(isDark)}>El segundo golpe</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Anuncios a página completa en revistas de moda, con collares de perlas negras junto a <strong>diamantes, rubíes y esmeraldas</strong>. Las ancló al lujo máximo y creó un mercado de millones donde no había ninguno.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="c" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <p className={microLabel(isDark)}>Howard Schultz desconectó el ancla vieja</p>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>No ofreció «un café algo mejor»: lo habrían comparado con el de US$1 de la esquina. Cambió <strong>todo el entorno</strong>: ambiente europeo, aroma a grano tostado, repostería y nombres propios (<em>short, tall, grande, venti, macchiato, frappuccino</em>).</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                    <p className={microLabel(isDark)}>Autogregarismo: hacer cola detrás de uno mismo</p>
                    <ol className={`text-xs leading-snug space-y-0.5 ${textMuted(isDark)}`}>
                      {pasos.map((p, k) => <li key={p}><strong className="text-[#ff851d]">{k + 1}.</strong> {p}</li>)}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <p className={`text-[11px] ${textMuted(isDark)}`}>Ambos son <strong>casos de negocio</strong> narrados en el libro, no experimentos controlados: ilustran el mecanismo pero no lo prueban.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Auditoría de hábitos                                            */
/* ------------------------------------------------------------------ */

function Auditoria({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const preguntas = [
    ['Origen del hábito', '¿Cómo empezó? ¿Fue una elección analizada o la respuesta a una oferta o impulso inicial?'],
    ['Utilidad real', 'Si calculo hoy, ¿lo que obtengo justifica su costo actual en dinero y en tiempo?'],
    ['Auditar la primera decisión', 'Si lo viera por primera vez, sin recordar lo que he pagado, ¿aceptaría este precio?'],
    ['Costo de oportunidad', '¿Qué ahorro o proyecto de largo plazo estoy sacrificando por mantenerlo?'],
    ['Romper la memoria de precios', '¿Lo consumo por preferencia real o por inercia? ¿Qué pasaría si lo pauso un mes?'],
  ];
  const [on, setOn] = useState<boolean[]>([false, false, false, false, false]);
  const n = on.filter(Boolean).length;
  const B = 220;
  return (
    <Shell isDark={isDark} title="Audita tu propia cola:" highlight="cinco preguntas sobre un hábito" subtitle="Elige un gasto recurrente (un café, una suscripción, una marca) y respóndelas. Cada pregunta respondida enciende un cubo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[34%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 260 304" className="w-full h-full max-h-[310px] overflow-visible" role="img" aria-label={`${n} de 5 preguntas respondidas`}>
              <SceneDefs id="tda" isDark={isDark} />
              <IsoFloor cx={130} cy={B + 8} s={110} fill={t.floor} />
              {preguntas.map((_, k) => (
                <motion.g key={k} animate={{ opacity: on[k] ? 1 : 0.2, y: on[k] ? 0 : 6 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
                  <Float amp={on[k] ? 3 : 0} dur={2.2} delay={k * 0.15}>
                    <g filter="url(#tda-sh)"><IsoBox cx={130} cy={B - 30 - k * 30} s={44} h={24} f={on[k] ? (k === 4 ? BRAND : PEACH) : NEUTRAL(isDark)} /></g>
                  </Float>
                </motion.g>
              ))}
              {n === 5 && <PulseDisc cx={130} cy={B + 6} rx={70} ry={20} dur={1.8} peak={0.35} />}
              <text x={130} y={B + 54} textAnchor="middle" fontSize={22} fontWeight={900} fill={n === 5 ? ORANGE : t.text}>{n} / 5</text>
              <text x={130} y={B + 72} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>{n === 5 ? 'Auditoría completa' : 'preguntas respondidas'}</text>
            </svg>
          </div>
          <div className="lg:w-[66%] flex flex-col gap-2 justify-center">
            {preguntas.map(([a, b], k) => (
              <motion.button key={a} whileHover={{ x: 4 }} onClick={() => setOn(on.map((v, j) => (j === k ? !v : v)))} className={`text-left p-3 rounded-2xl flex items-start gap-3 ${on[k] ? featuredClass(isDark) : panelClass(isDark)}`}>
                <span className={`mt-0.5 shrink-0 ${on[k] ? 'text-[#ff851d]' : isDark ? 'text-gray-500' : 'text-gray-300'}`}>{on[k] ? <CheckCircle2 size={20} /> : <Circle size={20} />}</span>
                <span><span className={`block text-sm font-black ${heading(isDark)}`}>{a}</span><span className={`block text-xs leading-snug ${textMuted(isDark)}`}>{b}</span></span>
              </motion.button>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>Una vida sin examen no merece vivirse, decía Sócrates. <strong>El hábito costoso suele ser la acumulación de una primera decisión que nadie auditó.</strong></Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 11. El precio cero                                                  */
/* ------------------------------------------------------------------ */

function PrecioCero({ isDark }: SlideProps) {
  const [cero, setCero] = useState(false);
  const a: BarraIso[] = [{ name: 'Trufa Lindt · 15¢', value: 73, hl: true }, { name: 'Kiss de Hershey · 1¢', value: 27, tone: 'neutral' }];
  const b: BarraIso[] = [{ name: 'Trufa Lindt · 14¢', value: 31, tone: 'peach' }, { name: 'Kiss de Hershey · GRATIS', value: 69, hl: true }];
  return (
    <Shell isDark={isDark} title="El costo del costo cero:" highlight="gratis no es un descuento más" subtitle="Se bajó el precio de ambos chocolates en un centavo. La diferencia entre ellos no cambió. Las elecciones, sí.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center gap-3">
            <div className="w-full flex-1 min-h-0">
              <BarrasIso key={String(cero)} id="tdz" isDark={isDark} items={cero ? b : a} max={100} unit="%" W={440} caption={cero ? 'Con el Kiss gratis, ganó el Kiss' : 'Con precios bajos, ganó la calidad'} />
            </div>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!cero} onClick={() => setCero(false)}>15¢ y 1¢</Pill>
              <Pill isDark={isDark} on={cero} onClick={() => setCero(true)}>14¢ y gratis</Pill>
            </div>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={microLabel(isDark)}>Shampanier y Ariely</p>
                <Sello isDark={isDark} tipo="noverif" />
              </div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Según la lógica económica, restar la misma cantidad a los dos no debería cambiar la preferencia. Pero <strong>el Kiss pasó de 27% a 69%</strong> al llegar a cero: de elegir por valor a elegir por no pagar nada.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La explicación: miedo a perder</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Lo gratis <strong>no tiene riesgo visible</strong>: nada que perder y ninguna mala decisión posible. Eso es un detonante emocional, no un cálculo.</p>
            </div>
            <p className={`text-[11px] ${textMuted(isDark)}`}>No encontré una réplica independiente del experimento original; por eso el sello gris. No significa que sea falso, sino que conviene tratarlo como hipótesis bien respaldada y no como ley.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Casos del precio cero                                           */
/* ------------------------------------------------------------------ */

function CeroCasos({ isDark }: SlideProps) {
  const halloween: BarraIso[] = [{ name: 'Barra pequeña gratis', value: 70, hl: true }, { name: 'Barra grande por 1 Kiss', value: 30, tone: 'neutral' }];
  return (
    <Shell isDark={isDark} title="Gratis en la vida real:" highlight="niños, envíos y servidores caídos" subtitle="El mismo patrón, en cuatro escenarios distintos. En todos, llegar a cero cambió la conducta más de lo que cambia cualquier otro descuento.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="w-full flex-1 min-h-0">
              <BarrasIso id="tdh" isDark={isDark} items={halloween} max={100} unit="%" W={360} hMax={130} caption="Niños en Halloween" />
            </div>
            <p className={`text-xs text-center ${textMuted(isDark)}`}>Entregar <strong>1 Kiss</strong> por la barra grande (60 g) duplicaba el chocolate. El 70% prefirió la pequeña <strong>gratis</strong>.</p>
          </div>
          <div className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Amazon en Francia</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>El envío gratis disparó las ventas en todo el mundo, menos en Francia, donde cobraban <strong>1 franco</strong> (≈15 céntimos). Al pasar a <strong>cero</strong>, las ventas se igualaron al resto.</p>
            </div>
            <Cifra isDark={isDark} destacada n={69} sufijo="%" prefijo="+" titulo="AOL · usuarios conectados" lineas={['De 140.000 a 236.000 de un día para otro.', 'Con la tarifa plana de US$19,95 esperaban un alza de solo 5%.']} />
            <div className={`p-4 rounded-3xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El costo escondido de lo gratis</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Hacer una cola de 45 minutos por un helado gratis tiene un <strong>costo de oportunidad</strong> que «gratis» nos hace olvidar.</p>
            </div>
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Política pública</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Para masificar chequeos preventivos o vehículos eléctricos, <strong>bajar el costo no basta</strong>: llevarlo a cero genera una adopción masiva.</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>Antes de aceptar algo «gratis», pregúntate: <strong>¿lo elegiría si costara 1 centavo?</strong> Si la respuesta es no, el cero está decidiendo por ti.</Footer>
      </div>
    </Shell>
  );
}


/* ------------------------------------------------------------------ */
/* 13. Normas sociales y normas de mercado                             */
/* ------------------------------------------------------------------ */

function Normas({ isDark }: SlideProps) {
  const [vista, setVista] = useState<'dinero' | 'regalo'>('dinero');
  const dinero: BarraIso[] = [
    { name: 'Pago de US$5', value: 159, tone: 'peach' },
    { name: 'Pago de 50¢', value: 101, tone: 'neutral' },
    { name: 'Un favor, sin pago', value: 168, hl: true },
  ];
  const regalo: BarraIso[] = [
    { name: 'Regalo pequeño', value: 162, tone: 'peach' },
    { name: 'Regalo grande', value: 169, tone: 'peach' },
    { name: 'Un favor, sin pago', value: 168, hl: true },
  ];
  return (
    <Shell isDark={isDark} title="Dos mundos incompatibles:" highlight="el dinero apaga el favor" subtitle="Heyman y Ariely pidieron arrastrar círculos con el ratón durante cinco minutos. Lo único que cambió fue cómo se planteaba la petición.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[54%] min-h-0 flex flex-col items-center justify-center gap-3">
            <div className="w-full flex-1 min-h-0">
              <BarrasIso key={vista} id="tdn" isDark={isDark} items={vista === 'dinero' ? dinero : regalo} max={190} W={460} caption="Círculos arrastrados en 5 minutos" />
            </div>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={vista === 'dinero'} onClick={() => setVista('dinero')}>Pagos en dinero</Pill>
              <Pill isDark={isDark} on={vista === 'regalo'} onClick={() => setVista('regalo')}>Regalos</Pill>
            </div>
          </div>
          <div className="lg:w-[46%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Lo que muestran</p><Sello isDark={isDark} tipo="noverif" /></div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Con <strong>50 centavos</strong> se trabajó a medio gas; con <strong>cinco dólares</strong>, más; con <strong>un favor</strong>, más que con los cinco. Con regalos el esfuerzo se mantiene alto: no ofenden porque no ponen precio.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>El detalle que lo cambia todo</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Si al regalo se le <strong>menciona el precio</strong> («un Snickers de 50 centavos»), el esfuerzo cae al nivel del mercado. Basta nombrar el valor para pasar de un mundo al otro.</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Normas sociales:</strong> cálidas, sin cuenta corriente (ayudar a mover un sofá). <strong>Normas de mercado:</strong> frías, con precio y cálculo. Ofrecerle US$400 a la suegra por la cena de Acción de Gracias convierte una relación en una transacción.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 14. Cuando el dinero rompe el vínculo                               */
/* ------------------------------------------------------------------ */

function RompeVinculo({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [tab, setTab] = useState<'guarderia' | 'abogados' | 'dinero'>('guarderia');
  const guard: BarraIso[] = [
    { name: 'Sin multa', value: 30, label: 'pocos', tone: 'neutral' },
    { name: 'Con multa', value: 70, label: 'más', tone: 'brand' },
    { name: 'Multa retirada', value: 70, label: 'siguen altos', hl: true },
  ];
  const abog: BarraIso[] = [
    { name: 'US$30 la hora', value: 20, label: 'rechazaron', tone: 'neutral' },
    { name: 'Gratis', value: 90, label: 'aceptaron', hl: true },
  ];
  const din: BarraIso[] = [
    { name: 'Frases neutras', value: 3, label: '3 min', tone: 'peach' },
    { name: 'Frases sobre dinero', value: 5.5, label: '5,5 min', hl: true },
  ];
  const cfg = {
    guarderia: { items: guard, max: 100, cap: 'Retrasos de los padres (esquema cualitativo)', seal: 'disputa' as SelloTipo },
    abogados: { items: abog, max: 100, cap: 'Abogados de la AARP (esquema cualitativo)', seal: 'noverif' as SelloTipo },
    dinero: { items: din, max: 6, cap: 'Minutos antes de pedir ayuda en un rompecabezas', seal: 'disputa' as SelloTipo },
  }[tab];
  return (
    <Shell isDark={isDark} title="Cuando el dinero rompe el vínculo:" highlight="y cuesta volver" subtitle="Tres casos del libro donde introducir dinero en una relación social empeoró la conducta que se quería mejorar.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-2 mb-3">
          <Pill isDark={isDark} on={tab === 'guarderia'} onClick={() => setTab('guarderia')}>Guardería en Israel</Pill>
          <Pill isDark={isDark} on={tab === 'abogados'} onClick={() => setTab('abogados')}>Abogados de la AARP</Pill>
          <Pill isDark={isDark} on={tab === 'dinero'} onClick={() => setTab('dinero')}>Pensar en dinero</Pill>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex items-center">
            <BarrasIso key={tab} id="tdg" isDark={isDark} items={cfg.items} max={cfg.max} W={440} hMax={130} caption={cfg.cap} />
          </div>
          <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>{tab === 'guarderia' ? 'Gneezy y Rustichini' : tab === 'abogados' ? 'AARP, la asociación de jubilados de EE. UU.' : 'Vohs, Mead y Goode'}</p><Sello isDark={isDark} tipo={cfg.seal} /></div>
                  {tab === 'guarderia' && <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Una guardería israelí multó a los padres que llegaban tarde. Los retrasos <strong>aumentaron</strong>: la culpa social se convirtió en una tarifa, y pagar daba derecho a retrasarse. Al retirar la multa, <strong>no volvió la culpa</strong>.</p>}
                  {tab === 'abogados' && <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Se pidió a abogados atender a jubilados por <strong>US$30 la hora</strong>: dijeron que no, porque se activó la norma de mercado y era poco. Se les pidió hacerlo <strong>gratis</strong>: aceptaron en su mayoría, porque se activó la norma social.</p>}
                  {tab === 'dinero' && <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Descifrar frases sobre dinero («Cobra un salario elevado») volvió a las personas más <strong>autosuficientes</strong> (5,5 minutos antes de pedir ayuda, frente a 3) y <strong>menos dispuestas a ayudar</strong>, además de sentarse más lejos de los demás.</p>}
                </div>
                <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
                  <p className={microLabel(isDark)}>Estado de la evidencia</p>
                  {tab === 'guarderia' && <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Es un único estudio de campo. Una réplica por encuesta (Metcalf y colegas) <strong>no reprodujo el efecto</strong>: ahí las multas redujeron las conductas no deseadas. Y las fuentes de esta clase se contradicen sobre qué pasó tras retirar la multa (¿siguieron altos o aumentaron?). Aquí se usa la versión más prudente.</p>}
                  {tab === 'abogados' && <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Es una anécdota ilustrativa del libro. No encontré un estudio publicado ni una réplica, así que conviene leerla como un buen ejemplo y no como evidencia.</p>}
                  {tab === 'dinero' && <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Los efectos del <strong>primado del dinero</strong> se cuentan entre los que peor han resistido: cuatro experimentos grandes de Rohrer, Pashler y Harris no hallaron nada, y los metaanálisis detectan sesgos de publicación.</p>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 15. Frío y caliente                                                 */
/* ------------------------------------------------------------------ */

function CalienteFrio({ isDark }: SlideProps) {
  const casos = [
    { n: 'Llevarla a un buen restaurante', frio: 55, caliente: 70, pct: '+27%' },
    { n: 'Decirle «te amo» para tener más probabilidades', frio: 30, caliente: 51, pct: '+70%' },
    { n: 'Alentarla a beber', frio: 46, caliente: 63, pct: '+37%' },
    { n: 'Seguir insistiendo tras un «no»', frio: 20, caliente: 45, pct: '+125%' },
    { n: 'Darle una droga para tener sexo', frio: 5, caliente: 26, pct: '+420%' },
    { n: 'Usar siempre condón con una pareja nueva', frio: 88, caliente: 69, pct: '−22%' },
  ];
  const [i, setI] = useState(3);
  const c = casos[i];
  const items: BarraIso[] = [
    { name: 'Estado frío (predicción)', value: c.frio, label: String(c.frio), tone: 'neutral' },
    { name: 'Estado caliente', value: c.caliente, label: String(c.caliente), hl: true },
  ];
  return (
    <Shell isDark={isDark} title="Dr. Jekyll y Mr. Hyde:" highlight="no sabes cómo serás en caliente" subtitle="Ariely y Loewenstein midieron, en 25 estudiantes de Berkeley, qué creían que harían en frío y qué respondieron en un estado de excitación sexual. Escala de 0 a 100 en cada pregunta.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
          {casos.map((x, k) => <Pill key={x.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.pct}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <BarrasIso key={i} id="tdf" isDark={isDark} items={items} max={100} W={380} hMax={130} caption="Probabilidad que se atribuye (0 a 100)" />
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <div className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>La pregunta</p><Sello isDark={isDark} tipo="noverif" /></div>
              <p className={`text-base font-bold leading-snug ${heading(isDark)}`}>{c.n}</p>
              <p className={`text-sm mt-2 ${textMuted(isDark)}`}>En frío: <strong>{c.frio}</strong> · En caliente: <strong>{c.caliente}</strong> · Cambio: <strong className="text-[#ff851d]">{c.pct}</strong></p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La brecha de empatía</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>La persona en frío <strong>subestima por completo</strong> cuánto cambiará en caliente, y la experiencia no lo corrige. El hallazgo no es que seamos malos: es que <strong>no podemos predecirnos</strong> desde el otro estado.</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>Cautela:</strong> es una muestra de 25 estudiantes y no encontré una réplica. Además los titulares del libro (+72%, +136%) son <strong>promedios de preguntas muy distintas</strong>; lo veremos en «Lo que no cuadra».</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 16. Qué hacer con la brecha frío-caliente                           */
/* ------------------------------------------------------------------ */

function Jekyll({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [estado, setEstado] = useState<'frio' | 'caliente'>('frio');
  const hot = estado === 'caliente';
  const medidas = [
    ['Educación sexual', 'Las campañas de «simplemente di no» suponen que la razón ganará en caliente. Funciona mejor enseñar a <strong>evitar la tentación antes</strong> y garantizar acceso permanente a preservativos.'],
    ['Conducción juvenil', 'Un copiloto adolescente <strong>duplica</strong> el riesgo de accidente; dos o más lo <strong>cuadruplican</strong>. Propuesta: sistemas que limiten la velocidad o avisen a los padres ante maniobras erráticas.'],
    ['Dolor del parto', 'Sumergir las manos en agua helada dos minutos permitió a una pareja <strong>anticipar en frío</strong> que necesitaría la epidural, en vez de decidirlo en pleno parto.'],
  ];
  return (
    <Shell isDark={isDark} title="Diseñar para el Hyde que serás:" highlight="decide en frío" subtitle="Si no puedes predecirte en caliente, la solución no es más fuerza de voluntad: es tomar las decisiones importantes antes y quitarte la oportunidad de fallar.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[40%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 320 250" className="w-full h-full max-h-[270px] overflow-visible" role="img" aria-label="La misma persona en estado frío y en estado caliente">
              <SceneDefs id="tdj" isDark={isDark} />
              <IsoFloor cx={160} cy={188} s={150} fill={t.floor} />
              <PulseDisc cx={160} cy={190} rx={50} ry={16} dur={hot ? 1.1 : 2.8} peak={hot ? 0.45 : 0.15} color={hot ? PINK : '#94a3b8'} />
              <Float amp={hot ? 8 : 2} dur={hot ? 0.9 : 3.4}>
                <Persona id="tdj" cx={160} cy={188} s={1.35} body={hot ? BRAND : SLATE(isDark)} accessory={hot ? 'heart' : 'gear'} hair="#2b1a12" />
              </Float>
              <text x={160} y={238} textAnchor="middle" fontSize={13} fontWeight={900} fill={hot ? PINK : t.muted}>{hot ? 'Mr. Hyde · caliente' : 'Dr. Jekyll · frío'}</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!hot} onClick={() => setEstado('frio')}>Frío</Pill>
              <Pill isDark={isDark} on={hot} onClick={() => setEstado('caliente')}>Caliente</Pill>
            </div>
          </div>
          <div className="lg:w-[60%] flex flex-col gap-2.5 justify-center">
            {medidas.map(([a, b]) => (
              <div key={a} className={`p-3.5 rounded-2xl ${panelClass(isDark)}`}>
                <p className={`text-sm font-black ${heading(isDark)}`}>{a}</p>
                <p className={`text-xs leading-snug ${textMuted(isDark)}`} dangerouslySetInnerHTML={{ __html: b }} />
              </div>
            ))}
          </div>
        </div>
        <Footer isDark={isDark}>Sirve para ira, hambre o miedo, no solo para el deseo: <strong>el estado en que decides cambia a quien decide</strong>.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 17. Ahorro y autocontrol                                            */
/* ------------------------------------------------------------------ */

function Ahorro({ isDark }: SlideProps) {
  const items: BarraIso[] = [
    { name: 'EE. UU., 2006', value: 1, label: '−1%', tone: 'neutral', hl: true },
    { name: 'Europa', value: 20, tone: 'peach', label: '20%' },
    { name: 'Japón', value: 25, tone: 'peach', label: '25%' },
    { name: 'China', value: 50, tone: 'brand', label: '50%' },
  ];
  return (
    <Shell isDark={isDark} title="La crisis del ahorro:" highlight="gastar hoy, prometer mañana" subtitle="La desidia es un conflicto entre la gratificación inmediata y las metas de largo plazo. La tasa de ahorro de EE. UU. cayó de dos dígitos en los años ochenta a cifras negativas en 2006.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <BarrasIso id="tdv" isDark={isDark} items={items} max={50} W={440} caption="Tasa de ahorro personal, según el libro" />
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={6} titulo="Tarjetas por familia" lineas={['El promedio en EE. UU.']} />
              <Cifra isDark={isDark} destacada n={9000} prefijo="US$" titulo="Deuda promedio" lineas={['Hasta 10% de los casos, para comprar alimentos.']} />
            </div>
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>La herramienta: compromiso previo</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Decidir <strong>en frío</strong> para que el yo impulsivo no tenga opciones: descuentos automáticos del sueldo hacia fondos de inversión, citas médicas con penalización si no asistes, depósitos que se cobran por adelantado.</p>
            </div>
            <p className={`text-[11px] ${textMuted(isDark)}`}>Cifras de 2006 tomadas del libro; no las actualicé ni verifiqué. Sirven para ver el patrón, no la situación actual.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 18. Fechas límite: el estudio retractado                            */
/* ------------------------------------------------------------------ */

function Fechas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [vista, setVista] = useState<'libro' | 'hoy'>('hoy');
  const libro: BarraIso[] = [
    { name: 'Fechas impuestas (semanas 4, 8 y 12)', value: 90, label: 'mejor', hl: true },
    { name: 'Fechas que cada uno elige', value: 62, label: 'intermedio', tone: 'peach' },
    { name: 'Sin fechas, todo al final', value: 35, label: 'peor', tone: 'neutral' },
  ];
  const hoy: BarraIso[] = [
    { name: 'Fechas impuestas', value: 88.76, label: '88,76', hl: true },
    { name: 'Fechas elegidas, notas originales', value: 85.67, label: '85,67', tone: 'neutral' },
  ];
  return (
    <Shell isDark={isDark} title="El estudio de las fechas límite:" highlight="retractado en septiembre de 2026" subtitle="Es la evidencia central del capítulo sobre desidia. Hace pocas semanas, los análisis de Data Colada llevaron a retractar el artículo completo. Esto es lo que se sabe.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] min-h-0 flex flex-col items-center justify-center gap-3">
            <div className="w-full flex-1 min-h-0">
              <BarrasIso key={vista} id="tdt" isDark={isDark} items={vista === 'libro' ? libro : hoy} max={vista === 'libro' ? 100 : 100} W={420} hMax={130} caption={vista === 'libro' ? 'Lo que contaba el libro (esquema cualitativo)' : 'Notas medias, Estudio 1, según Data Colada'} />
            </div>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={vista === 'libro'} onClick={() => setVista('libro')}>Lo que decía el libro</Pill>
              <Pill isDark={isDark} on={vista === 'hoy'} onClick={() => setVista('hoy')}>Lo que se descubrió</Pill>
            </div>
          </div>
          <div className="lg:w-[56%] flex flex-col gap-2.5 justify-center">
            <div className={`p-4 rounded-3xl ${isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50'}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Ariely y Wertenbroch, 2002</p><Sello isDark={isDark} tipo="retractado" /></div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}><strong>Estudio 1 (clases del MIT):</strong> las notas de <strong>13 estudiantes</strong> del grupo que elegía sus fechas fueron alteradas tras el envío, a favor de quienes espaciaron sus entregas. Recalculadas, ese grupo rindió <strong>peor</strong>.</p>
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Estudio 2 (corrección de textos, 60 personas)</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Efecto implausible (d = 2,5) y <strong>18 de 20 participantes con un «gemelo»</strong> de datos idéntico. Data Colada lo califica de manipulado o fabricado.</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>Lo que sigue en pie y lo que no</p>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}>La comparación principal (88,76 frente a 85,67) parece sobrevivir, pero <strong>el artículo entero está retractado</strong> desde el 2 de septiembre de 2026, a petición de su coautor Klaus Wertenbroch. Ariely dijo que los datos «no son confiables».</p>
            </div>
          </div>
        </div>
        <Footer isDark={isDark}>La idea de <strong>comprometerse de antemano</strong> es razonable y tiene otros respaldos. Pero <strong>este experimento ya no puede usarse como prueba</strong>.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 19. Efecto de dotación                                              */
/* ------------------------------------------------------------------ */

function Dotacion({ isDark }: SlideProps) {
  const items: BarraIso[] = [
    { name: 'Compradores: ofrecían', value: 170, label: 'US$170', tone: 'neutral' },
    { name: 'Dueños: exigían', value: 2400, label: 'US$2.400', hl: true },
  ];
  const sesgos = [
    ['Nos enamoramos de lo que tenemos', 'Poseer algo lo carga de historia y de afecto.'],
    ['Miramos lo que perderemos', 'La aversión a la pérdida pesa más que la ganancia equivalente.'],
    ['Creemos que el comprador ve lo mismo', 'Asumimos que el otro comparte nuestros recuerdos con el objeto.'],
  ];
  return (
    <Shell isDark={isDark} title="El alto precio de la propiedad:" highlight="lo mío vale catorce veces más" subtitle="Carmon y Ariely estudiaron a estudiantes de Duke que acampaban días para entrar al sorteo de entradas a las finales de baloncesto. Después, quienes ganaron y quienes no, fijaron un precio.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex items-center">
            <BarrasIso id="tdd" isDark={isDark} items={items} max={2400} W={400} caption="Precio medio por la misma entrada" />
          </div>
          <div className="lg:w-[52%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Una brecha de 14,1 veces</p><Sello isDark={isDark} tipo="solido" /></div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Exactamente la misma entrada: para quien no la tenía valía <strong>US$170</strong>; para quien la ganó, <strong>US$2.400</strong>. Nada en el objeto cambió, solo quién lo posee.</p>
            </div>
            <div className="flex flex-col gap-2">
              {sesgos.map(([a, b], k) => (
                <div key={a} className={`p-3 rounded-2xl ${panelClass(isDark)}`}>
                  <p className={`text-sm font-black ${heading(isDark)}`}><span className="text-[#ff851d]">{k + 1}.</span> {a}</p>
                  <p className={`text-xs ${textMuted(isDark)}`}>{b}</p>
                </div>
              ))}
            </div>
            <p className={`text-[11px] ${textMuted(isDark)}`}>El efecto de dotación se replica ampliamente, incluso en estudios recientes con miles de adultos. Lo excepcional aquí es la <strong>magnitud</strong> (×14): suele ser bastante menor.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 20. Mantener las puertas abiertas (mini-juego)                      */
/* ------------------------------------------------------------------ */

function Puertas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const TOTAL = 100;
  const LIM = 12;
  const SALAS = [
    { n: 'roja', puerta: '#ef375c', oscura: '#a3173a', claro: '#fde2e4', oscuro: '#3a2226' },
    { n: 'azul', puerta: '#3b82f6', oscura: '#1d4ed8', claro: '#e3f0ff', oscuro: '#1f2a3a' },
    { n: 'verde', puerta: '#10b981', oscura: '#047857', claro: '#e1f5e8', oscuro: '#1e3328' },
  ];
  const mezclar = () => [3, 5, 7].sort(() => Math.random() - 0.5);

  const [medias, setMedias] = useState<number[]>(mezclar);
  const [sala, setSala] = useState(0);
  const [cuentas, setCuentas] = useState<number[]>([0, 0, 0]);
  const [clics, setClics] = useState(0);
  const [dinero, setDinero] = useState(0);
  const [cambios, setCambios] = useState(0);
  const [pops, setPops] = useState<{ id: number; v: number }[]>([]);
  const popId = React.useRef(0);

  const vivas = cuentas.map((c) => c < LIM);
  const fin = clics >= TOTAL;
  const mejor = Math.max(...medias);
  const idxMejor = medias.indexOf(mejor);
  const perdido = Math.round(cambios * (medias.reduce((a, b) => a + b, 0) / 3));

  const avanzar = (destino: number, gana: number) => {
    setClics((n) => n + 1);
    setDinero((d) => d + gana);
    setSala(destino);
    setCuentas((cs) => cs.map((c, j) => (j === destino ? 0 : c >= LIM ? c : c + 1)));
  };
  const ganar = () => {
    if (fin) return;
    const v = Math.max(0, medias[sala] + Math.floor(Math.random() * 5) - 2);
    const id = ++popId.current;
    setPops((p) => [...p, { id, v }]);
    window.setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 800);
    avanzar(sala, v);
  };
  const ir = (d: number) => {
    if (fin || !vivas[d] || d === sala) return;
    setCambios((n) => n + 1);
    avanzar(d, 0);
  };
  const reiniciar = () => {
    setMedias(mezclar());
    setSala(0);
    setCuentas([0, 0, 0]);
    setClics(0);
    setDinero(0);
    setCambios(0);
    setPops([]);
  };

  // Geometría fija: las tres puertas nunca cambian de lugar, así no se vuelven a crear.
  const XS = [110, 280, 450];
  const PISO = 196;
  const W = 84;
  const H = 118;
  const muro = isDark ? SALAS[sala].oscuro : SALAS[sala].claro;
  const pasillo = isDark ? '#262626' : '#eef1f5';
  const marco = isDark ? '#4b5563' : '#cbd5e1';
  const transicion = 'transform .4s cubic-bezier(.3,1.2,.4,1), opacity .35s ease';

  const renderPuerta = (idx: number) => {
    const x = XS[idx];
    const c = cuentas[idx];
    const viva = vivas[idx];
    const actual = idx === sala;
    const peligro = viva && !actual && c >= LIM - 3;
    const k = actual ? 1 : viva ? 1 - (c / LIM) * 0.58 : 0.2;
    const s = SALAS[idx];
    const puedeIr = viva && !actual && !fin;
    return (
      <g key={idx}>
        {/* Rótulos: no se encogen con la puerta */}
        <text x={x} y={28} textAnchor="middle" fontSize={13} fontWeight={900} fill={viva ? (actual ? s.puerta : t.text) : t.muted} style={{ transition: 'fill .3s' }}>Sala {s.n}</text>
        <text x={x} y={44} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={!viva ? t.muted : peligro ? PINK : t.muted} style={{ transition: 'fill .3s' }}>
          {!viva ? 'cerrada para siempre' : actual ? 'estás aquí' : `se cierra en ${LIM - c} clic${LIM - c === 1 ? '' : 's'}`}
        </text>
        {viva && !actual && Array.from({ length: LIM }, (_, i) => (
          <circle key={i} cx={x - 33 + i * 6} cy={55} r={2.2} fill={i < LIM - c ? (peligro ? PINK : ORANGE) : (isDark ? '#3a3a3a' : '#d7dce3')} style={{ transition: 'fill .3s' }} />
        ))}

        <g
          role="button"
          tabIndex={puedeIr ? 0 : -1}
          aria-label={`Ir a la sala ${s.n}`}
          onClick={() => ir(idx)}
          onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') ir(idx); }}
          style={{ transform: `scale(${k})`, transformOrigin: `${x}px ${PISO}px`, opacity: viva ? 1 : 0, transition: transicion, cursor: puedeIr ? 'pointer' : 'default', outline: 'none' }}
        >
          <ellipse cx={x} cy={PISO + 2} rx={W / 2 + 12} ry={6} fill="#000" opacity={0.14} />
          <rect x={x - W / 2 - 8} y={PISO - H - 8} width={W + 16} height={H + 8} rx={12} fill={marco} />
          {actual ? (
            <g>
              {/* Puerta abierta: vano con luz y la hoja abierta en perspectiva */}
              <rect x={x - W / 2} y={PISO - H} width={W} height={H} rx={8} fill={isDark ? '#111' : '#3b2f2f'} />
              <rect x={x - W / 2 + 6} y={PISO - H + 6} width={W - 12} height={H - 6} rx={5} fill="#fde68a" opacity={0.9} />
              <polygon points={`${x - W / 2 + 6},${PISO} ${x + W / 2 - 6},${PISO} ${x + W / 2 + 14},${PISO + 7} ${x - W / 2 - 6},${PISO + 7}`} fill="#fde68a" opacity={0.5} />
              <polygon points={`${x - W / 2},${PISO} ${x - W / 2},${PISO - H} ${x - W / 2 - 26},${PISO - H + 12} ${x - W / 2 - 26},${PISO - 10}`} fill={s.puerta} />
              <polygon points={`${x - W / 2},${PISO} ${x - W / 2},${PISO - H} ${x - W / 2 - 26},${PISO - H + 12} ${x - W / 2 - 26},${PISO - 10}`} fill="#000" opacity={0.18} />
              <circle cx={x - W / 2 - 8} cy={PISO - H * 0.45} r={3} fill="#fcd34d" />
            </g>
          ) : (
            <g>
              <path d={`M ${x - W / 2} ${PISO} V ${PISO - H + 26} Q ${x - W / 2} ${PISO - H} ${x - W / 2 + 26} ${PISO - H} H ${x + W / 2 - 26} Q ${x + W / 2} ${PISO - H} ${x + W / 2} ${PISO - H + 26} V ${PISO} Z`} fill={s.puerta} />
              <path d={`M ${x} ${PISO} V ${PISO - H} H ${x + W / 2 - 26} Q ${x + W / 2} ${PISO - H} ${x + W / 2} ${PISO - H + 26} V ${PISO} Z`} fill="#000" opacity={0.14} />
              <rect x={x - W / 2 + 14} y={PISO - H + 26} width={W - 28} height={H * 0.32} rx={7} fill="#fff" opacity={0.2} />
              <rect x={x - W / 2 + 14} y={PISO - H * 0.52} width={W - 28} height={H * 0.4} rx={7} fill="#fff" opacity={0.2} />
              <circle cx={x + W / 2 - 14} cy={PISO - H * 0.46} r={6.5} fill="#fcd34d" />
              <circle cx={x + W / 2 - 16} cy={PISO - H * 0.46 - 2} r={2} fill="#fff" opacity={0.75} />
            </g>
          )}
        </g>
      </g>
    );
  };

  return (
    <Shell isDark={isDark} title="Mantener las puertas abiertas:" highlight="el juego que te hace perder" subtitle="Shin y Ariely: tres salas, tres puertas. Dentro de una sala, cada clic en la moneda paga. Cambiar de sala cuesta un clic y no paga nada. Y una puerta que no visitas en 12 clics se cierra para siempre.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[60%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="w-full flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1"><span className={textMuted(isDark)}>Clics usados</span><span className={heading(isDark)}>{clics} / {TOTAL}</span></div>
                <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c]" style={{ width: `${(clics / TOTAL) * 100}%`, transition: 'width .2s' }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={microLabel(isDark)}>Ganado</p>
                <p className="text-2xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{dinero}¢</p>
              </div>
            </div>

            <svg viewBox="0 0 560 384" className="w-full flex-1 min-h-0 overflow-visible" role="img" aria-label="Un pasillo con tres puertas y la sala actual con una moneda que paga al hacer clic">
              <SceneDefs id="tdu" isDark={isDark} />
              {/* Pasillo con las tres puertas */}
              <rect x={20} y={8} width={520} height={210} rx={16} fill={pasillo} />
              <rect x={20} y={PISO} width={520} height={22} rx={0} fill="#000" opacity={0.07} />
              {[0, 1, 2].map(renderPuerta)}

              {/* La sala donde estás */}
              <rect x={20} y={232} width={520} height={144} rx={16} fill={muro} style={{ transition: 'fill .45s ease' }} />
              <text x={280} y={256} textAnchor="middle" fontSize={14} fontWeight={900} fill={SALAS[sala].puerta} style={{ transition: 'fill .3s' }}>Estás en la sala {SALAS[sala].n}</text>
              <g onClick={ganar} style={{ cursor: fin ? 'default' : 'pointer', outline: 'none' }} role="button" tabIndex={0} aria-label="Hacer clic para ganar dinero" onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') ganar(); }}>
                <ellipse cx={280} cy={338} rx={44} ry={9} fill="#000" opacity={0.12} />
                <Float amp={fin ? 0 : 4} dur={2}>
                  <Orb id="tdu" cx={280} cy={302} r={34} />
                  <text x={280} y={316} textAnchor="middle" fontSize={34} fontWeight={900} fill="#fff" style={{ pointerEvents: 'none' }}>¢</text>
                </Float>
                <AnimatePresence>
                  {pops.map((p) => (
                    <motion.text key={p.id} x={280} y={270} textAnchor="middle" fontSize={20} fontWeight={900} fill={ORANGE} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -26 }} transition={{ duration: 0.75 }} style={{ pointerEvents: 'none' }}>+{p.v}¢</motion.text>
                  ))}
                </AnimatePresence>
              </g>
              <text x={280} y={364} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{fin ? 'Se acabaron los clics' : 'Haz clic en la moneda para ganar'}</text>
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Pill isDark={isDark} on={false} onClick={reiniciar}>Reiniciar el juego</Pill>
              <span className={`px-3 py-1.5 text-xs font-bold ${textMuted(isDark)}`}>Cambios de sala: {cambios}</span>
            </div>
          </div>

          <div className="lg:w-[40%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              {fin ? (
                <motion.div key="fin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Tu resultado</p>
                  <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Ganaste <strong>{dinero}¢</strong>. Dedicaste <strong>{cambios} de tus 100 clics</strong> a cambiar de sala: clics que no pagaron nada, unos <strong>{perdido}¢</strong> que dejaste de ganar. Cada sala pagaba en promedio: roja <strong>{medias[0]}¢</strong>, azul <strong>{medias[1]}¢</strong>, verde <strong>{medias[2]}¢</strong> por clic; la mejor era la <strong>{SALAS[idxMejor].n}</strong>. {cambios === 0 ? 'No cambiaste nunca: ganaste lo que da la sala donde empezaste, sin saber si había otra mejor.' : 'Explorar tiene sentido; correr para que no se cierren las puertas, no.'}</p>
                </motion.div>
              ) : (
                <motion.div key="reglas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                  <p className={microLabel(isDark)}>Cómo se juega</p>
                  <ol className={`text-sm leading-snug space-y-1 ${textMuted(isDark)}`}>
                    <li><strong>1.</strong> Tienes <strong>100 clics</strong>.</li>
                    <li><strong>2.</strong> Dentro de la sala (puerta abierta), la <strong>moneda</strong> paga; cada sala paga distinto y no sabes cuánto.</li>
                    <li><strong>3.</strong> Clicar otra <strong>puerta</strong> te cambia de sala, pero <strong>ese clic no paga</strong>.</li>
                    <li><strong>4.</strong> Los puntitos bajo cada puerta cuentan los clics que le quedan: a los 12 sin visitarla, se cierra para siempre.</li>
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Lo que pasó en el experimento</p><Sello isDark={isDark} tipo="noverif" /></div>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Las personas saltaban de sala en sala para que no se cerraran las puertas y ganaban <strong>cerca de un 15% menos</strong> que quienes se quedaban en una. Lo hacían aunque cambiar costara dinero, y aunque las salas pudieran «reencarnar».</p>
            </div>
            <p className={`text-[11px] ${textMuted(isDark)}`}>El juego de arriba es una simulación mía del mecanismo, con pagos al azar: no reproduce el experimento original.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 21. Expectativas                                                    */
/* ------------------------------------------------------------------ */

function Expectativas({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [sabe, setSabe] = useState(false);
  const casos = [
    { id: 'cerveza', n: 'Cerveza con vinagre balsámico', sello: 'noverif' as SelloTipo, texto: 'En el bar del MIT, la mayoría prefirió la cerveza con unas gotas de vinagre cuando <strong>no sabía</strong> qué llevaba, o cuando se lo decían <strong>después</strong> de probarla. Si se lo contaban <strong>antes</strong>, la rechazaban de plano.', medidor: 'Agrado al probarla', sin: 82, con: 16, etiqueta: 'Lleva vinagre balsámico' },
    { id: 'cola', n: 'Coca-Cola y Pepsi en el escáner', sello: 'noverif' as SelloTipo, texto: 'A ciegas no había preferencia clara. Al mostrar la marca <strong>antes</strong> del sorbo se activaba además la corteza prefrontal dorsolateral, ligada a la memoria de marca, con más actividad en el centro del placer.', medidor: 'Actividad en el centro del placer', sin: 45, con: 86, etiqueta: 'Marca visible: Coca-Cola' },
    { id: 'vejez', n: 'Priming de la vejez', sello: 'noreplico' as SelloTipo, texto: 'Estudiantes que armaron frases con palabras de vejez caminaron más despacio al salir. <strong>No resistió la réplica:</strong> con sensores y un experimentador que desconocía la hipótesis, el efecto desapareció.', medidor: 'Velocidad al caminar (lo que se afirmaba)', sin: 80, con: 42, etiqueta: 'Palabras: Florida, canas, arrugas' },
  ];
  const [i, setI] = useState(0);
  const c = casos[i];
  const valor = sabe ? c.con : c.sin;
  const bueno = valor >= 50;
  const colorMed = bueno ? '#10b981' : PINK;

  const Vaso = ({ x, color, espuma = true }: { x: number; color: string; espuma?: boolean }) => (
    <g>
      <path d={`M ${x + 38} 128 h 14 a 14 14 0 0 1 14 14 v 18 a 14 14 0 0 1 -14 14 h -14 v -10 h 12 a 4 4 0 0 0 4 -4 v -18 a 4 4 0 0 0 -4 -4 h -12 Z`} fill={color} opacity={0.9} />
      <g filter="url(#tde-sh)"><Cylinder cx={x} cy={118} rx={38} ry={11} h={56} top={color} side={color} /></g>
      {espuma && <ellipse cx={x} cy={118} rx={38} ry={11} fill="#fff" opacity={0.92} />}
    </g>
  );

  return (
    <Shell isDark={isDark} title="Las expectativas:" highlight="saborear lo que esperas saborear" subtitle="Lo que sabes antes de probar cambia lo que sientes al probar. No es «engañarse»: el conocimiento previo reconfigura la percepción.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
          {casos.map((x, k) => <Pill key={x.n} isDark={isDark} on={k === i} onClick={() => setI(k)}>{x.n}</Pill>)}
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 400 300" className="w-full h-full max-h-[320px] overflow-visible" role="img" aria-label={`${c.medidor}: ${valor}%`}>
              <SceneDefs id="tde" isDark={isDark} />
              <IsoFloor cx={150} cy={156} s={108} fill={t.floor} />

              {/* El producto */}
              <AnimatePresence mode="wait">
                <motion.g key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  {c.id === 'cerveza' && <Vaso x={140} color={sabe ? '#7a4a2a' : '#f2b84b'} />}
                  {c.id === 'cola' && (<g><Vaso x={90} color="#c41e3d" espuma={false} /><Vaso x={198} color="#2563eb" espuma={false} /></g>)}
                  {c.id === 'vejez' && (<Float amp={sabe ? 1 : 4} dur={sabe ? 2.8 : 0.8}><Persona id="tde" cx={150} cy={176} s={1.2} body={sabe ? SLATE(isDark) : BRAND} accessory="gear" hair={sabe ? '#9ca3af' : '#2b1a12'} /></Float>)}
                </motion.g>
              </AnimatePresence>

              {/* La información previa, como una etiqueta que se «pega» al producto */}
              <motion.g initial={false} animate={{ opacity: sabe ? 1 : 0.9, y: sabe ? 0 : -4 }} transition={{ type: 'spring', stiffness: 100, damping: 14 }}>
                <rect x={250} y={64} width={140} height={52} rx={14} fill={sabe ? (isDark ? '#3a2024' : '#ffe4e8') : (isDark ? '#2a2a2a' : '#eef1f5')} />
                <polygon points="250,104 238,112 250,114" fill={sabe ? (isDark ? '#3a2024' : '#ffe4e8') : (isDark ? '#2a2a2a' : '#eef1f5')} />
                <text x={320} y={85} textAnchor="middle" fontSize={10} fontWeight={800} fill={t.muted}>{sabe ? 'LO QUE TE DICEN' : 'LO QUE SABES'}</text>
                <text x={320} y={104} textAnchor="middle" fontSize={sabe ? 10.5 : 24} fontWeight={900} fill={sabe ? PINK : t.muted}>{sabe ? c.etiqueta : '?'}</text>
              </motion.g>

              {/* El medidor */}
              <text x={30} y={226} fontSize={12} fontWeight={900} fill={t.text}>{c.medidor}</text>
              <rect x={30} y={236} width={340} height={18} rx={9} fill={isDark ? '#2f2f2f' : '#e5e7eb'} />
              <motion.rect x={30} y={236} height={18} rx={9} fill={colorMed} initial={false} animate={{ width: (valor / 100) * 340 }} transition={{ type: 'spring', stiffness: 60, damping: 14 }} />
              <text x={30} y={278} fontSize={11} fontWeight={800} fill={t.muted}>bajo</text>
              <text x={370} y={278} textAnchor="end" fontSize={11} fontWeight={800} fill={t.muted}>alto</text>
              <motion.text key={`${c.id}-${sabe}`} x={200} y={278} textAnchor="middle" fontSize={13} fontWeight={900} fill={colorMed} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>{valor >= 50 ? 'Se disfruta' : 'Se rechaza'}</motion.text>
              {c.id === 'vejez' && <g><rect x={28} y={20} width={156} height={26} rx={13} fill={isDark ? '#3a2418' : '#ffedd5'} /><text x={106} y={37} textAnchor="middle" fontSize={11} fontWeight={900} fill="#c2410c">NO REPLICÓ</text></g>}
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={!sabe} onClick={() => setSabe(false)}>Sin información previa</Pill>
              <Pill isDark={isDark} on={sabe} onClick={() => setSabe(true)}>Con información previa</Pill>
            </div>
            <p className={`text-[11px] text-center max-w-sm ${textMuted(isDark)}`}>El medidor es un esquema cualitativo: muestra el sentido del efecto, no cifras del estudio.</p>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={c.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>{c.n}</p><Sello isDark={isDark} tipo={c.sello} /></div>
                <p className={`text-base leading-relaxed ${textMuted(isDark)}`} dangerouslySetInnerHTML={{ __html: c.texto }} />
              </motion.div>
            </AnimatePresence>
            <p className={`text-xs ${textMuted(isDark)}`}>Esto conecta con la clase de Kahneman: el priming social que sirvió de ejemplo aquí es de lo que peor ha envejecido.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 22. El poder del precio                                             */
/* ------------------------------------------------------------------ */

function Placebo({ isDark }: SlideProps) {
  const [tab, setTab] = useState<'vela' | 'sobe'>('vela');
  const vela: BarraIso[] = [
    { name: 'Cápsula a US$2,50', value: 100, hl: true, label: '≈100%' },
    { name: 'Cápsula a US$0,10', value: 50, tone: 'neutral', label: '50%' },
  ];
  const sobe: BarraIso[] = [
    { name: 'Bebida a precio normal', value: 9, hl: true, label: '9' },
    { name: 'La misma, con descuento', value: 6.5, tone: 'neutral', label: '6,5' },
  ];
  return (
    <Shell isDark={isDark} title="El poder del precio:" highlight="lo caro funciona mejor" subtitle="Si el precio fija la expectativa, y la expectativa cambia la experiencia, entonces el precio cambia el resultado. Incluso cuando el producto es exactamente el mismo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex gap-2 mb-3">
          <Pill isDark={isDark} on={tab === 'vela'} onClick={() => setTab('vela')}>El analgésico «Veladona»</Pill>
          <Pill isDark={isDark} on={tab === 'sobe'} onClick={() => setTab('sobe')}>La bebida energética</Pill>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex items-center">
            <BarrasIso key={tab} id="tdw" isDark={isDark} items={tab === 'vela' ? vela : sobe} max={tab === 'vela' ? 100 : 10} W={400} caption={tab === 'vela' ? 'Participantes que sintieron alivio del dolor' : 'Rompecabezas de palabras resueltos'} />
          </div>
          <div className="lg:w-[50%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>{tab === 'vela' ? 'Waber, Shiv, Carmon y Ariely' : 'SoBe Adrenaline Rush'}</p><Sello isDark={isDark} tipo="noverif" /></div>
              {tab === 'vela'
                ? <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Descargas eléctricas a participantes tras tomar una cápsula que era <strong>vitamina C</strong> presentada como analgésico. A US$2,50 casi todos sintieron alivio; a <strong>US$0,10 (precio de oferta), solo la mitad</strong>.</p>
                : <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Quienes compraron la bebida con descuento resolvieron <strong>6,5</strong> rompecabezas frente a <strong>9</strong> de quienes pagaron el precio normal: un <strong>28% menos</strong>, por la baja expectativa que genera lo rebajado.</p>}
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La lección práctica</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Un precio bajo puede <strong>restarle eficacia</strong> a lo que vendes, no solo ingresos. Sirve para quien fija precios y para quien juzga calidad por precio.</p>
            </div>
            <p className={`text-[11px] ${textMuted(isDark)}`}>No encontré una réplica independiente; trátalo como hipótesis con respaldo experimental, no como regla.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 23. Honestidad: matrices, mandamientos, fichas                      */
/* ------------------------------------------------------------------ */

function Honestidad({ isDark }: SlideProps) {
  const [tab, setTab] = useState<'mand' | 'fichas'>('mand');
  const mand: BarraIso[] = [
    { name: 'Estudio original (2008): matrices menos con recordatorio moral', value: 1.45, label: '−1,45', hl: true },
    { name: 'Réplica de 19 laboratorios (2018)', value: 0.11, label: '+0,11', tone: 'neutral' },
  ];
  const fichas: BarraIso[] = [
    { name: 'Con dinero en efectivo', value: 2.7, label: '+2,7', tone: 'neutral' },
    { name: 'Con fichas canjeables', value: 5.9, label: '+5,9', hl: true },
  ];
  return (
    <Shell isDark={isDark} title="Pequeñas trampas:" highlight="hasta donde me deja mi conciencia" subtitle="Casi nadie comete un gran fraude. Casi todos hacemos pequeñas trampas hasta el límite en que podemos seguir viéndonos como personas honestas.">
      <div className="h-full flex flex-col min-h-0">
        <div className="shrink-0 flex gap-2 mb-3">
          <Pill isDark={isDark} on={tab === 'mand'} onClick={() => setTab('mand')}>Los Diez Mandamientos</Pill>
          <Pill isDark={isDark} on={tab === 'fichas'} onClick={() => setTab('fichas')}>Fichas y refrigerador</Pill>
        </div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex items-center">
            <BarrasIso key={tab} id="tdh2" isDark={isDark} items={tab === 'mand' ? mand : fichas} max={tab === 'mand' ? 1.6 : 6.5} W={400} caption={tab === 'mand' ? 'Diferencia de matrices «resueltas» entre grupos' : 'Aciertos falsos de más sobre el grupo sin oportunidad de trampa'} />
          </div>
          <div className="lg:w-[54%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              {tab === 'mand' ? (
                <motion.div key="m" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Mazar, Amir y Ariely</p><Sello isDark={isDark} tipo="noreplico" /></div>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Una prueba de 20 matrices, pagada por acierto, con la opción de destruir la hoja y reportar solo el número. Recordar los <strong>Diez Mandamientos</strong>, o firmar un código de honor, <strong>eliminaba la trampa</strong>. Subir la probabilidad de ser descubierto no la aumentaba: no hacemos un simple cálculo costo-beneficio.</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#2a1a1e]' : 'bg-rose-50'}`}>
                    <p className={microLabel(isDark)}>Pero no replicó</p>
                    <p className={`text-xs leading-snug ${textMuted(isDark)}`}>Un informe de replicación preregistrado (Verschuere y colegas, 2018) con <strong>25 réplicas y 5.786 participantes</strong> no halló efecto. En el análisis principal (19 réplicas, 4.674 personas) el recordatorio moral dio <strong>0,11 matrices más</strong>, con intervalo de −0,09 a 0,31: en dirección contraria al original (−1,45).</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="f" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3">
                  <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
                    <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Una moneda que no parece dinero</p><Sello isDark={isDark} tipo="noverif" /></div>
                    <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Pagar con <strong>fichas de póquer</strong> canjeables segundos después en la misma sala <strong>más que duplicó</strong> la trampa (×2,2). Y 24 de 150 alumnos hicieron trampa máxima. Un paso de distancia del dinero basta para soltar el freno moral.</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
                    <p className={microLabel(isDark)}>El refrigerador del MIT (informal)</p>
                    <p className={`text-xs leading-snug ${textMuted(isDark)}`}>En refrigeradores comunes se dejaron <strong>6 latas de Coca-Cola</strong> y platos con <strong>6 billetes de US$1</strong>. Las latas desaparecieron en 72 horas; los billetes, intactos. Es una demostración llamativa, pero no un experimento controlado.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <p className={`text-[11px] ${textMuted(isDark)}`}>Las cifras de la prueba de matrices en nuestras fuentes (32,6 y 36,1) son imposibles con 20 matrices; ver «Lo que no cuadra».</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 24. Cervezas y chollos                                              */
/* ------------------------------------------------------------------ */

function Cerveza({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [voz, setVoz] = useState(true);
  const cuerpos: Faces[] = [BRAND, PEACH, SLATE(isDark), NEUTRAL(isDark)];
  const accs: Accessory[] = ['tie', 'heart', 'gear', 'headset'];
  const pelos = ['#2b1a12', '#7a3e1d', '#4a4a4a', '#5a2d14'];
  return (
    <Shell isDark={isDark} title="Cervezas y la necesidad de ser único:" highlight="pedir en voz alta cuesta placer" subtitle="Ariely y Levav ofrecieron muestras gratis de cuatro cervezas a mesas de clientes de la Carolina Brewery. Cambió solo la forma de pedir.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 480 250" className="w-full h-full max-h-[270px] overflow-visible" role="img" aria-label="Cuatro personas en una mesa pidiendo cerveza">
              <SceneDefs id="tdb" isDark={isDark} />
              <IsoFloor cx={240} cy={186} s={230} fill={t.floor} />
              {[0, 1, 2, 3].map((i) => {
                const x = 80 + i * 107;
                const alegre = !voz || i === 0;
                return (
                  <g key={i}>
                    <PulseDisc cx={x} cy={188} rx={40} ry={12} dur={2.4} delay={i * 0.3} peak={alegre ? 0.3 : 0.08} color={alegre ? ORANGE : '#94a3b8'} />
                    <Float amp={alegre ? 4 : 1} dur={2.4} delay={i * 0.25}>
                      <Persona id="tdb" cx={x} cy={186} s={1.0} body={alegre ? cuerpos[i] : NEUTRAL(isDark)} accessory={accs[i]} hair={pelos[i]} />
                    </Float>
                    <text x={x} y={222} textAnchor="middle" fontSize={11} fontWeight={800} fill={alegre ? ORANGE : t.muted}>{voz ? `${i + 1}.º en pedir` : `Cliente ${i + 1}`}</text>
                  </g>
                );
              })}
              {voz && <Traveler id="tdb" path={hop([100, 118], [400, 118], 40)} dur={2.4} repeatDelay={0.8} r={5} color={PINK} />}
              <text x={240} y={246} textAnchor="middle" fontSize={12} fontWeight={900} fill={voz ? PINK : ORANGE}>{voz ? 'Pedir en voz alta, uno tras otro' : 'Pedir en privado, en un papel'}</text>
            </svg>
            <div className="flex gap-2">
              <Pill isDark={isDark} on={voz} onClick={() => setVoz(true)}>En voz alta</Pill>
              <Pill isDark={isDark} on={!voz} onClick={() => setVoz(false)}>En privado</Pill>
            </div>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-3 justify-center">
            <div className={`p-4 rounded-3xl ${featuredClass(isDark)}`}>
              <div className="flex items-center justify-between gap-2 mb-1"><p className={microLabel(isDark)}>Lo que ocurrió</p><Sello isDark={isDark} tipo="noverif" /></div>
              {voz
                ? <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Al pedir en voz alta <strong>aumentó la variedad</strong> en la mesa: cada uno evitaba repetir al anterior para parecer distinto. Pero quienes pidieron <strong>2.º, 3.º y 4.º</strong> disfrutaron menos su cerveza y se arrepintieron más.</p>
                : <p className={`text-sm leading-snug ${textMuted(isDark)}`}>Al elegir en privado, en un menú escrito, cada cliente pidió <strong>lo que de verdad prefería</strong> y la satisfacción con la bebida fue la mejor.</p>}
            </div>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>La necesidad de singularidad</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>En grupo sacrificamos el placer personal por proyectar una imagen. Lo aplicable: en una reunión, <strong>pide las opiniones por escrito antes de hablar</strong>. Es el mismo remedio del efecto halo.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 25. El semáforo de la evidencia                                     */
/* ------------------------------------------------------------------ */

const HALLAZGOS: { n: string; tipo: SelloTipo; why: string }[] = [
  { n: 'Efecto de dotación', tipo: 'solido', why: 'Se replica ampliamente; lo excepcional es la magnitud de ×14.' },
  { n: 'Anclaje con anclas explícitas', tipo: 'solido', why: 'Replica bien en los proyectos Many Labs. Distinto del ancla arbitraria con números de Seguro Social.' },
  { n: 'Efecto señuelo', tipo: 'disputa', why: 'Existe, pero se debilita cuando el producto se experimenta y no solo se describe con números.' },
  { n: 'Coherencia arbitraria (Seguro Social)', tipo: 'disputa', why: 'Efectos mucho más débiles en bienes comunes y nulos en loterías al repetirse.' },
  { n: 'Multa en la guardería', tipo: 'disputa', why: 'Un único estudio de campo; una réplica por encuesta obtuvo lo contrario.' },
  { n: 'Primado del dinero', tipo: 'disputa', why: 'Cuatro experimentos grandes no hallaron nada; sesgos de publicación detectados.' },
  { n: 'Diez Mandamientos y código de honor', tipo: 'noreplico', why: 'Replicación preregistrada: 25 réplicas, 5.786 personas, sin efecto.' },
  { n: 'Priming de la vejez', tipo: 'noreplico', why: 'Con sensores y experimentador a ciegas, el efecto desaparece.' },
  { n: 'Fechas límite del MIT (2002)', tipo: 'retractado', why: 'Artículo retractado el 2 de septiembre de 2026: notas alteradas y datos con anomalías.' },
  { n: 'Precio cero', tipo: 'noverif', why: 'No encontré réplica independiente.' },
  { n: 'Placebo del precio (Veladona, SoBe)', tipo: 'noverif', why: 'No encontré réplica independiente.' },
  { n: 'Frío y caliente (Berkeley)', tipo: 'noverif', why: 'Muestra de 25 personas y sin réplica verificada.' },
  { n: 'Juego de las puertas', tipo: 'noverif', why: 'No encontré réplica independiente.' },
  { n: 'Tonos molestos y Tom Sawyer', tipo: 'noverif', why: 'No encontré réplica independiente.' },
  { n: 'Normas sociales y de mercado (círculos)', tipo: 'noverif', why: 'La idea es plausible; el experimento concreto no tiene réplica verificada.' },
  { n: 'Cerveza con vinagre / Carolina Brewery', tipo: 'noverif', why: 'No encontré réplica independiente.' },
];

function Evidencia({ isDark }: SlideProps) {
  const t = sceneTone(isDark);
  const [filtro, setFiltro] = useState<SelloTipo | 'todos'>('todos');
  const tipos: SelloTipo[] = ['solido', 'disputa', 'noreplico', 'retractado', 'noverif'];
  const cuenta = (tp: SelloTipo) => HALLAZGOS.filter((h) => h.tipo === tp).length;
  const lista = HALLAZGOS.filter((h) => filtro === 'todos' || h.tipo === filtro);
  const caras: Record<SelloTipo, Faces> = { solido: { top: '#34d399', left: '#10b981', right: '#059669' }, disputa: { top: '#fcd34d', left: '#f59e0b', right: '#d97706' }, noreplico: BRAND, retractado: { top: '#fb7185', left: '#e11d48', right: '#9f1239' }, noverif: NEUTRAL(isDark) };
  const B = 188;
  return (
    <Shell isDark={isDark} title="El semáforo de la evidencia:" highlight="qué sobrevivió y qué no" subtitle="Dieciséis hallazgos del libro, con su estado actual. Filtra por categoría. Es la diapositiva más importante de la clase.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[38%] min-h-0 flex flex-col items-center justify-center gap-2">
            <svg viewBox="0 0 330 250" className="w-full h-full max-h-[260px] overflow-visible" role="img" aria-label="Cantidad de hallazgos por estado de la evidencia">
              <SceneDefs id="tdx" isDark={isDark} />
              <IsoFloor cx={165} cy={B + 6} s={160} fill={t.floor} />
              {tipos.map((tp, k) => {
                const x = 40 + k * 62;
                const h = Math.max(10, cuenta(tp) * 13);
                const on = filtro === tp || filtro === 'todos';
                return (
                  <Lift key={tp} on={filtro === tp} dimmed={!on} onClick={() => setFiltro(filtro === tp ? 'todos' : tp)} lift={9}>
                    <motion.g initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: k * 0.08, type: 'spring', stiffness: 70, damping: 14 }} style={{ transformOrigin: `${x}px ${B}px` }}>
                      <g filter="url(#tdx-sh)"><IsoBox cx={x} cy={B - h} s={22} h={h} f={caras[tp]} /></g>
                    </motion.g>
                    <text x={x} y={B - h - 11 - 10} textAnchor="middle" fontSize={15} fontWeight={900} fill={t.text}>{cuenta(tp)}</text>
                  </Lift>
                );
              })}
              <text x={165} y={B + 38} textAnchor="middle" fontSize={11} fontWeight={800} fill={t.muted}>Sólido · Disputa · No replicó · Retractado · Sin verificar</text>
            </svg>
          </div>
          <div className="lg:w-[62%] flex flex-col gap-2 min-h-0">
            <div className="shrink-0 flex flex-wrap gap-1.5">
              <Pill isDark={isDark} on={filtro === 'todos'} onClick={() => setFiltro('todos')}>Todos</Pill>
              {tipos.map((tp) => <Pill key={tp} isDark={isDark} on={filtro === tp} onClick={() => setFiltro(tp)}>{SELLOS[tp].texto}</Pill>)}
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1 flex flex-col gap-1.5">
              {lista.map((h) => (
                <motion.div key={h.n} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`p-2.5 rounded-2xl flex items-start gap-3 ${panelClass(isDark)}`}>
                  <div className="flex-1 min-w-0"><p className={`text-sm font-black ${heading(isDark)}`}>{h.n}</p><p className={`text-xs leading-snug ${textMuted(isDark)}`}>{h.why}</p></div>
                  <Sello isDark={isDark} tipo={h.tipo} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 26. El autor bajo escrutinio                                        */
/* ------------------------------------------------------------------ */

function Autor({ isDark }: SlideProps) {
  const hitos = [
    { f: '2012', t: 'Firmar al inicio del formulario', d: 'Artículo de PNAS sobre honestidad (Shu, Mazar, Gino, Ariely y Bazerman). No está en el libro, pero comparte línea de investigación con los experimentos de honestidad.' },
    { f: 'Ago. 2021', t: 'Data Colada: datos fabricados', d: 'Un estudio de campo con aseguradoras tenía lecturas de odómetro duplicadas y alteradas. PNAS retractó el artículo. Los autores negaron haber fabricado los datos; el archivo lo había creado y modificado por última vez Ariely, el único con acceso previo.' },
    { f: '2024', t: 'Informe de Duke', d: 'Ariely afirma que Duke no halló pruebas de que falseara datos, aunque debió haber hecho más. Duke no lo confirmó públicamente.' },
    { f: 'Jul.–Sep. 2026', t: 'Fechas límite del MIT', d: 'Su coautor Wertenbroch pidió la retractación el 23 de julio. Data Colada publicó sus análisis el 31 de agosto y el artículo se retractó el 2 de septiembre. Ariely dijo que los datos «no son confiables» y que no sabe cómo ocurrió.' },
  ];
  const [i, setI] = useState(3);
  return (
    <Shell isDark={isDark} title="El autor bajo escrutinio:" highlight="qué se sabe y qué no" subtitle="Una clase honesta sobre este libro tiene que decirlo. Estos son hechos documentados; no hay ninguna conclusión sobre intenciones, que nadie ha probado.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[44%] flex flex-col gap-2 justify-center">
            {hitos.map((h, k) => (
              <motion.button key={h.f} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left p-3 rounded-2xl ${k === i ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30' : isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white shadow-md shadow-gray-200/70 text-gray-700'}`}>
                <p className="text-xs font-black opacity-80">{h.f}</p>
                <p className="text-sm font-black">{h.t}</p>
              </motion.button>
            ))}
          </div>
          <div className="lg:w-[56%] flex flex-col gap-3 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={`p-5 rounded-3xl ${featuredClass(isDark)}`}>
                <p className={microLabel(isDark)}>{hitos[i].f}</p>
                <h3 className={`text-lg font-black mb-1 ${heading(isDark)}`}>{hitos[i].t}</h3>
                <p className={`text-sm leading-relaxed ${textMuted(isDark)}`}>{hitos[i].d}</p>
              </motion.div>
            </AnimatePresence>
            <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}>
              <p className={microLabel(isDark)}>Qué NO se concluye</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>No se concluye que <strong>toda la economía conductual sea falsa</strong>: sus ideas centrales vienen de muchos autores (Kahneman, Tversky, Thaler) y de resultados replicados. Tampoco que cada experimento de este libro esté afectado: por eso cada uno lleva su propio sello.</p>
            </div>
            <div className={`p-3.5 rounded-2xl ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
              <p className={`text-xs leading-snug ${textMuted(isDark)}`}><strong>El método:</strong> separar la idea de la persona. Se evalúa cada hallazgo por sus réplicas independientes, no por la fama o la credibilidad de quien lo cuenta, ni a favor ni en contra.</p>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 27. Lo que no cuadra                                                */
/* ------------------------------------------------------------------ */

function Cuadran({ isDark }: SlideProps) {
  const items = [
    { id: 'ssn', n: '«216% a 346% superiores»', dice: 'Los de dígitos altos pujaron «entre un 216% y un 346% superiores».', cuenta: '26,18 ÷ 8,64 = 3,03 · 55,64 ÷ 16,09 = 3,46 · 20,64 ÷ 9,55 = 2,16', veredicto: 'Son 2,2 a 3,5 veces, es decir, de 116% a 246% más. «216%–346%» es el cociente, no el aumento.' },
    { id: 'matr', n: 'Matrices «resueltas»', dice: 'Control: 32,6 aciertos. Con trampa: 36,1. Con mandamientos: 3,0.', cuenta: 'La prueba tiene 20 matrices', veredicto: 'Es imposible acertar 32,6 de 20. Casi seguro son 3,26 y 3,61 con el decimal corrido. Las cifras de nuestras fuentes no son confiables.' },
    { id: 'berk', n: 'Los titulares de Berkeley', dice: 'La excitación aumentó 72% lo «inusual» y 136% lo «inmoral».', cuenta: '72 = promedio de 19 preguntas · 136 = promedio de 5 (27, 70, 37, 125, 420)', veredicto: 'Son promedios de preguntas dispares. El 136% lo arrastra un solo +420%; la mediana es 70% y sin ese dato el promedio baja a 65%.' },
    { id: 'guard', n: 'Tras retirar la multa', dice: 'Una fuente: «los retrasos aumentaron aún más». Otra: «no volvió la culpa».', cuenta: 'Dos versiones del mismo resultado', veredicto: 'Las fuentes se contradicen. Usamos la más prudente: los retrasos siguieron altos.' },
    { id: 'aol', n: 'AOL: ¿5% o 69%?', dice: 'Esperaban +5% de demanda con la tarifa plana.', cuenta: '(236.000 − 140.000) ÷ 140.000 = +68,6%', veredicto: 'No hay error: es el contraste. Lo previsto fue 5% y ocurrió casi 14 veces más.' },
    { id: 'fechas', n: 'Fechas límite del MIT', dice: 'El libro lo presenta como un hecho: impuestas > elegidas > sin fechas.', cuenta: 'Artículo retractado el 2/9/2026', veredicto: 'Las notas del grupo que elegía fueron alteradas. Ya no es una evidencia utilizable.' },
  ];
  const [i, setI] = useState(0);
  const it = items[i];
  return (
    <Shell isDark={isDark} title="Lo que no cuadra:" highlight="rehaciendo las cuentas del libro" subtitle="Al integrar los números de las cuatro fuentes aparecieron imprecisiones. Es el mismo ejercicio que pide Ariely: no creerle a una cifra solo porque suena bien.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[34%] flex flex-col gap-1.5 justify-center">
            {items.map((x, k) => (
              <motion.button key={x.id} whileHover={{ x: 4 }} onMouseEnter={() => setI(k)} onClick={() => setI(k)} className={`text-left px-3 py-2 rounded-2xl text-sm font-bold ${k === i ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white shadow-lg shadow-red-500/30' : isDark ? 'bg-[#2a2a2a] text-gray-300' : 'bg-white shadow-md shadow-gray-200/70 text-gray-700'}`}>
                <span className="opacity-70 mr-1.5">{k + 1}.</span>{x.n}
              </motion.button>
            ))}
          </div>
          <div className="lg:w-[66%] flex flex-col gap-2.5 justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={it.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-2.5">
                <div className={`p-4 rounded-2xl ${panelClass(isDark)}`}><p className={microLabel(isDark)}>Lo que dice la fuente</p><p className={`text-sm leading-snug ${textMuted(isDark)}`}>{it.dice}</p></div>
                <div className={`p-4 rounded-2xl ${featuredClass(isDark)}`}><p className={microLabel(isDark)}>La cuenta</p><p className={`text-base font-black leading-snug ${heading(isDark)}`}>{it.cuenta}</p></div>
                <div className={`p-4 rounded-2xl flex items-start gap-2 ${isDark ? 'bg-[#2a2418]' : 'bg-amber-50'}`}>
                  <AlertTriangle size={17} className="text-amber-500 shrink-0 mt-0.5" />
                  <div><p className={microLabel(isDark)}>Veredicto</p><p className={`text-sm font-bold leading-snug ${heading(isDark)}`}>{it.veredicto}</p></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Footer isDark={isDark}>Un error de decimal no invalida una idea. Pero <strong>la forma de detectarlo es la misma que usarías con una oferta «imperdible»</strong>: hacer la cuenta.</Footer>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* 28. Síntesis                                                        */
/* ------------------------------------------------------------------ */

function Sintesis({ isDark }: SlideProps) {
  const chips = ['No tienes un medidor interno de valor', 'El primer precio se vuelve tu ancla', 'Cero no es un descuento: es una emoción', 'Un favor puede valer más que un pago', 'No te conoces en caliente: decide en frío', 'Comprométete antes de la tentación', 'Lo tuyo vale más porque es tuyo', 'Hacemos trampas pequeñas', 'Pide réplicas, y haz la cuenta'];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 400 150" className="w-full max-w-sm mb-2 z-10 overflow-visible" aria-hidden="true">
        <SceneDefs id="tdy" isDark={isDark} />
        <PulseDisc cx={140} cy={128} rx={44} ry={14} dur={2.2} peak={0.3} />
        <Float amp={6} dur={2.3}><Persona id="tdy" cx={140} cy={126} s={1.05} body={BRAND} accessory="star" hair="#2b1a12" /></Float>
        {[0, 1, 2].map((i) => <Float key={i} amp={4} dur={1.9} delay={i * 0.25}><Orb id="tdy" cx={230 + i * 50} cy={112 + (i % 2) * 6} r={16 - i * 2} neutral={i === 2} /></Float>)}
        <Traveler id="tdy" path={hop([166, 86], [330, 100], 30)} dur={2} repeatDelay={0.8} r={5} />
      </svg>
      <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Síntesis</p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-3xl md:text-5xl font-black mb-5 leading-tight tracking-tighter z-10 max-w-4xl ${heading(isDark)}`}>
        Previsiblemente irracionales: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">y por eso, corregibles</span>
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 max-w-4xl mb-5 z-10">
        {chips.map((c) => (
          <span key={c} className={`flex items-center gap-2 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-[#1e1e1e] text-gray-300 shadow-lg shadow-black/40' : 'bg-white text-gray-700 shadow-md shadow-gray-200'}`}>
            <CheckCircle2 size={14} className="text-[#ff851d]" /> {c}
          </span>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={`max-w-3xl text-base md:text-xl font-medium leading-relaxed z-10 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
        Si el error es previsible, <strong>se puede diseñar el entorno para evitarlo</strong>. Y lo mismo vale para las ideas: no te fíes de un resultado famoso, mira si alguien lo repitió.
      </motion.p>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Tests                                                               */
/* ------------------------------------------------------------------ */

const TD_BASICO: QuizQ[] = [
  {
    q: 'En el experimento de The Economist, nadie eligió la opción «solo impresa» por US$125. ¿Para qué servía?',
    options: ['Como señuelo: hacía que «impresa + online» por el mismo precio pareciera una ganga', 'Para subir el precio promedio de las suscripciones', 'Para que los estudiantes compararan con otra revista', 'Era un error de impresión del formulario'],
    answer: 0,
    why: 'Es el efecto señuelo: una opción asimétricamente dominada. Al quitarla, la preferencia por la combinada cayó de 84% a 32%.',
  },
  {
    q: '¿Qué muestra el experimento de los dos últimos dígitos del Seguro Social?',
    options: ['Que una cifra arbitraria puede condicionar cuánto se está dispuesto a pagar', 'Que quienes tienen números altos son más ricos', 'Que las subastas son injustas', 'Que los estudiantes de MIT eran irracionales por ser jóvenes'],
    answer: 0,
    why: 'Es la coherencia arbitraria: el ancla es arbitraria, pero una vez fijada las valoraciones se ordenan de forma coherente. Con la salvedad de que las réplicas hallan efectos más débiles.',
  },
  {
    q: 'Entre una trufa Lindt a 15¢ y un Kiss a 1¢, el 73% eligió la Lindt. Al bajar ambos 1¢ (14¢ y gratis), ¿qué pasó?',
    options: ['El 69% eligió el Kiss gratis', 'No cambió nada: la diferencia relativa era la misma', 'La mayoría siguió eligiendo la Lindt', 'Nadie eligió el Kiss'],
    answer: 0,
    why: 'Llegar a cero cambió la lógica: «gratis» elimina el riesgo visible de perder y se vuelve un detonante emocional, no un cálculo.',
  },
  {
    q: 'Si una guardería multa a los padres que llegan tarde, según el estudio de Gneezy y Rustichini…',
    options: ['Los retrasos aumentaron, porque la multa convirtió la culpa en una tarifa', 'Los retrasos desaparecieron', 'Los padres se sintieron más culpables', 'No hubo ningún cambio'],
    answer: 0,
    why: 'La norma social (culpa ante las maestras) fue reemplazada por una norma de mercado (pagar por llegar tarde). Y al retirar la multa, la culpa no volvió.',
  },
  {
    q: 'Al arrastrar círculos con el ratón, ¿quién trabajó más?',
    options: ['Quienes lo hicieron como un favor, sin pago (168 círculos)', 'Quienes recibieron US$5 (159)', 'Quienes recibieron 50 centavos (101)', 'Todos trabajaron igual'],
    answer: 0,
    why: 'El favor activó una norma social y rindió incluso más que el pago de US$5. El pago de 50 centavos activó la norma de mercado y se trabajó a medio gas.',
  },
  {
    q: '¿Qué es la brecha «frío-caliente» (Jekyll y Hyde)?',
    options: ['Que en un estado frío no podemos predecir cómo cambiará nuestra conducta en caliente', 'Que el clima influye en las ventas', 'Que hay que decidir con la cabeza fría siempre', 'Que las emociones son irracionales por definición'],
    answer: 0,
    why: 'No es que las emociones nos vuelvan malos, sino que desde un estado no podemos anticipar el otro. De ahí que convenga decidir y comprometerse en frío.',
  },
  {
    q: '¿Qué es un mecanismo de compromiso previo?',
    options: ['Una restricción que adoptas en frío para limitar tus opciones futuras, como un descuento automático para ahorrar', 'Un contrato que firma tu empleador', 'Una promesa vaga de portarte mejor', 'Un seguro contra pérdidas'],
    answer: 0,
    why: 'Es la herramienta contra la desidia: decides antes de la tentación para que el yo impulsivo no tenga opciones.',
  },
  {
    q: 'En la subasta de entradas de baloncesto en Duke, ¿cuánto más valoraron la entrada quienes la ganaron?',
    options: ['Unas 14 veces más: US$2.400 frente a US$170', 'Un 20% más', 'Lo mismo que quienes no la ganaron', 'Unas 3 veces más'],
    answer: 0,
    why: 'Es el efecto de dotación: sobrevaloramos lo que poseemos por apego, por aversión a la pérdida y por creer que el comprador ve lo mismo que nosotros.',
  },
  {
    q: 'En el juego de las puertas, que se cerraban si no se visitaban, las personas…',
    options: ['Corrieron de puerta en puerta para salvarlas todas y ganaron cerca de 15% menos', 'Se quedaron en una sola puerta y ganaron más', 'Ignoraron las puertas que se achicaban', 'Ganaron igual con cualquier estrategia'],
    answer: 0,
    why: 'Mantener abiertas todas las opciones distrae de lo que importa y cuesta dinero, tiempo y energía sin aportar utilidad.',
  },
  {
    q: 'En el experimento del analgésico «Veladona», ¿qué pasó según el precio de la cápsula?',
    options: ['A US$2,50 casi todos sintieron alivio; a US$0,10, solo la mitad', 'No hubo diferencia', 'La cápsula barata funcionó mejor', 'Nadie sintió alivio'],
    answer: 0,
    why: 'Era vitamina C. El precio elevó la expectativa y la expectativa cambió la experiencia. Es un resultado que conviene tratar con cautela porque no tiene réplica verificada.',
  },
];

function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1:" highlight="las trampas más conocidas" subtitle="Diez preguntas de nivel principiante sobre los efectos centrales del libro: señuelo, ancla, precio cero, normas, estados emocionales, compromiso y propiedad.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={TD_BASICO} />
    </Shell>
  );
}

const TD_AVANZADO: QuizQ[] = [
  {
    q: 'Fudenberg, Levine y Maniadis repitieron la manipulación de coherencia arbitraria. ¿Qué encontraron?',
    options: ['Efectos mucho más débiles en bienes comunes y ninguno en loterías', 'Exactamente los mismos efectos del original', 'Efectos más fuertes en loterías', 'Que el número de Seguro Social no era un buen ancla porque es privado'],
    answer: 0,
    why: 'Eso limita la robustez de las preferencias arbitrarias fuertes. El anclaje con anclas explícitas sí replica bien; el de anclas arbitrarias incidentales es lo que está en disputa.',
  },
  {
    q: 'Una replicación preregistrada con 25 réplicas y 5.786 personas probó el efecto de los Diez Mandamientos sobre la trampa. ¿Resultado?',
    options: ['Sin efecto: 0,11 matrices de más, con intervalo que incluye el cero y en dirección contraria al original', 'Confirmó el efecto con más fuerza', 'Solo funcionó con estudiantes religiosos', 'No se pudo completar por falta de participantes'],
    answer: 0,
    why: 'El original reportaba 1,45 matrices menos con el recordatorio moral. La réplica no encontró nada, y es un caso claro de efecto que no resistió una prueba grande.',
  },
  {
    q: 'El artículo de las fechas límite del MIT (2002) fue retractado. ¿Qué se descubrió del Estudio 1?',
    options: ['Las notas finales de 13 estudiantes del grupo que elegía sus fechas fueron alteradas para favorecer a quienes espaciaron sus entregas', 'Que los estudiantes copiaron entre ellos', 'Que el profesor no corrigió los trabajos', 'Que las fechas impuestas empeoraron las notas'],
    answer: 0,
    why: 'Con las notas recalculadas, el grupo que elegía rindió peor que el de fechas impuestas. La comparación principal parece sobrevivir, pero el artículo entero está retractado.',
  },
  {
    q: 'La fuente dice que los de dígitos altos pujaron «216% a 346% superiores». ¿Qué dice la cuenta con las tablas del propio libro?',
    options: ['Son 2,2 a 3,5 veces: un aumento de 116% a 246%', 'Es correcto: 216% a 346% más', 'Pujaron exactamente el doble', 'El rango real es de 10% a 50%'],
    answer: 0,
    why: 'Por ejemplo, 55,64 ÷ 16,09 = 3,46 veces, que es +246%. El «346%» es el cociente, no el aumento. Es un error de redacción, no de datos.',
  },
  {
    q: 'Los titulares del experimento de Berkeley dicen que la excitación aumentó 136% las conductas inmorales. ¿Cómo se interpreta?',
    options: ['Es el promedio de 5 preguntas, arrastrado por un solo +420%; la mediana es 70%', 'Es el aumento en cada una de las preguntas', 'Es un aumento medido en 136 participantes', 'Es la proporción de personas que cambió de opinión'],
    answer: 0,
    why: 'Un promedio de datos muy dispares exagera lo típico. Además, la muestra es de 25 estudiantes y no tiene réplica verificada.',
  },
  {
    q: 'Frederick, Lee y Baskin (2014) cuestionaron la generalidad del efecto señuelo. ¿Cuál es su punto?',
    options: ['Aparece cuando los atributos se describen con números, y se debilita cuando se experimenta el producto', 'Que el efecto solo funciona con productos caros', 'Que nunca se ha observado en un laboratorio', 'Que depende del idioma del participante'],
    answer: 0,
    why: 'Es un matiz importante para usarlo en la práctica: el señuelo no es una ley universal, funciona bajo ciertas condiciones de presentación.',
  },
  {
    q: 'Una réplica por encuesta del estudio de la guardería (Metcalf y colegas) halló que…',
    options: ['Las multas redujeron las conductas no deseadas, lo contrario del original, aunque era una encuesta hipotética', 'Las multas duplicaron los retrasos', 'No se pudo obtener ninguna respuesta', 'Los padres preferían pagar la multa'],
    answer: 0,
    why: 'Conviene la cautela en ambos sentidos: el original es un único estudio de campo y la réplica fue una encuesta con respuestas hipotéticas, no conducta real.',
  },
  {
    q: '¿Por qué es relevante que el experimento de Berkeley tuviera 25 participantes?',
    options: ['Con muestras pequeñas es más fácil obtener efectos grandes que no se repiten', 'Porque 25 es el mínimo exigido por las revistas', 'Porque todos eran hombres', 'No es relevante: el tamaño de la muestra no afecta los resultados'],
    answer: 0,
    why: 'Es la misma lección de la clase de Kahneman: un resultado llamativo con pocos sujetos no es un hallazgo, es una hipótesis.',
  },
  {
    q: '¿Cuál es el experimento mental de la «amnesia de precios» que propone Ariely?',
    options: ['Si todos olvidaran los precios pasados, un impuesto que duplica la gasolina apenas cambiaría la demanda', 'Que las empresas olvidan sus costos al fijar precios', 'Que los consumidores olvidan lo que compraron', 'Que la inflación borra los precios anteriores'],
    answer: 0,
    why: 'Muestra que reaccionamos a la memoria de lo que pagamos, no a una preferencia interna fija. De ahí la crítica a la independencia entre oferta y demanda.',
  },
  {
    q: 'Frente a las acusaciones de manipulación de datos contra el autor, ¿cuál es la postura de método razonable?',
    options: ['Evaluar cada hallazgo por sus réplicas independientes, sin concluir sobre intenciones ni descartar todo el campo', 'Descartar todo el libro y toda la economía conductual', 'Ignorarlas porque no se probó mala fe', 'Creerle al autor porque es famoso'],
    answer: 0,
    why: 'Las ideas centrales de la economía conductual vienen de muchos autores y resultados replicados. Y cada experimento del libro tiene un estado distinto: por eso el semáforo.',
  },
  {
    q: 'El libro presenta la «brecha de dotación» de 14 veces en las entradas de Duke. ¿Qué dicen las réplicas del efecto de dotación en general?',
    options: ['Que el efecto existe y se replica, pero con una magnitud habitualmente menor a 14 veces', 'Que no existe', 'Que solo ocurre con entradas deportivas', 'Que se invierte con objetos caros'],
    answer: 0,
    why: 'Es un buen ejemplo de separar la existencia de un efecto de su magnitud: el dato llamativo no es necesariamente el típico.',
  },
];

function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2:" highlight="evidencia y método" subtitle="Diez preguntas de nivel avanzado: qué resistió una réplica, qué se retractó, cómo leer las cifras y cómo evaluar un hallazgo famoso.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={TD_AVANZADO} />
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export default function ClaseTrampas({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'td-slide-0': return <Portada isDark={isDark} />;
    case 'td-origen': return <Origen isDark={isDark} />;
    case 'td-relatividad': return <Relatividad isDark={isDark} />;
    case 'td-senuelos': return <Senuelos isDark={isDark} />;
    case 'td-salarios': return <Salarios isDark={isDark} />;
    case 'td-impronta': return <Impronta isDark={isDark} />;
    case 'td-coherencia': return <Coherencia isDark={isDark} />;
    case 'td-persisten': return <Persisten isDark={isDark} />;
    case 'td-mover-ancla': return <MoverAncla isDark={isDark} />;
    case 'td-auditoria': return <Auditoria isDark={isDark} />;
    case 'td-cero': return <PrecioCero isDark={isDark} />;
    case 'td-cero-casos': return <CeroCasos isDark={isDark} />;
    case 'td-normas': return <Normas isDark={isDark} />;
    case 'td-rompe-vinculo': return <RompeVinculo isDark={isDark} />;
    case 'td-caliente': return <CalienteFrio isDark={isDark} />;
    case 'td-jekyll': return <Jekyll isDark={isDark} />;
    case 'td-ahorro': return <Ahorro isDark={isDark} />;
    case 'td-fechas': return <Fechas isDark={isDark} />;
    case 'td-dotacion': return <Dotacion isDark={isDark} />;
    case 'td-puertas': return <Puertas isDark={isDark} />;
    case 'td-expectativas': return <Expectativas isDark={isDark} />;
    case 'td-placebo': return <Placebo isDark={isDark} />;
    case 'td-honestidad': return <Honestidad isDark={isDark} />;
    case 'td-cerveza': return <Cerveza isDark={isDark} />;
    case 'td-evidencia': return <Evidencia isDark={isDark} />;
    case 'td-autor': return <Autor isDark={isDark} />;
    case 'td-cuadran': return <Cuadran isDark={isDark} />;
    case 'td-cierre': return <Sintesis isDark={isDark} />;
    case 'td-test-basico': return <TestBasico isDark={isDark} />;
    case 'td-test-avanzado': return <TestAvanzado isDark={isDark} />;
    default: return null;
  }
}
