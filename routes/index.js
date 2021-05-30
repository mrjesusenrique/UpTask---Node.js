'use strict'

const express = require('express');
const router = express.Router();
const proyectController = require('../controllers/proyectController');

router.get('/', proyectController.proyectHome);
router.get('/nuevo-proyecto', proyectController.proyectNuevoProyecto);

module.exports = router;
