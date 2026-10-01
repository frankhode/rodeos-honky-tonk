# Rodeos · Honky-Tonk

Sitio estático publicado en https://frankhode.github.io/rodeos-honky-tonk/.

## Editar sin tocar el diseño

1. Entrar a https://app.pagescms.org e iniciar sesión con GitHub.
2. Conectar la aplicación de Pages CMS y darle acceso al repositorio `frankhode/rodeos-honky-tonk`.
3. Elegir ese repositorio y la rama `main`.
4. Abrir el apartado que quieras editar, completar los campos y guardar.

La configuración del panel está en `.pages.yml`. Los cambios se guardan en GitHub; GitHub Pages publica después de completar su despliegue. No es necesario cambiar de hosting. La conexión inicial de la cuenta debe realizarla su titular.

### Fotos

En **Fotos**, agregar una entrada por imagen. En **Foto**, subir o elegir un archivo. Completar título, descripción accesible y, si corresponde, epígrafe y crédito. Reordenar las entradas para cambiar su orden. Quitar una entrada la retira de la galería, sin necesidad de borrar el archivo original. Guardar al terminar.

La primera foto ocupa el ancho de la galería; las siguientes se organizan en pares. En celular se apilan. Al tocar una foto se abre un visor con flechas, teclado (←/→, Escape) y deslizamiento táctil. Con una sola imagen no aparecen flechas. Sin imágenes, la sección se oculta. No hay reproducción automática ni cargas públicas de visitantes.

### Otros contenidos

- **Logo y banner:** reemplazar imágenes manteniendo sus proporciones y el estilo.
- **Sobre Rodeos:** introducción, párrafos e integrantes.
- **Influencias:** agregar, quitar y reordenar artistas; mantener los créditos/licencias de las fotografías utilizadas.
- **Presentaciones:** fechas `AAAA-MM-DD`, lugar, ciudad y enlace. Se dividen automáticamente en próximas fechas e historial según el día de Argentina.
- **Videos:** pegar enlaces de YouTube o publicaciones/reels de Instagram. Se genera el reproductor y un enlace a la publicación original. La disponibilidad depende de la plataforma y de que el contenido permita inserción.
- **Contacto y redes:** editar el mail y los enlaces del pie.
- **Secciones adicionales:** agregar bloques de texto, foto con texto, galería o video. Aparecen antes de Contacto y tienen enlace en el menú. Los campos no aplicables al formato elegido se dejan vacíos.

Cada apartado dispone de **Mostrar sección**. Desactivarlo oculta esa sección y su enlace; ocultar Contacto no elimina las redes del pie. Para nuevas secciones, activar la casilla al crearlas.

Los tamaños, colores y plantillas se ajustan globalmente en `styles.css` y `editorial.js`; no es necesario tocarlos para editar contenido.

## Estructura y desarrollo

`data/*.json` es la fuente del contenido editable. `contenido.js` conserva una copia de respaldo de la versión anterior, utilizada solamente si falla la carga de un archivo; no editarlo para actualizar el sitio. `script.js` carga los datos y `editorial.js` gestiona las plantillas y el visor. Se conservan los metadatos originales de las influencias.

Para probar, ejecutar `python -m http.server 8000` en esta carpeta y abrir http://localhost:8000. Usar servidor HTTP: abrir el HTML como archivo local no permite cargar los JSON.

Las tipografías se cargan desde Google Fonts. Los reproductores de YouTube e Instagram usan carga diferida. No hay compilación ni base de datos.


## Menú lateral y controles de visibilidad

En pantallas de más de 1100 píxeles, el menú queda fijo a la izquierda. En pantallas menores se conserva el menú superior desplegable.

Cada sección permite editar **Título**, **Nombre en el menú**, **Rótulo superior** y **Texto de acompañamiento**, con interruptores independientes. Un salto de línea en un título deja la segunda línea en cursiva/color. Vaciar un texto lo quita: no se recupera texto genérico de respaldo.

Los controles **Mostrar…** conservan el contenido cuando está oculto. También se puede ocultar una foto, artista, integrante, fecha, video o red individualmente. Las galerías omiten las fotos ocultas tanto en miniaturas como en el visor.

En **Cabecera, franja y pie** se controlan logo, navegación, banner, franja roja y componentes del pie. Los textos de la franja se pueden editar. Las próximas fechas y el historial se ocultan automáticamente cuando están vacíos.

Luego de actualizar la configuración, recargar Pages CMS para que aparezcan los nuevos campos. Las nuevas entradas tienen controles propios: activar los elementos que se quieran mostrar.
