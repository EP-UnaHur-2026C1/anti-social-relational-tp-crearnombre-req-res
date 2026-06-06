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

| Método | Ruta | Descripción | Middlewares |
|---|---|---|---|
| `POST` | `/users` | Crear usuario | `validarUsuario`, `validarNickname` |
| `GET` | `/users` | Listar usuarios (con conteo de seguidores) | - |
| `PUT` | `/users/:id` | Actualizar usuario | `validarUsuarioId`, `validarActualizarUsuario`, `validarNickname` |
| `DELETE` | `/users/:id` | Eliminar usuario | `validarUsuarioId` |

### Seguidores

| Método | Ruta | Descripción | Middlewares |
|---|---|---|---|
| `POST` | `/users/:id/follow` | Seguir a un usuario | `validarUsuarioId`, `validarSeguidorId`, `validarNoSeguirseASiMismo` |
| `DELETE` | `/users/:id/follow` | Dejar de seguir | `validarUsuarioId`, `validarSeguidorId` |
| `GET` | `/users/:id/followers` | Obtener seguidores | `validarUsuarioId` |
| `GET` | `/users/:id/following` | Obtener seguidos | `validarUsuarioId` |

### Posts

| Método | Ruta | Descripción | Middlewares |
|---|---|---|---|
| `GET` | `/users/:id/posts` | Ver posts de un usuario | `validarUsuarioId` |


### PostImage

| Método | Ruta | Descripción | Middlewares |
|---|---|---|---|
| `POST` | `/postImages` | Crear postImage | `validarPostImage` |
| `POST` | `/postImages/bulk`| Crear postImages (array) | `validarPostImageBulk` |
| `GET` | `/postImages` | Listar postImages  | - |
| `PUT` | `/postImages/:id` | Actualizar postImage | `validarPostImageId`, `validarPostImage` |
| `DELETE` | `/postImages/:id` | Eliminar postImage | `validarPostImageId` |
