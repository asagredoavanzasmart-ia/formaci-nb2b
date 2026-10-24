import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «Priming: cinco experimentos famosos (y frágiles)», animada con Remotion. Tiempos relativos a la diapositiva. */
const T = {
  priming: 2.62, estimulo: 5.06, conductas: 7.18, famosos: 9.55, fragiles: 11.88,
  florida: 18.58, vejez: 22.83, wFlorida: 25.37, olvido: 26.03, canas: 27.18, arrugas: 27.85, viejo: 30.3, pasillo: 32.05, despacio: 33.42, sinConciencia: 35.82, ideomotor: 41.53,
  lapiz: 43.45, sonrisa: 49.57, divertidas: 51.98, idaVuelta: 54.98, mueve: 56.18, activa: 57.61,
  vohs: 60.0, dinero: 62.14, independiente: 64.59, solidaria: 67.24, lapices: 69.12, desconocido: 70.64, ochenta: 74.45,
  caja: 76.98, ojos: 80.04, pago: 82.11, triple: 85.22, flores: 86.59,
  macbeth: 88.84, telefono: 90.43, enjuague: 93.13, escrito: 94.72, jabon: 95.95, mancha: 97.43,
  presentes: 101.92,
};
export const W = 1200, H = 900;
const ID = 'pr';

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={78} textAnchor="middle" fontSize={48} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);

const Chip: React.FC<{ c: ReturnType<typeof tono>; x: number; y: number; p: number; txt: string; w?: number; marca?: boolean }> = ({ c, x, y, p, txt, w = 200, marca }) => (
  <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}>
    <rect x={-w / 2} y={-30} width={w} height={60} rx={30} fill={marca ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra * 0.8, 6, 14)} />
    <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={26} fill={marca ? '#fff' : c.texto}>{txt}</Txt>
  </g>
);

/* 0 · Qué es el priming */
const Intro: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.florida);
  if (op <= 0) return null;
  const e = pop(t, T.estimulo), k = pop(t, T.conductas);
  const u = ((t - T.estimulo) / 1.8) % 1;
  const fam = pop(t, T.famosos), grieta = ac(t, T.fragiles, T.fragiles + 0.8);
  const tiembla = t > T.fragiles && t < T.fragiles + 0.8 ? Math.sin(t * 50) * 4 : 0;
  return (
    <g opacity={op}>
      <Titulo c={c} a="Priming:" b="lo que activa sin avisar" />
      <rect x={380} y={250} width={440} height={200} rx={36} fill={c.panel2} opacity={ac(t, T.estimulo, T.estimulo + 0.6)} />
      <Txt f="a" x={600} y={238} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={ac(t, T.estimulo, T.estimulo + 0.6)}>sin que lo notes</Txt>
      <Chip c={c} x={230} y={350} p={e} txt="estímulo" />
      <Chip c={c} x={970} y={350} p={k} txt="conducta" marca />
      {t > T.estimulo + 0.5 && <circle cx={330 + 540 * u} cy={350 - Math.sin(Math.PI * u) * 60} r={14} fill={NARANJA} opacity={Math.sin(Math.PI * u)} style={{ filter: 'drop-shadow(0 0 10px rgba(255,133,29,0.8))' }} />}
      <g opacity={fam} transform={`translate(${600 + tiembla} 650) scale(${0.6 + 0.4 * fam})`}>
        <rect x={-230} y={-70} width={460} height={140} rx={40} fill={c.panel} style={sombra(c.sombra)} />
        {[0, 1, 2, 3, 4].map((s) => <path key={s} transform={`translate(${-150 + s * 75} -14) scale(1.4)`} d="M 0 -14 L 4 -4 L 15 -4 L 6 3 L 9 14 L 0 7 L -9 14 L -6 3 L -15 -4 L -4 -4 Z" fill={NARANJA} />)}
        <Txt f="a" x={0} y={50} textAnchor="middle" fontSize={26} fill={c.texto}>los más famosos del libro…</Txt>
        <path d="M -230 -30 L -120 0 L -60 -40 L 20 10 L 90 -20 L 230 20" fill="none" stroke={ROJO} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - grieta} />
      </g>
      <Chip c={c} x={600} y={800} p={pop(t, T.fragiles + 0.6)} txt="…y los más frágiles" w={300} />
    </g>
  );
};

/* 1 · Efecto Florida */
const Florida: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.florida, T.lapiz);
  if (op <= 0) return null;
  const palabras: [string, number][] = [['Florida', T.wFlorida], ['olvido', T.olvido], ['canas', T.canas], ['arrugas', T.arrugas]];
  const viejo = pop(t, T.viejo);
  const pas = ac(t, T.pasillo - 0.2, T.pasillo + 0.4);
  const ciclo = Math.max(0, t - T.pasillo) % 5;
  const xCtrl = 180 + Math.min(1, ciclo / 3.2) * 820, xPrim = 180 + Math.min(1, ciclo / 5) * 820;
  const paso = (v: number) => Math.abs(Math.sin(t * v)) * 6;
  return (
    <g opacity={op}>
      <Titulo c={c} a="Efecto" b="Florida" />
      {palabras.map(([w, a], i) => {
        const p = pop(t, a, 0.45);
        return (
          <g key={w} opacity={Math.min(1, p)} transform={`translate(${180 + i * 230} ${200 - (1 - p) * 80})`}>
            <rect x={-100} y={-36} width={200} height={72} rx={18} fill={c.panel} style={sombra(c.sombra)} />
            <Txt x={0} y={12} textAnchor="middle" fontSize={34} fill={c.texto}>{w}</Txt>
          </g>
        );
      })}
      <g opacity={viejo} transform={`translate(600 320) scale(${0.6 + 0.4 * viejo})`}>
        <rect x={-110} y={-34} width={220} height={68} rx={18} fill="none" stroke={c.tenue} strokeWidth={3} strokeDasharray="10 8" />
        <Txt x={0} y={12} textAnchor="middle" fontSize={32} fill={c.tenue}>viejo</Txt>
        <path d="M -100 -26 L 100 26" stroke={ROJO} strokeWidth={6} strokeLinecap="round" />
        <Txt f="a" x={160} y={10} fontSize={22} fill={c.tenue}>nunca aparece</Txt>
      </g>
      {/* El pasillo: el grupo primado camina más despacio */}
      <g opacity={pas}>
        <rect x={120} y={600} width={960} height={44} rx={22} fill={isDark ? '#333' : '#e4e7eb'} />
        <rect x={120} y={760} width={960} height={44} rx={22} fill={isDark ? '#333' : '#e4e7eb'} />
        <Persona id={ID} x={xCtrl} y={612 - paso(9)} s={0.85} cuerpo={`url(#${ID}-pizarra)`} pelo="#4a4a4a" />
        <Persona id={ID} x={xPrim} y={772 - paso(5.5)} s={0.85} />
        <Txt f="a" x={130} y={570} fontSize={22} fill={c.tenue}>grupo de control</Txt>
        <Txt f="a" x={130} y={730} fontSize={22} fill={NARANJA}>tras leer las palabras</Txt>
        <g opacity={ac(t, T.despacio, T.despacio + 0.4)}><Txt x={1080} y={730} textAnchor="end" fontSize={30} fill={NARANJA}>más despacio</Txt></g>
      </g>
      <Chip c={c} x={600} y={460} p={pop(t, T.sinConciencia)} txt="idea sin conciencia → movimiento" w={480} />
      <Chip c={c} x={600} y={860} p={pop(t, T.ideomotor)} txt="efecto ideomotor" w={300} marca />
    </g>
  );
};

/* 2 · El lápiz entre los dientes */
const Lapiz: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.lapiz, T.vohs);
  if (op <= 0) return null;
  const lap = pop(t, T.lapiz + 0.8), sonrie = ac(t, T.sonrisa, T.sonrisa + 0.6);
  const estrellas = 2 + 2.5 * ac(t, T.divertidas, T.divertidas + 1);
  const ida = ac(t, T.idaVuelta, T.idaVuelta + 0.6);
  const f1 = t > T.mueve ? 1 : 0.35, f2 = t > T.activa ? 1 : 0.35;
  return (
    <g opacity={op}>
      <Titulo c={c} a="El lápiz" b="entre los dientes" />
      <g transform="translate(330 330)">
        <circle r={150} fill={`url(#${ID}-cara)`} style={sombra(c.sombra)} />
        <path d="M -150 -30 Q -140 -170 0 -165 Q 140 -170 150 -30 Q 90 -110 0 -105 Q -90 -110 -150 -30 Z" fill="#2b1a12" />
        <ellipse cx={-50} cy={-20} rx={12} ry={12 - 4 * sonrie} fill="#3b2a20" />
        <ellipse cx={50} cy={-20} rx={12} ry={12 - 4 * sonrie} fill="#3b2a20" />
        <path d={`M -70 ${60 - 10 * sonrie} Q 0 ${60 + 50 * sonrie} 70 ${60 - 10 * sonrie}`} fill="none" stroke="#7a2a1a" strokeWidth={10} strokeLinecap="round" />
        <g opacity={lap} transform={`translate(${(1 - lap) * -200} 0)`}>
          <rect x={-190} y={52} width={340} height={22} rx={6} fill="#f2c94c" />
          <path d="M 150 52 L 200 63 L 150 74 Z" fill="#e8c9a0" />
          <path d="M 186 59 L 200 63 L 186 67 Z" fill="#333" />
          <rect x={-200} y={52} width={22} height={22} rx={4} fill={ROSA} />
        </g>
      </g>
      {/* La viñeta parece más divertida */}
      <g transform="translate(860 300)" opacity={ac(t, T.lapiz + 1.5, T.lapiz + 2)}>
        <rect x={-200} y={-150} width={400} height={300} rx={28} fill={c.panel} style={sombra(c.sombra)} />
        <rect x={-170} y={-120} width={160} height={150} rx={12} fill={c.panel2} />
        <rect x={10} y={-120} width={160} height={150} rx={12} fill={c.panel2} />
        <circle cx={-90} cy={-50} r={30} fill={`url(#${ID}-cara)`} />
        <circle cx={90} cy={-50} r={30} fill={`url(#${ID}-cara)`} />
        {[0, 1, 2, 3, 4].map((s) => <path key={s} transform={`translate(${-120 + s * 60} 95) scale(1.5)`} d="M 0 -14 L 4 -4 L 15 -4 L 6 3 L 9 14 L 0 7 L -9 14 L -6 3 L -15 -4 L -4 -4 Z" fill={s < estrellas ? NARANJA : c.apagado} />)}
      </g>
      <g opacity={ida} transform="translate(600 720)">
        <Chip c={c} x={-330} y={0} p={1} txt="idea" w={180} marca={f1 > 0.5} />
        <Chip c={c} x={0} y={0} p={1} txt="cuerpo" w={180} marca={f1 > 0.5} />
        <Chip c={c} x={330} y={0} p={1} txt="emoción" w={180} marca={f2 > 0.5} />
        <path d="M -230 0 L -110 0 M -130 -14 L -110 0 L -130 14" stroke={NARANJA} strokeWidth={6} fill="none" opacity={f1} strokeLinecap="round" />
        <path d="M 100 0 L 220 0 M 200 -14 L 220 0 L 200 14" stroke={ROSA} strokeWidth={6} fill="none" opacity={f2} strokeLinecap="round" />
        <Txt f="a" x={0} y={84} textAnchor="middle" fontSize={24} fill={c.tenue}>de ida y vuelta</Txt>
      </g>
    </g>
  );
};

/* 3 · Primado del dinero */
const Dinero: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.vohs, T.caja);
  if (op <= 0) return null;
  const barra = (y: number, a: number, txt: string, sube: boolean) => {
    const p = ac(t, a, a + 0.9);
    return (
      <g opacity={ac(t, a - 0.2, a + 0.2)}>
        <Txt f="a" x={640} y={y - 14} fontSize={24} fill={c.texto}>{txt}</Txt>
        <rect x={640} y={y} width={440} height={22} rx={11} fill={c.panel2} />
        <rect x={640} y={y} width={220 + (sube ? 1 : -1) * 160 * p} height={22} rx={11} fill={sube ? `url(#${ID}-marcaH)` : c.tenue} />
        <Txt x={1100} y={y + 20} fontSize={30} fill={sube ? NARANJA : c.tenue}>{sube ? '↑' : '↓'}</Txt>
      </g>
    );
  };
  const dist = ac(t, T.ochenta - 1.2, T.ochenta + 0.3);
  const cm = Math.round(80 + 38 * dist);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Primado del" b="dinero" />
      {Array.from({ length: 9 }, (_, k) => {
        const u = ((t - T.dinero) * 0.25 + k / 9) % 1;
        if (t < T.dinero) return null;
        return (
          <g key={k} transform={`translate(${130 + (k * 97) % 420} ${130 + u * 380}) rotate(${(k * 37 + t * 40) % 360})`} opacity={Math.sin(Math.PI * u) * 0.9}>
            <rect x={-40} y={-20} width={80} height={40} rx={6} fill="#6fbf73" />
            <circle r={10} fill="#4c9a50" />
          </g>
        );
      })}
      <Persona id={ID} x={330} y={560} s={1.2} />
      {barra(230, T.independiente, 'independencia', true)}
      {barra(310, T.independiente + 0.6, 'perseverancia', true)}
      {barra(390, T.solidaria, 'conducta solidaria', false)}
      {/* Lápices que nadie recoge */}
      {[0, 1, 2].map((k) => {
        const caida = ac(t, T.lapices + k * 0.2, T.lapices + k * 0.2 + 0.6);
        return <rect key={k} x={420 + k * 40} y={470 + caida * 70} width={70} height={10} rx={4} fill="#f2c94c" transform={`rotate(${caida * (30 + k * 20)} ${455 + k * 40} ${475 + caida * 70})`} opacity={ac(t, T.lapices - 0.1, T.lapices + 0.1)} />;
      })}
      {/* Distancia frente a un desconocido */}
      <g opacity={ac(t, T.desconocido, T.desconocido + 0.5)} transform="translate(0 0)">
        <Persona id={ID} x={300} y={830} s={0.9} />
        <Persona id={ID} x={300 + 300 + 260 * dist} y={830} s={0.9} cuerpo={`url(#${ID}-pizarra)`} pelo="#4a4a4a" />
        <line x1={360} x2={540 + 260 * dist} y1={700} y2={700} stroke={NARANJA} strokeWidth={5} />
        <path d={`M 360 688 L 360 712 M ${540 + 260 * dist} 688 L ${540 + 260 * dist} 712`} stroke={NARANJA} strokeWidth={5} />
        <Txt x={450 + 130 * dist} y={680} textAnchor="middle" fontSize={40} fill={NARANJA}>{cm} cm</Txt>
      </g>
    </g>
  );
};

/* 4 · La caja de la honestidad */
const Caja: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.caja, T.macbeth);
  if (op <= 0) return null;
  const ojos = t >= T.ojos;
  const parpadeo = ojos ? 1 - 0.9 * Math.max(0, 1 - Math.abs(((t - T.ojos) % 2.5) - 1.2) / 0.08) : 1;
  const comp = ac(t, T.triple, T.triple + 1.2);
  return (
    <g opacity={op}>
      <Titulo c={c} a="La caja de la" b="honestidad" />
      {/* Cartel: flores o unos ojos que miran */}
      <g transform="translate(330 300)">
        <rect x={-190} y={-130} width={380} height={260} rx={24} fill={c.panel} style={sombra(c.sombra)} />
        {!ojos && [0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${-110 + k * 110} 10)`}>
            {[0, 1, 2, 3, 4].map((p) => <circle key={p} cx={22 * Math.cos((p / 5) * Math.PI * 2)} cy={22 * Math.sin((p / 5) * Math.PI * 2)} r={16} fill={ROSA} opacity={0.8} />)}
            <circle r={12} fill="#f2c94c" />
          </g>
        ))}
        {ojos && [-75, 75].map((x) => (
          <g key={x} transform={`translate(${x} 0)`}>
            <ellipse rx={62} ry={38 * parpadeo} fill={c.blanco} stroke={c.tenue} strokeWidth={3} />
            <circle r={22 * Math.min(1, parpadeo * 1.3)} fill="#3b2a20" />
          </g>
        ))}
      </g>
      {/* Caja de pago voluntario */}
      <g transform="translate(330 640)" opacity={ac(t, T.pago - 0.3, T.pago + 0.2)}>
        <rect x={-110} y={-70} width={220} height={140} rx={20} fill={`url(#${ID}-marca)`} />
        <rect x={-50} y={-78} width={100} height={14} rx={7} fill={c.texto} />
        {[0, 1, 2].map((k) => {
          const u = ((t - T.pago) * 1.2 + k / 3) % 1;
          return <circle key={k} cx={0} cy={-200 + 140 * u} r={14} fill="#f2c94c" opacity={Math.sin(Math.PI * u)} />;
        })}
        <Txt f="a" x={0} y={110} textAnchor="middle" fontSize={22} fill={c.tenue}>pago voluntario por el café</Txt>
      </g>
      {/* Comparación de lo aportado */}
      <g opacity={ac(t, T.triple - 0.2, T.triple + 0.3)}>
        <rect x={720} y={760 - 120 * comp} width={130} height={120 * comp} rx={18} fill={c.apagado} />
        <rect x={900} y={760 - 360 * comp} width={130} height={360 * comp} rx={18} fill={`url(#${ID}-marca)`} />
        <Txt f="a" x={785} y={800} textAnchor="middle" fontSize={24} fill={c.tenue}>flores</Txt>
        <Txt f="a" x={965} y={800} textAnchor="middle" fontSize={24} fill={NARANJA}>ojos</Txt>
        <Txt x={965} y={380} textAnchor="middle" fontSize={34} fill={NARANJA} opacity={comp}>casi el triple</Txt>
      </g>
    </g>
  );
};

/* 5 · Efecto Lady Macbeth */
const Macbeth: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.macbeth, T.presentes);
  if (op <= 0) return null;
  const fila = (y: number, a: number, b: number, origen: React.ReactNode, destino: React.ReactNode, txtA: string, txtB: string) => {
    const pa = pop(t, a), pb = pop(t, b), fl = ac(t, b - 0.6, b);
    return (
      <g transform={`translate(0 ${y})`}>
        <g opacity={Math.min(1, pa)} transform={`translate(300 0) scale(${0.6 + 0.4 * pa})`}>
          <circle r={100} fill={c.panel} style={sombra(c.sombra)} />{origen}
          <Txt f="a" x={0} y={140} textAnchor="middle" fontSize={26} fill={c.texto}>{txtA}</Txt>
        </g>
        <path d={`M 430 0 L ${430 + 300 * fl} 0`} stroke={NARANJA} strokeWidth={8} strokeLinecap="round" opacity={fl > 0 ? 1 : 0} />
        <path d={`M ${410 + 300 * fl} -16 L ${434 + 300 * fl} 0 L ${410 + 300 * fl} 16`} fill="none" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={fl} />
        <g opacity={Math.min(1, pb)} transform={`translate(900 0) scale(${0.6 + 0.4 * pb})`}>
          <circle r={100} fill={c.panel} style={sombra(c.sombra)} />{destino}
          <Txt f="a" x={0} y={140} textAnchor="middle" fontSize={26} fill={NARANJA}>{txtB}</Txt>
        </g>
      </g>
    );
  };
  const mancha = ac(t, T.mancha, T.mancha + 1.5);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Efecto" b="Lady Macbeth" />
      {fila(280, T.telefono, T.enjuague,
        <g><rect x={-32} y={-56} width={64} height={112} rx={14} fill={c.tenue} /><rect x={-24} y={-44} width={48} height={80} rx={6} fill={c.panel2} /></g>,
        <g><rect x={-30} y={-40} width={60} height={96} rx={16} fill="#5bc0de" /><rect x={-16} y={-62} width={32} height={26} rx={6} fill={c.tenue} /></g>,
        'mintió por teléfono', 'enjuague bucal')}
      {fila(600, T.escrito, T.jabon,
        <g><rect x={-40} y={-50} width={80} height={100} rx={8} fill={c.panel2} /><rect x={10} y={-60} width={14} height={90} rx={4} fill={NARANJA} transform="rotate(30 17 -15)" /></g>,
        <g><rect x={-56} y={-30} width={112} height={60} rx={26} fill="#f7b2c4" />{[0, 1, 2].map((k) => <circle key={k} cx={-30 + k * 30} cy={-46 - k * 6} r={10 + k * 3} fill="none" stroke="#9ad7f0" strokeWidth={3} opacity={mancha} />)}</g>,
        'mintió por escrito', 'jabón de manos')}
      <g opacity={ac(t, T.mancha - 0.2, T.mancha + 0.3)} transform="translate(600 830)">
        <circle cx={-170} cy={-8} r={26 * (1 - mancha) + 4} fill={c.tenue} opacity={1 - mancha * 0.7} />
        <Txt f="a" x={0} y={0} textAnchor="middle" fontSize={26} fill={c.texto}>la mancha moral pide limpieza física</Txt>
      </g>
    </g>
  );
};

/* 6 · Tenlos presentes */
const Cierre: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.presentes, 999);
  if (op <= 0) return null;
  const nombres = ['Florida', 'Lápiz', 'Dinero', 'Honestidad', 'Macbeth'];
  return (
    <g opacity={op}>
      <Titulo c={c} a="Tenlos" b="presentes" />
      {nombres.map((n, k) => <Chip key={n} c={c} x={160 + k * 220} y={380} p={pop(t, T.presentes + k * 0.15)} txt={n} w={190} />)}
      <g opacity={pop(t, T.presentes + 1.2)} transform="translate(600 620)">
        <rect x={-250} y={-60} width={500} height={120} rx={36} fill={isDark ? '#3a2e18' : '#fff7e6'} />
        <Txt f="a" x={0} y={10} textAnchor="middle" fontSize={30} fill={isDark ? '#fbbf24' : '#b45309'}>⚠ evidencia en disputa</Txt>
      </g>
      <g opacity={pop(t, T.presentes + 1.8)} transform={`translate(${880 + 20 * Math.sin(t * 2)} 620)`}>
        <circle r={46} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} />
        <rect x={28} y={28} width={18} height={60} rx={9} fill={ROSA} transform="rotate(-45 37 58)" />
      </g>
      <Txt f="a" x={600} y={780} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={pop(t, T.presentes + 2)}>los retomaremos con lupa al final</Txt>
    </g>
  );
};

export const PrimingEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Intro isDark={isDark} t={t} />
        <Florida isDark={isDark} t={t} />
        <Lapiz isDark={isDark} t={t} />
        <Dinero isDark={isDark} t={t} />
        <Caja isDark={isDark} t={t} />
        <Macbeth isDark={isDark} t={t} />
        <Cierre isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
