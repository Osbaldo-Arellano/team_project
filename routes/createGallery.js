const express = require("express");
const router = express.Router();
const createGalleryController = require('../controllers/createGalleryController')

router.get("/", createGalleryController.form);
router.post("/", createGalleryController.create);


module.exports = router;