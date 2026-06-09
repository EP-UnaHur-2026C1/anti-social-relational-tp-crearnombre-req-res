const tagsSchema = require("../schemas/tags.schema");
const { Tag } = require("../models");

const validarTag = (req, res, next) => {
  const { error } = tagsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validarTagId = async (req, res, next) => {
  try {
    const { tagId } = req.params;
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag no encontrado" });
    }
    req.tag = tag;
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tag" });
  }
  next();
};

module.exports = {
  validarTag,
  validarTagId,
};
