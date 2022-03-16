const express = require("express");
const router = express.Router();
const deleteConsumerController = require('../controllers/deleteConsumerController')

// Delete Consumer
router.get("/:consumerID", deleteConsumerController.delete);

module.exports = router;