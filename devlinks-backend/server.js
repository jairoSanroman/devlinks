// ¿Qué es "require"? Es como decir "trae esta herramienta que instalamos"
const express = require('express');
const fs = require('fs');       // fs = "file system", nos permite leer/escribir archivos
const path = require('path');   // path nos ayuda a construir rutas de carpetas correctamente

// Creamos la "aplicación" de Express — es nuestro servidor
const app = express();

// Le decimos al servidor que entienda JSON
// Sin esto, no podría leer los datos que le mande el frontend
app.use(express.json());

// ¿Dónde está nuestra "base de datos"?
// __dirname = la carpeta donde está este archivo (devlinks-backend)
const DATA_FILE = path.join(__dirname, 'data', 'links.json');

// -------------------------------------------
// FUNCIÓN AUXILIAR: Leer los links del archivo
// -------------------------------------------
function readLinks() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8'); // Lee el archivo como texto
  return JSON.parse(data); // Convierte el texto JSON a un array de JavaScript
}

// -------------------------------------------
// FUNCIÓN AUXILIAR: Guardar los links al archivo
// -------------------------------------------
function writeLinks(links) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2)); // Guarda bonito con indentación
}

// -------------------------------------------
// RUTA 1: GET /api/links — Obtener todos los links
// -------------------------------------------
// Cuando alguien visite /api/links, le devolvemos todos los links guardados
app.get('/api/links', (req, res) => {
  const links = readLinks();
  res.json(links); // Enviamos los links como respuesta JSON
});

// -------------------------------------------
// RUTA 2: POST /api/links — Crear un link nuevo
// -------------------------------------------
app.post('/api/links', (req, res) => {
  const links = readLinks();
  
  // El nuevo link viene en el "body" de la petición
  const newLink = {
    id: Date.now(), // Usamos la fecha actual como ID único (ej: 1710000000000)
    title: req.body.title,
    url: req.body.url,
    category: req.body.category,
    description: req.body.description
  };
  
  links.push(newLink); // Añadimos el nuevo link al array
  writeLinks(links);   // Guardamos el array actualizado al archivo
  
  res.status(201).json(newLink); // 201 = "creado con éxito"
});

// -------------------------------------------
// RUTA 3: PUT /api/links/:id — Editar un link
// -------------------------------------------
// :id es un "parámetro" — será el número ID del link que queremos editar
app.put('/api/links/:id', (req, res) => {
  const links = readLinks();
  const id = Number(req.params.id); // Convertimos el ID de texto a número
  
  // Buscamos la posición del link con ese ID en el array
  const index = links.findIndex(link => link.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Link no encontrado' }); // 404 = no existe
  }
  
  // Actualizamos el link manteniendo su ID original
  links[index] = { ...links[index], ...req.body, id };
  writeLinks(links);
  
  res.json(links[index]); // Devolvemos el link actualizado
});

// -------------------------------------------
// RUTA 4: DELETE /api/links/:id — Eliminar un link
// -------------------------------------------
app.delete('/api/links/:id', (req, res) => {
  const links = readLinks();
  const id = Number(req.params.id);
  
  // Creamos un array nuevo SIN el link que queremos borrar
  const filtered = links.filter(link => link.id !== id);
  
  if (filtered.length === links.length) {
    return res.status(404).json({ error: 'Link no encontrado' }); // No se borró nada
  }
  
  writeLinks(filtered);
  res.json({ message: 'Link eliminado correctamente' });
});

// -------------------------------------------
// ARRANCAR EL SERVIDOR
// -------------------------------------------
const PORT = 3001; // El "puerto" es como la puerta de entrada al servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});