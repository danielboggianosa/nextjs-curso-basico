# Documentación del Proyecto

---

## Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)  
2. [Estructura del Proyecto](#estructura-del-proyecto)  
3. [Guía de Uso](#guía-de-uso)  
4. [Detalles de los Módulos/Componentes](#detalles-de-los-móduloscomponentes)  
5. [Documentación de API](#documentación-de-api)  
6. [Ejemplos de Código](#ejemplos-de-código)  
7. [Notas de Desarrollo](#notas-de-desarrollo)  
8. [Licencia](#licencia)  

---

## 1. Resumen del Proyecto

Este proyecto es una **aplicación web de registro y gestión de usuarios**, desarrollada con **Next.js**, que se conecta a una base de datos **MySQL/MariaDB** para almacenar los datos de usuario. Permite la creación de usuarios a través de un formulario web y ofrece una API para registrar nuevos usuarios.

### Funcionalidades principales

- Registro de usuarios con campos: email, nombre y contraseña.
- Validación básica de datos en la creación de usuarios.
- Persistencia de usuarios en base de datos MySQL/MariaDB.
- Estructura preparada para migraciones de base de datos.
- Integración con TailwindCSS para estilos responsivos y modernos.

### Tecnologías y lenguajes utilizados

- Framework: [Next.js](https://nextjs.org) (React-based)
- Lenguaje: TypeScript y JavaScript
- Base de datos: MySQL / MariaDB (usado con `mysql2/promise`)
- Estilos: TailwindCSS
- Contenedores: Docker y Docker Compose para orquestación local
- Librerías adicionales:  
  - `pnpm` como gestor de paquetes  
  - Uso de fuentes de Google Fonts (`Geist` y `Geist Mono`) para tipografía optimizada  

### Requisitos

- Node.js 24+
- Docker y Docker Compose (para entorno con contenedores)
- Variables de entorno para conexión a base de datos

### Instalación y configuración básica

1. Clonar el repositorio.
2. Instalar dependencias usando `pnpm` (o npm/yarn):

```bash
pnpm install
```

3. Configurar variables de entorno (por ejemplo en archivo `.env.local`):

```env
DB_HOST=app-db
DB_USER=root
DB_PASS=root
DB_NAME=appDB
```

4. (Opcional) Levantar base de datos y aplicación con Docker Compose:

```bash
docker-compose up -d
```

5. Ejecutar migraciones para crear tablas necesarias:

```bash
# Esto puede automatizarse o ejecutarse manualmente desde el servicio
node scripts/runMigrations.js
```

6. Iniciar servidor de desarrollo:

```bash
pnpm dev
# o npm run dev / yarn dev
```

Abrir en navegador [`http://localhost:3000`](http://localhost:3000).

---

## 2. Estructura del Proyecto

```
/
├── app/                   # Código de páginas y componentes Next.js (App Router)
│   └── page.tsx           # Página principal con formulario de registro
├── api/
│   └── register/          # API route para registro de usuarios (POST)
│       └── route.ts       # Handler API (Next.js Route Handler)
├── config/
│   └── mysql.config.ts    # Configuración y utilidades de conexión MySQL
├── repositories/
│   └── users.repository.ts # Acceso a datos (CRUD usuarios)
├── services/
│   └── users.service.ts   # Lógica de negocio y validaciones para usuarios
├── public/                 # Archivos estáticos (Ej.: iconos, imágenes)
├── styles/
│   └── globals.css        # Estilos globales Tailwind
├── Dockerfile             # Definición imagen Docker para la app
├── docker-compose.yml     # Definición servicios (app y base de datos)
├── next.config.ts         # Configuración personalizada Next.js
├── package.json           # Dependencias, scripts NPM/PNPM
├── tsconfig.json          # Configuración TypeScript
└── README.md              # Documentación (este archivo)
```

### Función de carpetas y archivos clave

- **app/page.tsx**  
  Página React para registrar usuarios vía interfaz web.

- **api/register/route.ts**  
  Endpoint API Next.js para crear usuarios vía POST.

- **config/mysql.config.ts**  
  Conexión pool con MySQL, migraciones y función para realizar queries.

- **repositories/users.repository.ts**  
  Acceso directo a base de datos para CRUD de la tabla `users`.

- **services/users.service.ts**  
  Lógica de negocio (validaciones, reglas de negocio) para usuarios.

- **Dockerfile y docker-compose.yml**  
  Configuración para contenerización y despliegue local con MariaDB y la aplicación.

---

## 3. Guía de Uso

### Registro vía interfaz web

1. Ejecutar la aplicación (localmente o en contenedor).
2. Abrir navegador en [`http://localhost:3000`](http://localhost:3000).
3. Completar formulario de registro con email, nombre y contraseña.
4. Presionar botón **Register**.
5. Si hay algún error (campos vacíos o ya registrado), se mostrará mensaje.
6. En caso de éxito, los datos se enviarán al backend y se registrará usuario en base de datos.

### Registro vía API

- Enviar un request `POST` a `/api/register` con cuerpo JSON:

```json
{
  "email": "usuario@ejemplo.com",
  "name": "Nombre Apellido",
  "password": "contraseñaSegura123"
}
```

- Recibir respuesta JSON con el usuario registrado o error.

---

## 4. Detalles de los Módulos/Componentes

### 4.1 Servicio MySQL (`config/mysql.config.ts`)

- **Propósito:**  
  Gestionar la conexión pool con MySQL/MariaDB, ejecutar queries y manejar migraciones.

- **Funciones principales:**  
  - `query<T>(sql: string, values?: any[]): Promise<T[]>`  
    Ejecuta SQL parametrizado y regresa resultados genéricos tipados.  
  - `usersMigrations()`  
    Crea tabla `users` si no existe, con campos id, name, email, password, timestamps.  
  - `runAllMigrations()`  
    Ejecuta todas las migraciones necesarias.

- **Interacción:**  
  Utilizado por los repositorios para acceder y modificar datos.

---

### 4.2 Repositorio Usuarios (`repositories/users.repository.ts`)

- **Propósito:**  
  Abstracción del acceso a tabla `users` en la base de datos.

- **Clases y funciones:**  
  - `class UsersRepository`  
    - `getAll()` - Obtener todos los usuarios.  
    - `findByEmail(email: string)` - Buscar usuario por correo electrónico.  
    - `create(user: {name, email, password})` - Inserta un nuevo usuario.

- **Interacción:**  
  Usado por el servicio (`UserService`) para operaciones de base de datos.

---

### 4.3 Servicio de Usuarios (`services/users.service.ts`)

- **Propósito:**  
  Contener lógica de negocio, validaciones y reglas para usuarios respecto a la capa de datos.

- **Clase:**  
  - `UserService`  
    - `getAll()` - Obtiene todos los usuarios.  
    - `create(user)` - Valida datos, verifica existencia y crea usuario. Retorna `false` si ya existe.  
    - `login(email, password)` - Valida usuario y contraseña para login (por ahora comparativa directa).

- **Interacción:**  
  Consume `UsersRepository`. Usado por API y potencialmente otras rutas o componentes.

---

### 4.4 API Route `/api/register` (`api/register/route.ts`)

- **Propósito:**  
  Endpoint POST para registro de usuarios.

- **Funcionamiento:**  
  - Extrae `email`, `name`, `password` del JSON recibido.  
  - Valida campos obligatorios.  
  - Usa `UserService.create()` para intentar crear usuario.  
  - Retorna error en caso de campos vacíos o usuario duplicado.  
  - Responde con los datos del usuario registrado en caso de éxito.

- **Interacción:**  
  Recibe llamadas frontend o externas para registrar usuarios.

---

### 4.5 Componente de Registro (`app/page.tsx`)

- **Propósito:**  
  Interfaz de usuario para registrar nuevos usuarios.

- **Detalle:**  
  - Formulario controlado con estado React para email, nombre y contraseña.  
  - Manejador `handleSubmit` realiza fetch POST a `/api/register`.  
  - Manejo y visualización de errores.  
  - Estilos con TailwindCSS para diseño responsivo.

---

## 5. Documentación de API

### Endpoint: `/api/register`  

| Método | Descripción                 |
|--------|-----------------------------|
| POST   | Registra un nuevo usuario. |

#### Parámetros de entrada (cuerpo JSON)

| Campo    | Tipo   | Obligatorio | Descripción            |
|----------|--------|-------------|------------------------|
| `email`  | string | Sí          | Correo electrónico     |
| `name`   | string | Sí          | Nombre completo        |
| `password` | string | Sí          | Contraseña             |

#### Respuesta exitosa (200):

```json
{
  "email": "usuario@ejemplo.com",
  "name": "Nombre Apellido",
  "password": "contraseñaSegura123"
}
```

#### Respuesta error (ejemplo 400):

```json
{
  "error": "Missing fields"
}
```

##### Respuesta error (usuario existente):

```json
{
  "error": "Error creating user"
}
```

---

## 6. Ejemplos de Código

### Uso del servicio de usuarios para crear un usuario

```typescript
import { UserService } from "@/services/users.service";

async function registerUser() {
  const userService = new UserService();

  try {
    const newUser = await userService.create({
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      password: "miContraseña123"
    });

    if (!newUser) {
      console.log("Usuario ya existe");
      return;
    }

    console.log("Usuario registrado:", newUser);
  } catch (err) {
    console.error("Error al registrar usuario:", err);
  }
}
```

### Código para ejecutar migraciones

```typescript
import { runAllMigrations } from "@/config/mysql.config";

(async () => {
    await runAllMigrations();
    console.log("Migraciones completadas");
})();
```

### Uso del fetch en el frontend (formulario)

```tsx
const response = await fetch("/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, name, password }),
});
```

---

## 7. Notas de Desarrollo

- **Contribución:**  
  Todos los colaboradores deben firmar NDA y mantener la confidencialidad del código.

- **Reglas de codificación:**  
  - Utilizar TypeScript con tipados estrictos.  
  - Seguir convenciones Next.js y React.  
  - Usar TailwindCSS para estilos.  
  - Evitar exponer datos sensibles en logs o respuestas.

- **Pruebas:**  
  Actualmente el proyecto no incluye tests automatizados, se recomienda incorporar pruebas unitarias para servicios y endpoints.

- **Despliegue:**  
  - Utilizar Docker con la configuración de `Dockerfile` y `docker-compose.yml`.  
  - Variables de entorno deben ser gestionadas con secret manager o mecanismos seguros (no subir `.env` a repositorio).

- **Migraciones:**  
  - Ejecutar `runAllMigrations` antes de iniciar la app para garantizar estructura de BD.  
  - Se puede extender con una herramienta de migraciones más robusta si se requiere.

---

## 8. Licencia

Este proyecto es privado y propiedad exclusiva de la empresa. Su uso, distribución, modificación o cualquier otra acción está restringida a colaboradores autorizados que hayan firmado el Acuerdo de Confidencialidad (NDA).  

Para cualquier consulta sobre derechos y permisos, contactar al equipo legal de la empresa.

---

*Esta documentación está pensada para ser mantenida dentro de un entorno privado y seguro.*