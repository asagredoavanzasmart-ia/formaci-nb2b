import React, { useState } from 'react';
import { Shell, panelClass, textMuted, microLabel, Pill } from '../slideKit';
import { Cifra, Nota, Fuente, BarrasIso, Sello } from './kit';
import type { SlideProps } from './kit';

/* ------------------------------------------------------------------ */
/* IV.1 Contingencia e inmediatez                                      */
/* ------------------------------------------------------------------ */

const DEMORAS = [
  { k: 'El mismo día', v: 100 },
  { k: 'Quincenal', v: 80 },
  { k: 'Mensual', v: 62 },
  { k: 'Trimestral', v: 36 },
  { k: 'Anual', v: 10 },
];

export function Contingencia({ isDark }: SlideProps) {
  const [i, setI] = useState(2);
  return (
    <Shell isDark={isDark} title="Para que el pago enseñe:" highlight="condicionado e inmediato" subtitle="Un premio moldea la conducta cuando depende claramente de lo que la persona hizo y llega pronto después de hacerlo.">
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[46%] min-h-0 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap justify-center gap-1.5">
              {DEMORAS.map((d, k) => <Pill key={d.k} isDark={isDark} on={k === i} onClick={() => setI(k)}>{d.k}</Pill>)}
            </div>
            <div className="w-full max-h-[240px] flex-1 min-h-0">
              <BarrasIso id="ccct" isDark={isDark} max={100} W={440} hMax={130} items={DEMORAS.map((d, k) => ({ name: d.k, value: d.v, label: '', hl: k === i }))} caption="Ilustración del principio: a mayor demora, menor fuerza del vínculo" />
            </div>
          </div>
          <div className="lg:w-[54%] flex flex-col gap-2.5 justify-center">
            <Nota isDark={isDark} label="1 · Contingencia" destacada>
              La recompensa debe depender de una conducta u objetivo claro. Un premio que se entrega igual haga lo que se haga no cambia lo que la persona hace.
            </Nota>
            <Nota isDark={isDark} label="2 · Inmediatez">
              Según la psicología del refuerzo (Skinner, 1953), cuanto más se demora el premio después de la conducta, más se debilita el vínculo entre ambos. Un bono que llega meses después de la venta se asocia mal con ella.
            </Nota>
            <Nota isDark={isDark} label="3 · Saciación">
              El valor de un reforzador depende del estado de la persona: cuando sus necesidades ya están cubiertas, un premio estándar pierde fuerza.
            </Nota>
            <div className="flex flex-wrap items-center gap-1.5">
              <Sello isDark={isDark} tipo="teoria" detalle="psicología del refuerzo · Skinner" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* IV.2 Dinero, retroalimentación y reconocimiento                     */
/* ------------------------------------------------------------------ */

export function Triada({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Dinero, retroalimentación" highlight="y reconocimiento" subtitle="Tres reforzadores del entorno laboral. En un experimento de campo, el dinero administrado con seguimiento conductual superó a los otros dos.">
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
              <Sello isDark={isDark} tipo="campo" detalle="Stajkovic y Luthans · 2001" />
              <Sello isDark={isDark} tipo="metaanalisis" detalle="2003 · 72 estudios" />
            </div>
          </div>
          <div className="lg:w-[52%] flex flex-col gap-2.5 justify-center">
            <div className="grid grid-cols-2 gap-3">
              <Cifra isDark={isDark} n={16} sufijo=" %" titulo="Mejora media global" lineas={['72 estudios de modificación de conducta', 'd = 0,47']} destacada />
              <div className={`p-3.5 rounded-3xl ${panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>Conclusión del metaanálisis</p>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>Dinero, retroalimentación y reconocimiento tienen cada uno un efecto significativo, y <strong>combinados</strong> producen el efecto más fuerte.</p>
              </div>
            </div>
            <Nota isDark={isDark} label="El experimento de 2001">
              Stajkovic y Luthans compararon, en una empresa, el dinero administrado con la técnica de modificación de conducta organizacional con el pago por desempeño habitual: 37 % de mejora frente a 11 %. El reconocimiento social logró 24 % y la retroalimentación del desempeño, 20 %.
            </Nota>
            <Nota isDark={isDark} label="Una réplica en Corea">
              En una réplica del diseño en Corea (tesis de 2003), el reconocimiento social rindió más que el dinero. El orden entre los tres reforzadores puede cambiar con la cultura y el lugar de trabajo.
            </Nota>
          </div>
        </div>
        <Fuente isDark={isDark}>Fuente: Stajkovic y Luthans (2001), Academy of Management Journal 44(3), 580–590; (2003), Personnel Psychology 56(1).</Fuente>
      </div>
    </Shell>
  );
}
