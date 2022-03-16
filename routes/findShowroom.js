const express = require("express");
const router = express.Router();
const findShowroomController = require('../controllers/findShowroomController')

// Find Showroom
router.post("/", findShowroomController.findShowroom);

module.exports = router;