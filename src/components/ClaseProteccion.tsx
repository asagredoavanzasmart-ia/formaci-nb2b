import React from 'react';
import { motion } from 'framer-motion';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { PisoTexto } from './remotion/comun';
import { PAGINAS } from './proteccion/indice';
import { PortadaPD, W, H } from './proteccion/escenas/PortadaPD';
import { DatoPersonalPD } from './proteccion/escenas/DatoPersonalPD';
import { SensiblesPD } from './proteccion/escenas/SensiblesPD';
import { RolesPD } from './proteccion/escenas/RolesPD';
import { PapelPD } from './proteccion/escenas/PapelPD';
import { PrincipiosPD } from './proteccion/escenas/PrincipiosPD';
import { ConsentimientoPD } from './proteccion/escenas/ConsentimientoPD';
import { FormulariosPD } from './proteccion/escenas/FormulariosPD';
import { BasesPD } from './proteccion/escenas/BasesPD';
import { ReutilizarPD } from './proteccion/escenas/ReutilizarPD';
import { OposicionPD } from './proteccion/escenas/OposicionPD';
import { PerfilesPD } from './proteccion/escenas/PerfilesPD';
import { CesionPD } from './proteccion/escenas/CesionPD';
import { ScrapingPD } from './proteccion/escenas/ScrapingPD';
import { ProspeccionPD } from './proteccion/escenas/ProspeccionPD';
import { EncargadosPD } from './proteccion/escenas/EncargadosPD';
import { TransferenciaPD } from './proteccion/escenas/TransferenciaPD';
import { EspecialesPD } from './proteccion/escenas/EspecialesPD';
import { DerechosPD } from './proteccion/escenas/DerechosPD';
import { ProcedimientoPD } from './proteccion/escenas/ProcedimientoPD';
import { NegarPD } from './proteccion/escenas/NegarPD';
import { ConservacionPD } from './proteccion/escenas/ConservacionPD';
import { SeguridadPD } from './proteccion/escenas/SeguridadPD';
import { IncidentesPD } from './proteccion/escenas/IncidentesPD';
import { TransparenciaPD } from './proteccion/escenas/TransparenciaPD';
import { ImpactoPD } from './proteccion/escenas/ImpactoPD';
import { AgenciaPD } from './proteccion/escenas/AgenciaPD';
import { InfraccionesPD } from './proteccion/escenas/InfraccionesPD';
import { MultasPD } from './proteccion/escenas/MultasPD';
import { PrevencionPD } from './proteccion/escenas/PrevencionPD';
import { PlanPD } from './proteccion/escenas/PlanPD';
import { ChecklistPD } from './proteccion/escenas/ChecklistPD';
import { SintesisPD } from './proteccion/escenas/SintesisPD';
import type { Pagina } from './influencia/tipos';
import { guiadoProteccion, marcasProteccion, FIN_AUDIO_PROTECCION } from '../data/guiadoProteccion';

/**
 * Clase: «Protección de datos: Ley 21.719 para marketing». Guía de implementación para agencias de
 * marketing digital y sus clientes. Cada página tiene su escena propia de Remotion que avanza con el
 * audio de la clase (datos en ./proteccion/paginas*.ts, tiempos en guiadoProteccion.ts).
 */

const FPS = 30;

/* Tramo del audio que cubre una diapositiva: de su inicio al de la siguiente.
   Para slides sin audio en el SRT devuelve una ventana ficticia de 75 s
   que permite mostrar la animación completa en el Thumbnail. */
const tramo = (id: string) => {
  const i = guiadoProteccion.slides.findIndex((s) => s.id === id);
  if (i < 0) return { inicio: 0, fin: 75 };
  return { inicio: guiadoProteccion.slides[i].t, fin: guiadoProteccion.slides[i + 1]?.t ?? FIN_AUDIO_PROTECCION };
};

/* Escena propia de cada página, dibujada a mano. */
const ESCENAS: Record<string, React.FC<any>> = {
  'pd-portada': PortadaPD,
  'pd-dato-personal': DatoPersonalPD,
  'pd-sensibles': SensiblesPD,
  'pd-roles': RolesPD,
  'pd-papel': PapelPD,
  'pd-principios': PrincipiosPD,
  'pd-consentimiento': ConsentimientoPD,
  'pd-formularios': FormulariosPD,
  'pd-bases': BasesPD,
  'pd-reutilizar': ReutilizarPD,
  'pd-oposicion': OposicionPD,
  'pd-perfiles': PerfilesPD,
  'pd-cesion': CesionPD,
  'pd-scraping': ScrapingPD,
  'pd-prospeccion': ProspeccionPD,
  'pd-encargados': EncargadosPD,
  'pd-transferencia': TransferenciaPD,
  'pd-especiales': EspecialesPD,
  'pd-derechos': DerechosPD,
  'pd-procedimiento': ProcedimientoPD,
  'pd-negar': NegarPD,
  'pd-conservacion': ConservacionPD,
  'pd-seguridad': SeguridadPD,
  'pd-incidentes': IncidentesPD,
  'pd-transparencia': TransparenciaPD,
  'pd-impacto': ImpactoPD,
  'pd-agencia': AgenciaPD,
  'pd-infracciones': InfraccionesPD,
  'pd-multas': MultasPD,
  'pd-prevencion': PrevencionPD,
  'pd-plan': PlanPD,
  'pd-checklist': ChecklistPD,
  'pd-sintesis': SintesisPD,
};

/* Escenas diseñadas con texto bajo 44 unidades: en pantallas angostas su texto no baja de 13 px reales. */
const CON_PISO = new Set(['pd-prevencion', 'pd-plan']);

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaPD({ p, isDark }: { p: Pagina; isDark: boolean }) {
  const caja = React.useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = React.useState(0);
  React.useEffect(() => {
    const el = caja.current;
    if (!el || !CON_PISO.has(p.id)) return;
    const ro = new ResizeObserver(([e]) => setAncho(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [p.id]);
  const piso = ancho > 0 && ancho < 520 ? (13 * W) / ancho : 0;
  const { inicio, fin } = tramo(p.id);
  const marcas = marcasProteccion[p.id] ?? [];
  const componente = ESCENAS[p.id];
  const props = { isDark, marcas, pregunta: p.pregunta.texto };
  // Fuera de la clase guiada se muestra el cuadro justo antes de la pregunta.
  const total = Math.max(1, Math.ceil((fin - inicio) * FPS));
  const completo = marcas.length ? Math.min(total - 1, Math.max(0, Math.round((marcas[marcas.length - 1] - 0.6) * FPS))) : 0;
  return (
    <Shell isDark={isDark} title={p.titulo} highlight={p.destaque} subtitle={p.bajada}>
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div ref={caja} className="lg:w-[58%] min-w-0 min-h-0 flex items-center justify-center overflow-hidden rounded-2xl">
            {componente && (
              <PisoTexto.Provider value={piso}>
                <EscenaSincronizada componente={componente} props={props} inicio={inicio} fin={fin} ancho={W} alto={H} respaldo={
                  <Thumbnail component={componente} inputProps={props} compositionWidth={W} compositionHeight={H} frameToDisplay={completo} durationInFrames={total} fps={FPS}
                    style={{ width: '100%', aspectRatio: `${W} / ${H}`, maxHeight: '100%' }} />
                } />
              </PisoTexto.Provider>
            )}
          </div>
          <div className="lg:w-[42%] min-w-0 flex flex-col gap-3 justify-center">
            {p.tarjetas.map((tj) => (
              <div key={tj.rotulo} className={`p-4 rounded-2xl ${tj.destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{tj.rotulo}</p>
                <p className={`text-sm leading-snug mt-1 [overflow-wrap:anywhere] ${textMuted(isDark)}`}>{tj.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* Página 00: carátula estática del curso. No tiene audio: al dar play, la clase
   guiada salta a pd-portada y arranca la narración desde el segundo 0. */
function PortadaCover({ isDark }: { isDark: boolean }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <motion.svg initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewBox="0 0 200 160" className="w-48 md:w-64 mb-4 z-10" aria-hidden="true">
        <defs>
          <linearGradient id="pdcov-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff851d" />
            <stop offset="100%" stopColor="#ef375c" />
          </linearGradient>
        </defs>
        <g transform="translate(100 90) scale(1.3)">
          <path d="M 0 -52 L 44 -36 V 5 C 44 36 21 55 0 65 C -21 55 -44 36 -44 5 V -36 Z" fill="url(#pdcov-g)" opacity={0.15} />
          <path d="M 0 -52 L 44 -36 V 5 C 44 36 21 55 0 65 C -21 55 -44 36 -44 5 V -36 Z" fill="none" stroke="url(#pdcov-g)" strokeWidth="4" />
          <path d="M -14 -4 V -18 A 14 14 0 0 1 14 -18 V -4" fill="none" stroke="url(#pdcov-g)" strokeWidth="5" strokeLinecap="round" />
          <rect x="-20" y="-8" width="40" height="34" rx="8" fill="url(#pdcov-g)" />
          <circle cx="0" cy="8" r="5" fill="#fff" />
          <rect x="-2" y="8" width="4" height="10" rx="2" fill="#fff" />
        </g>
      </motion.svg>
      <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">
        Ley 21.719 · Chile · vigente desde diciembre 2026
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Protección de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">datos personales</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Cada dato que tu empresa maneja es ahora un <strong>préstamo</strong> que alguien debe poder justificar.
      </motion.p>
    </div>
  );
}

export default function ClaseProteccion({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'pd-cover') return <PortadaCover isDark={isDark} />;
  const p = PAGINAS[slideId];
  return p ? <PaginaPD key={slideId} p={p} isDark={isDark} /> : null;
}
