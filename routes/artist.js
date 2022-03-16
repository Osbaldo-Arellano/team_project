const express = require("express");
const router = express.Router();
const artistController = require('../controllers/artistController')

// View Artist
router.get("/", artistController.view);

module.exports = router;