'use strict'

const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, resp) => {
    resp.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en UpTask'
    });
};

exports.crearCuenta = async (req, resp) => {

    const { email, password } = req.body;

    try {
        await Usuarios.create({
            email,
            password
        });

        resp.redirect('/iniciar-sesion');

    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        resp.render('crearCuenta', {
            nombrePagina: 'Crear cuenta en UpTask',
            mensajes: req.flash(),
            email,
            password
        });
    };
};

exports.formIniciarSesion = (req, resp) => {
    const { error } = resp.locals.mensajes;
    resp.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en UpTask',
        error
    });
};

exports.formRestablecerPassword = (req, resp) => {
    resp.render('restablecer', {
        nombrePagina: 'Restablecer contraseña'
    });
};