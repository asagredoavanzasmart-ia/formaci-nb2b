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
      "id": "kn-representatividad",
      "t": 924.92
    },
    {
      "id": "kn-disponibilidad",
      "t": 971.98
    },
    {
      "id": "kn-afectiva",
      "t": 1035.15
    },
    {
      "id": "kn-header-sesgos",
      "t": 1096.45
    },
    {
      "id": "kn-halo",
      "t": 1099.12
    },
    {
      "id": "kn-wysiati",
      "t": 1189.18
    },
    {
      "id": "kn-basicas",
      "t": 1202.32
    },
    {
      "id": "kn-header-critico",
      "t": 1285.78
    },
    {
      "id": "kn-replicacion",
      "t": 1288.38
    },
    {
      "id": "kn-vocabulario",
      "t": 1409.38
    },
    {
      "id": "kn-cierre",
      "t": 1498.12
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
    "kn-representatividad": [
      {
        "t": 925.22,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 926.51,
        "mostrar": [
          "svg",
          "fila:Solo el perfil"
        ],
        "foco": null
      },
      {
        "t": 929.2,
        "mostrar": [
          "n:La sustitución, paso a paso"
        ],
        "foco": "n:La sustitución, paso a paso"
      },
      {
        "t": 938.93,
        "mostrar": [
          "n:Lo que se ignora"
        ],
        "foco": "n:Lo que se ignora"
      },
      {
        "t": 944.57,
        "foco": "n:Lo que se ignora",
        "clicEn": "b:Mostrar la tasa base"
      },
      {
        "t": 953.27,
        "mostrar": [
          "costo"
        ],
        "foco": "costo"
      },
      {
        "t": 963.87,
        "foco": null
      }
    ],
    "kn-disponibilidad": [
      {
        "t": 972.28,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 980.73,
        "mostrar": [
          "svg"
        ],
        "foco": null
      },
      {
        "t": 983.37,
        "mostrar": [
          "b~:Accidente de avión",
          "nota"
        ],
        "foco": "nota",
        "clicEn": "b~:Accidente de avión"
      },
      {
        "t": 996.2,
        "mostrar": [
          "b~:Atentado terrorista"
        ],
        "foco": "nota",
        "clicEn": "b~:Atentado terrorista"
      },
      {
        "t": 1005.93,
        "mostrar": [
          "b~:Palabras que empiezan con K"
        ],
        "foco": "nota",
        "clicEn": "b~:Palabras que empiezan con K"
      },
      {
        "t": 1020.2,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 1029.7,
        "foco": null
      }
    ],
    "kn-afectiva": [
      {
        "t": 1035.45,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1040.7,
        "mostrar": [
          "svg",
          "fila:Cómo ocurre"
        ],
        "foco": null
      },
      {
        "t": 1051.7,
        "mostrar": [
          "n:El ejecutivo y las acciones de Ford"
        ],
        "foco": "n:El ejecutivo y las acciones de Ford"
      },
      {
        "t": 1068.07,
        "mostrar": [
          "n:Cómo detectarlo en una reunión"
        ],
        "foco": "n:Cómo detectarlo en una reunión"
      },
      {
        "t": 1081.6,
        "mostrar": [
          "cita"
        ],
        "foco": "cita"
      },
      {
        "t": 1089.17,
        "foco": null
      }
    ],
    "kn-halo": [
      {
        "t": 1099.42,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1104.76,
        "mostrar": [
          "fila:Alan",
          "chips"
        ],
        "foco": "chips"
      },
      {
        "t": 1119.4,
        "mostrar": [
          "testarudo"
        ],
        "foco": "testarudo",
        "clicEn": "b:Alan"
      },
      {
        "t": 1127.5,
        "foco": "testarudo",
        "clicEn": "b:Ben"
      },
      {
        "t": 1132.77,
        "mostrar": [
          "n:Qué está pasando"
        ],
        "foco": "n:Qué está pasando"
      },
      {
        "t": 1147.2,
        "mostrar": [
          "n:El antídoto · descorrelacionar los errores"
        ],
        "foco": "n:El antídoto · descorrelacionar los errores"
      },
      {
        "t": 1169.5,
        "mostrar": [
          "regla"
        ],
        "foco": "regla"
      },
      {
        "t": 1183.17,
        "foco": null
      }
    ],
    "kn-wysiati": [
      {
        "t": 1189.48,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1000000,
        "mostrar": [
          "svg",
          "fila:Lo que ves",
          "n:El juicio de una sola parte",
          "n:Exceso de confianza",
          "n:Efectos marco",
          "n:Olvido de la tasa base"
        ],
        "foco": null
      },
      {
        "t": 1192.13,
        "mostrar": [
          "desarma"
        ],
        "foco": "desarma"
      },
      {
        "t": 1197.7,
        "foco": null
      }
    ],
    "kn-basicas": [
      {
        "t": 1202.62,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1213.18,
        "mostrar": [
          "fila:Rostros y elecciones",
          "svg",
          "n:Alex Todorov · cara de competente"
        ],
        "foco": "n:Alex Todorov · cara de competente"
      },
      {
        "t": 1229.07,
        "mostrar": [
          "n:Dónde pega más fuerte"
        ],
        "foco": "n:Dónde pega más fuerte"
      },
      {
        "t": 1239.57,
        "mostrar": [
          "aves"
        ],
        "foco": "aves",
        "clicEn": "b:Cuántas aves salvar"
      },
      {
        "t": 1258.87,
        "mostrar": [
          "n:Promedios sí, sumas no"
        ],
        "foco": "n:Promedios sí, sumas no"
      },
      {
        "t": 1273.27,
        "mostrar": [
          "porEso"
        ],
        "foco": "porEso"
      },
      {
        "t": 1279.97,
        "foco": null
      }
    ],
    "kn-replicacion": [
      {
        "t": 1288.68,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1300.33,
        "mostrar": [
          "cols"
        ],
        "foco": "cols",
        "clicEn": "b~:Resiste bien"
      },
      {
        "t": 1324.57,
        "foco": "cols",
        "clicEn": "b~:En disputa"
      },
      {
        "t": 1342.53,
        "foco": "cols",
        "clicEn": "b~:No replicó"
      },
      {
        "t": 1356.97,
        "mostrar": [
          "n:Lo que hizo el propio Kahneman"
        ],
        "foco": "n:Lo que hizo el propio Kahneman"
      },
      {
        "t": 1377.9,
        "mostrar": [
          "n:Cómo leer esto sin tirar el libro"
        ],
        "foco": "n:Cómo leer esto sin tirar el libro"
      },
      {
        "t": 1394.7,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 1402.53,
        "foco": null
      }
    ],
    "kn-vocabulario": [
      {
        "t": 1409.68,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1426,
        "mostrar": [
          "fila:Facilidad cognitiva",
          "frase"
        ],
        "foco": null
      },
      {
        "t": 1428.37,
        "foco": "frase",
        "clicEn": "b:Facilidad cognitiva"
      },
      {
        "t": 1436.8,
        "foco": "frase",
        "clicEn": "b:Efecto halo"
      },
      {
        "t": 1441.69,
        "foco": "frase",
        "clicEn": "b:WYSIATI"
      },
      {
        "t": 1450,
        "foco": "frase",
        "clicEn": "b:Sustitución de preguntas"
      },
      {
        "t": 1455.2,
        "foco": "frase",
        "clicEn": "b:Tasa base"
      },
      {
        "t": 1462.53,
        "foco": "frase",
        "clicEn": "b:Descorrelacionar errores"
      },
      {
        "t": 1466.47,
        "mostrar": [
          "n:Por qué funciona mejor con los demás"
        ],
        "foco": "n:Por qué funciona mejor con los demás"
      },
      {
        "t": 1484.87,
        "mostrar": [
          "footer"
        ],
        "foco": "footer"
      },
      {
        "t": 1492.9,
        "foco": null
      }
    ],
    "kn-cierre": [
      {
        "t": 1498.42,
        "mostrar": [
          "css:svg",
          "css:p.uppercase"
        ],
        "foco": null
      },
      {
        "t": 1501.1,
        "mostrar": [
          "css:h2"
        ],
        "foco": null
      },
      {
        "t": 1505.17,
        "mostrar": [
          "css:div.flex-wrap > span#1"
        ],
        "foco": null
      },
      {
        "t": 1507.2,
        "mostrar": [
          "css:div.flex-wrap > span#2"
        ],
        "foco": null
      },
      {
        "t": 1508.9,
        "mostrar": [
          "css:div.flex-wrap > span#3"
        ],
        "foco": null
      },
      {
        "t": 1511.13,
        "mostrar": [
          "css:div.flex-wrap > span#4"
        ],
        "foco": null
      },
      {
        "t": 1513.37,
        "mostrar": [
          "css:div.flex-wrap > span#5"
        ],
        "foco": null
      },
      {
        "t": 1516.51,
        "mostrar": [
          "css:div.flex-wrap > span#6"
        ],
        "foco": null
      },
      {
        "t": 1518.07,
        "mostrar": [
          "css:div.flex-wrap > span#7"
        ],
        "foco": null
      },
      {
        "t": 1521.1,
        "mostrar": [
          "css:div.flex-wrap > span#8"
        ],
        "foco": null
      },
      {
        "t": 1526.24,
        "mostrar": [
          "css:div.flex-wrap > span#9"
        ],
        "foco": null
      },
      {
        "t": 1528.7,
        "mostrar": [
          "css:p.max-w-3xl"
        ],
        "foco": "css:p.max-w-3xl"
      },
      {
        "t": 1539.6,
        "foco": null
      }
    ]
  },
};
