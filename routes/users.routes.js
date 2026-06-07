const { Router } = require("express");
const userController = require("../controllers/users.controllers");
const {
  validarUsuario,
  validarUsuarioId,
  validarActualizarUsuario,
  validarSeguidorId,
  validarNickname,
  validarNoSeguirseASiMismo,
  obtenerPublicaciones,
} = require("../middlewares/validarUser.middleware");
const router = Router();

router.post("/", validarUsuario, validarNickname, userController.crearUsuario);
router.get("/", userController.obtenerUsuarios);
router.get("/:id", validarUsuarioId, userController.obtenerUsuarioId);
router.put(
  "/:id",
  validarUsuarioId,
  validarActualizarUsuario,
  validarNickname,
  userController.actualizarUsuario,
);
router.delete("/:id", validarUsuarioId, userController.eliminarUsuario);

/* RUTAS DE SEGUIDORES */
router.post(
  "/:id/follow",
  validarUsuarioId,
  validarSeguidorId,
  validarNoSeguirseASiMismo,
  userController.seguirUsuario,
);
router.delete(
  "/:id/follow",
  validarUsuarioId,
  validarSeguidorId,
  userController.dejarDeSeguirUsuario,
);
router.get(
  "/:id/followers",
  validarUsuarioId,
  userController.obtenerSeguidores,
);
router.get("/:id/following", validarUsuarioId, userController.obtenerSeguidos);

/* RUTAS DE PUBLICACIONES */
router.get("/:id/posts", validarUsuarioId, userController.obtenerPublicaciones);

module.exports = router;
