const { Router } = require('express');
const router = Router();
const tagsController = require("../controllers/tag.controllers")
const { validarTag, validarTagId } = require('../middlewares/validarTag.middlewares')

router.get("/", tagsController.obtenerTags);
router.post("/", validarTag, tagsController.crearTag);
router.put("/:id", validarTagId, validarTag, tagsController.actualizarTag);
router.delete("/:id", validarTagId, tagsController.eliminarTag);

module.exports = router;