const express = require("express");
const router = express.Router();
const showroomController = require('../controllers/showroomController')

// View Showroom
router.get("/", showroomController.view);

module.exports = router;