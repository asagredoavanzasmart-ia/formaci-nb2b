// Une varias partes de audio (.mp3) y sus subtítulos (.srt) en un solo archivo de cada tipo.
// Los tiempos del .srt de cada parte se desplazan según la duración real de las anteriores
// (calculada leyendo los cuadros MPEG), y se quitan las etiquetas ID3 y las cabeceras Xing/Info
// para que el navegador calcule bien la duración del audio unido.
// Uso: node scripts/unir-mp3-srt.cjs salida.mp3 salida.srt parte1.mp3 parte1.srt parte2.mp3 parte2.srt ...
const fs = require('fs');

const [, , outMp3, outSrt, ...partes] = process.argv;
if (!outMp3 || !outSrt || partes.length < 2 || partes.length % 2) {
  console.error('Uso: node scripts/unir-mp3-srt.cjs salida.mp3 salida.srt parte1.mp3 parte1.srt [parte2.mp3 parte2.srt ...]');
  process.exit(1);
}

const BITRATES = {
  1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
};
const RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };

function cuadros(buf) {
  let p = 0;
  if (buf.slice(0, 3).toString('latin1') === 'ID3') {
    const tam = (buf[6] << 21) | (buf[7] << 14) | (buf[8] << 7) | buf[9];
    p = 10 + tam;
  }
  let fin = buf.length;
  if (fin >= 128 && buf.slice(fin - 128, fin - 125).toString('latin1') === 'TAG') fin -= 128;
  const trozos = [];
  let dur = 0, n = 0, primero = true;
  while (p + 4 <= fin) {
    if (buf[p] !== 0xff || (buf[p + 1] & 0xe0) !== 0xe0) { p++; continue; }
    const ver = (buf[p + 1] >> 3) & 3, capa = (buf[p + 1] >> 1) & 3;
    const bi = buf[p + 2] >> 4, si = (buf[p + 2] >> 2) & 3, pad = (buf[p + 2] >> 1) & 1;
    if (ver === 1 || capa !== 1 || bi === 0 || bi === 15 || si === 3) { p++; continue; }
    const mpeg1 = ver === 3;
    const br = BITRATES[mpeg1 ? 1 : 2][bi] * 1000, sr = RATES[ver][si];
    const largo = Math.floor(((mpeg1 ? 144 : 72) * br) / sr) + pad;
    if (largo < 24 || p + largo > fin) break;
    const cuadro = buf.slice(p, p + largo);
    const marca = cuadro.slice(0, 64).toString('latin1');
    const esVbr = primero && /Xing|Info|VBRI/.test(marca);
    primero = false;
    if (!esVbr) { trozos.push(cuadro); dur += (mpeg1 ? 1152 : 576) / sr; n++; }
    p += largo;
  }
  return { datos: Buffer.concat(trozos), dur, n };
}

const t2s = (h, m, s, ms) => +h * 3600 + +m * 60 + +s + +ms / 1000;
const s2t = (x) => {
  const ms = Math.round(x * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000);
  const pad = (v, k = 2) => String(v).padStart(k, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
};

const audios = [], bloques = [];
let desfase = 0, k = 1;
for (let i = 0; i < partes.length; i += 2) {
  const { datos, dur, n } = cuadros(fs.readFileSync(partes[i]));
  audios.push(datos);
  const srt = fs.readFileSync(partes[i + 1], 'utf8').replace(/^﻿/, '').replace(/\r/g, '');
  let subs = 0;
  for (const b of srt.split(/\n\n+/)) {
    const l = b.split('\n');
    const j = l.findIndex((x) => x.includes('-->'));
    if (j < 0) continue;
    const m = l[j].match(/(\d+):(\d+):(\d+),(\d+) --> (\d+):(\d+):(\d+),(\d+)/);
    if (!m) continue;
    const texto = l.slice(j + 1).join('\n').trim();
    if (!texto) continue;
    bloques.push(`${k++}\n${s2t(t2s(m[1], m[2], m[3], m[4]) + desfase)} --> ${s2t(t2s(m[5], m[6], m[7], m[8]) + desfase)}\n${texto}`);
    subs++;
  }
  console.log(`${partes[i]}: ${(dur / 60).toFixed(2)} min, ${n} cuadros, ${subs} subtítulos, desde ${s2t(desfase)}`);
  desfase += dur;
}
fs.writeFileSync(outMp3, Buffer.concat(audios));
fs.writeFileSync(outSrt, bloques.join('\n\n') + '\n');
console.log(`escrito ${outMp3} (${(desfase / 60).toFixed(2)} min) y ${outSrt} (${bloques.length} subtítulos)`);
