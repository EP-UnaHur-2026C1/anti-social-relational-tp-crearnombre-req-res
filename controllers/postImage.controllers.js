const {Post_Image,Post} = require('../models');

const obtenerPostImagenes = async (req, res) => {
    try {
        const postImagenes = await Post_Image.findAll({
            attributes: ['URL'],
            include:{
                model: Post,
                as: 'post',
                attributes: ['descripcion', 'fecha']
            }
        });
        res.status(200).json(postImagenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearPostImagen = async (req, res) => {
    try {
        const { URL, postId } = req.body;
        const postImagen = await Post_Image.create({ URL, postId });
        res.status(201).json(postImagen);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la imagen del post' });
    }
};

const crearPostImagens = async (req, res) => {
    try {
        const postImagens = req.body;
        const postImagensFormateados = postImagens.map((postImagen) => ({
            URL: postImagen.URL,
            postId: postImagen.postId
        }));
        const postImagensCreados = await Post_Image.bulkCreate(postImagensFormateados);
        res.status(201).json(postImagensCreados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerPostImagenes,
    crearPostImagen,
    crearPostImagens
};