# 📋 To-Do List App

Aplicación web para la gestión de tareas pendientes con autenticación de usuarios y categorización por tipos.

## 🎯 Características Principales

### 1. **Pantalla de Inicio**
- Resumen de tareas pendientes y completadas

### 2. **Agregar Tareas**
- Crear nuevas tareas con:
  - **Título**: Nombre de la tarea
  - **Descripción**: Detalles adicionales
  - **Tipo**: Categorización (Trabajo, Casa, Negocios, o personalizado)

### 3. **Lista de Tareas**
- Visualización de todas las tareas pendientes
- Marcar tareas como completadas
- Eliminar tareas no necesarias
- Separación visual por estado (pendiente/completada)

### 4. **Detalles de Tarea**
- Vista detallada al hacer clic en cualquier tarea
- Información completa: título, descripción, tipo y estado

### 5. **Autenticación y Seguridad**
- Sistema de registro e inicio de sesión
- Token JWT almacenado en cookies httpOnly

---

## 🛠️ Tecnologías Utilizadas

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT para autenticación
- bcryptjs para hash de contraseñas
- cookie-parser para manejo de cookies
- validator para validación de inputs

### **Frontend**
- React + Vite
- Material-UI (MUI)
- Axios para peticiones HTTP
- React Router para navegación

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **MongoDB** (local o Atlas) - [Descargar aquí](https://www.mongodb.com/try/download/community)
- **Git** (opcional, para clonar el repositorio)

---

## 🚀 Instrucciones para Probar la Aplicación

### **OPCIÓN 1: Probar la Aplicación Desplegada (Recomendado)**

La aplicación ya está desplegada y lista para usar:

1. **Accede a la aplicación:**
   - Frontend: [https://to-do-list-eight-kappa-30.vercel.app](https://to-do-list-eight-kappa-30.vercel.app)
   - Backend: [https://todolis-backend.onrender.com](https://todolis-backend.onrender.com)

2. **Crear una cuenta nueva:**
   - Haz clic en "Crear cuenta"
   - Completa el formulario:
     - **Nombre de usuario**: Tu nombre
     - **Email**: correo@ejemplo.com
     - **Contraseña**: Mínimo 8 caracteres, una mayúscula y un número (ej: `Prueba123`)
   - Haz clic en "Registrarse"

3. **Probar las funcionalidades:**
   - Una vez dentro, podrás:
     - ✅ Ver la pantalla de inicio con el resumen de tareas
     - ✅ Agregar nuevas tareas con título, descripción y tipo
     - ✅ Marcar tareas como completadas
     - ✅ Ver detalles de cada tarea
     - ✅ Eliminar tareas

---

### **OPCIÓN 2: Instalación Local**

#### **Paso 1: Clonar el Repositorio**

```bash
git clone https://github.com/FernandoSic/ToDoList-movile.git
cd "Proyecto final"
```

#### **Paso 2: Configurar el Backend**

1. **Navegar a la carpeta del backend:**
   ```bash
   cd backend-todo-list
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Crea un archivo `.env` en la raíz de `backend-todo-list` con el siguiente contenido:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/todolist
   JWT_SECRET=tu_clave_secreta_muy_segura_aqui
   NODE_ENV=development
   ```

   **Nota:** Si usas MongoDB Atlas, reemplaza `MONGO_URI` con tu cadena de conexión.

4. **Iniciar el servidor backend:**
   ```bash
   node serve.js
   ```

   O si prefieres modo desarrollo con auto-reload (requiere nodemon):
   ```bash
   nodemon serve.js
   ```

   El servidor estará corriendo en `http://localhost:3000`

#### **Paso 3: Configurar el Frontend**

1. **Abrir una nueva terminal y navegar a la carpeta del frontend:**
   ```bash
   cd frontend-todo-list
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Crea un archivo `.env` en la raíz de `frontend-todo-list` con:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

#### **Paso 4: Probar la Aplicación**

1. **Abre tu navegador** y ve a `http://localhost:5173`

2. **Registrar un usuario:**
   - Haz clic en "Crear cuenta"
   - Completa el formulario con:
     - Nombre de usuario
     - Email válido
     - Contraseña (mínimo 8 caracteres, una mayúscula y un número)
   - Haz clic en "Registrarse"

3. **Iniciar sesión:**
   - Si ya tienes cuenta, inicia sesión con tu email y contraseña
   - Serás redirigido a la pantalla principal

4. **Agregar una tarea:**
   - En la página principal, haz clic en el botón "+"
   - Completa el formulario:
     - **Título**: "Comprar víveres"
     - **Descripción**: "Leche, pan, huevos"
     - **Tipo**: Selecciona "Casa" o crea uno nuevo
   - Haz clic en "Guardar"

5. **Ver lista de tareas:**
   - En la página principal verás todas tus tareas
   - Las tareas pendientes se muestran con un color
   - Las completadas con otro

6. **Marcar tarea como completada:**
   - Haz clic en el ícono de check ✓ en cualquier tarea

7. **Ver detalles de una tarea:**
   - Haz clic en cualquier tarjeta de tarea
   - Verás todos los detalles: título, descripción, tipo, fecha de creación

8. **Eliminar una tarea:**
   - Haz clic en el ícono de basura 🗑️ en cualquier tarea
   - Confirma la eliminación

---

## 📁 Estructura del Proyecto

```
Proyecto final/
├── backend-todo-list/          # Servidor Node.js + Express
│   ├── src/
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── models/             # Modelos de MongoDB
│   │   ├── routes/             # Rutas de la API
│   │   ├── middlewares/        # Middleware de autenticación
│   │   ├── config/             # Configuración de DB
│   │   └── app.js              # Configuración principal
│   ├── package.json
│   └── serve.js                # Punto de entrada
│
└── frontend-todo-list/         # Aplicación React
    ├── src/
    │   ├── api/                # Servicios HTTP
    │   ├── components/         # Componentes reutilizables
    │   ├── pages/              # Páginas de la app
    │   ├── context/            # Context API (Auth)
    │   └── utils/              # Utilidades
    ├── package.json
    └── vite.config.js          # Configuración de Vite
```

---


## 🤝 Autor

**Fernando José Nicolás Sic Saquic**

Carnet - 24000480

Proyecto Final - Introducción al Desarrollo de Aplicaciones Móviles 

Universidad Galileo - 2025

---

## 📝 Notas Adicionales

- La primera carga del backend en Render puede tardar ~1 minuto (free tier)
- Las cookies están configuradas para funcionar en desarrollo (localhost) y producción (Vercel + Render)
- MongoDB está alojado en MongoDB Atlas
- Los datos persisten entre sesiones

---

## 🐛 Solución de Problemas


### **No se conecta a MongoDB**
- Verifica que MONGO_URI esté correctamente configurado
- Si usas Atlas, verifica que tu IP esté en la whitelist

### **Frontend no carga datos**
- Verifica que VITE_API_URL apunte a la URL correcta del backend
- Abre DevTools y revisa errores en la consola

---

¡Gracias por probar la aplicación! 🎉