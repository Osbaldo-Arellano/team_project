const express = require("express");
const router = express.Router();
const createShowroomController = require('../controllers/createShowroomController');

// View available Galleries and Artists
router.get("/", createShowroomController.view);

// Create Showroom
router.get("/", createShowroomController.form);
router.post("/", createShowroomController.create);

module.exports = router;