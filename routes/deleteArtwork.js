const express = require("express");
const router = express.Router();
const deleteArtworkController = require('../controllers/deleteArtworkController')

// Delete Artwork
router.get("/:artworkID", deleteArtworkController.delete);

module.exports = router;