import React from 'react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import type { QuizQ } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { EscenaIP, W, H } from './influencia/motor';
import { PAGINAS } from './negociacion/indice';
import type { Pagina } from './influencia/tipos';
import { guiadoNegociacion, marcasNegociacion, FIN_AUDIO_NEGOCIACION } from '../data/guiadoNegociacion';

/**
 * Clase: «Negociación: lo esencial de HBR» (HBR's 10 Must Reads on Negotiation).
 * Once lecciones, una por artículo del libro. Cada página es una escena de Remotion que avanza
 * con el audio de la clase (datos en ./negociacion/paginas*.ts, tiempos en guiadoNegociacion.ts).
 * Usa el motor de escenas de «Influencia y persuasión». Los encabezados (level 1) los dibuja App.tsx.
 */

type SlideProps = { isDark: boolean };
const FPS = 30;

/* Tramo del audio que cubre una diapositiva: de su inicio al de la siguiente. */
const tramo = (id: string) => {
  const i = guiadoNegociacion.slides.findIndex((s) => s.id === id);
  if (i < 0) return { inicio: 0, fin: 1 };
  return { inicio: guiadoNegociacion.slides[i].t, fin: guiadoNegociacion.slides[i + 1]?.t ?? FIN_AUDIO_NEGOCIACION };
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaNG({ p, isDark }: { p: Pagina; isDark: boolean }) {
  const { inicio, fin } = tramo(p.id);
  const marcas = marcasNegociacion[p.id] ?? [];
  const props = { isDark, els: p.els, marcas, pregunta: p.pregunta.texto };
  // Fuera de la clase guiada se muestra la escena completa: el cuadro justo antes de la pregunta.
  const total = Math.max(1, Math.ceil((fin - inicio) * FPS));
  const completo = marcas.length ? Math.min(total - 1, Math.max(0, Math.round((marcas[marcas.length - 1] - 0.6) * FPS))) : 0;
  return (
    <Shell isDark={isDark} title={p.titulo} highlight={p.destaque} subtitle={p.bajada}>
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[58%] min-w-0 min-h-0 flex items-center justify-center overflow-hidden rounded-2xl">
            <EscenaSincronizada componente={EscenaIP} props={props} inicio={inicio} fin={fin} ancho={W} alto={H} respaldo={
              <Thumbnail component={EscenaIP} inputProps={props} compositionWidth={W} compositionHeight={H} frameToDisplay={completo} durationInFrames={total} fps={FPS}
                style={{ width: '100%', aspectRatio: `${W} / ${H}`, maxHeight: '100%' }} />
            } />
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

/* ------------------------------------------------------------------ */
/* Tests (no se narran)                                                */
/* ------------------------------------------------------------------ */

const NG_BASICO: QuizQ[] = [
  {
    q: 'Según Sebenius, ¿cuál es el problema que toda negociación debe resolver?',
    options: ['Conseguir el precio más bajo posible', 'Moldear la decisión de la otra parte, trato frente a no trato, para que escoja por su interés lo que tú quieres', 'Ganar todas las concesiones', 'Evitar hablar de alternativas'],
    answer: 1,
    why: 'Cada parte decide entre aceptar el trato o quedarse con su mejor opción sin trato. Tu tarea es moldear esa decisión, no imponerla.',
  },
  {
    q: '¿Qué es el BATNA?',
    options: ['El precio máximo que pagarías', 'La mejor alternativa a un acuerdo negociado: lo que harías si no hay trato', 'Una cláusula de salida del contrato', 'El primer número que pones sobre la mesa'],
    answer: 1,
    why: 'Fisher, Ury y Patton lo acuñaron en «Obtenga el sí». Fija el umbral que cualquier acuerdo debe superar.',
  },
  {
    q: 'En el reparto de 100 dólares, ¿qué ocurre con las propuestas muy desiguales?',
    options: ['Se aceptan siempre: un dólar es mejor que nada', 'La mayoría rechaza las que no dejan al menos entre el 35 y el 40 %', 'Se negocian hasta partes iguales', 'Se aceptan si el monto es grande'],
    answer: 1,
    why: 'A la gente le importa la justicia percibida y el resultado relativo, no solo cuánto gana.',
  },
  {
    q: '¿Qué distingue una posición de un interés?',
    options: ['Son sinónimos', 'La posición es lo que cada parte dice querer; el interés, la preocupación de fondo', 'El interés es la cifra y la posición el argumento', 'La posición es secreta y el interés público'],
    answer: 1,
    why: 'En la represa, las posiciones eran sí o no, pero los intereses (caudal, hábitat, capacidad) eran compatibles.',
  },
  {
    q: 'Según Malhotra, ¿qué conviene negociar primero?',
    options: ['El precio', 'El proceso: plazos, quién aprueba, agenda e hitos', 'Las garantías', 'Las penalidades'],
    answer: 1,
    why: 'La sustancia son los términos; el proceso, cómo llegarás a ellos. Aclararlo evita sorpresas como un jefe oculto.',
  },
  {
    q: '¿Qué efecto tuvo la ansiedad en el experimento de Brooks y Schweitzer?',
    options: ['Mejoró los tratos', 'Ofertas más débiles, respuestas más rápidas, retiros antes y tratos un 12 % menos atractivos', 'Ninguno', 'Más enojo'],
    answer: 1,
    why: 'Por eso recomienda practicar hasta que negociar sea familiar o delegar en un tercero experto.',
  },
  {
    q: '¿Cuáles son las tres palancas de la negociación en la sombra?',
    options: ['Precio, plazo y calidad', 'Movimientos de poder, de proceso y de reconocimiento', 'Amenazas, promesas y silencios', 'Datos, historias y emociones'],
    answer: 1,
    why: 'Poder para traer a la mesa, proceso para cambiar la estructura y reconocimiento para cambiar el tono.',
  },
  {
    q: 'Al negociar una oferta de trabajo con varios pedidos, ¿qué recomienda Malhotra?',
    options: ['Pedir uno a la vez', 'Plantearlos todos juntos e indicar cuál importa más', 'Pedir solo el sueldo', 'Dejar que la empresa proponga'],
    answer: 1,
    why: 'Si pides de a uno, el otro supone que aceptarás tras cada concesión y pierde la buena disposición.',
  },
  {
    q: '¿Qué técnica de escucha usaba Dominick Misino al repetir las palabras del captor?',
    options: ['El silencio', 'El espejo', 'La amenaza', 'El resumen escrito'],
    answer: 1,
    why: 'Repetir sus palabras obtiene datos y convierte lo que los separaba en información compartida.',
  },
  {
    q: 'Según Bain, ¿qué precio debería reflejar la mayor parte de lo que pagas por una empresa?',
    options: ['El valor con todas las sinergias', 'El negocio tal como es hoy', 'El precio pedido', 'El de la competencia'],
    answer: 1,
    why: 'Las sinergias se persiguen después; el precio de retirada no debe incluir todo su valor.',
  },
];

const NG_AVANZADO: QuizQ[] = [
  {
    q: 'Un comprador optimista y uno escéptico no logran acordar precio. ¿Qué propone Sebenius?',
    options: ['Partir la diferencia', 'Un earn-out: un pago fijo ahora y otro contingente según resultados', 'Retirarse', 'Contratar un árbitro convencional'],
    answer: 1,
    why: 'La diferencia de pronóstico se vuelve valor: vale mucho para quien es optimista y cuesta poco a quien duda.',
  },
  {
    q: 'En el caso de los cuatro dueños, ¿por qué convenía vender primero y no ser la última pieza?',
    options: ['Porque el precio subiría con el tiempo', 'Porque al último X ya tendría el control y solo pagaría las acciones, sin el asiento en el directorio', 'Porque A quería comprar', 'Porque el dinero era la prioridad de X'],
    answer: 1,
    why: 'Para X el control pesaba más que el dinero; quien vendía mientras A resistía podía cobrar acciones y asiento.',
  },
  {
    q: 'Un cliente dice que cobras cinco veces más que la competencia. ¿Qué respuesta sigue el consejo de Malhotra?',
    options: ['«Entiendo que es caro, pero…»', 'Ofrecer un descuento de inmediato', 'Justificar el valor sin disculparte por el precio', 'Ignorar el comentario'],
    answer: 2,
    why: 'Disculparse señala que ni tú crees en tu precio y lleva el marco al regateo.',
  },
  {
    q: 'Según la investigación citada por Brooks, ¿cuándo puede servir mostrar enojo?',
    options: ['En relaciones de largo plazo', 'En una negociación única y transaccional, aunque con costos', 'Siempre que sea fingido', 'Nunca, en ningún caso'],
    answer: 1,
    why: 'Van Kleef lo observó en tratos únicos; pero la ira fingida se vuelve real y destruye confianza (Campagna).',
  },
  {
    q: '¿Qué hace la estrategia «yo y nosotros» de Bowles?',
    options: ['Amenaza con una oferta externa', 'Explica por qué es apropiado negociar y muestra interés por la relación', 'Evita negociar', 'Pide todo por escrito'],
    answer: 1,
    why: 'Con ese relato no hubo penalización; la oferta externa lograba el aumento pero restaba disposición a trabajar con ella.',
  },
  {
    q: 'Un proveedor indonesio dice «haremos nuestro mejor esfuerzo». Según Meyer, ¿qué podría significar?',
    options: ['Un compromiso firme', 'Un no dicho con cortesía', 'Que necesitan más dinero', 'Que firmarán mañana'],
    answer: 1,
    why: 'En culturas donde negar algo a la cara es descortés, el no llega por el tono o por frases así.',
  },
  {
    q: 'En el equipo de negociación policial, ¿para qué se separa a quien negocia de quien decide?',
    options: ['Para repartir el trabajo', 'Para ganar tiempo y poder: «debo consultarlo con mi comandante»', 'Para que el captor hable con el jefe', 'Para cumplir un protocolo legal'],
    answer: 1,
    why: 'Es lo que hacen los diplomáticos: llevar la propuesta a quien decide da margen para maniobrar.',
  },
  {
    q: 'Conoco reunió a todos sus opositores en un hotel flotante. ¿Qué lección deja?',
    options: ['Combinar frentes siempre ayuda', 'Combinar frentes puede unir a la oposición en un bloque', 'Hay que negociar en lugares neutrales', 'Las campañas no funcionan con ONG'],
    answer: 1,
    why: 'Grupos que actuaban por separado se unieron y Conoco se retiró. Barshefsky, en cambio, unió a sus aliados.',
  },
  {
    q: '¿Cuándo tiene sentido el desafío de arbitraje de oferta final?',
    options: ['Cuando ambas partes son irrazonables', 'Cuando lo justo es claro, el juicio sería caro y nadie puede retirarse con facilidad', 'En cualquier compraventa', 'Cuando quieres ganar tiempo'],
    answer: 1,
    why: 'Si la otra parte puede irse sin costo o lo justo es ambiguo, el desafío pierde fuerza o se vuelve riesgoso.',
  },
  {
    q: 'En el mapa de sinergias de Bain, ¿cuáles son las más difíciles de lograr?',
    options: ['Eliminar funciones duplicadas', 'Costos operativos compartidos', 'Vender productos nuevos por canales nuevos', 'Gastos de directorio'],
    answer: 2,
    why: 'Cuanto más lejos del centro, más tiempo toman y menos probables son; por eso no deben inflar el precio de retirada.',
  },
];

function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre los conceptos centrales de la clase. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={NG_BASICO} />
    </Shell>
  );
}

function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación y análisis: por qué funciona cada idea y cómo se aplica en situaciones reales.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={NG_AVANZADO} />
    </Shell>
  );
}

export default function ClaseNegociacion({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ng-test-basico') return <TestBasico isDark={isDark} />;
  if (slideId === 'ng-test-avanzado') return <TestAvanzado isDark={isDark} />;
  const p = PAGINAS[slideId];
  return p ? <PaginaNG key={slideId} p={p} isDark={isDark} /> : null;
}
