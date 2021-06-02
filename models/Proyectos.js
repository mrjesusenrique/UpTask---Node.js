const Sequelize = require('sequelize');
const db = require('../config/db');

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.INTEGER
    },

    url: {
        type: Sequelize.INTEGER
    }
});

module.exports = Proyectos;