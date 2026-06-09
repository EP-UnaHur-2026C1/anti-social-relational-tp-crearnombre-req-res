const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");
const postController = require("../controllers/posts.controllers");
const { validarPostId } = require("../middlewares/validarPost.middleware");
const { validarTagId } = require("../middlewares/validarTag.middlewares");

// Traemos las funciones que programamos recién en el controlador
const {
  createPost,
  getAllPosts,
  obtenerPostId,
  deletePost,
  updatePost,
  obtenerPostByTag,
} = require("../controllers/posts.controllers");

// Definimos el camino para TRAER todos los posts (GET)
router.get("/", postController.getAllPosts);

router.get("/:id", validarPostId, postController.obtenerPostId);

// Definimos el camino para CREAR un post (POST)
router.post("/", postController.createPost);

// Definimos el camino para ELIMINAR un post por su ID (DELETE)
router.delete("/:id", validarPostId, postController.deletePost);

router.get("/tag/:tagId", validarTagId, postController.obtenerPostByTag);

// Definimos el camino para ACTUALIZAR un post por su ID (PUT)
router.put("/:id", validarPostId, postController.updatePost);

// Exportamos el router para que lo use el archivo principal de la app (app.js)
module.exports = router;