const { Router } = require('express');
const commentController = require('../controllers/comments.controllers');
const { validarComentario, validarComentarioId, cargarComentario } = require('../middlewares/validarComment.middleware');
const { validarPostId } = require("../middlewares/validarPost.middleware");

const router = Router();


router.post('/', validarComentario, commentController.crearComentario);
router.get('/', commentController.obtenerComentarios);
router.get('/:id', validarComentarioId, cargarComentario, commentController.obtenerComentarioPorId);
router.delete('/:id', validarComentarioId, cargarComentario, commentController.deleteComentario);
router.put('/:id', validarComentarioId, validarComentario, cargarComentario, commentController.actualizarComentario);
router.get('/post/:postId', validarPostId, commentController.obtenerComentarioPorPostId);

module.exports = router;