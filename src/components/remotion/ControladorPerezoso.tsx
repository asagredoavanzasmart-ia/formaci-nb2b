import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, ROJO, VERDE, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/** «El controlador perezoso», animada con Remotion. Tiempos relativos al inicio de la diapositiva en el audio. */
const T = {
  supervisar: 0.15, perezoso: 4.24, firma: 5.64, aprueba: 7.08,
  bate: 10.18, total: 13.32, unDolarMas: 15.0, sola: 17.05, mal: 19.83, siCostara: 20.91, totalSeria: 24.76,
  correcta: 27.45, porque: 29.96, mitad: 33.15,
  silogismo: 38.45, rosas: 40.68, marchitan: 42.35, luego: 44.75, valido: 47.31, noRosas: 51.27, parece: 53.45, estructura: 57.06,
  estimar: 59.08, michigan: 61.28, detroit: 63.02, masDetroit: 64.55, dentro: 66.45,
  stanovich: 69.6, algoritmica: 72.78, reflexiva: 76.5, entrena: 81.55,
};
export const W = 1200, H = 900;
const ID = 'cp';

/* 1 · El Sistema 2 firma sin leer */
const Firma: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.bate);
  if (op <= 0) return null;
  const papeles = [T.perezoso, T.aprueba + 0.2, T.aprueba + 0.9, T.aprueba + 1.6];
  return (
    <g opacity={op}>
      <Txt x={600} y={80} textAnchor="middle" fontSize={50} fill={c.texto}>El controlador <tspan fill={`url(#${ID}-marcaH)`}>perezoso</tspan></Txt>
      <Persona id={ID} x={260} y={720} s={2} />
      <Txt f="a" x={260} y={790} textAnchor="middle" fontSize={30} fill={NARANJA}>Sistema 1</Txt>
      <Persona id={ID} x={940} y={720} s={2} cuerpo={`url(#${ID}-pizarra)`} pelo="#4a4a4a" ojos={0} />
      <Txt f="a" x={940} y={790} textAnchor="middle" fontSize={30} fill={c.tenue}>Sistema 2</Txt>
      {[0, 1, 2].map((k) => <Txt key={k} x={1010 + k * 26} y={330 - k * 34} fontSize={40 - k * 6} fill={c.tenue} opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 1.4 + k))}>z</Txt>)}
      {papeles.map((a, k) => {
        const viaje = ac(t, a, a + 0.6);
        const x = 380 + viaje * 360, y = 470 - Math.sin(viaje * Math.PI) * 120 + k * 10;
        const sello = pop(t, a + 0.65 + (k === 0 ? T.firma - T.perezoso - 0.65 : 0), 0.35);
        if (t < a) return null;
        return (
          <g key={k} transform={`translate(${x} ${y}) rotate(${-6 + k * 4})`}>
            <rect x={-95} y={-120} width={190} height={240} rx={16} fill={c.panel} style={sombra(c.sombra)} />
            {[0, 1, 2, 3, 4].map((l) => <rect key={l} x={-65} y={-80 + l * 34} width={l === 4 ? 70 : 130} height={12} rx={6} fill={c.apagado} />)}
            <g opacity={Math.min(1, sello * 1.5)} transform={`rotate(-14) scale(${2.2 - 1.2 * sello})`}>
              <rect x={-92} y={-34} width={184} height={68} rx={12} fill="none" stroke={ROJO} strokeWidth={7} />
              <Txt x={0} y={14} textAnchor="middle" fontSize={34} fill={ROJO} letterSpacing={2}>APROBADO</Txt>
            </g>
          </g>
        );
      })}
      <g opacity={ac(t, T.firma, T.firma + 0.4)}>
        <rect x={720} y={150} width={300} height={64} rx={32} fill={c.panel} style={sombra(c.sombra)} />
        <Txt f="a" x={870} y={192} textAnchor="middle" fontSize={30} fill={c.texto}>firma sin leer</Txt>
      </g>
    </g>
  );
};

/* 2 · El bate y la pelota */
const Bate: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.bate, T.silogismo);
  if (op <= 0) return null;
  const aparece = pop(t, T.bate);
  const sola = pop(t, T.sola, 0.3);
  const mal = ac(t, T.mal, T.mal + 0.3);
  const temblor = t > T.mal && t < T.mal + 0.6 ? Math.sin(t * 60) * 6 : 0;
  const correcta = pop(t, T.correcta);
  const fila = (y: number, a: number, txt: [string, string, string], ok: boolean, t0Res: number) => {
    const p = ac(t, a, a + 0.5), r = pop(t, t0Res);
    return (
      <g opacity={p} transform={`translate(0 ${(1 - p) * 20})`}>
        <rect x={150} y={y - 50} width={900} height={84} rx={24} fill={c.panel} style={sombra(c.sombra * 0.8)} />
        <Txt x={200} y={y + 6} fontSize={44} fill={c.texto}>{txt[0]}</Txt>
        <Txt x={410} y={y + 6} fontSize={44} fill={c.tenue}>+</Txt>
        <Txt x={470} y={y + 6} fontSize={44} fill={c.texto}>{txt[1]}</Txt>
        <Txt x={680} y={y + 6} fontSize={44} fill={c.tenue}>=</Txt>
        <g opacity={r}>
          <Txt x={740} y={y + 6} fontSize={48} fill={ok ? VERDE : ROJO}>{txt[2]}</Txt>
          <circle cx={990} cy={y - 8} r={28} fill={ok ? VERDE : ROJO} />
          <Txt f="a" x={990} y={y + 4} textAnchor="middle" fontSize={32} fill="#fff">{ok ? '✓' : '✗'}</Txt>
        </g>
      </g>
    );
  };
  const mitad = ac(t, T.mitad + 0.4, T.mitad + 1.6);
  const tramoMitad = acto(t, T.mitad, T.silogismo + 1);
  return (
    <g opacity={op}>
      {/* Bate y pelota */}
      <g opacity={aparece} transform={`translate(0 ${(1 - aparece) * 40})`}>
        <g transform="translate(400 210) rotate(-18)">
          <rect x={-200} y={-22} width={320} height={44} rx={22} fill="#c98a4b" />
          <rect x={-250} y={-12} width={80} height={24} rx={12} fill="#8a5a2b" />
        </g>
        <g transform={`translate(${800 + temblor} 220)`}>
          <circle r={52} fill={c.blanco} style={sombra(c.sombra)} />
          <path d="M -34 -38 Q -8 0 -34 38 M 34 -38 Q 8 0 34 38" stroke={ROJO} strokeWidth={4} fill="none" />
        </g>
      </g>
      <g opacity={ac(t, T.total, T.total + 0.4)}>
        <path d="M 200 330 q 0 30 30 30 L 560 360 q 30 0 40 30 q 10 -30 40 -30 L 870 360 q 30 0 30 -30" fill="none" stroke={c.tenue} strokeWidth={5} />
        <Txt x={600} y={440} textAnchor="middle" fontSize={44} fill={c.texto}>$1,10 en total</Txt>
      </g>
      <g opacity={ac(t, T.unDolarMas, T.unDolarMas + 0.4)}>
        <Txt x={400} y={110} textAnchor="middle" fontSize={36} fill={NARANJA}>$1,00 más que la pelota</Txt>
      </g>
      {/* La respuesta que aparece sola */}
      <g opacity={sola * (1 - ac(t, T.siCostara - 0.2, T.siCostara + 0.2) * 0.6) * (1 - correcta)} transform={`translate(${800 + temblor} 110) scale(${0.6 + 0.4 * sola})`}>
        <rect x={-90} y={-42} width={180} height={84} rx={42} fill={mal > 0.5 ? ROJO : `url(#${ID}-marca)`} style={{ filter: 'drop-shadow(0 6px 18px rgba(255,133,29,0.55))' }} />
        <Txt x={0} y={16} textAnchor="middle" fontSize={50} fill="#fff">10¢</Txt>
        <path d="M -70 -30 L 70 30" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={mal} />
      </g>
      <g opacity={correcta} transform={`translate(800 110) scale(${0.6 + 0.4 * correcta})`}>
        <rect x={-90} y={-42} width={180} height={84} rx={42} fill={VERDE} />
        <Txt x={0} y={16} textAnchor="middle" fontSize={50} fill="#fff">5¢</Txt>
      </g>
      <g opacity={1 - tramoMitad}>
        {fila(560, T.siCostara, ['0,10', '1,10', '1,20'], false, T.totalSeria)}
        {fila(690, T.correcta, ['0,05', '1,05', '1,10'], true, T.porque + 0.6)}
      </g>
      {/* Más de la mitad responde 10¢ */}
      <g opacity={tramoMitad}>
        {['Harvard', 'MIT', 'Princeton'].map((u, k) => (
          <g key={u} opacity={pop(t, T.mitad + k * 0.2)} transform={`translate(${210 + k * 190} 640)`}>
            <rect x={-80} y={-32} width={160} height={64} rx={32} fill={c.panel2} />
            <Txt f="a" x={0} y={11} textAnchor="middle" fontSize={28} fill={c.texto}>{u}</Txt>
          </g>
        ))}
        <g transform="translate(900 640)">
          <circle r={110} fill={c.panel2} />
          <path d={`M 0 0 L 0 -110 A 110 110 0 ${mitad > 0.5 ? 1 : 0} 1 ${110 * Math.sin(mitad * 0.56 * 2 * Math.PI)} ${-110 * Math.cos(mitad * 0.56 * 2 * Math.PI)} Z`} fill={`url(#${ID}-marca)`} />
          <circle r={58} fill={c.panel} />
          <Txt x={0} y={14} textAnchor="middle" fontSize={40} fill={c.texto}>10¢</Txt>
        </g>
        <Txt f="a" x={900} y={800} textAnchor="middle" fontSize={30} fill={c.tenue} opacity={mitad}>más de la mitad</Txt>
      </g>
    </g>
  );
};

/* 3 · El silogismo, con círculos de Euler */
const Silogismo: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.silogismo, T.estimar);
  if (op <= 0) return null;
  const flores = pop(t, T.rosas, 0.6), rosas = pop(t, T.rosas + 0.6, 0.6), march = pop(t, T.marchitan, 0.6);
  const separa = ac(t, T.noRosas, T.noRosas + 1.3);
  const mx = 560 + 230 * separa, my = 430 + 40 * separa;
  const valido = pop(t, T.valido), invalido = ac(t, T.noRosas + 0.6, T.noRosas + 1);
  const lupa = ac(t, T.parece, T.parece + 0.5);
  return (
    <g opacity={op}>
      <Txt x={600} y={80} textAnchor="middle" fontSize={46} fill={c.texto}>El <tspan fill={`url(#${ID}-marcaH)`}>silogismo</tspan> de las flores</Txt>
      <circle cx={560} cy={460} r={300 * flores} fill={isDark ? 'rgba(255,210,168,0.12)' : 'rgba(255,174,115,0.18)'} />
      <Txt f="a" x={330} y={230} fontSize={30} fill={NARANJA} opacity={flores}>flores</Txt>
      <circle cx={430} cy={500} r={120 * rosas} fill={`url(#${ID}-marca)`} opacity={0.85} />
      <Txt f="a" x={430} y={510} textAnchor="middle" fontSize={32} fill="#fff" opacity={rosas}>rosas</Txt>
      <circle cx={mx} cy={my} r={110 * march} fill={isDark ? 'rgba(148,163,184,0.45)' : 'rgba(100,116,139,0.4)'} />
      <Txt f="a" x={mx} y={my - 4} textAnchor="middle" fontSize={24} fill={c.texto} opacity={march}>se marchitan</Txt>
      <Txt f="a" x={mx} y={my + 26} textAnchor="middle" fontSize={24} fill={c.texto} opacity={march}>pronto</Txt>
      <g opacity={ac(t, T.luego, T.luego + 0.5)}>
        <rect x={150} y={790} width={900} height={74} rx={22} fill={c.panel} style={sombra(c.sombra * 0.8)} />
        <Txt f="a" x={600} y={838} textAnchor="middle" fontSize={32} fill={c.texto}>∴ algunas rosas se marchitan pronto</Txt>
      </g>
      <g transform="translate(990 300)" opacity={valido}>
        <circle r={72} fill={invalido > 0.5 ? ROJO : VERDE} style={sombra(c.sombra)} />
        <Txt f="a" x={0} y={18} textAnchor="middle" fontSize={56} fill="#fff">{invalido > 0.5 ? '✗' : '✓'}</Txt>
        <Txt f="a" x={0} y={116} textAnchor="middle" fontSize={28} fill={c.texto}>{invalido > 0.5 ? 'inválido' : 'suena válido'}</Txt>
      </g>
      {/* El Sistema 2 no revisa la estructura */}
      <g opacity={lupa} transform="translate(990 560)">
        <circle cx={-8} cy={-8} r={40} fill="none" stroke={c.tenue} strokeWidth={10} />
        <rect x={20} y={20} width={16} height={56} rx={8} fill={c.tenue} transform="rotate(-45 28 48)" />
        <path d="M -60 -60 L 60 60" stroke={ROJO} strokeWidth={10} strokeLinecap="round" opacity={ac(t, T.estructura, T.estructura + 0.4)} />
        <Txt f="a" x={0} y={120} textAnchor="middle" fontSize={24} fill={c.tenue}>no revisa la estructura</Txt>
      </g>
    </g>
  );
};

/* 4 · Michigan y Detroit */
const MICHIGAN = 'M 330 180 Q 300 260 300 360 Q 290 470 330 560 Q 380 640 470 650 Q 560 650 600 590 Q 640 520 620 430 Q 610 380 640 340 Q 660 290 630 250 Q 600 220 590 270 Q 580 320 560 300 Q 540 200 470 160 Q 390 130 330 180 Z';
const Mapa: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.estimar, T.stanovich);
  if (op <= 0) return null;
  const mich = pop(t, T.michigan, 0.6), det = pop(t, T.detroit, 0.5);
  const error = ac(t, T.masDetroit, T.masDetroit + 0.8);
  const corrige = ac(t, T.dentro, T.dentro + 1.2);
  // Primero el error (Detroit por encima del estado entero); luego Michigan crece hasta contenerlo.
  const hMich = 180 + 220 * corrige, hDet = 70 + 230 * error - 30 * corrige;
  const pulso = t > T.dentro ? 1 + 0.25 * Math.abs(Math.sin((t - T.dentro) * 4)) : 1;
  const barra = (x: number, h: number, nombre: string, fill: string) => (
    <g>
      <rect x={x - 60} y={760 - h} width={120} height={h} rx={20} fill={fill} />
      <Txt f="a" x={x} y={805} textAnchor="middle" fontSize={28} fill={c.texto}>{nombre}</Txt>
    </g>
  );
  return (
    <g opacity={op}>
      <Txt x={600} y={80} textAnchor="middle" fontSize={46} fill={c.texto}>Homicidios estimados al año</Txt>
      <g opacity={mich} transform={`translate(-80 ${(1 - mich) * 30})`}>
        <path d={MICHIGAN} fill={isDark ? 'rgba(255,210,168,0.18)' : 'rgba(255,174,115,0.3)'} stroke={NARANJA} strokeWidth={5} />
        <Txt f="a" x={450} y={300} textAnchor="middle" fontSize={34} fill={c.texto}>Michigan</Txt>
        <g opacity={det}>
          <circle cx={560} cy={540} r={18 * pulso} fill={ROSA} />
          {t > T.dentro && <circle cx={560} cy={540} r={18 + 40 * ((t - T.dentro) % 1)} fill="none" stroke={ROSA} strokeWidth={4} opacity={1 - ((t - T.dentro) % 1)} />}
          <Txt f="a" x={560} y={600} textAnchor="middle" fontSize={28} fill={ROSA}>Detroit</Txt>
        </g>
      </g>
      <g opacity={ac(t, T.detroit, T.detroit + 0.5)}>
        {barra(820, hMich, 'Michigan', `url(#${ID}-marca)`)}
        {barra(1000, hDet, 'Detroit', error > 0.5 && corrige < 0.5 ? ROJO : c.apagado)}
        <g opacity={corrige} transform="translate(910 400)">
          <circle r={34} fill={VERDE} />
          <Txt f="a" x={0} y={12} textAnchor="middle" fontSize={36} fill="#fff">≥</Txt>
        </g>
      </g>
    </g>
  );
};

/* 5 · Las dos mentes de Stanovich */
const Mentes: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.stanovich, 999);
  if (op <= 0) return null;
  const a = pop(t, T.algoritmica), r = pop(t, T.reflexiva), e = ac(t, T.entrena, T.entrena + 0.6);
  const tarjeta = (x: number, p: number, titulo: string, sub: string, activa: boolean, icono: React.ReactNode) => (
    <g opacity={p * (activa ? 1 : 1 - 0.5 * e)} transform={`translate(${x} 470) scale(${(0.8 + 0.2 * p) * (activa ? 1 + 0.05 * e : 1 - 0.05 * e)})`}>
      <rect x={-250} y={-260} width={500} height={520} rx={40} fill={c.panel} style={activa && e > 0 ? { filter: `drop-shadow(0 10px ${20 + 20 * e}px rgba(255,133,29,${0.25 + 0.3 * e}))` } : sombra(c.sombra)} />
      {activa && <rect x={-250} y={-260} width={500} height={16} rx={8} fill={`url(#${ID}-marcaH)`} opacity={e} />}
      <g transform="translate(0 -70)">{icono}</g>
      <Txt x={0} y={120} textAnchor="middle" fontSize={40} fill={c.texto}>{titulo}</Txt>
      <Txt f="a" x={0} y={170} textAnchor="middle" fontSize={24} peso={400} fill={c.tenue}>{sub}</Txt>
    </g>
  );
  const giro = t * 60;
  const lx = Math.sin(t * 2) * 30;
  return (
    <g opacity={op}>
      <Txt x={600} y={80} textAnchor="middle" fontSize={44} fill={c.texto}>Keith Stanovich: <tspan fill={`url(#${ID}-marcaH)`}>dos mentes</tspan></Txt>
      {tarjeta(330, a, 'Mente algorítmica', 'lo que mide un test de inteligencia', false,
        <g transform={`rotate(${giro})`}>{Array.from({ length: 8 }, (_, k) => <rect key={k} x={-14} y={-92} width={28} height={40} rx={6} fill={c.tenue} transform={`rotate(${k * 45})`} />)}<circle r={62} fill={c.tenue} /><circle r={24} fill={c.panel} /></g>)}
      {tarjeta(870, r, 'Mente reflexiva', 'la disposición a verificar', true,
        <g>
          <rect x={-70} y={-60} width={140} height={120} rx={14} fill={c.panel2} />
          <path d="M -30 0 L -8 22 L 34 -24" stroke={VERDE} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <g transform={`translate(${lx} -10)`}><circle r={46} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={12} /><rect x={28} y={28} width={18} height={60} rx={9} fill={ROSA} transform="rotate(-45 37 58)" /></g>
        </g>)}
      <g opacity={e} transform={`translate(870 790) scale(${0.7 + 0.3 * e})`}>
        <rect x={-200} y={-36} width={400} height={72} rx={36} fill={`url(#${ID}-marca)`} />
        <Txt f="a" x={0} y={12} textAnchor="middle" fontSize={30} fill="#fff">esta clase entrena esta</Txt>
      </g>
    </g>
  );
};

export const ControladorPerezoso: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Firma isDark={isDark} t={t} />
        <Bate isDark={isDark} t={t} />
        <Silogismo isDark={isDark} t={t} />
        <Mapa isDark={isDark} t={t} />
        <Mentes isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
