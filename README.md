# Anti-Social Relational

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor (crea la DB automáticamente)
npm run dev

# 3. (Opcional) Cargar datos de prueba
npm run seed
```

## Endpoints

### Usuarios

| Método   | Ruta               | Descripción                                | Middlewares                                                       |
| -------- | ------------------ | ------------------------------------------ | ----------------------------------------------------------------- |
| `POST`   | `/users`           | Crear usuario                              | `validarUsuario`, `validarNickname`                               |
| `GET`    | `/users`           | Listar usuarios (con conteo de seguidores) | -                                                                 |
| `GET`    | `/users/:nickname` | Listar usuario con nickname pedido         | `validarNickname`                                                 |
| `PUT`    | `/users/:id`       | Actualizar usuario                         | `validarUsuarioId`, `validarActualizarUsuario`, `validarNickname` |
| `DELETE` | `/users/:id`       | Eliminar usuario                           | `validarUsuarioId`                                                |

### Seguidores

| Método   | Ruta                   | Descripción         | Middlewares                                                          |
| -------- | ---------------------- | ------------------- | -------------------------------------------------------------------- |
| `POST`   | `/users/:id/follow`    | Seguir a un usuario | `validarUsuarioId`, `validarSeguidorId`, `validarNoSeguirseASiMismo` |
| `DELETE` | `/users/:id/follow`    | Dejar de seguir     | `validarUsuarioId`, `validarSeguidorId`                              |
| `GET`    | `/users/:id/followers` | Obtener seguidores  | `validarUsuarioId`                                                   |
| `GET`    | `/users/:id/following` | Obtener seguidos    | `validarUsuarioId`                                                   |

### Posts

| Método  | Ruta            | Descripción                       | Middlewares        |
| ------- | -------------   | -----------------------           | ------------------ |
| `GET`   | `/posts/:id`    | Ver todos los posts de un usuario | `validarPostId`,`obtenerPostId` |
| `GET`   | `/posts`        | Ver todos los posts               | -                               |
| `GET`   | `/posts/:idTag` | Ver todos los posts de un tag     | `validarTagId`                  |
| `POST`  | `/posts`        | Crea un post                      | -                               |
| `DELETE`| `/posts/:id`    | Elimina el post indicado          | `validarPostId`                 |
| `PUT`   | `/posts/:id`    | Actualiza el post indicado        | `validarPostId`                 |


### PostImage

| Método   | Ruta               | Descripción              | Middlewares                              |
| -------- | ------------------ | ------------------------ | ---------------------------------------- |
| `POST`   | `/postImages`      | Crear postImage          | `validarPostImage`                       |
| `POST`   | `/postImages/bulk` | Crear postImages (array) | `validarPostImageBulk`                   |
| `GET`    | `/postImages`      | Listar postImages        | -                                        |
| `PUT`    | `/postImages/:id`  | Actualizar postImage     | `validarPostImageId`, `validarPostImage` |
| `DELETE` | `/postImages/:id`  | Eliminar postImage       | `validarPostImageId`                     |


### Comentarios

| Método   | Ruta                     | Descripción                                    | Middlewares                                |
| -------- | ------------------------ | ---------------------------------------------- | ------------------------------------------ |
| `POST`   | `/comments`              | Crear nuevo comentario                         | `validarComentario`                        |
| `GET`    | `/comments`              | Mostrar comentarios con antigüedad configurada | -                                          |
| `GET`    | `/comments/:id`          | Mostrar el comentario con la id pedida         | `validarComentario`                        |
| `GET`    | `/comments/post/:postId` | Mostrar los comentarios asociados a postId     | `validarPostId`, `validarComentario`       |
| `PUT`    | `/comments/:id`          | Actualizar comentario                          | `validarComentarioId`, `validarComentario` |
| `DELETE` | `/comments/:id`          | Eliminar usuario                               |


### Tags

| Método    | Ruta        | Descripción                      | Middlewares                 |
| --------- | ----------- | ---------------------------------| --------------------------- |
| `POST`    | `/tags`     | Crear nuevo tag                  | `validarTag`                |
| `GET`     | `/tags`     | Mostrar todos los tags           | -                           |
| `PUT`     | `/tags/:id` | Actualiza el tag con id :id      | `validarTagId`, `validarTag`|
| `DELETE`  | `/tags/:id` | Elimina el tag con id :id        | `validarTagId`              |
