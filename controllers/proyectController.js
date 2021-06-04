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
        const proyecto = await Proyectos.create({ nombre });
        resp.redirect('/');
    };
};

exports.proyectoPorUrl = async (req, resp, next) => {

    const proyectos = await Proyectos.findAll();

    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if (!proyecto) return next();

    resp.render('tareas', {
        nombrePagina: 'UpTask - Tareas del Proyecto',
        proyecto,
        proyectos
    });
};