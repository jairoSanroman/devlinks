import { useState, useEffect } from 'react'
import axios from 'axios'
import LinkList from './components/LinkList'
import LinkForm from './components/LinkForm'
import SearchBar from './components/SearchBar'
import Notification from './components/Notification'
import './App.css'


const API_URL = 'https://devlinks-production.up.railway.app/api/links'

function App() {
  const [links, setLinks] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [linkEditando, setLinkEditando] = useState(null)
  const [cargando, setCargando] = useState(false)        // true mientras esperamos al servidor
  const [notificacion, setNotificacion] = useState(null) // { tipo, mensaje }

  // Función para mostrar una notificación y que desaparezca sola en 3 segundos
  const mostrarNotificacion = (tipo, mensaje) => {
    setNotificacion({ tipo, mensaje })
    setTimeout(() => setNotificacion(null), 3000)
  }

  useEffect(() => {
    const obtenerLinks = async () => {
      setCargando(true) // Activamos el estado de carga
      try {
        const respuesta = await axios.get(API_URL)
        setLinks(respuesta.data)
      } catch (_error) {
        mostrarNotificacion('error', 'No se pudieron cargar los links. ¿Está el servidor corriendo?')
      } finally {
        setCargando(false) // Desactivamos la carga pase lo que pase
      }
    }
    obtenerLinks()
  }, [])

  const handleAdd = async (formData) => {
    try {
      const respuesta = await axios.post(API_URL, formData)
      setLinks([...links, respuesta.data])
      mostrarNotificacion('exito', 'Link añadido correctamente')
    } catch (_error) {
      mostrarNotificacion('error', 'Error al añadir el link')
    }
  }

  const handleEdit = async (formData) => {
    try {
      const respuesta = await axios.put(`${API_URL}/${linkEditando.id}`, formData)
      setLinks(links.map(link =>
        link.id === linkEditando.id ? respuesta.data : link
      ))
      setLinkEditando(null)
      mostrarNotificacion('exito', 'Link actualizado correctamente')
    } catch (_error) {
      mostrarNotificacion('error', 'Error al actualizar el link')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setLinks(links.filter(link => link.id !== id))
      mostrarNotificacion('exito', 'Link eliminado correctamente')
    } catch (_error) {
      mostrarNotificacion('error', 'Error al eliminar el link')
    }
  }

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
        {/* Notificación — aparece y desaparece sola */}
        {notificacion && (
          <Notification
            tipo={notificacion.tipo}
            mensaje={notificacion.mensaje}
          />
        )}

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

        {/* Estado de carga */}
        {cargando ? (
          <p className="loading">⏳ Cargando links...</p>
        ) : (
          <p className="links-count">
            {linksFiltrados.length} {linksFiltrados.length === 1 ? 'link encontrado' : 'links encontrados'}
          </p>
        )}

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