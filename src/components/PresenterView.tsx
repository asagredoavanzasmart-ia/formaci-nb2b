import React, { useEffect, useRef, useState } from 'react';
import {
  Presentation, ChevronLeft, ChevronRight, Clock, Play, Pause, TimerReset,
  Sun, Moon, Layers, CornerDownRight,
} from 'lucide-react';
import NotasEditor from './NotasEditor';
import { presenterBus } from '../lib/presenterBus';
import { slidesByClass, type SlideMeta } from '../data/slidesByClass';
import { catalogoClases } from '../data/catalogoClases';

/**
 * Ventana de "Modo presentador" (segunda pantalla).
 *
 * Muestra el guion editable de la diapositiva actual, la posición, la siguiente
 * diapositiva y controles de navegación que gobiernan la ventana principal.
 * Se sincroniza con la presentación vía presenterBus (BroadcastChannel).
 */

function fmt(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PresenterView() {
  const [activeClassId, setActiveClassId] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isDark, setIsDark] = useState(true); // la pantalla de presentador suele ir oscura

  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);
  const [now, setNow] = useState(() => new Date());

  const slides: SlideMeta[] = activeClassId ? slidesByClass[activeClassId] ?? [] : [];
  const current = slides[slideIndex];
  const next = slides[slideIndex + 1];
  const className = catalogoClases.find((c) => c.id === activeClassId)?.title ?? '';

  // Sección actual: el encabezado (level 1) más cercano hacia atrás.
  let section = '';
  for (let i = slideIndex; i >= 0; i--) {
    if (slides[i]?.level === 1) {
      section = slides[i].title;
      break;
    }
  }

  // Título del documento + pedir estado inicial a la ventana principal.
  useEffect(() => {
    document.title = 'Modo presentador — Guión del presentador';
    presenterBus.post({ type: 'request-state' });
    const unsub = presenterBus.subscribe((msg) => {
      if (msg.type === 'state') {
        setActiveClassId(msg.activeClassId);
        setSlideIndex(msg.slideIndex);
        setIsDark(msg.isDark);
      } else if (msg.type === 'navigate') {
        setSlideIndex(msg.slideIndex);
      } else if (msg.type === 'theme') {
        setIsDark(msg.isDark);
      }
    });
    const onUnload = () => presenterBus.post({ type: 'presenter-closed' });
    window.addEventListener('beforeunload', onUnload);
    return () => {
      unsub();
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

  // Reloj + cronómetro.
  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
      setElapsed((e) => (running ? e + 1 : e));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  // Aplicar tema a esta ventana.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const go = (idx: number) => {
    if (slides.length === 0) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    setSlideIndex(clamped);
    presenterBus.post({ type: 'navigate', slideIndex: clamped });
  };

  // Navegación con teclado (incluye mandos de presentador que envían flechas / avpág).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement as HTMLElement).isContentEditable) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        go(slideIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(slideIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIndex, slides.length]);

  const shellBg = isDark ? 'bg-[#0b0b0b] text-white' : 'bg-gray-100 text-gray-900';
  const cardBg = isDark ? 'bg-[#161616] border-[#2a2a2a]' : 'bg-white border-gray-200';
  const btnGhost = isDark ? 'bg-[#1e1e1e] border-[#2a2a2a] hover:bg-[#2a2a2a] text-white' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-800';

  // Sin clase abierta todavía.
  if (!activeClassId || !current) {
    return (
      <div className={`h-screen w-screen flex flex-col items-center justify-center text-center p-10 ${shellBg}`}>
        <span className="p-5 rounded-3xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-2xl mb-6">
          <Presentation size={48} />
        </span>
        <h1 className="text-3xl font-black mb-3">Modo presentador</h1>
        <p className={`max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Abre una clase en la ventana principal (la de las diapositivas) y su guión aparecerá aquí, sincronizado.
        </p>
        <p className="mt-6 text-sm text-[#ff851d] font-bold">Esperando a la presentación…</p>
      </div>
    );
  }

  const total = slides.length;
  const level2Total = slides.filter((s) => s.level === 2).length;
  const level2Pos = slides.slice(0, slideIndex + 1).filter((s) => s.level === 2).length;
  const progress = total > 1 ? (slideIndex / (total - 1)) * 100 : 0;

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden ${shellBg}`}>
      {/* Barra superior */}
      <header className={`shrink-0 flex items-center justify-between gap-4 px-5 py-3 border-b ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 min-w-0">
          <span className="p-2 rounded-xl bg-gradient-to-br from-[#ff851d] to-[#ef375c] text-white shadow-lg shrink-0">
            <Presentation size={18} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#ff851d]">Modo presentador</p>
            <p className={`text-sm font-bold truncate ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{className}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Reloj */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${cardBg}`}>
            <Clock size={15} className="text-[#ff851d]" />
            <span className="text-sm font-bold tabular-nums">{now.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
          {/* Cronómetro */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${cardBg}`}>
            <span className="text-sm font-black tabular-nums text-[#ff851d]">{fmt(elapsed)}</span>
            <button onClick={() => setRunning((r) => !r)} className="p-1 rounded-md hover:bg-white/10 transition-colors" title={running ? 'Pausar' : 'Reanudar'}>
              {running ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button onClick={() => { setElapsed(0); setRunning(true); }} className="p-1 rounded-md hover:bg-white/10 transition-colors" title="Reiniciar cronómetro">
              <TimerReset size={15} />
            </button>
          </div>
          {/* Tema (local a esta ventana) */}
          <button onClick={() => setIsDark((d) => !d)} className={`p-2 rounded-xl border transition-colors ${btnGhost}`} title="Cambiar tema de esta ventana">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* Cuerpo */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 p-4">
        {/* Guion (principal) */}
        <section className={`flex-1 min-h-0 flex flex-col rounded-2xl border overflow-hidden ${cardBg}`}>
          <div className={`shrink-0 flex items-center justify-between gap-3 px-4 py-2.5 border-b ${isDark ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
            <span className="text-[11px] uppercase tracking-[0.2em] font-black text-[#ff851d]">Guión del presentador</span>
            <span className={`text-xs font-semibold truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{section}</span>
          </div>
          <div className="flex-1 min-h-0">
            <NotasEditor slideId={current.id} slideTitle={current.title} isDark={isDark} big />
          </div>
        </section>

        {/* Columna derecha: posición + navegación */}
        <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-4 min-h-0">
          {/* Ahora */}
          <div className={`rounded-2xl border p-4 ${cardBg}`}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-[#ff851d] mb-1">Ahora · {slideIndex + 1}/{total}</p>
            <h2 className="text-xl font-black leading-tight">{current.title}</h2>
            {current.level === 1 && <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Portada de sección</span>}
            {/* Progreso */}
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}>
              <div className="h-full rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c]" style={{ width: `${progress}%` }} />
            </div>
            <p className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Diapositiva {level2Pos} de {level2Total}</p>
          </div>

          {/* Siguiente */}
          <div className={`rounded-2xl border p-4 ${isDark ? 'bg-[#131313] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'}`}>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-1 flex items-center gap-1">
              <CornerDownRight size={12} /> Siguiente
            </p>
            {next ? (
              <h3 className={`text-base font-bold leading-tight ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{next.title}</h3>
            ) : (
              <p className={`text-sm font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Fin de la presentación</p>
            )}
          </div>

          {/* Navegación */}
          <div className="mt-auto grid grid-cols-2 gap-3">
            <button
              onClick={() => go(slideIndex - 1)}
              disabled={slideIndex === 0}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold border transition-all ${btnGhost} ${slideIndex === 0 ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <ChevronLeft size={20} /> Anterior
            </button>
            <button
              onClick={() => go(slideIndex + 1)}
              disabled={slideIndex === total - 1}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-[#ff851d] to-[#ef375c] shadow-lg shadow-red-500/25 transition-all ${slideIndex === total - 1 ? 'opacity-40 pointer-events-none' : 'hover:shadow-xl'}`}
            >
              Siguiente <ChevronRight size={20} />
            </button>
          </div>
          <p className={`text-center text-[11px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <Layers size={11} className="inline mr-1" />
            Usa ← → para navegar. Los cambios se reflejan en la pantalla principal.
          </p>
        </aside>
      </div>
    </div>
  );
}
