var express = require('express');
var router = express.Router();
const jourferiecontroller = require("../controllers/jourferiecontroller");

router.get('/getAllJourferie',jourferiecontroller.getAllJourferie );
router.post('/addJourferie',jourferiecontroller.addJourferie );
router.delete('/deletJourferieBYID/:id',jourferiecontroller.deletJourferieBYID );
router.get('/getJourferieBYID/:id',jourferiecontroller.getJourferieBYID );
router.put('/updateJourferieBYID/:id',jourferiecontroller.updateJourferieBYID );





module.exports = router;