const express = require('express');
const router = express.Router();
const editAddressController = require('../controllers/editAddressController');

// Update Address
router.get("/:addressID", editAddressController.edit);
router.post("/:addressID", editAddressController.update);

module.exports = router;