'use strict'

const Proyectos = require('../models/Proyectos.js');
const Tareas = require('../models/Tareas');

exports.proyectHome = async (req, resp) => {

    const usuarioId = resp.locals.usuario.id;

    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    });

    resp.render('index', {
        nombrePagina: 'UpTask - Proyectos',
        proyectos
    });
};

exports.proyectNuevoProyecto = async (req, resp) => {

    const usuarioId = resp.locals.usuario.id;

    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    });

    resp.render('nuevo-proyecto', {
        nombrePagina: 'UpTask - Nuevo Proyecto',
        proyectos
    });
};

exports.proyectGuardarNuevoProyecto = async (req, resp) => {

    const usuarioId = resp.locals.usuario.id;

    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    });

    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al Proyecto' });
    };

    if (errores.length > 0) {
        resp.render('nuevo-proyecto', {
            nombrePagina: 'UpTask - Nuevo Proyecto',
            errores,
            proyectos
        });
    } else {
        const usuarioId = resp.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId });
        resp.redirect('/');
    };
};

exports.proyectoPorUrl = async (req, resp, next) => {

    const usuarioId = resp.locals.usuario.id;

    const proyectosPromise = Proyectos.findAll({
        where: {
            usuarioId
        }
    });

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        }
    });

    if (!proyecto) return next();

    resp.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
};

exports.formularioEditar = async (req, resp) => {

    const usuarioId = resp.locals.usuario.id;

    const proyectosPromise = Proyectos.findAll({
        where: {
            usuarioId
        }
    });

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    resp.render('nuevo-proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
};

exports.actualizarProyecto = async (req, resp) => {

    const usuarioId = resp.locals.usuario.id;

    const proyectos = await Proyectos.findAll({
        where: {
            usuarioId
        }
    });

    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al Proyecto' });
    };

    if (errores.length > 0) {
        resp.render('nuevo-proyecto', {
            nombrePagina: 'UpTask - Nuevo Proyecto',
            errores,
            proyectos
        });
    } else {
        Proyectos.update(
            { nombre: nombre },
            { where: { id: req.params.id } });
        resp.redirect('/');
    };
};

exports.eliminarProyecto = async (req, resp, next) => {

    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    !resultado && next();

    resp.status(200).send('Proyecto eliminado correctamente');
};