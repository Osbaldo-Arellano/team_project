const express = require("express");
const router = express.Router();
const findArtworkController = require('../controllers/findArtworkController')

// Find Artwork
router.post("/", findArtworkController.findArtwork);

module.exports = router;