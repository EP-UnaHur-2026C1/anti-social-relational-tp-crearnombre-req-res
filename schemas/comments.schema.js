const Joi = require("joi");

const comentarioSchema = Joi.object({
    descripcion: Joi.string().min(1).max(500).trim().required().messages({
        "string.base": "La descripción debe ser texto",
        "string.empty": "La descripción no puede estar vacía",
        "string.min": "La descripción debe tener al menos 1 caracter",
        "string.max": "La descripción debe tener como máximo 500 caracteres",
        "any.required": "La descripción es obligatoria",
    }),
    userId: Joi.number().integer().positive().required().messages({
        "number.base": "El userId debe ser un número",
        "number.integer": "El userId debe ser un número entero",
        "number.positive": "El userId debe ser un número positivo",
        "any.required": "El userId es obligatorio",
    }),
    postId: Joi.number().integer().positive().required().messages({
        "number.base": "El postId debe ser un número",
        "number.integer": "El postId debe ser un número entero",
        "number.positive": "El postId debe ser un número positivo",
        "any.required": "El postId es obligatorio",
    }),
});

module.exports = comentarioSchema;