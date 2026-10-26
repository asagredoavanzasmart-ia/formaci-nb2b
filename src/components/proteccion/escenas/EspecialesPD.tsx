import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Cruz, Insignia, MIN_TXT, PanelPregunta, Rotulo, ventana } from './comunPD';

/**
 * «Datos con reglas especiales», escena propia en cuatro cuadros: una huella que se dibuja con lo que
 * hay que informar (biometría); una regla de edades con 14, 16 y 18 años (menores); un mapa con su pin
 * y lo que se informa (geolocalización); y un corazón rodeado de los cuatro ámbitos donde los datos de
 * salud no se pueden tratar ni ceder.
 */

export const W = 1200, H = 860;
const ID = 'pdz';

const nombres = ['bio', 'sistema', 'ninos', 'catorce', 'dieciseis', 'geo', 'tercero', 'salud', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const edadX = (a: number) => 140 + a * 51.1;

export const EspecialesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('salud') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Datos con reglas especiales'], [M('bio'), 'Biométricos: consentimiento expreso'], [M('sistema'), 'e informar cómo se usan'],
    [M('ninos'), 'Niños, niñas y adolescentes'], [M('catorce'), 'Bajo 14: los padres consienten'], [M('dieciseis'), 'Sensibles bajo 16: también los padres'],
    [M('geo'), 'Geolocalización: informar'], [M('tercero'), 'y si se cede a un tercero'], [M('salud'), 'Salud en trabajo, estudio, deporte o seguros: no'],
  ];
  const chip = (txt: string, x: number, y: number, a: number) => {
    const op = Math.min(1, pop(t, a, 0.5));
    return op > 0.01 ? <g key={txt} opacity={op}><Insignia x={x} y={y} texto={txt} c={c} id={ID} tono="tenue" /></g> : null;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Biometría, menores, geolocalización y salud tienen reglas especiales">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Biometría: una huella que se dibuja */}
          {(() => {
            const op = ventana(t, M('bio') - 0.3, M('ninos'));
            if (op < 0.01) return null;
            const d = ac(t, M('bio'), M('bio') + 2.4);
            return (
              <g opacity={op}>
                <g transform="translate(380 460)">
                  {Array.from({ length: 7 }, (_, k) => {
                    const r = 30 + k * 20;
                    return <path key={k} d={`M ${-r} 30 A ${r} ${r * 1.25} 0 0 1 ${r} 30`} fill="none" stroke={k % 2 ? NARANJA : ROSA} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${ac(d, k / 9, k / 9 + 0.4)} 1`} />;
                  })}
                  <line x1={-170} y1={-40 + 120 * ((t * 0.4) % 1)} x2={170} y2={-40 + 120 * ((t * 0.4) % 1)} stroke={NARANJA} strokeWidth={4} opacity={0.6 * d} />
                </g>
                {['sistema', 'finalidad', 'período', 'derechos'].map((txt, k) => chip(txt, 860, 280 + k * 110, M('sistema') + k * 1.2))}
              </g>
            );
          })()}

          {/* Menores: la regla de las edades */}
          {(() => {
            const op = ventana(t, M('ninos'), M('geo'));
            if (op < 0.01) return null;
            const d = ac(t, M('ninos'), M('ninos') + 1.2);
            const padres = ac(t, M('catorce'), M('catorce') + 0.8);
            const sens = ac(t, M('dieciseis'), M('dieciseis') + 0.8);
            return (
              <g opacity={op}>
                <rect x={edadX(0)} y={456} width={(edadX(18) - edadX(0)) * d} height={28} rx={14} fill={c.apagado} />
                <rect x={edadX(0)} y={456} width={(edadX(14) - edadX(0)) * padres} height={28} rx={14} fill={`url(#${ID}-marcaH)`} />
                <rect x={edadX(14)} y={456} width={(edadX(16) - edadX(14)) * sens} height={28} fill={ROSA} opacity={0.6} />
                {[14, 16, 18].map((a) => (
                  <g key={a} opacity={d}>
                    <line x1={edadX(a)} y1={446} x2={edadX(a)} y2={494} stroke={c.texto} strokeWidth={4} />
                    <Txt x={edadX(a)} y={535} textAnchor="middle" fontSize={30} fill={c.texto}>{a}</Txt>
                  </g>
                ))}
                <Txt f="a" x={(edadX(0) + edadX(14)) / 2} y={420} textAnchor="middle" fontSize={MIN_TXT} fill={NARANJA} opacity={padres}>padres</Txt>
                <Txt f="a" x={(edadX(14) + edadX(18)) / 2} y={420} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto} opacity={padres}>adulto</Txt>
                <Txt f="a" x={edadX(15.5)} y={598} textAnchor="middle" fontSize={MIN_TXT} fill={ROSA} opacity={sens}>sensibles: padres</Txt>
                {[8, 15, 17].map((a, k) => <g key={a} opacity={d}><Persona id={ID} x={edadX(a)} y={730} s={0.42 + k * 0.05} cuerpo={['#94a3b8', '#64748b', '#475569'][k]} /></g>)}
              </g>
            );
          })()}

          {/* Geolocalización: un mapa con su pin */}
          {(() => {
            const op = ventana(t, M('geo'), M('salud'));
            if (op < 0.01) return null;
            const cae = ac(t, M('geo') + 0.2, M('geo') + 1, 0, 1, Easing.out(Easing.bounce));
            const onda = ((t - M('geo')) / 1.6) % 1;
            return (
              <g opacity={op}>
                <g transform="translate(450 450)">
                  <rect x={-200} y={-180} width={400} height={360} rx={26} fill={c.panel2} style={sombra(c.sombra)} />
                  <path d="M -200 -40 Q -60 -80 40 20 T 200 60" fill="none" stroke={c.panel} strokeWidth={26} />
                  <path d="M -60 -180 Q -20 0 -100 180" fill="none" stroke={c.panel} strokeWidth={20} />
                  <circle cx={30} cy={10} r={30 + 90 * onda} fill="none" stroke={NARANJA} strokeWidth={4} opacity={1 - onda} />
                  <g transform={`translate(30 ${-200 + 210 * cae})`}>
                    <path d="M 0 0 C -12 -24 -40 -36 -40 -66 A 40 40 0 0 1 40 -66 C 40 -36 12 -24 0 0 Z" fill={`url(#${ID}-marca)`} />
                    <circle cx={0} cy={-66} r={14} fill="#fff" />
                  </g>
                </g>
                {['tipo', 'finalidad', 'duración'].map((txt, k) => chip(txt, 900, 300 + k * 110, M('geo') + 1 + k * 1.2))}
                {chip('tercero', 900, 630, M('tercero'))}
              </g>
            );
          })()}

          {/* Salud: cuatro ámbitos donde no se trata ni se cede */}
          {(() => {
            const op = ac(t, M('salud'), M('salud') + 0.4);
            if (op < 0.01) return null;
            const late = 1 + 0.06 * Math.sin(t * 6);
            return (
              <g opacity={op}>
                <path transform={`translate(600 460) scale(${1.6 * late})`} d="M 0 30 C -60 -10 -60 -60 -28 -60 C -12 -60 0 -48 0 -36 C 0 -48 12 -60 28 -60 C 60 -60 60 -10 0 30 Z" fill={ROSA} />
                {[['trabajo', 250, 300], ['estudio', 950, 300], ['deporte', 250, 640], ['seguros', 950, 640]].map(([txt, x, y], k) => {
                  const e = Math.min(1, pop(t, M('salud') + 0.3 + k * 0.4, 0.5));
                  return (
                    <g key={txt as string} opacity={e}>
                      <Insignia x={x as number} y={y as number} texto={txt as string} c={c} id={ID} tono="tenue" />
                      <Cruz x={(x as number) + ((x as number) < 600 ? 150 : -150)} y={(y as number) - 40} s={0.8} />
                    </g>
                  );
                })}
              </g>
            );
          })()}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
