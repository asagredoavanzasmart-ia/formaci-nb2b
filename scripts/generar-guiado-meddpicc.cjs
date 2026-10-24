// Genera src/data/guiadoMeddpicc.ts a partir del .srt unido de la clase y de src/components/meddpicc/escenas.ts.
// Uso: node scripts/generar-guiado-meddpicc.cjs (desde la raíz del proyecto).
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..').split(path.sep).join('/');
const SRT = `${ROOT}/guiones/meddpicc.srt`;
const esbuild = require(`${ROOT}/node_modules/esbuild`);

// Datos de la clase (TypeScript puro) transpilados al vuelo.
const out = esbuild.buildSync({ entryPoints: [`${ROOT}/src/components/meddpicc/escenas.ts`], bundle: true, platform: 'node', format: 'cjs', write: false });
const mod = { exports: {} };
new Function('module', 'exports', 'require', out.outputFiles[0].text)(mod, mod.exports, require);
const { ORDEN_MD } = mod.exports;

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
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

const avisos = [];
// 1) Inicio de cada diapositiva, en orden.
const inicios = [];
let cursor = 0;
for (const e of ORDEN_MD) {
  if (e.inicio === '@cero') { inicios.push({ e, i: 0, t: 0 }); continue; }
  const h = buscar(e.inicio, cursor);
  if (!h) { avisos.push(`NO HALLADO inicio: ${e.id} → ${e.inicio}`); continue; }
  inicios.push({ e, i: h.i, t: +(h.t - 0.15).toFixed(2) });
  cursor = h.i + 1;
}
const FIN_AUDIO = R[R.length - 1].t + 1;

// 2) Marcas de cada diapositiva y de su escena, dentro de su tramo.
const slides = [], cues = {}, marcas = {};
inicios.forEach(({ e, i, t }, k) => {
  slides.push({ id: e.id, t });
  const hasta = inicios[k + 1] ? inicios[k + 1].i : R.length;
  const lista = [];
  let desde = i;
  for (const c of e.marcas ?? []) {
    let tc;
    if (c.frase === '@cero') tc = 0;
    else if (c.frase === '@inicio') tc = t + 0.3;
    else {
      const r = buscar(c.frase, desde, hasta) ?? buscar(c.frase, i, hasta);
      if (!r) { avisos.push(`NO HALLADA marca en ${e.id}: ${c.frase}`); continue; }
      tc = r.t - 0.2; desde = r.i + 1;
    }
    const cue = { t: +tc.toFixed(2) };
    if (c.mostrar) cue.mostrar = c.mostrar; if (c.foco !== undefined) cue.foco = c.foco; if (c.clicEn) cue.clicEn = c.clicEn;
    lista.push(cue);
  }
  if (e.escena) {
    const rel = [];
    let d = i;
    for (const f of e.escena.frases) {
      const r = buscar(f, d, hasta);
      if (!r) { avisos.push(`NO HALLADA frase de escena en ${e.id}: ${f}`); rel.push(99999); continue; }
      rel.push(+(r.t - 0.2 - t).toFixed(2)); d = r.i + 1;
    }
    if (e.escena.pregunta) {
      const rp = buscar(e.escena.pregunta.frase, d, hasta) ?? buscar(e.escena.pregunta.frase, i, hasta);
      if (!rp) { avisos.push(`NO HALLADA pregunta en ${e.id}: ${e.escena.pregunta.frase}`); rel.push(99999); }
      else { rel.push(+(rp.t - 0.2 - t).toFixed(2)); lista.push({ t: +(rp.t - 0.2).toFixed(2), foco: null }); }
    }
    marcas[e.id] = rel;
  }
  if (lista.length) cues[e.id] = lista.sort((a, b) => a.t - b.t);
  console.log(e.id.padEnd(20), fmt(t).padStart(6), marcas[e.id] ? 'escena ' + marcas[e.id].map((x) => (x > 9999 ? '??' : x.toFixed(0))).join(' ') : '');
});
if (avisos.length) console.log('\n' + avisos.join('\n'));

const ts = `import audio from '../audios_clase/meddpicc.mp3?url';
import type { GuiadoClase } from '../lib/guiado';

/**
 * Clase guiada «MEDDPICC: calificar con rigor»: audio completo + inicio de cada diapositiva
 * + marcas de sus elementos. GENERADO desde los subtítulos (guiones/meddpicc.srt) y
 * src/components/meddpicc/escenas.ts con scripts/generar-guiado-meddpicc.cjs: no editar a mano.
 */
export const guiadoMeddpicc: GuiadoClase = {
  audio,
  slides: ${JSON.stringify(slides)},
  cues: ${JSON.stringify(cues)},
};

/* Segundos desde el inicio de cada diapositiva en que entra cada marca de su escena (la última es la pregunta). */
export const marcasMeddpicc: Record<string, number[]> = ${JSON.stringify(marcas)};

export const FIN_AUDIO_MEDDPICC = ${FIN_AUDIO.toFixed(2)};
`;
fs.writeFileSync(`${ROOT}/src/data/guiadoMeddpicc.ts`, ts);
console.log('\nescrito guiadoMeddpicc.ts · diapositivas', slides.length, '· avisos', avisos.length);
