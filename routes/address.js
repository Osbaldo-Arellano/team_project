const express = require("express");
const router = express.Router();
const addressController = require('../controllers/addressController')

// View Address
router.get("/", addressController.view);

module.exports = router;