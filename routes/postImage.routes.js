const { Router } = require('express');
const postImageController = require('../controllers/postImage.controllers');
const { validarPostImage, obtenerPostImagePorId } = require('../middlewares/validarPostImage.middleware');

const router = Router();

router.get('/', postImageController.obtenerPostImagens);

router.post('/', validarPostImage, postImageController.crearPostImagen);
router.post('/bulk', postImageController.crearPostImagens);
router.delete('/:id', obtenerPostImagePorId, postImageController.eliminarPostImage);
router.put('/:id', obtenerPostImagePorId, validarPostImage, postImageController.actualizarPostImage);



module.exports = router;


