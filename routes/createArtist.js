const express = require('express');
const router = express.Router();
const createArtistController = require('../controllers/createArtistController');

// View available Galleries and Addresses
router.get("/", createArtistController.view);

// Create Artist
router.get("/", createArtistController.form);
router.post("/", createArtistController.create);

module.exports = router;