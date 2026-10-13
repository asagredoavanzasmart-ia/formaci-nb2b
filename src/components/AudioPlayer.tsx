import React, { useRef, useState, useEffect } from 'react';

const SPEEDS = [1, 1.2, 1.5, 2] as const;

interface Props {
  src: string;
  isDark: boolean;
}

export function AudioPlayer({ src, isDark }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<number>(1);

  // Reset on slide change
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

  const mutedClass = isDark ? 'text-white/40 hover:text-white/70' : 'text-gray-400 hover:text-gray-700';
  const trackBg = isDark ? 'bg-white/10' : 'bg-black/8';

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Play/Pause + Speed — bottom-left */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1 z-20">
        <button
          onClick={togglePlay}
          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm transition-colors
            ${isDark
              ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
              : 'bg-black/8 hover:bg-black/15 text-gray-500 hover:text-gray-900'
            }`}
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

        {playing && (
          <div className="flex items-center gap-0.5 animate-in fade-in duration-150">
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all leading-none
                  ${speed === s
                    ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white'
                    : mutedClass
                  }`}
              >
                {s === 1 ? '1×' : `${s}×`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress bar — absolute bottom edge of the slide */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[4px] cursor-pointer z-20 ${trackBg}`}
        onClick={seek}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff851d] to-[#ef375c]"
          style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
        />
        {/* Dot */}
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
