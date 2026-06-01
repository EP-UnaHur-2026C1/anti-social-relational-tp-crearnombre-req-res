const {Router} = require('express');
const userController = require('../controllers/users.controllers');
const router = Router();

router.post('/', userController.crearUsuario);
router.get('/', userController.obtenerUsuarios);

module.exports = router;
