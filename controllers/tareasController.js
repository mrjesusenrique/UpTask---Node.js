'use strict'

const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, resp, next) => {

    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });
    const { tarea } = req.body;

    const estado = 0;
    const proyectoId = proyecto.id;

    const resultado = await Tareas.create({ tarea, estado, proyectoId })

    !resultado && next();

    resp.redirect(`/proyectos/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, resp, next) => {

    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id } });

    let estado = 0;

    if (tarea.estado === estado) {
        estado = 1;
    };

    tarea.estado = estado;

    const resultado = await tarea.save();

    !resultado && next();

    resp.status(200).send('Tarea actualizada');
};

exports.eliminarTarea = async (req, resp) => {

    const { id } = req.params;

    const resultado = await Tareas.destroy({ where: { id } });

    !resultado && next();

    resp.send('Tarea eliminada correctamente');
};