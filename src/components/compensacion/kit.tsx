import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { microLabel } from '../slideKit';

export * from '../revops/kit';
import { BarrasIso as BarrasIsoBase } from '../revops/kit';

/* Barras con suelo plano: el rombo isométrico se salía bajo las etiquetas y el pie del gráfico. */
export function BarrasIso(props: React.ComponentProps<typeof BarrasIsoBase>) {
  return <BarrasIsoBase piso="plano" {...props} />;
}

/**
 * Sello de evidencia: dice QUÉ TIPO de estudio respalda una afirmación.
 * Se usa en toda la clase para separar metaanálisis, campo, laboratorio y práctica.
 */
export type TipoEvidencia = 'metaanalisis' | 'campo' | 'laboratorio' | 'teoria';

const SELLOS: Record<TipoEvidencia, { texto: string; claro: string; oscuro: string }> = {
  metaanalisis: { texto: 'Metaanálisis', claro: 'bg-emerald-50 text-emerald-700', oscuro: 'bg-emerald-500/15 text-emerald-300' },
  campo: { texto: 'Estudio de campo', claro: 'bg-sky-50 text-sky-700', oscuro: 'bg-sky-500/15 text-sky-300' },
  laboratorio: { texto: 'Laboratorio', claro: 'bg-amber-50 text-amber-700', oscuro: 'bg-amber-500/15 text-amber-300' },
  teoria: { texto: 'Modelo teórico', claro: 'bg-orange-50 text-orange-700', oscuro: 'bg-orange-500/15 text-orange-300' },
};

export function Sello({ isDark, tipo, detalle }: { isDark: boolean; tipo: TipoEvidencia; detalle?: string }) {
  const s = SELLOS[tipo];
  const Icono = tipo === 'metaanalisis' ? CheckCircle2 : AlertTriangle;
  return (
    <span data-aux="sello" className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide whitespace-nowrap ${isDark ? s.oscuro : s.claro}`}>
      <Icono size={11} />
      {s.texto}
      {detalle && <span className="font-semibold normal-case tracking-normal opacity-80"> · {detalle}</span>}
    </span>
  );
}

/* Fila de sellos bajo un título de tarjeta. */
export function Sellos({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-1.5">{children}</div>;
}

/* Etiqueta pequeña + texto, usada en tarjetas de dos columnas. */
export function Dato({ isDark, label, children }: { isDark: boolean; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={microLabel(isDark)}>{label}</p>
      <div className={`text-sm leading-snug ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{children}</div>
    </div>
  );
}
