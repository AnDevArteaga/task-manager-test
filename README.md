# 📝 TaskManager – Prueba Técnica

Aplicación web para la **gestión de tareas** desarrollada como parte de una prueba técnica. Construida con un enfoque moderno, modular y escalable, utilizando **React**, **TypeScript**, **Tailwind CSS** y **Supabase**.

---

---
Aplicacion desplegada en Vercel: https://task-manager-test-pied.vercel.app/

## 🚀 Tecnologías Utilizadas

- ⚛️ **React** – Librería principal para construir la interfaz de usuario.
- 🔐 **TypeScript** – Tipado estático para mayor robustez y mantenibilidad.
- 🎨 **Tailwind CSS** – Framework de estilos para construir interfaces rápidas y responsivas.
- 🛠️ **Supabase** – Backend como servicio (PostgreSQL + almacenamiento + tiempo real).

---

## 🧱 Arquitectura y Estructura del Proyecto

El proyecto fue diseñado siguiendo buenas prácticas de arquitectura frontend:

- ✅ **Componentes reutilizables de UI**: botones, inputs, selects, textareas, modales, etc.
- ✅ **Hooks personalizados**: para separar responsabilidades como lógica de tareas, proyectos, notificaciones, etc.
- ✅ **Context API**: para manejo global de estados como tareas y proyectos.
- ✅ **Servicios desacoplados**: peticiones a Supabase organizadas por dominio en la carpeta `/services`.
- ✅ **Enrutamiento con React Router**: navegación fluida entre tareas, proyectos, dashboard, etc.
- ✅ **Modo oscuro**: soporte completo con Tailwind y persistencia con `localStorage`.
- ✅ **Notificaciones temporales**: feedback visual al crear tareas o realizar acciones.
- ✅ **E2E con Cypress**: pruebas de flujo para tareas, temas y proyectos.

---

## 🔐 Autenticación

Esta prueba **no requería autenticación**, por lo tanto, la aplicación es de **acceso libre**.

> En caso de necesitar escalabilidad para múltiples usuarios, se puede integrar fácilmente:
>
> - Supabase Auth (recomendado para mantener la misma tecnología)
> - Firebase Auth
> - Auth0
> - Clerk, entre otros

---

## 🧪 Base de Datos

Se utilizó **Supabase** como backend para almacenamiento y gestión de datos (tareas y proyectos).  
Las operaciones se manejan mediante APIs directas usando la librería oficial `@supabase/supabase-js`.

---

## 📦 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/AnDevArteaga/task-manager-test.git
cd task-manager-test
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

```env
VITE_SUPABASE_URL=https://leeljdldzltybaxmozfg.supabase.co     # ← URL de tu instancia Supabase
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZWxqZGxkemx0eWJheG1vemZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTkyNjcsImV4cCI6MjA2Mjk5NTI2N30.n2r3ZU2-jnAvMJuR_HGH9VZRsg8nSARgukSQbtYNJd0  # ← Clave pública (anon key)
```

> **Nota:** Para esta prueba puedes utilizar una clave pública de una base de datos **demo**:
>
> Esta clave proporciona **una conexión limitada** solo para pruebas y **no compromete la seguridad**.

---

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 📁 Estructura del Proyecto

```
📁 src/
├── components/          # Componentes de UI reutilizables
├── context/             # Contextos globales (tareas, proyectos)
├── hooks/               # Hooks personalizados
├── interfaces/          # Tipos e interfaces TypeScript
├── pages/               # Vistas principales (dashboard, tareas, proyectos)
├── router/              # Configuración de rutas con React Router
├── services/            # Servicios para Supabase
├── styles/              # Estilos globales
└── types/               # Tipos y estructuras auxiliares
```

---

## 🧪 Testing (E2E con Cypress)

Se implementaron pruebas automatizadas con **Cypress** para asegurar funcionalidad básica:

- ✅ Crear y eliminar tareas.
- ✅ Alternar entre modo claro/oscuro.
- ✅ Crear y listar proyectos.

### Ejecutar pruebas Cypress:

```bash
npx cypress open
```

---

## 📌 Decisiones Clave

- 📌 Uso de **Context API** en lugar de Redux para evitar sobrecarga innecesaria.
- 📌 Lógica dividida en **hooks reutilizables** para mantener el código limpio.
- 📌 Uso de **Tailwind CSS** para consistencia visual y fácil personalización.
- 📌 Backend **serverless** con Supabase para simplicidad y potencia sin servidor.
- 📌 Pruebas E2E con **Cypress** como validación automática de flujos principales.

---

# 📘 Instrucciones de uso de la aplicación de gestión de tareas

Esta aplicación permite crear y gestionar tareas por proyectos. A continuación, se detallan las vistas principales y cómo interactuar con ellas paso a paso.

---

## 🏠 Vista principal: Dashboard

- Muestra una **vista resumida de tareas pendientes y completadas**.
- Desde esta vista se puede navegar hacia los distintos **proyectos creados**.
- El **modo oscuro** o claro puede alternarse usando el **switch ubicado en la parte superior derecha**.

---

## 📁 Vista de Proyecto

### ➕ Crear un nuevo proyecto
1. Haz clic en el botón **"Nuevo Proyecto"**.
2. Se mostrará un formulario con campos para el **nombre del proyecto**.
3. Puedes **guardar** el nuevo proyecto o **cancelar** la operación.

### ✏️ Editar nombre del proyecto
- Haz clic sobre el ícono de **editar** (🖉) o directamente sobre el **nombre del proyecto**.
- Se habilitará la edición.
- Puedes **guardar** los cambios con el ícono ✅ o **cancelarlos** con ❌.

---

## ✅ Gestión de Tareas
- La lista de tareas implementa únicamente el orden por fecha de vencimiento, tal como fue solicitado en los requisitos. Este orden se representa visualmente mediante colores: rojo para tareas vencidas o del día, naranja para próximas (menos de 1.5 días), amarillo para vencimientos cercanos (hasta 5 días) y gris para tareas sin fecha o más lejanas. No se implementó un orden adicional por prioridad. Sin embargo, sí se incluye un sistema de filtros que permite al usuario seleccionar el tipo de filtro (estado o prioridad) y aplicar los criterios deseados para visualizar tareas específicas según esos campos.

### ➕ Añadir una nueva tarea
1. Haz clic en el botón **"Añadir tarea"**.
2. Aparecerá un campo de texto donde puedes **escribir el título** de la tarea.
3. Usa los botones para **guardar** (✅) o **cancelar** (❌) la nueva tarea.

### 👁️ Ver y editar detalles de una tarea
- Haz clic sobre una tarea para abrir el **modal de detalles**.
- Dentro del modal podrás:
  - **Marcar la tarea como completada**.
  - **Seleccionar prioridad**.
  - **Asignar una fecha límite**.
  - **Añadir o modificar una descripción**.

#### ✏️ Edición de campos dentro de la tarea
- Cada campo editable (prioridad, descripción) muestra íconos para:
  - **Guardar cambios** (✅).
  - **Cancelar edición** (❌).
- Los cambios **solo se verán reflejados en la lista de tareas si se guardan** desde el ícono principal de **guardar** (💾) dentro del modal.

### 🗑️ Eliminar tarea
- Haz clic en el **ícono de papelera (🗑️)** o en el botón rojo dentro del modal.

---

## 🌙 Modo oscuro / claro

- Para alternar entre **modo oscuro** y **modo claro**, utiliza el **switch** disponible en la **esquina superior derecha**.

---

## 📌 Conclusión

Este proyecto demuestra la capacidad de construir una **aplicación moderna**, funcional y bien organizada en React, con un stack simple pero potente, ideal para MVPs, pruebas técnicas o incluso producción.

Se priorizó:

- 🔹 Claridad en la estructura del código.
- 🔹 Separación de responsabilidades.
- 🔹 Experiencia de usuario fluida.
- 🔹 Escalabilidad futura.

---


