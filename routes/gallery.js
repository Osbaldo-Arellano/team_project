const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// View Gallery
router.get("/", galleryController.view);

module.exports = router;