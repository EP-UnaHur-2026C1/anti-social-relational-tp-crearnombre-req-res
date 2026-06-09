const Joi = require("joi");

postsSchema = Joi.object({
  descripcion: Joi.string().min(10).max(500).required().messages({
    "string.base": "La descripción debe ser texto",
    "string.empty": "La descripción es obligatoria",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción debe tener hasta 500 caracteres",
    "any.required": "La descripción es obligatoria",
  }),
  userNickname: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nickname del usuario debe ser texto",
    "string.min": "El nickname del usuario debe tener al menos 3 caracteres",
    "string.max": "El nickname del usuario debe tener hasta 100 caracteres",
    "any.required": "El nickname del usuario es obligatorio",
  }),
});

actualizarPostsSchema = Joi.object({
  descripcion: Joi.string().min(10).max(500).messages({
    "string.base": "La descripción debe ser texto",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción debe tener hasta 500 caracteres",
  }),
  userNickname: Joi.string().min(3).max(100).messages({
    "string.base": "El nickname del usuario debe ser texto",
    "string.min": "El nickname del usuario debe tener al menos 3 caracteres",
    "string.max": "El nickname del usuario debe tener hasta 100 caracteres",
  }),
});

module.exports = {
  postsSchema,
  actualizarPostsSchema,
};
