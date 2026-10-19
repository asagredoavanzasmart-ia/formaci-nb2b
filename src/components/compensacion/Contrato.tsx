import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Cylinder, Float, Lift, Traveler, PulseDisc, hop, Persona } from '../scene3d';
import { heading, Cifra, Nota, Fuente, Opcion, BarrasIso, Piso, Campo, Paso, Verificado, Sello, fmt } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* II.1 Tres tipos de vendedor                                         */
/* ------------------------------------------------------------------ */

const SEGMENTOS = [
  {
    k: 'Rezagados',
    en: 'laggards',
    x: 110,
    acc: 'compass' as const,
    comportamiento: 'Si arrancan mal y la cuota anual parece inalcanzable, abandonan el esfuerzo. También se saturan persiguiendo demasiadas oportunidades inconexas.',
    palanca: 'Metas escalonadas con microincentivos acumulativos, para que siempre haya un escalón al alcance.',
  },
  {
    k: 'Núcleo',
    en: 'core performers',
    x: 300,
    acc: 'gear' as const,
    comportamiento: 'Es el grupo más numeroso y el más ignorado. Cuando el premio está lejos, posterga el esfuerzo y lo concentra de forma errática al final del año.',
    palanca: 'Metas de varios niveles con un primer tramo fácil de alcanzar, y bonos trimestrales que acorten la distancia al premio.',
  },
  {
    k: 'Estrellas',
    en: 'stars',
    x: 490,
    acc: 'star' as const,
    comportamiento: 'Son el segmento de mayor rendimiento. El estudio encontró que, una vez pasada la cuota, no frenan su esfuerzo si el contrato sigue pagando más.',
    palanca: 'Comisiones por sobrecumplimiento: un porcentaje mayor sobre lo que excede la cuota.',
  },
];

export function Segmentos({ isDark }: SlideProps) {
  const [i, setI] = useState(2);
  const t = sceneTone(isDark);
  const s = SEGMENTOS[i];
  const cuerpo = [NEUTRAL(isDark), PEACH, BRAND];
  return (
    <Shell isDark={isDark} title="Un equipo de ventas no es uno:" highlight="son tres" subtitle="Rezagados, núcleo y estrellas reaccionan distinto al mismo contrato. Diseñar para el promedio deja a los tres a medias.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex items-center justify-center">
            <svg viewBox="0 0 600 270" className="w-full h-full max-h-[300px] overflow-visible" role="img" aria-label="Tres vendedores sobre plataformas: rezagado, núcleo y estrella">
              <SceneDefs id="ccs" isDark={isDark} />
              <Piso cx={300} cy={236} s={290} fill={t.floor} />
              {SEGMENTOS.map((g, k) => (
                <g key={g.k}>
                  {i === k && <PulseDisc cx={g.x} cy={226} rx={64} ry={18} dur={2.2} peak={0.3} />}
                  <g filter="url(#ccs-sh)"><Cylinder cx={g.x} cy={218} rx={52} ry={15} h={12} top={i === k ? '#ffd2a8' : isDark ? '#3a3a3a' : '#e5e7eb'} side={i === k ? '#f0875a' : isDark ? '#262626' : '#9ca3af'} /></g>
                  <Lift on={i === k} dimmed={i !== k} onClick={() => setI(k)} lift={12}>
                    <Float amp={i === k ? 4 : 1.5} dur={2.6} delay={k * 0.3}>
                      <Persona id="ccs" cx={g.x} cy={216} s={1.35} body={cuerpo[k]} accessory={g.acc} hair="#2b1a12" />
                    </Float>
                  </Lift>
                  <text x={g.x} y={256} textAnchor="middle" fontSize={13} fontWeight={900} fill={i === k ? ORANGE : t.text}>{g.k}</text>
                  <text x={g.x} y={269} textAnchor="middle" fontSize={10.5} fill={t.muted}>{g.en}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-2.5 justify-center">
            <div className="flex flex-wrap gap-1.5">
              {SEGMENTOS.map((g, k) => <Pill key={g.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{g.k}</Pill>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
                <Nota isDark={isDark} label={`Cómo se comportan · ${s.en}`} destacada>{s.comportamiento}</Nota>
                <Nota isDark={isDark} label="Qué palanca del contrato les sirve">{s.palanca}</Nota>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="una gran empresa de suministros de oficina · 3 años" />
            </div>
            <Verificado isDark={isDark} tipo="corregido">
              Los tres segmentos salen del modelo del estudio, no de una regla universal. Su tamaño y su reacción cambian de una empresa a otra.
            </Verificado>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Steenburgh y Ahearne (2012), Harvard Business Review; Chung, Steenburgh y Sudhir (2014), Marketing Science 33(2), 165–187.</Fuente>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.2 Topes y aceleradores                                           */
/* ------------------------------------------------------------------ */

export function Topes({ isDark }: SlideProps) {
  const [acel, setAcel] = useState(true);
  const [base, setBase] = useState(5);
  const [alta, setAlta] = useState(8);
  const [tope, setTope] = useState(120);
  const niveles = [80, 100, 120, 140];
  const pago = (a: number) => {
    const ventas = a * 1000;
    if (!acel) return (base / 100) * Math.min(ventas, tope * 1000);
    return (base / 100) * Math.min(ventas, 100000) + (alta / 100) * Math.max(0, ventas - 100000);
  };
  const valores = niveles.map((n) => pago(n) / 1000);
  const maxV = Math.max(...valores, 1);
  return (
    <Shell isDark={isDark} title="Topes y aceleradores:" highlight="qué pasa después de la cuota" subtitle="El contrato decide si vender de más sigue valiendo la pena. Con una cuota de 100.000 dólares, compara qué cobra el vendedor al sobrepasarla.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!acel} onClick={() => setAcel(false)}>Con tope</Pill>
              <Pill isDark={isDark} on={acel} onClick={() => setAcel(true)}>Con acelerador, sin tope</Pill>
            </div>
            <div className="w-full max-h-[230px] flex-1 min-h-0">
              <BarrasIso id="cct" isDark={isDark} max={Math.max(maxV, 1) * 1.1} W={440} hMax={120} decimals={1} items={niveles.map((n, k) => ({ name: `Vende ${n} % de la cuota`, value: valores[k], label: `${fmt(valores[k], 1)} mil`, hl: n >= 120 && acel }))} caption="Comisión cobrada, en miles de dólares (ejemplo ilustrativo)" />
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              <Campo isDark={isDark} label="Comisión base" value={base} onChange={setBase} step={0.5} sufijo="%" />
              <Campo isDark={isDark} label={acel ? 'Sobre la cuota' : 'Tope de pago'} value={acel ? alta : tope} onChange={acel ? setAlta : setTope} step={acel ? 0.5 : 10} sufijo="%" />
              <div className={`p-2.5 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>A 140 % cobra</p>
                <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{fmt(valores[3], 1)} mil</p>
              </div>
            </div>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Qué hace un tope" destacada>
              Al tocar el máximo, el valor de la siguiente venta cae a cero. La predicción teórica es que el vendedor <strong>difiere cierres</strong> al período siguiente (<em>sandbagging</em>) para no «regalar» ventas.
            </Nota>
            <Nota isDark={isDark} label="Qué hace un acelerador">
              Subir el porcentaje sobre el excedente (por ejemplo del 5 % al 8 %) mantiene valiosa cada venta extra justo cuando el vendedor mejor convierte, a un costo marginal menor que lo que aporta.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="Chung y cols. 2014 · una empresa" />
              <Sello isDark={isDark} tipo="teoria" detalle="diferir cierres bajo tope" />
            </div>
            <Verificado isDark={isDark} tipo="corregido">
              Lo que el estudio mide es que las comisiones por sobrecumplimiento sostienen a los mejores. El diferimiento de cierres ante un tope es una predicción de la teoría; el propio resumen del estudio dice que los vendedores no frenan al alcanzar la cuota.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.3 Bonos de ritmo y metas escalonadas                             */
/* ------------------------------------------------------------------ */

export function Ritmo({ isDark }: SlideProps) {
  const [trim, setTrim] = useState(true);
  const anual = [55, 70, 85, 130];
  const trimestral = [95, 100, 100, 105];
  const datos = trim ? trimestral : anual;
  return (
    <Shell isDark={isDark} title="Acortar la distancia al premio:" highlight="bonos de ritmo y metas escalonadas" subtitle="Una cuota anual lejana invita a postergar. Los hitos intermedios mantienen el esfuerzo a lo largo del año.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!trim} onClick={() => setTrim(false)}>Solo cuota anual</Pill>
              <Pill isDark={isDark} on={trim} onClick={() => setTrim(true)}>Con hitos trimestrales</Pill>
            </div>
            <div className="w-full max-h-[270px] flex-1 min-h-0">
              <BarrasIso id="ccr" isDark={isDark} max={140} W={440} hMax={140} items={['1.er trimestre', '2.º trimestre', '3.er trimestre', '4.º trimestre'].map((n, k) => ({ name: n, value: datos[k], label: `${datos[k]}`, hl: !trim && k === 3 }))} caption="Esfuerzo relativo por trimestre · esquema ilustrativo, no datos" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Núcleo · el problema de la distancia" destacada>
              Con un premio a doce meses, el esfuerzo se posterga y se concentra al final. Un bono de ritmo trimestral acerca el refuerzo y estabiliza la facturación mes a mes.
            </Nota>
            <Nota isDark={isDark} label="Rezagados · el riesgo de rendirse">
              Quien arranca mal abandona si la cuota es matemáticamente inalcanzable. Metas escalonadas con microincentivos acumulativos le dan un siguiente escalón posible.
            </Nota>
            <Nota isDark={isDark} label="Lo que mostró el estudio de campo">
              Los bonos trimestrales funcionaron como puntos de control, y los vendedores tienden a rendirse cuando están lejos de la cuota. Con metas de varios niveles, el primer tramo debe poder alcanzarlo con holgura el núcleo.
            </Nota>
            <Sello isDark={isDark} tipo="campo" detalle="Chung y cols. 2014; Ahearne, experimento citado por Steenburgh" />
            <Verificado isDark={isDark} tipo="corregido">
              El informe atribuye el efecto de los bonos trimestrales al segmento medio. El resumen del estudio lo ubica sobre todo en los de menor desempeño. Ambos grupos se benefician, pero no se mide igual.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.4 Todo o nada frente a pago lineal                               */
/* ------------------------------------------------------------------ */

export function Umbral({ isDark }: SlideProps) {
  const [lineal, setLineal] = useState(true);
  const niveles = [60, 80, 95, 100];
  const binario = [0, 0, 0, 100];
  const lin = niveles.map((n) => Math.max(0, Math.round(((n - 70) / 30) * 100)));
  const datos = lineal ? lin : binario;
  return (
    <Shell isDark={isDark} title="Todo o nada" highlight="frente a pago lineal" subtitle="Un bono que solo se paga al 100 % de la meta expulsa a quien no llegará y tienta a quien quedó cerca.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!lineal} onClick={() => setLineal(false)}>Todo o nada al 100 %</Pill>
              <Pill isDark={isDark} on={lineal} onClick={() => setLineal(true)}>Lineal desde 70 %</Pill>
            </div>
            <div className="w-full max-h-[270px] flex-1 min-h-0">
              <BarrasIso id="ccu" isDark={isDark} max={100} W={440} hMax={140} unit=" %" items={niveles.map((n, k) => ({ name: `Cumple ${n} %`, value: datos[k], hl: n === 95 && !lineal }))} caption="Porcentaje del bono pagado (ejemplo ilustrativo)" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Dos daños del todo o nada" destacada>
              <strong>Deserción:</strong> quien se proyecta bajo el umbral deja de esforzarse. <strong>Tentación:</strong> quien queda cerca siente injusticia y encuentra una justificación para inflar el reporte.
            </Nota>
            <Nota isDark={isDark} label="El experimento">
              En un laboratorio con estudiantes, formar palabras en un minuto, con un bono al llegar a nueve: cuanto más cerca de la meta quedaba la persona, más probable era que exagerara su puntaje. Con pago por palabra, hubo mucho menos engaño.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="laboratorio" detalle="Cadsby, Song y Tapon · 2010" />
            </div>
            <Verificado isDark={isDark} tipo="corregido">
              El informe dice que el engaño es mayor que con «salarios fijos». El experimento comparó con pago lineal y con torneo. Y el piso del 70–80 % es una sugerencia de diseño, no un valor probado.
            </Verificado>
            <p className={`text-[11px] leading-snug ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Límite: es un resultado de laboratorio con estudiantes y sin supervisión; en empresas con auditoría el efecto puede ser menor.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.5 Un plan que se entiende                                        */
/* ------------------------------------------------------------------ */

const SENALES = [
  { k: 'Más de tres variables', d: 'El vendedor no puede calcular de cabeza cuánto ganará con la próxima llamada. Se paraliza y se refugia en el sueldo garantizado.', fix: 'Máximo dos o tres métricas, calculables en segundos.' },
  { k: 'Anulaciones opacas', d: 'Cláusulas de devolución (clawbacks) difusas elevan la percepción de injusticia y disparan la rotación voluntaria.', fix: 'Reglas escritas de qué se anula, cuándo y por qué.' },
  { k: 'Plazos de pago inciertos', d: 'Si no sabe cuándo cobra, el pago pierde fuerza como refuerzo y aumentan los costos de transacción internos.', fix: 'Fechas fijas de liquidación.' },
  { k: 'Deducciones retroactivas', d: 'Cambiar las reglas después de la venta destruye la credibilidad del contrato completo.', fix: 'Reglas congeladas durante el período.' },
];

export function Simplicidad({ isDark }: SlideProps) {
  const [simple, setSimple] = useState(true);
  const [i, setI] = useState(0);
  const t = sceneTone(isDark);
  const n = simple ? 3 : 8;
  const pos = (k: number, total: number) => {
    const cols = total <= 3 ? total : 4;
    const fila = Math.floor(k / cols);
    const col = k % cols;
    const ancho = cols * 56;
    return { x: 300 - ancho / 2 + 28 + col * 56 + (fila % 2) * 14, y: 110 + fila * 34 };
  };
  const s = SENALES[i];
  return (
    <Shell isDark={isDark} title="Un plan que se entiende" highlight="en segundos" subtitle="Cuando el plan excede lo que la persona puede calcular, el dinero deja de dirigir su conducta.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={simple} onClick={() => setSimple(true)}>Plan simple</Pill>
              <Pill isDark={isDark} on={!simple} onClick={() => setSimple(false)}>Plan complejo</Pill>
            </div>
            <svg viewBox="0 0 600 250" className="w-full h-full max-h-[270px] overflow-visible" role="img" aria-label={simple ? 'Tres variables' : 'Ocho variables'}>
              <SceneDefs id="ccx" isDark={isDark} />
              <Piso cx={300} cy={210} s={250} fill={t.floor} />
              {Array.from({ length: n }).map((_, k) => {
                const p = pos(k, n);
                return (
                  <motion.g key={`${simple}-${k}`} initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.06, type: 'spring', stiffness: 110, damping: 14 }}>
                    <Float amp={1.5} dur={3} delay={k * 0.2}>
                      <g filter="url(#ccx-sh)"><IsoBox cx={p.x} cy={p.y} s={22} h={22} f={simple ? BRAND : k % 2 ? PEACH : NEUTRAL(isDark)} /></g>
                    </Float>
                  </motion.g>
                );
              })}
              <text x={300} y={238} textAnchor="middle" fontSize={12} fontWeight={900} fill={simple ? ORANGE : t.muted}>{simple ? 'Tres variables: el cálculo cabe en la cabeza' : 'Ocho variables y cláusulas cruzadas: nadie calcula'}</text>
            </svg>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <p className={microLabel(isDark)}>Cuatro señales de un plan ilegible</p>
            <div className="grid grid-cols-2 gap-1.5">
              {SENALES.map((x, k) => <Opcion key={x.k} isDark={isDark} on={k === i} onClick={() => { setI(k); setSimple(false); }}>{x.k}</Opcion>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-2.5">
                <Nota isDark={isDark} label="Qué provoca" destacada>{s.d}</Nota>
                <Nota isDark={isDark} label="Directriz">{s.fix}</Nota>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="practica" detalle="revisiones de Bowen, Haas y Hofmann; Alavi y cols. 2024" />
              <Sello isDark={isDark} tipo="teoria" detalle="racionalidad limitada" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              No existe una cifra publicada del tipo «más de tres variables paraliza». El límite de dos o tres métricas es una regla de práctica razonable, no un umbral medido.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.6 Cuánto fijo y cuánto variable                                  */
/* ------------------------------------------------------------------ */

export function PayMix({ isDark }: SlideProps) {
  const [v, setV] = useState(35);
  const zona =
    v < 10 ? { k: 'Poca urgencia', d: 'Con casi todo fijo, el bono pesa poco: aparece la saciación y la complacencia.' }
    : v <= 40 ? { k: 'Rango habitual', d: 'Solvencia asegurada y bastante saliencia económica para mantener la urgencia diaria.' }
    : v <= 50 ? { k: 'Exigente', d: 'Dentro del rango típico de bonos (10 % a 50 %), pero con más exposición a los vaivenes del mercado.' }
    : { k: 'Zona de riesgo', d: 'Con un variable muy alto, la aversión al riesgo, el estrés y la rotación crecen, sobre todo si el fijo no cubre lo básico.' };
  return (
    <Shell isDark={isDark} title="Cuánto fijo" highlight="y cuánto variable" subtitle="La mezcla salarial resuelve una tensión clásica: dar seguridad sin apagar la urgencia. Arrastra el control y observa dónde cae tu plan.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="w-full max-h-[240px] flex-1 min-h-0">
              <BarrasIso id="ccpm" isDark={isDark} max={100} W={400} hMax={130} unit=" %" items={[{ name: 'Sueldo fijo', value: 100 - v, tone: 'peach' }, { name: 'Variable', value: v, hl: true }]} caption="Ingreso objetivo total (OTE)" />
            </div>
            <label className="w-full px-2">
              <span className={microLabel(isDark)}>Parte variable del ingreso objetivo: {v} %</span>
              <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full accent-[#ff851d]" aria-label="Porcentaje variable" />
            </label>
            <div className={`w-full p-3 rounded-2xl ${featuredClass(isDark)}`}>
              <p className={microLabel(isDark)}>{zona.k}</p>
              <p className={`text-sm leading-snug ${textMuted(isDark)}`}>{zona.d}</p>
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={60} sufijo=" a 70 %" titulo="Fijo recomendado" lineas={['venta transaccional, ciclo corto']} destacada />
              <Cifra isDark={isDark} n={30} sufijo=" a 40 %" titulo="Variable recomendado" lineas={['sobre el ingreso objetivo']} />
            </div>
            <Nota isDark={isDark} label="Dos errores simétricos">
              <strong>Comisión pura:</strong> estrés y rotación. <strong>Sueldo muy alto:</strong> el bono estándar pierde fuerza (saciación) y llega la meseta de complacencia. Con perfiles senior bien pagados, el incentivo adicional necesita valor instrumental superior: aceleradores, categorías de élite o cuentas estratégicas.
            </Nota>
            <Nota isDark={isDark} label="Ajusta por el ciclo de venta">
              Los ciclos largos y la venta consultiva piden más fijo y menos variable.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="practica" detalle="Zoltners, Sinha y Lorimer · 2012" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              El 60/40 a 70/30 viene de guías de consultoría sobre compensación, no de un experimento ni de un metaanálisis. Úsalo como punto de partida y ajusta con tu propio ciclo y mercado.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.7 Cuotas justas por territorio                                   */
/* ------------------------------------------------------------------ */

export function Cuotas({ isDark }: SlideProps) {
  const [pa, setPa] = useState(200);
  const [pb, setPb] = useState(100);
  const [cuota, setCuota] = useState(80);
  const [norm, setNorm] = useState(false);
  const total = cuota * 2;
  const qa = norm ? (total * pa) / (pa + pb) : cuota;
  const qb = norm ? (total * pb) / (pa + pb) : cuota;
  const ea = Math.round((qa / pa) * 100);
  const eb = Math.round((qb / pb) * 100);
  return (
    <Shell isDark={isDark} title="Cuotas justas:" highlight="el territorio importa" subtitle="Una cuota idéntica para carteras desiguales castiga a quien tiene el territorio más difícil. Ajusta los números y compara.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!norm} onClick={() => setNorm(false)}>Cuota idéntica</Pill>
              <Pill isDark={isDark} on={norm} onClick={() => setNorm(true)}>Cuota normalizada</Pill>
            </div>
            <div className="w-full max-h-[210px] flex-1 min-h-0">
              <BarrasIso id="ccc" isDark={isDark} max={Math.max(ea, eb, 100)} W={380} hMax={110} unit=" %" items={[{ name: 'Territorio A (rico)', value: ea, hl: !norm }, { name: 'Territorio B (difícil)', value: eb, tone: 'peach', hl: !norm && eb > ea }]} caption="Parte del potencial que debe vender para cumplir" />
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              <Campo isDark={isDark} label="Potencial A" value={pa} onChange={(x) => setPa(Math.max(1, x))} step={10} />
              <Campo isDark={isDark} label="Potencial B" value={pb} onChange={(x) => setPb(Math.max(1, x))} step={10} />
              <Campo isDark={isDark} label="Cuota base" value={cuota} onChange={setCuota} step={10} />
            </div>
            <p className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Cuota A: {fmt(qa)} · Cuota B: {fmt(qb)} · mismo total del equipo ({fmt(total)}).</p>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Por qué importa" destacada>
              Las personas comparan lo que reciben con su esfuerzo y con el de sus pares (teoría de la equidad). Si un territorio rico cumple con la mitad del esfuerzo, la sensación de arbitrariedad apaga la motivación de todos.
            </Nota>
            <Nota isDark={isDark} label="Cómo calibrar">
              Pondera el potencial, la densidad de clientes y la madurez de la cartera. Involucrar a los gerentes de ventas revela información privada del territorio que ningún menú de cuotas estándar tiene.
            </Nota>
            <Nota isDark={isDark} label="Cuidado con la participación ingenua">
              Dejar que el vendedor negocie su cuota solo ayuda si mejora la comprensión del plan y el compromiso. Sin dirección técnica, tiende a negociar metas más bajas (holgura presupuestaria).
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="practica" detalle="Zoltners y Zoltners · 2001" />
              <Sello isDark={isDark} tipo="teoria" detalle="equidad (Adams, 1965) · metas (Locke y Latham, 1990)" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.8 Encuadre de pérdida                                            */
/* ------------------------------------------------------------------ */

export function Perdida({ isDark }: SlideProps) {
  const [perdida, setPerdida] = useState(true);
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Encuadre de pérdida:" highlight="el bono que ya sientes tuyo" subtitle="Perder duele más que ganar. Entregar el bono al inicio, con devolución si no se cumple, aprovecha esa asimetría. Pero la prueba no viene de ventas.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!perdida} onClick={() => setPerdida(false)}>Bono al final (ganancia)</Pill>
              <Pill isDark={isDark} on={perdida} onClick={() => setPerdida(true)}>Bono adelantado (pérdida)</Pill>
            </div>
            <svg viewBox="0 0 560 240" className="w-full h-full max-h-[250px] overflow-visible" role="img" aria-label="Bono al inicio del ciclo frente a bono al final del ciclo">
              <SceneDefs id="ccl" isDark={isDark} />
              <Piso cx={280} cy={200} s={260} fill={t.floor} />
              <text x={110} y={226} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Inicio del ciclo</text>
              <text x={450} y={226} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>Fin del ciclo</text>
              <PulseDisc cx={110} cy={196} rx={52} ry={14} dur={2.2} peak={perdida ? 0.3 : 0} />
              <Float amp={4} dur={2.4}><Persona id="ccl" cx={110} cy={194} s={1.15} body={BRAND} accessory="tie" hair="#2b1a12" /></Float>
              <motion.g animate={{ x: perdida ? 0 : 280, opacity: 1 }} transition={{ type: 'spring', stiffness: 80, damping: 14 }}>
                <g filter="url(#ccl-sh)">
                  {Array.from({ length: 5 }).map((_, k) => <Cylinder key={k} cx={190} cy={186 - k * 11} rx={28} ry={8} h={9} top={k === 4 ? '#ffb066' : '#ffd2a8'} side="#f0875a" />)}
                </g>
              </motion.g>
              {perdida && <Traveler id="ccl" path={hop([150, 150], [190, 130], 14)} dur={1.6} repeatDelay={0.6} r={4} />}
              <text x={perdida ? 190 : 470} y={118} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={ORANGE}>{perdida ? 'Ya es tuyo si cumples' : 'Se promete para después'}</text>
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={0.2} dec={2} prefijo="+" titulo="Con encuadre de pérdida" lineas={['desviaciones estándar en matemáticas', 'hasta +0,40 en otra muestra']} destacada />
              <div className={`p-3.5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Con encuadre de ganancia</p>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>Efecto menor y sin significación estadística.</p>
              </div>
            </div>
            <Nota isDark={isDark} label="Cómo llevarlo a ventas">
              Donde pedir devoluciones en efectivo tiene restricciones laborales, se usan <strong>cuentas virtuales de bono preasignado</strong>, visibles a diario en el CRM, con deducciones por hitos semanales no cumplidos.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="≈150 docentes · Chicago Heights" />
            </div>
            <Verificado isDark={isDark} tipo="corregido">
              El experimento de Fryer, Levitt, List y Sadoff (NBER, 2012) se hizo con docentes, no con vendedores, y nació como documento de trabajo. Trasladarlo a un plan comercial es una hipótesis razonable, no un resultado probado en ventas.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}
