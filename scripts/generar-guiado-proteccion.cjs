// Genera src/data/guiadoProteccion.ts a partir del .srt unido de la clase y de los datos de las páginas.
const fs = require('fs');
const path = require('path');
// Uso: node scripts/generar-guiado-proteccion.cjs (desde la raíz del proyecto).
const ROOT = path.resolve(__dirname, '..').split(path.sep).join('/');
const SRT = `${ROOT}/guiones/proteccion_datos.srt`;
const esbuild = require(`${ROOT}/node_modules/esbuild`);

// Datos de la clase (TypeScript puro) transpilados al vuelo.
const out = esbuild.buildSync({ entryPoints: [`${ROOT}/src/components/proteccion/indice.ts`], bundle: true, platform: 'node', format: 'cjs', write: false });
const mod = { exports: {} };
new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, require);
const { ORDEN } = mod.exports;

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/(\d)\.(\d{3})\b/g, '$1$2').replace(/[^a-z0-9ñ]+/g, ' ').trim();
const toks = (s) => norm(s).split(' ').filter(Boolean);
const sec = (h, m, s, ms) => +h * 3600 + +m * 60 + +s + +ms / 1000;
const R = [];
for (const b of fs.readFileSync(SRT, 'utf8').replace(/\r/g, '').split(/\n\n+/)) {
  const l = b.split('\n'); if (l.length < 3) continue;
  const m = l[1].match(/(\d+):(\d+):(\d+),(\d+) --> (\d+):(\d+):(\d+),(\d+)/); if (!m) continue;
  const t0 = sec(m[1], m[2], m[3], m[4]), t1 = sec(m[5], m[6], m[7], m[8]);
  const ws = toks(l.slice(2).join(' ')); if (!ws.length) continue;
  const tot = ws.reduce((a, w) => a + w.length + 1, 0); let acc = 0;
  for (const w of ws) { R.push({ w, t: t0 + (t1 - t0) * (acc / tot) }); acc += w.length + 1; }
}
const lev = (a, b) => { if (a === b) return 0; const m = a.length, n = b.length; if (!m || !n) return Math.max(m, n); let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; };
const igual = (a, b) => a === b || (a.length > 4 && b.length > 4 && 1 - lev(a, b) / Math.max(a.length, b.length) >= 0.72);
const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

// Busca la frase entre las palabras [desde, hasta); devuelve {i, t}.
const buscar = (frase, desde, hasta = R.length) => {
  const f = toks(frase);
  for (let a = desde; a < hasta; a++) {
    let ok = 0; for (let b = 0; b < f.length; b++) if (R[a + b] && igual(R[a + b].w, f[b])) ok++;
    if (ok >= Math.max(f.length === 1 ? 1 : 2, f.length - 1) && igual(R[a].w, f[0])) return { i: a, t: R[a].t };
  }
  return null;
};

// Respaldo tolerante a errores de transcripción: dentro del tramo, la ventana donde aparecen más palabras
// de la frase (sin exigir orden exacto); debe empezar en una de sus dos primeras palabras.
const parecido = (a, b) => a === b || (a.length > 3 && b.length > 3 && 1 - lev(a, b) / Math.max(a.length, b.length) >= 0.6);
const buscarFlex = (frase, desde, hasta = R.length) => {
  const f = toks(frase); let mejor = null;
  for (let a = desde; a < hasta; a++) {
    if (!f.slice(0, 2).some((w) => parecido(R[a].w, w))) continue;
    const ventana = R.slice(a, Math.min(hasta, a + f.length + 2)).map((x) => x.w);
    const ok = f.filter((w) => ventana.some((v) => parecido(v, w))).length;
    if (ok >= Math.ceil(f.length * 0.6) && (!mejor || ok > mejor.ok)) mejor = { i: a, t: R[a].t, ok };
  }
  return mejor;
};
const buscarExacta = buscar;
const buscarEnTramo = (frase, desde, hasta) => buscarExacta(frase, desde, hasta) ?? buscarFlex(frase, desde, hasta);

const avisos = [];
// 1) Inicio de cada diapositiva, en orden.
const inicios = [];
let cursor = 0;
for (const e of ORDEN) {
  if (e.inicio === '@cero') { inicios.push({ e, i: 0, t: 0 }); continue; }
  const h = buscar(e.inicio, cursor);
  if (!h) { avisos.push(`NO HALLADO inicio: ${e.id} → ${e.inicio}`); continue; }
  inicios.push({ e, i: h.i, t: +(h.t - 0.15).toFixed(2) });
  cursor = h.i + 1;
}
const FIN_AUDIO = R[R.length - 1].t + 1;

// 2) Marcas de la escena y de las tarjetas dentro del tramo de cada página.
const slides = [], cues = {}, marcas = {};
inicios.forEach(({ e, i, t }, k) => {
  slides.push({ id: e.id, t });
  const sig = inicios[k + 1];
  const hasta = sig ? sig.i : R.length;
  if (e.id === 'ip-portada') {
    const r = buscar('una habilidad que se puede medir', 0, hasta);
    cues[e.id] = [
      { t: 0, mostrar: ['css:h1', 'css:p.uppercase'], foco: null },
      { t: r ? +(r.t - 0.2).toFixed(2) : 2, mostrar: ['css:p.max-w-3xl'], foco: 'css:p.max-w-3xl' },
    ];
    return;
  }
  if (!e.els) return;
  const rel = [];
  let desde = i;
  for (const f of e.frases) {
    const r = buscarEnTramo(f, desde, hasta);
    if (!r) { avisos.push(`NO HALLADA en ${e.id}: ${f}`); rel.push(99999); continue; }
    rel.push(+(r.t - 0.2 - t).toFixed(2)); desde = r.i + 1;
  }
  const rp = buscarEnTramo(e.pregunta.frase, desde, hasta) ?? buscarEnTramo(e.pregunta.frase, i, hasta);
  if (!rp) avisos.push(`NO HALLADA pregunta en ${e.id}: ${e.pregunta.frase}`);
  const tPregunta = rp ? +(rp.t - 0.2).toFixed(2) : null;
  rel.push(tPregunta != null ? +(tPregunta - t).toFixed(2) : 99999);
  marcas[e.id] = rel;

  const lista = [{ t: +(t + 0.3).toFixed(2), mostrar: ['titulo'], foco: null }];
  let dt = i;
  for (const tj of e.tarjetas) {
    const r = buscarEnTramo(tj.frase, dt, hasta) ?? buscarEnTramo(tj.frase, i, hasta);
    if (!r) { avisos.push(`NO HALLADA tarjeta en ${e.id}: ${tj.frase}`); continue; }
    lista.push({ t: +(r.t - 0.2).toFixed(2), mostrar: [`n:${tj.rotulo}`], foco: `n:${tj.rotulo}` });
    dt = r.i + 1;
  }
  if (tPregunta != null) lista.push({ t: tPregunta, foco: null });
  lista.sort((a, b) => a.t - b.t);
  cues[e.id] = lista;
  console.log(e.id.padEnd(22), fmt(t).padStart(6), 'marcas', rel.map((x) => (x > 9999 ? '??' : x.toFixed(0))).join(' '));
});
if (avisos.length) console.log('\n' + avisos.join('\n'));

const ts = `import audio from '../audios_clase/proteccion_datos_cbr.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «Influencia y persuasión»: audio completo + inicio de cada diapositiva
 * + marcas de sus tarjetas. GENERADO desde los subtítulos (guiones/proteccion_datos.srt)
 * y los datos de src/components/proteccion: no editar a mano.
 */
export const guiadoProteccion: GuiadoClase = {
  audio,
  slides: ${JSON.stringify(slides)},
  cues: ${JSON.stringify(cues)},
};

/* Segundos desde el inicio de cada diapositiva en que entra cada marca de su escena (la última es la pregunta). */
export const marcasProteccion: Record<string, number[]> = ${JSON.stringify(marcas)};

export const FIN_AUDIO_PROTECCION = ${FIN_AUDIO.toFixed(2)};
`;
fs.writeFileSync(`${ROOT}/src/data/guiadoProteccion.ts`, ts);
console.log('\nescrito guiadoProteccion.ts · diapositivas', slides.length, '· avisos', avisos.length);
