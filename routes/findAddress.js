const express = require("express");
const router = express.Router();
const findAddressController = require('../controllers/findAddressController')

// Find Address
router.post("/", findAddressController.findAddress);

module.exports = router;