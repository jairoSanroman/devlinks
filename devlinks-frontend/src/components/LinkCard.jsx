// LinkCard recibe un "link" como prop y lo muestra como una tarjeta
// Las props son como parámetros — datos que le pasamos al componente desde fuera

function LinkCard({ link, onDelete, onEdit }) {
  // onDelete: función para borrar el link
  // onEdit: función para editar el link, recibe el link completo

  return (
    <div className="link-card">

      {/* Cabecera: título y categoría */}
      <div className="link-card-header">
        <h3 className="link-card-title">{link.title}</h3>
        <span className="link-card-category">{link.category}</span>
      </div>

      {/* Descripción del link */}
      <p className="link-card-description">{link.description}</p>

      {/* Pie: URL y botones de acción */}
      <div className="link-card-footer">

        {/* Enlace que abre la URL en una pestaña nueva */}
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="link-card-url"
        >
          🔗 {link.url}
        </a>

        {/* Botones de editar y borrar */}
        <div className="link-card-actions">

          {/* Al hacer clic, pasa el link completo al componente padre */}
          <button
            onClick={() => onEdit(link)}
            className="link-card-edit"
          >
            ✏️ Editar
          </button>

          {/* Al hacer clic, pasa solo el id al componente padre */}
          <button
            onClick={() => onDelete(link.id)}
            className="link-card-delete"
          >
            🗑️ Borrar
          </button>

        </div>
      </div>
    </div>
  )
}

export default LinkCard