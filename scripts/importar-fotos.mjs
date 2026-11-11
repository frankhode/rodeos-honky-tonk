import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function importar(root = process.cwd()) {
  const queuePath = resolve(root, 'data/fotos-pendientes.json');
  const galleryPath = resolve(root, 'data/fotos.json');
  const queue = JSON.parse(await readFile(queuePath, 'utf8'));
  const gallery = JSON.parse(await readFile(galleryPath, 'utf8'));
  if (!Array.isArray(queue.imagenes) || !Array.isArray(gallery.fotos)) {
    throw new Error('Formato inválido: no se modificó la galería.');
  }
  const prefix = '/rodeos-honky-tonk/assets/';
  const assets = resolve(root, 'assets') + sep;
  // Validate the entire batch before changing either file.
  for (const image of queue.imagenes) {
    if (typeof image !== 'string' || !image.startsWith(prefix)) {
      throw new Error('La carga debe contener imágenes de assets.');
    }
    const local = resolve(root, 'assets', image.slice(prefix.length));
    if (!local.startsWith(assets) || !/\.(jpe?g|png|webp|avif|svg)$/i.test(local)
        || !(await stat(local)).isFile()) {
      throw new Error('Imagen inválida o inexistente: ' + image);
    }
  }
  const known = new Set(gallery.fotos.map(photo => photo.imagen));
  let added = 0;
  for (const imagen of queue.imagenes) {
    if (known.has(imagen)) continue;
    gallery.fotos.push({
      imagen, visible: false, titulo: '', alt: '', descripcion: '', credito: '',
      mostrarTitulo: false, mostrarDescripcion: false, mostrarCredito: false
    });
    known.add(imagen);
    added++;
  }
  if (added) await writeFile(galleryPath, JSON.stringify(gallery, null, 2) + '\n');
  if (queue.imagenes.length) {
    queue.imagenes = [];
    await writeFile(queuePath, JSON.stringify(queue, null, 2) + '\n');
  }
  return added;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  console.log(`Entradas ocultas creadas: ${await importar()}`);
}
