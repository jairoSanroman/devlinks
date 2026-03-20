import { useState, useEffect } from 'react'
import axios from 'axios'
import LinkList from './components/LinkList'
import LinkForm from './components/LinkForm'
import SearchBar from './components/SearchBar'

const API_URL = 'http://localhost:3001/api/links'

function App() {
  const [links, setLinks] = useState([])          // Todos los links
  const [busqueda, setBusqueda] = useState('')     // Texto de búsqueda
  const [categoria, setCategoria] = useState('')   // Categoría seleccionada

  useEffect(() => {
    const obtenerLinks = async () => {
      try {
        const respuesta = await axios.get(API_URL)
        setLinks(respuesta.data)
      } catch (error) {
        console.error('Error al obtener links:', error)
      }
    }
    obtenerLinks()
  }, [])

  // Función para añadir un link nuevo
  const handleAdd = async (formData) => {
    try {
      const respuesta = await axios.post(API_URL, formData)
      setLinks([...links, respuesta.data])
    } catch (error) {
      console.error('Error al añadir link:', error)
    }
  }

  // Función para borrar un link
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setLinks(links.filter(link => link.id !== id))
    } catch (error) {
      console.error('Error al borrar link:', error)
    }
  }

  // Filtramos los links según búsqueda y categoría
  // Esto se recalcula automáticamente cada vez que cambia links, busqueda o categoria
  const linksFiltrados = links.filter(link => {
    const coincideTexto = 
      link.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      link.description?.toLowerCase().includes(busqueda.toLowerCase())

    const coincideCategoria = 
      categoria === '' || link.category === categoria

    return coincideTexto && coincideCategoria
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>DevLinks 🔗</h1>
        <p>Tu gestor de recursos para developers</p>
      </header>

      <main className="app-main">
        {/* Formulario para añadir links */}
        <LinkForm onAdd={handleAdd} />

        {/* Buscador y filtros */}
        <SearchBar 
          onSearch={setBusqueda} 
          onFilter={setCategoria} 
        />

        {/* Contador de links filtrados */}
        <p className="links-count">
          {linksFiltrados.length} {linksFiltrados.length === 1 ? 'link encontrado' : 'links encontrados'}
        </p>

        {/* Lista de links filtrados */}
        <LinkList links={linksFiltrados} onDelete={handleDelete} />
      </main>
    </div>
  )
}

export default App