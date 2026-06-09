const { Post, User, Post_Image, Tag, Comment } = require("../models");
const {
  postsSchema,
  actualizarPostsSchema,
} = require("../schemas/posts.schema");
const { Op } = require("sequelize");

const validarPost = (req, res, next) => {
  const { error } = postsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarActualizarPost = (req, res, next) => {
  const { error } = actualizarPostsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarPostId = async (req, res, next) => {
  const { id } = req.params;
  const mesesLimite = process.env.COMENTARIOS_LIMITE_MESES || 6;
  const fechaLimite = new Date();
  fechaLimite.setMonth(fechaLimite.getMonth() - mesesLimite);

  const post = await Post.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["nickname", "nombre", "apellido"],
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
          createdAt: {
            [Op.gte]: fechaLimite,
          },
        },
        required: false,
      },
    ],
  });

  if (!post) {
    return res.status(404).json({ error: "Post no encontrado" });
  }
  req.post = post;
  next();
};

module.exports = {
  validarPost,
  validarPostId,
  validarActualizarPost,
};
