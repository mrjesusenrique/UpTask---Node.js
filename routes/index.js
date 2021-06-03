'use strict'

const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');
const { body } = require('express-validator/check');

module.exports = function () {
    router.get('/', proyectController.proyectHome);
    router.get('/nuevo-proyecto', proyectController.proyectNuevoProyecto);
    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectController.proyectGuardarNuevoProyecto);
    return router;
};


