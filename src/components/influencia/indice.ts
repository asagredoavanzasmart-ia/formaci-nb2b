import type { Encabezado, Pagina } from './tipos';
import { leccion1, leccion2 } from './paginas1';
import { leccion3, leccion4 } from './paginas2';
import { leccion5, leccion6 } from './paginas3';
import { leccion7, leccion8, sintesis } from './paginas4';

/* Orden de la clase tal como suena en el audio: portada, encabezados de lección y páginas. */
export const ORDEN: (Pagina | Encabezado)[] = [
  { id: 'ip-portada', inicio: '@cero' },
  { id: 'ip-header-1', inicio: 'los cuatro componentes de la influencia' }, ...leccion1,
  { id: 'ip-header-2', inicio: 'la ciencia de la persuasión de' }, ...leccion2,
  { id: 'ip-header-3', inicio: 'tres cosas que deberían hacer' }, ...leccion3,
  { id: 'ip-header-4', inicio: 'el aprendizaje del carisma de' }, ...leccion4,
  { id: 'ip-header-5', inicio: 'gánate a la gente interpelando' }, ...leccion5,
  { id: 'ip-header-6', inicio: 'historias que emocionan a la gente' }, ...leccion6,
  { id: 'ip-header-7', inicio: 'el sorprendente poder de persuasión' }, ...leccion7,
  { id: 'ip-header-8', inicio: 'cuándo vender contatos y cifras' }, ...leccion8,
  sintesis,
];

export const PAGINAS: Record<string, Pagina> = Object.fromEntries(
  ORDEN.filter((e): e is Pagina => 'els' in e).map((p) => [p.id, p]),
);
