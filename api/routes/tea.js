const express = require('express');
const validator = require('express-validator');
// get middlewares
const authToken = require('../middlewares/authToken');
const uploadImage = require("../services/imageUploader");

const router = express.Router();
// controllers
const teaController = require('../controllers/tea');

// GETS
// all teas from /teas/get
router.get('/teas', teaController.getAllTeas);
// limited sample random return
router.get('/teas/sample/:limit', teaController.getRandomTeas);
// single tea
router.get('/tea/:teaId', teaController.getTea);

// POSTS
// create single tea
router.post('/tea', [authToken, uploadImage.array('photos')], teaController.addTea);
// PUTS
router.put('/tea/:teaId', [authToken, uploadImage.array('photos')], teaController.updateTea);
router.put('/tea/:teaId/images', authToken, teaController.updateTeaPhotos);
// DELETE a single tea to /tea/patch
router.delete('/tea/:teaId', authToken, teaController.deleteTea);

module.exports = router;
