var express = require('express');
var router = express.Router();
const usercontroller = require("../controllers/usercontroller");



/* GET users listing. */

router.get('/getAllUsers',usercontroller.getAllUsers );
router.post('/addEmploye',usercontroller.addEmploye );
router.post('/addAdmin',usercontroller.addAdmin );
router.post('/addResponsableRH',usercontroller.addResponsableRH );
router.delete('/deletusersBYID/:id',usercontroller.deletusersBYID );
router.get('/getuserBYID/:id',usercontroller.getuserBYID );
router.put('/updatePassword/:id',usercontroller.updatePassword )
router.put('/updateUser/:id',usercontroller.updateUser )








module.exports = router;