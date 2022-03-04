const express = require("express");
const router = express.Router();
const showroomController = require('../controllers/showroomController')

router.get("/", showroomController.view);



module.exports = router;