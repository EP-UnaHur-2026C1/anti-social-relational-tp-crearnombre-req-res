// Traemos los modelos para poder hablar con la Base de Datos
const { Post, User, Post_Image, Tag, Comment } = require("../models");
const { Op } = require("sequelize");

// 1. FUNCIÓN PARA CREAR UN POST (POST /posts)
const createPost = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const usuarioEncontrado = req.usuario;

    // Ahora que tenemos el usuario real, usamos su ID numérico verdadero (usuarioEncontrado.id)
    const nuevoPost = await Post.create({
      descripcion: descripcion,
      fecha: new Date(),
      userId: usuarioEncontrado.id,
    });

    return res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Hubo un error al crear el post.",
      error: error.message,
    });
  }
};

// FUNCIÓN PARA TRAER TODOS LOS POSTS (GET /posts)
const getAllPosts = async (req, res) => {
  try {
    // REQUERIMIENTO ESPECIAL: Filtrar comentarios de más de X meses
    // Leemos la variable de entorno o usamos 6 meses por defecto
    const mesesLimite = process.env.COMENTARIOS_LIMITE_MESES || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

    // Buscamos todos los posts en la BDD
    const posts = await Post.findAll({
      // Le pedimos a Sequelize que traiga el Post "incluyendo" sus relaciones (Eager Loading)
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nickname", "nombre", "apellido"], // Solo traemos datos públicos
        },
        {
          model: Post_Image,
          as: "images",
          attributes: ["url"], // Trae las fotos asociadas
        },
        {
          model: Tag,
          as: "tags",
          through: { attributes: [] }, // Limpia los datos feos de la tabla intermedia
        },
        {
          model: Comment,
          as: "comments",
          where: {
            fecha: {
              [Op.gte]: fechaLimite, // Condición: fecha del comentario >= fecha limite
              visible: true, // Solo comentarios visibles
            },
          },
          required: false, // LEFT JOIN: Si el post no tiene comentarios, lo trae igual
        },
      ],
      order: [["createdAt", "DESC"]], // Mostramos los más nuevos primero
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Hubo un error al obtener los posts." });
  }
};

const obtenerPostByTag = async (req, res) => {
  try {
    const mesesLimite = process.env.COMENTARIOS_LIMITE_MESES || 6;
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);
    const { nombre } = req.tag;
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["nickname", "nombre", "apellido"], // Solo traemos datos públicos
        },
        {
          model: Post_Image,
          as: "images",
          attributes: ["url"], // Trae las fotos asociadas
        },
        {
          model: Tag,
          as: "tags",
          where: { id: req.tag.id }, // Filtra por el tag específico
          through: { attributes: [] }, // Limpia los datos feos de la tabla intermedia
        },
        {
          model: Comment,
          as: "comments",
          where: {
            fecha: {
              [Op.gte]: fechaLimite, // Condición: fecha del comentario >= fecha limite
              visible: true, // Solo comentarios visibles
            },
          },
          required: false, // LEFT JOIN: Si el post no tiene comentarios, lo trae igual
        },
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Hubo un error al obtener los posts." });
  }
};

const obtenerPostId = async (req, res) => {
  try {
    const post = req.post;
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = req.post;
    const { descripcion } = req.body;
    await post.update({
      descripcion,
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params; // Captura el ID de la URL

    const cantidadBorrados = await Post.destroy({
      where: { id: id },
    });

    if (cantidadBorrados === 0) {
      return res.status(404).json({
        message: "No se encontró la publicación que querés eliminar.",
      });
    }

    return res
      .status(200)
      .json({ message: "Publicación eliminada con éxito." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Hubo un error al eliminar la publicación." });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  obtenerPostId,
  deletePost,
  updatePost,
  obtenerPostByTag,
};
