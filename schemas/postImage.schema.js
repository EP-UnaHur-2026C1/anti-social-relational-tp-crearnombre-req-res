const Joi = require('joi');


const schemaPost = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const schemaPostImage = Joi.object({
    postId: Joi.number().integer().positive().required(),
    URL: Joi.string()
        .uri()
        .required()
        .messages({
            'string.base': 'La URL debe ser una cadena de texto',
            'string.uri': 'La URL debe ser una URL válida',
            'any.required': 'La URL es un campo obligatorio'
    })
});

module.exports = schemaPostImage;