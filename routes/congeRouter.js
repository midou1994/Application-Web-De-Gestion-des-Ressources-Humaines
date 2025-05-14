const express = require("express");
const router = express.Router();
const congecontroller = require("../controllers/congecontroller");

router.get('/getAllconge', congecontroller.getAllconge);
router.post('/addconge', congecontroller.addconge);

module.exports = router;