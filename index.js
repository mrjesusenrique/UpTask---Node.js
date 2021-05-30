'use strict'

const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use('/', routes);
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`API REST escuchando en el puerto ${port}`);
});

