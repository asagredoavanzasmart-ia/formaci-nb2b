import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shell, panelClass, textMuted, microLabel, Pill, featuredClass } from '../slideKit';
import { ORANGE, BRAND, PEACH, NEUTRAL, sceneTone, SceneDefs, IsoBox, Float, Traveler, PulseDisc, hop, Persona, Orb } from '../scene3d';
import { Cifra, Nota, Fuente, BarrasIso, Piso, Verificado, Sello, Paso } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* IV.1 Contingencia e inmediatez                                      */
/* ------------------------------------------------------------------ */

const DEMORAS = [
  { k: 'El mismo día', dias: 0 },
  { k: 'Quincenal', dias: 15 },
  { k: 'Mensual', dias: 30 },
  { k: 'Trimestral', dias: 90 },
  { k: 'Anual', dias: 365 },
];

export function Contingencia({ isDark }: SlideProps) {
  const [i, setI] = useState(2);
  const fuerza = (d: number) => Math.round(100 * Math.exp(-d / 90));
  return (
    <Shell isDark={isDark} title="Para que el pago enseñe:" highlight="condicionado e inmediato" subtitle="Un premio moldea la conducta solo si depende claramente de lo que la persona hizo y llega pronto después de hacerlo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap justify-center gap-1.5">
              {DEMORAS.map((d, k) => <Pill key={d.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{d.k}</Pill>)}
            </div>
            <div className="w-full max-h-[240px] flex-1 min-h-0">
              <BarrasIso id="ccct" isDark={isDark} max={100} W={440} hMax={130} unit=" %" items={DEMORAS.map((d, k) => ({ name: d.k, value: fuerza(d.dias), hl: k === i }))} caption="Fuerza relativa del refuerzo · curva ilustrativa, no datos" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="1 · Contingencia estricta" destacada>
              La recompensa debe depender de una conducta u objetivo observable y medible. Los <strong>bonos discrecionales</strong>, los repartos automáticos de utilidades y los premios por antigüedad pueden subir la satisfacción, pero no cambian la tasa de conductas productivas.
            </Nota>
            <Nota isDark={isDark} label="2 · Inmediatez">
              Cuanto más tiempo pasa entre la conducta y el premio, más se debilita el vínculo. Un bono anual diluye el efecto de lo que originó la venta. Liquidar cada mes o cada quincena funciona mejor.
            </Nota>
            <Nota isDark={isDark} label="3 · Ciclos muy largos">
              Se puede atar una parte del pago a actividades verificables (demostraciones o visitas técnicas) para sostener el embudo, a costa de cierto sesgo de autorreporte.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="teoria" detalle="análisis conductual aplicado · Skinner 1953, Daniels 1989" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              La curva de demora viene de la psicología operante de laboratorio. En ventas, la evidencia directa es indirecta: los bonos trimestrales de un estudio de campo. El decaimiento mostrado es ilustrativo.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* IV.2 Cómo evitar la venta engañosa                                  */
/* ------------------------------------------------------------------ */

const COMPUERTAS = [
  { n: 1, k: 'Venta cerrada', corto: 'Venta cerrada', d: 'El vendedor cierra el trato.' },
  { n: 2, k: 'Requerimientos verificados', corto: 'Verificación', d: 'Una verificación auditada, firmada por el cliente.' },
  { n: 3, k: 'Llamada de validación de calidad', corto: 'Validación', d: 'Un contacto previo a la facturación.' },
  { n: 4, k: 'Comisión liberada', corto: 'Comisión liberada', d: 'Solo ahora se desbloquea el pago.' },
];

export function RDI({ isDark }: SlideProps) {
  const [castigo, setCastigo] = useState(false);
  const t = sceneTone(isDark);
  const xs = [70, 195, 320, 445];
  return (
    <Shell isDark={isDark} title="Cómo evitar la venta engañosa:" highlight="premiar lo incompatible con el engaño" subtitle="Castigar después enseña a ocultar. Condicionar el pago a una conducta que hace imposible el engaño enseña a hacerlo bien desde el inicio.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[52%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={castigo} onClick={() => setCastigo(true)}>Castigo posterior</Pill>
              <Pill isDark={isDark} on={!castigo} onClick={() => setCastigo(false)}>Refuerzo de conducta incompatible</Pill>
            </div>
            <svg viewBox="0 0 520 230" className="w-full h-full max-h-[250px] overflow-visible" role="img" aria-label="Recorrido de una venta hasta liberar la comisión">
              <SceneDefs id="ccrd" isDark={isDark} />
              <Piso cx={260} cy={196} s={250} fill={t.floor} />
              {xs.map((x, k) => (
                <motion.g key={x} animate={{ opacity: castigo && k > 0 && k < 3 ? 0.25 : 1 }}>
                  <Float amp={2} dur={3} delay={k * 0.25}>
                    <g filter="url(#ccrd-sh)"><IsoBox cx={x} cy={110} s={30} h={34} f={k === 3 ? BRAND : k === 0 ? PEACH : NEUTRAL(isDark)} /></g>
                  </Float>
                  <text x={x} y={168} textAnchor="middle" fontSize={11} fontWeight={800} fill={k === 3 ? ORANGE : t.muted}>{COMPUERTAS[k].corto}</text>
                </motion.g>
              ))}
              {xs.slice(0, -1).map((x, k) => (
                <Traveler key={x} id="ccrd" path={hop([x + 26, 100], [xs[k + 1] - 26, 100], 22)} dur={1.8} delay={k * 0.5} repeatDelay={1} r={4} />
              ))}
              <text x={260} y={216} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={castigo ? t.muted : ORANGE}>
                {castigo ? 'Se paga primero y se sanciona después, si se detecta' : 'El pago espera a la conducta que impide el engaño'}
              </text>
            </svg>
          </div>
          <div className="lg:w-[48%] flex flex-col gap-2 justify-center">
            {COMPUERTAS.map((c) => <Paso key={c.n} isDark={isDark} n={c.n} titulo={c.k} on={!castigo && c.n === 4}>{c.d}</Paso>)}
            <Nota isDark={isDark} label="Por qué el castigo falla">
              El castigo punitivo posventa no enseña la conducta correcta: entrena a ocultar la falta y genera respuestas defensivas. Y conviene distinguir el engaño de romper reglas para ayudar de verdad al cliente.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="practica" detalle="Daniels y Bailey · 2014" />
              <Sello isDark={isDark} tipo="campo" detalle="analítica de alertas · Pöpping y cols. 2024" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              No encontré ningún metaanálisis que compare este refuerzo con el castigo en equipos de ventas. Se apoya en la psicología operante y en buenas prácticas de gestión del desempeño.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* IV.3 Concursos relámpago                                            */
/* ------------------------------------------------------------------ */

export function Spiffs({ isDark }: SlideProps) {
  const [inter, setInter] = useState(true);
  const t = sceneTone(isDark);
  const fijo = [28, 26, 24, 22, 20, 18, 16, 14];
  const variable = [28, 14, 34, 18, 38, 20, 32, 16];
  const radios = inter ? variable : fijo;
  return (
    <Shell isDark={isDark} title="Concursos relámpago:" highlight="romper la costumbre" subtitle="Una comisión fija y predecible da seguridad, pero con el tiempo se vuelve paisaje. La sorpresa bien dosificada reactiva el esfuerzo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[50%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-1.5">
              <Pill isDark={isDark} on={!inter} onClick={() => setInter(false)}>Esquema fijo</Pill>
              <Pill isDark={isDark} on={inter} onClick={() => setInter(true)}>Con refuerzo intermitente</Pill>
            </div>
            <svg viewBox="0 0 560 220" className="w-full h-full max-h-[240px] overflow-visible" role="img" aria-label="Línea de tiempo con premios fijos que se apagan o premios variables que sorprenden">
              <SceneDefs id="ccsp" isDark={isDark} />
              <Piso cx={280} cy={180} s={265} fill={t.floor} />
              {radios.map((r, k) => (
                <motion.g key={`${inter}-${k}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: inter ? 1 : 0.85 - k * 0.06, y: 0 }} transition={{ delay: k * 0.07, type: 'spring', stiffness: 100, damping: 13 }}>
                  <Float amp={inter ? 4 : 1} dur={2.2 + (k % 3) * 0.4} delay={k * 0.15}>
                    <Orb id="ccsp" cx={44 + k * 67} cy={120 - r * 0.5} r={r} neutral={!inter && k > 3} />
                  </Float>
                </motion.g>
              ))}
              <text x={280} y={212} textAnchor="middle" fontSize={11.5} fontWeight={800} fill={t.muted}>{inter ? 'Premios inesperados: la atención se reactiva' : 'Premio idéntico cada vez: el interés se apaga'} · esquema ilustrativo</text>
            </svg>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="La regla de las contingencias" destacada>
              Los programas de razón o intervalo variable producen la <strong>tasa más alta y más estable</strong> de respuesta y la mayor resistencia a la extinción. La base debe seguir siendo transparente y predecible; lo intermitente va encima.
            </Nota>
            <Nota isDark={isDark} label="Cómo se aplica en ventas">
              Concursos sorpresa no calendarizados, con premios inmediatos, en días o semanas de baja prospección general, para reactivar la cadencia de llamadas y contactos.
            </Nota>
            <Nota isDark={isDark} label="El riesgo">
              Si se vuelven frecuentes se transforman en expectativa, pueden fomentar el cortoplacismo y generan fricción con quien no gana. Úsalos poco.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="teoria" detalle="Skinner · 1969" />
              <Sello isDark={isDark} tipo="sinverificar" detalle="sin estudio comercial citado" />
            </div>
            <Verificado isDark={isDark} tipo="dudoso">
              El hallazgo viene de experimentos de condicionamiento, sobre todo con animales. El informe no cita un estudio en equipos de ventas que lo respalde.
            </Verificado>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* IV.4 Dinero, retroalimentación y reconocimiento                     */
/* ------------------------------------------------------------------ */

export function Triada({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Dinero, retroalimentación" highlight="y reconocimiento" subtitle="Tres reforzadores del entorno laboral. La evidencia muestra que combinados rinden más que por separado.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[48%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="w-full max-h-[260px] flex-1 min-h-0">
              <BarrasIso id="cctr" isDark={isDark} max={40} W={460} hMax={140} unit=" %" items={[
                { name: 'Pago por desempeño habitual', value: 11, tone: 'neutral' },
                { name: 'Dinero con seguimiento conductual', value: 37, hl: true },
                { name: 'Reconocimiento social', value: 24, tone: 'peach' },
                { name: 'Retroalimentación', value: 20, tone: 'peach' },
              ]} caption="Mejora del desempeño en un experimento de campo (2001)" />
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <Sello isDark={isDark} tipo="campo" detalle="Stajkovic y Luthans · 2001 · un experimento" />
              <Sello isDark={isDark} tipo="metaanalisis" detalle="2003 · 72 estudios" />
            </div>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={16} sufijo=" %" titulo="Mejora media global" lineas={['72 estudios de modificación de conducta', 'd = 0,47']} destacada />
              <div className={`p-3.5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Lo que sí se sostiene</p>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>Cada reforzador tiene efecto significativo, y la <strong>combinación</strong> produce el mayor efecto.</p>
              </div>
            </div>
            <Nota isDark={isDark} label="Qué aporta cada uno">
              El dinero da saliencia económica; la retroalimentación es la brújula para corregir frente al estándar; el reconocimiento satisface estatus y pertenencia, por ejemplo con elogio específico y público por disciplina en el CRM o por calidad de propuestas.
            </Nota>
            <Nota isDark={isDark} label="Cómo aplicarlo">
              Combina el plan de comisiones con tableros diarios de avance y un ritual semanal de reconocimiento público de conductas clave.
            </Nota>
            <Nota isDark={isDark} label="Ojo con el orden">
              Una réplica en Corea (tesis de 2003) encontró otro orden: el reconocimiento social rindió más que el dinero. Los resultados dependen de la cultura y del lugar de trabajo.
            </Nota>
            <Verificado isDark={isDark} tipo="dudoso">
              El informe repite un «+45 % con la tríada» y un reconocimiento «a costo cero». En los resúmenes originales no encontré el 45 %: el efecto global del metaanálisis es del 16 %. Y reconocer bien cuesta tiempo y exige que se perciba justo.
            </Verificado>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Stajkovic y Luthans (2001), Academy of Management Journal 44(3); (2003), Personnel Psychology 56(1), 155–194; cifras tomadas de los resúmenes de ambos artículos.</Fuente>
      </div>
    </Shell>
  );
}
