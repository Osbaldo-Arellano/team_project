const express = require('express');
const router = express.Router();
const editArtistController = require('../controllers/editArtistController');

// Update Artist
router.get("/:artistID", editArtistController.edit);
router.post("/:artistID", editArtistController.update);

module.exports = router;