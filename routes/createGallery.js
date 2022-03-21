const express = require('express');
const router = express.Router();
const createGalleryController = require('../controllers/createGalleryController');

// View available Addresses
router.get("/", createGalleryController.view);

// Create Gallery
router.get("/", createGalleryController.form);
router.post("/", createGalleryController.create);

module.exports = router;