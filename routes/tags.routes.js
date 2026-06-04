const { Router } = require('express');
const router = Router();
const tagsController = require("../controllers/tag.controllers")
const validarTag = require('../middlewares/validarTag.middlewares')

router.get("/", tagsController.obtenerTags);
router.post("/", validarTag, tagsController.crearTag);

module.exports = router;