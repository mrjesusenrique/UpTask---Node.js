'use strict'

const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
const { body } = require('express-validator');

module.exports = function () {

    router.get('/',
        authController.usuarioAutenticado,
        proyectController.proyectHome
    );

    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado,
        proyectController.proyectNuevoProyecto
    );

    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape().isLength({ min: 3, max: 255 }).isString(),
        proyectController.proyectGuardarNuevoProyecto
    );

    router.get('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectController.proyectoPorUrl
    );

    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado,
        proyectController.formularioEditar
    );

    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape().isLength({ min: 3, max: 255 }).isString(),
        proyectController.actualizarProyecto
    );

    router.delete('/proyectos/:url',
        authController.usuarioAutenticado,
        proyectController.eliminarProyecto
    );

    router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea
    );

    router.patch('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    router.delete('/tareas/:id',
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    router.get('/crear-cuenta', usuariosController.formCrearCuenta);

    router.post('/crear-cuenta', usuariosController.crearCuenta);

    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);

    router.post('/iniciar-sesion', authController.autenticarUsuario);

    router.get('/cerrar-sesion', authController.cerrarSesion);

    return router;
};


