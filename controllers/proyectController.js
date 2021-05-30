'use strict'

const controller = {

    proyectHome: (req, resp) => {
        resp.render('index', {
            nombrePagina: 'UpTask - Proyectos'
        });
    },

    proyectNuevoProyecto: (req, resp) => {
        resp.render('nuevo-proyecto', {
            nombrePagina: 'UpTask - Nuevo Proyecto'
        });
    },

    proyectEnviarNuevoProyecto: (req, resp) => {
        console.log(req.body);
        resp.end();
    },
};

module.exports = controller;