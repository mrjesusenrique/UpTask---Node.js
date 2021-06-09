'use strict'

exports.formCrearCuenta = (req, resp) => {
    resp.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en UpTask'
    });
};
