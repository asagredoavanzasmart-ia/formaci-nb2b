import type { Encabezado, Pagina } from '../influencia/tipos';
import { portada, leccion1 } from './paginas1';
import { leccion2, leccion3, leccion4 } from './paginas2';
import { leccion5, leccion6, leccion7 } from './paginas3';
import { leccion8, leccion9, leccion10, leccion11, sintesis } from './paginas4';

/* Orden de la clase tal como suena en el audio: portada, encabezados de lección y páginas. */
export const ORDEN: (Pagina | Encabezado)[] = [
  portada,
  { id: 'ng-header-1', inicio: 'seis hábitos de quienes negocian' }, ...leccion1,
  { id: 'ng-header-2', inicio: 'controla la negociación antes de que empiece' }, ...leccion2,
  { id: 'ng-header-3', inicio: 'la emoción y el arte de negociar' }, ...leccion3,
  { id: 'ng-header-4', inicio: 'negociación de avance' }, ...leccion4,
  { id: 'ng-header-5', inicio: 'reglas para negociar una oferta de trabajo' }, ...leccion5,
  { id: 'ng-header-6', inicio: 'llegar al sí' }, ...leccion6,
  { id: 'ng-header-7', inicio: 'negociar sin red' }, ...leccion7,
  { id: 'ng-header-8', inicio: 'una guía para negociaciones complejas' }, ...leccion8,
  { id: 'ng-header-9', inicio: 'cómo lograr que la otra parte juegue limpio' }, ...leccion9,
  { id: 'ng-header-10', inicio: 'más allá del sí negociar como si' }, ...leccion10,
  { id: 'ng-header-11', inicio: 'cuándo retirarse de un trato' }, ...leccion11,
  sintesis,
];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(
  ORDEN.filter((e): e is Pagina => 'els' in e).map((p) => [p.id, p]),
);
