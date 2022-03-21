const express = require('express');
const router = express.Router();
const createConsumerController = require('../controllers/createConsumerController');

// View available Artworks and Addresses
router.get("/", createConsumerController.view);

// Create Consumer
router.get("/", createConsumerController.form);
router.post("/", createConsumerController.create);

module.exports = router;