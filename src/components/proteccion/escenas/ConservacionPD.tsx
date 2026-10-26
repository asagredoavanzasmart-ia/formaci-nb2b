import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { BaseDatos, Candado, Contacto, ESCUDO, Insignia, MIN_TXT, PanelPregunta, Rotulo, ventana } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Los datos vencen», escena propia. Acto A: una base con su etiqueta de vencimiento y un reloj de
 * arena. Acto B: anonimizar es cortar con tijeras el vínculo entre la persona y su dato, para siempre;
 * seudonimizar es dejar el vínculo punteado y la llave aparte, bajo candado. Acto C: tres papeleras
 * (cotizaciones, deudas prescritas y fin del encargo). Acto D: el plano del diseño con su escudo y un
 * formulario que, por defecto, solo pide lo necesario.
 */

export const W = 1200, H = 860;
const ID = 'pdv';

const nombres = ['vence', 'tiempo', 'anon', 'seudo', 'precon', 'prescritas', 'encargado', 'diseno', 'defecto', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

/* Reloj de arena con la arena que cae. */
const ArenaReloj: React.FC<{ x: number; y: number; u: number; c: Tono }> = ({ x, y, u, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-130} width={140} height={16} rx={6} fill={c.tenue} />
    <rect x={-70} y={114} width={140} height={16} rx={6} fill={c.tenue} />
    <path d="M -56 -114 H 56 Q 56 -40 6 0 Q 56 40 56 114 H -56 Q -56 40 -6 0 Q -56 -40 -56 -114 Z" fill={c.panel} stroke={c.apagado} strokeWidth={5} />
    <path d={`M ${-44 * (1 - u)} ${-100 + 90 * u} H ${44 * (1 - u)} L 0 -8 Z`} fill="#fbbf24" />
    <path d={`M -44 104 H 44 L ${30 * (1 - u)} ${104 - 70 * u} H ${-30 * (1 - u)} Z`} fill="#f59e0b" />
    <line x1={0} y1={-6} x2={0} y2={100} stroke="#f59e0b" strokeWidth={3} strokeDasharray="4 6" opacity={u < 1 ? 1 : 0} />
  </g>
);

/* Papelera. */
const Papelera: React.FC<{ x: number; y: number; c: Tono }> = ({ x, y, c }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M -60 -50 H 60 L 48 70 H -48 Z" fill={c.tenue} />
    <rect x={-74} y={-70} width={148} height={20} rx={8} fill={c.texto} />
    {[-24, 0, 24].map((xx) => <line key={xx} x1={xx} y1={-30} x2={xx * 0.85} y2={52} stroke={c.panel} strokeWidth={6} strokeLinecap="round" />)}
  </g>
);

export const ConservacionPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('defecto') + 2 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Guardar también tiene reglas'], [M('vence'), 'Los datos vencen'], [M('tiempo'), 'Solo el tiempo necesario'],
    [M('anon'), 'Anonimizar: cortar el vínculo'], [M('seudo'), 'Seudonimizar: separarlo'], [M('precon'), 'Suprimir cotizaciones…'],
    [M('prescritas'), '…deudas prescritas…'], [M('encargado'), '…y lo del encargo terminado'], [M('diseno'), 'Desde el diseño'], [M('defecto'), 'Por defecto, solo lo necesario'],
  ];
  const e = (n: Nombre, d = 0) => Math.min(1, pop(t, M(n) + d, 0.55));
  const aA = ventana(t, -1, M('anon')), aB = ventana(t, M('anon'), M('precon')), aC = ventana(t, M('precon'), M('diseno')), aD = ac(t, M('diseno'), M('diseno') + 0.4);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Los datos se guardan solo el tiempo necesario y luego se suprimen o anonimizan; por defecto, solo lo estrictamente necesario">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {aA > 0.01 && (
            <g opacity={aA}>
              <g opacity={e('vence', -0.4)}><BaseDatos x={420} y={320} c={c} t={t} /></g>
              <g opacity={e('vence', 0.4)}><Insignia x={420} y={580} texto="vence" c={c} id={ID} tono="alerta" /></g>
              <g opacity={e('tiempo')}><ArenaReloj x={800} y={430} u={ac(t, M('tiempo'), M('anon'), 0, 1, Easing.linear)} c={c} /></g>
            </g>
          )}

          {aB > 0.01 && (
            <g opacity={aB}>
              {/* Anonimizar: las tijeras cortan el vínculo y el dato queda sin persona */}
              {(() => {
                const corta = ac(t, M('anon') + 1, M('anon') + 1.6);
                const cae = ac(t, M('anon') + 1.6, M('anon') + 3, 0, 1, Easing.in(Easing.quad));
                return (
                  <g>
                    <Persona id={ID} x={170} y={640} s={0.8} />
                    <path d={`M 220 520 Q 270 ${500 + 120 * cae} 300 ${530 + 140 * cae}`} fill="none" stroke={NARANJA} strokeWidth={6} opacity={1 - cae} />
                    <path d={`M 330 ${530 + 140 * cae} Q 360 ${500 + 120 * cae} 400 520`} fill="none" stroke={NARANJA} strokeWidth={6} opacity={1 - cae} />
                    {corta < 1 && <line x1={220} y1={520} x2={400} y2={520} stroke={NARANJA} strokeWidth={6} opacity={1 - corta} />}
                    <g transform={`translate(315 ${470 + 40 * corta}) rotate(${-20 + 40 * Math.sin(t * 10) * (1 - corta)})`}>
                      <circle cx={-16} cy={-26} r={12} fill="none" stroke={c.texto} strokeWidth={6} />
                      <circle cx={16} cy={-26} r={12} fill="none" stroke={c.texto} strokeWidth={6} />
                      <line x1={-8} y1={-16} x2={14} y2={30} stroke={c.texto} strokeWidth={6} strokeLinecap="round" />
                      <line x1={8} y1={-16} x2={-14} y2={30} stroke={c.texto} strokeWidth={6} strokeLinecap="round" />
                    </g>
                    <Contacto x={460} y={520} s={1.8} relleno={c.tenue} />
                    <Txt f="a" x={320} y={740} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>anónimo</Txt>
                  </g>
                );
              })()}
              {/* Seudonimizar: el vínculo queda punteado y la llave aparte, bajo candado */}
              <g opacity={e('seudo')}>
                <Persona id={ID} x={740} y={640} s={0.8} cuerpo="#64748b" />
                <line x1={790} y1={520} x2={950} y2={520} stroke={NARANJA} strokeWidth={6} strokeDasharray="6 12" />
                <Contacto x={1010} y={520} s={1.8} relleno={`url(#${ID}-marca)`} />
                <Candado x={880} y={330} s={0.8} id={ID} />
                <Txt f="a" x={880} y={740} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>seudónimo</Txt>
              </g>
            </g>
          )}

          {aC > 0.01 && (
            <g opacity={aC}>
              {([['precon', 'cotización', 250], ['prescritas', 'prescritas', 600], ['encargado', 'encargo', 950]] as [Nombre, string, number][]).map(([n, txt, x]) => {
                const op = e(n);
                if (op < 0.01) return null;
                const u = ac(t, M(n) + 0.3, M(n) + 1.3, 0, 1, Easing.in(Easing.quad));
                return (
                  <g key={n} opacity={op}>
                    {u < 1 && <Contacto x={x} y={240 + 220 * u} s={1.2} relleno={`url(#${ID}-marca)`} op={1 - ac(u, 0.8, 1)} />}
                    <Papelera x={x} y={520} c={c} />
                    <Txt f="a" x={x} y={650} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
                  </g>
                );
              })}
            </g>
          )}

          {aD > 0.01 && (
            <g opacity={aD}>
              {/* Plano del diseño con su escudo */}
              <g transform="translate(340 440)">
                <rect x={-210} y={-170} width={420} height={340} rx={22} fill="#1e3a8a" opacity={0.85} />
                {Array.from({ length: 8 }, (_, k) => <line key={`v${k}`} x1={-210 + k * 60} y1={-170} x2={-210 + k * 60} y2={170} stroke="#93c5fd" strokeWidth={1.5} opacity={0.5} />)}
                {Array.from({ length: 6 }, (_, k) => <line key={`h${k}`} x1={-210} y1={-170 + k * 68} x2={210} y2={-170 + k * 68} stroke="#93c5fd" strokeWidth={1.5} opacity={0.5} />)}
                <path d={ESCUDO} transform={`scale(${2.2 * Math.min(1, pop(t, M('diseno') + 0.5, 0.6))})`} fill="none" stroke="#fff" strokeWidth={4} />
              </g>
              {/* Por defecto: solo los campos necesarios */}
              {(() => {
                const op = e('defecto');
                if (op < 0.01) return null;
                const apaga = ac(t, M('defecto') + 0.6, M('defecto') + 1.8);
                return (
                  <g opacity={op} transform="translate(880 440)">
                    <rect x={-170} y={-190} width={340} height={380} rx={24} fill={c.panel} style={sombra(c.sombra)} />
                    {Array.from({ length: 6 }, (_, k) => {
                      const nec = k < 2;
                      return <rect key={k} x={-130} y={-150 + k * 56} width={260} height={38} rx={10} fill={nec ? `url(#${ID}-marcaH)` : c.panel2} opacity={nec ? 1 : 1 - 0.7 * apaga} stroke={nec ? 'none' : ROSA} strokeWidth={nec ? 0 : 3 * apaga} strokeDasharray="6 6" />;
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
