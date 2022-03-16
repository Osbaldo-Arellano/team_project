const express = require("express");
const router = express.Router();
const deleteShowroomController = require('../controllers/deleteShowroomController')

// Delete Showroom
router.get("/:showRoomID", deleteShowroomController.delete);

module.exports = router;