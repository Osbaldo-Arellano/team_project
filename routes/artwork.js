const express = require("express");
const router = express.Router();
const artworkController = require('../controllers/artworkController')

router.get("/", artworkController.view);

module.exports = router;