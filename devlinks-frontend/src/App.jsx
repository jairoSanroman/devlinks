import { useState, useEffect } from 'react'
import axios from 'axios'
import LinkList from './components/LinkList'
import LinkForm from './components/LinkForm'
import SearchBar from './components/SearchBar'

const API_URL = 'http://localhost:3001/api/links'

function App() {
  const [links, setLinks] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  // linkEditando guarda el link que estamos editando, o null si no hay ninguno
  const [linkEditando, setLinkEditando] = useState(null)

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

  // Añadir link nuevo
  const handleAdd = async (formData) => {
    try {
      const respuesta = await axios.post(API_URL, formData)
      setLinks([...links, respuesta.data])
    } catch (error) {
      console.error('Error al añadir link:', error)
    }
  }

  // Guardar link editado
  const handleEdit = async (formData) => {
    try {
      const respuesta = await axios.put(`${API_URL}/${linkEditando.id}`, formData)
      // Reemplazamos el link antiguo por el actualizado en el estado
      setLinks(links.map(link => 
        link.id === linkEditando.id ? respuesta.data : link
      ))
      setLinkEditando(null) // Limpiamos el link en edición
    } catch (error) {
      console.error('Error al editar link:', error)
    }
  }

  // Borrar link
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setLinks(links.filter(link => link.id !== id))
    } catch (error) {
      console.error('Error al borrar link:', error)
    }
  }

  // Filtrar links según búsqueda y categoría
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
        {/* Si hay un link en edición mostramos el form con sus datos,
            si no mostramos el form vacío para añadir */}
        {linkEditando ? (
  <LinkForm
    key={linkEditando.id}
    onAdd={handleEdit}
    linkEditando={linkEditando}
    onCancelar={() => setLinkEditando(null)}
  />
) : (
  <LinkForm onAdd={handleAdd} />
)}

        <SearchBar
          onSearch={setBusqueda}
          onFilter={setCategoria}
        />

        <p className="links-count">
          {linksFiltrados.length} {linksFiltrados.length === 1 ? 'link encontrado' : 'links encontrados'}
        </p>

        <LinkList
          links={linksFiltrados}
          onDelete={handleDelete}
          onEdit={setLinkEditando}
        />
      </main>
    </div>
  )
}

export default App