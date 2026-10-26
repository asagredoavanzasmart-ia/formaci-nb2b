// ⚠️ PLACEHOLDER: reemplazar con '../audios_clase/proteccion_datos.mp3?url' cuando el audio esté disponible
import audio from '../audios_clase/meddpicc.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «Protección de datos: Ley 21.719»: audio completo + inicio de cada diapositiva
 * + marcas de sus tarjetas. GENERADO desde los subtítulos (guiones/proteccion_datos.srt)
 * y los datos de src/components/proteccion: no editar a mano.
 * ⚠️  PLACEHOLDER — regenerar con node scripts/generar-guiado-proteccion.cjs cuando
 *     el audio y el SRT estén disponibles.
 */
export const guiadoProteccion: GuiadoClase = {
  audio,
  slides: [
    {"id":"pd-portada","t":0},
    {"id":"pd-dato-personal","t":90},
    {"id":"pd-sensibles","t":180},
    {"id":"pd-roles","t":270},
    {"id":"pd-papel","t":360},
    {"id":"pd-principios","t":450},
    {"id":"pd-consentimiento","t":540},
    {"id":"pd-formularios","t":630},
    {"id":"pd-bases","t":720},
    {"id":"pd-reutilizar","t":810},
    {"id":"pd-oposicion","t":900},
    {"id":"pd-perfiles","t":990},
    {"id":"pd-cesion","t":1080},
    {"id":"pd-scraping","t":1170},
    {"id":"pd-prospeccion","t":1260},
    {"id":"pd-encargados","t":1350},
    {"id":"pd-transferencia","t":1440},
    {"id":"pd-especiales","t":1530},
    {"id":"pd-derechos","t":1620},
    {"id":"pd-procedimiento","t":1710},
    {"id":"pd-negar","t":1800},
    {"id":"pd-conservacion","t":1890},
    {"id":"pd-seguridad","t":1980},
    {"id":"pd-incidentes","t":2070},
    {"id":"pd-transparencia","t":2160},
    {"id":"pd-impacto","t":2250},
    {"id":"pd-agencia","t":2340},
    {"id":"pd-infracciones","t":2430},
    {"id":"pd-multas","t":2520},
    {"id":"pd-prevencion","t":2610},
    {"id":"pd-plan","t":2700},
    {"id":"pd-checklist","t":2790},
    {"id":"pd-sintesis","t":2880},
  ],
  cues: {},
};

export const marcasProteccion: Record<string, number[]> = {};

export const FIN_AUDIO_PROTECCION = 2970;
