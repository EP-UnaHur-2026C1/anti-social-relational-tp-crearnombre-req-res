const { Router } = require('express');
const postImageController = require('../controllers/postImage.controllers');
const { validarPostImage, obtenerPostImagenPorId } = require('../middlewares/validarPostImage.middleware');

const router = Router();

router.get('/', postImageController.obtenerPostImagenes);

router.post('/', validarPostImage, postImageController.crearPostImagen);
router.post('/bulk', postImageController.crearPostImagens);
router.delete('/:id', obtenerPostImagenPorId, postImageController.eliminarPostImagen);
router.put('/:id', obtenerPostImagenPorId, validarPostImage, postImageController.actualizarPostImagen);



module.exports = router;


