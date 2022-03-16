const express = require("express");
const router = express.Router();
const findArtistController = require('../controllers/findArtistController')

// Find Artist
router.post("/", findArtistController.findArtist);

module.exports = router;