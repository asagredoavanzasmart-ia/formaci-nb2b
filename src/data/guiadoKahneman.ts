import audio from '../audios_clase/pensar-rapido-pensar-despacio.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «Pensar rápido, pensar despacio»: audio completo + inicio de cada diapositiva
 * + marcas por elemento (mostrar, resaltar y pulsar). Generado SOLO desde los subtítulos del audio.
 * «Sustitución» y su encabezado de bloque no se narran en el audio actual (pendiente de regrabar,
 * ver guiones/PENDIENTE_pensar_rapido_regrabar.md), por eso no figuran en la línea de tiempo.
 */
export const guiadoKahneman: GuiadoClase = {
  audio,
  slides: [
    {
      "id": "kn-slide-0",
      "t": 0
    },
    {
      "id": "kn-origen",
      "t": 13.42
    },
    {
      "id": "kn-header-arquitectura",
      "t": 99.12
    },
    {
      "id": "kn-dos-sistemas",
      "t": 101.72
    },
    {
      "id": "kn-interaccion",
      "t": 182.38
    },
    {
      "id": "kn-esfuerzo",
      "t": 281.02
    },
    {
      "id": "kn-perezoso",
      "t": 335.22
    },
    {
      "id": "kn-agotamiento",
      "t": 423.95
    },
    {
      "id": "kn-header-asociativa",
      "t": 503.35
    },
    {
      "id": "kn-asociativa",
      "t": 506.72
    },
    {
      "id": "kn-priming",
      "t": 564.75
    },
    {
      "id": "kn-facilidad",
      "t": 676.12
    },
    {
      "id": "kn-verdad",
      "t": 752.15
    },
    {
      "id": "kn-causalidad",
      "t": 846.78
    },
    {
      "id": "kn-header-heuristicas",
      "t": 923.75
    },
    {
      "id": "kn-sustitucion",
      "t": 925.96
    },
    {
      "id": "kn-representatividad",
      "t": 997
    },
    {
      "id": "kn-disponibilidad",
      "t": 1074.55
    },
    {
      "id": "kn-afectiva",
      "t": 1137.72
    },
    {
      "id": "kn-header-sesgos",
      "t": 1199.02
    },
    {
      "id": "kn-halo",
      "t": 1201.68
    },
    {
      "id": "kn-wysiati",
      "t": 1291.95
    },
    {
      "id": "kn-basicas",
      "t": 1367.89
    },
    {
      "id": "kn-header-critico",
      "t": 1451.36
    },
    {
      "id": "kn-replicacion",
      "t": 1453.96
    },
    {
      "id": "kn-vocabulario",
      "t": 1574.96
    },
    {
      "id": "kn-cierre",
      "t": 1663.69
    }
  ],
  cues: {
    "kn-slide-0": [
      {
        "t": 0,
        "mostrar": [
          "css:svg",
          "css:h1",
          "css:p.uppercase"
        ],
        "foco": null
      },
      {
        "t": 0.07,
        "mostrar": [
          "css:p.max-w-3xl"
        ],
        "foco": "css:p.max-w-3xl"
      }
    ],
    "kn-origen": [
      {
        "t": 13.72,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 30.72,
        "mostrar": [
          "svg",
          "hito"
        ],
        "foco": "hito",
        "clicEn": "css:g[data-lift]#1"
      },
      {
        "t": 40.47,
        "foco": "hito",
        "clicEn": "css:g[data-lift]#2"
      },
      {
        "t": 50.27,
        "foco": "hito",
        "clicEn": "css:g[data-lift]#3"
      },
      {
        "t": 58.2,
        "foco": "hito",
        "clicEn": "css:g[data-lift]#4"
      },
      {
        "t": 70.23,
        "mostrar": [
          "n:El giro conceptual"
        ],
        "foco": "n:El giro conceptual"
      },
      {
        "t": 82.4,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      }
    ],
    "kn-dos-sistemas": [
      {
        "t": 102.02,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 103.1,
        "mostrar": [
          "svg"
        ],
        "foco": null
      },
      {
        "t": 111.7,
        "mostrar": [
          "fila:Velocidad",
          "par"
        ],
        "foco": "par",
        "clicEn": "b:Velocidad"
      },
      {
        "t": 114.67,
        "foco": "par",
        "clicEn": "b:Esfuerzo"
      },
      {
        "t": 116.18,
        "foco": "par",
        "clicEn": "b:Mecanismo"
      },
      {
        "t": 119.9,
        "foco": "par",
        "clicEn": "b:Función"
      },
      {
        "t": 122.33,
        "foco": "par",
        "clicEn": "b:Energía"
      },
      {
        "t": 123.8,
        "foco": "par",
        "clicEn": "b:Ante la duda"
      },
      {
        "t": 127.47,
        "foco": "par",
        "clicEn": "b:Datos"
      },
      {
        "t": 133.13,
        "foco": "par",
        "clicEn": "b:Debilidad"
      },
      {
        "t": 137.97,
        "foco": "par",
        "clicEn": "b:Velocidad"
      },
      {
        "t": 142.8,
        "foco": "par",
        "clicEn": "b:Esfuerzo"
      },
      {
        "t": 145.4,
        "foco": "par",
        "clicEn": "b:Mecanismo"
      },
      {
        "t": 148.17,
        "foco": "par",
        "clicEn": "b:Función"
      },
      {
        "t": 151.73,
        "foco": "par",
        "clicEn": "b:Energía"
      },
      {
        "t": 154.31,
        "foco": "par",
        "clicEn": "b:Ante la duda"
      },
      {
        "t": 156.3,
        "foco": "par",
        "clicEn": "b:Datos"
      },
      {
        "t": 158.8,
        "foco": "par",
        "clicEn": "b:Debilidad"
      },
      {
        "t": 162.8,
        "mostrar": [
          "ilusion"
        ],
        "foco": "ilusion"
      },
      {
        "t": 174.88,
        "foco": null
      }
    ],
    "kn-interaccion": [
      {
        "t": 182.68,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 194.17,
        "mostrar": [
          "svg",
          "paso"
        ],
        "foco": null
      },
      {
        "t": 196.73,
        "foco": "paso",
        "clicEn": "css:g[data-lift]#1"
      },
      {
        "t": 205.37,
        "foco": "paso",
        "clicEn": "css:g[data-lift]#2"
      },
      {
        "t": 218.1,
        "foco": "paso",
        "clicEn": "css:g[data-lift]#3"
      },
      {
        "t": 226.1,
        "foco": "paso",
        "clicEn": "css:g[data-lift]#4"
      },
      {
        "t": 236.14,
        "mostrar": [
          "n:El gorila invisible"
        ],
        "foco": "n:El gorila invisible"
      },
      {
        "t": 252.27,
        "mostrar": [
          "n:Müller-Lyer"
        ],
        "foco": "n:Müller-Lyer"
      },
      {
        "t": 264.8,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 276.4,
        "foco": null
      }
    ],
    "kn-esfuerzo": [
      {
        "t": 281.32,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 288.6,
        "mostrar": [
          "svg",
          "fila:Reposo"
        ],
        "foco": null,
        "clicEn": "b:Reposo"
      },
      {
        "t": 291.3,
        "foco": null,
        "clicEn": "b:Esfuerzo máximo"
      },
      {
        "t": 295.1,
        "mostrar": [
          "suma3"
        ],
        "foco": "suma3"
      },
      {
        "t": 298.73,
        "foco": "suma3",
        "clicEn": "css:g[data-ecg]"
      },
      {
        "t": 304.87,
        "foco": "suma3",
        "clicEn": "b:Tarea resuelta"
      },
      {
        "t": 308.67,
        "mostrar": [
          "n:Ley del mínimo esfuerzo"
        ],
        "foco": "n:Ley del mínimo esfuerzo"
      },
      {
        "t": 319.33,
        "mostrar": [
          "n:La destreza abarata"
        ],
        "foco": "n:La destreza abarata"
      },
      {
        "t": 330.77,
        "foco": null
      }
    ],
    "kn-perezoso": [
      {
        "t": 335.52,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 345.93,
        "mostrar": [
          "fila:El bate y la pelota",
          "enunciado"
        ],
        "foco": "enunciado"
      },
      {
        "t": 352.07,
        "mostrar": [
          "resultado"
        ],
        "foco": "resultado",
        "clicEn": "b:Revelar la respuesta"
      },
      {
        "t": 373.47,
        "foco": "enunciado",
        "clicEn": "b:El silogismo de las flores"
      },
      {
        "t": 382.33,
        "mostrar": [
          "resultado"
        ],
        "foco": "resultado",
        "clicEn": "b:Revelar la respuesta"
      },
      {
        "t": 394.1,
        "foco": "enunciado",
        "clicEn": "b:Michigan y Detroit"
      },
      {
        "t": 399.57,
        "mostrar": [
          "resultado"
        ],
        "foco": "resultado",
        "clicEn": "b:Revelar la respuesta"
      },
      {
        "t": 405.31,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 418.6,
        "foco": null
      }
    ],
    "kn-agotamiento": [
      {
        "t": 424.25,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 442.7,
        "mostrar": [
          "n:El estudio de los jueces en Israel",
          "svg",
          "fila:Tras la pausa"
        ],
        "foco": "n:El estudio de los jueces en Israel"
      },
      {
        "t": 452.13,
        "foco": "css:g[data-lift]#1",
        "clicEn": "b:Tras la pausa"
      },
      {
        "t": 454.47,
        "foco": "css:g[data-lift]#4",
        "clicEn": "b:Antes de comer"
      },
      {
        "t": 455.77,
        "foco": "css:g[data-lift]#1",
        "clicEn": "b:Tras la pausa"
      },
      {
        "t": 464.53,
        "mostrar": [
          "n:Lo que el libro no alcanzó a incorporar"
        ],
        "foco": "n:Lo que el libro no alcanzó a incorporar"
      },
      {
        "t": 492,
        "mostrar": [
          "usar"
        ],
        "foco": "usar"
      },
      {
        "t": 499.3,
        "foco": null
      }
    ],
    "kn-asociativa": [
      {
        "t": 507.02,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 510.73,
        "mostrar": [
          "svg"
        ],
        "foco": null
      },
      {
        "t": 514.27,
        "mostrar": [
          "rama"
        ],
        "foco": "rama",
        "clicEn": "css:g[data-lift]#1"
      },
      {
        "t": 519.91,
        "foco": "rama",
        "clicEn": "css:g[data-lift]#2"
      },
      {
        "t": 523.93,
        "foco": "rama",
        "clicEn": "css:g[data-lift]#3"
      },
      {
        "t": 528.37,
        "foco": "rama",
        "clicEn": "css:g[data-lift]#4"
      },
      {
        "t": 535.87,
        "mostrar": [
          "n:Las tres leyes de la asociación · David Hume, siglo XVIII"
        ],
        "foco": "n:Las tres leyes de la asociación · David Hume, siglo XVIII"
      },
      {
        "t": 558.93,
        "foco": null
      }
    ],
    "kn-priming": [
      {
        "t": 565.05,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 567.17,
        "mostrar": [
          "svg"
        ],
        "foco": null
      },
      {
        "t": 574.1,
        "mostrar": [
          "fila:Efecto Florida"
        ],
        "foco": null
      },
      {
        "t": 583.13,
        "mostrar": [
          "exp"
        ],
        "foco": "exp",
        "clicEn": "b:Efecto Florida"
      },
      {
        "t": 608,
        "foco": "exp",
        "clicEn": "b:El lápiz entre los dientes"
      },
      {
        "t": 626.1,
        "foco": "exp",
        "clicEn": "b:Primado del dinero"
      },
      {
        "t": 641.53,
        "foco": "exp",
        "clicEn": "b:La caja de la honestidad"
      },
      {
        "t": 652.97,
        "foco": "exp",
        "clicEn": "b:Efecto Lady Macbeth"
      },
      {
        "t": 666.47,
        "foco": null
      }
    ],
    "kn-facilidad": [
      {
        "t": 676.42,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 678.97,
        "mostrar": [
          "svg",
          "fila:Facilidad"
        ],
        "foco": null
      },
      {
        "t": 686.3,
        "mostrar": [
          "par"
        ],
        "foco": "par",
        "clicEn": "b:Facilidad"
      },
      {
        "t": 703.3,
        "foco": "par",
        "clicEn": "b:Tensión"
      },
      {
        "t": 718.77,
        "mostrar": [
          "n:El experimento estrella… que no resistió"
        ],
        "foco": "n:El experimento estrella… que no resistió"
      },
      {
        "t": 746.6,
        "foco": null
      }
    ],
    "kn-verdad": [
      {
        "t": 752.45,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 765.05,
        "mostrar": [
          "svg",
          "n:Mera exposición · Robert Zajonc"
        ],
        "foco": "n:Mera exposición · Robert Zajonc"
      },
      {
        "t": 791.71,
        "mostrar": [
          "n:Famosos de la noche a la mañana · Larry Jacoby"
        ],
        "foco": "n:Famosos de la noche a la mañana · Larry Jacoby"
      },
      {
        "t": 807.1,
        "mostrar": [
          "reglas"
        ],
        "foco": null
      },
      {
        "t": 811.57,
        "foco": "n:Maximiza la legibilidad"
      },
      {
        "t": 817.7,
        "foco": "n:Habla sencillo"
      },
      {
        "t": 824.7,
        "foco": "n:Si puedes, rima"
      },
      {
        "t": 834.2,
        "foco": "n:Cita fuentes pronunciables"
      },
      {
        "t": 842.9,
        "foco": null
      }
    ],
    "kn-causalidad": [
      {
        "t": 847.08,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 864.3,
        "mostrar": [
          "svg",
          "n:Ilusión de Moisés"
        ],
        "foco": "n:Ilusión de Moisés",
        "clicEn": "b~:Ilusión de Moisés"
      },
      {
        "t": 875.73,
        "mostrar": [
          "svg",
          "fila:Animar",
          "n:Causalidad física · Michotte"
        ],
        "foco": "n:Causalidad física · Michotte",
        "clicEn": "b~:Causalidad física"
      },
      {
        "t": 884.7,
        "mostrar": [
          "n:Causalidad intencional · Heider y Simmel"
        ],
        "foco": "n:Causalidad intencional · Heider y Simmel",
        "clicEn": "b~:Causalidad intencional"
      },
      {
        "t": 895,
        "mostrar": [
          "n:Titulares contradictorios"
        ],
        "foco": "n:Titulares contradictorios",
        "clicEn": "b~:Titulares contradictorios"
      },
      {
        "t": 904.37,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 918.07,
        "foco": null
      }
    ],
    "kn-sustitucion": [
      {
        "t": 926.26,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 939.13,
        "mostrar": [
          "svg"
        ],
        "foco": null,
        "clicEn": "b~:¿Debo invertir"
      },
      {
        "t": 946.26,
        "foco": null,
        "clicEn": "b~:¿Qué tan satisfecho"
      },
      {
        "t": 953.09,
        "foco": null,
        "clicEn": "b~:¿Cuánto merece"
      },
      {
        "t": 959.77,
        "foco": null,
        "clicEn": "b~:¿Llegará lejos"
      },
      {
        "t": 963.79,
        "mostrar": [
          "n:Dos aptitudes que lo hacen posible"
        ],
        "foco": "n:Dos aptitudes que lo hacen posible"
      },
      {
        "t": 985.5,
        "foco": null
      },
      {
        "t": 991.5,
        "foco": null
      }
    ],
    "kn-representatividad": [
      {
        "t": 997.3,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1018.23,
        "mostrar": [
          "svg",
          "fila:Solo el perfil"
        ],
        "foco": null
      },
      {
        "t": 1020.47,
        "mostrar": [
          "n:La sustitución, paso a paso"
        ],
        "foco": "n:La sustitución, paso a paso"
      },
      {
        "t": 1034.63,
        "mostrar": [
          "n:Lo que se ignora"
        ],
        "foco": "n:Lo que se ignora"
      },
      {
        "t": 1039.83,
        "foco": "n:Lo que se ignora",
        "clicEn": "b:Mostrar la tasa base"
      },
      {
        "t": 1053.83,
        "mostrar": [
          "costo"
        ],
        "foco": "costo"
      },
      {
        "t": 1067.07,
        "foco": null
      }
    ],
    "kn-disponibilidad": [
      {
        "t": 1074.85,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1083.3,
        "mostrar": [
          "svg"
        ],
        "foco": null
      },
      {
        "t": 1085.93,
        "mostrar": [
          "b~:Accidente de avión",
          "nota"
        ],
        "foco": "nota",
        "clicEn": "b~:Accidente de avión"
      },
      {
        "t": 1098.77,
        "mostrar": [
          "b~:Atentado terrorista"
        ],
        "foco": "nota",
        "clicEn": "b~:Atentado terrorista"
      },
      {
        "t": 1108.5,
        "mostrar": [
          "b~:Palabras que empiezan con K"
        ],
        "foco": "nota",
        "clicEn": "b~:Palabras que empiezan con K"
      },
      {
        "t": 1122.77,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 1132.27,
        "foco": null
      }
    ],
    "kn-afectiva": [
      {
        "t": 1138.02,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1143.27,
        "mostrar": [
          "svg",
          "fila:Cómo ocurre"
        ],
        "foco": null
      },
      {
        "t": 1154.27,
        "mostrar": [
          "n:El ejecutivo y las acciones de Ford"
        ],
        "foco": "n:El ejecutivo y las acciones de Ford"
      },
      {
        "t": 1170.63,
        "mostrar": [
          "n:Cómo detectarlo en una reunión"
        ],
        "foco": "n:Cómo detectarlo en una reunión"
      },
      {
        "t": 1184.17,
        "mostrar": [
          "cita"
        ],
        "foco": "cita"
      },
      {
        "t": 1191.73,
        "foco": null
      }
    ],
    "kn-halo": [
      {
        "t": 1201.98,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1207.33,
        "mostrar": [
          "fila:Alan",
          "chips"
        ],
        "foco": "chips"
      },
      {
        "t": 1221.97,
        "mostrar": [
          "testarudo"
        ],
        "foco": "testarudo",
        "clicEn": "b:Alan"
      },
      {
        "t": 1230.07,
        "foco": "testarudo",
        "clicEn": "b:Ben"
      },
      {
        "t": 1235.33,
        "mostrar": [
          "n:Qué está pasando"
        ],
        "foco": "n:Qué está pasando"
      },
      {
        "t": 1249.77,
        "mostrar": [
          "n:El antídoto · descorrelacionar los errores"
        ],
        "foco": "n:El antídoto · descorrelacionar los errores"
      },
      {
        "t": 1272.07,
        "mostrar": [
          "regla"
        ],
        "foco": "regla"
      },
      {
        "t": 1285.73,
        "foco": null
      }
    ],
    "kn-wysiati": [
      {
        "t": 1292.25,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1294.23,
        "mostrar": [
          "svg",
          "fila:Lo que ves"
        ],
        "foco": null
      },
      {
        "t": 1300.66,
        "foco": null
      },
      {
        "t": 1303.23,
        "mostrar": [
          "n:El juicio de una sola parte"
        ],
        "foco": "n:El juicio de una sola parte"
      },
      {
        "t": 1311.99,
        "foco": "n:El juicio de una sola parte"
      },
      {
        "t": 1331.03,
        "mostrar": [
          "n:Exceso de confianza",
          "n:Efectos marco",
          "n:Olvido de la tasa base"
        ],
        "foco": null
      },
      {
        "t": 1332.63,
        "foco": "n:Exceso de confianza"
      },
      {
        "t": 1339.63,
        "foco": "n:Efectos marco"
      },
      {
        "t": 1348.23,
        "foco": "n:Olvido de la tasa base"
      },
      {
        "t": 1357.71,
        "mostrar": [
          "desarma"
        ],
        "foco": "desarma"
      },
      {
        "t": 1363.28,
        "foco": null
      }
    ],
    "kn-basicas": [
      {
        "t": 1368.19,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1378.76,
        "mostrar": [
          "fila:Rostros y elecciones",
          "svg",
          "n:Alex Todorov · cara de competente"
        ],
        "foco": "n:Alex Todorov · cara de competente"
      },
      {
        "t": 1394.64,
        "mostrar": [
          "n:Dónde pega más fuerte"
        ],
        "foco": "n:Dónde pega más fuerte"
      },
      {
        "t": 1405.14,
        "mostrar": [
          "aves"
        ],
        "foco": "aves",
        "clicEn": "b:Cuántas aves salvar"
      },
      {
        "t": 1424.44,
        "mostrar": [
          "n:Promedios sí, sumas no"
        ],
        "foco": "n:Promedios sí, sumas no"
      },
      {
        "t": 1438.85,
        "mostrar": [
          "porEso"
        ],
        "foco": "porEso"
      },
      {
        "t": 1445.54,
        "foco": null
      }
    ],
    "kn-replicacion": [
      {
        "t": 1454.26,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1465.91,
        "mostrar": [
          "cols"
        ],
        "foco": "cols",
        "clicEn": "b~:Resiste bien"
      },
      {
        "t": 1490.14,
        "foco": "cols",
        "clicEn": "b~:En disputa"
      },
      {
        "t": 1508.11,
        "foco": "cols",
        "clicEn": "b~:No replicó"
      },
      {
        "t": 1522.54,
        "mostrar": [
          "n:Lo que hizo el propio Kahneman"
        ],
        "foco": "n:Lo que hizo el propio Kahneman"
      },
      {
        "t": 1543.48,
        "mostrar": [
          "n:Cómo leer esto sin tirar el libro"
        ],
        "foco": "n:Cómo leer esto sin tirar el libro"
      },
      {
        "t": 1560.28,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 1568.11,
        "foco": null
      }
    ],
    "kn-vocabulario": [
      {
        "t": 1575.26,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1591.58,
        "mostrar": [
          "fila:Facilidad cognitiva",
          "frase"
        ],
        "foco": null
      },
      {
        "t": 1593.94,
        "foco": "frase",
        "clicEn": "b:Facilidad cognitiva"
      },
      {
        "t": 1602.38,
        "foco": "frase",
        "clicEn": "b:Efecto halo"
      },
      {
        "t": 1607.27,
        "foco": "frase",
        "clicEn": "b:WYSIATI"
      },
      {
        "t": 1615.58,
        "foco": "frase",
        "clicEn": "b:Sustitución de preguntas"
      },
      {
        "t": 1620.78,
        "foco": "frase",
        "clicEn": "b:Tasa base"
      },
      {
        "t": 1628.11,
        "foco": "frase",
        "clicEn": "b:Descorrelacionar errores"
      },
      {
        "t": 1632.04,
        "mostrar": [
          "n:Por qué funciona mejor con los demás"
        ],
        "foco": "n:Por qué funciona mejor con los demás"
      },
      {
        "t": 1650.44,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 1658.48,
        "foco": null
      }
    ],
    "kn-cierre": [
      {
        "t": 1663.99,
        "mostrar": [
          "css:svg",
          "css:p.uppercase"
        ],
        "foco": null
      },
      {
        "t": 1666.68,
        "mostrar": [
          "css:h2"
        ],
        "foco": null
      },
      {
        "t": 1670.74,
        "mostrar": [
          "css:div.flex-wrap > span#1"
        ],
        "foco": null
      },
      {
        "t": 1672.78,
        "mostrar": [
          "css:div.flex-wrap > span#2"
        ],
        "foco": null
      },
      {
        "t": 1674.48,
        "mostrar": [
          "css:div.flex-wrap > span#3"
        ],
        "foco": null
      },
      {
        "t": 1676.71,
        "mostrar": [
          "css:div.flex-wrap > span#4"
        ],
        "foco": null
      },
      {
        "t": 1678.94,
        "mostrar": [
          "css:div.flex-wrap > span#5"
        ],
        "foco": null
      },
      {
        "t": 1682.09,
        "mostrar": [
          "css:div.flex-wrap > span#6"
        ],
        "foco": null
      },
      {
        "t": 1683.64,
        "mostrar": [
          "css:div.flex-wrap > span#7"
        ],
        "foco": null
      },
      {
        "t": 1686.68,
        "mostrar": [
          "css:div.flex-wrap > span#8"
        ],
        "foco": null
      },
      {
        "t": 1691.81,
        "mostrar": [
          "css:div.flex-wrap > span#9"
        ],
        "foco": null
      },
      {
        "t": 1694.28,
        "mostrar": [
          "css:p.max-w-3xl"
        ],
        "foco": "css:p.max-w-3xl"
      },
      {
        "t": 1705.18,
        "foco": null
      }
    ]
  },
};
