const express = require("express");
const router = express.Router();
const deleteArtistController = require('../controllers/deleteArtistController')

// Delete Artist
router.get("/:artistID", deleteArtistController.delete);

module.exports = router;