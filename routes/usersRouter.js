var express = require('express');
var router = express.Router();
const usercontroller = require("../controllers/usercontroller");



/* GET users listing. */

router.get('/getAllUsers',usercontroller.getAllUsers );
router.post('/addemploye',usercontroller.addemploye );
router.post('/addadmin',usercontroller.addadmin );
router.post('/addResponsableRH',usercontroller.addResponsableRH );







module.exports = router;