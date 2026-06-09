const Joi = require('joi')

postsSchema = Joi.object({
    descripcion: Joi.string().min(10).max(500).required().messages({
        "string.base": "La descripción debe ser texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción debe tener hasta 500 caracteres",
        "any.required": "La descripción es obligatoria"
    }),
    imagen: Joi.string().uri().messages({
        "string.base": "La imagen debe ser una URL",
        "string.uri": "La imagen debe ser una URL válida"
    }),
    tags: Joi.array().items(Joi.string().min(3).max(50).messages({
        "string.base": "Cada etiqueta debe ser texto",
        "string.empty": "Las etiquetas no pueden estar vacías",
        "string.min": "Cada etiqueta debe tener al menos 3 caracteres",
        "string.max": "Cada etiqueta debe tener hasta 50 caracteres"
    })),
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "El userId debe ser un número",
        "number.integer": "El userId debe ser un número entero",
        "number.positive": "El userId debe ser un número positivo",
        "any.required": "El userId es obligatorio"
    })

});

module.exports = postsSchema;