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
        const { nombre } = req.body;
        let errores = [];

        if (!nombre) {
            errores.push({ 'texto': 'Agrega un nombre al Proyecto' });
        }

        if (errores.length > 0) {
            resp.render('nuevo-proyecto', {
                nombrePagina: 'UpTask - Nuevo Proyecto',
                errores
            });

        } else {
            // Insertar información en la Base de Datos
        };
    },
};

module.exports = controller;