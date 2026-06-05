const { Comment, User, Post } = require('../models');
const comentarioSchema = require('../schemas/comments.schema');

const validarComentario = (req, res, next) => {
    const { error } = comentarioSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

const validarComentarioId = (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id) || Number(id) <= 0) {
        return res.status(400).json({
            error: 'Id inválido'
        });
    }

    next();
};


const cargarComentario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const comentario = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'nickname']
                },
                {
                    model: Post,
                    as: 'post',
                    attributes: ['id', 'descripcion']
                }
            ]
        });

        if (!comentario) {
            return res.status(404).json({
                error: 'Comentario no encontrado'
            });
        }
        
        
        const meses = parseInt(process.env.COMENTARIOS_LIMITE_MESES) || 6; //Trae los Meses desde el .env, si no esta definido, por defecto se usan 6 meses
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - meses);

        if (comentario.visible === false || comentario.fecha < fechaLimite) {
            return res.status(404).json({
                error: 'Comentario no encontrado o no disponible'
            });
        }

        req.comentario = comentario;
        next();

    } catch (error) {
        return res.status(500).json({
            error: 'Error al cargar el comentario'
        });
    }
};

module.exports = {
    validarComentario,
    validarComentarioId,
    cargarComentario
};