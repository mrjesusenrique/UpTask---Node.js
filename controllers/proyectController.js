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
};

module.exports = controller;