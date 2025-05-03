var express = require('express');
var router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const {requireAuthUser} = require("../middlewares/authMiddleware")



/* GET users listing. */

router.get('/getAllUsers',requireAuthUser,usercontroller.getAllUsers );
router.post('/addEmploye',usercontroller.addEmploye );
router.post('/login',usercontroller.login );
router.post('/logout',requireAuthUser,usercontroller.logout );
router.post('/addAdmin',usercontroller.addAdmin );
router.post('/addResponsableRH',usercontroller.addResponsableRH );
router.delete('/deletusersBYID/:id',usercontroller.deletusersBYID );
router.get('/getuserBYID/:id',usercontroller.getuserBYID );
router.put('/updatePassword/:id',usercontroller.updatePassword )
router.put('/updateUser/:id',usercontroller.updateUser )








module.exports = router;