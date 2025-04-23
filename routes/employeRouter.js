const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employecontroller");

router.get('/getAllEmployes', employeController.getAllEmployes);
router.post('/addEmployes', employeController.addEmployes);
router.delete('/deletEmployesBYID/:id', employeController.deletEmployesBYID);
router.get('/getEmployesBYID/:id', employeController.getEmployesBYID);
router.put('/updateEmployesBYID/:id', employeController.updateEmployesBYID);




module.exports = router;