const express = require('express');
const router = express.Router();
const createArtworkController = require('../controllers/createArtworkController');

// Create Artwork
router.get("/", createArtworkController.form);
router.post("/", createArtworkController.create);

module.exports = router;