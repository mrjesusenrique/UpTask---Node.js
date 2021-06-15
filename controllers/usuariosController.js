'use strict'

const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

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

        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        const usuario = {
            email
        };

        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta en UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        req.flash('correcto', 'Se envió un correo para confirmar tu cuenta');
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

exports.confirmarCuenta = async (req, resp) => {

    const { correo } = req.params;

    const usuario = await Usuarios.findOne({
        where: {
            email: correo
        }
    });

    if (!usuario) {
        req.flash('error', 'No válido');
        resp.redirect('/crear-cuenta');
    } else {
        usuario.activo = 1;
        await usuario.save();

        req.flash('correcto', 'Cuenta activada correctamente');
        resp.redirect('/iniciar-sesion');
    };
};