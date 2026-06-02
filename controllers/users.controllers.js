const { User, sequelize } = require("../models");

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

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario,
  dejarDeSeguirUsuario,
  obtenerSeguidores,
  obtenerSeguidos,
};
