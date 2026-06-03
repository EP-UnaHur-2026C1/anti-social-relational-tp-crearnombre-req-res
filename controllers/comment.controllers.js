const { Comment, User, Post } = require('../models');

const crearComentario = async (req, res) => {
    try {
        const { descripcion, userId, postId } = req.body;

        const usuario = await User.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        const comentario = await Comment.create({
            descripcion,
            visible: true,
            fecha: new Date(),
            userId,
            postId
        });

        res.status(201).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
}

const actualizarComentario = async (req, res) => {
    try {
        const { descripcion, userId, postId } = req.body;

        const comentario = req.comentario;
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        await comentario.update({
            descripcion,
            userId,
            postId
        });

        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el comentario' });
    }

}

const obtenerComentarios = async (req, res) => {

    try {
        const comentarios = await Comment.findAll({
            where: {
                visible: true
            },
            attributes: ['descripcion', 'visible', 'fecha'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['nickname']
                }, {
                    model: Post,
                    as: 'post',
                    attributes: ['id', 'descripcion']
                }
            ]
        });
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
}


const obtenerComentarioPorId = async (req, res) => {
    try {

        res.status(200).json(req.comentario);
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener el comentario'
        });
    }
};

const deleteComentario = async (req, res) => {
    try {
        await req.comentario.destroy();

        res.status(200).json({
            message: 'Comentario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el comentario'
        });
    }
};

module.exports = {
    crearComentario,
    actualizarComentario,
    obtenerComentarios,
    obtenerComentarioPorId,
    deleteComentario
};