import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { microLabel } from '../slideKit';

export * from '../revops/kit';

/**
 * Sello de evidencia: dice QUÉ TIPO de estudio respalda una afirmación.
 * Se usa en toda la clase para separar metaanálisis, campo, laboratorio y práctica.
 */
export type TipoEvidencia = 'metaanalisis' | 'campo' | 'laboratorio' | 'practica' | 'teoria' | 'sinverificar';

const SELLOS: Record<TipoEvidencia, { texto: string; claro: string; oscuro: string }> = {
  metaanalisis: { texto: 'Metaanálisis', claro: 'bg-emerald-50 text-emerald-700', oscuro: 'bg-emerald-500/15 text-emerald-300' },
  campo: { texto: 'Estudio de campo', claro: 'bg-sky-50 text-sky-700', oscuro: 'bg-sky-500/15 text-sky-300' },
  laboratorio: { texto: 'Laboratorio', claro: 'bg-amber-50 text-amber-700', oscuro: 'bg-amber-500/15 text-amber-300' },
  practica: { texto: 'Guía de práctica', claro: 'bg-violet-50 text-violet-700', oscuro: 'bg-violet-500/15 text-violet-300' },
  teoria: { texto: 'Modelo teórico', claro: 'bg-orange-50 text-orange-700', oscuro: 'bg-orange-500/15 text-orange-300' },
  sinverificar: { texto: 'Cifra sin verificar', claro: 'bg-rose-50 text-rose-700', oscuro: 'bg-rose-500/15 text-rose-300' },
};

export function Sello({ isDark, tipo, detalle }: { isDark: boolean; tipo: TipoEvidencia; detalle?: string }) {
  const s = SELLOS[tipo];
  const Icono = tipo === 'metaanalisis' ? CheckCircle2 : tipo === 'sinverificar' ? XCircle : AlertTriangle;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide whitespace-nowrap ${isDark ? s.oscuro : s.claro}`}>
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
