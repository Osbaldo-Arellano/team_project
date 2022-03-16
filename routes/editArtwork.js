const express = require('express');
const router = express.Router();
const editArtworkController = require('../controllers/editArtworkController');

// Update Artwork
router.get("/:artworkID", editArtworkController.edit);
router.post("/:artworkID", editArtworkController.update);

module.exports = router;