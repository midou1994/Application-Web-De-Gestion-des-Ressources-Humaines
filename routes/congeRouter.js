const express = require("express");
const router = express.Router();
const congecontroller = require("../controllers/congecontroller");

router.get('/getAllconge', congecontroller.getAllconge);
router.post('/addconge', congecontroller.addconge);
router.put('/updateConge/:id', congecontroller.updateConge);
router.put('/toggleStatus/:id', congecontroller.toggleCongeStatus);
router.get('/getCongesByEmployee/:employeeId', congecontroller.getCongesByEmployee);

module.exports = router;