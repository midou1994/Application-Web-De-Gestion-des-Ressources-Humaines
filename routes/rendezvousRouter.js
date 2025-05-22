const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvouscontroller');

router.get('/getAllRendezVous', rendezvousController.getAllRendezVous);
router.post('/addRendezVous', rendezvousController.addRendezVous);
router.put('/updateRendezVous/:id', rendezvousController.updateRendezVous);
router.delete('/deleteRendezVous/:id', rendezvousController.deleteRendezVous);
router.get('/getRendezVousById/:id', rendezvousController.getRendezVousById);
router.get('/getRendezVousByCandidat/:candidatId', rendezvousController.getRendezVousByCandidat);

module.exports = router;
