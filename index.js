'use strict'

const express = require('express');
const path = require('path');
const routes = require('./routes');
const db = require('./config/db');
require('./models/Proyectos.js');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

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




