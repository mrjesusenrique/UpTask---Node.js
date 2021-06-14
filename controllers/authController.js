'use strict'

const passport = require('passport');

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

