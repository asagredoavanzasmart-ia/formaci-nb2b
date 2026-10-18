import React, { useRef, useState, useEffect, useCallback } from 'react';

const SPEEDS = [1, 1.2, 1.5, 2] as const;

interface Props {
  src: string;
  isDark: boolean;
}

export function AudioPlayer({ src, isDark }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [speedOpen, setSpeedOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setPlaying(false);
    setProgress(0);
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
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(1);
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
