'use strict'

const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Los campos son obligatorios'
});

exports.usuarioAutenticado = (req, resp, next) => {
    req.isAuthenticated() ? next() : resp.redirect('/iniciar-sesion');
};

exports.cerrarSesion = (req, resp) => {
    req.session.destroy(() => {
        resp.redirect('/iniciar-sesion');
    });
};

exports.enviarToken = async (req, resp) => {

    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
        req.flash('error', 'No existe este email');
        resp.redirect('/restablecer');
    } else {

        usuario.token = crypto.randomBytes(20).toString('hex');
        usuario.expiracion = Date.now() + 3600000;

        await usuario.save();

        const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

        await enviarEmail.enviar({
            usuario,
            subject: 'Reset Password',
            resetUrl,
            archivo: 'restablecer-password'
        });

        req.flash('correcto', 'Se envió un mensaje a tu correo');
        resp.redirect('/iniciar-sesion');
    };
};

exports.validarToken = async (req, resp) => {

    const { token } = req.params;
    const usuario = await Usuarios.findOne({ where: { token } });

    if (!usuario) {
        req.flash('error', 'No válido');
        resp.redirect('/restablecer');
    } else {
        resp.render('resetPassword', {
            nombrePagina: 'Restablecer contraseña'
        });
    };
};

exports.actualizarPassword = async (req, resp) => {
    const { token } = req.params;
    const usuario = await Usuarios.findOne({
        where: {
            token,
            expiracion: {
                [Op.gte]: Date.now()
            }
        }
    });

    if (!usuario) {

        req.flash('error', 'No válido');
        resp.redirect('/restablecer');

    } else {

        usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        usuario.token = null;
        usuario.expiracion = null;

        await usuario.save();

        req.flash('correcto', 'Tu password se ha modificado correctamente');
        resp.redirect('/iniciar-sesion');
    };
};