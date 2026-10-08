# Plan: clase "MEDDPICC: calificar con rigor" (implementada)

Estado: **implementada (2026-10-04)** en `src/components/ClaseMeddpicc.tsx` (prefijo `md-`, 19 diapositivas + 3 encabezados) con guión en `src/data/notasMeddpicc.ts`. Este archivo queda como registro de fuentes y decisiones. Seguir `docs/CREAR_NUEVA_CLASE.md`
(estilo 3D sin líneas, titulares solo texto, guión en `src/data/notasMeddpicc.ts`).

## Fuentes (PDF locales)
- `C:\Users\arsag\Downloads\MEDDICC The ultimate guide ... (Andy Whyte) ....pdf`
- `C:\Users\arsag\Downloads\Always Be Qualifying Meddic, Meddpicc (Darius Lahoutifard) ....pdf`
- `C:\Users\arsag\Downloads\The Qualified Sales Leader ... (John Mcmahon) ....pdf`
- `C:\Users\arsag\Downloads\The Challenger Sale ... (Matthew Dixon) ....pdf`

Para retomar, re-extraer el texto (la carpeta temporal anterior se pierde al cerrar la sesión):
```bash
pdftotext -layout "<ruta.pdf>" salida.txt   # pdftotext está en /mingw64/bin
```
Tamaño aprox.: Whyte 64k palabras · Lahoutifard 26k · McMahon 65k · Challenger 68k.
Leer por capítulos (usar `grep -n "Chapter"` para el índice), no completos.

## Avance de lectura
- **Lahoutifard: leído hasta Cap. 3 (Metrics)**, línea ~1020 de 3126. Falta: Cap. 4–11
  (Economic Buyer, Decision Criteria + "Value Triangle", Decision/Paper Process +
  Compelling Event, Identify Pain, Champion vs Coach, ROI/Payback, "Say No", MEDDIC vs BANT).
- **Whyte: pendiente.** Clave: qué es y qué no es MEDDICC (no es una metodología de venta;
  convive con SPIN/Challenger), qué analizar en etapas tempranas/medias/finales,
  preguntas de descubrimiento (líneas ~1908), Go-Live Plan (~2940).
- **McMahon: pendiente.** Clave: caps. 29–38 (encontrar, probar y educar al Champion,
  Coach vs Champion, Economic Buyer), 42–44 (evento de validación, business case),
  46–57 (cada letra de MEDDPICC y forecasting).
- **Challenger: pendiente.** Solo lo necesario: los 5 perfiles, enseñar–adaptar–tomar
  control, y su uso para "implicar el dolor".

## Hallazgos ya confirmados (Lahoutifard)
- Origen: **PTC, década de 1990**; los líderes de ventas de campo compartían prácticas
  cada trimestre en Boston y luego el área de formación lo formalizó y le puso el nombre
  MEDDIC. CEO de PTC: Steven Walske (40 trimestres seguidos de crecimiento).
- Motivo de origen: **contratar y hacer productivos rápido a los nuevos** (enlaza con la
  clase de Arquitectura de Equipos: Ramp Time).
- **ABQ vs ABC**: "Always Be Qualifying" frente al "Always Be Closing" de *Glengarry Glen Ross*.
- Caso **Megan vs Aaron**: mismo perfil; Aaron (mucha actividad, sin calificar) comprometió
  $1M y cerró $200k; Megan (calificaba) comprometió $300k y cerró $400k.
- **Tres porqués**: ¿Por qué algo? (Pain) · ¿Por qué nosotros? (M, DC, C) · ¿Por qué ahora?
  (compelling event: E, DP).
- MEDDIC **no es un proceso de venta**: es una metodología de calificación que se monta sobre
  cualquier proceso. Características: checklist corto, basado en actividades, revela brechas,
  autoevaluable, lenguaje común del equipo.
- Variantes: MEDDIC → MEDDICC (+Competition) → MEDDPICC (+Paper Process: el Champion suele
  conocer el proceso técnico y de negocio, pero no el legal/compras).
- Buenas métricas = acrónimo **M-E-T-R-I-C**: Medible, lenguaje cotidiano (Everyday),
  cuenta una historia (Tells a story), resultado antes/después, impacta la economía,
  respaldada por el Champion.

## Estructura propuesta (prefijo `md-`, ~18 diapositivas)
1. Portada
2. ABC vs ABQ: de "cerrar siempre" a "calificar siempre" (caso Megan vs Aaron, animado)
3. Origen en PTC y por qué nació (ramp de nuevas contrataciones)
4. Qué es y qué NO es (calificación, no proceso; convive con SPIN/Challenger)
— I. Las letras —
5. Mapa MEDDPICC interactivo (8 bloques 3D, cada uno con su pregunta)
6. Metrics (acrónimo METRIC + ejemplo antes/después)
7. Economic Buyer
8. Decision Criteria + Value Triangle de Lahoutifard
9. Decision Process / Paper Process + compelling event
10. Identify / Implicate the Pain (tipos de dolor, consecuencia, urgencia)
11. Champion vs Coach (cómo encontrarlo, educarlo y probarlo — McMahon)
12. Competition (incluye el "no decidir" y el statu quo)
— II. En la práctica —
13. Los tres porqués
14. Qué inspeccionar en cada etapa (temprana / media / final — Whyte)
15. Decir "no" para calificar (Lahoutifard cap. 10)
16. MEDDPICC vs BANT (por qué presupuesto y tiempo no califican — cap. 11)
17. Forecasting y salud del trato (McMahon)
— III. Pensamiento crítico —
18. Las fuentes y su respaldo: libros de practicantes (no estudios revisados por pares);
    Challenger como complemento para "implicar el dolor", aclarando que la academia lo
    cuestionó (coherencia con "La Ciencia de Vender")
19. Síntesis

## Pasos de implementación (según la guía)
1. Terminar de leer lo indicado arriba y anotar cifras/ideas con su fuente.
2. Catálogo (`catalogoClases.ts`), guion (`slidesByClass.ts`, prefijo `md-`).
3. `src/components/ClaseMeddpicc.tsx` con escenas de `scene3d.tsx`.
4. Rama en `App.tsx` (`startsWith('md-')`).
5. Guión del presentador en `src/data/notasMeddpicc.ts` + spread en `notasDocente.ts`.
6. `npm run build` y revisión visual con `npm run dev`.

## Cuidados
- Escribir con palabras propias; no copiar párrafos de los libros (solo cifras, conceptos
  y citas muy breves con su autor).
- Mantener el hilo crítico del curso: estos libros son experiencia de practicantes, no
  evidencia empírica revisada por pares.
