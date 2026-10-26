import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, tono } from '../../remotion/comun';
import { Hoja, Insignia, Institucion, MIN_TXT, PanelPregunta, Rotulo, lerp, ventana } from './comunPD';

/**
 * «Cómo actúa la Agencia», escena propia. Primero la Agencia fiscaliza: los documentos vuelan hacia
 * ella y llama a declarar a dos personas. Luego, dos carriles: tutela de derechos (reclamo, respuesta,
 * seis meses) y sancionatorio (cargos, descargos, resolución fundada), que terminan en la Corte de
 * Apelaciones. Incumplir lo que ordena la Agencia es grave.
 */

export const W = 1200, H = 860;
const ID = 'pda';

const nombres = ['requerir', 'declarar', 'tutela', 'seisMeses', 'sancionatorio', 'cargos', 'resolucion', 'corte', 'grave', 'pregunta'] as const;
type Nombre = typeof nombres[number];
type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const XS = [360, 640, 920];

export const AgenciaPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('grave') + 1.5 : frame / fps;

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, 'Cómo actúa la Agencia'], [M('requerir'), 'Pide cualquier antecedente'], [M('declarar'), 'y llama a declarar'],
    [M('tutela'), 'Tutela de derechos'], [M('seisMeses'), 'Máximo seis meses'], [M('sancionatorio'), 'El procedimiento sancionatorio'],
    [M('cargos'), 'Cargos y descargos'], [M('resolucion'), 'Resolución fundada'], [M('corte'), 'Reclamo ante la Corte'], [M('grave'), 'Incumplirle: grave'],
  ];
  const actoA = ventana(t, -1, M('tutela'));
  const actoB = ac(t, M('tutela'), M('tutela') + 0.4);

  const carril = (y: number, nombre: string, a: number, pasos: [string, number][]) => {
    const op = Math.min(1, pop(t, a, 0.5));
    if (op < 0.01) return null;
    const d = ac(t, a + 0.2, a + 1.4);
    return (
      <g opacity={op}>
        <Txt f="a" x={70} y={y} dominantBaseline="central" fontSize={MIN_TXT} fill={NARANJA} peso={700}>{nombre}</Txt>
        <line x1={XS[0]} y1={y} x2={lerp(XS[0], XS[2], d)} y2={y} stroke={c.apagado} strokeWidth={8} strokeLinecap="round" />
        {pasos.map(([txt, ta], k) => {
          const e = Math.min(1, pop(t, ta, 0.5));
          return e > 0.01 ? (
            <g key={txt} opacity={e}>
              <circle cx={XS[k]} cy={y} r={20} fill={`url(#${ID}-marca)`} />
              <Txt f="a" x={XS[k]} y={y - 50} textAnchor="middle" fontSize={MIN_TXT} fill={c.texto}>{txt}</Txt>
            </g>
          ) : null;
        })}
      </g>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="La Agencia fiscaliza y tiene dos procedimientos de seis meses como máximo; sus resoluciones se reclaman ante la Corte de Apelaciones">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* La Agencia fiscaliza */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              <Institucion x={600} y={540} s={0.95} c={c} id={ID} escudo />
              {[0, 1, 2].map((k) => {
                const u = ac(t, M('requerir') + 0.3 + k * 0.6, M('requerir') + 1.5 + k * 0.6, 0, 1, Easing.inOut(Easing.cubic));
                return u > 0 && u < 1 ? <g key={k} opacity={1 - ac(u, 0.85, 1)}><Hoja x={lerp(140, 520, u)} y={lerp(260 + k * 90, 430, u)} w={70} h={90} c={c} cabeza={`url(#${ID}-marca)`} titulo="" llena={1} rot={-10 + 10 * u} /></g> : null;
              })}
              {(() => {
                const op = Math.min(1, pop(t, M('declarar'), 0.5));
                return op > 0.01 ? (
                  <g opacity={op}>
                    {[920, 1060].map((x, k) => <Persona key={x} id={ID} x={x} y={640} s={0.6} cuerpo={['#64748b', '#94a3b8'][k]} />)}
                    <path d="M 930 440 H 1030 Q 1050 440 1050 460 V 486 Q 1050 506 1030 506 H 960 L 940 526 L 944 506 H 930 Q 910 506 910 486 V 460 Q 910 440 930 440 Z" fill={NARANJA} />
                    {[0, 1, 2].map((k) => <circle key={k} cx={950 + k * 30} cy={473} r={6} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 5 + k)} />)}
                  </g>
                ) : null;
              })()}
            </g>
          )}

          {/* Dos procedimientos */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {carril(300, 'tutela', M('tutela'), [['reclamo', M('tutela') + 0.6], ['respuesta', M('tutela') + 3], ['6 meses', M('seisMeses')]])}
              {carril(540, 'sanción', M('sancionatorio'), [['cargos', M('cargos')], ['descargos', M('cargos') + 2], ['fundada', M('resolucion')]])}
              {(() => {
                const op = Math.min(1, pop(t, M('corte'), 0.6));
                if (op < 0.01) return null;
                const d = ac(t, M('corte'), M('corte') + 1);
                return (
                  <g opacity={op}>
                    <path d={`M ${XS[2]} 570 Q ${XS[2]} 680 ${lerp(XS[2], 720, d)} ${lerp(570, 720, d)}`} fill="none" stroke={NARANJA} strokeWidth={5} strokeDasharray="8 8" />
                    <Institucion x={600} y={790} s={0.55} c={c} id={ID} />
                  </g>
                );
              })()}
              <g opacity={Math.min(1, pop(t, M('grave'), 0.5))}><Insignia x={960} y={760} texto="grave" c={c} id={ID} tono="alerta" /></g>
            </g>
          )}
          {ROSA && null}
        </g>
        <PanelPregunta texto={pregunta} v={vP} c={c} id={ID} />
      </svg>
    </AbsoluteFill>
  );
};
