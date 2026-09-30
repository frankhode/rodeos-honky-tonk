# Rodeos · Honky-Tonk

Sitio estático, adaptable a celulares y listo para GitHub Pages. HTML, CSS y JavaScript; no necesita instalación, compilación ni base de datos.

## Publicar

En el repositorio, abrir **Settings → Pages → Build and deployment**. Elegir **Deploy from a branch**, rama **main**, carpeta **/ (root)** y guardar. Una vez que termine el despliegue, el sitio estará en https://frankhode.github.io/rodeos-honky-tonk/.

## Actualizar el contenido

Editar `contenido.js` desde GitHub con el lápiz y guardar los cambios. GitHub Pages actualizará el sitio automáticamente después de cada commit.

- `foto`: ruta de la foto horizontal de la banda, por ejemplo `assets/banda.jpg`. Subir el archivo con **Add file → Upload files**, dentro de `assets`.
- `fotoPosicion`: posición del recorte del banner; por ejemplo `center 35%`.
- `logo`: ruta del logo, por ejemplo `assets/logo.png`. Se muestra en cabecera y pie. Conviene un logo con fondo transparente, legible tanto sobre claro como sobre oscuro.
- `sobreTitulo`, `sobre`, `integrantes`: presentación y formación.
- `influencias`: artistas, textos y enlaces opcionales.
- `presentaciones`: fecha ISO `AAAA-MM-DD`, lugar, ciudad y enlace opcional. El sitio separa próximas fechas e historial automáticamente usando la fecha de Argentina. El historial se ordena de más reciente a más antiguo y permite filtrar cuando hay varios años.
- `email`, `redes`: enlaces de contacto y del pie.

Ejemplo de formato para fechas (datos ficticios; reemplazar antes de usar):

```js
presentaciones: [
  { fecha: "2026-12-01", lugar: "Nombre de la sala", ciudad: "Ciudad", enlace: "https://ejemplo.com/entradas", textoEnlace: "Entradas ↗" }
],
```

Los textos iniciales son provisionales: no se inventaron una biografía, músicos, influencias, fechas ni cuentas sociales. La cabecera y el pie incluyen el logo aportado y el banner incorpora la fotografía del grupo. Si falta una imagen, queda un respaldo tipográfico o gráfico. Los canales de contacto vacíos muestran un aviso; no hay enlaces ficticios ni un formulario que simule enviar mensajes.

## Probar localmente

Abrir `index.html` directamente o, con Python instalado, ejecutar `python -m http.server 8000` dentro de esta carpeta y abrir http://localhost:8000.

Las tipografías Barlow Condensed y DM Sans se cargan desde Google Fonts. Si no hay conexión se usan fuentes de respaldo. No se cargan reproductores, analítica ni redes sociales de terceros automáticamente.
