const express = require('express');
const router = express.Router();
const editConsumerController = require('../controllers/editConsumerController');

// Update Consumer
router.get("/:consumerID", editConsumerController.edit);
router.post("/:consumerID", editConsumerController.update);

module.exports = router;