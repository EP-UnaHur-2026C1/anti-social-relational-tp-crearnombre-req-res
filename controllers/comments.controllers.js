const { Comment, User, Post } = require("../models");
const { Op } = require("sequelize");

const crearComentario = async (req, res) => {
  try {
    const { descripcion, userId, postId } = req.body;

    const usuario = await User.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    const comentario = await Comment.create({
      descripcion,
      visible: true,
      fecha: new Date(),
      userId,
      postId,
    });

    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el comentario" });
  }
};

const actualizarComentario = async (req, res) => {
  try {
    const { descripcion, userId, postId } = req.body;

    const comentario = req.comentario;
    const usuario = await User.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    await comentario.update({
      descripcion,
      userId,
      postId,
    });

    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
};

const obtenerComentarios = async (req, res) => {
  try {
    // Filtrar comentarios por fecha, mostrando solo los que son visibles y no son anteriores a la fecha límite
    const meses = parseInt(process.env.COMENTARIOS_LIMITE_MESES) || 6; //Trae los Meses desde el .env, si no esta definido, por defecto se usan 6 meses
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - meses);

    const comentarios = await Comment.findAll({
      where: {
        fecha: {
          [Op.gte]: fechaLimite,
        },
        visible: true,
      },
      attributes: ["id", "descripcion", "visible", "fecha"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nickname"],
        },
        {
          model: Post,
          as: "post",
          attributes: ["id", "descripcion"],
        },
      ],
    });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

const obtenerComentarioPorPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const meses = parseInt(process.env.COMENTARIOS_LIMITE_MESES) || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - meses);

    const comentarios = await Comment.findAll({
      where: {
        postId,
        fecha: { [Op.gte]: fechaLimite },
        visible: true,
      },
      attributes: ["id", "descripcion", "visible", "fecha"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nickname"],
        },
      ],
    });

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los comentarios por postId" });
  }
};

const obtenerComentarioPorId = async (req, res) => {
  try {
    const comentario = req.comentario;
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el comentario",
    });
  }
};

const deleteComentario = async (req, res) => {
  try {
    await req.comentario.destroy();

    res.status(200).json({
      message: "Comentario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el comentario",
    });
  }
};

module.exports = {
  crearComentario,
  actualizarComentario,
  obtenerComentarios,
  obtenerComentarioPorId,
  deleteComentario,
  obtenerComentarioPorPostId
};
