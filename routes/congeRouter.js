const express = require("express");
const router = express.Router();
const congecontroller = require("../controllers/congecontroller");

router.get('/getAllconge', congecontroller.getAllconge);
module.exports = router;