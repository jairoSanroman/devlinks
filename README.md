# 🔗 DevLinks

> Gestor de recursos y links útiles para developers. Guarda, organiza y encuentra tus mejores referencias en un solo lugar.

![Estado](https://img.shields.io/badge/estado-en%20construcción-yellow)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Node.js-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 ¿Qué es DevLinks?

Como developer, acumulamos cientos de links útiles: documentación, tutoriales, herramientas, librerías... y siempre los perdemos.

**DevLinks** resuelve eso: una app para guardar, organizar y buscar todos tus recursos en un solo lugar, con categorías y búsqueda en tiempo real.

---

## ✨ Funcionalidades

- 📥 Guardar links con título, URL, categoría y descripción
- 🗂️ Organizar por categorías (documentación, herramientas, tutoriales...)
- 🔍 Búsqueda en tiempo real
- ✏️ Editar y eliminar recursos
- 💾 Persistencia de datos

---

## 🛠️ Stack tecnológico

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| Frontend | React | Componentes reutilizables y UI reactiva |
| Backend | Node.js + Express | API REST rápida y sencilla |
| Base de datos | JSON | Ligera, sin configuración |
| Deploy Frontend | Vercel | Deploy automático desde GitHub |
| Deploy Backend | Railway | Hosting Node.js gratuito |

---

## 🚀 Cómo ejecutarlo en local

### Requisitos
- Node.js v18 o superior
- Git

### Instalación
```bash
# Clona el repositorio
git clone https://github.com/jairoSanroman/devlinks.git

# Entra al backend
cd devlinks/devlinks-backend

# Instala dependencias
npm install

# Arranca el servidor
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

---

## 📡 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/links` | Obtener todos los links |
| POST | `/api/links` | Crear un link nuevo |
| PUT | `/api/links/:id` | Editar un link |
| DELETE | `/api/links/:id` | Eliminar un link |

---

## 📅 Estado

🚧 Proyecto actualmente en desarrollo — próximamente disponible con deploy.

```


## 👤 Autor

**Jairo Sanromán**  
[GitHub](https://github.com/jairoSanroman)
```

---

