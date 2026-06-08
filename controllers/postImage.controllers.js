const { Post_Image, Post } = require('../models');
const { descargarImagen } = require('../utils/imagen.utils');


const obtenerPostImagens = async (req, res) => {
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
        const { URL: imageUrl, postId } = req.body;
        let urlToSave = imageUrl;
        try {
            const filename = await descargarImagen(imageUrl);
            urlToSave = `/images/${filename}`;
        } catch (_) {
            
        }
        const postImagen = await Post_Image.create({ URL: urlToSave, postId });
        res.status(201).json(postImagen);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la imagen del post' });
    }
};


const crearPostImagens = async (req, res) => {
    try {
        const postImagens = req.body;
        const postImagensFormateados = await Promise.all(
            postImagens.map(async (postImagen) => {
                let urlToSave = postImagen.URL;
                try {
                    const filename = await descargarImagen(postImagen.URL);
                    urlToSave = `/images/${filename}`;
                } catch (_) {}
                return { URL: urlToSave, postId: postImagen.postId };
            })
        );
        const postImagensCreados = await Post_Image.bulkCreate(postImagensFormateados);
        res.status(201).json(postImagensCreados);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear las imágenes del post' });
    }
};





const eliminarPostImage = async (req, res) => {
    try {
        const { id } = req.params;
        const postImage = req.postImage;
        await postImage.destroy();
        res.status(200).json({ message: 'Imagen del post eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const actualizarPostImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { URL, postId } = req.body;
        const postImage = req.postImage;
        await postImage.update({ URL, postId });
        res.status(200).json(postImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    obtenerPostImagens,
    crearPostImagen,
    crearPostImagens,
    eliminarPostImage,
    actualizarPostImage
};
