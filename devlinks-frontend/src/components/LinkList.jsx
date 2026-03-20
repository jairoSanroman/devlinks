// LinkList recibe el array de links y los muestra todos
// También recibe onDelete para pasárselo a cada LinkCard

import LinkCard from './LinkCard'

function LinkList({ links, onDelete }) {

  // Si no hay links, mostramos un mensaje
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
      {/* Recorremos el array y creamos una LinkCard por cada link */}
      {links.map(link => (
        <LinkCard 
          key={link.id}
          link={link}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default LinkList