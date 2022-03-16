const express = require("express");
const router = express.Router();
const deleteGalleryController = require('../controllers/deleteGalleryController')

// Delete Gallery
router.get("/:galleryID", deleteGalleryController.delete);

module.exports = router;