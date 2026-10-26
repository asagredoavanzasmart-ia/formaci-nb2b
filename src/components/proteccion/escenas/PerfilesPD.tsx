import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, VERDE, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Contacto, Insignia, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Perfiles y decisiones automáticas», escena propia. Una máquina recibe datos y un medidor puntúa a una
 * persona; una decisión automática la rechaza con efectos importantes. Arriba, las tres excepciones.
 * Luego una persona revisora junto a la máquina y, a la izquierda, los derechos que siempre quedan:
 * explicación, intervención humana, opinar y revisión. La máquina se vuelve transparente (su lógica se
 * informa) y aparece la evaluación de impacto.
 */

export const W = 1200, H = 860;
const ID = 'pdl';

const nombres = ['automatizado', 'predecir', 'aspectos', 'noObjeto', 'efectos', 'excepciones', 'incluso', 'humana', 'revision', 'logica', 'impacto', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const MX = 680, MY = 450; // máquina
const GX = 1010, GY = 430; // medidor

const engranaje = (r: number, n: number) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 4; i++) { const a = (i / (n * 4)) * Math.PI * 2, rr = i % 4 < 2 ? r : r * 0.76; pts.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`); }
  return `M ${pts.join(' L ')} Z`;
};

/* Máquina del modelo: caja con engranajes; `vidrio` la vuelve transparente. */
const Maquina: React.FC<{ c: Tono; t: number; vidrio: number }> = ({ c, t, vidrio }) => (
  <g transform={`translate(${MX} ${MY})`}>
    <rect x={-160} y={-120} width={320} height={240} rx={26} fill={c.apagado} style={sombra(c.sombra)} />
    <g transform={`translate(-50 -10) rotate(${t * 50})`}><path d={engranaje(52, 9)} fill={`url(#${ID}-marca)`} /><circle r={18} fill={c.panel} /></g>
    <g transform={`translate(52 34) rotate(${-t * 70})`}><path d={engranaje(36, 8)} fill={NARANJA} /><circle r={12} fill={c.panel} /></g>
    {/* Frente opaco que se desvanece al informar la lógica */}
    <rect x={-140} y={-100} width={280} height={200} rx={16} fill={c.panel2} opacity={0.92 * (1 - vidrio)} />
    <rect x={-140} y={-100} width={280} height={200} rx={16} fill="none" stroke={c.tenue} strokeWidth={4} opacity={vidrio} strokeDasharray="10 8" />
    <rect x={-172} y={-30} width={14} height={60} rx={5} fill={c.tenue} />
    <rect x={158} y={-30} width={14} height={60} rx={5} fill={c.tenue} />
  </g>
);

/* Medidor de puntaje con su aguja. */
const Medidor: React.FC<{ u: number; c: Tono }> = ({ u, c }) => {
  const a = Math.PI * (1 - u);
  return (
    <g transform={`translate(${GX} ${GY})`}>
      <path d="M -90 30 A 90 90 0 0 1 90 30" fill="none" stroke={c.apagado} strokeWidth={22} strokeLinecap="round" />
      <path d="M -90 30 A 90 90 0 0 1 90 30" fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={`${u} 1`} />
      <line x1={0} y1={30} x2={Math.cos(a) * 70} y2={30 - Math.sin(a) * 70} stroke={c.texto} strokeWidth={7} strokeLinecap="round" />
      <circle cx={0} cy={30} r={12} fill={c.texto} />
    </g>
  );
};

const DERECHOS: { n: Nombre; txt: string; d: number }[] = [
  { n: 'incluso', txt: 'explicación', d: 0.6 }, { n: 'humana', txt: 'intervención humana', d: 0 },
  { n: 'humana', txt: 'opinar', d: 1.2 }, { n: 'revision', txt: 'revisión', d: 0 },
];

export const PerfilesPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('impacto') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'La segunda regla: los perfiles'], [M('automatizado'), 'Un tratamiento automatizado…'], [M('predecir'), '…que evalúa o predice'],
    [M('aspectos'), 'Economía, salud, preferencias…'], [M('noObjeto'), 'Derecho a no ser objeto'], [M('efectos'), 'si produce efectos importantes'],
    [M('excepciones'), 'Tres excepciones'], [M('incluso'), 'Aun así, siempre se puede'], [M('humana'), 'Una persona interviene'],
    [M('revision'), 'y se puede pedir revisión'], [M('logica'), 'La lógica se informa'], [M('impacto'), 'Y exige evaluación de impacto'],
  ];

  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const entrada = ventana(t, M('automatizado'), M('incluso'));
  const puntua = ac(t, M('predecir'), M('predecir') + 1.6, 0, 1, Easing.inOut(Easing.cubic)) * (0.35 + 0.1 * Math.sin(t * 1.5));
  const vidrio = ac(t, M('logica'), M('logica') + 1.2);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Nadie debe quedar sujeto a una decisión solo automatizada con efectos importantes; siempre hay explicación, intervención humana y revisión">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* Datos que entran a la máquina */}
          {entrada > 0.01 && [0, 1, 2, 3].map((k) => {
            const u = ((t - M('automatizado')) * 0.4 + k / 4) % 1;
            return <Contacto key={k} x={lerp(90, MX - 190, u)} y={MY + Math.sin(u * 6 + k) * 10} s={0.85} relleno={k % 2 ? c.tenue : `url(#${ID}-marca)`} op={Math.sin(Math.PI * u) * entrada} />;
          })}
          <g opacity={e('automatizado', -0.4)}><Maquina c={c} t={t} vidrio={vidrio} /></g>

          {/* El medidor puntúa a la persona */}
          <g opacity={e('predecir')}>
            <line x1={MX + 172} y1={MY - 20} x2={GX - 100} y2={GY + 20} stroke={NARANJA} strokeWidth={5} strokeDasharray="8 8" />
            <Medidor u={puntua} c={c} />
          </g>
          <g opacity={e('noObjeto')}><Persona id={ID} x={1060} y={800} s={0.6} cuerpo="#64748b" /></g>
          {(() => {
            const op = ventana(t, M('efectos'), M('incluso'));
            return op > 0.01 ? <g opacity={op}><Insignia x={950} y={620} texto="rechazo" c={c} id={ID} tono="alerta" ancho={210} /></g> : null;
          })()}

          {/* Tres excepciones */}
          {(() => {
            const op = ventana(t, M('excepciones'), M('incluso'));
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                {[['contrato', 220], ['consentimiento', 600], ['ley', 980]].map(([txt, x], k) => (
                  <g key={txt as string} opacity={Math.min(1, pop(t, M('excepciones') + 0.3 + k * 0.5, 0.5))}><Insignia x={x as number} y={190} texto={txt as string} c={c} id={ID} tono="tenue" /></g>
                ))}
              </g>
            );
          })()}

          {/* Una persona revisa junto a la máquina */}
          {(() => {
            const op = ac(t, M('humana'), M('humana') + 0.5);
            if (op < 0.01) return null;
            return (
              <g opacity={op}>
                <Persona id={ID} x={MX} y={800} s={0.7} />
                <g transform={`translate(${MX + 70} 690) rotate(-20)`}>
                  <circle r={26} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={8} />
                  <line x1={18} y1={18} x2={40} y2={40} stroke={c.texto} strokeWidth={9} strokeLinecap="round" />
                </g>
              </g>
            );
          })()}

          {/* Derechos que siempre quedan */}
          {DERECHOS.map((d, k) => {
            const op = Math.min(1, pop(t, M(d.n) + d.d, 0.5));
            if (op < 0.01) return null;
            const y = 300 + k * 84;
            return (
              <g key={d.txt} opacity={op}>
                <circle cx={64} cy={y} r={16} fill={VERDE} />
                <path d={`M 56 ${y} L 62 ${y + 7} L 73 ${y - 7}`} fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                <Txt f="a" x={94} y={y} dominantBaseline="central" fontSize={MIN_TXT} fill={c.texto}>{d.txt}</Txt>
              </g>
            );
          })}

          {/* La lógica se informa y la evaluación de impacto */}
          {(() => {
            const op = ventana(t, M('logica'), M('impacto'));
            return op > 0.01 ? <g opacity={op}><Insignia x={600} y={190} texto="lógica informada" c={c} id={ID} /></g> : null;
          })()}
          {(() => {
            const op = ac(t, M('impacto'), M('impacto') + 0.4);
            return op > 0.01 ? <g opacity={Math.min(op, pop(t, M('impacto'), 0.5))}><Insignia x={600} y={190} texto="evaluación de impacto" c={c} id={ID} tono="verde" /></g> : null;
          })()}
          {ROSA && null}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
