import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, acto, pop, sombra, tono, type PropsEscena } from './comun';

/* Tiempos en segundos desde el inicio de la diapositiva en el audio de la clase (924,77 s). */
const T = {
  caso: 0.15, describen: 7.2, preguntan: 15.2,
  casi: 21.2, fijate: 23.5,
  entra: 37.6, cada: 42.8,
  cuesta: 57.0, candidato: 59.2,
  impresiona: 66.9, numeros: 68.3, decision: 70.1,
};
export const W = 1200, H = 900;
const ID = 'rp';
const GRIS = '#94a3b8';

const Titulo: React.FC<{ c: ReturnType<typeof tono>; a: string; b: string }> = ({ c, a, b }) => (
  <Txt x={600} y={70} textAnchor="middle" fontSize={44} fill={c.texto}>{a} <tspan fill={`url(#${ID}-marcaH)`}>{b}</tspan></Txt>
);

/* Pastilla con texto, que aparece con rebote. */
const Pastilla: React.FC<{ c: ReturnType<typeof tono>; x: number; y: number; p: number; txt: string; w?: number; marca?: boolean }> = ({ c, x, y, p, txt, w = 260, marca }) => (
  <g opacity={Math.min(1, p)} transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * p})`}>
    <rect x={-w / 2} y={-27} width={w} height={54} rx={27} fill={marca ? `url(#${ID}-marca)` : c.panel} style={sombra(c.sombra * 0.6, 4, 10)} />
    <Txt f="a" x={0} y={9} textAnchor="middle" fontSize={24} fill={marca ? '#fff' : c.texto}>{txt}</Txt>
  </g>
);

/* Acto 1 · Juzgar por el parecido: el perfil de Steve y la pregunta */
const Perfil: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, 0, T.casi);
  if (op <= 0) return null;
  const rasgos = ['tímido', 'retraído', 'servicial', 'metódico', 'ordenado', 'obsesionado con el detalle'];
  const pregunta = pop(t, T.preguntan);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Juzgar por" b="el parecido" />
      <Txt f="a" x={600} y={130} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={ac(t, T.caso, T.caso + 0.6)}>una idea que ya tienes en la cabeza</Txt>
      <Persona id={ID} x={260} y={560} s={1.5} corbata={false} />
      <Txt x={260} y={650} textAnchor="middle" fontSize={34} fill={c.texto} opacity={ac(t, T.describen - 0.2, T.describen + 0.4)}>Steve</Txt>
      {rasgos.map((r, k) => {
        const col = k % 2, fila = Math.floor(k / 2);
        return <Pastilla key={r} c={c} x={560 + col * 300} y={300 + fila * 90} p={pop(t, T.describen + k * 0.9, 0.4)} txt={r} w={270} />;
      })}
      <g opacity={pregunta} transform={`translate(0 ${(1 - pregunta) * 30})`}>
        <rect x={150} y={720} width={900} height={110} rx={28} fill={c.panel} style={sombra(c.sombra)} />
        <Txt f="a" x={600} y={770} textAnchor="middle" fontSize={30} fill={c.texto}>¿Es más probable que sea</Txt>
        <Txt x={600} y={812} textAnchor="middle" fontSize={34} fill={NARANJA}>bibliotecario o agricultor?</Txt>
      </g>
    </g>
  );
};

/* Acto 2 · La sustitución: la pregunta real cambia por otra más fácil */
const Sustitucion: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.casi, T.entra);
  if (op <= 0) return null;
  const casi = pop(t, T.casi);
  const cambio = ac(t, T.fijate, T.fijate + 1.2);
  const real = 1 - cambio;
  return (
    <g opacity={op}>
      <Titulo c={c} a="Responde otra" b="pregunta" />
      <Pastilla c={c} x={600} y={160} p={casi} txt="Casi todos: bibliotecario" w={460} marca />
      <g opacity={Math.min(1, pop(t, T.fijate))} transform={`translate(${-(cambio) * 180} 0)`}>
        <rect x={60} y={260} width={460} height={250} rx={28} fill={c.panel} style={sombra(c.sombra)} opacity={real} />
        <Txt f="a" x={290} y={310} textAnchor="middle" fontSize={24} fill={c.tenue}>pregunta real</Txt>
        <Txt x={290} y={370} textAnchor="middle" fontSize={28} fill={c.texto}>¿qué tan probable es</Txt>
        <Txt x={290} y={410} textAnchor="middle" fontSize={28} fill={c.texto}>que Steve sea bibliotecario?</Txt>
      </g>
      <g opacity={cambio} transform={`translate(${(1 - cambio) * 180} 0)`}>
        <rect x={680} y={260} width={460} height={250} rx={28} fill={`url(#${ID}-marca)`} style={sombra(c.sombra)} />
        <Txt f="a" x={910} y={310} textAnchor="middle" fontSize={24} fill="#fff">pregunta que respondes</Txt>
        <Txt x={910} y={370} textAnchor="middle" fontSize={28} fill="#fff">¿cuánto se parece Steve</Txt>
        <Txt x={910} y={410} textAnchor="middle" fontSize={28} fill="#fff">a tu idea de bibliotecario?</Txt>
      </g>
      <path d="M 560 385 L 640 385" stroke={NARANJA} strokeWidth={8} strokeLinecap="round" opacity={cambio} />
      <Txt f="a" x={600} y={620} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={cambio}>la respuesta fácil se presenta como si fuera la difícil</Txt>
    </g>
  );
};

/* Acto 3 · La tasa base: 1 bibliotecario frente a más de 20 agricultores */
const TasaBase: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.entra, T.cuesta);
  if (op <= 0) return null;
  const titulo = pop(t, T.entra);
  return (
    <g opacity={op}>
      <Titulo c={c} a="La" b="tasa base" />
      <Txt f="a" x={600} y={130} textAnchor="middle" fontSize={26} fill={c.tenue} opacity={titulo}>cuántas personas hay en cada categoría</Txt>
      {Array.from({ length: 21 }, (_, k) => {
        const col = k % 7, fila = Math.floor(k / 7);
        const x = 260 + col * 115, y = 300 + fila * 150;
        const sale = k === 0 ? pop(t, T.cada) : pop(t, T.cada + 0.6 + (k - 1) * 0.12, 0.35);
        return (
          <g key={k} opacity={Math.min(1, sale)} transform={`translate(0 ${(1 - sale) * 30})`}>
            <Persona id={ID} x={x} y={y} s={0.55} cuerpo={k === 0 ? `url(#${ID}-marca)` : GRIS} pelo={k === 0 ? '#2b1a12' : '#6b4a2f'} />
          </g>
        );
      })}
      <g opacity={pop(t, T.cada + 0.2)} transform="translate(600 800)">
        <Pastilla c={c} x={0} y={0} p={1} txt="1 bibliotecario · más de 20 agricultores" w={640} marca />
      </g>
    </g>
  );
};

/* Acto 4 · Contratar: el perfil completo no basta */
const Contratar: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.cuesta, T.impresiona);
  if (op <= 0) return null;
  const perfil = ac(t, T.candidato, T.candidato + 1.2);
  const historial = ac(t, T.candidato + 1.5, T.candidato + 3);
  return (
    <g opacity={op}>
      <Titulo c={c} a="Al" b="contratar" />
      <Persona id={ID} x={600} y={520} s={1.6} corbata />
      <g opacity={pop(t, T.cuesta)}>
        <Txt f="a" x={600} y={250} textAnchor="middle" fontSize={28} fill={c.tenue}>el candidato tiene todo el perfil</Txt>
      </g>
      <g opacity={perfil} transform="translate(180 680)">
        <Txt f="a" x={0} y={0} fontSize={24} fill={c.tenue}>perfil</Txt>
        <rect x={0} y={16} width={840} height={30} rx={15} fill={c.panel2} />
        <rect x={0} y={16} width={840 * perfil} height={30} rx={15} fill={`url(#${ID}-marcaH)`} />
      </g>
      <g opacity={historial} transform="translate(180 770)">
        <Txt f="a" x={0} y={0} fontSize={24} fill={c.tenue}>historial objetivo</Txt>
        <rect x={0} y={16} width={840} height={30} rx={15} fill={c.panel2} />
        <rect x={0} y={16} width={840 * 0.18 * historial} height={30} rx={15} fill={GRIS} />
      </g>
    </g>
  );
};

/* Acto 5 · Cierre: el parecido impresiona; los números deciden; la pregunta final */
const Cierre: React.FC<PropsEscena & { t: number }> = ({ isDark, t }) => {
  const c = tono(isDark);
  const op = acto(t, T.impresiona, 999);
  if (op <= 0) return null;
  const numeros = pop(t, T.numeros);
  return (
    <g opacity={op}>
      <Txt x={600} y={260} textAnchor="middle" fontSize={44} fill={c.tenue} opacity={pop(t, T.impresiona)}>El parecido impresiona.</Txt>
      <Txt x={600} y={340} textAnchor="middle" fontSize={56} fill={c.texto} opacity={numeros}>Los <tspan fill={`url(#${ID}-marcaH)`}>números</tspan> son los que deciden.</Txt>
      <g opacity={pop(t, T.decision)} transform="translate(600 620)">
        <rect x={-500} y={-70} width={1000} height={140} rx={34} fill={c.panel} style={sombra(c.sombra)} />
        <Txt f="a" x={0} y={-6} textAnchor="middle" fontSize={28} fill={c.texto}>¿En qué decisión reciente te dejaste llevar</Txt>
        <Txt f="a" x={0} y={38} textAnchor="middle" fontSize={28} fill={c.texto}>por lo bien que algo encajaba con un molde?</Txt>
      </g>
    </g>
  );
};

export const RepresentatividadEscena: React.FC<PropsEscena> = ({ isDark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <Gradientes id={ID} />
        <Perfil isDark={isDark} t={t} />
        <Sustitucion isDark={isDark} t={t} />
        <TasaBase isDark={isDark} t={t} />
        <Contratar isDark={isDark} t={t} />
        <Cierre isDark={isDark} t={t} />
      </svg>
    </AbsoluteFill>
  );
};
