import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GuidedControlContext, stepAt } from '../lib/guided';
import type { Cue } from '../lib/guided';

const SPEEDS = [1, 1.2, 1.5, 2] as const;

interface Props {
  src: string;
  isDark: boolean;
}

/* Panel de calibración (solo con ?calibrar en la URL): marca el instante de cada paso mientras suena el audio. */
function Calibrador({ audioRef, cues }: { audioRef: React.RefObject<HTMLAudioElement | null>; cues: Cue[] }) {
  const [marks, setMarks] = useState<number[]>([]);
  const siguiente = marks.length < cues.length ? cues[marks.length].step : null;
  const marcar = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    setMarks((m) => (m.length < cues.length ? [...m, Math.round(a.currentTime * 10) / 10] : m));
  }, [audioRef, cues.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key.toLowerCase() === 'm') marcar(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [marcar]);

  const json = marks.length === cues.length ? cues.map((c, i) => `{ step: '${c.step}', t: ${marks[i]} },`).join('\n') : '';
  return (
    <div className="fixed bottom-24 right-6 z-[200] w-64 p-3 rounded-2xl bg-black/85 text-white text-xs shadow-2xl">
      <p className="font-black uppercase tracking-wide text-[10px] text-[#ff851d]">Calibrar marcas</p>
      {siguiente ? (
        <>
          <p className="mt-1 leading-snug">Reproduce y pulsa <b>M</b> (o el botón) justo cuando empiece: <b>{siguiente}</b></p>
          <button onClick={marcar} className="mt-2 w-full py-1.5 rounded-xl bg-gradient-to-r from-[#ff851d] to-[#ef375c] font-black">Marcar «{siguiente}» ({marks.length + 1}/{cues.length})</button>
        </>
      ) : (
        <>
          <p className="mt-1">Listo. Copia esta lista en cuesBySlide.ts:</p>
          <textarea readOnly value={json} className="mt-1 w-full h-32 bg-white/10 rounded-lg p-1.5 font-mono text-[10px]" onFocus={(e) => e.currentTarget.select()} />
        </>
      )}
      <button onClick={() => setMarks([])} className="mt-2 text-[10px] underline opacity-70">Empezar de nuevo</button>
    </div>
  );
}

export function AudioPlayer({ src, isDark }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [speedOpen, setSpeedOpen] = useState(false);
  const guided = React.useContext(GuidedControlContext);
  const lastStep = useRef<string | null>(null);

  const publish = useCallback((step: string | null) => {
    if (lastStep.current === step) return;
    lastStep.current = step;
    guided?.onStep(step);
  }, [guided]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    setProgress(0);
    publish(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  const closeMenu = useCallback((e: MouseEvent) => {
    if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
      setSpeedOpen(false);
    }
  }, []);

  useEffect(() => {
    if (speedOpen) document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, [speedOpen, closeMenu]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) setProgress(audio.currentTime / audio.duration);
    if (audio && guided && guided.cues.length) publish(stepAt(guided.cues, audio.currentTime, audio.duration || 0));
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(1);
    publish(null);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - left) / width));
    audio.currentTime = fraction * audio.duration;
    setProgress(fraction);
  };

  const trackBg = isDark ? 'bg-white/10' : 'bg-black/8';
  const btnBase = isDark
    ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
    : 'bg-black/8 hover:bg-black/15 text-gray-500 hover:text-gray-900';

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      {guided && guided.cues.length > 0 && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('calibrar') && (
        <Calibrador audioRef={audioRef} cues={guided.cues} />
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-1 z-20">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-colors ${btnBase}`}
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor">
              <rect x="1" y="0" width="2.5" height="9" rx="0.5"/>
              <rect x="5.5" y="0" width="2.5" height="9" rx="0.5"/>
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 9 9" fill="currentColor">
              <polygon points="2,0 9,4.5 2,9"/>
            </svg>
          )}
        </button>

        {/* Speed — compact toggle */}
        {playing && (
          <div ref={speedMenuRef} className="relative animate-in fade-in duration-150">
            <button
              onClick={() => setSpeedOpen(o => !o)}
              className={`h-5 px-1.5 rounded text-[9px] font-bold leading-none transition-all
                ${speed !== 1
                  ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white'
                  : btnBase
                }`}
            >
              {speed === 1 ? '1×' : `${speed}×`}
            </button>

            {speedOpen && (
              <div
                className={`absolute bottom-full left-0 mb-1 flex flex-col gap-0.5 rounded-md p-0.5 shadow-lg
                  animate-in fade-in slide-in-from-bottom-1 duration-100
                  ${isDark ? 'bg-neutral-800' : 'bg-white'}`}
              >
                {SPEEDS.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSpeed(s); setSpeedOpen(false); }}
                    className={`px-2 py-1 rounded text-[9px] font-bold leading-none transition-all whitespace-nowrap
                      ${speed === s
                        ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white'
                        : isDark
                          ? 'text-white/50 hover:text-white hover:bg-white/10'
                          : 'text-gray-400 hover:text-gray-700 hover:bg-black/5'
                      }`}
                  >
                    {s === 1 ? '1×' : `${s}×`}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[4px] cursor-pointer z-20 ${trackBg}`}
        onClick={seek}
      >
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#ff851d] to-[#ef375c] shadow-md pointer-events-none"
          style={{
            left: `calc(${progress * 100}% - 6px)`,
            opacity: progress > 0 || playing ? 1 : 0,
            transition: 'left 0.1s linear, opacity 0.2s',
          }}
        />
      </div>
    </>
  );
}
