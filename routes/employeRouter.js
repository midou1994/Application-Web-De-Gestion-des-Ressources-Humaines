const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employecontroller");
const uploadfile = require('../middlewares/uploadFile');

router.get('/getAllEmployes', employeController.getAllEmployes);
router.post('/addEmployes', employeController.addEmployes);
router.delete('/deletEmployesBYID/:id', employeController.deletEmployesBYID);
router.get('/:id', employeController.getEmployesBYID);
router.put('/updateEmployesBYID/:id', employeController.updateEmployesBYID);
router.post('/addEmployeWithImage', uploadfile.single('photo'), employeController.addEmployeWithImage);
router.put('/updateEmployeWithImage/:id', uploadfile.single('photo'), employeController.updateEmployeWithImage);

router.get('/byUser/:userId', employeController.getEmployeByUserId);



module.exports = router;