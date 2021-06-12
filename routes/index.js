'use strict'

const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
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

    router.post('/proyectos/:url', tareasController.agregarTarea);

    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

    router.delete('/tareas/:id', tareasController.eliminarTarea);

    router.get('/crear-cuenta', usuariosController.formCrearCuenta);

    router.post('/crear-cuenta', usuariosController.crearCuenta);

    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    
    return router;
};


