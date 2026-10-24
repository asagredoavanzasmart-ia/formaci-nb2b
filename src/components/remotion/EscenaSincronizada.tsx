import React, { useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';

const FPS = 30;

type Props<P extends Record<string, unknown>> = {
  componente: React.ComponentType<P>;
  props: P;
  /** Tramo del audio de la clase (segundos) que cubre esta escena. */
  inicio: number;
  fin: number;
  ancho: number;
  alto: number;
  /** Lo que se muestra fuera de la clase guiada (navegación manual). */
  respaldo: React.ReactNode;
};

const audioClase = () => document.querySelector<HTMLAudioElement>('audio[data-guiado]');

/* Índice de la última marca (segundos relativos al tramo) ya alcanzada por el audio, o null fuera de la clase guiada. */
export function useMarcaClase(inicio: number, fin: number, marcas: number[]) {
  const [i, setI] = useState<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const paso = () => {
      const a = audioClase();
      const t = a ? a.currentTime : -1;
      const dentro = !!a && t > 0 && t >= inicio - 0.3 && t <= fin + 0.3;
      let k: number | null = null;
      if (dentro) { k = -1; marcas.forEach((m, j) => { if (t - inicio >= m) k = j; }); }
      setI((v) => (v === k ? v : k));
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [inicio, fin, marcas]);
  return i;
}

/* Escena de Remotion que avanza con el audio de la clase guiada: cada cuadro sale del tiempo del audio. */
export function EscenaSincronizada<P extends Record<string, unknown>>({ componente, props, inicio, fin, ancho, alto, respaldo }: Props<P>) {
  const ref = useRef<PlayerRef>(null);
  const [activa, setActiva] = useState(false);
  useEffect(() => {
    let raf = 0;
    const paso = () => {
      const a = audioClase();
      const t = a ? a.currentTime : -1;
      const dentro = !!a && t > 0 && t >= inicio - 0.3 && t <= fin + 0.3;
      setActiva((v) => (v === dentro ? v : dentro));
      if (dentro && ref.current) {
        const f = Math.max(0, Math.min(Math.round((t - inicio) * FPS), Math.ceil((fin - inicio) * FPS) - 1));
        if (ref.current.getCurrentFrame() !== f) ref.current.seekTo(f);
      }
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [inicio, fin]);
  if (!activa) return <>{respaldo}</>;
  return (
    <Player
      ref={ref}
      component={componente}
      inputProps={props}
      durationInFrames={Math.ceil((fin - inicio) * FPS)}
      fps={FPS}
      compositionWidth={ancho}
      compositionHeight={alto}
      style={{ width: '100%', aspectRatio: `${ancho} / ${alto}`, maxHeight: '100%' }}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      numberOfSharedAudioTags={0}
      acknowledgeRemotionLicense
    />
  );
}
