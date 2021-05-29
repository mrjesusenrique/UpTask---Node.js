'use strict'

const controller = {

    proyectHome: (req, resp) => {
        resp.render('index', {
            nombrePagina: 'UpTask - Proyectos'
        });
    },
};

module.exports = controller;