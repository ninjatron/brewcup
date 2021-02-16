const express = require('express');
const validator = require('express-validator');
// get middlewares
const authToken = require('../middlewares/authToken');

const router = express.Router();
// controllers
const teaController = require('../controllers/tea');

// GET all teas from /teas/get
router.get('/teas', teaController.getAllTeas);

// GET a single tea from /tea/get 
router.get('/:teaId', teaController.getTea);
// POST a single tea to /tea/post
router.post('', authToken, teaController.addTea);
// PATCH a single tea to /tea/post
router.patch('/:teaId', authToken, teaController.updateTea);
// DELETE a single tea to /tea/patch
router.delete('/:teaId', authToken, teaController.deleteTea);

module.exports = router;
