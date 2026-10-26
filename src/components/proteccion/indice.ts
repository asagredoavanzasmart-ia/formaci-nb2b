import type { Pagina } from '../influencia/tipos';
import { portada, datoPersonal } from './paginas1';
import { sensibles, roles, papel, principios } from './paginas2';
import { consentimiento, formularios, bases, reutilizar } from './paginas3';
import { oposicion, perfiles, cesion, scraping, prospeccion } from './paginas4';
import { encargados, transferencia, especiales, derechos, procedimiento, negar, conservacion, seguridad, incidentes } from './paginas5';
import { transparencia, impacto, agencia, infracciones, multas, prevencion, plan, checklist, sintesis } from './paginas6';

/* Inicio de un tramo que aún no tiene página: solo marca dónde termina la anterior. */
export type Limite = { id: string; inicio: string; limite: true };

/* Orden completo de las 33 páginas de la clase. */
export const ORDEN: (Pagina | Limite)[] = [
  portada,
  datoPersonal,
  sensibles,
  roles,
  papel,
  principios,
  consentimiento,
  formularios,
  bases,
  reutilizar,
  oposicion,
  perfiles,
  cesion,
  scraping,
  prospeccion,
  encargados,
  transferencia,
  especiales,
  derechos,
  procedimiento,
  negar,
  conservacion,
  seguridad,
  incidentes,
  transparencia,
  impacto,
  agencia,
  infracciones,
  multas,
  prevencion,
  plan,
  checklist,
  sintesis,
];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(
  ORDEN.filter((e): e is Pagina => 'els' in e).map((p) => [p.id, p]),
);
