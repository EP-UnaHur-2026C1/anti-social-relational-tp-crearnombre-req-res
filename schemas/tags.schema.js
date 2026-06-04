const Joi = require('joi')

const tagsSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "El nombre debe ser texto",
            "string.empty": "El nombre es obligatorio",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "string.max": "El nombre debe tener hasta 50 caracteres",
            "any.required": "El nombre es obligatorio"
        })
})

module.exports = tagsSchema