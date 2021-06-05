'use strict'

const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');
const { body } = require('express-validator');

module.exports = function () {
    router.get('/', proyectController.proyectHome);

    router.get('/nuevo-proyecto', proyectController.proyectNuevoProyecto);

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape().isLength({ min: 3, max: 255 }).isString(),
        proyectController.proyectGuardarNuevoProyecto);

    router.get('/proyectos/:url', proyectController.proyectoPorUrl);

    router.get('/proyecto/editar/:id', proyectController.formularioEditar);

    router.post('/nuevo-proyecto/:id',
        body('nombre').not().isEmpty().trim().escape().isLength({ min: 3, max: 255 }).isString(),
        proyectController.actualizarProyecto);

    router.delete('/proyectos/:url', proyectController.eliminarProyecto);

    return router;
};


