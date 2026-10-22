import audio from '../audios_clase/pagar-para-vender-mejor.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «Pagar para vender mejor»: audio completo + tiempo de inicio de cada diapositiva
 * + marcas por elemento (mostrar, resaltar, apuntar con la flecha y simular clic).
 * Generado desde el audio y sus subtítulos; los tiempos están en segundos.
 */
export const guiadoCompensacion: GuiadoClase = {
  audio,
  /** Tramos (segundos) que se saltan: instrucciones de voz que quedaron en el audio. */
  saltar: [{"a":0,"b":18.85},{"a":96.61,"b":98.99},{"a":213.87,"b":222.1},{"a":341.47,"b":346.05},{"a":458.28,"b":466.47},{"a":465.33,"b":469.02},{"a":574.07,"b":577.92},{"a":685.4,"b":689.84},{"a":777.33,"b":782.55},{"a":891.53,"b":895.73},{"a":993.17,"b":997.39},{"a":1166.07,"b":1170.69},{"a":1252.26,"b":1257.25},{"a":1353.23,"b":1357.32},{"a":1441.06,"b":1447.05},{"a":1550.57,"b":1551.91},{"a":1664.67,"b":1670.29},{"a":1773.58,"b":1779.12},{"a":1874.56,"b":1877.42},{"a":1874.77,"b":1883.67},{"a":1982.87,"b":1987.05},{"a":2096.57,"b":2101.52}],
  /** Tramos (segundos) con el volumen en cero, sin detener el audio: menciones de «página N». */
  silenciar: [{"a":13.43,"b":14.77},{"a":222.27,"b":223.49},{"a":341.67,"b":342.97},{"a":465.53,"b":466.88},{"a":574.27,"b":575.57},{"a":685.6,"b":686.81},{"a":777.53,"b":778.89},{"a":891.73,"b":893},{"a":993.37,"b":994.68},{"a":1166.27,"b":1167.64},{"a":1252.11,"b":1253.5},{"a":1353.33,"b":1354.76},{"a":1441.26,"b":1442.7},{"a":1550.77,"b":1552.19},{"a":1664.87,"b":1666.4},{"a":1773.78,"b":1775.2},{"a":1983.07,"b":1984.4},{"a":2096.77,"b":2098.24}],
  slides: [
    {
      "id": "cc-slide-0",
      "t": 0
    },
    {
      "id": "cc-header-dinero",
      "t": 94.02
    },
    {
      "id": "cc-cantidad",
      "t": 96.18
    },
    {
      "id": "cc-magnitud",
      "t": 222.27
    },
    {
      "id": "cc-intrinseca",
      "t": 341.67
    },
    {
      "id": "cc-segmentos",
      "t": 465.53
    },
    {
      "id": "cc-topes",
      "t": 574.27
    },
    {
      "id": "cc-ritmo",
      "t": 685.6
    },
    {
      "id": "cc-umbral",
      "t": 777.53
    },
    {
      "id": "cc-cuotas",
      "t": 891.73
    },
    {
      "id": "cc-perdida",
      "t": 993.37
    },
    {
      "id": "cc-sorting",
      "t": 1080.15
    },
    {
      "id": "cc-torneos",
      "t": 1166.27
    },
    {
      "id": "cc-equipo",
      "t": 1252.11
    },
    {
      "id": "cc-contingencia",
      "t": 1353.33
    },
    {
      "id": "cc-triada",
      "t": 1441.26
    },
    {
      "id": "cc-metas",
      "t": 1550.77
    },
    {
      "id": "cc-rol",
      "t": 1664.87
    },
    {
      "id": "cc-bmt",
      "t": 1773.78
    },
    {
      "id": "cc-solidez",
      "t": 1874.52
    },
    {
      "id": "cc-leer",
      "t": 1983.07
    },
    {
      "id": "cc-diagnostico",
      "t": 2096.77
    }
  ],
  cues: {
    "cc-slide-0": [
      {
        "t": 0,
        "mostrar": [
          "svg",
          "css:h1"
        ],
        "foco": null
      },
      {
        "t": 23.57,
        "mostrar": [
          "css:p.uppercase"
        ],
        "foco": null
      },
      {
        "t": 41.87,
        "mostrar": [
          "css:p.max-w-3xl"
        ],
        "foco": "css:p.max-w-3xl"
      },
      {
        "t": 69.5,
        "foco": null
      }
    ],
    "cc-cantidad": [
      {
        "t": 98.19,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 112.37,
        "mostrar": [
          "grafico",
          "sello"
        ],
        "foco": "grafico"
      },
      {
        "t": 124.37,
        "foco": "barra:1"
      },
      {
        "t": 130.77,
        "foco": "barra:2"
      },
      {
        "t": 149.73,
        "mostrar": [
          "por-que"
        ],
        "foco": "por-que"
      },
      {
        "t": 172.1,
        "mostrar": [
          "que-hacer"
        ],
        "foco": "que-hacer"
      },
      {
        "t": 185.57,
        "mostrar": [
          "reciente"
        ],
        "foco": "reciente"
      },
      {
        "t": 207.3,
        "mostrar": [
          "fuente"
        ],
        "foco": null
      }
    ],
    "cc-magnitud": [
      {
        "t": 222.27,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 238.3,
        "mostrar": [
          "pills",
          "grafico",
          "detalle"
        ],
        "foco": "detalle",
        "clicEn": "pill-condly"
      },
      {
        "t": 254.1,
        "foco": "detalle",
        "clicEn": "pill-stajkovic"
      },
      {
        "t": 279.67,
        "mostrar": [
          "cifras",
          "nota-45",
          "sello"
        ],
        "foco": "nota-45"
      },
      {
        "t": 301.4,
        "foco": "detalle",
        "clicEn": "pill-tarea"
      },
      {
        "t": 332.23,
        "foco": null
      }
    ],
    "cc-intrinseca": [
      {
        "t": 346.05,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 367.43,
        "mostrar": [
          "n:Weibel y cols. · 2010"
        ],
        "foco": "n:Weibel y cols. · 2010"
      },
      {
        "t": 378.6,
        "mostrar": [
          "n:Dos metaanálisis, dos conclusiones"
        ],
        "foco": "n:Dos metaanálisis, dos conclusiones"
      },
      {
        "t": 387.4,
        "mostrar": [
          "n:Kim, Gerhart y Fang · 2022"
        ],
        "foco": "n:Kim, Gerhart y Fang · 2022"
      },
      {
        "t": 399.2,
        "mostrar": [
          "n:Kim, Gerhart y Fang · 2022#2"
        ],
        "foco": "n:Kim, Gerhart y Fang · 2022#2"
      },
      {
        "t": 407.37,
        "mostrar": [
          "n:Por qué se pensó lo contrario"
        ],
        "foco": "n:Por qué se pensó lo contrario"
      },
      {
        "t": 423.8,
        "mostrar": [
          "n:La salvedad que se mantiene"
        ],
        "foco": "n:La salvedad que se mantiene"
      },
      {
        "t": 436.9,
        "foco": null
      }
    ],
    "cc-segmentos": [
      {
        "t": 469.02,
        "mostrar": [
          "titulo",
          "svg"
        ],
        "foco": null
      },
      {
        "t": 482.9,
        "mostrar": [
          "fila:Rezagados"
        ],
        "foco": "svg"
      },
      {
        "t": 507.77,
        "mostrar": [
          "n~:Cómo se comportan",
          "n:Qué palanca del contrato les sirve"
        ],
        "foco": "n~:Cómo se comportan",
        "clicEn": "b:Rezagados"
      },
      {
        "t": 522.53,
        "foco": "n~:Cómo se comportan",
        "clicEn": "b:Núcleo"
      },
      {
        "t": 539.97,
        "foco": "n~:Cómo se comportan",
        "clicEn": "b:Estrellas"
      },
      {
        "t": 552.93,
        "foco": null
      }
    ],
    "cc-topes": [
      {
        "t": 577.92,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 591.47,
        "mostrar": [
          "pills",
          "grafico"
        ],
        "foco": "grafico"
      },
      {
        "t": 601.87,
        "mostrar": [
          "campos"
        ],
        "foco": "campos"
      },
      {
        "t": 610.7,
        "foco": "grafico",
        "clicEn": "pill-tope"
      },
      {
        "t": 618.9,
        "foco": "grafico",
        "clicEn": "pill-acel"
      },
      {
        "t": 627.27,
        "foco": "barra:4"
      },
      {
        "t": 631,
        "foco": "barra:2"
      },
      {
        "t": 638.67,
        "mostrar": [
          "nota-tope"
        ],
        "foco": "nota-tope"
      },
      {
        "t": 648.93,
        "mostrar": [
          "nota-acel"
        ],
        "foco": "nota-acel"
      },
      {
        "t": 658.7,
        "mostrar": [
          "nota-estudio",
          "sello"
        ],
        "foco": "nota-estudio"
      },
      {
        "t": 680.2,
        "foco": null
      }
    ],
    "cc-ritmo": [
      {
        "t": 689.84,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 702.9,
        "mostrar": [
          "svg",
          "fila:Solo cuota anual"
        ],
        "foco": "svg"
      },
      {
        "t": 706.39,
        "foco": "svg",
        "clicEn": "b:Solo cuota anual"
      },
      {
        "t": 713.93,
        "foco": "svg",
        "clicEn": "b:Con hitos trimestrales"
      },
      {
        "t": 720.1,
        "mostrar": [
          "n:Rezagados · el riesgo de rendirse"
        ],
        "foco": "n:Rezagados · el riesgo de rendirse"
      },
      {
        "t": 732.87,
        "mostrar": [
          "n:Bonos trimestrales"
        ],
        "foco": "n:Bonos trimestrales"
      },
      {
        "t": 744.1,
        "mostrar": [
          "n:Núcleo · metas de varios niveles"
        ],
        "foco": "n:Núcleo · metas de varios niveles"
      },
      {
        "t": 759.4,
        "foco": null
      }
    ],
    "cc-umbral": [
      {
        "t": 781.85,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 792.67,
        "mostrar": [
          "svg",
          "fila:Todo o nada al 100 %"
        ],
        "foco": "svg"
      },
      {
        "t": 797.87,
        "foco": "svg",
        "clicEn": "b:Todo o nada al 100 %"
      },
      {
        "t": 803.59,
        "foco": "barra:4"
      },
      {
        "t": 807.5,
        "foco": "svg",
        "clicEn": "b:Lineal desde 70 %"
      },
      {
        "t": 811.67,
        "foco": "barra:2"
      },
      {
        "t": 814.57,
        "foco": "barra:3"
      },
      {
        "t": 815.94,
        "foco": "barra:4"
      },
      {
        "t": 820,
        "mostrar": [
          "n:El experimento"
        ],
        "foco": "n:El experimento"
      },
      {
        "t": 840.5,
        "mostrar": [
          "n:La comparación"
        ],
        "foco": "n:La comparación"
      },
      {
        "t": 860.17,
        "mostrar": [
          "n:El otro riesgo"
        ],
        "foco": "n:El otro riesgo"
      },
      {
        "t": 873.5,
        "foco": null
      }
    ],
    "cc-cuotas": [
      {
        "t": 895.73,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 910.3,
        "mostrar": [
          "svg",
          "fila:Cuota idéntica",
          "campos",
          "n:Qué muestra el ejemplo"
        ],
        "foco": "svg"
      },
      {
        "t": 919.73,
        "foco": "svg",
        "clicEn": "b:Cuota idéntica"
      },
      {
        "t": 921.27,
        "foco": "barra:1"
      },
      {
        "t": 925.9,
        "foco": "barra:2"
      },
      {
        "t": 928.73,
        "foco": "svg",
        "clicEn": "b:Cuota normalizada"
      },
      {
        "t": 946.4,
        "mostrar": [
          "n:Teoría de la equidad"
        ],
        "foco": "n:Teoría de la equidad"
      },
      {
        "t": 964.97,
        "mostrar": [
          "n:Cómo calibrar"
        ],
        "foco": "n:Cómo calibrar"
      },
      {
        "t": 975.33,
        "foco": null
      }
    ],
    "cc-perdida": [
      {
        "t": 996.59,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1007.77,
        "mostrar": [
          "svg",
          "fila:Bono al final (ganancia)",
          "n:Los conceptos detrás"
        ],
        "foco": "n:Los conceptos detrás"
      },
      {
        "t": 1021.37,
        "foco": "svg",
        "clicEn": "b:Bono al final (ganancia)"
      },
      {
        "t": 1024.67,
        "foco": "svg",
        "clicEn": "b:Bono adelantado (pérdida)"
      },
      {
        "t": 1031.07,
        "mostrar": [
          "n:El experimento"
        ],
        "foco": "n:El experimento"
      },
      {
        "t": 1046.07,
        "mostrar": [
          "n:Con encuadre de pérdida"
        ],
        "foco": "n:Con encuadre de pérdida"
      },
      {
        "t": 1054.39,
        "mostrar": [
          "n:Con bono estándar"
        ],
        "foco": "n:Con bono estándar"
      },
      {
        "t": 1059.87,
        "foco": null
      }
    ],
    "cc-sorting": [
      {
        "t": 1080.15,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1081,
        "mostrar": [
          "n:El caso Safelite",
          "svg",
          "fila:Efecto incentivo"
        ],
        "foco": "n:El caso Safelite"
      },
      {
        "t": 1097.6,
        "foco": "svg",
        "clicEn": "b:Efecto incentivo"
      },
      {
        "t": 1103,
        "foco": "svg",
        "clicEn": "b:Efecto ordenamiento"
      },
      {
        "t": 1109.6,
        "mostrar": [
          "n:Lo que confirmó el laboratorio"
        ],
        "foco": "n:Lo que confirmó el laboratorio"
      },
      {
        "t": 1137.67,
        "foco": null
      }
    ],
    "cc-torneos": [
      {
        "t": 1169.89,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1182.6,
        "mostrar": [
          "svg",
          "fila:Ranking: gana solo el primero"
        ],
        "foco": "svg"
      },
      {
        "t": 1184.1,
        "foco": "svg",
        "clicEn": "b:Ranking: gana solo el primero"
      },
      {
        "t": 1191.3,
        "foco": "svg",
        "clicEn": "b:Estándar absoluto o bono de equipo"
      },
      {
        "t": 1197.97,
        "mostrar": [
          "n:La lógica del torneo"
        ],
        "foco": "n:La lógica del torneo"
      },
      {
        "t": 1211.99,
        "mostrar": [
          "n:Qué incentiva"
        ],
        "foco": "n:Qué incentiva"
      },
      {
        "t": 1222.93,
        "mostrar": [
          "n:Qué cambia con un estándar absoluto"
        ],
        "foco": "n:Qué cambia con un estándar absoluto"
      },
      {
        "t": 1233,
        "foco": null
      }
    ],
    "cc-equipo": [
      {
        "t": 1256.45,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1266.17,
        "mostrar": [
          "svg"
        ],
        "foco": "svg"
      },
      {
        "t": 1276.17,
        "foco": "barra:1"
      },
      {
        "t": 1283.3,
        "foco": "barra:2"
      },
      {
        "t": 1288.27,
        "mostrar": [
          "n:Qué es la g de Hedges"
        ],
        "foco": "n:Qué es la g de Hedges"
      },
      {
        "t": 1302.27,
        "mostrar": [
          "lecturas",
          "fila:Reparto por aporte",
          "n:Reparto por aporte"
        ],
        "foco": "fila:Reparto por aporte"
      },
      {
        "t": 1303.9,
        "foco": "fila:Reparto por aporte",
        "clicEn": "b:Reparto por aporte"
      },
      {
        "t": 1314.8,
        "foco": "fila:Reparto por aporte",
        "clicEn": "b:Tamaño y composición"
      },
      {
        "t": 1325.3,
        "foco": "fila:Reparto por aporte",
        "clicEn": "b:Otra revisión coincide"
      },
      {
        "t": 1335.77,
        "foco": null
      }
    ],
    "cc-contingencia": [
      {
        "t": 1357.32,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1367.67,
        "mostrar": [
          "svg",
          "fila:El mismo día"
        ],
        "foco": "svg"
      },
      {
        "t": 1375.64,
        "foco": "svg",
        "clicEn": "b:El mismo día"
      },
      {
        "t": 1378.34,
        "foco": "svg",
        "clicEn": "b:Quincenal"
      },
      {
        "t": 1380.3,
        "foco": "svg",
        "clicEn": "b:Mensual"
      },
      {
        "t": 1381.05,
        "foco": "svg",
        "clicEn": "b:Trimestral"
      },
      {
        "t": 1383.47,
        "foco": "svg",
        "clicEn": "b:Anual"
      },
      {
        "t": 1385.17,
        "mostrar": [
          "n:1 · Contingencia"
        ],
        "foco": "n:1 · Contingencia"
      },
      {
        "t": 1397.18,
        "mostrar": [
          "n:2 · Inmediatez"
        ],
        "foco": "n:2 · Inmediatez"
      },
      {
        "t": 1416.07,
        "mostrar": [
          "n:3 · Saciación"
        ],
        "foco": "n:3 · Saciación"
      },
      {
        "t": 1427.9,
        "foco": null
      }
    ],
    "cc-triada": [
      {
        "t": 1446.65,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1460.37,
        "mostrar": [
          "svg",
          "n:El experimento de 2001"
        ],
        "foco": "svg"
      },
      {
        "t": 1468.45,
        "foco": "barra:1"
      },
      {
        "t": 1471.48,
        "foco": "barra:2"
      },
      {
        "t": 1481.07,
        "foco": "barra:3"
      },
      {
        "t": 1483.43,
        "foco": "barra:4"
      },
      {
        "t": 1486.79,
        "mostrar": [
          "n:Mejora media global",
          "n:Conclusión del metaanálisis"
        ],
        "foco": "n:Mejora media global"
      },
      {
        "t": 1510.47,
        "mostrar": [
          "n:Una réplica en Corea"
        ],
        "foco": "n:Una réplica en Corea"
      },
      {
        "t": 1529.9,
        "foco": null
      }
    ],
    "cc-metas": [
      {
        "t": 1551.81,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1562.87,
        "mostrar": [
          "svg",
          "fila:Meta vaga",
          "detalle"
        ],
        "foco": "svg"
      },
      {
        "t": 1564.27,
        "foco": "svg",
        "clicEn": "b:Meta vaga"
      },
      {
        "t": 1573.13,
        "foco": "svg",
        "clicEn": "b:Meta específica y difícil"
      },
      {
        "t": 1595.33,
        "mostrar": [
          "n:Más difícil, más rendimiento"
        ],
        "foco": "n:Más difícil, más rendimiento"
      },
      {
        "t": 1622.62,
        "foco": "svg",
        "clicEn": "b:Con retroalimentación"
      },
      {
        "t": 1645.13,
        "foco": null
      }
    ],
    "cc-rol": [
      {
        "t": 1669.49,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1682.73,
        "mostrar": [
          "svg",
          "fila:Rol claro"
        ],
        "foco": "svg",
        "clicEn": "b:Rol claro"
      },
      {
        "t": 1686.7,
        "foco": "svg",
        "clicEn": "b:Rol ambiguo"
      },
      {
        "t": 1690.6,
        "mostrar": [
          "n:Ambigüedad de rol",
          "n:Ambigüedad de rol#2"
        ],
        "foco": "n:Ambigüedad de rol#2"
      },
      {
        "t": 1718.75,
        "mostrar": [
          "n:Autoeficacia",
          "n:Autoeficacia#2"
        ],
        "foco": "n:Autoeficacia#2"
      },
      {
        "t": 1742.7,
        "foco": null
      }
    ],
    "cc-bmt": [
      {
        "t": 1778.32,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1792.2,
        "mostrar": [
          "svg"
        ],
        "foco": "svg"
      },
      {
        "t": 1796.7,
        "mostrar": [
          "b~:Describir la conducta"
        ],
        "foco": "b~:Describir la conducta",
        "clicEn": "b~:Describir la conducta"
      },
      {
        "t": 1808.53,
        "mostrar": [
          "b~:Modelar"
        ],
        "foco": "b~:Modelar",
        "clicEn": "b~:Modelar"
      },
      {
        "t": 1815.13,
        "mostrar": [
          "b~:Practicar"
        ],
        "foco": "b~:Practicar",
        "clicEn": "b~:Practicar"
      },
      {
        "t": 1820,
        "mostrar": [
          "b~:Recibir retroalimentación"
        ],
        "foco": "b~:Recibir retroalimentación",
        "clicEn": "b~:Recibir retroalimentación"
      },
      {
        "t": 1826.2,
        "mostrar": [
          "b~:Transferir al puesto"
        ],
        "foco": "b~:Transferir al puesto",
        "clicEn": "b~:Transferir al puesto"
      },
      {
        "t": 1831.8,
        "mostrar": [
          "n:Qué encontró el metaanálisis"
        ],
        "foco": "n:Qué encontró el metaanálisis"
      },
      {
        "t": 1854.4,
        "foco": null
      }
    ],
    "cc-solidez": [
      {
        "t": 1877.12,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1885.65,
        "mostrar": [
          "fila:Metaanálisis",
          "nota",
          "css:div.content-center"
        ],
        "foco": "fila:Metaanálisis",
        "clicEn": "b~:Metaanálisis"
      },
      {
        "t": 1917.07,
        "foco": "fila:Metaanálisis",
        "clicEn": "b~:Campo"
      },
      {
        "t": 1939.53,
        "foco": "fila:Metaanálisis",
        "clicEn": "b~:Laboratorio"
      },
      {
        "t": 1954.17,
        "foco": "fila:Metaanálisis",
        "clicEn": "b~:Teoría"
      },
      {
        "t": 1968.97,
        "foco": null
      }
    ],
    "cc-leer": [
      {
        "t": 1987.05,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 1996.6,
        "mostrar": [
          "b~:¿Cuántos estudios hay detrás?",
          "n:La pregunta",
          "n:Qué hacer"
        ],
        "foco": "n:La pregunta",
        "clicEn": "b~:¿Cuántos estudios hay detrás?"
      },
      {
        "t": 2010.57,
        "mostrar": [
          "b~:¿A quiénes se estudió?"
        ],
        "foco": "n:La pregunta",
        "clicEn": "b~:¿A quiénes se estudió?"
      },
      {
        "t": 2023.6,
        "mostrar": [
          "b~:¿Laboratorio o campo?"
        ],
        "foco": "n:La pregunta",
        "clicEn": "b~:¿Laboratorio o campo?"
      },
      {
        "t": 2039.4,
        "mostrar": [
          "b~:¿Se midió cantidad o calidad?"
        ],
        "foco": "n:La pregunta",
        "clicEn": "b~:¿Se midió cantidad o calidad?"
      },
      {
        "t": 2054.07,
        "mostrar": [
          "b~:¿Cómo se expresa el efecto?"
        ],
        "foco": "n:La pregunta",
        "clicEn": "b~:¿Cómo se expresa el efecto?"
      },
      {
        "t": 2070.37,
        "mostrar": [
          "b~:¿Con qué se comparó?"
        ],
        "foco": "n:La pregunta",
        "clicEn": "b~:¿Con qué se comparó?"
      },
      {
        "t": 2089.57,
        "foco": null
      }
    ],
    "cc-diagnostico": [
      {
        "t": 2100.72,
        "mostrar": [
          "titulo"
        ],
        "foco": null
      },
      {
        "t": 2110.47,
        "mostrar": [
          "b~:Tiene un tope de comisión",
          "n:Señales marcadas",
          "correcciones"
        ],
        "foco": "n:Señales marcadas",
        "clicEn": "b~:Tiene un tope de comisión"
      },
      {
        "t": 2120.67,
        "mostrar": [
          "b~:Paga todo o nada al 100 %"
        ],
        "foco": "n:Señales marcadas",
        "clicEn": "b~:Paga todo o nada al 100 %"
      },
      {
        "t": 2130.17,
        "mostrar": [
          "b~:Usa la misma cuota en todos los territorios"
        ],
        "foco": "n:Señales marcadas",
        "clicEn": "b~:Usa la misma cuota en todos los territorios"
      },
      {
        "t": 2138.13,
        "mostrar": [
          "b~:Tiene cuota y pago solo anuales"
        ],
        "foco": "n:Señales marcadas",
        "clicEn": "b~:Tiene cuota y pago solo anuales"
      },
      {
        "t": 2148.27,
        "mostrar": [
          "b~:Premia con un ranking donde gana solo el primero"
        ],
        "foco": "n:Señales marcadas",
        "clicEn": "b~:Premia con un ranking donde gana solo el primero"
      },
      {
        "t": 2158.2,
        "mostrar": [
          "b~:Paga solo por volumen"
        ],
        "foco": "n:Señales marcadas",
        "clicEn": "b~:Paga solo por volumen"
      },
      {
        "t": 2167.7,
        "foco": "n:Señales marcadas"
      },
      {
        "t": 2196.47,
        "foco": null
      }
    ]
  },
};
