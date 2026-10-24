import React from 'react';
import { motion } from 'motion/react';
import { Thumbnail } from '@remotion/player';
import { Shell, panelClass, textMuted, microLabel, featuredClass, Quiz } from './slideKit';
import type { QuizQ } from './slideKit';
import { EscenaSincronizada } from './remotion/EscenaSincronizada';
import { EscenaIP, Icono, W, H } from './influencia/motor';
import { PAGINAS } from './influencia/indice';
import type { Pagina } from './influencia/tipos';
import { guiadoInfluencia, marcasInfluencia, FIN_AUDIO_INFLUENCIA } from '../data/guiadoInfluencia';

/**
 * Clase: «Influencia y persuasión» (Serie Inteligencia Emocional, Harvard Business Review).
 * Ocho lecciones, una por capítulo del libro. Cada página es una escena de Remotion que avanza
 * con el audio de la clase (datos en ./influencia/paginas*.ts, tiempos en guiadoInfluencia.ts).
 * Los encabezados (level 1) los dibuja App.tsx.
 */

type SlideProps = { isDark: boolean };
const FPS = 30;

const heading = (isDark: boolean) => (isDark ? 'text-white' : 'text-gray-900');

/* Tramo del audio que cubre una diapositiva: de su inicio al de la siguiente. */
const tramo = (id: string) => {
  const i = guiadoInfluencia.slides.findIndex((s) => s.id === id);
  if (i < 0) return { inicio: 0, fin: 1 };
  return { inicio: guiadoInfluencia.slides[i].t, fin: guiadoInfluencia.slides[i + 1]?.t ?? FIN_AUDIO_INFLUENCIA };
};

/* Página de contenido: escena animada a la izquierda y lo que se lee a la derecha. */
function PaginaIP({ p, isDark }: { p: Pagina; isDark: boolean }) {
  const { inicio, fin } = tramo(p.id);
  const marcas = marcasInfluencia[p.id] ?? [];
  const props = { isDark, els: p.els, marcas, pregunta: p.pregunta.texto };
  // Fuera de la clase guiada se muestra la escena completa: el cuadro justo antes de la pregunta.
  const total = Math.max(1, Math.ceil((fin - inicio) * FPS));
  const completo = marcas.length ? Math.min(total - 1, Math.max(0, Math.round((marcas[marcas.length - 1] - 0.6) * FPS))) : 0;
  return (
    <Shell isDark={isDark} title={p.titulo} highlight={p.destaque} subtitle={p.bajada}>
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-5">
          <div className="lg:w-[58%] min-h-0 flex items-center justify-center">
            <EscenaSincronizada componente={EscenaIP} props={props} inicio={inicio} fin={fin} ancho={W} alto={H} respaldo={
              <Thumbnail component={EscenaIP} inputProps={props} compositionWidth={W} compositionHeight={H} frameToDisplay={completo} durationInFrames={total} fps={FPS}
                style={{ width: '100%', aspectRatio: `${W} / ${H}`, maxHeight: '100%' }} />
            } />
          </div>
          <div className="lg:w-[42%] flex flex-col gap-3 justify-center">
            {p.tarjetas.map((tj) => (
              <div key={tj.rotulo} className={`p-4 rounded-2xl ${tj.destacada ? featuredClass(isDark) : panelClass(isDark)}`}>
                <p className={microLabel(isDark)}>{tj.rotulo}</p>
                <p className={`text-sm leading-snug mt-1 ${textMuted(isDark)}`}>{tj.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Portada                                                             */
/* ------------------------------------------------------------------ */

function Portada({ isDark }: SlideProps) {
  const iconos = ['corona', 'llama', 'corazon', 'diploma', 'personas', 'libro', 'posit', 'cerebro'];
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center text-center p-8 relative overflow-hidden rounded-3xl ${isDark ? 'bg-[#121212]' : 'bg-[#f8f9fa]'}`}>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[#ff851d]/10 to-[#ef375c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[#ef375c]/10 to-[#ff851d]/10 rounded-full blur-3xl pointer-events-none" />
      <svg viewBox="0 0 640 150" className="w-full max-w-xl mb-4 z-10 overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="ipp-marca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff851d" /><stop offset="1" stopColor="#ef375c" /></linearGradient>
        </defs>
        {iconos.map((i, k) => {
          const x = 50 + k * 77.5;
          const y = 80 - Math.sin((k / 7) * Math.PI) * 34;
          return (
            <motion.g key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ opacity: { delay: k * 0.08 }, y: { duration: 2.6, delay: k * 0.2, repeat: Infinity, ease: 'easeInOut' } }}>
              <g transform={`translate(${x} ${y})`}>
                <circle r={30} fill="url(#ipp-marca)" style={{ filter: `drop-shadow(0 6px 12px rgba(0,0,0,${isDark ? 0.5 : 0.15}))` }} />
                <g transform="scale(0.5)"><Icono i={i} c="#ffffff" c2="#ef375c" /></g>
              </g>
            </motion.g>
          );
        })}
      </svg>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs md:text-sm uppercase tracking-[0.3em] mb-3 font-bold text-[#ff851d] z-10">Harvard Business Review · ocho autores</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tighter z-10 ${heading(isDark)}`}>
        Influencia y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff851d] to-[#ef375c]">persuasión</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={`text-base md:text-xl max-w-3xl mx-auto z-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Persuadir no es un don con el que se nace: es una habilidad que <strong>se mide, se entrena y se aplica con ética</strong>.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.6 }} className="h-1.5 w-48 bg-gradient-to-r from-[#ff851d] to-[#ef375c] rounded-full shadow-lg shadow-red-500/20 mt-6 z-10" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tests                                                               */
/* ------------------------------------------------------------------ */

const IP_BASICO: QuizQ[] = [
  {
    q: 'Según Nick Morgan, ¿cuáles son los cuatro frentes de la influencia?',
    options: ['Cargo, sueldo, antigüedad y red de contactos', 'Poder posicional, emoción, conocimiento y lenguaje no verbal', 'Simpatía, reciprocidad, autoridad y escasez', 'Voz, rostro, gestos y postura'],
    answer: 1,
    why: 'Morgan distingue esos cuatro frentes. Para ejercer influencia hay que llevar la delantera en al menos uno, y mejor en varios.',
  },
  {
    q: 'Una carta con un pequeño regalo pasó del 18 % al 35 % de respuestas. ¿Qué principio de Cialdini lo explica?',
    options: ['Autoridad', 'Escasez', 'Reciprocidad', 'Coherencia'],
    answer: 2,
    why: 'Reciprocidad: quien recibe algo siente la necesidad de devolverlo. Lo decisivo no fue el valor del regalo, sino recibir algo.',
  },
  {
    q: '¿Qué principio describe que seguimos el ejemplo de personas parecidas a nosotros?',
    options: ['Prueba social', 'Simpatía', 'Autoridad', 'Escasez'],
    answer: 0,
    why: 'La prueba social: los neoyorquinos imitaban a otro neoyorquino, pero no a alguien de otro país. Funciona mejor entre iguales.',
  },
  {
    q: 'Para que un compromiso pese, Cialdini dice que debe ser…',
    options: ['Oral, privado y rápido', 'Impuesto por el jefe y por escrito', 'Activo, público y voluntario', 'Secreto y flexible'],
    answer: 2,
    why: 'Activo (por escrito), público (a la vista de otros) y voluntario (elegido). Lo impuesto genera resentimiento, no compromiso.',
  },
  {
    q: 'Según Hill y Lineback, ¿en qué dos componentes se apoya la confianza?',
    options: ['Antigüedad y cargo', 'Simpatía y humor', 'Competencia y carácter', 'Datos y emociones'],
    answer: 2,
    why: 'Competencia para decidir con fundamento y carácter para actuar con valores que van más allá del interés propio. Si falta uno, la confianza no se sostiene.',
  },
  {
    q: '¿Qué es el carisma para Antonakis, Fenley y Liechti?',
    options: ['Un rasgo innato que no se puede entrenar', 'Un conjunto de habilidades que se puede aprender', 'Un sinónimo de extraversión', 'Una cualidad exclusiva de los políticos'],
    answer: 1,
    why: 'Identifican doce tácticas, nueve verbales y tres no verbales, que se aprenden. Tras formarse, la calificación como líderes subió un 60 % de media.',
  },
  {
    q: '¿Qué hizo Lou Gerstner al llegar a una IBM casi en quiebra?',
    options: ['Despidió a la mitad de los directivos', 'Lanzó una gira de escucha con clientes y empleados', 'Cambió el logo y la publicidad', 'Vendió la división de computadores'],
    answer: 1,
    why: 'La Operación Abrazo del Oso: tres meses de reuniones con clientes y sesiones sin guion con veinte mil empleados, esforzándose por no sacar conclusiones.',
  },
  {
    q: 'Según Robert McKee, ¿cuál es la manera más poderosa de convencer?',
    options: ['Presentar más estadísticas que la competencia', 'Citar autoridades reconocidas', 'Vincular una idea a una emoción con una historia', 'Mostrar el organigrama y el plan de empresa'],
    answer: 2,
    why: 'La retórica convencional solo convence en lo intelectual y deja al público debatiendo contigo. Una historia une la idea a una emoción y mueve a actuar.',
  },
  {
    q: 'En el primer experimento de Randy Garner, ¿qué porcentaje devolvió la encuesta con un pósit?',
    options: ['36 %', '48 %', '76 %', '95 %'],
    answer: 2,
    why: 'Sin mensaje, 36 %; con el mensaje a mano en la carta, 48 %; con pósit, 76 %: más del doble con la misma petición.',
  },
  {
    q: '¿Cuál es la regla de oro de Michael Harris?',
    options: ['Siempre vender con datos', 'Siempre vender con emociones', 'Ventas sencillas, al señor Racional; complicadas, al señor Intuitivo', 'Ventas sencillas, con emociones; complicadas, con datos'],
    answer: 2,
    why: 'Con pocas variables, la decisión consciente fue un 15 % mejor; con doce, la inconsciente la superó en un 42 %.',
  },
];

const IP_AVANZADO: QuizQ[] = [
  {
    q: 'Presentas una propuesta a un comité donde no tienes cargo. Según Morgan, ¿qué frente puede equilibrar la balanza?',
    options: ['Hablar más e interrumpir más que el resto', 'La emoción, siempre que tenga buena base y preparación', 'El silencio absoluto hasta el final', 'Ninguno: sin poder posicional no hay influencia'],
    answer: 1,
    why: 'La pasión es el gran igualador frente al poder, pero no sustituye a la preparación: funciona cuando hay fundamento detrás.',
  },
  {
    q: 'Un vicepresidente consigue el «sí» de cada jefe presionándolo en el peor momento del día. ¿Qué predice Cialdini?',
    options: ['Que cumplirán, porque lo prometieron', 'Que cederán, pero no cumplirán: el compromiso no fue voluntario', 'Que la prueba social los hará cumplir', 'Que la escasez de tiempo aumentará su compromiso'],
    answer: 1,
    why: 'Agotados, todos cedían, pero al no sentir la promesa como voluntaria no la cumplían. La presión funciona poco y a corto plazo.',
  },
  {
    q: 'En el hospital, el cumplimiento de los ejercicios subió un 34 %. ¿Qué cambió?',
    options: ['Se premió a los pacientes que cumplían', 'Se colgaron los títulos del equipo y se hizo visible su experiencia real', 'Se contrataron médicos más prestigiosos', 'Se redujo la cantidad de ejercicios'],
    answer: 1,
    why: 'Los pacientes conocían la formación de los médicos, pero no la de los fisioterapeutas. Hacer visible una experiencia real, sin engaño, activó la autoridad.',
  },
  {
    q: 'Los mayoristas de ternera subieron sus pedidos un 600 %. ¿Qué combinación lo produjo?',
    options: ['Un descuento por volumen', 'Escasez por el clima más información que nadie más conocía', 'Un vendedor parecido al cliente', 'Un regalo junto al pedido'],
    answer: 1,
    why: 'La escasez sola duplicó los pedidos; sumarle el carácter exclusivo de la información los multiplicó. El límite ético: solo si es verdad.',
  },
  {
    q: 'Tras la formación en carisma, ¿qué pasó con quienes partían con los índices más bajos?',
    options: ['No mejoraron: el carisma es innato', 'Redujeron considerablemente la distancia con quienes tenían facilidad natural', 'Empeoraron por exceso de técnica', 'Superaron siempre a los más carismáticos'],
    answer: 1,
    why: 'Los autores no prometen convertirte en Churchill, pero sí en alguien más carismático a ojos de tus seguidores.',
  },
  {
    q: '¿Qué reveló el guion gráfico que preparó Airbnb al estilo de Disney?',
    options: ['Que los precios eran demasiado altos', 'Momentos importantes del recorrido en los que no estaban haciendo nada', 'Que los anfitriones no querían la aplicación', 'Que sobraban funciones en la web'],
    answer: 1,
    why: 'Ponerse en el lugar del huésped y del anfitrión mostró huecos del panorama general e inspiró su estrategia para aplicaciones móviles.',
  },
  {
    q: 'Según McKee, ¿cuáles son los dos problemas de la retórica convencional?',
    options: ['Es cara y lenta', 'El público debate contigo mentalmente y, aunque lo convenzas, solo es en lo intelectual', 'Aburre y es difícil de traducir', 'Necesita autoridades y no tiene datos'],
    answer: 1,
    why: 'Tu público tiene sus propias autoridades, cifras y experiencias; y los actos de la gente no se mueven solo con la razón.',
  },
  {
    q: 'El pósit en blanco logró un 43 % y el personalizado un 69 %. ¿Qué demuestra la diferencia?',
    options: ['Que el color amarillo es lo que funciona', 'Que lo decisivo es la conexión personal, no el papel', 'Que los profesores preferían escribir a mano', 'Que el pósit solo funciona con tareas fáciles'],
    answer: 1,
    why: 'Lo mágico no es el papel: es la sensación de que alguien te pide ayuda a ti, de manera especial.',
  },
  {
    q: 'En el Iowa Gambling Task, ¿qué ocurrió primero?',
    options: ['Supieron explicar qué barajas eran peligrosas', 'Dejaron de elegir las barajas peligrosas', 'Se inquietaron al acercar la mano a la baraja peligrosa', 'Ganaron todo el dinero disponible'],
    answer: 2,
    why: 'A las 10 cartas ya se inquietaban; hacia la 50 dejaron de elegirlas y solo hacia la 80 supieron explicarlo. La intuición se adelantó a la lógica.',
  },
  {
    q: 'Vendes un software complejo con doce variables de decisión. Según Harris, ¿qué conviene más?',
    options: ['Una presentación de ochenta y cinco láminas con todos los datos', 'Relatar con detalle el caso de otro cliente', 'Esperar a que el cliente compare todo por su cuenta', 'Bajar el precio para simplificar la decisión'],
    answer: 1,
    why: 'Con muchas variables el pensamiento consciente se satura. Una historia de cliente le da al señor Intuitivo la experiencia que necesita para decidir.',
  },
];

function TestBasico({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 1 ·" highlight="Fundamentos" subtitle="Diez preguntas sobre los conceptos centrales de la formación. Al final verás tu puntaje y una recomendación.">
      <Quiz isDark={isDark} nivel="Nivel principiante" questions={IP_BASICO} />
    </Shell>
  );
}

function TestAvanzado({ isDark }: SlideProps) {
  return (
    <Shell isDark={isDark} title="Test 2 ·" highlight="Aplicación" subtitle="Diez preguntas de aplicación y análisis: por qué funciona cada idea y cómo se usa en situaciones reales.">
      <Quiz isDark={isDark} nivel="Nivel avanzado" questions={IP_AVANZADO} />
    </Shell>
  );
}

export default function ClaseInfluencia({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  if (slideId === 'ip-portada') return <Portada isDark={isDark} />;
  if (slideId === 'ip-test-basico') return <TestBasico isDark={isDark} />;
  if (slideId === 'ip-test-avanzado') return <TestAvanzado isDark={isDark} />;
  const p = PAGINAS[slideId];
  return p ? <PaginaIP key={slideId} p={p} isDark={isDark} /> : null;
}
