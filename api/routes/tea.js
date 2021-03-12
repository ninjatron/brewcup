const express = require('express');
const validator = require('express-validator');
// get middlewares
const authToken = require('../middlewares/authToken');
const { uploadTeaPhotos } = require("../services/imageUploader");

const router = express.Router();
// controllers
const teaController = require('../controllers/tea');

// GETS
// all teas from /teas/get
router.get('/teas/:pageNumber', teaController.getPaginatedTeas);
// limited sample random return
router.get('/teas/sample/:limit', teaController.getRandomTeas);
// single tea
router.get('/tea/:teaId', teaController.getTea);
// search API maybe shouldnt be here but eh
router.get('/teas/search/:query', teaController.getSearchResults);
// POSTS
// create single tea
router.post('/tea', [authToken, uploadTeaPhotos.array('photos')], teaController.addTea);
// PUTS
// TODO: FOLLOWING MUST BE A BUG, WE DON'T WANT TO CREATE NEW IMAGES IN EVERY UPLOAD
router.put('/tea/:teaId', [authToken, uploadTeaPhotos.array('photos')], teaController.updateTea);
// router.put('/tea/:teaId/images', authToken, teaController.updateTeaPhotos);
// DELETE a single tea to /tea/patch
router.delete('/tea/:teaId', authToken, teaController.deleteTea);

module.exports = router;
