'use strict'

const Proyectos = require('../models/Proyectos.js');

exports.proyectHome = (req, resp) => {
    resp.render('index', {
        nombrePagina: 'UpTask - Proyectos'
    });
};

exports.proyectNuevoProyecto = (req, resp) => {
    resp.render('nuevo-proyecto', {
        nombrePagina: 'UpTask - Nuevo Proyecto'
    });
};

exports.proyectGuardarNuevoProyecto = async (req, resp) => {

    const { nombre } = req.body;
    console.log(req.body);

    let errores = [];

    if (!nombre) {
        errores.push({ 'texto': 'Agrega un nombre al Proyecto' });
    };

    if (errores.length > 0) {
        resp.render('nuevo-proyecto', {
            nombrePagina: 'UpTask - Nuevo Proyecto',
            errores
        });
    } else {
        const proyecto = await Proyectos.create({ nombre });
        resp.redirect('/');
    };
};