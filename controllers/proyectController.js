'use strict'

const Proyectos = require('../models/Proyectos.js');

exports.proyectHome = async (req, resp) => {

    const proyectos = await Proyectos.findAll();

    resp.render('index', {
        nombrePagina: 'UpTask - Proyectos',
        proyectos
    });
};

exports.proyectNuevoProyecto = async (req, resp) => {

    const proyectos = await Proyectos.findAll();

    resp.render('nuevo-proyecto', {
        nombrePagina: 'UpTask - Nuevo Proyecto',
        proyectos
    });
};

exports.proyectGuardarNuevoProyecto = async (req, resp) => {

    const proyectos = await Proyectos.findAll();

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
        await Proyectos.create({ nombre });
        resp.redirect('/');
    };
};

exports.proyectoPorUrl = async (req, resp, next) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    if (!proyecto) return next();

    resp.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    });
};

exports.formularioEditar = async (req, resp) => {

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
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

    const proyectos = await Proyectos.findAll();

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