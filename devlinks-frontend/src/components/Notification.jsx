// Notification muestra mensajes de éxito o error al usuario
// tipo: "exito" o "error"
// mensaje: el texto a mostrar

function Notification({ tipo, mensaje }) {
  if (!mensaje) return null // Si no hay mensaje no mostramos nada

  return (
    <div className={`notification notification-${tipo}`}>
      {tipo === 'exito' ? '✅' : '❌'} {mensaje}
    </div>
  )
}

export default Notification