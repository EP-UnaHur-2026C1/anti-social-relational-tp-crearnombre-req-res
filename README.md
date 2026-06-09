# Anti-Social Relational

API de red social construida con Node.js, Express y Sequelize. Permite gestionar usuarios, publicaciones, comentarios, tags, imágenes y seguidores. Soporta múltiples bases de datos (SQLite, MySQL, PostgreSQL).

---

Pasos para probar:

```bash
# 1. Iniciar servidor
npm run dev

# 2. En otra terminal, cargar datos de prueba
npm run seed

# 3. Importar el archivo deseado en Postman y probar los endpoints
```

Los requests usan la variable `{{baseUrl}}` que debe definirse en Postman como `http://localhost:3000`.

---

- **Runtime:** Node.js 24+
- **Framework:** Express 5
- **ORM:** Sequelize 6
- **Validación:** Joi 18
- **Documentación:** OpenAPI 3.0 (Swagger)
- **Base de datos:** SQLite (por defecto), MySQL o PostgreSQL

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/EP-UnaHur-2026C1/anti-social-relational-tp-crearnombre-req-res.git
cd anti-social-relational-tp-crearnombre-req-res

# 2. Instalar dependencias
npm install

# 3. (Opcional) Configurar variables de entorno en caso de usar una BD diferente a SQLite
#    Copiar .env.example a .env y ajustar según corresponda
cp .env.example .env

# 4. Iniciar servidor (crea las tablas automáticamente)
npm run dev

# 5. (Opcional) Cargar datos de prueba
npm run seed
```

## Pruebas con Postman

Hay tres archivos en la raíz del proyecto para probar en Postman:

| Archivo                                 | Descripción                                                            |
| --------------------------------------- | ---------------------------------------------------------------------- |
| `api_postman_collection.json`           | Estructura base con todos los endpoints (sin datos de ejemplo)         |
| `datos de prueba.json`                  | Ejemplos de datos para usar en las requests                            |
| `api_postman_collection con datos.json` | Colección completa con estructura + datos precargados listos para usar |

**api_postman_collection con datos.json asume que se ejecutó `npm run seed` primero** para que los IDs de usuarios, posts, tags y comentarios coincidan.

El servidor se levanta en `http://localhost:3000` (o el puerto configurado en `PORT`).

---

## Scripts

| Comando        | Descripción                                         |
| -------------- | --------------------------------------------------- |
| `npm start`    | Inicia el servidor con Node                         |
| `npm run dev`  | Inicia el servidor con Nodemon (recarga automática) |
| `npm run seed` | Ejecuta todos los seeders (datos de prueba)         |

---

## Variables de entorno (`.env`)

| Variable                   | Obligatoria         | Default              | Descripción                                               |
| -------------------------- | ------------------- | -------------------- | --------------------------------------------------------- |
| `PORT`                     | No                  | `3000`               | Puerto del servidor                                       |
| `DB_DIALECT`               | No                  | `sqlite`             | Dialecto de base de datos (`sqlite`, `mysql`, `postgres`) |
| `DB_STORAGE`               | Solo SQLite         | `./data/data.sqlite` | Ruta al archivo SQLite                                    |
| `DB_HOST`                  | Solo MySQL/Postgres | `localhost`          | Host de la base de datos                                  |
| `DB_USERNAME`              | Solo MySQL/Postgres | `root`               | Usuario de la base de datos                               |
| `DB_PASSWORD`              | Solo MySQL/Postgres | (vacío)              | Contraseña de la base de datos                            |
| `DB_NAME`                  | Solo MySQL/Postgres | `anti_social_db`     | Nombre de la base de datos                                |
| `COMENTARIOS_LIMITE_MESES` | No                  | `6`                  | Meses de antigüedad máxima para comentarios visibles      |

### Ejemplos de configuración

**SQLite (default):**

```env
DB_DIALECT=sqlite
DB_STORAGE=./data/data.sqlite
```

**MySQL:**

```env
DB_DIALECT=mysql
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=anti_social_db
```

---

## Estructura del proyecto

```
├── app.js                    # Punto de entrada
├── config/
│   └── config.js             # Configuración multi-dialecto de Sequelize
├── controllers/              # Lógica de negocio
│   ├── users.controllers.js
│   ├── posts.controllers.js
│   ├── comments.controllers.js
│   ├── tags.controllers.js
│   └── postImage.controllers.js
├── middlewares/              # Validación y autorización
│   ├── validarUser.middleware.js
│   ├── validarPost.middleware.js
│   ├── validarComment.middleware.js
│   ├── validarTag.middlewares.js
│   └── validarPostImage.middlewares.js
├── models/                   # Modelos Sequelize
│   ├── index.js
│   ├── user.js
│   ├── post.js
│   ├── comment.js
│   ├── tag.js
│   ├── posttag.js
│   ├── post_image.js
│   └── follower.js
├── routes/                   # Definición de rutas
│   ├── users.routes.js
│   ├── posts.routes.js
│   ├── comments.routes.js
│   ├── tags.routes.js
│   └── postImage.routes.js
├── schemas/                  # Schemas de validación con Joi
│   ├── user.schema.js
│   ├── post.schema.js
│   ├── comment.schema.js
│   ├── tag.schemas.js
│   └── postImage.schema.js
├── seeders/                  # Datos de prueba
│   ├── 20260602000001-demo-users.js
│   ├── 20260602000002-demo-followers.js
│   ├── 20260608194818-demo-tags.js
│   ├── 20260609002209-demo-posts.js
│   ├── 20260609002504-demo-post_images.js
│   ├── 20260609003406-demo-posttags.js
│   └── 20260609010000-demo-comments.js
├── utils/
│   └── imagen.utils.js       # Utilidad para descargar imágenes por URL
├── images/                   # Imágenes descargadas localmente
├── swagger.yaml              # Documentación OpenAPI 3.0
├── api_postman_collection.json
└── .env.example              # Template de variables de entorno
```

---

## API Endpoints

### Usuarios

| Método   | Ruta               | Descripción                                | Middlewares                                                       |
| -------- | ------------------ | ------------------------------------------ | ----------------------------------------------------------------- |
| `POST`   | `/users`           | Crear usuario                              | `validarUsuario`, `validarNickname`                               |
| `GET`    | `/users`           | Listar usuarios (con conteo de seguidores) | -                                                                 |
| `GET`    | `/users/:id`       | Obtener usuario por ID                     | `validarUsuarioId`                                                |
| `PUT`    | `/users/:id`       | Actualizar usuario                         | `validarUsuarioId`, `validarActualizarUsuario`, `validarNickname` |
| `DELETE` | `/users/:id`       | Eliminar usuario                           | `validarUsuarioId`                                                |
| `GET`    | `/users/:id/posts` | Obtener posts del usuario                  | `validarUsuarioId`                                                |

### Seguidores

| Método   | Ruta                   | Descripción         | Middlewares                                                          |
| -------- | ---------------------- | ------------------- | -------------------------------------------------------------------- |
| `POST`   | `/users/:id/follow`    | Seguir a un usuario | `validarUsuarioId`, `validarSeguidorId`, `validarNoSeguirseASiMismo` |
| `DELETE` | `/users/:id/follow`    | Dejar de seguir     | `validarUsuarioId`, `validarSeguidorId`                              |
| `GET`    | `/users/:id/followers` | Obtener seguidores  | `validarUsuarioId`                                                   |
| `GET`    | `/users/:id/following` | Obtener seguidos    | `validarUsuarioId`                                                   |

### Posts

| Método   | Ruta                | Descripción                        | Middlewares                              |
| -------- | ------------------- | ---------------------------------- | ---------------------------------------- |
| `GET`    | `/posts`            | Ver todos los posts                | -                                        |
| `GET`    | `/posts/:id`        | Obtener un post por ID             | `validarPostId`                          |
| `GET`    | `/posts/:id/post`   | Obtener posts de un usuario por ID | `validarUsuarioId`                       |
| `GET`    | `/posts/tag/:tagId` | Ver posts filtrados por tag        | `validarTagId`                           |
| `POST`   | `/posts`            | Crear un post                      | `validarPost`, `validarUsuarioNickname`  |
| `PUT`    | `/posts/:id`        | Actualizar un post                 | `validarPostId`, `validarActualizarPost` |
| `DELETE` | `/posts/:id`        | Eliminar un post                   | `validarPostId`                          |

### PostImage

| Método   | Ruta               | Descripción              | Middlewares                              |
| -------- | ------------------ | ------------------------ | ---------------------------------------- |
| `GET`    | `/postImages`      | Listar postImages        | -                                        |
| `POST`   | `/postImages`      | Crear postImage          | `validarPostImage`                       |
| `POST`   | `/postImages/bulk` | Crear postImages (array) | `validarPostImageBulk`                   |
| `PUT`    | `/postImages/:id`  | Actualizar postImage     | `validarPostImageId`, `validarPostImage` |
| `DELETE` | `/postImages/:id`  | Eliminar postImage       | `validarPostImageId`                     |

### Comentarios

| Método   | Ruta                     | Descripción                                    | Middlewares                                |
| -------- | ------------------------ | ---------------------------------------------- | ------------------------------------------ |
| `GET`    | `/comments`              | Mostrar comentarios con antigüedad configurada | -                                          |
| `GET`    | `/comments/:id`          | Mostrar comentario por ID                      | `validarComentario`                        |
| `GET`    | `/comments/post/:postId` | Mostrar comentarios de un post                 | `validarPostId`, `validarComentario`       |
| `POST`   | `/comments`              | Crear nuevo comentario                         | `validarComentario`                        |
| `PUT`    | `/comments/:id`          | Actualizar comentario                          | `validarComentarioId`, `validarComentario` |
| `DELETE` | `/comments/:id`          | Eliminar comentario                            | `validarComentarioId`                      |

### Tags

| Método   | Ruta        | Descripción            | Middlewares                  |
| -------- | ----------- | ---------------------- | ---------------------------- |
| `GET`    | `/tags`     | Mostrar todos los tags | -                            |
| `POST`   | `/tags`     | Crear nuevo tag        | `validarTag`                 |
| `PUT`    | `/tags/:id` | Actualizar tag         | `validarTagId`, `validarTag` |
| `DELETE` | `/tags/:id` | Eliminar tag           | `validarTagId`               |

---

## Documentación Swagger

El archivo `swagger.yaml` contiene la especificación OpenAPI 3.0 completa de todos los endpoints. Podés visualizarlo pegando su contenido en [Swagger Editor](https://editor.swagger.io/) o usando herramientas como [Redoc](https://redocly.github.io/redoc/).

---

## Seeders (datos de prueba)

Los seeders se ejecutan en orden respetando las dependencias de claves foráneas:

1. **Usuarios** — 5 usuarios de ejemplo
2. **Seguidores** — Relaciones de seguimiento entre usuarios
3. **Tags** — Tags de ejemplo
4. **Posts** — Publicaciones asociadas a usuarios
5. **Post_Images** — Imágenes asociadas a posts
6. **PostTags** — Relación muchos a muchos entre posts y tags
7. **Comentarios** — Comentarios en posts

Ejecutar con:

```bash
npm run seed
```

---
