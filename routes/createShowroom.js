const express = require("express");
const router = express.Router();
const createShowroomController = require('../controllers/createShowroomController');

// Create Showroom
router.get("/", createShowroomController.form);
router.post("/", createShowroomController.create);

module.exports = router;