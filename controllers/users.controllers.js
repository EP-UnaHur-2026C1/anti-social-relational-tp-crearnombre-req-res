const {
  User,
  Post,
  Post_Image,
  Tag,
  Comment,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

const crearUsuario = async (req, res) => {
  try {
    const { nickname, nombre, apellido, fecha_nacimiento } = req.body;
    const usuario = await User.create({
      nickname,
      nombre,
      apellido,
      fecha_nacimiento,
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: [
        "id",
        "nickname",
        "nombre",
        "apellido",
        "fecha_nacimiento",
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM Followers WHERE Followers.seguidoId = User.id)`,
          ),
          "seguidoresCount",
        ],
      ],
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerUsuarioId = async (req, res) => {
  try {
    const usuario = req.usuario;
    const seguidoresCount = await usuario.countSeguidor();

    res.status(200).json({
      id: usuario.id,
      nickname: usuario.nickname,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fecha_nacimiento: usuario.fecha_nacimiento,
      seguidoresCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, nombre, apellido, fecha_nacimiento } = req.body;
    const usuario = req.usuario;
    await usuario.update({
      nickname,
      nombre,
      apellido,
      fecha_nacimiento,
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.usuario;
    await usuario.destroy();
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

const seguirUsuario = async (req, res) => {
  try {
    const seguidor = req.seguidor;
    const usuario = req.usuario;
    await usuario.addSeguidor(seguidor);
    res.status(200).json({ message: "Usuario seguido" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al seguir el usuario" });
  }
};

const dejarDeSeguirUsuario = async (req, res) => {
  try {
    const seguidor = req.seguidor;
    const usuario = req.usuario;
    await usuario.removeSeguidor(seguidor);
    res.status(200).json({ message: "Usuario dejado de seguir" });
  } catch (error) {
    res.status(500).json({ error: "Error al dejar de seguir el usuario" });
  }
};

const obtenerSeguidores = async (req, res) => {
  try {
    const usuario = req.usuario;
    const seguidores = await usuario.getSeguidor({
      joinTableAttributes: [],
      attributes: ["nickname"],
    });
    res.status(200).json(seguidores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los seguidores" });
  }
};

const obtenerSeguidos = async (req, res) => {
  try {
    const usuario = req.usuario;
    const seguidos = await usuario.getSeguidos({
      joinTableAttributes: [],
      attributes: ["nickname"],
    });
    res.status(200).json(seguidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los seguidos" });
  }
};

const obtenerPublicaciones = async (req, res) => {
  try {
    const mesesLimite = process.env.COMENTARIOS_LIMITE_MESES || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

    const usuario = req.usuario;
    const publicaciones = await usuario.getPosts({
      attributes: ["id", "descripcion", "fecha"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nickname"],
        },
        {
          model: Post_Image,
          as: "images",
          attributes: ["url"],
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] },
        },
        {
          model: Comment,
          as: "comments",
          where: {
            createdAt: { [Op.gte]: fechaLimite },
          },
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioId,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario,
  dejarDeSeguirUsuario,
  obtenerSeguidores,
  obtenerSeguidos,
  obtenerPublicaciones,
};
