import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
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

/* Tramo del audio que cubre una diapositiva: de su inicio al de la siguiente. */
const tramo = (id: string) => {
  const i = guiadoProteccion.slides.findIndex((s) => s.id === id);
  if (i < 0) return { inicio: 0, fin: 1 };
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

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaPD({ p, isDark }: { p: Pagina; isDark: boolean }) {
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
          <div className="lg:w-[58%] min-w-0 min-h-0 flex items-center justify-center overflow-hidden rounded-2xl">
            {componente && (
              <EscenaSincronizada componente={componente} props={props} inicio={inicio} fin={fin} ancho={W} alto={H} respaldo={
                <Thumbnail component={componente} inputProps={props} compositionWidth={W} compositionHeight={H} frameToDisplay={completo} durationInFrames={total} fps={FPS}
                  style={{ width: '100%', aspectRatio: `${W} / ${H}`, maxHeight: '100%' }} />
              } />
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

export default function ClaseProteccion({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  const p = PAGINAS[slideId];
  return p ? <PaginaPD key={slideId} p={p} isDark={isDark} /> : null;
}
