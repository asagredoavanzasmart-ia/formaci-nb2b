# Cómo crear una nueva clase

Guía de la convención del proyecto para añadir una clase (una presentación) al
repositorio. Si sigues estos pasos, la clase aparece en la portada y hereda
**automáticamente** el modal "Guión del presentador", el **Modo presentador** de
dos pantallas y la edición de texto, porque todo eso está indexado por `id` de
clase y por `id` de diapositiva.

> Ejemplo de referencia ya hecho: la clase **"La Ciencia de Vender"**
> (`metodologias-venta`), con prefijo de diapositivas `mv-`.

## Pasos

### 1. Registrar la clase en el catálogo
En [`src/data/catalogoClases.ts`](../src/data/catalogoClases.ts) agrega un objeto a
`catalogoClases`:

```ts
{
  id: 'mi-clase',              // id único; se usa en todo el resto
  title: 'Título de la clase',
  subtitle: 'Subtítulo corto',
  description: 'Una o dos frases para la tarjeta de la portada.',
  category: 'Ventas',          // etiqueta temática
  iconKey: 'ventas',           // 'ventas' | 'marketing' | 'liderazgo' | 'general'
}
```

### 2. Definir el orden de diapositivas
En [`src/data/slidesByClass.ts`](../src/data/slidesByClass.ts):

- Crea el array `SlideMeta[]` con un **prefijo de id propio** (ej. `mi-`), para no
  chocar con otras clases.
- Usa `level: 1` para las portadas de sección (se dibujan genéricas) y `level: 2`
  para las diapositivas de contenido.
- Regístralo en `slidesByClass` y en `slideCountByClassId`.

```ts
export const miClaseSlides: SlideMeta[] = [
  { id: 'mi-slide-0', title: 'Inicio', level: 2 },
  { id: 'mi-tema-1', title: 'Tema 1', level: 2 },
  { id: 'mi-header-a', title: 'I. Sección', level: 1 },
  // ...
];

export const slidesByClass = {
  'ventas-b2b': initialSlides,
  'metodologias-venta': metodologiasSlides,
  'mi-clase': miClaseSlides,        // ← añadir
};

export const slideCountByClassId = {
  // ...
  'mi-clase': miClaseSlides.filter((s) => s.level === 2).length,
};
```

### 3. Crear el componente de diapositivas
Crea `src/components/ClaseMiClase.tsx` con un componente router por `slideId`
(mira [`ClaseMetodologias.tsx`](../src/components/ClaseMetodologias.tsx) como plantilla):

```tsx
export default function ClaseMiClase({ slideId, isDark }: { slideId: string; isDark: boolean }) {
  switch (slideId) {
    case 'mi-slide-0': return <Portada isDark={isDark} />;
    case 'mi-tema-1':  return <Tema1 isDark={isDark} />;
    default:           return null;
  }
}
```

**Lenguaje visual a respetar** (para que todas las clases se vean iguales):
- Degradado de marca: `from-[#ff851d] to-[#ef375c]`.
- Lienzo de diseño 1280×720, soporte de modo oscuro (`isDark`) y animaciones con
  `motion/react`.
- Las diapositivas `level: 1` (encabezados) las dibuja App.tsx; no las pongas en el router.
- Usa `Shell`, `panelClass`, `textMuted` y `microLabel` de
  [`slideKit.tsx`](../src/components/slideKit.tsx). **Los titulares van solo con texto**
  (sin ícono); los íconos se reservan para tarjetas y botones.

#### Estilo de gráficos: 3D limpio y animado (el de la clase B2B original)
Referencias en la clase B2B: `SlideEstrategiaTactica` (pirámide 3D),
`Slide10` (escena isométrica con pulsos y partículas), `SlideVentaSimpleVsCompleja`
(nodos con resorte), `SlideCicloVentas` (barra de progreso luminosa), `Slide8` y
`SlideRolesCompra` (tarjetas que giran en 3D). Los bloques reutilizables están en
[`scene3d.tsx`](../src/components/scene3d.tsx).

- **Sin líneas ni contornos.** Nada de `stroke` para dibujar formas, ejes, flechas o
  conexiones. Todo son formas rellenas.
- **Modelos 3D isométricos**: cajas (`IsoBox`), troncos (`IsoFrustum`), pirámides
  (`IsoPyramid`), plataformas circulares (`Cylinder`), suelos (`IsoFloor`) y esferas
  con brillo (`Orb`). Cada sólido tiene **tres tonos**: arriba claro, izquierda medio,
  derecha oscuro. Paletas: `BRAND` (#ff851d / #ef375c / #c41e3d), `PEACH`, `NEUTRAL`
  (gris según tema) y `SLATE`.
- **Sombras y brillo**: cada escena incluye `<SceneDefs id="…"/>` y los sólidos usan
  `filter="url(#id-sh)"` (sombra suave) y `#id-gl` (brillo) en lo activo o en
  movimiento. Ids únicos por escena.
- **Conexiones = movimiento, no líneas**: usa `Traveler` (partícula brillante que
  viaja; `hop()` la hace saltar en arco), `PulseDisc` (disco que se expande y
  desvanece) o haces translúcidos rellenos.
- **Animación siempre presente**: entrada con resorte, `Float` (flotación suave e
  infinita), `Lift` (el elemento activo se eleva y el resto se atenúa), esferas que
  rebotan sobre lo seleccionado, curvas que se revelan con `clipPath` y esferas que
  las recorren (`animateMotion`).
- **Gráficas como áreas**: en curvas y datos, rellenos con degradado (sin trazo de
  línea) y una banda suave como eje.
- **Interactivo y sincronizado**: tocar una parte del modelo (o pasar por su tarjeta)
  la eleva/ilumina y muestra su explicación en el panel de texto.
- **Tarjetas sin contorno**: se separan por sombra o por fondo tintado
  (`panelClass` ya lo hace); se permite la barra de acento `border-l-4` y el borde
  de marca del elemento activo, como en B2B.
- Barras de progreso: degradado de marca con resplandor
  `shadow-[0_0_15px_rgba(255,133,29,0.5)]`.
- Botones de selección tipo pastilla con degradado y `shadow-red-500/30` cuando están activos.

**Texto de las diapositivas** (evitar el "texto salpicado"):
- Cada dato suelto debe entenderse por sí solo con un poco de contexto: añade un
  par de palabras conectoras o una **micro-etiqueta** que lo enmarque (p. ej.
  "Respaldo · …", "Qué demuestra", "Figuras clave", "publicado en …"). Usa el
  helper `microLabel(isDark)` para esas etiquetas.
- Varía los estilos de texto para crear jerarquía: etiqueta pequeña en mayúsculas +
  dato normal; negrita en el término clave; subtítulos como pregunta cuando ayuden
  (p. ej. BANT: "Presupuesto: ¿hay dinero asignado?").
- Poco, pero suficiente: no conviertas la diapositiva en párrafos; el detalle largo
  va en el guión del presentador, no en pantalla.

### 4. Enrutar el componente en App
En [`src/App.tsx`](../src/App.tsx): importa el componente y añade una rama de
render junto a las demás, filtrando por tu prefijo:

```tsx
{currentSlideId.startsWith('mi-') && slidesOrder[currentSlideIndex].level !== 1 && (
  <ClaseMiClase slideId={currentSlideId} isDark={isDark} />
)}
```

> La portada (`*-slide-0`) la resuelve tu propio componente; no choca con el
> `slide-0` de la clase B2B.

### 5. Escribir el guión del presentador
Crea `src/data/notas<MiClase>.ts` exportando un `Record<string, string>` con una
entrada por cada `id` de diapositiva (ver [`notasEquipos.ts`](../src/data/notasEquipos.ts)),
y fusiónalo al final de `notasPorDiapositiva` en
[`src/data/notasDocente.ts`](../src/data/notasDocente.ts) con `...notasMiClase`.
**Reglas de estilo obligatorias** (mismas para toda clase):

1. **Lee y complementa** lo que se ve en la diapositiva: retoma sus títulos y
   frases y, a partir de ahí, profundiza. No es un texto aparte; es la narración
   de lo que hay en pantalla.
2. Siempre en **2.ª persona del singular** ("tú"), como si hablaras a **una sola
   persona**, y en **lenguaje neutro de género** (evita "listo/preparado/seguro"
   referidos al oyente).
3. Termina con **una sola pregunta abierta**, sin etiquetas tipo "Pregunta para la
   clase"; envuélvela en `<em>` para distinguirla.
4. Mantén el **hilo de pensamiento crítico**: ayuda a cuestionar métodos sin
   respaldo empírico.
5. HTML admitido: `<p>`, `<strong>`, `<em>`, `<u>`, listas y resaltados con
   `<span style="background-color:#fde68a">…</span>` (paleta: `#fde68a` amarillo,
   `#bbf7d0` verde, `#bfdbfe` azul, `#fbcfe8` rosa).
6. Duración objetivo: ~2–3 min por diapositiva de contenido; transiciones
   (encabezados) más breves.

## Lo que NO hay que tocar
Ya funciona para cualquier clase y diapositiva nueva:
- Modal **"Guión del presentador"** ([`NotasDocente.tsx`](../src/components/NotasDocente.tsx)).
- **Modo presentador** de dos pantallas ([`PresenterView.tsx`](../src/components/PresenterView.tsx))
  y su sincronización ([`presenterBus.ts`](../src/lib/presenterBus.ts)).
- Editor de guión reutilizable con negrita/subrayado/resaltado/guardar
  ([`NotasEditor.tsx`](../src/components/NotasEditor.tsx)).

## Verificar
```bash
npm run build   # debe compilar sin errores
npm run dev     # revisar la clase y el Modo presentador
```

### Personas 3D (equipos y roles)

Para mostrar personas o roles usa `Persona` de `scene3d.tsx`: figura humana de sólidos rellenos (sin contornos), con color por grupo y un accesorio que identifica la función (`compass`, `megaphone`, `headset`, `tie`, `heart`, `gear`, `star`). Se coloca por el centro de los pies `(cx, cy)` y se escala con `s`. Envuélvela en `Lift` + `Float` y añade `PulseDisc` bajo la figura activa. Ejemplos: `eq-roles` (equipo completo) y `eq-traspasos` en `ClaseArquitecturaEquipos.tsx`.Etiqueta cada figura solo con el rol o la sigla: nada de nombres propios de ejemplo.

### Etiquetas sin superposición

nunca dejar texto encima de un sólido ni de su sombra. Calcular antes de escribir: la base de una caja es `cy + s/2 + h` (más ~10 px de sombra y el `lift` si se eleva con `Lift`); la etiqueta va a ≥16 px por debajo de esa base (o a un costado, con `textAnchor` start/end y sin salirse del `viewBox`). Barras con valores negativos: el rótulo del valor va debajo del extremo (`base + h + s/2 + 18`) y el título del grupo más abajo aún. Usar nombres cortos (≤ ~18 caracteres) y colores neutros (`tone.text`/`tone.muted`), nunca naranja sobre un cubo naranja ni texto oscuro sobre una cara oscura. Dimensionar el `viewBox` para que quepa todo y subir su alto en vez de apretar. Como no se puede ver el navegador, repasar cada escena sumando posiciones antes de dar la diapositiva por terminada, y pedir captura si hay duda.

### Siglas, tests y centrado

**Siglas de roles comerciales (regla del usuario).** cada vez que una diapositiva muestre BDR, LGR/Lead Gen, SDR, AE, AM o Pre-Sales, debe explicar la sigla en pantalla, no solo en el guión. Para escenas con varias siglas usar `SiglasBar` de `slideKit.tsx` (franja al pie con el nombre en inglés y su traducción, desde el diccionario `SIGLAS`); para una mención suelta en un texto, desarrollarla entre paréntesis la primera vez (ej. "un AE (Account Executive, ejecutivo de cuentas)"). Objetivo: que un estudiante nuevo no quede fuera por el vocabulario.

**Tests de autoevaluación.** las clases pueden cerrar con dos tests de 10 preguntas (uno principiante, uno avanzado) usando el componente `Quiz` de `slideKit.tsx` (`QuizQ[]` con `q`, `options`, `answer`, `why`): barra de progreso, explicación tras cada respuesta y puntaje final con recomendación. Ejemplo: `eq-test-basico` y `eq-test-avanzado` bajo el encabezado "V. Evalúa lo Aprendido".

**Centrado.** el contenido va centrado horizontal Y verticalmente. El `Shell` ya centra su contenido (`flex flex-col justify-center`); dentro de una escena, cada columna lleva `justify-center` o `items-center`.
