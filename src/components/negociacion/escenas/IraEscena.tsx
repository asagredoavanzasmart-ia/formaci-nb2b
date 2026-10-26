import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Txt, ac, pop, sombra, tono } from '../../remotion/comun';

/**
 * «La ira cuesta más de lo que da», escena propia de Remotion. Dos personajes en una mesa con un
 * pastel: tú a la izquierda y tu contraparte a la derecha. La ira se ve como una llama sobre tu
 * cabeza; el conflicto, como ondas entre ambos; las ganancias conjuntas, como el tamaño del pastel.
 * `marcas` son segundos desde el inicio de la diapositiva, en el orden de las frases de la página
 * (paginas2.ts, ng-ira); la última es la pregunta de reflexión.
 */

export const W = 1200, H = 860;
const ID = 'ira';
const AZUL = '#3b82f6';
const TU = 300, OTRO = 900, PISO = 640, MESA = 600;

type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

/* Marcas con nombre: el índice es el de la frase en la página. */
const nombres = ['tajada', 'mitad', 'datos', 'escala', 'sesga', 'estanca', 'achica', 'rechazo', 'memoria', 'matices', 'auto', 'logra', 'costos', 'fingir', 'real', 'confianza', 'retira', 'hacer', 'coopera', 'disculpa', 'pausa', 'reencuadre', 'tristeza', 'enfrentada', 'pregunta'] as const;
type Nombre = typeof nombres[number];

const mezcla = (a: string, b: string, u: number) => {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [x, y] = [h(a), h(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * u)).join(',')})`;
};

/* Personaje con emociones: `ira` frunce el ceño y enrojece; `triste` levanta el entrecejo y baja la boca. */
const Personaje: React.FC<{ x: number; y: number; s?: number; cuerpo: string; pelo: string; ira: number; triste: number; t: number; giro?: number; mascara?: number; grieta?: number }> = ({ x, y, s = 1.15, cuerpo, pelo, ira, triste, t, giro = 0, mascara = 0, grieta = 0 }) => {
  const cejaIn = 8 * ira - 7 * triste;
  const boca = 10 * triste + 8 * ira - 6 * (1 - Math.max(ira, triste));
  const tiembla = ira > 0.6 ? Math.sin(t * 40) * 1.6 * (ira - 0.6) : 0;
  return (
    <g transform={`translate(${x + tiembla} ${y}) scale(${s}) rotate(${giro})`}>
      <ellipse cx={0} cy={2} rx={52} ry={13} fill="#000" opacity={0.22} />
      <path d="M -40 0 L -40 -72 Q -40 -108 0 -108 Q 40 -108 40 -72 L 40 0 Z" fill={cuerpo} />
      <path d="M 0 -108 Q 40 -108 40 -72 L 40 0 L 0 0 Z" fill="#000" opacity={0.14} />
      <circle cx={0} cy={-134} r={31} fill={`url(#${ID}-cara)`} />
      <circle cx={0} cy={-134} r={31} fill={ROSA} opacity={0.42 * ira} />
      <circle cx={0} cy={-134} r={31} fill={AZUL} opacity={0.16 * triste} />
      <path d="M -32 -138 Q -31 -173 0 -171 Q 31 -173 32 -138 Q 18 -154 0 -152 Q -18 -154 -32 -138 Z" fill={pelo} />
      {/* cejas */}
      <path d={`M -19 ${-145 - 0} L -6 ${-142 + cejaIn}`} stroke="#3b2a20" strokeWidth={3.6} strokeLinecap="round" />
      <path d={`M 19 ${-145 - 0} L 6 ${-142 + cejaIn}`} stroke="#3b2a20" strokeWidth={3.6} strokeLinecap="round" />
      <ellipse cx={-11} cy={-131} rx={3.6} ry={3.6 - 1.2 * ira} fill="#3b2a20" />
      <ellipse cx={11} cy={-131} rx={3.6} ry={3.6 - 1.2 * ira} fill="#3b2a20" />
      {/* boca: positiva = hacia abajo */}
      <path d={`M -11 -114 Q 0 ${-114 - boca} 11 -114`} stroke="#3b2a20" strokeWidth={3.4} fill="none" strokeLinecap="round" />
      {/* lágrima */}
      {triste > 0.3 && (() => { const u = (t * 0.7) % 1; return <path transform={`translate(-14 ${-124 + 34 * u})`} d="M 0 -6 C 3 -1 5 2 5 5 C 5 9 -5 9 -5 5 C -5 2 -3 -1 0 -6 Z" fill={AZUL} opacity={(triste - 0.3) * 1.4 * (1 - u)} />; })()}
      {/* máscara de ira fingida que se agrieta */}
      {mascara > 0.01 && (
        <g opacity={mascara}>
          <path d="M -30 -150 Q 0 -160 30 -150 Q 32 -122 0 -104 Q -32 -122 -30 -150 Z" fill="#f4f4f5" stroke="#9ca3af" strokeWidth={2} />
          <path d="M -20 -142 L -6 -136 M 20 -142 L 6 -136" stroke="#111" strokeWidth={4} strokeLinecap="round" />
          <path d="M -10 -116 Q 0 -124 10 -116" stroke="#111" strokeWidth={3} fill="none" />
          {grieta > 0 && <path d={`M 2 -158 L -4 -146 L 6 -136 L -2 ${-136 + 26 * grieta}`} stroke="#111" strokeWidth={2.4} fill="none" />}
        </g>
      )}
    </g>
  );
};

/* Llama que crece con la ira y, al reencuadrar, se transforma en una gota azul. */
const Llama: React.FC<{ x: number; y: number; ira: number; agua: number; t: number }> = ({ x, y, ira, agua, t }) => {
  const s = Math.max(ira, agua * 0.8);
  if (s < 0.02) return null;
  const v = Math.sin(t * 11) * 0.06, v2 = Math.sin(t * 7 + 1) * 0.08;
  const color = mezcla(ROSA, AZUL, agua), color2 = mezcla(NARANJA, '#93c5fd', agua);
  const fuego = `M 0 -60 C ${18 + 20 * v} -34 ${34} -14 30 12 C 26 40 -26 40 -30 12 C -34 -6 ${-14 + 10 * v2} -16 -6 -40 C -2 -24 6 -26 0 -60 Z`;
  const gota = 'M 0 -48 C 14 -24 30 -6 30 14 C 30 36 -30 36 -30 14 C -30 -6 -14 -24 0 -48 Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${0.5 + 0.9 * s})`}>
      <path d={agua > 0.5 ? gota : fuego} fill={color} opacity={0.95} style={{ filter: `drop-shadow(0 0 ${14 * s}px ${color})` }} />
      {agua < 0.5 && <path d="M 0 -20 C 8 -8 14 0 12 12 C 10 24 -10 24 -12 12 C -13 4 -6 0 0 -20 Z" fill={color2} opacity={0.8} />}
      {agua >= 0.5 && <ellipse cx={-10} cy={6} rx={6} ry={10} fill="#fff" opacity={0.5} />}
    </g>
  );
};

/* Pastel en perspectiva: `tam` es el total (ganancias conjuntas) y `parte`, la fracción del lado izquierdo. */
const Pastel: React.FC<{ tam: number; parte: number; grieta: number; isDark: boolean }> = ({ tam, parte, grieta, isDark }) => {
  const r = 96 * tam;
  const a = parte * Math.PI * 2;
  const p = (ang: number) => [Math.cos(ang + Math.PI / 2) * r, Math.sin(ang + Math.PI / 2) * r];
  const [x1, y1] = p(0), [x2, y2] = p(a);
  const grande = a > Math.PI ? 1 : 0;
  return (
    <g transform={`translate(600 ${MESA - 16}) scale(1 0.42)`}>
      <ellipse cx={0} cy={22} rx={r} ry={r} fill="#000" opacity={0.12} />
      <circle r={r} fill={isDark ? '#475569' : '#94a3b8'} />
      <path d={`M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${grande} 1 ${x2} ${y2} Z`} fill={`url(#${ID}-marca)`} />
      {grieta > 0 && <path d={`M ${x1 * 0.2} ${y1 * 0.2} L ${x1 * 0.6} ${y1 * 0.6 + 20} L ${x1} ${y1}`} stroke="#fff" strokeWidth={6} opacity={grieta} />}
    </g>
  );
};

export const IraEscena: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  // Fuera de la clase guiada se muestra el cuadro del cierre, antes de la pregunta.
  const t = estatico ? M('enfrentada') + 2.5 : frame / fps;

  // Actos: la creencia y sus efectos (mesa) · matices y costos (sin mesa) · qué hacer (mesa).
  const mesaOp = 1 - ac(t, M('matices') - 0.2, M('matices') + 0.6) + ac(t, M('hacer') - 0.2, M('hacer') + 0.8);
  const acto3 = ac(t, M('matices'), M('matices') + 0.6) * (1 - ac(t, M('hacer') - 0.4, M('hacer') + 0.2));
  const acto4 = ac(t, M('hacer'), M('hacer') + 0.8);

  // Emociones a lo largo de la página.
  const iraTu = Math.min(1,
    ac(t, M('tajada'), M('tajada') + 1.2, 0, 0.75) + ac(t, M('auto'), M('auto') + 0.6, 0, 0.2) - ac(t, M('costos'), M('costos') + 1, 0, 0.45)
    + ac(t, M('real'), M('real') + 1.2, 0, 0.5) - ac(t, M('hacer'), M('hacer') + 1.5, 0, 0.5) - ac(t, M('pausa'), M('pausa') + 2, 0, 0.3) - ac(t, M('reencuadre'), M('reencuadre') + 1.2, 0, 0.3));
  const agua = ac(t, M('reencuadre'), M('reencuadre') + 1.4);
  const tristeTu = ac(t, M('reencuadre') + 0.6, M('reencuadre') + 1.6, 0, 0.7);
  const iraOtro = Math.max(0, ac(t, M('escala'), M('escala') + 1.4, 0, 0.85) - ac(t, M('matices'), M('matices') + 1, 0, 0.85)
    + ac(t, M('confianza'), M('confianza') + 1, 0, 0.55) - ac(t, M('hacer'), M('hacer') + 0.5, 0, 0.55)
    + ac(t, M('hacer') + 0.2, M('hacer') + 0.8, 0, 0.45) - ac(t, M('disculpa'), M('disculpa') + 1.6, 0, 0.45));
  const tristeOtro = ac(t, M('tristeza'), M('tristeza') + 1.2, 0, 0.6);

  // Pastel: la tajada parece crecer con la ira, la ilusión se rompe con los datos, el total se achica y luego crece.
  const parte = 0.5 + ac(t, M('tajada'), M('tajada') + 1.4, 0, 0.16) - ac(t, M('datos'), M('datos') + 0.8, 0, 0.16);
  const tam = 1 - ac(t, M('achica'), M('achica') + 1.4, 0, 0.45) + ac(t, M('hacer'), M('hacer') + 1, 0, 0.45) + ac(t, M('tristeza') + 0.4, M('tristeza') + 2.4, 0, 0.3);
  const grieta = ac(t, M('datos'), M('datos') + 0.4) * (1 - ac(t, M('escala'), M('escala') + 0.6));

  // La contraparte se va por la puerta y vuelve al empezar «qué hacer».
  const sale = ac(t, M('retira') + 0.4, M('retira') + 2.6, 0, 1, Easing.in(Easing.quad));
  const vuelve = ac(t, M('hacer'), M('hacer') + 1.4, 0, 1, Easing.out(Easing.quad));
  const xOtro = OTRO + 360 * sale * (1 - vuelve) + 140 * vuelve * 0 - 70 * ac(t, M('hacer') + 1, M('hacer') + 2.4);
  const xTu = TU + 70 * ac(t, M('hacer') + 1, M('hacer') + 2.4);

  // Rótulo que acompaña cada idea (una frase corta por momento).
  const rotulos: [Nombre, string][] = [
    ['tajada', '¿Enojarse agranda tu tajada?'], ['datos', 'Los datos: Keith Allred'], ['escala', 'Escala el conflicto'], ['sesga', 'Sesga las percepciones'],
    ['estanca', 'Más estancamiento'], ['achica', 'Menos ganancias conjuntas'], ['rechazo', 'Más ofertas rechazadas'], ['memoria', 'Olvidas tus propios intereses'],
    ['matices', 'Hay matices'], ['auto', 'Regateo único con un desconocido'], ['costos', 'Pero tiene costos'], ['fingir', 'Beneficio pequeño, rebote grande'],
    ['real', 'La ira fingida se vuelve real'], ['confianza', 'Se quema la confianza'], ['retira', 'La otra parte se retira'], ['hacer', 'Qué hacer: cercanía'],
    ['coopera', 'Un marco cooperativo'], ['disculpa', 'Disculparte y calmar'], ['pausa', 'Pedir una pausa'], ['reencuadre', 'Reencuadrar la ira como tristeza'],
    ['tristeza', 'La tristeza compartida invita a ceder'], ['enfrentada', 'La ira enfrentada estanca'],
  ];
  let rotulo = -1;
  rotulos.forEach(([n], k) => { if (t >= M(n) - 0.1) rotulo = k; });

  const ondas = Math.min(iraTu, iraOtro + 0.2) * ac(t, M('escala'), M('escala') + 0.5) * (1 - ac(t, M('matices') - 0.3, M('matices') + 0.3));
  const termo = Math.max(0, Math.min(1, 0.15 + 0.75 * ondas + 0.3 * acto3 * iraTu - 0.6 * ac(t, M('pausa'), M('pausa') + 2)));
  const termoOp = ac(t, M('escala') - 0.2, M('escala') + 0.4) * (1 - ac(t, M('matices') - 0.3, M('matices'))) + ac(t, M('pausa') - 0.3, M('pausa') + 0.3) * (1 - ac(t, M('reencuadre') + 1, M('reencuadre') + 1.6));
  const muro = ac(t, M('estanca'), M('estanca') + 1, 0, 1, Easing.out(Easing.back(1.4))) * (1 - ac(t, M('matices') - 0.4, M('matices')));
  const burbuja = ac(t, M('sesga'), M('sesga') + 0.5) * (1 - ac(t, M('matices') - 0.4, M('matices')));
  const memoria = ac(t, M('memoria'), M('memoria') + 0.6);

  const tPregunta = pregunta ? marcas[marcas.length - 1] ?? 1e6 : 1e6;
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La ira escala el conflicto, achica el pastel y quema la confianza; la pausa y el reencuadre como tristeza abren concesiones">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          {/* Rótulo de la idea en curso */}
          {rotulo >= 0 && (() => {
            const [n, txt] = rotulos[rotulo];
            const e = pop(t, M(n) - 0.1, 0.5);
            return <Txt x={600} y={78} textAnchor="middle" fontSize={40} fill={`url(#${ID}-marcaH)`} opacity={Math.min(1, e)} transform={`translate(0 ${(1 - Math.min(1, e)) * 14})`}>{txt}</Txt>;
          })()}

          {/* Encuesta: más de la mitad prefiere sentirse enojada */}
          {(() => {
            const op = ac(t, M('mitad') - 0.2, M('mitad') + 0.4) * (1 - ac(t, M('datos') + 0.6, M('datos') + 1.2));
            if (op <= 0.01) return null;
            const llena = ac(t, M('mitad'), M('mitad') + 1.4, 0, 0.56, Easing.out(Easing.cubic));
            return (
              <g opacity={op} transform="translate(600 170)">
                <rect x={-330} y={-40} width={660} height={130} rx={30} fill={c.panel} style={sombra(c.sombra)} />
                <Txt f="a" x={-300} y={-6} fontSize={20} letterSpacing={2} fill={c.tenue}>AL NEGOCIAR PREFIEREN SENTIRSE…</Txt>
                <rect x={-300} y={20} width={600} height={42} rx={21} fill={c.panel2} />
                <rect x={-300} y={20} width={600 * llena} height={42} rx={21} fill={`url(#${ID}-marcaH)`} />
                <line x1={0} x2={0} y1={12} y2={70} stroke={c.texto} strokeWidth={3} strokeDasharray="4 5" />
                <Txt x={-290 + 600 * llena / 2} y={50} textAnchor="middle" fontSize={22} fill="#fff" opacity={llena > 0.3 ? 1 : 0}>enojadas</Txt>
                <Txt x={300 - 300 * (1 - llena)} y={50} textAnchor="middle" fontSize={22} fill={c.tenue}>felices</Txt>
                <Txt f="a" x={300} y={-6} textAnchor="end" fontSize={20} fill={NARANJA} opacity={ac(t, M('mitad') + 1.2, M('mitad') + 1.6)}>más de la mitad</Txt>
              </g>
            );
          })()}

          {/* Termómetro del conflicto */}
          <g opacity={termoOp} transform="translate(1110 380)">
            <rect x={-18} y={-170} width={36} height={220} rx={18} fill={c.panel2} />
            <rect x={-10} y={-160 + 200 * (1 - termo)} width={20} height={200 * termo} rx={10} fill={mezcla(AZUL, ROSA, Math.min(1, termo * 1.3))} />
            <circle cy={70} r={30} fill={mezcla(AZUL, ROSA, Math.min(1, termo * 1.3))} />
            <Txt f="a" x={0} y={136} textAnchor="middle" fontSize={20} fill={c.tenue}>tensión</Txt>
          </g>

          {/* Ondas del conflicto que van y vienen entre ambos */}
          {ondas > 0.01 && [0, 1, 2, 3].map((k) => {
            const u = (t * 0.9 + k / 4) % 1;
            const lado = k % 2 ? 1 : -1;
            const cx = 600 + lado * (240 - 380 * u);
            return <path key={k} d={`M ${cx} 380 Q ${cx + lado * -40 * (1 + u)} 460 ${cx} 540`} fill="none" stroke={k % 2 ? NARANJA : ROSA} strokeWidth={10 * ondas * (0.6 + u)} strokeLinecap="round" opacity={Math.sin(Math.PI * u) * ondas} />;
          })}

          {/* Personajes */}
          <Llama x={xTu + 4} y={350} ira={Math.max(0, iraTu)} agua={agua} t={t} />
          <Personaje x={xTu} y={PISO} cuerpo={`url(#${ID}-marca)`} pelo="#2b1a12" ira={Math.max(0, Math.min(1, iraTu))} triste={tristeTu} t={t}
            mascara={ac(t, M('fingir') + 0.6, M('fingir') + 1.2) * (1 - ac(t, M('real') + 0.8, M('real') + 1.6))} grieta={ac(t, M('real'), M('real') + 0.8)} />
          <Txt f="a" x={xTu} y={PISO + 52} textAnchor="middle" fontSize={22} fill={c.tenue}>tú</Txt>
          {acto4 > 0 && tristeOtro > 0.05 && <Llama x={xOtro} y={350} ira={0} agua={tristeOtro} t={t + 0.7} />}
          <g opacity={1 - ac(t, M('retira') + 1.8, M('retira') + 2.6) + vuelve}>
            <Personaje x={xOtro} y={PISO} cuerpo={isDark ? '#64748b' : '#94a3b8'} pelo="#6b4423" ira={Math.max(0, Math.min(1, iraOtro))} triste={tristeOtro} t={t + 0.3}
              giro={sale > 0 && vuelve < 0.5 ? 4 * Math.sin(t * 9) : 0} />
            <Txt f="a" x={xOtro} y={PISO + 52} textAnchor="middle" fontSize={22} fill={c.tenue}>contraparte</Txt>
          </g>

          {/* Burbuja de pensamiento: la percepción sesgada y luego los propios intereses que se borronean */}
          {burbuja > 0.01 && (
            <g opacity={burbuja} transform={`translate(${TU + 40} 250) scale(${0.7 + 0.3 * burbuja})`}>
              <circle cx={-80} cy={80} r={10} fill={c.panel} style={sombra(c.sombra, 4, 8)} />
              <circle cx={-60} cy={58} r={14} fill={c.panel} style={sombra(c.sombra, 4, 8)} />
              <rect x={-60} y={-90} width={250} height={140} rx={60} fill={c.panel} style={sombra(c.sombra)} />
              <g opacity={1 - memoria}>
                {/* la contraparte vista con cuernos */}
                <circle cx={65} cy={-22} r={30} fill={ROSA} opacity={0.8} />
                <path d="M 42 -46 L 34 -74 L 54 -52 Z M 88 -46 L 96 -74 L 76 -52 Z" fill={ROSA} />
                <path d="M 50 -30 L 60 -24 M 80 -30 L 70 -24" stroke="#3b2a20" strokeWidth={4} strokeLinecap="round" />
                <path d="M 52 -6 Q 65 -14 78 -6" stroke="#3b2a20" strokeWidth={4} fill="none" />
                <Txt f="a" x={65} y={34} textAnchor="middle" fontSize={18} fill={c.tenue}>«el villano»</Txt>
              </g>
              <g opacity={memoria}>
                <Txt f="a" x={-34} y={-54} fontSize={18} fill={c.tenue}>mis intereses…</Txt>
                {[0, 1, 2].map((k) => {
                  const borra = 0.25 + 0.5 * Math.abs(Math.sin(t * 2 + k));
                  return <rect key={k} x={-34} y={-38 + k * 26} width={170 - k * 28} height={12} rx={6} fill={c.apagado} opacity={borra} />;
                })}
                <Txt x={160} y={-2} fontSize={46} fill={NARANJA} opacity={0.6 + 0.4 * Math.sin(t * 3)}>?</Txt>
              </g>
            </g>
          )}

          {/* Mesa, pastel, muro y ofertas rechazadas */}
          <g opacity={Math.min(1, mesaOp)}>
            <Pastel tam={tam} parte={parte} grieta={grieta} isDark={isDark} />
            <rect x={340} y={MESA} width={520} height={26} rx={13} fill={isDark ? '#3a3a3a' : '#d6d9de'} />
            <rect x={380} y={MESA + 26} width={18} height={70} rx={6} fill={isDark ? '#2e2e2e' : '#b9bfc8'} />
            <rect x={802} y={MESA + 26} width={18} height={70} rx={6} fill={isDark ? '#2e2e2e' : '#b9bfc8'} />
            <Txt f="a" x={600} y={MESA + 70} textAnchor="middle" fontSize={20} fill={c.tenue} opacity={ac(t, M('achica'), M('achica') + 0.5) * (1 - acto3)}>ganancias conjuntas</Txt>
            {muro > 0.01 && (
              <g transform={`translate(600 ${MESA}) scale(1 ${muro})`}>
                {Array.from({ length: 6 }, (_, f) => Array.from({ length: 2 }, (_, col) => (
                  <rect key={`${f}-${col}`} x={-36 + col * 36 + (f % 2) * 8 - 4} y={-34 - f * 34} width={32} height={30} rx={5} fill={f % 2 ? '#a16207' : '#b45309'} opacity={0.9} />
                )))}
              </g>
            )}
            {t > M('rechazo') && muro > 0.5 && [0, 1].map((k) => {
              const u = ((t - M('rechazo')) * 0.8 + k * 0.5) % 1;
              const ida = u < 0.5 ? u * 2 : 2 - u * 2;
              const x = 830 - 180 * ida;
              return (
                <g key={k} transform={`translate(${x} ${470 - 40 * Math.sin(Math.PI * ida)}) rotate(${-10 + 20 * u})`} opacity={(1 - ac(t, M('matices') - 0.4, M('matices')))}>
                  <rect x={-32} y={-22} width={64} height={44} rx={8} fill={c.panel} stroke={c.apagado} strokeWidth={2} />
                  <rect x={-22} y={-10} width={44} height={6} rx={3} fill={c.apagado} />
                  <rect x={-22} y={4} width={30} height={6} rx={3} fill={c.apagado} />
                  {u > 0.45 && u < 0.75 && <path d="M -14 -14 L 14 14 M 14 -14 L -14 14" stroke={ROSA} strokeWidth={6} strokeLinecap="round" />}
                </g>
              );
            })}
          </g>

          {/* Acto de matices: el regateo de un auto, la balanza de costos, el puente de confianza y la puerta */}
          {acto3 > 0.01 && (
            <g opacity={acto3}>
              {(() => {
                const op = ac(t, M('auto') - 0.2, M('auto') + 0.4) * (1 - ac(t, M('costos') + 0.4, M('costos') + 1));
                const entra = ac(t, M('auto'), M('auto') + 1.2, 0, 1, Easing.out(Easing.cubic));
                const baja = ac(t, M('logra'), M('logra') + 1.2, 0, 1, Easing.out(Easing.back(1.5)));
                if (op <= 0.01) return null;
                return (
                  <g opacity={op}>
                    <g transform={`translate(${200 + 400 * entra} 560)`}>
                      <path d="M -150 30 L -130 -20 Q -120 -46 -90 -50 L -50 -90 L 70 -90 L 110 -50 Q 150 -44 160 -10 L 160 30 Z" fill={`url(#${ID}-pizarra)`} style={sombra(c.sombra)} />
                      <path d="M -40 -80 L 60 -80 L 90 -52 L -66 -52 Z" fill="#cbd5e1" opacity={0.8} />
                      <circle cx={-80} cy={34} r={26} fill="#1f2937" /><circle cx={100} cy={34} r={26} fill="#1f2937" />
                      <circle cx={-80} cy={34} r={10} fill="#9ca3af" /><circle cx={100} cy={34} r={10} fill="#9ca3af" />
                    </g>
                    {/* Etiqueta de precio que cae cuando el enojo logra un mejor trato */}
                    <g transform={`translate(${600} ${360 + 60 * baja}) rotate(${-8 + 16 * baja})`} opacity={entra}>
                      <path d="M -70 -36 L 50 -36 L 80 0 L 50 36 L -70 36 Z" fill={c.panel} stroke={NARANJA} strokeWidth={4} style={sombra(c.sombra, 6, 12)} />
                      <circle cx={52} cy={0} r={7} fill={NARANJA} />
                      <Txt x={-12} y={10} textAnchor="middle" fontSize={28} fill={c.texto}>precio</Txt>
                      <path d={`M -12 52 L -12 ${52 + 40 * baja} M -26 ${40 + 40 * baja} L -12 ${56 + 40 * baja} L 2 ${40 + 40 * baja}`} stroke={NARANJA} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={baja} />
                    </g>
                  </g>
                );
              })()}

              {/* Balanza: beneficio táctico pequeño frente a un rebote grande y persistente */}
              {(() => {
                const op = ac(t, M('fingir') - 0.2, M('fingir') + 0.4) * (1 - ac(t, M('real') + 0.4, M('real') + 1));
                if (op <= 0.01) return null;
                const cae = ac(t, M('fingir') + 1.2, M('fingir') + 2.4, 0, 1, Easing.out(Easing.back(2)));
                const ang = -14 * cae;
                const rad = (ang * Math.PI) / 180;
                const L = 200, ex = L * Math.cos(rad), ey = L * Math.sin(rad);
                return (
                  <g opacity={op} transform="translate(600 430)">
                    <path d="M -30 120 L 0 0 L 30 120 Z" fill={c.apagado} />
                    <line x1={-ex} y1={ey} x2={ex} y2={-ey} stroke={c.tenue} strokeWidth={12} strokeLinecap="round" />
                    <circle r={12} fill={NARANJA} />
                    <g transform={`translate(${-ex} ${ey - 30})`}>
                      <circle r={18} fill="#fbbf24" stroke="#d97706" strokeWidth={4} />
                      <Txt f="a" x={0} y={-34} textAnchor="middle" fontSize={20} fill={c.tenue}>beneficio</Txt>
                    </g>
                    <g transform={`translate(${ex} ${-ey - 52 * Math.min(1, cae + 0.2)})`} opacity={Math.min(1, cae * 2)}>
                      <path d="M -60 40 Q -70 -10 -30 -36 Q 10 -56 46 -30 Q 72 -6 60 40 Z" fill={`url(#${ID}-pizarra)`} />
                      <Txt f="a" x={0} y={74} textAnchor="middle" fontSize={20} fill={c.tenue}>rebote</Txt>
                    </g>
                  </g>
                );
              })()}

              {/* Puente de confianza que se quema tabla por tabla */}
              {(() => {
                const op = ac(t, M('confianza') - 0.6, M('confianza')) * (1 - ac(t, M('retira') + 1.4, M('retira') + 2));
                if (op <= 0.01) return null;
                const quema = ac(t, M('confianza'), M('confianza') + 3);
                const n = 9;
                return (
                  <g opacity={op}>
                    <path d={`M 380 520 Q 600 ${560} 820 520`} fill="none" stroke={c.tenue} strokeWidth={4} opacity={1 - quema * 0.8} />
                    {Array.from({ length: n }, (_, k) => {
                      const x = 400 + k * 50;
                      const orden = Math.abs(k - (n - 1) / 2) / ((n - 1) / 2);
                      const tk = 1 - orden;
                      const u = ac(quema, tk * 0.6, tk * 0.6 + 0.4);
                      const y = 528 + Math.sin((k / (n - 1)) * Math.PI) * 18 + 220 * u * u;
                      return (
                        <g key={k} opacity={1 - u}>
                          <rect x={x - 20} y={y} width={40} height={16} rx={4} fill={mezcla('#b45309', '#1f2937', u)} transform={`rotate(${50 * u} ${x} ${y})`} />
                          {u > 0.02 && u < 0.6 && <path transform={`translate(${x} ${y - 6}) scale(${0.4})`} d="M 0 -40 C 14 -20 24 -8 20 8 C 16 26 -16 26 -20 8 C -24 -6 -8 -12 0 -40 Z" fill={NARANJA} opacity={0.9} />}
                        </g>
                      );
                    })}
                    <Txt f="a" x={600} y={470} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={1 - quema}>confianza</Txt>
                  </g>
                );
              })()}

              {/* Puerta por la que se retira la contraparte */}
              <g opacity={ac(t, M('retira'), M('retira') + 0.5)} transform="translate(1110 640)">
                <rect x={-50} y={-200} width={100} height={200} rx={8} fill={c.panel2} stroke={c.apagado} strokeWidth={4} />
                <rect x={-38} y={-188} width={76} height={188} rx={4} fill={`url(#${ID}-marca)`} opacity={0.25 + 0.3 * sale} />
                <circle cx={28} cy={-96} r={6} fill={c.tenue} />
              </g>
            </g>
          )}

          {/* Qué hacer: cercanía, marco cooperativo, disculpa, pausa, reencuadre y concesiones */}
          {acto4 > 0.01 && (
            <g opacity={acto4}>
              <circle cx={600} cy={470} r={340 * ac(t, M('hacer') + 1, M('hacer') + 2.4)} fill={`url(#${ID}-halo)`} opacity={0.55} />
              {/* Marco cooperativo: las dos manos rodean el pastel */}
              <g opacity={ac(t, M('coopera'), M('coopera') + 0.6)}>
                <path d={`M 450 ${MESA - 50} Q 600 ${MESA - 150} 750 ${MESA - 50}`} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeDasharray="2 16" strokeLinecap="round" />
                <Txt f="a" x={600} y={MESA - 120} textAnchor="middle" fontSize={22} fill={NARANJA}>nosotros</Txt>
              </g>
              {/* Disculpa */}
              {(() => {
                const op = ac(t, M('disculpa'), M('disculpa') + 0.4) * (1 - ac(t, M('pausa') + 1.5, M('pausa') + 2.2));
                const largo = 'Perdón, te entiendo.';
                const n = Math.floor(largo.length * ac(t, M('disculpa') + 0.2, M('disculpa') + 1.2, 0, 1, Easing.linear));
                return (
                  <g opacity={op} transform={`translate(${xTu + 40} 270)`}>
                    <path d="M 0 0 H 250 Q 270 0 270 20 V 56 Q 270 76 250 76 H 40 L 16 100 L 22 76 H 0 Q -20 76 -20 56 V 20 Q -20 0 0 0 Z" fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
                    <Txt f="a" x={10} y={48} fontSize={26} fill="#fff" peso={600}>{largo.slice(0, n)}</Txt>
                  </g>
                );
              })()}
              {/* Pausa */}
              {(() => {
                const op = pop(t, M('pausa'), 0.5) * (1 - ac(t, M('reencuadre') - 0.3, M('reencuadre') + 0.3));
                const giro = ac(t, M('pausa'), M('pausa') + 3);
                return (
                  <g opacity={Math.min(1, op)} transform={`translate(600 250) scale(${0.7 + 0.3 * Math.min(1, op)})`}>
                    <circle r={74} fill={c.panel} style={sombra(c.sombra)} />
                    <circle r={60} fill="none" stroke={c.apagado} strokeWidth={10} />
                    <circle r={60} fill="none" stroke={AZUL} strokeWidth={10} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - giro} transform="rotate(-90)" strokeLinecap="round" />
                    <rect x={-20} y={-26} width={14} height={52} rx={5} fill={AZUL} />
                    <rect x={6} y={-26} width={14} height={52} rx={5} fill={AZUL} />
                  </g>
                );
              })()}
              {/* Concesiones que viajan al centro cuando la tristeza es compartida */}
              {t > M('tristeza') + 0.4 && [0, 1, 2, 3, 4, 5].map((k) => {
                const lado = k % 2 ? 1 : -1;
                const u = ((t - M('tristeza') - 0.4) * 0.5 + k / 6) % 1;
                const x0 = 600 + lado * 230, x = x0 + (600 - x0) * u;
                return <rect key={k} x={x - 14} y={MESA - 60 - Math.sin(Math.PI * u) * 50} width={28} height={28} rx={7} fill={lado < 0 ? NARANJA : AZUL} opacity={Math.sin(Math.PI * u) * (1 - ac(t, tPregunta - 0.4, tPregunta))} />;
              })}
              {/* Contraste: la ira enfrentada lleva al estancamiento */}
              {(() => {
                const op = pop(t, M('enfrentada'), 0.6);
                if (op <= 0.01) return null;
                return (
                  <g opacity={Math.min(1, op)} transform={`translate(1040 200) scale(${0.7 + 0.3 * Math.min(1, op)})`}>
                    <rect x={-130} y={-80} width={260} height={170} rx={26} fill={c.panel} style={sombra(c.sombra)} />
                    <Llama x={-70} y={30} ira={0.55} agua={0} t={t} />
                    <Llama x={70} y={30} ira={0.55} agua={0} t={t + 0.4} />
                    {[0, 1, 2].map((f) => <rect key={f} x={-14} y={36 - f * 26} width={28} height={22} rx={4} fill="#b45309" />)}
                    <Txt f="a" x={0} y={78} textAnchor="middle" fontSize={18} fill={c.tenue}>estancamiento</Txt>
                  </g>
                );
              })()}
            </g>
          )}
        </g>

        {/* Pregunta de reflexión */}
        {vP > 0.001 && pregunta && (() => {
          const ancho = 1040;
          const palabras = pregunta.split(' ');
          const lineas: string[] = []; let l = '';
          for (const p of palabras) { if ((l + ' ' + p).trim().length > 50) { lineas.push(l.trim()); l = p; } else l += ' ' + p; }
          if (l.trim()) lineas.push(l.trim());
          const alto = 90 + lineas.length * 46;
          return (
            <g opacity={Math.min(1, vP)} transform={`translate(600 430) scale(${0.85 + 0.15 * Math.min(1, vP)})`}>
              <rect x={-ancho / 2} y={-alto / 2} width={ancho} height={alto} rx={40} fill={c.panel} style={sombra(c.sombra, 14, 30)} />
              <rect x={-ancho / 2} y={-alto / 2} width={14} height={alto} rx={7} fill={`url(#${ID}-marca)`} />
              <Txt f="a" x={-ancho / 2 + 50} y={-alto / 2 + 52} fontSize={20} fill={NARANJA} peso={700} letterSpacing={3}>PARA PENSAR</Txt>
              {lineas.map((ln, j) => <Txt key={j} x={-ancho / 2 + 50} y={-alto / 2 + 102 + j * 46} fontSize={34} fill={c.texto}>{ln}</Txt>)}
            </g>
          );
        })()}
      </svg>
    </AbsoluteFill>
  );
};
