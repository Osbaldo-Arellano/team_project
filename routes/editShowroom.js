const express = require('express');
const router = express.Router();
const editShowroomController = require('../controllers/editShowroomController');

// Update Showroom
router.get("/:showRoomID", editShowroomController.edit);
router.post("/:showRoomID", editShowroomController.update);

module.exports = router;