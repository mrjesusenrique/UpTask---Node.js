const Sequelize = require('sequelize');
const db = require('../config/db');

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
});

module.exports = Proyectos;