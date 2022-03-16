const express = require('express');
const router = express.Router();
const editGalleryController = require('../controllers/editGalleryController');

// Update Gallery
router.get("/:galleryID", editGalleryController.edit);
router.post("/:galleryID", editGalleryController.update);

module.exports = router;