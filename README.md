📋 Directorio de Empleados (Full-Stack)

Aplicación web para la gestión de empleados, desarrollada como prueba técnica Full-Stack. Permite realizar operaciones CRUD completas, búsqueda en tiempo real y gestión de estados.

🚀 Tecnologías

Backend: NestJS, TypeORM, SQLite.

Frontend: React + Vite, TypeScript, CSS Modules.

Base de Datos: SQLite (Persistencia local).

⚙️ Funcionalidades

Listado de Empleados: Vista general con tarjetas informativas.

Registro: Formulario para añadir nuevos colaboradores.

Edición: Modificación de datos existentes.

Eliminación: Borrado lógico o físico de registros.

Buscador en Tiempo Real: Filtrado por nombre o cargo.

Toggle Rápido: Cambio de estado (Activo/Inactivo) con un solo clic.

📦 Instalación y Ejecución

Sigue estos pasos para correr el proyecto localmente:

1. Clonar el repositorio

git clone <TU_URL_DEL_REPOSITORIO>
cd directorio-empleados-fullstack


2. Configurar el Backend (Puerto 3000)

cd backend
npm install
npm run start


3. Configurar el Frontend (Puerto 5173)

Abre una nueva terminal en la raíz del proyecto:

cd frontend
npm install
npm run dev


🛠️ Endpoints de la API

Método

Endpoint

Descripción

GET

/employees

Obtener todos los empleados

POST

/employees

Crear un empleado

PATCH

/employees/:id

Actualizar (parcial)

DELETE

/employees/:id

Eliminar empleado

Desarrollado por [Tu Nombre]