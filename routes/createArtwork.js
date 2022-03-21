const express = require('express');
const router = express.Router();
const createArtworkController = require('../controllers/createArtworkController');

// View available Artists, Consumers, and Galleries
router.get("/", createArtworkController.view);

// Create Artwork
router.get("/", createArtworkController.form);
router.post("/", createArtworkController.create);

module.exports = router;