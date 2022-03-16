const express = require("express");
const router = express.Router();
const deleteAddressController = require('../controllers/deleteAddressController')

// Delete Address
router.get("/:addressID", deleteAddressController.delete);

module.exports = router;