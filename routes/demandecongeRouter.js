const express = require("express");
const router = express.Router();
const demandecongecontroller = require("../controllers/demandecongecontroller");

router.get('/getAllDemandescoge', demandecongecontroller.getAllDemandescoge);
router.post('/addDemandesconge', demandecongecontroller.addDemandesconge);
router.delete('/deletDemandescongeBYID/:id', demandecongecontroller.deletDemandescongeBYID);
router.get('/getDemandecongeBYID/:id', demandecongecontroller.getDemandecongeBYID);
router.put('/updateDemandecongeBYID/:id', demandecongecontroller.updateDemandecongeBYID);
router.put('/updatestatubyid/:id', demandecongecontroller.updateStatutById);



module.exports = router;