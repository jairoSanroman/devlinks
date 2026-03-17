// Importamos useState y useEffect de React
// useState: guarda datos que pueden cambiar (como la lista de links)
// useEffect: ejecuta código cuando el componente se carga
import { useState, useEffect } from 'react'
import axios from 'axios' // Nuestro mensajero para hablar con el backend

// La URL base de nuestra API
const API_URL = 'http://localhost:3001/api/links'

function App() {
  // links: la lista de links que mostraremos
  // setLinks: la función para actualizar esa lista
  const [links, setLinks] = useState([])
  
  useEffect(() => {
  const obtenerLinks = async () => {
    try {
      const respuesta = await axios.get(API_URL)
      setLinks(respuesta.data) // Guardamos los links en el estado
    } catch (error) {
      console.error('Error al obtener links:', error)
    }
  }
  // Este código se ejecuta automáticamente cuando la app se carga
  
    obtenerLinks()
  }, []) // El [] significa "ejecuta esto solo una vez al cargar"

  // Función para obtener todos los links del backend
  

  return (
    <div>
      <h1>DevLinks 🔗</h1>
      <p>Tu gestor de recursos para developers</p>

      {/* Mostramos cuántos links hay */}
      <p>Links guardados: {links.length}</p>

      {/* Recorremos el array de links y mostramos cada uno */}
      {links.map(link => (
        <div key={link.id}>
          <h3>{link.title}</h3>
          <a href={link.url} target="_blank">{link.url}</a>
          <p>{link.description}</p>
        </div>
      ))}
    </div>
  )
}

export default App