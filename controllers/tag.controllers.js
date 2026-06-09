const { Tag, Post } = require('../models');
const { message } = require('../schemas/tags.schema');

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            attributes: ["nombre"]
        });
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ messege: "Error al obtener los tags" });
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
};

const actualizarTag = async (req, res) => {
    try {
        const nombre = req.body.nombre;
        const tag = req.tag;
        await tag.update({
            nombre,
        });
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarTag = async (req, res) => {
    try {
        const tag = req.tag;
        await tag.destroy();
        res.status(200).json({ message: "Tag eliminado con exito" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    obtenerTags,
    crearTag,
    actualizarTag,
    eliminarTag
}