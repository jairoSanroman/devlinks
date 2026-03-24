import LinkCard from './LinkCard'

// Añadimos onEdit como nueva prop
function LinkList({ links, onDelete, onEdit }) {

  if (links.length === 0) {
    return (
      <div className="empty-state">
        <p>😕 No hay links guardados todavía</p>
        <p>¡Añade tu primer recurso!</p>
      </div>
    )
  }

  return (
    <div className="link-list">
      {links.map(link => (
        // Pasamos onEdit a cada tarjeta
        <LinkCard
          key={link.id}
          link={link}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default LinkList