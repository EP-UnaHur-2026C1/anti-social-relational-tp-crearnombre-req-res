const { Router } = require('express');
const postImageController = require('../controllers/postImage.controllers');
const { validarPostImage, validarPostImageId,validarPostImageBulk } = require('../middlewares/validarPostImage.middleware');

const router = Router();

router.get('/', postImageController.obtenerPostImagens);
router.post('/', validarPostImage, postImageController.crearPostImagen);
router.post('/bulk', validarPostImageBulk, postImageController.crearPostImagens);
router.delete('/:id', validarPostImageId, postImageController.eliminarPostImage);
router.put('/:id', validarPostImageId, validarPostImage, postImageController.actualizarPostImage);



module.exports = router;


