const express = require("express");
const router = express.Router();
const findConsumerController = require('../controllers/findConsumerController')

// Find Consumer
router.post("/", findConsumerController.findConsumer);

module.exports = router;