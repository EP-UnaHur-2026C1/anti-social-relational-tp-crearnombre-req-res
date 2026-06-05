const { Router } = require('express');
const postImageController = require('../controllers/postImage.controllers');

const router = Router();

router.get('/', postImageController.obtenerPostImagenes);

router.post('/', postImageController.crearPostImagen);
router.post('/bulk', postImageController.crearPostImagens);


module.exports = router;


