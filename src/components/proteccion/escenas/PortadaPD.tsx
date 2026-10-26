import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Contacto, ESCUDO, Hoja, Institucion, Oficinas, PanelPregunta, Rotulo, escribe, lerp } from './comunPD';
import type { Tono } from './comunPD';

/**
 * Portada de «Protección de datos», escena propia. Tres actos sobre el mismo escenario:
 * 1) el dato deja de ser un insumo libre que corre por el embudo de la campaña y queda atado a su
 *    dueño, como un préstamo que hay que justificar; 2) la Ley 21.719 cae sobre la mesa, nace la
 *    Agencia, la Ley 19.628 se reescribe y el arco de derechos cubre a personas, empresas y órganos
 *    públicos; 3) la puerta del 1 de diciembre: las bases antiguas y las campañas activas la cruzan
 *    sin régimen especial, y quedan tres tareas: revisar, documentar y cambiar.
 * `marcas` son segundos desde el inicio de la diapositiva (paginas1.ts, pd-portada); la última es la pregunta.
 */

export const W = 1200, H = 860;
const ID = 'pdp';

const nombres = ['dato', 'libre', 'prestamo', 'justificar', 'ley', 'agencia', 'reescribe', 'alcance', 'publicos', 'derechos', 'regimen', 'activas', 'reglas', 'revisar', 'documentar', 'cambiar', 'piensa', 'pregunta'] as const;
type Nombre = typeof nombres[number];

type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const DUENOS = [{ cuerpo: '#64748b', pelo: '#2b1a12' }, { cuerpo: '#94a3b8', pelo: '#6b3e1f' }, { cuerpo: '#475569', pelo: '#111827' }, { cuerpo: '#7c8aa0', pelo: '#a16207' }, { cuerpo: '#5b6472', pelo: '#3f2a1d' }, { cuerpo: '#8a96a8', pelo: '#1f2937' }];

/* Calendario de pared: la hoja de noviembre se levanta y deja el 1 de diciembre de 2026. */
const Calendario: React.FC<{ x: number; y: number; t: number; c: Tono }> = ({ x, y, t, c }) => {
  const flip = ac(t, 0.4, 1.5, 0, 1, Easing.in(Easing.cubic));
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-110} y={-120} width={220} height={250} rx={24} fill={c.panel} style={sombra(c.sombra)} />
      <path d="M -110 -96 Q -110 -120 -86 -120 H 86 Q 110 -120 110 -96 V -50 H -110 Z" fill={`url(#${ID}-marca)`} />
      <Txt x={0} y={-74} textAnchor="middle" fontSize={34} fill="#fff" letterSpacing={4}>DIC</Txt>
      <Txt x={0} y={62} textAnchor="middle" fontSize={130} fill={c.texto}>1</Txt>
      <Txt f="a" x={0} y={108} textAnchor="middle" fontSize={28} fill={c.tenue}>2026</Txt>
      {flip < 1 && (
        <g transform={`translate(0 -120) scale(1 ${1 - flip}) translate(0 120)`} opacity={1 - flip * 0.3}>
          <rect x={-110} y={-120} width={220} height={250} rx={24} fill={c.panel2} />
          <path d="M -110 -96 Q -110 -120 -86 -120 H 86 Q 110 -120 110 -96 V -50 H -110 Z" fill={c.apagado} />
          <Txt x={0} y={-74} textAnchor="middle" fontSize={34} fill="#fff" letterSpacing={4}>NOV</Txt>
          <Txt x={0} y={62} textAnchor="middle" fontSize={130} fill={c.tenue}>30</Txt>
        </g>
      )}
      {[-50, 50].map((a) => <rect key={a} x={a - 7} y={-136} width={14} height={34} rx={7} fill={c.tenue} />)}
    </g>
  );
};

/* Embudo de la campaña por donde corren los datos. */
const Embudo: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={118} rx={46} ry={10} fill="#000" opacity={0.12} />
    <path d="M -150 -80 L -30 40 V 104 H 30 V 40 L 150 -80 Z" fill={c.apagado} />
    <path d="M 0 -80 H 150 L 30 40 V 104 H 0 Z" fill="#000" opacity={0.1} />
    <ellipse cx={0} cy={-80} rx={150} ry={34} fill={c.panel2} />
    <ellipse cx={0} cy={-80} rx={132} ry={26} fill={c.tenue} opacity={0.35} />
    <Txt f="a" x={0} y={146} textAnchor="middle" fontSize={22} fill={c.tenue} letterSpacing={2}>CAMPAÑA</Txt>
  </g>
);

/* Base de datos: dos cilindros apilados en tres tonos. */
const Base: React.FC<{ x: number; y: number; c: Tono; t: number }> = ({ x, y, c, t }) => {
  const cil = (cy: number, k: number) => (
    <g key={k} transform={`translate(0 ${cy})`}>
      <path d="M -72 0 V 52 A 72 23 0 0 0 72 52 V 0 Z" fill={c.apagado} />
      <path d="M 0 23 V 75 A 72 23 0 0 0 72 52 V 0 A 72 23 0 0 1 0 23 Z" fill="#000" opacity={0.12} />
      <ellipse cx={0} cy={0} rx={72} ry={23} fill={c.panel2} />
      {[0, 1, 2].map((j) => <circle key={j} cx={-30 + j * 30} cy={0} r={6} fill={NARANJA} opacity={0.35 + 0.35 * ((Math.sin(t * 3 + j + k) + 1) / 2)} />)}
    </g>
  );
  return <g transform={`translate(${x} ${y})`}><ellipse cx={0} cy={140} rx={86} ry={16} fill="#000" opacity={0.12} />{cil(62, 1)}{cil(0, 0)}</g>;
};

/* Pieza de campaña publicitaria activa, con su punto «en vivo» que late. */
const Aviso: React.FC<{ x: number; y: number; c: Tono; t: number; k: number }> = ({ x, y, c, t, k }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-50} width={160} height={100} rx={16} fill={c.panel} style={sombra(c.sombra, 6, 12)} />
    <rect x={-68} y={-40} width={136} height={50} rx={10} fill={`url(#${ID}-marca)`} opacity={0.85} />
    <path d="M -52 2 L -28 -22 L -10 -6 L 6 -18 L 30 2 Z" fill="#fff" opacity={0.5} />
    <rect x={-68} y={22} width={70} height={9} rx={4.5} fill={c.apagado} />
    <circle cx={34} cy={27} r={6 + 2 * Math.sin(t * 6 + k)} fill={ROSA} />
    <Txt f="a" x={46} y={33} fontSize={14} fill={ROSA} peso={700}>EN VIVO</Txt>
  </g>
);

const engranaje = (r: number, n: number) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 4; i++) {
    const a = (i / (n * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.76;
    pts.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
};

/* Recorrido de un dato libre: entra por la boca del embudo, baja por el cuello y sale a la derecha. */
const RUTA: [number, number][] = [[330, 120], [560, 162], [620, 300], [640, 352], [920, 392]];
const enRuta = (u: number): [number, number] => {
  const n = RUTA.length - 1, s = Math.min(n - 1e-6, u * n), i = Math.floor(s), f = s - i;
  return [lerp(RUTA[i][0], RUTA[i + 1][0], f), lerp(RUTA[i][1], RUTA[i + 1][1], f)];
};

export const PortadaPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('piensa') + 1.2 : frame / fps;

  const acto1 = 1 - ac(t, M('ley') - 0.5, M('ley') + 0.1);
  const acto2 = ac(t, M('ley') - 0.3, M('ley') + 0.3) * (1 - ac(t, M('regimen') - 0.5, M('regimen') + 0.1));
  const acto3 = ac(t, M('regimen') - 0.3, M('regimen') + 0.3);

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '1 de diciembre de 2026'], [M('dato'), 'Cada dato de una campaña…'], [M('libre'), '…deja de ser un insumo libre'],
    [M('prestamo'), '…y pasa a ser un préstamo'], [M('justificar'), 'que alguien debe poder justificar'], [M('ley'), 'Ley 21.719'],
    [M('agencia'), 'Crea la Agencia de Protección de Datos'], [M('reescribe'), 'Reescribe la Ley 19.628'],
    [M('alcance'), 'Personas naturales y jurídicas'], [M('publicos'), 'También los órganos públicos'],
    [M('derechos'), 'Respetar derechos y libertades'], [M('regimen'), 'Sin régimen especial para las bases antiguas'],
    [M('activas'), 'Ni para las campañas activas'], [M('reglas'), 'Las mismas reglas para todo'],
    [M('revisar'), 'Qué revisar, documentar y cambiar'], [M('piensa'), '¿De dónde salió cada contacto?'],
  ];

  // Acto 1: los datos corren libres y luego quedan atados a sus dueños.
  const atado = (k: number) => ac(t, M('prestamo') + k * 0.1, M('prestamo') + 1 + k * 0.1);
  const hx = (k: number) => 600 + (k - 2.5) * 118;

  // Acto 3: las bases y campañas cruzan la puerta del 1 de diciembre.
  const cruza = ac(t, M('reglas'), M('reglas') + 1.8, 0, 1, Easing.inOut(Easing.cubic));
  const destello = Math.sin(Math.PI * cruza);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Desde el 1 de diciembre de 2026 cada dato es un préstamo: la Ley 21.719 reescribe la 19.628, crea la Agencia y rige sin régimen especial para bases y campañas activas">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO 1 · del insumo libre al préstamo */}
          {acto1 > 0.01 && (
            <g opacity={acto1}>
              <g opacity={ac(t, 0, 0.4)}><Calendario x={180} y={300} t={t} c={c} /></g>
              <g opacity={ac(t, M('dato') - 0.4, M('dato') + 0.2)}><Embudo x={620} y={250} c={c} /></g>

              {/* Hilos: cada dato queda atado a la persona a la que pertenece */}
              {DUENOS.map((_, k) => {
                const q = atado(k);
                if (q < 0.02) return null;
                const x = hx(k), y = 520 + Math.sin(t * 1.7 + k) * 6;
                const sway = Math.sin(t * 1.3 + k * 1.7) * 14;
                const u = ((t - M('prestamo')) * 0.45 + k / 6) % 1;
                const py = lerp(y + 20, 706, u);
                return (
                  <g key={`h${k}`} opacity={q}>
                    <path d={`M ${x} ${y + 20} Q ${x + sway} ${(y + 706) / 2} ${x} 706`} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={3} strokeDasharray="6 7" />
                    <circle cx={x + sway * 0.5 * Math.sin(Math.PI * u)} cy={py} r={5} fill={NARANJA} opacity={Math.sin(Math.PI * u)} />
                  </g>
                );
              })}
              {DUENOS.map((d, k) => {
                const e = pop(t, M('prestamo') + 0.3 + k * 0.1, 0.5);
                return e > 0.01 ? <g key={`p${k}`} opacity={Math.min(1, e)}><Persona id={ID} x={hx(k)} y={800} s={0.55 * Math.min(1, e)} cuerpo={d.cuerpo} pelo={d.pelo} /></g> : null;
              })}

              {/* Los datos: primero corren por el embudo, después cuelgan de su dueño */}
              {DUENOS.map((_, k) => {
                const e = Math.min(1, pop(t, M('dato') + k * 0.15, 0.5));
                if (e < 0.01) return null;
                const q = atado(k);
                const [fx, fy] = enRuta(((t - M('dato')) * 0.3 + k / 6) % 1);
                const x = lerp(fx, hx(k), q), y = lerp(fy, 520 + Math.sin(t * 1.7 + k) * 6, q);
                const libre = ac(t, M('libre'), M('libre') + 0.6) * (1 - q);
                const rot = Math.sin(t * 2.4 + k) * 14 * libre;
                return (
                  <g key={`d${k}`}>
                    <Contacto x={x} y={y} s={e * (1 + 0.15 * q)} relleno={c.tenue} rot={rot} op={1 - q} />
                    <Contacto x={x} y={y} s={e * (1 + 0.15 * q)} relleno={`url(#${ID}-marca)`} op={q} />
                  </g>
                );
              })}

              {/* Ticket de justificación */}
              {(() => {
                const e = Math.min(1, pop(t, M('justificar'), 0.55));
                if (e < 0.01) return null;
                const chk = ac(t, M('justificar') + 0.9, M('justificar') + 1.5);
                return (
                  <g opacity={e} transform={`translate(985 250) scale(${0.8 + 0.2 * e}) rotate(${4 - 4 * e})`}>
                    <path d="M -140 -80 H 140 V 80 L 120 92 L 100 80 L 80 92 L 60 80 L 40 92 L 20 80 L 0 92 L -20 80 L -40 92 L -60 80 L -80 92 L -100 80 L -120 92 L -140 80 Z" fill={c.panel} style={sombra(c.sombra)} />
                    <Txt f="a" x={-112} y={-38} fontSize={18} fill={NARANJA} letterSpacing={3}>JUSTIFICAR</Txt>
                    <Txt x={-112} y={6} fontSize={30} fill={c.texto}>{escribe('¿De dónde salió?', ac(t, M('justificar') + 0.2, M('justificar') + 1.2))}</Txt>
                    <circle cx={92} cy={-30} r={22} fill="none" stroke={VERDE} strokeWidth={5} opacity={chk} />
                    <path d="M 81 -30 L 89 -21 L 104 -39" fill="none" stroke={VERDE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - chk} />
                    <rect x={-112} y={34} width={180} height={10} rx={5} fill={c.apagado} />
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO 2 · la ley, la Agencia, la ley antigua reescrita y su alcance */}
          {acto2 > 0.01 && (
            <g opacity={acto2}>
              {/* Ley 21.719 que cae sobre la mesa y se escribe */}
              {(() => {
                const e = Math.min(1, pop(t, M('ley'), 0.7));
                const sello = pop(t, M('ley') + 2.2, 0.5);
                return (
                  <g opacity={e} transform={`translate(0 ${-60 * (1 - e)})`}>
                    <Hoja x={600} y={350} w={300} h={380} c={c} cabeza={`url(#${ID}-marca)`} titulo="LEY 21.719" llena={ac(t, M('ley') + 0.3, M('ley') + 2.2)} />
                    <g transform={`translate(690 470) scale(${Math.min(1.2, sello)})`} opacity={Math.min(1, sello)}>
                      <circle r={34} fill={NARANJA} opacity={0.15} />
                      <circle r={26} fill="none" stroke={NARANJA} strokeWidth={4} />
                      <path transform="scale(0.38)" d={ESCUDO} fill={NARANJA} />
                    </g>
                  </g>
                );
              })()}

              {/* Nace la Agencia de Protección de Datos Personales y fiscaliza */}
              {(() => {
                const e = Math.min(1, pop(t, M('agencia'), 0.6));
                if (e < 0.01) return null;
                return (
                  <g opacity={e}>
                    <Institucion x={985} y={470} s={0.85 * (0.85 + 0.15 * e)} c={c} id={ID} escudo />
                    <Txt x={985} y={512} textAnchor="middle" fontSize={22} fill={c.texto}>Agencia de Protección</Txt>
                    <Txt x={985} y={540} textAnchor="middle" fontSize={22} fill={c.texto}>de Datos Personales</Txt>
                    {[0, 1, 2, 3].map((k) => {
                      const u = ((t - M('agencia')) * 0.6 + k / 4) % 1;
                      return <circle key={k} cx={lerp(890, 760, u)} cy={lerp(400, 360, u) - Math.sin(Math.PI * u) * 24} r={6} fill={NARANJA} opacity={Math.sin(Math.PI * u) * e} />;
                    })}
                  </g>
                );
              })()}

              {/* La Ley 19.628 de la vida privada se reescribe como ley de datos personales */}
              {(() => {
                const e = Math.min(1, pop(t, M('reescribe'), 0.6));
                if (e < 0.01) return null;
                const tacha = ac(t, M('reescribe') + 0.8, M('reescribe') + 1.4);
                const nuevo = ac(t, M('reescribe') + 1.5, M('reescribe') + 2.8, 0, 1, Easing.linear);
                const lapiz = tacha < 1 ? lerp(140, 290, tacha) : lerp(140, 300, nuevo);
                const lapizY = tacha < 1 ? 330 : 382;
                return (
                  <g opacity={e} transform="rotate(-5 215 360)">
                    <Hoja x={215} y={360} w={250} h={300} c={c} cabeza={c.tenue} titulo="LEY 19.628" llena={0} gris tituloTam={26} />
                    <Txt x={215} y={340} textAnchor="middle" fontSize={30} fill={c.tenue}>vida privada</Txt>
                    <line x1={130} y1={330} x2={lerp(130, 300, tacha)} y2={330} stroke={ROSA} strokeWidth={6} strokeLinecap="round" />
                    <Txt x={215} y={392} textAnchor="middle" fontSize={30} fill={NARANJA}>{escribe('datos personales', nuevo)}</Txt>
                    {nuevo < 1 && tacha > 0 && (
                      <g transform={`translate(${lapiz} ${lapizY}) rotate(-35)`}>
                        <rect x={-6} y={-70} width={12} height={58} rx={3} fill={NARANJA} />
                        <path d="M -6 -12 L 6 -12 L 0 0 Z" fill={c.texto} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* Alcance: persona natural, persona jurídica y órganos públicos */}
              {(() => {
                const a = Math.min(1, pop(t, M('alcance'), 0.5)), b = Math.min(1, pop(t, M('alcance') + 0.6, 0.5)), p = Math.min(1, pop(t, M('publicos'), 0.5));
                return (
                  <g>
                    {a > 0.01 && <g opacity={a}><Persona id={ID} x={330} y={800} s={0.62 * a} /><Txt f="a" x={330} y={842} textAnchor="middle" fontSize={22} fill={c.tenue}>persona natural</Txt></g>}
                    {b > 0.01 && <g opacity={b}><Oficinas x={600} y={800} s={0.6 * b} c={c} t={t} /><Txt f="a" x={600} y={842} textAnchor="middle" fontSize={22} fill={c.tenue}>persona jurídica</Txt></g>}
                    {p > 0.01 && <g opacity={p}><Institucion x={870} y={800} s={0.6 * p} c={c} id={ID} bandera={t} /><Txt f="a" x={870} y={842} textAnchor="middle" fontSize={22} fill={c.tenue}>órganos públicos</Txt></g>}
                  </g>
                );
              })()}

              {/* Arco de derechos y libertades que cubre a todos */}
              {(() => {
                const d = ac(t, M('derechos'), M('derechos') + 1.4);
                if (d < 0.01) return null;
                const e = Math.min(1, pop(t, M('derechos') + 0.9, 0.5));
                return (
                  <g>
                    <path d="M 230 830 C 230 560 970 560 970 830 Z" fill={`url(#${ID}-halo)`} opacity={0.5 * d} />
                    <path d="M 230 830 C 230 560 970 560 970 830" fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={8} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} />
                    <g opacity={e} transform={`translate(600 618) scale(${0.62 * e})`}>
                      <path d={ESCUDO} fill={`url(#${ID}-marca)`} style={sombra(c.sombra, 4, 8)} />
                      <path d="M -14 4 L -3 16 L 17 -10" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <Txt f="a" x={600} y={570} textAnchor="middle" fontSize={22} fill={NARANJA} opacity={e}>derechos y libertades</Txt>
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO 3 · la puerta del 1 de diciembre: sin régimen especial */}
          {acto3 > 0.01 && (
            <g opacity={acto3}>
              {/* Suelo y puerta */}
              <line x1={90} y1={640} x2={1110} y2={640} stroke={c.apagado} strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" />
              <g transform="translate(600 0)">
                <rect x={-30 - 30 * destello} y={160} width={60 + 60 * destello} height={480} rx={30} fill={`url(#${ID}-halo)`} opacity={0.4 + 0.6 * destello} />
                <rect x={-12} y={170} width={24} height={470} rx={12} fill={`url(#${ID}-marca)`} />
                <Txt x={0} y={146} textAnchor="middle" fontSize={28} fill={c.texto}>1 dic 2026</Txt>
              </g>

              {/* «Régimen especial»: un cartel que se tacha */}
              {(() => {
                const e = Math.min(1, pop(t, M('regimen') + 0.4, 0.5)) * (1 - ac(t, M('reglas'), M('reglas') + 0.6));
                if (e < 0.01) return null;
                const tacha = ac(t, M('regimen') + 1.2, M('regimen') + 1.8);
                return (
                  <g opacity={e} transform="translate(300 575)">
                    <rect x={-140} y={-34} width={280} height={68} rx={16} fill={c.panel2} stroke={c.apagado} strokeWidth={3} />
                    <Txt x={0} y={10} textAnchor="middle" fontSize={26} fill={c.tenue}>régimen especial</Txt>
                    <line x1={-120} y1={0} x2={lerp(-120, 120, tacha)} y2={0} stroke={ROSA} strokeWidth={7} strokeLinecap="round" />
                  </g>
                );
              })()}

              {/* Bases que ya existen y campañas activas, que cruzan la puerta */}
              <g transform={`translate(${560 * cruza} 0)`}>
                {(() => {
                  const e = Math.min(1, pop(t, M('regimen'), 0.6));
                  return (
                    <g opacity={e}>
                      <Base x={220} y={330} c={c} t={t} />
                      <Txt f="a" x={220} y={505} textAnchor="middle" fontSize={22} fill={c.tenue}>bases que ya existen</Txt>
                    </g>
                  );
                })()}
                {[0, 1].map((k) => {
                  const e = Math.min(1, pop(t, M('activas') + k * 0.3, 0.5));
                  return e > 0.01 ? <g key={k} opacity={e}><Aviso x={420 + k * 20} y={300 + k * 112} c={c} t={t} k={k} /></g> : null;
                })}
                {(() => {
                  const e = ac(t, M('activas') + 0.3, M('activas') + 0.8);
                  return <Txt f="a" x={430} y={505} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e}>campañas activas</Txt>;
                })()}
              </g>

              {/* Sello: las mismas reglas */}
              {(() => {
                const e = pop(t, M('reglas') + 1.6, 0.5);
                if (e < 0.01) return null;
                return (
                  <g opacity={Math.min(1, e)} transform={`translate(910 580) rotate(-6) scale(${2 - Math.min(1, e)})`}>
                    <rect x={-150} y={-36} width={300} height={72} rx={18} fill={c.panel} stroke={`url(#${ID}-marcaH)`} strokeWidth={5} />
                    <Txt x={0} y={11} textAnchor="middle" fontSize={30} fill={NARANJA}>mismas reglas</Txt>
                  </g>
                );
              })()}

              {/* Qué revisar, qué documentar y qué cambiar */}
              {(() => {
                const r = Math.min(1, pop(t, M('revisar'), 0.5)), d = Math.min(1, pop(t, M('documentar'), 0.5)), g = Math.min(1, pop(t, M('cambiar'), 0.5));
                const sale = 1 - ac(t, M('piensa') - 0.3, M('piensa') + 0.3);
                return (
                  <g opacity={sale}>
                    {r > 0.01 && (
                      <g opacity={r} transform={`translate(${300 + Math.sin(t * 2.2) * 22} 728) scale(${r})`}>
                        <circle r={40} fill={c.panel} stroke={`url(#${ID}-marca)`} strokeWidth={11} />
                        <circle cx={-12} cy={-12} r={9} fill="#fff" opacity={0.6} />
                        <line x1={30} y1={30} x2={62} y2={62} stroke={c.texto} strokeWidth={14} strokeLinecap="round" />
                      </g>
                    )}
                    {r > 0.01 && <Txt f="a" x={300} y={826} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={r}>revisar</Txt>}
                    {d > 0.01 && (
                      <g opacity={d}>
                        <Hoja x={600} y={728} w={96} h={118} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={ac(t, M('documentar') + 0.2, M('documentar') + 2.4)} />
                        <Txt f="a" x={600} y={826} textAnchor="middle" fontSize={22} fill={c.tenue}>documentar</Txt>
                      </g>
                    )}
                    {g > 0.01 && (
                      <g opacity={g}>
                        <g transform={`translate(900 728) rotate(${(t - M('cambiar')) * 70}) scale(${g})`}>
                          <path d={engranaje(48, 9)} fill={`url(#${ID}-marca)`} />
                          <circle r={18} fill={c.panel} />
                        </g>
                        <Txt f="a" x={900} y={826} textAnchor="middle" fontSize={22} fill={c.tenue}>cambiar</Txt>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ¿De dónde salió cada contacto? Las fichas salen de la campaña con su origen en duda */}
              {(() => {
                const e = ac(t, M('piensa'), M('piensa') + 0.6);
                if (e < 0.01) return null;
                return (
                  <g opacity={e}>
                    {[0, 1, 2, 3].map((k) => {
                      const u = ac(t, M('piensa') + k * 0.18, M('piensa') + 0.8 + k * 0.18, 0, 1, Easing.out(Easing.cubic));
                      const x = lerp(990, 760 + k * 110, u), y = lerp(330, 740, u);
                      return (
                        <g key={k}>
                          <path d={`M ${x} ${y - 20} Q ${x - 60} ${y - 90} ${x - 40} ${y - 140}`} fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="5 8" opacity={u} />
                          <Contacto x={x} y={y} relleno={`url(#${ID}-marca)`} op={u} />
                          <g opacity={u} transform={`translate(${x - 40} ${y - 160})`}>
                            <circle r={18} fill={c.panel} stroke={ROSA} strokeWidth={3} />
                            <Txt x={0} y={9} textAnchor="middle" fontSize={24} fill={ROSA}>?</Txt>
                          </g>
                        </g>
                      );
                    })}
                  </g>
                );
              })()}
            </g>
          )}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
