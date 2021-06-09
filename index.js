'use strict'

const express = require('express');
const path = require('path');
const routes = require('./routes');
const db = require('./config/db');
require('./models/Proyectos.js');
require('./models/Tareas.js');
require('./models/Usuarios.js');
const app = express();
const port = 3000;
const helpers = require('./helpers');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use((req, resp, next) => {
    resp.locals.vardump = helpers.vardump;
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes());
app.use(express.static('public'));

db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`API REST escuchando en el puerto ${port}`);
});




