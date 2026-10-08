/**
 * Canal de comunicación entre la ventana de presentación (diapositivas) y la
 * ventana del "Modo presentador" (guion + navegación), que viven en pantallas
 * distintas pero en el mismo origen.
 *
 * Usa BroadcastChannel cuando está disponible y cae a eventos de `storage`
 * (localStorage) como respaldo. BroadcastChannel no reenvía el mensaje a la
 * propia ventana que lo emitió, lo que nos evita bucles de eco.
 */

export type PresenterMessage =
  | { type: 'request-state' }
  | { type: 'state'; activeClassId: string | null; slideIndex: number; isDark: boolean }
  | { type: 'navigate'; slideIndex: number }
  | { type: 'theme'; isDark: boolean }
  | { type: 'notes-saved'; slideId: string }
  | { type: 'presenter-closed' };

type Listener = (msg: PresenterMessage) => void;

const CHANNEL = 'clase-presenter-v1';

class PresenterBus {
  private bc: BroadcastChannel | null = null;
  private listeners = new Set<Listener>();

  constructor() {
    if (typeof window === 'undefined') return;
    if ('BroadcastChannel' in window) {
      this.bc = new BroadcastChannel(CHANNEL);
      this.bc.onmessage = (e: MessageEvent) => this.emit(e.data as PresenterMessage);
    } else {
      // Respaldo: los eventos de 'storage' solo se disparan en las OTRAS ventanas.
      window.addEventListener('storage', (e) => {
        if (e.key === CHANNEL && e.newValue) {
          try {
            this.emit(JSON.parse(e.newValue).msg as PresenterMessage);
          } catch {
            /* mensaje inválido: se ignora */
          }
        }
      });
    }
  }

  post(msg: PresenterMessage) {
    if (this.bc) {
      this.bc.postMessage(msg);
    } else if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CHANNEL, JSON.stringify({ t: Date.now(), msg }));
      } catch {
        /* almacenamiento no disponible */
      }
    }
  }

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit(msg: PresenterMessage) {
    this.listeners.forEach((l) => l(msg));
  }
}

export const presenterBus = new PresenterBus();
