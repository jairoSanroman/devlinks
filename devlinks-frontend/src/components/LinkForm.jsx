// LinkForm maneja el formulario para añadir nuevos links
// useState nos permite guardar lo que el usuario escribe en cada campo

import { useState } from 'react'

function LinkForm({ onAdd }) {
  // Guardamos los valores del formulario en un objeto
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: '',
    description: ''
  })

  // Esta función se ejecuta cada vez que el usuario escribe en un campo
  const handleChange = (e) => {
    setFormData({
      ...formData,          // Mantenemos los valores anteriores
      [e.target.name]: e.target.value  // Actualizamos solo el campo que cambió
    })
  }

  // Esta función se ejecuta cuando el usuario envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault() // Evita que la página se recargue al enviar

    // Verificamos que los campos obligatorios estén rellenos
    if (!formData.title || !formData.url) {
      alert('El título y la URL son obligatorios')
      return
    }

    onAdd(formData) // Llamamos a la función del padre con los datos

    // Limpiamos el formulario después de enviar
    setFormData({ title: '', url: '', category: '', description: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <h2>➕ Añadir nuevo link</h2>

      <div className="form-group">
        <label>Título *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: MDN Web Docs"
        />
      </div>

      <div className="form-group">
        <label>URL *</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Selecciona una categoría</option>
          <option value="documentacion">📚 Documentación</option>
          <option value="herramientas">🛠️ Herramientas</option>
          <option value="tutoriales">🎓 Tutoriales</option>
          <option value="librerias">📦 Librerías</option>
          <option value="otros">📌 Otros</option>
        </select>
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="¿Para qué sirve este recurso?"
          rows="3"
        />
      </div>

      <button type="submit" className="btn-submit">
        💾 Guardar link
      </button>
    </form>
  )
}

export default LinkForm