const express = require("express");
const router = express.Router();
const consumerController = require('../controllers/consumerController')

router.get("/", consumerController.view);

module.exports = router;