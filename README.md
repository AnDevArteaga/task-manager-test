📝 TaskManager – Prueba Técnica
Aplicación web para la gestión de tareas desarrollada como parte de una prueba técnica. Construida con un enfoque moderno, modular y escalable, utilizando React, TypeScript, Tailwind CSS y Supabase.

🚀 Tecnologías Utilizadas
React – Librería principal para construir la interfaz de usuario.

TypeScript – Tipado estático para mayor robustez y mantenibilidad.

Tailwind CSS – Framework de estilos para construir interfaces rápidas y responsivas.

Supabase – Base de datos como servicio (PostgreSQL), gestión de datos en tiempo real.

🧱 Arquitectura y Estructura del Proyecto
El proyecto fue diseñado siguiendo buenas prácticas de arquitectura frontend:

Componentes reutilizables de UI: botones, inputs, selects, textareas, modales, etc.

Hooks personalizados: para separar responsabilidades como lógica de tareas, proyectos, notificaciones, entre otros.

Manejo de estado con Context API: permite compartir datos globales como tareas y proyectos.

Servicios desacoplados: peticiones a Supabase organizadas por dominio (/services).

React Router: para la navegación entre vistas (tareas, proyectos, dashboard).

Soporte para modo oscuro: habilitado con Tailwind y guardado en localStorage.

Notificaciones temporales: feedback visual ante acciones como crear tareas o cambiar de vista.

E2E Testing con Cypress: se desarrollaron pruebas automáticas de flujo en tareas, proyectos y alternancia de temas.

🔐 Autenticación
Esta prueba no requería autenticación, por lo tanto, la aplicación es de acceso libre.

Sin embargo, si se quisiera escalar a múltiples usuarios, podría integrarse fácilmente una solución como:

Supabase Auth (recomendado para mantener la tecnología unificada)

Firebase Auth

Auth0

Clerk, entre otros

🧪 Base de Datos
Se utilizó Supabase como backend para almacenamiento y gestión de datos (tareas y proyectos). Las operaciones se manejan mediante APIs directas y servicios definidos en el cliente.

📦 Instalación y Ejecución
1. Clonar el repositorio
bash
Copiar
Editar
git clone https://github.com/tu-usuario/taskmanager.git
cd taskmanager
2. Instalar dependencias
bash
Copiar
Editar
npm install
3. Crear archivo .env
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

env
Copiar
Editar
VITE_SUPABASE_URL=   # <- Agrega aquí la URL de tu instancia Supabase
VITE_SUPABASE_ANON_KEY=   # <- Agrega aquí tu clave pública (anon key)
Nota: Para esta prueba, se puede utilizar la siguiente clave pública de una base de datos demo:

Esta clave proporciona una conexión limitada solo para pruebas, y no compromete la seguridad del sistema.

4. Ejecutar el proyecto en modo desarrollo
bash
Copiar
Editar
npm run dev
La aplicación estará disponible en: http://localhost:5173

🧠 Decisiones Clave
✅ Uso de Context API en lugar de Redux para evitar sobreingeniería en un proyecto pequeño.

✅ División de la lógica en hooks personalizados para mayor reutilización y legibilidad.

✅ Estilo unificado con Tailwind CSS para rápida prototipación y soporte nativo de modo oscuro.

✅ Backend serverless con Supabase, eliminando la necesidad de construir una API propia.

✅ Inclusión de tests E2E con Cypress para asegurar la funcionalidad básica de tareas, temas y proyectos.

📁 Estructura del Proyecto
bash
Copiar
Editar
📁 src/
├── components/          # Componentes de UI reutilizables
├── context/             # Contextos globales (tareas, proyectos)
├── hooks/               # Hooks personalizados
├── interfaces/          # Tipos y contratos TypeScript
├── pages/               # Páginas principales (dashboard, tareas, proyectos)
├── router/              # Rutas con React Router
├── services/            # Servicios para Supabase (CRUD)
├── styles/              # Estilos globales
└── types/               # Enumeraciones y estructuras auxiliares
🧪 Testing
Se implementaron pruebas de extremo a extremo con Cypress para validar:

✅ Creación y eliminación de tareas.

✅ Alternancia de temas (modo claro/oscuro).

✅ Creación y navegación de proyectos.

bash
Copiar
Editar
# Ejecutar pruebas e2e
npx cypress open
📌 Conclusión
Este proyecto demuestra la capacidad de desarrollar una aplicación moderna y funcional en React utilizando un stack liviano, pero potente, ideal para MVPs, pruebas técnicas o proyectos escalables.

Se priorizó:

Claridad en la estructura.

Separación de responsabilidades.

Experiencia de usuario intuitiva.

Facilidad para escalar a futuro.

