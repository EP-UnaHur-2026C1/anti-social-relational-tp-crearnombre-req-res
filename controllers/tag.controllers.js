const { Tag, Post } = require('../models')

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            attributes: ["nombre"]
        });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({messege: "Error al obtener los tags"});
    }
};

const crearTag = async (req, res) => {
    try {
        const { nombre } = req.body;
        const tag = await Tag.create({
            nombre
        });
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ messege: "Error al crear el tag", })
    }
}

module.exports = {
    obtenerTags,
    crearTag
}