const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('Tareas', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },

    tarea: {
        type: Sequelize.STRING(100)
    },

    estado: {
        type: Sequelize.INTEGER(1)
    }
});

Tareas.belongsTo(Proyectos);

module.exports = Tareas;