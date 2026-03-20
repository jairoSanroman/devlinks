// LinkCard recibe un "link" como prop y lo muestra como una tarjeta
// Las props son como parámetros — datos que le pasamos al componente desde fuera

function LinkCard({ link, onDelete }) {
  // onDelete es una función que llamaremos cuando el usuario quiera borrar el link

  return (
    <div className="link-card">
      {/* Cabecera de la tarjeta con título y categoría */}
      <div className="link-card-header">
        <h3 className="link-card-title">{link.title}</h3>
        <span className="link-card-category">{link.category}</span>
      </div>

      {/* Descripción del link */}
      <p className="link-card-description">{link.description}</p>

      {/* Pie de la tarjeta con URL y botón de borrar */}
      <div className="link-card-footer">
        <a 
          href={link.url} 
          target="_blank" 
          rel="noreferrer"
          className="link-card-url"
        >
          🔗 {link.url}
        </a>

        <button 
          onClick={() => onDelete(link.id)}
          className="link-card-delete"
        >
          🗑️ Borrar
        </button>
      </div>
    </div>
  )
}

export default LinkCard