const tagsSchema = require('../schemas/tags.schema')

const validarTag = (req, res, next) => {
    const { error } = tagsSchema.validate(req.body)
    if(error) {
        return res.status(400).json({ error: error.details[0].message})
    }
    next()
}

module.exports = validarTag