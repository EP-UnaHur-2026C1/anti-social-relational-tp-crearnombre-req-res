const express = require('express');
const router = express.Router();

// Traemos las funciones que programamos recién en el controlador
const { createPost, getAllPosts, deletePost } = require('../controllers/posts.controllers');

// Definimos el camino para TRAER todos los posts (GET)
router.get('/', getAllPosts);

// Definimos el camino para CREAR un post (POST)
router.post('/', createPost);

// Definimos el camino para ELIMINAR un post por su ID (DELETE)
router.delete('/:id', deletePost);

// Exportamos el router para que lo use el archivo principal de la app (app.js)
module.exports = router;