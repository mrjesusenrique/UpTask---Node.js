const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre: {
        type: Sequelize.STRING
    },

    url: {
        type: Sequelize.STRING
    }
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLocaleLowerCase();
            proyecto.url = `${url}-${shortid.generate()}-${shortid.generate()}}`;
        }
    }
});

module.exports = Proyectos;