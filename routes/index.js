'use strict'

const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');

module.exports = function () {
    router.get('/', proyectController.proyectHome);
    router.get('/nuevo-proyecto', proyectController.proyectNuevoProyecto);
    router.post('/nuevo-proyecto', proyectController.proyectGuardarNuevoProyecto);
    return router;
};


