import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, X } from 'lucide-react';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Reproducción global de una clase con audio: cambia de diapositiva al ritmo del audio,
 * hace aparecer los elementos cuando se nombran, los resalta con sombras y simula el clic
 * en pestañas y botones. Salta los tramos de instrucciones de voz y silencia las menciones
 * de «página N» sin detener la reproducción.
 */

const estilos = (oscuro: boolean) => `
.g-oculto { opacity: 0 !important; transform: translateY(8px); pointer-events: none; }
.g-colapso { display: none !important; }
.g-visible { opacity: 1; transform: none; transition: opacity .5s ease, transform .5s ease; }
.g-foco { transform: translateY(-2px); box-shadow: ${oscuro ? '0 22px 44px -10px rgba(0,0,0,.68), 0 0 30px rgba(255,133,29,.11)' : '0 18px 38px -10px rgba(17,24,39,.24), 0 6px 16px rgba(17,24,39,.08)'} !important; transition: box-shadow .4s ease, transform .4s ease; }
@keyframes g-pulso { 0%, 100% { filter: brightness(.95); } 50% { filter: brightness(1.05); } }
.g-redondo { border-radius: 1.25rem; }
.g-pulso { animation: g-pulso 1.1s ease-in-out infinite; }
`;

const VELOCIDADES = [1, 1.2, 1.5, 2] as const;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const limpiar = () => document.querySelectorAll<Element>('.g-oculto, .g-colapso, .g-visible, .g-foco, .g-pulso').forEach((e) => e.classList.remove('g-oculto', 'g-colapso', 'g-visible', 'g-foco', 'g-pulso'));
// En reel solo se mantienen a la vista los elementos estructurales; las tarjetas de texto se muestran de a una.
const esEstructural = (g: string) => /^(titulo|svg|grafico|campos|pills|fila|barra|b:|b~:|css:)/.test(g);

/**
 * Resuelve un objetivo de las marcas a un elemento de la diapositiva visible:
 *  n:Rótulo · n~:Inicio  → tarjeta cuyo rótulo (micro-etiqueta) coincide (opcional #2, #3…)
 *  b:Texto · b~:Texto    → botón con ese texto (exacto / que lo contiene)
 *  fila:Texto            → contenedor del botón (la fila de pestañas)
 *  svg · svg#2           → gráfico o escena
 *  css:selector          → selector CSS
 *  otro                  → atributo data-g
 */
const buscar = (sel: string): HTMLElement | null => {
  const m = sel.match(/^(n~?|b~?|fila|css|barra):(.*?)(?:#(\d+))?$/s) ?? (sel.startsWith('svg') ? ['', 'svg', '', sel.split('#')[1]] : null);
  if (!m) return document.querySelector<HTMLElement>(`[data-g="${sel}"]`);
  const tipo = m[1], txt = (m[2] ?? '').trim(), n = m[3] ? +m[3] - 1 : 0;
  const t = (e: Element) => (e.textContent ?? '').trim();
  if (tipo === 'barra') return document.querySelector<HTMLElement>(`svg[role="img"] [data-barra="${txt}"]`);
  if (tipo === 'css') return document.querySelectorAll<HTMLElement>(txt)[n] ?? null;
  if (tipo === 'svg') return document.querySelectorAll<HTMLElement>('svg[role="img"]')[n] ?? null;
  if (tipo.startsWith('n')) {
    const ps = [...document.querySelectorAll('p')].filter((p) => (tipo === 'n~' ? t(p).startsWith(txt) : t(p) === txt));
    const tarjeta = (ps[n]?.closest('[class*="rounded-"]') as HTMLElement | null) ?? null;
    return tarjeta && !tarjeta.querySelector('[data-g="titulo"]') ? tarjeta : null;
  }
  const bs = [...document.querySelectorAll('button')].filter((b) => !b.closest('aside') && (tipo === 'b~' || tipo === 'fila' ? t(b).includes(txt) : t(b) === txt));
  const b = bs[n] ?? null;
  return tipo === 'fila' ? (b?.parentElement ?? null) : b;
};

type Props = {
  datos: GuiadoClase;
  slideActualId: string;
  irA: (id: string) => void;
  isDark: boolean;
  /** Modo reel: la barra ocupa el ancho de la pantalla vertical. */
  compacto?: { izq: number; ancho: number; abajo: number };
  /** Modo reel activo: las tarjetas narradas se acumulan y se retiran las más antiguas solo si no caben. */
  reel?: boolean;
  /** Número de diapositiva actual y total, para el contador de la barra. */
  indice?: { actual: number; total: number };
};

export default function ClaseGuiada({ datos, slideActualId, irA, isDark, compacto, reel = false, indice }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activo, setActivo] = useState(false);
  const [sonando, setSonando] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [velocidad, setVelocidad] = useState<number>(1);
  const [menuVel, setMenuVel] = useState(false);

  const saltar = datos.saltar ?? [];
  const silenciar = datos.silenciar ?? [];

  const r = useRef({ cur: slideActualId, auto: slideActualId, pedido: 0, fired: new Set<string>(), lastT: 0, foco: null as HTMLElement | null, ultimoSeg: -1, vol: 1, recorte: 0, recorteSlide: '', reveladas: 0 });
  r.current.cur = slideActualId;
  const irARef = useRef(irA);
  irARef.current = irA;

  // Tiempo "efectivo": el del audio sin contar los tramos saltados.
  const efectivo = (t: number) => t - saltar.reduce((acc, s) => acc + Math.max(0, Math.min(t, s.b) - s.a), 0);
  const totalEfectivo = Math.max(0, duracion - saltar.reduce((acc, s) => acc + (s.b - s.a), 0));
  const aReal = (e: number) => { let t = e; for (const s of saltar) if (t >= s.a) t += s.b - s.a; return t; };

  const salir = useCallback(() => {
    const a = audioRef.current;
    if (a) { a.pause(); a.volume = 1; }
    limpiar();
    r.current.foco = null;
    r.current.fired.clear();
    setActivo(false);
    setSonando(false);
  }, []);

  const alternar = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!activo) {
      const enLinea = datos.slides.find((s) => s.id === r.current.cur);
      const t = enLinea ? enLinea.t : 0;
      if (!enLinea) { irARef.current(datos.slides[0].id); r.current.pedido = performance.now(); }
      a.currentTime = t;
      a.playbackRate = velocidad;
      r.current.auto = enLinea ? r.current.cur : datos.slides[0].id;
      r.current.fired.clear();
      r.current.lastT = t;
      setActivo(true);
      a.play();
      return;
    }
    if (a.paused) a.play(); else a.pause();
  };

  const cambiarVelocidad = (v: number) => {
    setVelocidad(v);
    setMenuVel(false);
    if (audioRef.current) audioRef.current.playbackRate = v;
  };

  const buscarEnBarra = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !totalEfectivo) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const t = aReal(f * totalEfectivo);
    if (!activo) {
      const enLinea = datos.slides.find((s) => s.id === r.current.cur);
      if (!enLinea) { irARef.current(datos.slides[0].id); r.current.pedido = performance.now(); }
      a.playbackRate = velocidad;
      r.current.auto = enLinea ? r.current.cur : datos.slides[0].id;
      setActivo(true);
    }
    r.current.fired.clear();
    a.currentTime = t;
    setTiempo(t);
    if (a.paused) a.play();
  };

  // Bucle de sincronización mientras el modo guiado está encendido.
  useEffect(() => {
    if (!activo) return;
    let raf = 0;
    const paso = () => {
      const a = audioRef.current;
      if (a) {
        let t = a.currentTime;
        const k = r.current;

        // Salta las instrucciones de voz.
        const s = saltar.find((x) => t >= x.a && t < x.b);
        if (s) { a.currentTime = s.b; t = s.b; k.fired.clear(); }

        // Baja el volumen a cero durante las menciones de «página N», sin detener el audio.
        const callar = silenciar.some((x) => t >= x.a && t < x.b);
        k.vol = callar ? Math.max(0, k.vol - 0.35) : Math.min(1, k.vol + 0.35);
        if (Math.abs(a.volume - k.vol) > 0.01) a.volume = k.vol;

        if (Math.floor(t) !== k.ultimoSeg) { k.ultimoSeg = Math.floor(t); setTiempo(t); }
        if (t < k.lastT - 0.5) k.fired.clear();
        k.lastT = t;

        let destino = datos.slides[0].id;
        for (const sl of datos.slides) if (sl.t <= t) destino = sl.id;
        const ahora = performance.now();

        if (k.cur !== destino) {
          if (k.cur !== k.auto && ahora - k.pedido > 350) {
            // Alguien cambió de diapositiva a mano: el audio la sigue.
            const ts = datos.slides.find((x) => x.id === k.cur)?.t;
            if (ts == null) { salir(); return; }
            a.currentTime = ts + 0.05;
            k.auto = k.cur;
            k.fired.clear();
          } else if (k.cur === k.auto) {
            k.auto = destino;
            k.pedido = ahora;
            irARef.current(destino);
          }
        } else {
          k.auto = destino;
          const cues = datos.cues[destino] ?? [];
          if (cues.length) {
            const ocultables = new Set<string>();
            const visibles = new Set<string>();
            let foco: string | null | undefined;
            cues.forEach((c, i) => {
              c.mostrar?.forEach((g) => ocultables.add(g));
              if (c.t <= t) {
                c.mostrar?.forEach((g) => visibles.add(g));
                if (c.foco !== undefined) foco = c.foco;
                const clave = `${destino}:${i}`;
                const objetivoClic = c.clicEn ?? (c.clic ? c.foco : undefined);
                // Tras un cambio de diapositiva se espera a que salga la anterior: si no, el clic cae en sus elementos.
                if (objetivoClic && t >= c.t + 0.7 && ahora - k.pedido > 600 && !k.fired.has(clave)) {
                  const el = buscar(objetivoClic);
                  const boton = el && (el.matches('button') ? el : el.querySelector('button'));
                  if (boton) { (boton as HTMLElement).click(); k.fired.add(clave); }
                  else if (el && (el.matches('g[data-lift]') || el.querySelector('g[data-lift]'))) {
                    // Grupos clicables de una escena SVG (no son botones HTML): se les envía el clic.
                    (el.matches('g[data-lift]') ? el : el.querySelector('g[data-lift]'))!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                    k.fired.add(clave);
                  }
                }
              }
            });
            // Lo que nunca se narra (p. ej. instrucciones para interactuar) permanece oculto.
            document.querySelectorAll('[data-nunca]').forEach((e) => e.classList.add('g-colapso'));
            // En reel, las tarjetas ya narradas se acumulan; solo si no caben se retiran las más antiguas.
            let tarjetas = new Set<string>();
            let reveladas: string[] = [];
            let ultimas: string[] = [];
            if (reel) {
              cues.forEach((c) => {
                if (c.t > t) return;
                const cs = (c.mostrar ?? []).filter((g) => !esEstructural(g));
                if (!cs.length) return;
                ultimas = cs;
                cs.forEach((g) => { if (!reveladas.includes(g)) reveladas.push(g); });
              });
              if (k.recorteSlide !== destino || reveladas.length < k.reveladas) { k.recorteSlide = destino; k.recorte = 0; }
              k.reveladas = reveladas.length;
              k.recorte = Math.min(k.recorte, Math.max(0, reveladas.length - ultimas.length));
              tarjetas = new Set(reveladas.slice(k.recorte));
              ultimas.forEach((g) => tarjetas.add(g));
            }
            ocultables.forEach((g) => {
              const el = buscar(g);
              if (!el) return;
              // En reel, lo estructural (gráfico, pestañas, campos) aparece al entrar la diapositiva para no dejar un hueco; las tarjetas van de a una.
              const ver = reel ? (esEstructural(g) ? true : tarjetas.has(g)) : visibles.has(g);
              el.classList.toggle('g-colapso', reel ? !ver : false);
              el.classList.toggle('g-oculto', reel ? false : !ver);
              el.classList.toggle('g-visible', ver);
            });
            if (reel) {
              // Si lo visible exige achicar la diapositiva por debajo del 82 %, se retira la tarjeta más antigua (una por cuadro).
              const caja = document.querySelector<HTMLElement>('[data-ajuste-caja]');
              const dentro = document.querySelector<HTMLElement>('[data-ajuste-dentro]');
              if (caja && dentro && caja.clientHeight && dentro.offsetHeight / caja.clientHeight > 1 / 0.82 && k.recorte < reveladas.length - ultimas.length) k.recorte++;
            }
            // Sellos y pies de gráfico sueltos: el pie aparece con el primer elemento y el sello con el último.
            const reveladores = cues.filter((c) => c.mostrar?.some((g) => g !== 'titulo'));
            const tPie = reveladores[0]?.t ?? 0;
            const tSello = reveladores[reveladores.length - 1]?.t ?? 0;
            document.querySelectorAll<HTMLElement>('[data-aux]').forEach((el) => {
              if (el.parentElement?.closest('[data-g]')) return;
              const ver = t >= (el.dataset.aux === 'pie' ? tPie : tSello);
              el.classList.toggle('g-colapso', reel ? !ver : false);
              el.classList.toggle('g-oculto', reel ? false : !ver);
              el.classList.toggle('g-visible', ver);
            });
            let elFoco = foco ? buscar(foco) : null;
            if (elFoco?.matches('[data-g="grafico"]')) elFoco = elFoco.querySelector<HTMLElement>('svg') ?? elFoco;
            const enGrafico = (e: Element) => e.tagName.toLowerCase() === 'svg' || !!e.closest('svg');
            const objetivos: HTMLElement[] = !elFoco ? [] : elFoco.tagName.toLowerCase() === 'svg' && elFoco.querySelector('[data-barra]') ? [] : [elFoco];
            if (k.foco !== elFoco) {
              document.querySelectorAll('.g-foco, .g-pulso').forEach((e) => e.classList.remove('g-foco', 'g-pulso'));
              // En reel, el elemento resaltado se trae a la vista dentro del marco con scroll.
              if (reel && elFoco) elFoco.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            objetivos.forEach((e) => {
              e.classList.add(enGrafico(e) ? 'g-pulso' : 'g-foco');
              if (!enGrafico(e) && !/rounded/.test(e.className)) e.classList.add('g-redondo');
            });
            k.foco = elFoco;
          } else if (k.foco) {
            document.querySelectorAll('.g-foco, .g-pulso').forEach((e) => e.classList.remove('g-foco', 'g-pulso'));
            k.foco = null;
          }
        }
      }
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [activo, datos, salir, saltar, silenciar, reel]);

  useEffect(() => () => limpiar(), []);

  const progreso = totalEfectivo ? Math.min(1, efectivo(tiempo) / totalEfectivo) : 0;
  const caja = isDark ? 'bg-[#111111]/90 border-[#2a2a2a] text-gray-200' : 'bg-white/92 border-gray-100 text-gray-600';
  const pista = isDark ? 'bg-white/12' : 'bg-black/10';
  const chip = isDark ? 'bg-white/10 hover:bg-white/20 text-white/80' : 'bg-black/8 hover:bg-black/15 text-gray-600 hover:text-gray-900';

  return (
    <>
      <style>{estilos(isDark)}</style>
      <audio
        ref={audioRef}
        data-guiado=""
        src={datos.audio}
        preload="metadata"
        onLoadedMetadata={(e) => setDuracion(e.currentTarget.duration)}
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
        onEnded={salir}
      />

      <div className={`${compacto ? 'fixed gap-2 pl-2 pr-2.5' : 'absolute left-1/2 -translate-x-1/2 bottom-[74px] w-[min(820px,calc(100%-180px))] gap-3 pl-2.5 pr-4'} z-[140] flex items-center py-2 rounded-full shadow-xl border backdrop-blur-md ${caja}`} style={compacto ? { left: compacto.izq, width: compacto.ancho, bottom: compacto.abajo } : undefined}>
        <button
          onClick={alternar}
          className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white flex items-center justify-center shadow-md shadow-red-500/30 hover:scale-105 transition-transform"
          aria-label={sonando ? 'Pausar la clase' : activo ? 'Continuar la clase' : 'Reproducir la clase completa'}
          title={sonando ? 'Pausar la clase' : activo ? 'Continuar la clase' : 'Reproducir la clase completa'}
        >
          {sonando ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
        </button>

        <div className="relative shrink-0">
          <button onClick={() => setMenuVel((o) => !o)} className={`h-6 px-2 rounded-md text-[11px] font-bold leading-none transition-colors ${velocidad !== 1 ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white' : chip}`} title="Velocidad">
            {velocidad === 1 ? '1×' : `${velocidad}×`}
          </button>
          {menuVel && (
            <div className={`absolute bottom-full left-0 mb-2 flex flex-col gap-0.5 p-0.5 rounded-lg shadow-lg ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
              {VELOCIDADES.map((v) => (
                <button key={v} onClick={() => cambiarVelocidad(v)} className={`px-2.5 py-1 rounded-md text-[11px] font-bold leading-none whitespace-nowrap ${velocidad === v ? 'bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white' : isDark ? 'text-white/60 hover:bg-white/10' : 'text-gray-500 hover:bg-black/5'}`}>
                  {v === 1 ? '1×' : `${v}×`}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`relative flex-1 h-[6px] rounded-full cursor-pointer ${pista}`} onClick={buscarEnBarra}>
          <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c]" style={{ width: `${progreso * 100}%`, transition: 'width .15s linear' }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#ff851d] to-[#ef375c] shadow-md pointer-events-none" style={{ left: `calc(${progreso * 100}% - 7px)`, opacity: activo ? 1 : 0, transition: 'left .15s linear, opacity .2s' }} />
        </div>

        <span className="shrink-0 text-xs font-bold tabular-nums">{fmt(activo ? efectivo(tiempo) : 0)}{!compacto && <span className="opacity-50"> / {fmt(totalEfectivo)}</span>}</span>

        {indice && (
          <span className="shrink-0 text-[11px] font-black tabular-nums px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#ff851d] to-[#ef375c] text-white" title="Diapositiva">{indice.actual}/{indice.total}</span>
        )}

        {activo && (
          <button onClick={salir} className={`shrink-0 p-1 rounded-full transition-colors ${chip}`} title="Salir de la clase guiada" aria-label="Salir de la clase guiada">
            <X size={14} />
          </button>
        )}
      </div>
    </>
  );
}
