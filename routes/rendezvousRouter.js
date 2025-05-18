const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvouscontroller');


router.get('/getAllRendezVous', rendezvousController.getAllRendezVous)
router.post('/addRendezVous', rendezvousController.addRendezVous);



module.exports = router;
