import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Cylinder, Float, Lift, Traveler, PulseDisc, hop, Persona, Orb } from '../scene3d';
import { Cifra, Nota, Fuente, BarrasIso, Piso, Campo, Sello, fmt } from './kit';
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
    comportamiento: 'Cuando están lejos de la cuota tienden a rendirse: abandonan el esfuerzo en lugar de intentar alcanzarla.',
    palanca: 'Bonos intermedios, por ejemplo trimestrales, que funcionan como puntos de control y mantienen un siguiente escalón al alcance.',
  },
  {
    k: 'Núcleo',
    en: 'core performers',
    x: 300,
    acc: 'gear' as const,
    comportamiento: 'Es el grupo más numeroso de la mayoría de los equipos de ventas, y los gerentes suelen ignorarlo.',
    palanca: 'Metas de varios niveles, con un primer tramo que alcancen con facilidad. En un experimento de Ahearne, así rindieron mejor.',
  },
  {
    k: 'Estrellas',
    en: 'stars',
    x: 490,
    acc: 'star' as const,
    comportamiento: 'Son el segmento de mayor rendimiento. Una vez superada la cuota, no frenan su esfuerzo.',
    palanca: 'Comisiones por sobrecumplimiento: ayudan a los mejores a sostener su producción después de alcanzar la cuota.',
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
            <div data-g="pills" className="flex gap-1.5">
              <span data-g="pill-tope" className="inline-flex rounded-full"><Pill isDark={isDark} on={!acel} onClick={() => setAcel(false)}>Con tope</Pill></span>
              <span data-g="pill-acel" className="inline-flex rounded-full"><Pill isDark={isDark} on={acel} onClick={() => setAcel(true)}>Con acelerador, sin tope</Pill></span>
            </div>
            <div data-g="grafico" className="w-full max-h-[230px] flex-1 min-h-0">
              <BarrasIso id="cct" isDark={isDark} max={maxV * 1.1} W={440} hMax={120} decimals={1} items={niveles.map((n, k) => ({ name: `Vende ${n} % de la cuota`, value: valores[k], label: `${fmt(valores[k], 1)} mil`, hl: n >= 120 && acel }))} caption="Comisión cobrada, en miles de dólares (ejemplo de cálculo)" />
            </div>
            <div data-g="campos" className="grid grid-cols-3 gap-2 w-full">
              <Campo isDark={isDark} label="Comisión base" value={base} onChange={setBase} step={0.5} sufijo="%" />
              <Campo isDark={isDark} label={acel ? 'Sobre la cuota' : 'Tope de pago'} value={acel ? alta : tope} onChange={acel ? setAlta : setTope} step={acel ? 0.5 : 10} sufijo="%" />
              <div className={`p-2.5 rounded-2xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>A 140 % cobra</p>
                <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">{fmt(valores[3], 1)} mil</p>
              </div>
            </div>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <div data-g="nota-tope" className="rounded-3xl"><Nota isDark={isDark} label="Qué hace un tope" destacada>
              Al llegar al máximo, la siguiente venta ya no suma comisión: para el vendedor, el valor de vender de más cae a cero.
            </Nota></div>
            <div data-g="nota-acel" className="rounded-2xl"><Nota isDark={isDark} label="Qué hace un acelerador">
              Sube el porcentaje sobre el excedente de la cuota, por ejemplo del 5 al 8 %, de modo que cada venta extra sigue pagando más que las anteriores.
            </Nota></div>
            <div data-g="nota-estudio" className="rounded-2xl"><Nota isDark={isDark} label="Lo que mostró el estudio de campo">
              Chung, Steenburgh y Sudhir encontraron que las comisiones por sobrecumplimiento ayudan a los mejores vendedores a sostener su producción después de alcanzar la cuota, y que los vendedores no frenan su esfuerzo al alcanzarla.
            </Nota></div>
            <div data-g="sello" className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="Chung y cols. 2014 · una empresa" />
            </div>
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
  const t = sceneTone(isDark);
  const xs = [90, 220, 350, 480];
  return (
    <Shell isDark={isDark} title="Acortar la distancia al premio:" highlight="bonos de ritmo y metas escalonadas" subtitle="Quien está lejos de la cuota tiende a rendirse. Los hitos intermedios mantienen un siguiente escalón al alcance.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!trim} onClick={() => setTrim(false)}>Solo cuota anual</Pill>
              <Pill isDark={isDark} on={trim} onClick={() => setTrim(true)}>Con hitos trimestrales</Pill>
            </div>
            <svg viewBox="0 0 580 250" className="w-full h-full max-h-[270px] overflow-visible" role="img" aria-label={trim ? 'Un premio al cierre de cada trimestre' : 'Un solo premio al cierre del año'}>
              <SceneDefs id="ccr" isDark={isDark} />
              <Piso cx={290} cy={206} s={270} fill={t.floor} />
              {xs.map((x, k) => {
                const premio = trim || k === 3;
                return (
                  <g key={x}>
                    <g filter="url(#ccr-sh)"><IsoBox cx={x} cy={170} s={30} h={16} f={premio ? PEACH : NEUTRAL(isDark)} /></g>
                    {premio && (
                      <motion.g key={`${trim}-${k}`} initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.12, type: 'spring', stiffness: 110, damping: 13 }}>
                        <Float amp={3} dur={2.2} delay={k * 0.2}><Orb id="ccr" cx={x} cy={118} r={k === 3 ? 20 : 15} /></Float>
                      </motion.g>
                    )}
                    <text x={x} y={218} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={premio ? ORANGE : t.muted}>{['1.er', '2.º', '3.er', '4.º'][k]} trimestre</text>
                  </g>
                );
              })}
              <Traveler id="ccr" path={xs.map((x) => [x, 150] as [number, number])} dur={3.2} repeatDelay={0.6} r={5} />
              <text x={290} y={242} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{trim ? 'Un punto de control al cierre de cada trimestre' : 'El premio queda lejos hasta el final del año'}</text>
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Rezagados · el riesgo de rendirse" destacada>
              El estudio de campo encontró que los vendedores tienden a rendirse cuando están lejos de la cuota. Con un premio anual, ese riesgo dura meses.
            </Nota>
            <Nota isDark={isDark} label="Bonos trimestrales">
              Funcionaron como puntos de control, sobre todo para los vendedores de menor desempeño, que así mantienen el ritmo hacia la cuota anual.
            </Nota>
            <Nota isDark={isDark} label="Núcleo · metas de varios niveles">
              En un experimento de Ahearne, citado por Steenburgh, el núcleo prosperó con metas de varios niveles: el primer tramo se fija en un nivel que alcanzan con facilidad.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="Chung y cols. 2014; Steenburgh y Ahearne 2012" />
            </div>
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
    <Shell isDark={isDark} title="Todo o nada" highlight="frente a pago lineal" subtitle="Un bono que solo se paga al 100 % de la meta deja sin premio a quien queda cerca y tienta a exagerar los resultados.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!lineal} onClick={() => setLineal(false)}>Todo o nada al 100 %</Pill>
              <Pill isDark={isDark} on={lineal} onClick={() => setLineal(true)}>Lineal desde 70 %</Pill>
            </div>
            <div className="w-full max-h-[270px] flex-1 min-h-0">
              <BarrasIso id="ccu" isDark={isDark} max={100} W={440} hMax={140} unit=" %" items={niveles.map((n, k) => ({ name: `Cumple ${n} %`, value: datos[k], hl: n === 95 && !lineal }))} caption="Porcentaje del bono pagado (ejemplo de cálculo)" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="El experimento" destacada>
              Cadsby, Song y Tapon reunieron estudiantes en un laboratorio y les pidieron formar palabras con unas letras en un minuto, con un bono al llegar a nueve. Cuanto más cerca de la meta quedaba la persona, más probable era que exagerara su puntaje.
            </Nota>
            <Nota isDark={isDark} label="La comparación">
              Con pago por palabra, es decir lineal, los participantes engañaron significativamente menos. Quien cobra por cada unidad no tiene un umbral que lo tiente.
            </Nota>
            <Nota isDark={isDark} label="El otro riesgo">
              En el estudio de campo, los vendedores tienden a rendirse cuando están lejos de la cuota: un umbral inalcanzable les quita el incentivo para intentarlo.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="laboratorio" detalle="Cadsby, Song y Tapon · 2010 · sin supervisión" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.5 Cuotas justas por territorio                                   */
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
    <Shell isDark={isDark} title="Cuotas justas:" highlight="el territorio importa" subtitle="Una cuota idéntica para carteras desiguales exige esfuerzos muy distintos. Compara qué parte de su potencial debe vender cada territorio.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!norm} onClick={() => setNorm(false)}>Cuota idéntica</Pill>
              <Pill isDark={isDark} on={norm} onClick={() => setNorm(true)}>Cuota normalizada</Pill>
            </div>
            <div className="w-full max-h-[190px] flex-1 min-h-0 mb-3">
              <BarrasIso id="ccc" isDark={isDark} max={Math.max(ea, eb, 100)} W={380} hMax={100} unit=" %" items={[{ name: 'Territorio A (rico)', value: ea, hl: !norm }, { name: 'Territorio B (difícil)', value: eb, tone: 'peach', hl: !norm && eb > ea }]} caption="Parte del potencial que debe vender para cumplir" />
            </div>
            <div data-g="campos" className="grid grid-cols-3 gap-3 w-full">
              {[
                { label: 'Potencial A', sub: 'territorio rico', value: pa, onChange: (x: number) => setPa(Math.max(1, x)) },
                { label: 'Potencial B', sub: 'territorio difícil', value: pb, onChange: (x: number) => setPb(Math.max(1, x)) },
                { label: 'Cuota base', sub: 'por territorio', value: cuota, onChange: setCuota },
              ].map((c) => (
                <label key={c.label} className={`flex flex-col rounded-2xl border px-3 py-2 shadow-md ${isDark ? 'bg-[#1c1c1c] border-[#333]' : 'bg-white border-gray-200'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-wide leading-tight ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{c.label}</span>
                  <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{c.sub}</span>
                  <input type="number" value={c.value} step={10} min={0} onChange={(e) => c.onChange(Math.max(0, Number(e.target.value) || 0))} className={`w-full bg-transparent text-xl font-black outline-none ${isDark ? 'text-white' : 'text-gray-900'}`} />
                </label>
              ))}
            </div>
            <p data-aux="pie" className={`text-[11px] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Cuota A: {fmt(qa)} · Cuota B: {fmt(qb)} · mismo total del equipo ({fmt(total)}).</p>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="Teoría de la equidad" destacada>
              Adams (1965) planteó que cada persona compara lo que recibe, en relación con lo que aporta, con lo que reciben y aportan sus pares. Si el mismo bono exige la mitad del esfuerzo en un territorio que en otro, la comparación resulta injusta.
            </Nota>
            <Nota isDark={isDark} label="Qué muestra el ejemplo">
              Con la misma cuota, el territorio A necesita vender el 40 % de su potencial y el B, el 80 %. Al repartir la misma cuota total en proporción al potencial, ambos necesitan vender cerca del 53 %.
            </Nota>
            <Nota isDark={isDark} label="Cómo calibrar">
              Ponderar el potencial de cada territorio, por ejemplo por cantidad de clientes y madurez de la cartera, antes de fijar las cuotas individuales.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="teoria" detalle="equidad · Adams, 1965" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* II.6 Encuadre de pérdida                                            */
/* ------------------------------------------------------------------ */

export function Perdida({ isDark }: SlideProps) {
  const [perdida, setPerdida] = useState(true);
  const t = sceneTone(isDark);
  return (
    <Shell isDark={isDark} title="Encuadre de pérdida:" highlight="el bono que ya sientes tuyo" subtitle="Perder duele más que ganar. Entregar el bono al inicio, con devolución si no se cumple, aprovecha esa asimetría.">
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
              <text x={perdida ? 205 : 470} y={118} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={ORANGE}>{perdida ? 'Ya es tuyo si cumples' : 'Se promete para después'}</text>
            </svg>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={0.2} dec={2} prefijo="+" titulo="Con encuadre de pérdida" lineas={['desviaciones estándar en matemáticas', 'hasta +0,40 en otra muestra']} destacada />
              <div className={`p-3.5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Con bono estándar</p>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>Efecto menor y sin significación estadística.</p>
              </div>
            </div>
            <Nota isDark={isDark} label="El experimento">
              Fryer, Levitt, List y Sadoff (2012) pagaron a unos 150 docentes un bono de 4.000 dólares al inicio del ciclo, con la obligación de devolverlo si los resultados de sus alumnos no mejoraban.
            </Nota>
            <Nota isDark={isDark} label="Los conceptos detrás">
              La aversión a la pérdida describe que una pérdida pesa aproximadamente el doble que una ganancia equivalente; el efecto de dotación, que valoramos más lo que sentimos propio.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="≈150 docentes · NBER 18237" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
