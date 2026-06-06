const schemaPostImage = require('../schemas/postImage.schema');
const { Post_Image } = require('../models');

const validarPostImage = (req, res, next) => {
    const {error} = schemaPostImage.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validarPostImageId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const postImage = await Post_Image.findByPk(id);
        if (!postImage) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }   
        req.postImage = postImage;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la imagen del post' });
    }
};


const validarPostImageBulk = (req, res, next) => {
    if (!Array.isArray(req.body) || req.body.length === 0) { 
        return res.status(400).json({ error: 'Se esperaba un array con al menos una imagen' });
    }
    for (const item of req.body) {
        const { error } = schemaPostImage.validate(item);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    }
    next();
};




module.exports = {
    validarPostImage,
    validarPostImageId,
    validarPostImageBulk
};