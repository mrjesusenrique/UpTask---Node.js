'use strict'

const express = require('express');
const path = require('path');
const routes = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3000;

require('./models/Proyectos');
db.sync()
    .then(() => ('Conectado a la Base de Datos'))
    .catch((error) => console.log(error));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use('/', routes);
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`API REST escuchando en el puerto ${port}`);
});

