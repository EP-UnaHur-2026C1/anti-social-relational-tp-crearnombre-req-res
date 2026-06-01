const {User} = require('../models');

const crearUsuario = async (req, res) => {
    try {
        const { nickname, nombre, apellido, fecha_nacimiento } = req.body;
        const usuario = await User.create({
            nickname,
            nombre,
            apellido,
            fecha_nacimiento
        });
        res.status(201).json(usuario);
    }   catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}


const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await User.findAll({
            attributes: ['nickname', 'nombre', 'apellido', 'fecha_nacimiento'],
            include: [
                {
                    model: User,
                    as: 'seguidores',
                    attributes: ['nickname']
                }
            ]
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

module.exports = {
    crearUsuario,
    obtenerUsuarios
}