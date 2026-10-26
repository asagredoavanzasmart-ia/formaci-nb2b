// ⚠️ PLACEHOLDER: reemplazar con '../audios_clase/negociacion.mp3?url' cuando el audio esté disponible
import audio from '../audios_clase/meddpicc.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «Negociación: lo esencial de HBR»: audio completo + inicio de cada diapositiva
 * + marcas de sus tarjetas. GENERADO desde los subtítulos (guiones/negociacion.srt)
 * y los datos de src/components/negociacion: no editar a mano.
 * ⚠️  PLACEHOLDER — regenerar con node scripts/generar-guiado-negociacion.cjs cuando
 *     el audio y el SRT estén disponibles.
 */
export const guiadoNegociacion: GuiadoClase = {
  audio,
  slides: [
    {"id":"ng-portada","t":0},
    {"id":"ng-header-1","t":10},
    {"id":"ng-problema","t":15},
    {"id":"ng-otro-lado","t":105},
    {"id":"ng-precio","t":195},
    {"id":"ng-cuatro-intereses","t":285},
    {"id":"ng-intereses","t":375},
    {"id":"ng-diferencias","t":465},
    {"id":"ng-batna","t":555},
    {"id":"ng-roosevelt","t":645},
    {"id":"ng-sesgos","t":735},
    {"id":"ng-header-2","t":825},
    {"id":"ng-proceso","t":830},
    {"id":"ng-normalizar","t":920},
    {"id":"ng-mapa","t":1010},
    {"id":"ng-marco","t":1100},
    {"id":"ng-honrar","t":1190},
    {"id":"ng-header-3","t":1280},
    {"id":"ng-ansiedad","t":1285},
    {"id":"ng-ira","t":1375},
    {"id":"ng-decepcion","t":1465},
    {"id":"ng-entusiasmo","t":1555},
    {"id":"ng-sombra","t":1645},
    {"id":"ng-header-4","t":1735},
    {"id":"ng-poder","t":1740},
    {"id":"ng-proceso-mov","t":1830},
    {"id":"ng-reconocimiento","t":1920},
    {"id":"ng-header-5","t":2010},
    {"id":"ng-simpatia","t":2015},
    {"id":"ng-persona","t":2105},
    {"id":"ng-yo-nosotros","t":2195},
    {"id":"ng-trato-completo","t":2285},
    {"id":"ng-tiempo","t":2375},
    {"id":"ng-header-6","t":2465},
    {"id":"ng-si-no","t":2470},
    {"id":"ng-desacuerdo","t":2560},
    {"id":"ng-confianza","t":2650},
    {"id":"ng-preguntas-escrito","t":2740},
    {"id":"ng-sentido-comun","t":2830},
    {"id":"ng-escucha","t":2920},
    {"id":"ng-header-7","t":3010},
    {"id":"ng-equipo-cara","t":3015},
    {"id":"ng-header-8","t":3105},
    {"id":"ng-puertos","t":3110},
    {"id":"ng-frentes","t":3200},
    {"id":"ng-secuencia","t":3290},
    {"id":"ng-baile","t":3380},
    {"id":"ng-arbitraje","t":3470},
    {"id":"ng-header-9","t":3560},
    {"id":"ng-cuando-desafio","t":3565},
    {"id":"ng-header-10","t":3655},
    {"id":"ng-concert","t":3660},
    {"id":"ng-implementacion","t":3750},
    {"id":"ng-fiebre","t":3840},
    {"id":"ng-que-compramos","t":3930},
    {"id":"ng-valor","t":4020},
    {"id":"ng-sinergias","t":4110},
    {"id":"ng-header-11","t":4200},
    {"id":"ng-sintesis","t":4205},
  ],
  cues: {},
};

export const marcasNegociacion: Record<string, number[]> = {};

export const FIN_AUDIO_NEGOCIACION = 4295;
