import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from 'remotion';
import { NARANJA, ROSA, Gradientes, Persona, Txt, ac, pop, sombra, tono } from '../../remotion/comun';
import { Oficinas, PanelPregunta, Rotulo, escribe, lerp } from './comunPD';
import type { Tono } from './comunPD';

/**
 * «Qué es un dato personal», escena propia. Una silueta en el centro se va revelando a medida que
 * llegan sus identificadores (nombre, cédula, rasgos); un radar muestra los medios razonables para
 * identificar; sin el nombre vuelve a ser silueta, hasta que tres piezas anónimas encajan y llegan a
 * ella. Luego, la venta entre empresas: la tarjeta de quien trabaja en otra compañía queda dentro del
 * círculo de la ley y la razón social de la empresa, fuera.
 * `marcas` son segundos desde el inicio de la diapositiva (paginas1.ts, pd-dato-personal).
 */

export const W = 1200, H = 860;
const ID = 'pdd';

const nombres = ['info', 'identificable', 'directa', 'nombre', 'cedula', 'rasgos', 'social', 'medios', 'sinNombre', 'cruzado', 'llegar', 'b2b', 'tarjeta', 'natural', 'fuera', 'razon', 'pregunta'] as const;
type Nombre = typeof nombres[number];

type Props = { isDark: boolean; marcas: number[]; pregunta?: string; estatico?: boolean };

const RASGOS = ['física', 'fisiológica', 'genética', 'psíquica', 'económica', 'cultural', 'social'];

/* Persona que pasa de silueta gris (identificable) a persona a color (identificada) según `rev`. */
const Figura: React.FC<{ x: number; y: number; s: number; rev: number; c: Tono; t: number }> = ({ x, y, s, rev, c, t }) => (
  <g>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={2} rx={52} ry={13} fill="#000" opacity={0.2} />
      <path d="M -40 0 L -40 -72 Q -40 -108 0 -108 Q 40 -108 40 -72 L 40 0 Z" fill={c.apagado} />
      <circle cx={0} cy={-134} r={31} fill={c.apagado} />
    </g>
    <g opacity={rev}><Persona id={ID} x={x} y={y} s={s} /></g>
    {rev < 0.6 && <Txt x={x} y={y - 134 * s + 15 * s} textAnchor="middle" fontSize={46 * s} fill={c.panel} opacity={(1 - rev / 0.6) * (0.75 + 0.25 * Math.sin(t * 4))}>?</Txt>}
  </g>
);

/* Credencial con el nombre. */
const TagNombre: React.FC<{ c: Tono }> = ({ c }) => (
  <g>
    <rect x={-100} y={-36} width={200} height={72} rx={18} fill={c.panel} style={sombra(c.sombra, 6, 12)} />
    <rect x={-100} y={-36} width={16} height={72} rx={8} fill={`url(#${ID}-marca)`} />
    <Txt x={-66} y={11} fontSize={32} fill={c.texto}>Nombre</Txt>
  </g>
);

/* Cédula de identidad: banda de color, foto y líneas. */
const Cedula: React.FC<{ c: Tono }> = ({ c }) => (
  <g>
    <rect x={-110} y={-68} width={220} height={136} rx={16} fill={c.panel} style={sombra(c.sombra, 6, 12)} />
    <path d="M -110 -52 Q -110 -68 -94 -68 H 94 Q 110 -68 110 -52 V -36 H -110 Z" fill={`url(#${ID}-marca)`} />
    <Txt f="a" x={0} y={-46} textAnchor="middle" fontSize={14} fill="#fff" letterSpacing={2}>CÉDULA DE IDENTIDAD</Txt>
    <rect x={-94} y={-22} width={56} height={72} rx={8} fill={c.panel2} />
    <circle cx={-66} cy={0} r={12} fill={c.apagado} />
    <path d="M -86 44 Q -66 14 -46 44 Z" fill={c.apagado} />
    {[0, 1, 2].map((k) => <rect key={k} x={-24} y={-14 + k * 22} width={k === 2 ? 70 : 110} height={10} rx={5} fill={c.apagado} />)}
  </g>
);

/* Pieza de rompecabezas (cuadro con dos salientes). */
const Pieza: React.FC<{ x: number; y: number; relleno: string; rot?: number }> = ({ x, y, relleno, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-40} y={-40} width={80} height={80} rx={10} fill={relleno} />
    <circle cx={40} cy={0} r={15} fill={relleno} />
    <circle cx={0} cy={-40} r={15} fill={relleno} />
    <rect x={-22} y={-6} width={44} height={8} rx={4} fill="#fff" opacity={0.5} />
    <rect x={-22} y={10} width={28} height={8} rx={4} fill="#fff" opacity={0.35} />
  </g>
);

/* Tarjeta de presentación de quien trabaja en otra compañía; `fila` resalta nombre, correo o teléfono. */
const Tarjeta: React.FC<{ c: Tono; filas: number[]; sello: number }> = ({ c, filas, sello }) => (
  <g>
    <rect x={-140} y={-86} width={280} height={172} rx={18} fill={c.panel} style={sombra(c.sombra)} />
    <rect x={-116} y={-64} width={34} height={34} rx={8} fill={`url(#${ID}-marca)`} />
    <rect x={-70} y={-56} width={120} height={10} rx={5} fill={c.apagado} />
    {['Nombre', 'correo', 'teléfono'].map((txt, k) => (
      <g key={txt} transform={`translate(0 ${-6 + k * 34})`}>
        <rect x={-124} y={-20} width={248} height={30} rx={10} fill={NARANJA} opacity={0.18 * filas[k]} />
        <circle cx={-104} cy={-5} r={6} fill={filas[k] > 0.5 ? NARANJA : c.apagado} />
        <Txt x={-88} y={3} fontSize={24} fill={c.texto} opacity={0.5 + 0.5 * filas[k]}>{txt}</Txt>
      </g>
    ))}
    {sello > 0.01 && (
      <g transform={`translate(78 -60) rotate(-10) scale(${2 - Math.min(1, sello)})`} opacity={Math.min(1, sello)}>
        <rect x={-74} y={-18} width={148} height={36} rx={10} fill={c.panel} stroke={ROSA} strokeWidth={3} />
        <Txt f="a" x={0} y={7} textAnchor="middle" fontSize={17} fill={ROSA} peso={700}>dato personal</Txt>
      </g>
    )}
  </g>
);

export const DatoPersonalPD: React.FC<Props> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = tono(isDark);
  const M = (n: Nombre) => marcas[nombres.indexOf(n)] ?? 1e6;
  const t = estatico ? M('razon') + 1.5 : frame / fps;

  const actoA = 1 - ac(t, M('b2b') - 0.4, M('b2b') + 0.2);
  const actoB = ac(t, M('b2b') - 0.2, M('b2b') + 0.4);

  const tPregunta = M('pregunta');
  const vP = estatico ? 0 : pop(t, tPregunta, 0.6);
  const fondo = 1 - 0.72 * ac(t, tPregunta, tPregunta + 0.6);

  const rotulos: [number, string][] = [
    [0.2, '¿Qué es un dato personal?'], [M('info'), 'Información vinculada a una persona'], [M('identificable'), 'Identificada o identificable'],
    [M('directa'), 'Directa o indirectamente'], [M('nombre'), 'Por sus identificadores'], [M('rasgos'), 'Por los rasgos de su identidad'],
    [M('medios'), 'Todos los medios razonables'], [M('sinNombre'), 'No necesita llevar nombre'], [M('cruzado'), 'Cruzado con otros datos…'],
    [M('llegar'), '…llega a una persona'], [M('b2b'), 'En ventas entre empresas'], [M('natural'), 'Es dato de una persona natural'],
    [M('fuera'), 'Lo que queda fuera de la ley'], [M('razon'), 'La razón social de la empresa'],
  ];

  // Cuánto se revela la persona: crece con cada identificador y vuelve a silueta sin el nombre.
  const sinNombre = ac(t, M('sinNombre'), M('sinNombre') + 1);
  const rev = Math.min(1, ac(t, M('nombre') + 0.4, M('nombre') + 1, 0, 0.3) + ac(t, M('cedula') + 0.4, M('cedula') + 1, 0, 0.25) + ac(t, M('rasgos'), M('social') + 0.6, 0, 0.45)) * (1 - sinNombre)
    + ac(t, M('llegar') + 0.3, M('llegar') + 1.3);
  const cx = 600, cy = 506; // centro de la cabeza

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'hidden' }} aria-label="Un dato personal es cualquier información de una persona identificada o identificable, aunque no lleve nombre; el contacto de quien trabaja en otra empresa también lo es, la razón social no">
        <Gradientes id={ID} />
        <g opacity={fondo}>
          <Rotulo t={t} lista={rotulos} id={ID} />

          {/* ACTO A · la persona identificable */}
          {actoA > 0.01 && (
            <g opacity={actoA}>
              {/* Información que orbita y se vincula a la persona */}
              {(() => {
                const e = ac(t, M('info'), M('info') + 0.8) * (1 - ac(t, M('directa'), M('directa') + 0.8));
                if (e < 0.01) return null;
                const junta = ac(t, M('info') + 0.5, M('identificable') + 1.5);
                return (
                  <g opacity={e}>
                    {Array.from({ length: 8 }, (_, k) => {
                      const a = (k / 8) * Math.PI * 2 + t * 0.25;
                      const rx = lerp(420, 260, junta), ry = lerp(250, 170, junta);
                      const x = cx + Math.cos(a) * rx, y = cy + 40 + Math.sin(a) * ry;
                      return (
                        <g key={k}>
                          <line x1={x} y1={y} x2={cx} y2={cy + 40} stroke={c.apagado} strokeWidth={2} strokeDasharray="4 6" opacity={junta} />
                          <rect x={x - 26} y={y - 16} width={52} height={32} rx={8} fill={k % 3 ? c.panel2 : `url(#${ID}-marca)`} style={sombra(c.sombra, 3, 6)} />
                          <rect x={x - 16} y={y - 4} width={32} height={8} rx={4} fill={k % 3 ? c.apagado : '#fff'} opacity={0.8} />
                        </g>
                      );
                    })}
                  </g>
                );
              })()}

              <Figura x={cx} y={700} s={1.45} rev={rev} c={c} t={t} />

              {/* Identificada o identificable */}
              {(() => {
                const e = Math.min(1, pop(t, M('identificable'), 0.5)) * (1 - ac(t, M('directa') - 0.3, M('directa') + 0.3));
                if (e < 0.01) return null;
                return (
                  <g opacity={e}>
                    {[['identificada', 300, false], ['identificable', 900, true]].map(([txt, x, raya]) => (
                      <g key={txt as string} transform={`translate(${x} 330)`}>
                        <rect x={-130} y={-34} width={260} height={68} rx={34} fill={raya ? 'none' : `url(#${ID}-marca)`} stroke={raya ? NARANJA : 'none'} strokeWidth={4} strokeDasharray={raya ? '10 8' : undefined} />
                        <Txt x={0} y={10} textAnchor="middle" fontSize={28} fill={raya ? NARANJA : '#fff'}>{txt as string}</Txt>
                      </g>
                    ))}
                    <path d={`M 430 330 Q 520 360 ${cx - 40} ${cy - 40}`} fill="none" stroke={c.apagado} strokeWidth={3} />
                    <path d={`M 770 330 Q 680 360 ${cx + 40} ${cy - 40}`} fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="6 7" />
                  </g>
                );
              })()}

              {/* Directa o indirectamente: un camino recto y uno que da vueltas */}
              {(() => {
                const e = ac(t, M('directa') - 0.2, M('directa') + 0.5) * (1 - ac(t, M('rasgos') - 0.4, M('rasgos') + 0.2));
                if (e < 0.01) return null;
                const dibuja = ac(t, M('directa'), M('directa') + 1.2);
                const indirecto = 'M 110 640 C 180 780 260 600 320 720 S 440 760 470 660 L 528 620';
                const u = ((t - M('directa')) * 0.55) % 1;
                return (
                  <g opacity={e}>
                    <line x1={110} y1={560} x2={lerp(110, 528, dibuja)} y2={560} stroke={`url(#${ID}-marcaH)`} strokeWidth={7} strokeLinecap="round" />
                    <Txt f="a" x={300} y={540} textAnchor="middle" fontSize={22} fill={NARANJA}>directa</Txt>
                    <path d={indirecto} fill="none" stroke={c.tenue} strokeWidth={5} strokeDasharray="8 9" strokeLinecap="round" pathLength={1} opacity={dibuja} />
                    {[[180, 718], [320, 720], [470, 660]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={10} fill={c.panel} stroke={c.tenue} strokeWidth={4} opacity={dibuja} />)}
                    <Txt f="a" x={300} y={800} textAnchor="middle" fontSize={22} fill={c.tenue}>indirecta</Txt>
                    <circle cx={lerp(110, 528, u)} cy={560} r={8} fill={NARANJA} opacity={Math.sin(Math.PI * u) * dibuja} />
                  </g>
                );
              })()}

              {/* Identificadores: el nombre y la cédula llegan desde la derecha */}
              {(() => {
                const v = ac(t, M('nombre'), M('nombre') + 0.8, 0, 1, Easing.out(Easing.back(1.3)));
                if (v < 0.01) return null;
                const cae = ac(t, M('sinNombre') + 0.2, M('sinNombre') + 1.6, 0, 1, Easing.in(Easing.quad));
                const x = lerp(1300, 930, v), y = 570 + 420 * cae;
                return (
                  <g opacity={1 - cae}>
                    <line x1={x - 100} y1={y} x2={cx + 62} y2={cy + 70} stroke={c.apagado} strokeWidth={3} strokeDasharray="4 6" opacity={v * (1 - cae)} />
                    <g transform={`translate(${x} ${y}) rotate(${70 * cae})`}><TagNombre c={c} /></g>
                  </g>
                );
              })()}
              {(() => {
                const v = ac(t, M('cedula'), M('cedula') + 0.8, 0, 1, Easing.out(Easing.back(1.3)));
                const sale = ac(t, M('sinNombre') + 0.3, M('sinNombre') + 1);
                if (v < 0.01 || sale > 0.99) return null;
                const x = lerp(1300, 940, v), y = 730;
                return (
                  <g opacity={1 - sale}>
                    <line x1={x - 110} y1={y} x2={cx + 62} y2={cy + 130} stroke={c.apagado} strokeWidth={3} strokeDasharray="4 6" opacity={v} />
                    <g transform={`translate(${x} ${y}) rotate(${-4 * (1 - v)})`}><Cedula c={c} /></g>
                  </g>
                );
              })()}

              {/* Rasgos de su identidad: un anillo de siete segmentos sobre la cabeza */}
              {(() => {
                const sale = ac(t, M('sinNombre') + 0.3, M('sinNombre') + 1);
                if (t < M('rasgos') - 0.2 || sale > 0.99) return null;
                const paso = (M('social') + 0.4 - M('rasgos')) / RASGOS.length;
                return (
                  <g opacity={1 - sale}>
                    {RASGOS.map((txt, k) => {
                      const a0 = 190 + k * (160 / 7) + 2, a1 = a0 + 160 / 7 - 4;
                      const u = ac(t, M('rasgos') + k * paso, M('rasgos') + k * paso + 0.5);
                      if (u < 0.01) return null;
                      const r = 150, rad = (d: number) => (d * Math.PI) / 180;
                      const am = a0 + (a1 - a0) * u;
                      const p0 = [cx + r * Math.cos(rad(a0)), cy + r * Math.sin(rad(a0))], p1 = [cx + r * Math.cos(rad(am)), cy + r * Math.sin(rad(am))];
                      const mid = rad((a0 + a1) / 2), lx = cx + 205 * Math.cos(mid), ly = cy + 205 * Math.sin(mid) + 8;
                      const ancla = Math.cos(mid) < -0.3 ? 'end' : Math.cos(mid) > 0.3 ? 'start' : 'middle';
                      return (
                        <g key={txt}>
                          <path d={`M ${p0[0]} ${p0[1]} A ${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`} fill="none" stroke={k % 2 ? ROSA : NARANJA} strokeWidth={18} strokeLinecap="round" />
                          <Txt f="a" x={lx} y={ly} textAnchor={ancla} fontSize={22} fill={c.texto} opacity={u}>{txt}</Txt>
                        </g>
                      );
                    })}
                  </g>
                );
              })()}

              {/* Todos los medios razonables: un radar que barre desde la persona */}
              {(() => {
                const e = ac(t, M('medios') - 0.2, M('medios') + 0.5) * (1 - ac(t, M('sinNombre') - 0.2, M('sinNombre') + 0.6));
                if (e < 0.01) return null;
                const giro = (t - M('medios')) * 80;
                return (
                  <g opacity={e}>
                    {[0, 1, 2].map((k) => {
                      const u = ((t - M('medios')) / 1.8 + k / 3) % 1;
                      return <circle key={k} cx={cx} cy={cy} r={60 + 420 * u} fill="none" stroke={NARANJA} strokeWidth={4} opacity={(1 - u) * 0.6} />;
                    })}
                    <g transform={`translate(${cx} ${cy}) rotate(${giro})`}>
                      <path d="M 0 0 L 440 -60 A 444 444 0 0 1 440 60 Z" fill={`url(#${ID}-halo)`} opacity={0.9} />
                    </g>
                    <g transform="translate(600 812)">
                      <rect x={-300} y={-30} width={600} height={60} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                      <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={22} fill={c.texto}>medios razonables, al momento del tratamiento</Txt>
                    </g>
                  </g>
                );
              })()}

              {/* Cruzado con otros: tres piezas anónimas encajan y llegan a la persona */}
              {(() => {
                const e = ac(t, M('cruzado') - 0.3, M('cruzado') + 0.3);
                if (e < 0.01) return null;
                const junta = ac(t, M('cruzado'), M('cruzado') + 1.4, 0, 1, Easing.inOut(Easing.cubic));
                const llega = ac(t, M('llegar'), M('llegar') + 0.9);
                const desde: [number, number][] = [[180, 300], [1020, 300], [600, 140]];
                const hacia: [number, number][] = [[520, 300], [680, 300], [600, 300]];
                const rel = (k: number) => (llega > 0.5 ? `url(#${ID}-marca)` : [c.tenue, c.apagado, c.tenue][k]);
                return (
                  <g opacity={e}>
                    {llega > 0.01 && <line x1={cx} y1={346} x2={cx} y2={lerp(346, cy - 40, llega)} stroke={`url(#${ID}-marca)`} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 14" />}
                    {[0, 2, 1].map((k) => (
                      <Pieza key={k} x={lerp(desde[k][0], hacia[k][0], junta)} y={lerp(desde[k][1], hacia[k][1], junta)} relleno={rel(k)} rot={(1 - junta) * (k - 1) * 30} />
                    ))}
                  </g>
                );
              })()}
            </g>
          )}

          {/* ACTO B · ventas entre empresas: la persona dentro de la ley, la razón social fuera */}
          {actoB > 0.01 && (
            <g opacity={actoB}>
              {/* Círculo de la ley */}
              {(() => {
                const d = ac(t, M('fuera'), M('fuera') + 1.4);
                if (d < 0.01) return null;
                return (
                  <g>
                    <circle cx={450} cy={500} r={320} fill={`url(#${ID}-halo)`} opacity={0.35 * d} />
                    <circle cx={450} cy={500} r={320} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={6} strokeDasharray="14 12" pathLength={1} strokeDashoffset={0} opacity={d} transform="rotate(-90 450 500)" />
                    <g transform="translate(450 180)" opacity={d}>
                      <rect x={-92} y={-24} width={184} height={48} rx={24} fill={`url(#${ID}-marca)`} />
                      <Txt x={0} y={9} textAnchor="middle" fontSize={24} fill="#fff">Ley 21.719</Txt>
                    </g>
                  </g>
                );
              })()}

              {/* La compañía y quien trabaja en ella */}
              {(() => {
                const e = Math.min(1, pop(t, M('b2b'), 0.6));
                const raz = Math.min(1, pop(t, M('razon'), 0.5));
                return (
                  <g opacity={e}>
                    <Oficinas x={960} y={700} s={1.05} c={c} t={t} luz={0.6} />
                    <path d="M 860 640 Q 640 560 420 600" fill="none" stroke={c.apagado} strokeWidth={3} strokeDasharray="5 8" opacity={1 - ac(t, M('natural'), M('natural') + 0.6)} />
                    {/* Letrero de la razón social, que queda fuera de la ley */}
                    <g opacity={ac(t, M('fuera') + 0.6, M('fuera') + 1.2)} transform="translate(960 430)">
                      <rect x={-104} y={-30} width={208} height={60} rx={14} fill={c.panel} stroke={raz > 0.01 ? ROSA : c.apagado} strokeWidth={3 + 2 * raz} style={sombra(c.sombra, 4, 8)} />
                      <Txt x={0} y={9} textAnchor="middle" fontSize={26} fill={c.texto}>Razón social</Txt>
                    </g>
                    {raz > 0.01 && (
                      <g opacity={raz} transform="translate(960 776)">
                        <rect x={-150} y={-26} width={300} height={52} rx={26} fill={c.panel2} />
                        <Txt f="a" x={0} y={8} textAnchor="middle" fontSize={21} fill={ROSA} peso={700}>persona jurídica · fuera</Txt>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* Quien trabaja en otra compañía: persona natural */}
              {(() => {
                const e = Math.min(1, pop(t, M('b2b') + 0.3, 0.6));
                return (
                  <g opacity={e}>
                    <Persona id={ID} x={360} y={720} s={1.1} cuerpo="#64748b" />
                    <Txt f="a" x={360} y={768} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={ac(t, M('natural'), M('natural') + 0.6)}>persona natural</Txt>
                  </g>
                );
              })()}

              {/* Su tarjeta: nombre, correo y teléfono son datos personales */}
              {(() => {
                const v = ac(t, M('tarjeta') - 0.3, M('tarjeta') + 0.9, 0, 1, Easing.out(Easing.cubic));
                if (v < 0.01) return null;
                const filas = [0, 1, 2].map((k) => ac(t, M('tarjeta') + 0.6 + k * 0.7, M('tarjeta') + 1 + k * 0.7));
                const sello = pop(t, M('natural') + 0.5, 0.5);
                const ata = ac(t, M('natural'), M('natural') + 0.9);
                const x = lerp(960, 470, v), y = lerp(520, 330, v);
                return (
                  <g>
                    {ata > 0.01 && <path d={`M ${x - 60} ${y + 86} Q 380 460 360 ${lerp(470, 530, ata)}`} fill="none" stroke={`url(#${ID}-marca)`} strokeWidth={4} strokeDasharray="6 7" pathLength={1} opacity={ata} />}
                    <g transform={`translate(${x} ${y}) scale(${0.6 + 0.4 * v})`}><Tarjeta c={c} filas={filas} sello={sello} /></g>
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

/* Para el texto que se escribe letra por letra (reservado para escenas siguientes). */
export const _escribe = escribe;
