// SearchBar recibe dos funciones:
// onSearch: se ejecuta cuando el usuario escribe
// onFilter: se ejecuta cuando el usuario cambia la categoría

function SearchBar({ onSearch, onFilter }) {
  return (
    <div className="searchbar">
      {/* Campo de búsqueda por texto */}
      <input
        type="text"
        placeholder="🔍 Buscar recursos..."
        onChange={(e) => onSearch(e.target.value)}
        className="searchbar-input"
      />

      {/* Selector de categoría */}
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="searchbar-select"
      >
        <option value="">Todas las categorías</option>
        <option value="documentacion">📚 Documentación</option>
        <option value="herramientas">🛠️ Herramientas</option>
        <option value="tutoriales">🎓 Tutoriales</option>
        <option value="librerias">📦 Librerías</option>
        <option value="otros">📌 Otros</option>
      </select>
    </div>
  )
}

export default SearchBar