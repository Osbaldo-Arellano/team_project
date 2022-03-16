const express = require('express');
const router = express.Router();
const createAddressController = require('../controllers/createAddressController');

// Create Address
router.get("/", createAddressController.form);
router.post("/", createAddressController.create);

module.exports = router;