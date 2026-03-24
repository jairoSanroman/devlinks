import { useState } from 'react'

function LinkForm({ onAdd, linkEditando, onCancelar }) {

  // Inicializamos el formulario con los datos del link editando si existe
  const [formData, setFormData] = useState(() => {
    if (linkEditando) {
      return {
        title: linkEditando.title,
        url: linkEditando.url,
        category: linkEditando.category,
        description: linkEditando.description
      }
    }
    return { title: '', url: '', category: '', description: '' }
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.url) {
      alert('El título y la URL son obligatorios')
      return
    }

    onAdd(formData)

    if (!linkEditando) {
      setFormData({ title: '', url: '', category: '', description: '' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <h2>{linkEditando ? '✏️ Editar link' : '➕ Añadir nuevo link'}</h2>

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

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {linkEditando ? '💾 Guardar cambios' : '💾 Guardar link'}
        </button>

        {linkEditando && (
          <button
            type="button"
            onClick={onCancelar}
            className="btn-cancelar"
          >
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default LinkForm