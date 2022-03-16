const express = require("express");
const router = express.Router();
const findGalleryController = require('../controllers/findGalleryController')

// Find Gallery
router.post("/", findGalleryController.findGallery);

module.exports = router;